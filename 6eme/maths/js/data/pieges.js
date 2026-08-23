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
};

/** Le piège d'un identifiant, ou null. Utilisé par le contrôle de contenu. */
export const piege = (id) => PIEGES[id] ?? null;
