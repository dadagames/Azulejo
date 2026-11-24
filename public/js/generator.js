/* Azulejo · sentence generator.
   Builds fresh Portuguese sentences (with accepted alternatives) and a Dutch translation
   from the words a learner already knows. The Dutch is shown, never graded. Browser: window.PTG · Node: module.exports */
(function (root, factory) {
  var api = factory(typeof PTE !== 'undefined' ? PTE : require('./engine.js'));
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PTG = api;
})(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';
  const csv = s => (s || '').split(',').map(x => x.trim()).filter(Boolean);
  const cap = E.cap;

  /* ---------------- Lexicon ---------------- */
  const LEX = new Map(); const VERBS = new Map(); let G = null; const CLS = {}; let MASS, MASSONLY, PLOK, PETS, PAIRS, NLSG, NLPLONLY;
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
    MASS = new Set(csv(gen.mass)); MASSONLY = new Set(csv(gen.massOnly)); PLOK = new Set(csv(gen.plOk)); PETS = new Set(csv(gen.pets));
    NLSG = new Set(csv(gen.nlSg)); NLPLONLY = new Set(csv(gen.nlPlOnly));
    G.advList = gen.advs.map(s => { const [id, nl, pos, vs, ts] = s.split('|'); return { id, nl, pos, verbs: vs === '*' ? null : new Set(csv(vs)), tenses: !ts || ts === '*' ? null : new Set(csv(ts)) }; });
    G.reflexList = gen.reflex.map(s => { const [inf, nl, comp, fl] = s.split('|'); return { inf, nl, comp: csv(comp), refl: /refl/.test(fl || '') }; });
    G.placeList = gen.places.map(s => { const [id, at, to, np, fl] = s.split('|'); return { id, at, to, np, bare: /bare/.test(fl || ''), para: /para/.test(fl || '') }; });
    G.adjList = gen.adjs.map(s => { const [id, cop, cl, nl] = s.split('|'); const [b, a, c] = nl.split('/'); return { id, cop, cls: csv(cl), nl: b, nlA: a || b, nlC: c }; });
    G.nameList = gen.names.split(',').map(s => { const [pt, en, g] = s.trim().split('|'); return { pt, en, g }; });
    loadNL(gen);
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

  /* ---------------- Numbers ---------------- */
  const clean = s => String(s || '').split(/[;,]/)[0].replace(/\s*\([^)]*\)/g, '').trim();
  const NUM_PT = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezasseis', 'dezassete', 'dezoito', 'dezanove'];
  const TENS_PT = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const NUM_NL = ['nul', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
  const TENS_NL = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];
  function numPT(n, g) {
    const fem = w => (g === 'f' ? w.replace(/^um$/, 'uma').replace(/^dois$/, 'duas') : w);
    if (n < 20) return fem(NUM_PT[n]);
    if (n < 100) { const t = Math.floor(n / 10), u = n % 10; return TENS_PT[t] + (u ? ' e ' + fem(NUM_PT[u]) : ''); }
    if (n === 100) return 'cem';
    return String(n);
  }
  // Dutch numbers: eenentwintig, tweeëntwintig; "één" when it stands alone (één uur, één euro)
  function numNL(n, alone) {
    if (n === 1 && alone) return 'één';
    if (n < 20) return NUM_NL[n];
    if (n < 100) { const t = Math.floor(n / 10), u = n % 10; if (!u) return TENS_NL[t]; const uw = NUM_NL[u]; return uw + (/e$/.test(uw) ? 'ën' : 'en') + TENS_NL[t]; }
    if (n === 100) return 'honderd';
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

  /* ---------------- Dutch: words ---------------- */
  // plural of a Dutch noun: overrides first, then the spelling rules (boom → bomen, kat → katten, huis → huizen, tafel → tafels, auto → auto's)
  function nlPlural(w) {
    if (G.nlPl[w]) return G.nlPl[w];
    const parts = w.split(' ');
    if (parts.length > 1) { const last = parts.pop(); return parts.concat(nlPlural(last)).join(' '); }
    if (/(ei|ij|ui)$/.test(w)) return w + 'en';
    if (/(je|é)$/.test(w) || /[^aeiou]e$/.test(w) || /[^aeiou](el|em|en|er)$/.test(w) || /ee$|ie$/.test(w)) return w + 's';
    if (/[aiouy]$/.test(w)) return w + "'s";
    const m = w.match(/^(.*?)([aeiouy]+)([^aeiouy]+)$/);
    if (!m) return w + 'en';
    const [, pre, V, C] = m;
    const voice = c => (c === 'f' ? 'v' : c === 's' ? 'z' : c);
    if (C.length > 1) return w + 'en';
    if (/^(aa|ee|oo|uu)$/.test(V)) return pre + V[0] + voice(C) + 'en';
    if (V.length === 1) return pre + V + C + C + 'en';
    return pre + V + voice(C) + 'en';
  }
  // the Dutch for a noun: article (de/het), singular and plural
  function nlNoun(id, g) {
    const e = LEX.get(id); if (!e) return null;
    const raw = (g === 'f' && G.nlF[id]) || G.nlN[id] || clean(e.en);
    const m = raw.match(/^(de|het) (.+)$/);
    const art = m ? m[1] : null, w = m ? m[2] : raw;
    const N = noun(id);
    const sgOnly = NLSG.has(id), plOnly = NLPLONLY.has(id) || (!!N && N.plOnly && !sgOnly);
    return { art, w, pl: plOnly ? w : nlPlural(w), sgOnly, plOnly };
  }
  const bareNL = id => { const D = nlNoun(id); return D ? D.w : id; };
  // the comparative: groot → groter, duur → duurder, goed → beter
  const nlComp = a => a.nlC || (/r$/.test(a.nl) ? a.nl + 'der' : /en$/.test(a.nlA) ? a.nl + 'er' : a.nlA + 'r');

  /* ---------------- Dutch: verbs and clauses ---------------- */
  const NLV = new Map();
  // present of the irregular ones: ik, jij, jij after the verb, u, hij/zij, plural
  const NL_PRES = {
    zijn: ['ben', 'bent', 'ben', 'bent', 'is', 'zijn'], hebben: ['heb', 'hebt', 'heb', 'heeft', 'heeft', 'hebben'], kunnen: ['kan', 'kunt', 'kun', 'kunt', 'kan', 'kunnen'],
    willen: ['wil', 'wilt', 'wil', 'wilt', 'wil', 'willen'], zullen: ['zal', 'zult', 'zul', 'zult', 'zal', 'zullen'], mogen: ['mag', 'mag', 'mag', 'mag', 'mag', 'mogen'],
    houden: ['hou', 'houdt', 'hou', 'houdt', 'houdt', 'houden'],
  };
  const NL_IDX = { '1s': 0, '2s': 1, '2u': 3, '3s': 4 };
  const isPlNL = np => /^(1p|2p|3p)$/.test(np);
  function loadNL(gen) {
    NLV.clear();
    for (const inf in gen.nlVerbs) {
      const toks = gen.nlVerbs[inf].split(' '); const v = { inf, stem: toks[0], prt: '' };
      toks.slice(1).forEach(t => {
        const i = t.indexOf('='), k = i < 0 ? t : t.slice(0, i), val = i < 0 ? true : t.slice(i + 1).replace(/_/g, ' ');
        if (k === 'p') { const [a, b] = val.split('/'); v.past = a; v.pastPl = b; } else v[k] = val;
      });
      v.prtAfter = !!v.prt && !inf.startsWith(v.prt);
      v.base = v.prt && !v.prtAfter ? inf.slice(v.prt.length) : inf.split(' ')[0];
      // weak verbs: 't kofschip decides between -te and -de (from the consonant in the infinitive: reizen → reisde)
      const c = v.base.replace(/en$/, '').slice(-1);
      const suf = /[tkfschp]/.test(c) ? 't' : 'd';
      if (!v.past) { v.past = v.stem + suf + 'e'; v.pastPl = v.stem + suf + 'en'; }
      if (!v.pp) v.pp = 'ge' + v.stem + (/[td]$/.test(v.stem) ? '' : suf);
      NLV.set(inf, v);
    }
  }
  function nlVerb(key) { const v = NLV.get(key); if (!v) throw new Error('no Dutch verb: ' + key); return v; }
  // "kijken naar" = the verb kijken + the preposition naar before the object
  function nlSplit(key) {
    if (NLV.has(key)) return [key, null];
    const m = key.match(/^(.+) (naar|op|van|aan|met|voor)$/);
    return m && NLV.has(m[1]) ? [m[1], m[2]] : [key, null];
  }
  function nlFin(v, t, np, inv) {
    if (t === 'past') return isPlNL(np) ? v.pastPl : v.past;
    if (isPlNL(np)) return v.base;
    const i = np === '2s' && inv ? 2 : NL_IDX[np];
    const tab = NL_PRES[v.base];
    if (tab) return tab[i];
    return i === 0 || i === 2 ? v.stem : (/t$/.test(v.stem) ? v.stem : /[^a]a$/.test(v.stem) ? v.stem + 'at' : v.stem + 't');
  }
  const nlPP = v => (v.prt && !v.prtAfter ? v.prt : '') + v.pp;
  const NL_REFL = { '1s': 'me', '2s': 'je', '2u': 'zich', '3s': 'zich', '1p': 'ons', '2p': 'je', '3p': 'zich' };
  // A Dutch clause. S = subject {nl, nlInv, np}; key = Dutch verb; o = {
  //   t: pres | past | perf | fut | cond | irinf | prog | mod, mod: modal verb, neg, q, front: words before the verb (inversion),
  //   sub: conjunction (subordinate order), after: words after the verb in a subordinate clause, refl,
  //   mid: [{nl, k, geen}] the middle of the sentence in order; k = refl pron time obj adv pp pred graag freq; geen = the form with "geen" }
  function nlRaw(S, key, o) {
    o = o || {};
    const v = nlVerb(key);
    let t = o.t || 'pres';
    if (t === 'perf' && v.sp) t = 'past';
    let F = v, R = v.prt.trim(), ft = 'pres';
    if (t === 'past') ft = 'past';
    else if (t === 'perf') { F = nlVerb(v.z ? 'zijn' : 'hebben'); R = nlPP(v); }
    else if (t === 'fut') { F = nlVerb('zullen'); R = v.inf; }
    else if (t === 'cond') { F = nlVerb('zullen'); R = v.inf; ft = 'past'; }
    else if (t === 'irinf') { F = nlVerb('gaan'); R = v.inf; }
    else if (t === 'prog') { F = nlVerb('zijn'); R = 'aan het ' + v.inf; }
    else if (t === 'mod') { const m = o.neg && o.mod === 'moeten' ? 'hoeven' : o.mod; F = nlVerb(m); R = (m === 'hoeven' ? 'te ' : '') + v.inf; }
    const mid = [];
    if (o.refl) mid.push({ nl: NL_REFL[S.np], k: 'refl' });
    (o.mid || []).forEach(p => { if (p && p.nl) mid.push(Object.assign({}, p)); });
    if (o.neg) {
      const gi = mid.findIndex(p => p.k === 'graag'), ni = mid.findIndex(p => p.geen);
      if (gi >= 0) mid.splice(gi, 0, { nl: 'niet', k: 'neg' });
      else if (v.neg === 'geen' && R && !mid.some(p => p.k === 'adv')) R = 'geen ' + R;
      else if (ni >= 0) mid[ni].nl = mid[ni].geen;
      else { const i = mid.findIndex(p => /^(adv|pp|pred)$/.test(p.k)); mid.splice(i < 0 ? mid.length : i, 0, { nl: 'niet', k: 'neg' }); }
    }
    if (o.q && o.front) { mid.unshift({ nl: o.front.replace(/,$/, ''), k: 'time' }); o = Object.assign({}, o, { front: null }); }
    const inv = !!(o.q || o.front);
    const fin = nlFin(F, ft, S.np, inv && !o.sub);
    const M = mid.map(p => p.nl);
    let words;
    if (o.sub) {
      let cluster;
      if (t === 'pres' || t === 'past') cluster = !R ? fin : (v.prt && !/ $/.test(v.prt) && !v.prtAfter && R === v.prt ? R + fin : R + ' ' + fin);
      else cluster = fin + ' ' + R;
      words = [o.sub, S.nl].concat(M, [cluster, o.after]);
    } else if (o.q) words = [fin, S.nlInv || S.nl].concat(M, [R]);
    else if (o.front) words = [o.front, fin, S.nlInv || S.nl].concat(M, [R]);
    else words = [S.nl, fin].concat(M, [R]);
    return words.filter(Boolean).join(' ').replace(/\s+/g, ' ').replace(/\ber (naar|op|van)\b/g, 'er$1').trim();
  }
  const finishNL = (s, q) => { let t = String(s).replace(/\s+/g, ' ').trim(); t = cap(t); if (!/[.!?]$/.test(t)) t += q ? '?' : '.'; return t; };
  const nlClause = (S, key, o) => finishNL(nlRaw(S, key, o), o && o.q);
  // the Dutch tense for a Portuguese one
  const NLT = { pres: 'pres', pret: 'perf', imp: 'past', fut: 'fut', cond: 'cond', irinf: 'irinf', prog: 'prog', cpres: 'pres' };
  // an object as a part of the Dutch sentence
  const nlObj = (x, prep) => (prep ? { nl: prep + ' ' + x.nl, k: 'pp' } : { nl: x.nl, k: 'obj', geen: x.nlGeen });
  // the Dutch verb and object for a frame: { key, part }
  function nlFrame(fr, cls, id, obj) {
    const [key, prep] = nlSplit(fr.flags[cls] || fr.flags[id] || fr.en);
    if (fr.flags.bare) { const w = bareNL(id); return { key, part: prep ? { nl: prep + ' ' + w, k: 'pp' } : { nl: w, k: 'obj', geen: 'geen ' + w } }; }
    return { key, part: nlObj(obj, prep) };
  }

  /* ---------------- Subjects ---------------- */
  const PRON_SUBJ = {
    eu: { pt: 'eu', en: 'I', nl: 'ik', np: '1s', ep: '1s', p: 0, g: '?', n: 'sg', drop: true },
    tu: { pt: 'tu', en: 'you', nl: 'jij', nlInv: 'je', np: '2s', ep: '2', p: 1, g: '?', n: 'sg', drop: true, hint: 'tu' },
    ele: { pt: 'ele', en: 'he', nl: 'hij', np: '3s', ep: '3s', p: 2, g: 'm', n: 'sg' },
    ela: { pt: 'ela', en: 'she', nl: 'zij', np: '3s', ep: '3s', p: 2, g: 'f', n: 'sg' },
    'o senhor': { pt: 'o senhor', en: 'you', nl: 'u', np: '2u', ep: '2', p: 2, g: 'm', n: 'sg', hint: 'formal' },
    'a senhora': { pt: 'a senhora', en: 'you', nl: 'u', np: '2u', ep: '2', p: 2, g: 'f', n: 'sg', hint: 'formal' },
    você: { pt: 'você', en: 'you', nl: 'u', np: '2u', ep: '2', p: 2, g: '?', n: 'sg', hint: 'você' },
    nós: { pt: 'nós', en: 'we', nl: 'wij', np: '1p', ep: '1p', p: 3, g: '?', n: 'pl', drop: true },
    vocês: { pt: 'vocês', en: 'you', nl: 'jullie', np: '2p', ep: '2', p: 5, g: '?', n: 'pl', hint: 'plural' },
    eles: { pt: 'eles', en: 'they', nl: 'zij', np: '3p', ep: '3p', p: 5, g: 'm', n: 'pl' },
    elas: { pt: 'elas', en: 'they', nl: 'zij', np: '3p', ep: '3p', p: 5, g: 'f', n: 'pl' },
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
      G.nameList.forEach(nm => out.push({ pt: nm.pt, en: nm.en, nl: nm.en, np: '3s', ep: '3s', p: 2, g: nm.g, n: 'sg', name: true }));
      if (K('meu')) csv(G.family).forEach(f => {
        const N = noun(f); if (!N || !K(f)) return;
        const pl = N.plOnly || f === 'pais' || f === 'avós';
        const g = N.g;
        const det = pl ? (g === 'f' ? 'as minhas' : 'os meus') : (g === 'f' ? 'a minha' : 'o meu');
        const D = nlNoun(f);
        out.push({ pt: det + ' ' + (pl ? N.pl : N.sg), nl: 'mijn ' + (pl ? D.pl : D.w), np: pl ? '3p' : '3s', ep: pl ? '3p' : '3s', p: pl ? 5 : 2, g, n: pl ? 'pl' : 'sg', poss: true, words: [f, 'meu'] });
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
  // a noun phrase as a subject
  const npSubj = (x, words) => ({ pt: x.pt, nl: x.nl, np: x.nlN === 'pl' ? '3p' : '3s', ep: x.n === 'pl' ? '3p' : '3s', p: x.n === 'pl' ? 5 : 2, g: x.g, n: x.n, words: words || [x.id] });

  /* ---------------- Noun phrases ---------------- */
  function NP(id, det, o) {
    o = o || {};
    const N = noun(id); if (!N) return null;
    let n = o.n || (N.plOnly ? 'pl' : 'sg');
    if (N.plOnly) n = 'pl';
    let g = N.g, word = n === 'pl' ? N.pl : N.sg;
    if (o.g === 'f' && N.fem) { g = 'f'; word = n === 'pl' ? ptPlural(N.fem) : N.fem; }
    else if (N.mf && o.g) g = o.g;
    const art = { m: { sg: 'o', pl: 'os' }, f: { sg: 'a', pl: 'as' } }[g][n];
    // Dutch
    const D = nlNoun(id, g);
    const [k, arg] = det.split(':');
    const nn = k === 'num' ? (+arg === 1 ? 'sg' : 'pl') : D.sgOnly ? 'sg' : D.plOnly ? 'pl' : n;
    const dw = nn === 'pl' ? D.pl : D.w;
    const hetSg = D.art === 'het' && nn === 'sg';
    let pt, nl, nlD, nlGeen = null; const alts = [];
    switch (k) {
      case 'def': pt = art + ' ' + word; nlD = nn === 'pl' ? 'de' : (D.art || 'de'); break;
      case 'indef':
        pt = (n === 'pl' ? (g === 'f' ? 'umas' : 'uns') : (g === 'f' ? 'uma' : 'um')) + ' ' + word;
        nlD = nn === 'sg' ? 'een' : ''; nlGeen = 'geen ' + dw;
        break;
      case 'bare': pt = word; nlD = ''; nlGeen = 'geen ' + dw; break;
      case 'poss': {
        const P = { meu: ['meu', 'minha', 'mijn'], teu: ['teu', 'tua', 'jouw'], nosso: ['nosso', 'nossa', hetSg ? 'ons' : 'onze'] }[arg];
        const pw = g === 'f' ? P[1] : P[0];
        pt = art + ' ' + pw + (n === 'pl' ? 's' : '') + ' ' + word; nlD = P[2];
        alts.push(pw + (n === 'pl' ? 's' : '') + ' ' + word);
        break;
      }
      case 'of': pt = art + ' ' + word + ' ' + arg; nlD = { dele: 'zijn', dela: 'haar', deles: 'hun', delas: 'hun' }[arg]; break;
      case 'dem': {
        const Dm = { este: ['este', 'esta', 'estes', 'estas'], esse: ['esse', 'essa', 'esses', 'essas'], aquele: ['aquele', 'aquela', 'aqueles', 'aquelas'] }[arg];
        const i = (g === 'f' ? 1 : 0) + (n === 'pl' ? 2 : 0);
        pt = Dm[i] + ' ' + word;
        nlD = arg === 'este' ? (hetSg ? 'dit' : 'deze') : (hetSg ? 'dat' : 'die');
        if (arg === 'esse') alts.push(['aquele', 'aquela', 'aqueles', 'aquelas'][i] + ' ' + word);
        if (arg === 'aquele') alts.push(['esse', 'essa', 'esses', 'essas'][i] + ' ' + word);
        break;
      }
      case 'num': { const x = +arg; pt = numPT(x, g) + ' ' + word; nlD = numNL(x); nlGeen = 'geen ' + nlD + ' ' + dw; break; }
      default: return null;
    }
    nl = [nlD, dw].filter(Boolean).join(' ');
    return { id, pt, nl, nlD, nlW: dw, nlGeen, nlN: nn, hetSg, det: k, g, n, alts, words: [id] };
  }
  // a noun phrase with an adjective in Dutch: een groot huis, het grote huis, grote huizen
  const nlNPAdj = (x, a) => [x.nlD, (x.det === 'indef' || x.det === 'bare') && x.hetSg ? a.nl : a.nlA, x.nlW].filter(Boolean).join(' ');
  function pickDet(id, ctx, allowBare) {
    const r = ctx.rnd, opts = ['def', 'def', 'indef'];
    if (MASSONLY.has(id)) return r() < 0.6 && allowBare ? 'bare' : 'def';
    if (ctx.K('meu') && r() < 0.2) return 'poss:' + E.pick(['meu', 'teu', 'nosso'], r);
    if (ctx.K('este') && r() < 0.15) return 'dem:' + E.pick(['este', 'esse', 'aquele'], r);
    if (allowBare && MASS.has(id) && r() < 0.35) return 'bare';
    return E.pick(opts, r);
  }

  /* ---------------- Portuguese clauses ---------------- */
  function vform(inf, t, p) { return E.form(inf, t, p); }
  const finishEN = s => cap(String(s).replace(/\s+/g, ' ').trim());
  const LC_PT = /^(Eu|Tu|Ele|Ela|Nós|Vós|Eles|Elas|Vocês|Você|O|A|Os|As|Não|Um|Uma|Nunca|Já|Também)\b/;
  const isName = w => (G && (G.nameList.some(n => n.en === w) || csv(G.cities).includes(w)));
  const lcPT = x => { const w = x.split(' ')[0].replace(/[,.?!]/g, ''); return isName(w) ? x : x.charAt(0).toLowerCase() + x.slice(1); };
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
  function frameOf(inf) {
    const f = G.frames[inf]; if (!f) return null;
    const [cl, en, fl] = f.split('|');
    const flags = {}; csv(fl || '').forEach(x => { const i = x.indexOf('='); if (i > 0) flags[x.slice(0, i)] = x.slice(i + 1); else flags[x] = true; });
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
  const adjNL = a => a.nl;

  /* ---------------- Templates ---------------- */
  const T = {};

  // translate a noun phrase: o gato / de kat
  T.np = ctx => {
    const pool = new Set(['thing', 'animal', 'food', 'drink', 'clothes', 'place', 'house', 'transport', 'press'].flatMap(c => [...(CLS[c] || [])]).concat(csv(G.family), csv(G.profs)));
    const ids = [...pool].filter(id => ctx.K(id) && LEX.has(id) && /^(m|f|mf)$/.test(LEX.get(id).type) && !MASSONLY.has(id));
    if (!ids.length) return null;
    const id = E.pick(ids, ctx.rnd), r = ctx.rnd();
    const det = r < 0.45 ? 'def' : r < 0.8 ? 'indef' : 'num:' + (2 + Math.floor(ctx.rnd() * 3));
    const n = det.startsWith('num') ? 'pl' : (PLOK.has(id) && ctx.rnd() < 0.35 ? 'pl' : 'sg');
    const x = NP(id, det, { n, g: ctx.rnd() < 0.5 ? 'f' : 'm' }); if (!x) return null;
    return { pt: cap(x.pt), ptAlt: x.alts.map(cap), en: cap(x.nl), enAlt: [], words: [id], kind: 'np' };
  };
  // Isto é um livro.
  T.isto = ctx => {
    if (!ctx.K('isto')) return null;
    const ids = knownIn(ctx, 'thing').concat(knownIn(ctx, 'animal'));
    if (!ids.length) return null;
    const x = NP(E.pick(ids, ctx.rnd), 'indef'); if (!x || x.n === 'pl') return null;
    const q = ctx.rnd() < 0.3;
    return { pt: finishPT('isto é ' + x.pt, q), ptAlt: [], en: q ? `Is dit ${x.nl}?` : `Dit is ${x.nl}.`, enAlt: [], words: ['isto', x.id] };
  };
  // Há dois gatos.
  T.ha = ctx => {
    if (!ctx.K('há')) return null;
    const ids = knownIn(ctx, 'thing').concat(knownIn(ctx, 'animal'));
    if (!ids.length) return null;
    const id = E.pick(ids, ctx.rnd), N = noun(id);
    const num = N.plOnly ? 0 : 1 + Math.floor(ctx.rnd() * 3);
    const x = num <= 1 ? NP(id, 'indef') : NP(id, 'num:' + num, { n: 'pl' });
    return { pt: finishPT('há ' + x.pt), ptAlt: [], en: `Er ${x.nlN === 'pl' ? 'zijn' : 'is'} ${x.nl}.`, enAlt: [], words: ['há', id] };
  };
  // Ela é portuguesa.
  T.ser_nat = ctx => {
    const nats = csv(G.nats).filter(ctx.K); if (!nats.length) return null;
    const S = E.pick(subjects(ctx, { pronOnly: ctx.rnd() < 0.6 }), ctx.rnd), nat = E.pick(nats, ctx.rnd), neg = ctx.rnd() < 0.2, q = !neg && ctx.rnd() < 0.25;
    const nlNat = clean(LEX.get(nat).en);
    const realize = ch => {
      const g = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g];
      const pt = [];
      g.forEach(gg => ptClause(ch.S, vform('ser', 'pres', ch.S.p), adjPT(nat, gg, ch.S.n), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: [nlClause(ch.S, 'zijn', { neg, q, mid: [{ nl: nlNat, k: 'pred' }] })], words: [nat], verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: ch.S.p, form: vform('ser', 'pres', ch.S.p) } };
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
      const w = nlNoun(id, ch.S.g === 'f' ? 'f' : 'm').w;
      return { pt, en: [nlClause(ch.S, 'zijn', { neg, q, mid: [{ nl: w, k: 'pred', geen: 'geen ' + w }] })], words: [id], verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: ch.S.p, form: vform('ser', 'pres', ch.S.p) } };
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
    let obj;
    if (fr.flags.bare) obj = { pt: LEX.get(id).pt, words: [id], alts: [] };
    else {
      let det = pickDet(id, ctx, inf !== 'ter' || MASS.has(id));
      if (det === 'poss:teu' && (S.ep === '2' && S.p !== 1)) det = 'def';
      let n = PAIRS.has(id) || (PLOK.has(id) && rnd() < 0.25) ? 'pl' : undefined;
      if (tense === 'imp') { if (MASS.has(id)) det = 'bare'; else if (PLOK.has(id)) { det = 'bare'; n = 'pl'; } else det = 'def'; }
      obj = NP(id, det, { n });
      if (!obj) return null;
    }
    const D = nlFrame(fr, cls, id, obj);
    const cueList = (G.cues[t === 'pres' && tense === 'irinf' ? 'irinf' : t] || []);
    const cue = (t !== 'pres' || rnd() < 0.3) && cueList.length && rnd() < 0.7 ? E.pick(cueList, rnd).split('|') : null;
    const start = cue && cue[2] === 'start';
    const realize = ch => {
      const p = ch.S.p;
      const objPT = fr.flags.de ? ctrAlts('de', obj.pt) : [obj.pt];
      let forms;
      if (t === 'prog') forms = [vform('estar', 'pres', p) + ' a ' + inf];
      else if (t === 'irinf') forms = [vform('ir', 'pres', p) + ' ' + inf];
      else forms = [vform(inf, t, p)];
      const pt = [];
      forms.forEach(f => objPT.concat(obj.alts && !fr.flags.de ? obj.alts : []).forEach(op => {
        const rest = [op, cue && !start ? cue[0] : ''].filter(Boolean).join(' ');
        ptClause(ch.S, f, rest, { neg, q }).forEach(x => pt.push(start ? finishPT(cue[0] + ', ' + lcPT(x), q) : x));
      }));
      const nl = nlClause(ch.S, D.key, { t: NLT[t], neg, q, front: start ? cue[1] : null, mid: [cue && !start ? { nl: cue[1], k: 'time' } : null, D.part] });
      const focusInf = t === 'prog' ? 'estar' : t === 'irinf' ? 'ir' : inf;
      return { pt, en: [nl], words: [id], verbs: [inf], focus: { inf: focusInf, t: t === 'prog' || t === 'irinf' ? 'pres' : t, p, form: forms[0].split(' ')[0] } };
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
    const pre = A.pos === 'pre' || A.pos === 'post';
    const neg = !pre && rnd() < 0.15, q = !neg && !pre && rnd() < 0.15;
    const advPT = LEX.get(A.id).pt;
    const advNL = { nl: inf === 'trabalhar' && A.id === 'muito' ? 'hard' : A.nl, k: A.id === 'hoje' ? 'time' : pre ? 'freq' : 'adv' };
    const realize = ch => {
      const f = vform(inf, tense, ch.S.p);
      const pt = [];
      if (A.pos === 'pre') ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, advPT, f].filter(Boolean).join(' '))));
      else if (A.pos === 'post') { ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, f, advPT].filter(Boolean).join(' ')))); ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, advPT, f].filter(Boolean).join(' ')))); }
      else ptClause(ch.S, f, advPT, { neg, q }).forEach(x => pt.push(x));
      return { pt, en: [nlClause(ch.S, G.iv[inf], { t: NLT[tense], neg, q, mid: [advNL] })], words: [A.id], verbs: [inf], focus: { inf, t: tense, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };

  // Falo português.
  T.sv_lang = ctx => {
    const langs = csv(G.cls.language).filter(ctx.K);
    const verbs = ['falar', 'estudar', 'aprender'].filter(v => ctx.K('v:' + v));
    if (!langs.length || !verbs.length) return null;
    const rnd = ctx.rnd, inf = E.pick(verbs, rnd), lang = E.pick(langs, rnd), S = E.pick(subjects(ctx), rnd);
    const neg = rnd() < 0.2, q = !neg && rnd() < 0.25, t = ctx.tense || 'pres';
    const key = { falar: 'spreken', estudar: 'studeren', aprender: 'leren' }[inf], w = bareNL(lang);
    const realize = ch => {
      const f = vform(inf, t, ch.S.p);
      return { pt: ptClause(ch.S, f, LEX.get(lang).pt, { neg, q }), en: [nlClause(ch.S, key, { t: NLT[t], neg, q, mid: [{ nl: w, k: 'obj', geen: 'geen ' + w }] })], words: [lang], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } };
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
    const key = { morar: 'wonen', viver: 'wonen', trabalhar: 'werken', estudar: 'studeren' }[inf];
    const realize = ch => { const f = vform(inf, t, ch.S.p); return { pt: ptClause(ch.S, f, ptLoc, { neg, q }), en: [nlClause(ch.S, key, { t: NLT[t], neg, q, mid: [{ nl: 'in ' + clean(C.en), k: 'pp' }] })], words: [city], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } }; };
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
    // Dutch: "houden van" for things in general, "lekker / leuk vinden" for something specific or a past experience
    const tasty = CLS.food.has(id) || CLS.drink.has(id) ? 'lekker' : 'leuk';
    const useVinden = specific || t === 'pret';
    const realize = ch => {
      const f = vform('gostar', t, ch.S.p);
      const pt = [];
      ctrAlts('de', obj.pt).forEach(op => ptClause(ch.S, f, (muito ? 'muito ' : '') + op, { neg, q }).forEach(x => pt.push(x)));
      const nlT = t === 'pret' ? 'past' : NLT[t];
      const nl = useVinden
        ? nlClause(ch.S, 'vinden', { t: nlT, neg, q, mid: [{ nl: obj.nl, k: 'obj' }, { nl: (muito ? 'erg ' : '') + tasty, k: 'pred' }] })
        : nlClause(ch.S, 'houden', { t: nlT, neg, q, mid: [muito ? { nl: 'erg', k: 'adv' } : null, { nl: 'van ' + obj.nl, k: 'pp' }] });
      return { pt, en: [nl], words: [id], verbs: ['gostar'], focus: { inf: 'gostar', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Queria / quero um café.
  T.querer = ctx => {
    if (!ctx.K('v:querer')) return null;
    const ids = knownIn(ctx, 'orderable');
    if (!ids.length) return null;
    const rnd = ctx.rnd, id = E.pick(ids, rnd);
    const x = MASSONLY.has(id) ? NP(id, 'bare') : NP(id, 'indef');
    if (rnd() < 0.5) {
      const pl = rnd() < 0.5 ? ', se faz favor' : '';
      return { pt: cap('queria ' + x.pt + pl + '.'), ptAlt: [cap('quero ' + x.pt + pl + '.')], en: `Ik wil graag ${x.nl}${pl ? ', alstublieft' : ''}.`, enAlt: [], words: [id], verbs: ['querer'], focus: { inf: 'querer', t: 'imp', p: 0, form: 'queria' } };
    }
    const S = E.pick(subjects(ctx), rnd), q = rnd() < 0.4, neg = !q && rnd() < 0.2;
    const realize = ch => { const f = vform('querer', 'pres', ch.S.p); return { pt: ptClause(ch.S, f, x.pt, { neg, q }), en: [nlClause(ch.S, 'willen', { neg, q, mid: [nlObj(x)] })], words: [id], verbs: ['querer'], focus: { inf: 'querer', t: 'pres', p: ch.S.p, form: f } }; };
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
    const realize = ch => { const f = vform('ter', 'pres', ch.S.p); return { pt: ptClause(ch.S, f, x.pt, { neg, q }), en: [nlClause(ch.S, 'hebben', { neg, q, mid: [nlObj(x)] })], words: [id, numPT(n)], verbs: ['ter'], focus: { inf: 'ter', t: 'pres', p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  // Tenho vinte anos.
  T.idade = ctx => {
    if (!ctx.K('v:ter') || !ctx.K('ano')) return null;
    const nums = []; for (let i = 2; i <= 99; i++) { const w = numPT(i).split(' '); if (w.every(x => x === 'e' || ctx.K(x))) nums.push(i); }
    if (!nums.length) return null;
    const rnd = ctx.rnd, n = E.pick(nums, rnd), S = E.pick(subjects(ctx), rnd);
    const realize = ch => { const f = vform('ter', 'pres', ch.S.p); return { pt: ptClause(ch.S, f, numPT(n) + ' anos'), en: [nlClause(ch.S, 'zijn', { mid: [{ nl: numNL(n) + ' jaar', k: 'pred' }] })], words: ['ano'], verbs: ['ter'], focus: { inf: 'ter', t: 'pres', p: ch.S.p, form: f } }; };
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
    const pl = x.n === 'pl', q = rnd() < 0.3, nlV = x.nlN === 'pl' ? 'kosten' : 'kost';
    const f = pl ? 'custam' : 'custa';
    if (q) return { pt: finishPT('quanto ' + f + ' ' + x.pt, true), ptAlt: [], en: `Hoeveel ${nlV} ${x.nl}?`, enAlt: [], words: [id], verbs: ['custar'], focus: { inf: 'custar', t: 'pres', p: pl ? 5 : 2, form: f } };
    const eur = n === 1 ? 'um euro' : numPT(n) + ' euros';
    return { pt: finishPT(x.pt + ' ' + f + ' ' + eur), ptAlt: [], en: finishNL(`${x.nl} ${nlV} ${numNL(n, true)} euro`), enAlt: [], words: [id, 'euro'], verbs: ['custar'], focus: { inf: 'custar', t: 'pres', p: pl ? 5 : 2, form: f } };
  };
  // o meu irmão / mijn broer
  T.poss_np = ctx => {
    if (!ctx.K('meu')) return null;
    const ids = csv(G.family).filter(ctx.K).concat(knownIn(ctx, 'thing'), knownIn(ctx, 'animal'));
    if (!ids.length) return null;
    const rnd = ctx.rnd, id = E.pick(ids, rnd);
    const which = E.pick(['meu', 'teu', 'nosso', 'meu'].filter(ctx.K), rnd);
    const useOf = ctx.K('dele') && rnd() < 0.3;
    const x = useOf ? NP(id, 'of:' + E.pick(['dele', 'dela'], rnd)) : NP(id, 'poss:' + which, { n: rnd() < 0.25 ? 'pl' : 'sg', g: rnd() < 0.4 ? 'f' : 'm' });
    if (!x) return null;
    return { pt: cap(x.pt), ptAlt: x.alts.map(cap), en: cap(x.nl), enAlt: [], words: [id, which], kind: 'np' };
  };
  // O meu pai é médico. / A minha irmã chama-se Ana.
  T.poss_ser = ctx => {
    const subs = subjects(ctx).filter(s => s.poss && s.n === 'sg');
    if (!subs.length) return null;
    const rnd = ctx.rnd, S = E.pick(subs, rnd);
    if (rnd() < 0.5 && ctx.K('v:chamar')) {
      const nm = E.pick(G.nameList.filter(n => n.g === S.g), rnd);
      const realize = ch => ({ pt: ptSubjVariants(ch.S).map(sv => finishPT(sv + ' chama-se ' + nm.en)), en: [nlClause(ch.S, 'heten', { mid: [{ nl: nm.en, k: 'pred' }] })], words: S.words || [], verbs: ['chamar'] });
      return finalize(realize, { S, rnd });
    }
    const profs = csv(G.profs).filter(ctx.K);
    if (!profs.length) return null;
    const id = E.pick(profs, rnd), N = noun(id), w = S.g === 'f' && N.fem ? N.fem : N.sg;
    const realize = ch => ({ pt: ptClause(ch.S, 'é', w), en: [nlClause(ch.S, 'zijn', { mid: [{ nl: nlNoun(id, S.g).w, k: 'pred' }] })], words: (S.words || []).concat([id]), verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: 2, form: 'é' } });
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
      S = npSubj(x);
      words = [id];
    }
    const cop = adj.cop, neg = rnd() < 0.15, q = !neg && rnd() < 0.2;
    const muito = rnd() < 0.25 && ctx.K('muito') && !/branco|preto|vermelho|azul|verde|amarelo|castanho|cinzento|cor-de-rosa/.test(adj.id);
    const realize = ch => {
      const gs = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g];
      const f = vform(cop, t, ch.S.p), pt = [];
      gs.forEach(g => ptClause(ch.S, f, (muito ? 'muito ' : '') + adjPT(adj.id, g, ch.S.n), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: [nlClause(ch.S, 'zijn', { t: t === 'pres' ? 'pres' : 'past', neg, q, mid: [{ nl: (muito ? 'heel ' : '') + adjNL(adj), k: 'pred' }] })], words: words.concat([adj.id]), verbs: [cop], focus: { inf: cop, t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Estou cansado.
  T.estar_adj = ctx => {
    const as = G.adjList.filter(a => a.cop === 'estar' && a.cls.includes('person') && ctx.K(a.id));
    if (!as.length || !ctx.K('v:estar')) return null;
    const rnd = ctx.rnd, adj = E.pick(as, rnd), S = E.pick(subjects(ctx), rnd), neg = rnd() < 0.15, q = !neg && rnd() < 0.25, t = ctx.tense === 'pret' || ctx.tense === 'imp' ? ctx.tense : 'pres';
    const extra = rnd() < 0.3 && ctx.K('hoje') ? ['hoje', 'vandaag'] : null;
    const realize = ch => {
      const gs = ch.S.g === '?' ? ['m', 'f'] : [ch.S.g], f = vform('estar', t, ch.S.p), pt = [];
      gs.forEach(g => ptClause(ch.S, f, adjPT(adj.id, g, ch.S.n) + (extra ? ' ' + extra[0] : ''), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: [nlClause(ch.S, 'zijn', { t: t === 'pres' ? 'pres' : 'past', neg, q, mid: [extra ? { nl: extra[1], k: 'time' } : null, { nl: adjNL(adj), k: 'pred' }] })], words: [adj.id], verbs: ['estar'], focus: { inf: 'estar', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // um carro novo / een nieuwe auto
  T.np_adj = ctx => {
    const ids = ['thing', 'house', 'clothes', 'animal', 'vehicle', 'food'].flatMap(c => knownIn(ctx, c));
    const pairs = []; ids.forEach(id => adjFor(ctx, id, false, 'ser').forEach(a => pairs.push([id, a])));
    if (!pairs.length) return null;
    const rnd = ctx.rnd, [id, adj] = E.pick(pairs, rnd);
    const n = noun(id).plOnly ? 'pl' : rnd() < 0.3 ? 'pl' : 'sg';
    const det = rnd() < 0.5 ? 'indef' : 'def';
    const x = NP(id, det, { n }); if (!x) return null;
    const a = adjPT(adj.id, x.g, x.n);
    const pt = x.pt + ' ' + a, nl = nlNPAdj(x, adj);
    const ptAlt = x.alts.map(al => al + ' ' + a);
    if (ctx.K('v:ter') && rnd() < 0.5 && (!CLS.animal.has(id) || PETS.has(id))) {
      const S = E.pick(subjects(ctx), rnd);
      const realize = ch => { const f = vform('ter', 'pres', ch.S.p); return { pt: ptClause(ch.S, f, pt), en: [nlClause(ch.S, 'hebben', { mid: [{ nl, k: 'obj' }] })], words: [id, adj.id], verbs: ['ter'], focus: { inf: 'ter', t: 'pres', p: ch.S.p, form: f } }; };
      return finalize(realize, { S, rnd });
    }
    return { pt: cap(pt), ptAlt: ptAlt.map(cap), en: cap(nl), enAlt: [], words: [id, adj.id], kind: 'np' };
  };
  // Este casaco é caro.
  T.dem_adj = ctx => {
    if (!ctx.K('este')) return T.ser_adj(ctx);
    const ids = ['clothes', 'thing', 'food'].flatMap(c => knownIn(ctx, c));
    const pairs = []; ids.forEach(id => adjFor(ctx, id, false, 'ser').forEach(a => pairs.push([id, a])));
    if (!pairs.length) return null;
    const rnd = ctx.rnd, [id, adj] = E.pick(pairs, rnd), dem = E.pick(['este', 'esse', 'aquele'].filter(ctx.K), rnd);
    const x = NP(id, 'dem:' + dem, { n: noun(id).plOnly ? 'pl' : rnd() < 0.3 ? 'pl' : 'sg' }); if (!x) return null;
    const pl = x.n === 'pl', a = adjPT(adj.id, x.g, x.n);
    const ptAlts = [x.pt].concat(x.alts).map(s => finishPT(s + ' ' + (pl ? 'são' : 'é') + ' ' + a));
    return { pt: ptAlts[0], ptAlt: ptAlts.slice(1), en: finishNL(`${x.nl} ${x.nlN === 'pl' ? 'zijn' : 'is'} ${adjNL(adj)}`), enAlt: [], words: [id, adj.id, dem], verbs: ['ser'], focus: { inf: 'ser', t: 'pres', p: pl ? 5 : 2, form: pl ? 'são' : 'é' } };
  };

  // Places
  function knownPlaces(ctx) { return G.placeList.filter(pl => ctx.K(pl.id) && LEX.has(pl.id)); }
  // a place as a noun phrase, with its Dutch from the place list (café = het café, not de koffie)
  function placeNP(pl) { const x = NP(pl.id, 'def'); if (x) { x.nl = pl.np; x.nlN = 'sg'; } return x; }
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
    if (useAnimal) { const id = E.pick(pets, rnd); S = npSubj(NP(id, 'def')); }
    else S = E.pick(subjects(ctx), rnd);
    const q = rnd() < 0.2, neg = !q && rnd() < 0.15;
    const cue = t === 'pret' && rnd() < 0.6 ? E.pick(G.cues.pret, rnd).split('|') : null;
    const realize = ch => {
      const f = vform('estar', t, ch.S.p), pt = [];
      placePT(pl, 'em').forEach(lp => ptClause(ch.S, f, lp + (cue ? ' ' + cue[0] : ''), { neg, q }).forEach(x => pt.push(x)));
      return { pt, en: [nlClause(ch.S, 'zijn', { t: t === 'pres' ? 'pres' : 'past', neg, q, mid: [cue ? { nl: cue[1], k: 'time' } : null, { nl: pl.at, k: 'pp' }] })], words: [pl.id], verbs: ['estar'], focus: { inf: 'estar', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  T.ficar_loc = ctx => {
    if (!ctx.K('v:ficar')) return null;
    const pls = knownPlaces(ctx).filter(p => !p.bare && !/cozinha|sala|quarto|casa de banho|trabalho|escritório|festa/.test(p.id));
    const rels = [['perto de', 'dicht bij'], ['longe de', 'ver van'], ['ao lado de', 'naast'], ['em frente de', 'tegenover']].filter(r => ctx.K(r[0]));
    if (pls.length < 2 || !rels.length) return null;
    const rnd = ctx.rnd, a = E.pick(pls, rnd); let b = E.pick(pls, rnd); if (a.id === b.id) b = pls.find(p => p.id !== a.id);
    const rel = E.pick(rels, rnd), A = placeNP(a), B = placeNP(b);
    const base = rel[0].replace(/ de$/, '');
    const pt = finishPT(`${A.pt} fica ${base} ${ctr('de', B.pt)}`);
    return { pt, ptAlt: [finishPT(`${A.pt} é ${base} ${ctr('de', B.pt)}`), finishPT(`${A.pt} está ${base} ${ctr('de', B.pt)}`)], en: finishNL(`${A.nl} ligt ${rel[1]} ${B.nl}`), enAlt: [], words: [a.id, b.id, rel[0]], verbs: ['ficar'], focus: { inf: 'ficar', t: 'pres', p: 2, form: 'fica' } };
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
    const zijn = x.nlN === 'pl' ? 'zijn' : 'is';
    return { pt: finishPT(`há ${x.pt} ${lp}`, q), ptAlt: [], en: q ? `${cap(zijn)} er ${x.nl} ${pl.at}?` : `Er ${zijn} ${x.nl} ${pl.at}.`, enAlt: [], words: ['há', id, pl.id] };
  };
  T.onde = ctx => {
    const things = knownIn(ctx, 'losable').concat(knownIn(ctx, 'animal'), knownIn(ctx, 'thing'));
    const pls = knownPlaces(ctx).filter(p => !p.bare);
    const rnd = ctx.rnd;
    if (pls.length && ctx.K('v:ficar') && rnd() < 0.5) {
      const pl = E.pick(pls.filter(p => !/cozinha|sala|quarto|casa de banho|trabalho|festa/.test(p.id)).concat(pls).slice(0, Math.max(1, pls.length)), rnd), x = placeNP(pl);
      return { pt: finishPT('onde fica ' + x.pt, true), ptAlt: [finishPT('onde é ' + x.pt, true), finishPT('onde está ' + x.pt, true)], en: `Waar is ${x.nl}?`, enAlt: [], words: [pl.id], verbs: ['ficar'] };
    }
    if (!things.length) return null;
    const id = E.pick(things, rnd), x = NP(id, ctx.K('meu') && rnd() < 0.5 ? 'poss:meu' : 'def');
    const f = x.n === 'pl' ? 'estão' : 'está';
    return { pt: finishPT(`onde ${f} ${x.pt}`, true), ptAlt: x.alts.map(a => finishPT(`onde ${f} ${a}`, true)), en: `Waar ${x.nlN === 'pl' ? 'zijn' : 'is'} ${x.nl}?`, enAlt: [], words: [id], verbs: ['estar'], focus: { inf: 'estar', t: 'pres', p: x.n === 'pl' ? 5 : 2, form: f } };
  };
  // Vou à praia. (tense from ctx)
  T.ir_a = ctx => {
    if (!ctx.K('v:ir')) return null;
    const pls = knownPlaces(ctx).filter(p => !/cozinha|sala|quarto|casa de banho/.test(p.id));
    if (!pls.length) return null;
    const rnd = ctx.rnd, pl = E.pick(pls, rnd), S = E.pick(subjects(ctx), rnd), t = ctx.tense === 'pret' || ctx.tense === 'imp' ? ctx.tense : 'pres';
    const q = rnd() < 0.2, neg = !q && rnd() < 0.15;
    const cue = t !== 'pres' && rnd() < 0.6 ? E.pick(G.cues[t], rnd).split('|') : null;
    const start = cue && cue[2] === 'start';
    const realize = ch => {
      const f = vform('ir', t, ch.S.p), pt = [];
      placePT(pl, 'a').forEach(lp => ptClause(ch.S, f, lp + (cue && !start ? ' ' + cue[0] : ''), { neg, q }).forEach(x => pt.push(start ? finishPT(cue[0] + ', ' + lcPT(x), q) : x)));
      const nl = nlClause(ch.S, 'gaan', { t: NLT[t], neg, q, front: start ? cue[1] : null, mid: [cue && !start ? { nl: cue[1], k: 'time' } : null, { nl: pl.to, k: 'pp' }] });
      return { pt, en: [nl], words: [pl.id], verbs: ['ir'], focus: { inf: 'ir', t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };
  // Time telling. Dutch counts half hours towards the next hour: 4:30 = half vijf.
  const hourNL = h => numNL(h > 12 ? h - 12 : h, true);
  T.horas = ctx => {
    if (!ctx.K('hora')) return null;
    const rnd = ctx.rnd, h = 1 + Math.floor(rnd() * 12), kind = E.pick(['oclock', 'oclock', 'meia', 'quarto', 'menos', 'dez', 'meio'], rnd);
    const hp = n => numPT(n, 'f');
    const ser = n => (n === 1 ? 'é' : 'são');
    const nx = h === 12 ? 1 : h + 1;
    switch (kind) {
      case 'oclock': return { pt: cap(`${ser(h)} ${hp(h)} ${h === 1 ? 'hora' : 'horas'}.`), ptAlt: [cap(`${ser(h)} ${hp(h)}.`)], en: `Het is ${hourNL(h)} uur.`, enAlt: [], words: ['hora'] };
      case 'meia': return { pt: cap(`${ser(h)} ${hp(h)} e meia.`), ptAlt: [], en: `Het is half ${hourNL(nx)}.`, enAlt: [], words: ['hora'] };
      case 'quarto': return { pt: cap(`${ser(h)} ${hp(h)} e um quarto.`), ptAlt: [], en: `Het is kwart over ${hourNL(h)}.`, enAlt: [], words: ['hora'] };
      case 'menos': return { pt: cap(`${ser(nx)} ${hp(nx)} menos um quarto.`), ptAlt: [], en: `Het is kwart voor ${hourNL(nx)}.`, enAlt: [], words: ['hora'] };
      case 'dez': {
        const m = E.pick([5, 10, 20, 25], rnd);
        const nl = m <= 10 ? `${numNL(m)} over ${hourNL(h)}` : `${numNL(30 - m)} voor half ${hourNL(nx)}`;
        return { pt: cap(`${ser(h)} ${hp(h)} e ${numPT(m)}.`), ptAlt: [], en: `Het is ${nl}.`, enAlt: [], words: ['hora', 'minuto'] };
      }
      default: return ctx.K('meio-dia') ? { pt: 'É meio-dia.', ptAlt: [], en: "Het is twaalf uur 's middags.", enAlt: [], words: ['meio-dia'] } : null;
    }
  };
  // Janto às oito.
  T.at_time = ctx => {
    const HRS = { jantar: [7, 8, 9], almoçar: [1, 2], chegar: [6, 7, 8, 9], sair: [7, 8, 9, 5, 6], acordar: [6, 7, 8, 9], voltar: [5, 6, 7] };
    const verbs = Object.keys(HRS).filter(v => ctx.K('v:' + v));
    if (!verbs.length || !ctx.K('hora')) return null;
    const rnd = ctx.rnd, inf = E.pick(verbs, rnd), S = E.pick(subjects(ctx), rnd), h = E.pick(HRS[inf], rnd), half = rnd() < 0.3;
    const ptT = (h === 1 ? 'à uma' : 'às ' + numPT(h, 'f')) + (half ? ' e meia' : '');
    const nlT = 'om ' + (half ? 'half ' + hourNL(h + 1) : hourNL(h) + ' uur');
    const t = ctx.tense === 'pret' ? 'pret' : 'pres';
    const realize = ch => { const f = vform(inf, t, ch.S.p); return { pt: ptClause(ch.S, f, ptT), en: [nlClause(ch.S, G.iv[inf], { t: NLT[t], mid: [{ nl: nlT, k: 'pp' }] })], words: ['hora'], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  // Reflexives with European clitic placement
  const REFL = ['me', 'te', 'se', 'nos', 'vos', 'se'];
  const REFL_MUITO = { preocupar: 'veel', divertir: 'veel', zangar: 'vaak' };
  const COMP_NL = { aqui: ['hier', 'time'], ali: ['daar', 'time'], depressa: ['snel', 'adv'], devagar: ['langzaam', 'adv'], cedo: ['vroeg', 'adv'], 'tarde-adv': ['laat', 'adv'], 'de manhã': ["'s ochtends", 'time'], 'à noite': ["'s avonds", 'time'] };
  T.reflex = ctx => {
    const verbs = G.reflexList.filter(r => ctx.K('v:' + r.inf));
    if (!verbs.length) return null;
    const rnd = ctx.rnd, R = E.pick(verbs, rnd), inf = R.inf, S = E.pick(subjects(ctx, { noFormal: false }), rnd);
    const mode = E.pick(['aff', 'aff', 'neg', 'nunca', 'q'], rnd);
    const comps = R.comp.filter(c => /^t\d/.test(c) ? ctx.K('hora') : /^de |^à /.test(c) || ctx.K(c));
    const comp = comps.length ? E.pick(comps, rnd) : '';
    const mode2 = comp === 'muito' && mode === 'nunca' ? 'aff' : mode;
    let ptT = '', nlPart = null;
    if (/^t\d/.test(comp)) { const [a, b] = comp.slice(1).split('-').map(Number); const h = a + Math.floor(rnd() * (b - a + 1)); ptT = 'às ' + numPT(h, 'f'); nlPart = { nl: 'om ' + hourNL(h) + ' uur', k: 'pp' }; }
    else if (comp) { ptT = LEX.has(comp) ? LEX.get(comp).pt : comp; nlPart = comp === 'muito' ? { nl: REFL_MUITO[inf] || 'veel', k: 'adv' } : COMP_NL[comp] ? { nl: COMP_NL[comp][0], k: COMP_NL[comp][1] } : null; }
    const t = ctx.tense === 'pret' ? 'pret' : 'pres';
    const realize = ch => {
      const f = vform(inf, t, ch.S.p), cl = REFL[ch.S.p], pt = [];
      ptSubjVariants(ch.S).forEach(sv => {
        let core;
        if (mode2 === 'aff' || mode2 === 'q') core = enclitic(f, cl);
        else core = (mode2 === 'neg' ? 'não ' : 'nunca ') + cl + ' ' + f;
        pt.push(finishPT([sv, core, ptT].filter(Boolean).join(' '), mode2 === 'q'));
      });
      const nl = nlClause(ch.S, R.nl, { t: NLT[t], refl: R.refl, neg: mode2 === 'neg', q: mode2 === 'q', mid: [mode2 === 'nunca' ? { nl: 'nooit', k: 'freq' } : null, nlPart] });
      return { pt, en: [nl], words: /^às/.test(ptT) ? ['hora'] : [], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } };
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
    const realize = ch => { const f = vform('estar', 'pres', ch.S.p); return { pt: ptClause(ch.S, f + ' a ' + inf, cue ? cue[0] : '', { neg, q }), en: [nlClause(ch.S, G.iv[inf], { t: 'prog', neg, q, mid: [cue ? { nl: cue[1], k: 'time' } : null] })], verbs: [inf], focus: { inf: 'estar', t: 'pres', p: ch.S.p, form: f } }; };
    return finalize(realize, { S, rnd });
  };
  T.ter_de = ctx => (ctx.K('v:ter') ? modalize(ctx, null, 'ter') : null);
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
    const obj = fr.flags.bare ? { pt: LEX.get(id).pt, alts: [] } : NP(id, pickDet(id, ctx, true));
    if (!obj) return null;
    const D = nlFrame(fr, cls, id, obj);
    const objPT = fr.flags.de ? ctr('de', obj.pt) : obj.pt;
    const link = { ter: ' de ', precisar: ' de ', gostar: ' de ', querer: ' ', poder: ' ' }[modal];
    const nlMod = { ter: 'moeten', precisar: 'moeten', querer: 'willen', poder: 'kunnen' }[modal];
    const realize = ch => {
      const f = vform(modal, 'pres', ch.S.p);
      const pt = ptClause(ch.S, f + link + inf, objPT, { neg, q });
      if (modal === 'ter') ptClause(ch.S, f + ' que ' + inf, objPT, { neg, q }).forEach(x => pt.push(x));
      // gostar de + infinitive = graag doen
      const nl = modal === 'gostar'
        ? nlClause(ch.S, D.key, { neg, q, mid: [{ nl: 'graag', k: 'graag' }, D.part] })
        : nlClause(ch.S, D.key, { t: 'mod', mod: nlMod, neg, q, mid: [D.part] });
      return { pt, en: [nl], words: [id], verbs: [modal, inf], focus: { inf: modal, t: 'pres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  }
  // Doer: Dói-me a cabeça. = Mijn hoofd doet pijn.
  T.doer = ctx => {
    const parts = csv(G.body).filter(ctx.K);
    if (!parts.length) return null;
    const rnd = ctx.rnd, id = E.pick(parts, rnd), N = noun(id);
    const pl = N.plOnly || (rnd() < 0.25 && /pé|olho|joelho|ombro|mão|perna|braço|dente/.test(id));
    const x = NP(id, 'def', { n: pl ? 'pl' : 'sg' });
    const who = E.pick([['me', 'mijn'], ['me', 'mijn'], ['te', 'je'], ['lhe', 'zijn'], ['lhe', 'haar']], rnd);
    const q = who[0] === 'te' && rnd() < 0.5;
    const verb = x.n === 'pl' ? 'doem' : 'dói';
    const pt = finishPT(`${verb}-${who[0]} ${x.pt}`, q);
    const S = { nl: who[1] + ' ' + x.nlW, np: x.nlN === 'pl' ? '3p' : '3s' };
    return { pt, ptAlt: [], en: nlClause(S, 'pijn doen', { q }), enAlt: [], words: [id], verbs: ['doer'], focus: { inf: 'doer', t: 'pres', p: x.n === 'pl' ? 5 : 2, form: verb } };
  };
  // Imperatives
  function imperative(ctx, list) {
    const items = list.map(s => s.split('|')).filter(([v]) => ctx.K('v:' + v));
    if (!items.length) return null;
    const rnd = ctx.rnd, [inf, rest, nl, nlNeg] = E.pick(items, rnd);
    const who = E.pick(['tu', 'tu', 'formal', 'vocês', 'neg'], rnd);
    const F = E.conjugate(inf);
    let form, hint, pt;
    if (who === 'tu') { form = F.impa[1]; hint = 'tu'; }
    else if (who === 'formal') { form = F.impa[2]; hint = 'formal'; }
    else if (who === 'vocês') { form = F.impa[5]; hint = 'plural'; }
    else { form = F.impn[1]; hint = 'tu'; }
    pt = finishPT((who === 'neg' ? 'não ' : '') + form + (rest ? ' ' + rest : ''));
    pt = pt.replace(/\.$/, '!');
    // Dutch: the same form for jij and jullie; polite "Neemt u…"
    let nlS = who === 'neg' ? nlNeg : nl;
    if (who === 'formal') { const i = nl.indexOf(' '), w = i < 0 ? nl : nl.slice(0, i); nlS = (/t$/.test(w) ? w : /[^a]a$/.test(w) ? w + 'at' : w + 't') + ' u' + (i < 0 ? '' : nl.slice(i)); }
    const alts = [pt.replace(/!$/, '.')];
    if (who === 'formal') alts.push(finishPT(form + (rest ? ' ' + rest : '') + ', se faz favor'));
    return { pt, ptAlt: alts, en: nlS + '!', enAlt: [], hint, words: [], verbs: [inf], focus: { inf, t: who === 'neg' ? 'impn' : 'impa', p: who === 'tu' || who === 'neg' ? 1 : who === 'formal' ? 2 : 5, form } };
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
    const nlDest = city ? 'naar ' + clean(city.en) : (ctx.K('trabalho') ? 'naar het werk' : 'naar huis');
    const nlBy = 'met ' + NP(id, 'def').nl;
    const realize = ch => {
      const f = vform('ir', t, ch.S.p), pt = [];
      dest.forEach(d => { ptClause(ch.S, f, `de ${LEX.get(id).pt} ${d}`).forEach(x => pt.push(x)); ptClause(ch.S, f, `${d} de ${LEX.get(id).pt}`).forEach(x => pt.push(x)); });
      return { pt, en: [nlClause(ch.S, 'gaan', { t: NLT[t], mid: [{ nl: nlBy, k: 'adv' }, { nl: nlDest, k: 'pp' }] })], words: [id], verbs: ['ir'], focus: { inf: 'ir', t, p: ch.S.p, form: f } };
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
    const less = ctx.K('menos') && rnd() < 0.3;
    const special = { bom: 'melhor', mau: 'pior', grande: 'maior' }[adj.id];
    const adjP = adjPT(adj.id, A.g, 'sg');
    const ptCore = less ? `menos ${adjP}` : special ? special : `mais ${adjP}`;
    const pt = finishPT(`${A.pt} é ${ptCore} do que ${B.pt}`);
    const ptAlt = [finishPT(`${A.pt} é ${ptCore} que ${B.pt}`)];
    if (adj.id === 'pequeno' && !less) ptAlt.push(finishPT(`${A.pt} é menor do que ${B.pt}`), finishPT(`${A.pt} é menor que ${B.pt}`));
    const nl = finishNL(`${A.nl} ${A.nlN === 'pl' ? 'zijn' : 'is'} ${less ? 'minder ' + adj.nl : nlComp(adj)} dan ${B.nl}`);
    return { pt, ptAlt, en: nl, enAlt: [], words: [a, b, adj.id, less ? 'menos' : 'mais'], verbs: ['ser'] };
  };
  T.tao = ctx => {
    if (!ctx.K('tão')) return T.comp(ctx);
    const pr = compPair(ctx); if (!pr) return null;
    const [a, b, adj] = pr, A = NP(a, 'def'), B = NP(b, 'def'), neg = ctx.rnd() < 0.3;
    const adjP = adjPT(adj.id, A.g, 'sg');
    const nl = finishNL(`${A.nl} ${A.nlN === 'pl' ? 'zijn' : 'is'} ${neg ? 'niet zo' : 'even'} ${adj.nl} als ${B.nl}`);
    return { pt: finishPT(`${A.pt} ${neg ? 'não é' : 'é'} tão ${adjP} como ${B.pt}`), ptAlt: [finishPT(`${A.pt} ${neg ? 'não é' : 'é'} tão ${adjP} quanto ${B.pt}`)], en: nl, enAlt: [], words: [a, b, adj.id, 'tão'], verbs: ['ser'] };
  };
  T.gostaria = ctx => {
    const opts = []; Object.keys(G.frames).filter(v => ctx.K('v:' + v) && !/ter|querer|precisar/.test(v)).forEach(v => { const fr = frameOf(v); fr.cls.forEach(c => knownIn(ctx, c).forEach(id => opts.push([v, c, id, fr]))); });
    if (!opts.length) return null;
    const rnd = ctx.rnd, [inf, cls, id, fr] = E.pick(opts, rnd);
    const obj = fr.flags.bare ? { pt: LEX.get(id).pt } : NP(id, MASSONLY.has(id) ? 'bare' : 'indef'); if (!obj) return null;
    const D = nlFrame(fr, cls, id, obj);
    const op = fr.flags.de ? ctr('de', obj.pt) : obj.pt;
    const who = rnd() < 0.7 ? 'eu' : 'nós', S = PRON_SUBJ[who];
    const f = who === 'eu' ? 'gostaria' : 'gostaríamos', f2 = who === 'eu' ? 'gostava' : 'gostávamos';
    const pt = finishPT(`${f} de ${inf} ${op}`);
    return { pt, ptAlt: [finishPT(`${S.pt} ${f} de ${inf} ${op}`), finishPT(`${f2} de ${inf} ${op}`), finishPT(`${S.pt} ${f2} de ${inf} ${op}`)], en: nlClause(S, D.key, { t: 'cond', mid: [{ nl: 'graag', k: 'graag' }, D.part] }), enAlt: [], words: [id], verbs: ['gostar', inf], focus: { inf: 'gostar', t: 'cond', p: S.p, form: f } };
  };
  // Subjunctive: a subordinate clause with a known verb
  function subClauseSVO(ctx, tense, notP) {
    const opts = []; Object.keys(G.frames).filter(v => ctx.K('v:' + v) && !frameOf(v).flags.st).forEach(v => { const fr = frameOf(v); fr.cls.forEach(c => knownIn(ctx, c).forEach(id => opts.push([v, c, id, fr]))); });
    const ivs = Object.keys(G.iv).filter(v => ctx.K('v:' + v));
    if (!opts.length && !ivs.length) return null;
    const rnd = ctx.rnd;
    const no = [].concat(notP); const subs = subjects(ctx, { pronOnly: rnd() < 0.7 }).filter(s => !no.includes(s.p) && !/senhor/.test(s.pt));
    const S = E.pick(subs, rnd);
    if (opts.length && rnd() < 0.7) {
      const [inf, cls, id, fr] = E.pick(opts, rnd);
      const obj = fr.flags.bare ? { pt: LEX.get(id).pt } : NP(id, MASSONLY.has(id) ? 'bare' : 'def'); if (!obj) return null;
      const D = nlFrame(fr, cls, id, obj);
      return { S, inf, nlKey: D.key, nlPart: D.part, ptRest: fr.flags.de ? ctr('de', obj.pt) : obj.pt, words: [id] };
    }
    const inf = E.pick(ivs, rnd);
    return { S, inf, nlKey: G.iv[inf], nlPart: null, ptRest: '', words: [] };
  }
  T.espero = ctx => {
    if (!ctx.K('v:esperar')) return null;
    const rnd = ctx.rnd, main = rnd() < 0.7 ? PRON_SUBJ.eu : PRON_SUBJ['nós'];
    const sc = subClauseSVO(ctx, 'cpres', main.p === 3 ? [0, 3] : [0]); if (!sc) return null;
    const mf = vform('esperar', 'pres', main.p);
    const realize = ch => {
      const f = vform(sc.inf, 'cpres', ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => { pt.push(finishPT([mf, 'que', sv, f, sc.ptRest].filter(Boolean).join(' '))); pt.push(finishPT([main.pt, mf, 'que', sv, f, sc.ptRest].filter(Boolean).join(' '))); });
      const nl = finishNL(nlRaw(main, 'hopen') + ' ' + nlRaw(ch.S, sc.nlKey, { sub: 'dat', mid: [sc.nlPart] }));
      return { pt, en: [nl], words: sc.words, verbs: ['esperar', sc.inf], focus: { inf: sc.inf, t: 'cpres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S: sc.S, rnd });
  };
  T.quero_que = ctx => {
    if (!ctx.K('v:querer')) return null;
    const rnd = ctx.rnd, sc = subClauseSVO(ctx, 'cpres', 0); if (!sc) return null;
    const neg = rnd() < 0.25;
    const realize = ch => {
      const f = vform(sc.inf, 'cpres', ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => { pt.push(finishPT([neg ? 'não' : '', 'quero que', sv, f, sc.ptRest].filter(Boolean).join(' '))); pt.push(finishPT(['eu', neg ? 'não' : '', 'quero que', sv, f, sc.ptRest].filter(Boolean).join(' '))); });
      const nl = finishNL(nlRaw(PRON_SUBJ.eu, 'willen', { neg }) + ' ' + nlRaw(ch.S, sc.nlKey, { sub: 'dat', mid: [sc.nlPart] }));
      return { pt, en: [nl], words: sc.words, verbs: ['querer', sc.inf], focus: { inf: sc.inf, t: 'cpres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S: sc.S, rnd });
  };
  T.talvez = ctx => {
    if (!ctx.K('talvez')) return T.espero(ctx);
    const rnd = ctx.rnd, sc = subClauseSVO(ctx, 'cpres', -1); if (!sc) return null;
    const realize = ch => {
      const f = vform(sc.inf, 'cpres', ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT(['talvez', sv, f, sc.ptRest].filter(Boolean).join(' '))));
      return { pt, en: [nlClause(ch.S, sc.nlKey, { front: 'misschien', mid: [sc.nlPart] })], words: sc.words.concat(['talvez']), verbs: [sc.inf], focus: { inf: sc.inf, t: 'cpres', p: ch.S.p, form: f } };
    };
    return finalize(realize, { S: sc.S, rnd });
  };
  // the Dutch "als …" clause for a condition: als ik tijd had / als je vroeg aankomt / als ik kon koken
  function nlIf(S, nv, nrest, t) {
    const after = /^>/.test(nrest) ? nrest.slice(1) : '';
    const rest = after ? '' : nrest;
    const k = /^(in|op|naar|bij) /.test(rest) ? 'pp' : /^(vroeg|laat)$/.test(rest) ? 'adv' : 'obj';
    return nlRaw(S, nv, { sub: 'als', t, after, mid: rest ? [{ nl: rest, k }] : [] });
  }
  const nlRest = r => (r ? [{ nl: r, k: /^(naar|over|in|op) /.test(r) ? 'pp' : 'obj' }] : []);
  // Se eu tivesse tempo, viajava.
  T.se_cimp = ctx => {
    const conds = G.conds.map(s => s.split('|')).filter(([v]) => ctx.K('v:' + v));
    const res = G.results.map(s => s.split('|')).filter(([v]) => ctx.K('v:' + v));
    if (!conds.length || !res.length) return null;
    const rnd = ctx.rnd, [cv, crest, cnv, cnrest] = E.pick(conds, rnd), [rv, rrest, rnv, rnrest] = E.pick(res, rnd);
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
      const nl = nlClause(ch.S, rnv, { t: 'cond', front: nlIf(ch.S, cnv, cnrest, 'past') + ',', mid: nlRest(rnrest) });
      return { pt, en: [nl], words: [], verbs: [cv, rv], focus: { inf: cv, t: 'cimp', p, form: cf } };
    };
    return finalize(realize, { S, rnd });
  };
  // Se tiveres tempo, vamos à praia.
  T.se_cfut = ctx => {
    const conds = G.conds.map(s => s.split('|')).filter(([v]) => ctx.K('v:' + v) && /^(ter|poder|querer|chegar)$/.test(v));
    if (!conds.length) return null;
    const rnd = ctx.rnd;
    if (rnd() < 0.25) {
      const w = E.pick([['estiver sol', 'de zon schijnt'], ['chover', 'het regent'], ['estiver frio', 'het koud is']], rnd), r = E.pick([['vamos à praia', 'gaan we naar het strand'], ['ficamos em casa', 'blijven we thuis'], ['vamos ao cinema', 'gaan we naar de bioscoop']], rnd);
      return { pt: cap(`se ${w[0]}, ${r[0]}.`), ptAlt: [], en: `Als ${w[1]}, ${r[1]}.`, enAlt: [], words: [], verbs: [w[0].split(' ')[0] === 'chover' ? 'chover' : 'estar'], focus: { inf: w[0] === 'chover' ? 'chover' : 'estar', t: 'cfut', p: 2, form: w[0].split(' ')[0] } };
    }
    const [cv, crest, cnv, cnrest] = E.pick(conds, rnd);
    const S = E.pick(subjects(ctx, { pronOnly: true }).filter(s => !/senhor/.test(s.pt)), rnd);
    const res = E.pick([['ir', 'à praia', 'gaan', 'naar het strand'], ['ir', 'ao cinema', 'gaan', 'naar de bioscoop'], ['jantar', 'fora', 'uit eten gaan', ''], ['ficar', 'em casa', 'thuisblijven', ''], ['visitar', 'o museu', 'bezoeken', 'het museum']].filter(([v]) => ctx.K('v:' + v)), rnd);
    if (!res) return null;
    const realize = ch => {
      const p = ch.S.p, cf = vform(cv, 'cfut', p), pt = [];
      const rf = vform(res[0], 'pres', p), rf2 = vform('ir', 'pres', p) + ' ' + res[0];
      ptSubjVariants(ch.S).forEach(sv => (res[0] === 'ir' ? [rf] : [rf, rf2]).forEach(r => pt.push(finishPT(['se', sv, cf, crest].filter(Boolean).join(' ') + ', ' + [r, res[1]].join(' ')))));
      const nl = nlClause(ch.S, res[2], { front: nlIf(ch.S, cnv, cnrest, 'pres') + ',', mid: nlRest(res[3]) });
      return { pt, en: [nl], words: [], verbs: [cv, res[0]], focus: { inf: cv, t: 'cfut', p, form: cf } };
    };
    return finalize(realize, { S, rnd });
  };
  // Object pronouns: O livro? Li-o. = Ik heb het gelezen.
  T.pron_obj = ctx => {
    const opts = [];
    Object.keys(G.frames).filter(v => ctx.K('v:' + v) && !/precisar|gostar|ter|querer/.test(v)).forEach(v => { const fr = frameOf(v); if (fr.flags.bare) return; fr.cls.forEach(c => knownIn(ctx, c).filter(id => !MASSONLY.has(id)).forEach(id => opts.push([v, c, id, fr]))); });
    if (!opts.length) return null;
    const rnd = ctx.rnd, [inf, cls, id, fr] = E.pick(opts, rnd), S = E.pick(subjects(ctx, { pronOnly: true }), rnd);
    const t = rnd() < 0.5 ? 'pres' : 'pret', neg = rnd() < 0.3;
    const x = NP(id, 'def', { n: noun(id).plOnly ? 'pl' : rnd() < 0.3 ? 'pl' : 'sg' });
    const pron = (x.g === 'f' ? 'a' : 'o') + (x.n === 'pl' ? 's' : '');
    const [key, prep] = nlSplit(fr.flags[cls] || fr.flags[id] || fr.en);
    // Dutch: hem / het / ze, or er + preposition (ernaar, erop)
    const nlP = x.nlN === 'pl' ? 'ze' : x.hetSg ? 'het' : 'hem';
    const mid = prep ? [{ nl: 'er', k: 'pron' }, { nl: prep, k: 'pp' }] : [{ nl: nlP, k: 'pron' }];
    const realize = ch => {
      const f = vform(inf, t, ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, neg ? 'não ' + pron + ' ' + f : enclitic(f, pron)].filter(Boolean).join(' '))));
      return { pt, en: [nlClause(ch.S, key, { t: NLT[t], neg, mid })], words: [id], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } };
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
    const to = E.pick([['me', 'me'], ['lhe', 'hem'], ['lhe', 'haar'], ['nos', 'ons'], ['te', 'je']].filter(o => !(o[0] === 'me' && S.p === 0) && !(o[0] === 'te' && S.p === 1) && !(o[0] === 'nos' && S.p === 3)), rnd);
    const x = NP(id, 'def'), neg = rnd() < 0.25, t = rnd() < 0.5 ? 'pres' : 'pret';
    const key = { dar: 'geven', mostrar: 'laten zien', emprestar: 'lenen', oferecer: 'cadeau geven', trazer: 'brengen', levar: 'brengen' }[inf];
    const realize = ch => {
      const f = vform(inf, t, ch.S.p), pt = [];
      ptSubjVariants(ch.S).forEach(sv => pt.push(finishPT([sv, neg ? 'não ' + to[0] + ' ' + f : enclitic(f, to[0]), x.pt].filter(Boolean).join(' '))));
      return { pt, en: [nlClause(ch.S, key, { t: NLT[t], neg, mid: [{ nl: to[1], k: 'pron' }, { nl: x.nl, k: 'obj' }] })], words: [id], verbs: [inf], focus: { inf, t, p: ch.S.p, form: f } };
    };
    return finalize(realize, { S, rnd });
  };

  /* ---------------- Public API ---------------- */
  function make(tpl, ctx) {
    const fn = T[tpl]; if (!fn) return null;
    for (let i = 0; i < 4; i++) {
      try {
        const r = fn(ctx);
        if (r && /\?$/.test(r.en) && /^\S+ ik\b/.test(r.en)) continue; // "Ben ik moe?" is an odd thing to ask
        if (r && r.pt && r.en) { r.tpl = tpl; r.ptAlt = (r.ptAlt || []).filter(x => x !== r.pt); return r; }
      } catch (e) { if (ctx.debug) throw e; }
    }
    return null;
  }
  // Parse a hand-written sentence line: "2: PT / alt | NL / alt"
  function parseSent(line) {
    const m = line.match(/^\s*(\d)\s*:\s*(.*)$/); const lesson = m ? +m[1] : 0; const body = m ? m[2] : line;
    const [ptPart, enPart] = body.split('|').map(s => s.trim());
    const pts = ptPart.split(' / ').map(s => s.trim()); const ens = (enPart || '').split(' / ').map(s => s.trim());
    const focus = [];
    const strip = s => s.replace(/\{([^}]+)\}/g, (_, w) => { focus.push(w); return w; });
    const pt = strip(pts[0]);
    return { lesson, pt, raw: pts[0], ptAlt: pts.slice(1).map(s => s.replace(/\{([^}]+)\}/g, '$1')), en: ens[0], enAlt: ens.slice(1), blanks: focus };
  }

  return { load, make, T, NP, noun, adjForms, adjPT, nlNoun, nlPlural, nlClause, numPT, numNL, ctr, enclitic, parseSent, LEX, VERBS, PRON_SUBJ, nounClasses, clean, ptPlural, LC_PT, PROCLISIS };
});
