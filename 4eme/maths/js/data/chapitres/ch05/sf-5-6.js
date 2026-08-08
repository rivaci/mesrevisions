// Chapitre 5, savoir-faire 6 — Convertir des unités composées.
//
// Le savoir-faire où l'élève a le plus de chances de retenir un geste sans le
// comprendre : « km/h vers m/s, je divise par 3,6 ». Le 3,6 marche, jusqu'au
// jour où on demande des m³/s en L/min et où il n'y a plus de nombre magique.
//
// Le fichier est donc construit pour que le 3,6 soit toujours un RÉSULTAT et
// jamais un point de départ :
//
//   · la découverte le fabrique (1 000 en haut, 3 600 en bas, donc 3 600 ÷ 1 000) ;
//   · la méthode le refait en deux étapes explicites, comme le demande le BO ;
//   · deux conversions du programme cohabitent partout — km/h ↔ m/s et
//     m³/s → L/min — pour qu'aucun facteur unique ne suffise à réussir la série.
//
// ── Les deux pièges, et pourquoi deux items neutres ───────────────────────
//
// « unites-non-converties » ne convertit qu'une seule des deux unités ;
// « grandeur-quotient-inversee » convertit dans le mauvais sens (× 3,6 au lieu
// de ÷ 3,6). Chacun a son neutre : un item où ne changer qu'une seule unité est
// la bonne réponse (e-5-6-3), et un item où la conversion proposée est juste
// (e-5-6-7). Sans eux, deux règles fausses s'installeraient à la place des
// bonnes : « les deux nombres changent toujours » et « on me demande si c'est
// plausible, donc c'est faux ».
//
// ── Le contrôle, partout ──────────────────────────────────────────────────
//
// Le BO le dit en toutes lettres : 36 km/h fait 10 m/s, pas 100. Ce repère est
// dans la découverte, dans le cours, dans la méthode et dans deux problèmes.
// C'est le seul garde-fou qui survive à l'oubli du 3,6.

export default {
  id: 'sf-5-6',
  titre: 'Convertir des unités composées',
  attendus: [
    'Il effectue des conversions d\'unités composées : km/h en m/s, m³/s en L/min.',
  ],

  // On ne donne pas le 3,6 : on donne les deux conversions séparées, et l'élève
  // fait la division lui-même. Le second champ lui fait refaire le chemin en
  // entier sur un autre nombre — c'est là qu'on voit s'il a compris le geste ou
  // recopié un résultat.
  decouvrir: {
    titre: 'Combien de mètres en une seconde ?',
    texte:
      'Une voiture roule à 36 km/h. On veut savoir combien de mètres elle '
      + 'parcourt en une seconde. On écrit d\'abord les deux grandeurs dans les '
      + 'unités demandées.',
    lignes: [
      { calcul: '36 km/h, c\'est 36 km parcourus en 1 h', resultat: 'la vitesse de départ' },
      { calcul: '36 km, écrits en mètres', resultat: '36 000 m' },
      { calcul: '1 h, écrite en secondes', resultat: '3 600 s' },
    ],
    question:
      'La voiture parcourt donc 36 000 m en 3 600 s. Combien de mètres parcourt-elle '
      + 'en une seconde ? Refais ensuite le même chemin pour une vitesse de 72 km/h.',
    champs: [
      { id: 'a', etiquette: '36 000 ÷ 3 600 =', attendu: 10 },
      { id: 'b', etiquette: '72 km/h, en m/s :', attendu: 20 },
    ],
    conclusion:
      'Passer des km/h aux m/s, c\'est multiplier la distance par 1 000 et le temps '
      + 'par 3 600 — donc **diviser par 3,6** au total, puisque 3 600 ÷ 1 000 = 3,6. '
      + 'Retiens le repère : **36 km/h font 10 m/s**, pas 100. En m/s, le nombre est '
      + 'toujours bien plus petit qu\'en km/h.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Unité composée',
      texte:
        'Une **unité composée** est faite de deux unités, l\'une divisée par l\'autre : '
        + 'des km/h, des m/s, des L/min, des m³/s.\n'
        + 'Le trait se lit « par » : 20 m/s, c\'est 20 mètres **par** seconde, '
        + 'c\'est-à-dire 20 mètres parcourus **en une** seconde.',
    },
    {
      type: 'propriete',
      titre: 'Convertir en deux temps',
      texte:
        'On convertit **séparément** la grandeur du haut, puis celle du bas.\n'
        + 'Si le haut est multiplié par un nombre et le bas par un autre, la grandeur '
        + 'composée est **multipliée** par le premier et **divisée** par le second.\n'
        + 'Des km/h aux m/s : le haut est multiplié par 1 000, le bas par 3 600. '
        + 'Au total on divise par 3 600 ÷ 1 000 = **3,6**. Dans l\'autre sens, on '
        + 'multiplie par 3,6.',
    },
    {
      // Le cube est mis ici et pas ailleurs : c'est la seule ligne du savoir-faire
      // où l'illusion de linéarité peut frapper, et elle frappe fort — « 1 m fait
      // 10 dm, donc 1 m³ fait 10 dm³ » se dit tout seul.
      type: 'remarque',
      titre: 'Les repères à connaître',
      texte:
        '1 km = 1 000 m et 1 h = 3 600 s.\n'
        + '1 m³ = 1 000 L et 1 min = 60 s.\n'
        + 'Attention au **cube** : 1 m vaut 10 dm, mais 1 m³ vaut 10 × 10 × 10 = '
        + '**1 000** dm³, c\'est-à-dire 1 000 L. Un volume ne se convertit pas comme '
        + 'une longueur.',
    },
    {
      type: 'remarque',
      titre: 'Contrôler par l\'ordre de grandeur',
      texte:
        '**36 km/h font 10 m/s**, pas 100. Garde ce repère : un nombre écrit en m/s '
        + 'est toujours **beaucoup plus petit** que le même en km/h.\n'
        + 'Un piéton marche à 5 km/h, soit environ 1,4 m/s. Une voiture en ville roule '
        + 'à 50 km/h, soit environ 14 m/s. Si tu trouves une vitesse de piéton à '
        + '18 m/s, c\'est la conversion qui est à l\'envers.',
    },
    {
      type: 'exemple',
      texte:
        '90 km/h = 90 ÷ 3,6 = 25 m/s.\n'
        + '25 m/s = 25 × 3,6 = 90 km/h.\n'
        + '0,002 m³/s = 2 L/s = 2 × 60 = 120 L/min.',
    },
  ],

  // La méthode montre les DEUX conversions séparées avant la division finale.
  // Le 3,6 n'apparaît qu'en note de la dernière étape : il est le raccourci de
  // ce qu'on vient de faire, jamais la méthode elle-même.
  methode: {
    titre: 'Convertir une vitesse en m/s',
    enonce: 'Convertir 54 km/h en m/s.',
    etapes: [
      {
        texte: 'J\'écris ce que veut dire 54 km/h : 54 km parcourus en 1 h.',
        note: 'Le trait de l\'unité se lit « par ». C\'est lui qui donne la division.',
      },
      {
        texte: 'Je convertis le haut : 54 km = 54 × 1 000 = 54 000 m.',
        note: 'Première étape, et une seule grandeur à la fois.',
      },
      {
        texte: 'Je convertis le bas : 1 h = 3 600 s.',
        note: 'Les deux conversions se font séparément — c\'est ici qu\'on en oublie une.',
      },
      {
        texte: 'Je divise : 54 000 ÷ 3 600 = 15. Donc 54 km/h = 15 m/s.',
        note: 'C\'est exactement 54 ÷ 3,6 : le raccourci, une fois le chemin compris.',
      },
    ],
    controle:
      'Le contrôle : 36 km/h font 10 m/s. 54 km/h est une fois et demie plus rapide, '
      + 'donc le résultat doit tourner autour de 15 — et c\'est le cas. Si tu trouves '
      + '194,4 (soit 54 × 3,6), tu as pris la conversion à l\'envers : personne ne '
      + 'court à 194 mètres par seconde.',
  },

  entrainement: [
    {
      id: 'e-5-6-1', type: 'calcul', palier: 1, piege: 'grandeur-quotient-inversee',
      consigne: 'Convertis cette vitesse en m/s.',
      enonce: '36\\text{ km/h}',
      attendu: 10,
      fausses: [
        { valeur: 129.6, piege: 'grandeur-quotient-inversee' },
        { valeur: 600, piege: 'unites-non-converties' },
      ],
    },
    {
      id: 'e-5-6-2', type: 'calcul', palier: 1, piege: 'unites-non-converties',
      consigne: 'Convertis cette vitesse en m/s.',
      enonce: '90\\text{ km/h}',
      attendu: 25,
      fausses: [
        { valeur: 324, piege: 'grandeur-quotient-inversee' },
        { valeur: 90000, piege: 'unites-non-converties' },
      ],
    },
    {
      // NEUTRE : le haut ne change pas (des mètres restent des mètres), donc ne
      // convertir qu'une seule des deux unités est ici la BONNE réponse. Sans
      // cet item, « il faut toujours changer les deux nombres » deviendrait la
      // règle, et le 3,6 se collerait sur toutes les vitesses.
      // L'item n'est pas plus facile : il faut décider entre × 60 et ÷ 60, et
      // c'est le sens du calcul qui est en jeu. La fausse réponse 18 est celle
      // de l'élève qui convertit en km/h par réflexe, sans lire l'unité demandée.
      id: 'e-5-6-3', type: 'calcul', palier: 1, neutre: true, piege: 'unites-non-converties',
      consigne: 'Convertis cette vitesse en m/min.',
      enonce: '5\\text{ m/s}',
      attendu: 300,
      fausses: [
        { valeur: 18, piege: 'grandeur-quotient-inversee' },
      ],
    },
    {
      id: 'e-5-6-4', type: 'calcul', palier: 2, piege: 'unites-non-converties',
      consigne: 'Convertis ce débit en L/min.',
      enonce: '0{,}002\\text{ m}^3\\text{/s}',
      attendu: 120,
      fausses: [
        { valeur: 2, piege: 'unites-non-converties' },
        { valeur: 0.12, piege: 'unites-non-converties' },
      ],
    },
    {
      id: 'e-5-6-5', type: 'trous', palier: 2, piege: 'unites-non-converties',
      consigne: 'Complète les deux étapes de la conversion.',
      enonce: '72\\text{ km/h} = \\dfrac{72\\,000\\text{ m}}{\\square\\text{ s}} = \\square\\text{ m/s}',
      champs: [
        { id: 'a', attendu: 3600 },
        { id: 'b', attendu: 20 },
      ],
      fausses: [
        { valeur: 60, piege: 'unites-non-converties' },
        { valeur: 72, piege: 'unites-non-converties' },
      ],
    },
    {
      id: 'e-5-6-6', type: 'plausible', palier: 2, piege: 'grandeur-quotient-inversee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '110\\text{ km/h} \\approx 396\\text{ m/s}',
      attendu: false,
      explication:
        'La conversion a été faite à l\'envers : 110 × 3,6 = 396, alors qu\'il fallait '
        + 'diviser. 110 ÷ 3,6 ≈ 30,6 m/s. Le contrôle saute aux yeux : 396 m/s, '
        + 'c\'est plus rapide que le son.',
    },
    {
      // NEUTRE : ici le résultat proposé est JUSTE. Sans cet item, « on me demande
      // si c'est plausible, donc c'est faux » suffirait à réussir tous les
      // « plausible » du savoir-faire. Il est même déroutant : 1,4 paraît petit
      // pour une vitesse — c'est pourtant l'ordre de grandeur d'un piéton.
      id: 'e-5-6-7', type: 'plausible', palier: 2, neutre: true, piege: 'grandeur-quotient-inversee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '5\\text{ km/h} \\approx 1{,}4\\text{ m/s}',
      attendu: true,
      explication:
        '5 ÷ 3,6 ≈ 1,39, donc environ 1,4 m/s. C\'est la vitesse d\'un piéton : il fait '
        + 'un peu plus d\'un mètre par seconde, ce qui est cohérent avec un pas normal.',
    },
    {
      // Comparer deux vitesses données dans des unités différentes : c'est la
      // seule situation où oublier de convertir se paie immédiatement par une
      // réponse fausse, et pas seulement par un nombre bizarre.
      id: 'e-5-6-8', type: 'comparer', palier: 3, piege: 'unites-non-converties',
      consigne: 'Compare ces deux nombres.',
      enonce: '15\\text{ m/s} \\ldots 50\\text{ km/h}',
      attendu: '>',
      fausses: [
        { valeur: '<', piege: 'unites-non-converties' },
      ],
    },
    {
      id: 'e-5-6-9', type: 'corriger', palier: 3, piege: 'grandeur-quotient-inversee',
      consigne: 'Cette conversion est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Convertir } 0{,}5\\text{ m}^3\\text{/s en L/min}',
      lignes: [
        { texte: '0,5 m³ = 500 L, donc 0,5 m³/s = 500 L/s', fausse: false },
        { texte: 'Une minute vaut 60 secondes, donc je divise par 60 : 500 ÷ 60 ≈ 8,3', fausse: true },
        { texte: 'Donc 0,5 m³/s ≈ 8,3 L/min', fausse: false },
      ],
      explication:
        'La première ligne est juste : 0,5 m³ vaut bien 500 L. C\'est à la deuxième que '
        + 'ça casse. En une minute, il passe 60 fois plus d\'eau qu\'en une seconde : on '
        + '**multiplie** par 60. Le bon calcul est 500 × 60 = 30 000 L/min. Le contrôle '
        + 'le disait déjà : un débit par minute est forcément plus grand qu\'un débit '
        + 'par seconde.',
    },
    {
      id: 'e-5-6-10', type: 'vraifaux', palier: 3, piege: 'unites-non-converties',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Pour convertir une vitesse de km/h en m/s, il suffit de multiplier par 1 000, puisque 1 km vaut 1 000 m.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis une vitesse en km/h, puis donne sa valeur en m/s.',
        champs: [
          { id: 'a', etiquette: 'vitesse en km/h' },
          { id: 'b', etiquette: 'la même vitesse en m/s' },
        ],
        // On vérifie la PROPRIÉTÉ « b est bien la vitesse a convertie », pas un
        // couple imposé : 36 et 10, 18 et 5, 90 et 25 conviennent tous. La marge
        // de 0,1 laisse arrondir au dixième sans être prise en défaut.
        valide: (a, b) => a > 0 && Math.abs(b - a / 3.6) < 0.1,
        exemple:
          '36 km/h font 10 m/s. Multiplier par 1 000 donnerait 36 000 m/s, soit plus de '
          + 'cent fois la vitesse du son : le temps n\'a pas été converti.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-5-6-1',
      enonce:
        'Un TGV roule à la vitesse constante de 288 km/h. Le conducteur veut savoir '
        + 'quelle distance il parcourt pendant les quelques secondes de son temps de '
        + 'réaction, avant même d\'avoir commencé à freiner.',
      questions: [
        { texte: 'Quelle est sa vitesse en m/s ?', attendu: 80, unite: 'm/s' },
        { texte: 'Quelle distance parcourt-il en 5 secondes ?', attendu: 400, unite: 'm' },
      ],
    },
    {
      id: 'p-5-6-2',
      enonce:
        'Un robinet mal fermé laisse passer 0,0005 m³ d\'eau par seconde. On veut '
        + 'exprimer cette fuite dans une unité plus parlante.',
      questions: [
        { texte: 'Combien de litres s\'écoulent en une seconde ?', attendu: 0.5, unite: 'L' },
        { texte: 'Quel est ce débit en L/min ?', attendu: 30, unite: 'L/min' },
      ],
    },
    {
      id: 'p-5-6-3',
      enonce:
        'Un sprinteur parcourt 100 mètres en 10 secondes, à vitesse supposée '
        + 'constante. Un commentateur annonce qu\'il court « comme une voiture en ville ».',
      questions: [
        { texte: 'Quelle est sa vitesse en m/s ?', attendu: 10, unite: 'm/s' },
        { texte: 'Quelle est cette vitesse en km/h ?', attendu: 36, unite: 'km/h' },
      ],
    },
    {
      id: 'p-5-6-4',
      enonce:
        'Une pompe remplit un bassin avec un débit de 0,003 m³/s. Le bassin contient '
        + '3 600 litres.',
      questions: [
        { texte: 'Quel est ce débit en L/min ?', attendu: 180, unite: 'L/min' },
        { texte: 'Combien de minutes faut-il pour remplir le bassin ?', attendu: 20, unite: 'min' },
      ],
    },
    {
      id: 'p-5-6-5',
      enonce:
        'Une station météo mesure un vent de 15 m/s. Une alerte est déclenchée à '
        + 'partir de 100 km/h.',
      questions: [
        { texte: 'Quelle est la vitesse du vent en km/h ?', attendu: 54, unite: 'km/h' },
        { texte: 'De combien de km/h ce vent reste-t-il en dessous du seuil d\'alerte ?', attendu: 46, unite: 'km/h' },
      ],
    },
  ],

  test: [
    {
      id: 't-5-6-1', type: 'calcul',
      consigne: 'Convertis cette vitesse en m/s.',
      enonce: '54\\text{ km/h}',
      attendu: 15, revoir: 'propriete',
    },
    {
      id: 't-5-6-2', type: 'calcul',
      consigne: 'Convertis cette vitesse en m/s.',
      enonce: '108\\text{ km/h}',
      attendu: 30, revoir: 'exemple',
    },
    {
      id: 't-5-6-3', type: 'calcul',
      consigne: 'Convertis cette vitesse en km/h.',
      enonce: '25\\text{ m/s}',
      attendu: 90, revoir: 'propriete',
    },
    {
      id: 't-5-6-4', type: 'calcul',
      consigne: 'Convertis ce débit en L/min.',
      enonce: '0{,}05\\text{ m}^3\\text{/s}',
      attendu: 3000, revoir: 'remarque',
    },
    {
      id: 't-5-6-5', type: 'trous',
      consigne: 'Complète les deux étapes de la conversion.',
      enonce: '0{,}004\\text{ m}^3\\text{/s} = \\square\\text{ L/s} = \\square\\text{ L/min}',
      champs: [
        { id: 'a', attendu: 4 },
        { id: 'b', attendu: 240 },
      ],
      revoir: 'definition',
    },
    {
      id: 't-5-6-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '18\\text{ km/h} \\approx 5\\text{ m/s}',
      attendu: true,
      explication: '18 ÷ 3,6 = 5 exactement. C\'est l\'allure d\'un cycliste tranquille.',
      revoir: 'exemple',
    },
    {
      id: 't-5-6-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '4\\text{ m/s} \\approx 1{,}1\\text{ km/h}',
      attendu: false,
      explication:
        'La conversion a été faite dans le mauvais sens : 4 ÷ 3,6 ≈ 1,1, alors qu\'il '
        + 'fallait multiplier. 4 × 3,6 = 14,4 km/h. En km/h, le nombre est toujours le '
        + 'plus grand des deux.',
      piege: 'grandeur-quotient-inversee', revoir: 'propriete',
    },
    {
      // Le seul item dont la réponse est « = ». Il interdit la stratégie « on me
      // demande de comparer, donc l'un des deux l'emporte », et il fait tomber
      // pile sur le repère du cours.
      id: 't-5-6-8', type: 'comparer',
      consigne: 'Compare ces deux nombres.',
      enonce: '90\\text{ km/h} \\ldots 25\\text{ m/s}',
      attendu: '=',
      fausses: [{ valeur: '>', piege: 'unites-non-converties' }],
      revoir: 'exemple',
    },
    {
      id: 't-5-6-9', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Une même vitesse, si elle n\'est pas nulle, s\'écrit avec un nombre plus petit en m/s qu\'en km/h.',
      attendu: true,
      piege: 'grandeur-quotient-inversee', revoir: 'remarque',
    },
    {
      id: 't-5-6-10', type: 'corriger',
      consigne: 'Cette conversion est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Convertir } 90\\text{ km/h en m/s}',
      lignes: [
        { texte: '90 km/h, c\'est 90 km parcourus en 1 h.', fausse: false },
        { texte: '90 km = 90 000 m et 1 h = 60 s', fausse: true },
        { texte: '90 000 ÷ 60 = 1 500, donc 90 km/h = 1 500 m/s', fausse: false },
      ],
      explication:
        'La première ligne est juste. À la deuxième, les minutes ont été prises pour '
        + 'des secondes : une heure vaut 3 600 s, pas 60. Le bon calcul est '
        + '90 000 ÷ 3 600 = 25, donc 90 km/h = 25 m/s. Le résultat 1 500 m/s aurait dû '
        + 'alerter : c\'est plus de quatre fois la vitesse du son.',
      piege: 'unites-non-converties', revoir: 'remarque',
    },
  ],
};
