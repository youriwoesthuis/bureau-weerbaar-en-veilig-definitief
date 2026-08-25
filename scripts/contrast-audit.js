/**
 * Contrastcontrole — plakken in de console van de browser.
 *
 * Draait in de browser en niet in Node, omdat je echte computed styles nodig
 * hebt: doorzichtige kleuren, color-mix() en kleurverlopen zijn anders niet
 * door te rekenen.
 *
 * Meet elke tekstdragende node tegen de achtergrond die er werkelijk achter
 * ligt, en vergelijkt met de WCAG-eis: 4,5:1 voor gewone tekst, 3:1 voor
 * groot of vet.
 *
 * LET OP — gecorrigeerd op 25-08-2026. De vorige versie verzamelde alle
 * achtergrondlagen boven elkaar en nam daarvan de slechtste. Dat is juist bij
 * een kleurverloop (tekst kan boven elke stop staan), maar fout bij een
 * half-doorzichtig vlak: de laag eronder schijnt er nooit onvermengd
 * doorheen. Toen de site van donker naar licht ging, meldde het script
 * daardoor 101 valse fouten op de menubalk — witte tekst op een balk van
 * rgba(18,18,22,.82), gemeten tegen de witte body eronder.
 * Nu worden ondoorzichtige lagen eerst samengevoegd; alleen verloopstops
 * blijven aparte kandidaten.
 */
(() => {
  const lum = (r, g, b) => {
    const f = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  const parse = (s) => {
    const m = String(s).match(
      /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.%]+))?/,
    );
    if (!m) return null;
    const a =
      m[4] === undefined
        ? 1
        : String(m[4]).endsWith('%')
          ? parseFloat(m[4]) / 100
          : +m[4];
    return { r: +m[1], g: +m[2], b: +m[3], a };
  };

  /** boven over onder heen leggen */
  const over = (boven, onder) => ({
    r: boven.r * boven.a + onder.r * (1 - boven.a),
    g: boven.g * boven.a + onder.g * (1 - boven.a),
    b: boven.b * boven.a + onder.b * (1 - boven.a),
    a: 1,
  });

  const stops = (bi) =>
    !bi || bi === 'none' || !bi.includes('gradient')
      ? []
      : [...bi.matchAll(/rgba?\([^)]+\)/g)].map((m) => parse(m[0])).filter(Boolean);

  /**
   * De achtergronden waar deze tekst werkelijk op kan liggen.
   * Eén kleur bij een effen achtergrond, meerdere bij een verloop.
   */
  const achtergronden = (el) => {
    const lagen = []; // voorgrond eerst
    let n = el;
    while (n && n.nodeType === 1) {
      const st = getComputedStyle(n);
      const gs = stops(st.backgroundImage);
      if (gs.length) lagen.push({ verloop: gs });
      const bg = parse(st.backgroundColor);
      if (bg && bg.a > 0) {
        lagen.push({ effen: bg });
        if (bg.a === 1 && !gs.length) break;
      }
      n = n.parentElement;
    }
    lagen.push({ effen: { r: 255, g: 255, b: 255, a: 1 } }); // het papier

    // van achter naar voren samenvoegen
    let basis = null;
    let kandidaten = null;
    for (let i = lagen.length - 1; i >= 0; i--) {
      const laag = lagen[i];
      if (laag.effen) {
        const c = laag.effen;
        basis = basis ? over(c, basis) : c.a === 1 ? c : over(c, { r: 255, g: 255, b: 255, a: 1 });
        if (kandidaten) kandidaten = kandidaten.map((k) => (c.a === 1 ? c : over(c, k)));
      } else {
        // een verloop: elke stop is een eigen kandidaat boven de huidige basis
        const onder = basis ?? { r: 255, g: 255, b: 255, a: 1 };
        kandidaten = laag.verloop.map((s) => (s.a === 1 ? s : over(s, onder)));
      }
    }
    return kandidaten && kandidaten.length ? kandidaten : [basis];
  };

  const problemen = [];
  const selectors =
    'h1,h2,h3,h4,p,a,li,span,td,th,label,dt,dd,summary,button,legend,strong,address,b,small,code';

  for (const el of document.querySelectorAll(selectors)) {
    const tekst = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join('');
    if (!tekst) continue;

    const st = getComputedStyle(el);
    if (st.display === 'none' || st.visibility === 'hidden' || +st.opacity === 0) continue;
    if (el.closest('.alleen-voorlezer')) continue;
    // tekst met een kleurverloop erin geknipt meet je niet zo
    if (st.webkitBackgroundClip === 'text' || st.backgroundClip === 'text') continue;
    if (el.offsetParent === null && st.position !== 'fixed') continue;

    const vg = parse(st.color);
    if (!vg) continue;

    const px = parseFloat(st.fontSize);
    const vet = +st.fontWeight >= 700;
    const eis = px >= 24 || (vet && px >= 18.66) ? 3 : 4.5;

    let laagste = Infinity;
    let bijKleur = null;
    for (const bg of achtergronden(el)) {
      const v = vg.a < 1 ? over(vg, bg) : vg;
      const l1 = lum(v.r, v.g, v.b);
      const l2 = lum(bg.r, bg.g, bg.b);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      if (ratio < laagste) {
        laagste = ratio;
        bijKleur = bg;
      }
    }

    if (laagste < eis) {
      problemen.push({
        klasse: (el.className || '').toString().slice(0, 40) || el.tagName.toLowerCase(),
        tekst: tekst.slice(0, 30),
        ratio: +laagste.toFixed(2),
        eis,
        voorgrond: st.color,
        achtergrond: bijKleur
          ? `rgb(${Math.round(bijKleur.r)}, ${Math.round(bijKleur.g)}, ${Math.round(bijKleur.b)})`
          : '?',
      });
    }
  }

  if (problemen.length === 0) {
    console.log('%cGeen contrastfouten.', 'color:#0a0;font-weight:bold');
  } else {
    console.log(
      `%c${problemen.length} contrastfout(en)`,
      'color:#c00;font-weight:bold',
    );
    console.table(problemen);
  }
  return problemen;
})();
