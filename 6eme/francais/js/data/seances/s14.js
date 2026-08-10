// Séance 14 — Le participe passé avec être.
//
// Format : voir s06.js, la séance de référence.
//
//   qcm  reprend les champs `avant` / `apres` du completer, plus `choix`.
//        `attendu` est l'une des chaînes de `choix`, à la lettre près.
//
// Les neutres de cette séance cassent deux automatismes distincts :
//   — « il faut toujours ajouter une lettre » : le sujet est masculin
//     singulier, le participe ne bouge pas ;
//   — « sujet féminin ou pluriel → j'accorde » : l'auxiliaire est *avoir*,
//     donc rien ne bouge. Ces derniers portent tout de même le piège
//     'participe-etre', dont le raisonnement « mauvais-auxiliaire » est
//     exactement la réponse attendue. 'participe-avoir' conviendrait aussi,
//     mais il est le piège d'une séance ultérieure.
// Chaque item neutre est signalé sur place par un commentaire — cette
// liste-ci n'énumère pas les identifiants, elle deviendrait fausse au
// premier ajout.

export default {
  numero: 14,
  bloc: 3,
  titre: 'Le participe passé avec être',
  sousTitre: "Un participe qui se comporte comme un adjectif",
  objectif: "Accorder le participe passé avec le sujet dès que l'auxiliaire est être.",

  rappels: [
    {
      id: 'r1',
      titre: 'Avec être, le participe suit le sujet',
      texte:
        "Au passé composé, deux petits verbes servent d'auxiliaire : **être** et **avoir**.\n\n" +
        "Avec **être**, le participe passé se comporte comme un **adjectif** : " +
        "il prend le genre et le nombre du **sujet**.\n\n" +
        "*il est parti* — *elle est parti**e*** — *ils sont parti**s*** — *elles sont parti**es***.\n\n" +
        "On n'entend rien de tout ça. On l'écrit quand même.",
      // Le participe qui suit le sujet ne s'entend jamais. On le fait donc voir
      // quatre fois de suite sur la même phrase : le sujet change, la fin du
      // participe change, et l'oreille n'a rien à dire.
      animation: {
        mots: ['Ma', 'sœur', 'est', 'partie', 'à', 'la', 'piscine.'],
        scenes: [
          { type: 'surligner', mots: [2], role: 'ecran',
            texte: 'L\'auxiliaire est « est » : le verbe être. Donc on accorde.' },
          { type: 'surligner', mots: [1], role: 'sujet', texte: 'Avec qui ? Le sujet : « ma sœur ». Féminin singulier.' },
          { type: 'fleche', de: 1, vers: 3, label: 'donne genre et nombre',
            texte: 'Le participe se comporte comme un adjectif : « partie », avec un -e.' },
          { type: 'dire', texte: 'Change le sujet, et regarde la fin du participe suivre.' },
          { type: 'terminaison', mot: 0, devient: 'Mes', texte: 'Au pluriel…' },
          { type: 'terminaison', mot: 1, devient: 'frères', texte: '…et au masculin : « mes frères ».' },
          { type: 'terminaison', mot: 2, devient: 'sont', texte: 'L\'auxiliaire suit le sujet, comme d\'habitude.' },
          { type: 'terminaison', mot: 3, devient: 'partis',
            texte: '« partis », avec un -s muet. On n\'entend rien de tout ça. On l\'écrit quand même.' },
        ],
      },
      exemples: [
        { phrase: 'Ma sœur est **partie** à la piscine.', note: "Qui est-ce qui est parti ? Ma sœur — féminin singulier → **-e**." },
        { phrase: 'Mes frères sont **partis** à la piscine.', note: 'Masculin pluriel → **-s**, muet à l\'oreille.' },
      ],
    },
    {
      id: 'r2',
      titre: "Deux vérifications avant d'écrire",
      texte:
        "**1. Quel auxiliaire ?** *est*, *sont*, *était*, *sommes* viennent d'**être** → " +
        "on accorde. *a*, *ont*, *avait* viennent d'**avoir** → on ne touche à rien.\n\n" +
        "**2. Quel sujet ?** Pas le mot le plus proche : celui qui répond à " +
        "« qui est-ce qui… ? ». Dans *la copine de mes frères est partie*, c'est *la copine*.\n\n" +
        "Et quand le sujet mélange garçons et filles, le **masculin pluriel** l'emporte.",
      // Deux vérifications, dans l'ordre : l'auxiliaire d'abord, le sujet ensuite.
      // L'animation les joue dans cet ordre, et le piège du mot le plus proche
      // vient se glisser à la seconde — comme en dictée.
      animation: {
        mots: ['La', 'copine', 'de', 'mes', 'frères', 'est', 'partie.'],
        scenes: [
          { type: 'dire', texte: 'Première vérification : quel auxiliaire ?' },
          { type: 'surligner', mots: [5], role: 'ecran',
            texte: '« est » vient d\'être. Donc il faudra accorder.' },
          { type: 'dire', texte: 'Deuxième vérification : quel sujet ? Surtout pas le mot le plus proche.' },
          { type: 'fausse-piste', mot: 4,
            texte: '« frères » touche presque le verbe. Masculin pluriel, bien tentant.' },
          { type: 'fleche', de: 4, vers: 1, label: 'complète',
            texte: '« de mes frères » complète « copine ». Il dit de quelle copine on parle.' },
          { type: 'surligner', mots: [1], role: 'sujet',
            texte: 'Qui est-ce qui est parti ? La copine. Féminin singulier → « partie ».' },
        ],
      },
      exemples: [
        { phrase: 'Ma sœur a **gagné** sa course.', note: "Auxiliaire *avoir* → aucun accord, même avec un sujet féminin." },
        { phrase: 'Anto et ses copines sont **montés** dans le bus.', note: 'Un garçon dans le groupe → masculin pluriel.' },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : le sujet est juste devant l'auxiliaire ────────────────
    {
      id: 's14-e1', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ma sœur est ', verbe: 'partir', apres: ' à la piscine.',
      attendu: 'partie',
    },
    {
      id: 's14-e2', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes cousines sont ', verbe: 'arriver', apres: ' hier soir.',
      attendu: 'arrivées',
    },
    {
      // NEUTRE : sujet masculin singulier, le participe ne prend rien. Sans cet
      // item, l'élève apprend « participe avec être → j'ajoute une lettre ».
      id: 's14-e3', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mon frère est ', verbe: 'tomber', apres: ' de son vélo.',
      attendu: 'tombé',
    },
    {
      id: 's14-e4', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Les joueuses sont ', verbe: 'entrer', apres: ' sur le terrain.',
      attendu: 'entrées',
    },
    {
      // NEUTRE
      id: 's14-e5', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Le chien est ', verbe: 'rester', apres: ' devant la porte.',
      attendu: 'resté',
    },
    {
      id: 's14-e6', rappel: 'r1', type: 'toucher', palier: 1, piege: 'participe-etre',
      consigne: "Touche le mot qui commande l'accord du participe.",
      mots: ['Mes', 'sœurs', 'sont', 'rentrées', 'très', 'tard.'],
      attendus: [1],
    },

    // ── Palier 2 : auxiliaire trompeur, sujet éloigné ────────────────────
    {
      id: 's14-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Les filles de ma classe sont ', apres: ' au musée.',
      choix: ['allé', 'allée', 'allés', 'allées'], attendu: 'allées',
    },
    {
      // NEUTRE : sujet féminin, mais l'auxiliaire est *avoir* — donc rien ne
      // bouge. C'est l'item le plus important du palier : il empêche la fausse
      // règle « sujet féminin → participe en -e ».
      id: 's14-e8', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ma sœur a ', verbe: 'gagner', apres: ' sa course.',
      attendu: 'gagné',
    },
    {
      id: 's14-e9', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Anto et ses copines sont ', verbe: 'monter', apres: ' dans le bus.',
      attendu: 'montés',
    },
    {
      // NEUTRE : sujet pluriel, auxiliaire *avoir*, aucun accord.
      id: 's14-e10', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes parents ont ', verbe: 'oublier', apres: ' les clés à la maison.',
      attendu: 'oublié',
    },
    {
      id: 's14-e11', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'La copine de mes frères est ', verbe: 'partir', apres: ' avant la fin du match.',
      attendu: 'partie',
    },
    {
      id: 's14-e12', rappel: 'r2', type: 'toucher', palier: 2, piege: 'participe-etre',
      consigne: "Touche le mot qui commande l'accord du participe.",
      mots: ['La', 'porte', 'du', 'garage', 'est', 'restée', 'ouverte.'],
      attendus: [1],
    },
    {
      id: 's14-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Mes deux frères sont ', apres: ' en retard au tournoi.',
      choix: ['arrivé', 'arrivée', 'arrivés', 'arrivées'], attendu: 'arrivés',
    },
    {
      id: 's14-e14', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Léa est ', verbe: 'sortir', apres: ' de la salle de sport.',
      attendu: 'sortie',
    },
    {
      id: 's14-e15', rappel: 'r1', type: 'qcm', palier: 1, piege: 'participe-etre',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Zoé et Emma sont ', apres: ' du bus devant le collège.',
      choix: ['descendu', 'descendue', 'descendus', 'descendues'], attendu: 'descendues',
    },
    {
      // NEUTRE : encore un sujet masculin singulier, mais en fin de palier — le
      // réflexe « avec être, j'ajoute une lettre » se réinstalle vite si tous
      // les derniers items vus demandent un ajout.
      id: 's14-e16', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Tom est ', verbe: 'monter', apres: ' dans sa chambre.',
      attendu: 'monté',
    },
    {
      id: 's14-e17', rappel: 'r1', type: 'toucher', palier: 1, piege: 'participe-etre',
      consigne: "Touche le mot qui commande l'accord du participe.",
      mots: ['Emma', 'est', 'restée', 'à', 'la', 'maison.'],
      attendus: [0],
    },
    {
      id: 's14-e18', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Les affaires de Noé sont ', verbe: 'tomber', apres: ' du banc.',
      attendu: 'tombées',
    },
    {
      // NEUTRE : sujet féminin pluriel et pourtant rien ne bouge — l'auxiliaire
      // est *avoir*. C'est la seule question qui vaille avant d'accorder.
      id: 's14-e19', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      neutre: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Emma et sa sœur ont ', verbe: 'ranger', apres: ' le matériel après le cours.',
      attendu: 'rangé',
    },
    {
      id: 's14-e20', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      consigne: 'Choisis la forme qui convient.',
      avant: 'Le chien de mes voisines est ', apres: ' dans le jardin.',
      choix: ['entré', 'entrée', 'entrés', 'entrées'], attendu: 'entré',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    //
    // `reserve: true` : ces phrases ne sont jamais jouées dans le parcours. On
    // les garde intactes pour la reprise en début de séance suivante et pour la
    // seconde chance après une erreur — deux moments qui exigent une phrase
    // JAMAIS vue portant le même piège. Toutes sont piégeantes : les reprises
    // écartent les items neutres, un neutre en réserve ne servirait jamais.
    {
      id: 's14-r1', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      reserve: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Ma cousine est ', verbe: 'rentrer', apres: ' de vacances hier.',
      attendu: 'rentrée',
    },
    {
      id: 's14-r2', rappel: 'r1', type: 'completer', palier: 1, piege: 'participe-etre',
      reserve: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'Mes tantes sont ', verbe: 'revenir', apres: ' du spectacle.',
      attendu: 'revenues',
    },
    {
      id: 's14-r3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'participe-etre',
      reserve: true,
      consigne: 'Choisis la forme qui convient.',
      avant: 'Sarah est ', apres: ' première à la course.',
      choix: ['arrivé', 'arrivée', 'arrivés', 'arrivées'], attendu: 'arrivée',
    },
    {
      id: 's14-r4', rappel: 'r2', type: 'completer', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: 'Écris le participe passé, accordé comme il faut.',
      avant: 'La sœur de mes copains est ', verbe: 'venir', apres: ' au collège à pied.',
      attendu: 'venue',
    },
    {
      id: 's14-r5', rappel: 'r2', type: 'toucher', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: "Touche le mot qui commande l'accord du participe.",
      mots: ['Le', 'vélo', 'de', 'mes', 'sœurs', 'est', 'tombé', 'dans', 'la', 'boue.'],
      attendus: [1],
    },
    {
      id: 's14-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'participe-etre',
      reserve: true,
      consigne: 'Choisis la forme qui convient.',
      avant: 'Anto et Léa sont ', apres: ' au cinéma samedi.',
      choix: ['allé', 'allée', 'allés', 'allées'], attendu: 'allés',
    },
  ],
};
