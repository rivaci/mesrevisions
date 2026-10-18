// Chapitre 2, savoir-faire 1 — Calculer avec les décimaux : la virgule à sa place.
//
// Trois des quatre erreurs de l'interrogation de calcul mental sont des
// virgules : 0,6 × 3 sans la virgule remise, 453 ÷ 100 décalé d'un seul rang,
// 18,7 − 8 faux d'une unité. Le savoir-faire installe un réflexe pour chacune :
// calculer sans la virgule puis la remettre, compter les zéros, ne toucher qu'à
// la partie entière — et un contrôle d'ordre de grandeur, qui prend deux
// secondes et rattrape les trois.
//
// Le « Se tester » reprend les calculs exacts de l'interrogation.

export default {
  id: 'sf-2-1',
  titre: 'Calculer avec les décimaux : la virgule à sa place',
  attendus: [
    'Il multiplie un décimal par un entier de tête, en plaçant la virgule.',
    'Il multiplie et divise par 10, 100, 1 000, 0,1 en décalant la virgule du bon nombre de rangs.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'Multiplier un décimal par un entier',
      texte:
        'On calcule **sans la virgule**, puis on remet **autant de chiffres après la virgule** qu\'il y '
        + 'en avait au départ.\n'
        + '0,7 × 4 → 7 × 4 = 28 → **2,8** (un chiffre après la virgule au départ, un à l\'arrivée).',
    },
    {
      type: 'propriete',
      titre: 'Multiplier ou diviser par 10, 100, 1 000',
      texte:
        'Multiplier : la virgule avance vers la **droite** d\'autant de rangs que de zéros. Diviser : '
        + 'elle recule vers la **gauche**.\n'
        + '3,72 × 100 = 372   ·   58 ÷ 10 = 5,8   ·   265 ÷ 1 000 = 0,265',
    },
    {
      type: 'propriete',
      titre: 'Multiplier ou diviser par 0,1',
      texte:
        '**× 0,1**, c\'est prendre le dixième : c\'est **÷ 10**. **÷ 0,1**, c\'est compter les dixièmes : '
        + 'c\'est **× 10**.\n'
        + '37 × 0,1 = 3,7   ·   2,5 ÷ 0,1 = 25',
    },
    {
      type: 'remarque',
      titre: 'Ajouter ou enlever un entier',
      texte:
        'Seule la **partie entière** change, les chiffres après la virgule ne bougent pas : '
        + '24,6 − 9 = 15,6.',
    },
  ],

  methode: {
    titre: 'Placer la virgule sans se tromper',
    enonce: 'Calculer de tête 0,8 × 7, puis 625 ÷ 100.',
    etapes: [
      { texte: '0,8 × 7 : je calcule sans la virgule, 8 × 7 = 56.', note: 'Le calcul entier d\'abord.' },
      { texte: '0,8 a un chiffre après la virgule, donc le résultat aussi : 0,8 × 7 = 5,6.', note: '' },
      { texte: '625 ÷ 100 : deux zéros, la virgule recule de deux rangs : 625 ÷ 100 = 6,25.', note: 'Diviser rend plus petit : vers la gauche.' },
    ],
    controle:
      'Le contrôle : l\'ordre de grandeur. 0,8 × 7 est un peu moins que 1 × 7 = 7, donc 5,6 est '
      + 'plausible (56 ne l\'est pas). 625 ÷ 100 doit être entre 1 et 10, puisque 100 × 10 = 1 000.',
  },

  entrainement: [
    // ── Palier 1 : un réflexe à la fois ────────────────────────────────────
    {
      id: 'e-2-1-1', type: 'calcul', palier: 1, piege: 'cm-virgule-produit',
      consigne: 'Calcule de tête.', enonce: '0{,}4 \\times 3', attendu: 1.2,
      fausses: [{ valeur: 12, piege: 'cm-virgule-produit' }, { valeur: 0.12, piege: 'cm-virgule-produit' }],
    },
    {
      id: 'e-2-1-2', type: 'calcul', palier: 1, piege: 'cm-decalage-virgule',
      consigne: 'Calcule de tête.', enonce: '732 \\div 100', attendu: 7.32,
      fausses: [{ valeur: 73.2, piege: 'cm-decalage-virgule' }, { valeur: 73200, piege: 'cm-decalage-virgule' }],
    },
    {
      // NEUTRE : aucune virgule à déplacer ni à remettre — il suffit d'ajouter 1.
      id: 'e-2-1-3', type: 'calcul', palier: 1, neutre: true, piege: 'cm-virgule-produit',
      consigne: 'Calcule de tête.', enonce: '25{,}3 + 1', attendu: 26.3,
    },
    {
      id: 'e-2-1-4', type: 'calcul', palier: 1, piege: 'cm-soustraction-decimale',
      consigne: 'Calcule de tête.', enonce: '27{,}4 - 9', attendu: 18.4,
      fausses: [{ valeur: 19.4, piege: 'cm-soustraction-decimale' }, { valeur: 17.4, piege: 'cm-soustraction-decimale' }],
    },
    // ── Palier 2 : 0,1, et des produits plus grands ────────────────────────
    {
      id: 'e-2-1-5', type: 'calcul', palier: 2, piege: 'cm-decalage-virgule',
      consigne: 'Calcule de tête.', enonce: '56 \\times 0{,}1', attendu: 5.6,
      fausses: [{ valeur: 560, piege: 'cm-decalage-virgule' }],
    },
    {
      id: 'e-2-1-6', type: 'calcul', palier: 2, piege: 'cm-decalage-virgule',
      consigne: 'Calcule de tête.', enonce: '38 \\div 0{,}1', attendu: 380,
      fausses: [{ valeur: 3.8, piege: 'cm-decalage-virgule' }],
    },
    {
      id: 'e-2-1-7', type: 'calcul', palier: 2, piege: 'cm-virgule-produit',
      consigne: 'Calcule de tête.', enonce: '1{,}2 \\times 4', attendu: 4.8,
      fausses: [{ valeur: 48, piege: 'cm-virgule-produit' }, { valeur: 0.48, piege: 'cm-virgule-produit' }],
    },
    {
      // NEUTRE : × 10 sur un entier, rien à recompter.
      id: 'e-2-1-8', type: 'calcul', palier: 2, neutre: true, piege: 'cm-decalage-virgule',
      consigne: 'Calcule de tête.', enonce: '47 \\times 10', attendu: 470,
    },
    // ── Palier 3 : plusieurs zéros, plusieurs chiffres ─────────────────────
    {
      id: 'e-2-1-9', type: 'calcul', palier: 3, piege: 'cm-virgule-produit',
      consigne: 'Calcule de tête.', enonce: '0{,}7 \\times 6', attendu: 4.2,
      fausses: [{ valeur: 42, piege: 'cm-virgule-produit' }, { valeur: 0.42, piege: 'cm-virgule-produit' }],
    },
    {
      id: 'e-2-1-10', type: 'calcul', palier: 3, piege: 'cm-decalage-virgule',
      consigne: 'Calcule de tête.', enonce: '9{,}05 \\times 100', attendu: 905,
      fausses: [{ valeur: 90.5, piege: 'cm-decalage-virgule' }, { valeur: 0.0905, piege: 'cm-decalage-virgule' }],
    },
  ],

  // Les calculs exacts de l'interrogation, puis des voisins.
  test: [
    {
      id: 't-2-1-1', type: 'calcul', consigne: 'Calcule de tête.', enonce: '0{,}6 \\times 3', attendu: 1.8,
      fausses: [{ valeur: 18, piege: 'cm-virgule-produit' }, { valeur: 0.18, piege: 'cm-virgule-produit' }], revoir: 'propriete',
    },
    {
      id: 't-2-1-2', type: 'calcul', consigne: 'Calcule de tête.', enonce: '453 \\div 100', attendu: 4.53,
      fausses: [{ valeur: 45.3, piege: 'cm-decalage-virgule' }], revoir: 'propriete',
    },
    {
      id: 't-2-1-3', type: 'calcul', consigne: 'Calcule de tête.', enonce: '18{,}7 - 8', attendu: 10.7,
      fausses: [{ valeur: 11.7, piege: 'cm-soustraction-decimale' }], revoir: 'remarque',
    },
    { id: 't-2-1-4', type: 'calcul', consigne: 'Calcule de tête.', enonce: '42 \\div 0{,}1', attendu: 420, fausses: [{ valeur: 4.2, piege: 'cm-decalage-virgule' }], revoir: 'propriete' },
    { id: 't-2-1-5', type: 'calcul', consigne: 'Calcule de tête.', enonce: '81 \\times 0{,}1', attendu: 8.1, fausses: [{ valeur: 810, piege: 'cm-decalage-virgule' }], revoir: 'propriete' },
    { id: 't-2-1-6', type: 'calcul', consigne: 'Calcule de tête.', enonce: '16{,}5 + 1', attendu: 17.5, revoir: 'remarque' },
    {
      id: 't-2-1-7', type: 'calcul', consigne: 'Calcule de tête.', enonce: '0{,}3 \\times 8', attendu: 2.4,
      fausses: [{ valeur: 24, piege: 'cm-virgule-produit' }, { valeur: 0.24, piege: 'cm-virgule-produit' }], revoir: 'propriete',
    },
    { id: 't-2-1-8', type: 'calcul', consigne: 'Calcule de tête.', enonce: '6{,}4 \\div 10', attendu: 0.64, fausses: [{ valeur: 64, piege: 'cm-decalage-virgule' }], revoir: 'propriete' },
    { id: 't-2-1-9', type: 'calcul', consigne: 'Calcule de tête.', enonce: '35{,}2 - 7', attendu: 28.2, fausses: [{ valeur: 29.2, piege: 'cm-soustraction-decimale' }], revoir: 'remarque' },
    { id: 't-2-1-10', type: 'calcul', consigne: 'Calcule de tête.', enonce: '1{,}5 \\times 6', attendu: 9, fausses: [{ valeur: 90, piege: 'cm-virgule-produit' }, { valeur: 0.9, piege: 'cm-virgule-produit' }], revoir: 'propriete' },
  ],
};
