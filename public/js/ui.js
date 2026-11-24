/* Azulejo · views, router and little UI helpers (interface in Dutch). */
(function () {
  'use strict';
  const AZ = window.AZ, E = AZ.E, G = AZ.G, esc = AZ.esc, I = AZ.icon;
  const $ = (s, r = document) => r.querySelector(s);
  const main = () => $('#main');
  const PERS = ['eu', 'tu', 'ele/ela', 'nós', 'vós', 'eles/elas'];

  /* ---------------- Tap-to-translate ---------------- */
  const SMALL = {
    do: 'de + o · van de', da: 'de + a · van de', dos: 'de + os · van de', das: 'de + as · van de', no: 'em + o · in / op de', na: 'em + a · in / op de',
    nos: 'em + os · in de; ons', nas: 'em + as · in de', num: 'em + um · in een', numa: 'em + uma · in een', ao: 'a + o · naar / aan de', à: 'a + a · naar / aan de', aos: 'a + os · naar de',
    às: 'a + as · naar / om', pelo: 'por + o · door / via de', pela: 'por + a · door / via de', deste: 'de + este · van deze', desta: 'de + esta · van deze', neste: 'em + este · in deze',
    nesta: 'em + esta · in deze', naquele: 'em + aquele · in die', daquele: 'de + aquele · van die', disso: 'de + isso · daarvan', nisso: 'em + isso · daarin', daí: 'daarvandaan; dus',
    o: 'de / het (m.); hem, het', a: 'de / het (v.); haar, het; naar', os: 'de (m. mv.); hen', as: 'de (v. mv.); hen', um: 'een', uma: 'een', uns: 'een paar', umas: 'een paar',
    que: 'dat, die; wat; dan', se: 'als, of; zich', lhe: 'hem / haar / u (meewerkend)', lhes: 'hun (meewerkend)', me: 'mij, me', te: 'jou, je', lo: 'hem, het', la: 'haar, het', los: 'ze', las: 'ze',
    é: 'is (ser)', cá: 'hier', lá: 'daar', mais: 'meer', muito: 'heel; veel', muita: 'veel', muitos: 'veel', muitas: 'veel', toda: 'hele, alle', todos: 'allemaal, iedereen', todas: 'allemaal',
  };
  AZ.lookup = function (w, gloss) {
    if (!w) return null;
    const k = w.toLowerCase().replace(/^[^\p{L}]+|[^\p{L}-]+$/gu, '');
    if (!k) return null;
    if (gloss && gloss[k]) return gloss[k];
    const out = [];
    const ids = AZ.formIndex.get(k);
    if (ids) { const e = AZ.word(ids[0]); if (e) out.push(`${AZ.withArt(e)} — ${AZ.glossShort(e.en)}`); }
    const vs = AZ.verbIndex().get(k);
    if (vs && vs.length && !(ids && /^(é|há)$/.test(k))) {
      const v = vs[0], T = E.TENSE[v.t], vb = AZ.verbBy.get(v.inf);
      const what = v.t === 'inf' ? 'infinitief' : v.t === 'pp' ? 'voltooid deelwoord' : v.t === 'ger' ? 'gerúndio' : `${T ? T.pt.toLowerCase() : v.t}, ${PERS[v.p]}`;
      out.push(`${v.inf} (${what}) — ${vb ? AZ.glossShort(vb.en) : ''}`);
    }
    if (!out.length && SMALL[k]) out.push(SMALL[k]);
    if (!out.length && k.includes('-')) {
      const parts = k.split('-'); const head = parts[0];
      const tries = [head, head + 's', head + 'r', head.replace(/á$/, 'ar').replace(/ê$/, 'er').replace(/i$/, 'ir').replace(/ô$/, 'or'), head + 'z'];
      for (const t of tries) { const r = AZ.lookup(t); if (r) { out.push(r.split(' — ')[0] + ' + ' + parts.slice(1).join('-') + ' — ' + (r.split(' — ')[1] || '')); break; } }
    }
    return out.length ? out.join(' · ') : null;
  };
  let tip = null;
  function showTip(el, text) {
    if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('role', 'tooltip'); document.body.appendChild(tip); }
    tip.innerHTML = esc(text);
    const r = el.getBoundingClientRect();
    tip.style.display = 'block';
    const tw = tip.offsetWidth, x = Math.max(8, Math.min(window.innerWidth - tw - 8, r.left + r.width / 2 - tw / 2));
    tip.style.left = x + 'px'; tip.style.top = (r.top + window.scrollY - tip.offsetHeight - 8) + 'px';
    if (r.top - tip.offsetHeight - 8 < 0) tip.style.top = (r.bottom + window.scrollY + 8) + 'px';
    clearTimeout(tip._t); tip._t = setTimeout(hideTip, 4000);
  }
  function hideTip() { if (tip) tip.style.display = 'none'; }
  document.addEventListener('scroll', hideTip, true);

  /* ---------------- Toast, confetti, modal ---------------- */
  AZ.toast = function (msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2800);
  };
  AZ.confetti = function () {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('div'); c.className = 'confetti';
    const cols = ['#1f4fa8', '#ffc93c', '#e63946', '#2fb344', '#8b55d9', '#3d7be0'];
    for (let i = 0; i < 70; i++) { const s = document.createElement('i'); s.style.left = Math.random() * 100 + '%'; s.style.background = cols[i % cols.length]; s.style.animationDelay = Math.random() * 0.5 + 's'; s.style.animationDuration = 1.6 + Math.random() * 1.4 + 's'; s.style.transform = `rotate(${Math.random() * 360}deg)`; c.appendChild(s); }
    document.body.appendChild(c); setTimeout(() => c.remove(), 3600);
  };
  AZ.modal = function (html, onAct) {
    const m = $('#modal'); m.innerHTML = `<div class="m-back" data-act="m-close"></div><div class="m-card" role="dialog" aria-modal="true">${html}</div>`; m.hidden = false;
    m._on = onAct; setTimeout(() => { const f = m.querySelector('button, input, textarea, select'); f && f.focus(); }, 30);
  };
  AZ.closeModal = () => { const m = $('#modal'); if (!m.hidden) AZ.stopSpeech(); m.hidden = true; m.innerHTML = ''; };
  const closeBtn = () => `<button class="icon-btn m-x" data-act="m-close" aria-label="Sluiten">${I('x')}</button>`;
  const sayBtn = (text, cls = 'sm', label = 'Luister') => (AZ.canSpeak() ? `<button class="say ${cls}" data-act="say" data-text="${esc(text)}" aria-label="${esc(label)}">${I('speaker')}</button>` : '');
  AZ.wordPopup = function (id) {
    const e = AZ.word(id); if (!e) return;
    const sr = AZ.S.srs['w:' + id];
    const st = sr ? AZ.stageOf(sr[0]) : null;
    const sents = AZ.sentsWithWord(id, 99).slice(0, 3);
    AZ.modal(`${closeBtn()}
      <div class="wcard">${AZ.picHTML(e.pic, 'xl')}<h3 class="pt">${esc(AZ.withArt(e))} ${sayBtn(AZ.article(e) + e.pt, '')}</h3>
      <p>${esc(e.en)}</p>${e.note ? `<p class="t-note">${I('bulb')} ${esc(e.note)}</p>` : ''}
      ${st ? `<p><span class="stage-pill" style="--sc:${st.color}">${st.pt} · ${st.en}</span></p>` : `<p class="muted small">Nog niet in je herhalingen.</p>`}
      ${sents.length ? `<div class="ex-list">${sents.map(s => `<p>${sayBtn(s.pt)}<span class="pt">${esc(s.pt)}</span><br><small class="muted">${esc(s.en)}</small></p>`).join('')}</div>` : ''}
      ${!sr ? `<button class="btn primary" data-act="add-word" data-id="${esc(id)}">${I('plus')} Toevoegen aan mijn herhalingen</button>` : ''}</div>`);
  };

  /* ---------------- Shell bits ---------------- */
  function syncLabel() {
    const R = AZ.Remote;
    if (R.mode === 'cloud') { const u = AZ.Account && AZ.Account.user(); return { icon: 'cloud', txt: R.status === 'error' ? 'Fout bij synchroniseren' : R.status === 'syncing' ? 'Synchroniseren…' : u ? 'Opgeslagen bij ' + u : 'Gesynchroniseerd — nog geen account', cls: R.status }; }
    if (R.mode === 'claude') return { icon: 'cloud', txt: R.status === 'error' ? 'Fout bij opslaan' : R.status === 'syncing' ? 'Opslaan…' : 'Opgeslagen in je account', cls: R.status };
    return { icon: 'device', txt: 'Opgeslagen op dit apparaat', cls: 'local' };
  }
  // which menu item a page belongs to (the phone menu groups the reference pages under "Naslag")
  const NAV = { verb: 'verbs', deck: 'words', story: 'read', gym: 'practice', ch: 'course', learn: 'course', guide: 'course', review: 'practice', grammar: 'grammar' };
  const REF = ['verbs', 'words', 'grammar', 'ref'];
  function renderChrome() {
    const due = AZ.dueList().length, s = AZ.streak(), xp = AZ.todayXP(), goal = AZ.S.settings.goal;
    const h = location.hash.slice(1).split('-')[0] || 'course';
    const cur = NAV[h] || h;
    document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === cur || (a.dataset.nav === 'ref' && REF.includes(cur))));
    document.querySelectorAll('.due-badge').forEach(b => { b.textContent = due > 99 ? '99+' : due; b.hidden = !due; });
    document.querySelectorAll('.streak-n').forEach(b => (b.textContent = s));
    document.querySelectorAll('.xp-n').forEach(b => (b.textContent = xp));
    document.querySelectorAll('.streak-chip').forEach(b => b.classList.toggle('lit', xp > 0));
    const pct = Math.min(100, Math.round(100 * xp / goal));
    document.querySelectorAll('.goal-ring').forEach(r => r.style.setProperty('--p', pct));
    const rail = $('#rail'); if (rail && getComputedStyle(rail).display !== 'none') rail.innerHTML = railHTML();
    const sl = syncLabel();
    document.querySelectorAll('.sync-chip').forEach(c => { c.innerHTML = `${I(sl.icon)}<span>${sl.txt}</span>`; c.className = 'sync-chip ' + sl.cls; });
  }
  function railHTML() {
    const due = AZ.dueList().length, fc = AZ.forecast(12), max = Math.max(1, ...fc);
    const goal = AZ.S.settings.goal, xp = AZ.todayXP(), pct = Math.min(100, Math.round(100 * xp / goal));
    const cu = AZ.currentChapter(), w = wordOfDay();
    const np = cu && AZ.nextPart(cu);
    return `<section class="card rail-card"><div class="row"><div class="goal-ring big" style="--p:${pct}"><span>${xp}<small>/${goal}</small></span></div><div><h3>Punten vandaag</h3><p class="muted small">${xp >= goal ? 'Dagdoel gehaald — boa!' : `Nog ${goal - xp} tot je dagdoel`}</p><p class="streak-line">${I('flame')} <b>${AZ.streak()}</b> ${AZ.streak() === 1 ? 'dag' : 'dagen'} op rij</p></div></div></section>
      ${cu ? `<a class="card rail-card rail-ch" href="#ch-${cu.id}${np ? '-' + (np.k + 1) : ''}"><span class="kicker">Hoofdstuk ${cu.n}${np ? ` · deel ${np.k + 1}/${cu.parts.length}` : ''}</span><b>${esc(cu.pt)}</b><span class="muted small">${esc(np ? np.title : cu.en)}</span></a>` : ''}
      <section class="card rail-card"><h3>${I('cards')} Herhalen</h3><p class="big-n">${due}<small> klaar</small></p>
        <div class="fc" aria-label="Herhalingen in de komende 12 uur">${fc.map((n, i) => `<i style="--h:${Math.round(100 * n / max)}%" title="${n} over ${i} uur"></i>`).join('')}</div><p class="muted small">komende 12 uur</p>
        ${due ? `<button class="btn primary full" data-act="reviews">Start herhalingen</button>` : `<a class="btn ghost full" href="#practice">Oefenen</a>`}</section>
      ${w ? `<section class="card rail-card wotd"><h3>Woord van de dag</h3>${AZ.picHTML(w.pic, 'lg')}<p class="pt big">${esc(AZ.withArt(w))} ${sayBtn(AZ.article(w) + w.pt)}</p><p class="muted">${esc(AZ.glossShort(w.en))}</p></section>` : ''}
      <p class="sync-chip-wrap"><a class="sync-chip" href="#me"></a></p>`;
  }
  function dayHash(n) { const d = AZ.today(); let h = 0; for (const c of d) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % n; }
  function wordOfDay() { const all = [...G.LEX.values()].filter(e => /^(m|f)$/.test(e.type) && e.pic && e.pic[0] !== '#'); return all.length ? all[dayHash(all.length)] : null; }

  /* ---------------- Course: contents and where you are ---------------- */
  function greet() { const h = new Date().getHours(); return h < 13 ? 'Bom dia' : h < 20 ? 'Boa tarde' : 'Boa noite'; }
  function chStatus(u) {
    const r = AZ.chRec(u) || {}, cu = AZ.currentChapter(), n = u.parts.length, d = AZ.partsDone(u);
    if (r.done) return { cls: 'done', txt: I('check') };
    if (cu === u) return { cls: 'cur', txt: d ? `${d}/${n}` : 'nu' };
    if (d) return { cls: 'seen', txt: `${d}/${n}` };
    return { cls: '', txt: '' };
  }
  function viewCourse() {
    const cu = AZ.currentChapter(), due = AZ.dueList().length;
    const name = AZ.S.settings.name ? ', ' + esc(AZ.S.settings.name) : '';
    let html = `<header class="page-head"><h1>${greet()}${name}!</h1><p class="muted">Jouw cursus Europees-Portugees: ${AZ.units.length} hoofdstukken van A1 tot B1, elk in korte delen met een toets.</p></header>`;
    if (cu) {
      const np = AZ.nextPart(cu) || cu.parts[0], d = AZ.partsDone(cu);
      html += `<section class="card continue c${cu.s}">
        <div class="cont-main"><span class="kicker">${d ? 'Ga verder' : 'Volgende'} · Hoofdstuk ${cu.n} · ${esc(cu.lv.code)}</span><h2>${esc(cu.pt)}</h2><p class="muted">${esc(cu.en)}</p>
          <div class="part-dots" aria-label="${d} van ${cu.parts.length} delen klaar">${cu.parts.map(P => `<i class="${AZ.partDone(cu, P.k) ? 'on' : P === np ? 'cur' : ''}"></i>`).join('')}<span>Deel ${np.k + 1} van ${cu.parts.length}: ${esc(np.title)}</span></div>
          <a class="btn primary" href="#ch-${cu.id}-${np.k + 1}">${I('book')} ${d || (AZ.chRec(cu) || {}).seen ? 'Verder met deel ' + (np.k + 1) : 'Begin het hoofdstuk'}</a></div>
        <div class="cont-n" aria-hidden="true">${cu.n}</div></section>`;
    } else html += `<section class="card continue"><div class="cont-main"><span class="kicker">Parabéns!</span><h2>Je hebt alle hoofdstukken af</h2><p class="muted">Blijf je herhalingen doen en oefen elk hoofdstuk opnieuw wanneer je wilt.</p></div></section>`;
    if (AZ.Account && AZ.Account.available() && !AZ.Account.user() && AZ.S.xp > 0) html += `<a class="card save-nudge" href="#me">${I('cloud')}<span><b>Bewaar je voortgang in een account</b><small>Ga op elk apparaat verder waar je gebleven was.</small></span>${I('chev')}</a>`;
    html += `<div class="quick2">
      <button class="card act-card" data-act="reviews" ${due ? '' : 'disabled'}>${I('cards')}<b>${due ? due + ' herhaling' + (due === 1 ? '' : 'en') : 'Herhalen'}</b><span>${due ? 'staan klaar' : 'alles gedaan'}</span></button>
      <a class="card act-card" href="#practice">${I('bolt')}<b>Oefenen</b><span>schrijven en vervoegen</span></a></div>`;
    html += `<div class="toc">`;
    AZ.sections.forEach(sec => {
      const us = AZ.units.filter(u => u.s === sec.id), doneN = us.filter(AZ.chDone).length;
      html += `<section class="level c${sec.id}"><header class="level-head"><span class="lvl">${esc(sec.level)}</span><div><h2>${esc(sec.pt)}</h2><p class="muted">${esc(sec.en)} · ${doneN}/${us.length} af</p></div><div class="sec-bar"><span style="width:${Math.round(100 * doneN / us.length)}%"></span></div></header>
        <ol class="ch-list">${us.map(u => { const st = chStatus(u); return `<li><a class="ch-row ${st.cls}" href="#ch-${u.id}"><span class="ch-n">${u.n}</span><span class="ch-t"><b>${esc(u.pt)}</b><small>${esc(u.en)}</small></span><span class="ch-meta">${st.txt}</span>${I('chev')}</a></li>`; }).join('')}</ol></section>`;
    });
    html += `</div><a class="card ref-link" href="#ref">${I('gram')}<span><b>Naslag</b><small>Grammatica, werkwoorden en woorden — alles om op te zoeken</small></span>${I('chev')}</a>`;
    main().innerHTML = html;
  }

  /* ---------------- Reference: grammar, verbs, words ---------------- */
  const GR = () => window.AZ_GRAMMAR || { groups: [], t: {}, chapters: {}, tenses: {} };
  // the switch at the top of the three reference pages
  function refSwitch(cur) {
    return `<nav class="ref-switch" aria-label="Naslag">${[['grammar', 'Grammatica', 'gram'], ['verbs', 'Werkwoorden', 'verbs'], ['words', 'Woorden', 'grid']].map(([k, l, ic]) => `<a href="#${k}" class="${cur === k ? 'on' : ''}" ${cur === k ? 'aria-current="page"' : ''}>${I(ic)}<span>${l}</span></a>`).join('')}</nav>`;
  }
  function viewRef() {
    const G = GR();
    main().innerHTML = `<h1 class="page-t">Naslag <small>Alles om op te zoeken</small></h1>
      <div class="ref-hub">
        <a class="card hub-card" href="#grammar">${I('gram', 'hub-i')}<span><b>Grammatica</b><small>Elke regel in gewoon Nederlands: de personen, vós, alle tijden, voornaamwoorden en meer · ${G.groups.reduce((a, g) => a + g.topics.length, 0)} onderwerpen</small></span>${I('chev')}</a>
        <a class="card hub-card" href="#verbs">${I('verbs', 'hub-i')}<span><b>Werkwoorden</b><small>Alle tijden van ${AZ.verbs.length} werkwoorden, om te lezen en te beluisteren</small></span>${I('chev')}</a>
        <a class="card hub-card" href="#words">${I('grid', 'hub-i')}<span><b>Woorden</b><small>${AZ.decks.length} thema's, ${AZ.G.LEX.size} woorden met lidwoord</small></span>${I('chev')}</a>
      </div>
      <section class="card"><h2>De tijden in één oogopslag</h2><div class="tense-guide">${E.TENSES.filter(t => !t.aux || t.k === 'ppc' || t.k === 'mqpc').map(t => { const g = G.tenses[t.k]; return `<details><summary><b>${esc(t.pt)}</b> <span class="muted">${esc(t.en)}</span></summary><p>${esc(t.use)}</p>${g ? `<p><a class="glink" href="#grammar-${g}">Hoe je hem maakt en wanneer je hem gebruikt ${I('chev')}</a></p>` : ''}</details>`; }).join('')}</div></section>`;
  }
  function gramOrder() { return GR().groups.flatMap(g => g.topics.map(id => ({ id, g }))).filter(x => GR().t[x.id]); }
  function gramChapters(id) { const C = GR().chapters; return AZ.units.filter(u => (C[u.id] || []).includes(id)); }
  let gramQ = '';
  function viewGrammar(anchor) {
    const G = GR(), q = E.stripAccents(gramQ.trim().toLowerCase());
    const hit = id => { if (!q) return true; const T = G.t[id]; return E.stripAccents((T.pt + ' ' + T.en + ' ' + T.text).toLowerCase()).includes(q); };
    main().innerHTML = `${refSwitch('grammar')}<h1 class="page-t">Grammatica <small>Elke regel, elke vorm</small></h1>
      <section class="card gram-intro"><p>De hoofdstukken leren je alles stukje bij beetje. Hier staat alles bij elkaar: zoek het op wanneer je wilt. Nieuw met grammaticawoorden? Begin met <a class="glink" href="#grammar-terms">grammaticawoorden</a>, daarna <a class="glink" href="#grammar-persons">de personen</a> en <a class="glink" href="#grammar-vos">vós</a>.</p>
        <label class="search">${I('search')}<input id="gq" type="search" placeholder="Zoek: vós, meervoud, lhe, quando, há…" value="${esc(gramQ)}" autocomplete="off" spellcheck="false"></label></section>
      ${G.groups.map(g => { const ts = g.topics.filter(id => G.t[id] && hit(id)); return ts.length ? `<section class="gram-group" id="g-${g.id}"><h2>${esc(g.pt)} <small class="muted">${esc(g.en)}</small></h2><div class="gram-grid">${ts.map(id => { const T = G.t[id], chs = gramChapters(id); return `<a class="card gram-topic" href="#grammar-${id}"><b>${esc(T.pt)}</b><span>${esc(T.en)}</span>${chs.length ? `<small class="muted">Hoofdstuk ${chs.slice(0, 3).map(u => u.n).join(', ')}</small>` : ''}</a>`; }).join('')}</div></section>` : ''; }).join('') || `<p class="muted">Niets gevonden voor “${esc(gramQ)}”.</p>`}`;
    const inp = $('#gq'); inp.addEventListener('input', () => { gramQ = inp.value; clearTimeout(inp._t); inp._t = setTimeout(() => { const pos = inp.selectionStart; viewGrammar(); const n = $('#gq'); n.focus(); n.setSelectionRange(pos, pos); }, 180); });
    if (anchor) { const el = $('#g-' + anchor); if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 0); }
  }
  function viewGrammarTopic(id) {
    const G = GR(), T = G.t[id]; if (!T) { location.replace('#grammar'); return; }
    const order = gramOrder(), i = order.findIndex(x => x.id === id), grp = order[i].g, prev = order[i - 1], nxt = order[i + 1];
    const chs = gramChapters(id);
    main().innerHTML = `<a class="back" href="#grammar">${I('back')} Grammatica</a>
      <article class="chapter gram">
        <header class="ch-head"><span class="kicker">Grammatica · ${esc(grp.pt)}</span><h1>${esc(T.pt)}</h1><p class="sub">${esc(T.en)}</p></header>
        <section class="book">${md(T.text)}</section>
        ${chs.length ? `<aside class="gram-box"><h3>${I('book')} In de cursus</h3><p class="muted small">De hoofdstukken waarin dit voorkomt, met voorbeelden, teksten en oefeningen.</p><div class="gram-links">${chs.map(u => `<a href="#ch-${u.id}"><b>${u.n}. ${esc(u.pt)}</b><small>${esc(u.en)}${AZ.chDone(u) ? ' · af' : ''}</small>${I('chev')}</a>`).join('')}</div></aside>` : ''}
      </article>
      <nav class="pager">${prev ? `<a href="#grammar-${prev.id}">${I('back')} ${esc(G.t[prev.id].pt)}</a>` : '<span></span>'}${nxt ? `<a href="#grammar-${nxt.id}">${esc(G.t[nxt.id].pt)} ${I('chev')}</a>` : ''}</nav>`;
  }

  /* ---------------- The course book's little markup (see data/book.js) ---------------- */
  // [[vos]], [[vos|text]], [[u17]]: links to a grammar topic or a chapter
  function linkTo(id, text) {
    if (/^u\d+$/.test(id)) { const u = AZ.units.find(x => x.id === id); return u ? `<a class="glink" href="#ch-${id}">${text || 'hoofdstuk ' + u.n}</a>` : esc(text || id); }
    const T = GR().t[id]; return T ? `<a class="glink" href="#grammar-${id}">${text || esc(T.pt)}</a>` : (text || esc(id));
  }
  function inline(s) {
    return esc(s).replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (m, id, tx) => linkTo(id, tx))
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  }
  function seeAlso(ids) {
    const links = ids.map(id => {
      if (/^u\d+$/.test(id)) { const u = AZ.units.find(x => x.id === id); return u ? `<a class="chip" href="#ch-${id}">${I('book')} ${u.n}. ${esc(u.pt)}</a>` : ''; }
      const T = GR().t[id]; return T ? `<a class="chip" href="#grammar-${id}">${I('gram')} ${esc(T.pt)}</a>` : '';
    }).filter(Boolean);
    return links.length ? `<div class="see-also"><span class="kicker">Zie ook</span><div class="chips">${links.join('')}</div></div>` : '';
  }
  const VOS_TH = `<a class="vos-l" href="#grammar-vos" title="vós — jullie, ouderwets. Tik om erover te lezen.">vós</a>`;
  function conjEmbed(verbs, t) {
    const T = E.TENSE[t]; if (!T) return '';
    const Fs = verbs.map(v => [v, E.conjugate(v)]).filter(x => x[1] && x[1][t]);
    if (!Fs.length) return '';
    const imp = t === 'impa' || t === 'impn';
    const ps = imp ? [1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5];
    const lab = (imp ? ['', 'tu', 'você', 'nós', 'vós', 'vocês'] : ['eu', 'tu', 'ele · ela · você', 'nós', 'vós', 'eles · elas · vocês']).slice();
    lab[4] = VOS_TH;
    const cell = (v, F, p) => {
      const f = F[t][p] || ''; const mk = F.marks && F.marks[t] ? F.marks[t][p] : 0;
      const stem = /^(fut|cond)$/.test(t) ? v.replace(/ô/, 'o') : v.slice(0, -2);
      const shown = mk !== 2 && f.startsWith(stem) && f.length > stem.length && !/p[oô]r$/.test(v) ? esc(stem) + '<b>' + esc(f.slice(stem.length)) + '</b>' : esc(f);
      return `<td><button class="form ${mk === 2 ? 'irr' : mk === 1 ? 'sp' : ''}" data-act="say" data-text="${esc((t === 'impn' ? 'não ' : '') + f)}">${t === 'impn' ? '<span class="muted">não </span>' : ''}${shown}</button></td>`;
    };
    return `<figure class="conj-embed"><figcaption><b>${esc(T.pt)}</b> <span class="muted">${esc(T.en)}</span></figcaption><div class="scroll"><table>
      ${Fs.length > 1 ? `<thead><tr><th></th>${Fs.map(([v]) => `<th><a class="pt" href="#verb-${E.slug(v)}">${esc(v)}</a></th>`).join('')}</tr></thead>` : `<thead><tr><th></th><th><a class="pt" href="#verb-${E.slug(Fs[0][0])}">${esc(Fs[0][0])}</a> <span class="muted">${esc(AZ.glossShort((AZ.verbBy.get(Fs[0][0]) || {}).en || ''))}</span></th></tr></thead>`}
      <tbody>${ps.map(p => `<tr class="${p === 4 ? 'vos' : ''}"><th>${lab[p]}</th>${Fs.map(([v, F]) => cell(v, F, p)).join('')}</tr>`).join('')}</tbody></table></div></figure>`;
  }
  function md(src) {
    const lines = String(src || '').trim().split('\n'); let out = '', list = false, table = false;
    const close = () => { if (list) { out += '</ul>'; list = false; } if (table) { out += '</tbody></table></div>'; table = false; } };
    lines.forEach(l => {
      l = l.trim();
      if (!l || l.startsWith('@deel ')) { close(); return; }
      if (l.startsWith('## ')) { close(); out += `<h2>${inline(l.slice(3))}</h2>`; return; }
      if (l.startsWith('### ')) { close(); out += `<h3>${inline(l.slice(4))}</h3>`; return; }
      if (l.startsWith('- ')) { if (table) close(); if (!list) { out += '<ul>'; list = true; } out += `<li>${inline(l.slice(2))}</li>`; return; }
      if (l.startsWith('> ')) { close(); const [pt, nl] = l.slice(2).split(' = '); out += `<p class="ex-line">${sayBtn(pt.replace(/\*/g, ''))}<span class="pt">${inline(pt)}</span><span class="en">${inline(nl || '')}</span></p>`; return; }
      if (l.startsWith('!tip ')) { close(); out += `<p class="note tipbox">${I('bulb')}<span>${inline(l.slice(5))}</span></p>`; return; }
      if (l.startsWith('!pt ')) { close(); out += `<p class="note ptbox"><span class="flag-pt" aria-hidden="true"></span><span><b>In Portugal</b> ${inline(l.slice(4))}</span></p>`; return; }
      if (l.startsWith('!warn ')) { close(); out += `<p class="note warnbox">${I('info')}<span><b>Let op</b> ${inline(l.slice(6))}</span></p>`; return; }
      if (l.startsWith('@conj ')) { close(); const [vs, t] = l.slice(6).trim().split(/\s+/); out += conjEmbed(vs.split(','), t || 'pres'); return; }
      if (l.startsWith('@see ')) { close(); out += seeAlso(l.slice(5).split(/[\s,]+/).filter(Boolean)); return; }
      if (l.startsWith('|')) {
        if (list) { out += '</ul>'; list = false; }
        const head = l.startsWith('|!');
        const cells = l.replace(/^\|!?|\|$/g, '').split('|').map(c => c.trim());
        if (!table) { out += '<div class="scroll"><table class="gt"><tbody>'; table = true; }
        out += `<tr>${cells.map(c => head ? `<th>${inline(c)}</th>` : `<td>${inline(c)}</td>`).join('')}</tr>`; return;
      }
      close(); out += `<p>${inline(l)}</p>`;
    });
    close(); return out;
  }
  // the reference pages that go with a chapter
  function gramBox(u) {
    const ids = (GR().chapters[u.id] || []).filter(id => GR().t[id]);
    if (!ids.length) return '';
    return `<section class="ch-sec gram-box"><h3>${I('gram')} Zoek het op in de grammatica</h3><p class="muted small">De volledige regels achter dit hoofdstuk, met alle vormen — ook vós.</p>
      <div class="gram-links">${ids.map(id => { const T = GR().t[id]; return `<a href="#grammar-${id}"><b>${esc(T.pt)}</b><small>${esc(T.en)}</small>${I('chev')}</a>`; }).join('')}</div></section>`;
  }

  /* ---------------- A chapter: its parts, each with a test ---------------- */
  function verbRow(v) {
    return `<div class="wrow"><a class="wmain" href="#verb-${v.slug}"><span class="pic sm vpic" aria-hidden="true">${I('verbs')}</span><b class="pt">${esc(v.inf)}</b><span class="muted">${esc(AZ.glossShort(v.en))}</span></a><span class="stage-pill none">ww.</span>${sayBtn(v.inf, 'sm', 'Luister naar ' + v.inf)}</div>`;
  }
  function partState(u, P) { const best = AZ.partBest(u, P.k); return AZ.partDone(u, P.k) ? { cls: 'done', txt: best ? best + '%' : 'af' } : best ? { cls: 'tried', txt: best + '%' } : { cls: '', txt: '' }; }
  function viewChapter(id) {
    const m = String(id || '').match(/^(u\d+)(?:-(\d+))?$/);
    const u = m && AZ.units.find(x => x.id === m[1]); if (!u) { location.hash = 'course'; return; }
    if (m[2]) return viewPart(u, +m[2] - 1);
    AZ.markSeen(u);
    const r = AZ.chRec(u) || {}, prev = AZ.units[u.idx - 1], nxt = AZ.units[u.idx + 1];
    const verbs = AZ.verbsOf([u]), d = AZ.partsDone(u), np = AZ.nextPart(u);
    const reads = u.reads.map(rid => READS().find(x => x.id === rid)).filter(Boolean);
    main().innerHTML = `<a class="back" href="#course">${I('back')} Cursus</a>
      <article class="chapter c${u.s}">
        <header class="ch-head"><span class="kicker">Hoofdstuk ${u.n} · ${esc(u.lv.code)} · ${esc(u.lv.pt)}</span><h1>${esc(u.pt)}</h1><p class="sub">${esc(u.en)}</p>
          <div class="ch-prog"><div class="bar"><span style="width:${Math.round(100 * d / u.parts.length)}%"></span></div><span>${r.done ? `${I('check')} Af` : `${d} van ${u.parts.length} delen klaar`}</span></div></header>
        ${u.goals.length ? `<section class="goals"><h2>In dit hoofdstuk leer je</h2><ul>${u.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul></section>` : ''}
        <ol class="parts">${u.parts.map(P => { const st = partState(u, P); const open = np === P; return `<li><a class="part-row ${st.cls} ${open ? 'next' : ''}" href="#ch-${u.id}-${P.k + 1}"><span class="pn">${st.cls === 'done' ? I('check') : P.k + 1}</span><span class="pt-t"><b>${esc(P.title)}</b><small>${open ? 'Hier ga je verder · ' : ''}uitleg, woorden en een korte toets</small></span><span class="ch-meta">${st.txt}</span>${I('chev')}</a></li>`; }).join('')}</ol>
        ${np ? `<a class="btn primary big" href="#ch-${u.id}-${np.k + 1}">${I('book')} ${d ? 'Verder met deel ' + (np.k + 1) : 'Begin met deel 1'}</a>` : ''}
        ${reads.length ? `<section class="ch-sec"><h2>Lezen <small>teksten bij dit hoofdstuk</small></h2><div class="stories">${reads.map(storyCard).join('')}</div></section>` : ''}
        <section class="ch-sec"><h2>Extra oefenen</h2>
          <div class="prac-cards">
            <button class="card act-card" data-act="ch-write" data-u="${u.id}">${I('flag')}<b>Zinnen schrijven</b><span>steeds nieuwe zinnen</span></button>
            ${verbs.length ? `<button class="card act-card" data-act="ch-conj" data-u="${u.id}">${I('verbs')}<b>Vervoegen</b><span>${esc(verbs.slice(0, 4).join(', '))}${verbs.length > 4 ? '…' : ''}</span></button>` : ''}
            ${AZ.canSpeak() ? `<button class="card act-card" data-act="ch-listen" data-u="${u.id}">${I('headphones')}<b>Dictee</b><span>luisteren en schrijven</span></button>` : ''}
          </div>
          ${u.write.length ? `<h3>Vrij schrijven <small class="muted">${AZ.canCorrect() ? 'Claude verbetert je tekst' : 'vergelijk met een voorbeeld'}</small></h3><div class="free-list">${u.write.map((w, k) => `<div class="free-item"><p>${esc(w.task)}</p><button class="btn ghost small" data-act="free" data-u="${u.id}" data-k="${k}">${I('flag')} Schrijven</button></div>`).join('')}</div>` : ''}
        </section>
        ${gramBox(u)}
        ${!r.done ? `<p class="center"><button class="link small" data-act="ch-mark" data-u="${u.id}">Markeer als af zonder toetsen</button></p>` : ''}
      </article>
      <nav class="pager">${prev ? `<a href="#ch-${prev.id}">${I('back')} ${prev.n}. ${esc(prev.pt)}</a>` : '<span></span>'}${nxt ? `<a href="#ch-${nxt.id}">${nxt.n}. ${esc(nxt.pt)} ${I('chev')}</a>` : ''}</nav>`;
  }
  let hideNl = false;
  function viewPart(u, k) {
    const P = u.parts[k]; if (!P) { location.replace('#ch-' + u.id); return; }
    AZ.markSeen(u);
    const words = P.L.flatMap(L => L.items.filter(t => !t.startsWith('v:')).map(AZ.word).filter(Boolean));
    const verbs = P.L.flatMap(L => L.items.filter(t => t.startsWith('v:')).map(t => AZ.verbBy.get(t.slice(2))).filter(Boolean));
    const st = partState(u, P), best = AZ.partBest(u, k), prev = u.parts[k - 1], nxt = u.parts[k + 1];
    // the verb tables on this page play from the recorded verb files
    if (window.AZVoice) P.conj.forEach(c => c.verbs.forEach(v => AZVoice.loadVerb(E.slug(v))));
    main().innerHTML = `<a class="back" href="#ch-${u.id}">${I('back')} Hoofdstuk ${u.n}</a>
      <article class="chapter c${u.s}">
        <header class="ch-head"><span class="kicker">Hoofdstuk ${u.n} · deel ${k + 1} van ${u.parts.length}</span><h1>${esc(P.title)}</h1><p class="sub pt">${esc(u.pt)}</p>
          <div class="part-dots">${u.parts.map(Q => `<a href="#ch-${u.id}-${Q.k + 1}" class="${AZ.partDone(u, Q.k) ? 'on' : ''} ${Q === P ? 'cur' : ''}" aria-label="Deel ${Q.k + 1}"></a>`).join('')}</div>
          ${k === 0 ? `<p class="ch-help"><a href="#grammar-terms">${I('bulb')}<span>Weet je niet precies wat een <i>werkwoord</i>, <i>onderwerp</i> of <i>tijd</i> is? Alle grammaticawoorden worden hier uitgelegd.</span></a></p>` : ''}</header>
        <section class="book">${md(P.text)}</section>
        ${words.length || verbs.length ? `<section class="ch-sec"><h2>Nieuwe woorden <small>${words.length + verbs.length}</small></h2><div class="wlist">${words.map(wordRow).join('')}${verbs.map(verbRow).join('')}</div></section>` : ''}
        ${P.S.length ? `<section class="ch-sec"><h2>Voorbeeldzinnen <small>${P.S.length}</small></h2>
          <label class="toggle"><input type="checkbox" data-act="hide-en" ${hideNl ? 'checked' : ''}><span>Verberg het Nederlands — test jezelf</span></label>
          <div class="ex-sents ${hideNl ? 'no-en' : ''}">${P.S.map(s => `<p class="ex-line">${sayBtn(s.pt)}<span class="pt">${AZ.hintText(s.pt)}</span><span class="en" tabindex="0">${esc(s.en)}</span></p>`).join('')}</div></section>` : ''}
        <section class="card test-card ${st.cls}"><div><h3>${I('target')} Toets: deel ${k + 1}</h3>
          <p class="muted">${st.cls === 'done' ? `Gehaald${best ? ` met ${best}%` : ''}. Je kunt hem altijd opnieuw doen.` : `Ongeveer 8 vragen over dit deel, alles getypt. Haal ${AZ.PASS}% om door te gaan${best ? ` — je beste score tot nu toe: ${best}%` : ''}.`}</p></div>
          <div class="row gap wrap"><button class="btn ${st.cls === 'done' ? 'ghost' : 'primary'}" data-act="part-test" data-u="${u.id}" data-k="${k}">${st.cls === 'done' ? 'Opnieuw doen' : 'Start de toets'}</button>${st.cls === 'done' && nxt ? `<a class="btn primary" href="#ch-${u.id}-${k + 2}">Volgende deel ${I('chev')}</a>` : ''}${st.cls === 'done' && !nxt && AZ.units[u.idx + 1] ? `<a class="btn primary" href="#ch-${AZ.units[u.idx + 1].id}">Volgend hoofdstuk ${I('chev')}</a>` : ''}</div></section>
      </article>
      <nav class="pager">${prev ? `<a href="#ch-${u.id}-${k}">${I('back')} Deel ${k}</a>` : `<a href="#ch-${u.id}">${I('back')} Overzicht</a>`}${nxt ? `<a href="#ch-${u.id}-${k + 2}">Deel ${k + 2} ${I('chev')}</a>` : `<a href="#ch-${u.id}">Overzicht ${I('chev')}</a>`}</nav>`;
  }

  /* ---------------- Practice ---------------- */
  const prac = { mode: 'write', scope: 'all', ch: null, n: 12, tenses: null, vset: 'mine', fmt: 'all' };
  AZ.practiceMode = m => { prac.mode = m; };
  function scopeChapters() {
    const st = AZ.studied();
    if (prac.scope === 'one' && prac.ch) { const u = AZ.units.find(x => x.id === prac.ch); if (u) return [u]; }
    if (prac.scope === 'cur') return [st[st.length - 1]];
    return st;
  }
  function conjVerbs(set, chs) {
    if (set === 'mine') { const v = AZ.verbsOf(chs); return v.length ? v : ['ser', 'estar', 'ter', 'falar', 'comer', 'partir']; }
    if (set === 'irr') return ['ser', 'estar', 'ter', 'haver', 'ir', 'vir', 'fazer', 'dizer', 'trazer', 'poder', 'querer', 'saber', 'pôr', 'ver', 'dar', 'ler', 'ouvir', 'pedir', 'perder', 'sair', 'dormir', 'seguir', 'sentir', 'subir'];
    const cores = AZ.verbs.filter(v => v.core).map(v => v.inf);
    if (set === 'reg') return cores.filter(v => E.conjugate(v).kind === 'regular');
    if (set === 'all') return AZ.verbs.map(v => v.inf);
    return cores;
  }
  const inTime = nd => { if (!nd) return ''; const m = nd - AZ.minNow(); return m < 60 ? `over ${m} min` : m < 1440 ? `over ${Math.round(m / 60)} uur` : `over ${Math.round(m / 1440)} dagen`; };
  function viewPractice() {
    const st = AZ.studied(), chs = scopeChapters(), last = st[st.length - 1];
    const learned = AZ.tensesOf(st);
    if (!prac.tenses) prac.tenses = learned.slice();
    prac.tenses = prac.tenses.filter(t => learned.includes(t)); if (!prac.tenses.length) prac.tenses = ['pres'];
    const mixedOpen = AZ.units.filter(AZ.chDone).length >= AZ.units.filter(u => u.s === 1).length;
    if (prac.mode === 'mixed' && !mixedOpen) prac.mode = 'write';
    const due = AZ.dueList().length;
    const allT = ['pres', 'pret', 'imp', 'impa', 'impn', 'fut', 'cond', 'cpres', 'cimp', 'cfut'];
    const freeTasks = st.flatMap(u => u.write.map((w, k) => ({ u, k, w }))).reverse();
    const MODES = [['write', 'Schrijven', 'flag'], ['conj', 'Vervoegen', 'verbs'], ['mixed', 'Gemengd', 'bolt']];
    const DESC = { write: 'Zinnen vertalen, opschrijven wat je hoort en gaten invullen.', conj: 'Losse vormen, hele tabellen en werkwoorden in zinnen.', mixed: 'Schrijven en vervoegen door elkaar.' };
    main().innerHTML = `<h1 class="page-t">Oefenen <small>Alles zelf typen — geen meerkeuze</small></h1>
      <section class="card review-strip"><div class="rs-n"><b>${due}</b><span>herhaling${due === 1 ? '' : 'en'}</span></div><div class="rs-body"><p>${due ? 'De woorden, werkwoorden en tijden uit afgeronde hoofdstukken komen terug vlak voordat je ze vergeet.' : Object.keys(AZ.S.srs).length ? `Alles gedaan. Volgende herhaling ${inTime(AZ.nextDue())}.` : 'Rond een hoofdstuk af, dan komen de woorden en werkwoorden hier terug om te herhalen.'}</p>
        <div class="row gap wrap">${due ? `<button class="btn primary" data-act="reviews">${I('play')} Start ${Math.min(due, AZ.S.settings.batch)} herhalingen</button>` : ''}<a class="btn ghost small" href="#review">${I('cards')} Overzicht</a></div></div></section>
      <section class="card prac">
        <div class="mode-tabs" role="tablist">${MODES.map(([k, l, ic]) => { const off = k === 'mixed' && !mixedOpen; return `<button class="mode ${prac.mode === k ? 'on' : ''}" role="tab" aria-selected="${prac.mode === k}" data-act="prac-mode" data-m="${k}" ${off ? 'disabled title="Gaat open na niveau A1"' : ''}>${I(off ? 'lock' : ic)}<b>${l}</b></button>`; }).join('')}</div>
        <p class="mode-desc muted">${DESC[prac.mode]}${!mixedOpen ? ' <small>Gemengd gaat open na niveau A1.</small>' : ''}</p>
        <div class="cfg">
          <h3>Hoofdstukken</h3><div class="chips sel">
            <button class="chip ${prac.scope === 'all' ? 'on' : ''}" data-act="prac-scope" data-s="all">Alles tot nu toe (1–${last.n})</button>
            <button class="chip ${prac.scope === 'cur' ? 'on' : ''}" data-act="prac-scope" data-s="cur">Alleen hoofdstuk ${last.n}</button>
            <label class="chip sel-ch ${prac.scope === 'one' ? 'on' : ''}"><span>Kies</span><select id="prac-ch">${AZ.units.map(u => `<option value="${u.id}" ${prac.ch === u.id ? 'selected' : ''}>${u.n}. ${esc(u.pt)}</option>`).join('')}</select></label></div>
          ${prac.mode === 'conj' ? `<h3>Tijden <small class="muted">die je al hebt gehad</small></h3><div class="chips sel">${allT.map(t => `<button class="chip ${prac.tenses.includes(t) ? 'on' : ''}" data-act="prac-t" data-t="${t}" ${learned.includes(t) ? '' : 'disabled title="Komt later in de cursus"'}>${esc(E.TENSE[t].pt)}</button>`).join('')}</div>
            <h3>Werkwoorden</h3><div class="chips sel">${[['mine', 'Uit deze hoofdstukken'], ['core', 'Basiswerkwoorden'], ['irr', 'De onregelmatige'], ['reg', 'Regelmatige'], ['all', 'Alle ' + AZ.verbs.length]].map(([k, l]) => `<button class="chip ${prac.vset === k ? 'on' : ''}" data-act="prac-v" data-v="${k}">${l}</button>`).join('')}</div>
            <h3>Hoe</h3><div class="chips sel">${[['all', 'Van alles wat'], ['forms', 'Losse vormen'], ['tables', 'Hele tabellen'], ['context', 'In zinnen']].map(([k, l]) => `<button class="chip ${prac.fmt === k ? 'on' : ''}" data-act="prac-f" data-f="${k}">${l}</button>`).join('')}</div>
            <p class="muted small">${conjVerbs(prac.vset, chs).length} werkwoorden × ${prac.tenses.length} ${prac.tenses.length === 1 ? 'tijd' : 'tijden'}${AZ.S.settings.vos ? ', met vós' : ''}.</p>` : ''}
          <h3>Lengte</h3><div class="chips sel">${[8, 12, 20, 30].map(n => `<button class="chip ${prac.n === n ? 'on' : ''}" data-act="prac-n" data-n="${n}">${n}</button>`).join('')}</div>
        </div>
        <button class="btn primary big" data-act="prac-go">${I('play')} Start</button>
      </section>
      <section class="grid3">
        <button class="card act-card" data-act="weak">${I('target')}<b>Zwakke plekken</b><span>wat je het vaakst fout hebt</span></button>
        <button class="card act-card" data-act="listening">${I('headphones')}<b>Dictee</b><span>luisteren en schrijven</span></button>
        <a class="card act-card" href="#verbs">${I('verbs')}<b>Werkwoorden</b><span>alle tijden opzoeken</span></a>
      </section>
      <section class="card"><h2>${I('flag')} Vrij schrijven <small class="muted">${AZ.canCorrect() ? 'Claude verbetert je tekst' : 'je eigen teksten'}</small></h2>
        ${freeTasks.length ? `<div class="free-list">${freeTasks.slice(0, 6).map(({ u, k, w }) => `<div class="free-item"><span class="chip">Hfst. ${u.n}</span><p>${esc(w.task)}</p><button class="btn ghost small" data-act="free" data-u="${u.id}" data-k="${k}">Schrijven</button></div>`).join('')}</div>` : '<p class="muted">Hier komen opdrachten zodra je hoofdstukken doet.</p>'}</section>`;
    const sel = $('#prac-ch'); sel.addEventListener('change', () => { prac.ch = sel.value; prac.scope = 'one'; viewPractice(); });
  }

  /* ---------------- Reviews page ---------------- */
  function viewReview() {
    const due = AZ.dueList(), counts = AZ.stageCounts(), total = counts.reduce((a, b) => a + b, 0), fc = AZ.forecast(24), max = Math.max(1, ...fc);
    const byType = { w: 0, v: 0, c: 0 }; due.forEach(id => byType[id[0]]++);
    const missed = Object.keys(AZ.S.srs).filter(k => AZ.S.srs[k][4] > AZ.S.srs[k][3] && AZ.S.srs[k][0] < 9).slice(0, 12);
    main().innerHTML = `<a class="back" href="#practice">${I('back')} Oefenen</a><h1 class="page-t">Herhalen <small>Gespreide herhaling</small></h1>
      <section class="card review-hero">
        <div class="rh-n"><b>${due.length}</b><span>klaar</span></div>
        <div class="rh-body"><p>${due.length ? `${byType.w} woorden · ${byType.v} werkwoorden · ${byType.c} werkwoordstijden` : total ? `Alles gedaan. Volgende herhaling ${inTime(AZ.nextDue())}.` : 'Rond een hoofdstuk af, dan komen de woorden en werkwoorden hier.'}</p>
          <div class="row gap wrap">${due.length ? `<button class="btn primary big" data-act="reviews">${I('play')} Start ${Math.min(due.length, AZ.S.settings.batch)} herhalingen</button>` : `<a class="btn ghost" href="#course">${I('book')} Naar de cursus</a>`}</div>
          <p class="muted small">Je typt elk antwoord. Wat je onthoudt, klimt door de stadia hieronder; een fout zet het een stap terug.</p></div>
      </section>
      <section class="card"><h2>Jouw azulejos</h2>
        <div class="stages">${AZ.STAGES.map((s, i) => `<div class="stage" style="--sc:${s.color}"><b>${counts[i]}</b><span>${s.pt}</span><small>${s.en}</small></div>`).join('')}</div>
        <div class="stack-bar">${AZ.STAGES.map((s, i) => `<i style="--sc:${s.color};width:${total ? 100 * counts[i] / total : 0}%"></i>`).join('')}</div></section>
      <section class="card"><h2>Binnenkort <small class="muted">komende 24 uur</small></h2>
        <div class="fc big">${fc.map((n, i) => `<i style="--h:${Math.round(100 * n / max)}%" title="${n} herhalingen over ${i} uur"><em>${n || ''}</em></i>`).join('')}</div>
        <div class="fc-axis"><span>nu</span><span>+6u</span><span>+12u</span><span>+18u</span><span>+24u</span></div></section>
      ${missed.length ? `<section class="card"><h2>Lastige</h2><div class="chips">${missed.map(id => { const l = AZ.itemLabel(id); return `<span class="chip pt">${esc(l.pt)} <small class="muted">${esc(l.en)}</small></span>`; }).join('')}</div></section>` : ''}`;
  }

  /* ---------------- Words ---------------- */
  let wordQ = '';
  function deckIds(d) { return d.words.trim().split('\n').map(l => { const p = l.split('|'); const m = l.match(/\|id=([^|]+)/); return m ? m[1] : p[0]; }); }
  function viewWords() {
    const q = wordQ.trim().toLowerCase();
    let results = '';
    if (q) {
      const hits = [];
      G.LEX.forEach(e => { if (e.pt.toLowerCase().includes(q) || E.stripAccents(e.pt.toLowerCase()).includes(E.stripAccents(q)) || e.en.toLowerCase().includes(q)) hits.push(e); });
      results = `<section class="card"><h3>${hits.length} gevonden</h3><div class="wlist">${hits.slice(0, 60).map(wordRow).join('') || '<p class="muted">Niets gevonden.</p>'}</div></section>`;
    }
    const mine = (AZ.S.mine || []).filter(id => AZ.word(id));
    main().innerHTML = `${refSwitch('words')}<h1 class="page-t">Woorden <small>${G.LEX.size} woorden in ${AZ.decks.length} thema's</small></h1>
      <div class="toolbar"><label class="search">${I('search')}<input id="wq" type="search" placeholder="Zoek in het Portugees of Nederlands" value="${esc(wordQ)}" autocomplete="off" spellcheck="false"></label></div>
      ${results}
      ${mine.length ? `<section class="card"><h3>${I('bookmark')} Bewaard tijdens het lezen</h3><div class="chips">${mine.map(id => `<button class="chip pt" data-act="word" data-id="${esc(id)}">${esc(AZ.withArt(AZ.word(id)))}</button>`).join('')}</div></section>` : ''}
      <div class="decks">${AZ.decks.map(d => {
        const ids = deckIds(d), learned = ids.filter(id => AZ.srsHas('w:' + id)).length, solid = ids.filter(id => (AZ.S.srs['w:' + id] || [0])[0] >= 5).length;
        return `<a class="deck" href="#deck-${d.id}"><span class="deck-pic">${d.pic}</span><b>${esc(d.pt)}</b><span class="muted">${esc(d.en)}</span>
          <span class="dbar"><i style="width:${100 * learned / ids.length}%"></i><i class="solid" style="width:${100 * solid / ids.length}%"></i></span><small>${learned}/${ids.length} in herhaling</small></a>`;
      }).join('')}</div>`;
    const inp = $('#wq'); inp.addEventListener('input', () => { wordQ = inp.value; clearTimeout(inp._t); inp._t = setTimeout(() => { const pos = inp.selectionStart; viewWords(); const n = $('#wq'); n.focus(); n.setSelectionRange(pos, pos); }, 180); });
  }
  function wordRow(e) {
    const sr = AZ.S.srs['w:' + e.id], st = sr ? AZ.stageOf(sr[0]) : null;
    return `<div class="wrow"><button class="wmain" data-act="word" data-id="${esc(e.id)}">${AZ.picHTML(e.pic, 'sm')}<b class="pt">${esc(AZ.withArt(e))}</b><span class="muted">${esc(AZ.glossShort(e.en))}</span></button>
      ${st ? `<span class="stage-pill" style="--sc:${st.color}" title="${st.en}">${st.pt}</span>` : '<span class="stage-pill none">nieuw</span>'}
      ${sayBtn(AZ.article(e) + e.pt, 'sm', 'Luister naar ' + e.pt)}</div>`;
  }
  function viewDeck(id) {
    const d = AZ.decks.find(x => x.id === id); if (!d) { location.hash = 'words'; return; }
    const ids = deckIds(d).filter(i => AZ.word(i)), fresh = ids.filter(i => !AZ.srsHas('w:' + i));
    main().innerHTML = `<a class="back" href="#words">${I('back')} Woorden</a>
      <section class="card deck-head"><span class="deck-pic big">${d.pic}</span><div><h1>${esc(d.pt)}</h1><p class="muted">${esc(d.en)} · ${ids.length - fresh.length}/${ids.length} in je herhalingen</p></div>
        <div class="row gap wrap"><button class="btn primary" data-act="deck-practice" data-d="${d.id}">${I('flag')} Oefenen</button><button class="btn ghost" data-act="deck-add" data-d="${d.id}" ${fresh.length ? '' : 'disabled'}>${I('plus')} ${fresh.length ? 'Alle ' + fresh.length + ' toevoegen' : 'Alles toegevoegd'}</button></div></section>
      <section class="card"><div class="wlist">${ids.map(i => AZ.word(i)).map(wordRow).join('')}</div></section>`;
  }

  /* ---------------- Reading ---------------- */
  const READS = () => window.AZ_READ || [];
  // texts for the chapters you've reached that you haven't read yet, newest chapter first
  function recommendedReads(n) {
    const reach = AZ.reached();
    return READS().filter(r => { const u = AZ.chapterOfRead[r.id]; return u && u.idx <= reach && !AZ.S.reads[r.id]; }).sort((a, b) => AZ.chapterOfRead[b.id].idx - AZ.chapterOfRead[a.id].idx).slice(0, n);
  }
  function storyCard(r) {
    const st = AZ.S.reads[r.id], u = AZ.chapterOfRead[r.id], ahead = u && u.idx > AZ.reached();
    return `<a class="story ${st ? 'read' : ''} ${ahead ? 'ahead' : ''}" href="#story-${r.id}"><span class="story-pic">${r.pic}</span><b>${esc(r.title)}</b><span class="muted">${esc(r.en)}</span>
      <span class="story-meta">${u ? `<span class="chip">Hfst. ${u.n}</span>` : ''}${st ? `<span class="done-tag">${I('check')} ${st.score}/${r.qs.length}</span>` : ahead ? `<span class="muted small">na hoofdstuk ${u.n}</span>` : `<span class="len">${Math.max(1, Math.round(r.text.split(/\s+/).length / 110))} min</span>`}</span></a>`;
  }
  function viewRead() {
    const rec = recommendedReads(3), cu = AZ.currentChapter();
    main().innerHTML = `<h1 class="page-t">Lezen <small>Teksten bij elk hoofdstuk</small></h1>
      <p class="muted lead">Elke tekst gebruikt de grammatica en woorden van zijn hoofdstuk. Tik op een woord voor de betekenis, luister mee en beantwoord de vragen.</p>
      <section class="card for-you"><h2>${I('star')} Voor jou <small class="muted">${cu ? `je zit in hoofdstuk ${cu.n}` : 'elke tekst die je wilt'}</small></h2>
        ${rec.length ? `<div class="stories">${rec.map(storyCard).join('')}</div>` : `<p class="muted">Je hebt alles tot jouw hoofdstuk gelezen — lees vooruit of lees een oude favoriet nog eens.</p>`}</section>
      ${AZ.sections.map(sec => {
        const rs = AZ.units.filter(u => u.s === sec.id).flatMap(u => u.reads).map(id => READS().find(r => r.id === id)).filter(Boolean);
        return rs.length ? `<h2 class="grp">${esc(sec.level)} · ${esc(sec.pt)} <small class="muted">${esc(sec.en)}</small></h2><div class="stories">${rs.map(storyCard).join('')}</div>` : '';
      }).join('')}`;
  }
  const storyState = { tr: false, playing: false, token: 0 };
  function viewStory(id) {
    const r = READS().find(x => x.id === id); if (!r) { location.hash = 'read'; return; }
    const paras = r.text.trim().split(/\n\s*\n/);
    const wordsHTML = p => p.split(/(\s+)/).map(w => /^\s+$/.test(w) ? w : `<span class="rw" data-act="rw" tabindex="0">${esc(w)}</span>`).join('');
    const prev = AZ.S.reads[r.id], u = AZ.chapterOfRead[r.id];
    main().innerHTML = `<a class="back" href="#read">${I('back')} Lezen</a>
      <article class="card story-view">
        <header class="sv-head"><span class="story-pic big">${r.pic}</span><div><span class="chip">${r.lvl}</span>${u ? ` <a class="chip" href="#ch-${u.id}">Hoofdstuk ${u.n} · ${esc(u.pt)}</a>` : ''}<h1 class="pt">${esc(r.title)}</h1><p class="muted">${esc(r.en)}</p></div></header>
        <div class="sv-tools">${AZ.canSpeak() ? `<button class="btn primary" data-act="story-play">${I(storyState.playing ? 'pause' : 'play')} ${storyState.playing ? 'Pauze' : 'Luister'}</button>` : ''}
          <label class="toggle"><input type="checkbox" data-act="story-tr" ${storyState.tr ? 'checked' : ''}><span>Vertaling tonen</span></label></div>
        <div class="sv-text" lang="pt-PT">${paras.map((p, k) => `<div class="para" data-k="${k}"><p class="pt">${p.split('\n').map(wordsHTML).join('<br>')}</p>${storyState.tr && r.tr && r.tr[k] ? `<p class="tr">${esc(r.tr[k]).replace(/\n/g, '<br>')}</p>` : ''}</div>`).join('')}</div>
        ${r.gloss ? `<details class="gloss"><summary>${I('book')} Belangrijke woorden (${Object.keys(r.gloss).length})</summary><dl>${Object.entries(r.gloss).map(([k, v]) => `<div><dt class="pt">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></details>` : ''}
      </article>
      <section class="card quiz" id="quiz"><h2>Begrijp je het?</h2>
        ${r.qs.map((q, i) => `<fieldset class="qq" data-i="${i}"><legend><span class="pt">${esc(q.q)}</span><small class="muted">${esc(q.en || '')}</small></legend>${q.o.map((o, j) => `<label class="qo"><input type="radio" name="q${i}" value="${j}"><span class="pt">${esc(o)}</span></label>`).join('')}</fieldset>`).join('')}
        <div class="row gap"><button class="btn primary" data-act="story-check" data-id="${r.id}">Controleer</button>${prev ? `<span class="muted small">Vorige keer: ${prev.score}/${r.qs.length}</span>` : ''}</div><div id="quiz-res"></div></section>`;
  }
  function stopStory() { storyState.playing = false; storyState.token++; AZ.stopSpeech(); document.querySelectorAll('.para.reading').forEach(p => p.classList.remove('reading')); }
  function storyPlay(r) {
    if (storyState.playing) { stopStory(); viewStoryRefreshTools(); return; }
    const paras = r.text.trim().split(/\n\s*\n/); let k = 0;
    const token = ++storyState.token;
    storyState.playing = true; viewStoryRefreshTools();
    const step = () => {
      // stop if the reader paused, left the page or opened another text
      if (token !== storyState.token || !storyState.playing || k >= paras.length || location.hash !== '#story-' + r.id) { if (token === storyState.token) { storyState.playing = false; viewStoryRefreshTools(); document.querySelectorAll('.para.reading').forEach(p => p.classList.remove('reading')); } return; }
      document.querySelectorAll('.para').forEach(p => p.classList.toggle('reading', +p.dataset.k === k));
      const el = $(`.para[data-k="${k}"]`); el && el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const text = paras[k].replace(/^— /gm, ''); k++;
      let ended = false; const fallback = setTimeout(() => { if (!ended) { ended = true; step(); } }, 4000 + text.length * 130);
      AZ.speak(text, { onend: () => { if (!ended) { ended = true; clearTimeout(fallback); setTimeout(step, 250); } } });
    };
    step();
  }
  function viewStoryRefreshTools() { const b = $('[data-act="story-play"]'); if (b) b.innerHTML = `${I(storyState.playing ? 'pause' : 'play')} ${storyState.playing ? 'Pauze' : 'Luister'}`; }

  /* ---------------- Verbs ---------------- */
  let verbFilter = { q: '', f: 'core' };
  function verbBadges(F) {
    if (F.kind === 'irregular') return '<span class="vb irr">onregelmatig</span>';
    if (F.kind === 'stem') return '<span class="vb stem">stamwisseling</span>';
    if (F.kind === 'spelling') return '<span class="vb sp">spelling</span>';
    if (F.kind === 'pp') return '<span class="vb sp">onr. deelwoord</span>';
    return '<span class="vb reg">regelmatig</span>';
  }
  const formName = h => (h.t === 'pp' ? 'voltooid deelwoord' : h.t === 'ger' ? 'gerúndio' : h.t === 'inf' ? 'infinitief' : esc(E.TENSE[h.t].pt) + ', ' + ['eu', 'tu', 'ele/ela/você', 'nós', 'vós', 'eles/elas/vocês'][h.p]);
  function viewVerbs() {
    const q = verbFilter.q.trim().toLowerCase(), f = verbFilter.f;
    let list = AZ.verbs;
    if (f === 'core') list = list.filter(v => v.core);
    if (f === 'irr') list = list.filter(v => { const F = E.conjugate(v.inf); return F.kind === 'irregular' || F.kind === 'stem'; });
    if (/^(ar|er|ir)$/.test(f)) list = list.filter(v => v.inf.endsWith(f) && !/p[oô]r$/.test(v.inf));
    if (f === 'mine') list = list.filter(v => Object.keys(AZ.S.srs).some(k => k.startsWith('c:' + v.inf + ':') || k === 'v:' + v.inf));
    if (q) {
      const hits = AZ.verbIndex().get(q) || [];
      const fromForm = new Set(hits.map(h => h.inf));
      list = AZ.verbs.filter(v => fromForm.has(v.inf) || v.inf.includes(q) || E.stripAccents(v.inf).includes(E.stripAccents(q)) || v.en.toLowerCase().includes(q));
      list.sort((a, b) => (fromForm.has(b.inf) - fromForm.has(a.inf)) || (b.inf.startsWith(q) - a.inf.startsWith(q)) || (b.core - a.core));
    }
    const formHit = q && AZ.verbIndex().get(q);
    const FL = [['core', 'Basis'], ['all', 'Alle ' + AZ.verbs.length], ['irr', 'Onregelmatig'], ['ar', '-ar'], ['er', '-er'], ['ir', '-ir'], ['mine', 'Mijn']];
    main().innerHTML = `${refSwitch('verbs')}<h1 class="page-t">Werkwoorden <small>${AZ.verbs.length} werkwoorden, alle tijden</small></h1>
      <div class="toolbar"><label class="search">${I('search')}<input id="vq" type="search" placeholder="Zoek een werkwoord, een vorm (fiz, tivesse…) of Nederlands" value="${esc(verbFilter.q)}" autocomplete="off" spellcheck="false" lang="pt-PT"></label>
        <a class="btn primary" href="#practice" data-act="prac-mode" data-m="conj">${I('bolt')} Vervoegen oefenen</a></div>
      <p class="verb-help">${I('gram')}<span>Nieuw met werkwoorden? Lees <a class="glink" href="#grammar-verbs">hoe werkwoorden werken</a>, <a class="glink" href="#grammar-persons">de zes personen</a> en <a class="glink" href="#grammar-vos">wat vós is</a>. Bij elke tijd staat een ${I('info')}-knop met de regels.</span></p>
      <div class="filters" role="tablist">${FL.map(([k, l]) => `<button class="pill ${f === k && !q ? 'on' : ''}" data-act="vf" data-f="${k}">${l}</button>`).join('')}</div>
      ${formHit && formHit.length ? `<div class="card form-hit">${formHit.slice(0, 4).map(h => `<p><b class="pt">${esc(q)}</b> is <a href="#verb-${E.slug(h.inf)}"><b>${esc(h.inf)}</b></a> — ${formName(h)}</p>`).join('')}</div>` : ''}
      <div class="verb-list">${list.slice(0, 400).map(v => { const F = E.conjugate(v.inf); return `<a class="verb-row" href="#verb-${v.slug}"><b class="pt">${esc(v.inf)}</b><span class="vgloss">${esc(AZ.glossShort(v.en))}</span>${verbBadges(F)}</a>`; }).join('') || '<p class="muted">Geen werkwoorden gevonden.</p>'}</div>
      ${list.length > 400 ? `<p class="muted small">400 van de ${list.length} getoond. Zoek om het lijstje kleiner te maken.</p>` : ''}`;
    const inp = $('#vq'); inp.addEventListener('input', () => { verbFilter.q = inp.value; clearTimeout(inp._t); inp._t = setTimeout(() => { const pos = inp.selectionStart; viewVerbs(); const n = $('#vq'); n.focus(); n.setSelectionRange(pos, pos); }, 160); });
  }
  let showCompound = false;
  function tableHTML(F, t) {
    const T = E.TENSE[t];
    const imp = t === 'impa' || t === 'impn';
    const ps = imp ? [1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5];
    const lab = imp ? ['', 'tu', 'você', 'nós', 'vós', 'vocês'] : ['eu', 'tu', 'ele / ela / você', 'nós', 'vós', 'eles / elas / vocês'];
    const rows = ps.map(p => {
      const f = F[t][p]; const mk = F.marks && F.marks[t] ? F.marks[t][p] : 0;
      return `<tr class="${p === 4 ? 'vos' : ''}"><th>${p === 4 ? VOS_TH : lab[p]}</th><td><button class="form ${mk === 2 ? 'irr' : mk === 1 ? 'sp' : ''}" data-act="say" data-text="${esc((t === 'impn' ? 'não ' : '') + f)}">${t === 'impn' ? '<span class="muted">não </span>' : ''}${esc(f)}</button></td></tr>`;
    }).join('');
    return `<article class="tcard"><header><h3>${esc(T.pt)}</h3><p>${esc(T.en)}</p><button class="icon-btn sm" data-act="tense-info" data-t="${t}" aria-label="Wanneer gebruik je de ${esc(T.pt)}?">${I('info')}</button></header><table>${rows}</table></article>`;
  }
  function viewVerb(slug) {
    const v = AZ.verbBySlug.get(slug);
    if (!v) { main().innerHTML = `<p>Werkwoord niet gevonden. <a href="#verbs">Terug naar de werkwoorden</a></p>`; return; }
    const F = E.conjugate(v.inf);
    if (window.AZVoice) { AZVoice.loadVerb(slug); AZVoice.loadVerb('ter'); }
    const groups = [['Indicativo', 'aantonende wijs', ['pres', 'pret', 'imp', 'mqp', 'fut', 'cond']], ['Conjuntivo', 'aanvoegende wijs', ['cpres', 'cimp', 'cfut']], ['Imperativo', 'gebiedende wijs', ['impa', 'impn']], ['Infinitivo pessoal', 'persoonlijke infinitief', ['infp']]];
    const comp = ['ppc', 'mqpc', 'futc', 'condc', 'cppc', 'cmqpc', 'cfutc'];
    const inRev = ['pres', 'pret', 'imp'].every(t => AZ.srsHas('c:' + v.inf + ':' + t));
    const sim = AZ.verbs.filter(x => x.inf !== v.inf && (F.base ? E.conjugate(x.inf).base === F.base || x.inf === F.base : false)).slice(0, 8);
    main().innerHTML = `<a class="back" href="#verbs">${I('back')} Werkwoorden</a>
      <section class="card verb-head"><div><h1 class="pt">${esc(v.inf)} ${sayBtn(v.inf, '')}</h1><p class="vh-en">${esc(v.en)}</p>
        <p class="vh-tags">${verbBadges(F)}${(F.tags || []).map(t => `<span class="vb tag">${esc(t)}</span>`).join('')}</p>
        <dl class="vh-forms"><div><dt>Gerúndio</dt><dd><button class="form" data-act="say" data-text="${esc(F.ger)}">${esc(F.ger)}</button></dd></div><div><dt>Particípio</dt><dd><button class="form ${F.marks && F.marks.pp === 2 ? 'irr' : ''}" data-act="say" data-text="${esc(F.pp)}">${esc(F.pp)}</button>${F.pp2 ? ` <span class="muted">/ ${esc(F.pp2)} (met ser, estar)</span>` : ''}</dd></div></dl>
        ${F.note ? `<p class="t-note">${I('bulb')} ${esc(F.note)}</p>` : ''}</div>
        <div class="vh-actions"><button class="btn primary" data-act="verb-gym" data-inf="${esc(v.inf)}">${I('bolt')} Oefen dit werkwoord</button><button class="btn ghost" data-act="verb-table" data-inf="${esc(v.inf)}" data-t="pres">${I('verbs')} Schrijf een tabel</button><button class="btn ghost" data-act="verb-add" data-inf="${esc(v.inf)}" ${inRev ? 'disabled' : ''}>${I(inRev ? 'check' : 'plus')} ${inRev ? 'In je herhalingen' : 'Toevoegen aan herhalingen'}</button>
        <label class="toggle"><input type="checkbox" data-act="vos" ${AZ.S.settings.vos ? 'checked' : ''}><span>Vós ook oefenen</span></label></div></section>
      <p class="legend"><span class="form irr">onregelmatig</span><span class="form sp">spellingswijziging</span><a class="vos-key" href="#grammar-vos">vós — jullie, ouderwets: wat is dat?</a><span class="muted">Tik op een vorm om hem te horen, of op ${I('info')} voor hoe een tijd werkt.</span></p>
      ${groups.map(([g, nl, ts]) => `<h2 class="grp">${g} <small class="muted">${nl}</small></h2><div class="tgrid">${ts.map(t => tableHTML(F, t)).join('')}</div>`).join('')}
      <h2 class="grp"><button class="link" data-act="compound">${I(showCompound ? 'minus' : 'plus')} Tempos compostos <small class="muted">ter + ${esc(F.pp)}</small></button></h2>
      ${showCompound ? `<div class="tgrid">${comp.map(t => tableHTML(F, t)).join('')}</div>` : ''}
      ${sim.length ? `<section class="card"><h3>Gaat op dezelfde manier</h3><div class="chips">${sim.map(x => `<a class="chip pt" href="#verb-${x.slug}">${esc(x.inf)}</a>`).join('')}</div></section>` : ''}`;
  }

  /* ---------------- Me: stats, wall, settings, sync ---------------- */
  function viewMe() {
    const S = AZ.S, L = AZ.level(), acc = S.stats.ans ? Math.round(100 * S.stats.ok / S.stats.ans) : 0;
    const counts = AZ.stageCounts();
    const voices = AZ.ptVoices();
    const R = AZ.Remote, sl = syncLabel();
    // heatmap: last 18 weeks
    const days = []; const d = new Date(); d.setDate(d.getDate() - (7 * 18 - 1) - ((d.getDay() + 6) % 7));
    for (let i = 0; i < 7 * 18 + ((new Date().getDay() + 6) % 7) + 1; i++) { const k = AZ.today(d); days.push([k, S.days[k] || 0]); d.setDate(d.getDate() + 1); }
    const maxD = Math.max(1, ...days.map(x => x[1]));
    const ids = Object.keys(S.srs).sort((a, b) => S.srs[b][0] - S.srs[a][0]).slice(0, 600);
    const rec = AZ.hasRecordings(), vsel = S.settings.voice;
    const devOpts = voices.map(v => `<option value="${esc(v.name)}" ${vsel === v.name ? 'selected' : ''}>Apparaat: ${esc(v.name)} (${esc(v.lang)})</option>`).join('');
    main().innerHTML = `<h1 class="page-t">Ik <small>Voortgang en instellingen</small></h1>
      <section class="card me-head"><span class="avatar" aria-hidden="true">${esc((S.settings.name || 'A').trim().charAt(0).toUpperCase())}</span><div><h2>${esc(S.settings.name || 'Aprendiz')}</h2><p class="muted">Niveau ${L.lv} · ${S.xp} punten · hoofdstuk ${AZ.currentChapter() ? AZ.currentChapter().n : AZ.units.length} van ${AZ.units.length}</p><div class="lvl-bar"><span style="width:${Math.round(100 * L.into / L.need)}%"></span></div><p class="muted small">Nog ${L.need - L.into} punten tot niveau ${L.lv + 1}</p></div></section>
      <section class="card settings" id="saving"><h2>${I('cloud')} Account en opslaan</h2>
        <p class="sync-chip ${sl.cls}">${I(sl.icon)}<span>${sl.txt}</span></p>${R.status === 'error' && R.error ? `<p class="sync-err small">${esc(R.error)}</p>` : ''}
        ${R.mode === 'cloud' ? accountHTML()
        : R.mode === 'claude' ? `<p>Je gebruikt Azulejo op claude.ai, dus je voortgang wordt privé in je account bewaard en gaat mee naar elk apparaat waarop je deze pagina opent. Niemand anders kan hem zien.</p>`
        : `<p>Je voortgang wordt in deze browser bewaard. Op je Cloudflare-site (zie de README) kun je een account maken en op elk apparaat verdergaan.</p>`}
        <details><summary>Geavanceerd: eigen synchronisatieserver</summary><label class="field"><span>API-adres (leeg = het adres uit config.js)</span><input id="sync-ep" value="${esc(S.settings.sync.endpoint)}" placeholder="https://jouw-site.workers.dev" spellcheck="false"></label>
          <label class="field"><span>Synchronisatiewachtwoord (alleen als je SYNC_TOKEN op de Worker hebt ingesteld)</span><input id="sync-tok" type="password" value="${esc(S.settings.sync.token)}" autocomplete="off"></label>
          <button class="btn ghost small" data-act="sync-ep">Opslaan en opnieuw verbinden</button></details>
      </section>
      <section class="stats">
        <div class="stat">${I('flame')}<b>${AZ.streak()}</b><span>dagen op rij</span></div>
        <div class="stat">${I('grid')}<b>${AZ.wordsLearned()}</b><span>woorden geleerd</span></div>
        <div class="stat">${I('verbs')}<b>${Object.keys(S.srs).filter(k => k[0] === 'c').length}</b><span>werkwoordstijden</span></div>
        <div class="stat">${I('target')}<b>${acc}%</b><span>goed</span></div>
        <div class="stat">${I('book')}<b>${AZ.units.filter(AZ.chDone).length}</b><span>hoofdstukken af</span></div>
        <div class="stat">${I('flag')}<b>${S.stats.free || 0}</b><span>teksten geschreven</span></div>
        <div class="stat">${I('cards')}<b>${S.stats.reviews}</b><span>herhalingen</span></div>
      </section>
      <section class="card"><h2>Jouw tegelmuur <small class="muted">elke tegel is iets wat je hebt geleerd</small></h2>
        <div class="wall" aria-label="${ids.length} dingen">${ids.map(id => { const st = AZ.stageOf(S.srs[id][0]); const l = AZ.itemLabel(id); return `<i style="--sc:${st.color}" title="${esc(l.pt)} — ${st.pt}"></i>`; }).join('') || '<p class="muted">Rond je eerste hoofdstuk af en leg je eerste tegel.</p>'}</div>
        <div class="stages mini">${AZ.STAGES.map((s, i) => `<span style="--sc:${s.color}"><i></i>${s.pt} ${counts[i]}</span>`).join('')}</div></section>
      <section class="card"><h2>Activiteit</h2><div class="heat" style="--cols:${Math.ceil(days.length / 7)}">${days.map(([k, v]) => `<i title="${k}: ${v} punten" style="--a:${v ? 0.25 + 0.75 * v / maxD : 0}" class="${v ? 'on' : ''}"></i>`).join('')}</div></section>
      <section class="card"><h2>Prestaties <small class="muted">${Object.keys(S.badges).length}/${Object.keys(AZ.BADGES).length}</small></h2><div class="badges">${Object.entries(AZ.BADGES).map(([k, b]) => `<div class="badge ${S.badges[k] ? 'got' : ''}">${I(b[2])}<b>${esc(b[0])}</b><small>${esc(b[1])}</small></div>`).join('')}</div></section>
      <section class="card settings"><h2>${I('gear')} Instellingen</h2>
        <label class="field"><span>Je naam</span><input id="set-name" value="${esc(S.settings.name)}" maxlength="24" placeholder="Voor de begroeting"></label>
        <div class="field"><span>Dagdoel (punten)</span><div class="chips sel">${[10, 20, 30, 50, 80].map(n => `<button class="chip ${S.settings.goal === n ? 'on' : ''}" data-act="set-goal" data-n="${n}">${n}</button>`).join('')}</div></div>
        <div class="field"><span>Herhalingen per keer</span><div class="chips sel">${[10, 20, 30, 50].map(n => `<button class="chip ${S.settings.batch === n ? 'on' : ''}" data-act="set-batch" data-n="${n}">${n}</button>`).join('')}</div></div>
        <label class="field"><span>Stem</span><select id="set-voice">
          <option value="auto" ${vsel === 'auto' ? 'selected' : ''}>${rec ? 'Opgenomen stem (aanbevolen)' : AZ.hasClaudeTTS() ? 'Automatisch (Claude-stem)' : 'Automatisch (beste stem op dit apparaat)'}</option>
          ${AZ.hasClaudeTTS() ? `<option value="claude" ${vsel === 'claude' ? 'selected' : ''}>Claude-stem</option>` : ''}
          ${voices.length ? `<option value="device" ${vsel === 'device' ? 'selected' : ''}>Stem van dit apparaat</option>${devOpts}` : ''}
          <option value="off" ${vsel === 'off' ? 'selected' : ''}>Geen stem</option></select></label>
        <p class="hint">${I('info')} ${rec ? 'De opgenomen stem is een Europees-Portugese neurale stem (Piper, “tugão”). Alle woorden, voorbeeldzinnen, teksten en de vormen van de basiswerkwoorden zijn opgenomen.' : 'Op de gepubliceerde site praat Azulejo met een opgenomen Europees-Portugese stem.'}</p>
        ${rec ? `<label class="toggle"><input type="checkbox" data-act="set-bool" data-k="fallback" ${S.settings.fallback ? 'checked' : ''}><span>Gebruik de stem van dit apparaat voor zinnen zonder opname</span></label>` : ''}
        <label class="field"><span>Snelheid <b id="rate-v">${S.settings.rate.toFixed(2)}</b></span><input id="set-rate" type="range" min="0.6" max="1.2" step="0.05" value="${S.settings.rate}"></label>
        <button class="btn ghost small" data-act="say" data-text="Olá! Bem-vindo ao Azulejo. Vamos aprender português.">${I('speaker')} Stem testen</button>
        <label class="toggle"><input type="checkbox" data-act="set-bool" data-k="sound" ${S.settings.sound ? 'checked' : ''}><span>Geluidseffecten</span></label>
        <label class="toggle"><input type="checkbox" data-act="set-bool" data-k="strict" ${S.settings.strict ? 'checked' : ''}><span>Streng met accenten — een ontbrekend accent telt als fout</span></label>
        <label class="toggle"><input type="checkbox" data-act="set-bool" data-k="vos" ${S.settings.vos ? 'checked' : ''}><span>Vós ook oefenen (ouderwets — zie hoofdstuk 2)</span></label>
      </section>
      <section class="card settings"><h2>${I('download')} Back-up</h2>
        <p class="muted small">Kopieer je voortgang als tekst om hem veilig te bewaren of mee te nemen.</p>
        <div class="row gap wrap"><button class="btn ghost small" data-act="copy-backup">${I('copy')} Back-up kopiëren</button>${window.claude ? '' : `<button class="btn ghost small" data-act="dl-backup">${I('download')} Downloaden</button>`}<button class="btn ghost small" data-act="import">${I('upload')} Importeren…</button></div>
        <h3 class="danger-t">Opnieuw beginnen</h3><button class="btn danger small" data-act="reset">Alle voortgang wissen</button>
      </section>
      <p class="muted small center">Azulejo · Europees-Portugees (spelling AO1990).</p>`;
    const nm = $('#set-name'); nm.addEventListener('change', () => { AZ.S.settings.name = nm.value.trim(); AZ.save(true); });
    const vo = $('#set-voice'); vo.addEventListener('change', () => { AZ.S.settings.voice = vo.value; AZ.save(true); if (vo.value !== 'off') AZ.speak('Olá, tudo bem?'); route(); });
    const ra = $('#set-rate'); ra.addEventListener('input', () => { AZ.S.settings.rate = +ra.value; $('#rate-v').textContent = (+ra.value).toFixed(2); }); ra.addEventListener('change', () => AZ.save(true));
  }

  /* ---------------- Account (Cloudflare site) ---------------- */
  let accTab = 'signup';
  function accountHTML() {
    const A = AZ.Account, se = A.session(), S = AZ.S;
    const codeBits = `<details class="adv"><summary>${se ? 'Synchronisatiecode van dit account' : 'Geen account? Gebruik een synchronisatiecode'}</summary>
        <p class="muted small">${se ? 'Je account gebruikt deze code op de achtergrond. Hij werkt alleen als je bent ingelogd.' : 'Je voortgang wordt ook onder deze privécode bewaard. Typ hem op een ander apparaat om daar verder te gaan — zonder account.'}</p>
        <div class="codebox"><code id="sync-code">${esc(S.settings.sync.id)}</code><button class="btn ghost small" data-act="copy" data-text="${esc(S.settings.sync.id)}">${I('copy')} Kopiëren</button></div>
        ${se ? '' : `<label class="field"><span>Een code van een ander apparaat?</span><div class="row gap"><input id="sync-in" placeholder="az-…" spellcheck="false" autocomplete="off"><button class="btn ghost small" data-act="sync-use">Code gebruiken</button></div></label>`}</details>`;
    if (se && !se.stale) return `<div class="acct-in"><span class="avatar sm" aria-hidden="true">${esc(se.username.charAt(0).toUpperCase())}</span><div><b>Ingelogd als ${esc(se.username)}</b><p class="muted small">Log op elk apparaat in met dezelfde gebruikersnaam om verder te gaan waar je gebleven was.</p></div></div>
      <div class="row gap wrap"><button class="btn ghost small" data-act="acct-logout">Uitloggen</button><button class="btn ghost small" data-act="acct-pass">Wachtwoord wijzigen</button><button class="btn ghost small danger-t" data-act="acct-delete">Account verwijderen</button></div>${codeBits}`;
    const login = accTab === 'login' || (se && se.stale);
    return `${se && se.stale ? `<p class="sync-err small">Je sessie voor ${esc(se.username)} is verlopen — log opnieuw in om te blijven synchroniseren.</p>` : '<p>Maak een account om je voortgang veilig te bewaren en op elk apparaat verder te gaan: telefoon, laptop, tablet.</p>'}
      <div class="acct-tabs" role="tablist"><button class="pill ${!login ? 'on' : ''}" data-act="acct-tab" data-t="signup" role="tab" aria-selected="${!login}">Account maken</button><button class="pill ${login ? 'on' : ''}" data-act="acct-tab" data-t="login" role="tab" aria-selected="${login}">Inloggen</button></div>
      <form class="acct-form" id="acct-form" data-mode="${login ? 'login' : 'signup'}" autocomplete="on">
        <label class="field"><span>Gebruikersnaam</span><input id="acct-user" name="username" autocomplete="username" autocapitalize="off" spellcheck="false" required minlength="3" maxlength="24" value="${esc(se ? se.username : '')}" placeholder="bijv. ana.silva"></label>
        <label class="field"><span>Wachtwoord</span><input id="acct-pass" name="password" type="password" autocomplete="${login ? 'current-password' : 'new-password'}" required minlength="8" placeholder="${login ? '' : 'Minstens 8 tekens'}"></label>
        ${login ? '' : '<label class="field"><span>Wachtwoord nog een keer</span><input id="acct-pass2" type="password" autocomplete="new-password" required minlength="8"></label>'}
        <button class="btn primary" type="submit">${login ? 'Inloggen' : 'Account maken'}</button>
        <p class="muted small">${login ? 'De voortgang op dit apparaat wordt samengevoegd met je account.' : 'Je voortgang op dit apparaat gaat mee naar het nieuwe account. Er is geen e-mail, dus onthoud je wachtwoord — het kan niet hersteld worden.'}</p>
      </form>${codeBits}`;
  }
  async function accountSubmit(form) {
    const user = $('#acct-user').value.trim(), pass = $('#acct-pass').value, mode = form.dataset.mode;
    if (!/^[a-zA-Z0-9._-]{3,24}$/.test(user)) { AZ.toast('Een gebruikersnaam heeft 3–24 letters, cijfers, punten, streepjes of lage streepjes.'); return; }
    if (pass.length < 8) { AZ.toast('Gebruik minstens 8 tekens voor het wachtwoord.'); return; }
    if (mode === 'signup' && pass !== $('#acct-pass2').value) { AZ.toast('De twee wachtwoorden zijn niet hetzelfde.'); return; }
    const btn = form.querySelector('button[type="submit"]'); btn.disabled = true; btn.textContent = mode === 'login' ? 'Inloggen…' : 'Bezig…';
    try {
      if (mode === 'login') { const j = await AZ.Account.login(user, pass); AZ.toast(`Olá, ${j.username}! Je voortgang is er.`); }
      else { await AZ.Account.signup(user, pass); AZ.toast('Account gemaakt — je voortgang staat erin.'); }
      route();
    } catch (e) {
      // keep what was typed, so only the password needs fixing
      AZ.toast(e.message || 'Dat lukte niet.');
      btn.disabled = false; btn.textContent = mode === 'login' ? 'Inloggen' : 'Account maken';
      const pw = $('#acct-pass'); if (pw) { pw.value = ''; pw.focus(); }
    }
  }
  document.addEventListener('submit', e => { if (e.target.id === 'acct-form') { e.preventDefault(); accountSubmit(e.target); } else if (e.target.id === 'acct-pass-form') { e.preventDefault(); passwordSubmit(); } else if (e.target.id === 'acct-del-form') { e.preventDefault(); deleteSubmit(); } });
  async function passwordSubmit() {
    const o = $('#pw-old').value, n = $('#pw-new').value;
    if (n.length < 8) { AZ.toast('Gebruik minstens 8 tekens.'); return; }
    if (n !== $('#pw-new2').value) { AZ.toast('De nieuwe wachtwoorden zijn niet hetzelfde.'); return; }
    try { await AZ.Account.changePassword(o, n); AZ.closeModal(); AZ.toast('Wachtwoord gewijzigd. Andere apparaten moeten opnieuw inloggen.'); } catch (e) { AZ.toast(e.message); }
  }
  async function deleteSubmit() {
    try { await AZ.Account.remove($('#del-pass').value); AZ.closeModal(); AZ.toast('Account verwijderd.'); route(); } catch (e) { AZ.toast(e.message); }
  }

  /* ---------------- Router ---------------- */
  function route() {
    if (AZ.inSession()) return;
    hideTip();
    stopStory(); // a new page never keeps talking
    const h = decodeURIComponent(location.hash.slice(1)) || 'course';
    const [name, ...rest] = h.split('-'); const arg = rest.join('-');
    try {
      if (name === 'course' || name === 'learn' || name === '') viewCourse();
      else if (name === 'ch') viewChapter(arg);
      else if (name === 'guide') { if (arg) { location.replace('#ch-' + arg); return; } viewCourse(); }
      else if (name === 'practice' || name === 'gym') viewPractice();
      else if (name === 'review') viewReview();
      else if (name === 'ref') viewRef();
      else if (name === 'verbs') viewVerbs();
      else if (name === 'verb') viewVerb(arg);
      else if (name === 'words') viewWords();
      else if (name === 'deck') viewDeck(arg);
      else if (name === 'read') viewRead();
      else if (name === 'story') viewStory(arg);
      else if (name === 'me') viewMe();
      else if (name === 'grammar') { if (!arg) viewGrammar(); else if (arg.startsWith('g-')) viewGrammar(arg.slice(2)); else viewGrammarTopic(arg); }
      else viewCourse();
    } catch (e) { console.error(e); main().innerHTML = `<div class="card"><h2>Er ging iets mis</h2><p class="muted">${esc(e.message)}</p><a class="btn primary" href="#course">Terug naar de cursus</a></div>`; }
    renderChrome();
  }
  AZ.render = route;
  let lastHash = location.hash;
  window.addEventListener('hashchange', () => { AZ.closeModal(); if (location.hash.split('-')[0] !== lastHash.split('-')[0] || !/^#(verb|deck|story)/.test(location.hash)) window.scrollTo(0, 0); lastHash = location.hash; route(); });
  AZ.onChange(kind => { if (kind === 'sync' || kind === 'voices') { renderChrome(); if (kind === 'voices' && /^#(me|ch|practice|story)/.test(location.hash) && !AZ.inSession() && !storyState.playing) { const y = window.scrollY; route(); window.scrollTo(0, y); } return; } if (!AZ.inSession()) { const y = window.scrollY; route(); window.scrollTo(0, y); } });

  /* ---------------- Global actions ---------------- */
  const findUnit = id => AZ.units.find(u => u.id === id);
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-act]');
    if (!t) { if (!e.target.closest('.tip')) hideTip(); return; }
    const a = t.dataset.act;
    switch (a) {
      case 'say': e.preventDefault(); AZ.speak(t.dataset.text); break;
      case 'say-slow': e.preventDefault(); AZ.speak(t.dataset.text, { slow: true }); break;
      case 'hw': showTip(t, t.dataset.g); AZ.speak(t.textContent.replace(/[.,!?;:]/g, '')); break;
      case 'rw': { const r = READS().find(x => location.hash === '#story-' + x.id); const w = t.textContent.replace(/[.,!?;:¿¡…"“”«»()—–]/g, ''); const g = AZ.lookup(w, r && r.gloss); showTip(t, g ? g : w + ' — (niet in de woordenlijst)'); if (!storyState.playing) AZ.speak(w); const ids = AZ.formIndex.get(w.toLowerCase()); if (ids && g && !AZ.srsHas('w:' + ids[0])) { setTimeout(() => { if (tip && tip.style.display === 'block') { tip.innerHTML += ` <button class="tip-save" data-act="save-word" data-id="${esc(ids[0])}">${I('bookmark')} Bewaren</button>`; } }, 10); } break; }
      case 'save-word': { const id = t.dataset.id; if (!AZ.S.mine.includes(id)) AZ.S.mine.push(id); AZ.save(true); AZ.toast('Bewaard bij je woorden'); hideTip(); break; }
      case 'm-close': AZ.closeModal(); break;
      case 'word': AZ.wordPopup(t.dataset.id); break;
      case 'add-word': AZ.srsAdd('w:' + t.dataset.id); AZ.save(); AZ.closeModal(); AZ.toast('Toegevoegd aan je herhalingen'); break;
      // chapters
      case 'hide-en': hideNl = t.checked; { const box = $('.ex-sents'); if (box) box.classList.toggle('no-en', hideNl); } break;
      case 'part-test': AZ.startPartTest(findUnit(t.dataset.u), +t.dataset.k); break;
      case 'ch-test': AZ.startChapterTest(findUnit(t.dataset.u)); break;
      case 'ch-mark': { const u = findUnit(t.dataset.u); AZ.modal(`<h3>Hoofdstuk ${u.n} als af markeren?</h3><p>De woorden en werkwoorden gaan naar je herhalingen en de cursus gaat verder met het volgende hoofdstuk. Je krijgt dan geen toetspunten.</p><div class="row gap"><button class="btn ghost" data-act="m-close">Annuleren</button><button class="btn primary" data-act="ch-mark-go" data-u="${u.id}">Markeer als af</button></div>`); break; }
      case 'ch-mark-go': { const u = findUnit(t.dataset.u); AZ.completeChapter(u, 0); AZ.closeModal(); AZ.save(); AZ.toast(`Hoofdstuk ${u.n} is als af gemarkeerd.`); break; }
      case 'ch-write': AZ.startWriting([findUnit(t.dataset.u)], 10); break;
      case 'ch-conj': { const u = findUnit(t.dataset.u); AZ.startConjugation({ verbs: AZ.verbsOf([u]), tenses: u.tenses, format: 'all', n: 12 }); break; }
      case 'ch-mixed': AZ.startMixed([findUnit(t.dataset.u)], 14); break;
      case 'ch-listen': AZ.startListening([findUnit(t.dataset.u)]); break;
      case 'free': AZ.startFree(findUnit(t.dataset.u), +t.dataset.k); break;
      // practice
      case 'prac-mode': if (!t.disabled) { prac.mode = t.dataset.m; if (/^#practice/.test(location.hash)) viewPractice(); } break;
      case 'prac-scope': prac.scope = t.dataset.s; viewPractice(); break;
      case 'prac-t': { const k = t.dataset.t; prac.tenses = prac.tenses.includes(k) ? prac.tenses.filter(x => x !== k) : prac.tenses.concat(k); if (!prac.tenses.length) prac.tenses = [k]; viewPractice(); break; }
      case 'prac-v': prac.vset = t.dataset.v; viewPractice(); break;
      case 'prac-f': prac.fmt = t.dataset.f; viewPractice(); break;
      case 'prac-n': prac.n = +t.dataset.n; viewPractice(); break;
      case 'prac-go': {
        const chs = scopeChapters();
        if (prac.mode === 'write') AZ.startWriting(chs, prac.n);
        else if (prac.mode === 'mixed') AZ.startMixed(chs, prac.n);
        else AZ.startConjugation({ verbs: conjVerbs(prac.vset, chs), tenses: prac.tenses, format: prac.fmt, n: prac.n });
        break;
      }
      case 'reviews': AZ.startReviews(); break;
      case 'weak': AZ.startWeak(); break;
      case 'listening': AZ.startListening(AZ.studied()); break;
      // verbs
      case 'vf': verbFilter = { q: '', f: t.dataset.f }; viewVerbs(); break;
      case 'compound': showCompound = !showCompound; route(); break;
      case 'vos': AZ.S.settings.vos = t.checked; AZ.save(true); route(); break;
      case 'tense-info': {
        const k = t.dataset.t, T = E.TENSE[k], g = GR().tenses[k], GT = g && GR().t[g];
        const reg = conjEmbed(['falar', 'comer', 'partir'], k);
        if (window.AZVoice) ['falar', 'comer', 'partir'].forEach(v => AZVoice.loadVerb(v));
        AZ.modal(`${closeBtn()}<h3>${esc(T.pt)}</h3><p class="muted">${esc(T.en)}</p><p>${esc(T.use)}</p>
          ${reg ? `<p class="small"><b>Het regelmatige patroon</b> — de vetgedrukte uitgangen zet je achter de stam:</p>${reg}` : ''}
          ${GT ? `<a class="btn primary" href="#grammar-${g}">${I('gram')} ${esc(GT.pt)}: de volledige uitleg</a>` : ''}`);
        break;
      }
      case 'verb-gym': AZ.startVerb(t.dataset.inf); break;
      case 'verb-table': { const inf = t.dataset.inf, ts = AZ.tensesOf(AZ.studied()); AZ.startConjugation({ verbs: [inf], tenses: ts, format: 'tables', n: Math.min(4, ts.length) }); break; }
      case 'verb-add': { const inf = t.dataset.inf; AZ.srsAdd('v:' + inf); ['pres', 'pret', 'imp'].forEach(x => AZ.srsAdd('c:' + inf + ':' + x)); AZ.save(); AZ.toast(inf + ' toegevoegd: presente, perfeito, imperfeito'); break; }
      // words
      case 'deck-practice': { const d = AZ.decks.find(x => x.id === t.dataset.d); AZ.startDeckPractice(d, deckIds(d).filter(i => AZ.word(i))); break; }
      case 'deck-add': { const d = AZ.decks.find(x => x.id === t.dataset.d); const n = deckIds(d).filter(i => AZ.word(i) && AZ.srsAdd('w:' + i)).length; AZ.save(); AZ.toast(`${n} woorden toegevoegd — de eerste herhalingen komen over ongeveer 4 uur.`); break; }
      // reading
      case 'story-play': { const r = READS().find(x => location.hash === '#story-' + x.id); if (r) storyPlay(r); break; }
      case 'story-tr': storyState.tr = t.checked; { const r = READS().find(x => location.hash === '#story-' + x.id); const y = window.scrollY; if (storyState.playing) stopStory(); viewStory(r.id); window.scrollTo(0, y); } break;
      case 'story-check': {
        const r = READS().find(x => x.id === t.dataset.id); let score = 0, answered = 0;
        r.qs.forEach((q, i) => { const sel = document.querySelector(`input[name="q${i}"]:checked`); const fs = document.querySelector(`.qq[data-i="${i}"]`); fs.classList.remove('ok', 'bad'); if (sel) { answered++; const ok = +sel.value === q.a; if (ok) score++; fs.classList.add(ok ? 'ok' : 'bad'); } fs.querySelectorAll('.qo').forEach((lab, j) => lab.classList.toggle('right', j === q.a && !!sel)); });
        if (answered < r.qs.length) { AZ.toast('Beantwoord eerst alle vragen.'); break; }
        const prev = AZ.S.reads[r.id]; const xp = prev ? 3 : 10 + score * 2;
        AZ.S.reads[r.id] = { score: Math.max(score, prev ? prev.score : 0), at: Date.now() };
        if (Object.keys(AZ.S.reads).length >= 5) AZ.badge('reader');
        AZ.addXP(xp); AZ.save(true); renderChrome(); AZ.sfx(score === r.qs.length ? 'done' : 'ok');
        const nextR = recommendedReads(1)[0];
        $('#quiz-res').innerHTML = `<p class="quiz-score">${score}/${r.qs.length} · +${xp} punten ${score === r.qs.length ? '— perfeito!' : ''}</p>${nextR ? `<p><a class="btn ghost small" href="#story-${nextR.id}">Volgende: ${esc(nextR.title)} ${I('chev')}</a></p>` : ''}`;
        break;
      }
      // me
      case 'set-goal': AZ.S.settings.goal = +t.dataset.n; AZ.save(); break;
      case 'set-batch': AZ.S.settings.batch = +t.dataset.n; AZ.save(); break;
      case 'set-bool': AZ.S.settings[t.dataset.k] = t.checked; AZ.save(true); renderChrome(); break;
      case 'copy': copyText(t.dataset.src ? ($('#' + t.dataset.src) || {}).value || '' : t.dataset.text); break;
      case 'copy-backup': AZ.modal(`${closeBtn()}<h3>Je back-up</h3><p class="muted small">Bewaar deze tekst ergens veilig, of plak hem bij Importeren in een andere kopie van Azulejo (bijvoorbeeld je eigen site).</p><textarea id="bk-t" rows="7" readonly spellcheck="false">${esc(AZ.exportText())}</textarea><div class="row gap"><button class="btn ghost" data-act="m-close">Sluiten</button><button class="btn primary" data-act="copy" data-src="bk-t">${I('copy')} Kopiëren</button></div>`); setTimeout(() => { const ta = $('#bk-t'); if (ta) ta.select(); }, 60); break;
      case 'dl-backup': try { const b = new Blob([AZ.exportText()], { type: 'application/json' }); const u = URL.createObjectURL(b); const x = document.createElement('a'); x.href = u; x.download = 'azulejo-backup-' + AZ.today() + '.json'; document.body.appendChild(x); x.click(); x.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000); AZ.toast('Niets gedownload? Gebruik dan Back-up kopiëren.'); } catch (err) { copyText(AZ.exportText()); } break;
      case 'import': AZ.modal(`${closeBtn()}<h3>Een back-up importeren</h3><p class="muted small">Plak de back-uptekst of kies het bestand. Hij wordt samengevoegd met je huidige voortgang; van alles blijft de verste voortgang bewaard.</p><textarea id="imp-t" rows="6" placeholder="{&quot;app&quot;:&quot;azulejo&quot;…"></textarea><input type="file" id="imp-f" accept=".json,application/json"><div class="row gap"><button class="btn ghost" data-act="m-close">Annuleren</button><button class="btn primary" data-act="import-go">Importeren</button></div>`);
        setTimeout(() => { const f = $('#imp-f'); f && f.addEventListener('change', () => { const r = new FileReader(); r.onload = () => { $('#imp-t').value = r.result; }; r.readAsText(f.files[0]); }); }, 50); break;
      case 'import-go': try { AZ.importText($('#imp-t').value); AZ.closeModal(); AZ.toast('Back-up geïmporteerd.'); } catch (err) { AZ.toast(err.message || 'Kon die back-up niet lezen.'); } break;
      case 'reset': AZ.modal(`<h3>Alles wissen?</h3><p>Dit wist alle hoofdstukken, herhalingen, punten en reeksen${AZ.Remote.mode !== 'local' ? ' — ook de opgeslagen kopie' : ''}. Kopieer eerst een back-up als je hem misschien terug wilt.</p><div class="row gap"><button class="btn ghost" data-act="m-close">Voortgang houden</button><button class="btn danger" data-act="reset-go">Wissen</button></div>`); break;
      case 'reset-go': AZ.reset(); AZ.closeModal(); AZ.toast('Opnieuw beginnen. Olá outra vez!'); location.hash = 'course'; break;
      case 'acct-tab': accTab = t.dataset.t; route(); break;
      case 'acct-logout': AZ.modal(`<h3>Uitloggen?</h3><p>Je voortgang blijft in je account. Dit apparaat begint opnieuw, zodat de volgende persoon hier hem niet ziet.</p><div class="row gap"><button class="btn ghost" data-act="m-close">Annuleren</button><button class="btn primary" data-act="acct-logout-go">Uitloggen</button></div>`); break;
      case 'acct-logout-go': AZ.closeModal(); AZ.Account.logout().then(() => { AZ.toast('Uitgelogd.'); route(); }); break;
      case 'acct-pass': AZ.modal(`${closeBtn()}<h3>Wachtwoord wijzigen</h3><form id="acct-pass-form"><input type="text" autocomplete="username" value="${esc(AZ.Account.user() || '')}" hidden><label class="field"><span>Huidig wachtwoord</span><input id="pw-old" type="password" autocomplete="current-password" required></label><label class="field"><span>Nieuw wachtwoord</span><input id="pw-new" type="password" autocomplete="new-password" minlength="8" required></label><label class="field"><span>Nieuw wachtwoord nog een keer</span><input id="pw-new2" type="password" autocomplete="new-password" minlength="8" required></label><div class="row gap"><button class="btn ghost" type="button" data-act="m-close">Annuleren</button><button class="btn primary" type="submit">Wachtwoord wijzigen</button></div></form>`); break;
      case 'acct-delete': AZ.modal(`${closeBtn()}<h3>Je account verwijderen?</h3><p>Dit verwijdert het account <b>${esc(AZ.Account.user() || '')}</b> en alle voortgang daarin, op elk apparaat. Dit kan niet ongedaan worden gemaakt.</p><form id="acct-del-form"><label class="field"><span>Je wachtwoord</span><input id="del-pass" type="password" autocomplete="current-password" required></label><div class="row gap"><button class="btn ghost" type="button" data-act="m-close">Houden</button><button class="btn danger" type="submit">Definitief verwijderen</button></div></form>`); break;
      case 'sync-use': { const v = ($('#sync-in').value || '').trim(); if (!/^az-[a-z0-9]{10,40}$/.test(v)) { AZ.toast('Die code klopt niet (hij begint met az-).'); break; } AZ.S.settings.sync.id = v; AZ.save(true); AZ.Remote.pull().then(() => AZ.toast('Verbonden — voortgang samengevoegd.')); break; }
      case 'sync-ep': AZ.S.settings.sync.endpoint = ($('#sync-ep').value || '').trim(); AZ.S.settings.sync.token = ($('#sync-tok').value || '').trim(); AZ.save(true); AZ.toast('Opgeslagen. Opnieuw verbinden…'); AZ.Remote.init(); break;
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#modal').hidden) AZ.closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.hw, .rw')) { e.preventDefault(); e.target.click(); }
  });
  function copyText(txt) {
    const done = () => AZ.toast('Gekopieerd naar het klembord');
    try { navigator.clipboard.writeText(txt).then(done, fallback); } catch (err) { fallback(); }
    function fallback() { const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e2) { AZ.toast('Kopiëren mislukt — selecteer en kopieer het zelf.'); } ta.remove(); }
  }

  /* ---------------- Boot ---------------- */
  route();
  AZ.Remote.init();
})();
