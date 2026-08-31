import { SITE, NIVEAU_INFO, type Niveau } from './site';

/**
 * Titels en descriptions worden hier gemaakt, nergens anders.
 *
 * Regel die botst met "onder de 60 tekens": uniciteit weegt zwaarder dan
 * lengte. Twee pagina's met dezelfde titel kosten meer vindbaarheid dan
 * een titel die in de zoekresultaten wordt afgekapt. Waar dat botst, wint
 * uniciteit en meldt het controlescript een waarschuwing in plaats van
 * een fout.
 */

/**
 * Lange beroepsgroepnamen inkorten zodat de titel binnen bereik blijft.
 * De sleutels moeten exact overeenkomen met `naam` in de content — een
 * sleutel die niet bestaat is stil en doet dus niets. Het controlescript
 * meldt te lange titels, dat is het vangnet.
 */
const AFKORTINGEN: Record<string, string> = {
  'Medewerkers asielzoekerscentra & COA-locaties': 'Medewerkers asielopvang',
  'Uitvaartmedewerkers & begrafenisondernemers': 'Uitvaartmedewerkers',
  // Niet inkorten tot "Sportaccommodaties": dat is de naam van de sector,
  // en dan krijgen de sectorpagina en deze pagina dezelfde titel.
  'Medewerkers sportaccommodaties & zwembaden': 'Medewerkers sportaccommodaties',
  'Horecabediening, gastheren & gastvrouwen': 'Horecabediening',
  'Dierenartsen & medewerkers dierklinieken': 'Dierenartsen',
  'Vergunningverlening & bezwaar en beroep': 'Vergunningverlening',
  'Medewerkers energie- & nutsbedrijven': 'Nutsbedrijven',
  'Kassamedewerkers & baliemedewerkers': 'Kassa- en baliemedewerkers',
  'Gedragsdeskundigen & orthopedagogen': 'Gedragsdeskundigen',
  'Parkeerwachters & toezichthouders': 'Parkeerwachters',
  'Sociale dienst & Participatiewet': 'Sociale dienst',
  'Begeleiders woonbegeleiding (VG)': 'Woonbegeleiding (VG)',
  'Bankmedewerkers & baliepersoneel': 'Bankmedewerkers',
  'Woonconsulenten & klantcontact': 'Woonconsulenten',
  'GGD & publieke gezondheidszorg': 'GGD-medewerkers',
  'Incasso & schuldhulpverlening': 'Schuldhulpverlening',
  'Hypotheek- & kredietadviseurs': 'Kredietadviseurs',
  'Gemeenteloket & publieksbalie': 'Gemeenteloket',
  'Filiaalmanagers & teamleiders': 'Filiaalmanagers',
  'Verpleeghuizen & ouderenzorg': 'Verpleeghuiszorg',
  'Treinpersoneel & conducteurs': 'Treinpersoneel',
  'Horecaportiers & uitsmijters': 'Horecaportiers',
  'Buurtbeheerders & opzichters': 'Buurtbeheerders',
  'Pakket- & maaltijdbezorgers': 'Maaltijdbezorgers',
  'Thuiszorg & wijkverpleging': 'Thuiszorg',
};

export const kortenaam = (naam: string) => AFKORTINGEN[naam] ?? naam;

const TITEL_ACHTERVOEGSEL = ` | ${SITE.naam}`;
const TITEL_MAX = 60;

/**
 * De merknaam achter de titel is 28 tekens. Op diepe pagina's — waar de
 * beroepsgroep zelf al de halve regel vult — past dat niet binnen de 60
 * tekens die Google toont, en dan valt juist het zoekwoord weg.
 *
 * Daarom: merknaam erbij als het past, anders niet. Google toont de
 * sitenaam sowieso apart boven het resultaat, en dit merk is nieuw genoeg
 * dat de naam in de titel nog geen klikken oplevert — het zoekwoord wel.
 * Uniciteit komt van de kern, niet van het achtervoegsel.
 */
export function paginaTitel(kern: string) {
  // Merknaam altijd erbij (SEO/GEO-review 31-08-2026): AI-systemen en Google
  // koppelen de dienst dan hard aan de entiteit. Wordt het geheel langer dan
  // 60 tekens, dan kapt Google het achtervoegsel af — de kern blijft heel.
  // controleer.mjs meet daarom de kern, niet het geheel.
  return `${kern}${TITEL_ACHTERVOEGSEL}`;
}

/** Titel van een trainingspagina: niveau vooraan houdt de drie niveaus
 *  van dezelfde beroepsgroep uit elkaar in de zoekresultaten. */
export function trainingTitel(beroepsgroepNaam: string, niveau: Niveau) {
  const kort = kortenaam(beroepsgroepNaam);
  // Dubbele punt in plaats van gedachtestreepje (verzoek Youri 31-08-2026):
  // streepjes als leesteken staan nergens meer op de site.
  return paginaTitel(`Agressietraining ${ontHoofdletter(kort)}: ${NIVEAU_INFO[niveau].naam}`);
}

/** Kleine letters, maar afkortingen blijven staan. Een kale toLowerCase maakte
 *  van "Persoonlijk begeleiders (VG)" de titel "persoonlijk begeleiders (vg)",
 *  op zeven pagina's. Woorden van twee letters of meer die volledig uit
 *  hoofdletters bestaan, blijven zoals ze zijn. */
function ontHoofdletter(tekst: string) {
  return tekst.replace(/[^\s()]+/g, (woord) =>
    /^[A-Z]{2,}$/.test(woord) ? woord : woord.toLowerCase(),
  );
}

/** Description afkappen op een woordgrens, nooit midden in een woord. */
export function description(tekst: string, max = 155) {
  const schoon = tekst.replace(/\s+/g, ' ').trim();
  if (schoon.length <= max) return schoon;
  const geknipt = schoon.slice(0, max - 1);
  const spatie = geknipt.lastIndexOf(' ');
  return `${geknipt.slice(0, spatie > 0 ? spatie : geknipt.length)}…`;
}

/* ------------------------------------------------------------------ */
/* Schema.org                                                          */
/* ------------------------------------------------------------------ */

/** Vaste @id's, zodat alle blokken naar dezelfde entiteit verwijzen
 *  in plaats van losse eilandjes te vormen. */
export const ids = (siteUrl: string) => ({
  organisatie: `${siteUrl}#organisatie`,
  website: `${siteUrl}#website`,
  plaats: `${siteUrl}#vestiging`,
});

export function organisatieSchema(siteUrl: string) {
  const id = ids(siteUrl);
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': id.organisatie,
    name: SITE.naam,
    description: SITE.beschrijving,
    url: siteUrl,
    telephone: SITE.telefoonUri,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.adres.straat,
      postalCode: SITE.adres.postcode,
      addressLocality: SITE.adres.plaats,
      addressRegion: SITE.adres.provincie,
      addressCountry: SITE.adres.land,
    },
    openingHoursSpecification: SITE.openingstijdenSchema.map((o) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: o.dagen,
      opens: o.van,
      closes: o.tot,
    })),
    // Handelsnamen onder dezelfde KvK-inschrijving — bewust sameAs
    // en geen parentOrganization. Zie MERKGROEP.md.
    sameAs: SITE.zustermerken.map((m) => m.url),
    areaServed: { '@type': 'Country', name: 'Nederland' },
    knowsAbout: [
      'agressietraining',
      'de-escalatie',
      'omgaan met agressie op de werkvloer',
      'grensoverschrijdend gedrag',
      'weerbaarheid',
    ],
  };
}

export function breadcrumbSchema(siteUrl: string, kruimels: { naam: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: kruimels.map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k.naam,
      item: new URL(k.url, siteUrl).href,
    })),
  };
}

/**
 * Een overzichtspagina is een lijst, en dat mag je zeggen. Zonder ItemList
 * ziet een zoekmachine /trainingen/ als losse tekst met veel links; met
 * ItemList als een geordende opsomming.
 *
 * Alleen de naam en de URL per item: een positie zonder inhoud is voor een
 * zoekmachine waardeloos, en meer velden zouden hier verzonnen zijn.
 */
export function lijstSchema(
  siteUrl: string,
  naam: string,
  items: { naam: string; url: string }[],
) {
  if (!items.length) return null;
  return {
    '@type': 'ItemList',
    name: naam,
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.naam,
      url: new URL(it.url, siteUrl).href,
    })),
  };
}

export function faqSchema(vragen: { vraag: string; antwoord: string }[]) {
  if (!vragen.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: vragen.map((v) => ({
      '@type': 'Question',
      name: v.vraag,
      acceptedAnswer: { '@type': 'Answer', text: v.antwoord },
    })),
  };
}
