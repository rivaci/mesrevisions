// Les pièges : les confusions qui produisent les erreurs, et comment y répondre.
//
// Un piège n'est pas une erreur constatée, c'est la CONCEPTION qui la produit.
// « 2 + 3 × 5 = 25 » n'est pas une étourderie : c'est la règle « on calcule de
// gauche à droite », parfaitement vraie pour 12 − 4 − 3, appliquée là où elle ne
// vaut plus. Savoir laquelle des deux confusions a joué, c'est la différence
// entre corriger et expliquer.
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
//
// ── Ce que ce chapitre a de particulier ───────────────────────────────────
//
// Les six pièges se répartissent en DEUX familles opposées, et c'est tout
// l'enjeu du chapitre :
//
//   · appliquer « de gauche à droite » là où la priorité l'interdit
//     (priorite-ignoree, puissance-mal-placee) ;
//   · appliquer une commutativité ou un regroupement là où l'opération ne le
//     permet pas (soustraction-de-gauche-a-droite, division-de-gauche-a-droite,
//     groupement-abusif).
//
// Un élève qui ne connaît que la première famille sur-applique les priorités ;
// un élève qui ne connaît que la seconde calcule tout dans l'ordre de lecture.
// Les deux erreurs se soignent ensemble ou pas du tout — d'où les items neutres
// qui alternent constamment entre les deux situations.

export const PIEGES = {
  // ── Chapitre 1 : les opérations et leurs enchaînements ───────────────────

  'priorite-ignoree': {
    nom: 'Les priorités ignorées, tout calculé de gauche à droite',
    chapitre: 1,
    regle:
      'La multiplication et la division se calculent **avant** l\'addition et '
      + 'la soustraction, où qu\'elles soient écrites.\n'
      + 'Dans **2 + 3 × 5**, on fait d\'abord 3 × 5 = 15, puis 2 + 15 = **17**. '
      + 'Lire de gauche à droite donnerait 5 × 5 = 25, et ce serait faux.\n'
      + 'L\'ordre de lecture n\'est le bon ordre qu\'**à niveau égal** : entre + '
      + 'et −, ou entre × et ÷.',
    controle:
      'Avant de calculer, souligne les multiplications et les divisions. Ce sont '
      + 'elles qui partent en premier, quelle que soit leur place. S\'il n\'y en '
      + 'a aucune, alors seulement tu lis de gauche à droite.',
    raisonnements: [
      {
        id: 'ordre-de-lecture',
        texte: "J'ai calculé dans l'ordre où c'était écrit",
        reponse:
          'C\'est la bonne règle au mauvais endroit : elle vaut entre opérations '
          + 'de même niveau. Dès qu\'un × ou un ÷ apparaît à côté d\'un + ou d\'un '
          + '−, il passe devant. Souligne-les d\'abord.',
      },
      {
        id: 'priorite-inversee',
        texte: "J'ai cru que l'addition passait avant",
        reponse:
          'C\'est l\'inverse. Multiplication et division sont au niveau du dessus. '
          + 'Retiens l\'exemple du cours : 2 + 3 × 5 vaut 17, pas 25.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Y a-t-il un × ou un ÷ dans le calcul ? Si oui, c\'est lui qui part en premier.' },
    ],
  },

  'soustraction-de-gauche-a-droite': {
    nom: 'La soustraction traitée comme si l\'ordre ne comptait pas',
    chapitre: 1,
    regle:
      'Dans une suite de soustractions, l\'ordre **compte** : on calcule de '
      + 'gauche à droite.\n'
      + '**20 − 5 − 3** vaut (20 − 5) − 3 = 15 − 3 = **12**, et non '
      + '20 − (5 − 3) = 18.\n'
      + 'C\'est ce qui distingue la soustraction de l\'addition : 20 + 5 + 3 se '
      + 'calcule dans n\'importe quel ordre, 20 − 5 − 3 non.',
    controle:
      'Mets une parenthèse mentale autour des deux premiers nombres : '
      + '(20 − 5) − 3. Si tu obtiens un résultat plus GRAND que le premier '
      + 'nombre en enlevant deux fois, c\'est que tu as regroupé du mauvais côté.',
    raisonnements: [
      {
        id: 'regroupe-a-droite',
        texte: "J'ai calculé les deux derniers nombres d'abord",
        reponse:
          'C\'est permis pour une addition, jamais pour une soustraction. '
          + '20 − 5 − 3 enlève 5 PUIS 3, donc enlève 8 en tout : 12. Regrouper à '
          + 'droite reviendrait à en rajouter.',
      },
      {
        id: 'ordre-sans-importance',
        texte: "Je pensais que l'ordre ne changeait rien",
        reponse:
          'Il ne change rien pour + et ×. Il change tout pour − et ÷. Teste avec '
          + 'des petits nombres : 10 − 3 − 2 fait 5, et 10 − (3 − 2) fait 9.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Calcule les deux premiers nombres, puis seulement le troisième. De gauche à droite.' },
    ],
  },

  'division-de-gauche-a-droite': {
    nom: 'La division traitée comme si l\'ordre ne comptait pas',
    chapitre: 1,
    regle:
      'Dans une suite de divisions, l\'ordre **compte** : on calcule de gauche '
      + 'à droite.\n'
      + '**24 ÷ 6 ÷ 2** vaut (24 ÷ 6) ÷ 2 = 4 ÷ 2 = **2**, et non '
      + '24 ÷ (6 ÷ 2) = 8.\n'
      + 'C\'est le même écart qu\'entre l\'addition et la soustraction, transposé '
      + 'à la multiplication et à la division.',
    controle:
      'Mets une parenthèse mentale autour des deux premiers nombres : '
      + '(24 ÷ 6) ÷ 2. Diviser deux fois de suite rend le résultat plus petit ; '
      + 'si le tien a grandi, tu as regroupé du mauvais côté.',
    raisonnements: [
      {
        id: 'regroupe-a-droite',
        texte: "J'ai calculé les deux derniers nombres d'abord",
        reponse:
          'C\'est permis pour une multiplication, jamais pour une division. '
          + '24 ÷ 6 ÷ 2 divise par 6 PUIS par 2, donc divise par 12 en tout : 2.',
      },
      {
        id: 'ordre-sans-importance',
        texte: "Je pensais que l'ordre ne changeait rien",
        reponse:
          'Il ne change rien pour × et +. Il change tout pour ÷ et −. Teste : '
          + '100 ÷ 10 ÷ 2 fait 5, et 100 ÷ (10 ÷ 2) fait 20.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Divise par le deuxième nombre, puis par le troisième. Dans cet ordre.' },
    ],
  },

  'parentheses-negligees': {
    nom: 'Les parenthèses non calculées en premier',
    chapitre: 1,
    regle:
      'Une parenthèse se calcule **avant tout le reste**, même avant les '
      + 'multiplications. C\'est à ça qu\'elle sert : changer l\'ordre naturel.\n'
      + 'Dans **(2 + 3) × 5**, on fait d\'abord 2 + 3 = 5, puis 5 × 5 = **25**. '
      + 'Sans les parenthèses, 2 + 3 × 5 vaudrait 17.\n'
      + 'Quand il y a des parenthèses dans des parenthèses, on commence par la '
      + 'plus intérieure.',
    controle:
      'Recopie le calcul en remplaçant chaque parenthèse par son résultat, '
      + 'AVANT de toucher au reste. Tant qu\'il reste une parenthèse dans ta '
      + 'ligne, tu n\'as pas le droit de faire autre chose.',
    raisonnements: [
      {
        id: 'parenthese-oubliee',
        texte: "Je n'ai pas vu les parenthèses",
        reponse:
          'Elles ne sont pas décoratives : elles existent précisément parce que '
          + 'le calcul serait différent sans elles. Repère-les avant de commencer.',
      },
      {
        id: 'multiplication-d-abord',
        texte: "J'ai fait la multiplication d'abord, puisqu'elle est prioritaire",
        reponse:
          'La parenthèse passe encore avant. L\'ordre complet est : parenthèses, '
          + 'puis puissances, puis × et ÷, puis + et −.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que vaut ce qu\'il y a dans la parenthèse ? Calcule ça d\'abord, et recopie le reste.' },
    ],
  },

  // Deux pièges distincts, et non un seul, parce que les raisonnements proposés
  // à l'élève doivent tous être POSSIBLES sur l'exercice qu'il vient de rater.
  // Sur « 3² » tout seul, « j'ai fait la multiplication avant la puissance » ne
  // veut rien dire : il n'y a pas de multiplication. Le défaut n'est apparu
  // qu'en jouant l'exercice à l'écran.
  'puissance-mal-lue': {
    nom: 'L\'exposant lu comme un facteur',
    chapitre: 1,
    regle:
      'L\'exposant dit **combien de fois** le nombre se multiplie par lui-même. '
      + 'Il ne se multiplie pas avec lui.\n'
      + '**3²** vaut 3 × 3 = **9**, et non 3 × 2 = 6.\n'
      + '**2³** vaut 2 × 2 × 2 = **8**, et non 2 × 3 = 6.',
    controle:
      'Réécris la puissance en toutes lettres avant de calculer : 3² devient '
      + '« 3 × 3 », 2³ devient « 2 × 2 × 2 ». Compte les facteurs : il doit y en '
      + 'avoir autant que l\'exposant l\'annonce.',
    raisonnements: [
      {
        id: 'exposant-multiplie',
        texte: "J'ai multiplié le nombre par l'exposant",
        reponse:
          'C\'est la confusion la plus courante, et elle donne 6 dans les deux '
          + 'cas — pour 3² comme pour 2³, alors que les résultats sont 9 et 8. '
          + 'Réécris toujours la puissance en produit avant de calculer.',
      },
      {
        id: 'exposant-additionne',
        texte: "J'ai ajouté l'exposant au nombre",
        reponse:
          'L\'exposant ne s\'ajoute pas non plus. Il compte les facteurs : dans '
          + '2³, le 3 dit qu\'il y a trois 2 à multiplier.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Réécris la puissance en produit : 3² c\'est 3 × 3. Combien ça fait ?' },
    ],
  },

  'puissance-mal-placee': {
    nom: 'La puissance appliquée au mauvais nombre',
    chapitre: 1,
    regle:
      'Une puissance ne concerne que le nombre **juste avant elle**, pas tout ce '
      + 'qui précède.\n'
      + 'Dans **2 × 3²**, le carré ne porte que sur le 3 : 3² = 9, donc '
      + '2 × 9 = **18**. Ce n\'est pas (2 × 3)² = 36.\n'
      + 'Les puissances sont au niveau le plus élevé après les parenthèses : '
      + 'elles se calculent avant les multiplications.',
    controle:
      'Entoure le nombre qui porte l\'exposant, lui seul. Puis remplace-le par '
      + 'sa valeur avant de faire quoi que ce soit d\'autre : 2 × 3² devient '
      + '2 × 9.',
    raisonnements: [
      {
        id: 'puissance-sur-tout',
        texte: "J'ai élevé au carré tout ce qui était avant",
        reponse:
          'L\'exposant ne porte que sur le nombre collé à lui. Pour qu\'il porte '
          + 'sur un calcul entier, il faudrait des parenthèses : (2 × 3)².',
      },
      {
        id: 'puissance-apres-multiplication',
        texte: "J'ai fait la multiplication avant la puissance",
        reponse:
          'La puissance passe devant. L\'ordre est : parenthèses, puissances, '
          + 'puis × et ÷, puis + et −.',
      },
      {
        id: 'puissance-comme-produit',
        texte: "J'ai multiplié le nombre par l'exposant",
        reponse:
          '3² ne vaut pas 3 × 2 = 6, mais 3 × 3 = 9. L\'exposant dit COMBIEN DE '
          + 'FOIS le nombre se multiplie par lui-même.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel nombre porte l\'exposant ? Remplace-le d\'abord par sa valeur.' },
    ],
  },

  'groupement-abusif': {
    nom: 'Un regroupement astucieux là où il change le résultat',
    chapitre: 1,
    regle:
      'Regrouper des nombres pour calculer plus vite est permis entre '
      + '**additions** et entre **multiplications** — jamais en franchissant une '
      + 'soustraction ou une division.\n'
      + '**17 + 25 + 3** : on peut regrouper 17 + 3 = 20, puis 20 + 25 = **45**.\n'
      + '**17 − 25 + 3** : on ne peut PAS regrouper 25 + 3, parce que le 25 est '
      + 'retranché et le 3 ajouté. Le calcul vaut −5, pas −11.',
    controle:
      'Avant de regrouper deux nombres, regarde le signe qui est DEVANT chacun. '
      + 'Tu ne peux les rapprocher que s\'ils ont le même rôle : tous deux '
      + 'ajoutés, ou tous deux multipliés.',
    raisonnements: [
      {
        id: 'signe-oublie',
        texte: "J'ai regroupé deux nombres sans regarder le signe devant",
        reponse:
          'C\'est le signe qui donne son rôle au nombre. Dans 17 − 25 + 3, le 25 '
          + 'est enlevé et le 3 ajouté : les rapprocher change le résultat.',
      },
      {
        id: 'astuce-partout',
        texte: "Je cherchais à faire un compte rond",
        reponse:
          'Le réflexe est bon, mais il ne vaut que sur des additions ou des '
          + 'multiplications. Ici, calcule simplement de gauche à droite.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel signe se trouve devant chacun des nombres que tu as regroupés ?' },
    ],
  },
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
