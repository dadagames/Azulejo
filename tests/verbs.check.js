global.window = {};
require('../public/data/verbs.js');
const E = require('../public/js/engine.js');
const lines = window.AZ_VERBS.trim().split('\n');
const seen = new Set(); let bad = 0, core = 0; const kinds = {};
for (const l of lines) {
  const [raw, gloss] = l.split('|');
  const inf = raw.replace('*', ''); if (raw.startsWith('*')) core++;
  if (seen.has(inf)) { console.log('DUP', inf); bad++; } seen.add(inf);
  const F = E.conjugate(inf);
  if (!F) { console.log('FAIL', inf); bad++; continue; }
  kinds[F.kind] = (kinds[F.kind] || 0) + 1;
  if (!gloss) { console.log('NO GLOSS', inf); bad++; }
}
console.log('verbs:', lines.length, 'core:', core, 'bad:', bad, kinds);
// spot-check -ir verbs with e/o/u stems that are NOT tagged (possible missed stem changes)
const ir = [...seen].filter(v => /ir$/.test(v));
const untagged = ir.filter(v => { const F = E.conjugate(v); return F.kind === 'regular' || F.kind==='spelling'; });
console.log('\nUntagged -ir verbs:', untagged.join(' '));
const sample = ['abster','vestir','progredir','agir','frequentar','atrair','possuir','reler','rever','condizer','deduzir','estrear','sossegar','despir','aderir','tossir','sumir','extinguir','afligir','aceder','construir','ver','intervir','entreter','aquecer','agradecer','almoçar','chumbar'];
for (const v of sample) { const F = E.conjugate(v); if (!F) { console.log('nf', v); continue;} console.log(v.padEnd(12), F.kind.padEnd(9), F.pres.join(' '), '|', F.pret.join(' '), '|', F.cpres[0], F.pp); }
