// Chapitre 5, savoir-faire 3 — Simplifier l'écriture d'une somme.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// De deux points de la liste de la professeure : « parenthèses
// indispensables » et « simplifier des sommes avec parenthèses ».
//
// ── Une question de forme, pas de valeur ─────────────────────────────────
//
// (+8) + (−6) et 8 + 6 n'ont pas la même valeur, mais 8 − 6 et 8 + (−6) si :
// ce qui est jugé ici, c'est l'ÉCRITURE. Un champ numérique ne saurait pas la
// juger — le type `expression` non plus, qui compare des valeurs. Les
// écritures se choisissent donc en QCM, parmi les simplifications fautives
// qu'on attend ; les calculs, eux, se font en saisie libre.

export default {
  id: 'sf-5-3',
  titre: 'Simplifier l\'écriture d\'une somme',
  attendus: [
    'Il sait que deux signes ne se suivent jamais, et place les parenthèses indispensables.',
    'Il supprime les parenthèses d\'une somme de relatifs.',
    'Il passe de l\'écriture simplifiée à l\'écriture avec parenthèses, et inversement.',
  ],

  decouvrir: {
    titre: 'Deux écritures du même calcul',
    texte:
      'Le calcul (+7) + (−4) − (−2) − (+5) est long à écrire. On le transforme en deux étapes, '
      + 'sans changer sa valeur.',
    lignes: [
      { calcul: '(+7) + (−4) − (−2) − (+5)', resultat: '(+7) + (−4) + (+2) + (−5)' },
      { calcul: 'Sans parenthèses', resultat: '7 − 4 + 2 − 5' },
    ],
    question: 'Calcule la valeur de ce calcul.',
    champs: [{ id: 'a', etiquette: 'valeur', attendu: 0 }],
    conclusion:
      '7 − 4 + 2 − 5 = **0**.\n'
      + 'On a d\'abord transformé les soustractions en additions, puis **supprimé les '
      + 'parenthèses** et les signes + des additions : chaque nombre garde **son** signe, écrit '
      + 'juste devant lui.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Les parenthèses indispensables',
      texte:
        'Deux signes ne se suivent jamais. On écrit **5 + (−3)**, pas 5 + −3 : la parenthèse '
        + 'sépare le signe de l\'opération du signe du nombre.',
    },
    {
      type: 'propriete',
      titre: 'Supprimer les parenthèses',
      texte:
        'Dans une somme de relatifs, on supprime les parenthèses et le signe + de l\'addition ; '
        + 'chaque nombre garde son signe.\n'
        + '(+7) + (−4) + (+2) = 7 − 4 + 2\n'
        + 'S\'il y a des soustractions, on les transforme d\'abord en additions.',
    },
    {
      type: 'remarque',
      titre: 'Les quatre cas',
      texte:
        '+ (+a) s\'écrit + a   ·   + (−a) s\'écrit − a   ·   − (+a) s\'écrit − a   ·   − (−a) '
        + 's\'écrit + a\n'
        + 'Deux signes **identiques** donnent **+**, deux signes **contraires** donnent **−**. '
        + 'Cette règle ne concerne que deux signes qui se suivent : la somme de deux négatifs, '
        + 'elle, reste négative.',
    },
    {
      type: 'remarque',
      titre: 'Lire une écriture simplifiée',
      texte:
        'Dans 7 − 4 + 2, chaque nombre porte le signe écrit **juste devant lui** : c\'est la somme '
        + 'de (+7), de (−4) et de (+2).',
    },
    {
      type: 'exemple',
      texte: '(+5) − (−3) + (−8) = 5 + 3 − 8 = 0',
    },
  ],

  methode: {
    titre: 'Simplifier puis calculer (−6) − (+4) + (−1) − (−9)',
    enonce: 'Calculer (−6) − (+4) + (−1) − (−9).',
    etapes: [
      {
        texte: 'Je remplace chaque soustraction par l\'addition de l\'opposé : (−6) + (−4) + (−1) + (+9).',
        note: '',
      },
      {
        texte: 'Je supprime les parenthèses et les + des additions : −6 − 4 − 1 + 9.',
        note: 'Chaque nombre garde son signe.',
      },
      { texte: 'Je calcule : −6 − 4 − 1 = −11, puis −11 + 9 = −2.', note: '' },
    ],
    controle:
      'Le contrôle : l\'écriture simplifiée doit compter autant de nombres qu\'au départ, '
      + 'chacun précédé d\'un seul signe.',
  },

  entrainement: [
    // ── Palier 1 : choisir la bonne écriture ───────────────────────────────
    {
      // NEUTRE : deux positifs, rien ne change de signe.
      id: 'e-5-3-1', type: 'choix', palier: 1, neutre: true,
      consigne: 'Quelle est l\'écriture simplifiée de cette somme ?', enonce: '(+5) + (+3)',
      choix: ['5 + 3', '5 − 3', '−5 + 3'], attendu: '5 + 3',
    },
    {
      id: 'e-5-3-2', type: 'choix', palier: 1, piege: 'double-signe-mal-simplifie',
      consigne: 'Quelle est l\'écriture simplifiée de cette somme ?', enonce: '(+8) + (-6)',
      choix: ['8 + 6', '8 − 6', '−8 − 6'], attendu: '8 − 6',
      fausses: [
        { valeur: '8 + 6', piege: 'double-signe-mal-simplifie' },
        { valeur: '−8 − 6', piege: 'double-signe-mal-simplifie' },
      ],
    },
    {
      id: 'e-5-3-3', type: 'choix', palier: 1, piege: 'double-signe-mal-simplifie',
      consigne: 'Quelle est l\'écriture simplifiée de ce calcul ?', enonce: '(-2) - (-7)',
      choix: ['−2 − 7', '2 + 7', '−2 + 7'], attendu: '−2 + 7',
      fausses: [
        { valeur: '−2 − 7', piege: 'double-signe-mal-simplifie' },
        { valeur: '2 + 7', piege: 'double-signe-mal-simplifie' },
      ],
    },
    {
      id: 'e-5-3-4', type: 'choix', palier: 1, piege: 'double-signe-mal-simplifie',
      consigne: 'Quelle écriture est correcte ?', enonce: 'La somme de 9 et de −4.',
      choix: ['9 + −4', '9 + (+4)', '9 + (−4)'], attendu: '9 + (−4)',
      fausses: [
        { valeur: '9 + −4', piege: 'double-signe-mal-simplifie' },
        { valeur: '9 + (+4)', piege: 'signe-oublie' },
      ],
    },
    // ── Palier 2 : simplifier pour calculer ────────────────────────────────
    {
      id: 'e-5-3-5', type: 'calcul', palier: 2, piege: 'double-signe-mal-simplifie',
      consigne: 'Simplifie l\'écriture, puis calcule.', enonce: '(+4) - (-3) + (-5)', attendu: 2,
      // 4 − 3 − 5 : le « − (−3) » simplifié en « − 3 ».
      fausses: [{ valeur: -4, piege: 'double-signe-mal-simplifie' }],
    },
    {
      id: 'e-5-3-6', type: 'calcul', palier: 2, piege: 'double-signe-mal-simplifie',
      consigne: 'Simplifie l\'écriture, puis calcule.', enonce: '(-7) + (+2) - (+6)', attendu: -11,
      // −7 + 2 + 6 : le « − (+6) » simplifié en « + 6 ».
      fausses: [{ valeur: 1, piege: 'double-signe-mal-simplifie' }],
    },
    {
      id: 'e-5-3-7', type: 'choix', palier: 2, piege: 'double-signe-mal-simplifie',
      consigne: 'Quelle est l\'écriture simplifiée de ce calcul ?', enonce: '(-3) + (+4) - (-1) - (+8)',
      choix: ['−3 + 4 − 1 − 8', '−3 + 4 + 1 − 8', '3 + 4 + 1 + 8'], attendu: '−3 + 4 + 1 − 8',
      fausses: [
        { valeur: '−3 + 4 − 1 − 8', piege: 'double-signe-mal-simplifie' },
        { valeur: '3 + 4 + 1 + 8', piege: 'signe-oublie' },
      ],
    },
    {
      // NEUTRE : déjà simplifié, il n'y a plus qu'à lire les signes.
      id: 'e-5-3-8', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule.', enonce: '5 - 8 + 2', attendu: -1,
      // 5 − (8 + 2) : le « − » étendu au 2.
      fausses: [{ valeur: -5, piege: 'signe-detache-du-nombre' }],
    },
    // ── Palier 3 : l'aller-retour entre les deux écritures ─────────────────
    {
      id: 'e-5-3-9', type: 'choix', palier: 3, piege: 'signe-detache-du-nombre',
      consigne: 'De quelle somme cette écriture est-elle la forme simplifiée ?', enonce: '6 - 9 - 2',
      choix: ['(+6) + (−9) + (+2)', '(−6) + (−9) + (−2)', '(+6) + (−9) + (−2)'],
      attendu: '(+6) + (−9) + (−2)',
      fausses: [
        { valeur: '(+6) + (−9) + (+2)', piege: 'signe-detache-du-nombre' },
        { valeur: '(−6) + (−9) + (−2)', piege: 'signe-detache-du-nombre' },
      ],
    },
    {
      id: 'e-5-3-10', type: 'calcul', palier: 3, piege: 'double-signe-mal-simplifie',
      consigne: 'Simplifie l\'écriture, puis calcule.', enonce: '-3 - (-3) + (-3) - (+3)', attendu: -6,
      fausses: [{ valeur: -12, piege: 'double-signe-mal-simplifie' }],
    },
    {
      id: 'e-5-3-11', type: 'vraifaux', palier: 3, piege: 'signe-detache-du-nombre',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Dans l\'écriture 8 − 3 + 5, le nombre 5 est positif.',
      attendu: true,
    },
    {
      id: 'e-5-3-12', type: 'vraifaux', palier: 3, piege: 'double-signe-mal-simplifie',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le calcul 4 − (−2) peut s\'écrire 4 + 2.',
      attendu: true,
    },
  ],

  problemes: [
    {
      id: 'p-5-3-1',
      enonce:
        'Un commerçant note ses gains et ses pertes de la semaine, en euros : lundi +120, mardi '
        + '−45, mercredi −80, jeudi +35.',
      questions: [
        { texte: 'Écris le bilan comme une somme simplifiée et calcule-le. Quel est le bilan de la semaine ?', attendu: 30, unite: '€' },
      ],
    },
    {
      id: 'p-5-3-2',
      enonce:
        'Un ascenseur part du rez-de-chaussée, le niveau 0. Il fait les trajets suivants, en '
        + 'niveaux : +5, −7, +3, −4.',
      questions: [
        { texte: 'À quel niveau est-il à la fin ?', attendu: -3 },
        { texte: 'Combien de niveaux a-t-il parcourus en tout, en montant et en descendant ?', attendu: 19 },
      ],
    },
    {
      id: 'p-5-3-3',
      enonce: 'Un programme de calcul : on part d\'un nombre, on ajoute −6, on soustrait −10, puis on soustrait 3.',
      questions: [
        { texte: 'Quel nombre obtient-on en partant de −4 ?', attendu: -3 },
        { texte: 'Quel nombre obtient-on en partant de 5 ?', attendu: 6 },
      ],
    },
    {
      id: 'p-5-3-4',
      enonce:
        'À minuit, il fait −2 °C. Ensuite, la température varie de −3 degrés, puis de +8, puis '
        + 'de −1, d\'heure en heure.',
      questions: [
        { texte: 'Quelle température fait-il à la fin ?', attendu: 2, unite: '°C' },
        { texte: 'Quelle a été la température la plus basse ?', attendu: -5, unite: '°C' },
      ],
    },
    {
      id: 'p-5-3-5',
      enonce:
        'Dans un jeu de plateau, un pion part de la case 10 et se déplace selon les cartes '
        + 'tirées : +6, −2, −5, +4, −1.',
      questions: [
        { texte: 'Sur quelle case arrive-t-il ?', attendu: 12 },
        { texte: 'De combien de cases a-t-il avancé, au bilan ?', attendu: 2 },
      ],
    },
  ],

  test: [
    {
      id: 't-5-3-1', type: 'choix', consigne: 'Quelle est l\'écriture simplifiée de cette somme ?', enonce: '(+6) + (-2)',
      choix: ['6 + 2', '6 − 2', '−6 − 2'], attendu: '6 − 2', revoir: 'propriete',
    },
    {
      id: 't-5-3-2', type: 'choix', consigne: 'Quelle est l\'écriture simplifiée de ce calcul ?', enonce: '(-4) - (-1)',
      choix: ['−4 + 1', '−4 − 1', '4 + 1'], attendu: '−4 + 1', revoir: 'remarque',
    },
    {
      id: 't-5-3-3', type: 'choix', consigne: 'Quelle est l\'écriture simplifiée de ce calcul ?', enonce: '(+3) - (+7)',
      choix: ['3 + 7', '−3 − 7', '3 − 7'], attendu: '3 − 7', revoir: 'remarque',
    },
    {
      id: 't-5-3-4', type: 'choix', consigne: 'Quelle écriture est correcte ?', enonce: 'La somme de −5 et de −2.',
      choix: ['−5 + −2', '−5 + (−2)', '(−5) + 2'], attendu: '−5 + (−2)', revoir: 'propriete',
    },
    { id: 't-5-3-5', type: 'calcul', consigne: 'Simplifie l\'écriture, puis calcule.', enonce: '(+9) - (-2) + (-4)', attendu: 7, revoir: 'propriete' },
    { id: 't-5-3-6', type: 'calcul', consigne: 'Simplifie l\'écriture, puis calcule.', enonce: '(-1) - (+5) - (-8)', attendu: 2, revoir: 'propriete' },
    { id: 't-5-3-7', type: 'calcul', consigne: 'Calcule.', enonce: '7 - 10 + 1', attendu: -2, revoir: 'remarque' },
    { id: 't-5-3-8', type: 'calcul', consigne: 'Calcule.', enonce: '-2 - 3 - 4', attendu: -9, revoir: 'remarque' },
    {
      id: 't-5-3-9', type: 'choix', consigne: 'De quelle somme cette écriture est-elle la forme simplifiée ?', enonce: '-5 + 8 - 1',
      choix: ['(−5) + (+8) + (−1)', '(+5) + (+8) + (−1)', '(−5) + (−8) + (−1)'], attendu: '(−5) + (+8) + (−1)', revoir: 'remarque',
    },
    {
      id: 't-5-3-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'L\'écriture 6 + −2 est correcte.', attendu: false, revoir: 'propriete',
    },
  ],
};
