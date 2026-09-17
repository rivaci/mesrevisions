// Chapitre 7, savoir-faire 1 — Multiplier deux nombres relatifs.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point 7 [EIB] de la liste de la professeure : « relatifs :
// multiplication et division ».
//
// ── Deux règles des signes qui se ressemblent ────────────────────────────
//
// L'élève sort du chapitre 5 avec une règle d'addition : « deux négatifs, le
// résultat est négatif ». Elle est juste — pour l'addition. Appliquée au
// produit, elle donne (−6) × (−2) = −12. C'est l'erreur à attendre ici, et
// c'est pourquoi un item met côte à côte une somme et un produit : il ne
// s'agit pas de réciter une règle, mais de choisir la bonne.

export default {
  id: 'sf-7-1',
  titre: 'Multiplier deux nombres relatifs',
  attendus: [
    'Il connaît la règle des signes du produit de deux nombres.',
    'Il calcule le produit de deux nombres relatifs, entiers ou décimaux.',
    'Il ne confond pas la règle des signes du produit avec celle de l\'addition.',
  ],

  decouvrir: {
    titre: 'Une suite qui continue',
    texte: 'On multiplie −3 par des nombres de plus en plus petits. Observe comment le résultat évolue.',
    lignes: [
      { calcul: '(-3) \\times 2', resultat: '−6' },
      { calcul: '(-3) \\times 1', resultat: '−3' },
      { calcul: '(-3) \\times 0', resultat: '0' },
      { calcul: '(-3) \\times (-1)', resultat: '?' },
    ],
    question: 'À chaque ligne, le résultat augmente de 3. Que vaut (−3) × (−1) ? Et (−3) × (−2) ?',
    champs: [
      { id: 'a', etiquette: '(−3) × (−1)', attendu: 3 },
      { id: 'b', etiquette: '(−3) × (−2)', attendu: 6 },
    ],
    conclusion:
      'La suite continue : **(−3) × (−1) = 3** et **(−3) × (−2) = 6**.\n'
      + 'Le produit de deux nombres **négatifs** est **positif**. C\'est la règle des signes : '
      + 'deux signes identiques donnent un produit positif, deux signes contraires un produit '
      + 'négatif.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'La règle des signes',
      texte:
        'Le produit de deux nombres de **même signe** est **positif**.\n'
        + 'Le produit de deux nombres de **signes contraires** est **négatif**.',
    },
    {
      type: 'propriete',
      titre: 'Calculer un produit',
      texte:
        'On détermine le **signe** avec la règle, puis on multiplie les **distances à zéro**.\n'
        + '(−4) × (−2,5) : même signe, donc positif ; 4 × 2,5 = 10 ; le produit vaut 10.',
    },
    {
      type: 'remarque',
      titre: 'Ne pas confondre avec l\'addition',
      texte:
        '(−6) + (−2) = −8, mais (−6) × (−2) = 12.\n'
        + 'En addition, deux négatifs donnent un négatif ; en multiplication, un positif.',
    },
    {
      type: 'remarque',
      titre: 'Multiplier par −1',
      texte: 'Multiplier un nombre par −1 donne son **opposé** : (−1) × 7 = −7 et (−1) × (−7) = 7.',
    },
    {
      type: 'exemple',
      texte: '(+3) × (+5) = 15   ·   (−3) × (−5) = 15   ·   (−3) × (+5) = −15   ·   (+3) × (−5) = −15',
    },
  ],

  methode: {
    titre: 'Calculer (−7) × 0,4',
    enonce: 'Calculer (−7) × 0,4.',
    etapes: [
      {
        texte: 'Le signe : les deux facteurs ont des signes contraires, le produit est négatif.',
        note: 'Je décide du signe en premier, et je l\'écris tout de suite.',
      },
      { texte: 'La valeur : je multiplie les distances à zéro, 7 × 0,4 = 2,8.', note: '' },
      { texte: 'Donc (−7) × 0,4 = −2,8.', note: '' },
    ],
    controle:
      'Le contrôle : 7 × 0,4 est un peu moins que 7 × 0,5 = 3,5, et un seul facteur est négatif. '
      + '−2,8 est cohérent.',
  },

  entrainement: [
    // ── Palier 1 : des entiers ─────────────────────────────────────────────
    {
      // NEUTRE : deux positifs, la multiplication de toujours.
      id: 'e-7-1-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '(+4) \\times (+6)', attendu: 24,
    },
    {
      id: 'e-7-1-2', type: 'signe', palier: 1, piege: 'regle-des-signes-produit',
      consigne: 'Quel est le signe de ce produit ?', enonce: '(-8) \\times (-3)', attendu: 'positif',
      fausses: [{ valeur: 'négatif', piege: 'regle-des-signes-produit' }],
    },
    {
      id: 'e-7-1-3', type: 'calcul', palier: 1, piege: 'regle-des-signes-produit',
      consigne: 'Calcule.', enonce: '(-7) \\times (-4)', attendu: 28,
      fausses: [
        { valeur: -28, piege: 'regle-des-signes-produit' },
        // (−7) + (−4) : la multiplication lue comme une addition.
        { valeur: -11, piege: 'regle-des-signes-produit' },
      ],
    },
    {
      id: 'e-7-1-4', type: 'calcul', palier: 1, piege: 'regle-des-signes-produit',
      consigne: 'Calcule.', enonce: '(-5) \\times 9', attendu: -45,
      fausses: [{ valeur: 45, piege: 'regle-des-signes-produit' }],
    },
    // ── Palier 2 : des décimaux ────────────────────────────────────────────
    {
      id: 'e-7-1-5', type: 'calcul', palier: 2, piege: 'regle-des-signes-produit',
      consigne: 'Calcule.', enonce: '6 \\times (-1{,}5)', attendu: -9,
      fausses: [{ valeur: 9, piege: 'regle-des-signes-produit' }],
    },
    {
      id: 'e-7-1-6', type: 'calcul', palier: 2, piege: 'regle-des-signes-produit',
      consigne: 'Calcule.', enonce: '(-0{,}2) \\times (-30)', attendu: 6,
      fausses: [{ valeur: -6, piege: 'regle-des-signes-produit' }],
    },
    {
      id: 'e-7-1-7', type: 'signe', palier: 2, piege: 'regle-des-signes-produit',
      consigne: 'Quel est le signe de ce produit ?', enonce: '(-2{,}5) \\times 4', attendu: 'négatif',
      fausses: [{ valeur: 'positif', piege: 'regle-des-signes-produit' }],
    },
    {
      // NEUTRE : un facteur nul, le signe ne se pose pas.
      id: 'e-7-1-8', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule.', enonce: '0 \\times (-12)', attendu: 0,
    },
    // ── Palier 3 : le facteur manquant, et la bonne règle ──────────────────
    {
      id: 'e-7-1-9', type: 'trous', palier: 3, piege: 'regle-des-signes-produit',
      consigne: 'Complète avec le nombre qui manque.', enonce: '(-6) \\times \\ldots = 42',
      champs: [{ id: 'a', etiquette: 'le facteur manquant', attendu: -7 }],
      fausses: [{ valeur: 7, piege: 'regle-des-signes-produit' }],
    },
    {
      id: 'e-7-1-10', type: 'choix', palier: 3, piege: 'regle-des-signes-produit',
      consigne: 'Lequel de ces calculs donne un résultat positif ?', enonce: 'Trois calculs avec −5 et −3.',
      choix: ['(−5) + (−3)', '(−5) − 3', '(−5) × (−3)'], attendu: '(−5) × (−3)',
      fausses: [
        { valeur: '(−5) + (−3)', piege: 'regle-des-signes-produit' },
        { valeur: '(−5) − 3', piege: 'regle-des-signes-produit' },
      ],
    },
    {
      id: 'e-7-1-11', type: 'vraifaux', palier: 3, piege: 'regle-des-signes-produit',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le produit de deux nombres est toujours plus grand que chacun des deux.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve deux nombres dont le produit est plus petit que chacun des deux.',
        champs: [{ id: 'a', etiquette: 'premier nombre' }, { id: 'b', etiquette: 'second nombre' }],
        valide: (a, b) => a * b < a && a * b < b,
        exemple: '3 et (−2) : leur produit, −6, est plus petit que les deux.',
      },
    },
    {
      id: 'e-7-1-12', type: 'calcul', palier: 3, piege: 'signe-oublie',
      consigne: 'Écris la variation avec un nombre relatif, en degrés.',
      enonce: 'Chaque jour, la température baisse de 2 °C. De combien a-t-elle varié en 5 jours ?',
      attendu: -10,
      fausses: [{ valeur: 10, piege: 'signe-oublie' }],
    },
  ],

  problemes: [
    {
      id: 'p-7-1-1',
      enonce:
        'Un plongeur part de la surface et descend de 3 m par minute. On écrit une descente avec un '
        + 'nombre négatif.',
      questions: [
        { texte: 'Quelle est son altitude après 4 minutes ?', attendu: -12, unite: 'm' },
        { texte: 'Et après 7,5 minutes ?', attendu: -22.5, unite: 'm' },
      ],
    },
    {
      id: 'p-7-1-2',
      enonce: 'Un congélateur est à 0 °C. Sa température baisse de 4 °C par heure.',
      questions: [
        { texte: 'Quelle température atteint-il au bout de 5 heures ?', attendu: -20, unite: '°C' },
        { texte: 'De combien sa température a-t-elle varié au bout de 3 heures ?', attendu: -12, unite: '°C' },
      ],
    },
    {
      id: 'p-7-1-3',
      enonce:
        'Dans un jeu, chaque carte rouge fait perdre 5 points et chaque carte noire en fait gagner 3. '
        + 'On tire 4 cartes rouges et 6 cartes noires.',
      questions: [
        { texte: 'Combien de points rapportent les cartes rouges, écrit avec un nombre relatif ?', attendu: -20 },
        { texte: 'Quel est le score total ?', attendu: -2 },
      ],
    },
    {
      id: 'p-7-1-4',
      enonce: 'Un abonnement de 12 € est prélevé chaque mois sur un compte. On écrit un prélèvement avec un nombre négatif.',
      questions: [
        { texte: 'Quelle est la variation du compte en 6 mois ?', attendu: -72, unite: '€' },
        { texte: 'Le compte contenait 50 €. Quel est son solde après 6 mois ?', attendu: -22, unite: '€' },
      ],
    },
    {
      id: 'p-7-1-5',
      enonce:
        'Dans un quiz, une bonne réponse rapporte 2 points et une mauvaise en retire 1. Sur '
        + '15 questions, on a 9 bonnes réponses et 6 mauvaises.',
      questions: [
        { texte: 'Combien de points rapportent les mauvaises réponses, écrit avec un nombre relatif ?', attendu: -6 },
        { texte: 'Quel est le score final ?', attendu: 12 },
      ],
    },
  ],

  test: [
    { id: 't-7-1-1', type: 'calcul', consigne: 'Calcule.', enonce: '(-9) \\times (-6)', attendu: 54, revoir: 'propriete' },
    { id: 't-7-1-2', type: 'calcul', consigne: 'Calcule.', enonce: '(-9) \\times 6', attendu: -54, revoir: 'propriete' },
    { id: 't-7-1-3', type: 'calcul', consigne: 'Calcule.', enonce: '9 \\times (-6)', attendu: -54, revoir: 'propriete' },
    { id: 't-7-1-4', type: 'calcul', consigne: 'Calcule.', enonce: '(-0{,}5) \\times (-14)', attendu: 7, revoir: 'propriete' },
    { id: 't-7-1-5', type: 'calcul', consigne: 'Calcule.', enonce: '(-1) \\times 23', attendu: -23, revoir: 'remarque' },
    {
      id: 't-7-1-6', type: 'signe', consigne: 'Quel est le signe de ce produit ?', enonce: '(-3{,}7) \\times (-2{,}1)',
      attendu: 'positif', revoir: 'propriete',
    },
    {
      id: 't-7-1-7', type: 'signe', consigne: 'Quel est le signe de ce produit ?', enonce: '4{,}8 \\times (-0{,}9)',
      attendu: 'négatif', revoir: 'propriete',
    },
    {
      id: 't-7-1-8', type: 'trous', consigne: 'Complète avec le nombre qui manque.', enonce: '\\ldots \\times (-5) = -35',
      champs: [{ id: 'a', etiquette: 'le facteur manquant', attendu: 7 }], revoir: 'propriete',
    },
    {
      id: 't-7-1-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Le produit de deux nombres négatifs est négatif.', attendu: false, revoir: 'remarque',
    },
    {
      id: 't-7-1-10', type: 'calcul', consigne: 'Écris la variation avec un nombre relatif, en mètres.',
      enonce: 'Un sous-marin descend de 15 m par minute. De combien son altitude a-t-elle varié en 4 minutes ?',
      attendu: -60, revoir: 'propriete',
    },
  ],
};
