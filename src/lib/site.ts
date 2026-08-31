/**
 * Eén bron van waarheid voor alle vaste gegevens.
 * Wijzig hier, niet in de pagina's — het adres staat ook in het
 * LocalBusiness-schema en moet tot op de spatie gelijk blijven aan
 * het Google Bedrijfsprofiel.
 */

export const SITE = {
  naam: 'Bureau Weerbaar en Veilig',
  domein: 'bureauweerbaarenveilig.nl',
  slogan: 'De specialist in agressietraining',
  beschrijving:
    'Bureau Weerbaar en Veilig verzorgt agressietraining per beroepsgroep, in drie niveaus. Eén onderwerp, tot in de diepte.',

  telefoon: '085 760 0435',
  telefoonUri: '+31857600435',
  email: 'info@bureauweerbaarenveilig.nl',

  adres: {
    straat: 'Russchemorsweg 5-04',
    postcode: '7161 RT',
    plaats: 'Neede',
    provincie: 'Gelderland',
    land: 'NL',
  },

  openingstijden: 'maandag t/m vrijdag van 08:30 tot 17:00',
  openingstijdenSchema: [
    { dagen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], van: '08:30', tot: '17:00' },
  ],

  // Zustermerken onder dezelfde KvK-inschrijving. Zie MERKGROEP.md.
  zustermerken: [
    { naam: 'Act in Move Training & Coaching', url: 'https://actinmove.nl' },
    { naam: 'AgressieVisie', url: 'https://agressievisie.nl' },
  ],
} as const;

/**
 * Vaste feiten over het aanbod. Bevestigd door de opdrachtgever op 25-08-2026;
 * zie BESLUITEN.md hoofdstuk 3. Wijzig hier, nooit in een pagina.
 */
export const FEITEN = {
  duur: '1 dag',
  groepsgrootte: 'maximaal 10 deelnemers',
  groepsgrootteExpert: 'maximaal 8 deelnemers',
  certificaat: 'deelnamecertificaat',
  /** Altijd incompany. De variant "of bij ons in Neede" klopte niet. */
  locatie: 'altijd bij jullie op locatie',
  /** Standaard onderdeel, geen meerprijs en geen "waar dat nuttig is". */
  acteur: 'een trainingsacteur speelt mee',
} as const;

/**
 * Wat er wél kan maar niet standaard in de training zit. Als toezegging
 * mag dit nergens staan — het is een mogelijkheid, geen belofte.
 */
export const OP_VERZOEK = [
  {
    naam: 'Intervisie na afloop',
    tekst:
      'Een terugkombijeenkomst enkele weken later, om na te gaan wat er in de praktijk van terechtkomt.',
  },
  {
    naam: 'Fysieke technieken',
    tekst:
      'Losmaken en veilig afstand nemen. Geen standaardonderdeel: in de intake bespreken we of het bij jullie werk past.',
  },
] as const;

/** Wat de prijs bepaalt. Bedragen staan bewust nergens op de site. */
export const PRIJSFACTOREN = [
  'Het aantal groepen: de groep telt maximaal tien deelnemers, dus een groter team wordt verdeeld',
  'Het niveau: bij expert is de groep kleiner en de voorbereiding zwaarder',
  'De reisafstand: elke training is incompany, dus we komen naar jullie toe',
  'De omvang van het traject: één dag of een reeks over meerdere teams',
] as const;

/**
 * Sectorkaders: de afspraken, normen en wettelijke plichten die per sector
 * gelden bovenop de Arbowet. Geen van de negen onderzochte concurrenten noemt
 * ze (CONCURRENTIE.md hoofdstuk 2), terwijl dit precies de taal is waarmee een
 * preventiemedewerker intern budget vrijmaakt.
 *
 * Alle regels hieronder zijn op 31-08-2026 nagetrokken bij de bron. Twee dingen
 * om in de gaten te houden bij een volgende ronde:
 * - het OV-convenant liep tot 2025 en de opvolger was toen nog niet getekend;
 * - de zorgplicht in het onderwijs gaat over leerlingen, niet over personeel.
 * Een sector zonder kader krijgt geen blok. Liever niets dan iets bedachts.
 */
export const SECTORKADERS: Record<
  string,
  { kop: string; tekst: string; bronnen: { naam: string; url: string }[] }
> = {
  zorg: {
    kop: 'Wat er in de zorg bovenop de Arbowet geldt',
    tekst:
      'Elke zorgaanbieder moet een schriftelijke interne procedure hebben voor het omgaan met signalen van incidenten: artikel 9 van de Wet kwaliteit, klachten en geschillen zorg, in de praktijk het VIM. Let op het onderscheid: die procedure gaat over de veiligheid van de zorg zelf. Agressie tégen medewerkers valt onder psychosociale arbeidsbelasting in de Arbowet, en vraagt dus een eigen registratie en eigen maatregelen. Voor ziekenhuizen en UMC’s bestaat daarnaast Veiligezorg®, een methodische aanpak in zeven fasen; die is vrijwillig, geen keurmerk en geen wettelijke plicht.',
    bronnen: [
      { naam: 'Wkkgz artikel 9', url: 'https://wetten.overheid.nl/BWBR0037173#Paragraaf3_Artikel9' },
      { naam: 'Veiligezorg® (StAZ)', url: 'https://www.staz.nl/onderwerpen/veiligezorg/' },
    ],
  },
  farmacie: {
    kop: 'Wat er in de farmacie bovenop de Arbowet geldt',
    tekst:
      'Een apotheek is een zorgaanbieder en valt daarmee onder de Wet kwaliteit, klachten en geschillen zorg: er moet een schriftelijke interne procedure zijn voor het omgaan met signalen van incidenten. Die gaat over de veiligheid van de zorg. Agressie aan de balie raakt daar wel aan, maar hoort thuis in de RI&E en het plan van aanpak, als psychosociale arbeidsbelasting.',
    bronnen: [
      { naam: 'Wkkgz artikel 9', url: 'https://wetten.overheid.nl/BWBR0037173#Paragraaf3_Artikel9' },
    ],
  },
  'overheid-handhaving': {
    kop: 'Wat er bij de overheid bovenop de Arbowet geldt',
    tekst:
      'Voor gemeentelijke organisaties is er een arbocatalogus met een eigen onderdeel agressie en geweld, positief getoetst door de Nederlandse Arbeidsinspectie. Voor het Rijk bestaat een vergelijkbare catalogus, in december 2022 positief getoetst en geldig tot december 2028. Daarnaast is er de collectieve norm Stop Agressie Samen van het ministerie van BZK: nee zeggen tegen agressie, altijd melden, en als werkgever zorgen voor een veilige werkomgeving. Dat is een gezamenlijke afspraak, geen wet. Het oude programma Veilige Publieke Taak liep van 2006 tot 2016 en is opgegaan in de aanpak Veilige Publieke Dienstverlening.',
    bronnen: [
      { naam: 'Arbocatalogus gemeentelijke organisaties', url: 'https://www.aeno.nl/arbocatalogus/agressie-en-geweld/' },
      { naam: 'Arbocatalogus Rijk', url: 'https://www.aofondsrijk.nl/arbocatalogus-rijk/arbocatalogus-agressie-en-geweld/' },
      { naam: 'Norm Stop Agressie Samen', url: 'https://www.veiligepubliekedienstverlening.nl/preventie/stel-een-norm' },
    ],
  },
  onderwijs: {
    kop: 'Wat er in het onderwijs bovenop de Arbowet geldt',
    tekst:
      'Scholen hebben een wettelijke zorgplicht voor de veiligheid op school: beleid voeren, de veiligheidsbeleving monitoren met een representatief instrument, en de coördinatie van het anti-pestbeleid bij iemand beleggen. Belangrijk detail dat vaak wordt overgeslagen: die zorgplicht gaat uitsluitend over de sociale, psychische en fysieke veiligheid van leerlingen. Voor de veiligheid van het personeel (ouderagressie aan de balie, bedreiging via de mail, incidenten in de klas) geldt gewoon de Arbowet.',
    bronnen: [
      { naam: 'WPO artikel 4c', url: 'https://wetten.overheid.nl/BWBR0003420#Titeldeel1_AfdelingI_Paragraaf2_Artikel4c' },
      { naam: 'WVO 2020 artikel 3.40', url: 'https://wetten.overheid.nl/BWBR0044212' },
    ],
  },
  'openbaar-vervoer': {
    kop: 'Wat er in het openbaar vervoer bovenop de Arbowet geldt',
    tekst:
      'Het landelijk convenant Sociale Veiligheid in het OV liep van 2020 tot en met 2025. Aan een opvolger voor de periode daarna wordt gewerkt door het Rijk en de sector; die was in de zomer van 2026 nog niet ondertekend. Tot die er ligt, blijft de Arbowet het kader waar een vervoerder op wordt aangesproken: de risico’s in de RI&E, de maatregelen in het plan van aanpak, en voorlichting en onderricht aan het personeel dat het risico loopt.',
    bronnen: [
      { naam: 'Convenant Sociale Veiligheid in het OV 2020-2025', url: 'https://www.rijksoverheid.nl/documenten/convenanten/2020/07/09/bijlage-convenant-sociale-veiligheid-in-het-ov-2020-2025' },
    ],
  },
  welzijn: {
    kop: 'Wat er in het sociaal domein bovenop de Arbowet geldt',
    tekst:
      'Valt de organisatie onder de cao Jeugdzorg, dan is er meer dan de Arbowet. Die cao verplicht organisaties de Complete agressie-aanpak vast te leggen en in te voeren, of een vergelijkbare integrale methode op basis van vier pijlers: dienstverlening en veilig werken, risico’s en preventie, de-escaleren en veilig handelen, en afhandeling en nazorg. De cao zegt er in zoveel woorden bij dat beleid en uitvoering rond veilig werken niet vrijblijvend zijn. De verplichting gold vanaf 1 juli 2024; de cao voor 2026-2027 stelt de eis zonder datum.',
    bronnen: [
      { naam: 'Cao Jeugdzorg, veilig werken en agressie', url: 'https://www.jeugdzorg-werkt.nl/cao-jeugdzorg/veilig-werken-en-agressie' },
    ],
  },
};

/**
 * De negentien sectoren gegroepeerd in vijf domeinen, voor de
 * overzichtspagina. Negentien losse tegels onder elkaar lezen als een
 * telefoonboek; vijf domeinen maken de lijst scanbaar. Bewust geen groep
 * "overig": elke sector staat in een verdedigbare context, ook uitvaart en
 * dierenzorg (dienstverlening aan particulieren) en bibliotheken en
 * sportaccommodaties (publieke voorzieningen). Zie BESLUITEN.md 7j.
 *
 * Elke sector hoort in precies een domein. Komt er een sector bij, dan hoort
 * hij hier ook bij, anders valt hij van de overzichtspagina.
 */
export const SECTORDOMEINEN = [
  {
    naam: 'Zorg, welzijn en maatschappelijke dienstverlening',
    sectoren: ['zorg', 'welzijn', 'asielopvang', 'farmacie'],
  },
  {
    naam: 'Overheid, veiligheid en justitie',
    sectoren: ['overheid-handhaving', 'justitiele-keten', 'beveiliging'],
  },
  {
    naam: 'Onderwijs, cultuur en publieke voorzieningen',
    sectoren: ['onderwijs', 'bibliotheken', 'sportaccommodaties'],
  },
  {
    naam: 'Wonen, vervoer en nutsbedrijven',
    sectoren: ['woningcorporaties', 'openbaar-vervoer', 'transport', 'energie'],
  },
  {
    naam: 'Dienstverlening, handel en particuliere zorg',
    sectoren: ['retail', 'financiele-dienstverlening', 'horeca', 'uitvaart', 'dierenzorg'],
  },
] as const;

/**
 * Het niveaumodel heeft een naam, zodat het aanwijsbaar is in een offerte,
 * een opleidingsplan en een AI-antwoord. Zie BESLUITEN.md hoofdstuk 1.
 */
export const MODEL = {
  naam: 'de Weerbaarheidsladder',
  naamHoofdletter: 'De Weerbaarheidsladder',
  kort: 'herkennen, begrenzen, borgen',
} as const;

export const NIVEAUS = ['basis', 'gevorderd', 'expert'] as const;
export type Niveau = (typeof NIVEAUS)[number];

/**
 * De drie niveaus in woorden. Deze strings staan op honderden pagina's, in de
 * keuzehulp, in de vergelijkingstabel, in llms.txt en als description in het
 * Course-schema. Ze vallen daarom BUITEN de huisstijl van STIJL.md: geen
 * hedging (meestal, doorgaans), geen definitie-door-ontkenning, geen
 * beeldspraak en geen opener die terugpakt op een vorige zin. Elke zin moet
 * losstaand te citeren zijn en de vorm houden: wat je doet, waarvoor, met
 * welk resultaat. Zie STIJL.md hoofdstuk 4 (Gemini-overleg 31-08-2026).
 */
export const NIVEAU_INFO: Record<Niveau, {
  naam: string;
  kort: string;
  voorWie: string;
  omschrijving: string;
}> = {
  basis: {
    naam: 'Basis',
    kort: 'Herkennen en de-escaleren',
    voorWie: 'Iedereen die met agressie te maken kan krijgen',
    omschrijving:
      'Signalen lezen voordat het misgaat, de eigen reactie reguleren en het gesprek terugbrengen. De training waarmee een team begint.',
  },
  gevorderd: {
    naam: 'Gevorderd',
    kort: 'Grenzen stellen onder druk',
    voorWie: 'Wie de basis beheerst en structureel met zwaardere situaties werkt',
    omschrijving:
      'Complexe casuïstiek, begrenzen als de-escaleren niet meer werkt, en wat er na afloop moet gebeuren: melden en nazorg.',
  },
  expert: {
    naam: 'Expert',
    kort: 'Beleid, teamnorm en borging',
    voorWie: 'Leidinggevenden, coördinatoren en preventiemedewerkers',
    omschrijving:
      'Van incident naar beleid: de teamnorm vaststellen, nazorg inrichten, borgen dat het blijft werken en de eigen organisatie aanspreken.',
  },
};

/**
 * Een voorgevulde e-mail voor een aanvraag over een specifieke training.
 *
 * Zonder JavaScript kan de contactpagina niet weten waar iemand vandaan komt.
 * De context moet dus in de link zelf, en niet alleen in het onderwerp: wie het
 * onderwerp aanpast of wegknipt, mag de training niet kwijtraken.
 */
export const aanvraagMail = (onderwerp: string, training?: string) => {
  const regels = [
    'Beste Bureau Weerbaar en Veilig,',
    '',
    training ? `Wij overwegen deze training voor ons team: ${training}.` : 'Wij overwegen een training voor ons team.',
    '',
    'Onze situatie:',
    '',
    '(Bijvoorbeeld: om hoeveel mensen het gaat, wat er speelt, en wanneer het zou moeten.)',
    '',
    'Met vriendelijke groet,',
    '',
  ];
  return `mailto:${SITE.email}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(regels.join('\n'))}`;
};

/** Padhulp die rekening houdt met de base-URL van GitHub Pages. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const pad = (p: string) => `${BASE}/${p.replace(/^\//, '')}`.replace(/\/{2,}/g, '/');
