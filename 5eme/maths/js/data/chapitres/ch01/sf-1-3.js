// Chapitre 1, savoir-faire 3 — Utiliser les parenthèses.
//
// ── La phrase du cahier ──────────────────────────────────────────────────
//
// « Les parenthèses permettent de changer l'ordre naturel des opérations. »
// Suivie du couple d'exemples qui dit tout : 2 + 3 × 5 = 17, et (2 + 3) × 5 = 25.
//
// ── Ce que ce savoir-faire travaille vraiment ────────────────────────────
//
// Pas « calculer la parenthèse d'abord » — ça, tout élève le sait. Mais le fait
// que la parenthèse a un EFFET : elle est là parce que le résultat serait
// différent sans elle. Un élève qui recopie un calcul en perdant les
// parenthèses ne fait pas une faute d'inattention, il n'a pas vu qu'elles
// portaient du sens.
//
// D'où le couple d'items jumeaux qui traverse tout le savoir-faire : le même
// calcul avec et sans parenthèses, à la suite. Deux résultats différents pour
// les mêmes nombres, c'est la seule démonstration qui tienne.
//
// ── Les parenthèses inutiles ─────────────────────────────────────────────
//
// Deux items neutres portent sur des parenthèses qui ne changent RIEN :
// 2 + (3 × 5) vaut 17, comme 2 + 3 × 5. C'est important. Sans eux, l'élève
// retiendrait « s'il y a des parenthèses, le résultat n'est pas celui qu'on
// croit », et se mettrait à changer ses réponses justes.

export default {
  id: 'sf-1-3',
  titre: 'Utiliser les parenthèses',
  attendus: [
    'Il calcule une parenthèse avant tout le reste.',
    'Il sait qu\'une parenthèse peut changer le résultat, et reconnaît les cas où elle ne change rien.',
  ],

  decouvrir: {
    titre: 'Les mêmes nombres, deux résultats',
    texte:
      'On reprend le calcul du savoir-faire précédent, 2 + 3 × 5, et on lui '
      + 'ajoute des parenthèses autour des deux premiers nombres : (2 + 3) × 5. '
      + 'Les nombres sont les mêmes, les opérations aussi.',
    lignes: [
      { calcul: 'Sans parenthèses', resultat: '2 + 3 × 5' },
      { calcul: 'Avec parenthèses', resultat: '(2 + 3) × 5' },
    ],
    question: 'Calcule les deux.',
    champs: [
      { id: 'a', etiquette: 'sans parenthèses', attendu: 17 },
      { id: 'b', etiquette: 'avec parenthèses', attendu: 25 },
    ],
    conclusion:
      'Mêmes nombres, mêmes opérations, et pourtant **17** d\'un côté et **25** '
      + 'de l\'autre. Les parenthèses ne sont donc pas une décoration : elles '
      + 'forcent l\'addition à passer avant la multiplication, ce qui n\'arrive '
      + 'jamais sans elles.\n'
      + 'C\'est à ça qu\'elles servent : **changer l\'ordre naturel**.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'La parenthèse passe avant tout',
      texte:
        'On calcule ce qui est **entre parenthèses** en premier, avant les '
        + 'multiplications et les divisions.\n'
        + 'L\'ordre complet devient : **parenthèses**, puis × et ÷, puis + et −.',
    },
    {
      type: 'propriete',
      titre: 'Des parenthèses dans des parenthèses',
      texte:
        'Quand une parenthèse en contient une autre, on commence par la plus '
        + '**intérieure**, puis on remonte.\n'
        + '**2 × (3 + (8 − 6))** : d\'abord 8 − 6 = 2, ce qui donne 2 × (3 + 2), '
        + 'puis 3 + 2 = 5, et enfin 2 × 5 = **10**.',
    },
    {
      type: 'remarque',
      titre: 'Certaines parenthèses ne changent rien',
      texte:
        'Dans **2 + (3 × 5)**, la multiplication serait déjà passée en premier '
        + 'sans les parenthèses : le résultat est 17 dans les deux cas.\n'
        + 'Ces parenthèses sont **inutiles**, mais pas fausses — on les écrit '
        + 'parfois pour rendre le calcul plus clair. Voir des parenthèses ne '
        + 'veut donc pas dire que le résultat va changer.',
    },
    {
      type: 'remarque',
      titre: 'Recopier sans perdre les parenthèses',
      texte:
        'L\'erreur la plus fréquente n\'est pas de mal calculer la parenthèse, '
        + 'c\'est de la laisser tomber en recopiant la ligne suivante. Tant '
        + 'qu\'une parenthèse n\'est pas remplacée par son résultat, elle doit '
        + 'rester écrite.',
    },
    {
      type: 'exemple',
      texte:
        '(2 + 3) × 5 = 25   ·   2 + (3 × 5) = 17   ·   (10 − 4) ÷ 3 = 2   ·   '
        + '2 × (3 + (8 − 6)) = 10',
    },
  ],

  methode: {
    titre: 'Calculer 4 × (7 − 2) + 3',
    enonce: 'Calculer 4 × (7 − 2) + 3.',
    etapes: [
      {
        texte: 'Je repère la parenthèse : (7 − 2). C\'est elle qui part en premier.',
        note: 'Même avant la multiplication, qui est pourtant prioritaire.',
      },
      { texte: 'Je calcule 7 − 2 = 5.', note: '' },
      {
        texte: 'Je recopie la ligne en remplaçant la parenthèse par 5 : 4 × 5 + 3.',
        note: 'La parenthèse a disparu parce qu\'elle est remplacée, pas parce qu\'on l\'oublie.',
      },
      { texte: 'Maintenant la multiplication : 4 × 5 = 20. Il reste 20 + 3.', note: '' },
      { texte: 'Enfin l\'addition : 20 + 3 = 23.', note: '' },
    ],
    controle:
      'Le contrôle : refais le calcul en supprimant les parenthèses '
      + '(4 × 7 − 2 + 3 = 29). Si tu trouves la même chose qu\'avec, relis — '
      + 'soit les parenthèses étaient inutiles, soit tu les as oubliées.',
  },

  entrainement: [
    // ── Palier 1 : une parenthèse, et son jumeau sans parenthèse ───────────
    {
      id: 'e-1-3-1', type: 'calcul', palier: 1, piege: 'parentheses-negligees',
      consigne: 'Calcule.', enonce: '(2 + 3) \\times 5', attendu: 25,
      fausses: [{ valeur: 17, piege: 'parentheses-negligees' }],
    },
    {
      // NEUTRE, et jumeau du précédent : mêmes nombres, parenthèses inutiles.
      // Le résultat vaut 17 avec OU sans elles.
      id: 'e-1-3-2', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '2 + (3 \\times 5)', attendu: 17,
    },
    {
      id: 'e-1-3-3', type: 'calcul', palier: 1, piege: 'parentheses-negligees',
      consigne: 'Calcule.', enonce: '(10 - 4) \\div 3', attendu: 2,
      fausses: [
        // 10 − (4 ÷ 3) : la parenthèse a été déplacée sur la division.
        { valeur: 8.67, piege: 'parentheses-negligees' },
      ],
    },
    {
      id: 'e-1-3-4', type: 'calcul', palier: 1, piege: 'parentheses-negligees',
      consigne: 'Calcule.', enonce: '3 \\times (4 + 6)', attendu: 30,
      fausses: [{ valeur: 18, piege: 'parentheses-negligees' }],
    },
    // ── Palier 2 : la parenthèse au milieu d'un calcul plus long ───────────
    {
      id: 'e-1-3-5', type: 'calcul', palier: 2, piege: 'parentheses-negligees',
      consigne: 'Calcule.', enonce: '4 \\times (7 - 2) + 3', attendu: 23,
      fausses: [{ valeur: 29, piege: 'parentheses-negligees' }],
    },
    {
      id: 'e-1-3-6', type: 'calcul', palier: 2, piege: 'parentheses-negligees',
      consigne: 'Calcule.', enonce: '20 - (5 + 8)', attendu: 7,
      fausses: [
        // 20 − 5 + 8 : les parenthèses ont été perdues en recopiant.
        { valeur: 23, piege: 'parentheses-negligees' },
      ],
    },
    {
      // NEUTRE. Aucune parenthèse : rien à prioriser au-delà des règles déjà
      // connues. Sans cet item, l'élève en chercherait là où il n'y en a pas.
      id: 'e-1-3-7', type: 'calcul', palier: 2, neutre: true, piege: 'priorite-ignoree',
      consigne: 'Calcule.', enonce: '6 + 4 \\times 2', attendu: 14,
      fausses: [{ valeur: 20, piege: 'priorite-ignoree' }],
    },
    {
      id: 'e-1-3-8', type: 'trous', palier: 2, piege: 'parentheses-negligees',
      consigne: 'Calcule 5 × (12 − 8) en deux étapes.',
      enonce: '5 \\times (12 - 8)',
      champs: [
        { id: 'a', etiquette: 'la parenthèse : 12 − 8', attendu: 4 },
        { id: 'b', etiquette: 'résultat final', attendu: 20 },
      ],
    },
    // ── Palier 3 : parenthèses imbriquées, et diagnostic ───────────────────
    {
      id: 'e-1-3-9', type: 'calcul', palier: 3, piege: 'parentheses-negligees',
      consigne: 'Calcule.', enonce: '2 \\times (3 + (8 - 6))', attendu: 10,
      fausses: [
        // 2 × (3 + 8) − 6 : la parenthèse intérieure a été mal refermée.
        { valeur: 16, piege: 'parentheses-negligees' },
      ],
    },
    {
      id: 'e-1-3-10', type: 'corriger', palier: 3, piege: 'parentheses-negligees',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Calculer } 30 - (4 + 6) \\times 2',
      lignes: [
        { texte: 'Je commence par la parenthèse : 4 + 6 = 10.', fausse: false },
        { texte: 'Je recopie : 30 − 10 × 2.', fausse: false },
        { texte: 'Je lis de gauche à droite : 30 − 10 = 20, puis 20 × 2 = 40.', fausse: true },
        { texte: 'Donc 30 − (4 + 6) × 2 = 40.', fausse: false },
      ],
      explication:
        'Les deux premières lignes sont justes : la parenthèse est bien calculée '
        + 'et bien remplacée. C\'est ensuite que ça dérape — une fois la '
        + 'parenthèse partie, la multiplication redevient prioritaire. Il '
        + 'fallait 10 × 2 = 20, puis 30 − 20 = 10.',
    },
  ],

  problemes: [
    {
      id: 'p-1-3-1',
      enonce:
        'Antonin achète 4 paquets contenant chacun un stylo à 2 € et une gomme '
        + 'à 1 €.',
      questions: [
        { texte: 'Combien coûte un paquet ?', attendu: 3, unite: '€' },
        { texte: 'Combien coûtent les 4 paquets ?', attendu: 12, unite: '€' },
      ],
    },
    {
      id: 'p-1-3-2',
      enonce:
        'Un rectangle mesure 7 cm de long et 3 cm de large.',
      questions: [
        { texte: 'Combien vaut la somme de la longueur et de la largeur ?', attendu: 10, unite: 'cm' },
        { texte: 'Quel est son périmètre, sachant qu\'il vaut 2 × (L + l) ?', attendu: 20, unite: 'cm' },
      ],
    },
    {
      id: 'p-1-3-3',
      enonce:
        'Une classe de 28 élèves part en sortie. 4 élèves sont absents. Les '
        + 'autres se répartissent également dans 4 minibus.',
      questions: [
        { texte: 'Combien d\'élèves partent ?', attendu: 24, unite: 'élèves' },
        { texte: 'Combien d\'élèves par minibus ?', attendu: 6, unite: 'élèves' },
      ],
    },
    {
      id: 'p-1-3-4',
      enonce:
        'Un jardinier plante 5 rangées de 6 salades, puis 3 rangées de '
        + '6 salades.',
      questions: [
        { texte: 'Combien de rangées en tout ?', attendu: 8, unite: 'rangées' },
        { texte: 'Combien de salades en tout ?', attendu: 48, unite: 'salades' },
      ],
    },
    {
      id: 'p-1-3-5',
      enonce:
        'Au marché, Antonin achète 3 kg de pommes à 2 € le kilo et 2 kg de '
        + 'poires à 3 € le kilo. Il paie avec un billet de 20 €.',
      questions: [
        { texte: 'Combien coûtent les pommes ?', attendu: 6, unite: '€' },
        { texte: 'Combien coûtent les poires ?', attendu: 6, unite: '€' },
        { texte: 'Combien lui rend-on ?', attendu: 8, unite: '€' },
      ],
    },
  ],

  test: [
    { id: 't-1-3-1', type: 'calcul', consigne: 'Calcule.', enonce: '(4 + 5) \\times 2', attendu: 18, revoir: 'propriete' },
    { id: 't-1-3-2', type: 'calcul', consigne: 'Calcule.', enonce: '4 + (5 \\times 2)', attendu: 14, revoir: 'remarque' },
    { id: 't-1-3-3', type: 'calcul', consigne: 'Calcule.', enonce: '30 - (7 + 5)', attendu: 18, revoir: 'propriete' },
    { id: 't-1-3-4', type: 'calcul', consigne: 'Calcule.', enonce: '3 \\times (9 - 4) + 1', attendu: 16, revoir: 'exemple' },
    { id: 't-1-3-5', type: 'calcul', consigne: 'Calcule.', enonce: '(18 - 6) \\div 4', attendu: 3, revoir: 'propriete' },
    {
      id: 't-1-3-6', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Une parenthèse se calcule avant les multiplications.',
      attendu: true, revoir: 'propriete',
    },
    { id: 't-1-3-7', type: 'calcul', consigne: 'Calcule.', enonce: '2 \\times (5 + (10 - 7))', attendu: 16, revoir: 'propriete' },
    {
      id: 't-1-3-8', type: 'trous', consigne: 'Calcule 6 × (11 − 7) en deux étapes.',
      enonce: '6 \\times (11 - 7)',
      champs: [
        { id: 'a', etiquette: 'la parenthèse : 11 − 7', attendu: 4 },
        { id: 'b', etiquette: 'résultat final', attendu: 24 },
      ],
      revoir: 'propriete',
    },
    { id: 't-1-3-9', type: 'calcul', consigne: 'Calcule.', enonce: '50 - (2 + 3) \\times 4', attendu: 30, revoir: 'exemple' },
    {
      id: 't-1-3-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Des parenthèses changent toujours le résultat d\'un calcul.',
      attendu: false, revoir: 'remarque',
    },
  ],
};
