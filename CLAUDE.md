# CLAUDE.md — werkafspraken voor dit project

Dit bestand wordt automatisch ingelezen bij elke sessie in deze map. Lees
daarnaast [BUREAU-WEERBAAR-EN-VEILIG-DEFINITIEF.md](BUREAU-WEERBAAR-EN-VEILIG-DEFINITIEF.md)
voordat je iets aan het ontwerp verandert — daar staat waarom de vorige
poging niet werkte.

---

## 1. De opdracht in één zin

De website van Bureau Weerbaar en Veilig: agressietraining per beroepsgroep
en niveau, statisch gegenereerd, geoptimaliseerd voor zoekmachines én
AI-antwoordsystemen, en scherp gescheiden van de twee zustermerken.

## 2. Positionering — moet uit elke pagina spreken

Dé specialist in agressietraining. Geen brede trainer die ook agressie doet:
één onderwerp, tot in de diepte, per beroepsgroep vertaald. Dat smalle,
diepe focuspunt is het bestaansrecht van dit merk en mag nergens verwateren
richting "we doen ook nog wat anders".

Bedrijfsgegevens staan in `src/lib/site.ts`. Wijzig ze daar, nooit in een
pagina — het adres staat ook in het `LocalBusiness`-schema en moet tot op de
spatie gelijk blijven aan het Google Bedrijfsprofiel.

## 3. Werkafspraken met de opdrachtgever

- **Niet om toestemming vragen tijdens uitvoerend werk.** Bouw door tot het
  werk af is, niet tot het eerste deel af is. Bij twintig bestanden: alle
  twintig. Afsluiten met wat er gedaan is en wat er nog loopt — als
  constatering, niet als vraag.
- **Zelf beslissen.** Geen keuzemenu's voor de volgorde van uitvoerend werk.
  Beoordeel wat het belangrijkst is, doe het, en verantwoord het achteraf.
- **Wel eerst overleggen** bij iets onomkeerbaars of naar buiten gerichts:
  publiceren naar een live site, verwijderen, een e-mailadres publiceren.
- De opdrachtgever is beginner in Git. Noem bij nieuwe handelingen de
  werkmap, één commando tegelijk, en wat er op het scherm verschijnt als het
  goed gaat. Zie `WERKWIJZE.md`.

## 4. Wat je nooit doet

- **Geen gegevens verzinnen.** Geen prijzen, data, certificeringen,
  klantnamen, reviews of aantallen die niet uit de content komen. Het merk is
  nieuw: er is geen naamsbekendheid, er zijn geen klanten en geen reviews.
  Advies dat op sociale bewijskracht leunt is dus onbruikbaar. Ontbreekt
  iets: vragen, niet gokken.
- **Geen stockfotografie**, en geen lege plekken die op een foto wachten.
  Zie `DESIGN.md` hoofdstuk 1.
- **Geen JavaScript op de site.** Alle interactie via `:has()`, `:checked`,
  `<details>` en `animation-timeline`. AI-crawlers voeren vaak geen scripts
  uit en de volledige inhoud moet in de HTML staan.
- **Geen redirects of cross-domain canonicals** naar de zustermerken.
  `MERKGROEP.md` is leidend voor alles wat de drie merken samen raakt.

## 5. Na élke wijziging

```bash
npm run build && npm run controleer
```

Fouten moeten weg; waarschuwingen mogen blijven maar moet je wel bekijken.
Er staat nu één bewuste waarschuwing (titel van 61 tekens op
`sociale-dienst-participatiewet-gevorderd`) — inkorten laat die titel botsen
met `sociale-dienst-uitkeringsinstanties`, en uniciteit weegt zwaarder dan
zestig tekens.

**Verander je iets aan kleur, dan óók de contrastcontrole** uit
`scripts/contrast-audit.js` in de browser draaien. Dat script vond tijdens de
bouw vijf kleurfouten die met het oog niet te zien waren. De reden dat het in
de browser draait en niet in Node: je hebt echte computed styles nodig om
doorzichtige kleuren en kleurverlopen door te rekenen.

**Voeg je links toe in een dichte lijst, meet dan de doelgrootte.** De eis is
24px (WCAG 2.2 AA, 2.5.8). Losse tekstlinks komen daar zonder staand
binnenwit niet aan: in de voettekst stonden er 43 op 21px. Meet op 375px
breed, niet alleen op desktop.

## 6. Vaste feiten over het aanbod

Staan in `FEITEN` in `src/lib/site.ts`, niet los in pagina's:

- Elke training duurt **1 dag** — alle niveaus, alle beroepsgroepen
- Maximaal 10 deelnemers, bij expert maximaal 8
- Deelnamecertificaat na afloop
- Incompany, op eigen locatie of in Neede

Controleer dit soort gegevens bij de opdrachtgever in plaats van ze over te
nemen uit oude content.

## 7. De drie niveaus

Vaste definities, staan in `NIVEAU_INFO` in `src/lib/site.ts`:

- **Basis** — herkennen en de-escaleren. Voor iedereen die met agressie te
  maken kan krijgen.
- **Gevorderd** — grenzen stellen onder druk, complexe casuïstiek, melden en
  nazorg. Voor wie de basis beheerst.
- **Expert** — beleid, teamnorm, nazorgstructuur en borging. Voor
  leidinggevenden en coördinatoren.

Kleur volgt het niveau: oranje, paars, diepblauw. Nooit als versiering.

## 8. Eisen voor vindbaarheid

- Eén `<h1>` per pagina, geen kopniveau overslaan
- Unieke titel en description per pagina, gegenereerd via `src/lib/seo.ts`
- Elke pagina opent met een `.openingsantwoord`: 2–3 zinnen die losstaand
  het antwoord geven, beginnend met "Bureau Weerbaar en Veilig" en niet met
  "wij"
- Schema.org: `Course` per training, `Organization` + `LocalBusiness`
  sitebreed, `FAQPage` bij vragenblokken, `BreadcrumbList` overal — met
  vaste `@id`'s zodat de blokken één entiteitsgrafiek vormen
- Elke training linkt naar de andere niveaus van dezelfde beroepsgroep, naar
  de sector, en naar aanpalende beroepsgroepen
- `llms.txt` wordt gegenereerd uit de content en hoeft niet met de hand te
  worden bijgewerkt

## 9. Techniekkeuzes — vastgelegd, niet opnieuw ter discussie

- Astro 5, statisch, `trailingSlash: 'always'`
- **Geen CSS-framework.** De vorige versie gebruikte Tailwind en zag er
  sjabloonachtig uit. Eigen tokens in `src/styles/global.css`
- **Geen lightningcss** als minifier: die kan `:has()`, `@property` en
  `animation-timeline` omzetten naar oudere syntax, en daar draait alle
  interactie op
- Content als markdown in `src/content/`, getypeerd in `src/content.config.ts`
- Hosting via GitHub Pages en GitHub Actions

## 10. Node op deze machine

Node staat in `C:\Program Files\nodejs` en zit **niet** in het PATH van de
Bash-tool. Prefix zelf:

```bash
PATH="/c/Program Files/nodejs:$PATH"
```
