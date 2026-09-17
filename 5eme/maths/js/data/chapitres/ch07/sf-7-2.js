// Chapitre 7, savoir-faire 2 — Calculer un produit de plusieurs relatifs.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point 7 [EIB] de la liste de la professeure, prolongé à plus de deux
// facteurs : c'est là que la règle des signes devient un comptage.
//
// ── Compter avant de calculer ────────────────────────────────────────────
//
// De gauche à droite, le signe change à chaque facteur négatif : on s'y
// perd vite. Compter les facteurs négatifs d'abord règle le signe une fois
// pour toutes. Deux cas limites ont leur item : le facteur nul, qui rend le
// comptage inutile, et le regroupement astucieux, qui ne change rien au
// signe.

export default {
  id: 'sf-7-2',
  titre: 'Calculer un produit de plusieurs nombres relatifs',
  attendus: [
    'Il détermine le signe d\'un produit en comptant les facteurs négatifs.',
    'Il sait qu\'un produit est nul dès qu\'un de ses facteurs est nul.',
    'Il regroupe les facteurs pour calculer plus facilement.',
  ],

  decouvrir: {
    titre: 'Compter les négatifs',
    texte: 'On multiplie −1 par lui-même, encore et encore.',
    lignes: [
      { calcul: '(-1) \\times (-1)', resultat: '1' },
      { calcul: '(-1) \\times (-1) \\times (-1)', resultat: '−1' },
      { calcul: '(-1) \\times (-1) \\times (-1) \\times (-1)', resultat: '1' },
    ],
    question: 'Quel est le produit de 5 facteurs égaux à −1 ? Et de 6 facteurs ?',
    champs: [
      { id: 'a', etiquette: '5 facteurs', attendu: -1 },
      { id: 'b', etiquette: '6 facteurs', attendu: 1 },
    ],
    conclusion:
      'Chaque nouveau facteur −1 change le signe. Avec un nombre **pair** de facteurs négatifs, le '
      + 'produit est **positif** ; avec un nombre **impair**, il est **négatif**.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Le signe d\'un produit',
      texte:
        'Un produit de facteurs non nuls est **positif** si le nombre de facteurs négatifs est '
        + '**pair**, et **négatif** s\'il est **impair**.',
    },
    {
      type: 'propriete',
      titre: 'Un facteur nul',
      texte: 'Si l\'un des facteurs est **nul**, le produit est **nul** : (−7) × 0 × (−3) = 0.',
    },
    {
      type: 'remarque',
      titre: 'Regrouper les facteurs',
      texte:
        'On peut changer l\'ordre des facteurs et les regrouper comme on veut :\n'
        + '(−4) × 7 × (−25) = [(−4) × (−25)] × 7 = 100 × 7 = 700.',
    },
    {
      type: 'exemple',
      texte: '(−2) × (−3) × (−5) : 3 facteurs négatifs, −30   ·   (−2) × 3 × (−5) : 2 facteurs négatifs, 30',
    },
  ],

  methode: {
    titre: 'Calculer (−2) × 5 × (−1) × (−3)',
    enonce: 'Calculer (−2) × 5 × (−1) × (−3).',
    etapes: [
      { texte: 'Je compte les facteurs négatifs : −2, −1 et −3, soit 3.', note: 'Je souligne chaque facteur négatif.' },
      { texte: '3 est impair : le produit est négatif.', note: '' },
      { texte: 'Je multiplie les distances à zéro : 2 × 5 × 1 × 3 = 30.', note: '' },
      { texte: 'Donc (−2) × 5 × (−1) × (−3) = −30.', note: '' },
    ],
    controle:
      'Le contrôle : calcule de gauche à droite. (−2) × 5 = −10 ; −10 × (−1) = 10 ; '
      + '10 × (−3) = −30.',
  },

  entrainement: [
    // ── Palier 1 : trois facteurs ──────────────────────────────────────────
    {
      // NEUTRE : un facteur nul, le comptage est inutile.
      id: 'e-7-2-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '(-8) \\times 0 \\times (-3)', attendu: 0,
      fausses: [{ valeur: 24, piege: 'nombre-de-negatifs' }],
    },
    {
      id: 'e-7-2-2', type: 'signe', palier: 1, piege: 'nombre-de-negatifs',
      consigne: 'Quel est le signe de ce produit ?', enonce: '(-2) \\times (-3) \\times (-4)', attendu: 'négatif',
      fausses: [{ valeur: 'positif', piege: 'nombre-de-negatifs' }],
    },
    {
      id: 'e-7-2-3', type: 'signe', palier: 1, piege: 'nombre-de-negatifs',
      consigne: 'Quel est le signe de ce produit ?', enonce: '(-1) \\times 5 \\times (-2) \\times 7', attendu: 'positif',
      fausses: [{ valeur: 'négatif', piege: 'nombre-de-negatifs' }],
    },
    {
      id: 'e-7-2-4', type: 'calcul', palier: 1, piege: 'nombre-de-negatifs',
      consigne: 'Calcule.', enonce: '(-2) \\times 3 \\times (-5)', attendu: 30,
      fausses: [{ valeur: -30, piege: 'nombre-de-negatifs' }],
    },
    // ── Palier 2 : quatre facteurs, des décimaux ───────────────────────────
    {
      id: 'e-7-2-5', type: 'calcul', palier: 2, piege: 'nombre-de-negatifs',
      consigne: 'Calcule.', enonce: '(-1) \\times (-2) \\times (-3) \\times (-4)', attendu: 24,
      fausses: [{ valeur: -24, piege: 'nombre-de-negatifs' }],
    },
    {
      id: 'e-7-2-6', type: 'calcul', palier: 2, piege: 'nombre-de-negatifs',
      consigne: 'Calcule.', enonce: '(-0{,}5) \\times 8 \\times (-3)', attendu: 12,
      fausses: [{ valeur: -12, piege: 'nombre-de-negatifs' }],
    },
    {
      id: 'e-7-2-7', type: 'signe', palier: 2, piege: 'nombre-de-negatifs',
      consigne: 'Quel est le signe de ce produit ?', enonce: '(-4) \\times 0 \\times (-7)', attendu: 'nul',
      fausses: [{ valeur: 'positif', piege: 'nombre-de-negatifs' }],
    },
    {
      // NEUTRE : le regroupement astucieux, où le signe se voit tout de suite.
      id: 'e-7-2-8', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule astucieusement.', enonce: '(-4) \\times 7 \\times (-25)', attendu: 700,
    },
    // ── Palier 3 : beaucoup de facteurs ────────────────────────────────────
    {
      id: 'e-7-2-9', type: 'calcul', palier: 3, piege: 'nombre-de-negatifs',
      consigne: 'Calcule.', enonce: '(-1) \\times (-1) \\times (-1) \\times (-1) \\times (-1)', attendu: -1,
      fausses: [{ valeur: 1, piege: 'nombre-de-negatifs' }],
    },
    {
      id: 'e-7-2-10', type: 'choix', palier: 3, piege: 'nombre-de-negatifs',
      consigne: 'Lequel de ces produits est négatif ?', enonce: 'Trois produits.',
      choix: ['(−2) × (−3) × 4', '(−2) × 3 × 4', '(−2) × (−3) × (−4) × (−1)'],
      attendu: '(−2) × 3 × 4',
      fausses: [
        { valeur: '(−2) × (−3) × 4', piege: 'nombre-de-negatifs' },
        { valeur: '(−2) × (−3) × (−4) × (−1)', piege: 'nombre-de-negatifs' },
      ],
    },
    {
      id: 'e-7-2-11', type: 'vraifaux', palier: 3, piege: 'nombre-de-negatifs',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un produit qui contient un facteur négatif est toujours négatif.',
      attendu: false,
      contreExemple: {
        invite: 'Donne deux nombres négatifs : leur produit sera positif.',
        champs: [{ id: 'a', etiquette: 'premier facteur' }, { id: 'b', etiquette: 'second facteur' }],
        valide: (a, b) => a < 0 && b < 0,
        exemple: '(−2) × (−3) = 6 : le produit contient des facteurs négatifs, et il est positif.',
      },
    },
    {
      id: 'e-7-2-12', type: 'trous', palier: 3, piege: 'nombre-de-negatifs',
      consigne: 'Complète avec le nombre entier qui manque.', enonce: '(-2) \\times \\ldots \\times 5 = 30',
      champs: [{ id: 'a', etiquette: 'le facteur manquant', attendu: -3 }],
      fausses: [{ valeur: 3, piege: 'nombre-de-negatifs' }],
    },
  ],

  problemes: [
    {
      id: 'p-7-2-1',
      enonce: 'Un jeu se joue en 4 manches. À chaque manche, chacun des 3 joueurs perd 5 points.',
      questions: [
        { texte: 'Quelle est la variation totale des points des 3 joueurs en une manche ?', attendu: -15 },
        { texte: 'Et sur les 4 manches ?', attendu: -60 },
      ],
    },
    {
      id: 'p-7-2-2',
      enonce: 'On veut calculer astucieusement le produit (−25) × 13 × (−4).',
      questions: [
        { texte: 'Combien vaut (−25) × (−4) ?', attendu: 100 },
        { texte: 'Combien vaut le produit entier ?', attendu: 1300 },
      ],
    },
    {
      id: 'p-7-2-3',
      enonce: 'Une taupe creuse sa galerie en descendant de 2 cm par minute, pendant 3 heures.',
      questions: [
        { texte: 'Combien de minutes dure le creusement ?', attendu: 180, unite: 'min' },
        { texte: 'De combien son altitude a-t-elle varié, en centimètres ?', attendu: -360, unite: 'cm' },
      ],
    },
    {
      id: 'p-7-2-4',
      enonce: 'On multiplie tous les nombres entiers de −5 à 5.',
      questions: [
        { texte: 'Quel est le résultat ?', attendu: 0 },
        { texte: 'Quel est le produit des seuls entiers de −5 à −1 ?', attendu: -120 },
      ],
    },
    {
      id: 'p-7-2-5',
      enonce: 'On multiplie les nombres −1, −2, −3, −4, −5 et −6.',
      questions: [
        { texte: 'Combien de facteurs négatifs y a-t-il ?', attendu: 6 },
        { texte: 'Quel est le produit ?', attendu: 720 },
      ],
    },
  ],

  test: [
    {
      id: 't-7-2-1', type: 'signe', consigne: 'Quel est le signe de ce produit ?', enonce: '(-3) \\times (-3) \\times (-3)',
      attendu: 'négatif', revoir: 'propriete',
    },
    {
      id: 't-7-2-2', type: 'signe', consigne: 'Quel est le signe de ce produit ?', enonce: '(-2) \\times 4 \\times (-1) \\times 6',
      attendu: 'positif', revoir: 'propriete',
    },
    {
      id: 't-7-2-3', type: 'signe', consigne: 'Quel est le signe de ce produit ?', enonce: '5 \\times (-9) \\times 0',
      attendu: 'nul', revoir: 'propriete',
    },
    { id: 't-7-2-4', type: 'calcul', consigne: 'Calcule.', enonce: '(-2) \\times (-2) \\times (-2)', attendu: -8, revoir: 'propriete' },
    { id: 't-7-2-5', type: 'calcul', consigne: 'Calcule.', enonce: '(-5) \\times 2 \\times (-3)', attendu: 30, revoir: 'propriete' },
    { id: 't-7-2-6', type: 'calcul', consigne: 'Calcule.', enonce: '(-1) \\times (-4) \\times (-2{,}5)', attendu: -10, revoir: 'propriete' },
    { id: 't-7-2-7', type: 'calcul', consigne: 'Calcule astucieusement.', enonce: '(-50) \\times 9 \\times (-2)', attendu: 900, revoir: 'remarque' },
    { id: 't-7-2-8', type: 'calcul', consigne: 'Calcule.', enonce: '(-7) \\times 0 \\times (-7) \\times 7', attendu: 0, revoir: 'propriete' },
    {
      id: 't-7-2-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Un produit de trois nombres négatifs est négatif.', attendu: true, revoir: 'propriete',
    },
    {
      id: 't-7-2-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Un produit de quatre nombres négatifs est négatif.', attendu: false, revoir: 'propriete',
    },
  ],
};
