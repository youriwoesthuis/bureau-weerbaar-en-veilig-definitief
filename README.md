# Bureau Weerbaar en Veilig

De website van Bureau Weerbaar en Veilig — agressietraining per beroepsgroep
en niveau. Statisch gegenereerd met Astro, zonder JavaScript op de site.

**207 pagina's:** 132 trainingen, 44 beroepsgroepen, 19 sectoren, 3 niveaus,
en de vaste pagina's.

## Snel starten

```bash
npm install
```

```bash
npm run dev
```

Open daarna `http://localhost:4321/`.

## Commando's

| Commando | Wat het doet |
|---|---|
| `npm run dev` | Ontwikkelserver met live verversen |
| `npm run build` | Bouwt de site naar `dist/` |
| `npm run preview` | Bekijkt de gebouwde site zoals hij live komt |
| `npm run controleer` | Controleert `dist/` op links, metadata, schema en openingsantwoorden |

**Draai `npm run build && npm run controleer` voordat je iets live zet.**

## Waar staat wat

```
src/
  content/          de inhoud — 207 markdown-bestanden
    trainingen/       132 trainingen
    beroepsgroepen/   44 beroepsgroepen
    sectoren/         19 sectoren
    team/             12 teamleden
  components/       herbruikbare onderdelen
  layouts/Basis.astro   kop, voet, metadata en schema.org
  pages/            de routes
  lib/site.ts       bedrijfsgegevens en niveaudefinities
  lib/seo.ts        titels, descriptions, schema.org
  styles/global.css het ontwerpsysteem
scripts/
  controleer.mjs      vier controles op de gebouwde site
  contrast-audit.js   contrastcontrole, draait in de browser
```

## Documentatie

| Bestand | Waarover |
|---|---|
| [BUREAU-WEERBAAR-EN-VEILIG-DEFINITIEF.md](BUREAU-WEERBAAR-EN-VEILIG-DEFINITIEF.md) | Waarom deze herbouw, wat er anders is, wat er nog nodig is |
| [WERKWIJZE.md](WERKWIJZE.md) | Hoe je de site beheert en live zet, stap voor stap |
| [DESIGN.md](DESIGN.md) | Het ontwerpsysteem: kleur, typografie, beweging |
| [MERKGROEP.md](MERKGROEP.md) | De verhouding tot Act in Move en AgressieVisie — leidend |
| [CLAUDE.md](CLAUDE.md) | Werkafspraken voor wie met Claude Code aan dit project werkt |

## Techniek

- Astro 5, statisch, `trailingSlash: 'always'`
- Geen CSS-framework; eigen ontwerpsysteem met tokens
- Space Grotesk en Inter, variabel en zelf gehost
- Geen JavaScript op de site — alle interactie via `:has()`, `:checked`,
  `<details>` en `animation-timeline`
- Sitemap en `robots.txt` automatisch, `llms.txt` uit de content gegenereerd

## Live zetten

Elke push naar `main` start een build via GitHub Actions. Slaagt die, dan
staat de nieuwe versie binnen enkele minuten online. Mislukt de build, dan
blijft de oude site in de lucht.
