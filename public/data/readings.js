/* Azulejo · graded reading (original texts, European Portuguese).
   text: paragraphs separated by a blank line (single line breaks are kept). tr: one English paragraph per Portuguese one.
   gloss: words specific to this text. qs: comprehension questions, a = index of the right option. */
window.AZ_READ = [
{ id: 'ines', lvl: 'A1', pic: '🙋‍♀️', title: 'Olá, eu sou a Inês', en: "Hi, I'm Inês",
  text: `Olá! Chamo-me Inês e tenho vinte e quatro anos. Sou portuguesa e moro em Lisboa, num apartamento pequeno perto do rio.

Sou enfermeira e trabalho num hospital no centro da cidade. Trabalho muito, mas gosto do meu trabalho.

Ao fim de semana, gosto de ir à praia com os meus amigos. Também gosto de ler e de ouvir música. Não gosto de acordar cedo ao domingo!`,
  tr: ["Hi! My name is Inês and I'm twenty-four. I'm Portuguese and I live in Lisbon, in a small flat near the river.", "I'm a nurse and I work in a hospital in the city centre. I work a lot, but I like my job.", "At the weekend, I like going to the beach with my friends. I also like reading and listening to music. I don't like waking up early on Sundays!"],
  gloss: { 'chamo-me': 'my name is (lit. I call myself)', perto: 'near', enfermeira: 'nurse (woman)', centro: 'centre', acordar: 'to wake up' },
  qs: [
    { q: 'Quantos anos tem a Inês?', en: 'How old is Inês?', o: ['Vinte e quatro', 'Vinte e dois', 'Catorze'], a: 0 },
    { q: 'Onde trabalha a Inês?', en: 'Where does Inês work?', o: ['Num restaurante', 'Num hospital', 'Numa escola'], a: 1 },
    { q: 'O que é que a Inês não gosta de fazer?', en: "What doesn't Inês like doing?", o: ['Ir à praia', 'Ouvir música', 'Acordar cedo ao domingo'], a: 2 },
  ] },
{ id: 'familia', lvl: 'A1', pic: '👨‍👩‍👧‍👦', title: 'A família do Tiago', en: "Tiago's family",
  text: `O Tiago tem trinta anos e é do Porto. É casado com a Marta. Eles têm dois filhos: o Duarte, que tem seis anos, e a Leonor, que tem três.

Os pais do Tiago moram numa aldeia perto de Braga. O pai é agricultor e a mãe é professora. Ao domingo, a família almoça sempre em casa dos avós.

A avó faz bacalhau com batatas e o avô conta histórias. As crianças adoram o cão dos avós, o Pirata. É um cão grande, castanho e muito simpático.`,
  tr: ["Tiago is thirty and he's from Porto. He's married to Marta. They have two children: Duarte, who is six, and Leonor, who is three.", "Tiago's parents live in a village near Braga. His father is a farmer and his mother is a teacher. On Sundays, the family always has lunch at the grandparents' house.", "Grandma makes salt cod with potatoes and Grandpa tells stories. The children love their grandparents' dog, Pirata. He's a big, brown and very friendly dog."],
  gloss: { 'casado com': 'married to', 'em casa dos avós': "at the grandparents' house", conta: 'tells', histórias: 'stories', adoram: 'they love' },
  qs: [
    { q: 'Como se chama a mulher do Tiago?', en: "What is Tiago's wife called?", o: ['Leonor', 'Marta', 'Ana'], a: 1 },
    { q: 'Onde moram os pais do Tiago?', en: "Where do Tiago's parents live?", o: ['Numa aldeia perto de Braga', 'No Porto', 'Em Lisboa'], a: 0 },
    { q: 'Como é o cão?', en: 'What is the dog like?', o: ['Pequeno e preto', 'Grande, castanho e simpático', 'Velho e antipático'], a: 1 },
  ] },
{ id: 'cafe', lvl: 'A1', pic: '☕', title: 'No café', en: 'At the café',
  text: `— Bom dia! O que deseja?
— Bom dia. Queria uma bica e um pastel de nata, se faz favor.
— Com canela?
— Sim, com canela. E um copo de água, por favor.

— Aqui tem. Mais alguma coisa?
— Não, obrigado. Quanto é?
— São dois euros e dez.
— Posso pagar com cartão?
— Pode, claro.

— Obrigado e bom dia!
— De nada. Até amanhã!`,
  tr: ["— Good morning! What would you like?\n— Good morning. I'd like an espresso and a custard tart, please.\n— With cinnamon?\n— Yes, with cinnamon. And a glass of water, please.", "— Here you are. Anything else?\n— No, thank you. How much is it?\n— It's two euros ten.\n— Can I pay by card?\n— Of course you can.", "— Thank you and have a good day!\n— You're welcome. See you tomorrow!"],
  gloss: { 'o que deseja?': 'what would you like? (polite)', canela: 'cinnamon', 'aqui tem': 'here you are', 'mais alguma coisa?': 'anything else?', 'quanto é?': 'how much is it?' },
  qs: [
    { q: 'O que pede o cliente para beber?', en: 'What does the customer order to drink?', o: ['Um galão', 'Uma bica e um copo de água', 'Um sumo de laranja'], a: 1 },
    { q: 'Quanto custa tudo?', en: 'How much does it all cost?', o: ['Dois euros e dez', 'Dez euros', 'Um euro e vinte'], a: 0 },
    { q: 'Como paga o cliente?', en: 'How does the customer pay?', o: ['Em dinheiro', 'Não paga', 'Com cartão'], a: 2 },
  ] },
{ id: 'casa', lvl: 'A1', pic: '🏠', title: 'A minha casa', en: 'My home',
  text: `Moro num apartamento no terceiro andar de um prédio antigo, no Porto. A casa não é grande, mas é muito confortável.

Tem dois quartos, uma sala, uma cozinha e uma casa de banho. A sala tem uma varanda com vista para o rio Douro. De manhã, tomo o pequeno-almoço na varanda quando está sol.

O meu quarto é pequeno. Tem uma cama, um armário e uma mesa com o meu computador. A cozinha é a minha parte preferida da casa: é amarela e tem sempre cheiro a café.`,
  tr: ["I live in a flat on the third floor of an old building, in Porto. The place isn't big, but it's very comfortable.", "It has two bedrooms, a living room, a kitchen and a bathroom. The living room has a balcony with a view of the river Douro. In the morning, I have breakfast on the balcony when it's sunny.", "My bedroom is small. It has a bed, a wardrobe and a table with my computer. The kitchen is my favourite part of the flat: it's yellow and it always smells of coffee."],
  gloss: { prédio: 'building, block of flats', 'vista para': 'a view of', parte: 'part', preferida: 'favourite', cheiro: 'smell' },
  qs: [
    { q: 'Em que andar é o apartamento?', en: 'Which floor is the flat on?', o: ['No rés-do-chão', 'No primeiro andar', 'No terceiro andar'], a: 2 },
    { q: 'Onde toma o pequeno-almoço quando está sol?', en: "Where is breakfast when it's sunny?", o: ['Na varanda', 'Na cozinha', 'No quarto'], a: 0 },
    { q: 'De que cor é a cozinha?', en: 'What colour is the kitchen?', o: ['Azul', 'Amarela', 'Branca'], a: 1 },
  ] },
{ id: 'rotina', lvl: 'A1', pic: '⏰', title: 'Um dia normal', en: 'An ordinary day',
  text: `O Rui é programador e trabalha em Lisboa. Levanta-se às sete da manhã, toma duche e veste-se depressa. Toma o pequeno-almoço em casa: café com leite e uma torrada.

Às oito e um quarto, apanha o metro para o escritório. Começa a trabalhar às nove. Ao meio-dia e meia, almoça com os colegas num restaurante perto do escritório.

Sai do trabalho às seis. Às terças e quintas vai ao ginásio. Janta às oito e meia, vê uma série e deita-se às onze. Antes de dormir, lê sempre um pouco.`,
  tr: ['Rui is a programmer and works in Lisbon. He gets up at seven in the morning, has a shower and gets dressed quickly. He has breakfast at home: white coffee and a slice of toast.', 'At quarter past eight, he catches the metro to the office. He starts work at nine. At half past twelve, he has lunch with his colleagues at a restaurant near the office.', 'He leaves work at six. On Tuesdays and Thursdays he goes to the gym. He has dinner at half past eight, watches a series and goes to bed at eleven. Before going to sleep, he always reads a little.'],
  gloss: { 'levanta-se': 'he gets up', 'veste-se': 'he gets dressed', apanha: 'he catches', 'às terças e quintas': 'on Tuesdays and Thursdays', 'deita-se': 'he goes to bed', 'um pouco': 'a little' },
  qs: [
    { q: 'A que horas se levanta o Rui?', en: 'What time does Rui get up?', o: ['Às sete', 'Às oito', 'Às nove'], a: 0 },
    { q: 'Como vai o Rui para o escritório?', en: 'How does Rui get to the office?', o: ['De carro', 'De metro', 'A pé'], a: 1 },
    { q: 'O que faz o Rui antes de dormir?', en: 'What does Rui do before sleeping?', o: ['Vai ao ginásio', 'Toma duche', 'Lê um pouco'], a: 2 },
  ] },
{ id: 'mercado', lvl: 'A1', pic: '🍊', title: 'No mercado', en: 'At the market',
  text: `Hoje é sábado e a Sofia vai ao mercado com a avó. O mercado é grande e tem muita fruta, legumes, peixe e flores.

— Bom dia! Quanto custam as laranjas?
— Custam um euro e meio o quilo. São do Algarve, muito doces!
— Então quero dois quilos, se faz favor. E meio quilo de morangos.

A avó também compra tomates, cebolas e uma alface para a salada. No fim, compram sardinhas para o almoço. A Sofia leva os sacos, mas são muito pesados!`,
  tr: ["Today is Saturday and Sofia is going to the market with her grandmother. The market is big and has lots of fruit, vegetables, fish and flowers.", "— Good morning! How much are the oranges?\n— They're one euro fifty a kilo. They're from the Algarve, very sweet!\n— Then I'll have two kilos, please. And half a kilo of strawberries.", "Grandma also buys tomatoes, onions and a lettuce for the salad. At the end, they buy sardines for lunch. Sofia carries the bags, but they're very heavy!"],
  gloss: { 'o quilo': 'per kilo', então: 'then, so', 'no fim': 'at the end', leva: 'carries' },
  qs: [
    { q: 'Com quem vai a Sofia ao mercado?', en: 'Who does Sofia go to the market with?', o: ['Com a mãe', 'Sozinha', 'Com a avó'], a: 2 },
    { q: 'Quanto custa um quilo de laranjas?', en: 'How much is a kilo of oranges?', o: ['Um euro e meio', 'Dois euros', 'Meio euro'], a: 0 },
    { q: 'O que compram para o almoço?', en: 'What do they buy for lunch?', o: ['Frango', 'Sardinhas', 'Bacalhau'], a: 1 },
  ] },
{ id: 'sintra', lvl: 'A2', pic: '🏰', title: 'Fim de semana em Sintra', en: 'A weekend in Sintra',
  text: `No sábado passado, eu e a minha irmã fomos a Sintra. Apanhámos o comboio no Rossio às nove da manhã e chegámos a Sintra quarenta minutos depois.

Primeiro, visitámos o Palácio da Pena. Subimos a pé, porque o autocarro estava cheio. O palácio é amarelo e vermelho e parece um castelo de um conto de fadas! Depois, andámos pelo parque e tirámos muitas fotografias.

Ao almoço, comemos num restaurante pequeno no centro da vila. À tarde, provámos os famosos travesseiros, uns bolos doces de massa folhada. Voltámos para Lisboa às sete, muito cansadas mas muito contentes.`,
  tr: ['Last Saturday, my sister and I went to Sintra. We caught the train at Rossio at nine in the morning and arrived in Sintra forty minutes later.', 'First, we visited the Pena Palace. We walked up, because the bus was full. The palace is yellow and red and looks like a castle from a fairy tale! Then we walked around the park and took lots of photos.', 'For lunch, we ate at a small restaurant in the centre of the town. In the afternoon, we tried the famous travesseiros, sweet puff-pastry cakes. We went back to Lisbon at seven, very tired but very happy.'],
  gloss: { fomos: 'we went', apanhámos: 'we caught', 'subimos a pé': 'we walked up', 'conto de fadas': 'fairy tale', vila: 'small town', provámos: 'we tasted, tried', 'massa folhada': 'puff pastry', cansadas: 'tired (women)' },
  qs: [
    { q: 'Como foram para Sintra?', en: 'How did they get to Sintra?', o: ['De carro', 'De comboio', 'De autocarro'], a: 1 },
    { q: 'Porque subiram a pé?', en: 'Why did they walk up?', o: ['Porque o autocarro estava cheio', 'Porque é mais barato', 'Porque gostam de andar'], a: 0 },
    { q: 'O que são os travesseiros?', en: 'What are travesseiros?', o: ['Um palácio', 'Um tipo de peixe', 'Bolos doces'], a: 2 },
    { q: 'Como estavam quando voltaram?', en: 'How were they when they got back?', o: ['Cansadas mas contentes', 'Tristes', 'Zangadas'], a: 0 },
  ] },
{ id: 'infancia', lvl: 'A2', pic: '🌻', title: 'Quando eu era pequena', en: 'When I was little',
  text: `Quando eu era pequena, vivia numa aldeia no Alentejo, com os meus avós. A casa era branca, com janelas azuis, e tinha um jardim enorme com laranjeiras.

Todas as manhãs, o meu avô acordava muito cedo e ia para o campo. A minha avó fazia pão no forno e o cheiro enchia a casa toda. Eu brincava na rua com os outros miúdos da aldeia até à hora do jantar.

No verão, estava muito calor. À tarde, ninguém saía de casa. À noite, os vizinhos sentavam-se à porta e conversavam até tarde. Eu adormecia a ouvir as histórias deles. Tenho muitas saudades desse tempo.`,
  tr: ['When I was little, I lived in a village in the Alentejo, with my grandparents. The house was white, with blue windows, and it had a huge garden with orange trees.', 'Every morning, my grandfather would wake up very early and go out to the fields. My grandmother used to bake bread in the oven and the smell filled the whole house. I used to play in the street with the other village kids until dinner time.', 'In summer, it was very hot. In the afternoon, nobody left the house. In the evening, the neighbours would sit by their doors and chat until late. I used to fall asleep listening to their stories. I really miss those days.'],
  gloss: { 'era pequena': 'I was little', vivia: 'I used to live', laranjeiras: 'orange trees', enorme: 'huge', enchia: 'filled', 'à porta': 'at the door', adormecia: 'I used to fall asleep', 'tenho saudades': 'I miss' },
  qs: [
    { q: 'Com quem vivia ela?', en: 'Who did she live with?', o: ['Com os pais', 'Com os avós', 'Sozinha'], a: 1 },
    { q: 'O que fazia a avó?', en: 'What did her grandmother make?', o: ['Pão', 'Bolos', 'Sopa'], a: 0 },
    { q: 'O que faziam os vizinhos à noite?', en: 'What did the neighbours do in the evening?', o: ['Viam televisão', 'Iam à praia', 'Conversavam à porta'], a: 2 },
  ] },
{ id: 'eletrico', lvl: 'A2', pic: '🚋', title: 'O elétrico 28', en: 'Tram 28',
  text: `O elétrico 28 é uma das atrações mais famosas de Lisboa. É amarelo, antigo e passa pelos bairros mais típicos da cidade: a Graça, Alfama, a Baixa e a Estrela.

Uma turista pergunta a um senhor: — Desculpe, onde fica a paragem do 28? O senhor responde: — Siga em frente até à praça e vire à esquerda. A paragem fica ao lado de uma pastelaria. Mas atenção: vá cedo, porque à tarde há sempre muita gente!

Dentro do elétrico, as ruas são tão estreitas que quase podemos tocar nas paredes das casas. Guarde bem a carteira e o telemóvel, e aproveite a viagem: a vista de Lisboa é linda.`,
  tr: ['Tram 28 is one of the most famous attractions in Lisbon. It is yellow, old and goes through the most typical neighbourhoods of the city: Graça, Alfama, Baixa and Estrela.', 'A tourist asks a man: "Excuse me, where is the stop for the 28?" He answers: "Go straight on to the square and turn left. The stop is next to a pastry shop. But watch out: go early, because in the afternoon there are always crowds!"', 'Inside the tram, the streets are so narrow that you can almost touch the walls of the houses. Keep your wallet and phone safe, and enjoy the ride: the view of Lisbon is beautiful.'],
  gloss: { atrações: 'attractions', 'passa pelos': 'goes through the', 'siga em frente': 'go straight on', 'vire à esquerda': 'turn left', atenção: 'watch out', 'muita gente': 'lots of people', estreitas: 'narrow', quase: 'almost', linda: 'beautiful' },
  qs: [
    { q: 'De que cor é o elétrico 28?', en: 'What colour is tram 28?', o: ['Amarelo', 'Vermelho', 'Azul'], a: 0 },
    { q: 'Onde fica a paragem?', en: 'Where is the stop?', o: ['Em frente do rio', 'Ao lado de uma pastelaria', 'Dentro de um museu'], a: 1 },
    { q: 'Porque é melhor ir cedo?', en: 'Why is it better to go early?', o: ['Porque é mais barato', 'Porque o elétrico não passa à tarde', 'Porque à tarde há muita gente'], a: 2 },
  ] },
{ id: 'mensagem', lvl: 'A2', pic: '📱', title: 'Uma mensagem para a Joana', en: 'A message to Joana',
  text: `Olá, Joana! Tudo bem? Queria contar-te os meus planos para as férias. Em agosto, vou passar duas semanas no Algarve com o Miguel. Vamos ficar num apartamento em Lagos, perto da praia.

Vamos fazer muitas coisas: nadar, fazer surf, visitar as grutas de barco e comer muito peixe grelhado! Também queremos ir a Sagres ver o pôr do sol.

Queres vir connosco? O apartamento tem um quarto livre. Podes apanhar o comboio em Lisboa no dia 10 e nós vamos buscar-te à estação. Diz-me alguma coisa até sexta-feira!
Beijinhos, Ana`,
  tr: ["Hi, Joana! How are you? I wanted to tell you my holiday plans. In August, I'm going to spend two weeks in the Algarve with Miguel. We're going to stay in a flat in Lagos, near the beach.", "We're going to do lots of things: swim, surf, visit the caves by boat and eat lots of grilled fish! We also want to go to Sagres to watch the sunset.", "Do you want to come with us? The flat has a spare room. You can catch the train in Lisbon on the 10th and we'll pick you up at the station. Let me know by Friday!\nLove, Ana"],
  gloss: { 'contar-te': 'to tell you', passar: 'to spend (time)', grutas: 'caves', grelhado: 'grilled', 'pôr do sol': 'sunset', connosco: 'with us', 'buscar-te': 'to pick you up', 'diz-me alguma coisa': 'let me know', beijinhos: 'love (lit. little kisses)' },
  qs: [
    { q: 'Onde vão ficar a Ana e o Miguel?', en: 'Where will Ana and Miguel stay?', o: ['Num hotel em Faro', 'Num apartamento em Lagos', 'Em casa da Joana'], a: 1 },
    { q: 'O que querem ver em Sagres?', en: 'What do they want to see in Sagres?', o: ['O pôr do sol', 'Um museu', 'Um jogo de futebol'], a: 0 },
    { q: 'Até quando deve a Joana responder?', en: 'When should Joana reply by?', o: ['Até domingo', 'Até agosto', 'Até sexta-feira'], a: 2 },
  ] },
{ id: 'medico', lvl: 'A2', pic: '🩺', title: 'No médico', en: "At the doctor's",
  text: `— Bom dia, senhor Costa. Então, o que é que se passa?
— Bom dia, doutora. Não me sinto bem. Dói-me muito a cabeça e a garganta, e tenho febre desde ontem.
— Tem tosse?
— Tenho, sobretudo à noite. E estou muito cansado.

— Vamos ver… Abra a boca, se faz favor. Pois, a garganta está muito vermelha. Acho que é gripe.
— É grave?
— Não, não se preocupe. Tome este medicamento três vezes por dia, depois das refeições. Beba muita água, descanse e fique em casa pelo menos três dias.

— Muito obrigado, doutora.
— De nada. As melhoras!`,
  tr: ["— Good morning, Mr Costa. So, what's the matter?\n— Good morning, doctor. I don't feel well. My head and my throat really hurt, and I've had a temperature since yesterday.\n— Do you have a cough?\n— I do, especially at night. And I'm very tired.", "— Let's see… Open your mouth, please. Yes, your throat is very red. I think it's flu.\n— Is it serious?\n— No, don't worry. Take this medicine three times a day, after meals. Drink lots of water, rest and stay at home for at least three days.", "— Thank you very much, doctor.\n— You're welcome. Get well soon!"],
  gloss: { 'o que é que se passa?': "what's the matter?", 'não me sinto bem': "I don't feel well", garganta: 'throat', desde: 'since', sobretudo: 'especially', grave: 'serious', medicamento: 'medicine', 'pelo menos': 'at least', 'as melhoras!': 'get well soon!' },
  qs: [
    { q: 'O que dói ao senhor Costa?', en: 'What hurts Mr Costa?', o: ['As costas', 'A cabeça e a garganta', 'Os pés'], a: 1 },
    { q: 'O que acha a médica?', en: 'What does the doctor think?', o: ['Que é gripe', 'Que não é nada', 'Que é uma alergia'], a: 0 },
    { q: 'Quantos dias deve ficar em casa?', en: 'How many days should he stay at home?', o: ['Um', 'Uma semana', 'Pelo menos três'], a: 2 },
  ] },
{ id: 'saojoao', lvl: 'A2', pic: '🎉', title: 'O São João no Porto', en: 'São João in Porto',
  text: `Na noite de 23 para 24 de junho, o Porto celebra o São João, a maior festa da cidade. As ruas enchem-se de gente, música e cheiro a sardinhas assadas.

É uma tradição muito antiga e um pouco estranha: as pessoas andam pelas ruas com martelos de plástico e batem na cabeça umas das outras! Ninguém se zanga, porque é tudo a brincar. Também se compram vasos de manjericos, pequenas plantas com uma quadra, um poema curto de amor.

À meia-noite, há fogo de artifício sobre o rio Douro. Depois, muitos jovens descem até à praia e ficam acordados até ao nascer do sol. No dia seguinte, a cidade dorme até tarde.`,
  tr: ["On the night of 23 to 24 June, Porto celebrates São João, the city's biggest festival. The streets fill with people, music and the smell of grilled sardines.", "It's a very old and slightly strange tradition: people walk the streets with plastic hammers and bop each other on the head! Nobody gets angry, because it's all in fun. People also buy little pots of manjerico, a small basil plant that comes with a quadra, a short love poem.", 'At midnight, there are fireworks over the river Douro. Afterwards, many young people head down to the beach and stay up until sunrise. The next day, the whole city sleeps in.'],
  gloss: { 'enchem-se de': 'fill up with', assadas: 'grilled, roasted', estranha: 'strange', martelos: 'hammers', 'umas das outras': 'each other', 'a brincar': 'in fun', manjericos: 'small basil plants', quadra: 'four-line poem', 'fogo de artifício': 'fireworks', 'nascer do sol': 'sunrise' },
  qs: [
    { q: 'Quando é o São João?', en: 'When is São João?', o: ['No Natal', 'Na noite de 23 para 24 de junho', 'Em agosto'], a: 1 },
    { q: 'O que usam as pessoas para bater na cabeça?', en: 'What do people use to bop heads?', o: ['Martelos de plástico', 'Flores', 'Sardinhas'], a: 0 },
    { q: 'O que há à meia-noite?', en: 'What happens at midnight?', o: ['Um concerto de fado', 'Um jogo de futebol', 'Fogo de artifício'], a: 2 },
  ] },
{ id: 'saudade', lvl: 'B1', pic: '💭', title: 'A saudade', en: 'Saudade',
  text: `Dizem que "saudade" é uma das palavras mais difíceis de traduzir. Não é só tristeza, nem só nostalgia: é a falta de alguém ou de alguma coisa que amamos e que está longe — ou que talvez nunca volte. Ao mesmo tempo, é um sentimento doce, porque nos lembra o que foi bom.

Os portugueses sentem saudades de tudo: da família que emigrou, da terra onde nasceram, das férias de verão, de uma comida da infância. Durante séculos, muitos homens partiram para o mar, e as mulheres ficaram à espera nos portos. Talvez seja por isso que a saudade se tornou parte da identidade nacional.

O fado, a canção tradicional de Lisboa e de Coimbra, é a melhor expressão deste sentimento. Quando uma fadista canta, mesmo quem não percebe as palavras sente a emoção. Em 2011, a UNESCO declarou o fado Património Cultural Imaterial da Humanidade.`,
  tr: ["They say \"saudade\" is one of the hardest words to translate. It isn't just sadness, nor just nostalgia: it's missing someone or something we love that is far away — or that may never come back. At the same time it is a sweet feeling, because it reminds us of what was good.", "The Portuguese feel saudade for everything: for family who emigrated, for the place they were born, for summer holidays, for a dish from childhood. For centuries, many men set off to sea and the women stayed behind, waiting in the ports. Perhaps that's why saudade became part of the national identity.", "Fado, the traditional song of Lisbon and Coimbra, is the best expression of this feeling. When a fado singer sings, even people who don't understand the words feel the emotion. In 2011, UNESCO declared fado part of the Intangible Cultural Heritage of Humanity."],
  gloss: { traduzir: 'to translate', falta: 'absence, lack', 'ao mesmo tempo': 'at the same time', 'nos lembra': 'reminds us', emigrou: 'emigrated', infância: 'childhood', séculos: 'centuries', 'à espera': 'waiting', 'se tornou': 'became', fadista: 'fado singer', 'Património Cultural Imaterial': 'Intangible Cultural Heritage' },
  qs: [
    { q: 'Segundo o texto, a saudade é…', en: 'According to the text, saudade is…', o: ['Só alegria', 'Tristeza e doçura ao mesmo tempo', 'Só tristeza'], a: 1 },
    { q: 'Porque é que a saudade pode ser parte da identidade nacional?', en: 'Why might saudade be part of the national identity?', o: ['Porque muitos homens partiram para o mar', 'Porque Portugal é pequeno', 'Porque chove muito'], a: 0 },
    { q: 'O que aconteceu em 2011?', en: 'What happened in 2011?', o: ['O fado nasceu em Coimbra', 'Abriu um museu do fado', 'A UNESCO declarou o fado património'], a: 2 },
  ] },
{ id: 'lotaria', lvl: 'B1', pic: '🎰', title: 'Se eu ganhasse a lotaria…', en: 'If I won the lottery…',
  text: `A Beatriz e o Rui estão a jantar e a sonhar acordados.
— Se ganhasses a lotaria, o que farias? — pergunta a Beatriz.
— Primeiro, deixava de trabalhar! — ri-se o Rui. — Depois comprava uma casa antiga no Douro, com vinhas, e fazia o meu próprio vinho. E tu?

— Eu não deixaria o meu trabalho, gosto muito de ensinar. Mas viajaria muito mais. Se tivesse dinheiro, ia ao Japão, à Argentina e à Islândia. E ajudaria a minha família: os meus pais trabalharam muito a vida inteira.
— Achas que o dinheiro traz felicidade?
— Acho que não traz, mas ajuda bastante! — responde ela.

No fim do jantar, olham um para o outro e riem-se. Afinal, nenhum dos dois jogou na lotaria esta semana.`,
  tr: ["Beatriz and Rui are having dinner and daydreaming.\n\"If you won the lottery, what would you do?\" asks Beatriz.\n\"First, I'd stop working!\" laughs Rui. \"Then I'd buy an old house in the Douro, with vineyards, and make my own wine. And you?\"", "\"I wouldn't leave my job, I love teaching. But I'd travel much more. If I had money, I'd go to Japan, Argentina and Iceland. And I'd help my family: my parents worked hard their whole lives.\"\n\"Do you think money brings happiness?\"\n\"I don't think it does, but it helps a lot!\" she replies.", "At the end of dinner, they look at each other and laugh. After all, neither of them played the lottery this week."],
  gloss: { 'sonhar acordados': 'to daydream', ganhasses: 'you won (if…)', 'deixava de': 'I would stop', vinhas: 'vineyards', 'o meu próprio': 'my own', 'a vida inteira': 'their whole lives', felicidade: 'happiness', 'um para o outro': 'at each other', afinal: 'after all', 'nenhum dos dois': 'neither of them' },
  qs: [
    { q: 'O que faria o Rui primeiro?', en: 'What would Rui do first?', o: ['Deixava de trabalhar', 'Viajava pelo mundo', 'Comprava um carro'], a: 0 },
    { q: 'Porque é que a Beatriz não deixaria o trabalho?', en: "Why wouldn't Beatriz leave her job?", o: ['Porque precisa de dinheiro', 'Porque gosta de ensinar', 'Porque o chefe é simpático'], a: 1 },
    { q: 'Qual é a ironia no fim?', en: 'What is the irony at the end?', o: ['Eles ganharam a lotaria', 'O jantar foi caro', 'Nenhum deles jogou na lotaria'], a: 2 },
  ] },
{ id: 'nata', lvl: 'B1', pic: '🥧', title: 'A história do pastel de nata', en: 'The story of the custard tart',
  text: `Hoje, o pastel de nata vende-se em todo o mundo, de Londres a Macau. Mas a sua história começou há mais de duzentos anos, no Mosteiro dos Jerónimos, em Belém.

Nessa época, os conventos usavam muitas claras de ovo para engomar a roupa. Sobravam as gemas, e os monges e as freiras usavam-nas para fazer doces. Assim nasceram muitos doces conventuais portugueses, como os ovos moles de Aveiro e os pastéis de nata.

Em 1834, as ordens religiosas foram extintas e os monges ficaram sem dinheiro. Para sobreviver, começaram a vender os pastéis numa loja perto do mosteiro. Mais tarde, a receita foi vendida a uma família, que em 1837 abriu a famosa Fábrica dos Pastéis de Belém. A receita original continua secreta até hoje: dizem que só três pessoas a conhecem.`,
  tr: ['Today the custard tart is sold all over the world, from London to Macau. But its story began more than two hundred years ago, in the Jerónimos Monastery, in Belém.', "At that time, convents used lots of egg whites to starch clothes. The yolks were left over, and monks and nuns used them to make sweets. That's how many Portuguese convent sweets were born, like Aveiro's ovos moles and custard tarts.", 'In 1834, the religious orders were dissolved and the monks were left with no money. To survive, they started selling the tarts in a shop near the monastery. Later the recipe was sold to a family, who in 1837 opened the famous Pastéis de Belém bakery. The original recipe is still secret today: they say only three people know it.'],
  gloss: { 'vende-se': 'is sold', mosteiro: 'monastery', 'nessa época': 'at that time', claras: 'egg whites', engomar: 'to starch', sobravam: 'were left over', gemas: 'yolks', monges: 'monks', freiras: 'nuns', 'foram extintas': 'were dissolved', sobreviver: 'to survive', 'continua secreta': 'is still secret' },
  qs: [
    { q: 'Onde nasceu o pastel de nata?', en: 'Where was the custard tart born?', o: ['Em Londres', 'Em Aveiro', 'No Mosteiro dos Jerónimos'], a: 2 },
    { q: 'Para que usavam as claras de ovo?', en: 'What were the egg whites used for?', o: ['Para engomar a roupa', 'Para fazer pão', 'Para pintar azulejos'], a: 0 },
    { q: 'Segundo o texto, quantas pessoas conhecem a receita original?', en: 'How many people know the original recipe?', o: ['Ninguém', 'Só três', 'Toda a família'], a: 1 },
  ] },
{ id: 'aldeia', lvl: 'B1', pic: '💻', title: 'Teletrabalho na aldeia', en: 'Remote work in the village',
  text: `Nos últimos anos, cada vez mais pessoas trocaram as grandes cidades por aldeias do interior de Portugal. Com o teletrabalho, basta que haja uma boa ligação à internet para trabalhar a partir de qualquer lugar.

A Marta, designer de Lisboa, mudou-se para uma aldeia na Serra da Estrela. "Aqui a vida é mais calma e as casas são muito mais baratas", explica. "É importante que as aldeias tenham gente nova, senão morrem." Os vizinhos, quase todos reformados, receberam-na de braços abertos.

Mas nem tudo é perfeito. No inverno faz muito frio, o hospital mais próximo fica a quarenta minutos e às vezes a internet falha. "Duvido que toda a gente se adapte", admite a Marta. "Mas, para mim, valeu a pena. Espero que mais pessoas venham descobrir o interior."`,
  tr: ['In recent years, more and more people have swapped the big cities for villages in inland Portugal. With remote work, all you need is a good internet connection to work from anywhere.', '"Life here is calmer and houses are much cheaper," explains Marta, a designer from Lisbon who moved to a village in the Serra da Estrela. "It\'s important that villages have young people, otherwise they die." Her neighbours, almost all retired, welcomed her with open arms.', 'But not everything is perfect. In winter it gets very cold, the nearest hospital is forty minutes away and sometimes the internet drops. "I doubt everyone would adapt," Marta admits. "But for me it was worth it. I hope more people come and discover the interior."'],
  gloss: { 'cada vez mais': 'more and more', trocaram: 'swapped', interior: 'inland Portugal', 'basta que haja': 'all you need is', ligação: 'connection', 'a partir de': 'from', 'mudou-se': 'moved house', senão: 'otherwise', 'de braços abertos': 'with open arms', falha: 'fails, drops', 'valeu a pena': 'it was worth it' },
  qs: [
    { q: 'Para onde se mudou a Marta?', en: 'Where did Marta move to?', o: ['Para Lisboa', 'Para uma aldeia na Serra da Estrela', 'Para o Algarve'], a: 1 },
    { q: 'Segundo a Marta, porque é importante que as aldeias tenham gente nova?', en: 'Why, according to Marta, do villages need young people?', o: ['Senão morrem', 'Porque as casas são caras', 'Porque há muitos turistas'], a: 0 },
    { q: 'Qual destes problemas NÃO é mencionado?', en: 'Which problem is NOT mentioned?', o: ['O frio no inverno', 'A internet às vezes falha', 'Os vizinhos são antipáticos'], a: 2 },
  ] },
{ id: 'gato', lvl: 'B1', pic: '🐈‍⬛', title: 'O mistério do gato da vizinha', en: "The mystery of the neighbour's cat",
  text: `Todas as manhãs, quando eu saía para o trabalho, o gato da Dona Glória estava sentado no muro do jardim. Era um gato preto e enorme, chamado Comendador, e olhava para mim como se eu lhe devesse dinheiro.

Numa segunda-feira, reparei que o Comendador não estava no muro. Também não apareceu na terça nem na quarta. Na quinta, encontrei a Dona Glória na escada, muito preocupada: "Já procurei em todo o bairro. Se o vires, avisa-me, por favor!"

Nessa noite, ouvi um barulho estranho na minha varanda. Abri a porta devagar e lá estava ele, a comer a comida que eu tinha deixado para os pássaros! Afinal, o Comendador tinha descoberto um restaurante novo. Quando o devolvi à Dona Glória, ela deu-me um bolo enorme. Desde então, o gato visita-me todos os dias — e eu compro mais comida para os pássaros.`,
  tr: ["Every morning, when I left for work, Dona Glória's cat was sitting on the garden wall. He was a huge black cat called Comendador, and he looked at me as if I owed him money.", "One Monday, I noticed Comendador wasn't on the wall. He didn't turn up on Tuesday or Wednesday either. On Thursday, I bumped into Dona Glória on the stairs, very worried: \"I've already looked all over the neighbourhood. If you see him, let me know, please!\"", "That night, I heard a strange noise on my balcony. I opened the door slowly and there he was, eating the food I'd left out for the birds! It turned out Comendador had found a new restaurant. When I brought him back to Dona Glória, she gave me an enormous cake. Since then the cat visits me every day — and I buy more bird food."],
  gloss: { muro: 'garden wall', 'como se eu lhe devesse': 'as if I owed him', reparei: 'I noticed', 'nem na quarta': 'nor on Wednesday', 'se o vires': 'if you see him', barulho: 'noise', 'tinha deixado': 'had left', 'tinha descoberto': 'had discovered', devolvi: 'I gave back', 'desde então': 'since then' },
  qs: [
    { q: 'Onde estava o gato todas as manhãs?', en: 'Where was the cat every morning?', o: ['Na cozinha', 'No telhado', 'No muro do jardim'], a: 2 },
    { q: 'O que pediu a Dona Glória?', en: 'What did Dona Glória ask?', o: ['Que o vizinho a avisasse se visse o gato', 'Um bolo', 'Comida para os pássaros'], a: 0 },
    { q: 'Onde estava o gato, afinal?', en: 'Where was the cat in the end?', o: ['Num restaurante do bairro', 'Na varanda do vizinho, a comer', 'Em casa da Dona Glória'], a: 1 },
  ] },
];
