# Lern-Apps

Lern-Apps für Prüfungen am Gymnasium (Schweiz). Jede App deckt die Lernziele einer Prüfung ab und bietet:

- **Heute üben:** tägliches Training von etwa 15 Minuten. Die App wählt neue, unsichere und länger nicht geübte Lernziele.
- **Erklär-Aufgaben:** Antworten in eigenen Worten schreiben und mit einer Checkliste prüfen.
- **Probeprüfung:** zu allen Lernzielen, mit Zeitmessung, Selbstkorrektur, Ergebnis pro Thema und Fehlerheft.
- **Werkzeuge:** Karteikarten, Sortierspiele, Bild-Quiz und themeneigene Übungen.

| App | Fach | Ordner |
|---|---|---|
| Landschaft im Wandel | Geografie, 2. Gymnasium | [`themen/geografie-naturphaenomene`](themen/geografie-naturphaenomene) |

## Benutzen

Die Apps sind reine HTML-Seiten ohne Server. Lokal einfach `index.html` im Browser öffnen.
Name und Fortschritt bleiben im Browser (`localStorage`) und werden nirgends hin übertragen.

**Persönlicher Link:** Mit `?name=…&widmung=…` am Ende der Adresse werden Name und Widmung beim ersten Öffnen gespeichert, zum Beispiel:

```
…/themen/geografie-naturphaenomene/?name=Lily&widmung=To%20Lily%2C%20with%20love%20from%20Dad
```

Beides lässt sich in jeder App unter «Fortschritt → Persönlich» ändern.

## Aufbau

```
engine/        Grundgerüst für alle Apps (lernapp.js, lernapp.css)
themen/<app>/  index.html, inhalt.js (nur Daten), optional werkzeuge.js/.css
tests/         Rauchtest, der jede App komplett durchklickt
index.html     Startseite mit allen Apps
```

Details zum Datenformat und zum Vorgehen bei einer neuen App stehen in [`CLAUDE.md`](CLAUDE.md).
In Claude Code startet `/neue-lernapp` den Ablauf für ein neues Thema.

## Testen

```
npm install
npx playwright install chromium
npm test
```

## Veröffentlichen mit GitHub Pages

1. Repository auf **Public** stellen (Settings → General → Danger Zone → Change visibility).
2. Settings → Pages → Source: «Deploy from a branch», Branch `main`, Ordner `/ (root)`.
3. Nach ein bis zwei Minuten ist die Startseite unter `https://<benutzer>.github.io/lern-apps/` erreichbar.

## Urheberrecht

Ins Repository gehören nur selbst erstellte Inhalte: eigene Texte, eigene Zeichnungen, eigene Fotos.
Notizbücher, Scans aus Lehrmitteln, Arbeitsblätter und fremde Bilder bleiben lokal im Ordner `unterlagen/`, der von Git ausgeschlossen ist.

Die Inhalte sind ohne Gewähr und sollten immer mit den Unterlagen aus dem Unterricht abgeglichen werden.
