global.window = {};
require('../public/data/vocab.js'); require('../public/data/verbs.js'); require('../public/data/gen.js');
global.PTE = require('../public/js/engine.js');
const G = require('../public/js/generator.js');
G.load(window.AZ_DECKS, window.AZ_VERBS, window.AZ_GEN);
let seed = +(process.argv[3] || 7); const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const all = new Set([...G.LEX.keys(), ...[...G.VERBS.keys()].map(v => 'v:' + v)]);
const ctx = { K: id => all.has(id), level: 9, rnd, debug: true };
const tpls = (process.argv[2] || 'np,isto,ha,ser_nat,ser_prof,svo,sv_adv,sv_lang,morar,gostar,querer,ter_num,idade,custar,poss_np,poss_ser,ser_adj,estar_adj,np_adj,dem_adj,estar_loc,ficar_loc,ha_loc,onde,ir_a,horas,at_time,reflex,ir_inf,prog,prog_iv,ter_de,modal,doer,impa,impa_dir,ir_de,comp,tao,gostaria,espero,quero_que,talvez,se_cimp,se_cfut,pron_obj,pron_ind').split(',');
const N = +(process.argv[4] || 4);
for (const t of tpls) {
  for (const tense of (t === 'svo' || t === 'sv_adv' ? ['pres', 'pret', 'imp', 'fut', 'cond'] : [undefined])) {
    for (let i = 0; i < N; i++) {
      const r = G.make(t, Object.assign({}, ctx, { tense }));
      if (!r) { console.log(`[${t}] NULL`); continue; }
      console.log(`[${t}${tense ? ':' + tense : ''}] ${r.pt}  =  ${r.en}${r.hint ? '  (' + r.hint + ')' : ''}`);
      if (process.env.ALTS) console.log('      ptAlt:', r.ptAlt.slice(0, 6).join(' | '), '\n      enAlt:', r.enAlt.slice(0, 4).join(' | '));
    }
  }
}
