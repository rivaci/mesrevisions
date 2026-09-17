// Chapitre 1, savoir-faire 6 — La distributivité simple.
//
// ── Ce que la liste demande ──────────────────────────────────────────────
//
// « Connaître et utiliser la distributivité simple sur des exemples
// numériques. » Pas de lettre ici : le calcul littéral viendra plus tard. On
// s'en sert pour ce qu'elle apporte tout de suite — calculer de tête 7 × 102
// ou 9 × 98, et reconnaître 25 × 13 + 25 × 7 comme 25 × 20.
//
// ── L'erreur visée ───────────────────────────────────────────────────────
//
// La plus stable de toutes : multiplier le premier terme seulement,
// 7 × (100 + 2) = 700 + 2. Elle survivra jusqu'en 3e si elle n'est pas
// traitée au moment où la propriété apparaît. D'où le geste de contrôle —
// une flèche du facteur vers CHAQUE terme — et une vérification toujours
// possible sur des nombres : calculer d'abord la parenthèse.
//
// Un item neutre, 3 × 4 + 5, rappelle que sans parenthèse il n'y a rien à
// distribuer. Sans lui, « je distribue dès que je vois × et + » deviendrait
// une règle.

export default {
  id: 'sf-1-6',
  titre: 'Utiliser la distributivité',
  attendus: [
    'Il sait que k × (a + b) = k × a + k × b, et de même avec une différence.',
    'Il s\'en sert pour calculer de tête, dans un sens comme dans l\'autre.',
  ],

  decouvrir: {
    titre: 'Calculer 7 × 102 sans poser l\'opération',
    texte:
      'Un élève remarque que 102 = 100 + 2. Il calcule donc séparément sept fois '
      + 'cent, puis sept fois deux, et additionne.',
    lignes: [
      { calcul: '7 × 100', resultat: 'sept fois cent' },
      { calcul: '7 × 2', resultat: 'sept fois deux' },
    ],
    question: 'Calcule ces deux produits, puis leur somme.',
    champs: [
      { id: 'a', etiquette: '7 × 100 + 7 × 2', attendu: 714 },
      { id: 'b', etiquette: '7 × 102, posé comme d\'habitude', attendu: 714 },
    ],
    conclusion:
      'Les deux font **714**. Multiplier une somme, c\'est multiplier **chacun** de '
      + 'ses termes, puis additionner : 7 × (100 + 2) = 7 × 100 + 7 × 2.\n'
      + 'C\'est la **distributivité** : le 7 se « distribue » sur le 100 ET sur le 2.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'La distributivité',
      texte:
        'Pour tous nombres k, a et b :\n'
        + '**k × (a + b) = k × a + k × b**\n'
        + '**k × (a − b) = k × a − k × b**',
    },
    {
      type: 'remarque',
      titre: 'Dans l\'autre sens : mettre en facteur',
      texte:
        'Quand un même nombre multiplie deux termes, on peut le « sortir » :\n'
        + '25 × 13 + 25 × 7 = 25 × (13 + 7) = 25 × 20 = **500**.\n'
        + 'C\'est souvent le chemin le plus court.',
    },
    {
      type: 'remarque',
      titre: 'Pour calculer de tête',
      texte:
        'On décompose le nombre près d\'un compte rond :\n'
        + '9 × 98 = 9 × (100 − 2) = 900 − 18 = **882**.\n'
        + 'Attention : le 9 multiplie le 100 ET le 2.',
    },
    {
      type: 'exemple',
      texte: '7 × 102 = 700 + 14 = 714   ·   9 × 98 = 900 − 18 = 882   ·   25 × 13 + 25 × 7 = 500',
    },
  ],

  methode: {
    titre: 'Calculer 6 × 103 de tête',
    enonce: 'Calculer 6 × 103 sans poser la multiplication.',
    etapes: [
      { texte: 'Je décompose : 103 = 100 + 3.', note: 'Un compte rond, plus un petit nombre.' },
      { texte: 'Je distribue le 6 sur CHAQUE terme : 6 × 100 + 6 × 3.', note: 'Deux flèches partent du 6.' },
      { texte: 'Je calcule : 600 + 18 = 618.', note: '' },
    ],
    controle:
      'Le contrôle : 6 × 103 doit valoir un peu plus que 6 × 100 = 600, et 3 fois '
      + '6 de plus. Si tu trouves 603, tu as oublié de multiplier le 3.',
  },

  entrainement: [
    // ── Palier 1 : la propriété, sur une parenthèse écrite ─────────────────
    {
      id: 'e-1-6-1', type: 'trous', palier: 1, piege: 'distributivite-incomplete',
      consigne: 'Calcule 8 × 103 en distribuant : 8 × 100 + 8 × 3.',
      enonce: '8 \\times 103 = 8 \\times 100 + 8 \\times 3',
      champs: [
        { id: 'a', etiquette: '8 × 100', attendu: 800 },
        { id: 'b', etiquette: '8 × 3', attendu: 24 },
        { id: 'c', etiquette: '8 × 103', attendu: 824 },
      ],
      fausses: [{ valeur: 803, piege: 'distributivite-incomplete' }],
    },
    {
      id: 'e-1-6-2', type: 'calcul', palier: 1, piege: 'distributivite-incomplete',
      consigne: 'Calcule en distribuant.', enonce: '5 \\times (20 + 4)', attendu: 120,
      fausses: [{ valeur: 104, piege: 'distributivite-incomplete' }],
    },
    {
      id: 'e-1-6-3', type: 'choix', palier: 1, piege: 'distributivite-incomplete',
      consigne: 'Quelle écriture est égale à ce produit ?',
      enonce: '6 \\times (10 + 7)',
      choix: ['6 × 10 + 6 × 7', '6 × 10 + 7', '6 + 10 × 7'],
      attendu: '6 × 10 + 6 × 7',
      fausses: [
        { valeur: '6 × 10 + 7', piege: 'distributivite-incomplete' },
        { valeur: '6 + 10 × 7', piege: 'distributivite-incomplete' },
      ],
    },
    {
      // NEUTRE : pas de parenthèse, donc rien à distribuer.
      id: 'e-1-6-4', type: 'calcul', palier: 1, neutre: true, piege: 'priorite-ignoree',
      consigne: 'Calcule. Attention : il n\'y a pas de parenthèse.', enonce: '3 \\times 4 + 5', attendu: 17,
      fausses: [{ valeur: 27, piege: 'priorite-ignoree' }],
    },
    // ── Palier 2 : calculer de tête ────────────────────────────────────────
    {
      id: 'e-1-6-5', type: 'calcul', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Calcule de tête, en écrivant 98 = 100 − 2.', enonce: '7 \\times 98', attendu: 686,
      fausses: [{ valeur: 698, piege: 'distributivite-incomplete' }],
    },
    {
      id: 'e-1-6-6', type: 'calcul', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Calcule de tête, en écrivant 101 = 100 + 1.', enonce: '12 \\times 101', attendu: 1212,
      fausses: [{ valeur: 1201, piege: 'distributivite-incomplete' }],
    },
    {
      id: 'e-1-6-7', type: 'choix', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Quelle écriture est égale à ce produit ?',
      enonce: '4 \\times (25 - 3)',
      choix: ['4 × 25 − 4 × 3', '4 × 25 − 3', '4 × 25 + 4 × 3'],
      attendu: '4 × 25 − 4 × 3',
      fausses: [
        { valeur: '4 × 25 − 3', piege: 'distributivite-incomplete' },
        { valeur: '4 × 25 + 4 × 3', piege: 'distributivite-incomplete' },
      ],
    },
    // ── Palier 3 : dans l'autre sens, et le diagnostic ─────────────────────
    {
      id: 'e-1-6-8', type: 'calcul', palier: 3, piege: 'distributivite-incomplete',
      consigne: 'Calcule astucieusement, en mettant 17 en facteur.', enonce: '17 \\times 6 + 17 \\times 4', attendu: 170,
    },
    {
      id: 'e-1-6-9', type: 'trous', palier: 3, piege: 'distributivite-incomplete',
      consigne: 'Calcule 7 × 49 en écrivant 49 = 50 − 1.',
      enonce: '7 \\times 49 = 7 \\times 50 - 7 \\times 1',
      champs: [
        { id: 'a', etiquette: '7 × 50', attendu: 350 },
        { id: 'b', etiquette: '7 × 1', attendu: 7 },
        { id: 'c', etiquette: '7 × 49', attendu: 343 },
      ],
      fausses: [{ valeur: 349, piege: 'distributivite-incomplete' }],
    },
    {
      id: 'e-1-6-10', type: 'corriger', palier: 3, piege: 'distributivite-incomplete',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Calculer } 8 \\times 105',
      lignes: [
        { texte: '8 × 105 = 8 × (100 + 5)', fausse: false },
        { texte: '= 8 × 100 + 5', fausse: true },
        { texte: '= 800 + 5', fausse: false },
        { texte: '= 805', fausse: false },
      ],
      explication:
        'La décomposition de la première ligne est juste. À la deuxième, le 8 ne '
        + 'multiplie que le 100 : le 5 a été oublié. Il fallait 8 × 100 + 8 × 5 = '
        + '800 + 40 = 840.',
    },
  ],

  problemes: [
    {
      id: 'p-1-6-1',
      enonce: 'Un club achète 8 maillots à 15 € et 8 shorts à 10 €.',
      questions: [
        { texte: 'Combien coûtent un maillot et un short ensemble ?', attendu: 25, unite: '€' },
        { texte: 'Combien le club paie-t-il en tout ?', attendu: 200, unite: '€' },
      ],
    },
    {
      id: 'p-1-6-2',
      enonce: 'Un livre coûte 12 €. Le libraire en vend 49 le matin et 51 l\'après-midi.',
      questions: [
        { texte: 'Combien de livres vend-il dans la journée ?', attendu: 100, unite: 'livres' },
        { texte: 'Quelle est sa recette de la journée ?', attendu: 1200, unite: '€' },
      ],
    },
    {
      id: 'p-1-6-3',
      enonce: 'Pour une sortie, 9 cars transportent chacun 52 élèves.',
      questions: [
        { texte: 'Combien d\'élèves y aurait-il avec 50 élèves par car ?', attendu: 450, unite: 'élèves' },
        { texte: 'Combien d\'élèves partent réellement ?', attendu: 468, unite: 'élèves' },
      ],
    },
    {
      id: 'p-1-6-4',
      enonce: 'Une boîte contient 99 perles. Antonin achète 6 boîtes.',
      questions: [
        { texte: 'Combien de perles y aurait-il avec 100 perles par boîte ?', attendu: 600, unite: 'perles' },
        { texte: 'Combien de perles Antonin a-t-il réellement ?', attendu: 594, unite: 'perles' },
      ],
    },
    {
      id: 'p-1-6-5',
      enonce: 'Une salle a 25 rangées de 17 places en bas, et 25 rangées de 3 places au balcon.',
      questions: [
        { texte: 'Combien de places compte une rangée du bas et une du balcon réunies ?', attendu: 20, unite: 'places' },
        { texte: 'Combien de places la salle compte-t-elle en tout ?', attendu: 500, unite: 'places' },
      ],
    },
  ],

  test: [
    { id: 't-1-6-1', type: 'calcul', consigne: 'Calcule.', enonce: '4 \\times (30 + 2)', attendu: 128, revoir: 'propriete' },
    { id: 't-1-6-2', type: 'calcul', consigne: 'Calcule de tête.', enonce: '6 \\times 102', attendu: 612, revoir: 'remarque' },
    { id: 't-1-6-3', type: 'calcul', consigne: 'Calcule de tête.', enonce: '5 \\times 99', attendu: 495, revoir: 'remarque' },
    {
      id: 't-1-6-4', type: 'choix', consigne: 'Quelle écriture est égale à ce produit ?', enonce: '3 \\times (8 + 5)',
      choix: ['3 × 8 + 3 × 5', '3 × 8 + 5', '3 + 8 × 5'], attendu: '3 × 8 + 3 × 5', revoir: 'propriete',
    },
    { id: 't-1-6-5', type: 'calcul', consigne: 'Calcule astucieusement.', enonce: '13 \\times 7 + 13 \\times 3', attendu: 130, revoir: 'remarque' },
    { id: 't-1-6-6', type: 'calcul', consigne: 'Calcule de tête, avec 11 = 10 + 1.', enonce: '11 \\times 12', attendu: 132, revoir: 'propriete' },
    {
      id: 't-1-6-7', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: '7 × (10 + 2) est égal à 7 × 10 + 2.', attendu: false, revoir: 'propriete',
    },
    { id: 't-1-6-8', type: 'calcul', consigne: 'Calcule de tête, avec 49 = 50 − 1.', enonce: '8 \\times 49', attendu: 392, revoir: 'remarque' },
    { id: 't-1-6-9', type: 'calcul', consigne: 'Calcule astucieusement.', enonce: '15 \\times 8 + 15 \\times 2', attendu: 150, revoir: 'remarque' },
    {
      id: 't-1-6-10', type: 'trous', consigne: 'Calcule 9 × 104 en distribuant.', enonce: '9 \\times 104 = 9 \\times 100 + 9 \\times 4',
      champs: [
        { id: 'a', etiquette: '9 × 100', attendu: 900 },
        { id: 'b', etiquette: '9 × 4', attendu: 36 },
        { id: 'c', etiquette: '9 × 104', attendu: 936 },
      ],
      revoir: 'propriete',
    },
  ],
};
