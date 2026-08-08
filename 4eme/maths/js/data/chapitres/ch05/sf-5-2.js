// Savoir-faire 5-2 — Calculer une quatrième proportionnelle.
//
// Le programme laisse le choix de la procédure : coefficient, passage à
// l'unité, produit en croix. On ne cherche donc pas à imposer la « bonne »
// méthode — on installe le geste qui les précède toutes : on MULTIPLIE par un
// coefficient, on n'ajoute pas un écart.
//
// Le traitement additif n'est pas une étourderie : c'est un modèle cohérent,
// celui de l'écart constant, appliqué à une situation qui demande le rapport
// constant. On ne le corrige donc pas en répétant la règle, mais en le mettant
// en échec sur une valeur que l'élève accepte déjà — la moitié d'une recette.
// C'est tout le rôle de l'activité de découverte.
//
// Deux items neutres, pour deux motifs de surface différents : l'un où il n'y
// a rien à convertir, l'autre où une figure agrandie donne bien une grandeur
// proportionnelle. Le second compte double dans ce chapitre : l'illusion de
// linéarité résiste à l'enseignement, et la contre-règle « dès qu'on agrandit,
// ce n'est jamais proportionnel » serait aussi fausse qu'elle.

export default {
  id: 'sf-5-2',
  titre: 'Calculer une quatrième proportionnelle',
  attendus: [
    'Il calcule une quatrième proportionnelle par la procédure de son choix.',
    'Il résout des problèmes de proportionnalité en utilisant un coefficient, un passage à l\'unité ou un produit en croix.',
  ],

  // On ne dit pas laquelle des deux méthodes est la bonne : on les fait TESTER
  // sur une valeur que personne ne conteste — la moitié de la recette. Le
  // traitement additif s'y disqualifie tout seul, ce qu'aucune règle énoncée
  // d'avance n'aurait obtenu.
  decouvrir: {
    titre: 'Deux copies, une seule tient debout',
    texte:
      'Pour 8 crêpes, il faut 12 cL de lait. On cherche la quantité de lait pour '
      + '6 crêpes. Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: 'de 8 crêpes à 6 crêpes, on enlève 2 : donc 12 − 2', resultat: '10 cL' },
      { nom: 'Inès', calcul: 'de 8 crêpes à 12 cL, on multiplie par 1,5 : donc 6 × 1,5', resultat: '9 cL' },
    ],
    question:
      'Pour 4 crêpes, c\'est la moitié de la recette : tout le monde est d\'accord, '
      + 'il faut 6 cL. Applique chaque méthode à 4 crêpes et regarde laquelle '
      + 'retombe sur 6.',
    champs: [
      { id: 'a', etiquette: 'méthode de Sacha : 12 − 4 =', attendu: 8 },
      { id: 'b', etiquette: 'méthode d\'Inès : 4 × 1,5 =', attendu: 6 },
    ],
    conclusion:
      'Seule la méthode d\'Inès retombe sur les 6 cL que tout le monde accepte. '
      + 'En proportionnalité, on **multiplie par un coefficient**, on **n\'ajoute '
      + 'pas un écart** : de 8 à 12, on multiplie par 1,5 — on n\'ajoute pas 4.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Quatrième proportionnelle',
      texte:
        'Dans un tableau de proportionnalité, on connaît **trois** valeurs et on en '
        + 'cherche une **quatrième**. Cette valeur manquante s\'appelle la '
        + '**quatrième proportionnelle**.',
    },
    {
      type: 'propriete',
      titre: 'Le coefficient de proportionnalité',
      texte:
        'Dans une situation de proportionnalité, on passe d\'une grandeur à l\'autre '
        + 'en multipliant **toujours par le même nombre** : le **coefficient de '
        + 'proportionnalité**.\n'
        + 'On l\'obtient en divisant une valeur d\'arrivée par la valeur de départ qui '
        + 'lui correspond. Le **passage à l\'unité** revient au même : c\'est la valeur '
        + 'pour 1.',
    },
    {
      type: 'propriete',
      titre: 'Le produit en croix',
      texte:
        'Dans un tableau de proportionnalité à quatre cases — a et b sur la première '
        + 'ligne, c et d juste en dessous — les produits en croix sont égaux :\n'
        + 'a × d = b × c.\n'
        + 'On en tire la case manquante, par exemple d = (b × c) ÷ a.',
    },
    {
      type: 'remarque',
      titre: 'La question à se poser avant toute chose',
      texte:
        'Les trois procédures donnent le même résultat : prends celle qui tombe juste '
        + 'avec les nombres de l\'énoncé. Mais aucune ne vaut si la situation n\'est **pas '
        + 'proportionnelle** — c\'est donc la première chose à vérifier, avant d\'écrire '
        + 'quoi que ce soit.',
    },
    {
      type: 'exemple',
      texte:
        '5 stylos identiques coûtent 6 €. Pour 12 stylos :\n'
        + '· passage à l\'unité : 6 ÷ 5 = 1,20 € l\'unité, puis 12 × 1,20 = 14,40 €.\n'
        + '· produit en croix : (6 × 12) ÷ 5 = 72 ÷ 5 = 14,40 €.',
    },
  ],

  methode: {
    titre: 'Trouver la valeur manquante',
    enonce: '7 m de câble coûtent 21,70 €. Combien coûtent 12 m de ce même câble ?',
    etapes: [
      {
        texte: 'Le câble est vendu au mètre : le prix est proportionnel à la longueur.',
        note: 'La première question, toujours : est-ce proportionnel ?',
      },
      {
        texte: 'Je passe à l\'unité : 21,70 ÷ 7 = 3,10. Un mètre coûte 3,10 €.',
        note: 'Ce prix au mètre EST le coefficient.',
      },
      {
        texte: '12 m coûtent donc 12 × 3,10 = 37,20 €.',
        note: 'On multiplie par 12, on n\'ajoute pas les 5 m d\'écart.',
      },
    ],
    controle:
      'Le contrôle : 12 m, c\'est un peu moins du double de 7 m — le prix doit donc '
      + 'être un peu moins du double de 21,70 €, c\'est-à-dire un peu moins de 43,40 €. '
      + '37,20 € tient dans la fourchette. Le traitement additif aurait donné '
      + '21,70 + 5 = 26,70 €, bien trop peu : l\'encadrement l\'attrape tout seul.',
  },

  entrainement: [
    {
      id: 'e-5-2-1', type: 'calcul', palier: 1, piege: 'traitement-additif',
      consigne: 'Pour 8 crêpes, il faut 12 cL de lait. Combien de cL faut-il pour 6 crêpes ?',
      enonce: '8 \\text{ crêpes} \\rightarrow 12 \\text{ cL} \\qquad 6 \\text{ crêpes} \\rightarrow \\text{ ?}',
      attendu: 9,
      fausses: [
        { valeur: 10, piege: 'traitement-additif' },
        { valeur: 16, piege: 'produit-en-croix-mecanique' },
      ],
    },
    {
      id: 'e-5-2-2', type: 'calcul', palier: 1, piege: 'traitement-additif',
      consigne: '5 stylos identiques coûtent 6 €. Combien coûtent 15 stylos, en euros ?',
      enonce: '5 \\text{ stylos} \\rightarrow 6 \\text{ euros} \\qquad 15 \\text{ stylos} \\rightarrow \\text{ ?}',
      attendu: 18,
      fausses: [
        { valeur: 16, piege: 'traitement-additif' },
        { valeur: 2, piege: 'produit-en-croix-mecanique' },
      ],
    },
    {
      // NEUTRE : les deux durées sont déjà dans la même unité, il n'y a rien à
      // convertir. Sans cet item, « dès qu'il y a un temps dans l'énoncé, il
      // faut convertir » deviendrait un réflexe, et l'élève transformerait des
      // heures en minutes pour rien — puis oublierait de revenir. L'item n'est
      // pas plus facile que les autres : le coefficient s'y cherche pareil.
      id: 'e-5-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'unites-non-converties',
      consigne: 'Un car roule à vitesse constante : il parcourt 210 km en 3 h. Quelle distance parcourt-il en 5 h, en km ?',
      enonce: '3 \\text{ h} \\rightarrow 210 \\text{ km} \\qquad 5 \\text{ h} \\rightarrow \\text{ ?}',
      attendu: 350,
      fausses: [{ valeur: 212, piege: 'traitement-additif' }],
    },
    {
      id: 'e-5-2-4', type: 'trous', palier: 2, piege: 'traitement-additif',
      consigne: 'Ce tableau est un tableau de proportionnalité entre une masse de pommes et son prix. Complète les deux cases vides.',
      enonce: '4 \\text{ kg} \\rightarrow 7 \\text{ euros} \\qquad \\square \\text{ kg} \\rightarrow 21 \\text{ euros} \\qquad 10 \\text{ kg} \\rightarrow \\square \\text{ euros}',
      champs: [
        { id: 'a', attendu: 12 },
        { id: 'b', attendu: 17.5 },
      ],
      fausses: [
        { valeur: 18, piege: 'traitement-additif' },
        { valeur: 13, piege: 'traitement-additif' },
      ],
    },
    {
      id: 'e-5-2-5', type: 'calcul', palier: 2, piege: 'grandeur-quotient-inversee',
      consigne: 'Un train parcourt 480 km en 4 h, à vitesse constante. Quelle est sa vitesse, en km/h ?',
      enonce: '480 \\text{ km en } 4 \\text{ h}',
      attendu: 120,
      fausses: [{ valeur: 1920, piege: 'grandeur-quotient-inversee' }],
    },
    {
      id: 'e-5-2-6', type: 'calcul', palier: 2, piege: 'unites-non-converties',
      consigne: 'Un cycliste roule à vitesse constante : 24 km en 1 h. Quelle distance parcourt-il en 45 min, en km ?',
      enonce: '1 \\text{ h} \\rightarrow 24 \\text{ km} \\qquad 45 \\text{ min} \\rightarrow \\text{ ?}',
      attendu: 18,
      fausses: [
        { valeur: 10.8, piege: 'unites-non-converties' },
        { valeur: 9, piege: 'traitement-additif' },
      ],
    },
    {
      id: 'e-5-2-7', type: 'plausible', palier: 2, piege: 'illusion-de-linearite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{côté } 5 \\text{ cm} \\rightarrow \\text{aire } 25 \\text{ cm}^2 \\qquad \\text{côté } 15 \\text{ cm} \\rightarrow \\text{aire } 75 \\text{ cm}^2',
      attendu: false,
      explication:
        'L\'aire n\'est **pas** proportionnelle au côté. Le côté est multiplié par 3, '
        + 'mais l\'aire par 3 × 3 = 9 : elle passe de 25 à **225 cm²**. Dessine le grand '
        + 'carré et découpe-le en carrés de 5 cm de côté — tu en compteras neuf.',
    },
    {
      // NEUTRE : ici la figure est bien agrandie, mais le périmètre EST
      // proportionnel au côté — l'illusion de linéarité ne joue pas, la réponse
      // « proportionnel » est la bonne. Sans cet item, l'élève apprendrait la
      // contre-règle « dès qu'on agrandit une figure, ce n'est jamais
      // proportionnel », aussi fausse que le piège. L'item ressemble trait pour
      // trait au précédent : c'est exactement ce qui le rend exigeant.
      id: 'e-5-2-8', type: 'plausible', palier: 2, neutre: true, piege: 'illusion-de-linearite',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{côté } 5 \\text{ cm} \\rightarrow \\text{périmètre } 20 \\text{ cm} \\qquad \\text{côté } 15 \\text{ cm} \\rightarrow \\text{périmètre } 60 \\text{ cm}',
      attendu: true,
      explication:
        'Le périmètre, lui, est bien proportionnel au côté : il vaut toujours 4 fois le '
        + 'côté. Le côté est multiplié par 3, le périmètre aussi — 20 × 3 = 60 cm. '
        + 'Dans une figure agrandie, les **longueurs** suivent le coefficient ; les '
        + 'aires, non.',
    },
    {
      id: 'e-5-2-9', type: 'corriger', palier: 3, piege: 'traitement-additif',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '9 \\text{ L} \\rightarrow 117 \\text{ km} \\qquad 12 \\text{ L} \\rightarrow \\text{ ?}',
      lignes: [
        { texte: 'La consommation est régulière : la distance est proportionnelle au carburant.', fausse: false },
        { texte: 'De 9 L à 12 L, on ajoute 3 L.', fausse: false },
        { texte: 'On ajoute donc 3 km : 117 + 3 = 120.', fausse: true },
        { texte: 'La voiture parcourt 120 km avec 12 L.', fausse: false },
      ],
      explication:
        'Les deux premières lignes sont justes : la situation est bien proportionnelle, '
        + 'et l\'écart de carburant est bien de 3 L. C\'est la troisième qui casse tout — '
        + 'un écart ne se recopie pas d\'une grandeur à l\'autre. Avec 9 L on fait '
        + '117 km, donc 117 ÷ 9 = 13 km par litre, et 12 × 13 = **156 km**.',
    },
    {
      id: 'e-5-2-10', type: 'vraifaux', palier: 3, piege: 'traitement-additif',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans un tableau de proportionnalité, si on ajoute 4 à un nombre de la première ligne, on ajoute 4 au nombre qui lui correspond sur la seconde.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis un tableau de proportionnalité dont le coefficient n\'est pas 1. Donne ce coefficient, puis l\'écart qui apparaît sur la seconde ligne quand on ajoute 4 sur la première.',
        champs: [
          { id: 'a', etiquette: 'coefficient choisi' },
          { id: 'b', etiquette: 'écart obtenu sur la seconde ligne' },
        ],
        // On vérifie la PROPRIÉTÉ — un écart de 4 en haut devient 4 fois le
        // coefficient en bas, donc autre chose que 4 dès que le coefficient
        // diffère de 1 — et non un couple unique : 3 et 12, 5 et 20, 0,5 et 2
        // conviennent tous.
        valide: (a, b) => a > 0 && a !== 1 && Math.abs(b - 4 * a) < 1e-9,
        exemple: 'Avec un coefficient de 3 : 4 de plus en haut donne 12 de plus en bas, pas 4.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-5-2-1',
      enonce:
        'Une recette de pancakes pour 4 personnes demande 300 g de farine et '
        + '40 cL de lait. Léa veut en préparer pour 10 personnes.',
      questions: [
        { texte: 'Quelle masse de farine lui faut-il ?', attendu: 750, unite: 'g' },
        { texte: 'Quelle quantité de lait ?', attendu: 100, unite: 'cL' },
      ],
    },
    {
      id: 'p-5-2-2',
      enonce:
        'Un magasin vend des cahiers tous identiques. Un lot de 6 cahiers coûte 8,40 €, '
        + 'et le prix ne dépend que du nombre de cahiers.',
      questions: [
        { texte: 'Combien coûte un cahier ?', attendu: 1.4, unite: '€' },
        { texte: 'Combien coûtent 15 cahiers ?', attendu: 21, unite: '€' },
        { texte: 'Avec 35 €, combien de cahiers peut-on acheter au maximum ?', attendu: 25, unite: 'cahiers' },
      ],
    },
    {
      id: 'p-5-2-3',
      enonce: 'Un TGV parcourt 570 km en 3 heures, à vitesse constante.',
      questions: [
        { texte: 'Quelle est sa vitesse ?', attendu: 190, unite: 'km/h' },
        { texte: 'Quelle distance parcourt-il en 4 h 30 ?', attendu: 855, unite: 'km' },
      ],
    },
    {
      id: 'p-5-2-4',
      enonce: 'Une imprimante sort 42 pages en 3 minutes, à cadence régulière.',
      questions: [
        { texte: 'Combien de pages sort-elle en une minute ?', attendu: 14, unite: 'pages' },
        { texte: 'Combien de pages sort-elle en un quart d\'heure ?', attendu: 210, unite: 'pages' },
      ],
    },
    {
      id: 'p-5-2-5',
      enonce:
        'Un pot de peinture de 2,5 L couvre 30 m² de mur. Le salon à repeindre '
        + 'présente 78 m² de surface, et la peinture ne se vend qu\'en pots de 2,5 L.',
      questions: [
        { texte: 'Quelle quantité de peinture faut-il pour couvrir les 78 m² ?', attendu: 6.5, unite: 'L' },
        { texte: 'Combien de pots faut-il acheter ?', attendu: 3, unite: 'pots' },
      ],
    },
  ],

  test: [
    {
      id: 't-5-2-1', type: 'calcul',
      consigne: '7 kg de pommes coûtent 15,40 €. Combien coûtent 12 kg, en euros ?',
      enonce: '7 \\text{ kg} \\rightarrow 15{,}40 \\text{ euros} \\qquad 12 \\text{ kg} \\rightarrow \\text{ ?}',
      attendu: 26.4, revoir: 'propriete',
    },
    {
      id: 't-5-2-2', type: 'calcul',
      consigne: '9 cahiers identiques coûtent 13,50 €. Combien coûtent 4 cahiers, en euros ?',
      enonce: '9 \\text{ cahiers} \\rightarrow 13{,}50 \\text{ euros} \\qquad 4 \\text{ cahiers} \\rightarrow \\text{ ?}',
      attendu: 6, revoir: 'exemple',
    },
    {
      id: 't-5-2-3', type: 'calcul',
      consigne: 'Une voiture parcourt 245 km avec 14 L de carburant. Quelle distance parcourt-elle avec 20 L, en km ?',
      enonce: '14 \\text{ L} \\rightarrow 245 \\text{ km} \\qquad 20 \\text{ L} \\rightarrow \\text{ ?}',
      attendu: 350, piege: 'traitement-additif', revoir: 'propriete',
    },
    {
      id: 't-5-2-4', type: 'trous',
      consigne: 'Un train roule à vitesse constante. Ce tableau est un tableau de proportionnalité : complète les deux cases vides.',
      enonce: '6 \\text{ h} \\rightarrow 510 \\text{ km} \\qquad \\square \\text{ h} \\rightarrow 340 \\text{ km} \\qquad 9 \\text{ h} \\rightarrow \\square \\text{ km}',
      champs: [
        { id: 'a', attendu: 4 },
        { id: 'b', attendu: 765 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-5-2-5', type: 'calcul',
      consigne: 'Un robot avance régulièrement : 3 m en 4 s. Quelle distance parcourt-il en 30 s, en m ?',
      enonce: '4 \\text{ s} \\rightarrow 3 \\text{ m} \\qquad 30 \\text{ s} \\rightarrow \\text{ ?}',
      attendu: 22.5, revoir: 'exemple',
    },
    {
      id: 't-5-2-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{arête } 2 \\text{ cm} \\rightarrow \\text{volume } 8 \\text{ cm}^3 \\qquad \\text{arête } 6 \\text{ cm} \\rightarrow \\text{volume } 24 \\text{ cm}^3',
      attendu: false,
      explication:
        'Le volume n\'est pas proportionnel à l\'arête. L\'arête est multipliée par 3, '
        + 'donc le volume par 3 × 3 × 3 = 27 : il passe de 8 à **216 cm³**. Il faut bien '
        + '27 petits cubes de 2 cm pour remplir le grand.',
      piege: 'illusion-de-linearite', revoir: 'remarque',
    },
    {
      id: 't-5-2-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '4 \\text{ places} \\rightarrow 34 \\text{ euros} \\qquad 10 \\text{ places} \\rightarrow 85 \\text{ euros}',
      attendu: true,
      explication:
        'Une place coûte 34 ÷ 4 = 8,50 €, donc 10 places coûtent 85 €. Le compte y est. '
        + 'Contrôle rapide : 10 places, c\'est deux fois et demie 4 places, et 85 vaut '
        + 'bien deux fois et demie 34.',
      revoir: 'exemple',
    },
    {
      id: 't-5-2-8', type: 'calcul',
      consigne: 'Un avion vole à vitesse constante : 1 200 km en 1 h 30. Quelle distance parcourt-il en 2 h 15, en km ?',
      enonce: '1 \\text{ h } 30 \\rightarrow 1200 \\text{ km} \\qquad 2 \\text{ h } 15 \\rightarrow \\text{ ?}',
      attendu: 1800, piege: 'unites-non-converties', revoir: 'propriete',
    },
    {
      id: 't-5-2-9', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '15 \\text{ min} \\rightarrow 90 \\text{ pages} \\qquad 25 \\text{ min} \\rightarrow \\text{ ?}',
      lignes: [
        { texte: 'La cadence est régulière : le nombre de pages est proportionnel à la durée.', fausse: false },
        { texte: 'De 15 min à 25 min, on ajoute 10 min, donc on ajoute 10 pages.', fausse: true },
        { texte: '90 + 10 = 100 pages.', fausse: false },
      ],
      explication:
        'La première ligne est juste. La deuxième transporte l\'écart d\'une grandeur à '
        + 'l\'autre, ce qui n\'a pas de sens : 10 minutes ne valent pas 10 pages. En '
        + '15 min l\'imprimante sort 90 pages, donc 6 pages par minute, et '
        + '25 × 6 = **150 pages**.',
      piege: 'traitement-additif', revoir: 'remarque',
    },
    {
      id: 't-5-2-10', type: 'calcul',
      consigne: 'Un ruban de 8 m coûte 14 €. Quelle longueur de ce ruban peut-on acheter avec 42 €, en m ?',
      enonce: '8 \\text{ m} \\rightarrow 14 \\text{ euros} \\qquad \\text{ ?} \\rightarrow 42 \\text{ euros}',
      attendu: 24, revoir: 'definition',
    },
  ],
};
