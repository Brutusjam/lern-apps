// Rauchtest für alle Lern-Apps: lädt jede App, klickt alle Bereiche an,
// spielt ein Tagestraining und eine Probeprüfung komplett durch und meldet Fehler.
// Aufruf: npm test            (alle Themen)
//         npm test -- geografie-naturphaenomene   (ein Thema)
// Screenshots landen in tests/ausgabe/ (nicht im Git).
import { chromium } from 'playwright';
import { readdirSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'tests/ausgabe');
mkdirSync(out, { recursive: true });
const only = process.argv[2];
const themen = readdirSync(resolve(root, 'themen')).filter(t => existsSync(resolve(root, 'themen', t, 'index.html')) && (!only || t === only));
const exe = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
let failed = false;

// Repository sauber halten: keine fremden Unterlagen, Schweizer Rechtschreibung
try {
  const files = execSync('git ls-files', { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean);
  const docs = files.filter(f => /\.(pdf|docx?|pptx?|odt|key)$/i.test(f) || f.startsWith('unterlagen/'));
  const images = files.filter(f => /\.(jpe?g|png|gif|webp|heic)$/i.test(f));
  const eszett = files.filter(f => /^(themen\/.*\.(js|html)|index\.html)$/.test(f) && readFileSync(resolve(root, f), 'utf8').includes('ß'));
  if (docs.length) { failed = true; console.log('✗ Unterlagen im Repository (gehören nach unterlagen/): ' + docs.join(', ')); }
  if (eszett.length) { failed = true; console.log('✗ «ß» gefunden (Schweizer Rechtschreibung: «ss»): ' + eszett.join(', ')); }
  if (images.length) console.log('! Bilddateien im Repository, Herkunft prüfen (nur eigene Bilder): ' + images.join(', '));
  if (!docs.length && !eszett.length) console.log('✓ Repository: keine Unterlagen, kein «ß»');
} catch (e) { console.log('! Repository-Prüfung übersprungen: ' + e.message); }

async function answerCurrent(p, exam) {
  const box = '#sessBox';
  if (await p.$(`${box} [data-act="opt"]`)) {
    await p.click(`${box} [data-act="opt"] >> nth=0`);
    await p.click(`${box} [data-act="next"]`);
  } else if (await p.$(`${box} [data-act="reveal"]`)) {
    await p.click(`${box} [data-act="reveal"]`);
    await p.click(`${box} [data-act="rate"][data-r="2"]`);
  } else if (exam) {
    await p.fill('#tText', 'Testantwort');
    await p.click(`${box} [data-act="next"]`);
  } else {
    await p.fill('#tText', 'Testantwort');
    await p.click(`${box} [data-act="check"]`);
    await p.click(`${box} [data-act="grade"]`);
    await p.click(`${box} [data-act="next"]`);
  }
}

for (const t of themen) {
  const errors = [];
  const p = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  p.on('pageerror', e => errors.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text())) errors.push(m.text()); });
  const url = pathToFileURL(resolve(root, 'themen', t, 'index.html')).href;
  await p.goto(url + '?name=Test');
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/${t}-heute.png` });

  // Alle Bereiche der Seitenleiste
  const tabs = await p.$$eval('.nav-item', bs => bs.map(b => [b.dataset.tab, b.dataset.area || '']));
  for (const [tab, area] of tabs) {
    await p.click(`.nav-item[data-tab="${tab}"]${area ? `[data-area="${area}"]` : ''}`);
    await p.waitForTimeout(120);
    const visible = await p.$eval(`#v-${tab}`, v => !v.hidden);
    if (!visible) errors.push(`Bereich ${tab} wird nicht angezeigt`);
  }

  // Bild-Quiz: jede Szene, eine Benennen-Aufgabe beantworten
  if (await p.$('#t-bild')) {
    await p.click('#t-bild');
    const scenes = await p.$$eval('[data-scene-pick]', bs => bs.map(b => b.dataset.scenePick));
    for (const sc of scenes) {
      await p.click(`[data-scene-pick="${sc}"]`);
      for (let k = 0; k < 6 && !(await p.$('#bAnswer .opt')); k++) await p.click(`[data-scene-pick="${sc}"]`);
      if (await p.$('#bAnswer .opt')) { await p.click('#bAnswer .opt >> nth=0'); await p.waitForSelector('#bNext'); }
      await p.screenshot({ path: `${out}/${t}-bild-${sc}.png` });
    }
  }
  // Karteikarten und Sortieren kurz bedienen
  if (await p.$('#t-karten')) { await p.click('#t-karten'); await p.click('#cFlip'); await p.click('#cYes'); }
  if (await p.$('#t-sortieren')) { await p.click('#t-sortieren'); await p.click('[data-bin="0"]'); }

  // Tagestraining komplett
  await p.click('#t-heute');
  await p.click('[data-act2="train"]');
  const n = await p.$$eval('#sessBox h2', h => +h[0].textContent.match(/von (\d+)/)[1]);
  for (let k = 0; k < n; k++) await answerCurrent(p, false);
  if (!(await p.textContent('#sessBox')).includes('Geschafft')) errors.push('Tagestraining endet nicht mit Zusammenfassung');

  // Probeprüfung komplett
  await p.click('#t-pruefung');
  await p.click('[data-act2="exam"]');
  const m = await p.$$eval('#sessBox h2', h => +h[0].textContent.match(/von (\d+)/)[1]);
  for (let k = 0; k < m; k++) await answerCurrent(p, true);
  if (await p.$('[data-act3="result"]')) await p.click('[data-act3="result"]');
  if (!(await p.textContent('#sessBox')).includes('Dein Ergebnis')) errors.push('Probeprüfung zeigt kein Ergebnis');
  await p.screenshot({ path: `${out}/${t}-ergebnis.png` });

  console.log(`${errors.length ? '✗' : '✓'} ${t}: ${tabs.length} Bereiche, Training ${n} Aufgaben, Prüfung ${m} Aufgaben`);
  errors.forEach(e => console.log('   Fehler: ' + e));
  if (errors.length) failed = true;
  await p.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
