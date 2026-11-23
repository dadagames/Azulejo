/* Azulejo · views, router and little UI helpers. */
(function () {
  'use strict';
  const AZ = window.AZ, E = AZ.E, G = AZ.G, esc = AZ.esc, I = AZ.icon;
  const $ = (s, r = document) => r.querySelector(s);
  const main = () => $('#main');
  const SEC_COLORS = { 1: 'c1', 2: 'c2', 3: 'c3', 4: 'c4' };

  /* ---------------- Tap-to-translate ---------------- */
  const SMALL = {
    do: 'de + o · of / from the', da: 'de + a · of / from the', dos: 'de + os · of the', das: 'de + as · of the', no: 'em + o · in / on / at the', na: 'em + a · in / on / at the',
    nos: 'em + os · in the; us', nas: 'em + as · in the', num: 'em + um · in a', numa: 'em + uma · in a', ao: 'a + o · to / at the', à: 'a + a · to / at the', aos: 'a + os · to the',
    às: 'a + as · to / at the', pelo: 'por + o · through / by the', pela: 'por + a · through / by the', deste: 'de + este · of this', desta: 'de + esta · of this', neste: 'em + este · in this',
    nesta: 'em + esta · in this', naquele: 'em + aquele · in that', daquele: 'de + aquele · of that', disso: 'de + isso · of that', nisso: 'em + isso · in that', daí: 'from there; so',
    o: 'the (m.); him, it', a: 'the (f.); her, it; to', os: 'the (m. pl.); them', as: 'the (f. pl.); them', um: 'a, one', uma: 'a, one', uns: 'some', umas: 'some',
    que: 'that, which; what; than', se: 'if; oneself', lhe: 'to him / her / you', lhes: 'to them', me: 'me, to me', te: 'you, to you', nos_: 'us', lo: 'him, it', la: 'her, it', los: 'them', las: 'them',
    é: 'is (ser)', cá: 'here', lá: 'there', mais: 'more', muito: 'very; a lot', muita: 'a lot of', muitos: 'many', muitas: 'many', toda: 'all, whole', todos: 'all, everyone', todas: 'all',
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
      const what = v.t === 'inf' ? 'infinitive' : v.t === 'pp' ? 'past participle' : v.t === 'ger' ? 'gerund' : `${T ? T.pt.toLowerCase() : v.t}, ${['eu', 'tu', 'ele/ela', 'nós', 'vós', 'eles/elas'][v.p]}`;
      out.push(`${v.inf} (${what}) — ${vb ? AZ.glossShort(vb.en) : ''}`);
    }
    if (!out.length && SMALL[k]) out.push(SMALL[k]);
    if (!out.length && k.includes('-')) {
      const parts = k.split('-'); let head = parts[0];
      const tries = [head, head + 's', head + 'r', head.replace(/á$/, 'ar').replace(/ê$/, 'er').replace(/i$/, 'ir').replace(/ô$/, 'or'), head + 'z'];
      for (const t of tries) { const r = AZ.lookup(t); if (r) { out.push(r.split(' — ')[0] + ' + ' + parts.slice(1).join('-') + ' — ' + (r.split(' — ')[1] || '')); break; } }
    }
    if (!out.length && SMALL[k]) out.push(SMALL[k]);
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
    let t = $('#toast'); t.textContent = msg; t.classList.add('on');
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
  AZ.wordPopup = function (id) {
    const e = AZ.word(id); if (!e) return;
    const sr = AZ.S.srs['w:' + id];
    const st = sr ? AZ.stageOf(sr[0]) : null;
    const sents = AZ.sentsWithWord(id, 99).slice(0, 3);
    AZ.modal(`<button class="icon-btn m-x" data-act="m-close" aria-label="Close">${I('x')}</button>
      <div class="wcard">${AZ.picHTML(e.pic, 'xl')}<h3 class="pt">${esc(AZ.withArt(e))} <button class="say" data-act="say" data-text="${esc(AZ.article(e) + e.pt)}" aria-label="Listen">${I('speaker')}</button></h3>
      <p>${esc(e.en)}</p>${e.note ? `<p class="t-note">${I('bulb')} ${esc(e.note)}</p>` : ''}
      ${st ? `<p><span class="stage-pill" style="--sc:${st.color}">${st.pt} · ${st.en}</span></p>` : `<p class="muted small">Not in your reviews yet.</p>`}
      ${sents.length ? `<div class="ex-list">${sents.map(s => `<p><button class="say sm" data-act="say" data-text="${esc(s.pt)}" aria-label="Listen">${I('speaker')}</button><span class="pt">${esc(s.pt)}</span><br><small class="muted">${esc(s.en)}</small></p>`).join('')}</div>` : ''}
      ${!sr ? `<button class="btn primary" data-act="add-word" data-id="${esc(id)}">${I('plus')} Add to my reviews</button>` : ''}</div>`);
  };

  /* ---------------- Shell bits ---------------- */
  function syncLabel() {
    const R = AZ.Remote;
    if (R.mode === 'cloud') { const u = AZ.Account && AZ.Account.user(); return { icon: 'cloud', txt: R.status === 'error' ? 'Sync error' : R.status === 'syncing' ? 'Syncing…' : u ? 'Saved to ' + u : 'Synced — no account yet', cls: R.status }; }
    if (R.mode === 'claude') return { icon: 'cloud', txt: R.status === 'error' ? 'Save error' : R.status === 'syncing' ? 'Saving…' : 'Saved to your account', cls: R.status };
    return { icon: 'device', txt: 'Saved on this device', cls: 'local' };
  }
  function renderChrome() {
    const due = AZ.dueList().length, s = AZ.streak(), xp = AZ.todayXP(), goal = AZ.S.settings.goal;
    const h = location.hash.slice(1).split('-')[0] || 'course';
    const map = { verb: 'verbs', deck: 'words', story: 'read', gym: 'practice', ch: 'course', learn: 'course', guide: 'course', review: 'practice' };
    const cur = map[h] || h;
    document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === cur));
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
    return `<section class="card rail-card"><div class="row"><div class="goal-ring big" style="--p:${pct}"><span>${xp}<small>/${goal}</small></span></div><div><h3>Today's points</h3><p class="muted small">${xp >= goal ? 'Goal reached — boa!' : `${goal - xp} to your daily goal`}</p><p class="streak-line">${I('flame')} <b>${AZ.streak()}</b> day streak</p></div></div></section>
      ${cu ? `<a class="card rail-card rail-ch" href="#ch-${cu.id}"><span class="kicker">Estás no capítulo ${cu.n}</span><b>${esc(cu.pt)}</b><span class="muted small">${esc(cu.en)}</span></a>` : ''}
      <section class="card rail-card"><h3>${I('cards')} Revisões</h3><p class="big-n">${due}<small> due now</small></p>
        <div class="fc" aria-label="Reviews coming up in the next 12 hours">${fc.map((n, i) => `<i style="--h:${Math.round(100 * n / max)}%" title="${n} in ${i}h"></i>`).join('')}</div><p class="muted small">next 12 hours</p>
        ${due ? `<button class="btn primary full" data-act="reviews">Start reviews</button>` : `<a class="btn ghost full" href="#practice">Practise</a>`}</section>
      ${w ? `<section class="card rail-card wotd"><h3>Palavra do dia</h3>${AZ.picHTML(w.pic, 'lg')}<p class="pt big">${esc(AZ.withArt(w))} <button class="say sm" data-act="say" data-text="${esc(AZ.article(w) + w.pt)}" aria-label="Listen">${I('speaker')}</button></p><p class="muted">${esc(AZ.glossShort(w.en))}</p></section>` : ''}
      <p class="sync-chip-wrap"><a class="sync-chip" href="#me"></a></p>`;
  }
  function dayHash(n) { const d = AZ.today(); let h = 0; for (const c of d) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % n; }
  function wordOfDay() { const all = [...G.LEX.values()].filter(e => /^(m|f)$/.test(e.type) && e.pic && e.pic[0] !== '#'); return all.length ? all[dayHash(all.length)] : null; }

  /* ---------------- Course: contents and where you are ---------------- */
  function greet() { const h = new Date().getHours(); return h < 13 ? 'Bom dia' : h < 20 ? 'Boa tarde' : 'Boa noite'; }
  function chStatus(u) {
    const r = AZ.chRec(u) || {}, cu = AZ.currentChapter();
    if (r.done) return { cls: 'done', txt: `${I('check')} ${r.best ? r.best + '%' : 'done'}` };
    if (cu === u) return { cls: 'cur', txt: 'Estás aqui' };
    if (r.seen) return { cls: 'seen', txt: r.best ? `test ${r.best}%` : 'started' };
    return { cls: '', txt: '' };
  }
  function viewCourse() {
    const cu = AZ.currentChapter(), due = AZ.dueList().length;
    const name = AZ.S.settings.name ? ', ' + esc(AZ.S.settings.name) : '';
    const rec = recommendedReads(1)[0];
    let html = `<header class="page-head"><h1>${greet()}${name}!</h1><p class="muted">Your European Portuguese course — ${AZ.units.length} chapters from A1 to B1.</p></header>`;
    if (cu) {
      const r = AZ.chRec(cu) || {};
      html += `<section class="card continue ${'c' + cu.s}">
        <div class="cont-main"><span class="kicker">${r.seen ? 'Continue' : 'Next up'} · Capítulo ${cu.n} · ${esc(cu.lv.code)}</span><h2>${esc(cu.pt)}</h2><p class="muted">${esc(cu.en)}</p>
          ${cu.goals.length ? `<ul class="goals-mini">${cu.goals.slice(0, 3).map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
          <div class="row gap wrap"><a class="btn primary" href="#ch-${cu.id}">${I('book')} ${r.seen ? 'Continue the chapter' : 'Start the chapter'}</a>${r.seen ? `<button class="btn ghost" data-act="ch-test" data-u="${cu.id}">${I('target')} Chapter test</button>` : ''}</div></div>
        <div class="cont-n" aria-hidden="true">${cu.n}</div></section>`;
    } else html += `<section class="card continue"><div class="cont-main"><span class="kicker">Parabéns!</span><h2>You've finished every chapter</h2><p class="muted">Keep your reviews going and practise any chapter again whenever you like.</p></div></section>`;
    if (AZ.Account && AZ.Account.available() && !AZ.Account.user() && AZ.S.xp > 0) html += `<a class="card save-nudge" href="#me">${I('cloud')}<span><b>Save your progress to an account</b><small>Pick up where you left off on any device.</small></span>${I('chev')}</a>`;
    html += `<section class="grid3 quick">
      <button class="card act-card" data-act="reviews" ${due ? '' : 'disabled'}>${I('cards')}<b>${due} review${due === 1 ? '' : 's'}</b><span>${due ? 'due now' : 'all caught up'}</span></button>
      <a class="card act-card" href="#practice">${I('bolt')}<b>Praticar</b><span>Writing and conjugation</span></a>
      ${rec ? `<a class="card act-card" href="#story-${rec.id}">${I('book')}<b>${esc(rec.title)}</b><span>Reading for chapter ${(AZ.chapterOfRead[rec.id] || {}).n || ''}</span></a>` : `<a class="card act-card" href="#read">${I('book')}<b>Leitura</b><span>Stories for your level</span></a>`}
    </section>`;
    html += `<div class="toc">`;
    AZ.sections.forEach(sec => {
      const us = AZ.units.filter(u => u.s === sec.id), doneN = us.filter(AZ.chDone).length;
      html += `<section class="level c${sec.id}"><header class="level-head"><span class="lvl">${esc(sec.level)}</span><div><h2>${esc(sec.pt)}</h2><p class="muted">${esc(sec.en)} · ${doneN}/${us.length} chapters</p></div><div class="sec-bar"><span style="width:${Math.round(100 * doneN / us.length)}%"></span></div></header>
        <ol class="ch-list">${us.map(u => { const st = chStatus(u); return `<li><a class="ch-row ${st.cls}" href="#ch-${u.id}"><span class="ch-n">${u.n}</span><span class="ch-t"><b>${esc(u.pt)}</b><small>${esc(u.en)}</small></span><span class="ch-meta">${st.txt}</span>${I('chev')}</a></li>`; }).join('')}</ol></section>`;
    });
    html += `</div>${gramCard()}<section class="card"><h2>Tenses at a glance</h2><div class="tense-guide">${E.TENSES.filter(t => !t.aux || t.k === 'ppc' || t.k === 'mqpc').map(t => { const g = GR().tenses[t.k]; return `<details><summary><b>${esc(t.pt)}</b> <span class="muted">${esc(t.en)}</span></summary><p>${esc(t.use)}</p>${g ? `<p><a class="glink" href="#grammar-${g}">How to form it and when to use it ${I('chev')}</a></p>` : ''}</details>`; }).join('')}</div></section>`;
    main().innerHTML = html;
  }

  function gramCard() {
    const G = GR(); if (!G.groups.length) return '';
    return `<section class="card gram-card"><div class="gc-head">${I('gram', 'gc-i')}<div><h2>Gramática</h2><p class="muted">Every rule of the language in one place, in plain English: the persons, what <b>vós</b> is, how to form every tense, pronouns, articles and more.</p></div></div>
      <div class="gram-links">${G.groups.map(g => `<a href="#grammar-g-${g.id}"><b>${esc(g.pt)}</b><small>${esc(g.en)} · ${g.topics.length} topics</small>${I('chev')}</a>`).join('')}</div>
      <p><a class="btn ghost small" href="#grammar">${I('gram')} Open the grammar</a></p></section>`;
  }

  /* ---------------- Grammar reference ---------------- */
  function gramOrder() { return GR().groups.flatMap(g => g.topics.map(id => ({ id, g }))).filter(x => GR().t[x.id]); }
  function gramChapters(id) { const C = GR().chapters; return AZ.units.filter(u => (C[u.id] || []).includes(id)); }
  let gramQ = '';
  function viewGrammar(anchor) {
    const G = GR(), q = E.stripAccents(gramQ.trim().toLowerCase());
    const hit = id => { if (!q) return true; const T = G.t[id]; return E.stripAccents((T.pt + ' ' + T.en + ' ' + T.text).toLowerCase()).includes(q); };
    main().innerHTML = `<h1 class="page-t">Gramática <small>The reference — every rule, every form</small></h1>
      <section class="card gram-intro"><p>The course chapters teach things a little at a time. This is where it all comes together: look anything up here whenever you need it. New to grammar terms? Start with <a class="glink" href="#grammar-terms">Palavras da gramática</a>, then <a class="glink" href="#grammar-persons">the persons</a> and <a class="glink" href="#grammar-vos">vós</a>.</p>
        <label class="search">${I('search')}<input id="gq" type="search" placeholder="Search the grammar: vós, plural, lhe, quando, há…" value="${esc(gramQ)}" autocomplete="off" spellcheck="false"></label></section>
      ${G.groups.map(g => { const ts = g.topics.filter(id => G.t[id] && hit(id)); return ts.length ? `<section class="gram-group" id="g-${g.id}"><h2>${esc(g.pt)} <small class="muted">${esc(g.en)}</small></h2><div class="gram-grid">${ts.map(id => { const T = G.t[id], chs = gramChapters(id); return `<a class="card gram-topic" href="#grammar-${id}"><b>${esc(T.pt)}</b><span>${esc(T.en)}</span>${chs.length ? `<small class="muted">Chapter ${chs.slice(0, 3).map(u => u.n).join(', ')}</small>` : ''}</a>`; }).join('')}</div></section>` : ''; }).join('') || `<p class="muted">Nothing found for “${esc(gramQ)}”.</p>`}`;
    const inp = $('#gq'); inp.addEventListener('input', () => { gramQ = inp.value; clearTimeout(inp._t); inp._t = setTimeout(() => { const pos = inp.selectionStart; viewGrammar(); const n = $('#gq'); n.focus(); n.setSelectionRange(pos, pos); }, 180); });
    if (anchor) { const el = $('#g-' + anchor); if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 0); }
  }
  function viewGrammarTopic(id) {
    const G = GR(), T = G.t[id]; if (!T) { location.replace('#grammar'); return; }
    const order = gramOrder(), i = order.findIndex(x => x.id === id), grp = order[i].g, prev = order[i - 1], nxt = order[i + 1];
    const chs = gramChapters(id);
    main().innerHTML = `<a class="back" href="#grammar">${I('back')} Gramática</a>
      <article class="chapter gram">
        <header class="ch-head"><span class="kicker">Gramática · ${esc(grp.pt)}</span><h1>${esc(T.pt)}</h1><p class="sub">${esc(T.en)}</p></header>
        <section class="book">${md(T.text)}</section>
        ${chs.length ? `<aside class="gram-box"><h3>${I('book')} In the course</h3><p class="muted small">The chapters where this comes up, with examples, readings and practice.</p><div class="gram-links">${chs.map(u => `<a href="#ch-${u.id}"><b>${u.n}. ${esc(u.pt)}</b><small>${esc(u.en)}${AZ.chDone(u) ? ' · done' : ''}</small>${I('chev')}</a>`).join('')}</div></aside>` : ''}
      </article>
      <nav class="pager">${prev ? `<a href="#grammar-${prev.id}">${I('back')} ${esc(G.t[prev.id].pt)}</a>` : '<span></span>'}${nxt ? `<a href="#grammar-${nxt.id}">${esc(G.t[nxt.id].pt)} ${I('chev')}</a>` : ''}</nav>`;
  }

  /* ---------------- The chapter page ---------------- */
  // the course book's little markup (see data/book.js)
  const GR = () => window.AZ_GRAMMAR || { groups: [], t: {}, chapters: {}, tenses: {} };
  // [[vos]], [[vos|text]], [[u17]]: links to a grammar topic or a chapter
  function linkTo(id, text) {
    if (/^u\d+$/.test(id)) { const u = AZ.units.find(x => x.id === id); return u ? `<a class="glink" href="#ch-${id}">${text || 'chapter ' + u.n}</a>` : esc(text || id); }
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
    return links.length ? `<div class="see-also"><span class="kicker">See also</span><div class="chips">${links.join('')}</div></div>` : '';
  }
  const VOS_TH = `<a class="vos-l" href="#grammar-vos" title="vós — you (plural), old-fashioned. Tap to read about it.">vós</a>`;
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
      if (!l) { close(); return; }
      if (l.startsWith('## ')) { close(); out += `<h2>${inline(l.slice(3))}</h2>`; return; }
      if (l.startsWith('### ')) { close(); out += `<h3>${inline(l.slice(4))}</h3>`; return; }
      if (l.startsWith('- ')) { if (table) close(); if (!list) { out += '<ul>'; list = true; } out += `<li>${inline(l.slice(2))}</li>`; return; }
      if (l.startsWith('> ')) { close(); const [pt, en] = l.slice(2).split(' = '); out += `<p class="ex-line"><button class="say sm" data-act="say" data-text="${esc(pt.replace(/\*/g, ''))}" aria-label="Listen">${I('speaker')}</button><span class="pt">${inline(pt)}</span><span class="en">${inline(en || '')}</span></p>`; return; }
      if (l.startsWith('!tip ')) { close(); out += `<p class="note tipbox">${I('bulb')}<span>${inline(l.slice(5))}</span></p>`; return; }
      if (l.startsWith('!pt ')) { close(); const tx = l.slice(4).replace(/^In Portugal,? (\w)/, (m, c) => c.toUpperCase()); out += `<p class="note ptbox"><span class="flag-pt" aria-hidden="true"></span><span><b>Em Portugal</b> ${inline(tx)}</span></p>`; return; }
      if (l.startsWith('!warn ')) { close(); out += `<p class="note warnbox">${I('info')}<span><b>Watch out</b> ${inline(l.slice(6))}</span></p>`; return; }
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
    return `<aside class="gram-box"><h3>${I('gram')} Look it up in the grammar</h3><p class="muted small">The full rules behind this chapter, with every form — including vós.</p>
      <div class="gram-links">${ids.map(id => { const T = GR().t[id]; return `<a href="#grammar-${id}"><b>${esc(T.pt)}</b><small>${esc(T.en)}</small>${I('chev')}</a>`; }).join('')}</div></aside>`;
  }
  let hideEn = false;
  function viewChapter(id) {
    const u = AZ.units.find(x => x.id === id); if (!u) { location.hash = 'course'; return; }
    AZ.markSeen(u);
    const r = AZ.chRec(u) || {}, prev = AZ.units[u.idx - 1], nxt = AZ.units[u.idx + 1];
    const verbs = AZ.verbsOf([u]);
    const reads = u.reads.map(rid => READS().find(x => x.id === rid)).filter(Boolean);
    const vocab = u.L.map(L => ({ title: L.title, words: L.items.filter(t => !t.startsWith('v:')).map(AZ.word).filter(Boolean), verbs: L.items.filter(t => t.startsWith('v:')).map(t => AZ.verbBy.get(t.slice(2))).filter(Boolean) }));
    const later = AZ.sections.length && u.s >= 2;
    main().innerHTML = `<a class="back" href="#course">${I('back')} Curso</a>
      <article class="chapter c${u.s}">
        <header class="ch-head"><span class="kicker">Capítulo ${u.n} · ${esc(u.lv.code)} · ${esc(u.lv.pt)}</span><h1>${esc(u.pt)}</h1><p class="sub">${esc(u.en)}</p>
          ${r.done ? `<p class="ch-done">${I('check')} Chapter test passed${r.best ? ` · best ${r.best}%` : ''}</p>` : ''}
          <nav class="ch-tabs">${[['text', 'Explicação'], ['vocab', 'Vocabulário'], ['ex', 'Exemplos'], ['read', 'Leitura'], ['prac', 'Praticar']].filter(([k]) => k !== 'read' || reads.length).map(([k, l]) => `<button class="pill" data-act="ch-go" data-s="${k}">${l}</button>`).join('')}</nav>
          <p class="ch-help"><a href="#grammar-terms">${I('bulb')} Not sure what a word like <i>verb</i>, <i>subject</i> or <i>tense</i> means? Every grammar word is explained here.</a></p></header>
        ${u.goals.length ? `<section class="goals"><h2>Neste capítulo <small>In this chapter you'll learn to</small></h2><ul>${u.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul></section>` : ''}
        <section class="book" id="s-text">${md(u.text)}${gramBox(u)}</section>
        <section class="ch-sec" id="s-vocab"><h2>Vocabulário <small>${vocab.reduce((a, g) => a + g.words.length + g.verbs.length, 0)} words and verbs</small></h2>
          ${vocab.map(g => `<h3>${esc(g.title)}</h3><div class="wlist">${g.words.map(wordRow).join('')}${g.verbs.map(v => `<div class="wrow"><a class="wmain" href="#verb-${v.slug}"><span class="pic sm vpic" aria-hidden="true">${I('verbs')}</span><b class="pt">${esc(v.inf)}</b><span class="muted">${esc(AZ.glossShort(v.en))}</span></a><span class="stage-pill none">verb</span><button class="say sm" data-act="say" data-text="${esc(v.inf)}" aria-label="Listen to ${esc(v.inf)}">${I('speaker')}</button></div>`).join('')}</div>`).join('')}
        </section>
        <section class="ch-sec" id="s-ex"><h2>Exemplos <small>${u.S.length} sentences</small></h2>
          <label class="toggle"><input type="checkbox" data-act="hide-en" ${hideEn ? 'checked' : ''}><span>Hide the English — test yourself</span></label>
          <div class="ex-sents ${hideEn ? 'no-en' : ''}">${u.S.map(s => `<p class="ex-line"><button class="say sm" data-act="say" data-text="${esc(s.pt)}" aria-label="Listen">${I('speaker')}</button><span class="pt">${AZ.hintText(s.pt)}</span><span class="en" tabindex="0">${esc(s.en)}</span></p>`).join('')}</div>
        </section>
        ${reads.length ? `<section class="ch-sec" id="s-read"><h2>Leitura <small>read what you've just learned</small></h2><div class="stories">${reads.map(storyCard).join('')}</div></section>` : ''}
        <section class="ch-sec" id="s-prac"><h2>Praticar <small>practise this chapter</small></h2>
          <div class="prac-cards">
            <button class="card act-card" data-act="ch-write" data-u="${u.id}">${I('flag')}<b>Escrita</b><span>Write and translate this chapter's sentences — new ones every time</span></button>
            ${verbs.length ? `<button class="card act-card" data-act="ch-conj" data-u="${u.id}">${I('verbs')}<b>Conjugação</b><span>${esc(verbs.slice(0, 5).join(', '))}${verbs.length > 5 ? '…' : ''} · ${esc(u.tenses.map(t => E.TENSE[t].pt).join(', '))}</span></button>` : ''}
            ${later && verbs.length ? `<button class="card act-card" data-act="ch-mixed" data-u="${u.id}">${I('bolt')}<b>Misto</b><span>Writing and conjugating together</span></button>` : ''}
            ${AZ.canSpeak() ? `<button class="card act-card" data-act="ch-listen" data-u="${u.id}">${I('headphones')}<b>Ditado</b><span>Listen and write what you hear</span></button>` : ''}
          </div>
          ${u.write.length ? `<h3>Escrita livre <small class="muted">${AZ.canCorrect() ? 'Claude corrects your text' : 'compare with a model answer'}</small></h3><div class="free-list">${u.write.map((w, k) => `<div class="free-item"><p>${esc(w.task)}</p><button class="btn ghost small" data-act="free" data-u="${u.id}" data-k="${k}">${I('flag')} Write</button></div>`).join('')}</div>` : ''}
          <div class="card test-card"><div><h3>${I('target')} Teste do capítulo</h3><p class="muted">About 12 typed questions on everything in this chapter. Score 70% to complete it — its words and verbs then join your reviews.${r.best && !r.done ? ` Your best so far: ${r.best}%.` : ''}</p></div>
            <div class="row gap wrap"><button class="btn primary" data-act="ch-test" data-u="${u.id}">${r.done ? 'Take it again' : 'Take the test'}</button>${!r.done ? `<button class="link small" data-act="ch-mark" data-u="${u.id}">Mark as done without the test</button>` : ''}</div></div>
        </section>
      </article>
      <nav class="pager">${prev ? `<a href="#ch-${prev.id}">${I('back')} ${prev.n}. ${esc(prev.pt)}</a>` : '<span></span>'}${nxt ? `<a href="#ch-${nxt.id}">${nxt.n}. ${esc(nxt.pt)} ${I('chev')}</a>` : ''}</nav>`;
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
  function viewPractice() {
    const st = AZ.studied(), chs = scopeChapters(), last = st[st.length - 1];
    const learned = AZ.tensesOf(st);
    if (!prac.tenses) prac.tenses = learned.slice();
    prac.tenses = prac.tenses.filter(t => learned.includes(t)); if (!prac.tenses.length) prac.tenses = ['pres'];
    const mixedOpen = AZ.units.filter(AZ.chDone).length >= AZ.units.filter(u => u.s === 1).length;
    const due = AZ.dueList().length, nd = AZ.nextDue();
    const nextTxt = nd ? (() => { const m = nd - AZ.minNow(); return m < 60 ? `in ${m} min` : m < 1440 ? `in ${Math.round(m / 60)} h` : `in ${Math.round(m / 1440)} days`; })() : '';
    const allT = ['pres', 'pret', 'imp', 'impa', 'impn', 'fut', 'cond', 'cpres', 'cimp', 'cfut'];
    const freeTasks = st.flatMap(u => u.write.map((w, k) => ({ u, k, w }))).reverse();
    const MODES = [['write', 'Escrita', 'flag', 'Write and translate sentences'], ['conj', 'Conjugação', 'verbs', 'Forms, full tables, verbs in sentences'], ['mixed', 'Misto', 'bolt', mixedOpen ? 'Both together' : 'Opens after level A1']];
    main().innerHTML = `<h1 class="page-t">Praticar <small>Write it yourself — no multiple choice</small></h1>
      <section class="card review-strip"><div class="rs-n"><b>${due}</b><span>reviews due</span></div><div class="rs-body"><p>${due ? 'Spaced repetition: the words, verbs and tenses from finished chapters come back just before you forget them.' : Object.keys(AZ.S.srs).length ? `All caught up. Next review ${nextTxt}.` : 'Finish a chapter test and its words and verbs start coming back here for review.'}</p>
        <div class="row gap wrap">${due ? `<button class="btn primary" data-act="reviews">${I('play')} Start ${Math.min(due, AZ.S.settings.batch)} reviews</button>` : ''}<a class="btn ghost small" href="#review">${I('cards')} Review stats</a></div></div></section>
      <section class="card prac">
        <div class="mode-tabs" role="tablist">${MODES.map(([k, l, ic, d]) => `<button class="mode ${prac.mode === k ? 'on' : ''}" role="tab" aria-selected="${prac.mode === k}" data-act="prac-mode" data-m="${k}" ${k === 'mixed' && !mixedOpen ? 'disabled' : ''}>${I(k === 'mixed' && !mixedOpen ? 'lock' : ic)}<b>${l}</b><small>${d}</small></button>`).join('')}</div>
        <div class="cfg">
          <h3>Chapters</h3><div class="chips sel">
            <button class="chip ${prac.scope === 'all' ? 'on' : ''}" data-act="prac-scope" data-s="all">Everything I've studied (1–${last.n})</button>
            <button class="chip ${prac.scope === 'cur' ? 'on' : ''}" data-act="prac-scope" data-s="cur">Only chapter ${last.n}</button>
            <label class="chip sel-ch ${prac.scope === 'one' ? 'on' : ''}">Chapter <select id="prac-ch">${AZ.units.map(u => `<option value="${u.id}" ${prac.ch === u.id ? 'selected' : ''}>${u.n}. ${esc(u.pt)}</option>`).join('')}</select></label></div>
          ${prac.mode === 'conj' ? `<h3>Tenses <small class="muted">the ones you've reached</small></h3><div class="chips sel">${allT.map(t => `<button class="chip ${prac.tenses.includes(t) ? 'on' : ''}" data-act="prac-t" data-t="${t}" ${learned.includes(t) ? '' : 'disabled title="Comes later in the course"'}>${esc(E.TENSE[t].pt)}</button>`).join('')}</div>
            <h3>Verbs</h3><div class="chips sel">${[['mine', 'From these chapters'], ['core', 'Core verbs'], ['irr', 'The irregulars'], ['reg', 'Regular verbs'], ['all', 'All ' + AZ.verbs.length]].map(([k, l]) => `<button class="chip ${prac.vset === k ? 'on' : ''}" data-act="prac-v" data-v="${k}">${l}</button>`).join('')}</div>
            <h3>How</h3><div class="chips sel">${[['all', 'A bit of everything'], ['forms', 'Single forms'], ['tables', 'Whole tables'], ['context', 'In sentences']].map(([k, l]) => `<button class="chip ${prac.fmt === k ? 'on' : ''}" data-act="prac-f" data-f="${k}">${l}</button>`).join('')}</div>
            <p class="muted small">${conjVerbs(prac.vset, chs).length} verbs × ${prac.tenses.length} tense${prac.tenses.length === 1 ? '' : 's'}${AZ.S.settings.vos ? ', vós included' : ''}.</p>` : ''}
          <h3>Length</h3><div class="chips sel">${[8, 12, 20, 30].map(n => `<button class="chip ${prac.n === n ? 'on' : ''}" data-act="prac-n" data-n="${n}">${n}</button>`).join('')}</div>
        </div>
        <button class="btn primary big" data-act="prac-go">${I('play')} Start</button>
      </section>
      <section class="card"><h2>${I('flag')} Escrita livre <small class="muted">write your own texts${AZ.canCorrect() ? ' — Claude corrects them' : ''}</small></h2>
        ${freeTasks.length ? `<div class="free-list">${freeTasks.slice(0, 8).map(({ u, k, w }) => `<div class="free-item"><span class="chip">Cap. ${u.n}</span><p>${esc(w.task)}</p><button class="btn ghost small" data-act="free" data-u="${u.id}" data-k="${k}">Write</button></div>`).join('')}</div>` : '<p class="muted">Tasks appear here as you study chapters.</p>'}</section>
      <section class="grid3">
        <button class="card act-card" data-act="weak">${I('target')}<b>Pontos fracos</b><span>The items you miss most</span></button>
        <button class="card act-card" data-act="listening">${I('headphones')}<b>Ditado</b><span>Listen and write</span></button>
        <a class="card act-card" href="#verbs">${I('verbs')}<b>Verb tables</b><span>Every tense of ${AZ.verbs.length} verbs</span></a>
      </section>`;
    const sel = $('#prac-ch'); sel.addEventListener('change', () => { prac.ch = sel.value; prac.scope = 'one'; viewPractice(); });
  }

  /* ---------------- Reviews page ---------------- */
  function viewReview() {
    const due = AZ.dueList(), counts = AZ.stageCounts(), total = counts.reduce((a, b) => a + b, 0), fc = AZ.forecast(24), max = Math.max(1, ...fc);
    const nd = AZ.nextDue();
    const nextTxt = nd ? (() => { const m = nd - AZ.minNow(); return m < 60 ? `in ${m} min` : m < 1440 ? `in ${Math.round(m / 60)} h` : `in ${Math.round(m / 1440)} days`; })() : '';
    const byType = { w: 0, v: 0, c: 0 }; due.forEach(id => byType[id[0]]++);
    const missed = Object.keys(AZ.S.srs).filter(k => AZ.S.srs[k][4] > AZ.S.srs[k][3] && AZ.S.srs[k][0] < 9).slice(0, 12);
    main().innerHTML = `<a class="back" href="#practice">${I('back')} Praticar</a><h1 class="page-t">Revisões <small>Spaced repetition</small></h1>
      <section class="card review-hero">
        <div class="rh-n"><b>${due.length}</b><span>due now</span></div>
        <div class="rh-body"><p>${due.length ? `${byType.w} words · ${byType.v} verbs · ${byType.c} verb tenses` : total ? `All caught up. Next review ${nextTxt}.` : 'Finish a chapter test and its words and verbs show up here.'}</p>
          <div class="row gap wrap">${due.length ? `<button class="btn primary big" data-act="reviews">${I('play')} Start ${Math.min(due.length, AZ.S.settings.batch)} reviews</button>` : `<a class="btn ghost" href="#course">${I('book')} Go to the course</a>`}</div>
          <p class="muted small">Every answer is typed. Each item climbs the stages below as you remember it; a slip sends it back down.</p></div>
      </section>
      <section class="card"><h2>Your azulejos</h2>
        <div class="stages">${AZ.STAGES.map((s, i) => `<div class="stage" style="--sc:${s.color}"><b>${counts[i]}</b><span>${s.pt}</span><small>${s.en}</small></div>`).join('')}</div>
        <div class="stack-bar">${AZ.STAGES.map((s, i) => `<i style="--sc:${s.color};width:${total ? 100 * counts[i] / total : 0}%"></i>`).join('')}</div></section>
      <section class="card"><h2>Coming up <small class="muted">next 24 hours</small></h2>
        <div class="fc big">${fc.map((n, i) => `<i style="--h:${Math.round(100 * n / max)}%" title="${n} reviews in ${i} h"><em>${n || ''}</em></i>`).join('')}</div>
        <div class="fc-axis"><span>now</span><span>+6h</span><span>+12h</span><span>+18h</span><span>+24h</span></div></section>
      ${missed.length ? `<section class="card"><h2>Tricky ones</h2><div class="chips">${missed.map(id => { const l = AZ.itemLabel(id); return `<span class="chip pt">${esc(l.pt)} <small class="muted">${esc(l.en)}</small></span>`; }).join('')}</div></section>` : ''}`;
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
      results = `<section class="card"><h3>${hits.length} matches</h3><div class="wlist">${hits.slice(0, 60).map(wordRow).join('') || '<p class="muted">Nothing found.</p>'}</div></section>`;
    }
    const mine = (AZ.S.mine || []).filter(id => AZ.word(id));
    main().innerHTML = `<h1 class="page-t">Palavras <small>${G.LEX.size} words in ${AZ.decks.length} themes</small></h1>
      <div class="toolbar"><label class="search">${I('search')}<input id="wq" type="search" placeholder="Search Portuguese or English" value="${esc(wordQ)}" autocomplete="off" spellcheck="false"></label></div>
      ${results}
      ${mine.length ? `<section class="card"><h3>${I('bookmark')} Saved from reading</h3><div class="chips">${mine.map(id => `<button class="chip pt" data-act="word" data-id="${esc(id)}">${esc(AZ.withArt(AZ.word(id)))}</button>`).join('')}</div></section>` : ''}
      <div class="decks">${AZ.decks.map(d => {
        const ids = deckIds(d), learned = ids.filter(id => AZ.srsHas('w:' + id)).length, solid = ids.filter(id => (AZ.S.srs['w:' + id] || [0])[0] >= 5).length;
        return `<a class="deck" href="#deck-${d.id}"><span class="deck-pic">${d.pic}</span><b>${esc(d.pt)}</b><span class="muted">${esc(d.en)}</span>
          <span class="dbar"><i style="width:${100 * learned / ids.length}%"></i><i class="solid" style="width:${100 * solid / ids.length}%"></i></span><small>${learned}/${ids.length} in reviews</small></a>`;
      }).join('')}</div>`;
    const inp = $('#wq'); inp.addEventListener('input', () => { wordQ = inp.value; clearTimeout(inp._t); inp._t = setTimeout(() => { const pos = inp.selectionStart; viewWords(); const n = $('#wq'); n.focus(); n.setSelectionRange(pos, pos); }, 180); });
  }
  function wordRow(e) {
    const sr = AZ.S.srs['w:' + e.id], st = sr ? AZ.stageOf(sr[0]) : null;
    return `<div class="wrow"><button class="wmain" data-act="word" data-id="${esc(e.id)}">${AZ.picHTML(e.pic, 'sm')}<b class="pt">${esc(AZ.withArt(e))}</b><span class="muted">${esc(AZ.glossShort(e.en))}</span></button>
      ${st ? `<span class="stage-pill" style="--sc:${st.color}" title="${st.en}">${st.pt}</span>` : '<span class="stage-pill none">new</span>'}
      <button class="say sm" data-act="say" data-text="${esc(AZ.article(e) + e.pt)}" aria-label="Listen to ${esc(e.pt)}">${I('speaker')}</button></div>`;
  }
  function viewDeck(id) {
    const d = AZ.decks.find(x => x.id === id); if (!d) { location.hash = 'words'; return; }
    const ids = deckIds(d).filter(i => AZ.word(i)), fresh = ids.filter(i => !AZ.srsHas('w:' + i));
    main().innerHTML = `<a class="back" href="#words">${I('back')} Palavras</a>
      <section class="card deck-head"><span class="deck-pic big">${d.pic}</span><div><h1>${esc(d.pt)}</h1><p class="muted">${esc(d.en)} · ${ids.length - fresh.length}/${ids.length} in your reviews</p></div>
        <div class="row gap wrap"><button class="btn primary" data-act="deck-practice" data-d="${d.id}">${I('flag')} Practise (typed)</button><button class="btn ghost" data-act="deck-add" data-d="${d.id}" ${fresh.length ? '' : 'disabled'}>${I('plus')} Add ${fresh.length ? 'all ' + fresh.length : ''} to reviews</button></div></section>
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
      <span class="story-meta">${u ? `<span class="chip">Cap. ${u.n}</span>` : ''}${st ? `<span class="done-tag">${I('check')} ${st.score}/${r.qs.length}</span>` : ahead ? `<span class="muted small">after chapter ${u.n}</span>` : `<span class="len">${Math.max(1, Math.round(r.text.split(/\s+/).length / 110))} min</span>`}</span></a>`;
  }
  function viewRead() {
    const rec = recommendedReads(3), cu = AZ.currentChapter();
    main().innerHTML = `<h1 class="page-t">Leitura <small>Texts that go with each chapter</small></h1>
      <p class="muted lead">Every text uses the grammar and words of its chapter. Tap any word for its meaning, listen along, then answer the questions.</p>
      <section class="card for-you"><h2>${I('star')} Para ti agora <small class="muted">${cu ? `you're on chapter ${cu.n}` : 'any text you like'}</small></h2>
        ${rec.length ? `<div class="stories">${rec.map(storyCard).join('')}</div>` : `<p class="muted">You've read everything up to your chapter — read ahead, or reread an old favourite.</p>`}</section>
      ${AZ.sections.map(sec => {
        const rs = AZ.units.filter(u => u.s === sec.id).flatMap(u => u.reads).map(id => READS().find(r => r.id === id)).filter(Boolean);
        return rs.length ? `<h2 class="grp">${esc(sec.level)} · ${esc(sec.pt)} <small class="muted">${esc(sec.en)}</small></h2><div class="stories">${rs.map(storyCard).join('')}</div>` : '';
      }).join('')}`;
  }
  let storyState = { tr: false, playing: false, token: 0 };
  function viewStory(id) {
    const r = READS().find(x => x.id === id); if (!r) { location.hash = 'read'; return; }
    const paras = r.text.trim().split(/\n\s*\n/);
    const wordsHTML = p => p.split(/(\s+)/).map(w => /^\s+$/.test(w) ? w : `<span class="rw" data-act="rw" tabindex="0">${esc(w)}</span>`).join('');
    const prev = AZ.S.reads[r.id], u = AZ.chapterOfRead[r.id];
    main().innerHTML = `<a class="back" href="#read">${I('back')} Leitura</a>
      <article class="card story-view">
        <header class="sv-head"><span class="story-pic big">${r.pic}</span><div><span class="chip">${r.lvl}</span>${u ? ` <a class="chip" href="#ch-${u.id}">Capítulo ${u.n} · ${esc(u.pt)}</a>` : ''}<h1 class="pt">${esc(r.title)}</h1><p class="muted">${esc(r.en)}</p></div></header>
        <div class="sv-tools"><button class="btn primary" data-act="story-play">${I(storyState.playing ? 'pause' : 'play')} ${storyState.playing ? 'Pause' : 'Listen'}</button>
          <label class="toggle"><input type="checkbox" data-act="story-tr" ${storyState.tr ? 'checked' : ''}><span>Show translation</span></label></div>
        <div class="sv-text" lang="pt-PT">${paras.map((p, k) => `<div class="para" data-k="${k}"><p class="pt">${p.split('\n').map(wordsHTML).join('<br>')}</p>${storyState.tr && r.tr && r.tr[k] ? `<p class="tr">${esc(r.tr[k]).replace(/\n/g, '<br>')}</p>` : ''}</div>`).join('')}</div>
        ${r.gloss ? `<details class="gloss"><summary>${I('book')} Key words (${Object.keys(r.gloss).length})</summary><dl>${Object.entries(r.gloss).map(([k, v]) => `<div><dt class="pt">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></details>` : ''}
      </article>
      <section class="card quiz" id="quiz"><h2>Compreensão</h2>
        ${r.qs.map((q, i) => `<fieldset class="qq" data-i="${i}"><legend><span class="pt">${esc(q.q)}</span><small class="muted">${esc(q.en || '')}</small></legend>${q.o.map((o, j) => `<label class="qo"><input type="radio" name="q${i}" value="${j}"><span class="pt">${esc(o)}</span></label>`).join('')}</fieldset>`).join('')}
        <div class="row gap"><button class="btn primary" data-act="story-check" data-id="${r.id}">Check answers</button>${prev ? `<span class="muted small">Last time: ${prev.score}/${r.qs.length}</span>` : ''}</div><div id="quiz-res"></div></section>`;
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
  function viewStoryRefreshTools() { const b = $('[data-act="story-play"]'); if (b) b.innerHTML = `${I(storyState.playing ? 'pause' : 'play')} ${storyState.playing ? 'Pause' : 'Listen'}`; }

  /* ---------------- Verbs ---------------- */
  let verbFilter = { q: '', f: 'core' };
  function verbBadges(F) {
    const b = [];
    if (F.kind === 'irregular') b.push('<span class="vb irr">irregular</span>');
    else if (F.kind === 'stem') b.push('<span class="vb stem">stem change</span>');
    else if (F.kind === 'spelling') b.push('<span class="vb sp">spelling</span>');
    else if (F.kind === 'pp') b.push('<span class="vb sp">irr. participle</span>');
    else b.push('<span class="vb reg">regular</span>');
    return b.join('');
  }
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
    const FL = [['core', 'Core'], ['all', 'All ' + AZ.verbs.length], ['irr', 'Irregular'], ['ar', '-ar'], ['er', '-er'], ['ir', '-ir'], ['mine', 'Mine']];
    main().innerHTML = `<h1 class="page-t">Verbos <small>${AZ.verbs.length} verbs, every tense</small></h1>
      <div class="toolbar"><label class="search">${I('search')}<input id="vq" type="search" placeholder="Search a verb, a form (fiz, tivesse…) or English" value="${esc(verbFilter.q)}" autocomplete="off" spellcheck="false" lang="pt-PT"></label>
        <a class="btn primary" href="#practice" data-act="prac-mode" data-m="conj">${I('bolt')} Practise conjugation</a></div>
      <p class="verb-help">${I('gram')} New to verbs? Read <a class="glink" href="#grammar-verbs">how verbs work</a>, <a class="glink" href="#grammar-persons">the six persons</a> and <a class="glink" href="#grammar-vos">what vós is</a>. Every tense has an ${I('info')} button with its rules.</p>
      <div class="filters" role="tablist">${FL.map(([k, l]) => `<button class="pill ${f === k && !q ? 'on' : ''}" data-act="vf" data-f="${k}">${l}</button>`).join('')}</div>
      ${formHit && formHit.length ? `<div class="card form-hit">${formHit.slice(0, 4).map(h => { const T = E.TENSE[h.t]; return `<p><b class="pt">${esc(q)}</b> is <a href="#verb-${E.slug(h.inf)}"><b>${esc(h.inf)}</b></a> — ${h.t === 'pp' ? 'past participle' : h.t === 'ger' ? 'gerund' : h.t === 'inf' ? 'infinitive' : esc(T.pt) + ', ' + ['eu', 'tu', 'ele/ela/você', 'nós', 'vós', 'eles/elas/vocês'][h.p]}</p>`; }).join('')}</div>` : ''}
      <div class="verb-list">${list.slice(0, 400).map(v => { const F = E.conjugate(v.inf); return `<a class="verb-row" href="#verb-${v.slug}"><b class="pt">${esc(v.inf)}</b><span class="vgloss">${esc(AZ.glossShort(v.en))}</span>${verbBadges(F)}</a>`; }).join('') || '<p class="muted">No verbs match.</p>'}</div>
      ${list.length > 400 ? `<p class="muted small">Showing 400 of ${list.length}. Search to narrow it down.</p>` : ''}`;
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
    return `<article class="tcard"><header><h3>${esc(T.pt)}</h3><p>${esc(T.en)}</p><button class="icon-btn sm" data-act="tense-info" data-t="${t}" aria-label="When to use ${esc(T.pt)}">${I('info')}</button></header><table>${rows}</table></article>`;
  }
  function viewVerb(slug) {
    const v = AZ.verbBySlug.get(slug);
    if (!v) { main().innerHTML = `<p>Verb not found. <a href="#verbs">Back to verbs</a></p>`; return; }
    const F = E.conjugate(v.inf);
    const groups = [['Indicativo', ['pres', 'pret', 'imp', 'mqp', 'fut', 'cond']], ['Conjuntivo', ['cpres', 'cimp', 'cfut']], ['Imperativo', ['impa', 'impn']], ['Infinitivo pessoal', ['infp']]];
    const comp = ['ppc', 'mqpc', 'futc', 'condc', 'cppc', 'cmqpc', 'cfutc'];
    const inRev = ['pres', 'pret', 'imp'].every(t => AZ.srsHas('c:' + v.inf + ':' + t));
    const sim = AZ.verbs.filter(x => x.inf !== v.inf && (F.base ? E.conjugate(x.inf).base === F.base || x.inf === F.base : false)).slice(0, 8);
    main().innerHTML = `<a class="back" href="#verbs">${I('back')} Verbos</a>
      <section class="card verb-head"><div><h1 class="pt">${esc(v.inf)} <button class="say" data-act="say" data-text="${esc(v.inf)}" aria-label="Listen">${I('speaker')}</button></h1><p class="vh-en">${esc(v.en)}</p>
        <p class="vh-tags">${verbBadges(F)}${(F.tags || []).map(t => `<span class="vb tag">${esc(t)}</span>`).join('')}</p>
        <dl class="vh-forms"><div><dt>Gerúndio</dt><dd><button class="form" data-act="say" data-text="${esc(F.ger)}">${esc(F.ger)}</button></dd></div><div><dt>Particípio</dt><dd><button class="form ${F.marks && F.marks.pp === 2 ? 'irr' : ''}" data-act="say" data-text="${esc(F.pp)}">${esc(F.pp)}</button>${F.pp2 ? ` <span class="muted">/ ${esc(F.pp2)} (with ser, estar)</span>` : ''}</dd></div></dl>
        ${F.note ? `<p class="t-note">${I('bulb')} ${esc(F.note)}</p>` : ''}</div>
        <div class="vh-actions"><button class="btn primary" data-act="verb-gym" data-inf="${esc(v.inf)}">${I('bolt')} Practise this verb</button><button class="btn ghost" data-act="verb-table" data-inf="${esc(v.inf)}" data-t="pres">${I('verbs')} Write a table</button><button class="btn ghost" data-act="verb-add" data-inf="${esc(v.inf)}" ${inRev ? 'disabled' : ''}>${I(inRev ? 'check' : 'plus')} ${inRev ? 'In your reviews' : 'Add to reviews'}</button>
        <label class="toggle"><input type="checkbox" data-act="vos" ${AZ.S.settings.vos ? 'checked' : ''}><span>Include vós when I practise</span></label></div></section>
      <p class="legend"><span class="form irr">irregular</span><span class="form sp">spelling change</span><a class="vos-key" href="#grammar-vos">vós — you (plural), old-fashioned: what is it?</a><span class="muted">Tap any form to hear it, or ${I('info')} for how a tense works.</span></p>
      ${groups.map(([g, ts]) => `<h2 class="grp">${g}</h2><div class="tgrid">${ts.map(t => tableHTML(F, t)).join('')}</div>`).join('')}
      <h2 class="grp"><button class="link" data-act="compound">${I(showCompound ? 'minus' : 'plus')} Tempos compostos <small class="muted">ter + ${esc(F.pp)}</small></button></h2>
      ${showCompound ? `<div class="tgrid">${comp.map(t => tableHTML(F, t)).join('')}</div>` : ''}
      ${sim.length ? `<section class="card"><h3>Conjugated the same way</h3><div class="chips">${sim.map(x => `<a class="chip pt" href="#verb-${x.slug}">${esc(x.inf)}</a>`).join('')}</div></section>` : ''}`;
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
    // azulejo wall
    const ids = Object.keys(S.srs).sort((a, b) => S.srs[b][0] - S.srs[a][0]).slice(0, 600);
    main().innerHTML = `<h1 class="page-t">Eu <small>Progress & settings</small></h1>
      <section class="card me-head"><span class="avatar" aria-hidden="true">${esc((S.settings.name || 'A').trim().charAt(0).toUpperCase())}</span><div><h2>${esc(S.settings.name || 'Aprendiz')}</h2><p class="muted">Nível ${L.lv} · ${S.xp} points · chapter ${AZ.currentChapter() ? AZ.currentChapter().n : AZ.units.length} of ${AZ.units.length}</p><div class="lvl-bar"><span style="width:${Math.round(100 * L.into / L.need)}%"></span></div><p class="muted small">${L.need - L.into} points to level ${L.lv + 1}</p></div></section>
      <section class="card settings" id="saving"><h2>${I('cloud')} Account & saving</h2>
        <p class="sync-chip ${sl.cls}">${I(sl.icon)}<span>${sl.txt}</span></p>${R.status === 'error' && R.error ? `<p class="sync-err small">${esc(R.error)}</p>` : ''}
        ${R.mode === 'cloud' ? accountHTML()
        : R.mode === 'claude' ? `<p>You're using Azulejo on claude.ai, so progress is saved privately to your account and follows you to any device where you open this page. Nobody else can see it.</p>`
        : `<p>Progress is saved in this browser. On your Cloudflare site (see the README) you can create an account and continue on any device.</p>`}
        <details><summary>Advanced: custom sync server</summary><label class="field"><span>API base URL (leave empty to use the one in config.js)</span><input id="sync-ep" value="${esc(S.settings.sync.endpoint)}" placeholder="https://your-site.workers.dev" spellcheck="false"></label>
          <label class="field"><span>Sync password (only if you set SYNC_TOKEN on the Worker)</span><input id="sync-tok" type="password" value="${esc(S.settings.sync.token)}" autocomplete="off"></label>
          <button class="btn ghost small" data-act="sync-ep">Save and reconnect</button></details>
      </section>
      <section class="stats">
        <div class="stat">${I('flame')}<b>${AZ.streak()}</b><span>day streak</span></div>
        <div class="stat">${I('grid')}<b>${AZ.wordsLearned()}</b><span>words learned</span></div>
        <div class="stat">${I('verbs')}<b>${Object.keys(S.srs).filter(k => k[0] === 'c').length}</b><span>verb tenses</span></div>
        <div class="stat">${I('target')}<b>${acc}%</b><span>accuracy</span></div>
        <div class="stat">${I('book')}<b>${AZ.units.filter(AZ.chDone).length}</b><span>chapters done</span></div>
        <div class="stat">${I('flag')}<b>${S.stats.free || 0}</b><span>texts written</span></div>
        <div class="stat">${I('cards')}<b>${S.stats.reviews}</b><span>reviews</span></div>
      </section>
      <section class="card"><h2>A tua parede de azulejos <small class="muted">every tile is something you've learned</small></h2>
        <div class="wall" aria-label="${ids.length} items">${ids.map(id => { const st = AZ.stageOf(S.srs[id][0]); const l = AZ.itemLabel(id); return `<i style="--sc:${st.color}" title="${esc(l.pt)} — ${st.pt}"></i>`; }).join('') || '<p class="muted">Finish your first chapter to lay your first tile.</p>'}</div>
        <div class="stages mini">${AZ.STAGES.map((s, i) => `<span style="--sc:${s.color}"><i></i>${s.pt} ${counts[i]}</span>`).join('')}</div></section>
      <section class="card"><h2>Activity</h2><div class="heat" style="--cols:${Math.ceil(days.length / 7)}">${days.map(([k, v]) => `<i title="${k}: ${v} points" style="--a:${v ? 0.25 + 0.75 * v / maxD : 0}" class="${v ? 'on' : ''}"></i>`).join('')}</div></section>
      <section class="card"><h2>Conquistas <small class="muted">${Object.keys(S.badges).length}/${Object.keys(AZ.BADGES).length}</small></h2><div class="badges">${Object.entries(AZ.BADGES).map(([k, b]) => `<div class="badge ${S.badges[k] ? 'got' : ''}">${I(b[2])}<b>${esc(b[0])}</b><small>${esc(b[1])}</small></div>`).join('')}</div></section>
      <section class="card settings"><h2>${I('gear')} Settings</h2>
        <label class="field"><span>Your name</span><input id="set-name" value="${esc(S.settings.name)}" maxlength="24" placeholder="For the greeting"></label>
        <div class="field"><span>Daily goal (points)</span><div class="chips sel">${[10, 20, 30, 50, 80].map(n => `<button class="chip ${S.settings.goal === n ? 'on' : ''}" data-act="set-goal" data-n="${n}">${n} points</button>`).join('')}</div></div>
        <div class="field"><span>Reviews per session</span><div class="chips sel">${[10, 20, 30, 50].map(n => `<button class="chip ${S.settings.batch === n ? 'on' : ''}" data-act="set-batch" data-n="${n}">${n}</button>`).join('')}</div></div>
        <label class="field"><span>Voice</span><select id="set-voice"><option value="auto">Automatic (best European Portuguese)</option>${AZ.hasClaudeTTS() ? '<option value="claude"' + (S.settings.voice === 'claude' ? ' selected' : '') + '>Claude voice</option>' : ''}${voices.map(v => `<option value="${esc(v.name)}" ${S.settings.voice === v.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></label>
        ${!AZ.hasPTPT() ? `<p class="hint">${I('info')} No European Portuguese voice on this device${voices.length ? ' — using the closest one' : ''}. Edge, Safari and most phones have one; on Windows add “Portuguese (Portugal)” under Settings → Time & language → Speech.</p>` : ''}
        <label class="field"><span>Speed <b id="rate-v">${S.settings.rate.toFixed(2)}</b></span><input id="set-rate" type="range" min="0.6" max="1.2" step="0.05" value="${S.settings.rate}"></label>
        <button class="btn ghost small" data-act="say" data-text="Olá! Bem-vindo ao Azulejo. Vamos aprender português.">${I('speaker')} Test voice</button>
        <label class="toggle"><input type="checkbox" data-act="set-bool" data-k="sound" ${S.settings.sound ? 'checked' : ''}><span>Sound effects</span></label>
        <label class="toggle"><input type="checkbox" data-act="set-bool" data-k="strict" ${S.settings.strict ? 'checked' : ''}><span>Strict accents — a missing accent counts as wrong</span></label>
        <label class="toggle"><input type="checkbox" data-act="set-bool" data-k="vos" ${S.settings.vos ? 'checked' : ''}><span>Practise vós too (old-fashioned — see chapter 2)</span></label>
      </section>
      <section class="card settings"><h2>${I('download')} Backup</h2>
<p class="muted small">Copy your progress as text to keep it safe or move it anywhere.</p>
        <div class="row gap wrap"><button class="btn ghost small" data-act="copy-backup">${I('copy')} Copy backup</button>${window.claude ? '' : `<button class="btn ghost small" data-act="dl-backup">${I('download')} Download</button>`}<button class="btn ghost small" data-act="import">${I('upload')} Import…</button></div>
        <h3 class="danger-t">Start over</h3><button class="btn danger small" data-act="reset">Reset all progress</button>
      </section>

      <p class="muted small center">Azulejo · European Portuguese (AO1990 spelling). Made to be published on your own Cloudflare site.</p>`;
    const nm = $('#set-name'); nm.addEventListener('change', () => { AZ.S.settings.name = nm.value.trim(); AZ.save(true); });
    const vo = $('#set-voice'); vo.addEventListener('change', () => { AZ.S.settings.voice = vo.value; AZ.save(true); AZ.speak('Olá, tudo bem?'); });
    const ra = $('#set-rate'); ra.addEventListener('input', () => { AZ.S.settings.rate = +ra.value; $('#rate-v').textContent = (+ra.value).toFixed(2); }); ra.addEventListener('change', () => AZ.save(true));
  }

  /* ---------------- Account (Cloudflare site) ---------------- */
  let accTab = 'signup';
  function accountHTML() {
    const A = AZ.Account, se = A.session(), S = AZ.S;
    const codeBits = `<details class="adv"><summary>${se ? 'Sync code of this account' : 'No account? Use a sync code instead'}</summary>
        <p class="muted small">${se ? 'Your account uses this code behind the scenes. It only works when you are logged in.' : 'Progress is also saved under this private code. Type it on another device to continue there — no account needed.'}</p>
        <div class="codebox"><code id="sync-code">${esc(S.settings.sync.id)}</code><button class="btn ghost small" data-act="copy" data-text="${esc(S.settings.sync.id)}">${I('copy')} Copy</button></div>
        ${se ? '' : `<label class="field"><span>Have a code from another device?</span><div class="row gap"><input id="sync-in" placeholder="az-…" spellcheck="false" autocomplete="off"><button class="btn ghost small" data-act="sync-use">Use code</button></div></label>`}</details>`;
    if (se && !se.stale) return `<div class="acct-in"><span class="avatar sm" aria-hidden="true">${esc(se.username.charAt(0).toUpperCase())}</span><div><b>Signed in as ${esc(se.username)}</b><p class="muted small">Log in with the same username on any device to continue where you left off.</p></div></div>
      <div class="row gap wrap"><button class="btn ghost small" data-act="acct-logout">Log out</button><button class="btn ghost small" data-act="acct-pass">Change password</button><button class="btn ghost small danger-t" data-act="acct-delete">Delete account</button></div>${codeBits}`;
    const login = accTab === 'login' || (se && se.stale);
    return `${se && se.stale ? `<p class="sync-err small">Your session for ${esc(se.username)} has ended — log in again to keep syncing.</p>` : '<p>Make an account to keep your progress safe and pick it up on any device: phone, laptop, tablet.</p>'}
      <div class="acct-tabs" role="tablist"><button class="pill ${!login ? 'on' : ''}" data-act="acct-tab" data-t="signup" role="tab" aria-selected="${!login}">Create account</button><button class="pill ${login ? 'on' : ''}" data-act="acct-tab" data-t="login" role="tab" aria-selected="${login}">Log in</button></div>
      <form class="acct-form" id="acct-form" data-mode="${login ? 'login' : 'signup'}" autocomplete="on">
        <label class="field"><span>Username</span><input id="acct-user" name="username" autocomplete="username" autocapitalize="off" spellcheck="false" required minlength="3" maxlength="24" value="${esc(se ? se.username : '')}" placeholder="e.g. ana.silva"></label>
        <label class="field"><span>Password</span><input id="acct-pass" name="password" type="password" autocomplete="${login ? 'current-password' : 'new-password'}" required minlength="8" placeholder="${login ? '' : 'At least 8 characters'}"></label>
        ${login ? '' : '<label class="field"><span>Password again</span><input id="acct-pass2" type="password" autocomplete="new-password" required minlength="8"></label>'}
        <button class="btn primary" type="submit">${login ? 'Log in' : 'Create account'}</button>
        <p class="muted small">${login ? 'Progress on this device is merged into your account.' : 'Your progress on this device moves into the new account. There is no email, so remember your password — it can\'t be recovered.'}</p>
      </form>${codeBits}`;
  }
  async function accountSubmit(form) {
    const user = $('#acct-user').value.trim(), pass = $('#acct-pass').value, mode = form.dataset.mode;
    if (!/^[a-zA-Z0-9._-]{3,24}$/.test(user)) { AZ.toast('Usernames are 3–24 letters, numbers, dots, dashes or underscores.'); return; }
    if (pass.length < 8) { AZ.toast('Use at least 8 characters for the password.'); return; }
    if (mode === 'signup' && pass !== $('#acct-pass2').value) { AZ.toast("The two passwords don't match."); return; }
    const btn = form.querySelector('button[type="submit"]'); btn.disabled = true; btn.textContent = mode === 'login' ? 'Logging in…' : 'Creating…';
    try {
      if (mode === 'login') { const j = await AZ.Account.login(user, pass); AZ.toast(`Olá, ${j.username}! Your progress is here.`); }
      else { await AZ.Account.signup(user, pass); AZ.toast('Account created — your progress is saved to it.'); }
      route();
    } catch (e) {
      // keep what was typed, so only the password needs fixing
      AZ.toast(e.message || 'That did not work.');
      btn.disabled = false; btn.textContent = mode === 'login' ? 'Log in' : 'Create account';
      const pw = $('#acct-pass'); if (pw) { pw.value = ''; pw.focus(); }
    }
  }
  document.addEventListener('submit', e => { if (e.target.id === 'acct-form') { e.preventDefault(); accountSubmit(e.target); } else if (e.target.id === 'acct-pass-form') { e.preventDefault(); passwordSubmit(); } else if (e.target.id === 'acct-del-form') { e.preventDefault(); deleteSubmit(); } });
  async function passwordSubmit() {
    const o = $('#pw-old').value, n = $('#pw-new').value;
    if (n.length < 8) { AZ.toast('Use at least 8 characters.'); return; }
    if (n !== $('#pw-new2').value) { AZ.toast("The new passwords don't match."); return; }
    try { await AZ.Account.changePassword(o, n); AZ.closeModal(); AZ.toast('Password changed. Other devices need to log in again.'); } catch (e) { AZ.toast(e.message); }
  }
  async function deleteSubmit() {
    try { await AZ.Account.remove($('#del-pass').value); AZ.closeModal(); AZ.toast('Account deleted.'); route(); } catch (e) { AZ.toast(e.message); }
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
      else if (name === 'verbs') viewVerbs();
      else if (name === 'verb') viewVerb(arg);
      else if (name === 'words') viewWords();
      else if (name === 'deck') viewDeck(arg);
      else if (name === 'read') viewRead();
      else if (name === 'story') viewStory(arg);
      else if (name === 'me') viewMe();
      else if (name === 'grammar') { if (!arg) viewGrammar(); else if (arg.startsWith('g-')) viewGrammar(arg.slice(2)); else viewGrammarTopic(arg); }
      else viewCourse();
    } catch (e) { console.error(e); main().innerHTML = `<div class="card"><h2>Something went wrong</h2><p class="muted">${esc(e.message)}</p><a class="btn primary" href="#course">Back to the course</a></div>`; }
    renderChrome();
  }
  AZ.render = route;
  let lastHash = location.hash;
  window.addEventListener('hashchange', () => { AZ.closeModal(); if (location.hash.split('-')[0] !== lastHash.split('-')[0] || !/^#(verb|deck|story)/.test(location.hash)) window.scrollTo(0, 0); lastHash = location.hash; route(); });
  AZ.onChange(kind => { if (kind === 'sync' || kind === 'voices') { renderChrome(); if (kind === 'voices' && /^#(me|ch|practice)/.test(location.hash) && !AZ.inSession() && !storyState.playing) { const y = window.scrollY; route(); window.scrollTo(0, y); } return; } if (!AZ.inSession()) { const y = window.scrollY; route(); window.scrollTo(0, y); } });

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
      case 'rw': { const r = READS().find(x => location.hash === '#story-' + x.id); const w = t.textContent.replace(/[.,!?;:¿¡…"“”«»()—–]/g, ''); const g = AZ.lookup(w, r && r.gloss); showTip(t, g ? g : w + ' — (no entry)'); if (!storyState.playing) AZ.speak(w); const ids = AZ.formIndex.get(w.toLowerCase()); if (ids && g && !AZ.srsHas('w:' + ids[0])) { setTimeout(() => { if (tip && tip.style.display === 'block') { tip.innerHTML += ` <button class="tip-save" data-act="save-word" data-id="${esc(ids[0])}">${I('bookmark')} Save</button>`; } }, 10); } break; }
      case 'save-word': { const id = t.dataset.id; if (!AZ.S.mine.includes(id)) AZ.S.mine.push(id); AZ.save(true); AZ.toast('Saved to your words'); hideTip(); break; }
      case 'm-close': AZ.closeModal(); break;
      case 'word': AZ.wordPopup(t.dataset.id); break;
      case 'add-word': AZ.srsAdd('w:' + t.dataset.id); AZ.save(); AZ.closeModal(); AZ.toast('Added to your reviews'); break;
      // chapters
      case 'ch-go': { const el = $('#s-' + t.dataset.s); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); break; }
      case 'hide-en': hideEn = t.checked; { const box = $('.ex-sents'); if (box) box.classList.toggle('no-en', hideEn); } break;
      case 'ch-test': AZ.startChapterTest(findUnit(t.dataset.u)); break;
      case 'ch-mark': { const u = findUnit(t.dataset.u); AZ.modal(`<h3>Mark chapter ${u.n} as done?</h3><p>Its words and verbs will join your reviews, and the course moves on to the next chapter. You won't get the test points.</p><div class="row gap"><button class="btn ghost" data-act="m-close">Cancel</button><button class="btn primary" data-act="ch-mark-go" data-u="${u.id}">Mark as done</button></div>`); break; }
      case 'ch-mark-go': { const u = findUnit(t.dataset.u); AZ.completeChapter(u, 0); AZ.closeModal(); AZ.save(); AZ.toast(`Chapter ${u.n} marked as done.`); break; }
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
        AZ.modal(`<button class="icon-btn m-x" data-act="m-close" aria-label="Close">${I('x')}</button><h3>${esc(T.pt)}</h3><p class="muted">${esc(T.en)}</p><p>${esc(T.use)}</p>
          ${reg ? `<p class="small"><b>The regular pattern</b> — the endings in bold are what you add to the stem:</p>${reg}` : ''}
          ${GT ? `<a class="btn primary" href="#grammar-${g}">${I('gram')} ${esc(GT.pt)}: the full explanation</a>` : ''}`);
        break;
      }
      case 'verb-gym': AZ.startVerb(t.dataset.inf); break;
      case 'verb-table': { const inf = t.dataset.inf, ts = AZ.tensesOf(AZ.studied()); AZ.startConjugation({ verbs: [inf], tenses: ts, format: 'tables', n: Math.min(4, ts.length) }); break; }
      case 'verb-add': { const inf = t.dataset.inf; AZ.srsAdd('v:' + inf); ['pres', 'pret', 'imp'].forEach(x => AZ.srsAdd('c:' + inf + ':' + x)); AZ.save(); AZ.toast(inf + ' added: presente, perfeito, imperfeito'); break; }
      // words
      case 'deck-practice': { const d = AZ.decks.find(x => x.id === t.dataset.d); AZ.startDeckPractice(d, deckIds(d).filter(i => AZ.word(i))); break; }
      case 'deck-add': { const d = AZ.decks.find(x => x.id === t.dataset.d); const n = deckIds(d).filter(i => AZ.word(i) && AZ.srsAdd('w:' + i)).length; AZ.save(); AZ.toast(`${n} words added — the first reviews come in about 4 hours.`); break; }
      // reading
      case 'story-play': { const r = READS().find(x => location.hash === '#story-' + x.id); if (r) storyPlay(r); break; }
      case 'story-tr': storyState.tr = t.checked; { const r = READS().find(x => location.hash === '#story-' + x.id); const y = window.scrollY; const was = storyState.playing; if (was) stopStory(); viewStory(r.id); window.scrollTo(0, y); } break;
      case 'story-check': {
        const r = READS().find(x => x.id === t.dataset.id); let score = 0, answered = 0;
        r.qs.forEach((q, i) => { const sel = document.querySelector(`input[name="q${i}"]:checked`); const fs = document.querySelector(`.qq[data-i="${i}"]`); fs.classList.remove('ok', 'bad'); if (sel) { answered++; const ok = +sel.value === q.a; if (ok) score++; fs.classList.add(ok ? 'ok' : 'bad'); } fs.querySelectorAll('.qo').forEach((lab, j) => lab.classList.toggle('right', j === q.a && !!sel)); });
        if (answered < r.qs.length) { AZ.toast('Answer every question first.'); break; }
        const prev = AZ.S.reads[r.id]; const xp = prev ? 3 : 10 + score * 2;
        AZ.S.reads[r.id] = { score: Math.max(score, prev ? prev.score : 0), at: Date.now() };
        if (Object.keys(AZ.S.reads).length >= 5) AZ.badge('reader');
        AZ.addXP(xp); AZ.save(true); renderChrome(); AZ.sfx(score === r.qs.length ? 'done' : 'ok');
        const nextR = recommendedReads(1)[0];
        $('#quiz-res').innerHTML = `<p class="quiz-score">${score}/${r.qs.length} · +${xp} points ${score === r.qs.length ? '— perfeito!' : ''}</p>${nextR ? `<p><a class="btn ghost small" href="#story-${nextR.id}">Next: ${esc(nextR.title)} ${I('chev')}</a></p>` : ''}`;
        break;
      }
      // me
      case 'set-goal': AZ.S.settings.goal = +t.dataset.n; AZ.save(); break;
      case 'set-batch': AZ.S.settings.batch = +t.dataset.n; AZ.save(); break;
      case 'set-bool': AZ.S.settings[t.dataset.k] = t.checked; AZ.save(true); renderChrome(); break;
      case 'copy': copyText(t.dataset.src ? ($('#' + t.dataset.src) || {}).value || '' : t.dataset.text); break;
      case 'copy-backup': AZ.modal(`<button class="icon-btn m-x" data-act="m-close" aria-label="Close">${I('x')}</button><h3>Your backup</h3><p class="muted small">Keep this text somewhere safe, or paste it into Import on another copy of Azulejo (for example your own site).</p><textarea id="bk-t" rows="7" readonly spellcheck="false">${esc(AZ.exportText())}</textarea><div class="row gap"><button class="btn ghost" data-act="m-close">Close</button><button class="btn primary" data-act="copy" data-src="bk-t">${I('copy')} Copy</button></div>`); setTimeout(() => { const ta = $('#bk-t'); if (ta) ta.select(); }, 60); break;
      case 'dl-backup': try { const b = new Blob([AZ.exportText()], { type: 'application/json' }); const u = URL.createObjectURL(b); const x = document.createElement('a'); x.href = u; x.download = 'azulejo-backup-' + AZ.today() + '.json'; document.body.appendChild(x); x.click(); x.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000); AZ.toast('If nothing downloaded, use Copy backup instead.'); } catch (err) { copyText(AZ.exportText()); } break;
      case 'import': AZ.modal(`<button class="icon-btn m-x" data-act="m-close" aria-label="Close">${I('x')}</button><h3>Import a backup</h3><p class="muted small">Paste the backup text or pick the file. It's merged with your current progress, keeping the furthest progress for every item.</p><textarea id="imp-t" rows="6" placeholder="{&quot;app&quot;:&quot;azulejo&quot;…"></textarea><input type="file" id="imp-f" accept=".json,application/json"><div class="row gap"><button class="btn ghost" data-act="m-close">Cancel</button><button class="btn primary" data-act="import-go">Import</button></div>`);
        setTimeout(() => { const f = $('#imp-f'); f && f.addEventListener('change', () => { const r = new FileReader(); r.onload = () => { $('#imp-t').value = r.result; }; r.readAsText(f.files[0]); }); }, 50); break;
      case 'import-go': try { AZ.importText($('#imp-t').value); AZ.closeModal(); AZ.toast('Backup imported.'); } catch (err) { AZ.toast(err.message || 'Could not read that backup.'); } break;
      case 'reset': AZ.modal(`<h3>Reset everything?</h3><p>This deletes all chapters, reviews, points and streaks${AZ.Remote.mode !== 'local' ? ' — including the saved copy' : ''}. Copy a backup first if you might want it back.</p><div class="row gap"><button class="btn ghost" data-act="m-close">Keep my progress</button><button class="btn danger" data-act="reset-go">Reset</button></div>`); break;
      case 'reset-go': AZ.reset(); AZ.closeModal(); AZ.toast('Fresh start. Olá outra vez!'); location.hash = 'course'; break;
      case 'acct-tab': accTab = t.dataset.t; route(); break;
      case 'acct-logout': AZ.modal(`<h3>Log out?</h3><p>Your progress stays in your account. This device starts fresh, so the next person here won't see it.</p><div class="row gap"><button class="btn ghost" data-act="m-close">Cancel</button><button class="btn primary" data-act="acct-logout-go">Log out</button></div>`); break;
      case 'acct-logout-go': AZ.closeModal(); AZ.Account.logout().then(() => { AZ.toast('Logged out.'); route(); }); break;
      case 'acct-pass': AZ.modal(`<button class="icon-btn m-x" data-act="m-close" aria-label="Close">${I('x')}</button><h3>Change password</h3><form id="acct-pass-form"><input type="text" autocomplete="username" value="${esc(AZ.Account.user() || '')}" hidden><label class="field"><span>Current password</span><input id="pw-old" type="password" autocomplete="current-password" required></label><label class="field"><span>New password</span><input id="pw-new" type="password" autocomplete="new-password" minlength="8" required></label><label class="field"><span>New password again</span><input id="pw-new2" type="password" autocomplete="new-password" minlength="8" required></label><div class="row gap"><button class="btn ghost" type="button" data-act="m-close">Cancel</button><button class="btn primary" type="submit">Change password</button></div></form>`); break;
      case 'acct-delete': AZ.modal(`<button class="icon-btn m-x" data-act="m-close" aria-label="Close">${I('x')}</button><h3>Delete your account?</h3><p>This deletes the account <b>${esc(AZ.Account.user() || '')}</b> and all the progress saved in it, on every device. It can't be undone.</p><form id="acct-del-form"><label class="field"><span>Your password</span><input id="del-pass" type="password" autocomplete="current-password" required></label><div class="row gap"><button class="btn ghost" type="button" data-act="m-close">Keep it</button><button class="btn danger" type="submit">Delete for good</button></div></form>`); break;
      case 'sync-use': { const v = ($('#sync-in').value || '').trim(); if (!/^az-[a-z0-9]{10,40}$/.test(v)) { AZ.toast('That code does not look right (it starts with az-).'); break; } AZ.S.settings.sync.id = v; AZ.save(true); AZ.Remote.pull().then(() => AZ.toast('Connected — progress merged.')); break; }
      case 'sync-ep': AZ.S.settings.sync.endpoint = ($('#sync-ep').value || '').trim(); AZ.S.settings.sync.token = ($('#sync-tok').value || '').trim(); AZ.save(true); AZ.toast('Saved. Reconnecting…'); AZ.Remote.init(); break;
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#modal').hidden) AZ.closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.hw, .rw')) { e.preventDefault(); e.target.click(); }
  });
  function copyText(txt) {
    const done = () => AZ.toast('Copied to the clipboard');
    try { navigator.clipboard.writeText(txt).then(done, fallback); } catch (err) { fallback(); }
    function fallback() { const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e2) { AZ.toast('Copy failed — select and copy by hand.'); } ta.remove(); }
  }

  /* ---------------- Boot ---------------- */
  route();
  AZ.Remote.init();
  setInterval(() => { if (!AZ.inSession()) renderChrome(); }, 60000);
})();
