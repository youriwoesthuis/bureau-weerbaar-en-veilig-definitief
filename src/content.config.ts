import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Alleen het team heeft echte fotobestanden. In trainingen, sectoren en
 *  beroepsgroepen stond een `afbeelding`-veld dat naar 120 bestanden wees die
 *  niet bestaan; geen enkele template gebruikte het. Die velden zijn uit de
 *  content gehaald en staan hier bewust niet meer in het schema, zodat ze niet
 *  stilletjes terug kunnen komen. Zie DESIGN.md hoofdstuk 1. */
const afbeelding = z.object({ src: z.string(), alt: z.string() }).optional();

/** Veelgestelde vragen bestaan op drie niveaus: per training, per
 *  beroepsgroep en per sector. Ze moeten per pagina verschillen — een
 *  gekopieerde FAQ maakt de pagina's inwisselbaar in plaats van vindbaar. */
const vragen = z.array(z.object({ vraag: z.string(), antwoord: z.string() })).default([]);

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
    /* Instapvoorwaarde (gevorderd/expert). Stond al in 88 bestanden maar
       niet in dit schema, waardoor Astro het veld wegliet en het nergens
       gebruikt kon worden. */
    voorwaarde: z.string().optional(),
    doelgroep: z.string(),
    samenvatting: z.string(),
    resultaat: z.array(z.string()),
    programma: z.array(z.object({ titel: z.string(), inhoud: z.string() })),
    werkvormen: z.array(z.string()),
    veelgestelde_vragen: vragen,
    gerelateerd: z.array(z.string()).default([]),
  }),
});

const beroepsgroepen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/beroepsgroepen' }),
  schema: z.object({
    naam: z.string(),
    slug: z.string(),
    sector: z.string(),
    samenvatting: z.string(),
    /* Eenregelige typering van wat agressie bij dit beroep bijzonder maakt.
       Staat op de sectorpagina achter de naam, zodat een bezoeker zijn eigen
       beroepsgroep herkent zonder door te klikken. Gedestilleerd uit de body,
       niet nieuw bedacht. */
    kern: z.string().optional(),
    veelgestelde_vragen: vragen,
  }),
});

const sectoren = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sectoren' }),
  schema: z.object({
    naam: z.string(),
    slug: z.string(),
    samenvatting: z.string(),
    veelgestelde_vragen: vragen,
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
