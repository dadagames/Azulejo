/* Azulejo · gegevens voor de zinnengenerator (js/generator.js).
   Lijsten gebruiken woord-id's uit de woordenlijst, gescheiden door komma's. De generator gebruikt alleen woorden die de leerling al kent.
   De Nederlandse kant van elke zin wordt hier opgebouwd: werkwoorden (nlVerbs), meervouden (nlPl) en vertalingen (nlN, nlF). */
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
  // Dutch to use instead of the dictionary gloss, when the gloss is long or has several senses
  nlN: {
    bacalhau: 'de bakkeljauw', bica: 'de espresso', galão: 'de koffie verkeerd', imperial: 'het biertje', café: 'de koffie', telemóvel: 'de telefoon',
    mala: 'de tas', mapa: 'de kaart', relógio: 'het horloge', saco: 'de zak', cartão: 'de pinpas', carta: 'de brief', caixa: 'de doos', prato: 'het bord',
    roupa: 'de kleren', casa: 'het huis', quarto: 'de slaapkamer', jogo: 'de wedstrijd', rato: 'de muis', sandes: 'het broodje', bolo: 'de taart',
    gelado: 'het ijsje', 'tosta mista': 'de tosti', sapatilha: 'de sportschoen', ementa: 'het menu', namorado: 'de vriend', polícia: 'de agent',
    gerente: 'de manager', pescoço: 'de nek', cogumelo: 'de champignon', médico: 'de arts', enfermeiro: 'de verpleger', avô: 'de opa', avó: 'de oma',
    pai: 'de vader', mãe: 'de moeder', marido: 'de man', mulher: 'de vrouw', 'pastel de nata': 'het roomtaartje', trabalho: 'het werk', banco: 'de bank',
  },
  // Dutch feminine for nouns with a feminine form (f=) or both genders (mf)
  nlF: {
    filho: 'de dochter', irmão: 'de zus', tio: 'de tante', neto: 'de kleindochter', sobrinho: 'de nicht', namorado: 'de vriendin', primo: 'de nicht',
    amigo: 'de vriendin', vizinho: 'de buurvrouw', noivo: 'de verloofde', sogro: 'de schoonmoeder', cunhado: 'de schoonzus', menino: 'het meisje',
    enfermeiro: 'de verpleegster', professor: 'de lerares', estudante: 'de studente', advogado: 'de advocate', 'empregado de mesa': 'de serveerster',
    polícia: 'de agente', bombeiro: 'de brandweervrouw', vendedor: 'de verkoopster', cantor: 'de zangeres', ator: 'de actrice', escritor: 'de schrijfster',
    jornalista: 'de journaliste', agricultor: 'de boerin', cabeleireiro: 'de kapster', músico: 'de muzikante', artista: 'de kunstenares',
    pintor: 'de schilderes', secretário: 'de secretaresse', empresário: 'de onderneemster', tradutor: 'de vertaalster',
  },
  // Dutch plurals that the spelling rules get wrong (singular: plural)
  nlPl: {
    ei: 'eieren', glas: 'glazen', stad: 'steden', lied: 'liederen', film: 'films', tram: 'trams', kok: 'koks', broer: 'broers', oom: 'ooms',
    toast: 'toasts', laars: 'laarzen', motor: 'motoren', buurman: 'buren', museum: 'musea', restaurant: 'restaurants', station: 'stations',
    telefoon: 'telefoons', roman: 'romans', 'e-mail': 'e-mails', 'T-shirt': 'T-shirts', sjaal: 'sjaals', wolf: 'wolven', koe: 'koeien',
    knie: 'knieën', kunstenaar: 'kunstenaars', ingenieur: 'ingenieurs', chauffeur: 'chauffeurs', acteur: 'acteurs', programmeur: 'programmeurs',
    elektricien: 'elektriciens', champignon: 'champignons', brandweerman: 'brandweerlieden', 'broodje biefstuk': 'broodjes biefstuk',
    'broodje varkensvlees': 'broodjes varkensvlees', 'koffie verkeerd': 'koffie verkeerd', kind: 'kinderen', dag: 'dagen', weg: 'wegen',
    spel: 'spellen', gat: 'gaten', bad: 'baden', slot: 'sloten', lid: 'leden', schip: 'schepen', blad: 'bladeren', hotel: 'hotels', bier: 'biertjes',
  },
  // plural in Portuguese, singular in Dutch (as calças = de broek)
  nlSg: 'calças,calças de ganga,óculos,costas,correios,urgências,trabalhos de casa',
  // singular in Portuguese, plural in Dutch (a roupa = de kleren)
  nlPlOnly: 'roupa',
  // places: id | where (estar em) | where to (ir a / para) | the place as a noun | flags: bare = no article, para = go there with "para"
  places: [
    'casa|thuis|naar huis|het huis|bare,para', 'escola|op school|naar school|de school|para', 'trabalho|op het werk|naar het werk|het werk|para',
    'cozinha|in de keuken|naar de keuken|de keuken', 'sala|in de woonkamer|naar de woonkamer|de woonkamer', 'quarto|in de slaapkamer|naar de slaapkamer|de slaapkamer',
    'casa de banho|in de badkamer|naar de badkamer|de badkamer', 'jardim|in de tuin|naar de tuin|de tuin', 'praia|op het strand|naar het strand|het strand',
    'parque|in het park|naar het park|het park', 'supermercado|in de supermarkt|naar de supermarkt|de supermarkt', 'mercado|op de markt|naar de markt|de markt',
    'restaurante|in het restaurant|naar het restaurant|het restaurant', 'café|in het café|naar het café|het café',
    'pastelaria|bij de banketbakker|naar de banketbakker|de banketbakkerij', 'banco|bij de bank|naar de bank|de bank', 'farmácia|bij de apotheek|naar de apotheek|de apotheek',
    'hospital|in het ziekenhuis|naar het ziekenhuis|het ziekenhuis', 'museu|in het museum|naar het museum|het museum', 'cinema|in de bioscoop|naar de bioscoop|de bioscoop',
    'teatro|in het theater|naar het theater|het theater', 'biblioteca|in de bibliotheek|naar de bibliotheek|de bibliotheek', 'estação|op het station|naar het station|het station',
    'aeroporto|op het vliegveld|naar het vliegveld|het vliegveld', 'hotel|in het hotel|naar het hotel|het hotel', 'igreja|in de kerk|naar de kerk|de kerk',
    'ginásio|in de sportschool|naar de sportschool|de sportschool', 'piscina|in het zwembad|naar het zwembad|het zwembad',
    'universidade|op de universiteit|naar de universiteit|de universiteit', 'escritório|op kantoor|naar kantoor|het kantoor', 'festa|op het feest|naar het feest|het feest',
    'castelo|bij het kasteel|naar het kasteel|het kasteel', 'parque|in het park|naar het park|het park',
  ],
  cities: 'Lisboa,Porto,Coimbra,Faro,Braga,Sintra,Évora,Madrid,Paris,Londres,Roma',
  names: 'o João|João|m, a Maria|Maria|f, a Ana|Ana|f, o Pedro|Pedro|m, o Rui|Rui|m, a Inês|Inês|f, a Sofia|Sofia|f, o Tiago|Tiago|m, a Beatriz|Beatriz|f, o Miguel|Miguel|m',
  // family / people nouns usable as subjects with a possessive
  family: 'pai,mãe,irmão,filho,avô,avó,tio,primo,amigo,marido,mulher,namorado,vizinho,pais,avós',
  profs: 'médico,enfermeiro,professor,estudante,advogado,engenheiro,cozinheiro,empregado de mesa,motorista,polícia,bombeiro,vendedor,cantor,ator,escritor,jornalista,programador,arquiteto,agricultor,pescador,padeiro,cabeleireiro,dentista,farmacêutico,músico,artista,pintor,eletricista,canalizador,secretário,empresário,gerente,guia,tradutor,cientista',
  nats: 'português,inglês,espanhol,francês,italiano,alemão,brasileiro,americano',
  // adjectives: id | ser/estar | noun classes it fits | Dutch: base / form with -e / comparative (when the rules don't give it)
  adjs: [
    'grande|ser|thing,place,animal,house,vehicle|groot/grote', 'pequeno|ser|thing,place,animal,house,person,vehicle|klein/kleine', 'novo|ser|thing,clothes,house,vehicle|nieuw/nieuwe',
    'novo|ser|person|jong/jonge', 'velho|ser|thing,clothes,house,animal,vehicle,person|oud/oude', 'bonito|ser|thing,clothes,place,animal,person,house|mooi/mooie',
    'feio|ser|thing,clothes,animal,house|lelijk/lelijke', 'caro|ser|thing,clothes,food,house,vehicle|duur/dure', 'barato|ser|thing,clothes,food,house,vehicle|goedkoop/goedkope',
    'bom|ser|food,drink|lekker/lekkere', 'bom|ser|place|goed/goede/beter', 'mau|ser|food,drink|vies/vieze', 'alto|ser|person|lang/lange', 'baixo|ser|person|klein/kleine',
    'simpático|ser|person|aardig/aardige', 'antipático|ser|person|onvriendelijk/onvriendelijke', 'engraçado|ser|person,animal|grappig/grappige',
    'inteligente|ser|person,animal|intelligent/intelligente', 'tímido|ser|person,animal|verlegen/verlegen', 'trabalhador|ser|person|hardwerkend/hardwerkende',
    'preguiçoso|ser|person,animal|lui/luie', 'interessante|ser|readable,show,place,person|interessant/interessante',
    'fácil|ser|readable|makkelijk/makkelijke', 'difícil|ser|readable|moeilijk/moeilijke', 'delicioso|ser|food|heerlijk/heerlijke', 'doce|ser|food|zoet/zoete', 'picante|ser|food|pittig/pittige',
    'rápido|ser|animal,vehicle,transport|snel/snelle', 'lento|ser|animal,vehicle,transport|langzaam/langzame', 'moderno|ser|house,place,thing|modern/moderne',
    'antigo|ser|place,house|oud/oude', 'famoso|ser|place,person|beroemd/beroemde', 'pesado|ser|thing|zwaar/zware', 'leve|ser|thing,clothes|licht/lichte',
    'cansado|estar|person,animal|moe', 'contente|estar|person|blij/blije', 'triste|estar|person,animal|verdrietig/verdrietige', 'zangado|estar|person|boos/boze',
    'nervoso|estar|person|zenuwachtig/zenuwachtige', 'preocupado|estar|person|bezorgd/bezorgde', 'doente|estar|person,animal|ziek/zieke', 'ocupado|estar|person|bezig',
    'quente|estar|food,drink|warm/warme', 'frio|estar|food,drink|koud/koude', 'limpo|estar|thing,house,clothes,vehicle|schoon/schone', 'sujo|estar|thing,house,clothes,animal,vehicle|vies/vieze',
    'aberto|estar|openable|open', 'fechado|estar|openable|dicht', 'pronto|estar|person,food|klaar',
    'branco|ser|clothes,thing,vehicle,animal,house|wit/witte', 'preto|ser|clothes,thing,vehicle,animal|zwart/zwarte', 'vermelho|ser|clothes,thing,vehicle|rood/rode',
    'azul|ser|clothes,thing,vehicle,house|blauw/blauwe', 'verde|ser|clothes,thing,vehicle|groen/groene', 'amarelo|ser|clothes,thing,vehicle,house|geel/gele',
    'castanho|ser|clothes,thing,animal|bruin/bruine', 'cinzento|ser|clothes,thing,vehicle,animal|grijs/grijze', 'cor-de-rosa|ser|clothes,thing|roze',
  ],
  colours: 'branco,preto,vermelho,azul,verde,amarelo,castanho,cinzento,cor-de-rosa,roxo,cor de laranja',
  // transitive verbs: classes of objects | Dutch verb (a preposition after it goes before the object) | flags (st = stative; de = takes "de"; bare = object without article; class=other Dutch verb)
  frames: {
    comer: 'food|eten', beber: 'drink|drinken', comprar: 'food,drink,thing,clothes,press,vehicle|kopen', ler: 'readable|lezen', escrever: 'writable|schrijven',
    ver: 'show,animal,vehicle|zien|show=kijken naar', ter: 'thing,animal,vehicle,clothes|hebben|st', querer: 'food,drink,thing,clothes,vehicle,animal|willen|st',
    precisar: 'thing,clothes,vehicle,food,drink|nodig hebben|st,de', cozinhar: 'cookable|koken', fazer: 'makeable|maken', abrir: 'openable|opendoen', fechar: 'openable|dichtdoen',
    lavar: 'washable|wassen', limpar: 'cleanable|schoonmaken', arrumar: 'cleanable|opruimen', vender: 'thing,vehicle,house|verkopen', procurar: 'losable,animal|zoeken',
    encontrar: 'losable,animal|vinden', perder: 'losable|verliezen', visitar: 'sight|bezoeken', ouvir: 'audible|luisteren naar', usar: 'clothes|dragen', vestir: 'clothes|aantrekken',
    levar: 'thing,clothes|meenemen', trazer: 'thing,food,drink|meebrengen', pedir: 'orderable|bestellen', pagar: 'payable|betalen',
    apanhar: 'transport|nemen', esperar: 'transport|wachten op', partir: 'breakable|breken|pretonly', experimentar: 'clothes,food|proeven|clothes=passen',
    preparar: 'makeable|klaarmaken', esquecer: 'losable|vergeten',
    falar: 'language|spreken|bare', estudar: 'language|studeren|bare', aprender: 'language|leren|bare', tocar: 'instrument|spelen|bare', jogar: 'game|spelen|bare',
  },
  // intransitive verbs with their Dutch
  iv: {
    trabalhar: 'werken', estudar: 'studeren', cantar: 'zingen', dançar: 'dansen', nadar: 'zwemmen', correr: 'rennen', dormir: 'slapen', viajar: 'reizen', cozinhar: 'koken',
    ler: 'lezen', escrever: 'schrijven', jantar: 'eten', almoçar: 'lunchen', chegar: 'aankomen', sair: 'weggaan', descansar: 'uitrusten', chorar: 'huilen',
    rir: 'lachen', andar: 'lopen', comer: 'eten', beber: 'drinken', ganhar: 'winnen', perder: 'verliezen', voltar: 'terugkomen', partir: 'vertrekken', acordar: 'wakker worden', telefonar: 'bellen',
  },
  // adverbs: id | Dutch | position (pre = before the verb in Portuguese) | verbs it combines with ('*' = any) | tenses
  advs: [
    'muito|veel||trabalhar,estudar,viajar,dormir,ler,comer,andar,correr,chorar,rir,cantar,dançar|*',
    'bem|goed||cantar,dançar,nadar,cozinhar,dormir,escrever,comer,trabalhar|*', 'mal|slecht||cantar,dançar,nadar,cozinhar,dormir,escrever|*',
    'cedo|vroeg||chegar,sair,acordar,jantar,almoçar,voltar,partir|*', 'tarde-adv|laat||chegar,sair,acordar,jantar,voltar,trabalhar|*',
    'hoje|vandaag||*|pres,pret,fut', 'sempre|altijd|post|*|pres,imp', 'nunca|nooit|pre|*|pres,imp,pret',
    'devagar|langzaam||andar,correr,comer,escrever,trabalhar,nadar|pres,pret,imp', 'depressa|snel||andar,correr,comer,escrever,trabalhar,nadar|pres,pret,imp',
  ],
  // time cues by tense: Portuguese | Dutch | position (start = at the start of the sentence)
  cues: {
    pres: ['todos os dias|elke dag', "de manhã|'s ochtends", "à noite|'s avonds", 'ao fim de semana|in het weekend', 'muitas vezes|vaak'],
    pret: ['ontem|gisteren', 'ontem à noite|gisteravond', 'na semana passada|vorige week', 'no sábado|zaterdag', 'no ano passado|vorig jaar', 'há dois dias|twee dagen geleden', 'anteontem|eergisteren'],
    imp: ['em criança|als kind|start', 'antigamente|vroeger|start', 'todos os verões|elke zomer', 'naquele tempo|in die tijd|start'],
    fut: ['amanhã|morgen', 'no próximo ano|volgend jaar', 'um dia|ooit|start', 'na próxima semana|volgende week'],
    cond: ['com mais tempo|met meer tijd|start', 'com mais dinheiro|met meer geld|start'],
    irinf: ['amanhã|morgen', 'logo|straks', 'esta noite|vanavond', 'no fim de semana|in het weekend', 'na próxima semana|volgende week'],
    prog: ['agora|nu', 'neste momento|op dit moment'],
  },
  // reflexive verbs: verb | Dutch | what can follow (tN-M = a time between N and M o'clock) | refl = Dutch needs "zich" too
  reflex: [
    'levantar|opstaan|t6-9,cedo,tarde-adv', 'deitar|naar bed gaan|t10-12,cedo,tarde-adv', 'vestir|aankleden|depressa,devagar|refl',
    'sentar|gaan zitten|aqui,ali', 'preocupar|zorgen maken|muito|refl', 'divertir|plezier hebben|muito', 'zangar|boos worden|muito', 'lavar|wassen|de manhã,à noite|refl',
  ],
  // nouns that sound natural in the plural
  plOk: 'maçã,laranja,banana,pera,morango,ovo,bolacha,batata,tomate,cenoura,sardinha,bolo,pastel de nata,torrada,sapato,meia,bota,luva,sapatilha,livro,revista,carta,mensagem,chave,caneta,lápis,copo,prato,chávena,garrafa,gato,cão,pássaro,cavalo,vaca,porco,galinha,ovelha,coelho,pato,flor,bilhete,saco,camisa,t-shirt,camisola,uva,cogumelo,filme,jornal,e-mail,amigo,cadeira',
  // animals that can be at home or in the garden
  pets: 'cão,gato,pássaro,coelho,rato,pato,galinha',
  // realistic prices: class | list of euros
  prices: { food: '1,2,3,4,5', drink: '1,2,3,4', clothes: '15,20,25,30,35,40,45,50,60,70,80,90', thing: '5,10,15,20,25,30,40,50', press: '2,3,5,10,15,20' },
  // body parts for doer
  body: 'cabeça,barriga,perna,braço,pé,costas,dente,mão,olho,orelha,joelho,ombro,pescoço',
  // imperatives: verb | rest of the Portuguese | Dutch | Dutch, negative
  impa: [
    'tomar|este comprimido|Neem deze pil|Neem deze pil niet', 'beber|muita água|Drink veel water|Drink niet zoveel water', 'descansar||Rust uit|Rust niet uit',
    'comer|fruta|Eet fruit|Eet geen fruit', 'dormir|mais|Slaap meer|Slaap niet meer', 'ficar|em casa|Blijf thuis|Blijf niet thuis',
    'abrir|a janela|Doe het raam open|Doe het raam niet open', 'fechar|a porta|Doe de deur dicht|Doe de deur niet dicht', 'falar|mais devagar|Praat wat langzamer|Praat niet langzamer',
    'esperar|aqui|Wacht hier|Wacht hier niet', 'ler|o livro|Lees het boek|Lees het boek niet', 'escrever|uma mensagem|Schrijf een bericht|Schrijf geen bericht',
    'comprar|pão|Koop brood|Koop geen brood', 'ajudar|o João|Help João|Help João niet', 'ouvir|com atenção|Luister goed|Luister niet',
  ],
  impa_dir: [
    'virar|à direita|Sla rechtsaf|Sla niet rechtsaf', 'virar|à esquerda|Sla linksaf|Sla niet linksaf', 'seguir|em frente|Ga rechtdoor|Ga niet rechtdoor',
    'atravessar|a rua|Steek de straat over|Steek de straat niet over', 'apanhar|o autocarro|Neem de bus|Neem de bus niet', 'apanhar|o metro|Neem de metro|Neem de metro niet',
    'descer|a rua|Loop de straat af|Loop de straat niet af', 'subir|a avenida|Loop de laan op|Loop de laan niet op', 'continuar|em frente|Ga verder rechtdoor|Ga niet verder rechtdoor',
    'parar|aqui|Stop hier|Stop hier niet',
  ],
  // conditions for "se" sentences: verb | rest | Dutch verb | Dutch rest (">" = after the verb: "als ik kon koken")
  conds: [
    'ter|tempo|hebben|tijd', 'ter|dinheiro|hebben|geld', 'poder||kunnen|', 'querer||willen|', 'ser|rico|zijn|rijk',
    'morar|em Lisboa|wonen|in Lissabon', 'falar|português|spreken|Portugees', 'estar|de férias|zijn|op vakantie',
    'saber|cozinhar|kunnen|>koken', 'chegar|cedo|aankomen|vroeg',
  ],
  // results: verb | rest | Dutch verb | Dutch rest
  results: [
    'comprar|um carro|kopen|een auto', 'viajar|pelo mundo|reizen|over de hele wereld', 'ir|à praia|gaan|naar het strand', 'aprender|piano|leren|piano',
    'visitar|os avós|bezoeken|opa en oma', 'jantar|fora|uit eten gaan|', 'ficar|em casa|thuisblijven|', 'ir|ao cinema|gaan|naar de bioscoop',
    'ler|mais livros|lezen|meer boeken', 'cozinhar|o jantar|koken|het avondeten',
  ],
  // Dutch verbs: infinitive: stem, then p=past/past plural, pp=participle, z = perfect with "zijn", prt=separable part ("_" = space),
  // sp = use the simple past for the Portuguese pretérito, neg=geen = negate with "geen" before the separable part. Regular forms are worked out.
  nlVerbs: {
    zijn: 'ben p=was/waren pp=geweest z sp', hebben: 'heb p=had/hadden pp=gehad sp', kunnen: 'kan p=kon/konden pp=gekund sp', willen: 'wil p=wilde/wilden pp=gewild sp',
    zullen: 'zal p=zou/zouden', moeten: 'moet p=moest/moesten pp=gemoeten sp', hoeven: 'hoef', mogen: 'mag p=mocht/mochten pp=gemogen sp',
    gaan: 'ga p=ging/gingen pp=gegaan z', komen: 'kom p=kwam/kwamen pp=gekomen z', doen: 'doe p=deed/deden pp=gedaan', zien: 'zie p=zag/zagen pp=gezien',
    staan: 'sta p=stond/stonden pp=gestaan', worden: 'word p=werd/werden pp=geworden z', houden: 'hou p=hield/hielden pp=gehouden', vinden: 'vind p=vond/vonden pp=gevonden sp',
    blijven: 'blijf p=bleef/bleven pp=gebleven z', liggen: 'lig p=lag/lagen pp=gelegen', heten: 'heet p=heette/heetten pp=geheten', kosten: 'kost', hopen: 'hoop',
    eten: 'eet p=at/aten pp=gegeten', drinken: 'drink p=dronk/dronken pp=gedronken', kopen: 'koop p=kocht/kochten pp=gekocht', verkopen: 'verkoop p=verkocht/verkochten pp=verkocht',
    lezen: 'lees p=las/lazen pp=gelezen', schrijven: 'schrijf p=schreef/schreven pp=geschreven', kijken: 'kijk p=keek/keken pp=gekeken', koken: 'kook', maken: 'maak',
    klaarmaken: 'maak prt=klaar', schoonmaken: 'maak prt=schoon', opendoen: 'doe p=deed/deden pp=gedaan prt=open', dichtdoen: 'doe p=deed/deden pp=gedaan prt=dicht',
    wassen: 'was p=waste/wasten pp=gewassen', opruimen: 'ruim prt=op', zoeken: 'zoek p=zocht/zochten pp=gezocht', verliezen: 'verlies p=verloor/verloren pp=verloren',
    bezoeken: 'bezoek p=bezocht/bezochten pp=bezocht', luisteren: 'luister', dragen: 'draag p=droeg/droegen pp=gedragen', aantrekken: 'trek p=trok/trokken pp=getrokken prt=aan',
    aankleden: 'kleed prt=aan', meenemen: 'neem p=nam/namen pp=genomen prt=mee', meebrengen: 'breng p=bracht/brachten pp=gebracht prt=mee', brengen: 'breng p=bracht/brachten pp=gebracht',
    nemen: 'neem p=nam/namen pp=genomen', bestellen: 'bestel pp=besteld', betalen: 'betaal pp=betaald', wachten: 'wacht', breken: 'breek p=brak/braken pp=gebroken',
    proeven: 'proef', passen: 'pas', vergeten: 'vergeet p=vergat/vergaten pp=vergeten', spreken: 'spreek p=sprak/spraken pp=gesproken', studeren: 'studeer', leren: 'leer',
    spelen: 'speel', werken: 'werk', zingen: 'zing p=zong/zongen pp=gezongen', dansen: 'dans', zwemmen: 'zwem p=zwom/zwommen pp=gezwommen', rennen: 'ren',
    slapen: 'slaap p=sliep/sliepen pp=geslapen', reizen: 'reis', lunchen: 'lunch', aankomen: 'kom p=kwam/kwamen pp=gekomen z prt=aan', weggaan: 'ga p=ging/gingen pp=gegaan z prt=weg',
    uitrusten: 'rust prt=uit', huilen: 'huil', lachen: 'lach pp=gelachen', lopen: 'loop p=liep/liepen pp=gelopen', winnen: 'win p=won/wonnen pp=gewonnen',
    terugkomen: 'kom p=kwam/kwamen pp=gekomen z prt=terug', vertrekken: 'vertrek p=vertrok/vertrokken pp=vertrokken z', 'wakker worden': 'word p=werd/werden pp=geworden z prt=wakker_',
    bellen: 'bel', wonen: 'woon', opstaan: 'sta p=stond/stonden pp=gestaan z prt=op', 'naar bed gaan': 'ga p=ging/gingen pp=gegaan z prt=naar_bed_',
    'gaan zitten': 'ga p=ging/gingen pp=gegaan prt=zitten_ sp', 'zorgen maken': 'maak prt=zorgen_ neg=geen', 'plezier hebben': 'heb p=had/hadden pp=gehad prt=plezier_ neg=geen',
    'boos worden': 'word p=werd/werden pp=geworden z prt=boos_', 'nodig hebben': 'heb p=had/hadden pp=gehad prt=nodig_', 'pijn doen': 'doe p=deed/deden pp=gedaan prt=pijn_',
    geven: 'geef p=gaf/gaven pp=gegeven', 'cadeau geven': 'geef p=gaf/gaven pp=gegeven prt=cadeau_', lenen: 'leen', 'laten zien': 'laat p=liet/lieten pp=gelaten prt=zien_ sp',
    thuisblijven: 'blijf p=bleef/bleven pp=gebleven z prt=thuis', 'uit eten gaan': 'ga p=ging/gingen pp=gegaan z prt=uit_eten_', helpen: 'help p=hielp/hielpen pp=geholpen',
  },
};
