/* Azulejo · lists every fixed Portuguese text the site can speak, for tools/voice.py.
   Prints JSON: { clips: [[key, text], …], verbs: { slug: [[key, text], …] } }
   Run from the repository root: node tools/voice-texts.js > texts.json */
global.window = {};
const D = '../public/data/';
['vocab', 'verbs', 'gen', 'course-a1', 'course-a2b1', 'readings', 'readings2', 'book', 'book2', 'grammar', 'grammar2'].forEach(f => { try { require(D + f + '.js'); } catch (e) { if (!/grammar|book|readings2/.test(f)) throw e; } });
const E = global.PTE = require('../public/js/engine.js');
const G = require('../public/js/generator.js');
const V = require('../public/js/voice.js');
G.load(window.AZ_DECKS, window.AZ_VERBS, window.AZ_GEN);

const clips = new Map();
const add = t => { t = V.spoken(t); if (!t || !/[a-zà-ú]/i.test(t) || t.length > 900) return; const k = V.key(t); if (!clips.has(k)) clips.set(k, t); };
const tokens = t => V.spoken(t).split(/\s+/).map(w => w.replace(/[.,!?;:¿¡…"“”«»()—–]/g, '')).filter(w => /[a-zà-ú]/i.test(w));

// words, with and without their article
const article = e => (e.type === 'f' ? 'a ' : e.type === 'm' || e.type === 'mf' ? 'o ' : e.type === 'm.pl' ? 'os ' : e.type === 'f.pl' ? 'as ' : '');
for (const d of window.AZ_DECKS) {
  for (const line of d.words.trim().split('\n')) {
    const [pt, , type, , ...extra] = line.split('|');
    if (!pt) continue;
    const e = { pt: pt.trim(), type: (type || '').trim() };
    const ex = Object.fromEntries(extra.map(x => x.split('=')).filter(x => x.length === 2));
    add(e.pt); add(article(e) + e.pt);
    if (ex.f) { add(ex.f); if (e.type === 'm' || e.type === 'mf') add('a ' + ex.f); }
    if (ex.pl) add(ex.pl);
  }
}
// course sentences and their alternatives
for (const u of window.AZ_COURSE.units) {
  for (const line of (u.sents || '').trim().split('\n').filter(Boolean)) { const s = G.parseSent(line); if (s && s.pt) add(s.pt); }
}
// examples in the course book and the grammar
const exLines = text => (text || '').split('\n').map(l => l.trim()).filter(l => l.startsWith('> ')).map(l => l.slice(2).split(' = ')[0]);
if (window.AZ_BOOK) for (const c of Object.values(window.AZ_BOOK.ch)) exLines(c.text).forEach(add);
if (window.AZ_GRAMMAR) for (const t of Object.values(window.AZ_GRAMMAR.t)) exLines(t.text).forEach(add);
for (const u of window.AZ_COURSE.units) exLines(u.guide).forEach(add);
// readings: every paragraph (for "listen") and every word (tap a word)
for (const r of window.AZ_READ) {
  add(r.title);
  for (const p of r.text.trim().split(/\n\s*\n/)) { add(p.replace(/^— /gm, '')); tokens(p).forEach(add); }
  for (const q of r.qs || []) add(q.q);
  for (const k of Object.keys(r.gloss || {})) add(k);
}
// fixed phrases in the interface
['Olá! Bem-vindo ao Azulejo. Vamos aprender português.', 'Olá, tudo bem?'].forEach(add);

// every verb: its infinitive; the core verbs get all their forms, in one file per verb
const verbs = {};
for (const line of window.AZ_VERBS.trim().split('\n')) {
  const raw = line.split('|')[0].trim(); if (!raw) continue;
  const inf = raw.replace('*', ''); add(inf);
  if (raw[0] !== '*') continue;
  const F = E.conjugate(inf); if (!F) continue;
  const forms = new Set([inf, F.ger, F.pp]);
  for (const t of ['pres', 'pret', 'imp', 'mqp', 'fut', 'cond', 'cpres', 'cimp', 'cfut', 'infp', 'impa', 'impn']) {
    for (const f of F[t] || []) { if (!f || f === '—' || f === '-') continue; forms.add(t === 'impn' ? 'não ' + f : f); }
  }
  // compound tenses are spoken as two words: the form of ter (in ter's file) + the participle (here)
  verbs[E.slug(inf)] = [...forms].map(V.spoken).filter(Boolean).map(t => [V.key(t), t]);
}
process.stdout.write(JSON.stringify({ clips: [...clips.entries()], verbs }));
