/**
 * Stijlcontrole op de content, naast `controleer.mjs` die de gebouwde site
 * nakijkt. Dit script leest de bronbestanden en bewaakt de regels uit STIJL.md
 * die een herschrijfronde het makkelijkst breekt.
 *
 * Aanleiding: de herschrijving van 31-08-2026, waarbij 191 contentbestanden in
 * een keer door zes agents zijn herschreven. Een steekproef is dan niet genoeg;
 * dit script kijkt naar alles.
 *
 * Fouten laten het script falen, waarschuwingen niet.
 */
import fs from 'node:fs';
import path from 'node:path';

const wortel = path.resolve(process.argv[2] ?? 'src/content');
let fouten = 0;
let waarschuwingen = 0;

const meld = (soort, bestand, tekst) => {
  const teken = soort === 'fout' ? '  ✗' : '  !';
  console.log(`${teken} ${bestand}: ${tekst}`);
  soort === 'fout' ? fouten++ : waarschuwingen++;
};

/** De vaste feiten. Elk ander getal in een bewering over de training is
 *  verdacht, want er ligt niets anders vast. */
const TOEGESTANE_GETALLEN = new Set(['1', '3', '8', '10', '2.15', '5', '13', '25']);

const bestanden = [];
(function loop(map) {
  for (const item of fs.readdirSync(map, { withFileTypes: true })) {
    const p = path.join(map, item.name);
    if (item.isDirectory()) loop(p);
    else if (item.name.endsWith('.md')) bestanden.push(p);
  }
})(wortel);

for (const p of bestanden) {
  const kort = path.relative(process.cwd(), p).replace(/\\/g, '/');
  const ruw = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const delen = ruw.split(/^---$/m);
  const front = delen[1] ?? '';
  const body = delen.slice(2).join('---');

  // 1. Gedachtestreepjes en uitroeptekens: nooit, nergens.
  const streepjes = (ruw.match(/[—–]/g) ?? []).length;
  if (streepjes) meld('fout', kort, `${streepjes}x gedachtestreepje`);
  const uitroep = (body.match(/!/g) ?? []).length;
  if (uitroep) meld('fout', kort, `${uitroep}x uitroepteken in de lopende tekst`);

  // 2. "u" als aanspreekvorm. Losse woorden, dus geen valse treffers binnen
  //    andere woorden. "ik" mag wel, maar alleen binnen een citaat.
  const uVorm = body.match(/(?<![\p{L}])(?:U|Uw|uw)(?![\p{L}])/gu) ?? [];
  if (uVorm.length) meld('fout', kort, `${uVorm.length}x "u" of "uw" als aanspreekvorm`);

  // 3. De merknaam in de lopende tekst: hoogstens een keer. In de frontmatter
  //    (het openingsantwoord) hoort hij juist wel.
  const merk = (body.match(/Bureau Weerbaar en Veilig/g) ?? []).length;
  if (merk > 1) meld('fout', kort, `merknaam ${merk}x in de lopende tekst, hoogstens 1 toegestaan`);

  // 4. Definitie door ontkenning: zeggen wat het aanbod NIET is, waarmee je de
  //    concurrent tot onderwerp van je eigen pagina maakt.
  //
  //    Alleen ontkenningen die over het aanbod gaan. "Geen collega binnen
  //    bereik, geen achterwacht om de hoek" beschrijft een werksituatie en is
  //    juist precies wat we willen: concreet over wat er op de vloer gebeurt.
  const overHetAanbod = /(cursus|training|e-?learning|module|bureau|aanbod|rollenspel|workshop|opleiding|programma)/i;
  const ontkenning = (body.match(/\bGeen [a-z][^.]{4,70}\./g) ?? []).filter((z) =>
    overHetAanbod.test(z),
  );
  for (const z of ontkenning) meld('waarschuwing', kort, `definitie door ontkenning: "${z.slice(0, 60)}"`);

  // 5. Naamwoordstijl en lijdende vorm: het register waar een herschrijving
  //    naartoe glijdt als vaktaal met deftigheid wordt verward.
  const stijf = body.match(/\b(?:de effectiviteit van|het hanteren van|de opbouw van|wordt bepaald door|vindt plaats|dient ter|middels|derhalve|zulks)\b/gi) ?? [];
  for (const z of new Set(stijf)) meld('waarschuwing', kort, `naamwoordstijl of ambtelijk: "${z}"`);

  // 6. Getallen in beweringen. Jaartallen en percentages zijn nergens
  //    vastgesteld en horen dus niet in een herschrijving op te duiken.
  //
  //    Uitzondering: de teamprofielen. Daar staan biografische gegevens die de
  //    mensen zelf over zichzelf zeggen, zoals sinds welk jaar iemand het vak
  //    doet. Dat is geen verzonnen verkoopclaim van het bureau, en het hoort
  //    ook niet weggehaald te worden. Zie STIJL.md hoofdstuk 3, punt 7.
  const isTeam = kort.includes('/team/');
  const jaartal = isTeam ? [] : (body.match(/\b(?:19|20)\d{2}\b/g) ?? []);
  for (const j of new Set(jaartal)) meld('fout', kort, `jaartal "${j}" in de tekst`);
  const procent = isTeam ? [] : (body.match(/\b\d+(?:[.,]\d+)?\s?(?:%|procent)\b/g) ?? []);
  for (const z of procent) meld('fout', kort, `percentage "${z}"`);
  const getallen = isTeam ? [] : (body.match(/\b\d+(?:[.,]\d+)?\b/g) ?? []);
  for (const g of getallen) {
    if (!TOEGESTANE_GETALLEN.has(g)) meld('waarschuwing', kort, `getal "${g}" dat nergens vastligt`);
  }

  // 7. Claims over de wet. De werkgever voldoet, de training niet.
  const wetClaim = body.match(/\b(?:voldoet aan de (?:Arbo|wet)|arbo-?proof|arbo-?compliant|wettelijk erkend|gecertificeerde training|geaccrediteerd)\b/gi) ?? [];
  for (const z of wetClaim) meld('fout', kort, `claim over de wet: "${z}"`);

  // 8. De frontmatter mag niet zijn aangetast.
  if (!/^\s*(naam|titel|slug):/m.test(front)) meld('fout', kort, 'frontmatter mist naam, titel of slug');
}

console.log(`\nGecontroleerd: ${bestanden.length} contentbestanden in ${path.relative(process.cwd(), wortel).replace(/\\/g, '/')}/`);
if (!fouten && !waarschuwingen) console.log('\nGeen fouten en geen waarschuwingen.');
else console.log(`\n${fouten} fout(en), ${waarschuwingen} waarschuwing(en).`);
process.exit(fouten ? 1 : 0);
