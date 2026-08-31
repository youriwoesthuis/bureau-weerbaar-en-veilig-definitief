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
