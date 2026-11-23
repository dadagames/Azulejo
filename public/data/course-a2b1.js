/* Azulejo · course, sections 3–4 (A2 → B1). European Portuguese. Same format as course-a1.js. */
window.AZ_COURSE = window.AZ_COURSE || { sections: [], units: [] };
window.AZ_COURSE.sections.push(
  { id: 3, pt: 'Histórias', en: 'Plans and stories', level: 'A2' },
  { id: 4, pt: 'Mais longe', en: 'Going further', level: 'B1' },
);
window.AZ_COURSE.units.push(
{ id: 'u14', s: 3, pt: 'Planos', en: 'Making plans', tense: 'pres', gen: ['ir_inf', 'ter_de', 'modal'],
  guide: `
## ir + infinitive: the everyday future
| vou comer | vamos comer |
| vais comer | ides comer |
| vai comer | vão comer |
> Amanhã vou visitar a minha avó. = Tomorrow I'm going to visit my grandmother.
## ter de + infinitive: must, have to
> Tenho de trabalhar. = I have to work.
!tip In Portugal people say **ter de**. *Ter que* is the Brazilian habit, though you'll hear both.
## Verbs followed by an infinitive
- **querer** (want to), **poder** (can), **precisar de** (need to), **gostar de** (like to), **saber** (know how to):
> Queres jantar comigo? = Do you want to have dinner with me?
> Gosto de cozinhar. = I like cooking.
## Time words for plans
- amanhã · logo (later today) · à noite (tonight) · no fim de semana · na próxima semana · para o ano (next year)`,
  lessons: [
    'Vou fazer|v:ir, amanhã, logo, próximo, fim de semana, v:visitar, v:jogar',
    'Tenho de ir|v:ter, v:precisar, v:estudar, v:limpar, v:arrumar, v:telefonar',
    'Queres vir?|v:querer, v:poder, v:gostar, v:saber, v:conhecer, v:convidar, festa',
  ],
  sents: `
1: Amanhã {vou} visitar a minha avó. | Tomorrow I'm going to visit my grandmother. / I'm going to visit my grandmother tomorrow. / Tomorrow I'm going to visit my grandma.
1: O que {vais} fazer no fim de semana? | What are you going to do at the weekend? / What are you doing at the weekend? / What are you going to do this weekend?
1: {Vamos} jogar futebol logo. | We're going to play football later. / We are going to play football later.
1: Eles {vão} viajar na próxima semana. | They're going to travel next week. / They are going to travel next week.
1: Ela {vai} comprar um carro novo. | She's going to buy a new car. / She is going to buy a new car.
1: Não {vou} sair hoje. | I'm not going to go out today. / I'm not going out today.
2: {Tenho} de trabalhar amanhã. | I have to work tomorrow. / I've got to work tomorrow.
2: {Temos} de limpar a casa. | We have to clean the house. / We've got to clean the house.
2: {Precisas} de estudar mais. | You need to study more.
2: {Tens} de arrumar o quarto! | You have to tidy your room! / You have to tidy the room! / You've got to tidy your room!
2: Ele {tem} de telefonar à mãe. | He has to call his mother. / He has to phone his mum. / He has to ring his mother.
3: {Queres} jantar comigo? | Do you want to have dinner with me? / Would you like to have dinner with me?
3: Não {posso} ir à festa. | I can't go to the party. / I cannot go to the party.
3: {Gosto} muito de cozinhar. | I really like cooking. / I love cooking. / I like cooking a lot.
3: {Sabes} tocar guitarra? | Can you play the guitar? / Do you know how to play the guitar? / Can you play guitar?
3: {Quero} conhecer o Porto. | I want to get to know Porto. / I want to visit Porto. / I want to see Porto.
3: {Vou} convidar os meus amigos. | I'm going to invite my friends.
` },

{ id: 'u15', s: 3, pt: 'Agora mesmo', en: 'Right now', tense: 'pres', gen: ['prog', 'prog_iv'],
  guide: `
## estar a + infinitive
- European Portuguese uses **estar a + infinitive** for what is happening right now:
> Estou a comer. = I'm eating.
> O que estás a fazer? = What are you doing?
> Eles estão a ver um filme. = They're watching a film.
!tip Brazilians say *estou comendo*. In most of Portugal you'll hear **estou a comer** — use that.
## Simple present or estar a?
- The simple present is for habits: **Leio muito** (I read a lot). For this very moment: **Estou a ler** (I'm reading).
## andar a: lately
> Ando a aprender português. = I've been learning Portuguese (lately).`,
  lessons: [
    'Estou a comer|v:estar, agora, v:comer, v:beber, v:ler, v:escrever',
    'O que estás a fazer?|v:fazer, v:ver, v:ouvir, v:jogar, v:tocar, série, guitarra, piano',
    'Neste momento|v:dormir, v:trabalhar, v:chover, v:esperar, v:andar, autocarro, bebé',
  ],
  sents: `
1: {Estou} a comer. / Eu estou a comer. | I'm eating. / I am eating.
1: O que {estás} a beber? | What are you drinking?
1: Ela {está} a ler um livro. | She's reading a book. / She is reading a book.
1: {Estamos} a escrever uma mensagem. | We're writing a message. / We are writing a message.
1: Agora não, {estou} a comer! | Not now, I'm eating!
2: O que {estás} a fazer? | What are you doing?
2: Eles {estão} a ver um filme. | They're watching a film. / They are watching a movie. / They're watching a movie.
2: {Estou} a ouvir música. | I'm listening to music.
2: As crianças {estão} a jogar futebol. | The children are playing football. / The kids are playing football.
2: Ele {está} a tocar piano. | He's playing the piano. / He is playing piano.
3: O bebé {está} a dormir. | The baby is sleeping. / The baby's asleep.
3: {Está} a chover! | It's raining!
3: {Estou} à espera do autocarro. / Estou a esperar o autocarro. | I'm waiting for the bus.
3: A minha mãe {está} a trabalhar. | My mother is working. / My mum is working.
3: {Ando} a aprender português. | I've been learning Portuguese. / I'm learning Portuguese at the moment.
3: Neste momento {estamos} a almoçar. | At the moment we're having lunch. / Right now we're having lunch.
` },

{ id: 'u16', s: 3, pt: 'Às compras', en: 'Shopping and clothes', tense: 'pres', gen: ['np_adj', 'dem_adj', 'custar'],
  guide: `
## This and that
| | near me | near you | over there |
| m. | este | esse | aquele |
| f. | esta | essa | aquela |
| things | isto | isso | aquilo |
> Quanto custa esta camisola? = How much is this jumper?
> Gosto daquele casaco. = I like that coat (over there).
- They merge with prepositions: de + este = **deste**, em + essa = **nessa**, de + aquele = **daquele**.
## Colours agree too
- **um casaco preto, uma saia preta** · azul → azuis · verde → verdes. **cor de laranja** and **cor-de-rosa** never change.
## In the shop
> Posso experimentar? = Can I try it on?
> Que tamanho veste? = What size are you?
> Pago com cartão. = I'll pay by card.
!tip Calças de ganga are jeans, a camisola is a jumper, and sapatilhas are trainers.`,
  lessons: [
    'Roupa|roupa, camisa, camisola, casaco, calças, vestido, sapato, t-shirt, calças de ganga, v:vestir, v:usar',
    'Cores|cor, branco, preto, vermelho, azul, verde, amarelo, castanho, cinzento, cor-de-rosa',
    'Este ou aquele?|este, esse, aquele, isto, isso, aquilo, tamanho, v:experimentar, v:pagar, cartão',
  ],
  sents: `
1: {Preciso} de uma camisola nova. | I need a new jumper. / I need a new sweater.
1: Ela {usa} óculos. | She wears glasses.
1: Ele {veste} sempre calças de ganga. | He always wears jeans.
1: {Visto} um casaco porque está frio. | I'm putting on a coat because it's cold. / I put on a coat because it's cold.
1: Gostas do meu vestido? | Do you like my dress?
2: {Tenho} um carro vermelho. | I have a red car.
2: A camisa branca é bonita. | The white shirt is pretty. / The white shirt is nice.
2: Os sapatos dela são pretos. | Her shoes are black.
2: Qual é a tua cor preferida? | What's your favourite colour? / What is your favourite colour?
2: O céu está cinzento. | The sky is grey.
2: {Quero} umas calças azuis. | I want some blue trousers. / I'd like some blue trousers. / I want blue trousers.
3: Quanto {custa} esta camisola? | How much is this jumper? / How much does this sweater cost?
3: {Posso} experimentar? | Can I try it on? / May I try it on?
3: {Gosto} mais daquele casaco. | I prefer that coat. / I like that coat better. / I like that coat more.
3: O que é isto? | What is this? / What's this?
3: Isso é muito caro! | That's very expensive! / That is very expensive!
3: {Pago} com cartão. | I'll pay by card. / I pay by card. / I'll pay with a card.
3: Que tamanho veste? | What size are you? / What size do you wear?
` },

{ id: 'u17', s: 3, pt: 'Ontem', en: 'Yesterday (simple past)', tense: 'pret', gen: ['svo', 'sv_adv'],
  guide: `
## Pretérito perfeito: finished actions
| | falar | comer | partir |
| eu | falei | comi | parti |
| tu | falaste | comeste | partiste |
| ele / ela | falou | comeu | partiu |
| nós | falámos | comemos | partimos |
| eles / elas | falaram | comeram | partiram |
!tip In Portugal **falámos** (past) carries an accent, which tells it apart from **falamos** (present).
## Spelling changes in the eu form
- ficar → **fiquei** · chegar → **cheguei** · começar → **comecei** · pagar → **paguei**
## When?
- ontem · ontem à noite · anteontem · na semana passada · no ano passado · no sábado · **há** dois dias (two days ago)
> Ontem jantámos fora. = Yesterday we ate out.
## Já: already, ever
> Já comeste? = Have you eaten yet?
- Portuguese uses this simple past where English says *have done*: **Já vi esse filme** (I've already seen that film).`,
  lessons: [
    'Ontem|ontem, passado, v:falar, v:trabalhar, v:jantar, v:comprar, v:chegar',
    'Comi e bebi|semana, v:comer, v:beber, v:escrever, v:aprender, v:perceber, v:vender',
    'Já partiste?|já, ainda, v:partir, v:abrir, v:decidir, v:sair, v:ficar, v:começar',
  ],
  sents: `
1: Ontem {trabalhei} muito. | Yesterday I worked a lot. / I worked a lot yesterday. / I worked hard yesterday.
1: {Jantámos} num restaurante. / Nós jantámos num restaurante. | We had dinner at a restaurant. / We had dinner in a restaurant. / We ate dinner at a restaurant.
1: Ela {comprou} um vestido. | She bought a dress.
1: A que horas {chegaste}? | What time did you arrive? / What time did you get here?
1: {Cheguei} tarde. | I arrived late. / I got there late. / I got here late.
1: {Falei} com o João na semana passada. | I spoke with João last week. / I talked to João last week. / I spoke to João last week.
2: {Comi} bacalhau ontem. | I ate salt cod yesterday. / I had salt cod yesterday. / I ate cod yesterday.
2: {Bebemos} vinho verde. | We drank vinho verde. / We drank green wine.
2: Ele {escreveu} um livro. | He wrote a book.
2: Não {percebi}. | I didn't understand. / I didn't get it.
2: {Venderam} a casa no ano passado. | They sold the house last year.
2: {Aprendeste} muito? | Did you learn a lot?
3: Já {comeste}? | Have you eaten? / Have you eaten yet? / Did you eat already?
3: Ainda não. | Not yet.
3: O comboio já {partiu}. | The train has already left. / The train already left.
3: {Abri} a janela. | I opened the window.
3: {Fiquei} em casa no sábado. | I stayed at home on Saturday. / I stayed home on Saturday.
3: O filme {começou} às nove. | The film started at nine. / The movie began at nine. / The film began at nine.
3: {Saímos} há dez minutos. | We left ten minutes ago.
` },

{ id: 'u18', s: 3, pt: 'Fui e fiz', en: 'Irregular past', tense: 'pret', gen: ['svo', 'ir_a', 'estar_loc'],
  guide: `
## Learn these by heart
| | ser / ir | ter | estar | fazer |
| eu | fui | tive | estive | fiz |
| tu | foste | tiveste | estiveste | fizeste |
| ele / ela | foi | teve | esteve | fez |
| nós | fomos | tivemos | estivemos | fizemos |
| eles / elas | foram | tiveram | estiveram | fizeram |
- **ser** and **ir** share one past: *fui* means both *I was* and *I went*. Context tells them apart.
## More irregular pasts
- poder → **pude** (ele **pôde**) · querer → **quis** · dizer → **disse** · dar → **dei** · ver → **vi** · vir → **vim** (ele **veio**) · pôr → **pus** (ele **pôs**) · saber → **soube** · trazer → **trouxe**
> Fomos a Sintra no domingo. = We went to Sintra on Sunday.
> O que fizeste ontem? = What did you do yesterday?
> Ela disse que sim. = She said yes.`,
  lessons: [
    'Fui a Sintra|v:ir, v:ser, v:estar, Sintra, viagem, férias',
    'O que fizeste?|v:fazer, v:ter, v:ver, v:dar, v:dizer',
    'Vieste?|v:vir, v:pôr, v:poder, v:querer, v:saber, v:trazer',
  ],
  sents: `
1: {Fomos} a Sintra no domingo. | We went to Sintra on Sunday.
1: {Fui} ao cinema ontem. | I went to the cinema yesterday. / I went to the movies yesterday.
1: As férias {foram} ótimas. | The holidays were great. / The holiday was great.
1: Onde {estiveste}? | Where were you? / Where have you been?
1: {Estive} em Lisboa na semana passada. | I was in Lisbon last week.
1: {Foi} um dia muito bonito. | It was a very beautiful day. / It was a lovely day.
2: O que {fizeste} no fim de semana? | What did you do at the weekend? / What did you do on the weekend?
2: {Fiz} um bolo para a minha mãe. | I made a cake for my mother. / I made a cake for my mum.
2: {Tive} um dia difícil. | I had a difficult day. / I had a hard day.
2: {Viste} o jogo? | Did you see the game? / Did you watch the match?
2: Ela {disse} que sim. | She said yes.
2: {Dei} uma prenda ao meu pai. | I gave my father a present. / I gave a present to my dad. / I gave my dad a present.
3: Ele {veio} de comboio. | He came by train.
3: Onde {puseste} as chaves? | Where did you put the keys?
3: Não {pude} ir à festa. | I couldn't go to the party. / I wasn't able to go to the party.
3: Ela não {quis} comer. | She didn't want to eat. / She refused to eat.
3: {Soube} a notícia ontem. | I found out the news yesterday. / I heard the news yesterday.
3: {Trouxeste} o vinho? | Did you bring the wine?
` },

{ id: 'u19', s: 3, pt: 'Antigamente', en: 'Used to (imperfect)', tense: 'imp', gen: ['svo', 'sv_adv'],
  guide: `
## Pretérito imperfeito: how things used to be
| | falar | comer | partir |
| eu | falava | comia | partia |
| tu | falavas | comias | partias |
| ele / ela | falava | comia | partia |
| nós | falávamos | comíamos | partíamos |
| eles / elas | falavam | comiam | partiam |
- Only four irregulars: **ser** (era), **ter** (tinha), **vir** (vinha), **pôr** (punha).
## Use it for
- habits in the past: **Em criança, ia à praia todos os verões.** (As a child, I used to go to the beach every summer.)
- descriptions and background: **Era tarde e chovia.**
- something in progress when another thing happened: **Estava a ler quando o telefone tocou.**
- polite requests: **Queria um café.**
## Perfeito or imperfeito?
> Ontem fui à praia. = Yesterday I went to the beach. (one finished event)
> Ia à praia todos os dias. = I used to go to the beach every day. (a habit)`,
  lessons: [
    'Em criança|criança, aldeia, verão, v:morar, v:brincar, v:ir',
    'Era uma vez|antigo, v:ser, v:ter, v:haver, v:estar, v:viver',
    'Quando…|quando, enquanto, telefone, v:fazer, v:chover, v:tocar',
  ],
  sents: `
1: Em criança, {morava} numa aldeia. | As a child, I lived in a village. / As a child, I used to live in a village. / When I was a child, I lived in a village.
1: {Brincávamos} na rua. | We used to play in the street. / We played in the street.
1: Todos os verões {íamos} à praia. | Every summer we used to go to the beach. / Every summer we went to the beach.
1: Quando era pequeno, {comia} muita fruta. | When I was little, I ate a lot of fruit. / When I was small, I used to eat a lot of fruit.
1: A minha avó {fazia} pão. | My grandmother used to make bread. / My grandmother made bread.
2: Era uma vez um gato. | Once upon a time there was a cat.
2: A casa {era} grande e {tinha} um jardim. | The house was big and had a garden. / The house was big and it had a garden.
2: {Havia} muitas árvores. | There were a lot of trees. / There were many trees.
2: Eu {tinha} um cão chamado Bobi. | I had a dog called Bobi. / I used to have a dog called Bobi.
2: Antigamente {vivíamos} no Porto. | We used to live in Porto. / In the past we lived in Porto.
2: {Estava} muito frio. | It was very cold.
3: {Estava} a ler quando o telefone tocou. | I was reading when the phone rang.
3: {Chovia} muito quando saímos. | It was raining a lot when we left. / It was raining hard when we left.
3: Enquanto ele {cozinhava}, eu arrumava a casa. | While he was cooking, I was tidying the house. / While he cooked, I tidied the house.
3: {Queria} uma bica, se faz favor. | I'd like an espresso, please. / I would like a coffee, please.
3: O que {fazias} quando te telefonei? | What were you doing when I called you? / What were you doing when I phoned you?
3: {Eram} oito horas quando ela chegou. | It was eight o'clock when she arrived.
` },

{ id: 'u20', s: 3, pt: 'O corpo e a saúde', en: 'Body and health', tense: 'impa', gen: ['doer', 'impa'],
  guide: `
## Where does it hurt?
- **doer** works back to front: the body part is the subject. **Dói-me a cabeça** (my head hurts), **doem-me as costas** (my back hurts).
- Change the pronoun for other people: **dói-te, dói-lhe** (him / her / you formal), **dói-nos, dói-lhes**.
> Onde é que lhe dói? = Where does it hurt? (formal)
> Tenho dores de cabeça. = I have a headache.
## Feeling ill
- **Estou doente. Estou constipado / constipada** (I've got a cold). **Tenho febre. Tenho tosse.**
!tip A cold is **uma constipação** — *estou constipado* does not mean constipated!
## Commands
| | tu | o senhor / você |
| tomar | toma | tome |
| beber | bebe | beba |
| descansar | descansa | descanse |
- The tu command is the **ele** form of the present. The polite command comes from the conjuntivo.
> Beba muita água e descanse. = Drink lots of water and rest.
- Negative commands always use the conjuntivo: **Não comas isso!**`,
  lessons: [
    'Dói-me|cabeça, barriga, perna, braço, pé, costas, dente, dor, v:doer',
    'Estou doente|doente, febre, gripe, constipação, tosse, médico, farmácia, comprimido',
    'Descanse!|saúde, receita, v:tomar, v:descansar, v:beber, v:ficar, v:melhorar',
  ],
  sents: `
1: Dói-me a cabeça. | My head hurts. / I have a headache. / I've got a headache.
1: Doem-me as costas. | My back hurts. / My back aches.
1: Dói-te o pé? | Does your foot hurt?
1: Dói-lhe a barriga. | His stomach hurts. / Her stomach hurts. / Her tummy hurts. / His tummy hurts.
1: Tenho dores de dentes. | I have toothache. / I have a toothache.
1: Onde é que lhe dói? | Where does it hurt?
2: Estou doente. | I'm ill. / I am sick. / I'm sick.
2: Tenho febre e tosse. | I have a fever and a cough. / I've got a temperature and a cough.
2: Acho que tenho gripe. | I think I have the flu. / I think I've got flu. / I think I have flu.
2: Ela está constipada. | She has a cold. / She's got a cold.
2: Preciso de ir ao médico. | I need to go to the doctor. / I need to see a doctor.
2: A farmácia fica ao lado do café. | The pharmacy is next to the café. / The chemist's is next to the café.
3: {Toma} este comprimido. | Take this pill. / Take this tablet.
3: {Beba} muita água e {descanse}. | Drink lots of water and rest. / Drink plenty of water and rest.
3: {Fica} em casa hoje. | Stay at home today. / Stay home today.
3: Não {comas} isso! | Don't eat that!
3: As melhoras! | Get well soon!
3: Já estou melhor, obrigado. | I'm already better, thank you. / I'm better now, thanks.
` },

{ id: 'u21', s: 4, pt: 'Viagens', en: 'Travel and directions', tense: 'impa', gen: ['ir_de', 'impa_dir'],
  guide: `
## Getting around
- **ir de** + transport, with no article: **vou de comboio, de autocarro, de carro, de metro, de avião**. On foot: **a pé**.
- **apanhar** = to catch, to take: **Apanho o elétrico 28.**
> Quanto tempo demora? = How long does it take?
> Um bilhete de ida e volta para o Porto, se faz favor. = A return ticket to Porto, please.
## Asking the way
> Desculpe, como vou para a estação? = Excuse me, how do I get to the station?
> Siga em frente e vire à direita. = Go straight on and turn right.
> É a segunda rua à esquerda. = It's the second street on the left.
- Polite commands: **siga, vire, atravesse, apanhe, desça** (from seguir, virar, atravessar, apanhar, descer).
!tip On Lisbon's yellow **elétricos** and Porto's **metro**, listen for *Próxima paragem…* (next stop).`,
  lessons: [
    'De comboio|comboio, autocarro, metro, elétrico, avião, carro, a pé, v:apanhar, v:demorar',
    'Bilhetes|bilhete, viagem, mala, passaporte, aeroporto, partida, chegada, voo, v:reservar',
    'Vire à direita|esquerda, direita, em frente, rua, esquina, semáforo, v:virar, v:seguir, v:atravessar',
  ],
  sents: `
1: {Vou} para o trabalho de metro. | I go to work by metro. / I go to work by underground. / I take the metro to work.
1: {Vamos} de comboio para o Porto. | We're going to Porto by train. / We go to Porto by train.
1: {Apanho} o autocarro às oito. | I catch the bus at eight. / I take the bus at eight.
1: Quanto tempo {demora} a viagem? | How long does the trip take? / How long does the journey take?
1: Ela {vai} a pé para a escola. | She walks to school. / She goes to school on foot.
1: O elétrico 28 {vai} para o castelo. | Tram 28 goes to the castle. / The number 28 tram goes to the castle.
2: Um bilhete de ida e volta para Faro, se faz favor. | A return ticket to Faro, please. / A round-trip ticket to Faro, please.
2: O voo {tem} uma hora de atraso. | The flight is an hour late. / The flight is one hour late.
2: Onde {está} o meu passaporte? | Where is my passport? / Where's my passport?
2: {Reservei} um quarto num hotel. | I booked a room in a hotel. / I booked a hotel room.
2: A partida é às dez e a chegada às duas. | Departure is at ten and arrival at two. / The departure is at ten and the arrival at two.
2: A minha mala é pesada. | My suitcase is heavy.
3: Desculpe, como {vou} para a estação? | Excuse me, how do I get to the station?
3: {Siga} em frente e {vire} à direita. | Go straight ahead and turn right. / Go straight on and turn right.
3: É a primeira rua à esquerda. | It's the first street on the left. / It's the first road on the left.
3: {Atravesse} a rua no semáforo. | Cross the street at the traffic lights. / Cross the road at the lights.
3: {Vire} à esquerda na esquina. | Turn left at the corner.
3: {Segue} sempre em frente. | Keep going straight ahead. / Go straight on. / Keep going straight on.
` },

{ id: 'u22', s: 4, pt: 'Pronomes', en: 'Object pronouns', tense: 'pres', gen: ['pron_obj', 'pron_ind'],
  guide: `
## Object pronouns
| me | me | nos | us |
| te | you | vos | you (plural) |
| o / a | him, her, it, you (formal) | os / as | them |
| lhe | to him, to her, to you | lhes | to them |
- In a plain statement they go after the verb with a hyphen: **Vejo-o** (I see him / it). **Dou-lhe o livro.**
- They move in front after **não**, question words, **que, quando, se** and **já, também, sempre, nunca, ainda, só**: **Não o vejo. Já lhe disse.**
## o / a change shape
- After **-r, -s, -z** they become **-lo, -la** and the verb drops that letter: comprar + o = **comprá-lo**, fazemos + o = **fazemo-lo**, faz + o = **fá-lo**.
- After a nasal sound (**-m, -ão, -õe**) they become **-no, -na**: compram + o = **compram-no**, dão + a = **dão-na**.
> Vou comprá-lo amanhã. = I'm going to buy it tomorrow.
> Eles convidaram-nos. = They invited us.
!tip Very European, and tricky at first. Brazilians would say *vou comprar ele*; in Portugal it is **comprá-lo**.`,
  lessons: [
    'Vejo-o|o-pron, a-pron, os-pron, me, te, nos, v:conhecer, v:convidar, v:encontrar, v:ajudar, v:esperar',
    'Dá-me|lhe, v:dar, v:dizer, v:mostrar, v:emprestar, v:oferecer',
    'Vou comprá-lo|v:comprar, v:fazer, v:ver, v:abrir, v:levar, v:trazer',
  ],
  sents: `
1: Conheces a Maria? {Conheço}-a bem. | Do you know Maria? I know her well.
1: {Vejo}-o todos os dias. | I see him every day. / I see it every day.
1: Não o {vejo}. | I don't see him. / I can't see it. / I don't see it.
1: Eles {convidaram}-nos para jantar. | They invited us to dinner. / They invited us for dinner.
1: {Espera}-me aqui. | Wait for me here.
1: {Ajudas}-me? | Can you help me? / Will you help me?
1: {Encontrei}-os no café. | I met them at the café. / I found them in the café.
2: Dá-me o livro, se faz favor. | Give me the book, please.
2: Já lhe {disse}. | I've already told him. / I already told her. / I have already told her. / I already told him.
2: Mostra-me a fotografia. | Show me the photo. / Show me the photograph.
2: {Emprestas}-me a tua caneta? | Can you lend me your pen? / Will you lend me your pen?
2: {Ofereci}-lhe flores. | I gave her flowers. / I gave him flowers.
2: Quem te {disse} isso? | Who told you that?
3: Vou comprá-lo amanhã. | I'm going to buy it tomorrow. / I will buy it tomorrow.
3: Fá-lo agora! | Do it now!
3: Quero vê-la. | I want to see her. / I want to see it.
3: Abrimo-la juntos. | We opened it together. / We open it together.
3: Comprámo-los ontem. | We bought them yesterday.
3: {Trazes}-me um copo de água? | Will you bring me a glass of water? / Can you bring me a glass of water?
3: Não os {leves}! | Don't take them!
` },

{ id: 'u23', s: 4, pt: 'Comparar', en: 'Comparing', tense: 'pres', gen: ['comp', 'tao'],
  guide: `
## More, less, as … as
> O carro é mais caro do que a bicicleta. = The car is more expensive than the bike.
> O comboio é menos rápido do que o avião. = The train is less fast than the plane.
> A Ana é tão alta como o irmão. = Ana is as tall as her brother.
- **do que** (than) is often shortened to **que**: *mais caro que*.
## Irregular comparatives
| bom | melhor |
| mau | pior |
| grande | maior |
| pequeno | mais pequeno (very common in Portugal) or menor |
## The most…
> É o restaurante mais caro da cidade. = It's the most expensive restaurant in the city.
## Really, really: -íssimo
- caro → **caríssimo**, bom → **ótimo**, lindo → **lindíssimo**.
> Este bolo está ótimo! = This cake is excellent!`,
  lessons: [
    'Mais do que|mais, menos, rápido, lento, comboio, bicicleta, v:comparar',
    'Tão… como|tão, igual, diferente, alto, baixo, forte, fraco',
    'O melhor|melhor, pior, maior, menor, ótimo, péssimo, famoso',
  ],
  sents: `
1: O carro é mais caro do que a bicicleta. | The car is more expensive than the bicycle. / The car is more expensive than the bike.
1: O avião é mais rápido do que o comboio. | The plane is faster than the train.
1: O meu irmão é mais novo do que eu. | My brother is younger than me. / My brother is younger than I am.
1: Hoje está menos frio do que ontem. | Today it's less cold than yesterday. / It's not as cold today as yesterday.
1: O autocarro é mais lento. | The bus is slower.
2: A Ana é tão alta como o pai. | Ana is as tall as her father. / Ana is as tall as her dad.
2: Os dois livros são iguais. | The two books are the same.
2: Somos muito diferentes. | We're very different. / We are very different.
2: Ele não é tão forte como pensa. | He's not as strong as he thinks. / He isn't as strong as he thinks.
2: O Porto é tão bonito como Lisboa. | Porto is as beautiful as Lisbon.
3: Este café é melhor do que aquele. | This coffee is better than that one.
3: É o melhor pastel de nata de Lisboa! | It's the best custard tart in Lisbon!
3: Hoje o tempo está pior. | The weather is worse today. / Today the weather is worse.
3: Lisboa é maior do que Coimbra. | Lisbon is bigger than Coimbra.
3: O jantar estava ótimo. | Dinner was excellent. / The dinner was great.
3: É o museu mais famoso da cidade. | It's the most famous museum in the city. / It is the city's most famous museum.
` },

{ id: 'u24', s: 4, pt: 'O futuro', en: 'Future and conditional', tense: 'fut', gen: ['svo', 'gostaria'],
  guide: `
## Futuro simples
- Infinitive + **-ei, -ás, -á, -emos, -eis, -ão**: falarei, comerás, partirá.
- Irregular stems: **fazer → farei**, **dizer → direi**, **trazer → trarei**.
- It sounds formal: in conversation people prefer **vou + infinitive**. You'll meet it in the news, weather forecasts and promises — and in guesses: **Onde estará o João?** (Where can João be?)
> Amanhã choverá no norte. = Tomorrow it will rain in the north.
## Condicional: would
- Infinitive + **-ia, -ias, -ia, -íamos, -íeis, -iam**: falaria, comeria, faria, diria.
> Gostaria de reservar uma mesa. = I would like to book a table.
> Poderia ajudar-me? = Could you help me?
!tip In everyday European Portuguese the **imperfeito** often replaces the condicional: *Gostava de ir* = *Gostaria de ir* (I'd like to go).`,
  lessons: [
    'Farei|amanhã, próximo, v:fazer, v:dizer, v:trazer, v:chover, v:prometer',
    'Gostaria de…|mesa, quarto, vista, v:gostar, v:poder, v:reservar, v:ajudar',
    'Seria bom|dinheiro, mundo, v:ser, v:ter, v:viver, v:comprar, v:viajar',
  ],
  sents: `
1: Amanhã {choverá} no norte. | Tomorrow it will rain in the north. / It will rain in the north tomorrow.
1: Prometo que {farei} tudo. | I promise I will do everything. / I promise that I'll do everything.
1: {Direi} a verdade. | I will tell the truth. / I'll tell the truth.
1: Onde {estará} o João? | Where can João be? / I wonder where João is. / Where might João be?
1: O que {trarás} para a festa? | What will you bring to the party?
1: Para o ano {viajaremos} para o Brasil. | Next year we will travel to Brazil. / Next year we'll travel to Brazil.
2: {Gostaria} de reservar uma mesa para dois. | I would like to book a table for two. / I'd like to reserve a table for two.
2: {Poderia} ajudar-me, se faz favor? | Could you help me, please?
2: {Gostava} de ir contigo. | I'd like to go with you. / I would like to go with you.
2: {Poderíamos} jantar fora. | We could have dinner out. / We could eat out.
2: {Queria} um quarto com vista para o mar. | I'd like a room with a sea view. / I would like a room with a view of the sea.
3: {Seria} bom viver perto do mar. | It would be nice to live near the sea. / It would be good to live by the sea.
3: Com mais dinheiro, {compraria} uma casa. | With more money, I would buy a house. / With more money, I'd buy a house.
3: Ele disse que {viria}. | He said he would come. / He said that he would come.
3: Eu nunca {faria} isso. | I would never do that. / I'd never do that.
3: {Viajarias} pelo mundo? | Would you travel around the world? / Would you travel the world?
` },

{ id: 'u25', s: 4, pt: 'O conjuntivo', en: 'The subjunctive', tense: 'cpres', gen: ['espero', 'quero_que', 'talvez'],
  guide: `
## Presente do conjuntivo
- Take the **eu** form of the present, drop the **-o**, and swap the vowel: -ar verbs take **-e**, -er and -ir verbs take **-a**.
| falar | falo → fale, fales, fale, falemos, falem |
| comer | como → coma, comas, coma, comamos, comam |
| fazer | faço → faça, faças, faça, façamos, façam |
| ter | tenho → tenha, tenhas, tenha, tenhamos, tenham |
- Seven rebels: **ser** (seja), **estar** (esteja), **ir** (vá), **dar** (dê), **haver** (haja), **saber** (saiba), **querer** (queira).
## When to use it
- wishes and hopes: **Espero que venhas.** (I hope you come.) **Quero que estudes.** (I want you to study.)
- doubt and possibility: **Talvez chova.** (Maybe it'll rain.) **Duvido que ele saiba.**
- after **para que, embora, antes que, até que, caso**: **Embora esteja cansado, vou sair.**
- after impersonal phrases: **É importante que durmas bem.**
> Oxalá faça sol amanhã! = Let's hope it's sunny tomorrow!`,
  lessons: [
    'Espero que…|v:esperar, v:vir, v:chegar, v:gostar, v:correr, v:ganhar',
    'Quero que…|v:querer, v:estudar, v:fazer, v:ir, v:ser, v:estar',
    'Talvez|talvez, embora, para que, oxalá, v:saber, v:haver, v:dar',
  ],
  sents: `
1: Espero que {venhas} à festa. | I hope you come to the party. / I hope you'll come to the party.
1: Espero que {gostes}. | I hope you like it.
1: Esperamos que tudo {corra} bem. | We hope everything goes well. / We hope that everything goes well.
1: Espero que ele {chegue} cedo. | I hope he arrives early. / I hope he gets here early.
1: Esperamos que a nossa equipa {ganhe}. | We hope our team wins. / We hope that our team wins.
2: Quero que {estudes} mais. | I want you to study more.
2: A mãe quer que {façamos} os trabalhos de casa. | Mum wants us to do our homework. / Mother wants us to do the homework.
2: Não quero que {vás} sozinho. | I don't want you to go alone.
2: É importante que {sejas} paciente. | It's important that you are patient. / It's important for you to be patient. / It is important that you be patient.
2: Queres que eu {esteja} lá às oito? | Do you want me to be there at eight?
3: Talvez {chova} amanhã. | Maybe it will rain tomorrow. / It might rain tomorrow. / Perhaps it'll rain tomorrow.
3: Embora {esteja} cansada, vou sair. | Although I'm tired, I'm going out. / Even though I'm tired, I'm going to go out.
3: Talvez ela {saiba} a resposta. | Maybe she knows the answer. / Perhaps she knows the answer.
3: Oxalá {haja} bilhetes! | Let's hope there are tickets! / Hopefully there are tickets!
3: Falo devagar para que {percebas}. | I speak slowly so that you understand. / I'm speaking slowly so you understand.
3: Duvido que eles {venham}. | I doubt they'll come. / I doubt that they will come.
` },

{ id: 'u26', s: 4, pt: 'Se eu pudesse', en: 'If I could…', tense: 'cimp', gen: ['se_cimp'],
  guide: `
## Imperfeito do conjuntivo
- Take the **eles** form of the pretérito perfeito, drop **-ram**, add **-sse**:
| falaram → falasse | fizeram → fizesse |
| comeram → comesse | tiveram → tivesse |
| partiram → partisse | foram → fosse |
- Endings: -sse, -sses, -sse, -ssemos, -ssem. The nós form gets an accent: **falássemos, fizéssemos, fôssemos**.
## If… (unlikely or imaginary)
- **se** + imperfeito do conjuntivo, then the condicional — or, in everyday speech, the imperfeito:
> Se eu tivesse tempo, aprendia piano. = If I had time, I'd learn the piano.
> Se fosse rico, viajaria pelo mundo. = If I were rich, I'd travel the world.
## After a past trigger
> Queria que viesses comigo. = I wanted you to come with me.
> Pediu-me que esperasse. = She asked me to wait.
- **como se** (as if): **Fala como se fosse português.**`,
  lessons: [
    'Se eu tivesse…|dinheiro, tempo, rico, v:ter, v:ser, v:poder',
    'Se fosses…|férias, v:estar, v:saber, v:viver, v:falar, v:ganhar',
    'Queria que…|como, v:querer, v:vir, v:esperar, v:pedir, v:dizer',
  ],
  sents: `
1: Se eu {tivesse} tempo, aprendia piano. | If I had time, I would learn the piano. / If I had time, I'd learn piano.
1: Se {tivéssemos} dinheiro, comprávamos uma casa. | If we had money, we would buy a house. / If we had the money, we'd buy a house.
1: Se {fosse} rico, viajaria pelo mundo. | If I were rich, I would travel the world. / If I was rich, I'd travel around the world.
1: Se {pudesse}, ficava mais tempo. | If I could, I would stay longer. / If I could, I'd stay longer.
1: O que farias se {tivesses} um milhão? | What would you do if you had a million?
2: Se {estivesses} cá, ias adorar. | If you were here, you would love it. / If you were here, you'd love it.
2: Se {soubesse}, dizia-te. | If I knew, I would tell you. / If I knew, I'd tell you.
2: Se {vivêssemos} perto do mar, íamos à praia todos os dias. | If we lived near the sea, we would go to the beach every day.
2: Se {falasses} mais devagar, eu percebia. | If you spoke more slowly, I would understand. / If you spoke slower, I'd understand.
2: Se ela {ganhasse} a lotaria, deixava de trabalhar. | If she won the lottery, she would stop working.
3: Queria que {viesses} comigo. | I wanted you to come with me. / I'd like you to come with me.
3: Pediu-me que {esperasse}. | He asked me to wait. / She asked me to wait.
3: Ela falou como se {soubesse} tudo. | She spoke as if she knew everything.
3: Era bom que {chovesse}. | It would be good if it rained. / It would be nice if it rained.
3: Disse-lhe que {viesse} cedo. | I told him to come early. / I told her to come early.
` },

{ id: 'u27', s: 4, pt: 'Quando chegares', en: 'When you arrive…', tense: 'cfut', gen: ['se_cfut'],
  guide: `
## Futuro do conjuntivo
- Take the **eles** form of the pretérito perfeito, drop **-ram**, add **-r**:
| falaram → falar | fizeram → fizer |
| comeram → comer | tiveram → tiver |
| foram → for | vieram → vier |
- Endings: -r, -res, -r, -rmos, -rem. For regular verbs it looks like the infinitive; for irregular ones it doesn't!
## Use it after se, quando, assim que, enquanto, sempre que… about the future
> Quando chegares, liga-me. = When you arrive, call me.
> Se tiveres tempo, vem jantar. = If you have time, come for dinner.
> Assim que souber, digo-te. = As soon as I know, I'll tell you.
> Faz como quiseres. = Do as you like.
!tip English uses the present here (*when you arrive*). Portuguese looks ahead with the futuro do conjuntivo — and it's alive in everyday speech.`,
  lessons: [
    'Quando chegares|quando, v:chegar, v:ligar, v:acabar, v:sair, v:voltar',
    'Se tiveres tempo|se, sol, v:ter, v:poder, v:querer, v:estar',
    'Assim que souber|enquanto, v:saber, v:fazer, v:ver, v:ir, v:vir',
  ],
  sents: `
1: Quando {chegares}, liga-me. | When you arrive, call me. / Call me when you arrive. / When you get there, call me.
1: Quando {acabares}, avisa-me. | When you finish, let me know. / Let me know when you finish.
1: Quando {sairmos}, fechamos a porta. | When we leave, we'll close the door. / When we go out, we'll close the door.
1: Quando {voltar} de férias, telefono-te. | When I get back from holiday, I'll call you. / When I come back from holiday, I'll phone you.
1: Quando ele {chegar}, jantamos. | When he arrives, we'll have dinner. / We'll have dinner when he arrives.
2: Se {tiveres} tempo, vem jantar. | If you have time, come for dinner. / If you have time, come to dinner.
2: Se {puderes}, ajuda-me. | If you can, help me.
2: Se {quiseres}, vamos ao cinema. | If you want, we'll go to the cinema. / If you like, we can go to the cinema.
2: Se {estiver} sol, vamos à praia. | If it's sunny, we'll go to the beach. / If it is sunny, we will go to the beach.
2: Se {chover}, ficamos em casa. | If it rains, we'll stay at home. / If it rains, we will stay home.
3: Assim que {souber}, digo-te. | As soon as I know, I'll tell you. / I'll tell you as soon as I know.
3: Faz como {quiseres}. | Do as you like. / Do whatever you want. / Do as you want.
3: Quando {vires} a Ana, dá-lhe um beijinho. | When you see Ana, give her a kiss. / When you see Ana, give her a little kiss.
3: Se {fores} ao Porto, prova uma francesinha. | If you go to Porto, try a francesinha.
3: Quando {vierem}, tragam o vinho. | When you come, bring the wine.
3: Enquanto {houver} vida, há esperança. | While there's life, there's hope.
` },
);
