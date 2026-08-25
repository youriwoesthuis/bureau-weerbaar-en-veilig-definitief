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

  openingstijden: 'maandag t/m vrijdag 08:30–17:00',
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
      'Losmaken en veilig afstand nemen. Geen standaardonderdeel; in de intake bespreken we of het bij jullie werk past.',
  },
] as const;

/** Wat de prijs bepaalt. Bedragen staan bewust nergens op de site. */
export const PRIJSFACTOREN = [
  'Het aantal groepen — de groep telt maximaal tien deelnemers, dus een groter team wordt verdeeld',
  'Het niveau — bij expert is de groep kleiner en de voorbereiding zwaarder',
  'De reisafstand naar jullie locatie',
  'De omvang van het traject — één dag of een reeks over meerdere teams',
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

/** Padhulp die rekening houdt met de base-URL van GitHub Pages. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const pad = (p: string) => `${BASE}/${p.replace(/^\//, '')}`.replace(/\/{2,}/g, '/');
