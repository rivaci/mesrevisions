// Savoir-faire 7-2 — Calculer la valeur d'une expression.
//
// C'est le savoir-faire qui rend l'algèbre VÉRIFIABLE. Tant que l'élève ne sait
// pas remplacer une lettre par un nombre, il n'a aucun moyen de savoir si son
// développement était juste : il attend le corrigé. Dès qu'il sait le faire,
// tout le chapitre 7 se contrôle tout seul — et c'est exactement le geste que
// portent presque tous les pièges de ce chapitre (« remplace x par 3 et
// compare »). Il vient donc tôt, avant les transformations qu'il servira à
// vérifier.
//
// ── Les deux difficultés, et seulement elles ──────────────────────────────
//
//   1. Les multiplications ne sont pas écrites. 3x, c'est 3 × x ; 2(x + 5),
//      c'est 2 × (x + 5). L'élève qui ne les rétablit pas calcule autre chose.
//   2. Les valeurs négatives réclament des parenthèses. Pour x = −5, x² s'écrit
//      (−5)² et vaut 25 ; écrire −5² donne −25. C'est LA distinction que les
//      contrôles sanctionnent le plus, et le chapitre 6 l'a déjà installée sur
//      des nombres — ici on ne la réapprend pas, on l'applique à une lettre.
//
// Le type d'exercice est le calcul : la réponse est un nombre, pas une
// écriture. C'est ce qui distingue ce savoir-faire des trois autres du
// chapitre, où l'élève produit une expression.

export default {
  id: 'sf-7-2',
  titre: 'Calculer la valeur d\'une expression',
  attendus: [
    'Il calcule la valeur d\'une expression littérale en donnant à la lettre une valeur numérique.',
    'Il teste si une égalité est vraie en attribuant une valeur numérique à la lettre.',
  ],

  // On ne prévient pas de la difficulté : on la fait rencontrer sur le seul cas
  // où l'élève peut trancher seul. x² veut dire x × x — il le sait depuis le
  // chapitre 6 — et la règle des signes du chapitre 1 lui donne les deux
  // résultats. Ce sont ses propres calculs qui départagent les deux copies,
  // pas une règle annoncée d'avance.
  decouvrir: {
    titre: 'La parenthèse qui change le résultat',
    texte:
      'On demande la valeur de x² lorsque x vaut −5. Voici deux copies, et '
      + 'elles ne donnent pas le même résultat.',
    copies: [
      { nom: 'Sacha', calcul: 'x² = −5² = −(5 × 5)', resultat: '−25' },
      { nom: 'Inès', calcul: 'x² = (−5)² = (−5) × (−5)', resultat: '25' },
    ],
    question:
      'Calcule toi-même les deux résultats proposés : ils ne sortent pas du '
      + 'même calcul.',
    champs: [
      { id: 'a', etiquette: '(−5) × (−5) =', attendu: 25 },
      { id: 'b', etiquette: '−(5 × 5) =', attendu: -25 },
    ],
    conclusion:
      'C\'est **Inès**. x² veut dire x × x : quand x vaut −5, c\'est le nombre '
      + '**−5 tout entier**, signe compris, qui prend la place de la lettre — et '
      + 'c\'est la parenthèse qui le dit. Sacha a écrit −5², où seul le 5 est '
      + 'élevé au carré : il a calculé l\'opposé de 5², pas le carré de −5. '
      + '**Quand on remplace une lettre par un nombre négatif, on met des '
      + 'parenthèses.**',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Valeur d\'une expression littérale',
      texte:
        'Calculer la **valeur** d\'une expression littérale pour une valeur '
        + 'donnée de la lettre, c\'est **remplacer la lettre par ce nombre**, '
        + 'puis effectuer le calcul.\n'
        + 'On dit qu\'on **substitue** le nombre à la lettre.',
    },
    {
      // La moitié des erreurs de substitution se jouent avant le premier
      // calcul : dans la lecture d'une écriture où les × sont invisibles.
      type: 'remarque',
      titre: 'Les multiplications qui ne sont pas écrites',
      texte:
        'Devant une lettre ou une parenthèse, le signe × disparaît : 3x, c\'est '
        + '3 × x ; 2x², c\'est 2 × x × x ; 4(x + 1), c\'est 4 × (x + 1).\n'
        + 'Avant de remplacer, remets ces × en place. Il ne reste alors qu\'un '
        + 'calcul de nombres, sans plus rien de littéral.',
    },
    {
      type: 'propriete',
      titre: 'Une fois la lettre remplacée, les priorités habituelles',
      texte:
        'La substitution ne change pas l\'ordre des opérations. On applique les '
        + 'priorités du chapitre 1 : les **parenthèses** d\'abord, puis les '
        + '**puissances**, puis les **multiplications et divisions**, et enfin '
        + 'les **additions et soustractions**.',
    },
    {
      type: 'remarque',
      titre: 'Une valeur négative s\'écrit entre parenthèses',
      texte:
        'Quand la lettre vaut un nombre négatif, ce nombre prend la place de la '
        + 'lettre **avec des parenthèses** : pour x = −5, x² s\'écrit (−5)², qui '
        + 'vaut 25 — et non −5², qui vaut −25.\n'
        + 'La parenthèse n\'est pas une décoration : sans elle, le signe reste '
        + 'dehors et l\'expression ne dit plus la même chose.',
    },
    {
      type: 'exemple',
      texte:
        'Pour x = −2 :\n'
        + '3x + 5 = 3 × (−2) + 5 = −6 + 5 = −1\n'
        + 'x² − x = (−2)² − (−2) = 4 + 2 = 6',
    },
  ],

  methode: {
    titre: 'Calculer une valeur quand la lettre est négative',
    enonce: 'Calculer B = 2x² − 5x pour x = −3.',
    etapes: [
      {
        texte: 'Je remets les multiplications cachées : B = 2 × x × x − 5 × x.',
        note: 'Rien n\'est encore remplacé : je prépare le terrain.',
      },
      {
        texte: 'Je remplace chaque x par (−3), parenthèses comprises : B = 2 × (−3)² − 5 × (−3).',
        note: 'Autant de parenthèses que de x dans l\'expression de départ.',
      },
      {
        texte: 'Les puissances passent avant les produits : (−3)² = 9.',
        note: 'Deux facteurs négatifs, donc positif — c\'est le chapitre 1.',
      },
      {
        texte: 'Puis les produits : 2 × 9 = 18, et 5 × (−3) = −15.',
        note: '',
      },
      {
        texte: 'Il reste B = 18 − (−15) = 18 + 15 = 33.',
        note: 'Soustraire un nombre négatif revient à ajouter.',
      },
    ],
    controle:
      'Le contrôle : compte les x de l\'expression de départ, puis les '
      + 'parenthèses de ta substitution — il en faut autant. Puis relis ta '
      + 'ligne de gauche à droite : chaque égalité doit être vraie toute seule. '
      + 'Si tu lis « 3 × 5 = 15 − 4 », c\'est que deux calculs se sont retrouvés '
      + 'sur la même ligne.',
  },

  entrainement: [
    {
      id: 'e-7-2-1', type: 'calcul', palier: 1, piege: 'concatenation',
      consigne: 'Calcule la valeur de cette expression pour x = 5.',
      enonce: '4x + 3', attendu: 23,
      fausses: [{ valeur: 35, piege: 'concatenation' }],
    },
    {
      id: 'e-7-2-2', type: 'calcul', palier: 1, piege: 'linearisation',
      consigne: 'Calcule la valeur de cette expression pour x = 6.',
      enonce: 'x^{2}', attendu: 36,
      fausses: [{ valeur: 12, piege: 'linearisation' }],
    },
    {
      // Neutre, et c'est LE cas neutre du savoir-faire : x = 2 est la seule
      // valeur positive où lire x² comme 2x donne quand même la bonne réponse
      // (2 × 2 des deux côtés). C'est de là que vient la confusion, et c'est
      // aussi pourquoi la charte interdit x = 2 comme témoin de contre-exemple.
      // Le rencontrer une fois, en sachant que c'est un cas isolé, empêche d'en
      // refaire une règle. Aucune réponse fausse n'est prévisible ici : le
      // piège du moment ne se déclenche pas, donc `fausses` reste vide.
      id: 'e-7-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'linearisation',
      consigne: 'Calcule la valeur de cette expression pour x = 2.',
      enonce: 'x^{2}', attendu: 4,
      fausses: [],
    },
    {
      id: 'e-7-2-4', type: 'calcul', palier: 2, piege: 'linearisation',
      consigne: 'Calcule la valeur de cette expression pour x = −3.',
      enonce: 'x^{2}', attendu: 9,
      fausses: [{ valeur: -6, piege: 'linearisation' }],
    },
    {
      id: 'e-7-2-5', type: 'calcul', palier: 2, piege: 'concatenation',
      consigne: 'Calcule la valeur de cette expression pour x = −4.',
      enonce: '5 - 2x', attendu: 13,
      fausses: [{ valeur: -12, piege: 'concatenation' }],
    },
    {
      id: 'e-7-2-6', type: 'calcul', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Calcule la valeur de cette expression pour x = −8.',
      enonce: '2(x + 5)', attendu: -6,
      fausses: [{ valeur: -11, piege: 'distributivite-incomplete' }],
    },
    {
      id: 'e-7-2-7', type: 'plausible', palier: 2,
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '(-4)^{2} = -16', attendu: false,
      explication:
        'La parenthèse enferme le signe : c\'est le nombre −4 tout entier qui '
        + 'est élevé au carré, donc (−4) × (−4) = **16**. Deux facteurs '
        + 'négatifs donnent un produit positif — un carré ne peut pas être '
        + 'négatif. Le −16 proposé, c\'est −4², l\'opposé de 4².',
    },
    {
      // L'autre moitié de la distinction, et elle est indispensable : sans un
      // « plausible » dont la réponse est OUI, « on me pose la question, donc
      // c'est faux » suffirait à réussir la série.
      id: 'e-7-2-8', type: 'plausible', palier: 3,
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '-2^{2} = -4', attendu: true,
      explication:
        'Vrai. Ici il n\'y a **pas** de parenthèse : seul le 2 est élevé au '
        + 'carré et le signe reste devant, donc −2² = −(2 × 2) = −4. '
        + 'Compare avec (−2)², où la parenthèse enferme le signe : celui-là '
        + 'vaut 4. Deux écritures voisines, deux nombres opposés.',
    },
    {
      id: 'e-7-2-9', type: 'corriger', palier: 3, piege: 'egal-qui-donne-le-resultat',
      consigne:
        'Voici le calcul de 3x − 4 pour x = 5. Le résultat final est juste, '
        + 'mais une ligne écrit quelque chose de faux. Trouve-la.',
      enonce: '3x - 4',
      lignes: [
        { texte: 'Pour x = 5 : 3x − 4', fausse: false },
        { texte: '= 3 × 5 = 15 − 4 = 11', fausse: true },
        { texte: 'Donc l\'expression vaut 11.', fausse: false },
      ],
      explication:
        'Le résultat, 11, est bien le bon. C\'est l\'écriture de la deuxième '
        + 'ligne qui est fausse : elle affirme au passage que 3 × 5 = 15 − 4, '
        + 'c\'est-à-dire que 15 = 11. Le signe = relie deux écritures qui valent '
        + 'la **même** chose ; il n\'annonce pas la suite du calcul. Il fallait '
        + 'écrire 3 × 5 − 4 = 15 − 4 = 11.',
    },
    {
      id: 'e-7-2-10', type: 'vraifaux', palier: 3, piege: 'linearisation',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Les expressions x² et 2x ont la même valeur, quelle que soit la valeur de x.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve une valeur de x pour laquelle les deux expressions ne donnent pas le même résultat.',
        champs: [{ id: 'a', etiquette: 'valeur de x' }],
        // On vérifie la PROPRIÉTÉ — les deux expressions diffèrent — et pas une
        // valeur imposée. La fonction refuse d'elle-même 0 et 2, les deux seules
        // valeurs où x² et 2x coïncident : un élève qui les propose n'a rien
        // réfuté, et c'est précisément ce qu'il doit découvrir ici.
        valide: (a) => Number.isFinite(a) && a * a !== 2 * a,
        temoin: [3],
        exemple: 'Pour x = 3 : x² vaut 9 et 2x vaut 6. Une seule valeur qui les sépare suffit à réfuter l\'affirmation.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-7-2-1',
      enonce:
        'Voici un programme de calcul : « Choisis un nombre, multiplie-le par 3, '
        + 'puis ajoute 4 au résultat. » En appelant x le nombre choisi, ce '
        + 'programme se résume à l\'expression 3x + 4.',
      questions: [
        { texte: 'Quel résultat obtient-on en choisissant 7 ?', attendu: 25 },
        { texte: 'Et en choisissant −5 ?', attendu: -11 },
      ],
    },
    {
      id: 'p-7-2-2',
      enonce:
        'Un rectangle a une longueur de x + 4 centimètres et une largeur de '
        + '3 centimètres.',
      questions: [
        { texte: 'Quel est son périmètre pour x = 6 ?', attendu: 26, unite: 'cm' },
        { texte: 'Quelle est son aire pour x = 6 ?', attendu: 30, unite: 'cm²' },
      ],
    },
    {
      id: 'p-7-2-3',
      enonce:
        'Un loueur de vélos facture 9 € d\'assurance, puis 4 € par heure de '
        + 'location. Pour x heures, le prix à payer en euros est donc 4x + 9.',
      questions: [
        { texte: 'Combien paie-t-on pour 3 heures ?', attendu: 21, unite: '€' },
        { texte: 'Et pour 7 heures ?', attendu: 37, unite: '€' },
      ],
    },
    {
      // L'aire d'un carré est l'exemple canonique de l'illusion de linéarité
      // (chapitre 5) : doubler le côté ne double pas l'aire, il la quadruple.
      // Substituer deux valeurs dans x² le rend visible sans un mot de théorie.
      id: 'p-7-2-4',
      enonce:
        'Un carré a pour côté x centimètres. Son aire, en centimètres carrés, '
        + 'est donnée par l\'expression x².',
      questions: [
        { texte: 'Quelle est son aire pour x = 7 ?', attendu: 49, unite: 'cm²' },
        { texte: 'Et pour x = 14 ?', attendu: 196, unite: 'cm²' },
      ],
    },
    {
      id: 'p-7-2-5',
      enonce:
        'Un site météo annonce que la température, en degrés Celsius, sera '
        + 'donnée par l\'expression 12 − 2x, où x est le nombre d\'heures '
        + 'écoulées depuis midi.',
      questions: [
        { texte: 'Quelle température annonce-t-il à 15 h ?', attendu: 6, unite: '°C' },
        { texte: 'Et à 20 h ?', attendu: -4, unite: '°C' },
      ],
    },
  ],

  test: [
    {
      id: 't-7-2-1', type: 'calcul',
      consigne: 'Calcule la valeur de cette expression pour x = 5.',
      enonce: '2x + 7', attendu: 17, revoir: 'definition',
    },
    {
      id: 't-7-2-2', type: 'calcul',
      consigne: 'Calcule la valeur de cette expression pour x = 8.',
      enonce: 'x^{2}', attendu: 64, revoir: 'definition',
    },
    {
      id: 't-7-2-3', type: 'calcul',
      consigne: 'Calcule la valeur de cette expression pour x = −5.',
      enonce: 'x^{2}', attendu: 25, revoir: 'remarque',
    },
    {
      id: 't-7-2-4', type: 'calcul',
      consigne: 'Calcule la valeur de cette expression pour x = −2.',
      enonce: '3x - 1', attendu: -7, revoir: 'propriete',
    },
    {
      id: 't-7-2-5', type: 'calcul',
      consigne: 'Calcule la valeur de cette expression pour x = 4.',
      enonce: '10 - 3x', attendu: -2, revoir: 'propriete',
    },
    {
      id: 't-7-2-6', type: 'calcul',
      consigne: 'Calcule la valeur de cette expression pour x = 7.',
      enonce: '4(x - 1)', attendu: 24, revoir: 'propriete',
    },
    {
      id: 't-7-2-7', type: 'trous',
      consigne: 'Pour quelle valeur de x cette égalité est-elle vraie ? Complète.',
      enonce: '5x + 2 = 27',
      champs: [{ id: 'a', etiquette: 'x =', attendu: 5 }],
      revoir: 'definition',
    },
    {
      id: 't-7-2-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '-4^{2} = 16', attendu: false,
      explication:
        'Sans parenthèse, seul le 4 est élevé au carré et le signe reste '
        + 'devant : −4² = −(4 × 4) = −16. Le 16 proposé, c\'est (−4)², où la '
        + 'parenthèse enferme le signe.',
      revoir: 'remarque',
    },
    {
      id: 't-7-2-9', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '(-6)^{2} = 36', attendu: true,
      explication:
        'La parenthèse enferme le signe : (−6) × (−6) = 36. Deux facteurs '
        + 'négatifs donnent bien un résultat positif.',
      revoir: 'remarque',
    },
    {
      id: 't-7-2-10', type: 'calcul',
      consigne: 'Calcule la valeur de cette expression pour x = 3.',
      enonce: 'x^{2} + 2x', attendu: 15, revoir: 'exemple',
    },
  ],
};
