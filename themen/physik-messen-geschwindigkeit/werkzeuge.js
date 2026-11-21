/* Werkzeuge der Physik-App: Umrechnen (Zahlenstrahl, Zeit, m/s und km/h), Messwerte ablesen,
   Diagramme (s-t lesen, grafischer Fahrplan, s-t zeichnen und in v-t umwandeln).
   Alle Aufgaben werden zufällig erzeugt. Das HTML steht in index.html (#vorlagen). */
LernApp.werkzeug({
  init(api) {
    const { $, $$, el, esc, shuffle, record } = api;
    const rnd = a => a[Math.floor(Math.random() * a.length)];
    const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const parseNum = x => { const t = String(x).trim().replace(/[\s'’]/g, '').replace(',', '.').replace(/^[−–]/, '-'); return /^-?(\d+\.?\d*|\.\d+)$/.test(t) ? +t : NaN; };
    const thousands = s => s.replace(/\B(?=(\d{3})+$)/g, "'");
    // Zahl runden und schön schreiben: Dezimalpunkt, Apostroph als Tausendertrennzeichen, Minus als −
    const fmt = (n, d = 2) => { const r = Math.round(n * 10 ** d) / 10 ** d; const [i, f] = String(Math.abs(r)).split('.'); return (r < 0 ? '−' : '') + thousands(i) + (f ? '.' + f : ''); };
    const sup = n => String(n).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
    const fb = (ok, html) => `<div class="fb ${ok ? 'good' : 'bad'}"><p><b class="k">${ok ? 'Richtig!' : 'Nicht ganz.'}</b> ${html}</p></div>`;
    const svgClear = svg => { while (svg.firstChild) svg.removeChild(svg.firstChild); };
    const txt = (parent, x, y, s, cls, anchor) => { const t = el('text', { x, y, class: cls, 'text-anchor': anchor || 'middle' }, parent); t.textContent = s; return t; };
    function onEnter(input, fn) { input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); fn(); } }); }

    /* ================= Umrechnen ================= */
    const NAMES = { '-9': 'Nano', '-6': 'Mikro', '-3': 'Milli', '-2': 'Centi', '-1': 'Dezi', '0': '1', '2': 'Hekto', '3': 'Kilo', '6': 'Mega', '9': 'Giga', '12': 'Tera', '15': 'Peta' };
    const FAM = {
      laenge: [['nm', -9], ['µm', -6], ['mm', -3], ['cm', -2], ['dm', -1], ['m', 0], ['km', 3]],
      masse: [['ng', -9], ['µg', -6], ['mg', -3], ['g', 0], ['kg', 3]],
      volumen: [['nl', -9], ['µl', -6], ['ml', -3], ['cl', -2], ['dl', -1], ['l', 0], ['hl', 2]],
      speicher: [['kB', 3], ['MB', 6], ['GB', 9], ['TB', 12], ['PB', 15]]
    };
    const DIGITS = ['1', '2', '3', '4', '5', '6', '8', '9', '12', '16', '18', '22', '25', '26', '34', '45', '46', '55', '64', '84', '96'];
    // Wert = Ziffern · 10^e, exakt als Text darstellen (keine Rundungsfehler)
    function decStr(D, e) {
      if (e >= 0) return thousands(D + '0'.repeat(e));
      const pos = D.length + e;
      if (pos > 0) return thousands(D.slice(0, pos)) + '.' + D.slice(pos);
      return '0.' + '0'.repeat(-pos) + D;
    }
    const decNum = (D, e) => +(D + 'e' + e);
    function strahlHtml(fam, from, to) {
      const exps = fam === 'speicher' ? [0, 3, 6, 9, 12, 15] : [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3];
      const rows = fam === 'speicher' ? ['speicher'] : ['laenge', 'masse', 'volumen'];
      const lo = Math.min(from, to), hi = Math.max(from, to), mark = from != null;
      const unitAt = (f, e) => (FAM[f].find(u => u[1] === e) || [''])[0] || (f === 'laenge' && e === 0 ? 'm' : f === 'masse' && e === 0 ? 'g' : f === 'volumen' && e === 0 ? 'l' : '');
      return `<table class="strahl"><thead><tr>${exps.map(e => `<th>10${sup(e)}</th>`).join('')}</tr><tr>${exps.map(e => `<th>${NAMES[e] || ''}</th>`).join('')}</tr></thead><tbody>${rows.map(f => `<tr>${exps.map(e => {
        let c = '';
        if (mark && f === state.u.fam) c = e === from ? 'from' : e === to ? 'to' : (e > lo && e < hi ? 'between' : '');
        return `<td class="${c}">${unitAt(f, e)}</td>`;
      }).join('')}</tr>`).join('')}</tbody></table>`;
    }
    const state = { u: {}, uMode: 'vorsilben', uScore: 0, uTotal: 0 };
    function genPrefix(fam) {
      const units = FAM[fam];
      for (let k = 0; k < 200; k++) {
        const [a, b] = shuffle(units).slice(0, 2), d = a[1] - b[1];
        if (Math.abs(d) > 9 || d === 0) continue;
        const D = rnd(DIGITS), e1 = rint(-5, 5), e2 = e1 + d;
        const m1 = e1 + D.length - 1, m2 = e2 + D.length - 1;
        if (m1 < -4 || m1 > 5 || m2 < -6 || m2 > 7) continue;
        return { fam, lz: 'u1', from: a, to: b, D, e1, e2, q: `Wie viele ${b[0]} sind ${decStr(D, e1)} ${a[0]}?`, ans: decNum(D, e2), unit: b[0], tol: Math.abs(decNum(D, e2)) * 1e-9 };
      }
    }
    function genZeit() {
      const typ = rnd(['min', 'min', 'h', 'hmin', 'dez', 'raum', 'raum']);
      if (typ === 'min') { const m = rnd([6, 12, 15, 18, 20, 24, 25, 30, 36, 40, 42, 45, 48, 50, 54]); return { lz: 'u2', q: `Wie viele Stunden sind ${m} min?`, ans: m / 60, unit: 'h', tol: .006, e: `Minuten durch 60: ${m} : 60 = ${fmt(m / 60)} h.` }; }
      if (typ === 'h') { const h = rnd([.1, .2, .25, .3, .4, .5, .6, .75, .8, .9]); return { lz: 'u2', q: `Wie viele Minuten sind ${fmt(h)} h?`, ans: h * 60, unit: 'min', tol: .01, e: `Stunden mal 60: ${fmt(h)} · 60 = ${fmt(h * 60)} min.` }; }
      if (typ === 'hmin') { const h = rint(1, 5), m = rnd([6, 12, 15, 18, 24, 30, 36, 42, 45, 48]); return { lz: 'u2', q: `Wie viele Stunden sind ${h} h ${m} min?`, ans: h + m / 60, unit: 'h', tol: .006, e: `${m} min : 60 = ${fmt(m / 60)} h. Dazu ${h} h: ${fmt(h + m / 60)} h.` }; }
      if (typ === 'dez') { const h = rint(1, 15), m = rnd([6, 12, 15, 18, 24, 36, 42, 45, 48, 54]); return { lz: 'u2', q: `${fmt(h + m / 60)} h sind ${h} h und wie viele Minuten?`, ans: m, unit: 'min', tol: .01, e: `Nur den Teil nach dem Komma mal 60: ${fmt(m / 60)} · 60 = ${m} min. Also ${h} h ${m} min.` }; }
      const a = rint(7 * 60, 15 * 60), d = rint(20, 200), b = a + d;
      const uhr = x => `${Math.floor(x / 60)}.${String(x % 60).padStart(2, '0')} Uhr`;
      const dh = Math.floor(d / 60), dm = d % 60;
      return { lz: 'u2', q: `Wie viele Stunden dauert es von ${uhr(a)} bis ${uhr(b)}?`, ans: d / 60, unit: 'h', tol: .006, e: `Die Dauer ist ${dh ? dh + ' h ' : ''}${dm} min. ${dm} min : 60 = ${fmt(dm / 60)} h, zusammen ${fmt(d / 60)} h.` };
    }
    function genTempo() {
      if (Math.random() < .5) { const v = rnd([5, 10, 12.5, 15, 20, 24, 25, 30, 40, 50, 300]); return { lz: 'u3', q: `Wie viel sind ${fmt(v)} m/s in km/h?`, ans: v * 3.6, unit: 'km/h', tol: .06, e: `Von m/s nach km/h mal 3.6: ${fmt(v)} · 3.6 = ${fmt(v * 3.6)} km/h.` }; }
      const v = rnd([18, 36, 45, 54, 72, 90, 108, 120, 144, 180]); return { lz: 'u3', q: `Wie viel sind ${v} km/h in m/s?`, ans: v / 3.6, unit: 'm/s', tol: .06, e: `Von km/h nach m/s durch 3.6: ${v} : 3.6 = ${fmt(v / 3.6)} m/s.` };
    }
    function nextU() {
      let m = state.uMode; if (m === 'mix') m = rnd(['vorsilben', 'vorsilben', 'speicher', 'zeit', 'tempo']);
      const t = m === 'vorsilben' ? genPrefix(rnd(['laenge', 'masse', 'volumen'])) : m === 'speicher' ? genPrefix('speicher') : m === 'zeit' ? genZeit() : genTempo();
      state.u = Object.assign({ done: false }, t);
      $('#uTask').textContent = t.q;
      $('#uUnit').textContent = t.unit;
      $('#uStrahl').innerHTML = t.fam ? strahlHtml(t.fam) : '';
      $('#uIn').value = ''; $('#uIn').disabled = false; $('#uFb').innerHTML = '';
      $('#uCheck').textContent = 'Prüfen';
      $$('#uModes [data-umode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.umode === state.uMode));
      $('#uScore').textContent = state.uTotal ? `${state.uScore} von ${state.uTotal} richtig` : '';
    }
    function checkU() {
      const t = state.u;
      if (t.done) { nextU(); $('#uIn').focus(); return; }
      const v = parseNum($('#uIn').value);
      if (isNaN(v)) { $('#uFb').innerHTML = '<p class="note">Gib eine Zahl ein, z.B. 0.25 oder 22\'000.</p>'; return; }
      const ok = Math.abs(v - t.ans) <= t.tol + 1e-12;
      t.done = true; state.uTotal++; if (ok) state.uScore++; record(t.lz, ok);
      let e = t.e;
      if (t.fam) {
        const n = Math.abs(t.from[1] - t.to[1]), smaller = t.to[1] < t.from[1];
        e = `Von ${t.from[0]} (10${sup(t.from[1])}) zu ${t.to[0]} (10${sup(t.to[1])}) sind es ${n} ${n === 1 ? 'Zehnersprung' : 'Zehnersprünge'}. ${t.to[0]} ist die ${smaller ? 'kleinere' : 'grössere'} Einheit, die Zahl wird ${smaller ? 'grösser' : 'kleiner'}: Komma ${n} ${n === 1 ? 'Stelle' : 'Stellen'} nach ${smaller ? 'rechts' : 'links'}. ${decStr(t.D, t.e1)} ${t.from[0]} = <b>${decStr(t.D, t.e2)} ${t.to[0]}</b>.`;
        $('#uStrahl').innerHTML = strahlHtml(t.fam, t.from[1], t.to[1]);
      } else e = esc(e) + ` Richtig: <b>${fmt(t.ans)} ${esc(t.unit)}</b>.`;
      $('#uFb').innerHTML = fb(ok, e);
      $('#uIn').disabled = true; $('#uCheck').textContent = 'Nächste Aufgabe'; $('#uCheck').focus();
      $('#uScore').textContent = `${state.uScore} von ${state.uTotal} richtig`;
    }
    $('#uModes').addEventListener('click', e => { const b = e.target.closest('[data-umode]'); if (b) { state.uMode = b.dataset.umode; nextU(); } });
    $('#uCheck').addEventListener('click', checkU);
    onEnter($('#uIn'), checkU);
    nextU();

    /* ================= Messwerte ablesen ================= */
    const UNITS = { laenge: { mm: .1, cm: 1, m: 100 }, temp: { '°C': 1 }, vol: { ml: 1, cl: 10, dl: 100, l: 1000 } };
    $('#aUnit').innerHTML = '<option value="">Einheit</option>' + ['mm', 'cm', 'm', '°C', 'ml', 'cl', 'dl', 'l', 'g', 's'].map(u => `<option>${u}</option>`).join('');
    const ab = { mode: 'lineal', score: 0, total: 0, t: null };
    function drawLineal(svg) {
      svg.setAttribute('viewBox', '0 0 640 200');
      const mm = rint(18, 96), x0 = 40, k = 56, end = x0 + mm / 10 * k;
      el('rect', { x: 20, y: 110, width: 600, height: 56, rx: 4, class: 'd-sand' }, svg);
      for (let i = 0; i <= 100; i++) {
        const x = x0 + i * k / 10, h = i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8;
        el('line', { x1: x, y1: 110, x2: x, y2: 110 + h, class: 'd-tick' }, svg);
        if (i % 10 === 0) txt(svg, x, 152, String(i / 10), 'd-small');
      }
      txt(svg, 606, 152, 'cm', 'd-tiny');
      el('rect', { x: x0, y: 74, width: end - x0 - 22, height: 26, class: 'd-metal' }, svg);
      el('path', { d: `M${end - 22},74 L${end},87 L${end - 22},100 Z`, class: 'd-fill' }, svg);
      el('line', { x1: x0, y1: 64, x2: x0, y2: 110, class: 'd-line' }, svg);
      return { q: 'Wie lang ist der Stift? Er beginnt genau bei 0.', val: mm / 10, step: .1, kind: 'laenge', base: 'cm', e: `Ein kleiner Strich ist 1 mm = 0.1 cm. Der Stift reicht bis ${fmt(mm / 10, 1)} cm. Messwert: ${fmt(mm / 10, 1)} cm oder ${mm} mm.` };
    }
    function drawThermo(svg) {
      svg.setAttribute('viewBox', '0 0 640 200');
      const v = rnd([{ lo: -20, hi: 50, st: 1, lab: 10 }, { lo: -10, hi: 40, st: 2, lab: 10 }, { lo: 34, hi: 42, st: .1, lab: 1 }]);
      const n = Math.round((v.hi - v.lo) / v.st), x0 = 80, x1 = 600, k = (x1 - x0) / n;
      const idx = rint(Math.round(n * .15), Math.round(n * .9)), val = Math.round((v.lo + idx * v.st) * 10) / 10;
      el('rect', { x: 30, y: 92, width: 590, height: 22, rx: 11, class: 'd-fill' }, svg);
      el('rect', { x: 40, y: 99, width: x0 + idx * k - 40, height: 8, class: v.st === .1 ? 'd-silver' : 'd-red' }, svg);
      el('circle', { cx: 40, cy: 103, r: 15, class: (v.st === .1 ? 'd-silver' : 'd-red') + ' stroke' }, svg);
      for (let i = 0; i <= n; i++) {
        const x = x0 + i * k, value = v.lo + i * v.st, major = Math.abs(value / v.lab - Math.round(value / v.lab)) < 1e-6;
        const half = Math.abs((value / v.lab) * 2 - Math.round((value / v.lab) * 2)) < 1e-6;
        el('line', { x1: x, y1: 92, x2: x, y2: 92 - (major ? 18 : half ? 12 : 7), class: 'd-tick' }, svg);
        if (major) txt(svg, x, 62, fmt(value, 1), 'd-small');
      }
      txt(svg, 616, 62, '°C', 'd-small', 'end');
      const stTxt = v.st === 1 ? '1 °C' : v.st === 2 ? '2 °C' : '0.1 °C';
      return { q: 'Welche Temperatur zeigt das Thermometer?', val, step: v.st, kind: 'temp', base: '°C', e: `Zwischen zwei beschrifteten Strichen liegen ${fmt(v.lab, 1)} °C. Ein kleiner Strich ist hier ${stTxt} wert. Die Säule endet bei ${fmt(val, 1)} °C.` };
    }
    function drawZylinder(svg) {
      svg.setAttribute('viewBox', '0 0 640 280');
      const v = rnd([{ max: 100, st: 2, lab: 10 }, { max: 50, st: 1, lab: 10 }, { max: 250, st: 5, lab: 50 }]);
      const n = v.max / v.st, y0 = 250, y1 = 30, k = (y0 - y1) / n, idx = rint(Math.round(n * .2), Math.round(n * .9)), val = idx * v.st, yl = y0 - idx * k;
      el('path', { d: 'M250,268 L390,268 L376,252 L264,252 Z', class: 'd-fill' }, svg);
      // Wasser mit nach unten gewölbter Oberfläche: tiefster Punkt in der Mitte genau beim Messwert
      el('rect', { x: 282, y: yl - 6, width: 76, height: y0 - yl + 8, class: 'd-water' }, svg);
      el('path', { d: `M282,${yl - 6.5} L358,${yl - 6.5} Q320,${yl + 6} 282,${yl - 6.5} Z`, class: 'd-cut' }, svg);
      el('path', { d: `M282,${yl - 6} Q320,${yl + 6} 358,${yl - 6}`, class: 'd-meniscus' }, svg);
      el('path', { d: `M280,18 V252 H360 V18`, class: 'd-glass' }, svg);
      for (let i = 0; i <= n; i++) {
        const y = y0 - i * k, value = i * v.st, major = value % v.lab === 0, half = value % (v.lab / 2) === 0;
        el('line', { x1: 280, y1: y, x2: 280 - (major ? 18 : half ? 12 : 7), y2: y, class: 'd-tick' }, svg);
        if (major) txt(svg, 250, y + 4, String(value), 'd-small', 'end');
      }
      txt(svg, 372, 30, 'ml', 'd-small', 'start');
      return { q: 'Wie viel Wasser ist im Messzylinder? Lies am tiefsten Punkt der Wasseroberfläche ab.', val, step: v.st, kind: 'vol', base: 'ml', e: `Zwischen zwei Zahlen liegen ${v.lab} ml, ein kleiner Strich ist ${v.st} ml wert. Am tiefsten Punkt der gewölbten Oberfläche liest du ${val} ml ab.` };
    }
    function nextA() {
      const m = ab.mode === 'mix' ? rnd(['lineal', 'thermo', 'zylinder']) : ab.mode;
      const svg = $('#aSvg'); svgClear(svg);
      ab.t = (m === 'lineal' ? drawLineal : m === 'thermo' ? drawThermo : drawZylinder)(svg);
      ab.t.done = false;
      $('#aTask').textContent = ab.t.q;
      $('#aIn').value = ''; $('#aIn').disabled = false; $('#aUnit').value = ''; $('#aUnit').disabled = false; $('#aFb').innerHTML = '';
      $('#aCheck').textContent = 'Prüfen';
      $$('#aModes [data-amode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.amode === ab.mode));
      $('#aScore').textContent = ab.total ? `${ab.score} von ${ab.total} richtig` : '';
    }
    function checkA() {
      const t = ab.t;
      if (t.done) { nextA(); $('#aIn').focus(); return; }
      const v = parseNum($('#aIn').value), u = $('#aUnit').value;
      if (isNaN(v)) { $('#aFb').innerHTML = '<p class="note">Gib zuerst den Zahlenwert ein.</p>'; return; }
      const fac = UNITS[t.kind][u];
      const ok = !!fac && Math.abs(v * fac - t.val) <= t.step / 2 + 1e-9;
      t.done = true; ab.total++; if (ok) ab.score++; record('m2', ok);
      let why = '';
      if (!u) why = 'Die Einheit fehlt. Ohne Einheit ist es kein Messwert. ';
      else if (!fac) why = `Die Einheit ${esc(u)} passt nicht zu dieser physikalischen Grösse. `;
      $('#aFb').innerHTML = fb(ok, `${why}${esc(t.e)} Richtig: <b>${fmt(t.val, 1)} ${esc(t.base)}</b>.`);
      $('#aIn').disabled = true; $('#aUnit').disabled = true; $('#aCheck').textContent = 'Nächste Aufgabe'; $('#aCheck').focus();
      $('#aScore').textContent = `${ab.score} von ${ab.total} richtig`;
    }
    $('#aModes').addEventListener('click', e => { const b = e.target.closest('[data-amode]'); if (b) { ab.mode = b.dataset.amode; nextA(); } });
    $('#aCheck').addEventListener('click', checkA);
    onEnter($('#aIn'), checkA); onEnter($('#aUnit'), checkA);
    nextA();

    /* ================= Diagramme: gemeinsame Achsen ================= */
    // o: { w, h, l, r, t, b, x0, x1, y0, y1, dx, dxM, dy, dyM, xlab(v), ylab(v), xname, yname }
    function axes(svg, o) {
      svg.setAttribute('viewBox', `0 0 ${o.w} ${o.h}`);
      const W = o.w - o.l - o.r, H = o.h - o.t - o.b;
      const X = v => o.l + (v - o.x0) / (o.x1 - o.x0) * W, Y = v => o.t + (o.y1 - v) / (o.y1 - o.y0) * H;
      const near = (v, s) => Math.abs(v / s - Math.round(v / s)) < 1e-6;
      for (let v = o.x0; v <= o.x1 + 1e-9; v += o.dx) el('line', { x1: X(v), y1: Y(o.y0), x2: X(v), y2: Y(o.y1), class: 'dg-grid' + (near(v, o.dxM) ? ' major' : '') }, svg);
      for (let v = o.y0; v <= o.y1 + 1e-9; v += o.dy) el('line', { x1: X(o.x0), y1: Y(v), x2: X(o.x1), y2: Y(v), class: 'dg-grid' + (near(v, o.dyM) ? ' major' : '') }, svg);
      el('line', { x1: X(o.x0), y1: Y(o.y0), x2: X(o.x0), y2: Y(o.y1), class: 'dg-axis' }, svg);
      const ya = o.y0 <= 0 && o.y1 >= 0 ? 0 : o.y0;
      el('line', { x1: X(o.x0), y1: Y(ya), x2: X(o.x1), y2: Y(ya), class: 'dg-axis' }, svg);
      for (let v = o.x0; v <= o.x1 + 1e-9; v += o.dxM) txt(svg, X(v), Y(o.y0) + 16, o.xlab ? o.xlab(v) : fmt(v, 1), 'dg-lab');
      for (let v = o.y0; v <= o.y1 + 1e-9; v += o.dyM) txt(svg, X(o.x0) - 6, Y(v) + 4, o.ylab ? o.ylab(v) : fmt(v, 1), 'dg-lab', 'end');
      if (o.xname) txt(svg, X(o.x1), Y(o.y0) + 30, o.xname, 'dg-title', 'end');
      if (o.yname) txt(svg, X(o.x0) - 6, o.t - 8, o.yname, 'dg-title', 'start');
      return { X, Y, W, H };
    }
    const dg = { mode: 'lesen', score: 0, total: 0 };
    const dScore = () => { $('#dScore').textContent = dg.total ? `${dg.score} von ${dg.total} richtig` : ''; };
    function dRecord(lz, ok) { dg.total++; if (ok) dg.score++; record(lz, ok); dScore(); }
    $('#dModes').addEventListener('click', e => { const b = e.target.closest('[data-dmode]'); if (b) startD(b.dataset.dmode); });
    function startD(mode) {
      dg.mode = mode;
      $$('#dModes [data-dmode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.dmode === mode));
      if (mode === 'lesen') { L.n = 0; newLesen(); }
      if (mode === 'fahrplan') { F.n = 0; newFahrplan(); }
      if (mode === 'zeichnen') newZeichnen();
    }
    // Auswahlfrage im Diagramm-Werkzeug: opts[0] ist richtig
    function mcHtml(opts) { return `<div class="opts">${shuffle(opts.map((t, j) => ({ t, j }))).map(o => `<button class="opt" data-dj="${o.j}">${esc(o.t)}</button>`).join('')}</div>`; }
    function uniqOpts(right, cands, n = 4) { const out = [right]; shuffle(cands).forEach(c => { if (out.length < n && !out.includes(c)) out.push(c); }); return out; }

    /* ---------- s-t-Diagramm lesen ---------- */
    const L = { n: 0 };
    const OPT = { w: 640, h: 420, l: 48, r: 18, t: 26, b: 42, x0: 0, x1: 2, y0: -40, y1: 60, dx: .1, dxM: .5, dy: 5, dyM: 10, xname: 'Zeit t in s', yname: 'Weg s in m' };
    function lineAt(m, t) { if (t < m.t0 - 1e-9 || t > m.t1 + 1e-9) return null; if (m.curve) { const u = (t - m.t0) / (m.t1 - m.t0); return m.s0 + (m.s1 - m.s0) * (1 - (1 - u) * (1 - u)); } return m.s0 + (m.s1 - m.s0) * (t - m.t0) / (m.t1 - m.t0); }
    function genMoves() {
      for (let k = 0; k < 5000; k++) {
        const ms = [];
        const curve = Math.random() < .7;
        for (let i = 0; i < 5; i++) {
          const t0 = rnd([0, 0, 0, .2, .3, .5]), t1 = rnd([1.5, 1.6, 1.8, 2]);
          const s0 = rnd([-20, -10, 0, 0, 10, 20]), s1 = rint(-6, 11) * 5;
          ms.push({ t0, t1, s0, s1, curve: false });
        }
        if (curve) Object.assign(ms[0], { t0: 0, s0: 0, s1: rnd([25, 30, 35]), t1: 1.8, curve: true });
        ms.forEach(m => m.v = (m.s1 - m.s0) / (m.t1 - m.t0));
        const lin = ms.filter(m => !m.curve);
        // gut lesbar: verschiedene Steigungen, keine fast waagrechten Linien (ausser genau 0)
        if (lin.some(m => m.v !== 0 && Math.abs(m.v) < 8)) continue;
        if (lin.some((a, i) => lin.some((b, j) => j > i && Math.abs(a.v - b.v) < 6))) continue;
        if (ms.some((a, i) => ms.some((b, j) => j > i && a.t0 === b.t0 && a.s0 === b.s0))) continue;
        if (!ms.some(m => m.v < 0)) continue;
        return shuffle(ms).map((m, i) => Object.assign(m, { id: i + 1 }));
      }
    }
    function questionsFor(ms) {
      const name = m => 'Bewegung ' + m.id, all = ms.map(name), lin = ms.filter(m => !m.curve), Q = [];
      const uni = (q, f, e) => { const hit = ms.filter(f); if (hit.length === 1) Q.push({ q, right: name(hit[0]), opts: uniqOpts(name(hit[0]), all), hl: [hit[0].id], e: e(hit[0]) }); };
      uni('Welche Bewegung startet beim Punkt 0/0?', m => m.t0 === 0 && m.s0 === 0, m => `${name(m)} beginnt bei 0 s und 0 m.`);
      uni('Welche Bewegung läuft nicht vollständig regelmässig ab?', m => m.curve, m => `${name(m)} ist keine Gerade, sondern eine Kurve. Sie wird immer flacher, also langsamer.`);
      uni('Welche Bewegung verläuft rückwärts?', m => m.v < 0, m => `Die Linie von ${name(m)} fällt: Die Position wird mit der Zeit kleiner.`);
      uni('Welche Bewegung steht still?', m => !m.curve && m.v === 0, m => `${name(m)} ist waagrecht: Die Zeit läuft, der Ort bleibt gleich.`);
      uni('Welche Bewegung startet hinter dem Startpunkt 0 m?', m => m.s0 < 0, m => `${name(m)} beginnt bei ${fmt(m.s0)} m, also hinter 0 m.`);
      uni('Welche Bewegung endet hinter dem Startpunkt 0 m?', m => m.s1 < 0, m => `${name(m)} endet bei ${fmt(m.s1)} m, also hinter 0 m.`);
      uni('Welche Bewegung startet nicht bei Sekunde 0?', m => m.t0 > 0, m => `${name(m)} beginnt erst bei ${fmt(m.t0, 1)} s.`);
      uni('Welche Bewegung startet nicht bei Meter 0?', m => m.s0 !== 0, m => `${name(m)} beginnt bei ${fmt(m.s0)} m.`);
      const sp = [...lin].sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
      if (sp.length > 1 && Math.abs(sp[0].v) - Math.abs(sp[1].v) >= 6) Q.push({ q: 'Welche Bewegung läuft am schnellsten ab?', right: name(sp[0]), opts: uniqOpts(name(sp[0]), all), hl: [sp[0].id], e: `${name(sp[0])} hat die steilste Gerade: ${fmt(Math.abs(sp[0].s1 - sp[0].s0))} m in ${fmt(sp[0].t1 - sp[0].t0, 1)} s, das sind ${fmt(Math.abs(sp[0].v), 1)} m/s.` });
      const du = [...ms].sort((a, b) => (b.t1 - b.t0) - (a.t1 - a.t0));
      if ((du[0].t1 - du[0].t0) - (du[1].t1 - du[1].t0) >= .1) Q.push({ q: 'Welche Bewegung dauert am längsten?', right: name(du[0]), opts: uniqOpts(name(du[0]), all), hl: [du[0].id], e: `${name(du[0])} dauert von ${fmt(du[0].t0, 1)} s bis ${fmt(du[0].t1, 1)} s, also ${fmt(du[0].t1 - du[0].t0, 1)} s.` });
      // Geschwindigkeit einer Geraden
      const m = rnd(lin.filter(x => x.v !== 0));
      if (m) {
        const v = fmt(m.v, 1) + ' m/s';
        Q.push({ q: `Wie schnell ist ${name(m)}?`, right: v, opts: uniqOpts(v, [fmt(-m.v, 1) + ' m/s', fmt(m.s1 - m.s0) + ' m/s', fmt(m.v / 2, 1) + ' m/s', fmt(m.v * 2, 1) + ' m/s']), hl: [m.id], e: `v = s : t = ${fmt(m.s1 - m.s0)} m : ${fmt(m.t1 - m.t0, 1)} s = ${v}.${m.v < 0 ? ' Rückwärts, darum mit Minus.' : ''}` });
      }
      // Ort zu einer Zeit ablesen
      const cand = [];
      lin.forEach(x => { for (let t = Math.ceil(x.t0 * 10) / 10 + .1; t < x.t1 - .05; t += .1) { const s = lineAt(x, t); if (Math.abs(s / 5 - Math.round(s / 5)) < 1e-6) cand.push([x, Math.round(t * 10) / 10, Math.round(s)]); } });
      if (cand.length) {
        const [x, t, s] = rnd(cand);
        Q.push({ q: `Wo ist ${name(x)} bei Sekunde ${fmt(t, 1)}?`, right: fmt(s) + ' m', opts: uniqOpts(fmt(s) + ' m', [fmt(s + 5) + ' m', fmt(s - 5) + ' m', fmt(s + 10) + ' m', fmt(s - 10) + ' m']), hl: [x.id], e: `Bei ${fmt(t, 1)} s senkrecht hinauf bis zur Linie, dann waagrecht zur y-Achse: ${fmt(s)} m.` });
      }
      // Schnittpunkte: gleichauf
      const cuts = [];
      lin.forEach((a, i) => lin.forEach((b, j) => {
        if (j <= i || a.v === b.v) return;
        const t = (b.s0 - a.s0 + a.v * a.t0 - b.v * b.t0) / (a.v - b.v);
        if (t > Math.max(a.t0, b.t0) + .05 && t < Math.min(a.t1, b.t1) - .05) cuts.push({ a, b, t, s: lineAt(a, t) });
      }));
      if (cuts.length) {
        const c = rnd(cuts), tt = Math.round(c.t * 20) / 20, others = cuts.filter(x => x !== c && (x.a === c.a || x.b === c.a) && Math.abs(x.t - c.t) < .2);
        if (!others.length) Q.push({ q: `Welche Bewegung ist bei Sekunde ${fmt(tt)} gleichauf mit ${name(c.a)}?`, right: name(c.b), opts: uniqOpts(name(c.b), all.filter(n => n !== name(c.a))), hl: [c.a.id, c.b.id], e: `Die Linien von ${name(c.a)} und ${name(c.b)} schneiden sich bei etwa ${fmt(c.t, 2)} s und ${fmt(c.s, 0)} m. Dort sind beide am gleichen Ort.` });
        const fast = Math.abs(c.a.v) > Math.abs(c.b.v) ? c.a : c.b, slow = fast === c.a ? c.b : c.a;
        if (fast.v > 0 && slow.v >= 0 && fast.t0 >= slow.t0) {
          const r = fmt(Math.round(c.t * 10) / 10, 1) + ' s';
          Q.push({ q: `Bei welcher Sekunde hat ${name(fast)} ${name(slow)} ungefähr eingeholt?`, right: r, opts: uniqOpts(r, [-.4, -.2, .2, .4].map(d => fmt(Math.round(c.t * 10) / 10 + d, 1) + ' s').filter(s => !s.startsWith('−') && s !== '0 s')), hl: [fast.id, slow.id], e: `Im Schnittpunkt der beiden Linien bei etwa ${fmt(c.t, 2)} s holt ${name(fast)} ${name(slow)} ein.` });
        }
      }
      return Q;
    }
    function drawMoves(svg, ms, hl) {
      svgClear(svg);
      const { X, Y } = axes(svg, OPT);
      ms.forEach(m => {
        const pts = [];
        for (let i = 0; i <= 30; i++) { const t = m.t0 + (m.t1 - m.t0) * i / 30; pts.push(`${X(t).toFixed(1)},${Y(lineAt(m, t)).toFixed(1)}`); }
        el('polyline', { points: pts.join(' '), class: `dg-line c${m.id}${hl ? (hl.includes(m.id) ? ' hl' : ' dim') : ''}` }, svg);
        txt(svg, X(m.t1) + (m.t1 > 1.9 ? -8 : 8), Y(m.s1) - 6, String(m.id), `dg-num c${m.id}`);
      });
    }
    function newLesen() {
      L.ms = genMoves(); L.qs = shuffle(questionsFor(L.ms)); L.n = 0;
      askLesen();
    }
    function askLesen() {
      if (!L.qs.length || L.n >= 6) { newLesen(); return; }
      const q = L.qs.shift(); L.q = q; L.n++; L.done = false;
      $('#dBox').innerHTML = `<p class="task">${esc(q.q)}</p><div class="plot"><svg id="dSvg" class="plotbox" role="img" aria-label="s-t-Diagramm mit fünf Bewegungen"></svg></div>${mcHtml(q.opts)}<div id="dFb" aria-live="polite"></div>`;
      drawMoves($('#dSvg'), L.ms);
    }

    /* ---------- Grafischer Fahrplan ---------- */
    const F = { n: 0 };
    const uhr = m => `${8 + Math.floor(m / 60)}.${String(m % 60).padStart(2, '0')} Uhr`;
    function genFahrplan() {
      const km = rnd([[0, 5, 9, 15, 20], [0, 4, 10, 13, 19], [0, 6, 9, 14, 21]]);
      const st = ['A', 'B', 'C', 'D', 'E'].map((n, i) => ({ n: 'Station ' + n, km: km[i] }));
      const trains = [];
      const regio = (dep, dir, from, to) => {
        const seq = dir > 0 ? st.slice(from, to + 1) : st.slice(to, from + 1).reverse();
        const pts = [[dep, seq[0].km]], stops = {};
        let t = dep;
        seq.slice(1).forEach((s, i) => {
          t += Math.abs(s.km - seq[i].km); pts.push([t, s.km]);
          if (i < seq.length - 2) { const h = rnd([1, 1, 2, 2, 3]); stops[s.n] = { an: t, ab: t + h, h }; t += h; pts.push([t, s.km]); }
        });
        return { dir, dep, pts, stops, seq, express: false, ab: { [seq[0].n]: dep }, an: Object.assign({ [seq[seq.length - 1].n]: t }, ...Object.entries(stops).map(([n, s]) => ({ [n]: s.an }))), end: t };
      };
      [rint(1, 5), rint(19, 24), rint(38, 43)].forEach(d => trains.push(regio(d, 1, 0, 4)));
      [rint(6, 10), rint(25, 30), rint(44, 48)].forEach(d => trains.push(regio(d, -1, 4, 0)));
      if (Math.random() < .6) trains.push(regio(rint(12, 16), 1, 2, 4)); // fährt nur einen Teil der Strecke
      const ex = rint(10, 14), tot = Math.round(km[4] / 1.5);
      trains.push({ dir: 1, dep: ex, pts: [[ex, 0], [ex + tot, km[4]]], stops: {}, seq: st, express: true, ab: { [st[0].n]: ex }, an: { [st[4].n]: ex + tot }, end: ex + tot });
      Object.values(trains).forEach(t => { t.ab = Object.assign({}, t.ab); t.seq.forEach(s => { if (t.stops[s.n]) t.ab[s.n] = t.stops[s.n].ab; }); });
      return { st, trains };
    }
    function trainAt(tr, t) { const p = tr.pts; if (t < p[0][0] || t > p[p.length - 1][0]) return null; for (let i = 1; i < p.length; i++) if (t <= p[i][0]) { const [t0, s0] = p[i - 1], [t1, s1] = p[i]; return t1 === t0 ? s1 : s0 + (s1 - s0) * (t - t0) / (t1 - t0); } return null; }
    function crossing(a, b) {
      let prev = null;
      for (let t = Math.max(a.dep, b.dep); t <= Math.min(a.end, b.end); t += .05) {
        const d = trainAt(a, t) - trainAt(b, t);
        if (prev !== null && Math.sign(d) !== Math.sign(prev)) return { t, s: trainAt(a, t) };
        prev = d;
      }
      return null;
    }
    function fahrplanQs(P) {
      const Q = [], regios = P.trains.filter(t => !t.express && t.seq.length === 5), name = t => `der Zug, der um ${uhr(t.dep)} in ${t.seq[0].n} abfährt`;
      const tOpts = (m, ds = [-3, -2, 2, 3, 5]) => uniqOpts(uhr(m), ds.map(d => m + d).filter(x => x >= 0 && x < 60).map(uhr));
      const halte = regios.flatMap(t => t.seq.slice(1, 4).filter(s => t.stops[s.n].ab <= 58).map(s => [t, s]));
      // Ankunft
      { const [t, s] = rnd(halte); const m = t.stops[s.n].an;
        Q.push({ q: `Wann kommt ${name(t)} in ${s.n} an?`, right: uhr(m), opts: tOpts(m), hl: [t], e: `Folge der Linie dieses Zuges bis zur Linie von ${s.n} und lies darunter die Zeit ab: ${uhr(m)}.` }); }
      // Haltezeit
      { const [t, s] = rnd(halte), h = t.stops[s.n].h;
        Q.push({ q: `Wie lange hält ${name(t)} in ${s.n} ungefähr?`, right: `${h} min`, opts: uniqOpts(`${h} min`, ['1 min', '2 min', '3 min', 'Er hält dort nicht.']), hl: [t], e: `Bei ${s.n} ist die Linie ${h} min lang waagrecht (${uhr(t.stops[s.n].an)} bis ${uhr(t.stops[s.n].ab)}). Waagrecht heisst: Der Zug steht.` }); }
      // Nächster Zug in gleicher Richtung
      { const dir = rnd([1, -1]), list = regios.filter(t => t.dir === dir), s = rnd(list[0].seq.slice(1, 4));
        const deps = P.trains.filter(t => t.dir === dir && t.ab[s.n] != null).map(t => ({ t, m: t.ab[s.n] })).sort((a, b) => a.m - b.m);
        if (deps.length >= 2 && deps[1].m <= 58) {
          const [a, b] = deps;
          Q.push({ q: `Jemand verpasst in ${s.n} den Zug, der dort um ${uhr(a.m)} abfährt. Wann fährt der nächste Zug in dieselbe Richtung ab?`, right: uhr(b.m), opts: tOpts(b.m, [-4, -2, 3, 6]), hl: [b.t], e: `Die nächste Linie in derselben Richtung, die bei ${s.n} hält, fährt dort um ${uhr(b.m)} ab.${P.trains.some(t => t.express) ? ' Der Schnellzug hält in ' + s.n + ' nicht.' : ''}` });
        } }
      // Kreuzung
      { const t = rnd(regios), opp = P.trains.filter(o => o.dir !== t.dir).map(o => ({ o, c: crossing(t, o) })).filter(x => x.c).sort((a, b) => a.c.t - b.c.t);
        if (opp.length && opp[0].c.t <= 58) { const m = Math.round(opp[0].c.t); Q.push({ q: `Wann kreuzt ${name(t)} zum ersten Mal einen Zug der Gegenrichtung?`, right: uhr(m), opts: tOpts(m, [-4, -2, 2, 4]), hl: [t, opp[0].o], e: `Die Linie des Zuges schneidet die erste fallende bzw. steigende Linie der Gegenrichtung bei etwa ${uhr(m)}. Dort sind beide Züge am gleichen Ort.` }); } }
      // Schnellster Zug
      { const ex = P.trains.find(t => t.express);
        if (ex) Q.push({ q: 'Welcher Zug ist am schnellsten unterwegs?', right: `Abfahrt ${uhr(ex.dep)} in ${ex.seq[0].n}`, opts: uniqOpts(`Abfahrt ${uhr(ex.dep)} in ${ex.seq[0].n}`, regios.map(t => `Abfahrt ${uhr(t.dep)} in ${t.seq[0].n}`)), hl: [ex], e: `Dieser Zug hat die steilste Linie und hält unterwegs nie. Er braucht für ${P.st[4].km} km nur ${ex.end - ex.dep} min.` });
        if (ex) { const v = Math.round(P.st[4].km / ((ex.end - ex.dep) / 60)); Q.push({ q: `Wie schnell fährt der Zug, der um ${uhr(ex.dep)} in ${ex.seq[0].n} abfährt und nirgends hält? (Strecke an der y-Achse, Fahrzeit an der x-Achse)`, right: `${v} km/h`, opts: uniqOpts(`${v} km/h`, [`${Math.round(v * .67)} km/h`, `${P.st[4].km} km/h`, `${ex.end - ex.dep} km/h`, `${Math.round(v * 1.5)} km/h`]), hl: [ex], e: `s = ${P.st[4].km} km, t = ${ex.end - ex.dep} min = ${fmt((ex.end - ex.dep) / 60)} h. v = s : t = ${P.st[4].km} km : ${fmt((ex.end - ex.dep) / 60)} h ≈ ${v} km/h.` }); } }
      // Teilstrecke
      { const part = P.trains.find(t => !t.express && t.seq.length < 5);
        Q.push({ q: 'Verkehren alle Züge auf der ganzen Strecke von Station A bis Station E?', right: part ? 'Nein, mindestens ein Zug fährt nur einen Teil der Strecke.' : 'Ja, alle Linien gehen von A bis E.', opts: part ? ['Nein, mindestens ein Zug fährt nur einen Teil der Strecke.', 'Ja, alle Linien gehen von A bis E.', 'Nein, kein Zug fährt bis E.'] : ['Ja, alle Linien gehen von A bis E.', 'Nein, mindestens ein Zug fährt nur einen Teil der Strecke.', 'Nein, kein Zug fährt bis E.'], hl: part ? [part] : [], e: part ? `Der Zug ab ${uhr(part.dep)} beginnt erst in ${part.seq[0].n}: Seine Linie startet nicht bei Station A.` : 'Alle Linien reichen von der untersten bis zur obersten Station.' }); }
      return Q;
    }
    function drawFahrplan(svg, P, hl) {
      svgClear(svg);
      const top = P.st[4].km;
      const { X, Y } = axes(svg, { w: 640, h: 380, l: 84, r: 24, t: 20, b: 40, x0: 0, x1: 60, y0: 0, y1: top, dx: 2, dxM: 10, dy: top, dyM: top, xlab: v => `${8 + Math.floor(v / 60)}.${String(v % 60).padStart(2, '0')}`, ylab: () => '', xname: 'Uhrzeit' });
      for (let m = 0; m <= 60; m++) el('line', { x1: X(m), y1: Y(0), x2: X(m), y2: Y(0) + (m % 10 === 0 ? 7 : 4), class: 'd-tick' }, svg);
      P.st.forEach(s => { el('line', { x1: X(0), y1: Y(s.km), x2: X(60), y2: Y(s.km), class: 'dg-station' }, svg); txt(svg, X(0) - 6, Y(s.km) + 4, s.n, 'dg-lab', 'end'); });
      P.trains.forEach(t => {
        const pts = t.pts.map(([m, k]) => [Math.min(m, 60), m > 60 ? trainAt(t, 60) : k]);
        el('polyline', { points: pts.map(([m, k]) => `${X(m).toFixed(1)},${Y(k).toFixed(1)}`).join(' '), class: 'dg-train' + (t.express ? ' express' : '') + (hl && hl.includes(t) ? ' hl' : '') }, svg);
      });
    }
    function newFahrplan() { F.P = genFahrplan(); F.qs = shuffle(fahrplanQs(F.P)); F.n = 0; askFahrplan(); }
    function askFahrplan() {
      if (!F.qs.length || F.n >= 6) { newFahrplan(); return; }
      const q = F.qs.shift(); F.q = q; F.n++; F.done = false;
      $('#dBox').innerHTML = `<p class="task">${esc(q.q)}</p><div class="plot"><svg id="dSvg" class="plotbox" role="img" aria-label="Grafischer Fahrplan mit fünf Stationen zwischen 8 und 9 Uhr"></svg></div><p class="note">Ein kleiner Strich auf der Zeitachse ist 1 Minute.</p>${mcHtml(q.opts)}<div id="dFb" aria-live="polite"></div>`;
      drawFahrplan($('#dSvg'), F.P);
    }

    // Antworten bei «lesen» und «fahrplan»
    $('#dBox').addEventListener('click', e => {
      if (e.target.id === 'dNext') { if (dg.mode === 'lesen') askLesen(); else askFahrplan(); return; }
      const b = e.target.closest('.opt[data-dj]'); if (!b || (dg.mode !== 'lesen' && dg.mode !== 'fahrplan')) return;
      const S = dg.mode === 'lesen' ? L : F; if (S.done) return;
      const ok = b.dataset.dj === '0'; S.done = true;
      $$('#dBox .opt[data-dj]').forEach(o => { o.disabled = true; if (o.dataset.dj === '0') o.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      dRecord(dg.mode === 'lesen' ? 'd1' : 'd2', ok);
      if (dg.mode === 'lesen') drawMoves($('#dSvg'), L.ms, S.q.hl); else drawFahrplan($('#dSvg'), F.P, S.q.hl);
      $('#dFb').innerHTML = fb(ok, `${ok ? '' : `Richtig ist: <b>${esc(S.q.right)}</b>. `}${esc(S.q.e)}`) + '<div class="row" style="margin-top:12px"><button class="btn primary" id="dNext">Nächste Frage</button></div>';
      $('#dNext').focus({ preventScroll: true });
    });

    /* ---------- Zeichnen: s-t-Diagramm und v-t-Diagramm ---------- */
    const Z = {};
    const ST = { w: 640, h: 440, l: 46, r: 16, t: 26, b: 42, x0: 0, x1: 8, y0: -5, y1: 8, dx: .5, dxM: 1, dy: .5, dyM: 1, xname: 'Zeit t in s', yname: 'Weg s in m' };
    const VT = { w: 640, h: 330, l: 46, r: 16, t: 26, b: 42, x0: 0, x1: 8, y0: -5, y1: 5, dx: .5, dxM: 1, dy: .5, dyM: 1, xname: 'Zeit t in s', yname: 'Geschwindigkeit v in m/s' };
    const VTS = Object.assign({}, VT, { w: 320, h: 240, l: 30, r: 8, t: 18, b: 28, xname: '', yname: 'v in m/s' });
    function genBewegung() {
      for (let k = 0; k < 5000; k++) {
        const t0 = rnd([0, 0, 0, 1, 2]), s0 = rnd([-2, -1, 0, 0, 2, 3, 5]);
        const n = rnd([2, 3, 3]), segs = [];
        let t = t0, s = s0, okk = true;
        for (let i = 0; i < n; i++) {
          const typ = (i > 0 && segs[i - 1].typ === 'steh') ? rnd(['vor', 'zur']) : rnd(['vor', 'vor', 'zur', 'zur', 'steh']);
          const dur = rnd([1, 1.5, 2, 2, 2.5, 3]), d = typ === 'steh' ? 0 : rnd([1, 1.5, 2, 2.5, 3, 4, 5]) * (typ === 'zur' ? -1 : 1);
          if (Math.abs(d / dur) > 5) { okk = false; break; }
          segs.push({ typ, dur, d, v: d / dur }); t += dur; s += d;
          if (s < -5 || s > 8 || t > 8) { okk = false; break; }
        }
        if (!okk || !segs.some(x => x.typ === 'zur') || segs.every(x => x.typ === 'steh')) continue;
        const pts = [[t0, s0]]; segs.forEach(g => { const [pt, ps] = pts[pts.length - 1]; pts.push([pt + g.dur, ps + g.d]); });
        return { t0, s0, segs, pts, wer: rnd(['Der Wagen', 'Der Löwe', 'Das Spielzeugauto']) };
      }
    }
    function beschreibung(B) {
      const part = g => g.typ === 'steh' ? `bleibt ${fmt(g.dur, 1)} s lang stehen` : `${B.wer === 'Der Löwe' ? 'geht' : 'fährt'} in ${fmt(g.dur, 1)} s ${fmt(Math.abs(g.d), 1)} m ${g.typ === 'vor' ? 'vorwärts' : 'rückwärts'}`;
      const ps = B.segs.map(part);
      const dann = (x, w) => x.replace(/^(fährt|geht|bleibt)/, '$1 ' + w);
      const satz = ps.length === 2 ? `Er ${ps[0]} und ${dann(ps[1], 'dann')}.` : `Er ${ps[0]}, ${dann(ps[1], 'dann')} und ${dann(ps[2], 'schliesslich')}.`;
      return `${B.wer} startet ${B.t0 ? `ab Sekunde ${B.t0} ` : ''}bei Meter ${fmt(B.s0)}. ${satz.replace(/^Er/, B.wer === 'Das Spielzeugauto' ? 'Es' : 'Er')}`;
    }
    function drawST(svg, mine, correct) {
      svgClear(svg);
      const { X, Y } = axes(svg, ST);
      if (correct) el('polyline', { points: correct.map(([t, s]) => `${X(t)},${Y(s)}`).join(' '), class: 'dg-line ok' }, svg);
      if (mine.length > 1) el('polyline', { points: mine.map(([t, s]) => `${X(t)},${Y(s)}`).join(' '), class: 'dg-line mine' }, svg);
      mine.forEach(([t, s]) => el('circle', { cx: X(t), cy: Y(s), r: 5, class: 'dg-pt' }, svg));
      const hit = el('rect', { x: X(ST.x0) - 8, y: Y(ST.y1) - 8, width: X(ST.x1) - X(ST.x0) + 16, height: Y(ST.y0) - Y(ST.y1) + 16, class: 'dg-hit' }, svg);
      return { X, Y, hit };
    }
    function vtPath(X, Y, vs, t0, cls) {
      // «Skyline»: waagrechte Stücke, senkrechte Sprünge bei den Wechseln
      const pts = []; let t = t0;
      vs.forEach(([v, dur]) => { pts.push([t, v], [t + dur, v]); t += dur; });
      return `<polyline class="${cls}" points="${pts.map(([a, b]) => `${X(a).toFixed(1)},${Y(b).toFixed(1)}`).join(' ')}"/>`;
    }
    function vtSvg(o, draw) {
      const svg = document.createElementNS(api.NS, 'svg'); svg.setAttribute('class', 'plotbox');
      const { X, Y } = axes(svg, o); svg.insertAdjacentHTML('beforeend', draw(X, Y)); return svg;
    }
    function newZeichnen() {
      const B = genBewegung(); Object.assign(Z, { B, mine: [], step: 1 });
      $('#dBox').innerHTML = `<div class="desc">${esc(beschreibung(B))}</div>
        <div class="tool-step" id="zs1"><p class="step-h"><span>1</span>Zeichne die Bewegung im s-t-Diagramm.</p>
          <p class="note">Tippe zuerst auf den Startpunkt, dann auf das Ende jeder Teilbewegung. Die Punkte rasten auf halbe Sekunden und halbe Meter ein.</p>
          <div class="plot"><svg id="zSt" class="plotbox" role="img" aria-label="Leeres s-t-Diagramm zum Zeichnen"></svg></div>
          <div class="row"><span class="note" id="zLast">Noch kein Punkt gesetzt.</span></div>
          <div class="row"><button class="btn" id="zUndo">Letzten Punkt löschen</button><button class="btn primary" id="zCheck1">s-t-Diagramm prüfen</button></div>
          <div id="zFb1" aria-live="polite"></div></div>
        <div class="tool-step" id="zs2" hidden></div>
        <div class="tool-step" id="zs3" hidden></div>`;
      redrawST();
    }
    function redrawST(correct) {
      const svg = $('#zSt'), { X, Y, hit } = drawST(svg, Z.mine, correct);
      if (Z.step !== 1) return;
      hit.addEventListener('click', e => {
        const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
        const t = Math.round(((p.x - X(0)) / (X(1) - X(0))) * 2) / 2, s = Math.round(((p.y - Y(0)) / (Y(1) - Y(0))) * 2) / 2;
        if (t < ST.x0 || t > ST.x1 || s < ST.y0 || s > ST.y1) return;
        if (Z.mine.length && t < Z.mine[Z.mine.length - 1][0]) { $('#zLast').textContent = 'Die Zeit läuft nur vorwärts: Der nächste Punkt muss weiter rechts liegen.'; return; }
        Z.mine.push([t, s]); $('#zLast').textContent = `Punkt ${Z.mine.length}: (${fmt(t, 1)} s | ${fmt(s, 1)} m)`; redrawST();
      });
    }
    function checkStep1() {
      const B = Z.B, want = B.pts, mine = Z.mine;
      const same = (a, b) => Math.abs(a[0] - b[0]) < 1e-6 && Math.abs(a[1] - b[1]) < 1e-6;
      const ok = mine.length === want.length && want.every((p, i) => same(p, mine[i]));
      const notes = [];
      if (!mine.length) notes.push('Du hast noch keinen Punkt gesetzt.');
      else {
        if (!same(mine[0], want[0])) notes.push(`Der Start ist bei (${fmt(want[0][0], 1)} s | ${fmt(want[0][1], 1)} m)${B.t0 ? ': Die Bewegung beginnt erst ab Sekunde ' + B.t0 : ''}.`);
        want.slice(1).forEach((p, i) => { if (!mine[i + 1] || !same(mine[i + 1], p)) notes.push(`Ende Teilbewegung ${i + 1}: (${fmt(p[0], 1)} s | ${fmt(p[1], 1)} m).`); });
        if (mine.length > want.length) notes.push(`Es braucht nur ${want.length} Punkte: den Start und das Ende jeder Teilbewegung.`);
      }
      Z.step = 2; dRecord('d3', ok); redrawST(want);
      ['zUndo', 'zCheck1'].forEach(id => $('#' + id).disabled = true);
      $('#zFb1').innerHTML = fb(ok, ok ? 'Alle Punkte stimmen. Die grün gestrichelte Linie ist die Lösung.' : `Die grün gestrichelte Linie ist die Lösung. ${notes.map(esc).join(' ')}`);
      const s2 = $('#zs2'); s2.hidden = false;
      s2.innerHTML = `<p class="step-h"><span>2</span>Berechne für jede Teilbewegung die Geschwindigkeit in m/s.</p>
        <p class="note">v = s : t. Rückwärts bekommt ein Minus, Stehenbleiben ist 0 m/s. Zwei Kommastellen genügen.</p>
        <div class="vrow">${B.segs.map((g, i) => `<label>v<sub>${i + 1}</sub> = <input class="num-in" data-v="${i}" inputmode="decimal" autocomplete="off"> m/s</label>`).join('')}</div>
        <div class="row"><button class="btn primary" id="zCheck2">Geschwindigkeiten prüfen</button></div><div id="zFb2" aria-live="polite"></div>`;
      $('[data-v="0"]', s2).focus({ preventScroll: true });
    }
    function checkStep2() {
      const B = Z.B, ins = $$('#zs2 [data-v]');
      const res = B.segs.map((g, i) => { const v = parseNum(ins[i].value); return !isNaN(v) && Math.abs(v - g.v) <= .05 + 1e-9; });
      const ok = res.every(Boolean); dRecord('d3', ok); Z.step = 3;
      ins.forEach((x, i) => { x.disabled = true; x.style.borderColor = res[i] ? 'var(--ok)' : 'var(--bad)'; });
      $('#zCheck2').disabled = true;
      $('#zFb2').innerHTML = fb(ok, B.segs.map((g, i) => g.typ === 'steh' ? `v<sub>${i + 1}</sub> = 0 m/s (steht).` : `v<sub>${i + 1}</sub> = ${fmt(g.d, 1)} m : ${fmt(g.dur, 1)} s = <b>${fmt(g.v)} m/s</b>${g.d < 0 ? ' (rückwärts, Minus)' : ''}.`).join(' '));
      // Schritt 3: richtiges v-t-Diagramm wählen
      const vs = B.segs.map(g => [g.v, g.dur]);
      const variants = [{ key: 'ok', why: 'Richtig: Jede Teilbewegung ist ein waagrechtes Stück auf der Höhe ihrer Geschwindigkeit, über dieselbe Zeitspanne wie im s-t-Diagramm.', draw: (X, Y) => vtPath(X, Y, vs, B.t0, 'dg-line c1') }];
      variants.push({ key: 'abs', why: 'Hier fehlt das Minus: Rückwärts muss die Linie unterhalb der Zeitachse liegen.', draw: (X, Y) => vtPath(X, Y, vs.map(([v, d]) => [Math.abs(v), d]), B.t0, 'dg-line c1') });
      variants.push({ key: 'st', why: 'Das ist das s-t-Diagramm, nicht das v-t-Diagramm. Im v-t-Diagramm stehen die Geschwindigkeiten als waagrechte Stücke.', draw: (X, Y) => `<polyline class="dg-line c1" points="${B.pts.map(([t, s]) => `${X(t).toFixed(1)},${Y(Math.max(-5, Math.min(5, s))).toFixed(1)}`).join(' ')}"/>` });
      const end = B.t0 + vs.reduce((a, [, d]) => a + d, 0), shift = end + 1 <= 8 ? 1 : B.t0 >= 1 ? -1 : 0;
      if (shift) variants.push({ key: 'shift', why: 'Die Zeiten sind verschoben: Die Wechsel müssen genau zur gleichen Zeit sein wie im s-t-Diagramm.', draw: (X, Y) => vtPath(X, Y, vs, B.t0 + shift, 'dg-line c1') });
      const pick = [variants[0], ...shuffle(variants.slice(1).filter(v => v.key !== 'abs' || B.segs.some(g => g.v < 0))).slice(0, 2)];
      Z.variants = shuffle(pick);
      const s3 = $('#zs3'); s3.hidden = false;
      s3.innerHTML = `<p class="step-h"><span>3</span>Welches v-t-Diagramm gehört zu dieser Bewegung?</p><div class="choice-plots" id="zChoices"></div><div id="zFb3" aria-live="polite"></div>`;
      Z.variants.forEach((v, i) => { const b = document.createElement('button'); b.className = 'opt'; b.dataset.zv = i; b.setAttribute('aria-label', 'v-t-Diagramm ' + (i + 1)); b.appendChild(vtSvg(VTS, v.draw)); $('#zChoices').appendChild(b); });
    }
    $('#dBox').addEventListener('click', e => {
      if (dg.mode !== 'zeichnen') return;
      if (e.target.id === 'zUndo') { Z.mine.pop(); $('#zLast').textContent = Z.mine.length ? `Punkt ${Z.mine.length}: (${fmt(Z.mine[Z.mine.length - 1][0], 1)} s | ${fmt(Z.mine[Z.mine.length - 1][1], 1)} m)` : 'Noch kein Punkt gesetzt.'; redrawST(); return; }
      if (e.target.id === 'zCheck1') { checkStep1(); return; }
      if (e.target.id === 'zCheck2') { checkStep2(); return; }
      if (e.target.id === 'zNew') { newZeichnen(); return; }
      const b = e.target.closest('[data-zv]'); if (!b || Z.step !== 3) return;
      Z.step = 4;
      const v = Z.variants[+b.dataset.zv], ok = v.key === 'ok';
      $$('#zChoices [data-zv]').forEach(o => { o.disabled = true; if (Z.variants[+o.dataset.zv].key === 'ok') o.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      dRecord('d3', ok);
      $('#zFb3').innerHTML = fb(ok, esc(ok ? v.why : v.why + ' ' + Z.variants.find(x => x.key === 'ok').why.replace('Richtig: ', 'Das richtige Diagramm: '))) + '<div class="row" style="margin-top:12px"><button class="btn primary" id="zNew">Neue Bewegung</button></div>';
    });
    $('#dBox').addEventListener('keydown', e => {
      if (e.key !== 'Enter' || !e.target.matches('#zs2 [data-v]')) return;
      e.preventDefault(); const ins = $$('#zs2 [data-v]'), i = ins.indexOf(e.target);
      if (i < ins.length - 1) ins[i + 1].focus(); else $('#zCheck2').click();
    });

    startD('lesen');
    return {};
  }
});
