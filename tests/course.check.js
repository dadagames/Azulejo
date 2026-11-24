global.window = {};
['vocab','verbs','gen','course-a1','course-a2b1','readings','readings2','book','book2','grammar','grammar2'].forEach(f => require('../public/data/' + f + '.js'));
global.PTE = require('../public/js/engine.js');
const G = require('../public/js/generator.js');
G.load(window.AZ_DECKS, window.AZ_VERBS, window.AZ_GEN);
let bad = 0;
const units = window.AZ_COURSE.units;
console.log('units', units.length, 'sections', window.AZ_COURSE.sections.length);
let nS = 0;
units.forEach(u => {
  u.lessons.forEach((l, li) => {
    const [t, items] = l.split('|');
    items.split(',').map(s => s.trim()).forEach(it => {
      if (it.startsWith('v:')) { if (!G.VERBS.has(it.slice(2))) { console.log('MISSING VERB', u.id, it); bad++; } }
      else if (!G.LEX.has(it)) { console.log('MISSING WORD', u.id, li, it); bad++; }
    });
  });
  (u.gen || []).forEach(g => { if (!G.T[g]) { console.log('MISSING TEMPLATE', u.id, g); bad++; } });
  u.sents.trim().split('\n').forEach(line => {
    const s = G.parseSent(line); nS++;
    if (!s.en || !s.pt) { console.log('BAD SENT', u.id, line); bad++; }
    if (!s.lesson) { console.log('NO LESSON TAG', u.id, line); }
    s.blanks.forEach(b => { if (!s.pt.includes(b)) { console.log('BLANK NOT IN PT', u.id, b); bad++; } });
  });
});
window.AZ_READ.forEach(r => {
  const n = r.text.trim().split(/\n\s*\n/).length;
  if (n !== r.tr.length) { console.log('TR MISMATCH', r.id, n, r.tr.length); bad++; }
  r.qs.forEach(q => { if (q.a >= q.o.length) { console.log('BAD ANSWER', r.id); bad++; } });
});
// the markup shared by the course book and the grammar reference
const GR = window.AZ_GRAMMAR, unitIds = new Set(units.map(u => u.id));
const linkOk = id => /^u\d+$/.test(id) ? unitIds.has(id) : !!GR.t[id];
function nestOk(line) {
  // the same bold/italic rules as ui.js inline(); tags must nest
  const h = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  const st = []; for (const m of h.matchAll(/<(\/?)([bi])>/g)) { if (!m[1]) st.push(m[2]); else if (st.pop() !== m[2]) return false; }
  return !st.length && !/\*/.test(h.replace(/<[^>]+>/g, '').replace(/\d\s*\*\s*\d/g, ''));
}
function checkText(id, text) {
  let cols = 0;
  text.split('\n').forEach(l => {
    l = l.trim();
    if (!/^\|/.test(l)) cols = 0;
    if (l.startsWith('@conj ')) { const [vs, t] = l.slice(6).split(/\s+/); if (!PTE.TENSE[t]) { console.log('BAD TENSE', id, l); bad++; } vs.split(',').forEach(v => { const F = PTE.conjugate(v); if (!F || !F[t]) { console.log('BAD CONJ', id, v, t); bad++; } }); return; }
    if (l.startsWith('@see ')) { l.slice(5).split(/[\s,]+/).filter(Boolean).forEach(x => { if (!linkOk(x)) { console.log('BAD SEE', id, x); bad++; } }); return; }
    if (l.startsWith('@deel ')) { const m = l.match(/^@deel\s+(.+?)(?:\s*\{([\d,\s]*)\})?$/); if (!m || !m[1].trim()) { console.log('BAD DEEL', id, l); bad++; } else if (m[2] != null) m[2].split(',').forEach(n => { if (!(+n >= 1 && +n <= 9)) { console.log('BAD DEEL LESSON', id, l); bad++; } }); return; }
    if (l.startsWith('@')) { console.log('UNKNOWN MARKUP', id, l); bad++; }
    if (l.startsWith('> ') && !l.includes(' = ')) { console.log('EXAMPLE WITHOUT ENGLISH', id, l); bad++; }
    if (/^\|/.test(l)) {
      if (!/\|$/.test(l)) { console.log('TABLE ROW NOT CLOSED', id, l); bad++; }
      const n = l.replace(/^\|!?|\|$/g, '').split('|').length;
      if (cols && n !== cols) { console.log('TABLE COLUMNS', id, cols, '→', n, l.slice(0, 70)); bad++; }
      cols = cols || n;
    }
    for (const m of l.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) if (!linkOk(m[1])) { console.log('BAD LINK', id, m[1]); bad++; }
    if (!nestOk(l.replace(/\[\[[^\]]+\]\]/g, 'x'))) { console.log('BOLD/ITALIC MISMATCH', id, l.slice(0, 90)); bad++; }
  });
}
// the grammar reference
const gTopics = GR.groups.flatMap(g => g.topics);
if (new Set(gTopics).size !== gTopics.length) { console.log('GRAMMAR TOPIC LISTED TWICE'); bad++; }
gTopics.forEach(id => { const T = GR.t[id]; if (!T || !T.pt || !T.en || !T.text) { console.log('GRAMMAR TOPIC MISSING', id); bad++; } });
Object.keys(GR.t).forEach(id => { if (!gTopics.includes(id)) { console.log('GRAMMAR TOPIC NOT IN A GROUP', id); bad++; } checkText('g:' + id, GR.t[id].text); });
Object.entries(GR.chapters).forEach(([u, ts]) => { if (!unitIds.has(u)) { console.log('GRAMMAR MAP BAD CHAPTER', u); bad++; } ts.forEach(t => { if (!GR.t[t]) { console.log('GRAMMAR MAP BAD TOPIC', u, t); bad++; } }); });
units.forEach(u => { if (!(GR.chapters[u.id] || []).length) { console.log('CHAPTER WITHOUT GRAMMAR LINKS', u.id); bad++; } });
gTopics.forEach(id => { if (!Object.values(GR.chapters).some(ts => ts.includes(id))) console.log('GRAMMAR TOPIC NOT LINKED FROM A CHAPTER', id); });
PTE.TENSES.forEach(t => { if (!GR.tenses[t.k] || !GR.t[GR.tenses[t.k]]) { console.log('TENSE WITHOUT GRAMMAR PAGE', t.k); bad++; } });
// every vós form the reference quotes in its vós tables is what the engine produces
(GR.t.vos.text.match(/^\| [a-zô]+ \| [a-zçáéíóúâêôãõ]+ \| [a-zçáéíóúâêôãõ]+ \| [a-zçáéíóúâêôãõ!]+ \|$/gm) || []).forEach(row => {
  const [v, pres, pret, imp] = row.replace(/^\||\|$/g, '').split('|').map(x => x.trim()); const F = PTE.conjugate(v);
  if (!F) return; if (F.pres[4] !== pres || F.pret[4] !== pret || F.impa[4] + '!' !== imp) { console.log('VÓS TABLE', v, pres, pret, imp, '≠', F.pres[4], F.pret[4], F.impa[4]); bad++; }
});
{ // the regular vós table: every tense of falar, comer, partir
  const map = { 'Presente': 'pres', 'Pretérito perfeito': 'pret', 'Pretérito imperfeito': 'imp', 'Mais-que-perfeito': 'mqp', 'Futuro': 'fut', 'Condicional': 'cond', 'Presente do conjuntivo': 'cpres', 'Imperfeito do conjuntivo': 'cimp', 'Futuro do conjuntivo': 'cfut', 'Imperativo': 'impa', 'Imperativo negativo': 'impn', 'Infinitivo pessoal': 'infp' };
  let rows = 0;
  GR.t.vos.text.split('\n').forEach(l => { const c = l.replace(/^\||\|$/g, '').split('|').map(x => x.trim()), k = map[c[0]]; if (!k) return; rows++;
    ['falar', 'comer', 'partir'].forEach((v, i) => { const want = c[i + 1].replace(/^não /, '').replace(/!$/, ''), got = PTE.conjugate(v)[k][4]; if (want !== got) { console.log('VÓS TENSE TABLE', k, v, want, '≠', got); bad++; } }); });
  if (rows !== 12) { console.log('VÓS TENSE TABLE has', rows, 'rows'); bad++; }
}
// the course book
const B = window.AZ_BOOK, ids = new Set(units.map(u => u.id)), inBook = B.levels.flatMap(l => l.chapters);
if (inBook.length !== units.length || new Set(inBook).size !== units.length || inBook.some(id => !ids.has(id))) { console.log('BOOK ORDER does not cover every unit'); bad++; }
const readIds = new Set(window.AZ_READ.map(r => r.id));
if (readIds.size !== window.AZ_READ.length) { console.log('DUPLICATE READING IDS'); bad++; }
inBook.forEach(id => {
  const c = B.ch[id];
  if (!c || !c.text || !c.goals || !c.goals.length || !c.write || !c.write.length) { console.log('CHAPTER INCOMPLETE', id); bad++; return; }
  (B.reads[id] || []).forEach(r => { if (!readIds.has(r)) { console.log('MISSING READING', id, r); bad++; } });
  if (!(B.reads[id] || []).length) console.log('NO READING', id);
  checkText(id, c.text);
  c.write.forEach(w => { if (!w.task || !w.model) { console.log('WRITE TASK INCOMPLETE', id); bad++; } });
});
const words = Object.values(B.ch).reduce((a, c) => a + c.text.split(/\s+/).length, 0);
const gWords = Object.values(GR.t).reduce((a, t) => a + t.text.split(/\s+/).length, 0);
console.log('sentences', nS, 'readings', window.AZ_READ.length, 'book words', words, 'grammar topics', gTopics.length, 'grammar words', gWords, 'problems', bad);
// generation per unit with a growing known set
let seed = 3; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const known = new Set();
units.forEach(u => {
  u.lessons.forEach(l => l.split('|')[1].split(',').map(s => s.trim()).forEach(it => known.add(it)));
  const ctx = { K: id => known.has(id), level: 3, rnd, tense: u.tense };
  const out = [];
  for (let i = 0; i < 12 && out.length < 3; i++) { const t = u.gen[i % Math.max(1, u.gen.length)]; if (!t) break; const r = G.make(t, ctx); if (r && !out.find(o => o.pt === r.pt)) out.push(r); }
  console.log(`\n${u.id} ${u.pt} [${u.gen.join(',')}]`);
  out.forEach(r => console.log('   ', r.pt, ' = ', r.en));
});
