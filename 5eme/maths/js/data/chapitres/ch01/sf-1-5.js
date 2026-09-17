// Chapitre 1, savoir-faire 5 — Nommer un calcul et le traduire.
//
// ── Pourquoi ce savoir-faire existe ──────────────────────────────────────
//
// La liste de la professeure le demande en toutes lettres : « Nommer un
// calcul, distinguer sommes et produits, termes et facteurs », et « Traduire
// un problème, une succession donnée d'opérations, un programme de calcul, en
// une seule expression, en faisant appel ou non à des parenthèses ».
//
// Et l'Interrogation 1 a montré que c'est là que les points se perdent :
// 2 sur 4 dans chacun des deux exercices de traduction. Les deux erreurs
// d'Antonin sont reprises telles quelles comme réponses fausses prévues :
//
//   « le produit de 4 par la différence entre 12 et 7 »  →  4 × 12 ÷ 7
//       « différence » lue comme une division, et plus de parenthèses ;
//   « 5 + 2 × 3 »  →  « le produit de 2 et 3 par la somme de 5 »
//       le calcul nommé d'après l'opération VUE en premier.
//
// ── La règle qui porte tout ──────────────────────────────────────────────
//
// Un calcul porte le nom de l'opération faite EN DERNIER. Dans l'autre sens, le
// premier mot d'une phrase (« le produit de… ») dit la dernière opération à
// écrire. Tout le reste en découle, y compris le besoin de parenthèses.
//
// ── Un QCM, pour une fois ────────────────────────────────────────────────
//
// Une traduction ne se tape pas comme un nombre : 4 × (12 − 7) et 20 ont la
// même valeur, et un champ numérique accepterait les deux. Les options d'un
// QCM, elles, sont des ÉCRITURES — et les fausses sont les erreurs réelles.

export default {
  id: 'sf-1-5',
  titre: 'Nommer un calcul et le traduire',
  attendus: [
    'Il nomme un calcul d\'après l\'opération faite en dernier : somme, différence, produit, quotient.',
    'Il distingue les termes d\'une somme et les facteurs d\'un produit.',
    'Il traduit une phrase en une seule expression, avec des parenthèses quand il en faut.',
    'Il lit une expression en français.',
  ],

  decouvrir: {
    titre: 'Quel est le nom de 5 + 2 × 3 ?',
    texte:
      'Deux élèves doivent nommer le calcul 5 + 2 × 3. Le premier dit : « c\'est un '
      + 'produit, il y a 2 × 3 ». Le second calcule d\'abord, étape par étape, et '
      + 'regarde quelle opération il fait en dernier.',
    lignes: [
      { calcul: 'Étape 1', resultat: '2 × 3' },
      { calcul: 'Étape 2', resultat: '5 + le résultat' },
    ],
    question: 'Calcule les deux étapes.',
    champs: [
      { id: 'a', etiquette: 'résultat de l\'étape 1', attendu: 6 },
      { id: 'b', etiquette: 'résultat final', attendu: 11 },
    ],
    conclusion:
      'La dernière opération est une **addition** : 5 + 2 × 3 est donc une '
      + '**somme** — « la somme de 5 et du produit de 2 par 3 ».\n'
      + 'Le produit 2 × 3 n\'est qu\'une étape. Un calcul porte le nom de '
      + 'l\'opération faite **en dernier**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le nom d\'un calcul',
      texte:
        'Un calcul porte le nom de l\'opération faite **en dernier** :\n'
        + '**somme** (+)   ·   **différence** (−)   ·   **produit** (×)   ·   '
        + '**quotient** (÷)\n'
        + 'Dans une somme, les nombres ajoutés sont les **termes** ; dans un '
        + 'produit, les nombres multipliés sont les **facteurs**.',
    },
    {
      type: 'propriete',
      titre: 'Traduire une phrase',
      texte:
        'Le **premier mot** de la phrase dit l\'opération à faire **en dernier**.\n'
        + '« Le **produit** de 4 par la différence entre 12 et 7 » : le calcul se '
        + 'termine par une multiplication par 4 ; ce qu\'on multiplie, c\'est la '
        + 'différence 12 − 7.\n'
        + 'On écrit donc **4 × (12 − 7)** = 4 × 5 = **20**.',
    },
    {
      type: 'remarque',
      titre: 'Quand faut-il des parenthèses ?',
      texte:
        'Quand l\'opération porte sur le **résultat** d\'un autre calcul, et que '
        + 'les priorités ne le feraient pas passer d\'abord.\n'
        + '« La somme de 3 et **du double de 5** » : 3 + 2 × 5. Pas besoin, la '
        + 'multiplication passe déjà avant.\n'
        + '« Le produit de 4 **par la différence** entre 12 et 7 » : 4 × (12 − 7). '
        + 'Indispensable, sinon la multiplication passerait avant la soustraction.',
    },
    {
      type: 'remarque',
      titre: 'Les mots qui cachent une opération',
      texte:
        'le **double** : × 2   ·   le **triple** : × 3   ·   la **moitié** : ÷ 2\n'
        + 'la **différence entre** 12 et 7 : 12 − 7, et jamais 12 ÷ 7 — la '
        + 'division donne un **quotient**.',
    },
    {
      type: 'exemple',
      texte:
        '3 + 2 × 5 : la somme de 3 et du double de 5   ·   '
        + '3 × (5 − 2) : le produit de 3 par la différence de 5 et 2',
    },
  ],

  methode: {
    titre: 'Traduire « le produit de 4 par la différence entre 12 et 7 »',
    enonce: 'Écrire en une seule expression, puis calculer : le produit de 4 par la différence entre 12 et 7.',
    etapes: [
      {
        texte: 'Le premier mot est « produit » : le calcul se termine par une multiplication.',
        note: 'On écrit d\'abord la structure : 4 × (…).',
      },
      {
        texte: 'Ce qu\'on multiplie, c\'est « la différence entre 12 et 7 » : 12 − 7.',
        note: 'Différence = soustraction. Jamais une division.',
      },
      {
        texte: 'La soustraction doit passer avant la multiplication : parenthèses. 4 × (12 − 7).',
        note: 'Sans elles, on calculerait 4 × 12 d\'abord.',
      },
      { texte: 'Je calcule : 4 × 5 = 20.', note: '' },
    ],
    controle:
      'Le contrôle : relis ton écriture en français en partant de la dernière '
      + 'opération. 4 × (12 − 7), c\'est « le produit de 4 par la différence de 12 '
      + 'et 7 » : on retrouve la phrase. Si tu lis autre chose, ton écriture est '
      + 'fausse.',
  },

  entrainement: [
    // ── Palier 1 : le vocabulaire, et le nom d'un calcul ───────────────────
    {
      id: 'e-1-5-1', type: 'choix', palier: 1, piege: 'mot-mal-traduit',
      consigne: 'Comment s\'appelle le résultat de cette opération ?',
      enonce: '8 - 3',
      choix: ['une somme', 'une différence', 'un produit', 'un quotient'],
      attendu: 'une différence',
      fausses: [{ valeur: 'un quotient', piege: 'mot-mal-traduit' }, { valeur: 'une somme', piege: 'mot-mal-traduit' }],
    },
    {
      id: 'e-1-5-2', type: 'choix', palier: 1, piege: 'operation-principale-meconnue',
      consigne: 'Ce calcul est-il une somme ou un produit ?',
      enonce: '7 + 4 \\times 2',
      choix: ['une somme', 'un produit'],
      attendu: 'une somme',
      fausses: [{ valeur: 'un produit', piege: 'operation-principale-meconnue' }],
    },
    {
      // Jumeau du précédent : mêmes nombres, les parenthèses changent le nom.
      id: 'e-1-5-3', type: 'choix', palier: 1, piege: 'operation-principale-meconnue',
      consigne: 'Ce calcul est-il une somme ou un produit ?',
      enonce: '(7 + 4) \\times 2',
      choix: ['une somme', 'un produit'],
      attendu: 'un produit',
      fausses: [{ valeur: 'une somme', piege: 'operation-principale-meconnue' }],
    },
    {
      id: 'e-1-5-4', type: 'choix', palier: 1, piege: 'mot-mal-traduit',
      consigne: 'Dans ce calcul, comment s\'appellent 6 et 9 ?',
      enonce: '6 \\times 9',
      choix: ['des termes', 'des facteurs', 'des produits'],
      attendu: 'des facteurs',
      fausses: [{ valeur: 'des termes', piege: 'mot-mal-traduit' }],
    },
    // ── Palier 2 : d'une phrase à une écriture, et retour ──────────────────
    {
      // NEUTRE pour les parenthèses : ici, la multiplication passe déjà avant,
      // aucune parenthèse n'est nécessaire. Jumeau de l'item suivant, qui en
      // exige — sans lui, « une phrase longue demande des parenthèses » deviendrait
      // la règle.
      id: 'e-1-5-5', type: 'choix', palier: 2, neutre: true, piege: 'parentheses-oubliees-a-l-ecrit',
      consigne: 'Quelle écriture traduit cette phrase ?',
      enonce: 'La somme de 4 et du triple de 6.',
      choix: ['4 + 3 × 6', '(4 + 3) × 6', '4 × 3 + 6'],
      attendu: '4 + 3 × 6',
      fausses: [
        { valeur: '(4 + 3) × 6', piege: 'operation-principale-meconnue' },
        { valeur: '4 × 3 + 6', piege: 'mot-mal-traduit' },
      ],
    },
    {
      // Même structure que la phrase ratée de l'interrogation, autres nombres.
      // La troisième option est l'erreur exacte d'Antonin.
      id: 'e-1-5-6', type: 'choix', palier: 2, piege: 'parentheses-oubliees-a-l-ecrit',
      consigne: 'Quelle écriture traduit cette phrase ?',
      enonce: 'Le produit de 6 par la différence entre 10 et 4.',
      choix: ['6 × (10 − 4)', '6 × 10 − 4', '6 × 10 ÷ 4'],
      attendu: '6 × (10 − 4)',
      fausses: [
        { valeur: '6 × 10 − 4', piege: 'parentheses-oubliees-a-l-ecrit' },
        { valeur: '6 × 10 ÷ 4', piege: 'mot-mal-traduit' },
      ],
    },
    {
      id: 'e-1-5-7', type: 'calcul', palier: 2, piege: 'parentheses-oubliees-a-l-ecrit',
      consigne: 'Écris le calcul sur ta feuille, puis donne son résultat.',
      enonce: 'Le produit de 6 par la différence entre 10 et 4.',
      attendu: 36,
      fausses: [
        { valeur: 56, piege: 'parentheses-oubliees-a-l-ecrit' },
        { valeur: 15, piege: 'mot-mal-traduit' },
      ],
    },
    {
      // La phrase de l'interrogation, dans l'autre sens : la troisième option
      // est la réponse d'Antonin.
      id: 'e-1-5-8', type: 'choix', palier: 2, piege: 'operation-principale-meconnue',
      consigne: 'Comment se lit ce calcul ?',
      enonce: '4 + 5 \\times 2',
      choix: [
        'la somme de 4 et du produit de 5 par 2',
        'le produit de la somme de 4 et 5 par 2',
        'le produit de 5 et 2 par la somme de 4',
      ],
      attendu: 'la somme de 4 et du produit de 5 par 2',
      fausses: [
        { valeur: 'le produit de la somme de 4 et 5 par 2', piege: 'operation-principale-meconnue' },
        { valeur: 'le produit de 5 et 2 par la somme de 4', piege: 'operation-principale-meconnue' },
      ],
    },
    // ── Palier 3 : des phrases plus longues ────────────────────────────────
    {
      id: 'e-1-5-9', type: 'choix', palier: 3, piege: 'operation-principale-meconnue',
      consigne: 'Comment se lit ce calcul ?',
      enonce: '(9 - 4) \\times 2',
      choix: [
        'le produit de la différence de 9 et 4 par 2',
        'la différence de 9 et du produit de 4 par 2',
        'le quotient de la différence de 9 et 4 par 2',
      ],
      attendu: 'le produit de la différence de 9 et 4 par 2',
      fausses: [
        { valeur: 'la différence de 9 et du produit de 4 par 2', piege: 'operation-principale-meconnue' },
        { valeur: 'le quotient de la différence de 9 et 4 par 2', piege: 'mot-mal-traduit' },
      ],
    },
    {
      id: 'e-1-5-10', type: 'choix', palier: 3, piege: 'parentheses-oubliees-a-l-ecrit',
      consigne: 'Quelle écriture traduit cette phrase ?',
      enonce: 'Le quotient de la somme de 15 et 5 par 4.',
      choix: ['(15 + 5) ÷ 4', '15 + 5 ÷ 4', '(15 + 5) × 4'],
      attendu: '(15 + 5) ÷ 4',
      fausses: [
        { valeur: '15 + 5 ÷ 4', piege: 'parentheses-oubliees-a-l-ecrit' },
        { valeur: '(15 + 5) × 4', piege: 'mot-mal-traduit' },
      ],
    },
    {
      id: 'e-1-5-11', type: 'calcul', palier: 3, piege: 'parentheses-oubliees-a-l-ecrit',
      consigne: 'Écris le calcul sur ta feuille, puis donne son résultat.',
      enonce: 'Le quotient de la somme de 15 et 5 par 4.',
      attendu: 5,
      fausses: [
        { valeur: 16.25, piege: 'parentheses-oubliees-a-l-ecrit' },
        { valeur: 80, piege: 'mot-mal-traduit' },
      ],
    },
    {
      // Le raisonnement de la copie, ligne à ligne.
      id: 'e-1-5-12', type: 'corriger', palier: 3, piege: 'mot-mal-traduit',
      consigne: 'Cette traduction est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: 'Le produit de 4 par la différence entre 12 et 7.',
      lignes: [
        { texte: '« Produit » vient en premier : le calcul se termine par une multiplication par 4.', fausse: false },
        { texte: 'La différence entre 12 et 7, c\'est 12 ÷ 7.', fausse: true },
        { texte: 'J\'écris donc 4 × 12 ÷ 7.', fausse: false },
        { texte: 'Je calcule : 48 ÷ 7.', fausse: false },
      ],
      explication:
        'La première ligne est juste : le calcul se termine bien par une '
        + 'multiplication. Tout déraille à la deuxième : une différence se calcule '
        + 'par une soustraction, 12 − 7 = 5. Il fallait écrire 4 × (12 − 7) = 20 — '
        + 'avec des parenthèses, pour que la soustraction passe d\'abord.',
    },
  ],

  problemes: [
    {
      id: 'p-1-5-1',
      enonce:
        'Programme de calcul : choisir le nombre 6, lui ajouter 4, puis multiplier '
        + 'le résultat par 3.',
      questions: [
        { texte: 'Quel nombre obtient-on après avoir ajouté 4 ?', attendu: 10, unite: '' },
        { texte: 'Quel est le résultat du programme ?', attendu: 30, unite: '' },
      ],
    },
    {
      id: 'p-1-5-2',
      enonce:
        'Programme de calcul : choisir le nombre 8, le multiplier par 5, retirer 12, '
        + 'puis diviser le résultat par 4.',
      questions: [
        { texte: 'Quel nombre obtient-on après avoir retiré 12 ?', attendu: 28, unite: '' },
        { texte: 'Quel est le résultat du programme ?', attendu: 7, unite: '' },
      ],
    },
    {
      id: 'p-1-5-3',
      enonce:
        'Un cinéma vend 4 places à 9 € et 3 places à 7 €. On veut le prix total, '
        + 'écrit en une seule expression.',
      questions: [
        { texte: 'Combien coûtent les 4 places à 9 € ?', attendu: 36, unite: '€' },
        { texte: 'Quel est le prix total ?', attendu: 57, unite: '€' },
      ],
    },
    {
      id: 'p-1-5-4',
      enonce:
        'Une classe compte 28 élèves ; 4 sont absents. Les présents forment des '
        + 'groupes de 6.',
      questions: [
        { texte: 'Combien d\'élèves sont présents ?', attendu: 24, unite: 'élèves' },
        { texte: 'Combien de groupes forment-ils ? C\'est le quotient de la différence entre 28 et 4 par 6.', attendu: 4, unite: 'groupes' },
      ],
    },
    {
      id: 'p-1-5-5',
      enonce:
        'Antonin a 7 billes rouges et 8 billes bleues. Son frère en a le double de '
        + 'la somme des siennes.',
      questions: [
        { texte: 'Combien de billes Antonin a-t-il en tout ?', attendu: 15, unite: 'billes' },
        { texte: 'Combien de billes son frère a-t-il ?', attendu: 30, unite: 'billes' },
      ],
    },
  ],

  test: [
    {
      id: 't-1-5-1', type: 'choix', consigne: 'Comment s\'appelle ce calcul ?', enonce: '9 - 2 \\times 3',
      choix: ['une somme', 'une différence', 'un produit', 'un quotient'], attendu: 'une différence', revoir: 'definition',
    },
    {
      id: 't-1-5-2', type: 'choix', consigne: 'Comment s\'appelle ce calcul ?', enonce: '(9 - 2) \\times 3',
      choix: ['une somme', 'une différence', 'un produit', 'un quotient'], attendu: 'un produit', revoir: 'definition',
    },
    {
      id: 't-1-5-3', type: 'choix', consigne: 'Complète.', enonce: 'Le résultat d\'une division s\'appelle…',
      choix: ['une différence', 'un produit', 'un quotient'], attendu: 'un quotient', revoir: 'definition',
    },
    {
      id: 't-1-5-4', type: 'choix', consigne: 'Quelle écriture traduit cette phrase ?', enonce: 'La différence entre 20 et le triple de 4.',
      choix: ['20 − 3 × 4', '(20 − 3) × 4', '20 ÷ 3 × 4'], attendu: '20 − 3 × 4', revoir: 'remarque',
    },
    { id: 't-1-5-5', type: 'calcul', consigne: 'Calcule.', enonce: 'La différence entre 20 et le triple de 4.', attendu: 8, revoir: 'remarque' },
    {
      id: 't-1-5-6', type: 'choix', consigne: 'Comment se lit ce calcul ?', enonce: '2 \\times (7 + 1)',
      choix: ['le produit de 2 par la somme de 7 et 1', 'la somme du produit de 2 par 7 et de 1', 'la somme de 2 et du produit de 7 par 1'],
      attendu: 'le produit de 2 par la somme de 7 et 1', revoir: 'exemple',
    },
    { id: 't-1-5-7', type: 'calcul', consigne: 'Calcule.', enonce: 'Le produit de 5 par la somme de 3 et 4.', attendu: 35, revoir: 'propriete' },
    {
      id: 't-1-5-8', type: 'choix', consigne: 'Dans ce calcul, comment s\'appellent 12 et 30 ?', enonce: '12 + 30',
      choix: ['des termes', 'des facteurs', 'des sommes'], attendu: 'des termes', revoir: 'definition',
    },
    {
      id: 't-1-5-9', type: 'choix', consigne: 'Quelle écriture traduit cette phrase ?', enonce: 'Le quotient de 36 par la somme de 5 et 4.',
      choix: ['36 ÷ (5 + 4)', '36 ÷ 5 + 4', '(36 ÷ 5) × 4'], attendu: '36 ÷ (5 + 4)', revoir: 'remarque',
    },
    { id: 't-1-5-10', type: 'calcul', consigne: 'Calcule.', enonce: 'Le quotient de 36 par la somme de 5 et 4.', attendu: 4, revoir: 'propriete' },
  ],
};
