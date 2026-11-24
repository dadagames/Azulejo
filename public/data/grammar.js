/* Azulejo · de grammatica, deel 1: grammaticale termen, personen, vós en alle werkwoordstijden.
   Zelfde opmaak als het cursusboek (data/book.js), plus [[id]] of [[id|tekst]] voor een link naar een onderwerp of een hoofdstuk (u17). */
window.AZ_GRAMMAR = {
  groups: [
    { id: 'basics', pt: 'Para começar', en: 'Begin hier', topics: ['terms', 'persons', 'vos', 'sounds'] },
    { id: 'verbs', pt: 'Os verbos', en: 'Werkwoorden en tijden', topics: ['verbs', 'presente', 'perfeito', 'imperfeito', 'mqp', 'futuro', 'condicional', 'compostos', 'conjuntivo', 'conj-imperfeito', 'conj-futuro', 'imperativo', 'infinitivo', 'ser-estar'] },
    { id: 'words', pt: 'Palavras e frases', en: 'Woorden en zinnen', topics: ['nomes', 'artigos', 'adjetivos', 'possessivos', 'pronomes', 'preposicoes', 'perguntas', 'numeros'] },
  ],
  // welke naslagpagina's bij elk hoofdstuk horen
  chapters: {
    u1: ['sounds'], u2: ['persons', 'vos', 'terms'], u4: ['verbs', 'presente', 'perguntas', 'terms'], u3: ['nomes', 'artigos'], u5: ['presente', 'preposicoes'], u6: ['numeros'],
    u7: ['possessivos', 'artigos'], u8: ['adjetivos', 'ser-estar'], u9: ['ser-estar', 'artigos', 'preposicoes'], u10: ['verbs', 'presente'], u11: ['presente', 'verbs'], u12: ['numeros', 'preposicoes'], u13: ['pronomes'],
    u14: ['futuro', 'infinitivo'], u15: ['infinitivo', 'ser-estar'], u16: ['possessivos', 'adjetivos'], u17: ['perfeito'], u18: ['perfeito', 'ser-estar'], u19: ['imperfeito', 'mqp'], u20: ['imperativo'],
    u21: ['preposicoes', 'imperativo'], u22: ['pronomes'], u23: ['adjetivos'], u24: ['futuro', 'condicional', 'compostos'], u25: ['conjuntivo'], u26: ['conj-imperfeito', 'condicional', 'compostos'], u27: ['conj-futuro', 'conj-imperfeito', 'compostos'],
  },
  // de naslagpagina voor elke tijd in de werkwoordstabellen
  tenses: { pres: 'presente', pret: 'perfeito', imp: 'imperfeito', mqp: 'mqp', fut: 'futuro', cond: 'condicional', cpres: 'conjuntivo', cimp: 'conj-imperfeito', cfut: 'conj-futuro', impa: 'imperativo', impn: 'imperativo', infp: 'infinitivo', ppc: 'compostos', mqpc: 'compostos', futc: 'compostos', condc: 'compostos', cppc: 'compostos', cmqpc: 'compostos', cfutc: 'compostos' },
  t: {},
};

Object.assign(window.AZ_GRAMMAR.t, {

terms: { pt: 'Palavras da gramática', en: 'Grammaticale termen uitgelegd', text: `
Je hoeft geen grammatica te kennen om Portugees te leren, maar met een paar woorden wordt uitleg een stuk korter. Hier staat elke term die op deze site voorkomt, met de Portugese naam erbij.
## Soorten woorden
- **Zelfstandig naamwoord** (*o substantivo* of *o nome*) — een persoon, plaats, ding of idee: *casa* (huis), *amigo* (vriend), *saudade*.
- **Lidwoord** (*o artigo*) — *de, het* en *een*: **o**, **a**, **os**, **as** (de, het) en **um**, **uma** (een). Zie [[artigos]].
- **Bijvoeglijk naamwoord** (*o adjetivo*) — zegt iets over een zelfstandig naamwoord: *grande* (groot), *bonita* (mooi).
- **Bijwoord** (*o advérbio*) — zegt iets over een werkwoord of bijvoeglijk naamwoord: *bem* (goed), *muito* (heel), *rapidamente* (snel).
- **Voornaamwoord** (*o pronome*) — staat in de plaats van een zelfstandig naamwoord: *eu* (ik), *ela* (zij), *o* (hem, het), *lhe* (aan hem).
- **Voorzetsel** (*a preposição*) — een klein verbindingswoord: *de* (van, uit), *em* (in), *para* (voor, naar), *com* (met).
- **Voegwoord** (*a conjunção*) — verbindt delen van een zin: *e* (en), *mas* (maar), *porque* (omdat), *quando* (wanneer, toen), *se* (als).
- **Werkwoord** (*o verbo*) — een handeling of toestand: *falar* (spreken), *ser* (zijn).

## Over werkwoorden
- **Infinitief** (*o infinitivo*) — de vorm uit het woordenboek, zoals *spreken*: **falar**. In het Portugees eindigt hij altijd op *-ar*, *-er*, *-ir* (of *-or* in *pôr*).
- **Stam** (*o radical*) — de infinitief zonder *-ar / -er / -ir*: *fal-*, *com-*, *part-*.
- **Uitgang** (*a terminação*) — wat je achter de stam zet: fal + **o** = *falo*, fal + **amos** = *falamos*.
- **Vervoegen** (*conjugar*) — een werkwoord de juiste uitgang geven voor de persoon en de tijd: *falar → falo, falas, fala…*
- **Vervoeging** (*a conjugação*) — (1) alle vormen van een werkwoord samen; (2) een van de drie groepen werkwoorden: 1e *-ar*, 2e *-er*, 3e *-ir*.
- **Regelmatig / onregelmatig** (*regular / irregular*) — een regelmatig werkwoord volgt het patroon van zijn groep; een onregelmatig werkwoord heeft vormen die je moet leren: *ser → sou*.
- **Persoon** (*a pessoa*) — wie de handeling doet: 1e persoon = de spreker (*eu, nós*), 2e = degene tegen wie je praat (*tu, vós*), 3e = iedereen anders (*ele, ela, você, eles, vocês*). Zie [[persons]].
- **Enkelvoud / meervoud** (*o singular / o plural*) — één of meer dan één.
- **Tijd** (*o tempo*) — wanneer de handeling plaatsvindt: tegenwoordige tijd, verleden tijd, toekomende tijd…
- **Wijs** (*o modo*) — hoe echt de handeling is: de **aantonende wijs** (*o indicativo*) noemt feiten, de **aanvoegende wijs** (*o conjuntivo*) is voor wensen, twijfel en het onwerkelijke ([[conjuntivo]]), de **gebiedende wijs** (*o imperativo*) geeft opdrachten ([[imperativo]]).
- **Enkelvoudige / samengestelde tijd** (*tempo simples / composto*) — één woord (*falei*) of een hulpwerkwoord met een voltooid deelwoord (*tenho falado*).
- **Hulpwerkwoord** (*o verbo auxiliar*) — het helpende werkwoord in een samengestelde tijd: in het Portugees meestal *ter*.
- **Voltooid deelwoord** (*o particípio*) — de vorm op *-ado / -ido*: *falado* (gesproken), *comido* (gegeten).
- **Gerundium** (*o gerúndio*) — de vorm op *-ndo*: *falando* (sprekend). Minder gebruikt in Portugal (zie [[infinitivo]]).
- **Wederkerend werkwoord** (*o verbo reflexo* of *pronominal*) — iets wat je met jezelf doet, met *me, te, se…*: *levantar-se* (opstaan), net als *zich wassen*.

## Over zinnen
- **Onderwerp** (*o sujeito*) — wie de handeling doet: in *A Ana fala inglês* is het onderwerp **a Ana**.
- **Lijdend voorwerp** (*o complemento direto*) — wat de handeling ondergaat: *A Ana compra **o pão**.*
- **Meewerkend voorwerp** (*o complemento indireto*) — **aan** wie iets gegeven, gezegd of getoond wordt: *Dou o livro **à Ana**.*
- **Congruentie** (*a concordância*) — woorden die bij elkaar passen: het werkwoord past bij het onderwerp (*eles **falam***), bijvoeglijke naamwoorden passen bij hun zelfstandig naamwoord (*casas **brancas***).
- **Geslacht** (*o género*) — mannelijk of vrouwelijk. Elk zelfstandig naamwoord heeft er een: zie [[nomes]].
- **Samentrekking** (*a contração*) — twee woorden die samen één woord worden: *de + o = **do***.
- **Clitisch voornaamwoord** — een klein onbeklemtoond voornaamwoord dat met een streepje aan een werkwoord vastzit: *levanto**-me***, *vi**-o***. Zie [[pronomes]].`,
},

persons: { pt: 'As pessoas', en: 'De personen: eu, tu, você, nós, vós, vocês', text: `
## Zes vormen voor elke tijd
Elke Portugese tijd heeft zes vormen, één voor elke **persoon**. Dit is de volgorde die elke tabel gebruikt:
|! | Persoon | Voornaamwoorden | falar (tegenwoordig) | ser (tegenwoordig) |
| 1 | 1e enkelvoud — de spreker | **eu** (ik) | falo | sou |
| 2 | 2e enkelvoud — degene tegen wie je praat | **tu** (jij, informeel) | falas | és |
| 3 | 3e enkelvoud — iemand anders, of beleefd *u* | **ele, ela** (hij, zij, het) · **você, o senhor, a senhora** (u) | fala | é |
| 4 | 1e meervoud — de spreker en anderen | **nós** (wij) · *a gente* gebruikt vorm 3 | falamos | somos |
| 5 | 2e meervoud — meerdere mensen tegen wie je praat | **vós** (jullie — ouderwets) | falais | sois |
| 6 | 3e meervoud — anderen, of *jullie / u* tegen meerdere mensen | **eles, elas** (zij) · **vocês, os senhores, as senhoras** (jullie, u) | falam | são |
!tip Het belangrijkste om te onthouden: **você, o senhor, a senhora** betekenen *u* maar krijgen het werkwoord van de **3e persoon** (*fala, é*) — net als het Nederlandse *u heeft*. **Vocês** krijgt de 3e persoon meervoud (*falam, são*).

## Wie spreek je hoe aan in Portugal?
|! Situatie | Zeg | Werkwoordsvorm |
| een vriend, familielid, kind, iemand van je leeftijd | **tu** | 2 — *falas* |
| een oudere, een onbekende, in een winkel, op het werk | **o senhor / a senhora** (of alleen het werkwoord) | 3 — *fala* |
| iemand die je een beetje kent, beleefd | alleen het werkwoord, of de naam: *O João quer café?* | 3 |
| twee of meer mensen, wie dan ook | **vocês** | 6 — *falam* |
| meerdere mensen, heel formeel (een toespraak, publiek) | **os senhores / as senhoras** | 6 |
| God, in gebeden; een paar dorpen in het noorden; oude boeken | **vós** | 5 — *falais* |
!pt is **você** grammaticaal in orde, maar het kan kil of zelfs onbeleefd klinken, vooral tegen ouderen. De veilige keuze is het voornaamwoord weglaten: *Fala inglês?* (Spreekt u Engels?) is beleefd en natuurlijk.

## A gente
**A gente** (letterlijk *de mensen*) is spreektaal voor *wij* — een beetje zoals het Nederlandse *we* tegenover *wij*. Het krijgt de **3e persoon enkelvoud**: *A gente vai ao cinema.* (We gaan naar de bioscoop.) Op schrift gebruik je *nós*.

## Het voornaamwoord weglaten
De uitgang laat al zien wie het is, dus onderwerpsvoornaamwoorden worden meestal weggelaten: *Falo português* (ik spreek Portugees), *Somos de Lisboa* (we komen uit Lissabon). Gebruik ze voor nadruk, contrast, of als vorm 3 of 6 meerdere mensen kan betekenen: *Ele fala, ela não.*
`,
},

vos: { pt: 'Vós', en: 'Vós: wat het is en hoe je het vervoegt', text: `
## Wat is vós?
**Vós** is de tweede persoon meervoud: *jullie*, als je tegen meer dan één persoon praat. Het is de 5e regel van elke werkwoordstabel. Eeuwen geleden was het ook de beleefde manier om één belangrijk persoon aan te spreken — zoals het Nederlandse *gij* vroeger.

In het Portugal van nu heeft **vocês** het in de spreektaal vervangen, dus je hoort het zelden. Toch leeft het nog:
- in de **kerk**: gebeden en de Bijbel gebruiken het — *Pai Nosso, que **estais** nos céus* (Onze Vader, die in de hemelen zijt)
- in **literatuur**, oude teksten en heel plechtige toespraken, waarin een spreker een menigte toespreekt: *Portugueses, sois um povo valente!*
- in sommige **dorpen in het noorden** (Minho, Trás-os-Montes), waar ouderen nog *vós sois*, *vós ides* zeggen
- in **zijn familieleden**, die iedereen gebruikt: het voorwerpsvoornaamwoord **vos** en het bezittelijk voornaamwoord **vosso** (zie hieronder).
!tip In Azulejo staat vós in elke werkwoordstabel, zodat je het kunt herkennen en leren. Oefeningen laten het weg, tenzij je *Ook vós oefenen* aanzet onder **Ik → Instellingen**.

## Vós vervoegen in elke tijd
Bij regelmatige werkwoorden zijn de uitgangen voor vós heel regelmatig. Hier staan ze voor de drie groepen:
|! Tijd | -ar (falar) | -er (comer) | -ir (partir) | De uitgang |
| Presente | falais | comeis | partis | -ais · -eis · -is |
| Pretérito perfeito | falastes | comestes | partistes | -astes · -estes · -istes |
| Pretérito imperfeito | faláveis | comíeis | partíeis | -áveis · -íeis |
| Mais-que-perfeito | faláreis | comêreis | partíreis | -áreis · -êreis · -íreis |
| Futuro | falareis | comereis | partireis | infinitief + -eis |
| Condicional | falaríeis | comeríeis | partiríeis | infinitief + -íeis |
| Presente do conjuntivo | faleis | comais | partais | -eis · -ais |
| Imperfeito do conjuntivo | falásseis | comêsseis | partísseis | -ásseis · -êsseis · -ísseis |
| Futuro do conjuntivo | falardes | comerdes | partirdes | infinitief + -des |
| Imperativo | falai! | comei! | parti! | -ai · -ei · -i |
| Imperativo negativo | não faleis! | não comais! | não partais! | = conjuntivo |
| Infinitivo pessoal | falardes | comerdes | partirdes | infinitief + -des |
@conj falar,comer,partir pres
### Zo herken je een vós-vorm
- de tegenwoordige tijd eindigt op **-is** (*falais, comeis, partis*) of, bij korte werkwoorden, op **-des** (*tendes, vindes, ides*)
- de verleden tijd eindigt op **-stes** (*falastes, fostes*) — vergelijk tu *falaste*, zonder *s*
- de toekomende tijd en de presente do conjuntivo eindigen op **-eis** of **-ais** (*falareis, faleis, comais*)
- de gebiedende wijs eindigt op **-ai, -ei, -i** of **-de** (*falai, comei, parti, sede, ide*).

## Onregelmatige werkwoorden
Onregelmatige werkwoorden houden hun gewone onregelmatige stam, met de uitgangen van vós. Sommige korte werkwoorden krijgen **-des** in de tegenwoordige tijd:
|! Werkwoord | Presente | Perfeito | Imperativo |
| ser | sois | fostes | sede! |
| estar | estais | estivestes | estai! |
| ter | tendes | tivestes | tende! |
| ir | ides | fostes | ide! |
| vir | vindes | viestes | vinde! |
| ver | vedes | vistes | vede! |
| pôr | pondes | pusestes | ponde! |
| ler | ledes | lestes | lede! |
| fazer | fazeis | fizestes | fazei! |
| dizer | dizeis | dissestes | dizei! |
| dar | dais | destes | dai! |
@conj ser,ir,ter pres
> Vinde a mim. = Komt tot mij. (uit de Bijbel)
> Ide em paz. = Gaat in vrede. (aan het eind van de mis)
> Sede bem-vindos! = Weest welkom! (plechtig)

## De stukjes vós die iedereen gebruikt
### Vos: jullie, aan jullie
**Vos** is het voorwerpsvoornaamwoord voor meerdere mensen. In Portugal gebruik je het elke dag bij **vocês**:
> Vejo-vos amanhã! = Tot morgen! (tegen meerdere mensen)
> Já vos disse. = Dat heb ik jullie al gezegd.
> Dou-vos o meu número. = Ik geef jullie mijn nummer.
### Vosso: jullie (bezittelijk)
**Vosso, vossa, vossos, vossas** is het bezittelijk voornaamwoord bij *vocês*:
> A vossa casa é linda. = Jullie huis is prachtig.
> Onde estão os vossos pais? = Waar zijn jullie ouders?
### Convosco: met jullie
> Vou convosco. = Ik ga met jullie mee.
!pt mengt een gewone Portugese zin ze dus vrolijk door elkaar: *Vocês já viram a vossa casa nova? Eu vou convosco!* — het werkwoord hoort bij *vocês* (vorm 6), maar het voornaamwoord en het bezittelijk voornaamwoord komen van vós.
`,
},

sounds: { pt: 'Sons e acentos', en: 'Klanken, spelling en accenten', text: `
## De grote regels van de Europees-Portugese uitspraak
- **Onbeklemtoonde klinkers krimpen of verdwijnen**: *telefone* klinkt als "tl-fon", *pequeno* als "pkenoe". Dit is het grootste verschil met Braziliaans Portugees.
- Een **-s** en **-z** aan het eind (en een **s** voor een medeklinker) klinken als **sj**: *três* "tresj", *luz* "loesj", *escola* "sjkola".
- Een **s** tussen klinkers klinkt als **z**: *casa* "kaza".
- Een **-o** aan het eind klinkt als **oe**: *obrigado* "obrigadoe". Een **-e** aan het eind verdwijnt bijna: *noite* "noit".
- **lh** = *lj* zoals in "miljoen" (*filho*), **nh** = *nj* zoals in "oranje" (*vinho*), **ch** = *sj* (*chá*), **j** en **g** voor e/i = *zj* zoals in "garage" (*já, gente*).
- **r** aan het begin van een woord en **rr** worden in het grootste deel van Portugal achter in de keel gemaakt (zoals een Franse *r*, of de *r* van veel Nederlanders); een enkele **r** tussen klinkers is een snelle tik met de tong (*caro*).
- **h** is altijd stom: *hoje* "ozje".
- **ão, õe, ãe** en een klinker voor **m/n** zijn nasaal, zoals in het Frans: *pão, põe, mãe, bom, sim*.
- **c** voor a, o, u en **qu** voor e, i klinken als *k*: *casa, queijo*. De **g** voor a, o, u en **gu** voor e, i klinken als de *g* in het Engelse *go* — nooit als de Nederlandse *g*.

## Klemtoon en accenten
- Woorden die eindigen op **a, e, o** (+ s), **am, em, ens** hebben de klemtoon op de voorlaatste lettergreep: *CAsa, FAlam, HOmem*.
- Woorden die eindigen op **i, u, l, r, z, ã, ão, im, um** en de meeste medeklinkers hebben de klemtoon op de laatste lettergreep: *aQUI, hoTEL, faLAR, raPAZ, irMÃ*.
- Een geschreven accent geeft de beklemtoonde lettergreep aan als die van die regels afwijkt: *café, médico, fácil, também*.
|! Teken | Naam | Wat het betekent | Voorbeelden |
| á é í ó ú | acento agudo | beklemtoond en open | café, avó, último |
| â ê ô | acento circunflexo | beklemtoond en gesloten | você, avô, português |
| ã õ | til | nasaal | irmã, estações |
| à | acento grave | het voorzetsel *a* samen met *a* | vou à praia |
| ç | cedilha | een *s*-klank voor a, o, u | praça, açúcar |
!tip Accenten kunnen de betekenis veranderen: *avó* (oma) / *avô* (opa), *pôde* (kon) / *pode* (kan), *falámos* (we spraken) / *falamos* (we spreken), *dê* (geef!) / *de* (van).
`,
},

verbs: { pt: 'Como funcionam os verbos', en: 'Hoe werkwoorden werken', text: `
## Drie groepen
Elk werkwoord hoort bij een van drie **vervoegingen**, te zien aan de infinitief:
|! Groep | Uitgang | Voorbeeld | Aandeel van de werkwoorden |
| 1e | **-ar** | falar (spreken) | ongeveer 90% — en alle nieuwe werkwoorden |
| 2e | **-er** | comer (eten) | ongeveer 8% — inclusief *pôr* (oorspronkelijk *poer*) |
| 3e | **-ir** | partir (vertrekken) | ongeveer 2% |

## Stam + uitgang
Haal *-ar / -er / -ir* eraf om de **stam** te vinden en plak er een uitgang achter die de **persoon** en de **tijd** laat zien. De uitgangen zeggen zoveel dat het onderwerpsvoornaamwoord meestal wegvalt.
@conj falar,comer,partir pres
## Patronen die in elke tijd terugkomen
- **tu** eindigt op **-s** (behalve in de perfeito: *falaste*, en de gebiedende wijs: *fala!*)
- **nós** eindigt op **-mos**
- **vós** eindigt op **-is**, **-des** of **-stes** (zie [[vos]])
- **eles / vocês** eindigen op **-m** (*falam, falavam, falaram, falarão* — *-ão* is een nasale *-m*)
- in veel tijden hebben **eu** en **ele** dezelfde vorm: *eu falava / ele falava*, *eu falaria / ele falaria*

## Regelmatig en onregelmatig
Een **regelmatig** werkwoord volgt zijn groep precies. De meest gebruikte werkwoorden zijn **onregelmatig**: *ser, estar, ter, haver, ir, vir, fazer, dizer, trazer, poder, querer, saber, ver, dar, pôr, ler, ouvir, pedir, perder, sair*. Hun onregelmatigheid zit meestal in een paar tijden: de tegenwoordige tijd, de perfeito en de vormen die daarop gebouwd zijn.

## Spellingsveranderingen (geen echte onregelmatigheden)
Sommige werkwoorden veranderen één letter om dezelfde klank te houden:
|! Voor -e | Voor -o / -a | Voorbeelden |
| -car → **qu** | | ficar → fiquei, fique |
| -gar → **gu** | | chegar → cheguei, chegue |
| -çar → **c** | | começar → comecei, comece |
| | -cer → **ç** | conhecer → conheço, conheça |
| | -ger / -gir → **j** | proteger → protejo · dirigir → dirijo |
| | -guer / -guir → **g** | distinguir → distingo |

## Werkwoorden waarvan de stam verandert
|! Patroon | Voorbeelden | Waar het verandert |
| e → **i** | vestir → visto, sentir → sinto, preferir → prefiro, seguir → sigo, servir → sirvo | eu (tegenwoordige tijd) en de hele presente do conjuntivo |
| o → **u** | dormir → durmo, tossir → tusso, cobrir → cubro | eu (tegenwoordige tijd) en de presente do conjuntivo |
| u → **o** | subir → sobes, sobe, sobem · fugir → foges · sacudir → sacodes | tu, ele en eles (tegenwoordige tijd), en de gebiedende wijs voor tu |
| -ear → **-eio** | passear → passeio, passeias, passeia, passeamos, passeiam | de beklemtoonde vormen |
| -iar (sommige) → **-eio** | odiar → odeio · ansiar, incendiar, mediar, remediar | de beklemtoonde vormen (de meeste werkwoorden op -iar zijn regelmatig: *estudar*… *copiar → copio*) |
| -uir | construir → constróis, constrói, constroem · destruir | tu, ele, eles |
| -air | sair → saio, sais, sai, saímos, saem | i-klank en accenten |
!tip Elke werkwoordpagina onder **Werkwoorden** kleurt de onregelmatige vormen rood en de spellingsveranderingen oranje, zodat je deze patronen bij elk werkwoord kunt zien.
`,
},

presente: { pt: 'Presente', en: 'De tegenwoordige tijd', text: `
## Waarvoor gebruik je hem?
- wat regelmatig gebeurt of in het algemeen waar is: *Trabalho num banco.* (Ik werk bij een bank.)
- wat er rond deze tijd speelt: *Este ano estudo português.*
- de nabije toekomst, heel vaak in de spreektaal — net als in het Nederlands: *Amanhã falo com ele.* (Morgen praat ik met hem.)
- voor iets wat **op dit moment** gebeurt, gebruikt Portugal **estar a + infinitief**: *Estou a trabalhar.* (Ik ben aan het werk.)
- **há + tijd** met de tegenwoordige tijd = *al … (en nog steeds)*: *Moro aqui há dois anos.* (Ik woon hier al twee jaar.)

## De vorm
@conj falar,comer,partir pres
|! | -ar | -er | -ir |
| eu | -o | -o | -o |
| tu | -as | -es | -es |
| ele · ela · você | -a | -e | -e |
| nós | -amos | -emos | -imos |
| vós | -ais | -eis | -is |
| eles · elas · vocês | -am | -em | -em |

## De onregelmatige die je het eerst moet kennen
@conj ser,estar,ter,ir pres
@conj fazer,dizer,poder,querer pres
- **eu**-vormen op *-ço / -go*: faço, digo, trago, peço, ouço (*ouvir*), perco (*perder*), valho (*valer*)
- vormen van één lettergreep met een accent: *dá, dás, lê, lês, vê, vês, crê*
- **haver** gebruik je vooral als **há** (er is, er zijn)
`,
},

perfeito: { pt: 'Pretérito perfeito', en: 'De gewone verleden tijd', text: `
## Waarvoor gebruik je hem?
Afgeronde handelingen op een bepaald moment in het verleden — *ontem, na semana passada, em 2019, há dois dias*:
> Ontem jantei fora. = Gisteren heb ik buiten de deur gegeten.
> Fomos a Sintra no sábado. = We zijn zaterdag naar Sintra gegaan.
Hij vertaalt ook het Nederlandse *ik heb gedaan* als iets afgelopen is: *Já almoçaste?* (Heb je al geluncht?)
!warn Gebruik *tenho comido* niet voor *ik heb gegeten*. In Portugal betekent de samengestelde vorm een herhaalde handeling tot nu toe: *Tenho comido muito* = Ik eet de laatste tijd veel. Zie [[compostos]].

## De vorm
@conj falar,comer,partir pret
|! | -ar | -er | -ir |
| eu | -ei | -i | -i |
| tu | -aste | -este | -iste |
| ele · ela · você | -ou | -eu | -iu |
| nós | -ámos | -emos | -imos |
| vós | -astes | -estes | -istes |
| eles · elas · vocês | -aram | -eram | -iram |
!pt schrijf je **falámos** (verleden tijd, open *á*) en **falamos** (tegenwoordige tijd) verschillend. Brazilië schrijft allebei *falamos*.
- Spellingsveranderingen bij **eu**: *fiquei, cheguei, comecei* (zie [[verbs]]).

## Onregelmatige werkwoorden
De meeste onregelmatige werkwoorden hebben een speciale stam en de uitgangen **-e, -este, -e, -emos, -estes, -eram** (geen accent bij eu/ele):
@conj estar,ter,fazer,dizer pret
@conj ser,ir,vir,ver pret
@conj poder,querer,saber,pôr pret
- **ser** en **ir** hebben dezelfde vormen: *fui* = ik was / ik ging.
- **dar**: dei, deste, deu, demos, destes, deram · **trazer**: trouxe… · **haver**: houve (er was).
- **pôde** (hij kon) heeft een accent; **pode** (hij kan) niet.
`,
},

imperfeito: { pt: 'Pretérito imperfeito', en: 'De imperfeito: was aan het doen, deed vroeger', text: `
## Waarvoor gebruik je hem?
De **achtergrond** van het verleden — dingen zonder duidelijk begin of einde:
- gewoontes: *Quando era pequeno, ia à praia todos os dias.* (ging ik altijd)
- beschrijvingen, leeftijd, weer, tijd: *Era tarde, chovia e eu tinha frio.*
- een handeling die bezig was toen er iets anders gebeurde: *Estava a dormir quando tocou o telefone.*
- beleefdheid: *Queria um café.* (Ik wil graag een koffie.)
- in de spreektaal, in plaats van de voorwaardelijke wijs: *Eu gostava de ir.* (Ik zou graag gaan.) *Se pudesse, ia.* (Als ik kon, ging ik.)

## De vorm
@conj falar,comer,partir imp
|! | -ar | -er / -ir |
| eu | -ava | -ia |
| tu | -avas | -ias |
| ele · ela · você | -ava | -ia |
| nós | -ávamos | -íamos |
| vós | -áveis | -íeis |
| eles · elas · vocês | -avam | -iam |
## Maar vier onregelmatige werkwoorden
@conj ser,ter,vir,pôr imp
- **haver** → **havia** (er was, er waren)

## Perfeito of imperfeito?
|! Pretérito perfeito | Pretérito imperfeito |
| één afgeronde gebeurtenis | een gewoonte, iets wat herhaald werd |
| de gebeurtenissen van een verhaal — wat er gebeurde | het decor — hoe het was |
| *Ontem choveu.* (het regende, één keer) | *Chovia muito.* (het regende veel / het regende vroeger vaak) |
| *Conheci a Ana em 2020.* (ik leerde Ana kennen) | *Conhecia a Ana.* (ik kende Ana) |
> Quando cheguei, eles jantavam. = Toen ik aankwam, waren ze aan het eten.
!tip Het Nederlands maakt dit verschil niet: *het regende* kan allebei zijn. Vraag jezelf af of het om één gebeurtenis gaat of om een achtergrond.
`,
},

mqp: { pt: 'Mais-que-perfeito', en: 'De voltooid verleden tijd: had gedaan', text: `
## Waarvoor gebruik je hem?
Een handeling die gebeurde **vóór een andere handeling in het verleden** — net als het Nederlandse *had gedaan*: *Toen ik aankwam, **was** de film al **begonnen**.*

## De gewone vorm: tinha + voltooid deelwoord
In de spreektaal en gewone schrijftaal gebruik je de **imperfeito van ter** + het **voltooid deelwoord**:
> Quando cheguei, o filme já tinha começado. = Toen ik aankwam, was de film al begonnen.
> Nunca tinha comido sardinhas. = Ik had nog nooit sardientjes gegeten.
|! | ter (imperfeito) | + voltooid deelwoord |
| eu | tinha | falado / comido / partido |
| tu | tinhas | falado |
| ele · ela · você | tinha | falado |
| nós | tínhamos | falado |
| vós | tínheis | falado |
| eles · elas · vocês | tinham | falado |
!tip Het Portugees gebruikt altijd **ter**, ook waar het Nederlands *zijn* gebruikt: *tinha começado* = *was begonnen*, *tinha chegado* = *was aangekomen*.

## De literaire vorm: falara
Boeken en formele teksten gebruiken ook een **enkelvoudige** vorm: de eles-vorm van de perfeito zonder *-ram*, plus **-ra, -ras, -ra, -ramos, -reis, -ram**:
@conj falar,comer,ser mqp
- De vormen voor nós en vós krijgen een accent: *faláramos, faláreis*.
- Je hoeft hem alleen te herkennen. Hij leeft nog in een paar vaste uitdrukkingen: *Quem me dera!* (Was het maar zo!), *Pudera!* (Geen wonder!).
`,
},

futuro: { pt: 'O futuro', en: 'Over de toekomst praten', text: `
## Drie manieren om over de toekomst te praten
|! Vorm | Voorbeeld | Wanneer |
| tegenwoordige tijd | *Amanhã vou ao Porto.* | vaste plannen — heel gewoon in de spreektaal |
| **ir + infinitief** | *Vou jantar com a Ana.* | de gewone gesproken toekomst |
| **futuro simples** | *Amanhã choverá.* | schrijftaal, weersverwachtingen, formele taal, gissingen |

## Ir + infinitief
@conj ir pres
> Vamos ver. = We zullen zien.
> Vais gostar! = Dat ga je leuk vinden!

## De futuro simples
De **hele infinitief** + **-ei, -ás, -á, -emos, -eis, -ão**, hetzelfde voor alle drie groepen:
@conj falar,comer,partir fut
Maar drie werkwoorden zijn onregelmatig — ze laten *-ze-* vallen:
@conj fazer,dizer,trazer fut
### Gissen met de futuro
> Onde estará o João? = Waar zou João zijn?
> Serão umas oito horas. = Het zal zo'n acht uur zijn.
### Voornaamwoorden in het midden (formele schrijftaal)
Bij de futuro en de condicional staat een voornaamwoord in formele schrijftaal midden in het werkwoord: *dir-te-ei* (ik zal het je zeggen), *far-se-á* (het zal gedaan worden). In de spreektaal zeggen mensen *vou dizer-te* of *digo-te*.

## Futuro composto: zal gedaan hebben
**terei + voltooid deelwoord**: *Às oito já terei acabado.* (Om acht uur ben ik al klaar.) Ook een gissing over het verleden: *Terá saído?* (Zou hij weg zijn gegaan?)
`,
},

condicional: { pt: 'Condicional', en: 'De voorwaardelijke wijs: zou', text: `
## Waarvoor gebruik je hem?
- **beleefde verzoeken en wensen**: *Gostaria de um café. Poderia ajudar-me?*
- **denkbeeldige situaties**: *Com mais tempo, viajaria mais.* (Met meer tijd zou ik meer reizen.)
- de tweede helft van een *als*-zin met de imperfeito do conjuntivo: *Se tivesse dinheiro, compraria uma casa.*
- **de toekomst vanuit het verleden**: *Disse que viria.* (Hij zei dat hij zou komen.)
- **gissen over het verleden**: *Seriam umas dez da noite.* (Het zal zo'n tien uur 's avonds geweest zijn.)

## De vorm
De **infinitief** + **-ia, -ias, -ia, -íamos, -íeis, -iam**:
@conj falar,comer,partir cond
- Dezelfde drie onregelmatige als in de toekomende tijd: **faria, diria, traria**.
!pt vervangt de **imperfeito** in de spreektaal heel vaak de voorwaardelijke wijs: *Eu gostava* (= *gostaria*), *Se pudesse, ia* (= *iria*). Allebei zijn correct; de condicional klinkt formeler of zorgvuldiger.

## Condicional composto: zou gedaan hebben
**teria + voltooid deelwoord**: *Teria gostado de ir.* (Ik had graag willen gaan.) In de spreektaal is *tinha + voltooid deelwoord* ook gewoon: *Se soubesse, tinha vindo.* (Als ik het had geweten, was ik gekomen.)
`,
},

compostos: { pt: 'Tempos compostos', en: 'Samengestelde tijden en voltooide deelwoorden', text: `
## Het voltooid deelwoord
Regelmatige voltooide deelwoorden eindigen op **-ado** (werkwoorden op -ar) en **-ido** (werkwoorden op -er en -ir): *falado, comido, partido*.
### Onregelmatige voltooide deelwoorden
| fazer → **feito** | dizer → **dito** | escrever → **escrito** |
| ver → **visto** | vir → **vindo** | pôr → **posto** |
| abrir → **aberto** | cobrir → **coberto** | ganhar → **ganho** |
| gastar → **gasto** | pagar → **pago** | |
### Werkwoorden met twee voltooide deelwoorden
Sommige werkwoorden hebben een regelmatig voltooid deelwoord dat je met **ter** gebruikt, en een kort deelwoord voor **ser** en **estar** (en als bijvoeglijk naamwoord):
|! Werkwoord | met ter | met ser / estar |
| aceitar | tinha aceitado | foi aceite |
| entregar | tinha entregado | está entregue |
| acender | tinha acendido | está aceso |
| imprimir | tinha imprimido | foi impresso |
| prender | tinha prendido | está preso |
| matar | tinha matado | foi morto |
!pt zijn **aceite** en **entregue** de korte vormen (Brazilië zegt *aceito*). **Ganho, gasto, pago** zijn de gewone vormen met *ter*: *Já tinha pago a renda.* (Ik had de huur al betaald.)

## Samengestelde tijden: ter + voltooid deelwoord
Het voltooid deelwoord verandert nooit; alleen **ter** wordt vervoegd.
|! Tijd | Vorm | Voorbeeld | Betekenis |
| Pretérito perfeito composto | tenho falado | *Tenho estudado muito.* | ik studeer de laatste tijd veel |
| Mais-que-perfeito composto | tinha falado | *Já tinha saído.* | hij was al weg |
| Futuro composto | terei falado | *Terei acabado às oito.* | om acht uur ben ik klaar |
| Condicional composto | teria falado | *Teria gostado.* | dat had ik leuk gevonden |
| Perfeito do conjuntivo | tenha falado | *Espero que tenhas gostado.* | ik hoop dat je het leuk vond |
| Mais-que-perfeito do conjuntivo | tivesse falado | *Se tivesse sabido…* | als ik het had geweten… |
| Futuro composto do conjuntivo | tiver falado | *Quando tiveres acabado, avisa.* | laat het weten als je klaar bent |
!warn De **pretérito perfeito composto** is een valse vriend, juist voor Nederlanders. *Tenho comido peixe* betekent NIET *ik heb vis gegeten*, maar *ik eet de laatste tijd (regelmatig) vis*. Voor *ik heb gegeten* gebruik je de gewone verleden tijd: *Já comi.*

## De lijdende vorm: ser + voltooid deelwoord
In de lijdende vorm past het voltooid deelwoord zich **aan** het onderwerp aan: *A casa foi construída em 1900.* (Het huis werd in 1900 gebouwd.) *Os bilhetes foram vendidos.* Het gewone Portugees gebruikt liever **se**: *Vendem-se casas* (Huizen te koop), *Aqui fala-se inglês* (Hier spreekt men Engels).
`,
},

});
