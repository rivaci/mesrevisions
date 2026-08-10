// Savoir-faire 7-6 — Démontrer que deux programmes de calcul sont équivalents.
//
// C'est le savoir-faire qui donne enfin une RAISON d'utiliser une lettre. Tout
// le reste du chapitre apprend à manipuler des expressions ; celui-ci montre à
// quoi ça sert : prouver d'un coup une chose vraie pour une infinité de
// nombres. Sans lui, le calcul littéral reste un jeu d'écriture sans enjeu.
//
// Trois gestes, dans cet ordre, et ils sont indissociables :
//
//   1. EXÉCUTER un programme sur un nombre. C'est de l'arithmétique, mais c'est
//      là que la parenthèse se joue : « multiplie le résultat par 4 » porte sur
//      TOUT ce qui précède, pas sur le dernier nombre écrit.
//   2. TRADUIRE le programme en appelant x le nombre choisi. Le geste 1 sert de
//      modèle au geste 2 : on écrit avec x ce qu'on vient de faire avec 3.
//   3. COMPARER les deux expressions réduites. Égales → programmes équivalents.
//
// ── L'asymétrie qui structure tout le savoir-faire ────────────────────────
//
// Des essais concordants ne démontrent RIEN ; un seul essai discordant démontre
// la non-équivalence. Cette asymétrie est le vrai contenu mathématique ici, et
// elle est contre-intuitive à 13 ans : l'élève qui a vérifié sur trois nombres
// se croit sincèrement en règle. L'activité de découverte est construite autour
// d'elle — on fait faire les essais, on constate l'accord, PUIS on dit que ça
// ne suffit pas.
//
// ── Pourquoi le piège du signe égal se traite ici ─────────────────────────
//
// Parce que c'est le seul endroit du programme où l'élève écrit une vraie
// DÉMONSTRATION, donc une chaîne d'égalités. « x + 6 = 3(x + 6) = 3x + 18 »
// arrive à la conclusion juste par un chemin faux, et rien dans le résultat ne
// permet de s'en apercevoir : il faut relire chaque égalité isolément. D'où le
// type `corriger`, qui demande exactement ça — désigner la ligne, pas le
// résultat.

export default {
  id: 'sf-7-6',
  titre: 'Démontrer que deux programmes de calcul sont équivalents',
  attendus: [
    'Il démontre l\'égalité de deux expressions littérales.',
    'Il compare deux programmes de calcul.',
  ],

  // On ne demande pas de deviner : on fait exécuter. Les deux programmes tombent
  // d'accord sur 5, puis sur 10 — et c'est justement cet accord répété qui rend
  // la conclusion utile. Si l'activité montrait un désaccord, l'élève en
  // conclurait qu'il suffit d'essayer pour savoir ; ici il constate que les
  // essais ne tranchent pas, et la lettre arrive comme la seule sortie.
  decouvrir: {
    titre: 'Deux programmes qui tombent toujours d\'accord',
    texte:
      'Voici deux programmes de calcul.\n'
      + 'Programme A : choisis un nombre, ajoute 3, puis multiplie le résultat par 2.\n'
      + 'Programme B : choisis un nombre, multiplie-le par 2, puis ajoute 6.\n'
      + 'On les a fait tourner tous les deux en partant de 5.',
    lignes: [
      { calcul: 'Programme A avec 5 : (5 + 3) × 2', resultat: '16' },
      { calcul: 'Programme B avec 5 : 5 × 2 + 6', resultat: '16' },
    ],
    question: 'À ton tour : fais tourner les deux programmes en partant de 10.',
    champs: [
      { id: 'a', etiquette: 'Programme A avec 10 :', attendu: 26 },
      { id: 'b', etiquette: 'Programme B avec 10 :', attendu: 26 },
    ],
    conclusion:
      'Les deux programmes tombent d\'accord sur 5, et encore sur 10. Et pourtant '
      + 'ça ne **démontre rien** : il reste une infinité de nombres à essayer, et '
      + 'tu ne les essaieras jamais tous.\n'
      + 'La sortie, c\'est d\'appeler **x** le nombre choisi et d\'écrire ce que '
      + 'chaque programme lui fait. A donne **2(x + 3)**, B donne **2x + 6**. En '
      + 'développant, 2(x + 3) = 2x + 6 : c\'est la **même expression**. Les deux '
      + 'programmes sont donc équivalents pour tous les nombres à la fois — une '
      + 'ligne de calcul remplace une infinité d\'essais.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Traduire un programme de calcul',
      texte:
        'Un **programme de calcul** est une suite d\'instructions appliquée à un '
        + 'nombre de départ.\n'
        + 'Pour le traduire, on appelle **x** le nombre choisi et on écrit ce que '
        + 'chaque instruction lui fait, l\'une après l\'autre. « Ajoute 3 » donne '
        + 'x + 3 ; « multiplie le résultat par 2 » donne 2(x + 3).\n'
        + 'La **parenthèse** n\'est pas décorative : elle dit que c\'est tout le '
        + 'résultat précédent qui est multiplié, et pas seulement le dernier nombre.',
    },
    {
      type: 'propriete',
      titre: 'Deux programmes équivalents',
      texte:
        'Deux programmes de calcul sont **équivalents** lorsqu\'ils donnent le '
        + 'même résultat pour **n\'importe quel** nombre de départ.\n'
        + 'Pour le démontrer, on traduit chaque programme par une expression, puis '
        + 'on développe et on réduit les deux. Si on aboutit à la **même '
        + 'expression réduite**, les programmes sont équivalents.',
    },
    {
      // La remarque décisive, et celle qui coûte le plus cher plus tard : un
      // élève qui croit qu'essayer suffit ne verra jamais l'intérêt de l'algèbre.
      type: 'remarque',
      titre: 'Essayer n\'est pas démontrer',
      texte:
        'Des essais qui tombent d\'accord ne prouvent **rien** : il reste une '
        + 'infinité de nombres non testés.\n'
        + 'En revanche, **un seul** nombre pour lequel les deux programmes donnent '
        + 'des résultats différents suffit à prouver qu\'ils ne sont **pas** '
        + 'équivalents.\n'
        + 'Prouver l\'équivalence demande une lettre ; la réfuter demande un seul '
        + 'contre-exemple. Les deux tâches ne se ressemblent pas.',
    },
    {
      type: 'remarque',
      titre: 'Le signe = ne veut pas dire « donne »',
      texte:
        'Le signe **=** relie deux écritures qui valent la **même chose**. Écrire '
        + '« 4 + 6 = 10 × 3 = 30 » est faux : 4 + 6 ne vaut pas 30.\n'
        + 'Dans une démonstration, chaque égalité doit rester vraie quand on la lit '
        + '**toute seule**. Écris l\'expression complète du programme d\'abord, puis '
        + 'développe-la sur une nouvelle ligne.',
    },
    {
      type: 'exemple',
      texte:
        'Programme A : « ajoute 10, puis multiplie le résultat par 2 » se traduit '
        + 'par 2(x + 10) = 2x + 20.\n'
        + 'Programme B : « multiplie par 2, puis ajoute 20 » se traduit par 2x + 20.\n'
        + 'Les deux expressions réduites sont identiques : A et B sont équivalents.',
    },
  ],

  methode: {
    titre: 'Démontrer que deux programmes sont équivalents',
    enonce:
      'Programme A : choisis un nombre, ajoute 4, multiplie le résultat par 3, '
      + 'puis retire 12. Programme B : choisis un nombre, multiplie-le par 3. '
      + 'Démontrer que ces deux programmes sont équivalents.',
    etapes: [
      {
        texte: 'J\'appelle x le nombre choisi.',
        note: 'x représente n\'importe quel nombre : c\'est ce qui rendra la preuve valable pour tous.',
      },
      {
        texte: 'Je traduis A instruction par instruction : x, puis x + 4, puis 3(x + 4), puis 3(x + 4) − 12.',
        note: 'La parenthèse est obligatoire : c\'est la somme entière qu\'on multiplie par 3.',
      },
      {
        texte: 'Je développe et je réduis : 3(x + 4) − 12 = 3x + 12 − 12, donc A donne 3x.',
        note: 'Une ligne, une égalité. Chacune doit être vraie toute seule.',
      },
      {
        texte: 'Je traduis B : 3x. Les deux expressions réduites sont identiques, donc A et B sont équivalents.',
        note: 'Démontré pour tous les nombres d\'un coup, sans avoir essayé le moindre exemple.',
      },
    ],
    controle:
      'Le contrôle : prends un nombre au hasard, 7 par exemple, et fais tourner '
      + 'les deux programmes. A donne (7 + 4) × 3 − 12 = 21, B donne 7 × 3 = 21. '
      + 'Attention à ce que cet essai prouve et à ce qu\'il ne prouve pas : il ne '
      + 'démontre pas l\'équivalence, mais un désaccord t\'aurait dit à coup sûr '
      + 'qu\'une ligne de ta démonstration est fausse.',
  },

  entrainement: [
    // ── Palier 1 : exécuter un programme sur un nombre ─────────────────────
    {
      id: 'e-7-6-1', type: 'calcul', palier: 1, piege: 'distributivite-incomplete',
      consigne:
        'Programme A : « Choisis un nombre. Ajoute 5. Multiplie le résultat par 4. » '
        + 'Exécute ce programme en partant du nombre ci-dessous.',
      enonce: '\\text{nombre choisi} : 3', attendu: 32,
      fausses: [
        { valeur: 17, piege: 'distributivite-incomplete' },
        { valeur: 23, piege: 'distributivite-incomplete' },
      ],
    },
    {
      // Neutre : aucune instruction ne multiplie une somme, il n'y a donc rien
      // à distribuer et le piège de la parenthèse ne peut pas jouer. Sans cet
      // item, « un programme, donc une parenthèse quelque part » deviendrait un
      // réflexe — et l'élève en mettrait là où il n'en faut pas. Il n'est pas
      // plus facile pour autant : le nombre de départ est négatif.
      id: 'e-7-6-2', type: 'calcul', palier: 1, neutre: true, piege: 'distributivite-incomplete',
      consigne:
        'Programme B : « Choisis un nombre. Multiplie-le par 3. Retire 8. » '
        + 'Exécute ce programme en partant du nombre ci-dessous.',
      enonce: '\\text{nombre choisi} : -2', attendu: -14,
      fausses: [],
    },
    {
      id: 'e-7-6-3', type: 'calcul', palier: 1, piege: 'distributivite-incomplete',
      consigne:
        'Programme C : « Choisis un nombre. Retire 1. Multiplie le résultat par 6. '
        + 'Ajoute 4. » Exécute ce programme en partant du nombre ci-dessous.',
      enonce: '\\text{nombre choisi} : 5', attendu: 28,
      fausses: [{ valeur: 3, piege: 'distributivite-incomplete' }],
    },

    // ── Palier 2 : traduire un programme en expression ─────────────────────
    {
      id: 'e-7-6-4', type: 'expression', palier: 2, piege: 'distributivite-incomplete',
      consigne:
        'Programme D : « Choisis un nombre. Ajoute 7. Multiplie le résultat par 2. » '
        + 'Traduis ce programme : écris l\'expression obtenue en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x',
      attendu: '2(x+7)',
      fausses: [
        { valeur: '2x+7', piege: 'distributivite-incomplete' },
        { valeur: 'x+14', piege: 'distributivite-incomplete' },
      ],
    },
    {
      id: 'e-7-6-5', type: 'expression', palier: 2, piege: 'concatenation',
      consigne:
        'Programme E : « Choisis un nombre. Multiplie-le par 5. Ajoute 3. » '
        + 'Traduis ce programme en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x',
      attendu: '5x+3',
      fausses: [{ valeur: '8x', piege: 'concatenation' }],
    },
    {
      id: 'e-7-6-6', type: 'expression', palier: 2, piege: 'linearisation',
      consigne:
        'Programme F : « Choisis un nombre. Multiplie-le par lui-même. Ajoute 9. » '
        + 'Traduis ce programme en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x',
      attendu: 'x^2+9',
      fausses: [{ valeur: '2x+9', piege: 'linearisation' }],
    },
    {
      id: 'e-7-6-7', type: 'expression', palier: 2, piege: 'moins-devant-la-parenthese',
      consigne:
        'Programme G : « Choisis un nombre. Ajoute 2. Retire ce résultat à 20, '
        + 'c\'est-à-dire calcule 20 moins ce résultat. » Traduis ce programme en '
        + 'appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x',
      attendu: '20-(x+2)',
      fausses: [{ valeur: '20-x+2', piege: 'moins-devant-la-parenthese' }],
    },

    // ── Palier 3 : démontrer, comparer, relire une démonstration ───────────
    {
      // Le cœur du savoir-faire : la conclusion est juste et la démonstration
      // est fausse. Aucun contrôle sur le résultat ne peut l'attraper — il faut
      // relire chaque égalité isolément, ce que la consigne oblige à faire.
      id: 'e-7-6-8', type: 'corriger', palier: 3, piege: 'egal-qui-donne-le-resultat',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '3(x + 6)',
      lignes: [
        { texte: 'Programme : « ajoute 6, puis multiplie le résultat par 3 ». Le nombre choisi est x, donc après « ajoute 6 » on a x + 6.', fausse: false },
        { texte: 'x + 6 = 3(x + 6) = 3x + 18', fausse: true },
        { texte: 'Le second programme, « multiplie par 3 puis ajoute 18 », donne aussi 3x + 18 : les deux programmes sont équivalents.', fausse: false },
      ],
      explication:
        'La conclusion est juste, et pourtant la démonstration ne tient pas. À la '
        + 'deuxième ligne, il est écrit x + 6 = 3(x + 6) : avec x = 5, cela '
        + 'affirmerait que 11 = 33. Le signe = ne veut pas dire « et maintenant je '
        + 'multiplie » — il relie deux écritures qui valent la même chose. Il '
        + 'fallait écrire l\'expression complète du programme, 3(x + 6), puis la '
        + 'développer sur une nouvelle ligne : 3(x + 6) = 3x + 18.',
    },
    {
      // L'item qui empêche « on me demande de comparer, donc c'est équivalent ».
      // Le piège déclaré joue vraiment ici : qui croit que 4(x + 3) vaut 4x + 3
      // répond « vrai » en toute bonne foi.
      id: 'e-7-6-9', type: 'vraifaux', palier: 3, piege: 'distributivite-incomplete',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Le programme « ajoute 3, puis multiplie le résultat par 4 » et le programme '
        + '« multiplie par 4, puis ajoute 3 » donnent toujours le même résultat.',
      attendu: false,
      contreExemple: {
        invite: 'Donne un nombre de départ pour lequel les deux programmes ne donnent pas le même résultat.',
        champs: [{ id: 'a', etiquette: 'nombre choisi' }],
        // On vérifie la PROPRIÉTÉ, pas une réponse unique : le premier programme
        // donne 4(a + 3), le second 4a + 3, et l'écart vaut 12 quel que soit a.
        // Tout nombre convient donc — c'est exactement ce que l'élève doit
        // comprendre, et la validation le lui confirme quel que soit son choix.
        valide: (a) => Number.isFinite(a) && 4 * (a + 3) !== 4 * a + 3,
        temoin: [5],
        exemple:
          'Avec 5 : le premier programme donne (5 + 3) × 4 = 32, le second donne '
          + '5 × 4 + 3 = 23. Un seul nombre suffit à prouver qu\'ils ne sont pas équivalents.',
      },
    },
    {
      id: 'e-7-6-10', type: 'expression', palier: 3, piege: 'distributivite-incomplete',
      consigne:
        'Programme H : « Choisis un nombre. Ajoute 2. Multiplie le résultat par 4. '
        + 'Retire le nombre que tu avais choisi au départ. » Traduis et réduis : '
        + 'écris l\'expression obtenue en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x',
      attendu: '3x+8',
      fausses: [
        { valeur: '4x+2-x', piege: 'distributivite-incomplete' },
        { valeur: '11x', piege: 'concatenation' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-7-6-1',
      enonce:
        'Un professeur écrit deux programmes au tableau. Programme A : « choisis '
        + 'un nombre, ajoute 8, puis multiplie le résultat par 2 ». Programme B : '
        + '« choisis un nombre, multiplie-le par 2, puis ajoute 16 ». Léa les fait '
        + 'tourner tous les deux en partant de 6.',
      questions: [
        { texte: 'Quel résultat donne le programme A ?', attendu: 28 },
        { texte: 'Quel résultat donne le programme B ?', attendu: 28 },
        { texte: 'Cet essai démontre-t-il que les deux programmes sont équivalents ? Réponds 1 pour « oui », 0 pour « non ».', attendu: 0 },
      ],
    },
    {
      id: 'p-7-6-2',
      enonce:
        'Un jeu vidéo calcule le score d\'une partie ainsi : « prends le nombre de '
        + 'pièces ramassées, ajoute 5, puis multiplie le tout par 10 ». Un joueur '
        + 'affirme qu\'on obtient le même score en multipliant d\'abord par 10, puis '
        + 'en ajoutant 50.',
      questions: [
        { texte: 'Quel score donne la règle du jeu pour 12 pièces ?', attendu: 170, unite: 'points' },
        { texte: 'Quel score donne la méthode du joueur pour 12 pièces ?', attendu: 170, unite: 'points' },
        { texte: 'Quel score donne la règle du jeu pour 0 pièce ?', attendu: 50, unite: 'points' },
      ],
    },
    {
      id: 'p-7-6-3',
      enonce:
        'Deux programmes se ressemblent beaucoup. Programme A : « choisis un '
        + 'nombre, ajoute 4, puis multiplie le résultat par 3 ». Programme B : '
        + '« choisis un nombre, multiplie-le par 3, puis ajoute 4 ».',
      questions: [
        { texte: 'Quel résultat donne A en partant de 2 ?', attendu: 18 },
        { texte: 'Quel résultat donne B en partant de 2 ?', attendu: 10 },
        { texte: 'Quel que soit le nombre choisi, de combien le résultat de A dépasse-t-il celui de B ?', attendu: 8 },
      ],
    },
    {
      id: 'p-7-6-4',
      enonce:
        'Un tour de magie se présente ainsi : « pense à un nombre, ajoute 3, '
        + 'multiplie le résultat par 2, retire 6, puis divise par 2 ». Le magicien '
        + 'annonce qu\'il retombera toujours sur le nombre pensé au départ.',
      questions: [
        { texte: 'En partant de 7, que vaut le résultat juste après l\'étape « multiplie le résultat par 2 » ?', attendu: 20 },
        { texte: 'Quel est le résultat final, toujours en partant de 7 ?', attendu: 7 },
        { texte: 'Quel est le résultat final en partant de −4 ?', attendu: -4 },
      ],
    },
    {
      id: 'p-7-6-5',
      enonce:
        'Deux élèves traduisent le même programme : « choisis un nombre, retire 2, '
        + 'puis multiplie le résultat par 5 ». Sacha écrit 5x − 10 et Inès écrit '
        + '5x − 2. Pour les départager, on prend x = 6.',
      questions: [
        { texte: 'Que donne le programme lui-même en partant de 6 ?', attendu: 20 },
        { texte: 'Que vaut l\'expression de Sacha pour x = 6 ?', attendu: 20 },
        { texte: 'Que vaut l\'expression d\'Inès pour x = 6 ?', attendu: 28 },
      ],
    },
  ],

  test: [
    {
      id: 't-7-6-1', type: 'calcul',
      consigne:
        'Programme : « Choisis un nombre. Ajoute 9. Multiplie le résultat par 3. » '
        + 'Exécute-le en partant du nombre ci-dessous.',
      enonce: '\\text{nombre choisi} : 4', attendu: 39, revoir: 'definition',
    },
    {
      id: 't-7-6-2', type: 'calcul',
      consigne:
        'Programme : « Choisis un nombre. Multiplie-le par 4. Retire 11. » '
        + 'Exécute-le en partant du nombre ci-dessous.',
      enonce: '\\text{nombre choisi} : -3', attendu: -23, revoir: 'definition',
    },
    {
      id: 't-7-6-3', type: 'expression',
      consigne:
        'Programme : « Choisis un nombre. Ajoute 8. Multiplie le résultat par 4. » '
        + 'Traduis-le en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x', attendu: '4(x+8)',
      fausses: [{ valeur: '4x+8', piege: 'distributivite-incomplete' }],
      revoir: 'exemple',
    },
    {
      id: 't-7-6-4', type: 'expression',
      consigne:
        'Programme : « Choisis un nombre. Multiplie-le par 7. Ajoute 2. » '
        + 'Traduis-le en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x', attendu: '7x+2',
      fausses: [{ valeur: '9x', piege: 'concatenation' }],
      revoir: 'definition',
    },
    {
      id: 't-7-6-5', type: 'expression',
      consigne:
        'Programme : « Choisis un nombre. Multiplie-le par lui-même. Retire 5. » '
        + 'Traduis-le en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x', attendu: 'x^2-5',
      fausses: [{ valeur: '2x-5', piege: 'linearisation' }],
      revoir: 'propriete',
    },
    {
      id: 't-7-6-6', type: 'expression',
      consigne:
        'Programme : « Choisis un nombre. Ajoute 1. Multiplie le résultat par 6. '
        + 'Retire le nombre que tu avais choisi au départ. » Traduis-le et '
        + 'réduis-le, en appelant x le nombre choisi.',
      enonce: '\\text{nombre choisi} : x', attendu: '5x+6',
      fausses: [{ valeur: '6x+1-x', piege: 'distributivite-incomplete' }],
      revoir: 'propriete',
    },
    {
      id: 't-7-6-7', type: 'plausible',
      consigne:
        'Le programme « choisis un nombre, ajoute 5, puis multiplie le résultat '
        + 'par 3 » a été traduit par l\'expression ci-dessous. Ce résultat est-il plausible ?',
      enonce: '3x + 15', attendu: true,
      explication:
        'Oui : le programme donne 3(x + 5), et 3(x + 5) = 3x + 15. Vérification '
        + 'avec 4 : le programme donne (4 + 5) × 3 = 27, et l\'expression donne '
        + '3 × 4 + 15 = 27. Les deux écritures disent bien la même chose.',
      revoir: 'exemple',
    },
    {
      id: 't-7-6-8', type: 'plausible',
      consigne:
        'Le programme « choisis un nombre, multiplie-le par 2, puis ajoute 9 » a '
        + 'été traduit par l\'expression ci-dessous. Ce résultat est-il plausible ?',
      enonce: '2(x + 9)', attendu: false,
      explication:
        'Non : 2(x + 9) vaut 2x + 18, alors que le programme donne 2x + 9. La '
        + 'parenthèse a été ajoutée là où il n\'en faut pas — ici c\'est le nombre '
        + 'choisi seul qui est multiplié par 2, pas la somme. Vérification avec 4 : '
        + 'le programme donne 4 × 2 + 9 = 17, et 2(4 + 9) donne 26.',
      piege: 'distributivite-incomplete', revoir: 'exemple',
    },
    {
      id: 't-7-6-9', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation:
        'Pour prouver que deux programmes ne sont pas équivalents, un seul nombre '
        + 'bien choisi suffit.',
      attendu: true, revoir: 'remarque',
    },
    {
      id: 't-7-6-10', type: 'corriger',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '7(x + 2)',
      lignes: [
        { texte: 'Programme : « ajoute 2, puis multiplie le résultat par 7 ». Le nombre choisi est x, donc après « ajoute 2 » on a x + 2.', fausse: false },
        { texte: 'x + 2 = 7(x + 2) = 7x + 14', fausse: true },
        { texte: 'Le programme se traduit donc par 7x + 14.', fausse: false },
      ],
      explication:
        'La conclusion est juste, mais la deuxième ligne écrit x + 2 = 7(x + 2) : '
        + 'avec x = 5, cela affirmerait que 7 = 49. Le signe = relie deux écritures '
        + 'qui valent la même chose, il n\'annonce pas l\'étape suivante. Il fallait '
        + 'écrire d\'abord l\'expression du programme, 7(x + 2), puis la développer '
        + 'sur une nouvelle ligne.',
      piege: 'egal-qui-donne-le-resultat', revoir: 'remarque',
    },
  ],
};
