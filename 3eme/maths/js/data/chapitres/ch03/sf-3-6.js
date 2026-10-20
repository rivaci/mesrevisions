// Chapitre 3, savoir-faire 6 — Factoriser avec les identités remarquables.
//
// Les identités lues de droite à gauche : 4 + 20x + 25x², 9x² − 24x + 16,
// 81 − 36x², (6x + 4)² − 81 de l'exercice 8 de la fiche d'Evan, et les deux
// « pour les champions » de l'exercice 9 où tout le carré est précédé d'un
// moins. Le piège visé est la mauvaise identité — un carré pour une
// différence de carrés —, l'item neutre une factorisation par un facteur
// commun, où aucune identité ne sert.
//
// Une factorisation par une identité peut laisser un nombre dans ses
// facteurs : 81 − 36x² = (9 − 6x)(9 + 6x) est juste, comme 9(3 − 2x)(3 + 2x).

export default {
  id: 'sf-3-6',
  titre: 'Factoriser avec les identités remarquables',
  attendus: [
    'Il reconnaît une expression de la forme a² + 2ab + b², a² − 2ab + b² ou a² − b².',
    'Il la factorise avec l\'identité qui convient.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'Les identités, de droite à gauche',
      texte:
        '**a² + 2ab + b² = (a + b)²**\n'
        + '**a² − 2ab + b² = (a − b)²**\n'
        + '**a² − b² = (a + b)(a − b)**',
    },
    {
      type: 'remarque',
      titre: 'Reconnaître la forme',
      texte:
        'Deux termes, deux carrés séparés par un moins : c\'est **a² − b²**. Trois termes, deux carrés et un '
        + 'double produit : c\'est **(a + b)²** ou **(a − b)²**, selon le signe du double produit.',
    },
    {
      type: 'exemple',
      texte: '4y² − 81 = (2y)² − 9² = (2y − 9)(2y + 9).',
    },
    {
      type: 'remarque',
      titre: 'Vérifier le double produit',
      texte: 'Pour 16a² + 8a + 1 : 16a² = (4a)², 1 = 1², et 2 × 4a × 1 = 8a. C\'est bien (4a + 1)².',
    },
  ],

  methode: {
    titre: 'Repérer a et b, puis vérifier',
    enonce: 'Factoriser B = (x + 3)² − 16.',
    etapes: [
      { texte: 'Deux carrés séparés par un moins : c\'est a² − b², avec a = x + 3 et b = 4.', note: '16 = 4².' },
      { texte: 'B = (x + 3 − 4)(x + 3 + 4).', note: 'a est toute la parenthèse.' },
      { texte: 'B = (x − 1)(x + 7).', note: '' },
    ],
    controle: 'Le contrôle : avec x = 0, (0 + 3)² − 16 = −7, et (0 − 1)(0 + 7) = −7.',
  },

  aSavoir: [
    {
      id: 'as-reconnaitre-identite',
      titre: 'Factoriser avec une identité',
      consigne: 'Écris les trois identités dans le sens de la factorisation, de la somme vers le produit.',
      enonce: '**a² + 2ab + b² = (a + b)²** ; **a² − 2ab + b² = (a − b)²** ; **a² − b² = (a + b)(a − b)**.',
      indice: 'a² + 2ab + b² = … ; a² − 2ab + b² = … ; a² − b² = …',
      elements: [
        { id: 'carre-somme', texte: 'a² + 2ab + b² = (a + b)²' },
        { id: 'carre-difference', texte: 'a² − 2ab + b² = (a − b)²' },
        { id: 'difference-carres', texte: 'a² − b² = (a + b)(a − b)' },
      ],
    },
  ],

  entrainement: [
    // ── Palier 1 : des formes directes ─────────────────────────────────────
    {
      id: 'e-3-6-1', type: 'litteral', palier: 1, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: 'x^2-49', forme: 'factorisee', attendu: '(x-7)(x+7)',
      fausses: [{ valeur: '(x-7)^2', piege: 'cl-identite-mal-choisie' }],
    },
    {
      id: 'e-3-6-2', type: 'litteral', palier: 1, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: 'x^2+6x+9', forme: 'factorisee', attendu: '(x+3)^2',
      fausses: [{ valeur: '(x+3)(x-3)', piege: 'cl-identite-mal-choisie' }, { valeur: '(x+9)^2', piege: 'cl-identite-mal-choisie' }],
    },
    {
      // NEUTRE : un facteur commun suffit, aucune identité ne sert. Le piège
      // joue chez qui cherche un carré partout.
      id: 'e-3-6-3', type: 'litteral', palier: 1, neutre: true, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: '4x^2+12x', forme: 'factorisee', attendu: '4x(x+3)',
      fausses: [{ valeur: '(2x+3)^2', piege: 'cl-identite-mal-choisie' }],
    },
    // ── Palier 2 : un nombre devant x ──────────────────────────────────────
    {
      id: 'e-3-6-4', type: 'litteral', palier: 2, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: '4+20x+25x^2', forme: 'factorisee', attendu: '(2+5x)^2',
      fausses: [{ valeur: '(2+5x)(2-5x)', piege: 'cl-identite-mal-choisie' }],
    },
    {
      id: 'e-3-6-5', type: 'litteral', palier: 2, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: '9x^2-24x+16', forme: 'factorisee', attendu: '(3x-4)^2',
      fausses: [{ valeur: '(3x+4)^2', piege: 'cl-signe-identite' }, { valeur: '(3x-4)(3x+4)', piege: 'cl-identite-mal-choisie' }],
    },
    {
      id: 'e-3-6-6', type: 'litteral', palier: 2, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: '81-36x^2', forme: 'factorisee', attendu: '(9-6x)(9+6x)',
      fausses: [{ valeur: '(9-6x)^2', piege: 'cl-identite-mal-choisie' }],
    },
    {
      id: 'e-3-6-7', type: 'litteral', palier: 2, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: '(6x+4)^2-81', forme: 'factorisee', attendu: '(6x-5)(6x+13)',
      fausses: [{ valeur: '(6x-77)(6x+85)', piege: 'cl-identite-mal-choisie' }],
    },
    // ── Palier 3 : des parenthèses, des fractions, un moins devant ─────────
    {
      id: 'e-3-6-8', type: 'litteral', palier: 3, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: '9x^2-48x+64', forme: 'factorisee', attendu: '(3x-8)^2',
      fausses: [{ valeur: '(3x-8)(3x+8)', piege: 'cl-identite-mal-choisie' }],
    },
    {
      id: 'e-3-6-9', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Factorise.', enonce: '(3x-5)^2-(5x+3)^2', forme: 'factorisee', attendu: '(-2x-8)(8x-2)',
      fausses: [{ valeur: '(-2x-2)(8x-2)', piege: 'cl-moins-devant-parenthese' }],
    },
    {
      id: 'e-3-6-10', type: 'litteral', palier: 3, piege: 'cl-identite-mal-choisie',
      consigne: 'Factorise.', enonce: '\\frac{9}{25}x^2+\\frac{14}{5}x+\\frac{49}{9}', forme: 'factorisee', attendu: '\\left(\\frac{3}{5}x+\\frac{7}{3}\\right)^2',
      fausses: [{ valeur: '\\left(\\frac{3}{5}x-\\frac{7}{3}\\right)^2', piege: 'cl-signe-identite' }],
    },
    {
      id: 'e-3-6-11', type: 'litteral', palier: 3, piege: 'cl-moins-en-facteur-oublie',
      consigne: 'Factorise. Commence par mettre −1 en facteur.', enonce: '-x^2+10x-25', forme: 'factorisee', attendu: '-(x-5)^2',
      fausses: [{ valeur: '(x-5)^2', piege: 'cl-moins-en-facteur-oublie' }, { valeur: '-(x+5)^2', piege: 'cl-signe-identite' }],
    },
  ],

  test: [
    { id: 't-3-6-1', type: 'litteral', consigne: 'Factorise.', enonce: 'x^2-100', forme: 'factorisee', attendu: '(x-10)(x+10)', fausses: [{ valeur: '(x-10)^2', piege: 'cl-identite-mal-choisie' }], revoir: 'propriete' },
    { id: 't-3-6-2', type: 'litteral', consigne: 'Factorise.', enonce: 'x^2-14x+49', forme: 'factorisee', attendu: '(x-7)^2', revoir: 'propriete' },
    { id: 't-3-6-3', type: 'litteral', consigne: 'Factorise.', enonce: '16x^2-9', forme: 'factorisee', attendu: '(4x-3)(4x+3)', revoir: 'propriete' },
    { id: 't-3-6-4', type: 'litteral', consigne: 'Factorise.', enonce: '25x^2+30x+9', forme: 'factorisee', attendu: '(5x+3)^2', revoir: 'remarque' },
    { id: 't-3-6-5', type: 'litteral', consigne: 'Factorise.', enonce: '4x^2-4x+1', forme: 'factorisee', attendu: '(2x-1)^2', revoir: 'remarque' },
    { id: 't-3-6-6', type: 'litteral', consigne: 'Factorise.', enonce: '(x+2)^2-36', forme: 'factorisee', attendu: '(x-4)(x+8)', revoir: 'propriete' },
    { id: 't-3-6-7', type: 'litteral', consigne: 'Factorise.', enonce: '49-(x-3)^2', forme: 'factorisee', attendu: '(10-x)(4+x)', fausses: [{ valeur: '(4-x)(10+x)', piege: 'cl-moins-devant-parenthese' }], revoir: 'propriete' },
    { id: 't-3-6-8', type: 'litteral', consigne: 'Factorise. Commence par mettre −1 en facteur.', enonce: '-121-4x^2+44x', forme: 'factorisee', attendu: '-(2x-11)^2', revoir: 'remarque' },
    { id: 't-3-6-9', type: 'litteral', consigne: 'Factorise.', enonce: '9x^2-25', forme: 'factorisee', attendu: '(3x-5)(3x+5)', revoir: 'propriete' },
    { id: 't-3-6-10', type: 'litteral', consigne: 'Factorise.', enonce: '(2x+1)^2-16', forme: 'factorisee', attendu: '(2x-3)(2x+5)', revoir: 'propriete' },
  ],
};
