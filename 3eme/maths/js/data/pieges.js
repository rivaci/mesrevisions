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
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
