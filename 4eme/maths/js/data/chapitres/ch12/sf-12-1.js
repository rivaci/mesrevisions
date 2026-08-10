// Chapitre 12, savoir-faire 1 — Reconnaître une configuration de triangles emboîtés.
//
// Le savoir-faire qui commande tout le chapitre : tant qu'on n'a pas décidé si
// la configuration convient, écrire un rapport de longueurs n'a aucun sens. Or
// l'erreur la mieux documentée sur Thalès n'est pas un calcul raté, c'est un
// théorème appliqué à une figure qui ne le permet pas — parce que « c'est le
// chapitre du moment » et que la figure « ressemble » à celle du cours.
//
// ── Le parallélisme est LA condition, et rien ne la remplace ──────────────
//
// La découverte ne dit pas « il faut des parallèles » : elle donne trois
// figures mesurées, dont deux avec parallèles et une sans, et laisse l'élève
// constater que les quotients cessent d'être égaux au moment précis où le
// parallélisme disparaît. Les figures 2 et 3 partagent d'ailleurs AM, AB et AC
// — seul AN change. Ce n'est donc ni la forme ni les nombres qui séparent les
// deux cas.
//
// ── Pourquoi le sommet commun ne suffit pas, prouvé par un nombre ─────────
//
// Deux items « vrai ou faux » demandent un contre-exemple CHIFFRÉ : dans un
// triangle où AB = AC, l'élève place M et N où il veut et constate lui-même
// que les quotients diffèrent. C'est la seule façon honnête de montrer qu'une
// condition manque — dire « il faut aussi les parallèles » ne se vérifie pas,
// deux nombres qui ne tombent pas pareil, si.
//
// ── Aucune figure n'est affichée ──────────────────────────────────────────
//
// Toutes les configurations sont donc décrites en toutes lettres : sommet
// commun nommé, alignements donnés dans l'ordre, parallélisme énoncé ou
// explicitement absent. C'est une contrainte technique, mais elle tombe bien
// ici : un élève qui ne peut pas « voir » la figure est obligé de passer par
// la liste des conditions, ce que le contrôle réclame de toute façon.
//
// La configuration « papillon » et les triangles semblables sont en 3e. On les
// nomme pour que l'élève sache les écarter, on ne les travaille pas.

export default {
  id: 'sf-12-1',
  titre: 'Reconnaître une configuration de triangles emboîtés',
  attendus: [
    'Il reconnaît une configuration permettant d\'appliquer le théorème de Thalès.',
  ],

  // On mesure d'abord, on conclut ensuite. Les deux premières figures donnent
  // le motif — des quotients égaux — et la troisième le casse, sans prévenir
  // que le parallélisme a disparu ailleurs que dans l'énoncé.
  decouvrir: {
    titre: 'La figure où les quotients ne tombent plus pareil',
    texte:
      'Un logiciel de géométrie affiche un triangle ABC. M est un point du côté '
      + '[AB], N un point du côté [AC]. Le logiciel mesure les quatre longueurs, '
      + 'et on calcule à chaque fois deux quotients : AM ÷ AB pour un côté, '
      + 'AN ÷ AC pour l\'autre.',
    lignes: [
      {
        calcul: 'Figure 1 — (MN) et (BC) sont parallèles ; AM = 3 cm, AB = 12 cm, AN = 5 cm, AC = 20 cm',
        resultat: 'AM ÷ AB = 0,25 et AN ÷ AC = 0,25',
      },
      {
        calcul: 'Figure 2 — (MN) et (BC) sont parallèles ; AM = 6 cm, AB = 15 cm, AN = 8 cm, AC = 20 cm',
        resultat: 'AM ÷ AB = 0,4 et AN ÷ AC = 0,4',
      },
    ],
    question:
      'Sur la figure 3, les droites (MN) et (BC) ne sont pas parallèles. Le '
      + 'logiciel mesure AM = 6 cm, AB = 15 cm, AN = 12 cm et AC = 20 cm. '
      + 'Calcule les deux quotients.',
    champs: [
      { id: 'a', etiquette: 'AM ÷ AB =', attendu: 0.4 },
      { id: 'b', etiquette: 'AN ÷ AC =', attendu: 0.6 },
    ],
    conclusion:
      '0,4 et 0,6 : les deux quotients ne sont plus égaux. Et pourtant la '
      + 'figure 3 a les mêmes AM, AB et AC que la figure 2 — c\'est le '
      + '**parallélisme**, et lui seul, qui a disparu.\n'
      + 'Le théorème de Thalès ne s\'applique donc que si l\'énoncé **dit** que '
      + 'deux droites sont parallèles. Sans cette phrase, les quotients n\'ont '
      + 'aucune raison d\'être égaux, et aucun calcul n\'est permis.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Triangles emboîtés',
      texte:
        'Deux triangles sont **emboîtés** lorsqu\'ils ont un **sommet commun** '
        + 'et que leurs deux autres sommets sont portés par les **mêmes droites** '
        + 'issues de ce sommet.\n'
        + 'Exemple d\'écriture : A, B, D alignés dans cet ordre, et A, C, E '
        + 'alignés dans cet ordre. Le triangle ABC est alors emboîté dans le '
        + 'triangle ADE, et A est leur sommet commun.',
    },
    {
      type: 'theoreme',
      titre: 'Théorème de Thalès',
      texte:
        'Si A, B, D sont alignés, si A, C, E sont alignés, et si les droites '
        + '(BC) et (DE) sont **parallèles**, alors :\n'
        + 'AB ÷ AD = AC ÷ AE = BC ÷ DE.\n'
        + 'Chaque quotient compare une longueur du **petit** triangle à celle '
        + 'qui lui correspond dans le **grand**, toujours dans le même ordre.',
    },
    {
      // La liste est volontairement écrite comme une liste de contrôle : c'est
      // sous cette forme qu'elle sert en devoir, quand plus rien n'annonce le
      // chapitre en cours.
      type: 'remarque',
      titre: 'Trois choses à vérifier avant d\'écrire le moindre quotient',
      texte:
        '**Le sommet commun** : les deux triangles en partagent-ils un ?\n'
        + '**Les alignements** : les autres sommets sont-ils alignés avec lui, '
        + 'deux par deux ?\n'
        + '**Le parallélisme** : l\'énoncé dit-il que les deux droites sont '
        + 'parallèles ?\n'
        + 'Si l\'une des trois manque, le théorème ne s\'applique pas. Une '
        + 'figure qui ressemble à celle du cours ne remplace aucune des trois.',
    },
    {
      type: 'remarque',
      titre: 'La configuration « papillon » attendra la 3e',
      texte:
        'Quand les deux triangles sont situés **de part et d\'autre** du point '
        + 'commun, on parle de configuration « papillon ». Elle a ses propres '
        + 'règles, et elle est au programme de **3e**.\n'
        + 'En 4e, on n\'utilise le théorème de Thalès que dans la configuration '
        + 'des triangles **emboîtés** : les deux triangles sont du même côté du '
        + 'sommet commun, le petit rangé dans le grand.',
    },
    {
      type: 'exemple',
      texte:
        'A, B, D alignés dans cet ordre, A, C, E alignés dans cet ordre, et '
        + '(BC) parallèle à (DE) : la configuration convient, on peut écrire les '
        + 'quotients.\n'
        + 'Mêmes points, mêmes alignements, mais l\'énoncé ne dit rien du '
        + 'parallélisme : la configuration ne convient pas, et il n\'y a rien à '
        + 'calculer — même si trois longueurs sont données.',
    },
  ],

  methode: {
    titre: 'Décider si le théorème s\'applique',
    enonce:
      'Les droites (BC) et (DE) sont parallèles. A, B, D sont alignés dans cet '
      + 'ordre, ainsi que A, C, E. On donne AB = 4 cm, AD = 6 cm et BC = 5 cm. '
      + 'Peut-on utiliser le théorème de Thalès pour calculer DE ?',
    etapes: [
      {
        texte: 'Je cherche le sommet commun : A appartient au triangle ABC et au triangle ADE.',
        note: 'Sans sommet commun, ce n\'est pas cette configuration — inutile d\'aller plus loin.',
      },
      {
        texte: 'Je vérifie les alignements : A, B, D d\'un côté, A, C, E de l\'autre.',
        note: 'Les deux triangles sont donc portés par les deux mêmes droites issues de A.',
      },
      {
        texte: 'Je cherche le parallélisme : l\'énoncé dit que (BC) et (DE) sont parallèles.',
        note: 'C\'est la condition qu\'on oublie, et la seule qui rende les quotients égaux.',
      },
      {
        texte: 'Les trois conditions sont réunies : le théorème s\'applique, et AB ÷ AD = AC ÷ AE = BC ÷ DE.',
        note: 'Ici AB ÷ AD vaut 4 ÷ 6, donc DE = 5 × 6 ÷ 4 = 7,5 cm.',
      },
    ],
    controle:
      'Le contrôle : écris les deux triangles l\'un sous l\'autre, sommet par '
      + 'sommet — ABC au-dessus, ADE en dessous. Chaque colonne donne une '
      + 'correspondance : A avec A, B avec D, C avec E. Les quotients s\'écrivent '
      + 'alors tout seuls, petit triangle en haut, grand en bas. Et si le mot '
      + '« parallèles » n\'apparaît nulle part dans l\'énoncé, arrête-toi avant '
      + 'd\'écrire quoi que ce soit : le théorème ne s\'applique pas.',
  },

  entrainement: [
    // ── Palier 1 : les conditions, une par une ─────────────────────────────
    {
      id: 'e-12-1-1', type: 'vraifaux', palier: 1, piege: 'configuration-non-verifiee',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Dans la configuration des triangles emboîtés, les deux triangles ont un sommet commun.',
      attendu: true,
    },
    {
      // NEUTRE. Les trois conditions sont là et la conclusion est juste : le
      // piège « Thalès sans parallélisme » ne peut pas jouer. Sans cet item,
      // « on me demande si c'est plausible, donc c'est faux » suffirait à
      // traverser tous les « plausible » du savoir-faire sans jamais lire la
      // ligne qui parle des droites.
      id: 'e-12-1-2', type: 'plausible', palier: 1, neutre: true, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, M, B alignés dans cet ordre ; A, N, C alignés dans cet ordre ; (MN) et (BC) sont parallèles.} '
        + '\\quad \\text{AM = 4 cm, AB = 12 cm, AN = 5 cm, donc AC = 15 cm}',
      attendu: true,
      explication:
        'Le sommet commun A, les deux alignements et le parallélisme : les trois '
        + 'conditions sont réunies, le théorème s\'applique. Et les quotients '
        + 'concordent : 4 ÷ 12 vaut 0,333… et 5 ÷ 15 aussi.',
    },
    {
      // Item jumeau du précédent : mêmes points, mêmes longueurs, même
      // conclusion. Seule la phrase sur les droites a changé. C'est là que se
      // joue tout le savoir-faire.
      id: 'e-12-1-3', type: 'plausible', palier: 1, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, M, B alignés dans cet ordre ; A, N, C alignés dans cet ordre ; l\'énoncé ne dit rien des droites (MN) et (BC).} '
        + '\\quad \\text{AM = 4 cm, AB = 12 cm, AN = 5 cm, donc AC = 15 cm}',
      attendu: false,
      explication:
        'Le sommet commun et les deux alignements sont bien là, mais le '
        + 'parallélisme manque — et c\'est lui qui rend les quotients égaux. '
        + 'Sans cette information, écrire AM ÷ AB = AN ÷ AC n\'est pas permis : '
        + 'AC pourrait mesurer 15 cm comme tout autre chose.',
    },
    {
      id: 'e-12-1-4', type: 'vraifaux', palier: 1, piege: 'thales-sans-parallelisme',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Il suffit que deux triangles aient un sommet commun pour qu\'on puisse leur appliquer le théorème de Thalès.',
      attendu: false,
      contreExemple: {
        invite:
          'Dans un triangle ABC, on a AB = 10 cm et AC = 10 cm. M est un point '
          + 'de [AB] et N un point de [AC] : les triangles AMN et ABC ont bien le '
          + 'sommet A en commun. Donne une longueur AM, puis une longueur AN, '
          + 'pour lesquelles AM ÷ AB et AN ÷ AC ne sont pas égaux.',
        champs: [
          { id: 'a', etiquette: 'AM en cm' },
          { id: 'b', etiquette: 'AN en cm' },
        ],
        // AB et AC valant tous les deux 10, les deux quotients sont a/10 et
        // b/10 : ils diffèrent exactement quand a et b diffèrent. On vérifie
        // donc la PROPRIÉTÉ, et n'importe quel placement de M et N convient —
        // ce qui est justement ce qu'on veut faire sentir : rien n'oblige ces
        // deux points à se placer « bien ».
        valide: (a, b) => a > 0 && a < 10 && b > 0 && b < 10 && Math.abs(a - b) > 1e-9,
        temoin: [2, 5],
        exemple:
          'Avec AM = 2 cm et AN = 5 cm : le sommet A est bien commun aux deux '
          + 'triangles, mais AM ÷ AB = 0,2 et AN ÷ AC = 0,5. Les quotients '
          + 'diffèrent, donc (MN) et (BC) ne sont pas parallèles. Le sommet '
          + 'commun ne suffit pas.',
      },
    },

    // ── Palier 2 : la condition qui manque, et la configuration voisine ────
    {
      id: 'e-12-1-5', type: 'vraifaux', palier: 2, piege: 'configuration-non-verifiee',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Si les deux triangles sont situés de part et d\'autre de leur sommet commun, ce n\'est pas la configuration des triangles emboîtés.',
      attendu: true,
    },
    {
      id: 'e-12-1-6', type: 'plausible', palier: 2, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, B, D alignés dans cet ordre ; A, C, E alignés dans cet ordre ; (BC) et (DE) ne sont pas parallèles.} '
        + '\\quad \\text{AB = 3 cm, AD = 9 cm, AC = 4 cm, donc AE = 12 cm}',
      attendu: false,
      explication:
        'Le calcul 3 ÷ 9 = 4 ÷ AE donne bien 12, mais il n\'avait pas le droit '
        + 'd\'être écrit : l\'énoncé dit que les droites ne sont **pas** '
        + 'parallèles. Sans parallélisme, les deux quotients n\'ont aucune raison '
        + 'd\'être égaux, et AE peut valoir bien autre chose que 12 cm.',
    },
    {
      // NEUTRE, et jumeau du précédent : mêmes alignements, même forme de
      // conclusion, mais ici les droites sont parallèles et le résultat tient.
      // Sans lui, l'élève retiendrait « quand on me parle de droites, c'est
      // qu'il y a un piège » — une règle aussi fausse que celle qu'on combat.
      id: 'e-12-1-7', type: 'plausible', palier: 2, neutre: true, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, B, D alignés dans cet ordre ; A, C, E alignés dans cet ordre ; (BC) et (DE) sont parallèles.} '
        + '\\quad \\text{AB = 5 cm, AD = 20 cm, AC = 7 cm, donc AE = 28 cm}',
      attendu: true,
      explication:
        'Les trois conditions sont réunies. Les quotients concordent : '
        + '5 ÷ 20 = 0,25 et 7 ÷ 28 = 0,25. Le grand triangle est un '
        + 'agrandissement du petit, quatre fois plus grand.',
    },
    {
      id: 'e-12-1-8', type: 'trous', palier: 2, piege: 'rapports-mal-apparies',
      consigne:
        'Les droites (BC) et (DE) sont parallèles. A, B, D sont alignés dans cet '
        + 'ordre, ainsi que A, C, E. Dans le petit triangle ABC : AB = 4 cm, '
        + 'AC = 6 cm, BC = 5 cm. Dans le grand triangle ADE : AD = 10 cm, '
        + 'AE = 15 cm, DE = 12,5 cm. Donne, dans le petit triangle, la longueur '
        + 'qui correspond à chacune de celles du grand.',
      enonce:
        '\\text{correspondante de AD : } \\square \\text{ cm} \\qquad '
        + '\\text{correspondante de DE : } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'correspondante de AD', attendu: 4 },
        { id: 'b', etiquette: 'correspondante de DE', attendu: 5 },
      ],
      fausses: [
        { valeur: 6, piege: 'rapports-mal-apparies' },
        { valeur: 15, piege: 'rapports-mal-apparies' },
      ],
    },

    // ── Palier 3 : relire un raisonnement entier ───────────────────────────
    {
      id: 'e-12-1-9', type: 'corriger', palier: 3, piege: 'thales-sans-parallelisme',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{A, B, D sont alignés dans cet ordre, ainsi que A, C, E.} '
        + '\\quad \\text{AB = 3 cm, AD = 12 cm, AC = 5 cm}',
      lignes: [
        { texte: 'Les triangles ABC et ADE ont le sommet A en commun.', fausse: false },
        { texte: 'A, B, D sont alignés et A, C, E aussi : les deux triangles sont emboîtés.', fausse: false },
        { texte: 'D\'après le théorème de Thalès, AB ÷ AD = AC ÷ AE.', fausse: true },
        { texte: 'Donc AE = 20 cm.', fausse: false },
      ],
      explication:
        'Les deux premières lignes sont justes, et la dernière calcule '
        + 'correctement à partir de la troisième : 3 ÷ 12 = 0,25, donc '
        + 'AE = 5 ÷ 0,25 = 20. C\'est la troisième qui casse tout — l\'énoncé ne '
        + 'dit nulle part que (BC) et (DE) sont parallèles. Sans cette phrase, le '
        + 'théorème ne s\'applique pas et AE reste inconnue.',
    },
    {
      id: 'e-12-1-10', type: 'vraifaux', palier: 3, piege: 'aire-et-rapport-confondus',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans une configuration de triangles emboîtés, si les longueurs du grand triangle sont le triple de celles du petit, son aire est le triple elle aussi.',
      attendu: false,
      contreExemple: {
        invite:
          'Donne l\'aire d\'un triangle de ton choix, puis l\'aire du triangle '
          + 'dont toutes les longueurs sont trois fois plus grandes.',
        champs: [
          { id: 'a', etiquette: 'aire du petit triangle' },
          { id: 'b', etiquette: 'aire du grand triangle' },
        ],
        // Tripler les longueurs triple la base ET la hauteur : l'aire est donc
        // multipliée par 9, quel que soit le triangle de départ. On vérifie ce
        // rapport, pas un couple imposé — l'élève choisit son triangle.
        valide: (a, b) => a > 0
          && Math.abs(b - 9 * a) < 1e-9
          && Math.abs(b - 3 * a) > 1e-9,
        temoin: [6, 54],
        exemple:
          'Un triangle de base 4 cm et de hauteur 3 cm a pour aire 6 cm². En '
          + 'triplant toutes ses longueurs, la base passe à 12 cm et la hauteur à '
          + '9 cm : l\'aire vaut 54 cm², soit neuf fois plus. Les longueurs sont '
          + 'multipliées par 3, l\'aire par 3 × 3 = 9.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-12-1-1',
      enonce:
        'Pour mesurer la hauteur d\'un arbre, Lina plante un bâton vertical '
        + 'entre l\'arbre et le bout de son ombre, de façon que l\'ombre du bâton '
        + 's\'arrête exactement au même point que celle de l\'arbre. Le sol est '
        + 'horizontal ; le bâton et l\'arbre sont tous deux verticaux, donc '
        + 'parallèles. Le bâton mesure 1,20 m et son ombre 1,80 m ; l\'ombre de '
        + 'l\'arbre mesure 9 m.',
      questions: [
        { texte: 'Par combien faut-il multiplier l\'ombre du bâton pour obtenir celle de l\'arbre ?', attendu: 5 },
        { texte: 'Quelle est la hauteur de l\'arbre ?', attendu: 6, unite: 'm' },
      ],
    },
    {
      id: 'p-12-1-2',
      enonce:
        'Dans un triangle ABC, M est un point du segment [AB] et N un point du '
        + 'segment [AC]. Les droites (MN) et (BC) sont parallèles. AM = 3 cm, '
        + 'AB = 12 cm et BC = 20 cm.',
      questions: [
        { texte: 'Quelle est la valeur du quotient AM ÷ AB ?', attendu: 0.25 },
        { texte: 'Quelle est la longueur MN ?', attendu: 5, unite: 'cm' },
      ],
    },
    {
      // Le problème où le théorème NE s'applique PAS : sans lui, cinq énoncés
      // sur cinq se traiteraient en appliquant Thalès les yeux fermés, et le
      // savoir-faire enseignerait exactement ce qu'il veut défaire.
      id: 'p-12-1-3',
      enonce:
        'Deux élèves lisent le même énoncé : « Les triangles ABC et ADE ont le '
        + 'sommet A en commun. A, B, D sont alignés dans cet ordre, A, C, E sont '
        + 'alignés dans cet ordre, AB = 4 cm, AD = 10 cm et AC = 6 cm. Calculer '
        + 'AE. » Sacha applique aussitôt le théorème de Thalès. Inès répond '
        + 'qu\'on ne peut rien calculer tant qu\'une information manque.',
      questions: [
        {
          texte:
            'La configuration demande quatre choses : un sommet commun, '
            + 'l\'alignement de A, B, D, celui de A, C, E, et le parallélisme de '
            + '(BC) et (DE). Combien de ces quatre choses l\'énoncé donne-t-il ?',
          attendu: 3,
        },
        { texte: 'Quelle valeur de AE Sacha obtient-il en supposant les droites parallèles ?', attendu: 15, unite: 'cm' },
      ],
    },
    {
      id: 'p-12-1-4',
      enonce:
        'Un fanion triangulaire mesure 8 cm de base et a une aire de 24 cm². '
        + 'Pour la remise des prix, on en fabrique un agrandissement dont toutes '
        + 'les longueurs sont multipliées par 5.',
      questions: [
        { texte: 'Quelle est la base du grand fanion ?', attendu: 40, unite: 'cm' },
        { texte: 'Quelle est l\'aire du grand fanion ?', attendu: 600, unite: 'cm²' },
      ],
    },
    {
      id: 'p-12-1-5',
      enonce:
        'Une rampe rectiligne part du point A, au sol. Deux barres verticales la '
        + 'soutiennent : la première a son pied en B et touche la rampe en C, la '
        + 'seconde a son pied en D et touche la rampe en E. Les points A, B, D '
        + 'sont alignés dans cet ordre sur le sol horizontal, et A, C, E sont '
        + 'alignés dans cet ordre sur la rampe. Les deux barres étant verticales, '
        + '(BC) et (DE) sont parallèles. AB = 2 m, AD = 5 m et BC = 0,8 m.',
      questions: [
        { texte: 'Par combien faut-il multiplier AB pour obtenir AD ?', attendu: 2.5 },
        { texte: 'Quelle est la hauteur DE ?', attendu: 2, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-12-1-1', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Le théorème de Thalès ne peut s\'utiliser que si l\'énoncé indique que deux droites sont parallèles.',
      attendu: true, revoir: 'theoreme',
    },
    {
      id: 't-12-1-2', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, B, D alignés dans cet ordre ; A, C, E alignés dans cet ordre ; (BC) et (DE) sont parallèles.} '
        + '\\quad \\text{AB = 8 cm, AD = 20 cm, AC = 10 cm, donc AE = 25 cm}',
      attendu: true,
      explication:
        'Les trois conditions sont réunies, et les quotients concordent : '
        + '8 ÷ 20 = 0,4 et 10 ÷ 25 = 0,4.',
      revoir: 'theoreme',
    },
    {
      id: 't-12-1-3', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, B, D alignés dans cet ordre ; A, C, E alignés dans cet ordre ; l\'énoncé ne dit rien de (BC) et (DE).} '
        + '\\quad \\text{AB = 7 cm, AD = 21 cm, AC = 9 cm, donc AE = 27 cm}',
      attendu: false,
      explication:
        'Le calcul est cohérent avec lui-même — 7 ÷ 21 et 9 ÷ 27 valent tous '
        + 'deux 0,333… — mais rien n\'autorisait à l\'écrire : le parallélisme de '
        + '(BC) et (DE) n\'est pas donné. Deux conditions sur trois ne suffisent '
        + 'pas.',
      piege: 'thales-sans-parallelisme', revoir: 'remarque',
    },
    {
      id: 't-12-1-4', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'En 4e, on n\'utilise le théorème de Thalès que lorsque les deux triangles sont emboîtés, c\'est-à-dire du même côté du sommet commun.',
      attendu: true, revoir: 'remarque',
    },
    {
      id: 't-12-1-5', type: 'trous',
      consigne:
        'Les droites (MN) et (BC) sont parallèles. A, M, B sont alignés dans cet '
        + 'ordre, ainsi que A, N, C. Dans le petit triangle AMN : AM = 3 cm, '
        + 'AN = 4 cm, MN = 2,5 cm. Dans le grand triangle ABC : AB = 12 cm, '
        + 'AC = 16 cm, BC = 10 cm. Donne, dans le grand triangle, la longueur qui '
        + 'correspond à chacune de celles du petit.',
      enonce:
        '\\text{correspondante de AM : } \\square \\text{ cm} \\qquad '
        + '\\text{correspondante de MN : } \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'correspondante de AM', attendu: 12 },
        { id: 'b', etiquette: 'correspondante de MN', attendu: 10 },
      ],
      fausses: [{ valeur: 16, piege: 'rapports-mal-apparies' }],
      revoir: 'definition',
    },
    {
      id: 't-12-1-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{(BC) et (DE) sont parallèles ; A, B, D alignés dans cet ordre ; A, C, E alignés dans cet ordre.} '
        + '\\quad \\text{AB = 3 cm, AD = 12 cm, AC = 8 cm, donc AE = 2 cm}',
      attendu: false,
      explication:
        'AE = 2 cm serait plus court que AC = 8 cm, alors que E est plus loin de '
        + 'A que C : impossible. Les longueurs ont été appariées à l\'envers. Le '
        + 'bon appariement compare le petit triangle au grand dans le même ordre : '
        + 'AB ÷ AD = AC ÷ AE, donc 3 ÷ 12 = 8 ÷ AE et AE = 32 cm.',
      piege: 'rapports-mal-apparies', revoir: 'theoreme',
    },
    {
      id: 't-12-1-7', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{(BC) et (DE) sont parallèles. A, B, D sont alignés dans cet ordre. L\'énoncé ne dit rien des points A, C, E.} '
        + '\\quad \\text{AB = 5 cm, AD = 15 cm, BC = 4 cm}',
      lignes: [
        { texte: 'Les droites (BC) et (DE) sont parallèles : la condition de parallélisme est remplie.', fausse: false },
        { texte: 'A, B, D sont alignés dans cet ordre, donc A, C, E le sont forcément aussi.', fausse: true },
        { texte: 'Le théorème de Thalès donne AB ÷ AD = BC ÷ DE, donc DE = 12 cm.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et la troisième calcule correctement à '
        + 'partir de la deuxième : 5 ÷ 15 = 0,333…, donc DE = 4 × 3 = 12. C\'est '
        + 'la deuxième qui invente — rien ne dit que A, C et E sont alignés, et '
        + 'un alignement ne se déduit pas de l\'autre. Sans ce second alignement, '
        + 'il n\'y a pas de triangles emboîtés.',
      piege: 'configuration-non-verifiee', revoir: 'definition',
    },
    {
      id: 't-12-1-8', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans un triangle ABC, si M est un point de [AB] et N un point de [AC], alors AM ÷ AB et AN ÷ AC sont forcément égaux.',
      attendu: false,
      contreExemple: {
        invite:
          'On prend AB = 20 cm et AC = 20 cm. Donne une longueur AM, puis une '
          + 'longueur AN, pour lesquelles les deux quotients ne sont pas égaux.',
        champs: [
          { id: 'a', etiquette: 'AM en cm' },
          { id: 'b', etiquette: 'AN en cm' },
        ],
        valide: (a, b) => a > 0 && a < 20 && b > 0 && b < 20 && Math.abs(a - b) > 1e-9,
        temoin: [4, 15],
        exemple:
          'Avec AM = 4 cm et AN = 15 cm : 4 ÷ 20 = 0,2 et 15 ÷ 20 = 0,75. Rien '
          + 'n\'oblige M et N à être placés de façon que les quotients soient '
          + 'égaux — c\'est le parallélisme de (MN) et (BC) qui le ferait.',
      },
      piege: 'thales-sans-parallelisme', revoir: 'theoreme',
    },
    {
      id: 't-12-1-9', type: 'calcul',
      consigne:
        'Les droites (BC) et (DE) sont parallèles. A, B, D sont alignés dans cet '
        + 'ordre, ainsi que A, C, E. Calcule DE, en cm.',
      enonce: '\\text{AB = 6 cm, AD = 18 cm, BC = 9 cm}',
      attendu: 27,
      fausses: [{ valeur: 3, piege: 'rapports-mal-apparies' }],
      revoir: 'theoreme',
    },
    {
      id: 't-12-1-10', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, M, B alignés dans cet ordre ; A, N, C alignés dans cet ordre ; (MN) et (BC) sont parallèles.} '
        + '\\quad \\text{AM = 2 cm, AB = 10 cm, AN = 3 cm, donc AC = 15 cm}',
      attendu: true,
      explication:
        'Les trois conditions sont là, et les quotients concordent : '
        + '2 ÷ 10 = 0,2 et 3 ÷ 15 = 0,2.',
      revoir: 'exemple',
    },
  ],
};
