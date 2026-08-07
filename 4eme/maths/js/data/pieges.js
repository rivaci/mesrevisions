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
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
