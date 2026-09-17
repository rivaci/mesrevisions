// Chapitre 1, savoir-faire 7 — Les carrés et les cubes à connaître.
//
// ── Ce que la liste demande ──────────────────────────────────────────────
//
// « Connaître les carrés des entiers de 0 à 12 [EIB : 15] », « connaître le
// cube de 10 », et « savoir écrire un nombre sous la forme d'une puissance 2
// ou 3 ». Antonin suit le parcours EIB : les carrés vont donc jusqu'à 15.
//
// ── Un savoir-faire de mémoire, assumé comme tel ─────────────────────────
//
// Le savoir-faire 4 fait comprendre ce qu'est un carré. Celui-ci fait
// APPRENDRE les carrés, parce qu'ils reviendront partout — Pythagore en 4e,
// les racines carrées, le calcul mental. Deux sens de lecture, comme pour des
// tables : 13² = ?, puis 169 = ?².
//
// Les carrés de 13, 14 et 15 sont ceux qu'on ne retrouve pas « à l'oreille » ;
// ils ont chacun leur item, et le contrôle proposé les recalcule par
// distributivité (13 × 13 = 130 + 39), en écho au savoir-faire 6.

export default {
  id: 'sf-1-7',
  titre: 'Les carrés et les cubes à connaître',
  attendus: [
    'Il connaît les carrés des entiers de 0 à 15.',
    'Il connaît le cube de 10.',
    'Il écrit un nombre sous la forme d\'un carré ou d\'un cube.',
  ],

  decouvrir: {
    titre: 'Prolonger la liste des carrés',
    texte:
      'Tu connais sans doute 10² = 100. Pour les carrés suivants, on peut les '
      + 'calculer en distribuant : 11 × 11 = 11 × 10 + 11, et 12 × 12 = 12 × 10 + 12 × 2.',
    lignes: [
      { calcul: '11 × 10 + 11', resultat: '11²' },
      { calcul: '12 × 10 + 12 × 2', resultat: '12²' },
    ],
    question: 'Calcule ces deux carrés.',
    champs: [
      { id: 'a', etiquette: '11²', attendu: 121 },
      { id: 'b', etiquette: '12²', attendu: 144 },
    ],
    conclusion:
      '11² = **121** et 12² = **144**. Ces résultats reviennent si souvent qu\'on '
      + 'les apprend par cœur, comme les tables : tous les carrés jusqu\'à **15²**.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Les carrés de 0 à 15',
      texte:
        '0² = 0 · 1² = 1 · 2² = 4 · 3² = 9 · 4² = 16 · 5² = 25\n'
        + '6² = 36 · 7² = 49 · 8² = 64 · 9² = 81 · 10² = 100\n'
        + '11² = 121 · 12² = 144 · **13² = 169 · 14² = 196 · 15² = 225**',
    },
    {
      type: 'definition',
      titre: 'Le cube de 10, et les puissances de 10',
      texte:
        '**10³ = 10 × 10 × 10 = 1 000**.\n'
        + 'Pour les puissances de 10, l\'exposant compte les zéros : 10² = 100 '
        + '(deux zéros), 10³ = 1 000 (trois zéros).',
    },
    {
      type: 'remarque',
      titre: 'Écrire un nombre comme un carré ou un cube',
      texte:
        'On cherche le nombre qui, multiplié par lui-même, redonne le nombre :\n'
        + '81 = 9 × 9 = **9²**   ·   125 = 5 × 5 × 5 = **5³**   ·   1 000 = **10³**\n'
        + 'Certains nombres sont les deux : 64 = 8² = 4³.',
    },
    {
      type: 'exemple',
      texte: '13² = 169   ·   15² = 225   ·   10³ = 1 000   ·   196 = 14²   ·   27 = 3³',
    },
  ],

  methode: {
    titre: 'Écrire 169 comme un carré',
    enonce: 'Écrire 169 sous la forme d\'un carré.',
    etapes: [
      { texte: 'Je cherche un nombre qui, multiplié par lui-même, donne 169.', note: '' },
      { texte: '12² = 144, c\'est trop petit ; 14² = 196, c\'est trop grand.', note: 'La liste apprise sert de repère.' },
      { texte: 'J\'essaie 13 : 13 × 13 = 130 + 39 = 169.', note: 'Distribuer : 13 × 10 + 13 × 3.' },
      { texte: 'Donc 169 = 13².', note: '' },
    ],
    controle:
      'Le contrôle : un carré se vérifie par une multiplication. 13 × 13 doit '
      + 'redonner exactement 169.',
  },

  entrainement: [
    // ── Palier 1 : les carrés qu'on retrouve vite ──────────────────────────
    {
      id: 'e-1-7-1', type: 'calcul', palier: 1, piege: 'carre-inconnu',
      consigne: 'Calcule.', enonce: '7^2', attendu: 49,
      fausses: [{ valeur: 14, piege: 'carre-inconnu' }],
    },
    {
      id: 'e-1-7-2', type: 'calcul', palier: 1, piege: 'carre-inconnu',
      consigne: 'Calcule.', enonce: '12^2', attendu: 144,
      fausses: [{ valeur: 24, piege: 'carre-inconnu' }],
    },
    {
      id: 'e-1-7-3', type: 'calcul', palier: 1, piege: 'carre-inconnu',
      consigne: 'Calcule.', enonce: '10^3', attendu: 1000,
      fausses: [{ valeur: 30, piege: 'puissance-mal-lue' }, { valeur: 100, piege: 'carre-inconnu' }],
    },
    {
      // NEUTRE : le double, pas le carré. Jumeau de 12² = 144 — sans lui,
      // « un nombre et un 2, c'est un carré » deviendrait un réflexe.
      id: 'e-1-7-11', type: 'calcul', palier: 1, neutre: true, piege: 'carre-inconnu',
      consigne: 'Calcule le double de 12.', enonce: '12 \\times 2', attendu: 24,
      fausses: [{ valeur: 144, piege: 'carre-inconnu' }],
    },
    // ── Palier 2 : les carrés de 13 à 15, et le sens inverse ───────────────
    {
      id: 'e-1-7-4', type: 'calcul', palier: 2, piege: 'carre-inconnu',
      consigne: 'Calcule.', enonce: '14^2', attendu: 196,
      fausses: [{ valeur: 28, piege: 'carre-inconnu' }],
    },
    {
      id: 'e-1-7-5', type: 'calcul', palier: 2, piege: 'carre-inconnu',
      consigne: 'Calcule.', enonce: '15^2', attendu: 225,
      fausses: [{ valeur: 30, piege: 'carre-inconnu' }],
    },
    {
      id: 'e-1-7-6', type: 'trous', palier: 2, piege: 'carre-inconnu',
      consigne: 'Quel nombre, élevé au carré, donne 121 ?',
      enonce: '121 = \\square^2',
      champs: [{ id: 'a', etiquette: 'le nombre', attendu: 11 }],
    },
    {
      id: 'e-1-7-7', type: 'trous', palier: 2, piege: 'carre-inconnu',
      consigne: 'Quel nombre, élevé au cube, donne 125 ?',
      enonce: '125 = \\square^3',
      champs: [{ id: 'a', etiquette: 'le nombre', attendu: 5 }],
    },
    // ── Palier 3 : dans un calcul, et les nombres à double écriture ────────
    {
      id: 'e-1-7-8', type: 'trous', palier: 3, piege: 'carre-inconnu',
      consigne: 'Écris 64 comme un carré, puis comme un cube.',
      enonce: '64 = \\square^2 = \\square^3',
      champs: [
        { id: 'a', etiquette: 'le nombre au carré', attendu: 8 },
        { id: 'b', etiquette: 'le nombre au cube', attendu: 4 },
      ],
    },
    {
      id: 'e-1-7-9', type: 'calcul', palier: 3, piege: 'carre-inconnu',
      consigne: 'Calcule.', enonce: '13^2 - 10^2', attendu: 69,
      fausses: [{ valeur: 9, piege: 'carre-inconnu' }],
    },
    {
      id: 'e-1-7-10', type: 'calcul', palier: 3, piege: 'puissance-mal-lue',
      consigne: 'Calcule.', enonce: '2^3 + 10^3', attendu: 1008,
      fausses: [{ valeur: 36, piege: 'puissance-mal-lue' }],
    },
  ],

  problemes: [
    {
      id: 'p-1-7-1',
      enonce: 'Un carré mesure 13 cm de côté.',
      questions: [
        { texte: 'Quelle est son aire ?', attendu: 169, unite: 'cm²' },
        { texte: 'Quel est son périmètre ?', attendu: 52, unite: 'cm' },
      ],
    },
    {
      id: 'p-1-7-2',
      enonce: 'Un aquarium cubique mesure 10 dm d\'arête. On rappelle que 1 dm³ = 1 L.',
      questions: [
        { texte: 'Quel est son volume, en dm³ ?', attendu: 1000, unite: 'dm³' },
        { texte: 'Combien de litres d\'eau peut-il contenir ?', attendu: 1000, unite: 'L' },
      ],
    },
    {
      id: 'p-1-7-3',
      enonce: 'Un terrain carré a une aire de 225 m².',
      questions: [
        { texte: 'Combien mesure son côté ?', attendu: 15, unite: 'm' },
        { texte: 'Quelle longueur de clôture faut-il pour en faire le tour ?', attendu: 60, unite: 'm' },
      ],
    },
    {
      id: 'p-1-7-4',
      enonce: 'Un jardin carré mesure 12 m de côté. On y creuse un bassin carré de 5 m de côté.',
      questions: [
        { texte: 'Quelle est l\'aire du jardin ?', attendu: 144, unite: 'm²' },
        { texte: 'Quelle aire reste-t-il autour du bassin ?', attendu: 119, unite: 'm²' },
      ],
    },
    {
      id: 'p-1-7-5',
      enonce: 'Une boîte cubique mesure 3 cm d\'arête. On la remplit de petits cubes de 1 cm d\'arête.',
      questions: [
        { texte: 'Combien de petits cubes contient une boîte ?', attendu: 27, unite: 'cubes' },
        { texte: 'Combien en faut-il pour remplir 10 boîtes ?', attendu: 270, unite: 'cubes' },
      ],
    },
  ],

  test: [
    { id: 't-1-7-1', type: 'calcul', consigne: 'Calcule.', enonce: '11^2', attendu: 121, revoir: 'propriete' },
    { id: 't-1-7-2', type: 'calcul', consigne: 'Calcule.', enonce: '13^2', attendu: 169, revoir: 'propriete' },
    { id: 't-1-7-3', type: 'calcul', consigne: 'Calcule.', enonce: '15^2', attendu: 225, revoir: 'propriete' },
    { id: 't-1-7-4', type: 'calcul', consigne: 'Calcule.', enonce: '9^2', attendu: 81, revoir: 'propriete' },
    { id: 't-1-7-5', type: 'calcul', consigne: 'Calcule.', enonce: '10^3', attendu: 1000, revoir: 'definition' },
    { id: 't-1-7-6', type: 'calcul', consigne: 'Calcule.', enonce: '3^3', attendu: 27, revoir: 'remarque' },
    {
      id: 't-1-7-7', type: 'trous', consigne: 'Quel nombre, élevé au carré, donne 144 ?', enonce: '144 = \\square^2',
      champs: [{ id: 'a', etiquette: 'le nombre', attendu: 12 }], revoir: 'remarque',
    },
    {
      id: 't-1-7-8', type: 'trous', consigne: 'Quel est l\'exposant ?', enonce: '1000 = 10^{\\square}',
      champs: [{ id: 'a', etiquette: 'l\'exposant', attendu: 3 }], revoir: 'definition',
    },
    {
      id: 't-1-7-9', type: 'trous', consigne: 'Quel nombre, élevé au carré, donne 196 ?', enonce: '196 = \\square^2',
      champs: [{ id: 'a', etiquette: 'le nombre', attendu: 14 }], revoir: 'remarque',
    },
    { id: 't-1-7-10', type: 'calcul', consigne: 'Calcule.', enonce: '5^2 + 12^2', attendu: 169, revoir: 'exemple' },
  ],
};
