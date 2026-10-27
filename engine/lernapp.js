/* Lern-App Grundgerüst
   Gemeinsame Logik für alle Themen: Navigation, Tagestraining, Erklär-Aufgaben, Probeprüfung,
   Fortschritt mit Ampel, Karteikarten, Sortieren, Bild-Quiz, Zeitstrahl.
   Ein Thema liefert nur Daten (inhalt.js) und optional eigene Werkzeuge (werkzeuge.js).
   Aufbau und Datenformat: siehe CLAUDE.md im Hauptordner. */
(() => {
'use strict';
const registered = [];
const PROFIL_KEY = 'lernapps-profil';

window.LernApp = {
  /* Eigenes Werkzeug anmelden: { init(api) → { vorbereiten(), onShow(tab) } } */
  werkzeug(def) { registered.push(def); },
  start
};

const HEART = '<svg class="heart" viewBox="0 0 24 24" width="20" height="20" role="img" aria-label="Herz"><path d="M12 21s-7.2-4.6-9.6-9.1C.8 8.8 2.4 4.8 6.2 4.2c2.2-.4 4.3.7 5.8 2.6 1.5-1.9 3.6-3 5.8-2.6 3.8.6 5.4 4.6 3.8 7.7C19.2 16.4 12 21 12 21z"/></svg>';

function start(C) {
const KEY = C.speicher || 'lernapp:' + C.id;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const NS = 'http://www.w3.org/2000/svg';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Profil (geteilt von allen Lern-Apps auf derselben Website) ---------- */
let profil = {};
try { profil = JSON.parse(localStorage.getItem(PROFIL_KEY)) || {}; } catch (e) {}
const saveProfil = () => { try { localStorage.setItem(PROFIL_KEY, JSON.stringify(profil)); } catch (e) {} renderFooter(); };
(() => {
  // Persönlicher Link: ?name=Lily&widmung=… wird einmal übernommen und dann aus der Adresse entfernt
  const q = new URLSearchParams(location.search);
  if (!q.has('name') && !q.has('widmung')) return;
  if (q.has('name')) profil.name = q.get('name').trim().slice(0, 40);
  if (q.has('widmung')) profil.widmung = q.get('widmung').trim().slice(0, 140);
  try { localStorage.setItem(PROFIL_KEY, JSON.stringify(profil)); } catch (e) {}
  try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {}
})();

/* ---------- Lernziele ---------- */
const AREAS = C.themen;
const LZ = {};
AREAS.forEach(a => a.lz.forEach(([id, text, mods]) => LZ[id] = { id, text, mods: mods || [], area: a.id }));
const STATUS = ['noch offen', 'in Arbeit', 'sicher', 'auffrischen'];
const EXAM_DATE = C.pruefung || '';
const STALE_DAYS = C.auffrischenNachTagen || 2;
const EXAM_N = C.pruefungsAufgaben || 20;

const MCQ = C.fragen || {};
const CARDS = C.karten || [];
const CGROUPS = Object.assign({ alle: 'Alle' }, C.kartenGruppen || {});
const SORTS = C.sortieren || {};
const EXPL = C.erklaeren || [];
const SCENES = (C.bildquiz && C.bildquiz.szenen) || {};
const TL = C.zeitstrahl || {};

/* ---------- Seite aufbauen ---------- */
const tools = $$('#vorlagen section[data-werkzeug]').map(s => ({ id: s.dataset.werkzeug, name: s.dataset.name, el: s }));
const MODS = {};
if (Object.keys(SCENES).length) MODS.bild = 'Bild-Quiz';
if (CARDS.length) MODS.karten = 'Karteikarten';
if (Object.keys(SORTS).length) MODS.sortieren = 'Sortieren';
if (Object.keys(TL).length) MODS.zeitstrahl = 'Zeitstrahl';
tools.forEach(t => MODS[t.id] = t.name);
buildPage();
function buildPage() {
  const navTool = id => `<button class="nav-item" data-tab="${id}" id="t-${id}">${esc(MODS[id])}</button>`;
  document.body.insertAdjacentHTML('afterbegin', `
<header class="top">
  <div class="wrap">
    <div>
      <div class="eyebrow">${esc(C.eyebrow || '')}</div>
      <h1>${C.titel || ''}</h1>
    </div>
    <p class="sub">${esc(C.untertitel || '')}</p>
  </div>
</header>
<div class="shell">
<aside class="side" aria-label="Navigation">
  <div class="group">
    <h4>Lernen</h4>
    <button class="nav-item big" data-tab="heute" id="t-heute">Heute üben</button>
    <button class="nav-item big" data-tab="pruefung" id="t-pruefung">Probeprüfung</button>
    <button class="nav-item big" data-tab="uebersicht" id="t-uebersicht">Fortschritt</button>
  </div>
  <div class="group">
    <h4>Themen</h4>
    ${AREAS.map(a => `<button class="nav-item" data-tab="thema" data-area="${a.id}">${esc(a.kurz || a.name)} <span class="mini" data-cnt="${a.id}"></span></button>`).join('')}
  </div>
  <div class="group">
    <h4>Werkzeuge</h4>
    ${Object.keys(MODS).map(navTool).join('')}
  </div>
</aside>
<main class="content">
  <section class="view" id="v-heute" role="tabpanel" aria-labelledby="t-heute" hidden><div class="view" id="heuteBox"></div></section>
  <section class="view" id="v-pruefung" role="tabpanel" aria-labelledby="t-pruefung" hidden><div class="view" id="pruefBox"></div></section>
  <section class="view" id="v-thema" role="tabpanel" aria-label="Thema" hidden><div class="view" id="themaBox"></div></section>
  <section class="view" id="v-session" role="tabpanel" aria-label="Übungsrunde" hidden><div class="sess" id="sessBox"></div></section>

  <section class="view" id="v-uebersicht" role="tabpanel" aria-labelledby="t-uebersicht" hidden>
    <div class="grid2">
      <div class="panel today" id="today"></div>
      <div class="panel" style="display:grid;gap:14px">
        <h3>Prüfung</h3>
        <div class="exam">
          <label for="examDate">Datum der Prüfung</label>
          <input type="date" id="examDate">
          <strong id="examLeft"></strong>
        </div>
        <div class="legend">
          <span><i class="dot"></i>noch offen</span>
          <span><i class="dot s1"></i>in Arbeit</span>
          <span><i class="dot s2"></i>sicher (mind. 4 Versuche, 80 % richtig)</span>
          <span><i class="dot s3"></i>auffrischen (seit ${STALE_DAYS} Tagen nicht geübt)</span>
        </div>
      </div>
    </div>
    <div id="areas" class="view"></div>
    <div class="panel settings">
      <h3>Persönlich</h3>
      <label>Dein Name <input id="profName" maxlength="40" autocomplete="given-name"></label>
      <label>Widmung in der Fusszeile (freiwillig) <input id="profWidmung" maxlength="140" placeholder="z.B. Viel Erfolg!"></label>
      <div class="row"><button class="btn small primary" id="profSave">Speichern</button><span class="note" id="profMsg" aria-live="polite"></span></div>
      <p class="note">Name und Widmung gelten für alle Lern-Apps auf dieser Website und bleiben in diesem Browser.</p>
    </div>
    <div class="foot">
      <div class="confirm" id="resetBox">
        <span>Der Fortschritt wird nur in diesem Browser gespeichert.</span>
        <button class="btn small ghost" id="resetBtn">Fortschritt zurücksetzen</button>
      </div>
    </div>
  </section>

  ${MODS.bild ? `<section class="view" id="v-bild" role="tabpanel" aria-labelledby="t-bild" hidden>
    <div class="row" style="justify-content:space-between">
      <h2>${esc(C.bildquiz.titel || 'Bild-Quiz')}</h2>
      <span class="score" id="bScore"></span>
    </div>
    ${C.bildquiz.text ? `<p class="lead">${esc(C.bildquiz.text)}</p>` : ''}
    <div class="row" id="bScenes"></div>
    <div class="panel" style="display:grid;gap:14px" id="bPanel">
      <p class="task" id="bTask" aria-live="polite"></p>
      <div id="bAnswer"></div>
    </div>
  </section>` : ''}

  <section class="view" id="v-karten" role="tabpanel" aria-labelledby="t-karten" hidden>
    <h2>Karteikarten</h2>
    <p class="lead">Erst selbst überlegen, dann umdrehen. Was du nicht wusstest, kommt gleich nochmals. Was sitzt, wandert eine Box weiter und kommt seltener.</p>
    <div class="row" id="cFilter"></div>
    <div class="grid2">
      <div class="panel flash" id="flash"></div>
      <div class="panel" style="display:grid;gap:12px">
        <h3>Deine Boxen</h3>
        <div class="boxes" id="boxes"></div>
        <p class="note">Box 1 = neu oder unsicher, Box 3 = sitzt. Die Karten aus Box 1 kommen zuerst.</p>
      </div>
    </div>
  </section>

  <section class="view" id="v-sortieren" role="tabpanel" aria-labelledby="t-sortieren" hidden>
    <h2>Sortieren</h2>
    <p class="lead">Wohin gehört der Begriff? Tippe auf das richtige Feld.</p>
    <div class="row" id="sSets"></div>
    <div class="panel" style="display:grid;gap:14px">
      <div class="row" style="justify-content:space-between"><h3 id="sTitle"></h3><span class="score" id="sScore"></span></div>
      <div id="sCard"></div>
      <p id="sFb" aria-live="polite" class="note"></p>
      <div class="bins" id="sBins"></div>
    </div>
  </section>

  ${MODS.zeitstrahl ? `<section class="view" id="v-zeitstrahl" role="tabpanel" aria-labelledby="t-zeitstrahl" hidden>
    <h2>Zeitstrahl</h2>
    <p class="lead">Was kam zuerst? Bring Ereignisse in die richtige Reihenfolge oder ordne ihnen die Jahreszahl zu.</p>
    <div class="row" id="zSets"></div>
    <div class="row" id="zModes"><button class="chip" data-zmode="reihe">Reihenfolge</button><button class="chip" data-zmode="jahr">Jahreszahl</button></div>
    <div class="panel" style="display:grid;gap:14px">
      <div class="row" style="justify-content:space-between"><p class="task" id="zTask"></p><span class="score" id="zScore"></span></div>
      <div id="zBody"></div>
      <div id="zFb" aria-live="polite"></div>
    </div>
  </section>` : ''}
</main>
</div>
<footer class="love"><div class="wrap" id="footBox"></div></footer>`);
  const main = $('main.content');
  // Bild-Quiz-Szenen und eigene Werkzeuge aus den Vorlagen übernehmen
  if (MODS.bild) $$('#vorlagen .mapwrap[data-szene]').forEach(w => $('#bPanel').insertBefore(w, $('#bAnswer')));
  tools.forEach(t => { t.el.id = 'v-' + t.id; t.el.classList.add('view'); t.el.setAttribute('role', 'tabpanel'); t.el.setAttribute('aria-labelledby', 't-' + t.id); t.el.hidden = true; t.el.removeAttribute('data-werkzeug'); main.appendChild(t.el); });
  const footer = $('footer.love'); document.body.appendChild(footer);
}
function renderFooter() {
  const w = (profil.widmung || '').trim();
  $('#footBox').innerHTML = `${w ? `<p>${esc(w)} ${HEART}</p>` : ''}<span class="hinweis">${esc(C.hinweis || 'Ohne Gewähr. Bitte immer mit den Unterlagen aus dem Unterricht abgleichen.')} · <a href="../../">Alle Lern-Apps</a></span>`;
}
renderFooter();

/* ---------- Speicher ---------- */
const blank = () => ({ res: {}, self: {}, cards: {}, exam: EXAM_DATE, tab: 'heute', last: {}, seen: {}, mistakes: [], done: {}, exams: [] });
let state = blank();
try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s === 'object') state = Object.assign(blank(), s); } catch (e) {}
if (!state.exam) state.exam = EXAM_DATE;
['last', 'seen', 'done'].forEach(k => { if (!state[k] || typeof state[k] !== 'object') state[k] = {}; });
['mistakes', 'exams'].forEach(k => { if (!Array.isArray(state[k])) state[k] = []; });
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
function record(id, ok) {
  const r = state.res[id] || (state.res[id] = []);
  r.push(ok ? 1 : 0); if (r.length > 12) r.shift(); state.last[id] = Date.now(); save();
}
function rate(id) { const r = (state.res[id] || []).slice(-8); return r.length ? r.reduce((a, b) => a + b, 0) / r.length : 0; }
function status(id) {
  const r = state.res[id];
  if (r && r.length) {
    if (r.length >= 4 && rate(id) >= .8) return (Date.now() - (state.last[id] || 0)) > STALE_DAYS * 864e5 ? 3 : 2;
    return 1;
  }
  return state.self[id] || 0;
}

/* ---------- Tabs ---------- */
const TABS = [...new Set($$('.nav-item').map(b => b.dataset.tab)), 'session'];
function show(tab, area) {
  if (!TABS.includes(tab)) tab = 'heute';
  if (tab === 'thema') { area = area || state.area || AREAS[0].id; state.area = area; }
  $$('.nav-item').forEach(b => { if (b.dataset.tab === tab && (tab !== 'thema' || b.dataset.area === area)) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  $$('.view[role=tabpanel]').forEach(v => v.hidden = v.id !== 'v-' + tab);
  if (tab !== 'session') { state.tab = tab; save(); }
  renderNavCounts();
  if (tab === 'uebersicht') renderOverview();
  if (tab === 'heute') renderHeute();
  if (tab === 'pruefung') renderPruefung();
  if (tab === 'thema') renderThema(area);
  hooks.forEach(h => h.onShow && h.onShow(tab));
  window.scrollTo({ top: 0 });
}
$$('.nav-item').forEach(b => b.addEventListener('click', () => show(b.dataset.tab, b.dataset.area)));
document.addEventListener('click', e => { const m = e.target.closest('[data-go]'); if (!m) return; if (m.dataset.scene && SCENES[m.dataset.scene]) setScene(m.dataset.scene); show(m.dataset.go, m.dataset.area); });
function renderNavCounts() { AREAS.forEach(a => { const el = $(`[data-cnt="${a.id}"]`); if (el) el.textContent = `${a.lz.filter(l => status(l[0]) === 2).length}/${a.lz.length}`; }); }
const dotHtml = id => { const s = status(id); return `<span class="dot s${s}" role="img" aria-label="${STATUS[s]}" title="${STATUS[s]}"></span>`; };
const modLink = m => { const [tool, arg] = m.split(':'); return MODS[tool] ? `<button class="modlink" data-go="${tool}" ${arg ? `data-scene="${arg}"` : ''}>${esc(MODS[tool])}</button>` : ''; };

/* ---------- Übersicht ---------- */
function renderOverview() {
  const nOk = Object.keys(LZ).filter(id => status(id) === 2).length;
  $('#today').innerHTML = `<h3>Dein Stand</h3><p><b>${nOk} von ${Object.keys(LZ).length}</b> Lernzielen sind sicher.</p><div class="bar"><i style="width:${(nOk / Object.keys(LZ).length * 100).toFixed(0)}%"></i></div><div class="row"><button class="btn primary" data-go="heute">Zum Tagestraining</button><button class="btn" data-go="pruefung">Probeprüfung</button></div>`;
  // Prüfung
  $('#examDate').value = state.exam || '';
  let left = '';
  if (state.exam) {
    const d = new Date(state.exam + 'T00:00'); const t = new Date(); t.setHours(0, 0, 0, 0);
    const n = Math.round((d - t) / 864e5);
    left = n > 1 ? `Noch ${n} Tage` : n === 1 ? 'Morgen ist Prüfung' : n === 0 ? 'Heute ist Prüfung. Viel Glück!' : '';
  }
  $('#examLeft').textContent = left;
  $('#profName').value = profil.name || ''; $('#profWidmung').value = profil.widmung || '';
  // Themen
  $('#areas').innerHTML = AREAS.map(a => {
    const green = a.lz.filter(l => status(l[0]) === 2).length;
    return `<section class="panel area">
      <div class="area-head"><h2>${esc(a.name)}</h2><span class="count">${green} / ${a.lz.length} sicher</span></div>
      <ol class="lzlist">${a.lz.map(([id, text, mods]) => {
        const dot = dotHtml(id);
        const links = (mods || []).map(modLink).join('');
        return `<li>${dot}<div class="txt">Ich kann ${esc(text)}<div class="mods"><button class="modlink strong" data-act2="lz" data-lz="${id}">Lernziel üben</button>${links}</div></div></li>`;
      }).join('')}</ol></section>`;
  }).join('');
}
$('#areas').addEventListener('click', e => {
  const b = e.target.closest('[data-self]'); if (!b) return;
  const id = b.dataset.self; state.self[id] = ((state.self[id] || 0) + 1) % 3; save(); renderOverview();
});
$('#examDate').addEventListener('change', e => { state.exam = e.target.value; save(); renderOverview(); });
function resetUI(confirming) {
  $('#resetBox').innerHTML = confirming
    ? `<span>Alle Ergebnisse und Boxen löschen?</span><button class="btn small" id="resetYes">Ja, zurücksetzen</button><button class="btn small ghost" id="resetNo">Abbrechen</button>`
    : `<span>Der Fortschritt wird nur in diesem Browser gespeichert.</span><button class="btn small ghost" id="resetBtn">Fortschritt zurücksetzen</button>`;
}
$('#resetBox').addEventListener('click', e => {
  if (e.target.id === 'resetBtn') resetUI(true);
  if (e.target.id === 'resetNo') resetUI(false);
  if (e.target.id === 'resetYes') { state = blank(); state.tab = 'uebersicht'; sess = null; save(); resetUI(false); renderOverview(); buildDeck(); renderCard(); }
});

$('#profSave').addEventListener('click', () => {
  profil.name = $('#profName').value.trim().slice(0, 40); profil.widmung = $('#profWidmung').value.trim().slice(0, 140);
  saveProfil(); $('#profMsg').textContent = 'Gespeichert.';
});
document.addEventListener('submit', e => {
  if (e.target.id !== 'nameForm') return;
  e.preventDefault(); const v = $('#nameIn').value.trim().slice(0, 40); if (!v) return;
  profil.name = v; saveProfil(); renderHeute();
});

/* ---------- Auswahlfragen ---------- */
function renderMC(id) {
  const box = $('#' + id); if (!box || !MCQ[id]) return;
  box.innerHTML = MCQ[id].map((q, i) => `<fieldset class="mc" data-i="${i}"><legend>${esc(q.q)}</legend>
    <div class="opts">${shuffle(q.o.map((t, j) => ({ t, j }))).map(o => `<button class="opt" data-j="${o.j}">${esc(o.t)}</button>`).join('')}</div>
    <p class="mc-fb" aria-live="polite"></p></fieldset>`).join('');
}
document.addEventListener('click', e => {
  const r = e.target.closest('[data-remix]'); if (r) { renderMC(r.dataset.remix); return; }
  const o = e.target.closest('.mcs .opt'); if (!o) return;
  const fs = o.closest('.mc'); const q = MCQ[o.closest('.mcs').id][+fs.dataset.i];
  const ok = o.dataset.j === '0';
  $$('.opt', fs).forEach(b => { b.disabled = true; if (b.dataset.j === '0') b.classList.add('right'); });
  if (!ok) o.classList.add('wrong');
  $('.mc-fb', fs).innerHTML = `<b>${ok ? 'Richtig.' : 'Nicht ganz.'}</b> ${esc(q.e)}`;
  record(q.lz, ok);
});

/* ---------- Karteikarten ---------- */
let cFilter = 'alle', deck = [], cur = null, flipped = false, cSess = { yes: 0, no: 0 };
const box = c => state.cards[c.id] || 1;
function buildDeck() {
  deck = shuffle(CARDS.filter(c => cFilter === 'alle' || c.g === cFilter)).sort((a, b) => box(a) - box(b));
  cur = deck.shift() || null; flipped = false; cSess = { yes: 0, no: 0 };
}
function renderFilter() {
  $('#cFilter').innerHTML = Object.entries(CGROUPS).map(([k, v]) => `<button class="chip" data-cf="${k}" aria-pressed="${k === cFilter}">${v}</button>`).join('');
}
function renderBoxes() {
  const set = CARDS.filter(c => cFilter === 'alle' || c.g === cFilter);
  $('#boxes').innerHTML = [1, 2, 3].map(n => `<span><b>${set.filter(c => box(c) === n).length}</b>Box ${n}</span>`).join('');
}
function renderCard() {
  renderBoxes();
  const f = $('#flash');
  if (!cur) {
    f.innerHTML = `<div><p class="meta">Runde fertig</p><p class="q">${cSess.yes} gewusst, ${cSess.no}× nochmals geübt.</p></div>
      <div class="row"><button class="btn primary" id="cAgain">Neue Runde</button></div>`;
    return;
  }
  f.innerHTML = `<div style="display:grid;gap:12px">
      <p class="meta">Noch ${deck.length + 1} Karten · Box ${box(cur)} · Lernziel ${LZ[cur.lz].text.slice(1, 40)}…</p>
      <p class="q">${esc(cur.q)}</p>
      ${flipped ? `<p class="a">${esc(cur.a)}</p>` : ''}
    </div>
    <div class="row">${flipped
      ? `<button class="btn primary" id="cYes">Wusste ich</button><button class="btn" id="cNo">Noch nicht</button>`
      : `<button class="btn primary" id="cFlip">Antwort zeigen</button>`}</div>`;
}
$('#flash').addEventListener('click', e => {
  const id = e.target.id;
  if (id === 'cFlip') { flipped = true; renderCard(); $('#cYes')?.focus(); }
  if (id === 'cYes' || id === 'cNo') {
    const ok = id === 'cYes';
    state.cards[cur.id] = ok ? Math.min(3, box(cur) + 1) : 1;
    record(cur.lz, ok);
    if (ok) cSess.yes++; else { cSess.no++; deck.splice(Math.min(2, deck.length), 0, cur); }
    cur = deck.shift() || null; flipped = false; renderCard(); $('#cFlip')?.focus();
  }
  if (id === 'cAgain') { buildDeck(); renderCard(); }
});
$('#cFilter').addEventListener('click', e => {
  const b = e.target.closest('[data-cf]'); if (!b) return;
  cFilter = b.dataset.cf; renderFilter(); buildDeck(); renderCard();
});

/* ---------- Bild-Quiz ---------- */
function el(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; }
const quiz = { scene: 'fluss', key: null, type: 'tap', done: false, score: 0, total: 0 };
const SC = () => SCENES[quiz.scene];
// Wortlaut pro Szene anpassbar (szene.tippe, szene.frage), Standard passt zu Landkarten
const TIPPE = sc => sc.tippe || 'Tippe auf der Karte auf:';
const FRAGE = sc => sc.frage || 'Wie heisst die markierte Form?';
function svgPoint(svg, x, y) { const p = new DOMPoint(x, y).matrixTransform(svg.getScreenCTM().inverse()); return p; }
function highlight(key, cls) {
  const sc = SC(), hl = $(sc.hl); const nodes = $$(`${sc.hs} [data-spot="${key}"]`);
  (quiz.type === 'name' && !quiz.done ? nodes.slice(0, 1) : nodes).forEach(n => {
    const c = n.cloneNode(); c.removeAttribute('data-spot');
    c.setAttribute('class', `hl ${n.classList.contains('hs-stroke') ? 'stroke' : 'fill'} ${cls || ''}`);
    hl.appendChild(c);
  });
}
function setScene(scene) {
  if (!SCENES[scene]) return;
  quiz.scene = scene; quiz.key = null; quiz.score = 0; quiz.total = 0;
  Object.entries(SCENES).forEach(([k, v]) => $(v.wrap).hidden = k !== scene);
  $('#bScenes').innerHTML = Object.entries(SCENES).map(([k, v]) => `<button class="chip" data-scene-pick="${k}" aria-pressed="${k === scene}">${v.label}</button>`).join('');
  nextQuiz();
}
$('#bScenes')?.addEventListener('click', e => { const b = e.target.closest('[data-scene-pick]'); if (b) setScene(b.dataset.scenePick); });
function nextQuiz() {
  const sp = SC().spots;
  const keys = Object.keys(sp).filter(k => k !== quiz.key);
  quiz.key = keys[Math.floor(Math.random() * keys.length)];
  quiz.type = Math.random() < .5 ? 'tap' : 'name';
  quiz.done = false;
  $(SC().hl).innerHTML = '';
  $('#bAnswer').innerHTML = '';
  if (quiz.type === 'tap') {
    $('#bTask').innerHTML = `${esc(TIPPE(SC()))} <em>${esc(sp[quiz.key].n)}</em>`;
  } else {
    $('#bTask').textContent = FRAGE(SC());
    highlight(quiz.key);
    const opts = shuffle([quiz.key, ...shuffle(Object.keys(sp).filter(k => k !== quiz.key)).slice(0, 3)]);
    $('#bAnswer').innerHTML = `<div class="opts">${opts.map(k => `<button class="opt" data-k="${k}">${esc(sp[k].n)}</button>`).join('')}</div>`;
  }
  renderScore();
}
function renderScore() { $('#bScore').textContent = quiz.total ? `${quiz.score} von ${quiz.total} richtig` : ''; }
function finishQuiz(ok, pickedKey) {
  const sp = SC().spots;
  quiz.done = true; quiz.total++; if (ok) quiz.score++;
  sp[quiz.key].lz.forEach(id => record(id, ok));
  (SC().extraLz || []).forEach(id => record(id, ok));
  $(SC().hl).innerHTML = '';
  highlight(quiz.key, ok ? 'good' : '');
  const s = sp[quiz.key];
  const fbHtml = `<div class="fb ${ok ? 'good' : 'bad'}" style="margin-top:12px">
    <p><b class="k">${ok ? 'Richtig!' : 'Leider falsch.'}</b> ${!ok && pickedKey ? `Das war: ${esc(sp[pickedKey].n)}. ` : ''}Markiert ist: <b>${esc(s.n)}</b>.</p>
    <p style="margin-top:6px">${esc(s.t)}</p></div>
    <div class="row" style="margin-top:12px"><button class="btn primary" id="bNext">Nächste Aufgabe</button></div>`;
  if (quiz.type === 'name') $('#bAnswer').insertAdjacentHTML('beforeend', fbHtml); else $('#bAnswer').innerHTML = fbHtml;
  $('#bTask').innerHTML = esc(s.n);
  renderScore();
  $('#bNext').focus({ preventScroll: true });
}
Object.keys(SCENES).forEach(key => $(SCENES[key].svg).addEventListener('click', e => {
  if (quiz.scene !== key || quiz.type !== 'tap' || quiz.done) return;
  const sc = SC();
  const hits = document.elementsFromPoint(e.clientX, e.clientY).map(n => n.getAttribute && n.getAttribute('data-spot')).filter(Boolean);
  const svg = $(sc.svg); const p = svgPoint(svg, e.clientX, e.clientY);
  $$('.tapmark', svg).forEach(n => n.remove());
  if (!hits.length) {
    el('circle', { cx: p.x, cy: p.y, r: 9, class: 'tapmark' }, $(sc.hl));
    $('#bAnswer').innerHTML = `<p class="note" style="margin-top:4px">Hier ist nichts von dem, was gesucht ist. Versuch es an einer anderen Stelle.</p>`;
    return;
  }
  const ok = hits.includes(quiz.key);
  const picked = sc.prio.find(k => hits.includes(k));
  finishQuiz(ok, ok ? null : picked);
  el('circle', { cx: p.x, cy: p.y, r: 9, class: 'tapmark ' + (ok ? 'good' : 'bad') }, $(sc.hl));
}));
$('#bAnswer')?.addEventListener('click', e => {
  if (e.target.id === 'bNext') { nextQuiz(); return; }
  const b = e.target.closest('.opt'); if (!b || quiz.done) return;
  const ok = b.dataset.k === quiz.key;
  $$('#bAnswer .opt').forEach(o => { o.disabled = true; if (o.dataset.k === quiz.key) o.classList.add('right'); });
  if (!ok) b.classList.add('wrong');
  finishQuiz(ok, ok ? null : b.dataset.k);
});

/* ---------- Sortieren ---------- */
const sort = { set: 'lauf', queue: [], placed: [], score: 0 };
function startSort(set) {
  sort.set = set; sort.queue = shuffle(SORTS[set].items); sort.placed = SORTS[set].bins.map(() => []); sort.score = 0;
  $('#sSets').innerHTML = Object.entries(SORTS).map(([k, v]) => `<button class="chip" data-set="${k}" aria-pressed="${k === set}">${v.label}</button>`).join('');
  $('#sFb').textContent = '';
  renderSort();
}
function renderSort() {
  const S = SORTS[sort.set], n = S.items.length, done = n - sort.queue.length;
  $('#sTitle').textContent = S.title;
  $('#sScore').textContent = `${done} / ${n} · ${sort.score} richtig`;
  const item = sort.queue[0];
  $('#sCard').innerHTML = item
    ? `<div class="sortcard">${esc(item[0])}</div>`
    : `<div class="sortcard">Fertig: ${sort.score} von ${n} richtig</div><div class="row" style="margin-top:12px;justify-content:center"><button class="btn primary" id="sAgain">Nochmals</button></div>`;
  $('#sBins').innerHTML = S.bins.map((b, i) => `<button class="bin" data-bin="${i}" ${item ? '' : 'disabled'}><h3>${esc(b)}</h3><ul>${sort.placed[i].map(p => `<li class="${p.ok ? '' : 'miss'}">${esc(p.t)}</li>`).join('')}</ul></button>`).join('');
}
$('#sSets').addEventListener('click', e => { const b = e.target.closest('[data-set]'); if (b) startSort(b.dataset.set); });
$('#sCard').addEventListener('click', e => { if (e.target.id === 'sAgain') startSort(sort.set); });
$('#sBins').addEventListener('click', e => {
  const b = e.target.closest('[data-bin]'); if (!b || !sort.queue.length) return;
  const S = SORTS[sort.set]; const [t, right, lz] = sort.queue.shift();
  const ok = +b.dataset.bin === right;
  if (ok) sort.score++;
  sort.placed[right].push({ t, ok });
  record(lz || S.lz, ok);
  $('#sFb').innerHTML = ok ? `<b style="color:var(--ok)">Richtig.</b> «${esc(t)}» gehört zu ${esc(S.bins[right])}.` : `<b style="color:var(--bad)">Nicht ganz.</b> «${esc(t)}» gehört zu ${esc(S.bins[right])}.`;
  renderSort();
});

/* ---------- Zeitstrahl ---------- */
// Daten: zeitstrahl: { setId: { label, lz, items: [ { j: '1798', t: 'Ereignis', lz?, e?, s? } ] } }
// j ist die angezeigte Zeitangabe, s (optional) eine Zahl für die Reihenfolge, sonst die erste Jahreszahl in j.
const tkey = it => it.s != null ? it.s : +(String(it.j).match(/\d{3,4}/) || [0])[0];
const tlz = (S, it) => it.lz || S.lz;
function yearOpts(S, it) {
  const others = [...new Set(S.items.map(x => x.j))].filter(j => j !== it.j);
  const k = tkey(it), near = others.map(j => ({ j, d: Math.abs(tkey(S.items.find(x => x.j === j)) - k) })).sort((a, b) => a.d - b.d);
  return [it.j, ...near.slice(0, 3).map(x => x.j)];
}
const tl = { set: null, mode: 'reihe', round: [], order: [], placed: 0, miss: 0, cur: null, done: false, score: 0, total: 0 };
function startTl(set, mode) {
  tl.set = set; if (mode) tl.mode = mode;
  const S = TL[set];
  $('#zSets').innerHTML = Object.entries(TL).map(([k, v]) => `<button class="chip" data-zset="${k}" aria-pressed="${k === set}">${esc(v.label)}</button>`).join('');
  $$('#zModes [data-zmode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.zmode === tl.mode));
  $('#zFb').innerHTML = '';
  if (tl.mode === 'reihe') {
    const seen = new Set(); tl.round = shuffle(S.items).filter(it => !seen.has(tkey(it)) && seen.add(tkey(it))).slice(0, 6);
    tl.order = [...tl.round].sort((a, b) => tkey(a) - tkey(b)); tl.placed = 0; tl.miss = 0;
  } else { tl.score = 0; tl.total = 0; tl.queue = shuffle(S.items); nextYear(); return; }
  renderTl();
}
function nextYear() {
  const S = TL[tl.set];
  if (!tl.queue.length) tl.queue = shuffle(S.items);
  tl.cur = tl.queue.shift(); tl.done = false; tl.opts = shuffle(yearOpts(S, tl.cur));
  $('#zFb').innerHTML = ''; renderTl();
}
function renderTl() {
  const S = TL[tl.set];
  if (tl.mode === 'reihe') {
    const fertig = tl.placed === tl.order.length;
    $('#zTask').textContent = fertig ? 'Geschafft!' : 'Tippe die Ereignisse der Reihe nach an. Das früheste zuerst.';
    $('#zScore').textContent = `${tl.placed} / ${tl.order.length} · ${tl.miss} Fehler`;
    $('#zBody').innerHTML = `<ol class="ztrack">${tl.order.slice(0, tl.placed).map(it => `<li><span class="zj">${esc(it.j)}</span><span>${esc(it.t)}</span></li>`).join('')}</ol>
      ${fertig ? `<div class="row"><button class="btn primary" id="zAgain">Neue Runde</button></div>` : `<div class="opts">${tl.round.filter(it => tl.order.indexOf(it) >= tl.placed).map(it => `<button class="opt" data-zi="${S.items.indexOf(it)}">${esc(it.t)}</button>`).join('')}</div>`}`;
  } else {
    $('#zTask').textContent = 'Wann war das?';
    $('#zScore').textContent = tl.total ? `${tl.score} von ${tl.total} richtig` : '';
    $('#zBody').innerHTML = `<div class="sortcard">${esc(tl.cur.t)}</div><div class="opts">${tl.opts.map(j => `<button class="opt" data-zj="${esc(j)}" ${tl.done ? 'disabled' : ''}>${esc(j)}</button>`).join('')}</div>`;
  }
}
if (MODS.zeitstrahl) {
  $('#zSets').addEventListener('click', e => { const b = e.target.closest('[data-zset]'); if (b) startTl(b.dataset.zset); });
  $('#zModes').addEventListener('click', e => { const b = e.target.closest('[data-zmode]'); if (b) startTl(tl.set, b.dataset.zmode); });
  $('#zBody').addEventListener('click', e => {
    const S = TL[tl.set];
    if (e.target.id === 'zAgain') { startTl(tl.set); return; }
    const r = e.target.closest('[data-zi]');
    if (r) {
      const it = S.items[+r.dataset.zi], want = tl.order[tl.placed];
      if (it === want) {
        record(tlz(S, it), true); tl.placed++; renderTl();
        $('#zFb').innerHTML = tl.placed === tl.order.length
          ? `<div class="fb ${tl.miss ? 'bad' : 'good'}"><p><b class="k">${tl.miss ? `Fertig, mit ${tl.miss} ${tl.miss === 1 ? 'Fehler' : 'Fehlern'}.` : 'Alles in der richtigen Reihenfolge!'}</b> Lies die Reihe von oben nach unten nochmals durch.</p></div>`
          : `<p class="note"><b style="color:var(--ok)">Richtig.</b> ${esc(it.j)}: ${esc(it.e || it.t)}</p>`;
      } else {
        record(tlz(S, it), false); tl.miss++; r.classList.add('wrong');
        $('#zFb').innerHTML = `<p class="note"><b style="color:var(--bad)">Noch nicht.</b> «${esc(it.t)}» war ${esc(it.j)}. Vorher kommt noch etwas anderes.</p>`;
        $('#zScore').textContent = `${tl.placed} / ${tl.order.length} · ${tl.miss} Fehler`;
      }
      return;
    }
    const y = e.target.closest('[data-zj]');
    if (y && !tl.done) {
      const ok = y.dataset.zj === tl.cur.j;
      tl.done = true; tl.total++; if (ok) tl.score++;
      record(tlz(S, tl.cur), ok); renderTl();
      $$('#zBody [data-zj]').forEach(b => { if (b.dataset.zj === tl.cur.j) b.classList.add('right'); else if (b.dataset.zj === y.dataset.zj) b.classList.add('wrong'); });
      $('#zFb').innerHTML = `<div class="fb ${ok ? 'good' : 'bad'}"><p><b class="k">${ok ? 'Richtig.' : 'Nicht ganz.'}</b> ${esc(tl.cur.j)}: ${esc(tl.cur.e || tl.cur.t)}</p></div><div class="row" style="margin-top:12px"><button class="btn primary" id="zNext">Nächste Frage</button></div>`;
      $('#zNext').focus({ preventScroll: true });
    }
  });
  $('#zFb').addEventListener('click', e => { if (e.target.id === 'zNext') nextYear(); });
}

/* ---------- Aufgabenpool ---------- */
const POOL = [];
Object.entries(MCQ).forEach(([k, arr]) => arr.forEach((q, i) => POOL.push({ id: `mc:${k}:${i}`, lz: q.lz, kind: 'mc', q: q.q, o: q.o, e: q.e })));
Object.entries(SORTS).forEach(([k, S]) => S.items.forEach(([t, b, lz], i) => POOL.push({ id: `so:${k}:${i}`, lz: lz || S.lz, kind: 'mc', q: S.title, sub: t, o: [S.bins[b], ...S.bins.filter((_, j) => j !== b)], e: `«${t}» gehört zu: ${S.bins[b]}.` })));
Object.entries(SCENES).forEach(([sc, S]) => Object.entries(S.spots).forEach(([key, v]) => POOL.push({ id: `img:${sc}:${key}`, lz: v.lz[0], lz2: [...v.lz, ...(S.extraLz || [])], kind: 'img', scene: sc, key })));
Object.entries(TL).forEach(([k, S]) => S.items.forEach((it, i) => POOL.push({ id: `tl:${k}:${i}`, lz: tlz(S, it), kind: 'mc', q: 'Wann war das?', sub: it.t, o: yearOpts(S, it), e: `${it.j}: ${it.e || it.t}` })));
CARDS.forEach(c => POOL.push({ id: `card:${c.id}`, cid: c.id, lz: c.lz, kind: 'recall', q: c.q, a: c.a }));
EXPL.forEach((x, i) => POOL.push({ id: `ex:${i}`, lz: x.lz, kind: 'explain', q: x.q, pts: x.pts, a: x.a, min: x.min || .6 }));
const AREA_SHORT = Object.fromEntries(AREAS.map(a => [a.id, a.kurz || a.name]));
const KIND = { mc: 'Auswahl', img: 'Bild', recall: 'Abrufen', explain: 'Erklären' };
const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'], WDL = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const MON = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const pad = n => String(n).padStart(2, '0');
const dkey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const norm = x => String(x).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/\u00df/g, 'ss');
const detect = (text, p) => { const n = ' ' + norm(text) + ' '; return p.k.some(k => n.includes(norm(k))); };
const hasLz = (t, lz) => t.lz === lz || (t.lz2 || []).includes(lz);
function daysLeft() { if (!state.exam) return null; const d = new Date(state.exam + 'T00:00'), t = new Date(); t.setHours(0, 0, 0, 0); return Math.round((d - t) / 864e5); }
function weight(lz) { const s = status(lz); return s === 0 ? 4 : s === 3 ? 3 : s === 1 ? 2 + (1 - rate(lz)) * 2 : .6; }
function wpick(arr, w) { let r = Math.random() * w.reduce((a, b) => a + b, 0); for (let i = 0; i < arr.length; i++) { r -= w[i]; if (r <= 0) return arr[i]; } return arr[arr.length - 1]; }
function buildTraining(area) {
  const pool = POOL.filter(t => !area || LZ[t.lz].area === area);
  const pattern = ['mc', 'recall', 'explain', 'img', 'mc', 'recall', 'explain', 'mc', 'img', 'recall', 'explain', 'mc'];
  const out = [], used = new Set(), perLz = {};
  for (const kind of pattern) {
    let c = pool.filter(t => t.kind === kind && !used.has(t.id));
    if (!c.length) c = pool.filter(t => !used.has(t.id));
    if (!c.length) break;
    const w = c.map(t => weight(t.lz) * (state.mistakes.includes(t.id) ? 4 : 1) / (1 + (perLz[t.lz] || 0) * 2) * ((Date.now() - (state.seen[t.id] || 0)) < 864e5 ? .25 : 1));
    const t = wpick(c, w); out.push(t); used.add(t.id); perLz[t.lz] = (perLz[t.lz] || 0) + 1;
  }
  return out;
}
function buildMistakes() { return shuffle(POOL.filter(t => state.mistakes.includes(t.id))).slice(0, 15); }
function buildForLz(lz) {
  const c = POOL.filter(t => hasLz(t, lz));
  const ex = shuffle(c.filter(t => t.kind === 'explain')).slice(0, 2);
  return shuffle([...shuffle(c.filter(t => t.kind !== 'explain')).slice(0, 7 - ex.length), ...ex]);
}
function buildExam() {
  const out = [], used = new Set();
  Object.keys(LZ).forEach(lz => {
    const c = POOL.filter(t => hasLz(t, lz) && t.kind !== 'recall' && !used.has(t.id));
    const ex = c.filter(t => t.kind === 'explain'), im = c.filter(t => t.kind === 'img'), mc = c.filter(t => t.kind === 'mc');
    const r = Math.random();
    const from = (r < .55 && ex.length) ? ex : (r < .8 && im.length) ? im : mc.length ? mc : c;
    if (!from.length) return;
    const t = from[Math.floor(Math.random() * from.length)]; out.push(t); used.add(t.id);
  });
  out.push(...shuffle(POOL.filter(t => t.kind === 'explain' && !used.has(t.id))).slice(0, Math.max(0, EXAM_N - out.length)));
  const order = AREAS.map(a => a.id);
  return out.sort((a, b) => order.indexOf(LZ[a.lz].area) - order.indexOf(LZ[b.lz].area));
}
function markDay(kind) { const d = dkey(); state.done[d] = state.done[d] || {}; state.done[d][kind] = (state.done[d][kind] || 0) + 1; save(); }
function recordTask(t, ok) {
  [t.lz, ...(t.lz2 || []).filter(x => x !== t.lz)].forEach(id => record(id, ok));
  state.seen[t.id] = Date.now();
  state.mistakes = state.mistakes.filter(x => x !== t.id);
  if (!ok) state.mistakes.push(t.id);
  save();
}
function mapClone(scene, key) {
  const c = $(SCENES[scene].svg).cloneNode(true);
  c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
  c.querySelectorAll('.hl, .tapmark').forEach(n => n.remove());
  const target = c.querySelector(`[data-spot="${key}"]`);
  if (target) { const h = target.cloneNode(); h.removeAttribute('data-spot'); h.setAttribute('class', `hl ${target.classList.contains('hs-stroke') ? 'stroke' : 'fill'}`); c.appendChild(h); }
  return c;
}

/* ---------- Übungsrunde ---------- */
let sess = null, timer = 0;
function startSession(mode, tasks, title) {
  if (!tasks.length) return;
  sess = { mode, tasks, title, i: 0, ans: [], res: [], start: Date.now(), phase: 'run' };
  clearInterval(timer); if (mode === 'exam') timer = setInterval(tick, 1000);
  show('session'); renderTask();
}
function tick() { const el = $('#sTimer'); if (!el || !sess) return; const s = Math.floor((Date.now() - sess.start) / 1000); el.textContent = `${Math.floor(s / 60)}:${pad(s % 60)}`; }
function sessHead() {
  const n = sess.tasks.length, i = sess.i;
  return `<div class="sess-head"><div><span class="eyebrow">${esc(sess.title)}</span><h2>Aufgabe ${i + 1} von ${n}</h2></div>
    <div class="row">${sess.mode === 'exam' ? `<span class="timer">Zeit <b id="sTimer">0:00</b> · Richtwert 35 Min.</span>` : ''}<button class="btn small ghost" data-act="pause">Pause</button></div></div>
    <div class="bar"><i style="width:${(i / n * 100).toFixed(1)}%"></i></div>`;
}
function nextBtn(hidden) { return `<button class="btn primary" data-act="next" data-primary ${hidden ? 'hidden' : ''}>${sess.i + 1 < sess.tasks.length ? 'Weiter' : sess.mode === 'exam' ? 'Abgeben' : 'Fertig'}</button>`; }
function renderTask() {
  const t = sess.tasks[sess.i], exam = sess.mode === 'exam', box = $('#sessBox');
  const meta = `<p class="meta">${KIND[t.kind]} · ${esc(AREA_SHORT[LZ[t.lz].area])}</p>`;
  const next = nextBtn;
  let body = '';
  if (t.kind === 'mc' || t.kind === 'img') {
    let q, opts;
    if (t.kind === 'mc') { q = `<p class="tq">${esc(t.q)}</p>${t.sub ? `<p class="tsub">«${esc(t.sub)}»</p>` : ''}`; opts = shuffle(t.o.map((txt, j) => ({ txt, j }))); }
    else { const sp = SCENES[t.scene].spots; q = `<p class="tq">${esc(FRAGE(SCENES[t.scene]))}</p><div class="sessmap" id="sMap"></div>`; opts = shuffle([t.key, ...shuffle(Object.keys(sp).filter(k => k !== t.key)).slice(0, 3)]).map(k => ({ txt: sp[k].n, j: k === t.key ? 0 : 1 })); }
    body = q + `<div class="opts">${opts.map((o, n) => `<button class="opt" data-act="opt" data-j="${o.j}"><span class="key">${n + 1}</span>${esc(o.txt)}</button>`).join('')}</div><div id="tFb"></div><div class="row">${next(true)}</div>`;
  } else if (t.kind === 'recall') {
    body = `<p class="tq">${esc(t.q)}</p><textarea class="answer" id="tText" rows="3" placeholder="Notiere kurz, was du weisst (freiwillig)."></textarea><div id="tFb"></div><div class="row" id="tFoot"><button class="btn primary" data-act="reveal" data-primary>Antwort zeigen</button></div>`;
  } else {
    body = `<p class="tq">${esc(t.q)}</p><textarea class="answer" id="tText" rows="7" placeholder="Schreibe deine Erklärung in ganzen Sätzen oder Stichworten."></textarea><div id="tFb"></div><div class="row" id="tFoot">${exam ? next(false) : '<button class="btn primary" data-act="check" data-primary>Antwort prüfen</button><span class="note"><kbd>Strg</kbd> + <kbd>Enter</kbd></span>'}</div>`;
  }
  box.innerHTML = sessHead() + `<div class="panel taskcard">${meta}${body}</div>`;
  if (t.kind === 'img') $('#sMap').appendChild(mapClone(t.scene, t.key));
  if (exam) tick();
  const ta = $('#tText'); if (ta) ta.focus({ preventScroll: true });
}
function checklistHtml(t, text) {
  return `<div class="checklist"><p class="meta">Diese Punkte gehören in eine gute Antwort. Hake ab, was du sinngemäss geschrieben hast:</p>
    ${t.pts.map((p, i) => { const d = detect(text, p); return `<label class="ck"><input type="checkbox" data-pt="${i}" ${d ? 'checked' : ''}><span>${esc(p.t)}</span>${d ? '<em>erkannt</em>' : ''}</label>`; }).join('')}
    <details><summary>Musterantwort anzeigen</summary><p>${esc(t.a)}</p></details></div>`;
}
function scoreChecklist(scope, t) { const n = $$('input[data-pt]', scope).filter(x => x.checked).length; return { n, of: t.pts.length, ok: n / t.pts.length >= t.min }; }
function nextTask() {
  sess.i++;
  if (sess.i < sess.tasks.length) { renderTask(); return; }
  if (sess.mode === 'exam') { clearInterval(timer); sess.dur = Date.now() - sess.start; sess.phase = 'review'; renderReview(); }
  else finishTrain();
}
$('#sessBox').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b || !sess) return;
  const act = b.dataset.act, t = sess.tasks[sess.i], exam = sess.mode === 'exam';
  if (act === 'pause') { show(exam ? 'pruefung' : 'heute'); return; }
  if (act === 'opt') {
    if (exam) {
      $$('#sessBox .opt').forEach(o => o.classList.toggle('picked', o === b));
      sess.ans[sess.i] = { j: b.dataset.j, txt: b.textContent.slice(1) };
      $('#sessBox [data-act="next"]').hidden = false; return;
    }
    if (sess.res[sess.i] !== undefined) return;
    const ok = b.dataset.j === '0';
    $$('#sessBox .opt').forEach(o => { o.disabled = true; if (o.dataset.j === '0') o.classList.add('right'); });
    if (!ok) b.classList.add('wrong');
    sess.res[sess.i] = ok; recordTask(t, ok);
    const expl = t.kind === 'mc' ? t.e : `${SCENES[t.scene].spots[t.key].n}: ${SCENES[t.scene].spots[t.key].t}`;
    $('#tFb').innerHTML = `<div class="fb ${ok ? 'good' : 'bad'}"><p><b class="k">${ok ? 'Richtig!' : 'Nicht ganz.'}</b> ${esc(expl)}</p></div>`;
    const nb = $('#sessBox [data-act="next"]'); nb.hidden = false; nb.focus({ preventScroll: true }); return;
  }
  if (act === 'reveal') {
    $('#tFb').innerHTML = `<div class="fb"><p class="meta">Musterantwort</p><p style="margin-top:4px">${esc(t.a)}</p></div>`;
    $('#tFoot').innerHTML = `<span class="note">Wie gut wusstest du es?</span><button class="btn" data-act="rate" data-r="2" style="border-color:var(--ok)">Sicher gewusst</button><button class="btn" data-act="rate" data-r="1" style="border-color:var(--warn)">Unsicher</button><button class="btn" data-act="rate" data-r="0" style="border-color:var(--bad)">Nicht gewusst</button>`;
    return;
  }
  if (act === 'rate') {
    const r = +b.dataset.r, bx = state.cards[t.cid] || 1;
    state.cards[t.cid] = r === 2 ? Math.min(3, bx + 1) : r === 1 ? bx : 1;
    sess.res[sess.i] = r === 2; recordTask(t, r === 2); nextTask(); return;
  }
  if (act === 'check') {
    $('#tFb').innerHTML = checklistHtml(t, $('#tText').value);
    $('#tFoot').innerHTML = `<button class="btn primary" data-act="grade" data-primary>Auswerten</button>`; return;
  }
  if (act === 'grade') {
    const sc = scoreChecklist($('#tFb'), t);
    $$('#tFb .ck').forEach(l => { l.classList.toggle('miss', !$('input', l).checked); $('input', l).disabled = true; });
    sess.res[sess.i] = sc.ok; recordTask(t, sc.ok);
    $('#tFoot').innerHTML = `<div class="fb ${sc.ok ? 'good' : 'bad'}" style="flex:1"><b class="k">${sc.n} von ${sc.of} Punkten.</b> ${sc.ok ? 'Gut erklärt!' : 'Lies die rot markierten Punkte und die Musterantwort nochmals durch.'}</div>${nextBtn(false)}`;
    $('#sessBox [data-act="next"]').focus({ preventScroll: true }); return;
  }
  if (act === 'next') {
    if (exam && t.kind === 'explain') sess.ans[sess.i] = { text: $('#tText').value };
    nextTask();
  }
});
document.addEventListener('keydown', e => {
  if ($('#v-session').hidden || !sess) return;
  if (e.target.matches('textarea')) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { const p = $('#sessBox [data-primary]:not([hidden])'); if (p) { e.preventDefault(); p.click(); } }
    return;
  }
  if (e.target.matches('input, button') && e.key === 'Enter') return;
  if (/^[1-9]$/.test(e.key)) { const o = $$('#sessBox .opt')[+e.key - 1]; if (o && !o.disabled) o.click(); }
  if (e.key === 'Enter') { const p = $('#sessBox [data-primary]:not([hidden])'); if (p) { e.preventDefault(); p.click(); } }
});
function finishTrain() {
  const n = sess.res.length, ok = sess.res.filter(Boolean).length;
  markDay('train'); sess.phase = 'done';
  const lzs = [...new Set(sess.tasks.map(t => t.lz))];
  $('#sessBox').innerHTML = `<div class="panel taskcard" style="text-align:left">
    <span class="eyebrow">${esc(sess.title)}</span><h2>Geschafft${profil.name ? ', ' + esc(profil.name) : ''}!</h2>
    <p><span class="result-big">${ok}</span> <span class="lead">von ${n} Aufgaben richtig</span></p>
    <h3>Diese Lernziele hast du geübt</h3>
    <ol class="lzlist">${lzs.map(id => `<li>${dotHtml(id)}<div class="txt">Ich kann ${esc(LZ[id].text)}</div></li>`).join('')}</ol>
    <div class="row"><button class="btn primary" data-act2="train">Noch eine Runde</button><button class="btn" data-go="heute">Zu «Heute üben»</button></div></div>`;
}
function renderReview() {
  const items = sess.tasks.map((t, i) => ({ t, i })).filter(x => x.t.kind === 'explain');
  if (!items.length) { renderExamResult(); return; }
  $('#sessBox').innerHTML = `<div class="sess-head"><div><span class="eyebrow">${esc(sess.title)}</span><h2>Korrektur deiner Erklärungen</h2></div></div>
    <p class="lead">Vergleiche jede Antwort mit der Checkliste und hake ehrlich ab, was du sinngemäss geschrieben hast. Was die App erkannt hat, ist schon angehakt.</p>
    ${items.map(({ t, i }) => `<div class="panel taskcard" data-rev="${i}"><p class="meta">Aufgabe ${i + 1} · ${esc(AREA_SHORT[LZ[t.lz].area])}</p><p class="tq">${esc(t.q)}</p>
      <div class="fb"><p class="meta">Deine Antwort</p><p style="white-space:pre-wrap;margin-top:4px">${esc((sess.ans[i] || {}).text || '(keine Antwort)')}</p></div>
      ${checklistHtml(t, (sess.ans[i] || {}).text || '')}</div>`).join('')}
    <div class="row"><button class="btn primary big" data-act3="result">Auswertung anzeigen</button></div>`;
}
function renderExamResult() {
  let pts = 0; const per = {}, wrong = [];
  sess.tasks.forEach((t, i) => {
    let p, ok, info = '';
    if (t.kind === 'explain') {
      const card = $(`#sessBox [data-rev="${i}"]`);
      const sc = card ? scoreChecklist(card, t) : { n: 0, of: t.pts.length, ok: false };
      p = sc.n / sc.of; ok = sc.ok;
      if (!ok) info = 'Fehlende Punkte: ' + t.pts.filter((_, k) => !(card && $(`input[data-pt="${k}"]`, card).checked)).map(x => x.t).join(' · ');
    } else {
      ok = (sess.ans[i] || {}).j === '0'; p = ok ? 1 : 0;
      if (!ok) info = `Richtig wäre: ${t.kind === 'mc' ? t.o[0] : SCENES[t.scene].spots[t.key].n}${t.kind === 'mc' ? '. ' + t.e : ''}`;
    }
    pts += p; recordTask(t, ok);
    const a = LZ[t.lz].area; per[a] = per[a] || [0, 0]; per[a][0] += p; per[a][1] += 1;
    if (!ok) wrong.push({ t, i, info });
  });
  const max = sess.tasks.length, pct = Math.round(pts / max * 100), note = Math.round((1 + 5 * pts / max) * 2) / 2;
  const mins = Math.round(sess.dur / 60000);
  state.exams.push({ d: dkey(), pct, note, mins }); markDay('exam'); sess.phase = 'done';
  $('#sessBox').innerHTML = `<div class="panel taskcard">
    <span class="eyebrow">Probeprüfung · ${mins} Minuten</span><h2>Dein Ergebnis</h2>
    <p><span class="result-big">${pct} %</span> <span class="lead">· ungefähre Note ${note.toFixed(1)}</span></p>
    <p class="note">${pts.toFixed(1)} von ${max} Punkten. Die Note ist nur ein Richtwert, die echte Prüfung kann anders gewichten.</p>
    <h3>Nach Thema</h3>
    <div class="areabars">${AREAS.filter(a => per[a.id]).map(a => { const [p, m] = per[a.id], q = p / m; return `<div><span>${esc(a.name)}</span><div class="bar"><i style="width:${(q * 100).toFixed(0)}%;background:${q >= .8 ? 'var(--ok)' : q >= .5 ? 'var(--warn)' : 'var(--bad)'}"></i></div><span>${Math.round(q * 100)} %</span></div>`; }).join('')}</div>
    ${wrong.length ? `<h3>Das solltest du nochmals anschauen (${wrong.length})</h3><div class="revlist">${wrong.map(w => `<div class="rev"><span class="meta">Aufgabe ${w.i + 1} · ${KIND[w.t.kind]}</span><span>${esc(w.t.kind === 'img' ? FRAGE(SCENES[w.t.scene]) : w.t.q)}${w.t.sub ? ` <b>«${esc(w.t.sub)}»</b>` : ''}</span><span>${esc(w.info)}</span></div>`).join('')}</div>` : '<p>Alles richtig. Super!</p>'}
    <div class="row">${wrong.length ? '<button class="btn primary" data-act2="mist">Fehler jetzt üben</button>' : ''}<button class="btn" data-go="heute">Zu «Heute üben»</button></div></div>`;
  window.scrollTo({ top: 0 });
}
$('#sessBox').addEventListener('click', e => { if (e.target.closest('[data-act3="result"]')) renderExamResult(); });

/* ---------- Heute, Probeprüfung, Thema ---------- */
function planHtml() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const n = daysLeft(); if (n == null || isNaN(n)) return '<li>Gib unter «Fortschritt» das Prüfungsdatum ein.</li>';
  if (n < 0) return '<li>Die Prüfung ist vorbei.</li>';
  const out = [];
  for (let k = 0; k <= Math.min(n, 10); k++) {
    const d = new Date(today); d.setDate(d.getDate() + k);
    const left = n - k, done = state.done[dkey(d)] || {};
    let todo, ok;
    if (left === 0) { todo = 'Prüfung. Viel Glück!'; ok = false; }
    else if (left === 1) { todo = 'Probeprüfung, danach Fehler üben'; ok = !!done.exam; }
    else if (left === 3) { todo = 'Tagestraining und Probeprüfung'; ok = !!done.exam && !!done.train; }
    else { todo = 'Tagestraining (ca. 15 Min.)'; ok = !!done.train; }
    out.push(`<li class="${k === 0 ? 'today' : ''} ${left === 0 ? 'exam' : ''}"><span class="pd">${WD[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.</span><span>${k === 0 ? 'Heute: ' : ''}${todo}</span><span class="pc">${ok ? '✓' : ''}</span></li>`);
  }
  return out.join('');
}
function renderHeute() {
  const n = daysLeft(), all = Object.keys(LZ), green = all.filter(id => status(id) === 2).length;
  const ex = state.exam ? new Date(state.exam + 'T00:00') : null;
  const when = ex ? `${WDL[ex.getDay()]}, ${ex.getDate()}. ${MON[ex.getMonth()]}` : '';
  const line = n == null ? '' : n > 1 ? `Noch ${n} Tage bis zur Prüfung am ${when}.` : n === 1 ? 'Morgen ist die Prüfung. Mach heute die Probeprüfung und übe danach deine Fehler.' : n === 0 ? 'Heute ist die Prüfung. Du hast gut geübt. Viel Glück!' : 'Die Prüfung ist vorbei.';
  const running = sess && sess.mode !== 'exam' && sess.phase === 'run';
  const last = state.exams[state.exams.length - 1];
  const weak = all.map(id => ({ id, w: weight(id) })).filter(x => status(x.id) !== 2).sort((a, b) => b.w - a.w).slice(0, 4);
  $('#heuteBox').innerHTML = `
    <div class="hello"><h2>Hallo${profil.name ? ' ' + esc(profil.name) : '!'}</h2><p class="lead">${line}</p>
      ${profil.name ? '' : '<form class="namebox" id="nameForm"><label for="nameIn">Wie heisst du?</label><input id="nameIn" maxlength="40" autocomplete="given-name"><button class="btn small primary">Speichern</button></form>'}</div>
    <div class="grid2">
      <div class="panel hero-card">
        <span class="eyebrow">Tagestraining</span>
        <h3>12 gemischte Aufgaben, etwa 15 Minuten</h3>
        <p>Die App wählt, was du gerade am meisten brauchst: neue und unsichere Lernziele, deine Fehler und alles, was du seit ${STALE_DAYS} Tagen nicht mehr geübt hast. Dazu gehören immer auch Erklär-Aufgaben wie in der Prüfung.</p>
        <div class="row">${running ? `<button class="btn primary big" data-act2="resume">Runde fortsetzen (${sess.i + 1}/${sess.tasks.length})</button><button class="btn" data-act2="train">Neue Runde</button>` : '<button class="btn primary big" data-act2="train">Training starten</button>'}</div>
        <p class="note">Tastatur: <kbd>1</kbd>–<kbd>4</kbd> wählt eine Antwort, <kbd>Enter</kbd> geht weiter.</p>
      </div>
      <div class="panel" style="display:grid;gap:10px;align-content:start"><h3>Dein Plan bis zur Prüfung</h3><ol class="plan">${planHtml()}</ol></div>
    </div>
    <div class="grid3">
      <div class="panel stat"><span class="meta">Lernziele sicher</span><b>${green} / ${all.length}</b><div class="bar"><i style="width:${(green / all.length * 100).toFixed(0)}%"></i></div></div>
      <div class="panel stat"><span class="meta">Fehlerheft</span><b>${state.mistakes.length} ${state.mistakes.length === 1 ? 'Aufgabe' : 'Aufgaben'}</b>${state.mistakes.length ? '<button class="btn small" data-act2="mist">Fehler üben</button>' : '<span class="note">Falsche Antworten landen hier.</span>'}</div>
      <div class="panel stat"><span class="meta">Letzte Probeprüfung</span><b>${last ? `${last.pct} % · Note ≈ ${last.note.toFixed(1)}` : 'noch keine'}</b><button class="btn small" data-go="pruefung">Zur Probeprüfung</button></div>
    </div>
    ${weak.length ? `<div class="panel" style="display:grid;gap:12px"><h3>Diese Lernziele brauchen dich am meisten</h3><ol class="lzlist">${weak.map(x => `<li>${dotHtml(x.id)}<div class="txt">Ich kann ${esc(LZ[x.id].text)}<div class="mods"><button class="modlink strong" data-act2="lz" data-lz="${x.id}">Jetzt üben</button><span class="note">${esc(AREA_SHORT[LZ[x.id].area])}</span></div></div></li>`).join('')}</ol></div>` : ''}`;
}
function examTip() {
  const n = daysLeft(); if (n == null || isNaN(n) || n < 2) return '';
  const d = k => { const x = new Date(state.exam + 'T00:00'); x.setDate(x.getDate() - k); return WDL[x.getDay()]; };
  return n >= 4 ? `<li>Tipp: Mach sie am ${d(3)} und am ${d(1)} vor der Prüfung.</li>` : `<li>Tipp: Mach sie spätestens am ${d(1)}.</li>`;
}
function renderPruefung() {
  const running = sess && sess.mode === 'exam' && sess.phase !== 'done';
  $('#pruefBox').innerHTML = `
    <div><span class="eyebrow">Generalprobe</span><h2>Probeprüfung</h2></div>
    <p class="lead">${EXAM_N} Aufgaben zu allen ${Object.keys(LZ).length} Lernzielen, wie in der echten Prüfung: ohne Hilfe und ohne Rückmeldung zwischendurch. Am Schluss korrigierst du deine Erklärungen mit einer Checkliste und siehst dein Ergebnis pro Thema.</p>
    <div class="grid2">
      <div class="panel hero-card">
        <ul class="plain"><li>Dauer: etwa 35 Minuten. Die Zeit läuft mit.</li><li>Gut die Hälfte sind Erklär-Aufgaben.</li><li>Alles, was falsch ist, kommt ins Fehlerheft.</li>${examTip()}</ul>
        <div class="row">${running ? `<button class="btn primary big" data-act2="resume">Fortsetzen (${Math.min(sess.i + 1, sess.tasks.length)}/${sess.tasks.length})</button><button class="btn" data-act2="exam">Neu beginnen</button>` : '<button class="btn primary big" data-act2="exam">Probeprüfung starten</button>'}</div>
      </div>
      <div class="panel" style="display:grid;gap:10px;align-content:start"><h3>Bisherige Probeprüfungen</h3>
        ${state.exams.length ? `<table class="hist"><thead><tr><th>Datum</th><th>Ergebnis</th><th>Note ≈</th><th>Zeit</th></tr></thead><tbody>${state.exams.slice().reverse().map(x => { const d = new Date(x.d + 'T00:00'); return `<tr><td>${WD[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.</td><td>${x.pct} %</td><td>${x.note.toFixed(1)}</td><td>${x.mins} Min.</td></tr>`; }).join('')}</tbody></table>` : '<p class="note">Noch keine. Die erste zeigt dir, wo du stehst.</p>'}
      </div>
    </div>`;
}
function renderThema(id) {
  const a = AREAS.find(x => x.id === id) || AREAS[0];
  const green = a.lz.filter(l => status(l[0]) === 2).length;
  $('#themaBox').innerHTML = `
    <div class="row" style="justify-content:space-between;align-items:flex-end"><div><span class="eyebrow">Thema</span><h2>${esc(a.name)}</h2></div><button class="btn primary big" data-act2="topic" data-area="${a.id}">Thema trainieren</button></div>
    <div style="display:grid;gap:6px"><div class="bar"><i style="width:${(green / a.lz.length * 100).toFixed(0)}%"></i></div><p class="note">${green} von ${a.lz.length} Lernzielen sicher</p></div>
    <div class="panel"><ol class="lzlist">${a.lz.map(([lz, text, mods]) => `<li>${dotHtml(lz)}<div class="txt">Ich kann ${esc(text)}<div class="mods"><button class="modlink strong" data-act2="lz" data-lz="${lz}">Lernziel üben</button>${(mods || []).map(modLink).join('')}</div></div></li>`).join('')}</ol></div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act2]'); if (!b) return;
  const act = b.dataset.act2;
  if (act === 'train') startSession('train', buildTraining(), 'Tagestraining');
  if (act === 'mist') startSession('train', buildMistakes(), 'Fehlerheft');
  if (act === 'topic') startSession('train', buildTraining(b.dataset.area), 'Training: ' + AREA_SHORT[b.dataset.area]);
  if (act === 'lz') startSession('train', buildForLz(b.dataset.lz), 'Lernziel üben');
  if (act === 'exam') startSession('exam', buildExam(), 'Probeprüfung');
  if (act === 'resume' && sess) { show('session'); if (sess.phase === 'review') renderReview(); else renderTask(); if (sess.mode === 'exam' && sess.phase === 'run') { clearInterval(timer); timer = setInterval(tick, 1000); } }
});

/* ---------- Eigene Werkzeuge des Themas ---------- */
const api = { $, $$, el, esc, shuffle, record, status, reduced, NS, show, renderMC };
const hooks = registered.map(w => (w.init && w.init(api)) || {});

/* ---------- Start ---------- */
(() => {
  // Zeichnungen brauchen Geometrie: alle Bereiche kurz (unsichtbar) einblenden
  const hidden = $$('main.content .view[role=tabpanel], .mapwrap').filter(n => n.hidden);
  const main = $('main.content');
  hidden.forEach(n => n.hidden = false); main.style.visibility = 'hidden';
  try { hooks.forEach(h => h.vorbereiten && h.vorbereiten()); } finally { hidden.forEach(n => n.hidden = true); main.style.visibility = ''; }
})();
if (MODS.bild) setScene(Object.keys(SCENES)[0]);
if (MODS.karten) { renderFilter(); buildDeck(); renderCard(); }
if (MODS.sortieren) startSort(Object.keys(SORTS)[0]);
if (MODS.zeitstrahl) startTl(Object.keys(TL)[0]);
Object.keys(MCQ).forEach(renderMC);
show('heute');
}
})();
