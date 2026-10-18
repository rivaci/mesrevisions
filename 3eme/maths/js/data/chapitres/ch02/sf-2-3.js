// Chapitre 2, savoir-faire 3 — Trouver le nombre manquant.
//
// L'interrogation en posait neuf ; Evan en a réussi six, et laissé deux
// blancs : ? − 75 = 14 et 0,4 + ? = 1. Ce sont justement ceux où l'opération à
// faire n'est PAS celle de l'énoncé — il faut l'inverser : ajouter quand
// l'énoncé soustrait, soustraire quand il ajoute. Le geste de contrôle est
// toujours le même, et il prend trois secondes : remettre sa réponse à la
// place du ?.

export default {
  id: 'sf-2-3',
  titre: 'Trouver le nombre manquant',
  attendus: [
    'Il trouve le terme ou le facteur manquant d\'une égalité en utilisant l\'opération inverse.',
    'Il complète un nombre à 1 ou à 10.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'L\'opération inverse',
      texte:
        'Pour trouver le nombre manquant, on fait l\'**opération inverse** de celle de l\'énoncé :\n'
        + '? + 35 = 90 → ? = 90 − 35 = 55   ·   ? − 20 = 7 → ? = 7 + 20 = 27\n'
        + '? × 6 = 42 → ? = 42 ÷ 6 = 7   ·   ? ÷ 5 = 8 → ? = 8 × 5 = 40',
    },
    {
      type: 'remarque',
      titre: 'Compléter à 1 ou à 10',
      texte:
        'Compléter à 1, c\'est chercher ce qui manque : 0,3 + ? = 1 → **0,7** (3 dixièmes + 7 dixièmes = '
        + '10 dixièmes). De même : 2,5 + ? = 10 → **7,5**.',
    },
  ],

  methode: {
    titre: 'Inverser l\'opération, puis vérifier',
    enonce: 'Trouver le nombre manquant : ? − 46 = 38.',
    etapes: [
      { texte: 'On a enlevé 46 et il reste 38 : avant, on avait 38 + 46.', note: 'L\'énoncé soustrait, moi j\'ajoute.' },
      { texte: '? = 38 + 46 = 84.', note: '' },
    ],
    controle: 'Le contrôle : je remets 84 à la place du ? — 84 − 46 = 38. C\'est bien le résultat de l\'énoncé.',
  },

  entrainement: [
    // ── Palier 1 : additions et soustractions ──────────────────────────────
    {
      id: 'e-2-3-1', type: 'calcul', palier: 1, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '? - 36 = 21', attendu: 57,
      fausses: [{ valeur: 15, piege: 'cm-trou-operation-inverse' }, { valeur: -15, piege: 'cm-trou-operation-inverse' }],
    },
    {
      id: 'e-2-3-2', type: 'calcul', palier: 1, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '8 + ? = 95', attendu: 87,
      fausses: [{ valeur: 103, piege: 'cm-trou-operation-inverse' }],
    },
    {
      // NEUTRE : la table de 9 suffit, sans rien inverser de difficile.
      id: 'e-2-3-3', type: 'calcul', palier: 1, neutre: true, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '9 \\times ? = 90', attendu: 10,
    },
    // ── Palier 2 : multiplications, divisions, compléments ─────────────────
    {
      id: 'e-2-3-4', type: 'calcul', palier: 2, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '? \\div 4 = 12', attendu: 48,
      fausses: [{ valeur: 3, piege: 'cm-trou-operation-inverse' }],
    },
    {
      id: 'e-2-3-5', type: 'calcul', palier: 2, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '0{,}7 + ? = 1', attendu: 0.3,
      fausses: [{ valeur: 1.7, piege: 'cm-trou-operation-inverse' }],
    },
    {
      id: 'e-2-3-6', type: 'calcul', palier: 2, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '? - 48 = 25', attendu: 73,
      fausses: [{ valeur: 23, piege: 'cm-trou-operation-inverse' }],
    },
    {
      id: 'e-2-3-7', type: 'calcul', palier: 2, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '6 \\times ? = 54', attendu: 9,
      fausses: [{ valeur: 324, piege: 'cm-trou-operation-inverse' }],
    },
    // ── Palier 3 : décimaux et fractions ───────────────────────────────────
    {
      id: 'e-2-3-8', type: 'calcul', palier: 3, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '3{,}5 + ? = 10', attendu: 6.5,
      fausses: [{ valeur: 13.5, piege: 'cm-trou-operation-inverse' }],
    },
    {
      id: 'e-2-3-9', type: 'calcul', palier: 3, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve le nombre manquant.', enonce: '? + 1{,}6 = 4', attendu: 2.4,
      fausses: [{ valeur: 5.6, piege: 'cm-trou-operation-inverse' }],
    },
    {
      id: 'e-2-3-10', type: 'fraction', palier: 3, piege: 'cm-trou-operation-inverse',
      consigne: 'Trouve la fraction manquante.', enonce: '\\dfrac{1}{3} + ? = 1', attendu: [2, 3],
      fausses: [{ valeur: '4/3', piege: 'cm-trou-operation-inverse' }],
    },
  ],

  // Les six trous de l'interrogation, puis des voisins.
  test: [
    { id: 't-2-3-1', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '5 + ? = 77', attendu: 72, fausses: [{ valeur: 82, piege: 'cm-trou-operation-inverse' }], revoir: 'propriete' },
    { id: 't-2-3-2', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '? - 75 = 14', attendu: 89, fausses: [{ valeur: 61, piege: 'cm-trou-operation-inverse' }, { valeur: -61, piege: 'cm-trou-operation-inverse' }], revoir: 'propriete' },
    { id: 't-2-3-3', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '0{,}4 + ? = 1', attendu: 0.6, fausses: [{ valeur: 1.4, piege: 'cm-trou-operation-inverse' }], revoir: 'remarque' },
    { id: 't-2-3-4', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '10 \\times ? = 100', attendu: 10, fausses: [{ valeur: 1000, piege: 'cm-trou-operation-inverse' }], revoir: 'propriete' },
    { id: 't-2-3-5', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '? \\div 3 = 10', attendu: 30, revoir: 'propriete' },
    { id: 't-2-3-6', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '50 + ? = 135', attendu: 85, fausses: [{ valeur: 185, piege: 'cm-trou-operation-inverse' }], revoir: 'propriete' },
    { id: 't-2-3-7', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '? - 18 = 47', attendu: 65, fausses: [{ valeur: 29, piege: 'cm-trou-operation-inverse' }], revoir: 'propriete' },
    { id: 't-2-3-8', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '7 \\times ? = 63', attendu: 9, revoir: 'propriete' },
    { id: 't-2-3-9', type: 'calcul', consigne: 'Trouve le nombre manquant.', enonce: '0{,}25 + ? = 1', attendu: 0.75, fausses: [{ valeur: 1.25, piege: 'cm-trou-operation-inverse' }], revoir: 'remarque' },
    { id: 't-2-3-10', type: 'fraction', consigne: 'Trouve la fraction manquante.', enonce: '\\dfrac{1}{4} + ? = 1', attendu: [3, 4], fausses: [{ valeur: '5/4', piege: 'cm-trou-operation-inverse' }], revoir: 'remarque' },
  ],
};
