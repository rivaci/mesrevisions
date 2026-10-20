// Chapitre 3, savoir-faire 2 — Développer avec la distributivité simple.
//
// L'exercice 1 de la fiche d'Evan, et les parenthèses multipliées de
// l'exercice 4 : k(a + b) = ka + kb, avec plusieurs lettres (9a − 2b, 6k(a − b))
// et des facteurs négatifs. Le piège visé est le facteur qui ne multiplie que
// le premier terme ; son envers — « distribuer » une addition, 5 + (x + 3) en
// 5x + 15 — est l'item neutre.

export default {
  id: 'sf-3-2',
  titre: 'Développer avec la distributivité simple',
  attendus: [
    'Il développe un produit k(a + b) ou k(a − b), avec un facteur positif ou négatif.',
    'Il développe et réduit une somme de tels produits.',
  ],

  cours: [
    {
      type: 'definition',
      titre: 'Développer',
      texte: 'Développer un produit, c\'est l\'écrire sous la forme d\'une **somme**. C\'est le chemin inverse de la factorisation.',
    },
    {
      type: 'propriete',
      titre: 'La distributivité',
      texte:
        'Pour tous nombres k, a et b : **k(a + b) = ka + kb** et **k(a − b) = ka − kb**.\n'
        + 'Le facteur k multiplie **chaque** terme de la parenthèse : 4(x + 7) = 4x + 28.',
    },
    {
      type: 'remarque',
      titre: 'Un facteur négatif',
      texte: 'Le facteur garde son signe, et chaque produit suit la règle des signes : −2(y − 6) = −2y + 12.',
    },
  ],

  methode: {
    titre: 'Une flèche vers chaque terme',
    enonce: 'Développer et réduire A = 4(2x − 3) − 5(x − 1).',
    etapes: [
      { texte: '4 multiplie chaque terme de sa parenthèse : 4 × 2x − 4 × 3 = 8x − 12.', note: '' },
      { texte: '−5 multiplie chaque terme de la sienne : −5 × x − 5 × (−1) = −5x + 5.', note: 'Le moins fait partie du facteur.' },
      { texte: 'A = 8x − 12 − 5x + 5 = 3x − 7.', note: 'Puis on réduit.' },
    ],
    controle: 'Le contrôle : avec x = 2, A = 4 × 1 − 5 × 1 = −1, et 3 × 2 − 7 = −1.',
  },

  aSavoir: [
    {
      id: 'as-distributivite',
      titre: 'La distributivité',
      consigne: 'Écris la propriété de distributivité, pour une somme puis pour une différence, avec k, a et b.',
      enonce: 'Pour tous nombres k, a et b : **k(a + b) = ka + kb** et **k(a − b) = ka − kb**.',
      indice: 'k(a + b) = … et k(a − b) = …',
      elements: [
        { id: 'somme', texte: 'k(a + b) = ka + kb' },
        { id: 'difference', texte: 'k(a − b) = ka − kb' },
      ],
    },
  ],

  entrainement: [
    // ── Palier 1 : un facteur positif ──────────────────────────────────────
    {
      id: 'e-3-2-1', type: 'litteral', palier: 1, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe.', enonce: '2(9a-2b)', forme: 'reduite', attendu: '18a-4b',
      fausses: [{ valeur: '18a-2b', piege: 'cl-distributivite-incomplete' }],
    },
    {
      id: 'e-3-2-2', type: 'litteral', palier: 1, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe.', enonce: '(a-0{,}25)\\times 8', forme: 'reduite', attendu: '8a-2',
      fausses: [{ valeur: '8a-0{,}25', piege: 'cl-distributivite-incomplete' }],
    },
    {
      // NEUTRE : une addition devant la parenthèse, rien à distribuer. Le piège
      // joue chez qui distribue quand même.
      id: 'e-3-2-3', type: 'litteral', palier: 1, neutre: true, piege: 'cl-distributivite-incomplete',
      consigne: 'Supprime les parenthèses, puis réduis.', enonce: '5+(x+3)', forme: 'reduite', attendu: 'x+8',
      fausses: [{ valeur: '5x+15', piege: 'cl-produit-et-somme' }],
    },
    {
      id: 'e-3-2-4', type: 'litteral', palier: 1, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe.', enonce: 'n(2x+y)', forme: 'reduite', attendu: '2nx+ny',
      fausses: [{ valeur: '2nx+y', piege: 'cl-distributivite-incomplete' }],
    },
    // ── Palier 2 : des lettres en facteur ──────────────────────────────────
    {
      id: 'e-3-2-5', type: 'litteral', palier: 2, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe.', enonce: '(9c+a)\\times 9', forme: 'reduite', attendu: '81c+9a',
      fausses: [{ valeur: '81c+a', piege: 'cl-distributivite-incomplete' }],
    },
    {
      id: 'e-3-2-6', type: 'litteral', palier: 2, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe.', enonce: '6k(a-b)', forme: 'reduite', attendu: '6ak-6bk',
      fausses: [{ valeur: '6ak-b', piege: 'cl-distributivite-incomplete' }],
    },
    {
      id: 'e-3-2-7', type: 'litteral', palier: 2, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe.', enonce: '2m(1+3z)', forme: 'reduite', attendu: '2m+6mz',
      fausses: [{ valeur: '2m+3z', piege: 'cl-distributivite-incomplete' }],
    },
    // ── Palier 3 : des facteurs négatifs, puis réduire ─────────────────────
    {
      id: 'e-3-2-8', type: 'litteral', palier: 3, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe.', enonce: '-4(2x-5)', forme: 'reduite', attendu: '-8x+20',
      fausses: [{ valeur: '-8x-20', piege: 'cl-distributivite-incomplete' }, { valeur: '-8x-5', piege: 'cl-distributivite-incomplete' }],
    },
    {
      id: 'e-3-2-9', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Développe, puis réduis.', enonce: '5(2x-1)-3(x+4)', forme: 'reduite', attendu: '7x-17',
      fausses: [{ valeur: '7x+7', piege: 'cl-moins-devant-parenthese' }],
    },
    {
      id: 'e-3-2-10', type: 'litteral', palier: 3, piege: 'cl-distributivite-incomplete',
      consigne: 'Développe, puis réduis.', enonce: 'x(x-4)+2x(3-x)', forme: 'reduite', attendu: '-x^2+2x',
      fausses: [{ valeur: '3x^2+2x', piege: 'cl-distributivite-incomplete' }],
    },
  ],

  test: [
    {
      id: 't-3-2-1', type: 'litteral', consigne: 'Développe.', enonce: '3(x+7)', forme: 'reduite', attendu: '3x+21',
      fausses: [{ valeur: '3x+7', piege: 'cl-distributivite-incomplete' }], revoir: 'propriete',
    },
    {
      id: 't-3-2-2', type: 'litteral', consigne: 'Développe.', enonce: '-2(4x-3)', forme: 'reduite', attendu: '-8x+6',
      fausses: [{ valeur: '-8x-6', piege: 'cl-distributivite-incomplete' }], revoir: 'remarque',
    },
    {
      id: 't-3-2-3', type: 'litteral', consigne: 'Développe.', enonce: 'x(5-x)', forme: 'reduite', attendu: '5x-x^2',
      fausses: [{ valeur: '4x', piege: 'cl-produit-et-somme' }], revoir: 'propriete',
    },
    { id: 't-3-2-4', type: 'litteral', consigne: 'Développe.', enonce: '(2a+3b)\\times 4', forme: 'reduite', attendu: '8a+12b', revoir: 'propriete' },
    { id: 't-3-2-5', type: 'litteral', consigne: 'Développe.', enonce: '7y(2-3y)', forme: 'reduite', attendu: '14y-21y^2', revoir: 'propriete' },
    { id: 't-3-2-6', type: 'litteral', consigne: 'Développe.', enonce: '0{,}5(4x-6)', forme: 'reduite', attendu: '2x-3', revoir: 'propriete' },
    {
      id: 't-3-2-7', type: 'litteral', consigne: 'Développe.', enonce: '-(x-9)', forme: 'reduite', attendu: '-x+9',
      fausses: [{ valeur: '-x-9', piege: 'cl-moins-devant-parenthese' }], revoir: 'remarque',
    },
    { id: 't-3-2-8', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '4(x+2)+3(x-1)', forme: 'reduite', attendu: '7x+5', revoir: 'propriete' },
    {
      id: 't-3-2-9', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '2(3a-b)-5(a-b)', forme: 'reduite', attendu: 'a+3b',
      fausses: [{ valeur: 'a-7b', piege: 'cl-moins-devant-parenthese' }], revoir: 'remarque',
    },
    { id: 't-3-2-10', type: 'litteral', consigne: 'Développe.', enonce: '-5x(2x-3)', forme: 'reduite', attendu: '-10x^2+15x', revoir: 'remarque' },
  ],
};
