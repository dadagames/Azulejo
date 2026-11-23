/* Azulejo · the grammar reference, part 1: grammar words, persons, vós, and every verb tense.
   Same markup as the course book (data/book.js), plus [[id]] or [[id|text]] for a link to a topic or a chapter (u17). */
window.AZ_GRAMMAR = {
  groups: [
    { id: 'basics', pt: 'Para começar', en: 'Start here', topics: ['terms', 'persons', 'vos', 'sounds'] },
    { id: 'verbs', pt: 'Os verbos', en: 'Verbs and tenses', topics: ['verbs', 'presente', 'perfeito', 'imperfeito', 'mqp', 'futuro', 'condicional', 'compostos', 'conjuntivo', 'conj-imperfeito', 'conj-futuro', 'imperativo', 'infinitivo', 'ser-estar'] },
    { id: 'words', pt: 'Palavras e frases', en: 'Words and sentences', topics: ['nomes', 'artigos', 'adjetivos', 'possessivos', 'pronomes', 'preposicoes', 'perguntas', 'numeros'] },
  ],
  // which reference pages go with each chapter
  chapters: {
    u1: ['sounds'], u2: ['persons', 'vos', 'terms'], u4: ['verbs', 'presente', 'perguntas', 'terms'], u3: ['nomes', 'artigos'], u5: ['presente', 'preposicoes'], u6: ['numeros'],
    u7: ['possessivos', 'artigos'], u8: ['adjetivos', 'ser-estar'], u9: ['ser-estar', 'artigos', 'preposicoes'], u10: ['verbs', 'presente'], u11: ['presente', 'verbs'], u12: ['numeros', 'preposicoes'], u13: ['pronomes'],
    u14: ['futuro', 'infinitivo'], u15: ['infinitivo', 'ser-estar'], u16: ['possessivos', 'adjetivos'], u17: ['perfeito'], u18: ['perfeito', 'ser-estar'], u19: ['imperfeito', 'mqp'], u20: ['imperativo'],
    u21: ['preposicoes', 'imperativo'], u22: ['pronomes'], u23: ['adjetivos'], u24: ['futuro', 'condicional', 'compostos'], u25: ['conjuntivo'], u26: ['conj-imperfeito', 'condicional', 'compostos'], u27: ['conj-futuro', 'conj-imperfeito', 'compostos'],
  },
  // the reference page for each tense in the verb tables
  tenses: { pres: 'presente', pret: 'perfeito', imp: 'imperfeito', mqp: 'mqp', fut: 'futuro', cond: 'condicional', cpres: 'conjuntivo', cimp: 'conj-imperfeito', cfut: 'conj-futuro', impa: 'imperativo', impn: 'imperativo', infp: 'infinitivo', ppc: 'compostos', mqpc: 'compostos', futc: 'compostos', condc: 'compostos', cppc: 'compostos', cmqpc: 'compostos', cfutc: 'compostos' },
  t: {},
};

Object.assign(window.AZ_GRAMMAR.t, {

terms: { pt: 'Palavras da gramática', en: 'Grammar words explained', text: `
You don't need to know grammar to learn Portuguese, but a few words make explanations much shorter. Here is every term used on this site, with its Portuguese name.
## Kinds of words
- **Noun** (*o substantivo* or *o nome*) — a person, place, thing or idea: *casa* (house), *amigo* (friend), *saudade*.
- **Article** (*o artigo*) — *the* and *a*: **o**, **a**, **os**, **as** (the) and **um**, **uma** (a). See [[artigos]].
- **Adjective** (*o adjetivo*) — describes a noun: *grande* (big), *bonita* (pretty).
- **Adverb** (*o advérbio*) — describes a verb or adjective: *bem* (well), *muito* (very), *rapidamente* (quickly).
- **Pronoun** (*o pronome*) — stands in for a noun: *eu* (I), *ela* (she), *o* (him, it), *lhe* (to him).
- **Preposition** (*a preposição*) — a little linking word: *de* (of, from), *em* (in), *para* (for, to), *com* (with).
- **Conjunction** (*a conjunção*) — joins parts of a sentence: *e* (and), *mas* (but), *porque* (because), *quando* (when), *se* (if).
- **Verb** (*o verbo*) — an action or state: *falar* (to speak), *ser* (to be).

## Talking about verbs
- **Infinitive** (*o infinitivo*) — the dictionary form, like *to speak*: **falar**. In Portuguese it always ends in *-ar*, *-er*, *-ir* (or *-or* in *pôr*).
- **Stem** (*o radical*) — the infinitive without *-ar / -er / -ir*: *fal-*, *com-*, *part-*.
- **Ending** (*a terminação*) — what you add to the stem: fal + **o** = *falo*, fal + **amos** = *falamos*.
- **Conjugate** (*conjugar*) — to give a verb the right ending for the person and the time: *falar → falo, falas, fala…*
- **Conjugation** (*a conjugação*) — (1) the whole set of forms of a verb; (2) one of the three verb groups: 1st *-ar*, 2nd *-er*, 3rd *-ir*.
- **Regular / irregular** (*regular / irregular*) — a regular verb follows the pattern of its group; an irregular one has forms you have to learn: *ser → sou*.
- **Person** (*a pessoa*) — who does the action: 1st person = the speaker (*eu, nós*), 2nd = the one spoken to (*tu, vós*), 3rd = anyone else (*ele, ela, você, eles, vocês*). See [[persons]].
- **Singular / plural** (*o singular / o plural*) — one or more than one.
- **Tense** (*o tempo*) — when the action happens: present, past, future…
- **Mood** (*o modo*) — how real the action is: the **indicative** (*o indicativo*) states facts, the **subjunctive** (*o conjuntivo*) is for wishes, doubts and the unreal ([[conjuntivo]]), the **imperative** (*o imperativo*) gives orders ([[imperativo]]).
- **Simple / compound tense** (*tempo simples / composto*) — one word (*falei*) or a helper verb plus a participle (*tenho falado*).
- **Auxiliary** (*o verbo auxiliar*) — the helper verb in a compound tense: in Portuguese usually *ter*.
- **Participle** (*o particípio*) — the *-ado / -ido* form: *falado* (spoken), *comido* (eaten).
- **Gerund** (*o gerúndio*) — the *-ndo* form: *falando* (speaking). Less used in Portugal (see [[infinitivo]]).
- **Reflexive verb** (*o verbo reflexo* or *pronominal*) — a verb done to yourself, with *me, te, se…*: *levantar-se* (to get up).

## Talking about sentences
- **Subject** (*o sujeito*) — who does the action: in *A Ana fala inglês*, the subject is **a Ana**.
- **Direct object** (*o complemento direto*) — what the action is done to: *A Ana compra **o pão**.*
- **Indirect object** (*o complemento indireto*) — who something is given, said or shown **to**: *Dou o livro **à Ana**.*
- **Agreement** (*a concordância*) — words matching each other: the verb matches its subject (*eles **falam***), adjectives match their noun (*casas **brancas***).
- **Gender** (*o género*) — masculine or feminine. Every noun has one: see [[nomes]].
- **Contraction** (*a contração*) — two words joined into one: *de + o = **do***.
- **Clitic pronoun** — a small unstressed pronoun attached to a verb with a hyphen: *levanto**-me***, *vi**-o***. See [[pronomes]].`,
},

persons: { pt: 'As pessoas', en: 'The persons: eu, tu, você, nós, vós, vocês', text: `
## Six forms for every tense
Each Portuguese tense has six forms, one for each **person**. This is the order every table uses:
|! | Person | Pronouns | falar (present) | ser (present) |
| 1 | 1st singular — the speaker | **eu** (I) | falo | sou |
| 2 | 2nd singular — the person you talk to | **tu** (you, informal) | falas | és |
| 3 | 3rd singular — someone else, or polite *you* | **ele, ela** (he, she, it) · **você, o senhor, a senhora** (you) | fala | é |
| 4 | 1st plural — the speaker and others | **nós** (we) · *a gente* uses form 3 | falamos | somos |
| 5 | 2nd plural — several people you talk to | **vós** (you all — old-fashioned) | falais | sois |
| 6 | 3rd plural — others, or *you* to several people | **eles, elas** (they) · **vocês, os senhores, as senhoras** (you all) | falam | são |
!tip The most important thing to remember: **você, o senhor, a senhora** mean *you* but take the **3rd person** verb (*fala, é*), and **vocês** takes the 3rd person plural (*falam, são*).

## Who to call what in Portugal
|! Situation | Say | Verb form |
| a friend, a relative, a child, someone your age | **tu** | 2 — *falas* |
| an older person, a stranger, in a shop, at work | **o senhor / a senhora** (or just the verb) | 3 — *fala* |
| someone you know a little, politely | the verb on its own, or their name: *O João quer café?* | 3 |
| two or more people, anyone | **vocês** | 6 — *falam* |
| several people, very formal (a speech, an audience) | **os senhores / as senhoras** | 6 |
| God, in prayers; a few northern villages; old books | **vós** | 5 — *falais* |
!pt **Você** is grammatically fine, but in Portugal it can sound cold or even rude, especially to older people. The safe choice is to drop the pronoun: *Fala inglês?* (Do you speak English?) is polite and natural.

## A gente
**A gente** (literally *the people*) is everyday speech for *we*. It uses the **3rd person singular**: *A gente vai ao cinema.* (We're going to the cinema.) In writing, use *nós*.

## Dropping the pronoun
The ending shows the person, so subject pronouns are usually left out: *Falo português* (I speak Portuguese), *Somos de Lisboa* (we're from Lisbon). Keep them for emphasis, contrast, or when form 3 or 6 could mean several people: *Ele fala, ela não.*
`,
},

vos: { pt: 'Vós', en: 'Vós: what it is and how to conjugate it', text: `
## What is vós?
**Vós** is the second person plural: *you*, when you speak to more than one person. It's the 5th line of every verb table. Centuries ago it was also the polite way to address one important person — just as old English used *ye* for politeness and *thou* for friends.

In modern Portugal, **vocês** has replaced it in everyday speech, so you will rarely hear it. It's still alive:
- in **church**: prayers and the Bible use it — *Pai Nosso, que **estais** nos céus* (Our Father, who art in heaven)
- in **literature**, old texts and very formal speeches, where a speaker addresses a crowd: *Portugueses, sois um povo valente!*
- in some **villages in the north** (Minho, Trás-os-Montes), where older people still say *vós sois*, *vós ides*
- in **its relatives**, which everybody uses: the object pronoun **vos** and the possessive **vosso** (see below).
!tip In Azulejo, vós is shown in every verb table so you can recognise and learn it. Practice sessions leave it out unless you switch on *Practise vós too* under **Eu → Settings**.

## How to conjugate vós in every tense
For regular verbs the vós endings are very regular. Here they are for the three groups:
|! Tense | -ar (falar) | -er (comer) | -ir (partir) | The ending |
| Presente | falais | comeis | partis | -ais · -eis · -is |
| Pretérito perfeito | falastes | comestes | partistes | -astes · -estes · -istes |
| Pretérito imperfeito | faláveis | comíeis | partíeis | -áveis · -íeis |
| Mais-que-perfeito | faláreis | comêreis | partíreis | -áreis · -êreis · -íreis |
| Futuro | falareis | comereis | partireis | infinitive + -eis |
| Condicional | falaríeis | comeríeis | partiríeis | infinitive + -íeis |
| Presente do conjuntivo | faleis | comais | partais | -eis · -ais |
| Imperfeito do conjuntivo | falásseis | comêsseis | partísseis | -ásseis · -êsseis · -ísseis |
| Futuro do conjuntivo | falardes | comerdes | partirdes | infinitive + -des |
| Imperativo | falai! | comei! | parti! | -ai · -ei · -i |
| Imperativo negativo | não faleis! | não comais! | não partais! | = conjuntivo |
| Infinitivo pessoal | falardes | comerdes | partirdes | infinitive + -des |
@conj falar,comer,partir pres
### How to spot a vós form
- the present ends in **-is** (*falais, comeis, partis*) or, in short verbs, **-des** (*tendes, vindes, ides*)
- the past ends in **-stes** (*falastes, fostes*) — compare tu *falaste*, without the *s*
- the future and the present subjunctive end in **-eis** or **-ais** (*falareis, faleis, comais*)
- the imperative ends in **-ai, -ei, -i** or **-de** (*falai, comei, parti, sede, ide*).

## Irregular verbs
Irregular verbs keep their usual irregular stem, with vós endings. Some short verbs take **-des** in the present:
|! Verb | Presente | Perfeito | Imperativo |
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
> Vinde a mim. = Come to me. (from the Bible)
> Ide em paz. = Go in peace. (at the end of Mass)
> Sede bem-vindos! = Be welcome! (formal)

## The parts of vós everybody uses
### Vos: you, to you (plural)
**Vos** is the object pronoun for several people. In Portugal it's used with **vocês** every day:
> Vejo-vos amanhã! = See you tomorrow! (to several people)
> Já vos disse. = I've already told you.
> Dou-vos o meu número. = I'll give you my number.
### Vosso: your (plural)
**Vosso, vossa, vossos, vossas** is the possessive for *vocês*:
> A vossa casa é linda. = Your house is lovely.
> Onde estão os vossos pais? = Where are your parents?
### Convosco: with you (plural)
> Vou convosco. = I'll go with you.
!pt So a normal Portuguese sentence mixes them happily: *Vocês já viram a vossa casa nova? Eu vou convosco!* — the verb is *vocês* (form 6), but the pronoun and possessive come from vós.
`,
},

sounds: { pt: 'Sons e acentos', en: 'Sounds, spelling and accents', text: `
## The big rules of European Portuguese pronunciation
- **Unstressed vowels shrink or vanish**: *telefone* sounds like "tl-fon", *pequeno* like "pkenu". This is the main difference from Brazilian Portuguese.
- Final **-s** and **-z** (and **s** before a consonant) sound like **sh**: *três* "tresh", *luz* "loosh", *escola* "shcola".
- **s** between vowels sounds like **z**: *casa* "caza".
- Final **-o** sounds like **u**: *obrigado* "obrigadu". Final **-e** almost disappears: *noite* "noit".
- **lh** = *lli* in "million" (*filho*), **nh** = *ny* in "canyon" (*vinho*), **ch** = *sh* (*chá*), **j** and **g** before e/i = *s* in "measure" (*já, gente*).
- **r** at the start of a word and **rr** are throaty (like French *r*) in most of Portugal; a single **r** between vowels is a quick tap (*caro*).
- **h** is always silent: *hoje* "oje".
- **ão, õe, ãe** and a vowel before **m/n** are nasal: *pão, põe, mãe, bom, sim*.

## Stress and accents
- Words ending in **a, e, o** (+ s), **am, em, ens** stress the second-to-last syllable: *CAsa, FAlam, HOmem*.
- Words ending in **i, u, l, r, z, ã, ão, im, um** and most consonants stress the last syllable: *aQUI, hoTEL, faLAR, raPAZ, irMÃ*.
- A written accent marks the stressed syllable when it breaks those rules: *café, médico, fácil, também*.
|! Mark | Name | What it means | Examples |
| á é í ó ú | acento agudo | stressed and open | café, avó, último |
| â ê ô | acento circunflexo | stressed and closed | você, avô, português |
| ã õ | til | nasal | irmã, estações |
| à | acento grave | the preposition *a* joined with *a* | vou à praia |
| ç | cedilha | an *s* sound before a, o, u | praça, açúcar |
!tip Accents can change meaning: *avó* (grandmother) / *avô* (grandfather), *pôde* (could) / *pode* (can), *falámos* (we spoke) / *falamos* (we speak), *dê* (give!) / *de* (of).
`,
},

verbs: { pt: 'Como funcionam os verbos', en: 'How verbs work', text: `
## Three groups
Every verb belongs to one of three **conjugations**, shown by its infinitive:
|! Group | Ending | Example | Share of verbs |
| 1st | **-ar** | falar (speak) | about 90% — and all new verbs |
| 2nd | **-er** | comer (eat) | about 8% — includes *pôr* (originally *poer*) |
| 3rd | **-ir** | partir (leave) | about 2% |

## Stem + ending
Take off *-ar / -er / -ir* to find the **stem**, then add an ending that shows the **person** and the **tense**. The endings tell you so much that the subject pronoun is usually dropped.
@conj falar,comer,partir pres
## Patterns that come back in every tense
- **tu** ends in **-s** (except the perfeito: *falaste*, and the imperative: *fala!*)
- **nós** ends in **-mos**
- **vós** ends in **-is**, **-des** or **-stes** (see [[vos]])
- **eles / vocês** end in **-m** (*falam, falavam, falaram, falarão* — *-ão* is a nasal *-m*)
- in many tenses **eu** and **ele** share the same form: *eu falava / ele falava*, *eu falaria / ele falaria*

## Regular and irregular
A **regular** verb follows its group exactly. The most common verbs are **irregular**: *ser, estar, ter, haver, ir, vir, fazer, dizer, trazer, poder, querer, saber, ver, dar, pôr, ler, ouvir, pedir, perder, sair*. Their irregularity is usually concentrated in a few tenses: the present, the perfeito and the forms built on them.

## Spelling changes (not real irregularities)
Some verbs change one letter to keep the same sound:
|! Before -e | Before -o / -a | Examples |
| -car → **qu** | | ficar → fiquei, fique |
| -gar → **gu** | | chegar → cheguei, chegue |
| -çar → **c** | | começar → comecei, comece |
| | -cer → **ç** | conhecer → conheço, conheça |
| | -ger / -gir → **j** | proteger → protejo · dirigir → dirijo |
| | -guer / -guir → **g** | distinguir → distingo |

## Stem-changing verbs
|! Pattern | Examples | Where it changes |
| e → **i** | vestir → visto, sentir → sinto, preferir → prefiro, seguir → sigo, servir → sirvo | eu (present) and the whole present subjunctive |
| o → **u** | dormir → durmo, tossir → tusso, cobrir → cubro | eu (present) and the present subjunctive |
| u → **o** | subir → sobes, sobe, sobem · fugir → foges · sacudir → sacodes | tu, ele and eles (present), and the tu imperative |
| -ear → **-eio** | passear → passeio, passeias, passeia, passeamos, passeiam | the stressed forms |
| -iar (some) → **-eio** | odiar → odeio · ansiar, incendiar, mediar, remediar | the stressed forms (most -iar verbs are regular: *estudar*… *copiar → copio*) |
| -uir | construir → constróis, constrói, constroem · destruir | tu, ele, eles |
| -air | sair → saio, sais, sai, saímos, saem | i/y sound and accents |
!tip Every verb page in **Verbos** colours the irregular forms red and the spelling changes amber, so you can see these patterns in any verb.
`,
},

presente: { pt: 'Presente', en: 'The present tense', text: `
## What it's for
- what happens regularly or is true in general: *Trabalho num banco.* (I work in a bank.)
- what's happening around now: *Este ano estudo português.*
- the near future, very often in speech: *Amanhã falo com ele.* (I'll talk to him tomorrow.)
- for something happening **this very moment**, Portugal uses **estar a + infinitive**: *Estou a trabalhar.* (I'm working.)
- **há + time** with the present = *for* (and still going): *Moro aqui há dois anos.* (I've lived here for two years.)

## How to form it
@conj falar,comer,partir pres
|! | -ar | -er | -ir |
| eu | -o | -o | -o |
| tu | -as | -es | -es |
| ele · ela · você | -a | -e | -e |
| nós | -amos | -emos | -imos |
| vós | -ais | -eis | -is |
| eles · elas · vocês | -am | -em | -em |

## The irregular ones to know first
@conj ser,estar,ter,ir pres
@conj fazer,dizer,poder,querer pres
- **eu** forms in *-ço / -go*: faço, digo, trago, peço, ouço (*ouvir*), perco (*perder*), valho (*valer*)
- one-syllable forms with an accent: *dá, dás, lê, lês, vê, vês, crê*
- **haver** is mostly used as **há** (there is, there are)
`,
},

perfeito: { pt: 'Pretérito perfeito', en: 'The simple past', text: `
## What it's for
Finished actions at a definite time in the past — *ontem, na semana passada, em 2019, há dois dias*:
> Ontem jantei fora. = Yesterday I had dinner out.
> Fomos a Sintra no sábado. = We went to Sintra on Saturday.
It also translates the English *have done* when something is finished: *Já almoçaste?* (Have you had lunch?)
!warn Don't use *tenho comido* for *I have eaten*. In Portugal the compound form means a repeated action up to now: *Tenho comido muito* = I've been eating a lot lately. See [[compostos]].

## How to form it
@conj falar,comer,partir pret
|! | -ar | -er | -ir |
| eu | -ei | -i | -i |
| tu | -aste | -este | -iste |
| ele · ela · você | -ou | -eu | -iu |
| nós | -ámos | -emos | -imos |
| vós | -astes | -estes | -istes |
| eles · elas · vocês | -aram | -eram | -iram |
!pt In Portugal **falámos** (past, open *á*) and **falamos** (present) are spelled differently. Brazil writes both *falamos*.
- Spelling changes in **eu**: *fiquei, cheguei, comecei* (see [[verbs]]).

## Irregular verbs
Most irregular verbs have a special stem and the endings **-e, -este, -e, -emos, -estes, -eram** (no accent on eu/ele):
@conj estar,ter,fazer,dizer pret
@conj ser,ir,vir,ver pret
@conj poder,querer,saber,pôr pret
- **ser** and **ir** share the same forms: *fui* = I was / I went.
- **dar**: dei, deste, deu, demos, destes, deram · **trazer**: trouxe… · **haver**: houve (there was).
- **pôde** (he could) has an accent; **pode** (he can) doesn't.
`,
},

imperfeito: { pt: 'Pretérito imperfeito', en: 'The imperfect: was doing, used to do', text: `
## What it's for
The **background** of the past — things with no clear start or end:
- habits: *Quando era pequeno, ia à praia todos os dias.* (used to go)
- descriptions, age, weather, time: *Era tarde, chovia e eu tinha frio.*
- an action in progress when something else happened: *Estava a dormir quando tocou o telefone.*
- politeness: *Queria um café.* (I'd like a coffee.)
- in speech, instead of the conditional: *Eu gostava de ir.* (I'd like to go.) *Se pudesse, ia.* (If I could, I'd go.)

## How to form it
@conj falar,comer,partir imp
|! | -ar | -er / -ir |
| eu | -ava | -ia |
| tu | -avas | -ias |
| ele · ela · você | -ava | -ia |
| nós | -ávamos | -íamos |
| vós | -áveis | -íeis |
| eles · elas · vocês | -avam | -iam |
## Only four irregular verbs
@conj ser,ter,vir,pôr imp
- **haver** → **havia** (there was, there were)

## Perfeito or imperfeito?
|! Pretérito perfeito | Pretérito imperfeito |
| one finished event | a habit, something repeated |
| the events of a story — what happened | the scene — what things were like |
| *Ontem choveu.* (it rained) | *Chovia muito.* (it was raining / it used to rain a lot) |
| *Conheci a Ana em 2020.* (I met Ana) | *Conhecia a Ana.* (I knew Ana) |
> Quando cheguei, eles jantavam. = When I arrived, they were having dinner.
`,
},

mqp: { pt: 'Mais-que-perfeito', en: 'The pluperfect: had done', text: `
## What it's for
An action that happened **before another past action**: *When I arrived, the film **had** already **started**.*

## The everyday form: tinha + participle
In speech and normal writing, use the **imperfeito of ter** + the **participle**:
> Quando cheguei, o filme já tinha começado. = When I arrived, the film had already started.
> Nunca tinha comido sardinhas. = I had never eaten sardines.
|! | ter (imperfeito) | + participle |
| eu | tinha | falado / comido / partido |
| tu | tinhas | falado |
| ele · ela · você | tinha | falado |
| nós | tínhamos | falado |
| vós | tínheis | falado |
| eles · elas · vocês | tinham | falado |

## The literary form: falara
Books and formal writing also use a **simple** form: the eles form of the perfeito without *-ram*, plus **-ra, -ras, -ra, -ramos, -reis, -ram**:
@conj falar,comer,ser mqp
- The nós and vós forms take an accent: *faláramos, faláreis*.
- You only need to recognise it. It survives in a few set phrases: *Quem me dera!* (I wish!), *Pudera!* (No wonder!).
`,
},

futuro: { pt: 'O futuro', en: 'Talking about the future', text: `
## Three ways to talk about the future
|! Form | Example | When |
| present | *Amanhã vou ao Porto.* | plans that are certain — very common in speech |
| **ir + infinitive** | *Vou jantar com a Ana.* | the normal spoken future |
| **futuro simples** | *Amanhã choverá.* | writing, forecasts, formal speech, guesses |

## Ir + infinitive
@conj ir pres
> Vamos ver. = We'll see.
> Vais gostar! = You're going to like it!

## The futuro simples
The **whole infinitive** + **-ei, -ás, -á, -emos, -eis, -ão**, the same for all three groups:
@conj falar,comer,partir fut
Only three verbs are irregular — they drop *-ze-*:
@conj fazer,dizer,trazer fut
### Guessing with the futuro
> Onde estará o João? = Where can João be? (I wonder)
> Serão umas oito horas. = It must be about eight.
### Pronouns in the middle (formal writing)
With the futuro and the condicional, a pronoun goes inside the verb in formal writing: *dir-te-ei* (I'll tell you), *far-se-á* (it will be done). In speech people say *vou dizer-te* or *digo-te*.

## Futuro composto: will have done
**terei + participle**: *Às oito já terei acabado.* (By eight I'll have finished.) Also a guess about the past: *Terá saído?* (Could he have left?)
`,
},

condicional: { pt: 'Condicional', en: 'The conditional: would', text: `
## What it's for
- **polite requests and wishes**: *Gostaria de um café. Poderia ajudar-me?*
- **imaginary situations**: *Com mais tempo, viajaria mais.* (With more time, I'd travel more.)
- the second half of an *if* sentence with the imperfeito do conjuntivo: *Se tivesse dinheiro, compraria uma casa.*
- **the future seen from the past**: *Disse que viria.* (He said he would come.)
- **guessing about the past**: *Seriam umas dez da noite.* (It must have been about ten at night.)

## How to form it
The **infinitive** + **-ia, -ias, -ia, -íamos, -íeis, -iam**:
@conj falar,comer,partir cond
- The same three irregulars as the future: **faria, diria, traria**.
!pt In everyday speech the **imperfeito** very often replaces the conditional: *Eu gostava* (= *gostaria*), *Se pudesse, ia* (= *iria*). Both are correct; the conditional sounds more formal or careful.

## Condicional composto: would have done
**teria + participle**: *Teria gostado de ir.* (I would have liked to go.) In speech, *tinha + participle* is common too: *Se soubesse, tinha vindo.* (If I'd known, I'd have come.)
`,
},

compostos: { pt: 'Tempos compostos', en: 'Compound tenses and participles', text: `
## The participle
Regular participles end in **-ado** (-ar verbs) and **-ido** (-er and -ir verbs): *falado, comido, partido*.
### Irregular participles
| fazer → **feito** | dizer → **dito** | escrever → **escrito** |
| ver → **visto** | vir → **vindo** | pôr → **posto** |
| abrir → **aberto** | cobrir → **coberto** | ganhar → **ganho** |
| gastar → **gasto** | pagar → **pago** | |
### Verbs with two participles
Some verbs have a regular participle used with **ter**, and a short one used with **ser** and **estar** (and as an adjective):
|! Verb | with ter | with ser / estar |
| aceitar | tinha aceitado | foi aceite |
| entregar | tinha entregado | está entregue |
| acender | tinha acendido | está aceso |
| imprimir | tinha imprimido | foi impresso |
| prender | tinha prendido | está preso |
| matar | tinha matado | foi morto |
!pt **Aceite** and **entregue** are the Portuguese short forms (Brazil says *aceito*). **Ganho, gasto, pago** are the normal forms with *ter* in Portugal: *Já tinha pago a renda.* (I had already paid the rent.)

## Compound tenses: ter + participle
The participle never changes; only **ter** is conjugated.
|! Tense | Form | Example | Meaning |
| Pretérito perfeito composto | tenho falado | *Tenho estudado muito.* | I've been studying a lot (lately) |
| Mais-que-perfeito composto | tinha falado | *Já tinha saído.* | he had already left |
| Futuro composto | terei falado | *Terei acabado às oito.* | I will have finished by eight |
| Condicional composto | teria falado | *Teria gostado.* | I would have liked it |
| Perfeito do conjuntivo | tenha falado | *Espero que tenhas gostado.* | I hope you (have) enjoyed it |
| Mais-que-perfeito do conjuntivo | tivesse falado | *Se tivesse sabido…* | if I had known… |
| Futuro composto do conjuntivo | tiver falado | *Quando tiveres acabado, avisa.* | when you have finished, tell me |
!warn The **pretérito perfeito composto** is a false friend. *Tenho comido peixe* does NOT mean *I have eaten fish*; it means *I've been eating fish (regularly, lately)*. For *I have eaten*, use the simple past: *Já comi.*

## The passive: ser + participle
In the passive the participle **agrees** with the subject: *A casa foi construída em 1900.* (The house was built in 1900.) *Os bilhetes foram vendidos.* Everyday Portuguese often prefers **se**: *Vendem-se casas* (Houses for sale), *Aqui fala-se inglês* (English spoken here).
`,
},

});
