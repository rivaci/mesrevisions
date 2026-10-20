// Chapitre 3, savoir-faire 5 — Factoriser avec un facteur commun.
//
// L'exercice 2 de la fiche d'Evan (6x + 6y, ab − 5a, 7x² + 4x…) et les
// facteurs communs de l'exercice 8 : un nombre, une lettre, puis une
// parenthèse entière — (5x − 3)² − (5x − 3)(3x + 6). La correction exige le
// PLUS GRAND facteur commun : 5(6x + 9) pour 30x + 45 est « presque ». Les
// réponses sont jugées par litteral.js, sur la valeur ET sur la forme : une
// somme recopiée n'est pas une factorisation.

export default {
  id: 'sf-3-5',
  titre: 'Factoriser avec un facteur commun',
  attendus: [
    'Il factorise une expression en mettant en évidence un facteur commun : un nombre, une lettre, une parenthèse.',
    'Il sort le plus grand facteur commun.',
  ],

  cours: [
    {
      type: 'definition',
      titre: 'Factoriser',
      texte: 'Factoriser une expression, c\'est l\'écrire sous la forme d\'un **produit**. C\'est le chemin inverse du développement.',
    },
    {
      type: 'propriete',
      titre: 'Le facteur commun',
      texte:
        'Pour tous nombres k, a et b : **ka + kb = k(a + b)** et **ka − kb = k(a − b)**.\n'
        + 'On repère ce qui est **commun à tous les termes** — un nombre, une lettre, ou une parenthèse entière — '
        + 'et on le met devant : 5y + 5z = 5(y + z) ; t² + 3t = t(t + 3).',
    },
    {
      type: 'remarque',
      titre: 'Le plus grand facteur commun',
      texte: 'Dans 18a + 24, 2 et 3 sont communs, mais 6 aussi : 18a + 24 = **6(3a + 4)**. On sort le plus grand.',
    },
    {
      type: 'exemple',
      texte: '(x + 2)(3x − 1) + (x + 2)(x + 4) = (x + 2)[(3x − 1) + (x + 4)] = (x + 2)(4x + 3).',
    },
  ],

  methode: {
    titre: 'Chercher ce qui se répète',
    enonce: 'Factoriser A = 12x² − 8x.',
    etapes: [
      { texte: 'Je cherche ce qui est commun aux deux termes : 4 divise 12 et 8, et x est dans les deux.', note: '' },
      { texte: 'Le facteur commun est 4x : 12x² = 4x × 3x et 8x = 4x × 2.', note: 'J\'écris chaque terme comme un produit qui le fait apparaître.' },
      { texte: 'A = 4x(3x − 2).', note: '' },
    ],
    controle: 'Le contrôle : je redéveloppe, 4x × 3x − 4x × 2 = 12x² − 8x. Je retrouve l\'expression de départ.',
  },

  entrainement: [
    // ── Palier 1 : un nombre ou une lettre en commun ───────────────────────
    {
      id: 'e-3-5-1', type: 'litteral', palier: 1, piege: 'cl-facteur-mal-sorti',
      consigne: 'Factorise.', enonce: '6x+6y', forme: 'factorisee', attendu: '6(x+y)',
      fausses: [{ valeur: '6(x+6y)', piege: 'cl-facteur-mal-sorti' }, { valeur: '12xy', piege: 'cl-termes-non-semblables' }],
    },
    {
      id: 'e-3-5-2', type: 'litteral', palier: 1, piege: 'cl-facteur-mal-sorti',
      consigne: 'Factorise.', enonce: 'ab-5a', forme: 'factorisee', attendu: 'a(b-5)',
      fausses: [{ valeur: 'a(b-5a)', piege: 'cl-facteur-mal-sorti' }],
    },
    {
      // NEUTRE : il n'y a aucun facteur commun. Le piège joue chez qui en
      // sort un quand même.
      id: 'e-3-5-3', type: 'choix', palier: 1, neutre: true, piege: 'cl-facteur-mal-sorti',
      consigne: 'Peut-on factoriser cette expression avec un facteur commun ?',
      enonce: '3x+7',
      choix: [
        'Non : 3 et 7 n\'ont pas de diviseur commun, et x n\'est que dans un terme',
        'Oui : 3x + 7 = 3(x + 7)',
        'Oui : 3x + 7 = x(3 + 7)',
      ],
      attendu: 'Non : 3 et 7 n\'ont pas de diviseur commun, et x n\'est que dans un terme',
      fausses: [
        { valeur: 'Oui : 3x + 7 = 3(x + 7)', piege: 'cl-facteur-mal-sorti' },
        { valeur: 'Oui : 3x + 7 = x(3 + 7)', piege: 'cl-facteur-mal-sorti' },
      ],
    },
    {
      id: 'e-3-5-4', type: 'litteral', palier: 1, piege: 'cl-facteur-mal-sorti',
      consigne: 'Factorise.', enonce: '4+4x', forme: 'factorisee', attendu: '4(1+x)',
      fausses: [{ valeur: '4(4+x)', piege: 'cl-facteur-mal-sorti' }, { valeur: '4x', piege: 'cl-facteur-mal-sorti' }],
    },
    // ── Palier 2 : le plus grand facteur commun ────────────────────────────
    {
      id: 'e-3-5-5', type: 'litteral', palier: 2, piege: 'cl-factorisation-incomplete',
      consigne: 'Factorise.', enonce: '15x+40y', forme: 'factorisee', attendu: '5(3x+8y)',
      fausses: [{ valeur: '5(3x+40y)', piege: 'cl-facteur-mal-sorti' }],
    },
    {
      id: 'e-3-5-6', type: 'litteral', palier: 2, piege: 'cl-facteur-mal-sorti',
      consigne: 'Factorise.', enonce: '7x^2+4x', forme: 'factorisee', attendu: 'x(7x+4)',
      fausses: [{ valeur: 'x(7x^2+4)', piege: 'cl-facteur-mal-sorti' }],
    },
    {
      id: 'e-3-5-7', type: 'litteral', palier: 2, piege: 'cl-factorisation-incomplete',
      consigne: 'Factorise.', enonce: '30x+45', forme: 'factorisee', attendu: '15(2x+3)',
      fausses: [{ valeur: '15(2x+45)', piege: 'cl-facteur-mal-sorti' }],
    },
    {
      id: 'e-3-5-8', type: 'litteral', palier: 2, piege: 'cl-factorisation-incomplete',
      consigne: 'Factorise.', enonce: '8x^2-2x', forme: 'factorisee', attendu: '2x(4x-1)',
      fausses: [{ valeur: '2x(4x)', piege: 'cl-facteur-mal-sorti' }],
    },
    // ── Palier 3 : une parenthèse en commun ────────────────────────────────
    {
      id: 'e-3-5-9', type: 'litteral', palier: 3, piege: 'cl-facteur-mal-sorti',
      consigne: 'Factorise.', enonce: '2x(3x-4)+2x(5x+3)', forme: 'factorisee', attendu: '2x(8x-1)',
      fausses: [{ valeur: '4x(8x-1)', piege: 'cl-facteur-mal-sorti' }],
    },
    {
      id: 'e-3-5-10', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Factorise.', enonce: '(5x-3)^2-(5x-3)(3x+6)', forme: 'factorisee', attendu: '(5x-3)(2x-9)',
      fausses: [{ valeur: '(5x-3)(2x+3)', piege: 'cl-moins-devant-parenthese' }],
    },
    {
      id: 'e-3-5-11', type: 'litteral', palier: 3, piege: 'cl-moins-devant-parenthese',
      consigne: 'Factorise. Remarque que −2x + 3 = −(2x − 3).', enonce: '(2x-3)(4x+2)-(-2x+3)(7x-6)', forme: 'factorisee', attendu: '(2x-3)(11x-4)',
      fausses: [{ valeur: '(2x-3)(-3x+8)', piege: 'cl-moins-devant-parenthese' }],
    },
  ],

  test: [
    { id: 't-3-5-1', type: 'litteral', consigne: 'Factorise.', enonce: '72+8z', forme: 'factorisee', attendu: '8(9+z)', revoir: 'propriete' },
    { id: 't-3-5-2', type: 'litteral', consigne: 'Factorise.', enonce: '9x-12', forme: 'factorisee', attendu: '3(3x-4)', fausses: [{ valeur: '3(3x-12)', piege: 'cl-facteur-mal-sorti' }], revoir: 'propriete' },
    { id: 't-3-5-3', type: 'litteral', consigne: 'Factorise.', enonce: 'x^2+9x', forme: 'factorisee', attendu: 'x(x+9)', revoir: 'propriete' },
    { id: 't-3-5-4', type: 'litteral', consigne: 'Factorise.', enonce: '10a^2-15a', forme: 'factorisee', attendu: '5a(2a-3)', revoir: 'remarque' },
    { id: 't-3-5-5', type: 'litteral', consigne: 'Factorise.', enonce: '14xy+21x', forme: 'factorisee', attendu: '7x(2y+3)', revoir: 'remarque' },
    { id: 't-3-5-6', type: 'litteral', consigne: 'Factorise.', enonce: '(x+1)(2x+5)+(x+1)(3x-2)', forme: 'factorisee', attendu: '(x+1)(5x+3)', revoir: 'exemple' },
    { id: 't-3-5-7', type: 'litteral', consigne: 'Factorise.', enonce: '(2+5x)(3-2x)-(5+3x)(3-2x)', forme: 'factorisee', attendu: '(3-2x)(2x-3)', fausses: [{ valeur: '(3-2x)(8x+7)', piege: 'cl-moins-devant-parenthese' }], revoir: 'exemple' },
    { id: 't-3-5-8', type: 'litteral', consigne: 'Factorise.', enonce: '(7m-5)^2-(7m-5)', forme: 'factorisee', attendu: '(7m-5)(7m-6)', fausses: [{ valeur: '(7m-5)(7m-5)', piege: 'cl-facteur-mal-sorti' }], revoir: 'exemple' },
    { id: 't-3-5-9', type: 'litteral', consigne: 'Factorise. Remarque que 4x − 6 = 2(2x − 3).', enonce: '(4x-6)(3x+7)-(2x-3)(8x+3)', forme: 'factorisee', attendu: '(2x-3)(-2x+11)', revoir: 'exemple' },
    { id: 't-3-5-10', type: 'litteral', consigne: 'Factorise.', enonce: '6x^2+3x', forme: 'factorisee', attendu: '3x(2x+1)', fausses: [{ valeur: '3x(2x)', piege: 'cl-facteur-mal-sorti' }], revoir: 'propriete' },
  ],
};
