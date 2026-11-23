/* Azulejo · core: data indexes, state, spaced repetition, XP & streaks, audio, saving (local, claude.ai, Cloudflare). */
(function () {
  'use strict';
  const E = window.PTE, G = window.PTG;
  const AZ = (window.AZ = window.AZ || {});
  AZ.E = E; AZ.G = G;

  /* ---------------- Data ---------------- */
  G.load(window.AZ_DECKS, window.AZ_VERBS, window.AZ_GEN);
  AZ.decks = window.AZ_DECKS;
  AZ.verbs = window.AZ_VERBS.trim().split('\n').map(l => { const [raw, en] = l.split('|'); const inf = raw.replace('*', ''); return { inf, en, core: raw[0] === '*', slug: E.slug(inf) }; });
  AZ.verbBy = new Map(AZ.verbs.map(v => [v.inf, v]));
  AZ.verbBySlug = new Map(AZ.verbs.map(v => [v.slug, v]));
  AZ.sections = window.AZ_COURSE.sections.slice().sort((a, b) => a.id - b.id);
  AZ.units = window.AZ_COURSE.units.slice().sort((a, b) => +a.id.slice(1) - +b.id.slice(1));
  AZ.units.forEach((u, i) => {
    u.idx = i;
    u.L = u.lessons.map((line, li) => { const [title, items] = line.split('|'); return { title, items: items.split(',').map(s => s.trim()).filter(Boolean), li }; });
    u.S = u.sents.trim().split('\n').filter(Boolean).map(G.parseSent);
  });
  /* ---------------- The course book: chapters in study order ---------------- */
  const BOOK = window.AZ_BOOK || { levels: [], ch: {}, reads: {} };
  const unitById = new Map(AZ.units.map(u => [u.id, u]));
  const EXTRA_TENSES = { u20: ['impn'], u21: ['impn'], u24: ['cond'] };
  if (BOOK.levels.length) {
    const ordered = [];
    BOOK.levels.forEach(L => L.chapters.forEach(id => {
      const u = unitById.get(id); if (!u) return;
      const c = BOOK.ch[id] || {};
      Object.assign(u, { pt: c.pt || u.pt, en: c.en || u.en, goals: c.goals || [], text: c.text || u.guide, write: c.write || [], reads: BOOK.reads[id] || [], s: L.id, lv: L });
      ordered.push(u);
    }));
    AZ.units = ordered;
    AZ.sections = BOOK.levels.map(L => ({ id: L.id, pt: L.pt, en: L.en, level: L.code }));
  }
  AZ.levels = AZ.sections;
  AZ.units.forEach((u, i) => { u.idx = i; u.n = i + 1; u.goals = u.goals || []; u.text = u.text || u.guide; u.write = u.write || []; u.reads = u.reads || []; u.tenses = [u.tense || 'pres'].concat(EXTRA_TENSES[u.id] || []); });
  AZ.chapterOfRead = {};
  AZ.units.forEach(u => u.reads.forEach(r => { if (!AZ.chapterOfRead[r]) AZ.chapterOfRead[r] = u; }));
  AZ.word = id => G.LEX.get(id);
  // all the forms a vocabulary entry can take -> ids (for tap-to-translate)
  AZ.formIndex = new Map();
  const addForm = (f, id) => { if (!f) return; const k = f.toLowerCase(); const a = AZ.formIndex.get(k) || []; if (!a.includes(id)) a.push(id); AZ.formIndex.set(k, a); };
  G.LEX.forEach((e, id) => {
    addForm(e.pt, id);
    if (/^(m|f|mf)$/.test(e.type)) { const N = G.noun(id); addForm(N.pl, id); if (N.fem) { addForm(N.fem, id); addForm(G.ptPlural(N.fem), id); } }
    if (e.type === 'adj' || e.type === 'det' || e.type === 'num') { const F = G.adjForms(id); if (F) Object.values(F).forEach(f => addForm(f, id)); }
  });
  let VIDX = null;
  AZ.verbIndex = () => (VIDX || (VIDX = E.buildIndex(AZ.verbs.map(v => v.inf))));
  AZ.isPtWord = w => { const k = w.toLowerCase(); return AZ.formIndex.has(k) || AZ.verbIndex().has(k); };

  /* ---------------- Utils ---------------- */
  AZ.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  AZ.now = () => Date.now();
  AZ.minNow = () => Math.floor(Date.now() / 60000);
  AZ.today = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  AZ.rnd = Math.random;
  AZ.shuffle = a => E.shuffle(a);
  AZ.pick = a => a[Math.floor(Math.random() * a.length)];
  AZ.uid = (n = 20) => { const c = 'abcdefghijkmnpqrstuvwxyz23456789'; let s = ''; const r = new Uint8Array(n); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(r) : r.forEach((_, i) => (r[i] = Math.random() * 256)); r.forEach(x => (s += c[x % c.length])); return s; };
  AZ.plural = (n, a, b) => n + ' ' + (n === 1 ? a : b || a + 's');
  AZ.icon = (name, cls = '') => `<svg class="i ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  AZ.picHTML = (pic, cls = '') => pic && pic[0] === '#' ? `<span class="pic txt ${cls}">${AZ.esc(pic.slice(1))}</span>` : pic ? `<span class="pic ${cls}">${pic}</span>` : `<span class="pic txt ${cls}">·</span>`;
  AZ.article = e => (e.type === 'f' ? 'a ' : e.type === 'm' ? 'o ' : e.type === 'mf' ? 'o/a ' : e.type === 'm.pl' ? 'os ' : e.type === 'f.pl' ? 'as ' : e.type === 'prop' && e.art ? e.art + ' ' : '');
  AZ.withArt = e => AZ.article(e) + e.pt + (e.f && /^(m|mf)$/.test(e.type) ? ' / ' + (e.type === 'm' ? 'a ' : '') + e.f : '');
  AZ.glossShort = s => String(s || '').split(';')[0];

  /* ---------------- State ---------------- */
  const KEY = 'azulejo.pt-PT.v1';
  const DEFAULT = () => ({
    v: 1, created: Date.now(), updated: 0, resetAt: 0, per: {}, xp: 0, days: {}, lessons: {}, srs: {}, reads: {}, mine: [], badges: {},
    stats: { ans: 0, ok: 0, lessons: 0, reviews: 0, gym: 0, perfect: 0, free: 0 },
    settings: { goal: 30, sound: true, voice: 'auto', rate: 0.9, strict: false, hard: false, vos: false, batch: 20, name: '', sync: { id: '', endpoint: '', token: '' } },
  });
  function mergeDefaults(s) {
    const d = DEFAULT(); const out = Object.assign(d, s || {});
    out.settings = Object.assign(DEFAULT().settings, (s || {}).settings || {});
    out.settings.sync = Object.assign({ id: '', endpoint: '', token: '' }, out.settings.sync || {});
    out.stats = Object.assign(DEFAULT().stats, (s || {}).stats || {});
    return out;
  }
  function loadLocal() { try { const t = localStorage.getItem(KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }
  AZ.S = mergeDefaults(loadLocal());
  AZ.listeners = new Set();

  /* XP per day and the stats are counted per device ("per"), so two devices studying at the same time
     add up instead of overwriting each other. Changes made here since the last look are moved into
     this device's own counters before every save and merge. */
  AZ.dev = (function () { try { let d = localStorage.getItem('azulejo.device'); if (!d) { d = 'd' + AZ.uid(10); localStorage.setItem('azulejo.device', d); } return d; } catch (e) { return 'd' + AZ.uid(10); } })();
  let seen = null;
  const snap = () => { seen = { d: Object.assign({}, AZ.S.days), s: Object.assign({}, AZ.S.stats) }; };
  snap();
  AZ.account = function () {
    const me = AZ.S.per[AZ.dev] || (AZ.S.per[AZ.dev] = { d: {}, s: {} });
    me.d = me.d || {}; me.s = me.s || {};
    for (const k in AZ.S.days) { const x = (AZ.S.days[k] || 0) - (seen.d[k] || 0); if (x > 0) me.d[k] = (me.d[k] || 0) + x; }
    for (const k in AZ.S.stats) { const x = (AZ.S.stats[k] || 0) - (seen.s[k] || 0); if (x > 0) me.s[k] = (me.s[k] || 0) + x; }
    snap();
  };
  // fold progress from elsewhere (another device, a backup) into ours
  AZ.absorb = function (remote) {
    if (!remote) return;
    AZ.account(); AZ.S = AZ.merge(AZ.S, remote); snap();
    try { localStorage.setItem(KEY, JSON.stringify(AZ.S)); } catch (e) {}
  };
  AZ.onChange = fn => AZ.listeners.add(fn);

  /* Merge two progress states (another device, the cloud): keep the furthest progress for every item. */
  AZ.merge = function (a, b) {
    if (!a) return mergeDefaults(b); if (!b) return mergeDefaults(a);
    const A = mergeDefaults(a), B = mergeDefaults(b);
    // a fresh start on one device wins over older progress everywhere
    if ((A.resetAt || 0) !== (B.resetAt || 0)) return (A.resetAt || 0) > (B.resetAt || 0) ? A : B;
    const out = mergeDefaults(A.updated >= B.updated ? A : B);
    // counters: the highest count each device has reported, summed over devices
    out.per = {};
    [A.per, B.per].forEach(P => { for (const dv in P || {}) { const o = out.per[dv] || (out.per[dv] = { d: {}, s: {} }), x = P[dv] || {}; for (const k in x.d || {}) o.d[k] = Math.max(o.d[k] || 0, x.d[k] || 0); for (const k in x.s || {}) o.s[k] = Math.max(o.s[k] || 0, x.s[k] || 0); } });
    const sumD = {}, sumS = {};
    for (const dv in out.per) { const o = out.per[dv]; for (const k in o.d) sumD[k] = (sumD[k] || 0) + o.d[k]; for (const k in o.s) sumS[k] = (sumS[k] || 0) + o.s[k]; }
    out.days = {};
    new Set([...Object.keys(A.days), ...Object.keys(B.days), ...Object.keys(sumD)]).forEach(k => { out.days[k] = Math.max(sumD[k] || 0, A.days[k] || 0, B.days[k] || 0); });
    out.xp = Math.max(A.xp, B.xp, Object.values(out.days).reduce((x, y) => x + y, 0));
    out.lessons = Object.assign({}, A.lessons); for (const k in B.lessons) { const x = out.lessons[k], y = B.lessons[k]; out.lessons[k] = !x ? y : { done: x.done || y.done, best: Math.max(x.best || 0, y.best || 0), at: Math.max(x.at || 0, y.at || 0), n: Math.max(x.n || 0, y.n || 0), seen: Math.max(x.seen || 0, y.seen || 0) }; }
    out.srs = Object.assign({}, A.srs); for (const k in B.srs) { const x = out.srs[k], y = B.srs[k]; out.srs[k] = !x ? y : (y[2] || 0) > (x[2] || 0) ? y : x; }
    out.reads = Object.assign({}, A.reads, B.reads); for (const k in A.reads) if (B.reads[k]) out.reads[k] = (A.reads[k].score || 0) >= (B.reads[k].score || 0) ? A.reads[k] : B.reads[k];
    out.mine = [...new Set([...(A.mine || []), ...(B.mine || [])])];
    out.badges = Object.assign({}, B.badges, A.badges);
    for (const k of new Set([...Object.keys(A.stats), ...Object.keys(B.stats)])) out.stats[k] = Math.max(sumS[k] || 0, A.stats[k] || 0, B.stats[k] || 0);
    out.created = Math.min(A.created || Date.now(), B.created || Date.now());
    out.updated = Math.max(A.updated || 0, B.updated || 0);
    return out;
  };

  AZ.save = function (quiet) {
    AZ.account();
    AZ.S.updated = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(AZ.S)); } catch (e) { /* storage may be unavailable */ }
    if (AZ.Remote) AZ.Remote.schedule();
    if (!quiet) AZ.listeners.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
  };
  // fresh start: progress goes, settings (and the sync code) stay
  AZ.reset = function () { const keep = AZ.S.settings; AZ.S = DEFAULT(); AZ.S.settings = keep; AZ.S.updated = AZ.S.resetAt = Date.now(); snap(); if (AZ.Remote) AZ.Remote.replaceNext = true; AZ.save(); if (AZ.Remote) AZ.Remote.flush(); };
  AZ.replaceState = function (s) { const keep = AZ.S.settings; AZ.S = mergeDefaults(s); AZ.S.settings = keep; AZ.S.resetAt = Date.now(); snap(); if (AZ.Remote) AZ.Remote.replaceNext = true; AZ.save(); if (AZ.Remote) AZ.Remote.flush(); };

  /* ---------------- Spaced repetition (WaniKani-style stages) ---------------- */
  // stage 1..8 -> hours until the next review; 9 = done ("azulejo")
  const INTERVAL_H = [0, 4, 8, 23, 47, 167, 335, 719, 2879];
  AZ.STAGES = [
    { key: 'sketch', pt: 'Esboço', en: 'Sketch', from: 1, to: 4, color: 'var(--st-sketch)' },
    { key: 'paint', pt: 'Pintado', en: 'Painted', from: 5, to: 6, color: 'var(--st-paint)' },
    { key: 'glaze', pt: 'Vidrado', en: 'Glazed', from: 7, to: 7, color: 'var(--st-glaze)' },
    { key: 'fire', pt: 'Cozido', en: 'Fired', from: 8, to: 8, color: 'var(--st-fire)' },
    { key: 'done', pt: 'Azulejo', en: 'Mastered', from: 9, to: 9, color: 'var(--st-done)' },
  ];
  AZ.stageOf = st => AZ.STAGES.find(s => st >= s.from && st <= s.to) || AZ.STAGES[0];
  // srs entry: [stage, dueMinute, lastMinute, right, wrong]
  AZ.srsHas = id => !!AZ.S.srs[id];
  AZ.srsAdd = function (id, stage = 1) {
    if (AZ.S.srs[id]) return false;
    const m = AZ.minNow();
    AZ.S.srs[id] = [stage, m + Math.round(INTERVAL_H[Math.min(stage, 8)] * 60), m, 0, 0];
    return true;
  };
  AZ.srsAnswer = function (id, ok) {
    const it = AZ.S.srs[id]; if (!it) return;
    const m = AZ.minNow();
    let st = it[0];
    if (ok) st = Math.min(9, st + 1); else st = Math.max(1, st - (st >= 5 ? 2 : 1));
    it[0] = st; it[2] = m; it[1] = st >= 9 ? 9e9 : m + Math.round(INTERVAL_H[st] * 60);
    if (ok) it[3]++; else it[4]++;
    if (st === 9) AZ.badge('first-azulejo');
  };
  AZ.dueList = function () { const m = AZ.minNow(); return Object.keys(AZ.S.srs).filter(k => AZ.S.srs[k][1] <= m && AZ.S.srs[k][0] < 9); };
  AZ.forecast = function (hours = 24) {
    const m = AZ.minNow(), out = new Array(hours).fill(0);
    for (const k in AZ.S.srs) { const it = AZ.S.srs[k]; if (it[0] >= 9) continue; const h = Math.floor((it[1] - m) / 60); if (h >= 0 && h < hours) out[h]++; }
    return out;
  };
  AZ.nextDue = function () { let best = Infinity; const m = AZ.minNow(); for (const k in AZ.S.srs) { const it = AZ.S.srs[k]; if (it[0] < 9 && it[1] > m) best = Math.min(best, it[1]); } return best === Infinity ? null : best; };
  AZ.stageCounts = function (prefix) {
    const c = [0, 0, 0, 0, 0];
    for (const k in AZ.S.srs) { if (prefix && !k.startsWith(prefix)) continue; const i = AZ.STAGES.indexOf(AZ.stageOf(AZ.S.srs[k][0])); c[i]++; }
    return c;
  };
  AZ.itemLabel = function (id) {
    const [t, a, b] = id.split(':');
    if (t === 'w') { const e = AZ.word(a); return e ? { pt: AZ.withArt(e), en: AZ.glossShort(e.en), pic: e.pic } : { pt: a, en: '' }; }
    if (t === 'v') { const v = AZ.verbBy.get(a); return { pt: a, en: v ? AZ.glossShort(v.en) : '', pic: '#v' }; }
    if (t === 'c') { const T = E.TENSE[b]; return { pt: a + ' · ' + (T ? T.pt : b), en: T ? T.en : b, pic: '#c' }; }
    return { pt: id, en: '' };
  };

  /* ---------------- Known words (for the generator) ---------------- */
  AZ.knownSet = function (extra) {
    const K = new Set();
    for (const k in AZ.S.srs) { if (k[0] === 'w') K.add(k.slice(2)); else if (k[0] === 'v') K.add(k); }
    (extra || []).forEach(x => K.add(x));
    return K;
  };
  AZ.genCtx = function (extra, tense) {
    const K = AZ.knownSet(extra);
    const level = AZ.units.filter(AZ.chDone).length;
    return { K: id => K.has(id), level: Math.max(1, level + 1), rnd: Math.random, tense };
  };

  /* ---------------- Chapters: where you are ---------------- */
  // AZ.S.lessons[chapterId] = { done, best, at, n, seen }: done = chapter test passed (or marked as studied)
  AZ.chRec = u => AZ.S.lessons[u.id] || null;
  AZ.chDone = u => !!(AZ.S.lessons[u.id] || {}).done;
  AZ.currentChapter = () => AZ.units.find(u => !AZ.chDone(u)) || null;
  AZ.reached = () => { const c = AZ.currentChapter(); return c ? c.idx : AZ.units.length - 1; };
  // what you have studied so far: finished chapters plus the one you're on
  AZ.studied = () => AZ.units.filter(u => u.idx <= AZ.reached());
  AZ.markSeen = u => { const r = AZ.S.lessons[u.id] || {}; if (!r.seen) { AZ.S.lessons[u.id] = Object.assign({}, r, { seen: Date.now() }); AZ.save(true); } };
  AZ.itemsOfLesson = function (u, li) {
    const out = [];
    u.L[li].items.forEach(t => {
      if (t.startsWith('v:')) { const inf = t.slice(2); out.push('v:' + inf); if (u.tense) out.push('c:' + inf + ':' + u.tense); }
      else if (AZ.word(t)) out.push('w:' + t);
    });
    return out;
  };
  AZ.itemsOfChapter = u => [...new Set(u.L.flatMap((_, li) => AZ.itemsOfLesson(u, li)))];
  AZ.verbsOf = chs => [...new Set(chs.flatMap(u => u.L.flatMap(l => l.items)).filter(t => t.startsWith('v:')).map(t => t.slice(2)))];
  AZ.wordsOf = chs => [...new Set(chs.flatMap(u => u.L.flatMap(l => l.items)).filter(t => !t.startsWith('v:') && AZ.word(t)))];
  AZ.tensesOf = chs => { const s = new Set(['pres']); chs.forEach(u => u.tenses.forEach(t => s.add(t))); return [...s]; };
  // finishing a chapter puts its words, verbs and tenses into the review queue
  AZ.completeChapter = function (u, score) {
    const r = AZ.S.lessons[u.id] || {}, first = !r.done;
    AZ.S.lessons[u.id] = Object.assign({}, r, { done: true, best: Math.max(r.best || 0, score || 0), at: Date.now(), n: (r.n || 0) + 1 });
    const fresh = AZ.itemsOfChapter(u).filter(id => AZ.srsAdd(id));
    if (first) { AZ.S.stats.lessons++; AZ.badge('first-lesson'); }
    const lv = AZ.units.filter(x => x.s === u.s);
    if (lv.every(AZ.chDone)) AZ.badge('section-' + u.s);
    if (AZ.wordsLearned() >= 50) AZ.badge('words-50'); if (AZ.wordsLearned() >= 250) AZ.badge('words-250');
    return { first, fresh };
  };
  // progress from the old lesson path carries over
  AZ.units.forEach(u => { if (!AZ.S.lessons[u.id] && [0, 1, 2].every(li => (AZ.S.lessons[u.id + ':' + li] || {}).done)) AZ.S.lessons[u.id] = { done: true, best: 0, at: Date.now(), n: 1 }; });

  /* ---------------- XP, streak, badges ---------------- */
  AZ.addXP = function (n) {
    if (!n) return;
    const d = AZ.today();
    AZ.S.xp += n; AZ.S.days[d] = (AZ.S.days[d] || 0) + n;
    const s = AZ.streak();
    if (s >= 3) AZ.badge('streak-3'); if (s >= 7) AZ.badge('streak-7'); if (s >= 30) AZ.badge('streak-30'); if (s >= 100) AZ.badge('streak-100');
    if (AZ.S.xp >= 1000) AZ.badge('xp-1000'); if (AZ.S.xp >= 5000) AZ.badge('xp-5000');
  };
  AZ.todayXP = () => AZ.S.days[AZ.today()] || 0;
  AZ.streak = function () {
    let n = 0; const d = new Date();
    if (!AZ.S.days[AZ.today(d)]) d.setDate(d.getDate() - 1);
    while (AZ.S.days[AZ.today(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  AZ.level = function (xp = AZ.S.xp) { let lv = 1, need = 60, acc = 0; while (xp >= acc + need) { acc += need; lv++; need = Math.round(need * 1.18); } return { lv, into: xp - acc, need }; };
  AZ.BADGES = {
    'first-lesson': ['Primeiro capítulo', 'Finish your first chapter', 'star'],
    'perfect': ['Perfeito!', '100% in a chapter test', 'target'],
    'streak-3': ['Três dias', 'Study 3 days in a row', 'flame'], 'streak-7': ['Uma semana', 'Study 7 days in a row', 'flame'],
    'streak-30': ['Um mês', 'Study 30 days in a row', 'flame'], 'streak-100': ['Cem dias', 'Study 100 days in a row', 'flame'],
    'words-50': ['50 palavras', 'Get 50 words to Pintado', 'grid'], 'words-250': ['250 palavras', 'Get 250 words to Pintado', 'grid'],
    'first-azulejo': ['Primeiro azulejo', 'Master an item completely', 'tile'],
    'section-1': ['Nível A1', 'Finish every A1 chapter', 'crown'], 'section-2': ['Nível A1+', 'Finish every A1+ chapter', 'crown'],
    'section-3': ['Nível A2', 'Finish every A2 chapter', 'crown'], 'section-4': ['Nível B1', 'Finish every B1 chapter', 'crown'],
    'reader': ['Leitor', 'Finish 5 reading texts', 'book'], 'writer': ['Escritor', 'Finish 10 free-writing tasks', 'flag'],
    'gym-100': ['Conjugador', '100 correct conjugations', 'bolt'],
    'xp-1000': ['Mil pontos', 'Earn 1,000 points', 'bolt'], 'xp-5000': ['Cinco mil', 'Earn 5,000 points', 'bolt'],
  };
  AZ.badge = function (id) { if (!AZ.S.badges[id] && AZ.BADGES[id]) { AZ.S.badges[id] = Date.now(); AZ.newBadges = (AZ.newBadges || []).concat(id); } };
  AZ.wordsLearned = () => Object.keys(AZ.S.srs).filter(k => k[0] === 'w' && AZ.S.srs[k][0] >= 5).length;

  /* ---------------- Sound effects ---------------- */
  let actx = null;
  function tone(freq, t0, dur, type = 'sine', vol = 0.18) {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, actx.currentTime + t0);
    g.gain.setValueAtTime(0.0001, actx.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol, actx.currentTime + t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + t0 + dur);
    o.connect(g).connect(actx.destination); o.start(actx.currentTime + t0); o.stop(actx.currentTime + t0 + dur + 0.05);
  }
  AZ.sfx = function (kind) {
    if (!AZ.S.settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      if (kind === 'ok') { tone(784, 0, 0.12, 'triangle'); tone(1175, 0.09, 0.22, 'triangle'); }
      else if (kind === 'bad') { tone(220, 0, 0.18, 'sawtooth', 0.08); tone(174, 0.12, 0.25, 'sawtooth', 0.07); }
      else if (kind === 'done') { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.3, 'triangle', 0.16)); tone(1568, 0.42, 0.5, 'sine', 0.08); }
      else if (kind === 'tap') tone(660, 0, 0.05, 'sine', 0.05);
      else if (kind === 'combo') { tone(988, 0, 0.08, 'square', 0.05); tone(1319, 0.06, 0.12, 'square', 0.05); }
    } catch (e) { /* audio not available */ }
  };

  /* ---------------- Speech (European Portuguese) ---------------- */
  const SS = window.speechSynthesis;
  let voices = [];
  function loadVoices() { try { voices = SS ? SS.getVoices() : []; } catch (e) { voices = []; } }
  if (SS) { loadVoices(); try { SS.addEventListener('voiceschanged', () => { loadVoices(); AZ.listeners.forEach(fn => fn('voices')); }); } catch (e) { SS.onvoiceschanged = loadVoices; } }
  AZ.ptVoices = () => voices.filter(v => /^pt/i.test(v.lang)).sort((a, b) => score(b) - score(a));
  function score(v) { let s = 0; if (/pt[-_]PT/i.test(v.lang)) s += 10; if (/Portugal|Joana|Catarina|Helia|Raquel|Duarte|Fernanda|Cristiano|Ines|Inês/i.test(v.name)) s += 4; if (/Natural|Online|Neural|Enhanced|Premium/i.test(v.name)) s += 2; if (/Brasil|Brazil|pt[-_]BR/i.test(v.name + v.lang)) s -= 6; return s; }
  AZ.bestVoice = function () {
    const pref = AZ.S.settings.voice;
    const list = AZ.ptVoices();
    if (pref && pref !== 'auto' && pref !== 'claude') { const v = list.find(x => x.name === pref); if (v) return v; }
    return list[0] || null;
  };
  AZ.hasPTPT = () => AZ.ptVoices().some(v => /pt[-_]PT/i.test(v.lang));
  let claudeTTS = null, claudeLang = 'pt-PT';
  // the Claude voice on claude.ai: ask for European Portuguese, fall back to plain Portuguese if that is not offered
  function claudeSay(text, rate, onend) {
    const t = claudeTTS;
    const go = lang => t.speak(text, { language: lang, rate }).then(() => { if (onend) onend(); }, err => {
      const code = String((err && err.code) || '');
      if (code === 'not_granted') { claudeTTS = null; AZ.listeners.forEach(fn => fn('voices')); return; } // turned off by the viewer
      if (lang !== 'pt' && /invalid|unsupported|language|argument/i.test(code)) { claudeLang = 'pt'; return go('pt'); }
    });
    return go(claudeLang);
  }
  // speech scheduled for a moment later (after a page or exercise appears) can be cancelled
  let speechTimers = [];
  const clearSpeechTimers = () => { speechTimers.forEach(clearTimeout); speechTimers = []; };
  AZ.speakSoon = function (text, ms, opts) {
    const t = setTimeout(() => { speechTimers = speechTimers.filter(x => x !== t); AZ.speak(text, Object.assign({}, opts, { _timer: true })); }, ms || 0);
    speechTimers.push(t);
  };
  AZ.speak = function (text, opts = {}) {
    if (!opts._timer) clearSpeechTimers();
    text = String(text || '').replace(/[{}]/g, '');
    if (!text) return;
    const rate = (opts.slow ? 0.62 : 1) * (AZ.S.settings.rate || 0.9);
    const pref = AZ.S.settings.voice;
    const useClaude = claudeTTS && (pref === 'claude' || (pref === 'auto' && !AZ.hasPTPT()));
    if (useClaude) { try { claudeSay(text, Math.max(0.7, Math.min(1.5, rate)), opts.onend); return; } catch (e) { /* fall back */ } }
    if (!SS) return;
    try {
      SS.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = AZ.bestVoice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'pt-PT';
      u.rate = rate; u.pitch = 1;
      if (opts.onend) u.onend = opts.onend;
      if (opts.onboundary) u.onboundary = opts.onboundary;
      SS.speak(u);
    } catch (e) { /* speech not available */ }
  };
  AZ.stopSpeech = () => { clearSpeechTimers(); try { SS && SS.cancel(); } catch (e) {} try { claudeTTS && claudeTTS.stop(); } catch (e) {} };
  AZ.canSpeak = () => !!(SS || claudeTTS);
  AZ.hasClaudeTTS = () => !!claudeTTS;

  /* ---------------- Remote saving ---------------- */
  // local: this browser only · claude: your private storage on claude.ai · cloud: the Cloudflare Worker that serves the site
  const storeLocal = () => { try { localStorage.setItem(KEY, JSON.stringify(AZ.S)); } catch (e) {} };
  const Remote = (AZ.Remote = {
    mode: 'local', status: 'local', lastSync: 0, lastPull: 0, lastPush: 0, claude: null, cloud: null,
    busy: false, again: false, timer: null, replaceNext: false, error: '',
    async init() {
      clearTimeout(this.timer); this.timer = null; this.error = '';
      // 1) the Cloudflare backend on the same site (or a custom server from the settings)
      this.cloud = await detectCloud();
      if (this.cloud) { this.mode = 'cloud'; await this.pull(); if (AZ.Account) AZ.Account.check().then(() => AZ.listeners.forEach(fn => fn('sync'))); return; }
      // 2) claude.ai artifact storage (per person, private)
      this.claude = await detectClaude();
      if (this.claude) { this.mode = 'claude'; await this.pull(); return; }
      this.mode = 'local'; this.status = 'local'; AZ.listeners.forEach(fn => fn('sync'));
    },
    async pull() {
      if (this.mode === 'local') return;
      try {
        this.status = 'syncing'; AZ.listeners.forEach(fn => fn('sync'));
        const remote = this.mode === 'cloud' ? await this.cloud.load() : await this.claude.load();
        this.lastPull = Date.now();
        if (remote) AZ.absorb(remote);
        await this.push();
        AZ.listeners.forEach(fn => fn());
      } catch (e) { console.warn('sync pull failed', e); this.status = 'error'; this.error = e.message || String(e); AZ.listeners.forEach(fn => fn('sync')); this.retryLater(); }
    },
    // Changes are batched: at most one upload every few seconds on claude.ai and every 20 s on Cloudflare.
    schedule() {
      if (this.mode === 'local' || this.timer) return;
      const gap = this.mode === 'cloud' ? 20000 : 5000;
      this.timer = setTimeout(() => { this.timer = null; this.push(); }, Math.max(1500, gap - (Date.now() - this.lastPush)));
    },
    // upload now (end of a lesson, fresh start)
    flush() { if (this.mode === 'local') return Promise.resolve(); clearTimeout(this.timer); this.timer = null; return this.push(); },
    retryLater() { if (!this.timer && this.mode !== 'local') this.timer = setTimeout(() => { this.timer = null; this.push(); }, 60000); },
    async push() {
      if (this.mode === 'local') return;
      if (this.busy) { this.again = true; return; }
      this.busy = true; this.lastPush = Date.now();
      const replace = this.replaceNext; this.replaceNext = false;
      try {
        this.status = 'syncing'; AZ.listeners.forEach(fn => fn('sync'));
        if (this.mode === 'cloud') await this.cloud.save(AZ.S, replace); else await this.claude.save(AZ.S, replace);
        this.status = 'synced'; this.error = ''; this.lastSync = Date.now();
      } catch (e) {
        console.warn('sync push failed', e); this.status = 'error'; this.error = e.message || String(e);
        if (replace) this.replaceNext = true;
        this.retryLater();
      }
      this.busy = false; AZ.listeners.forEach(fn => fn('sync'));
      if (this.again) { this.again = false; this.schedule(); }
    },
  });
  const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);

  async function detectCloud() {
    // where to save: a server typed in the settings, else the site itself (when it runs on the Worker),
    // else the Worker named in config.js (copies on GitHub Pages, or opened from a file)
    const custom = (AZ.S.settings.sync.endpoint || '').trim().replace(/\/+$/, '');
    const conf = String((window.AZ_CONFIG || {}).api || '').trim().replace(/\/+$/, '');
    const web = /^https?:$/.test(location.protocol);
    let candidates = [];
    if (custom) candidates = [custom];
    else {
      if (window.claude && typeof window.claude.use === 'function') return null; // running on claude.ai
      let same = false; try { same = !!conf && new URL(conf).origin === location.origin; } catch (e) {}
      if (web && !/\.github\.io$/.test(location.hostname)) candidates.push('');
      if (conf && !same) candidates.push(conf);
    }
    let base = null;
    for (const c of candidates) {
      try {
        const r = await withTimeout(fetch(c + '/api/health', { cache: 'no-store' }), 4000);
        if (!r.ok) continue;
        const j = await r.json(); if (j && j.app === 'azulejo') { base = c; break; }
      } catch (e) { /* try the next one */ }
    }
    if (base === null) return null;
    if (!AZ.S.settings.sync.id) { AZ.S.settings.sync.id = 'az-' + AZ.uid(22); storeLocal(); }
    const id = () => AZ.S.settings.sync.id;
    const url = () => base + '/api/progress/' + encodeURIComponent(id());
    const hdr = extra => { const h = Object.assign({}, extra || {}); if (AZ.S.settings.sync.token) h['x-sync-token'] = AZ.S.settings.sync.token; const se = AZ.Account.session(); if (se) h.authorization = 'Bearer ' + se.token; return h; };
    const fail = async r => {
      const j = await r.json().catch(() => ({}));
      if (r.status === 401 && j.login) { AZ.Account.expired(); throw new Error('Log in to keep syncing this progress'); }
      throw new Error(r.status === 401 ? (j.error || 'Wrong sync password') : r.status === 503 ? 'The site has no database yet (see README)' : 'Server error ' + r.status);
    };
    // rev = the server's version of the progress we last saw; a save only succeeds if nobody saved in between
    let rev = null, revFor = '', lastSent = '', clearPending = false;
    const take = j => {
      rev = j.rev || 0; revFor = id();
      let d = j.data || null;
      if (j.pending) { d = d ? AZ.merge(d, j.pending) : j.pending; clearPending = true; } // saved by a closing tab while another device was busy
      return d;
    };
    const api = {
      async load() {
        const r = await withTimeout(fetch(url(), { cache: 'no-store', headers: hdr() }), 8000);
        if (r.status === 404) { rev = 0; revFor = id(); return null; }
        if (!r.ok) await fail(r);
        return take(await r.json());
      },
      async save(S, replace) {
        if (revFor !== id() && !replace) AZ.absorb(await api.load());
        for (let attempt = 0; attempt < 4; attempt++) {
          const data = JSON.stringify(AZ.S);
          if (data === lastSent && !replace) return;
          const body = '{"data":' + data + ',"updated":' + (AZ.S.updated || 0) + ',"base":' + (rev || 0) + (replace ? ',"replace":true' : '') + (clearPending ? ',"clearPending":true' : '') + '}';
          const r = await withTimeout(fetch(url(), { method: 'PUT', headers: hdr({ 'content-type': 'application/json' }), body }), 12000);
          if (r.status === 409) {
            // another device saved in the meantime: fold its progress into ours and try again
            const d = take(await r.json().catch(() => ({})));
            if (d) { AZ.absorb(d); if (!AZ.inSession || !AZ.inSession()) AZ.listeners.forEach(fn => fn()); }
            continue;
          }
          if (!r.ok) await fail(r);
          const j = await r.json().catch(() => ({}));
          rev = j.rev != null ? j.rev : (rev || 0) + 1; revFor = id();
          lastSent = data; clearPending = false;
          return;
        }
        throw new Error('Could not save — please try again');
      },
      // when the tab closes: hand over anything not yet saved (no answer comes back)
      beacon() {
        const data = JSON.stringify(AZ.S);
        if (data === lastSent || !navigator.sendBeacon) return;
        const se = AZ.Account.session(), qs = [];
        if (AZ.S.settings.sync.token) qs.push('t=' + encodeURIComponent(AZ.S.settings.sync.token));
        if (se) qs.push('s=' + se.token);
        const q = qs.length ? '?' + qs.join('&') : '';
        const ok = navigator.sendBeacon(url() + q, new Blob(['{"data":' + data + ',"updated":' + (AZ.S.updated || 0) + ',"base":' + (rev || 0) + ',"beacon":true}'], { type: 'text/plain' }));
        if (ok) { lastSent = data; rev = null; revFor = ''; } // the version moved on: look again before the next save
      },
    };
    api.base = base;
    api.hdr = hdr;
    return api;
  }
  async function detectClaude() {
    const C = window.claude;
    if (!C || typeof C.use !== 'function') return null;
    try {
      const [db, user, tts] = await withTimeout(Promise.all([C.use('db'), C.use('user'), C.use('tts').catch(() => null)]), 11000);
      if (tts) { claudeTTS = tts; AZ.listeners.forEach(fn => fn('voices')); }
      if (!db || !user) return null;
      const id = await user.id(); if (!id) return null;
      const base = 'data/users/' + id;
      // progress lives in a few private documents; the review items are split into chunks under the 256 KB document limit
      const docState = db.doc(base + '/state');
      const srsDoc = i => db.doc(base + '/srs' + (i ? i + 1 : ''));
      const CHUNK = 180000, MAXC = 6;
      let sentA = '', sentB = [], lastLoad = 0;
      const api = {
        async load() {
          const a = await withTimeout(docState.get(), 10000);
          lastLoad = Date.now();
          if (!a.exists) return null;
          const s = JSON.parse(JSON.stringify(a.data()));
          const first = await withTimeout(srsDoc(0).get(), 10000);
          let txt = '';
          if (first.exists) {
            const d = first.data(); const n = d.n || 1; txt = d.part || d.srs || '';
            for (let i = 1; i < n; i++) { const c = await withTimeout(srsDoc(i).get(), 10000); if (c.exists) txt += c.data().part || ''; }
          }
          try { s.srs = txt ? JSON.parse(txt) : {}; } catch (e) { s.srs = {}; }
          return s;
        },
        async save(S, replace) {
          // another tab or device may have saved since we last looked: merge its progress first (not after a fresh start)
          if (!replace && Date.now() - lastLoad > 60000) { try { AZ.absorb(await api.load()); } catch (e) {} }
          S = AZ.S;
          const copy = Object.assign({}, S); delete copy.srs;
          const A = JSON.stringify(copy), B = JSON.stringify(S.srs);
          if (A !== sentA || replace) { await docState.set(JSON.parse(A)); sentA = A; }
          const parts = []; for (let i = 0; i < B.length; i += CHUNK) parts.push(B.slice(i, i + CHUNK));
          if (!parts.length) parts.push('{}');
          if (parts.length > MAXC) throw new Error('Progress too large to save here — export a backup');
          for (let i = 0; i < parts.length; i++) {
            if (!replace && sentB[i] === parts[i] && sentB.length === parts.length) continue;
            await srsDoc(i).set(i === 0 ? { part: parts[0], n: parts.length } : { part: parts[i] });
          }
          sentB = parts;
        },
      };
      return api;
    } catch (e) { console.warn('claude storage unavailable', e); return null; }
  }
  // pick up the Claude voice even when saving happens elsewhere
  (async function () { try { if (window.claude && window.claude.use && !claudeTTS) { const t = await withTimeout(window.claude.use('tts'), 11000); if (t) { claudeTTS = t; AZ.listeners.forEach(fn => fn('voices')); } } } catch (e) {} })();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      AZ.stopSpeech();
      storeLocal();
      if (Remote.mode === 'cloud' && Remote.cloud) { clearTimeout(Remote.timer); Remote.timer = null; Remote.cloud.beacon(); }
      else if (Remote.mode === 'claude') Remote.flush();
    } else if (Remote.mode !== 'local' && Date.now() - Remote.lastPull > 60000 && !Remote.busy) {
      Remote.pull(); // back from another app or device: fetch what changed there
    }
  });

  /* ---------------- Accounts (on the Cloudflare site) ---------------- */
  // The password never leaves the browser: it is stretched here into a key (PBKDF2-SHA256, salted with the
  // username) and only that key is sent. The session token lives in this browser only, not in the progress.
  const SESSION_KEY = 'azulejo.session';
  let session = null;
  try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { session = null; }
  const ROUNDS = 400000;
  async function stretch(username, password) {
    const enc = new TextEncoder();
    const k = await crypto.subtle.importKey('raw', enc.encode(password.normalize('NFC')), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode('azulejo/v1/' + username.trim().toLowerCase()), iterations: ROUNDS }, k, 256);
    return btoa(String.fromCharCode(...new Uint8Array(bits)));
  }
  function setSession(se) { session = se; try { if (se) localStorage.setItem(SESSION_KEY, JSON.stringify(se)); else localStorage.removeItem(SESSION_KEY); } catch (e) {} }
  async function call(path, body, auth) {
    const c = Remote.cloud; if (!c) throw new Error('Accounts work when Azulejo runs on its Cloudflare site.');
    const headers = { 'content-type': 'application/json' };
    if (AZ.S.settings.sync.token) headers['x-sync-token'] = AZ.S.settings.sync.token;
    if (auth && session) headers.authorization = 'Bearer ' + session.token;
    const r = await withTimeout(fetch(c.base + '/api/account/' + path, { method: body ? 'POST' : 'GET', headers, body: body ? JSON.stringify(body) : undefined, cache: 'no-store' }), 20000);
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.error || 'Something went wrong (' + r.status + ')'); e.status = r.status; throw e; }
    return j;
  }
  // start fresh on this device under a new anonymous code, without touching the saved copy
  function freshDevice() {
    const keep = Object.assign({}, AZ.S.settings, { sync: Object.assign({}, AZ.S.settings.sync, { id: 'az-' + AZ.uid(22) }) });
    AZ.S = DEFAULT(); AZ.S.settings = keep; AZ.S.updated = Date.now(); snap();
    storeLocal();
  }
  AZ.Account = {
    session: () => session,
    user: () => (session ? session.username : null),
    available: () => Remote.mode === 'cloud',
    expired: () => { if (session) { session = Object.assign({}, session, { stale: true }); setSession(session); } },
    async signup(username, password) {
      const key = await stretch(username, password);
      const j = await call('signup', { username, key, code: AZ.S.settings.sync.id });
      setSession({ username: j.username, token: j.token });
      AZ.S.settings.sync.id = j.code; storeLocal();
      await Remote.pull(); // saves this device's progress to the account
      return j;
    },
    async login(username, password) {
      const key = await stretch(username, password);
      const j = await call('login', { username, key });
      setSession({ username: j.username, token: j.token });
      const guest = AZ.S.settings.sync.id;
      AZ.S.settings.sync.id = j.code; storeLocal();
      await Remote.pull(); // the account's progress, merged with what this device had
      return Object.assign(j, { merged: guest !== j.code });
    },
    async logout() {
      try { await call('logout', {}, true); } catch (e) { /* offline: forget the session anyway */ }
      await Remote.flush().catch(() => {});
      setSession(null);
      freshDevice(); // the next person on this device starts clean; your progress stays in the account
      await Remote.pull();
    },
    async changePassword(oldPw, newPw) {
      const u = session.username;
      await call('password', { key: await stretch(u, oldPw), newKey: await stretch(u, newPw) }, true);
    },
    async remove(password) {
      await call('delete', { key: await stretch(session.username, password) }, true);
      setSession(null); freshDevice(); await Remote.pull();
    },
    async check() { if (!session || Remote.mode !== 'cloud') return; try { await call('me', null, true); if (session.stale) setSession(Object.assign({}, session, { stale: false })); } catch (e) { if (e.status === 401) AZ.Account.expired(); } },
  };

  /* ---------------- Backup ---------------- */
  AZ.exportText = () => JSON.stringify({ app: 'azulejo', exported: new Date().toISOString(), state: AZ.S });
  AZ.importText = function (txt) {
    const j = JSON.parse(txt); const s = j && j.state ? j.state : j;
    if (!s || typeof s !== 'object' || !('srs' in s)) throw new Error('This does not look like an Azulejo backup.');
    AZ.absorb(s); AZ.save();
  };
})();
