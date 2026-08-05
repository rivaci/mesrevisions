// Séance 1 — Trouver le verbe et son sujet.
//
// Format : voir s06.js, la séance de référence.
//
// NOTE SUR LE PIÈGE : le catalogue de pieges.js ne contient aucune entrée
// portant sur le *repérage* du verbe conjugué. 'sujet-colle' est le plus proche
// — c'est le piège du couple sujet/verbe, et sa regle (« pour trouver le sujet :
// qui est-ce qui + le verbe ») couvre exactement le geste travaillé ici. Il est
// donc employé pour toute la séance.

export default {
  numero: 1,
  bloc: 1,
  titre: 'Trouver le verbe et son sujet',
  sousTitre: 'Le couple qui commande toute la phrase',
  objectif:
    'Repérer le verbe conjugué dans une phrase, puis le sujet qui lui donne sa terminaison.',

  rappels: [
    {
      id: 'r1',
      titre: 'Repérer le verbe',
      texte:
        "Le verbe est le seul mot de la phrase qui change quand on change le temps. " +
        "Le test : mets **« hier »** puis **« demain »** devant la phrase, et regarde quel mot bouge.\n\n" +
        "Sous chaque verbe conjugué se cache son **infinitif** : *il range* → *ranger*.\n\n" +
        "Trois groupes : **1ᵉʳ** en *-er* (chanter), **2ᵉ** en *-ir* qui fait *nous finissons* " +
        "(finir), **3ᵉ** tout le reste (faire, prendre, venir…).\n\n" +
        "Attention : un infinitif posé dans la phrase n'est pas le verbe conjugué — lui ne bouge jamais.",
      exemples: [
        {
          phrase: 'Anto **range** sa chambre.',
          note: "Hier il rangeait, demain il rangera. Seul *range* bouge : c'est le verbe. Infinitif *ranger*, 1ᵉʳ groupe.",
        },
        {
          phrase: 'Les élèves **veulent** partir.',
          note: "Hier ils voulaient partir. *partir* n'a pas bougé : c'est un infinitif, pas le verbe conjugué.",
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Trouver son sujet',
      texte:
        "Une fois le verbe repéré, cherche son **sujet** : **« qui est-ce qui… ? »** + le verbe.\n\n" +
        "Le sujet n'est pas forcément le premier mot de la phrase, ni celui qui touche le verbe.\n\n" +
        "La terminaison du verbe dit deux choses en même temps : le **temps** et la **personne**. " +
        "Dans *nous chantions*, le *-i-* donne l'imparfait et le *-ons* donne la 1ʳᵉ personne du pluriel.",
      exemples: [
        {
          phrase: 'Chaque matin, Anto **prend** le bus.',
          note: 'Qui est-ce qui prend le bus ? *Anto* — pas *matin*.',
        },
        {
          phrase: 'Mon chien ne **mange** pas ses croquettes.',
          note: 'Qui est-ce qui mange ? *le chien*. Le petit mot *ne* ne compte pas.',
        },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : quel mot est le verbe conjugué ? ───────────────────────
    // Le piège joue quand un infinitif traîne dans la phrase : c'est lui
    // qu'on touche par réflexe.
    {
      id: 's01-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      consigne: 'Touche le verbe conjugué.',
      mots: ['Les', 'élèves', 'veulent', 'partir', 'en', 'voyage.'], attendus: [2],
    },
    {
      id: 's01-e2', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      consigne: 'Touche le verbe conjugué.',
      mots: ['Anto', 'range', 'sa', 'chambre', 'pour', 'jouer.'], attendus: [1],
    },
    {
      // NEUTRE : aucun infinitif, aucun mot qui ressemble à un verbe. Et le
      // verbe n'est pas à la même place que dans les items précédents — sans
      // ça, Anto apprendrait une position plutôt que le test du temps.
      id: 's01-e3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Touche le verbe conjugué.',
      mots: ['Le', 'chat', 'dort', 'sur', 'le', 'canapé.'], attendus: [2],
    },
    {
      // NEUTRE
      id: 's01-e4', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Touche le verbe conjugué.',
      mots: ['Dans', 'la', 'cour,', 'les', 'élèves', 'jouent', 'au', 'ballon.'], attendus: [5],
    },
    {
      // « dîner » est ici un nom, pas un infinitif.
      id: 's01-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      consigne: 'Touche le verbe conjugué.',
      mots: ['Mon', 'frère', 'prépare', 'le', 'dîner.'], attendus: [2],
    },

    // ── Palier 2 : qui est-ce qui fait l'action ? ─────────────────────────
    // Le piège joue quand le sujet ne touche pas le verbe : complément placé
    // en tête, ou petit mot glissé entre les deux.
    {
      id: 's01-e6', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Chaque', 'matin,', 'Anto', 'prend', 'le', 'bus.'], attendus: [2],
    },
    {
      id: 's01-e7', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Mon', 'chien', 'ne', 'mange', 'pas', 'ses', 'croquettes.'], attendus: [1],
    },
    {
      // NEUTRE : le sujet est bien collé au verbe. Sans ces items, Anto
      // apprendrait « le sujet est loin du verbe » — l'inverse du réflexe.
      id: 's01-e8', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Les', 'oiseaux', 'chantent', 'dans', 'le', 'jardin.'], attendus: [1],
    },
    {
      // NEUTRE — sujet singulier, pour que le palier ne se joue pas qu'au pluriel.
      id: 's01-e9', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'train', 'arrive', 'à', 'la', 'gare.'], attendus: [1],
    },
    {
      id: 's01-e10', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Pendant', 'les', 'vacances,', 'mes', 'cousins', 'viennent', 'à', 'la', 'maison.'],
      attendus: [4],
    },

    // ── Palier 3 : la terminaison dit la personne ─────────────────────────
    // Le piège joue quand l'oreille ne tranche pas : *joue* et *jouent* se
    // prononcent pareil, seul le sujet décide.
    {
      id: 's01-e11', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les élèves ', verbe: 'écouter', apres: ' le professeur.', attendu: 'écoutent',
    },
    {
      // NEUTRE : même verbe, sujet singulier — le piège ne joue pas.
      id: 's01-e12', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Ma sœur ', verbe: 'écouter', apres: ' de la musique.', attendu: 'écoute',
    },
    {
      id: 's01-e13', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Tu ', verbe: 'chanter', apres: ' faux.', attendu: 'chantes',
    },
    {
      // NEUTRE : ici la terminaison s'entend, donc rien ne piège.
      id: 's01-e14', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Nous ', verbe: 'chanter', apres: ' à la chorale.', attendu: 'chantons',
    },
  ],
};
