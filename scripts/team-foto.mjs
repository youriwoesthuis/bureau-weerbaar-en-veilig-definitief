/**
 * Teamfoto-pijplijn: snijdt de persoon uit een portret (RMBG-1.4 via
 * transformers.js, WASM — geen native build nodig) en zet hem op een
 * achtergrond in de merkkleuren. Uitvoer: 750x1000 jpg.
 *
 * gebruik: node scripts/team-foto.mjs <bron> <doel.jpg> [--groen]
 *   --groen  voor greenscreen-bronnen: ruimt groene restpixels en
 *            groenzweem in de haarrand op.
 *
 * Het ruwe modelmasker wordt op drie manieren opgeschoond:
 * 1. niveaucurve (zachte tussenwaarden naar 0/255, kleine blur als haarrand)
 * 2. alleen de grootste aaneengesloten vorm blijft staan — losse vlekjes
 *    die het model per ongeluk als voorgrond ziet, verdwijnen
 * 3. optioneel de groen-opruimstap hierboven
 */
import { AutoModel, AutoProcessor, RawImage, env } from '@xenova/transformers';
import sharp from 'sharp';

env.allowLocalModels = false;

const argv = process.argv.slice(2);
const groen = argv.includes('--groen');
const [bron, doel] = argv.filter((a) => !a.startsWith('--'));
if (!bron || !doel) { console.error('gebruik: node scripts/team-foto.mjs <bron> <doel> [--groen]'); process.exit(1); }

const model = await AutoModel.from_pretrained('briaai/RMBG-1.4', { config: { model_type: 'custom' } });
const processor = await AutoProcessor.from_pretrained('briaai/RMBG-1.4', {
  config: {
    do_normalize: true,
    do_pad: false,
    do_rescale: true,
    do_resize: true,
    image_mean: [0.5, 0.5, 0.5],
    feature_extractor_type: 'ImageFeatureExtractor',
    image_std: [1, 1, 1],
    resample: 2,
    rescale_factor: 0.00392156862745098,
    size: { width: 1024, height: 1024 },
  },
});

const beeld = await RawImage.read(bron);
const { pixel_values } = await processor(beeld);
const { output } = await model({ input: pixel_values });
const masker = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(beeld.width, beeld.height);
const W = masker.width, H0 = masker.height;

/* 1. niveaucurve */
let m = Buffer.from(masker.data);
for (let i = 0; i < m.length; i++) {
  const v = m[i] * 1.75 - 80;
  m[i] = v < 0 ? 0 : v > 255 ? 255 : v;
}

/* 2. grootste aaneengesloten vorm behouden (op de hard gemaakte versie) */
const hard = new Uint8Array(m.length);
for (let i = 0; i < m.length; i++) hard[i] = m[i] >= 128 ? 1 : 0;
const label = new Int32Array(m.length);
let beste = 0, besteGrootte = 0, huidig = 0;
const stapel = new Int32Array(m.length);
for (let start = 0; start < m.length; start++) {
  if (!hard[start] || label[start]) continue;
  huidig++;
  let top = 0, grootte = 0;
  stapel[top++] = start;
  label[start] = huidig;
  while (top > 0) {
    const p = stapel[--top];
    grootte++;
    const x = p % W, y = (p / W) | 0;
    if (x > 0 && hard[p - 1] && !label[p - 1]) { label[p - 1] = huidig; stapel[top++] = p - 1; }
    if (x < W - 1 && hard[p + 1] && !label[p + 1]) { label[p + 1] = huidig; stapel[top++] = p + 1; }
    if (y > 0 && hard[p - W] && !label[p - W]) { label[p - W] = huidig; stapel[top++] = p - W; }
    if (y < H0 - 1 && hard[p + W] && !label[p + W]) { label[p + W] = huidig; stapel[top++] = p + W; }
  }
  if (grootte > besteGrootte) { besteGrootte = grootte; beste = huidig; }
}
// Binair op basis van de grootste vorm: zachte tussenwaarden buiten de
// vorm waren als halfdoorzichtige vlekken zichtbaar. De blur hieronder
// geeft de haarrand terug.
for (let i = 0; i < m.length; i++) m[i] = m[i] >= 128 && label[i] === beste ? 255 : 0;

const maskerPng = await sharp(m, { raw: { width: W, height: H0, channels: 1 } })
  .blur(0.8)
  .png().toBuffer();

/* uitsnede maken */
let uitsnede = await sharp(bron)
  .ensureAlpha()
  .joinChannel(maskerPng)
  .png().toBuffer();

/* 3. groen opruimen (alleen bij greenscreen-bronnen) */
if (groen) {
  const { data, info } = await sharp(uitsnede).raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (data[i + 3] > 0 && g > r * 1.1 && g > b * 1.1 && g > 70) {
      data[i + 3] = 0; // restpixel van het groene doek
    } else if (g > Math.max(r, b)) {
      data[i + 1] = Math.max(r, b); // groenzweem in de haarrand dempen
    }
  }
  uitsnede = await sharp(data, { raw: info }).png().toBuffer();
}

/* merkachtergrond: warm licht met een oranje gloed en een vleug blauw */
const B = 750, H = 1000;
const achtergrond = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${B}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stop-color="#fdf1e3"/>
      <stop offset="55%" stop-color="#f6f2f4"/>
      <stop offset="100%" stop-color="#eceef8"/>
    </linearGradient>
    <radialGradient id="gloed" cx="0.78" cy="0.16" r="0.6">
      <stop offset="0%" stop-color="#f18816" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#f18816" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="koel" cx="0.12" cy="0.95" r="0.55">
      <stop offset="0%" stop-color="#4767cc" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#4767cc" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${B}" height="${H}" fill="url(#g)"/>
  <rect width="${B}" height="${H}" fill="url(#gloed)"/>
  <rect width="${B}" height="${H}" fill="url(#koel)"/>
</svg>`);

/* persoon passend maken: onderkant uitlijnen, gecentreerd */
const meta = await sharp(uitsnede).metadata();
const schaal = Math.min(B / meta.width, H / meta.height);
const nb = Math.round(meta.width * schaal);
const nh = Math.round(meta.height * schaal);
const persoon = await sharp(uitsnede).resize(nb, nh).png().toBuffer();

await sharp(achtergrond)
  .composite([{ input: persoon, left: Math.round((B - nb) / 2), top: H - nh }])
  .flatten({ background: '#f6f2f4' })
  .jpeg({ quality: 84 })
  .toFile(doel);

console.log('klaar:', doel);
