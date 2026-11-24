/* Azulejo · graded reading (original texts, European Portuguese).
   text: paragraphs separated by a blank line (single line breaks are kept). tr: one Dutch paragraph per Portuguese one.
   gloss: words specific to this text. qs: comprehension questions, a = index of the right option. */
window.AZ_READ = [
{ id: 'ines', lvl: 'A1', pic: '🙋‍♀️', title: 'Olá, eu sou a Inês', en: 'Hoi, ik ben Inês',
  text: `Olá! Chamo-me Inês e tenho vinte e quatro anos. Sou portuguesa e moro em Lisboa, num apartamento pequeno perto do rio.

Sou enfermeira e trabalho num hospital no centro da cidade. Trabalho muito, mas gosto do meu trabalho.

Ao fim de semana, gosto de ir à praia com os meus amigos. Também gosto de ler e de ouvir música. Não gosto de acordar cedo ao domingo!`,
  tr: ['Hoi! Ik heet Inês en ik ben vierentwintig. Ik ben Portugese en ik woon in Lissabon, in een klein appartement vlak bij de rivier.', 'Ik ben verpleegkundige en ik werk in een ziekenhuis in het centrum van de stad. Ik werk veel, maar ik vind mijn werk leuk.', 'In het weekend ga ik graag met mijn vrienden naar het strand. Ik lees ook graag en ik luister graag naar muziek. Ik vind het niet leuk om op zondag vroeg wakker te worden!'],
  gloss: { 'chamo-me': 'ik heet (letterlijk: ik noem mezelf)', perto: 'dichtbij', enfermeira: 'verpleegkundige (vrouw)', centro: 'centrum', acordar: 'wakker worden' },
  qs: [
    { q: 'Quantos anos tem a Inês?', en: 'Hoe oud is Inês?', o: ['Vinte e quatro', 'Vinte e dois', 'Catorze'], a: 0 },
    { q: 'Onde trabalha a Inês?', en: 'Waar werkt Inês?', o: ['Num restaurante', 'Num hospital', 'Numa escola'], a: 1 },
    { q: 'O que é que a Inês não gosta de fazer?', en: 'Wat doet Inês niet graag?', o: ['Ir à praia', 'Ouvir música', 'Acordar cedo ao domingo'], a: 2 },
  ] },
{ id: 'familia', lvl: 'A1', pic: '👨‍👩‍👧‍👦', title: 'A família do Tiago', en: 'De familie van Tiago',
  text: `O Tiago tem trinta anos e é do Porto. É casado com a Marta. Eles têm dois filhos: o Duarte, que tem seis anos, e a Leonor, que tem três.

Os pais do Tiago moram numa aldeia perto de Braga. O pai é agricultor e a mãe é professora. Ao domingo, a família almoça sempre em casa dos avós.

A avó faz bacalhau com batatas e o avô conta histórias. As crianças adoram o cão dos avós, o Pirata. É um cão grande, castanho e muito simpático.`,
  tr: ['Tiago is dertig en hij komt uit Porto. Hij is getrouwd met Marta. Ze hebben twee kinderen: Duarte, die zes is, en Leonor, die drie is.', 'De ouders van Tiago wonen in een dorp bij Braga. Zijn vader is boer en zijn moeder is lerares. Op zondag luncht de familie altijd bij opa en oma.', 'Oma maakt bakkeljauw met aardappelen en opa vertelt verhalen. De kinderen zijn dol op de hond van opa en oma, Pirata. Het is een grote, bruine en heel lieve hond.'],
  gloss: { 'casado com': 'getrouwd met', 'em casa dos avós': 'bij opa en oma thuis', conta: 'vertelt', 'histórias': 'verhalen', adoram: 'ze zijn dol op' },
  qs: [
    { q: 'Como se chama a mulher do Tiago?', en: 'Hoe heet de vrouw van Tiago?', o: ['Leonor', 'Marta', 'Ana'], a: 1 },
    { q: 'Onde moram os pais do Tiago?', en: 'Waar wonen de ouders van Tiago?', o: ['Numa aldeia perto de Braga', 'No Porto', 'Em Lisboa'], a: 0 },
    { q: 'Como é o cão?', en: 'Hoe is de hond?', o: ['Pequeno e preto', 'Grande, castanho e simpático', 'Velho e antipático'], a: 1 },
  ] },
{ id: 'cafe', lvl: 'A1', pic: '☕', title: 'No café', en: 'In het café',
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
  tr: ['— Goedemorgen! Wat mag het zijn?\n— Goedemorgen. Ik wil graag een espresso en een roomtaartje, alstublieft.\n— Met kaneel?\n— Ja, met kaneel. En een glas water, alstublieft.', '— Alstublieft. Verder nog iets?\n— Nee, dank u. Hoeveel is het?\n— Dat is twee euro tien.\n— Kan ik met de kaart betalen?\n— Natuurlijk.', '— Dank u wel en een fijne dag!\n— Graag gedaan. Tot morgen!'],
  gloss: { 'o que deseja?': 'wat mag het zijn? (beleefd)', canela: 'kaneel', 'aqui tem': 'alstublieft (bij het geven)', 'mais alguma coisa?': 'verder nog iets?', 'quanto é?': 'hoeveel is het?' },
  qs: [
    { q: 'O que pede o cliente para beber?', en: 'Wat bestelt de klant om te drinken?', o: ['Um galão', 'Uma bica e um copo de água', 'Um sumo de laranja'], a: 1 },
    { q: 'Quanto custa tudo?', en: 'Hoeveel kost alles samen?', o: ['Dois euros e dez', 'Dez euros', 'Um euro e vinte'], a: 0 },
    { q: 'Como paga o cliente?', en: 'Hoe betaalt de klant?', o: ['Em dinheiro', 'Não paga', 'Com cartão'], a: 2 },
  ] },
{ id: 'casa', lvl: 'A1', pic: '🏠', title: 'A minha casa', en: 'Mijn huis',
  text: `Moro num apartamento no terceiro andar de um prédio antigo, no Porto. A casa não é grande, mas é muito confortável.

Tem dois quartos, uma sala, uma cozinha e uma casa de banho. A sala tem uma varanda com vista para o rio Douro. De manhã, tomo o pequeno-almoço na varanda quando está sol.

O meu quarto é pequeno. Tem uma cama, um armário e uma mesa com o meu computador. A cozinha é a minha parte preferida da casa: é amarela e tem sempre cheiro a café.`,
  tr: ['Ik woon in een appartement op de derde verdieping van een oud gebouw, in Porto. Het is niet groot, maar wel heel gezellig.', 'Het heeft twee slaapkamers, een woonkamer, een keuken en een badkamer. De woonkamer heeft een balkon met uitzicht op de rivier de Douro. \'s Ochtends ontbijt ik op het balkon als de zon schijnt.', 'Mijn slaapkamer is klein. Er staan een bed, een kast en een tafel met mijn computer. De keuken is mijn favoriete deel van het appartement: hij is geel en het ruikt er altijd naar koffie.'],
  gloss: { 'prédio': 'gebouw, flatgebouw', 'vista para': 'uitzicht op', parte: 'deel', preferida: 'favoriete', cheiro: 'geur' },
  qs: [
    { q: 'Em que andar é o apartamento?', en: 'Op welke verdieping is het appartement?', o: ['No rés-do-chão', 'No primeiro andar', 'No terceiro andar'], a: 2 },
    { q: 'Onde toma o pequeno-almoço quando está sol?', en: 'Waar is het ontbijt als de zon schijnt?', o: ['Na varanda', 'Na cozinha', 'No quarto'], a: 0 },
    { q: 'De que cor é a cozinha?', en: 'Welke kleur heeft de keuken?', o: ['Azul', 'Amarela', 'Branca'], a: 1 },
  ] },
{ id: 'rotina', lvl: 'A1', pic: '⏰', title: 'Um dia normal', en: 'Een gewone dag',
  text: `O Rui é programador e trabalha em Lisboa. Levanta-se às sete da manhã, toma duche e veste-se depressa. Toma o pequeno-almoço em casa: café com leite e uma torrada.

Às oito e um quarto, apanha o metro para o escritório. Começa a trabalhar às nove. Ao meio-dia e meia, almoça com os colegas num restaurante perto do escritório.

Sai do trabalho às seis. Às terças e quintas vai ao ginásio. Janta às oito e meia, vê uma série e deita-se às onze. Antes de dormir, lê sempre um pouco.`,
  tr: ['Rui is programmeur en werkt in Lissabon. Hij staat om zeven uur \'s ochtends op, neemt een douche en kleedt zich snel aan. Hij ontbijt thuis: koffie met melk en een geroosterde boterham.', 'Om kwart over acht neemt hij de metro naar kantoor. Hij begint om negen uur met werken. Om half een luncht hij met zijn collega\'s in een restaurant bij het kantoor.', 'Hij gaat om zes uur van zijn werk weg. Op dinsdag en donderdag gaat hij naar de sportschool. Hij eet om half negen, kijkt een serie en gaat om elf uur naar bed. Voor hij gaat slapen, leest hij altijd nog even.'],
  gloss: { 'levanta-se': 'hij staat op', 'veste-se': 'hij kleedt zich aan', apanha: 'hij neemt (de metro)', 'às terças e quintas': 'op dinsdag en donderdag', 'deita-se': 'hij gaat naar bed', 'um pouco': 'een beetje' },
  qs: [
    { q: 'A que horas se levanta o Rui?', en: 'Hoe laat staat Rui op?', o: ['Às sete', 'Às oito', 'Às nove'], a: 0 },
    { q: 'Como vai o Rui para o escritório?', en: 'Hoe gaat Rui naar kantoor?', o: ['De carro', 'De metro', 'A pé'], a: 1 },
    { q: 'O que faz o Rui antes de dormir?', en: 'Wat doet Rui voor het slapengaan?', o: ['Vai ao ginásio', 'Toma duche', 'Lê um pouco'], a: 2 },
  ] },
{ id: 'mercado', lvl: 'A1', pic: '🍊', title: 'No mercado', en: 'Op de markt',
  text: `Hoje é sábado e a Sofia vai ao mercado com a avó. O mercado é grande e tem muita fruta, legumes, peixe e flores.

— Bom dia! Quanto custam as laranjas?
— Custam um euro e meio o quilo. São do Algarve, muito doces!
— Então quero dois quilos, se faz favor. E meio quilo de morangos.

A avó também compra tomates, cebolas e uma alface para a salada. No fim, compram sardinhas para o almoço. A Sofia leva os sacos, mas são muito pesados!`,
  tr: ['Vandaag is het zaterdag en Sofia gaat met haar oma naar de markt. De markt is groot en er is veel fruit, groente, vis en er zijn bloemen.', '— Goedemorgen! Hoeveel kosten de sinaasappels?\n— Een euro vijftig per kilo. Ze komen uit de Algarve, heel zoet!\n— Dan neem ik er twee kilo, alstublieft. En een pond aardbeien.', 'Oma koopt ook tomaten, uien en een krop sla voor de salade. Op het eind kopen ze sardines voor de lunch. Sofia draagt de tassen, maar die zijn heel zwaar!'],
  gloss: { 'o quilo': 'per kilo', 'então': 'dan, dus', 'no fim': 'op het eind', leva: 'draagt' },
  qs: [
    { q: 'Com quem vai a Sofia ao mercado?', en: 'Met wie gaat Sofia naar de markt?', o: ['Com a mãe', 'Sozinha', 'Com a avó'], a: 2 },
    { q: 'Quanto custa um quilo de laranjas?', en: 'Hoeveel kost een kilo sinaasappels?', o: ['Um euro e meio', 'Dois euros', 'Meio euro'], a: 0 },
    { q: 'O que compram para o almoço?', en: 'Wat kopen ze voor de lunch?', o: ['Frango', 'Sardinhas', 'Bacalhau'], a: 1 },
  ] },
{ id: 'sintra', lvl: 'A2', pic: '🏰', title: 'Fim de semana em Sintra', en: 'Een weekend in Sintra',
  text: `No sábado passado, eu e a minha irmã fomos a Sintra. Apanhámos o comboio no Rossio às nove da manhã e chegámos a Sintra quarenta minutos depois.

Primeiro, visitámos o Palácio da Pena. Subimos a pé, porque o autocarro estava cheio. O palácio é amarelo e vermelho e parece um castelo de um conto de fadas! Depois, andámos pelo parque e tirámos muitas fotografias.

Ao almoço, comemos num restaurante pequeno no centro da vila. À tarde, provámos os famosos travesseiros, uns bolos doces de massa folhada. Voltámos para Lisboa às sete, muito cansadas mas muito contentes.`,
  tr: ['Afgelopen zaterdag zijn mijn zus en ik naar Sintra gegaan. We namen om negen uur \'s ochtends de trein op Rossio en kwamen veertig minuten later in Sintra aan.', 'Eerst bezochten we het Pena-paleis. We liepen naar boven, want de bus zat vol. Het paleis is geel en rood en lijkt op een kasteel uit een sprookje! Daarna wandelden we door het park en maakten we veel foto\'s.', '\'s Middags aten we in een klein restaurant in het centrum van het stadje. Daarna proefden we de beroemde travesseiros, zoete gebakjes van bladerdeeg. Om zeven uur gingen we terug naar Lissabon, heel moe maar heel blij.'],
  gloss: { fomos: 'we gingen', 'apanhámos': 'we namen', 'subimos a pé': 'we liepen naar boven', 'conto de fadas': 'sprookje', vila: 'stadje', 'provámos': 'we proefden', 'massa folhada': 'bladerdeeg', cansadas: 'moe (vrouwen)' },
  qs: [
    { q: 'Como foram para Sintra?', en: 'Hoe gingen ze naar Sintra?', o: ['De carro', 'De comboio', 'De autocarro'], a: 1 },
    { q: 'Porque subiram a pé?', en: 'Waarom liepen ze naar boven?', o: ['Porque o autocarro estava cheio', 'Porque é mais barato', 'Porque gostam de andar'], a: 0 },
    { q: 'O que são os travesseiros?', en: 'Wat zijn travesseiros?', o: ['Um palácio', 'Um tipo de peixe', 'Bolos doces'], a: 2 },
    { q: 'Como estavam quando voltaram?', en: 'Hoe waren ze toen ze terugkwamen?', o: ['Cansadas mas contentes', 'Tristes', 'Zangadas'], a: 0 },
  ] },
{ id: 'infancia', lvl: 'A2', pic: '🌻', title: 'Quando eu era pequena', en: 'Toen ik klein was',
  text: `Quando eu era pequena, vivia numa aldeia no Alentejo, com os meus avós. A casa era branca, com janelas azuis, e tinha um jardim enorme com laranjeiras.

Todas as manhãs, o meu avô acordava muito cedo e ia para o campo. A minha avó fazia pão no forno e o cheiro enchia a casa toda. Eu brincava na rua com os outros miúdos da aldeia até à hora do jantar.

No verão, estava muito calor. À tarde, ninguém saía de casa. À noite, os vizinhos sentavam-se à porta e conversavam até tarde. Eu adormecia a ouvir as histórias deles. Tenho muitas saudades desse tempo.`,
  tr: ['Toen ik klein was, woonde ik bij mijn opa en oma in een dorp in de Alentejo. Het huis was wit, met blauwe ramen, en het had een enorme tuin met sinaasappelbomen.', 'Elke ochtend stond mijn opa heel vroeg op en ging hij het land op. Mijn oma bakte brood in de oven en de geur vulde het hele huis. Ik speelde tot etenstijd op straat met de andere kinderen uit het dorp.', 'In de zomer was het heel heet. \'s Middags ging niemand de deur uit. \'s Avonds gingen de buren voor hun deur zitten en praatten ze tot laat. Ik viel in slaap terwijl ik naar hun verhalen luisterde. Ik mis die tijd heel erg.'],
  gloss: { 'era pequena': 'ik was klein', vivia: 'ik woonde', laranjeiras: 'sinaasappelbomen', enorme: 'enorm', enchia: 'vulde', 'à porta': 'voor de deur', adormecia: 'ik viel in slaap', 'tenho saudades': 'ik mis' },
  qs: [
    { q: 'Com quem vivia ela?', en: 'Bij wie woonde ze?', o: ['Com os pais', 'Com os avós', 'Sozinha'], a: 1 },
    { q: 'O que fazia a avó?', en: 'Wat maakte haar oma?', o: ['Pão', 'Bolos', 'Sopa'], a: 0 },
    { q: 'O que faziam os vizinhos à noite?', en: 'Wat deden de buren \'s avonds?', o: ['Viam televisão', 'Iam à praia', 'Conversavam à porta'], a: 2 },
  ] },
{ id: 'eletrico', lvl: 'A2', pic: '🚋', title: 'O elétrico 28', en: 'Tram 28',
  text: `O elétrico 28 é uma das atrações mais famosas de Lisboa. É amarelo, antigo e passa pelos bairros mais típicos da cidade: a Graça, Alfama, a Baixa e a Estrela.

Uma turista pergunta a um senhor: — Desculpe, onde fica a paragem do 28? O senhor responde: — Siga em frente até à praça e vire à esquerda. A paragem fica ao lado de uma pastelaria. Mas atenção: vá cedo, porque à tarde há sempre muita gente!

Dentro do elétrico, as ruas são tão estreitas que quase podemos tocar nas paredes das casas. Guarde bem a carteira e o telemóvel, e aproveite a viagem: a vista de Lisboa é linda.`,
  tr: ['Tram 28 is een van de beroemdste attracties van Lissabon. Hij is geel en oud en rijdt door de typischste wijken van de stad: Graça, Alfama, Baixa en Estrela.', 'Een toerist vraagt aan een man: "Pardon, waar is de halte van de 28?" Hij antwoordt: "Ga rechtdoor tot het plein en sla linksaf. De halte is naast een banketbakker. Maar let op: ga vroeg, want \'s middags is het altijd heel druk!"', 'In de tram zijn de straten zo smal dat je bijna de muren van de huizen kunt aanraken. Pas goed op je portemonnee en telefoon, en geniet van de rit: het uitzicht over Lissabon is prachtig.'],
  gloss: { 'atrações': 'attracties', 'passa pelos': 'rijdt door de', 'siga em frente': 'ga rechtdoor', 'vire à esquerda': 'sla linksaf', 'atenção': 'let op', 'muita gente': 'veel mensen', estreitas: 'smal', quase: 'bijna', linda: 'prachtig' },
  qs: [
    { q: 'De que cor é o elétrico 28?', en: 'Welke kleur heeft tram 28?', o: ['Amarelo', 'Vermelho', 'Azul'], a: 0 },
    { q: 'Onde fica a paragem?', en: 'Waar is de halte?', o: ['Em frente do rio', 'Ao lado de uma pastelaria', 'Dentro de um museu'], a: 1 },
    { q: 'Porque é melhor ir cedo?', en: 'Waarom kun je beter vroeg gaan?', o: ['Porque é mais barato', 'Porque o elétrico não passa à tarde', 'Porque à tarde há muita gente'], a: 2 },
  ] },
{ id: 'mensagem', lvl: 'A2', pic: '📱', title: 'Uma mensagem para a Joana', en: 'Een bericht aan Joana',
  text: `Olá, Joana! Tudo bem? Queria contar-te os meus planos para as férias. Em agosto, vou passar duas semanas no Algarve com o Miguel. Vamos ficar num apartamento em Lagos, perto da praia.

Vamos fazer muitas coisas: nadar, fazer surf, visitar as grutas de barco e comer muito peixe grelhado! Também queremos ir a Sagres ver o pôr do sol.

Queres vir connosco? O apartamento tem um quarto livre. Podes apanhar o comboio em Lisboa no dia 10 e nós vamos buscar-te à estação. Diz-me alguma coisa até sexta-feira!
Beijinhos, Ana`,
  tr: ['Hoi Joana! Hoe gaat het? Ik wilde je mijn vakantieplannen vertellen. In augustus ga ik twee weken met Miguel naar de Algarve. We gaan in een appartement in Lagos logeren, vlak bij het strand.', 'We gaan van alles doen: zwemmen, surfen, met de boot de grotten bekijken en veel gegrilde vis eten! We willen ook naar Sagres om de zonsondergang te zien.', 'Wil je met ons mee? Het appartement heeft een extra kamer. Je kunt op de 10e in Lissabon de trein nemen, dan halen we je op bij het station. Laat het me voor vrijdag weten!\nLiefs, Ana'],
  gloss: { 'contar-te': 'je vertellen', passar: 'doorbrengen (tijd)', grutas: 'grotten', grelhado: 'gegrild', 'pôr do sol': 'zonsondergang', connosco: 'met ons', 'buscar-te': 'je ophalen', 'diz-me alguma coisa': 'laat het me weten', beijinhos: 'liefs (letterlijk: kusjes)' },
  qs: [
    { q: 'Onde vão ficar a Ana e o Miguel?', en: 'Waar logeren Ana en Miguel?', o: ['Num hotel em Faro', 'Num apartamento em Lagos', 'Em casa da Joana'], a: 1 },
    { q: 'O que querem ver em Sagres?', en: 'Wat willen ze in Sagres zien?', o: ['O pôr do sol', 'Um museu', 'Um jogo de futebol'], a: 0 },
    { q: 'Até quando deve a Joana responder?', en: 'Wanneer moet Joana uiterlijk antwoorden?', o: ['Até domingo', 'Até agosto', 'Até sexta-feira'], a: 2 },
  ] },
{ id: 'medico', lvl: 'A2', pic: '🩺', title: 'No médico', en: 'Bij de dokter',
  text: `— Bom dia, senhor Costa. Então, o que é que se passa?
— Bom dia, doutora. Não me sinto bem. Dói-me muito a cabeça e a garganta, e tenho febre desde ontem.
— Tem tosse?
— Tenho, sobretudo à noite. E estou muito cansado.

— Vamos ver… Abra a boca, se faz favor. Pois, a garganta está muito vermelha. Acho que é gripe.
— É grave?
— Não, não se preocupe. Tome este medicamento três vezes por dia, depois das refeições. Beba muita água, descanse e fique em casa pelo menos três dias.

— Muito obrigado, doutora.
— De nada. As melhoras!`,
  tr: ['— Goedemorgen, meneer Costa. Zeg het maar, wat is er aan de hand?\n— Goedemorgen, dokter. Ik voel me niet goed. Mijn hoofd en mijn keel doen erg pijn, en ik heb sinds gisteren koorts.\n— Moet u hoesten?\n— Ja, vooral \'s nachts. En ik ben heel moe.', '— Even kijken… Doet u uw mond open, alstublieft. Ja, uw keel is erg rood. Ik denk dat het griep is.\n— Is het ernstig?\n— Nee, maakt u zich geen zorgen. Neem dit medicijn drie keer per dag, na het eten. Drink veel water, rust uit en blijf minstens drie dagen thuis.', '— Heel erg bedankt, dokter.\n— Graag gedaan. Beterschap!'],
  gloss: { 'o que é que se passa?': 'wat is er aan de hand?', 'não me sinto bem': 'ik voel me niet goed', garganta: 'keel', desde: 'sinds', sobretudo: 'vooral', grave: 'ernstig', medicamento: 'medicijn', 'pelo menos': 'minstens', 'as melhoras!': 'beterschap!' },
  qs: [
    { q: 'O que dói ao senhor Costa?', en: 'Wat doet meneer Costa pijn?', o: ['As costas', 'A cabeça e a garganta', 'Os pés'], a: 1 },
    { q: 'O que acha a médica?', en: 'Wat denkt de dokter?', o: ['Que é gripe', 'Que não é nada', 'Que é uma alergia'], a: 0 },
    { q: 'Quantos dias deve ficar em casa?', en: 'Hoeveel dagen moet hij thuisblijven?', o: ['Um', 'Uma semana', 'Pelo menos três'], a: 2 },
  ] },
{ id: 'saojoao', lvl: 'A2', pic: '🎉', title: 'O São João no Porto', en: 'São João in Porto',
  text: `Na noite de 23 para 24 de junho, o Porto celebra o São João, a maior festa da cidade. As ruas enchem-se de gente, música e cheiro a sardinhas assadas.

É uma tradição muito antiga e um pouco estranha: as pessoas andam pelas ruas com martelos de plástico e batem na cabeça umas das outras! Ninguém se zanga, porque é tudo a brincar. Também se compram vasos de manjericos, pequenas plantas com uma quadra, um poema curto de amor.

À meia-noite, há fogo de artifício sobre o rio Douro. Depois, muitos jovens descem até à praia e ficam acordados até ao nascer do sol. No dia seguinte, a cidade dorme até tarde.`,
  tr: ['In de nacht van 23 op 24 juni viert Porto São João, het grootste feest van de stad. De straten lopen vol met mensen, muziek en de geur van gegrilde sardines.', 'Het is een heel oude en een beetje vreemde traditie: mensen lopen door de straten met plastic hamers en tikken elkaar op het hoofd! Niemand wordt boos, want het is allemaal voor de grap. Mensen kopen ook potjes manjerico, een plantje basilicum met een quadra, een kort liefdesgedichtje.', 'Om middernacht is er vuurwerk boven de rivier de Douro. Daarna gaan veel jongeren naar het strand en blijven ze op tot de zon opkomt. De volgende dag slaapt de hele stad uit.'],
  gloss: { 'enchem-se de': 'lopen vol met', assadas: 'gegrild, geroosterd', estranha: 'vreemd', martelos: 'hamers', 'umas das outras': 'elkaar', 'a brincar': 'voor de grap', manjericos: 'basilicumplantjes', quadra: 'gedichtje van vier regels', 'fogo de artifício': 'vuurwerk', 'nascer do sol': 'zonsopgang' },
  qs: [
    { q: 'Quando é o São João?', en: 'Wanneer is São João?', o: ['No Natal', 'Na noite de 23 para 24 de junho', 'Em agosto'], a: 1 },
    { q: 'O que usam as pessoas para bater na cabeça?', en: 'Waarmee tikken de mensen elkaar op het hoofd?', o: ['Martelos de plástico', 'Flores', 'Sardinhas'], a: 0 },
    { q: 'O que há à meia-noite?', en: 'Wat gebeurt er om middernacht?', o: ['Um concerto de fado', 'Um jogo de futebol', 'Fogo de artifício'], a: 2 },
  ] },
{ id: 'saudade', lvl: 'B1', pic: '💭', title: 'A saudade', en: 'Saudade',
  text: `Dizem que "saudade" é uma das palavras mais difíceis de traduzir. Não é só tristeza, nem só nostalgia: é a falta de alguém ou de alguma coisa que amamos e que está longe — ou que talvez nunca volte. Ao mesmo tempo, é um sentimento doce, porque nos lembra o que foi bom.

Os portugueses sentem saudades de tudo: da família que emigrou, da terra onde nasceram, das férias de verão, de uma comida da infância. Durante séculos, muitos homens partiram para o mar, e as mulheres ficaram à espera nos portos. Talvez seja por isso que a saudade se tornou parte da identidade nacional.

O fado, a canção tradicional de Lisboa e de Coimbra, é a melhor expressão deste sentimento. Quando uma fadista canta, mesmo quem não percebe as palavras sente a emoção. Em 2011, a UNESCO declarou o fado Património Cultural Imaterial da Humanidade.`,
  tr: ['Men zegt dat "saudade" een van de moeilijkst te vertalen woorden is. Het is niet alleen verdriet, en ook niet alleen nostalgie: het is het missen van iemand of iets waarvan we houden en dat ver weg is — of misschien nooit meer terugkomt. Tegelijk is het een zoet gevoel, omdat het ons herinnert aan wat goed was.', 'Portugezen voelen saudade voor van alles: voor familie die is geëmigreerd, voor de plek waar ze geboren zijn, voor zomervakanties, voor een gerecht uit hun jeugd. Eeuwenlang trokken veel mannen de zee op en bleven de vrouwen wachtend in de havens achter. Misschien is saudade daarom deel van de nationale identiteit geworden.', 'De fado, het traditionele lied van Lissabon en Coimbra, is de beste uitdrukking van dit gevoel. Als een fadozanger zingt, voelen zelfs mensen die de woorden niet begrijpen de emotie. In 2011 verklaarde UNESCO de fado tot Immaterieel Cultureel Erfgoed van de Mensheid.'],
  gloss: { traduzir: 'vertalen', falta: 'gemis, gebrek', 'ao mesmo tempo': 'tegelijk', 'nos lembra': 'herinnert ons', emigrou: 'emigreerde', 'infância': 'jeugd, kindertijd', 'séculos': 'eeuwen', 'à espera': 'wachtend', 'se tornou': 'werd', fadista: 'fadozanger', 'Património Cultural Imaterial': 'Immaterieel Cultureel Erfgoed' },
  qs: [
    { q: 'Segundo o texto, a saudade é…', en: 'Volgens de tekst is saudade…', o: ['Só alegria', 'Tristeza e doçura ao mesmo tempo', 'Só tristeza'], a: 1 },
    { q: 'Porque é que a saudade pode ser parte da identidade nacional?', en: 'Waarom is saudade misschien deel van de nationale identiteit?', o: ['Porque muitos homens partiram para o mar', 'Porque Portugal é pequeno', 'Porque chove muito'], a: 0 },
    { q: 'O que aconteceu em 2011?', en: 'Wat gebeurde er in 2011?', o: ['O fado nasceu em Coimbra', 'Abriu um museu do fado', 'A UNESCO declarou o fado património'], a: 2 },
  ] },
{ id: 'lotaria', lvl: 'B1', pic: '🎰', title: 'Se eu ganhasse a lotaria…', en: 'Als ik de loterij won…',
  text: `A Beatriz e o Rui estão a jantar e a sonhar acordados.
— Se ganhasses a lotaria, o que farias? — pergunta a Beatriz.
— Primeiro, deixava de trabalhar! — ri-se o Rui. — Depois comprava uma casa antiga no Douro, com vinhas, e fazia o meu próprio vinho. E tu?

— Eu não deixaria o meu trabalho, gosto muito de ensinar. Mas viajaria muito mais. Se tivesse dinheiro, ia ao Japão, à Argentina e à Islândia. E ajudaria a minha família: os meus pais trabalharam muito a vida inteira.
— Achas que o dinheiro traz felicidade?
— Acho que não traz, mas ajuda bastante! — responde ela.

No fim do jantar, olham um para o outro e riem-se. Afinal, nenhum dos dois jogou na lotaria esta semana.`,
  tr: ['Beatriz en Rui zitten te eten en te dagdromen.\n"Als jij de loterij won, wat zou je dan doen?" vraagt Beatriz.\n"Eerst zou ik stoppen met werken!" lacht Rui. "Daarna zou ik een oud huis in de Douro kopen, met wijngaarden, en mijn eigen wijn maken. En jij?"', '"Ik zou mijn baan niet opzeggen, ik geef dolgraag les. Maar ik zou veel meer reizen. Als ik geld had, ging ik naar Japan, Argentinië en IJsland. En ik zou mijn familie helpen: mijn ouders hebben hun hele leven hard gewerkt."\n"Denk jij dat geld gelukkig maakt?"\n"Ik denk het niet, maar het helpt wel heel erg!" antwoordt ze.', 'Aan het eind van het eten kijken ze elkaar aan en lachen. Eigenlijk heeft geen van beiden deze week meegespeeld met de loterij.'],
  gloss: { 'sonhar acordados': 'dagdromen', ganhasses: '(als) je won', 'deixava de': 'ik zou stoppen met', vinhas: 'wijngaarden', 'o meu próprio': 'mijn eigen', 'a vida inteira': 'hun hele leven', felicidade: 'geluk', 'um para o outro': 'elkaar', afinal: 'eigenlijk, uiteindelijk', 'nenhum dos dois': 'geen van beiden' },
  qs: [
    { q: 'O que faria o Rui primeiro?', en: 'Wat zou Rui als eerste doen?', o: ['Deixava de trabalhar', 'Viajava pelo mundo', 'Comprava um carro'], a: 0 },
    { q: 'Porque é que a Beatriz não deixaria o trabalho?', en: 'Waarom zou Beatriz haar baan niet opzeggen?', o: ['Porque precisa de dinheiro', 'Porque gosta de ensinar', 'Porque o chefe é simpático'], a: 1 },
    { q: 'Qual é a ironia no fim?', en: 'Wat is het grappige aan het eind?', o: ['Eles ganharam a lotaria', 'O jantar foi caro', 'Nenhum deles jogou na lotaria'], a: 2 },
  ] },
{ id: 'nata', lvl: 'B1', pic: '🥧', title: 'A história do pastel de nata', en: 'Het verhaal van het roomtaartje',
  text: `Hoje, o pastel de nata vende-se em todo o mundo, de Londres a Macau. Mas a sua história começou há mais de duzentos anos, no Mosteiro dos Jerónimos, em Belém.

Nessa época, os conventos usavam muitas claras de ovo para engomar a roupa. Sobravam as gemas, e os monges e as freiras usavam-nas para fazer doces. Assim nasceram muitos doces conventuais portugueses, como os ovos moles de Aveiro e os pastéis de nata.

Em 1834, as ordens religiosas foram extintas e os monges ficaram sem dinheiro. Para sobreviver, começaram a vender os pastéis numa loja perto do mosteiro. Mais tarde, a receita foi vendida a uma família, que em 1837 abriu a famosa Fábrica dos Pastéis de Belém. A receita original continua secreta até hoje: dizem que só três pessoas a conhecem.`,
  tr: ['Tegenwoordig wordt het roomtaartje over de hele wereld verkocht, van Londen tot Macau. Maar het verhaal begon meer dan tweehonderd jaar geleden, in het Jerónimos-klooster in Belém.', 'In die tijd gebruikten kloosters veel eiwit om kleren te stijven. De eidooiers bleven over, en monniken en nonnen maakten er zoetigheid van. Zo ontstonden veel Portugese kloosterzoetigheden, zoals de ovos moles uit Aveiro en de roomtaartjes.', 'In 1834 werden de kloosterordes opgeheven en zaten de monniken zonder geld. Om te overleven begonnen ze de taartjes te verkopen in een winkel bij het klooster. Later werd het recept verkocht aan een familie, die in 1837 de beroemde banketbakkerij Pastéis de Belém opende. Het originele recept is nog steeds geheim: men zegt dat maar drie mensen het kennen.'],
  gloss: { 'vende-se': 'wordt verkocht', mosteiro: 'klooster', 'nessa época': 'in die tijd', claras: 'eiwitten', engomar: 'stijven', sobravam: 'bleven over', gemas: 'eidooiers', monges: 'monniken', freiras: 'nonnen', 'foram extintas': 'werden opgeheven', sobreviver: 'overleven', 'continua secreta': 'is nog steeds geheim' },
  qs: [
    { q: 'Onde nasceu o pastel de nata?', en: 'Waar is het roomtaartje ontstaan?', o: ['Em Londres', 'Em Aveiro', 'No Mosteiro dos Jerónimos'], a: 2 },
    { q: 'Para que usavam as claras de ovo?', en: 'Waarvoor werden de eiwitten gebruikt?', o: ['Para engomar a roupa', 'Para fazer pão', 'Para pintar azulejos'], a: 0 },
    { q: 'Segundo o texto, quantas pessoas conhecem a receita original?', en: 'Hoeveel mensen kennen het originele recept?', o: ['Ninguém', 'Só três', 'Toda a família'], a: 1 },
  ] },
{ id: 'aldeia', lvl: 'B1', pic: '💻', title: 'Teletrabalho na aldeia', en: 'Thuiswerken in het dorp',
  text: `Nos últimos anos, cada vez mais pessoas trocaram as grandes cidades por aldeias do interior de Portugal. Com o teletrabalho, basta que haja uma boa ligação à internet para trabalhar a partir de qualquer lugar.

A Marta, designer de Lisboa, mudou-se para uma aldeia na Serra da Estrela. "Aqui a vida é mais calma e as casas são muito mais baratas", explica. "É importante que as aldeias tenham gente nova, senão morrem." Os vizinhos, quase todos reformados, receberam-na de braços abertos.

Mas nem tudo é perfeito. No inverno faz muito frio, o hospital mais próximo fica a quarenta minutos e às vezes a internet falha. "Duvido que toda a gente se adapte", admite a Marta. "Mas, para mim, valeu a pena. Espero que mais pessoas venham descobrir o interior."`,
  tr: ['De laatste jaren ruilen steeds meer mensen de grote steden in voor dorpen in het binnenland van Portugal. Met thuiswerken heb je alleen een goede internetverbinding nodig om overal te kunnen werken.', '"Het leven is hier rustiger en de huizen zijn veel goedkoper," legt Marta uit, een ontwerpster uit Lissabon die naar een dorp in de Serra da Estrela verhuisde. "Het is belangrijk dat er jongeren in de dorpen wonen, anders sterven ze uit." Haar buren, bijna allemaal gepensioneerd, ontvingen haar met open armen.', 'Maar niet alles is perfect. In de winter wordt het heel koud, het dichtstbijzijnde ziekenhuis is veertig minuten rijden en soms valt het internet uit. "Ik betwijfel of iedereen zich zou aanpassen," geeft Marta toe. "Maar voor mij was het de moeite waard. Ik hoop dat er meer mensen komen om het binnenland te ontdekken."'],
  gloss: { 'cada vez mais': 'steeds meer', trocaram: 'ruilden in', interior: 'het binnenland van Portugal', 'basta que haja': 'je hebt alleen … nodig', 'ligação': 'verbinding', 'a partir de': 'vanaf', 'mudou-se': 'verhuisde', 'senão': 'anders', 'de braços abertos': 'met open armen', falha: 'valt uit', 'valeu a pena': 'het was de moeite waard' },
  qs: [
    { q: 'Para onde se mudou a Marta?', en: 'Waar is Marta naartoe verhuisd?', o: ['Para Lisboa', 'Para uma aldeia na Serra da Estrela', 'Para o Algarve'], a: 1 },
    { q: 'Segundo a Marta, porque é importante que as aldeias tenham gente nova?', en: 'Waarom hebben dorpen volgens Marta jongeren nodig?', o: ['Senão morrem', 'Porque as casas são caras', 'Porque há muitos turistas'], a: 0 },
    { q: 'Qual destes problemas NÃO é mencionado?', en: 'Welk probleem wordt NIET genoemd?', o: ['O frio no inverno', 'A internet às vezes falha', 'Os vizinhos são antipáticos'], a: 2 },
  ] },
{ id: 'gato', lvl: 'B1', pic: '🐈‍⬛', title: 'O mistério do gato da vizinha', en: 'Het raadsel van de kat van de buurvrouw',
  text: `Todas as manhãs, quando eu saía para o trabalho, o gato da Dona Glória estava sentado no muro do jardim. Era um gato preto e enorme, chamado Comendador, e olhava para mim como se eu lhe devesse dinheiro.

Numa segunda-feira, reparei que o Comendador não estava no muro. Também não apareceu na terça nem na quarta. Na quinta, encontrei a Dona Glória na escada, muito preocupada: "Já procurei em todo o bairro. Se o vires, avisa-me, por favor!"

Nessa noite, ouvi um barulho estranho na minha varanda. Abri a porta devagar e lá estava ele, a comer a comida que eu tinha deixado para os pássaros! Afinal, o Comendador tinha descoberto um restaurante novo. Quando o devolvi à Dona Glória, ela deu-me um bolo enorme. Desde então, o gato visita-me todos os dias — e eu compro mais comida para os pássaros.`,
  tr: ['Elke ochtend als ik naar mijn werk ging, zat de kat van Dona Glória op het muurtje van de tuin. Het was een enorme zwarte kat die Comendador heette, en hij keek me aan alsof ik hem geld schuldig was.', 'Op een maandag zag ik dat Comendador niet op het muurtje zat. Op dinsdag en woensdag kwam hij ook niet opdagen. Op donderdag kwam ik Dona Glória op de trap tegen, heel ongerust: "Ik heb de hele buurt al afgezocht. Als u hem ziet, laat het me dan weten, alstublieft!"', 'Die avond hoorde ik een vreemd geluid op mijn balkon. Ik deed de deur langzaam open en daar zat hij, het eten op te eten dat ik voor de vogels had neergezet! Comendador had dus een nieuw restaurant ontdekt. Toen ik hem terugbracht naar Dona Glória, gaf ze me een enorme taart. Sindsdien komt de kat elke dag bij me langs — en koop ik meer vogelvoer.'],
  gloss: { muro: 'muurtje', 'como se eu lhe devesse': 'alsof ik hem iets schuldig was', reparei: 'ik merkte op', 'nem na quarta': 'ook niet op woensdag', 'se o vires': 'als je hem ziet', barulho: 'geluid, lawaai', 'tinha deixado': 'had neergezet', 'tinha descoberto': 'had ontdekt', devolvi: 'ik bracht terug', 'desde então': 'sindsdien' },
  qs: [
    { q: 'Onde estava o gato todas as manhãs?', en: 'Waar zat de kat elke ochtend?', o: ['Na cozinha', 'No telhado', 'No muro do jardim'], a: 2 },
    { q: 'O que pediu a Dona Glória?', en: 'Wat vroeg Dona Glória?', o: ['Que o vizinho a avisasse se visse o gato', 'Um bolo', 'Comida para os pássaros'], a: 0 },
    { q: 'Onde estava o gato, afinal?', en: 'Waar was de kat uiteindelijk?', o: ['Num restaurante do bairro', 'Na varanda do vizinho, a comer', 'Em casa da Dona Glória'], a: 1 },
  ] },
];
