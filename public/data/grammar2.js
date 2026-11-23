/* Azulejo · the grammar reference, part 2: the subjunctive, imperative and infinitive, ser/estar,
   and words and sentences (nouns, articles, adjectives, possessives, pronouns, prepositions, questions, numbers). */
Object.assign(window.AZ_GRAMMAR.t, {

conjuntivo: { pt: 'Presente do conjuntivo', en: 'The subjunctive (present)', text: `
## What the subjunctive is
The **conjuntivo** (subjunctive) is a set of verb forms for things that are **not stated as facts**: wishes, feelings, doubts, orders, and things that haven't happened yet. English barely has it (*I insist that he **be** on time*); Portuguese uses it all the time.
> Quero que **venhas**. = I want you to come. (literally: I want that you come)
> Espero que **gostes**. = I hope you like it.
> Talvez **chova** amanhã. = Maybe it'll rain tomorrow.
Compare a fact (indicative) with a wish (subjunctive):
> Sei que ele **está** em casa. = I know he's at home. (fact → indicative)
> Espero que ele **esteja** em casa. = I hope he's at home. (wish → subjunctive)

## How to form it
Take the **eu form of the present**, drop the **-o**, and add the "opposite" vowel: **-ar** verbs take **e**, **-er / -ir** verbs take **a**.
|! | -ar: falo → fal- | -er: como → com- | -ir: parto → part- |
| eu | fale | coma | parta |
| tu | fales | comas | partas |
| ele · ela · você | fale | coma | parta |
| nós | falemos | comamos | partamos |
| vós | faleis | comais | partais |
| eles · elas · vocês | falem | comam | partam |
Because it starts from the eu form, irregular eu forms carry over: *faço → faça*, *digo → diga*, *tenho → tenha*, *venho → venha*, *posso → possa*, *peço → peça*, *ouço → ouça*, *durmo → durma*, *vejo → veja*.
### Spelling changes
*ficar → fique*, *chegar → chegue*, *começar → comece*, *conhecer → conheça*, *proteger → proteja* (see [[verbs]]).
### Only seven real irregulars
@conj ser,estar,ir,haver cpres
@conj dar,querer,saber cpres
!tip Notice that the subjunctive gives you the forms for **você**, **vocês** and **nós** in the imperative and for every negative order: *Fale mais devagar!* (Speak more slowly!), *Não fales!* See [[imperativo]].

## When to use it
### 1. After verbs of wanting, hoping, asking, feeling (+ que)
*querer que, esperar que, preferir que, pedir que, desejar que, gostar que, ter medo que, estar contente que, lamentar que*
> Prefiro que fiques. = I'd rather you stayed.
> Tenho pena que não possas vir. = I'm sorry you can't come.
The subjunctive only appears when the subject **changes**. With the same subject, use the infinitive: *Quero ir* (I want to go), but *Quero que **vás*** (I want you to go).
### 2. After doubt and denial
*duvidar que, não acreditar que, não achar que, não pensar que*
> Não acho que seja boa ideia. = I don't think it's a good idea.
> Acho que é boa ideia. = I think it's a good idea. (no doubt → indicative)
### 3. After impersonal expressions
*é importante que, é preciso que, é possível que, é pena que, é melhor que, é natural que*
> É preciso que estudes. = You need to study.
### 4. After some conjunctions
|! Conjunction | Meaning |
| para que | so that |
| antes que | before |
| sem que | without |
| até que | until |
| embora | although |
| caso | in case, if |
| desde que | as long as |
| a não ser que | unless |
> Vou explicar outra vez para que percebas. = I'll explain again so that you understand.
> Embora esteja cansado, vou sair. = Although I'm tired, I'm going out.
### 5. After talvez, oxalá, and in wishes
> Talvez ele saiba. = Maybe he knows.
> Oxalá faça sol! = I hope it's sunny!
> Bom fim de semana! Que corra tudo bem! = Have a good weekend! Hope it all goes well!
### 6. Describing something that may not exist
> Procuro alguém que fale alemão. = I'm looking for someone who speaks German (if there is one).
> Conheço alguém que fala alemão. = I know someone who speaks German. (they exist → indicative)
!warn With **quando, se, logo que, assim que** about the future, Portuguese uses a different tense — the **futuro do conjuntivo**: *Quando chegares, liga-me.* Not *quando chegues*. See [[conj-futuro]].

## The perfect subjunctive: tenha feito
**tenha + participle**, for something that may have happened: *Espero que tenhas dormido bem.* (I hope you slept well.) *Não acredito que ele tenha dito isso.*
`,
},

'conj-imperfeito': { pt: 'Imperfeito do conjuntivo', en: 'The past subjunctive and "if" sentences', text: `
## How to form it
Take the **eles form of the pretérito perfeito**, drop **-ram**, and add **-sse, -sses, -sse, -ssemos, -sseis, -ssem**. It works for every verb, even the irregular ones:
|! Infinitive | eles (perfeito) | Stem | Imperfeito do conjuntivo |
| falar | fala**ram** | fala- | falasse |
| comer | come**ram** | come- | comesse |
| partir | parti**ram** | parti- | partisse |
| ter | tive**ram** | tive- | tivesse |
| fazer | fize**ram** | fize- | fizesse |
| ser / ir | fo**ram** | fo- | fosse |
| dizer | disse**ram** | disse- | dissesse |
| querer | quise**ram** | quise- | quisesse |
@conj falar,comer,partir cimp
@conj ser,ter,fazer cimp
- The **nós** and **vós** forms take an accent: *falássemos, comêssemos, partíssemos, fôssemos, tivéssemos* · *falásseis, fôsseis*.

## When to use it
### 1. The same triggers as the present subjunctive, but in the past
When the main verb is in the past or the conditional, the subjunctive moves to the past too:
> Quero que venhas. = I want you to come.
> Queria que viesses. = I wanted you to come.
- *É importante que saibas* → *Era importante que soubesses* (it's / it was important that you know).
> Gostava que me ajudasses. = I'd like you to help me.
### 2. "If" sentences about the unreal
**se + imperfeito do conjuntivo**, then the **condicional** (or, in speech, the imperfeito):
> Se tivesse tempo, viajaria mais. = If I had time, I would travel more.
> Se eu fosse tu, não dizia nada. = If I were you, I wouldn't say anything.
> Se pudesse, ia contigo. = If I could, I'd go with you.
|! Kind of "if" | se + | then | Example |
| real, about the future | futuro do conjuntivo | present / future / imperative | *Se chover, fico em casa.* |
| unreal, now | imperfeito do conjuntivo | condicional (or imperfeito) | *Se chovesse, ficava em casa.* |
| unreal, in the past | mais-que-perfeito do conjuntivo (*tivesse + pp*) | condicional composto (or *tinha + pp*) | *Se tivesse chovido, tinha ficado em casa.* |
### 3. Como se (as if), quem me dera (I wish)
> Fala como se soubesse tudo. = He talks as if he knew everything.
> Quem me dera que fosse sexta-feira! = I wish it were Friday!

## Mais-que-perfeito do conjuntivo: tivesse feito
**tivesse + participle**, for an unreal past: *Se tivesses telefonado, eu tinha ido buscar-te.* (If you had phoned, I'd have picked you up.)
`,
},

'conj-futuro': { pt: 'Futuro do conjuntivo', en: 'The future subjunctive: quando, se, enquanto…', text: `
## A tense English doesn't have
Portuguese has a special subjunctive for **future events after quando, se, enquanto, assim que** and similar words. English uses the present there (*when you arrive*), and so does Spanish; Portuguese uses the **futuro do conjuntivo**:
> Quando chegares, liga-me. = When you arrive, call me.
> Se puderes, vem cá amanhã. = If you can, come here tomorrow.
> Enquanto estiveres aqui, a casa é tua. = While you're here, the house is yours.
> Faz como quiseres. = Do as you like.

## How to form it
Take the **eles form of the pretérito perfeito**, drop **-ram**, and add **-r, -res, -r, -rmos, -rdes, -rem**:
@conj falar,comer,partir cfut
For regular verbs it looks just like the personal infinitive (*falar, falares…*). Irregular verbs use their perfeito stem, so these are the forms to learn:
|! Verb | eles (perfeito) | Futuro do conjuntivo |
| ser / ir | foram | for, fores, for, formos, fordes, forem |
| estar | estiveram | estiver, estiveres… |
| ter | tiveram | tiver, tiveres… |
| fazer | fizeram | fizer, fizeres… |
| poder | puderam | puder, puderes… |
| querer | quiseram | quiser, quiseres… |
| saber | souberam | souber, souberes… |
| dizer | disseram | disser, disseres… |
| vir | vieram | vier, vieres… |
| ver | viram | **vir**, vires… |
| pôr | puseram | puser, puseres… |
| dar | deram | der, deres… |
| haver | houveram | houver |
!warn **Ver** and **vir** are easy to mix up: *quando o **vir*** = when I **see** him (ver), *quando ele **vier*** = when he **comes** (vir).
@conj ser,ter,fazer,ver cfut

## The words that trigger it (about the future)
|! Word | Example |
| quando (when) | *Quando acabares, avisa.* |
| se (if) | *Se quiseres, vamos ao cinema.* |
| enquanto (while, as long as) | *Enquanto houver tempo, há esperança.* |
| assim que, logo que (as soon as) | *Assim que souber, digo-te.* |
| sempre que (whenever) | *Sempre que vieres a Lisboa, fica cá em casa.* |
| depois que (after) | *Depois que ele sair, falamos.* |
| como, onde, quem, o que, quanto (however, wherever, whoever…) | *Quem chegar primeiro, ganha. · Senta-te onde quiseres.* |
!tip If the sentence is about **habits** or **the past**, use the indicative instead: *Quando chego a casa, janto.* (whenever I get home — a habit) · *Quando cheguei, jantei.* (past).

## Futuro composto do conjuntivo
**tiver + participle**: *Quando tiveres acabado, podes sair.* (When you have finished, you can go.)
`,
},

imperativo: { pt: 'Imperativo', en: 'Giving orders and instructions', text: `
## Affirmative orders
|! Person | Where the form comes from | falar | comer | partir |
| **tu** | the **ele** form of the present | fala! | come! | parte! |
| **você** | the presente do conjuntivo | fale! | coma! | parta! |
| **nós** (let's) | the presente do conjuntivo | falemos! | comamos! | partamos! |
| **vós** | the present without the *-s* (ser → *sede*, ir → *ide*) | falai! | comei! | parti! |
| **vocês** | the presente do conjuntivo | falem! | comam! | partam! |
@conj falar,comer,partir impa
## Negative orders: always the subjunctive
For **every** person, a negative order uses the presente do conjuntivo after *não*:
@conj falar,comer,partir impn
> Não fales tão alto! = Don't talk so loudly! (tu)
> Não se preocupe. = Don't worry. (você)
!warn The tu form changes completely in the negative: *Fala!* → *Não **fales**!* · *Come!* → *Não **comas**!* · *Vai!* → *Não **vás**!*

## Irregular tu forms
|! Verb | tu! | não… | você! |
| ser | sê | não sejas | seja |
| estar | está | não estejas | esteja |
| ir | vai | não vás | vá |
| ter | tem | não tenhas | tenha |
| vir | vem | não venhas | venha |
| fazer | faz | não faças | faça |
| dizer | diz | não digas | diga |
| trazer | traz | não tragas | traga |
| pôr | põe | não ponhas | ponha |
| ver | vê | não vejas | veja |
| dar | dá | não dês | dê |
| ler | lê | não leias | leia |
| ouvir | ouve | não ouças | ouça |
| sair | sai | não saias | saia |
- **Vamos!** (Let's go!) is the usual nós form of *ir*; *Vamos ver* = let's see.

## Pronouns with the imperative
In affirmative orders the pronoun goes **after** the verb with a hyphen; in negative orders it goes **before**:
> Diz-me! / Não me digas! = Tell me! / Don't tell me! (also: "No way!")
> Senta-te. / Não te sentes. = Sit down. / Don't sit down.
> Sente-se, por favor. = Please sit down. (você)
> Levantem-se! = Get up! (vocês)

## Being polite in Portugal
A bare imperative can sound bossy. In shops, cafés and with strangers, people usually soften it:
- **pode / podia + infinitive**: *Pode repetir, por favor?* (Could you repeat that?)
- **se faz favor** or **por favor**: *Um café, se faz favor.*
- a question: *Passas-me o sal?* (Will you pass me the salt?)
!pt On signs and in instructions you'll often see the **infinitive** used as an order: *Empurrar* (Push), *Puxar* (Pull), *Não fumar* (No smoking), *Agitar antes de usar* (Shake before use).
`,
},

infinitivo: { pt: 'Infinitivo e gerúndio', en: 'Infinitives, the personal infinitive and the gerund', text: `
## The infinitive
The plain infinitive (*falar, comer, partir*) is used:
- after another verb: *Quero dormir. Sei nadar. Posso entrar?*
- after a preposition — English often uses *-ing* there: *antes de sair* (before leaving), *sem dizer nada* (without saying anything), *depois de comer* (after eating)
- as a noun: *Fumar faz mal.* (Smoking is bad for you.)

## Verb + infinitive phrases
|! Phrase | Meaning | Example |
| **estar a** + inf | to be doing (right now) | *Estou a ler.* (I'm reading.) |
| **ir** + inf | going to | *Vou sair.* |
| **ter de / ter que** + inf | to have to | *Tenho de trabalhar.* |
| **acabar de** + inf | to have just done | *Acabei de chegar.* (I've just arrived.) |
| **começar a** + inf | to start | *Começou a chover.* |
| **voltar a** + inf | to do again | *Voltei a ler o livro.* (I read the book again.) |
| **deixar de** + inf | to stop, give up | *Deixei de fumar.* |
| **costumar** + inf | to usually do | *Costumo jantar às oito.* |
| **continuar a** + inf | to keep doing | *Continua a chover.* |
| **andar a** + inf | to have been doing lately | *Ando a estudar muito.* |
| **estar para** + inf | to be about to | *O comboio está para partir.* |

## The personal infinitive — Portugal's special one
Portuguese can give the infinitive **personal endings**. For regular and irregular verbs alike, add **-, -es, -, -mos, -des, -em** to the infinitive:
@conj falar,ser,fazer infp
It's used when the infinitive has its **own subject**, especially after a preposition or an impersonal expression:
> Antes de saíres, fecha a janela. = Before you leave, close the window.
> É melhor irmos. = We'd better go.
> O professor deu-nos um texto para lermos. = The teacher gave us a text to read.
> Obrigado por teres vindo. = Thanks for coming.
> Ao chegarem, telefonaram-me. = When they arrived, they phoned me.
!tip If you're not sure, ask yourself who does the action. If it's someone other than the subject of the sentence, use the personal infinitive: *Trouxe isto para **comermos*** (I brought this for us to eat).

## The gerund
The gerund ends in **-ando, -endo, -indo** (*falando, comendo, partindo*; *pôr → pondo*). It never changes.
!pt In most of Portugal people say **estar a + infinitive** for *-ing*: *Estou a trabalhar*, not *estou trabalhando* (that's Brazilian, and also heard in the Alentejo and the Algarve).
The gerund is still used in Portugal:
- for *by doing*, *while* or *when*: *Aprende-se fazendo.* (You learn by doing.) *Chegando a casa, liguei-te.* (When I got home, I called you.)
- with **ir** for something happening gradually: *Vai chegando gente.* (People are gradually arriving.)
`,
},

'ser-estar': { pt: 'Ser, estar, ficar e haver', en: 'Ser, estar, ficar, haver: four ways to say "to be"', text: `
## Ser — what something is
- identity, name, profession, nationality: *Sou a Ana. Sou professora. Somos portugueses.*
- characteristics that define someone or something: *Ele é alto. A casa é antiga.*
- origin and material: *Sou de Faro. A mesa é de madeira.*
- time, dates, prices: *São três horas. Hoje é segunda. Quanto é?*
- where an event takes place: *A festa é em minha casa.*
- the passive: *Foi construído em 1900.*
@conj ser pres

## Estar — how something is right now
- states and moods: *Estou cansado. Está frio. O café está quente.*
- where a person or a movable thing is: *O João está em casa. As chaves estão na mesa.*
- **estar a + infinitive** for an action in progress: *Estou a cozinhar.*
- **estar com** + noun for feelings: *Estou com fome / sede / frio / pressa / sono / medo.* (also *Tenho fome*)
@conj estar pres

## Same adjective, different meaning
|! with ser | with estar |
| *Ele é aborrecido.* — he's boring | *Ele está aborrecido.* — he's bored / annoyed |
| *A sopa é boa.* — it's a good soup | *A sopa está boa.* — the soup tastes good (now) |
| *Ela é bonita.* — she's pretty | *Ela está bonita.* — she looks pretty (today) |
| *É rico.* — he's a rich man | *Está rico.* — he's (become) rich |
| *O Rui é calado.* — Rui is a quiet person | *O Rui está calado.* — Rui is quiet (at the moment) |
| *Ele é vivo.* — he's lively, quick-witted | *Ele está vivo.* — he's alive |

## Ficar — to be located, to become, to stay
- where **places and buildings** are: *Onde fica a estação?* (Where's the station?) *Lisboa fica no sul.*
- to **become**, react: *Fiquei contente.* (I was / became happy.) *Ficou zangado.*
- to **stay**: *Fico em casa hoje.*
- to suit: *Esse casaco fica-te bem.* (That coat suits you.)
- to keep: *Fica com o troco.* (Keep the change.)

## Haver — there is / there are
- **há** = there is, there are (never *hão* in this sense): *Há um café ali. Há muitas pessoas.*
- **havia** = there was / were (description), **houve** = there was (an event): *Houve um acidente.*
- **há + time** = ago (with the past) or for (with the present): *Cheguei há dois dias.* (two days ago) · *Moro aqui há dois anos.* (for two years)
- **haver de + infinitive** = shall, will surely: *Hei de ir a Paris.* (I'll go to Paris one day.)
!warn For the *there is* meaning, **haver** is always singular: *há dois cafés*, *havia muitas pessoas*. Using **ter** for this (*tem um café ali*) is Brazilian.
`,
},

nomes: { pt: 'Nomes: género e plural', en: 'Nouns: gender and plural', text: `
## Every noun is masculine or feminine
There's no "it": a table is feminine (*a mesa*), a book masculine (*o livro*). Always learn a noun **with its article**.
|! Usually masculine | Usually feminine |
| **-o**: o livro, o carro | **-a**: a casa, a mesa |
| **-or**: o amor, o calor | **-dade, -tude**: a cidade, a juventude |
| **-ma** (from Greek): o problema, o sistema, o tema, o programa, o clima | **-ção, -são**: a estação, a televisão |
| **-ão** (things): o pão, o coração, o avião | **-gem**: a viagem, a garagem, a mensagem |
| **-l, -r, -z** often: o hotel, o mar, o arroz | **-ice, -ez**: a velhice, a rapidez |
| days, months, seas, rivers: o sábado, o Tejo | letters of the alphabet are masculine: o a, o b |
!warn Common exceptions: **o dia** (day), **o mapa**, **o planeta**, **o sofá** · **a mão** (hand), **a foto**, **a tribo**, **a moto** · **a cor** (colour), **a dor** (pain), **a flor** (flower), **a luz**, **a paz**, **a voz**, **a vez**. Nouns in **-e** can be either: *o leite, o nome, o dente* · *a noite, a tarde, a parte, a gente*.

## Feminine forms of people and animals
|! Pattern | Examples |
| -o → **-a** | o amigo → a amiga · o filho → a filha |
| consonant → **+a** | o professor → a professora · o português → a portuguesa · o senhor → a senhora |
| -ão → **-ã** / **-oa** / **-ona** | o irmão → a irmã · o leão → a leoa · o patrão → a patroa · o solteirão → a solteirona |
| -e, -ista, -ante, -ente → the article changes | o / a estudante · o / a artista · o / a cliente |
| a different word | o homem → a mulher · o pai → a mãe · o rei → a rainha · o cão → a cadela |
| -eu → **-eia** | o europeu → a europeia · o ateu → a ateia |

## Making the plural
|! Ending | Rule | Examples |
| vowel | **+s** | casa → casas · café → cafés · peru → perus |
| -r, -z, stressed -s | **+es** | flor → flores · luz → luzes · mês → meses · país → países |
| -m | **-ns** | homem → homens · jardim → jardins · som → sons |
| -al, -el, -ol, -ul | **-is** | animal → animais · hotel → hotéis · papel → papéis · lençol → lençóis · azul → azuis |
| stressed -il | **-is** | barril → barris · funil → funis |
| unstressed -il | **-eis** | fácil → fáceis · réptil → répteis |
| unstressed -s, -x | no change | o lápis → os lápis · o pires → os pires · o tórax → os tórax |
| -ão | **-ões** (most) | estação → estações · avião → aviões · limão → limões |
| -ão | **-ães** | pão → pães · cão → cães · mãe → mães · alemão → alemães |
| -ão | **-ãos** | mão → mãos · irmão → irmãos · cidadão → cidadãos · verão → verões / verãos |
!tip Most **-ão** words take **-ões**. Learn the few in **-ães** and **-ãos** as you meet them.
- Some words change the vowel sound in the plural (written the same): *o ovo* (closed ô) → *os ovos* (open ó), likewise *olho → olhos, novo → novos, porto → portos*.
- Mixed groups use the masculine plural: *os pais* = the parents, *os irmãos* = the brothers and sisters, *os filhos* = the children.

## Little words: diminutives
**-inho / -inha** makes something small, cute or affectionate, and is very common in Portugal: *casa → casinha* (little house), *café → cafezinho*, *pão → pãozinho*, *obrigado → obrigadinho*, *devagar → devagarinho* (nice and slowly). **-ão** makes something big: *casa → casarão*, *carro → carrão*.
`,
},

artigos: { pt: 'Artigos e contrações', en: 'Articles and contractions', text: `
## The articles
|! | masculine | feminine | masculine plural | feminine plural |
| the | **o** livro | **a** casa | **os** livros | **as** casas |
| a, some | **um** livro | **uma** casa | **uns** livros | **umas** casas |

## Where Portuguese uses "the" and English doesn't
- with **possessives**: *o meu carro* (my car), *a tua mãe*
- with **people's names** in everyday speech: *O João chegou. Falei com a Ana.*
- with most **countries**: *a França, o Brasil, os Estados Unidos, a Inglaterra* — but **not** *Portugal, Angola, Moçambique, Cabo Verde, Israel, Cuba*: *Moro em Portugal* vs *Moro na França*
- for things **in general**: *O vinho é caro. Gosto da música portuguesa.*
- with **days, times and seasons**: *na segunda-feira, às oito horas, no verão*
- with **titles**: *o senhor Silva, a doutora Costa, o professor*
!tip Not with professions after ser: *Sou médico* (I'm a doctor), and not with *casa* meaning home: *Estou em casa.*

## Contractions
Four prepositions — **de, em, a, por** — join the article that follows. These are compulsory, not optional:
|! | o | a | os | as | um | uma |
| **de** (of, from) | do | da | dos | das | dum / de um | duma / de uma |
| **em** (in, on, at) | no | na | nos | nas | num | numa |
| **a** (to, at) | ao | à | aos | às | a um | a uma |
| **por** (by, through) | pelo | pela | pelos | pelas | por um | por uma |
> Sou do Porto. = I'm from Porto.
> Moro na Rua Augusta. = I live on Rua Augusta.
> Vou à praia. = I'm going to the beach.
> Passámos pelo centro. = We went through the centre.
### De and em also join demonstratives, pronouns and place words
|! | este | esse | aquele | isto | isso | aquilo | ele | ela | aqui | aí | ali |
| **de** | deste | desse | daquele | disto | disso | daquilo | dele | dela | daqui | daí | dali |
| **em** | neste | nesse | naquele | nisto | nisso | naquilo | nele | nela | — | — | — |
- **a + aquele = àquele**, **a + aquilo = àquilo**: *Vou àquele restaurante.*
- **dele, dela** also mean *his, her* (see [[possessivos]]): *o carro dele* = his car.
`,
},

adjetivos: { pt: 'Adjetivos e comparações', en: 'Adjectives and comparisons', text: `
## Agreement
An adjective matches its noun in **gender** and **number**:
|! Ending | m. | f. | m. pl. | f. pl. |
| -o | alto | alta | altos | altas |
| -e | grande | grande | grandes | grandes |
| consonant | feliz | feliz | felizes | felizes |
| -l | fácil | fácil | fáceis | fáceis |
| -ês | português | portuguesa | portugueses | portuguesas |
| -or | trabalhador | trabalhadora | trabalhadores | trabalhadoras |
| -ão | alemão | alemã | alemães | alemãs |
| -eu | europeu | europeia | europeus | europeias |
- *melhor, pior, maior, menor, superior, anterior* don't change for gender: *a melhor amiga*.
- For a mixed group, use the masculine plural: *O Rui e a Ana são simpáticos.*

## Where adjectives go
Usually **after** the noun: *uma casa branca, um livro interessante, vinho tinto*.
A few common ones often go **before**: *bom, mau, grande, pequeno, novo, velho, belo, último, próximo, primeiro*.
Some change meaning with their position:
|! before the noun | after the noun |
| *um grande homem* — a great man | *um homem grande* — a big man |
| *um velho amigo* — an old (long-time) friend | *um amigo velho* — an elderly friend |
| *um pobre homem* — a poor (unfortunate) man | *um homem pobre* — a poor (not rich) man |
| *um novo carro* — another car, a new one for me | *um carro novo* — a brand-new car |
| *uma simples pergunta* — just a question | *uma pergunta simples* — an easy question |

## Comparisons
|! | Portuguese | Example |
| more … than | **mais … (do) que** | *O Porto é mais pequeno do que Lisboa.* |
| less … than | **menos … (do) que** | *Este é menos caro que aquele.* |
| as … as | **tão … como / quanto** | *Ela é tão alta como eu.* |
| as much / many … as | **tanto / tanta / tantos / tantas … como** | *Tenho tantos livros como tu.* |
| the most … | **o / a mais …** | *a cidade mais bonita de Portugal* |
### Irregular comparatives
|! | comparative | superlative |
| bom (good) | **melhor** (better) | o melhor (the best) |
| mau (bad) | **pior** (worse) | o pior (the worst) |
| grande (big) | **maior** (bigger) | o maior (the biggest) |
| pequeno (small) | **mais pequeno** or **menor** | o mais pequeno / o menor |
!pt **Mais pequeno** is the normal everyday form in Portugal (in Brazil it's *menor*). *Mais bom* is wrong: say *melhor*.

## Very, extremely: -íssimo
Add **-íssimo** to the adjective (without its last vowel) for *extremely*: *lindo → lindíssimo, caro → caríssimo, rápido → rapidíssimo*. A few have special forms: *fácil → facílimo, difícil → dificílimo, bom → ótimo, mau → péssimo, grande → máximo, pequeno → mínimo*.

## Adverbs in -mente
Add **-mente** to the **feminine** form: *rápido → rapidamente, lento → lentamente, feliz → felizmente, fácil → facilmente*. Common short adverbs: *bem* (well), *mal* (badly), *depressa* (quickly), *devagar* (slowly).
`,
},

possessivos: { pt: 'Possessivos e demonstrativos', en: 'Possessives (my, your…) and this / that', text: `
## Possessives
The possessive agrees with the **thing owned**, not with the owner: a man says *a minha casa* (my house), a woman says *o meu carro* (my car).
|! owner | m. | f. | m. pl. | f. pl. | meaning |
| eu | meu | minha | meus | minhas | my |
| tu | teu | tua | teus | tuas | your (friend) |
| ele, ela, você | seu | sua | seus | suas | your (polite); his, her |
| nós | nosso | nossa | nossos | nossas | our |
| vós · vocês | vosso | vossa | vossos | vossas | your (plural) |
| eles, elas, vocês | seu | sua | seus | suas | their; your (polite plural) |
!pt In Portugal the possessive normally has an **article**: *o meu irmão, a nossa casa, os teus amigos*. It's left out after ser (*É meu.* — It's mine), in some fixed phrases (*Meu Deus!*), and when calling someone (*Minha querida…*).
### His, her, their: dele, dela, deles, delas
Because *seu* can mean *your, his, her* or *their*, people use **de + ele** after the noun to be clear:
> o carro dele = his car · a casa dela = her house · os filhos deles = their children
> O João e a Rita? A casa deles é enorme. = João and Rita? Their house is huge.
In Portugal, **o seu / a sua** usually means the polite *your*: *O seu café, senhor.* For *vocês*, use **vosso**: *a vossa casa*.

## Demonstratives: this, that, that over there
Portuguese has three distances, matching three words for *here* and *there*:
|! | near me | near you | over there |
| m. | este | esse | aquele |
| f. | esta | essa | aquela |
| m. pl. | estes | esses | aqueles |
| f. pl. | estas | essas | aquelas |
| things, ideas (no noun) | isto | isso | aquilo |
| place | aqui · cá | aí | ali · lá |
> Este livro é meu. = This book (here) is mine.
> Essa camisola é bonita. = That jumper (you're wearing) is nice.
> Aquela casa ali é do meu avô. = That house over there is my grandfather's.
> O que é isto? = What's this?
> Isso mesmo! = Exactly! (that's it)
- Combined with prepositions: *neste, nessa, daquele, disso* (see [[artigos]]).
- In speech, *esse* is often used for both *this* and *that* when distance doesn't matter.
`,
},

pronomes: { pt: 'Pronomes', en: 'Pronouns: me, te, o, lhe… and where they go', text: `
## The full table
|! Subject | Direct object | Indirect object | Reflexive | After a preposition | With com |
| eu | me | me | me | mim | comigo |
| tu | te | te | te | ti | contigo |
| ele | o | lhe | se | ele | com ele |
| ela | a | lhe | se | ela | com ela |
| você | o / a | lhe | se | si / você | consigo / com você |
| nós | nos | nos | nos | nós | connosco |
| vós | vos | vos | vos | vós | convosco |
| eles | os | lhes | se | eles | com eles |
| elas | as | lhes | se | elas | com elas |
| vocês | os / as · vos | lhes · vos | se | vocês | convosco · com vocês |
- **Direct** object: the thing or person the action is done to — *Vejo-**o*** (I see him / it).
- **Indirect** object: the person something is given, said, shown, sent **to** — *Dou-**lhe** o livro* (I give him the book).
- **Reflexive**: the subject does it to itself — *Chamo-**me** Ana* (I call myself Ana), *Ele levanta-**se** cedo*.
!pt For **você**, Portugal uses **si** and **consigo** after prepositions: *Isto é para si.* (This is for you.) *Posso ir consigo?* (Can I go with you?) With **vocês**, people mostly use **vos**: *Vejo-vos amanhã.* See [[vos]].

## Where the pronoun goes
### After the verb, with a hyphen — the normal position in Portugal
In a plain affirmative sentence, the pronoun follows the verb:
> Chamo-me Rui. = My name is Rui.
> Vi-te ontem. = I saw you yesterday.
> Dá-me o sal. = Give me the salt.
### Before the verb — when something "pulls" it forward
- **negatives**: *não, nunca, ninguém, nada, nem* — *Não me lembro.* (I don't remember.)
- **question words**: *Como te chamas? Onde a conheceste?*
- **que** and other linking words (*quando, se, porque, embora…*): *Acho que se chama Rui. Quando o vi…*
- some **adverbs**: *já, ainda, também, só, sempre, bem, talvez* — *Já te disse. Também me parece.*
- words like **todos, tudo, alguém, ambos**: *Todos me ajudaram.*
!tip This is one of the clearest differences from Brazil, where *me chamo* is normal. In Portugal, starting a sentence with the pronoun (*Me chamo…*) sounds wrong.
### In the middle — the future and conditional (formal)
*dir-te-ei* (I'll tell you), *dar-lhe-ia* (I would give him). In speech, avoid it with *vou dizer-te* or *digo-te*.

## o, a, os, as change shape
|! After | o becomes | Example |
| **-r, -s, -z** (which drop) | **lo, la, los, las** | comprar + o → **comprá-lo** · fazer + a → **fazê-la** · partir + o → **parti-lo** · fiz + o → **fi-lo** · comemos + a → **comemo-la** |
| **-m, -ão, -õe** (nasal) | **no, na, nos, nas** | compram + o → **compram-no** · dão + a → **dão-na** · põe + o → **põe-no** |
| anything else | stays **o, a, os, as** | vejo + o → **vejo-o** · comprei + a → **comprei-a** |
- After dropping *-r*, the vowel gets an accent if it's stressed: *-ar → -á-*, *-er → -ê-*, *-ir → -i-* (no accent), *pôr → pô-lo*.
> Posso ajudá-lo? = Can I help you? (to a man, polite)
> Vou fazê-lo amanhã. = I'll do it tomorrow.

## Two pronouns together (mostly written)
An indirect + a direct pronoun merge: **me + o = mo**, **te + o = to**, **lhe + o = lho**, **nos + o = no-lo**, **vos + o = vo-lo**.
> Dá-mo. = Give it to me.
> Já lho disse. = I've already told him (it).
In everyday speech people often just drop the *o*: *Já lhe disse.*
`,
},

preposicoes: { pt: 'Preposições', en: 'Prepositions: de, em, a, para, por, com…', text: `
## The main ones
|! Preposition | Main meanings | Examples |
| **de** | of, from, made of, about, by (transport) | *o livro da Ana · sou de Braga · de madeira · de comboio* |
| **em** | in, on, at, into | *em casa · no Porto · na mesa · em maio* |
| **a** | to (going somewhere), at (times), on foot | *vou ao Porto · às três · a pé* |
| **para** | for, to, towards, in order to | *um presente para ti · vou para casa · para aprender* |
| **por** | by, through, along, per, for (in exchange, because of) | *pela janela · por dia · obrigado por tudo · por favor* |
| **com** | with | *café com leite · com a Ana* |
| **sem** | without | *sem açúcar · sem dizer nada* |
| **até** | until, up to, as far as, even | *até amanhã · até à praia* |
| **desde** | since, from | *desde 2020 · desde criança* |
| **entre** | between, among | *entre nós* |
| **sobre** | about, on (top of) | *um livro sobre Lisboa* |
| **contra** | against | *contra a parede* |
| **durante** | during, for | *durante o jantar · durante duas horas* |

## Going places: a or para?
- **ir a** — a visit or short trip, you'll come back: *Vou ao supermercado. Fui a Paris no verão.*
- **ir para** — heading there, often to stay longer: *Vou para casa. Ele foi para Londres trabalhar.*
- **chegar a** — to arrive in / at: *Cheguei a Lisboa ontem.* (Not *cheguei em*, which is Brazilian.)
- **estar em** — to be in: *Estou em Lisboa.*

## Places
|! Portuguese | English |
| em cima de | on top of |
| debaixo de | under |
| dentro de | inside |
| fora de | outside |
| ao lado de | next to |
| em frente de · em frente a | in front of, opposite |
| atrás de | behind |
| perto de | near |
| longe de | far from |
| à direita · à esquerda | on the right · on the left |
| ao fundo de | at the end of |
> O gato está debaixo da mesa. = The cat is under the table.

## Time
|! Use | Examples |
| **em** + months, years, seasons | *em março · em 2026 · no verão · no Natal* |
| **a / à / às** + clock times; parts of the day | *às nove · à uma · à tarde · à noite* · but **de manhã** |
| **em / na** + days | *no sábado · na segunda-feira* · *ao fim de semana* (at weekends) |
| **há** + time | ago (or *for* with the present): *há três dias* |
| **daqui a** + time | in (from now): *daqui a uma hora* (in an hour) |
| **dentro de** + time | within: *dentro de uma semana* |
| **de … a …** · **das … às …** | from … to …: *de segunda a sexta · das nove às cinco* |

## Verbs that need a preposition
These have to be learned with their preposition:
|! Portuguese | English |
| gostar **de** | to like |
| precisar **de** | to need |
| lembrar-se **de** · esquecer-se **de** | to remember · to forget |
| pensar **em** | to think about |
| acreditar **em** | to believe in |
| sonhar **com** · casar **com** | to dream of · to marry |
| depender **de** | to depend on |
| começar **a** · aprender **a** · ajudar **a** | to begin · to learn · to help (to) |
| deixar **de** · acabar **de** | to stop · to have just |
| ter medo **de** | to be afraid of |
| tratar **de** | to deal with, take care of |
| entrar **em** | to go into |
> Gosto muito de ti. = I really like you.
> Penso em ti. = I'm thinking about you.
> Entrei no café. = I went into the café.
`,
},

perguntas: { pt: 'Perguntas e negação', en: 'Questions, answers and negatives', text: `
## Yes/no questions
Just raise your voice at the end — the word order doesn't change:
> Tens fome? = Are you hungry?
> O museu abre hoje? = Is the museum open today?
### Answering: repeat the verb
Portuguese rarely answers with a bare *sim*. The natural answer is the verb:
> Tens fome? — Tenho. / Não, não tenho. = Are you hungry? — Yes. / No, I'm not.
> Gostaste? — Gostei muito! = Did you like it? — Very much!
- **Pois** = yes, right, I see. **Pois é** = that's right. **Claro** = of course.
- Tag questions: *…, não é?* (…, isn't it?), *…, pois não?* (…, is it? — after a negative)

## Question words
|! Portuguese | English | Example |
| o que · que | what | *O que é isto? · Que horas são?* |
| quem | who | *Quem é?* |
| qual · quais | which, what (from a set) | *Qual é o teu nome? · Quais preferes?* |
| onde | where | *Onde moras?* |
| aonde | where to | *Aonde vais?* |
| de onde · donde | where from | *De onde és?* |
| quando | when | *Quando chegas?* |
| como | how | *Como estás? · Como te chamas?* |
| porque · porquê | why | *Porque é que estás triste? · Porquê?* |
| quanto · quanta · quantos · quantas | how much, how many | *Quanto custa? · Quantos anos tens?* |
| para quê | what for | *Para quê?* |
!tip Use **qual** before *é / são* when asking for a specific piece of information: *Qual é a tua morada?* (What's your address?) *O que é* asks for a definition: *O que é uma bica?*
!pt In speech, Portuguese people love adding **é que** after the question word: *O que é que queres? Onde é que moras? Porque é que não vens?* It doesn't change the meaning.
### Porque or porquê?
- **porque** = because, and *why* at the start of a question: *Porque é que…? — Porque sim.*
- **porquê** = *why* on its own or at the end, and *the reason*: *Porquê? · Estás triste porquê? · Não sei o porquê.*

## Negatives
Put **não** right before the verb (and before any pronoun in front of it):
> Não falo alemão. = I don't speak German.
> Não me lembro. = I don't remember.
Negative words **need não before the verb** when they come after it — a double negative is correct:
|! Word | Example |
| nada (nothing) | *Não quero nada.* (I don't want anything.) |
| ninguém (nobody) | *Não vi ninguém.* |
| nunca (never) | *Não vou lá nunca.* — or *Nunca vou lá.* |
| nenhum · nenhuma (no, none) | *Não tenho nenhuma ideia.* |
| nem … nem (neither … nor) | *Não bebo nem café nem chá.* |
| também não (not either) | *Eu também não.* (Me neither.) |
| já não (no longer) | *Já não moro lá.* |
| ainda não (not yet) | *Ainda não acabei.* |
- When the negative word comes **first**, drop *não*: *Ninguém veio. Nunca bebo café. Nada mudou.*
`,
},

numeros: { pt: 'Números, horas e datas', en: 'Numbers, telling the time and dates', text: `
## 0–20
| 0 zero | 6 seis | 11 onze | 16 **dezasseis** |
| 1 um / uma | 7 sete | 12 doze | 17 **dezassete** |
| 2 dois / duas | 8 oito | 13 treze | 18 dezoito |
| 3 três | 9 nove | 14 catorze | 19 **dezanove** |
| 4 quatro | 10 dez | 15 quinze | 20 vinte |
| 5 cinco | | | |
!pt **Dezasseis, dezassete, dezanove** are the Portuguese spellings (and sounds) — Brazil says *dezesseis, dezessete, dezenove*.
- **Um / uma** and **dois / duas** agree with the noun: *um café, uma bica, dois cafés, duas bicas*. So do the hundreds from 200: *duzentas pessoas*.

## Tens, hundreds, thousands
| 30 trinta | 100 **cem** · 101 **cento** e um | 1000 mil |
| 40 quarenta | 200 duzentos / duzentas | 2000 dois mil |
| 50 cinquenta | 300 trezentos | 10 000 dez mil |
| 60 sessenta | 400 quatrocentos | 100 000 cem mil |
| 70 setenta | 500 **quinhentos** | 1 000 000 um milhão |
| 80 oitenta | 600 seiscentos · 700 setecentos | 1 000 000 000 mil milhões |
| 90 noventa | 800 oitocentos · 900 novecentos | |
- **E** (and) goes between tens and units and after hundreds: *vinte e um* (21), *cento e cinco* (105), *trezentos e quarenta e dois* (342).
- After **mil**, use **e** only if what follows is under 100 or a round hundred: *mil e duzentos* (1200), *dois mil e vinte e seis* (2026) — but *mil duzentos e trinta* (1230).
- **Cem** is exactly 100; above it, **cento**: *cem euros, cento e vinte euros*.
- **Mil** never takes *um*: *mil pessoas*. **Milhão** is a noun: *um milhão **de** pessoas*.
!warn In Portugal **um bilião** is a million million (10¹²). A thousand million (10⁹) is **mil milhões**.
- Decimals use a comma and thousands a space or a point: *3,5* = 3.5 · *1 500* or *1.500* = 1,500.

## Ordinals
*primeiro, segundo, terceiro, quarto, quinto, sexto, sétimo, oitavo, nono, décimo* · 20th *vigésimo* · last *último*. They agree like adjectives: *a primeira vez* (the first time), *o 3.º andar* (the 3rd floor), *a 2.ª feira*.

## Telling the time
> Que horas são? = What time is it?
|! Time | Say |
| 1:00 | **É** uma hora. |
| 2:00 | **São** duas horas. |
| 12:00 | É meio-dia. · É meia-noite. |
| 3:15 | São três e um quarto. · São três e quinze. |
| 4:30 | São quatro e meia. |
| 5:40 | São seis menos vinte. · São vinte para as seis. |
| 8:45 | São nove menos um quarto. · É um quarto para as nove. |
| 20:10 | São vinte e dez. (timetables) |
> A que horas começa? — Às oito. = What time does it start? — At eight.
> À uma e meia. = At half past one.
- *de manhã* (in the morning), *à tarde* (in the afternoon), *à noite* (in the evening, at night), *de madrugada* (in the early hours).

## Dates
> Que dia é hoje? — Hoje é dia 23 de novembro. = What's the date today? — It's the 23rd of November.
- Day first, then **de** + month + **de** + year: *5 de maio de 2026*.
- The 1st is *o dia 1* or *o primeiro de maio*.
- Years are read as numbers: *1974 = mil novecentos e setenta e quatro*, *2026 = dois mil e vinte e seis*.
- Months and days are written with a **small letter**: *janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro* · *segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo*.
!tip The weekdays count from Sunday: *segunda* is the "second day", so Monday. In speech the *-feira* is usually dropped: *na segunda, na sexta*.

## Money and age
> Quanto custa? — Custa três euros e cinquenta. = How much is it? — €3.50.
> Quantos anos tens? — Tenho trinta anos. = How old are you? — I'm thirty. (age uses **ter**)
`,
},

});
