// Chapitre 14, savoir-faire 3 — Lire et interpréter une valeur sur un graphique.
//
// ── Pourquoi une VITESSE dès la première seconde ──────────────────────────
//
// « Le graphique lu comme un dessin de la scène » est le piège le mieux
// documenté de la didactique des fonctions, et il a une particularité gênante :
// il donne raison à l’élève dans la moitié des cas. Sur un graphique
// d’altitude, « la courbe monte donc ça monte » est exact. L’élève accumule
// donc des succès qui renforcent une lecture fausse, et l’enseignement qui
// répète « ce n’est pas un dessin » ne l’atteint pas — il n’a jamais été mis en
// échec.
//
// La seule façon de l’attraper, c’est de porter une VITESSE sur l’axe vertical.
// Là, la montée dit « il accélère » et la descente « il ralentit », et les deux
// peuvent se produire sur une route parfaitement plate. C’est le dispositif de
// la découverte, du palier 2 et du palier 3 : à chaque fois l’énoncé annonce
// explicitement que le terrain est plat, pour qu’aucune échappatoire ne reste.
//
// ── Les trois items neutres, et ce que chacun bloque ──────────────────────
//
// e-14-3-2 : l’axe vertical est gradué de 1 en 1. Compter les carreaux donne
// alors exactement la bonne valeur, et l’élève qui ne lit jamais les nombres
// écrits réussit. Sans cet item, « je compte les carreaux » serait mis en
// défaut à tous les coups, ce qui apprend « il faut faire autre chose que
// compter » sans jamais apprendre QUOI — et surtout, l’élève ne verrait jamais
// le cas où compter marche, donc ne comprendrait pas pourquoi ça marche parfois.
//
// e-14-3-5 : l’axe vertical porte une ALTITUDE. « Le tracé descend donc ça
// descend » est ici la bonne réponse. C’est le contrepoids indispensable au
// reste du savoir-faire : sans lui, l’entraînement installerait l’erreur
// symétrique — « quand un graphique descend, il ne faut jamais croire que ça
// descend » — qui est aussi fausse et bien plus difficile à déloger, parce
// qu’on l’a enseignée. Et c’est le seul « plausible » vrai du lot : sans lui,
// « on me demande de juger, donc c’est faux » suffirait à traverser le palier.
//
// e-14-3-10 : le point lu a ses deux coordonnées ÉGALES — 12 km coûtent 12 €.
// Partir du mauvais axe y ramène au même point, donc au même nombre. L’élève
// qui inverse systématiquement abscisse et ordonnée tombe juste, et la
// stratégie « je pars toujours de l’axe de gauche » ne peut pas être validée
// par ce lot.
//
// ── Ce que les graduations font ici ───────────────────────────────────────
//
// Aucun savoir-faire ne peut travailler « un carreau ne vaut pas 1 » sur des
// axes gradués de 1 en 1 : le piège n’a pas de prise. Les pas sont donc variés
// partout — 2, 3, 4, 5, 6, 10, 20, 25, 50, 100, 200 — et trois items posent un
// axe qui ne commence pas à zéro (e-14-3-6, t-14-3-6 et p-14-3-3), le cas où l’élève qui
// compte les carreaux se trompe le plus, et le plus fréquent en contrôle.
//
// ── Ce que ce savoir-faire ne couvre pas ─────────────────────────────────
//
// Il ne fait pas écrire de formule (savoir-faire d’écriture), il ne fait pas
// calculer de coordonnées à placer (savoir-faire de représentation), et il ne
// prononce jamais les mots « image », « antécédent » ni la notation f(x) : le
// programme de 4e les interdit. On parle de deux grandeurs, de l’axe du bas et
// de l’axe de gauche, et de ce qui est écrit le long de chacun.

export default {
  id: 'sf-14-3',
  titre: 'Lire et interpréter une valeur sur un graphique',
  attendus: [
    'Il lit et interprète une valeur sur la représentation graphique de la dépendance de deux grandeurs.',
    'Il utilise les titres et les graduations des axes pour donner du sens à ce qu’il lit.',
  ],

  // On ne dit pas « un graphique n’est pas un dessin » : on affiche une courbe
  // qui monte puis descend, on annonce dans l’énoncé que la route est plate
  // d’un bout à l’autre, et on fait lire deux vitesses ÉGALES aux deux endroits
  // où le tracé faisait le contraire l’un de l’autre. C’est l’élève qui trouve
  // les deux mêmes 20 km/h — un sous une montée, l’autre sous une descente.
  decouvrir: {
    titre: 'La courbe monte, mais la route est plate',
    texte:
      'Un cycliste roule sur une route parfaitement plate, du départ à la '
      + '10e minute : pas la moindre côte, pas la moindre descente. Voici ce '
      + 'que son compteur a enregistré. Deux instants sont marqués en '
      + 'pointillés : 2 minutes, et 8 minutes.',
    graphique: {
      titre: 'La vitesse du cycliste au cours des dix premières minutes',
      x: { titre: 'Temps écoulé (min)', min: 0, max: 10, pas: 2 },
      y: { titre: 'Vitesse (km/h)', min: 0, max: 30, pas: 5 },
      points: [[0, 10], [4, 30], [6, 30], [10, 10]],
      relie: true,
      reperes: [[2, 20], [8, 20]],
    },
    lignes: [
      { calcul: 'ce qui est écrit le long de l’axe du bas', resultat: 'Temps écoulé (min)' },
      { calcul: 'ce qui est écrit le long de l’axe de gauche', resultat: 'Vitesse (km/h)' },
      { calcul: 'ce que l’énoncé dit de la route', resultat: 'elle est plate d’un bout à l’autre' },
    ],
    question:
      'Lis la vitesse du cycliste au bout de 2 minutes, là où le tracé monte, '
      + 'puis au bout de 8 minutes, là où il descend.',
    champs: [
      { id: 'a', etiquette: 'vitesse au bout de 2 minutes, en km/h', attendu: 20 },
      { id: 'b', etiquette: 'vitesse au bout de 8 minutes, en km/h', attendu: 20 },
    ],
    conclusion:
      'Aux deux instants, le cycliste roule à la **même vitesse : 20 km/h**. '
      + 'Pourtant le tracé montait la première fois, et descendait la seconde.\n'
      + 'Résiste à ce que tu crois voir : la route est plate d’un bout à l’autre, personne ne '
      + 'grimpe et personne ne dévale. Ce qui monte entre 0 et 4 minutes, c’est '
      + 'la **vitesse** — le cycliste accélère. Ce qui descend après 6 minutes, '
      + 'c’est la vitesse aussi — il ralentit, et il ralentit sur du plat.\n'
      + 'Un graphique ne photographie pas la scène. Il met **deux grandeurs** en '
      + 'regard, et ce sont les **titres des deux axes** qui disent lesquelles. '
      + 'Avant de lire quoi que ce soit, on les lit.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Ce qu’un point du tracé raconte',
      texte:
        'Sur le graphique d’une dépendance, la grandeur dont l’autre dépend est '
        + 'portée par l’axe **horizontal**, celui du bas ; la grandeur qui dépend '
        + 'est portée par l’axe **vertical**, celui de gauche.\n'
        + 'Chaque point du tracé raconte donc **un couple de valeurs** : une lue '
        + 'en bas, une lue à gauche. « Ce point » n’est pas un lieu sur un dessin, '
        + 'c’est une phrase : « pour telle valeur en bas, on a telle valeur à gauche ».',
    },
    {
      type: 'propriete',
      titre: 'Lire une valeur, dans un sens ou dans l’autre',
      texte:
        'La question te donne une valeur d’une des deux grandeurs. Commence par '
        + 'l’axe où cette grandeur est **écrite**.\n'
        + 'Si elle est écrite en bas : repère-la sur l’axe du bas, monte '
        + 'verticalement jusqu’au tracé, puis va horizontalement jusqu’à l’axe de '
        + 'gauche et lis.\n'
        + 'Si elle est écrite à gauche : repère-la sur l’axe de gauche, va '
        + 'horizontalement jusqu’au tracé, puis descends jusqu’à l’axe du bas et lis.\n'
        + 'Le geste est le même dans les deux sens ; c’est le point de départ qui change.',
    },
    {
      type: 'remarque',
      titre: 'Ce que vaut un carreau',
      texte:
        'Un carreau ne vaut **pas toujours 1**, et les deux axes n’ont presque '
        + 'jamais le même pas.\n'
        + 'Pour le savoir, lis **deux nombres voisins** écrits sur l’axe et fais '
        + 'leur différence : si tu lis 20 puis 40, un carreau vaut 20.\n'
        + 'Vérifie aussi où l’axe **commence**. Rien n’oblige un axe à partir de '
        + 'zéro : s’il commence à 100, un point situé quatre carreaux plus haut, '
        + 'avec un pas de 25, vaut 200 — et surtout pas 4, ni 100.',
    },
    {
      type: 'remarque',
      titre: 'Un graphique n’est pas le dessin de la scène',
      texte:
        'Une portion qui monte ne représente **pas** une côte, et une portion qui '
        + 'descend pas une pente. Ce qui monte, c’est la grandeur écrite le long '
        + 'de l’axe **vertical**.\n'
        + 'Si c’est une vitesse, une montée dit qu’on **accélère** — ce qui peut '
        + 'arriver sur une route parfaitement plate. Un palier horizontal dit que '
        + 'la vitesse **ne change pas**, pas qu’on est arrêté : à l’arrêt, la '
        + 'vitesse serait nulle et le tracé serait posé sur l’axe du bas.\n'
        + 'Le geste qui protège : dis ta lecture à voix haute sous la forme '
        + '« quand … augmente, … augmente », en nommant les deux grandeurs écrites '
        + 'sur les axes. Si ta phrase parle de la forme d’un terrain, c’est raté.',
    },
    {
      type: 'exemple',
      texte:
        'Un graphique donne le prix d’un envoi selon la masse du colis : « Masse '
        + '(kg) » en bas, gradué de 2 en 2 ; « Prix (€) » à gauche, gradué de 5 en '
        + '5. Le tracé va du point (0 ; 5) au point (10 ; 30). '
        + 'Premier exemple, on demande le prix pour 4 kg. La masse est écrite en '
        + 'bas : on repère 4 en bas, on monte jusqu’au tracé, on lit 15 à gauche. '
        + 'Réponse : 15 €. Deuxième exemple, on demande la masse d’un colis facturé '
        + '25 €. Le prix est écrit à gauche : on repère 25 à gauche, on va '
        + 'horizontalement jusqu’au tracé, on descend et on lit 8 en bas. Réponse : '
        + '8 kg. Même graphique, même geste, deux points de départ différents.',
    },
    {
      type: 'exemple',
      texte:
        'Un graphique donne la température d’une pièce, « Heure » en bas de 8 à '
        + '16 par pas de 2, « Température (°C) » à gauche de 10 à 22 par pas de 2. '
        + 'Premier exemple : que vaut un carreau à gauche ? On lit deux nombres '
        + 'voisins, 10 et 12 : un carreau vaut 2 degrés, et l’axe commence à 10, '
        + 'pas à zéro. Deuxième exemple : le tracé passe par un point situé trois '
        + 'carreaux au-dessus du bas de l’axe de gauche. Il vaut 10 + 3 × 2 = 16 °C '
        + '— ni 3, qui serait le nombre de carreaux, ni 6, qui oublierait que '
        + 'l’axe démarre à 10.',
    },
    {
      type: 'exemple',
      texte:
        'Un graphique donne la vitesse d’un bus, « Temps (s) » en bas et « Vitesse '
        + '(km/h) » à gauche. Le tracé monte de 0 à 50 pendant les vingt premières '
        + 'secondes, puis reste horizontal à 50 pendant vingt secondes. '
        + 'Premier exemple : que dit la montée ? Elle dit que la VITESSE augmente, '
        + 'donc que le bus accélère — elle ne dit rien de la route, qui peut être '
        + 'plate. Deuxième exemple : que dit le palier ? Que la vitesse ne change '
        + 'plus, donc que le bus roule à allure constante, à 50 km/h. Il ne s’est '
        + 'pas arrêté : arrêté, il serait à 0, tout en bas du graphique.',
    },
  ],

  methode: {
    titre: 'Lire une valeur, puis dire ce qu’elle raconte',
    enonce:
      'Un graphique donne le volume d’eau restant dans un arrosoir selon le '
      + 'temps. L’axe du bas porte « Temps (s) », gradué de 10 en 10, de 0 à 60. '
      + 'L’axe de gauche porte « Volume d’eau (cL) », gradué de 20 en 20, de 0 à '
      + '200. Le tracé est un segment qui va du point (0 ; 180) au point '
      + '(60 ; 60). Quel volume reste-t-il au bout de 30 secondes, et que raconte '
      + 'la forme du tracé ?',
    etapes: [
      {
        texte:
          'Je lis les titres des deux axes : le temps en bas, le volume à gauche. '
          + 'La question me donne un temps, donc je pars de l’axe du bas.',
        note: 'Sans cette lecture, deux nombres sur un dessin ne veulent rien dire.',
      },
      {
        texte:
          'Je regarde ce que vaut un carreau. En bas, deux graduations voisines '
          + 'sont 10 et 20 : un carreau vaut 10 secondes. À gauche, 20 et 40 : un '
          + 'carreau vaut 20 centilitres.',
        note: 'Les deux axes ont des pas différents, et aucun des deux ne vaut 1.',
      },
      {
        texte:
          'Je repère 30 sur l’axe du bas, je monte tout droit jusqu’au tracé, puis '
          + 'je pars horizontalement vers la gauche : je tombe sur 120.',
        note: 'L’ordre vient de l’axe de départ : parti du bas, on monte d’abord, on lit à gauche ensuite. Parti de la gauche, ce serait l’inverse.',
      },
      {
        texte: 'J’écris la réponse avec son unité : au bout de 30 secondes, il reste 120 cL d’eau.',
        note: 'Un nombre sans unité ne répond à rien.',
      },
      {
        texte:
          'Je dis enfin ce que raconte le tracé : il descend, donc le VOLUME '
          + 'diminue — l’arrosoir se vide régulièrement. Il ne descend pas parce '
          + 'que l’arrosoir descendrait quelque part.',
        note: 'C’est l’axe de gauche qui décide de ce qui monte ou descend, jamais la forme du tracé.',
      },
    ],
    controle:
      'Le contrôle : refais la lecture dans l’autre sens. Pars de 120 sur l’axe '
      + 'de gauche, va horizontalement jusqu’au tracé, descends jusqu’à l’axe du '
      + 'bas — tu dois retomber sur 30 secondes. Si tu tombes ailleurs, c’est '
      + 'que la première lecture est partie du mauvais axe. Deuxième contrôle, '
      + 'gratuit : dis ta réponse à voix haute en nommant les deux grandeurs, '
      + '« au bout de 30 secondes, il reste 120 centilitres ». Si la phrase ne se '
      + 'dit pas, ou si elle parle de la forme d’un terrain, la lecture est fausse.',
  },

  entrainement: [
    // ── Palier 1 : partir du bon axe, et savoir ce que vaut un carreau ──────
    {
      // Les pointillés sont affichés : à ce palier, le geste est montré, seule
      // la valeur reste à trouver. Les deux erreurs déclarées sont les deux
      // façons de rater ce geste — compter les carreaux, ou partir de l’autre axe.
      id: 'e-14-3-1', type: 'calcul', palier: 1, piege: 'graduation-comptee-en-carreaux',
      consigne:
        'Ce graphique donne le prix d’une course de taxi selon la distance '
        + 'parcourue. Des pointillés marquent la course de 20 km. Quel est son '
        + 'prix, en euros ?',
      graphique: {
        titre: 'Le prix d’une course de taxi selon la distance',
        x: { titre: 'Distance (km)', min: 0, max: 30, pas: 5 },
        y: { titre: 'Prix (€)', min: 0, max: 30, pas: 5 },
        points: [[0, 5], [30, 20]],
        relie: true,
        reperes: [[20, 15]],
      },
      enonce: '\\text{le prix d’une course de 20 km}',
      attendu: 15,
      fausses: [
        // 3 carreaux au-dessus de zéro, sur un axe gradué de 5 en 5. La règle du
        // piège le dit mot pour mot : trois carreaux valent 15, pas 3.
        { valeur: 3, piege: 'graduation-comptee-en-carreaux' },
        // 20 : la coordonnée du point marqué, lue du mauvais côté. Les
        // pointillés désignent (20 ; 15) ; qui inverse les deux axes rend
        // l’abscisse au lieu de l’ordonnée, et recopie donc la distance.
        // C’est la forme que prend l’échange sur les deux autres items à
        // pointillés du fichier (e-14-3-3, t-14-3-3) : elle manquait ici.
        { valeur: 20, piege: 'axes-echanges' },
        // 30 : le même échange, mais chez un élève qui n’a pas vu les
        // pointillés. Parti de 20 sur l’axe de GAUCHE, où sont écrits les
        // prix, alors que la question donne une distance — écrite en bas.
        // Le tracé atteint 20 € à 30 km, d’où ce nombre.
        { valeur: 30, piege: 'axes-echanges' },
      ],
    },
    {
      // NEUTRE. L’axe de gauche est gradué de 1 en 1 : compter les carreaux
      // donne exactement la bonne valeur, et l’élève qui ne lit jamais les
      // nombres écrits réussit. C’est le seul endroit du savoir-faire où sa
      // méthode marche — et il faut qu’il le rencontre, sinon il retiendra
      // « compter les carreaux est interdit » au lieu de « compte-les seulement
      // après avoir vu ce que vaut un carreau ».
      id: 'e-14-3-2', type: 'calcul', palier: 1, neutre: true, piege: 'graduation-comptee-en-carreaux',
      consigne:
        'Ce graphique donne la température dans une serre depuis son ouverture. '
        + 'Quelle est la température au bout de 4 heures, en degrés ?',
      graphique: {
        titre: 'La température dans la serre au fil des heures',
        x: { titre: 'Temps écoulé (h)', min: 0, max: 12, pas: 2 },
        y: { titre: 'Température (°C)', min: 0, max: 10, pas: 1 },
        points: [[0, 2], [4, 6], [8, 6], [12, 9]],
        relie: true,
      },
      enonce: '\\text{la température au bout de 4 heures}',
      attendu: 6,
      fausses: [
        // 2 : parti de 4 sur l’axe de GAUCHE, celui des températures, alors que
        // la question donne une durée. Le tracé atteint 4 °C au bout de 2 heures.
        { valeur: 2, piege: 'axes-echanges' },
      ],
    },
    {
      // Les deux lectures d’un même point, dans deux champs distincts : c’est là
      // que l’inversion des axes devient visible, puisqu’elle produit deux
      // nombres justes rangés dans les mauvaises cases. Les erreurs de carreaux
      // sont déclarées AVANT, parce qu’elles sont sans ambiguïté ; la valeur 10
      // vient en dernier pour ne pas capturer une autre erreur au passage.
      id: 'e-14-3-3', type: 'trous', palier: 1, piege: 'axes-echanges',
      consigne:
        'Un point de ce graphique est marqué par des pointillés. Donne ses deux '
        + 'lectures : d’abord le nombre de photocopies, puis le prix.',
      graphique: {
        titre: 'Le prix d’un lot de photocopies',
        x: { titre: 'Nombre de photocopies', min: 0, max: 400, pas: 50 },
        y: { titre: 'Prix (€)', min: 0, max: 16, pas: 2 },
        points: [[0, 4], [400, 16]],
        relie: true,
        reperes: [[200, 10]],
      },
      enonce: '\\text{le point marqué par les pointillés}',
      champs: [
        { id: 'a', etiquette: 'le nombre de photocopies', attendu: 200 },
        { id: 'b', etiquette: 'le prix, en euros', attendu: 10 },
      ],
      fausses: [
        // 4 carreaux en bas, sur un axe gradué de 50 en 50 : 200, pas 4.
        { valeur: 4, piege: 'graduation-comptee-en-carreaux' },
        // 5 carreaux à gauche, sur un axe gradué de 2 en 2 : 10, pas 5.
        { valeur: 5, piege: 'graduation-comptee-en-carreaux' },
        // 10 dans la case du nombre de photocopies : le prix a été rangé du
        // côté de l’axe du bas, où « Nombre de photocopies » est pourtant écrit.
        { valeur: 10, piege: 'axes-echanges' },
      ],
    },

    // ── Palier 2 : interpréter, c’est-à-dire relire les titres des axes ─────
    {
      id: 'e-14-3-4', type: 'plausible', palier: 2, piege: 'graphique-lu-comme-un-dessin',
      consigne:
        'Ce graphique donne la vitesse d’un coureur sur une piste d’athlétisme '
        + 'parfaitement plate. Cette lecture est-elle plausible ?',
      graphique: {
        titre: 'La vitesse du coureur au cours de sa course',
        x: { titre: 'Temps (min)', min: 0, max: 20, pas: 5 },
        y: { titre: 'Vitesse (km/h)', min: 0, max: 16, pas: 2 },
        points: [[0, 8], [5, 14], [10, 14], [15, 10], [20, 10]],
        relie: true,
      },
      enonce: '\\text{Entre la 5e et la 10e minute, le tracé est horizontal : le coureur s’est donc arrêté.}',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'graphique-lu-comme-un-dessin' },
      ],
      explication:
        'Le tracé est bien horizontal entre la 5e et la 10e minute, mais c’est '
        + '« Vitesse (km/h) » qui est écrit le long de l’axe de gauche. Un tracé '
        + 'horizontal dit donc que la vitesse NE CHANGE PAS : le coureur tient '
        + '14 km/h pendant cinq minutes, à allure constante. S’il s’était arrêté, '
        + 'sa vitesse serait nulle et le tracé serait posé sur l’axe du bas, à 0.',
    },
    {
      // NEUTRE, et le contrepoids de tout le savoir-faire : ici l’axe de gauche
      // porte une ALTITUDE, donc « le tracé descend » veut vraiment dire « ça
      // descend », et l’élève qui lit le graphique comme un dessin tombe juste.
      // Sans lui on installerait l’erreur symétrique — « il ne faut jamais
      // croire ce qu’on voit » — qui est fausse aussi, et qu’on aurait enseignée
      // soi-même. C’est aussi le seul « plausible » vrai : sans lui, « on me
      // demande de juger, donc c’est faux » suffirait.
      id: 'e-14-3-5', type: 'plausible', palier: 2, neutre: true, piege: 'graphique-lu-comme-un-dessin',
      consigne:
        'Ce graphique donne l’altitude d’un randonneur au cours de sa marche. '
        + 'Cette lecture est-elle plausible ?',
      graphique: {
        titre: 'L’altitude du randonneur au cours de sa marche',
        x: { titre: 'Temps de marche (h)', min: 0, max: 6, pas: 1 },
        y: { titre: 'Altitude (m)', min: 0, max: 1200, pas: 200 },
        points: [[0, 400], [2, 1000], [4, 1000], [6, 600]],
        relie: true,
      },
      enonce: '\\text{Entre la 4e et la 6e heure, le tracé descend : le randonneur redescend.}',
      attendu: true,
      explication:
        'Ici, « le tracé descend » veut bien dire « ça descend » — mais pas parce '
        + 'que le tracé descend : parce que c’est « Altitude (m) » qui est écrit '
        + 'le long de l’axe de gauche, et qu’elle passe de 1 000 m à 600 m. Sur le '
        + 'graphique d’une vitesse, la même descente aurait dit tout autre chose : '
        + 'que le marcheur ralentit. C’est toujours le titre de l’axe de gauche '
        + 'qui décide, jamais la forme du tracé.',
    },
    {
      id: 'e-14-3-6', type: 'calcul', palier: 2, piege: 'graduation-comptee-en-carreaux',
      consigne:
        'Ce graphique donne la température d’un four après son allumage. '
        + 'Attention : l’axe de gauche ne commence pas à zéro. Quelle est la '
        + 'température du four au bout de 10 minutes, en degrés ?',
      graphique: {
        titre: 'La température du four après l’allumage',
        x: { titre: 'Temps (min)', min: 0, max: 20, pas: 5 },
        y: { titre: 'Température (°C)', min: 100, max: 300, pas: 25 },
        points: [[0, 150], [20, 250]],
        relie: true,
      },
      enonce: '\\text{la température du four au bout de 10 minutes}',
      attendu: 200,
      fausses: [
        // 4 : le nombre de carreaux au-dessus du bas de l’axe, pris pour la
        // valeur. Un carreau vaut 25 ici, et le bas de l’axe vaut déjà 100.
        { valeur: 4, piege: 'graduation-comptee-en-carreaux' },
        // 100 : 4 carreaux × 25, en supposant que l’axe part de zéro. Il part
        // de 100, et les nombres écrits le disent.
        { valeur: 100, piege: 'graduation-comptee-en-carreaux' },
      ],
    },
    {
      // La lecture inverse : on donne une hauteur, on demande un nombre de
      // jours. Partir de l’axe du bas comme d’habitude produit ici une valeur
      // bien définie et lisible — c’est ce qui rend l’erreur diagnosticable.
      id: 'e-14-3-7', type: 'calcul', palier: 2, piege: 'axes-echanges',
      consigne:
        // « Depuis le semis » donnait un haricot de 4 cm le jour du semis. Sans
        // effet sur les mathématiques, mais un élève qui bute là-dessus cesse
        // de lire le graphique — et c’est le graphique qu’on travaille.
        'Ce graphique donne la hauteur d’un plant de haricot selon le nombre de '
        + 'jours écoulés depuis le début de l’observation. Au bout de combien de '
        + 'jours le plant mesure-t-il 12 cm ?',
      graphique: {
        titre: 'La hauteur du plant selon le nombre de jours',
        x: { titre: 'Nombre de jours', min: 0, max: 20, pas: 4 },
        y: { titre: 'Hauteur (cm)', min: 0, max: 16, pas: 2 },
        points: [[0, 4], [20, 14]],
        relie: true,
      },
      enonce: '\\text{le nombre de jours au bout duquel le plant mesure 12 cm}',
      attendu: 16,
      fausses: [
        // 10 : parti de 12 sur l’axe du BAS, celui des jours, alors que la
        // question donne une hauteur — écrite à gauche. Au 12e jour, le plant
        // mesure justement 10 cm.
        { valeur: 10, piege: 'axes-echanges' },
        // 4 carreaux en bas, sur un axe gradué de 4 en 4 : 16 jours, pas 4.
        { valeur: 4, piege: 'graduation-comptee-en-carreaux' },
      ],
    },

    // ── Palier 3 : relire une lecture, et la réfuter par un nombre ──────────
    {
      // Le graphique est ici décrit en toutes lettres plutôt qu’affiché : ce
      // qu’on met à l’épreuve n’est pas la lecture, c’est le raisonnement qui
      // la commente. La première ligne fait le bon geste, et la deuxième
      // l’oublie aussitôt — c’est exactement ce qu’on lit sur les copies.
      id: 'e-14-3-8', type: 'corriger', palier: 3, piege: 'graphique-lu-comme-un-dessin',
      consigne:
        'Un graphique donne la vitesse d’une voiture au cours du temps : '
        + '« Temps (s) » le long de l’axe du bas, « Vitesse (km/h) » le long de '
        + 'l’axe de gauche. Le tracé part de zéro et monte régulièrement jusqu’à '
        + '60 pendant les vingt premières secondes. On demande ce que fait la '
        + 'voiture pendant ces vingt secondes. Ce raisonnement est faux : trouve '
        + 'la ligne où l’erreur apparaît.',
      enonce: '\\text{le tracé monte de 0 à 60 pendant les vingt premières secondes}',
      lignes: [
        { texte: 'Le long de l’axe de gauche est écrit « Vitesse (km/h) » : c’est donc une vitesse que le tracé donne.', fausse: false },
        { texte: 'Le tracé monte, donc la voiture est en train de gravir une côte.', fausse: true },
        { texte: 'Au bout de 20 secondes, la voiture roule à 60 km/h.', fausse: false },
      ],
      explication:
        'La première ligne fait exactement ce qu’il faut : lire le titre de l’axe '
        + 'de gauche. La troisième lit une valeur, et elle la lit bien. C’est la '
        + 'deuxième qui oublie ce que la première venait d’écrire — ce qui monte, '
        + 'c’est la VITESSE, pas la route. La voiture accélère : elle passe de '
        + 'l’arrêt à 60 km/h en vingt secondes, et elle peut très bien le faire '
        + 'sur une route parfaitement plate. Ce graphique ne dit rien du relief, '
        + 'et pour cause : le relief n’est écrit sur aucun des deux axes.',
    },
    {
      // Le contre-exemple ne demande pas de relire le graphique — il redonne les
      // deux vitesses et fait produire DEUX nombres : la baisse de vitesse, qui
      // est réelle, et la dénivelée, qui est nulle. Écrire ce zéro soi-même est
      // ce qui réfute « il dévale une pente », et aucune récitation ne le fait.
      id: 'e-14-3-9', type: 'vraifaux', palier: 3, piege: 'graphique-lu-comme-un-dessin',
      consigne:
        'Ce graphique donne la vitesse d’une trottinette sur une piste '
        + 'parfaitement plate. Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      graphique: {
        titre: 'La vitesse de la trottinette sur une piste plate',
        x: { titre: 'Temps (min)', min: 0, max: 12, pas: 2 },
        y: { titre: 'Vitesse (km/h)', min: 0, max: 24, pas: 4 },
        points: [[0, 8], [4, 24], [8, 24], [12, 12]],
        relie: true,
      },
      affirmation: 'Entre la 8e et la 12e minute, le tracé descend : la trottinette dévale une pente.',
      attendu: false,
      fausses: [
        { valeur: true, piege: 'graphique-lu-comme-un-dessin' },
      ],
      contreExemple: {
        invite:
          'Le graphique donnait 24 km/h à la 8e minute et 12 km/h à la 12e '
          + 'minute, sur une piste plate. Donne de combien de km/h la vitesse a '
          + 'baissé entre ces deux instants, puis de combien de mètres la '
          + 'trottinette est descendue.',
        champs: [
          { id: 'a', etiquette: 'la vitesse a baissé de … km/h' },
          { id: 'b', etiquette: 'la trottinette est descendue de … m' },
        ],
        valide: (a, b) => Math.abs(a - 12) < 1e-9 && Math.abs(b) < 1e-9,
        temoin: [12, 0],
        exemple:
          'La vitesse a baissé de 24 − 12 = 12 km/h. Et la trottinette n’est '
          + 'descendue d’aucun mètre : la piste est plate, l’énoncé le dit dès le '
          + 'départ. Ce qui descend sur le graphique, c’est donc la vitesse — la '
          + 'trottinette ralentit. Le tracé ne dessine pas le terrain, il met le '
          + 'temps et la vitesse en regard, et rien d’autre.',
      },
    },
    {
      // NEUTRE. Le point lu a ses deux coordonnées égales : 12 km coûtent 12 €.
      // Partir de l’axe de gauche au lieu de l’axe du bas ramène au même point,
      // donc au même nombre — l’inversion des axes ne peut pas produire
      // d’erreur ici. Sans un item de ce genre, « je pars toujours de la
      // gauche » serait mis en défaut partout et deviendrait « il faut toujours
      // partir du bas », ce qui est faux dès qu’on demande une lecture inverse.
      id: 'e-14-3-10', type: 'calcul', palier: 3, neutre: true, piege: 'axes-echanges',
      consigne:
        'Ce graphique donne le coût d’un dépannage selon la distance de '
        + 'remorquage. Quel est le coût d’un remorquage de 12 km, en euros ?',
      graphique: {
        titre: 'Le coût d’un dépannage selon la distance remorquée',
        x: { titre: 'Distance remorquée (km)', min: 0, max: 20, pas: 4 },
        y: { titre: 'Coût (€)', min: 0, max: 20, pas: 4 },
        points: [[0, 6], [20, 16]],
        relie: true,
      },
      enonce: '\\text{le coût d’un remorquage de 12 km}',
      attendu: 12,
      fausses: [
        // 3 carreaux à gauche, sur un axe gradué de 4 en 4 : 12 €, pas 3.
        { valeur: 3, piege: 'graduation-comptee-en-carreaux' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-14-3-1',
      enonce:
        'Ce graphique donne le prix d’un stationnement selon sa durée. Le tarif '
        + 'est le même tous les jours.',
      graphique: {
        titre: 'Le prix du stationnement selon la durée',
        x: { titre: 'Durée (h)', min: 0, max: 6, pas: 1 },
        y: { titre: 'Prix (€)', min: 0, max: 12, pas: 3 },
        points: [[0, 3], [6, 12]],
        relie: true,
      },
      questions: [
        { texte: 'Quel est le prix d’un stationnement de 2 heures ?', attendu: 6, unite: '€' },
        { texte: 'Quel est le prix d’un stationnement de 4 heures ?', attendu: 9, unite: '€' },
        { texte: 'Combien de temps peut-on stationner avec 12 € ?', attendu: 6, unite: 'h' },
      ],
    },
    {
      // La troisième question ne se lit pas sur un axe : elle demande la DURÉE
      // d’un palier, donc une différence entre deux abscisses. C’est de
      // l’interprétation, et c’est ce que le savoir-faire vise autant que la
      // lecture chiffrée.
      id: 'p-14-3-2',
      enonce:
        'Ce graphique donne la vitesse d’un train au cours d’un trajet, sur une '
        + 'voie parfaitement plate.',
      graphique: {
        titre: 'La vitesse du train au cours du trajet',
        x: { titre: 'Temps (min)', min: 0, max: 40, pas: 5 },
        y: { titre: 'Vitesse (km/h)', min: 0, max: 300, pas: 50 },
        points: [[0, 0], [10, 300], [30, 300], [40, 100]],
        relie: true,
      },
      questions: [
        { texte: 'Quelle est la vitesse du train au bout de 5 minutes ?', attendu: 150, unite: 'km/h' },
        { texte: 'Quelle est la vitesse du train au bout de 35 minutes ?', attendu: 200, unite: 'km/h' },
        { texte: 'Pendant combien de minutes le train roule-t-il à 300 km/h ?', attendu: 20, unite: 'min' },
      ],
    },
    {
      id: 'p-14-3-3',
      enonce:
        'Ce graphique donne la température d’un plat sorti du four. L’axe de '
        + 'gauche ne commence pas à zéro : lis bien les nombres qui y sont écrits.',
      graphique: {
        titre: 'La température du plat pendant qu’il refroidit',
        x: { titre: 'Temps (min)', min: 0, max: 30, pas: 5 },
        y: { titre: 'Température (°C)', min: 20, max: 80, pas: 10 },
        points: [[0, 80], [10, 60], [20, 40], [30, 30]],
        relie: true,
      },
      questions: [
        { texte: 'Quelle est la température du plat au bout de 10 minutes ?', attendu: 60, unite: '°C' },
        { texte: 'Au bout de combien de minutes le plat est-il à 40 °C ?', attendu: 20, unite: 'min' },
        { texte: 'De combien de degrés le plat a-t-il refroidi pendant les dix premières minutes ?', attendu: 20, unite: '°C' },
      ],
    },
    {
      // Un nuage de points, non relié : il n’y a rien entre deux jours, et le
      // dire explicitement évite la seule autre lecture possible de l’énoncé.
      id: 'p-14-3-4',
      enonce:
        'Ce graphique donne, pour chaque jour d’une semaine, le nombre de vélos '
        + 'loués dans une station. Les points ne sont pas reliés : chaque point '
        + 'est un jour entier, et il n’y a rien entre deux jours.',
      graphique: {
        titre: 'Les vélos loués chaque jour de la semaine',
        x: { titre: 'Jour (1 = lundi)', min: 1, max: 7, pas: 1 },
        y: { titre: 'Vélos loués', min: 0, max: 60, pas: 10 },
        points: [[1, 20], [2, 30], [3, 10], [4, 40], [5, 50], [6, 60], [7, 40]],
        relie: false,
      },
      questions: [
        { texte: 'Combien de vélos ont été loués le 4e jour ?', attendu: 40, unite: 'vélos' },
        { texte: 'Quel jour a-t-on loué le plus de vélos ? Donne son numéro.', attendu: 6 },
        { texte: 'Combien de jours de la semaine dépassent 35 vélos loués ?', attendu: 4, unite: 'jours' },
      ],
    },
    {
      id: 'p-14-3-5',
      enonce:
        'Ce graphique donne le volume d’eau restant dans une citerne selon le '
        + 'nombre de jours écoulés depuis son remplissage.',
      graphique: {
        titre: 'L’eau restant dans la citerne',
        x: { titre: 'Nombre de jours', min: 0, max: 12, pas: 2 },
        y: { titre: 'Volume (L)', min: 0, max: 600, pas: 100 },
        points: [[0, 600], [12, 0]],
        relie: true,
      },
      questions: [
        { texte: 'Quel volume reste-t-il au bout de 4 jours ?', attendu: 400, unite: 'L' },
        { texte: 'Au bout de combien de jours reste-t-il 200 L ?', attendu: 8, unite: 'jours' },
        { texte: 'Au bout de combien de jours la citerne est-elle vide ?', attendu: 12, unite: 'jours' },
      ],
    },
  ],

  test: [
    {
      id: 't-14-3-1', type: 'calcul',
      consigne:
        'Ce graphique donne le prix d’une location de vélo selon sa durée. Quel '
        + 'est le prix d’une location de 4 heures, en euros ?',
      graphique: {
        titre: 'Le prix d’une location de vélo selon la durée',
        x: { titre: 'Durée (h)', min: 0, max: 8, pas: 2 },
        y: { titre: 'Prix (€)', min: 0, max: 24, pas: 4 },
        points: [[0, 4], [8, 20]],
        relie: true,
      },
      enonce: '\\text{le prix d’une location de 4 heures}',
      attendu: 12,
      fausses: [{ valeur: 3, piege: 'graduation-comptee-en-carreaux' }],
      revoir: 'propriete',
    },
    {
      id: 't-14-3-2', type: 'calcul',
      consigne:
        'Ce graphique donne la hauteur d’une bougie pendant qu’elle brûle. Au '
        + 'bout de combien de minutes la bougie mesure-t-elle 12 cm ?',
      graphique: {
        titre: 'La hauteur de la bougie pendant qu’elle brûle',
        x: { titre: 'Temps (min)', min: 0, max: 60, pas: 6 },
        y: { titre: 'Hauteur (cm)', min: 0, max: 18, pas: 3 },
        points: [[0, 18], [60, 3]],
        relie: true,
      },
      enonce: '\\text{le temps au bout duquel la bougie mesure 12 cm}',
      attendu: 24,
      fausses: [
        // 15 : parti de 12 sur l’axe du bas, celui des minutes. À la 12e minute,
        // la bougie mesure justement 15 cm.
        { valeur: 15, piege: 'axes-echanges' },
        // 4 carreaux en bas, sur un axe gradué de 6 en 6 : 24 minutes, pas 4.
        { valeur: 4, piege: 'graduation-comptee-en-carreaux' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-14-3-3', type: 'trous',
      consigne:
        'Un point de ce graphique est marqué par des pointillés. Donne ses deux '
        + 'lectures : d’abord la masse, puis le prix.',
      graphique: {
        titre: 'Le prix d’envoi d’un colis selon sa masse',
        x: { titre: 'Masse (kg)', min: 0, max: 10, pas: 2 },
        y: { titre: 'Prix (€)', min: 0, max: 30, pas: 5 },
        points: [[0, 5], [10, 30]],
        relie: true,
        reperes: [[6, 20]],
      },
      enonce: '\\text{le point marqué par les pointillés}',
      champs: [
        { id: 'a', etiquette: 'la masse, en kg', attendu: 6 },
        { id: 'b', etiquette: 'le prix, en euros', attendu: 20 },
      ],
      fausses: [
        { valeur: 3, piege: 'graduation-comptee-en-carreaux' },
        { valeur: 4, piege: 'graduation-comptee-en-carreaux' },
        { valeur: 20, piege: 'axes-echanges' },
      ],
      revoir: 'definition',
    },
    {
      id: 't-14-3-4', type: 'plausible',
      consigne:
        'Ce graphique donne la vitesse d’un bus sur une avenue parfaitement '
        + 'plate. Cette lecture est-elle plausible ?',
      graphique: {
        titre: 'La vitesse du bus entre deux arrêts',
        x: { titre: 'Temps (s)', min: 0, max: 60, pas: 10 },
        y: { titre: 'Vitesse (km/h)', min: 0, max: 40, pas: 10 },
        points: [[0, 0], [20, 40], [40, 40], [60, 0]],
        relie: true,
      },
      enonce: '\\text{Le tracé monte, reste un moment horizontal, puis redescend : le bus a franchi une bosse.}',
      attendu: false,
      explication:
        'L’axe de gauche porte « Vitesse (km/h) », pas une altitude. La montée '
        + 'dit que le bus accélère — de 0 à 40 km/h en vingt secondes —, le '
        + 'palier qu’il tient cette vitesse vingt secondes de plus, et la '
        + 'descente qu’il freine jusqu’à l’arrêt. Tout cela se passe sur une '
        + 'avenue plate : le relief n’est écrit sur aucun des deux axes, donc le '
        + 'graphique n’en dit rien.',
      piege: 'graphique-lu-comme-un-dessin', revoir: 'remarque',
    },
    {
      id: 't-14-3-5', type: 'plausible',
      consigne:
        'Ce graphique donne la hauteur d’eau d’un bassin qu’on remplit. Cette '
        + 'lecture est-elle plausible ?',
      graphique: {
        titre: 'La hauteur d’eau du bassin pendant le remplissage',
        x: { titre: 'Temps (min)', min: 0, max: 16, pas: 4 },
        y: { titre: 'Hauteur d’eau (cm)', min: 0, max: 80, pas: 20 },
        points: [[0, 20], [16, 60]],
        relie: true,
      },
      enonce: '\\text{Au bout de 8 minutes, l’eau atteint 40 cm.}',
      attendu: true,
      explication:
        'On part de 8 sur l’axe du bas — c’est lui qui porte le temps —, on monte '
        + 'jusqu’au tracé, et on lit 40 sur l’axe de gauche. La lecture tient. Et '
        + 'ici « le tracé monte » veut bien dire que l’eau monte, puisque c’est '
        + 'une hauteur d’eau qui est écrite le long de l’axe de gauche.',
      revoir: 'propriete',
    },
    {
      id: 't-14-3-6', type: 'calcul',
      consigne:
        'Ce graphique donne la température d’une pièce au cours de '
        + 'l’après-midi. Aucun des deux axes ne commence à zéro. Quelle est la '
        + 'température de la pièce à 14 heures, en degrés ?',
      graphique: {
        titre: 'La température de la pièce au cours de l’après-midi',
        x: { titre: 'Heure', min: 12, max: 20, pas: 2 },
        y: { titre: 'Température (°C)', min: 14, max: 26, pas: 2 },
        points: [[12, 16], [16, 24], [20, 18]],
        relie: true,
      },
      enonce: '\\text{la température de la pièce à 14 heures}',
      attendu: 20,
      fausses: [
        // 3 carreaux au-dessus du bas de l’axe, pris pour la valeur.
        { valeur: 3, piege: 'graduation-comptee-en-carreaux' },
        // 3 carreaux × 2, en supposant que l’axe part de zéro. Il part de 14.
        { valeur: 6, piege: 'graduation-comptee-en-carreaux' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-14-3-7', type: 'corriger',
      consigne:
        'Un graphique donne le prix d’un trajet en car selon la distance : '
        + '« Distance (km) » le long de l’axe du bas, gradué de 20 en 20 jusqu’à '
        + '100 ; « Prix (€) » le long de l’axe de gauche, gradué de 5 en 5 '
        + 'jusqu’à 25. Le tracé va du point (0 ; 5) au point (100 ; 25). On '
        + 'demande le prix d’un trajet de 60 km. Ce raisonnement est faux : '
        + 'trouve la ligne où l’erreur apparaît.',
      enonce: '\\text{le prix d’un trajet de 60 km}',
      lignes: [
        { texte: 'La question me donne une distance, et « Distance (km) » est écrit le long de l’axe du bas.', fausse: false },
        { texte: 'Je repère donc 60 sur l’axe de gauche, puis je rejoins le tracé.', fausse: true },
        { texte: 'Il me reste à lire la valeur qui correspond sur l’autre axe.', fausse: false },
      ],
      explication:
        'La première ligne fait le bon travail : elle repère sur quel axe est '
        + 'écrite la grandeur que la question donne. La troisième décrit le bon '
        + 'geste. C’est la deuxième qui trahit la première — elle part de l’axe '
        + 'de GAUCHE alors qu’on vient d’écrire que la distance est portée par '
        + 'l’axe du bas. Il fallait repérer 60 en bas, monter jusqu’au tracé, '
        + 'puis lire à gauche : le prix est de 17 €.',
      piege: 'axes-echanges', revoir: 'propriete',
    },
    {
      id: 't-14-3-8', type: 'calcul',
      consigne:
        'Ce graphique donne la masse de huit colis déposés dans un point relais. '
        + 'Les points ne sont pas reliés : chaque point est un colis. Quelle est '
        + 'la masse du 5e colis, en kilogrammes ?',
      graphique: {
        titre: 'La masse des huit colis déposés',
        x: { titre: 'Numéro du colis', min: 1, max: 8, pas: 1 },
        y: { titre: 'Masse (kg)', min: 0, max: 12, pas: 2 },
        points: [[1, 4], [2, 10], [3, 2], [4, 8], [5, 6], [6, 12], [7, 2], [8, 10]],
        relie: false,
      },
      enonce: '\\text{la masse du 5e colis}',
      attendu: 6,
      fausses: [{ valeur: 3, piege: 'graduation-comptee-en-carreaux' }],
      revoir: 'exemple',
    },
    {
      id: 't-14-3-9', type: 'calcul',
      consigne:
        'Ce graphique donne la vitesse d’un tramway entre deux arrêts, sur une '
        + 'voie plate. Pendant combien de secondes le tramway roule-t-il à '
        + 'vitesse constante ?',
      graphique: {
        titre: 'La vitesse du tramway entre deux arrêts',
        x: { titre: 'Temps (s)', min: 0, max: 100, pas: 20 },
        y: { titre: 'Vitesse (km/h)', min: 0, max: 50, pas: 10 },
        points: [[0, 0], [20, 30], [60, 30], [100, 0]],
        relie: true,
      },
      enonce: '\\text{la durée du palier pendant lequel la vitesse ne change pas}',
      attendu: 40,
      fausses: [
        // 30 : la valeur du palier lue à gauche, alors qu’on demande une durée —
        // et les durées sont écrites le long de l’axe du bas.
        { valeur: 30, piege: 'axes-echanges' },
        // 2 carreaux en bas, sur un axe gradué de 20 en 20 : 40 s, pas 2.
        { valeur: 2, piege: 'graduation-comptee-en-carreaux' },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-14-3-10', type: 'plausible',
      consigne:
        'Ce graphique donne la distance parcourue par un marcheur depuis son '
        + 'départ. Cette lecture est-elle plausible ?',
      graphique: {
        titre: 'La distance parcourue par le marcheur',
        x: { titre: 'Temps (h)', min: 0, max: 5, pas: 1 },
        y: { titre: 'Distance (km)', min: 0, max: 25, pas: 5 },
        points: [[0, 0], [5, 25]],
        relie: true,
      },
      enonce: '\\text{Au bout de 3 heures, le marcheur a parcouru 3 km.}',
      attendu: false,
      explication:
        'Trois heures, ce sont bien trois carreaux sur l’axe du bas, gradué de '
        + '1 en 1. Mais l’axe de gauche, lui, est gradué de 5 en 5 : trois '
        + 'carreaux y valent 15. En montant depuis 3 h jusqu’au tracé puis en '
        + 'lisant à gauche, on trouve 15 km, pas 3. Un carreau ne vaut 1 que si '
        + 'les nombres écrits sur l’axe le disent.',
      piege: 'graduation-comptee-en-carreaux', revoir: 'remarque',
    },
  ],
};
