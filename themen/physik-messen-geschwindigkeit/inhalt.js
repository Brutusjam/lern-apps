/* Physik: Messen und Geschwindigkeit. Nur Daten, Aufbau siehe CLAUDE.md.
   Quelle: Arbeitshefte «Messungen und Messgeräte» und «Die Geschwindigkeit», Lernzielblatt, alte Prüfung.
   Das Thema HIV (Lernziel a) folgt, sobald die Arbeitsblätter da sind. */
window.LERNAPP_INHALT = {
  id: 'physik-messen-geschwindigkeit',
  eyebrow: 'Physik · Naturlehre · Prüfung',
  titel: 'Messen <span>und Geschwindigkeit</span>',
  untertitel: 'Messgeräte, Thermometer, Umrechnen, Weg-Zeit-Diagramme und Rechnen mit v = s : t nach dem Lösungsrezept.',
  pruefung: '2026-12-05',
  pruefungsAufgaben: 20,
  pruefungsRechnen: 2,
  farbe: 'tuerkis',
  hinweis: 'Ohne Gewähr. Nach den Arbeitsheften «Messungen und Messgeräte» und «Die Geschwindigkeit». Bitte immer mit den Unterlagen aus dem Unterricht abgleichen.',

  themen: [
    { id: 'm', name: 'Messen und Messgeräte', kurz: 'Messen', lz: [
      ['m1', '…zwischen Messwert, physikalischer Grösse, Zahlenwert, Einheit und Messgerät unterscheiden.', ['sortieren', 'karten']],
      ['m2', '…physikalische Grössen messen und die Messwerte korrekt mit Zahlenwert und Einheit angeben.', ['ablesen', 'karten']],
      ['m3', '…Messgeräte erkennen und sagen, welche physikalische Grösse sie messen.', ['bild:geraete', 'sortieren', 'karten']],
      ['m4', '…zwischen mechanischen (analogen) und digitalen Messgeräten unterscheiden.', ['sortieren', 'karten']],
      ['m5', '…Typen von Thermometern anhand von Beschreibungen oder Abbildungen erkennen und benennen.', ['bild:thermometer', 'sortieren', 'karten']],
      ['m6', '…verschiedene Uhrentypen erkennen und sagen, wie sie die Zeit messen.', ['bild:uhren', 'karten']] ] },
    { id: 'u', name: 'Einheiten umrechnen', kurz: 'Umrechnen', lz: [
      ['u1', '…Messwerte mit den Vorsilben von Nano bis Kilo mithilfe des Zahlenstrahls umrechnen.', ['umrechnen', 'karten']],
      ['u2', '…Zeitangaben in Stunden als Dezimalzahl umrechnen und Zeiträume berechnen.', ['umrechnen', 'karten']],
      ['u3', '…Geschwindigkeiten von m/s in km/h umrechnen und umgekehrt.', ['umrechnen', 'rechnen']] ] },
    { id: 'd', name: 'Bewegungen im Diagramm', kurz: 'Diagramme', lz: [
      ['d1', '…Weg-Zeit-Diagramme (s-t-Diagramme) lesen und interpretieren.', ['diagramme', 'sortieren']],
      ['d2', '…einen grafischen Fahrplan lesen.', ['diagramme', 'karten']],
      ['d3', '…eine beschriebene Bewegung als s-t-Diagramm zeichnen und als Geschwindigkeits-Zeit-Diagramm (v-t-Diagramm) darstellen.', ['diagramme', 'karten']],
      ['d4', '…den Schreibstreifen des Elektrowagens auswerten (50 Punkte = 1 s).', ['karten', 'rechnen']] ] },
    { id: 'r', name: 'Berechnungen zur Geschwindigkeit', kurz: 'Rechnen', lz: [
      ['r1', '…die Formel v = s : t und ihre Varianten s = v · t und t = s : v anwenden.', ['rechnen', 'karten']],
      ['r2', '…eine physikalische Aufgabe vollständig und korrekt nach dem Lösungsrezept lösen.', ['rechnen', 'karten']] ] }
  ],

  /* ---------- Auswahlfragen (richtige Antwort immer zuerst) ---------- */
  fragen: {
    begriffe: [
      { lz: 'm1', q: 'Bei «L = 6 m»: Was ist «6 m»?', o: ['der Messwert', 'die Einheit', 'die physikalische Grösse'], e: '«6 m» ist der Messwert. Er besteht aus dem Zahlenwert 6 und der Einheit m. L (Länge) ist die physikalische Grösse.' },
      { lz: 'm1', q: 'Bei «L = 6 m»: Was ist «L»?', o: ['die physikalische Grösse (Länge) als Kürzel', 'der Zahlenwert', 'das Messgerät'], e: 'L ist das Kürzel für die physikalische Grösse Länge. Physikalische Grössen schreibt man oft mit einem Buchstaben: L für Länge, t für Zeit, v für Geschwindigkeit.' },
      { lz: 'm1', q: 'Was bedeutet «6 m» genau?', o: ['6 · 1 m', '6 + 1 m', '6 Meter pro Sekunde'], e: '6 m ist eine vereinfachte Schreibweise für 6 · 1 m, also sechsmal die Einheit Meter.' },
      { lz: 'm1', q: 'Woraus besteht ein Messwert immer?', o: ['aus Zahlenwert und Einheit', 'nur aus einer Zahl', 'aus Messgerät und Einheit'], e: 'Merke: Eine physikalische Grösse wird immer durch einen Zahlenwert und eine Einheit beschrieben. Eine «nackte» Zahl wie 16 sagt nichts aus, erst 16 cm ist ein Messwert.' },
      { lz: 'm1', q: 'Länge, Umfang und Durchmesser sind verschiedene Grössen. Welche Einheit haben sie?', o: ['alle dieselbe: Meter', 'jede eine andere Einheit', 'gar keine Einheit'], e: 'Verschiedene physikalische Grössen können dieselbe Einheit haben. Länge, Umfang und Durchmesser misst man alle in Metern (oder cm, mm, km).' },
      { lz: 'm1', q: 'Ein Messwert lautet «25 min». Was ist die physikalische Grösse?', o: ['Zeit', 'Minute', 'Uhr'], e: 'Die Grösse ist die Zeit. «min» ist die Einheit, 25 der Zahlenwert und die Uhr (Stoppuhr) das Messgerät.' },
      { lz: 'm1', q: 'Ein Messwert lautet «4 l». Welches Messgerät passt dazu?', o: ['Messzylinder', 'Waage', 'Metermass'], e: '4 l (Liter) ist ein Volumen. Volumen misst man mit dem Messzylinder.' },
      { lz: 'm2', q: 'Du misst den Umfang deiner Stirn mit einer Schnur und dem Metermass. Welche Angabe ist ein korrekter Messwert?', o: ['56 cm', '56', 'Umfang'], e: 'Ein korrekter Messwert hat Zahlenwert und Einheit: 56 cm. «56» allein ist nur ein Zahlenwert, «Umfang» ist die physikalische Grösse.' },
      { lz: 'm2', q: 'Wie misst du die Dicke einer einzelnen Blattseite am genausten?', o: ['Dicke von 20 Seiten messen und durch 20 teilen', 'eine einzelne Seite mit dem Lineal messen', 'die Dicke schätzen'], e: 'Eine einzelne Seite ist zu dünn für das Messgerät. Misst du viele Seiten zusammen und teilst durch die Anzahl, wird das Ergebnis viel genauer. Gleich geht es beim Esslöffel: 5 Löffelfüllungen messen, durch 5 teilen.' },
      { lz: 'm2', q: 'Wie viele ml Wasser hat ein Esslöffel? Wie gehst du am besten vor?', o: ['5 Löffelfüllungen im Messzylinder messen und durch 5 teilen', 'eine Löffelfüllung auf der Waage wiegen', 'den Löffel mit dem Metermass ausmessen'], e: 'Eine einzelne Füllung ist klein, dabei wird der Ablesefehler gross. Mit 5 Füllungen und anschliessendem Teilen durch 5 wird der Messwert genauer.' },
      { lz: 'm2', q: 'Beim Messzylinder: Wo liest du ab?', o: ['auf Augenhöhe, am tiefsten Punkt der gewölbten Wasseroberfläche', 'von oben schräg auf den Rand', 'am höchsten Punkt am Glasrand'], e: 'Die Wasseroberfläche ist im Zylinder leicht nach unten gewölbt. Man liest auf Augenhöhe am tiefsten Punkt ab, sonst wird der Wert zu gross oder zu klein.' }
    ],
    geraete: [
      { lz: 'm3', q: 'Welches Messgerät misst die Luftfeuchtigkeit (in %)?', o: ['Hygrometer', 'Barometer', 'Thermometer'], e: 'Das Hygrometer zeigt die Luftfeuchtigkeit in Prozent an. Das Barometer misst den Luftdruck.' },
      { lz: 'm3', q: 'Welches Messgerät misst den Luftdruck (z.B. in mbar)?', o: ['Barometer', 'Hygrometer', 'Dezibelmeter'], e: 'Das Barometer misst den Luftdruck, also wie stark die Luft auf den Boden drückt. Einheit: mbar (Millibar) oder hPa (Hektopascal).' },
      { lz: 'm3', q: 'Was misst ein Dezibelmeter?', o: ['die Lautstärke', 'die Spannung', 'die Dichte'], e: 'Das Dezibelmeter misst die Lautstärke in Dezibel (dB).' },
      { lz: 'm3', q: 'Was misst ein Voltmeter?', o: ['die elektrische Spannung', 'die Kraft', 'den Luftdruck'], e: 'Mit dem Voltmeter misst man die elektrische Spannung, in Volt (V).' },
      { lz: 'm3', q: 'Was misst eine Senkwaage?', o: ['die Dichte einer Flüssigkeit', 'das «Gewicht»', 'die Kraft'], e: 'Die Senkwaage taucht verschieden tief in eine Flüssigkeit ein, je nach deren Dichte. So misst man z.B. die Dichte eines Getränks. Trotz des Namens ist sie keine Waage für das «Gewicht».' },
      { lz: 'm3', q: 'Was misst ein Kraftmesser?', o: ['die Kraft', 'die Länge', 'die Dichte'], e: 'Der Kraftmesser hat eine Feder, die sich je nach Kraft verschieden stark dehnt. Kraft misst man in Newton (N).' },
      { lz: 'm3', q: 'Womit misst man einen Winkel?', o: ['mit dem Winkelmesser (Geodreieck)', 'mit dem Metermass', 'mit dem Messzylinder'], e: 'Winkel misst man mit dem Winkelmesser, zum Beispiel mit dem Geodreieck. Die Einheit ist das Grad (°).' },
      { lz: 'm3', q: 'Was misst die Waage?', o: ['das «Gewicht» (genauer: die Masse) in g oder kg', 'die Kraft in Newton', 'die Dichte'], e: 'Die Waage zeigt, wie viele Gramm oder Kilogramm etwas hat. Im Alltag sagt man «Gewicht», genau genommen ist es die Masse.' },
      { lz: 'm3', q: 'Du misst, wie lange du den Atem anhalten kannst. Welches Messgerät brauchst du?', o: ['Stoppuhr', 'Thermometer', 'Hygrometer'], e: 'Die Zeit misst du mit der Stoppuhr. Achtung: Das Messgerät heisst Stoppuhr, nicht «Zeit». Zeit ist die physikalische Grösse.' },
      { lz: 'm3', q: 'Du misst, wie warm kaltes Hahnenwasser ist. Welches Messgerät?', o: ['Thermometer', 'Barometer', 'Messzylinder'], e: 'Die Temperatur misst man mit dem Thermometer, in Grad Celsius (°C). Temperatur ist die Grösse, Thermometer das Gerät.' },
      { lz: 'm3', q: 'Beim Guetzlibacken: Der Ofen soll 220 °C heiss sein. Welche physikalische Grösse ist das?', o: ['Temperatur', 'Zeit', 'Volumen'], e: '220 °C ist ein Messwert der Temperatur. Das Messgerät dazu ist das Thermometer.' },
      { lz: 'm3', q: 'Beim Guetzlibacken: 1.5 Liter Milch. Welches Messgerät?', o: ['Messzylinder (Messbecher)', 'Waage', 'Thermometer'], e: '1.5 Liter ist ein Volumen. Volumen misst man mit einem Messzylinder oder Messbecher.' }
    ],
    analog: [
      { lz: 'm4', q: 'Woran erkennst du ein digitales Messgerät?', o: ['an der Ziffernanzeige (Display)', 'am Zeiger auf einer Skala', 'an der Flüssigkeitssäule'], e: 'Digitale Geräte zeigen den Messwert direkt als Ziffern auf einem Display an und arbeiten elektronisch. Analoge (mechanische) Geräte haben einen Zeiger oder eine Säule auf einer Skala.' },
      { lz: 'm4', q: 'Ein Barometer zeigt «948 mbar» als Ziffern an. Was ist es?', o: ['ein digitales Barometer, es misst den Luftdruck', 'ein digitales Hygrometer, es misst die Luftfeuchtigkeit', 'ein analoges Barometer'], e: 'Die Einheit mbar verrät die Grösse: Luftdruck. Die Ziffernanzeige zeigt, dass es digital ist. Luftfeuchtigkeit hätte die Einheit %.' },
      { lz: 'm4', q: 'Eine Balkenwaage mit Gewichtsteinen ist …', o: ['analog (mechanisch)', 'digital', 'gar kein Messgerät'], e: 'Die Balkenwaage arbeitet rein mechanisch: Man legt Gewichtsteine auf, bis beide Seiten im Gleichgewicht sind. Kein Strom, kein Display.' },
      { lz: 'm4', q: 'Gibt es dieselbe physikalische Grösse als analoges und als digitales Messgerät?', o: ['Ja, z.B. Stoppuhr mit Zeiger und digitale Stoppuhr', 'Nein, jede Grösse hat nur eine Art Messgerät', 'Nur bei der Temperatur'], e: 'Fast jede Grösse lässt sich analog und digital messen: Zeit, Temperatur, Luftdruck, «Gewicht», Luftfeuchtigkeit … Es führen viele Wege ans Ziel.' }
    ],
    thermo: [
      { lz: 'm5', q: 'Eine rote Flüssigkeit dehnt sich in einem dünnen Röhrchen aus, wenn es wärmer wird. Welches Thermometer?', o: ['Alkoholthermometer', 'Quecksilberthermometer', 'Galileithermometer'], e: 'Im Alkoholthermometer steigt gefärbter, meist roter Alkohol im Röhrchen. Quecksilber ist silbrig glänzend.' },
      { lz: 'm5', q: 'Es misst, wie viel Wärmestrahlung ein Körper aussendet. Welches Thermometer?', o: ['Infrarotthermometer', 'Bimetallthermometer', 'Digitalthermometer mit Messstab'], e: 'Heisse Körper senden mehr unsichtbare Strahlung jenseits des roten Lichts aus (Infrarot). Das Infrarotthermometer misst sie ohne Berührung, z.B. im Ohr oder an der Stirn.' },
      { lz: 'm5', q: 'Zwei verklebte Metallstreifen biegen sich bei Erwärmung. Welches Thermometer?', o: ['Bimetallthermometer', 'Alkoholthermometer', 'Infrarotthermometer'], e: 'Die zwei Metalle (z.B. Messing und Eisen) dehnen sich verschieden stark aus. Darum biegt sich der Streifen, meist zu einer Spirale gewickelt, und dreht einen Zeiger.' },
      { lz: 'm5', q: 'Glaskugeln in einer Flüssigkeit sinken oder schwimmen je nach Temperatur. Welches Thermometer?', o: ['Galileithermometer', 'Quecksilberthermometer', 'Bimetallthermometer'], e: 'Beim Galileithermometer liest man die Temperatur an der Plombe der untersten der oben schwimmenden Kugeln ab.' },
      { lz: 'm5', q: 'Ein Messstab leitet umso besser, je heisser er ist. Daraus wird die Temperatur berechnet. Welches Thermometer?', o: ['Digitalthermometer', 'Infrarotthermometer', 'Galileithermometer'], e: 'Das Digitalthermometer misst elektronisch, wie gut der Messstab leitet, und zeigt die Temperatur als Ziffern an.' },
      { lz: 'm5', q: 'Beim Galileithermometer: Welche Kugel zeigt die Temperatur an?', o: ['die unterste der oben schwimmenden Kugeln', 'die oberste Kugel', 'die Kugel ganz unten am Boden'], e: 'Man liest die Plombe der untersten Kugel ab, die noch oben schwimmt. Die Kugeln am Boden sind schon gesunken.' },
      { lz: 'm5', q: 'Welches Thermometer eignet sich besonders für tiefe Temperaturen (Minusgrade)?', o: ['Alkoholthermometer', 'Galileithermometer', 'Bimetallthermometer im Backofen'], e: 'Der Alkohol bleibt auch bei starken Minusgraden flüssig und zieht sich gleichmässig zusammen. Darum eignet er sich gut für tiefe Temperaturen.' },
      { lz: 'm5', q: 'Welches Thermometer misst ohne Berührung?', o: ['Infrarotthermometer', 'Quecksilberthermometer', 'Digitalthermometer mit Messstab'], e: 'Das Infrarotthermometer fängt die Wärmestrahlung auf, die ein Körper aussendet. Es muss den Körper nicht berühren.' }
    ],
    uhren: [
      { lz: 'm6', q: 'Welche Uhren sind am präzisesten?', o: ['Atomuhren', 'Quarzuhren', 'Pendeluhren'], e: 'Atomuhren weichen in Milliarden Jahren nicht einmal eine ganze Sekunde ab. Sie sind z.B. in GPS-Satelliten eingebaut.' },
      { lz: 'm6', q: 'Womit hat man die Zeit früher lange Zeit bestimmt?', o: ['mit dem Sonnenstand (Sonnenuhr)', 'mit Atomuhren', 'mit Quarzuhren'], e: 'Lange wurde die Zeit am Sonnenstand abgelesen. Für die Bewässerung kamen auch Wasseruhren in Frage.' },
      { lz: 'm6', q: 'Was musste man bei einer mechanischen Taschenuhr immer wieder tun?', o: ['sie über eine Feder aufziehen', 'die Batterie wechseln', 'sie in die Sonne legen'], e: 'Die mechanische Taschenuhr machte die Zeitmessung handlich und erschwinglich. Ihre Feder musste man immer wieder aufziehen.' },
      { lz: 'm6', q: 'Was treibt eine moderne Quarzuhr an?', o: ['eine Batterie', 'eine Feder', 'fliessendes Wasser'], e: 'Quarzuhren mit Batteriebetrieb haben die moderne Zeitmessung eingeläutet. Man muss sie nicht aufziehen.' },
      { lz: 'm6', q: 'Was dient in einer Pendeluhr als Zeitgeber?', o: ['das gleichmässig schwingende Pendel', 'der Sonnenstand', 'auslaufender Sand'], e: 'Später wurden gleichmässige Bewegungen als Zeitgeber verbaut, zum Beispiel ein Pendel. Oft war das die grosse Kirchenuhr im Dorf.' }
    ],
    umrechnen: [
      { lz: 'u1', q: 'Wie viele µg sind 0.00034 g?', o: ['340 µg', '0.34 µg', '34 µg'], e: 'Von g nach µg sind es 6 Zehnersprünge zu einer kleineren Einheit: Das Komma wandert 6 Stellen nach rechts. 0.00034 g = 0.34 mg = 340 µg.' },
      { lz: 'u1', q: 'Wie viele cm sind 60\'000 µm?', o: ['6 cm', '60 cm', '600 cm'], e: 'Von µm (10⁻⁶) nach cm (10⁻²) sind es 4 Zehnersprünge zu einer grösseren Einheit: Das Komma wandert 4 Stellen nach links. 60\'000 µm = 60 mm = 6 cm.' },
      { lz: 'u1', q: 'Wie viele hl sind 50\'000 cl?', o: ['5 hl', '50 hl', '500 hl'], e: 'Von cl (10⁻²) nach hl (10²) sind es 4 Zehnersprünge nach rechts: Komma 4 Stellen nach links. 50\'000 cl = 500 l = 5 hl.' },
      { lz: 'u1', q: 'Wie viele kg sind 4500 mg?', o: ['0.0045 kg', '0.045 kg', '4.5 kg'], e: 'Von mg (10⁻³) nach kg (10³) sind es 6 Zehnersprünge: Komma 6 Stellen nach links. 4500 mg = 4.5 g = 0.0045 kg.' },
      { lz: 'u1', q: 'Wie viele m sind 0.004 km?', o: ['4 m', '40 m', '0.4 m'], e: 'Von km nach m sind es 3 Zehnersprünge zu einer kleineren Einheit: Komma 3 Stellen nach rechts. 0.004 km = 4 m (= 400 cm).' },
      { lz: 'u1', q: 'Wie viele Zehnersprünge liegen zwischen Milli (10⁻³) und Mikro (10⁻⁶)?', o: ['3, also ein Tausenderschritt', '1, also ein Zehnerschritt', '6'], e: 'Die Hochzahlen zeigen die Zehnersprünge: von 10⁻³ zu 10⁻⁶ sind es 3. Das ist ein Tausenderschritt: 1 mm = 1000 µm.' },
      { lz: 'u1', q: 'Du rechnest in eine grössere Einheit um (auf dem Zahlenstrahl nach rechts). Was passiert mit der Zahl?', o: ['Sie wird kleiner, das Komma wandert nach links.', 'Sie wird grösser, das Komma wandert nach rechts.', 'Sie bleibt gleich.'], e: 'Eine grössere Einheit braucht weniger davon: 1000 µm sind nur 0.1 cm. Das Komma wandert so viele Stellen nach links, wie es Zehnersprünge sind.' },
      { lz: 'u1', q: 'Wofür steht die Vorsilbe «Giga»?', o: ['10⁹, eine Milliarde', '10⁶, eine Million', '10³, tausend'], e: 'Kilo = 10³, Mega = 10⁶, Giga = 10⁹, Tera = 10¹². Bei Computerspeichern begegnen dir MB, GB und TB.' },
      { lz: 'u1', q: 'Wie viele GB sind 1 TB?', o: ['1000 GB', '100 GB', '1\'000\'000 GB'], e: 'Tera ist 10¹², Giga 10⁹. Dazwischen liegen 3 Zehnersprünge, also Faktor 1000.' },
      { lz: 'u2', q: 'Wie viele Stunden sind 15 Minuten?', o: ['0.25 h', '0.15 h', '1.5 h'], e: 'Minuten durch 60 teilen: 15 : 60 = 0.25 h. Die Zeit ist ein 60er-System, darum ist 15 min nicht 0.15 h.' },
      { lz: 'u2', q: 'Wie viele Minuten sind 0.75 h?', o: ['45 min', '75 min', '7.5 min'], e: 'Stunden mal 60: 0.75 · 60 = 45 min.' },
      { lz: 'u2', q: 'Wie viele Stunden sind 3 h 30 min?', o: ['3.5 h', '3.3 h', '3.03 h'], e: '30 min = 30 : 60 = 0.5 h. Dazu die 3 ganzen Stunden: 3.5 h.' },
      { lz: 'u2', q: 'Was sind 12.75 h in Stunden und Minuten?', o: ['12 h 45 min', '12 h 75 min', '12 h 7.5 min'], e: '0.75 h · 60 = 45 min. Also 12 h 45 min.' },
      { lz: 'u2', q: 'Wie lange dauert es von 8.25 Uhr bis 9.15 Uhr, in Stunden?', o: ['0.83 h', '0.9 h', '0.5 h'], e: 'Von 8.25 bis 9.15 Uhr sind es 50 Minuten. 50 : 60 = 0.83 h.' },
      { lz: 'u2', q: 'Warum darf man bei der Zeit nicht einfach das Komma verschieben?', o: ['Weil die Zeit ein 60er-System ist, kein 10er-System', 'Weil Stunden keine Einheit sind', 'Weil Minuten immer kleiner als 1 sind'], e: 'Eine Stunde hat 60 Minuten, eine Minute 60 Sekunden. Darum teilt man Minuten durch 60, um Stunden als Dezimalzahl zu erhalten.' },
      { lz: 'u3', q: 'Wie rechnet man m/s in km/h um?', o: ['mal 3.6', 'durch 3.6', 'mal 60'], e: '1 m/s = 3.6 km/h. Von m/s nach km/h rechnet man mal 3.6, zurück durch 3.6.' },
      { lz: 'u3', q: 'Wie viel sind 10 m/s in km/h?', o: ['36 km/h', '2.8 km/h', '600 km/h'], e: '10 m/s · 3.6 = 36 km/h.' },
      { lz: 'u3', q: 'Wie viel sind 72 km/h in m/s?', o: ['20 m/s', '259.2 m/s', '7.2 m/s'], e: 'Von km/h nach m/s teilt man durch 3.6: 72 : 3.6 = 20 m/s.' },
      { lz: 'u3', q: 'Schall ist 300 m/s schnell. Wie schnell ist das in km/h?', o: ['1080 km/h', '83.3 km/h', '300 km/h'], e: '300 m/s · 3.6 = 1080 km/h. So schnell muss ein Flugzeug sein, um die Schallmauer zu durchbrechen.' }
    ],
    diagramme: [
      { lz: 'd1', q: 'Was ist im s-t-Diagramm auf der x-Achse aufgetragen?', o: ['die Zeit t', 'der Weg s', 'die Geschwindigkeit v'], e: 'Im s-t-Diagramm steht die Zeit t (z.B. in s) auf der x-Achse, der Weg s (z.B. in m) auf der y-Achse.' },
      { lz: 'd1', q: 'Im s-t-Diagramm: Je steiler die Gerade, desto …', o: ['schneller die Bewegung', 'langsamer die Bewegung', 'länger dauert die Bewegung'], e: 'Eine steile Gerade bedeutet: In kurzer Zeit wird ein langer Weg zurückgelegt. Das ist eine schnelle Bewegung.' },
      { lz: 'd1', q: 'Im s-t-Diagramm verläuft eine Linie waagrecht. Was bedeutet das?', o: ['Der Körper steht still.', 'Er fährt gleichmässig schnell.', 'Er fährt rückwärts.'], e: 'Waagrecht heisst: Die Zeit läuft weiter, aber der Weg ändert sich nicht. Der Körper bleibt stehen. Im v-t-Diagramm ist das v = 0.' },
      { lz: 'd1', q: 'Im s-t-Diagramm fällt eine Linie nach rechts unten. Was bedeutet das?', o: ['Der Körper bewegt sich rückwärts.', 'Er wird langsamer.', 'Er steht still.'], e: 'Die Position wird mit der Zeit kleiner: Der Körper bewegt sich zurück, rückwärts. Seine Geschwindigkeit bekommt ein Minus.' },
      { lz: 'd1', q: 'Woran erkennst du im s-t-Diagramm eine gleichmässige Bewegung?', o: ['an einer Geraden', 'an einer Kurve', 'an einer waagrechten Linie'], e: 'Bei einer gleichmässigen Bewegung werden in gleichen Zeiten gleiche Strecken zurückgelegt. Das ergibt eine Gerade. Eine Kurve zeigt eine Bewegung, die nicht regelmässig abläuft.' },
      { lz: 'd1', q: 'Eine Gerade im s-t-Diagramm startet bei (0 s | −20 m). Was heisst das?', o: ['Die Bewegung startet 20 m hinter dem Startpunkt 0 m.', 'Die Bewegung startet erst nach 20 s.', 'Die Bewegung geht rückwärts.'], e: 'Der Wert auf der y-Achse ist der Ort. −20 m heisst: 20 m hinter dem Startpunkt 0 m. Ob die Bewegung vor- oder rückwärts geht, zeigt erst die Steigung.' },
      { lz: 'd1', q: 'Zwei Linien im s-t-Diagramm schneiden sich. Was bedeutet der Schnittpunkt?', o: ['Beide sind zur gleichen Zeit am gleichen Ort (gleichauf).', 'Beide sind gleich schnell.', 'Beide stehen still.'], e: 'Der Schnittpunkt hat für beide dieselbe Zeit und denselben Ort: Dort sind sie gleichauf, einer überholt den anderen oder sie treffen sich.' },
      { lz: 'd1', q: 'Du gehst 20 m in 17 s und rennst 20 m in 4 s. Wie viel Mal schneller bist du beim Rennen?', o: ['etwa 4.3 Mal', 'etwa 13 Mal', 'etwa 0.24 Mal'], e: 'Man vergleicht die Zeiten für dieselbe Strecke: 17 s : 4 s = 4.25. Beim Rennen bist du also gut viermal schneller.' },
      { lz: 'd2', q: 'Im grafischen Fahrplan: Was steht auf der x-Achse, was auf der y-Achse?', o: ['x: Zeit (Uhrzeit), y: Strecke (Stationen)', 'x: Stationen, y: Zeit', 'x: Geschwindigkeit, y: Zeit'], e: 'Der grafische Fahrplan ist ein s-t-Diagramm: Die Uhrzeit läuft nach rechts, die Stationen stehen auf der Strecke (y-Achse).' },
      { lz: 'd2', q: 'Im grafischen Fahrplan ist eine Zuglinie bei einer Station kurz waagrecht. Was bedeutet das?', o: ['Der Zug hält an der Station.', 'Der Zug fährt besonders schnell.', 'Der Zug fährt zurück.'], e: 'Waagrecht heisst: Zeit vergeht, aber der Ort bleibt gleich. Der Zug steht in der Station. Die Länge des waagrechten Stücks ist die Haltezeit.' },
      { lz: 'd2', q: 'Woran erkennst du im grafischen Fahrplan einen schnellen Zug?', o: ['an einer steileren Linie mit wenigen Halten', 'an einer flachen Linie', 'an vielen waagrechten Stücken'], e: 'Je steiler die Linie, desto schneller. Ein Schnellzug hält ausserdem nicht überall, er hat also weniger waagrechte Stücke und braucht für die ganze Strecke weniger lang.' },
      { lz: 'd2', q: 'Im grafischen Fahrplan kreuzen sich zwei Linien, eine steigend, eine fallend. Was passiert dort?', o: ['Zwei Züge in Gegenrichtung kreuzen sich.', 'Ein Zug überholt einen anderen.', 'Ein Zug wendet.'], e: 'Eine Linie fährt in die eine Richtung (steigt), die andere in die Gegenrichtung (fällt). Im Schnittpunkt sind beide zur gleichen Zeit am gleichen Ort: Sie kreuzen sich.' },
      { lz: 'd3', q: 'Im v-t-Diagramm: Ein Wagen fährt rückwärts mit 2 m/s. Wo zeichnest du die Linie?', o: ['waagrecht bei −2 m/s', 'waagrecht bei +2 m/s', 'schräg nach unten'], e: 'Rückwärtsfahren bekommt ein Minus. Im v-t-Diagramm zeichnest du eine waagrechte Linie bei −2 m/s, unterhalb der Zeitachse.' },
      { lz: 'd3', q: 'Wie sieht ein v-t-Diagramm aus, wenn das Tempo jeweils abrupt wechselt?', o: ['eckig, wie eine «Skyline» aus waagrechten Stücken', 'wie eine glatte Kurve', 'wie das s-t-Diagramm'], e: 'Jede Teilbewegung hat eine konstante Geschwindigkeit, also ein waagrechtes Stück. Beim Wechsel springt man direkt zum nächsten Wert. So entsteht eine eckige «Skyline».' },
      { lz: 'd3', q: 'Ein Wagen bleibt 2 s stehen. Was zeichnest du im v-t-Diagramm?', o: ['eine Linie auf der Zeitachse bei 0 m/s, 2 s lang', 'nichts, eine Lücke', 'eine senkrechte Linie'], e: 'Stehenbleiben heisst v = 0 m/s. Die Linie liegt für diese 2 s auf der Zeitachse. Man darf sie ohne Rechnung einzeichnen.' },
      { lz: 'd3', q: 'Ein Wagen fährt in 3 s 5 m vorwärts. Wie gross ist v für diese Teilbewegung?', o: ['1.67 m/s', '0.6 m/s', '15 m/s'], e: 'v = s : t = 5 m : 3 s = 1.67 m/s. Vorwärts, also positiv.' },
      { lz: 'd3', q: 'Ein Wagen fährt in 1.5 s 3 m rückwärts. Wie gross ist v?', o: ['−2 m/s', '2 m/s', '−0.5 m/s'], e: 'v = s : t = −3 m : 1.5 s = −2 m/s. Das Minus zeigt, dass er rückwärts fährt. Fehlt das Minus, ist das v-t-Diagramm falsch.' },
      { lz: 'd3', q: 'Was zeichnet der Fahrtenschreiber in einem Lastwagen auf?', o: ['die Geschwindigkeit über die ganze Fahrt', 'nur die Höchstgeschwindigkeit', 'den Benzinverbrauch'], e: 'Der Fahrtenschreiber stellt die Geschwindigkeit ständig dar, wie ein v-t-Diagramm. So kann man nachprüfen, ob der Chauffeur seine Ruhezeiten eingehalten hat.' },
      { lz: 'd4', q: 'Der Schreiber am Elektrowagen setzt 50 Punkte pro Sekunde. Wie lange ist der Wagen gefahren, wenn du 100 Punkte zählst?', o: ['2 s', '1 s', '100 s'], e: '50 Punkte = 1 s, also 100 Punkte = 2 s.' },
      { lz: 'd4', q: 'Von Punkt 0 bis Punkt 50 misst du auf dem Schreibstreifen 14 cm. Wie schnell war der Wagen?', o: ['14 cm/s', '0.28 cm/s', '700 cm/s'], e: '50 Punkte sind 1 s. Der Wagen fuhr also 14 cm in 1 s: v = 14 cm : 1 s = 14 cm/s.' },
      { lz: 'd4', q: 'Wagen A fährt 14 cm/s, Wagen B 18 cm/s. Wie viel Mal schneller ist B?', o: ['etwa 1.3 Mal', 'etwa 4 Mal', 'etwa 0.8 Mal'], e: 'Man dividiert: 18 : 14 = 1.29, also etwa 1.3 Mal schneller.' }
    ],
    formel: [
      { lz: 'r1', q: 'Wie lautet die Formel für die Geschwindigkeit?', o: ['v = s : t', 'v = s · t', 'v = t : s'], e: 'Geschwindigkeit = Strecke : Zeit. Die Geschwindigkeit gibt an, wie viele Meter man pro Sekunde (oder km pro h) zurücklegt.' },
      { lz: 'r1', q: 'Gesucht ist die Strecke s. Welche Formel?', o: ['s = v · t', 's = v : t', 's = t : v'], e: 'Strecke = Geschwindigkeit · Zeit. Kontrolle mit den Einheiten: m/s · s = m.' },
      { lz: 'r1', q: 'Gesucht ist die Zeit t. Welche Formel?', o: ['t = s : v', 't = v : s', 't = s · v'], e: 'Zeit = Strecke : Geschwindigkeit. Kontrolle: km : km/h = km · h / km = h.' },
      { lz: 'r1', q: 'Je kürzer die Zeit für eine bestimmte Strecke, desto …', o: ['höher die Geschwindigkeit', 'tiefer die Geschwindigkeit', 'länger die Strecke'], e: 'Bei v = s : t wird v grösser, wenn t kleiner wird. Wer 100 m in 9.58 s läuft, ist schneller als jemand, der 12 s braucht.' },
      { lz: 'r1', q: 'Je weiter die Strecke in einer bestimmten Zeit, desto …', o: ['höher die Geschwindigkeit', 'tiefer die Geschwindigkeit', 'kürzer die Zeit'], e: 'Bei v = s : t wird v grösser, wenn s grösser wird. Wer beim 12-Minuten-Lauf mehr Runden schafft, ist schneller.' },
      { lz: 'r1', q: 'Welche Einheiten passen zusammen, wenn v in km/h gegeben ist?', o: ['Strecke in km, Zeit in h', 'Strecke in m, Zeit in min', 'Strecke in km, Zeit in s'], e: 'Setze stets m mit s oder km mit h ein. Bei km/h braucht es die Strecke in km und die Zeit in h. Minuten zuerst in Stunden umrechnen.' },
      { lz: 'r1', q: 'Welche Einheit ergibt m/s · s?', o: ['m', 's', 'm/s²'], e: 'Die s kürzen sich weg: m/s · s = m. Mit den Einheiten kann man prüfen, ob die Formel stimmt.' },
      { lz: 'r2', q: 'Was ist der erste Schritt im Lösungsrezept?', o: ['die gegebenen Grössen notieren (geg.)', 'die Formel aufschreiben', 'das Resultat schätzen'], e: 'Schritt 1: Dem Aufgabentext die gegebenen Grössen entnehmen und notieren (geg.). Schritt 2: das Gesuchte notieren (ges.).' },
      { lz: 'r2', q: 'Was gehört zum letzten Schritt im Lösungsrezept?', o: ['prüfen, ob das Resultat realistisch ist, und sinnvoll runden', 'die gegebenen Grössen notieren', 'die Formel auflösen'], e: 'Schritt 7: Überprüfen, ob das Resultat sinnvoll ist, und eine sinnvolle Genauigkeit angeben, meist eine Kommastelle.' },
      { lz: 'r2', q: 'Was bedeutet «Keine Doppelbrüche» beim Einsetzen?', o: ['t = 400 km · h / 80 km statt 400 km geteilt durch (80 km/h)', 'Man darf nie durch eine Einheit teilen.', 'Man rechnet nur ohne Einheiten.'], e: 'Teilt man durch km/h, schreibt man das h nach oben: 400 km : 80 km/h = 400 km · h / 80 km. Dann kürzt man km und erhält h.' },
      { lz: 'r2', q: 'Warum schreibt man beim Rechnen die Einheiten konsequent mit?', o: ['Zur Kontrolle: Am Schluss muss die richtige Einheit herauskommen.', 'Weil es schöner aussieht', 'Weil sonst der Taschenrechner nicht rechnet'], e: 'Die Einheiten werden mitgerechnet und gekürzt. Kommt bei der Zeit nicht h oder s heraus, hast du die falsche Formel gewählt oder falsch eingesetzt.' },
      { lz: 'r2', q: 'In einer Aufgabe ist v in km/h, die Zeit aber in Minuten gegeben. Was tust du zuerst?', o: ['die Minuten in Stunden umrechnen', 'die km/h in m/s umrechnen', 'nichts, man kann direkt einsetzen'], e: 'Beim Einsetzen müssen die Einheiten zusammenpassen. Zu km/h passt die Zeit in h: also z.B. 45 min = 0.75 h.' }
    ]
  },

  /* ---------- Karteikarten ---------- */
  karten: [
    { id: 'k1', lz: 'm1', g: 'messen', q: 'Messwert, Zahlenwert, Einheit: Erkläre am Beispiel «L = 6 m».', a: 'L ist die physikalische Grösse (Länge). 6 m ist der Messwert. Er besteht aus dem Zahlenwert 6 und der Einheit m (Meter).' },
    { id: 'k2', lz: 'm1', g: 'messen', q: 'Was braucht man, um einen Messwert zu erhalten?', a: 'Ein Messgerät, zum Beispiel ein Metermass für die Länge oder eine Stoppuhr für die Zeit.' },
    { id: 'k3', lz: 'm1', g: 'messen', q: 'Nenne fünf physikalische Grössen aus dem Alltag.', a: 'Zum Beispiel Länge, Höhe, Umfang, Volumen, «Gewicht», Temperatur, Zeit, Dichte.' },
    { id: 'k4', lz: 'm1', g: 'messen', q: 'Was ist bei «16 cm», «Dicke», «mg», «Stoppuhr» jeweils gemeint?', a: '16 cm ist ein Messwert, Dicke eine physikalische Grösse, mg eine Einheit, Stoppuhr ein Messgerät.' },
    { id: 'k5', lz: 'm2', g: 'messen', q: 'Wie gibst du einen Messwert korrekt an?', a: 'Immer mit Zahlenwert und Einheit, z.B. 4.8 ml oder 58 cm. Eine Zahl ohne Einheit ist kein Messwert.' },
    { id: 'k6', lz: 'm2', g: 'messen', q: 'Wie misst du etwas sehr Kleines genauer, z.B. die Dicke eines Blatts?', a: 'Viele davon zusammen messen und durch die Anzahl teilen: 20 Seiten messen, dann durch 20 teilen.' },
    { id: 'k7', lz: 'm2', g: 'messen', q: 'Wie liest du eine Skala richtig ab?', a: 'Zuerst klären, wie viel ein kleiner Strich wert ist. Dann auf Augenhöhe ablesen und den Messwert mit Einheit notieren.' },
    { id: 'k8', lz: 'm3', g: 'geraete', q: 'Hygrometer: Was misst es, in welcher Einheit?', a: 'Die Luftfeuchtigkeit, in Prozent (%).' },
    { id: 'k9', lz: 'm3', g: 'geraete', q: 'Barometer: Was misst es, in welcher Einheit?', a: 'Den Luftdruck, also wie stark die Luft gegen den Boden drückt, in mbar (Millibar) oder hPa.' },
    { id: 'k10', lz: 'm3', g: 'geraete', q: 'Senkwaage: Was misst sie?', a: 'Die Dichte einer Flüssigkeit, z.B. eines Drinks. Sie taucht je nach Dichte verschieden tief ein.' },
    { id: 'k11', lz: 'm3', g: 'geraete', q: 'Dezibelmeter und Voltmeter: Was messen sie?', a: 'Das Dezibelmeter misst die Lautstärke (dB), das Voltmeter die elektrische Spannung (V).' },
    { id: 'k12', lz: 'm3', g: 'geraete', q: 'Kraftmesser und Winkelmesser: Was messen sie?', a: 'Der Kraftmesser misst die Kraft (mit einer Feder), der Winkelmesser (Geodreieck) den Winkel in Grad.' },
    { id: 'k13', lz: 'm3', g: 'geraete', q: 'Messzylinder und Metermass: Was messen sie?', a: 'Der Messzylinder misst das Volumen (ml, l), das Metermass die Länge (cm, m).' },
    { id: 'k14', lz: 'm4', g: 'geraete', q: 'Was ist der Unterschied zwischen analogen und digitalen Messgeräten?', a: 'Analoge (mechanische) Geräte zeigen den Wert mit Zeiger oder Flüssigkeitssäule auf einer Skala. Digitale Geräte messen elektronisch und zeigen den Wert als Ziffern auf einem Display.' },
    { id: 'k15', lz: 'm4', g: 'geraete', q: 'Nenne zu Zeit und Temperatur je ein analoges und ein digitales Messgerät.', a: 'Zeit: Stoppuhr mit Zeiger (analog), Stoppuhr mit Ziffern (digital). Temperatur: Flüssigkeitsthermometer (analog), Digitalthermometer mit Messstab (digital).' },
    { id: 'k16', lz: 'm5', g: 'thermo', q: 'Nenne die sechs Thermometer-Typen aus dem Unterricht.', a: 'Quecksilber-, Alkohol-, Bimetall-, Digital-, Infrarot- und Galileithermometer.' },
    { id: 'k17', lz: 'm5', g: 'thermo', q: 'Wie funktioniert ein Bimetallthermometer?', a: 'Zwei verklebte Metallstreifen dehnen sich bei Wärme verschieden stark aus. Der Streifen biegt sich und dreht über eine Spirale einen Zeiger.' },
    { id: 'k18', lz: 'm5', g: 'thermo', q: 'Wie funktioniert ein Galileithermometer?', a: 'Glaskugeln mit verschieden viel Flüssigkeit sinken oder schwimmen je nach Temperatur. Man liest die Plombe der untersten oben schwimmenden Kugel ab.' },
    { id: 'k19', lz: 'm5', g: 'thermo', q: 'Wie funktioniert ein Infrarotthermometer?', a: 'Heisse Körper senden mehr unsichtbare Strahlung jenseits des roten Lichts aus. Das Gerät misst diese Wärmestrahlung, ohne den Körper zu berühren.' },
    { id: 'k20', lz: 'm5', g: 'thermo', q: 'Alkohol- und Quecksilberthermometer: Was ist gleich, was verschieden?', a: 'Bei beiden dehnt sich eine Flüssigkeit in einer dünnen Glaskapillare aus. Alkohol ist meist rot gefärbt und eignet sich für Minusgrade, Quecksilber ist ein silbriges flüssiges Metall.' },
    { id: 'k21', lz: 'm5', g: 'thermo', q: 'Wie funktioniert ein Digitalthermometer?', a: 'Es misst elektronisch, wie gut der Messstab leitet. Je heisser er ist, desto besser leitet er. Die Temperatur erscheint als Ziffern.' },
    { id: 'k22', lz: 'm6', g: 'uhren', q: 'Nenne sieben Uhrentypen.', a: 'Sonnenuhr, Wasseruhr, Sanduhr, Pendeluhr, Taschenuhr, Quarzuhr, Atomuhr.' },
    { id: 'k23', lz: 'm6', g: 'uhren', q: 'Wie wurde die Zeit früher gemessen, wie heute?', a: 'Früher mit dem Sonnenstand, Wasseruhren und gleichmässigen Bewegungen wie dem Pendel (Kirchenuhr). Dann mit mechanischen Taschenuhren (Feder aufziehen). Heute mit Quarzuhren (Batterie) und Atomuhren.' },
    { id: 'k24', lz: 'm6', g: 'uhren', q: 'Was ist das Besondere an Atomuhren?', a: 'Sie sind die präzisesten Uhren und weichen in Milliarden Jahren nicht einmal eine Sekunde ab. Sie sind z.B. in GPS-Satelliten eingebaut.' },
    { id: 'k25', lz: 'u1', g: 'umrechnen', q: 'Nenne die Vorsilben von Nano bis Kilo mit Hochzahl.', a: 'Nano 10⁻⁹, Mikro 10⁻⁶, Milli 10⁻³, Centi 10⁻², Dezi 10⁻¹, (Grundeinheit 10⁰ = 1), Hekto 10², Kilo 10³.' },
    { id: 'k26', lz: 'u1', g: 'umrechnen', q: 'Nenne die Vorsilben über Kilo.', a: 'Mega 10⁶, Giga 10⁹, Tera 10¹², Peta 10¹⁵, Exa 10¹⁸. Z.B. MB, GB, TB bei Computerspeichern.' },
    { id: 'k27', lz: 'u1', g: 'umrechnen', q: 'Umrechnen in eine grössere Einheit (nach rechts auf dem Zahlenstrahl): Wohin wandert das Komma?', a: 'Nach links, so viele Stellen wie Zehnersprünge. Die Zahl wird kleiner. Beispiel: 1000 µm = 0.1 cm (4 Sprünge).' },
    { id: 'k28', lz: 'u1', g: 'umrechnen', q: 'Umrechnen in eine kleinere Einheit (nach links): Wohin wandert das Komma?', a: 'Nach rechts, so viele Stellen wie Zehnersprünge. Die Zahl wird grösser, man notiert Hilfsnullen. Beispiel: 0.004 km = 400 cm (5 Sprünge).' },
    { id: 'k29', lz: 'u1', g: 'umrechnen', q: 'Was zeigen die Hochzahlen auf dem Zahlenstrahl an?', a: 'Wie viele Zehnersprünge ein Schritt ausmacht. Von 10⁻³ zu 10⁻⁶ sind es 3 Zehnersprünge, also ein Tausenderschritt.' },
    { id: 'k30', lz: 'u2', g: 'umrechnen', q: 'Wie rechnest du Minuten in Stunden (Dezimalzahl) um, und zurück?', a: 'Minuten durch 60: 30 min = 0.5 h, 6 min = 0.1 h. Zurück mal 60: 0.2 h = 12 min.' },
    { id: 'k31', lz: 'u2', g: 'umrechnen', q: 'Wie berechnest du die Dauer von 8.25 Uhr bis 10.45 Uhr in Stunden?', a: 'Zuerst die Dauer in h und min: 2 h 20 min. Dann die Minuten durch 60: 20 : 60 = 0.33. Ergibt 2.33 h.' },
    { id: 'k32', lz: 'u3', g: 'umrechnen', q: 'Wie rechnest du zwischen m/s und km/h um?', a: 'm/s mal 3.6 ergibt km/h. km/h durch 3.6 ergibt m/s. Beispiel: 20 m/s = 72 km/h.' },
    { id: 'k33', lz: 'd1', g: 'diagramme', q: 'Was zeigt die Steigung einer Geraden im s-t-Diagramm?', a: 'Die Geschwindigkeit: Je steiler, desto schneller. Waagrecht = Stillstand. Fallend = rückwärts.' },
    { id: 'k34', lz: 'd1', g: 'diagramme', q: 'Was gilt für eine gleichmässige Bewegung?', a: 'In gleichen Zeiten werden gleiche Strecken zurückgelegt. Im s-t-Diagramm ergibt das eine Gerade.' },
    { id: 'k35', lz: 'd1', g: 'diagramme', q: 'Woran erkennst du im s-t-Diagramm, wo und wann eine Bewegung startet?', a: 'Am Anfangspunkt der Linie: Der x-Wert ist die Startzeit, der y-Wert der Startort. Nicht jede Bewegung startet bei 0 s oder bei 0 m.' },
    { id: 'k36', lz: 'd2', g: 'diagramme', q: 'Grafischer Fahrplan: Wie liest du ab, wie lange ein Zug an einer Station hält?', a: 'Am waagrechten Stück der Zuglinie bei der Station: Seine Länge auf der Zeitachse ist die Haltezeit.' },
    { id: 'k37', lz: 'd2', g: 'diagramme', q: 'Grafischer Fahrplan: Wie bestimmst du die Geschwindigkeit eines Zuges?', a: 'Die Strecke an der y-Achse ablesen (z.B. 42.9 km), die Fahrzeit an der x-Achse (z.B. 43 min = 0.72 h). Dann v = s : t, etwa 60 km/h.' },
    { id: 'k38', lz: 'd3', g: 'diagramme', q: 'Wie wandelst du ein s-t-Diagramm in ein v-t-Diagramm um?', a: 'Für jede Teilbewegung v = s : t berechnen (rückwärts mit Minus, stehen = 0). Dann jeden Wert als waagrechtes Stück über derselben Zeitspanne einzeichnen. Es entsteht eine eckige «Skyline».' },
    { id: 'k39', lz: 'd3', g: 'diagramme', q: 'Worauf musst du beim Zeichnen von s-t-Diagrammen achten?', a: 'An der richtigen Position beginnen, die Endposition jeder Teilbewegung mit einer Geraden verbinden. Prüfen, ob die Zeit auf der x-Achse auf der Linie oder in der Mitte der Felder beschriftet ist.' },
    { id: 'k40', lz: 'd3', g: 'diagramme', q: 'Was zeichnet ein Fahrtenschreiber auf und wozu?', a: 'Er zeichnet bei Lastwagen ständig die Geschwindigkeit auf. So ist nachprüfbar, ob die Chauffeure ihre Ruhezeiten einhalten.' },
    { id: 'k41', lz: 'd4', g: 'diagramme', q: 'Wie wertest du den Schreibstreifen des Elektrowagens aus?', a: 'Beim ersten Punkt 0 notieren, 50 Punkte weiterzählen (= 1 s), dann 100 (= 2 s). Die Strecken mit dem Metermass messen. v = Strecke : Zeit.' },
    { id: 'k42', lz: 'd4', g: 'diagramme', q: 'Wie viele Punkte setzt der Schreiber pro Sekunde?', a: '50 Punkte pro Sekunde. 50 Punkte = 1 s, 100 Punkte = 2 s.' },
    { id: 'k43', lz: 'r1', g: 'rechnen', q: 'Nenne die Formel für v in allen drei Varianten.', a: 'v = s : t, s = v · t, t = s : v.' },
    { id: 'k44', lz: 'r1', g: 'rechnen', q: 'Welche Einheiten setzt du für s und t ein?', a: 'Immer m mit s (ergibt m/s) oder km mit h (ergibt km/h).' },
    { id: 'k45', lz: 'r1', g: 'rechnen', q: 'Was gibt die Geschwindigkeit an?', a: 'Wie viele Meter man pro Sekunde zurücklegt oder wie viele Kilometer pro Stunde.' },
    { id: 'k46', lz: 'r2', g: 'rechnen', q: 'Nenne die 7 Schritte des Lösungsrezepts.', a: '1 geg. notieren, 2 ges. notieren, 3 eventuell Lösungsidee oder Skizze, 4 Formel notieren und nach der gesuchten Grösse auflösen, 5 einsetzen mit passenden Einheiten, 6 Zahlen verrechnen und Einheiten kürzen, 7 prüfen, ob es realistisch ist, und sinnvoll runden.' },
    { id: 'k47', lz: 'r2', g: 'rechnen', q: 'Wie geht man bei Aufgaben mit mehreren Etappen vor?', a: 'Eine Tabelle mit allen Teilstrecken machen: s, v, t für jede Etappe, bekannt oder unbekannt (?). Dann Etappe für Etappe ausrechnen und am Schluss zusammenzählen.' },
    { id: 'k48', lz: 'r2', g: 'rechnen', q: 'Wie genau gibst du ein Resultat an?', a: 'Mit einer sinnvollen Genauigkeit, meist einer Kommastelle, z.B. 5.0 h. Und prüfen, ob der Wert realistisch ist.' }
  ],
  kartenGruppen: { messen: 'Messen', geraete: 'Messgeräte', thermo: 'Thermometer', uhren: 'Uhren', umrechnen: 'Umrechnen', diagramme: 'Diagramme', rechnen: 'Rechnen' },

  /* ---------- Sortieren ---------- */
  sortieren: {
    begriffe: { label: 'Begriffe', title: 'Was ist gemeint?', lz: 'm1', bins: ['Messwert', 'Physikalische Grösse', 'Einheit', 'Messgerät', 'Zahlenwert'], items: [
      ['16 cm', 0], ['25 min', 0], ['4 l', 0], ['970 mbar', 0], ['21 °C', 0],
      ['Dicke', 1], ['Volumen', 1], ['Luftdruck', 1], ['Temperatur', 1], ['Länge', 1], ['L', 1],
      ['mg', 2], ['cm', 2], ['mbar', 2], ['°C', 2], ['l (Liter)', 2],
      ['Stoppuhr', 3], ['Metermass', 3], ['Messzylinder', 3], ['Hygrometer', 3],
      ['die 16 in «16 cm»', 4], ['die 25 in «25 min»', 4] ] },
    groesse: { label: 'Gerät und Grösse', title: 'Welche Grösse misst das Gerät?', lz: 'm3', bins: ['Zeit', 'Temperatur', 'Luftdruck', 'Luftfeuchtigkeit', 'Volumen', '«Gewicht»'], items: [
      ['Stoppuhr', 0], ['Sanduhr', 0], ['Pendeluhr', 0],
      ['Thermometer', 1], ['Bimetallthermometer', 1], ['Infrarotthermometer', 1],
      ['Barometer', 2], ['Digital-Barometer mit Anzeige in mbar', 2],
      ['Hygrometer', 3], ['Anzeige in %', 3],
      ['Messzylinder', 4], ['Messbecher', 4],
      ['Waage', 5], ['Balkenwaage', 5], ['Küchenwaage', 5] ] },
    groesse2: { label: 'Gerät und Grösse 2', title: 'Welche Grösse misst das Gerät?', lz: 'm3', bins: ['Länge', 'Lautstärke', 'Spannung', 'Dichte', 'Kraft', 'Winkel'], items: [
      ['Metermass', 0], ['Massband', 0], ['Messzange', 0],
      ['Dezibelmeter', 1], ['Anzeige in dB', 1],
      ['Voltmeter', 2], ['Anzeige in V', 2],
      ['Senkwaage', 3],
      ['Kraftmesser', 4], ['Feder, die sich dehnt', 4],
      ['Winkelmesser', 5], ['Geodreieck', 5] ] },
    analog: { label: 'Analog oder digital', title: 'Analog (mechanisch) oder digital?', lz: 'm4', bins: ['analog (mechanisch)', 'digital'], items: [
      ['Stoppuhr mit Zeiger', 0], ['Flüssigkeitsthermometer', 0], ['Barometer mit Zeiger', 0], ['Balkenwaage mit Gewichtsteinen', 0], ['rundes Hygrometer mit Zeiger', 0], ['Bimetallthermometer', 0], ['Galileithermometer', 0], ['Kraftmesser mit Feder', 0],
      ['Stoppuhr mit Ziffernanzeige', 1], ['Digital-Barometer «948 mbar»', 1], ['Küchenwaage mit Display', 1], ['Fieberthermometer mit Display', 1], ['Hygrometer mit Display', 1], ['Dezibelmeter mit Display', 1], ['Infrarotthermometer', 1] ] },
    thermo: { label: 'Thermometer', title: 'Welches Thermometer ist beschrieben?', lz: 'm5', bins: ['Quecksilber', 'Alkohol', 'Bimetall', 'Digital', 'Infrarot', 'Galilei'], items: [
      ['silbriges, flüssiges Metall in einer Glaskapillare', 0],
      ['rot gefärbte Flüssigkeit im Röhrchen', 1], ['gut für tiefe Minusgrade', 1],
      ['zwei verklebte Metallplättchen biegen sich', 2], ['Spirale aus Messing und Eisen dreht einen Zeiger', 2],
      ['Messstab leitet umso besser, je heisser er ist', 3], ['Fieberthermometer mit Ziffernanzeige', 3],
      ['misst unsichtbare Strahlung jenseits des roten Lichts', 4], ['misst ohne Berührung im Ohr', 4],
      ['Glaskugeln sinken oder schwimmen', 5], ['abgelesen an der Plombe der untersten schwimmenden Kugel', 5] ] },
    bewegung: { label: 'Diagramme deuten', title: 'Was macht der Körper?', lz: 'd1', bins: ['bewegt sich vorwärts', 'steht still', 'bewegt sich rückwärts'], items: [
      ['s-t-Diagramm: Gerade steigt', 0], ['s-t-Diagramm: steile steigende Gerade', 0], ['v-t-Diagramm: Linie bei +2 m/s', 0], ['v = 1.67 m/s', 0],
      ['s-t-Diagramm: waagrechte Linie', 1], ['v-t-Diagramm: Linie auf der Zeitachse', 1], ['v = 0 m/s', 1], ['Fahrplan: Zug in der Station', 1],
      ['s-t-Diagramm: Gerade fällt', 2], ['v-t-Diagramm: Linie bei −2 m/s', 2], ['v = −0.67 m/s', 2], ['Position wird kleiner', 2] ] }
  },

  /* ---------- Erklär-Aufgaben ---------- */
  erklaeren: [
    { lz: 'm1', q: 'Erkläre am Beispiel «L = 6 m» die Begriffe physikalische Grösse, Messwert, Zahlenwert und Einheit.', pts: [
      { t: 'L ist die physikalische Grösse (Länge), als Kürzel geschrieben', k: ['groesse', 'laenge'] },
      { t: '6 m ist der Messwert', k: ['messwert'] },
      { t: '6 ist der Zahlenwert', k: ['zahlenwert', 'zahl'] },
      { t: 'm (Meter) ist die Einheit', k: ['einheit', 'meter'] },
      { t: 'Ein Messwert besteht immer aus Zahlenwert und Einheit', k: ['immer', 'zusammen', 'besteht'] } ],
      a: 'L ist die physikalische Grösse, hier die Länge, als Kürzel geschrieben. 6 m ist der Messwert. Er setzt sich aus dem Zahlenwert 6 und der Einheit m (Meter) zusammen. 6 m bedeutet 6 · 1 m. Eine physikalische Grösse wird immer durch Zahlenwert und Einheit beschrieben.' },
    { lz: 'm1', q: 'Warum genügt die Angabe «16» nicht als Messwert? Was braucht es, und womit erhält man einen Messwert?', pts: [
      { t: 'Ohne Einheit weiss man nicht, was gemeint ist (16 cm oder 16 km?)', k: ['einheit', 'cm', 'km', 'weiss'] },
      { t: 'Ein Messwert = Zahlenwert und Einheit', k: ['zahlenwert', 'einheit'] },
      { t: 'Messwerte erhält man mit einem Messgerät', k: ['messgeraet', 'geraet'] },
      { t: 'Beispiel für Gerät und Grösse, z.B. Metermass für die Länge', k: ['metermass', 'stoppuhr', 'waage', 'thermometer', 'messzylinder'] } ],
      a: 'Eine «nackte» Zahl sagt nichts: 16 kann 16 cm, 16 km oder 16 g sein. Ein Messwert braucht immer einen Zahlenwert und eine Einheit, z.B. 16 cm. Um einen Messwert zu erhalten, braucht man ein Messgerät, zum Beispiel ein Metermass für die Länge.' },
    { lz: 'm2', q: 'Du sollst herausfinden, wie viele ml Wasser in einem Esslöffel Platz haben. Beschreibe, wie du vorgehst und wie du den Messwert angibst.', pts: [
      { t: 'Messzylinder (und Becher) als Messgerät', k: ['messzylinder', 'zylinder'] },
      { t: 'Mehrere Löffelfüllungen messen, z.B. 5', k: ['5', 'fuenf', 'mehrere', 'loeffelfuell'] },
      { t: 'Durch die Anzahl teilen', k: ['teil', 'dividier', ': 5'] },
      { t: 'Auf Augenhöhe am tiefsten Punkt ablesen', k: ['augenhoehe', 'tiefst', 'ablesen'] },
      { t: 'Messwert mit Zahlenwert und Einheit ml angeben (z.B. 4.8 ml)', k: ['ml', 'einheit'] } ],
      a: 'Ich fülle 5 Löffel Wasser in den Messzylinder. Dann lese ich auf Augenhöhe am tiefsten Punkt der Wasseroberfläche ab und teile den Wert durch 5. So wird das Ergebnis genauer als bei einer einzelnen Füllung. Den Messwert gebe ich mit Zahlenwert und Einheit an, zum Beispiel 4.8 ml. Die Grösse ist das Volumen.' },
    { lz: 'm2', q: 'Wie misst du die Dicke einer einzelnen Seite eines Blocks? Begründe dein Vorgehen.', pts: [
      { t: 'Viele Seiten zusammen messen, z.B. 20', k: ['20', 'zwanzig', 'viele', 'mehrere', 'block'] },
      { t: 'Mit einem genauen Messgerät, z.B. der Messzange (bei 0 ablesen)', k: ['messzange', 'zange', 'schieblehre'] },
      { t: 'Durch die Anzahl Seiten teilen', k: ['teil', 'dividier'] },
      { t: 'Begründung: Eine Seite allein ist zu dünn, so wird es genauer', k: ['duenn', 'genau', 'klein'] } ],
      a: 'Eine einzelne Seite ist zu dünn, um sie direkt genau zu messen. Darum messe ich die Dicke von 20 Seiten mit der Messzange und teile das Ergebnis durch 20. So wird der Messwert viel genauer. Ich gebe ihn mit Einheit an, z.B. 0.06 mm.' },
    { lz: 'm3', q: 'Nenne sechs Messgeräte und die physikalische Grösse, die sie messen.', pts: [
      { t: 'Stoppuhr – Zeit / Thermometer – Temperatur', k: ['stoppuhr', 'thermometer'] },
      { t: 'Barometer – Luftdruck / Hygrometer – Luftfeuchtigkeit', k: ['barometer', 'hygrometer'] },
      { t: 'Messzylinder – Volumen / Metermass – Länge', k: ['messzylinder', 'metermass'] },
      { t: 'Waage – «Gewicht» / Senkwaage – Dichte', k: ['waage', 'senkwaage'] },
      { t: 'Dezibelmeter – Lautstärke / Voltmeter – Spannung / Kraftmesser – Kraft / Winkelmesser – Winkel', k: ['dezibel', 'voltmeter', 'kraftmesser', 'winkelmesser'] } ],
      a: 'Stoppuhr: Zeit. Thermometer: Temperatur. Barometer: Luftdruck. Hygrometer: Luftfeuchtigkeit. Messzylinder: Volumen. Metermass: Länge. Waage: «Gewicht». Senkwaage: Dichte. Dezibelmeter: Lautstärke. Voltmeter: Spannung. Kraftmesser: Kraft. Winkelmesser: Winkel.' },
    { lz: 'm3', q: 'Barometer und Hygrometer sehen sich oft ähnlich (rund, mit Zeiger). Wie unterscheidest du sie, und was messen sie?', pts: [
      { t: 'Barometer misst den Luftdruck', k: ['luftdruck'] },
      { t: 'Hygrometer misst die Luftfeuchtigkeit', k: ['feucht'] },
      { t: 'An der Einheit erkennen: mbar oder hPa beim Barometer', k: ['mbar', 'hpa'] },
      { t: 'Prozent (%) beim Hygrometer', k: ['%', 'prozent'] } ],
      a: 'Das Barometer misst den Luftdruck, das Hygrometer die Luftfeuchtigkeit. Man erkennt sie an der Einheit auf der Skala: Beim Barometer steht mbar oder hPa (Werte um 1000), beim Hygrometer Prozent (0 bis 100 %), oft auch «Humidity».' },
    { lz: 'm4', q: 'Erkläre den Unterschied zwischen analogen und digitalen Messgeräten. Nenne je zwei Beispiele.', pts: [
      { t: 'Analog = mechanisch: Zeiger oder Flüssigkeitssäule auf einer Skala', k: ['zeiger', 'skala', 'mechanisch', 'saeule'] },
      { t: 'Digital: Ziffern auf einem Display, elektronisch', k: ['ziffer', 'display', 'anzeige', 'elektron'] },
      { t: 'Zwei analoge Beispiele', k: ['stoppuhr mit zeiger', 'balkenwaage', 'barometer', 'thermometer', 'hygrometer'] },
      { t: 'Zwei digitale Beispiele', k: ['digital', 'kuechenwaage', 'fieber'] } ],
      a: 'Analoge oder mechanische Messgeräte zeigen den Wert mit einem Zeiger oder einer Flüssigkeitssäule auf einer Skala, z.B. die Stoppuhr mit Zeiger oder die Balkenwaage. Digitale Messgeräte messen elektronisch und zeigen den Wert als Ziffern auf einem Display, z.B. die digitale Stoppuhr oder die Küchenwaage mit Display. Viele Grössen kann man auf beide Arten messen.' },
    { lz: 'm5', q: 'Beschreibe, wie ein Bimetallthermometer funktioniert.', pts: [
      { t: 'Zwei verschiedene Metalle (z.B. Messing und Eisen) sind verklebt', k: ['zwei', 'metall', 'messing', 'eisen', 'verkleb'] },
      { t: 'Bei Wärme dehnen sie sich verschieden stark aus', k: ['dehn', 'ausdehn', 'ungleich', 'verschieden'] },
      { t: 'Darum biegt sich der Streifen', k: ['bieg', 'krumm'] },
      { t: 'Als Spirale gewickelt dreht er einen Zeiger', k: ['spirale', 'zeiger', 'dreh'] } ],
      a: 'Beim Bimetallthermometer sind zwei Plättchen aus verschiedenen Metallen, z.B. Messing und Eisen, fest verklebt. Wird es wärmer, dehnen sich die beiden Metalle verschieden stark aus. Darum biegt sich der Streifen in eine Richtung. Ist er zu einer Spirale gewickelt, dreht sich dabei ein Zeiger über die Skala.' },
    { lz: 'm5', q: 'Beschreibe, wie man mit einem Galileithermometer die Temperatur misst.', pts: [
      { t: 'Glaskugeln mit verschieden viel Flüssigkeit (und Luft) in einem Glaszylinder', k: ['kugel', 'glas'] },
      { t: 'Bei Erwärmung sinken oder schwimmen die Kugeln', k: ['sink', 'schwimm', 'steig'] },
      { t: 'Jede Kugel hat eine Plombe mit einer Temperatur', k: ['plombe', 'schild', 'anhaeng'] },
      { t: 'Abgelesen wird an der untersten der oben schwimmenden Kugeln', k: ['unterst', 'oben'] } ],
      a: 'Im Glaszylinder schwimmen Glaskugeln, die mit unterschiedlichen Mengen Flüssigkeit und Luft gefüllt sind. Ändert sich die Temperatur, sinken oder schwimmen sie. An jeder Kugel hängt eine Plombe mit einer Temperatur. Die aktuelle Temperatur liest man an der Plombe der untersten der oben schwimmenden Kugeln ab.' },
    { lz: 'm5', q: 'Vergleiche das Infrarotthermometer mit dem Alkoholthermometer: Wie messen sie, wofür eignen sie sich?', pts: [
      { t: 'Infrarot: misst die Wärmestrahlung, die ein Körper aussendet', k: ['strahl', 'infrarot'] },
      { t: 'Infrarot: ohne Berührung, z.B. im Ohr oder an der Stirn', k: ['beruehr', 'ohr', 'stirn', 'kontakt'] },
      { t: 'Alkohol: gefärbter Alkohol dehnt sich im Röhrchen aus', k: ['dehn', 'roehr', 'kapillar', 'fluessig'] },
      { t: 'Alkohol: eignet sich für tiefe Temperaturen (Minusgrade)', k: ['minus', 'tief', 'kalt'] } ],
      a: 'Das Infrarotthermometer misst die unsichtbare Wärmestrahlung, die jeder Körper aussendet. Heisse Körper strahlen mehr. Es misst ohne Berührung, z.B. im Ohr. Beim Alkoholthermometer dehnt sich gefärbter Alkohol in einem dünnen Röhrchen aus, wenn es wärmer wird. Er bleibt auch bei Minusgraden flüssig, darum eignet es sich für tiefe Temperaturen.' },
    { lz: 'm6', q: 'Beschreibe, wie sich die Zeitmessung von früher bis heute entwickelt hat.', pts: [
      { t: 'Früher: Sonnenstand (Sonnenuhr), auch Wasseruhren', k: ['sonne', 'wasser'] },
      { t: 'Gleichmässige Bewegungen als Zeitgeber, z.B. Pendel, Kirchenuhr', k: ['pendel', 'kirch', 'gleichmaessig'] },
      { t: 'Mechanische Taschenuhr mit Feder zum Aufziehen', k: ['taschenuhr', 'feder', 'aufzieh'] },
      { t: 'Heute Quarzuhren mit Batterie', k: ['quarz', 'batterie'] },
      { t: 'Atomuhren als präziseste Uhren, z.B. in GPS-Satelliten', k: ['atom', 'gps'] } ],
      a: 'Lange wurde die Zeit am Sonnenstand bestimmt, für die Bewässerung auch mit Wasseruhren. Später dienten gleichmässige Bewegungen wie ein Pendel als Zeitgeber, oft in der Kirchenuhr. Mit der mechanischen Taschenuhr, die man über eine Feder aufziehen musste, wurde die Uhr handlich. Heute gibt es Quarzuhren mit Batterie und Atomuhren, die in GPS-Satelliten stecken und in Milliarden Jahren nicht einmal eine Sekunde abweichen.' },
    { lz: 'u1', q: 'Erkläre, wie du mit dem Zahlenstrahl 0.00034 g in µg umrechnest.', pts: [
      { t: 'g steht bei 10⁰, µg bei 10⁻⁶', k: ['10', 'hoch', 'mikro'] },
      { t: 'Es sind 6 Zehnersprünge', k: ['6', 'sechs', 'zehnersprue'] },
      { t: 'In eine kleinere Einheit: Komma nach rechts, die Zahl wird grösser', k: ['rechts', 'groesser', 'kleiner'] },
      { t: 'Resultat 340 µg (Zwischenschritt 0.34 mg)', k: ['340', '0.34'] } ],
      a: 'Auf dem Zahlenstrahl steht g bei 10⁰ und µg bei 10⁻⁶. Dazwischen liegen 6 Zehnersprünge. Weil µg die kleinere Einheit ist, wird die Zahl grösser: Das Komma wandert 6 Stellen nach rechts. Zwischenschritt: 0.00034 g = 0.34 mg. Resultat: 340 µg.' },
    { lz: 'u1', q: 'Wann wird beim Umrechnen die Zahl grösser, wann kleiner? Erkläre mit je einem Beispiel.', pts: [
      { t: 'In eine kleinere Einheit: Zahl wird grösser, Komma nach rechts', k: ['rechts', 'groesser'] },
      { t: 'In eine grössere Einheit: Zahl wird kleiner, Komma nach links', k: ['links', 'kleiner'] },
      { t: 'So viele Stellen wie Zehnersprünge', k: ['zehnersprue', 'sprue', 'stellen'] },
      { t: 'Passende Beispiele, z.B. 22 km = 22\'000 m, 1000 µm = 0.1 cm', k: ['km', 'cm', 'mm', 'mg', 'ml'] } ],
      a: 'Rechnet man in eine kleinere Einheit um, braucht es mehr davon: Die Zahl wird grösser, das Komma wandert nach rechts, z.B. 22 km = 22\'000 m (3 Sprünge). Rechnet man in eine grössere Einheit um, wird die Zahl kleiner, das Komma wandert nach links, z.B. 1000 µm = 0.1 cm (4 Sprünge). Das Komma wandert immer so viele Stellen, wie es Zehnersprünge sind.' },
    { lz: 'u2', q: 'Erkläre, wie du die Dauer von 8.50 Uhr bis 11.12 Uhr in Stunden als Dezimalzahl berechnest.', pts: [
      { t: 'Zuerst die Dauer in h und min bestimmen: 2 h 22 min', k: ['2 h 22', '22 min', '2h 22'] },
      { t: 'Minuten durch 60 teilen', k: ['60'] },
      { t: 'Zeit ist ein 60er-System, nicht 100er', k: ['60er', 'sechzig', 'nicht'] },
      { t: 'Resultat: 2.37 h', k: ['2.37', '2,37'] } ],
      a: 'Von 8.50 Uhr bis 10.50 Uhr sind es 2 h, bis 11.12 Uhr noch 22 min dazu: 2 h 22 min. Die Zeit ist ein 60er-System, darum teile ich die Minuten durch 60: 22 : 60 = 0.37. Die Dauer beträgt 2.37 h.' },
    { lz: 'u3', q: 'Ein Gepard läuft 24 m/s. Rechne in km/h um und erkläre, warum man mit 3.6 rechnet.', pts: [
      { t: 'm/s mal 3.6 ergibt km/h', k: ['3.6', '3,6', 'mal'] },
      { t: '24 · 3.6 = 86.4 km/h', k: ['86.4', '86,4', '86'] },
      { t: 'In einer Stunde sind 3600 s', k: ['3600'] },
      { t: '1000 m = 1 km, also 3600 : 1000 = 3.6', k: ['1000'] } ],
      a: 'Von m/s nach km/h rechnet man mal 3.6: 24 m/s · 3.6 = 86.4 km/h. Grund: In einer Stunde hat es 3600 Sekunden, der Gepard läuft also 24 · 3600 m = 86\'400 m pro Stunde. Das sind 86.4 km, weil 1000 m ein Kilometer sind. Zusammen ergibt das den Faktor 3600 : 1000 = 3.6.' },
    { lz: 'd1', q: 'Was kannst du aus einem s-t-Diagramm alles herauslesen? Nenne mindestens vier Dinge.', pts: [
      { t: 'Steigung: je steiler, desto schneller', k: ['steil', 'schnell'] },
      { t: 'Waagrecht: Stillstand', k: ['waagrecht', 'still', 'steh'] },
      { t: 'Fallende Linie: Bewegung rückwärts', k: ['rueckwaerts', 'faellt', 'fallend', 'sink'] },
      { t: 'Startzeit und Startort (nicht immer 0)', k: ['start', 'beginn', 'anfang'] },
      { t: 'Schnittpunkte: gleichauf, überholen oder treffen', k: ['schnitt', 'gleichauf', 'ueberhol', 'treff', 'kreuz'] },
      { t: 'Gerade = gleichmässig, Kurve = nicht regelmässig', k: ['gerade', 'gleichmaessig', 'kurve', 'regelmaessig'] } ],
      a: 'Im s-t-Diagramm steht die Zeit auf der x-Achse und der Weg auf der y-Achse. Je steiler eine Linie, desto schneller die Bewegung. Eine waagrechte Linie bedeutet Stillstand, eine fallende Linie eine Bewegung rückwärts. Der Anfangspunkt zeigt, wann und wo die Bewegung startet. Eine Gerade ist eine gleichmässige Bewegung, eine Kurve eine unregelmässige. Schneiden sich zwei Linien, sind beide zur gleichen Zeit am gleichen Ort.' },
    { lz: 'd1', q: 'Du läufst 20 m in 4 s und gehst 20 m in 17 s. Wie sehen die beiden Bewegungen im s-t-Diagramm aus? Begründe.', pts: [
      { t: 'Beide sind Geraden ab 0/0', k: ['gerade', '0/0', 'nullpunkt', 'ursprung'] },
      { t: 'Rennen: steile Gerade, erreicht 20 m schon bei 4 s', k: ['steil', '4 s', '4s'] },
      { t: 'Gehen: flache Gerade, erreicht 20 m erst bei 17 s', k: ['flach', '17'] },
      { t: 'Steiler heisst schneller', k: ['schneller'] } ],
      a: 'Beide Bewegungen beginnen bei 0 s und 0 m und sind gleichmässig, also Geraden. Die Gerade für das Rennen ist steil: Sie erreicht 20 m schon nach 4 s. Die Gerade für das Gehen ist flach und erreicht 20 m erst nach 17 s. Je steiler die Gerade, desto schneller die Bewegung. Rennen ist etwa 4.3 Mal schneller.' },
    { lz: 'd2', q: 'Erkläre, wie du in einem grafischen Fahrplan Abfahrt, Ankunft und Haltezeit eines Zuges abliest.', pts: [
      { t: 'x-Achse: Zeit, y-Achse: Stationen (Strecke)', k: ['x-achse', 'zeit', 'station'] },
      { t: 'Zuglinie suchen und bei der Station auf die Zeitachse hinunter schauen', k: ['linie', 'ablesen', 'hinunter', 'senkrecht'] },
      { t: 'Waagrechtes Stück = Halt, seine Länge = Haltezeit', k: ['waagrecht', 'halt'] },
      { t: 'Steigende und fallende Linien = verschiedene Fahrtrichtungen', k: ['richtung', 'steig', 'fall', 'gegen'] } ],
      a: 'Im grafischen Fahrplan ist die Uhrzeit auf der x-Achse, die Stationen sind an der y-Achse. Ich suche die Linie des Zuges und schaue, wo sie die Linie der Station trifft. Darunter lese ich auf der Zeitachse die Zeit ab. Hält der Zug, ist die Linie dort waagrecht. Die Länge dieses Stücks ist die Haltezeit. Steigende und fallende Linien sind Züge in verschiedenen Richtungen.' },
    { lz: 'd3', q: 'Ein Löwe startet bei Meter 5 und geht in 1.5 s 3 m rückwärts, bleibt 2 s stehen und geht dann in 2 s 4 m vorwärts. Beschreibe, wie du das s-t- und das v-t-Diagramm zeichnest.', pts: [
      { t: 's-t: Start bei (0 s | 5 m), Endpunkte jeder Teilbewegung mit Geraden verbinden', k: ['5 m', 'start', 'verbind', 'gerade'] },
      { t: 'v₁ = −3 m : 1.5 s = −2 m/s (rückwärts, Minus)', k: ['-2', '−2', 'minus'] },
      { t: 'v₂ = 0 m/s beim Stehen', k: ['0 m/s', 'null', 'steh'] },
      { t: 'v₃ = 4 m : 2 s = 2 m/s', k: ['2 m/s', '+2'] },
      { t: 'v-t: waagrechte Stücke über dieselben Zeitspannen («Skyline»)', k: ['waagrecht', 'skyline', 'treppe', 'stufe'] } ],
      a: 's-t-Diagramm: Ich beginne bei 0 s und 5 m. Nach 1.5 s ist der Löwe bei 2 m, ich verbinde mit einer Geraden. Bis 3.5 s bleibt er bei 2 m (waagrecht), bis 5.5 s geht er auf 6 m. v-t-Diagramm: v₁ = −3 m : 1.5 s = −2 m/s, v₂ = 0 m/s, v₃ = 4 m : 2 s = 2 m/s. Jeden Wert zeichne ich als waagrechtes Stück über dieselbe Zeitspanne wie im s-t-Diagramm: von 0 bis 1.5 s bei −2, bis 3.5 s bei 0, bis 5.5 s bei +2. Es entsteht eine eckige «Skyline».' },
    { lz: 'd3', q: 'Welche Fehler passieren oft beim Umwandeln von s-t- in v-t-Diagramme? Wie vermeidest du sie?', pts: [
      { t: 'Minus beim Rückwärtsfahren vergessen', k: ['minus', 'rueckwaerts', 'negativ'] },
      { t: 'Zeitspannen verschoben: Wechsel müssen zur gleichen Zeit sein wie im s-t-Diagramm', k: ['gleich', 'zeit', 'verschob', 'wechsel'] },
      { t: 'Zeit falsch abgelesen, Beschriftung der x-Achse beachten', k: ['beschrift', 'achse', 'mitte', 'mittig'] },
      { t: 'Im v-t-Diagramm nicht weiterzeichnen, sondern springen (waagrecht, eckig)', k: ['spring', 'waagrecht', 'eckig', 'skyline'] } ],
      a: 'Häufig wird das Minus beim Rückwärtsfahren vergessen. Dann liegt die Linie im v-t-Diagramm oberhalb statt unterhalb der Zeitachse. Ein zweiter Fehler sind verschobene Zeiten: Die Wechsel müssen im v-t-Diagramm genau zur gleichen Zeit sein wie im s-t-Diagramm. Darum genau prüfen, ob die Zeit auf der x-Achse auf der Linie oder in der Feldmitte beschriftet ist. Und im v-t-Diagramm wird nicht «weitergezeichnet», man springt von Wert zu Wert.' },
    { lz: 'd4', q: 'Erkläre, wie man mit dem Schreibstreifen des Elektrowagens die Geschwindigkeit bestimmt.', pts: [
      { t: 'Der Schreiber setzt 50 Punkte pro Sekunde', k: ['50'] },
      { t: 'Beim ersten Punkt 0, dann 50 und 100 Punkte abzählen (1 s, 2 s)', k: ['zaehl', '100', '0'] },
      { t: 'Strecke mit dem Metermass messen', k: ['metermass', 'mess', 'strecke'] },
      { t: 'v = Strecke : Zeit, z.B. 14 cm : 1 s = 14 cm/s', k: ['s : t', 'cm/s', 'teil', 'durch'] } ],
      a: 'Der Schreiber setzt in einer Sekunde 50 Markierungen auf den Streifen. Ich notiere beim ersten Punkt 0 und zähle 50 Punkte weiter: Das ist 1 s Fahrt. Bei 100 Punkten sind es 2 s. Mit dem Metermass messe ich die Strecke bis zu diesen Punkten. Dann teile ich die Strecke durch die Zeit, z.B. 14 cm : 1 s = 14 cm/s.' },
    { lz: 'r1', q: 'Erkläre die Formel v = s : t mit Worten. Wie lauten die beiden anderen Varianten, und wie prüfst du mit den Einheiten, ob sie stimmen?', pts: [
      { t: 'Geschwindigkeit = Strecke : Zeit', k: ['strecke', 'zeit', 'geschwindigkeit'] },
      { t: 's = v · t', k: ['s = v', 's=v'] },
      { t: 't = s : v', k: ['t = s', 't=s'] },
      { t: 'Einheitenkontrolle, z.B. m/s · s = m oder km : km/h = h', k: ['einheit', 'kuerz', 'm/s'] } ],
      a: 'Die Geschwindigkeit ist die Strecke geteilt durch die Zeit: v = s : t. Sie sagt, wie viele Meter man pro Sekunde zurücklegt. Daraus folgen s = v · t und t = s : v. Mit den Einheiten prüfe ich: m/s · s = m, das ist eine Strecke. km : km/h = km · h / km = h, das ist eine Zeit.' },
    { lz: 'r2', q: 'Beschreibe das Lösungsrezept für physikalische Aufgaben am Beispiel: Ein Lastwagen fährt 400 km mit 80 km/h. Wie lange dauert die Reise?', pts: [
      { t: 'geg.: s = 400 km, v = 80 km/h', k: ['geg', '400', '80'] },
      { t: 'ges.: t', k: ['ges'] },
      { t: 'Formel t = s : v notieren', k: ['t = s', 't=s', 'formel'] },
      { t: 'Einsetzen mit Einheiten, ohne Doppelbruch: 400 km · h / 80 km', k: ['einsetz', 'doppelbruch', 'km · h', 'kuerz'] },
      { t: 'Resultat 5.0 h und prüfen, ob realistisch', k: ['5.0', '5 h', 'realistisch', 'pruef'] } ],
      a: '1. geg.: s = 400 km, v = 80 km/h. 2. ges.: t. 3. Eine Skizze braucht es hier nicht. 4. Formel: t = s : v. 5. Einsetzen mit Einheiten, ohne Doppelbruch: t = 400 km · h / 80 km. 6. Ausrechnen und Einheiten kürzen: t = 5.0 h. 7. Prüfen: 5 Stunden Fahrt für 400 km ist realistisch, eine Kommastelle genügt.' },
    { lz: 'r2', q: 'Warum notiert man bei Rechenaufgaben zuerst geg. und ges.? Was gehört zu einem vollständigen Lösungsweg?', pts: [
      { t: 'Man sieht, welche Grössen bekannt sind und was man sucht', k: ['bekannt', 'gesucht', 'ueberblick', 'sieht'] },
      { t: 'Daraus wählt man die passende Formel', k: ['formel'] },
      { t: 'Einsetzen mit Einheiten, Einheiten kürzen', k: ['einheit', 'einsetz'] },
      { t: 'Resultat doppelt unterstreichen, auf Plausibilität prüfen und runden', k: ['realistisch', 'pruef', 'rund', 'unterstreich', 'sinnvoll'] } ],
      a: 'Mit geg. und ges. sieht man auf einen Blick, welche Grössen bekannt sind und welche gesucht ist. Damit findet man die passende Formel und löst sie nach der gesuchten Grösse auf. Zu einem vollständigen Lösungsweg gehören ausserdem das Einsetzen mit Einheiten, das Ausrechnen mit Kürzen der Einheiten und das Resultat mit Einheit. Am Schluss prüft man, ob es realistisch ist, und gibt eine sinnvolle Genauigkeit an.' }
  ],

  /* ---------- Rechenaufgaben nach dem Lösungsrezept ---------- */
  rechnen: {
    titel: 'Rechnen mit dem Lösungsrezept',
    text: 'Löse jede Aufgabe Schritt für Schritt wie in der Prüfung: gesuchte Grösse, Formel, Einsetzen, Resultat mit Einheit. Rechne auf einem Blatt mit, eine Kommastelle genügt. Dezimalpunkt oder Komma, beides geht.',
    aufgaben: [
      { id: 'lastwagen', lz: 'r2', lz2: ['r1'], titel: 'Lastwagen', q: 'Ein Lastwagen fährt eine Strecke von 400 km mit der Geschwindigkeit von 80 km/h. Wie lange dauert die Reise?', schritte: [
        { f: 'Was ist gesucht?', o: ['die Zeit t', 'die Strecke s', 'die Geschwindigkeit v'], e: 'Gefragt ist «wie lange», also die Zeit t. Gegeben sind s = 400 km und v = 80 km/h.' },
        { f: 'Welche Formel brauchst du?', o: ['t = s : v', 't = v : s', 't = s · v'], e: 'Aus v = s : t folgt t = s : v. Kontrolle: km : km/h = km · h / km = h.' },
        { f: 'Resultat:', z: 5, einheit: 'h', einheiten: ['h', 'km', 'km/h', 'min'], tol: .05, e: 't = 400 km · h / 80 km = 5.0 h. Fünf Stunden für 400 km ist realistisch.' } ],
        loesung: ['geg.: s = 400 km, v = 80 km/h', 'ges.: t', 't = s : v', 't = 400 km · h / 80 km', 't = 5.0 h'] },
      { id: 'falke', lz: 'r1', lz2: ['u3'], titel: 'Turmfalke', q: 'Ein Turmfalke kann im Sturzflug pro Sekunde 50 m fallen. Wie gross ist seine Geschwindigkeit in m/s und in km/h?', schritte: [
        { f: 'Welche Formel brauchst du?', o: ['v = s : t', 'v = s · t', 't = s : v'], e: 'Gesucht ist die Geschwindigkeit: v = s : t.' },
        { f: 'Geschwindigkeit in m/s:', z: 50, einheit: 'm/s', tol: .1, e: 'v = 50 m : 1 s = 50 m/s.' },
        { f: 'Geschwindigkeit in km/h:', z: 180, einheit: 'km/h', tol: .5, e: '50 m/s · 3.6 = 180 km/h.' } ],
        loesung: ['geg.: s = 50 m, t = 1 s', 'ges.: v', 'v = s : t = 50 m : 1 s = 50 m/s', 'v = 50 · 3.6 km/h = 180 km/h'] },
      { id: 'gepard', lz: 'r1', lz2: ['u3'], titel: 'Gepard', q: 'Ein Gepard nimmt im Sprint Sprünge von 6.0 m, davon macht er 4 pro Sekunde. Wie schnell ist er in m/s und in km/h?', schritte: [
        { f: 'Wie weit kommt der Gepard in 1 s?', z: 24, einheit: 'm', tol: .05, e: '4 Sprünge · 6.0 m = 24 m in einer Sekunde. Das ist eine Lösungsidee (Schritt 3 im Rezept).' },
        { f: 'Geschwindigkeit in m/s:', z: 24, einheit: 'm/s', tol: .1, e: 'v = s : t = 24 m : 1 s = 24 m/s.' },
        { f: 'Geschwindigkeit in km/h:', z: 86.4, einheit: 'km/h', tol: .5, e: '24 m/s · 3.6 = 86.4 km/h.' } ],
        loesung: ['geg.: 4 Sprünge à 6.0 m pro 1 s → s = 24 m, t = 1 s', 'ges.: v', 'v = s : t = 24 m : 1 s = 24 m/s', 'v = 24 · 3.6 km/h = 86.4 km/h'] },
      { id: 'pferd', lz: 'r1', lz2: ['u3'], titel: 'Pferd', q: 'Ein Pferd braucht beim Rennen von Pfosten zu Pfosten, die 25 m auseinander stehen, je 2.0 s. Wie schnell ist es in m/s und in km/h?', schritte: [
        { f: 'Welche Formel brauchst du?', o: ['v = s : t', 's = v · t', 't = s : v'], e: 'Gesucht ist die Geschwindigkeit: v = s : t.' },
        { f: 'Geschwindigkeit in m/s:', z: 12.5, einheit: 'm/s', tol: .1, e: 'v = 25 m : 2.0 s = 12.5 m/s.' },
        { f: 'Geschwindigkeit in km/h:', z: 45, einheit: 'km/h', tol: .5, e: '12.5 m/s · 3.6 = 45 km/h.' } ],
        loesung: ['geg.: s = 25 m, t = 2.0 s', 'ges.: v', 'v = s : t = 25 m : 2.0 s = 12.5 m/s', 'v = 12.5 · 3.6 km/h = 45 km/h'] },
      { id: 'storch', lz: 'r2', lz2: ['r1'], titel: 'Störche', q: 'Störche fliegen ins Winterquartier nach Zentralafrika, ca. 3000 km weit. Pausen weggerechnet sind sie in zwei Tagen dort. Wie schnell wären sie im Nonstopflug?', schritte: [
        { f: 'Welche Einheit wählst du für die Zeit, damit v in km/h herauskommt?', o: ['Stunden: 2 Tage = 48 h', 'Tage: t = 2', 'Minuten: 2 Tage = 120 min'], e: 'Zu km passt h. Zwei Tage sind 2 · 24 h = 48 h.' },
        { f: 'Welche Formel brauchst du?', o: ['v = s : t', 'v = s · t', 'v = t : s'], e: 'Gesucht ist die Geschwindigkeit: v = s : t.' },
        { f: 'Resultat:', z: 62.5, einheit: 'km/h', einheiten: ['km/h', 'm/s', 'km', 'h'], tol: .2, e: 'v = 3000 km : 48 h = 62.5 km/h.' } ],
        loesung: ['geg.: s = 3000 km, t = 2 Tage = 48 h', 'ges.: v', 'v = s : t', 'v = 3000 km : 48 h', 'v = 62.5 km/h'] },
      { id: 'erde', lz: 'r2', lz2: ['r1'], titel: 'Erddrehung', q: 'Die Erde dreht sich in einem Tag (24 h) einmal um ihre Achse. Der Radius ist 6370 km, der Umfang ist 2 · Radius · 3.141. Wie schnell bewegt sich ein Punkt am Äquator?', schritte: [
        { f: 'Wie gross ist der Umfang (die Strecke)?', z: 40016, einheit: 'km', tol: 5, e: 'U = 2 · 6370 km · 3.141 = 40\'016 km. Diese Strecke legt ein Punkt am Äquator in 24 h zurück.' },
        { f: 'Welche Formel brauchst du?', o: ['v = s : t', 's = v · t', 't = s : v'], e: 'Gesucht ist die Geschwindigkeit: v = s : t.' },
        { f: 'Resultat:', z: 1667.3, einheit: 'km/h', einheiten: ['km/h', 'm/s', 'km', 'h'], tol: 2, e: 'v = 40\'016 km : 24 h = 1667 km/h. Wir spüren nichts davon, weil die Luft sich mitdreht.' } ],
        loesung: ['geg.: r = 6370 km, t = 24 h', 'ges.: v', 's = U = 2 · r · 3.141 = 40\'016 km', 'v = s : t = 40\'016 km : 24 h', 'v = 1667 km/h'] },
      { id: 'wolf', lz: 'r1', lz2: ['r2'], titel: 'Wolf und Schall', q: 'Der Schall hat in der Luft eine Geschwindigkeit von 300 m/s. Du siehst einen Wolf heulen, hörst den Ton aber erst 4.0 s später. Wie weit ist er weg?', schritte: [
        { f: 'Was ist gesucht?', o: ['die Strecke s', 'die Zeit t', 'die Geschwindigkeit v'], e: 'Gefragt ist «wie weit», also die Strecke s. Gegeben sind v = 300 m/s und t = 4.0 s.' },
        { f: 'Welche Formel brauchst du?', o: ['s = v · t', 's = v : t', 's = t : v'], e: 'Strecke = Geschwindigkeit · Zeit. Kontrolle: m/s · s = m.' },
        { f: 'Resultat:', z: 1200, einheit: 'm', einheiten: ['m', 'm/s', 's', 'km/h'], tol: 2, e: 's = 300 m/s · 4.0 s = 1200 m (= 1.2 km).' } ],
        loesung: ['geg.: v = 300 m/s, t = 4.0 s', 'ges.: s', 's = v · t', 's = 300 m/s · 4.0 s', 's = 1200 m'] },
      { id: 'flugzeug', lz: 'r1', lz2: ['u3'], titel: 'Überschallflugzeug', q: 'a) Wie schnell in km/h muss ein Flugzeug mindestens sein, damit es schneller als der Schall (300 m/s) fliegt? b) Wie weit kommt ein Flugzeug mit Schallgeschwindigkeit in 3.0 h?', schritte: [
        { f: 'a) Schallgeschwindigkeit in km/h:', z: 1080, einheit: 'km/h', tol: 1, e: '300 m/s · 3.6 = 1080 km/h.' },
        { f: 'b) Welche Formel brauchst du?', o: ['s = v · t', 't = s : v', 'v = s : t'], e: 'Gesucht ist die Strecke: s = v · t. Weil t in h gegeben ist, rechnest du mit v in km/h.' },
        { f: 'b) Resultat:', z: 3240, einheit: 'km', einheiten: ['km', 'm', 'h', 'km/h'], tol: 5, e: 's = 1080 km/h · 3.0 h = 3240 km.' } ],
        loesung: ['a) v = 300 m/s · 3.6 = 1080 km/h', 'b) geg.: v = 1080 km/h, t = 3.0 h', 'ges.: s', 's = v · t = 1080 km/h · 3.0 h', 's = 3240 km'] },
      { id: 'sonne', lz: 'r2', lz2: ['r1'], titel: 'Sonnenlicht', q: 'Die Sonne ist 150 Mio. km von der Erde entfernt. Das Licht hat eine Geschwindigkeit von 300\'000 km/s. Wie lange braucht ein Lichtstrahl von der Sonne zu uns?', schritte: [
        { f: 'Welche Formel brauchst du?', o: ['t = s : v', 't = v : s', 't = s · v'], e: 'Gesucht ist die Zeit: t = s : v.' },
        { f: 'Resultat in Sekunden:', z: 500, einheit: 's', einheiten: ['s', 'min', 'h', 'km'], tol: 1, e: 't = 150\'000\'000 km : 300\'000 km/s = 500 s.' },
        { f: 'Und in Minuten?', z: 8.3, einheit: 'min', tol: .05, e: '500 s : 60 = 8.3 min, also gut 8 Minuten.' } ],
        loesung: ['geg.: s = 150\'000\'000 km, v = 300\'000 km/s', 'ges.: t', 't = s : v', 't = 150\'000\'000 km · s / 300\'000 km', 't = 500 s = 8.3 min'] },
      { id: 'kolibri', lz: 'r2', lz2: ['r1'], titel: 'Kolibri', q: 'Ein Kolibri fliegt in einer Nacht von Texas nach Mexiko übers offene Meer. Er fliegt rund 100 km/h, die Strecke ist 1000 km lang. Ist das in einer Nacht möglich?', schritte: [
        { f: 'Was musst du berechnen?', o: ['die Flugzeit t', 'die Strecke s', 'die Geschwindigkeit v'], e: 'Um zu prüfen, ob es in einer Nacht geht, berechnest du die Flugzeit: t = s : v.' },
        { f: 'Flugzeit:', z: 10, einheit: 'h', einheiten: ['h', 'min', 'km', 'km/h'], tol: .05, e: 't = 1000 km : 100 km/h = 10 h.' },
        { f: 'Ist es möglich?', o: ['Ja, 10 h entsprechen ungefähr einer Nacht.', 'Nein, es dauert mehrere Tage.', 'Nein, es dauert nur 10 Minuten.'], e: 'Eine Nacht dauert etwa 10 bis 12 Stunden. Der Flug ist also gerade möglich.' } ],
        loesung: ['geg.: s = 1000 km, v = 100 km/h', 'ges.: t', 't = s : v = 1000 km · h / 100 km', 't = 10 h → in einer Nacht knapp möglich'] },
      { id: 'platzwart', lz: 'r2', lz2: ['r1', 'u1'], titel: 'Platzwart', q: 'Ein Platzwart fährt pro Woche 30 Mal um ein Spielfeld. Das Feld hat einen Umfang von 300 m. Er fährt mit 6.0 km/h. Wie lange fährt er insgesamt, in Stunden?', schritte: [
        { f: 'Gesamte Strecke in km:', z: 9, einheit: 'km', tol: .05, e: '30 · 300 m = 9000 m = 9 km. Achtung: in km umrechnen, weil v in km/h gegeben ist.' },
        { f: 'Welche Formel brauchst du?', o: ['t = s : v', 't = s · v', 'v = s : t'], e: 'Gesucht ist die Zeit: t = s : v.' },
        { f: 'Resultat:', z: 1.5, einheit: 'h', einheiten: ['h', 'min', 'km', 'km/h'], tol: .02, e: 't = 9 km : 6.0 km/h = 1.5 h.' } ],
        loesung: ['geg.: s = 30 · 300 m = 9000 m = 9 km, v = 6.0 km/h', 'ges.: t', 't = s : v', 't = 9 km · h / 6.0 km', 't = 1.5 h'] },
      { id: 'etappen', lz: 'r2', lz2: ['r1'], titel: 'Zwei Etappen', q: 'Ein Sportteam fährt in zwei Etappen an einen Wettkampf. Die erste Etappe fährt es 2.5 h lang mit 100 km/h. Für die zweite Etappe von 150 km hat es noch 2.0 h Zeit. a) Wie weit war die erste Etappe? b) Wie schnell muss es auf der zweiten Etappe fahren? c) Wie weit fährt es total?', schritte: [
        { f: 'a) Welche Formel für die erste Etappe?', o: ['s₁ = v₁ · t₁', 's₁ = v₁ : t₁', 'v₁ = s₁ : t₁'], e: 'Gesucht ist die Strecke der ersten Etappe: s₁ = v₁ · t₁.' },
        { f: 'a) Strecke der ersten Etappe:', z: 250, einheit: 'km', tol: .5, e: 's₁ = 100 km/h · 2.5 h = 250 km.' },
        { f: 'b) Geschwindigkeit auf der zweiten Etappe:', z: 75, einheit: 'km/h', einheiten: ['km/h', 'km', 'h', 'm/s'], tol: .2, e: 'v₂ = s₂ : t₂ = 150 km : 2.0 h = 75 km/h.' },
        { f: 'c) Strecke total:', z: 400, einheit: 'km', tol: .5, e: 's = s₁ + s₂ = 250 km + 150 km = 400 km.' } ],
        loesung: ['geg.: Etappe 1: v₁ = 100 km/h, t₁ = 2.5 h; Etappe 2: s₂ = 150 km, t₂ = 2.0 h', 'a) s₁ = v₁ · t₁ = 100 km/h · 2.5 h = 250 km', 'b) v₂ = s₂ : t₂ = 150 km : 2.0 h = 75 km/h', 'c) s = s₁ + s₂ = 400 km'] },
      { id: 'koeln', lz: 'r2', lz2: ['r1'], titel: 'Fahrt nach Köln', q: 'Ein Autofahrer muss insgesamt 1000 km weit nach Köln. Er ist bereits 4.0 h mit 130 km/h und 2.5 h mit 95 km/h gefahren. In 2.0 h muss er dort sein. Wie schnell muss er nun mindestens fahren?', schritte: [
        { f: 'Strecke der ersten Teilstrecke:', z: 520, einheit: 'km', tol: .5, e: 's₁ = 130 km/h · 4.0 h = 520 km.' },
        { f: 'Strecke der zweiten Teilstrecke:', z: 237.5, einheit: 'km', tol: .5, e: 's₂ = 95 km/h · 2.5 h = 237.5 km.' },
        { f: 'Wie viele km bleiben noch?', z: 242.5, einheit: 'km', tol: .5, e: 's₃ = 1000 km − 520 km − 237.5 km = 242.5 km.' },
        { f: 'Mindestgeschwindigkeit für den Rest:', z: 121.25, einheit: 'km/h', einheiten: ['km/h', 'km', 'h', 'm/s'], tol: .5, e: 'v₃ = 242.5 km : 2.0 h = 121.3 km/h, also mindestens etwa 121 km/h.' } ],
        loesung: ['Tabelle: 1) v = 130 km/h, t = 4.0 h, s = ?  2) v = 95 km/h, t = 2.5 h, s = ?  3) s = ?, t = 2.0 h, v = ?', 's₁ = 130 km/h · 4.0 h = 520 km', 's₂ = 95 km/h · 2.5 h = 237.5 km', 's₃ = 1000 km − 520 km − 237.5 km = 242.5 km', 'v₃ = s₃ : t₃ = 242.5 km : 2.0 h = 121.3 km/h'] },
      { id: 'ochsen', lz: 'r2', lz2: ['r1', 'u3'], titel: 'Moschusochsen', q: 'Zwei Moschusochsen rennen aus 40 m Abstand aufeinander los, beide mit 40 km/h. Ochse A startet 1.0 s früher. a) Nach welcher Strecke (von A aus) prallen sie zusammen? b) Nach welcher Zeit (von A aus gerechnet)?', schritte: [
        { f: 'Geschwindigkeit in m/s:', z: 11.1, einheit: 'm/s', tol: .1, e: '40 km/h : 3.6 = 11.1 m/s. Weil die Strecke in m gegeben ist, rechnest du in m/s.' },
        { f: 'Wie weit ist A nach 1.0 s, bevor B startet?', z: 11.1, einheit: 'm', tol: .1, e: 's = 11.1 m/s · 1.0 s = 11.1 m. Es bleiben 40 m − 11.1 m = 28.9 m Abstand.' },
        { f: 'Wie lange dauert es danach bis zum Zusammenprall? (Beide rennen, der Abstand schrumpft um 22.2 m pro s.)', z: 1.3, einheit: 's', tol: .05, e: 't = 28.9 m : 22.2 m/s = 1.3 s.' },
        { f: 'a) Strecke von A bis zum Zusammenprall:', z: 25.6, einheit: 'm', tol: .3, e: 'A rennt 1.0 s + 1.3 s = 2.3 s lang: s = 11.1 m/s · 2.3 s = 25.6 m.' },
        { f: 'b) Zeit von A bis zum Zusammenprall:', z: 2.3, einheit: 's', tol: .05, e: '1.0 s Vorsprung + 1.3 s = 2.3 s.' } ],
        loesung: ['geg.: Abstand 40 m, v = 40 km/h = 11.1 m/s, A startet 1.0 s früher', 'Vorsprung: s = 11.1 m/s · 1.0 s = 11.1 m, Restabstand 28.9 m', 'Beide zusammen: 2 · 11.1 m/s = 22.2 m/s → t = 28.9 m : 22.2 m/s = 1.3 s', 'a) s_A = 11.1 m/s · 2.3 s = 25.6 m', 'b) t_A = 1.0 s + 1.3 s = 2.3 s'] },
      { id: 'timtom', lz: 'r2', lz2: ['r1', 'u2'], titel: 'Tim und Tom', q: 'Tim und Tom wohnen 54 km auseinander. Tim fährt 31 km von Luzern aus, bis er um 10.45 Uhr in Olten auf Tom trifft, der von Bern kommt. Beide fahren 25 km/h. 1) Wie weit ist Tom gefahren? 2) Wie viel Vorsprung hatte Tim? 3) Wie lange ist Tim gefahren? Wann ist er gestartet?', schritte: [
        { f: '1) Strecke von Tom:', z: 23, einheit: 'km', tol: .05, e: '54 km − 31 km = 23 km.' },
        { f: '2) Vorsprung von Tim:', z: 8, einheit: 'km', tol: .05, e: '31 km − 23 km = 8 km. Tim ist 8 km weiter gefahren, bei gleichem Tempo ist er also früher gestartet.' },
        { f: '3) Fahrzeit von Tim in Stunden:', z: 1.24, einheit: 'h', tol: .01, e: 't = s : v = 31 km : 25 km/h = 1.24 h. Das sind 1 h 14 min (0.24 · 60 = 14.4 min).' },
        { f: 'Wann ist Tim gestartet?', o: ['etwa 9.31 Uhr', 'etwa 9.21 Uhr', 'etwa 9.45 Uhr'], e: '10.45 Uhr − 1 h 14 min = 9.31 Uhr.' } ],
        loesung: ['geg.: Abstand 54 km, s_Tim = 31 km, v = 25 km/h, Treffpunkt 10.45 Uhr', '1) s_Tom = 54 km − 31 km = 23 km', '2) Vorsprung = 31 km − 23 km = 8 km', '3) t_Tim = s : v = 31 km : 25 km/h = 1.24 h = 1 h 14 min', 'Start: 10.45 Uhr − 1 h 14 min = 9.31 Uhr'] },
      { id: 'zug', lz: 'd2', lz2: ['r1', 'u2'], titel: 'Zug im Fahrplan', q: 'Im grafischen Fahrplan liest du ab: Ein Zug fährt die ganze Strecke von 42.9 km in 43 Minuten. Wie hoch ist seine Geschwindigkeit?', schritte: [
        { f: 'Fahrzeit in Stunden:', z: .72, einheit: 'h', tol: .01, e: '43 min : 60 = 0.72 h.' },
        { f: 'Welche Formel brauchst du?', o: ['v = s : t', 'v = s · t', 't = s : v'], e: 'Gesucht ist die Geschwindigkeit: v = s : t.' },
        { f: 'Resultat:', z: 59.9, einheit: 'km/h', einheiten: ['km/h', 'm/s', 'km', 'h'], tol: .8, e: 'v = 42.9 km : 0.72 h ≈ 60 km/h.' } ],
        loesung: ['geg.: s = 42.9 km, t = 43 min = 0.72 h', 'ges.: v', 'v = s : t = 42.9 km : 0.72 h', 'v ≈ 60 km/h'] },
      { id: 'gehen', lz: 'r1', lz2: ['d1'], titel: 'Gehen und Rennen', q: 'Du gehst 20 m in 17 s und rennst dieselben 20 m in 4.0 s. Berechne beide Geschwindigkeiten. Wie viel Mal schneller bist du beim Rennen?', schritte: [
        { f: 'Geschwindigkeit beim Gehen:', z: 1.18, einheit: 'm/s', tol: .02, e: 'v = 20 m : 17 s = 1.18 m/s.' },
        { f: 'Geschwindigkeit beim Rennen:', z: 5, einheit: 'm/s', tol: .05, e: 'v = 20 m : 4.0 s = 5.0 m/s.' },
        { f: 'Wie viel Mal schneller?', z: 4.25, einheit: 'Mal', tol: .1, e: '17 s : 4 s = 4.25 oder 5.0 : 1.18 = 4.2. Gut viermal schneller.' } ],
        loesung: ['v_gehen = 20 m : 17 s = 1.18 m/s', 'v_rennen = 20 m : 4.0 s = 5.0 m/s', '17 s : 4 s ≈ 4.3 Mal schneller'] },
      { id: 'streifen', lz: 'd4', lz2: ['r1'], titel: 'Schreibstreifen', q: 'Auf dem Schreibstreifen des Elektrowagens misst du von Punkt 0 bis Punkt 100 eine Strecke von 36 cm. Der Schreiber setzt 50 Punkte pro Sekunde. Wie schnell fuhr der Wagen?', schritte: [
        { f: 'Wie lange dauerte die Fahrt von Punkt 0 bis Punkt 100?', z: 2, einheit: 's', tol: .01, e: '50 Punkte = 1 s, also 100 Punkte = 2 s.' },
        { f: 'Welche Formel brauchst du?', o: ['v = s : t', 's = v · t', 'v = t : s'], e: 'Gesucht ist die Geschwindigkeit: v = s : t.' },
        { f: 'Resultat:', z: 18, einheit: 'cm/s', einheiten: ['cm/s', 'cm', 's', 'm'], tol: .1, e: 'v = 36 cm : 2 s = 18 cm/s.' } ],
        loesung: ['geg.: s = 36 cm, 100 Punkte → t = 2 s', 'ges.: v', 'v = s : t = 36 cm : 2 s', 'v = 18 cm/s'] }
    ]
  },

  /* ---------- Bild-Quiz: selbst gezeichnete Messgeräte ---------- */
  bildquiz: {
    titel: 'Messgeräte erkennen',
    text: 'Vereinfachte Zeichnungen wie auf den Arbeitsblättern. Erkenne die Geräte und überlege, was sie messen.',
    szenen: {
      geraete: { label: 'Messgeräte', svg: '#gmap', hs: '#ghs', hl: '#ghl', wrap: '#wrapGeraete', tippe: 'Tippe auf das Messgerät:', frage: 'Welches Messgerät ist markiert?',
        prio: ['stoppuhr', 'thermometer', 'barometer', 'dezibel', 'metermass', 'voltmeter', 'messzylinder', 'waage', 'hygrometer', 'winkel', 'senkwaage', 'kraft'],
        spots: {
          stoppuhr: { n: 'Stoppuhr', lz: ['m3'], t: 'Die Stoppuhr misst die Zeit, z.B. in Sekunden. Diese hat Zeiger, ist also analog.' },
          thermometer: { n: 'Thermometer', lz: ['m3'], t: 'Das Thermometer misst die Temperatur in °C. Die Flüssigkeit im Röhrchen dehnt sich bei Wärme aus.' },
          barometer: { n: 'Barometer', lz: ['m3'], t: 'Das Barometer misst den Luftdruck. Die Skala zeigt Werte um 1000 mbar (hPa).' },
          dezibel: { n: 'Dezibelmeter', lz: ['m3', 'm4'], t: 'Das Dezibelmeter misst die Lautstärke in dB. Oben ist das Mikrofon, unten das Display: ein digitales Gerät.' },
          metermass: { n: 'Metermass', lz: ['m3'], t: 'Das Metermass misst die Länge, in cm und m.' },
          voltmeter: { n: 'Voltmeter', lz: ['m3', 'm4'], t: 'Das Voltmeter misst die elektrische Spannung in Volt (V). Mit dem Drehschalter wählt man den Messbereich, das Display zeigt den Wert.' },
          messzylinder: { n: 'Messzylinder', lz: ['m3'], t: 'Der Messzylinder misst das Volumen von Flüssigkeiten, in ml.' },
          waage: { n: 'Waage', lz: ['m3', 'm4'], t: 'Die Küchenwaage misst das «Gewicht» (genauer: die Masse) in g. Mit Display: digital.' },
          hygrometer: { n: 'Hygrometer', lz: ['m3'], t: 'Das Hygrometer misst die Luftfeuchtigkeit in Prozent. Es sieht dem Barometer ähnlich, aber die Skala geht von 0 bis 100 %.' },
          winkel: { n: 'Winkelmesser (Geodreieck)', lz: ['m3'], t: 'Mit dem Winkelmesser misst man Winkel in Grad (°).' },
          senkwaage: { n: 'Senkwaage', lz: ['m3'], t: 'Die Senkwaage schwimmt in einer Flüssigkeit und taucht je nach Dichte verschieden tief ein. Sie misst die Dichte.' },
          kraft: { n: 'Kraftmesser', lz: ['m3'], t: 'Der Kraftmesser hat eine Feder, die sich je nach Kraft dehnt. Er misst die Kraft in Newton (N).' }
        } },
      thermometer: { label: 'Thermometer', svg: '#tmap', hs: '#ths', hl: '#thl', wrap: '#wrapThermo', tippe: 'Tippe auf das:', frage: 'Welches Thermometer ist markiert?',
        prio: ['quecksilber', 'alkohol', 'bimetall', 'digital', 'infrarot', 'galilei'],
        spots: {
          quecksilber: { n: 'Quecksilberthermometer', lz: ['m5'], t: 'Silbriges, flüssiges Metall dehnt sich in einer dünnen Glaskapillare aus. Typisch ist das alte Fieberthermometer mit kurzer Skala von etwa 35 bis 42 °C.' },
          alkohol: { n: 'Alkoholthermometer', lz: ['m5'], t: 'Rot gefärbter Alkohol dehnt sich im Röhrchen aus. Er bleibt auch bei Minusgraden flüssig.' },
          bimetall: { n: 'Bimetallthermometer', lz: ['m5'], t: 'Eine Spirale aus zwei verklebten Metallen biegt sich bei Wärme und dreht den Zeiger.' },
          digital: { n: 'Digitalthermometer', lz: ['m5', 'm4'], t: 'Der Messstab leitet umso besser, je heisser er ist. Die Temperatur erscheint als Ziffern.' },
          infrarot: { n: 'Infrarotthermometer', lz: ['m5'], t: 'Misst die unsichtbare Wärmestrahlung, ohne Berührung, z.B. im Ohr.' },
          galilei: { n: 'Galileithermometer', lz: ['m5'], t: 'Glaskugeln mit Plomben sinken oder schwimmen. Abgelesen wird an der untersten oben schwimmenden Kugel.' }
        } },
      uhren: { label: 'Uhren', svg: '#umap', hs: '#uhs', hl: '#uhl', wrap: '#wrapUhren', tippe: 'Tippe auf die:', frage: 'Welche Uhr ist markiert?',
        prio: ['sanduhr', 'sonnenuhr', 'taschenuhr', 'pendeluhr', 'quarzuhr', 'wasseruhr', 'atomuhr'],
        spots: {
          sanduhr: { n: 'Sanduhr', lz: ['m6'], t: 'Sand rinnt gleichmässig durch eine enge Stelle. Ist der obere Teil leer, ist eine bestimmte Zeit vorbei.' },
          sonnenuhr: { n: 'Sonnenuhr', lz: ['m6'], t: 'Der Schatten des Stabs wandert mit dem Sonnenstand. So wurde die Zeit lange bestimmt.' },
          taschenuhr: { n: 'Taschenuhr', lz: ['m6'], t: 'Die mechanische Taschenuhr machte Uhren handlich und erschwinglich. Ihre Feder musste man aufziehen.' },
          pendeluhr: { n: 'Pendeluhr', lz: ['m6'], t: 'Das gleichmässig schwingende Pendel ist der Zeitgeber. Oft war das die Kirchenuhr im Dorf.' },
          quarzuhr: { n: 'Quarzuhr (digital)', lz: ['m6'], t: 'Moderne Quarzuhren laufen mit Batterie und zeigen die Zeit oft digital an.' },
          wasseruhr: { n: 'Wasseruhr', lz: ['m6'], t: 'Wasser läuft gleichmässig aus einem Gefäss. Am Wasserstand liest man ab, wie viel Zeit vergangen ist, z.B. für die Bewässerung.' },
          atomuhr: { n: 'Atomuhr', lz: ['m6'], t: 'Die präzisesten Uhren. Sie weichen in Milliarden Jahren nicht einmal eine Sekunde ab und stecken z.B. in GPS-Satelliten.' }
        } }
    }
  }
};
