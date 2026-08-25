#!/usr/bin/env node
/**
 * Maakt de deelafbeeldingen (Open Graph) die getoond worden als iemand een
 * link deelt in WhatsApp, LinkedIn of Slack.
 *
 * Waarom een script en geen los plaatje: de vorige og-afbeelding kwam uit de
 * oude opzet, met een marineblauwe achtergrond en een ander lettertype. Wie
 * een link deelde, kreeg dus een voorproefje van een site die niet meer
 * bestond. Door hem te genereren blijft hij automatisch kloppen — ook de
 * aantallen, die uit de content worden geteld.
 *
 * Draaien:  node scripts/maak-og.mjs
 * Alleen nodig als het ontwerp of de aantallen wijzigen; de PNG's staan in
 * de repo zodat een gewone build ze niet opnieuw hoeft te maken.
 *
 * Twee dingen die hier bijzonder zijn:
 * 1. Het lettertype staat als woff2 in public/, maar resvg leest dat formaat
 *    niet. scripts/fonts/manrope.ttf is de uitgepakte versie.
 * 2. resvg kan de gewichtsas van een variabel lettertype niet instellen,
 *    dus font-weight="800" doet niets. Vandaar de contourlijn in dezelfde
 *    kleur als de vulling: dat verdikt de letters en benadert vet.
 */

import { Resvg } from '@resvg/resvg-js';
import { decompress } from 'wawoff2';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const wortel = join(dirname(fileURLToPath(import.meta.url)), '..');
const lees = (p) => readFileSync(join(wortel, p));
const tel = (map) => readdirSync(join(wortel, 'src/content', map)).filter((f) => f.endsWith('.md')).length;

/**
 * Het lettertype staat als woff2 in public/, want dat is wat de browser
 * nodig heeft. resvg leest dat formaat niet, dus pakken we het hier uit.
 * De TTF staat niet in de repo (zie .gitignore): hij is afgeleid, en zo kan
 * hij niet uit de pas gaan lopen met de woff2.
 */
const FONT = join(wortel, 'scripts/fonts/manrope.ttf');
if (!existsSync(FONT)) {
  mkdirSync(dirname(FONT), { recursive: true });
  const ttf = await decompress(lees('public/fonts/manrope-latin.woff2'));
  writeFileSync(FONT, Buffer.from(ttf));
  console.log('  manrope.ttf uitgepakt uit de woff2');
}

const AANTAL = {
  trainingen: tel('trainingen'),
  beroepsgroepen: tel('beroepsgroepen'),
  sectoren: tel('sectoren'),
};

const logo64 = lees('public/images/logo/logo-origineel-wit.png').toString('base64');

const B = 1200;
const H = 630;

/** Tekst met contourlijn: resvg kan de gewichtsas niet zetten, dus zo. */
const tekst = (x, y, inhoud, { grootte = 40, kleur = '#f4f4f6', vet = 2 } = {}) =>
  `<text x="${x}" y="${y}" font-family="Manrope" font-size="${grootte}" fill="${kleur}"` +
  (vet ? ` stroke="${kleur}" stroke-width="${vet}"` : '') +
  ` xml:space="preserve">${inhoud}</text>`;

/** De drie treden, met eventueel één opgelicht. */
const treden = (actief) => {
  const rijen = [
    { niveau: 'basis', x: 830, y: 350, h: 150, kleur: '#e87e12' },
    { niveau: 'gevorderd', x: 940, y: 280, h: 220, kleur: '#a97e93' },
    { niveau: 'expert', x: 1050, y: 195, h: 305, kleur: '#5f74c9' },
  ];
  return rijen
    .map((r) => {
      const aan = !actief || r.niveau === actief;
      return `<rect x="${r.x}" y="${r.y}" width="86" height="${r.h}" rx="16" fill="${r.kleur}" opacity="${aan ? 1 : 0.28}"/>`;
    })
    .join('');
};

function bouw({ kop1, kop2, onderschrift, accent, actiefNiveau }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${B}" height="${H}" viewBox="0 0 ${B} ${H}">
  <defs>
    <radialGradient id="gloed" cx="0.72" cy="0.22" r="0.6">
      <stop offset="0%" stop-color="#f18816" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#f18816" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="balk" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f28915"/>
      <stop offset="33%" stop-color="#ec8723"/>
      <stop offset="67%" stop-color="#a2666a"/>
      <stop offset="100%" stop-color="#4f4a8a"/>
    </linearGradient>
  </defs>

  <rect width="${B}" height="${H}" fill="#17171c"/>
  <rect width="${B}" height="${H}" fill="url(#gloed)"/>

  ${treden(actiefNiveau)}

  <image href="data:image/png;base64,${logo64}" x="80" y="78" width="420" height="82"/>

  ${tekst(80, 300, kop1, { grootte: 62, vet: 3 })}
  ${tekst(80, 378, kop2, { grootte: 62, kleur: accent, vet: 3 })}
  ${tekst(80, 452, onderschrift, { grootte: 26, kleur: '#c3c3cc', vet: 0.9 })}

  <rect x="0" y="${H - 10}" width="${B}" height="10" fill="url(#balk)"/>
</svg>`;
}

const getallen = `${AANTAL.trainingen} trainingen  ·  ${AANTAL.beroepsgroepen} beroepsgroepen  ·  ${AANTAL.sectoren} sectoren`;

const VARIANTEN = [
  {
    bestand: 'og-afbeelding.png',
    kop1: 'Agressietraining voor',
    kop2: 'uw beroepsgroep',
    onderschrift: getallen,
    accent: '#f6a03a',
    actiefNiveau: null,
  },
  {
    bestand: 'og-basis.png',
    kop1: 'Agressietraining',
    kop2: 'niveau basis',
    onderschrift: 'Herkennen en de-escaleren  ·  1 dag  ·  max. 10 deelnemers',
    accent: '#f6a03a',
    actiefNiveau: 'basis',
  },
  {
    bestand: 'og-gevorderd.png',
    kop1: 'Agressietraining',
    kop2: 'niveau gevorderd',
    onderschrift: 'Grenzen stellen onder druk  ·  1 dag  ·  max. 10 deelnemers',
    accent: '#c49bb0',
    actiefNiveau: 'gevorderd',
  },
  {
    bestand: 'og-expert.png',
    kop1: 'Agressietraining',
    kop2: 'niveau expert',
    onderschrift: 'Beleid, teamnorm en borging  ·  1 dag  ·  max. 8 deelnemers',
    accent: '#8fa2e6',
    actiefNiveau: 'expert',
  },
];

for (const v of VARIANTEN) {
  const svg = bouw(v);
  const png = new Resvg(svg, {
    font: { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: 'Manrope' },
    fitTo: { mode: 'width', value: B },
  })
    .render()
    .asPng();
  writeFileSync(join(wortel, 'public', v.bestand), png);
  console.log(`  ${v.bestand}  ${(png.length / 1024).toFixed(0)} kB`);
}

console.log(`\nKlaar. Aantallen uit de content: ${getallen.replace(/\s+/g, ' ')}`);
