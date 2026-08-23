// Le catalogue des confusions.
//
// Une réponse fausse n'est pas un accident : c'est presque toujours l'appli
// CORRECTE d'une règle fausse. Chaque piège nomme cette règle fausse, donne la
// bonne, et laisse un geste de contrôle que l'élève peut refaire seul.
//
// `raisonnements` sert au dialogue d'erreur : on demande à l'élève POURQUOI il
// a répondu ça, et on répond à sa confusion précise plutôt qu'à l'erreur en
// général. « Au hasard » est toujours proposé en dernier — c'est le signal le
// plus utile du bilan parents, et un enfant le coche alors qu'il ne l'écrirait
// jamais.
//
// ── D'où viennent ces pièges ──────────────────────────────────────────────
//
// Pas de l'imagination : de la didactique des mathématiques. L'obstacle
// central des décimaux est documenté depuis Brousseau — l'élève transporte sur
// les décimaux des règles vraies pour les entiers, et lit « 2,54 » comme deux
// entiers séparés par une virgule. Tout le chapitre 1 est construit là-dessus.

export const PIEGES = {
  // ── Chapitre 1 : les nombres décimaux ────────────────────────────────────

  'decimal-lu-comme-deux-entiers': {
    nom: 'Le décimal lu comme deux entiers',
    chapitre: 1,
    regle:
      'Un nombre décimal n\'est **pas** deux entiers collés par une virgule. '
      + 'La partie après la virgule se lit par rang : dixièmes, centièmes, millièmes. '
      + 'Dans **2,7** il y a 7 **dixièmes** ; dans **2,54** il y a 5 dixièmes et 4 centièmes. '
      + 'Or 7 dixièmes, c\'est plus que 5 dixièmes : **2,7 > 2,54**.',
    controle:
      'Donne le même nombre de chiffres après la virgule aux deux nombres, en '
      + 'complétant par des zéros : 2,70 contre 2,54. Là, tu peux comparer.',
    raisonnements: [
      {
        id: 'plus-long-plus-grand',
        texte: 'Le nombre qui a le plus de chiffres est le plus grand',
        reponse:
          'C\'est vrai pour les entiers, jamais pour les décimales. 2,54 a plus de '
          + 'chiffres que 2,7 et vaut pourtant moins. Complète par des zéros : '
          + '2,70 contre 2,54 — le premier gagne.',
      },
      {
        id: 'deux-entiers',
        texte: "J'ai comparé ce qu'il y a après la virgule comme un nombre entier",
        reponse:
          'C\'est le piège numéro un des décimaux. « 54 » après la virgule ne vaut '
          + 'pas cinquante-quatre : il vaut 5 dixièmes et 4 centièmes, soit un peu '
          + 'plus d\'un demi. Lis toujours par rang.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : complète les deux nombres avec des zéros pour qu\'ils aient autant de chiffres après la virgule.' },
    ],
  },

  'zero-inutile-ou-non': {
    nom: 'Le zéro qui compte et celui qui ne compte pas',
    chapitre: 1,
    regle:
      'Un zéro **à la fin** de la partie décimale ne change rien : 2,50 = 2,5. '
      + 'Mais un zéro **entre la virgule et un chiffre** change tout : '
      + '2,05 n\'est pas 2,5 — il vaut 5 **centièmes**, pas 5 dixièmes.',
    controle:
      'Nomme le rang du dernier chiffre à voix haute. Dans 2,05 le 5 est aux '
      + 'centièmes ; dans 2,5 il est aux dixièmes.',
    raisonnements: [
      {
        id: 'zeros-tous-inutiles',
        texte: 'Je pensais que les zéros ne comptaient jamais',
        reponse:
          'Seulement ceux de la FIN. 2,50 vaut bien 2,5. Mais dans 2,05, le zéro '
          + 'pousse le 5 d\'un rang : il passe des dixièmes aux centièmes.',
      },
      {
        id: 'zero-ajoute-change',
        texte: "Je pensais qu'ajouter un zéro à la fin changeait le nombre",
        reponse:
          'Non : 2,5 = 2,50 = 2,500. C\'est même l\'astuce pour comparer deux '
          + 'décimaux — on leur donne le même nombre de chiffres après la virgule.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : dans ce nombre, à quel rang est le dernier chiffre ?' },
    ],
  },

  'virgule-decalee': {
    nom: 'La virgule mal décalée',
    chapitre: 1,
    regle:
      'Multiplier par 10 décale la virgule d\'un rang vers la **droite** ; par 100, '
      + 'de deux rangs ; par 1000, de trois. Diviser la décale vers la **gauche**, '
      + 'du même nombre de rangs.',
    controle:
      'Demande-toi si le résultat doit être plus grand ou plus petit que le nombre '
      + 'de départ. Multiplier par 10 rend plus grand : la virgule va donc à droite.',
    raisonnements: [
      {
        id: 'sens-inverse',
        texte: "J'ai décalé la virgule du mauvais côté",
        reponse:
          'Le sens se retrouve sans l\'apprendre : × 10 rend plus GRAND, donc la '
          + 'virgule va vers la droite. ÷ 10 rend plus petit, elle va vers la gauche.',
      },
      {
        id: 'ajoute-un-zero',
        texte: "J'ai ajouté un zéro à la fin, comme pour un entier",
        reponse:
          'Ça marche pour les entiers : 25 × 10 = 250. Mais 2,5 × 10 ne fait pas '
          + '2,50 — qui vaut toujours 2,5. Il faut déplacer la virgule : 25.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : le résultat doit-il être plus grand ou plus petit que le nombre de départ ?' },
    ],
  },

  'rangs-mal-alignes': {
    nom: 'Les rangs mal alignés',
    chapitre: 1,
    regle:
      'Pour additionner ou soustraire des décimaux, on aligne les **virgules**, '
      + 'donc les rangs entre eux : les dixièmes sous les dixièmes, les centièmes '
      + 'sous les centièmes. On complète les trous par des zéros.',
    controle:
      'Avant de calculer, donne le même nombre de chiffres après la virgule aux '
      + 'deux nombres. 3,4 + 0,25 devient 3,40 + 0,25.',
    raisonnements: [
      {
        id: 'aligne-a-droite',
        texte: "J'ai aligné les nombres par la droite, comme des entiers",
        reponse:
          "C'est ce qui donne 3,4 + 0,25 = 3,29 : on a additionné 4 et 25 comme "
          + 'deux entiers. La bonne réponse est 3,65. On aligne les VIRGULES, pas '
          + 'les derniers chiffres.',
      },
      {
        id: 'oubli-retenue',
        texte: "J'ai oublié une retenue",
        reponse:
          'Ça arrive à tout le monde. Le contrôle : arrondis les deux nombres et '
          + 'vérifie que ton résultat est dans le bon ordre de grandeur.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : complète les deux nombres avec des zéros, puis aligne les virgules.' },
    ],
  },

  'multiplier-rend-plus-grand': {
    nom: 'Multiplier rendrait toujours plus grand',
    chapitre: 1,
    regle:
      'Multiplier par un nombre **plus petit que 1** rend le résultat **plus petit** : '
      + '8 × 0,5 = 4. Diviser par un nombre plus petit que 1 rend plus grand : '
      + '8 ÷ 0,5 = 16.',
    controle:
      'Regarde le second nombre : s\'il est plus petit que 1, le produit sera plus '
      + 'petit que le premier. Multiplier par 0,5, c\'est prendre la moitié.',
    raisonnements: [
      {
        id: 'toujours-plus-grand',
        texte: 'Pour moi, une multiplication donne toujours un résultat plus grand',
        reponse:
          'Vrai avec les entiers, faux avec les décimaux. × 0,5 c\'est prendre la '
          + 'moitié, × 0,1 c\'est prendre le dixième. Le résultat rétrécit.',
      },
      {
        id: 'division-plus-petit',
        texte: 'Pour moi, une division donne toujours un résultat plus petit',
        reponse:
          'Même piège à l\'envers. Dans 8 ÷ 0,5, on demande « combien de demis dans '
          + '8 ? » — il y en a 16. Le résultat grandit.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : le second nombre est-il plus grand ou plus petit que 1 ?' },
    ],
  },

  'pas-de-successeur': {
    nom: 'Le nombre « juste après »',
    chapitre: 1,
    regle:
      'Entre deux décimaux, il y a **toujours** d\'autres décimaux. Entre 2,4 et 2,5 '
      + 'il y a 2,41 ; entre 2,4 et 2,41 il y a 2,405. Un décimal n\'a pas de '
      + '« suivant », contrairement à un entier.',
    controle:
      'Pour trouver un nombre entre deux décimaux, ajoute un rang : passe aux '
      + 'centièmes, ou aux millièmes.',
    raisonnements: [
      {
        id: 'successeur',
        texte: 'Je pensais qu\'après 2,4 venait 2,5, comme après 4 vient 5',
        reponse:
          'Les entiers se suivent, pas les décimaux. Entre 2,4 et 2,5, il y a 2,41 ; '
          + '2,42 ; 2,437… une infinité. C\'est la grande différence.',
      },
      {
        id: 'aucun-entre',
        texte: 'Je pensais qu\'il n\'y avait rien entre les deux',
        reponse:
          'Il y en a toujours. Le geste : ajoute un chiffre après la virgule. '
          + 'Entre 2,4 et 2,5, écris 2,45 — il est bien entre les deux.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : que se passe-t-il si tu ajoutes un chiffre après la virgule ?' },
    ],
  },

  // ── Chapitre 2 : les fractions ───────────────────────────────────────────
  //
  // Même famille d'obstacle qu'au chapitre 1, et ce n'est pas un hasard : une
  // fraction aussi se lit comme DEUX entiers. « 1/3 > 1/2 parce que 3 > 2 » est
  // le pendant exact de « 2,54 > 2,7 parce que 54 > 7 ».

  'fraction-lue-comme-deux-entiers': {
    nom: 'La fraction lue comme deux entiers',
    chapitre: 2,
    regle:
      'Le dénominateur dit en **combien de parts** on a coupé. Plus il est grand, '
      + '**plus les parts sont petites**. Un tiers est donc plus grand qu\'un quart, '
      + 'et 1/2 est plus grand que 1/3 — même si 3 est plus grand que 2.',
    controle:
      'Imagine une pizza. En la coupant en 8, chaque part est plus petite qu\'en '
      + 'la coupant en 4. Plus le nombre du bas est grand, plus la part rétrécit.',
    raisonnements: [
      {
        id: 'plus-grand-denominateur',
        texte: 'Pour moi, le plus grand dénominateur donne la plus grande fraction',
        reponse:
          'C\'est l\'inverse. Le dénominateur compte les parts du partage : plus il '
          + 'y en a, plus chacune est petite. Un huitième de pizza est plus petit '
          + 'qu\'un quart.',
      },
      {
        id: 'compare-les-deux-nombres',
        texte: "J'ai comparé les nombres du haut et du bas comme deux entiers",
        reponse:
          'Une fraction n\'est pas deux nombres, c\'est UN nombre. 1/2 vaut 0,5 et '
          + '1/3 vaut environ 0,33 : c\'est bien 1/2 le plus grand.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : en combien de parts coupe-t-on dans chaque cas ? Laquelle est la plus grosse ?' },
    ],
  },

  'parts-inegales': {
    nom: 'Des parts qui ne sont pas égales',
    chapitre: 2,
    regle:
      'Une fraction n\'a de sens que si le tout est partagé en parts **égales**. '
      + 'Une figure coupée en 4 morceaux de tailles différentes ne montre pas des quarts.',
    controle:
      'Avant de compter les parts, vérifie qu\'elles ont toutes la même taille. '
      + 'Sinon, la fraction ne veut rien dire.',
    raisonnements: [
      {
        id: 'compte-les-morceaux',
        texte: "J'ai compté les morceaux sans regarder s'ils étaient de même taille",
        reponse:
          'C\'est le réflexe à corriger. « Un quart » veut dire « une part quand on '
          + 'a coupé en QUATRE PARTS ÉGALES ». Des morceaux inégaux ne donnent pas '
          + 'de fraction.',
      },
      {
        id: 'egalite-approchee',
        texte: 'Les parts me semblaient à peu près égales',
        reponse:
          'En mathématiques, « à peu près » ne suffit pas. Sur une figure, vérifie '
          + 'que le partage est régulier — sinon, on ne peut pas nommer la part.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : les parts de cette figure ont-elles toutes la même taille ?' },
    ],
  },

  'fraction-toujours-inferieure-a-un': {
    nom: 'La fraction croirait ne pas pouvoir dépasser 1',
    chapitre: 2,
    regle:
      'Une fraction peut dépasser 1. Si le numérateur est **plus grand** que le '
      + 'dénominateur, la fraction vaut plus que l\'unité : 7/4, c\'est sept quarts, '
      + 'donc une unité entière et trois quarts.',
    controle:
      'Compare le haut et le bas. Si le haut est plus grand, la fraction dépasse 1. '
      + 'S\'ils sont égaux, elle vaut exactement 1.',
    raisonnements: [
      {
        id: 'impossible-de-depasser',
        texte: 'Je pensais qu\'on ne pouvait pas prendre plus de parts qu\'il n\'y en a',
        reponse:
          'On le peut, avec plusieurs unités. Si une bande de papier est coupée en '
          + 'quarts, prendre 7 quarts demande deux bandes — mais 7/4 existe très bien.',
      },
      {
        id: 'inversion-pour-rester-sous-un',
        texte: "J'ai inversé le haut et le bas pour que ça reste plus petit que 1",
        reponse:
          '7/4 et 4/7 sont deux nombres différents : le premier vaut 1,75, le second '
          + 'environ 0,57. On n\'a pas le droit de les échanger.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : le nombre du haut est-il plus grand ou plus petit que celui du bas ?' },
    ],
  },

  'quotient-inverse': {
    nom: 'Le quotient pris à l\'envers',
    chapitre: 2,
    regle:
      'La fraction a/b est le quotient de **a par b** : on partage a en b parts. '
      + 'Donc 3/4 = 3 ÷ 4 = 0,75, et non 4 ÷ 3.',
    controle:
      'Le nombre du HAUT est celui qu\'on partage. 3/4, c\'est « trois partagés en '
      + 'quatre » — le résultat est donc plus petit que 3.',
    raisonnements: [
      {
        id: 'divise-le-plus-petit',
        texte: "J'ai divisé le plus grand par le plus petit",
        reponse:
          'C\'est tentant parce que ça tombe plus juste, mais c\'est faux. Dans 3/4, '
          + 'c\'est bien 3 qu\'on partage en 4. Le résultat, 0,75, est plus petit que 3.',
      },
      {
        id: 'ordre-oublie',
        texte: "Je ne savais plus lequel se divisait par lequel",
        reponse:
          'Le repère : la barre de fraction se lit « divisé par », de haut en bas. '
          + '3/4 se lit « 3 divisé par 4 ».',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : dans cette fraction, quel nombre est partagé ?' },
    ],
  },

  'pourcentage-mal-applique': {
    nom: 'Le pourcentage appliqué de travers',
    chapitre: 2,
    regle:
      'Un pourcentage est une fraction de dénominateur 100 : 25 % = 25/100 = 1/4. '
      + 'Prendre 25 % d\'un nombre, c\'est le multiplier par 25 puis diviser par 100 — '
      + 'ou, plus simple ici, en prendre le quart.',
    controle:
      'Le résultat doit être **plus petit** que le nombre de départ, tant que le '
      + 'pourcentage est inférieur à 100 %. 25 % de 80 ne peut pas dépasser 80.',
    raisonnements: [
      {
        id: 'multiplie-par-le-pourcentage',
        texte: "J'ai multiplié par le nombre du pourcentage",
        reponse:
          '25 % de 80 n\'est pas 25 × 80 = 2000 : c\'est bien plus grand que 80, '
          + 'donc impossible. Il faut aussi diviser par 100 : 2000 ÷ 100 = 20.',
      },
      {
        id: 'divise-par-le-pourcentage',
        texte: "J'ai divisé par le nombre du pourcentage",
        reponse:
          '80 ÷ 25 donne 3,2, ce qui ne correspond à rien ici. Le bon geste : '
          + '25 % = un quart, donc 80 ÷ 4 = 20.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : 25 %, c\'est quelle fraction toute simple ?' },
    ],
  },

  // ── Chapitre 3 : diviser, arrondir, estimer ──────────────────────────────

  'reste-mal-compris': {
    nom: 'Le reste mal compris',
    chapitre: 3,
    regle:
      'Dans une division euclidienne, le reste est ce qui **ne peut plus être '
      + 'partagé**. Il est donc toujours **plus petit que le diviseur** : s\'il est '
      + 'égal ou supérieur, c\'est qu\'on pouvait encore donner une part.',
    controle:
      'Compare le reste au diviseur. S\'il est plus grand, augmente le quotient de 1 '
      + 'et recommence. Puis vérifie : quotient × diviseur + reste doit redonner le '
      + 'nombre de départ.',
    raisonnements: [
      {
        id: 'reste-trop-grand',
        texte: "Mon reste est plus grand que le diviseur",
        reponse:
          'Alors la division n\'est pas finie. Si tu partages 47 par 5 et qu\'il te '
          + 'reste 7, tu peux encore faire une part de 5 : le quotient monte à 9 et '
          + 'le reste tombe à 2.',
      },
      {
        id: 'quotient-reste-inverses',
        texte: "J'ai donné le reste à la place du quotient",
        reponse:
          'Le quotient est le nombre de PARTS, le reste est ce qui n\'a pas pu être '
          + 'distribué. Dans 47 = 9 × 5 + 2, le quotient est 9 et le reste 2.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : combien de fois le diviseur tient-il dans le nombre de départ ?' },
    ],
  },

  'arrondi-tronque': {
    nom: 'L\'arrondi confondu avec la coupe',
    chapitre: 3,
    regle:
      'Arrondir n\'est pas couper. On regarde le chiffre **juste après** le rang '
      + 'demandé : s\'il vaut 5 ou plus, on augmente le chiffre du rang de 1 ; sinon '
      + 'on le laisse. 3,47 arrondi au dixième donne **3,5**, pas 3,4.',
    controle:
      'Demande-toi de quel nombre rond ton nombre est le plus PROCHE. 3,47 est plus '
      + 'près de 3,5 que de 3,4.',
    raisonnements: [
      {
        id: 'coupe-simplement',
        texte: "J'ai simplement enlevé les chiffres en trop",
        reponse:
          'Ça s\'appelle tronquer, et ce n\'est pas arrondir. En coupant, 3,47 donne '
          + '3,4 — alors qu\'il est plus proche de 3,5. Il faut regarder le chiffre '
          + 'suivant avant de décider.',
      },
      {
        id: 'arrondi-systematique',
        texte: "J'ai augmenté le chiffre à chaque fois",
        reponse:
          'Seulement si le chiffre suivant vaut 5 ou plus. Pour 3,42, le 2 est plus '
          + 'petit que 5 : on garde 3,4.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : quel est le chiffre juste après le rang demandé ?' },
    ],
  },

  'rang-d-arrondi-confondu': {
    nom: 'Le rang d\'arrondi confondu',
    chapitre: 3,
    regle:
      'Arrondir **au dixième** laisse un chiffre après la virgule ; **au centième**, '
      + 'deux ; **à l\'unité**, aucun. Le rang demandé dit combien de chiffres il '
      + 'restera.',
    controle:
      'Compte les chiffres après la virgule de ta réponse : un pour le dixième, '
      + 'deux pour le centième, zéro pour l\'unité.',
    raisonnements: [
      {
        id: 'un-rang-de-trop',
        texte: "Je me suis trompé d'un rang",
        reponse:
          'Le repère : « dixième » veut dire UN chiffre après la virgule, comme il y '
          + 'a un « d » dans dixième… ou plus simplement, dixième = premier rang.',
      },
      {
        id: 'unite-oubliee',
        texte: "J'ai gardé des chiffres après la virgule alors qu'on demandait l'unité",
        reponse:
          'Arrondir à l\'unité donne un nombre ENTIER : 3,47 arrondi à l\'unité vaut 3.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : combien de chiffres après la virgule le rang demandé laisse-t-il ?' },
    ],
  },

  'operation-mal-choisie': {
    nom: 'L\'opération mal choisie',
    chapitre: 3,
    regle:
      'Deux questions différentes mènent à deux divisions différentes. « Combien '
      + 'chacun reçoit-il ? » cherche la **valeur d\'une part**. « Combien de parts '
      + 'peut-on faire ? » cherche le **nombre de parts**. Dans les deux cas on '
      + 'divise, mais on ne cherche pas la même chose.',
    controle:
      'Relis la question et demande-toi : est-ce que je cherche la taille d\'une part, '
      + 'ou le nombre de parts ? Puis vérifie que ton résultat a la bonne unité.',
    raisonnements: [
      {
        id: 'multiplie-au-lieu-de-diviser',
        texte: "J'ai multiplié au lieu de diviser",
        reponse:
          'Le contrôle : un partage donne toujours un résultat plus PETIT que le tout. '
          + 'Si ton résultat dépasse le nombre de départ, l\'opération est fausse.',
      },
      {
        id: 'sens-inverse',
        texte: "J'ai divisé, mais dans le mauvais sens",
        reponse:
          'Le nombre à partager est le TOUT. Pour partager 47 bonbons entre 5 enfants, '
          + 'on fait 47 ÷ 5, jamais 5 ÷ 47.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : qu\'est-ce qu\'on partage, et en combien de parts ?' },
    ],
  },

  // ── Chapitre 4 : la proportionnalité ─────────────────────────────────────
  //
  // Le programme 2025 est explicite : « la technique du produit en croix n'est
  // pas enseignée ». Les pièges portent donc sur les TROIS procédures
  // autorisées — linéarité multiplicative, linéarité additive, retour à
  // l'unité — et sur la question qui les précède toutes : la situation
  // relève-t-elle seulement du modèle ?

  'proportionnalite-supposee': {
    nom: 'La proportionnalité supposée',
    chapitre: 4,
    regle:
      'Toutes les situations ne sont pas proportionnelles. Doubler la quantité ne '
      + 'double le résultat que si les deux grandeurs sont **liées par une '
      + 'multiplication constante**. L\'âge, la taille, un tarif avec abonnement ou '
      + 'un temps de travail partagé ne fonctionnent pas ainsi.',
    controle:
      'Pose-toi la question : si je double la première grandeur, la seconde '
      + 'double-t-elle vraiment ? Et si la première vaut zéro, la seconde vaut-elle '
      + 'zéro ? Si l\'une des deux réponses est non, ce n\'est pas proportionnel.',
    raisonnements: [
      {
        id: 'tout-est-proportionnel',
        texte: 'Je pensais qu\'on pouvait toujours faire « deux fois plus »',
        reponse:
          'Si un enfant de 4 ans mesure 1 m, il ne mesurera pas 2 m à 8 ans. L\'âge '
          + 'et la taille ne sont pas proportionnels : le modèle ne s\'applique pas '
          + 'partout.',
      },
      {
        id: 'frais-fixe-oublie',
        texte: "Je n'ai pas vu qu'il y avait une part fixe",
        reponse:
          'Un tarif du type « 5 € d\'abonnement plus 2 € par séance » n\'est pas '
          + 'proportionnel : pour zéro séance, on paie déjà 5 €. Le test du zéro le '
          + 'détecte tout de suite.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : si la première grandeur double, la seconde double-t-elle ?' },
    ],
  },

  'retour-a-l-unite-inverse': {
    nom: 'Le retour à l\'unité pris à l\'envers',
    chapitre: 4,
    regle:
      'Pour trouver la valeur d\'**une** unité, on **divise** par le nombre '
      + 'd\'unités. Si 4 kg coûtent 12 €, alors 1 kg coûte 12 ÷ 4 = 3 €. On ne '
      + 'multiplie qu\'ensuite, pour revenir à la quantité voulue.',
    controle:
      'La valeur d\'une seule unité doit être **plus petite** que celle de '
      + 'plusieurs. Si ton prix au kilo dépasse le prix du sac entier, c\'est faux.',
    raisonnements: [
      {
        id: 'multiplie-au-lieu-de-diviser',
        texte: "J'ai multiplié pour trouver le prix d'une unité",
        reponse:
          'Le contrôle : une part est plus petite que le tout. Si 4 kg coûtent 12 €, '
          + '1 kg ne peut pas coûter 48 € — il en coûte 3.',
      },
      {
        id: 'division-inversee',
        texte: "J'ai divisé, mais dans l'autre sens",
        reponse:
          'On divise le PRIX par la QUANTITÉ, pas l\'inverse : 12 € ÷ 4 kg = 3 € par '
          + 'kilo. Garder les unités dans le calcul évite de se tromper de sens.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : que coûte une seule unité ? Plus ou moins que le lot entier ?' },
    ],
  },

  'linearite-mal-appliquee': {
    nom: 'La linéarité mal appliquée',
    chapitre: 4,
    regle:
      'Dans un tableau de proportionnalité, on peut **additionner deux colonnes** ou '
      + '**multiplier une colonne**, mais il faut faire la même chose **aux deux '
      + 'lignes**. Si on additionne les quantités, on additionne aussi les prix.',
    controle:
      'Vérifie que tu as appliqué la même opération en haut et en bas. Si tu as '
      + 'doublé la quantité, le prix doit avoir doublé aussi.',
    raisonnements: [
      {
        id: 'une-seule-ligne',
        texte: "J'ai modifié une ligne sans modifier l'autre",
        reponse:
          'Les deux grandeurs sont liées : ce qu\'on fait à l\'une, on le fait à '
          + 'l\'autre. Doubler la quantité sans doubler le prix casse la '
          + 'proportionnalité.',
      },
      {
        id: 'ajoute-au-lieu-de-multiplier',
        texte: "J'ai ajouté alors qu'il fallait multiplier",
        reponse:
          'Pour passer de 2 kg à 6 kg, on multiplie par 3 — on n\'ajoute pas 4 au '
          + 'prix. Regarde le lien entre les deux quantités avant de choisir.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : comment passe-t-on d\'une quantité à l\'autre — en multipliant, ou en additionnant deux colonnes ?' },
    ],
  },

  'echelle-sens-inverse': {
    nom: 'L\'échelle prise à l\'envers',
    chapitre: 4,
    regle:
      'Une échelle relie une distance sur le plan à une distance réelle. Sur une '
      + 'carte, la distance réelle est **plus grande** que celle mesurée : on '
      + 'multiplie. Pour l\'inverse, on divise.',
    controle:
      'Demande-toi si tu cherches quelque chose de plus grand ou de plus petit que '
      + 'ce que tu mesures. Sur une carte, le terrain est toujours plus grand.',
    raisonnements: [
      {
        id: 'divise-au-lieu-de-multiplier',
        texte: "J'ai divisé alors que je cherchais la distance réelle",
        reponse:
          'Une carte réduit : le terrain est plus grand que le dessin. Si 1 cm '
          + 'représente 2 km, alors 5 cm représentent 10 km — pas 2,5.',
      },
      {
        id: 'unites-melangees',
        texte: "Je me suis emmêlé dans les unités",
        reponse:
          'C\'est le vrai piège des échelles. Écris les unités à chaque étape : '
          + '5 cm × 2 km par cm = 10 km. Le « cm » disparaît, il reste des km.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : sur une carte, ce qu\'on mesure est-il plus grand ou plus petit que la réalité ?' },
    ],
  },

  // ── Chapitre 5 : grandeurs et mesures ────────────────────────────────────

  'conversion-aire-lineaire': {
    nom: 'L\'aire convertie comme une longueur',
    chapitre: 5,
    regle:
      'Une aire se convertit par **100**, pas par 10. Un mètre vaut 10 décimètres, '
      + 'mais un mètre carré vaut **10 dm × 10 dm = 100 dm²**. Chaque changement '
      + 'd\'unité d\'aire multiplie ou divise par 100.',
    controle:
      'Dessine le carré : 1 m de côté, c\'est 10 dm de côté, donc 10 rangées de '
      + '10 carrés — cent carrés. Le facteur est le carré de celui des longueurs.',
    raisonnements: [
      {
        id: 'facteur-dix',
        texte: "J'ai converti par 10, comme pour une longueur",
        reponse:
          'C\'est le piège numéro un des aires. 1 m = 10 dm, mais 1 m² = 100 dm² : '
          + 'l\'unité change dans les DEUX dimensions, donc le facteur est 10 × 10.',
      },
      {
        id: 'sens-inverse',
        texte: "J'ai multiplié au lieu de diviser, ou l'inverse",
        reponse:
          'Le repère : une unité plus PETITE demande un nombre plus GRAND. 1 m² '
          + 'fait 100 dm², parce qu\'il faut beaucoup de petits carrés pour remplir '
          + 'un grand.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : combien de carrés de 1 dm de côté tiennent dans un carré de 1 m de côté ?' },
    ],
  },

  'perimetre-aire-confondus': {
    nom: 'Le périmètre confondu avec l\'aire',
    chapitre: 5,
    regle:
      'Le **périmètre** est la longueur du tour : il se mesure en cm, m, km. '
      + 'L\'**aire** est la surface occupée : elle se mesure en cm², m², km². '
      + 'Ce ne sont pas les mêmes grandeurs, et elles n\'ont pas les mêmes unités.',
    controle:
      'Regarde l\'unité demandée. Si elle porte un petit 2, c\'est une aire. Sinon, '
      + 'c\'est une longueur — donc un périmètre.',
    raisonnements: [
      {
        id: 'formule-melangee',
        texte: "J'ai utilisé la formule de l'aire pour le périmètre",
        reponse:
          'Pour un rectangle, le périmètre additionne les quatre côtés, l\'aire '
          + 'multiplie longueur par largeur. 5 m sur 3 m : périmètre 16 m, aire 15 m².',
      },
      {
        id: 'unite-oubliee',
        texte: "Je n'ai pas regardé l'unité demandée",
        reponse:
          'C\'est elle qui dit tout : « en m » demande un périmètre, « en m² » '
          + 'demande une aire. Lis l\'unité avant de choisir la formule.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : cherche-t-on la longueur du tour, ou la surface ?' },
    ],
  },

  'cercle-rayon-diametre': {
    nom: 'Le rayon pris pour le diamètre',
    chapitre: 5,
    regle:
      'Le **diamètre** vaut deux fois le **rayon**. Le périmètre d\'un disque se '
      + 'calcule avec le diamètre : **P = π × d**, ou avec le rayon : **P = 2 × π × r**. '
      + 'Les deux formules disent la même chose.',
    controle:
      'Repère ce que l\'énoncé te donne. S\'il donne le rayon et que tu utilises '
      + 'π × d, il faut d\'abord doubler.',
    raisonnements: [
      {
        id: 'rayon-au-lieu-du-diametre',
        texte: "J'ai utilisé le rayon là où il fallait le diamètre",
        reponse:
          'Le résultat est alors deux fois trop petit. Si le rayon vaut 5 cm, le '
          + 'diamètre vaut 10 cm, et le périmètre environ 31,4 cm — pas 15,7.',
      },
      {
        id: 'diametre-au-lieu-du-rayon',
        texte: "J'ai utilisé le diamètre là où il fallait le rayon",
        reponse:
          'Le résultat est alors deux fois trop grand. Avec la formule 2 × π × r, '
          + 'la lettre r désigne bien le RAYON, la moitié du diamètre.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : l\'énoncé donne-t-il le rayon ou le diamètre ?' },
    ],
  },

  'duree-decimale': {
    nom: 'L\'heure comptée en centièmes',
    chapitre: 5,
    regle:
      'Une heure vaut **60** minutes, pas 100. Donc **1,5 h = 1 h 30 min**, et non '
      + '1 h 50. La partie après la virgule est une fraction d\'heure : 0,5 h vaut '
      + 'la moitié de 60 minutes.',
    controle:
      'Convertis la partie décimale en minutes : multiplie-la par 60. 0,25 h × 60 '
      + '= 15 min. Une durée en minutes ne dépasse jamais 59.',
    raisonnements: [
      {
        id: 'virgule-lue-en-minutes',
        texte: "J'ai lu les chiffres après la virgule comme des minutes",
        reponse:
          '1,5 h ne fait pas 1 h 5 min ni 1 h 50 min : 0,5 heure, c\'est une '
          + 'demi-heure, donc 30 minutes. Le temps ne compte pas par dix.',
      },
      {
        id: 'retenue-de-soixante',
        texte: "J'ai oublié qu'on passe à l'heure suivante à 60 minutes",
        reponse:
          'Quand un calcul dépasse 59 minutes, on retire 60 et on ajoute une heure. '
          + '45 min + 30 min = 75 min = 1 h 15 min.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Reprenons : combien de minutes y a-t-il dans une heure ?' },
    ],
  },
};

/** Le piège d'un identifiant, ou null. Utilisé par le contrôle de contenu. */
export const piege = (id) => PIEGES[id] ?? null;
