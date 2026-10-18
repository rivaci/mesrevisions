// Chapitre 2, savoir-faire 4 — Calculer vite avec les entiers.
//
// Trois blancs de l'interrogation sont des calculs sans piège : 67 − 45,
// 48 × 5, 46 ÷ 4. Ce n'est pas un manque de savoir, c'est un manque de
// MÉTHODE rapide : poser l'opération dans sa tête prend trop longtemps, et le
// temps file. Le savoir-faire donne une astuce par opération — × 5 = × 10 ÷ 2,
// ÷ 4 = ÷ 2 ÷ 2, soustraire en deux temps — et vise les deux erreurs qu'elles
// évitent : le morceau oublié, la division arrêtée au reste.

export default {
  id: 'sf-2-4',
  titre: 'Calculer vite avec les entiers',
  attendus: [
    'Il utilise des procédures de calcul mental rapides (× 5, ÷ 4, soustraction en deux temps, décomposition).',
    'Il poursuit une division qui ne tombe pas juste après la virgule.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'Multiplier par 5',
      texte: 'Multiplier par 5, c\'est **multiplier par 10, puis diviser par 2** : 64 × 5 = 640 ÷ 2 = **320**.',
    },
    {
      type: 'propriete',
      titre: 'Diviser par 4',
      texte:
        'Diviser par 4, c\'est **diviser deux fois par 2** : 72 ÷ 4 → 36 → **18**. Si ça ne tombe pas juste, '
        + 'on continue après la virgule : 30 ÷ 4 → 15 → **7,5**.',
    },
    {
      type: 'remarque',
      titre: 'Soustraire en deux temps',
      texte: 'On enlève d\'abord les dizaines, puis les unités : 83 − 47 = 83 − 40 − 7 = 43 − 7 = **36**.',
    },
    {
      type: 'remarque',
      titre: 'Décomposer un produit',
      texte: '23 × 4 = 20 × 4 + 3 × 4 = 80 + 12 = **92** : chaque morceau est multiplié, puis on ajoute.',
    },
  ],

  methode: {
    titre: 'Choisir l\'astuce qui va vite',
    enonce: 'Calculer de tête 36 × 5, puis 26 ÷ 4.',
    etapes: [
      { texte: '36 × 5 : × 10 puis ÷ 2 → 360 ÷ 2 = 180.', note: 'Plus rapide que 30 × 5 + 6 × 5.' },
      { texte: '26 ÷ 4 : ÷ 2 puis ÷ 2 → 13, puis 13 ÷ 2 = 6,5.', note: 'Ça ne tombe pas juste : on continue après la virgule.' },
    ],
    controle: 'Le contrôle : 180 se termine par 0, comme un produit par 5 doit le faire ; et 6,5 × 4 = 26.',
  },

  entrainement: [
    // ── Palier 1 : une astuce par calcul ───────────────────────────────────
    {
      id: 'e-2-4-1', type: 'calcul', palier: 1, piege: 'cm-decomposer-oubli',
      consigne: 'Calcule de tête.', enonce: '68 \\times 5', attendu: 340,
      fausses: [{ valeur: 300, piege: 'cm-decomposer-oubli' }, { valeur: 308, piege: 'cm-decomposer-oubli' }],
    },
    {
      id: 'e-2-4-2', type: 'calcul', palier: 1, piege: 'cm-soustraction-chiffres',
      consigne: 'Calcule de tête.', enonce: '84 - 37', attendu: 47,
      fausses: [{ valeur: 53, piege: 'cm-soustraction-chiffres' }],
    },
    {
      // NEUTRE : 56 ÷ 4 tombe juste — aucun reste à prolonger.
      id: 'e-2-4-3', type: 'calcul', palier: 1, neutre: true, piege: 'cm-division-reste',
      consigne: 'Calcule de tête.', enonce: '56 \\div 4', attendu: 14,
    },
    // ── Palier 2 : les restes, les soustractions avec retenue ──────────────
    {
      id: 'e-2-4-4', type: 'calcul', palier: 2, piege: 'cm-division-reste',
      consigne: 'Calcule de tête.', enonce: '58 \\div 4', attendu: 14.5,
      fausses: [{ valeur: 14, piege: 'cm-division-reste' }, { valeur: 14.2, piege: 'cm-division-reste' }],
    },
    {
      id: 'e-2-4-5', type: 'calcul', palier: 2, piege: 'cm-soustraction-chiffres',
      consigne: 'Calcule de tête.', enonce: '93 - 58', attendu: 35,
      fausses: [{ valeur: 45, piege: 'cm-soustraction-chiffres' }],
    },
    {
      id: 'e-2-4-6', type: 'calcul', palier: 2, piege: 'cm-decomposer-oubli',
      consigne: 'Calcule de tête.', enonce: '26 \\times 5', attendu: 130,
      fausses: [{ valeur: 100, piege: 'cm-decomposer-oubli' }],
    },
    {
      id: 'e-2-4-7', type: 'calcul', palier: 2, piege: 'cm-division-reste',
      consigne: 'Calcule de tête.', enonce: '34 \\div 4', attendu: 8.5,
      fausses: [{ valeur: 8, piege: 'cm-division-reste' }, { valeur: 8.2, piege: 'cm-division-reste' }],
    },
    // ── Palier 3 : on choisit soi-même l'astuce ────────────────────────────
    {
      id: 'e-2-4-8', type: 'calcul', palier: 3, piege: 'cm-decomposer-oubli',
      consigne: 'Calcule de tête.', enonce: '25 \\times 12', attendu: 300,
      fausses: [{ valeur: 250, piege: 'cm-decomposer-oubli' }],
    },
    {
      id: 'e-2-4-9', type: 'calcul', palier: 3, piege: 'cm-soustraction-chiffres',
      consigne: 'Calcule de tête.', enonce: '91 - 26', attendu: 65,
      fausses: [{ valeur: 75, piege: 'cm-soustraction-chiffres' }],
    },
    {
      id: 'e-2-4-10', type: 'calcul', palier: 3, piege: 'cm-division-reste',
      consigne: 'Calcule de tête.', enonce: '9 \\div 2', attendu: 4.5,
      fausses: [{ valeur: 4, piege: 'cm-division-reste' }, { valeur: 4.1, piege: 'cm-division-reste' }],
    },
  ],

  // Les calculs de l'interrogation, dont les trois blancs, puis des voisins.
  test: [
    { id: 't-2-4-1', type: 'calcul', consigne: 'Calcule de tête.', enonce: '67 - 45', attendu: 22, revoir: 'remarque' },
    { id: 't-2-4-2', type: 'calcul', consigne: 'Calcule de tête.', enonce: '48 \\times 5', attendu: 240, fausses: [{ valeur: 200, piege: 'cm-decomposer-oubli' }], revoir: 'propriete' },
    { id: 't-2-4-3', type: 'calcul', consigne: 'Calcule de tête.', enonce: '46 \\div 4', attendu: 11.5, fausses: [{ valeur: 11, piege: 'cm-division-reste' }, { valeur: 11.2, piege: 'cm-division-reste' }], revoir: 'propriete' },
    { id: 't-2-4-4', type: 'calcul', consigne: 'Calcule de tête.', enonce: '54 \\div 9', attendu: 6, revoir: 'propriete' },
    { id: 't-2-4-5', type: 'calcul', consigne: 'Calcule de tête.', enonce: '11 \\div 2', attendu: 5.5, fausses: [{ valeur: 5, piege: 'cm-division-reste' }], revoir: 'propriete' },
    { id: 't-2-4-6', type: 'calcul', consigne: 'Calcule de tête.', enonce: '44 \\times 2', attendu: 88, revoir: 'remarque' },
    { id: 't-2-4-7', type: 'calcul', consigne: 'Calcule de tête.', enonce: '76 - 39', attendu: 37, fausses: [{ valeur: 43, piege: 'cm-soustraction-chiffres' }], revoir: 'remarque' },
    { id: 't-2-4-8', type: 'calcul', consigne: 'Calcule de tête.', enonce: '15 \\times 6', attendu: 90, fausses: [{ valeur: 66, piege: 'cm-decomposer-oubli' }], revoir: 'remarque' },
    { id: 't-2-4-9', type: 'calcul', consigne: 'Calcule de tête.', enonce: '1000 \\div 2', attendu: 500, revoir: 'propriete' },
    { id: 't-2-4-10', type: 'calcul', consigne: 'Calcule de tête.', enonce: '42 \\times 5', attendu: 210, fausses: [{ valeur: 200, piege: 'cm-decomposer-oubli' }], revoir: 'propriete' },
  ],
};
