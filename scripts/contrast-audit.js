// Wordt in de browser uitgevoerd via javascript_tool. Geen module.
(() => {
  const lum = (r, g, b) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const parse = (s) => {
    const m = String(s).match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.%]+))?/);
    if (!m) return null;
    let a = m[4] === undefined ? 1 : (String(m[4]).endsWith('%') ? parseFloat(m[4]) / 100 : +m[4]);
    return { r: +m[1], g: +m[2], b: +m[3], a };
  };
  const meng = (boven, onder) => ({
    r: boven.r * boven.a + onder.r * (1 - boven.a),
    g: boven.g * boven.a + onder.g * (1 - boven.a),
    b: boven.b * boven.a + onder.b * (1 - boven.a),
    a: 1,
  });
  const stops = (bgImage) => {
    if (!bgImage || bgImage === 'none' || !bgImage.includes('gradient')) return [];
    return [...bgImage.matchAll(/rgba?\([^)]+\)/g)].map((m) => parse(m[0])).filter(Boolean);
  };

  // Alle achtergrondlagen onder een element, van boven naar beneden
  const achtergronden = (el) => {
    const lagen = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const st = getComputedStyle(n);
      const gs = stops(st.backgroundImage);
      if (gs.length) lagen.push(...gs);
      const bg = parse(st.backgroundColor);
      if (bg && bg.a > 0) {
        lagen.push(bg);
        if (bg.a === 1 && !gs.length) break;
      }
      n = n.parentElement;
    }
    if (!lagen.length) lagen.push({ r: 255, g: 255, b: 255, a: 1 });
    // Elke kandidaat-achtergrond apart doorrekenen tegen de ondergrond
    const basis = lagen[lagen.length - 1];
    return lagen.map((l) => (l.a < 1 ? meng(l, basis) : l));
  };

  const problemen = [];
  const els = document.querySelectorAll('h1,h2,h3,h4,h5,p,a,li,span,td,th,label,dt,dd,summary,button,legend,strong,address,code');

  for (const el of els) {
    const eigenTekst = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
    if (!eigenTekst) continue;
    const st = getComputedStyle(el);
    if (st.display === 'none' || st.visibility === 'hidden' || +st.opacity === 0) continue;
    if (el.closest('.alleen-voorlezer')) continue;
    if (st.webkitBackgroundClip === 'text' || st.backgroundClip === 'text') continue;
    if (el.offsetParent === null && st.position !== 'fixed') continue;

    const vg = parse(st.color);
    if (!vg) continue;

    const kandidaten = achtergronden(el);
    const px = parseFloat(st.fontSize);
    const vet = +st.fontWeight >= 700;
    const norm = px >= 24 || (vet && px >= 18.66) ? 3 : 4.5;

    let slechtste = Infinity;
    for (const bg of kandidaten) {
      const vgEff = vg.a < 1 ? meng(vg, bg) : vg;
      const l1 = lum(vgEff.r, vgEff.g, vgEff.b);
      const l2 = lum(bg.r, bg.g, bg.b);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      if (ratio < slechtste) slechtste = ratio;
    }

    if (slechtste < norm) {
      problemen.push({
        tag: el.tagName.toLowerCase(),
        klasse: (el.className || '').toString().slice(0, 45),
        tekst: eigenTekst.slice(0, 40),
        ratio: +slechtste.toFixed(2),
        norm,
        px: +px.toFixed(1),
      });
    }
  }

  // Dubbele meldingen samenvatten
  const uniek = new Map();
  for (const p of problemen) {
    const sleutel = `${p.tag}.${p.klasse}|${p.ratio}`;
    if (!uniek.has(sleutel)) uniek.set(sleutel, { ...p, aantal: 0 });
    uniek.get(sleutel).aantal++;
  }
  return { pagina: location.pathname, elementen: els.length, problemen: [...uniek.values()] };
})()
