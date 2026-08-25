# Bureau Weerbaar en Veilig — definitief

Dit is de herbouw van de website van Bureau Weerbaar en Veilig, opgezet op
25 augustus 2026 in een schone map en een schone repository.

Dit document beschrijft **waarom** de vorige poging niet werkte, **wat er nu
anders is**, en **wat er nog moet gebeuren**. Het is bedoeld om te lezen
vóórdat er iets aan deze site wordt veranderd.

---

## 1. Waarom de vorige versie niet lukte

De vorige repo (`bureau-weerbaar-en-veilig`) was technisch in orde: 383
pagina's, kloppende schema.org, geen contrastfouten, alles werkte zonder
JavaScript. En toch was het oordeel twee keer achter elkaar "helemaal kut"
en "nog steeds saai".

Bij het openen van die repo bleek waarom, en het zat niet in de opmaak:

**De site verwees naar 195 afbeeldingen die niet bestonden.** De hele
`public/`-map bevatte vier bestanden: twee logo's, een favicon en een
OG-plaatje. Elke trainingspagina, elke beroepsgroeppagina en elke
sectorpagina had een `afbeelding:`-veld in de frontmatter, en er stond geen
enkel bestand tegenover. Ook de twaalf teamportretten die in de
projectdocumentatie "het visuele anker van de site" werden genoemd,
bestonden niet.

Een pagina die is geschreven met beeld in gedachten en die zonder beeld
wordt opgeleverd, oogt leeg. Geen enkele hoeveelheid CSS repareert dat. De
vorige sessies hebben verlopen, texturen en schuine randen zitten verfijnen
op een pagina waar de helft van de inhoud ontbrak.

**Daarnaast werd er telkens op volle schaal gebouwd.** Er lagen twee
herbouwplannen van dezelfde dag (`HERBOUW.md` om 00:21, `BELEVING.md` om
01:55). Beide beschreven een complete verbouwing van alle 383 pagina's.
Tussen elke terugkoppeling zat dus een verbouwing van de hele site, wat
iteratie traag en duur maakt — en waardoor het oordeel "saai" pas viel
nadat er al een dag werk in zat.

## 2. Wat er nu anders is

### 2.1 Ontworpen om compleet te ogen zónder fotografie

Dit is de kern van de herbouw. Er komt voorlopig geen beeldmateriaal, dus
de site wordt daar niet meer op gebouwd. In plaats daarvan:

- **Donkere basis.** Een donkere pagina met felle kleurvlakken oogt gevuld;
  een witte brochurepagina zonder foto's oogt leeg. Dat is het hele verschil.
- **Typografie is het beeld.** De display-koppen lopen tot 7,5rem, met het
  merkverloop door het woord heen. De kop draagt de pagina, niet een foto.
- **De chevron uit het logo is een bouwelement**, geen behang: sectiemarkering,
  opsommingsteken, hoekafsluiting.
- **Sfeerlicht in plaats van beeld.** De klasse `.gloed` legt drie zachte
  radiale verlopen (oranje, violet, indigo) achter donkere secties, zodat er
  diepte is zonder illustratie.
- **Initiaaltegels voor het team.** Geen lege plek die op een portret wacht,
  maar een bewuste tegel in de niveaukleur.

Het `afbeelding:`-veld staat nog in het contentmodel maar wordt door **geen
enkele template gebruikt**. Er kan dus geen gebroken afbeelding ontstaan.
Komen er ooit echte foto's, dan is dat een bewuste toevoeging.

### 2.2 De kleuren komen uit het logo, gemeten

Niet gekozen en niet benaderd: de kleuren zijn uit de pixels van
`public/images/logo/logo-origineel.png` gelezen, over 14.000 pixels van het
beeldmerk.

| Rol | Waarde | Waar in het logo |
|---|---|---|
| Oranje | `#f18816` | de bol, de bovenkant van de chevron, "Bureau" |
| Paars | `#8b5e76` | het middenpunt van het verloop |
| Diepblauw | `#284191` | de onderkant van de chevron |
| Marine | `#212e56` | "Weerbaar en Veilig" |

Het merkverloop is diezelfde reeks, met de stops op de plek waar ze in het
bestand liggen. De donkere ondergronden van de site zijn het marineblauw van
het woordmerk, alleen donkerder gemaakt.

De drie niveaus volgen het verloop van boven naar beneden — de volgorde die
het logo zelf al maakt: **oranje = basis, paars = gevorderd, diepblauw =
expert.** Eén plek regelt dat: `[data-niveau="…"]` in `global.css` zet
`--niveau`, en elk onderdeel gebruikt die variabele.

**Waar een kleur afwijkt, is alleen de lichtheid bijgesteld en is de tint
exact gelijk gebleven.** Dat moest op drie plekken, want een kleur die in
een logo werkt, werkt niet automatisch als tekst:

- Oranje staat op donkere vlakken onveranderd (7,15:1), maar haalt op wit
  maar 2,54:1 — daar staat `#a45a0a`.
- Diepblauw haalt op wit 9,31:1, maar op donker 1,95:1.
- Paars haalt op donker 3,42:1, te weinig voor tekst.

Om dezelfde reden zijn er twee verlopen: `--verloop-merk` is het logoverloop
onaangeroerd, voor het beeldmerk en gekleurde vlakken. `--verloop-tekst`
gebruikt dezelfde tinten met een lichtere staart, voor de grote koppen —
anders loopt het laatste woord van "Agressietraining voor uw beroepsgroep"
weg in de achtergrond.

Eén observatie om te weten: het paars van het logo is het punt waar oranje
en blauw in elkaar overlopen. Het is daardoor van nature een gedempte tint
en geen fel paars. Dat is geen fout in de afleiding maar een eigenschap van
het logo — het valt op omdat het tussen twee sterke kleuren staat.

### 2.3 Er valt iets te doen

De vorige homepage was 1818 woorden lezen. Deze opent met een sectorkiezer:
negentien chips, en het paneel ernaast toont direct de beroepsgroepen van de
gekozen sector. Verder: uitklapbare programmablokken op elke trainingspagina,
een niveaufilter op de trainingenlijst, uitklapbare vragen, tellende cijfers
en scroll-onthulling.

Alles daarvan werkt **zonder JavaScript** — via `:has()`, `:checked`,
`<details>` en `animation-timeline`. Er staat geen enkel script op de site.
Dat is geen principekwestie maar een eis: AI-crawlers voeren vaak geen
scripts uit, en de volledige inhoud moet in de HTML staan.

### 2.4 Eerst het gezicht, dan de schaal

Deze bouw is begonnen met het ontwerpsysteem en één pagina, en pas daarna
uitgerold over 207 pagina's. Bij de volgende ronde graag hetzelfde: eerst
één pagina laten zien, dan pas vermenigvuldigen.

## 3. Wat er is meegenomen uit de oude repo

De 207 contentbestanden. Die zijn goed en opnieuw schrijven zou pure
verspilling zijn:

- 132 trainingen (44 beroepsgroepen × 3 niveaus)
- 44 beroepsgroepen met eigen introtekst
- 19 sectoren met eigen introtekst
- 12 teamleden

Verder: het logo, `MERKGROEP.md` en de vaste bedrijfsgegevens. **Alle code
is nieuw.** Geen Tailwind meer — de oude site zag er sjabloonachtig uit, en
een eigen CSS-systeem met vaste tokens geeft meer grip en minder standaardlook.

## 4. Techniek

- **Astro 5**, statisch gegenereerd, `trailingSlash: 'always'`
- **Geen CSS-framework.** Eigen ontwerpsysteem in `src/styles/global.css`
- **Space Grotesk** voor koppen, **Inter** voor lopende tekst, beide variabel
  en zelf gehost via `@fontsource-variable`
- **Geen JavaScript op de site.** Alle interactie is CSS
- Content als markdown in `src/content/`, getypeerd via `src/content.config.ts`
- Sitemap en `robots.txt` automatisch; `llms.txt` wordt uit de content
  gegenereerd zodat het niet kan verouderen

## 5. Kwaliteitsbewaking

Twee controles, en ze horen **na elke build** te draaien:

```bash
npm run build && npm run controleer
```

`scripts/controleer.mjs` leest de gebouwde site in `dist/` en controleert
vier dingen: gebroken interne links, metadata (lengte, uniciteit, canonicals,
kopstructuur), schema.org (verplichte velden, verwijzingen zonder doel) en
het openingsantwoord voor AI-antwoordsystemen.

Fouten laten het script falen; waarschuwingen niet. Dat onderscheid is
bewust: er staat één titel van 61 tekens op de site
(`sociale-dienst-participatiewet-gevorderd`), en inkorten zou hem laten
botsen met `sociale-dienst-uitkeringsinstanties`. Uniciteit weegt zwaarder
dan passen binnen zestig tekens.

De contrastcontrole draait in de browser, niet in Node — je hebt echte
computed styles nodig om doorzichtige kleuren en kleurverlopen door te
rekenen. Het script staat in `scripts/contrast-audit.js`.

**Deze controles zijn geen formaliteit.** Ze vonden tijdens deze bouw vier
fouten die met het oog niet te zien waren:

1. De sectorpagina "Sportaccommodaties" en de beroepsgroeppagina eronder
   kregen dezelfde titel.
2. De sectorkiezer stond met donkere kleuren op een lichte sectie: donkere
   koppen op een donker paneel (1,05:1).
3. De knop in de voettekst kreeg lichtblauwe tekst op oranje (1,02:1),
   doordat de algemene linkregel van de footer won van de knopstijl.
4. "Voor wie:" in de niveauladder hield op witte kaarten de kleur voor
   donkere vlakken (1,78:1).

## 6. Wat er nog nodig is — van jou

Deze staan op volgorde van wat het meest oplevert:

- [ ] **Prijzen.** De site zegt nu "vraag een offerte aan". Een prijsindicatie
      is een van de sterkste redenen om contact op te nemen.
- [ ] **De verzenddienst voor het contactformulier.** Het formulier is
      gebouwd maar staat uit, omdat een knop die niets doet erger is dan geen
      knop. Zie `WERKWIJZE.md`, hoofdstuk 6.
- [ ] **KvK-naam en KvK-nummer** voor `legalName` in het schema.org-blok.
- [ ] **LinkedIn-URL's van de teamleden** — het veld staat klaar in het schema.
- [ ] **Echte trainingsfoto's**, als die er ooit komen. De site heeft ze niet
      nodig, maar ze zouden wel helpen.
- [ ] **Het definitieve logo.**

## 7. Wat bewust níét gebeurt

- **Geen verzonnen gegevens.** Geen prijzen, data, klantnamen, reviews of
  cijfers die niet uit de content komen. Het merk is nieuw: er zijn geen
  klanten en geen reviews, en die verzinnen mag niet.
- **Geen stockfotografie.** Het ontwerp gaat er bewust omheen.
- **Geen redirects of cross-domain canonicals naar de zustermerken.** Zie
  `MERKGROEP.md`; dat bestand is leidend voor alles wat de drie merken
  samen raakt.
