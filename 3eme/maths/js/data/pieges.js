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
  // ── Chapitre 1 : théorème de Thalès et agrandissement ────────────────────

  'thales-sans-parallelisme': {
    nom: 'Thalès appliqué sans droites parallèles',
    chapitre: 1,
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
    chapitre: 1,
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
    chapitre: 1,
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
    chapitre: 1,
    regle:
      'En 3e, Thalès s\'utilise dans **deux** configurations, et il faut savoir '
      + 'dire laquelle on a sous les yeux.\n'
      + '**Triangles emboîtés** : les deux points sont du même côté du sommet '
      + 'commun, le petit triangle est à l\'intérieur du grand.\n'
      + '**Papillon** : les deux points sont de part et d\'autre du point '
      + 'd\'intersection, et les deux triangles se font face.\n'
      + 'Dans les deux cas il faut un **point commun aux deux droites** et deux '
      + 'droites **parallèles**. Sans l\'un des deux, aucune configuration.',
    controle:
      'Nomme la configuration à voix haute avant d\'écrire quoi que ce soit : '
      + '« emboîtés » ou « papillon ». Si tu n\'arrives pas à choisir, c\'est '
      + 'qu\'il manque le point commun ou les parallèles.',
    raisonnements: [
      { id: 'trois-longueurs', texte: 'Il y avait trois longueurs, j\'ai appliqué le théorème', reponse: 'La quantité de données ne fait pas la configuration. Il faut le point commun ET les parallèles, quelle que soit la figure.' },
      { id: 'papillon-refuse', texte: "Les triangles étaient de part et d'autre du point, j'ai cru que ça ne marchait pas", reponse: 'C\'est le papillon, et il est au programme de 3e : le théorème s\'applique exactement pareil. Ce qui compte n\'est pas de quel côté sont les points, mais que les droites soient parallèles.' },
      { id: 'sommet-absent', texte: "Je n'ai pas cherché de point commun aux deux droites", reponse: 'C\'est lui qui tient toute la figure. Sans point d\'intersection, ni emboîtés ni papillon : le théorème ne s\'applique pas.' },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Deux questions dans l\'ordre : y a-t-il un point commun aux deux droites ? Les deux autres droites sont-elles parallèles ?' },
    ],
  },

  // ── Chapitre 1, suite : ce que le cours d'Evan ajoute ────────────────────
  //
  // Chaque piège ci-dessous ne reçoit que des réponses qui vont dans le même
  // sens : ses raisonnements doivent tous être possibles pour l'élève qui
  // vient de répondre. D'où des pièges étroits — « la réciproque citée pour
  // conclure pas parallèles » plutôt que « le mauvais théorème ».

  'homologues-par-position': {
    nom: 'Homologues choisis d\'après la place des lettres',
    chapitre: 1,
    regle:
      'Deux sommets sont **homologues** quand leurs **angles sont égaux**. Deux côtés sont '
      + 'homologues quand ils sont **opposés à des angles égaux**.\n'
      + 'L\'ordre des lettres dans le nom des triangles, ou la place sur le dessin, ne dit '
      + 'rien : ABC et DEF peuvent très bien associer A à E.',
    controle:
      'Pour un côté, cherche l\'angle qui lui fait face ; trouve l\'angle égal dans l\'autre '
      + 'triangle ; le côté homologue est celui qui fait face à cet angle.',
    raisonnements: [
      {
        id: 'ordre-des-noms',
        texte: "J'ai associé les lettres dans l'ordre des noms des triangles",
        reponse:
          'Les noms ne sont pas écrits dans l\'ordre des homologues. Seuls les angles égaux '
          + 'disent quel sommet va avec quel sommet.',
      },
      {
        id: 'place-sur-le-dessin',
        texte: "J'ai associé ce qui est à la même place sur le dessin",
        reponse:
          'Un des triangles peut être tourné ou retourné : « en bas » ou « à gauche » ne veut '
          + 'plus rien dire. Repère les angles égaux.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel angle est égal à celui-ci, dans l\'autre triangle ?' },
    ],
  },

  'coefficient-inverse': {
    nom: 'Coefficient appliqué dans le mauvais sens',
    chapitre: 1,
    regle:
      'Le coefficient fait passer du triangle de **départ** au triangle d\'**arrivée** : on '
      + 'le calcule en divisant une longueur d\'arrivée par son homologue de départ, et on '
      + 'l\'utilise en **multipliant** une longueur de départ.\n'
      + 'De ABC vers DEF : k = DE ÷ AB, puis EF = BC × k.',
    controle:
      'Si le triangle d\'arrivée est le plus grand, k est plus grand que 1 et les longueurs '
      + 'calculées doivent grandir. Sinon, c\'est l\'inverse.',
    raisonnements: [
      {
        id: 'depart-arrivee',
        texte: "J'ai confondu le triangle de départ et celui d'arrivée",
        reponse:
          'Relis la question : « de ABC vers DEF » veut dire que ABC est le départ. Le '
          + 'coefficient se calcule arrivée ÷ départ.',
      },
      {
        id: 'operation-inverse',
        texte: "J'ai fait l'opération dans l'autre sens",
        reponse:
          'Division contre multiplication : k = arrivée ÷ départ, et une longueur d\'arrivée = '
          + 'longueur de départ × k. Vérifie que ton résultat grandit quand k est plus grand que 1.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Lequel des deux triangles est le plus grand ?' },
    ],
  },

  'inverse-et-complement': {
    nom: '1 − k au lieu de 1/k',
    chapitre: 1,
    regle:
      'Le coefficient qui défait une réduction de coefficient k est son **inverse**, '
      + 'k\' = 1/k : k × k\' = 1. Avec k = 0,4, on revient en multipliant par 1 ÷ 0,4 = 2,5.\n'
      + 'Ce n\'est pas 1 − k : la somme des deux coefficients ne vaut rien de particulier.',
    controle: 'Multiplie tes deux coefficients : le produit doit faire exactement 1.',
    raisonnements: [
      {
        id: 'un-moins-k',
        texte: "J'ai calculé 1 − k au lieu de 1 ÷ k",
        reponse:
          'Défaire une multiplication, c\'est diviser : pour annuler « × 0,4 », on multiplie par '
          + '1 ÷ 0,4 = 2,5. Et 0,4 × 2,5 = 1.',
      },
      {
        id: 'somme-un',
        texte: "Je pensais que les deux coefficients faisaient 1 à eux deux",
        reponse:
          'C\'est leur PRODUIT qui vaut 1, pas leur somme : k × k\' = 1. Un agrandissement a un '
          + 'coefficient plus grand que 1.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Par quel nombre faut-il multiplier k pour obtenir 1 ?' },
    ],
  },

  'semblables-mal-justifies': {
    nom: 'Des triangles semblables pas reconnus',
    chapitre: 1,
    regle:
      'Deux triangles sont **semblables** si leurs angles sont deux à deux égaux — et '
      + 'seulement les angles : leurs côtés, eux, sont proportionnels, pas égaux.\n'
      + 'Il suffit de comparer deux paires d\'angles : la troisième suit, puisque les angles '
      + 'd\'un triangle font 180°.',
    controle:
      'Écris les trois angles de chaque triangle — le troisième vaut 180° moins les deux '
      + 'autres —, puis compare les deux listes.',
    raisonnements: [
      {
        id: 'cotes-egaux',
        texte: "J'ai cru qu'il fallait aussi des côtés égaux",
        reponse:
          'Des triangles semblables ont la même forme, pas forcément la même taille : leurs '
          + 'côtés sont proportionnels, pas égaux.',
      },
      {
        id: 'trois-angles',
        texte: "Je n'ai pas comparé les trois angles de chaque triangle",
        reponse:
          'Les trois angles d\'un triangle font 180° : deux angles connus donnent le troisième, '
          + 'et c\'est souvent lui qui fait apparaître la paire égale.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quels sont les trois angles de chaque triangle ?' },
    ],
  },

  'un-angle-ne-suffit-pas': {
    nom: 'Une seule paire d\'angles égaux',
    chapitre: 1,
    regle:
      'Pour que deux triangles soient semblables, il faut **deux paires** d\'angles égaux. '
      + 'Avec une seule, les deux autres angles peuvent être très différents : 50°, 60°, 70° '
      + 'et 50°, 30°, 100° partagent un angle, et n\'ont pas la même forme.',
    controle: 'Compare les trois angles de chaque triangle, pas seulement celui qu\'on te montre.',
    raisonnements: [
      {
        id: 'un-suffit',
        texte: "J'ai pensé qu'un seul angle égal suffisait",
        reponse:
          'Un angle commun ne fixe pas la forme : les deux autres angles peuvent se partager '
          + 'le reste de mille façons.',
      },
      {
        id: 'deux-paires-confondu',
        texte: "J'ai confondu avec « deux paires d'angles suffisent »",
        reponse:
          'Deux PAIRES : deux angles de l\'un égaux à deux angles de l\'autre. Une seule paire, '
          + 'c\'est un angle de chaque côté.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de paires d\'angles égaux as-tu trouvées ?' },
    ],
  },

  'theoreme-mal-choisi': {
    nom: 'Le théorème de Thalès cité à la place de sa réciproque',
    chapitre: 1,
    regle:
      'Trois énoncés, trois usages :\n'
      + '• le **théorème de Thalès** sert à **calculer des longueurs** — on sait déjà que les '
      + 'droites sont parallèles ;\n'
      + '• sa **réciproque** sert à démontrer que des droites **sont parallèles** ;\n'
      + '• sa **contraposée** sert à démontrer qu\'elles **ne sont pas parallèles**.',
    controle:
      'Relis la question : si on te demande SI des droites sont parallèles, ce n\'est jamais '
      + 'le théorème lui-même — il suppose le parallélisme.',
    raisonnements: [
      {
        id: 'theoreme-pour-tout',
        texte: "J'ai pensé que le théorème de Thalès servait aussi à savoir si des droites sont parallèles",
        reponse:
          'Le théorème part du parallélisme pour en déduire des longueurs. Pour conclure sur le '
          + 'parallélisme, on part des longueurs : réciproque si les rapports sont égaux, '
          + 'contraposée s\'ils diffèrent.',
      },
      {
        id: 'trois-enonces',
        texte: "Je ne savais plus à quoi sert chacun des trois énoncés",
        reponse:
          'Longueurs : le théorème. « Parallèles » : la réciproque. « Pas parallèles » : la '
          + 'contraposée.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que cherche-t-on : une longueur, ou savoir si les droites sont parallèles ?' },
    ],
  },

  'reciproque-pour-non-parallele': {
    nom: 'La réciproque citée pour conclure « pas parallèles »',
    chapitre: 1,
    regle:
      'La réciproque du théorème de Thalès ne conclut qu\'une chose : les droites **sont** '
      + 'parallèles. Quand les rapports sont différents, c\'est la **contraposée** du théorème '
      + 'de Thalès qui prouve qu\'elles ne le sont pas.',
    controle: 'Rapports égaux : réciproque, « parallèles ». Rapports différents : contraposée, « pas parallèles ».',
    raisonnements: [
      {
        id: 'dans-les-deux-cas',
        texte: "Je pensais que la réciproque servait dans les deux cas",
        reponse:
          'Elle ne sert qu\'à prouver un parallélisme. Ton cours le dit : elle ne sert pas à '
          + 'prouver que deux droites ne sont pas parallèles.',
      },
      {
        id: 'contraposee-inconnue',
        texte: "Je ne connaissais pas la contraposée",
        reponse:
          'C\'est la fin de ton cours : si les rapports diffèrent, alors, d\'après la contraposée '
          + 'du théorème de Thalès, les droites ne sont pas parallèles.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Les deux rapports sont-ils égaux ou différents ?' },
    ],
  },

  'rapports-mal-compares': {
    nom: 'Deux rapports égaux pris pour différents',
    chapitre: 1,
    regle:
      'On calcule chaque rapport **séparément**, en appariant les longueurs d\'une même droite, '
      + 'puis on compare les deux résultats **exacts** — fractions simplifiées ou décimaux '
      + 'exacts, jamais des valeurs arrondies.',
    controle: 'Simplifie les deux fractions : si elles deviennent la même, les rapports sont égaux.',
    raisonnements: [
      {
        id: 'calcul',
        texte: "J'ai fait une erreur en calculant un des rapports",
        reponse: 'Refais chaque division, ou simplifie chaque fraction avant de comparer : deux écritures différentes peuvent cacher le même nombre.',
      },
      {
        id: 'appariement',
        texte: "J'ai associé des longueurs qui ne vont pas ensemble",
        reponse:
          'Un rapport prend deux longueurs de la même droite, mesurées depuis le point commun : '
          + 'la petite en haut, la grande en bas.',
      },
      {
        id: 'enonces',
        texte: "Je ne savais plus lequel des trois énoncés dit « pas parallèles »",
        reponse: 'La contraposée conclut « pas parallèles », mais seulement si les rapports sont différents.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que valent exactement les deux rapports ?' },
    ],
  },

  'ordre-des-points-ignore': {
    nom: 'L\'ordre des points oublié',
    chapitre: 1,
    regle:
      'La réciproque exige que les points soient **alignés dans le même ordre** sur les deux '
      + 'droites : le sommet commun au bout des deux alignements (triangles emboîtés), ou au '
      + 'milieu des deux (papillon).\n'
      + 'Si un point est du même côté du sommet et l\'autre de l\'autre côté, les rapports '
      + 'peuvent être égaux sans que les droites soient parallèles.',
    controle:
      'Avant de comparer les rapports, lis les deux alignements : le sommet commun est-il à la '
      + 'même place dans les deux ?',
    raisonnements: [
      {
        id: 'rapports-seuls',
        texte: "J'ai seulement comparé les rapports",
        reponse:
          'Les rapports égaux ne suffisent pas : la réciproque demande aussi le même ordre. '
          + 'C\'est la deuxième condition de ton cours.',
      },
      {
        id: 'sommet-non-regarde',
        texte: "Je n'ai pas regardé où était le sommet commun",
        reponse:
          'Dans un alignement, le sommet est au bout ; dans l\'autre, il est au milieu : la '
          + 'figure n\'est ni emboîtée ni en papillon.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le sommet commun est-il à la même place dans les deux alignements ?' },
    ],
  },
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
