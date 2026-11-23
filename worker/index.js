/*
 * Azulejo · Cloudflare Worker
 *
 * Serves the app from ./public and keeps each learner's progress in a D1 database (binding: DB).
 * Every browser gets a private sync code (az-…); the same code on another device continues there.
 *
 *   GET    /api/health          -> { ok, app: "azulejo", storage, locked }
 *   GET    /api/progress/:code  -> { data, rev, updated, pending }   ({ data: null, rev: 0 } when nothing is saved yet)
 *   PUT    /api/progress/:code  <- { data, updated, base, replace?, clearPending? }
 *                               -> { ok, rev }   or 409 { data, rev, ... } when another device saved first
 *   POST   /api/progress/:code  same as PUT; sent by navigator.sendBeacon when a tab closes
 *   DELETE /api/progress/:code  forget this code
 *
 * Accounts (optional — sync codes keep working without one):
 *   POST /api/account/signup    { username, key, code? }  -> { token, username, code }
 *   POST /api/account/login     { username, key }         -> { token, username, code }
 *   GET  /api/account/me        (Authorization: Bearer)   -> { username, code }
 *   POST /api/account/logout    (Bearer)
 *   POST /api/account/password  (Bearer) { key, newKey }
 *   POST /api/account/delete    (Bearer) { key }          deletes the account and its progress
 * The browser never sends the password itself: it stretches it first (PBKDF2, 400,000 rounds,
 * salted with the username) and sends that key. The Worker stores only a salted hash of the key,
 * so the expensive part runs in the browser and stays within the free plan's CPU limit.
 * Progress that belongs to an account can only be read or written by that account.
 *
 * "rev" is a version number. A save names the version it builds on ("base"); if the stored
 * version has moved on, the save is refused with the newer progress, the app merges the two
 * and saves again. Nothing is overwritten by an older device.
 *
 * Optional: set a SYNC_TOKEN secret (wrangler secret put SYNC_TOKEN) to require a password;
 * enter the same password in the app under Me → Saving & sync → Advanced.
 */

const CODE = /^az-[a-z0-9]{10,40}$/;
const MAX_BYTES = 1_500_000; // a D1 row holds up to 2 MB

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, x-sync-token, authorization',
  'access-control-max-age': '86400',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS },
  });

// The table is created on first use, so there are no migrations to run.
let ready = null;
function schema(db) {
  if (!ready) {
    ready = db
      .batch([
        db.prepare(`CREATE TABLE IF NOT EXISTS progress (
           id      TEXT PRIMARY KEY,
           data    TEXT NOT NULL,
           rev     INTEGER NOT NULL DEFAULT 1,
           updated INTEGER NOT NULL DEFAULT 0,
           saved   INTEGER NOT NULL DEFAULT 0,
           pending TEXT
         )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS users (
           name    TEXT PRIMARY KEY,
           hash    TEXT NOT NULL,
           salt    TEXT NOT NULL,
           iter    INTEGER NOT NULL,
           code    TEXT NOT NULL UNIQUE,
           created INTEGER NOT NULL,
           fails   INTEGER NOT NULL DEFAULT 0,
           locked  INTEGER NOT NULL DEFAULT 0
         )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS sessions (
           token   TEXT PRIMARY KEY,
           name    TEXT NOT NULL,
           created INTEGER NOT NULL,
           expires INTEGER NOT NULL
         )`),
        db.prepare('CREATE INDEX IF NOT EXISTS sessions_by_name ON sessions (name)'),
      ])
      .catch(err => {
        ready = null;
        throw err;
      });
  }
  return ready;
}

/* ---------- accounts ---------- */
const NAME = /^[a-z0-9._-]{3,24}$/;
const KEY = /^[A-Za-z0-9+/]{42,44}={0,2}$/; // base64 of the 32-byte key the browser derives
const SERVER_ROUNDS = 5000;
const SESSION_DAYS = 180;
const MAX_FAILS = 8;
const LOCK_MINUTES = 15;

const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const unb64 = str => Uint8Array.from(atob(str), c => c.charCodeAt(0));
const hex = bytes => [...new Uint8Array(bytes)].map(x => x.toString(16).padStart(2, '0')).join('');
async function hashKey(key, salt, rounds) {
  const k = await crypto.subtle.importKey('raw', unb64(key), 'PBKDF2', false, ['deriveBits']);
  return b64(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unb64(salt), iterations: rounds }, k, 256));
}
const sha = async text => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
const newCode = () => 'az-' + [...crypto.getRandomValues(new Uint8Array(22))].map(x => 'abcdefghijkmnpqrstuvwxyz23456789'[x % 32]).join('');

async function newSession(db, name) {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const now = Date.now();
  await db.batch([
    db.prepare('DELETE FROM sessions WHERE expires < ?1').bind(now),
    db.prepare('INSERT INTO sessions (token, name, created, expires) VALUES (?1, ?2, ?3, ?4)').bind(await sha(token), name, now, now + SESSION_DAYS * 864e5),
  ]);
  return token;
}
function bearer(request, url) {
  const h = request.headers.get('authorization') || '';
  return h.startsWith('Bearer ') ? h.slice(7).trim() : url.searchParams.get('s') || '';
}
async function sessionUser(db, request, url) {
  const token = bearer(request, url);
  if (!/^[0-9a-f]{64}$/.test(token)) return null;
  const row = await db.prepare('SELECT name FROM sessions WHERE token = ?1 AND expires > ?2').bind(await sha(token), Date.now()).first();
  return row ? row.name : null;
}
async function readJSON(request) {
  const text = await request.text();
  if (text.length > 4000) return null;
  try { return JSON.parse(text); } catch { return null; }
}
async function checkKey(db, name, key) {
  const u = await db.prepare('SELECT * FROM users WHERE name = ?1').bind(name).first();
  if (!u) return { error: json({ error: 'Wrong username or password.' }, 401) };
  if (u.locked > Date.now()) return { error: json({ error: `Too many wrong passwords. Try again in ${Math.ceil((u.locked - Date.now()) / 60000)} minutes.` }, 429) };
  const ok = sameText(await hashKey(key, u.salt, u.iter), u.hash);
  if (!ok) {
    const fails = u.fails + 1;
    await db.prepare('UPDATE users SET fails = ?1, locked = ?2 WHERE name = ?3')
      .bind(fails >= MAX_FAILS ? 0 : fails, fails >= MAX_FAILS ? Date.now() + LOCK_MINUTES * 60000 : 0, name).run();
    return { error: json({ error: 'Wrong username or password.' }, 401) };
  }
  if (u.fails) await db.prepare('UPDATE users SET fails = 0 WHERE name = ?1').bind(name).run();
  return { user: u };
}

async function account(request, env, url, action) {
  const db = env.DB;
  if (request.method === 'GET' && action === 'me') {
    const name = await sessionUser(db, request, url);
    if (!name) return json({ error: 'Not logged in.' }, 401);
    const u = await db.prepare('SELECT name, code FROM users WHERE name = ?1').bind(name).first();
    return u ? json({ username: u.name, code: u.code }) : json({ error: 'Not logged in.' }, 401);
  }
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const body = (await readJSON(request)) || {};
  const name = String(body.username || '').trim().toLowerCase();

  switch (action) {
    case 'signup': {
      if (env.SYNC_TOKEN && !sameText(request.headers.get('x-sync-token') || '', env.SYNC_TOKEN)) return json({ error: 'This site needs its sync password to create accounts.' }, 401);
      if (!NAME.test(name)) return json({ error: 'Usernames are 3–24 letters, numbers, dots, dashes or underscores.' }, 400);
      if (!KEY.test(body.key || '')) return json({ error: 'Bad request.' }, 400);
      if (await db.prepare('SELECT 1 FROM users WHERE name = ?1').bind(name).first()) return json({ error: 'That username is taken.' }, 409);
      // keep this device's progress: adopt its sync code unless another account already owns it
      let code = CODE.test(body.code || '') ? body.code : newCode();
      if (await db.prepare('SELECT 1 FROM users WHERE code = ?1').bind(code).first()) code = newCode();
      const salt = b64(crypto.getRandomValues(new Uint8Array(16)));
      await db.prepare('INSERT INTO users (name, hash, salt, iter, code, created) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
        .bind(name, await hashKey(body.key, salt, SERVER_ROUNDS), salt, SERVER_ROUNDS, code, Date.now()).run();
      return json({ token: await newSession(db, name), username: name, code });
    }
    case 'login': {
      if (!NAME.test(name) || !KEY.test(body.key || '')) return json({ error: 'Wrong username or password.' }, 401);
      const r = await checkKey(db, name, body.key);
      if (r.error) return r.error;
      return json({ token: await newSession(db, name), username: name, code: r.user.code });
    }
    case 'logout': {
      const token = bearer(request, url);
      if (/^[0-9a-f]{64}$/.test(token)) await db.prepare('DELETE FROM sessions WHERE token = ?1').bind(await sha(token)).run();
      return json({ ok: true });
    }
    case 'password':
    case 'delete': {
      const who = await sessionUser(db, request, url);
      if (!who) return json({ error: 'Please log in again.' }, 401);
      if (!KEY.test(body.key || '')) return json({ error: 'Bad request.' }, 400);
      const r = await checkKey(db, who, body.key);
      if (r.error) return r.error;
      if (action === 'password') {
        if (!KEY.test(body.newKey || '')) return json({ error: 'Bad request.' }, 400);
        const salt = b64(crypto.getRandomValues(new Uint8Array(16)));
        await db.batch([
          db.prepare('UPDATE users SET hash = ?1, salt = ?2, iter = ?3 WHERE name = ?4').bind(await hashKey(body.newKey, salt, SERVER_ROUNDS), salt, SERVER_ROUNDS, who),
          // other devices have to log in again
          db.prepare('DELETE FROM sessions WHERE name = ?1 AND token != ?2').bind(who, await sha(bearer(request, url))),
        ]);
        return json({ ok: true });
      }
      await db.batch([
        db.prepare('DELETE FROM progress WHERE id = ?1').bind(r.user.code),
        db.prepare('DELETE FROM sessions WHERE name = ?1').bind(who),
        db.prepare('DELETE FROM users WHERE name = ?1').bind(who),
      ]);
      return json({ ok: true });
    }
  }
  return json({ error: 'Not found.' }, 404);
}

function sameText(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function current(db, id) {
  const row = await db.prepare('SELECT data, rev, updated, saved, pending FROM progress WHERE id = ?').bind(id).first();
  if (!row) return null;
  return {
    data: JSON.parse(row.data),
    rev: row.rev,
    updated: row.updated,
    saved: row.saved,
    pending: row.pending ? JSON.parse(row.pending) : null,
  };
}

async function save(request, env, id) {
  const text = await request.text();
  if (text.length > MAX_BYTES) return json({ error: 'Progress is too large to save.' }, 413);
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: 'Not JSON.' }, 400);
  }
  if (!body || typeof body.data !== 'object' || body.data === null || Array.isArray(body.data)) {
    return json({ error: 'Nothing to save.' }, 400);
  }

  const db = env.DB;
  const data = JSON.stringify(body.data);
  const updated = Number(body.updated) || Date.now();
  const now = Date.now();
  const base = Number.isInteger(body.base) ? body.base : 0;
  let row;

  if (body.replace) {
    // fresh start on one device: replace whatever is stored
    row = await db
      .prepare(
        `INSERT INTO progress (id, data, rev, updated, saved) VALUES (?1, ?2, 1, ?3, ?4)
         ON CONFLICT(id) DO UPDATE SET data = excluded.data, rev = progress.rev + 1,
           updated = excluded.updated, saved = excluded.saved, pending = NULL
         RETURNING rev`
      )
      .bind(id, data, updated, now)
      .first();
  } else if (base === 0) {
    // this device has never seen a saved copy: only create one
    row = await db
      .prepare(
        `INSERT INTO progress (id, data, rev, updated, saved) VALUES (?1, ?2, 1, ?3, ?4)
         ON CONFLICT(id) DO NOTHING RETURNING rev`
      )
      .bind(id, data, updated, now)
      .first();
  } else {
    // only if nobody saved since this device last looked
    row = await db
      .prepare(
        `UPDATE progress SET data = ?1, rev = rev + 1, updated = ?2, saved = ?3,
           pending = CASE WHEN ?4 THEN NULL ELSE pending END
         WHERE id = ?5 AND rev = ?6 RETURNING rev`
      )
      .bind(data, updated, now, body.clearPending ? 1 : 0, id, base)
      .first();
  }
  if (row) return json({ ok: true, rev: row.rev });

  // Someone else saved first.
  if (body.beacon) {
    // A closing tab cannot merge, so park its progress; the next device to load merges it in.
    await db.prepare('UPDATE progress SET pending = ?1 WHERE id = ?2').bind(data, id).run();
    return json({ ok: false, pending: true }, 202);
  }
  const cur = await current(db, id);
  return json({ conflict: true, ...(cur || { data: null, rev: 0 }) }, 409);
}

async function api(request, env, url) {
  if (url.pathname === '/api/health') {
    return json({ ok: true, app: 'azulejo', storage: !!env.DB, locked: !!env.SYNC_TOKEN, accounts: !!env.DB });
  }
  const acc = url.pathname.match(/^\/api\/account\/(signup|login|logout|me|password|delete)\/?$/);
  if (acc) {
    if (!env.DB) return json({ error: 'No database is connected to this Worker (see README).' }, 503);
    await schema(env.DB);
    return account(request, env, url, acc[1]);
  }
  const m = url.pathname.match(/^\/api\/progress\/([^/]+)\/?$/);
  if (!m) return json({ error: 'Not found.' }, 404);

  const id = decodeURIComponent(m[1]);
  if (!CODE.test(id)) return json({ error: 'That is not a sync code.' }, 400);
  if (!env.DB) return json({ error: 'No database is connected to this Worker (see README).' }, 503);
  if (env.SYNC_TOKEN) {
    const given = request.headers.get('x-sync-token') || url.searchParams.get('t') || '';
    if (!sameText(given, env.SYNC_TOKEN)) return json({ error: 'Wrong sync password.' }, 401);
  }
  await schema(env.DB);
  // progress that belongs to an account: only that account
  const owner = await env.DB.prepare('SELECT name FROM users WHERE code = ?1').bind(id).first();
  if (owner && (await sessionUser(env.DB, request, url)) !== owner.name) {
    return json({ error: 'Log in to use this progress.', login: true }, 401);
  }

  switch (request.method) {
    case 'GET': {
      const cur = await current(env.DB, id);
      return json(cur || { data: null, rev: 0 }); // nothing saved under this code yet
    }
    case 'PUT':
    case 'POST':
      return save(request, env, id);
    case 'DELETE':
      if (owner) return json({ error: 'Delete the account instead.' }, 403);
      await env.DB.prepare('DELETE FROM progress WHERE id = ?').bind(id).run();
      return json({ ok: true });
    default:
      return json({ error: 'Method not allowed.' }, 405);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    try {
      return await api(request, env, url);
    } catch (err) {
      console.error(err);
      return json({ error: 'Server error.' }, 500);
    }
  },
};
