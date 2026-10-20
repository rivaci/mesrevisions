// Chapitre 3, savoir-faire 4 — Développer avec les identités remarquables.
//
// « Bien connaître les formules », dit la consigne de révision d'Evan : ce
// sont elles. Les carrés (x + 5)², (7x − 3)² et le produit (3x − 7)(3x + 7) de
// l'exercice 6 de sa fiche, puis les différences de l'exercice 7. Trois pièges
// visés : le double produit oublié, le signe du dernier terme, et le carré
// oublié sur le nombre devant x — (3x)² n'est pas 3x².

export default {
  id: 'sf-3-4',
  titre: 'Développer avec les identités remarquables',
  attendus: [
    'Il connaît les trois identités remarquables et les utilise pour développer.',
    'Il développe et réduit une expression qui les combine.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'Les trois identités remarquables',
      texte:
        'Pour tous nombres a et b :\n'
        + '**(a + b)² = a² + 2ab + b²**\n'
        + '**(a − b)² = a² − 2ab + b²**\n'
        + '**(a + b)(a − b) = a² − b²**',
    },
    {
      type: 'exemple',
      texte: '(2y + 5)² = (2y)² + 2 × 2y × 5 + 5² = 4y² + 20y + 25.',
    },
    {
      type: 'remarque',
      titre: 'Le carré porte sur tout le terme',
      texte: 'Dans (4a − 1)², a est 4a : son carré est (4a)² = **16a²**, pas 4a².',
    },
    {
      type: 'remarque',
      titre: 'D\'où elles viennent',
      texte:
        'Ce sont des doubles distributivités : (a + b)² = (a + b)(a + b) = a² + ab + ba + b² = a² + 2ab + b². '
        + 'Si un jour la formule t\'échappe, tu peux toujours développer.',
    },
  ],

  methode: {
    titre: 'Reconnaître a et b, puis appliquer',
    enonce: 'Développer A = (6x − 1)².',
    etapes: [
      { texte: 'Je reconnais (a − b)², avec a = 6x et b = 1.', note: '' },
      { texte: 'a² = (6x)² = 36x² ; 2ab = 2 × 6x × 1 = 12x ; b² = 1² = 1.', note: 'Le carré porte sur 6 ET sur x.' },
      { texte: 'A = 36x² − 12x + 1.', note: 'Le double produit prend le signe moins ; le dernier terme, un carré, est positif.' },
    ],
    controle: 'Le contrôle : avec x = 1, (6 − 1)² = 25, et 36 − 12 + 1 = 25.',
  },

  aSavoir: [
    {
      id: 'as-identites',
      titre: 'Les trois identités remarquables',
      consigne: 'Écris les trois identités remarquables, avec a et b.',
      enonce: '**(a + b)² = a² + 2ab + b²** ; **(a − b)² = a² − 2ab + b²** ; **(a + b)(a − b) = a² − b²**.',
      indice: '(a + b)² = … ; (a − b)² = … ; (a + b)(a − b) = …',
      elements: [
        { id: 'carre-somme', texte: '(a + b)² = a² + 2ab + b²' },
        { id: 'carre-difference', texte: '(a − b)² = a² − 2ab + b²' },
        { id: 'produit', texte: '(a + b)(a − b) = a² − b²' },
      ],
    },
  ],

  entrainement: [
    // ── Palier 1 : une identité, des nombres simples ───────────────────────
    {
      id: 'e-3-4-1', type: 'litteral', palier: 1, piege: 'cl-carre-somme',
      consigne: 'Développe, puis réduis.', enonce: '(x+5)^2', forme: 'reduite', attendu: 'x^2+10x+25',
      fausses: [{ valeur: 'x^2+25', piege: 'cl-carre-somme' }, { valeur: 'x^2+5x+25', piege: 'cl-carre-somme' }],
    },
    {
      id: 'e-3-4-2', type: 'litteral', palier: 1, piege: 'cl-signe-identite',
      consigne: 'Développe, puis réduis.', enonce: '(x-6)^2', forme: 'reduite', attendu: 'x^2-12x+36',
      fausses: [{ valeur: 'x^2-36', piege: 'cl-signe-identite' }, { valeur: 'x^2-12x-36', piege: 'cl-signe-identite' }],
    },
    {
      // NEUTRE pour le double produit : (a + b)(a − b) n'en a pas. Le piège
      // joue chez qui en ajoute un par habitude.
      id: 'e-3-4-3', type: 'litteral', palier: 1, neutre: true, piege: 'cl-carre-somme',
      consigne: 'Développe, puis réduis.', enonce: '(x+6)(x-6)', forme: 'reduite', attendu: 'x^2-36',
      fausses: [{ valeur: 'x^2-12x-36', piege: 'cl-signe-identite' }, { valeur: 'x^2+12x-36', piege: 'cl-signe-identite' }],
    },
    // ── Palier 2 : un nombre devant x ──────────────────────────────────────
    {
      id: 'e-3-4-4', type: 'litteral', palier: 2, piege: 'cl-carre-du-coefficient',
      consigne: 'Développe, puis réduis.', enonce: '(7x-3)^2', forme: 'reduite', attendu: '49x^2-42x+9',
      fausses: [
        { valeur: '7x^2-42x+9', piege: 'cl-carre-du-coefficient' },
        { valeur: '49x^2-9', piege: 'cl-signe-identite' },
        { valeur: '49x^2+9', piege: 'cl-carre-somme' },
      ],
    },
    {
      id: 'e-3-4-5', type: 'litteral', palier: 2, piege: 'cl-carre-du-coefficient',
      consigne: 'Développe, puis réduis.', enonce: '(3x-7)(3x+7)', forme: 'reduite', attendu: '9x^2-49',
      fausses: [{ valeur: '3x^2-49', piege: 'cl-carre-du-coefficient' }],
    },
    {
      id: 'e-3-4-6', type: 'litteral', palier: 2, piege: 'cl-carre-somme',
      consigne: 'Développe, puis réduis.', enonce: '(2a+3)^2', forme: 'reduite', attendu: '4a^2+12a+9',
      fausses: [{ valeur: '4a^2+9', piege: 'cl-carre-somme' }, { valeur: '2a^2+12a+9', piege: 'cl-carre-du-coefficient' }],
    },
    // ── Palier 3 : des fractions, des différences ──────────────────────────
    {
      id: 'e-3-4-7', type: 'litteral', palier: 3, piege: 'cl-signe-identite',
      consigne: 'Développe, puis réduis.', enonce: '\\left(\\frac{4}{5}-\\frac{5}{4}x\\right)^2', forme: 'reduite', attendu: '\\frac{25}{16}x^2-2x+\\frac{16}{25}',
      fausses: [{ valeur: '\\frac{16}{25}-\\frac{25}{16}x^2', piege: 'cl-signe-identite' }],
    },
    {
      id: 'e-3-4-8', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Développe, puis réduis.', enonce: '(4x+5)^2-(3x-2)(3x+2)', forme: 'reduite', attendu: '7x^2+40x+29',
      fausses: [{ valeur: '7x^2+40x+21', piege: 'cl-moins-devant-parenthese' }],
    },
    {
      id: 'e-3-4-9', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Développe, puis réduis.', enonce: '(7x-3)(7x+3)-(2x+5)^2', forme: 'reduite', attendu: '45x^2-20x-34',
      fausses: [{ valeur: '45x^2+20x+16', piege: 'cl-moins-devant-parenthese' }, { valeur: '45x^2-34', piege: 'cl-carre-somme' }],
    },
    {
      id: 'e-3-4-10', type: 'litteral', palier: 3, piege: 'cl-signe-identite',
      consigne: 'Développe, puis réduis.', enonce: '(4x-1)^2-3x(3x-2)', forme: 'reduite', attendu: '7x^2-2x+1',
      fausses: [{ valeur: '7x^2-2x-1', piege: 'cl-signe-identite' }],
    },
  ],

  test: [
    { id: 't-3-4-1', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(x+3)^2', forme: 'reduite', attendu: 'x^2+6x+9', fausses: [{ valeur: 'x^2+9', piege: 'cl-carre-somme' }], revoir: 'propriete' },
    { id: 't-3-4-2', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(x-4)^2', forme: 'reduite', attendu: 'x^2-8x+16', fausses: [{ valeur: 'x^2-16', piege: 'cl-signe-identite' }], revoir: 'propriete' },
    { id: 't-3-4-3', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(x+9)(x-9)', forme: 'reduite', attendu: 'x^2-81', revoir: 'propriete' },
    { id: 't-3-4-4', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(5x+2)^2', forme: 'reduite', attendu: '25x^2+20x+4', fausses: [{ valeur: '5x^2+20x+4', piege: 'cl-carre-du-coefficient' }], revoir: 'remarque' },
    { id: 't-3-4-5', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(2y-7)^2', forme: 'reduite', attendu: '4y^2-28y+49', revoir: 'propriete' },
    { id: 't-3-4-6', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(6a+1)(6a-1)', forme: 'reduite', attendu: '36a^2-1', revoir: 'propriete' },
    { id: 't-3-4-7', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(3-2x)^2', forme: 'reduite', attendu: '4x^2-12x+9', revoir: 'propriete' },
    { id: 't-3-4-8', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(2x-1)^2-(2x-1)(x-6)', forme: 'reduite', attendu: '2x^2+9x-5', revoir: 'propriete' },
    { id: 't-3-4-9', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(4x+5)^2-7(4x+5)', forme: 'reduite', attendu: '16x^2+12x-10', revoir: 'propriete' },
    { id: 't-3-4-10', type: 'litteral', consigne: 'Développe, puis réduis.', enonce: '(3x-5)(2x-1)-(3x-5)^2', forme: 'reduite', attendu: '-3x^2+17x-20', revoir: 'propriete' },
  ],
};
