/* Azulejo · data for the sentence generator (js/generator.js).
   Lists use vocab ids separated by commas. The generator only uses words the learner already knows. */
window.AZ_GEN = {
  // nouns that can stand bare in the singular ("como pão", "bebo água")
  mass: 'pão,queijo,fiambre,carne,frango,peixe,bacalhau,arroz,massa,sopa,salada,fruta,chocolate,água,leite,café,chá,sumo,vinho,cerveja,música,fado,roupa,dinheiro,açúcar,sal,manteiga,azeite,mel,marisco,gelo,chuva,neve',
  // mass nouns that never take um / uma
  massOnly: 'queijo,fiambre,carne,frango,peixe,bacalhau,arroz,massa,fruta,chocolate,água,leite,música,fado,roupa,dinheiro,açúcar,sal,manteiga,azeite,mel,marisco,gelo',
  cls: {
    food: 'pão,queijo,fiambre,ovo,carne,frango,peixe,bacalhau,sardinha,arroz,massa,batata,sopa,salada,fruta,maçã,laranja,banana,pera,morango,tomate,bolo,pastel de nata,gelado,chocolate,bolacha,torrada,sandes,tosta mista,prego,bifana,cenoura',
    drink: 'água,leite,café,chá,sumo,vinho,cerveja,bica,galão,imperial',
    thing: 'livro,caneta,chave,telemóvel,computador,mesa,cadeira,cama,sofá,candeeiro,mala,mochila,bicicleta,carro,bilhete,mapa,relógio,garrafa,copo,chávena,televisão,caderno,lápis,carteira,saco,cartão,guitarra,piano',
    clothes: 'camisa,t-shirt,camisola,casaco,calças,saia,vestido,fato,gravata,sapato,sapatilha,bota,meia,chapéu,boné,cachecol,luva,pijama,calças de ganga',
    readable: 'livro,jornal,revista,mensagem,e-mail,carta,romance,ementa',
    press: 'livro,jornal,revista,romance',
    writable: 'carta,mensagem,e-mail,livro,frase',
    openable: 'porta,janela,livro,garrafa,mala,frigorífico,armário,loja,caixa',
    breakable: 'copo,prato,chávena,garrafa,janela,telemóvel',
    washable: 'carro,roupa,prato,copo,chávena,cão',
    cleanable: 'casa,cozinha,quarto,sala,casa de banho,mesa,janela,carro',
    animal: 'cão,gato,pássaro,cavalo,vaca,porco,galinha,ovelha,coelho,rato,leão,elefante,macaco,urso,lobo,raposa,tartaruga,golfinho,pato',
    vehicle: 'carro,bicicleta,mota,barco',
    transport: 'autocarro,comboio,metro,elétrico,táxi,avião,barco',
    cookable: 'peixe,carne,frango,arroz,massa,sopa,bacalhau',
    makeable: 'bolo,sopa,jantar,almoço,salada,pequeno-almoço',
    orderable: 'café,bica,galão,água,sumo,cerveja,vinho,sopa,salada,bolo,pastel de nata,torrada,tosta mista,prego,bifana,sobremesa,sandes,imperial,chá',
    audible: 'música,rádio,fado,canção',
    show: 'filme,série,jogo',
    instrument: 'piano,guitarra',
    game: 'futebol,ténis,xadrez',
    language: 'português,inglês,espanhol,francês,italiano,alemão',
    losable: 'chave,bilhete,telemóvel,carteira,mala,passaporte,cartão',
    payable: 'conta,café,bilhete,jantar,almoço',
    sight: 'museu,castelo,igreja,mercado,miradouro,jardim,parque,praia,ponte',
    house: 'casa,apartamento,quarto,cozinha,sala,jardim,hotel',
    place: 'cidade,aldeia,rua,praça,bairro,loja,mercado,supermercado,restaurante,pastelaria,museu,castelo,igreja,praia,parque,hotel,estação,aeroporto,escola,hospital,cinema,biblioteca',
    person: '',
  },
  // English to use instead of the dictionary gloss, when the gloss is long or has several senses
  enN: {
    prato: 'plate', galão: 'milky coffee', 'meia de leite': 'white coffee', imperial: 'beer', bica: 'espresso', 'vinho verde': 'vinho verde',
    casa: 'house', quarto: 'bedroom', apartamento: 'flat', armário: 'cupboard', rato: 'mouse', sapo: 'frog', tartaruga: 'turtle', jogo: 'game',
    casaco: 'coat', carta: 'letter', banco: 'bank', jornal: 'newspaper', cartão: 'card', carteira: 'wallet', mala: 'bag', 'tosta mista': 'toasted sandwich',
    sandes: 'sandwich', prego: 'steak sandwich', bifana: 'pork sandwich', fruta: 'fruit', legumes: 'vegetables', 'pequeno-almoço': 'breakfast', roupa: 'clothes',
    pijama: 'pyjamas', loja: 'shop', caixa: 'box', 'casa de banho': 'bathroom', 'calças de ganga': 'jeans', pastelaria: 'pastry shop', relógio: 'watch',
    candeeiro: 'lamp', bacalhau: 'salt cod', fado: 'fado', canção: 'song', rádio: 'radio', série: 'series', filme: 'film', 'pastel de nata': 'custard tart',
  },
  // English feminine for nouns with a feminine form (f=) in the vocabulary
  enF: {
    filho: 'daughter', irmão: 'sister', tio: 'aunt', neto: 'granddaughter', sobrinho: 'niece', namorado: 'girlfriend', noivo: 'fiancée', sogro: 'mother-in-law',
    cunhado: 'sister-in-law', menino: 'little girl', ator: 'actress', 'empregado de mesa': 'waitress', empresário: 'businesswoman', pescador: 'fisherwoman',
  },
  // English nouns that are plural only
  enPlOnly: 'roupa,pijama,calças,calças de ganga,óculos,calções',
  // plural in Portuguese, singular in English
  enSg: 'costas,correios,urgências,trabalhos de casa',
  // places: id | where (estar em) | to (ir a / para) | flags: bare = no article, para = go there with "para"
  places: [
    'casa|at home|home|bare,para', 'escola|at school|to school|para', 'trabalho|at work|to work|para', 'cozinha|in the kitchen|to the kitchen',
    'sala|in the living room|to the living room', 'quarto|in the bedroom|to the bedroom', 'casa de banho|in the bathroom|to the bathroom',
    'jardim|in the garden|to the garden', 'praia|at the beach|to the beach', 'parque|in the park|to the park', 'supermercado|at the supermarket|to the supermarket',
    'mercado|at the market|to the market', 'restaurante|at the restaurant|to the restaurant', 'café|at the café|to the café', 'pastelaria|at the pastry shop|to the pastry shop',
    'banco|at the bank|to the bank', 'farmácia|at the pharmacy|to the pharmacy', 'hospital|at the hospital|to the hospital', 'museu|at the museum|to the museum',
    'cinema|at the cinema|to the cinema', 'teatro|at the theatre|to the theatre', 'biblioteca|at the library|to the library', 'estação|at the station|to the station',
    'aeroporto|at the airport|to the airport', 'hotel|at the hotel|to the hotel', 'igreja|at the church|to the church', 'ginásio|at the gym|to the gym',
    'piscina|at the pool|to the pool', 'universidade|at university|to university', 'escritório|at the office|to the office', 'festa|at the party|to the party',
    'castelo|at the castle|to the castle', 'parque|in the park|to the park',
  ],
  cities: 'Lisboa,Porto,Coimbra,Faro,Braga,Sintra,Évora,Madrid,Paris,Londres,Roma',
  names: 'o João|João|m, a Maria|Maria|f, a Ana|Ana|f, o Pedro|Pedro|m, o Rui|Rui|m, a Inês|Inês|f, a Sofia|Sofia|f, o Tiago|Tiago|m, a Beatriz|Beatriz|f, o Miguel|Miguel|m',
  // family / people nouns usable as subjects with a possessive
  family: 'pai,mãe,irmão,filho,avô,avó,tio,primo,amigo,marido,mulher,namorado,vizinho,pais,avós',
  profs: 'médico,enfermeiro,professor,estudante,advogado,engenheiro,cozinheiro,empregado de mesa,motorista,polícia,bombeiro,vendedor,cantor,ator,escritor,jornalista,programador,arquiteto,agricultor,pescador,padeiro,cabeleireiro,dentista,farmacêutico,músico,artista,pintor,eletricista,canalizador,secretário,empresário,gerente,guia,tradutor,cientista',
  nats: 'português,inglês,espanhol,francês,italiano,alemão,brasileiro,americano',
  // adjectives: id | ser/estar | noun classes it fits | English (optional, else the gloss)
  adjs: [
    'grande|ser|thing,place,animal,house,vehicle|big', 'pequeno|ser|thing,place,animal,house,person,vehicle|small', 'novo|ser|thing,clothes,house,vehicle|new',
    'novo|ser|person|young', 'velho|ser|thing,clothes,house,animal,vehicle,person|old', 'bonito|ser|thing,clothes,place,animal,person,house|beautiful',
    'feio|ser|thing,clothes,animal,house|ugly', 'caro|ser|thing,clothes,food,house,vehicle|expensive', 'barato|ser|thing,clothes,food,house,vehicle|cheap',
    'bom|ser|food,drink,place|good', 'mau|ser|food,drink|bad', 'alto|ser|person|tall', 'baixo|ser|person|short', 'simpático|ser|person|nice',
    'antipático|ser|person|unfriendly', 'engraçado|ser|person,animal|funny', 'inteligente|ser|person,animal|intelligent', 'tímido|ser|person,animal|shy',
    'trabalhador|ser|person|hard-working', 'preguiçoso|ser|person,animal|lazy', 'interessante|ser|readable,show,place,person|interesting',
    'fácil|ser|readable|easy', 'difícil|ser|readable|difficult', 'delicioso|ser|food|delicious', 'doce|ser|food|sweet', 'picante|ser|food|spicy',
    'rápido|ser|animal,vehicle,transport|fast', 'lento|ser|animal,vehicle,transport|slow', 'moderno|ser|house,place,thing|modern',
    'antigo|ser|place,house|old', 'famoso|ser|place,person|famous', 'pesado|ser|thing|heavy', 'leve|ser|thing,clothes|light',
    'cansado|estar|person,animal|tired', 'contente|estar|person|happy', 'triste|estar|person,animal|sad', 'zangado|estar|person|angry',
    'nervoso|estar|person|nervous', 'preocupado|estar|person|worried', 'doente|estar|person,animal|ill', 'ocupado|estar|person|busy',
    'quente|estar|food,drink|hot', 'frio|estar|food,drink|cold', 'limpo|estar|thing,house,clothes,vehicle|clean', 'sujo|estar|thing,house,clothes,animal,vehicle|dirty',
    'aberto|estar|openable|open', 'fechado|estar|openable|closed', 'pronto|estar|person,food|ready',
    'branco|ser|clothes,thing,vehicle,animal,house|white', 'preto|ser|clothes,thing,vehicle,animal|black', 'vermelho|ser|clothes,thing,vehicle|red',
    'azul|ser|clothes,thing,vehicle,house|blue', 'verde|ser|clothes,thing,vehicle|green', 'amarelo|ser|clothes,thing,vehicle,house|yellow',
    'castanho|ser|clothes,thing,animal|brown', 'cinzento|ser|clothes,thing,vehicle,animal|grey', 'cor-de-rosa|ser|clothes,thing|pink',
  ],
  colours: 'branco,preto,vermelho,azul,verde,amarelo,castanho,cinzento,cor-de-rosa,roxo,cor de laranja',
  // English comparatives (others use "more")
  enComp: { big: 'bigger', small: 'smaller', fast: 'faster', slow: 'slower', cheap: 'cheaper', tall: 'taller', short: 'shorter', old: 'older', new: 'newer', young: 'younger', nice: 'nicer', light: 'lighter', heavy: 'heavier', easy: 'easier', funny: 'funnier', good: 'better', bad: 'worse', strong: 'stronger', weak: 'weaker', clean: 'cleaner', dirty: 'dirtier', sweet: 'sweeter', hot: 'hotter', cold: 'colder', pretty: 'prettier', ugly: 'uglier', lazy: 'lazier', busy: 'busier', sad: 'sadder', happy: 'happier' },
  // transitive verbs: classes of objects | English | flags (st = stative: no progressive; de = takes "de"; bare = object without article)
  frames: {
    comer: 'food|eat', beber: 'drink|drink', comprar: 'food,drink,thing,clothes,press,vehicle|buy', ler: 'readable|read', escrever: 'writable|write',
    ver: 'show,animal,vehicle|see|show=watch', ter: 'thing,animal,vehicle,clothes|have|st', querer: 'food,drink,thing,clothes,vehicle,animal|want|st',
    precisar: 'thing,clothes,vehicle,food,drink|need|st,de', cozinhar: 'cookable|cook', fazer: 'makeable|make', abrir: 'openable|open', fechar: 'openable|close',
    lavar: 'washable|wash', limpar: 'cleanable|clean', arrumar: 'cleanable|tidy', vender: 'thing,vehicle,house|sell', procurar: 'losable,animal|look for',
    encontrar: 'losable,animal|find', perder: 'losable|lose', visitar: 'sight|visit', ouvir: 'audible|listen to', usar: 'clothes|wear', vestir: 'clothes|put on',
    levar: 'thing,clothes|take', trazer: 'thing,food,drink|bring', pedir: 'orderable|order', pagar: 'payable|pay for|conta=pay',
    apanhar: 'transport|catch', esperar: 'transport|wait for', partir: 'breakable|break|pretonly', experimentar: 'clothes,food|try|clothes=try on',
    preparar: 'makeable|make', esquecer: 'losable|forget',
    falar: 'language|speak|bare', estudar: 'language|study|bare', aprender: 'language|learn|bare', tocar: 'instrument|play|bare', jogar: 'game|play|bare',
  },
  // intransitive verbs with English
  iv: {
    trabalhar: 'work', estudar: 'study', cantar: 'sing', dançar: 'dance', nadar: 'swim', correr: 'run', dormir: 'sleep', viajar: 'travel', cozinhar: 'cook',
    ler: 'read', escrever: 'write', jantar: 'have dinner', almoçar: 'have lunch', chegar: 'arrive', sair: 'go out', descansar: 'rest', chorar: 'cry',
    rir: 'laugh', andar: 'walk', comer: 'eat', beber: 'drink', ganhar: 'win', perder: 'lose', voltar: 'come back', partir: 'leave', acordar: 'wake up', telefonar: 'phone',
  },
  // adverbs after the verb: id | English | position (end / pre = before the English verb)
  // adverbs: id | English | position (pre = before the verb in Portuguese) | verbs it combines with ('*' = any)
  advs: [
    'muito|a lot||trabalhar,estudar,viajar,dormir,ler,comer,andar,correr,chorar,rir,cantar,dançar|*',
    'bem|well||cantar,dançar,nadar,cozinhar,dormir,escrever,comer,trabalhar|*', 'mal|badly||cantar,dançar,nadar,cozinhar,dormir,escrever|*',
    'cedo|early||chegar,sair,acordar,jantar,almoçar,voltar,partir|*', 'tarde-adv|late||chegar,sair,acordar,jantar,voltar,trabalhar|*',
    'hoje|today||*|pres,pret,fut', 'sempre|always|post|*|pres,imp', 'nunca|never|pre|*|pres,imp,pret',
    'devagar|slowly||andar,correr,comer,escrever,trabalhar,nadar|pres,pret,imp', 'depressa|quickly||andar,correr,comer,escrever,trabalhar,nadar|pres,pret,imp',
  ],
  // time cues by tense: Portuguese | English | position (start / end)
  cues: {
    pres: ['todos os dias|every day', 'de manhã|in the morning', 'à noite|at night', 'ao fim de semana|at the weekend', 'muitas vezes|often'],
    pret: ['ontem|yesterday', 'ontem à noite|last night', 'na semana passada|last week', 'no sábado|on Saturday', 'no ano passado|last year', 'há dois dias|two days ago', 'anteontem|the day before yesterday'],
    imp: ['em criança|as a child|start', 'antigamente|in the old days|start', 'todos os verões|every summer', 'naquele tempo|back then|start'],
    fut: ['amanhã|tomorrow', 'no próximo ano|next year', 'um dia|one day|start', 'na próxima semana|next week'],
    cond: ['com mais tempo|with more time|start', 'com mais dinheiro|with more money|start'],
    irinf: ['amanhã|tomorrow', 'logo|later', 'esta noite|tonight', 'no fim de semana|at the weekend', 'na próxima semana|next week'],
    prog: ['agora|now', 'neste momento|at the moment'],
  },
  // reflexive verbs: verb | English
  // reflexive verbs: verb | English | what can follow (tN-M = a time between N and M o'clock)
  reflex: [
    'levantar|get up|t6-9,cedo,tarde-adv', 'deitar|go to bed|t10-12,cedo,tarde-adv', 'vestir|get dressed|depressa,devagar',
    'sentar|sit down|aqui,ali', 'preocupar|worry|muito', 'divertir|have fun|muito', 'zangar|get angry|muito', 'lavar|wash|de manhã,à noite',
  ],
  // nouns that sound natural in the plural
  plOk: 'maçã,laranja,banana,pera,morango,ovo,bolacha,batata,tomate,cenoura,sardinha,bolo,pastel de nata,torrada,sapato,meia,bota,luva,sapatilha,livro,revista,carta,mensagem,chave,caneta,lápis,copo,prato,chávena,garrafa,gato,cão,pássaro,cavalo,vaca,porco,galinha,ovelha,coelho,pato,flor,bilhete,saco,camisa,t-shirt,camisola,uva,cogumelo,filme,jornal,e-mail,amigo,cadeira',
  // animals that can be at home or in the garden
  pets: 'cão,gato,pássaro,coelho,rato,pato,galinha',
  // realistic prices: class | list of euros
  prices: { food: '1,2,3,4,5', drink: '1,2,3,4', clothes: '15,20,25,30,35,40,45,50,60,70,80,90', thing: '5,10,15,20,25,30,40,50', press: '2,3,5,10,15,20' },
  // body parts for doer
  body: 'cabeça,barriga,perna,braço,pé,costas,dente,mão,olho,orelha,joelho,ombro,pescoço',
  // imperatives: verb | rest of the Portuguese | English (base form)
  impa: [
    'tomar|este comprimido|take this pill', 'beber|muita água|drink lots of water', 'descansar||rest', 'comer|fruta|eat fruit', 'dormir|mais|sleep more',
    'ficar|em casa|stay at home', 'abrir|a janela|open the window', 'fechar|a porta|close the door', 'falar|mais devagar|speak more slowly', 'esperar|aqui|wait here',
    'ler|o livro|read the book', 'escrever|uma mensagem|write a message', 'comprar|pão|buy bread', 'ajudar|o João|help João', 'ouvir|com atenção|listen carefully',
  ],
  impa_dir: [
    'virar|à direita|turn right', 'virar|à esquerda|turn left', 'seguir|em frente|go straight on', 'atravessar|a rua|cross the street', 'apanhar|o autocarro|take the bus',
    'apanhar|o metro|take the metro', 'descer|a rua|go down the street', 'subir|a avenida|go up the avenue', 'continuar|em frente|carry on straight ahead', 'parar|aqui|stop here',
  ],
  // conditions for "se" sentences: verb | rest | English (past for cimp) | English (present for cfut)
  conds: [
    'ter|tempo|had time|have time', 'ter|dinheiro|had money|have money', 'poder||could|can', 'querer||wanted to|want to', 'ser|rico|were rich|are rich',
    'morar|em Lisboa|lived in Lisbon|live in Lisbon', 'falar|português|spoke Portuguese|speak Portuguese', 'estar|de férias|were on holiday|are on holiday',
    'saber|cozinhar|knew how to cook|know how to cook', 'chegar|cedo|arrived early|arrive early',
  ],
  // results: verb | rest | English base
  results: [
    'comprar|um carro|buy a car', 'viajar|pelo mundo|travel around the world', 'ir|à praia|go to the beach', 'aprender|piano|learn the piano',
    'visitar|os avós|visit the grandparents', 'jantar|fora|have dinner out', 'ficar|em casa|stay at home', 'ir|ao cinema|go to the cinema',
    'ler|mais livros|read more books', 'cozinhar|o jantar|cook dinner',
  ],
};
