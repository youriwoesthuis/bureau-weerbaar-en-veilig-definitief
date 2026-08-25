# Werkwijze — de site beheren

Praktische handleiding. Geschreven voor iemand die Git en GitHub niet
dagelijks gebruikt: elke stap zegt waar je moet staan, wat je typt, en
waaraan je ziet dat het gelukt is.

De werkmap is telkens:

```
C:\Users\YouriWoesthuisActinM\test\bwv-definitief
```

---

## 1. De site op je eigen computer bekijken

Open PowerShell, ga naar de map en start de ontwikkelserver:

```bash
cd C:\Users\YouriWoesthuisActinM\test\bwv-definitief
```

```bash
npm run dev
```

**Wat je ziet:** na een paar seconden verschijnt er een regel met
`Local http://localhost:4321/`. Open die link in je browser — daar staat
de site. Zolang dit venster openstaat, ververst de site zichzelf zodra je
een bestand opslaat.

**Stoppen:** klik in het PowerShell-venster en druk `Ctrl + C`.

---

## 2. Een training wijzigen

Elke training is één markdown-bestand in:

```
src\content\trainingen\
```

De bestandsnaam is de URL. `agressietraining-thuiszorg-wijkverpleging-basis.md`
wordt `/trainingen/agressietraining-thuiszorg-wijkverpleging-basis/`.

Bovenin elk bestand staat een blok tussen twee regels met `---`. Dat heet de
frontmatter en bevat de gegevens; daaronder staat de lopende tekst.

| Veld | Wat het is |
|---|---|
| `titel` | De grote kop op de pagina |
| `slug` | Moet gelijk zijn aan de bestandsnaam zonder `.md` |
| `sector` | Moet bestaan in `src\content\sectoren\` |
| `beroepsgroep` | Moet bestaan in `src\content\beroepsgroepen\` |
| `niveau` | `basis`, `gevorderd` of `expert` — bepaalt ook de kleur |
| `duur` | Nu overal `1 dag` |
| `groepsgrootte` | Nu `maximaal 10 deelnemers`, bij expert 8 |
| `doelgroep` | Eén zin: voor wie is dit |
| `samenvatting` | 2–3 zinnen. **Dit is het belangrijkste veld** — het staat bovenaan de pagina en het is de tekst die Google en AI-systemen citeren |
| `resultaat` | 4–6 leeruitkomsten |
| `programma` | De blokken van de dag, elk met `titel` en `inhoud` |
| `werkvormen` | Rollenspel, trainingsacteur, casuïstiek |
| `veelgestelde_vragen` | Vraag/antwoord-paren |

**Let op de inspringing.** In markdown-frontmatter betekenen spaties aan het
begin van een regel iets. Neem de opmaak van een bestaande regel over.

**Een nieuwe training toevoegen:** kopieer een bestaand bestand van dezelfde
sector, hernoem het, en pas `titel`, `slug`, `beroepsgroep` en `niveau` aan.
De training verschijnt vanzelf in alle overzichten, in de sitemap en in
`llms.txt` — daar hoef je niets voor te doen.

---

## 3. Controleren of alles nog klopt

**Doe dit altijd voordat je iets live zet.**

```bash
npm run build
```

```bash
npm run controleer
```

**Wat je ziet:** een regel `Gecontroleerd: 207 pagina's in dist/`, daarna
eventueel waarschuwingen, en als het goed is `Geen fouten gevonden.`

- **Waarschuwingen** mag je laten staan. Er is er nu één, over een titel van
  61 tekens. Die is bewust.
- **Fouten** moeten weg. Het script noemt de pagina en wat eraan mankeert.

Veelvoorkomende fouten en wat ze betekenen:

| Melding | Wat er aan de hand is |
|---|---|
| `gebroken link naar /...` | Je verwijst naar een pagina die niet bestaat. Meestal een typefout in een slug |
| `titel is niet uniek, ook op /...` | Twee pagina's hebben dezelfde titel. Kort er één in via `AFKORTINGEN` in `src\lib\seo.ts` |
| `Course mist verplicht veld "..."` | Een training mist `resultaat`, `samenvatting` of `titel` |
| `geen openingsantwoord gevonden` | De pagina heeft geen `.openingsantwoord`-blok |

---

## 4. Een wijziging live zetten

Git werkt in drie stappen: je kiest wat er mee moet (`add`), je legt het
vast met een omschrijving (`commit`), en je stuurt het naar GitHub (`push`).

Kijk eerst wat er is veranderd:

```bash
git status
```

**Wat je ziet:** een lijst met gewijzigde bestanden in het rood.

Alles meenemen:

```bash
git add .
```

Vastleggen, met een korte omschrijving tussen de aanhalingstekens:

```bash
git commit -m "Prijsindicatie toegevoegd aan de trainingspagina"
```

Naar GitHub sturen:

```bash
git push
```

**Wat er dan gebeurt:** GitHub bouwt de site automatisch opnieuw. Dat duurt
twee tot drie minuten. Daarna staat de nieuwe versie online.

---

## 5. Zien of het gelukt is

Ga naar de repository op GitHub en klik bovenaan op **Actions**.

- **Groen vinkje** — de site is opnieuw gebouwd en staat live.
- **Gele stip** — hij is nog bezig. Wacht even.
- **Rood kruis** — de build is mislukt. **De oude site blijft dan gewoon in
  de lucht.** Een fout haalt de site nooit offline.

Klik bij een rood kruis op de regel en dan op de rode stap; onderin staat de
foutmelding. Meestal is het iets uit hoofdstuk 3 dat je lokaal ook had
gezien met `npm run controleer`.

---

## 6. Het contactformulier aanzetten

Het formulier op `/contact/` is gebouwd maar staat uit. Zolang er geen
verzenddienst is ingesteld, toont de pagina de telefoon- en e-mailknoppen in
plaats van een formulier — een knop die niets doet is erger dan geen knop.

Aanzetten gaat zo:

1. Maak een gratis account op [web3forms.com](https://web3forms.com). Je
   krijgt een *access key*: een lange reeks tekens.
2. Maak in de hoofdmap van het project een bestand met de naam `.env` en zet
   daar deze twee regels in, met jouw sleutel achter de tweede:

   ```
   PUBLIC_FORMULIER_ENDPOINT=https://api.web3forms.com/submit
   PUBLIC_FORMULIER_SLEUTEL=jouw-sleutel-hier
   ```

3. Zet dezelfde twee waarden ook in GitHub, anders werkt het alleen op je
   eigen computer: **Settings → Secrets and variables → Actions → Variables →
   New repository variable**.

Het bestand `.env` wordt bewust niet meegestuurd naar GitHub — dat staat in
`.gitignore`. Sleutels horen niet in een repository.

Het formulier heeft al een verborgen veld tegen spam (`botcheck`), dat
mensen niet zien en bots wel invullen.

---

## 7. Terug naar de vorige versie

Werkt er iets niet meer en wil je terug? Kijk eerst wat de laatste
wijzigingen waren:

```bash
git log --oneline -10
```

**Wat je ziet:** tien regels, elk met een korte code van zeven tekens en de
omschrijving die je bij het vastleggen hebt getypt.

Draai de laatste wijziging terug — dit maakt een nieuwe wijziging die het
tegenovergestelde doet, dus er gaat niets verloren:

```bash
git revert HEAD
```

```bash
git push
```

Binnen een paar minuten staat de vorige versie weer live.

---

## 8. Vijf foutmeldingen die je kunt tegenkomen

**`npm : The term 'npm' is not recognized`**
Node staat niet in het zoekpad van dit venster. Sluit PowerShell, open het
opnieuw, en probeer het nog eens. Helpt dat niet, installeer Node opnieuw
vanaf [nodejs.org](https://nodejs.org) en vink "Add to PATH" aan.

**`Cannot find module` of `Failed to resolve import`**
De pakketten missen. Herstellen:

```bash
npm install
```

**`Invalid frontmatter in ...md`**
Er staat een fout in het blok tussen de twee `---`-regels van een
markdown-bestand. Bijna altijd inspringing, of een dubbele punt in een tekst
die niet tussen aanhalingstekens staat. Zet de hele waarde tussen
dubbele aanhalingstekens.

**`Updates were rejected because the remote contains work that you do not have`**
Er is elders al iets gewijzigd. Haal dat eerst op:

```bash
git pull --rebase
```

Daarna opnieuw `git push`.

**`Port 4321 is in use`**
Er draait al een ontwikkelserver. Sluit het andere PowerShell-venster, of
start op een andere poort:

```bash
npm run dev -- --port 4322
```

---

## 9. Verhuizen naar het eigen domein

De site draait op GitHub Pages. Bij verhuizing naar
`bureauweerbaarenveilig.nl`:

1. Verwijder in `.github/workflows/deploy.yml` de twee regels met
   `PUBLIC_SITE_URL` en `PUBLIC_BASE_PATH`. Zonder die regels valt de site
   terug op `https://bureauweerbaarenveilig.nl` en een pad zonder submap.
2. Zet in GitHub bij **Settings → Pages → Custom domain** het domein.
3. Wijs bij de DNS-beheerder een `CNAME` aan naar
   `youriwoesthuis.github.io`.
4. Zet **Enforce HTTPS** aan zodra GitHub het certificaat heeft geregeld.
