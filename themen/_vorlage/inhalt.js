/* VORLAGE für eine neue Lern-App. Ordner kopieren nach themen/<fach-thema>/ und alles mit BEISPIEL ersetzen.
   Datenformat: siehe CLAUDE.md im Hauptordner. */
window.LERNAPP_INHALT = {
  id: 'vorlage',                         // = Ordnername, bestimmt den Speicherplatz im Browser
  eyebrow: 'Fach · Stufe · Prüfungsthema',
  titel: 'Titel <span>der App</span>',   // <span> wird blau
  untertitel: 'Ein Satz, worum es geht.',
  pruefung: '2026-12-31',                // Prüfungsdatum JJJJ-MM-TT

  themen: [
    { id: 'a', name: 'BEISPIEL Themengebiet', kurz: 'Themengebiet', lz: [
      ['a1', '…BEISPIEL ein Begriff erklären.', ['karten', 'sortieren']],
      ['a2', '…BEISPIEL zwei Dinge unterscheiden.', ['sortieren']] ] }
  ],

  fragen: {
    beispiel: [
      { lz: 'a1', q: 'BEISPIEL Frage?', o: ['Richtige Antwort (immer zuerst)', 'Falsche Antwort', 'Falsche Antwort'], e: 'Kurze Erklärung, warum.' }
    ]
  },

  karten: [
    { id: 'k1', lz: 'a1', g: 'grundlagen', q: 'BEISPIEL Was bedeutet …?', a: 'Antwort in ein bis drei Sätzen.' },
    { id: 'k2', lz: 'a2', g: 'grundlagen', q: 'BEISPIEL Was ist der Unterschied zwischen … und …?', a: 'Antwort.' }
  ],
  kartenGruppen: { grundlagen: 'Grundlagen' },

  sortieren: {
    beispiel: { label: 'Beispiel', title: 'A oder B?', lz: 'a2', bins: ['A', 'B'], items: [
      ['Begriff zu A', 0], ['Noch einer zu A', 0], ['Begriff zu B', 1], ['Noch einer zu B', 1] ] }
  },

  erklaeren: [
    { lz: 'a1', q: 'BEISPIEL Erkläre …', pts: [
      { t: 'Erster Punkt einer guten Antwort', k: ['stichwort', 'synonym'] },
      { t: 'Zweiter Punkt', k: ['stichwort2'] } ],
      a: 'Musterantwort in ganzen Sätzen.' },
    { lz: 'a2', q: 'BEISPIEL Vergleiche …', pts: [
      { t: 'Merkmal von A', k: ['a'] },
      { t: 'Merkmal von B', k: ['b'] } ],
      a: 'Musterantwort.' }
  ]
};
