# Lern-Apps: Anleitung für Claude

Lern-Apps für Prüfungen am Gymnasium in der Schweiz. Zielgruppe: Schülerinnen und Schüler ab etwa 13 Jahren, die zu Hause am PC üben. Jede App deckt die Lernziele **einer** Prüfung ab. Der Auftraggeber ist ein Elternteil; die Apps sollen später öffentlich über GitHub Pages verfügbar sein.

Für ein neues Thema den Skill `/neue-lernapp` verwenden.

## Aufbau

```
engine/lernapp.js     Grundgerüst: Navigation, Tagestraining, Erklär-Aufgaben, Probeprüfung,
                      Fortschritt/Ampel, Karteikarten, Sortieren, Bild-Quiz, Zeitstrahl, Profil
engine/lernapp.css    Design für alle Apps (nur helles Thema, Farben als Tokens in :root)
themen/<id>/          eine App pro Ordner
  index.html          Kopf, Schriften, #vorlagen (Bild-Quiz-Szenen, eigene Werkzeuge), Skripte
  inhalt.js           NUR Daten: window.LERNAPP_INHALT = { … }
  werkzeuge.js/.css   optional: themeneigene Übungen (Simulationen, Karten, Zeitstrahl …)
themen/_vorlage/      lauffähige Vorlage für ein neues Thema
tests/smoke.mjs       Rauchtest für alle Apps (npm test)
index.html            Startseite mit einer Karte pro App
unterlagen/           private Unterlagen (Notizbücher, Scans). Von Git ausgeschlossen.
```

Reines HTML/CSS/JS ohne Build-Schritt und ohne Server. Jede App muss direkt aus dem Dateisystem (`file://`) und über GitHub Pages laufen. Keine externen Skripte; einzige externe Ressource sind die Google Fonts.

Grundsatz: **Inhalt gehört in `inhalt.js`, Logik ins Grundgerüst.** Was mehr als ein Thema brauchen könnte, kommt ins Grundgerüst (mit Rückwärtskompatibilität für alle bestehenden Apps), nicht kopiert in ein Thema.

## Datenformat `inhalt.js`

```js
window.LERNAPP_INHALT = {
  id: 'geschichte-napoleon',      // = Ordnername; Speicher im Browser: 'lernapp:' + id
  speicher: '…',                  // optional: abweichender Speicherschlüssel (nur für Altbestand)
  eyebrow: 'Geschichte · 2. Gymnasium · Napoleon',
  titel: 'Napoleon <span>und die Schweiz</span>',   // HTML erlaubt, <span> wird blau
  untertitel: 'Ein Satz.',
  pruefung: '2026-12-03',         // JJJJ-MM-TT
  pruefungsAufgaben: 20,          // optional, Länge der Probeprüfung
  auffrischenNachTagen: 2,        // optional
  hinweis: '…',                   // optional, ersetzt «Ohne Gewähr …» in der Fusszeile
  farbe: 'apricot',               // optional: blau (Standard), apricot, salbei, lavendel, rose, tuerkis

  themen: [ { id, name, kurz, lz: [ [lzId, '…Text ab «Ich kann»', ['karten', 'sortieren', 'bild:szene', 'werkzeugId']] ] } ],
  fragen: { setName: [ { lz, q, o: [richtig, falsch, falsch], e: 'Erklärung' } ] },
  karten: [ { id, lz, g: 'gruppe', q, a } ],
  kartenGruppen: { gruppe: 'Anzeigename' },
  sortieren: { setId: { label, title, lz, bins: ['A', 'B'], items: [ ['Begriff', binIndex, optional lzId] ] } },
  zeitstrahl: { setId: { label, lz, items: [ { j: '1798–1803', t: 'Ereignis', s: 1798, lz, e: 'Erklärung' } ] } },
  erklaeren: [ { lz, q, pts: [ { t: 'Punkt der Checkliste', k: ['stichwort', …] } ], a: 'Musterantwort', min: .6 } ],
  bildquiz: { titel, text, szenen: { id: { label, svg: '#svgId', hs: '#hotspotGruppe', hl: '#markierGruppe', wrap: '#rahmenId', tippe: 'Tippe im Bild auf:', frage: 'Was ist markiert?', extraLz: [], prio: [spotIds], spots: { spotId: { n: 'Name', lz: [lzIds], t: 'Erklärung' } } } } }
};
```

- Bei Auswahlfragen steht die **richtige Antwort immer zuerst**; die App mischt.
- Lernziel-Texte beginnen mit «…», weil die App «Ich kann» davorsetzt.
- Stichworte `k` werden ohne Gross-/Kleinschreibung und mit ä→ae, ö→oe, ü→ue verglichen. Wortstämme verwenden (`'abgelager'`, `'kohlensaeure'`), damit Varianten erkannt werden. Die Erkennung ist nur eine Hilfe, die Schülerin hakt selbst ab.
- Ein Auswahl-Set erscheint zusätzlich überall, wo im HTML `<div class="mcs" id="setName"></div>` steht (mit Knopf `data-remix="setName"` zum Neumischen).
- Bild-Quiz-Szenen sind SVGs in `#vorlagen` (`.mapwrap[data-szene]`). Klickflächen: Elemente mit `class="hs hs-fill"` oder `class="hs hs-stroke"` und `data-spot="spotId"`. `tippe` und `frage` passen den Wortlaut an (Standard: «Tippe auf der Karte auf:», «Wie heisst die markierte Form?»). Keine `<marker>`- oder `<pattern>`-Verweise in Szenen: In der Probeprüfung wird die Szene ohne IDs kopiert.
- Zeitstrahl: `j` ist die angezeigte Zeitangabe, `s` (optional) eine Zahl für die Reihenfolge, sonst gilt die erste Jahreszahl in `j`. Jedes Ereignis wird zusätzlich eine Auswahlfrage «Wann war das?». In einer Runde «Reihenfolge» kommen nur Ereignisse mit verschiedenem `s` vor.

## Eigene Werkzeuge (`werkzeuge.js`)

```js
LernApp.werkzeug({
  init(api) {           // api: { $, $$, el, esc, shuffle, record, status, reduced, NS, show, renderMC }
    // HTML steht in index.html als <section data-werkzeug="id" data-name="Name"> in #vorlagen
    // record(lzId, richtig) zählt für die Ampel
    return {
      vorbereiten() {}, // beim Start, während alle Bereiche kurz sichtbar sind (Geometrie, isPointInFill)
      onShow(tab) {}    // bei jedem Wechsel des Bereichs
    };
  }
});
```

## Didaktische Regeln

- **Jedes Lernziel** braucht mindestens: eine Erklär-Aufgabe, eine Karteikarte und eine Auswahlfrage oder ein Sortier-Item. Sonst kann die Ampel nie grün werden und die Probeprüfung deckt es schlecht ab.
- Lernziele mit «erklären», «beschreiben», «begründen» → mehrere Erklär-Aufgaben. «Auf Bildern erkennen» → Bild-Quiz. «Aufzählen», «verorten» → Karte oder eigenes Werkzeug.
- Jede Rückmeldung erklärt **warum**, nicht nur richtig/falsch.
- Inhalte stammen aus den Unterlagen des Unterrichts. Nichts erfinden: Wo die Unterlagen nur einen Titel liefern, knapp bleiben und das dem Auftraggeber sagen.
- Fakten mit Zahlen (Jahreszahlen, Orte, Beträge) immer gegen die Unterlagen prüfen.

## Sprache und Stil

- Deutsch mit **Schweizer Rechtschreibung**: immer «ss», nie «ß». Anführungszeichen «…».
- Die App spricht die Lernenden mit **du** an. Kurze, klare Sätze. Keine Emojis.
- Mit dem Auftraggeber im Chat: **Sie**.
- Commit-Nachrichten auf Deutsch.

## Design

- Nur helles Thema (ausdrücklicher Wunsch). Farben nur über die Tokens in `engine/lernapp.css`.
- Jede App hat ein eigenes, helles Pastell-Farbschema (`farbe` in `inhalt.js`). Eine neue App wählt eines, das noch keine andere App hat. Die Karte auf der Startseite bekommt dasselbe `data-farbe`. Neue Schemas in `engine/lernapp.css` ergänzen: nur `--paper`, `--head`, `--line`, `--water`, `--water-soft`, `--mark`; die Akzentfarbe `--water` braucht mit weisser Schrift einen Kontrast von mind. 4.5:1.
- Ausgelegt auf PC (Seitenleiste ab 860 px); auf schmalen Bildschirmen muss es trotzdem ohne seitliches Scrollen funktionieren.
- Neue Werkzeuge im bestehenden Stil: `.panel`, `.btn`, `.chip`, `.opt`, `.fb`, Tokens `--water`, `--ok`, `--bad` usw.

## Persönliches und Urheberrecht

- **Keine Namen im Code.** Name und Widmung kommen aus dem Profil (`localStorage` «lernapps-profil»), gesetzt über «Fortschritt → Persönlich» oder den Link `?name=…&widmung=…`.
- **Keine fremden Materialien im Repository:** keine PDFs, Scans aus Lehrmitteln, Arbeitsblätter, Fotos aus Folien. Diese liegen in `unterlagen/` (in `.gitignore`). Texte selbst formulieren, Zeichnungen selbst als SVG erstellen.
- Vor jedem Commit prüfen: `git status` enthält nichts aus `unterlagen/`, keine Bilddateien unklarer Herkunft.

## Testen (Pflicht vor jedem Commit)

```
npm test                       # alle Apps
npm test -- <id>               # eine App
```

Der Test lädt jede App, öffnet alle Bereiche, spielt ein Tagestraining und eine Probeprüfung durch und meldet Skriptfehler. Er muss für **alle** Apps grün sein, besonders nach Änderungen am Grundgerüst. Zusätzlich die Screenshots in `tests/ausgabe/` ansehen.

In der Claude-Cloud-Umgebung ist Chromium unter `/opt/pw-browsers/chromium` vorinstalliert; Playwright ist global installiert. Falls `node_modules/playwright` fehlt: `mkdir -p node_modules && ln -s "$(npm root -g)/playwright" node_modules/playwright && ln -s "$(npm root -g)/playwright-core" node_modules/playwright-core`.

## Neue App fertigstellen

1. Karte auf der Startseite `index.html` ergänzen.
2. Zeile in der Tabelle in `README.md` ergänzen.
3. `npm test` grün, Screenshots angesehen.
4. Commit und Push auf `main`.
