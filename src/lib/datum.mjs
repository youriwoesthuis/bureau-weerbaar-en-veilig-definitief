import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

/**
 * Wanneer is dit contentbestand voor het laatst écht gewijzigd?
 *
 * Waarom niet de bestandsdatum: bij een `git clone` op de bouwserver krijgen
 * alle bestanden de tijd van het uitchecken. Dan zou elke pagina claimen dat
 * hij vandaag is bijgewerkt, en dat is een vals actualiteitssignaal — erger
 * dan helemaal geen datum.
 *
 * Daarom de commitdatum uit git. Die wordt in één keer voor alle bestanden
 * opgehaald; 207 losse git-aanroepen zou de build merkbaar vertragen.
 *
 * Let op: dit werkt alleen met volledige geschiedenis. In
 * .github/workflows/deploy.yml staat daarom `fetch-depth: 0` — zonder dat
 * haalt de checkout maar één commit op en valt alles terug op de
 * bestandsdatum.
 */

let kaart = null;

function bouwKaart() {
  const m = new Map();
  try {
    const uitvoer = execFileSync(
      'git',
      ['log', '--pretty=format:%cI', '--name-only'],
      { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
    );
    let huidig = '';
    for (const regel of uitvoer.split('\n')) {
      const r = regel.trim();
      if (!r) continue;
      if (/^\d{4}-\d{2}-\d{2}T/.test(r)) {
        huidig = r;
      } else if (huidig && !m.has(r)) {
        // git log loopt van nieuw naar oud, dus de eerste treffer is de laatste wijziging
        m.set(r, huidig);
      }
    }
  } catch {
    // Geen git beschikbaar (bijvoorbeeld een zip-download): stil terugvallen.
  }
  return m;
}

/** ISO-datum van de laatste wijziging, of null als die niet te bepalen is. */
export function laatstGewijzigd(pad) {
  if (!kaart) kaart = bouwKaart();
  const uitGit = kaart.get(pad.replace(/\\/g, '/'));
  if (uitGit) return uitGit;
  try {
    return statSync(pad).mtime.toISOString();
  } catch {
    return null;
  }
}
