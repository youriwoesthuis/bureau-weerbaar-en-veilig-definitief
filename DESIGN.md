# Ontwerpsysteem

Alles staat in `src/styles/global.css`. Dit document legt uit waaróm het zo
is, zodat een wijziging het systeem niet stilletjes ondermijnt.

---

## 1. Het uitgangspunt: geen fotografie

De site heeft geen beeldmateriaal en is ontworpen om dat niet te missen.
Dat is geen tijdelijke noodgreep maar de kern van het ontwerp:

- **Donker als basis.** Een donkere pagina met felle kleurvlakken oogt
  gevuld. Een witte pagina zonder foto's oogt leeg. Dat verschil is de
  belangrijkste ontwerpbeslissing van dit project.
- **Typografie draagt de pagina.** De `.display`-kop loopt tot 7,5rem met
  het merkverloop door de tekst. De kop ís het beeld.
- **Sfeerlicht via `.gloed`.** Drie zachte radiale verlopen achter donkere
  secties geven diepte zonder illustratie.
- **De chevron is een bouwelement.** In de oude site stond hij als behang op
  2,8% dekking — onzichtbaar en dus zinloos. Nu is hij sectiemarkering,
  opsommingsteken en hoekafsluiting.

Het veld `afbeelding` in de content wordt door **geen enkele template**
gebruikt. Zo kan er geen gebroken afbeelding ontstaan.

---

## 2. Kleur komt uit het logo

**Alle kleuren zijn gemeten uit `public/images/logo/logo-origineel.png`** —
uit de pixels van het bestand, niet gekozen en niet benaderd. Over 14.000
pixels van het beeldmerk:

| Rol | Waarde | Waar in het logo |
|---|---|---|
| Oranje | `#f18816` | de bol, de bovenkant van de chevron, het woord "Bureau" |
| Paars | `#8b5e76` | het middenpunt van het verloop in de chevron |
| Diepblauw | `#284191` | de onderkant van de chevron |
| Marine | `#212e56` | "Weerbaar en Veilig" in het woordmerk |

Het merkverloop is diezelfde reeks:
`#f18816 → #ea8627 27% → #ce784a 45% → #8b5e76 72% → #284191`.

De donkere ondergronden van de site zijn het marineblauw van het woordmerk,
in lichtheid uitgedund tot een reeks. Zelfde tint, donkerder.

### Kleur betekent niveau

De drie niveaus volgen het verloop van boven naar beneden — dat is de
volgorde die het logo zelf al maakt:

| Niveau | Op donker | Op licht |
|---|---|---|
| Basis | `--oranje-500` `#f18816` | `--oranje-op-wit` `#a45a0a` |
| Gevorderd | `--paars-400` `#b490a3` | `--paars-op-wit` `#8d6078` |
| Expert | `--blauw-400` `#8398dd` | `--blauw-op-wit` `#4767cc` |
| Geen niveau | `--tekst-gedempt` | `--tekst-donker-zacht` |

**Waar een kleur afwijkt van het logo, is alleen de lichtheid bijgesteld en
is de tint exact gelijk gebleven.** Dat was op drie plekken nodig, en de
reden staat er in `global.css` bij:

- Oranje `#f18816` haalt op donker 7,15:1 en staat er dus onveranderd, maar
  op wit maar 2,54:1 — vandaar `#a45a0a`.
- Diepblauw `#284191` haalt op wit 9,31:1, maar op donker 1,95:1.
- Paars `#8b5e76` haalt op donker 3,42:1, te weinig voor tekst.

Het paars van het logo is het punt waar oranje en blauw in elkaar overlopen.
Het is daardoor van nature een gedempte tint, geen fel paars — dat is geen
fout in de afleiding maar een eigenschap van het logo.

### Twee verlopen: één voor vlakken, één voor tekst

`--verloop-merk` is het logoverloop, onaangeroerd. Gebruik dat voor het
beeldmerk en gekleurde vlakken.

`--verloop-tekst` is voor koppen die met `background-clip: text` gevuld
worden. Nodig omdat het diepblauw van het logo op een donkere achtergrond
1,95:1 haalt: in een kop van 100px loopt het laatste woord dan weg in de
achtergrond. Deze variant houdt dezelfde tinten aan en licht alleen de
staart op.

Dit wordt geregeld door één blok:

```css
[data-niveau="basis"] { --niveau: var(--oranje-500); --niveau-op-wit: var(--oranje-op-wit); }
```

Zet `data-niveau` op een element en alles eronder — badges, randen, cijfers,
stippen — kleurt mee. Gebruik in componenten altijd `var(--niveau)`, nooit
een kleur rechtstreeks.

### De valkuil: twee varianten per kleur

**De felle kleuren halen op wit geen contrast.** `#ff7a18` op wit is 2,52:1,
ver onder de norm van 4,5:1. Daarom bestaat elke kleur dubbel, en daarom
staat overal in de componenten dit patroon:

```css
.iets { color: var(--niveau); }
:global(.op-licht) .iets { color: var(--niveau-op-wit); }
```

Vergeet je de tweede regel, dan krijg je onleesbare tekst die er in de
editor prima uitziet. Dat is tijdens deze bouw drie keer gebeurd en drie
keer door de contrastcontrole gevonden, niet door iemand die keek.

**Draai daarom `scripts/contrast-audit.js` in de browser na elke wijziging
aan kleur.**

---

## 3. Typografie

- **Koppen: Space Grotesk.** Technische ondertoon, herkenbaar in de cijfers
  en de `a`. Gezag zonder stoffigheid.
- **Lopende tekst: Inter.** Hoge x-hoogte, rustig over lange alinea's, legt
  het bewust af tegen de kop in karakter.
- Beide variabel en zelf gehost via `@fontsource-variable`. Geen externe
  verzoeken, geen verspringende tekst bij het laden.

Klassen:

| Klasse | Waarvoor |
|---|---|
| `.display` | De grote kop van een pagina, tot 7,5rem |
| `.bovenkop` | Het kleine label boven een kop, met streepje in de niveaukleur |
| `.inleiding` | De zin onder een kop |
| `.leestekst` | Alle lopende tekst, max 42rem |
| `.openingsantwoord` | Het losknipbare antwoord bovenaan elke pagina |

`.openingsantwoord` staat op **elke** pagina en is geen opmaakkeuze: het is
het blok dat Google en AI-antwoordsystemen citeren. Twee tot drie zinnen,
beginnend met "Bureau Weerbaar en Veilig" en niet met "wij". Het
controlescript waarschuwt als dat niet klopt.

---

## 4. Beweging

Alle beweging is CSS. Er staat geen JavaScript op de site.

| Wat | Hoe |
|---|---|
| Scroll-onthulling | `.onthul` met `animation-timeline: view()` |
| Voortgangsbalk in de kop | `animation-timeline: scroll(root block)` |
| Tellende cijfers | `@property --n` plus `counter()` |
| Kaarten die reageren | `transform` en de niveaustreep via `::before` |
| Sectorkiezer | `:has()` op radioknoppen |
| Uitklapblokken | `<details>` met `name` voor accordeongedrag |

Twee harde regels:

1. **Zonder ondersteuning blijft alles zichtbaar.** De onthul-animaties staan
   in `@supports (animation-timeline: view())`. Een oudere browser toont de
   pagina gewoon, alleen zonder beweging. Nooit iets op `opacity: 0` zetten
   buiten zo'n blok.
2. **`prefers-reduced-motion` zet alles uit.** Dat staat centraal geregeld
   onderaan `global.css`. Nieuwe animaties hoeven daar niets voor te doen,
   maar controleer het wel.

---

## 5. Licht en donker binnen één pagina

De site is donker, met lichte secties als ritme. Zet op een sectie:

- `.op-licht` — `--mist-50`, de rustige lichte sectie
- `.op-wit` — puur wit, voor kaarten en formulieren

Beide zetten de tekstkleuren om. Componenten die in beide contexten kunnen
staan, hebben `:global(.op-licht)`-varianten. **Test een nieuw component in
beide contexten** — de sectorkiezer stond aanvankelijk met donkere kleuren
op een lichte sectie en haalde 1,05:1.

Het ritme van de homepage: donker hero → donker met cijfers → licht met de
kiezer → donker met de niveaus → licht met de argumenten → donkere afsluiting.

---

## 6. Toegankelijkheid

- Focusring: 3px `--amber-400` op donker, `--violet-op-wit` op licht. Nooit
  weghalen.
- Elke `:has()`-constructie hangt aan een echte radioknop of checkbox die
  met het toetsenbord bereikbaar is. De knop is onzichtbaar maar niet
  `display: none`, anders verdwijnt hij uit de tabvolgorde.
- Doelgrootte minimaal 44px: `min-height: 2.75rem` op alles wat klikbaar is.
- Springlink naar de hoofdinhoud staat in `Kop.astro`.
- Contrast: 4,5:1 voor normale tekst, 3:1 vanaf 24px of 18,66px vet.
  Gemeten met doorrekening van doorzichtige kleuren én kleurverlopen.
