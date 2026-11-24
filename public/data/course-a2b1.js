/* Azulejo · course, sections 3–4 (A2 → B1). European Portuguese. Same format as course-a1.js. */
window.AZ_COURSE = window.AZ_COURSE || { sections: [], units: [] };
window.AZ_COURSE.sections.push(
  { id: 3, pt: 'Histórias', en: 'Plannen en verhalen', level: 'A2' },
  { id: 4, pt: 'Mais longe', en: 'Verder', level: 'B1' },
);
window.AZ_COURSE.units.push(
{ id: 'u14', s: 3, pt: 'Planos', en: 'Plannen maken', tense: 'pres', gen: ['ir_inf', 'ter_de', 'modal'],
  lessons: [
    'Vou fazer|v:ir, amanhã, logo, próximo, fim de semana, v:visitar, v:jogar',
    'Tenho de ir|v:ter, v:precisar, v:estudar, v:limpar, v:arrumar, v:telefonar',
    'Queres vir?|v:querer, v:poder, v:gostar, v:saber, v:conhecer, v:convidar, festa',
  ],
  sents: `
1: Amanhã {vou} visitar a minha avó. | Morgen ga ik mijn oma bezoeken. / Ik ga morgen mijn oma opzoeken.
1: O que {vais} fazer no fim de semana? | Wat ga je in het weekend doen? / Wat ga je dit weekend doen?
1: {Vamos} jogar futebol logo. | We gaan straks voetballen. / Straks gaan we voetballen.
1: Eles {vão} viajar na próxima semana. | Zij gaan volgende week op reis. / Ze gaan volgende week reizen.
1: Ela {vai} comprar um carro novo. | Zij gaat een nieuwe auto kopen. / Ze gaat een nieuwe auto kopen.
1: Não {vou} sair hoje. | Ik ga vandaag niet uit. / Ik ga vandaag niet weg.
2: {Tenho} de trabalhar amanhã. | Ik moet morgen werken.
2: {Temos} de limpar a casa. | Wij moeten het huis schoonmaken. / We moeten het huis schoonmaken.
2: {Precisas} de estudar mais. | Je moet meer studeren. / Je moet meer leren.
2: {Tens} de arrumar o quarto! | Je moet je kamer opruimen! / Je moet de kamer opruimen!
2: Ele {tem} de telefonar à mãe. | Hij moet zijn moeder bellen. / Hij moet zijn moeder opbellen.
3: {Queres} jantar comigo? | Wil je met me uit eten? / Wil je met mij eten?
3: Não {posso} ir à festa. | Ik kan niet naar het feest. / Ik kan niet naar het feestje komen.
3: {Gosto} muito de cozinhar. | Ik kook heel graag. / Ik vind koken heel leuk.
3: {Sabes} tocar guitarra? | Kun je gitaar spelen? / Kan jij gitaar spelen?
3: {Quero} conhecer o Porto. | Ik wil Porto leren kennen. / Ik wil Porto zien.
3: {Vou} convidar os meus amigos. | Ik ga mijn vrienden uitnodigen.
` },

{ id: 'u15', s: 3, pt: 'Agora mesmo', en: 'Nu bezig', tense: 'pres', gen: ['prog', 'prog_iv'],
  lessons: [
    'Estou a comer|v:estar, agora, v:comer, v:beber, v:ler, v:escrever',
    'O que estás a fazer?|v:fazer, v:ver, v:ouvir, v:jogar, v:tocar, série, guitarra, piano',
    'Neste momento|v:dormir, v:trabalhar, v:chover, v:esperar, v:andar, autocarro, bebé',
  ],
  sents: `
1: {Estou} a comer. / Eu estou a comer. | Ik ben aan het eten. / Ik zit te eten.
1: O que {estás} a beber? | Wat drink je? / Wat ben je aan het drinken?
1: Ela {está} a ler um livro. | Zij leest een boek. / Ze is een boek aan het lezen.
1: {Estamos} a escrever uma mensagem. | We schrijven een bericht. / Wij zijn een bericht aan het schrijven.
1: Agora não, {estou} a comer! | Nu niet, ik ben aan het eten! / Niet nu, ik zit te eten!
2: O que {estás} a fazer? | Wat ben je aan het doen? / Wat doe je?
2: Eles {estão} a ver um filme. | Zij kijken een film. / Ze zitten een film te kijken.
2: {Estou} a ouvir música. | Ik luister naar muziek. / Ik ben naar muziek aan het luisteren.
2: As crianças {estão} a jogar futebol. | De kinderen zijn aan het voetballen. / De kinderen voetballen.
2: Ele {está} a tocar piano. | Hij speelt piano. / Hij is piano aan het spelen.
3: O bebé {está} a dormir. | De baby slaapt. / De baby ligt te slapen.
3: {Está} a chover! | Het regent!
3: {Estou} à espera do autocarro. / Estou a esperar o autocarro. | Ik wacht op de bus. / Ik sta op de bus te wachten.
3: A minha mãe {está} a trabalhar. | Mijn moeder is aan het werk. / Mijn moeder werkt.
3: {Ando} a aprender português. | Ik ben de laatste tijd Portugees aan het leren. / Ik leer de laatste tijd Portugees.
3: Neste momento {estamos} a almoçar. | Op dit moment zijn we aan het lunchen. / We zitten nu te lunchen.
` },

{ id: 'u16', s: 3, pt: 'Às compras', en: 'Winkelen en kleding', tense: 'pres', gen: ['np_adj', 'dem_adj', 'custar'],
  lessons: [
    'Roupa|roupa, camisa, camisola, casaco, calças, vestido, sapato, t-shirt, calças de ganga, v:vestir, v:usar',
    'Cores|cor, branco, preto, vermelho, azul, verde, amarelo, castanho, cinzento, cor-de-rosa',
    'Este ou aquele?|este, esse, aquele, isto, isso, aquilo, tamanho, v:experimentar, v:pagar, cartão',
  ],
  sents: `
1: {Preciso} de uma camisola nova. | Ik heb een nieuwe trui nodig.
1: Ela {usa} óculos. | Zij draagt een bril. / Ze draagt een bril.
1: Ele {veste} sempre calças de ganga. | Hij draagt altijd een spijkerbroek.
1: {Visto} um casaco porque está frio. | Ik trek een jas aan omdat het koud is.
1: Gostas do meu vestido? | Vind je mijn jurk mooi? / Vind jij mijn jurk leuk?
2: {Tenho} um carro vermelho. | Ik heb een rode auto.
2: A camisa branca é bonita. | Het witte overhemd is mooi.
2: Os sapatos dela são pretos. | Haar schoenen zijn zwart.
2: Qual é a tua cor preferida? | Wat is je lievelingskleur? / Wat is jouw favoriete kleur?
2: O céu está cinzento. | De lucht is grijs.
2: {Quero} umas calças azuis. | Ik wil een blauwe broek.
3: Quanto {custa} esta camisola? | Hoeveel kost deze trui? / Wat kost deze trui?
3: {Posso} experimentar? | Mag ik hem passen? / Mag ik het passen?
3: {Gosto} mais daquele casaco. | Ik vind die jas mooier. / Die jas vind ik leuker.
3: O que é isto? | Wat is dit?
3: Isso é muito caro! | Dat is heel duur!
3: {Pago} com cartão. | Ik betaal met de kaart. / Ik betaal met pin. / Ik pin.
3: Que tamanho veste? | Welke maat heeft u? / Welke maat draagt u?
` },

{ id: 'u17', s: 3, pt: 'Ontem', en: 'Gisteren (verleden tijd)', tense: 'pret', gen: ['svo', 'sv_adv'],
  lessons: [
    'Ontem|ontem, passado, v:falar, v:trabalhar, v:jantar, v:comprar, v:chegar',
    'Comi e bebi|semana, v:comer, v:beber, v:escrever, v:aprender, v:perceber, v:vender',
    'Já partiste?|já, ainda, v:partir, v:abrir, v:decidir, v:sair, v:ficar, v:começar',
  ],
  sents: `
1: Ontem {trabalhei} muito. | Gisteren heb ik veel gewerkt. / Ik heb gisteren hard gewerkt.
1: {Jantámos} num restaurante. / Nós jantámos num restaurante. | We hebben in een restaurant gegeten. / Wij aten in een restaurant.
1: Ela {comprou} um vestido. | Zij heeft een jurk gekocht. / Ze kocht een jurk.
1: A que horas {chegaste}? | Hoe laat ben je aangekomen? / Hoe laat kwam je aan?
1: {Cheguei} tarde. | Ik kwam laat aan. / Ik ben laat aangekomen.
1: {Falei} com o João na semana passada. | Ik heb vorige week met João gepraat. / Ik sprak vorige week met João.
2: {Comi} bacalhau ontem. | Ik heb gisteren bakkeljauw gegeten. / Gisteren at ik bakkeljauw.
2: {Bebemos} vinho verde. | Wij hebben vinho verde gedronken. / We dronken vinho verde.
2: Ele {escreveu} um livro. | Hij heeft een boek geschreven. / Hij schreef een boek.
2: Não {percebi}. | Ik heb het niet begrepen. / Ik begreep het niet.
2: {Venderam} a casa no ano passado. | Zij hebben vorig jaar het huis verkocht. / Ze verkochten vorig jaar het huis.
2: {Aprendeste} muito? | Heb je veel geleerd?
3: Já {comeste}? | Heb je al gegeten?
3: Ainda não. | Nog niet.
3: O comboio já {partiu}. | De trein is al vertrokken.
3: {Abri} a janela. | Ik heb het raam opengedaan. / Ik deed het raam open.
3: {Fiquei} em casa no sábado. | Ik ben zaterdag thuisgebleven. / Zaterdag bleef ik thuis.
3: O filme {começou} às nove. | De film begon om negen uur.
3: {Saímos} há dez minutos. | We zijn tien minuten geleden weggegaan. / We gingen tien minuten geleden weg.
` },

{ id: 'u18', s: 3, pt: 'Fui e fiz', en: 'Onregelmatig verleden', tense: 'pret', gen: ['svo', 'ir_a', 'estar_loc'],
  lessons: [
    'Fui a Sintra|v:ir, v:ser, v:estar, Sintra, viagem, férias',
    'O que fizeste?|v:fazer, v:ter, v:ver, v:dar, v:dizer',
    'Vieste?|v:vir, v:pôr, v:poder, v:querer, v:saber, v:trazer',
  ],
  sents: `
1: {Fomos} a Sintra no domingo. | Zondag zijn we naar Sintra gegaan. / We gingen zondag naar Sintra.
1: {Fui} ao cinema ontem. | Ik ben gisteren naar de bioscoop geweest. / Gisteren ging ik naar de bioscoop.
1: As férias {foram} ótimas. | De vakantie was geweldig.
1: Onde {estiveste}? | Waar was je? / Waar ben je geweest?
1: {Estive} em Lisboa na semana passada. | Ik was vorige week in Lissabon.
1: {Foi} um dia muito bonito. | Het was een heel mooie dag.
2: O que {fizeste} no fim de semana? | Wat heb je in het weekend gedaan? / Wat deed je in het weekend?
2: {Fiz} um bolo para a minha mãe. | Ik heb een taart gebakken voor mijn moeder. / Ik maakte een taart voor mijn moeder.
2: {Tive} um dia difícil. | Ik heb een moeilijke dag gehad. / Ik had een zware dag.
2: {Viste} o jogo? | Heb je de wedstrijd gezien?
2: Ela {disse} que sim. | Zij zei ja. / Ze heeft ja gezegd.
2: {Dei} uma prenda ao meu pai. | Ik heb mijn vader een cadeau gegeven. / Ik gaf mijn vader een cadeau.
3: Ele {veio} de comboio. | Hij kwam met de trein. / Hij is met de trein gekomen.
3: Onde {puseste} as chaves? | Waar heb je de sleutels gelegd? / Waar heb je de sleutels neergelegd?
3: Não {pude} ir à festa. | Ik kon niet naar het feest. / Ik kon niet naar het feest gaan.
3: Ela não {quis} comer. | Zij wilde niet eten. / Ze wilde niet eten.
3: {Soube} a notícia ontem. | Ik hoorde het nieuws gisteren. / Ik heb het nieuws gisteren gehoord.
3: {Trouxeste} o vinho? | Heb je de wijn meegebracht? / Heb je de wijn meegenomen?
` },

{ id: 'u19', s: 3, pt: 'Antigamente', en: 'Vroeger (onvoltooid verleden)', tense: 'imp', gen: ['svo', 'sv_adv'],
  lessons: [
    'Em criança|criança, aldeia, verão, v:morar, v:brincar, v:ir',
    'Era uma vez|antigo, v:ser, v:ter, v:haver, v:estar, v:viver',
    'Quando…|quando, enquanto, telefone, v:fazer, v:chover, v:tocar',
  ],
  sents: `
1: Em criança, {morava} numa aldeia. | Als kind woonde ik in een dorp. / Toen ik klein was, woonde ik in een dorp.
1: {Brincávamos} na rua. | We speelden op straat. / Wij speelden buiten op straat.
1: Todos os verões {íamos} à praia. | Elke zomer gingen we naar het strand.
1: Quando era pequeno, {comia} muita fruta. | Toen ik klein was, at ik veel fruit.
1: A minha avó {fazia} pão. | Mijn oma bakte brood. / Mijn grootmoeder maakte brood.
2: Era uma vez um gato. | Er was eens een kat.
2: A casa {era} grande e {tinha} um jardim. | Het huis was groot en had een tuin.
2: {Havia} muitas árvores. | Er waren veel bomen.
2: Eu {tinha} um cão chamado Bobi. | Ik had een hond die Bobi heette.
2: Antigamente {vivíamos} no Porto. | Vroeger woonden we in Porto.
2: {Estava} muito frio. | Het was erg koud. / Het was heel koud.
3: {Estava} a ler quando o telefone tocou. | Ik was aan het lezen toen de telefoon ging. / Ik zat te lezen toen de telefoon ging.
3: {Chovia} muito quando saímos. | Het regende hard toen we weggingen.
3: Enquanto ele {cozinhava}, eu arrumava a casa. | Terwijl hij kookte, ruimde ik het huis op.
3: {Queria} uma bica, se faz favor. | Ik wil graag een espresso, alstublieft. / Ik zou graag een koffie willen, alstublieft.
3: O que {fazias} quando te telefonei? | Wat deed je toen ik je belde?
3: {Eram} oito horas quando ela chegou. | Het was acht uur toen zij aankwam. / Het was acht uur toen ze aankwam.
` },

{ id: 'u20', s: 3, pt: 'O corpo e a saúde', en: 'Lichaam en gezondheid', tense: 'impa', gen: ['doer', 'impa'],
  lessons: [
    'Dói-me|cabeça, barriga, perna, braço, pé, costas, dente, dor, v:doer',
    'Estou doente|doente, febre, gripe, constipação, tosse, médico, farmácia, comprimido',
    'Descanse!|saúde, receita, v:tomar, v:descansar, v:beber, v:ficar, v:melhorar',
  ],
  sents: `
1: Dói-me a cabeça. | Ik heb hoofdpijn. / Mijn hoofd doet pijn.
1: Doem-me as costas. | Mijn rug doet pijn. / Ik heb rugpijn.
1: Dói-te o pé? | Doet je voet pijn?
1: Dói-lhe a barriga. | Hij heeft buikpijn. / Zij heeft buikpijn. / Zijn buik doet pijn. / Haar buik doet pijn.
1: Tenho dores de dentes. | Ik heb kiespijn. / Ik heb tandpijn.
1: Onde é que lhe dói? | Waar doet het pijn?
2: Estou doente. | Ik ben ziek.
2: Tenho febre e tosse. | Ik heb koorts en ik hoest. / Ik heb koorts en hoest.
2: Acho que tenho gripe. | Ik denk dat ik griep heb.
2: Ela está constipada. | Zij is verkouden. / Ze is verkouden.
2: Preciso de ir ao médico. | Ik moet naar de dokter. / Ik moet naar de huisarts.
2: A farmácia fica ao lado do café. | De apotheek is naast het café. / De apotheek ligt naast het café.
3: {Toma} este comprimido. | Neem deze pil. / Neem deze tablet.
3: {Beba} muita água e {descanse}. | Drink veel water en rust uit.
3: {Fica} em casa hoje. | Blijf vandaag thuis.
3: Não {comas} isso! | Eet dat niet!
3: As melhoras! | Beterschap!
3: Já estou melhor, obrigado. | Het gaat al beter, dank je. / Ik ben al beter, bedankt.
` },

{ id: 'u21', s: 4, pt: 'Viagens', en: 'Reizen en de weg vragen', tense: 'impa', gen: ['ir_de', 'impa_dir'],
  lessons: [
    'De comboio|comboio, autocarro, metro, elétrico, avião, carro, a pé, v:apanhar, v:demorar',
    'Bilhetes|bilhete, viagem, mala, passaporte, aeroporto, partida, chegada, voo, v:reservar',
    'Vire à direita|esquerda, direita, em frente, rua, esquina, semáforo, v:virar, v:seguir, v:atravessar',
  ],
  sents: `
1: {Vou} para o trabalho de metro. | Ik ga met de metro naar mijn werk. / Ik ga met de metro naar het werk.
1: {Vamos} de comboio para o Porto. | We gaan met de trein naar Porto.
1: {Apanho} o autocarro às oito. | Ik neem de bus om acht uur. / Ik pak om acht uur de bus.
1: Quanto tempo {demora} a viagem? | Hoe lang duurt de reis?
1: Ela {vai} a pé para a escola. | Zij loopt naar school. / Ze gaat te voet naar school.
1: O elétrico 28 {vai} para o castelo. | Tram 28 gaat naar het kasteel.
2: Um bilhete de ida e volta para Faro, se faz favor. | Een retourtje naar Faro, alstublieft. / Een retourkaartje naar Faro, alstublieft.
2: O voo {tem} uma hora de atraso. | De vlucht heeft een uur vertraging.
2: Onde {está} o meu passaporte? | Waar is mijn paspoort?
2: {Reservei} um quarto num hotel. | Ik heb een kamer in een hotel geboekt. / Ik heb een hotelkamer gereserveerd.
2: A partida é às dez e a chegada às duas. | Het vertrek is om tien uur en de aankomst om twee uur. / We vertrekken om tien uur en komen om twee uur aan.
2: A minha mala é pesada. | Mijn koffer is zwaar.
3: Desculpe, como {vou} para a estação? | Pardon, hoe kom ik bij het station? / Sorry, hoe kom ik naar het station?
3: {Siga} em frente e {vire} à direita. | Ga rechtdoor en sla rechtsaf. / Loop rechtdoor en ga naar rechts.
3: É a primeira rua à esquerda. | Het is de eerste straat links. / Het is de eerste straat aan de linkerkant.
3: {Atravesse} a rua no semáforo. | Steek de straat over bij het stoplicht.
3: {Vire} à esquerda na esquina. | Sla op de hoek linksaf. / Ga op de hoek naar links.
3: {Segue} sempre em frente. | Ga steeds rechtdoor. / Blijf rechtdoor lopen.
` },

{ id: 'u22', s: 4, pt: 'Pronomes', en: 'Voornaamwoorden als voorwerp', tense: 'pres', gen: ['pron_obj', 'pron_ind'],
  lessons: [
    'Vejo-o|o-pron, a-pron, os-pron, me, te, nos, v:conhecer, v:convidar, v:encontrar, v:ajudar, v:esperar',
    'Dá-me|lhe, v:dar, v:dizer, v:mostrar, v:emprestar, v:oferecer',
    'Vou comprá-lo|v:comprar, v:fazer, v:ver, v:abrir, v:levar, v:trazer',
  ],
  sents: `
1: Conheces a Maria? {Conheço}-a bem. | Ken je Maria? Ik ken haar goed.
1: {Vejo}-o todos os dias. | Ik zie hem elke dag. / Ik zie het elke dag.
1: Não o {vejo}. | Ik zie hem niet. / Ik zie het niet.
1: Eles {convidaram}-nos para jantar. | Zij hebben ons uitgenodigd om te eten. / Ze nodigden ons uit voor het eten.
1: {Espera}-me aqui. | Wacht hier op me. / Wacht hier op mij.
1: {Ajudas}-me? | Help je me? / Wil je me helpen? / Kun je me helpen?
1: {Encontrei}-os no café. | Ik kwam ze tegen in het café. / Ik heb ze in het café ontmoet.
2: Dá-me o livro, se faz favor. | Geef me het boek, alsjeblieft. / Geef mij het boek, alsjeblieft.
2: Já lhe {disse}. | Ik heb het hem al gezegd. / Ik heb het haar al gezegd. / Ik heb het hem al verteld. / Ik heb het haar al verteld.
2: Mostra-me a fotografia. | Laat me de foto zien. / Laat mij de foto zien.
2: {Emprestas}-me a tua caneta? | Leen je me je pen? / Mag ik je pen lenen?
2: {Ofereci}-lhe flores. | Ik heb haar bloemen gegeven. / Ik heb hem bloemen gegeven. / Ik gaf haar bloemen.
2: Quem te {disse} isso? | Wie heeft je dat verteld? / Wie zei je dat?
3: Vou comprá-lo amanhã. | Ik ga het morgen kopen. / Ik koop het morgen.
3: Fá-lo agora! | Doe het nu!
3: Quero vê-la. | Ik wil haar zien. / Ik wil het zien.
3: Abrimo-la juntos. | We maken het samen open. / We hebben het samen geopend.
3: Comprámo-los ontem. | We hebben ze gisteren gekocht.
3: {Trazes}-me um copo de água? | Breng je me een glas water? / Wil je me een glas water brengen?
3: Não os {leves}! | Neem ze niet mee!
` },

{ id: 'u23', s: 4, pt: 'Comparar', en: 'Vergelijken', tense: 'pres', gen: ['comp', 'tao'],
  lessons: [
    'Mais do que|mais, menos, rápido, lento, comboio, bicicleta, v:comparar',
    'Tão… como|tão, igual, diferente, alto, baixo, forte, fraco',
    'O melhor|melhor, pior, maior, menor, ótimo, péssimo, famoso',
  ],
  sents: `
1: O carro é mais caro do que a bicicleta. | De auto is duurder dan de fiets.
1: O avião é mais rápido do que o comboio. | Het vliegtuig is sneller dan de trein.
1: O meu irmão é mais novo do que eu. | Mijn broer is jonger dan ik.
1: Hoje está menos frio do que ontem. | Het is vandaag minder koud dan gisteren.
1: O autocarro é mais lento. | De bus is langzamer.
2: A Ana é tão alta como o pai. | Ana is net zo lang als haar vader. / Ana is even lang als haar vader.
2: Os dois livros são iguais. | De twee boeken zijn hetzelfde. / De twee boeken zijn gelijk.
2: Somos muito diferentes. | Wij zijn heel verschillend. / We zijn heel anders.
2: Ele não é tão forte como pensa. | Hij is niet zo sterk als hij denkt.
2: O Porto é tão bonito como Lisboa. | Porto is net zo mooi als Lissabon. / Porto is even mooi als Lissabon.
3: Este café é melhor do que aquele. | Deze koffie is beter dan die. / Deze koffie is lekkerder dan die.
3: É o melhor pastel de nata de Lisboa! | Het is het beste roomtaartje van Lissabon!
3: Hoje o tempo está pior. | Vandaag is het weer slechter. / Het weer is vandaag slechter.
3: Lisboa é maior do que Coimbra. | Lissabon is groter dan Coimbra.
3: O jantar estava ótimo. | Het eten was heerlijk. / Het diner was geweldig.
3: É o museu mais famoso da cidade. | Het is het beroemdste museum van de stad.
` },

{ id: 'u24', s: 4, pt: 'O futuro', en: 'Toekomst en voorwaardelijke wijs', tense: 'fut', gen: ['svo', 'gostaria'],
  lessons: [
    'Farei|amanhã, próximo, v:fazer, v:dizer, v:trazer, v:chover, v:prometer',
    'Gostaria de…|mesa, quarto, vista, v:gostar, v:poder, v:reservar, v:ajudar',
    'Seria bom|dinheiro, mundo, v:ser, v:ter, v:viver, v:comprar, v:viajar',
  ],
  sents: `
1: Amanhã {choverá} no norte. | Morgen zal het regenen in het noorden. / Morgen regent het in het noorden.
1: Prometo que {farei} tudo. | Ik beloof dat ik alles zal doen.
1: {Direi} a verdade. | Ik zal de waarheid zeggen. / Ik zal de waarheid vertellen.
1: Onde {estará} o João? | Waar zou João zijn? / Waar zal João zijn?
1: O que {trarás} para a festa? | Wat zul je meenemen naar het feest? / Wat neem je mee naar het feest?
1: Para o ano {viajaremos} para o Brasil. | Volgend jaar zullen we naar Brazilië reizen. / Volgend jaar reizen we naar Brazilië.
2: {Gostaria} de reservar uma mesa para dois. | Ik zou graag een tafel voor twee willen reserveren. / Ik wil graag een tafel voor twee reserveren.
2: {Poderia} ajudar-me, se faz favor? | Zou u me kunnen helpen, alstublieft? / Kunt u me helpen, alstublieft?
2: {Gostava} de ir contigo. | Ik zou graag met je meegaan. / Ik zou graag met jou meegaan.
2: {Poderíamos} jantar fora. | We zouden uit eten kunnen gaan.
2: {Queria} um quarto com vista para o mar. | Ik wil graag een kamer met uitzicht op zee. / Ik zou graag een kamer met zeezicht willen.
3: {Seria} bom viver perto do mar. | Het zou fijn zijn om bij de zee te wonen. / Het zou fijn zijn om aan zee te wonen.
3: Com mais dinheiro, {compraria} uma casa. | Met meer geld zou ik een huis kopen.
3: Ele disse que {viria}. | Hij zei dat hij zou komen.
3: Eu nunca {faria} isso. | Ik zou dat nooit doen.
3: {Viajarias} pelo mundo? | Zou je de wereld rondreizen? / Zou jij de wereld rond reizen?
` },

{ id: 'u25', s: 4, pt: 'O conjuntivo', en: 'De aanvoegende wijs', tense: 'cpres', gen: ['espero', 'quero_que', 'talvez'],
  lessons: [
    'Espero que…|v:esperar, v:vir, v:chegar, v:gostar, v:correr, v:ganhar',
    'Quero que…|v:querer, v:estudar, v:fazer, v:ir, v:ser, v:estar',
    'Talvez|talvez, embora, para que, oxalá, v:saber, v:haver, v:dar',
  ],
  sents: `
1: Espero que {venhas} à festa. | Ik hoop dat je naar het feest komt.
1: Espero que {gostes}. | Ik hoop dat je het leuk vindt. / Ik hoop dat je het lekker vindt.
1: Esperamos que tudo {corra} bem. | We hopen dat alles goed gaat.
1: Espero que ele {chegue} cedo. | Ik hoop dat hij vroeg komt. / Ik hoop dat hij op tijd aankomt.
1: Esperamos que a nossa equipa {ganhe}. | We hopen dat ons team wint.
2: Quero que {estudes} mais. | Ik wil dat je meer studeert. / Ik wil dat je meer leert.
2: A mãe quer que {façamos} os trabalhos de casa. | Mama wil dat we ons huiswerk maken. / Moeder wil dat we het huiswerk maken.
2: Não quero que {vás} sozinho. | Ik wil niet dat je alleen gaat.
2: É importante que {sejas} paciente. | Het is belangrijk dat je geduld hebt. / Het is belangrijk dat je geduldig bent.
2: Queres que eu {esteja} lá às oito? | Wil je dat ik er om acht uur ben?
3: Talvez {chova} amanhã. | Misschien regent het morgen.
3: Embora {esteja} cansada, vou sair. | Hoewel ik moe ben, ga ik uit. / Ook al ben ik moe, ik ga uit.
3: Talvez ela {saiba} a resposta. | Misschien weet zij het antwoord. / Misschien weet ze het antwoord.
3: Oxalá {haja} bilhetes! | Hopelijk zijn er kaartjes! / Laten we hopen dat er kaartjes zijn!
3: Falo devagar para que {percebas}. | Ik praat langzaam zodat je het begrijpt.
3: Duvido que eles {venham}. | Ik betwijfel of ze komen. / Ik denk niet dat ze komen.
` },

{ id: 'u26', s: 4, pt: 'Se eu pudesse', en: 'Als ik kon…', tense: 'cimp', gen: ['se_cimp'],
  lessons: [
    'Se eu tivesse…|dinheiro, tempo, rico, v:ter, v:ser, v:poder',
    'Se fosses…|férias, v:estar, v:saber, v:viver, v:falar, v:ganhar',
    'Queria que…|como, v:querer, v:vir, v:esperar, v:pedir, v:dizer',
  ],
  sents: `
1: Se eu {tivesse} tempo, aprendia piano. | Als ik tijd had, zou ik piano leren spelen. / Als ik tijd had, leerde ik piano spelen.
1: Se {tivéssemos} dinheiro, comprávamos uma casa. | Als we geld hadden, zouden we een huis kopen. / Als we geld hadden, kochten we een huis.
1: Se {fosse} rico, viajaria pelo mundo. | Als ik rijk was, zou ik de wereld rondreizen.
1: Se {pudesse}, ficava mais tempo. | Als ik kon, zou ik langer blijven. / Als het kon, bleef ik langer.
1: O que farias se {tivesses} um milhão? | Wat zou je doen als je een miljoen had?
2: Se {estivesses} cá, ias adorar. | Als je hier was, zou je het geweldig vinden.
2: Se {soubesse}, dizia-te. | Als ik het wist, zou ik het je zeggen. / Als ik het wist, zei ik het je.
2: Se {vivêssemos} perto do mar, íamos à praia todos os dias. | Als we bij de zee woonden, zouden we elke dag naar het strand gaan. / Als we aan zee woonden, gingen we elke dag naar het strand.
2: Se {falasses} mais devagar, eu percebia. | Als je langzamer praatte, zou ik het begrijpen. / Als je langzamer sprak, begreep ik het.
2: Se ela {ganhasse} a lotaria, deixava de trabalhar. | Als zij de loterij won, zou ze stoppen met werken. / Als ze de loterij won, stopte ze met werken.
3: Queria que {viesses} comigo. | Ik wilde dat je met me meeging. / Ik zou willen dat je met me meekwam.
3: Pediu-me que {esperasse}. | Hij vroeg me te wachten. / Zij vroeg me om te wachten.
3: Ela falou como se {soubesse} tudo. | Zij praatte alsof ze alles wist. / Ze sprak alsof ze alles wist.
3: Era bom que {chovesse}. | Het zou goed zijn als het regende. / Het zou fijn zijn als het ging regenen.
3: Disse-lhe que {viesse} cedo. | Ik zei hem vroeg te komen. / Ik zei haar dat ze vroeg moest komen. / Ik zei hem dat hij vroeg moest komen.
` },

{ id: 'u27', s: 4, pt: 'Quando chegares', en: 'Als je aankomt…', tense: 'cfut', gen: ['se_cfut'],
  lessons: [
    'Quando chegares|quando, v:chegar, v:ligar, v:acabar, v:sair, v:voltar',
    'Se tiveres tempo|se, sol, v:ter, v:poder, v:querer, v:estar',
    'Assim que souber|enquanto, v:saber, v:fazer, v:ver, v:ir, v:vir',
  ],
  sents: `
1: Quando {chegares}, liga-me. | Bel me als je aankomt. / Als je aankomt, bel me. / Bel me als je er bent.
1: Quando {acabares}, avisa-me. | Laat het me weten als je klaar bent. / Als je klaar bent, laat het me weten.
1: Quando {sairmos}, fechamos a porta. | Als we weggaan, doen we de deur dicht. / Als we weggaan, sluiten we de deur.
1: Quando {voltar} de férias, telefono-te. | Als ik terug ben van vakantie, bel ik je. / Als ik terugkom van vakantie, bel ik je.
1: Quando ele {chegar}, jantamos. | Als hij er is, gaan we eten. / Als hij aankomt, eten we.
2: Se {tiveres} tempo, vem jantar. | Als je tijd hebt, kom eten. / Kom eten als je tijd hebt.
2: Se {puderes}, ajuda-me. | Help me als je kunt. / Als je kunt, help me.
2: Se {quiseres}, vamos ao cinema. | Als je wilt, gaan we naar de bioscoop. / Als je zin hebt, gaan we naar de film.
2: Se {estiver} sol, vamos à praia. | Als de zon schijnt, gaan we naar het strand. / Als het zonnig is, gaan we naar het strand.
2: Se {chover}, ficamos em casa. | Als het regent, blijven we thuis.
3: Assim que {souber}, digo-te. | Zodra ik het weet, zeg ik het je. / Ik laat het je weten zodra ik het weet.
3: Faz como {quiseres}. | Doe maar wat je wilt. / Doe zoals je wilt.
3: Quando {vires} a Ana, dá-lhe um beijinho. | Als je Ana ziet, geef haar een kusje. / Geef Ana een kusje als je haar ziet.
3: Se {fores} ao Porto, prova uma francesinha. | Als je naar Porto gaat, probeer dan een francesinha.
3: Quando {vierem}, tragam o vinho. | Als jullie komen, neem dan de wijn mee. / Neem de wijn mee als jullie komen.
3: Enquanto {houver} vida, há esperança. | Zolang er leven is, is er hoop.
` },
);
