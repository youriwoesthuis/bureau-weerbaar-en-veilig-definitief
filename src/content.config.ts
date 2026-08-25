import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Het veld `afbeelding` staat nog in de oude content maar er zijn geen
 *  bestanden. Het schema laat het toe en de templates negeren het, zodat
 *  er nergens een gebroken afbeelding kan ontstaan. */
const afbeelding = z.object({ src: z.string(), alt: z.string() }).optional();

const niveau = z.enum(['basis', 'gevorderd', 'expert']);

const trainingen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trainingen' }),
  schema: z.object({
    titel: z.string(),
    slug: z.string(),
    sector: z.string(),
    beroepsgroep: z.string(),
    niveau,
    duur: z.string(),
    groepsgrootte: z.string(),
    locatie: z.string(),
    locatie_detail: z.string().optional(),
    certificaat: z.string().optional(),
    doelgroep: z.string(),
    samenvatting: z.string(),
    resultaat: z.array(z.string()),
    programma: z.array(z.object({ titel: z.string(), inhoud: z.string() })),
    werkvormen: z.array(z.string()),
    veelgestelde_vragen: z.array(z.object({ vraag: z.string(), antwoord: z.string() })).default([]),
    gerelateerd: z.array(z.string()).default([]),
    afbeelding,
  }),
});

const beroepsgroepen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/beroepsgroepen' }),
  schema: z.object({
    naam: z.string(),
    slug: z.string(),
    sector: z.string(),
    samenvatting: z.string(),
    afbeelding,
  }),
});

const sectoren = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sectoren' }),
  schema: z.object({
    naam: z.string(),
    slug: z.string(),
    samenvatting: z.string(),
    afbeelding,
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    naam: z.string(),
    rol: z.string(),
    volgorde: z.number().default(99),
    foto: afbeelding,
    linkedin: z.string().url().optional(),
  }),
});

export const collections = { trainingen, beroepsgroepen, sectoren, team };
