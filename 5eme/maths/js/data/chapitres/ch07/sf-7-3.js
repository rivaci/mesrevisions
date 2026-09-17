// Chapitre 7, savoir-faire 3 — Diviser des nombres relatifs.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point 7 [EIB] de la liste de la professeure : la division, pendant de
// la multiplication.
//
// ── Diviser, c'est défaire un produit ────────────────────────────────────
//
// La règle des signes du quotient n'a rien à apprendre de neuf : c'est celle
// du produit, parce qu'une division se vérifie par une multiplication. Le
// geste de contrôle est donc toujours le même — remultiplier. Le zéro a ses
// deux items : 0 divisé par un nombre (possible) et un nombre divisé par 0
// (impossible), qu'on confond volontiers.

const ZERO = ['0', '−9', 'c\'est impossible'];

export default {
  id: 'sf-7-3',
  titre: 'Diviser des nombres relatifs',
  attendus: [
    'Il connaît la règle des signes d\'un quotient.',
    'Il calcule le quotient de deux nombres relatifs.',
    'Il sait qu\'on ne divise pas par 0, et que 0 divisé par un nombre non nul vaut 0.',
  ],

  decouvrir: {
    titre: 'Défaire une multiplication',
    texte:
      'On sait que (−4) × (−3) = 12. Diviser, c\'est défaire une multiplication : 12 ÷ (−3) est le '
      + 'nombre qui, multiplié par −3, donne 12.',
    question: 'Combien vaut 12 ÷ (−3) ? Et 12 ÷ (−4) ?',
    champs: [
      { id: 'a', etiquette: '12 ÷ (−3)', attendu: -4 },
      { id: 'b', etiquette: '12 ÷ (−4)', attendu: -3 },
    ],
    conclusion:
      '12 ÷ (−3) = **−4**, car (−4) × (−3) = 12. De même, 12 ÷ (−4) = **−3**.\n'
      + 'Le quotient suit **la même règle des signes** que le produit.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'La règle des signes du quotient',
      texte:
        'Le quotient de deux nombres de **même signe** est **positif** ; celui de deux nombres de '
        + '**signes contraires** est **négatif**.\n'
        + '(−12) ÷ (−3) = 4   ·   (−12) ÷ 3 = −4   ·   12 ÷ (−3) = −4',
    },
    {
      type: 'propriete',
      titre: 'Zéro et la division',
      texte:
        '0 divisé par un nombre non nul vaut **0**.\n'
        + 'On ne peut **pas diviser par 0**.',
    },
    {
      type: 'remarque',
      titre: 'Vérifier par une multiplication',
      texte: 'a ÷ b = q quand q × b = a. Ainsi (−20) ÷ 4 = −5, car (−5) × 4 = −20.',
    },
    {
      type: 'exemple',
      texte: '(−18) ÷ (−6) = 3   ·   18 ÷ (−6) = −3   ·   0 ÷ (−6) = 0   ·   (−6) ÷ 0 : impossible',
    },
  ],

  methode: {
    titre: 'Calculer (−4,8) ÷ (−0,6)',
    enonce: 'Calculer (−4,8) ÷ (−0,6).',
    etapes: [
      { texte: 'Le signe : les deux nombres ont le même signe, le quotient est positif.', note: '' },
      { texte: 'La valeur : 4,8 ÷ 0,6 = 48 ÷ 6 = 8.', note: 'Multiplier les deux nombres par 10 ne change pas le quotient.' },
      { texte: 'Donc (−4,8) ÷ (−0,6) = 8.', note: '' },
    ],
    controle: 'Le contrôle : 8 × (−0,6) = −4,8. On retrouve bien le nombre de départ.',
  },

  entrainement: [
    // ── Palier 1 : des entiers ─────────────────────────────────────────────
    {
      // NEUTRE : deux positifs.
      id: 'e-7-3-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '35 \\div 7', attendu: 5,
    },
    {
      id: 'e-7-3-2', type: 'calcul', palier: 1, piege: 'regle-des-signes-quotient',
      consigne: 'Calcule.', enonce: '(-36) \\div (-4)', attendu: 9,
      fausses: [{ valeur: -9, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-3-3', type: 'calcul', palier: 1, piege: 'regle-des-signes-quotient',
      consigne: 'Calcule.', enonce: '(-42) \\div 6', attendu: -7,
      fausses: [{ valeur: 7, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-3-4', type: 'calcul', palier: 1, piege: 'regle-des-signes-quotient',
      consigne: 'Calcule.', enonce: '56 \\div (-8)', attendu: -7,
      // Le signe du nombre divisé, gardé tel quel.
      fausses: [{ valeur: 7, piege: 'regle-des-signes-quotient' }],
    },
    // ── Palier 2 : des décimaux, et le zéro ────────────────────────────────
    {
      id: 'e-7-3-5', type: 'signe', palier: 2, piege: 'regle-des-signes-quotient',
      consigne: 'Quel est le signe de ce quotient ?', enonce: '(-7{,}5) \\div (-2{,}5)', attendu: 'positif',
      fausses: [{ valeur: 'négatif', piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-3-6', type: 'calcul', palier: 2, piege: 'regle-des-signes-quotient',
      consigne: 'Calcule.', enonce: '(-4{,}5) \\div 0{,}9', attendu: -5,
      fausses: [{ valeur: 5, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-3-7', type: 'choix', palier: 2, piege: 'division-par-zero',
      consigne: 'Combien vaut ce quotient ?', enonce: '0 \\div (-9)',
      choix: ZERO, attendu: '0',
      fausses: [
        { valeur: 'c\'est impossible', piege: 'division-par-zero' },
        { valeur: '−9', piege: 'division-par-zero' },
      ],
    },
    {
      id: 'e-7-3-8', type: 'choix', palier: 2, piege: 'division-par-zero',
      consigne: 'Combien vaut ce quotient ?', enonce: '(-9) \\div 0',
      choix: ZERO, attendu: 'c\'est impossible',
      fausses: [
        { valeur: '0', piege: 'division-par-zero' },
        { valeur: '−9', piege: 'division-par-zero' },
      ],
    },
    // ── Palier 3 : le nombre manquant, et réfuter ──────────────────────────
    {
      id: 'e-7-3-9', type: 'trous', palier: 3, piege: 'regle-des-signes-quotient',
      consigne: 'Complète avec le nombre qui manque.', enonce: '\\ldots \\div (-3) = 7',
      champs: [{ id: 'a', etiquette: 'le nombre manquant', attendu: -21 }],
      fausses: [{ valeur: 21, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-3-10', type: 'trous', palier: 3, piege: 'regle-des-signes-quotient',
      consigne: 'Complète avec le nombre qui manque.', enonce: '(-48) \\div \\ldots = 6',
      champs: [{ id: 'a', etiquette: 'le diviseur manquant', attendu: -8 }],
      fausses: [{ valeur: 8, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-3-11', type: 'vraifaux', palier: 3, piege: 'regle-des-signes-quotient',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Quand on divise un nombre par 2, on obtient toujours un nombre plus petit.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve un nombre dont la moitié est plus grande que lui.',
        champs: [{ id: 'a', etiquette: 'le nombre' }],
        valide: (a) => a / 2 > a,
        exemple: '−6 : sa moitié, −3, est plus grande que −6.',
      },
    },
    {
      id: 'e-7-3-12', type: 'calcul', palier: 3, piege: 'signe-oublie',
      consigne: 'Écris la variation avec un nombre relatif, en mètres.',
      enonce: 'Un plongeur descend régulièrement de 18 m en 6 minutes. De combien son altitude varie-t-elle en une minute ?',
      attendu: -3,
      fausses: [{ valeur: 3, piege: 'signe-oublie' }],
    },
  ],

  problemes: [
    {
      id: 'p-7-3-1',
      enonce: 'En 5 heures, la température a baissé régulièrement de 12 °C au total.',
      questions: [
        { texte: 'Quelle a été la variation de température par heure, écrite avec un nombre relatif ?', attendu: -2.4, unite: '°C' },
        { texte: 'Et en 10 minutes ?', attendu: -0.4, unite: '°C' },
      ],
    },
    {
      id: 'p-7-3-2',
      enonce: 'Les températures de quatre matins sont −6 °C, −2 °C, 3 °C et −7 °C.',
      questions: [
        { texte: 'Quelle est leur somme ?', attendu: -12, unite: '°C' },
        { texte: 'Quelle est leur moyenne, c\'est-à-dire cette somme divisée par 4 ?', attendu: -3, unite: '°C' },
      ],
    },
    {
      id: 'p-7-3-3',
      enonce: 'Trois amis partagent à parts égales une dette commune de 48 €. On écrit une dette avec un nombre négatif.',
      questions: [{ texte: 'Quelle est la part de chacun ?', attendu: -16, unite: '€' }],
    },
    {
      id: 'p-7-3-4',
      enonce: 'Un ballon-sonde perd 1 350 m d\'altitude en 9 minutes, à vitesse constante.',
      questions: [
        { texte: 'Quelle est sa variation d\'altitude par minute ?', attendu: -150, unite: 'm' },
        { texte: 'Et en 4 minutes ?', attendu: -600, unite: 'm' },
      ],
    },
    {
      id: 'p-7-3-5',
      enonce: 'On multiplie un nombre mystère par −6, et on obtient 4,2.',
      questions: [{ texte: 'Quel est le nombre mystère ?', attendu: -0.7 }],
    },
  ],

  test: [
    { id: 't-7-3-1', type: 'calcul', consigne: 'Calcule.', enonce: '(-63) \\div (-9)', attendu: 7, revoir: 'propriete' },
    { id: 't-7-3-2', type: 'calcul', consigne: 'Calcule.', enonce: '(-63) \\div 9', attendu: -7, revoir: 'propriete' },
    { id: 't-7-3-3', type: 'calcul', consigne: 'Calcule.', enonce: '63 \\div (-9)', attendu: -7, revoir: 'propriete' },
    { id: 't-7-3-4', type: 'calcul', consigne: 'Calcule.', enonce: '(-2{,}4) \\div (-0{,}8)', attendu: 3, revoir: 'propriete' },
    { id: 't-7-3-5', type: 'calcul', consigne: 'Calcule.', enonce: '0 \\div (-5)', attendu: 0, revoir: 'propriete' },
    {
      id: 't-7-3-6', type: 'choix', consigne: 'Combien vaut ce quotient ?', enonce: '(-5) \\div 0',
      choix: ['0', '−5', 'c\'est impossible'], attendu: 'c\'est impossible', revoir: 'propriete',
    },
    {
      id: 't-7-3-7', type: 'signe', consigne: 'Quel est le signe de ce quotient ?', enonce: '(-11) \\div 4',
      attendu: 'négatif', revoir: 'propriete',
    },
    {
      id: 't-7-3-8', type: 'trous', consigne: 'Complète avec le nombre qui manque.', enonce: '\\ldots \\div 5 = -6',
      champs: [{ id: 'a', etiquette: 'le nombre manquant', attendu: -30 }], revoir: 'remarque',
    },
    {
      id: 't-7-3-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Le quotient de deux nombres négatifs est positif.', attendu: true, revoir: 'propriete',
    },
    {
      id: 't-7-3-10', type: 'calcul', consigne: 'Écris la part avec un nombre relatif, en euros.',
      enonce: 'Une dette de 96 € est partagée à parts égales entre 4 personnes. Quelle est la part de chacune ?',
      attendu: -24, revoir: 'propriete',
    },
  ],
};
