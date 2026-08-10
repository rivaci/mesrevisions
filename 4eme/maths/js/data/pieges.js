// Les pièges : les confusions qui produisent les erreurs, et comment y répondre.
//
// Un piège n'est pas une erreur constatée, c'est la CONCEPTION qui la produit.
// « −2 + 5 = −7 » n'est pas une étourderie : c'est la règle des signes de la
// multiplication appliquée à une addition. Savoir laquelle des deux confusions
// a joué, c'est la différence entre corriger et expliquer.
//
// ── Comment un piège est atteint ──────────────────────────────────────────
//
// L'élève TAPE sa réponse — il ne choisit pas entre deux propositions. Chaque
// exercice liste les réponses fausses prévisibles (`fausses`) et le piège qui
// les produit. Quand la réponse tapée correspond à l'une d'elles, on sait
// quelle confusion a joué, sans jamais avoir montré la mauvaise réponse.
//
// Quand la réponse ne correspond à aucune erreur prévue, on ne devine pas :
// on demande à l'élève, et `raisonnements` sert de menu.
//
// ── Le champ `controle` ───────────────────────────────────────────────────
//
// C'est ce qui distingue cette appli d'un exerciseur : chaque piège porte un
// GESTE DE VÉRIFICATION que l'élève peut refaire seul, en contrôle, sans
// l'appli. La règle explique pourquoi c'était faux ; le contrôle lui donne le
// moyen de s'en apercevoir la prochaine fois.

export const PIEGES = {
  // ── Chapitre 1 : nombres relatifs ─────────────────────────────────────────

  'regle-des-signes-inversee': {
    nom: 'Signe du résultat inversé',
    chapitre: 1,
    regle:
      'Deux nombres de **même signe** donnent un résultat **positif**, deux nombres '
      + 'de **signes contraires** un résultat **négatif** — pour le produit comme '
      + 'pour le quotient.',
    controle:
      'Compte les facteurs négatifs : s\'ils sont en nombre pair, le résultat est positif.',
    raisonnements: [
      {
        id: 'moins-donne-moins',
        texte: 'Pour moi, dès qu\'il y a un « moins », le résultat est négatif',
        reponse:
          'C\'est vrai pour un seul facteur négatif, pas pour deux. (−2) × (−3) vaut '
          + '+6 : les deux « moins » se compensent, comme dans la suite de l\'activité.',
      },
      {
        id: 'regle-melangee',
        texte: 'J\'ai confondu avec la règle de l\'addition',
        reponse:
          'Ce sont bien deux règles différentes. Pour additionner −2 et 5, on se '
          + 'déplace sur une droite. Pour multiplier, on compte les facteurs négatifs.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Reprenons : combien de facteurs négatifs y a-t-il ?' },
    ],
  },

  'addition-au-lieu-du-produit': {
    nom: 'Addition à la place du produit',
    chapitre: 1,
    regle: 'Multiplier n\'est pas ajouter : 3 × 4 vaut 12, pas 7.',
    controle: 'Relis le signe de l\'opération avant de calculer : × ou + ?',
    raisonnements: [
      {
        id: 'lu-trop-vite',
        texte: 'J\'ai lu l\'opération trop vite',
        reponse: 'Ça arrive souvent avec les parenthèses, qui attirent l\'œil plus que le signe. Repère l\'opération d\'abord.',
      },
      {
        id: 'habitude-addition',
        texte: 'J\'ai l\'habitude d\'additionner les relatifs',
        reponse: 'C\'est ce qu\'on a fait toute la 5e, donc le réflexe est normal. Cette année, la multiplication arrive : les deux vont cohabiter.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Regarde le signe de l\'opération et recommence.' },
    ],
  },

  'multiplier-agrandit-toujours': {
    nom: 'Multiplier agrandit toujours',
    chapitre: 1,
    regle:
      'Multiplier par un nombre compris entre 0 et 1 **diminue** : 6 × 0,5 vaut 3. '
      + 'Ce n\'est plus vrai qu\'avec des facteurs supérieurs à 1.',
    controle: 'Demande-toi si le facteur est plus grand ou plus petit que 1 avant de prédire le résultat.',
    raisonnements: [
      {
        id: 'multiplier-agrandit',
        texte: 'Je pensais qu\'une multiplication donne toujours un plus grand nombre',
        reponse:
          'C\'était vrai en primaire, avec des entiers. Avec 0,5, multiplier revient '
          + 'à prendre la moitié — donc à diminuer.',
      },
      {
        id: 'erreur-de-calcul',
        texte: 'J\'ai compris, mais je me suis trompé dans le calcul',
        reponse: 'Le raisonnement est le plus dur, et tu l\'as. Reprends le calcul tranquillement.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Compare le facteur à 1 : plus petit, donc le résultat diminue.' },
    ],
  },

  'diviser-diminue-toujours': {
    nom: 'Diviser diminue toujours',
    chapitre: 1,
    regle:
      'Diviser par un nombre compris entre 0 et 1 **agrandit** : 6 ÷ 0,5 vaut 12, '
      + 'car il y a douze demis dans six.',
    controle: 'Multiplie ta réponse par le diviseur : tu dois retomber sur le nombre de départ.',
    raisonnements: [
      {
        id: 'diviser-diminue',
        texte: 'Je pensais qu\'une division donne toujours un plus petit nombre',
        reponse:
          'Diviser par 2, oui. Mais diviser par 0,5, c\'est demander « combien de '
          + 'demis ? » — et il y en a deux fois plus.',
      },
      {
        id: 'inverse-le-calcul',
        texte: 'J\'ai divisé dans l\'autre sens',
        reponse: 'Vérifie l\'ordre : le premier nombre est celui qu\'on partage.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Multiplie ta réponse par le diviseur pour vérifier.' },
    ],
  },

  'compte-les-facteurs-pas-les-negatifs': {
    nom: 'Nombre de facteurs confondu avec nombre de négatifs',
    chapitre: 1,
    regle:
      'Seuls les **facteurs négatifs** comptent, et seule la **parité** de leur '
      + 'nombre importe : pair → positif, impair → négatif.',
    controle: 'Entoure les facteurs négatifs, compte-les, et regarde si le compte est pair ou impair.',
    raisonnements: [
      {
        id: 'compte-tout',
        texte: 'J\'ai compté tous les facteurs, pas seulement les négatifs',
        reponse: 'Les facteurs positifs ne changent jamais le signe du résultat. Ils peuvent être ignorés pour cette question.',
      },
      {
        id: 'parite-inversee',
        texte: 'J\'ai inversé pair et impair',
        reponse: 'Retiens un cas simple : (−1) × (−1) = 1. Deux négatifs, c\'est pair, et c\'est positif.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Compte seulement les facteurs négatifs.' },
    ],
  },

  'un-negatif-suffit': {
    nom: 'Un facteur négatif rendrait tout négatif',
    chapitre: 1,
    regle: 'Un produit contenant des facteurs négatifs peut être positif : il suffit qu\'ils soient en nombre pair.',
    controle: 'Compte-les au lieu de repérer leur présence.',
    raisonnements: [
      {
        id: 'presence-suffit',
        texte: 'Je pensais qu\'un seul « moins » rendait tout le produit négatif',
        reponse: 'C\'est vrai s\'il n\'y en a qu\'un. Avec deux, ils se compensent : (−2) × (−3) = 6.',
      },
      {
        id: 'confusion-somme',
        texte: 'Je confonds avec les additions',
        reponse: 'Dans une somme, un grand nombre négatif peut effectivement tout faire basculer. Dans un produit, seule la parité compte.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Compte les facteurs négatifs.' },
    ],
  },

  'zero-oublie': {
    nom: 'Le facteur nul non repéré',
    chapitre: 1,
    regle: 'Si l\'un des facteurs est nul, le produit est nul — il n\'est ni positif ni négatif.',
    controle: 'Avant de compter les signes, vérifie qu\'aucun facteur n\'est zéro.',
    raisonnements: [
      {
        id: 'compte-sans-regarder',
        texte: 'J\'ai compté les signes sans regarder les nombres',
        reponse: 'C\'est le réflexe qu\'on vient d\'installer, et il est bon — mais le zéro passe avant tout le reste.',
      },
      {
        id: 'zero-a-un-signe',
        texte: 'Je pensais que zéro était positif',
        reponse: 'Zéro n\'est ni positif ni négatif : c\'est le seul nombre dans ce cas.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Regarde s\'il y a un zéro parmi les facteurs.' },
    ],
  },

  'calcul-de-gauche-a-droite': {
    nom: 'Calcul de gauche à droite sans priorités',
    chapitre: 1,
    regle:
      'Les multiplications et divisions se font **avant** les additions et '
      + 'soustractions, où qu\'elles se trouvent dans le calcul.',
    controle: 'Souligne d\'abord les multiplications et divisions, calcule-les, puis reprends.',
    raisonnements: [
      {
        id: 'ordre-de-lecture',
        texte: 'J\'ai calculé dans l\'ordre où c\'était écrit',
        reponse:
          'C\'est la bonne méthode quand toutes les opérations ont la même priorité. '
          + 'Dès qu\'une multiplication apparaît, elle passe devant.',
      },
      {
        id: 'signe-trompeur',
        texte: 'Les signes négatifs m\'ont embrouillé',
        reponse: 'Les signes des nombres ne changent rien à l\'ordre des opérations. Traite l\'ordre d\'abord, les signes ensuite.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Repère la multiplication et commence par elle.' },
    ],
  },

  'parenthese-ignoree': {
    nom: 'Parenthèse non calculée en premier',
    chapitre: 1,
    regle: 'Ce qui est entre parenthèses se calcule avant tout le reste.',
    controle: 'Réécris le calcul en remplaçant la parenthèse par sa valeur avant de continuer.',
    raisonnements: [
      {
        id: 'distribue-sans-y-penser',
        texte: 'J\'ai multiplié seulement le premier terme de la parenthèse',
        reponse: 'Le facteur porte sur toute la parenthèse. Le plus simple ici : calcule d\'abord ce qu\'il y a dedans.',
      },
      {
        id: 'parenthese-decorative',
        texte: 'Je n\'ai pas vu que la parenthèse changeait quelque chose',
        reponse: 'Elle change l\'ordre : sans elle, la multiplication passerait en premier.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Commence par ce qui est entre parenthèses.' },
    ],
  },

  'soustraire-un-negatif': {
    nom: 'Soustraire un nombre négatif',
    chapitre: 1,
    regle: 'Soustraire un nombre négatif revient à ajouter son opposé : 5 − (−6) = 5 + 6 = 11.',
    controle: 'Quand tu vois « − (− », transforme les deux signes en un « + » avant de calculer.',
    raisonnements: [
      {
        id: 'deux-moins-annulent',
        texte: 'Les deux moins m\'ont fait enlever quelque chose',
        reponse: 'Ils font l\'inverse : enlever une dette, c\'est gagner. 5 − (−6) donne 11, pas −1.',
      },
      {
        id: 'ignore-parenthese',
        texte: 'Je n\'ai pas vu la parenthèse',
        reponse: 'Elle change tout : 5 − 6 fait −1, mais 5 − (−6) fait 11.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: '« − (− » devient « + ».' },
    ],
  },

  'virgule-perdue': {
    nom: 'Virgule mal placée',
    chapitre: 1,
    regle: 'Le résultat d\'un produit de décimaux a autant de chiffres après la virgule que les deux facteurs réunis.',
    controle:
      'Fais l\'ordre de grandeur : 2,4 × 0,5 est proche de 2 × 0,5 = 1. Un résultat '
      + 'de 12 est dix fois trop grand.',
    raisonnements: [
      {
        id: 'calcul-entier',
        texte: 'J\'ai calculé comme si c\'étaient des entiers',
        reponse: 'Bonne méthode pour commencer — il reste à replacer la virgule. Compte les décimales des deux facteurs.',
      },
      {
        id: 'decalage',
        texte: 'Je me suis trompé d\'un rang',
        reponse: 'L\'ordre de grandeur l\'aurait attrapé tout de suite. Prends l\'habitude de l\'estimer avant.',
      },
      { id: 'hasard', texte: 'J\'ai répondu au hasard', reponse: 'Estime d\'abord l\'ordre de grandeur.' },
    ],
  },

  // ── Chapitre 2 : divisibilité et nombres premiers ─────────────────────────

  'un-est-premier': {
    nom: '1 compté parmi les nombres premiers',
    chapitre: 2,
    regle:
      'Un nombre premier a **exactement deux** diviseurs : 1 et lui-même. '
      + 'Or 1 n\'en a qu\'un seul — lui-même. Il n\'est donc pas premier.',
    controle: 'Compte les diviseurs. S\'il n\'y en a pas exactement deux, ce n\'est pas premier.',
    raisonnements: [
      {
        id: 'divisible-par-un-et-lui-meme',
        texte: '1 est divisible par 1 et par lui-même, donc il est premier',
        reponse:
          'Sauf que « 1 » et « lui-même » sont le même nombre ici : ça n\'en fait '
          + 'qu\'un. Il en faut deux différents.',
      },
      {
        id: 'plus-petit-donc-premier',
        texte: 'C\'est le plus petit, je pensais qu\'il ouvrait la liste',
        reponse: 'La liste commence à 2, qui est d\'ailleurs le seul nombre premier pair.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Compte les diviseurs de 1 : combien en trouves-tu ?' },
    ],
  },

  'impair-donc-premier': {
    nom: 'Tout nombre impair pris pour un nombre premier',
    chapitre: 2,
    regle:
      'Être impair ne suffit pas : 9 = 3 × 3, 15 = 3 × 5 et 21 = 3 × 7 sont impairs '
      + 'et pourtant pas premiers.',
    controle: 'Essaie de diviser par 3, 5, 7… avant de conclure. Un seul diviseur trouvé suffit à écarter.',
    raisonnements: [
      {
        id: 'pas-divisible-par-2',
        texte: 'Il n\'est pas divisible par 2, donc il est premier',
        reponse: '2 n\'est qu\'un diviseur possible parmi d\'autres. Essaie aussi 3, puis 5, puis 7.',
      },
      {
        id: 'termine-par-un-chiffre-impair',
        texte: 'Je me suis fié au dernier chiffre',
        reponse:
          'Le dernier chiffre écarte 2 et 5, c\'est déjà utile. Mais 3 et 7 ne se '
          + 'voient pas comme ça — il faut essayer.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Essaie de le diviser par 3, puis par 7.' },
    ],
  },

  'arret-trop-tot': {
    nom: 'Essais de division arrêtés trop tôt',
    chapitre: 2,
    regle:
      'On peut s\'arrêter quand le diviseur essayé, multiplié par lui-même, dépasse '
      + 'le nombre : au-delà, un diviseur aurait déjà été trouvé en dessous.',
    controle: 'Pour 91 : 9 × 9 = 81 et 10 × 10 = 100. On essaie donc jusqu\'à 9, pas au-delà.',
    raisonnements: [
      {
        id: 'quelques-essais',
        texte: "J'ai essayé deux ou trois diviseurs et j'ai conclu",
        reponse:
          'C\'est le bon réflexe, il manquait juste un cran : 91 résiste à 2, 3 et 5, '
          + 'mais pas à 7.',
      },
      {
        id: 'sais-pas-ou-arreter',
        texte: 'Je ne savais pas jusqu\'où aller',
        reponse:
          'La règle est simple : tant que le diviseur multiplié par lui-même ne dépasse '
          + 'pas le nombre. Pour 91, jusqu\'à 9.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprends les essais dans l\'ordre : 2, 3, 5, 7…' },
    ],
  },

  'decomposition-incomplete': {
    nom: 'Décomposition laissée en chemin',
    chapitre: 2,
    regle:
      'Une décomposition en facteurs premiers ne contient QUE des nombres premiers. '
      + 'Tant qu\'un facteur peut encore être décomposé, on continue.',
    controle: 'Relis ta réponse facteur par facteur : chacun est-il premier ?',
    raisonnements: [
      {
        id: 'produit-suffit',
        texte: "J'ai trouvé un produit qui donne le bon nombre",
        reponse:
          'Le produit est juste, mais tous les facteurs ne sont pas premiers. '
          + 'Reprends celui qui peut encore se casser en deux.',
      },
      {
        id: 'pas-vu-le-compose',
        texte: "Je n'ai pas vu qu'un facteur pouvait encore se décomposer",
        reponse: 'C\'est l\'erreur la plus courante. Passe chaque facteur en revue à la fin.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Divise par le plus petit premier possible, encore et encore.' },
    ],
  },

  'facteur-repete-oublie': {
    nom: 'Facteur répété compté une seule fois',
    chapitre: 2,
    regle:
      'Un même facteur premier peut apparaître plusieurs fois : 12 = 2 × 2 × 3, '
      + 'pas 2 × 3. Chaque division compte.',
    controle: 'Multiplie tes facteurs entre eux : tu dois retomber exactement sur le nombre de départ.',
    raisonnements: [
      {
        id: 'liste-de-diviseurs',
        texte: "J'ai listé les facteurs premiers sans les répéter",
        reponse:
          'C\'est une liste de diviseurs premiers, pas une décomposition. La '
          + 'décomposition doit redonner le nombre quand on multiplie tout.',
      },
      {
        id: 'erreur-de-comptage',
        texte: "J'ai perdu le compte des divisions",
        reponse: 'Écris chaque division sur une ligne : c\'est fait pour ça.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Vérifie en multipliant tes facteurs.' },
    ],
  },

  'simplification-de-somme': {
    nom: 'Simplification à travers une addition',
    chapitre: 2,
    regle:
      'On ne simplifie que des **facteurs**, jamais les termes d\'une somme. '
      + 'Dans (2 + 6)/2, le 2 du haut est un terme, pas un facteur : on ne peut rien barrer.',
    controle: 'Demande-toi si le nombre que tu veux barrer est multiplié au reste, ou ajouté.',
    raisonnements: [
      {
        id: 'meme-nombre-en-haut-et-en-bas',
        texte: 'Le même nombre était en haut et en bas',
        reponse:
          'Ça ne suffit pas : il faut qu\'il MULTIPLIE tout le numérateur. Ici il est '
          + 'seulement ajouté à autre chose.',
      },
      {
        id: 'gain-de-temps',
        texte: 'Je voulais aller plus vite',
        reponse: 'Calcule d\'abord la somme du haut, puis simplifie. C\'est plus sûr et à peine plus long.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Regarde si le nombre est multiplié ou ajouté.' },
    ],
  },

  'chiffres-barres': {
    nom: 'Chiffres barrés au lieu de facteurs',
    chapitre: 2,
    regle:
      'Simplifier, c\'est diviser le numérateur ET le dénominateur par un même nombre '
      + '— pas effacer des chiffres qui se ressemblent.',
    controle: 'Vérifie ta simplification en divisant : 16 ÷ 4 = 4 et 64 ÷ 4 = 16, donc 16/64 = 4/16 = 1/4.',
    raisonnements: [
      {
        id: 'chiffre-commun',
        texte: 'Il y avait le même chiffre en haut et en bas',
        reponse:
          'Un chiffre n\'est pas un nombre : le 6 de 16 vaut 6, celui de 64 en vaut 60. '
          + 'Ils ne se simplifient pas entre eux.',
      },
      {
        id: 'ca-tombait-juste',
        texte: 'Le résultat avait l\'air juste',
        reponse:
          'Parfois le hasard fait bien les choses — 16/64 donne bien 1/4 — mais la '
          + 'méthode est fausse et elle échouera partout ailleurs.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Cherche par quel nombre on peut diviser les deux.' },
    ],
  },

  'multiple-et-diviseur-confondus': {
    nom: 'Multiple et diviseur intervertis',
    chapitre: 2,
    regle:
      '15 est un **multiple** de 3, et 3 est un **diviseur** de 15. Le multiple est '
      + 'le plus grand, le diviseur le plus petit.',
    controle: 'Le multiple est dans la table : 3, 6, 9, 12, 15… Le diviseur, lui, tient dedans.',
    raisonnements: [
      {
        id: 'mots-inverses',
        texte: "J'ai confondu les deux mots",
        reponse: 'Retiens par la taille : un multiple est plus grand, un diviseur plus petit.',
      },
      {
        id: 'sens-de-la-division',
        texte: 'Je ne savais pas dans quel sens diviser',
        reponse: 'Le diviseur doit tomber juste : 15 ÷ 3 = 5, sans reste. C\'est ce qui le rend diviseur.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Lequel des deux est le plus grand ?' },
    ],
  },

  // ── Chapitre 3 : racine carrée et théorème de Pythagore ───────────────────

  'carre-pris-pour-double': {
    nom: 'Carré confondu avec le double',
    chapitre: 3,
    regle: '5² veut dire 5 × 5, soit 25 — et non 5 + 5. Le petit 2 compte les facteurs, il ne multiplie pas.',
    controle: 'Écris l\'exposant en toutes lettres : 5² = 5 × 5. Le doute disparaît.',
    raisonnements: [
      { id: 'exposant-facteur', texte: 'Le petit 2 veut dire « fois 2 »', reponse: 'Il veut dire « deux fois le même facteur », donc 5 × 5. « Fois 2 » s\'écrirait 2 × 5.' },
      { id: 'confusion-somme', texte: 'J\'ai additionné au lieu de multiplier', reponse: 'Un carré est toujours un produit. 5 + 5 fait 10, mais 5 × 5 fait 25.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Écris le carré en toutes lettres et calcule.' },
    ],
  },

  'racine-oubliee': {
    nom: 'Racine carrée non prise à la fin',
    chapitre: 3,
    regle:
      'Le théorème donne le CARRÉ de la longueur. Pour obtenir la longueur, il faut '
      + 'encore prendre la racine carrée.',
    controle: 'Relis la question : on demande une longueur, pas son carré. Ton résultat doit être une mesure plausible.',
    raisonnements: [
      { id: 'arret-au-carre', texte: "Je me suis arrêté au carré", reponse: 'Tout le calcul est bon, il manque la dernière étape : la racine carrée.' },
      { id: 'oubli-de-la-question', texte: "J'ai oublié ce qu'on demandait", reponse: 'Le réflexe : souligne la question avant de commencer.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Prends la racine carrée de ce que tu as trouvé.' },
    ],
  },

  'racine-linearisee': {
    nom: 'Racine carrée distribuée sur une somme',
    chapitre: 3,
    regle:
      '√(a² + b²) n\'est pas a + b. Pour 3 et 4 : √(9 + 16) = √25 = 5, alors que '
      + '3 + 4 fait 7.',
    controle: 'Additionne les carrés d\'abord, prends la racine ensuite. Jamais l\'inverse.',
    raisonnements: [
      { id: 'racine-terme-a-terme', texte: "J'ai pris la racine de chaque terme", reponse: 'La racine ne se distribue pas sur une somme. Il faut d\'abord additionner, puis extraire.' },
      { id: 'raccourci', texte: 'Je voulais aller plus vite', reponse: 'Le raccourci donne 7 au lieu de 5 — c\'est le triangle 3-4-5, celui qu\'on connaît par cœur.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Calcule la somme des carrés avant toute chose.' },
    ],
  },

  'hypotenuse-mal-identifiee': {
    nom: 'Hypoténuse confondue avec un autre côté',
    chapitre: 3,
    regle:
      'L\'hypoténuse est le côté **opposé à l\'angle droit**, et c\'est toujours le '
      + 'plus long. C\'est son carré qui est égal à la somme des deux autres.',
    controle: 'Repère d\'abord l\'angle droit, puis le côté qui ne le touche pas : c\'est l\'hypoténuse.',
    raisonnements: [
      { id: 'premier-cite', texte: "J'ai pris le côté cité en premier", reponse: 'L\'ordre de l\'énoncé ne dit rien. Seul l\'angle droit désigne l\'hypoténuse.' },
      { id: 'plus-long-ignore', texte: 'Je ne savais pas laquelle c\'était', reponse: 'Elle est face à l\'angle droit, et c\'est le plus grand côté. Si ton résultat la rend plus petite qu\'un autre côté, c\'est qu\'elle est mal placée.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Cherche l\'angle droit, puis le côté d\'en face.' },
    ],
  },

  'somme-au-lieu-de-difference': {
    nom: 'Carrés additionnés au lieu d\'être soustraits',
    chapitre: 3,
    regle:
      'On additionne les carrés pour trouver l\'HYPOTÉNUSE. Pour un côté de l\'angle '
      + 'droit, on soustrait : le carré de l\'hypoténuse moins celui du côté connu.',
    controle: 'Un côté de l\'angle droit est plus court que l\'hypoténuse. Si ton résultat est plus grand, tu as additionné.',
    raisonnements: [
      { id: 'toujours-additionner', texte: 'Dans Pythagore, j\'additionne toujours les carrés', reponse: 'Seulement quand on cherche l\'hypoténuse. Ici elle est connue : c\'est un côté qu\'on cherche, donc on soustrait.' },
      { id: 'formule-recitee', texte: "J'ai récité la formule sans regarder ce qu'on cherchait", reponse: 'Repère d\'abord ce qui est connu et ce qui est cherché — la formule vient après.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Compare ton résultat à l\'hypoténuse : il doit être plus petit.' },
    ],
  },

  'pythagore-sans-angle-droit': {
    nom: 'Théorème appliqué sans angle droit',
    chapitre: 3,
    regle:
      'Le théorème de Pythagore ne s\'applique QUE dans un triangle rectangle. Sans '
      + 'angle droit, l\'égalité est fausse.',
    controle: 'Avant d\'écrire l\'égalité, demande-toi : l\'énoncé dit-il que le triangle est rectangle ?',
    raisonnements: [
      { id: 'cetait-le-chapitre', texte: 'C\'est le théorème qu\'on travaille en ce moment', reponse: 'En contrôle, plus rien n\'annonce le chapitre. Vérifie toujours l\'angle droit avant de l\'utiliser.' },
      { id: 'trois-longueurs', texte: 'Il y avait trois longueurs, alors je l\'ai appliqué', reponse: 'Trois longueurs ne font pas un triangle rectangle. Il faut que l\'énoncé ou la figure le dise.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Relis l\'énoncé : parle-t-il d\'un angle droit ?' },
    ],
  },

  'reciproque-confondue': {
    nom: 'Théorème direct et réciproque intervertis',
    chapitre: 3,
    regle:
      'On utilise le théorème **direct** quand on SAIT que le triangle est rectangle, '
      + 'pour calculer une longueur. On utilise la **réciproque** quand on veut PROUVER '
      + 'qu\'il l\'est.',
    controle: 'Demande-toi ce que tu sais et ce que tu cherches : une longueur, ou une preuve ?',
    raisonnements: [
      { id: 'meme-egalite', texte: 'C\'est la même égalité dans les deux cas', reponse: 'L\'égalité se ressemble, mais pas le raisonnement : dans un cas on part de l\'angle droit, dans l\'autre on y arrive.' },
      { id: 'conclusion-avant-calcul', texte: "J'ai conclu avant d'avoir comparé les deux membres", reponse: 'Pour la réciproque, il faut calculer les deux côtés de l\'égalité SÉPARÉMENT, puis comparer.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que cherche-t-on : une longueur ou une preuve ?' },
    ],
  },

  'encadrement-inverse': {
    nom: 'Encadrement pris à l\'envers',
    chapitre: 3,
    regle:
      'Encadrer √n, c\'est trouver les deux entiers consécutifs dont les carrés '
      + 'entourent n : 49 < 60 < 64, donc 7 < √60 < 8.',
    controle: 'Vérifie en élevant au carré : les carrés de tes deux entiers doivent entourer le nombre.',
    raisonnements: [
      { id: 'ordre-inverse', texte: "J'ai mis les deux entiers dans le mauvais ordre", reponse: 'Le plus petit à gauche. Vérifie avec les carrés : 7² = 49 est en dessous de 60.' },
      { id: 'encadre-le-carre', texte: "J'ai encadré le nombre au lieu de sa racine", reponse: 'On cherche les entiers dont les CARRÉS entourent le nombre, pas les entiers qui l\'entourent.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Cherche les carrés parfaits juste en dessous et juste au-dessus.' },
    ],
  },

  // ── Chapitre 4 : comparer, additionner et soustraire des rationnels ────────

  'comparaison-par-les-numerateurs': {
    nom: 'Fractions comparées sans dénominateur commun',
    chapitre: 4,
    regle:
      'On ne peut comparer deux fractions que si elles ont le **même dénominateur** — '
      + 'sinon les parts n\'ont pas la même taille.',
    controle: 'Mets-les au même dénominateur, puis compare les numérateurs.',
    raisonnements: [
      { id: 'numerateur-plus-grand', texte: "J'ai comparé les numérateurs", reponse: 'Ça ne marche que si les dénominateurs sont les mêmes. 2/7 et 3/11 ne se comparent pas comme 2 et 3.' },
      { id: 'les-deux-nombres', texte: "J'ai comparé les deux nombres du haut et du bas", reponse: 'Une fraction est UN nombre, pas deux. Il faut la ramener à une taille de part commune.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Cherche un dénominateur commun aux deux.' },
    ],
  },

  'grand-denominateur-grande-fraction': {
    nom: 'Grand dénominateur pris pour une grande fraction',
    chapitre: 4,
    regle:
      'Plus le dénominateur est grand, plus les parts sont **petites** : 1/4 est plus '
      + 'petit que 1/3, parce qu\'on partage en plus de morceaux.',
    controle: 'Pense au gâteau : partagé en 4, chaque part est plus petite que partagé en 3.',
    raisonnements: [
      { id: 'plus-grand-nombre', texte: 'Le nombre du bas était plus grand', reponse: 'Le dénominateur dit en combien de parts on découpe. Plus il y en a, plus elles sont petites.' },
      { id: 'compare-comme-entiers', texte: "J'ai comparé comme des nombres entiers", reponse: 'Une fraction ne se lit pas comme un entier : c\'est un partage.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Imagine un gâteau partagé en 3, puis en 4.' },
    ],
  },

  'addition-terme-a-terme': {
    nom: 'Numérateurs et dénominateurs additionnés séparément',
    chapitre: 4,
    regle:
      '1/2 + 1/3 ne fait pas 2/5. On additionne des parts de même taille : il faut '
      + 'd\'abord un dénominateur commun, puis on additionne les numérateurs seulement.',
    controle: 'Estime avant de calculer : 1/2 + 1/3 dépasse 1/2, donc ne peut pas valoir 2/5, qui est plus petit.',
    raisonnements: [
      { id: 'tout-additionner', texte: "J'ai additionné les hauts entre eux et les bas entre eux", reponse: 'C\'est la règle du produit, pas celle de la somme. Pour additionner, les parts doivent avoir la même taille.' },
      { id: 'denominateur-double', texte: "J'ai gardé un dénominateur mais changé le numérateur", reponse: 'Le dénominateur ne s\'additionne jamais : il dit seulement la taille des parts.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Trouve d\'abord un dénominateur commun.' },
    ],
  },

  'denominateur-non-reporte': {
    nom: 'Numérateurs modifiés sans le dénominateur',
    chapitre: 4,
    regle:
      'Quand on change le dénominateur d\'une fraction, il faut multiplier le '
      + 'numérateur par le MÊME nombre : 1/3 = 2/6, pas 1/6.',
    controle: 'Vérifie que les deux fractions valent pareil : 1/3 et 2/6 sont bien la même part du tout.',
    raisonnements: [
      { id: 'denominateur-seul', texte: "J'ai changé le dénominateur en laissant le numérateur", reponse: 'Ça change la valeur de la fraction. Les deux doivent être multipliés par le même nombre.' },
      { id: 'mauvais-facteur', texte: "Je me suis trompé de facteur", reponse: 'Le bon facteur est celui qui transforme l\'ancien dénominateur en nouveau : de 3 à 6, c\'est 2.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Par combien faut-il multiplier le dénominateur ? Fais pareil en haut.' },
    ],
  },

  'signe-de-fraction-perdu': {
    nom: 'Signe négatif perdu dans une fraction',
    chapitre: 4,
    regle:
      'Le signe d\'une fraction porte sur toute la fraction : −2/3 vaut la même chose '
      + 'que (−2)/3. Quand on additionne, ce signe compte.',
    controle: 'Réécris la fraction négative avec son signe au numérateur avant de calculer.',
    raisonnements: [
      { id: 'signe-oublie', texte: "J'ai oublié le signe en cours de calcul", reponse: 'Le mettre au numérateur dès le départ évite de le perdre.' },
      { id: 'signe-partout', texte: "J'ai mis le signe en haut ET en bas", reponse: 'Un seul suffit : deux signes moins s\'annuleraient et la fraction redeviendrait positive.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Place le signe au numérateur et reprends.' },
    ],
  },

  'soustraction-inversee': {
    nom: 'Soustraction faite dans le mauvais sens',
    chapitre: 4,
    regle:
      'a − b n\'est pas b − a. Quand la seconde fraction est la plus grande, le '
      + 'résultat est négatif — et c\'est normal.',
    controle: 'Compare les deux fractions avant de soustraire : tu sauras si le résultat doit être positif ou négatif.',
    raisonnements: [
      { id: 'plus-petit-du-plus-grand', texte: "J'ai soustrait le plus petit du plus grand pour éviter un négatif", reponse: 'Un résultat négatif est une réponse valable. L\'ordre de l\'énoncé doit être respecté.' },
      { id: 'ordre-perdu', texte: "J'ai perdu l'ordre en mettant au même dénominateur", reponse: 'Recopie l\'opération dans le même ordre à chaque ligne — c\'est là qu\'on l\'intervertit.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Laquelle des deux est la plus grande ?' },
    ],
  },

  // ── Chapitre 5 : proportionnalité et grandeurs composées ──────────────────
  //
  // L'illusion de linéarité est le piège le mieux documenté de tout le
  // programme : plus de 90 % des élèves de 12-13 ans y tombent sur les
  // agrandissements d'aires, et De Bock montre qu'elle RÉSISTE à un
  // enseignement ciblé. D'où le soin particulier apporté à ses items neutres.

  'illusion-de-linearite': {
    nom: 'Proportionnalité supposée là où il n\'y en a pas',
    chapitre: 5,
    regle:
      'Toutes les situations ne sont pas proportionnelles. Si le côté d\'un carré '
      + 'double, son aire est multipliée par **quatre**, pas par deux.',
    controle: 'Avant de calculer, demande-toi si doubler l\'un double vraiment l\'autre. Fais un dessin si tu hésites.',
    raisonnements: [
      {
        id: 'double-donc-double',
        texte: 'Si une grandeur double, l\'autre double aussi',
        reponse:
          'Seulement si elles sont proportionnelles. Dessine un carré de côté 1 puis '
          + 'de côté 2 : tu en comptes quatre dans le second, pas deux.',
      },
      {
        id: 'regle-de-trois-partout',
        texte: "J'ai fait une règle de trois par habitude",
        reponse: 'La règle de trois ne vaut que pour les situations proportionnelles. C\'est la première chose à vérifier.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Cette situation est-elle vraiment proportionnelle ?' },
    ],
  },

  'traitement-additif': {
    nom: 'Écart ajouté au lieu du coefficient',
    chapitre: 5,
    regle:
      'Dans une situation proportionnelle, on **multiplie** par un coefficient, on '
      + 'n\'ajoute pas un écart. Si 8 donne 12, alors 6 donne 9, pas 10.',
    controle: 'Cherche par combien on multiplie, pas ce qu\'on ajoute : 12 ÷ 8 = 1,5.',
    raisonnements: [
      { id: 'ecart-constant', texte: "J'ai ajouté le même écart", reponse: 'L\'écart constant, c\'est une autre situation. En proportionnalité, c\'est le rapport qui reste constant.' },
      { id: 'coefficient-non-vu', texte: "Je n'ai pas trouvé le coefficient", reponse: 'Il se calcule en divisant : la valeur d\'arrivée par la valeur de départ.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Par combien faut-il multiplier 8 pour obtenir 12 ?' },
    ],
  },

  'produit-en-croix-mecanique': {
    nom: 'Produit en croix appliqué sans réfléchir',
    chapitre: 5,
    regle:
      'Le produit en croix ne fonctionne que si les grandeurs sont proportionnelles, '
      + 'et à condition de placer les valeurs dans le bon ordre.',
    controle: 'Vérifie ton résultat par un ordre de grandeur : est-il plausible dans la situation décrite ?',
    raisonnements: [
      { id: 'valeurs-melangees', texte: "J'ai mélangé les valeurs dans le tableau", reponse: 'Chaque colonne doit contenir une seule grandeur. Réécris le tableau avant de calculer.' },
      { id: 'formule-sans-sens', texte: "J'ai appliqué la formule sans regarder la situation", reponse: 'La formule vient après la question « est-ce proportionnel ? ».' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Range les valeurs dans un tableau, une grandeur par ligne.' },
    ],
  },

  'pourcentage-du-mauvais-tout': {
    nom: 'Pourcentage appliqué à la mauvaise quantité',
    chapitre: 5,
    regle:
      'Un pourcentage porte toujours sur une quantité précise. « 20 % du reste » '
      + 'n\'est pas « 20 % du total » — il faut d\'abord calculer le reste.',
    controle: 'Souligne dans l\'énoncé la quantité sur laquelle porte le pourcentage avant de calculer.',
    raisonnements: [
      { id: 'toujours-le-total', texte: "J'ai pris le total", reponse: 'Relis : le pourcentage portait sur ce qui restait, pas sur tout.' },
      { id: 'pourcentages-additionnes', texte: "J'ai additionné les pourcentages", reponse: 'Deux pourcentages successifs ne s\'additionnent pas : le second s\'applique à ce que le premier a laissé.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Sur quelle quantité porte ce pourcentage ?' },
    ],
  },

  'echelle-inversee': {
    nom: 'Échelle prise à l\'envers',
    chapitre: 5,
    regle:
      'Une échelle de 1/200 veut dire que 1 cm sur le plan représente 200 cm en '
      + 'réalité. La réalité est donc **plus grande** que le plan.',
    controle: 'Compare l\'ordre de grandeur : une maison ne fait pas 3 cm, et un plan ne fait pas 600 m.',
    raisonnements: [
      { id: 'multiplie-au-lieu-de-diviser', texte: "J'ai divisé au lieu de multiplier", reponse: 'Pour passer du plan à la réalité on multiplie par le dénominateur de l\'échelle.' },
      { id: 'sens-perdu', texte: 'Je ne savais pas dans quel sens aller', reponse: 'Demande-toi lequel des deux doit être le plus grand : ça donne le sens.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le plan ou la réalité : lequel est le plus grand ?' },
    ],
  },

  'grandeur-quotient-inversee': {
    nom: 'Grandeur quotient calculée à l\'envers',
    chapitre: 5,
    regle:
      'Une vitesse est une distance **divisée par** un temps. L\'unité le dit : des '
      + 'km/h, donc des kilomètres divisés par des heures.',
    controle: 'Lis l\'unité comme une division : km/h, c\'est « kilomètres par heure ». Elle donne l\'ordre du calcul.',
    raisonnements: [
      { id: 'division-inversee', texte: "J'ai divisé dans l'autre sens", reponse: 'L\'unité te sauve : « km/h » signifie kilomètres ÷ heures, jamais l\'inverse.' },
      { id: 'multiplie', texte: "J'ai multiplié au lieu de diviser", reponse: 'Multiplier donne la distance quand on connaît la vitesse et le temps — c\'est le calcul inverse.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Relis l\'unité demandée : elle contient le calcul.' },
    ],
  },

  'unites-non-converties': {
    nom: 'Unités mélangées avant le calcul',
    chapitre: 5,
    regle:
      'On ne peut pas calculer avec des unités différentes : des minutes et des heures, '
      + 'des mètres et des kilomètres. Il faut convertir d\'abord.',
    controle: 'Écris les unités à côté de chaque nombre : si elles ne se correspondent pas, convertis avant de calculer.',
    raisonnements: [
      { id: 'unites-ignorees', texte: "Je n'ai pas regardé les unités", reponse: 'Ce sont elles qui commandent. 30 minutes ne se calcule pas comme 30 heures.' },
      { id: 'conversion-ratee', texte: "J'ai converti dans le mauvais sens", reponse: 'Une heure vaut 60 minutes : pour passer des minutes aux heures, on divise.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Mets tout dans la même unité avant de calculer.' },
    ],
  },

  // ── Chapitre 6 : puissances et notation scientifique ──────────────────────

  'exposant-pris-pour-facteur': {
    nom: 'Exposant lu comme un facteur',
    chapitre: 6,
    regle:
      '2³ veut dire 2 × 2 × 2, soit 8 — et non 2 × 3. L\'exposant compte combien de '
      + 'fois le facteur apparaît, il ne multiplie pas.',
    controle: 'Écris la puissance en toutes lettres : 2³ = 2 × 2 × 2. Le doute disparaît.',
    raisonnements: [
      { id: 'exposant-multiplie', texte: 'Le petit chiffre multiplie le grand', reponse: 'Il dit combien de fois on écrit le facteur. 2³ = 2 × 2 × 2, pas 2 × 3.' },
      { id: 'confusion-avec-produit', texte: "J'ai confondu avec une multiplication normale", reponse: 'Une puissance est une multiplication répétée. Décompresse-la et tu ne te tromperas plus.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Écris la puissance en toutes lettres.' },
    ],
  },

  'exposants-multiplies': {
    nom: 'Exposants multipliés au lieu d\'être additionnés',
    chapitre: 6,
    regle:
      'Pour multiplier deux puissances de même base, on **additionne** les exposants : '
      + '2³ × 2⁴ compte 3 facteurs puis 4 facteurs, soit 7 en tout.',
    controle: 'Compte les facteurs en écrivant tout : trois 2 puis quatre 2, ça fait sept 2.',
    raisonnements: [
      { id: 'multiplication-des-exposants', texte: "J'ai multiplié les exposants", reponse: 'Multiplier les exposants correspond à une autre situation. Ici on met bout à bout : 3 facteurs puis 4, donc 7.' },
      { id: 'formule-mal-retenue', texte: "Je ne me souvenais plus de la règle", reponse: 'Ne la retiens pas : retrouve-la en comptant les facteurs. C\'est plus sûr.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Compte les facteurs des deux puissances.' },
    ],
  },

  'regle-inventee-pour-la-somme': {
    nom: 'Règle des puissances appliquée à une somme',
    chapitre: 6,
    regle:
      'Il n\'existe **aucune** règle pour additionner deux puissances : 2³ + 2⁴ '
      + 'ne s\'écrit pas comme une puissance de 2. On calcule : 8 + 16 = 24.',
    controle: 'Vérifie : 24 est-il une puissance de 2 ? 16 et 32 le sont, pas 24.',
    raisonnements: [
      { id: 'regle-transportee', texte: "J'ai utilisé la règle du produit pour la somme", reponse: 'Elle ne vaut que pour les produits. Pour une somme, il faut calculer les deux puissances.' },
      { id: 'il-faut-une-regle', texte: 'Je pensais qu\'il existait une règle', reponse: 'Il n\'y en a pas, et c\'est une information utile : devant une somme de puissances, on calcule.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Calcule chaque puissance, puis additionne.' },
    ],
  },

  'bases-differentes-fusionnees': {
    nom: 'Bases différentes mélangées',
    chapitre: 6,
    regle:
      'Les règles sur les exposants ne s\'appliquent qu\'à des puissances de **même '
      + 'base**. 2³ × 5² ne devient pas 10⁵.',
    controle: 'Regarde les bases avant les exposants : si elles diffèrent, on calcule chaque puissance séparément.',
    raisonnements: [
      { id: 'bases-multipliees', texte: "J'ai multiplié les bases et additionné les exposants", reponse: 'Les deux à la fois, c\'est deux règles mélangées. Ici il faut calculer 8 × 25.' },
      { id: 'base-non-regardee', texte: "Je n'ai pas regardé les bases", reponse: 'C\'est le premier réflexe à prendre : même base, ou pas ?' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Les deux bases sont-elles les mêmes ?' },
    ],
  },

  'signe-et-exposant': {
    nom: 'Signe absorbé par l\'exposant',
    chapitre: 6,
    regle:
      '−3² et (−3)² ne sont pas la même chose : dans le premier, seul le 3 est élevé '
      + 'au carré, donc le résultat vaut −9. Dans le second, tout l\'est, donc 9.',
    controle: 'Repère si la parenthèse enferme le signe. Sans parenthèse, le signe reste dehors.',
    raisonnements: [
      { id: 'signe-inclus', texte: "J'ai élevé le signe au carré aussi", reponse: 'Sans parenthèse, il reste devant. Il faut écrire (−3)² pour l\'inclure.' },
      { id: 'parenthese-ignoree', texte: "Je n'ai pas fait attention à la parenthèse", reponse: 'Elle change tout ici. C\'est la seule chose qui distingue les deux écritures.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Y a-t-il une parenthèse autour du signe ?' },
    ],
  },

  'exposant-negatif-pris-pour-nombre-negatif': {
    nom: 'Exposant négatif confondu avec un nombre négatif',
    chapitre: 6,
    regle:
      '10⁻³ n\'est pas un nombre négatif : c\'est 0,001. Un exposant négatif indique '
      + 'un nombre **petit**, pas un nombre en dessous de zéro.',
    controle: 'Un exposant négatif rend le nombre plus petit que 1, mais toujours positif.',
    raisonnements: [
      { id: 'moins-donc-negatif', texte: 'Le signe moins rend le résultat négatif', reponse: 'Il porte sur l\'exposant, pas sur le nombre. 10⁻³ vaut 0,001 : petit, mais positif.' },
      { id: 'nombre-de-zeros', texte: "Je me suis trompé dans le nombre de zéros", reponse: 'L\'exposant donne le nombre de rangs de décalage : trois rangs après la virgule.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Un exposant négatif donne-t-il un nombre négatif, ou un petit nombre ?' },
    ],
  },

  'notation-scientifique-mal-cadree': {
    nom: 'Notation scientifique hors format',
    chapitre: 6,
    regle:
      'En notation scientifique, le premier nombre est **compris entre 1 et 10** — '
      + '10 exclu. 42 × 10³ n\'est pas une notation scientifique ; 4,2 × 10⁴ l\'est.',
    controle: 'Regarde le premier nombre : a-t-il exactement un chiffre avant la virgule, et ce chiffre est-il différent de zéro ?',
    raisonnements: [
      { id: 'un-seul-chiffre', texte: "Je n'ai pas ramené le premier nombre entre 1 et 10", reponse: 'C\'est la règle du format. Décale la virgule et ajuste l\'exposant du même nombre de rangs.' },
      { id: 'exposant-non-ajuste', texte: "J'ai déplacé la virgule sans changer l'exposant", reponse: 'Les deux vont ensemble : chaque rang de décalage change l\'exposant de 1.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le premier nombre doit être entre 1 et 10.' },
    ],
  },

  // ── Chapitre 7 : calcul littéral ──────────────────────────────────────────
  //
  // Le nœud du programme, et la typologie la mieux établie de toute la
  // didactique francophone : elle vient de la lignée Pépite (Grugeon-Allys),
  // seul dispositif à avoir modélisé POURQUOI un élève se trompe en algèbre.
  //
  // Le geste de contrôle est le même pour presque tous ces pièges, et ce n'est
  // pas un manque d'imagination : c'est LE geste de l'algèbre. Une lettre est
  // un nombre qu'on ne connaît pas encore, donc toute écriture douteuse se
  // teste en remplaçant la lettre par un nombre. C'est ce que l'élève emporte
  // en contrôle quand l'appli n'est plus là.

  concatenation: {
    nom: "Somme terminée alors qu'elle ne peut pas l'être",
    chapitre: 7,
    regle:
      '3x + 2 ne se réduit pas : 3x compte des x, 2 compte des unités. On '
      + 'n\'additionne que des termes **semblables**.',
    controle: 'Remplace la lettre par 3 : 3×3 + 2 fait 11, alors que 5×3 en ferait 15. Les deux écritures ne disent pas la même chose.',
    raisonnements: [
      {
        id: 'faut-finir',
        texte: 'Une réponse ne peut pas rester avec un « + » dedans',
        reponse:
          'Si, et c\'est même très fréquent en algèbre. « 3x + 2 » est une réponse '
          + 'complète : c\'est un nombre, écrit avec la lettre qu\'on ne connaît pas encore.',
      },
      {
        id: 'colle-les-nombres',
        texte: "J'ai additionné les deux nombres",
        reponse:
          'Le 3 est collé au x, il compte des x. Le 2 est seul, il compte des unités. '
          + 'Les additionner reviendrait à ajouter des pommes et des heures.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Regarde ce que compte chaque terme avant de choisir.' },
    ],
  },

  linearisation: {
    nom: 'Carré transformé en double',
    chapitre: 7,
    regle:
      'a² veut dire a × a, pas a + a. Les deux ne coïncident que pour a = 0 et '
      + 'a = 2 — partout ailleurs, ils diffèrent.',
    controle: 'Remplace a par 3 : a² fait 9, 2a fait 6. Évite 2, la seule valeur qui te donnerait raison à tort.',
    raisonnements: [
      { id: 'exposant-est-facteur', texte: 'Le petit 2 veut dire « fois 2 »', reponse: 'Il veut dire « deux fois le même facteur », donc a × a. « Fois 2 » s\'écrirait 2a, sans exposant.' },
      { id: 'deux-a-partout', texte: 'a + a fait 2a, donc a × a aussi', reponse: 'a + a fait bien 2a. Mais a × a est un produit, pas une somme — et les deux ne donnent pas la même chose.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Écris l\'exposant en toutes lettres et compare.' },
    ],
  },

  'distributivite-incomplete': {
    nom: 'Facteur distribué sur un seul terme',
    chapitre: 7,
    regle:
      '2(x + 5) veut dire « deux paquets de (x + 5) ». Chaque terme de la '
      + 'parenthèse est multiplié : 2x + 10.',
    controle: 'Remplace x par 3 : 2(3 + 5) fait 16. Ton écriture donne-t-elle 16 aussi ?',
    raisonnements: [
      { id: 'oublie-second-terme', texte: "J'ai multiplié le premier terme et recopié le reste", reponse: 'Le facteur porte sur toute la parenthèse. Si tu prends deux paquets de (x + 5), tu as deux x ET deux fois 5.' },
      { id: 'confond-sans-parenthese', texte: 'Pour moi 2(x + 5) et 2x + 5, c\'est pareil', reponse: 'Non : la parenthèse dit qu\'on double la somme entière. Sans elle, on ne doublerait que le x.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Une flèche du facteur vers chaque terme, et compte.' },
    ],
  },

  'moins-devant-la-parenthese': {
    nom: 'Moins appliqué au seul premier terme',
    chapitre: 7,
    regle:
      '−(x − 3) veut dire « l\'opposé de tout ce qu\'il y a dans la parenthèse » : '
      + 'chaque terme change de signe, donc −x + 3.',
    controle: 'Remplace x par 3 : −(3 − 3) fait 0. Une écriture qui donne −6 n\'est pas la bonne.',
    raisonnements: [
      { id: 'premier-terme-seul', texte: "Je n'ai changé que le signe du premier terme", reponse: 'C\'est le piège exact. Le moins s\'applique à la parenthèse entière — donc aussi au −3, qui devient +3.' },
      { id: 'recopie-linterieur', texte: "J'ai recopié l'intérieur en mettant un moins devant", reponse: 'Écrire −x − 3 revient à enlever x ET enlever 3. Or on enlève (x − 3), c\'est-à-dire un peu moins que x.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Change le signe de chaque terme, un par un.' },
    ],
  },

  // Ce piège joue dans les DEUX sens, et sa formulation doit le refléter :
  // écrite pour le seul cas du produit, elle servait à un élève qui s'était
  // trompé sur une somme une règle hors sujet — et pire, un exemple où sa
  // propre réponse fausse apparaissait comme juste.
  'somme-et-produit-confondus': {
    nom: 'Règle de la somme et règle du produit interverties',
    chapitre: 7,
    regle:
      'Les deux ne se traitent pas pareil. Dans une **somme** de termes '
      + 'semblables, on additionne les coefficients et la lettre ne bouge pas : '
      + '5x + 3x = 8x. Dans un **produit**, on multiplie les nombres entre eux '
      + 'et les lettres entre elles : 3x × 5x = 15x².',
    controle:
      'Regarde le signe entre les deux termes : un « + » garde la lettre telle '
      + 'quelle, un « × » la fait monter en carré.',
    raisonnements: [
      {
        id: 'regle-de-la-somme',
        texte: "J'ai additionné les coefficients alors que c'était un produit",
        reponse:
          'C\'est la règle de l\'addition transportée à la multiplication. Dans un '
          + 'produit on multiplie : 3 × 5 fait 15, et x × x fait x².',
      },
      {
        id: 'regle-du-produit',
        texte: "J'ai multiplié alors que c'était une somme",
        reponse:
          'Dans une somme de termes semblables, la lettre ne change pas : '
          + '5x + 3x compte huit x, donc 8x — pas 8x².',
      },
      {
        id: 'oublie-le-carre',
        texte: "J'ai bien multiplié les nombres mais laissé un seul x",
        reponse: 'Bon réflexe sur les nombres. Il reste x × x, qui fait x² et non x.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le signe entre les deux termes : + ou × ?' },
    ],
  },

  'facteur-commun-non-vu': {
    nom: 'Facteur commun non repéré',
    chapitre: 7,
    regle:
      'Factoriser, c\'est repérer ce qui multiplie TOUS les termes et le sortir : '
      + 'dans 3x + 6, chaque terme est un multiple de 3, donc 3x + 6 = 3(x + 2).',
    controle: 'Redéveloppe ta réponse : tu dois retomber exactement sur l\'expression de départ.',
    raisonnements: [
      { id: 'rien-a-factoriser', texte: 'Je ne voyais rien de commun', reponse: 'Regarde les nombres seuls : 3 et 6 sont tous les deux dans la table de 3. C\'est là qu\'est le facteur commun.' },
      { id: 'facteur-partiel', texte: "J'ai sorti un facteur qui n'était pas dans tous les termes", reponse: 'Il doit multiplier chaque terme, sans exception. Sinon le développement ne redonne pas le départ.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Cherche ce qui multiplie tous les termes à la fois.' },
    ],
  },

  'reduction-de-termes-non-semblables': {
    nom: 'Termes non semblables réduits',
    chapitre: 7,
    regle:
      'On n\'additionne que des termes qui comptent la même chose : x et x² ne '
      + 'sont pas semblables, donc x + x² ne se réduit pas.',
    controle: 'Remplace x par 3 : x + x² fait 12, alors que 2x² en ferait 18.',
    raisonnements: [
      { id: 'meme-lettre', texte: 'Les deux termes ont la même lettre', reponse: 'La lettre ne suffit pas : il faut le même exposant. x compte des x, x² compte des carrés.' },
      { id: 'faut-reduire', texte: 'Je pensais qu\'il fallait toujours réduire', reponse: 'Souvent, mais pas toujours. Une expression déjà réduite est une réponse complète.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Les exposants sont-ils les mêmes ?' },
    ],
  },

  'egal-qui-donne-le-resultat': {
    nom: 'Signe égal lu comme « donne »',
    chapitre: 7,
    regle:
      'Le signe = dit que les deux côtés valent la MÊME chose, pas « ce qui '
      + 'suit est le résultat ». Écrire 5 + 3 = 8 × 2 = 16 est faux : 5 + 3 ne '
      + 'vaut pas 16.',
    controle: 'Relis ta ligne de gauche à droite : chaque égalité doit rester vraie isolément.',
    raisonnements: [
      { id: 'chaine-de-calcul', texte: "J'ai enchaîné mes calculs sur une seule ligne", reponse: 'C\'est pratique, mais ça écrit des égalités fausses. Va à la ligne à chaque étape.' },
      { id: 'egal-annonce', texte: 'Pour moi le = annonce le résultat', reponse: 'C\'était vrai en primaire. En algèbre, il relie deux écritures qui valent pareil — dans les deux sens.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Chaque égalité de ta ligne est-elle vraie toute seule ?' },
    ],
  },

  // ── Chapitre 8 : statistiques ─────────────────────────────────────────────

  'moyenne-des-moyennes': {
    nom: 'Moyennes moyennées sans tenir compte des effectifs',
    chapitre: 8,
    regle:
      'On ne fait pas la moyenne de deux moyennes : il faut repartir des '
      + 'effectifs. Une classe de 30 élèves ne pèse pas autant qu\'une de 10.',
    controle: 'Recalcule la somme totale des valeurs, puis divise par l\'effectif total.',
    raisonnements: [
      { id: 'deux-moyennes', texte: "J'ai fait la moyenne des deux moyennes", reponse: 'Ça ne marche que si les deux groupes ont le même effectif. Sinon le plus grand doit compter davantage.' },
      { id: 'effectifs-ignores', texte: "Je n'ai pas regardé les effectifs", reponse: 'Ce sont eux qui donnent le poids de chaque groupe dans la moyenne d\'ensemble.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien y a-t-il de valeurs en tout ?' },
    ],
  },

  'mediane-sans-ranger': {
    nom: 'Médiane cherchée sans avoir rangé les valeurs',
    chapitre: 8,
    regle:
      'La médiane est la valeur du milieu **une fois les valeurs rangées**. Sans '
      + 'ce rangement, la valeur du milieu de la liste ne veut rien dire.',
    controle: 'Range d\'abord, compte ensuite. Avec 9 valeurs, la médiane est la 5e.',
    raisonnements: [
      { id: 'milieu-de-la-liste', texte: "J'ai pris la valeur au milieu de la liste", reponse: 'Il fallait d\'abord la ranger dans l\'ordre croissant : c\'est ce rangement qui donne un sens au « milieu ».' },
      { id: 'confond-avec-moyenne', texte: "J'ai calculé la moyenne", reponse: 'La moyenne et la médiane sont deux indicateurs différents. La médiane partage l\'effectif en deux.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Range les valeurs, puis cherche celle du milieu.' },
    ],
  },

  'mediane-effectif-pair': {
    nom: 'Médiane mal placée quand l\'effectif est pair',
    chapitre: 8,
    regle:
      'Avec un effectif pair, il n\'y a pas UNE valeur du milieu mais deux : on '
      + 'prend leur moyenne. Pour 10 valeurs, c\'est entre la 5e et la 6e.',
    controle: 'Divise l\'effectif par 2 : si ça tombe juste, il faut deux valeurs, pas une.',
    raisonnements: [
      { id: 'une-seule-valeur', texte: "J'ai pris une seule valeur", reponse: 'Avec un nombre pair de valeurs, aucune n\'est exactement au milieu. On fait la moyenne des deux qui l\'encadrent.' },
      { id: 'mauvais-rang', texte: "Je me suis trompé de rang", reponse: 'Pour 10 valeurs : la 5e et la 6e. Pas la 5e seule, ni la 6e seule.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien y a-t-il de valeurs ? Le nombre est-il pair ?' },
    ],
  },

  'frequence-et-effectif-confondus': {
    nom: 'Fréquence confondue avec effectif',
    chapitre: 8,
    regle:
      'Un effectif est un nombre d\'individus ; une fréquence est une part du '
      + 'total, entre 0 et 1 — ou un pourcentage entre 0 et 100.',
    controle: 'Une fréquence ne peut pas dépasser 1 (ou 100 %). Si ton résultat le fait, c\'est un effectif.',
    raisonnements: [
      { id: 'nombre-brut', texte: "J'ai donné le nombre d'individus", reponse: 'C\'est l\'effectif. La fréquence, c\'est ce nombre divisé par le total.' },
      { id: 'division-inversee', texte: "J'ai divisé dans l'autre sens", reponse: 'On divise l\'effectif par le total, jamais l\'inverse — sinon on dépasse 1.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Ton résultat dépasse-t-il 1 ?' },
    ],
  },

  'angle-du-diagramme': {
    nom: 'Angle du diagramme circulaire mal calculé',
    chapitre: 8,
    regle:
      'Dans un diagramme circulaire, les angles sont proportionnels aux '
      + 'effectifs, et le disque entier vaut 360°. L\'angle est donc la fréquence '
      + 'multipliée par 360.',
    controle: 'La somme de tous tes angles doit faire exactement 360°.',
    raisonnements: [
      { id: 'pourcentage-en-degres', texte: "J'ai pris le pourcentage comme un nombre de degrés", reponse: '25 % ne fait pas 25° mais le quart du disque, soit 90°. Il faut multiplier par 360.' },
      { id: 'total-oublie', texte: "J'ai oublié de diviser par l'effectif total", reponse: 'L\'angle vaut effectif ÷ total × 360. Sans la division, la somme dépasse 360°.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle part du total cette catégorie représente-t-elle ?' },
    ],
  },

  // ── Chapitre 9 : multiplier et diviser des rationnels ─────────────────────
  //
  // Tout le chapitre lutte contre un transfert : les règles de l'addition,
  // apprises au chapitre 4, ne valent pas ici. C'est précisément pour ça que
  // les deux chapitres sont séparés dans les manuels.

  'denominateur-commun-pour-multiplier': {
    nom: 'Dénominateur commun cherché pour un produit',
    chapitre: 9,
    regle:
      'Pour **multiplier** deux fractions, aucun dénominateur commun n\'est '
      + 'nécessaire : on multiplie les numérateurs entre eux et les dénominateurs '
      + 'entre eux. C\'est la somme qui en avait besoin, pas le produit.',
    controle: 'Regarde le signe entre les deux fractions : × ou + ? La méthode n\'est pas la même.',
    raisonnements: [
      { id: 'toujours-le-meme-denominateur', texte: "J'ai mis au même dénominateur comme pour une addition", reponse: 'C\'est le réflexe du chapitre précédent. Pour un produit, on multiplie directement en haut et en bas.' },
      { id: 'resultat-non-simplifie', texte: "J'ai multiplié mais je n'ai pas simplifié", reponse: 'Le calcul est juste. Simplifier avant de multiplier évite d\'ailleurs de manipuler de gros nombres.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Multiplie les numérateurs entre eux, puis les dénominateurs.' },
    ],
  },

  'inverse-et-oppose-confondus': {
    nom: 'Inverse confondu avec opposé',
    chapitre: 9,
    regle:
      'L\'**opposé** de 3 est −3 : leur somme fait 0. L\'**inverse** de 3 est '
      + '1/3 : leur produit fait 1.',
    controle: 'Multiplie ton résultat par le nombre de départ : tu dois trouver 1.',
    raisonnements: [
      { id: 'change-le-signe', texte: "J'ai changé le signe", reponse: 'Ça donne l\'opposé. L\'inverse, c\'est le nombre par lequel il faut multiplier pour obtenir 1.' },
      { id: 'mots-melanges', texte: "Je confonds les deux mots", reponse: 'Retiens par l\'opération : opposé pour l\'addition, inverse pour la multiplication.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Par combien faut-il multiplier ce nombre pour obtenir 1 ?' },
    ],
  },

  'division-terme-a-terme': {
    nom: 'Fractions divisées terme à terme',
    chapitre: 9,
    regle:
      'Diviser par une fraction, c\'est multiplier par son inverse. On ne divise '
      + 'pas les numérateurs entre eux et les dénominateurs entre eux.',
    controle: 'Vérifie en multipliant : ton résultat multiplié par le diviseur doit redonner le nombre de départ.',
    raisonnements: [
      { id: 'comme-le-produit', texte: "J'ai fait comme pour la multiplication", reponse: 'Presque : il faut d\'abord retourner la seconde fraction, puis multiplier.' },
      { id: 'pas-vu-la-division', texte: "Je n'ai pas vu que c'était une division", reponse: 'Le signe ÷ ou la barre de fraction entre deux fractions : les deux disent la même chose.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Retourne la seconde fraction, puis multiplie.' },
    ],
  },

  'mauvaise-fraction-inversee': {
    nom: 'Mauvaise fraction retournée',
    chapitre: 9,
    regle:
      'C\'est la **seconde** fraction — le diviseur — qu\'on retourne. La première '
      + 'ne bouge pas.',
    controle: 'La première fraction s\'écrit telle quelle dans le produit. Seule celle qui suit le ÷ est retournée.',
    raisonnements: [
      { id: 'premiere-inversee', texte: "J'ai retourné la première", reponse: 'C\'est celle qui divise qu\'on retourne, donc la seconde. La première reste intacte.' },
      { id: 'les-deux', texte: "J'ai retourné les deux", reponse: 'Retourner les deux revient à faire l\'inverse du résultat. Une seule suffit.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Laquelle des deux divise l\'autre ?' },
    ],
  },

  // Le pendant du précédent, et il manquait. Le chapitre 1 a bien ses DEUX
  // conceptions — « multiplier agrandit » et « diviser diminue » — mais je
  // n'avais écrit ici que la moitié « multiplication ». Un savoir-faire sur la
  // division rabattait donc la conception « diviser rend plus petit » sur le
  // piège du produit, et servait à l'élève une règle qui CONFIRMAIT son erreur.
  'quotient-de-fractions-plus-petit': {
    nom: 'Quotient de fractions supposé plus petit',
    chapitre: 9,
    regle:
      'Diviser par une fraction plus petite que 1 **agrandit** : 3/8 ÷ 1/4 vaut '
      + '3/2, parce qu\'il y a un quart trois fois et demie dans trois huitièmes.',
    controle: 'Compare le diviseur à 1 : s\'il est plus petit, le quotient dépasse le dividende.',
    raisonnements: [
      {
        id: 'diviser-diminue',
        texte: 'Une division donne toujours un plus petit nombre',
        reponse:
          'Diviser par 2, oui. Mais diviser par un quart, c\'est demander « combien '
          + 'de quarts ? » — et il y en a quatre fois plus.',
      },
      {
        id: 'resultat-trop-grand',
        texte: 'Mon résultat me paraissait trop grand',
        reponse: 'Il l\'est légitimement. Vérifie en multipliant : ton résultat fois le diviseur doit redonner le dividende.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le diviseur est-il plus grand ou plus petit que 1 ?' },
    ],
  },

  'produit-de-fractions-plus-grand': {
    nom: 'Produit de fractions supposé plus grand',
    chapitre: 9,
    regle:
      'Multiplier par une fraction plus petite que 1 **diminue** : la moitié des '
      + 'trois quarts fait trois huitièmes, moins que trois quarts.',
    controle: 'Compare chaque facteur à 1 : deux facteurs inférieurs à 1 donnent un résultat encore plus petit.',
    raisonnements: [
      { id: 'multiplier-agrandit', texte: 'Une multiplication donne toujours un plus grand nombre', reponse: 'C\'était vrai avec des entiers. Prendre la moitié de quelque chose, c\'est bien multiplier — et ça diminue.' },
      { id: 'calcul-juste-doute', texte: "Mon résultat me paraissait trop petit", reponse: 'Il l\'est légitimement. Vérifie avec l\'ordre de grandeur plutôt qu\'avec l\'intuition.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Les facteurs sont-ils plus grands ou plus petits que 1 ?' },
    ],
  },

  // Le symétrique du précédent, du côté de la division — comme
  // « diviser-diminue-toujours » l'est de « multiplier-agrandit-toujours » au
  // chapitre 1. Sans lui, une erreur de division se rangeait sous le piège du
  // produit, qui sert la règle inverse : « ton résultat est légitimement plus
  // petit ». Exactement ce qu'il ne faut pas dire à un élève dont le quotient
  // doit dépasser le nombre de départ.
  'quotient-de-fractions-plus-petit': {
    nom: 'Quotient de fractions supposé plus petit',
    chapitre: 9,
    regle:
      'Diviser par une fraction plus petite que 1 **agrandit** : il y a quatre '
      + 'quarts de litre dans un litre, et douze dans trois litres.\n'
      + 'Le diviseur compte : plus petit que 1, le quotient dépasse le nombre de '
      + 'départ ; plus grand que 1, il lui est inférieur.',
    controle: 'Compare le diviseur à 1 avant de calculer : il annonce le sens du résultat.',
    raisonnements: [
      { id: 'diviser-diminue', texte: 'Je pensais qu\'une division donne toujours un plus petit nombre', reponse: 'Diviser par 2, oui. Mais diviser par 1/2, c\'est demander « combien de demis ? » — et il y en a deux fois plus.' },
      { id: 'resultat-trop-grand', texte: "Mon résultat me paraissait trop grand", reponse: 'Il l\'est légitimement : le diviseur est plus petit que 1. Multiplie ta réponse par lui, tu dois retomber sur le nombre de départ.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le diviseur est-il plus grand ou plus petit que 1 ?' },
    ],
  },

  // ── Chapitre 10 : translations, parallélogrammes, cas d'égalité ───────────
  //
  // Les figures ne s'affichent pas dans l'application : tout se raisonne par
  // coordonnées ou par propriétés. C'est une contrainte, mais elle a un
  // avantage — elle interdit de « voir » la réponse et force à démontrer,
  // ce que le programme demande précisément.

  'translation-et-symetrie-confondues': {
    nom: 'Translation confondue avec une symétrie',
    chapitre: 10,
    regle:
      'Une translation fait **glisser** la figure : tous les points se déplacent '
      + 'dans la même direction, du même sens et de la même longueur. Une symétrie '
      + 'la retourne.',
    controle: 'Vérifie que tous les points se déplacent pareil : le décalage doit être identique pour chacun.',
    raisonnements: [
      { id: 'figure-retournee', texte: "J'ai retourné la figure", reponse: 'C\'est une symétrie. Une translation garde la figure dans le même sens, elle la déplace seulement.' },
      { id: 'un-seul-point', texte: "Je n'ai déplacé qu'une partie de la figure", reponse: 'Tous les points suivent le même déplacement, sans exception.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le déplacement est-il le même pour tous les points ?' },
    ],
  },

  'sens-de-translation-inverse': {
    nom: 'Translation appliquée dans le mauvais sens',
    chapitre: 10,
    regle:
      'Une translation a un sens. Si A(1 ; 2) a pour image A′(4 ; 5), le '
      + 'déplacement est +3 en abscisse et +3 en ordonnée — et il s\'applique dans '
      + 'ce sens à tous les autres points.',
    controle: 'Calcule le déplacement sur le point donné, puis applique-le tel quel : ne change pas les signes.',
    raisonnements: [
      { id: 'signes-inverses', texte: "J'ai soustrait au lieu d'ajouter", reponse: 'Le déplacement se lit de l\'original vers l\'image. Applique-le dans le même sens aux autres points.' },
      { id: 'image-et-antecedent', texte: "J'ai confondu le point et son image", reponse: 'Repère bien lequel est l\'original : c\'est lui qui part, l\'autre qui arrive.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'De combien se déplace-t-on horizontalement ? Et verticalement ?' },
    ],
  },

  'conservation-mal-attribuee': {
    nom: 'Propriété supposée modifiée par la translation',
    chapitre: 10,
    regle:
      'Une translation conserve **tout** : longueurs, angles, aires, parallélisme, '
      + 'alignement. Elle ne change que la position.',
    controle: 'Rien ne change sauf la place : si une longueur ou un angle diffère, ce n\'est pas une translation.',
    raisonnements: [
      { id: 'deformation-supposee', texte: 'Je pensais que la figure changeait de taille', reponse: 'C\'est un agrandissement qui ferait ça. Une translation déplace sans déformer.' },
      { id: 'angles-changes', texte: 'Je pensais que les angles changeaient', reponse: 'Ils sont identiques : la figure est la même, posée ailleurs.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Qu\'est-ce qu\'une translation change, à part la position ?' },
    ],
  },

  'cas-degalite-invoque-sans-verifier': {
    nom: 'Cas d\'égalité invoqué sans vérifier ses conditions',
    chapitre: 10,
    regle:
      'Chaque cas d\'égalité a des conditions précises : trois côtés, ou bien un '
      + 'côté et les deux angles qui lui sont adjacents, ou bien deux côtés et '
      + 'l\'angle **entre** eux. Un angle mal placé ne suffit pas.',
    controle: 'Avant de conclure, relis les conditions du cas invoqué et coche-les une par une.',
    raisonnements: [
      { id: 'assez-dinformations', texte: "Il y avait assez d'informations, j'ai conclu", reponse: 'La quantité ne suffit pas : ce sont les bonnes informations, à la bonne place, qui décident.' },
      { id: 'angle-mal-place', texte: "L'angle n'était pas entre les deux côtés", reponse: 'C\'est exactement le piège. Deux côtés et un angle qui n\'est pas entre eux ne suffisent pas.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelles sont les conditions du cas que tu utilises ?' },
    ],
  },

  'parallelogramme-conclu-trop-vite': {
    nom: 'Parallélogramme conclu d\'une seule propriété',
    chapitre: 10,
    regle:
      'Un seul couple de côtés parallèles ne suffit pas — c\'est un trapèze. Il '
      + 'faut soit les deux couples parallèles, soit un couple à la fois parallèle '
      + 'ET de même longueur, soit des diagonales qui se coupent en leur milieu.',
    controle: 'Nomme la propriété exacte que tu utilises, et vérifie que ses conditions sont toutes réunies.',
    raisonnements: [
      { id: 'un-couple-suffit', texte: 'Deux côtés parallèles, ça suffit', reponse: 'Ça donne un trapèze. Pour un parallélogramme il faut une condition de plus.' },
      { id: 'parallele-ou-egal', texte: "J'ai vu des côtés parallèles OU de même longueur", reponse: 'Il faut les DEUX sur le même couple de côtés — parallèles et de même longueur.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle propriété exacte utilises-tu ?' },
    ],
  },

  // ── Chapitre 11 : équations du premier degré ──────────────────────────────
  //
  // « Ça change de côté, ça change de signe » est la formule la plus
  // dangereuse du programme : c'est une compression du procédé légitime
  // — retrancher aux deux membres — enseignée sans le procédé. L'élève la
  // récite sans connaître son domaine de validité, et l'applique donc au
  // coefficient multiplicatif, où elle est fausse.

  'transposition-du-coefficient': {
    nom: 'Coefficient transposé comme un terme',
    chapitre: 11,
    regle:
      '« Ça change de côté, ça change de signe » ne vaut que pour les termes '
      + '**additionnés**. Dans 2x = 8, le 2 **multiplie** x : on divise les deux '
      + 'membres par 2, on ne soustrait pas.',
    controle: 'Demande-toi si le nombre est ajouté ou multiplié : on annule une addition par une soustraction, une multiplication par une division.',
    raisonnements: [
      { id: 'change-de-signe', texte: "J'ai fait passer le 2 de l'autre côté en changeant son signe", reponse: 'Ce geste annule une addition. Ici le 2 multiplie : c\'est une division qui l\'annule.' },
      { id: 'formule-recitee', texte: "J'ai appliqué la formule sans regarder l'opération", reponse: 'La formule ne dit pas ce qu\'elle annule. Regarde d\'abord : le nombre est-il ajouté ou multiplié ?' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le 2 est-il ajouté à x, ou multiplié par x ?' },
    ],
  },

  'operation-sur-un-seul-membre': {
    nom: 'Opération faite sur un seul membre',
    chapitre: 11,
    regle:
      'Une équation est une balance : ce qu\'on fait d\'un côté, on le fait de '
      + 'l\'autre. Sinon l\'égalité est rompue et la solution change.',
    controle: 'Relis ta ligne : les deux membres ont-ils subi exactement la même opération ?',
    raisonnements: [
      { id: 'un-cote-oublie', texte: "J'ai oublié de le faire des deux côtés", reponse: 'C\'est l\'erreur la plus fréquente. Écris l\'opération sous les deux membres avant de calculer.' },
      { id: 'un-seul-terme', texte: "Je ne l'ai appliqué qu'à un terme du membre", reponse: 'Toute l\'expression du membre est concernée, pas seulement le terme le plus proche.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Ce que tu fais à gauche, fais-le à droite.' },
    ],
  },

  'solution-non-verifiee': {
    nom: 'Solution rendue sans vérification',
    chapitre: 11,
    regle:
      'Résoudre, c\'est trouver la valeur qui rend l\'égalité vraie. Il suffit de '
      + 'la remplacer dans l\'équation de départ pour savoir si c\'est gagné.',
    controle: 'Remplace x par ta réponse dans l\'équation de DÉPART : les deux membres doivent donner le même nombre.',
    raisonnements: [
      { id: 'pas-verifie', texte: "Je n'ai pas vérifié", reponse: 'C\'est le seul exercice de maths où l\'on peut toujours savoir seul si on a juste. Ce serait dommage de s\'en priver.' },
      { id: 'erreur-de-calcul', texte: "Ma méthode était bonne mais j'ai calculé de travers", reponse: 'La vérification l\'aurait attrapée. Prends l\'habitude, même quand tu es sûr.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Remplace x par ta réponse et regarde si l\'égalité tient.' },
    ],
  },

  'inconnue-mal-choisie': {
    nom: 'Inconnue mal désignée dans la mise en équation',
    chapitre: 11,
    regle:
      'On appelle x **la grandeur cherchée**, et on exprime tout le reste en '
      + 'fonction d\'elle. Choisir la mauvaise mène à une équation juste qui '
      + 'répond à une autre question.',
    controle: 'Écris « je note x … » en toutes lettres avant de poser l\'équation, et relis la question à la fin.',
    raisonnements: [
      { id: 'autre-grandeur', texte: "J'ai appelé x une autre grandeur que celle demandée", reponse: 'L\'équation peut être juste et la réponse fausse. Relis la question : que cherche-t-on exactement ?' },
      { id: 'oubli-de-conclure', texte: "J'ai trouvé x mais ce n'était pas la réponse à la question", reponse: 'Il reste une étape : revenir de x à la grandeur demandée.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que cherche-t-on ? C\'est ça qu\'on appelle x.' },
    ],
  },

  // ── Chapitre 12 : théorème de Thalès et agrandissement ────────────────────

  'thales-sans-parallelisme': {
    nom: 'Thalès appliqué sans droites parallèles',
    chapitre: 12,
    regle:
      'Le théorème de Thalès exige des droites **parallèles**. Sans elles, les '
      + 'rapports de longueurs ne sont pas égaux.',
    controle: 'Cherche la mention du parallélisme dans l\'énoncé avant d\'écrire le moindre rapport.',
    raisonnements: [
      { id: 'cetait-le-chapitre', texte: 'C\'est le théorème qu\'on travaille', reponse: 'En contrôle, rien n\'annonce le chapitre. Le parallélisme est la condition, pas un détail.' },
      { id: 'figure-qui-ressemble', texte: 'La configuration ressemblait à celle du cours', reponse: 'Ressembler ne suffit pas. Sans parallèles, les rapports ne sont pas égaux.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'L\'énoncé parle-t-il de droites parallèles ?' },
    ],
  },

  'rapports-mal-apparies': {
    nom: 'Longueurs mal appariées dans les rapports',
    chapitre: 12,
    regle:
      'Chaque rapport compare deux longueurs **qui se correspondent** : le petit '
      + 'triangle avec le grand, dans le même ordre. Mélanger les deux triangles '
      + 'dans un même rapport donne un résultat faux.',
    controle: 'Écris les deux triangles l\'un sous l\'autre, sommet par sommet : les correspondances sautent aux yeux.',
    raisonnements: [
      { id: 'ordre-melange', texte: "J'ai mélangé les longueurs des deux triangles", reponse: 'Chaque fraction compare un côté du petit à SON correspondant dans le grand. L\'ordre doit être le même partout.' },
      { id: 'sommets-non-identifies', texte: "Je n'ai pas su quels sommets se correspondaient", reponse: 'Ils se correspondent dans l\'ordre où l\'énoncé nomme les triangles.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel côté du grand triangle correspond à celui-ci ?' },
    ],
  },

  'aire-et-rapport-confondus': {
    nom: 'Aire multipliée par le rapport au lieu de son carré',
    chapitre: 12,
    regle:
      'Si les longueurs sont multipliées par k, les **aires** le sont par k² et '
      + 'les **volumes** par k³. Doubler le côté d\'un carré quadruple son aire.',
    controle: 'Dessine ou imagine : un carré de côté doublé contient quatre carrés d\'origine, pas deux.',
    raisonnements: [
      { id: 'meme-coefficient', texte: "J'ai multiplié l'aire par le même nombre que les longueurs", reponse: 'Une aire est un produit de deux longueurs : les deux sont multipliées, donc le coefficient l\'est aussi.' },
      { id: 'volume-oublie', texte: "Pour le volume j'ai pris le carré au lieu du cube", reponse: 'Un volume est un produit de trois longueurs. Compte-les : k × k × k.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de longueurs multiplie-t-on pour obtenir une aire ?' },
    ],
  },

  'configuration-non-verifiee': {
    nom: 'Configuration de Thalès supposée sans vérification',
    chapitre: 12,
    regle:
      'En 4e, Thalès ne s\'utilise que dans la configuration des **triangles '
      + 'emboîtés** : un sommet commun, et les deux autres côtés portés par les '
      + 'mêmes droites.',
    controle: 'Vérifie qu\'il y a bien un sommet commun aux deux triangles avant d\'écrire les rapports.',
    raisonnements: [
      { id: 'trois-longueurs', texte: 'Il y avait trois longueurs, j\'ai appliqué le théorème', reponse: 'La quantité de données ne fait pas la configuration. Il faut le sommet commun et les parallèles.' },
      { id: 'papillon', texte: "Les triangles étaient de part et d'autre du point", reponse: 'C\'est la configuration « papillon », qui est au programme de 3e. En 4e, seuls les triangles emboîtés.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Les deux triangles ont-ils un sommet commun ?' },
    ],
  },

  // ── Chapitre 13 — Cosinus ────────────────────────────────────────────────
  //
  // Le cosinus est le premier nombre que l'élève rencontre qui n'est ni une
  // longueur ni un compte : un RAPPORT, qui code une forme. Presque toutes les
  // erreurs du chapitre viennent de là — on le manipule comme un facteur, on le
  // croit croissant, on lui cherche une unité.

  'adjacent-mal-identifie': {
    nom: 'Côté adjacent confondu avec le côté opposé',
    chapitre: 13,
    regle:
      'Le côté **adjacent** à un angle est celui qui le touche sans être '
      + 'l\'hypoténuse. Il dépend de l\'angle choisi : dans un même triangle, le '
      + 'côté adjacent à l\'un des angles aigus est le côté opposé à l\'autre.',
    controle: 'Pose le doigt sur le sommet de l\'angle : les deux côtés qui en partent sont l\'hypoténuse et l\'adjacent. Le troisième ne le touche pas.',
    raisonnements: [
      { id: 'le-plus-proche', texte: "J'ai pris le côté qui me paraissait le plus proche", reponse: 'Adjacent a un sens précis : il TOUCHE l\'angle. Nomme les deux côtés qui partent de son sommet, écarte l\'hypoténuse, il reste l\'adjacent.' },
      { id: 'meme-cote-pour-les-deux', texte: "J'ai gardé le même côté que pour l'autre angle", reponse: 'Changer d\'angle change l\'adjacent. Seule l\'hypoténuse ne bouge pas : c\'est toujours le côté opposé à l\'angle droit.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quels sont les deux côtés qui partent du sommet de cet angle ?' },
    ],
  },

  'multiplier-au-lieu-de-diviser': {
    nom: 'Produit et quotient échangés dans la formule du cosinus',
    chapitre: 13,
    regle:
      'cos = adjacent ÷ hypoténuse. Pour trouver l\'**adjacent**, on multiplie : '
      + 'adjacent = hypoténuse × cos. Pour trouver l\'**hypoténuse**, on divise : '
      + 'hypoténuse = adjacent ÷ cos.',
    controle: 'L\'hypoténuse est toujours le plus long des trois côtés. Compare ton résultat aux longueurs données : ce seul contrôle attrape les deux erreurs, celle qui raccourcit et celle qui allonge.',
    raisonnements: [
      { id: 'un-seul-geste', texte: 'Avec le cosinus, on multiplie', reponse: 'Pas toujours. La formule est un quotient : selon que l\'inconnue est en haut ou en bas, l\'opération change.' },
      { id: 'cosinus-en-facteur', texte: "Le cosinus est un nombre, je l'ai mis en facteur", reponse: 'Il est en facteur quand on cherche l\'adjacent. Quand on cherche l\'hypoténuse, il passe au dénominateur — et diviser par un nombre plus petit que 1 allonge.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le côté que tu cherches est-il l\'hypoténuse, ou l\'adjacent ?' },
    ],
  },

  'cosinus-plus-grand-que-un': {
    nom: 'Cosinus supérieur à 1',
    chapitre: 13,
    regle:
      'Le cosinus d\'un angle aigu est toujours compris **entre 0 et 1**, parce '
      + 'que le côté adjacent est toujours plus court que l\'hypoténuse.',
    controle: 'Un cosinus supérieur à 1 est impossible : c\'est le signe que les deux longueurs ont été échangées dans le quotient.',
    raisonnements: [
      { id: 'calcul-refait', texte: "J'ai refait le calcul et je trouve pareil", reponse: 'Refaire le même calcul redonne la même erreur. Regarde plutôt lequel des deux nombres est l\'hypoténuse : c\'est le plus grand, et il va au dénominateur.' },
      { id: 'plus-grand-en-haut', texte: "J'ai mis le plus grand nombre en haut", reponse: 'C\'est l\'inverse : l\'hypoténuse, la plus longue, va en bas. Obtenir un quotient plus petit que 1 est justement ce qu\'on attend.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Un côté peut-il être plus long que l\'hypoténuse ?' },
    ],
  },

  'arccos-et-cosinus-confondus': {
    nom: 'Cosinus employé là où il faut revenir à l\'angle',
    chapitre: 13,
    regle:
      'cos transforme un **angle** en nombre. Pour faire le trajet inverse — du '
      + 'nombre vers l\'angle — il faut cos⁻¹. Et cos⁻¹ n\'est pas 1 ÷ cos.',
    controle: 'Un cosinus n\'a pas d\'unité, un angle se mesure en degrés. Si la réponse attendue est en degrés, elle sort de cos⁻¹.',
    raisonnements: [
      { id: 'moins-un-cest-linverse', texte: "cos⁻¹, c'est bien 1 divisé par cos ?", reponse: 'Non. L\'écriture ressemble à celle de l\'inverse, mais cet exposant −1 note le trajet retour : du rapport vers l\'angle.' },
      { id: 'jai-applique-cos', texte: "J'ai appliqué cos au nombre que j'avais trouvé", reponse: 'Ça repart dans le mauvais sens. Tu as déjà le rapport ; ce qui manque, c\'est l\'angle dont il est le cosinus.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Ta réponse doit-elle être un nombre de degrés, ou un rapport de longueurs ?' },
    ],
  },

  'cosinus-sans-angle-droit': {
    nom: 'Cosinus appliqué sans angle droit',
    chapitre: 13,
    // La phrase qui tient seule vient en premier : ce piège se déclenche dès le
    // savoir-faire 1, où l'on nomme des côtés et où aucun cosinus n'a encore été
    // écrit. Ouvrir la règle sur la formule y ferait découvrir le cosinus dans
    // une remédiation, avant le cours qui l'installe.
    regle:
      'Sans angle droit, un triangle n\'a ni hypoténuse ni côté adjacent : les deux '
      + 'mots ne désignent plus rien. La relation cos = adjacent ÷ hypoténuse n\'a '
      + 'donc de sens que dans un triangle **rectangle**.',
    controle: 'Cherche la mention de l\'angle droit dans l\'énoncé avant d\'écrire le moindre cosinus.',
    raisonnements: [
      { id: 'cetait-le-chapitre', texte: "C'est le chapitre du cosinus", reponse: 'En contrôle, rien n\'annonce le chapitre. L\'angle droit est la condition, pas un décor.' },
      { id: 'trois-donnees', texte: "Il y avait un angle et deux longueurs, j'ai appliqué la formule", reponse: 'La quantité de données ne crée pas le triangle rectangle. Sans angle droit, aucun des deux mots — hypoténuse, adjacent — ne désigne quoi que ce soit.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'L\'énoncé parle-t-il d\'un angle droit ?' },
    ],
  },

  'cosinus-croit-avec-langle': {
    nom: 'Cosinus supposé croître avec l\'angle',
    chapitre: 13,
    regle:
      'Quand l\'angle **augmente**, son cosinus **diminue** : il vaut 1 pour 0° '
      + 'et 0 pour 90°. Un angle deux fois plus grand n\'a pas un cosinus deux '
      + 'fois plus grand.',
    controle: 'Situe ton angle entre les deux bornes connues : cos 0° = 1, cos 90° = 0. Entre les deux, ça descend.',
    raisonnements: [
      { id: 'plus-grand-donc-plus-grand', texte: 'Un angle plus grand donne un cosinus plus grand', reponse: 'C\'est l\'inverse. Imagine l\'angle s\'ouvrir : le côté adjacent se raccourcit pendant que l\'hypoténuse reste, donc le quotient descend.' },
      { id: 'double-donc-double', texte: "J'ai doublé l'angle, donc j'ai doublé le cosinus", reponse: 'Le cosinus n\'est pas proportionnel à l\'angle. cos 30° vaut environ 0,87 et cos 60° exactement 0,5 : doubler l\'angle donne moins, pas le double.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que vaut le cosinus quand l\'angle vaut 90° ?' },
    ],
  },

  // ── Chapitre 14 — Dépendance de deux grandeurs ───────────────────────────
  //
  // Deux familles qu'il vaut mieux ne pas mélanger : trois pièges d'ÉCRITURE
  // (traduire une situation en formule) et trois pièges de LECTURE (tirer une
  // information d'un graphique). Le plus profond des six, « graphique lu comme
  // un dessin », est aussi le mieux documenté de la didactique des fonctions.

  'formule-inversee': {
    nom: 'Formule écrite dans le mauvais sens',
    chapitre: 14,
    regle:
      'La grandeur qu\'on **cherche** se place seule à gauche du signe égal. '
      + '« Le prix dépend de la durée » s\'écrit prix = … × durée, et non '
      + 'durée = … × prix.',
    controle: 'Remplace la lettre par un nombre simple, calcule, et demande-toi si le résultat est bien la grandeur annoncée.',
    raisonnements: [
      { id: 'ordre-de-lenonce', texte: "J'ai écrit dans l'ordre de l'énoncé", reponse: 'L\'énoncé raconte, la formule calcule. Elle commence par ce qu\'on cherche, quel que soit l\'ordre du texte.' },
      { id: 'egalite-symetrique', texte: 'Une égalité se lit dans les deux sens', reponse: 'Une égalité, oui — mais ici les deux membres n\'ont pas été échangés : l\'opération est restée du même côté, ce qui en fait une autre formule.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Laquelle des deux grandeurs dépend de l\'autre ?' },
    ],
  },

  'part-fixe-multipliee': {
    nom: 'Part fixe multipliée par la variable',
    chapitre: 14,
    regle:
      'Dans « 15 € d\'abonnement, puis 2 € par séance », seul le prix **par '
      + 'séance** se multiplie : prix = 2 × n + 15. L\'abonnement se paie une '
      + 'fois, quel que soit n.',
    controle: 'Teste avec n = 0 : la formule doit rendre exactement la part fixe. Puis avec n = 1 : la part fixe plus une séance.',
    raisonnements: [
      { id: 'les-deux-nombres', texte: "J'ai utilisé les deux nombres de l'énoncé", reponse: 'Les deux y sont, mais pas au même endroit : l\'un multiplie, l\'autre s\'ajoute. Cherche celui qui revient à chaque fois.' },
      { id: 'ordre-decriture', texte: "J'ai gardé l'ordre des nombres du texte", reponse: 'L\'ordre du texte ne dit pas le rôle. Le nombre qui multiplie est celui qu\'on annonce « par » quelque chose : par séance, par kilomètre, par mois.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que paie-t-on si on ne vient à aucune séance ?' },
    ],
  },

  'axes-echanges': {
    nom: 'Abscisse et ordonnée échangées',
    chapitre: 14,
    regle:
      'On repère d\'abord **horizontalement** (l\'abscisse), puis **verticalement** '
      + '(l\'ordonnée). Le point (3 ; 8) est à 3 sur l\'axe du bas et à 8 sur '
      + 'l\'axe de gauche.',
    controle: 'Lis les titres écrits le long des deux axes : la grandeur que te donne la question dit par quel axe commencer.',
    raisonnements: [
      { id: 'ordre-inverse', texte: "J'ai commencé par l'axe vertical", reponse: 'On part de l\'axe horizontal : il porte la grandeur dont l\'autre dépend. On monte ensuite jusqu\'au tracé.' },
      { id: 'les-titres-non-lus', texte: "Je n'ai pas regardé les titres des axes", reponse: 'C\'est là que tout se joue : sans eux, deux nombres sur un dessin ne veulent rien dire. Lis-les avant de chercher le point.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle grandeur la question te donne-t-elle, et sur quel axe est-elle écrite ?' },
    ],
  },

  'graduation-comptee-en-carreaux': {
    nom: 'Carreaux comptés au lieu des valeurs lues',
    chapitre: 14,
    regle:
      'Un carreau ne vaut pas toujours 1. Il faut lire les **nombres écrits** '
      + 'sur l\'axe : si les graduations vont de 5 en 5, trois carreaux valent 15.',
    controle: 'Lis deux nombres voisins sur l\'axe et fais leur différence : tu sais alors ce que vaut un carreau.',
    raisonnements: [
      { id: 'un-carreau-un', texte: "J'ai compté les carreaux", reponse: 'Compte plutôt ce que vaut UN carreau, en lisant deux graduations voisines. Ensuite seulement, compte les carreaux.' },
      { id: 'axe-commence-a-zero', texte: "J'ai supposé que l'axe partait de 0", reponse: 'Regarde la première graduation écrite : elle ne vaut pas toujours 0, et tout le reste se décale avec elle.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien vaut un carreau sur cet axe ?' },
    ],
  },

  'proportionnalite-supposee': {
    nom: 'Proportionnalité supposée sans vérification',
    chapitre: 14,
    regle:
      'Une dépendance n\'est proportionnelle que si son tracé est une **droite '
      + 'passant par l\'origine**. Sinon, doubler la première grandeur ne double '
      + 'pas la seconde, et aucun produit en croix n\'est permis.',
    controle: 'Regarde d\'où part le tracé. S\'il ne part pas de (0 ; 0), la proportionnalité est exclue.',
    raisonnements: [
      { id: 'cest-une-droite', texte: "C'était une droite", reponse: 'Une droite ne suffit pas : il lui faut passer par l\'origine. Une droite qui démarre à 15 € décrit un abonnement, pas une proportionnalité.' },
      { id: 'produit-en-croix-partout', texte: "J'ai fait un produit en croix", reponse: 'Le produit en croix ne vaut que dans un tableau de proportionnalité. Vérifie d\'abord que c\'en est un : ici, le point (0 ; 0) manque.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que coûte une quantité nulle ? Le tracé passe-t-il par zéro ?' },
    ],
  },

  'graphique-lu-comme-un-dessin': {
    nom: 'Graphique lu comme le dessin de la situation',
    chapitre: 14,
    regle:
      'Un graphique n\'est pas une **photographie** de la scène. Une portion qui '
      + 'monte ne représente pas une côte : elle dit que la grandeur portée par '
      + 'l\'axe vertical augmente.',
    controle: 'Relis les titres des deux axes et dis la montée à voix haute : « quand … augmente, … augmente ». Si la phrase parle de la forme du terrain, c\'est raté.',
    raisonnements: [
      { id: 'ca-montait', texte: 'La courbe montait, donc ça montait', reponse: 'Tout dépend de ce que porte l\'axe vertical. Si c\'est une vitesse, la montée dit qu\'on accélère — et ça peut être sur une route parfaitement plate.' },
      { id: 'forme-du-parcours', texte: "J'ai suivi la forme du trajet", reponse: 'Le tracé ne dessine pas le trajet. Il met deux grandeurs en regard, et l\'axe horizontal est rarement la distance parcourue.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Qu\'est-il écrit le long de l\'axe vertical ?' },
    ],
  },

  // ── Chapitre 15 — Pyramides, cônes, repérage dans l'espace ───────────────
  //
  // Le chapitre où l'élève doit tenir dans sa tête un objet que la feuille ne
  // montre que de biais. Deux familles d'erreurs en découlent : celles qui
  // portent sur la FORMULE (le tiers, l'aire de base), et celles qui portent
  // sur la LONGUEUR qu'on y met (hauteur ou arête, rayon ou diamètre). Les
  // secondes sont les plus tenaces, parce qu'elles produisent un calcul
  // parfaitement mené sur la mauvaise donnée.

  'tiers-oublie': {
    nom: 'Le tiers oublié dans le volume',
    chapitre: 15,
    regle:
      'Le volume d\'une pyramide ou d\'un cône vaut **un tiers** de celui du '
      + 'prisme ou du cylindre de même base et de même hauteur : '
      + 'V = aire de la base × hauteur ÷ 3.',
    controle: 'Un cône tient trois fois dans le cylindre qui l\'enveloppe. Si ton volume est du même ordre que celui de ce cylindre, le tiers manque.',
    raisonnements: [
      { id: 'formule-du-prisme', texte: "J'ai fait aire de la base × hauteur", reponse: 'C\'est la formule du prisme, le solide à deux bases parallèles. Une pyramide n\'en a qu\'une, et elle tient trois fois dans le prisme correspondant.' },
      { id: 'tiers-sur-la-hauteur', texte: "J'ai divisé la hauteur par 3, puis multiplié par la base", reponse: 'Ça donne exactement le même nombre : ce geste-là est juste. Si tu es tombé faux, l\'erreur est ailleurs — vérifie ton aire de base.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de fois un cône tient-il dans le cylindre de même base et de même hauteur ?' },
    ],
  },

  'hauteur-et-arete-confondues': {
    nom: 'Hauteur confondue avec une oblique — arête, apothème ou génératrice',
    chapitre: 15,
    // La première rédaction ne nommait que l'arête et l'apothème. Sur un cône,
    // l'oblique s'appelle une GÉNÉRATRICE : la règle était donc muette sur la
    // moitié des items du chapitre, et muette dans les deux sens — elle ne
    // disait rien à l'élève qui rend la hauteur là où on demande l'oblique.
    regle:
      'La **hauteur** d\'une pyramide ou d\'un cône est la distance du sommet à '
      + 'la base, mesurée perpendiculairement. Une arête latérale, un apothème '
      + 'ou une génératrice partent aussi du sommet, mais **obliquement** : '
      + 'chacune est donc plus longue que la hauteur, jamais égale.',
    controle: 'Range tes longueurs. Celle que tu appelles hauteur doit être la plus courte de toutes celles qui descendent du sommet, et toute oblique doit la dépasser.',
    raisonnements: [
      { id: 'la-seule-donnee', texte: "C'était la seule longueur donnée en plus de la base", reponse: 'Alors la hauteur est à trouver, le plus souvent par Pythagore : la hauteur, l\'oblique, et le rayon (ou la demi-diagonale, ou la moitié du côté) forment un triangle rectangle.' },
      { id: 'ca-part-du-sommet', texte: 'Elle part bien du sommet', reponse: 'Plusieurs longueurs partent du sommet. La hauteur est celle qui tombe perpendiculairement sur la base — donc la plus courte de toutes.' },
      { id: 'jai-rendu-la-hauteur', texte: "J'ai donné la hauteur là où on demandait l'oblique", reponse: 'C\'est la même confusion prise à l\'envers, et elle se repère pareil : l\'oblique descend en biais jusqu\'au bord de la base, elle est donc plus longue que la hauteur.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'La longueur que tu as employée est-elle perpendiculaire à la base, ou penchée ?' },
    ],
  },

  'rayon-et-diametre-confondus': {
    nom: 'Rayon et diamètre confondus',
    chapitre: 15,
    regle:
      'Le rayon est la **moitié** du diamètre. L\'aire d\'un disque se calcule '
      + 'avec le rayon : π × r × r.',
    controle: 'Relis l\'énoncé : donne-t-il le rayon, ou le diamètre ? Employer l\'un pour l\'autre multiplie l\'aire par 4, et donc le volume aussi.',
    raisonnements: [
      { id: 'le-nombre-donne', texte: "J'ai pris le nombre donné dans l'énoncé", reponse: 'L\'énoncé donnait le diamètre. Il faut le couper en deux avant de le porter dans la formule.' },
      { id: 'ca-change-peu', texte: 'Ça ne change pas grand-chose', reponse: 'Ça multiplie l\'aire par 4. Sur un volume, l\'écart devient énorme — et c\'est toujours dans le même sens, vers le trop grand.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le nombre de l\'énoncé mesure-t-il du centre au bord, ou de bord à bord ?' },
    ],
  },

  'perimetre-au-lieu-de-laire': {
    nom: 'Périmètre du disque employé comme aire',
    chapitre: 15,
    regle:
      'L\'aire d\'un disque est **π × r²**. La longueur de son bord est '
      + '2 × π × r : c\'est une longueur, pas une aire.',
    controle: 'Compte les longueurs multipliées dans ta formule : deux donnent une aire (en cm²), une seule donne une longueur (en cm).',
    raisonnements: [
      { id: 'les-deux-se-ressemblent', texte: 'Les deux formules se ressemblent', reponse: 'Elles se distinguent par un détail décisif : dans π r² il y a deux r, donc une aire ; dans 2 π r il n\'y en a qu\'un, donc une longueur.' },
      { id: 'unite-non-regardee', texte: "Je n'ai pas regardé l'unité", reponse: 'C\'est elle qui tranche sans rien recalculer. Une base de cône se mesure en cm² : une formule qui rend des cm ne peut pas être la bonne.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de longueurs faut-il multiplier pour obtenir une aire ?' },
    ],
  },

  'base-non-comptee': {
    nom: 'Base oubliée dans le patron ou dans le compte des faces',
    chapitre: 15,
    regle:
      'Une pyramide a autant de faces latérales que sa base a de côtés, **plus '
      + 'la base elle-même**. Le patron d\'un cône est fait du secteur ET du '
      + 'disque de base.',
    controle: 'Referme le solide dans ta tête : s\'il reste un trou par où voir l\'intérieur, une face manque.',
    raisonnements: [
      { id: 'jai-compte-les-triangles', texte: "J'ai compté les faces triangulaires", reponse: 'Elles ne suffisent pas à fermer le solide : il manque celle sur laquelle il pose.' },
      { id: 'la-base-nest-pas-une-face', texte: "La base n'est pas vraiment une face", reponse: 'C\'en est une. Elle ferme le solide, et elle compte aussi bien dans l\'aire totale que dans le patron.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Ton compte suffit-il à fermer le solide de tous les côtés ?' },
    ],
  },

  'unite-de-volume-mal-convertie': {
    nom: 'Conversion appliquée aux volumes comme aux longueurs',
    chapitre: 15,
    regle:
      'Passer des cm aux dm divise les longueurs par 10, mais les volumes par '
      + '**1 000** : un dm³ vaut mille cm³. Et 1 dm³ = 1 L.',
    controle: 'Compte les dimensions : un volume multiplie trois longueurs, donc le facteur de conversion se met au cube.',
    raisonnements: [
      { id: 'meme-facteur', texte: "J'ai divisé par 10, comme pour les longueurs", reponse: 'Un volume multiplie trois longueurs. Chacune est divisée par 10, donc le volume par 10 × 10 × 10.' },
      { id: 'litres', texte: 'Je ne savais pas passer aux litres', reponse: '1 L = 1 dm³. Convertis d\'abord ton volume en dm³ : tu as les litres sans autre calcul.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de longueurs multiplie-t-on pour obtenir un volume ?' },
    ],
  },

  'troisieme-coordonnee-oubliee': {
    nom: 'Troisième coordonnée oubliée ou mal placée',
    chapitre: 15,
    regle:
      'Dans l\'espace, un point se repère par **trois** nombres, toujours dans '
      + 'le même ordre annoncé par l\'énoncé. Deux nombres ne suffisent pas, et '
      + 'les intervertir désigne un autre point.',
    controle: 'Compte les nombres de ta réponse : il en faut trois, un par direction du pavé.',
    raisonnements: [
      { id: 'deux-suffisent', texte: "J'ai donné deux nombres, comme dans le plan", reponse: 'Dans un pavé, on peut aussi monter. La troisième direction a besoin de son nombre, même quand il vaut 0.' },
      { id: 'ordre-libre', texte: "J'ai donné les trois bons nombres, mais dans un autre ordre", reponse: 'L\'ordre fait partie de la réponse : dans un pavé à base carrée de 6 cm de côté, (6 ; 0 ; 0) et (0 ; 6 ; 0) sont deux sommets différents — B et D.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de directions faut-il suivre pour aller de l\'origine à ce sommet ?' },
    ],
  },

  // ── Chapitre 16 — Probabilités ───────────────────────────────────────────
  //
  // Le seul chapitre du programme où l'intuition ordinaire est activement
  // FAUSSE, et où elle résiste au calcul. Deux des six pièges — le sophisme du
  // joueur et la confusion fréquence/probabilité — sont des conceptions qu'on
  // retrouve chez des adultes instruits, et qu'énoncer la règle ne suffit pas
  // à déloger : il faut faire constater à l'élève que l'objet n'a pas changé.

  'equiprobabilite-supposee': {
    nom: 'Équiprobabilité supposée sans vérification',
    chapitre: 16,
    regle:
      'La formule « cas favorables ÷ cas possibles » n\'est valable que si '
      + 'toutes les issues ont la **même chance**. Deux issues ne veulent pas '
      + 'dire une chance sur deux.',
    controle: 'Demande-toi si les issues que tu comptes sont interchangeables. Une urne de 3 boules rouges et 1 verte a deux couleurs, mais pas une chance sur deux.',
    raisonnements: [
      { id: 'deux-issues', texte: 'Il y avait deux résultats possibles', reponse: 'Le nombre d\'issues ne dit rien de leurs chances. Compte les objets, pas les catégories.' },
      { id: 'ca-marche-avec-le-de', texte: 'Avec un dé, cette formule marche', reponse: 'Parce que ses six faces sont identiques. Dès que les issues cessent de l\'être, il faut revenir aux objets un par un.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Les issues que tu as comptées ont-elles vraiment la même chance de sortir ?' },
    ],
  },

  'favorables-sur-defavorables': {
    nom: 'Favorables rapportés aux défavorables au lieu du total',
    chapitre: 16,
    regle:
      'Une probabilité, c\'est favorables ÷ **TOTAL**, et non favorables ÷ '
      + 'défavorables. Pour 3 boules rouges parmi 10, elle vaut 3/10, pas 3/7.',
    controle: 'Le dénominateur est le nombre total d\'issues : vérifie qu\'il compte AUSSI les cas favorables.',
    raisonnements: [
      { id: 'chances-contre', texte: "J'ai écrit 3 chances contre 7", reponse: 'C\'est le langage des paris, et il dit bien quelque chose de vrai. Mais une probabilité rapporte au total : ici 3 sur 10.' },
      { id: 'jai-enleve-les-favorables', texte: "J'ai enlevé les favorables du total", reponse: 'Ils en font partie. Le total, c\'est tout ce qui peut sortir — favorable ou non.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien y a-t-il d\'objets en tout dans le sac ?' },
    ],
  },

  'probabilite-hors-des-bornes': {
    nom: 'Probabilité en dehors de 0 et 1',
    chapitre: 16,
    regle:
      'Une probabilité est toujours comprise **entre 0 et 1** : 0 pour un '
      + 'événement impossible, 1 pour un événement certain.',
    controle: 'Un résultat plus grand que 1, ou négatif, est impossible : c\'est le signe qu\'on a divisé à l\'envers, ou soustrait au mauvais endroit.',
    raisonnements: [
      { id: 'total-en-haut', texte: "J'ai mis le total au numérateur", reponse: 'C\'est l\'inverse : les favorables en haut, le total en bas. Il ne peut jamais y avoir plus de favorables que de possibles.' },
      { id: 'pourcentage', texte: "J'ai répondu en pourcentage", reponse: 'Alors écris-le comme tel. 30 tout court n\'est pas une probabilité ; 0,3 ou 30 % en sont une.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Une chance peut-elle valoir plus que la certitude ?' },
    ],
  },

  'contraire-mal-forme': {
    nom: 'Événement contraire mal formé',
    chapitre: 16,
    regle:
      'Le contraire d\'un événement rassemble **tout ce qui n\'est pas lui**, et '
      + 'sa probabilité vaut **1 − p**. Le contraire de « au moins un » est '
      + '« aucun ».',
    controle: 'Additionne les deux probabilités : elles doivent faire exactement 1. Sinon, le contraire est mal formé.',
    raisonnements: [
      { id: 'oppose', texte: "J'ai pris l'opposé, −p", reponse: 'Une probabilité n\'est jamais négative. Le contraire se calcule par 1 − p : ce qui reste quand on retire l\'événement à la certitude.' },
      { id: 'au-moins-un', texte: "Le contraire de « au moins un », c'est « au moins un autre »", reponse: 'Non : c\'est « aucun ». Entre un événement et son contraire, il ne doit rester aucun cas.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que reste-t-il quand cet événement ne se produit pas ?' },
    ],
  },

  'sophisme-du-joueur': {
    nom: 'Le tirage précédent invoqué à tort, ou au contraire ignoré',
    chapitre: 16,
    // La première rédaction ne visait que le sophisme au sens strict — invoquer
    // le passé —, et sa règle commençait par « une urne AVEC REMISE ». Elle
    // était donc muette sur l'élève qui, dans un tirage SANS remise, récite
    // « la chance reste la même » : lue vite, elle le confirmait même. Les deux
    // erreurs sont pourtant la même faute — n'avoir pas demandé si l'objet a
    // changé — et le piège les couvre maintenant toutes les deux.
    regle:
      'Une seule question avant de conclure : **l\'objet a-t-il changé ?** Un '
      + 'dé, une pièce ou une urne **avec remise** n\'ont pas de mémoire — cinq '
      + 'piles d\'affilée ne rendent pas face plus probable. Mais une urne '
      + '**sans remise** a bel et bien changé : une boule en moins, et le total '
      + 'avec elle.',
    controle: 'Recompte ce qui reste avant de calculer. Objet intact : le passé ne change rien. Objet entamé : le dénominateur a baissé lui aussi.',
    raisonnements: [
      { id: 'ca-doit-sequilibrer', texte: 'Ça doit bien finir par s\'équilibrer', reponse: 'Sur un très grand nombre de lancers, les fréquences se rapprochent — mais aucun lancer ne rattrape les précédents. La pièce ne les connaît pas.' },
      { id: 'jamais-six-fois', texte: "Six piles d'affilée, c'est bien trop improbable", reponse: 'Six piles d\'affilée est rare AVANT de commencer. Une fois que cinq sont sortis, il ne reste qu\'un lancer, et il vaut une chance sur deux.' },
      { id: 'la-chance-reste-la-meme', texte: 'La chance reste la même à chaque tirage', reponse: 'Seulement si on remet ce qu\'on a tiré. Ici la boule n\'est pas revenue : il y a un objet de moins dans le sac, et le total a baissé d\'autant.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Ce qu\'on a tiré la première fois a-t-il été remis dans le sac ?' },
    ],
  },

  'frequence-et-probabilite-confondues': {
    nom: 'Fréquence observée prise pour la probabilité',
    chapitre: 16,
    regle:
      'La **fréquence** est ce qu\'on a observé ; la **probabilité** est ce à '
      + 'quoi on peut s\'attendre. Obtenir 7 piles sur 10 lancers ne rend pas '
      + 'la probabilité égale à 0,7.',
    controle: 'Demande-toi d\'où vient ton nombre : d\'un comptage d\'expériences déjà faites, ou de la composition de l\'objet ? Seule la seconde donne une probabilité.',
    raisonnements: [
      { id: 'jai-compte', texte: "J'ai compté ce qui est sorti", reponse: 'Ça donne une fréquence. La probabilité, elle, se lit sur l\'objet : combien de faces, combien de boules de chaque couleur.' },
      { id: 'plus-on-lance', texte: "Plus on lance, plus la fréquence approche la probabilité", reponse: 'C\'est vrai, et c\'est même la loi des grands nombres. Mais dix lancers, c\'est très peu — et une fréquence ne remplace jamais le calcul.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Ton nombre vient-il de ce qui est sorti, ou de ce que contient l\'objet ?' },
    ],
  },

  // ── Chapitre 17 — Algorithmique et programmation ─────────────────────────
  //
  // Le programme officiel demande de greffer ces sections en fin de chapitres,
  // comme le font Transmath et Myriade. On en fait un chapitre visible, et le
  // motif est propre à l'application : un manuel se feuillette, alors qu'ici
  // le suivi est par savoir-faire et les révisions sont espacées. Trois
  // sections cachées en queue de trois chapitres différents ne se retrouvent
  // pas, et donc ne se révisent jamais.
  //
  // Les cinq pièges tiennent à une seule idée que le collégien n'a nulle part
  // ailleurs : un programme s'exécute DANS LE TEMPS. Une expression
  // mathématique est vraie ou fausse une fois pour toutes ; une variable, elle,
  // vaut des choses différentes selon le moment où on la regarde. Tout ce qui
  // suit découle de ça.

  'affectation-lue-comme-egalite': {
    nom: 'Affectation lue comme une égalité',
    chapitre: 17,
    regle:
      '« x prend la valeur x + 1 » n\'est pas une équation, c\'est un **ordre**. '
      + 'On calcule d\'abord x + 1 avec l\'ANCIENNE valeur, puis on range le '
      + 'résultat dans x. L\'ancienne valeur est écrasée.',
    controle: 'Note la valeur de la variable après chaque ligne, dans une petite table. C\'est le seul moyen de ne pas confondre ce qu\'elle vaut et ce qu\'elle valait.',
    raisonnements: [
      { id: 'equation-impossible', texte: 'x = x + 1, c\'est impossible', reponse: 'Ce serait vrai s\'il s\'agissait d\'une équation. Ici la valeur va dans un seul sens : on prend l\'ancien x, on ajoute 1, on range le résultat à sa place.' },
      { id: 'les-deux-x-en-meme-temps', texte: "J'ai remplacé les deux x par la même valeur", reponse: 'Le x de droite est l\'ancien, celui de gauche est le nouveau. Ils ne coexistent jamais : l\'un remplace l\'autre.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que valait la variable juste AVANT cette ligne ?' },
    ],
  },

  'ordre-des-instructions-ignore': {
    nom: 'Ordre des instructions ignoré',
    chapitre: 17,
    regle:
      'Les instructions s\'exécutent **l\'une après l\'autre**, de haut en bas. '
      + 'Deux programmes faits des mêmes lignes rangées autrement ne donnent '
      + 'donc pas forcément le même résultat : ça ne se devine pas, il faut '
      + 'exécuter les deux.',
    controle: 'Exécute le programme ligne à ligne avec le doigt, en notant les valeurs au fur et à mesure. Ne saute aucune ligne, même celles qui semblent sans effet.',
    raisonnements: [
      { id: 'les-memes-lignes', texte: "Ce programme a les mêmes lignes que l'autre", reponse: 'Les mêmes lignes dans un autre ordre ne font pas forcément la même chose. Déplacer une affectation change la valeur que voient toutes celles qui la suivent : parfois le résultat final ne bouge pas, souvent si — seule l\'exécution le dit.' },
      { id: 'jai-lu-la-fin', texte: "J'ai regardé la dernière ligne", reponse: 'La dernière ligne dit ce qu\'on affiche, pas ce que ça vaut. Ce que ça vaut dépend de tout ce qui précède.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle est la première ligne exécutée, et que fait-elle ?' },
    ],
  },

  'boucle-comptee-a-un-pres': {
    nom: 'Nombre de tours de boucle compté à un près',
    chapitre: 17,
    regle:
      '« Répéter 4 fois » exécute le bloc **exactement 4 fois**. Si une variable '
      + 'part de 0 et augmente de 1 à chaque tour, elle vaut 4 à la fin — ni 5, '
      + 'ni 3.',
    controle: 'Numérote les tours : 1, 2, 3, 4. Écris la valeur de la variable à la fin de chacun. Le dernier nombre écrit est la réponse.',
    raisonnements: [
      { id: 'depart-compte', texte: "J'ai compté la valeur de départ comme un tour", reponse: 'Le départ n\'est pas un tour : c\'est ce qu\'il y a AVANT le premier. Les tours commencent à la première exécution du bloc.' },
      { id: 'un-de-moins', texte: "Je me suis arrêté un tour trop tôt", reponse: 'Compte-les sur tes doigts jusqu\'au nombre annoncé : le bloc s\'exécute autant de fois que ce nombre, pas une de moins.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de fois le bloc est-il exécuté, et que vaut la variable à la fin du dernier tour ?' },
    ],
  },

  'variable-non-initialisee': {
    nom: 'Variable employée avant d\'avoir reçu une valeur',
    chapitre: 17,
    regle:
      'Une variable ne vaut rien tant qu\'on ne lui a pas donné de valeur. Un '
      + 'programme qui la lit avant de l\'avoir remplie ne calcule pas ce qu\'on '
      + 'croit — et souvent, il ne calcule rien du tout.',
    controle: 'Remonte le programme depuis la ligne qui emploie la variable : trouves-tu, au-dessus, une ligne qui lui donne une valeur ? Sinon, c\'est là qu\'est le bogue.',
    raisonnements: [
      { id: 'zero-par-defaut', texte: 'Elle vaut zéro au départ', reponse: 'Ne compte pas dessus. Un programme qui a besoin d\'un point de départ doit l\'écrire ; sans cette ligne, on ne peut pas savoir ce qu\'il fait.' },
      { id: 'elle-est-nommee', texte: 'La variable existe pourtant, elle est nommée', reponse: 'Exister et valoir quelque chose sont deux choses différentes. Il lui faut une ligne qui la remplisse avant qu\'on la lise.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle ligne donne sa première valeur à cette variable ?' },
    ],
  },

  'si-et-sinon-tous-deux-executes': {
    nom: 'Les deux branches du « si… sinon » exécutées',
    chapitre: 17,
    regle:
      'Dans un « si … sinon … », **une seule** des deux branches s\'exécute : '
      + 'celle du « si » quand la condition est vraie, celle du « sinon » quand '
      + 'elle est fausse. Jamais les deux, jamais aucune.',
    controle: 'Évalue la condition d\'abord, avec les valeurs qu\'ont les variables à ce moment-là. Sa réponse désigne une branche, et l\'autre est sautée entièrement.',
    raisonnements: [
      { id: 'jai-fait-les-deux', texte: "J'ai exécuté les deux blocs", reponse: 'Un seul des deux l\'est. L\'autre est sauté comme s\'il n\'était pas écrit.' },
      { id: 'condition-non-evaluee', texte: "Je n'ai pas regardé la condition", reponse: 'C\'est pourtant elle qui décide. Calcule-la avec les valeurs du moment, puis choisis la branche.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'À cet instant du programme, la condition est-elle vraie ou fausse ?' },
    ],
  },
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
