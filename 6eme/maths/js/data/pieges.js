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
};

/** Le piège d'un identifiant, ou null. Utilisé par le contrôle de contenu. */
export const piege = (id) => PIEGES[id] ?? null;
