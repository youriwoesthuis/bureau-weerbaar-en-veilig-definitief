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

/** Vaste feiten over het aanbod. Geen aannames — deze staan zo in de content. */
export const FEITEN = {
  duur: '1 dag',
  groepsgrootte: 'maximaal 10 deelnemers',
  groepsgrootteExpert: 'maximaal 8 deelnemers',
  certificaat: 'deelnamecertificaat',
  locatie: 'incompany, op eigen locatie of in Neede',
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
