// Chapitre 5, savoir-faire 2 — Soustraire un nombre relatif.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point « soustraire » de la liste de la professeure. La règle tient en
// une ligne — soustraire, c'est ajouter l'opposé — et elle ramène tout au
// savoir-faire précédent.
//
// ── Ce que l'erreur type fait vraiment ───────────────────────────────────
//
// 6 − (−4) = 2 : l'élève « enlève 4 », comme il le fait depuis le CP. Il n'a
// pas oublié la règle, il ne voit pas qu'elle s'applique : un moins devant
// une parenthèse ressemble à une soustraction ordinaire. Le geste proposé
// est donc de TOUJOURS réécrire en addition avant de calculer, même quand ça
// semble inutile — c'est l'item neutre (−6) − (+3) qui le rappelle.

export default {
  id: 'sf-5-2',
  titre: 'Soustraire un nombre relatif',
  attendus: [
    'Il sait que soustraire un nombre, c\'est ajouter son opposé.',
    'Il transforme une soustraction en addition, puis la calcule.',
    'Il calcule une différence dont le résultat est négatif.',
  ],

  decouvrir: {
    titre: 'L\'écart de température',
    texte:
      'Le matin, le thermomètre indique −3 °C ; l\'après-midi, 5 °C. Pour trouver de combien '
      + 'la température a monté, on calcule 5 − (−3).',
    figure: { modele: 'droite', min: -4, max: 6, pas: 1, points: { M: -3, A: 5 } },
    question: 'Compte sur la droite graduée : de combien de degrés la température a-t-elle monté ?',
    champs: [{ id: 'a', etiquette: 'en degrés', attendu: 8 }],
    conclusion:
      'Elle a monté de **8** degrés : 3 pour remonter jusqu\'à 0, puis 5. Donc '
      + '**5 − (−3) = 8**, exactement comme **5 + (+3)**.\n'
      + '**Soustraire un nombre, c\'est ajouter son opposé.**',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Soustraire, c\'est ajouter l\'opposé',
      texte:
        'Pour soustraire un nombre relatif, on **ajoute son opposé**.\n'
        + '5 − (−3) = 5 + (+3) = 8   ·   (−2) − (+6) = (−2) + (−6) = −8',
    },
    {
      type: 'remarque',
      titre: 'Deux signes changent, pas un',
      texte:
        'On change **deux** choses à la fois : le signe de l\'opération (− devient +) et le '
        + 'nombre qui suit (il devient son opposé). Le premier nombre, lui, ne change pas.',
    },
    {
      type: 'remarque',
      titre: 'Une différence peut être négative',
      texte:
        '3 − 8 = 3 + (−8) = −5. On peut enlever 8 à 3 : on passe sous zéro.',
    },
    {
      type: 'exemple',
      texte: '7 − (+2) = 7 + (−2) = 5   ·   7 − (−2) = 7 + (+2) = 9   ·   (−7) − (−2) = (−7) + (+2) = −5',
    },
  ],

  methode: {
    titre: 'Calculer (−4) − (−9)',
    enonce: 'Calculer (−4) − (−9).',
    etapes: [
      {
        texte: 'Je transforme la soustraction en addition de l\'opposé : l\'opposé de −9 est +9.',
        note: 'Le premier nombre, −4, ne bouge pas.',
      },
      { texte: '(−4) − (−9) = (−4) + (+9).', note: '' },
      {
        texte: 'Signes contraires : 9 − 4 = 5, et +9 est le plus éloigné de zéro. Le résultat est positif.',
        note: '',
      },
      { texte: 'Donc (−4) − (−9) = +5.', note: '' },
    ],
    controle:
      'Le contrôle : une soustraction se vérifie par une addition. (+5) + (−9) doit redonner '
      + '−4 : c\'est bien le cas.',
  },

  entrainement: [
    // ── Palier 1 : l'opposé, une fois pour toutes ──────────────────────────
    {
      // NEUTRE : la soustraction de toujours, résultat positif.
      id: 'e-5-2-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '12 - (+5)', attendu: 7,
    },
    {
      id: 'e-5-2-2', type: 'calcul', palier: 1, piege: 'soustraction-sans-oppose',
      consigne: 'Calcule.', enonce: '6 - (-4)', attendu: 10,
      fausses: [{ valeur: 2, piege: 'soustraction-sans-oppose' }],
    },
    {
      id: 'e-5-2-3', type: 'trous', palier: 1, piege: 'soustraction-sans-oppose',
      consigne: 'Transforme en addition, puis calcule.', enonce: '(-3) - (+8)',
      champs: [
        { id: 'a', etiquette: 'l\'opposé de +8', attendu: -8 },
        { id: 'b', etiquette: 'le résultat', attendu: -11 },
      ],
      fausses: [
        { valeur: 8, piege: 'soustraction-sans-oppose' },
        { valeur: -5, piege: 'distances-mal-combinees' },
        { valeur: 11, piege: 'signe-du-plus-grand' },
      ],
    },
    {
      id: 'e-5-2-4', type: 'calcul', palier: 1, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '4 - 9', attendu: -5,
      fausses: [{ valeur: 5, piege: 'signe-du-plus-grand' }],
    },
    // ── Palier 2 : deux négatifs, des décimaux ─────────────────────────────
    {
      id: 'e-5-2-5', type: 'calcul', palier: 2, piege: 'soustraction-sans-oppose',
      consigne: 'Calcule.', enonce: '(-5) - (-5)', attendu: 0,
      fausses: [{ valeur: -10, piege: 'soustraction-sans-oppose' }],
    },
    {
      id: 'e-5-2-6', type: 'calcul', palier: 2, piege: 'soustraction-sans-oppose',
      consigne: 'Calcule.', enonce: '(-7) - (-2)', attendu: -5,
      fausses: [
        { valeur: -9, piege: 'soustraction-sans-oppose' },
        { valeur: 5, piege: 'signe-du-plus-grand' },
      ],
    },
    {
      id: 'e-5-2-7', type: 'calcul', palier: 2, piege: 'soustraction-sans-oppose',
      consigne: 'Calcule.', enonce: '2{,}5 - (-1{,}5)', attendu: 4,
      fausses: [{ valeur: 1, piege: 'soustraction-sans-oppose' }],
    },
    {
      // NEUTRE : ici, « enlever 3 » donne le bon résultat. Réécrire en
      // addition reste le bon geste, même quand il ne change rien.
      id: 'e-5-2-8', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule.', enonce: '(-6) - (+3)', attendu: -9,
      fausses: [{ valeur: -3, piege: 'soustraction-sans-oppose' }],
    },
    // ── Palier 3 : reconnaître l'addition, réfuter, mesurer un écart ───────
    {
      id: 'e-5-2-9', type: 'choix', palier: 3, piege: 'soustraction-sans-oppose',
      consigne: 'Quelle addition est égale à cette soustraction ?', enonce: '8 - (-3)',
      choix: ['8 + (−3)', '8 + (+3)', '(−8) + (+3)'], attendu: '8 + (+3)',
      fausses: [
        { valeur: '8 + (−3)', piege: 'soustraction-sans-oppose' },
        { valeur: '(−8) + (+3)', piege: 'soustraction-sans-oppose' },
      ],
    },
    {
      id: 'e-5-2-10', type: 'vraifaux', palier: 3, piege: 'soustraction-sans-oppose',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Une différence a − b est toujours plus petite que le nombre a.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve deux nombres a et b tels que a − b soit plus grand que a.',
        champs: [{ id: 'a', etiquette: 'a' }, { id: 'b', etiquette: 'b' }],
        valide: (a, b) => a - b > a,
        exemple: '5 − (−2) = 7, qui est plus grand que 5.',
      },
    },
    {
      id: 'e-5-2-11', type: 'calcul', palier: 3, piege: 'soustraction-sans-oppose',
      consigne: 'Réponds en degrés.',
      enonce: 'Il fait 4 °C à midi et −6 °C à minuit. De combien de degrés la température a-t-elle baissé ?',
      attendu: 10,
      fausses: [
        { valeur: 2, piege: 'soustraction-sans-oppose' },
        { valeur: -2, piege: 'soustraction-sans-oppose' },
      ],
    },
    {
      id: 'e-5-2-12', type: 'calcul', palier: 3, piege: 'soustraction-sans-oppose',
      consigne: 'Réponds en mètres.',
      enonce: 'Quelle différence d\'altitude y a-t-il entre un sommet à 1 250 m et le fond d\'une grotte à −340 m ?',
      attendu: 1590,
      fausses: [{ valeur: 910, piege: 'soustraction-sans-oppose' }],
    },
  ],

  problemes: [
    {
      id: 'p-5-2-1',
      enonce:
        'En France, le record de chaleur est d\'environ 46 °C, et le record de froid d\'environ '
        + '−41 °C.',
      questions: [
        { texte: 'Quel est l\'écart entre ces deux records ?', attendu: 87, unite: '°C' },
        { texte: 'Un jour d\'hiver, il fait −12 °C. De combien de degrés est-on au-dessus du record de froid ?', attendu: 29, unite: '°C' },
      ],
    },
    {
      id: 'p-5-2-2',
      enonce: 'Sur une frise, un roi naît en l\'an −412 et meurt en l\'an −357.',
      questions: [
        { texte: 'Combien d\'années a-t-il vécu ?', attendu: 55, unite: 'ans' },
        { texte: 'Combien d\'années séparent sa naissance de l\'an −300 ?', attendu: 112, unite: 'ans' },
      ],
    },
    {
      id: 'p-5-2-3',
      enonce: 'Un ascenseur va du niveau 6 au niveau −2, puis remonte au niveau 3.',
      questions: [
        { texte: 'De combien de niveaux est-il d\'abord descendu ?', attendu: 8 },
        { texte: 'De combien de niveaux est-il ensuite monté ?', attendu: 5 },
      ],
    },
    {
      id: 'p-5-2-4',
      enonce:
        'Le 1er du mois, un compte affiche −18 € ; le 30, il affiche 47 €. Le mois suivant, il '
        + 'redescend à −9 €.',
      questions: [
        { texte: 'De combien le solde a-t-il augmenté pendant le premier mois ?', attendu: 65, unite: '€' },
        { texte: 'De combien a-t-il diminué le mois suivant ?', attendu: 56, unite: '€' },
      ],
    },
    {
      id: 'p-5-2-5',
      enonce: 'Un plongeur est à l\'altitude −23 m ; une mouette vole à 12 m au-dessus de la mer.',
      questions: [
        { texte: 'Quelle distance verticale les sépare ?', attendu: 35, unite: 'm' },
        { texte: 'Le plongeur remonte jusqu\'à −8 m. De combien de mètres est-il remonté ?', attendu: 15, unite: 'm' },
      ],
    },
  ],

  test: [
    { id: 't-5-2-1', type: 'calcul', consigne: 'Calcule.', enonce: '9 - (+4)', attendu: 5, revoir: 'propriete' },
    { id: 't-5-2-2', type: 'calcul', consigne: 'Calcule.', enonce: '9 - (-4)', attendu: 13, revoir: 'propriete' },
    { id: 't-5-2-3', type: 'calcul', consigne: 'Calcule.', enonce: '(-9) - (+4)', attendu: -13, revoir: 'propriete' },
    { id: 't-5-2-4', type: 'calcul', consigne: 'Calcule.', enonce: '(-9) - (-4)', attendu: -5, revoir: 'propriete' },
    { id: 't-5-2-5', type: 'calcul', consigne: 'Calcule.', enonce: '3 - 10', attendu: -7, revoir: 'remarque' },
    { id: 't-5-2-6', type: 'calcul', consigne: 'Calcule.', enonce: '(-1{,}5) - (-4)', attendu: 2.5, revoir: 'propriete' },
    { id: 't-5-2-7', type: 'calcul', consigne: 'Calcule.', enonce: '0 - (-6)', attendu: 6, revoir: 'propriete' },
    {
      id: 't-5-2-8', type: 'choix', consigne: 'Quelle addition est égale à cette soustraction ?', enonce: '(-5) - (+2)',
      choix: ['(−5) + (+2)', '(−5) + (−2)', '(+5) + (−2)'], attendu: '(−5) + (−2)', revoir: 'remarque',
    },
    {
      id: 't-5-2-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Soustraire un nombre revient à ajouter son opposé.', attendu: true, revoir: 'propriete',
    },
    {
      id: 't-5-2-10', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'Quel est l\'écart entre 7 °C et −5 °C ?', attendu: 12, revoir: 'propriete',
    },
  ],
};
