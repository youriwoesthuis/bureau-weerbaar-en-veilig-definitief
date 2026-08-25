# Ontwerpsysteem

Alles staat in `src/styles/global.css`. Dit document legt uit waaróm het zo
is, zodat een wijziging het systeem niet stilletjes ondermijnt.

Het ontwerp volgt bewust dat van **agressievisie.nl**, het zustermerk: royale
hoeken, ronde knoppen, zachte schaduwen, een icoon op elke kaart en cijfers
als blikvanger. De kleuren zijn wél die van dit merk, gemeten uit het eigen
logo.

---

## 1. Kleur komt uit het logo — gemeten, niet gekozen

Alle kleuren zijn uit de pixels van `public/images/logo/logo-origineel.png`
gelezen.

| Rol | Waarde | Waar in het logo | Steekproef |
|---|---|---|---|
| Oranje | `#f18816` | de bol, de bovenkant van de chevron, "Bureau" | 3.298 px |
| Marine | `#212e56` | "Weerbaar en Veilig" in het woordmerk | 18.783 px |
| Paars | `#8b5e76` | het middenpunt van het verloop | — |
| Indigo | `#4f4a8a` | de onderkant van de chevron | — |

De twee woordmerkkleuren zijn exact bevestigd als mediaan over grote
steekproeven. Daar zit geen ruimte tussen.

### Het merkverloop

Punt voor punt gemeten langs de werkelijke verloopas van het logo, die 55°
schuin loopt — in CSS is dat `125deg`:

```
#f28915 0%  → #ef8819 22% → #ec8723 33% → #e58330 44% → #d37a45 56%
→ #c77550 67% → #a2666a 78% → #75567f 89% → #4f4a8a 100%
```

**Let op de terracotta-tussenstops.** Het logo gaat niet rechtstreeks van
oranje naar blauw maar via een warm bruin, en het blijft langer oranje dan je
zou denken (tot 33%). Het eindigt op een gedempt indigo.

Een eerdere, grovere meting kwam uit op `#284191` als eindpunt en sloeg al bij
27% om naar paars. Die meting nam de blauwste lósse pixel; die zit in de
anti-aliasing van de smalle chevronpunt en is niet representatief voor wat je
ziet. De reeks hierboven is de mediaan per bakje langs de verloopas, en dat
levert een nette oplopende ramp op.

### Kleur betekent niveau

De drie niveaus volgen het verloop van boven naar beneden — de volgorde die
het logo zelf al maakt:

| Niveau | Op donker | Op licht |
|---|---|---|
| Basis | `--oranje-500` `#f18816` | `--oranje-op-wit` `#a45a0a` |
| Gevorderd | `--paars-400` `#c49bb0` | `--paars-op-wit` `#8d6078` |
| Expert | `--blauw-400` `#8fa2e6` | `--blauw-op-wit` `#4767cc` |
| Geen niveau | `--tekst-gedempt` | `--tekst-donker-zacht` |

Geregeld door één blok:

```css
[data-niveau="basis"] { --niveau: var(--oranje-500); --niveau-op-wit: var(--oranje-op-wit); }
```

Zet `data-niveau` op een element en alles eronder — badges, randen, cijfers,
stippen — kleurt mee. Gebruik in componenten altijd `var(--niveau)`, nooit een
kleur rechtstreeks.

### De valkuil: twee varianten per kleur

Een kleur die in een logo werkt, werkt niet automatisch als tekst:

- Oranje `#f18816` haalt op donker 7,15:1 en staat er onveranderd, maar op wit
  maar 2,54:1 — daar staat `#a45a0a`.
- Diepblauw haalt op wit 9,31:1, maar op donker 1,95:1.
- Paars haalt op donker 3,42:1, te weinig voor tekst.

**Waar een kleur afwijkt is alleen de lichtheid bijgesteld; de tint is exact
gelijk gebleven.** Daarom staat overal dit patroon:

```css
.iets { color: var(--niveau); }
:global(.op-licht) .iets { color: var(--niveau-op-wit); }
```

Vergeet je de tweede regel, dan krijg je onleesbare tekst die er in de editor
prima uitziet. Dat is tijdens de bouw vijf keer gebeurd en vijf keer door de
contrastcontrole gevonden, nooit door iemand die keek.

**Draai `scripts/contrast-audit.js` in de browser na elke wijziging aan kleur.**

### Waarom de achtergrond niet marineblauw is

De donkere vlakken (`--inkt-900` `#17171c` en familie) zijn bijna neutraal.
Een blauwe achtergrond concurreert met het oranje en maakt de hele pagina
koel; agressievisie.nl heeft om die reden ook een neutrale basis, zodat het
accent het werk doet. Er zit nog een spoor van de marinetint in.

---

## 2. Het logo zelf

De kop en de voettekst gebruiken **het echte logobestand**, niet een
nagetekende versie: `logo-origineel-wit.png` (wit woordmerk, hoort op donker).
Op 34px in de kop en 40px in de voet, uit een bron van 205px hoog — dus ruim
scherp genoeg.

`Chevron.astro` tekent het beeldmerk na en is alleen voor **decoratief**
gebruik: opsommingstekens, sectiemarkeringen. Het verloop daarin gebruikt
dezelfde gemeten stops.

---

## 3. Typografie

**Manrope**, gewicht 400–800, zelf gehost vanuit `public/fonts/`. Eén letter
voor alles, net als op het zustermerk — dat maakt de drie merken familie.

De schaal is bewust bescheiden. Een eerdere versie liet koppen tot 120px
lopen; agressievisie.nl houdt de h1 op 52px. Dat verschil was de belangrijkste
reden dat de site schreeuwerig en krap oogde.

| Klasse | Grootte |
|---|---|
| `.display` | tot 4rem (64px) |
| `h1` | tot 3,25rem (52px) |
| `h2` | tot 2,25rem (36px) |
| `h3` | tot 1,3rem (21px) |

Verder: `.bovenkop` (het kleine label met streepje), `.inleiding`,
`.leestekst` (max 42rem) en `.openingsantwoord`.

`.openingsantwoord` staat op **elke** pagina en is geen opmaakkeuze: het is
het blok dat Google en AI-antwoordsystemen citeren. Twee tot drie zinnen,
beginnend met "Bureau Weerbaar en Veilig" en niet met "wij". Het
controlescript waarschuwt als dat niet klopt.

---

## 4. Vorm

| Token | Waarde | Waarvoor |
|---|---|---|
| `--hoek` | 12px | kaarten, panelen, invoervelden |
| `--hoek-klein` | 8px | icoontegels |
| `--hoek-groot` | 20px | het CTA-blok |
| `--hoek-rond` | 999px | alle knoppen |

Schaduwen zijn zacht (`--schaduw-sm/md/lg`) in plaats van gekleurde
gloedranden. Kaarten liften 3px bij hover.

Hoeken van 4px lazen als een formulier; 12px leest als een kaart. Dat klinkt
klein maar was een van de grootste zichtbare verschillen.

---

## 5. Beweging

Alle beweging is CSS. Er staat **geen JavaScript** op de site.

| Wat | Hoe |
|---|---|
| Scroll-onthulling | `.onthul` met `animation-timeline: view()` |
| Voortgangsbalk in de kop | `animation-timeline: scroll(root block)` |
| Sectorkiezer | `:has()` op radioknoppen |
| PDCA-cyclus | `:has()` op radioknoppen |
| Niveaufilter | `:has()` op radioknoppen |
| Uitklapblokken | `<details>` met `name` voor accordeongedrag |
| Hero-illustratie | keyframes met oplopende vertraging |

Twee harde regels:

1. **Zonder ondersteuning blijft alles zichtbaar.** De onthul-animaties staan
   in `@supports (animation-timeline: view())`. Nooit iets op `opacity: 0`
   zetten buiten zo'n blok.
2. **`prefers-reduced-motion` zet alles uit**, centraal geregeld onderaan
   `global.css`.

---

## 6. Licht en donker binnen één pagina

De site is donker met lichte secties als ritme. Zet op een sectie `.op-licht`
(`--mist-50`) of `.op-wit`. Beide zetten de tekstkleuren om.

Componenten die in beide contexten kunnen staan hebben
`:global(.op-licht)`-varianten. **Test een nieuw component in beide
contexten** — de sectorkiezer stond aanvankelijk met donkere kleuren op een
lichte sectie en haalde 1,05:1.

Twee elementen binden de vlakken aan elkaar:

- **`.schuin-onder`** — een schuine wig in de kleur van de sectie eronder.
  Het herkenbaarste element van agressievisie.nl. Gebruik alleen waar de
  volgende sectie ook echt licht is.
- **De cijferstrip met `overlappend`** — valt met een negatieve marge over de
  sectiegrens heen. De sectie eronder moet dan extra ruimte krijgen, en de
  sectie erboven mag geen `overflow: hidden` hebben.

---

## 7. Toegankelijkheid

- Focusring: 3px `--amber-400` op donker, `--blauw-op-wit` op licht. Nooit
  weghalen.
- Elke `:has()`-constructie hangt aan een echte radioknop of checkbox die met
  het toetsenbord bereikbaar is. De knop is onzichtbaar maar niet
  `display: none`, anders verdwijnt hij uit de tabvolgorde.
- Doelgrootte minimaal 44px: `min-height: 2.75rem` op alles wat klikbaar is.
- Springlink naar de hoofdinhoud staat in `Kop.astro`.
- Contrast: 4,5:1 voor normale tekst, 3:1 vanaf 24px of 18,66px vet. Gemeten
  met doorrekening van doorzichtige kleuren én kleurverlopen.
