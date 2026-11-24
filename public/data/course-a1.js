/* Azulejo · course, sections 1–2 (A1). European Portuguese.
   Unit fields: id, s (section), pt, en, tense (focus tense for its verbs), gen (sentence templates), 
   lessons: [title | comma-separated items], items are vocab ids or v:verb.
   sents: "lesson: Portuguese / alternative | Nederlands / alternatief". {word} marks the verb to blank in fill-in exercises. */
window.AZ_COURSE = window.AZ_COURSE || { sections: [], units: [] };
window.AZ_COURSE.sections.push(
  { id: 1, pt: 'Primeiros passos', en: 'Eerste stappen', level: 'A1' },
  { id: 2, pt: 'O dia a dia', en: 'Het dagelijks leven', level: 'A1+' },
);
window.AZ_COURSE.units.push(
{ id: 'u1', s: 1, pt: 'Olá!', en: 'Hallo en tot ziens', tense: 'pres', gen: [],
  lessons: [
    'Olá e adeus|olá, bom dia, boa tarde, boa noite, adeus, tchau, até logo, até amanhã, até já',
    'Por favor|obrigado, obrigada, de nada, por favor, se faz favor, desculpe, desculpa, com licença, sim, não',
    'Como estás?|tudo bem?, tudo bem, como estás?, como está?, estou bem, mais ou menos, muito prazer, não percebo, pode repetir?',
  ],
  sents: `
1: Olá, bom dia! | Hallo, goedemorgen! / Hoi, goedemorgen!
1: Boa tarde! | Goedemiddag!
1: Boa noite e até amanhã! | Goedenavond en tot morgen! / Goedenacht en tot morgen! / Welterusten en tot morgen!
1: Tchau, até logo! | Doei, tot straks! / Dag, tot straks!
1: Adeus, até já! | Dag, tot zo! / Doei, tot zo!
1: Olá, boa noite! | Hallo, goedenavond! / Hoi, goedenavond!
2: Obrigado! De nada. | Dank je! Graag gedaan. / Bedankt! Graag gedaan. / Dank u! Graag gedaan.
2: Sim, por favor. | Ja, graag. / Ja, alsjeblieft. / Ja, alstublieft.
2: Não, obrigada. | Nee, dank je. / Nee, bedankt. / Nee, dank u.
2: Desculpe! | Sorry! / Pardon!
2: Com licença! | Pardon! / Mag ik er even langs?
2: Sim, obrigado. | Ja, dank je. / Ja, bedankt. / Ja, dank u.
3: Olá! Tudo bem? | Hoi! Hoe gaat het? / Hallo! Hoe gaat het? / Hoi! Alles goed?
3: Bom dia! Como está? | Goedemorgen! Hoe gaat het met u? / Goedemorgen! Hoe gaat het?
3: Estou bem, obrigado. | Het gaat goed, dank je. / Goed, dank je. / Het gaat goed, bedankt. / Het gaat goed, dank u.
3: Mais ou menos. | Zo-zo. / Gaat wel.
3: Muito prazer! | Aangenaam! / Leuk je te ontmoeten!
3: Desculpe, não percebo. | Sorry, ik begrijp het niet. / Pardon, ik begrijp het niet.
3: Pode repetir, por favor? | Kunt u dat herhalen, alstublieft? / Kunt u het herhalen, alstublieft? / Kunt u dat nog een keer zeggen?
3: Como estás? Tudo bem? | Hoe gaat het met je? Alles goed? / Hoe gaat het? Alles goed?
` },

{ id: 'u2', s: 1, pt: 'Quem és tu?', en: 'Wie ben jij?', tense: 'pres', gen: ['ser_nat', 'ser_prof'],
  lessons: [
    'Eu, tu, ele|eu, tu, ele, ela, nós, vós, vocês, eles, elas, a gente, v:ser',
    'De onde és?|português, inglês, espanhol, francês, italiano, alemão, brasileiro, o senhor, a senhora, você, Lisboa, Portugal',
    'Como te chamas?|v:chamar, nome, homem, mulher, rapaz, rapariga, amigo, estudante, professor, médico',
  ],
  sents: `
1: Eu {sou} o Pedro. / Sou o Pedro. | Ik ben Pedro.
1: Ela {é} a Maria. | Zij is Maria. / Dat is Maria.
1: Nós {somos} amigos. / Somos amigos. | Wij zijn vrienden.
1: Tu {és} o João? / És o João? | Ben jij João? / Ben je João?
1: Ele é o Rui e ela é a Inês. | Hij is Rui en zij is Inês.
1: Eles {são} amigos. | Zij zijn vrienden.
2: Sou de Lisboa. / Eu sou de Lisboa. | Ik kom uit Lissabon. / Ik ben uit Lissabon.
2: De onde és? | Waar kom je vandaan? / Waar kom jij vandaan?
2: Ela {é} portuguesa. | Zij is Portugees. / Ze is Portugese.
2: Não sou francesa, sou italiana. | Ik ben geen Française, ik ben Italiaanse. / Ik ben niet Frans, ik ben Italiaans.
2: O senhor é inglês? | Bent u Engels? / Bent u Engelsman?
2: A senhora é de Portugal? | Komt u uit Portugal? / Bent u uit Portugal?
2: Nós {somos} alemães. / Somos alemães. | Wij zijn Duits. / Wij zijn Duitsers.
2: Vocês {são} espanhóis? | Zijn jullie Spaans? / Zijn jullie Spanjaarden?
3: Chamo-me Ana. / Eu chamo-me Ana. | Ik heet Ana. / Mijn naam is Ana.
3: Como te chamas? | Hoe heet je? / Hoe heet jij? / Wat is je naam?
3: Como se chama? | Hoe heet u? / Hoe heet hij? / Hoe heet zij? / Wat is uw naam?
3: O meu nome é Tiago. | Mijn naam is Tiago. / Ik heet Tiago.
3: Ela {é} estudante. | Zij is student. / Ze is studente.
3: O João {é} médico. | João is dokter. / João is arts.
3: Ele é professor e ela é médica. | Hij is leraar en zij is dokter. / Hij is leraar en zij is arts.
3: A rapariga é minha amiga. | Het meisje is mijn vriendin.
` },

{ id: 'u3', s: 1, pt: 'O e a', en: 'Dingen en geslacht', tense: 'pres', gen: ['np', 'isto', 'ha'],
  lessons: [
    'Coisas|livro, casa, mesa, cadeira, porta, janela, chave, carro, telemóvel, caneta, isto',
    'Pessoas e animais|gato, cão, pessoa, criança, dia, mapa, mão, flor, cidade, hotel',
    'Muitos!|pão, estação, animal, mês, luz, há, um, dois, três',
  ],
  sents: `
1: Isto é um livro. | Dit is een boek.
1: Isto é uma chave? | Is dit een sleutel?
1: Não, isto é uma caneta. | Nee, dit is een pen.
1: A porta e a janela. | De deur en het raam.
1: O carro e a casa. | De auto en het huis.
1: Uma mesa e uma cadeira. | Een tafel en een stoel.
2: O gato e o cão. | De kat en de hond.
2: Isto é um mapa. | Dit is een kaart. / Dit is een plattegrond.
2: A criança e o gato. | Het kind en de kat.
2: Uma pessoa e uma flor. | Een persoon en een bloem.
2: Isto é um hotel? | Is dit een hotel?
3: Há três pães. | Er zijn drie broden. / Er zijn drie broodjes.
3: Os cães e os gatos. | De honden en de katten.
3: Há dois hotéis. | Er zijn twee hotels.
3: Os animais e as pessoas. | De dieren en de mensen.
3: Um mês, dois meses. | Eén maand, twee maanden. / Een maand, twee maanden.
3: Há uma estação e dois hotéis. | Er is een station en er zijn twee hotels. / Er zijn een station en twee hotels.
` },

{ id: 'u4', s: 1, pt: 'Verbos em -ar', en: 'Praten en doen', tense: 'pres', gen: ['sv_lang', 'morar', 'sv_adv', 'svo'],
  lessons: [
    'Falo português|v:falar, v:estudar, v:trabalhar, v:morar, português, inglês, Lisboa, Porto',
    'Não danço|v:cantar, v:dançar, v:nadar, v:cozinhar, v:viajar, muito, bem, mal',
    'Compro pão|v:comprar, v:tomar, v:precisar, v:chegar, v:ajudar, hoje, pão, café',
  ],
  sents: `
1: {Falo} português. / Eu falo português. | Ik spreek Portugees.
1: Tu {falas} inglês? / Falas inglês? | Spreek je Engels? / Spreek jij Engels?
1: Eu {moro} em Lisboa. / Moro em Lisboa. | Ik woon in Lissabon.
1: Nós {trabalhamos} no Porto. / Trabalhamos no Porto. | Wij werken in Porto. / We werken in Porto.
1: Ela {estuda} inglês. | Zij studeert Engels. / Ze leert Engels.
1: Eles não {moram} no Porto. | Zij wonen niet in Porto. / Ze wonen niet in Porto.
2: Tu {cantas} muito bem! / Cantas muito bem! | Jij zingt heel goed! / Je zingt heel goed!
2: Eu não {danço}. / Não danço. | Ik dans niet.
2: Ele {cozinha} muito bem. | Hij kookt heel goed.
2: Nós {viajamos} muito. / Viajamos muito. | Wij reizen veel. / We reizen veel.
2: A Ana {nada} mal. | Ana zwemt slecht. / Ana kan niet goed zwemmen.
2: Vocês {dançam} bem? | Dansen jullie goed?
3: {Compro} pão. / Eu compro pão. | Ik koop brood.
3: {Tomamos} um café? | Zullen we een koffie drinken? / Nemen we een koffie?
3: {Preciso} de ajuda. / Eu preciso de ajuda. | Ik heb hulp nodig.
3: O João {chega} hoje. | João komt vandaag aan. / João komt vandaag.
3: Tu {ajudas} o Pedro? | Help jij Pedro? / Help je Pedro?
3: Ela {toma} café todos os dias. | Zij drinkt elke dag koffie. / Ze drinkt elke dag koffie.
` },

{ id: 'u5', s: 1, pt: 'Comer e beber', en: 'Eten en drinken', tense: 'pres', gen: ['svo', 'gostar', 'querer'],
  lessons: [
    'Pão e queijo|v:comer, v:beber, pão, queijo, ovo, fruta, maçã, laranja, água, leite, sumo, chá',
    'Gosto de…|v:gostar, peixe, carne, frango, sopa, salada, arroz, bolo, vinho, cerveja',
    'No café|v:querer, café, bica, galão, pastel de nata, torrada, tosta mista, pequeno-almoço, conta, se faz favor',
  ],
  sents: `
1: Eu {como} pão com queijo. / Como pão com queijo. | Ik eet brood met kaas.
1: Ela não {bebe} leite. | Zij drinkt geen melk. / Ze drinkt geen melk.
1: {Bebes} água? / Tu bebes água? | Drink je water? / Drink jij water?
1: Nós {comemos} fruta todos os dias. / Comemos fruta todos os dias. | Wij eten elke dag fruit. / We eten elke dag fruit.
1: Eles {bebem} sumo de laranja. | Zij drinken sinaasappelsap. / Ze drinken sinaasappelsap.
1: {Como} uma maçã. / Eu como uma maçã. | Ik eet een appel.
2: {Gosto} muito de peixe. / Eu gosto muito de peixe. | Ik houd erg van vis. / Ik hou erg van vis. / Ik vind vis heel lekker.
2: {Gostas} de carne? / Tu gostas de carne? | Houd je van vlees? / Hou je van vlees? / Vind je vlees lekker?
2: Ela {gosta} do bolo. | Zij vindt de taart lekker. / Ze vindt de taart lekker.
2: Não {gostamos} de cerveja. / Nós não gostamos de cerveja. | Wij houden niet van bier. / We houden niet van bier. / We vinden bier niet lekker.
2: Ele {come} arroz com frango. | Hij eet rijst met kip.
2: Gosto da sopa da avó. | Ik vind de soep van oma lekker. / Ik houd van oma's soep. / Ik hou van oma's soep.
3: Queria um café, se faz favor. | Ik wil graag een koffie, alstublieft. / Ik zou graag een koffie willen, alstublieft. / Een koffie graag.
3: Uma bica e um pastel de nata, se faz favor. | Een espresso en een roomtaartje, alstublieft. / Een koffie en een roomtaartje, alstublieft.
3: Para mim, um galão e uma torrada. | Voor mij een galão en een toast. / Voor mij een koffie met melk en een toast.
3: A conta, se faz favor. | De rekening, alstublieft. / Mag ik de rekening?
3: O que é que {queres} comer? | Wat wil je eten? / Wat wil jij eten?
3: {Queres} uma tosta mista? / Tu queres uma tosta mista? | Wil je een tosti? / Wil jij een tosti? / Wil je een tosti ham-kaas?
` },

{ id: 'u6', s: 1, pt: 'Números', en: 'Getallen, leeftijd en prijzen', tense: 'pres', gen: ['ter_num', 'idade', 'custar'],
  lessons: [
    'Um, dois, três|zero, um, dois, três, quatro, cinco, seis, sete, oito, nove, dez, v:ter',
    'Quantos anos?|onze, doze, treze, catorze, quinze, dezasseis, dezassete, dezoito, dezanove, vinte, ano, idade, quanto',
    'Quanto custa?|trinta, quarenta, cinquenta, cem, mil, v:custar, euro, cêntimo, preço, dinheiro',
  ],
  sents: `
1: {Tenho} dois gatos. / Eu tenho dois gatos. | Ik heb twee katten.
1: Ela {tem} três cães. | Zij heeft drie honden. / Ze heeft drie honden.
1: {Temos} uma casa e dois carros. / Nós temos uma casa e dois carros. | Wij hebben een huis en twee auto's. / We hebben een huis en twee auto's.
1: {Tens} um cão? / Tu tens um cão? | Heb je een hond? / Heb jij een hond?
1: Eles não {têm} carro. | Zij hebben geen auto. / Ze hebben geen auto.
1: Há cinco pessoas. | Er zijn vijf mensen.
2: Quantos anos tens? | Hoe oud ben je? / Hoe oud ben jij?
2: {Tenho} dezanove anos. / Eu tenho dezanove anos. | Ik ben negentien. / Ik ben negentien jaar oud. / Ik ben negentien jaar.
2: Ele {tem} dezasseis anos. | Hij is zestien. / Hij is zestien jaar oud. / Hij is zestien jaar.
2: A Maria {tem} vinte anos. | Maria is twintig. / Maria is twintig jaar oud. / Maria is twintig jaar.
2: Quantos anos tem o senhor? | Hoe oud bent u?
2: Há doze meses num ano. | Er zijn twaalf maanden in een jaar. / Een jaar heeft twaalf maanden.
3: Quanto custa? | Hoeveel kost het? / Wat kost het?
3: {Custa} cinco euros. | Het kost vijf euro.
3: São dez euros, se faz favor. | Dat is tien euro, alstublieft. / Het is tien euro, alstublieft.
3: O livro {custa} trinta euros. | Het boek kost dertig euro.
3: Não {tenho} dinheiro. / Eu não tenho dinheiro. | Ik heb geen geld.
3: O café custa setenta cêntimos. | De koffie kost zeventig cent.
` },

{ id: 'u7', s: 2, pt: 'A família', en: 'Familie', tense: 'pres', gen: ['poss_np', 'poss_ser', 'ter_num'],
  lessons: [
    'A minha família|família, pai, mãe, pais, irmão, filho, marido, mulher, meu, teu',
    'Avós e tios|avô, avó, avós, tio, primo, neto, namorado, nosso, dele, dela',
    'Casado ou solteiro?|casado, solteiro, nome, idade, aniversário, amigo, v:chamar, Coimbra',
  ],
  sents: `
1: Esta é a minha mãe. | Dit is mijn moeder. / Dit is mijn mama.
1: O meu pai é médico. | Mijn vader is dokter. / Mijn vader is arts.
1: {Tens} irmãos? / Tu tens irmãos? | Heb je broers of zussen? / Heb jij broers of zussen? / Heb je broers?
1: {Tenho} uma irmã e dois irmãos. | Ik heb een zus en twee broers.
1: O marido dela é inglês. | Haar man is Engels. / Haar man is een Engelsman.
1: A tua mãe é portuguesa? | Is je moeder Portugees? / Is jouw moeder Portugese?
2: Os meus avós {moram} no Porto. | Mijn grootouders wonen in Porto. / Mijn opa en oma wonen in Porto.
2: A minha avó {tem} noventa anos. | Mijn oma is negentig. / Mijn grootmoeder is negentig jaar oud. / Mijn oma is negentig jaar.
2: O teu tio {trabalha} em Faro? | Werkt je oom in Faro? / Werkt jouw oom in Faro?
2: A prima do João chama-se Sofia. | De nicht van João heet Sofia. / João's nicht heet Sofia.
2: O nosso neto {tem} cinco anos. | Ons kleinkind is vijf. / Onze kleinzoon is vijf. / Onze kleinzoon is vijf jaar oud.
2: A namorada dele é espanhola. | Zijn vriendin is Spaans. / Zijn vriendin is een Spaanse.
3: Ela {é} casada. | Zij is getrouwd. / Ze is getrouwd.
3: {Sou} solteiro. / Eu sou solteiro. | Ik ben vrijgezel. / Ik ben niet getrouwd.
3: Como se chama o teu pai? | Hoe heet je vader? / Hoe heet jouw vader?
3: O meu irmão chama-se Rui. | Mijn broer heet Rui.
3: Hoje é o aniversário da minha mãe. | Vandaag is mijn moeder jarig. / Het is vandaag de verjaardag van mijn moeder.
3: A minha família é de Coimbra. | Mijn familie komt uit Coimbra.
` },

{ id: 'u8', s: 2, pt: 'Descrever', en: 'Dingen beschrijven', tense: 'pres', gen: ['ser_adj', 'estar_adj', 'np_adj'],
  lessons: [
    'Grande e pequeno|grande, pequeno, novo, velho, bonito, feio, caro, barato, bom, mau',
    'Ser ou estar?|v:estar, cansado, contente, triste, zangado, doente, ocupado, quente, frio',
    'Como é ela?|alto, baixo, simpático, engraçado, inteligente, tímido, fácil, difícil, tão',
  ],
  sents: `
1: A casa é grande e bonita. | Het huis is groot en mooi.
1: O carro é novo. | De auto is nieuw.
1: Os livros são caros. | De boeken zijn duur.
1: Temos um gato pequeno. | Wij hebben een kleine kat. / We hebben een klein katje.
1: O bolo é muito bom. | De taart is heel lekker. / De taart is erg goed.
1: Lisboa é uma cidade bonita. | Lissabon is een mooie stad.
2: {Estou} muito cansada. / Eu estou muito cansada. | Ik ben erg moe. / Ik ben heel moe.
2: O café {está} frio. | De koffie is koud.
2: A sopa {está} quente! | De soep is heet!
2: {Estás} triste? / Tu estás triste? | Ben je verdrietig? / Ben jij verdrietig?
2: Hoje {estou} ocupado. / Estou ocupado hoje. | Vandaag heb ik het druk. / Ik ben vandaag druk. / Ik heb het vandaag druk.
2: A Inês {está} doente. | Inês is ziek.
2: As crianças {estão} contentes. | De kinderen zijn blij.
3: Ela é alta e simpática. | Zij is lang en aardig. / Ze is lang en vriendelijk.
3: O português não é difícil. | Portugees is niet moeilijk.
3: O meu irmão é muito engraçado. | Mijn broer is heel grappig.
3: És tão inteligente! | Je bent zo slim! / Jij bent zo intelligent!
3: As raparigas são tímidas. | De meisjes zijn verlegen.
3: Isto é fácil. | Dit is makkelijk.
` },

{ id: 'u9', s: 2, pt: 'Na cidade', en: 'In de stad', tense: 'pres', gen: ['estar_loc', 'ficar_loc', 'ha_loc', 'onde'],
  lessons: [
    'Onde estás?|rua, praça, casa, escola, praia, parque, supermercado, restaurante, aqui',
    'Onde fica?|v:ficar, estação, banco, farmácia, hospital, museu, igreja, hotel, perto de, longe de, ao lado de',
    'Em casa|cozinha, sala, quarto, casa de banho, jardim, em cima de, debaixo de, ali, há',
  ],
  sents: `
1: {Estou} em casa. / Eu estou em casa. | Ik ben thuis.
1: As crianças {estão} na praia. | De kinderen zijn op het strand. / De kinderen zijn aan het strand.
1: Onde {estás}? | Waar ben je? / Waar ben jij?
1: {Estamos} no restaurante. / Nós estamos no restaurante. | Wij zijn in het restaurant. / We zitten in het restaurant.
1: A Ana {está} na escola. | Ana is op school.
1: O supermercado é aqui. | De supermarkt is hier.
2: Onde {fica} a estação, se faz favor? | Waar is het station, alstublieft? / Waar ligt het station?
2: {Fica} perto do hotel. | Het is bij het hotel. / Het ligt dicht bij het hotel.
2: O banco {fica} ao lado da farmácia. | De bank is naast de apotheek. / De bank ligt naast de apotheek.
2: O hospital {fica} longe daqui. | Het ziekenhuis is ver hiervandaan. / Het ziekenhuis ligt ver hiervandaan.
2: O museu {fica} na praça. | Het museum is aan het plein. / Het museum ligt op het plein.
2: A igreja {fica} perto do museu. | De kerk is dicht bij het museum. / De kerk ligt vlak bij het museum.
3: Há uma farmácia aqui perto? | Is er hier een apotheek in de buurt? / Is er een apotheek in de buurt?
3: O gato {está} debaixo da mesa. | De kat is onder de tafel. / De kat zit onder de tafel.
3: As chaves {estão} em cima da mesa. | De sleutels liggen op tafel. / De sleutels zijn op de tafel.
3: A minha mãe {está} na cozinha. | Mijn moeder is in de keuken.
3: Há dois quartos e uma sala. | Er zijn twee slaapkamers en een woonkamer.
3: A casa de banho é ali. | De badkamer is daar.
` },

{ id: 'u10', s: 2, pt: 'Verbos em -er e -ir', en: 'Meer regelmatige werkwoorden', tense: 'pres', gen: ['svo', 'sv_adv'],
  lessons: [
    'Vivo aqui|v:viver, v:aprender, v:escrever, v:vender, v:responder, livro, carta, mensagem',
    'Abro a porta|v:abrir, v:partir, v:decidir, v:dividir, v:assistir, porta, janela, jogo',
    'Percebes?|v:perceber, v:ler, v:correr, v:discutir, jornal, revista, filme',
  ],
  sents: `
1: {Vivo} em Lisboa há dois anos. | Ik woon al twee jaar in Lissabon.
1: Ela {escreve} uma carta. | Zij schrijft een brief. / Ze schrijft een brief.
1: {Aprendemos} português. / Nós aprendemos português. | Wij leren Portugees. / We leren Portugees.
1: Eles {vendem} a casa. | Zij verkopen het huis. / Ze verkopen het huis.
1: {Respondes} à mensagem? | Beantwoord je het bericht? / Antwoord je op het bericht?
1: O João {escreve} muitas mensagens. | João schrijft veel berichten.
2: {Abro} a janela? / Eu abro a janela? | Zal ik het raam opendoen? / Zal ik het raam openen?
2: A loja {abre} hoje. | De winkel gaat vandaag open. / De winkel is vandaag open.
2: {Partimos} amanhã. / Nós partimos amanhã. | Wij vertrekken morgen. / We vertrekken morgen.
2: {Decides} tu. | Jij beslist. / Jij mag het zeggen.
2: {Dividimos} a conta? | Zullen we de rekening delen? / Delen we de rekening?
2: Eles {assistem} ao jogo. | Zij kijken naar de wedstrijd. / Ze kijken naar de wedstrijd.
3: {Percebes}? / Tu percebes? | Begrijp je het? / Snap je het?
3: Não {percebo} nada. | Ik begrijp er niets van. / Ik snap er niks van.
3: {Leio} o jornal todos os dias. | Ik lees elke dag de krant.
3: Ela {lê} muitos livros. | Zij leest veel boeken. / Ze leest veel boeken.
3: {Corremos} no parque. / Nós corremos no parque. | Wij rennen in het park. / We lopen hard in het park.
3: Eles {discutem} muito. | Zij maken veel ruzie. / Ze maken vaak ruzie.
` },

{ id: 'u11', s: 2, pt: 'Irregulares', en: 'Onregelmatige werkwoorden van elke dag', tense: 'pres', gen: ['ir_a', 'svo'],
  lessons: [
    'Vou e venho|v:ir, v:fazer, v:ver, v:vir, cinema, praia, televisão',
    'Dar e dizer|v:dar, v:dizer, v:sair, v:pôr, v:trazer, prenda, mesa',
    'Posso? Sei!|v:poder, v:querer, v:saber, v:ouvir, v:pedir, música, rádio',
  ],
  sents: `
1: {Vou} à praia. / Eu vou à praia. | Ik ga naar het strand.
1: {Vamos} ao cinema? | Zullen we naar de bioscoop gaan? / Gaan we naar de film?
1: O que é que {fazes}? / O que fazes? | Wat doe je? / Wat doe jij?
1: {Vejo} televisão à noite. / Eu vejo televisão à noite. | Ik kijk 's avonds televisie. / 's Avonds kijk ik tv.
1: {Vens} comigo? | Kom je mee? / Ga je met me mee?
1: Eles {vêm} de Espanha. | Zij komen uit Spanje. / Ze komen uit Spanje.
1: Ela {faz} um bolo. | Zij maakt een taart. / Ze bakt een taart.
2: {Dou}-te uma prenda. | Ik geef je een cadeau.
2: Ele {diz} que sim. | Hij zegt ja.
2: {Saímos} agora. / Nós saímos agora. | Wij gaan nu weg. / We gaan nu weg.
2: {Ponho} a mesa. / Eu ponho a mesa. | Ik dek de tafel.
2: {Trazes} o vinho? | Neem jij de wijn mee? / Breng je de wijn mee?
2: O que {dizes}? | Wat zeg je? / Wat vind jij ervan?
3: {Sei} nadar. / Eu sei nadar. | Ik kan zwemmen.
3: {Posso} entrar? | Mag ik binnenkomen? / Mag ik erin?
3: {Queres} ir à praia? | Wil je naar het strand? / Wil je naar het strand gaan?
3: Não {sei}. | Ik weet het niet.
3: {Ouves} música? | Luister je naar muziek? / Luister je muziek?
3: {Peço} um café. / Eu peço um café. | Ik bestel een koffie. / Ik vraag om een koffie.
3: {Podes} ajudar? | Kun je helpen? / Kan jij helpen?
` },

{ id: 'u12', s: 2, pt: 'Horas e dias', en: 'Tijd en data', tense: 'pres', gen: ['horas', 'horas', 'at_time'],
  lessons: [
    'Que horas são?|hora, minuto, meio-dia, meia-noite, cedo, tarde-adv, manhã, tarde, noite',
    'Os dias|dia, semana, fim de semana, segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo, hoje, amanhã, ontem',
    'Os meses|mês, ano, janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro, primavera, verão, outono, inverno',
  ],
  sents: `
1: Que horas são? | Hoe laat is het?
1: São dez horas. | Het is tien uur.
1: É uma e meia. | Het is half twee.
1: São sete e um quarto. | Het is kwart over zeven.
1: São seis menos um quarto. | Het is kwart voor zes.
1: É meio-dia. | Het is twaalf uur 's middags. / Het is middag.
1: {Chego} às nove da manhã. | Ik kom om negen uur 's ochtends aan. / Ik ben er om negen uur 's ochtends.
1: {Janto} às oito da noite. | Ik eet om acht uur 's avonds. / Ik eet 's avonds om acht uur.
2: Hoje é segunda-feira. | Vandaag is het maandag. / Het is vandaag maandag.
2: No sábado {vamos} à praia. | Zaterdag gaan we naar het strand. / Op zaterdag gaan we naar het strand.
2: À sexta-feira {janto} fora. | Op vrijdag eet ik buiten de deur. / Vrijdags eet ik uit.
2: Bom fim de semana! | Fijn weekend!
2: Amanhã é domingo. | Morgen is het zondag.
2: {Trabalho} de segunda a sexta. | Ik werk van maandag tot vrijdag.
3: O meu aniversário é em maio. | Mijn verjaardag is in mei. / Ik ben in mei jarig.
3: Em agosto está muito calor. | In augustus is het heel warm. / In augustus is het erg heet.
3: No inverno {chove} muito. | In de winter regent het veel. / 's Winters regent het veel.
3: O ano {tem} doze meses. | Het jaar heeft twaalf maanden. / Een jaar heeft twaalf maanden.
3: Na primavera há muitas flores. | In de lente zijn er veel bloemen.
` },

{ id: 'u13', s: 2, pt: 'A rotina', en: 'De dagelijkse routine', tense: 'pres', gen: ['reflex', 'at_time'],
  lessons: [
    'Levanto-me|v:levantar, v:deitar, v:acordar, cedo, tarde-adv, duche, pequeno-almoço',
    'Visto-me|v:vestir, v:lavar, v:sentar, v:despachar, roupa, dente, cara, depressa',
    'Um dia normal|v:almoçar, v:jantar, v:voltar, v:começar, v:acabar, trabalho, sempre, nunca, às vezes',
  ],
  sents: `
1: Levanto-me às sete. / Eu levanto-me às sete. | Ik sta om zeven uur op.
1: A que horas te levantas? | Hoe laat sta je op? / Hoe laat sta jij op?
1: Não me levanto cedo ao domingo. | Ik sta op zondag niet vroeg op. / Op zondag sta ik niet vroeg op.
1: Ela deita-se às onze. | Zij gaat om elf uur naar bed. / Ze gaat om elf uur naar bed.
1: {Acordo} às seis e meia. / Eu acordo às seis e meia. | Ik word om half zeven wakker.
1: {Tomo} duche de manhã. / Eu tomo duche de manhã. | Ik douche 's ochtends. / Ik neem 's ochtends een douche.
1: Levantamo-nos cedo. / Nós levantamo-nos cedo. | Wij staan vroeg op. / We staan vroeg op.
2: Visto-me depressa. / Eu visto-me depressa. | Ik kleed me snel aan.
2: Ele {lava} os dentes. | Hij poetst zijn tanden.
2: Sentem-se, por favor. | Gaat u zitten, alstublieft. / Gaan jullie zitten, alsjeblieft. / Ga zitten, alsjeblieft.
2: Despacha-te! | Schiet op!
2: Senta-te aqui. | Ga hier zitten.
2: As crianças vestem-se sozinhas. | De kinderen kleden zich zelf aan. / De kinderen kleden zich alleen aan.
3: {Almoço} sempre ao meio-dia. | Ik luncht altijd om twaalf uur. / Ik lunch altijd om twaalf uur.
3: O trabalho {começa} às nove. | Het werk begint om negen uur.
3: {Volto} para casa às seis. | Ik ga om zes uur naar huis. / Ik kom om zes uur thuis.
3: Nunca {janto} antes das oito. | Ik eet nooit voor achten. / Ik eet nooit voor acht uur.
3: Às vezes {acabo} tarde. | Soms ben ik laat klaar. / Soms stop ik laat.
3: Ela nunca se deita cedo. | Zij gaat nooit vroeg naar bed. / Ze gaat nooit vroeg naar bed.
` },
);
