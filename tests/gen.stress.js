// Generate thousands of sentences with every template and look for broken output.
global.window = {};
require('../public/data/vocab.js'); require('../public/data/verbs.js'); require('../public/data/gen.js');
global.PTE = require('../public/js/engine.js');
const E = global.PTE;
const G = require('../public/js/generator.js');
G.load(window.AZ_DECKS, window.AZ_VERBS, window.AZ_GEN);
let seed = 12345; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const all = new Set([...G.LEX.keys(), ...[...G.VERBS.keys()].map(v => 'v:' + v)]);
const T = Object.keys(G.T);
let n = 0, bad = 0, nul = 0;
const names = ['Miguel', 'Inês', 'Rui', 'Sofia', 'João', 'Pedro', 'Ana', 'Lissabon', 'Porto', 'Sintra', 'Parijs', 'Londen'];
for (const t of T) for (const tense of ['pres', 'pret', 'imp', 'fut', 'cond', undefined]) for (let i = 0; i < 40; i++) {
  let r;
  try { r = G.make(t, { K: id => all.has(id), level: 9, rnd, tense }); } catch (e) { console.log('THROW', t, e.message); bad++; continue; }
  if (!r) { nul++; continue; }
  n++;
  const pts = [r.pt].concat(r.ptAlt || []), ens = [r.en].concat(r.enAlt || []);
  const probs = [];
  [...pts, ...ens].forEach(s => { if (typeof s !== 'string' || !s.trim()) probs.push('empty'); else if (/undefined|null|NaN|\[object|\s{2,}| [,.?!]/.test(s)) probs.push('junk: ' + s); });
  ens.forEach(s => names.forEach(nm => { if (new RegExp('(?<![\\p{L}])' + nm.toLowerCase() + '(?![\\p{L}])', 'u').test(s)) probs.push('lowercase name: ' + s); }));
  pts.forEach(s => { if (/(?<![\p{L}])(the|is|are|my|your)(?![\p{L}])/iu.test(s)) probs.push('english in pt: ' + s); });
  // feminine subjects need feminine adjectives
  pts.forEach(s => { if (/^(Elas|A senhora|As senhoras|A minha (mãe|avó|irmã|mulher|namorada|filha|tia|prima|amiga))\b.*\b(é|são|era|eram) (espanhol|espanhóis|português|portugueses|inglês|ingleses|francês|alemão|brasileiro|americano|italiano)\b/u.test(s)) probs.push('gender agreement: ' + s); });
  const c = E.check(r.pt, pts, { lang: 'pt' }); if (!c.ok) probs.push('self-check fails');
  const c2 = E.check(r.en, ens, { lang: 'nl' }); if (!c2.ok) probs.push('nl self-check fails');
  // the Dutch side: no English left, no broken verb forms
  ens.forEach(s => { if (/(?<![\p{L}'])(the|are|my|your|you|he|she|they|will|would|have|has|does|don't)(?![\p{L}])/iu.test(s)) probs.push('english in nl: ' + s); });
  ens.forEach(s => { if ((/(?<![\p{L}])(gat|stat|slat)(?![\p{L}])/iu.test(s) || /^(Zult|Kunt|Wilt|Hebt|Bent|Komt|Gaat|Ziet|Staat|Wordt|Houdt|Vindt|Speelt|Leest|Koopt|Werkt) je\b/.test(s))) probs.push('bad dutch verb: ' + s); });
  if (probs.length) { bad++; if (bad < 40) console.log(`[${t}:${tense}]`, r.pt, '=', r.en, '→', probs.join('; ')); }
}
console.log(`templates ${T.length}, sentences ${n}, empty ${nul}, problems ${bad}`);
process.exit(bad ? 1 : 0);
