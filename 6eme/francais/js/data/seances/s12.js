// Séance 12 — « -ais / -ait / -aient »
//
// Format : voir s06.js, la séance de référence.
//
// Le type `qcm` reprend le cadre de phrase de `completer` — `avant` / `apres` —
// et y ajoute `choix`, les formes concurrentes, dont `attendu` est l'une.
//
// PIÈGE. Toute la séance porte 'ait-aient'. Sa règle ne parle que de -ait et
// -aient, alors que le palier 1 traite aussi -ais (je, tu) ; c'est malgré tout
// le piège le plus proche du catalogue, et ses raisonnements — « ça se prononce
// pareil », « je me suis trompé de sujet » — décrivent exactement l'erreur
// commise sur -ais. Aucun autre piège existant ne convient mieux.
//
// NEUTRES. Le piège ne joue que lorsque la terminaison est INAUDIBLE et qu'un
// mot voisin tire vers l'autre nombre. Les items neutres sont donc de deux
// sortes : au palier 1, « nous » et « vous », dont les terminaisons s'entendent
// (-ions, -iez) ; au palier 2, les phrases sans écran, où le sujet touche le
// verbe. Sans eux, l'élève apprendrait « nom au pluriel juste avant → -ait »,
// un motif qui le ferait échouer sur toutes les phrases ordinaires.

export default {
  numero: 12,
  bloc: 3,
  titre: '-ais, -ait, -aient',
  sousTitre: "Trois terminaisons, un seul son",
  objectif: "Choisir la terminaison de l'imparfait d'après le sujet, jamais d'après le son.",

  rappels: [
    {
      id: 'r1',
      titre: "C'est le sujet qui décide",
      texte:
        "*Je chantais*, *tu chantais*, *il chantait*, *ils chantaient* : à l'oreille, " +
        "c'est exactement le même son. Il n'y a rien à écouter.\n\n" +
        "Une seule question sert à quelque chose : **« qui est-ce qui… ? »**\n\n" +
        "**je → -ais · tu → -ais · il / elle / on → -ait · ils / elles → -aient**",
      exemples: [
        { phrase: 'Je **regardais** la télé.', note: 'Qui est-ce qui regardait ? **Je** → **-ais**.' },
        { phrase: 'Il **regardait** la télé.', note: 'Qui est-ce qui regardait ? **Il** → **-ait**.' },
      ],
    },
    {
      id: 'r2',
      titre: 'Un seul, ou plusieurs ?',
      texte:
        "Le **-ent** de *-aient* ne s'entend pas. C'est une marque écrite, rien d'autre : " +
        "*il jouait* et *ils jouaient* se disent pareil.\n\n" +
        "Alors on compte. Le sujet désigne-t-il **un seul** ou **plusieurs** ?\n\n" +
        "Et méfiance quand un autre nom se glisse juste devant le verbe : " +
        "ce n'est pas lui qui commande.",
      exemples: [
        { phrase: 'Le joueur **marquait** souvent.', note: 'Un seul joueur → **-ait**.' },
        { phrase: 'Le chien des voisins **aboyait**.', note: "Qui est-ce qui aboyait ? Le chien — un seul → **-ait**." },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : je, tu, il — la personne du sujet ─────────────────────
    {
      id: 's12-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'ait-aient',
      consigne: "Conjugue le verbe à l'imparfait.",
      // Verbe à initiale consonantique : « je » ne s'élide pas devant lui, la
      // phrase reconstituée reste correcte telle quelle.
      avant: "Quand j'étais petit, je ", verbe: 'partir', apres: " à l'école à pied.", attendu: 'partais',
    },
    {
      id: 's12-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'ait-aient',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Tu ', verbe: 'oublier', apres: ' toujours tes lacets.', attendu: 'oubliais',
    },
    {
      id: 's12-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'ait-aient',
      consigne: 'Cherche le sujet, puis choisis la terminaison.',
      avant: 'Mon frère ', apres: ' très vite au foot.',
      choix: ['courais', 'courait', 'couraient'], attendu: 'courait',
    },
    {
      id: 's12-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'ait-aient',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Je ', verbe: 'prendre', apres: ' mon vélo tous les matins.', attendu: 'prenais',
    },
    {
      // NEUTRE : avec « nous », la terminaison s'entend. Le piège du son ne
      // joue pas, mais il faut toujours chercher le sujet.
      id: 's12-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'ait-aient',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Nous ', verbe: 'jouer', apres: ' dans la cour à la récréation.', attendu: 'jouions',
    },
    {
      // NEUTRE
      id: 's12-e6', rappel: 'r1', type: 'completer', palier: 1, piege: 'ait-aient',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Vous ', verbe: 'être', apres: ' souvent en retard.', attendu: 'étiez',
    },

    // ── Palier 2 : -ait ou -aient, avec un nom voisin qui tire ───────────
    {
      // NEUTRE : le sujet touche le verbe, rien ne tire dans l'autre sens.
      id: 's12-e7', rappel: 'r2', type: 'completer', palier: 2, piege: 'ait-aient',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Les élèves ', verbe: 'attendre', apres: ' dans le couloir.', attendu: 'attendaient',
    },
    {
      id: 's12-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'ait-aient',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Le chien des voisins ', verbe: 'aboyer', apres: ' toute la nuit.', attendu: 'aboyait',
    },
    {
      // Écran dans l'autre sens : le mot voisin est singulier, le sujet pluriel.
      // Sans cet item, l'élève retiendrait « nom voisin → prends le contraire ».
      id: 's12-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'ait-aient',
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Les joueurs de mon équipe ', verbe: 'rentrer', apres: ' au vestiaire.', attendu: 'rentraient',
    },
    {
      id: 's12-e10', rappel: 'r2', type: 'qcm', palier: 2, piege: 'ait-aient',
      consigne: 'Cherche le sujet, puis choisis la terminaison.',
      avant: 'Le bruit des motos ', apres: ' tout le quartier.',
      choix: ['réveillait', 'réveillaient'], attendu: 'réveillait',
    },
    {
      // NEUTRE
      id: 's12-e11', rappel: 'r2', type: 'completer', palier: 2, piege: 'ait-aient',
      neutre: true,
      consigne: "Conjugue le verbe à l'imparfait.",
      avant: 'Le gardien ', verbe: 'attraper', apres: ' tous les ballons.', attendu: 'attrapait',
    },
    {
      id: 's12-e12', rappel: 'r2', type: 'toucher', palier: 2, piege: 'ait-aient',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'fenêtres', 'de', 'la', 'classe', 'restaient', 'ouvertes.'], attendus: [1],
    },
    {
      id: 's12-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'ait-aient',
      consigne: 'Cherche le sujet, puis choisis la terminaison.',
      avant: 'Ma sœur et son amie ', apres: ' des heures au téléphone.',
      choix: ['passait', 'passaient'], attendu: 'passaient',
    },
  ],
};
