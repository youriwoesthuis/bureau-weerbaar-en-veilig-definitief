// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { laatstGewijzigd } from './src/lib/datum.mjs';

/**
 * Welk bronbestand hoort bij welke URL? Nodig voor lastmod in de sitemap:
 * een zoekmachine hoeft dan niet alle 207 pagina's opnieuw te kruipen om te
 * ontdekken dat er drie zijn veranderd.
 *
 * De datum komt uit de laatste commit op dat bestand, niet uit de
 * bestandsdatum — die is op de bouwserver het moment van uitchecken.
 */
function bronVoor(pad) {
  const p = pad.replace(/^\/|\/$/g, '');
  const training = p.match(/^trainingen\/(.+)$/);
  if (training) return `src/content/trainingen/${training[1]}.md`;
  const groep = p.match(/^sectoren\/[^/]+\/(.+)$/);
  if (groep) return `src/content/beroepsgroepen/${groep[1]}.md`;
  const lid = p.match(/^team\/(.+)$/);
  if (lid) return `src/content/team/${lid[1]}.md`;
  const sector = p.match(/^sectoren\/([^/]+)$/);
  if (sector) return `src/content/sectoren/${sector[1]}.md`;
  if (p === 'trainingen') return 'src/pages/trainingen/index.astro';
  if (p === 'sectoren') return 'src/pages/sectoren/index.astro';
  if (p === 'niveaus') return 'src/pages/niveaus/index.astro';
  if (p.startsWith('niveaus/')) return 'src/pages/niveaus/[niveau].astro';
  if (p === '') return 'src/pages/index.astro';
  return `src/pages/${p}.astro`;
}

// Zolang de site op GitHub Pages staat, zetten de twee omgevingsvariabelen
// hieronder de juiste basis-URL. Bij verhuizing naar het eigen domein:
// PUBLIC_SITE_URL wordt https://bureauweerbaarenveilig.nl en PUBLIC_BASE_PATH vervalt.
const site = process.env.PUBLIC_SITE_URL ?? 'https://bureauweerbaarenveilig.nl';
const base = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/bedankt/'),
      changefreq: 'monthly',
      serialize(item) {
        const pad = new URL(item.url).pathname.replace(base.replace(/\/$/, ''), '');
        const datum = laatstGewijzigd(bronVoor(pad));
        if (datum) item.lastmod = datum;
        return item;
      },
    }),
  ],
  // Bewust geen lightningcss: die kan moderne CSS omzetten naar oudere
  // syntax, en juist :has(), @property en animation-timeline moeten
  // ongemoeid blijven — daar draait alle interactie op.
});
