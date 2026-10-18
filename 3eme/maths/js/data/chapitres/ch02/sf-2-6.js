// Chapitre 2, savoir-faire 6 — Calculer avec les nombres relatifs.
//
// À l'interrogation, quatre relatifs sur cinq sont justes : les sommes et les
// produits sont sus. Le blanc est (+6) − (−18) : soustraire un négatif, la
// seule opération où le résultat AUGMENTE quand on « enlève ». C'est le cœur
// du savoir-faire, entouré de ce qui doit rester sûr — les sommes de signes
// contraires, la règle des signes du produit — pour ne pas le réapprendre en
// cassant le reste.

export default {
  id: 'sf-2-6',
  titre: 'Calculer avec les nombres relatifs',
  attendus: [
    'Il additionne et soustrait des nombres relatifs de tête.',
    'Il multiplie et divise des nombres relatifs en appliquant la règle des signes.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'Additionner deux relatifs',
      texte:
        '**Même signe** : on additionne les distances à zéro et on garde le signe — (−3) + (−5) = −8.\n'
        + '**Signes contraires** : on soustrait les distances à zéro, et on prend le signe du plus éloigné '
        + 'de zéro — (−9) + (+4) = −5.',
    },
    {
      type: 'propriete',
      titre: 'Soustraire, c\'est ajouter l\'opposé',
      texte: '(+3) − (−5) = 3 + 5 = **8**   ·   (−2) − (+7) = −2 − 7 = **−9**.',
    },
    {
      type: 'propriete',
      titre: 'Multiplier et diviser : la règle des signes',
      texte:
        'Deux nombres de **même signe** : résultat **positif**. De **signes contraires** : résultat '
        + '**négatif**.\n(−3) × (−7) = 21   ·   (−56) ÷ 8 = −7',
    },
  ],

  methode: {
    titre: 'Transformer la soustraction en addition',
    enonce: 'Calculer (−9) − (−14), puis (−32) ÷ 8.',
    etapes: [
      { texte: 'Soustraire −14, c\'est ajouter 14 : (−9) − (−14) = −9 + 14.', note: 'L\'opposé de −14 est 14.' },
      { texte: 'Signes contraires : 14 − 9 = 5, et 14 est le plus loin de zéro → +5.', note: '' },
      { texte: '(−32) ÷ 8 : signes contraires → négatif ; 32 ÷ 8 = 4 → −4.', note: 'Le signe d\'abord, le nombre ensuite.' },
    ],
    controle:
      'Le contrôle : soustraire un négatif fait augmenter — 5 est bien plus grand que −9. Et −4 × 8 = −32.',
  },

  entrainement: [
    // ── Palier 1 : soustraire un négatif ───────────────────────────────────
    {
      id: 'e-2-6-1', type: 'calcul', palier: 1, piege: 'cm-soustraire-negatif',
      consigne: 'Calcule de tête.', enonce: '(+5) - (-12)', attendu: 17,
      fausses: [{ valeur: -7, piege: 'cm-soustraire-negatif' }, { valeur: 7, piege: 'cm-soustraire-negatif' }],
    },
    {
      id: 'e-2-6-2', type: 'calcul', palier: 1, piege: 'cm-somme-relatifs',
      consigne: 'Calcule de tête.', enonce: '(-15) + (+6)', attendu: -9,
      fausses: [{ valeur: -21, piege: 'cm-somme-relatifs' }, { valeur: 9, piege: 'cm-somme-relatifs' }],
    },
    {
      // NEUTRE : deux opposés, la somme est nulle sans règle à choisir.
      id: 'e-2-6-3', type: 'calcul', palier: 1, neutre: true, piege: 'cm-somme-relatifs',
      consigne: 'Calcule de tête.', enonce: '(-20) + (+20)', attendu: 0,
    },
    // ── Palier 2 : soustractions dans les deux sens, produits ──────────────
    {
      id: 'e-2-6-4', type: 'calcul', palier: 2, piege: 'cm-soustraire-negatif',
      consigne: 'Calcule de tête.', enonce: '(-3) - (+8)', attendu: -11,
      fausses: [{ valeur: 5, piege: 'cm-soustraire-negatif' }, { valeur: 11, piege: 'cm-soustraire-negatif' }],
    },
    {
      id: 'e-2-6-5', type: 'calcul', palier: 2, piege: 'cm-signes-produit',
      consigne: 'Calcule de tête.', enonce: '(-4) \\times (-6)', attendu: 24,
      fausses: [{ valeur: -24, piege: 'cm-signes-produit' }],
    },
    {
      id: 'e-2-6-6', type: 'calcul', palier: 2, piege: 'cm-signes-produit',
      consigne: 'Calcule de tête.', enonce: '42 \\div (-7)', attendu: -6,
      fausses: [{ valeur: 6, piege: 'cm-signes-produit' }],
    },
    {
      id: 'e-2-6-7', type: 'calcul', palier: 2, piege: 'cm-soustraire-negatif',
      consigne: 'Calcule de tête.', enonce: '(+7) - (-7)', attendu: 14,
      fausses: [{ valeur: 0, piege: 'cm-soustraire-negatif' }],
    },
    // ── Palier 3 : les quatre opérations mêlées ────────────────────────────
    {
      id: 'e-2-6-8', type: 'calcul', palier: 3, piege: 'cm-somme-relatifs',
      consigne: 'Calcule de tête.', enonce: '-8 + 13', attendu: 5,
      fausses: [{ valeur: -21, piege: 'cm-somme-relatifs' }, { valeur: -5, piege: 'cm-somme-relatifs' }],
    },
    {
      id: 'e-2-6-9', type: 'calcul', palier: 3, piege: 'cm-soustraire-negatif',
      consigne: 'Calcule de tête.', enonce: '(-10) - (-4)', attendu: -6,
      fausses: [{ valeur: -14, piege: 'cm-soustraire-negatif' }],
    },
    {
      id: 'e-2-6-10', type: 'calcul', palier: 3, piege: 'cm-signes-produit',
      consigne: 'Calcule de tête.', enonce: '-6 \\times 5', attendu: -30,
      fausses: [{ valeur: 30, piege: 'cm-signes-produit' }],
    },
  ],

  // Les relatifs de l'interrogation, dont le blanc, puis des voisins.
  test: [
    { id: 't-2-6-1', type: 'calcul', consigne: 'Calcule de tête.', enonce: '(+6) - (-18)', attendu: 24, fausses: [{ valeur: -12, piege: 'cm-soustraire-negatif' }, { valeur: 12, piege: 'cm-soustraire-negatif' }], revoir: 'propriete' },
    { id: 't-2-6-2', type: 'calcul', consigne: 'Calcule de tête.', enonce: '36 \\div (-6)', attendu: -6, fausses: [{ valeur: 6, piege: 'cm-signes-produit' }], revoir: 'propriete' },
    { id: 't-2-6-3', type: 'calcul', consigne: 'Calcule de tête.', enonce: '-4 \\times 7', attendu: -28, fausses: [{ valeur: 28, piege: 'cm-signes-produit' }], revoir: 'propriete' },
    { id: 't-2-6-4', type: 'calcul', consigne: 'Calcule de tête.', enonce: '-7 + 18', attendu: 11, fausses: [{ valeur: -25, piege: 'cm-somme-relatifs' }, { valeur: -11, piege: 'cm-somme-relatifs' }], revoir: 'propriete' },
    { id: 't-2-6-5', type: 'calcul', consigne: 'Calcule de tête.', enonce: '(-17) + (+8)', attendu: -9, fausses: [{ valeur: -25, piege: 'cm-somme-relatifs' }, { valeur: 9, piege: 'cm-somme-relatifs' }], revoir: 'propriete' },
    { id: 't-2-6-6', type: 'calcul', consigne: 'Calcule de tête.', enonce: '(-5) - (+9)', attendu: -14, fausses: [{ valeur: 4, piege: 'cm-soustraire-negatif' }], revoir: 'propriete' },
    { id: 't-2-6-7', type: 'calcul', consigne: 'Calcule de tête.', enonce: '(-3) \\times (-8)', attendu: 24, fausses: [{ valeur: -24, piege: 'cm-signes-produit' }], revoir: 'propriete' },
    { id: 't-2-6-8', type: 'calcul', consigne: 'Calcule de tête.', enonce: '(-12) - (-5)', attendu: -7, fausses: [{ valeur: -17, piege: 'cm-soustraire-negatif' }], revoir: 'propriete' },
    { id: 't-2-6-9', type: 'calcul', consigne: 'Calcule de tête.', enonce: '-45 \\div 9', attendu: -5, fausses: [{ valeur: 5, piege: 'cm-signes-produit' }], revoir: 'propriete' },
    { id: 't-2-6-10', type: 'calcul', consigne: 'Calcule de tête.', enonce: '(+2) - (+11)', attendu: -9, fausses: [{ valeur: 9, piege: 'cm-somme-relatifs' }], revoir: 'propriete' },
  ],
};
