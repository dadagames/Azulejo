/* Azulejo · language engine for European Portuguese (AO1990 spelling, PT-PT usage)
 * - conjugate(inf): every simple and compound tense, with irregularity marks
 * - English inflection (for hints and generated sentences)
 * - answer normalisation, comparison and word diff
 * Runs in the browser (window.PTE) and in Node (module.exports) for tests. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PTE = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const PERSONS = ['eu', 'tu', 'ele/ela/você', 'nós', 'vós', 'eles/elas/vocês'];
  const PRON = ['eu', 'tu', 'ele', 'nós', 'vós', 'eles'];

  const TENSES = [
    { k: 'pres', pt: 'Presente', en: 'Tegenwoordige tijd', g: 'Indicativo', use: 'Gewoontes, feiten en wat nu waar is. Voor ‘nu op dit moment’ gebruik je estar a + infinitief (estou a comer).' },
    { k: 'pret', pt: 'Pretérito perfeito', en: 'Verleden tijd (afgerond)', g: 'Indicativo', use: 'Afgeronde handelingen op een bepaald moment: Ontem comi bacalhau. Ook voor het Nederlandse ‘ik heb gedaan’ bij eenmalige dingen: Já comi.' },
    { k: 'imp', pt: 'Pretérito imperfeito', en: 'Onvoltooid verleden tijd', g: 'Indicativo', use: 'Gewoontes in het verleden (‘vroeger deed ik’), beschrijvingen en achtergrond (‘was bezig met’), en beleefde verzoeken: Queria um café.' },
    { k: 'mqp', pt: 'Mais-que-perfeito', en: 'Voltooid verleden tijd (boekentaal)', g: 'Indicativo', use: '‘Had gedaan’ in boeken en formele teksten. In spreektaal zeg je tinha + particípio.' },
    { k: 'fut', pt: 'Futuro', en: 'Toekomende tijd', g: 'Indicativo', use: '‘Zal’, vooral in geschreven en formele taal. In het dagelijks leven zeggen Portugezen ir + infinitief (vou fazer). Ook voor vermoedens: Onde estará ele?' },
    { k: 'cond', pt: 'Condicional', en: 'Voorwaardelijke wijs', g: 'Indicativo', use: '‘Zou’: Gostaria de ir. In het dagelijks Europees-Portugees vervangt de imperfeito hem vaak: Se pudesse, ia.' },
    { k: 'cpres', pt: 'Presente do conjuntivo', en: 'Aanvoegende wijs (tegenwoordig)', g: 'Conjuntivo', use: 'Na wensen, twijfel, gevoelens en sommige voegwoorden: espero que, quero que, talvez, é importante que, embora, para que.' },
    { k: 'cimp', pt: 'Imperfeito do conjuntivo', en: 'Aanvoegende wijs (verleden)', g: 'Conjuntivo', use: 'Onwerkelijke situaties met se (Se eu tivesse tempo…) en na een verleden-tijd-aanleiding (Queria que viesses).' },
    { k: 'cfut', pt: 'Futuro do conjuntivo', en: 'Aanvoegende wijs (toekomst)', g: 'Conjuntivo', use: 'Voorwaarden in de toekomst na se, quando, assim que, enquanto, sempre que: Quando chegares, liga-me.' },
    { k: 'impa', pt: 'Imperativo afirmativo', en: 'Gebiedende wijs', g: 'Imperativo', use: 'De tu-vorm = de ele-vorm van de presente (fala!, come!). De vormen voor você / o senhor komen uit de conjuntivo (fale!).' },
    { k: 'impn', pt: 'Imperativo negativo', en: 'Ontkennende gebiedende wijs', g: 'Imperativo', use: 'Altijd não + presente do conjuntivo: não fales, não fale, não falem.' },
    { k: 'infp', pt: 'Infinitivo pessoal', en: 'Persoonlijke infinitief', g: 'Infinitivo', use: 'Een infinitief met een eigen onderwerp, na voorzetsels en onpersoonlijke uitdrukkingen: para nós irmos, antes de saíres, é melhor fazerem isso.' },
    { k: 'ppc', pt: 'Pretérito perfeito composto', en: 'de laatste tijd steeds doen', g: 'Compostos', aux: 'pres', use: 'Let op: tenho feito betekent ‘ik doe het de laatste tijd steeds’, niet een eenmalig ‘ik heb gedaan’.' },
    { k: 'mqpc', pt: 'Mais-que-perfeito composto', en: 'had gedaan', g: 'Compostos', aux: 'imp', use: 'Verleden vóór het verleden: Quando cheguei, ele já tinha saído.' },
    { k: 'futc', pt: 'Futuro composto', en: 'zal hebben gedaan', g: 'Compostos', aux: 'fut', use: 'Terei acabado até às cinco.' },
    { k: 'condc', pt: 'Condicional composto', en: 'zou hebben gedaan', g: 'Compostos', aux: 'cond', use: 'Teria ido, se soubesse.' },
    { k: 'cppc', pt: 'Pretérito perfeito do conjuntivo', en: 'heeft gedaan (conjuntivo)', g: 'Compostos', aux: 'cpres', use: 'Espero que tenhas gostado.' },
    { k: 'cmqpc', pt: 'Mais-que-perfeito do conjuntivo', en: 'had gedaan (conjuntivo)', g: 'Compostos', aux: 'cimp', use: 'Se tivesse sabido, tinha vindo.' },
    { k: 'cfutc', pt: 'Futuro composto do conjuntivo', en: 'zal hebben gedaan (conjuntivo)', g: 'Compostos', aux: 'cfut', use: 'Quando tiveres acabado, avisa-me.' },
  ];
  const SIMPLE = ['pres', 'pret', 'imp', 'mqp', 'fut', 'cond', 'cpres', 'cimp', 'cfut', 'impa', 'impn', 'infp'];
  const TENSE = {}; TENSES.forEach(t => (TENSE[t.k] = t));

  const END = {
    ar: { pres: ['o', 'as', 'a', 'amos', 'ais', 'am'], pret: ['ei', 'aste', 'ou', 'ámos', 'astes', 'aram'], imp: ['ava', 'avas', 'ava', 'ávamos', 'áveis', 'avam'], cpres: ['e', 'es', 'e', 'emos', 'eis', 'em'], pp: 'ado' },
    er: { pres: ['o', 'es', 'e', 'emos', 'eis', 'em'], pret: ['i', 'este', 'eu', 'emos', 'estes', 'eram'], imp: ['ia', 'ias', 'ia', 'íamos', 'íeis', 'iam'], cpres: ['a', 'as', 'a', 'amos', 'ais', 'am'], pp: 'ido' },
    ir: { pres: ['o', 'es', 'e', 'imos', 'is', 'em'], pret: ['i', 'iste', 'iu', 'imos', 'istes', 'iram'], imp: ['ia', 'ias', 'ia', 'íamos', 'íeis', 'iam'], cpres: ['a', 'as', 'a', 'amos', 'ais', 'am'], pp: 'ido' },
  };
  const FUT = ['ei', 'ás', 'á', 'emos', 'eis', 'ão'];
  const COND = ['ia', 'ias', 'ia', 'íamos', 'íeis', 'iam'];
  const HI_IMP = ['ía', 'ías', 'ía', 'íamos', 'íeis', 'íam'];

  const L = s => s.split(',');
  const W = s => new Set(s.trim().split(/\s+/));

  // Irregular verbs. Missing tenses are built regularly; s1 = stem of the 1st person present (also the conjuntivo stem).
  const IRR = {
    ser: { pres: L('sou,és,é,somos,sois,são'), pret: L('fui,foste,foi,fomos,fostes,foram'), imp: L('era,eras,era,éramos,éreis,eram'), cpres: L('seja,sejas,seja,sejamos,sejais,sejam'), tu: 'sê', vos: 'sede' },
    estar: { pres: L('estou,estás,está,estamos,estais,estão'), pret: L('estive,estiveste,esteve,estivemos,estivestes,estiveram'), cpres: L('esteja,estejas,esteja,estejamos,estejais,estejam'), strong: 1 },
    ter: { pres: L('tenho,tens,tem,temos,tendes,têm'), pret: L('tive,tiveste,teve,tivemos,tivestes,tiveram'), imp: L('tinha,tinhas,tinha,tínhamos,tínheis,tinham'), s1: 'tenh', strong: 1 },
    haver: { pres: L('hei,hás,há,havemos,haveis,hão'), pret: L('houve,houveste,houve,houvemos,houvestes,houveram'), cpres: L('haja,hajas,haja,hajamos,hajais,hajam'), strong: 1 },
    ir: { pres: L('vou,vais,vai,vamos,ides,vão'), pret: L('fui,foste,foi,fomos,fostes,foram'), imp: L('ia,ias,ia,íamos,íeis,iam'), cpres: L('vá,vás,vá,vamos,vades,vão') },
    vir: { pres: L('venho,vens,vem,vimos,vindes,vêm'), pret: L('vim,vieste,veio,viemos,viestes,vieram'), imp: L('vinha,vinhas,vinha,vínhamos,vínheis,vinham'), s1: 'venh', pp: 'vindo', strong: 1 },
    fazer: { pres: L('faço,fazes,faz,fazemos,fazeis,fazem'), pret: L('fiz,fizeste,fez,fizemos,fizestes,fizeram'), fut: 'far', s1: 'faç', pp: 'feito', strong: 1 },
    dizer: { pres: L('digo,dizes,diz,dizemos,dizeis,dizem'), pret: L('disse,disseste,disse,dissemos,dissestes,disseram'), fut: 'dir', s1: 'dig', pp: 'dito', strong: 1 },
    trazer: { pres: L('trago,trazes,traz,trazemos,trazeis,trazem'), pret: L('trouxe,trouxeste,trouxe,trouxemos,trouxestes,trouxeram'), fut: 'trar', s1: 'trag', strong: 1 },
    poder: { pres: L('posso,podes,pode,podemos,podeis,podem'), pret: L('pude,pudeste,pôde,pudemos,pudestes,puderam'), s1: 'poss', strong: 1 },
    querer: { pres: L('quero,queres,quer,queremos,quereis,querem'), pret: L('quis,quiseste,quis,quisemos,quisestes,quiseram'), cpres: L('queira,queiras,queira,queiramos,queirais,queiram'), strong: 1 },
    saber: { pres: L('sei,sabes,sabe,sabemos,sabeis,sabem'), pret: L('soube,soubeste,soube,soubemos,soubestes,souberam'), cpres: L('saiba,saibas,saiba,saibamos,saibais,saibam'), strong: 1 },
    caber: { pres: L('caibo,cabes,cabe,cabemos,cabeis,cabem'), pret: L('coube,coubeste,coube,coubemos,coubestes,couberam'), s1: 'caib', strong: 1 },
    'pôr': { cls: 'er', pres: L('ponho,pões,põe,pomos,pondes,põem'), pret: L('pus,puseste,pôs,pusemos,pusestes,puseram'), imp: L('punha,punhas,punha,púnhamos,púnheis,punham'), s1: 'ponh', fut: 'por', ger: 'pondo', pp: 'posto', strong: 1 },
    ver: { pres: L('vejo,vês,vê,vemos,vedes,veem'), pret: L('vi,viste,viu,vimos,vistes,viram'), s1: 'vej', pp: 'visto' },
    dar: { pres: L('dou,dás,dá,damos,dais,dão'), pret: L('dei,deste,deu,demos,destes,deram'), cpres: L('dê,dês,dê,dêmos,deis,deem'), strong: 1 },
    ler: { pres: L('leio,lês,lê,lemos,ledes,leem'), pret: L('li,leste,leu,lemos,lestes,leram'), s1: 'lei' },
    crer: { pres: L('creio,crês,crê,cremos,credes,creem'), pret: L('cri,creste,creu,cremos,crestes,creram'), s1: 'crei' },
    rir: { pres: L('rio,ris,ri,rimos,rides,riem'), pret: L('ri,riste,riu,rimos,ristes,riram'), cpres: L('ria,rias,ria,riamos,riais,riam') },
    requerer: { pres: L('requeiro,requeres,requer,requeremos,requereis,requerem'), s1: 'requeir' },
    proibir: { pres: L('proíbo,proíbes,proíbe,proibimos,proibis,proíbem'), cpres: L('proíba,proíbas,proíba,proibamos,proibais,proíbam') },
    reunir: { pres: L('reúno,reúnes,reúne,reunimos,reunis,reúnem'), cpres: L('reúna,reúnas,reúna,reunamos,reunais,reúnam') },
    saudar: { pres: L('saúdo,saúdas,saúda,saudamos,saudais,saúdam'), cpres: L('saúde,saúdes,saúde,saudemos,saudeis,saúdem') },
    ouvir: { s1: 'ouç', note: 'In Portugal hoor je ook oiço / oiça.' },
    pedir: { s1: 'peç' }, medir: { s1: 'meç' }, impedir: { s1: 'impeç' }, despedir: { s1: 'despeç' }, expedir: { s1: 'expeç' },
    perder: { s1: 'perc' }, valer: { s1: 'valh' },
  };

  // Families conjugated like a base verb with a prefix.
  const FAMILIES = {
    ter: W('conter deter entreter manter obter reter suster abster'),
    vir: W('convir intervir provir advir sobrevir'),
    fazer: W('desfazer refazer satisfazer perfazer'),
    dizer: W('contradizer desdizer predizer bendizer maldizer condizer'),
    ver: W('prever rever antever entrever'),
    ler: W('reler'), crer: W('descrer'), rir: W('sorrir'), trazer: W(''),
  };
  // Stem-changing patterns (only -ir verbs, applied on top of the regular paradigm).
  const EI = W('seguir conseguir perseguir prosseguir sentir consentir pressentir ressentir mentir desmentir preferir referir conferir deferir diferir inferir interferir transferir proferir sugerir digerir ingerir ferir gerir aderir servir vestir despir investir revestir repetir competir advertir divertir convergir divergir refletir inserir');
  const EI2 = W('agredir prevenir progredir transgredir denegrir');
  const OU = W('dormir cobrir descobrir encobrir recobrir tossir engolir');
  const UO = W('subir fugir sacudir acudir cuspir consumir sumir bulir entupir escapulir');
  const MARIO = W('mediar ansiar remediar incendiar odiar intermediar');
  const UIR2 = W('construir destruir reconstruir');

  // Irregular past participles.
  const PP = {
    abrir: 'aberto', reabrir: 'reaberto', cobrir: 'coberto', descobrir: 'descoberto', encobrir: 'encoberto', recobrir: 'recoberto',
    escrever: 'escrito', descrever: 'descrito', inscrever: 'inscrito', prescrever: 'prescrito', subscrever: 'subscrito', reescrever: 'reescrito',
    ganhar: 'ganho', gastar: 'gasto', pagar: 'pago',
  };
  // Second (short) participle, used with ser / estar / ficar.
  const PP2 = {
    aceitar: 'aceite', entregar: 'entregue', limpar: 'limpo', salvar: 'salvo', acender: 'aceso', prender: 'preso', eleger: 'eleito',
    imprimir: 'impresso', morrer: 'morto', matar: 'morto', soltar: 'solto', suspender: 'suspenso', expulsar: 'expulso', fritar: 'frito',
    secar: 'seco', encher: 'cheio', extinguir: 'extinto', romper: 'roto', envolver: 'envolto', juntar: 'junto', exprimir: 'expresso',
    despertar: 'desperto', isentar: 'isento', benzer: 'bento',
  };

  const BASEV = { 'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'é': 'e', 'ê': 'e', 'í': 'i', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ú': 'u' };
  const bv = c => BASEV[c] || c;

  // Spelling adjustments at the stem/ending boundary.
  function ortho(stem, end, cls) {
    if (!end) return stem;
    const v = bv(end[0]);
    if (cls === 'ar') {
      if (v === 'e') {
        if (stem.endsWith('ç')) return stem.slice(0, -1) + 'c' + end;
        if (stem.endsWith('c')) return stem.slice(0, -1) + 'qu' + end;
        if (stem.endsWith('g')) return stem.slice(0, -1) + 'gu' + end;
      }
    } else if (v === 'a' || v === 'o') {
      if (stem.endsWith('gu')) return stem.slice(0, -2) + 'g' + end;
      if (stem.endsWith('qu')) return stem.slice(0, -2) + 'c' + end;
      if (stem.endsWith('c')) return stem.slice(0, -1) + 'ç' + end;
      if (stem.endsWith('g')) return stem.slice(0, -1) + 'j' + end;
    }
    return stem + end;
  }
  const isHiatus = st => /[aeiou]$/.test(st) && !/[gq]u$/.test(st);
  function replLast(s, a, b) { const i = s.lastIndexOf(a); return i < 0 ? s : s.slice(0, i) + b + s.slice(i + 1); }

  function regular(inf, withOrtho) {
    const cls = inf.slice(-2), st = inf.slice(0, -2), E = END[cls];
    const j = withOrtho ? (e => ortho(st, e, cls)) : (e => st + e);
    const hi = withOrtho && cls !== 'ar' && isHiatus(st);
    return {
      cls,
      pres: E.pres.map(j), pret: E.pret.map(j), imp: (hi ? HI_IMP : E.imp).map(e => st + e), cpres: E.cpres.map(j),
      fut: FUT.map(e => inf + e), cond: COND.map(e => inf + e),
      ger: inf.slice(0, -1) + 'ndo', pp: st + (cls === 'ar' ? 'ado' : hi ? 'ído' : 'ido'),
    };
  }

  function accentLast(st, strong) {
    const m = { a: 'á', e: strong ? 'é' : 'ê', i: 'í', o: 'ô' }[st.slice(-1)];
    return m ? st.slice(0, -1) + m : st;
  }
  function persInf(inf) {
    const b = inf === 'pôr' ? 'por' : inf;
    let h = b;
    if (/[aeou]ir$/.test(b) && !/[gq]uir$/.test(b)) h = b.slice(0, -2) + 'ír';
    return [inf, h + 'es', inf, b + 'mos', b + 'des', h + 'em'];
  }
  function finish(F, inf, D) {
    D = D || {};
    const st = F.pret[5].replace(/ram$/, '');
    const acc = accentLast(st, D.strong);
    F.mqp = [st + 'ra', st + 'ras', st + 'ra', acc + 'ramos', acc + 'reis', st + 'ram'];
    F.cimp = [st + 'sse', st + 'sses', st + 'sse', acc + 'ssemos', acc + 'sseis', st + 'ssem'];
    const plain = /[aeiou]í$/.test(st) ? st.slice(0, -1) + 'i' : st;
    F.cfut = [plain + 'r', st + 'res', plain + 'r', plain + 'rmos', plain + 'rdes', st + 'rem'];
    F.impa = [null, D.tu || F.pres[2], F.cpres[2], F.cpres[3], D.vos || F.pres[4].replace(/s$/, ''), F.cpres[5]];
    F.impn = [null, F.cpres[1], F.cpres[2], F.cpres[3], F.cpres[4], F.cpres[5]];
    F.infp = persInf(inf);
    return F;
  }

  function patterned(inf) {
    const F = regular(inf, true), cls = F.cls, st = inf.slice(0, -2), E = END[cls], tags = [];
    const set = (arr, idx, stem, ends) => idx.forEach(i => (arr[i] = ortho(stem, ends[i], cls)));
    const hiPret = s => [s + 'í', s + 'íste', s + 'iu', s + 'ímos', s + 'ístes', s + 'íram'];
    if (cls === 'ar') {
      if (/ear$/.test(inf)) { set(F.pres, [0, 1, 2, 5], st + 'i', E.pres); set(F.cpres, [0, 1, 2, 5], st + 'i', E.cpres); tags.push('-ear: e → ei met klemtoon'); }
      else if (MARIO.has(inf)) { const s2 = st.slice(0, -1) + 'ei'; set(F.pres, [0, 1, 2, 5], s2, E.pres); set(F.cpres, [0, 1, 2, 5], s2, E.cpres); tags.push('zoals odiar: i → ei met klemtoon'); }
    } else if (/air$/.test(inf)) {
      F.pres = [st + 'io', st + 'is', st + 'i', st + 'ímos', st + 'ís', st + 'em']; F.pret = hiPret(st);
      F.cpres = E.cpres.map(e => st + 'i' + e); tags.push('-air-werkwoord (zoals sair)');
    } else if (/[^gq]uir$/.test(inf)) {
      F.pres = [st + 'o', st + 'is', st + 'i', st + 'ímos', st + 'ís', st + 'em']; F.pret = hiPret(st);
      if (UIR2.has(inf)) { const s0 = st.slice(0, -1); F.pres[1] = s0 + 'óis'; F.pres[2] = s0 + 'ói'; F.pres[5] = s0 + 'oem'; tags.push('u → ó (constrói)'); }
      else tags.push('-uir-werkwoord (zoals incluir)');
    } else if (/oer$/.test(inf)) {
      const s0 = st.slice(0, -1);
      F.pres = [st + 'o', s0 + 'óis', s0 + 'ói', st + 'emos', st + 'eis', st + 'em'];
      F.pret = [st + 'í', st + 'este', st + 'eu', st + 'emos', st + 'estes', st + 'eram']; tags.push('-oer-werkwoord (zoals roer)');
    } else {
      if (EI.has(inf)) { const s2 = replLast(st, 'e', 'i'); F.pres[0] = ortho(s2, 'o', cls); F.cpres = E.cpres.map(e => ortho(s2, e, cls)); tags.push('e → i bij eu + conjuntivo'); }
      if (EI2.has(inf)) { const s2 = replLast(st, 'e', 'i'); set(F.pres, [0, 1, 2, 5], s2, E.pres); F.cpres = E.cpres.map(e => ortho(s2, e, cls)); tags.push('e → i met klemtoon'); }
      if (OU.has(inf)) { const s2 = replLast(st, 'o', 'u'); F.pres[0] = ortho(s2, 'o', cls); F.cpres = E.cpres.map(e => ortho(s2, e, cls)); tags.push('o → u bij eu + conjuntivo'); }
      if (UO.has(inf)) { const s2 = replLast(st, 'u', 'o'); set(F.pres, [1, 2, 5], s2, E.pres); tags.push('u → o bij tu / ele / eles'); }
      if (/uzir$/.test(inf)) { F.pres[2] = st; tags.push('-uzir: ele produz'); }
    }
    return { F, tags };
  }

  function irregular(inf, D) {
    const cls = D.cls || inf.slice(-2);
    const F = inf === 'pôr' ? { cls } : regular(inf, true);
    if (D.pres) F.pres = D.pres.slice(); else if (D.s1) F.pres[0] = D.s1 + 'o';
    if (D.pret) F.pret = D.pret.slice();
    if (D.imp) F.imp = D.imp.slice();
    if (D.cpres) F.cpres = D.cpres.slice(); else if (D.s1) F.cpres = END[cls].cpres.map(e => D.s1 + e);
    const fs = D.fut || inf;
    F.fut = FUT.map(e => fs + e); F.cond = COND.map(e => fs + e);
    if (D.ger) F.ger = D.ger;
    if (D.pp) F.pp = D.pp;
    return F;
  }

  function familyOf(inf) {
    if (inf !== 'pôr' && /por$/.test(inf) && inf.length > 3) return ['pôr', inf.slice(0, -3)];
    for (const b in FAMILIES) if (FAMILIES[b].has(inf)) return [b, inf.slice(0, inf.length - b.length)];
    return null;
  }

  const CACHE = new Map();
  function conjugate(infRaw) {
    const inf = String(infRaw || '').trim().toLowerCase();
    if (CACHE.has(inf)) return CACHE.get(inf);
    if (!/^[a-zçáéíóúâêôãõ]*(ar|er|ir|or|ôr)$/.test(inf)) return null;
    let F, tags = [], kind = 'regular', base = null, note = null;
    const fam = familyOf(inf);
    if (fam) {
      const [b, pre] = fam; base = b; kind = 'irregular';
      const B = conjugate(b);
      const fix = f => {
        if (f == null) return f;
        if (b === 'pôr' && f === 'pôr') f = 'por';
        if (b === 'ter') { if (f === 'tens') f = 'téns'; else if (f === 'tem') f = 'tém'; }
        if (b === 'vir') { if (f === 'vens') f = 'véns'; else if (f === 'vem') f = 'vém'; }
        return pre + f;
      };
      F = { cls: B.cls };
      SIMPLE.concat(['fut', 'cond']).forEach(k => { F[k] = B[k].map(fix); });
      F.ger = fix(B.ger); F.pp = fix(B.pp);
      if (B.pp2) F.pp2 = fix(B.pp2);
      F.infp = persInf(inf);
      tags.push('zoals ' + b);
    } else if (IRR[inf]) {
      const D = IRR[inf];
      F = finish(irregular(inf, D), inf, D);
      kind = 'irregular'; note = D.note || null;
    } else {
      if (!/(ar|er|ir)$/.test(inf)) return null;
      const r = patterned(inf);
      F = finish(r.F, inf, {});
      tags = r.tags;
      if (tags.length) kind = 'stem';
    }
    if (PP[inf]) F.pp = PP[inf];
    if (PP2[inf]) F.pp2 = PP2[inf];
    if (PP[inf] && kind === 'regular') kind = 'pp';
    const cls = inf === 'pôr' || /por$/.test(inf) ? 'or' : inf.slice(-2);
    // Compound tenses with ter + participle.
    if (inf !== 'ter') {
      const T = conjugate('ter');
      TENSES.filter(t => t.aux).forEach(t => { F[t.k] = T[t.aux].map(a => a + ' ' + F.pp); });
    } else {
      TENSES.filter(t => t.aux).forEach(t => { F[t.k] = F[t.aux].map(a => a + ' ' + F.pp); });
    }
    // Irregularity marks: 0 regular, 1 spelling change, 2 irregular.
    const marks = {};
    if (cls !== 'or') {
      const P = finish(regular(inf, false), inf, {}), O = finish(regular(inf, true), inf, {});
      SIMPLE.forEach(k => {
        marks[k] = F[k].map((f, i) => (f == null ? 0 : f === P[k][i] ? 0 : f === O[k][i] ? 1 : 2));
      });
      marks.ger = F.ger === P.ger ? 0 : F.ger === O.ger ? 1 : 2;
      marks.pp = F.pp === P.pp ? 0 : F.pp === O.pp ? 1 : 2;
      if (kind === 'regular' && SIMPLE.some(k => marks[k].some(m => m === 2))) kind = 'stem';
      if (kind === 'regular' && SIMPLE.some(k => marks[k].some(m => m === 1))) kind = 'spelling';
    }
    const out = Object.assign(F, { inf, cls, kind, tags, base, note, marks });
    CACHE.set(inf, out);
    return out;
  }

  function form(inf, tense, person) {
    const F = conjugate(inf);
    if (!F) return null;
    if (tense === 'ger' || tense === 'pp' || tense === 'inf') return tense === 'inf' ? inf : F[tense];
    return F[tense] ? F[tense][person] : null;
  }

  // Reverse index: form -> [{inf, t, p}]
  function buildIndex(infs) {
    const idx = new Map();
    const add = (f, e) => { if (!f) return; const k = f.toLowerCase(); let a = idx.get(k); if (!a) idx.set(k, (a = [])); if (!a.some(x => x.inf === e.inf && x.t === e.t && x.p === e.p)) a.push(e); };
    infs.forEach(inf => {
      const F = conjugate(inf); if (!F) return;
      add(inf, { inf, t: 'inf' });
      SIMPLE.forEach(k => F[k].forEach((f, p) => add(f, { inf, t: k, p })));
      add(F.ger, { inf, t: 'ger' }); add(F.pp, { inf, t: 'pp' }); if (F.pp2) add(F.pp2, { inf, t: 'pp' });
    });
    return idx;
  }

  /* ---------------- English ---------------- */
  const EN_IRR = {};
  ('arise arose arisen|awake awoke awoken|be was been|bear bore borne|beat beat beaten|become became become|begin began begun|bend bent bent|bet bet bet|bite bit bitten|bleed bled bled|blow blew blown|break broke broken|bring brought brought|build built built|buy bought bought|catch caught caught|choose chose chosen|come came come|cost cost cost|creep crept crept|cut cut cut|deal dealt dealt|dig dug dug|do did done|draw drew drawn|drink drank drunk|drive drove driven|eat ate eaten|fall fell fallen|feed fed fed|feel felt felt|fight fought fought|find found found|flee fled fled|fly flew flown|forbid forbade forbidden|forget forgot forgotten|forgive forgave forgiven|foresee foresaw foreseen|freeze froze frozen|get got got|give gave given|go went gone|grow grew grown|hang hung hung|have had had|hear heard heard|hide hid hidden|hit hit hit|hold held held|hurt hurt hurt|keep kept kept|kneel knelt knelt|know knew known|lay laid laid|lead led led|leave left left|lend lent lent|let let let|light lit lit|lose lost lost|make made made|mean meant meant|meet met met|mistake mistook mistaken|overcome overcame overcome|pay paid paid|put put put|quit quit quit|read read read|ride rode ridden|ring rang rung|rise rose risen|run ran run|say said said|see saw seen|seek sought sought|sell sold sold|send sent sent|set set set|sew sewed sewn|shake shook shaken|shine shone shone|shoot shot shot|show showed shown|shrink shrank shrunk|shut shut shut|sing sang sung|sink sank sunk|sit sat sat|sleep slept slept|slide slid slid|speak spoke spoken|spend spent spent|spin spun spun|split split split|spread spread spread|stand stood stood|steal stole stolen|stick stuck stuck|sting stung stung|stink stank stunk|strike struck struck|swear swore sworn|sweep swept swept|swim swam swum|swing swung swung|take took taken|teach taught taught|tear tore torn|tell told told|think thought thought|throw threw thrown|understand understood understood|undo undid undone|upset upset upset|wake woke woken|wear wore worn|weep wept wept|win won won|wind wound wound|withdraw withdrew withdrawn|write wrote written|broadcast broadcast broadcast|forecast forecast forecast|undergo underwent undergone|lie lied lied')
    .split('|').forEach(s => { const [b, p, pp] = s.split(' '); EN_IRR[b] = [p, pp]; });
  const DOUBLE2 = W('admit begin commit control equip forget occur omit permit prefer refer regret submit transfer upset compel expel propel rebel deter patrol');
  const vowelGroups = w => (w.match(/[aeiou]+/g) || []).length;
  function cvc(w) {
    if (DOUBLE2.has(w)) return true;
    if (/[aeiou]l$/.test(w) && !/(ee|oo|ea|ai|oi|ou|au|ei|ie|ue)l$/.test(w) && vowelGroups(w) >= 2) return true; // BrE: travelled
    const q = w.replace(/qu/g, 'q');
    return vowelGroups(q) === 1 && /(^|[^aeiou])[aeiou][bcdfgklmnprstvz]$/.test(q);
  }
  function en1(b, f) {
    if (f === 's') {
      if (b === 'be') return 'is'; if (b === 'have') return 'has';
      if (/(s|x|z|ch|sh|o)$/.test(b) && b !== 'go' && b !== 'do') return b + 'es';
      if (b === 'go') return 'goes'; if (b === 'do') return 'does';
      if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + 'ies';
      return b + 's';
    }
    if (f === 'ing') {
      if (b === 'be') return 'being';
      if (/ie$/.test(b)) return b.slice(0, -2) + 'ying';
      if (/[^eoy]e$/.test(b) && b !== 'be') return b.slice(0, -1) + 'ing';
      if (cvc(b)) return b + b.slice(-1) + 'ing';
      return b + 'ing';
    }
    if (f === 'past' || f === 'pp') {
      if (EN_IRR[b]) return EN_IRR[b][f === 'past' ? 0 : 1];
      if (/e$/.test(b)) return b + 'd';
      if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + 'ied';
      if (cvc(b)) return b + b.slice(-1) + 'ed';
      return b + 'ed';
    }
    return b;
  }
  // Inflect the first word of a (possibly multi-word) English verb phrase.
  function en(base, f) {
    if (!base) return '';
    if (base === 'lie down') return { s: 'lies down', ing: 'lying down', past: 'lay down', pp: 'lain down' }[f] || base;
    const parts = base.split(' ');
    parts[0] = en1(parts[0], f);
    return parts.join(' ');
  }
  function enBase(gloss) {
    const g = String(gloss || '').split(/[;,]/)[0].trim();
    const m = g.match(/^to ([a-z][a-z ']*)/i);
    return m ? m[1].replace(/\s*\(.*$/, '').trim() : null;
  }

  /* ---------------- Text helpers ---------------- */
  const stripAccents = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
  const EN_CONTR = {
    "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are',
    "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "don't": 'do not', "doesn't": 'does not', "didn't": 'did not',
    "won't": 'will not', "can't": 'can not', cannot: 'can not', "couldn't": 'could not', "wouldn't": 'would not', "shouldn't": 'should not',
    "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not', "i've": 'i have', "you've": 'you have', "we've": 'we have', "they've": 'they have',
    "i'll": 'i will', "you'll": 'you will', "he'll": 'he will', "she'll": 'she will', "it'll": 'it will', "we'll": 'we will', "they'll": 'they will',
    "i'd": 'i would', "you'd": 'you would', "he'd": 'he would', "she'd": 'she would', "we'd": 'we would', "they'd": 'they would',
    "let's": 'let us', "that's": 'that is', "there's": 'there is', "what's": 'what is', "where's": 'where is', "who's": 'who is', "how's": 'how is', "here's": 'here is',
  };
  const EN_SPELL = {
    color: 'colour', colors: 'colours', favorite: 'favourite', favorites: 'favourites', center: 'centre', theater: 'theatre', gray: 'grey', mom: 'mum',
    neighbor: 'neighbour', neighbors: 'neighbours', traveled: 'travelled', traveling: 'travelling', canceled: 'cancelled', canceling: 'cancelling',
    practice: 'practise', practices: 'practises', practiced: 'practised', practicing: 'practising', organize: 'organise', organized: 'organised',
    realize: 'realise', realized: 'realised', recognize: 'recognise', recognized: 'recognised', apologize: 'apologise', memorize: 'memorise',
    analyze: 'analyse', summarize: 'summarise', burnt: 'burned', learnt: 'learned', dreamt: 'dreamed', spelt: 'spelled', smelt: 'smelled',
    spoilt: 'spoiled', leapt: 'leaped', spilt: 'spilled', okay: 'ok', 'o.k.': 'ok', cellphone: 'mobile', cell: 'mobile', apartment: 'flat',
  };
  // Dutch: short forms and the informal / stressed pronoun pairs count as the same word
  const NL_SAME = { "'t": 'het', "m'n": 'mijn', "z'n": 'zijn', "d'r": 'haar', jij: 'je', jou: 'je', jouw: 'je', wij: 'we', zij: 'ze', mij: 'me', hullie: 'zij', ok: 'oké', okay: 'oké' };
  function normalize(s, lang) {
    let t = String(s || '').normalize('NFC').toLowerCase()
      .replace(/[’‘`´]/g, "'").replace(/[“”«»"]/g, '').replace(/[–—]/g, ' ')
      .replace(/[.,!?;:¿¡…()]/g, ' ').replace(/\s+/g, ' ').trim();
    if (lang === 'nl') {
      t = t.split(' ').map(w => NL_SAME[w] || w).join(' ');
    } else if (lang === 'en') {
      t = t.split(' ').map(w => EN_CONTR[w] || w).join(' ').split(' ').map(w => EN_SPELL[w] || w).join(' ');
    } else {
      t = t.replace(/\s*-\s*/g, '-');
    }
    return t;
  }
  // Edit distance where swapping two neighbouring letters counts as one typo.
  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    const d = Array.from({ length: m + 1 }, (_, i) => { const r = new Array(n + 1).fill(0); r[0] = i; return r; });
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[m][n];
  }
  const ARTICLES_EN = /\b(the|a|an)\b/g;
  const ARTICLES_NL = /(^| )(de|het|een|'t)(?= |$)/g;

  /* Compare an answer with a list of accepted answers.
     opts: { lang:'pt'|'en', strict:bool (accents count), typos:bool, isWord:(w)=>bool } */
  function check(input, answers, opts) {
    opts = opts || {};
    const lang = opts.lang || 'pt';
    const inp = normalize(input, lang);
    const list = (Array.isArray(answers) ? answers : [answers]).filter(Boolean);
    if (!inp) return { ok: false, kind: 'empty', best: list[0] || '' };
    let best = list[0] || '', bestD = Infinity;
    for (const a of list) {
      const n = normalize(a, lang);
      if (n === inp) return { ok: true, kind: 'exact', best: a };
      const d = lev(stripAccents(n), stripAccents(inp)); if (d < bestD) { bestD = d; best = a; }
    }
    const loose = s => stripAccents(normalize(s, lang)).replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
    const li = loose(input);
    for (const a of list) {
      if (loose(a) === li) {
        const accentOnly = stripAccents(normalize(a, lang)) === stripAccents(inp);
        return { ok: !opts.strict, kind: accentOnly ? 'accent' : 'hyphen', best: a };
      }
    }
    if (lang === 'en' || lang === 'nl') {
      const na = s => loose(s).replace(lang === 'nl' ? ARTICLES_NL : ARTICLES_EN, ' ').replace(/\s+/g, ' ').trim();
      for (const a of list) if (na(a) === na(input)) return { ok: true, kind: 'article', best: a };
    }
    if (opts.typos !== false) {
      for (const a of list) {
        const A = loose(a).split(' '), I = li.split(' ');
        if (A.length !== I.length) continue;
        let typos = 0, bad = false;
        for (let i = 0; i < A.length && !bad; i++) {
          if (A[i] === I[i]) continue;
          const d = lev(A[i], I[i]);
          if (d === 1 && A[i].length >= 5 && !(opts.isWord && opts.isWord(I[i]))) typos++;
          else bad = true;
        }
        const limit = A.join(' ').length >= 24 ? 2 : 1;
        if (!bad && typos && typos <= limit) return { ok: true, kind: 'typo', best: a };
      }
    }
    return { ok: false, kind: 'wrong', best };
  }

  // Word diff for feedback: returns [{w, ok}] for the expected sentence, marking words the learner missed.
  function diff(input, expected, lang) {
    const toks = s => normalize(s, lang).split(' ').filter(Boolean);
    const I = toks(input).map(stripAccents), E = String(expected).split(/\s+/).filter(Boolean);
    const En = E.map(w => stripAccents(normalize(w, lang)));
    const m = En.length, n = I.length, dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = En[i] === I[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const out = []; let i = 0, j = 0;
    while (i < m) {
      if (j < n && En[i] === I[j]) { out.push({ w: E[i], ok: true }); i++; j++; }
      else if (j < n && dp[i][j + 1] >= dp[i + 1][j]) j++;
      else { out.push({ w: E[i], ok: false }); i++; }
    }
    return out;
  }

  function slug(s) { return stripAccents(String(s)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function shuffle(a, rnd) { rnd = rnd || Math.random; const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  function pick(a, rnd) { return a[Math.floor((rnd || Math.random)() * a.length)]; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  return {
    PERSONS, PRON, TENSES, TENSE, SIMPLE, IRR, FAMILIES, PP, PP2,
    conjugate, form, buildIndex, ortho,
    en, enBase, EN_IRR,
    normalize, stripAccents, lev, check, diff, slug, shuffle, pick, cap,
  };
});
