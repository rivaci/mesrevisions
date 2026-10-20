// Chapitre 3, savoir-faire 3 — Développer avec la double distributivité.
//
// Les produits (x + 5)(x + 2) de l'exercice 6 de la fiche d'Evan, puis les
// différences de produits de l'exercice 7 : un moins devant un produit, qu'il
// faut développer AVANT d'enlever les parenthèses. Le piège visé est celui des
// produits oubliés — « premiers ensemble, derniers ensemble » —, l'item neutre
// une distributivité simple, où il n'y a pas quatre produits à faire.

export default {
  id: 'sf-3-3',
  titre: 'Développer avec la double distributivité',
  attendus: [
    'Il développe et réduit un produit (a + b)(c + d).',
    'Il développe et réduit une somme ou une différence de tels produits.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'La double distributivité',
      texte:
        'Pour tous nombres a, b, c et d : **(a + b)(c + d) = ac + ad + bc + bd**.\n'
        + 'Chaque terme de la première parenthèse multiplie chaque terme de la seconde : deux termes par deux '
        + 'termes, cela fait **quatre produits**, que l\'on réduit ensuite.',
    },
    {
      type: 'exemple',
      texte: '(y + 2)(y + 6) = y² + 6y + 2y + 12 = y² + 8y + 12.',
    },
    {
      type: 'remarque',
      titre: 'Les signes',
      texte: 'Chaque terme garde son signe : (2a − 1)(a − 7) = 2a² − 14a − a + 7 = 2a² − 15a + 7.',
    },
    {
      type: 'remarque',
      titre: 'Un moins devant un produit',
      texte:
        'Dans A − (x + 1)(x + 2), on développe d\'abord le produit **en le gardant entre parenthèses**, puis on '
        + 'enlève les parenthèses en changeant tous les signes : A − (x² + 3x + 2) = A − x² − 3x − 2.',
    },
  ],

  methode: {
    titre: 'Quatre flèches, quatre produits',
    enonce: 'Développer et réduire E = (3x − 2)(2x + 5).',
    etapes: [
      { texte: 'Les quatre produits : 3x × 2x + 3x × 5 − 2 × 2x − 2 × 5.', note: 'Le −2 garde son signe.' },
      { texte: 'E = 6x² + 15x − 4x − 10.', note: '' },
      { texte: 'E = 6x² + 11x − 10.', note: 'On réduit les deux termes en x.' },
    ],
    controle: 'Le contrôle : avec x = 1, (3 − 2)(2 + 5) = 7, et 6 + 11 − 10 = 7.',
  },

  aSavoir: [
    {
      id: 'as-double-distributivite',
      titre: 'La double distributivité',
      consigne: 'Écris la double distributivité, avec a, b, c et d.',
      enonce: 'Pour tous nombres a, b, c et d : **(a + b)(c + d) = ac + ad + bc + bd**.',
      indice: '(a + b)(c + d) = … + … + … + …',
      elements: [
        { id: 'quatre-produits', texte: 'les quatre produits : ac, ad, bc et bd' },
        { id: 'somme', texte: 'leur somme : (a + b)(c + d) = ac + ad + bc + bd' },
      ],
    },
  ],

  entrainement: [
    // ── Palier 1 : des produits simples ────────────────────────────────────
    {
      id: 'e-3-3-1', type: 'litteral', palier: 1, piege: 'cl-double-distributivite-incomplete',
      consigne: 'Développe, puis réduis.', enonce: '(x+5)(x+2)', forme: 'reduite', attendu: 'x^2+7x+10',
      fausses: [{ valeur: 'x^2+10', piege: 'cl-double-distributivite-incomplete' }],
    },
    {
      id: 'e-3-3-2', type: 'litteral', palier: 1, piege: 'cl-double-distributivite-incomplete',
      consigne: 'Développe, puis réduis.', enonce: '(y+5)(3y-2)', forme: 'reduite', attendu: '3y^2+13y-10',
      fausses: [{ valeur: '3y^2-10', piege: 'cl-double-distributivite-incomplete' }],
    },
    {
      // NEUTRE : un seul terme devant la parenthèse — deux produits, pas quatre.
      id: 'e-3-3-3', type: 'litteral', palier: 1, neutre: true, piege: 'cl-double-distributivite-incomplete',
      consigne: 'Développe.', enonce: 'x(x+6)', forme: 'reduite', attendu: 'x^2+6x',
      fausses: [{ valeur: '2x+6', piege: 'cl-produit-et-somme' }],
    },
    // ── Palier 2 : des signes ──────────────────────────────────────────────
    {
      id: 'e-3-3-4', type: 'litteral', palier: 2, piege: 'cl-double-distributivite-incomplete',
      consigne: 'Développe, puis réduis.', enonce: '(4x-5)(7-3x)', forme: 'reduite', attendu: '-12x^2+43x-35',
      fausses: [{ valeur: '-12x^2-35', piege: 'cl-double-distributivite-incomplete' }, { valeur: '-12x^2+13x-35', piege: 'cl-double-distributivite-incomplete' }],
    },
    {
      id: 'e-3-3-5', type: 'litteral', palier: 2, piege: 'cl-double-distributivite-incomplete',
      consigne: 'Développe, puis réduis.', enonce: '(2x-1)(x+6)', forme: 'reduite', attendu: '2x^2+11x-6',
      fausses: [{ valeur: '2x^2-6', piege: 'cl-double-distributivite-incomplete' }],
    },
    {
      id: 'e-3-3-6', type: 'litteral', palier: 2, piege: 'cl-double-distributivite-incomplete',
      consigne: 'Développe, puis réduis.', enonce: '(5-a)(a+3)', forme: 'reduite', attendu: '-a^2+2a+15',
      fausses: [{ valeur: '-a^2+15', piege: 'cl-double-distributivite-incomplete' }],
    },
    // ── Palier 3 : des sommes et des différences de produits ───────────────
    {
      id: 'e-3-3-7', type: 'litteral', palier: 3, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe, puis réduis.', enonce: '7(5x-3)-4(3x^2-1)-2x(3x+7)', forme: 'reduite', attendu: '-18x^2+21x-17',
      fausses: [{ valeur: '-18x^2+21x-25', piege: 'cl-distributivite-incomplete' }],
    },
    {
      id: 'e-3-3-8', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Développe, puis réduis.', enonce: '(3y-4)(4y-3)-(-11y-3)(-2y+5)', forme: 'reduite', attendu: '-10y^2+24y+27',
      fausses: [{ valeur: '-10y^2-74y-3', piege: 'cl-moins-devant-parenthese' }],
    },
    {
      id: 'e-3-3-9', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Développe, puis réduis.', enonce: '(2x+3)(x-4)-(x-1)(x+2)', forme: 'reduite', attendu: 'x^2-6x-10',
      fausses: [{ valeur: 'x^2-4x-14', piege: 'cl-moins-devant-parenthese' }],
    },
  ],

  test: [
    { id: 't-3-3-1', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(x+3)(x+7)', forme: 'reduite', attendu: 'x^2+10x+21', fausses: [{ valeur: 'x^2+21', piege: 'cl-double-distributivite-incomplete' }], revoir: 'propriete' },
    { id: 't-3-3-2', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(x-2)(x+9)', forme: 'reduite', attendu: 'x^2+7x-18', revoir: 'propriete' },
    { id: 't-3-3-3', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(2a+1)(3a+4)', forme: 'reduite', attendu: '6a^2+11a+4', revoir: 'propriete' },
    { id: 't-3-3-4', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(4-x)(2x+3)', forme: 'reduite', attendu: '-2x^2+5x+12', revoir: 'remarque' },
    { id: 't-3-3-5', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(3x-2)(3x-5)', forme: 'reduite', attendu: '9x^2-21x+10', revoir: 'remarque' },
    { id: 't-3-3-6', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(5y-1)(2-y)', forme: 'reduite', attendu: '-5y^2+11y-2', revoir: 'remarque' },
    { id: 't-3-3-7', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(2x+1)(x-3)+4x', forme: 'reduite', attendu: '2x^2-x-3', revoir: 'propriete' },
    { id: 't-3-3-8', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(x+4)(x-1)-x(x+2)', forme: 'reduite', attendu: 'x-4', fausses: [{ valeur: '2x^2+x-4', piege: 'cl-moins-devant-parenthese' }], revoir: 'remarque' },
    { id: 't-3-3-9', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(3a-1)(a+2)-(a-5)(2a+1)', forme: 'reduite', attendu: 'a^2+14a+3', revoir: 'remarque' },
    { id: 't-3-3-10', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(6-x)(6+2x)', forme: 'reduite', attendu: '-2x^2+6x+36', revoir: 'remarque' },
  ],
};
