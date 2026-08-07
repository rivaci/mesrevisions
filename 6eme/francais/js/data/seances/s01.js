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
      // Le test « hier » ne se raconte pas, il se voit : un mot se réécrit sous
      // les yeux, l'autre ne bouge pas. C'est toute la leçon en une image.
      animation: {
        mots: ['Les', 'élèves', 'veulent', 'partir.'],
        scenes: [
          { type: 'dire', texte: 'Deux mots ressemblent à des verbes. Un seul est le verbe conjugué.' },
          { type: 'terminaison', mot: 2, devient: 'voulaient',
            texte: 'Mets « hier » devant : « Hier, les élèves voulaient partir. » Ce mot a bougé.' },
          { type: 'fausse-piste', mot: 3,
            texte: "« partir », lui, n'a pas bougé d'une lettre. Un infinitif ne se conjugue jamais." },
          { type: 'surligner', mots: [2], role: 'verbe',
            texte: 'Le verbe conjugué, c\'est celui qui bouge. Son infinitif : vouloir.' },
        ],
      },
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
      // Le mot qui OUVRE la phrase n'est pas le sujet : « matin » est au bon
      // endroit, il a la bonne allure, et il ne répond pas à la question.
      animation: {
        mots: ['Chaque', 'matin,', 'Anto', 'prend', 'le', 'bus.'],
        scenes: [
          { type: 'surligner', mots: [3], role: 'verbe',
            texte: 'D\'abord le verbe : « prend ».' },
          { type: 'dire', texte: 'Maintenant la question : qui est-ce qui prend le bus ?' },
          { type: 'fausse-piste', mot: 1,
            texte: '« matin » ouvre la phrase — mais un matin ne prend pas le bus.' },
          { type: 'surligner', mots: [2], role: 'sujet',
            texte: 'C\'est Anto qui prend le bus. Le sujet, c\'est celui qui répond.' },
          { type: 'fleche', de: 2, vers: 3, label: 'sujet → verbe',
            texte: 'Un seul Anto → « prend ». C\'est lui qui commande la terminaison.' },
        ],
      },
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
    {
      // « chercher » est un infinitif posé après le verbe conjugué : c'est lui
      // qu'on touche par réflexe parce qu'il ressemble à l'action principale.
      id: 's01-e15', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      consigne: 'Touche le verbe conjugué.',
      mots: ['Emma', 'va', 'chercher', 'son', 'cartable', 'au', 'collège.'], attendus: [1],
    },
    {
      // NEUTRE : aucun infinitif dans la phrase, et deux sujets — pour qu'Anto
      // ne prenne pas l'habitude de chercher un piège à tous les coups.
      id: 's01-e16', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Touche le verbe conjugué.',
      mots: ['Zoé', 'et', 'Hugo', 'partent', 'à', 'la', 'piscine.'], attendus: [3],
    },
    {
      id: 's01-e17', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Le', 'soir,', 'Léa', 'relit', 'ses', 'leçons.'], attendus: [2],
    },
    {
      // Un pronom complément s'est glissé entre le sujet et le verbe.
      id: 's01-e18', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      consigne: 'Touche le sujet du verbe.',
      mots: ['Noé', 'les', 'range', 'dans', 'son', 'casier.'], attendus: [0],
    },
    {
      id: 's01-e19', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les voisins ', verbe: 'arroser', apres: ' leur jardin.', attendu: 'arrosent',
    },
    {
      // NEUTRE : à « vous », la terminaison s'entend — l'oreille suffit.
      id: 's01-e20', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      neutre: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Vous ', verbe: 'finir', apres: ' votre exercice.', attendu: 'finissez',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont PAS jouées dans le parcours. Elles
    // restent intactes pour la reprise en début de séance suivante et pour la
    // seconde chance après une erreur — qui exigent l'une comme l'autre une
    // phrase JAMAIS vue portant le même piège. Sans cette réserve, une séance
    // consommait tout son contenu et il ne restait rien à reproposer.
    {
      // Palier 3 : *aboie* et *aboient* se prononcent pareil, seul le sujet
      // tranche — et *du voisin* tire l'oreille vers le mauvais mot.
      id: 's01-r1', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les canards ', verbe: 'traverser', apres: ' la route en file.', attendu: 'traversent',
    },
    {
      // *habite* et *habitent* sonnent pareil : l'oreille ne peut pas trancher.
      id: 's01-r2', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Mes grands-parents ', verbe: 'habiter', apres: ' à la campagne.', attendu: 'habitent',
    },
    {
      // Un infinitif posé après le verbe conjugué : c'est *gagner* qu'on touche
      // par réflexe, parce qu'il porte l'action dont parle la phrase.
      id: 's01-r3', rappel: 'r1', type: 'toucher', palier: 1, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Touche le verbe conjugué.',
      mots: ['Léa', 'espère', 'gagner', 'le', 'tournoi.'], attendus: [1],
    },
    {
      // Deux réserves de plus : la séance compte maintenant vingt exercices
      // joués, donc plus d'erreurs possibles — et chaque seconde chance
      // consomme une phrase jamais vue.
      id: 's01-r4', rappel: 'r2', type: 'completer', palier: 3, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Conjugue le verbe au présent.',
      avant: 'Les supporters ', verbe: 'encourager', apres: ' leur équipe.', attendu: 'encouragent',
    },
    {
      id: 's01-r5', rappel: 'r2', type: 'toucher', palier: 2, piege: 'sujet-colle',
      reserve: true,
      consigne: 'Touche le sujet du verbe.',
      mots: ['Après', 'le', 'dîner,', 'Sarah', 'sort', 'le', 'chien.'], attendus: [3],
    },
  ],
};
