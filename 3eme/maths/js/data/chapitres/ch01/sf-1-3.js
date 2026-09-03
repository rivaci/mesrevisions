// Chapitre 1, savoir-faire 3 — Démontrer que deux droites sont parallèles.
//
// Le savoir-faire jumeau de « démontrer qu'un triangle est rectangle » (sf-3-5),
// et il échoue pour la même raison : l'élève écrit l'égalité des quotients EN
// TÊTE de copie, puis « vérifie ». Écrire AB/AD = AC/AE avant de l'avoir
// constaté, c'est supposer le parallélisme qu'on doit démontrer — et le calcul
// qui suit ne peut plus rien réfuter.
//
// Trois choix découlent de là.
//
// D'abord, les deux quotients sont TOUJOURS calculés séparément, chacun comme
// un nombre isolé, avant toute comparaison. C'est pour ça que l'entraînement
// commence par deux calculs distincts puis un `comparer` : répondre par <, = ou
// > oblige à traiter deux nombres, jamais une égalité posée d'avance.
//
// Ensuite, les cas NON parallèles sont partout — une comparaison, un
// « plausible », un « corriger » et un « vrai ou faux » les portent. Sans eux,
// « on me montre quatre longueurs, donc c'est parallèle » traverserait tout le
// savoir-faire.
//
// Enfin, la configuration est traitée comme une condition, pas comme un décor :
// un item entier porte sur deux quotients parfaitement égaux dans une figure où
// les triangles n'ont PAS de sommet commun. C'est le seul endroit du chapitre
// où l'élève rencontre l'idée que le calcul juste ne suffit pas.
//
// La réciproque vaut dans les DEUX configurations : emboîtés et papillon. Ce
// qu'elle exige n'est pas une forme de figure, c'est un point commun aux deux
// droites et deux quotients égaux — appariés dans le bon ordre. Les triangles
// semblables et les homothéties ont leur propre chapitre.

export default {
  id: 'sf-1-3',
  titre: 'Démontrer que deux droites sont parallèles',
  attendus: [
    'Il utilise la réciproque du théorème de Thalès pour démontrer que deux droites sont parallèles.',
  ],

  // On ne part pas du théorème : on part d'un charpentier qui doit poser une
  // barre bien parallèle au sol, et qui n'a qu'un mètre ruban. L'égalité des
  // deux quotients apparaît comme un TEST — trois fermes, dont une qui échoue —
  // et pas comme une formule à réciter.
  decouvrir: {
    titre: 'La barre est-elle vraiment parallèle ?',
    texte:
      'Une ferme de charpente a la forme d\'un triangle ADE : deux chevrons '
      + 'partent du sommet A, et le sol est le côté [DE]. On fixe une barre [BC] '
      + 'entre les deux chevrons, avec B sur [AD] et C sur [AE]. Aucun niveau '
      + 'n\'est assez long pour vérifier qu\'elle est parallèle au sol : on '
      + 'mesure donc quatre longueurs, et on compare deux nombres.',
    lignes: [
      { calcul: 'Ferme A : AB = 3 m, AD = 12 m, AC = 4 m, AE = 16 m', resultat: 'AB ÷ AD = 0,25 et AC ÷ AE = 0,25 → la barre est parallèle au sol' },
      { calcul: 'Ferme B : AB = 6 m, AD = 10 m, AC = 9 m, AE = 15 m', resultat: 'AB ÷ AD = 0,6 et AC ÷ AE = 0,6 → la barre est parallèle au sol' },
      { calcul: 'Ferme C : AB = 4 m, AD = 10 m, AC = 5 m, AE = 10 m', resultat: 'AB ÷ AD = 0,4 et AC ÷ AE = 0,5 → la barre penche' },
    ],
    question:
      'À ton tour : sur une quatrième ferme, AB = 6 m, AD = 15 m, AC = 10 m et '
      + 'AE = 25 m. Calcule les deux quotients.',
    champs: [
      { id: 'a', etiquette: 'AB ÷ AD =', attendu: 0.4 },
      { id: 'b', etiquette: 'AC ÷ AE =', attendu: 0.4 },
    ],
    conclusion:
      'Tes deux quotients sont **égaux** : la barre est parallèle au sol. C\'est '
      + 'la **réciproque du théorème de Thalès**. Quand les deux quotients '
      + 'tombent pareil, les droites sont parallèles ; quand ils diffèrent — '
      + 'comme sur la ferme C — elles ne le sont pas.',
  },

  cours: [
    {
      type: 'theoreme',
      titre: 'Réciproque du théorème de Thalès',
      texte:
        'Les points A, B, D sont alignés dans cet ordre, et les points A, C, E '
        + 'le sont aussi.\n'
        + 'Si **AB ÷ AD = AC ÷ AE**, alors les droites **(BC) et (DE) sont '
        + 'parallèles**.\n'
        + 'Les triangles ABC et ADE sont **emboîtés** : ils partagent le sommet A.',
    },
    {
      type: 'propriete',
      titre: 'Quand les deux quotients diffèrent',
      texte:
        'Si AB ÷ AD **n\'est pas égal** à AC ÷ AE, alors les droites (BC) et '
        + '(DE) **ne sont pas parallèles**.\n'
        + 'Il n\'y a pas de « presque » : les deux quotients sont égaux, ou ils '
        + 'ne le sont pas.',
    },
    {
      // La condition que les manuels impriment en petit et que personne ne
      // relit. Elle est ici au même rang que le calcul, parce qu'un élève qui
      // ne la vérifie jamais réussira quand même tous les exercices d'un
      // chapitre intitulé « Thalès » — et se fera piéger au contrôle commun.
      type: 'remarque',
      titre: 'La configuration se vérifie AVANT le calcul',
      texte:
        'Cette réciproque exige une configuration de Thalès : un **sommet '
        + 'commun**, et les deux autres sommets de chaque triangle portés par '
        + 'les mêmes droites. Peu importe que les points soient du même côté '
        + '(triangles emboîtés) ou de part et d\'autre (papillon).\n'
        + 'Mais deux quotients égaux ne suffisent pas si les triangles n\'ont '
        + 'pas ce sommet commun : c\'est une condition, pas un décor.',
    },
    {
      type: 'remarque',
      titre: 'La rédaction attendue',
      texte:
        'On calcule les deux quotients **séparément**, puis on compare :\n'
        + '**D\'une part** : le quotient des deux longueurs portées par la '
        + 'première droite.\n'
        + '**D\'autre part** : celui des deux longueurs portées par la seconde.\n'
        + '**Donc**, d\'après la réciproque du théorème de Thalès…',
    },
    {
      type: 'exemple',
      texte:
        'AB = 2,4 cm, AD = 6 cm, AC = 3,2 cm et AE = 8 cm :\n'
        + 'AB ÷ AD = 2,4 ÷ 6 = 0,4 et AC ÷ AE = 3,2 ÷ 8 = 0,4.\n'
        + 'Les deux quotients sont égaux, donc (BC) et (DE) sont parallèles.',
    },
  ],

  methode: {
    titre: 'Rédiger la démonstration du parallélisme',
    enonce:
      'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
      + 'A, C, E. On donne AB = 3,5 cm, AD = 10 cm, AC = 2,8 cm et AE = 8 cm. '
      + 'Les droites (BC) et (DE) sont-elles parallèles ?',
    etapes: [
      {
        texte: 'Les triangles ABC et ADE ont le sommet A en commun, et les points sont alignés dans le même ordre.',
        note: 'La configuration se vérifie en premier : sans sommet commun, le théorème ne s\'applique pas.',
      },
      {
        texte: 'D\'une part : AB ÷ AD = 3,5 ÷ 10 = 0,35.',
        note: 'Je calcule ce quotient tout seul, sans rien écrire de l\'autre côté.',
      },
      {
        texte: 'D\'autre part : AC ÷ AE = 2,8 ÷ 8 = 0,35.',
        note: 'Deuxième quotient, calculé de son côté lui aussi.',
      },
      {
        texte: 'Je compare : 0,35 = 0,35, donc AB ÷ AD = AC ÷ AE.',
        note: 'C\'est seulement maintenant que l\'égalité s\'écrit.',
      },
      {
        texte: 'Donc, d\'après la réciproque du théorème de Thalès, les droites (BC) et (DE) sont parallèles.',
        note: 'On cite le théorème par son nom, et on nomme les deux droites.',
      },
    ],
    controle:
      'Le contrôle : B est entre A et D, donc AB est plus courte que AD — le '
      + 'quotient AB ÷ AD est forcément **plus petit que 1**. Même chose pour '
      + 'l\'autre. Si tu trouves un quotient supérieur à 1, tu as mis la grande '
      + 'longueur au numérateur : reprends l\'appariement. Et compare tes deux '
      + 'nombres chiffre à chiffre : 0,35 et 0,36 ne sont pas égaux, donc les '
      + 'droites ne sont pas parallèles. « Presque » ne démontre rien.',
  },

  entrainement: [
    // ── Palier 1 : les deux quotients, calculés puis comparés ────────────────
    {
      id: 'e-1-3-1', type: 'calcul', palier: 1, piege: 'rapports-mal-apparies',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que A, C, E. On '
        + 'donne AB = 3 cm, AD = 12 cm, AC = 5 cm et AE = 20 cm. Calcule le '
        + 'quotient AB ÷ AD.',
      enonce: '3 \\div 12', attendu: 0.25,
      fausses: [
        { valeur: 4, piege: 'rapports-mal-apparies' },
        { valeur: 0.15, piege: 'rapports-mal-apparies' },
      ],
    },
    {
      id: 'e-1-3-2', type: 'calcul', palier: 1, piege: 'rapports-mal-apparies',
      consigne: 'Dans la même figure, calcule maintenant le quotient AC ÷ AE.',
      enonce: '5 \\div 20', attendu: 0.25,
      // 4, c'est 20 ÷ 5 : la grande longueur au numérateur. Le quotient d'un
      // rapport de Thalès bien apparié ne dépasse jamais 1, et c'est le
      // contrôle que la méthode installe.
      fausses: [{ valeur: 4, piege: 'rapports-mal-apparies' }],
    },
    {
      // NEUTRE : ici les deux quotients SONT égaux, donc « c'est le chapitre de
      // Thalès, les rapports sont égaux » tombe juste. Le piège ne joue pas — et
      // lui servir sa règle, « sans parallèles, les rapports ne sont pas
      // égaux », confirmerait à l'élève l'inégalité qu'il vient d'écrire à tort.
      id: 'e-1-3-3', type: 'comparer', palier: 1, neutre: true, piege: 'thales-sans-parallelisme',
      consigne: 'Compare ces deux quotients.',
      enonce: '\\dfrac{3}{12} \\ldots \\dfrac{5}{20}', attendu: '=',
      fausses: [{ valeur: '<', piege: 'rapports-mal-apparies' }],
    },
    {
      // Ici les deux quotients ne sont PAS égaux, et le plus grand est le
      // premier : ni « c'est égal », ni « le second est plus grand » ne
      // marchent. Sans cet item, « on me montre quatre longueurs, donc les
      // droites sont parallèles » suffirait à traverser tout le palier sans
      // jamais poser une division — et c'est exactement ce piège-là qui produit
      // la réponse « = ». Il joue donc à plein : rien de neutre ici.
      id: 'e-1-3-4', type: 'comparer', palier: 1, piege: 'thales-sans-parallelisme',
      consigne:
        'Dans une autre figure, AB = 7 cm, AD = 14 cm, AC = 6 cm et AE = 18 cm. '
        + 'Compare les deux quotients.',
      enonce: '\\dfrac{7}{14} \\ldots \\dfrac{6}{18}', attendu: '>',
      fausses: [{ valeur: '=', piege: 'thales-sans-parallelisme' }],
    },

    // ── Palier 2 : conclure, et savoir dire non ──────────────────────────────
    {
      id: 'e-1-3-5', type: 'plausible', palier: 2, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{AB = 5 cm, AD = 8 cm, AC = 7 cm, AE = 12 cm : donc (BC) et (DE) sont parallèles}',
      attendu: false,
      explication:
        '5 ÷ 8 = 0,625, alors que 7 ÷ 12 ≈ 0,583. Les deux quotients ne sont pas '
        + 'égaux, donc les droites ne sont pas parallèles. Pour qu\'elles le '
        + 'soient avec AB = 5 cm, AD = 8 cm et AC = 7 cm, il faudrait '
        + 'AE = 11,2 cm.',
    },
    {
      // NEUTRE parmi les « plausible » : la réponse est oui. Sans lui, « on me
      // demande si c'est plausible, donc c'est faux » deviendrait une stratégie
      // gagnante. Et les quotients valent 2/3 : impossible de trancher à l'œil,
      // il faut vraiment diviser.
      id: 'e-1-3-6', type: 'plausible', palier: 2, neutre: true, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{AB = 6 cm, AD = 9 cm, AC = 8 cm, AE = 12 cm : donc (BC) et (DE) sont parallèles}',
      attendu: true,
      explication:
        '6 ÷ 9 et 8 ÷ 12 valent tous les deux 2/3, soit environ 0,667. Les deux '
        + 'quotients sont égaux, donc les droites sont bien parallèles — même '
        + 'quand le quotient ne tombe pas sur un décimal simple.',
    },
    {
      id: 'e-1-3-7', type: 'trous', palier: 2, piege: 'rapports-mal-apparies',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que A, C, E. On '
        + 'donne AB = 9 cm, AD = 24 cm et AC = 12 cm. Complète pour que (BC) et '
        + '(DE) soient parallèles.',
      enonce: '\\dfrac{9}{24} = \\dfrac{12}{\\square}',
      champs: [{ id: 'a', attendu: 32 }],
      fausses: [{ valeur: 4.5, piege: 'rapports-mal-apparies' }],
    },

    // ── Palier 3 : relire une démonstration, et repérer ce qui manque ────────
    {
      id: 'e-1-3-8', type: 'corriger', palier: 3, piege: 'thales-sans-parallelisme',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{AB = 4 cm, AD = 10 cm, AC = 6 cm, AE = 14 cm}',
      lignes: [
        { texte: 'Les triangles ABC et ADE ont le sommet A en commun, et les points sont alignés dans le même ordre.', fausse: false },
        { texte: "D'une part : AB ÷ AD = 4 ÷ 10 = 0,4.", fausse: false },
        { texte: "D'autre part : AC ÷ AE = 6 ÷ 14 ≈ 0,43.", fausse: false },
        { texte: '0,4 et 0,43 sont presque égaux, donc (BC) et (DE) sont parallèles.', fausse: true },
      ],
      explication:
        'Les trois premières lignes sont justes, calcul compris : c\'est la '
        + 'conclusion qui ne l\'est pas. La réciproque du théorème de Thalès '
        + 'exige une égalité **exacte**. Comme 0,4 ≠ 0,4285…, les droites ne '
        + 'sont **pas** parallèles — et « presque » ne démontre rien.',
    },
    {
      // Les deux quotients sont rigoureusement égaux, et pourtant la conclusion
      // est fausse : les deux droites qui portent les points ne se coupent pas
      // en un sommet commun. C'est le seul item où le calcul juste ne suffit
      // pas, et il porte à lui seul la remarque sur la configuration.
      id: 'e-1-3-9', type: 'plausible', palier: 3, piege: 'configuration-non-verifiee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, B, D alignés dans cet ordre ; F, C, E alignés dans cet ordre ; }'
        + '\\text{AB = 3 cm, AD = 9 cm, FC = 5 cm, FE = 15 cm : donc (BC) et (DE) sont parallèles}',
      attendu: false,
      explication:
        'Les deux quotients sont pourtant bien égaux : 3 ÷ 9 et 5 ÷ 15 valent '
        + 'tous les deux 1/3. Mais les points sont portés par deux droites qui '
        + 'partent de **deux sommets différents**, A d\'un côté et F de l\'autre. '
        + 'Il n\'y a pas de triangles emboîtés, donc la réciproque du théorème de '
        + 'Thalès ne s\'applique pas : on ne peut rien conclure.',
    },
    {
      id: 'e-1-3-10', type: 'vraifaux', palier: 3, piege: 'thales-sans-parallelisme',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Si les deux quotients AB ÷ AD et AC ÷ AE sont tous les deux plus petits que 1, alors les droites (BC) et (DE) sont parallèles.',
      attendu: false,
      contreExemple: {
        invite:
          'On donne AB = 4 cm et AD = 10 cm. Propose une longueur AC puis une '
          + 'longueur AE, avec AC plus petite que AE, telles que les droites ne '
          + 'soient PAS parallèles.',
        champs: [
          { id: 'a', etiquette: 'longueur AC, en cm' },
          { id: 'b', etiquette: 'longueur AE, en cm' },
        ],
        // On vérifie la PROPRIÉTÉ, pas un couple imposé : AC doit être une
        // longueur, C doit rester entre A et E — donc AC < AE, ce qui garantit
        // au passage un quotient inférieur à 1 — et le quotient obtenu doit
        // différer de 0,4. Une infinité de couples conviennent.
        valide: (a, b) => Number.isFinite(a) && Number.isFinite(b) && a > 0 && a < b && a / b !== 0.4,
        temoin: [3, 5],
        exemple:
          'AC = 3 cm et AE = 5 cm conviennent : 3 ÷ 5 = 0,6, alors que '
          + '4 ÷ 10 = 0,4. Les deux quotients sont bien plus petits que 1, et '
          + 'pourtant ils ne sont pas égaux — les droites ne sont pas '
          + 'parallèles. Être plus petit que 1 ne dit rien du parallélisme.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-1-3-1',
      enonce:
        'Un charpentier monte une ferme triangulaire ADE : deux chevrons partent '
        + 'du sommet A, et le sol est le côté [DE]. Il fixe une barre [BC], avec '
        + 'B sur [AD] et C sur [AE]. Il mesure AB = 1,2 m, AD = 3 m, AC = 1,6 m '
        + 'et AE = 4 m.',
      questions: [
        { texte: 'Combien vaut le quotient AB ÷ AD ?', attendu: 0.4 },
        { texte: 'Combien vaut le quotient AC ÷ AE ?', attendu: 0.4 },
        { texte: 'La barre est-elle parallèle au sol ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
      ],
    },
    {
      id: 'p-1-3-2',
      enonce:
        'Deux tasseaux partent d\'un même clou A. Sur le premier, une vis B est '
        + 'plantée à 12 cm de A, et le tasseau se termine en D à 30 cm de A. Sur '
        + 'le second, la vis C est à 18 cm de A, et le tasseau se termine en E à '
        + '40 cm de A. Un fil est tendu de B à C, un autre de D à E.',
      questions: [
        { texte: 'Combien vaut le quotient AB ÷ AD ?', attendu: 0.4 },
        { texte: 'Combien vaut le quotient AC ÷ AE ?', attendu: 0.45 },
        { texte: 'Les deux fils sont-ils parallèles ? Réponds 1 pour oui, 0 pour non.', attendu: 0 },
      ],
    },
    {
      id: 'p-1-3-3',
      enonce:
        'Une voile triangulaire ADE est renforcée par une bande [BC] cousue '
        + 'entre les deux bords : B est sur [AD] et C est sur [AE]. On sait que '
        + 'AB = 90 cm, AD = 240 cm et AE = 320 cm. La couturière veut que la '
        + 'bande soit parallèle au bas de la voile [DE].',
      questions: [
        { texte: 'Combien vaut le quotient AB ÷ AD ?', attendu: 0.375 },
        { texte: 'À quelle distance de A faut-il coudre le point C ?', attendu: 120, unite: 'cm' },
      ],
    },
    {
      id: 'p-1-3-4',
      enonce:
        'Deux allées rectilignes d\'un parc partent d\'une même entrée A. Sur la '
        + 'première, un banc B est à 15 m de A et un arbre D à 25 m de A. Sur la '
        + 'seconde, une fontaine C est à 21 m de A et un kiosque E à 35 m de A. '
        + 'On veut savoir si le chemin banc-fontaine est parallèle au chemin '
        + 'arbre-kiosque.',
      questions: [
        { texte: 'Combien vaut le quotient AB ÷ AD ?', attendu: 0.6 },
        { texte: 'Combien vaut le quotient AC ÷ AE ?', attendu: 0.6 },
        { texte: 'Les deux chemins sont-ils parallèles ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
      ],
    },
    {
      id: 'p-1-3-5',
      enonce:
        'Un décorateur tend deux guirlandes entre deux câbles qui partent du '
        + 'même crochet A. La première guirlande joint B, à 60 cm de A sur le '
        + 'premier câble, et C, à 80 cm de A sur le second. La seconde guirlande '
        + 'joint D, à 150 cm de A sur le premier câble, et E, sur le second, '
        + 'dont la position reste à choisir. Il veut les deux guirlandes '
        + 'parallèles.',
      questions: [
        { texte: 'Combien vaut le quotient AB ÷ AD ?', attendu: 0.4 },
        { texte: 'À quelle distance de A faut-il accrocher le point E ?', attendu: 200, unite: 'cm' },
      ],
    },
  ],

  test: [
    {
      id: 't-1-3-1', type: 'comparer', consigne: 'Compare ces deux quotients.',
      enonce: '\\dfrac{2}{5} \\ldots \\dfrac{6}{15}', attendu: '=', revoir: 'theoreme',
    },
    {
      id: 't-1-3-2', type: 'comparer', consigne: 'Compare ces deux quotients.',
      enonce: '\\dfrac{3}{7} \\ldots \\dfrac{5}{11}', attendu: '<', revoir: 'propriete',
    },
    {
      id: 't-1-3-3', type: 'fraction',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, avec AB = 14 cm et '
        + 'AD = 35 cm. Donne le quotient AB ÷ AD sous forme de fraction simplifiée.',
      enonce: '\\dfrac{14}{35}', attendu: [2, 5], revoir: 'exemple',
    },
    {
      id: 't-1-3-4', type: 'trous',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que A, C, E, avec '
        + 'AB = 5 cm, AD = 8 cm et AE = 32 cm. Complète pour que (BC) et (DE) '
        + 'soient parallèles.',
      enonce: '\\dfrac{5}{8} = \\dfrac{\\square}{32}',
      champs: [{ id: 'a', attendu: 20 }], revoir: 'theoreme',
    },
    {
      id: 't-1-3-5', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{AB = 4 cm, AD = 9 cm, AC = 6 cm, AE = 12 cm : donc (BC) et (DE) sont parallèles}',
      attendu: false,
      explication:
        '4 ÷ 9 ≈ 0,444 alors que 6 ÷ 12 = 0,5. Les deux quotients diffèrent, '
        + 'donc les droites ne sont pas parallèles.',
      piege: 'thales-sans-parallelisme', revoir: 'propriete',
    },
    {
      id: 't-1-3-6', type: 'comparer', consigne: 'Compare ces deux quotients.',
      enonce: '\\dfrac{9}{12} \\ldots \\dfrac{15}{20}', attendu: '=', revoir: 'theoreme',
    },
    {
      id: 't-1-3-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{AB = 2,5 cm, AD = 4 cm, AC = 7,5 cm, AE = 12 cm : donc (BC) et (DE) sont parallèles}',
      attendu: true,
      explication:
        '2,5 ÷ 4 = 0,625 et 7,5 ÷ 12 = 0,625. Les deux quotients sont égaux, '
        + 'donc les droites sont bien parallèles.',
      revoir: 'theoreme',
    },
    {
      id: 't-1-3-8', type: 'corriger',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{AB = 6 cm, AD = 15 cm, AC = 8 cm, AE = 20 cm}',
      lignes: [
        { texte: 'Les triangles ABC et ADE ont le sommet A en commun.', fausse: false },
        { texte: "D'une part : AB ÷ AD = 6 ÷ 15 = 0,4.", fausse: false },
        { texte: "D'autre part : AC ÷ AD = 8 ÷ 15 ≈ 0,53.", fausse: true },
        { texte: "0,4 ≠ 0,53, donc (BC) et (DE) ne sont pas parallèles.", fausse: false },
      ],
      explication:
        'Troisième ligne : le second quotient doit comparer AC à AE, pas à AD — '
        + 'AD est porté par l\'autre droite. Le bon calcul donne 8 ÷ 20 = 0,4, '
        + 'égal au premier quotient : les droites **sont** parallèles.',
      piege: 'rapports-mal-apparies', revoir: 'remarque',
    },
    {
      id: 't-1-3-9', type: 'calcul',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, avec AB = 4,5 cm et '
        + 'AD = 12 cm. Calcule le quotient AB ÷ AD.',
      enonce: '4{,}5 \\div 12', attendu: 0.375, revoir: 'exemple',
    },
    {
      id: 't-1-3-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Si AB = 6 cm, AD = 15 cm et AC = 9 cm, alors les droites (BC) et (DE) sont parallèles quelle que soit la longueur AE.',
      attendu: false,
      contreExemple: {
        invite: 'Propose une longueur AE, supérieure à 9 cm, pour laquelle les deux quotients ne sont pas égaux.',
        champs: [{ id: 'a', etiquette: 'longueur AE, en cm' }],
        valide: (a) => Number.isFinite(a) && a > 9 && 9 / a !== 6 / 15,
        temoin: [18],
        exemple:
          'Avec AE = 18 cm : AB ÷ AD = 0,4 alors que AC ÷ AE = 0,5. Les deux '
          + 'quotients diffèrent, donc les droites ne sont pas parallèles. Une '
          + 'seule longueur convient : AE = 22,5 cm.',
      },
      piege: 'thales-sans-parallelisme', revoir: 'propriete',
    },
  ],
};
