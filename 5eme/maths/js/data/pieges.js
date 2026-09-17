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

  // ── Chapitre 1, suite : ce que la première interrogation a montré ─────────
  //
  // Les quatre pièges qui suivent viennent tous de la copie d'Antonin
  // (Interrogation 1, 15/20). Ce ne sont pas des erreurs imaginées : ce sont
  // les siennes, et le contenu les vise nommément.

  'multiplication-avant-division': {
    nom: 'La multiplication crue prioritaire sur la division',
    chapitre: 1,
    regle:
      'La multiplication et la division sont au **même niveau** : aucune ne passe '
      + 'avant l\'autre. Entre elles, on calcule **de gauche à droite**.\n'
      + '**3 × 8 ÷ 4 ÷ 3 × 2** : 3 × 8 = 24, puis 24 ÷ 4 = 6, puis 6 ÷ 3 = 2, '
      + 'puis 2 × 2 = **4**. Commencer par 3 × 2 donnerait 1, et c\'est faux.',
    controle:
      'Dans une chaîne de × et de ÷, avance d\'une opération à la fois, depuis la '
      + 'gauche, en réécrivant la ligne à chaque étape. Si tu as sauté une '
      + 'division pour aller chercher une multiplication plus loin, recommence.',
    raisonnements: [
      {
        id: 'fois-avant-divise',
        texte: "J'ai fait les multiplications avant les divisions",
        reponse:
          'C\'est la confusion la plus répandue : on croit que « fois » est plus fort '
          + 'que « divisé ». Ils sont au même niveau, comme + et −. Seul l\'ordre de '
          + 'lecture les départage.',
      },
      {
        id: 'regroupe-la-fin',
        texte: "J'ai regroupé les derniers nombres pour simplifier",
        reponse:
          'Regrouper n\'est permis qu\'entre multiplications. Dès qu\'une division '
          + 'se glisse dans la chaîne, on avance de gauche à droite, sans rien '
          + 'regrouper.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Réécris la ligne après chaque opération, en partant de la gauche.' },
    ],
  },

  'mot-mal-traduit': {
    nom: 'Le mot du calcul mal traduit',
    chapitre: 1,
    regle:
      'Chaque mot désigne une opération, et une seule :\n'
      + '**somme** → +   ·   **différence** → −   ·   **produit** → ×   ·   '
      + '**quotient** → ÷\n'
      + '« La différence entre 12 et 7 », c\'est 12 − 7 = 5, jamais 12 ÷ 7.',
    controle:
      'Avant d\'écrire, souligne le mot du calcul et écris son signe au-dessus. '
      + 'Différence : un « − ». Si ton écriture contient un autre signe à cet '
      + 'endroit, reprends.',
    raisonnements: [
      {
        id: 'difference-division',
        texte: "J'ai pensé que « différence » voulait dire division",
        reponse:
          'La différence, c\'est l\'écart entre deux nombres : on la trouve par une '
          + 'soustraction. La division donne un **quotient**. Retiens les quatre '
          + 'paires : somme +, différence −, produit ×, quotient ÷.',
      },
      {
        id: 'produit-somme',
        texte: "J'ai confondu somme et produit",
        reponse:
          'La **somme** vient d\'une addition, le **produit** d\'une multiplication. '
          + 'Retiens-les avec un exemple : dans 3 + 4 = 7, 7 est la somme ; dans '
          + '3 × 4 = 12, 12 est le produit.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Souligne le mot du calcul, et écris son signe juste au-dessus.' },
    ],
  },

  'parentheses-oubliees-a-l-ecrit': {
    nom: 'Les parenthèses oubliées en traduisant une phrase',
    chapitre: 1,
    regle:
      'Quand une phrase applique une opération à un **résultat** — « le produit de '
      + '4 par **la différence** entre 12 et 7 » —, ce résultat doit être calculé '
      + 'en premier. Il faut donc des **parenthèses** : **4 × (12 − 7)** = 20.\n'
      + 'Sans elles, 4 × 12 − 7 ferait passer la multiplication d\'abord, et '
      + 'vaudrait 41.',
    controle:
      'Cherche dans la phrase un « de la somme », « de la différence », « par le '
      + 'produit »… : ce qui suit est un calcul entier, à mettre entre parenthèses. '
      + 'Puis calcule ton écriture et vérifie que tu retrouves bien la phrase.',
    raisonnements: [
      {
        id: 'ordre-de-la-phrase',
        texte: "J'ai écrit les nombres dans l'ordre de la phrase, sans parenthèses",
        reponse:
          'L\'ordre de la phrase n\'est pas l\'ordre du calcul. « Le produit de 4 par '
          + 'la différence… » veut dire : d\'abord la différence, ensuite le '
          + 'produit. Sans parenthèses, les priorités feraient l\'inverse.',
      },
      {
        id: 'parentheses-inutiles',
        texte: "Je pensais que les parenthèses ne changeaient rien ici",
        reponse:
          'Calcule les deux pour voir : 4 × (12 − 7) = 20, mais 4 × 12 − 7 = 41. '
          + 'Deux résultats différents : les parenthèses sont indispensables.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel calcul la phrase demande-t-elle de faire en premier ?' },
    ],
  },

  'operation-principale-meconnue': {
    nom: 'Le calcul nommé d\'après la première opération vue',
    chapitre: 1,
    regle:
      'Un calcul porte le nom de l\'opération faite **en dernier**. Dans '
      + '**5 + 2 × 3**, on fait d\'abord 2 × 3, puis on ajoute : c\'est donc une '
      + '**somme** — « la somme de 5 et du produit de 2 par 3 ».\n'
      + 'Dans **3 × (5 − 2)**, la soustraction passe d\'abord, la multiplication '
      + 'en dernier : c\'est un **produit**.',
    controle:
      'Calcule l\'expression en numérotant les étapes. La dernière opération '
      + 'donne le nom : + somme, − différence, × produit, ÷ quotient. Puis la '
      + 'phrase commence par ce nom.',
    raisonnements: [
      {
        id: 'premiere-vue',
        texte: "J'ai nommé le calcul d'après l'opération que j'ai calculée en premier",
        reponse:
          'C\'est l\'inverse : le nom vient de la DERNIÈRE opération. Dans 5 + 2 × 3, '
          + 'le produit 2 × 3 n\'est qu\'une étape ; le résultat final est obtenu '
          + 'par une addition. C\'est une somme.',
      },
      {
        id: 'ordre-ecriture',
        texte: "J'ai suivi l'ordre dans lequel c'est écrit",
        reponse:
          'L\'écriture se lit de gauche à droite, mais le calcul suit les '
          + 'priorités. Numérote les étapes du calcul : la dernière donne le nom.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle opération fais-tu en tout dernier ? C\'est elle qui nomme le calcul.' },
    ],
  },

  'distributivite-incomplete': {
    nom: 'La distributivité appliquée à un seul terme',
    chapitre: 1,
    regle:
      'Multiplier une somme, c\'est multiplier **chacun** de ses termes :\n'
      + '**k × (a + b) = k × a + k × b**.\n'
      + '7 × (100 + 2) = 7 × 100 + 7 × 2 = 700 + 14 = **714**. Oublier de '
      + 'multiplier le 2 donnerait 702.',
    controle:
      'Trace une flèche du facteur vers CHAQUE nombre de la parenthèse : il en '
      + 'faut autant que de termes. Puis vérifie en calculant d\'abord la '
      + 'parenthèse : 7 × 102 = 714.',
    raisonnements: [
      {
        id: 'premier-terme',
        texte: "J'ai multiplié seulement le premier nombre de la parenthèse",
        reponse:
          'Le facteur s\'applique à toute la parenthèse. 7 × (100 + 2), ce sont sept '
          + 'fois cent ET sept fois deux. Dessine une flèche vers chacun.',
      },
      {
        id: 'additionne-facteur',
        texte: "J'ai ajouté le nombre au lieu de le multiplier",
        reponse:
          'Devant la parenthèse, il y a un « × », même quand on ne l\'écrit pas en '
          + 'entier. Chaque terme doit être MULTIPLIÉ par ce nombre.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de flèches partent du facteur ? Autant que de nombres dans la parenthèse.' },
    ],
  },

  'carre-inconnu': {
    nom: 'Un carré ou un cube à connaître par cœur',
    chapitre: 1,
    regle:
      'Les carrés de 0 à 15 se connaissent par cœur : 0, 1, 4, 9, 16, 25, 36, '
      + '49, 64, 81, 100, 121, 144, **169, 196, 225**.\n'
      + 'Et le cube de 10 : **10³ = 1 000**.\n'
      + 'Dans l\'autre sens : 169 = 13², car 13 × 13 = 169.',
    controle:
      'Un carré se vérifie par une multiplication : 13² = 13 × 13. Pour 13 × 13, '
      + 'fais 13 × 10 + 13 × 3 = 130 + 39 = 169.',
    raisonnements: [
      {
        id: 'double',
        texte: "J'ai multiplié par 2 au lieu d'élever au carré",
        reponse:
          '13² vaut 13 × 13, pas 13 × 2. L\'exposant compte les facteurs, il ne '
          + 'multiplie pas.',
      },
      {
        id: 'calcul-rate',
        texte: "Je savais qu'il fallait faire 13 × 13, mais je me suis trompé dans le calcul",
        reponse:
          'Découpe : 13 × 13 = 13 × 10 + 13 × 3 = 130 + 39 = 169. Et pour les '
          + 'retenir, récite la liste des carrés jusqu\'à 225 une fois par jour '
          + 'pendant une semaine.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Écris le carré comme une multiplication, puis calcule-la en deux morceaux.' },
    ],
  },

  // ── Chapitre 2 : paires d'angles et parallélisme ─────────────────────────

  'nature-angle-confondue': {
    nom: 'Aigu, obtus, droit, plat : la nature d\'un angle confondue',
    chapitre: 2,
    regle:
      'On compare la mesure à **90°** et à **180°** :\n'
      + '**nul** : 0°   ·   **aigu** : entre 0° et 90°   ·   **droit** : 90° '
      + 'pile   ·   **obtus** : entre 90° et 180°   ·   **plat** : 180°.\n'
      + 'Un angle de 90° n\'est pas aigu : il est droit.',
    controle:
      'Place la mesure sur une ligne 0 — 90 — 180. Avant 90 : aigu. Après : '
      + 'obtus. Pile sur une borne : nul, droit ou plat.',
    raisonnements: [
      {
        id: 'aigu-obtus',
        texte: "J'ai confondu aigu et obtus",
        reponse:
          'Un angle **aigu** est plus petit qu\'un angle droit, pointu comme une '
          + 'aiguille ; un angle **obtus** est plus ouvert que l\'angle droit.',
      },
      {
        id: 'borne',
        texte: "La mesure tombait pile sur 90° ou 180°",
        reponse:
          'Les bornes ont leur propre nom : 90° est un angle droit, 180° un angle '
          + 'plat. Aigu et obtus sont réservés à ce qui est strictement entre.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Compare la mesure à 90° : plus petite, plus grande, ou égale ?' },
    ],
  },

  'complementaire-supplementaire': {
    nom: 'Complémentaires et supplémentaires confondus',
    chapitre: 2,
    regle:
      'Deux angles **complémentaires** font **90°** à eux deux. Deux angles '
      + '**supplémentaires** font **180°**.\n'
      + 'Le complémentaire de 35° mesure 90° − 35° = **55°** ; son '
      + 'supplémentaire mesure 180° − 35° = **145°**.',
    controle:
      'Additionne tes deux angles : tu dois retomber sur 90° (complémentaires) '
      + 'ou 180° (supplémentaires). Un moyen de ne pas les inverser : « S » comme '
      + 'supplémentaire, et 180 est plus grand que 90, comme S est après C.',
    raisonnements: [
      {
        id: 'inverse',
        texte: "J'ai inversé 90° et 180°",
        reponse:
          'Complémentaires : 90°. Supplémentaires : 180°. Dans l\'alphabet, C vient '
          + 'avant S, et 90 avant 180.',
      },
      {
        id: 'mesure-recopiee',
        texte: "J'ai donné la même mesure que l'angle de départ",
        reponse:
          'Le complémentaire n\'est pas un angle égal : c\'est ce qui MANQUE pour '
          + 'arriver à 90°. Il se calcule par une soustraction.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'La somme doit-elle faire 90° ou 180° ?' },
    ],
  },

  'paire-d-angles-confondue': {
    nom: 'Adjacents et opposés par le sommet confondus',
    chapitre: 2,
    regle:
      'Deux angles **adjacents** ont le **même sommet**, un **côté commun**, et '
      + 'sont de part et d\'autre de ce côté. Deux angles **opposés par le '
      + 'sommet** ont le même sommet et des côtés dans le prolongement l\'un de '
      + 'l\'autre : ils sont **égaux**.\n'
      + 'Quand deux droites se coupent, deux angles côte à côte sont adjacents '
      + 'et supplémentaires ; deux angles face à face sont opposés par le sommet.',
    controle:
      'Pose ton doigt sur le premier angle : si tu peux passer au second en '
      + 'franchissant UN seul côté, ils sont adjacents. S\'il faut traverser le '
      + 'sommet, ils sont opposés — donc de même mesure.',
    raisonnements: [
      {
        id: 'cote-a-cote-egaux',
        texte: "J'ai cru que deux angles côte à côte étaient égaux",
        reponse:
          'Ce sont les angles FACE À FACE qui sont égaux (opposés par le sommet). '
          + 'Deux angles côte à côte sur une droite font 180° à eux deux.',
      },
      {
        id: 'sommet-oublie',
        texte: "Il y avait un côté commun, j'ai dit adjacents",
        reponse:
          'Un côté commun ne suffit pas : il faut aussi le même sommet, et que les '
          + 'deux angles soient de part et d\'autre de ce côté. Sinon, l\'un est '
          + 'contenu dans l\'autre.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Les deux angles sont-ils côte à côte, ou face à face ?' },
    ],
  },

  'alternes-correspondants-confondus': {
    nom: 'Alternes-internes et correspondants confondus',
    chapitre: 2,
    regle:
      '**Alternes-internes** : de part et d\'autre de la sécante, et tous les deux '
      + '**entre** les droites (D) et (D\').\n'
      + '**Correspondants** : du **même côté** de la sécante, l\'un entre les '
      + 'droites, l\'autre à l\'extérieur — à la même place à chaque croisement.',
    controle:
      'Deux questions, dans l\'ordre : les angles sont-ils du même côté de la '
      + 'sécante ? Puis : sont-ils entre les deux droites ? Même côté et même '
      + 'place : correspondants. Côtés opposés et tous deux entre : '
      + 'alternes-internes.',
    raisonnements: [
      {
        id: 'interne-mal-lu',
        texte: "Je n'ai pas vérifié qu'ils étaient tous les deux entre les droites",
        reponse:
          '« Interne », c\'est ENTRE (D) et (D\'). Un angle au-dessus de (D) ou '
          + 'en dessous de (D\') est externe : il ne peut pas être alterne-interne.',
      },
      {
        id: 'cote-mal-lu',
        texte: "Je n'ai pas regardé de quel côté de la sécante ils étaient",
        reponse:
          '« Alternes », c\'est de part et d\'autre de la sécante. Deux angles du '
          + 'même côté ne sont jamais alternes.',
      },
      {
        id: 'meme-place',
        texte: "Je croyais que les correspondants devaient être tous les deux entre les droites",
        reponse:
          'Les correspondants sont à la même place à chaque croisement : si l\'un '
          + 'est entre les droites, l\'autre est à l\'extérieur. Imagine qu\'on fait '
          + 'glisser la droite (D) sur (D\') : ils se superposent.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Même côté de la sécante, ou côtés opposés ?' },
    ],
  },

  'parallelisme-oublie': {
    nom: 'Des angles dits égaux sans droites parallèles',
    chapitre: 2,
    regle:
      'Les angles alternes-internes (ou correspondants) ne sont égaux **que si** '
      + 'les droites (D) et (D\') sont **parallèles**.\n'
      + 'Et réciproquement : s\'ils sont égaux, les droites sont parallèles ; '
      + 's\'ils ne le sont pas, elles ne sont pas parallèles.',
    controle:
      'Avant d\'écrire « les angles sont égaux », cherche dans l\'énoncé le mot '
      + '« parallèles ». S\'il n\'y est pas, tu ne peux pas conclure à l\'égalité — '
      + 'mais tu peux t\'en servir dans l\'autre sens.',
    raisonnements: [
      {
        id: 'toujours-egaux',
        texte: "Je pensais que des alternes-internes étaient toujours égaux",
        reponse:
          'Seulement entre droites parallèles. Si (D) et (D\') se rapprochent, les '
          + 'deux angles n\'ont plus la même ouverture.',
      },
      {
        id: 'reciproque-oubliee',
        texte: "Je ne savais pas qu'on pouvait conclure au parallélisme",
        reponse:
          'La propriété marche dans les deux sens : des alternes-internes égaux '
          + 'prouvent que les droites sont parallèles. Des alternes-internes '
          + 'différents prouvent qu\'elles ne le sont pas.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'L\'énoncé dit-il que les droites sont parallèles ?' },
    ],
  },

  'egal-ou-supplementaire': {
    nom: 'Un angle égal pris pour un supplémentaire, ou l\'inverse',
    chapitre: 2,
    regle:
      'Entre droites parallèles, les alternes-internes et les correspondants sont '
      + '**égaux** : on recopie la mesure.\n'
      + 'Deux angles **adjacents sur une droite** sont **supplémentaires** : on '
      + 'calcule 180° moins la mesure.\n'
      + 'Savoir quelle paire on a sous les yeux, c\'est savoir quel calcul faire.',
    controle:
      'Nomme la paire AVANT de calculer. Puis vérifie à l\'œil : deux angles '
      + 'aigus ou deux obtus peuvent être égaux ; un aigu et un obtus sont '
      + 'forcément différents.',
    raisonnements: [
      {
        id: 'toujours-180',
        texte: "J'ai fait 180° moins la mesure",
        reponse:
          'Ce calcul vaut pour deux angles côte à côte sur une droite. Pour des '
          + 'alternes-internes ou des correspondants entre parallèles, la mesure '
          + 'se recopie telle quelle.',
      },
      {
        id: 'toujours-egal',
        texte: "J'ai recopié la même mesure",
        reponse:
          'Recopier ne vaut que pour une paire d\'angles égaux. Ici, regarde : '
          + 'l\'un des angles est aigu, l\'autre obtus — ils ne peuvent pas être égaux.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle est la paire ? Égaux, ou supplémentaires ?' },
    ],
  },

  // ── Chapitre 3 : les nombres relatifs ────────────────────────────────────

  'negatifs-compares-comme-positifs': {
    nom: 'Deux négatifs comparés comme des positifs',
    chapitre: 3,
    regle:
      'Entre deux nombres **négatifs**, le plus grand est celui qui est le **plus '
      + 'proche de zéro**. **−3 > −7** : sur la droite graduée, −3 est plus à droite.\n'
      + 'Il fait −3 °C : c\'est moins froid que −7 °C.',
    controle:
      'Place les deux nombres sur une droite graduée, même à main levée. Le plus '
      + 'grand est toujours celui de droite. Ou pense à la température : laquelle '
      + 'est la moins froide ?',
    raisonnements: [
      {
        id: 'chiffre-plus-grand',
        texte: "J'ai regardé le nombre sans son signe : 7 est plus grand que 3",
        reponse:
          'Sans le signe, oui. Mais −7 est plus loin de zéro, du côté des négatifs : '
          + 'il est plus petit. Avoir une dette de 7 €, c\'est pire qu\'une dette de 3 €.',
      },
      {
        id: 'sens-droite',
        texte: "Je ne savais plus dans quel sens vont les nombres négatifs",
        reponse:
          'Sur une droite graduée, les nombres grandissent toujours vers la droite, '
          + 'négatifs compris. −1 est à droite de −2, donc −1 > −2.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Lequel des deux est le plus à droite sur la droite graduée ?' },
    ],
  },

  'graduation-mal-lue': {
    nom: 'Une graduation mal comptée',
    chapitre: 3,
    regle:
      'Sur une droite graduée, on part de l\'**origine** (le 0) et on compte les '
      + 'graduations, en regardant **ce que vaut une graduation** : 1, 0,5, 10…\n'
      + 'À gauche de 0, les nombres sont **négatifs** et grandissent en valeur '
      + 'vers la gauche : −1, −2, −3…',
    controle:
      'Repère deux nombres écrits sur la droite et compte les graduations entre '
      + 'eux : tu sais ce que vaut une graduation. Puis compte depuis 0 jusqu\'au '
      + 'point, graduation par graduation.',
    raisonnements: [
      {
        id: 'compte-les-traits',
        texte: "J'ai compté les traits au lieu des intervalles",
        reponse:
          'On compte les ESPACES entre les graduations, pas les traits. De 0 à la '
          + 'troisième graduation, il y a trois espaces : c\'est 3 (si une graduation vaut 1).',
      },
      {
        id: 'unite-ignoree',
        texte: "Je n'ai pas regardé ce que vaut une graduation",
        reponse:
          'Une graduation ne vaut pas toujours 1. Regarde les nombres écrits : si 0 et '
          + '1 sont séparés par deux graduations, chacune vaut 0,5.',
      },
      {
        id: 'demi-graduation',
        texte: "Le point était entre deux graduations",
        reponse:
          'Au milieu de deux graduations, on prend la moitié d\'une graduation : entre '
          + '−3 et −2, le milieu est −2,5.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Que vaut une graduation ? Compte ensuite depuis 0.' },
    ],
  },

  'signe-oublie': {
    nom: 'Le signe « − » oublié',
    chapitre: 3,
    regle:
      'Un point situé **à gauche** de l\'origine sur une droite graduée, ou **sous** '
      + 'l\'axe des abscisses, ou **à gauche** de l\'axe des ordonnées, a une '
      + 'coordonnée **négative** : elle s\'écrit avec un signe « − ».',
    controle:
      'Avant d\'écrire un nombre, regarde de quel côté de zéro est le point. À '
      + 'gauche ou en bas : commence par écrire le « − ».',
    raisonnements: [
      {
        id: 'distance-seule',
        texte: "J'ai compté la distance à zéro, sans penser au signe",
        reponse:
          'La distance est juste, il manque le sens. À gauche de zéro, on écrit un '
          + '« − » devant : 3 graduations à gauche, c\'est −3.',
      },
      {
        id: 'cote-mal-vu',
        texte: "Je n'ai pas vu de quel côté de zéro était le point",
        reponse:
          'Repère d\'abord le 0, puis regarde : à droite, positif ; à gauche, négatif. '
          + 'Dans un repère : en bas, l\'ordonnée est négative.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le point est-il à gauche ou à droite de zéro ?' },
    ],
  },

  'coordonnees-inversees': {
    nom: 'Abscisse et ordonnée inversées',
    chapitre: 3,
    regle:
      'Les coordonnées d\'un point s\'écrivent **(abscisse ; ordonnée)** : d\'abord '
      + 'le déplacement **horizontal**, lu sur l\'axe des abscisses, puis le '
      + 'déplacement **vertical**, lu sur l\'axe des ordonnées.\n'
      + 'A(2 ; −3) : 2 vers la droite, puis 3 vers le bas.',
    controle:
      'Dis-le à voix haute : « d\'abord je marche, ensuite je monte ». Le premier '
      + 'nombre se lit sur l\'axe horizontal.',
    raisonnements: [
      {
        id: 'vertical-dabord',
        texte: "J'ai lu d'abord la hauteur, puis le côté",
        reponse:
          'C\'est l\'inverse : on se déplace d\'abord le long de l\'axe horizontal. '
          + '(2 ; −3) et (−3 ; 2) sont deux points différents.',
      },
      {
        id: 'ordre-sans-importance',
        texte: "Je pensais que l'ordre des coordonnées ne comptait pas",
        reponse:
          'Il compte : échange les deux nombres, et tu tombes sur un autre point. '
          + 'L\'abscisse vient toujours en premier.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel nombre se lit sur l\'axe horizontal ? C\'est lui qui vient en premier.' },
    ],
  },

  'zero-et-strictement': {
    nom: 'Zéro, et le mot « strictement »',
    chapitre: 3,
    regle:
      '**0 est à la fois positif et négatif**. « **Strictement** positif » veut dire '
      + '« positif et différent de 0 » : 0 n\'est donc ni strictement positif, ni '
      + 'strictement négatif.',
    controle:
      'Quand le mot « strictement » apparaît, retire le 0 de la liste avant de '
      + 'répondre.',
    raisonnements: [
      {
        id: 'zero-ni-lun',
        texte: "Je pensais que 0 n'était ni positif ni négatif",
        reponse:
          'C\'est l\'inverse : 0 est les deux à la fois. Ce qu\'il n\'est pas, c\'est '
          + 'STRICTEMENT positif ou STRICTEMENT négatif.',
      },
      {
        id: 'strictement-ignore',
        texte: "Je n'ai pas fait attention au mot « strictement »",
        reponse:
          '« Strictement » exclut le 0. « −5 et 0 sont négatifs » est vrai ; « −5 et 0 '
          + 'sont strictement négatifs » est faux.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le nombre 0 est-il concerné ? Relis s\'il y a le mot « strictement ».' },
    ],
  },

  'oppose-mal-compris': {
    nom: 'L\'opposé et la distance à zéro confondus',
    chapitre: 3,
    regle:
      'L\'**opposé** d\'un nombre a la même distance à zéro, mais le **signe '
      + 'contraire** : l\'opposé de 4 est −4, l\'opposé de −2,5 est 2,5. Seul 0 est '
      + 'son propre opposé.\n'
      + 'La **distance à zéro** (ou valeur absolue) est toujours **positive** : celle '
      + 'de −4 est 4.',
    controle:
      'Pour l\'opposé, change seulement le signe. Pour la distance à zéro, retire '
      + 'le signe : une distance n\'est jamais négative.',
    raisonnements: [
      {
        id: 'oppose-negatif',
        texte: "J'ai pensé que l'opposé d'un nombre était toujours négatif",
        reponse:
          'L\'opposé change le signe, dans les deux sens : l\'opposé de −6 est 6, un '
          + 'nombre positif.',
      },
      {
        id: 'distance-negative',
        texte: "J'ai gardé le signe « − » pour la distance à zéro",
        reponse:
          'Une distance ne peut pas être négative : −4 est à 4 unités de zéro. La '
          + 'distance à zéro de −4 est donc 4.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Te demande-t-on l\'opposé (on change le signe) ou la distance à zéro (on enlève le signe) ?' },
    ],
  },

  'croissant-decroissant-confondus': {
    nom: 'Croissant et décroissant confondus',
    chapitre: 3,
    regle:
      'Ordre **croissant** : du plus petit au plus grand — les nombres « croissent », '
      + 'ils grandissent. On l\'écrit avec des **<**.\n'
      + 'Ordre **décroissant** : du plus grand au plus petit, avec des **>**.\n'
      + 'Dans les deux symboles, la pointe montre le plus petit : 2 < 5, 5 > 2.',
    controle:
      'Relis ta liste de gauche à droite : à chaque pas, les nombres doivent '
      + 'grandir (croissant) ou diminuer (décroissant). Puis vérifie chaque '
      + 'symbole, un par un.',
    raisonnements: [
      {
        id: 'mots-inverses',
        texte: "J'ai confondu « croissant » et « décroissant »",
        reponse:
          '« Croissant » vient de « croître », grandir : on commence par le plus '
          + 'petit, et ça grandit. « Décroissant », c\'est l\'inverse.',
      },
      {
        id: 'symbole-inverse',
        texte: "Je ne savais plus dans quel sens se lit le symbole",
        reponse:
          'Le symbole s\'ouvre du côté du plus grand, et sa pointe montre le plus '
          + 'petit : −3 < 1 se lit « −3 est inférieur à 1 ».',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Te demande-t-on de commencer par le plus petit ou par le plus grand ?' },
    ],
  },

  // ── Chapitre 4 : les symétries ───────────────────────────────────────────

  'symetrique-axial-mal-place': {
    nom: 'Le symétrique mal placé',
    chapitre: 4,
    regle:
      'Le symétrique A\' d\'un point A par rapport à une droite (d) est **de l\'autre côté** '
      + 'de (d), **à la même distance**, sur la **perpendiculaire** à (d) qui passe par A : '
      + '(d) est la médiatrice de [AA\'].\n'
      + 'Sur un quadrillage, on compte les carreaux de A **jusqu\'à (d)**, puis le même '
      + 'nombre de l\'autre côté.',
    controle:
      'Plie la figure en pensée le long de (d) : A doit tomber pile sur A\'. Vérifie que '
      + '(d) coupe [AA\'] en son milieu, et à angle droit.',
    raisonnements: [
      {
        id: 'mauvais-axe',
        texte: "J'ai utilisé un axe du repère au lieu de la droite (d)",
        reponse:
          'L\'axe de symétrie est la droite (d), en pointillés — pas l\'axe des abscisses ni '
          + 'celui des ordonnées. On compte les carreaux jusqu\'à (d).',
      },
      {
        id: 'distance-mal-reportee',
        texte: "Je n'ai pas reporté la même distance de l'autre côté",
        reponse:
          'A et son symétrique sont à la même distance de (d) : si A est à 3 carreaux de (d), '
          + 'A\' aussi — ni 2, ni 6.',
      },
      {
        id: 'en-biais',
        texte: "Je ne me suis pas déplacé perpendiculairement à (d)",
        reponse:
          'On traverse (d) à angle droit. Si (d) est verticale, le symétrique reste sur la '
          + 'même ligne horizontale que A : son ordonnée ne change pas.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Combien de carreaux entre le point et (d) ? Reporte-les de l\'autre côté.' },
    ],
  },

  'symetries-confondues': {
    nom: 'Symétrie axiale et symétrie centrale confondues',
    chapitre: 4,
    regle:
      'La **symétrie axiale** est un **pliage** le long d\'une **droite** : pour un axe '
      + 'vertical, seule la position horizontale change.\n'
      + 'La **symétrie centrale** est un **demi-tour** autour d\'un **point** : le point passe '
      + 'de l\'autre côté du centre dans les **deux** directions à la fois. Un point en haut '
      + 'à gauche du centre arrive en bas à droite.',
    controle:
      'Relis l\'énoncé : symétrie par rapport à une droite, ou par rapport à un point ? Pour '
      + 'un point K, K doit être le milieu du segment qui joint le point à son symétrique.',
    raisonnements: [
      {
        id: 'plie-au-lieu-de-tourner',
        texte: "J'ai plié la figure au lieu de lui faire faire un demi-tour",
        reponse:
          'Avec un centre, on ne plie pas : on tourne d\'un demi-tour. Le point change de côté '
          + 'horizontalement ET verticalement.',
      },
      {
        id: 'tourne-au-lieu-de-plier',
        texte: "J'ai fait un demi-tour au lieu de plier",
        reponse:
          'Avec une droite, on plie le long de la droite : si elle est verticale, le point garde '
          + 'sa hauteur et ne change de côté qu\'horizontalement.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Symétrie par rapport à une droite (pliage) ou à un point (demi-tour) ?' },
    ],
  },

  'centre-pas-milieu': {
    nom: 'Le centre n\'est pas au milieu',
    chapitre: 4,
    regle:
      'A\' est le symétrique de A par rapport à K quand **K est le milieu de [AA\']** : A, K '
      + 'et A\' sont alignés, et KA\' = KA.\n'
      + 'Sur un quadrillage, on compte le trajet de A jusqu\'à K, puis on refait **exactement '
      + 'le même trajet** à partir de K.',
    controle:
      'Compare les deux trajets, de A à K et de K à A\' : ils doivent être identiques, '
      + 'carreau pour carreau.',
    raisonnements: [
      {
        id: 'distance-differente',
        texte: "Mon point n'est pas à la même distance de K",
        reponse:
          'K est pile au milieu : KA\' = KA. Le trajet après K est aussi long que le trajet '
          + 'avant K — ni la moitié, ni le double.',
      },
      {
        id: 'mauvais-centre',
        texte: "J'ai fait le demi-tour autour de l'origine au lieu du point donné",
        reponse:
          'Le centre est le point K de l\'énoncé, pas l\'origine O du repère. On compte le '
          + 'trajet jusqu\'à K.',
      },
      {
        id: 'k-lui-meme',
        texte: "Je pensais qu'un point ne pouvait pas être son propre symétrique",
        reponse:
          'Le symétrique de K par rapport à K est K : le trajet de K à K est nul. C\'est le '
          + 'seul point qui ne bouge pas pendant le demi-tour.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel est le trajet de A jusqu\'à K ? Refais-le depuis K.' },
    ],
  },

  'milieu-mal-compris': {
    nom: 'Le milieu : sur le segment, et à égale distance',
    chapitre: 4,
    regle:
      'Le **milieu** d\'un segment [AB] est le point I **du segment** tel que **IA = IB**. '
      + 'Les deux conditions comptent : un point à égale distance de A et de B, mais hors du '
      + 'segment, n\'est pas le milieu.\n'
      + 'Sur une droite graduée, le milieu est à mi-chemin **entre A et B** : on part de A, '
      + 'pas de 0.',
    controle:
      'Vérifie les deux conditions : ton point est-il sur [AB] ? Est-il à la même distance '
      + 'de A et de B ? Compte les graduations de chaque côté.',
    raisonnements: [
      {
        id: 'egale-distance-suffit',
        texte: "Je pensais qu'être à la même distance de A et de B suffisait",
        reponse:
          'Tous les points de la médiatrice de [AB] sont à la même distance de A et de B. Le '
          + 'milieu est le seul d\'entre eux qui est aussi sur le segment.',
      },
      {
        id: 'moitie-depuis-zero',
        texte: "J'ai pris la moitié de la longueur, en partant de 0",
        reponse:
          'La moitié de AB se reporte à partir de A, pas à partir de l\'origine : le milieu '
          + 'est entre A et B.',
      },
      {
        id: 'longueur-entiere',
        texte: "J'ai confondu la moitié et la longueur entière",
        reponse:
          'Si I est le milieu de [AB], alors AI est la MOITIÉ de AB : AB = 2 × AI.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Où est le point à mi-chemin entre A et B ?' },
    ],
  },

  'mediatrice-mal-comprise': {
    nom: 'La médiatrice : perpendiculaire, et par le milieu',
    chapitre: 4,
    regle:
      'La **médiatrice** d\'un segment est la droite **perpendiculaire** à ce segment qui '
      + 'passe par son **milieu**. Il faut les deux.\n'
      + 'Propriété : tout point de la médiatrice de [AB] est **à égale distance** de A et de B.\n'
      + 'Pour la tracer au compas, l\'écartement doit être **plus grand que la moitié** de AB.',
    controle:
      'Vérifie les deux conditions l\'une après l\'autre : la droite passe-t-elle par le '
      + 'milieu ? Fait-elle un angle droit avec le segment ?',
    raisonnements: [
      {
        id: 'une-condition-suffit',
        texte: "J'ai vérifié une seule des deux conditions",
        reponse:
          'Beaucoup de droites passent par le milieu, et beaucoup sont perpendiculaires au '
          + 'segment. Une seule fait les deux : la médiatrice.',
      },
      {
        id: 'distance-oubliee',
        texte: "Je ne savais pas qu'un point de la médiatrice est à égale distance des extrémités",
        reponse:
          'C\'est la propriété de la médiatrice : si M est dessus, alors MA = MB. Rien à mesurer.',
      },
      {
        id: 'compas-trop-petit',
        texte: "J'ai pris un écartement de compas égal à la moitié de AB, ou moins",
        reponse:
          'Avec la moitié de AB, les deux arcs se touchent en un seul point ; avec moins, ils ne '
          + 'se rencontrent pas. Il faut un écartement plus grand que la moitié de AB.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'La droite est-elle perpendiculaire au segment ? Passe-t-elle par son milieu ?' },
    ],
  },

  'symetrie-deforme': {
    nom: 'Une symétrie ne déforme rien',
    chapitre: 4,
    regle:
      'Une symétrie, axiale ou centrale, **conserve** les longueurs, les angles, les aires, '
      + 'les périmètres et l\'alignement : la figure et son symétrique sont **superposables**.\n'
      + 'Par une symétrie centrale, l\'image d\'une droite est une droite **parallèle**.',
    controle:
      'Pense au calque qu\'on retourne ou qu\'on fait tourner : on ne l\'étire pas. Toutes '
      + 'les mesures restent les mêmes.',
    raisonnements: [
      {
        id: 'change-de-taille',
        texte: "J'ai pensé que la figure changeait de mesure",
        reponse:
          'Une symétrie déplace la figure sans la déformer : un angle de 47° reste un angle de '
          + '47°, une aire de 24 cm² reste une aire de 24 cm².',
      },
      {
        id: 'droite-perpendiculaire',
        texte: "J'ai pensé que l'image d'une droite par un demi-tour lui était perpendiculaire",
        reponse:
          'Un demi-tour retourne la droite sans changer sa direction : son image lui est '
          + 'parallèle. Une rotation d\'un quart de tour la rendrait perpendiculaire, pas un demi-tour.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Une symétrie change-t-elle les longueurs, les angles, les aires ?' },
    ],
  },

  'axe-et-centre-confondus': {
    nom: 'Axe de symétrie et centre de symétrie confondus',
    chapitre: 4,
    regle:
      'Une figure a un **axe de symétrie** si un **pliage** le long de cet axe la superpose à '
      + 'elle-même. Elle a un **centre de symétrie** si un **demi-tour** autour de ce point la '
      + 'laisse inchangée.\n'
      + 'L\'un n\'entraîne pas l\'autre : la lettre A a un axe mais pas de centre, la lettre N '
      + 'a un centre mais pas d\'axe. Et couper une figure en deux parties égales ne suffit '
      + 'pas pour être un axe.',
    controle:
      'Fais les deux tests séparément : plier, puis tourner d\'un demi-tour. Une figure peut '
      + 'réussir l\'un et rater l\'autre.',
    raisonnements: [
      {
        id: 'axe-donc-centre',
        texte: "J'ai pensé qu'une figure avec un axe avait forcément un centre",
        reponse:
          'Plie la lettre T : elle a un axe. Fais-lui faire un demi-tour : elle se retrouve la '
          + 'tête en bas. Pas de centre.',
      },
      {
        id: 'centre-donc-axe',
        texte: "J'ai pensé qu'une figure avec un centre avait forcément un axe",
        reponse:
          'La lettre N retombe sur elle-même après un demi-tour, mais aucun pliage ne la '
          + 'superpose à elle-même.',
      },
      {
        id: 'moities-egales',
        texte: "J'ai pensé qu'une droite qui coupe la figure en deux parties égales est un axe",
        reponse:
          'La diagonale d\'un rectangle le coupe en deux triangles égaux, mais pliée le long de '
          + 'cette diagonale, la figure ne retombe pas sur elle-même : un rectangle a 2 axes, '
          + 'pas 4.',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Faut-il plier (axe) ou tourner d\'un demi-tour (centre) ?' },
    ],
  },
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
