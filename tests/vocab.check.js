global.window = {};
require('../public/data/vocab.js');
const ids = new Map(); let n = 0, bad = 0;
const types = new Set('m f mf m.pl f.pl adj adv prep conj pron det num int phr prop'.split(' '));
for (const d of window.AZ_DECKS) {
  const lines = d.words.trim().split('\n');
  for (const l of lines) {
    const p = l.split('|'); n++;
    const ex = Object.fromEntries(p.slice(4).map(x => x.split('=')));
    const id = ex.id || p[0];
    if (!types.has(p[2])) { console.log('BAD TYPE', d.id, l); bad++; }
    if (!p[1]) { console.log('NO EN', l); bad++; }
    if (ids.has(id)) { console.log('DUP', id, 'in', d.id, 'and', ids.get(id)); bad++; }
    ids.set(id, d.id);
  }
  console.log(d.id.padEnd(12), lines.length);
}
console.log('total', n, 'bad', bad);
