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
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
