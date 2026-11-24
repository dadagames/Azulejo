/* Azulejo · practice: typed exercises, the session player, and every kind of session
   (chapter tests, writing, conjugation, mixed, free writing, reviews, decks). */
(function () {
  'use strict';
  const AZ = window.AZ, E = AZ.E, G = AZ.G, esc = AZ.esc, I = AZ.icon;
  const pick = AZ.pick, shuffle = AZ.shuffle;

  /* ---------------- Sentence index (hand-written sentences, by word) ---------------- */
  const SENTS = [];
  AZ.units.forEach(u => u.S.forEach((s, k) => { s.unit = u; s.key = u.id + '#' + k; s.tokens = tokens(s.pt); SENTS.push(s); }));
  function tokens(pt) { return E.normalize(pt, 'pt').split(/[\s]+/).flatMap(t => t.split('-')).filter(Boolean); }
  function sentWords(s) { if (s.ids) return s.ids; s.ids = new Set(); s.tokens.forEach(t => (AZ.formIndex.get(t) || []).forEach(id => s.ids.add(id))); return s.ids; }
  AZ.sentsWithWord = function (id, maxIdx) { return SENTS.filter(s => s.unit.idx <= maxIdx && sentWords(s).has(id)); };
  AZ.maxUnitReached = () => AZ.reached();

  /* ---------------- Small helpers ---------------- */
  const GOOD = ['Correto!', 'Muito bem!', 'Isso mesmo!', 'Perfeito!', 'Certo!'];
  const BAD = ['Net niet.', 'Nog niet helemaal.', 'Bijna.'];
  const PERS_LABEL = ['eu', 'tu', 'ele / ela / você', 'nós', 'vós', 'eles / elas / vocês'];
  const IMP_LABEL = ['', 'tu', 'você', 'nós', 'vós', 'vocês'];
  const drillPersons = () => (AZ.S.settings.vos ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 5]);
  const isImp = t => t === 'impa' || t === 'impn';
  const glossList = en => [...new Set(String(en).split(/[;,]/).map(x => x.replace(/\(.*?\)/g, '').trim()).filter(Boolean).concat(AZ.glossShort(en)))];

  /* ---------------- Exercise builders (everything is typed) ---------------- */
  const X = (AZ.X = {});
  // English -> Portuguese word
  X.typeWord = function (id) {
    const e = AZ.word(id); if (!e) return null;
    const answers = [AZ.article(e) + e.pt, e.pt];
    if (e.f && /^(m|mf)$/.test(e.type)) answers.push('a ' + e.f, e.f);
    const isNoun = /^(m|f|mf|m\.pl|f\.pl)$/.test(e.type);
    return { type: 'type', kind: 'word', items: ['w:' + id], prompt: AZ.glossShort(e.en), promptLang: 'nl', pic: e.pic, q: isNoun ? 'Schrijf het in het Portugees, met o of a' : 'Schrijf het in het Portugees', answers: isNoun ? answers.slice(0, 1).concat(answers.slice(2, 3)) : answers, looser: isNoun ? answers : null, lang: 'pt', say: AZ.article(e) + e.pt, needArticle: isNoun, wordId: id };
  };
  // Portuguese -> English meaning
  X.meaningWord = function (id) {
    const e = AZ.word(id); if (!e) return null;
    return { type: 'type', kind: 'word', items: ['w:' + id], prompt: AZ.withArt(e), promptLang: 'pt', speak: AZ.article(e) + e.pt, q: 'Wat betekent het?', answers: glossList(e.en), lang: 'nl', wordId: id, translation: e.en };
  };
  // hear a word, write it
  X.listenWord = function (id) {
    const e = AZ.word(id); if (!e) return null;
    if (!canListen(AZ.article(e) + e.pt)) return X.typeWord(id);
    return { type: 'type', kind: 'word', listen: true, items: ['w:' + id], speak: AZ.article(e) + e.pt, q: 'Schrijf het woord dat je hoort', answers: [AZ.article(e) + e.pt, e.pt], lang: 'pt', translation: AZ.glossShort(e.en), wordId: id };
  };
  X.verbMeaning = function (inf, dir) {
    const v = AZ.verbBy.get(inf); if (!v) return null;
    if (dir === 'en') return { type: 'type', kind: 'word', items: ['v:' + inf], prompt: inf, promptLang: 'pt', speak: inf, q: 'Wat betekent dit werkwoord?', answers: glossList(v.en), lang: 'nl', translation: v.en };
    return { type: 'type', kind: 'word', items: ['v:' + inf], prompt: AZ.glossShort(v.en), promptLang: 'nl', q: 'Schrijf het werkwoord in de infinitief', answers: [inf], lang: 'pt', say: inf };
  };
  // one form
  X.conj = function (inf, tense, person) {
    const F = E.conjugate(inf); if (!F || !F[tense]) return null;
    const persons = isImp(tense) ? [1, 2, 3, 5] : drillPersons();
    const p = person == null || !persons.includes(person) ? pick(persons) : person;
    const form = F[tense][p]; if (!form) return null;
    const label = isImp(tense) ? IMP_LABEL[p] : PERS_LABEL[p];
    const answers = [form]; if (tense === 'impn') answers.push('não ' + form);
    return { type: 'conj', items: ['c:' + inf + ':' + tense], inf, tense, p, label, answers, lang: 'pt', say: (tense === 'impn' ? 'não ' : '') + form, strictTypos: true };
  };
  // a whole table: every person, typed
  X.table = function (inf, tense) {
    const F = E.conjugate(inf); if (!F || !F[tense]) return null;
    const persons = (isImp(tense) ? [1, 2, 3, 5] : drillPersons()).filter(p => F[tense][p]);
    return { type: 'table', items: ['c:' + inf + ':' + tense], inf, tense, persons, forms: persons.map(p => F[tense][p]), labels: persons.map(p => isImp(tense) ? IMP_LABEL[p] : PERS_LABEL[p]), lang: 'pt' };
  };
  // a sentence: write it in Portuguese, translate it, write what you hear, or fill the gap
  X.sentence = function (s, mode, items) {
    if (!s) return null;
    const ptAns = [s.pt].concat(s.ptAlt || []), enAns = [s.en].concat(s.enAlt || []);
    const base = { items: items || [], src: s, kind: 'sentence' };
    if (mode === 'listen' && !canListen(s.pt)) mode = 'write';
    // translating into Dutch is only checked for hand-written sentences (they list the good translations)
    if (mode === 'translate' && !s.unit) mode = 'write';
    if (mode === 'cloze') { const c = clozeOf(s); if (!c) mode = 'write'; else return Object.assign(base, { type: 'cloze', before: c.before, after: c.after, hintWord: c.hint, answers: c.answers, lang: 'pt', en: s.en, q: 'Vul het ontbrekende woord in', say: s.pt, strictTypos: true, items: base.items.concat(c.item ? [c.item] : []), focus: c.item }); }
    switch (mode) {
      case 'translate': return Object.assign(base, { type: 'type', prompt: s.pt, promptLang: 'pt', speak: s.pt, q: 'Vertaal naar het Nederlands', answers: enAns, lang: 'nl' });
      case 'listen': return Object.assign(base, { type: 'type', listen: true, speak: s.pt, q: 'Schrijf op wat je hoort', answers: ptAns, lang: 'pt', translation: s.en, say: s.pt });
      default: return Object.assign(base, { type: 'type', prompt: s.en, promptLang: 'nl', q: 'Schrijf dit in het Portugees', answers: ptAns, lang: 'pt', hint: s.hint, say: s.pt });
    }
  };
  function clozeOf(s) {
    // the gap: marked {word} in hand-written sentences, or the generator's focus form
    const target = s.blanks && s.blanks.length ? pick(s.blanks) : s.focus && s.focus.form;
    if (!target) return null;
    const re = new RegExp('(^|[^\\p{L}])(' + target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\p{L}])', 'iu');
    const m = s.pt.match(re); if (!m) return null;
    const at = m.index + m[1].length;
    const real = s.pt.slice(at, at + target.length);
    const hits = AZ.verbIndex().get(real.toLowerCase()) || [];
    const inf = s.focus && s.focus.form && s.focus.form.toLowerCase() === real.toLowerCase() ? s.focus.inf : hits.length ? hits[0].inf : null;
    const tense = s.focus && s.focus.form === real ? s.focus.t : hits.length ? hits[0].t : null;
    return { before: s.pt.slice(0, at), after: s.pt.slice(at + target.length), answers: [real], hint: inf || '…', item: inf && tense && E.TENSE[tense] ? 'c:' + inf + ':' + tense : null };
  }
  // a listening exercise needs a recording (or the device voice when it is allowed)
  function canListen(text) { return AZ.hasRecordings() ? (AZ.recorded(text) || (AZ.S.settings.fallback && AZ.canSpeak())) : AZ.canSpeak(); }
  AZ.canListen = canListen;
  // an example from the course book: Dutch -> Portuguese
  X.example = function (x, items) {
    if (!x || !x.pt || !x.en) return null;
    const pt = x.pt.replace(/\s*\(.*?\)\s*$/, '').trim(), nl = x.en.replace(/\s*\(.*?\)\s*$/, '').trim();
    if (!pt || !nl || pt.split(' ').length > 14 || / — /.test(pt)) return null;
    return { type: 'type', kind: 'sentence', items: items || [], prompt: nl, promptLang: 'nl', q: 'Schrijf dit in het Portugees', answers: [pt], lang: 'pt', say: pt, src: x };
  };
  X.free = function (u, k) {
    const w = u.write[k]; if (!w) return null;
    return { type: 'free', items: [], chapter: u, task: w.task, model: w.model, hint: w.hint, k };
  };

  /* ---------------- Pools of sentences ---------------- */
  const RECENT = []; const recentHas = pt => RECENT.includes(pt); const recentAdd = pt => { RECENT.push(pt); if (RECENT.length > 120) RECENT.shift(); };
  function genFor(u, ctx, n, tense) {
    const out = [], seen = new Set();
    if (!u.gen || !u.gen.length) return out;
    for (let i = 0; i < n * 5 && out.length < n; i++) {
      const r = G.make(pick(u.gen), Object.assign({}, ctx, { tense: tense || u.tense }));
      if (r && !seen.has(r.pt) && !recentHas(r.pt)) { seen.add(r.pt); out.push(r); }
    }
    return out;
  }
  // hand-written sentences from the chapters, mixed with fresh ones built from the words you know
  function sentencePool(chs, n) {
    const known = chs.flatMap(u => u.L.flatMap(l => l.items));
    const hand = shuffle(chs.flatMap(u => u.S).filter(s => !recentHas(s.pt)));
    const gen = [];
    shuffle(chs.slice()).forEach(u => genFor(u, AZ.genCtx(known, u.tense), Math.ceil(n / Math.max(1, chs.length)) + 1).forEach(s => gen.push(s)));
    const out = [], g = shuffle(gen);
    while (out.length < n && (hand.length || g.length)) { if (hand.length) out.push(hand.shift()); if (g.length && out.length < n) out.push(g.shift()); }
    out.forEach(s => recentAdd(s.pt));
    return out;
  }

  /* ---------------- Session builders ---------------- */
  AZ.buildWriting = function (chs, n = 12) {
    const modes = ['write', 'write', 'listen', 'write', 'translate', 'write', 'cloze'];
    return sentencePool(chs, n).map((s, i) => X.sentence(s, modes[i % modes.length])).filter(Boolean);
  };
  // cfg: { verbs, tenses, format: 'forms' | 'tables' | 'context' | 'all', n }
  AZ.buildConjugation = function (cfg) {
    const verbs = cfg.verbs.filter(v => E.conjugate(v)), tenses = cfg.tenses, n = cfg.n || 15, fmt = cfg.format || 'all';
    if (!verbs.length || !tenses.length) return [];
    const out = [];
    const tables = fmt === 'tables' ? n : fmt === 'all' ? Math.max(1, Math.round(n / 6)) : 0;
    const context = fmt === 'context' ? n : fmt === 'all' ? Math.round(n / 3) : 0;
    const used = new Set();
    for (let i = 0; i < tables * 4 && out.filter(x => x.type === 'table').length < tables; i++) { const v = pick(verbs), t = pick(tenses); if (used.has(v + t)) continue; used.add(v + t); const ex = X.table(v, t); if (ex) out.push(ex); }
    // in context: generated sentences whose verb is one of yours, or hand-written gaps in these tenses
    const ctx = AZ.genCtx(verbs.map(v => 'v:' + v));
    const ctxOut = [];
    for (let i = 0; i < context * 8 && ctxOut.length < context; i++) {
      const t = pick(tenses); if (isImp(t)) continue;
      const r = G.make(pick(['svo', 'sv_adv', 'svo', 'sv_lang', 'morar']), Object.assign({}, ctx, { tense: t }));
      if (r && r.focus && verbs.includes(r.focus.inf) && r.focus.t === t && !recentHas(r.pt)) { recentAdd(r.pt); ctxOut.push(X.sentence(r, 'cloze')); }
    }
    if (ctxOut.length < context) shuffle(SENTS.filter(s => s.blanks && s.blanks.length && tenses.includes(s.unit.tense) && s.unit.idx <= AZ.reached())).slice(0, context - ctxOut.length).forEach(s => ctxOut.push(X.sentence(s, 'cloze')));
    ctxOut.filter(Boolean).forEach(x => out.push(x));
    for (let i = 0; i < n * 3 && out.length < n; i++) { const ex = X.conj(pick(verbs), pick(tenses)); if (ex) out.push(ex); }
    return shuffle(out.filter(Boolean)).slice(0, n);
  };
  // later levels: writing and conjugating together
  AZ.buildMixed = function (chs, n = 16) {
    const w = AZ.buildWriting(chs, Math.ceil(n / 2));
    const verbs = AZ.verbsOf(chs);
    const c = verbs.length ? AZ.buildConjugation({ verbs, tenses: AZ.tensesOf(chs), format: 'all', n: Math.floor(n / 2) }) : [];
    return shuffle(w.concat(c)).slice(0, n);
  };
  // chapter test: everything typed, no second chances, 70% to pass
  AZ.buildChapterTest = function (u) {
    const out = [];
    const known = u.L.flatMap(l => l.items);
    const hand = shuffle(u.S.slice());
    ['write', 'write', 'listen', 'translate', 'write', 'cloze'].forEach(m => { const s = hand.shift(); if (s) out.push(X.sentence(s, m)); });
    genFor(u, AZ.genCtx(known, u.tense), 2).forEach(s => out.push(X.sentence(s, 'write')));
    const verbs = AZ.verbsOf([u]);
    if (verbs.length) {
      const t = u.tenses[0];
      shuffle(verbs).slice(0, 2).forEach(v => out.push(X.conj(v, t)));
      out.push(X.table(pick(verbs), t));
    }
    shuffle(AZ.wordsOf([u])).slice(0, Math.max(2, 13 - out.length)).forEach((id, i) => out.push(i % 2 ? X.meaningWord(id) : X.typeWord(id)));
    return shuffle(out.filter(Boolean)).slice(0, 14);
  };

  // the test at the end of one part: its examples, its conjugation tables, its words and sentences
  AZ.buildPartTest = function (u, k) {
    const P = u.parts[k]; if (!P) return [];
    const out = [], items = P.L.flatMap(L => AZ.itemsOfLesson(u, L.li));
    const have = () => out.filter(Boolean).length;
    // the part's own examples: one to hear and write, the others from Dutch into Portuguese
    const exs = shuffle(P.ex.slice());
    const heard = exs.find(x => canListen(x.pt) && x.pt.split(' ').length <= 8);
    if (heard) out.push({ type: 'type', kind: 'sentence', listen: true, items: [], speak: heard.pt, q: 'Schrijf op wat je hoort', answers: [heard.pt.replace(/\s*\(.*?\)\s*$/, '')], lang: 'pt', translation: heard.en, say: heard.pt });
    exs.filter(x => x !== heard).slice(0, heard ? 2 : 3).forEach(x => out.push(X.example(x)));
    const forms = shuffle(P.conj.flatMap(c => c.verbs.map(v => [v, c.t]))).filter(([v, t]) => E.conjugate(v) && E.conjugate(v)[t]);
    forms.slice(0, 2).forEach(([v, t]) => out.push(X.conj(v, t)));
    if (forms.length >= 3) out.push(X.table(forms[2][0], forms[2][1]));
    const hand = shuffle(P.S.slice());
    ['write', 'listen', 'cloze', 'translate', 'write'].forEach(m => { if (have() < 6) { const s = hand.shift(); if (s) out.push(X.sentence(s, m)); } });
    const words = shuffle(items.filter(i => i[0] === 'w').map(i => i.slice(2)));
    const verbs = shuffle(items.filter(i => i[0] === 'v').map(i => i.slice(2)));
    words.slice(0, 3).forEach((id, i) => out.push(i % 2 ? X.meaningWord(id) : X.typeWord(id)));
    verbs.slice(0, 1).forEach(v => out.push(X.verbMeaning(v, 'type')));
    // a part with little of its own: top up from the chapter's sentences and words
    if (have() < 6) shuffle(u.S.slice()).slice(0, 6 - have()).forEach(s => out.push(X.sentence(s, 'write')));
    if (have() < 6) shuffle(AZ.wordsOf([u])).slice(0, 6 - have()).forEach(id => out.push(X.typeWord(id)));
    return shuffle(out.filter(Boolean)).slice(0, 8);
  };

  // one review item, by how well you know it
  AZ.reviewEx = function (id, attempt) {
    const [t, a, b] = id.split(':'); const st = (AZ.S.srs[id] || [1])[0];
    if (t === 'w') {
      const e = AZ.word(a); if (!e) return null;
      if (st >= 3 && Math.random() < (st >= 5 ? 0.55 : 0.3)) {
        const sents = AZ.sentsWithWord(a, AZ.reached());
        const s = sents.length ? pick(sents) : null;
        if (s) return X.sentence(s, pick(st >= 5 ? ['write', 'listen', 'write', 'translate'] : ['write', 'listen']), [id]);
      }
      if (attempt) return X.typeWord(a);
      return st <= 2 ? pick([X.typeWord(a), X.meaningWord(a)]) : pick([X.typeWord(a), X.typeWord(a), X.meaningWord(a), X.listenWord(a)]);
    }
    if (t === 'v') return X.verbMeaning(a, st <= 2 && !attempt ? pick(['type', 'en']) : 'type');
    if (t === 'c') {
      if (st >= 5 && Math.random() < 0.2) { const tb = X.table(a, b); if (tb) return tb; }
      if (Math.random() < 0.35 && !isImp(b)) {
        const ctx = AZ.genCtx([]);
        for (let i = 0; i < 20; i++) {
          const r = G.make(pick(['svo', 'sv_adv', 'svo']), Object.assign({}, ctx, { tense: b }));
          if (r && r.focus && r.focus.inf === a && r.focus.t === b) return X.sentence(r, 'cloze', [id]);
        }
      }
      return X.conj(a, b);
    }
    return null;
  };

  /* ---------------- Session player ---------------- */
  let P = null;
  const root = () => document.getElementById('session');
  AZ.inSession = () => !!P;
  AZ.debugSession = () => P;

  AZ.startSession = function (cfg) {
    const list = (cfg.list || []).filter(Boolean);
    if (!list.length) { AZ.toast(cfg.empty || 'Hier is nog niets te oefenen — bestudeer eerst een hoofdstuk.'); return; }
    AZ.stopSpeech();
    P = Object.assign({ i: 0, queue: list, graded: list.length, done: 0, firstTry: 0, missed: new Set(), t0: Date.now(), state: 'answer', results: [], title: '' }, cfg);
    document.body.classList.add('in-session');
    const r = root(); r.hidden = false;
    renderEx();
  };
  AZ.endSession = function (silent) {
    AZ.stopSpeech();
    P = null; const r = root(); r.hidden = true; r.innerHTML = '';
    const toast = document.getElementById('toast'); if (toast) toast.classList.remove('on');
    document.body.classList.remove('in-session');
    if (!silent) AZ.render();
  };

  function header() {
    const pct = Math.round(100 * P.done / Math.max(1, P.graded));
    return `<header class="s-head">
      <button class="icon-btn" data-act="s-close" aria-label="Sluiten">${I('x')}</button>
      <div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>
      <div class="s-count">${esc(P.title)} <b>${Math.min(P.done + 1, P.graded)}/${P.graded}</b></div>
    </header>`;
  }
  function audioBtns(text) {
    return text ? `<button class="say big" data-act="say" data-text="${esc(text)}" aria-label="Luister">${I('speaker')}</button><button class="say slow" data-act="say-slow" data-text="${esc(text)}" aria-label="Luister langzaam">${I('turtle')}</button>` : '';
  }
  function promptBlock(ex) {
    const text = ex.promptLang === 'pt' ? hintText(ex.prompt) : esc(ex.prompt);
    const hint = ex.hint ? `<span class="chip">${esc(ex.hint === 'tu' ? 'tu' : ex.hint === 'formal' ? 'u (beleefd)' : ex.hint === 'plural' ? 'jullie' : ex.hint)}</span>` : '';
    return `<div class="prompt-card">${ex.pic && ex.kind === 'word' ? AZ.picHTML(ex.pic, 'sm') : ''}<div class="ptext ${ex.promptLang}">${text}${hint}</div><div class="audio">${ex.speak ? audioBtns(ex.speak) : ''}</div></div>`;
  }
  // Portuguese text with tap-for-meaning words
  function hintText(pt) {
    return String(pt).split(/(\s+)/).map(w => {
      if (/^\s+$/.test(w) || !w) return w;
      const core = w.replace(/[.,!?;:¿¡…"“”«»()]/g, '');
      const g = AZ.lookup(core);
      return g ? `<span class="hw" tabindex="0" data-act="hw" data-g="${esc(g)}">${esc(w)}</span>` : esc(w);
    }).join('');
  }
  AZ.hintText = hintText;

  function renderEx() {
    AZ.stopSpeech(); // nothing from the last exercise keeps talking
    const ex = P.queue[P.i];
    if (!ex) return finish();
    P.state = 'answer';
    const r = root();
    let body = '';
    switch (ex.type) {
      case 'type': body = typeHTML(ex); break;
      case 'cloze': body = clozeHTML(ex); break;
      case 'conj': body = conjHTML(ex); break;
      case 'table': body = tableHTML(ex); break;
      case 'free': body = freeHTML(ex); break;
    }
    r.innerHTML = header() + `<main class="s-body" id="s-body"><div class="ex ex-${ex.type}">${body}</div></main>
      <footer class="s-foot" id="s-foot"><div class="s-foot-in">
        <button class="btn ghost" data-act="s-skip">${ex.type === 'free' ? 'Overslaan' : 'Weet ik niet'}</button><button class="btn primary" data-act="s-check">${ex.type === 'free' ? (AZ.canCorrect() ? 'Verbeter mijn tekst' : 'Vergelijk') : 'Controleer'}</button>
      </div></footer>`;
    const inp = r.querySelector('input.answer, textarea.answer');
    if (inp) setTimeout(() => inp.focus(), 60);
    if (ex.listen) AZ.speakSoon(ex.speak, 300);
  }

  const ACCENTS = ['á', 'à', 'â', 'ã', 'ç', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú'];
  const accentRow = () => `<div class="accents" role="group" aria-label="Letters met accent">${ACCENTS.map(a => `<button class="acc" data-act="acc" data-c="${a}" tabindex="-1">${a}</button>`).join('')}<button class="acc" data-act="acc" data-c="-" tabindex="-1">-</button></div>`;
  function typeHTML(ex) {
    const head = ex.listen
      ? `<div class="listen-pad"><button class="say huge" data-act="say" data-text="${esc(ex.speak)}" aria-label="Nog een keer">${I('speaker')}</button><button class="say slow" data-act="say-slow" data-text="${esc(ex.speak)}" aria-label="Langzaam afspelen">${I('turtle')}</button></div>`
      : promptBlock(ex);
    return `<h2 class="q">${esc(ex.q)}</h2>${head}
      <textarea class="answer ${ex.lang}" id="ans" rows="2" lang="${ex.lang === 'pt' ? 'pt-PT' : 'nl'}" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="${ex.lang === 'pt' ? 'Escreve em português…' : 'Typ in het Nederlands…'}"></textarea>
      ${ex.lang === 'pt' ? accentRow() : ''}`;
  }
  function clozeHTML(ex) {
    return `<h2 class="q">${esc(ex.q)}</h2><div class="prompt-card cloze-b">
      <div class="ptext pt">${esc(ex.before)}<input class="answer cz-gap pt" id="ans" lang="pt-PT" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Ontbrekend woord" style="width:${(Math.max(4, ex.answers[0].length) * 0.66 + 1.4).toFixed(1)}em">${esc(ex.after)}</div>
      <div class="cloze-hint">(${esc(ex.hintWord)})</div><div class="cloze-en">${esc(ex.en)}</div></div>${accentRow()}`;
  }
  function conjHTML(ex) {
    const T = E.TENSE[ex.tense];
    return `<h2 class="q">Vervoeg <small>${esc(T.pt)} · ${esc(T.en)}</small></h2>
      <div class="conj-card"><div class="conj-p">${esc(ex.label)}</div><div class="conj-inf">${esc(ex.inf)} <span class="muted">· ${esc(AZ.glossShort((AZ.verbBy.get(ex.inf) || {}).en || ''))}</span></div>
      <div class="conj-in">${ex.tense === 'impn' ? '<span class="pre">não</span>' : ''}<input class="answer pt" id="ans" lang="pt-PT" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Je antwoord" placeholder="…"></div></div>${accentRow()}`;
  }
  function tableHTML(ex) {
    const T = E.TENSE[ex.tense];
    return `<h2 class="q">Schrijf de hele tabel <small>${esc(T.pt)} · ${esc(T.en)}</small></h2>
      <div class="table-ex"><div class="tx-head"><b class="pt">${esc(ex.inf)}</b> <span class="muted">${esc(AZ.glossShort((AZ.verbBy.get(ex.inf) || {}).en || ''))}</span></div>
      ${ex.persons.map((p, k) => `<label class="tx-row" data-k="${k}"><span class="tx-p">${esc(ex.labels[k])}</span>${ex.tense === 'impn' ? '<span class="pre">não</span>' : ''}<input class="answer pt tx-in" ${k === 0 ? 'id="ans"' : ''} data-k="${k}" lang="pt-PT" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="${esc(ex.labels[k])}"><span class="tx-mark"></span></label>`).join('')}</div>${accentRow()}`;
  }
  function freeHTML(ex) {
    const u = ex.chapter;
    return `<h2 class="q">Vrij schrijven <small>Hoofdstuk ${u.n} · ${esc(u.pt)}</small></h2>
      <div class="free-ex"><p class="free-task">${esc(ex.task)}</p>${ex.hint ? `<p class="free-hint">${I('bulb')} Handig: <span class="pt">${esc(ex.hint)}</span></p>` : ''}
      <textarea class="answer pt free-in" id="ans" rows="6" lang="pt-PT" spellcheck="false" placeholder="Escreve aqui o teu texto…"></textarea>
      <p class="muted small">${AZ.canCorrect() ? 'Claude verbetert je tekst en legt elke verandering uit.' : 'Als je klaar bent, vergelijk je je tekst met een voorbeeldantwoord.'} Druk op Ctrl + Enter als je klaar bent.</p></div>${accentRow()}`;
  }

  /* ---- interactions ---- */
  let lastInput = null;
  document.addEventListener('focusin', e => { if (P && e.target.matches && e.target.matches('#session input.answer, #session textarea.answer')) lastInput = e.target; });
  function insertAcc(c) {
    const el = lastInput && root().contains(lastInput) ? lastInput : root().querySelector('#ans'); if (!el) return;
    const s = el.selectionStart ?? el.value.length, e2 = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0, s) + c + el.value.slice(e2); el.focus(); el.selectionStart = el.selectionEnd = s + c.length;
  }

  function check() {
    if (P.state !== 'answer') { if (P.state === 'feedback') next(); return; }
    const ex = P.queue[P.i];
    const st = AZ.S.settings;
    if (ex.type === 'free') return checkFree(ex);
    if (ex.type === 'table') return checkTable(ex);
    const el = root().querySelector('#ans'); const given = (el && el.value || '').trim();
    if (!given) { el && el.focus(); return; }
    let res = E.check(given, ex.answers, { lang: ex.lang, strict: st.strict, typos: !ex.strictTypos, isWord: AZ.isPtWord });
    if (!res.ok && ex.looser) { const r2 = E.check(given, ex.looser, { lang: 'pt', strict: st.strict, isWord: AZ.isPtWord }); if (r2.ok) res = { ok: true, kind: 'article', best: ex.answers[0] }; }
    grade(res.ok, res, given);
  }
  function checkTable(ex) {
    const ins = [...root().querySelectorAll('.tx-in')];
    if (ins.every(i => !i.value.trim())) { ins[0].focus(); return; }
    let right = 0, accent = false;
    ins.forEach((inp, k) => {
      const want = ex.forms[k];
      const r = E.check(inp.value.trim(), ex.tense === 'impn' ? [want, 'não ' + want] : [want], { lang: 'pt', strict: AZ.S.settings.strict, typos: false });
      const row = inp.closest('.tx-row'); row.classList.add(r.ok ? 'ok' : 'bad');
      row.querySelector('.tx-mark').innerHTML = r.ok ? (r.kind === 'accent' ? `${I('bulb')} <b class="pt">${esc(want)}</b>` : I('check')) : `<b class="pt">${esc(want)}</b>`;
      if (r.ok) right++; if (r.kind === 'accent') accent = true;
      inp.readOnly = true;
    });
    const ok = right === ins.length;
    grade(ok, { kind: ok ? (accent ? 'accent-table' : 'exact') : 'table', best: '', right, of: ins.length }, '');
  }
  function grade(ok, res, given) {
    const ex = P.queue[P.i];
    P.state = 'feedback';
    const first = !ex._seen; ex._seen = true;
    AZ.S.stats.ans++; if (ok) AZ.S.stats.ok++;
    if (ok) { P.done++; if (first) P.firstTry++; AZ.sfx('ok'); }
    else { AZ.sfx('bad'); ex.items.forEach(i => P.missed.add(i)); }
    P.results.push({ ex, ok, first, given, res });
    if (P.onAnswer) P.onAnswer(ex, ok, first);
    // a wrong answer comes back a few exercises later (not in tests)
    if (!ok && !P.noRepeat) {
      let again = ex;
      if (P.mode === 'review' && ex._item) { again = AZ.reviewEx(ex._item, true) || ex; again._item = ex._item; }
      again = Object.assign({}, again, { _seen: true });
      P.queue.splice(Math.min(P.queue.length, P.i + 3 + Math.floor(Math.random() * 3)), 0, again);
    } else if (!ok && P.noRepeat) P.done++;
    const foot = root().querySelector('#s-foot');
    const best = res.best || (ex.answers && ex.answers[0]) || '';
    let note = '';
    if (ok && res.kind === 'accent') note = `${I('bulb')} Let op de accenten: <b class="pt">${esc(best)}</b>`;
    else if (ok && res.kind === 'accent-table') note = `${I('bulb')} Goed, maar let op de accenten die hierboven zijn aangegeven.`;
    else if (ok && res.kind === 'hyphen') note = `${I('bulb')} Let op het streepje: <b class="pt">${esc(best)}</b>`;
    else if (ok && res.kind === 'typo') note = `${I('bulb')} Kleine typefout — het is <b>${esc(best)}</b>`;
    else if (ok && res.kind === 'article' && ex.needArticle) note = `${I('bulb')} Vergeet het lidwoord niet: <b class="pt">${esc(best)}</b>`;
    else if (ok && ex.type === 'type' && ex.answers.length > 1 && ex.lang === 'pt' && E.normalize(best, 'pt') !== E.normalize(ex.answers[0], 'pt')) note = `Ook goed: <b class="pt">${esc(ex.answers[0])}</b>`;
    const meaning = ex.translation ? `<div class="fb-meaning">${esc(ex.translation)}</div>` : '';
    let wrongBox = '';
    if (!ok && ex.type === 'table') wrongBox = `<div class="fb-ans"><span class="lbl">${res.right} van de ${res.of} goed</span><span>De goede vormen staan hierboven.</span></div>`;
    else if (!ok) {
      const lang = ex.lang || 'pt';
      const d = given && ex.type === 'type' ? E.diff(given, best, lang).map(t => t.ok ? esc(t.w) : `<mark>${esc(t.w)}</mark>`).join(' ') : esc(best);
      wrongBox = `<div class="fb-ans"><span class="lbl">Goed antwoord</span><b class="${lang}">${d}</b></div>${ex.type === 'conj' ? conjTableMini(ex.inf, ex.tense, ex.p) : ''}`;
    }
    const sayText = ex.say || (ex.promptLang === 'pt' && ex.speak) || '';
    foot.className = 's-foot ' + (ok ? 'good' : 'bad');
    foot.innerHTML = `<div class="s-foot-in fb">
      <div class="fb-main">
        <div class="fb-title">${ok ? I('check') : I('x')} ${ok ? pick(GOOD) : pick(BAD)}</div>
        ${wrongBox}${note ? `<div class="fb-note">${note}</div>` : ''}${meaning}
        <div class="fb-tools">${sayText ? `<button class="link" data-act="say" data-text="${esc(sayText)}">${I('speaker')} Luister</button>` : ''}${!ok && given && (ex.type === 'type' || ex.type === 'cloze') ? `<button class="link" data-act="s-override">${I('check')} Ik had het goed</button>` : ''}${ex.wordId ? `<button class="link" data-act="s-word" data-id="${esc(ex.wordId)}">${I('book')} Woordkaart</button>` : ''}${ex.inf || (ex.focus && ex.focus.split(':')[1]) ? `<a class="link" href="#verb-${esc(E.slug(ex.inf || ex.focus.split(':')[1]))}" data-act="s-verb">${I('verbs')} Vervoegingstabel</a>` : ''}</div>
      </div>
      <button class="btn ${ok ? 'good' : 'bad'}" data-act="s-next">Verder</button></div>`;
    root().querySelector('.s-head').outerHTML = header();
    const body = root().querySelector('.ex'); body.classList.add(ok ? 'is-ok' : 'is-bad');
    if (ok && sayText && !ex.listen) AZ.speakSoon(sayText, 150);
    setTimeout(() => { const b = foot.querySelector('[data-act="s-next"]'); b && b.focus(); }, 30);
  }
  function conjTableMini(inf, tense, p) {
    const F = E.conjugate(inf); if (!F || !F[tense]) return '';
    const ps = isImp(tense) ? [1, 2, 3, 5] : drillPersons();
    return `<table class="mini-conj fbt">${ps.map(i => `<tr class="${i === p ? 'hl' : ''}"><td>${isImp(tense) ? IMP_LABEL[i] : PERS_LABEL[i]}</td><td>${esc(F[tense][i])}</td></tr>`).join('')}</table>`;
  }

  /* ---- free writing: Claude corrects it on claude.ai; elsewhere you compare with a model ---- */
  async function checkFree(ex) {
    const el = root().querySelector('#ans'); const text = (el.value || '').trim();
    if (text.split(/\s+/).length < 3) { AZ.toast('Schrijf eerst minstens een of twee zinnen.'); el.focus(); return; }
    P.state = 'busy'; el.readOnly = true;
    const foot = root().querySelector('#s-foot');
    foot.querySelector('.s-foot-in').innerHTML = `<span class="muted">${AZ.canCorrect() ? 'A corrigir… Claude leest je tekst' : ''}</span>`;
    let fb = null;
    if (AZ.canCorrect()) { try { fb = await AZ.correctWriting(ex, text); } catch (e) { console.warn(e); fb = null; } }
    if (!P || P.queue[P.i] !== ex) return;
    const box = document.createElement('div'); box.className = 'free-result';
    if (fb) {
      box.innerHTML = `<h3>${I('sparkle')} Correção <span class="score">${fb.score}/10</span></h3>
        ${fb.praise ? `<p>${esc(fb.praise)}</p>` : ''}
        <div class="corr-text"><span class="lbl">Verbeterd</span><p class="pt">${fb.corrected ? E.diff(text, fb.corrected, 'pt').map(t => t.ok ? esc(t.w) : `<mark>${esc(t.w)}</mark>`).join(' ') : esc(text)}</p></div>
        ${fb.notes && fb.notes.length ? `<ul class="corr-notes">${fb.notes.map(n => `<li><s class="pt">${esc(n.wrong || '')}</s> → <b class="pt">${esc(n.right || '')}</b><br><span class="muted">${esc(n.why || '')}</span></li>`).join('')}</ul>` : '<p class="muted">Niets te verbeteren.</p>'}
        <details><summary>Voorbeeldantwoord</summary><p class="pt pre">${esc(ex.model)}</p></details>`;
      root().querySelector('.free-ex').appendChild(box);
      gradeFree(ex, fb.score >= 6, fb.score);
    } else {
      box.innerHTML = `<h3>Een voorbeeldantwoord</h3><p class="pt pre">${esc(ex.model)}</p>
        <p class="muted small">Jouw tekst hoeft niet hetzelfde te zijn — kijk of je werkwoorden bij hun onderwerp passen, of de bijvoeglijke naamwoorden kloppen en of je de grammatica van het hoofdstuk hebt gebruikt.</p>`;
      root().querySelector('.free-ex').appendChild(box);
      P.state = 'self';
      foot.className = 's-foot';
      foot.innerHTML = `<div class="s-foot-in fb"><div class="fb-main"><div class="fb-title">Hoe ging het?</div></div>
        <div class="row gap"><button class="btn ghost" data-act="s-self" data-ok="0">Kan beter</button><button class="btn primary" data-act="s-self" data-ok="1">Ik ben tevreden</button></div></div>`;
    }
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function gradeFree(ex, ok, score) {
    P.state = 'feedback';
    P.results.push({ ex, ok, first: true, given: '', res: {} }); P.done++; if (ok) P.firstTry++;
    AZ.S.stats.free = (AZ.S.stats.free || 0) + 1; if (AZ.S.stats.free >= 10) AZ.badge('writer');
    const foot = root().querySelector('#s-foot');
    foot.className = 's-foot ' + (ok ? 'good' : 'bad');
    foot.innerHTML = `<div class="s-foot-in fb"><div class="fb-main"><div class="fb-title">${ok ? I('check') : I('bulb')} ${ok ? 'Bom trabalho!' : 'Ga zo door — lees de opmerkingen hierboven.'}</div>${score != null ? `<div class="fb-note">Score: ${score}/10</div>` : ''}</div>
      <button class="btn ${ok ? 'good' : 'bad'}" data-act="s-next">Verder</button></div>`;
    root().querySelector('.s-head').outerHTML = header();
  }

  function override() {
    const r = P.results[P.results.length - 1]; if (!r || r.ok) return;
    const ex = r.ex; r.ok = true; P.done++; if (r.first) P.firstTry++;
    ex.items.forEach(i => P.missed.delete(i));
    for (let k = P.queue.length - 1; k > P.i; k--) if (P.queue[k].src === ex.src && P.queue[k].type === ex.type && P.queue[k].items.join() === ex.items.join()) { P.queue.splice(k, 1); break; }
    AZ.S.stats.ok++;
    if (P.onAnswer) P.onAnswer(ex, true, r.first, true);
    next();
  }
  function next() { if (P.state !== 'feedback') return; P.i++; renderEx(); }
  function skip() {
    const ex = P.queue[P.i];
    if (P.state !== 'answer') return;
    if (ex.type === 'free') { P.graded--; P.queue.splice(P.i, 1); return renderEx(); }
    if (ex.type === 'table') { root().querySelectorAll('.tx-in').forEach(i => { i.value = ''; }); return checkTableBlank(ex); }
    grade(false, { kind: 'wrong', best: ex.answers ? ex.answers[0] : '' }, '');
  }
  function checkTableBlank(ex) {
    root().querySelectorAll('.tx-in').forEach((inp, k) => { const row = inp.closest('.tx-row'); row.classList.add('bad'); row.querySelector('.tx-mark').innerHTML = `<b class="pt">${esc(ex.forms[k])}</b>`; inp.readOnly = true; });
    grade(false, { kind: 'table', right: 0, of: ex.forms.length }, '');
  }

  function finish() {
    AZ.stopSpeech();
    const dur = Math.round((Date.now() - P.t0) / 1000);
    const firsts = P.results.filter(r => r.first);
    const acc = firsts.length ? Math.round(100 * firsts.filter(r => r.ok).length / firsts.length) : 100;
    const res = P.onFinish ? P.onFinish({ acc, dur, missed: P.missed, results: P.results }) : { xp: 0 };
    AZ.save();
    if (AZ.Remote) AZ.Remote.flush();
    const r = root();
    const passed = res.passed !== false;
    const goal = AZ.S.settings.goal, today = AZ.todayXP();
    const badges = (AZ.newBadges || []).splice(0);
    // the mistakes, to look at again
    const wrong = P.results.filter(x => x.first && !x.ok && x.ex.type !== 'free').map(x => x.ex).filter((ex, i, a) => a.indexOf(ex) === i).slice(0, 10);
    r.innerHTML = `<main class="s-body done"><div class="done-card">
      <div class="done-tile ${passed ? 'ok' : ''}" aria-hidden="true">${I(passed ? 'check' : 'target')}</div>
      <h2>${esc(res.title || (passed ? 'Feito!' : 'Quase lá!'))}</h2>
      <p class="muted">${esc(res.sub || '')}</p>
      <div class="done-stats">
        <div class="ds xp"><span>${I('bolt')} Punten</span><b>+${res.xp || 0}</b></div>
        <div class="ds ds-acc"><span>${I('target')} In één keer</span><b>${acc}%</b></div>
        <div class="ds time"><span>${I('clock')} Tijd</span><b>${Math.floor(dur / 60)}:${String(dur % 60).padStart(2, '0')}</b></div>
      </div>
      ${today >= goal && today - (res.xp || 0) < goal ? `<p class="goal-done">${I('flame')} Dagdoel gehaald — ${AZ.plural(AZ.streak(), 'dag', 'dagen')} op rij!</p>` : ''}
      ${badges.length ? `<div class="new-badges">${badges.map(b => `<div class="badge got">${I(AZ.BADGES[b][2])}<b>${esc(AZ.BADGES[b][0])}</b><small>${esc(AZ.BADGES[b][1])}</small></div>`).join('')}</div>` : ''}
      ${res.extra || ''}
      ${wrong.length ? `<div class="mistakes"><h3>Nog eens bekijken</h3>${wrong.map(mistakeRow).join('')}</div>` : ''}
      <div class="done-actions">${res.retry ? `<button class="btn ghost" data-act="s-retry">${esc(res.retryLabel || 'Nog een keer')}</button>` : ''}<button class="btn primary" data-act="s-done">Verder</button></div>
    </div></main>`;
    if (res.next) { const a = r.querySelector('[data-act="s-done"]'); a.dataset.next = res.next; a.textContent = /-\d+$/.test(res.next) ? 'Naar het volgende deel' : 'Verder'; }
    P.state = 'finished'; P.retryFn = res.retry;
    if (passed && res.celebrate) { AZ.sfx('done'); AZ.confetti(); }
    setTimeout(() => { const b = r.querySelector('[data-act="s-done"]'); b && b.focus(); }, 50);
  }
  function mistakeRow(ex) {
    let q = '', a = '';
    if (ex.type === 'conj') { q = `${ex.label} · ${ex.inf} (${E.TENSE[ex.tense].pt})`; a = ex.answers[0]; }
    else if (ex.type === 'table') { q = `${ex.inf} · ${E.TENSE[ex.tense].pt}`; a = ex.forms.join(', '); }
    else if (ex.type === 'cloze') { q = ex.en; a = ex.before + ex.answers[0] + ex.after; }
    else { q = ex.listen ? ex.translation || '' : ex.prompt; a = ex.answers[0]; }
    return `<p class="mk"><span class="muted">${esc(q)}</span><b class="${ex.lang === 'nl' ? '' : 'pt'}">${esc(a)}</b></p>`;
  }

  // event wiring for the session
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-act]'); if (!t || !P) return;
    const a = t.dataset.act;
    if (a === 'acc') { e.preventDefault(); insertAcc(t.dataset.c); }
    else if (a === 's-check') check();
    else if (a === 's-next') next();
    else if (a === 's-skip') skip();
    else if (a === 's-override') override();
    else if (a === 's-self') { if (P.state === 'self') gradeFree(P.queue[P.i], t.dataset.ok === '1', null); }
    else if (a === 's-close') { if (P.state === 'finished' || confirmQuit()) AZ.endSession(); }
    else if (a === 's-done') { const nx = t.dataset.next; AZ.endSession(!!nx); if (nx) location.hash = nx; }
    else if (a === 's-verb') { if (P.state === 'finished' || confirmQuit(true)) AZ.endSession(true); else e.preventDefault(); }
    else if (a === 's-retry') { const fn = P.retryFn; AZ.endSession(true); fn && fn(); }
    else if (a === 's-word') AZ.wordPopup(t.dataset.id);
  });
  function confirmQuit(leaving) {
    if (P.done === 0 && !P.results.length) return true;
    const foot = root().querySelector('#s-foot');
    if (foot.dataset.quit) return true;
    foot.dataset.quit = '1';
    AZ.toast(P.mode === 'review' ? 'Tik nog een keer om te stoppen — je antwoorden zijn bewaard.' : leaving ? 'Tik nog een keer om de tabel te openen — deze oefening stopt dan.' : 'Tik nog een keer op × om te stoppen.');
    setTimeout(() => { if (foot) delete foot.dataset.quit; }, 3000);
    return false;
  }
  document.addEventListener('keydown', e => {
    if (!P) return;
    const ex = P.queue[P.i];
    if (e.key === 'Enter' && !e.shiftKey) {
      if (P.state === 'finished') { e.preventDefault(); AZ.endSession(); return; }
      if (P.state === 'answer' && ex && ex.type === 'free' && !(e.ctrlKey || e.metaKey)) return; // new line
      if (P.state === 'answer' && ex && ex.type === 'table' && e.target.matches('.tx-in')) {
        const ins = [...root().querySelectorAll('.tx-in')], k = ins.indexOf(e.target);
        if (k < ins.length - 1) { e.preventDefault(); ins[k + 1].focus(); return; }
      }
      if (document.activeElement && document.activeElement.matches('button, a') && !document.activeElement.matches('[data-act="s-check"],[data-act="s-next"]')) return;
      e.preventDefault();
      if (P.state === 'feedback') next(); else if (P.state === 'answer') check();
    } else if (e.key === 'Escape') { if (P.state === 'finished' || confirmQuit()) AZ.endSession(); }
  });

  /* ---------------- Claude corrections (claude.ai only) ---------------- */
  let sampleFn = null;
  AZ.canCorrect = () => !!sampleFn;
  (async function () { try { if (window.claude && typeof window.claude.use === 'function') { const s = await window.claude.use('sample'); if (s) { sampleFn = s; AZ.listeners.forEach(fn => fn('voices')); } } } catch (e) { /* not on claude.ai */ } })();
  AZ.correctWriting = async function (ex, text) {
    const prompt = `You are a kind, precise teacher of European Portuguese (Portugal, AO1990 spelling). A learner at the level of chapter ${ex.chapter.n} ("${ex.chapter.en}", CEFR ${ex.chapter.lv ? ex.chapter.lv.code : ''}) wrote this for the task below.
Task: ${ex.task}
Learner's text:
"""
${text}
"""
Correct it into natural European Portuguese (not Brazilian: use tu, estar a + infinitive, enclisis like "levanto-me", Portuguese vocabulary). Keep the learner's ideas and level; change only what is wrong or very unnatural. Explain each change in simple Dutch (Nederlands).
Answer only with JSON: {"score": 0-10 integer, "corrected": "the corrected text", "notes": [{"wrong": "original words", "right": "corrected words", "why": "short explanation in Dutch"}], "praise": "one short encouraging sentence in Dutch"}. At most 8 notes, most important first.`;
    const out = await Promise.race([sampleFn.json(prompt, { modelTier: 'default' }), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 60000))]);
    if (!out || typeof out !== 'object') return null;
    return { score: Math.max(0, Math.min(10, Math.round(+out.score || 0))), corrected: String(out.corrected || ''), notes: Array.isArray(out.notes) ? out.notes.slice(0, 8) : [], praise: String(out.praise || '') };
  };

  /* ---------------- Starting the different sessions ---------------- */
  const pts = (results, bonusAt) => { const firsts = results.filter(r => r.first); const right = firsts.filter(r => r.ok).length; return right + (firsts.length && right / firsts.length >= (bonusAt || 0.8) ? 3 : 0); };
  AZ.startPartTest = function (u, k) {
    const P = u.parts[k]; if (!P) return;
    AZ.startSession({
      mode: 'test', title: `Toets · ${u.n}.${k + 1}`, noRepeat: true, list: AZ.buildPartTest(u, k), empty: 'Dit deel heeft nog geen toets.',
      onFinish({ acc }) {
        const passed = acc >= AZ.PASS, before = AZ.partBest(u, k), wasDone = AZ.chDone(u);
        const res = AZ.partResult(u, k, acc);
        if (passed && acc === 100) { AZ.S.stats.perfect++; AZ.badge('perfect'); }
        const xp = passed ? (before >= AZ.PASS || wasDone ? 5 : 15) + (res.completed ? 15 : 0) : 3; AZ.addXP(xp);
        let extra = '';
        if (res.completed) {
          const nw = res.fresh.filter(id => id[0] !== 'c').map(AZ.itemLabel);
          extra = `<p class="ch-complete">${I('check')} Hoofdstuk ${u.n} is af!</p>` + (nw.length ? `<div class="new-items"><h3>Nieuw in je herhalingen</h3><div class="chips">${nw.slice(0, 24).map(x => `<span class="chip pt">${esc(x.pt)}</span>`).join('')}</div><p class="muted small">Over ongeveer 4 uur komen ze terug om te herhalen.</p></div>` : '');
        }
        const nP = u.parts[k + 1], nU = AZ.units[u.idx + 1];
        const sub = !passed ? `Je hebt ${AZ.PASS}% nodig — je had ${acc}%. Lees het deel nog eens en probeer het opnieuw.` : nP ? `Volgende: deel ${k + 2}, ${nP.title}.` : nU && res.completed ? `Volgende: hoofdstuk ${nU.n}, ${nU.pt}.` : `${P.title} · ${acc}%`;
        return { xp, passed, celebrate: passed && (res.completed || before < AZ.PASS), title: passed ? (res.completed ? `Capítulo ${u.n} concluído!` : 'Muito bem!') : 'Ainda não…', sub, extra,
          retry: passed ? null : () => AZ.startPartTest(u, k), retryLabel: 'Opnieuw proberen', next: passed ? (nP ? '#ch-' + u.id + '-' + (k + 2) : res.completed && nU ? '#ch-' + nU.id : '#ch-' + u.id) : null };
      },
    });
  };
  AZ.startChapterTest = function (u) {
    AZ.startSession({
      mode: 'test', title: 'Toets · hfst. ' + u.n, noRepeat: true, list: AZ.buildChapterTest(u),
      onFinish({ acc }) {
        const passed = acc >= 70, wasDone = AZ.chDone(u);
        let extra = '';
        if (passed) {
          const { fresh } = AZ.completeChapter(u, acc);
          if (acc === 100) { AZ.S.stats.perfect++; AZ.badge('perfect'); }
          const nw = fresh.filter(id => id[0] !== 'c').map(AZ.itemLabel);
          if (nw.length) extra = `<div class="new-items"><h3>Nieuw in je herhalingen</h3><div class="chips">${nw.slice(0, 24).map(x => `<span class="chip pt">${esc(x.pt)}</span>`).join('')}</div><p class="muted small">Over ongeveer 4 uur komen ze terug om te herhalen.</p></div>`;
        } else { const r = AZ.S.lessons[u.id] || {}; AZ.S.lessons[u.id] = Object.assign({}, r, { best: Math.max(r.best || 0, acc), seen: r.seen || Date.now() }); }
        const xp = passed ? (wasDone ? 10 : 30) : 5; AZ.addXP(xp);
        const nxt = AZ.units[u.idx + 1];
        return { xp, passed, celebrate: passed && !wasDone, title: passed ? `Capítulo ${u.n} concluído!` : 'Ainda não…', sub: passed ? (nxt && !wasDone ? `Volgende: hoofdstuk ${nxt.n}, ${nxt.pt}.` : `${u.pt} · ${acc}%`) : `Je hebt 70% nodig — je had ${acc}%. Lees de uitleg nog eens en probeer het opnieuw.`, extra, retry: passed ? null : () => AZ.startChapterTest(u), retryLabel: 'Opnieuw proberen' };
      },
    });
  };
  AZ.startWriting = function (chs, n) {
    AZ.startSession({ mode: 'practice', title: 'Zinnen schrijven', list: AZ.buildWriting(chs, n || 12),
      onFinish({ results }) { const xp = pts(results); AZ.addXP(xp); return { xp, title: 'Escrita feita!', sub: chs.length === 1 ? `Hoofdstuk ${chs[0].n} · ${chs[0].pt}` : `Hoofdstuk 1–${chs[chs.length - 1].n}`, retry: () => AZ.startWriting(chs, n), retryLabel: 'Meer zinnen' }; } });
  };
  AZ.startConjugation = function (cfg) {
    let right = 0;
    AZ.startSession({ mode: 'practice', title: 'Vervoegen', list: AZ.buildConjugation(cfg), empty: 'Nog geen werkwoorden om te oefenen — bestudeer eerst de eerste hoofdstukken.',
      onAnswer(ex, ok, first) { if (ok && first) right += ex.type === 'table' ? ex.forms.length : 1; },
      onFinish({ results }) { AZ.S.stats.gym += right; if (AZ.S.stats.gym >= 100) AZ.badge('gym-100'); const xp = pts(results); AZ.addXP(xp); return { xp, title: 'Conjugação feita!', sub: `${right} vormen in één keer goed`, retry: () => AZ.startConjugation(cfg), retryLabel: 'Nog een ronde' }; } });
  };
  AZ.startMixed = function (chs, n) {
    AZ.startSession({ mode: 'practice', title: 'Gemengd', list: AZ.buildMixed(chs, n || 16),
      onFinish({ results }) { const xp = pts(results); AZ.addXP(xp); return { xp, title: 'Treino misto feito!', sub: 'Schrijven en vervoegen door elkaar', retry: () => AZ.startMixed(chs, n), retryLabel: 'Nog een ronde' }; } });
  };
  AZ.startFree = function (u, k) {
    AZ.startSession({ mode: 'free', title: 'Vrij schrijven', list: [X.free(u, k)],
      onFinish({ results }) { const ok = results.some(r => r.ok); const xp = 5 + (ok ? 3 : 0); AZ.addXP(xp); AZ.S.freeDone = AZ.S.freeDone || {}; return { xp, title: ok ? 'Texto escrito!' : 'Texto escrito', sub: `Hoofdstuk ${u.n} · ${u.pt}`, retry: u.write[k + 1] ? () => AZ.startFree(u, k + 1) : null, retryLabel: 'Volgende opdracht' }; } });
  };
  AZ.startListening = function (chs) {
    const sents = shuffle(chs.flatMap(u => u.S).filter(s => canListen(s.pt))).slice(0, 10);
    AZ.startSession({ mode: 'practice', title: 'Dictee', list: sents.map(s => X.sentence(s, 'listen')), empty: 'Er is nu geen stem beschikbaar om te luisteren.',
      onFinish({ results }) { const xp = pts(results); AZ.addXP(xp); return { xp, title: 'Ditado feito!', sub: 'Luisteren en schrijven', retry: () => AZ.startListening(chs), retryLabel: 'Meer' }; } });
  };
  AZ.startVerb = function (inf) {
    const tenses = AZ.tensesOf(AZ.studied()).filter(t => E.conjugate(inf)[t]);
    AZ.startConjugation({ verbs: [inf], tenses: tenses.length ? tenses : ['pres'], format: 'all', n: 10 });
  };
  AZ.startReviews = function (ids) {
    let due = ids || AZ.dueList();
    if (!due.length) { AZ.toast('Er staan geen herhalingen klaar. Goed zo!'); return; }
    due = shuffle(due).slice(0, AZ.S.settings.batch || 20);
    const list = due.map(id => { const ex = AZ.reviewEx(id); if (ex) ex._item = id; return ex; }).filter(Boolean);
    // each item is scored as soon as it is first answered, and saved straight away
    const outcome = {}, before = {};
    AZ.startSession({
      mode: 'review', title: 'Herhalen', list,
      onAnswer(ex, ok, first, overridden) {
        const id = ex._item; if (!id || !AZ.S.srs[id]) return;
        if (overridden) { if (outcome[id] === false && first && before[id]) { AZ.S.srs[id] = before[id].slice(); AZ.srsAnswer(id, true); outcome[id] = true; AZ.save(true); } return; }
        if (id in outcome) return;
        before[id] = AZ.S.srs[id].slice();
        outcome[id] = ok; AZ.srsAnswer(id, ok); AZ.S.stats.reviews++; AZ.save(true);
      },
      onFinish() {
        let right = 0, up = 0;
        Object.keys(outcome).forEach(id => { if (outcome[id]) right++; if ((AZ.S.srs[id] || [0])[0] > before[id][0]) up++; });
        const n = Object.keys(outcome).length;
        const xp = right + Math.floor(n / 5); AZ.addXP(xp);
        const left = AZ.dueList().length;
        return { xp, title: 'Revisões feitas!', sub: `${right} van de ${n} in één keer goed · ${up} een stap omhoog`, extra: left ? `<p class="muted">Nog ${left} te doen.</p>` : '', retry: left ? () => AZ.startReviews() : null, retryLabel: 'Volgende reeks' };
      },
    });
  };
  AZ.startDeckPractice = function (deck, ids) {
    const list = shuffle(ids).slice(0, 12).map((id, k) => [X.typeWord, X.meaningWord, X.typeWord, X.listenWord][k % 4](id) || X.typeWord(id));
    AZ.startSession({ mode: 'practice', title: deck.pt, list, onFinish({ results }) { const xp = pts(results); AZ.addXP(xp); return { xp, title: 'Palavras praticadas!', sub: deck.pt, retry: () => AZ.startDeckPractice(deck, ids), retryLabel: 'Nog een keer' }; } });
  };
  AZ.startWeak = function () {
    const items = Object.keys(AZ.S.srs).filter(k => AZ.S.srs[k][4] > 0 && AZ.S.srs[k][0] < 9).sort((a, b) => (AZ.S.srs[b][4] - AZ.S.srs[b][3] / 3) - (AZ.S.srs[a][4] - AZ.S.srs[a][3] / 3)).slice(0, 15);
    if (!items.length) { AZ.toast('Nog geen zwakke plekken — ga zo door!'); return; }
    AZ.startSession({ mode: 'practice', title: 'Zwakke plekken', list: items.map(id => AZ.reviewEx(id, true)).filter(Boolean), onFinish({ results }) { const xp = pts(results); AZ.addXP(xp); return { xp, title: 'Pontos fracos treinados!', sub: 'Oefenen verandert je herhaalschema niet.' }; } });
  };
})();
