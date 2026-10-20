// Chapitre 3, savoir-faire 1 — Réduire une expression.
//
// Les exercices 3, 4 et 5 de la fiche d'Evan : regrouper les termes
// semblables, ne pas confondre un produit et une somme (6x × 4x), enlever des
// parenthèses précédées d'un moins. Une partie des exercices reprend ceux de
// la fiche — l'appli les corrige —, les autres sont neufs.
//
// Les expressions s'écrivent au clavier (2x^2, (a-0{,}25)\times 8) : c'est
// litteral.js qui les lit, les calcule et juge la forme de la réponse.

export default {
  id: 'sf-3-1',
  titre: 'Réduire une expression',
  attendus: [
    'Il réduit une expression en regroupant les termes semblables.',
    'Il supprime des parenthèses précédées d\'un signe + ou d\'un signe −.',
  ],

  cours: [
    {
      type: 'definition',
      titre: 'Réduire',
      texte:
        'Réduire une expression, c\'est l\'écrire avec **le moins de termes possible**, en regroupant les **termes '
        + 'semblables** : ceux qui ont exactement la même partie en lettres.\n'
        + '7x et −3x sont semblables ; 7x et 7x² ne le sont pas.',
    },
    {
      type: 'propriete',
      titre: 'Additionner des termes semblables',
      texte:
        'On additionne les nombres devant la partie en lettres : 6a + 9a = **15a** ; −4y² − 2y² = **−6y²**.\n'
        + 'Un nombre seul ne se mélange pas avec des x : 8x + 3 ne se réduit pas.',
    },
    {
      type: 'propriete',
      titre: 'Multiplier n\'est pas additionner',
      texte: 'Dans un produit, on multiplie les nombres entre eux ET les lettres entre elles : 5y × 2y = **10y²** ; −3 × (−7a) = **21a**.',
    },
    {
      type: 'propriete',
      titre: 'Supprimer des parenthèses',
      texte:
        'Précédées d\'un **+**, on les enlève sans rien changer : a + (b − c) = a + b − c.\n'
        + 'Précédées d\'un **−**, on les enlève en **changeant le signe de chaque terme** : a − (b − c) = a − b + c.',
    },
  ],

  methode: {
    titre: 'Enlever les parenthèses, puis regrouper',
    enonce: 'Réduire A = (3x² − 4x + 1) − (x² − 6x + 5).',
    etapes: [
      { texte: 'Le moins devant la seconde parenthèse change tous ses signes : A = 3x² − 4x + 1 − x² + 6x − 5.', note: 'La première parenthèse n\'a pas de moins devant : elle s\'enlève telle quelle.' },
      { texte: 'Je regroupe les x² : 3x² − x² = 2x². Les x : −4x + 6x = 2x. Les nombres : 1 − 5 = −4.', note: '' },
      { texte: 'A = 2x² + 2x − 4.', note: 'Un terme en x², un en x, un nombre : c\'est réduit.' },
    ],
    controle:
      'Le contrôle : avec x = 2, l\'expression de départ vaut (12 − 8 + 1) − (4 − 12 + 5) = 5 + 3 = 8, et la '
      + 'réponse 8 + 4 − 4 = 8. Les deux concordent.',
  },

  aSavoir: [
    {
      id: 'as-parentheses',
      titre: 'Supprimer des parenthèses',
      consigne: 'Écris la règle pour supprimer des parenthèses, selon le signe qui les précède.',
      enonce:
        'Des parenthèses précédées d\'un signe **+** s\'enlèvent **sans rien changer**. Des parenthèses précédées '
        + 'd\'un signe **−** s\'enlèvent en **changeant le signe de chaque terme** qu\'elles contiennent.',
      indice: 'Précédées d\'un + : … Précédées d\'un − : …',
      elements: [
        { id: 'plus', texte: 'précédées d\'un +, on les enlève sans rien changer' },
        { id: 'moins', texte: 'précédées d\'un −, on change les signes' },
        { id: 'chaque', texte: 'le signe de CHAQUE terme de la parenthèse change, pas seulement le premier' },
      ],
    },
  ],

  entrainement: [
    // ── Palier 1 : des termes semblables, un produit ───────────────────────
    {
      id: 'e-3-1-1', type: 'litteral', palier: 1, piege: 'cl-produit-et-somme',
      consigne: 'Réduis, si c\'est possible.', enonce: '6x+4x', forme: 'reduite', attendu: '10x',
      fausses: [{ valeur: '10x^2', piege: 'cl-produit-et-somme' }, { valeur: '24x^2', piege: 'cl-produit-et-somme' }],
    },
    {
      id: 'e-3-1-2', type: 'litteral', palier: 1, piege: 'cl-produit-et-somme',
      consigne: 'Réduis, si c\'est possible.', enonce: '6x\\times 4x', forme: 'reduite', attendu: '24x^2',
      fausses: [{ valeur: '24x', piege: 'cl-produit-et-somme' }, { valeur: '10x', piege: 'cl-produit-et-somme' }],
    },
    {
      // NEUTRE : il n'y a rien à regrouper. Le piège joue chez qui « réduit »
      // quand même, en additionnant 3 et 8.
      id: 'e-3-1-3', type: 'litteral', palier: 1, neutre: true, piege: 'cl-termes-non-semblables',
      consigne: 'Réduis, si c\'est possible.', enonce: '3x+8', forme: 'reduite', attendu: '3x+8',
      fausses: [{ valeur: '11x', piege: 'cl-termes-non-semblables' }],
    },
    // ── Palier 2 : plusieurs familles de termes ────────────────────────────
    {
      id: 'e-3-1-4', type: 'litteral', palier: 2, piege: 'cl-termes-non-semblables',
      consigne: 'Réduis, si c\'est possible.', enonce: '8x+3-4x-10', forme: 'reduite', attendu: '4x-7',
      fausses: [{ valeur: '-3x', piege: 'cl-termes-non-semblables' }],
    },
    {
      id: 'e-3-1-5', type: 'litteral', palier: 2, piege: 'cl-termes-non-semblables',
      consigne: 'Réduis, si c\'est possible.', enonce: '-2a+3b-5a+7b', forme: 'reduite', attendu: '-7a+10b',
      fausses: [{ valeur: '3ab', piege: 'cl-termes-non-semblables' }, { valeur: '3a+3b', piege: 'cl-termes-non-semblables' }],
    },
    {
      id: 'e-3-1-6', type: 'litteral', palier: 2, piege: 'cl-termes-non-semblables',
      consigne: 'Réduis, si c\'est possible.', enonce: '-5x^2+9x+7x-2x^2-4x+6', forme: 'reduite', attendu: '-7x^2+12x+6',
      fausses: [{ valeur: '5x+6', piege: 'cl-termes-non-semblables' }],
    },
    {
      id: 'e-3-1-7', type: 'litteral', palier: 2, piege: 'cl-moins-devant-parenthese',
      consigne: 'Supprime les parenthèses, puis réduis.', enonce: 'x-(-y+5)-5', forme: 'reduite', attendu: 'x+y-10',
      fausses: [{ valeur: 'x-y', piege: 'cl-moins-devant-parenthese' }],
    },
    // ── Palier 3 : des parenthèses précédées d'un moins ────────────────────
    {
      id: 'e-3-1-8', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Supprime les parenthèses, puis réduis.', enonce: '(2x^2-6x-4)-(5x-x^2-4)', forme: 'reduite', attendu: '3x^2-11x',
      fausses: [{ valeur: 'x^2-11x-8', piege: 'cl-moins-devant-parenthese' }],
    },
    {
      id: 'e-3-1-9', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Supprime les parenthèses, puis réduis.', enonce: '-(z^2+2-4z)+(2z^2-4z+1)', forme: 'reduite', attendu: 'z^2-1',
      fausses: [{ valeur: 'z^2-8z+3', piege: 'cl-moins-devant-parenthese' }],
    },
    {
      id: 'e-3-1-10', type: 'calcul', palier: 3, piege: 'cl-substitution-signe',
      consigne: 'Réduis d\'abord, puis calcule rapidement la valeur de G pour x = −1/10 et y = −7,5/4.',
      enonce: '\\text{G = 5(x − y) + 5(x + y)}', attendu: -1,
      fausses: [{ valeur: 1, piege: 'cl-substitution-signe' }],
    },
  ],

  test: [
    {
      id: 't-3-1-1', type: 'litteral', consigne: 'Réduis, si c\'est possible.', enonce: '-5x+9-3x+7', forme: 'reduite', attendu: '-8x+16',
      fausses: [{ valeur: '8x', piege: 'cl-termes-non-semblables' }], revoir: 'propriete',
    },
    { id: 't-3-1-2', type: 'litteral', consigne: 'Réduis, si c\'est possible.', enonce: 'x+5+7x-4x-3', forme: 'reduite', attendu: '4x+2', revoir: 'propriete' },
    {
      id: 't-3-1-3', type: 'litteral', consigne: 'Réduis, si c\'est possible.', enonce: '-6\\times(-4x)', forme: 'reduite', attendu: '24x',
      fausses: [{ valeur: '-24x', piege: 'cm-signes-produit' }], revoir: 'propriete',
    },
    {
      id: 't-3-1-4', type: 'litteral', consigne: 'Supprime les parenthèses, puis réduis.', enonce: '(x-5)-(-y-5)', forme: 'reduite', attendu: 'x+y',
      fausses: [{ valeur: 'x+y-10', piege: 'cl-moins-devant-parenthese' }], revoir: 'propriete',
    },
    { id: 't-3-1-5', type: 'litteral', consigne: 'Réduis, si c\'est possible.', enonce: '4a-7+2a^2-a+9', forme: 'reduite', attendu: '2a^2+3a+2', revoir: 'propriete' },
    {
      id: 't-3-1-6', type: 'litteral', consigne: 'Réduis, si c\'est possible.', enonce: '3x\\times(-2x)', forme: 'reduite', attendu: '-6x^2',
      fausses: [{ valeur: '-6x', piege: 'cl-produit-et-somme' }, { valeur: 'x', piege: 'cl-produit-et-somme' }], revoir: 'propriete',
    },
    {
      // Rien à réduire : ici, recopier l'expression est la bonne réponse.
      id: 't-3-1-7', type: 'litteral', neutre: true, consigne: 'Réduis, si c\'est possible.', enonce: '5x^2-3x', forme: 'reduite', attendu: '5x^2-3x',
      fausses: [{ valeur: '2x', piege: 'cl-termes-non-semblables' }, { valeur: '2x^2', piege: 'cl-termes-non-semblables' }], revoir: 'definition',
    },
    {
      id: 't-3-1-8', type: 'litteral', consigne: 'Supprime les parenthèses, puis réduis.', enonce: '7-(3x-2)+(x-4)', forme: 'reduite', attendu: '-2x+5',
      fausses: [{ valeur: '-2x+1', piege: 'cl-moins-devant-parenthese' }], revoir: 'propriete',
    },
    {
      id: 't-3-1-9', type: 'litteral', consigne: 'Supprime les parenthèses, puis réduis.', enonce: '(4y^2-y)-(y^2+3y-2)', forme: 'reduite', attendu: '3y^2-4y+2',
      fausses: [{ valeur: '3y^2+2y-2', piege: 'cl-moins-devant-parenthese' }], revoir: 'propriete',
    },
    {
      id: 't-3-1-10', type: 'calcul', consigne: 'Calcule la valeur de 3x² − x pour x = −2.', enonce: '\\text{3x² − x, avec x = −2}', attendu: 14,
      fausses: [{ valeur: -10, piege: 'cl-substitution-signe' }, { valeur: 10, piege: 'cl-substitution-signe' }], revoir: 'propriete',
    },
  ],
};
