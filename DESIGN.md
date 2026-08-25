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

## 2. Kleur betekent niveau

Kleur is nooit versiering. Ze zegt op welk niveau je bent:

| Niveau | Op donker | Op licht |
|---|---|---|
| Basis | `--oranje-500` `#ff7a18` | `--oranje-op-wit` `#9a4a05` |
| Gevorderd | `--violet-400` `#a855f7` | `--violet-op-wit` `#7c22ce` |
| Expert | `--indigo-400` `#8b95ff` | `--indigo-op-wit` `#2f3ab8` |
| Geen niveau | `--tekst-gedempt` | `--tekst-donker-zacht` |

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
