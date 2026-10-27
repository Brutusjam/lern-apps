/* Inhalt der Lern-App «Landschaft im Wandel» (Geografie, 2. Gymnasium, Prüfung «Naturphänomene»).
   Nur Daten, keine Logik. Aufbau siehe CLAUDE.md im Hauptordner. */
window.LERNAPP_INHALT = {
  id: 'geografie-naturphaenomene',
  speicher: 'landschaft-im-wandel-v1',
  eyebrow: 'Geografie · 2. Gymnasium · Naturphänomene',
  titel: 'Landschaft <span>im Wandel</span>',
  untertitel: 'Alle vier Themen der Prüfung «Naturphänomene», abgestimmt auf das Geografie-Notizbuch.',
  pruefung: '2026-10-29',

  // Themengebiete mit Lernzielen: [id, Text, [Werkzeuge]]. «bild:eis» öffnet das Bild-Quiz mit der Szene «eis».
  themen: [
  { id: 'nat', name: 'Naturkräfte verändern Landschaften', kurz: 'Naturkräfte', lz: [
    ['n1', '…erklären, welche Naturkräfte auf die Landschaft wirken und wie sie die Landschaft verändern.', ['karten', 'sortieren']],
    ['n2', '…auf Bildern Auswirkungen verschiedener Naturkräfte markieren und benennen.', ['bild:fluss', 'sortieren']],
    ['n3', '…zwischen exogenen und endogenen Prozessen unterscheiden.', ['sortieren', 'karten']],
    ['n4', '…definieren, was mit Verwitterung, Erosion, Transport und Sedimentation gemeint ist.', ['karten', 'sortieren']],
    ['n5', '…verschiedene Verwitterungsarten kurz erklären und in Bildern erkennen.', ['sortieren', 'karten']],
    ['n6', '…verschiedene Landschaftsformen benennen und erklären, welche Naturkräfte und Prozesse diese Landschaften gebildet haben.', ['karten', 'sortieren']] ] },
  { id: 'was', name: 'Wasser formt die Landschaft', lz: [
    ['w1', '…die verschiedenen Landschaftsformen, die durch fliessende Gewässer geschaffen wurden, auf Bildern erkennen sowie benennen und erklären.', ['bild:fluss', 'karten']],
    ['w2', '…Zusammenhänge zwischen Gefälle, Fliessgeschwindigkeit, Erosion und Sedimentation erklären.', ['gefaelle', 'sortieren', 'karten']],
    ['w3', '…beschreiben, wie sich das Gesteinsmaterial von der Quelle zur Mündung verändert.', ['gefaelle', 'sortieren']],
    ['w4', '…erklären, wie Mäander entstehen und in Altwassern resultieren können.', ['maeander', 'bild:fluss', 'sortieren']],
    ['w5', '…wichtige Karstphänomene beschreiben.', ['karten', 'sortieren']],
    ['w6', '…aufzeigen, wie die Gezeiten entstehen und in welchen Zeitabständen sie auftreten.', ['gezeiten', 'karten']],
    ['w7', '…erklären, was mit Spring- und Nipptide gemeint ist.', ['gezeiten', 'sortieren']] ] },
  { id: 'gew', name: 'Naturgewalt Wasser', lz: [
    ['g1', '…zwei Hochwasserereignisse in Uri aufzählen und die am stärksten betroffenen Gebiete kennen (Jahreszahl, Gemeinde).', ['uri', 'karten']],
    ['g2', '…verschiedene Hochwasserschutzmassnahmen (mind. 5) in Uri verorten und beschreiben.', ['uri']] ] },
  { id: 'eis', name: 'Eis formt die Landschaft', lz: [
    ['e1', '…die verschiedenen Landschaftsformen, die durch Gletscher geschaffen wurden, auf Bildern erkennen sowie benennen und erklären.', ['bild:eis', 'karten', 'sortieren']],
    ['e2', '…grob erklären, wie Gletscher entstehen.', ['karten', 'bild:eis']],
    ['e3', '…beschreiben, weshalb die Gletscher weltweit schmelzen und welchen Nutzen für die Menschen dabei verloren gehen können.', ['karten']] ] }
],

  // Auswahlfragen, in Sets gruppiert. Die erste Antwort ist jeweils die richtige.
  // Ein Set erscheint überall, wo im HTML <div class="mcs" id="SETNAME"> steht.
  fragen: {
  mcG: [
    { lz: 'w2', q: 'Ein Bach fliesst aus dem steilen Gebirge in eine flache Talebene. Was passiert?', o: ['Er wird langsamer und lagert Material ab.', 'Er wird schneller und erodiert mehr.', 'Nichts. Die Geschwindigkeit hängt nur von der Wassermenge ab.'], e: 'Weniger Gefälle bedeutet weniger Fliessgeschwindigkeit. Das Wasser kann weniger tragen und lagert ab (z.B. als Schwemmkegel).' },
    { lz: 'w2', q: 'Welches Material bleibt als Erstes liegen, wenn ein Fluss langsamer wird?', o: ['Grosse Blöcke', 'Sand', 'Schlamm und Ton'], e: 'Je schwerer das Material, desto mehr Fliessgeschwindigkeit braucht es für den Transport. Blöcke bleiben zuerst liegen, Schlamm erst ganz am Schluss.' },
    { lz: 'w3', q: 'Wie verändert sich das Gesteinsmaterial von der Quelle zur Mündung?', o: ['Es wird kleiner und runder.', 'Es wird grösser und kantiger.', 'Es bleibt gleich, nur die Menge nimmt zu.'], e: 'Beim Transport schlagen die Steine aneinander und werden abgeschliffen: von kantigen Blöcken über gerundeten Kies zu Sand und Schlamm.' },
    { lz: 'w2', q: 'Wo überwiegt die Tiefenerosion?', o: ['Im Oberlauf mit starkem Gefälle', 'Im Unterlauf mit geringem Gefälle', 'Im See bei der Mündung'], e: 'Im steilen Oberlauf fliesst das Wasser schnell und gräbt sich nach unten ein. So entstehen V-Täler.' }
  ],
  mcU: [
    { lz: 'g1', q: 'In welchem Jahr entstand der «Schattdorfer See»?', o: ['2005', '1987', '1977'], e: 'Am 22./23. August 2005 trat der Schächen über die Ufer und überflutete das Industriegelände in Schattdorf.' },
    { lz: 'g1', q: 'Was löste das Hochwasser von 1987 aus?', o: ['Ein schweres Unwetter über dem Gotthardmassiv in der Nacht vom 24./25. August', 'Ein Sturm über dem Urnersee', 'Die Schneeschmelze im Frühling'], e: 'Danach war die Gotthardroute wochenlang gesperrt. Überflutet war das Gebiet von Flüelen bis Attinghausen.' },
    { lz: 'g1', q: 'Welcher Bach trat 1977 und 2005 über die Ufer?', o: ['Der Schächen', 'Der Palanggenbach', 'Der Giessen'], e: 'Der Schächen kommt aus dem Schächental und mündet bei Schattdorf/Attinghausen in die Reuss.' },
    { lz: 'g1', q: 'Wo floss 1977 der Kummetbach noch Tage später durchs Dorf?', o: ['In Attinghausen', 'In Flüelen', 'In Bürglen'], e: 'So steht es in den Folien zum Hochwasser 1977.' },
    { lz: 'g1', q: 'Was zeigte das Hochwasser 2020?', o: ['Die Schutzmassnahmen wirken: Die Reuss wurde kontrolliert in den Urnersee geleitet.', 'Die Schäden waren grösser als 1987.', 'Der Schächen überflutete erneut Schattdorf.'], e: 'Statt grosser Schäden wie 1987 gab es nur Aufräumarbeiten.' },
    { lz: 'g2', q: 'Was passiert bei der «Entlastung Autobahn»?', o: ['Wasser fliesst kontrolliert über den Reussdamm auf die A2 und Richtung Urnersee.', 'Die Autobahn wird mit einer Mauer erhöht, damit sie trocken bleibt.', 'Das Wasser wird in einen Tunnel unter der Autobahn gepumpt.'], e: 'Eine Hochwasserschutzmauer auf der anderen Seite der A2 hält das Wasser zurück.' },
    { lz: 'g2', q: 'Wozu dient der Stiglissammler in Bürglen?', o: ['Er hält Geschiebe (Steine und Sand) des Schächens zurück.', 'Er sammelt Regenwasser als Trinkwasser.', 'Er misst den Wasserstand der Reuss.'], e: 'Er bietet Platz für mindestens 10 000 Lastwagenladungen Geschiebe.' },
    { lz: 'g2', q: 'Was zeigt die rote Markierung bei der Station Swissli?', o: ['Ab diesem Wasserstand fliesst Wasser auf die Autobahn.', 'Ab diesem Wasserstand wird die Autobahn gesperrt.', 'Den normalen Wasserstand der Reuss.'], e: 'Grün: Die Autobahn wird gesperrt. Rot: Das Wasser beginnt auf die Autobahn zu fliessen.' }
  ],
  mcT: [
    { lz: 'w6', q: 'Wie lange dauert es ungefähr von einer Flut bis zur nächsten?', o: ['12 Stunden 25 Minuten', '24 Stunden', '6 Stunden', '28 Tage'], e: 'Zwei Flutberge, und der Mond wandert weiter: Deshalb etwa 12 h 25 min. Von Flut zu Ebbe sind es rund 6 h.' },
    { lz: 'w6', q: 'Warum gibt es auf der Erde zwei Flutberge?', o: ['Auf der Mondseite zieht der Mond das Wasser an, auf der Gegenseite überwiegt die Fliehkraft.', 'Weil Sonne und Mond immer auf gegenüberliegenden Seiten stehen.', 'Weil die Ozeane auf beiden Seiten der Erde gleich tief sind.'], e: 'Anziehungskraft des Mondes auf der zugewandten Seite, Fliehkraft auf der abgewandten Seite.' },
    { lz: 'w7', q: 'Bei welcher Mondphase gibt es eine Springtide?', o: ['Bei Vollmond und bei Neumond', 'Nur bei Vollmond', 'Bei Halbmond'], e: 'Bei Voll- und Neumond stehen Sonne, Erde und Mond in einer Linie. Ihre Kräfte addieren sich.' },
    { lz: 'w7', q: 'Was ist eine Nipptide?', o: ['Eine Tide mit besonders kleinem Tidenhub, wenn Sonne und Mond im rechten Winkel zur Erde stehen', 'Eine besonders hohe Flut bei Sturm', 'Die Ebbe direkt nach einer Springtide'], e: 'Bei Halbmond wirken Sonne und Mond in verschiedene Richtungen. Sie schwächen sich teilweise ab, der Tidenhub ist klein.' }
  ]
},

  // Karteikarten. g = Gruppe für den Filter.
  karten: [
  { id: 'c1', lz: 'w2', g: 'fluss', q: 'Was bedeutet Erosion?', a: 'Abtragung von Gestein und Boden durch Wasser, Eis oder Wind. Beim Fluss: Je schneller das Wasser, desto stärker die Erosion.' },
  { id: 'c2', lz: 'w2', g: 'fluss', q: 'Was bedeutet Sedimentation?', a: 'Ablagerung von Material. Sie geschieht, wenn das Wasser langsamer wird und die Fracht nicht mehr tragen kann.' },
  { id: 'c3', lz: 'w2', g: 'fluss', q: 'Wie hängen Gefälle und Fliessgeschwindigkeit zusammen?', a: 'Je steiler das Gefälle, desto schneller fliesst das Wasser und desto mehr und gröberes Material kann es erodieren und transportieren.' },
  { id: 'c4b', lz: 'w1', g: 'fluss', q: 'Klamm oder Kerbtal: Was ist der Unterschied?', a: 'Beide entstehen durch Tiefenerosion. Die Klamm ist sehr eng mit fast senkrechten Wänden (hartes Gestein). Das Kerbtal (V-Tal) hat schräge Hänge, weil Material nachrutscht.' },
  { id: 'c4', lz: 'w1', g: 'fluss', q: 'Wie entsteht ein V-Tal (Kerbtal)?', a: 'Im steilen Oberlauf überwiegt die Tiefenerosion. Der Fluss schneidet sich ein, die Hänge rutschen nach. Querschnitt wie ein V.' },
  { id: 'c5', lz: 'w4', g: 'fluss', q: 'Was ist ein Prallhang?', a: 'Die Aussenseite einer Flusskurve. Das Wasser fliesst schnell und erodiert, das Ufer wird steil.' },
  { id: 'c6', lz: 'w4', g: 'fluss', q: 'Was ist ein Gleithang?', a: 'Die Innenseite einer Flusskurve. Das Wasser fliesst langsam und lagert Sand und Kies ab, das Ufer ist flach (Kiesbank).' },
  { id: 'c7', lz: 'w4', g: 'fluss', q: 'Wie entsteht ein Altwasser (Altarm)?', a: 'Die Mäanderschlinge wird immer enger, bis der Fluss den schmalen Mäanderhals durchbricht (oft bei Hochwasser). Die abgetrennte Schlinge bleibt als stehendes Gewässer zurück.' },
  { id: 'c8', lz: 'w1', g: 'fluss', q: 'Was ist ein Delta?', a: 'Ablagerungsfläche an der Mündung in einen See oder ins Meer. Der Fluss wird fast still, lagert seine Fracht ab und teilt sich in mehrere Arme. Beispiel: Reussdelta im Urnersee.' },
  { id: 'c9', lz: 'w1', g: 'fluss', q: 'Was ist ein Schwemmkegel?', a: 'Ein steiler Seitenbach tritt ins flache Haupttal, wird plötzlich langsamer und lagert sein Geröll fächerförmig ab.' },
  { id: 'c10', lz: 'w3', g: 'fluss', q: 'Wie verändert sich das Gestein von der Quelle zur Mündung?', a: 'Es wird kleiner und runder: kantige Blöcke → gerundeter Kies → Sand → Schlamm. Grund: Abrieb beim Transport.' },
  { id: 'c11', lz: 'w5', g: 'karst', q: 'Was braucht es, damit Karst entsteht?', a: 'Kalkgestein und Wasser. Regenwasser mit Kohlensäure löst den Kalk auf (Lösungsverwitterung).' },
  { id: 'c12', lz: 'w5', g: 'karst', q: 'Was sind Karren (Schratten)?', a: 'Rinnen und scharfe Grate im nackten Kalkfels, vom Regenwasser herausgelöst.' },
  { id: 'c13', lz: 'w5', g: 'karst', q: 'Was ist eine Doline?', a: 'Ein trichterförmiges Einsturzloch an der Erdoberfläche, als Mulde zu erkennen. Entsteht, wenn der Kalk darunter gelöst wird oder eine Höhlendecke einbricht.' },
  { id: 'c13b', lz: 'w5', g: 'karst', q: 'Was ist eine Polje?', a: 'Eine sehr grosse Senke in der Karstlandschaft mit flachem Boden.' },
  { id: 'c13c', lz: 'w5', g: 'karst', q: 'Was ist Kalktuff?', a: 'Löchriges Kalkgestein, das an Bächen oder kleineren Wasserfällen entsteht. Dort scheidet das Wasser gelösten Kalk wieder aus.' },
  { id: 'c13d', lz: 'w5', g: 'karst', q: 'Wie löst Wasser Kalk? (chemisch)', a: 'Wasser + Kohlendioxid → Kohlensäure (H₂O + CO₂ → H₂CO₃). Kohlensäure + Kalk → gelöstes Kalzium und Hydrogenkarbonat (H₂CO₃ + CaCO₃ → Ca²⁺ + 2 HCO₃⁻).' },
  { id: 'c13e', lz: 'w5', g: 'karst', q: 'Welche Formen findet man in einer Karsthöhle?', a: 'Stalaktiten, Stalagmiten, Säulen (Stalaktit und Stalagmit zusammengewachsen), Sintervorhänge, Sinterbecken und unterirdische Seen.' },
  { id: 'c14', lz: 'w5', g: 'karst', q: 'Stalaktit oder Stalagmit: Was hängt, was steht?', a: 'Stalaktit hängt von der Decke (t wie «tropft runter»), Stalagmit wächst vom Boden nach oben (m wie «mag hoch»).' },
  { id: 'c15', lz: 'w5', g: 'karst', q: 'Was ist ein Trockental?', a: 'Ein Tal, das kein ständig fliessendes Oberflächenwasser mehr führt. Das Wasser versickert im Kalk und fliesst unterirdisch weiter.' },
  { id: 'c16', lz: 'w6', g: 'gezeiten', q: 'Wie entstehen Ebbe und Flut?', a: 'Die Anziehungskraft des Mondes (und der Sonne) und die Fliehkraft bilden zwei Flutberge. Die Erde dreht sich darunter hindurch.' },
  { id: 'c17', lz: 'w6', g: 'gezeiten', q: 'In welchen Zeitabständen kommt die Flut?', a: 'Etwa alle 12 h 25 min, also zweimal pro Tag. Von Flut zu Ebbe rund 6 h 12 min.' },
  { id: 'c18', lz: 'w7', g: 'gezeiten', q: 'Was ist eine Springtide?', a: 'Besonders grosser Tidenhub bei Voll- und Neumond: Sonne, Erde und Mond stehen in einer Linie, die Kräfte addieren sich.' },
  { id: 'c19', lz: 'w7', g: 'gezeiten', q: 'Was ist eine Nipptide?', a: 'Besonders kleiner Tidenhub bei Halbmond: Sonne und Mond stehen im rechten Winkel zur Erde und schwächen sich ab.' },
  { id: 'c20', lz: 'w7', g: 'gezeiten', q: 'Was versteht man unter dem Tidenhub?', a: 'Den Höhenunterschied des Wasserstands zwischen Flut (Hochwasser) und Ebbe (Niedrigwasser).' },
  { id: 'k1', lz: 'n3', g: 'kraefte', q: 'Was ist der Unterschied zwischen exogenen und endogenen Kräften?', a: 'Exogen: Kräfte auf der Erdoberfläche (Wind, Wasser, Eis, Temperaturunterschiede, Sonne). Endogen: Kräfte aus dem Erdinnern (Erdbeben, Vulkanausbruch, Gebirgsbildung, Brechen der Erdkruste).' },
  { id: 'k2', lz: 'n4', g: 'kraefte', q: 'Wie lautet die Prozesskette?', a: '1) Verwitterung → 2) Erosion (Abtragung) → 3) Transport → 4) Ablagerung (Akkumulation, Sedimentation).' },
  { id: 'k3', lz: 'n4', g: 'kraefte', q: 'Was bedeutet Verwitterung?', a: 'Gestein wird durch Regen, Frost und/oder Sonneneinstrahlung in kleinere Bestandteile aufgelöst oder zerfällt. Voraussetzung: Das Gestein hat Klüfte oder Risse.' },
  { id: 'k4', lz: 'n4', g: 'kraefte', q: 'Was bedeuten Transport und Akkumulation?', a: 'Transport: Wasser, Eis oder Wind tragen das abgetragene Material weg. Akkumulation (Sedimentation): Das Material wird wieder abgelagert.' },
  { id: 'k5', lz: 'n5', g: 'kraefte', q: 'Wie funktioniert Temperaturverwitterung?', a: 'Hohe Temperaturunterschiede (Tag/Nacht) verursachen Spannungen im Gestein, und es platzt auseinander.' },
  { id: 'k6', lz: 'n5', g: 'kraefte', q: 'Wie funktioniert Frostsprengung?', a: 'Wasser dringt in Risse, gefriert und dehnt sich aus. Dadurch wird das Gestein gesprengt. Beispiel: Schlaglöcher im Asphalt im Winter.' },
  { id: 'k7', lz: 'n5', g: 'kraefte', q: 'Wie funktioniert Salzsprengung?', a: 'Konzentrierte Salzlösungen dringen ins Gestein ein. Wachsende Salzkristalle sprengen es.' },
  { id: 'k8', lz: 'n5', g: 'kraefte', q: 'Was ist chemische Verwitterung? Nenne Beispiele.', a: 'Gestein wird durch Wasser und darin gelöste Stoffe aufgelöst: Kohlensäure löst Kalk (Höhlen, Karren, Dolinen, Tropfsteine), Rauchgasverwitterung durch Schwefeldioxid aus Fabriken, Hydratation von Salzgestein.' },
  { id: 'k9', lz: 'n5', g: 'kraefte', q: 'Was ist biologische Verwitterung?', a: 'Lebewesen zerkleinern Gestein: Wurzeln dringen in Risse und sprengen sie (auch Asphalt). Weitere Ursachen: Pilze, Flechten, Algen, Moose, Mikroorganismen.' },
  { id: 'k10', lz: 'n5', g: 'kraefte', q: 'Welche Verwitterung verursacht der Mensch?', a: 'Zum Beispiel Rauchgasverwitterung oder Kohlensäureverwitterung.' },
  { id: 'k11', lz: 'n1', g: 'kraefte', q: 'Welche Kräfte verändern Landschaften?', a: 'Wind, Wasser, Eis und Temperaturunterschiede an der Oberfläche (exogen), Erdbeben, Vulkanausbrüche, Gebirgsbildung und das Brechen der Erdkruste aus dem Innern (endogen) und der Mensch.' },
  { id: 'k12', lz: 'n6', g: 'kraefte', q: 'Wie entsteht eine Caldera?', a: 'Ein Vulkan bricht ein, weil seine Magmakammer leer ist. Im Kessel bildet sich oft ein Kratersee aus Regenwasser.' },
  { id: 'k13', lz: 'n6', g: 'kraefte', q: 'Wie entsteht eine Wanderdüne?', a: 'Der Wind transportiert Sand und häuft ihn an. Auf der Luvseite (dem Wind zugewandt) wird Sand hochgeweht, auf der Leeseite rutscht er ab. So wandert die Düne.' },
  { id: 'k14', lz: 'n6', g: 'kraefte', q: 'Wie entstehen Türme wie im Bryce Canyon?', a: 'Härtere Gesteinsschichten oben schützen die weicheren Schichten darunter vor dem Wegschwemmen durch Regenwasser. So bleiben Türme stehen.' },
  { id: 'g1', lz: 'g1', g: 'uri', q: 'Hochwasser 1977 in Uri: Was geschah?', a: '31. Juli 1977: Der Schächen verliess sein Bett, die Hallen der damaligen Munitionsfabrik standen meterhoch im Wasser. In Attinghausen floss der Kummetbach noch Tage später durchs Dorf. Schaden: 200 Mio. Franken.' },
  { id: 'g2', lz: 'g1', g: 'uri', q: 'Hochwasser 1987 in Uri: Was geschah?', a: '24./25. August 1987: Unwetter über dem Gotthardmassiv. Überflutet von Flüelen bis Attinghausen, Gotthardroute wochenlang gesperrt, über 900 Nutztiere ertranken. Schaden: 500 Mio. Franken. Danach: ökologischer Hochwasserschutz.' },
  { id: 'g3', lz: 'g1', g: 'uri', q: 'Hochwasser 2005 in Uri: Was geschah?', a: '22./23. August 2005: Nach 40 Stunden Regen trat der Schächen über die Ufer und überflutete das Industriegelände in Schattdorf («Schattdorfer See», beim Tellpark bis 2,50 m). Rund 200 Betriebe betroffen. Schaden: 365 Mio. Franken.' },
  { id: 'g4', lz: 'g1', g: 'uri', q: 'Was zeigte das Hochwasser 2020?', a: 'Die Schutzmassnahmen wirkten: Die Reuss wurde kontrolliert über die Ufer gelenkt und in den Urnersee geführt. Es gab nur Aufräumarbeiten.' },
  { id: 'g5', lz: 'g2', g: 'uri', q: 'Wie funktioniert die Entlastung über die Autobahn?', a: 'Bei extremem Hochwasser fliesst Wasser kontrolliert über eine Entlastungsanlage im Reussdamm auf die A2. Eine Hochwasserschutzmauer hält es dort zurück, und es fliesst Richtung Urnersee ab.' },
  { id: 'g6', lz: 'g2', g: 'uri', q: 'Was ist der Stiglissammler?', a: 'Ein Geschiebesammler am Schächen bei Bürglen. Er hält Steine und Sand zurück (Platz für mind. 10 000 Lastwagenladungen). Nach 2005 wurde ein verschliessbares Schütz eingebaut.' },
  { id: 'g7', lz: 'g2', g: 'uri', q: 'Nenne fünf Hochwasserschutzmassnahmen in Uri.', a: 'Zum Beispiel: Schutzmauer Industriegebiet Schattdorf, Notentlastungskanal, Torverschluss Stille Reuss, Entlastung Autobahn, Kaskaden am Reussdamm, Stiglissammler in Bürglen.' },
  { id: 'e1', lz: 'e2', g: 'eis', q: 'Wie entsteht ein Gletscher?', a: 'Wo es kalt ist und viel Niederschlag fällt, bleibt Schnee länger als ein Jahr liegen. Unter dem Druck neuer Schichten wird er zu Firn und schliesslich zu Gletschereis umgewandelt.' },
  { id: 'e2', lz: 'e2', g: 'eis', q: 'Was macht ein Gletscher, wenn er fliesst?', a: 'Das Eis bewegt sich langsam talabwärts. Dabei schürft es den Untergrund ab und transportiert Gesteinsmaterial.' },
  { id: 'e3', lz: 'e1', g: 'eis', q: 'Was ist eine Moräne?', a: 'Vom Gletscher abgelagerter Schutt: vor dem Gletscher (Endmoräne), am Rand (Seitenmoräne) oder zwischen zwei Gletscherströmen (Mittelmoräne).' },
  { id: 'e4', lz: 'e1', g: 'eis', q: 'Was ist ein U-Tal (Trogtal)?', a: 'Ein Tal, das der Gletscher U-förmig ausgeschürft hat: flacher Boden, steile Wände. Flüsse formen dagegen V-Täler.' },
  { id: 'e5', lz: 'e1', g: 'eis', q: 'Was sind Rundhöcker?', a: 'Durch den Gletscher rund geschliffene Felsbuckel.' },
  { id: 'e6', lz: 'e1', g: 'eis', q: 'Was ist die Gletscherzunge?', a: 'Das untere Ende des Gletschers, wo das Eis aufhört. Hier fliesst das Schmelzwasser ab.' },
  { id: 'e7', lz: 'e1', g: 'eis', q: 'Was ist ein Findling?', a: 'Ein grosser Felsblock, den ein Gletscher weit transportiert und liegen gelassen hat. Er passt nicht zum Gestein seiner Umgebung.' },
  { id: 'e8', lz: 'e1', g: 'eis', q: 'Was ist ein Fjord?', a: 'Ein Trogtal, das ins Meer hineinragt und mit Meerwasser gefüllt ist (typisch für Norwegen).' },
  { id: 'e9', lz: 'e1', g: 'eis', q: 'Wo entstehen Längsspalten im Gletscher?', a: 'Dort, wo der Gletscher seitlich Platz hat und auseinanderfliesst. Die Spalten verlaufen längs zum Gletscher.' },
  { id: 'e10', lz: 'e1', g: 'eis', q: 'Was ist eine Eiszeit?', a: 'Eine Zeit, in der das Klima kälter war und sich die Eismassen weit ausdehnten. Auch das Schweizer Mittelland war damals vergletschert.' },
  { id: 'e11', lz: 'e1', g: 'eis', q: 'Wie entsteht ein Gletschersee?', a: 'Das Gletschereis hat eine Mulde ausgeschürft. Wenn sich der Gletscher zurückzieht, füllt sie sich mit Schmelzwasser.' },
  { id: 'e12', lz: 'e3', g: 'eis', q: 'Warum schmelzen die Gletscher weltweit?', a: 'Wegen des Klimawandels: Die Sommer sind wärmer und im Winter fällt weniger Schnee. Es schmilzt mehr Eis, als neu gebildet wird.' },
  { id: 'e13', lz: 'e3', g: 'eis', q: 'Welchen Nutzen verlieren wir, wenn Gletscher verschwinden?', a: 'Gletscher sind grosse Süsswasserspeicher. Im Sommer liefern sie Schmelzwasser für Trinkwasser, Landwirtschaft und Stromproduktion. Dazu kommen Tourismus und Kies aus Moränen.' },
  { id: 'e14', lz: 'e3', g: 'eis', q: 'Welche Gefahren bringt die Gletscherschmelze?', a: 'Zum Beispiel Flutwellen durch plötzlichen Wasseranstieg, wenn sich ein Gletschersee entleert.' }
],
  kartenGruppen: { kraefte: 'Naturkräfte', fluss: 'Fluss', karst: 'Karst', gezeiten: 'Gezeiten', uri: 'Hochwasser Uri', eis: 'Gletscher' },

  // Sortierspiele: items = [Begriff, Index des richtigen Felds, optional eigenes Lernziel]
  sortieren: {
  prozess: { label: 'Prozesskette', title: 'Verwitterung, Erosion, Transport oder Ablagerung?', lz: 'n4', bins: ['Verwitterung', 'Erosion', 'Transport', 'Ablagerung'], items: [
    ['Fels zerfällt an Ort und Stelle in Stücke', 0], ['Frost sprengt einen Stein', 0], ['Wurzeln sprengen Risse im Gestein', 0, 'n5'],
    ['Der Bach reisst Material vom Ufer weg', 1], ['Abtragung', 1], ['Ein Gletscher schürft den Talboden ab', 1],
    ['Der Fluss trägt Kies talabwärts', 2], ['Wind weht Sand durch die Wüste', 2],
    ['Ein Delta wächst in den See', 3], ['Akkumulation', 3], ['Sedimentation', 3], ['Ein Gletscher hinterlässt eine Moräne', 3] ] },
  exo: { label: 'Exogen / endogen', title: 'Exogen (Oberfläche) oder endogen (Erdinneres)?', lz: 'n3', bins: ['exogen', 'endogen'], items: [
    ['Wind', 0], ['fliessendes Wasser', 0], ['Gletschereis', 0], ['Temperaturunterschiede', 0], ['Niederschlag', 0], ['Wirbelsturm', 0],
    ['Erdbeben', 1], ['Vulkanausbruch', 1], ['Gebirgsbildung', 1], ['Magmakammer', 1], ['Brechen der Erdkruste', 1], ['Gesteinsveränderung (Metamorphose)', 1] ] },
  verw: { label: 'Verwitterungsarten', title: 'Physikalisch, chemisch oder biologisch?', lz: 'n5', bins: ['physikalisch', 'chemisch', 'biologisch'], items: [
    ['Temperaturverwitterung', 0], ['Frostsprengung', 0], ['Salzsprengung', 0], ['Schlaglöcher im Winter', 0],
    ['Kohlensäure löst Kalk', 1], ['Rauchgasverwitterung', 1], ['Hydratation von Salzgestein', 1], ['Tropfsteine entstehen', 1],
    ['Baumwurzeln heben Asphalt an', 2], ['Flechten und Moose', 2], ['Pilze und Algen', 2] ] },
  lauf: { label: 'Flussabschnitte', title: 'Oberlauf, Mittellauf oder Unterlauf?', lz: 'w2', bins: ['Oberlauf', 'Mittellauf', 'Unterlauf'], items: [
    ['starkes Gefälle', 0], ['Tiefenerosion überwiegt', 0], ['V-Tal', 0], ['grosse, kantige Blöcke', 0, 'w3'], ['Wasserfälle', 0],
    ['mittleres Gefälle', 1], ['Seitenerosion an den Kurven', 1], ['gerundeter Kies', 1, 'w3'], ['Erosion und Ablagerung halten sich etwa die Waage', 1],
    ['geringes Gefälle', 2], ['Sedimentation überwiegt', 2], ['feiner Sand und Schlamm', 2, 'w3'], ['breite Schwemmebene', 2], ['Delta', 2] ] },
  hang: { label: 'Prall- und Gleithang', title: 'Prallhang oder Gleithang?', lz: 'w4', bins: ['Prallhang', 'Gleithang'], items: [
    ['Aussenseite der Kurve', 0], ['schnelle Strömung', 0], ['Erosion', 0], ['steiles Ufer', 0],
    ['Innenseite der Kurve', 1], ['langsame Strömung', 1], ['Ablagerung von Sand und Kies', 1], ['flaches Ufer mit Kiesbank', 1] ] },
  karst: { label: 'Karst', title: 'Karst: an der Oberfläche oder in der Höhle?', lz: 'w5', bins: ['an der Oberfläche', 'in der Höhle'], items: [
    ['Karren', 0], ['Doline', 0], ['Polje', 0], ['Trockental', 0], ['Kalktuff', 0],
    ['Stalaktit', 1], ['Stalagmit', 1], ['Säule', 1], ['Sintervorhang', 1], ['Sinterbecken', 1], ['unterirdischer See', 1] ] },
  tide: { label: 'Spring- und Nipptide', title: 'Springtide oder Nipptide?', lz: 'w7', bins: ['Springtide', 'Nipptide'], items: [
    ['Vollmond', 0], ['Neumond', 0], ['Sonne, Erde und Mond in einer Linie', 0], ['besonders grosser Tidenhub', 0],
    ['Halbmond', 1], ['Sonne und Mond im rechten Winkel zur Erde', 1], ['besonders kleiner Tidenhub', 1] ] },
  fe: { label: 'Fluss oder Gletscher', title: 'Hat ein Fluss oder ein Gletscher diese Form geschaffen?', lz: 'e1', bins: ['Fluss', 'Gletscher'], items: [
    ['V-Tal', 0, 'w1'], ['Mäander', 0, 'w1'], ['Delta', 0, 'w1'], ['Schwemmkegel', 0, 'w1'], ['Altwasser', 0, 'w4'], ['Klamm', 0, 'w1'],
    ['U-Tal (Trogtal)', 1], ['Moräne', 1], ['Rundhöcker', 1], ['Findling', 1], ['Fjord', 1], ['Gletschersee', 1] ] },
  wo: { label: 'Wer war es?', title: 'Welche Kraft hat diese Landschaft gebildet?', lz: 'n6', bins: ['Wasser', 'Eis', 'Wind', 'Feuer (Vulkan)'], items: [
    ['Caldera mit Kratersee', 3], ['Vulkankegel', 3], ['Wanderdüne', 2], ['Windschliff an Felsen', 2, 'n1'],
    ['U-Tal mit Gletschersee', 1], ['Moräne', 1], ['Türme aus weichem Gestein (Bryce Canyon)', 0], ['Flussdelta', 0], ['Wasserfall', 0] ] }
},

  // Erklär-Aufgaben mit Checkliste. k = Stichworte für die automatische Erkennung (Umlaute egal), min = nötiger Anteil.
  erklaeren: [
  { lz: 'n1', q: 'Erkläre, welche Naturkräfte auf die Landschaft wirken und wie sie die Landschaft verändern. Nenne Beispiele.', pts: [
    { t: 'Kräfte von aussen (exogen), z.B. Wind, Wasser, Eis, Temperatur', k: ['wind', 'wasser', 'eis', 'gletscher', 'temperatur', 'frost'] },
    { t: 'Kräfte aus dem Erdinnern (endogen), z.B. Erdbeben, Vulkane, Gebirgsbildung', k: ['erdbeben', 'vulkan', 'gebirgsbildung', 'magma', 'erdinner'] },
    { t: 'Sie tragen Gestein ab (Verwitterung, Erosion)', k: ['abtrag', 'erosion', 'erodier', 'verwitter', 'zerklein', 'zerstoer'] },
    { t: 'Sie lagern Material ab oder bauen neue Formen auf', k: ['ablager', 'abgelagert', 'sediment', 'akkumul', 'aufbau', 'heben', 'hebt'] } ],
    a: 'Exogene Kräfte wie Wind, fliessendes Wasser, Gletschereis und Temperaturunterschiede wirken von aussen auf die Erdoberfläche. Sie verwittern und tragen Gestein ab (Erosion), transportieren es und lagern es anderswo ab, z.B. als Delta oder Moräne. Endogene Kräfte aus dem Erdinnern wie Erdbeben, Vulkanismus und Gebirgsbildung heben Gebirge, bauen Vulkane auf oder lassen sie einstürzen (Caldera).' },
  { lz: 'n3', min: .75, q: 'Was ist der Unterschied zwischen exogenen und endogenen Prozessen? Nenne je zwei Beispiele.', pts: [
    { t: 'Exogen: wirkt an der Erdoberfläche, von aussen', k: ['oberflaeche', 'aussen'] },
    { t: 'Endogen: wirkt aus dem Erdinnern', k: ['erdinner', 'innern', 'inneren', 'innen'] },
    { t: 'Zwei exogene Beispiele (z.B. Wind, Wasser, Eis, Frost)', k: ['wind', 'wasser', 'eis', 'gletscher', 'frost', 'temperatur', 'niederschlag', 'regen'] },
    { t: 'Zwei endogene Beispiele (z.B. Erdbeben, Vulkan, Gebirgsbildung)', k: ['erdbeben', 'vulkan', 'gebirgsbildung', 'magma'] } ],
    a: 'Exogene Prozesse wirken an der Erdoberfläche, angetrieben von Sonne und Schwerkraft: z.B. Wind, fliessendes Wasser, Gletscher, Frost. Endogene Prozesse haben ihre Ursache im Erdinnern: z.B. Erdbeben, Vulkanausbrüche und Gebirgsbildung.' },
  { lz: 'n4', q: 'Definiere Verwitterung, Erosion, Transport und Sedimentation. In welcher Reihenfolge laufen sie ab?', pts: [
    { t: 'Verwitterung: Gestein wird an Ort und Stelle gelockert, zerkleinert oder aufgelöst', k: ['zerfaell', 'zerfall', 'zerklein', 'gelockert', 'lockert', 'aufgeloest', 'aufloes', 'broeckel', 'zersetz'] },
    { t: 'Erosion: Material wird abgetragen', k: ['abgetragen', 'abtrag', 'weggeschwemmt', 'abgeschwemmt', 'weggespuelt'] },
    { t: 'Transport: Wasser, Eis oder Wind tragen das Material weg', k: ['transportiert', 'mitgenommen', 'weggetragen', 'befoerdert', 'getragen', 'mitgefuehrt', 'mitgerissen'] },
    { t: 'Sedimentation: Material wird abgelagert, wenn das Transportmittel langsamer wird', k: ['abgelagert', 'ablager', 'absinkt', 'liegen bleibt', 'bleibt liegen', 'akkumul'] },
    { t: 'Reihenfolge: Verwitterung → Erosion → Transport → Sedimentation', k: ['reihenfolge', 'zuerst', 'danach', '->', '→'] } ],
    a: 'Verwitterung: Gestein wird durch Regen, Frost oder Sonne an Ort und Stelle gelockert, zerkleinert oder aufgelöst. Erosion: Das Material wird abgetragen. Transport: Wasser, Eis oder Wind tragen es weg. Sedimentation (Ablagerung, Akkumulation): Wird das Transportmittel langsamer, bleibt das Material liegen. Reihenfolge: Verwitterung → Erosion → Transport → Sedimentation.' },
  { lz: 'n5', min: .5, q: 'Erkläre zwei Verwitterungsarten genau und nenne je ein Beispiel.', pts: [
    { t: 'Physikalisch: Frost, Temperatur oder Salz sprengen das Gestein', k: ['frost', 'temperatur', 'salz', 'sprengung', 'gefrier', 'dehnt'] },
    { t: 'Chemisch: Wasser mit Kohlensäure oder Schadstoffen löst Gestein auf', k: ['kohlensaeure', 'loest', 'loesung', 'chemisch', 'rauchgas', 'saeure', 'hydrat'] },
    { t: 'Biologisch: Wurzeln, Flechten, Moose oder Pilze zerkleinern Gestein', k: ['wurzel', 'pflanz', 'flechte', 'moos', 'pilz', 'alge', 'biolog'] },
    { t: 'Passende Beispiele (z.B. Schlaglöcher, Höhlen, Wurzeln im Asphalt)', k: ['schlagloch', 'asphalt', 'hoehle', 'karren', 'doline', 'tropfstein', 'beispiel', 'z.b'] } ],
    a: 'Physikalische Verwitterung, z.B. Frostsprengung: Wasser dringt in Risse, gefriert und dehnt sich aus. Das Gestein wird gesprengt (Schlaglöcher im Winter). Chemische Verwitterung: Regenwasser mit Kohlensäure löst Kalk auf. So entstehen Karren, Dolinen und Höhlen. Biologische Verwitterung: Wurzeln dringen in Risse und sprengen Gestein oder Asphalt.' },
  { lz: 'n6', q: 'Wie entsteht eine Caldera mit Kratersee?', pts: [
    { t: 'Ein Vulkan bricht aus', k: ['vulkan', 'ausbruch'] },
    { t: 'Die Magmakammer darunter wird leer', k: ['magmakammer', 'magma', 'leer'] },
    { t: 'Der Vulkan bricht ein', k: ['einstuerz', 'eingestuerzt', 'einbr', 'eingebrochen', 'zusammenbr', 'zusammengebrochen', 'sackt'] },
    { t: 'Regenwasser füllt den Kessel zu einem See', k: ['regen', 'see', 'gefuellt', 'fuellt'] } ],
    a: 'Bei einem Vulkanausbruch leert sich die Magmakammer. Der Vulkan verliert seinen Halt und bricht in sich zusammen. Es entsteht ein grosser Kessel (Caldera), der sich mit Regenwasser zu einem Kratersee füllen kann.' },
  { lz: 'n6', q: 'Wie entsteht eine Wanderdüne?', pts: [
    { t: 'Der Wind transportiert Sand', k: ['wind'] },
    { t: 'Der Sand wird angehäuft', k: ['haeuft', 'angehaeuft', 'abgelagert', 'ablager', 'huegel'] },
    { t: 'Luv: Sand wird hinaufgeweht, Lee: Sand rutscht ab', k: ['luv', 'lee', 'rutscht', 'kamm'] },
    { t: 'So wandert die Düne in Windrichtung', k: ['wander', 'bewegt', 'verschieb', 'windrichtung'] } ],
    a: 'Der Wind transportiert Sand und häuft ihn an. Auf der dem Wind zugewandten Seite (Luv) wird Sand hinaufgeweht, auf der Leeseite rutscht er hinunter. So verschiebt sich die Düne langsam in Windrichtung.' },
  { lz: 'w1', q: 'Erkläre, wie ein Delta entsteht.', pts: [
    { t: 'Der Fluss mündet in einen See oder ins Meer', k: ['muendet', 'muendung', 'see', 'meer'] },
    { t: 'Das Wasser wird fast still, die Fliessgeschwindigkeit sinkt', k: ['langsam', 'still', 'geschwindigkeit', 'bremst'] },
    { t: 'Sand und Schlamm werden abgelagert', k: ['ablager', 'abgelagert', 'sediment', 'sand', 'schlamm'] },
    { t: 'Der Fluss teilt sich in mehrere Arme', k: ['arme', 'verzweig', 'teilt', 'aufgeteilt'] } ],
    a: 'Wo ein Fluss in einen See oder ins Meer mündet, wird er fast still. Er verliert seine Transportkraft und lagert Sand und Schlamm ab. Die Ablagerungen wachsen in den See hinaus, und der Fluss teilt sich in mehrere Arme. Beispiel: Reussdelta im Urnersee.' },
  { lz: 'w1', q: 'Wie entsteht ein Schwemmkegel?', pts: [
    { t: 'Ein steiler Seitenbach…', k: ['seitenbach', 'bach', 'steil'] },
    { t: '…erreicht das flache Haupttal', k: ['flach', 'haupttal', 'gefaelle', 'ebene'] },
    { t: 'Er wird plötzlich langsamer', k: ['langsam', 'geschwindigkeit', 'bremst'] },
    { t: 'Er lagert sein Geröll fächerförmig ab', k: ['ablager', 'abgelagert', 'faecher', 'kegel', 'geroell'] } ],
    a: 'Ein steiler Seitenbach tritt ins flache Haupttal. Weil das Gefälle plötzlich abnimmt, wird er langsamer und kann sein Geröll nicht mehr tragen. Er lagert es fächerförmig ab: Es entsteht ein Schwemmkegel.' },
  { lz: 'w2', q: 'Erkläre den Zusammenhang zwischen Gefälle, Fliessgeschwindigkeit, Erosion und Sedimentation.', pts: [
    { t: 'Starkes Gefälle → hohe Fliessgeschwindigkeit', k: ['steil', 'starkes gefaelle', 'grosses gefaelle', 'schnell'] },
    { t: 'Schnelles Wasser erodiert und transportiert viel und grobes Material', k: ['erosion', 'erodier', 'abtrag', 'transport'] },
    { t: 'Geringes Gefälle → langsames Wasser', k: ['flach', 'gering', 'langsam'] },
    { t: 'Langsames Wasser lagert ab (Sedimentation)', k: ['sediment', 'ablager', 'abgelagert', 'liegen'] } ],
    a: 'Je steiler das Gefälle, desto schneller fliesst das Wasser. Schnelles Wasser hat viel Kraft: Es erodiert und transportiert viel und auch grobes Material (Oberlauf, V-Tal). Wird das Gefälle geringer, fliesst das Wasser langsamer und kann weniger tragen. Zuerst bleiben grosse Steine liegen, zuletzt Sand und Schlamm: Sedimentation (Unterlauf, Delta).' },
  { lz: 'w3', q: 'Beschreibe, wie sich das Gesteinsmaterial von der Quelle zur Mündung verändert, und begründe.', pts: [
    { t: 'Bei der Quelle: grosse, kantige Blöcke', k: ['block', 'bloecke', 'kantig', 'gross'] },
    { t: 'Es wird immer kleiner bzw. feiner', k: ['kleiner', 'feiner', 'zerkleinert'] },
    { t: 'Es wird runder', k: ['rund', 'gerundet', 'abgeschliffen', 'abgerundet'] },
    { t: 'Bei der Mündung: Sand und Schlamm', k: ['sand', 'schlamm', 'ton'] },
    { t: 'Grund: Die Steine reiben beim Transport aneinander', k: ['abrieb', 'aneinander', 'reib', 'schlagen', 'transport'] } ],
    a: 'Bei der Quelle liegen grosse, kantige Blöcke. Beim Transport schlagen und reiben die Steine aneinander und werden abgeschliffen. Sie werden immer kleiner und runder: Blöcke → Kies → Sand → Schlamm. Weil das Gefälle abnimmt, bleibt das grobe Material zuerst liegen.' },
  { lz: 'w4', q: 'Erkläre, wie ein Mäander entsteht und wie daraus ein Altwasser wird.', pts: [
    { t: 'Aussen (Prallhang): schnelles Wasser, Erosion', k: ['prallhang', 'aussen'] },
    { t: 'Innen (Gleithang): langsames Wasser, Ablagerung', k: ['gleithang', 'innen'] },
    { t: 'Die Schlinge wächst, der Mäanderhals wird schmal', k: ['hals', 'schmal', 'enger', 'groesser'] },
    { t: 'Bei Hochwasser bricht der Fluss durch den Hals', k: ['durchbr', 'durchbruch', 'hochwasser'] },
    { t: 'Die abgeschnittene Schlinge bleibt als Altwasser zurück', k: ['abgeschnitten', 'abgetrennt', 'altwasser', 'altarm'] } ],
    a: 'In einer Kurve fliesst das Wasser aussen schneller. Am Prallhang erodiert es das Ufer, innen am Gleithang lagert es Sand und Kies ab. So wird die Schlinge (Mäander) immer grösser und der Mäanderhals immer schmaler. Bei einem Hochwasser durchbricht der Fluss den Hals und nimmt den kürzeren Weg. Die abgeschnittene Schlinge bleibt als Altwasser (Altarm) zurück.' },
  { lz: 'w5', q: 'Wie entsteht Karst? Beschreibe drei typische Karstformen.', pts: [
    { t: 'Karst gibt es im Kalkgestein', k: ['kalk'] },
    { t: 'Regenwasser mit Kohlensäure löst den Kalk auf', k: ['kohlensaeure', 'loest', 'loesung', 'aufgeloest', 'co2'] },
    { t: 'Formen an der Oberfläche (Doline, Karren, Polje, Trockental, Kalktuff)', k: ['doline', 'karren', 'polje', 'trockental', 'kalktuff'] },
    { t: 'Formen in Höhlen (Stalaktit, Stalagmit, Säule, Sinter)', k: ['stalaktit', 'stalagmit', 'tropfstein', 'hoehle', 'saeule', 'sinter'] } ],
    a: 'Karst entsteht im Kalkgestein. Regenwasser nimmt Kohlendioxid auf und wird zu Kohlensäure, die den Kalk löst (H₂CO₃ + CaCO₃ → Ca²⁺ + 2 HCO₃⁻). An der Oberfläche entstehen Karren (Rinnen im Fels), Dolinen (trichterförmige Einsturzlöcher) und Trockentäler, weil das Wasser versickert. Unterirdisch entstehen Höhlen mit Tropfsteinen: Stalaktiten hängen von der Decke, Stalagmiten wachsen vom Boden.' },
  { lz: 'w6', q: 'Erkläre, wie die Gezeiten entstehen und in welchen Zeitabständen sie auftreten.', pts: [
    { t: 'Die Anziehungskraft des Mondes zieht das Wasser an', k: ['anzieh', 'gravitation', 'mond'] },
    { t: 'Auf der Gegenseite wirkt die Fliehkraft', k: ['fliehkraft', 'zentrifugal'] },
    { t: 'Zwei Flutberge, die Erde dreht sich darunter hindurch', k: ['flutberg', 'wasserberg', 'zwei', 'dreht'] },
    { t: 'Flut etwa alle 12 h 25 min', k: ['12', 'zwoelf'] },
    { t: 'Zweimal Ebbe und zweimal Flut pro Tag, Flut → Ebbe etwa 6 h', k: ['zweimal', 'sechs', '6 h', '6h', '6 stunden'] } ],
    a: 'Die Anziehungskraft des Mondes zieht das Wasser auf der mondzugewandten Seite an. Auf der Gegenseite überwiegt die Fliehkraft. So entstehen zwei Flutberge. Die Erde dreht sich darunter hindurch, deshalb gibt es an einem Ort zweimal Flut und zweimal Ebbe pro Tag. Weil der Mond weiterwandert, kommt die nächste Flut nach etwa 12 h 25 min. Von Flut zu Ebbe dauert es rund 6 h.' },
  { lz: 'w7', q: 'Was ist eine Springtide, was eine Nipptide? Wie entstehen sie?', pts: [
    { t: 'Springtide: Sonne, Erde und Mond stehen in einer Linie', k: ['linie', 'gerade'] },
    { t: 'Springtide bei Vollmond und Neumond', k: ['vollmond', 'neumond'] },
    { t: 'Nipptide: Sonne und Mond im rechten Winkel zur Erde', k: ['winkel', '90'] },
    { t: 'Nipptide bei Halbmond', k: ['halbmond'] },
    { t: 'Unterschied im Tidenhub: gross bzw. klein', k: ['tidenhub', 'hoch', 'gross', 'klein', 'stark', 'schwach'] } ],
    a: 'Springtide: Bei Vollmond und Neumond stehen Sonne, Erde und Mond in einer Linie. Die Kräfte von Sonne und Mond addieren sich, der Tidenhub ist besonders gross. Nipptide: Bei Halbmond stehen Sonne und Mond im rechten Winkel zur Erde. Ihre Kräfte schwächen sich teilweise ab, der Tidenhub ist besonders klein.' },
  { lz: 'g1', q: 'Zähle zwei Hochwasser in Uri auf. Nenne Jahr, betroffene Gemeinden oder Gebiete und was passiert ist.', pts: [
    { t: '1977', k: ['1977'] }, { t: '1987', k: ['1987'] }, { t: '2005', k: ['2005'] },
    { t: 'Betroffene Gemeinde oder Gebiet (z.B. Schattdorf, Attinghausen, Flüelen)', k: ['schattdorf', 'attinghausen', 'fluelen', 'altdorf', 'reusstal', 'reussebene'] },
    { t: 'Ursache (z.B. Schächen trat über die Ufer, Unwetter am Gotthard)', k: ['schaechen', 'reuss', 'gotthard', 'unwetter', 'regen'] } ],
    a: '1987: In der Nacht vom 24./25. August wütete ein Unwetter über dem Gotthardmassiv. Das untere Reusstal war von Flüelen bis Attinghausen überflutet, die Gotthardroute wochenlang gesperrt. 2005: Am 22./23. August trat der Schächen über die Ufer und überflutete das Industriegebiet in Schattdorf («Schattdorfer See»). Auch möglich: 1977, der Schächen überflutete das Industriegebiet, in Attinghausen floss der Kummetbach durchs Dorf.' },
  { lz: 'g2', min: .7, q: 'Nenne mindestens fünf Hochwasserschutzmassnahmen in Uri und sage, wo sie liegen und was sie tun.', pts: [
    { t: 'Schutzmauer entlang der Stillen Reuss (Industriegebiet Schattdorf)', k: ['mauer'] },
    { t: 'Notentlastungskanal (unterirdisch)', k: ['kanal', 'notentlast'] },
    { t: 'Torverschluss Stille Reuss', k: ['tor '] },
    { t: 'Entlastung über die Autobahn A2', k: ['autobahn', 'a2'] },
    { t: 'Kaskaden (Treppen) am Reussdamm', k: ['kaskade', 'treppe'] },
    { t: 'Stiglissammler (Geschiebesammler) in Bürglen', k: ['sammler', 'stiglis', 'geschiebe'] },
    { t: 'Weitere: Durchlass verbreitert, Palanggenbach, Swissli, Giessen', k: ['durchlass', 'palanggen', 'swissli', 'giessen', 'verbreiter', 'renatur'] } ],
    a: 'Schattdorf: Hochwasserschutzmauer entlang der Stillen Reuss schützt das Industriegebiet, dazu ein unterirdischer Notentlastungskanal, ein Torverschluss und ein verbreiterter Durchlass an der Stillen Reuss. Reussebene: Bei extremem Hochwasser fliesst Wasser kontrolliert über den Reussdamm auf die Autobahn A2 und Richtung Urnersee. Kaskaden (Treppen) am Damm bremsen überlaufendes Wasser. Bürglen: Der Stiglissammler hält das Geschiebe des Schächens zurück.' },
  { lz: 'e1', q: 'Wie entsteht ein U-Tal (Trogtal), und woran erkennt man es?', pts: [
    { t: 'Ein Gletscher fliesst durch das Tal', k: ['gletscher', 'eis'] },
    { t: 'Er schürft Boden und Wände ab', k: ['schuerf', 'abtrag', 'hobel', 'schleif', 'erod'] },
    { t: 'Breiter, flacher Talboden', k: ['breit', 'flach', 'u-form', 'u-foermig', 'u form'] },
    { t: 'Steile Talwände', k: ['steil'] } ],
    a: 'Ein Gletscher füllt das ganze Tal aus und schürft mit dem mitgeführten Gestein Boden und Wände ab. Er formt so aus einem V-Tal ein U-Tal (Trogtal) mit breitem, flachem Talboden und steilen Wänden.' },
  { lz: 'e1', q: 'Was sind Moränen? Nenne drei Arten und wo sie liegen.', pts: [
    { t: 'Vom Gletscher transportierter und abgelagerter Schutt', k: ['schutt', 'gestein', 'material', 'geroell', 'ablager', 'abgelagert'] },
    { t: 'Seitenmoräne: am Rand des Gletschers', k: ['seiten'] },
    { t: 'Mittelmoräne: wo zwei Gletscher zusammenfliessen', k: ['mittel'] },
    { t: 'Endmoräne: Wall vor der Gletscherzunge', k: ['end'] } ],
    a: 'Moränen sind Schutt, den der Gletscher transportiert und abgelagert hat. Seitenmoränen liegen am Rand des Gletschers, Mittelmoränen entstehen, wo zwei Gletscher zusammenfliessen. Die Endmoräne ist ein Wall vor der Gletscherzunge und zeigt, wie weit der Gletscher einmal reichte.' },
  { lz: 'e2', q: 'Erkläre grob, wie ein Gletscher entsteht.', pts: [
    { t: 'Es fällt viel Schnee, und es ist kalt', k: ['schnee', 'kalt', 'niederschlag', 'temperatur'] },
    { t: 'Der Schnee bleibt länger als ein Jahr liegen', k: ['jahr', 'liegen', 'schmilzt nicht', 'nicht schmilzt'] },
    { t: 'Neue Schichten drücken ihn zusammen', k: ['druck', 'gewicht', 'zusammengedrueckt', 'presst'] },
    { t: 'Aus Schnee wird Firn und dann Gletschereis', k: ['firn', 'umwandl', 'gletschereis', 'eis'] } ],
    a: 'Wo es kalt ist und viel Niederschlag fällt, schmilzt im Sommer nicht der ganze Schnee. Er bleibt länger als ein Jahr liegen. Unter dem Druck neuer Schichten wird er zu körnigem Firn und schliesslich zu Gletschereis. Wird das Eis schwer genug, beginnt es talwärts zu fliessen.' },
  { lz: 'e3', q: 'Warum schmelzen die Gletscher weltweit, und welchen Nutzen verlieren wir dabei?', pts: [
    { t: 'Ursache: Klimaerwärmung, wärmere Sommer', k: ['klima', 'erwaerm', 'waermer', 'temperatur'] },
    { t: 'Weniger Schnee im Winter, mehr Schmelze im Sommer', k: ['weniger schnee', 'schmilzt mehr', 'mehr schmilzt', 'schnee'] },
    { t: 'Gletscher sind grosse Süsswasserspeicher', k: ['suesswasser', 'speicher', 'trinkwasser'] },
    { t: 'Schmelzwasser im Sommer für Landwirtschaft und Strom', k: ['landwirtschaft', 'bewaesser', 'strom', 'energie', 'kraftwerk', 'sommer'] },
    { t: 'Tourismus, Kies aus Moränen', k: ['tourismus', 'touris', 'kies'] } ],
    a: 'Wegen der Klimaerwärmung sind die Sommer wärmer und im Winter fällt weniger Schnee. Es schmilzt mehr Eis, als neu entsteht. Dabei verlieren wir grosse Süsswasserspeicher: Gletscher liefern im Sommer Schmelzwasser für Trinkwasser, Landwirtschaft und Stromproduktion. Dazu kommen Tourismus und Kies aus Moränen. Gefahr: Gletscherseen können plötzlich auslaufen.' }
],

  // Bild-Quiz: Szenen aus index.html (#vorlagen). spots = Formen, prio = Reihenfolge bei überlappenden Flächen.
  bildquiz: {
    titel: 'Formen erkennen, benennen, erklären',
    text: 'Zwei gezeichnete Landschaften: ein Fluss von der Quelle bis zum See und ein Gletscher vom Firngebiet bis zum Vorfeld. Wähle, was du üben willst.',
    szenen: {
      fluss: { label: 'Flusslandschaft', svg: '#map', hs: '#hotspots', hl: '#hl', wrap: '#wrapFluss', extraLz: ['n2'],
        prio: ['prallhang', 'gleithang', 'altwasser', 'wasserfall', 'quelle', 'schwemmkegel', 'delta', 'vtal', 'see', 'maeander'],
        spots: {
  quelle: { n: 'Quelle', lz: ['w1'], t: 'Hier entspringt der Fluss. Noch wenig Wasser, aber starkes Gefälle.' },
  vtal: { n: 'V-Tal (Kerbtal)', lz: ['w1'], t: 'Im steilen Oberlauf überwiegt die Tiefenerosion. Der Fluss schneidet sich ein, die Hänge rutschen nach. Der Querschnitt sieht aus wie ein V.' },
  wasserfall: { n: 'Wasserfall', lz: ['w1'], t: 'Das Wasser stürzt über eine Geländestufe. Am Fuss erodiert es ein tiefes Becken (Kolk).' },
  schwemmkegel: { n: 'Schwemmkegel', lz: ['w1', 'w2'], t: 'Ein steiler Seitenbach erreicht das flache Haupttal. Er wird plötzlich langsamer und lagert sein Geröll fächerförmig ab. Viele Alpendörfer liegen auf Schwemmkegeln, weil es dort trockener war als im Talboden.' },
  maeander: { n: 'Mäander', lz: ['w1', 'w4'], t: 'Flussschlingen im flachen Talboden. Aussen wird erodiert, innen abgelagert. So wandern die Schlingen und werden immer enger.' },
  prallhang: { n: 'Prallhang', lz: ['w4'], t: 'Aussenseite der Kurve. Das Wasser fliesst schnell und erodiert, das Ufer wird steil.' },
  gleithang: { n: 'Gleithang', lz: ['w4'], t: 'Innenseite der Kurve. Das Wasser fliesst langsam und lagert Sand und Kies ab, das Ufer ist flach (Kiesbank).' },
  altwasser: { n: 'Altwasser (Altarm)', lz: ['w4', 'w1'], t: 'Eine abgeschnittene Flussschlinge. Der Fluss hat den Mäanderhals durchbrochen und nimmt den kürzeren Weg. Die alte Schlinge bleibt als stehendes Gewässer zurück.' },
  delta: { n: 'Delta', lz: ['w1'], t: 'An der Mündung in den See wird der Fluss fast still und lagert seine Fracht ab. Er teilt sich in mehrere Arme. Beispiel: das Reussdelta im Urnersee.' },
  see: { n: 'See', lz: ['w1'], t: 'Hier mündet der Fluss. Im ruhigen Wasser sinken Sand und Schlamm ab, der See wird langsam aufgefüllt.' }
} },
      eis: { label: 'Gletscherlandschaft', svg: '#gmap', hs: '#ghotspots', hl: '#ghl', wrap: '#wrapEis',
        prio: ['tor', 'rund', 'findling', 'see', 'end', 'mittel', 'seiten', 'laengs', 'quer', 'firn', 'zunge', 'fjord', 'utal'],
        spots: {
  firn: { n: 'Firngebiet (Nährgebiet)', lz: ['e2'], t: 'Hier oben ist es kalt und es fällt viel Schnee. Er bleibt länger als ein Jahr liegen und wird unter dem Druck neuer Schichten zu Firn und dann zu Gletschereis.' },
  zunge: { n: 'Gletscherzunge', lz: ['e1'], t: 'Das untere Ende des Gletschers, wo das Eis aufhört. Hier schmilzt mehr Eis, als von oben nachfliesst.' },
  tor: { n: 'Gletschertor', lz: ['e1'], t: 'Eine Öffnung an der Gletscherzunge. Hier fliesst das Schmelzwasser als Bach aus dem Gletscher.' },
  mittel: { n: 'Mittelmoräne', lz: ['e1'], t: 'Wo zwei Gletscher zusammenfliessen, vereinigen sich ihre Seitenmoränen zu einem Schuttstreifen in der Mitte des Eises.' },
  seiten: { n: 'Seitenmoräne', lz: ['e1'], t: 'Schutt am Rand des Gletschers. Er stammt von den Talflanken, von denen verwittertes Gestein auf das Eis fällt.' },
  end: { n: 'Endmoräne', lz: ['e1'], t: 'Ein Schuttwall vor der Gletscherzunge. Der Gletscher hat das Material vor sich hergeschoben und abgelagert. Er zeigt, wie weit der Gletscher einmal reichte.' },
  quer: { n: 'Querspalten', lz: ['e1'], t: 'Spalten quer zur Fliessrichtung. Sie entstehen, wo der Gletscher über eine Geländestufe fliesst und das Eis auseinandergezogen wird.' },
  laengs: { n: 'Längsspalten', lz: ['e1'], t: 'Spalten längs zur Fliessrichtung. Sie entstehen, wo der Gletscher seitlich Platz hat und sich ausbreitet.' },
  see: { n: 'Gletschersee', lz: ['e1'], t: 'Der Gletscher hat eine Mulde ausgeschürft. Nach seinem Rückzug füllt sie sich mit Schmelzwasser, hier hinter der Endmoräne gestaut.' },
  rund: { n: 'Rundhöcker', lz: ['e1'], t: 'Felsbuckel, die der Gletscher rund geschliffen hat. Oft sieht man noch Kratzspuren im Fels.' },
  utal: { n: 'U-Tal (Trogtal)', lz: ['e1'], t: 'Der Gletscher hat das Tal U-förmig ausgeschürft: breiter, flacher Talboden und steile Wände. Ein Fluss formt dagegen ein V-Tal.' },
  findling: { n: 'Findling', lz: ['e1'], t: 'Ein grosser Felsblock, den ein Gletscher weit transportiert und liegen gelassen hat. Er passt nicht zum Gestein der Umgebung und zeigt, wie weit das Eis in der Eiszeit reichte.' },
  fjord: { n: 'Fjord', lz: ['e1'], t: 'Ein Trogtal, das ins Meer hineinragt und mit Meerwasser gefüllt ist. Typisch für Norwegen.' }
} }
    }
  }
};
