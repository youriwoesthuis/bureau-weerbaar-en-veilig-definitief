# Vluchtplan — de luchtvaart als bronvak

Voorstel van 25 augustus 2026. Nog niet besloten; dit is het plan om over te
beslissen. Waar het botst met `BESLUITEN.md` staat dat er expliciet bij.

---

## 1. Het idee in één zin

Niet de luchtvaart als jasje over het aanbod, maar de luchtvaart als het vak
dat ons probleem eerder heeft opgelost — en waarvan wij de methode lenen.

## 2. Waarom dit kan werken

De luchtvaart is het bekendste voorbeeld van een beroepsgroep die
veiligheid van geluk naar systeem heeft gebracht. Wat daar gebeurde:

- **Van schuld naar melding.** Vroeger was een incident de fout van de
  piloot. Nu is niet-melden de fout. Precies de omslag die een team moet
  maken dat vindt dat agressie "erbij hoort".
- **Bijna-ongelukken tellen mee.** In de luchtvaart meld je wat *bijna*
  misging. In de meeste organisaties wordt agressie pas gemeld als er iets
  kapot is. Dat verschil is het scherpste dat we over meldcultuur kunnen
  zeggen, en het is niet van ons — het is aantoonbaar hoe die sector werkt.
- **Debriefen is routine, geen ramp-procedure.** Na elke vlucht, niet alleen
  na een noodgeval. Vergelijk dat met een team dat alleen nabespreekt als
  iemand huilend de balie verlaat.
- **Crew Resource Management.** De junior mag de gezagvoerder corrigeren.
  Ontwikkeld omdat toestellen neerstortten terwijl iemand in de cockpit het
  zag aankomen en zweeg. Dit is exact "de zwakste plek in het team is de
  norm geworden", maar dan met een geschiedenis erachter.
- **Checklists.** Niet omdat piloten dom zijn, maar omdat mensen onder druk
  stappen overslaan. Dezelfde reden waarom oefenen boven uitleggen gaat.

Dat is geen woordspel. Het is een tweede vak dat onze stelling bewijst — en
voor een merk zonder klanten, reviews of historie is een geleende bewijslast
het enige soort autoriteit dat eerlijk beschikbaar is.

## 3. Wat we lenen, en waar het op slaat

| Luchtvaart | Bij ons | Staat al in de content? |
|---|---|---|
| Pre-flight briefing | De intake | Ja, PDCA-fase Plan |
| Checklist | Wat je nagaat vóór een huisbezoek of zwaar gesprek | Deels — risicotaxatie bij energie, leerplicht, reclassering |
| Go / no-go | Het besluit om een bezoek of gesprek af te breken | Ja, bij bezorgers, monteurs, taxi, thuiszorg |
| Turbulentie herkennen | De spanningscurve | Ja, staat sinds vandaag op de homepage |
| Crew Resource Management | Hoe een team onder druk samenwerkt | Ja, niveau gevorderd |
| Near-miss melden | Melden wat bijna misging | **Nee — dit is nieuw en het is het sterkste punt** |
| Debrief | Nabespreken als vaste gewoonte | Ja, PDCA-fase Check |
| Veiligheidscultuur van de maatschappij | Beleid, teamnorm, borging | Ja, niveau expert |

De rechterkolom is belangrijk: op één na is alles wat we lenen al aanwezig.
We geven het geen nieuwe inhoud maar een tweede taal, en dat is precies
waarom het geen gimmick hoeft te worden.

**De uitzondering is de winst.** Near-miss melden staat nergens op de site en
het is het meest onderscheidende dat we kunnen zeggen. "Jullie melden pas als
het misgaat. In de luchtvaart melden ze wat bijna misging — en daarom
gebeurt het daar minder." Dat is één zin waarmee je een preventiemedewerker
overtuigt.

## 4. Waar het wél mag staan, en waar niet

Dit is de belangrijkste paragraaf van het plan. Zonder deze grenzen sloopt
het idee de vindbaarheid.

**Mag wel:**

- In de verhalende laag: inleidingen, tussenkoppen, de uitleg bij een model
- Als naam van een model of een instrument op de site
- Op `/aanpak/` en de homepage, waar de methode wordt uitgelegd
- In `llms.txt`, als beschrijving van de werkwijze

**Mag niet:**

- **Niet in `<title>` of `<h1>` van een training-, beroepsgroep- of
  sectorpagina.** Die blijven "Agressietraining {beroepsgroep} — {niveau}".
  Niemand zoekt op "agressietraining boarding"; de hele vindbaarheid van 132
  pagina's hangt aan die formulering.
- **Niet in URL's.** Geen `/boarding/`. Zie ook regel 2 in `MERKGROEP.md`:
  dit merk ordent op beroepsgroep en niveau, niet op iets anders.
- **Niet in schema.org.** `Course`, `FAQPage` en `Organization` beschrijven
  wat het is, niet hoe we het noemen.
- **Niet als vervanging van de niveaunamen.** Basis, gevorderd en expert
  blijven zo heten. Een inkoper moet ze in een opleidingsplan kunnen zetten.
- **Niet op de zwaarste beroepsgroeppagina's.** Uitvaart, justitiële
  jeugdinrichtingen, asielopvang, ambulance. Daar is luchtige beeldspraak
  een risico dat niets oplevert.

## 5. De botsing die opgelost moet worden

`BESLUITEN.md` legde vanochtend vast dat het niveaumodel **De
Weerbaarheidsladder** heet. Die naam staat inmiddels in `site.ts`,
`llms.txt`, op `/niveaus/` en in `MERKGROEP.md` hoofdstuk 3b.

Een ladder en een vlucht zijn twee beeldspraken. Ze kunnen naast elkaar,
maar niet allebei als ruggengraat. Er zijn drie uitwegen:

1. **De ladder blijft het model, de luchtvaart wordt de uitleg.** De niveaus
   heten wat ze heten; de luchtvaart legt uit *waarom* er drie zijn en
   waarom borging het hoogste niveau is. Minste schade, en de metafoor doet
   waar hij goed in is: uitleggen.
2. **De luchtvaart wordt het model, de ladder verdwijnt.** Consequenter, maar
   het draait een besluit van vandaag terug en `MERKGROEP.md` moet in drie
   repo's opnieuw aangepast.
3. **Twee lagen met eigen namen.** De Weerbaarheidsladder voor de niveaus,
   en een aparte naam voor het traject van één training. Werkt alleen als
   die twee elkaar nergens raken, en dat is in de praktijk lastig.

**Mijn advies is 1.** De luchtvaart is sterk als argument en zwak als
etiket. Op het moment dat "boarding" een productnaam wordt, is het een
gimmick; zolang het uitlegt waarom melden vóór het misgaat het verschil
maakt, is het autoriteit.

## 6. Wat er dan concreet komt

Vier dingen, in volgorde van waarde.

**a. Een blok "Wat de luchtvaart eerder oploste".**
Op `/aanpak/`, en verkort op de homepage. Vier vergelijkingen naast elkaar:
schuld → melding, alleen rampen → ook bijna-ongelukken, debrief bij
uitzondering → debrief als routine, hiërarchie → crew resource management.
Links de luchtvaart, rechts de werkvloer. Dit is het hart van het idee.

**b. De bijna-meting.**
Een klein instrument: "hoeveel bijna-incidenten had jouw team vorige maand?"
met drie antwoorden — geen idee / een paar / dat registreren we. Elk antwoord
leidt naar een ander niveau. Dit is geen quiz maar een diagnose, en het maakt
in tien seconden duidelijk dat er iets ontbreekt.

**c. Een checklist als echt hulpmiddel.**
Vijf tot zeven punten die je nagaat vóór een huisbezoek of een zwaar
gesprek. Afdrukbaar, want de printstijl staat al in `global.css`. Dit is het
enige onderdeel waarbij ik jouw inhoud nodig heb — een checklist die ik
verzin is waardeloos en gevaarlijk.

**d. De taal in de bestaande modellen.**
De spanningscurve krijgt "turbulentie" als tweede naam in de uitleg, de
meldcyclus krijgt de near-miss-stap erbij. Kleine ingrepen, geen nieuwe
onderdelen.

## 7. Wat ik van jou nodig heb

1. **De keuze uit hoofdstuk 5.** Zonder die knoop kan ik b, c en d niet
   schrijven zonder het risico dat we het terug moeten draaien.
2. **De checklist.** Wat gaan jullie werkelijk na vóór een risicovol
   gesprek? Vijf punten is genoeg.
3. **Of jullie de luchtvaartvergelijking in de training zelf gebruiken.** Zo
   ja, dan mag hij veel steviger op de site staan, want dan is het geen
   marketinglaag maar een beschrijving van wat je doet. Zo nee, dan blijft
   het een uitlegmiddel en houd ik het bescheiden.

## 8. Waar het misgaat als we niet oppassen

- **Het wordt een thema in plaats van een argument.** Zodra er een vliegtuig
  in de hero staat en de knoppen "instappen" heten, is het een campagne en
  geen positionering. De toets: kun je elke luchtvaartterm vervangen door
  gewone taal zonder dat de zin onwaar wordt? Zo ja, dan is het decoratie.
- **Het botst met de doelgroep.** Iemand die net een incident heeft gehad,
  zoekt geen beeldspraak. De metafoor hoort thuis waar iemand aan het
  oriënteren is, niet waar iemand in nood contact zoekt.
- **Het kost vindbaarheid.** Elke keer dat een luchtvaartterm een zoekterm
  vervangt, verliest de site een pagina die gevonden kon worden. Daarom
  hoofdstuk 4.
- **Het is niet van jullie.** De vergelijking met de luchtvaart wordt vaker
  gemaakt, ook in veiligheidskunde. Het onderscheidende zit niet in de
  vergelijking maar in de doorvertaling naar één beroepsgroep tegelijk — en
  dat kan dit merk als enige.
