// Chapitre 4, savoir-faire 1 — Comparer et ranger des nombres rationnels.
//
// Premier savoir-faire du chapitre, et il porte tout le reste : mettre au même
// dénominateur pour COMPARER, c'est exactement le geste qu'il faudra refaire
// pour ADDITIONNER. On l'installe ici, où il se contrôle à l'œil (une part est
// visiblement plus grande qu'une autre), avant de le réutiliser là où il ne se
// contrôle plus que par le calcul.
//
// ── Pourquoi le type « comparer » domine ──────────────────────────────────
//
// Le geste réel de l'exercice, c'est de poser un symbole entre deux nombres.
// Faire taper un résultat ici obligerait à inventer une question détournée
// (« quel numérateur obtiens-tu ? ») qui n'est plus la comparaison. Sept des dix
// items d'entraînement sont donc des « comparer », et les réponses restent
// partagées — quatre « < » et trois « > » — pour qu'aucun côté ne se devine.
//
// ── Les deux pièges qui se contredisent ───────────────────────────────────
//
// « comparaison-par-les-numerateurs » et « grand-denominateur-grande-fraction »
// tirent dans des sens opposés : le premier ne regarde que le haut, le second
// prend le bas pour une taille. Un élève peut réussir la moitié des items avec
// l'un et l'autre moitié avec l'autre sans rien comprendre — d'où les deux
// items neutres, l'un où lire les numérateurs donne la bonne réponse, l'autre
// où le plus grand dénominateur donne bien la plus grande fraction.

export default {
  id: 'sf-4-1',
  titre: 'Comparer et ranger des nombres rationnels',
  attendus: [
    'Il compare, range, encadre des nombres rationnels positifs ou négatifs.',
  ],

  // Deux copies plutôt qu'une suite de calculs : le désaccord entre Sacha et
  // Inès EST le problème. L'élève ne découvre pas une règle, il découvre qu'une
  // méthode qui a l'air raisonnable donne la mauvaise réponse.
  decouvrir: {
    titre: 'Deux copies, deux verdicts',
    texte:
      'On demande de comparer 5/8 et 7/12. Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: '7 est plus grand que 5, et 12 est plus grand que 8', resultat: '5/8 < 7/12' },
      { nom: 'Inès', calcul: 'Je réécris les deux fractions sur 24 avant de les comparer', resultat: '5/8 > 7/12' },
    ],
    question: 'Fais comme Inès : écris chaque fraction avec 24 pour dénominateur. Quel numérateur obtiens-tu ?',
    champs: [
      { id: 'a', etiquette: '5/8 = … / 24', attendu: 15 },
      { id: 'b', etiquette: '7/12 = … / 24', attendu: 14 },
    ],
    conclusion:
      'C\'est **Inès**. Une fois les deux fractions sur 24, la comparaison est '
      + 'évidente : 15 > 14, donc 5/8 > 7/12. Comparer les numérateurs ne marche '
      + 'que si les **dénominateurs sont les mêmes** — sinon les parts n\'ont pas '
      + 'la même taille, et on compare des choses différentes.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Nombre rationnel',
      texte:
        'Un **nombre rationnel** est un nombre qui peut s\'écrire comme un quotient '
        + 'de deux nombres entiers, le second n\'étant pas nul.\n'
        + 'Par exemple 3/4, −5/6, 7 (qui vaut 7/1) et 2,5 (qui vaut 5/2).',
    },
    {
      type: 'propriete',
      titre: 'Comparer deux nombres rationnels',
      texte:
        'À **dénominateur positif égal**, le plus grand est celui qui a le plus '
        + 'grand numérateur.\n'
        + 'Si les dénominateurs diffèrent, on **réécrit les deux fractions avec un '
        + 'même dénominateur**, puis on compare les numérateurs.\n'
        + '**Encadrer** un nombre rationnel, c\'est donner les deux entiers qui se '
        + 'suivent entre lesquels il se trouve.',
    },
    {
      type: 'remarque',
      titre: 'Le dénominateur dit la taille des parts',
      texte:
        'Plus le dénominateur est grand, plus les parts sont **petites** : 1/4 est '
        + 'plus petit que 1/3, parce qu\'on a partagé le même tout en davantage de '
        + 'morceaux. Un grand nombre en bas ne fait pas une grande fraction.',
    },
    {
      type: 'remarque',
      titre: 'Avec des nombres négatifs',
      texte:
        'Écris le signe **au numérateur** : −5/6 s\'écrit (−5)/6. La règle ne change '
        + 'alors plus du tout — on compare les numérateurs, signe compris.\n'
        + 'Un rationnel négatif est toujours plus petit qu\'un rationnel positif. Et '
        + 'entre deux négatifs, le **plus loin de zéro** est le plus petit.',
    },
    {
      type: 'exemple',
      texte:
        '5/8 = 15/24 et 7/12 = 14/24, donc 5/8 > 7/12.\n'
        + '−5/6 = −15/18 et −7/9 = −14/18, donc −5/6 < −7/9.\n'
        + '6/9 et 2/3 sont deux écritures du même nombre : 6/9 = 2/3.\n'
        + '17/4 = 4,25, donc 4 < 17/4 < 5. Et −11/4 = −2,75, donc −3 < −11/4 < −2.',
    },
  ],

  // La méthode prend exprès deux fractions NÉGATIVES : c'est le cas où le
  // résultat surprend (−5/6 < −7/9 alors que 5/6 > 7/9), donc celui où la
  // rédaction ligne à ligne sert vraiment à quelque chose.
  methode: {
    titre: 'Comparer deux fractions négatives',
    enonce: 'Comparer −5/6 et −7/9.',
    etapes: [
      {
        texte: 'Je cherche un dénominateur commun à 6 et 9 : 18 convient, car 6 × 3 = 18 et 9 × 2 = 18.',
        note: 'On prend le plus petit multiple commun quand on le voit ; sinon 6 × 9 = 54 marcherait aussi.',
      },
      {
        texte: 'Je réécris les deux fractions sur 18, en gardant le signe au numérateur : −5/6 = −15/18 et −7/9 = −14/18.',
        note: 'Le numérateur est multiplié par le MÊME nombre que le dénominateur.',
      },
      { texte: 'Je compare les numérateurs : −15 < −14.', note: 'Chez les négatifs, le plus loin de zéro est le plus petit.' },
      { texte: 'Donc −5/6 < −7/9.', note: '' },
    ],
    controle:
      'Le contrôle : place les deux nombres sur une droite graduée, au moins de '
      + 'tête. −5/6 et −7/9 sont tous les deux entre −1 et 0, mais −5/6 est plus '
      + 'près de −1. Il est donc plus à gauche, donc plus petit. Si ton symbole dit '
      + 'le contraire de la droite graduée, c\'est le symbole qui a tort.',
  },

  entrainement: [
    {
      // NEUTRE : les dénominateurs sont DÉJÀ égaux, donc comparer les
      // numérateurs est ici la bonne méthode. Sans cet item, « il faut toujours
      // changer les dénominateurs » deviendrait un réflexe coûteux.
      id: 'e-4-1-1', type: 'comparer', palier: 1, neutre: true, piege: 'comparaison-par-les-numerateurs',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{3}{7} \\ldots \\dfrac{5}{7}', attendu: '<',
    },
    {
      id: 'e-4-1-2', type: 'comparer', palier: 1, piege: 'grand-denominateur-grande-fraction',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{1}{3} \\ldots \\dfrac{1}{5}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'grand-denominateur-grande-fraction' }],
    },
    {
      // Neutre : ici lire seulement les numérateurs (2 < 3) donne la BONNE
      // réponse, alors que c'est la mauvaise méthode. Sans cet item, l'élève
      // apprendrait la contre-stratégie « la comparaison des numérateurs est
      // toujours à inverser » — aussi fausse que le piège lui-même.
      id: 'e-4-1-3', type: 'comparer', palier: 1, neutre: true, piege: 'comparaison-par-les-numerateurs',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{2}{5} \\ldots \\dfrac{3}{4}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'grand-denominateur-grande-fraction' }],
    },
    {
      id: 'e-4-1-4', type: 'comparer', palier: 2, piege: 'comparaison-par-les-numerateurs',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{3}{4} \\ldots \\dfrac{5}{7}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'comparaison-par-les-numerateurs' }],
    },
    {
      id: 'e-4-1-5', type: 'trous', palier: 2, piege: 'denominateur-non-reporte',
      consigne: 'Complète pour obtenir deux fractions égales à celles de départ.',
      enonce: '\\dfrac{3}{4} = \\dfrac{\\square}{20} \\qquad \\dfrac{4}{5} = \\dfrac{\\square}{20}',
      champs: [{ id: 'a', attendu: 15 }, { id: 'b', attendu: 16 }],
      fausses: [
        { valeur: 3, piege: 'denominateur-non-reporte' },
        { valeur: 4, piege: 'denominateur-non-reporte' },
      ],
    },
    {
      id: 'e-4-1-6', type: 'comparer', palier: 2, piege: 'signe-de-fraction-perdu',
      consigne: 'Compare ces deux nombres.',
      enonce: '-\\dfrac{3}{5} \\ldots -\\dfrac{2}{5}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'signe-de-fraction-perdu' }],
    },
    {
      // Second neutre, pour l'autre piège : le plus grand dénominateur donne
      // bien ici la plus grande fraction (5/8 > 1/2). Sans lui, « le plus grand
      // dénominateur, c'est toujours la plus petite fraction » remplacerait une
      // règle fausse par une autre. L'item n'est pas plus facile : il faut
      // quand même passer 1/2 sur 8.
      id: 'e-4-1-7', type: 'comparer', palier: 2, neutre: true, piege: 'grand-denominateur-grande-fraction',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{5}{8} \\ldots \\dfrac{1}{2}', attendu: '>',
    },
    {
      id: 'e-4-1-8', type: 'comparer', palier: 3, piege: 'signe-de-fraction-perdu',
      consigne: 'Compare ces deux nombres.',
      enonce: '-\\dfrac{7}{10} \\ldots -\\dfrac{2}{3}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'signe-de-fraction-perdu' }],
    },
    {
      id: 'e-4-1-9', type: 'corriger', palier: 3, piege: 'denominateur-non-reporte',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{3}{5} \\ldots \\dfrac{4}{7}',
      lignes: [
        { texte: 'Je choisis 35 comme dénominateur commun.', fausse: false },
        { texte: '3/5 = 3/35 et 4/7 = 4/35', fausse: true },
        { texte: '3 < 4, donc 3/5 < 4/7', fausse: false },
      ],
      explication:
        'La deuxième ligne casse tout : pour passer de 5 à 35, on multiplie par 7 — '
        + 'il faut donc multiplier le numérateur par 7 lui aussi. On obtient '
        + '3/5 = 21/35 et 4/7 = 20/35, donc **3/5 > 4/7**. La troisième ligne '
        + 'raisonne juste, mais sur des fractions déjà fausses.',
    },
    {
      id: 'e-4-1-10', type: 'vraifaux', palier: 3, piege: 'grand-denominateur-grande-fraction',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Si deux fractions ont le même numérateur, la plus grande est celle qui a le plus grand dénominateur.',
      attendu: false,
      contreExemple: {
        invite: 'Prends 1 comme numérateur, et donne deux dénominateurs : le premier plus petit que le second.',
        champs: [
          { id: 'a', etiquette: 'premier dénominateur' },
          { id: 'b', etiquette: 'second dénominateur' },
        ],
        // On vérifie la PROPRIÉTÉ — deux dénominateurs entiers dont le plus
        // grand donne la plus petite fraction — et non un couple unique : 2 et
        // 3, 3 et 8, 5 et 100… conviennent tous.
        valide: (a, b) => Number.isInteger(a) && Number.isInteger(b)
          && a > 0 && b > 0 && a < b && 1 / a > 1 / b,
        exemple: '1/3 et 1/8 : 8 est plus grand que 3, et pourtant 1/8 est plus petit que 1/3.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-4-1-1',
      enonce:
        'Deux classes ont répondu à un sondage sur le sport en club. En 4e A, '
        + '9 élèves sur 24 en font. En 4e B, 7 élèves sur 20.',
      questions: [
        { texte: 'Écris la proportion de la 4e A avec 120 pour dénominateur : quel numérateur obtiens-tu ?', attendu: 45 },
        { texte: 'Même question pour la 4e B.', attendu: 42 },
        { texte: 'Combien de cent-vingtièmes séparent les deux classes ?', attendu: 3 },
      ],
    },
    {
      id: 'p-4-1-2',
      enonce:
        'Trois objets reposent sous la mer. Leurs profondeurs, en centaines de '
        + 'mètres, valent −3/4 pour le plongeur, −5/6 pour le sous-marin et −1/2 '
        + 'pour l\'épave.',
      questions: [
        { texte: 'Écris la profondeur du plongeur avec 12 pour dénominateur : quel numérateur ?', attendu: -9 },
        { texte: 'Même question pour le sous-marin.', attendu: -10 },
        { texte: 'Lequel est le plus profond ? Réponds 1 pour le plongeur, 2 pour le sous-marin, 3 pour l\'épave.', attendu: 2 },
      ],
    },
    {
      id: 'p-4-1-3',
      enonce:
        'Trois briques de jus de fruits annoncent leur part de jus pur : 5/8 pour '
        + 'la première, 3/5 pour la deuxième, 7/10 pour la troisième.',
      questions: [
        { texte: 'Écris la part de la première avec 40 pour dénominateur : quel numérateur ?', attendu: 25 },
        { texte: 'Même question pour la troisième.', attendu: 28 },
        { texte: 'Combien de quarantièmes séparent la plus concentrée de la moins concentrée ?', attendu: 4 },
      ],
    },
    {
      id: 'p-4-1-4',
      enonce:
        'Un congélateur affiche −11/4 °C et un réfrigérateur −5/2 °C. On veut '
        + 'situer ces températures entre deux entiers, puis savoir lequel est le '
        + 'plus froid.',
      questions: [
        { texte: 'Pour −11/4, quel est l\'entier juste en dessous ?', attendu: -3, unite: '°C' },
        { texte: 'Et l\'entier juste au-dessus ?', attendu: -2, unite: '°C' },
        { texte: 'Lequel est le plus froid ? Réponds 1 pour le congélateur, 2 pour le réfrigérateur.', attendu: 1 },
      ],
    },
    {
      id: 'p-4-1-5',
      enonce:
        'Un ruban mesure 17/4 de mètre et un tuyau 23/6 de mètre. Pour les '
        + 'comparer, on décide de tout exprimer en douzièmes de mètre.',
      questions: [
        { texte: 'Combien de douzièmes de mètre mesure le ruban ?', attendu: 51 },
        { texte: 'Et le tuyau ?', attendu: 46 },
        { texte: 'Lequel est le plus long ? Réponds 1 pour le ruban, 2 pour le tuyau.', attendu: 1 },
      ],
    },
  ],

  test: [
    {
      id: 't-4-1-1', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{2}{9} \\ldots \\dfrac{5}{9}', attendu: '<', revoir: 'propriete',
    },
    {
      id: 't-4-1-2', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{1}{4} \\ldots \\dfrac{1}{7}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'grand-denominateur-grande-fraction' }],
      revoir: 'remarque',
    },
    {
      id: 't-4-1-3', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{2}{3} \\ldots \\dfrac{5}{8}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'comparaison-par-les-numerateurs' }],
      revoir: 'propriete',
    },
    {
      id: 't-4-1-4', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{4}{7} \\ldots \\dfrac{5}{9}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'comparaison-par-les-numerateurs' }],
      revoir: 'propriete',
    },
    {
      id: 't-4-1-5', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '-\\dfrac{2}{3} \\ldots \\dfrac{1}{4}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'signe-de-fraction-perdu' }],
      revoir: 'remarque',
    },
    {
      id: 't-4-1-6', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '-\\dfrac{5}{4} \\ldots -\\dfrac{7}{6}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'signe-de-fraction-perdu' }],
      revoir: 'remarque',
    },
    {
      id: 't-4-1-7', type: 'trous', consigne: 'Complète pour obtenir une fraction égale.',
      enonce: '\\dfrac{2}{5} = \\dfrac{\\square}{35}', champs: [{ id: 'a', attendu: 14 }],
      fausses: [{ valeur: 2, piege: 'denominateur-non-reporte' }],
      revoir: 'propriete',
    },
    {
      id: 't-4-1-8', type: 'trous', consigne: 'Encadre par deux entiers qui se suivent.',
      enonce: 'a < \\dfrac{17}{4} < b', champs: [{ id: 'a', attendu: 4 }, { id: 'b', attendu: 5 }],
      revoir: 'propriete',
    },
    {
      // L'encadrement d'un négatif : c'est là que « l'entier juste en dessous »
      // cesse d'être « le début du nombre » — −11/4 vaut −2,75, et l'entier du
      // dessous est −3, pas −2.
      id: 't-4-1-9', type: 'trous', consigne: 'Encadre par deux entiers qui se suivent.',
      enonce: 'a < -\\dfrac{11}{4} < b', champs: [{ id: 'a', attendu: -3 }, { id: 'b', attendu: -2 }],
      revoir: 'remarque',
    },
    {
      // Le seul item dont la réponse est « = ». Il interdit la stratégie « on me
      // demande de comparer, donc l'un des deux est plus grand ».
      id: 't-4-1-10', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{6}{9} \\ldots \\dfrac{8}{12}', attendu: '=',
      fausses: [{ valeur: '<', piege: 'comparaison-par-les-numerateurs' }],
      revoir: 'exemple',
    },
  ],
};
