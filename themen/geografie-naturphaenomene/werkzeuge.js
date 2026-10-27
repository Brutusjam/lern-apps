/* Werkzeuge der Geografie-App: Zeichnungen fürs Bild-Quiz, Mäander, Gefälle-Labor, Gezeiten, Hochwasser Uri.
   Das HTML dazu steht in index.html (#vorlagen), der Inhalt in inhalt.js. */
LernApp.werkzeug({
  init(api) {
    const { $, $$, el, esc, shuffle, record, reduced } = api;

    /* ---------- Zeichnungen fürs Bild-Quiz ---------- */
    const LOOPS = [{ cx: 410, d: 1 }, { cx: 510, d: -1 }, { cx: 610, d: 1 }, { cx: 710, d: -1 }];
    function arcPath(cx, cy, r, a0, a1) {
      const p = a => [(cx + r * Math.cos(a * Math.PI / 180)).toFixed(1), (cy + r * Math.sin(a * Math.PI / 180)).toFixed(1)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `M${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1}`;
    }
    function drawMapDetails() {
      const banks = $('#banks'), spots = $('#bankSpots');
      LOOPS.forEach(({ cx, d }) => {
        const [a0, a1] = d > 0 ? [30, 150] : [210, 330];
        el('path', { d: arcPath(cx, 300, 42, a0 + 8, a1 - 8), class: 'm-sandline' }, banks);
        el('path', { d: arcPath(cx, 300, 58, a0 - 10, a1 + 10), class: 'm-steep' }, banks);
        el('path', { d: arcPath(cx, 300, 64, a0, a1), class: 'hs hs-stroke', 'data-spot': 'prallhang' }, spots);
        el('path', { d: arcPath(cx, 300, 37, a0, a1), class: 'hs hs-stroke', 'data-spot': 'gleithang' }, spots);
      });
      // Hangschraffen im V-Tal
      const v = $('#vtalLine'), L = v.getTotalLength(), h = $('#hach');
      for (let s = 14; s < L - 4; s += 7) {
        const p = v.getPointAtLength(s), q = v.getPointAtLength(s + 1);
        let nx = -(q.y - p.y), ny = q.x - p.x; const m = Math.hypot(nx, ny); nx /= m; ny /= m;
        [1, -1].forEach(k => el('line', { x1: p.x + k * nx * 7, y1: p.y + k * ny * 7, x2: p.x + k * nx * 18, y2: p.y + k * ny * 18, class: 'm-hach' }, h));
      }
      // Berg-Signaturen
      const mtn = $('#mtn'), g = $('#glyphs'), riv = $('#river');
      const avoid = [];
      const rl = riv.getTotalLength();
      for (let s = 0; s < rl * 0.32; s += 6) { const p = riv.getPointAtLength(s); avoid.push([p.x, p.y]); }
      for (let y = 0; y < 165; y += 6) avoid.push([520 + (y > 120 ? -5 : 0), y]);
      let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      for (let y = 22; y < 260; y += 30) {
        for (let x = 18 + (y / 30 % 2) * 18; x < 800; x += 38) {
          const px = x + (rnd() - .5) * 14, py = y + (rnd() - .5) * 10;
          const pt = new DOMPoint(px, py + 8);
          let inside = false;
          try { inside = mtn.isPointInFill(pt) && mtn.isPointInFill(new DOMPoint(px, py + 18)); } catch (e) { inside = py < 160; }
          if (!inside) continue;
          if (avoid.some(([ax, ay]) => Math.hypot(ax - px, ay - py) < 30)) continue;
          const w = 9 + rnd() * 5, hgt = 9 + rnd() * 6;
          el('path', { d: `M${px - w},${py + 6} L${px},${py - hgt} L${px + w},${py + 6} Z`, class: 'm-glyph' }, g);
          el('path', { d: `M${px},${py - hgt} L${px + w},${py + 6} L${px + 2},${py + 6} Z`, class: 'm-glyph-shade' }, g);
        }
      }
    }
    function hachLine(parent, x1, y1, x2, y2, side) {
      const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy * side, ny = ux * side;
      for (let s = 4; s < L; s += 7) {
        const px = x1 + ux * s, py = y1 + uy * s;
        el('line', { x1: px + nx * 2, y1: py + ny * 2, x2: px + nx * 13, y2: py + ny * 13, class: 'm-hach' }, parent);
      }
    }
    function drawGlacierDetails() {
      const h = $('#gHach');
      hachLine(h, 288, 300, 238, 438, 1); hachLine(h, 442, 300, 472, 438, -1);
      hachLine(h, 660, 300, 668, 466, 1); hachLine(h, 696, 300, 706, 466, -1);
      const c = $('#gCrev');
      [214, 228, 242].forEach(y => [[306, 332], [366, 392], [398, 420]].forEach(([a, b]) =>
        el('path', { d: `M${a},${y} Q${(a + b) / 2},${y + 5} ${b},${y}`, class: 'g-crev' }, c)));
      [[318, 4], [327, 2], [336, 0], [392, 0], [401, -2], [410, -4]].forEach(([x, dx]) =>
        el('path', { d: `M${x},270 L${x - dx},292`, class: 'g-crev' }, c));
      const excl = ['#gGlacier', '#gValley', '#gLow', '#gSea'].map(id => $(id));
      const inside = (x, y) => excl.some(p => { try { return p.isPointInFill(new DOMPoint(x, y)); } catch (e) { return false; } });
      const g = $('#gGlyphs');
      let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      for (let y = 24; y < 470; y += 36) {
        for (let x = 16 + (y / 36 % 2) * 22; x < 800; x += 46) {
          const px = x + (rnd() - .5) * 12, py = y + (rnd() - .5) * 8;
          if ([[0, 0], [16, 0], [-16, 0], [0, 16], [0, -16], [12, 12], [-12, 12]].some(([dx, dy]) => inside(px + dx, py + dy))) continue;
          const w = 9 + rnd() * 5, hgt = 9 + rnd() * 6;
          el('path', { d: `M${px - w},${py + 6} L${px},${py - hgt} L${px + w},${py + 6} Z`, class: 'm-glyph' }, g);
          el('path', { d: `M${px},${py - hgt} L${px + w},${py + 6} L${px + 2},${py + 6} Z`, class: 'm-glyph-shade' }, g);
        }
      }
    }
    /* ---------- Mäander ---------- */
    const STAGES = [
      { w: .4, cap: '<b>1 · Leicht gewundener Fluss.</b> Schon in einer kleinen Kurve wird das Wasser nach aussen gedrückt.' },
      { w: 1.1, cap: '<b>2 · Kurven werden stärker.</b> Aussen am <b>Prallhang</b> fliesst das Wasser schneller und erodiert. Innen am <b>Gleithang</b> wird es langsamer und lagert Sand und Kies ab.' },
      { w: 1.7, cap: '<b>3 · Mäander.</b> Die Schlingen wachsen und wandern seitwärts. Der <b>Mäanderhals</b> wird immer schmaler.' },
      { w: 1.95, cap: '<b>4 · Kurz vor dem Durchbruch.</b> Nur noch ein schmaler Landstreifen trennt die beiden Flussstücke. Ein Hochwasser genügt.' },
      { w: 1.95, cut: true, cap: '<b>5 · Durchbruch, Altwasser.</b> Der Fluss nimmt den kürzeren Weg. Die alte Schlinge wird abgetrennt, ihre Enden verlanden. Zurück bleibt ein <b>Altwasser</b>.' }
    ];
    function sineCurve(omega) {
      const n = 600, waves = 1.5, ds = waves / n; let x = 0, y = 0; const pts = [[0, 0]];
      for (let i = 1; i <= n; i++) { const th = omega * Math.sin(2 * Math.PI * i / n * waves); x += Math.cos(th) * ds; y += Math.sin(th) * ds; pts.push([x, y]); }
      return pts;
    }
    function drawStage(i) {
      const st = STAGES[i], svg = $('#stageSvg'); svg.innerHTML = '';
      el('rect', { width: 580, height: 270, class: 'stage-land' }, svg);
      let pts = sineCurve(st.w);
      const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
      const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
      const sc = Math.min(460 / (maxx - minx), 190 / (maxy - miny || 1));
      const ox = 290 - (minx + maxx) / 2 * sc, oy = 140 - (miny + maxy) / 2 * sc;
      pts = pts.map(([x, y]) => [x * sc + ox, y * sc + oy]);
      const P = arr => arr.map((p, k) => (k ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
      const first = pts[0], last = pts[pts.length - 1];
      const lead = (a, b) => el('path', { d: `M${a[0]},${a[1]} L${b[0]},${b[1]}`, class: 'm-river' }, svg);
      lead([0, first[1]], first); lead(last, [580, last[1]]);
      const n = pts.length - 1;
      // Scheitel der mittleren Schlinge (nach oben)
      let ai = Math.round(n / 3); for (let k = Math.round(n / 3); k < Math.round(2 * n / 3); k++) if (pts[k][1] < pts[ai][1]) ai = k;
      if (!st.cut) {
        if (i >= 1) el('path', { d: P(pts.slice(ai - 40, ai + 41).map(([x, y]) => [x, y + 10])), class: 'm-sandline', style: 'stroke-width:8' }, svg);
        el('path', { d: P(pts), class: 'm-river' }, svg);
        if (i >= 1) {
          const [x, y] = pts[ai];
          el('text', { x, y: y - 14, 'text-anchor': 'middle', class: 'stage-label' }, svg).textContent = 'Prallhang';
          el('text', { x, y: y + 34, 'text-anchor': 'middle', class: 'stage-label' }, svg).textContent = 'Gleithang';
        }
        if (i >= 2) {
          let bi = 0, bj = 0, bd = 1e9;
          for (let a = Math.round(n / 6); a < ai - n / 10; a += 3) for (let b = Math.round(ai + n / 10); b < Math.round(5 * n / 6); b += 3) { const d = Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1]); if (d < bd) { bd = d; bi = a; bj = b; } }
          const mx = (pts[bi][0] + pts[bj][0]) / 2, my = (pts[bi][1] + pts[bj][1]) / 2;
          el('text', { x: mx, y: my + 40, 'text-anchor': 'middle', class: 'stage-label dim' }, svg).textContent = 'Mäanderhals';
          el('line', { x1: mx, y1: my + 26, x2: mx, y2: my + 8, stroke: 'var(--muted)', 'stroke-width': 1.2 }, svg);
        }
      } else {
        let bi = 0, bj = 0, bd = 1e9;
        for (let a = Math.round(n / 6); a < ai - n / 10; a++) for (let b = Math.round(ai + n / 10); b < Math.round(5 * n / 6); b += 2) { const d = Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1]); if (d < bd) { bd = d; bi = a; bj = b; } }
        const ox2 = pts.slice(bi + 22, bj - 21);
        el('path', { d: P([ox2[0], ...ox2, ox2[ox2.length - 1]]), class: 'm-sandline', style: 'stroke-width:13;opacity:.7' }, svg);
        el('path', { d: P(ox2), class: 'm-river', style: 'opacity:.75' }, svg);
        const k = 14, A = pts[bi - k], B = pts[bj + k], ta = [A[0] - pts[bi - k - 4][0], A[1] - pts[bi - k - 4][1]], tb = [pts[bj + k + 4][0] - B[0], pts[bj + k + 4][1] - B[1]];
        const na = Math.hypot(...ta), nb = Math.hypot(...tb), L = Math.max(18, bd * 1.2);
        el('path', { d: P(pts.slice(0, bi - k + 1)) + `C${(A[0] + ta[0] / na * L).toFixed(1)},${(A[1] + ta[1] / na * L).toFixed(1)} ${(B[0] - tb[0] / nb * L).toFixed(1)},${(B[1] - tb[1] / nb * L).toFixed(1)} ${B[0].toFixed(1)},${B[1].toFixed(1)}` + P(pts.slice(bj + k)).replace(/^M/, 'L'), class: 'm-river' }, svg);
        const [x, y] = pts[ai];
        el('text', { x, y: y + 34, 'text-anchor': 'middle', class: 'stage-label' }, svg).textContent = 'Altwasser';
        const mx = (pts[bi][0] + pts[bj][0]) / 2, my = (pts[bi][1] + pts[bj][1]) / 2;
        el('text', { x: mx + 62, y: my + 20, 'text-anchor': 'start', class: 'stage-label dim' }, svg).textContent = '← Durchbruch';
      }
      el('text', { x: 12, y: 258, class: 'm-caption' }, svg).textContent = 'Fliessrichtung →';
      $('#stageCap').innerHTML = st.cap;
    }
    $('#stageR').addEventListener('input', e => drawStage(+e.target.value));

    const STEPS = [
      'Ein Fluss fliesst in einer leichten Kurve durch eine flache Ebene.',
      'Aussen am Prallhang fliesst das Wasser schneller und erodiert das Ufer.',
      'Innen am Gleithang fliesst es langsamer und lagert Sand und Kies ab.',
      'Die Schlinge wird grösser, der Mäanderhals immer schmaler.',
      'Bei einem Hochwasser durchbricht der Fluss den Mäanderhals.',
      'Der Fluss nimmt den kürzeren Weg, die Enden der alten Schlinge verlanden.',
      'Zurück bleibt ein stehendes Gewässer: ein Altwasser (Altarm).'
    ];
    let order = [];
    function newOrder() { do { order = shuffle(STEPS.map((_, i) => i)); } while (order.every((v, i) => v === i)); renderOrder(); $('#orderFb').textContent = ''; }
    function renderOrder(marks) {
      $('#order').innerHTML = order.map((s, i) => `<li class="${marks ? (s === i ? 'right' : 'wrong') : ''}"><span>${esc(STEPS[s])}</span>
        <span class="mv"><button data-mv="${i}" data-d="-1" aria-label="Nach oben" ${i ? '' : 'disabled'}>↑</button><button data-mv="${i}" data-d="1" aria-label="Nach unten" ${i < order.length - 1 ? '' : 'disabled'}>↓</button></span></li>`).join('');
    }
    $('#order').addEventListener('click', e => {
      const b = e.target.closest('[data-mv]'); if (!b) return;
      const i = +b.dataset.mv, j = i + +b.dataset.d;
      [order[i], order[j]] = [order[j], order[i]]; renderOrder();
      $(`#order [data-mv="${j}"][data-d="${b.dataset.d}"]`)?.focus();
      $('#orderFb').textContent = '';
    });
    $('#orderCheck').addEventListener('click', () => {
      const right = order.filter((s, i) => s === i).length; const ok = right === STEPS.length;
      record('w4', ok); renderOrder(true);
      $('#orderFb').innerHTML = ok ? '<b style="color:var(--ok)">Perfekt, alles in der richtigen Reihenfolge.</b>' : `${right} von ${STEPS.length} an der richtigen Stelle. Verschiebe die rot markierten Schritte.`;
    });
    $('#orderNew').addEventListener('click', newOrder);

    /* ---------- Gefälle-Labor ---------- */
    const GRAINS = [
      { k: 'schlamm', n: 'Schlamm und Ton', r: 1.6, min: 1, fac: 1, col: '--relief' },
      { k: 'sand', n: 'Sand', r: 2.6, min: 3, fac: .8, col: '--sand' },
      { k: 'kies', n: 'Kies', r: 4.6, min: 5, fac: .55, col: '--muted' },
      { k: 'block', n: 'Blöcke', r: 9, min: 8, fac: .35, col: '--relief' }
    ];
    const sim = (() => {
      const cv = $('#sim'), ctx = cv.getContext('2d');
      let W = 600, H = 230, raf = 0, last = 0, g = 8;
      const parts = [];
      GRAINS.forEach((gr, gi) => { const cnt = [40, 26, 14, 6][gi]; for (let i = 0; i < cnt; i++) parts.push({ gi, x: Math.random(), d: Math.random() }); });
      const streaks = Array.from({ length: 14 }, () => ({ x: Math.random(), d: .2 + Math.random() * .6 }));
      function size() { const dpr = devicePixelRatio || 1; W = cv.clientWidth || 600; H = cv.clientHeight || 230; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
      const bed = x => 70 + (x / W) * g * 13;
      const depth = () => 40 - g * 1.6;
      function draw() {
        const cs = getComputedStyle(document.documentElement), c = n => cs.getPropertyValue(n).trim();
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = c('--sheet'); ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = c('--water-soft');
        ctx.beginPath(); ctx.moveTo(0, bed(0) - depth()); ctx.lineTo(W, bed(W) - depth()); ctx.lineTo(W, bed(W)); ctx.lineTo(0, bed(0)); ctx.fill();
        ctx.fillStyle = c('--relief-soft');
        ctx.beginPath(); ctx.moveTo(0, bed(0)); ctx.lineTo(W, bed(W)); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
        ctx.strokeStyle = c('--relief'); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, bed(0)); ctx.lineTo(W, bed(W)); ctx.stroke();
        ctx.strokeStyle = c('--water'); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, bed(0) - depth()); ctx.lineTo(W, bed(W) - depth()); ctx.stroke();
        ctx.lineWidth = 1.5; ctx.globalAlpha = .6;
        streaks.forEach(s => { const x = s.x * W, y = bed(x) - depth() * s.d, len = 6 + g * 2.4, k = g * 13 / W; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y + len * k); ctx.stroke(); });
        ctx.globalAlpha = 1;
        parts.forEach(p => {
          const gr = GRAINS[p.gi], x = p.x * W;
          const y = gr.k === 'schlamm' ? bed(x) - 3 - depth() * .85 * p.d : bed(x) - gr.r - 1;
          ctx.fillStyle = c(gr.col);
          if (gr.k === 'block') { ctx.strokeStyle = c('--ink'); ctx.lineWidth = 1; }
          ctx.beginPath(); ctx.arc(x, y, gr.r, 0, Math.PI * 2); ctx.fill(); if (gr.k === 'block') ctx.stroke();
        });
        ctx.fillStyle = c('--muted'); ctx.font = '11px "IBM Plex Mono", monospace';
        ctx.fillText('Querschnitt längs des Flusses · Fliessrichtung →', 10, H - 10);
      }
      function step(t) {
        const dt = Math.min(.05, (t - last) / 1000 || 0); last = t;
        const v = (30 + g * 24) / W;
        parts.forEach(p => { if (g >= GRAINS[p.gi].min) { p.x += v * GRAINS[p.gi].fac * dt; if (p.x > 1.02) { p.x = -.02; p.d = Math.random(); } } });
        streaks.forEach(s => { s.x += v * 1.3 * dt; if (s.x > 1.05) s.x = -.05; });
        draw(); raf = requestAnimationFrame(step);
      }
      function readout() {
        const sp = g >= 8 ? 'reissend' : g >= 5 ? 'schnell' : g >= 3 ? 'mässig' : 'langsam';
        const part = g >= 7 ? 'Oberlauf' : g >= 4 ? 'Mittellauf' : 'Unterlauf';
        const proc = g >= 8 ? '<b>Tiefenerosion:</b> Das Wasser ist so schnell, dass es sogar Blöcke bewegt. Der Fluss gräbt sich ein, es entsteht ein V-Tal.'
          : g >= 5 ? '<b>Transport und Seitenerosion:</b> Kies und Sand werden mitgenommen, Blöcke bleiben liegen. In Kurven nagt der Fluss am Ufer.'
          : g >= 3 ? '<b>Sedimentation beginnt:</b> Kies bleibt liegen, nur noch Sand und Schlamm werden transportiert.'
          : '<b>Sedimentation überwiegt:</b> Nur noch feiner Schlamm schwebt im Wasser. Alles andere wird abgelagert, z.B. in einem Delta.';
        $('#rSpeed').textContent = sp; $('#rPart').textContent = part; $('#rProc').innerHTML = proc;
        $('#rGrains').innerHTML = GRAINS.map(gr => `<li><span><i class="sw" style="width:${Math.max(6, gr.r * 1.6)}px;height:${Math.max(6, gr.r * 1.6)}px;background:var(${gr.col})"></i>${gr.n}</span>${g >= gr.min ? '<span class="pill move">wird transportiert</span>' : '<span class="pill stay">bleibt liegen</span>'}</li>`).join('');
      }
      $('#slope').addEventListener('input', e => { g = +e.target.value; readout(); if (reduced || !raf) draw(); });
      new ResizeObserver(() => { size(); draw(); }).observe(cv);
      readout();
      return {
        start() { size(); readout(); if (reduced) { draw(); return; } if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } },
        stop() { cancelAnimationFrame(raf); raf = 0; }
      };
    })();

    /* ---------- Gezeiten ---------- */
    const TCX = 345, TCY = 180, RE = 54, ORB = 140, AM = 16, AS = 7;
    function drawTide() {
      const phi = +$('#moonR').value * Math.PI / 180;
      const svg = $('#tide'); svg.innerHTML = '';
      // Sonne
      el('circle', { cx: -40, cy: TCY, r: 82, class: 't-sun' }, svg);
      [-110, -55, 0, 55, 110].forEach(dy => el('line', { x1: 60, y1: TCY + dy, x2: 175, y2: TCY + dy, class: 't-ray' }, svg));
      el('text', { x: 8, y: 52, class: 't-label' }, svg).textContent = 'Sonne';
      el('text', { x: 8, y: 68, class: 't-small' }, svg).textContent = '(viel weiter weg)';
      el('circle', { cx: TCX, cy: TCY, r: ORB, class: 't-orbit' }, svg);
      // Ozean mit Flutbergen
      let d = '';
      for (let k = 0; k <= 180; k++) {
        const th = k / 180 * Math.PI * 2;
        const r = RE + 22 + AM * Math.cos(2 * (th - phi)) + AS * Math.cos(2 * (th - Math.PI));
        d += (k ? 'L' : 'M') + (TCX + r * Math.cos(th)).toFixed(1) + ',' + (TCY + r * Math.sin(th)).toFixed(1);
      }
      el('path', { d: d + 'Z', class: 't-ocean' }, svg);
      el('circle', { cx: TCX, cy: TCY, r: RE, class: 't-earth' }, svg);
      el('path', { d: `M${TCX},${TCY - RE} A${RE},${RE} 0 0 1 ${TCX},${TCY + RE} Z`, class: 't-shade' }, svg);
      el('text', { x: TCX, y: TCY + 4, 'text-anchor': 'middle', class: 't-label' }, svg).textContent = 'Erde';
      // Mond
      const mx = TCX + ORB * Math.cos(phi), my = TCY + ORB * Math.sin(phi);
      el('circle', { cx: mx, cy: my, r: 13, class: 't-moondark' }, svg);
      el('path', { d: `M${mx},${my - 13} A13,13 0 0 0 ${mx},${my + 13} Z`, class: 't-moonlit' }, svg);
      el('text', { x: mx, y: my + (Math.sin(phi) > -0.2 ? 30 : -20), 'text-anchor': 'middle', class: 't-label' }, svg).textContent = 'Mond';
      // Beschriftung der Flutberge
      const lab = (ang, rr, t1, t2) => {
        const x = TCX + rr * Math.cos(ang), y = TCY + rr * Math.sin(ang), c = Math.cos(ang);
        const anchor = c > .35 ? 'start' : c < -.35 ? 'end' : 'middle';
        el('text', { x, y, 'text-anchor': anchor, class: 't-label' }, svg).textContent = t1;
        if (t2) el('text', { x, y: y + 14, 'text-anchor': anchor, class: 't-small' }, svg).textContent = t2;
      };
      lab(phi - .38, 108, 'Flutberg', 'Anziehung des Mondes');
      lab(phi + Math.PI - .38, 108, 'Flutberg', 'Fliehkraft');
      lab(phi + Math.PI / 2, 92, 'Ebbe');
      lab(phi - Math.PI / 2, 92, 'Ebbe');
      // Werte
      const deg = ((+$('#moonR').value - 180) % 360 + 360) % 360;
      const phase = deg < 22.5 || deg >= 337.5 ? 'Neumond' : deg < 67.5 || deg >= 292.5 ? 'Mondsichel' : deg < 112.5 || deg >= 247.5 ? 'Halbmond' : deg < 157.5 || deg >= 202.5 ? 'Dreiviertelmond' : 'Vollmond';
      const c2 = Math.cos(2 * phi);
      const type = c2 > .85 ? 'Springtide' : c2 < -.85 ? 'Nipptide' : 'normale Tide';
      $('#tPhase').textContent = phase;
      $('#tType').textContent = type;
      $('#tType').style.color = c2 > .85 ? 'var(--water)' : c2 < -.85 ? 'var(--relief)' : 'var(--ink)';
      $('#tGauge').style.width = (((c2 + 1) / 2) * 80 + 20).toFixed(0) + '%';
      $('#tExplain').innerHTML = c2 > .85 ? 'Sonne, Erde und Mond stehen <b>in einer Linie</b>. Die Kräfte von Sonne und Mond addieren sich: sehr hohe Flut, sehr tiefe Ebbe.'
        : c2 < -.85 ? 'Sonne und Mond stehen <b>im rechten Winkel</b> zur Erde. Ihre Kräfte schwächen sich gegenseitig ab: Flut und Ebbe fallen schwach aus.'
        : 'Zwischen Spring- und Nipptide. Schiebe den Mond zu Vollmond, Neumond oder Halbmond.';
      drawLevel((AM + AS * c2) / (AM + AS));
    }
    function drawLevel(amp) {
      const svg = $('#level'); svg.innerHTML = '';
      const X0 = 44, X1 = 590, Y0 = 18, Y1 = 132, T = 48, P = 12.42;
      const sx = t => X0 + (t / T) * (X1 - X0), mid = (Y0 + Y1) / 2, half = (Y1 - Y0) / 2 - 6;
      const sy = h => mid - h * half;
      for (let t = 0; t <= 48; t += 6) {
        el('line', { x1: sx(t), x2: sx(t), y1: Y0, y2: Y1, class: 'c-grid' }, svg);
        el('text', { x: sx(t), y: Y1 + 16, 'text-anchor': 'middle', class: 'c-axis' }, svg).textContent = t + ' h';
      }
      el('line', { x1: X0, x2: X1, y1: mid, y2: mid, class: 'c-grid' }, svg);
      el('text', { x: X0 - 6, y: sy(1) + 4, 'text-anchor': 'end', class: 'c-axis' }, svg).textContent = 'hoch';
      el('text', { x: X0 - 6, y: sy(-1) + 4, 'text-anchor': 'end', class: 'c-axis' }, svg).textContent = 'tief';
      let line = '';
      for (let k = 0; k <= 240; k++) { const t = k / 240 * T; line += (k ? 'L' : 'M') + sx(t).toFixed(1) + ',' + sy(amp * Math.cos(2 * Math.PI * t / P)).toFixed(1); }
      el('path', { d: line + `L${X1},${mid}L${X0},${mid}Z`, class: 'c-area' }, svg);
      el('path', { d: line, class: 'c-line' }, svg);
      [0, 1, 2, 3].forEach(k => {
        const t = k * P; const x = sx(t), y = sy(amp);
        el('circle', { cx: x, cy: y, r: 4.5, class: 'c-dot' }, svg);
        const hh = Math.floor(t), mm = Math.round((t - hh) * 60);
        el('text', { x: x + (k ? 0 : 6), y: Math.max(12, y - 9), 'text-anchor': k ? 'middle' : 'start', class: 'c-lab' }, svg).textContent = k ? `Flut ${hh} h ${String(mm).padStart(2, '0')}` : 'Flut';
      });
      el('text', { x: X1, y: 166, 'text-anchor': 'end', class: 'c-axis' }, svg).textContent = 'Zeit seit der ersten Flut';
    }
    $('#moonR').addEventListener('input', drawTide);

    /* ---------- Hochwasser Uri ---------- */
    const EVENTS = [
      { y: '1977', d: '31. Juli 1977', w: 'Industriegebiet (damalige Munitionsfabrik), Attinghausen', t: 'Heftige Regenfälle. Der Schächen verliess sein Flussbett, die Hallen standen meterhoch im Wasser. In Attinghausen floss der Kummetbach noch Tage später durchs Dorf.', s: 'Schaden: 200 Mio. Franken' },
      { y: '1987', d: '24./25. August 1987', w: 'Unteres Reusstal, Flüelen bis Attinghausen', t: 'Schweres Unwetter über dem Gotthardmassiv. Schäden an Häusern, Strassen, Bahnlinien und Kulturland, Gotthardroute wochenlang gesperrt, über 900 Nutztiere ertrunken. Folge: Umdenken zum ökologischen Hochwasserschutz.', s: 'Schaden: 500 Mio. Franken' },
      { y: '2005', d: '22./23. August 2005', w: 'Schattdorf: Industriegelände («Schattdorfer See»)', t: 'Nach 40 Stunden Regen trat der Schächen oberhalb der SBB-Linie über die Ufer. Beim Tellpark stand das Wasser bis 2,50 m hoch, eine Woche lang. Rund 200 Betriebe betroffen.', s: 'Schaden: 365 Mio. Franken' },
      { y: '2020', d: 'Oktober 2020', w: 'Urner Reussebene', t: 'Die Schutzmassnahmen wirkten: Die Reuss wurde kontrolliert über die Ufer gelenkt und in den Urnersee geführt.', s: 'Nur Aufräumarbeiten' }
    ];
    const STATIONS = [
      { n: 'Schutz Industriegebiet', p: 'Schattdorf', x: 668, y: 58, t: 'Eine Hochwasserschutzmauer entlang der Stillen Reuss schützt das Industriegebiet. 2005 stand es unter Wasser («Schattdorfer See»).' },
      { n: 'Notentlastungskanal', p: 'Schattdorf', x: 640, y: 82, t: 'Ein unterirdischer Kanal, der bei Hochwasser zusätzliches Wasser ableiten kann.' },
      { n: 'Torverschluss Stille Reuss', p: 'Schattdorf', x: 612, y: 100, t: 'Unter der Brücke ist ein Tor eingebaut, das bei Hochwasser geschlossen wird.' },
      { n: 'Verbreiterung Durchlass Stille Reuss', p: 'Schattdorf', x: 588, y: 120, t: 'Der Durchlass wurde verbreitert und die Stille Reuss renaturiert. So hat das Wasser mehr Platz.' },
      { n: 'Schächenmündung und Ruag-Sammler', p: 'Schattdorf / Attinghausen', x: 566, y: 150, t: 'Hier mündet der Schächen in die Reuss. Der Schächen trat 1977 und 2005 über die Ufer.' },
      { n: 'Entlastung Autobahn', p: 'bei Attinghausen', x: 500, y: 196, t: 'Bei extremem Hochwasser fliesst Wasser kontrolliert über eine Entlastungsanlage im Reussdamm auf die A2. Eine Hochwasserschutzmauer hält es zurück, und es fliesst Richtung Urnersee.' },
      { n: 'Palanggenbach', p: 'Seedorf / Attinghausen', x: 420, y: 214, t: 'Hier mündet der Palanggenbach in die Reuss. Sein Bett ist breit und kiesig, damit Wasser und Geschiebe Platz haben.' },
      { n: 'Swissli', p: 'Reussdamm', x: 340, y: 242, t: 'Messstation an der Reuss. Grüne Markierung bei der Treppe: Ab hier wird die Autobahn gesperrt. Rote Markierung: Jetzt fliesst Wasser auf die Autobahn.' },
      { n: 'Kaskadensystem (Treppen)', p: 'Reussdamm', x: 255, y: 270, t: 'Treppenstufen auf der Landseite des Reussdamms. Fliesst Wasser über den Damm, wird es gebremst, damit der Damm nicht weggespült wird.' },
      { n: 'Revitalisierung Giessen', p: 'Flüelen', x: 112, y: 254, t: 'Der Giessen, ein Bach bei Flüelen, wurde wieder naturnah gestaltet (revitalisiert).' },
      { n: 'Start Themenpfad', p: 'Flüelen', x: 96, y: 196, t: 'Ausgangspunkt des Themenwegs. Bilder erinnern an die Hochwasser 1977, 1987 und 2005.' },
      { n: 'Stiglissammler', p: 'Bürglen', x: 455, y: 30, t: 'Geschiebesammler am Schächen. Er hält Steine und Sand zurück (Platz für mind. 10 000 Lastwagenladungen). Beim Hochwasser 2005 füllte er sich. Danach wurde ein verschliessbares Schütz eingebaut.' }
    ];
    const uri = { mode: 'erkunden', sel: null, key: null, type: 'tap', done: false, score: 0, total: 0 };
    function drawUriMap() {
      const svg = $('#uMap'); svg.innerHTML = '';
      el('rect', { width: 700, height: 380, class: 'u-bg' }, svg);
      el('path', { d: 'M0,140 C40,140 70,170 78,212 C86,255 104,290 150,322 C170,336 180,360 185,380 L0,380 Z', class: 'u-lake' }, svg);
      el('path', { d: 'M700,182 C640,178 600,168 566,172 C480,206 340,252 262,282 C236,292 232,330 236,380', class: 'u-road' }, svg);
      el('path', { d: 'M160,150 C200,200 240,250 262,282', class: 'u-road' }, svg);
      el('path', { d: 'M700,165 C650,168 600,160 566,150 C540,160 480,190 420,214 C350,242 270,268 200,292 C175,300 160,306 150,318', class: 'u-riv' }, svg);
      el('path', { d: 'M690,30 C672,62 640,92 604,112 C588,122 572,136 566,150', class: 'u-riv thin' }, svg);
      el('path', { d: 'M470,0 C500,50 535,100 566,150', class: 'u-riv thin' }, svg);
      el('path', { d: 'M445,380 C440,320 430,260 420,214', class: 'u-riv thin' }, svg);
      const tr = STATIONS.slice(0, 11).reverse();
      el('path', { d: 'M' + tr.map(s => s.x + ',' + (s.y + (s.y > 140 && s.x > 200 ? 10 : 0))).join(' L'), class: 'u-trail' }, svg);
      el('path', { d: 'M455,30 L500,70', class: 'u-trail', 'stroke-dasharray': '2 6' }, svg);
      [['Reuss', 630, 192, 0], ['Stille Reuss', 640, 128, -32], ['Schächen', 482, 72, 58], ['Palanggenbach', 452, 330, -84], ['Urnersee', 18, 366, 0]].forEach(([t, x, y, r]) =>
        el('text', { x, y, class: 'u-rlab', transform: `rotate(${r} ${x} ${y})` }, svg).textContent = t);
      [['FLÜELEN', 14, 116], ['ALTDORF', 330, 120], ['BÜRGLEN', 350, 22], ['SCHATTDORF', 560, 18], ['SEEDORF', 290, 330], ['ATTINGHAUSEN', 520, 262]].forEach(([t, x, y]) => {
        const g = el('g', { class: 'u-place' }, svg);
        el('rect', { x, y, width: t.length * 7.6 + 12, height: 20, rx: 2 }, g);
        el('text', { x: x + 6, y: y + 14 }, g).textContent = t;
      });
      STATIONS.forEach((s, i) => {
        const g = el('g', { class: 'u-st', 'data-st': i, tabindex: 0, role: 'button', 'aria-label': `Station ${i + 1}` }, svg);
        el('circle', { cx: s.x, cy: s.y, r: 18, class: 'ring' }, g);
        el('circle', { cx: s.x, cy: s.y, r: 12, class: 'c' }, g);
        el('text', { x: s.x, y: s.y + 4, 'text-anchor': 'middle' }, g).textContent = i + 1;
      });
    }
    function markStations(map) { $$('#uMap .u-st').forEach(g => { g.classList.remove('sel', 'good', 'bad'); const c = map[g.dataset.st]; if (c) g.classList.add(c); }); }
    function stationCard(i) { const s = STATIONS[i]; return `<div class="fb"><p><b>${i + 1} · ${esc(s.n)}</b> <span class="meta">${esc(s.p)}</span></p><p style="margin-top:6px">${esc(s.t)}</p></div>`; }
    function renderUri() {
      $('#uModes').innerHTML = ['erkunden', 'quiz'].map(m => `<button class="chip" data-umode="${m}" aria-pressed="${uri.mode === m}">${m === 'erkunden' ? 'Erkunden' : 'Quiz'}</button>`).join('');
      $('#uScore').textContent = uri.mode === 'quiz' && uri.total ? `${uri.score} von ${uri.total} richtig` : '';
      if (uri.mode === 'erkunden') {
        $('#uTask').textContent = 'Tippe auf eine Station, um mehr zu erfahren.';
        markStations(uri.sel == null ? {} : { [uri.sel]: 'sel' });
        $('#uInfo').innerHTML = uri.sel == null ? '' : stationCard(uri.sel);
      }
    }
    function nextUri() {
      const ks = STATIONS.map((_, i) => i).filter(i => i !== uri.key);
      uri.key = ks[Math.floor(Math.random() * ks.length)]; uri.type = Math.random() < .5 ? 'tap' : 'name'; uri.done = false;
      markStations({});
      if (uri.type === 'tap') {
        $('#uTask').innerHTML = `Wo liegt die Station <em>${esc(STATIONS[uri.key].n)}</em>?`;
        $('#uInfo').innerHTML = '';
      } else {
        $('#uTask').innerHTML = `Welche Massnahme steht bei der <em>markierten Station ${uri.key + 1}</em>?`;
        markStations({ [uri.key]: 'sel' });
        const opts = shuffle([uri.key, ...shuffle(ks.filter(i => i !== uri.key)).slice(0, 3)]);
        $('#uInfo').innerHTML = `<div class="opts">${opts.map(i => `<button class="opt" data-uk="${i}">${esc(STATIONS[i].n)}</button>`).join('')}</div>`;
      }
      renderUri();
    }
    function finishUri(ok, picked) {
      uri.done = true; uri.total++; if (ok) uri.score++; record('g2', ok);
      markStations(ok ? { [uri.key]: 'good' } : { [uri.key]: 'good', [picked]: 'bad' });
      const html = `<div class="fb ${ok ? 'good' : 'bad'}" style="margin-top:12px"><p><b class="k">${ok ? 'Richtig!' : 'Leider falsch.'}</b> ${ok ? '' : `Du hast Station ${picked + 1} gewählt (${esc(STATIONS[picked].n)}). `}Gesucht war Station ${uri.key + 1}.</p></div>
        ${stationCard(uri.key)}<div class="row" style="margin-top:12px"><button class="btn primary" id="uNext">Nächste Aufgabe</button></div>`;
      if (uri.type === 'name') $('#uInfo').insertAdjacentHTML('beforeend', html); else $('#uInfo').innerHTML = html;
      renderUri();
    }
    function pickStation(i) {
      if (uri.mode === 'erkunden') { uri.sel = i; renderUri(); return; }
      if (uri.type !== 'tap' || uri.done) return;
      finishUri(i === uri.key, i);
    }
    $('#uMap').addEventListener('click', e => { const g = e.target.closest('[data-st]'); if (g) pickStation(+g.dataset.st); });
    $('#uMap').addEventListener('keydown', e => { const g = e.target.closest('[data-st]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pickStation(+g.dataset.st); } });
    $('#uModes').addEventListener('click', e => { const b = e.target.closest('[data-umode]'); if (!b) return; uri.mode = b.dataset.umode; if (uri.mode === 'quiz') nextUri(); else { uri.sel = null; renderUri(); } });
    $('#uInfo').addEventListener('click', e => {
      if (e.target.id === 'uNext') { nextUri(); return; }
      const b = e.target.closest('[data-uk]'); if (!b || uri.done) return;
      const k = +b.dataset.uk, ok = k === uri.key;
      $$('#uInfo .opt').forEach(o => { o.disabled = true; if (+o.dataset.uk === uri.key) o.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      finishUri(ok, k);
    });
    $('#uEvents').innerHTML = EVENTS.map(ev => `<article class="event"><span class="yr">${ev.y}</span><span class="meta">${esc(ev.d)}</span><span class="where">${esc(ev.w)}</span><p>${esc(ev.t)}</p><span class="dmg">${esc(ev.s)}</span></article>`).join('');
    $('#uList').innerHTML = STATIONS.map((s, i) => `<li><span class="num">${i + 1}</span><div><b>${esc(s.n)}</b> <span class="meta">${esc(s.p)}</span><p style="font-size:.92rem">${esc(s.t)}</p></div></li>`).join('');

    drawUriMap(); renderUri();
    drawStage(0); newOrder();
    drawTide();

    return {
      // läuft beim Start, solange alle Bereiche kurz sichtbar sind (Zeichnungen brauchen Geometrie)
      vorbereiten() { drawMapDetails(); drawGlacierDetails(); },
      onShow(tab) {
        if (tab === 'gefaelle') sim.start(); else sim.stop();
        if (tab === 'gezeiten') drawTide();
      }
    };
  }
});
