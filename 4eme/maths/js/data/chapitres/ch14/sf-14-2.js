// Chapitre 14, savoir-faire 2 — Représenter graphiquement une dépendance.
//
// ── Le problème de conception, d’abord ────────────────────────────────────
//
// « Représenter », dans un manuel, c’est tracer. Or l’élève ne peut rien
// tracer ici : il n’y a ni règle, ni papier millimétré, ni surface de dessin.
// La tentation serait de remplacer le savoir-faire par de la lecture de
// graphique — mais lire est un autre geste, et il a son propre savoir-faire.
//
// On garde donc le geste et on change ce qui le rend visible : placer un point,
// c’est CALCULER ses deux coordonnées, et c’est là que tout se joue. L’élève
// produit les couples (abscisse ; ordonnée), juge des tracés proposés, et
// repère le point qui manque. Ce qu’il n’a pas à faire, c’est tenir le crayon —
// et le crayon n’est pas le savoir-faire.
//
// ── Pourquoi le point d’abscisse 0 revient partout ────────────────────────
//
// Le point dur du chapitre tient en une phrase : une dépendance affine donne
// une droite qui NE passe PAS par l’origine. C’est le seul critère qui sépare
// « proportionnel » de « pas proportionnel » quand les deux tracés sont des
// droites, et c’est celui que l’élève ne regarde jamais — il voit une droite,
// il conclut proportionnalité, il pose un produit en croix.
//
// Le point d’abscisse 0 est donc l’objet central : la découverte le fait
// calculer, le cours en fait le test, la méthode le calcule en premier, et six
// exercices sur dix le mettent en jeu. C’est aussi, accessoirement, le geste
// de contrôle de la part fixe : à n = 0, la formule doit rendre exactement
// l’abonnement.
//
// ── Trois items neutres, et ce qu’ils bloquent chacun ─────────────────────
//
// e-14-2-1 : aucune part fixe dans l’énoncé. Un élève qui multiplie l’abonnement
// n’a rien à multiplier, et réussit. Sans lui, « il y a deux nombres, donc j’en
// multiplie un et j’ajoute l’autre » deviendrait la règle.
//
// e-14-2-4 et e-14-2-6 : des situations VRAIMENT proportionnelles. Un élève qui
// suppose la proportionnalité partout y répond juste. Sans eux, l’entraînement
// installerait l’erreur symétrique — « quand on me parle de graphique, ce n’est
// jamais proportionnel » — qui coûte aussi cher, et qui est plus difficile à
// déloger parce qu’elle marche souvent.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Il ne fait pas lire de valeur sur un tracé donné (savoir-faire de lecture),
// il ne fait pas écrire de formule littérale pour elle-même (savoir-faire
// d’écriture), et il ne parle jamais d’image ni d’antécédent : le programme de
// 4e interdit la notation fonctionnelle, et deux grandeurs dont l’une dépend de
// l’autre suffisent à tout dire ici.

export default {
  id: 'sf-14-2',
  titre: 'Représenter graphiquement une dépendance',
  attendus: [
    'Il représente graphiquement la dépendance de deux grandeurs en calculant les coordonnées des points à placer.',
    'Il reconnaît, sur un tracé, une situation de proportionnalité et une situation qui ne l’est pas.',
  ],

  // On ne dit pas « une droite qui ne passe pas par l’origine n’est pas
  // proportionnelle » : on met deux clubs côte à côte, on fait calculer les
  // deux extrémités du second tracé, et c’est l’élève qui trouve 12 € là où il
  // attendait 0. Le graphique du club A est affiché pour que la comparaison
  // ait un point d’appui visible ; celui du club B reste à calculer.
  decouvrir: {
    titre: 'Deux clubs, deux droites, un seul départ à zéro',
    texte:
      'Le club A fait payer 3 € la séance, et rien d’autre. Le club B demande '
      + '12 € d’inscription à l’année, puis 3 € la séance lui aussi. Voici ce '
      + 'que coûtent deux séances, puis quatre, dans chacun des deux clubs.',
    graphique: {
      titre: 'Le prix du club A selon le nombre de séances',
      x: { titre: 'Nombre de séances', min: 0, max: 10, pas: 1 },
      y: { titre: 'Prix (€)', min: 0, max: 45, pas: 5 },
      points: [[0, 0], [10, 30]],
      relie: true,
    },
    lignes: [
      { calcul: 'club A, 2 séances', resultat: '6 €' },
      { calcul: 'club A, 4 séances', resultat: '12 €' },
      { calcul: 'club B, 2 séances', resultat: '18 €' },
      { calcul: 'club B, 4 séances', resultat: '24 €' },
    ],
    question:
      'Le tracé du club B est une droite lui aussi, et il tiendrait sur le '
      + 'même graphique. Calcule ses deux extrémités : le prix du club B pour '
      + '0 séance, puis pour 10 séances.',
    champs: [
      { id: 'a', etiquette: 'prix du club B pour 0 séance, en €', attendu: 12 },
      { id: 'b', etiquette: 'prix du club B pour 10 séances, en €', attendu: 42 },
    ],
    conclusion:
      'Le tracé du club A part de **(0 ; 0)** : sans séance, on ne paie rien. '
      + 'Et doubler les séances y double le prix — 6 € pour deux, 12 € pour quatre.\n'
      + 'Le tracé du club B part de **(0 ; 12)** : l’inscription se paie même '
      + 'sans venir une seule fois. Il monte jusqu’à **(10 ; 42)**, et c’est une '
      + 'droite lui aussi — mais une droite qui ne passe **pas** par l’origine.\n'
      + 'Conséquence : doubler les séances n’y double pas le prix. De 2 à 4 '
      + 'séances, on passe de 18 € à 24 €, pas à 36 €.\n'
      + 'Représenter une dépendance, c’est calculer les coordonnées de quelques '
      + 'points, puis les placer. Et le point le plus utile est celui de '
      + '**zéro** : c’est lui qui dit si la situation est proportionnelle.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Représenter une dépendance',
      texte:
        'Deux grandeurs sont liées quand la valeur de l’une décide de celle de '
        + 'l’autre : le prix payé dépend du nombre de séances, la hauteur d’une '
        + 'bougie dépend de la durée pendant laquelle elle brûle.\n'
        + '**Représenter** cette dépendance, c’est placer des points dans un '
        + 'repère : la grandeur dont l’autre dépend sur l’axe **horizontal** '
        + '(l’abscisse), la grandeur qui dépend sur l’axe **vertical** (l’ordonnée).\n'
        + 'Un mot de l’énoncé le décide : « le prix **selon** le nombre de '
        + 'séances » met le nombre de séances en abscisse, et le prix en ordonnée.',
    },
    {
      type: 'propriete',
      titre: 'Ce que le point de départ dit de la situation',
      texte:
        'Quand les points sont alignés, le tracé est une droite. Deux cas très '
        + 'différents se cachent là, et un seul point les sépare : celui d’abscisse 0.\n'
        + 'Si la droite passe par l’**origine**, le point (0 ; 0), les deux '
        + 'grandeurs sont **proportionnelles** : doubler la première double la seconde.\n'
        + 'Si la droite ne passe **pas** par l’origine, les deux grandeurs ne sont '
        + '**pas** proportionnelles, même si le tracé est parfaitement droit. '
        + 'Doubler la première ne double alors pas la seconde, et aucun produit '
        + 'en croix n’est permis.',
    },
    {
      type: 'remarque',
      titre: 'Placer un point, c’est calculer deux nombres',
      texte:
        'On ne place jamais un point au jugé. Pour chaque valeur choisie de la '
        + 'première grandeur, on calcule la seconde ; le couple obtenu donne les '
        + 'deux coordonnées, **abscisse d’abord, ordonnée ensuite**.\n'
        + 'Une droite est entièrement décidée par **deux** points. On prend en '
        + 'général le plus à gauche et le plus à droite de ce qu’on étudie, puis '
        + 'on se contrôle avec un troisième, pris au milieu.',
    },
    {
      type: 'remarque',
      titre: 'La part fixe ne se multiplie pas',
      texte:
        '« 15 € d’inscription, puis 2 € par séance » donne prix = 2 × n + 15 : '
        + 'seul le prix d’une séance se multiplie, l’inscription se paie une fois.\n'
        + 'Le test qui tranche : prends **n = 0**. La formule doit rendre '
        + 'exactement la part fixe, ici 15 €. C’est aussi l’ordonnée du tout '
        + 'premier point du tracé.',
    },
    {
      type: 'exemple',
      texte:
        'Un taxi demande 4 € de prise en charge, puis 2 € par kilomètre. On '
        + 'représente le prix selon la distance parcourue.\n'
        + 'À 0 km : 4 €, donc le point (0 ; 4). À 7 km : 4 + 2 × 7 = 18 €, donc '
        + 'le point (7 ; 18).\n'
        + 'Ces deux points suffisent à tracer la droite. Elle ne passe pas par '
        + 'l’origine : le prix n’est pas proportionnel à la distance.',
    },
    {
      type: 'exemple',
      texte:
        'Un tissu coûte 6 € le mètre, sans aucun autre frais. On représente le '
        + 'prix selon la longueur achetée.\n'
        + 'À 0 m : 0 €, donc le point (0 ; 0). À 5 m : 6 × 5 = 30 €, donc le '
        + 'point (5 ; 30).\n'
        + 'Le tracé part de l’origine : cette fois, les deux grandeurs sont bien '
        + 'proportionnelles.',
    },
  ],

  methode: {
    titre: 'Trouver les points à placer',
    enonce:
      'Une salle d’escalade demande 20 € d’inscription, puis 5 € par séance. On '
      + 'veut représenter le prix payé selon le nombre de séances, de 0 à 8 '
      + 'séances. Quels points faut-il placer ?',
    etapes: [
      {
        texte:
          'Je repère laquelle des deux grandeurs dépend de l’autre : le prix '
          + 'dépend du nombre de séances. Le nombre de séances va donc en '
          + 'abscisse, sur l’axe horizontal, et le prix en ordonnée.',
        note: 'C’est ce que dit le mot « selon » : ce qui le suit va en abscisse.',
      },
      {
        texte: 'J’écris la formule : prix = 5 × n + 20, où n est le nombre de séances.',
        note: 'Seul le prix d’une séance se multiplie. L’inscription se paie une fois.',
      },
      {
        texte: 'Point le plus à gauche, n = 0 : prix = 5 × 0 + 20 = 20 €. C’est le point (0 ; 20).',
        note: 'À zéro séance on paie déjà l’inscription : le tracé ne part pas de (0 ; 0).',
      },
      {
        texte: 'Point le plus à droite, n = 8 : prix = 5 × 8 + 20 = 60 €. C’est le point (8 ; 60).',
        note: 'Deux points suffisent à décider une droite.',
      },
      {
        texte:
          'Je place (0 ; 20) et (8 ; 60), je trace la droite qui les relie. Elle '
          + 'ne passe pas par l’origine : la situation n’est pas proportionnelle.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : prends une valeur du milieu et vérifie qu’elle tombe sur la '
      + 'droite. Pour n = 4, la formule donne 5 × 4 + 20 = 40, donc le point '
      + '(4 ; 40) — exactement à mi-hauteur entre 20 et 60, comme 4 est à '
      + 'mi-chemin entre 0 et 8. Si ton troisième point tombe à côté, c’est la '
      + 'formule qu’il faut reprendre. Et méfie-toi du réflexe du produit en '
      + 'croix : 8 séances coûtent 60 €, pas le double des 40 € de 4 séances.',
  },

  entrainement: [
    // ── Palier 1 : calculer les coordonnées d’un point à placer ─────────────
    {
      // NEUTRE. Aucune part fixe : l’élève qui multiplie l’abonnement n’a rien
      // à multiplier et tombe juste. Sans cet item, « deux nombres dans
      // l’énoncé, donc j’en multiplie un et j’ajoute l’autre » traverserait
      // tout le palier sans jamais être mis en défaut.
      id: 'e-14-2-1', type: 'trous', palier: 1, neutre: true, piege: 'part-fixe-multipliee',
      consigne:
        'Un ruban coûte 4 € le mètre, sans aucun autre frais. On représente le '
        + 'prix selon la longueur achetée. Donne les coordonnées du point qui '
        + 'correspond à 7 mètres.',
      enonce: '\\text{prix d’un mètre : 4 € ; longueur achetée : 7 m}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point', attendu: 7 },
        { id: 'b', etiquette: 'ordonnée du point', attendu: 28 },
      ],
      fausses: [
        // 28 en abscisse : le prix a été placé sur l’axe horizontal. Aucun
        // repère n’est dessiné ici, donc rien à lire le long d’un axe — c’est
        // la consigne qui décide, avec « le prix SELON la longueur » : ce qui
        // suit « selon » va en abscisse.
        { valeur: 28, piege: 'axes-echanges' },
      ],
    },
    {
      id: 'e-14-2-2', type: 'trous', palier: 1, piege: 'part-fixe-multipliee',
      consigne:
        'Une salle de sport demande 25 € d’inscription, puis 4 € par séance. On '
        + 'représente le prix payé selon le nombre de séances. Donne les '
        + 'coordonnées du point qui correspond à 6 séances.',
      enonce: '\\text{inscription : 25 € ; prix d’une séance : 4 € ; nombre de séances : 6}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point', attendu: 6 },
        { id: 'b', etiquette: 'ordonnée du point', attendu: 49 },
      ],
      fausses: [
        // 25 × 6 + 4 : l’inscription a été multipliée. À n = 0 cette formule
        // rendrait 4 €, alors qu’on paie 25 € sans venir une seule fois.
        { valeur: 154, piege: 'part-fixe-multipliee' },
        // 4 × 6 : l’inscription est passée à la trappe, donc le tracé est
        // supposé partir de (0 ; 0). Il part de (0 ; 25).
        { valeur: 24, piege: 'proportionnalite-supposee' },
      ],
    },
    {
      id: 'e-14-2-3', type: 'trous', palier: 1, piege: 'proportionnalite-supposee',
      consigne:
        'Un bassin contient déjà 30 litres d’eau. On ouvre un robinet qui verse '
        + '8 litres par minute. On représente le volume d’eau du bassin selon la '
        + 'durée d’écoulement. Donne les coordonnées du point qui correspond à '
        + '5 minutes.',
      enonce: '\\text{volume de départ : 30 L ; débit : 8 L par minute ; durée : 5 min}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point, en minutes', attendu: 5 },
        { id: 'b', etiquette: 'ordonnée du point, en litres', attendu: 70 },
      ],
      fausses: [
        // 8 × 5 : les 30 L déjà présents sont ignorés, donc la dépendance est
        // traitée comme proportionnelle. Or à 0 minute le bassin contient déjà
        // 30 L : le tracé part de (0 ; 30), pas de l’origine.
        { valeur: 40, piege: 'proportionnalite-supposee' },
        // 30 × 5 + 8 : le volume de départ a été multiplié par la durée.
        { valeur: 158, piege: 'part-fixe-multipliee' },
      ],
    },
    {
      // NEUTRE. Ici la situation est vraiment proportionnelle : l’élève qui
      // suppose la proportionnalité partout répond juste. C’est ce qui empêche
      // « on me parle de graphique, donc il y a une part fixe cachée » de
      // devenir la stratégie gagnante du palier.
      id: 'e-14-2-4', type: 'trous', palier: 1, neutre: true, piege: 'proportionnalite-supposee',
      consigne:
        'Un cycliste roule à allure régulière, à 15 km par heure. On représente '
        + 'la distance parcourue selon la durée du trajet. Donne les coordonnées '
        + 'du point qui correspond à 3 heures.',
      enonce: '\\text{vitesse : 15 km par heure ; durée : 3 h}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point, en heures', attendu: 3 },
        { id: 'b', etiquette: 'ordonnée du point, en km', attendu: 45 },
      ],
      fausses: [
        // 45 en abscisse : la distance a pris la place de la durée. Là non plus
        // aucun repère n’est dessiné : c’est « la distance parcourue SELON la
        // durée » de la consigne qui met la durée en abscisse.
        { valeur: 45, piege: 'axes-echanges' },
      ],
    },

    // ── Palier 2 : juger un tracé qu’on n’a pas produit ─────────────────────
    {
      id: 'e-14-2-5', type: 'vraifaux', palier: 2, piege: 'proportionnalite-supposee',
      consigne:
        'Un club demande 10 € d’inscription, puis 3 € par séance. Le graphique '
        + 'ci-dessous représente le prix payé selon le nombre de séances. Vrai ou '
        + 'faux ? Si c’est faux, donne un contre-exemple.',
      graphique: {
        titre: 'Le prix payé selon le nombre de séances',
        x: { titre: 'Nombre de séances', min: 0, max: 10, pas: 1 },
        y: { titre: 'Prix (€)', min: 0, max: 40, pas: 5 },
        points: [[0, 10], [10, 40]],
        relie: true,
      },
      affirmation: 'Le tracé est une droite, donc le prix et le nombre de séances sont proportionnels.',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'proportionnalite-supposee' },
      ],
      contreExemple: {
        // Le contre-exemple ne demande pas de réciter le critère : il demande le
        // prix d’UNE valeur, celle de zéro. Un seul nombre calculé suffit à
        // exhiber le point (0 ; 10), qui n’est pas l’origine — et c’est
        // exactement le geste de contrôle du piège.
        invite:
          'Le club demande 10 € d’inscription, puis 3 € par séance. Donne le '
          + 'prix payé par quelqu’un qui s’inscrit et ne vient à aucune séance.',
        champs: [{ id: 'a', etiquette: 'prix pour 0 séance, en €' }],
        valide: (a) => Math.abs(a - 10) < 1e-9,
        temoin: [10],
        exemple:
          'À 0 séance, on paie déjà les 10 € d’inscription : le tracé passe par '
          + 'le point (0 ; 10). Dans une situation proportionnelle, une quantité '
          + 'nulle donne toujours une valeur nulle — le tracé devrait passer par '
          + '(0 ; 0). Ce n’est pas le cas, donc les deux grandeurs ne sont pas '
          + 'proportionnelles, malgré la droite.',
      },
    },
    {
      // NEUTRE, et le plus important des trois : ici l’affirmation est VRAIE et
      // la situation vraiment proportionnelle. Sans lui, deux stratégies de
      // surface passeraient — « on me demande de juger, donc c’est faux » et
      // « une droite, ce n’est jamais proportionnel ».
      id: 'e-14-2-6', type: 'vraifaux', palier: 2, neutre: true, piege: 'proportionnalite-supposee',
      consigne:
        'Des cerises sont vendues 4 € le kilogramme, sans aucun autre frais. Le '
        + 'graphique ci-dessous représente le prix selon la masse achetée. Vrai '
        + 'ou faux ?',
      graphique: {
        titre: 'Le prix selon la masse achetée',
        x: { titre: 'Masse (kg)', min: 0, max: 9, pas: 1 },
        y: { titre: 'Prix (€)', min: 0, max: 40, pas: 5 },
        points: [[0, 0], [9, 36]],
        relie: true,
      },
      affirmation: 'Le prix et la masse achetée sont deux grandeurs proportionnelles.',
      attendu: true,
      fausses: [],
    },
    {
      id: 'e-14-2-7', type: 'plausible', palier: 2, piege: 'part-fixe-multipliee',
      consigne: 'Ce placement de points est-il plausible ?',
      enonce:
        '\\text{Un magasin vend des cahiers 2 € pièce et facture 3 € de livraison par commande.} '
        + '\\quad \\text{Pour représenter le prix selon le nombre de cahiers, on placerait les points (0 ; 3) et (5 ; 13).}',
      attendu: true,
      fausses: [
        // Refuser ce placement, c’est avoir calculé 3 × n + 2 : la livraison a
        // été multipliée. Le point (0 ; 3) rend justement la part fixe à
        // l’identique — c’est le contrôle du piège, et il valide le tracé.
        { valeur: false, piege: 'part-fixe-multipliee' },
      ],
      explication:
        'Les deux points tiennent. Sans cahier, on paie les 3 € de livraison : '
        + 'le point (0 ; 3) est correct. Pour 5 cahiers, 3 + 2 × 5 = 13 € : le '
        + 'point (5 ; 13) l’est aussi. Seul le prix d’un cahier se multiplie ; '
        + 'la livraison se paie une fois, quel que soit le nombre de cahiers.',
    },

    // ── Palier 3 : relire un raisonnement, et le réfuter par un nombre ──────
    {
      // La part fixe ne s’annonce PAS ici avec un « par » : « 9 € par mois »
      // aurait fait du 9 un tarif à multiplier, et le raisonnement du piège
      // — « le nombre qui multiplie est celui qu’on annonce par quelque
      // chose » — aurait alors validé l’erreur au lieu de la réfuter. On dit
      // donc « 9 € le mois, quelle que soit la consommation », et on nomme la
      // dépendance représentée, sans quoi la période du calcul reste ouverte.
      id: 'e-14-2-8', type: 'corriger', palier: 3, piege: 'part-fixe-multipliee',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Un forfait de téléphone coûte 9 € le mois, quelle que soit la consommation. '
        + 'Chaque gigaoctet consommé en plus est facturé 3 €.} '
        + '\\quad \\text{On représente le prix d’un mois selon le nombre de gigaoctets en plus. '
        + 'Quel point placer pour 4 gigaoctets ?}',
      lignes: [
        { texte: 'Le prix dépend du nombre de gigaoctets : l’abscisse du point est donc 4.', fausse: false },
        { texte: 'Le prix du mois vaut 9 × 4 + 3, soit 39 €.', fausse: true },
        { texte: 'Le point à placer est donc (4 ; 39).', fausse: false },
      ],
      explication:
        'La première ligne est juste : le prix dépend de la consommation, donc '
        + 'les gigaoctets vont en abscisse. La troisième ne fait que recopier le '
        + 'nombre de la deuxième. C’est la deuxième qui casse tout : elle '
        + 'multiplie le prix du forfait, qui se paie une seule fois. Le test le montre '
        + 'd’un coup — avec 0 gigaoctet, cette formule donnerait 3 €, alors qu’on '
        + 'paie 9 €. Le bon calcul est 3 × 4 + 9 = 21 €, et le point à placer est '
        + '(4 ; 21).',
    },
    {
      id: 'e-14-2-9', type: 'plausible', palier: 3, piege: 'proportionnalite-supposee',
      consigne: 'Ce placement de points est-il plausible ?',
      enonce:
        '\\text{Un club demande 14 € d’inscription, puis 5 € par séance.} '
        + '\\quad \\text{On placerait le point (4 ; 34) pour 4 séances, et le point (8 ; 68) pour 8 séances.}',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'proportionnalite-supposee' },
      ],
      explication:
        'Le premier point est bon : 14 + 5 × 4 = 34. Le second ne l’est pas. On '
        + 'a doublé le prix en même temps que le nombre de séances, comme si la '
        + 'situation était proportionnelle — mais le tracé part de (0 ; 14), pas '
        + 'de l’origine. Pour 8 séances, 14 + 5 × 8 = 54 € : le point est '
        + '(8 ; 54). Les 14 € d’inscription ne se paient pas deux fois.',
    },
    {
      id: 'e-14-2-10', type: 'vraifaux', palier: 3, piege: 'proportionnalite-supposee',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Si les points d’une dépendance sont alignés sur une droite, alors les deux grandeurs sont proportionnelles.',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'proportionnalite-supposee' },
      ],
      contreExemple: {
        // On ne fait pas décrire un contre-exemple, on le fait CALCULER : deux
        // prix, dont le second devrait être le double du premier si
        // l’affirmation tenait. Il ne l’est pas, et c’est l’élève qui le
        // constate sur ses propres nombres.
        invite:
          'Prends cette situation : un club demande 10 € d’inscription, puis 4 € '
          + 'par séance — ses points sont bien alignés sur une droite. Donne le '
          + 'prix pour 3 séances, puis le prix pour 6 séances.',
        champs: [
          { id: 'a', etiquette: 'prix pour 3 séances, en €' },
          { id: 'b', etiquette: 'prix pour 6 séances, en €' },
        ],
        valide: (a, b) => Math.abs(a - 22) < 1e-9 && Math.abs(b - 34) < 1e-9,
        temoin: [22, 34],
        exemple:
          'Pour 3 séances : 10 + 4 × 3 = 22 €. Pour 6 séances : 10 + 4 × 6 = 34 €. '
          + 'Le nombre de séances a doublé, mais le prix n’a pas doublé — le '
          + 'double de 22 serait 44, pas 34. Les points sont pourtant parfaitement '
          + 'alignés : la droite passe par (0 ; 10), et c’est ce point-là qui '
          + 'interdit la proportionnalité.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-14-2-1',
      enonce:
        'Un club de tir à l’arc demande 18 € d’inscription à l’année, puis 4 € '
        + 'par séance. Kenzo veut représenter le prix payé selon le nombre de '
        + 'séances, de 0 à 10 séances.',
      questions: [
        { texte: 'Quelle est l’ordonnée du point qui correspond à 0 séance ?', attendu: 18, unite: '€' },
        { texte: 'Quelle est l’ordonnée du point qui correspond à 10 séances ?', attendu: 58, unite: '€' },
        { texte: 'Un point du tracé a pour ordonnée 42. Quelle est son abscisse ?', attendu: 6, unite: 'séances' },
      ],
    },
    {
      // Le seul problème avec un tracé affiché : il sert à prolonger une droite
      // au-delà de ce qui est dessiné, ce qu’aucun tableau de valeurs ne permet.
      id: 'p-14-2-2',
      enonce:
        'Une course de taxi coûte 5 € de prise en charge, puis 4 € par '
        + 'kilomètre. Le graphique ci-dessous représente le prix selon la '
        + 'distance parcourue. Il s’arrête à 8 km, mais une course peut aller '
        + 'plus loin.',
      graphique: {
        titre: 'Le prix d’une course selon la distance',
        x: { titre: 'Distance (km)', min: 0, max: 8, pas: 1 },
        y: { titre: 'Prix (€)', min: 0, max: 40, pas: 5 },
        points: [[0, 5], [8, 37]],
        relie: true,
      },
      questions: [
        { texte: 'Quelle est l’ordonnée du point qui correspond à 0 km ?', attendu: 5, unite: '€' },
        { texte: 'Quelle serait l’ordonnée du point qui correspond à 12 km ?', attendu: 53, unite: '€' },
        { texte: 'Une course a coûté 45 €. Quelle est l’abscisse de son point ?', attendu: 10, unite: 'km' },
      ],
    },
    {
      id: 'p-14-2-3',
      enonce:
        'Un premier fleuriste vend les roses 3 € pièce, sans frais de livraison. '
        + 'Un second les vend 2 € pièce, mais facture 8 € de livraison par '
        + 'commande. On représente le prix payé selon le nombre de roses, chez '
        + 'l’un et chez l’autre.',
      questions: [
        { texte: 'Chez le premier fleuriste, quelle est l’ordonnée du point qui correspond à 6 roses ?', attendu: 18, unite: '€' },
        { texte: 'Chez le second fleuriste, quelle est l’ordonnée du point qui correspond à 6 roses ?', attendu: 20, unite: '€' },
        { texte: 'Pour combien de roses les deux tracés se croisent-ils ?', attendu: 8, unite: 'roses' },
      ],
    },
    {
      id: 'p-14-2-4',
      enonce:
        'Une bougie mesure 20 cm avant d’être allumée. En brûlant, elle perd '
        + '2,5 cm par heure. On représente la hauteur qui reste selon la durée '
        + 'pendant laquelle elle a brûlé.',
      questions: [
        { texte: 'Quelle est l’ordonnée du point qui correspond à 0 heure ?', attendu: 20, unite: 'cm' },
        { texte: 'Quelle est l’ordonnée du point qui correspond à 6 heures ?', attendu: 5, unite: 'cm' },
        { texte: 'À quelle abscisse le tracé atteint-il l’axe horizontal, c’est-à-dire une hauteur nulle ?', attendu: 8, unite: 'heures' },
      ],
    },
    {
      id: 'p-14-2-5',
      enonce:
        'Sur une ligne de train, un trajet coûte 20 € sans abonnement. Avec '
        + 'l’abonnement, qui coûte 60 € à l’année, chaque trajet ne coûte plus '
        + 'que 12 €. On représente, dans chacun des deux cas, la dépense totale '
        + 'de l’année selon le nombre de trajets faits.',
      questions: [
        { texte: 'Avec l’abonnement, quelle est l’ordonnée du point qui correspond à 5 trajets ?', attendu: 120, unite: '€' },
        { texte: 'Sans abonnement, quelle est l’ordonnée du point qui correspond à 5 trajets ?', attendu: 100, unite: '€' },
        { texte: 'À partir de combien de trajets l’abonnement revient-il moins cher ?', attendu: 8, unite: 'trajets' },
      ],
    },
  ],

  test: [
    {
      id: 't-14-2-1', type: 'trous',
      consigne:
        'Un traiteur facture 7 € par personne, sans aucun autre frais. On '
        + 'représente le prix selon le nombre de personnes. Donne les coordonnées '
        + 'du point qui correspond à 8 personnes.',
      enonce: '\\text{prix par personne : 7 € ; nombre de personnes : 8}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point', attendu: 8 },
        { id: 'b', etiquette: 'ordonnée du point', attendu: 56 },
      ],
      fausses: [{ valeur: 56, piege: 'axes-echanges' }],
      revoir: 'definition',
    },
    {
      // 35 € et non 30 : avec 30 €, l’erreur « inscription oubliée » vaudrait
      // 6 × 5 = 30, exactement le nombre imprimé dans l’énoncé. On ne saurait
      // plus si l’élève a ignoré la part fixe ou s’il l’a recopiée — deux
      // gestes différents sous un seul piège. Avec 35 €, 30 ne peut venir que
      // du produit.
      id: 't-14-2-2', type: 'trous',
      consigne:
        'Un club de danse demande 35 € d’inscription, puis 6 € par cours. On '
        + 'représente le prix payé selon le nombre de cours. Donne les '
        + 'coordonnées du point qui correspond à 5 cours.',
      enonce: '\\text{inscription : 35 € ; prix d’un cours : 6 € ; nombre de cours : 5}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point', attendu: 5 },
        { id: 'b', etiquette: 'ordonnée du point', attendu: 65 },
      ],
      fausses: [
        // 35 × 5 + 6 : l’inscription a été multipliée.
        { valeur: 181, piege: 'part-fixe-multipliee' },
        // 6 × 5 : l’inscription est passée à la trappe.
        { valeur: 30, piege: 'proportionnalite-supposee' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-14-2-3', type: 'plausible',
      consigne: 'Ce placement de points est-il plausible ?',
      enonce:
        '\\text{Un magasin loue un vélo 9 € la journée et facture 4 € de dossier par location.} '
        + '\\quad \\text{Pour représenter le prix selon le nombre de journées, on placerait les points (0 ; 4) et (3 ; 31).}',
      attendu: true,
      explication:
        'Les deux points tiennent. Sans journée de location, il reste les 4 € de '
        + 'dossier : le point (0 ; 4) est correct. Pour 3 journées, '
        + '4 + 9 × 3 = 31 € : le point (3 ; 31) l’est aussi.',
      fausses: [{ valeur: false, piege: 'part-fixe-multipliee' }],
      revoir: 'exemple',
    },
    {
      id: 't-14-2-4', type: 'plausible',
      consigne: 'Ce placement de points est-il plausible ?',
      enonce:
        '\\text{Un club demande 16 € d’inscription, puis 5 € par séance.} '
        + '\\quad \\text{On placerait le point (3 ; 31) pour 3 séances, et le point (6 ; 62) pour 6 séances.}',
      attendu: false,
      explication:
        'Le premier point est bon : 16 + 5 × 3 = 31. Le second double le prix en '
        + 'même temps que le nombre de séances, comme dans une situation '
        + 'proportionnelle — or le tracé part de (0 ; 16). Pour 6 séances, '
        + '16 + 5 × 6 = 46 € : le point est (6 ; 46).',
      piege: 'proportionnalite-supposee', revoir: 'propriete',
    },
    {
      id: 't-14-2-5', type: 'vraifaux',
      consigne:
        'Des pommes sont vendues 6 € le kilogramme, sans aucun autre frais. Le '
        + 'graphique ci-dessous représente le prix selon la masse achetée. Vrai '
        + 'ou faux ?',
      graphique: {
        titre: 'Le prix selon la masse de pommes',
        x: { titre: 'Masse (kg)', min: 0, max: 7, pas: 1 },
        y: { titre: 'Prix (€)', min: 0, max: 45, pas: 5 },
        points: [[0, 0], [7, 42]],
        relie: true,
      },
      affirmation: 'Le prix et la masse achetée sont deux grandeurs proportionnelles.',
      attendu: true,
      revoir: 'propriete',
    },
    {
      id: 't-14-2-6', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{Un train roule à allure régulière, à 80 km par heure. On représente la distance parcourue selon la durée du trajet.} '
        + '\\quad \\text{Quel point placer pour 3 heures de trajet ?}',
      lignes: [
        { texte: 'La distance dépend de la durée : la durée va en abscisse, la distance en ordonnée.', fausse: false },
        { texte: 'En 3 heures, le train parcourt 80 × 3 = 240 km.', fausse: false },
        { texte: 'Le point à placer est donc (240 ; 3).', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, et la seconde calcule bien la '
        + 'distance. C’est la troisième qui échange les deux axes : la première '
        + 'ligne avait pourtant dit que la durée allait en abscisse. Le point à '
        + 'placer est (3 ; 240) — 3 sur l’axe du bas, 240 sur l’axe de gauche.',
      piege: 'axes-echanges', revoir: 'definition',
    },
    {
      id: 't-14-2-7', type: 'trous',
      consigne:
        'Un photographe facture 45 € de déplacement, puis 15 € par photo '
        + 'retouchée. On représente le prix selon le nombre de photos retouchées. '
        + 'Donne les coordonnées du point qui correspond à 4 photos.',
      enonce: '\\text{déplacement : 45 € ; prix d’une photo : 15 € ; nombre de photos : 4}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point', attendu: 4 },
        { id: 'b', etiquette: 'ordonnée du point', attendu: 105 },
      ],
      fausses: [
        { valeur: 195, piege: 'part-fixe-multipliee' },
        { valeur: 60, piege: 'proportionnalite-supposee' },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-14-2-8', type: 'calcul',
      consigne:
        'Un club demande 22 € d’inscription, puis 7 € par séance. On représente '
        + 'le prix payé selon le nombre de séances. Un point du tracé a pour '
        + 'abscisse 9 : quelle est son ordonnée, en euros ?',
      enonce: '\\text{inscription : 22 € ; prix d’une séance : 7 € ; abscisse du point : 9}',
      attendu: 85,
      fausses: [
        { valeur: 63, piege: 'proportionnalite-supposee' },
        { valeur: 205, piege: 'part-fixe-multipliee' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-14-2-9', type: 'calcul',
      consigne:
        'Un club demande 12 € d’inscription, puis 5 € par séance. Sur le tracé '
        + 'du prix selon le nombre de séances, un point a pour ordonnée 47 : '
        + 'quelle est son abscisse ?',
      enonce: '\\text{inscription : 12 € ; prix d’une séance : 5 € ; ordonnée du point : 47}',
      attendu: 7,
      fausses: [
        // 47 ÷ 5 : un produit en croix, donc une proportionnalité supposée. Le
        // tracé part de (0 ; 12) : le produit en croix n’a pas lieu d’être.
        { valeur: 9.4, piege: 'proportionnalite-supposee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-14-2-10', type: 'trous',
      consigne:
        'Une imprimerie facture 0,4 € par affiche, sans frais de commande. On '
        + 'représente le prix selon le nombre d’affiches. Donne les coordonnées '
        + 'du point qui correspond à 25 affiches.',
      enonce: '\\text{prix d’une affiche : 0,4 € ; nombre d’affiches : 25}',
      champs: [
        { id: 'a', etiquette: 'abscisse du point', attendu: 25 },
        { id: 'b', etiquette: 'ordonnée du point, en €', attendu: 10 },
      ],
      fausses: [{ valeur: 10, piege: 'axes-echanges' }],
      revoir: 'exemple',
    },
  ],
};
