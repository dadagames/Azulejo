global.window = {};
['vocab','verbs','gen','course-a1','course-a2b1','readings','readings2','book','book2'].forEach(f => require('../public/data/' + f + '.js'));
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
  c.text.split('\n').forEach(l => {
    l = l.trim();
    if (l.startsWith('@conj ')) { const [vs, t] = l.slice(6).split(/\s+/); if (!PTE.TENSE[t]) { console.log('BAD TENSE', id, l); bad++; } vs.split(',').forEach(v => { const F = PTE.conjugate(v); if (!F || !F[t]) { console.log('BAD CONJ', id, v, t); bad++; } }); }
    if (l.startsWith('> ') && !l.includes(' = ')) { console.log('EXAMPLE WITHOUT ENGLISH', id, l); bad++; }
    if (/^\|/.test(l) && !/\|$/.test(l)) { console.log('TABLE ROW NOT CLOSED', id, l); bad++; }
  });
  c.write.forEach(w => { if (!w.task || !w.model) { console.log('WRITE TASK INCOMPLETE', id); bad++; } });
});
const words = Object.values(B.ch).reduce((a, c) => a + c.text.split(/\s+/).length, 0);
console.log('sentences', nS, 'readings', window.AZ_READ.length, 'book words', words, 'problems', bad);
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
