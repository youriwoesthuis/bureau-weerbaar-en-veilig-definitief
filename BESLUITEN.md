# Besluiten van 25 augustus 2026

Vastgelegd uit een vragenronde met Youri. Dit bestand is leidend boven eerdere
aannames in `CLAUDE.md`, `DESIGN.md` en `MERKGROEP.md`; waar het botst, staat
hieronder wat er in die bestanden moet worden bijgewerkt.

Status per punt: **[ ]** nog te doen, **[x]** verwerkt.

---

## 1. Positionering

- **Het onderscheid met Act in Move is de specialisatie en het niveausysteem.**
  Uitdrukkelijk *niet* de beroepsgroep-inhoud en *niet* de trainers. De
  beroepsgroep is het middel om gevonden te worden, niet het argument om te
  kopen.
- **Uitstraling: de methodische specialist.** Autoriteit uit het systeem — drie
  niveaus, een cyclus, een opbouw die klopt. Rustig en gestructureerd, niet
  strijdbaar en niet persoonlijk-anekdotisch.
- **Het niveaumodel heet De Weerbaarheidsladder.** Geen losse indeling maar een
  benoemd model, zodat het in een offerte, een opleidingsplan en een
  AI-antwoord aanwijsbaar is.
- **Doelgroep wordt niet versmald.** Alle vier de kopers (teamleider, HR,
  preventiemedewerker, directie) en alle vier de aanleidingen (net gebeurd,
  speelt al langer, moet van beleid, al bezig) tellen mee. Ook de
  organisatiegrootte doet er niet toe.
- **De vier kopers worden bediend via de niveaus**, niet via een aparte
  rolindeling. Basis spreekt de teamleider aan, gevorderd HR, expert de
  preventiemedewerker en de directie. Een derde as naast beroepsgroep en niveau
  komt er niet.
- **Wat de site expliciet uitsluit:** geen e-learning of online modules, en geen
  algemene weerbaarheidscursus. *Niet* uitsluiten: fysieke technieken en open
  inschrijving.

## 2. Verhouding tot de zustermerken

- **Geen kennisbank op BWV.** Alle kennis hoort op AgressieVisie. BWV blijft
  commercieel: beroepsgroep, niveau, boeken. ✔ Vastgelegd als hoofdstuk 3a in
  `MERKGROEP.md`.

> **Let op:** `MERKGROEP.md` staat in elke repo van de groep en moet overal
> gelijk zijn. De bijgewerkte versie moet nog gekopieerd worden naar de repo
> van agressievisie.nl en naar de werkmap van actinmove.nl.
- **BWV linkt niet naar AgressieVisie.** Het verkeer loopt alleen de andere kant
  op. ✔ Verwerkt in `MERKGROEP.md` hoofdstuk 3 op 25-08-2026.
- **Act in Move verdwijnt uit de voet.** De vermelding blijft alleen op
  `/over-ons/`. ✔ Verwerkt in `MERKGROEP.md` hoofdstuk 3 op 25-08-2026.
- **De twee niveauladders blijven verschillend.** Act in Move houdt basis en
  verdieping, BWV houdt basis, gevorderd en expert. ✔ Open punt 6 in
  `MERKGROEP.md` is gesloten op 25-08-2026.

## 3. Feitelijke correcties

- [x] **Geen catalogusaantallen op de site.** "132 trainingen", "44
      beroepsgroepen", "19 sectoren" en "3 niveaus" als opsomming verdwijnen —
      uit de cijferstrip, de snelfeiten, de openingsantwoorden en `llms.txt`.
      Het aanbod is dekkend, maar dat hoeft niet geteld te worden.
- [x] **Geen "6 van de 12 teamleden zijn trainingsacteur".** Het zijn gewoon
      teamleden. Ook de dynamische telling in `llms.txt` en op `/aanpak/` eruit.
- [x] **Altijd incompany.** `FEITEN.locatie` wordt "altijd bij jullie op
      locatie". De variant "of bij Bureau Weerbaar en Veilig in Neede" is niet
      juist en moet overal weg.
- [x] **De trainingsacteur is standaard**, geen "waar dat de oefening beter
      maakt". Hij hoort dus bij de vaste feiten en *niet* bij de
      prijsbepalende factoren.
- [x] **Intervisie na 6 weken is geen toezegging** maar een mogelijkheid op
      verzoek. Staat nu als belofte in 39 expert-trainingen.
- [x] **Fysieke technieken: op verzoek.** Nu zegt de site er niets over,
      terwijl inkopers in zorg en handhaving er standaard naar vragen.
- [x] **Prijzen: geen bedragen, wel de factoren.** Aantal groepen, reisafstand
      en omvang van het traject. Niet: wel of geen trainingsacteur — die zit
      er standaard bij.

## 4. Uiterlijk

- [x] **Licht wordt de basis, donker het accent.** Alleen de balk bovenaan en
      de voet blijven donker. De donkere tussensecties vervallen.
- [x] **Kaarten zijn niet goed uitgelijnd.** Opgelost door de oorzaak weg te
      nemen: de volledige beroepsgroepindex stond zowel op de homepage als op
      /sectoren/, en stond op de homepage in CSS-kolommen die per kolom
      ongelijk aflopen. Op de homepage staat nu een chiprij met flex-wrap;
      die lijnt altijd uit. Youri pakt het visuele verder stap voor stap op.
- [x] **Onder de hero komt de niveaustrip** in plaats van de vier
      catalogusgetallen: basis — gevorderd — expert, elk met één regel en de
      eigen kleur.

## 5. Taal

- [x] **Overal "je".** De site wisselt nu tussen "u" (CTA's, contact) en "je"
      (inhoudelijke teksten).
- [x] **De openingszin noemt de merknaam één keer, daarna "je".** De formule
      "elke pagina opent met 2–3 zinnen in de derde persoon" uit `CLAUDE.md` §8
      wordt hiermee bijgesteld: eerste zin met merknaam, rest in "je".

## 6. Navigatie

- [x] **Home wordt het eerste menu-item.** Nu linkt alleen het logo terug.
- [x] **"Sectoren" wordt "Beroepsgroepen".** Dat is de as waarop dit merk
      ordent en waar mensen op zoeken. De sectorindeling blijft de structuur
      ván die pagina, maar is niet het label.
- [x] **"Trainingen" verdwijnt uit het menu.** De pagina blijft bestaan en
      vindbaar, maar bezoekers gaan via beroepsgroep of niveau.

## 7. Homepage

Wordt opnieuw ingericht, samen met Youri.

- **Hero-kop, vastgesteld:** "Agressie hoort niet bij het werk. Ermee omgaan
  wel."
- **Onderkop: nog niet vastgesteld.** Twee rondes voorstellen afgekeurd. Later
  opnieuw voorleggen.
- **Eerste scherm moet zeggen: wat we doen en voor wie.**

## 7a. Afgewezen: het vluchtplan

Op 25-08-2026 is een concept uitgewerkt om de luchtvaart als kernmetafoor te
gebruiken (boarding, de vlucht, de landing; VLUCHTPLAN.md en een map
handboek/). **Youri heeft dit dezelfde dag afgewezen: het hele vluchtplan is
eruit.** Niet opnieuw voorstellen. De uitwerking staat voor de zekerheid in
een git-stash ("vluchtplan-uitwerking"); De Weerbaarheidsladder blijft het
model.

## 7b. Dagindeling en acteur (vastgesteld 26-08-2026)

- **Indicatieve dagdelen, geen kloktijden.** Ochtend/middag als etiket; een
  tijd op de site is een toezegging.
- **De acteur "voert de druk niet op."** De kern is het oefengesprek dat in
  het moment wordt stilgezet en bijgestuurd, en opnieuw gedaan met andere
  keuzes. Deze formulering is overal doorgevoerd; de oude
  ("druk opvoeren of terugnemen") mag niet terugkomen.
- **Wanneer de acteur op de dag aanschuift wisselt per opdracht** — daar
  zegt de site dus niets over. Wél blijft staan dat de acteur standaard
  onderdeel is van elke training.
- **Expert is een werksessie, geen oefendag**: eigen dagopbouw (analyse,
  protocol toetsen, teamnorm, borging) op /niveaus/expert/.

## 7c. Teamfoto's (26-08-2026)

Alle twaalf portretten staan erop, en elk teamlid heeft een eigen pagina onder /team/ — het overzicht op /over-ons/ toont alleen foto en naam (keuze Youri, 31-08-2026: uitklappen in het raster oogde rommelig). De achtergronden zijn met scripts/team-foto.mjs vervangen door een verloop in de merkkleuren (uitsnijden met RMBG-1.4, lokaal via WASM). Claudia bleek wel een echte foto te hebben: het "plaatshouder"-bestand was een greenscreen-portret. LinkedIn-links staan erin voor iedereen behalve Marieke van Leeuwen — die ontbreekt nog.

## 7d. SEO/GEO-ronde (31-08-2026, tweede Gemini-review)

Doorgevoerd: merknaam altijd in de titel (controleer meet voortaan de kern
voor het achtervoegsel), robots.txt uitgebreid met de live-antwoordbots
(ChatGPT-User, OAI-SearchBot, Claude-User, Perplexity-User, Bingbot,
Applebot, CCBot, Meta-ExternalAgent, Amazonbot), Service+OfferCatalog op de
beroepsgroeppagina's, vergelijkingstabel op /niveaus/ (een plek, geen 44
kopieen), vraagvorm-koppen op de trainingspagina's, llms.txt met eerlijk
prijskader en eigen begrippen, en een gegenereerde llms-full.txt (152 kB
volledige sitecontext).

**Bewust afgewezen uit het advies:** Offer met price "0" (suggereert
gratis), het ABCD-model (gebruiken wij niet), "officieel erkend
certificaat" en kloktijden/lesuren (verzonnen), sitemap hernoemen (de
index-URL is juist). Een echt Offer-blok kan pas als er een echte
vanaf-prijs is.

## 7e. Concurrentieonderzoek (31-08-2026)

Negen concurrenten onderzocht plus de vraagzijde van de markt, twee keer
getoetst bij Gemini. Het volledige onderzoek staat in CONCURRENTIE.md; hier
alleen wat er is besloten.

**Doorgevoerd**

- **Nieuwe pagina /wet-en-regels/** — Arbowet artikel 1 lid 1, 3 lid 2, 5,
  8 en 13 lid 10 en Arbobesluit 2.15, letterlijk geciteerd, plus wat er níet
  verplicht is. Acht van de negen concurrenten noemen de wet nergens. Twee
  fouten hersteld die op veel sites staan: de definitie van psychosociale
  arbeidsbelasting staat in artikel 1 EERSTE lid (niet "lid 3 onder e" — dat is
  een oudere versie van de wet), en de 25-werknemersregel voor de
  preventiemedewerker staat in artikel 13 TIENDE lid.
- **Nieuwe pagina /kosten/** — wat er inbegrepen is, de vier prijsfactoren, en
  zes neutrale vragen om offertes vergelijkbaar te maken. Zes van de negen
  concurrenten noemen geen enkel bedrag en niemand legt het prijsmodel uit.
  Er staat nog steeds geen prijs; dit is de eerlijke versie daarvan.
- **Sectorkaders op zes sectorpagina's** (zorg, farmacie, overheid, onderwijs,
  openbaar vervoer, welzijn) — de norm of wet die per sector bovenop de Arbowet
  geldt, met bronlink. Sectoren zonder geverifieerd kader krijgen geen blok.
- **Vijf koopbezwaar-vragen op /aanpak/** — blijft het hangen, is de acteur niet
  te heftig, wij hebben al een protocol, hoe vaak herhalen, en wat als de
  meldingen stijgen. Geen van de negen beantwoordt deze.
- **RI&E-bouwsteen op alle 44 beroepsgroeppagina's** — een voorbeeldpassage
  die een preventiemedewerker kan overnemen in het plan van aanpak, met de
  juiste wetsverwijzingen en de naam van de beroepsgroep erin. Uitdrukkelijk
  een voorbeeld en geen juridisch advies. Dit was het advies van Gemini in de
  derde ronde: het verandert de pagina van verkooptekst in een werkstuk voor
  de Arbo-administratie van de klant.
- **llms.txt** heeft een hoofdstuk Wet en regels gekregen.

**Bewust niet gedaan**

- Geen vergelijkingstabel "wij versus een generalistisch bureau". Dan staan er
  uitspraken over concurrenten op de site die verouderen zodra zij hun site
  aanpassen. De site bevat geen enkele uitspraak over een concurrent en dat
  blijft zo; het onderzoek hoort in CONCURRENTIE.md.
- Geen belofte "offerte binnen vier uur" — niet waar te maken zonder Youri.
- Geen claim dat de training "voldoet aan de Arbowet". Het is de werkgever die
  aan de wet moet voldoen, niet de training.
- Geen CBS-cijfers op de site. Ze zijn geverifieerd en beschikbaar, maar de
  Nationale Enquête Arbeidsomstandigheden en de werknemersenquête zorg en
  welzijn meten verschillende dingen; naast elkaar zetten zou misleiden. Zie
  hoofdstuk 8: als Youri cijfers wil, kan het — met de juiste bronvermelding.
- De 132 paginatitels blijven "agressietraining", niet "de-escalatietraining".
  Uit het marktonderzoek blijkt dat de-escalatietraining nauwelijks als
  productnaam of landingspagina bestaat. De term staat wel in koppen en tekst.
- Nog steeds geen kennisbank of blog (besluit hoofdstuk 2 blijft staan). De
  nieuwe pagina's zijn vaste referentiepagina's, geen artikelenstroom.

**Wat het onderzoek opleverde aan positionering**

Geen van de negen heeft een matrix van beroepsgroep × niveau, geen van de negen
heeft een echte drietrapsleerlijn, en bij twee bureaus is de trainingsacteur een
betaalde optie. Dat zijn de drie dingen om overal te blijven zeggen.

## 7f. Designreview (31-08-2026)

Youri: "de uitstraling moet echt anders." Gemini-review met schermafdrukken
(gesprek bda39bef45999022): de zachte SaaS-taal klopte niet bij het onderwerp
en de koper. Youri koos: **eerst de snelle ingreep, daarna opnieuw kijken**.

Doorgevoerd (de snelle ingreep): hoeken naar 2px, schaduwen uit, alle
tekstverlopen effen oranje, pastelgloed en ruitjesraster uit, sfeerlicht en
kleurwolken uit de hero, zweef-hovers vervangen door randkleuring. Details in
DESIGN.md hoofdstuk 4.

Nog open — **keuze van Youri**:

- **Richting A, B of C** (tactische autoriteit / menselijke realiteit /
  signaal & de-escalatie — zie DESIGN.md hoofdstuk 4). Pas na die keuze:
  typografie, kleurbalans, herobeeld-herontwerp.
- **Fotografie**: de aanbevolen beeldstrategie (training fotograferen, lege
  werkplekken met lading, trainers in het veld) vraagt een fotograaf en een
  trainingsdag om te fotograferen. Alleen Youri kan dat organiseren.

## 7g. Vervolgronde concurrentie (31-08-2026, avond)

Vierde Gemini-overleg. Doorgevoerd, alles zonder nieuwe beloften:

- **Digitale agressie** verweven in 28 beroepsgroepen (gefilmd worden,
  intimidatie via mail en reviews, telefoonagressie): één zin werkrealiteit
  in de lopende tekst plus één FAQ-item, steeds met het eerlijke frame
  "ja, als het team het inbrengt bij de intake". Negen beroepsgroepen
  dekten het al, zeven zijn bewust overgeslagen (niet hun realiteit).
  Gecontroleerd op verboden claims: geen "vast onderdeel", geen juridische
  uitspraken, geen extra merknaamvermeldingen. 576 FAQ-vragen nu.
- **Trajectblok** op alle 132 trainingspagina's: intake → voorbereiding →
  trainingsdag → afspraken en vervolg. Beschrijft wat op /aanpak/ al stond;
  concurrenten tonen nergens wat er vóór en na de dag gebeurt.
- **Voorgevulde mailknop** op trainingspagina's: onderwerp is de
  trainingsnaam, zodat de aanvrager niets hoeft uit te leggen.
- **Course-schema verrijkt**: occupationalCategory en audienceType zijn nu
  de beroepsgroepnaam, en gevorderd/expert dragen coursePrerequisites (het
  voorwaarde-veld stond in 88 bestanden maar zat niet in het contentschema).
- **Keuzehulp ook op /niveaus/** — bestond alleen op de homepage.

Bewust niet gedaan uit Gemini's lijst: losse triggerblokken op
beroepsgroeppagina's (staat al in de lopende tekst; een blok ernaast wordt
dubbelop) en voorinvulbare formulieren (kan pas als het formulier een
verzendsleutel heeft, hoofdstuk 8).

## 7h. Stijlherschrijving naar de stem van Act in Move (31-08-2026)

Youri: hij vindt de schrijfstijl van actinmove.nl mooier en wil die op deze
site, met als harde randvoorwaarde dat de drie merken elkaar niet bijten.

**Eerst getoetst bij Gemini.** Oordeel: stijlgelijkenis tussen de merken is
geen SEO- of GEO-risico. Zoekmachines en AI-systemen scheiden op zoekintentie
en entiteiten, niet op toon; de scheiding zit in de assen uit MERKGROEP.md.
Een gedeelde stem over een merkenfamilie is juist een pluspunt, mits het
perspectief verschilt: Act in Move thematisch, Bureau Weerbaar en Veilig
beroepsgericht, AgressieVisie educatief. Omdat de site nog niet live is op het
eigen domein, is er ook geen indexatierisico; dit was juist het moment.

**Vastgelegd in STIJL.md**: het recept van vijftien regels, afgeleid uit een
analyse van twaalf pagina's van actinmove.nl, plus de bewuste afwijkingen en
de controlelijst. Kern van de stem: zinnen van vijftien à zestien woorden met
een korte klap erna, de dubbele punt als motor, voorwaardelijke inversie om te
adviseren, definitie-door-ontkenning, ruimte voor twijfel (vaak, meestal,
doorgaans), en FAQ-antwoorden die met een kort kaal antwoord beginnen.

**Uitgesloten van de herschrijving** (advies Gemini, hoofdstuk 3 van STIJL.md):
titels en H1's, de eerste zin van elk openingsantwoord, de RI&E-bouwsteen, de
wetscitaten en de vaste feiten. Alle vijf zijn na afloop nagemeten en intact.

**Uitvoering**: 207 contentbestanden plus de pagina-templates en componenten,
in twee ronden. De eerste ronde liep halverwege op een sessielimiet van de API
en deed 120 bestanden; de tweede ronde maakte de resterende 87 af. Netto 202
gewijzigde bestanden. Gemeten na afloop: 221 pagina's, nul fouten, nul
waarschuwingen, en nul keer u, nul gedachtestreepjes en nul uitroeptekens in
de gerenderde tekst.

**Wat bewust niet is aangeraakt**: de teamcitaten in de eerste persoon. Vier
teamleden hebben een bio die volledig uit een eigen uitspraak bestaat; die
herschrijven zou veranderen wat iemand feitelijk heeft gezegd. Wil Youri die
in de huisstijl, dan is dat een vraag aan de betrokkenen zelf.

## 7i. Paginaronde met Gemini, stap 1: de homepage (31-08-2026)

Youri: loop de site stap voor stap na met Gemini, overleg alles, stel steeds
verdiepingsvragen en beslis niet zelfstandig. Daarna gaf hij toestemming om de
adviezen door te voeren, met de opdracht om Gemini ook om TOEVOEGINGEN te
vragen en alles te laten toetsen aan de negen onderzochte concurrenten.
Rolverdeling afgesproken: Gemini is strateeg (markt, koper, concurrenten),
ik ben bouwer (codebase, schema, waarheidstoets).

**Oordeel Gemini.** 2585 woorden en twaalf secties is te lang. Een inkoper
scant vijftien tot dertig seconden en zoekt twee dingen: verificatie en
routering. Drie secties gingen over niveaus, drie over het proces en twee over
positionering.

**Na verdiepingsvragen bijgesteld.** Ik heb drie conflicten voorgelegd met
eerdere besluiten van Youri, en Gemini heeft zijn advies op twee punten
teruggenomen:

1. Hij wilde een beroepsgroeprouter op plek 2. Youri had die er eerder juist
   af laten halen. Gemini gaf hem gelijk: geen tweede index, wel herkenning
   boven de vouw. Opgelost door de vergelijker naar plek 2 te halen; die toont
   vier beroepen naast elkaar en verwijst door naar /sectoren/.
2. Hij adviseerde een badge met de tekst Arbo-compliant en de belofte van een
   voorstel binnen vier uur. Allebei ingetrokken toen ik ze voorlegde: de
   werkgever moet aan de wet voldoen en niet de training, en een
   reactietermijn is nooit toegezegd. Vervangen door twee eerlijke blokken:
   waarmee je dit intern onderbouwt (RI&E, met link naar /wet-en-regels/) en
   geen rekening achteraf (all-in, met link naar /kosten/).
3. Hij wilde modellen schrappen. Youri had ze juist laten bouwen om als expert
   over te komen. Opgelost door ze te verdelen: de spanningscurve en het
   groeimodel blijven op de homepage als expertbewijs; de PDCA-ring, het
   dagverloop en het incidentmodel gaan over uitvoering en staan nu op
   /aanpak/.

**Doorgevoerd.** Homepage van twaalf naar zes inhoudelijke secties en van 2585
naar 1832 woorden: hero, openingsantwoord, vergelijker als proof of scope,
specialist versus generalist, spanningscurve, groeimodel, keuzehulp,
onderbouwingsblok, praktische strip. Vervallen: de vier situatie-ingangen
(routeerden op situatie terwijl de koper in beroepen denkt), het blok over wie
wij zijn (zei hetzelfde als specialist versus generalist, maar zwakker) en het
blok over wie welk niveau doet (gaat op in de keuzehulp). De PDCA-ring stond
al letterlijk op /aanpak/; die dubbeling is nu weg.

**Nog te doen uit deze stap.** Gemini adviseert een koopbezwaar-FAQ op de
homepage, maar met andere vragen dan die op /aanpak/ staan: op de homepage de
commerciele vragen (waarom incompany, verhouding tussen de niveaus,
aansluiting op de RI&E, zit de acteur in het tarief, groepsgrootte), op de
aanpakpagina de didactische (blijft het hangen, is de acteur te heftig,
stijgende meldingen, weerstand tegen oefenen, bestaand protocol). Zo krijgen
beide pagina's een eigen FAQPage-schema zonder elkaar te beconcurreren.

**Lengte versus vindbaarheid is een schijntegenstelling.** De autoriteit van
de homepage komt uit de interne linkstructuur, niet uit het aantal woorden.
Alles op de homepage storten levert juist kannibalisatie op met /aanpak/,
/wet-en-regels/ en /kosten/.

## 7j. Paginaronde stap 2: de routeringsketen (31-08-2026)

Sectorenoverzicht, sectorpagina en beroepsgroeppagina, met Gemini doorgelopen.

**Vijf klikken is geen probleem.** Meer dan tachtig procent van het relevante
verkeer landt volgens Gemini rechtstreeks op een beroepsgroep- of sectorpagina,
niet op de homepage. Voor die bezoekers is de keten een of twee klikken. Alleen
voor wie op de homepage begint was het te ver; dat is opgelost doordat de
vergelijker nu op plek twee staat en doorverwijst.

**Vier adviezen sneuvelden op de werkelijkheid, en Gemini nam ze terug:**

1. Micro-casuistiek en risicolocaties per beroepsgroep: die staan er al, in de
   openingsalinea en in het blok met herkenbare praktijksituaties. Gemini na
   confrontatie: laat de tekst staan zoals hij is en bouw niets dubbels.
2. Een top tien van populairste beroepsgroepen: onmogelijk zonder bezoekcijfers
   en zonder klanten. Elke ranglijst zou verzonnen zijn. Vervallen.
3. Een offerteknop per beroepsgroep: kan pas als het formulier een
   verzendsleutel heeft. De voorgevulde mailknop op de trainingspagina is de
   tussenoplossing; Gemini schat het verlies op vijftien tot twintig procent van
   de micro-conversies, maar noemt het werkbaar tot het formulier er is.
4. Zijn vier clusters dekten de negentien sectoren niet. Na de vraag waar
   dierenzorg, uitvaart, bibliotheken en sportaccommodaties dan heen moeten,
   kwam een indeling in vijf domeinen waarin alles past zonder restcategorie.

**Doorgevoerd.**

- **Vijf domeinen op de overzichtspagina** in plaats van negentien losse tegels
  onder elkaar: zorg en welzijn, overheid en justitie, onderwijs en publieke
  voorzieningen, wonen en vervoer, dienstverlening en handel. Een sector die in
  geen domein staat valt niet weg maar komt onder "Overige sectoren", zodat een
  nieuwe sector opvalt in plaats van stilletjes te verdwijnen.
- **Een kernregel per beroepsgroep**, nieuw veld `kern` in het contentschema.
  Een regel van maximaal negentig tekens die zegt wat agressie bij dat beroep
  bijzonder maakt, gedestilleerd uit de bestaande tekst en niet nieuw bedacht.
  Voorbeeld thuiszorg: "Alleen op bezoek in de woonkamer van een ander, zonder
  achterwacht in de buurt". Die regel staat nu op de overzichtspagina achter
  elke beroepsgroep en vervangt op de sectorpagina de ingekorte samenvatting.
  Dat laatste was winst: die samenvatting begon op elke kaart met de merknaam
  en het woord agressietraining, dus acht kaarten openden identiek.
- **Twintig regelafbrekingen zonder spatie ervoor hersteld.** "In welke
  sector<br />werkt je team" werd bij een kale HTML-uitlezing "sectorwerkt".
  Browsers en schermlezers zagen het goed, AI-crawlers die ruwe HTML lezen niet.

**Volgens Gemini is de beroepsgroeppagina commercieel het belangrijkst**: daar
komt de specifieke zoekintentie binnen, daar zit de herkenning en daar staat de
RI&E-bouwsteen. Overzichts- en sectorpagina dienen vooral de routering en de
interne linkstructuur.

## 7k. Paginaronde stap 3: de veelgestelde vragen opnieuw verdeeld (31-08-2026)

Bij het uitvoeren van Gemini's FAQ-splitsing kwam een groter probleem boven dat
er al stond. De vaste pagina's beantwoordden elkaars vragen:

- "Wat kost een agressietraining" stond op kosten, op contact en in bijna
  dezelfde vorm op aanpak;
- "Is agressietraining verplicht" stond op kosten en op wet en regels;
- "Hoe vaak moet je herhalen" stond op aanpak en op wet en regels.

Elke pagina heeft een eigen FAQPage-schema, dus die vragen concurreerden met
zichzelf om dezelfde zoekopdracht.

**Toewijzing, elke vraag een eigenaar.** Gemini's advies bij een botsing: niet
laten staan zonder schema (dat lost het schemaconflict op maar levert nog
steeds dubbele tekst en een rommelige pagina op), maar schrappen en vervangen
door een verwijzing in lopende tekst.

- **Aanpak** houdt de didactiek: duur, groepsgrootte, trainingsacteurs, blijft
  het hangen, is de acteur te heftig, wij hebben al een protocol, en wat als de
  meldingen stijgen. Kwijt: kosten, locatie, certificaat en herhaalfrequentie.
  Daarvoor in de plaats een regel die naar kosten en naar wet en regels wijst.
- **Kosten** houdt alles over tarief en opbouw. Kwijt: de wettelijke vraag.
- **Wet en regels** houdt alles wettelijks en neemt het deelnamecertificaat
  over: dat is een juridische vraag, geen didactische.
- **Contact** houdt de praktische organisatie. Kwijt: de prijsvraag.
- **Niveaus** blijft ongewijzigd.
- **Homepage** krijgt vijf nieuwe vragen die nergens anders staan, over de fase
  daarvoor: waarom alleen incompany, aansluiten op iets dat net gebeurd is,
  verschillende ervaringsniveaus in een groep, leidinggevenden apart trainen,
  en wat er gebeurt na het eerste contact.

**Twee voorstellen van Gemini niet overgenomen.** Hij wilde een vraag over de
doorlooptijd tussen aanvraag en eerste trainingsdag; die termijn is nooit
vastgesteld. En hij noemde als "vraag die nergens beantwoord wordt" de
psychologische veiligheid tijdens het oefenen met een acteur, maar die staat al
op de aanpakpagina sinds de koopbezwaarronde. Zijn voorbeeldantwoord bevatte
bovendien "gecertificeerde trainingsacteurs", en die claim kunnen we niet maken.

**Bijvangst: twee pagina's misten hun FAQ-schema.** De aanpakpagina en de
niveaupagina toonden hun vragen wel op het scherm, maar zonder FAQPage-markup.
Zeven en vier vragen die voor Google en AI-systemen niet bestonden. Toegevoegd.

**Stand:** 34 unieke vragen over zes vaste pagina's, nul dubbelingen, allemaal
met schema. De 548 vragen in de content (per training, beroepsgroep en sector)
blijven ongemoeid: die zijn per definitie specifiek.

## 7l. Paginaronde stap 4: trainingspagina en niveaupagina (31-08-2026)

**Gemeten voordat er iets gesloopt werd.** Gemini's eerste oordeel was dat het
trajectblok en de niveaustrip op 132 trainingspagina's schadelijke duplicate
content opleveren en weg moesten. Voor ik dat uitvoerde heb ik alle 132
pagina's per zin geteld: gemiddeld 583 woorden per pagina staan in zinnen die
uniek of zeldzaam zijn, 154 woorden in zinnen die op meer dan de helft van de
pagina's terugkomen. Dat is 21 procent gedeeld, 79 procent uniek. Gemini na
confrontatie: "Je hebt op alle punten gelijk", de diagnose ging uit van een
veel hoger percentage, en het trajectblok staat juist op de pagina waar de
koopintentie het hoogst is. Besluit: laten staan. Zonder die meting was hier
het sterkste conversieblok van de site gesneuveld op een aanname.

**Twee beroepsgroepen samengevoegd.** `sociale-dienst-uitkeringsinstanties`
en `sociale-dienst-participatiewet` bedienden dezelfde klantmanagers. De
doelgroepomschrijvingen waren praktisch inwisselbaar, beide noemden
telefonische en digitale agressie na een beslissing, en er stond zelfs al een
vraag op de site die probeerde uit te leggen waarin ze verschilden. Dat waren
acht pagina's die om dezelfde zoekopdracht concurreerden.

- Behouden: `sociale-dienst-participatiewet`, verbreed in samenvatting,
  doelgroep en vragen zodat uitkeringsinstanties, schuldhulp, bijzondere
  bijstand en re-integratie er expliciet onder vallen.
- Overgenomen uit de opgeheven groep: de morele spanning van begrenzen bij
  wie het al moeilijk heeft, de telefoon die op tafel gaat, het onveilige
  huisbezoek en de dreiging met klachten of media.
- **Geen redirects.** De site is niet gelanceerd: nul geïndexeerde urls, nul
  backlinks, nul posities. Gemini's uitvoeringsplan met 301-omleidingen en het
  bundelen van autoriteit gold voor een bestaande site. Na de vraag of dat
  verandert bij een ongelanceerde site: "Je lezing is 100 procent correct."
- Bijvangst: de titel van `sociale-dienst-participatiewet-gevorderd` was 61
  tekens en kon niet korter zolang de andere groep bestond. Nu wel.

**De arbeidshygiënische strategie toegevoegd aan wet en regels.** Gemini
stelde voor op de trainingspagina te schrijven dat de training "geldt als een
brongerichte beheersmaatregel". Dat is onjuist: in artikel 3, eerste lid onder
b, staat een volgorde waarin maatregelen aan de bron voorgaan op collectieve
maatregelen, en die weer op individuele. Een training werkt op het individuele
gedrag en staat dus onderaan. Gemini erkende de fout. Het artikel staat nu als
zevende letterlijk citaat op de wetpagina, met de uitleg dat wie een training
verkoopt als de oplossing, twee stappen overslaat. Dat is meteen het eerlijkste
onderscheid met de concurrentie, die training vrijwel zonder uitzondering als
het antwoord presenteert.

De letterlijke tekst is op wetten.overheid.nl gecontroleerd, en dat was nodig:
het slot van het artikel wijkt af van wat er op veel sites over de
arbeidshygiënische strategie wordt geschreven.

**Een RI&E-blok op de trainingspagina.** De kopieerbare voorbeeldpassage blijft
op de beroepsgroeppagina staan, want die hoort bij de functie en niet bij het
niveau. Nieuw op de trainingspagina is een kort blok dat zegt waar een training
in de risico-inventarisatie past en dat ze de organisatorische maatregelen
aanvult in plaats van vervangt, met links naar de voorbeeldpassage en naar de
wetsartikelen.

**Een acteursregel onder de praktijksituaties.** Gemini wilde per beroepsgroep
een nieuwe zin over wat de acteur naspeelt. Dat zou 132 keer verzonnen worden
voor situaties waarvoor geen bron bestaat. In plaats daarvan verwijst één vaste
regel naar de vijf situaties die er al staan: "De trainingsacteur speelt deze
situaties na, met de details die het team er bij de intake zelf bij levert."
Staat nu op 88 pagina's, alle basis- en gevorderdtrainingen. Drie
gevorderdbestanden hadden een afwijkend kopje ("Herkenbare situaties op
gevorderd niveau"), dat is gelijkgetrokken.

**Stand:** 217 pagina's, nul fouten.

## 7m. Paginaronde stap 5: aanpak, kosten en wet en regels (31-08-2026)

**Het dagritme stond vier keer op de site.** Gemini's eerste oordeel was dat
/aanpak/ ruim twee keer zo lang is als nodig en dat zowel het dagritme als het
groeimodel weg moest. Gemeten: van de 1943 woorden stonden er 207 letterlijk
elders, en die 207 waren integraal het dagritmeblok, woord voor woord gelijk
aan wat op de drie niveaupagina's staat. Het groeimodel bleek honderd procent
uniek. Advies over het groeimodel ingetrokken; dat is bovendien het model waar
de hele positionering op rust.

Eigenaarschap van het dagritme gaat naar de drie niveaupagina's, niet naar
/aanpak/. Reden: daar landt iemand die op niveau zoekt, het is daar het meest
concrete blok van de pagina, en zonder dat blok houden die pagina's te weinig
eigen inhoud over. Op /aanpak/ staan nu drie regels die het ritme samenvatten
en doorverwijzen. Uitkomst: /aanpak/ van 11 procent naar 2 procent dubbele
tekst, en 1864 woorden die vrijwel allemaal alleen daar staan.

**De zes vergelijkingsvragen op de kostenpagina hebben nu een eigen antwoord.**
Die vragen leerden een inkoper waar hij op moest letten en lieten hem daarna
zelf uitzoeken hoe wij ervoor staan. Onder elke vraag staat nu wat er bij ons
gebeurt: de acteur bij elke training zonder meerprijs, maximaal tien
deelnemers, de dag opgebouwd rond de casuistiek uit de intake, en een offerte
met een totaalbedrag waarin reiskosten en voorbereiding verwerkt zitten.

Bij "hoeveel uur wordt er echt geoefend" wilde Gemini schrijven dat de
theorieblokken maximaal vijftien tot twintig minuten duren. Dat ligt nergens
vast en is dus verzonnen. Er staat wat wel waar is: het oefenen beslaat het
grootste deel van de dag en de theorie staat in korte blokken, alleen waar die
een oefening voorbereidt.

**Wet en regels semantisch gemarkeerd.** De citaten stonden al in een
blockquote, maar zonder `cite`-attribuut, zonder `<cite>` bij de bron en met
datums die alleen voor mensen leesbaar waren. Toegevoegd: het bronattribuut per
citaat, `<cite>` om de vindplaats, en `<time datetime>` om de datum van de
werkinstructie en de datum waarop de wetsteksten zijn overgenomen.

Elk artikel heeft nu ook een eigen anker, afgeleid van de bron, dus
`/wet-en-regels/#arbowet-artikel-3-eerste-lid-onder-b`. Het RI&E-blok op de
132 trainingspagina's en de kopieerbare passage op de 44 beroepsgroeppagina's
verwijzen daar rechtstreeks naar. Een preventiemedewerker landt zo op de
bepaling zelf in plaats van bovenaan een lange pagina.

Het aantal bepalingen stond als woord in de lopende tekst ("Zes bepalingen") en
liep meteen achter toen het zevende artikel erbij kwam. Dat telt nu de lijst.

**Gemini stelde voor de tweede keer iets voor dat er al stond**, namelijk de
psychologische veiligheid tijdens het oefenen met de acteur. Op de vraag wat ik
anders kan aanleveren kwam een bruikbaar antwoord: koppen alleen zijn te
abstract, want "Waarom er iemand meespeelt" verraadt niet dat veiligheid,
stopregel en de rol van de acteur daar al in staan. Vanaf nu krijgt hij per kop
tussen haakjes mee welke deelvragen daar al beantwoord zijn. Dat is goedkoper
dan hele pagina's doorsturen en voorkomt dat er adviezen komen voor gaten die
er niet zijn.

## 7n. Paginaronde stap 6: over ons, team, contact, privacy en 404 (31-08-2026)

Twee parallelle audits, een op de drie mensenpagina's en een op de kleine
pagina's plus een sitebrede controle van alle 217 gebouwde bestanden.

**Wat de sitebrede controle schoon vond:** nul gedachtestreepjes, nul
uitroeptekens, nul compliance-claims over de training zelf (alle treffers op
"gecertificeerd", "erkend" en "wettelijk verplicht" staan in ontkennende vorm of
leggen de plicht correct bij de werkgever), 13.087 interne links zonder een
enkele gebroken, en 217 unieke titels.

**Wat er wel mis was, en is hersteld:**

- **Een notitie voor de beheerder stond publiek op de contactpagina.** "Voor de
  beheerder: het online formulier staat klaar maar is nog niet gekoppeld aan een
  verzenddienst. Zie WERKWIJZE.md." Een bezoeker las daar dat de site nog niet
  af is, plus de naam van een intern document. Staat nu in een comment.
- **De openingszin van de teampagina liep krom** bij functietitels zonder
  persoonsvorm: "Eline Mol is office en communicatie bij Bureau Weerbaar en
  Veilig". De rol staat nu als bijstelling achter de naam.
- **Twaalf teampagina's hadden een bijna identieke meta description**, want die
  kwam uit diezelfde vaste zin. De omschrijving gebruikt nu de eerste eigen zin
  van de persoon. Twaalf unieke omschrijvingen.
- **De kop "Wie de training geeft"** stond boven twaalf mensen van wie er vier
  geen training geven. Nu "Wie er achter het bureau staat". De claim dat de
  acteurs "geen ingehuurde kracht" zijn is vervangen door wat wel zichtbaar
  waar is: ze staan tussen de trainers in het team.
- **Twee teamleden beloofden allebei de eerste contactpersoon te zijn.** Youri
  "degene die je spreekt als je een aanvraag doet", Eline "meestal als eerste
  aan de lijn". Die belofte is bij Eline weg; wie er opneemt hangt ervan af wie
  er is, en dat soort belofte was op de contactpagina eerder al geschrapt.
- **De zin over de handelsnaam stond twee keer op de pagina over ons.**
- **De privacyverklaring schakelde drie keer over naar "u"** in een tekst die
  verder consequent "je" gebruikt, twee keer zelfs binnen dezelfde zin.
- **Drie citaten liepen over twee alinea's met maar een openingsteken.** De
  tweede alinea las daardoor als tekst van het bureau in de ik-vorm, en dat is
  precies het stuk dat een AI-systeem eruit knipt. Elke vervolgalinea opent nu
  met een aanhalingsteken, zoals de conventie voorschrijft.
- **Het aantal beroepsgroepen stond als getal in de homepagetekst** ("Vier van
  de 44 beroepsgroepen") en klopte niet meer na de samenvoeging van 7l. Dat telt
  nu de collectie. De aantallen in README, het ontwerpdocument, MERKGROEP en
  CONCURRENTIE zijn bijgewerkt naar 43 beroepsgroepen en 129 trainingen; die
  liepen op sommige plekken al langer achter.
- **Toegevoegd op de contactpagina:** de trainingsacteur in het feitenlijstje,
  want dat is het enige onderscheidende feit dat standaard geleverd wordt en het
  stond daar niet. En een route naar wet en regels, de pagina waarmee een
  preventiemedewerker de aanvraag intern verantwoordt.

**Wat is gemeld maar bewust niet veranderd:**

- **De ik-vorm in de teamcitaten.** De regel "niet ik" gaat over de stem van de
  site, niet over wat iemand letterlijk zegt. Dat stond nergens vastgelegd, dus
  het leverde terecht een melding op. Toegevoegd aan STIJL.md.
- **Maximaal acht deelnemers bij expert.** Gemeld als afwijking van het vaste
  feit "maximaal tien", maar het is een bewuste en sitebreed consistente keuze
  die ook wordt uitgelegd: bij expert is meer ruimte nodig voor het eigen beleid
  van de organisatie.
- **Biografische gegevens in de teamteksten**, zoals "sinds 2003" en "meer dan
  35 jaar in het dementieveld", en opleidingen zoals de toneelacademie. Dat zijn
  geen verzonnen verkoopclaims maar wat de mensen zelf over zichzelf zeggen.
  Wel voor Youri om te bevestigen; opgenomen in hoofdstuk 8.

## 8. Nog open — heeft Youri nodig

- Onderkop van de hero
- Verzenddienst voor het contactformulier (sleutel)
- KvK-naam en -nummer voor `legalName`
- LinkedIn-URL van Marieke van Leeuwen (de andere elf staan erin)
- Keuzemenu op het gedeelde telefoonnummer (Youri bouwt dit)
- Wanneer het domein live gaat (nu nog een WordPress-wachtpagina)
- **Reviews** — het grootste gat ten opzichte van de concurrentie. Eén
  verifieerbare bron met echte beoordelingen weegt zwaarder dan welke tekst dan
  ook. Zonder bron geen `AggregateRating`: een score zonder herkomst is precies
  wat één van de onderzochte bureaus doet, en dat is geen voorbeeld om te volgen
- **CRKBO-registratie** — btw-vrijstelling is voor een zorg- of onderwijsklant
  direct geld. Vijf van de negen concurrenten hebben minstens één keurmerk
- **Klantnamen** die genoemd mogen worden, of anders de sectoren waarin gewerkt is
- **Cijfers over agressie in Nederland** op de site zetten: ja of nee? Ze zijn
  geverifieerd bij het CBS en beschikbaar, maar het vraagt een keuze welke reeks
  we gebruiken en hoe we die bronnen

## 9. Bevestigd, geen actie nodig

- De 12 teamleden zijn echte mensen met echte namen.
- Het hele aanbod is leverbaar; er staat niets aspiratiefs op de site.
- Adres en telefoonnummer zijn gedeeld met Act in Move. Dat mag — één KvK — maar
  het `LocalBusiness`-schema moet in de gaten worden gehouden.
- De Arbowet/PSA-claim waar eerder twijfel over was, blijkt niet op de site te
  staan.
