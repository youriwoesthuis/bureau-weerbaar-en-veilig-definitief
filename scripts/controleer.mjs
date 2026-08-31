#!/usr/bin/env node
/**
 * Controleert de gebouwde site in dist/.
 *
 * Vier onderdelen, in één script omdat ze allemaal dezelfde HTML inlezen:
 *   1. Harde fouten  — gebroken interne links, ontbrekende pagina's
 *   2. Metadata      — titel- en descriptionlengte, uniciteit, canonicals, koppen
 *   3. Schema.org    — verplichte velden, verwijzingen zonder doel
 *   4. GEO           — losknipbaar openingsantwoord per pagina
 *
 * Een FOUT laat het script met code 1 eindigen. Een WAARSCHUWING niet:
 * die is bewust toegestaan maar moet wel zichtbaar blijven.
 *
 * Draaien:  node scripts/controleer.mjs
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

/**
 * Op GitHub Pages staat de site in een submap, en dan beginnen alle links
 * met dat pad terwijl de bestanden in dist/ dat pad niet hebben. Zonder
 * deze correctie meldt het script alle 207 pagina's als gebroken.
 */
const BASIS = (process.env.PUBLIC_BASE_PATH ?? '/').replace(/\/+$/, '');
const zonderBasis = (pad) =>
  BASIS && pad.startsWith(BASIS + '/') ? pad.slice(BASIS.length) : pad;

const fouten = [];
const waarschuwingen = [];
const fout = (pagina, tekst) => fouten.push({ pagina, tekst });
const waarschuw = (pagina, tekst) => waarschuwingen.push({ pagina, tekst });

/* ---------- HTML-bestanden verzamelen ---------------------------------- */
async function verzamel(map) {
  const items = await readdir(map, { withFileTypes: true });
  const uit = [];
  for (const item of items) {
    const pad = join(map, item.name);
    if (item.isDirectory()) uit.push(...(await verzamel(pad)));
    else if (item.name.endsWith('.html')) uit.push(pad);
  }
  return uit;
}

const bestandNaarUrl = (bestand) => {
  const rel = relative(DIST, bestand).split(sep).join('/');
  return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
};

/* ---------- Kleine HTML-hulpjes (geen parser nodig) -------------------- */
const pak = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};
const alle = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

const ontsnapt = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

const striptTags = (s) => ontsnapt(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

/* ---------- Hoofdroutine ------------------------------------------------ */
const bestanden = await verzamel(DIST);
const paginas = new Map();

for (const bestand of bestanden) {
  const html = await readFile(bestand, 'utf8');
  paginas.set(bestandNaarUrl(bestand), { html, bestand });
}

const bestaandeUrls = new Set(paginas.keys());
const titels = new Map();
const descriptions = new Map();

for (const [url, { html }] of paginas) {
  /* --- 2. Metadata ---
     Entiteiten eerst terugvertalen: "&amp;" is in de zoekresultaten één
     teken, niet vijf. Zonder dit meet het script structureel te lang. */
  const titel = pak(html, /<title>([^<]*)<\/title>/i);
  const titelTekst = titel ? ontsnapt(titel) : null;
  const desc = pak(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const descTekst = desc ? ontsnapt(desc) : null;
  const canonical = pak(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);

  if (!titel) fout(url, 'geen <title>');
  if (!desc) fout(url, 'geen meta description');
  if (!canonical && !noindex) fout(url, 'geen canonical');

  if (titelTekst) {
    // De merknaam staat sinds 31-08-2026 altijd achteraan; Google kapt die
    // netjes af. We meten dus de kern vóór " | ".
    const kern = titelTekst.split(' | ')[0];
    if (kern.length > 60) {
      waarschuw(url, `titelkern ${kern.length} tekens (streef ≤60): "${kern}"`);
    }
    if (!noindex) {
      if (titels.has(titelTekst)) fout(url, `titel is niet uniek, ook op ${titels.get(titelTekst)}`);
      else titels.set(titelTekst, url);
    }
  }

  if (descTekst) {
    if (descTekst.length > 160) waarschuw(url, `description ${descTekst.length} tekens (streef ≤160)`);
    if (descTekst.length < 60) waarschuw(url, `description maar ${descTekst.length} tekens`);
    if (!noindex) {
      if (descriptions.has(descTekst)) {
        fout(url, `description is niet uniek, ook op ${descriptions.get(descTekst)}`);
      } else descriptions.set(descTekst, url);
    }
  }

  /* Kopstructuur: precies één h1, geen niveau overgeslagen */
  const h1s = alle(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (h1s.length === 0) fout(url, 'geen <h1>');
  if (h1s.length > 1) fout(url, `${h1s.length} keer <h1>`);

  const koppen = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < koppen.length; i++) {
    if (koppen[i] - koppen[i - 1] > 1) {
      waarschuw(url, `kopniveau overgeslagen: h${koppen[i - 1]} → h${koppen[i]}`);
      break;
    }
  }

  /* --- 1. Interne links --- */
  for (const href of alle(html, /<a\s[^>]*href="([^"#?]+)"/gi)) {
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    let doel = zonderBasis(href.startsWith('/') ? href : '/' + href);
    if (!doel.endsWith('/') && !/\.[a-z0-9]{2,5}$/i.test(doel)) doel += '/';
    if (/\.(txt|xml|svg|png|jpg|webp|ico|pdf)$/i.test(doel)) continue;
    if (!bestaandeUrls.has(doel)) fout(url, `gebroken link naar ${href}`);
  }

  /* --- 3. Schema.org --- */
  const blokken = alle(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  if (blokken.length === 0 && !noindex) fout(url, 'geen schema.org-blok');

  for (const blok of blokken) {
    let data;
    try {
      data = JSON.parse(ontsnapt(blok));
    } catch (e) {
      fout(url, `schema.org is geen geldige JSON: ${e.message}`);
      continue;
    }

    const graaf = data['@graph'] ?? [data];
    const ids = new Set(graaf.map((n) => n['@id']).filter(Boolean));
    const verwijzingen = [];

    const zoekRefs = (node) => {
      if (Array.isArray(node)) return node.forEach(zoekRefs);
      if (!node || typeof node !== 'object') return;
      const sleutels = Object.keys(node);
      if (sleutels.length === 1 && sleutels[0] === '@id') verwijzingen.push(node['@id']);
      else for (const k of sleutels) if (k !== '@id') zoekRefs(node[k]);
    };
    zoekRefs(graaf);

    for (const ref of verwijzingen) {
      if (!ids.has(ref)) fout(url, `schema verwijst naar @id "${ref}" dat nergens is gedefinieerd`);
    }

    for (const node of graaf) {
      const types = [].concat(node['@type'] ?? []);
      if (types.includes('Course')) {
        for (const veld of ['name', 'description', 'provider', 'teaches']) {
          if (!node[veld]) fout(url, `Course mist verplicht veld "${veld}"`);
        }
        if (Array.isArray(node.teaches) && node.teaches.length === 0) {
          fout(url, 'Course heeft een lege lijst bij "teaches"');
        }
      }
      if (types.includes('FAQPage')) {
        const vragen = node.mainEntity ?? [];
        if (!vragen.length) fout(url, 'FAQPage zonder vragen');
        for (const v of vragen) {
          if (!v.acceptedAnswer?.text) fout(url, `FAQ-vraag zonder antwoord: "${v.name}"`);
        }
      }
      if (types.includes('BreadcrumbList')) {
        const items = node.itemListElement ?? [];
        items.forEach((it, i) => {
          if (it.position !== i + 1) fout(url, 'BreadcrumbList telt niet netjes door');
        });
      }
    }
  }

  /* --- 4. GEO: losknipbaar openingsantwoord --- */
  if (!noindex) {
    const antwoord = pak(html, /<p class="openingsantwoord[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    if (!antwoord) {
      waarschuw(url, 'geen openingsantwoord (.openingsantwoord) gevonden');
    } else {
      const tekst = striptTags(antwoord);
      const zinnen = tekst.split(/(?<=[.!?])\s+/).filter(Boolean);
      if (tekst.length < 90) waarschuw(url, `openingsantwoord kort (${tekst.length} tekens)`);
      if (zinnen.length < 2) waarschuw(url, 'openingsantwoord is één zin — moeilijk los te citeren');
      if (/^(wij|we|ons|onze|hier)\b/i.test(tekst)) {
        waarschuw(url, 'openingsantwoord begint met "wij/we/ons" in plaats van de entiteitsnaam');
      }
    }
  }
}

/* ---------- Verslag ----------------------------------------------------- */
const groepeer = (lijst) => {
  const per = new Map();
  for (const { pagina, tekst } of lijst) {
    if (!per.has(pagina)) per.set(pagina, []);
    per.get(pagina).push(tekst);
  }
  return per;
};

console.log(`\nGecontroleerd: ${paginas.size} pagina's in dist/\n`);

if (waarschuwingen.length) {
  console.log(`WAARSCHUWINGEN (${waarschuwingen.length}) — toegestaan, maar kijk ernaar:`);
  for (const [pagina, regels] of groepeer(waarschuwingen)) {
    console.log(`  ${pagina}`);
    for (const r of regels) console.log(`    · ${r}`);
  }
  console.log('');
}

if (fouten.length) {
  console.log(`FOUTEN (${fouten.length}) — deze moeten weg:`);
  for (const [pagina, regels] of groepeer(fouten)) {
    console.log(`  ${pagina}`);
    for (const r of regels) console.log(`    ✗ ${r}`);
  }
  console.log('');
  process.exit(1);
}

console.log('Geen fouten gevonden.\n');
