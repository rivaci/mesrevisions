// Chapitre 9, savoir-faire 5 — Résoudre un problème avec des produits de fractions.
//
// Celui qui clôt le chapitre. La technique est acquise depuis sf-9-1 : ce qui
// se joue ici, c'est de RECONNAÎTRE le produit dans un énoncé qui ne l'écrit
// pas. « Les deux tiers des trois quarts » ne contient aucun signe ×, et c'est
// pourtant un produit ; « combien de bouteilles de 3/4 de litre dans 6 litres »
// ne contient aucun ÷, et c'est pourtant un quotient.
//
// ── Ce que le chapitre 4 a laissé derrière lui ────────────────────────────
//
// Le chapitre 4 a installé un geste — mettre au même dénominateur — et ce geste
// est ici au mieux inutile, au pire la source de l'erreur. Le savoir-faire ne
// se contente donc pas de dire « pour multiplier, pas de dénominateur commun » :
// l'item `corriger` montre une copie où la réduction au même dénominateur est
// JUSTE et où c'est la ligne suivante qui casse. C'est plus honnête, et ça
// désigne le vrai coupable — le réflexe transporté, pas un calcul faux.
//
// ── Le contrôle qui porte tout le savoir-faire ────────────────────────────
//
// « Le résultat sera-t-il plus grand ou plus petit que ce dont je pars ? » Cette
// question ne coûte aucun calcul et attrape la majorité des erreurs de ce
// chapitre : un produit de deux fractions inférieures à 1 qui dépasse 1, une
// division qui rapetisse, une recette agrandie qui rétrécit. Elle est donc dans
// le cours, dans la méthode, et travaillée par trois items.
//
// ── Le neutre, et pourquoi il est indispensable ───────────────────────────
//
// Le danger de ce savoir-faire, c'est de remplacer une règle fausse (« multiplier
// agrandit ») par une autre (« multiplier une fraction, ça rapetisse toujours »).
// L'item neutre est donc une recette multipliée par 3/2 : le produit AUGMENTE,
// et l'élève qui a transformé le contrôle en automatisme se fait prendre.

export default {
  id: 'sf-9-5',
  titre: 'Résoudre un problème avec des produits de fractions',
  attendus: ['Il résout des problèmes mettant en jeu des produits et quotients de rationnels.'],

  // On ne dit pas « le mot de se traduit par × » : on fait compter des carrés
  // jusqu'à ce que le produit apparaisse tout seul. Douze carrés, c'est assez
  // pour que les quarts ET les tiers tombent juste, et assez peu pour qu'on
  // puisse compter sur ses doigts.
  decouvrir: {
    titre: 'Les deux tiers des trois quarts',
    texte:
      'Une plaque de chocolat compte 12 carrés. Les 3/4 de la plaque sont au '
      + 'lait, le reste est noir. Lina mange les 2/3 de la partie au lait.',
    lignes: [
      { calcul: 'la plaque entière', resultat: '12 carrés' },
      { calcul: '1/4 de la plaque', resultat: '3 carrés' },
      { calcul: '1/3 de la plaque', resultat: '4 carrés' },
    ],
    question:
      'Compte toi-même : combien de carrés font les 3/4 de la plaque, et combien '
      + 'Lina en mange-t-elle ?',
    champs: [
      { id: 'a', etiquette: 'carrés au lait (les 3/4) :', attendu: 9 },
      { id: 'b', etiquette: 'carrés mangés par Lina :', attendu: 6 },
    ],
    conclusion:
      'Lina a mangé 6 carrés sur 12, c\'est-à-dire **la moitié** de la plaque. Or '
      + '« les deux tiers **des** trois quarts », c\'est 2/3 × 3/4 : le petit mot '
      + '« de » cachait une **multiplication**. On vient donc de vérifier, en '
      + 'comptant, que 2/3 × 3/4 = **1/2**.\n'
      + 'Remarque au passage que 1/2 est plus petit que 2/3 **et** plus petit que '
      + '3/4 : prendre une part d\'une part, ça ne peut que **diminuer**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le mot « de » cache un produit',
      texte:
        'Prendre les **a/b** d\'une quantité, c\'est **multiplier** cette quantité '
        + 'par a/b.\n'
        + '« Les deux tiers **des** trois quarts d\'une plaque » s\'écrit donc '
        + '2/3 × 3/4 de la plaque. Le second « tout » n\'est plus la plaque entière : '
        + 'c\'est la part dont on parle.',
    },
    {
      type: 'propriete',
      titre: 'Multiplier deux fractions',
      texte:
        'On multiplie les **numérateurs** entre eux et les **dénominateurs** entre '
        + 'eux :\n'
        + 'a/b × c/d = (a × c)/(b × d).\n'
        + 'Aucun dénominateur commun n\'est nécessaire — c\'était la règle de '
        + 'l\'**addition**, pas celle du produit. On simplifie le résultat au '
        + 'maximum ; on peut même simplifier **avant** de multiplier, pour ne pas '
        + 'traîner de gros nombres.',
    },
    {
      type: 'propriete',
      titre: 'Diviser par une fraction',
      texte:
        'Diviser par une fraction, c\'est **multiplier par son inverse**. '
        + 'L\'inverse de c/d est d/c : leur produit vaut 1.\n'
        + 'a/b ÷ c/d = a/b × d/c.\n'
        + 'C\'est la **seconde** fraction — celle qui divise — qu\'on retourne. La '
        + 'première ne bouge pas. Et l\'inverse n\'est pas l\'opposé : l\'opposé '
        + 'change le signe, l\'inverse retourne la fraction.',
    },
    {
      // La remarque la plus utile du savoir-faire : elle donne un contrôle qui
      // ne coûte aucun calcul, et elle énonce les DEUX sens — sans quoi l'élève
      // remplace « multiplier agrandit » par « multiplier rapetisse », ce qui
      // est tout aussi faux.
      type: 'remarque',
      titre: 'Plus grand, ou plus petit ?',
      texte:
        'Avant de calculer, demande-toi où doit tomber le résultat.\n'
        + 'Multiplier par une fraction **plus petite que 1** donne un résultat '
        + '**plus petit** : prendre les trois quarts de quelque chose, c\'est en '
        + 'enlever un peu.\n'
        + 'Multiplier par une fraction **plus grande que 1** donne un résultat '
        + '**plus grand** : une recette multipliée par 3/2, c\'est une fois et '
        + 'demie plus.\n'
        + 'Diviser fait exactement l\'inverse : diviser par une fraction plus '
        + 'petite que 1 **agrandit**.',
    },
    {
      type: 'exemple',
      texte:
        'Les 3/7 des 7/9 d\'un budget : 3/7 × 7/9 = 21/63 = 1/3.\n'
        + '4/5 ÷ 2/7 = 4/5 × 7/2 = 28/10 = 14/5.\n'
        + 'Combien de bouteilles de 2/3 de litre dans 12 litres ? 12 ÷ 2/3 = 12 × 3/2 = 18.',
    },
  ],

  methode: {
    titre: 'Traduire « les … des … » en un produit',
    enonce:
      'Dans une bibliothèque, les 5/8 des livres sont des romans, et les 2/5 de '
      + 'ces romans sont des policiers. Quelle fraction de la bibliothèque les '
      + 'romans policiers représentent-ils ?',
    etapes: [
      {
        texte: 'Je traduis le mot « de » : les 2/5 des 5/8, cela s\'écrit 2/5 × 5/8.',
        note: 'Le second tout n\'est plus la bibliothèque, c\'est la part des romans.',
      },
      {
        texte: 'Je multiplie les numérateurs entre eux et les dénominateurs entre eux : (2 × 5)/(5 × 8) = 10/40.',
        note: 'Aucun dénominateur commun à chercher : c\'était pour l\'addition.',
      },
      {
        texte: 'Je simplifie : 10 et 40 se divisent tous les deux par 10, donc 10/40 = 1/4.',
        note: 'On pouvait simplifier avant : le 5 du haut et le 5 du bas se compensent.',
      },
      {
        texte: 'Les romans policiers représentent 1/4 de la bibliothèque.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : les deux fractions sont plus petites que 1, donc le résultat '
      + 'doit être plus petit que chacune d\'elles. 1/4 est bien en dessous de 2/5 '
      + 'et de 5/8 : c\'est cohérent. Un résultat comme 7/13 — les numérateurs et '
      + 'les dénominateurs additionnés — dépasserait 2/5, donc serait impossible. '
      + 'Cette question se pose en deux secondes et attrape presque toutes les '
      + 'erreurs de ce chapitre.',
  },

  entrainement: [
    {
      // Le tout premier item du savoir-faire, et il est placé exactement là où
      // le réflexe du chapitre 4 va se déclencher : deux dénominateurs
      // différents, l'envie de les rendre égaux. Le résultat se simplifie, ce
      // qui interdit de s'arrêter à 6/15.
      id: 'e-9-5-1', type: 'fraction', palier: 1, piege: 'denominateur-commun-pour-multiplier',
      consigne:
        'Les 3/5 d\'un potager sont plantés, et les 2/3 de cette partie plantée '
        + 'sont des tomates. Quelle fraction du potager les tomates occupent-elles ?',
      enonce: '\\dfrac{2}{3} \\times \\dfrac{3}{5}', attendu: [2, 5],
    },
    {
      // Une fraction d'une fraction d'une QUANTITÉ : c'est la forme la plus
      // fréquente en contrôle, et celle où l'on oublie que la seconde fraction
      // porte sur la partie, pas sur le total.
      id: 'e-9-5-2', type: 'calcul', palier: 1, piege: 'produit-de-fractions-plus-grand',
      consigne:
        'Un panneau d\'affichage a une surface de 30 m². Les 5/6 de cette surface '
        + 'sont couverts d\'affiches, et les 2/5 de la partie couverte sont des '
        + 'affiches en couleur. Quelle est l\'aire, en m², des affiches en couleur ?',
      enonce: '\\dfrac{2}{5} \\times \\dfrac{5}{6} \\text{ de } 30', attendu: 10,
    },
    {
      // L'inverse travaillé seul, avant qu'il serve dans un problème : c'est
      // l'étape où l'on écrit −3/4 au lieu de 4/3. Trois champs, donc pas de
      // `fausses` — un diagnostic ne saurait pas lequel des trois a échoué.
      id: 'e-9-5-3', type: 'trous', palier: 1, piege: 'inverse-et-oppose-confondus',
      consigne:
        'Un bidon contient 6 L de sirop. On le répartit dans des bouteilles de '
        + '3/4 de litre. Complète la transformation, puis donne le nombre de bouteilles.',
      enonce: '6 \\div \\dfrac{3}{4} = 6 \\times \\dfrac{\\square}{\\square} = \\square',
      champs: [
        { id: 'a', etiquette: 'numérateur de l\'inverse de 3/4', attendu: 4 },
        { id: 'b', etiquette: 'dénominateur de l\'inverse de 3/4', attendu: 3 },
        { id: 'c', etiquette: 'nombre de bouteilles', attendu: 8 },
      ],
    },
    {
      // Les deux erreurs de la division sont ici séparables par le seul
      // résultat : 3/10 vient d'un produit sans retournement, 8/15 d'un
      // retournement de la mauvaise fraction. Le diagnostic est sans ambiguïté.
      id: 'e-9-5-4', type: 'fraction', palier: 2, piege: 'division-terme-a-terme',
      consigne:
        'Un flacon A contient 3/4 de litre, un flacon B contient 2/5 de litre. '
        + 'Combien de fois le contenu du flacon B tient-il dans celui du flacon A ? '
        + 'Donne le résultat sous forme de fraction.',
      enonce: '\\dfrac{3}{4} \\div \\dfrac{2}{5}', attendu: [15, 8],
      fausses: [
        { valeur: '6/20', piege: 'division-terme-a-terme' },
        { valeur: '3/10', piege: 'division-terme-a-terme' },
        { valeur: '8/15', piege: 'mauvaise-fraction-inversee' },
      ],
    },
    {
      // Item neutre : le facteur 3/2 est PLUS GRAND que 1, donc le produit
      // augmente et le piège « un produit de fractions rapetisse » ne joue pas
      // — c'est même le contraire qui se produit. Sans cet item, le contrôle du
      // cours deviendrait une règle aveugle (« il y a une fraction, donc ça
      // diminue ») et l'élève refuserait un résultat parfaitement juste.
      // Il n'est pas plus facile pour autant : il faut savoir d'où sort le 3/2.
      id: 'e-9-5-5', type: 'plausible', palier: 2, neutre: true, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '300 \\times \\dfrac{3}{2} = 450', attendu: true,
      explication:
        'Une recette pour 4 personnes qu\'on refait pour 6, ce sont toutes les '
        + 'quantités multipliées par 6/4, c\'est-à-dire par 3/2. Et 3/2 est plus '
        + 'grand que 1 : le résultat doit **augmenter**. Le calcul confirme : '
        + '300 × 3 = 900, puis 900 ÷ 2 = 450. Multiplier par une fraction ne '
        + 'diminue que si cette fraction est plus petite que 1.',
    },
    {
      id: 'e-9-5-6', type: 'plausible', palier: 2, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5}{6} \\times \\dfrac{3}{4} = \\dfrac{5}{4}', attendu: false,
      explication:
        'Les deux facteurs sont plus petits que 1, donc leur produit est plus petit '
        + 'que chacun d\'eux — et en particulier plus petit que 1. Or 5/4 dépasse 1 : '
        + 'impossible. Prendre les trois quarts de quelque chose ne peut pas '
        + 'l\'agrandir. Le vrai résultat est (5 × 3)/(6 × 4) = 15/24 = 5/8.',
    },
    {
      // Comparer sans calculer : c'est le contrôle du cours transformé en
      // exercice. Répondre « > » n'est pas une étourderie, c'est exactement la
      // conception « multiplier agrandit toujours ».
      id: 'e-9-5-7', type: 'comparer', palier: 2, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{2}{3} \\times \\dfrac{4}{7} \\ldots \\dfrac{4}{7}',
      attendu: '<',
      fausses: [{ valeur: '>', piege: 'produit-de-fractions-plus-grand' }],
    },
    {
      // La copie est plus intéressante qu'une simple erreur de calcul : la
      // réduction au même dénominateur y est JUSTE. Ce qui est en cause, c'est
      // la ligne suivante, où le dénominateur n'est recopié qu'une fois — le
      // geste de l'addition, transporté tel quel dans un produit.
      id: 'e-9-5-8', type: 'corriger', palier: 3, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{3}{4} \\times \\dfrac{2}{9}',
      lignes: [
        { texte: 'Les 2/9 des 3/4 d\'un stock, cela s\'écrit 3/4 × 2/9.', fausse: false },
        { texte: 'Je mets les deux fractions sur 36 : 3/4 = 27/36 et 2/9 = 8/36.', fausse: false },
        { texte: 'Je multiplie les numérateurs et je garde le dénominateur : 216/36.', fausse: true },
        { texte: 'Soit 216 ÷ 36 = 6.', fausse: false },
      ],
      explication:
        'La deuxième ligne est juste — 3/4 vaut bien 27/36 et 2/9 vaut bien 8/36 — '
        + 'mais elle ne sert à rien : un produit n\'a pas besoin de dénominateur '
        + 'commun. C\'est à la troisième que ça casse. « Garder le dénominateur », '
        + 'c\'est la règle de l\'**addition** ; dans un produit, les dénominateurs '
        + 'se multiplient eux aussi. Le contrôle le criait : deux fractions plus '
        + 'petites que 1 ne peuvent pas donner 6. Directement : '
        + '(3 × 2)/(4 × 9) = 6/36 = **1/6**.',
    },
    {
      id: 'e-9-5-9', type: 'vraifaux', palier: 3, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Multiplier un nombre par une fraction donne toujours un résultat plus petit que ce nombre.',
      attendu: false,
      contreExemple: {
        invite:
          'Trouve une fraction telle que 12 multiplié par cette fraction dépasse 12. '
          + 'Donne son numérateur, puis son dénominateur.',
        champs: [
          { id: 'a', etiquette: 'numérateur' },
          { id: 'b', etiquette: 'dénominateur' },
        ],
        // On vérifie la PROPRIÉTÉ — le produit dépasse 12 — et non une réponse
        // imposée : toute fraction plus grande que 1 convient, et l'élève
        // fabrique la sienne.
        valide: (a, b) => b > 0 && 12 * (a / b) > 12,
        temoin: [5, 2],
        exemple:
          '12 × 5/2 = 30, qui dépasse 12. Dès que la fraction est plus grande que 1, '
          + 'le produit augmente.',
      },
    },
    {
      // Deuxième division, avec un quotient plus grand que le nombre de départ
      // (3/2 > 9/10) : diviser par une fraction plus petite que 1 agrandit.
      // Les deux réponses fausses trient les deux confusions de la division.
      id: 'e-9-5-10', type: 'fraction', palier: 3, piege: 'mauvaise-fraction-inversee',
      consigne:
        'Une bouteille contient 9/10 de litre de jus. On la verse dans des verres '
        + 'de 3/5 de litre. Combien de verres cela remplit-il ? Donne le résultat '
        + 'sous forme de fraction.',
      enonce: '\\dfrac{9}{10} \\div \\dfrac{3}{5}', attendu: [3, 2],
      fausses: [
        { valeur: '2/3', piege: 'mauvaise-fraction-inversee' },
        { valeur: '27/50', piege: 'division-terme-a-terme' },
      ],
    },
  ],

  problemes: [
    {
      // La recette agrandie : le seul contexte où l'élève accepte spontanément
      // qu'une multiplication par une fraction fasse GRANDIR. On commence par
      // là, avant les fractions d'une fraction.
      id: 'p-9-5-1',
      enonce:
        'Une recette de crêpes prévue pour 8 personnes demande 500 g de farine et '
        + '6 œufs. Théo la prépare pour 12 personnes : il multiplie donc toutes '
        + 'les quantités par 12/8, c\'est-à-dire par 3/2.',
      questions: [
        { texte: 'Combien de grammes de farine lui faut-il ?', attendu: 750, unite: 'g' },
        { texte: 'Combien d\'œufs lui faut-il ?', attendu: 9, unite: 'œufs' },
      ],
    },
    {
      id: 'p-9-5-2',
      enonce:
        'Un collège compte 480 élèves. Les 3/8 de ces élèves sont en quatrième, '
        + 'et les 2/3 des quatrièmes apprennent l\'allemand.',
      questions: [
        { texte: 'Combien d\'élèves sont en quatrième ?', attendu: 180, unite: 'élèves' },
        { texte: 'Combien de quatrièmes apprennent l\'allemand ?', attendu: 120, unite: 'élèves' },
        { texte: 'Ces germanistes de quatrième représentent 1/n du collège. Combien vaut n ?', attendu: 4 },
      ],
    },
    {
      // Partages successifs : la fraction de Bruno se calcule sur la part
      // d'Ana, pas sur le terrain. Les trois réponses sont distinctes, donc une
      // confusion de « tout » se voit tout de suite. L'énoncé dit « une autre
      // part » : sans ça, on pouvait comprendre que Bruno prend son bien DANS
      // celui d'Ana, et la troisième question avait deux réponses défendables.
      id: 'p-9-5-3',
      enonce:
        'Un terrain de 800 m² est partagé. Ana en reçoit les 2/5. Bruno reçoit '
        + 'une autre part, dont l\'aire vaut les 5/8 de celle d\'Ana, et le reste '
        + 'du terrain n\'est attribué à personne.',
      questions: [
        { texte: 'Quelle est l\'aire de la part d\'Ana ?', attendu: 320, unite: 'm²' },
        { texte: 'Quelle est l\'aire de la part de Bruno ?', attendu: 200, unite: 'm²' },
        { texte: 'Quelle aire n\'est attribuée à personne ?', attendu: 280, unite: 'm²' },
      ],
    },
    {
      id: 'p-9-5-4',
      enonce:
        'Un pâtissier dispose de 12 kg de pâte. Chaque tarte demande 3/4 de kilo '
        + 'de pâte.',
      questions: [
        { texte: 'Combien de tartes peut-il préparer ?', attendu: 16, unite: 'tartes' },
        { texte: 'S\'il ne lui restait que 9 kg de pâte, combien de tartes préparerait-il ?', attendu: 12, unite: 'tartes' },
      ],
    },
    {
      // Le même contexte donne une multiplication puis une division : c'est la
      // seule façon de vérifier que l'élève choisit l'opération au lieu de
      // répéter celle de la question précédente.
      id: 'p-9-5-5',
      enonce:
        'Une boisson se prépare en mélangeant du sirop et de l\'eau : pour 1 litre '
        + 'de boisson, il faut 1/5 de litre de sirop.',
      questions: [
        { texte: 'Sacha prépare 15 L de boisson. Combien de litres de sirop lui faut-il ?', attendu: 3, unite: 'L' },
        { texte: 'Il ne dispose en fait que de 2 L de sirop. Combien de litres de boisson peut-il préparer au maximum ?', attendu: 10, unite: 'L' },
      ],
    },
  ],

  test: [
    {
      id: 't-9-5-1', type: 'fraction',
      consigne: 'Les 3/8 des 4/9 d\'un stock. Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{8} \\times \\dfrac{4}{9}', attendu: [1, 6],
      piege: 'denominateur-commun-pour-multiplier', revoir: 'propriete',
    },
    {
      id: 't-9-5-2', type: 'calcul',
      consigne:
        'Une salle compte 42 places. Les 5/7 sont occupées, et les 3/5 des places '
        + 'occupées le sont par des adultes. Combien d\'adultes sont présents ?',
      enonce: '\\dfrac{3}{5} \\times \\dfrac{5}{7} \\text{ de } 42', attendu: 18,
      revoir: 'definition',
    },
    {
      id: 't-9-5-3', type: 'fraction',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{5}{6} \\div \\dfrac{2}{3}', attendu: [5, 4],
      fausses: [
        { valeur: '10/18', piege: 'division-terme-a-terme' },
        { valeur: '4/5', piege: 'mauvaise-fraction-inversee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-9-5-4', type: 'trous',
      consigne: 'Complète avec l\'inverse de 7/3, de façon que le produit vaille 1.',
      enonce: '\\dfrac{7}{3} \\times \\dfrac{\\square}{\\square} = 1',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: 3 },
        { id: 'b', etiquette: 'dénominateur', attendu: 7 },
      ],
      piege: 'inverse-et-oppose-confondus', revoir: 'propriete',
    },
    {
      id: 't-9-5-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{4}{5} \\times \\dfrac{7}{8} = \\dfrac{11}{13}', attendu: false,
      explication:
        'Les deux facteurs sont plus petits que 1, donc le produit doit être plus '
        + 'petit que chacun d\'eux. Or 11/13 dépasse 4/5. Ici les numérateurs ont '
        + 'été additionnés entre eux et les dénominateurs entre eux. Le vrai '
        + 'résultat est (4 × 7)/(5 × 8) = 28/40 = 7/10.',
      piege: 'produit-de-fractions-plus-grand', revoir: 'remarque',
    },
    {
      // Le pendant du neutre de l'entraînement : un facteur plus grand que 1,
      // donc un produit qui grandit, et un « oui » à donner.
      id: 't-9-5-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{3}{2}', attendu: true,
      explication:
        'Le second facteur, 9/4, est plus grand que 1 : le produit peut donc '
        + 'dépasser 2/3, et c\'est bien ce qui arrive. Le calcul confirme : '
        + '(2 × 9)/(3 × 4) = 18/12 = 3/2.',
      revoir: 'remarque',
    },
    {
      id: 't-9-5-7', type: 'calcul',
      consigne:
        'Un rouleau de 14 m de tissu est coupé en bandes de 7/8 de mètre. Combien '
        + 'de bandes obtient-on ?',
      enonce: '14 \\div \\dfrac{7}{8}', attendu: 16,
      piege: 'mauvaise-fraction-inversee', revoir: 'propriete',
    },
    {
      id: 't-9-5-8', type: 'comparer',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{5}{7} \\times \\dfrac{3}{8} \\ldots \\dfrac{3}{8}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'produit-de-fractions-plus-grand' }],
      revoir: 'remarque',
    },
    {
      id: 't-9-5-9', type: 'calcul',
      consigne:
        'Une recette pour 6 parts demande 240 g de sucre. On la prépare pour '
        + '9 parts : toutes les quantités sont multipliées par 3/2. Combien de '
        + 'grammes de sucre faut-il ?',
      enonce: '240 \\times \\dfrac{3}{2}', attendu: 360,
      piege: 'produit-de-fractions-plus-grand', revoir: 'exemple',
    },
    {
      id: 't-9-5-10', type: 'fraction',
      consigne: 'Les 7/10 des 5/14 d\'un budget. Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{7}{10} \\times \\dfrac{5}{14}', attendu: [1, 4],
      piege: 'denominateur-commun-pour-multiplier', revoir: 'definition',
    },
  ],
};
