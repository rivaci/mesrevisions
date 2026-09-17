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
};

/** Les pièges d'un chapitre donné. */
export const piegesDuChapitre = (numero) =>
  Object.entries(PIEGES).filter(([, p]) => p.chapitre === numero).map(([id]) => id);
