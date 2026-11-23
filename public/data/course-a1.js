/* Azulejo · course, sections 1–2 (A1). European Portuguese.
   Unit fields: id, s (section), pt, en, tense (focus tense for its verbs), gen (sentence templates), guide (mini-markdown),
   lessons: [title | comma-separated items], items are vocab ids or v:verb.
   sents: "lesson: Portuguese / alternative | English / alternative". {word} marks the verb to blank in fill-in exercises. */
window.AZ_COURSE = window.AZ_COURSE || { sections: [], units: [] };
window.AZ_COURSE.sections.push(
  { id: 1, pt: 'Primeiros passos', en: 'First steps', level: 'A1' },
  { id: 2, pt: 'O dia a dia', en: 'Everyday life', level: 'A1+' },
);
window.AZ_COURSE.units.push(
{ id: 'u1', s: 1, pt: 'Olá!', en: 'Hello and goodbye', tense: 'pres', gen: [],
  guide: `
## Saying hello
- **Olá** works at any time of day.
- **Bom dia** until lunchtime, **boa tarde** until it gets dark, **boa noite** in the evening — for hello *and* goodbye.
> Bom dia! Tudo bem? = Good morning! How's it going?
> Boa noite, até amanhã! = Good night, see you tomorrow!
## Thank you agrees with you
- A man says **obrigado**, a woman says **obrigada**. It literally means *obliged*.
> Obrigada! — De nada. = Thank you! — You're welcome.
## Polite words
- **Desculpe** (polite) or **desculpa** (to friends): sorry, excuse me.
- **Com licença**: excuse me, may I get past?
- **Se faz favor**: please — and the classic way to call a waiter in Portugal.
!tip **Até já** means *see you in a moment*. You'll hear it every time someone pops out for a minute.`,
  lessons: [
    'Olá e adeus|olá, bom dia, boa tarde, boa noite, adeus, tchau, até logo, até amanhã, até já',
    'Por favor|obrigado, obrigada, de nada, por favor, se faz favor, desculpe, desculpa, com licença, sim, não',
    'Como estás?|tudo bem?, tudo bem, como estás?, como está?, estou bem, mais ou menos, muito prazer, não percebo, pode repetir?',
  ],
  sents: `
1: Olá, bom dia! | Hello, good morning! / Hi, good morning!
1: Boa tarde! | Good afternoon!
1: Boa noite e até amanhã! | Good night and see you tomorrow! / Good evening and see you tomorrow!
1: Tchau, até logo! | Bye, see you later!
1: Adeus, até já! | Goodbye, see you in a moment! / Goodbye, see you soon! / Bye, see you in a bit!
1: Olá, boa noite! | Hello, good evening! / Hi, good evening!
2: Obrigado! De nada. | Thank you! You're welcome. / Thanks! You're welcome.
2: Sim, por favor. | Yes, please.
2: Não, obrigada. | No, thank you. / No, thanks.
2: Desculpe! | Sorry! / Excuse me!
2: Com licença! | Excuse me!
2: Sim, obrigado. | Yes, thank you. / Yes, thanks.
3: Olá! Tudo bem? | Hi! How's it going? / Hello! How are you? / Hello! How's it going? / Hi! How are you?
3: Bom dia! Como está? | Good morning! How are you?
3: Estou bem, obrigado. | I'm fine, thank you. / I'm fine, thanks. / I am well, thank you. / I'm well, thanks.
3: Mais ou menos. | So-so. / More or less.
3: Muito prazer! | Nice to meet you! / Pleased to meet you!
3: Desculpe, não percebo. | Sorry, I don't understand. / Excuse me, I don't understand.
3: Pode repetir, por favor? | Can you repeat that, please? / Could you repeat that, please? / Can you repeat, please?
3: Como estás? Tudo bem? | How are you? Everything OK? / How are you? All good?
` },

{ id: 'u2', s: 1, pt: 'Quem és tu?', en: 'Who are you?', tense: 'pres', gen: ['ser_nat', 'ser_prof'],
  guide: `
## I, you, he, she
| eu | I |
| tu | you (friends, family, people your age) |
| ele · ela | he · she |
| você · o senhor · a senhora | you (polite) |
| nós | we |
| vocês | you (more than one) |
| eles · elas | they |
!tip In Portugal **tu** is everyday Portuguese. To be polite, people say **o senhor / a senhora**, or just use the verb: *Fala inglês?* **Você** exists but can sound blunt.
## Ser: to be (who or what you are)
| eu sou | nós somos |
| tu és | vós sois |
| ele / ela é | eles / elas são |
- The pronoun is often dropped, because the verb already says who: **Sou português.**
> Sou de Lisboa. = I'm from Lisbon.
> És estudante? = Are you a student?
- No article before jobs: **Ela é médica** (She is a doctor).
## Nationalities agree
- português → portuguesa · inglês → inglesa · italiano → italiana · alemão → alemã
> Ele é inglês e ela é portuguesa. = He is English and she is Portuguese.
## My name is…
- **Chamo-me Ana.** In plain statements the little word *me* goes after the verb. After a question word it moves in front: **Como te chamas?**`,
  lessons: [
    'Eu, tu, ele|eu, tu, ele, ela, nós, vós, vocês, eles, elas, a gente, v:ser',
    'De onde és?|português, inglês, espanhol, francês, italiano, alemão, brasileiro, o senhor, a senhora, você, Lisboa, Portugal',
    'Como te chamas?|v:chamar, nome, homem, mulher, rapaz, rapariga, amigo, estudante, professor, médico',
  ],
  sents: `
1: Eu {sou} o Pedro. / Sou o Pedro. | I'm Pedro. / I am Pedro.
1: Ela {é} a Maria. | She's Maria. / She is Maria.
1: Nós {somos} amigos. / Somos amigos. | We're friends. / We are friends.
1: Tu {és} o João? / És o João? | Are you João?
1: Ele é o Rui e ela é a Inês. | He's Rui and she's Inês. / He is Rui and she is Inês.
1: Eles {são} amigos. | They're friends. / They are friends.
2: Sou de Lisboa. / Eu sou de Lisboa. | I'm from Lisbon. / I am from Lisbon.
2: De onde és? | Where are you from?
2: Ela {é} portuguesa. | She's Portuguese. / She is Portuguese.
2: Não sou francesa, sou italiana. | I'm not French, I'm Italian. / I am not French, I am Italian.
2: O senhor é inglês? | Are you English?
2: A senhora é de Portugal? | Are you from Portugal?
2: Nós {somos} alemães. / Somos alemães. | We're German. / We are German.
2: Vocês {são} espanhóis? | Are you Spanish?
3: Chamo-me Ana. / Eu chamo-me Ana. | My name is Ana. / I'm called Ana. / I am called Ana.
3: Como te chamas? | What's your name? / What is your name?
3: Como se chama? | What's your name? / What is your name? / What's his name? / What's her name?
3: O meu nome é Tiago. | My name is Tiago.
3: Ela {é} estudante. | She's a student. / She is a student.
3: O João {é} médico. | João is a doctor.
3: Ele é professor e ela é médica. | He's a teacher and she's a doctor. / He is a teacher and she is a doctor.
3: A rapariga é minha amiga. | The girl is my friend.
` },

{ id: 'u3', s: 1, pt: 'O e a', en: 'Things and genders', tense: 'pres', gen: ['np', 'isto', 'ha'],
  guide: `
## Every noun has a gender
| | masculine | feminine |
| the | o livro | a casa |
| a / an | um livro | uma casa |
| the (plural) | os livros | as casas |
| some | uns livros | umas casas |
- Words in **-o** are usually masculine, words in **-a** usually feminine.
- Watch out: **o dia, o mapa, o sofá** · **a mão, a flor, a chave**.
- **-ção, -dade, -gem** are feminine: a estação, a cidade, a viagem.
!tip Learn every noun with its article: say **o leite**, **a chave** — never just *leite*.
## Plurals
- After a vowel add **-s**: casa → casas, café → cafés
- **-r, -z, -s** add **-es**: flor → flores, luz → luzes, mês → meses
- **-m** becomes **-ns**: homem → homens
- **-l** becomes **-is**: hotel → hotéis, animal → animais
- **-ão** has three plurals, so learn each: estação → estações, pão → pães, mão → mãos
## There is, there are
> Há um gato. = There's a cat.
> Há dois cães. = There are two dogs.`,
  lessons: [
    'Coisas|livro, casa, mesa, cadeira, porta, janela, chave, carro, telemóvel, caneta, isto',
    'Pessoas e animais|gato, cão, pessoa, criança, dia, mapa, mão, flor, cidade, hotel',
    'Muitos!|pão, estação, animal, mês, luz, há, um, dois, três',
  ],
  sents: `
1: Isto é um livro. | This is a book.
1: Isto é uma chave? | Is this a key?
1: Não, isto é uma caneta. | No, this is a pen.
1: A porta e a janela. | The door and the window.
1: O carro e a casa. | The car and the house.
1: Uma mesa e uma cadeira. | A table and a chair.
2: O gato e o cão. | The cat and the dog.
2: Isto é um mapa. | This is a map.
2: A criança e o gato. | The child and the cat.
2: Uma pessoa e uma flor. | A person and a flower.
2: Isto é um hotel? | Is this a hotel?
3: Há três pães. | There are three loaves of bread. / There are three bread rolls. / There are three rolls.
3: Os cães e os gatos. | The dogs and the cats.
3: Há dois hotéis. | There are two hotels.
3: Os animais e as pessoas. | The animals and the people.
3: Um mês, dois meses. | One month, two months.
3: Há uma estação e dois hotéis. | There's a station and two hotels. / There is a station and two hotels.
` },

{ id: 'u4', s: 1, pt: 'Verbos em -ar', en: 'Speaking and doing', tense: 'pres', gen: ['sv_lang', 'morar', 'sv_adv', 'svo'],
  guide: `
## Regular -ar verbs
| eu falo | nós falamos |
| tu falas | vós falais |
| ele / ela fala | eles / elas falam |
- The same endings work for **morar, trabalhar, estudar, cantar, dançar, comprar**…
> Falo português. = I speak Portuguese.
> Eles moram em Lisboa. = They live in Lisbon.
## Saying no
- Put **não** before the verb: **Não falo alemão.**
## Asking
- Just raise your voice at the end: **Falas inglês?** Portuguese people often answer with the verb itself: *— Falas inglês? — Falo!*
## Languages
- No article and a small letter: **falo inglês, estudo português**.`,
  lessons: [
    'Falo português|v:falar, v:estudar, v:trabalhar, v:morar, português, inglês, Lisboa, Porto',
    'Não danço|v:cantar, v:dançar, v:nadar, v:cozinhar, v:viajar, muito, bem, mal',
    'Compro pão|v:comprar, v:tomar, v:precisar, v:chegar, v:ajudar, hoje, pão, café',
  ],
  sents: `
1: {Falo} português. / Eu falo português. | I speak Portuguese.
1: Tu {falas} inglês? / Falas inglês? | Do you speak English?
1: Eu {moro} em Lisboa. / Moro em Lisboa. | I live in Lisbon.
1: Nós {trabalhamos} no Porto. / Trabalhamos no Porto. | We work in Porto.
1: Ela {estuda} inglês. | She studies English. / She is studying English. / She's studying English.
1: Eles não {moram} no Porto. | They don't live in Porto. / They do not live in Porto.
2: Tu {cantas} muito bem! / Cantas muito bem! | You sing very well!
2: Eu não {danço}. / Não danço. | I don't dance. / I do not dance.
2: Ele {cozinha} muito bem. | He cooks very well.
2: Nós {viajamos} muito. / Viajamos muito. | We travel a lot.
2: A Ana {nada} mal. | Ana swims badly. / Ana doesn't swim well.
2: Vocês {dançam} bem? | Do you dance well?
3: {Compro} pão. / Eu compro pão. | I buy bread. / I'm buying bread.
3: {Tomamos} um café? | Shall we have a coffee? / Shall we get a coffee?
3: {Preciso} de ajuda. / Eu preciso de ajuda. | I need help.
3: O João {chega} hoje. | João arrives today. / João is arriving today. / João is coming today.
3: Tu {ajudas} o Pedro? | Do you help Pedro? / Are you helping Pedro?
3: Ela {toma} café todos os dias. | She has coffee every day. / She drinks coffee every day.
` },

{ id: 'u5', s: 1, pt: 'Comer e beber', en: 'Food and drink', tense: 'pres', gen: ['svo', 'gostar', 'querer'],
  guide: `
## Regular -er verbs
| eu como | nós comemos |
| tu comes | vós comeis |
| ele / ela come | eles / elas comem |
- **beber, aprender, vender, escrever** work the same way.
## Gostar de: to like
- It is always **gostar de**. Before *o, a, os, as* the words merge: de + o = **do**, de + a = **da**, de + os = **dos**, de + as = **das**.
> Gosto de café. = I like coffee.
> Gostas do bolo? = Do you like the cake?
- Talking in general? No article: **Gosto de peixe** (I like fish).
## Ordering in a café
> Queria uma bica, se faz favor. = I'd like an espresso, please.
> Para mim, um pastel de nata. = A custard tart for me.
> A conta, se faz favor. = The bill, please.
!tip **Queria** (literally *I wanted*) is the polite way to order. A **bica** is an espresso in Lisbon; a **galão** is milky coffee in a glass.`,
  lessons: [
    'Pão e queijo|v:comer, v:beber, pão, queijo, ovo, fruta, maçã, laranja, água, leite, sumo, chá',
    'Gosto de…|v:gostar, peixe, carne, frango, sopa, salada, arroz, bolo, vinho, cerveja',
    'No café|v:querer, café, bica, galão, pastel de nata, torrada, tosta mista, pequeno-almoço, conta, se faz favor',
  ],
  sents: `
1: Eu {como} pão com queijo. / Como pão com queijo. | I eat bread with cheese. / I'm eating bread with cheese.
1: Ela não {bebe} leite. | She doesn't drink milk. / She does not drink milk.
1: {Bebes} água? / Tu bebes água? | Do you drink water? / Are you drinking water?
1: Nós {comemos} fruta todos os dias. / Comemos fruta todos os dias. | We eat fruit every day.
1: Eles {bebem} sumo de laranja. | They drink orange juice. / They're drinking orange juice.
1: {Como} uma maçã. / Eu como uma maçã. | I eat an apple. / I'm eating an apple.
2: {Gosto} muito de peixe. / Eu gosto muito de peixe. | I really like fish. / I like fish a lot. / I love fish.
2: {Gostas} de carne? / Tu gostas de carne? | Do you like meat?
2: Ela {gosta} do bolo. | She likes the cake.
2: Não {gostamos} de cerveja. / Nós não gostamos de cerveja. | We don't like beer. / We do not like beer.
2: Ele {come} arroz com frango. | He eats rice with chicken. / He's eating rice with chicken.
2: Gosto da sopa da avó. | I like grandma's soup. / I like grandmother's soup.
3: Queria um café, se faz favor. | I'd like a coffee, please. / I would like a coffee, please.
3: Uma bica e um pastel de nata, se faz favor. | An espresso and a custard tart, please. / A coffee and a custard tart, please.
3: Para mim, um galão e uma torrada. | A milky coffee and a toast for me. / For me, a galão and a toast. / For me, a milky coffee and toast.
3: A conta, se faz favor. | The bill, please. / The check, please.
3: O que é que {queres} comer? | What do you want to eat? / What would you like to eat?
3: {Queres} uma tosta mista? / Tu queres uma tosta mista? | Do you want a toasted ham and cheese sandwich? / Would you like a ham and cheese toastie? / Do you want a toasted cheese and ham sandwich?
` },

{ id: 'u6', s: 1, pt: 'Números', en: 'Numbers, age and prices', tense: 'pres', gen: ['ter_num', 'idade', 'custar'],
  guide: `
## 0 to 20
- zero, um / uma, dois / duas, três, quatro, cinco, seis, sete, oito, nove, dez, onze, doze, treze, catorze, quinze, dezasseis, dezassete, dezoito, dezanove, vinte
!tip European spellings: **dezasseis, dezassete, dezanove** and **catorze**. Brazil writes *dezesseis, dezessete, dezenove*.
## Tens and hundreds
- vinte e um, trinta, quarenta, cinquenta, sessenta, setenta, oitenta, noventa.
- **cem** is exactly 100. After that it is **cento**: cento e um, cento e vinte.
- One and two agree with the noun: **uma casa, duas casas** — and so do hundreds: **duzentas pessoas**.
## Ter: to have
| eu tenho | nós temos |
| tu tens | vós tendes |
| ele / ela tem | eles / elas têm |
- Age uses **ter**: **Tenho vinte anos** (I'm twenty).
> Quantos anos tens? = How old are you?
## Prices
> Quanto custa? = How much is it?
> Custa três euros e cinquenta. = It's three euros fifty.`,
  lessons: [
    'Um, dois, três|zero, um, dois, três, quatro, cinco, seis, sete, oito, nove, dez, v:ter',
    'Quantos anos?|onze, doze, treze, catorze, quinze, dezasseis, dezassete, dezoito, dezanove, vinte, ano, idade, quanto',
    'Quanto custa?|trinta, quarenta, cinquenta, cem, mil, v:custar, euro, cêntimo, preço, dinheiro',
  ],
  sents: `
1: {Tenho} dois gatos. / Eu tenho dois gatos. | I have two cats. / I've got two cats.
1: Ela {tem} três cães. | She has three dogs. / She's got three dogs.
1: {Temos} uma casa e dois carros. / Nós temos uma casa e dois carros. | We have a house and two cars.
1: {Tens} um cão? / Tu tens um cão? | Do you have a dog? / Have you got a dog?
1: Eles não {têm} carro. | They don't have a car. / They haven't got a car.
1: Há cinco pessoas. | There are five people.
2: Quantos anos tens? | How old are you?
2: {Tenho} dezanove anos. / Eu tenho dezanove anos. | I'm nineteen. / I am nineteen years old. / I'm nineteen years old.
2: Ele {tem} dezasseis anos. | He's sixteen. / He is sixteen years old. / He's sixteen years old.
2: A Maria {tem} vinte anos. | Maria is twenty. / Maria is twenty years old.
2: Quantos anos tem o senhor? | How old are you?
2: Há doze meses num ano. | There are twelve months in a year.
3: Quanto custa? | How much is it? / How much does it cost?
3: {Custa} cinco euros. | It costs five euros. / It's five euros.
3: São dez euros, se faz favor. | That's ten euros, please. / It's ten euros, please.
3: O livro {custa} trinta euros. | The book costs thirty euros.
3: Não {tenho} dinheiro. / Eu não tenho dinheiro. | I don't have any money. / I have no money. / I don't have money.
3: O café custa setenta cêntimos. | The coffee costs seventy cents.
` },

{ id: 'u7', s: 2, pt: 'A família', en: 'Family', tense: 'pres', gen: ['poss_np', 'poss_ser', 'ter_num'],
  guide: `
## My, your, our
| | m. | f. | m. plural | f. plural |
| my | o meu | a minha | os meus | as minhas |
| your (tu) | o teu | a tua | os teus | as tuas |
| our | o nosso | a nossa | os nossos | as nossas |
- They agree with the thing owned, not with the owner: **a minha casa, o meu carro**.
!tip In Portugal the article is part of the possessive: **o meu pai, a minha irmã**. Brazilians often drop it.
## His, her, their
- Put **dele / dela / deles / delas** after the noun: **o carro dele** (his car), **a casa dela** (her house).
- **o seu / a sua** usually means *your* (polite).
## Family words
> Tenho dois irmãos. = I have two brothers. (or: two siblings)
- **irmãos, filhos, pais, avós**: the masculine plural also covers mixed groups.
> Os meus pais chamam-se Rui e Ana. = My parents are called Rui and Ana.`,
  lessons: [
    'A minha família|família, pai, mãe, pais, irmão, filho, marido, mulher, meu, teu',
    'Avós e tios|avô, avó, avós, tio, primo, neto, namorado, nosso, dele, dela',
    'Casado ou solteiro?|casado, solteiro, nome, idade, aniversário, amigo, v:chamar, Coimbra',
  ],
  sents: `
1: Esta é a minha mãe. | This is my mother. / This is my mum.
1: O meu pai é médico. | My father is a doctor. / My dad is a doctor.
1: {Tens} irmãos? / Tu tens irmãos? | Do you have any brothers or sisters? / Do you have siblings? / Have you got any brothers or sisters? / Do you have brothers?
1: {Tenho} uma irmã e dois irmãos. | I have a sister and two brothers. / I've got one sister and two brothers. / I have one sister and two brothers.
1: O marido dela é inglês. | Her husband is English.
1: A tua mãe é portuguesa? | Is your mother Portuguese? / Is your mum Portuguese?
2: Os meus avós {moram} no Porto. | My grandparents live in Porto.
2: A minha avó {tem} noventa anos. | My grandmother is ninety. / My grandmother is ninety years old. / My grandma is ninety.
2: O teu tio {trabalha} em Faro? | Does your uncle work in Faro?
2: A prima do João chama-se Sofia. | João's cousin is called Sofia. / João's cousin's name is Sofia.
2: O nosso neto {tem} cinco anos. | Our grandson is five. / Our grandson is five years old.
2: A namorada dele é espanhola. | His girlfriend is Spanish.
3: Ela {é} casada. | She's married. / She is married.
3: {Sou} solteiro. / Eu sou solteiro. | I'm single. / I am single.
3: Como se chama o teu pai? | What's your father's name? / What is your father's name? / What's your dad called?
3: O meu irmão chama-se Rui. | My brother's name is Rui. / My brother is called Rui.
3: Hoje é o aniversário da minha mãe. | Today is my mother's birthday. / It's my mum's birthday today.
3: A minha família é de Coimbra. | My family is from Coimbra.
` },

{ id: 'u8', s: 2, pt: 'Descrever', en: 'Describing things', tense: 'pres', gen: ['ser_adj', 'estar_adj', 'np_adj'],
  guide: `
## Adjectives agree
| | m. | f. |
| singular | um carro novo | uma casa nova |
| plural | uns carros novos | umas casas novas |
- Most adjectives go after the noun: **um livro interessante**.
- Words ending in **-e, -l, -z** and most consonants are the same for both genders: **grande, azul, feliz, fácil** → grandes, azuis, felizes, fáceis.
- Irregular: **bom → boa**, **mau → má**.
## Ser or estar?
- **ser** for what something *is* — identity, character, lasting qualities: **A casa é grande. Ela é simpática.**
- **estar** for how something *is right now* — moods, states, temperature: **Estou cansado. A sopa está quente.**
| eu estou | nós estamos |
| tu estás | vós estais |
| ele / ela está | eles / elas estão |
> O café é bom. = The coffee is good. (in general)
> O café está frio. = The coffee is cold. (right now)
## Very and so
- **muito** (very), **tão** (so), **bastante** (quite): **muito bonito, tão caro**.`,
  lessons: [
    'Grande e pequeno|grande, pequeno, novo, velho, bonito, feio, caro, barato, bom, mau',
    'Ser ou estar?|v:estar, cansado, contente, triste, zangado, doente, ocupado, quente, frio',
    'Como é ela?|alto, baixo, simpático, engraçado, inteligente, tímido, fácil, difícil, tão',
  ],
  sents: `
1: A casa é grande e bonita. | The house is big and beautiful. / The house is large and pretty.
1: O carro é novo. | The car is new.
1: Os livros são caros. | The books are expensive.
1: Temos um gato pequeno. | We have a small cat. / We have a little cat.
1: O bolo é muito bom. | The cake is very good.
1: Lisboa é uma cidade bonita. | Lisbon is a beautiful city.
2: {Estou} muito cansada. / Eu estou muito cansada. | I'm very tired. / I am very tired.
2: O café {está} frio. | The coffee is cold.
2: A sopa {está} quente! | The soup is hot!
2: {Estás} triste? / Tu estás triste? | Are you sad?
2: Hoje {estou} ocupado. / Estou ocupado hoje. | Today I'm busy. / I'm busy today.
2: A Inês {está} doente. | Inês is ill. / Inês is sick.
2: As crianças {estão} contentes. | The children are happy.
3: Ela é alta e simpática. | She's tall and nice. / She is tall and friendly.
3: O português não é difícil. | Portuguese isn't difficult. / Portuguese is not difficult.
3: O meu irmão é muito engraçado. | My brother is very funny.
3: És tão inteligente! | You're so clever! / You are so intelligent!
3: As raparigas são tímidas. | The girls are shy.
3: Isto é fácil. | This is easy.
` },

{ id: 'u9', s: 2, pt: 'Na cidade', en: 'Around town', tense: 'pres', gen: ['estar_loc', 'ficar_loc', 'ha_loc', 'onde'],
  guide: `
## Where is it?
- **estar em** for where people and things are now. **ficar** for where buildings and places are (they don't move).
> O Pedro está em casa. = Pedro is at home.
> Onde fica a estação? = Where is the station?
## em + article
| em + o = **no** | em + a = **na** |
| em + os = **nos** | em + as = **nas** |
| em + um = **num** | em + uma = **numa** |
> Estou no café. = I'm at the café.
> Moro numa casa pequena. = I live in a small house.
## de + article
- With **perto de, longe de, ao lado de, em frente de**: **perto do rio, ao lado da igreja**.
## Há: there is, there are
> Há uma farmácia aqui perto? = Is there a pharmacy near here?
!tip A chemist's is **a farmácia** and a cash machine is **o multibanco** — that's what you'll see on the signs.`,
  lessons: [
    'Onde estás?|rua, praça, casa, escola, praia, parque, supermercado, restaurante, aqui',
    'Onde fica?|v:ficar, estação, banco, farmácia, hospital, museu, igreja, hotel, perto de, longe de, ao lado de',
    'Em casa|cozinha, sala, quarto, casa de banho, jardim, em cima de, debaixo de, ali, há',
  ],
  sents: `
1: {Estou} em casa. / Eu estou em casa. | I'm at home. / I am at home.
1: As crianças {estão} na praia. | The children are at the beach. / The children are on the beach.
1: Onde {estás}? | Where are you?
1: {Estamos} no restaurante. / Nós estamos no restaurante. | We're at the restaurant. / We are in the restaurant.
1: A Ana {está} na escola. | Ana is at school.
1: O supermercado é aqui. | The supermarket is here.
2: Onde {fica} a estação, se faz favor? | Where is the station, please? / Where's the station, please?
2: {Fica} perto do hotel. | It's near the hotel. / It is near the hotel.
2: O banco {fica} ao lado da farmácia. | The bank is next to the pharmacy. / The bank is next to the chemist's.
2: O hospital {fica} longe daqui. | The hospital is far from here.
2: O museu {fica} na praça. | The museum is in the square.
2: A igreja {fica} perto do museu. | The church is near the museum.
3: Há uma farmácia aqui perto? | Is there a pharmacy near here? / Is there a chemist nearby? / Is there a pharmacy nearby?
3: O gato {está} debaixo da mesa. | The cat is under the table.
3: As chaves {estão} em cima da mesa. | The keys are on the table.
3: A minha mãe {está} na cozinha. | My mother is in the kitchen. / My mum is in the kitchen.
3: Há dois quartos e uma sala. | There are two bedrooms and a living room.
3: A casa de banho é ali. | The bathroom is over there. / The bathroom is there.
` },

{ id: 'u10', s: 2, pt: 'Verbos em -er e -ir', en: 'More regular verbs', tense: 'pres', gen: ['svo', 'sv_adv'],
  guide: `
## -er and -ir side by side
| | comer | partir |
| eu | como | parto |
| tu | comes | partes |
| ele / ela | come | parte |
| nós | comemos | partimos |
| vós | comeis | partis |
| eles / elas | comem | partem |
- Only **nós** and **vós** differ: comemos / partimos.
- Like partir: **abrir, decidir, dividir, assistir, discutir, permitir, existir**.
## Watch out
- **ler** is irregular: leio, lês, lê, lemos, ledes, leem.
- **perceber** means *to understand* in Portugal: **Não percebo.**
- **assistir a** means *to watch* (a show, a game): **Assisto ao jogo.**
- **há + time** with the present means *for*: **Vivo aqui há dois anos** (I've lived here for two years).`,
  lessons: [
    'Vivo aqui|v:viver, v:aprender, v:escrever, v:vender, v:responder, livro, carta, mensagem',
    'Abro a porta|v:abrir, v:partir, v:decidir, v:dividir, v:assistir, porta, janela, jogo',
    'Percebes?|v:perceber, v:ler, v:correr, v:discutir, jornal, revista, filme',
  ],
  sents: `
1: {Vivo} em Lisboa há dois anos. | I've been living in Lisbon for two years. / I have lived in Lisbon for two years. / I've lived in Lisbon for two years.
1: Ela {escreve} uma carta. | She writes a letter. / She's writing a letter. / She is writing a letter.
1: {Aprendemos} português. / Nós aprendemos português. | We learn Portuguese. / We're learning Portuguese. / We are learning Portuguese.
1: Eles {vendem} a casa. | They're selling the house. / They sell the house. / They are selling the house.
1: {Respondes} à mensagem? | Are you replying to the message? / Will you answer the message? / Do you answer the message?
1: O João {escreve} muitas mensagens. | João writes a lot of messages. / João writes many messages.
2: {Abro} a janela? / Eu abro a janela? | Shall I open the window? / Should I open the window?
2: A loja {abre} hoje. | The shop opens today. / The shop is open today.
2: {Partimos} amanhã. / Nós partimos amanhã. | We leave tomorrow. / We're leaving tomorrow.
2: {Decides} tu. | You decide.
2: {Dividimos} a conta? | Shall we split the bill? / Should we split the bill?
2: Eles {assistem} ao jogo. | They watch the game. / They're watching the match. / They are watching the game.
3: {Percebes}? / Tu percebes? | Do you understand? / Get it?
3: Não {percebo} nada. | I don't understand anything. / I understand nothing.
3: {Leio} o jornal todos os dias. | I read the newspaper every day. / I read the paper every day.
3: Ela {lê} muitos livros. | She reads a lot of books. / She reads many books.
3: {Corremos} no parque. / Nós corremos no parque. | We run in the park.
3: Eles {discutem} muito. | They argue a lot.
` },

{ id: 'u11', s: 2, pt: 'Irregulares', en: 'Everyday irregular verbs', tense: 'pres', gen: ['ir_a', 'svo'],
  guide: `
## The big irregulars
| | ir | fazer | ver | vir |
| eu | vou | faço | vejo | venho |
| tu | vais | fazes | vês | vens |
| ele / ela | vai | faz | vê | vem |
| nós | vamos | fazemos | vemos | vimos |
| eles / elas | vão | fazem | veem | vêm |
## More you will hear every day
- **dar**: dou, dás, dá, damos, dão
- **dizer**: digo, dizes, diz, dizemos, dizem
- **sair**: saio, sais, sai, saímos, saem
- **pôr**: ponho, pões, põe, pomos, põem
- **poder**: posso, podes, pode · **querer**: quero, queres, quer · **saber**: sei, sabes, sabe
## ir a + place
- a + o = **ao**, a + a = **à**: **Vou ao cinema. Vamos à praia.**
## Poder or saber?
> Sei nadar. = I can swim. (I know how to)
> Posso sair? = Can I go out? (am I allowed / able)`,
  lessons: [
    'Vou e venho|v:ir, v:fazer, v:ver, v:vir, cinema, praia, televisão',
    'Dar e dizer|v:dar, v:dizer, v:sair, v:pôr, v:trazer, prenda, mesa',
    'Posso? Sei!|v:poder, v:querer, v:saber, v:ouvir, v:pedir, música, rádio',
  ],
  sents: `
1: {Vou} à praia. / Eu vou à praia. | I'm going to the beach. / I go to the beach.
1: {Vamos} ao cinema? | Shall we go to the cinema? / Shall we go to the movies?
1: O que é que {fazes}? / O que fazes? | What do you do? / What are you doing?
1: {Vejo} televisão à noite. / Eu vejo televisão à noite. | I watch TV at night. / I watch television in the evening.
1: {Vens} comigo? | Are you coming with me? / Will you come with me?
1: Eles {vêm} de Espanha. | They come from Spain. / They're coming from Spain.
1: Ela {faz} um bolo. | She makes a cake. / She's making a cake.
2: {Dou}-te uma prenda. | I'm giving you a present. / I give you a present.
2: Ele {diz} que sim. | He says yes.
2: {Saímos} agora. / Nós saímos agora. | We're leaving now. / We leave now.
2: {Ponho} a mesa. / Eu ponho a mesa. | I set the table. / I'm setting the table. / I'll set the table.
2: {Trazes} o vinho? | Will you bring the wine? / Are you bringing the wine?
2: O que {dizes}? | What do you say? / What are you saying?
3: {Sei} nadar. / Eu sei nadar. | I can swim. / I know how to swim.
3: {Posso} entrar? | Can I come in? / May I come in?
3: {Queres} ir à praia? | Do you want to go to the beach?
3: Não {sei}. | I don't know.
3: {Ouves} música? | Do you listen to music? / Are you listening to music?
3: {Peço} um café. / Eu peço um café. | I order a coffee. / I'm ordering a coffee. / I ask for a coffee.
3: {Podes} ajudar? | Can you help?
` },

{ id: 'u12', s: 2, pt: 'Horas e dias', en: 'Time and dates', tense: 'pres', gen: ['horas', 'horas', 'at_time'],
  guide: `
## What time is it?
> Que horas são? = What time is it?
> É uma hora. = It's one o'clock.
> São duas horas. = It's two o'clock.
> São três e um quarto. = It's quarter past three.
> São três e meia. = It's half past three.
> São quatro menos um quarto. = It's quarter to four.
> É meio-dia. = It's midday.
- *At* a time: **à uma, às duas, às três e meia** (a + as = às).
## Days of the week
- segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo. People shorten them: **à segunda, na sexta**.
- Every Monday: **à segunda-feira** or **às segundas**.
> No sábado vou à praia. = On Saturday I'm going to the beach.
## Months and seasons
- **em** janeiro, **em** agosto · **na** primavera, **no** verão, **no** outono, **no** inverno.
!tip Months and days take a small letter in European Portuguese: *em março, na segunda-feira*.`,
  lessons: [
    'Que horas são?|hora, minuto, meio-dia, meia-noite, cedo, tarde-adv, manhã, tarde, noite',
    'Os dias|dia, semana, fim de semana, segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo, hoje, amanhã, ontem',
    'Os meses|mês, ano, janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro, primavera, verão, outono, inverno',
  ],
  sents: `
1: Que horas são? | What time is it? / What's the time?
1: São dez horas. | It's ten o'clock. / It is ten o'clock.
1: É uma e meia. | It's half past one. / It's one thirty.
1: São sete e um quarto. | It's quarter past seven. / It's a quarter past seven. / It's seven fifteen.
1: São seis menos um quarto. | It's quarter to six. / It's a quarter to six. / It's five forty-five.
1: É meio-dia. | It's midday. / It's noon. / It's twelve o'clock.
1: {Chego} às nove da manhã. | I arrive at nine in the morning. / I get there at nine in the morning.
1: {Janto} às oito da noite. | I have dinner at eight in the evening. / I eat dinner at eight at night.
2: Hoje é segunda-feira. | Today is Monday. / It's Monday today.
2: No sábado {vamos} à praia. | On Saturday we're going to the beach. / On Saturday we go to the beach.
2: À sexta-feira {janto} fora. | On Fridays I eat out. / On Fridays I have dinner out.
2: Bom fim de semana! | Have a good weekend! / Have a nice weekend!
2: Amanhã é domingo. | Tomorrow is Sunday.
2: {Trabalho} de segunda a sexta. | I work from Monday to Friday. / I work Monday to Friday.
3: O meu aniversário é em maio. | My birthday is in May.
3: Em agosto está muito calor. | In August it's very hot. / It's very hot in August.
3: No inverno {chove} muito. | In winter it rains a lot. / It rains a lot in winter.
3: O ano {tem} doze meses. | The year has twelve months. / A year has twelve months.
3: Na primavera há muitas flores. | In spring there are lots of flowers. / In spring there are a lot of flowers.
` },

{ id: 'u13', s: 2, pt: 'A rotina', en: 'Daily routine', tense: 'pres', gen: ['reflex', 'at_time'],
  guide: `
## Reflexive verbs
- Some verbs carry a pronoun that points back at the subject: **levantar-se** (to get up), **deitar-se** (to go to bed), **vestir-se** (to get dressed), **sentar-se** (to sit down), **chamar-se** (to be called).
| eu levanto-me | nós levantamo-nos |
| tu levantas-te | vós levantais-vos |
| ele / ela levanta-se | eles / elas levantam-se |
- With **nós** the -s drops: levantamos + nos → **levantamo-nos**.
## Where does the pronoun go?
- In a plain statement it goes **after** the verb, with a hyphen: **Levanto-me às sete.**
- It jumps **in front** after **não**, question words and little words like **já, também, sempre, nunca, ainda, só**:
> Não me levanto cedo. = I don't get up early.
> A que horas te deitas? = What time do you go to bed?
> Também me visto depressa. = I also get dressed quickly.
!tip This is one of the clearest differences from Brazil (*eu me levanto*). In Portugal: **levanto-me**.
## Routine words
- tomar o pequeno-almoço, tomar duche, ir para o trabalho, almoçar, jantar, deitar-se.`,
  lessons: [
    'Levanto-me|v:levantar, v:deitar, v:acordar, cedo, tarde-adv, duche, pequeno-almoço',
    'Visto-me|v:vestir, v:lavar, v:sentar, v:despachar, roupa, dente, cara, depressa',
    'Um dia normal|v:almoçar, v:jantar, v:voltar, v:começar, v:acabar, trabalho, sempre, nunca, às vezes',
  ],
  sents: `
1: Levanto-me às sete. / Eu levanto-me às sete. | I get up at seven.
1: A que horas te levantas? | What time do you get up?
1: Não me levanto cedo ao domingo. | I don't get up early on Sundays. / I do not get up early on Sunday.
1: Ela deita-se às onze. | She goes to bed at eleven.
1: {Acordo} às seis e meia. / Eu acordo às seis e meia. | I wake up at half past six. / I wake up at six thirty.
1: {Tomo} duche de manhã. / Eu tomo duche de manhã. | I shower in the morning. / I have a shower in the morning. / I take a shower in the morning.
1: Levantamo-nos cedo. / Nós levantamo-nos cedo. | We get up early.
2: Visto-me depressa. / Eu visto-me depressa. | I get dressed quickly.
2: Ele {lava} os dentes. | He brushes his teeth. / He cleans his teeth.
2: Sentem-se, por favor. | Sit down, please. / Please sit down. / Please take a seat.
2: Despacha-te! | Hurry up!
2: Senta-te aqui. | Sit here. / Sit down here.
2: As crianças vestem-se sozinhas. | The children get dressed by themselves. / The children get dressed on their own.
3: {Almoço} sempre ao meio-dia. | I always have lunch at midday. / I always have lunch at noon.
3: O trabalho {começa} às nove. | Work starts at nine. / Work begins at nine.
3: {Volto} para casa às seis. | I go back home at six. / I come home at six. / I get home at six.
3: Nunca {janto} antes das oito. | I never have dinner before eight. / I never eat dinner before eight.
3: Às vezes {acabo} tarde. | Sometimes I finish late.
3: Ela nunca se deita cedo. | She never goes to bed early.
` },
);
