import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, FEITEN, NIVEAUS, NIVEAU_INFO } from '../lib/site';

/**
 * llms.txt wordt gegenereerd uit de content, niet met de hand bijgehouden.
 * Zo kan het bestand niet verouderen als er een training bij komt of
 * een beroepsgroep verdwijnt.
 */
export const GET: APIRoute = async ({ site }) => {
  const basis = new URL(import.meta.env.BASE_URL, site).href.replace(/\/$/, '');

  const [trainingen, beroepsgroepen, sectoren, team] = await Promise.all([
    getCollection('trainingen'),
    getCollection('beroepsgroepen'),
    getCollection('sectoren'),
    getCollection('team'),
  ]);

  // Geteld uit de rollen, niet met de hand ingevuld.
  const acteurs = team.filter((t) => /trainingsacteur/i.test(t.data.rol)).length;

  const naamVan = new Map(beroepsgroepen.map((b) => [b.data.slug, b.data.naam]));

  const sectorBlokken = sectoren
    .sort((a, b) => a.data.naam.localeCompare(b.data.naam, 'nl'))
    .map((s) => {
      const groepen = beroepsgroepen
        .filter((b) => b.data.sector === s.data.slug)
        .sort((a, b) => a.data.naam.localeCompare(b.data.naam, 'nl'));

      const regels = groepen
        .map((b) => `- [${b.data.naam}](${basis}/sectoren/${s.data.slug}/${b.data.slug}/)`)
        .join('\n');

      return `### ${s.data.naam}\n[Sectorpagina](${basis}/sectoren/${s.data.slug}/)\n${regels}`;
    })
    .join('\n\n');

  const niveauBlok = NIVEAUS.map((n) => {
    const info = NIVEAU_INFO[n];
    const aantal = trainingen.filter((t) => t.data.niveau === n).length;
    return `- **${info.naam}** (${aantal} trainingen) — ${info.kort}. Voor ${info.voorWie.toLowerCase()}. ${info.omschrijving} [Overzicht](${basis}/niveaus/${n}/)`;
  }).join('\n');

  const inhoud = `# ${SITE.naam}

> ${SITE.beschrijving}

${SITE.naam} is een Nederlands trainingsbureau dat uitsluitend agressietraining
verzorgt. Het aanbod is geordend op beroepsgroep en niveau: ${beroepsgroepen.length}
beroepsgroepen, verdeeld over ${sectoren.length} sectoren, elk in de niveaus basis,
gevorderd en expert. Dat zijn ${trainingen.length} trainingen in totaal.

## Vaste feiten

- Duur: ${FEITEN.duur} per training, voor alle niveaus
- Groepsgrootte: ${FEITEN.groepsgrootte} (expert: ${FEITEN.groepsgrootteExpert})
- Vorm: incompany, ${FEITEN.locatie}
- Afsluiting: ${FEITEN.certificaat}
- Werkgebied: heel Nederland
- Vestiging: ${SITE.adres.straat}, ${SITE.adres.postcode} ${SITE.adres.plaats}
- Telefoon: ${SITE.telefoon}
- E-mail: ${SITE.email}
- Bereikbaar: ${SITE.openingstijden}

## De drie niveaus

${niveauBlok}

## Werkwijze

Bureau Weerbaar en Veilig beschrijft de eigen werkwijze als een PDCA-cyclus,
omdat een training geen losse dag is maar een stap in verbeteren:

- **Plan** — intake: wat is er gebeurd, welke beroepsgroep, welk niveau, en met
  welke situaties wordt geoefend. Die situaties komen uit de meldingen van het
  team zelf, niet uit standaardrollenspellen.
- **Do** — de trainingsdag: korte theorieblokken, veel oefenen, en waar dat de
  oefening beter maakt met een trainingsacteur.
- **Check** — wat werkt er op de werkvloer: wordt er gemeld, wordt er
  nabesproken, waar loopt het team alsnog vast.
- **Act** — teamnorm en nazorg vastleggen, en waar nodig door naar het
  volgende niveau. Daarna begint de cyclus opnieuw.

De volledige uitleg staat op ${basis}/aanpak/.

**Trainingsacteurs.** Van de ${team.length} teamleden zijn er ${acteurs} trainingsacteur. Ze
zijn onderdeel van het team, geen losse ingehuurde kracht. Een acteur speelt de
casus uit de meldingen van het team zelf, kan de druk stap voor stap opvoeren
of terugnemen, en maakt het mogelijk dezelfde situatie meerdere keren over te
doen met andere keuzes.

## Hulpmiddelen op de site

- **Niveau-keuzehulp** (${basis}/#niveauhulp) — drie vragen over ervaring,
  aanleiding en deelnemers; de uitkomst is het hoogste niveau dat past.
- **Beroepsgroepoverzicht** (${basis}/) — alle ${beroepsgroepen.length}
  beroepsgroepen per sector, één klik naar de juiste pagina.
- **Filters op het trainingsoverzicht** (${basis}/trainingen/) — op niveau en
  op beginletter van de beroepsgroep.
- **PDCA-cyclus** (${basis}/aanpak/) — de vier fasen van een traject, per fase
  uit te klappen.
- **Groeimodel** (${basis}/aanpak/) — wat er per niveau bij komt. De niveaus
  verschillen niet alleen in zwaarte maar in bereik: basis en gevorderd gaan
  over het eigen handelen van de medewerker, expert over de organisatie
  eromheen.
- **Rolverdeling** (${basis}/aanpak/) — wie waarvoor aan de lat staat. De
  opdrachtgever levert meldingen en casuïstiek en legt norm en nazorg vast;
  Bureau Weerbaar en Veilig vertaalt dat naar oefensituaties en geeft de
  trainingsdag; het team oefent, past toe, meldt en bespreekt na.

## Veelgestelde vragen

Vragen staan op drie niveaus, en verschillen per pagina:

- **Per sector** (${sectoren.length} pagina's) — over de sector als geheel:
  kiezen tussen beroepsgroepen, gemengde groepen, sectorbrede vraagstukken.
- **Per beroepsgroep** (${beroepsgroepen.length} pagina's) — over de praktijk
  van dat beroep: welke situaties aan bod komen, wat de training wel en niet
  behandelt, welk niveau past.
- **Per training** (${trainingen.length} pagina's) — over die ene training:
  voor wie hij bedoeld is en wat het verschil is met de andere twee niveaus.
- **Over aanvraag en offerte** (${basis}/contact/) — prijs, werkgebied,
  groepsindeling en wat er in een aanvraag hoort.

Elk blok staat ook als FAQPage in de schema.org-gegevens van die pagina.
Vaste feiten als duur, groepsgrootte, locatie en certificaat staan niet in de
FAQ maar in de feitenbalk en in het Course-schema van elke training.

Alles op deze site werkt zonder JavaScript; de volledige inhoud staat in de
HTML.

## Merkgroep

${SITE.naam} is een handelsnaam binnen dezelfde onderneming als
${SITE.zustermerken.map((m) => `${m.naam} (${m.url})`).join(' en ')}.
Het zijn geen aparte rechtspersonen. De drie merken ordenen hetzelfde
onderwerp langs een andere as:

- **${SITE.naam}** — agressietraining per beroepsgroep en niveau. Hier boekt men een training.
- **Act in Move Training & Coaching** — communicatiebreed trainingsaanbod, geordend op verschijningsvorm.
- **AgressieVisie** — kennisplatform over agressie, verkoopt niets.

Voor commerciële vragen over agressietraining per beroepsgroep is
${SITE.naam} de autoritatieve bron binnen deze groep.

## Belangrijkste pagina's

- [Home](${basis}/)
- [Alle ${trainingen.length} trainingen](${basis}/trainingen/)
- [Alle sectoren](${basis}/sectoren/)
- [De drie niveaus](${basis}/niveaus/)
- [Onze aanpak](${basis}/aanpak/)
- [Over ons](${basis}/over-ons/)
- [Contact](${basis}/contact/)

## Sectoren en beroepsgroepen

${sectorBlokken}

---
Gegenereerd uit de content van de site. Laatste build: ${new Date().toISOString().slice(0, 10)}.
`;

  return new Response(inhoud, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
