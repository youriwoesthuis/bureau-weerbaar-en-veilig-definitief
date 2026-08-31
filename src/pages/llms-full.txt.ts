import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, FEITEN, NIVEAUS, NIVEAU_INFO, MODEL } from '../lib/site';

/**
 * llms-full.txt: de volledige sitecontext in één bestand, voor AI-systemen
 * die niet 219 pagina's willen kruipen maar wel het hele verhaal willen
 * meenemen (SEO/GEO-review 31-08-2026). Net als llms.txt volledig
 * gegenereerd uit de content, dus dit kan niet verouderen.
 */
export const GET: APIRoute = async ({ site }) => {
  const basis = new URL(import.meta.env.BASE_URL, site).href.replace(/\/$/, '');

  const [beroepsgroepen, sectoren, trainingen] = await Promise.all([
    getCollection('beroepsgroepen'),
    getCollection('sectoren'),
    getCollection('trainingen'),
  ]);

  const netjes = (s?: string) => (s ?? '').replace(/\r\n/g, '\n').trim();

  const sectorBlokken = sectoren
    .sort((a, b) => a.data.naam.localeCompare(b.data.naam, 'nl'))
    .map((s) => {
      const groepen = beroepsgroepen
        .filter((b) => b.data.sector === s.data.slug)
        .sort((a, b) => a.data.naam.localeCompare(b.data.naam, 'nl'));

      const groepBlokken = groepen
        .map((b) => {
          const eigen = trainingen.filter((t) => t.data.beroepsgroep === b.data.slug);
          const niveaus = NIVEAUS.map((n) => {
            const t = eigen.find((x) => x.data.niveau === n);
            return t ? `  - ${NIVEAU_INFO[n].naam}: ${netjes(t.data.samenvatting)} (${basis}/trainingen/${t.data.slug}/)` : '';
          }).filter(Boolean).join('\n');
          const vragen = (b.data.veelgestelde_vragen ?? [])
            .map((v) => `  - V: ${v.vraag}\n    A: ${v.antwoord}`)
            .join('\n');
          return `### ${b.data.naam}
${basis}/sectoren/${s.data.slug}/${b.data.slug}/

${netjes(b.data.samenvatting)}

${netjes(b.body)}

Trainingen:
${niveaus}
${vragen ? `\nVeelgestelde vragen:\n${vragen}` : ''}`;
        })
        .join('\n\n');

      return `## Sector: ${s.data.naam}
${basis}/sectoren/${s.data.slug}/

${netjes(s.data.samenvatting)}

${netjes(s.body)}

${groepBlokken}`;
    })
    .join('\n\n');

  const inhoud = `# ${SITE.naam}: volledige sitecontext

> ${SITE.beschrijving}

Beknopte versie: ${basis}/llms.txt

## Vaste feiten

- Duur: ${FEITEN.duur} per training, alle niveaus
- Groepsgrootte: ${FEITEN.groepsgrootte} (expert: ${FEITEN.groepsgrootteExpert})
- Vorm: ${FEITEN.locatie}, in heel Nederland (incompany)
- Trainingsacteur: standaard onderdeel van elke training, geen meerprijs
- Afsluiting: ${FEITEN.certificaat} (geen wettelijk erkend diploma)
- Prijsmodel: offerte op maat; bepalend zijn aantal groepen, niveau, reisafstand en omvang van het traject
- Vestiging: ${SITE.adres.straat}, ${SITE.adres.postcode} ${SITE.adres.plaats} (er wordt niet in ${SITE.adres.plaats} getraind)
- Contact: ${SITE.telefoon} · ${SITE.email} · ${SITE.openingstijden}

## ${MODEL.naamHoofdletter} (${MODEL.kort})

${NIVEAUS.map((n) => `- **${NIVEAU_INFO[n].naam}**: ${NIVEAU_INFO[n].kort}. Voor ${NIVEAU_INFO[n].voorWie.toLowerCase()}. ${NIVEAU_INFO[n].omschrijving}`).join('\n')}

De niveaus verschillen in bereik: basis en gevorderd gaan over het eigen
handelen van de medewerker, expert over de organisatie eromheen (teamnorm,
meldcultuur, nazorg, borging). Expert is een werksessie, geen oefendag.

## Werkwijze in het kort

Intake vooraf (wat is er gebeurd, wat ligt er al) → trainingsdag met korte
theorieblokken en vooral oefengesprekken met de trainingsacteur (stil te
zetten, bij te sturen en opnieuw te doen) → afsluiten met afspraken →
daarna is het aan de organisatie: melden, nabespreken, de norm vastleggen.
Volledige uitleg: ${basis}/aanpak/

${sectorBlokken}

---
Gegenereerd uit de content van de site.
`;

  return new Response(inhoud, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
