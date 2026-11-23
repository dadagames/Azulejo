/* Azulejo · the course book, part 1 (A1): chapter order, goals, explanations and writing tasks.
   Chapters reuse the units in course-a1.js / course-a2b1.js (vocabulary and example sentences).
   Text format, one block per line:
     ## Heading · ### Subheading · plain line = paragraph · - bullet
     > Portuguese = English          (example with a play button)
     !tip …  !pt … (a note about Portugal)  !warn … (a common mistake)
     |! header | cells |  and  | cell | cell |   (tables)
     @conj verb[,verb…] tense         (a live conjugation table from the engine)
     **bold**, *italic*
   write: free-writing tasks with a model answer and useful words. */
window.AZ_BOOK = {
  levels: [
    { id: 1, code: 'A1', pt: 'Primeiros passos', en: 'First steps', chapters: ['u1', 'u2', 'u4', 'u3', 'u5', 'u6'] },
    { id: 2, code: 'A1+', pt: 'O dia a dia', en: 'Everyday life', chapters: ['u7', 'u8', 'u9', 'u10', 'u11', 'u12', 'u13'] },
    { id: 3, code: 'A2', pt: 'Histórias', en: 'Plans and stories', chapters: ['u14', 'u15', 'u16', 'u17', 'u18', 'u19', 'u20'] },
    { id: 4, code: 'B1', pt: 'Mais longe', en: 'Going further', chapters: ['u21', 'u22', 'u23', 'u24', 'u25', 'u26', 'u27'] },
  ],
  // readings that go with each chapter (the first one is the main text)
  reads: {
    u1: ['encontro'], u2: ['turma'], u4: ['ines'], u3: ['casa'], u5: ['cafe'], u6: ['mercado'],
    u7: ['familia'], u8: ['retrato'], u9: ['bairro'], u10: ['cartas'], u11: ['sabado'], u12: ['horario'], u13: ['rotina'],
    u14: ['mensagem'], u15: ['agora', 'saojoao'], u16: ['loja'], u17: ['sintra'], u18: ['ferias'], u19: ['infancia'], u20: ['medico'],
    u21: ['eletrico'], u22: ['presente', 'nata'], u23: ['cidades'], u24: ['futuro'], u25: ['aldeia', 'saudade'], u26: ['lotaria'], u27: ['conselhos', 'gato'],
  },
  ch: {},
};

Object.assign(window.AZ_BOOK.ch, {

u1: {
  pt: 'Olá!', en: 'Sounds and greetings',
  goals: ['Hear the sounds that make European Portuguese so different', 'Greet people and say goodbye at any time of day', 'Use the polite words you need from day one', 'Say that you don\'t understand'],
  text: `
## How European Portuguese sounds
European Portuguese sounds very different from Brazilian Portuguese and from Spanish, even though the spelling is almost the same. The biggest difference: **unstressed vowels almost disappear**. People in Portugal "swallow" the vowels around the stressed syllable, so words sound shorter than they look. Listen to each example and don't worry if it sounds fast — that's normal.
> obrigado = thank you
> telefone = telephone
> pequeno = small
### Letters that sound different from English
|! Spelling | Sounds like | Examples |
| **s** or **z** at the end of a word | *sh* as in "shoe" | três, dois, luz |
| **s** between two vowels | *z* as in "zoo" | casa, mesa |
| **ç**, and **ss** | *s* as in "sun" | praça, passo |
| **ch** | *sh* | chá, chave |
| **j**, and **g** before e or i | *s* as in "measure" | já, gente |
| **lh** | *lli* as in "million" | filho, trabalho |
| **nh** | *ny* as in "canyon" | vinho, amanhã |
| **r** at the start of a word, and **rr** | a throaty sound, like a French r | rua, carro |
| **h** | always silent | hotel, hoje |
| final **-e** | almost silent | noite, tarde |
!tip A final **s** that sounds like *sh* is the quickest way to recognise European Portuguese: *três* sounds like "tresh", *os dias* like "ush dee-ush".
### Nasal sounds
The tilde (**~**) and an **m** or **n** after a vowel make the sound go through the nose:
> pão = bread
> não = no
> mãe = mother
> bom dia = good morning
### Where is the stress?
- Words ending in **a, e, o** (with or without **s**), **am** or **em** are stressed on the second-to-last syllable: *ca*sa, *fa*lam, *ho*mem.
- Words ending in **i, u, l, r, z, ã, ão** are stressed on the last syllable: a*qui*, ho*tel*, fa*lar*, a*ma*nhã.
- A written accent marks an exception: ca*fé*, *mé*dico, *ú*til.
### The accents
|! Mark | What it does | Example |
| **á é í ó ú** (acute) | stressed, open vowel | café, avó |
| **â ê ô** (circumflex) | stressed, closed vowel | você, avô |
| **ã õ** (tilde) | nasal vowel | irmã, estações |
| **à** (grave) | a + a joined together | vou à praia |
| **ç** (cedilla) | an *s* sound before a, o, u | praça, açúcar |
!tip Accents change meaning: **avó** (grandmother, open o) and **avô** (grandfather, closed o) are different words.

## Saying hello
- **Olá** works at any time of day and with anyone.
- **Bom dia** (good morning) until lunchtime, **boa tarde** (good afternoon) until it gets dark, **boa noite** (good evening, good night) after that. They are used both for hello and for goodbye.
> Bom dia! Tudo bem? = Good morning! How's it going?
> Boa tarde! = Good afternoon!
> Boa noite, até amanhã! = Good night, see you tomorrow!
!pt In shops, cafés and lifts people greet before anything else. Start with *Bom dia* or *Boa tarde* before you ask for anything — skipping it sounds rude.

## Saying goodbye
| adeus | goodbye (a little final) |
| tchau | bye (informal and very common) |
| até logo | see you later (today) |
| até amanhã | see you tomorrow |
| até já | see you in a minute |
!tip **Até já** literally means *until already*. You'll hear it every time someone pops out for a minute.

## How are you?
| Tudo bem? | How's it going? (informal) |
| Como estás? | How are you? (to a friend) |
| Como está? | How are you? (polite) |
| Estou bem, obrigado. | I'm fine, thank you. |
| Mais ou menos. | So-so. |
| Muito prazer. | Nice to meet you. |
- *Tudo bem?* is often answered with *Tudo bem!* or *Tudo, e contigo?* (All good, and you?).
- Notice **estás** and **está**: two forms of the same verb, *estar*. The first one is for a friend, the second one is polite. Chapter 2 explains why.

## Thank you, please, sorry
- **Obrigado** if you are a man, **obrigada** if you are a woman. It agrees with the person *speaking*, because it literally means *obliged*.
> Obrigada! — De nada. = Thank you! — You're welcome.
- **Por favor** and **se faz favor** both mean *please*. *Se faz favor* is very Portuguese, and it's also how you call a waiter.
- **Desculpe** (polite) or **desculpa** (to a friend) mean *sorry* and *excuse me*.
- **Com licença** is *excuse me* when you want to get past someone or come in.

## When you don't understand
> Desculpe, não percebo. = Sorry, I don't understand.
> Pode repetir, por favor? = Can you repeat that, please?
!pt In Portugal the everyday verb for *to understand* is **perceber**: *Não percebo*. You'll also hear *não entendo*, but *não percebo* is the one to learn.`,
  write: [
    { task: 'You walk into a café in the morning. Greet the waiter, ask how he is, answer his question and say thank you.', model: '— Bom dia! Tudo bem?\n— Bom dia! Tudo bem, obrigado. E consigo?\n— Estou bem, obrigada.', hint: 'bom dia, tudo bem, obrigado / obrigada' },
    { task: 'You meet a friend in the evening. Say hello, ask how she is, answer her, and say goodbye until tomorrow.', model: '— Olá, Rita! Como estás?\n— Estou bem, obrigada. E tu?\n— Mais ou menos. Boa noite, até amanhã!', hint: 'olá, como estás, boa noite, até amanhã' },
  ],
},

u2: {
  pt: 'Eu, tu, você…', en: 'The persons and the verb ser',
  goals: ['Know every grammatical person: I, you, he, she, we, you all, they', 'Choose between tu, você and o senhor / a senhora in Portugal', 'Understand what vós is, and why you will rarely hear it', 'Conjugate ser (to be) and say who you are and where you\'re from'],
  text: `
## The persons of the verb
Every Portuguese verb changes its ending depending on **who** does the action. Grammar books call these the **persons**: the first person is the speaker, the second person is the one you talk to, and the third person is anyone else — each in the singular and in the plural.
|! Person | Pronoun | English | ser (to be) |
| 1st singular | **eu** | I | sou |
| 2nd singular | **tu** | you (informal) | és |
| 3rd singular | **ele · ela** | he · she | é |
| 3rd singular | **você · o senhor · a senhora** | you (polite) | é |
| 1st plural | **nós** | we | somos |
| 2nd plural | **vós** | you all (old-fashioned) | sois |
| 3rd plural | **eles · elas** | they | são |
| 3rd plural | **vocês · os senhores · as senhoras** | you all | são |
Notice the most important thing in this table: **the polite "you" uses the third-person verb**. *O senhor é* literally means *the gentleman is*. Portuguese is polite by talking *about* the person rather than *to* them, so **você, o senhor and a senhora take the same verb as ele and ela**, and **vocês** takes the same verb as **eles**.
- **Ele** is *he*, **ela** is *she*. For things, *ele* and *ela* also mean *it*, following the gender of the noun.
- **Eles** is for men or a mixed group; **elas** only for women. One man in a group of women makes it *eles*.

## Tu, você or o senhor?
### Tu: friends, family, children, people your age
In Portugal **tu** is the normal way to talk to friends, family, children, colleagues and, more and more, young people you've just met.
> Tu és português? = Are you Portuguese?
### O senhor and a senhora: polite and safe
With older people, in shops, with officials or anyone you don't know, say **o senhor** (to a man) or **a senhora** (to a woman), with the third-person verb.
> A senhora é de Lisboa? = Are you from Lisbon? (to a woman)
> O senhor é o Dr. Silva? = Are you Dr Silva?
### Você: handle with care
**Você** is grammatically the polite "you", but in Portugal it can sound distant or even a little rude, especially to older people. Many Portuguese speakers avoid it completely: they **drop the pronoun** and use the verb alone, or they use the person's name.
> É de Lisboa? = Are you from Lisbon? (no pronoun at all)
> O Pedro quer um café? = Would you like a coffee, Pedro? (literally: does Pedro want a coffee?)
!pt Not sure which one to use? Leave the pronoun out: *É inglês?* It's polite, natural, and you avoid the tu / você question altogether.
### Vocês: more than one person
For more than one person, Portugal uses **vocês** — for friends and strangers alike. It takes the *eles* form of the verb: *vocês são*.

## And what is vós?
**Vós** is the old second-person plural, *you all* — like the old English *ye*. In modern European Portuguese it has almost disappeared from speech: **vocês** has taken its place. You will still come across it:
- in the Bible, in prayers and at church: *Pai Nosso, que estais no céu* (Our Father, who art in heaven)
- in older literature, poetry and very formal speeches
- in some villages of northern Portugal, where older people still say *vós sois* or *vós falais*.
Its relatives are still very much alive: **vos** (you, to you) as an object pronoun, and **vosso** (your) as a possessive, both used with *vocês*:
> Vejo-vos amanhã! = See you (all) tomorrow!
> A vossa casa é linda. = Your house is lovely.
!tip You need to *recognise* vós forms — they usually end in **-is**: *sois, falais, comeis, partis* — but you don't need to use them. Azulejo's tables show vós in grey, and drills leave it out unless you switch it on in your settings.

## Dropping the pronoun
The verb ending already tells you who is speaking, so Portuguese usually **leaves out eu, tu and nós**:
> Sou de Lisboa. = I'm from Lisbon.
> És estudante? = Are you a student?
> Somos amigos. = We're friends.
Keep *ele, ela, eles, elas* when it isn't clear who you mean, and use any pronoun for emphasis or contrast:
> Eu sou do Porto, ela é de Faro. = I'm from Porto, she's from Faro.

## A gente
In casual speech you'll often hear **a gente** (literally *the people*) meaning *we*. Careful: it takes the **ele / ela** form of the verb.
> A gente é do Porto. = We're from Porto.
Use *nós* when you write; *a gente* is fine with friends.

## Ser: to be
**Ser** is the verb for what someone or something *is*: identity, nationality, origin, profession and character.
@conj ser pres
- Origin and nationality: **Sou de Londres. Sou inglês.**
- Profession, with no article: **Ela é médica.** (not *uma médica*)
- Identity: **O meu nome é Tiago.**
> Eles são do Brasil, mas nós somos de Portugal. = They're from Brazil, but we're from Portugal.
- To say *no*, put **não** before the verb: *Não sou francês.*

## Nationalities agree
Nationalities are adjectives: they change for a woman and for more than one person.
|! | a man | a woman | men | women |
| Portuguese | português | portuguesa | portugueses | portuguesas |
| English | inglês | inglesa | ingleses | inglesas |
| Spanish | espanhol | espanhola | espanhóis | espanholas |
| German | alemão | alemã | alemães | alemãs |
| Italian | italiano | italiana | italianos | italianas |
| Brazilian | brasileiro | brasileira | brasileiros | brasileiras |
!tip Nationalities are written with a small letter: *ele é francês*. Countries take a capital: *Portugal, Inglaterra*.

## My name is…
- **Chamo-me Ana.** My name is Ana — literally *I call myself Ana*.
- **Como te chamas?** What's your name? (to a friend) · **Como se chama?** (polite)
!pt In a plain statement the little word *me* goes **after** the verb, with a hyphen: *Chamo-me*. After a question word it moves in front: *Como te chamas?* This is typical of Portugal — Brazil says *Me chamo*. Chapter 13 explains the rule.`,
  write: [
    { task: 'Introduce yourself: your name, where you are from and your nationality.', model: 'Olá! Chamo-me Tom. Sou inglês, sou de Londres.', hint: 'chamo-me, sou, de' },
    { task: 'Present two friends: their names, where they are from, their nationality and their job.', model: 'O Pedro é português e é de Lisboa. A Rita é espanhola, é de Madrid. Eles são estudantes.', hint: 'é, são, eles' },
    { task: 'Politely ask a woman you don\'t know if she is Portuguese and where she is from.', model: 'Desculpe, a senhora é portuguesa? De onde é?', hint: 'a senhora, é, de onde' },
  ],
},

u4: {
  pt: 'Conjugar verbos', en: 'How verbs work: regular verbs',
  goals: ['Understand infinitives, stems and endings', 'Conjugate any regular -ar, -er or -ir verb in the present tense', 'Say no and ask questions', 'Talk about where you live, the languages you speak and what you do'],
  text: `
## Infinitive, stem and ending
The dictionary form of a verb is the **infinitive**, like *to speak* in English. Every Portuguese infinitive ends in **-ar**, **-er** or **-ir** (plus *pôr*, *to put*, and its family). These three groups are called the three **conjugations**:
|! Group | Example | Meaning |
| 1st conjugation: **-ar** | falar | to speak |
| 2nd conjugation: **-er** | comer | to eat |
| 3rd conjugation: **-ir** | partir | to leave; to break |
To conjugate a regular verb, take off **-ar, -er or -ir** to find the **stem** (*fal-, com-, part-*) and add the ending for each person. Here are the three side by side, with the endings in bold:
@conj falar,comer,partir pres

## The pattern behind the endings
Look closely and you'll see a logic that comes back in almost every tense:
|! Person | Ending | The clue |
| eu | **-o** | eu almost always ends in -o in the present |
| tu | **-s** | tu forms nearly always end in -s |
| ele · ela · você | **-a** or **-e** | the bare stem plus a vowel |
| nós | **-mos** | nós always ends in -mos |
| vós | **-is** | rare (see chapter 2) |
| eles · elas · vocês | **-m** | the plural always ends in -m |
- **-ar** verbs have an **a** in their endings: fal**as**, fal**a**, fal**amos**, fal**am**.
- **-er** and **-ir** verbs have an **e**: com**es**, com**e**, com**em** · part**es**, part**e**, part**em**. They are only different in *nós* and *vós*: com**emos**, part**imos**.
!tip Learn to read the endings and you'll always know who is doing the action: *trabalhamos* can only be *we work*; *moram* can only be *they live* (or *you all live*). That's why the pronoun can be dropped.

## Most verbs are -ar verbs
About nine out of ten Portuguese verbs end in **-ar**, and almost all of them are regular — learn *falar* and you know hundreds of verbs. New verbs are always made with -ar too.
@conj morar,trabalhar pres
Some regular -ar verbs to start with: *falar* (speak), *trabalhar* (work), *estudar* (study), *morar* (live), *cantar* (sing), *dançar* (dance), *nadar* (swim), *cozinhar* (cook), *viajar* (travel), *comprar* (buy), *tomar* (take; have a drink), *chegar* (arrive), *ajudar* (help), *precisar de* (need).

## Saying no
Put **não** directly before the verb. Portuguese doesn't need a helper like *don't* or *doesn't*:
> Não falo alemão. = I don't speak German.
> Ela não trabalha hoje. = She isn't working today.
> Não, não moro em Lisboa. = No, I don't live in Lisbon.
!tip The double *não* in the last example is normal: the first one answers the question, the second one makes the verb negative.

## Asking questions
A yes/no question looks exactly like a statement — only your voice goes up at the end:
> Falas inglês. = You speak English.
> Falas inglês? = Do you speak English?
To answer *yes*, Portuguese people usually **repeat the verb** instead of saying *sim*:
> Falas português? — Falo, um pouco. = Do you speak Portuguese? — Yes, a little.
### Question words
| onde | where | Onde moras? |
| o que | what | O que estudas? |
| quem | who | Quem fala inglês? |
| quando | when | Quando chegas? |
| como | how | Como se diz *thank you*? |
| porque · porquê | why | Porque estudas português? |
!pt In Portugal *why* is **porque** at the start of a question and **porquê** at the end: *Estudas português porquê?* The answer, *because*, is **porque**.

## Verbs with a little extra word
Some verbs always take a preposition after them. **Precisar** (to need) takes **de**:
> Preciso de ajuda. = I need help.
> Precisas de um táxi? = Do you need a taxi?

## Languages
Languages are masculine and written with a small letter: *o português, o inglês, o espanhol*. After *falar*, *estudar* and *aprender* the article is usually dropped:
> Falo inglês e um pouco de português. = I speak English and a bit of Portuguese.`,
  write: [
    { task: 'Write three or four sentences about yourself: where you live, which languages you speak, and whether you work or study.', model: 'Moro em Manchester. Falo inglês e um pouco de português. Trabalho num banco e estudo português à noite.', hint: 'moro, falo, trabalho, estudo' },
    { task: 'Ask a new friend three questions: where they live, what they study and whether they cook.', model: 'Onde moras? O que estudas? Cozinhas bem?', hint: 'onde, o que, -as' },
    { task: 'Write about your family with nós and eles: where you live and what you all do.', model: 'Nós moramos em Leeds. Os meus pais trabalham muito e viajam ao fim de semana. Eu e o meu irmão estudamos.', hint: 'moramos, trabalham, estudamos' },
  ],
},

u3: {
  pt: 'O e a', en: 'Nouns, gender and plurals',
  goals: ['Know whether a noun is masculine or feminine', 'Use o, a, os, as and um, uma, uns, umas', 'Make plurals, including the tricky -ão words', 'Say what there is with há'],
  text: `
## Every noun has a gender
Every Portuguese noun is either **masculine** or **feminine** — even objects and ideas. The words for *the* and *a* change to match:
|! | masculine | feminine |
| the | **o** livro | **a** casa |
| a, an | **um** livro | **uma** casa |
| the (plural) | **os** livros | **as** casas |
| some | **uns** livros | **umas** casas |
> O livro e a caneta. = The book and the pen.
> Uma mesa e uma cadeira. = A table and a chair.

## Guessing the gender
- Nouns ending in **-o** are usually masculine: *o carro, o livro, o gato*.
- Nouns ending in **-a** are usually feminine: *a casa, a mesa, a porta*.
- Nouns ending in **-ção, -são, -dade, -gem** are feminine: *a estação, a televisão, a cidade, a viagem*.
- Many nouns ending in **-ma** are masculine: *o problema, o sistema, o programa*.
- Nouns ending in **-e** or in a consonant can be either: *o leite* but *a chave*; *o hotel* but *a flor*.
!warn Watch the famous exceptions: **o dia, o mapa, o sofá** are masculine; **a mão** (hand) is feminine.
!tip Always learn a noun **with its article**: not *leite* but **o leite**, not *chave* but **a chave**. Azulejo always shows words that way.

## People: masculine and feminine
Many words for people have a masculine and a feminine form:
| o amigo · a amiga | friend |
| o professor · a professora | teacher |
| o português · a portuguesa | Portuguese man · woman |
| o estudante · a estudante | student — the same word; only the article changes |
A mixed group is always **masculine plural**: *os amigos* can be all men, or men and women.

## Plurals
|! Word ends in | Rule | Examples |
| a vowel | add **-s** | casa → casas, café → cafés |
| -r, -z, or a stressed -s | add **-es** | flor → flores, luz → luzes, mês → meses |
| -m | change to **-ns** | homem → homens, viagem → viagens |
| -l | change to **-is** | hotel → hotéis, animal → animais |
| -ão | **-ões**, **-ães** or **-ãos** | estação → estações, pão → pães, mão → mãos |
!warn Most -ão words take **-ões**: *estações, televisões, limões*. A few take **-ães** (*pães, cães, alemães*) or **-ãos** (*mãos, irmãos*). Learn these as you meet them.

## This is…
**Isto é…** means *this is…* — for something you point at, before you name it:
> Isto é uma chave. = This is a key.
> O que é isto? = What's this?

## There is, there are: há
**Há** (from the verb *haver*) means both *there is* and *there are* — it never changes:
> Há um gato na rua. = There's a cat in the street.
> Há dois cafés aqui. = There are two cafés here.
> Não há pão. = There's no bread.
!pt Brazilian Portuguese often says *tem* for *there is*. In Portugal, stick to **há**.

## A first look at contractions
Little words join with the article: **de + o = do**, **em + a = na**, **a + o = ao**. Chapter 9 covers them properly; for now just recognise them:
> o livro do Pedro = Pedro's book
> Há um gato na rua. = There's a cat in the street.`,
  write: [
    { task: 'Look around the room you are in and write what there is — at least five things, with um or uma.', model: 'No meu quarto há uma cama, uma mesa, uma cadeira, um computador e dois livros.', hint: 'há, um, uma, dois' },
    { task: 'Write what there is in your street or town: shops, cafés, a station… Use plurals.', model: 'Na minha rua há três cafés, dois restaurantes e um hotel. Também há uma estação e muitas casas.', hint: 'há, -s, -es, -ões' },
  ],
},

u5: {
  pt: 'Comer e beber', en: 'Food, drink and liking things',
  goals: ['Use the regular -er verbs comer and beber', 'Say what you like and don\'t like with gostar de', 'Order in a café the Portuguese way', 'Learn the food words you\'ll see on every menu'],
  text: `
## Comer and beber
Both are regular **-er** verbs, so they follow the pattern of *comer* from chapter 3:
@conj comer,beber pres
> Como sopa todos os dias. = I eat soup every day.
> Bebemos café depois do almoço. = We drink coffee after lunch.

## Gostar de: to like
**Gostar** is a regular -ar verb, but it always comes with **de** — in Portuguese you like *of* something:
@conj gostar pres
**De** joins the article that follows it: **de + o = do**, **de + a = da**, **de + os = dos**, **de + as = das**.
> Gostas de peixe? = Do you like fish? (fish in general)
> Gosto muito da sopa da minha avó. = I really like my grandmother's soup.
> Não gosto nada de café. = I don't like coffee at all.
- For a food in general, use **de** with no article: *Gosto de fruta.* For a particular one, add the article: *Gosto do pão desta padaria.*
- To like *doing* something: **gostar de + infinitive**: *Gosto de cozinhar.*
!warn Don't forget the **de**: *Gosto chocolate* is wrong. It must be *Gosto **de** chocolate*.

## Querer: to want
**Querer** is irregular in *eu* and *ele*:
@conj querer pres
In a café, *quero* can sound a little blunt. Portuguese people usually say **queria** — literally *I wanted*, used to mean *I'd like*:
> Queria um café, se faz favor. = I'd like a coffee, please.
> Queres uma água? = Would you like some water?

## In the café
|! You ask for | You get |
| um café · uma bica | an espresso (*bica* is the Lisbon word) |
| um galão | a large milky coffee in a tall glass |
| uma meia de leite | half coffee, half milk, in a cup |
| um pastel de nata | the famous custard tart |
| uma torrada | thick buttered toast |
| uma tosta mista | a toasted ham and cheese sandwich |
| um sumo de laranja | an orange juice |
> Queria um galão e uma torrada, se faz favor. = I'd like a galão and some toast, please.
> A conta, se faz favor. = The bill, please.
> Quanto é? = How much is it?
!pt **Um café** on its own means an espresso everywhere in Portugal. Breakfast (*o pequeno-almoço*) is light: a coffee and a pastry or toast, often standing at the counter.

## Meals
| o pequeno-almoço | breakfast |
| o almoço | lunch |
| o lanche | afternoon snack |
| o jantar | dinner |
The matching verbs are regular -ar verbs: **almoçar** (to have lunch), **lanchar** (to have a snack), **jantar** (to have dinner).
> Almoçamos à uma. = We have lunch at one.`,
  write: [
    { task: 'Order breakfast in a café: greet the waiter, ask for a drink and something to eat, then ask how much it is.', model: 'Bom dia! Queria um galão e uma torrada, se faz favor. Quanto é?', hint: 'queria, se faz favor, quanto é' },
    { task: 'Write about what you like and don\'t like to eat and drink — at least four sentences.', model: 'Gosto muito de peixe e de sopa. Não gosto de carne. Bebo muito chá, mas não gosto de café. Como fruta todos os dias.', hint: 'gosto de, não gosto de, como, bebo' },
  ],
},

u6: {
  pt: 'Números', en: 'Numbers, age and prices',
  goals: ['Count from 0 to 1000 and beyond', 'Use the irregular verb ter (to have)', 'Say how old you are', 'Ask and understand prices'],
  text: `
## From 0 to 20
| 0 zero | 1 um / uma | 2 dois / duas | 3 três | 4 quatro |
| 5 cinco | 6 seis | 7 sete | 8 oito | 9 nove |
| 10 dez | 11 onze | 12 doze | 13 treze | 14 catorze |
| 15 quinze | 16 dezasseis | 17 dezassete | 18 dezoito | 19 dezanove |
- **Um** and **dois** have feminine forms: *um euro, uma casa · dois euros, duas casas*.
- **20 vinte**.
!pt Portugal says and writes **catorze, dezasseis, dezassete** and **dezanove**. Brazil writes *dezesseis, dezessete, dezenove* — you'll see both, but use the Portuguese ones.

## Tens, hundreds and thousands
| 30 trinta | 40 quarenta | 50 cinquenta | 60 sessenta |
| 70 setenta | 80 oitenta | 90 noventa | 100 cem |
- Join tens and units with **e**: *vinte e um, trinta e cinco, noventa e nove*.
- **Cem** is exactly 100. From 101 it becomes **cento**: *cento e dez* (110).
- The hundreds: 200 duzentos, 300 trezentos, 400 quatrocentos, 500 quinhentos, 600 seiscentos, 700 setecentos, 800 oitocentos, 900 novecentos. They agree with feminine nouns: *duzentas pessoas*.
- **Mil** is 1000, with no *um*: *mil euros, dois mil*.
- In long numbers, **e** goes before the last group: *mil e quinhentos* (1500), *dois mil e vinte e seis* (2026).

## Ter: to have
**Ter** is one of the most useful verbs in the language — and it's irregular:
@conj ter pres
> Tenho dois irmãos. = I have two brothers.
> Tens tempo? = Do you have time?
> Eles não têm carro. = They don't have a car.
!tip **Tem** (he/she has) and **têm** (they have) sound the same in most of Portugal; only the circumflex accent tells them apart in writing.

## How old are you?
In Portuguese you *have* years rather than *being* them:
> Tenho vinte e cinco anos. = I'm 25.
> Quantos anos tens? = How old are you?
> A minha avó tem oitenta anos. = My grandmother is 80.
!warn Never say *Sou 25* — always **Tenho 25 anos**.

## Prices
> Quanto custa? = How much is it? (one thing)
> Quanto custam? = How much are they? (more than one)
> Custa três euros e cinquenta. = It's three euros fifty.
> São dez euros. = That's ten euros.
- **Custar** agrees with what costs: *o bolo custa*, *os bolos custam*.
!pt Portugal writes decimals with a comma and the euro sign after the number: **3,50 €**. Big numbers use a space or a dot: 1 500 or 1.500.`,
  write: [
    { task: 'Write about your family with numbers: how many brothers and sisters you have and how old everyone is.', model: 'Tenho uma irmã e dois irmãos. A minha irmã tem vinte anos e os meus irmãos têm quinze e dezassete. Eu tenho vinte e três anos.', hint: 'tenho, tem, têm, anos' },
    { task: 'You are at a market. Ask the price of two things and say what you would like to buy.', model: 'Bom dia! Quanto custam as laranjas? E quanto custa o pão? Queria um quilo de laranjas, se faz favor.', hint: 'quanto custa, quanto custam, queria' },
  ],
},

u7: {
  pt: 'A família', en: 'Family and possessives',
  goals: ['Name the members of your family', 'Use the possessives: o meu, a tua, o nosso…', 'Say his, her and their with dele, dela, deles', 'Talk about whether people are married or single'],
  text: `
## My, your, our: they agree with the thing owned
In Portuguese the possessive agrees with the **thing owned**, not with the owner. In Portugal it normally comes **with the article**: *o meu carro*, *a minha casa*.
|! | masc. singular | fem. singular | masc. plural | fem. plural |
| my | o meu | a minha | os meus | as minhas |
| your (tu) | o teu | a tua | os teus | as tuas |
| his, her, your (polite) | o seu | a sua | os seus | as suas |
| our | o nosso | a nossa | os nossos | as nossas |
| your (vocês) | o vosso | a vossa | os vossos | as vossas |
> A minha mãe é professora. = My mother is a teacher.
> Os teus pais moram aqui? = Do your parents live here?
> A nossa casa é pequena. = Our house is small.
- A woman says **o meu marido**, a man says **a minha mulher**: the possessive follows the noun, not the speaker.
!pt **Vosso** is still everyday Portuguese — it's the possessive for *vocês*: *a vossa casa* (your house, talking to several people). Unlike *vós*, nobody thinks it sounds old.

## His, her, their: dele, dela
*O seu* can mean his, her, their or your — too many possibilities. So to say *his* or *her*, Portugal prefers **dele** (of him), **dela** (of her), **deles / delas** (of them), placed **after** the noun:
> o carro dele = his car
> a casa dela = her house
> os filhos deles = their children
!tip Keep **o seu / a sua** for a polite *your*: *O seu nome, se faz favor?* (Your name, please?)

## The family
| o pai · a mãe | os pais — parents |
| o filho · a filha | os filhos — children |
| o irmão · a irmã | os irmãos — brothers and sisters |
| o avô · a avó | os avós — grandparents |
| o tio · a tia | os tios — uncles and aunts |
| o primo · a prima | os primos — cousins |
| o neto · a neta | os netos — grandchildren |
| o marido · a mulher | husband · wife |
| o namorado · a namorada | boyfriend · girlfriend |
!warn **Os pais** means *the parents* (mother and father), not *the fathers*. In the same way, *os irmãos* can mean brothers and sisters.

## Married or single?
> Sou casado. / Sou casada. = I'm married.
> Sou solteiro. / Sou solteira. = I'm single.
> Ela é casada com o Rui. = She's married to Rui.
- In Portuguese you are married **com** (with) someone.

## Names with the article
When you talk *about* someone in Portugal, you put the article in front of their name: **o João, a Inês**. When you talk *to* them, you don't.
> A Inês é minha prima. = Inês is my cousin.
> Olá, Inês! = Hi, Inês!
- After *ser*, the article before the possessive is often dropped: *É minha prima.*`,
  write: [
    { task: 'Describe your family: who they are, their names, ages and what they do.', model: 'A minha família é pequena. O meu pai chama-se David e tem sessenta anos. A minha mãe é professora. Tenho um irmão, o Tom. Ele é casado e tem dois filhos.', hint: 'o meu, a minha, chama-se, tem' },
    { task: 'Describe a friend\'s family using dele or dela.', model: 'A Sara tem dois irmãos. O irmão dela mora em Faro e a irmã dela é estudante. Os pais dela são do Porto.', hint: 'dela, dele, os pais dela' },
  ],
},

u8: {
  pt: 'Descrever', en: 'Describing: adjectives, ser and estar',
  goals: ['Make adjectives agree with the noun', 'Choose between ser and estar', 'Describe people, places and things', 'Say very, so and quite'],
  text: `
## Adjectives agree
Adjectives change to match the noun's gender and number, and they normally come **after** the noun:
|! | masculine | feminine |
| singular | o carro novo | a casa nova |
| plural | os carros novos | as casas novas |
- Adjectives ending in **-o** have four forms: *novo, nova, novos, novas*.
- Adjectives ending in **-e** or in most consonants have only two: *grande, grandes · fácil, fáceis · azul, azuis*.
- **-ês** becomes **-esa**, and **-or** becomes **-ora**: *inglês, inglesa · trabalhador, trabalhadora*.

## Before or after the noun?
Most adjectives go after the noun. A few very common ones — *bom, mau, grande, pequeno, novo, velho* — can also go before, and some change their meaning:
> um homem grande = a big man
> um grande homem = a great man
> um amigo velho = an elderly friend
> um velho amigo = an old friend (for a long time)

## Ser or estar?
Both mean *to be*, and choosing between them is one of the key skills in Portuguese.
@conj ser,estar pres
### Ser: what something is
Identity, nature, permanent characteristics, origin, profession:
> A Ana é alta e simpática. = Ana is tall and nice.
> O Porto é bonito. = Porto is beautiful.
### Estar: how something is right now
States, moods, temporary conditions — and where people and things are:
> A Ana está cansada. = Ana is tired.
> A sopa está boa! = The soup is (tastes) good!
> Estou em casa. = I'm at home.
!tip Ask yourself: is this what it *is*, or how it *is at the moment*? *Ele é chato* means he's a boring person; *Ele está chato hoje* means he's being annoying today.
!warn Some adjectives change meaning: **ser aborrecido** = to be boring, **estar aborrecido** = to be bored · **ser bom** = to be good, **estar bom** = to be well, to taste good.

## Very, so, quite, a bit
- **muito** = very (it doesn't change): *muito bonito, muito bonitas*
- **tão** = so: *É tão caro!*
- **bastante** = quite: *bastante difícil*
- **um pouco** = a bit: *Estou um pouco cansado.*
!pt **Fixe** is the all-purpose Portuguese word for *cool, great*: *O concerto foi muito fixe!*

## Opposites
| grande ↔ pequeno | big ↔ small |
| novo ↔ velho | new, young ↔ old |
| caro ↔ barato | expensive ↔ cheap |
| bom ↔ mau | good ↔ bad |
| alto ↔ baixo | tall ↔ short |
| fácil ↔ difícil | easy ↔ difficult |
| bonito ↔ feio | pretty ↔ ugly |`,
  write: [
    { task: 'Describe your best friend: what they are like (ser) and how they are today (estar).', model: 'A minha melhor amiga chama-se Laura. É alta, simpática e muito inteligente. Hoje está cansada e um pouco triste.', hint: 'é, está, muito' },
    { task: 'Describe your town or city using at least four adjectives — make them agree!', model: 'A minha cidade é pequena, mas é bonita. As ruas são antigas e as casas são brancas. Os restaurantes são bons e baratos.', hint: 'é, são, -o / -a / -os / -as' },
  ],
},

u9: {
  pt: 'Na cidade', en: 'Where things are',
  goals: ['Say where people and things are', 'Join em, de and a with the article: no, da, ao…', 'Use ficar for buildings and places', 'Use here, there and prepositions of place'],
  text: `
## Estar for where things are
Use **estar** to say where people and things are:
> Estou no café. = I'm at the café.
> As chaves estão em cima da mesa. = The keys are on the table.

## Ficar for places
For buildings and places — things that never move — Portuguese prefers **ficar** (literally *to stay*):
@conj ficar pres
> Onde fica a estação? = Where is the station?
> O museu fica perto do rio. = The museum is near the river.

## Em + the article: in, on, at
**Em** joins the article that follows it. You almost never see *em o* or *em a*:
|! | o | a | os | as | um | uma |
| em + | **no** | **na** | **nos** | **nas** | **num** | **numa** |
> Moro no Porto. = I live in Porto.
> Estou na praia. = I'm at the beach.
> Trabalho num banco. = I work in a bank.

## De + the article: of, from
|! | o | a | os | as |
| de + | **do** | **da** | **dos** | **das** |
> Sou do Porto. = I'm from Porto.
> A casa da Ana. = Ana's house.
!tip Portuguese has no *'s*: *Ana's house* is *a casa da Ana* — the house of Ana.

## A + the article: to
|! | o | a | os | as |
| a + | **ao** | **à** | **aos** | **às** |
> Vou ao cinema. = I'm going to the cinema.
> Vou à praia. = I'm going to the beach.
!tip The accent on **à** has nothing to do with stress: it just shows that *a* + *a* have merged.

## Places with and without an article
- Most cities have no article: *em Lisboa, de Londres, a Madrid*.
- Some places do: **o Porto, o Algarve, o Brasil, os Açores** → *no Porto, do Algarve, no Brasil, nos Açores*.
!pt In Portugal many countries go without an article after *em*: **em Portugal, em Espanha, em França, em Inglaterra**. But *o Brasil* always takes one: *no Brasil*.

## Exactly where?
| perto de | near | longe de | far from |
| ao lado de | next to | em frente de | opposite |
| em cima de | on top of | debaixo de | under |
| dentro de | inside | fora de | outside |
| atrás de | behind | entre | between |
These all end in **de**, which joins the article: *ao lado do banco, perto da praia, em cima da mesa*.

## Here and there
Portuguese has more than one *there*:
| aqui | here, near me |
| aí | there, near you |
| ali | over there (you can see it) |
| lá | there, far away |
> O banco é ali, ao lado da farmácia. = The bank is over there, next to the pharmacy.

## Há: what there is
> Há uma farmácia perto daqui? = Is there a pharmacy near here?
> Na minha rua há dois cafés. = There are two cafés in my street.`,
  write: [
    { task: 'Describe your street or neighbourhood: what there is and where things are.', model: 'Moro numa rua perto do centro. Ao lado da minha casa há um café. O supermercado fica em frente da escola e a farmácia fica perto do banco.', hint: 'há, fica, ao lado de, perto de' },
    { task: 'A friend can\'t find their things in your living room. Tell them where everything is.', model: 'As chaves estão em cima da mesa, ao lado do telemóvel. O teu casaco está no sofá e os livros estão debaixo da cadeira.', hint: 'está, estão, em cima de, debaixo de' },
  ],
},

u10: {
  pt: 'Mais verbos regulares', en: 'More -er and -ir verbs',
  goals: ['Use many more regular -er and -ir verbs', 'Spot the spelling changes that keep a verb\'s sound', 'Recognise -ir verbs that change their vowel in the eu form'],
  text: `
## -er and -ir: almost twins
You met *comer* and *partir* in chapter 3. Every regular -er and -ir verb follows the same pattern, and the two groups differ only in **nós** and **vós**:
@conj viver,abrir pres
> Vivo em Lisboa há dois anos. = I've been living in Lisbon for two years.
> Abrimos a loja às nove. = We open the shop at nine.

## Useful verbs
|! -er | | -ir | |
| viver | to live | abrir | to open |
| aprender | to learn | partir | to leave; to break |
| escrever | to write | decidir | to decide |
| vender | to sell | dividir | to share, divide |
| responder | to answer | assistir a | to watch, attend |
| perceber | to understand | discutir | to discuss; to argue |
| correr | to run | | |
!tip **Assistir a** means *to watch* or *to attend*, not *to assist*: *assistir a um jogo* = to watch a match. *To help* is **ajudar**.
!tip **Viver** and **morar** both mean *to live*: *morar* is where you live (your address); *viver* is wider: *viver bem* (to live well), *viver em Portugal*.

## Spelling changes: keeping the sound
Some regular verbs change one letter so the sound stays the same before **-o** or **-a**. They aren't irregular — it's just spelling:
|! Verb | Why | eu form |
| conhecer (to know a person or place) | c would sound like k before o | **conheço** |
| parecer (to seem) | the same | **pareço** |
| proteger (to protect) | g would sound hard before o | **protejo** |
| dirigir (to direct; to drive) | the same | **dirijo** |
| distinguir (to tell apart) | gu → g before o | **distingo** |

## Vowel changes in the eu form
A group of common -ir verbs with **e** or **o** in the stem change that vowel in the **eu** form only:
@conj vestir,dormir pres
|! Verb | eu | tu | ele |
| sentir (to feel) | **sinto** | sentes | sente |
| servir (to serve) | **sirvo** | serves | serve |
| preferir (to prefer) | **prefiro** | preferes | prefere |
| seguir (to follow) | **sigo** | segues | segue |
| tossir (to cough) | **tusso** | tosses | tosse |
**Subir** (to go up) and **fugir** (to run away) do the opposite: **u** becomes **o** in tu, ele and eles: *subo, sobes, sobe, subimos, sobem*.
!tip In the Verbos section these verbs are marked *stem change*, and the changed forms are highlighted.

## Ler and perder
Two very common -er verbs are slightly irregular:
@conj ler,perder pres`,
  write: [
    { task: 'Write about what you read, write and learn in a normal week.', model: 'Leio o jornal todos os dias e escrevo muitas mensagens. Aprendo português à noite e às vezes assisto a um jogo de futebol.', hint: 'leio, escrevo, aprendo, assisto a' },
    { task: 'Ask a friend three questions with -er and -ir verbs and write their answers.', model: '— Onde vives? — Vivo no Porto.\n— Percebes espanhol? — Percebo um pouco.\n— Preferes chá ou café? — Prefiro café.', hint: 'vives, percebes, preferes' },
  ],
},

u11: {
  pt: 'Os irregulares', en: 'The everyday irregular verbs',
  goals: ['Conjugate the most common irregular verbs in the present', 'Say where you are going with ir a and ir para', 'Tell poder, saber and conhecer apart', 'Ask for things with pedir and questions with perguntar'],
  text: `
## Why learn them now
The most frequent verbs are also the most irregular: because people use them all the time, they've kept old forms. The good news is that the endings still follow the pattern from chapter 3 (tu ends in -s, nós in -mos, eles in -m) and **nós is almost always regular**: *vamos, fazemos, dizemos, podemos*.

## Ir and vir: to go and to come
@conj ir,vir pres
> Vou ao trabalho de carro. = I go to work by car.
> Vens à festa? = Are you coming to the party?
- **ir a** + place: going somewhere for a short time: *Vou a Lisboa amanhã.*
- **ir para** + place: going somewhere to stay, or heading home: *Vou para casa. Vou para Londres em setembro.*

## Fazer, dizer, trazer
@conj fazer,dizer,trazer pres
- Their eu forms end in **-ço** or **-go**: *faço, digo, trago*.
> O que fazes? = What do you do? / What are you doing?
> Digo sempre a verdade. = I always tell the truth.

## Ver, dar, pôr, sair
@conj ver,dar,pôr,sair pres
!tip **Pôr** (to put) is the only verb ending in *-or*. Its family — *compor, propor, supor* — conjugates the same way.

## Poder, querer, saber
@conj poder,querer,saber pres
- **Poder** = can, may — ability right now, possibility, permission: *Posso entrar?* (May I come in?)
- **Saber** = to know a fact, and *can* in the sense of *know how to*: *Sei nadar.* (I can swim.)
- **Conhecer** = to know a person or a place: *Conheço o Porto. Conheces a Ana?*
!warn English uses *can* for both, Portuguese doesn't: **Sei nadar** = I know how to swim · **Posso nadar** = I'm allowed to / I'm able to swim (now).

## Ouvir and pedir
@conj ouvir,pedir pres
- **Pedir** = to ask *for* something: *Peço a conta.* (I ask for the bill.)
- **Perguntar** = to ask a question: *Pergunto onde fica a estação.*

## The ones you already know
**Ser, estar, ter** (chapters 2, 8 and 6) and **haver**, which you mostly meet as **há** (there is).`,
  write: [
    { task: 'Describe your typical weekend with at least four irregular verbs (ir, fazer, ver, sair, vir…).', model: 'Ao sábado vou ao mercado e faço o almoço. À tarde vejo um filme ou saio com os amigos. Ao domingo os meus pais vêm almoçar e não faço nada!', hint: 'vou, faço, vejo, saio, vêm' },
    { task: 'Write what you know how to do (saber) and what you can\'t do today (poder), and why.', model: 'Sei nadar e sei cozinhar, mas não sei dançar. Hoje não posso sair, porque tenho muito trabalho.', hint: 'sei, não sei, posso, não posso' },
  ],
},

u12: {
  pt: 'Horas e dias', en: 'Time, days and dates',
  goals: ['Ask and tell the time', 'Say at what time things happen', 'Use days, months and seasons', 'Give dates'],
  text: `
## What time is it?
> Que horas são? = What time is it?
> É uma hora. = It's one o'clock.
> São duas horas. = It's two o'clock.
> São três e um quarto. = It's quarter past three.
> São quatro e meia. = It's half past four.
> São cinco menos dez. = It's ten to five.
> É meio-dia. = It's midday.
- **É** for one o'clock, midday and midnight; **são** for all the other hours.
- Minutes past: **e** — *e cinco, e dez, e um quarto, e meia*. Minutes to: **menos** — *menos cinco, menos um quarto*.
- You'll also hear **um quarto para as cinco** (a quarter to five) and **vinte para as seis** (twenty to six).
!pt Timetables, appointments and the news use the 24-hour clock: *O comboio parte às 18h30* — *às dezoito e trinta*.

## At what time?
Use **às** (a + as) with the hour: *às duas, às nove e meia* — but **à uma**, **ao meio-dia**, **à meia-noite**.
> A que horas abre o museu? = What time does the museum open?
> Abre às dez. = It opens at ten.

## Parts of the day
- **de manhã** (in the morning), **à tarde** (in the afternoon), **à noite** (in the evening, at night).
- With a time: **às oito da manhã, às três da tarde, às dez da noite**.

## The days of the week
| segunda-feira | Monday | sexta-feira | Friday |
| terça-feira | Tuesday | sábado | Saturday |
| quarta-feira | Wednesday | domingo | Sunday |
| quinta-feira | Thursday | | |
- The weekdays count from Sunday: *segunda* is the second day. In speech people usually drop **-feira**: *Até segunda!*
- **na segunda** = on Monday (this Monday) · **à segunda / às segundas** = on Mondays (every Monday) · **no sábado** · **ao sábado** = on Saturdays.
- **o fim de semana** = the weekend: *ao fim de semana* (at weekends).
- Days and months are written with a small letter.

## Months and seasons
janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro
- **em** + month: *em agosto*.
- Dates: **no dia 25 de abril** (on 25 April). What's the date? **Que dia é hoje? — É dia três.**
- The seasons: **a primavera, o verão, o outono, o inverno** → *na primavera, no verão*.

## Yesterday, today, tomorrow
| anteontem | the day before yesterday |
| ontem | yesterday |
| hoje | today |
| amanhã | tomorrow |
| depois de amanhã | the day after tomorrow |
!warn **Amanhã** is tomorrow, but **de manhã** is in the morning: *amanhã de manhã* = tomorrow morning.`,
  write: [
    { task: 'Write your timetable for a normal weekday: what you do and at what time.', model: 'Às segundas começo a trabalhar às nove. Almoço ao meio-dia e meia e saio do trabalho às seis da tarde. À noite janto às oito e meia.', hint: 'às, ao meio-dia, de manhã, à tarde' },
    { task: 'When is your birthday? Write about your favourite season and month, and why.', model: 'O meu aniversário é no dia doze de março. Gosto muito da primavera, mas o meu mês favorito é setembro, porque não está muito calor.', hint: 'no dia, de março, na primavera' },
  ],
},

u13: {
  pt: 'A rotina', en: 'Daily routine and reflexive verbs',
  goals: ['Use reflexive verbs like levantar-se and deitar-se', 'Put the pronoun in the right place: levanto-me but não me levanto', 'Describe your day in order', 'Say how often you do things'],
  text: `
## Reflexive verbs
Some verbs describe things you do to yourself. They come with a **reflexive pronoun** that matches the person: *levantar-se* (to get up — literally *to raise oneself*), *deitar-se* (to go to bed), *vestir-se* (to get dressed), *lavar-se* (to wash), *chamar-se* (to be called).
|! | pronoun | levantar-se |
| eu | me | levanto-me |
| tu | te | levantas-te |
| ele · ela · você | se | levanta-se |
| nós | nos | levantamo-nos |
| vós | vos | levantais-vos |
| eles · elas · vocês | se | levantam-se |
!warn In the nós form the final **-s** disappears before **-nos**: *levantamos + nos → levantamo-nos*.

## Where does the pronoun go?
This is one of the most typical features of European Portuguese. **In a plain statement, the pronoun goes after the verb, joined with a hyphen**:
> Levanto-me às sete. = I get up at seven.
> Ela deita-se tarde. = She goes to bed late.
Some words **pull the pronoun in front of the verb**:
- negatives — **não, nunca, nada, ninguém**: *Não me levanto cedo.*
- question words — **onde, quando, como, porque, o que, quem**: *A que horas te levantas?*
- some adverbs — **já, ainda, também, só, sempre, talvez**: *Também me deito tarde.*
- linking words — **que, quando, se, porque**: *Acho que se chama Rui.*
> Chamo-me Ana. = My name is Ana.
> Não me chamo Ana. = My name isn't Ana.
> Como te chamas? = What's your name?
!pt Brazilians put the pronoun before the verb almost everywhere (*Me levanto às sete*). In Portugal that sounds wrong at the start of a sentence. When in doubt, in a simple statement: **verb + hyphen + pronoun**.

## Your daily routine
| acordar | to wake up (not reflexive) |
| levantar-se | to get up |
| tomar duche | to have a shower |
| lavar os dentes | to brush your teeth |
| vestir-se | to get dressed |
| tomar o pequeno-almoço | to have breakfast |
| despachar-se | to hurry, to get ready |
| almoçar · jantar | to have lunch · dinner |
| deitar-se | to go to bed |
!pt **Tomar duche** and **despachar-se** are very Portuguese. You'll hear parents every morning: *Despacha-te!* — Hurry up!

## In order
**primeiro** (first), **depois** (then), **a seguir** (next), **finalmente** (finally)
> Primeiro tomo duche, depois visto-me e a seguir tomo o pequeno-almoço. = First I shower, then I get dressed and next I have breakfast.

## How often?
| sempre | always |
| normalmente | usually |
| muitas vezes | often |
| às vezes | sometimes |
| raramente | rarely |
| nunca | never |
> Nunca me deito antes da meia-noite. = I never go to bed before midnight.`,
  write: [
    { task: 'Describe your typical morning, from waking up to leaving home, in order.', model: 'Acordo às sete, mas levanto-me às sete e um quarto. Primeiro tomo duche, depois visto-me e tomo o pequeno-almoço. A seguir lavo os dentes e saio de casa às oito.', hint: 'levanto-me, visto-me, primeiro, depois' },
    { task: 'Write three things you never or rarely do — with the pronoun before the verb.', model: 'Nunca me deito antes da meia-noite. Ao domingo não me levanto cedo. Raramente me despacho de manhã!', hint: 'nunca me, não me, raramente me' },
  ],
},

});
