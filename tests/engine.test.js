// Run: node tests/engine.test.js
const E = require('../public/js/engine.js');
let fails = 0, passes = 0;
function eq(inf, tense, expected) {
  const F = E.conjugate(inf);
  if (!F) { console.log('NO CONJ', inf); fails++; return; }
  const got = Array.isArray(F[tense]) ? F[tense].map(x => x == null ? '-' : x).join(',') : F[tense];
  const exp = Array.isArray(expected) ? expected.join(',') : expected;
  if (got !== exp) { fails++; console.log(`FAIL ${inf} ${tense}\n  got: ${got}\n  exp: ${exp}`); } else passes++;
}
const T = (inf, o) => Object.entries(o).forEach(([k, v]) => eq(inf, k, v.includes(',') || k !== 'pp' && k !== 'ger' && k !== 'pp2' ? v.split(',') : v));

T('falar', {
  pres: 'falo,falas,fala,falamos,falais,falam', pret: 'falei,falaste,falou,falámos,falastes,falaram',
  imp: 'falava,falavas,falava,falávamos,faláveis,falavam', mqp: 'falara,falaras,falara,faláramos,faláreis,falaram',
  fut: 'falarei,falarás,falará,falaremos,falareis,falarão', cond: 'falaria,falarias,falaria,falaríamos,falaríeis,falariam',
  cpres: 'fale,fales,fale,falemos,faleis,falem', cimp: 'falasse,falasses,falasse,falássemos,falásseis,falassem',
  cfut: 'falar,falares,falar,falarmos,falardes,falarem', impa: '-,fala,fale,falemos,falai,falem', impn: '-,fales,fale,falemos,faleis,falem',
  infp: 'falar,falares,falar,falarmos,falardes,falarem', ger: 'falando', pp: 'falado',
});
T('comer', {
  pres: 'como,comes,come,comemos,comeis,comem', pret: 'comi,comeste,comeu,comemos,comestes,comeram',
  imp: 'comia,comias,comia,comíamos,comíeis,comiam', mqp: 'comera,comeras,comera,comêramos,comêreis,comeram',
  cpres: 'coma,comas,coma,comamos,comais,comam', cimp: 'comesse,comesses,comesse,comêssemos,comêsseis,comessem',
  cfut: 'comer,comeres,comer,comermos,comerdes,comerem', impa: '-,come,coma,comamos,comei,comam', pp: 'comido', ger: 'comendo',
});
T('partir', {
  pres: 'parto,partes,parte,partimos,partis,partem', pret: 'parti,partiste,partiu,partimos,partistes,partiram',
  mqp: 'partira,partiras,partira,partíramos,partíreis,partiram', cimp: 'partisse,partisses,partisse,partíssemos,partísseis,partissem',
  impa: '-,parte,parta,partamos,parti,partam',
});
T('ser', {
  pres: 'sou,és,é,somos,sois,são', pret: 'fui,foste,foi,fomos,fostes,foram', imp: 'era,eras,era,éramos,éreis,eram',
  mqp: 'fora,foras,fora,fôramos,fôreis,foram', fut: 'serei,serás,será,seremos,sereis,serão',
  cpres: 'seja,sejas,seja,sejamos,sejais,sejam', cimp: 'fosse,fosses,fosse,fôssemos,fôsseis,fossem', cfut: 'for,fores,for,formos,fordes,forem',
  impa: '-,sê,seja,sejamos,sede,sejam', pp: 'sido', ger: 'sendo',
});
T('estar', {
  pres: 'estou,estás,está,estamos,estais,estão', pret: 'estive,estiveste,esteve,estivemos,estivestes,estiveram',
  cimp: 'estivesse,estivesses,estivesse,estivéssemos,estivésseis,estivessem', cfut: 'estiver,estiveres,estiver,estivermos,estiverdes,estiverem',
  cpres: 'esteja,estejas,esteja,estejamos,estejais,estejam', impa: '-,está,esteja,estejamos,estai,estejam', imp: 'estava,estavas,estava,estávamos,estáveis,estavam',
});
T('ter', {
  pres: 'tenho,tens,tem,temos,tendes,têm', pret: 'tive,tiveste,teve,tivemos,tivestes,tiveram', imp: 'tinha,tinhas,tinha,tínhamos,tínheis,tinham',
  mqp: 'tivera,tiveras,tivera,tivéramos,tivéreis,tiveram', cpres: 'tenha,tenhas,tenha,tenhamos,tenhais,tenham',
  cimp: 'tivesse,tivesses,tivesse,tivéssemos,tivésseis,tivessem', cfut: 'tiver,tiveres,tiver,tivermos,tiverdes,tiverem',
  impa: '-,tem,tenha,tenhamos,tende,tenham', pp: 'tido', fut: 'terei,terás,terá,teremos,tereis,terão',
});
T('ir', {
  pres: 'vou,vais,vai,vamos,ides,vão', pret: 'fui,foste,foi,fomos,fostes,foram', imp: 'ia,ias,ia,íamos,íeis,iam',
  cpres: 'vá,vás,vá,vamos,vades,vão', cimp: 'fosse,fosses,fosse,fôssemos,fôsseis,fossem', impa: '-,vai,vá,vamos,ide,vão',
  fut: 'irei,irás,irá,iremos,ireis,irão', pp: 'ido', ger: 'indo',
});
T('vir', {
  pres: 'venho,vens,vem,vimos,vindes,vêm', pret: 'vim,vieste,veio,viemos,viestes,vieram', imp: 'vinha,vinhas,vinha,vínhamos,vínheis,vinham',
  cimp: 'viesse,viesses,viesse,viéssemos,viésseis,viessem', cfut: 'vier,vieres,vier,viermos,vierdes,vierem', cpres: 'venha,venhas,venha,venhamos,venhais,venham',
  impa: '-,vem,venha,venhamos,vinde,venham', pp: 'vindo', ger: 'vindo',
});
T('fazer', {
  pres: 'faço,fazes,faz,fazemos,fazeis,fazem', pret: 'fiz,fizeste,fez,fizemos,fizestes,fizeram', fut: 'farei,farás,fará,faremos,fareis,farão',
  cond: 'faria,farias,faria,faríamos,faríeis,fariam', cpres: 'faça,faças,faça,façamos,façais,façam', cimp: 'fizesse,fizesses,fizesse,fizéssemos,fizésseis,fizessem',
  cfut: 'fizer,fizeres,fizer,fizermos,fizerdes,fizerem', impa: '-,faz,faça,façamos,fazei,façam', pp: 'feito', mqp: 'fizera,fizeras,fizera,fizéramos,fizéreis,fizeram',
});
T('dizer', { pres: 'digo,dizes,diz,dizemos,dizeis,dizem', pret: 'disse,disseste,disse,dissemos,dissestes,disseram', fut: 'direi,dirás,dirá,diremos,direis,dirão', cpres: 'diga,digas,diga,digamos,digais,digam', pp: 'dito', cimp: 'dissesse,dissesses,dissesse,disséssemos,dissésseis,dissessem' });
T('trazer', { pres: 'trago,trazes,traz,trazemos,trazeis,trazem', pret: 'trouxe,trouxeste,trouxe,trouxemos,trouxestes,trouxeram', fut: 'trarei,trarás,trará,traremos,trareis,trarão', cpres: 'traga,tragas,traga,tragamos,tragais,tragam', pp: 'trazido' });
T('poder', { pres: 'posso,podes,pode,podemos,podeis,podem', pret: 'pude,pudeste,pôde,pudemos,pudestes,puderam', cpres: 'possa,possas,possa,possamos,possais,possam', cimp: 'pudesse,pudesses,pudesse,pudéssemos,pudésseis,pudessem', cfut: 'puder,puderes,puder,pudermos,puderdes,puderem' });
T('querer', { pres: 'quero,queres,quer,queremos,quereis,querem', pret: 'quis,quiseste,quis,quisemos,quisestes,quiseram', cpres: 'queira,queiras,queira,queiramos,queirais,queiram', cfut: 'quiser,quiseres,quiser,quisermos,quiserdes,quiserem', impa: '-,quer,queira,queiramos,querei,queiram' });
T('saber', { pres: 'sei,sabes,sabe,sabemos,sabeis,sabem', pret: 'soube,soubeste,soube,soubemos,soubestes,souberam', cpres: 'saiba,saibas,saiba,saibamos,saibais,saibam', cimp: 'soubesse,soubesses,soubesse,soubéssemos,soubésseis,soubessem' });
T('pôr', {
  pres: 'ponho,pões,põe,pomos,pondes,põem', pret: 'pus,puseste,pôs,pusemos,pusestes,puseram', imp: 'punha,punhas,punha,púnhamos,púnheis,punham',
  fut: 'porei,porás,porá,poremos,poreis,porão', cpres: 'ponha,ponhas,ponha,ponhamos,ponhais,ponham', cimp: 'pusesse,pusesses,pusesse,puséssemos,pusésseis,pusessem',
  cfut: 'puser,puseres,puser,pusermos,puserdes,puserem', infp: 'pôr,pores,pôr,pormos,pordes,porem', impa: '-,põe,ponha,ponhamos,ponde,ponham', pp: 'posto', ger: 'pondo',
});
T('compor', { pres: 'componho,compões,compõe,compomos,compondes,compõem', pret: 'compus,compuseste,compôs,compusemos,compusestes,compuseram', infp: 'compor,compores,compor,compormos,compordes,comporem', pp: 'composto', ger: 'compondo', fut: 'comporei,comporás,comporá,comporemos,comporeis,comporão' });
T('ver', { pres: 'vejo,vês,vê,vemos,vedes,veem', pret: 'vi,viste,viu,vimos,vistes,viram', imp: 'via,vias,via,víamos,víeis,viam', cimp: 'visse,visses,visse,víssemos,vísseis,vissem', cfut: 'vir,vires,vir,virmos,virdes,virem', pp: 'visto', impa: '-,vê,veja,vejamos,vede,vejam' });
T('prever', { pres: 'prevejo,prevês,prevê,prevemos,prevedes,preveem', pp: 'previsto', pret: 'previ,previste,previu,previmos,previstes,previram' });
T('dar', { pres: 'dou,dás,dá,damos,dais,dão', pret: 'dei,deste,deu,demos,destes,deram', cpres: 'dê,dês,dê,dêmos,deis,deem', cimp: 'desse,desses,desse,déssemos,désseis,dessem', mqp: 'dera,deras,dera,déramos,déreis,deram', cfut: 'der,deres,der,dermos,derdes,derem' });
T('ler', { pres: 'leio,lês,lê,lemos,ledes,leem', pret: 'li,leste,leu,lemos,lestes,leram', cpres: 'leia,leias,leia,leiamos,leiais,leiam', imp: 'lia,lias,lia,líamos,líeis,liam', cimp: 'lesse,lesses,lesse,lêssemos,lêsseis,lessem', pp: 'lido' });
T('haver', { pres: 'hei,hás,há,havemos,haveis,hão', pret: 'houve,houveste,houve,houvemos,houvestes,houveram', cpres: 'haja,hajas,haja,hajamos,hajais,hajam', imp: 'havia,havias,havia,havíamos,havíeis,haviam' });
T('manter', { pres: 'mantenho,manténs,mantém,mantemos,mantendes,mantêm', pret: 'mantive,mantiveste,manteve,mantivemos,mantivestes,mantiveram', impa: '-,mantém,mantenha,mantenhamos,mantende,mantenham', imp: 'mantinha,mantinhas,mantinha,mantínhamos,mantínheis,mantinham' });
T('convir', { pres: 'convenho,convéns,convém,convimos,convindes,convêm', pp: 'convindo' });
T('sair', {
  pres: 'saio,sais,sai,saímos,saís,saem', pret: 'saí,saíste,saiu,saímos,saístes,saíram', imp: 'saía,saías,saía,saíamos,saíeis,saíam',
  cpres: 'saia,saias,saia,saiamos,saiais,saiam', cimp: 'saísse,saísses,saísse,saíssemos,saísseis,saíssem', cfut: 'sair,saíres,sair,sairmos,sairdes,saírem',
  infp: 'sair,saíres,sair,sairmos,sairdes,saírem', impa: '-,sai,saia,saiamos,saí,saiam', pp: 'saído', ger: 'saindo', mqp: 'saíra,saíras,saíra,saíramos,saíreis,saíram',
});
T('incluir', { pres: 'incluo,incluis,inclui,incluímos,incluís,incluem', pret: 'incluí,incluíste,incluiu,incluímos,incluístes,incluíram', imp: 'incluía,incluías,incluía,incluíamos,incluíeis,incluíam', cpres: 'inclua,incluas,inclua,incluamos,incluais,incluam', pp: 'incluído', cfut: 'incluir,incluíres,incluir,incluirmos,incluirdes,incluírem' });
T('construir', { pres: 'construo,constróis,constrói,construímos,construís,constroem', impa: '-,constrói,construa,construamos,construí,construam', pp: 'construído' });
T('roer', { pres: 'roo,róis,rói,roemos,roeis,roem', pret: 'roí,roeste,roeu,roemos,roestes,roeram', imp: 'roía,roías,roía,roíamos,roíeis,roíam', pp: 'roído', cimp: 'roesse,roesses,roesse,roêssemos,roêsseis,roessem' });
T('passear', { pres: 'passeio,passeias,passeia,passeamos,passeais,passeiam', cpres: 'passeie,passeies,passeie,passeemos,passeeis,passeiem', pret: 'passeei,passeaste,passeou,passeámos,passeastes,passearam', impa: '-,passeia,passeie,passeemos,passeai,passeiem' });
T('odiar', { pres: 'odeio,odeias,odeia,odiamos,odiais,odeiam', cpres: 'odeie,odeies,odeie,odiemos,odieis,odeiem' });
T('enviar', { pres: 'envio,envias,envia,enviamos,enviais,enviam', cpres: 'envie,envies,envie,enviemos,envieis,enviem' });
T('seguir', { pres: 'sigo,segues,segue,seguimos,seguis,seguem', cpres: 'siga,sigas,siga,sigamos,sigais,sigam', imp: 'seguia,seguias,seguia,seguíamos,seguíeis,seguiam', pret: 'segui,seguiste,seguiu,seguimos,seguistes,seguiram', pp: 'seguido' });
T('sentir', { pres: 'sinto,sentes,sente,sentimos,sentis,sentem', cpres: 'sinta,sintas,sinta,sintamos,sintais,sintam' });
T('preferir', { pres: 'prefiro,preferes,prefere,preferimos,preferis,preferem' });
T('vestir', { pres: 'visto,vestes,veste,vestimos,vestis,vestem' });
T('servir', { pres: 'sirvo,serves,serve,servimos,servis,servem' });
T('repetir', { pres: 'repito,repetes,repete,repetimos,repetis,repetem' });
T('divertir', { pres: 'divirto,divertes,diverte,divertimos,divertis,divertem' });
T('agredir', { pres: 'agrido,agrides,agride,agredimos,agredis,agridem' });
T('prevenir', { pres: 'previno,prevines,previne,prevenimos,prevenis,previnem' });
T('dormir', { pres: 'durmo,dormes,dorme,dormimos,dormis,dormem', cpres: 'durma,durmas,durma,durmamos,durmais,durmam' });
T('cobrir', { pres: 'cubro,cobres,cobre,cobrimos,cobris,cobrem', pp: 'coberto' });
T('descobrir', { pres: 'descubro,descobres,descobre,descobrimos,descobris,descobrem', pp: 'descoberto' });
T('tossir', { pres: 'tusso,tosses,tosse,tossimos,tossis,tossem' });
T('subir', { pres: 'subo,sobes,sobe,subimos,subis,sobem', cpres: 'suba,subas,suba,subamos,subais,subam', impa: '-,sobe,suba,subamos,subi,subam' });
T('fugir', { pres: 'fujo,foges,foge,fugimos,fugis,fogem', cpres: 'fuja,fujas,fuja,fujamos,fujais,fujam' });
T('consumir', { pres: 'consumo,consomes,consome,consumimos,consumis,consomem' });
T('ouvir', { pres: 'ouço,ouves,ouve,ouvimos,ouvis,ouvem', cpres: 'ouça,ouças,ouça,ouçamos,ouçais,ouçam', pret: 'ouvi,ouviste,ouviu,ouvimos,ouvistes,ouviram' });
T('pedir', { pres: 'peço,pedes,pede,pedimos,pedis,pedem', cpres: 'peça,peças,peça,peçamos,peçais,peçam' });
T('perder', { pres: 'perco,perdes,perde,perdemos,perdeis,perdem', cpres: 'perca,percas,perca,percamos,percais,percam' });
T('valer', { pres: 'valho,vales,vale,valemos,valeis,valem' });
T('rir', { pres: 'rio,ris,ri,rimos,rides,riem', pret: 'ri,riste,riu,rimos,ristes,riram', cimp: 'risse,risses,risse,ríssemos,rísseis,rissem', impa: '-,ri,ria,riamos,ride,riam', imp: 'ria,rias,ria,ríamos,ríeis,riam' });
T('sorrir', { pres: 'sorrio,sorris,sorri,sorrimos,sorrides,sorriem' });
T('conhecer', { pres: 'conheço,conheces,conhece,conhecemos,conheceis,conhecem', cpres: 'conheça,conheças,conheça,conheçamos,conheçais,conheçam', pret: 'conheci,conheceste,conheceu,conhecemos,conhecestes,conheceram' });
T('proteger', { pres: 'protejo,proteges,protege,protegemos,protegeis,protegem', cpres: 'proteja,protejas,proteja,protejamos,protejais,protejam' });
T('dirigir', { pres: 'dirijo,diriges,dirige,dirigimos,dirigis,dirigem' });
T('distinguir', { pres: 'distingo,distingues,distingue,distinguimos,distinguis,distinguem', cpres: 'distinga,distingas,distinga,distingamos,distingais,distingam' });
T('erguer', { pres: 'ergo,ergues,ergue,erguemos,ergueis,erguem' });
T('ficar', { pret: 'fiquei,ficaste,ficou,ficámos,ficastes,ficaram', cpres: 'fique,fiques,fique,fiquemos,fiqueis,fiquem' });
T('chegar', { pret: 'cheguei,chegaste,chegou,chegámos,chegastes,chegaram', cpres: 'chegue,chegues,chegue,cheguemos,chegueis,cheguem' });
T('começar', { pret: 'comecei,começaste,começou,começámos,começastes,começaram', cpres: 'comece,comeces,comece,comecemos,comeceis,comecem', pres: 'começo,começas,começa,começamos,começais,começam' });
T('produzir', { pres: 'produzo,produzes,produz,produzimos,produzis,produzem', impa: '-,produz,produza,produzamos,produzi,produzam' });
T('conduzir', { pres: 'conduzo,conduzes,conduz,conduzimos,conduzis,conduzem' });
T('abrir', { pp: 'aberto', pres: 'abro,abres,abre,abrimos,abris,abrem' });
T('escrever', { pp: 'escrito' });
T('pagar', { pp: 'pago', pret: 'paguei,pagaste,pagou,pagámos,pagastes,pagaram' });
T('aceitar', { pp: 'aceitado', pp2: 'aceite' });
T('proibir', { pres: 'proíbo,proíbes,proíbe,proibimos,proibis,proíbem', impa: '-,proíbe,proíba,proibamos,proibi,proíbam' });
T('caber', { pres: 'caibo,cabes,cabe,cabemos,cabeis,cabem', cpres: 'caiba,caibas,caiba,caibamos,caibais,caibam' });
T('requerer', { pres: 'requeiro,requeres,requer,requeremos,requereis,requerem', pret: 'requeri,requereste,requereu,requeremos,requerestes,requereram' });
T('satisfazer', { pres: 'satisfaço,satisfazes,satisfaz,satisfazemos,satisfazeis,satisfazem', pp: 'satisfeito', fut: 'satisfarei,satisfarás,satisfará,satisfaremos,satisfareis,satisfarão' });
T('obter', { pres: 'obtenho,obténs,obtém,obtemos,obtendes,obtêm', pp: 'obtido' });
T('voar', { pres: 'voo,voas,voa,voamos,voais,voam', pret: 'voei,voaste,voou,voámos,voastes,voaram' });
T('nascer', { pres: 'nasço,nasces,nasce,nascemos,nasceis,nascem' });
T('cair', { pres: 'caio,cais,cai,caímos,caís,caem' });
T('crer', { pres: 'creio,crês,crê,cremos,credes,creem' });
T('doer', { pres: 'doo,dóis,dói,doemos,doeis,doem' });
eq('falar', 'ppc', 'tenho falado,tens falado,tem falado,temos falado,tendes falado,têm falado'.split(','));
eq('fazer', 'mqpc', 'tinha feito,tinhas feito,tinha feito,tínhamos feito,tínheis feito,tinham feito'.split(','));

// English
const en = [['eat', 's', 'eats'], ['go', 's', 'goes'], ['study', 's', 'studies'], ['watch', 's', 'watches'], ['play', 's', 'plays'], ['have', 's', 'has'],
  ['stop', 'past', 'stopped'], ['travel', 'past', 'travelled'], ['visit', 'past', 'visited'], ['open', 'past', 'opened'], ['prefer', 'past', 'preferred'],
  ['run', 'ing', 'running'], ['make', 'ing', 'making'], ['lie', 'ing', 'lying'], ['see', 'ing', 'seeing'], ['swim', 'ing', 'swimming'], ['begin', 'ing', 'beginning'],
  ['look for', 'past', 'looked for'], ['get up', 's', 'gets up'], ['try', 'past', 'tried'], ['cook', 'past', 'cooked'], ['fix', 'past', 'fixed'], ['snow', 'ing', 'snowing'],
  ['cancel', 'past', 'cancelled'], ['listen', 'past', 'listened'], ['control', 'past', 'controlled'], ['buy', 'past', 'bought'], ['dance', 'past', 'danced'],
  ['plan', 'past', 'planned'], ['shop', 'ing', 'shopping'], ['feel', 'past', 'felt'], ['fail', 'past', 'failed'], ['clean', 'past', 'cleaned'], ['need', 'past', 'needed'],
  ['quit', 'ing', 'quitting'], ['wait', 'ing', 'waiting'], ['rain', 'ing', 'raining'], ['enjoy', 'past', 'enjoyed'], ['worry', 's', 'worries'], ['kiss', 's', 'kisses']];
en.forEach(([b, f, x]) => { const g = E.en(b, f); if (g !== x) { fails++; console.log('EN FAIL', b, f, g, '!=', x); } else passes++; });

// Checker
const C = [
  [['Eu como pão', ['Eu como pão.']], true, 'exact'],
  [['eu como pao', ['Eu como pão.']], true, 'accent'],
  [['Chamo me Ana', ['Chamo-me Ana.']], true, 'hyphen'],
  [['Eu comemos pão', ['Eu como pão.']], false, 'wrong'],
  [['I am eating bread', ["I'm eating bread."], { lang: 'en' }], true, 'exact'],
  [['I am eating the bread', ['I am eating bread.'], { lang: 'en' }], true, 'article'],
  [['A rapariga bebe agau', ['A rapariga bebe água.']], false, 'wrong'],
  [['Os meus pais moram em Lisbao', ['Os meus pais moram em Lisboa.']], true, 'typo'],
];
C.forEach(([[i, a, o], ok, kind]) => { const r = E.check(i, a, o); if (r.ok !== ok || r.kind !== kind) { fails++; console.log('CHECK FAIL', i, r); } else passes++; });

console.log(`\n${passes} passed, ${fails} failed`);
process.exit(fails ? 1 : 0);
