// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
      filter: (page) => !page.includes('/bedankt/') && !page.includes('/ontwerpkeuze/'),
      changefreq: 'monthly',
    }),
  ],
  // Bewust geen lightningcss: die kan moderne CSS omzetten naar oudere
  // syntax, en juist :has(), @property en animation-timeline moeten
  // ongemoeid blijven — daar draait alle interactie op.
});
