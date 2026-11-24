/* Azulejo · het cursusboek, deel 1 (A1): volgorde van de hoofdstukken, doelen, uitleg en schrijfopdrachten.
   De hoofdstukken gebruiken de units uit course-a1.js / course-a2b1.js (woorden en voorbeeldzinnen).
   Tekstopmaak, één blok per regel:
     @deel Titel {1,2}               (begin van een deel; de getallen zijn de lessen van de unit)
     ## Kop · ### Subkop · gewone regel = alinea · - opsomming
     > Portugees = Nederlands        (voorbeeld met afspeelknop)
     !tip …  !pt … (iets over Portugal, na "In Portugal")  !warn … (een veelgemaakte fout)
     |! kop | cellen |  en  | cel | cel |   (tabellen)
     @conj werkwoord[,werkwoord…] tijd   (een vervoegingstabel uit de engine)
     **vet**, *cursief*
   write: vrije schrijfopdrachten met een voorbeeldantwoord en handige woorden. */
window.AZ_BOOK = {
  levels: [
    { id: 1, code: 'A1', pt: 'Primeiros passos', en: 'Eerste stappen', chapters: ['u1', 'u2', 'u4', 'u3', 'u5', 'u6'] },
    { id: 2, code: 'A1+', pt: 'O dia a dia', en: 'Het dagelijks leven', chapters: ['u7', 'u8', 'u9', 'u10', 'u11', 'u12', 'u13'] },
    { id: 3, code: 'A2', pt: 'Histórias', en: 'Plannen en verhalen', chapters: ['u14', 'u15', 'u16', 'u17', 'u18', 'u19', 'u20'] },
    { id: 4, code: 'B1', pt: 'Mais longe', en: 'Verder', chapters: ['u21', 'u22', 'u23', 'u24', 'u25', 'u26', 'u27'] },
  ],
  // leesteksten bij elk hoofdstuk (de eerste is de hoofdtekst)
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
  pt: 'Olá!', en: 'Klanken en begroetingen',
  goals: ['De klanken horen die Europees-Portugees zo anders maken', 'Mensen op elk moment van de dag begroeten en gedag zeggen', 'De beleefdheidswoorden gebruiken die je vanaf dag één nodig hebt', 'Zeggen dat je het niet begrijpt'],
  text: `
@deel Hoe Portugees klinkt
## Hoe Europees-Portugees klinkt
Europees-Portugees klinkt heel anders dan Braziliaans-Portugees en dan Spaans, ook al is de spelling bijna hetzelfde. Het grootste verschil: **onbeklemtoonde klinkers verdwijnen bijna**. In Portugal "slikken" mensen de klinkers rond de beklemtoonde lettergreep in, dus woorden klinken korter dan ze eruitzien. Luister naar elk voorbeeld en schrik niet als het snel klinkt — dat is normaal.
> obrigado = dank je
> telefone = telefoon
> pequeno = klein
### Letters die anders klinken dan in het Nederlands
|! Spelling | Klinkt als | Voorbeelden |
| **s** of **z** aan het eind van een woord | *sj* zoals in "sjaal" | três, dois, luz |
| **s** tussen twee klinkers | *z* zoals in "zon" | casa, mesa |
| **ç** en **ss** | *s* zoals in "sok" | praça, passo |
| **ch** | *sj* | chá, chave |
| **j**, en **g** voor e of i | *zj* zoals in "garage" | já, gente |
| **lh** | *lj* zoals in "miljoen" | filho, trabalho |
| **nh** | *nj* zoals in "oranje" | vinho, amanhã |
| **r** aan het begin van een woord, en **rr** | een keelklank, zoals de Franse r | rua, carro |
| **h** | altijd stil | hotel, hoje |
| **-e** aan het eind | bijna stil | noite, tarde |
!tip Een **s** aan het eind die als *sj* klinkt, is de snelste manier om Europees-Portugees te herkennen: *três* klinkt als "tresj", *os dias* als "oesj die-asj".
### Neusklanken
De tilde (**~**) en een **m** of **n** na een klinker laten de klank door je neus gaan, een beetje zoals in het Franse *pain* of *bon*:
> pão = brood
> não = nee
> mãe = moeder
> bom dia = goedemorgen

@deel Klemtoon en accenten
## Waar ligt de klemtoon?
- Woorden die eindigen op **a, e, o** (met of zonder **s**), **am** of **em** hebben de klemtoon op de voorlaatste lettergreep: *ca*sa, *fa*lam, *ho*mem.
- Woorden die eindigen op **i, u, l, r, z, ã, ão** hebben de klemtoon op de laatste lettergreep: a*qui*, ho*tel*, fa*lar*, a*ma*nhã.
- Een geschreven accent geeft een uitzondering aan: ca*fé*, *mé*dico, *ú*til.
## De accenten
|! Teken | Wat het doet | Voorbeeld |
| **á é í ó ú** (accent aigu) | klemtoon, open klinker | café, avó |
| **â ê ô** (accent circonflexe) | klemtoon, gesloten klinker | você, avô |
| **ã õ** (tilde) | neusklinker | irmã, estações |
| **à** (accent grave) | a + a samengevoegd | vou à praia |
| **ç** (cedille) | een *s*-klank voor a, o, u | praça, açúcar |
!tip Accenten veranderen de betekenis: **avó** (oma, open o) en **avô** (opa, gesloten o) zijn verschillende woorden.
> o avô e a avó = opa en oma
> o café = de koffie
> o médico = de dokter

@deel Hallo en tot ziens {1}
## Hallo zeggen
- **Olá** kan op elk moment van de dag en tegen iedereen.
- **Bom dia** (goedemorgen) tot de lunch, **boa tarde** (goedemiddag) tot het donker wordt, **boa noite** (goedenavond, goedenacht) daarna. Je gebruikt ze om hallo én om gedag te zeggen.
> Bom dia! Tudo bem? = Goedemorgen! Hoe gaat het?
> Boa tarde! = Goedemiddag!
> Boa noite, até amanhã! = Goedenavond, tot morgen!
!pt groet je in winkels, cafés en liften eerst, voordat je iets anders zegt. Begin met *Bom dia* of *Boa tarde* voordat je iets vraagt — het overslaan klinkt onbeleefd.
## Gedag zeggen
| adeus | dag, vaarwel (een beetje definitief) |
| tchau | doei (informeel en heel gewoon) |
| até logo | tot straks (vandaag nog) |
| até amanhã | tot morgen |
| até já | tot zo |
!tip **Até já** betekent letterlijk *tot al*. Je hoort het elke keer als iemand even weg is.

@deel Hoe gaat het? Dank je en sorry {2,3}
## Hoe gaat het?
| Tudo bem? | Hoe gaat het? / Alles goed? (informeel) |
| Como estás? | Hoe gaat het met je? (tegen een vriend) |
| Como está? | Hoe gaat het met u? (beleefd) |
| Estou bem, obrigado. | Het gaat goed, dank je. |
| Mais ou menos. | Zo-zo. |
| Muito prazer. | Aangenaam. |
- Op *Tudo bem?* antwoord je vaak *Tudo bem!* of *Tudo, e contigo?* (Alles goed, en met jou?).
- Let op **estás** en **está**: twee vormen van hetzelfde werkwoord, *estar*. De eerste is voor een vriend, de tweede is beleefd — net als *je* en *u*. Hoofdstuk 2 legt uit hoe dat zit.
## Dank je, alsjeblieft, sorry
- **Obrigado** als je een man bent, **obrigada** als je een vrouw bent. Het past zich aan de persoon aan die *spreekt*, want het betekent letterlijk *verplicht*.
> Obrigada! — De nada. = Dank je! — Graag gedaan.
- **Por favor** en **se faz favor** betekenen allebei *alsjeblieft / alstublieft*. *Se faz favor* is heel Portugees, en zo roep je ook een ober.
- **Desculpe** (beleefd) of **desculpa** (tegen een vriend) betekenen *sorry* en *pardon*.
- **Com licença** is *pardon* als je langs iemand wilt of naar binnen wilt.
## Als je het niet begrijpt
> Desculpe, não percebo. = Sorry, ik begrijp het niet.
> Pode repetir, por favor? = Kunt u dat herhalen, alstublieft?
!pt is het gewone werkwoord voor *begrijpen* **perceber**: *Não percebo*. Je hoort ook *não entendo*, maar *não percebo* is degene die je moet leren.
`,
  write: [
    { task: 'Je loopt \'s ochtends een café binnen. Begroet de ober, vraag hoe het met hem gaat, beantwoord zijn vraag en zeg dank je.', model: '— Bom dia! Tudo bem?\n— Bom dia! Tudo bem, obrigado. E consigo?\n— Estou bem, obrigada.', hint: 'bom dia, tudo bem, obrigado / obrigada' },
    { task: 'Je komt \'s avonds een vriendin tegen. Zeg hallo, vraag hoe het met haar gaat, beantwoord haar en zeg gedag tot morgen.', model: '— Olá, Rita! Como estás?\n— Estou bem, obrigada. E tu?\n— Mais ou menos. Boa noite, até amanhã!', hint: 'olá, como estás, boa noite, até amanhã' },
  ],
},

u2: {
  pt: 'Eu, tu, você…', en: 'De personen en het werkwoord ser',
  goals: ['Alle grammaticale personen kennen: ik, jij, hij, zij, wij, jullie, zij', 'Kiezen tussen tu, você en o senhor / a senhora in Portugal', 'Begrijpen wat vós is, en waarom je het zelden hoort', 'Ser (zijn) vervoegen en zeggen wie je bent en waar je vandaan komt'],
  text: `
@deel De personen van het werkwoord {1}
## De personen van het werkwoord
Elk Portugees werkwoord verandert zijn uitgang afhankelijk van **wie** de handeling doet. Grammaticaboeken noemen dat de **personen**: de eerste persoon is degene die spreekt, de tweede persoon is degene tegen wie je praat, en de derde persoon is iedereen anders — elk in het enkelvoud en in het meervoud. In het Nederlands werkt het net zo (ik ben, jij bent, hij is), alleen heeft het Portugees meer verschillende vormen.
|! Persoon | Voornaamwoord | Nederlands | ser (zijn) |
| 1e enkelvoud | **eu** | ik | sou |
| 2e enkelvoud | **tu** | jij, je (informeel) | és |
| 3e enkelvoud | **ele · ela** | hij · zij | é |
| 3e enkelvoud | **você · o senhor · a senhora** | u (beleefd) | é |
| 1e meervoud | **nós** | wij | somos |
| 2e meervoud | **vós** | jullie (ouderwets) | sois |
| 3e meervoud | **eles · elas** | zij | são |
| 3e meervoud | **vocês · os senhores · as senhoras** | jullie | são |
Let op het belangrijkste in deze tabel: **de beleefde "u" gebruikt de derde persoon van het werkwoord**. *O senhor é* betekent letterlijk *de meneer is*. Het Nederlands kent dat ook een beetje: je zegt *u heeft* en *u kan*, net als *hij heeft* en *hij kan*. In het Portugees geldt het altijd: **você, o senhor en a senhora krijgen hetzelfde werkwoord als ele en ela**, en **vocês** krijgt hetzelfde werkwoord als **eles**.
- **Ele** is *hij*, **ela** is *zij*. Voor dingen betekenen *ele* en *ela* ook *het*, afhankelijk van het geslacht van het zelfstandig naamwoord.
- **Eles** is voor mannen of een gemengde groep; **elas** alleen voor vrouwen. Eén man in een groep vrouwen maakt het al *eles*.

@deel Tu, você of o senhor? {2}
## Tu, você of o senhor?
### Tu: vrienden, familie, kinderen, leeftijdgenoten
In Portugal is **tu** de gewone manier om met vrienden, familie, kinderen, collega's en steeds vaker ook jonge mensen die je net ontmoet te praten — zoals het Nederlandse *jij*.
> Tu és português? = Ben jij Portugees?
### O senhor en a senhora: beleefd en veilig
Tegen oudere mensen, in winkels, bij instanties of tegen iemand die je niet kent zeg je **o senhor** (tegen een man) of **a senhora** (tegen een vrouw), met het werkwoord in de derde persoon — zoals het Nederlandse *u*.
> A senhora é de Lisboa? = Komt u uit Lissabon? (tegen een vrouw)
> O senhor é o Dr. Silva? = Bent u dokter Silva?
### Você: voorzichtig mee zijn
**Você** is grammaticaal de beleefde "u", maar in Portugal kan het afstandelijk of zelfs een beetje onbeleefd klinken, vooral tegen oudere mensen. Veel Portugezen vermijden het helemaal: ze **laten het voornaamwoord weg** en gebruiken alleen het werkwoord, of ze gebruiken de naam van de persoon.
> É de Lisboa? = Komt u uit Lissabon? (helemaal zonder voornaamwoord)
> O Pedro quer um café? = Wil je een koffie, Pedro? (letterlijk: wil Pedro een koffie?)
!pt weet je niet welke je moet gebruiken? Laat het voornaamwoord weg: *É inglês?* Dat is beleefd en natuurlijk, en je ontloopt de keuze tussen tu en você.
### Vocês: meer dan één persoon
Voor meer dan één persoon gebruik je in Portugal **vocês** — voor vrienden en onbekenden. Het krijgt de *eles*-vorm van het werkwoord: *vocês são* (jullie zijn).

@deel Wat is vós?
## En wat is vós?
**Vós** is de oude tweede persoon meervoud, *jullie* — te vergelijken met het oude Nederlandse *gij*. In het moderne Europees-Portugees is het bijna verdwenen uit de spreektaal: **vocês** heeft zijn plaats ingenomen. Je komt het nog wel tegen:
- in de Bijbel, in gebeden en in de kerk: *Pai Nosso, que estais no céu* (Onze Vader, die in de hemel zijt)
- in oudere literatuur, poëzie en heel plechtige toespraken
- in sommige dorpen in het noorden van Portugal, waar oudere mensen nog *vós sois* of *vós falais* zeggen.
Zijn familieleden zijn nog springlevend: **vos** (jullie, aan jullie) als voorwerp, en **vosso** (jullie, van jullie) als bezittelijk voornaamwoord, allebei gebruikt bij *vocês*:
> Vejo-vos amanhã! = Tot morgen, allemaal! (letterlijk: ik zie jullie morgen)
> A vossa casa é linda. = Jullie huis is prachtig.
### Hoe vervoeg je vós?
Vós heeft in elke tijd een eigen uitgang, en die is heel regelmatig. Hier is de tegenwoordige tijd, naast de *vocês*-vorm die je echt gebruikt (de regelmatige werkwoorden leer je goed in hoofdstuk 3):
|! | -ar: falar | -er: comer | -ir: partir | ser |
| vocês — het gewone *jullie* | falam | comem | partem | são |
| vós — het oude *jullie* | fal**ais** | com**eis** | part**is** | sois |
- In de verleden tijd eindigt het op **-stes**: *falastes, comestes, partistes, fostes* (jullie spraken, aten, vertrokken, waren).
- In bevelen eindigt het op **-ai, -ei, -i** of **-de**: *falai! comei! parti! sede! ide!* — aan het eind van de mis zegt de priester *Ide em paz* (Ga in vrede).
- Elke vervoegingstabel in Azulejo laat de vós-vorm zien op een eigen gestreepte regel, dus je kunt hem altijd opzoeken. De [[vos|vós-pagina in de grammatica]] heeft alle tijden en de onregelmatige werkwoorden.
!tip Je moet vós-vormen *herkennen* — je ziet ze aan een uitgang op **-is** of **-des**: *sois, falais, comeis, partis, tendes, ides*. Zelf gebruiken hoeft niet: zeg *vocês*. Bij het oefenen blijft vós weg, tenzij je *Vós ook oefenen* aanzet bij **Ik → Instellingen**.
@see vos persons

@deel Ser: zijn {3}
## Het voornaamwoord weglaten
De uitgang van het werkwoord laat al zien wie er spreekt, dus het Portugees **laat eu, tu en nós meestal weg**:
> Sou de Lisboa. = Ik kom uit Lissabon.
> És estudante? = Ben je student?
> Somos amigos. = Wij zijn vrienden.
Houd *ele, ela, eles, elas* als anders niet duidelijk is wie je bedoelt, en gebruik elk voornaamwoord voor nadruk of tegenstelling:
> Eu sou do Porto, ela é de Faro. = Ik kom uit Porto, zij uit Faro.
## A gente
In de spreektaal hoor je vaak **a gente** (letterlijk *de mensen*) in de betekenis *wij*. Let op: het krijgt de **ele / ela**-vorm van het werkwoord, net als het Nederlandse *men*.
> A gente é do Porto. = Wij komen uit Porto.
Gebruik *nós* als je schrijft; *a gente* is prima onder vrienden.
## Ser: zijn
**Ser** is het werkwoord voor wat iemand of iets *is*: identiteit, nationaliteit, herkomst, beroep en karakter.
@conj ser pres
- Herkomst en nationaliteit: **Sou de Londres. Sou inglês.**
- Beroep, zonder lidwoord — net als in het Nederlands: **Ela é médica.** (zij is arts)
- Identiteit: **O meu nome é Tiago.**
> Eles são do Brasil, mas nós somos de Portugal. = Zij komen uit Brazilië, maar wij komen uit Portugal.
- Voor een ontkenning zet je **não** vóór het werkwoord: *Não sou francês.*
## Nationaliteiten passen zich aan
Nationaliteiten zijn bijvoeglijke naamwoorden: ze veranderen voor een vrouw en voor meer dan één persoon.
|! | een man | een vrouw | mannen | vrouwen |
| Portugees | português | portuguesa | portugueses | portuguesas |
| Engels | inglês | inglesa | ingleses | inglesas |
| Spaans | espanhol | espanhola | espanhóis | espanholas |
| Duits | alemão | alemã | alemães | alemãs |
| Italiaans | italiano | italiana | italianos | italianas |
| Braziliaans | brasileiro | brasileira | brasileiros | brasileiras |
!tip Nationaliteiten schrijf je in het Portugees met een kleine letter: *ele é francês*. Landen krijgen een hoofdletter: *Portugal, Inglaterra*.
## Ik heet…
- **Chamo-me Ana.** Ik heet Ana — letterlijk *ik noem mezelf Ana*.
- **Como te chamas?** Hoe heet je? (tegen een vriend) · **Como se chama?** (beleefd)
!pt komt het woordje *me* in een gewone zin **achter** het werkwoord, met een streepje: *Chamo-me*. Na een vraagwoord komt het ervoor: *Como te chamas?* Dat is typisch Portugees — in Brazilië zeggen ze *Me chamo*. Hoofdstuk 13 legt de regel uit.
`,
  write: [
    { task: 'Stel jezelf voor: je naam, waar je vandaan komt en je nationaliteit.', model: 'Olá! Chamo-me Tom. Sou holandês, sou de Utrecht.', hint: 'chamo-me, sou, de' },
    { task: 'Stel twee vrienden voor: hun namen, waar ze vandaan komen, hun nationaliteit en hun beroep.', model: 'O Pedro é português e é de Lisboa. A Rita é espanhola, é de Madrid. Eles são estudantes.', hint: 'é, são, eles' },
    { task: 'Vraag beleefd aan een vrouw die je niet kent of ze Portugese is en waar ze vandaan komt.', model: 'Desculpe, a senhora é portuguesa? De onde é?', hint: 'a senhora, é, de onde' },
  ],
},

u4: {
  pt: 'Conjugar verbos', en: 'Hoe werkwoorden werken: regelmatige werkwoorden',
  goals: ['Infinitieven, stammen en uitgangen begrijpen', 'Elk regelmatig werkwoord op -ar, -er of -ir vervoegen in de tegenwoordige tijd', 'Nee zeggen en vragen stellen', 'Vertellen waar je woont, welke talen je spreekt en wat je doet'],
  text: `
@deel Infinitief, stam en uitgang {1}
## Infinitief, stam en uitgang
De woordenboekvorm van een werkwoord is de **infinitief**, zoals *spreken* in het Nederlands. Elke Portugese infinitief eindigt op **-ar**, **-er** of **-ir** (plus *pôr*, *zetten*, en zijn familie). Die drie groepen heten de drie **vervoegingen** (*conjugações*):
|! Groep | Voorbeeld | Betekenis |
| 1e vervoeging: **-ar** | falar | spreken |
| 2e vervoeging: **-er** | comer | eten |
| 3e vervoeging: **-ir** | partir | vertrekken; breken |
Om een regelmatig werkwoord te vervoegen haal je **-ar, -er of -ir** eraf om de **stam** te vinden (*fal-, com-, part-*) en zet je de uitgang voor elke persoon erachter. In het Nederlands doe je hetzelfde: *werk-en* → ik *werk*, hij *werk-t*. Hier staan de drie naast elkaar, met de uitgangen vetgedrukt:
@conj falar,comer,partir pres
## Het patroon achter de uitgangen
Kijk goed en je ziet een logica die in bijna elke tijd terugkomt:
|! Persoon | Uitgang | De aanwijzing |
| eu | **-o** | eu eindigt in de tegenwoordige tijd bijna altijd op -o |
| tu | **-s** | tu-vormen eindigen bijna altijd op -s |
| ele · ela · você | **-a** of **-e** | de kale stam plus een klinker |
| nós | **-mos** | nós eindigt altijd op -mos |
| vós | **-is** (-ais, -eis, -is) | het oude *jullie* ([[u2]]): falais, comeis, partis |
| eles · elas · vocês | **-m** | het meervoud eindigt altijd op -m |
- **-ar**-werkwoorden hebben een **a** in hun uitgangen: fal**as**, fal**a**, fal**amos**, fal**am**.
- **-er**- en **-ir**-werkwoorden hebben een **e**: com**es**, com**e**, com**em** · part**es**, part**e**, part**em**. Ze verschillen alleen bij *nós* en *vós*: com**emos**, part**imos**.
!tip Leer de uitgangen lezen en je weet altijd wie de handeling doet: *trabalhamos* kan alleen *wij werken* zijn; *moram* kan alleen *zij wonen* (of *jullie wonen*) zijn. Daarom kan het voornaamwoord weg.

@deel De meeste werkwoorden eindigen op -ar {2}
## De meeste werkwoorden eindigen op -ar
Ongeveer negen op de tien Portugese werkwoorden eindigen op **-ar**, en bijna allemaal zijn ze regelmatig — ken je *falar*, dan ken je honderden werkwoorden. Nieuwe werkwoorden worden ook altijd met -ar gemaakt.
@conj morar,trabalhar pres
Een paar regelmatige -ar-werkwoorden om mee te beginnen: *falar* (spreken), *trabalhar* (werken), *estudar* (studeren), *morar* (wonen), *cantar* (zingen), *dançar* (dansen), *nadar* (zwemmen), *cozinhar* (koken), *viajar* (reizen), *comprar* (kopen), *tomar* (nemen; iets drinken), *chegar* (aankomen), *ajudar* (helpen), *precisar de* (nodig hebben).
## Nee zeggen
Zet **não** direct vóór het werkwoord. Het Portugees heeft geen *niet* achteraan nodig:
> Não falo alemão. = Ik spreek geen Duits.
> Ela não trabalha hoje. = Zij werkt vandaag niet.
> Não, não moro em Lisboa. = Nee, ik woon niet in Lissabon.
!tip De dubbele *não* in het laatste voorbeeld is normaal: de eerste beantwoordt de vraag (nee), de tweede maakt het werkwoord ontkennend (niet).

@deel Vragen stellen {3}
## Vragen stellen
Een ja/nee-vraag ziet er precies zo uit als een gewone zin — alleen gaat je stem aan het eind omhoog. Je hoeft de woorden niet om te draaien zoals in het Nederlands:
> Falas inglês. = Je spreekt Engels.
> Falas inglês? = Spreek je Engels?
Om *ja* te zeggen **herhalen** Portugezen meestal het werkwoord, in plaats van *sim* te zeggen:
> Falas português? — Falo, um pouco. = Spreek je Portugees? — Ja, een beetje.
### Vraagwoorden
| onde | waar | Onde moras? |
| o que | wat | O que estudas? |
| quem | wie | Quem fala inglês? |
| quando | wanneer | Quando chegas? |
| como | hoe | Como se diz *dank je*? |
| porque · porquê | waarom | Porque estudas português? |
!pt is *waarom* **porque** aan het begin van een vraag en **porquê** aan het eind: *Estudas português porquê?* Het antwoord, *omdat*, is **porque**.
## Werkwoorden met een extra woordje
Sommige werkwoorden hebben altijd een voorzetsel bij zich. **Precisar** (nodig hebben) krijgt **de**:
> Preciso de ajuda. = Ik heb hulp nodig.
> Precisas de um táxi? = Heb je een taxi nodig?
## Talen
Talen zijn mannelijk en je schrijft ze met een kleine letter: *o português, o inglês, o espanhol*. Na *falar*, *estudar* en *aprender* valt het lidwoord meestal weg:
> Falo inglês e um pouco de português. = Ik spreek Engels en een beetje Portugees.
`,
  write: [
    { task: 'Schrijf drie of vier zinnen over jezelf: waar je woont, welke talen je spreekt en of je werkt of studeert.', model: 'Moro em Amesterdão. Falo holandês, inglês e um pouco de português. Trabalho num banco e estudo português à noite.', hint: 'moro, falo, trabalho, estudo' },
    { task: 'Stel een nieuwe vriend drie vragen: waar hij woont, wat hij studeert en of hij kookt.', model: 'Onde moras? O que estudas? Cozinhas bem?', hint: 'onde, o que, -as' },
    { task: 'Schrijf over je familie met nós en eles: waar jullie wonen en wat jullie doen.', model: 'Nós moramos em Utrecht. Os meus pais trabalham muito e viajam ao fim de semana. Eu e o meu irmão estudamos.', hint: 'moramos, trabalham, estudamos' },
  ],
},

u3: {
  pt: 'O e a', en: 'Zelfstandige naamwoorden, geslacht en meervoud',
  goals: ['Weten of een zelfstandig naamwoord mannelijk of vrouwelijk is', 'O, a, os, as en um, uma, uns, umas gebruiken', 'Meervouden maken, ook van de lastige woorden op -ão', 'Zeggen wat er is met há'],
  text: `
@deel Elk woord heeft een geslacht {1}
## Elk zelfstandig naamwoord heeft een geslacht
Elk Portugees zelfstandig naamwoord is **mannelijk** of **vrouwelijk** — ook voorwerpen en ideeën. Het Nederlands heeft *de* en *het*; het Portugees heeft **o** (mannelijk) en **a** (vrouwelijk). Ze passen niet op elkaar: *het huis* is *a casa*, *de auto* is *o carro*. De woorden voor *de/het* en *een* veranderen mee:
|! | mannelijk | vrouwelijk |
| de, het | **o** livro | **a** casa |
| een | **um** livro | **uma** casa |
| de (meervoud) | **os** livros | **as** casas |
| een paar | **uns** livros | **umas** casas |
> O livro e a caneta. = Het boek en de pen.
> Uma mesa e uma cadeira. = Een tafel en een stoel.
## Het geslacht raden
- Woorden op **-o** zijn meestal mannelijk: *o carro, o livro, o gato*.
- Woorden op **-a** zijn meestal vrouwelijk: *a casa, a mesa, a porta*.
- Woorden op **-ção, -são, -dade, -gem** zijn vrouwelijk: *a estação, a televisão, a cidade, a viagem*.
- Veel woorden op **-ma** zijn mannelijk: *o problema, o sistema, o programa*.
- Woorden op **-e** of op een medeklinker kunnen allebei: *o leite* maar *a chave*; *o hotel* maar *a flor*.
!warn Let op de beroemde uitzonderingen: **o dia, o mapa, o sofá** zijn mannelijk; **a mão** (hand) is vrouwelijk.
!tip Leer een woord altijd **met zijn lidwoord**: niet *leite* maar **o leite**, niet *chave* maar **a chave** — net zoals je in het Nederlands *het huis* leert en niet alleen *huis*. Azulejo laat woorden altijd zo zien.

@deel Mensen, en wat er is {2}
## Mensen: mannelijk en vrouwelijk
Veel woorden voor mensen hebben een mannelijke en een vrouwelijke vorm:
| o amigo · a amiga | vriend · vriendin |
| o professor · a professora | leraar · lerares |
| o português · a portuguesa | Portugees · Portugese |
| o estudante · a estudante | student — hetzelfde woord, alleen het lidwoord verandert |
Een gemengde groep is altijd **mannelijk meervoud**: *os amigos* kunnen allemaal mannen zijn, of mannen en vrouwen.
## Dit is…
**Isto é…** betekent *dit is…* — voor iets waar je naar wijst, voordat je het een naam geeft:
> Isto é uma chave. = Dit is een sleutel.
> O que é isto? = Wat is dit?
## Er is, er zijn: há
**Há** (van het werkwoord *haver*) betekent zowel *er is* als *er zijn* — het verandert nooit:
> Há um gato na rua. = Er is een kat op straat.
> Há dois cafés aqui. = Er zijn hier twee cafés.
> Não há pão. = Er is geen brood.
!pt gebruik je **há**. In het Braziliaans-Portugees zeggen ze vaak *tem* voor *er is*.
## Een eerste blik op samentrekkingen
Kleine woordjes smelten samen met het lidwoord: **de + o = do**, **em + a = na**, **a + o = ao**. Hoofdstuk 9 behandelt ze goed; nu hoef je ze alleen te herkennen:
> o livro do Pedro = het boek van Pedro

@deel Meervouden {3}
## Meervouden
|! Woord eindigt op | Regel | Voorbeelden |
| een klinker | **-s** erachter | casa → casas, café → cafés |
| -r, -z, of een beklemtoonde -s | **-es** erachter | flor → flores, luz → luzes, mês → meses |
| -m | wordt **-ns** | homem → homens, viagem → viagens |
| -l | wordt **-is** | hotel → hotéis, animal → animais |
| -ão | **-ões**, **-ães** of **-ãos** | estação → estações, pão → pães, mão → mãos |
!warn De meeste woorden op -ão krijgen **-ões**: *estações, televisões, limões*. Een paar krijgen **-ães** (*pães, cães, alemães*) of **-ãos** (*mãos, irmãos*). Leer die als je ze tegenkomt.
> Os cães e os gatos. = De honden en de katten.
> Há dois hotéis. = Er zijn twee hotels.
> Um mês, dois meses. = Eén maand, twee maanden.
`,
  write: [
    { task: 'Kijk rond in de kamer waar je bent en schrijf op wat er is — minstens vijf dingen, met um of uma.', model: 'No meu quarto há uma cama, uma mesa, uma cadeira, um computador e dois livros.', hint: 'há, um, uma, dois' },
    { task: 'Schrijf op wat er in jouw straat of stad is: winkels, cafés, een station… Gebruik meervouden.', model: 'Na minha rua há três cafés, dois restaurantes e um hotel. Também há uma estação e muitas casas.', hint: 'há, -s, -es, -ões' },
  ],
},

u5: {
  pt: 'Comer e beber', en: 'Eten, drinken en dingen lekker vinden',
  goals: ['De regelmatige -er-werkwoorden comer en beber gebruiken', 'Zeggen wat je lekker of leuk vindt met gostar de', 'Op z\'n Portugees bestellen in een café', 'De woorden voor eten leren die je op elke menukaart ziet'],
  text: `
@deel Comer en beber {1}
## Comer en beber
Allebei zijn het regelmatige **-er**-werkwoorden, dus ze volgen het patroon van *comer* uit hoofdstuk 3:
@conj comer,beber pres
> Como sopa todos os dias. = Ik eet elke dag soep.
> Bebemos café depois do almoço. = Wij drinken koffie na de lunch.
## Maaltijden
| o pequeno-almoço | het ontbijt |
| o almoço | de lunch |
| o lanche | het tussendoortje ('s middags) |
| o jantar | het avondeten |
De bijbehorende werkwoorden zijn regelmatige -ar-werkwoorden: **almoçar** (lunchen), **lanchar** (een tussendoortje eten), **jantar** (avondeten).
> Almoçamos à uma. = Wij lunchen om één uur.

@deel Gostar de: lekker vinden, houden van {2}
## Gostar de: lekker vinden, houden van
**Gostar** is een regelmatig -ar-werkwoord, maar het komt altijd met **de** — in het Portugees houd je *van* iets, net als in het Nederlands:
@conj gostar pres
**De** smelt samen met het lidwoord erna: **de + o = do**, **de + a = da**, **de + os = dos**, **de + as = das**.
> Gostas de peixe? = Hou je van vis? (vis in het algemeen)
> Gosto muito da sopa da minha avó. = Ik vind de soep van mijn oma heel lekker.
> Não gosto nada de café. = Ik vind koffie helemaal niet lekker.
- Voor eten in het algemeen gebruik je **de** zonder lidwoord: *Gosto de fruta.* Voor iets bepaalds komt het lidwoord erbij: *Gosto do pão desta padaria.*
- Iets graag *doen*: **gostar de + infinitief**: *Gosto de cozinhar.* (Ik kook graag.)
!warn Vergeet de **de** niet: *Gosto chocolate* is fout. Het moet zijn *Gosto **de** chocolate*.

@deel Querer, en bestellen in het café {3}
## Querer: willen
**Querer** is onregelmatig bij *eu* en *ele*:
@conj querer pres
In een café kan *quero* een beetje bot klinken. Portugezen zeggen meestal **queria** — letterlijk *ik wilde*, maar gebruikt in de betekenis *ik wil graag*:
> Queria um café, se faz favor. = Ik wil graag een koffie, alstublieft.
> Queres uma água? = Wil je een water?
## In het café
|! Je vraagt om | Je krijgt |
| um café · uma bica | een espresso (*bica* is het woord in Lissabon) |
| um galão | een grote koffie met veel melk in een hoog glas |
| uma meia de leite | half koffie, half melk, in een kopje |
| um pastel de nata | het beroemde roomtaartje |
| uma torrada | een dikke geroosterde boterham met boter |
| uma tosta mista | een tosti ham-kaas |
| um sumo de laranja | een sinaasappelsap |
> Queria um galão e uma torrada, se faz favor. = Ik wil graag een galão en een toast, alstublieft.
> A conta, se faz favor. = De rekening, alstublieft.
> Quanto é? = Hoeveel is het?
!pt betekent **um café** gewoon een espresso, overal in het land. Het ontbijt (*o pequeno-almoço*) is licht: een koffie met een gebakje of een toast, vaak staand aan de bar.
`,
  write: [
    { task: 'Bestel ontbijt in een café: groet de ober, vraag om iets te drinken en iets te eten, en vraag hoeveel het is.', model: 'Bom dia! Queria um galão e uma torrada, se faz favor. Quanto é?', hint: 'queria, se faz favor, quanto é' },
    { task: 'Schrijf wat je wel en niet lekker vindt om te eten en te drinken — minstens vier zinnen.', model: 'Gosto muito de peixe e de sopa. Não gosto de carne. Bebo muito chá, mas não gosto de café. Como fruta todos os dias.', hint: 'gosto de, não gosto de, como, bebo' },
  ],
},

u6: {
  pt: 'Números', en: 'Getallen, leeftijd en prijzen',
  goals: ['Tellen van 0 tot 1000 en verder', 'Het onregelmatige werkwoord ter (hebben) gebruiken', 'Zeggen hoe oud je bent', 'Naar prijzen vragen en ze begrijpen'],
  text: `
@deel Tellen {1}
## Van 0 tot 20
| 0 zero | 1 um / uma | 2 dois / duas | 3 três | 4 quatro |
| 5 cinco | 6 seis | 7 sete | 8 oito | 9 nove |
| 10 dez | 11 onze | 12 doze | 13 treze | 14 catorze |
| 15 quinze | 16 dezasseis | 17 dezassete | 18 dezoito | 19 dezanove |
- **Um** en **dois** hebben een vrouwelijke vorm: *um euro, uma casa · dois euros, duas casas*.
- **20 vinte**.
!pt zeg en schrijf je **catorze, dezasseis, dezassete** en **dezanove**. In Brazilië schrijven ze *dezesseis, dezessete, dezenove* — je ziet allebei, maar gebruik de Portugese.
## Tientallen, honderdtallen en duizendtallen
| 30 trinta | 40 quarenta | 50 cinquenta | 60 sessenta |
| 70 setenta | 80 oitenta | 90 noventa | 100 cem |
- Tientallen en eenheden verbind je met **e** (en), en in het Portugees komt het tiental eerst: *vinte e um* (eenentwintig, letterlijk *twintig en een*), *trinta e cinco, noventa e nove*.
- **Cem** is precies 100. Vanaf 101 wordt het **cento**: *cento e dez* (110).
- De honderdtallen: 200 duzentos, 300 trezentos, 400 quatrocentos, 500 quinhentos, 600 seiscentos, 700 setecentos, 800 oitocentos, 900 novecentos. Ze passen zich aan vrouwelijke woorden aan: *duzentas pessoas*.
- **Mil** is 1000, zonder *um*: *mil euros, dois mil*.
- In lange getallen komt **e** voor de laatste groep: *mil e quinhentos* (1500), *dois mil e vinte e seis* (2026).
> Há cinco pessoas. = Er zijn vijf mensen.
> Há doze meses num ano. = Er zijn twaalf maanden in een jaar.

@deel Ter, en hoe oud ben je? {2}
## Ter: hebben
**Ter** is een van de nuttigste werkwoorden van de taal — en het is onregelmatig:
@conj ter pres
> Tenho dois irmãos. = Ik heb twee broers.
> Tens tempo? = Heb je tijd?
> Eles não têm carro. = Zij hebben geen auto.
!tip **Tem** (hij/zij heeft) en **têm** (zij hebben) klinken in het grootste deel van Portugal hetzelfde; alleen het dakje laat het verschil zien als je schrijft.
## Hoe oud ben je?
In het Portugees *heb* je jaren in plaats van dat je ze *bent*:
> Tenho vinte e cinco anos. = Ik ben 25.
> Quantos anos tens? = Hoe oud ben je?
> A minha avó tem oitenta anos. = Mijn oma is 80.
!warn Zeg nooit *Sou 25* — altijd **Tenho 25 anos**.

@deel Prijzen {3}
## Prijzen
> Quanto custa? = Hoeveel kost het? (één ding)
> Quanto custam? = Hoeveel kosten ze? (meer dan één)
> Custa três euros e cinquenta. = Het kost drie euro vijftig.
> São dez euros. = Dat is tien euro.
- **Custar** past zich aan aan wat er kost: *o bolo custa*, *os bolos custam*.
- Let op: in het Portugees zeg je *euros* met een meervouds-s, in het Nederlands *tien euro*.
!pt schrijf je decimalen met een komma en het euroteken achter het getal: **3,50 €** — net als in Nederland. Grote getallen krijgen een spatie of een punt: 1 500 of 1.500.
`,
  write: [
    { task: 'Schrijf over je familie met getallen: hoeveel broers en zussen je hebt en hoe oud iedereen is.', model: 'Tenho uma irmã e dois irmãos. A minha irmã tem vinte anos e os meus irmãos têm quinze e dezassete. Eu tenho vinte e três anos.', hint: 'tenho, tem, têm, anos' },
    { task: 'Je bent op de markt. Vraag naar de prijs van twee dingen en zeg wat je wilt kopen.', model: 'Bom dia! Quanto custam as laranjas? E quanto custa o pão? Queria um quilo de laranjas, se faz favor.', hint: 'quanto custa, quanto custam, queria' },
  ],
},

u7: {
  pt: 'A família', en: 'Familie en bezittelijke voornaamwoorden',
  goals: ['De leden van je familie noemen', 'De bezittelijke voornaamwoorden gebruiken: o meu, a tua, o nosso…', 'Zijn, haar en hun zeggen met dele, dela, deles', 'Vertellen of mensen getrouwd of vrijgezel zijn'],
  text: `
@deel Mijn, jouw, ons {1}
## Mijn, jouw, ons: ze passen bij het bezit
In het Portugees past het bezittelijk voornaamwoord zich aan het **bezit** aan, niet aan de bezitter. In Portugal komt het normaal **met het lidwoord**: *o meu carro* (mijn auto), *a minha casa* (mijn huis).
|! | mannelijk enkelvoud | vrouwelijk enkelvoud | mannelijk meervoud | vrouwelijk meervoud |
| mijn | o meu | a minha | os meus | as minhas |
| jouw (tu) | o teu | a tua | os teus | as tuas |
| zijn, haar, uw (beleefd) | o seu | a sua | os seus | as suas |
| ons, onze | o nosso | a nossa | os nossos | as nossas |
| jullie (vocês) | o vosso | a vossa | os vossos | as vossas |
> A minha mãe é professora. = Mijn moeder is lerares.
> Os teus pais moram aqui? = Wonen je ouders hier?
> A nossa casa é pequena. = Ons huis is klein.
- Een vrouw zegt **o meu marido** (mijn man), een man zegt **a minha mulher** (mijn vrouw): het voornaamwoord volgt het woord, niet de spreker.
!pt is **vosso** nog gewoon dagelijkse taal — het is het bezittelijk voornaamwoord bij *vocês*: *a vossa casa* (jullie huis). Anders dan *vós* vindt niemand het ouderwets klinken.
## Zijn, haar, hun: dele, dela
*O seu* kan zijn, haar, hun of uw betekenen — te veel mogelijkheden. Daarom gebruiken ze in Portugal voor *zijn* en *haar* liever **dele** (van hem), **dela** (van haar), **deles / delas** (van hen), en die komen **achter** het woord:
> o carro dele = zijn auto
> a casa dela = haar huis
> os filhos deles = hun kinderen
!tip Houd **o seu / a sua** voor een beleefd *uw*: *O seu nome, se faz favor?* (Uw naam, alstublieft?)

@deel De familie {2}
## De familie
| o pai · a mãe | os pais — de ouders |
| o filho · a filha | os filhos — de kinderen |
| o irmão · a irmã | os irmãos — broers en zussen |
| o avô · a avó | os avós — de grootouders |
| o tio · a tia | os tios — ooms en tantes |
| o primo · a prima | os primos — neven en nichten |
| o neto · a neta | os netos — de kleinkinderen |
| o marido · a mulher | de man · de vrouw (echtgenoten) |
| o namorado · a namorada | het vriendje · het vriendinnetje |
!warn **Os pais** betekent *de ouders* (vader en moeder), niet *de vaders*. Zo kan *os irmãos* ook broers en zussen betekenen.
!tip Het Nederlands heeft één woord *neef* voor twee familieleden; het Portugees maakt verschil: **o primo** is de zoon van je oom of tante, **o sobrinho** de zoon van je broer of zus.

@deel Getrouwd of vrijgezel? {3}
## Getrouwd of vrijgezel?
> Sou casado. / Sou casada. = Ik ben getrouwd.
> Sou solteiro. / Sou solteira. = Ik ben vrijgezel.
> Ela é casada com o Rui. = Zij is getrouwd met Rui.
- In het Portugees ben je getrouwd **com** (met) iemand — net als in het Nederlands.
## Namen met een lidwoord
Als je in Portugal *over* iemand praat, zet je een lidwoord voor de naam: **o João, a Inês**. Als je *tegen* iemand praat, niet.
> A Inês é minha prima. = Inês is mijn nicht.
> Olá, Inês! = Hoi, Inês!
- Na *ser* valt het lidwoord voor het bezittelijk voornaamwoord vaak weg: *É minha prima.*
`,
  write: [
    { task: 'Beschrijf je familie: wie ze zijn, hoe ze heten, hoe oud ze zijn en wat ze doen.', model: 'A minha família é pequena. O meu pai chama-se Jan e tem sessenta anos. A minha mãe é professora. Tenho um irmão, o Tom. Ele é casado e tem dois filhos.', hint: 'o meu, a minha, chama-se, tem' },
    { task: 'Beschrijf de familie van een vriend of vriendin met dele of dela.', model: 'A Sara tem dois irmãos. O irmão dela mora em Faro e a irmã dela é estudante. Os pais dela são do Porto.', hint: 'dela, dele, os pais dela' },
  ],
},

u8: {
  pt: 'Descrever', en: 'Beschrijven: bijvoeglijke naamwoorden, ser en estar',
  goals: ['Bijvoeglijke naamwoorden laten passen bij het zelfstandig naamwoord', 'Kiezen tussen ser en estar', 'Mensen, plaatsen en dingen beschrijven', 'Heel, zo en behoorlijk zeggen'],
  text: `
@deel Bijvoeglijke naamwoorden {1}
## Bijvoeglijke naamwoorden passen zich aan
Bijvoeglijke naamwoorden passen zich aan het geslacht en het aantal van het zelfstandig naamwoord aan, en ze staan normaal **achter** het woord — andersom dan in het Nederlands (*een nieuwe auto* = *um carro novo*):
|! | mannelijk | vrouwelijk |
| enkelvoud | o carro novo | a casa nova |
| meervoud | os carros novos | as casas novas |
- Bijvoeglijke naamwoorden op **-o** hebben vier vormen: *novo, nova, novos, novas*.
- Bijvoeglijke naamwoorden op **-e** of op de meeste medeklinkers hebben er maar twee: *grande, grandes · fácil, fáceis · azul, azuis*.
- **-ês** wordt **-esa**, en **-or** wordt **-ora**: *inglês, inglesa · trabalhador, trabalhadora*.
## Ervoor of erachter?
De meeste bijvoeglijke naamwoorden staan achter het woord. Een paar heel gewone — *bom, mau, grande, pequeno, novo, velho* — kunnen er ook vóór staan, en sommige veranderen dan van betekenis:
> um homem grande = een grote man
> um grande homem = een groot man (belangrijk)
> um amigo velho = een bejaarde vriend
> um velho amigo = een oude vriend (al heel lang)
## Tegenstellingen
| grande ↔ pequeno | groot ↔ klein |
| novo ↔ velho | nieuw, jong ↔ oud |
| caro ↔ barato | duur ↔ goedkoop |
| bom ↔ mau | goed ↔ slecht |
| alto ↔ baixo | lang ↔ klein (van stuk) |
| fácil ↔ difícil | makkelijk ↔ moeilijk |
| bonito ↔ feio | mooi ↔ lelijk |

@deel Ser of estar? {2}
## Ser of estar?
Allebei betekenen ze *zijn*, en kiezen tussen de twee is een van de belangrijkste vaardigheden in het Portugees.
@conj ser,estar pres
### Ser: wat iets is
Identiteit, aard, blijvende eigenschappen, herkomst, beroep:
> A Ana é alta e simpática. = Ana is lang en aardig.
> O Porto é bonito. = Porto is mooi.
### Estar: hoe iets nu is
Toestanden, stemmingen, tijdelijke situaties — en waar mensen en dingen zijn:
> A Ana está cansada. = Ana is moe.
> A sopa está boa! = De soep is lekker!
> Estou em casa. = Ik ben thuis.
!tip Vraag jezelf af: is dit wat het *is*, of hoe het *op dit moment* is? *Ele é chato* betekent dat hij een saai mens is; *Ele está chato hoje* betekent dat hij vandaag vervelend doet.
!warn Sommige bijvoeglijke naamwoorden veranderen van betekenis: **ser aborrecido** = saai zijn, **estar aborrecido** = zich vervelen · **ser bom** = goed zijn, **estar bom** = het goed maken, lekker smaken.

@deel Heel, zo, behoorlijk {3}
## Heel, zo, behoorlijk, een beetje
- **muito** = heel, erg (verandert niet): *muito bonito, muito bonitas*
- **tão** = zo: *É tão caro!* (Het is zo duur!)
- **bastante** = behoorlijk: *bastante difícil*
- **um pouco** = een beetje: *Estou um pouco cansado.*
!pt is **fixe** het woord voor alles wat *tof, gaaf* is: *O concerto foi muito fixe!*
> Ela é alta e simpática. = Zij is lang en aardig.
> O meu irmão é muito engraçado. = Mijn broer is heel grappig.
`,
  write: [
    { task: 'Beschrijf je beste vriend of vriendin: hoe hij of zij is (ser) en hoe het vandaag gaat (estar).', model: 'A minha melhor amiga chama-se Laura. É alta, simpática e muito inteligente. Hoje está cansada e um pouco triste.', hint: 'é, está, muito' },
    { task: 'Beschrijf je dorp of stad met minstens vier bijvoeglijke naamwoorden — laat ze passen!', model: 'A minha cidade é pequena, mas é bonita. As ruas são antigas e as casas são brancas. Os restaurantes são bons e baratos.', hint: 'é, são, -o / -a / -os / -as' },
  ],
},

u9: {
  pt: 'Na cidade', en: 'Waar dingen zijn',
  goals: ['Zeggen waar mensen en dingen zijn', 'Em, de en a samenvoegen met het lidwoord: no, da, ao…', 'Ficar gebruiken voor gebouwen en plaatsen', 'Hier, daar en voorzetsels van plaats gebruiken'],
  text: `
@deel Estar en ficar: waar is het? {1,2}
## Estar voor waar dingen zijn
Met **estar** zeg je waar mensen en dingen zijn:
> Estou no café. = Ik ben in het café.
> As chaves estão em cima da mesa. = De sleutels liggen op tafel.
!tip Het Nederlands zegt vaak *liggen*, *staan* of *zitten* (de sleutels liggen op tafel, de kat zit onder de stoel). Het Portugees zegt gewoon **estar**.
## Ficar voor plaatsen
Voor gebouwen en plaatsen — dingen die nooit verhuizen — gebruikt het Portugees liever **ficar** (letterlijk *blijven*), zoals het Nederlandse *liggen*:
@conj ficar pres
> Onde fica a estação? = Waar is het station?
> O museu fica perto do rio. = Het museum ligt vlak bij de rivier.
## Hier en daar
Het Portugees heeft meer dan één *daar*:
| aqui | hier, bij mij |
| aí | daar, bij jou |
| ali | daar (verderop, je kunt het zien) |
| lá | daar, ver weg |
> O banco é ali, ao lado da farmácia. = De bank is daar, naast de apotheek.
## Há: wat er is
> Há uma farmácia perto daqui? = Is er een apotheek hier in de buurt?
> Na minha rua há dois cafés. = In mijn straat zijn twee cafés.

@deel In, van, naar: de samentrekkingen
## Em + lidwoord: in, op, aan
**Em** smelt samen met het lidwoord erna. *Em o* of *em a* zie je bijna nooit:
|! | o | a | os | as | um | uma |
| em + | **no** | **na** | **nos** | **nas** | **num** | **numa** |
> Moro no Porto. = Ik woon in Porto.
> Estou na praia. = Ik ben op het strand.
> Trabalho num banco. = Ik werk bij een bank.
## De + lidwoord: van, uit
|! | o | a | os | as |
| de + | **do** | **da** | **dos** | **das** |
> Sou do Porto. = Ik kom uit Porto.
> A casa da Ana. = Het huis van Ana.
!tip Het Portugees heeft geen *'s* zoals in *Ana's huis*: het is altijd *a casa da Ana* — het huis van Ana.
## A + lidwoord: naar
|! | o | a | os | as |
| a + | **ao** | **à** | **aos** | **às** |
> Vou ao cinema. = Ik ga naar de bioscoop.
> Vou à praia. = Ik ga naar het strand.
!tip Het accent op **à** heeft niets met klemtoon te maken: het laat alleen zien dat *a* + *a* zijn samengesmolten.
## Plaatsen met en zonder lidwoord
- De meeste steden hebben geen lidwoord: *em Lisboa, de Londres, a Madrid*.
- Sommige plaatsen wel: **o Porto, o Algarve, o Brasil, os Açores** → *no Porto, do Algarve, no Brasil, nos Açores*.
!pt staan veel landen na *em* zonder lidwoord: **em Portugal, em Espanha, em França, em Inglaterra**. Maar *o Brasil* krijgt er altijd een: *no Brasil*.

@deel Precies waar? {3}
## Precies waar?
| perto de | dicht bij | longe de | ver van |
| ao lado de | naast | em frente de | tegenover |
| em cima de | bovenop | debaixo de | onder |
| dentro de | in, binnen in | fora de | buiten |
| atrás de | achter | entre | tussen |
Die eindigen allemaal op **de**, en dat smelt samen met het lidwoord: *ao lado do banco, perto da praia, em cima da mesa*.
> O gato está debaixo da mesa. = De kat zit onder de tafel.
> A minha mãe está na cozinha. = Mijn moeder is in de keuken.
`,
  write: [
    { task: 'Beschrijf je straat of buurt: wat er is en waar de dingen zijn.', model: 'Moro numa rua perto do centro. Ao lado da minha casa há um café. O supermercado fica em frente da escola e a farmácia fica perto do banco.', hint: 'há, fica, ao lado de, perto de' },
    { task: 'Een vriend kan zijn spullen niet vinden in jouw woonkamer. Vertel waar alles is.', model: 'As chaves estão em cima da mesa, ao lado do telemóvel. O teu casaco está no sofá e os livros estão debaixo da cadeira.', hint: 'está, estão, em cima de, debaixo de' },
  ],
},

u10: {
  pt: 'Mais verbos regulares', en: 'Meer werkwoorden op -er en -ir',
  goals: ['Veel meer regelmatige werkwoorden op -er en -ir gebruiken', 'De spellingswijzigingen zien die de klank van een werkwoord bewaren', '-ir-werkwoorden herkennen die hun klinker veranderen in de eu-vorm'],
  text: `
@deel -er en -ir: bijna een tweeling {1,2}
## -er en -ir: bijna een tweeling
Je hebt *comer* en *partir* in hoofdstuk 3 leren kennen. Elk regelmatig werkwoord op -er en -ir volgt hetzelfde patroon, en de twee groepen verschillen alleen bij **nós** en **vós**:
@conj viver,abrir pres
> Vivo em Lisboa há dois anos. = Ik woon al twee jaar in Lissabon.
> Abrimos a loja às nove. = Wij gaan om negen uur open.
!tip Let op: *há dois anos* met de tegenwoordige tijd betekent *al twee jaar* — net als in het Nederlands gebruik je de tegenwoordige tijd voor iets wat nog steeds zo is.
## Handige werkwoorden
|! -er | | -ir | |
| viver | leven, wonen | abrir | openen |
| aprender | leren | partir | vertrekken; breken |
| escrever | schrijven | decidir | beslissen |
| vender | verkopen | dividir | delen, verdelen |
| responder | antwoorden | assistir a | kijken naar, bijwonen |
| perceber | begrijpen | discutir | bespreken; ruziën |
| correr | rennen | | |
!tip **Assistir a** betekent *kijken naar* of *bijwonen*, niet *assisteren*: *assistir a um jogo* = naar een wedstrijd kijken. *Helpen* is **ajudar**.
!tip **Viver** en **morar** betekenen allebei *wonen/leven*: *morar* is waar je woont (je adres); *viver* is breder: *viver bem* (goed leven), *viver em Portugal*.

@deel Klank en klinkers die veranderen {3}
## Spellingswijzigingen: de klank bewaren
Sommige regelmatige werkwoorden veranderen één letter, zodat de klank vóór **-o** of **-a** hetzelfde blijft. Ze zijn niet onregelmatig — het is alleen spelling:
|! Werkwoord | Waarom | eu-vorm |
| conhecer (kennen: een persoon of plaats) | c zou als k klinken voor o | **conheço** |
| parecer (lijken) | hetzelfde | **pareço** |
| proteger (beschermen) | g zou hard klinken voor o | **protejo** |
| dirigir (leiden; rijden) | hetzelfde | **dirijo** |
| distinguir (onderscheiden) | gu → g voor o | **distingo** |
## Klinkerwisseling in de eu-vorm
Een groep veelgebruikte -ir-werkwoorden met een **e** of **o** in de stam verandert die klinker alleen in de **eu**-vorm:
@conj vestir,dormir pres
|! Werkwoord | eu | tu | ele |
| sentir (voelen) | **sinto** | sentes | sente |
| servir (serveren) | **sirvo** | serves | serve |
| preferir (liever hebben) | **prefiro** | preferes | prefere |
| seguir (volgen) | **sigo** | segues | segue |
| tossir (hoesten) | **tusso** | tosses | tosse |
**Subir** (naar boven gaan) en **fugir** (vluchten) doen het andersom: de **u** wordt **o** bij tu, ele en eles: *subo, sobes, sobe, subimos, sobem*.
!tip Bij Werkwoorden zijn deze werkwoorden gemarkeerd als *stamwisseling*, en de veranderde vormen zijn gekleurd.
## Ler en perder
Twee heel gewone -er-werkwoorden zijn een beetje onregelmatig:
@conj ler,perder pres
> Não percebo nada. = Ik begrijp er niets van.
> Leio o jornal todos os dias. = Ik lees elke dag de krant.
`,
  write: [
    { task: 'Schrijf wat je in een gewone week leest, schrijft en leert.', model: 'Leio o jornal todos os dias e escrevo muitas mensagens. Aprendo português à noite e às vezes assisto a um jogo de futebol.', hint: 'leio, escrevo, aprendo, assisto a' },
    { task: 'Stel een vriend drie vragen met werkwoorden op -er en -ir en schrijf de antwoorden op.', model: '— Onde vives? — Vivo no Porto.\n— Percebes espanhol? — Percebo um pouco.\n— Preferes chá ou café? — Prefiro café.', hint: 'vives, percebes, preferes' },
  ],
},

u11: {
  pt: 'Os irregulares', en: 'De onregelmatige werkwoorden van elke dag',
  goals: ['De meest gebruikte onregelmatige werkwoorden in de tegenwoordige tijd vervoegen', 'Zeggen waar je heen gaat met ir a en ir para', 'Poder, saber en conhecer uit elkaar houden', 'Om iets vragen met pedir en een vraag stellen met perguntar'],
  text: `
@deel Ir en vir: gaan en komen {1}
## Waarom je ze nu leert
De werkwoorden die het meest gebruikt worden, zijn ook het meest onregelmatig: omdat mensen ze voortdurend gebruiken, hebben ze oude vormen bewaard — in het Nederlands is dat net zo (*zijn, hebben, gaan*). Het goede nieuws: de uitgangen volgen nog steeds het patroon uit hoofdstuk 3 (tu eindigt op -s, nós op -mos, eles op -m) en **nós is bijna altijd regelmatig**: *vamos, fazemos, dizemos, podemos*.
## Ir en vir: gaan en komen
@conj ir,vir pres
> Vou ao trabalho de carro. = Ik ga met de auto naar mijn werk.
> Vens à festa? = Kom je naar het feest?
- **ir a** + plaats: ergens kort heen gaan: *Vou a Lisboa amanhã.*
- **ir para** + plaats: ergens heen gaan om te blijven, of naar huis: *Vou para casa. Vou para Londres em setembro.*

@deel Fazer, dizer, dar en meer {2}
## Fazer, dizer, trazer
@conj fazer,dizer,trazer pres
- Hun eu-vormen eindigen op **-ço** of **-go**: *faço, digo, trago*.
> O que fazes? = Wat doe je?
> Digo sempre a verdade. = Ik zeg altijd de waarheid.
## Ver, dar, pôr, sair
@conj ver,dar,pôr,sair pres
!tip **Pôr** (zetten, leggen) is het enige werkwoord op *-or*. Zijn familie — *compor, propor, supor* — gaat precies zo.

@deel Poder, saber en conhecer {3}
## Poder, querer, saber
@conj poder,querer,saber pres
- **Poder** = kunnen, mogen — iets kunnen op dit moment, een mogelijkheid, toestemming: *Posso entrar?* (Mag ik binnenkomen?)
- **Saber** = een feit weten, en *kunnen* in de zin van *geleerd hebben*: *Sei nadar.* (Ik kan zwemmen.)
- **Conhecer** = een persoon of plaats kennen: *Conheço o Porto. Conheces a Ana?*
!warn Het Nederlands gebruikt *kunnen* voor allebei, het Portugees niet: **Sei nadar** = ik kan zwemmen (ik heb het geleerd) · **Posso nadar** = ik mag / ik kan nu zwemmen.
!tip Net als in het Nederlands: *weten* is **saber** (Ik weet het niet = *Não sei*), *kennen* is **conhecer** (Ik ken haar = *Conheço-a*).
## Ouvir en pedir
@conj ouvir,pedir pres
- **Pedir** = vragen *om* iets: *Peço a conta.* (Ik vraag om de rekening.)
- **Perguntar** = een vraag stellen: *Pergunto onde fica a estação.*
## Die je al kent
**Ser, estar, ter** (hoofdstuk 2, 8 en 6) en **haver**, dat je vooral tegenkomt als **há** (er is).
`,
  write: [
    { task: 'Beschrijf je gewone weekend met minstens vier onregelmatige werkwoorden (ir, fazer, ver, sair, vir…).', model: 'Ao sábado vou ao mercado e faço o almoço. À tarde vejo um filme ou saio com os amigos. Ao domingo os meus pais vêm almoçar e não faço nada!', hint: 'vou, faço, vejo, saio, vêm' },
    { task: 'Schrijf wat je kunt (saber) en wat je vandaag niet kunt doen (poder), en waarom.', model: 'Sei nadar e sei cozinhar, mas não sei dançar. Hoje não posso sair, porque tenho muito trabalho.', hint: 'sei, não sei, posso, não posso' },
  ],
},

u12: {
  pt: 'Horas e dias', en: 'Klokkijken, dagen en data',
  goals: ['Vragen en zeggen hoe laat het is', 'Zeggen hoe laat iets gebeurt', 'Dagen, maanden en seizoenen gebruiken', 'Data noemen'],
  text: `
@deel Hoe laat is het? {1}
## Hoe laat is het?
> Que horas são? = Hoe laat is het?
> É uma hora. = Het is één uur.
> São duas horas. = Het is twee uur.
> São três e um quarto. = Het is kwart over drie.
> São quatro e meia. = Het is half vijf.
> São cinco menos dez. = Het is tien voor vijf.
> É meio-dia. = Het is twaalf uur 's middags.
- **É** voor één uur, twaalf uur 's middags en middernacht; **são** voor alle andere uren.
- Minuten over: **e** — *e cinco, e dez, e um quarto, e meia*. Minuten voor: **menos** — *menos cinco, menos um quarto*.
!warn Let op *half*: **quatro e meia** is *vier en een half*, dus half **vijf**. Het Portugees telt vanaf het vorige uur, het Nederlands naar het volgende.
- Je hoort ook **um quarto para as cinco** (kwart voor vijf) en **vinte para as seis** (twintig voor zes).
!pt gebruiken dienstregelingen, afspraken en het nieuws de 24-uursklok: *O comboio parte às 18h30* — *às dezoito e trinta*.
## Hoe laat?
Gebruik **às** (a + as) met het uur: *às duas, às nove e meia* — maar **à uma**, **ao meio-dia**, **à meia-noite**.
> A que horas abre o museu? = Hoe laat gaat het museum open?
> Abre às dez. = Om tien uur.
## Dagdelen
- **de manhã** ('s ochtends), **à tarde** ('s middags), **à noite** ('s avonds, 's nachts).
- Met een tijd: **às oito da manhã, às três da tarde, às dez da noite**.

@deel De dagen van de week {2}
## De dagen van de week
| segunda-feira | maandag | sexta-feira | vrijdag |
| terça-feira | dinsdag | sábado | zaterdag |
| quarta-feira | woensdag | domingo | zondag |
| quinta-feira | donderdag | | |
- De weekdagen tellen vanaf zondag: *segunda* is de tweede dag. In de spreektaal laten mensen **-feira** meestal weg: *Até segunda!*
- **na segunda** = op maandag (deze maandag) · **à segunda / às segundas** = op maandag (elke maandag) · **no sábado** · **ao sábado** = op zaterdag (elke zaterdag).
- **o fim de semana** = het weekend: *ao fim de semana* (in het weekend).
- Dagen en maanden schrijf je met een kleine letter — net als in het Nederlands.
## Gisteren, vandaag, morgen
| anteontem | eergisteren |
| ontem | gisteren |
| hoje | vandaag |
| amanhã | morgen |
| depois de amanhã | overmorgen |
!warn **Amanhã** is morgen (de volgende dag), maar **de manhã** is 's ochtends: *amanhã de manhã* = morgenochtend.

@deel Maanden, seizoenen en data {3}
## Maanden en seizoenen
janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro
- **em** + maand: *em agosto* (in augustus).
- Data: **no dia 25 de abril** (op 25 april). Welke datum is het? **Que dia é hoje? — É dia três.**
- De seizoenen: **a primavera, o verão, o outono, o inverno** → *na primavera, no verão*.
> O meu aniversário é em maio. = Ik ben in mei jarig.
> No inverno chove muito. = In de winter regent het veel.
`,
  write: [
    { task: 'Schrijf je rooster voor een gewone doordeweekse dag: wat je doet en hoe laat.', model: 'Às segundas começo a trabalhar às nove. Almoço ao meio-dia e meia e saio do trabalho às seis da tarde. À noite janto às oito e meia.', hint: 'às, ao meio-dia, de manhã, à tarde' },
    { task: 'Wanneer ben je jarig? Schrijf over je favoriete seizoen en maand, en waarom.', model: 'O meu aniversário é no dia doze de março. Gosto muito da primavera, mas o meu mês favorito é setembro, porque não está muito calor.', hint: 'no dia, de março, na primavera' },
  ],
},

u13: {
  pt: 'A rotina', en: 'De dagelijkse routine en wederkerende werkwoorden',
  goals: ['Wederkerende werkwoorden als levantar-se en deitar-se gebruiken', 'Het voornaamwoord op de goede plek zetten: levanto-me maar não me levanto', 'Je dag op volgorde beschrijven', 'Zeggen hoe vaak je iets doet'],
  text: `
@deel Levanto-me: wederkerende werkwoorden {1}
## Wederkerende werkwoorden
Sommige werkwoorden beschrijven iets wat je met jezelf doet. Ze hebben een **wederkerend voornaamwoord** dat bij de persoon past — net als het Nederlandse *zich*: *levantar-se* (opstaan — letterlijk *zich oprichten*), *deitar-se* (naar bed gaan), *vestir-se* (zich aankleden), *lavar-se* (zich wassen), *chamar-se* (heten).
|! | voornaamwoord | levantar-se |
| eu | me | levanto-me |
| tu | te | levantas-te |
| ele · ela · você | se | levanta-se |
| nós | nos | levantamo-nos |
| vós | vos | levantais-vos |
| eles · elas · vocês | se | levantam-se |
!warn In de nós-vorm valt de laatste **-s** weg voor **-nos**: *levantamos + nos → levantamo-nos*.
## Waar staat het voornaamwoord?
Dit is een van de typischste kenmerken van het Europees Portugees. **In een gewone mededelende zin staat het voornaamwoord achter het werkwoord, met een streepje ertussen** — net als in het Nederlands: *ik was **me***.
> Levanto-me às sete. = Ik sta om zeven uur op.
> Ela deita-se tarde. = Zij gaat laat naar bed.
Sommige woorden **trekken het voornaamwoord naar voren**, vóór het werkwoord:
- ontkenningen — **não, nunca, nada, ninguém**: *Não me levanto cedo.*
- vraagwoorden — **onde, quando, como, porque, o que, quem**: *A que horas te levantas?*
- sommige bijwoorden — **já, ainda, também, só, sempre, talvez**: *Também me deito tarde.*
- verbindingswoorden — **que, quando, se, porque**: *Acho que se chama Rui.*
> Chamo-me Ana. = Ik heet Ana.
> Não me chamo Ana. = Ik heet geen Ana.
> Como te chamas? = Hoe heet je?
!pt zet men het voornaamwoord aan het begin van een zin nooit vóór het werkwoord. Brazilianen doen dat juist wel (*Me levanto às sete*), maar in Portugal klinkt dat fout. Bij twijfel in een gewone zin: **werkwoord + streepje + voornaamwoord**.

@deel Visto-me: de ochtend {2}
## Je dagelijkse routine
| acordar | wakker worden (niet wederkerend) |
| levantar-se | opstaan |
| tomar duche | douchen |
| lavar os dentes | je tanden poetsen |
| vestir-se | zich aankleden |
| tomar o pequeno-almoço | ontbijten |
| despachar-se | opschieten, zich klaarmaken |
| almoçar · jantar | lunchen · avondeten |
| deitar-se | naar bed gaan |
!pt zijn **tomar duche** en **despachar-se** heel gewone woorden. Elke ochtend hoor je ouders roepen: *Despacha-te!* — Schiet op!
> Visto-me depressa. = Ik kleed me snel aan.
> Lavo a cara com água fria. = Ik was mijn gezicht met koud water.

@deel Um dia normal: volgorde en hoe vaak {3}
## Op volgorde
**primeiro** (eerst), **depois** (daarna), **a seguir** (vervolgens), **finalmente** (ten slotte)
> Primeiro tomo duche, depois visto-me e a seguir tomo o pequeno-almoço. = Eerst douche ik, dan kleed ik me aan en vervolgens ontbijt ik.
## Hoe vaak?
| sempre | altijd |
| normalmente | meestal |
| muitas vezes | vaak |
| às vezes | soms |
| raramente | zelden |
| nunca | nooit |
> Nunca me deito antes da meia-noite. = Ik ga nooit voor middernacht naar bed.
!tip **Sempre** en **nunca** trekken het voornaamwoord naar voren: *Sempre me levanto cedo. Nunca me despacho.*
`,
  write: [
    { task: 'Beschrijf je gewone ochtend op volgorde, van wakker worden tot de deur uit gaan.', model: 'Acordo às sete, mas levanto-me às sete e um quarto. Primeiro tomo duche, depois visto-me e tomo o pequeno-almoço. A seguir lavo os dentes e saio de casa às oito.', hint: 'levanto-me, visto-me, primeiro, depois' },
    { task: 'Schrijf drie dingen die je nooit of zelden doet — met het voornaamwoord vóór het werkwoord.', model: 'Nunca me deito antes da meia-noite. Ao domingo não me levanto cedo. Raramente me despacho de manhã!', hint: 'nunca me, não me, raramente me' },
  ],
},

});
