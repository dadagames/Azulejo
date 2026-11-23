/* Azulejo · more graded readings, one for each chapter that had none. Same format as readings.js. */
window.AZ_READ = (window.AZ_READ || []).concat([
{ id: 'encontro', lvl: 'A1', pic: '👋', title: 'Bom dia, Dona Fernanda!', en: 'Good morning, Dona Fernanda!',
  text: `— Bom dia, Dona Fernanda! Como está?
— Bom dia, Rui! Estou bem, obrigada. E tu, como estás?
— Tudo bem, obrigado.

— Olá, Sofia! Tudo bem?
— Olá! Tudo, e contigo?
— Mais ou menos… Desculpa, tenho de ir. Até logo!
— Tchau, até logo!

— Boa noite! Bem-vindo ao hotel.
— Boa noite. Desculpe, não percebo. Pode repetir, por favor?
— Claro! Boa noite e bem-vindo!
— Ah! Muito obrigado!`,
  tr: ["— Good morning, Dona Fernanda! How are you?\n— Good morning, Rui! I'm fine, thank you. And you, how are you?\n— All good, thanks.", "— Hi, Sofia! How's it going?\n— Hi! All good, and you?\n— So-so… Sorry, I have to go. See you later!\n— Bye, see you later!", "— Good evening! Welcome to the hotel.\n— Good evening. Sorry, I don't understand. Can you repeat that, please?\n— Of course! Good evening and welcome!\n— Ah! Thank you very much!"],
  gloss: { dona: 'Mrs (with a first name, polite)', contigo: 'with you (tu)', 'tenho de ir': 'I have to go', 'bem-vindo': 'welcome', claro: 'of course' },
  qs: [
    { q: 'Como fala o Rui com a Dona Fernanda?', en: 'How does Rui speak to Dona Fernanda?', o: ['Com tu: «Como estás?»', 'De forma educada: «Como está?»', 'Em inglês'], a: 1 },
    { q: 'Como está a Sofia?', en: 'How is Sofia?', o: ['Tudo bem', 'Mal', 'Mais ou menos'], a: 0 },
    { q: 'O que diz a pessoa que não percebe?', en: "What does the person who doesn't understand say?", o: ['Até logo!', 'Pode repetir, por favor?', 'Tudo bem?'], a: 1 },
  ] },

{ id: 'turma', lvl: 'A1', pic: '🧑‍🏫', title: 'A turma de português', en: 'The Portuguese class',
  text: `Olá! Eu sou a Emma. Sou inglesa, de Manchester, e sou aluna de português em Lisboa. Na minha turma somos oito.

O Hans e a Greta são alemães. Ele é engenheiro e ela é médica. O Marco é italiano, é de Roma, e é cozinheiro. A Yuki é japonesa e é estudante.

A professora chama-se Teresa. É portuguesa, é do Porto e é muito simpática. Às vezes diz: «Vocês são ótimos alunos!» E nós respondemos: «Obrigado, professora!»`,
  tr: ["Hi! I'm Emma. I'm English, from Manchester, and I'm a Portuguese student in Lisbon. There are eight of us in my class.", "Hans and Greta are German. He's an engineer and she's a doctor. Marco is Italian, he's from Rome, and he's a cook. Yuki is Japanese and she's a student.", "The teacher is called Teresa. She's Portuguese, she's from Porto and she's very nice. Sometimes she says: \"You're excellent students!\" And we answer: \"Thank you, teacher!\""],
  gloss: { aluna: 'pupil, student (woman)', turma: 'class (group of students)', 'somos oito': 'there are eight of us', engenheiro: 'engineer', cozinheiro: 'cook', japonesa: 'Japanese (woman)', diz: 'says', respondemos: 'we answer', ótimos: 'excellent' },
  qs: [
    { q: 'De onde é a Emma?', en: 'Where is Emma from?', o: ['De Lisboa', 'De Roma', 'De Manchester'], a: 2 },
    { q: 'Quem é médica?', en: 'Who is a doctor?', o: ['A Greta', 'A Yuki', 'A professora'], a: 0 },
    { q: 'Como é a professora?', en: 'What is the teacher like?', o: ['É alemã', 'É muito simpática', 'É de Lisboa'], a: 1 },
  ] },

{ id: 'retrato', lvl: 'A1', pic: '🧑‍🎨', title: 'A minha melhor amiga', en: 'My best friend',
  text: `A minha melhor amiga chama-se Marta. É alta, morena e tem o cabelo comprido. É muito simpática e engraçada, mas é um pouco tímida com pessoas novas.

A Marta é enfermeira e trabalha num hospital grande. Esta semana tem muito trabalho, por isso hoje está cansada. Também está um pouco triste: o namorado dela está em Londres e ela tem saudades dele.

Mas amanhã é sábado, e ao sábado a Marta está sempre contente. Vamos juntas a um café pequeno perto da praia. O café é antigo, mas é muito bonito, e o bolo de chocolate é ótimo!`,
  tr: ["My best friend is called Marta. She's tall, dark-haired and has long hair. She's very nice and funny, but she's a bit shy with new people.", "Marta is a nurse and works in a big hospital. She has a lot of work this week, so today she's tired. She's also a bit sad: her boyfriend is in London and she misses him.", "But tomorrow is Saturday, and on Saturdays Marta is always happy. We go together to a small café near the beach. The café is old, but it's very pretty, and the chocolate cake is excellent!"],
  gloss: { morena: 'dark-haired, dark-skinned', cabelo: 'hair', comprido: 'long', 'por isso': 'so, that\'s why', 'tem saudades dele': 'she misses him', juntas: 'together (women)' },
  qs: [
    { q: 'Como é a Marta?', en: 'What is Marta like?', o: ['Baixa e antipática', 'Alta, simpática e engraçada', 'Loira e muito séria'], a: 1 },
    { q: 'Porque está a Marta cansada hoje?', en: 'Why is Marta tired today?', o: ['Porque tem muito trabalho esta semana', 'Porque está doente', 'Porque vai a Londres'], a: 0 },
    { q: 'Onde fica o café?', en: 'Where is the café?', o: ['No hospital', 'Em Londres', 'Perto da praia'], a: 2 },
  ] },

{ id: 'bairro', lvl: 'A1', pic: '🏘️', title: 'O meu bairro', en: 'My neighbourhood',
  text: `Moro em Campo de Ourique, um bairro calmo de Lisboa. A minha casa fica numa rua pequena, perto de um jardim.

Ao lado da minha casa há uma padaria. O pão é ótimo e as pessoas são muito simpáticas. Em frente da padaria há uma farmácia, e na esquina fica o meu café favorito.

O mercado fica a cinco minutos a pé. A estação de metro é um pouco longe, mas o elétrico 28 passa perto da minha rua. Gosto muito do meu bairro!`,
  tr: ["I live in Campo de Ourique, a quiet neighbourhood in Lisbon. My house is in a small street, near a park.", "Next to my house there's a bakery. The bread is excellent and the people are very nice. Opposite the bakery there's a pharmacy, and on the corner is my favourite café.", "The market is five minutes away on foot. The metro station is a bit far, but tram 28 goes past near my street. I really like my neighbourhood!"],
  gloss: { bairro: 'neighbourhood', calmo: 'quiet, calm', jardim: 'park, garden', padaria: 'bakery', esquina: 'corner', 'a cinco minutos a pé': 'five minutes away on foot', passa: 'goes past' },
  qs: [
    { q: 'O que há ao lado da casa?', en: 'What is next to the house?', o: ['Uma farmácia', 'Uma padaria', 'O mercado'], a: 1 },
    { q: 'Onde fica o café favorito?', en: 'Where is the favourite café?', o: ['Na esquina', 'No jardim', 'Na estação'], a: 0 },
    { q: 'O que passa perto da rua?', en: 'What goes past near the street?', o: ['O metro', 'O comboio', 'O elétrico 28'], a: 2 },
  ] },

{ id: 'cartas', lvl: 'A1', pic: '✉️', title: 'As cartas da avó', en: "Grandma's letters",
  text: `A minha avó vive numa aldeia no Minho e não usa a internet. Por isso, escreve-me cartas! Todos os meses recebo uma carta dela.

Quando abro o envelope, leio tudo com muita atenção. A avó escreve sobre a horta, as galinhas e os vizinhos. Às vezes não percebo a letra dela e peço ajuda à minha mãe.

Eu também escrevo à avó. Escrevo em português, claro, e aprendo muito assim. Ela responde sempre: «Escreves muito bem, querida!»`,
  tr: ["My grandmother lives in a village in the Minho and doesn't use the internet. So she writes me letters! Every month I get a letter from her.", "When I open the envelope, I read everything very carefully. Grandma writes about her vegetable garden, the hens and the neighbours. Sometimes I can't make out her handwriting and I ask my mother for help.", "I write to Grandma too. I write in Portuguese, of course, and I learn a lot that way. She always answers: \"You write very well, darling!\""],
  gloss: { aldeia: 'village', Minho: 'a region in the north of Portugal', recebo: 'I receive', 'com muita atenção': 'very carefully', horta: 'vegetable garden', galinhas: 'hens', letra: 'handwriting', peço: 'I ask for', querida: 'darling, dear' },
  qs: [
    { q: 'Porque escreve a avó cartas?', en: 'Why does Grandma write letters?', o: ['Porque não usa a internet', 'Porque mora em Lisboa', 'Porque é professora'], a: 0 },
    { q: 'O que faz a neta quando não percebe a letra?', en: "What does the granddaughter do when she can't read the handwriting?", o: ['Telefona à avó', 'Pede ajuda à mãe', 'Não lê a carta'], a: 1 },
    { q: 'Em que língua escreve a neta?', en: 'What language does the granddaughter write in?', o: ['Em inglês', 'Em espanhol', 'Em português'], a: 2 },
  ] },

{ id: 'sabado', lvl: 'A1', pic: '🛒', title: 'Ao sábado', en: 'On Saturdays',
  text: `Ao sábado não trabalho, por isso faço o que quero. De manhã vou ao mercado com a minha mulher. Ela faz a lista e eu trago os sacos.

Depois vamos a casa dos meus pais. A minha mãe diz sempre: «Ficam para almoçar?» E nós dizemos que sim, claro! O meu pai põe a mesa e eu vejo se ele precisa de ajuda.

À tarde vejo futebol na televisão ou saio com os amigos. À noite, se posso, vou ao cinema. E tu? O que fazes ao sábado?`,
  tr: ["On Saturdays I don't work, so I do what I want. In the morning I go to the market with my wife. She makes the list and I carry the bags.", "Then we go to my parents' house. My mother always says: \"Are you staying for lunch?\" And we say yes, of course! My father lays the table and I see if he needs help.", "In the afternoon I watch football on TV or go out with my friends. In the evening, if I can, I go to the cinema. And you? What do you do on Saturdays?"],
  gloss: { 'faço o que quero': 'I do what I want', lista: 'list', trago: 'I bring, I carry', sacos: 'bags', 'ficam para almoçar?': 'are you staying for lunch?', 'põe a mesa': 'lays the table' },
  qs: [
    { q: 'Onde vai o narrador de manhã?', en: 'Where does the narrator go in the morning?', o: ['Ao cinema', 'Ao mercado', 'Ao trabalho'], a: 1 },
    { q: 'Quem faz a lista?', en: 'Who makes the list?', o: ['A mulher dele', 'A mãe dele', 'Ele'], a: 0 },
    { q: 'O que faz o pai?', en: 'What does the father do?', o: ['Vê futebol', 'Faz o almoço', 'Põe a mesa'], a: 2 },
  ] },

{ id: 'horario', lvl: 'A1', pic: '🗓️', title: 'A semana da Leonor', en: "Leonor's week",
  text: `A Leonor tem dezasseis anos e anda na escola secundária. As aulas começam às oito e um quarto e acabam à uma e meia. À segunda e à quarta, também tem aulas à tarde, das três às cinco.

À terça-feira tem natação às seis da tarde, e à quinta tem aula de guitarra. A sexta-feira é o dia favorito dela: as aulas acabam ao meio-dia!

Ao fim de semana a Leonor dorme até às dez. O aniversário dela é no dia três de julho. Como é no verão, nunca tem aulas no dia de anos.`,
  tr: ["Leonor is sixteen and goes to secondary school. Lessons start at a quarter past eight and finish at half past one. On Mondays and Wednesdays she also has lessons in the afternoon, from three to five.", "On Tuesdays she has swimming at six in the evening, and on Thursdays she has a guitar lesson. Friday is her favourite day: lessons finish at midday!", "At weekends Leonor sleeps until ten. Her birthday is on the third of July. As it's in the summer, she never has school on her birthday."],
  gloss: { 'anda na escola secundária': 'goes to secondary school', aulas: 'lessons', natação: 'swimming', 'dia de anos': 'birthday', como: 'as, since' },
  qs: [
    { q: 'A que horas começam as aulas?', en: 'What time do lessons start?', o: ['Às oito e um quarto', 'À uma e meia', 'Às dez'], a: 0 },
    { q: 'Porque é a sexta-feira o dia favorito da Leonor?', en: "Why is Friday Leonor's favourite day?", o: ['Porque tem natação', 'Porque as aulas acabam ao meio-dia', 'Porque é o aniversário dela'], a: 1 },
    { q: 'Quando é o aniversário da Leonor?', en: "When is Leonor's birthday?", o: ['No inverno', 'No dia dezasseis', 'No dia três de julho'], a: 2 },
  ] },

{ id: 'agora', lvl: 'A2', pic: '🌧️', title: 'Neste momento', en: 'Right now',
  text: `São sete da tarde e está a chover em Lisboa. Na casa da família Ramos, cada pessoa está a fazer uma coisa diferente.

O pai está na cozinha a fazer o jantar. A mãe está na sala a falar ao telefone com a avó. O Duarte está no quarto a jogar no computador — em vez de estudar!

A pequena Rita está a ver desenhos animados, e o gato está a dormir no sofá, ao lado dela. Ninguém está a pensar no jantar… só o pai, que está a cantar enquanto cozinha.`,
  tr: ["It's seven in the evening and it's raining in Lisbon. In the Ramos family's house, each person is doing something different.", "Dad is in the kitchen making dinner. Mum is in the living room talking on the phone with Grandma. Duarte is in his room playing on the computer — instead of studying!", "Little Rita is watching cartoons, and the cat is sleeping on the sofa next to her. Nobody is thinking about dinner… only Dad, who is singing while he cooks."],
  gloss: { 'cada pessoa': 'each person', 'em vez de': 'instead of', 'desenhos animados': 'cartoons', ninguém: 'nobody', enquanto: 'while' },
  qs: [
    { q: 'Que tempo está a fazer?', en: "What's the weather like?", o: ['Está a chover', 'Está sol', 'Está a nevar'], a: 0 },
    { q: 'O que está o Duarte a fazer?', en: 'What is Duarte doing?', o: ['A estudar', 'A jogar no computador', 'A ver desenhos animados'], a: 1 },
    { q: 'Onde está o gato?', en: 'Where is the cat?', o: ['Na cozinha', 'No quarto do Duarte', 'No sofá, ao lado da Rita'], a: 2 },
  ] },

{ id: 'loja', lvl: 'A2', pic: '🧥', title: 'Na loja de roupa', en: 'In the clothes shop',
  text: `— Boa tarde. Posso ajudar?
— Boa tarde. Estou à procura de um casaco para o inverno.
— Temos estes aqui, que são novos. Gosta deste azul?
— É bonito, mas prefiro uma cor mais escura. Tem aquele cinzento no tamanho M?
— Tenho, sim. Quer experimentar?

— Então, como fica?
— Fica-me bem, mas é um pouco largo. Tem o S?
— Tenho. Aqui está.
— Este é perfeito. Quanto custa?
— Oitenta e nove euros. Mas hoje há saldos: tem vinte por cento de desconto.
— Ótimo! Levo-o. Posso pagar com cartão?`,
  tr: ["— Good afternoon. Can I help you?\n— Good afternoon. I'm looking for a coat for the winter.\n— We have these ones here, which are new. Do you like this blue one?\n— It's nice, but I prefer a darker colour. Do you have that grey one in size M?\n— Yes, I do. Would you like to try it on?", "— So, how does it fit?\n— It suits me, but it's a bit loose. Do you have the S?\n— I do. Here it is.\n— This one is perfect. How much is it?\n— Eighty-nine euros. But there's a sale today: it's twenty per cent off.\n— Great! I'll take it. Can I pay by card?"],
  gloss: { 'estou à procura de': "I'm looking for", escura: 'dark', largo: 'loose, wide', saldos: 'sales', desconto: 'discount', 'levo-o': "I'll take it" },
  qs: [
    { q: 'O que procura o cliente?', en: 'What is the customer looking for?', o: ['Uns sapatos', 'Um casaco', 'Uma camisola'], a: 1 },
    { q: 'Porque não leva o casaco azul?', en: "Why doesn't he take the blue coat?", o: ['Porque prefere uma cor mais escura', 'Porque é muito caro', 'Porque é pequeno'], a: 0 },
    { q: 'Quanto é o desconto?', en: 'How big is the discount?', o: ['Dez por cento', 'Oitenta e nove euros', 'Vinte por cento'], a: 2 },
  ] },

{ id: 'ferias', lvl: 'A2', pic: '🏞️', title: 'Férias no Gerês', en: 'A holiday in the Gerês',
  text: `No verão passado, eu e o meu namorado fomos ao Gerês, um parque natural no norte de Portugal. Fomos de carro. A viagem foi longa, mas valeu a pena.

Estivemos lá cinco dias. Fizemos caminhadas pelas montanhas e vimos cascatas lindíssimas. Num dos dias tomámos banho num rio — a água estava geladíssima!

No último dia houve uma festa na aldeia. Os vizinhos trouxeram broa e vinho, e todos dançaram até tarde. Eu trouxe para casa queijo, mel e muitas fotografias. Quero voltar no próximo ano!`,
  tr: ["Last summer, my boyfriend and I went to the Gerês, a nature park in the north of Portugal. We went by car. The journey was long, but it was worth it.", "We were there for five days. We went hiking in the mountains and saw gorgeous waterfalls. One day we swam in a river — the water was freezing!", "On the last day there was a party in the village. The neighbours brought corn bread and wine, and everyone danced until late. I brought home cheese, honey and lots of photos. I want to go back next year!"],
  gloss: { 'parque natural': 'nature park', 'valeu a pena': 'it was worth it', caminhadas: 'walks, hikes', cascatas: 'waterfalls', 'tomámos banho': 'we swam, we bathed', geladíssima: 'freezing cold', broa: 'corn bread', mel: 'honey' },
  qs: [
    { q: 'Como foram ao Gerês?', en: 'How did they get to the Gerês?', o: ['De comboio', 'De carro', 'De avião'], a: 1 },
    { q: 'Quantos dias estiveram lá?', en: 'How many days were they there?', o: ['Cinco', 'Dois', 'Uma semana'], a: 0 },
    { q: 'O que houve no último dia?', en: 'What happened on the last day?', o: ['Uma tempestade', 'Um acidente', 'Uma festa na aldeia'], a: 2 },
  ] },

{ id: 'presente', lvl: 'B1', pic: '🎁', title: 'O presente da Joana', en: "Joana's present",
  text: `Amanhã é o aniversário da minha irmã, a Joana, e eu ainda não lhe comprei nada! Por isso, ontem fui ao centro comercial à procura de um presente.

Primeiro vi uma camisola bonita, mas era muito cara e não a comprei. Depois encontrei uns livros de receitas. A Joana adora cozinhar, por isso comprei-os logo.

Quando cheguei a casa, a minha mãe perguntou-me: «Já embrulhaste os livros?» «Ainda não, vou embrulhá-los agora», respondi. Agora só falta escrever um cartão. Vou escrevê-lo esta noite e dar-lhe tudo amanhã ao pequeno-almoço.`,
  tr: ["Tomorrow is my sister Joana's birthday, and I still haven't bought her anything! So yesterday I went to the shopping centre looking for a present.", "First I saw a nice jumper, but it was very expensive and I didn't buy it. Then I found some recipe books. Joana loves cooking, so I bought them straight away.", "When I got home, my mother asked me: \"Have you wrapped the books yet?\" \"Not yet, I'm going to wrap them now,\" I answered. Now I just have to write a card. I'm going to write it tonight and give her everything tomorrow at breakfast."],
  gloss: { 'centro comercial': 'shopping centre', 'à procura de': 'looking for', receitas: 'recipes', logo: 'straight away', embrulhar: 'to wrap', 'só falta': 'all that\'s left is', cartão: 'card' },
  qs: [
    { q: 'Porque não comprou a camisola?', en: "Why didn't she buy the jumper?", o: ['Porque era muito cara', 'Porque era feia', 'Porque a Joana não gosta de camisolas'], a: 0 },
    { q: 'O que comprou para a Joana?', en: 'What did she buy for Joana?', o: ['Um cartão', 'Uma camisola', 'Uns livros de receitas'], a: 2 },
    { q: 'Quando vai dar o presente?', en: 'When is she going to give the present?', o: ['Esta noite', 'Amanhã ao pequeno-almoço', 'No centro comercial'], a: 1 },
  ] },

{ id: 'cidades', lvl: 'B1', pic: '🌉', title: 'Lisboa ou Porto?', en: 'Lisbon or Porto?',
  text: `Muitos turistas perguntam: qual é melhor, Lisboa ou o Porto? A resposta não é fácil.

Lisboa é a capital e é maior do que o Porto. Tem mais museus, mais restaurantes e mais vida noturna. Também é mais cara, sobretudo para quem quer alugar casa.

O Porto é mais pequeno, mas é tão bonito como Lisboa. Muita gente diz que os portuenses são as pessoas mais simpáticas do país. A comida do norte é ótima, e as francesinhas são famosíssimas.

No inverno, o Porto é mais frio e chove mais. No verão, Lisboa é mais quente. A melhor ideia? Visitar as duas!`,
  tr: ["Lots of tourists ask: which is better, Lisbon or Porto? The answer isn't easy.", "Lisbon is the capital and it's bigger than Porto. It has more museums, more restaurants and more nightlife. It's also more expensive, especially for people who want to rent a flat.", "Porto is smaller, but it's as beautiful as Lisbon. Lots of people say the people of Porto are the friendliest in the country. The food in the north is excellent, and the francesinhas are hugely famous.", "In winter, Porto is colder and it rains more. In summer, Lisbon is hotter. The best idea? Visit both!"],
  gloss: { qual: 'which', 'vida noturna': 'nightlife', sobretudo: 'above all, especially', alugar: 'to rent', portuenses: 'people from Porto', francesinhas: 'a Porto sandwich with steak, cheese and sauce' },
  qs: [
    { q: 'Qual é a cidade maior?', en: 'Which is the bigger city?', o: ['Lisboa', 'O Porto', 'São iguais'], a: 0 },
    { q: 'Como é o Porto, comparado com Lisboa?', en: 'What is Porto like compared with Lisbon?', o: ['Mais caro', 'Mais quente no verão', 'Tão bonito como Lisboa'], a: 2 },
    { q: 'Onde chove mais no inverno?', en: 'Where does it rain more in winter?', o: ['Em Lisboa', 'No Porto', 'No Algarve'], a: 1 },
  ] },

{ id: 'futuro', lvl: 'B1', pic: '🔭', title: 'Portugal em 2050', en: 'Portugal in 2050',
  text: `Como será a vida em Portugal daqui a vinte e cinco anos? Os especialistas fazem algumas previsões.

Haverá mais pessoas a trabalhar a partir de casa e menos carros nas cidades. Os elétricos e os comboios serão mais rápidos, e muitos portugueses irão para o trabalho de bicicleta.

Com o calor, os verões serão mais longos e haverá menos água no sul. Os agricultores terão de mudar a forma como cultivam a terra.

E nós? Gostaríamos de viver numa cidade mais verde e mais calma. Seria bom ter mais jardins e menos trânsito. Mas isso dependerá de todos nós.`,
  tr: ["What will life in Portugal be like twenty-five years from now? Experts make some predictions.", "There will be more people working from home and fewer cars in the cities. Trams and trains will be faster, and many Portuguese people will go to work by bike.", "With the heat, summers will be longer and there will be less water in the south. Farmers will have to change the way they farm the land.", "And us? We'd like to live in a greener, calmer city. It would be good to have more parks and less traffic. But that will depend on all of us."],
  gloss: { 'daqui a': 'from now, in … time', especialistas: 'experts', previsões: 'predictions', 'a partir de casa': 'from home', agricultores: 'farmers', cultivam: 'they farm, grow', trânsito: 'traffic', dependerá: 'will depend' },
  qs: [
    { q: 'Como irão muitos portugueses para o trabalho?', en: 'How will many Portuguese people get to work?', o: ['De carro', 'De bicicleta', 'De avião'], a: 1 },
    { q: 'O que acontecerá no sul?', en: 'What will happen in the south?', o: ['Haverá menos água', 'Haverá mais chuva', 'Haverá mais carros'], a: 0 },
    { q: 'O que seria bom, segundo o texto?', en: 'What would be good, according to the text?', o: ['Mais trânsito', 'Verões mais longos', 'Mais jardins e menos trânsito'], a: 2 },
  ] },

{ id: 'conselhos', lvl: 'B1', pic: '📲', title: 'Mensagem para o Tom', en: 'A message for Tom',
  text: `Olá, Tom! Que bom que vens a Lisboa na próxima semana! Aqui ficam algumas dicas.

Quando chegares ao aeroporto, apanha o metro: é rápido e barato. Se tiveres muita bagagem, é melhor apanhar um táxi. Assim que estiveres em casa, manda-me uma mensagem.

Enquanto estiveres cá, podes ficar no quarto de hóspedes. Se quiseres, no sábado vamos a Sintra. E se fizer bom tempo no domingo, vamos à praia da Caparica.

Faz como quiseres: a casa é tua! Até breve,
Inês`,
  tr: ["Hi, Tom! How great that you're coming to Lisbon next week! Here are a few tips.", "When you get to the airport, take the metro: it's quick and cheap. If you have a lot of luggage, it's better to take a taxi. As soon as you're at the house, send me a message.", "While you're here, you can stay in the guest room. If you like, on Saturday we'll go to Sintra. And if the weather is nice on Sunday, we'll go to Caparica beach.", "Do as you like: make yourself at home! See you soon,\nInês"],
  gloss: { dicas: 'tips', bagagem: 'luggage', 'quarto de hóspedes': 'guest room', 'até breve': 'see you soon', 'a casa é tua': 'make yourself at home' },
  qs: [
    { q: 'Como deve o Tom ir do aeroporto, se tiver pouca bagagem?', en: 'How should Tom go from the airport if he has little luggage?', o: ['De metro', 'De táxi', 'A pé'], a: 0 },
    { q: 'Onde vai o Tom ficar?', en: 'Where will Tom stay?', o: ['Num hotel', 'Em Sintra', 'No quarto de hóspedes'], a: 2 },
    { q: 'O que fazem se fizer bom tempo no domingo?', en: 'What will they do if the weather is nice on Sunday?', o: ['Vão a Sintra', 'Vão à praia', 'Ficam em casa'], a: 1 },
  ] },
]);
