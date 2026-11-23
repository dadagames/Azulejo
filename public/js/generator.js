/* Azulejo · sentence generator.
   Builds fresh Portuguese sentences with English translations (and accepted alternatives)
   from the words a learner already knows. Browser: window.PTG · Node: module.exports */
(function (root, factory) {
  var api = factory(typeof PTE !== 'undefined' ? PTE : require('./engine.js'));
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PTG = api;
})(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';
  const csv = s => (s || '').split(',').map(x => x.trim()).filter(Boolean);
  const cap = E.cap;

  /* ---------------- Lexicon ---------------- */
  const LEX = new Map(); const VERBS = new Map(); let G = null; const CLS = {}; let MASS, MASSONLY, ENPLONLY, ENSG, PLOK, PETS, PAIRS;
  function load(decks, verbText, gen) {
    LEX.clear(); VERBS.clear();
    decks.forEach(d => d.words.trim().split('\n').forEach(line => {
      const p = line.split('|'); const ex = {};
      p.slice(4).forEach(kv => { const i = kv.indexOf('='); if (i > 0) ex[kv.slice(0, i)] = kv.slice(i + 1); });
      const id = ex.id || p[0];
      LEX.set(id, { id, pt: p[0], en: p[1], type: p[2], pic: p[3] || '', deck: d.id, pl: ex.pl, f: ex.f, note: ex.note, inv: !!ex.inv, art: ex.art });
    }));
    verbText.trim().split('\n').forEach(l => { const [raw, gloss] = l.split('|'); const inf = raw.replace('*', ''); VERBS.set(inf, { inf, en: gloss, core: raw[0] === '*' }); });
    G = gen;
    for (const k in gen.cls) CLS[k] = new Set(csv(gen.cls[k]));
    PAIRS = new Set(['luva', 'meia', 'sapato', 'bota', 'sapatilha', 'brinco']);
    MASS = new Set(csv(gen.mass)); MASSONLY = new Set(csv(gen.massOnly)); ENPLONLY = new Set(csv(gen.enPlOnly)); ENSG = new Set(csv(gen.enSg || '')); PLOK = new Set(csv(gen.plOk)); PETS = new Set(csv(gen.pets));
    G.advList = gen.advs.map(s => { const [id, en, pos, vs, ts] = s.split('|'); return { id, en, pos, verbs: vs === '*' ? null : new Set(csv(vs)), tenses: !ts || ts === '*' ? null : new Set(csv(ts)) }; });
    G.reflexList = gen.reflex.map(s => { const [inf, en, comp] = s.split('|'); return { inf, en, comp: csv(comp) }; });
    G.placeList = gen.places.map(s => { const [id, at, to, fl] = s.split('|'); return { id, at, to, bare: /bare/.test(fl || ''), para: /para/.test(fl || '') }; });
    G.adjList = gen.adjs.map(s => { const [id, cop, cl, en] = s.split('|'); return { id, cop, cls: csv(cl), en }; });
    G.nameList = gen.names.split(',').map(s => { const [pt, en, g] = s.trim().split('|'); return { pt, en, g }; });
  }

  function ptPlural(w) {
    if (w === 'e-mail') return 'e-mails';
    if (/ão$/.test(w)) return w.slice(0, -2) + 'ões';
    if (/[aeiouáéíóúâêô]$/.test(w)) return w + 's';
    if (/m$/.test(w)) return w.slice(0, -1) + 'ns';
    if (/[rz]$/.test(w)) return w + 'es';
    if (/ês$/.test(w)) return w.slice(0, -2) + 'eses';
    if (/al$/.test(w)) return w.slice(0, -1) + 'is';
    if (/el$/.test(w)) return w.slice(0, -2) + 'éis';
    if (/ol$/.test(w)) return w.slice(0, -2) + 'óis';
    if (/ul$/.test(w)) return w.slice(0, -1) + 'is';
    if (/il$/.test(w)) return w.slice(0, -1) + 's';
    if (/s$/.test(w)) return w;
    return w + 's';
  }
  function noun(id) {
    const e = LEX.get(id); if (!e) return null;
    const plOnly = e.type === 'm.pl' || e.type === 'f.pl';
    const g = e.type[0] === 'f' ? 'f' : 'm';
    return { e, g, mf: e.type === 'mf', sg: plOnly ? null : e.pt, pl: plOnly ? e.pt : (e.pl || ptPlural(e.pt)), plOnly, fem: e.f };
  }
  function adjForms(id) {
    const e = LEX.get(id); if (!e) return null;
    const m = e.pt;
    if (e.inv) return { ms: m, fs: m, mp: m, fp: m };
    let fs = e.f;
    if (!fs) {
      if (/o$/.test(m)) fs = m.slice(0, -1) + 'a';
      else if (/ês$/.test(m)) fs = m.slice(0, -2) + 'esa';
      else if (/(dor|tor)$/.test(m)) fs = m + 'a';
      else if (/ão$/.test(m)) fs = m.slice(0, -2) + 'ã';
      else if (/eu$/.test(m)) fs = m.slice(0, -2) + 'eia';
      else fs = m;
    }
    const mp = e.pl || ptPlural(m);
    const fp = fs === m ? mp : /s$/.test(fs) && mp === m ? fs : ptPlural(fs);
    return { ms: m, fs, mp, fp };
  }
  const adjPT = (id, g, n) => { const f = adjForms(id); return f[(g === 'f' ? 'f' : 'm') + (n === 'pl' ? 'p' : 's')]; };

  /* ---------------- English bits ---------------- */
  const clean = s => String(s || '').split(/[;,]/)[0].replace(/\s*\([^)]*\)/g, '').trim();
  const EN_PL = { wolf: 'wolves', thief: 'thieves', life: 'lives', shelf: 'shelves', scarf: 'scarves', half: 'halves', calf: 'calves', goose: 'geese', deer: 'deer', man: 'men', woman: 'women', child: 'children', person: 'people', tooth: 'teeth', foot: 'feet', mouse: 'mice', sheep: 'sheep', fish: 'fish', knife: 'knives', wife: 'wives', leaf: 'leaves', loaf: 'loaves', potato: 'potatoes', tomato: 'tomatoes', bus: 'buses', salmon: 'salmon', 'salt cod': 'salt cod', series: 'series', glasses: 'glasses', trousers: 'trousers', jeans: 'jeans', clothes: 'clothes', pyjamas: 'pyjamas', shorts: 'shorts', grandparents: 'grandparents', parents: 'parents', holidays: 'holidays', vegetables: 'vegetables', chips: 'chips' };
  function enPl(w) {
    if (EN_PL[w]) return EN_PL[w];
    const parts = w.split(' '); let last = parts.pop();
    if (EN_PL[last]) last = EN_PL[last];
    else if (/(s|x|z|ch|sh)$/.test(last)) last += 'es';
    else if (/[^aeiou]y$/.test(last)) last = last.slice(0, -1) + 'ies';
    else last += 's';
    parts.push(last); return parts.join(' ');
  }
  const aAn = w => (/^(uni|use|eu|one|u[bcdfgklmnprstvz][aeiou])/i.test(w) ? 'a' : /^(hour|honest|[aeiou])/i.test(w) ? 'an' : 'a') + ' ' + w;
  function enNoun(id, g) {
    const e = LEX.get(id); if (!e) return id;
    if (g === 'f' && G.enF[id]) return G.enF[id];
    return G.enN[id] || clean(e.en);
  }
  const NUM_PT = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezasseis', 'dezassete', 'dezoito', 'dezanove'];
  const TENS_PT = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const NUM_EN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS_EN = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function numPT(n, g) {
    const fem = w => (g === 'f' ? w.replace(/^um$/, 'uma').replace(/^dois$/, 'duas') : w);
    if (n < 20) return fem(NUM_PT[n]);
    if (n < 100) { const t = Math.floor(n / 10), u = n % 10; return TENS_PT[t] + (u ? ' e ' + fem(NUM_PT[u]) : ''); }
    if (n === 100) return 'cem';
    return String(n);
  }
  function numEN(n) {
    if (n < 20) return NUM_EN[n];
    if (n < 100) { const t = Math.floor(n / 10), u = n % 10; return TENS_EN[t] + (u ? '-' + NUM_EN[u] : ''); }
    if (n === 100) return 'a hundred';
    return String(n);
  }

  /* ---------------- Contractions ---------------- */
  const CTR = {
    de: { o: 'do', a: 'da', os: 'dos', as: 'das', este: 'deste', esta: 'desta', estes: 'destes', estas: 'destas', esse: 'desse', essa: 'dessa', esses: 'desses', essas: 'dessas', aquele: 'daquele', aquela: 'daquela', aqueles: 'daqueles', aquelas: 'daquelas', isto: 'disto', isso: 'disso', aquilo: 'daquilo', ele: 'dele', ela: 'dela', eles: 'deles', elas: 'delas' },
    em: { o: 'no', a: 'na', os: 'nos', as: 'nas', um: 'num', uma: 'numa', uns: 'nuns', umas: 'numas', este: 'neste', esta: 'nesta', estes: 'nestes', estas: 'nestas', esse: 'nesse', essa: 'nessa', aquele: 'naquele', aquela: 'naquela', isto: 'nisto', isso: 'nisso', aquilo: 'naquilo', ele: 'nele', ela: 'nela' },
    a: { o: 'ao', a: 'à', os: 'aos', as: 'às', aquele: 'àquele', aquela: 'àquela', aqueles: 'àqueles', aquelas: 'àquelas', aquilo: 'àquilo' },
    por: { o: 'pelo', a: 'pela', os: 'pelos', as: 'pelas' },
  };
  function ctr(prep, phrase) {
    const i = phrase.indexOf(' '); const first = i < 0 ? phrase : phrase.slice(0, i), rest = i < 0 ? '' : phrase.slice(i);
    const c = CTR[prep] && CTR[prep][first.toLowerCase()];
    return c ? c + rest : prep + ' ' + phrase;
  }
  // also accept the long form for um/uma (de um / dum, em um)
  function ctrAlts(prep, phrase) {
    const out = [ctr(prep, phrase)];
    const first = phrase.split(' ')[0];
    if (prep === 'de' && /^(um|uma|uns|umas)$/.test(first)) out.push('d' + phrase);
    if (prep === 'em' && /^(um|uma)$/.test(first)) out.push('em ' + phrase);
    return out;
  }

  /* ---------------- Clitics ---------------- */
  function enclitic(form, pron) {
    if (pron === 'nos' && /s$/.test(form)) return form.slice(0, -1) + '-nos';
    if (pron === 'vos' && /s$/.test(form) && /mos$/.test(form)) return form.slice(0, -1) + '-vos';
    if (/^(o|a|os|as)$/.test(pron)) {
      if (/[rsz]$/.test(form)) {
        let b = form.slice(0, -1);
        const mono = (b.match(/[aeiouáéíóúâêôãõ]+/g) || []).length <= 1;
        const oxy = mono || /r$/.test(form) || /[áéíóúâêô]/.test(b.slice(-1));
        if (oxy || mono) {
          if (/a$/.test(b)) b = b.slice(0, -1) + 'á';
          else if (/e$/.test(b)) b = b.slice(0, -1) + 'ê';
          else if (/o$/.test(b)) b = b.slice(0, -1) + 'ô';
        }
        if (/ô$/.test(b) && /õe$/.test(form.slice(0, -1))) b = form.slice(0, -1);
        return b + '-l' + pron;
      }
      if (/(m|ão|õe|ãe)$/.test(form)) return form + '-n' + pron;
    }
    return form + '-' + pron;
  }
  // triggers that pull the pronoun in front of the verb
  const PROCLISIS = /^(não|nunca|já|também|sempre|ainda|só|talvez|quem|que|onde|quando|como|porque|se)$/i;

  /* ---------------- Subjects ---------------- */
  const PRON_SUBJ = {
    eu: { pt: 'eu', en: 'I', ep: '1s', p: 0, g: '?', n: 'sg', drop: true },
    tu: { pt: 'tu', en: 'you', ep: '2', p: 1, g: '?', n: 'sg', drop: true, hint: 'tu' },
    ele: { pt: 'ele', en: 'he', ep: '3s', p: 2, g: 'm', n: 'sg' },
    ela: { pt: 'ela', en: 'she', ep: '3s', p: 2, g: 'f', n: 'sg' },
    'o senhor': { pt: 'o senhor', en: 'you', ep: '2', p: 2, g: 'm', n: 'sg', hint: 'formal' },
    'a senhora': { pt: 'a senhora', en: 'you', ep: '2', p: 2, g: 'f', n: 'sg', hint: 'formal' },
    você: { pt: 'você', en: 'you', ep: '2', p: 2, g: '?', n: 'sg', hint: 'você' },
    nós: { pt: 'nós', en: 'we', ep: '1p', p: 3, g: '?', n: 'pl', drop: true },
    vocês: { pt: 'vocês', en: 'you', ep: '2', p: 5, g: '?', n: 'pl', hint: 'plural' },
    eles: { pt: 'eles', en: 'they', ep: '3p', p: 5, g: 'm', n: 'pl' },
    elas: { pt: 'elas', en: 'they', ep: '3p', p: 5, g: 'f', n: 'pl' },
  };
  function subjects(ctx, opts) {
    opts = opts || {};
    const K = ctx.K, out = [];
    ['eu', 'tu', 'ele', 'ela', 'nós', 'eles', 'elas', 'vocês', 'o senhor', 'a senhora'].forEach(k => {
      if (opts.noFormal && /senhor/.test(k)) return;
      if (k === 'eu' && opts.notEu) return;
      if (k !== 'eu' && k !== 'tu' && k !== 'ele' && k !== 'ela' && ctx.level < 2) return;
      out.push(PRON_SUBJ[k]);
    });
    if (!opts.pronOnly) {
      G.nameList.forEach(nm => out.push({ pt: nm.pt, en: nm.en, ep: '3s', p: 2, g: nm.g, n: 'sg', name: true }));
      if (K('meu')) csv(G.family).forEach(f => {
        const N = noun(f); if (!N || !K(f)) return;
        const pl = N.plOnly || f === 'pais' || f === 'avós';
        const g = N.g;
        const det = pl ? (g === 'f' ? 'as minhas' : 'os meus') : (g === 'f' ? 'a minha' : 'o meu');
        const enF = f === 'mulher' ? 'wife' : enNoun(f);
        out.push({ pt: det + ' ' + (pl ? N.pl : N.sg), en: 'my ' + (pl ? enPl(enF) : enF), ep: pl ? '3p' : '3s', p: pl ? 5 : 2, g, n: pl ? 'pl' : 'sg', poss: true, words: [f, 'meu'] });
      });
    }
    return out;
  }
  function subjAlts(S) {
    if (S.ep === '2') return ['tu', 'você', 'o senhor', 'a senhora', 'vocês'].map(k => PRON_SUBJ[k]);
    if (S.ep === '3p' && !S.name && !S.poss && /^el/.test(S.pt)) return [PRON_SUBJ.eles, PRON_SUBJ.elas];
    return [S];
  }
  // Portuguese subject variants: with / without pronoun, name with / without article, possessive with / without article
  function ptSubjVariants(S) {
    if (S.name) return [S.pt, S.pt.replace(/^(o|a) /, '')];
    if (S.poss) return [S.pt, S.pt.replace(/^(o|a|os|as) /, '')];
    if (S.drop) return [S.pt, ''];
    return [S.pt];
  }

  /* ---------------- Noun phrases ---------------- */
  function NP(id, det, o) {
    o = o || {};
    const N = noun(id); if (!N) return null;
    let n = o.n || (N.plOnly ? 'pl' : 'sg');
    if (N.plOnly) n = 'pl';
    let g = N.g, word = n === 'pl' ? N.pl : N.sg;
    if (o.g === 'f' && N.fem) { g = 'f'; word = n === 'pl' ? ptPlural(N.fem) : N.fem; }
    else if (N.mf && o.g) g = o.g;
    const enBase = enNoun(id, g);
    // plural-only in Portuguese but singular in English: as costas = the back, os correios = the post office
    const enSing = ENSG.has(id);
    const enPlural = !enSing && (ENPLONLY.has(id) || N.plOnly);
    const enW = (n === 'pl' && !enPlural && !enSing) ? enPl(enBase) : enBase;
    const enN = enSing ? 'sg' : (n === 'pl' || enPlural) ? 'pl' : 'sg';
    const art = { m: { sg: 'o', pl: 'os' }, f: { sg: 'a', pl: 'as' } }[g][n];
    let pt, en, alts = [], enAlts = [];
    const [k, arg] = det.split(':');
    switch (k) {
      case 'def': pt = art + ' ' + word; en = 'the ' + enW; break;
      case 'indef':
        pt = (n === 'pl' ? (g === 'f' ? 'umas' : 'uns') : (g === 'f' ? 'uma' : 'um')) + ' ' + word;
        en = n === 'pl' || enPlural ? 'some ' + enW : aAn(enW);
        if (n === 'pl' || enPlural) enAlts.push(enW);
        break;
      case 'bare': pt = word; en = enW; break;
      case 'poss': {
        const P = { meu: ['meu', 'minha', 'my'], teu: ['teu', 'tua', 'your'], nosso: ['nosso', 'nossa', 'our'] }[arg];
        const pw = g === 'f' ? P[1] : P[0];
        pt = art + ' ' + pw + (n === 'pl' ? 's' : '') + ' ' + word; en = P[2] + ' ' + enW;
        alts.push(pw + (n === 'pl' ? 's' : '') + ' ' + word);
        break;
      }
      case 'of': pt = art + ' ' + word + ' ' + arg; en = { dele: 'his', dela: 'her', deles: 'their', delas: 'their' }[arg] + ' ' + enW; break;
      case 'dem': {
        const D = { este: ['este', 'esta', 'estes', 'estas', 'this', 'these'], esse: ['esse', 'essa', 'esses', 'essas', 'that', 'those'], aquele: ['aquele', 'aquela', 'aqueles', 'aquelas', 'that', 'those'] }[arg];
        pt = D[(g === 'f' ? 1 : 0) + (n === 'pl' ? 2 : 0)] + ' ' + word; en = (enN === 'pl' ? D[5] : D[4]) + ' ' + enW;
        if (arg === 'esse') alts.push(D[(g === 'f' ? 1 : 0) + (n === 'pl' ? 2 : 0)].replace(/^ess/, 'aquel').replace('aquela', 'aquela') + ' ' + word);
        if (arg === 'aquele') alts.push(['esse', 'essa', 'esses', 'essas'][(g === 'f' ? 1 : 0) + (n === 'pl' ? 2 : 0)] + ' ' + word);
        break;
      }
      case 'num': { const x = +arg; pt = numPT(x, g) + ' ' + word; en = numEN(x) + ' ' + enW; break; }
      default: return null;
    }
    return { id, pt, en, g, n, enN, alts, enAlts, words: [id] };
  }
  function pickDet(id, ctx, allowBare) {
    const r = ctx.rnd, opts = ['def', 'def', 'indef'];
    if (!MASSONLY.has(id) || true) { /* keep */ }
    if (MASSONLY.has(id)) return r() < 0.6 && allowBare ? 'bare' : 'def';
    if (ctx.K('meu') && r() < 0.2) return 'poss:' + E.pick(['meu', 'teu', 'nosso'], r);
    if (ctx.K('este') && r() < 0.15) return 'dem:' + E.pick(['este', 'esse', 'aquele'], r);
    if (allowBare && MASS.has(id) && r() < 0.35) return 'bare';
    return E.pick(opts, r);
  }

  /* ---------------- Verb phrases ---------------- */
  function vform(inf, t, p) { return E.form(inf, t, p); }
  const BE = { pres: { '1s': 'am', '2': 'are', '3s': 'is', '1p': 'are', '3p': 'are' }, past: { '1s': 'was', '2': 'were', '3s': 'was', '1p': 'were', '3p': 'were' } };
  const PRON_EN = ['I', 'you', 'he', 'she', 'we', 'they', 'it'];
  function beC(S, tense) {
    const f = BE[tense][S.ep];
    if (tense === 'pres' && PRON_EN.includes(S.en)) return S.en + "'" + { am: 'm', are: 're', is: 's' }[f];
    return S.en + ' ' + f;
  }
  const beNeg = (f) => ({ am: "am not", are: "aren't", is: "isn't", was: "wasn't", were: "weren't" }[f]);
  // English clause variants. base = English verb (may be "be"), rest = words after the verb, o = {neg, q, pre, stative, ja}
  function enClause(S, base, tense, rest, o) {
    o = o || {};
    const R = rest ? ' ' + rest : '', s = S.en, ep = S.ep, is3 = ep === '3s';
    const pre = o.pre ? ' ' + o.pre : '';
    const out = [];
    if (base === 'be') {
      const tt = (tense === 'pret' || tense === 'imp') ? 'past' : 'pres';
      const f = BE[tt][ep];
      if (tense === 'fut') { if (o.q) out.push(`Will ${s} be${R}?`); else out.push(`${s} ${o.neg ? "won't" : 'will'}${pre} be${R}.`); return out; }
      if (tense === 'cond') { if (o.q) out.push(`Would ${s} be${R}?`); else out.push(`${s} ${o.neg ? "wouldn't" : 'would'}${pre} be${R}.`); return out; }
      if (tense === 'irinf') { const bf = BE.pres[ep]; if (o.q) out.push(`${cap(bf)} ${s} going to be${R}?`); else out.push(`${o.neg ? s + ' ' + beNeg(bf) : beC(S, 'pres')} going to be${R}.`); return out; }
      if (o.q) { out.push(`${cap(f)} ${s}${pre}${R}?`); return out; }
      if (o.neg) { out.push(`${s} ${beNeg(f)}${pre}${R}.`); out.push(`${s} ${f} not${pre}${R}.`); return out; }
      out.push(tt === 'pres' ? `${beC(S, 'pres')}${pre}${R}.` : `${s} ${f}${pre}${R}.`);
      if (tense === 'imp') out.push(`${s} used to be${R}.`);
      return out;
    }
    const ing = E.en(base, 'ing'), past = E.en(base, 'past'), pp = E.en(base, 'pp'), s3 = E.en(base, 's');
    const bePres = BE.pres[ep];
    switch (tense) {
      case 'pres':
        if (o.q) { out.push(`${is3 ? 'Does' : 'Do'} ${s}${pre} ${base}${R}?`); if (!o.stative) out.push(`${cap(bePres)} ${s}${pre} ${ing}${R}?`); if (base === 'have') out.push(`${is3 ? 'Has' : 'Have'} ${s} got${R}?`); }
        else if (o.neg) { out.push(`${s} ${is3 ? "doesn't" : "don't"}${pre} ${base}${R}.`); if (!o.stative) out.push(`${s} ${beNeg(bePres)} ${ing}${R}.`); if (base === 'have') out.push(`${s} ${is3 ? "hasn't" : "haven't"} got${R}.`); }
        else { out.push(`${s}${pre} ${is3 ? s3 : base}${R}.`); if (!o.stative && !o.pre) out.push(`${beC(S, 'pres')} ${ing}${R}.`); if (base === 'have') out.push(`${s} ${is3 ? 'has' : 'have'} got${R}.`); }
        break;
      case 'prog':
        if (o.q) out.push(`${cap(bePres)} ${s} ${ing}${R}?`);
        else if (o.neg) out.push(`${s} ${beNeg(bePres)} ${ing}${R}.`);
        else out.push(`${beC(S, 'pres')} ${ing}${R}.`);
        break;
      case 'pret':
        if (o.ja) {
          const hv = is3 ? 'has' : 'have';
          if (o.q) { out.push(`${cap(hv)} ${s} ${pp}${R} yet?`); out.push(`${cap(hv)} ${s} already ${pp}${R}?`); out.push(`Did ${s} already ${base}${R}?`); }
          else { out.push(`${s} ${hv} already ${pp}${R}.`); out.push(`${s} already ${past}${R}.`); }
          break;
        }
        if (o.q) out.push(`Did ${s}${pre} ${base}${R}?`);
        else if (o.neg) out.push(`${s} didn't ${base}${R}.`);
        else out.push(`${s}${pre} ${past}${R}.`);
        break;
      case 'imp':
        if (o.q) { out.push(`Did ${s} use to ${base}${R}?`); out.push(`Did ${s} ${base}${R}?`); }
        else if (o.neg) { out.push(`${s} didn't use to ${base}${R}.`); out.push(`${s} used not to ${base}${R}.`); out.push(`${s} didn't ${base}${R}.`); }
        else { out.push(`${s}${pre} used to ${base}${R}.`); out.push(`${s}${pre} would ${base}${R}.`); out.push(`${s}${pre} ${past}${R}.`); if (!o.stative) out.push(`${s} ${BE.past[ep]} ${ing}${R}.`); }
        break;
      case 'fut':
        if (o.q) out.push(`Will ${s}${pre} ${base}${R}?`);
        else if (o.neg) { out.push(`${s} won't ${base}${R}.`); out.push(`${s} will not ${base}${R}.`); }
        else { out.push(`${s} will${pre} ${base}${R}.`); out.push(`${beC(S, 'pres')} going to ${base}${R}.`); }
        break;
      case 'irinf':
        if (o.q) { out.push(`${cap(bePres)} ${s} going to ${base}${R}?`); out.push(`Will ${s} ${base}${R}?`); if (!o.stative) out.push(`${cap(bePres)} ${s} ${ing}${R}?`); }
        else if (o.neg) { out.push(`${s} ${beNeg(bePres)} going to ${base}${R}.`); out.push(`${s} won't ${base}${R}.`); }
        else { out.push(`${beC(S, 'pres')} going to ${base}${R}.`); out.push(`${s} will ${base}${R}.`); if (!o.stative) out.push(`${beC(S, 'pres')} ${ing}${R}.`); }
        break;
      case 'cond':
        if (o.q) out.push(`Would ${s} ${base}${R}?`);
        else if (o.neg) out.push(`${s} wouldn't ${base}${R}.`);
        else out.push(`${s} would${pre} ${base}${R}.`);
        break;
    }
    return out;
  }
  const finishEN = s => cap(s.replace(/\s+/g, ' ').trim());
  const LC_PT = /^(Eu|Tu|Ele|Ela|Nós|Vós|Eles|Elas|Vocês|Você|O|A|Os|As|Não|Um|Uma|Nunca|Já|Também)\b/;
  const LC_EN = /^(You|He|She|We|They|My|The|A|An|Our|Your|His|Her|Their|It|Do|Does|Did|Will|Would|Is|Are|Am|Was|Were|Have|Has)\b/;
  const isName = w => (G && (G.nameList.some(n => n.en === w) || csv(G.cities).includes(w)));
  const lcPT = x => { const w = x.split(' ')[0].replace(/[,.?!]/g, ''); return isName(w) ? x : x.charAt(0).toLowerCase() + x.slice(1); };
  const lcEN = x => { const w = x.split(' ')[0].replace(/[,.?!']/g, ''); return w === 'I' || /^I'/.test(x) || isName(w) ? x : x.charAt(0).toLowerCase() + x.slice(1); };
  const finishPT = (s, q) => { let t = s.replace(/\s+/g, ' ').trim(); t = cap(t); if (!/[.!?]$/.test(t)) t += q ? '?' : '.'; return t; };

  // Portuguese clause: subject + [não] + verb + rest, with subject variants
  function ptClause(S, form, rest, o) {
    o = o || {};
    const out = [];
    ptSubjVariants(S).forEach(sv => {
      out.push(finishPT([sv, o.neg ? 'não' : '', form, rest].filter(Boolean).join(' '), o.q));
    });
    return out;
  }

  /* ---------------- Template helpers ---------------- */
  function knownIn(ctx, cls) { return [...(CLS[cls] || [])].filter(id => ctx.K(id) && LEX.has(id)); }
  function nounClasses(id) { const out = []; for (const k in CLS) if (CLS[k].has(id)) out.push(k); return out; }
  const FR = () => G.frames;
  function frameOf(inf) {
    const f = G.frames[inf]; if (!f) return null;
    const [cl, en, fl] = f.split('|');
    const flags = {}; csv(fl ? fl.replace(/,/g, ',') : '').forEach(x => { const i = x.indexOf('='); if (i > 0) flags[x.slice(0, i)] = x.slice(i + 1); else flags[x] = true; });
    return { cls: csv(cl), en, flags };
  }
  // wrap a realization over several subject alternatives into the final item
  function finalize(realize, ch, extra) {
    const main = realize(ch);
    if (!main) return null;
    const pt = new Set(main.pt), en = main.en.slice();
    subjAlts(ch.S).forEach(S2 => { if (S2 === ch.S) return; const r = realize(Object.assign({}, ch, { S: S2 })); if (r) r.pt.forEach(x => pt.add(x)); });
    const ptList = [...pt];
    // prefer showing a dropped subject sometimes (natural Portuguese)
    let canon = main.pt[0];
    if (ch.S.drop && main.pt[1] && ch.rnd() < 0.4) canon = main.pt[1];
    const item = Object.assign({ pt: canon, ptAlt: ptList.filter(x => x !== canon), en: finishEN(en[0]), enAlt: en.slice(1).map(finishEN), hint: ch.S.hint || null, words: main.words || [], verbs: main.verbs || [], focus: main.focus || null }, extra || {});
    return item;
  }

  /* ---------------- Templates ---------------- */
  const T = {};

  // translate a noun phrase: o gato / the cat
  T.np = ctx => {
    const pool = new Set(['thing', 'animal', 'food', 'drink', 'clothes', 'place', 'house', 'transport', 'press'].flatMap(c => [...(CLS[c] || [])]).concat(csv(G.family), csv(G.profs)));
    const ids = [...pool].filter(id => ctx.K(id) && LEX.has(id) && /^(m|f|mf)$/.test(LEX.get(id).type) && !MASSONLY.has(id));
    if (!ids.length) return null;
    const id = E.pick(ids, ctx.rnd), r = ctx.rnd();
    const det = r < 0.45 ? 'def' : r < 0.8 ? 'indef' : 'num:' + (2 + Math.floor(ctx.rnd() * 3));
    const n = det.startsWith('num') ? 'pl' : (PLOK.has(id) && ctx.rnd() < 0.35 ? 'pl' : 'sg');
    const x = NP(id, det, { n, g: ctx.rnd() < 0.5 ? 'f' : 'm' }); if (!x) return null;
    return { pt: cap(x.pt), ptAlt: x.alts.map(cap), en: cap(x.en), enAlt: [], words: [id], kind: 'np' };
  };
  // Isto é um livro.
  T.isto = ctx => {
    if (!ctx.K('isto')) return null;
    const ids = knownIn(ctx, 'thing').concat(knownIn(ctx, 'animal'));
    if (!ids.length) return null;
    const x = NP(E.pick(ids, ctx.rnd), 'indef'); if (!x || x.n === 'pl') return null;
    const q = ctx.rnd() < 0.3;
    return { pt: finishPT('isto é ' + x.pt, q), ptAlt: [], en: q ? `Is this ${x.en}?` : `This is ${x.en}.`, enAlt: q ? [] : [`It's ${x.en}.`], words: ['isto', x.id] };
  };
  // Há dois gatos.
  T.ha = ctx => {
    if (!ctx.K('há')) return null;
    const ids = knownIn(ctx, 'thing').concat(knownIn(ctx, 'animal'));
    if (!ids.length) return null;
    const id = E.pick(ids, ctx.rnd), N = noun(id);
    const num = N.plOnly ? 0 : 1 + Math.floor(ctx.rnd() * 3);
    const x = num <= 1 ? NP(id, 'indef') : NP(id, 'num:' + num, { n: 'pl' });
    const pl = x.enN === 'pl';
    return { pt: finishPT('há ' + x.pt), ptAlt: [], en: `There ${pl ? 'are' : 'is'} ${x.en}.`, enAlt: [`There${pl ? ' are' : "'s"} ${x.en}.`], words: ['há', id] };
  };
  // Ela é portuguesa.
  T.ser_nat = ctx => {
    const nats = csv(G.nats).filter(ctx.K); if (!nats.length) return null;
    const S = E.pick(subjects(ctx, { pronOnly: ctx.rnd() < 0.6 }), ctx.rnd), nat = E.pick(nats, ctx.rnd), neg = ctx.rnd() < 0.2, q = !neg && ctx.rnd() < 0.25;
    const enNat = clean(LEX.get(nat).en);
    const realize = ch => {
      const g = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g];
      const pt = [];
      g.forEach(gg => ptClause(ch.S, vform('ser', 'pres', ch.S.p), adjPT(nat, gg, ch.S.n), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: enClause(ch.S, 'be', 'pres', enNat, { neg, q }), words: [nat], verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: ch.S.p, form: vform('ser', 'pres', ch.S.p) } };
    };
    return finalize(realize, { S, rnd: ctx.rnd });
  };
  // Ele é médico.
  T.ser_prof = ctx => {
    const profs = csv(G.profs).filter(ctx.K); if (!profs.length) return null;
    const S = E.pick(subjects(ctx, { pronOnly: ctx.rnd() < 0.5 }).filter(s => s.n === 'sg'), ctx.rnd), id = E.pick(profs, ctx.rnd), neg = ctx.rnd() < 0.2, q = !neg && ctx.rnd() < 0.25;
    const N = noun(id);
    const realize = ch => {
      const gs = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g];
      const pt = [];
      gs.forEach(gg => { const w = gg === 'f' && N.fem ? N.fem : N.sg; ptClause(ch.S, vform('ser', 'pres', ch.S.p), w, { neg, q }).forEach(x => pt.push(x)); });
      const enW = enNoun(id, ch.S.g === 'f' ? 'f' : 'm');
      return { pt, en: enClause(ch.S, 'be', 'pres', aAn(enW), { neg, q }), words: [id], verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: ch.S.p, form: vform('ser', 'pres', ch.S.p) } };
    };
    return finalize(realize, { S, rnd: ctx.rnd });
  };

  // Subject + verb + object (+ cue). Tense from ctx.tense.
  T.svo = ctx => {
    const tense = ctx.tense || 'pres';
    const noStative = !/^(pres|fut|cond)$/.test(tense);
    const IMP_OK = /^(comer|beber|ler|ver|ouvir|comprar|visitar|jogar|tocar|falar|estudar|aprender|cozinhar|fazer|apanhar|escrever|usar|levar|lavar|limpar|arrumar|esperar|pedir)$/;
    const verbs = Object.keys(G.frames).filter(v => ctx.K('v:' + v));
    const options = [];
    verbs.forEach(v => {
      const fr = frameOf(v);
      if (noStative && fr.flags.st) return;
      if (tense === 'imp' && !IMP_OK.test(v)) return;
      if (fr.flags.pretonly && tense !== 'pret') return;
      if (/^(experimentar|vestir|procurar|encontrar|perder|esquecer|partir)$/.test(v) && /^(imp|cond|fut)$/.test(tense)) return;
      fr.cls.forEach(c => knownIn(ctx, c).forEach(id => options.push([v, c, id, fr])));
    });
    if (!options.length) return null;
    const [inf, cls, id, fr] = E.pick(options, ctx.rnd);
    const rnd = ctx.rnd;
    const S = E.pick(subjects(ctx), rnd);
    const neg = rnd() < 0.2, q = !neg && rnd() < 0.2;
    const stative = !!fr.flags.st;
    const t = tense === 'prog' && stative ? 'pres' : tense;
    let enVerb = fr.flags[cls] || (fr.flags[id] || fr.en);
    if (cls === 'show' && fr.flags.show) enVerb = fr.flags.show;
    let obj;
    if (fr.flags.bare) obj = { pt: LEX.get(id).pt, en: cap(clean(LEX.get(id).en)), words: [id], alts: [] };
    else {
      let det = pickDet(id, ctx, inf !== 'ter' || MASS.has(id));
      if (det === 'poss:teu' && (S.ep === '2' && S.p !== 1)) det = 'def';
      let n = PAIRS.has(id) || (PLOK.has(id) && rnd() < 0.25) ? 'pl' : undefined;
      if (tense === 'imp') { if (MASS.has(id)) det = 'bare'; else if (PLOK.has(id)) { det = 'bare'; n = 'pl'; } else det = 'def'; }
      obj = NP(id, det, { n });
      if (!obj) return null;
      if ((neg || q) && /^some /.test(obj.en)) obj.en = obj.en.replace(/^some /, 'any ');
    }
    if (inf === 'tocar') obj.en = 'the ' + obj.en.toLowerCase();
    if (fr.flags.bare && cls === 'game') obj.en = obj.en.toLowerCase();
    const cueList = (G.cues[t === 'pres' && tense === 'irinf' ? 'irinf' : t] || []);
    const cue = (t !== 'pres' || rnd() < 0.3) && cueList.length && rnd() < 0.7 ? E.pick(cueList, rnd).split('|') : null;
    const realize = ch => {
      const p = ch.S.p;
      const objPT = fr.flags.de ? ctrAlts('de', obj.pt) : [obj.pt];
      let forms;
      if (t === 'prog') forms = [vform('estar', 'pres', p) + ' a ' + inf];
      else if (t === 'irinf') forms = [vform('ir', 'pres', p) + ' ' + inf];
      else forms = [vform(inf, t, p)];
      const pt = [];
      forms.forEach(f => objPT.concat(obj.alts && !fr.flags.de ? obj.alts : []).forEach(op => {
        const rest = [op, cue && cue[2] !== 'start' ? cue[0] : ''].filter(Boolean).join(' ');
        ptClause(ch.S, f, rest, { neg, q }).forEach(x => pt.push(cue && cue[2] === 'start' ? finishPT(cue[0] + ', ' + lcPT(x), q) : x));
      }));
      const enRest = obj.en + (cue && cue[2] !== 'start' ? ' ' + cue[1] : '');
      let en = enClause(ch.S, enVerb, t, enRest, { neg, q, stative });
      if (obj.alts && obj.alts.length && !fr.flags.bare) {
        const objAltEN = NP(id, 'bare', { n: obj.n }); // "some apples" ~ "apples"
        if (objAltEN && /^some /.test(obj.en)) en = en.concat(enClause(ch.S, enVerb, t, objAltEN.en + (cue && cue[2] !== 'start' ? ' ' + cue[1] : ''), { neg, q, stative }));
      }
      if (cue && cue[2] === 'start') en = en.map(x => cap(cue[1]) + ', ' + lcEN(x));
      const focusInf = t === 'prog' ? 'estar' : t === 'irinf' ? 'ir' : inf;
      return { pt, en, words: [id].concat(cue ? [] : []), verbs: [inf], focus: { inf: focusInf, t: t === 'prog' || t === 'irinf' ? 'pres' : t, p, form: forms[0].split(' ')[0] } };
    };
    return finalize(realize, { S, rnd });
  };

  // Subject + intransitive verb + adverb
  T.sv_adv = ctx => {
    const tense = ctx.tense || 'pres';
    const pairs = [];
    Object.keys(G.iv).filter(v => ctx.K('v:' + v)).forEach(v => G.advList.filter(a => ctx.K(a.id) && (!a.verbs || a.verbs.has(v)) && (!a.tenses || a.tenses.has(tense))).forEach(a => pairs.push([v, a])));
    if (!pairs.length) return null;
    const rnd = ctx.rnd, [inf, A] = E.pick(pairs, rnd), S = E.pick(subjects(ctx), rnd);
    const adv = [A.id, A.en, A.pos];
    const pre = adv[2] === 'pre' || adv[2] === 'post';
    const neg = !pre && rnd() < 0.15, q = !neg && !pre && rnd() < 0.15;
    const advPT = LEX.get(adv[0]).pt;
    let enAdv = adv[1];
    if (inf === 'trabalhar' && adv[0] === 'muito') enAdv = 'a lot';
    const realize = ch => {
      const f = vform(inf, tense, ch.S.p);
      const pt = [];
      if (adv[2] === 'pre') ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, advPT, f].filter(Boolean).join(' '))));
      else if (adv[2] === 'post') { ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, f, advPT].filter(Boolean).join(' ')))); ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, advPT, f].filter(Boolean).join(' ')))); }
      else ptClause(ch.S, f, advPT, { neg, q }).forEach(x => pt.push(x));
      let en = pre ? enClause(ch.S, G.iv[inf], tense, '', { pre: enAdv, stative: true }) : enClause(ch.S, G.iv[inf], tense, enAdv, { neg, q, stative: tense !== 'pres' });
      if (adv[0] === 'hoje' && tense === 'pres') en = enClause(ch.S, G.iv[inf], 'prog', enAdv, { neg, q }).concat(en);
      if (inf === 'trabalhar' && adv[0] === 'muito' && !pre) en = en.concat(enClause(ch.S, 'work', tense, 'hard', { neg, q, stative: true }));
      return { pt, en, words: [adv[0]], verbs: [inf], focus: { inf, t: tense, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };

  // Falo português.
  T.sv_lang = ctx => {
    const langs = csv(G.cls.language).filter(ctx.K);
    const verbs = ['falar', 'estudar', 'aprender'].filter(v => ctx.K('v:' + v));
    if (!langs.length || !verbs.length) return null;
    const save = G.frames; // reuse svo with a bare language object
    const rnd = ctx.rnd, inf = E.pick(verbs, rnd), lang = E.pick(langs, rnd), S = E.pick(subjects(ctx), rnd);
    const neg = rnd() < 0.2, q = !neg && rnd() < 0.25, t = ctx.tense || 'pres';
    const enV = { falar: 'speak', estudar: 'study', aprender: 'learn' }[inf];
    const realize = ch => {
      const f = vform(inf, t, ch.S.p);
      return { pt: ptClause(ch.S, f, LEX.get(lang).pt, { neg, q }), en: enClause(ch.S, enV, t, clean(LEX.get(lang).en), { neg, q, stative: inf === 'falar' }), words: [lang], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Moro em Lisboa.
  T.morar = ctx => {
    const cities = csv(G.cities).filter(ctx.K);
    const verbs = ['morar', 'viver', 'trabalhar', 'estudar'].filter(v => ctx.K('v:' + v));
    if (!cities.length || !verbs.length) return null;
    const rnd = ctx.rnd, inf = E.pick(verbs, rnd), city = E.pick(cities, rnd), S = E.pick(subjects(ctx), rnd), neg = rnd() < 0.2, q = !neg && rnd() < 0.2, t = ctx.tense || 'pres';
    const C = LEX.get(city);
    const ptLoc = C.art ? ctr('em', C.art + ' ' + C.pt) : 'em ' + C.pt;
    const enV = { morar: 'live', viver: 'live', trabalhar: 'work', estudar: 'study' }[inf];
    const realize = ch => { const f = vform(inf, t, ch.S.p); return { pt: ptClause(ch.S, f, ptLoc, { neg, q }), en: enClause(ch.S, enV, t, 'in ' + clean(C.en), { neg, q }), words: [city], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  // Gosto de peixe.
  T.gostar = ctx => {
    if (!ctx.K('v:gostar')) return null;
    const ids = knownIn(ctx, 'food').concat(knownIn(ctx, 'drink').filter(d => MASS.has(d)), knownIn(ctx, 'animal'), knownIn(ctx, 'audible'));
    if (!ids.length) return null;
    const rnd = ctx.rnd, id = E.pick(ids, rnd), S = E.pick(subjects(ctx), rnd), neg = rnd() < 0.25, q = !neg && rnd() < 0.25, t = ctx.tense || 'pres';
    const specific = rnd() < 0.3;
    const obj = specific ? NP(id, 'def') : NP(id, 'bare', { n: MASS.has(id) ? 'sg' : 'pl' });
    if (!obj) return null;
    const muito = !neg && !q && rnd() < 0.3;
    const realize = ch => {
      const f = vform('gostar', t, ch.S.p);
      const pt = [];
      ctrAlts('de', obj.pt).forEach(op => ptClause(ch.S, f, (muito ? 'muito ' : '') + op, { neg, q }).forEach(x => pt.push(x)));
      let en = enClause(ch.S, 'like', t, obj.en + (muito ? ' a lot' : ''), { neg, q, stative: true });
      if (muito) en = en.concat(enClause(ch.S, 'like', t, obj.en, { pre: 'really', stative: true }), enClause(ch.S, 'love', t, obj.en, { stative: true }));
      return { pt, en, words: [id], verbs: ['gostar'], focus: { inf: 'gostar', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Queria / quero um café.
  T.querer = ctx => {
    if (!ctx.K('v:querer')) return null;
    const ids = knownIn(ctx, 'orderable').filter(id => !MASSONLY.has(id) || true);
    if (!ids.length) return null;
    const rnd = ctx.rnd, id = E.pick(ids, rnd);
    const x = MASSONLY.has(id) ? NP(id, 'bare') : NP(id, 'indef');
    if (rnd() < 0.5) {
      const pl = rnd() < 0.5 ? ', se faz favor' : '';
      return { pt: cap('queria ' + x.pt + pl + '.'), ptAlt: [cap('quero ' + x.pt + pl + '.')], en: `I'd like ${x.en}${pl ? ', please' : ''}.`, enAlt: [`I would like ${x.en}${pl ? ', please' : ''}.`, `I want ${x.en}${pl ? ', please' : ''}.`, `Can I have ${x.en}${pl ? ', please' : ''}?`], words: [id], verbs: ['querer'], focus: { inf: 'querer', t: 'imp', p: 0, form: 'queria' } };
    }
    const S = E.pick(subjects(ctx), rnd), q = rnd() < 0.4, neg = !q && rnd() < 0.2;
    const realize = ch => { const f = vform('querer', 'pres', ch.S.p); return { pt: ptClause(ch.S, f, x.pt, { neg, q }), en: enClause(ch.S, 'want', 'pres', x.en, { neg, q, stative: true }), words: [id], verbs: ['querer'], focus: { inf: 'querer', t: 'pres', p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  // Tenho dois gatos.
  T.ter_num = ctx => {
    if (!ctx.K('v:ter')) return null;
    const fam = ['irmão', 'filho', 'primo', 'tio', 'neto', 'sobrinho'].filter(ctx.K);
    const ids = [...PETS].filter(ctx.K).concat(['livro', 'carro', 'bicicleta', 'caneta', 'chave', 'gato', 'cão', 'bilhete', 'mala', 'quarto', 'computador'].filter(ctx.K), fam);
    if (!ids.length) return null;
    const rnd = ctx.rnd, id = E.pick(ids, rnd);
    const max = fam.includes(id) || /carro|computador|bicicleta|quarto/.test(id) ? 3 : 5;
    const nums = [1, 2, 3, 4, 5].filter(n => n <= max && ctx.K(numPT(n)));
    if (!nums.length) return null;
    const n = E.pick(nums, rnd), S = E.pick(subjects(ctx).filter(s => !(s.poss && fam.includes(id))), rnd), neg = rnd() < 0.15, q = !neg && rnd() < 0.2;
    const N = noun(id); if (N.plOnly) return null;
    const x = n === 1 ? NP(id, 'indef') : NP(id, 'num:' + n, { n: 'pl' });
    const realize = ch => { const f = vform('ter', 'pres', ch.S.p); return { pt: ptClause(ch.S, f, x.pt, { neg, q }), en: enClause(ch.S, 'have', 'pres', x.en, { neg, q, stative: true }), words: [id, numPT(n)], verbs: ['ter'], focus: { inf: 'ter', t: 'pres', p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  // Tenho vinte anos.
  T.idade = ctx => {
    if (!ctx.K('v:ter') || !ctx.K('ano')) return null;
    const nums = []; for (let i = 2; i <= 99; i++) { const w = numPT(i).split(' '); if (w.every(x => x === 'e' || ctx.K(x))) nums.push(i); }
    if (!nums.length) return null;
    const rnd = ctx.rnd, n = E.pick(nums, rnd), S = E.pick(subjects(ctx), rnd);
    const realize = ch => { const f = vform('ter', 'pres', ch.S.p); const ns = numEN(n); return { pt: ptClause(ch.S, f, numPT(n) + ' anos'), en: enClause(ch.S, 'be', 'pres', ns).concat(enClause(ch.S, 'be', 'pres', ns + ' years old')), words: ['ano'], verbs: ['ter'], focus: { inf: 'ter', t: 'pres', p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  // O livro custa trinta euros.
  T.custar = ctx => {
    if (!ctx.K('v:custar') || !ctx.K('euro')) return null;
    const ids = knownIn(ctx, 'thing').concat(knownIn(ctx, 'clothes'), knownIn(ctx, 'food'), knownIn(ctx, 'press')).filter(id => !/telemóvel|computador|carro|televisão|frigorífico|sofá|cama|piano|bicicleta|mota|barco/.test(id));
    if (!ids.length) return null;
    const rnd = ctx.rnd, id = E.pick(ids, rnd);
    const pc = ['press', 'food', 'drink', 'clothes', 'thing'].find(c => CLS[c] && CLS[c].has(id)) || 'thing';
    const nums = csv(G.prices[pc]).map(Number).filter(i => numPT(i).split(' ').every(x => x === 'e' || ctx.K(x)));
    if (!nums.length) return null;
    const n = E.pick(nums, rnd);
    const det = ctx.K('este') && rnd() < 0.5 ? 'dem:este' : 'def';
    const x = NP(id, det, { n: PAIRS.has(id) ? 'pl' : undefined }); if (!x) return null;
    const pl = x.n === 'pl', q = rnd() < 0.3;
    const f = pl ? 'custam' : 'custa';
    if (q) return { pt: finishPT('quanto ' + f + ' ' + x.pt, true), ptAlt: [], en: `How much ${pl ? 'are' : 'is'} ${x.en}?`, enAlt: [`How much ${pl ? 'do' : 'does'} ${x.en} cost?`], words: [id], verbs: ['custar'], focus: { inf: 'custar', t: 'pres', p: pl ? 5 : 2, form: f } };
    const eur = n === 1 ? 'um euro' : numPT(n) + ' euros', eurEN = n === 1 ? 'one euro' : numEN(n) + ' euros';
    return { pt: finishPT(x.pt + ' ' + f + ' ' + eur), ptAlt: [], en: cap(`${x.en} ${x.enN === 'pl' ? 'cost' : 'costs'} ${eurEN}.`), enAlt: [cap(`${x.en} ${x.enN === 'pl' ? 'are' : 'is'} ${eurEN}.`)], words: [id, 'euro'], verbs: ['custar'], focus: { inf: 'custar', t: 'pres', p: pl ? 5 : 2, form: f } };
  };
  // o meu irmão / my brother
  T.poss_np = ctx => {
    if (!ctx.K('meu')) return null;
    const ids = csv(G.family).filter(ctx.K).concat(knownIn(ctx, 'thing'), knownIn(ctx, 'animal'));
    if (!ids.length) return null;
    const rnd = ctx.rnd, id = E.pick(ids, rnd);
    const which = E.pick(['meu', 'teu', 'nosso', 'meu'].filter(ctx.K), rnd);
    const useOf = ctx.K('dele') && rnd() < 0.3;
    const x = useOf ? NP(id, 'of:' + E.pick(['dele', 'dela'], rnd)) : NP(id, 'poss:' + which, { n: rnd() < 0.25 ? 'pl' : 'sg', g: rnd() < 0.4 ? 'f' : 'm' });
    if (!x) return null;
    return { pt: cap(x.pt), ptAlt: x.alts.map(cap), en: cap(x.en), enAlt: [], words: [id, which], kind: 'np' };
  };
  // O meu pai é médico. / A minha irmã chama-se Ana.
  T.poss_ser = ctx => {
    const subs = subjects(ctx).filter(s => s.poss && s.n === 'sg');
    if (!subs.length) return null;
    const rnd = ctx.rnd, S = E.pick(subs, rnd);
    if (rnd() < 0.5 && ctx.K('v:chamar')) {
      const nm = E.pick(G.nameList.filter(n => n.g === S.g), rnd);
      const realize = ch => ({ pt: ptSubjVariants(ch.S).map(sv => finishPT(sv + ' chama-se ' + nm.en)), en: [`${cap(ch.S.en)}'s name is ${nm.en}.`, `${cap(ch.S.en)} is called ${nm.en}.`], words: S.words || [], verbs: ['chamar'] });
      return finalize(realize, { S, rnd });
    }
    const profs = csv(G.profs).filter(ctx.K);
    if (!profs.length) return null;
    const id = E.pick(profs, rnd), N = noun(id), w = S.g === 'f' && N.fem ? N.fem : N.sg;
    const realize = ch => ({ pt: ptClause(ch.S, 'é', w), en: enClause(ch.S, 'be', 'pres', aAn(enNoun(id, S.g))), words: (S.words || []).concat([id]), verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: 2, form: 'é' } });
    return finalize(realize, { S, rnd });
  };

  function adjFor(ctx, nounId, isPerson, cop) {
    const cl = isPerson ? ['person'] : nounClasses(nounId);
    return G.adjList.filter(a => ctx.K(a.id) && (!cop || a.cop === cop) && a.cls.some(c => cl.includes(c)));
  }
  // A casa é grande. / O café está frio.
  T.ser_adj = ctx => {
    const rnd = ctx.rnd, t = ctx.tense === 'imp' || ctx.tense === 'pret' ? ctx.tense : 'pres';
    const usePerson = rnd() < 0.4;
    let S, adj, words = [];
    if (usePerson) {
      S = E.pick(subjects(ctx), rnd);
      const as = adjFor(ctx, null, true, 'ser'); if (!as.length) return null; adj = E.pick(as, rnd);
    } else {
      const ids = ['thing', 'house', 'food', 'drink', 'animal', 'clothes', 'place', 'vehicle', 'readable'].flatMap(c => knownIn(ctx, c));
      const pairs = []; ids.forEach(id => adjFor(ctx, id, false).forEach(a => pairs.push([id, a])));
      if (!pairs.length) return null;
      let id; [id, adj] = E.pick(pairs, rnd);
      const n = noun(id).plOnly ? 'pl' : PLOK.has(id) && rnd() < 0.3 ? 'pl' : 'sg';
      const x = NP(id, ctx.K('este') && rnd() < 0.2 ? 'dem:este' : 'def', { n });
      if (!x) return null;
      S = { pt: x.pt, en: x.en, ep: x.enN === 'pl' ? '3p' : '3s', p: x.n === 'pl' ? 5 : 2, g: x.g, n: x.n, words: [id] };
      words = [id];
    }
    const cop = adj.cop, neg = rnd() < 0.15, q = !neg && rnd() < 0.2;
    const muito = rnd() < 0.25 && ctx.K('muito') && !/branco|preto|vermelho|azul|verde|amarelo|castanho|cinzento|cor-de-rosa/.test(adj.id);
    const enAdj = adj.en || clean(LEX.get(adj.id).en);
    const realize = ch => {
      const gs = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g];
      const f = vform(cop, t, ch.S.p), pt = [];
      gs.forEach(g => ptClause(ch.S, f, (muito ? 'muito ' : '') + adjPT(adj.id, g, ch.S.n), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: enClause(ch.S, 'be', t, (muito ? 'very ' : '') + enAdj, { neg, q }), words: words.concat([adj.id]), verbs: [cop], focus: { inf: cop, t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Estou cansado.
  T.estar_adj = ctx => {
    const as = G.adjList.filter(a => a.cop === 'estar' && a.cls.includes('person') && ctx.K(a.id));
    if (!as.length || !ctx.K('v:estar')) return null;
    const rnd = ctx.rnd, adj = E.pick(as, rnd), S = E.pick(subjects(ctx), rnd), neg = rnd() < 0.15, q = !neg && rnd() < 0.25, t = ctx.tense === 'pret' || ctx.tense === 'imp' ? ctx.tense : 'pres';
    const extra = rnd() < 0.3 ? (ctx.K('hoje') ? ['hoje', 'today'] : null) : null;
    const realize = ch => {
      const gs = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g], f = vform('estar', t, ch.S.p), pt = [];
      gs.forEach(g => ptClause(ch.S, f, adjPT(adj.id, g, ch.S.n) + (extra ? ' ' + extra[0] : ''), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: enClause(ch.S, 'be', t, (adj.en || clean(LEX.get(adj.id).en)) + (extra ? ' ' + extra[1] : ''), { neg, q }), words: [adj.id], verbs: ['estar'], focus: { inf: 'estar', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // um carro novo / a new car
  T.np_adj = ctx => {
    const ids = ['thing', 'house', 'clothes', 'animal', 'vehicle', 'food'].flatMap(c => knownIn(ctx, c));
    const pairs = []; ids.forEach(id => adjFor(ctx, id, false, 'ser').forEach(a => pairs.push([id, a])));
    if (!pairs.length) return null;
    const rnd = ctx.rnd, [id, adj] = E.pick(pairs, rnd);
    const n = noun(id).plOnly ? 'pl' : rnd() < 0.3 ? 'pl' : 'sg';
    const det = rnd() < 0.5 ? 'indef' : 'def';
    const x = NP(id, det, { n }); if (!x) return null;
    const a = adjPT(adj.id, x.g, x.n), enA = adj.en || clean(LEX.get(adj.id).en);
    const pt = x.pt + ' ' + a;
    let en = x.en.replace(/^(the|a|an|some) /, (m, d) => d === 'a' || d === 'an' ? aAn(enA).split(' ')[0] + ' ' + enA + ' ' : d + ' ' + enA + ' ');
    if (en === x.en) en = enA + ' ' + x.en;
    const ptAlt = x.alts.map(al => al + ' ' + a);
    if (ctx.K('v:ter') && rnd() < 0.5 && (!CLS.animal.has(id) || PETS.has(id))) {
      const S = E.pick(subjects(ctx), rnd);
      const realize = ch => { const f = vform('ter', 'pres', ch.S.p); return { pt: ptClause(ch.S, f, pt), en: enClause(ch.S, 'have', 'pres', en.replace(/^some /, ''), { stative: true }).concat(enClause(ch.S, 'have', 'pres', en, { stative: true })), words: [id, adj.id], verbs: ['ter'], focus: { inf: 'ter', t: 'pres', p: ch.S.p, form: f } }; };
      return finalize(realize, { S, rnd });
    }
    return { pt: cap(pt), ptAlt: ptAlt.map(cap), en: cap(en.replace(/\s+/g, ' ')), enAlt: [], words: [id, adj.id], kind: 'np' };
  };
  // Este casaco é caro.
  T.dem_adj = ctx => {
    if (!ctx.K('este')) return T.ser_adj(ctx);
    const ids = ['clothes', 'thing', 'food'].flatMap(c => knownIn(ctx, c));
    const pairs = []; ids.forEach(id => adjFor(ctx, id, false, 'ser').forEach(a => pairs.push([id, a])));
    if (!pairs.length) return null;
    const rnd = ctx.rnd, [id, adj] = E.pick(pairs, rnd), dem = E.pick(['este', 'esse', 'aquele'].filter(ctx.K), rnd);
    const x = NP(id, 'dem:' + dem, { n: noun(id).plOnly ? 'pl' : rnd() < 0.3 ? 'pl' : 'sg' }); if (!x) return null;
    const pl = x.n === 'pl', enPl2 = x.enN === 'pl', a = adjPT(adj.id, x.g, x.n), enA = adj.en || clean(LEX.get(adj.id).en);
    const ptAlts = [x.pt].concat(x.alts).map(s => finishPT(s + ' ' + (pl ? 'são' : 'é') + ' ' + a));
    return { pt: ptAlts[0], ptAlt: ptAlts.slice(1), en: cap(`${x.en} ${enPl2 ? 'are' : 'is'} ${enA}.`), enAlt: [], words: [id, adj.id, dem], verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: pl ? 5 : 2, form: pl ? 'são' : 'é' } };
  };

  // Places
  function knownPlaces(ctx) { return G.placeList.filter(pl => ctx.K(pl.id) && LEX.has(pl.id)); }
  // a place as a noun phrase with the English taken from its "at" phrase (café = café, not coffee)
  function placeNP(pl) { const x = NP(pl.id, 'def'); if (x) x.en = pl.at.replace(/^(at|in|on) /, '').replace(/^(?!the )/, 'the '); return x; }
  function placePT(pl, prep) {
    const N = noun(pl.id);
    if (pl.bare) return prep === 'em' ? ['em casa'] : ['para casa', 'a casa'];
    const np = (N.g === 'f' ? 'a ' : 'o ') + N.sg;
    if (prep === 'em') return [ctr('em', np)];
    if (pl.para) return ['para ' + np, ctr('a', np)];
    return [ctr('a', np), 'para ' + np];
  }
  T.estar_loc = ctx => {
    const pls = knownPlaces(ctx); if (!pls.length || !ctx.K('v:estar')) return null;
    const rnd = ctx.rnd, pl = E.pick(pls, rnd), t = ctx.tense === 'pret' || ctx.tense === 'imp' ? ctx.tense : 'pres';
    const pets = [...PETS].filter(ctx.K);
    const useAnimal = rnd() < 0.2 && pets.length && /jardim|parque|praia|cozinha|sala|quarto|casa/.test(pl.id);
    let S;
    if (useAnimal) { const id = E.pick(pets, rnd); const x = NP(id, 'def'); S = { pt: x.pt, en: x.en, ep: '3s', p: 2, g: x.g, n: 'sg', words: [id] }; }
    else S = E.pick(subjects(ctx), rnd);
    const q = rnd() < 0.2, neg = !q && rnd() < 0.15;
    const cue = t === 'pret' && rnd() < 0.6 ? E.pick(G.cues.pret, rnd).split('|') : null;
    const realize = ch => {
      const f = vform('estar', t, ch.S.p), pt = [];
      placePT(pl, 'em').forEach(lp => ptClause(ch.S, f, lp + (cue ? ' ' + cue[0] : ''), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: enClause(ch.S, 'be', t, pl.at + (cue ? ' ' + cue[1] : ''), { neg, q }), words: [pl.id], verbs: ['estar'], focus: { inf: 'estar', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  T.ficar_loc = ctx => {
    if (!ctx.K('v:ficar')) return null;
    const pls = knownPlaces(ctx).filter(p => !p.bare && !/cozinha|sala|quarto|casa de banho|trabalho|escritório|festa/.test(p.id));
    const rels = [['perto de', 'near'], ['longe de', 'far from'], ['ao lado de', 'next to'], ['em frente de', 'opposite']].filter(r => ctx.K(r[0]));
    if (pls.length < 2 || !rels.length) return null;
    const rnd = ctx.rnd, a = E.pick(pls, rnd); let b = E.pick(pls, rnd); if (a.id === b.id) b = pls.find(p => p.id !== a.id);
    const rel = E.pick(rels, rnd), A = placeNP(a), B = placeNP(b);
    const base = rel[0].replace(/ de$/, '');
    const pt = finishPT(`${A.pt} fica ${base} ${ctr('de', B.pt)}`);
    return { pt, ptAlt: [finishPT(`${A.pt} é ${base} ${ctr('de', B.pt)}`), finishPT(`${A.pt} está ${base} ${ctr('de', B.pt)}`)], en: cap(`${A.en} is ${rel[1]} ${B.en}.`), enAlt: [], words: [a.id, b.id, rel[0]], verbs: ['ficar'], focus: { inf: 'ficar', t: 'pres', p: 2, form: 'fica' } };
  };
  T.ha_loc = ctx => {
    if (!ctx.K('há')) return null;
    const rooms = /^(cozinha|sala|quarto|escritório|escola|restaurante|café|hotel|jardim)$/;
    const outdoor = /^(jardim|parque|praia|cozinha|sala|quarto)$/;
    const pairs = [];
    knownPlaces(ctx).filter(p => !p.bare).forEach(p => {
      [...PETS].filter(ctx.K).forEach(a => { if (outdoor.test(p.id)) pairs.push([p, a]); });
      ['mesa', 'cadeira', 'cama', 'sofá', 'televisão', 'candeeiro', 'computador', 'livro', 'mala', 'garrafa', 'copo', 'flor', 'mapa', 'bicicleta'].filter(ctx.K).forEach(t => { if (rooms.test(p.id)) pairs.push([p, t]); });
    });
    if (!pairs.length) return null;
    const rnd = ctx.rnd, [pl, id] = E.pick(pairs, rnd), n = rnd() < 0.6 || !PLOK.has(id) ? 1 : 2 + Math.floor(rnd() * 2);
    const x = n === 1 ? NP(id, 'indef') : NP(id, 'num:' + n, { n: 'pl' });
    const q = rnd() < 0.3, lp = placePT(pl, 'em')[0];
    const plEN = x.enN === 'pl';
    return { pt: finishPT(`há ${x.pt} ${lp}`, q), ptAlt: [], en: q ? `${plEN ? 'Are' : 'Is'} there ${x.en} ${pl.at}?` : `There ${plEN ? 'are' : 'is'} ${x.en} ${pl.at}.`, enAlt: [], words: ['há', id, pl.id] };
  };
  T.onde = ctx => {
    const things = knownIn(ctx, 'losable').concat(knownIn(ctx, 'animal'), knownIn(ctx, 'thing'));
    const pls = knownPlaces(ctx).filter(p => !p.bare);
    const rnd = ctx.rnd;
    if (pls.length && ctx.K('v:ficar') && rnd() < 0.5) {
      const pl = E.pick(pls.filter(p => !/cozinha|sala|quarto|casa de banho|trabalho|festa/.test(p.id)).concat(pls).slice(0, Math.max(1, pls.length)), rnd), x = placeNP(pl);
      return { pt: finishPT('onde fica ' + x.pt, true), ptAlt: [finishPT('onde é ' + x.pt, true), finishPT('onde está ' + x.pt, true)], en: `Where is ${x.en}?`, enAlt: [`Where's ${x.en}?`], words: [pl.id], verbs: ['ficar'] };
    }
    if (!things.length) return null;
    const id = E.pick(things, rnd), x = NP(id, ctx.K('meu') && rnd() < 0.5 ? 'poss:meu' : 'def');
    const pl = x.enN === 'pl', f = x.n === 'pl' ? 'estão' : 'está';
    return { pt: finishPT(`onde ${f} ${x.pt}`, true), ptAlt: x.alts.map(a => finishPT(`onde ${f} ${a}`, true)), en: `Where ${pl ? 'are' : 'is'} ${x.en}?`, enAlt: pl ? [] : [`Where's ${x.en}?`], words: [id], verbs: ['estar'], focus: { inf: 'estar', t: 'pres', p: x.n === 'pl' ? 5 : 2, form: f } };
  };
  // Vou à praia. (tense from ctx)
  T.ir_a = ctx => {
    if (!ctx.K('v:ir')) return null;
    const pls = knownPlaces(ctx).filter(p => !/cozinha|sala|quarto|casa de banho/.test(p.id));
    if (!pls.length) return null;
    const rnd = ctx.rnd, pl = E.pick(pls, rnd), S = E.pick(subjects(ctx), rnd), t = ctx.tense === 'pret' || ctx.tense === 'imp' ? ctx.tense : 'pres';
    const q = rnd() < 0.2, neg = !q && rnd() < 0.15;
    const cue = t !== 'pres' && rnd() < 0.6 ? E.pick(G.cues[t], rnd).split('|') : null;
    const realize = ch => {
      const f = vform('ir', t, ch.S.p), pt = [];
      placePT(pl, 'a').forEach(lp => ptClause(ch.S, f, lp + (cue && cue[2] !== 'start' ? ' ' + cue[0] : ''), { neg, q }).forEach(x => pt.push(cue && cue[2] === 'start' ? finishPT(cue[0] + ', ' + lcPT(x), q) : x)));
      let en = enClause(ch.S, 'go', t, pl.to + (cue && cue[2] !== 'start' ? ' ' + cue[1] : ''), { neg, q });
      if (cue && cue[2] === 'start') en = en.map(x => cap(cue[1]) + ', ' + lcEN(x));
      return { pt, en, words: [pl.id], verbs: ['ir'], focus: { inf: 'ir', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Time telling
  T.horas = ctx => {
    if (!ctx.K('hora')) return null;
    const rnd = ctx.rnd, h = 1 + Math.floor(rnd() * 12), kind = E.pick(['oclock', 'oclock', 'meia', 'quarto', 'menos', 'dez', 'meio'], rnd);
    const hp = n => numPT(n, 'f'), he = n => numEN(n);
    const ser = n => (n === 1 ? 'é' : 'são');
    switch (kind) {
      case 'oclock': return { pt: cap(`${ser(h)} ${hp(h)} ${h === 1 ? 'hora' : 'horas'}.`), ptAlt: [cap(`${ser(h)} ${hp(h)}.`)], en: `It's ${he(h)} o'clock.`, enAlt: [`It's ${he(h)}.`], words: ['hora'] };
      case 'meia': return { pt: cap(`${ser(h)} ${hp(h)} e meia.`), ptAlt: [], en: `It's half past ${he(h)}.`, enAlt: [`It's ${he(h)} thirty.`], words: ['hora'] };
      case 'quarto': return { pt: cap(`${ser(h)} ${hp(h)} e um quarto.`), ptAlt: [], en: `It's quarter past ${he(h)}.`, enAlt: [`It's a quarter past ${he(h)}.`, `It's ${he(h)} fifteen.`], words: ['hora'] };
      case 'menos': { const nx = h === 12 ? 1 : h + 1; return { pt: cap(`${ser(nx)} ${hp(nx)} menos um quarto.`), ptAlt: [], en: `It's quarter to ${he(nx)}.`, enAlt: [`It's a quarter to ${he(nx)}.`, `It's ${he(h)} forty-five.`], words: ['hora'] }; }
      case 'dez': { const m = E.pick([5, 10, 20, 25], rnd); return { pt: cap(`${ser(h)} ${hp(h)} e ${numPT(m)}.`), ptAlt: [], en: `It's ${he(m)} past ${he(h)}.`, enAlt: [`It's ${he(h)} ${m === 5 ? 'oh five' : he(m)}.`], words: ['hora', 'minuto'] }; }
      default: return ctx.K('meio-dia') ? { pt: 'É meio-dia.', ptAlt: [], en: "It's midday.", enAlt: ["It's noon.", "It's twelve o'clock."], words: ['meio-dia'] } : null;
    }
  };
  // Janto às oito.
  T.at_time = ctx => {
    const HRS = { jantar: [7, 8, 9], almoçar: [1, 2], chegar: [6, 7, 8, 9], sair: [7, 8, 9, 5, 6], acordar: [6, 7, 8, 9], voltar: [5, 6, 7] };
    const verbs = Object.keys(HRS).filter(v => ctx.K('v:' + v));
    if (!verbs.length || !ctx.K('hora')) return null;
    const rnd = ctx.rnd, inf = E.pick(verbs, rnd), S = E.pick(subjects(ctx), rnd), h = E.pick(HRS[inf], rnd), half = rnd() < 0.3;
    const ptT = (h === 1 ? 'à uma' : 'às ' + numPT(h, 'f')) + (half ? ' e meia' : '');
    const enT = 'at ' + (half ? 'half past ' + numEN(h) : numEN(h));
    const t = ctx.tense === 'pret' ? 'pret' : 'pres';
    const enV = Object.assign({}, G.iv, { voltar: 'come back', sair: 'leave' })[inf];
    const realize = ch => { const f = vform(inf, t, ch.S.p); return { pt: ptClause(ch.S, f, ptT), en: enClause(ch.S, enV, t, enT, { stative: true }).concat(half ? enClause(ch.S, enV, t, 'at ' + numEN(h) + ' thirty', { stative: true }) : []), words: ['hora'], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  // Reflexives with European clitic placement
  const REFL = ['me', 'te', 'se', 'nos', 'vos', 'se'];
  T.reflex = ctx => {
    const verbs = G.reflexList.filter(r => ctx.K('v:' + r.inf));
    if (!verbs.length) return null;
    const rnd = ctx.rnd, R = E.pick(verbs, rnd), inf = R.inf, S = E.pick(subjects(ctx, { noFormal: false }), rnd);
    const mode = E.pick(['aff', 'aff', 'neg', 'nunca', 'q'], rnd);
    const comps = R.comp.filter(c => /^t\d/.test(c) ? ctx.K('hora') : /^de |^à /.test(c) || ctx.K(c));
    const comp = comps.length ? E.pick(comps, rnd) : '';
    const mode2 = comp === 'muito' && mode === 'nunca' ? 'aff' : mode;
    let ptT = '', enT = '';
    if (/^t\d/.test(comp)) { const [a, b] = comp.slice(1).split('-').map(Number); const h = a + Math.floor(rnd() * (b - a + 1)); ptT = 'às ' + numPT(h, 'f'); enT = 'at ' + numEN(h); }
    else if (comp) { ptT = LEX.has(comp) ? LEX.get(comp).pt : comp; enT = { muito: 'a lot', aqui: 'here', ali: 'over there', depressa: 'quickly', devagar: 'slowly', cedo: 'early', 'tarde-adv': 'late', 'de manhã': 'in the morning', 'à noite': 'at night' }[comp] || ''; }
    const t = ctx.tense === 'pret' ? 'pret' : 'pres';
    const enV = R.en;
    const realize = ch => {
      const f = vform(inf, t, ch.S.p), cl = REFL[ch.S.p], pt = [];
      ptSubjVariants(ch.S).forEach(sv => {
        let core;
        if (mode2 === 'aff' || mode2 === 'q') core = enclitic(f, cl);
        else core = (mode2 === 'neg' ? 'não ' : 'nunca ') + cl + ' ' + f;
        pt.push(finishPT([sv, core, ptT].filter(Boolean).join(' '), mode2 === 'q'));
      });
      let en;
      if (mode2 === 'nunca') en = enClause(ch.S, enV, t, enT, { pre: 'never', stative: true });
      else en = enClause(ch.S, enV, t, enT, { neg: mode2 === 'neg', q: mode2 === 'q', stative: true });
      return { pt, en, words: /^às/.test(ptT) ? ['hora'] : [], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // ir + infinitive, ter de, modal + infinitive
  T.ir_inf = ctx => (ctx.K('v:ir') ? T.svo(Object.assign({}, ctx, { tense: 'irinf' })) : null);
  T.prog = ctx => (ctx.K('v:estar') ? T.svo(Object.assign({}, ctx, { tense: 'prog' })) : null);
  T.prog_iv = ctx => {
    if (!ctx.K('v:estar')) return null;
    const verbs = Object.keys(G.iv).filter(v => ctx.K('v:' + v) && !/chegar|sair|partir|acordar|ganhar|perder|voltar/.test(v));
    if (!verbs.length) return null;
    const rnd = ctx.rnd, inf = E.pick(verbs, rnd), S = E.pick(subjects(ctx), rnd), q = rnd() < 0.2, neg = !q && rnd() < 0.15;
    const cue = rnd() < 0.5 ? E.pick(G.cues.prog, rnd).split('|') : null;
    const realize = ch => { const f = vform('estar', 'pres', ch.S.p); return { pt: ptClause(ch.S, f + ' a ' + inf, cue ? cue[0] : '', { neg, q }), en: enClause(ch.S, G.iv[inf], 'prog', cue ? cue[1] : '', { neg, q }), verbs: [inf], focus: { inf: 'estar', t: 'pres', p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  T.ter_de = ctx => {
    if (!ctx.K('v:ter')) return null;
    const base = T.svo(Object.assign({}, ctx, { tense: 'pres' }));
    return base ? modalize(ctx, base, 'ter') : null;
  };
  T.modal = ctx => {
    const ms = ['querer', 'poder', 'precisar', 'gostar'].filter(v => ctx.K('v:' + v));
    if (!ms.length) return null;
    return modalize(ctx, null, E.pick(ms, ctx.rnd));
  };
  function modalize(ctx, _unused, modal) {
    const verbs = Object.keys(G.frames).filter(v => ctx.K('v:' + v) && v !== modal && !frameOf(v).flags.st && !frameOf(v).flags.pretonly);
    const opts = []; verbs.forEach(v => { const fr = frameOf(v); fr.cls.forEach(c => knownIn(ctx, c).forEach(id => opts.push([v, c, id, fr]))); });
    if (!opts.length) return null;
    const rnd = ctx.rnd, [inf, cls, id, fr] = E.pick(opts, rnd), S = E.pick(subjects(ctx), rnd);
    const neg = rnd() < 0.2, q = !neg && rnd() < 0.25;
    const obj = fr.flags.bare ? { pt: LEX.get(id).pt, en: cap(clean(LEX.get(id).en)), alts: [] } : NP(id, pickDet(id, ctx, true));
    if (!obj) return null;
    let enVerb = fr.flags[cls] || fr.en; if (cls === 'show' && fr.flags.show) enVerb = fr.flags.show;
    if (inf === 'tocar') obj.en = 'the ' + obj.en.toLowerCase();
    const objPT = fr.flags.de ? ctr('de', obj.pt) : obj.pt;
    const link = { ter: ' de ', precisar: ' de ', gostar: ' de ', querer: ' ', poder: ' ' }[modal];
    const enM = { ter: 'have to', precisar: 'need to', gostar: 'like to', querer: 'want to', poder: 'can' }[modal];
    const realize = ch => {
      const f = vform(modal, 'pres', ch.S.p);
      const pt = ptClause(ch.S, f + link + inf, objPT, { neg, q });
      if (modal === 'ter') ptClause(ch.S, f + ' que ' + inf, objPT, { neg, q }).forEach(x => pt.push(x));
      let en;
      if (modal === 'poder') {
        const s = ch.S.en;
        en = q ? [`Can ${s} ${enVerb} ${obj.en}?`, `May ${s} ${enVerb} ${obj.en}?`] : neg ? [`${s} can't ${enVerb} ${obj.en}.`, `${s} cannot ${enVerb} ${obj.en}.`] : [`${s} can ${enVerb} ${obj.en}.`];
      } else {
        const mb = enM.split(' ')[0], rest = enM.split(' ').slice(1).join(' ') + ' ' + enVerb + ' ' + obj.en;
        en = enClause(ch.S, mb, 'pres', rest, { neg, q, stative: true });
        if (modal === 'gostar') en = en.concat(enClause(ch.S, 'like', 'pres', E.en(enVerb.split(' ')[0], 'ing') + (enVerb.includes(' ') ? ' ' + enVerb.split(' ').slice(1).join(' ') : '') + ' ' + obj.en, { neg, q, stative: true }));
        if (modal === 'ter' && !q && !neg) en.push(`${ch.S.en} ${ch.S.ep === '3s' ? 'has' : 'have'} got to ${enVerb} ${obj.en}.`);
      }
      return { pt, en, words: [id], verbs: [modal, inf], focus: { inf: modal, t: 'pres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  }
  // Doer: Dói-me a cabeça.
  T.doer = ctx => {
    const parts = csv(G.body).filter(ctx.K);
    if (!parts.length) return null;
    const rnd = ctx.rnd, id = E.pick(parts, rnd), N = noun(id);
    const pl = N.plOnly || (rnd() < 0.25 && /pé|olho|joelho|ombro|mão|perna|braço|dente/.test(id));
    const x = NP(id, 'def', { n: pl ? 'pl' : 'sg' });
    const who = E.pick([['me', 'my'], ['me', 'my'], ['te', 'your'], ['lhe', 'his'], ['lhe', 'her']], rnd);
    const q = who[0] === 'te' && rnd() < 0.5;
    const verb = x.n === 'pl' ? 'doem' : 'dói';
    const enBody = id === 'barriga' ? 'stomach' : x.en.replace(/^the /, '');
    const enPl2 = x.enN === 'pl';
    const pt = finishPT(`${verb}-${who[0]} ${x.pt}`, q);
    const en = q ? `${enPl2 ? 'Do' : 'Does'} your ${enBody} hurt?` : `${cap(who[1])} ${enBody} ${enPl2 ? 'hurt' : 'hurts'}.`;
    const enAlt = q ? [] : who[0] === 'lhe' ? [`${who[1] === 'his' ? 'Her' : 'His'} ${enBody} ${enPl2 ? 'hurt' : 'hurts'}.`, `Your ${enBody} ${enPl2 ? 'hurt' : 'hurts'}.`] : [];
    return { pt, ptAlt: [], en, enAlt, words: [id], verbs: ['doer'], focus: { inf: 'doer', t: 'pres', p: x.n === 'pl' ? 5 : 2, form: verb } };
  };
  // Imperatives
  function imperative(ctx, list) {
    const items = list.map(s => s.split('|')).filter(([v]) => ctx.K('v:' + v));
    if (!items.length) return null;
    const rnd = ctx.rnd, [inf, rest, en] = E.pick(items, rnd);
    const who = E.pick(['tu', 'tu', 'formal', 'vocês', 'neg'], rnd);
    const F = E.conjugate(inf);
    let form, hint, pt, enS;
    if (who === 'tu') { form = F.impa[1]; hint = 'tu'; }
    else if (who === 'formal') { form = F.impa[2]; hint = 'formal'; }
    else if (who === 'vocês') { form = F.impa[5]; hint = 'plural'; }
    else { form = F.impn[1]; hint = 'tu'; }
    pt = finishPT((who === 'neg' ? 'não ' : '') + form + (rest ? ' ' + rest : ''));
    pt = pt.replace(/\.$/, '!');
    enS = (who === 'neg' ? "Don't " + en : cap(en)) + '!';
    const alts = [pt.replace(/!$/, '.')];
    if (who === 'formal') alts.push(finishPT(form + (rest ? ' ' + rest : '') + ', se faz favor'));
    return { pt, ptAlt: alts, en: enS, enAlt: [enS.replace(/!$/, '.'), (who === 'neg' ? 'Do not ' + en : cap(en)) + '.'], hint, words: [], verbs: [inf], focus: { inf, t: who === 'neg' ? 'impn' : 'impa', p: who === 'tu' || who === 'neg' ? 1 : who === 'formal' ? 2 : 5, form } };
  }
  T.impa = ctx => imperative(ctx, G.impa);
  T.impa_dir = ctx => imperative(ctx, G.impa_dir);
  // Vou de comboio para o Porto.
  T.ir_de = ctx => {
    const tr = knownIn(ctx, 'transport').concat(knownIn(ctx, 'vehicle')).filter(id => id !== 'táxi');
    const cities = csv(G.cities).filter(ctx.K);
    if (!tr.length || !ctx.K('v:ir')) return null;
    const rnd = ctx.rnd, id = E.pick(tr.filter(x => x !== 'barco'), rnd), S = E.pick(subjects(ctx), rnd), t = ctx.tense === 'pret' ? 'pret' : 'pres';
    if (!id) return null;
    const far = csv('Madrid,Paris,Londres,Roma').filter(c => cities.includes(c)), near = cities.filter(c => !far.includes(c));
    const pool = id === 'avião' ? far : /comboio|autocarro|carro/.test(id) ? near : [];
    const city = pool.length && (id === 'avião' || rnd() < 0.6) ? LEX.get(E.pick(pool, rnd)) : null;
    if (id === 'avião' && !city) return null;
    const dest = city ? (city.art ? ['para ' + city.art + ' ' + city.pt, ctr('a', city.art + ' ' + city.pt)] : ['para ' + city.pt, 'a ' + city.pt]) : [ctx.K('trabalho') ? 'para o trabalho' : 'para casa'];
    const enDest = city ? 'to ' + clean(city.en) : (ctx.K('trabalho') ? 'to work' : 'home');
    const enBy = 'by ' + (G.enN[id] || clean(LEX.get(id).en));
    const realize = ch => {
      const f = vform('ir', t, ch.S.p), pt = [];
      dest.forEach(d => { ptClause(ch.S, f, `de ${LEX.get(id).pt} ${d}`).forEach(x => pt.push(x)); ptClause(ch.S, f, `${d} de ${LEX.get(id).pt}`).forEach(x => pt.push(x)); });
      return { pt, en: enClause(ch.S, 'go', t, `${enDest} ${enBy}`, { stative: t !== 'pres' }), words: [id], verbs: ['ir'], focus: { inf: 'ir', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Comparisons
  function compPair(ctx) {
    const groups = [['vehicle', 'transport'], ['animal'], ['thing'], ['clothes']];
    for (let tries = 0; tries < 6; tries++) {
      const grp = E.pick(groups, ctx.rnd), ids = grp.flatMap(c => knownIn(ctx, c)).filter(id => !noun(id).plOnly);
      if (ids.length < 2) continue;
      const a = E.pick(ids, ctx.rnd); let b = E.pick(ids, ctx.rnd); if (a === b) b = ids.find(x => x !== a);
      const adjs = adjFor(ctx, a, false, 'ser').filter(x => adjFor(ctx, b, false, 'ser').includes(x) && !/branco|preto|vermelho|azul|verde|amarelo|castanho|cinzento|cor-de-rosa/.test(x.id));
      if (adjs.length) return [a, b, E.pick(adjs, ctx.rnd)];
    }
    return null;
  }
  T.comp = ctx => {
    if (!ctx.K('mais')) return null;
    const pr = compPair(ctx); if (!pr) return null;
    const [a, b, adj] = pr, rnd = ctx.rnd, A = NP(a, 'def'), B = NP(b, 'def');
    const enA = adj.en || clean(LEX.get(adj.id).en), less = ctx.K('menos') && rnd() < 0.3;
    const special = { bom: 'melhor', mau: 'pior', grande: 'maior' }[adj.id];
    const adjP = adjPT(adj.id, A.g, 'sg');
    const ptCore = less ? `menos ${adjP}` : special ? special : `mais ${adjP}`;
    const pt = finishPT(`${A.pt} é ${ptCore} do que ${B.pt}`);
    const ptAlt = [finishPT(`${A.pt} é ${ptCore} que ${B.pt}`)];
    if (adj.id === 'pequeno' && !less) ptAlt.push(finishPT(`${A.pt} é menor do que ${B.pt}`), finishPT(`${A.pt} é menor que ${B.pt}`));
    const comp = less ? `less ${enA}` : G.enComp[enA] || `more ${enA}`;
    const enMain = less ? cap(`${A.en} isn't as ${enA} as ${B.en}.`) : cap(`${A.en} is ${comp} than ${B.en}.`);
    const enAlt = less ? [cap(`${A.en} is not as ${enA} as ${B.en}.`), cap(`${A.en} is ${comp} than ${B.en}.`)] : [];
    return { pt, ptAlt, en: enMain, enAlt, words: [a, b, adj.id, less ? 'menos' : 'mais'], verbs: ['ser'] };
  };
  T.tao = ctx => {
    if (!ctx.K('tão')) return T.comp(ctx);
    const pr = compPair(ctx); if (!pr) return null;
    const [a, b, adj] = pr, A = NP(a, 'def'), B = NP(b, 'def'), enA = adj.en || clean(LEX.get(adj.id).en), neg = ctx.rnd() < 0.3;
    const adjP = adjPT(adj.id, A.g, 'sg');
    return { pt: finishPT(`${A.pt} ${neg ? 'não é' : 'é'} tão ${adjP} como ${B.pt}`), ptAlt: [finishPT(`${A.pt} ${neg ? 'não é' : 'é'} tão ${adjP} quanto ${B.pt}`)], en: cap(`${A.en} ${neg ? "isn't" : 'is'} as ${enA} as ${B.en}.`), enAlt: neg ? [cap(`${A.en} is not as ${enA} as ${B.en}.`)] : [], words: [a, b, adj.id, 'tão'], verbs: ['ser'] };
  };
  T.gostaria = ctx => {
    const opts = []; Object.keys(G.frames).filter(v => ctx.K('v:' + v) && !/ter|querer|precisar/.test(v)).forEach(v => { const fr = frameOf(v); fr.cls.forEach(c => knownIn(ctx, c).forEach(id => opts.push([v, c, id, fr]))); });
    if (!opts.length) return null;
    const rnd = ctx.rnd, [inf, cls, id, fr] = E.pick(opts, rnd);
    const obj = fr.flags.bare ? { pt: LEX.get(id).pt, en: cap(clean(LEX.get(id).en)) } : NP(id, MASSONLY.has(id) ? 'bare' : 'indef'); if (!obj) return null;
    let enV = fr.flags[cls] || fr.en; if (cls === 'show' && fr.flags.show) enV = fr.flags.show;
    const op = fr.flags.de ? ctr('de', obj.pt) : obj.pt;
    const who = rnd() < 0.7 ? 'eu' : 'nós', S = PRON_SUBJ[who];
    const f = who === 'eu' ? 'gostaria' : 'gostaríamos', f2 = who === 'eu' ? 'gostava' : 'gostávamos';
    const pt = finishPT(`${f} de ${inf} ${op}`);
    return { pt, ptAlt: [finishPT(`${S.pt} ${f} de ${inf} ${op}`), finishPT(`${f2} de ${inf} ${op}`), finishPT(`${S.pt} ${f2} de ${inf} ${op}`)], en: `${cap(S.en)} would like to ${enV} ${obj.en}.`, enAlt: [`${cap(S.en)}'d like to ${enV} ${obj.en}.`], words: [id], verbs: ['gostar', inf], focus: { inf: 'gostar', t: 'cond', p: S.p, form: f } };
  };
  // Subjunctive
  const OBJ_EN = { I: 'me', you: 'you', he: 'him', she: 'her', we: 'us', they: 'them' };
  function subClauseSVO(ctx, tense, notP) {
    const opts = []; Object.keys(G.frames).filter(v => ctx.K('v:' + v) && !frameOf(v).flags.st).forEach(v => { const fr = frameOf(v); fr.cls.forEach(c => knownIn(ctx, c).forEach(id => opts.push([v, c, id, fr]))); });
    const ivs = Object.keys(G.iv).filter(v => ctx.K('v:' + v));
    if (!opts.length && !ivs.length) return null;
    const rnd = ctx.rnd;
    const no = [].concat(notP); const subs = subjects(ctx, { pronOnly: rnd() < 0.7 }).filter(s => !no.includes(s.p) && !/senhor/.test(s.pt));
    const S = E.pick(subs, rnd);
    if (opts.length && rnd() < 0.7) {
      const [inf, cls, id, fr] = E.pick(opts, rnd);
      const obj = fr.flags.bare ? { pt: LEX.get(id).pt, en: cap(clean(LEX.get(id).en)) } : NP(id, MASSONLY.has(id) ? 'bare' : 'def'); if (!obj) return null;
      let enV = fr.flags[cls] || fr.en; if (cls === 'show' && fr.flags.show) enV = fr.flags.show;
      if (inf === 'tocar') obj.en = 'the ' + obj.en.toLowerCase();
      return { S, inf, enV, ptRest: fr.flags.de ? ctr('de', obj.pt) : obj.pt, enRest: obj.en, words: [id] };
    }
    const inf = E.pick(ivs, rnd);
    return { S, inf, enV: G.iv[inf], ptRest: '', enRest: '', words: [] };
  }
  T.espero = ctx => {
    if (!ctx.K('v:esperar')) return null;
    const rnd = ctx.rnd, main = rnd() < 0.7 ? PRON_SUBJ.eu : PRON_SUBJ['nós'];
    const sc = subClauseSVO(ctx, 'cpres', main.p === 3 ? [0, 3] : [0]); if (!sc) return null;
    const mf = vform('esperar', 'pres', main.p);
    const realize = ch => {
      const f = vform(sc.inf, 'cpres', ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => { pt.push(finishPT([mf, 'que', sv, f, sc.ptRest].filter(Boolean).join(' '))); pt.push(finishPT([main.pt, mf, 'que', sv, f, sc.ptRest].filter(Boolean).join(' '))); });
      const sub = enClause(ch.S, sc.enV, 'pres', sc.enRest, { stative: true })[0].replace(/\.$/, '');
      const subW = enClause(ch.S, sc.enV, 'fut', sc.enRest)[0].replace(/\.$/, '');
      const m = cap(main.en) + ' hope';
      return { pt, en: [`${m} ${lc1(sub)}.`, `${m} that ${lc1(sub)}.`, `${m} ${lc1(subW)}.`], words: sc.words, verbs: ['esperar', sc.inf], focus: { inf: sc.inf, t: 'cpres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S: sc.S, rnd });
  };
  // lower-case a clause start for embedding, but keep I and names: "We hope Miguel…"
  const lc1 = s => (/^(He|She|It|We|They|You|My|Your|His|Her|Our|Their|The|A|An|This|That|These|Those|Some|Maybe|Perhaps)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  T.quero_que = ctx => {
    if (!ctx.K('v:querer')) return null;
    const rnd = ctx.rnd, main = PRON_SUBJ.eu, sc = subClauseSVO(ctx, 'cpres', 0); if (!sc) return null;
    const neg = rnd() < 0.25;
    const realize = ch => {
      const f = vform(sc.inf, 'cpres', ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => { pt.push(finishPT([neg ? 'não' : '', 'quero que', sv, f, sc.ptRest].filter(Boolean).join(' '))); pt.push(finishPT(['eu', neg ? 'não' : '', 'quero que', sv, f, sc.ptRest].filter(Boolean).join(' '))); });
      const o = OBJ_EN[ch.S.en] || ch.S.en;
      return { pt, en: [`I ${neg ? "don't want" : 'want'} ${o} to ${sc.enV}${sc.enRest ? ' ' + sc.enRest : ''}.`], words: sc.words, verbs: ['querer', sc.inf], focus: { inf: sc.inf, t: 'cpres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S: sc.S, rnd });
  };
  T.talvez = ctx => {
    if (!ctx.K('talvez')) return T.espero(ctx);
    const rnd = ctx.rnd, sc = subClauseSVO(ctx, 'cpres', -1); if (!sc) return null;
    const realize = ch => {
      const f = vform(sc.inf, 'cpres', ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT(['talvez', sv, f, sc.ptRest].filter(Boolean).join(' '))));
      const w = enClause(ch.S, sc.enV, 'fut', sc.enRest)[0], pr = enClause(ch.S, sc.enV, 'pres', sc.enRest, { stative: true })[0];
      return { pt, en: ['Maybe ' + lc1(w), 'Perhaps ' + lc1(w), 'Maybe ' + lc1(pr), 'Perhaps ' + lc1(pr)], words: sc.words.concat(['talvez']), verbs: [sc.inf], focus: { inf: sc.inf, t: 'cpres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S: sc.S, rnd });
  };
  // Se eu tivesse tempo, viajava.
  T.se_cimp = ctx => {
    const conds = G.conds.map(s => s.split('|')).filter(([v]) => ctx.K('v:' + v));
    const res = G.results.map(s => s.split('|')).filter(([v]) => ctx.K('v:' + v));
    if (!conds.length || !res.length) return null;
    const rnd = ctx.rnd, [cv, crest, cen] = E.pick(conds, rnd), [rv, rrest, ren] = E.pick(res, rnd);
    const S = E.pick(subjects(ctx, { pronOnly: true }).filter(s => !/senhor/.test(s.pt)), rnd);
    const realize = ch => {
      const p = ch.S.p, cf = vform(cv, 'cimp', p), pt = [];
      const gs = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g];
      gs.forEach(g => {
        const cr = cv === 'ser' && crest === 'rico' ? adjPT('rico', g, ch.S.n) || 'rico' : crest;
        [vform(rv, 'cond', p), vform(rv, 'imp', p)].forEach(rf => ptSubjVariants(ch.S).forEach(sv => {
          pt.push(finishPT(['se', sv, cf, cr].filter(Boolean).join(' ') + ', ' + [rf, rrest].filter(Boolean).join(' ')));
        }));
      });
      const s = ch.S.en, sCap = s === 'I' ? 'I' : s;
      let c = cen; if (/^were /.test(cen) && (ch.S.ep === '1s' || ch.S.ep === '3s')) c = cen;
      const en = [`If ${sCap} ${c}, ${sCap} would ${ren}.`, `If ${sCap} ${c}, ${sCap === 'I' ? "I'd" : sCap + ' would'} ${ren}.`];
      if (/^were /.test(cen) && (ch.S.ep === '1s' || ch.S.ep === '3s')) en.push(`If ${sCap} ${cen.replace(/^were/, 'was')}, ${sCap} would ${ren}.`);
      return { pt, en, words: [], verbs: [cv, rv], focus: { inf: cv, t: 'cimp', p, form: cf } };
    };
    return finalize(realize, { S, rnd });
  };
  // Se tiveres tempo, vamos à praia.
  T.se_cfut = ctx => {
    const conds = G.conds.map(s => s.split('|')).filter(([v, r]) => ctx.K('v:' + v) && /^(ter|poder|querer|chegar)$/.test(v));
    if (!conds.length) return null;
    const rnd = ctx.rnd;
    if (rnd() < 0.25) {
      const w = E.pick([['estiver sol', "it's sunny"], ['chover', 'it rains'], ['estiver frio', "it's cold"]], rnd), r = E.pick([['vamos à praia', "we'll go to the beach"], ['ficamos em casa', "we'll stay at home"], ['vamos ao cinema', "we'll go to the cinema"]], rnd);
      return { pt: cap(`se ${w[0]}, ${r[0]}.`), ptAlt: [], en: `If ${w[1]}, ${r[1]}.`, enAlt: [`If ${w[1]}, ${r[1].replace("we'll", 'we will')}.`], words: [], verbs: [w[0].split(' ')[0] === 'chover' ? 'chover' : 'estar'], focus: { inf: w[0] === 'chover' ? 'chover' : 'estar', t: 'cfut', p: 2, form: w[0].split(' ')[0] } };
    }
    const [cv, crest, , cen] = E.pick(conds, rnd);
    const S = E.pick(subjects(ctx, { pronOnly: true }).filter(s => !/senhor/.test(s.pt)), rnd);
    const res = E.pick([['ir', 'à praia', 'go to the beach'], ['ir', 'ao cinema', 'go to the cinema'], ['jantar', 'fora', 'have dinner out'], ['ficar', 'em casa', 'stay at home'], ['visitar', 'o museu', 'visit the museum']].filter(([v]) => ctx.K('v:' + v)), rnd);
    if (!res) return null;
    const realize = ch => {
      const p = ch.S.p, cf = vform(cv, 'cfut', p), pt = [];
      const rf = vform(res[0], 'pres', p), rf2 = vform('ir', 'pres', p) + ' ' + res[0];
      ptSubjVariants(ch.S).forEach(sv => [rf, rf2].forEach(r => pt.push(finishPT(['se', sv, cf, crest].filter(Boolean).join(' ') + ', ' + [r, res[1]].join(' ')))));
      const s = ch.S.en;
      const condEN = cen === 'can' ? `${ch.S.en} can` : enClause(ch.S, cen.split(' ')[0], 'pres', cen.split(' ').slice(1).join(' '), { stative: true })[0].replace(/\.$/, '');
      return { pt, en: [`If ${lc1(condEN)}, ${s} will ${res[2]}.`, `If ${lc1(condEN)}, ${s === 'I' ? "I'll" : s + "'ll"} ${res[2]}.`, `If ${lc1(condEN)}, ${s} can ${res[2]}.`], words: [], verbs: [cv, res[0]], focus: { inf: cv, t: 'cfut', p, form: cf } };
    };
    return finalize(realize, { S, rnd });
  };
  // Object pronouns
  T.pron_obj = ctx => {
    const opts = [];
    Object.keys(G.frames).filter(v => ctx.K('v:' + v) && !/precisar|gostar|ter|querer/.test(v)).forEach(v => { const fr = frameOf(v); if (fr.flags.bare) return; fr.cls.forEach(c => knownIn(ctx, c).filter(id => !MASSONLY.has(id)).forEach(id => opts.push([v, c, id, fr]))); });
    if (!opts.length) return null;
    const rnd = ctx.rnd, [inf, cls, id, fr] = E.pick(opts, rnd), S = E.pick(subjects(ctx, { pronOnly: true }), rnd);
    const t = rnd() < 0.5 ? 'pres' : 'pret', neg = rnd() < 0.3;
    const x = NP(id, 'def', { n: noun(id).plOnly ? 'pl' : rnd() < 0.3 ? 'pl' : 'sg' });
    const pron = (x.g === 'f' ? 'a' : 'o') + (x.n === 'pl' ? 's' : '');
    const enP = x.enN === 'pl' ? 'them' : 'it';
    let enV = fr.flags[cls] || fr.en; if (cls === 'show' && fr.flags.show) enV = fr.flags.show;
    const realize = ch => {
      const f = vform(inf, t, ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, neg ? 'não ' + pron + ' ' + f : enclitic(f, pron)].filter(Boolean).join(' '))));
      return { pt, en: enClause(ch.S, enV, t, enP, { neg, stative: true }), words: [id], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f }, context: cap(x.pt) + '?' };
    };
    const it = finalize(realize, { S, rnd });
    if (it) it.context = cap(x.pt) + '…';
    return it;
  };
  T.pron_ind = ctx => {
    const vs = ['dar', 'mostrar', 'emprestar', 'oferecer', 'trazer', 'levar'].filter(v => ctx.K('v:' + v));
    const things = knownIn(ctx, 'thing').concat(knownIn(ctx, 'readable')).filter(id => !noun(id).plOnly);
    if (!vs.length || !things.length) return null;
    const rnd = ctx.rnd, inf = E.pick(vs, rnd), id = E.pick(things, rnd), S = E.pick(subjects(ctx, { pronOnly: true }).filter(s => s.p !== 3), rnd);
    const to = E.pick([['me', 'me'], ['lhe', 'him'], ['lhe', 'her'], ['nos', 'us'], ['te', 'you']].filter(o => !(o[0] === 'me' && S.p === 0) && !(o[0] === 'te' && S.p === 1) && !(o[0] === 'nos' && S.p === 3)), rnd);
    const x = NP(id, 'def'), neg = rnd() < 0.25, t = rnd() < 0.5 ? 'pres' : 'pret';
    const enV = { dar: 'give', mostrar: 'show', emprestar: 'lend', oferecer: 'give', trazer: 'bring', levar: 'take' }[inf];
    const realize = ch => {
      const f = vform(inf, t, ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, neg ? 'não ' + to[0] + ' ' + f : enclitic(f, to[0]), x.pt].filter(Boolean).join(' '))));
      return { pt, en: enClause(ch.S, enV, t, `${to[1]} ${x.en}`, { neg, stative: true }).concat(enClause(ch.S, enV, t, `${x.en} to ${to[1]}`, { neg, stative: true })), words: [id], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };

  /* ---------------- Public API ---------------- */
  function make(tpl, ctx) {
    const fn = T[tpl]; if (!fn) return null;
    for (let i = 0; i < 4; i++) {
      try { const r = fn(ctx); if (r && /^(Do|Does|Did|Am|Will|Have|Has|Was) I\b/.test(r.en)) continue; if (r && r.pt && r.en) { r.tpl = tpl; r.ptAlt = (r.ptAlt || []).filter(x => x !== r.pt); return r; } } catch (e) { if (ctx.debug) throw e; }
    }
    return null;
  }
  // Parse a hand-written sentence line: "2: PT / alt | EN / alt"
  function parseSent(line) {
    const m = line.match(/^\s*(\d)\s*:\s*(.*)$/); const lesson = m ? +m[1] : 0; const body = m ? m[2] : line;
    const [ptPart, enPart] = body.split('|').map(s => s.trim());
    const pts = ptPart.split(' / ').map(s => s.trim()); const ens = (enPart || '').split(' / ').map(s => s.trim());
    const focus = [];
    const strip = s => s.replace(/\{([^}]+)\}/g, (_, w) => { focus.push(w); return w; });
    const pt = strip(pts[0]); pts.slice(1).forEach(s => s.replace(/\{([^}]+)\}/g, (_, w) => w));
    return { lesson, pt, raw: pts[0], ptAlt: pts.slice(1).map(s => s.replace(/\{([^}]+)\}/g, '$1')), en: ens[0], enAlt: ens.slice(1), blanks: focus };
  }

  return { load, make, T, NP, noun, adjForms, adjPT, enNoun, enPl, numPT, numEN, ctr, enclitic, parseSent, LEX, VERBS, PRON_SUBJ, nounClasses, clean, aAn, ptPlural };
});
