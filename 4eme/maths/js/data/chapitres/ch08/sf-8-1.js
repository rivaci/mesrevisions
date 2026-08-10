// Savoir-faire 8-1 — Calculer une moyenne.
//
// ── Pourquoi la moyenne pondérée arrive dès le premier savoir-faire ────────
//
// La moyenne simple est acquise depuis la 6e : additionner et diviser par le
// nombre de valeurs ne pose plus de problème. Ce qui arrive en 4e, et qui pose
// problème toute la vie, c'est la PONDÉRATION — le fait qu'une valeur puisse
// peser plus lourd qu'une autre.
//
// D'où le découpage de ce savoir-faire : la moyenne simple n'occupe que le
// premier palier, juste assez pour réinstaller la définition, et tout le reste
// travaille les effectifs.
//
// ── Le piège, et pourquoi il est si résistant ─────────────────────────────
//
// « Une classe a 12 de moyenne, l'autre 15, donc l'ensemble a 13,5 » est faux
// dès que les deux classes n'ont pas le même effectif. Ce n'est pas une
// étourderie de calcul : c'est une règle qui a MARCHÉ pendant des années,
// parce qu'en primaire les groupes comparés ont presque toujours la même
// taille. L'élève n'applique pas une bêtise, il applique un cas particulier
// qu'il a généralisé sans le savoir.
//
// C'est exactement pour ça que l'item neutre du palier 2 est un cas d'effectifs
// ÉGAUX, où le raccourci donne la bonne réponse : le rencontrer explicitement
// empêche d'en refaire une règle, et montre où la règle vient d'être apprise.
//
// ── Le geste de contrôle ──────────────────────────────────────────────────
//
// Une moyenne tombe toujours entre la plus petite et la plus grande valeur, et
// du côté du groupe le plus nombreux. Ce contrôle-là ne demande aucun calcul,
// et il attrape la moyenne des moyennes une fois sur deux — parce qu'elle
// tombe pile au milieu, ce qui n'a aucune raison d'arriver.

export default {
  id: 'sf-8-1',
  titre: 'Calculer une moyenne',
  attendus: [
    'Il calcule la moyenne d\'une série de données, éventuellement pondérée par des effectifs.',
    'Il interprète la moyenne comme une caractéristique de position d\'une série statistique.',
  ],

  // On ne dit pas la règle : on met le raccourci et le calcul honnête face à
  // face, et on laisse les totaux trancher. L'élève ne croit pas sur parole,
  // il recompte les points — et c'est en les recomptant qu'il voit que les
  // 20 élèves du premier groupe ne peuvent pas peser autant que les 10 autres.
  decouvrir: {
    titre: 'Deux classes, deux moyennes, et un total qui tranche',
    texte:
      'Deux groupes ont passé le même devoir. Les 20 élèves du groupe A ont '
      + '12 de moyenne, les 10 élèves du groupe B ont 15. On demande la moyenne '
      + 'des 30 élèves réunis. Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: '(12 + 15) ÷ 2', resultat: '13,5' },
      { nom: 'Inès', calcul: 'Je repars des totaux de points', resultat: '13' },
    ],
    question:
      'Pour départager, compte les points. Le groupe A a marqué 20 × 12 points, '
      + 'le groupe B en a marqué 10 × 15.',
    champs: [
      { id: 'a', etiquette: 'total des points des 30 élèves :', attendu: 390 },
      { id: 'b', etiquette: 'ce total partagé entre les 30 élèves :', attendu: 13 },
    ],
    conclusion:
      'C\'est **Inès** qui a raison : la moyenne des 30 élèves vaut **13**, pas '
      + '13,5. Le groupe A est **deux fois plus nombreux**, donc son 12 pèse '
      + 'deux fois plus lourd que le 15 de l\'autre groupe — et la moyenne '
      + 'd\'ensemble penche de son côté. Faire la demi-somme des deux moyennes '
      + 'reviendrait à traiter les deux groupes comme s\'ils avaient la même taille.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Moyenne d\'une série',
      texte:
        'La **moyenne** d\'une série de données, c\'est la **somme de toutes les '
        + 'valeurs** divisée par le **nombre de valeurs**.\n'
        + 'moyenne = somme des valeurs ÷ effectif total\n'
        + 'C\'est la valeur qu\'aurait chaque donnée si on partageait le total en '
        + 'parts égales.',
    },
    {
      type: 'propriete',
      titre: 'Moyenne pondérée par des effectifs',
      texte:
        'Quand une même valeur revient plusieurs fois, on la multiplie par son '
        + '**effectif** au lieu de la réécrire :\n'
        + 'moyenne = (effectif × valeur + effectif × valeur + …) ÷ (somme des effectifs)\n'
        + 'Ce n\'est pas une autre moyenne : c\'est la même, écrite plus court.',
    },
    {
      // La remarque qui porte tout le savoir-faire. Elle est écrite comme une
      // condition — « sauf si les effectifs sont égaux » — et pas comme une
      // interdiction : c'est cette condition que l'élève n'a jamais vue, parce
      // qu'elle était toujours vérifiée avant cette année.
      type: 'remarque',
      titre: 'La moyenne de deux moyennes n\'en est pas une',
      texte:
        'Deux groupes réunis n\'ont **pas** pour moyenne la demi-somme de leurs '
        + 'moyennes — sauf si les deux groupes ont exactement le **même effectif**.\n'
        + 'Le groupe le plus nombreux tire la moyenne d\'ensemble de son côté : il '
        + 'pèse plus lourd.\n'
        + 'Pour réunir deux groupes, on repart donc des **totaux** : la somme de '
        + 'toutes les valeurs, divisée par l\'effectif total.',
    },
    {
      type: 'remarque',
      titre: 'Où une moyenne doit tomber',
      texte:
        'Une moyenne est toujours comprise entre la **plus petite** et la **plus '
        + 'grande** valeur de la série. Un résultat qui sort de cet intervalle est '
        + 'forcément faux, et ça se voit sans refaire le calcul.',
    },
    {
      type: 'exemple',
      texte:
        'Série 7 ; 9 ; 14 : moyenne = (7 + 9 + 14) ÷ 3 = 30 ÷ 3 = 10.\n'
        + 'Avec des effectifs — 4 valeurs égales à 11 et 6 valeurs égales à 16 : '
        + 'moyenne = (4 × 11 + 6 × 16) ÷ 10 = 140 ÷ 10 = 14.',
    },
  ],

  methode: {
    titre: 'Réunir deux groupes de tailles différentes',
    enonce:
      'Dans un club, 15 joueurs ont marqué 8 buts en moyenne et 5 joueurs en ont '
      + 'marqué 12. Calculer le nombre moyen de buts par joueur du club.',
    etapes: [
      {
        texte: 'Je calcule le total du premier groupe : 15 × 8 = 120 buts.',
        note: 'Effectif × moyenne redonne la somme des valeurs — c\'est la définition, lue à l\'envers.',
      },
      {
        texte: 'Puis le total du second : 5 × 12 = 60 buts.',
        note: '',
      },
      {
        texte: 'Le club compte 15 + 5 = 20 joueurs, pour 120 + 60 = 180 buts.',
        note: 'On additionne les totaux, jamais les moyennes.',
      },
      {
        texte: 'La moyenne du club vaut donc 180 ÷ 20 = 9 buts par joueur.',
        note: 'Et surtout pas (8 + 12) ÷ 2 = 10 : le groupe de 15 pèse trois fois plus que celui de 5.',
      },
    ],
    controle:
      'Le contrôle, et il se fait de tête : la moyenne d\'ensemble tombe toujours '
      + 'entre les deux moyennes, et **du côté du groupe le plus nombreux**. Ici 9 '
      + 'est bien entre 8 et 12, et plus près de 8 — cohérent, puisque les joueurs '
      + 'à 8 buts sont trois fois plus nombreux. Une réponse pile au milieu doit '
      + 't\'alerter : c\'est la signature de la moyenne des moyennes.',
  },

  entrainement: [
    {
      // Item neutre, et il ouvre volontairement le palier : une série brute, sans
      // groupes ni effectifs. Le piège du chapitre ne peut pas jouer ici, il n'y a
      // rien à pondérer. C'est la définition qu'on réinstalle, et rien d'autre.
      // Aucune erreur n'est prévisible de façon fiable, donc `fausses` est vide.
      id: 'e-8-1-1', type: 'calcul', palier: 1, neutre: true, piege: 'moyenne-des-moyennes',
      consigne: 'Calcule la moyenne de cette série.',
      enonce: '9 \\text{ ; } 14 \\text{ ; } 8 \\text{ ; } 13 \\text{ ; } 6', attendu: 10,
      fausses: [],
    },
    {
      id: 'e-8-1-2', type: 'calcul', palier: 1, piege: 'moyenne-des-moyennes',
      consigne:
        'Dans une équipe, 3 joueurs mesurent 160 cm et 7 joueurs mesurent 170 cm. '
        + 'Calcule la taille moyenne des 10 joueurs, en centimètres.',
      enonce: '\\text{3 joueurs à } 160\\text{ cm} \\qquad \\text{7 joueurs à } 170\\text{ cm}',
      attendu: 167,
      fausses: [{ valeur: 165, piege: 'moyenne-des-moyennes' }],
    },
    {
      id: 'e-8-1-3', type: 'calcul', palier: 1, piege: 'moyenne-des-moyennes',
      consigne:
        'À un concours de tir, 10 tireurs ont marqué 8 points, 5 tireurs en ont '
        + 'marqué 12 et 5 tireurs en ont marqué 16. Calcule le nombre moyen de '
        + 'points des 20 tireurs.',
      enonce: '\\text{10 tireurs à } 8 \\qquad \\text{5 tireurs à } 12 \\qquad \\text{5 tireurs à } 16',
      attendu: 11,
      fausses: [{ valeur: 12, piege: 'moyenne-des-moyennes' }],
    },
    {
      id: 'e-8-1-4', type: 'calcul', palier: 2, piege: 'moyenne-des-moyennes',
      consigne:
        'Les 24 élèves de 4e A ont 11 de moyenne au dernier devoir, les 16 élèves '
        + 'de 4e B en ont 16. Calcule la moyenne des 40 élèves réunis.',
      enonce: '\\text{24 élèves à } 11 \\qquad \\text{16 élèves à } 16',
      attendu: 13,
      fausses: [{ valeur: 13.5, piege: 'moyenne-des-moyennes' }],
    },
    {
      // Le second item neutre, et c'est LE cas neutre de tout le savoir-faire :
      // les deux groupes ont le même effectif, donc la demi-somme des moyennes
      // donne exactement la bonne réponse. C'est très précisément d'ici que vient
      // la confusion — l'élève a rencontré ce cas des dizaines de fois et en a
      // tiré une règle générale. Le rencontrer en sachant qu'il est particulier
      // est la seule façon d'empêcher la généralisation.
      id: 'e-8-1-5', type: 'calcul', palier: 2, neutre: true, piege: 'moyenne-des-moyennes',
      consigne:
        'Deux groupes de 15 randonneurs. Le premier a marché 12 km en moyenne, le '
        + 'second 18 km. Calcule la distance moyenne des 30 randonneurs, en km.',
      enonce: '\\text{15 randonneurs à } 12\\text{ km} \\qquad \\text{15 randonneurs à } 18\\text{ km}',
      attendu: 15,
      fausses: [],
    },
    {
      id: 'e-8-1-6', type: 'calcul', palier: 2, piege: 'moyenne-des-moyennes',
      consigne:
        'Dans une boutique, 45 clients du matin ont dépensé 20 euros en moyenne et '
        + '5 clients du soir 60 euros en moyenne. Calcule la dépense moyenne des '
        + '50 clients, en euros.',
      enonce: '\\text{45 clients à } 20\\text{ euros} \\qquad \\text{5 clients à } 60\\text{ euros}',
      attendu: 24,
      fausses: [{ valeur: 40, piege: 'moyenne-des-moyennes' }],
    },
    {
      id: 'e-8-1-7', type: 'plausible', palier: 2, piege: 'moyenne-des-moyennes',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{25 \\times 8 + 15 \\times 16}{40} = 12', attendu: false,
      explication:
        'Le haut de la fraction vaut 200 + 240 = 440, et 440 ÷ 40 = **11**, pas 12. '
        + 'Le 12 proposé, c\'est (8 + 16) ÷ 2 : la moyenne des deux moyennes. Elle '
        + 'oublie que le groupe de 25 est plus nombreux que celui de 15, donc que '
        + 'la moyenne d\'ensemble doit pencher vers 8.',
    },
    {
      id: 'e-8-1-8', type: 'plausible', palier: 3, piege: 'moyenne-des-moyennes',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5 \\times 12 + 10 \\times 18}{15} = 16', attendu: true,
      explication:
        'Le calcul est juste : 60 + 180 = 240, et 240 ÷ 15 = 16. Le résultat ne '
        + 'tombe pas au milieu de 12 et 18, et c\'est justement ce qui est normal : '
        + 'le groupe de 10 est deux fois plus nombreux, il tire la moyenne vers 18. '
        + 'Une moyenne d\'ensemble n\'a aucune raison d\'être à mi-chemin.',
    },
    {
      id: 'e-8-1-9', type: 'corriger', palier: 3, piege: 'moyenne-des-moyennes',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{18 joueurs à } 9\\text{ buts} \\qquad \\text{12 joueurs à } 14\\text{ buts}',
      lignes: [
        { texte: '18 × 9 = 162 et 12 × 14 = 168, soit 330 buts en tout', fausse: false },
        { texte: '= 330 ÷ 2 = 165', fausse: true },
        { texte: 'Le club marque donc 165 buts en moyenne.', fausse: false },
      ],
      explication:
        'La première ligne est juste : le club a bien marqué 330 buts. C\'est à la '
        + 'deuxième que ça casse — on divise par l\'**effectif total**, c\'est-à-dire '
        + 'par les 30 joueurs, et non par les 2 groupes. La moyenne vaut '
        + '330 ÷ 30 = 11 buts. Et 165 aurait dû alerter tout de suite : une moyenne '
        + 'tombe toujours entre la plus petite et la plus grande valeur, donc ici '
        + 'entre 9 et 14.',
    },
    {
      id: 'e-8-1-10', type: 'vraifaux', palier: 3, piege: 'moyenne-des-moyennes',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Un groupe a 10 de moyenne, un autre 20. Réunis, ils ont forcément 15 de moyenne.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis les effectifs des deux groupes pour que la moyenne d\'ensemble ne vaille pas 15.',
        champs: [
          { id: 'a', etiquette: 'effectif du groupe à 10' },
          { id: 'b', etiquette: 'effectif du groupe à 20' },
        ],
        // On vérifie la PROPRIÉTÉ qui rend le contre-exemple valable — la moyenne
        // d'ensemble diffère de 15 — et non un couple imposé. Tous les effectifs
        // différents conviennent, l'élève choisit les siens. La comparaison est
        // écrite en produits pour rester exacte, sans division.
        valide: (a, b) => Number.isInteger(a) && Number.isInteger(b) && a > 0 && b > 0
          && 10 * a + 20 * b !== 15 * (a + b),
        temoin: [30, 10],
        exemple:
          'Avec 30 individus à 10 et 10 individus à 20 : (30 × 10 + 10 × 20) ÷ 40 '
          + '= 500 ÷ 40 = 12,5, et non 15.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-8-1-1',
      enonce: 'Léa a eu quatre notes en français : 12 ; 15 ; 9 ; 16.',
      questions: [
        { texte: 'Quelle est sa moyenne ?', attendu: 13 },
        { texte: 'Elle obtient une cinquième note, 8. Quelle est la moyenne de ses cinq notes ?', attendu: 12 },
      ],
    },
    {
      id: 'p-8-1-2',
      enonce:
        'Dans une boulangerie, 12 clients ont dépensé 15 euros chacun et 8 clients '
        + 'ont dépensé 25 euros chacun.',
      questions: [
        { texte: 'Combien ces 20 clients ont-ils dépensé en tout ?', attendu: 380, unite: '€' },
        { texte: 'Quelle est la dépense moyenne d\'un client ?', attendu: 19, unite: '€' },
      ],
    },
    {
      id: 'p-8-1-3',
      enonce: 'Un cycliste roule 3 heures à 30 km/h, puis 2 heures à 20 km/h.',
      questions: [
        { texte: 'Quelle distance parcourt-il en tout ?', attendu: 130, unite: 'km' },
        { texte: 'Quelle est sa vitesse moyenne sur les 5 heures ?', attendu: 26, unite: 'km/h' },
      ],
    },
    {
      id: 'p-8-1-4',
      enonce:
        'Dans un club de natation, les 18 nageurs du groupe A ont obtenu 24 points '
        + 'de moyenne au test, et les 6 nageurs du groupe B en ont obtenu 32.',
      questions: [
        { texte: 'Combien de points le club totalise-t-il ?', attendu: 624, unite: 'points' },
        { texte: 'Quelle est la moyenne du club entier ?', attendu: 26, unite: 'points' },
      ],
    },
    {
      id: 'p-8-1-5',
      enonce:
        'Dans une famille de quatre enfants, la moyenne d\'âge est 9 ans. Trois '
        + 'd\'entre eux ont 5 ans, 8 ans et 12 ans.',
      questions: [
        { texte: 'Quel est le total des quatre âges ?', attendu: 36, unite: 'ans' },
        { texte: 'Quel âge a le quatrième enfant ?', attendu: 11, unite: 'ans' },
      ],
    },
  ],

  test: [
    {
      id: 't-8-1-1', type: 'calcul', consigne: 'Calcule la moyenne de cette série.',
      enonce: '6 \\text{ ; } 11 \\text{ ; } 4 \\text{ ; } 15', attendu: 9, revoir: 'definition',
    },
    {
      id: 't-8-1-2', type: 'calcul', consigne: 'Calcule cette moyenne.',
      enonce: '\\dfrac{6 \\times 10 + 4 \\times 15}{10}', attendu: 12,
      fausses: [{ valeur: 12.5, piege: 'moyenne-des-moyennes' }],
      revoir: 'propriete',
    },
    {
      id: 't-8-1-3', type: 'calcul', consigne: 'Calcule cette moyenne.',
      enonce: '\\dfrac{35 \\times 8 + 15 \\times 12}{50}', attendu: 9.2,
      fausses: [{ valeur: 10, piege: 'moyenne-des-moyennes' }],
      revoir: 'propriete',
    },
    {
      id: 't-8-1-4', type: 'calcul',
      consigne:
        '21 élèves ont 13 de moyenne et 9 élèves en ont 8. Calcule la moyenne des '
        + '30 élèves réunis.',
      enonce: '\\text{21 élèves à } 13 \\qquad \\text{9 élèves à } 8', attendu: 11.5,
      fausses: [{ valeur: 10.5, piege: 'moyenne-des-moyennes' }],
      revoir: 'remarque',
    },
    {
      id: 't-8-1-5', type: 'calcul',
      consigne:
        'Deux groupes de 12 personnes : le premier a 14 de moyenne, le second 18. '
        + 'Calcule la moyenne des 24 personnes.',
      enonce: '\\text{12 personnes à } 14 \\qquad \\text{12 personnes à } 18', attendu: 16,
      revoir: 'remarque',
    },
    {
      id: 't-8-1-6', type: 'trous', consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\dfrac{5 \\times 8 + 3 \\times \\square}{8} = 11',
      champs: [{ id: 'a', attendu: 16 }],
      revoir: 'propriete',
    },
    {
      id: 't-8-1-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{40 \\times 6 + 10 \\times 16}{50} = 11', attendu: false,
      explication:
        'Le haut de la fraction vaut 240 + 160 = 400, et 400 ÷ 50 = **8**, pas 11. '
        + 'Le 11 proposé, c\'est (6 + 16) ÷ 2 : le groupe de 40 est quatre fois plus '
        + 'nombreux que l\'autre, la moyenne doit donc rester très près de 6.',
      piege: 'moyenne-des-moyennes', revoir: 'remarque',
    },
    {
      id: 't-8-1-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{20 \\times 7 + 5 \\times 12}{25} = 8', attendu: true,
      explication:
        'Le calcul est juste : 140 + 60 = 200, et 200 ÷ 25 = 8. Le résultat est bien '
        + 'entre 7 et 12, et tout près de 7 puisque le groupe de 20 domine largement.',
      revoir: 'propriete',
    },
    {
      id: 't-8-1-9', type: 'calcul', consigne: 'Calcule la moyenne de cette série.',
      enonce: '12{,}5 \\text{ ; } 9 \\text{ ; } 14{,}5', attendu: 12, revoir: 'definition',
    },
    {
      id: 't-8-1-10', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{16 \\times 5 + 4 \\times 15}{20}',
      lignes: [
        { texte: '16 × 5 + 4 × 15 = 80 + 60 = 140', fausse: false },
        { texte: '= 140 ÷ 2 = 70', fausse: true },
        { texte: 'La moyenne vaut donc 70.', fausse: false },
      ],
      explication:
        'La première ligne est juste : 140 au total. La deuxième divise par 2 au '
        + 'lieu de 20 — on divise toujours par l\'**effectif total**, ici 16 + 4 = 20. '
        + 'La moyenne vaut 140 ÷ 20 = 7. Et 70 sortait complètement de la série, dont '
        + 'toutes les valeurs sont 5 ou 15.',
      piege: 'moyenne-des-moyennes', revoir: 'remarque',
    },
  ],
};
