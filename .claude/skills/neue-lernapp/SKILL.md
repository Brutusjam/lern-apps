---
name: neue-lernapp
description: Neue Lern-App für ein Prüfungsthema erstellen (z.B. Napoleon & Schweizer Geschichte). Verwenden, wenn der Auftraggeber Lernziele oder Unterlagen für ein neues Thema schickt oder «neue Lern-App», «neues Thema» sagt.
---

# Neue Lern-App erstellen

Lies zuerst `CLAUDE.md` im Hauptordner (Aufbau, Datenformat, Regeln). Sprich mit dem Auftraggeber auf Deutsch mit «Sie».

## 1. Unterlagen sammeln

Du brauchst:
- **Lernziele** (Lernzielblatt, Text oder Foto)
- **Unterlagen** aus dem Unterricht (Notizbuch als PDF, Arbeitsblätter, Folien)
- **Prüfungsdatum**
- optional: Bilder in guter Auflösung, für die ein Bild-Quiz sinnvoll ist

Fehlt etwas Wesentliches, frag einmal gezielt nach. Hochgeladene Unterlagen nach `unterlagen/<id>/` kopieren (nicht ins Repository, der Ordner ist in `.gitignore`).

PDFs mit dem Read-Werkzeug seitenweise lesen (max. 20 Seiten pro Aufruf). Sind Scans zu klein zum Lesen, mit `pdftoppm -r 220 -f N -l N -png` vergrössern und zuschneiden.

## 2. Plan vorschlagen und bestätigen lassen

Bevor du Inhalte schreibst, zeig dem Auftraggeber eine kurze Tabelle:

| Lernziel | Übungen |
|---|---|
| …erklären, warum … | 2 Erklär-Aufgaben, 3 Karteikarten, Auswahlfragen |
| …auf Bildern erkennen … | Bild-Quiz (gezeichnete Szene), Karteikarten |
| …in die richtige Reihenfolge bringen … | eigenes Werkzeug «Zeitstrahl» |

Dazu: welche **eigenen Werkzeuge** das Thema braucht (z.B. Zeitstrahl, Ursache-Folge-Ketten, Karte, Personen), und welche Stellen in den Unterlagen dünn sind. Erst nach Zustimmung weiter.

## 3. Ordner anlegen

```
cp -r themen/_vorlage themen/<id>
```

`<id>` in Kleinbuchstaben mit Bindestrichen, z.B. `geschichte-napoleon`. In `index.html` Titel und Beschreibung setzen, in `inhalt.js` die `id` = Ordnername. Dazu in `inhalt.js` ein Farbschema `farbe` wählen, das noch keine andere App hat (siehe CLAUDE.md, Design).

## 4. Inhalt schreiben (`inhalt.js`)

Reihenfolge:
1. `themen` mit allen Lernzielen wörtlich vom Lernzielblatt (Text ab «…», Rechtschreibung korrigieren).
2. `erklaeren`: mindestens eine Aufgabe pro Lernziel, 4 bis 5 Checklisten-Punkte mit Stichwort-Stämmen, Musterantwort in 3 bis 6 Sätzen.
3. `karten`: 3 bis 6 pro Lernziel.
4. `fragen` und `sortieren`: plausible falsche Antworten, die typische Verwechslungen abbilden.
5. Optional `bildquiz` mit selbst gezeichneten SVG-Szenen.

Alles aus den Unterlagen ableiten, in eigenen Worten. Jahreszahlen, Namen und Orte doppelt prüfen.

## 5. Eigene Werkzeuge (falls geplant)

In `werkzeuge.js` mit `LernApp.werkzeug({ init(api) { … } })`, HTML als `<section data-werkzeug="id" data-name="Name">` in `#vorlagen` von `index.html`, Stile in `werkzeuge.css`. Bestehende Muster ansehen: `themen/geografie-naturphaenomene/werkzeuge.js`. Ergebnisse mit `api.record(lzId, richtig)` melden. Werkzeug-ID im passenden Lernziel unter den Werkzeugen eintragen.

Was auch andere Themen brauchen könnten (z.B. ein Zeitstrahl), gehört ins Grundgerüst statt in `werkzeuge.js`. Dann alle Apps testen.

## 6. Prüfen

- `npm test -- <id>` und `npm test` (alle Apps) müssen grün sein.
- Screenshots in `tests/ausgabe/` ansehen: Heute, Bild-Quiz, Ergebnis.
- Jedes Lernziel hat Erklär-Aufgabe + Karte + Auswahl/Sortieren?
- Keine «ß», keine Namen, nichts aus `unterlagen/` in `git status`.

## 7. Abschliessen

1. Karte auf der Startseite `index.html` (mit demselben `data-farbe`) und Zeile in `README.md` ergänzen.
2. Commit (Deutsch) und Push auf `main`.
3. Dem Auftraggeber kurz berichten: was die App enthält, wo die Unterlagen dünn waren, was er fachlich prüfen sollte, und den Link (`themen/<id>/index.html`, bei GitHub Pages `https://<benutzer>.github.io/lern-apps/themen/<id>/`). Einen persönlichen Link mit `?name=…&widmung=…` anbieten.
