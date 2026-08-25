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

  const [trainingen, beroepsgroepen, sectoren] = await Promise.all([
    getCollection('trainingen'),
    getCollection('beroepsgroepen'),
    getCollection('sectoren'),
  ]);

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
