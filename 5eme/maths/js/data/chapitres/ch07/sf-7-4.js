// Chapitre 7, savoir-faire 4 — Calculer une expression avec les quatre opérations.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point 7 [EIB] de la liste de la professeure, réuni avec les chapitres 1
// et 5 : une fois les quatre opérations connues sur les relatifs, il faut
// les enchaîner dans un même calcul.
//
// ── Deux règles des signes dans une même ligne ───────────────────────────
//
// Dans (−3) + (−2) × (−4), la multiplication suit sa règle (deux négatifs,
// positif) et l'addition la sienne (signes contraires, on soustrait). La
// difficulté n'est dans aucune des deux : elle est de nommer l'opération
// avant de choisir la règle. Les réponses fausses prévues viennent de là,
// et des priorités oubliées du chapitre 1. Un item neutre ne contient
// qu'une addition, pour démasquer « moins et moins font plus » appliqué
// partout.

export default {
  id: 'sf-7-4',
  titre: 'Calculer une expression avec les quatre opérations',
  attendus: [
    'Il applique les priorités opératoires dans un calcul avec des relatifs.',
    'Il choisit la règle des signes de l\'opération qu\'il effectue : addition ou multiplication.',
    'Il résout un problème qui combine plusieurs opérations sur les relatifs.',
  ],

  decouvrir: {
    titre: 'Deux règles dans un même calcul',
    texte:
      'Dans le calcul (−3) + (−2) × (−4), il y a une addition et une multiplication. Les priorités '
      + 'du chapitre 1 s\'appliquent toujours : on commence par la multiplication.',
    question: 'Calcule d\'abord (−2) × (−4), puis le résultat du calcul entier.',
    champs: [
      { id: 'a', etiquette: '(−2) × (−4)', attendu: 8 },
      { id: 'b', etiquette: 'le calcul entier', attendu: 5 },
    ],
    conclusion:
      '(−2) × (−4) = **8**, avec la règle de la multiplication : deux signes identiques, un résultat '
      + 'positif. Puis (−3) + 8 = **5**, avec la règle de l\'addition : signes contraires, on '
      + 'soustrait les distances à zéro.\n'
      + 'Dans un même calcul, **chaque opération garde sa règle des signes**.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Les priorités ne changent pas',
      texte:
        'Avec des nombres relatifs, on calcule toujours dans cet ordre : d\'abord ce qui est entre '
        + 'parenthèses, puis les multiplications et les divisions, enfin les additions et les '
        + 'soustractions.',
    },
    {
      type: 'remarque',
      titre: 'Chaque opération a sa règle des signes',
      texte:
        'Addition : (−3) + (−4) = −7. Multiplication : (−3) × (−4) = 12.\n'
        + 'Avant d\'appliquer une règle des signes, on nomme l\'opération qu\'on est en train de faire.',
    },
    {
      type: 'exemple',
      texte: '(−3) + (−2) × (−4) = (−3) + 8 = 5   ·   [(−3) + (−2)] × (−4) = (−5) × (−4) = 20',
    },
  ],

  methode: {
    titre: 'Calculer 12 ÷ (−4) − 3 × (−2)',
    enonce: 'Calculer 12 ÷ (−4) − 3 × (−2).',
    etapes: [
      { texte: 'Je souligne les opérations prioritaires : 12 ÷ (−4) et 3 × (−2).', note: 'Division et multiplication passent avant la soustraction.' },
      { texte: '12 ÷ (−4) = −3, et 3 × (−2) = −6.', note: 'Règle des signes du quotient, puis du produit.' },
      { texte: 'Il reste (−3) − (−6) = (−3) + 6 = 3.', note: 'Soustraire, c\'est ajouter l\'opposé.' },
    ],
    controle:
      'Le contrôle : à chaque étape, nomme l\'opération à voix haute — « quotient », « produit », '
      + '« soustraction » — avant de décider du signe.',
  },

  entrainement: [
    // ── Palier 1 : une multiplication dans une addition ────────────────────
    {
      // NEUTRE : des positifs, les priorités du chapitre 1 seules.
      id: 'e-7-4-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '10 - 2 \\times 3', attendu: 4,
    },
    {
      id: 'e-7-4-2', type: 'calcul', palier: 1, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '(-3) + (-2) \\times 5', attendu: -13,
      // (−3) + (−2) calculé d'abord, puis × 5.
      fausses: [{ valeur: -25, piege: 'priorite-ignoree' }],
    },
    {
      id: 'e-7-4-3', type: 'calcul', palier: 1, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '4 \\times (-3) - 2', attendu: -14,
      // 4 × (−3 − 2) : la soustraction faite avant le produit.
      fausses: [{ valeur: -20, piege: 'priorite-ignoree' }],
    },
    {
      id: 'e-7-4-4', type: 'calcul', palier: 1, piege: 'regle-des-signes-produit',
      consigne: 'Calcule.', enonce: '(-6) \\times (-2) + (-5)', attendu: 7,
      // (−12) + (−5) : le produit de deux négatifs compté négatif.
      fausses: [{ valeur: -17, piege: 'regle-des-signes-produit' }],
    },
    // ── Palier 2 : quotients, plusieurs facteurs, parenthèses ──────────────
    {
      id: 'e-7-4-5', type: 'calcul', palier: 2, piege: 'regle-des-signes-quotient',
      consigne: 'Calcule.', enonce: '(-20) \\div (-4) - 7', attendu: -2,
      fausses: [{ valeur: -12, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-4-6', type: 'calcul', palier: 2, piege: 'nombre-de-negatifs',
      consigne: 'Calcule.', enonce: '(-2) \\times (-3) \\times (-1) + 10', attendu: 4,
      // 6 + 10 : trois facteurs négatifs comptés comme un produit positif.
      fausses: [{ valeur: 16, piege: 'nombre-de-negatifs' }],
    },
    {
      id: 'e-7-4-7', type: 'calcul', palier: 2, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '(-5 + 2) \\times (-4)', attendu: 12,
      // −5 + 2 × (−4) : la parenthèse ignorée.
      fausses: [{ valeur: -13, piege: 'priorite-ignoree' }],
    },
    {
      // NEUTRE : une addition seule. Celui qui applique « moins et moins font
      // plus » partout se trompe ici.
      id: 'e-7-4-8', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule.', enonce: '(-7) + (-3)', attendu: -10,
      fausses: [{ valeur: 10, piege: 'deux-negatifs-donnent-positif' }],
    },
    // ── Palier 3 : des calculs plus longs, et réfuter ──────────────────────
    {
      id: 'e-7-4-9', type: 'calcul', palier: 3, piege: 'regle-des-signes-quotient',
      consigne: 'Calcule.', enonce: '\\dfrac{(-8) \\times 3}{-6}', attendu: 4,
      fausses: [{ valeur: -4, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-4-10', type: 'calcul', palier: 3, piege: 'regle-des-signes-quotient',
      consigne: 'Calcule.', enonce: '3 - 2 \\times (-4) \\div (-8)', attendu: 2,
      // 3 − (−1) : le quotient de deux négatifs compté négatif.
      fausses: [{ valeur: 4, piege: 'regle-des-signes-quotient' }],
    },
    {
      id: 'e-7-4-11', type: 'vraifaux', palier: 3, piege: 'deux-negatifs-donnent-positif',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Dans un calcul, deux nombres négatifs donnent toujours un résultat positif.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve deux nombres négatifs dont la somme est négative.',
        champs: [{ id: 'a', etiquette: 'premier nombre' }, { id: 'b', etiquette: 'second nombre' }],
        valide: (a, b) => a < 0 && b < 0 && a + b < 0,
        exemple: '(−3) + (−4) = −7 : deux nombres négatifs, et un résultat négatif. La règle « positif » ne vaut que pour le produit et le quotient.',
      },
    },
    {
      id: 'e-7-4-12', type: 'calcul', palier: 3, piege: 'regle-des-signes-produit',
      consigne: 'Écris le score avec un nombre relatif.',
      enonce: 'Dans un jeu, une bonne réponse vaut 3 points et une mauvaise en retire 2. On a 5 bonnes réponses et 8 mauvaises. Quel est le score ?',
      attendu: -1,
      fausses: [
        // 15 + 16 : les points retirés ajoutés.
        { valeur: 31, piege: 'regle-des-signes-produit' },
        { valeur: 1, piege: 'signe-du-plus-grand' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-7-4-1',
      enonce: 'Voici les températures relevées cinq matins de suite : −4 °C, −1 °C, 2 °C, −6 °C et −1 °C.',
      questions: [
        { texte: 'Quelle est la somme de ces températures ?', attendu: -10, unite: '°C' },
        { texte: 'Quelle est la température moyenne, c\'est-à-dire cette somme divisée par 5 ?', attendu: -2, unite: '°C' },
      ],
    },
    {
      id: 'p-7-4-2',
      enonce:
        'Un programme de calcul : choisir un nombre, le multiplier par −3, ajouter 5 au résultat, '
        + 'puis multiplier le tout par −2.',
      questions: [
        { texte: 'Quel résultat obtient-on en choisissant 4 ?', attendu: 14 },
        { texte: 'Et en choisissant −1 ?', attendu: -16 },
      ],
    },
    {
      id: 'p-7-4-3',
      enonce: 'Un magasin perd 150 € par jour pendant 4 jours, puis gagne 220 € par jour pendant 3 jours.',
      questions: [
        { texte: 'Quel est le bilan des 4 premiers jours, écrit avec un nombre relatif ?', attendu: -600, unite: '€' },
        { texte: 'Quel est le bilan des 7 jours ?', attendu: 60, unite: '€' },
      ],
    },
    {
      id: 'p-7-4-4',
      enonce: 'Trois points de mesure sont aux altitudes −12 m, −30 m et 6 m.',
      questions: [
        { texte: 'Quelle est la somme de ces altitudes ?', attendu: -36, unite: 'm' },
        { texte: 'Quelle est leur altitude moyenne ?', attendu: -12, unite: 'm' },
      ],
    },
    {
      id: 'p-7-4-5',
      enonce:
        'Dans un quiz de 20 questions, une bonne réponse rapporte 4 points, une mauvaise en retire 3, '
        + 'et une question sans réponse ne rapporte rien. On a 9 bonnes réponses, 7 mauvaises et '
        + '4 questions sans réponse.',
      questions: [
        { texte: 'Combien de points rapportent les bonnes réponses ?', attendu: 36 },
        { texte: 'Quel est le score final ?', attendu: 15 },
      ],
    },
  ],

  test: [
    { id: 't-7-4-1', type: 'calcul', consigne: 'Calcule.', enonce: '(-2) + 3 \\times (-4)', attendu: -14, revoir: 'propriete' },
    { id: 't-7-4-2', type: 'calcul', consigne: 'Calcule.', enonce: '5 \\times (-2) - (-6)', attendu: -4, revoir: 'propriete' },
    { id: 't-7-4-3', type: 'calcul', consigne: 'Calcule.', enonce: '(-18) \\div 3 + 7', attendu: 1, revoir: 'propriete' },
    { id: 't-7-4-4', type: 'calcul', consigne: 'Calcule.', enonce: '(-4 - 1) \\times (-3)', attendu: 15, revoir: 'propriete' },
    { id: 't-7-4-5', type: 'calcul', consigne: 'Calcule.', enonce: '(-1) \\times (-2) \\times (-3) - 4', attendu: -10, revoir: 'propriete' },
    { id: 't-7-4-6', type: 'calcul', consigne: 'Calcule.', enonce: '2 - 3 \\times (-2)', attendu: 8, revoir: 'propriete' },
    { id: 't-7-4-7', type: 'calcul', consigne: 'Calcule.', enonce: '\\dfrac{-12}{4} - 1', attendu: -4, revoir: 'propriete' },
    { id: 't-7-4-8', type: 'calcul', consigne: 'Calcule.', enonce: '(-6) + (-6)', attendu: -12, revoir: 'remarque' },
    { id: 't-7-4-9', type: 'calcul', consigne: 'Calcule.', enonce: '(-6) \\times (-6)', attendu: 36, revoir: 'remarque' },
    {
      id: 't-7-4-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Dans le calcul (−3) + 2 × (−5), on commence par la multiplication.', attendu: true, revoir: 'propriete',
    },
  ],
};
