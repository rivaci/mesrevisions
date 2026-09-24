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
// droites et deux quotients égaux — appariés dans le bon ordre.
//
// ── Ce que le cours d'Evan ajoute ─────────────────────────────────────────
//
// Trois choses, reprises telles quelles.
//
// La condition « les points sont alignés DANS LE MÊME ORDRE » : c'est elle qui
// distingue une vraie configuration d'une figure où le sommet commun est au
// bout d'un alignement et au milieu de l'autre. Un item lui est consacré, où
// les rapports sont égaux et la conclusion pourtant interdite.
//
// La CONTRAPOSÉE, nommée : quand les rapports diffèrent, on conclut « d'après
// la contraposée du théorème de Thalès, les droites ne sont pas parallèles ».
// Et la mise en garde qui va avec — la réciproque ne sert pas à prouver que
// deux droites ne sont pas parallèles.
//
// Le modèle de rédaction de son cours, et son exemple en papillon — sommet H,
// HG = 1,6, HI = 4,8, HK = 0,9, HJ = 2,7 —, qui devient la méthode.

const THEOREMES = [
  'le théorème de Thalès',
  'la réciproque du théorème de Thalès',
  'la contraposée du théorème de Thalès',
];

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
      // L'énoncé du cours d'Evan, avec ses lettres et ses trois conditions.
      type: 'theoreme',
      titre: 'Réciproque du théorème de Thalès',
      texte:
        'Si le théorème de Thalès sert à déterminer des longueurs, la réciproque, elle, sert '
        + 'à **montrer que des droites sont parallèles**.\n'
        + 'Si :\n'
        + '• deux droites (BD) et (EC) sont sécantes en A ;\n'
        + '• les points A, D, B sont alignés **dans le même ordre** que les points A, E, C ;\n'
        + '• AD/AB = AE/AC ;\n'
        + 'alors les droites **(DE) et (BC) sont parallèles**.',
      figure: { modele: 'thales', sommet: 'A', d1: { D: 2, B: 5 }, d2: { E: 2.4, C: 6 }, angle: 50 },
    },
    {
      type: 'propriete',
      titre: 'La contraposée : quand les rapports diffèrent',
      texte:
        'Si AD/AB **n\'est pas égal** à AE/AC, alors les droites (DE) et (BC) **ne sont pas '
        + 'parallèles** : c\'est la **contraposée du théorème de Thalès**.\n'
        + 'Il n\'y a pas de « presque » : les deux rapports sont égaux, ou ils ne le sont pas.',
    },
    {
      type: 'remarque',
      titre: 'Attention : un théorème pour chaque conclusion',
      texte:
        'La réciproque sert à démontrer que des droites **sont** parallèles. Elle ne sert '
        + '**pas** à prouver que deux droites ne sont pas parallèles : pour cela, on cite la '
        + '**contraposée** du théorème de Thalès.',
    },
    {
      type: 'remarque',
      titre: 'Le même ordre',
      texte:
        'Le sommet commun doit être à la même place dans les deux alignements : au bout des '
        + 'deux (triangles emboîtés), ou au milieu des deux (papillon).\n'
        + 'Sur cette figure, A est entre B et D, mais au bout de A, C, E : même avec '
        + 'AB/AD = AC/AE, les droites (BC) et (DE) ne sont pas parallèles.',
      figure: { modele: 'thales', sommet: 'A', d1: { B: 2, D: -6 }, d2: { C: 3, E: 9 }, angle: 55 },
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
        'On calcule les deux rapports **séparément**, puis on compare — le modèle de ton cours :\n'
        + '• On sait que les droites (…) et (…) sont sécantes en … ;\n'
        + '• **D\'une part** : le premier rapport, **et d\'autre part** : le second ;\n'
        + '• **On constate que** les deux rapports sont égaux (ou différents) ;\n'
        + '• **De plus**, les points … sont alignés dans le même ordre que les points … ;\n'
        + '**Donc**, d\'après la réciproque du théorème de Thalès, les droites sont '
        + 'parallèles — ou, si les rapports diffèrent, d\'après la contraposée, elles ne le '
        + 'sont pas.',
    },
    {
      type: 'exemple',
      texte:
        'AB = 2,4 cm, AD = 6 cm, AC = 3,2 cm et AE = 8 cm :\n'
        + 'AB ÷ AD = 2,4 ÷ 6 = 0,4 et AC ÷ AE = 3,2 ÷ 8 = 0,4.\n'
        + 'Les deux quotients sont égaux, donc (BC) et (DE) sont parallèles.',
    },
  ],

  // L'exemple du cours d'Evan, en papillon, rédigé comme dans son cours.
  methode: {
    titre: 'Rédiger la démonstration du parallélisme',
    enonce:
      'Les droites (JK) et (GI) sont sécantes en H. HG = 1,6 cm, HI = 4,8 cm, HK = 0,9 cm '
      + 'et HJ = 2,7 cm. Les droites (IJ) et (GK) sont-elles parallèles ?',
    // Comme dans le cours : les longueurs sont dans l'énoncé, pas sur la figure
    // — le petit triangle est trop petit pour porter ses cotes lisiblement.
    figure: { modele: 'thales', sommet: 'H', d1: { G: 1.6, I: -4.8 }, d2: { K: 0.9, J: -2.7 }, angle: 60 },
    etapes: [
      {
        texte: 'On sait que les droites (JK) et (GI) sont sécantes en H.',
        note: 'Le cadre, écrit en premier.',
      },
      {
        texte: 'D\'une part : HG/HI = 1,6/4,8 = 1/3.',
        note: 'Je calcule ce rapport tout seul, sans rien écrire de l\'autre côté.',
      },
      {
        texte: 'Et d\'autre part : HK/HJ = 0,9/2,7 = 1/3.',
        note: 'Deuxième rapport, calculé de son côté lui aussi.',
      },
      {
        texte: 'On constate que : HG/HI = HK/HJ.',
        note: 'C\'est seulement maintenant que l\'égalité s\'écrit.',
      },
      {
        texte: 'De plus, les points G, H, I sont alignés dans le même ordre que les points K, H, J.',
        note: 'H est au milieu dans les deux alignements : c\'est un papillon.',
      },
      {
        texte: 'Donc, d\'après la réciproque du théorème de Thalès, les droites (GK) et (JI) sont parallèles.',
        note: 'On cite le théorème par son nom, et on nomme les deux droites.',
      },
    ],
    controle:
      'Le contrôle : si les rapports avaient été différents — avec HI = 3,2 cm, HG/HI vaut '
      + '1/2 alors que HK/HJ vaut 1/3 — la conclusion aurait été « d\'après la contraposée du '
      + 'théorème de Thalès, les droites (GK) et (JI) ne sont pas parallèles ». Jamais '
      + '« d\'après la réciproque ». Et compare tes deux rapports exactement : 0,35 et 0,36 ne '
      + 'sont pas égaux. « Presque » ne démontre rien.',
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
        + 'égaux, donc, d\'après la contraposée du théorème de Thalès, les droites ne '
        + 'sont pas parallèles. Pour qu\'elles le soient avec AB = 5 cm, AD = 8 cm et '
        + 'AC = 7 cm, il faudrait AE = 11,2 cm.',
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
        + 'sont **pas** parallèles — d\'après la contraposée du théorème de Thalès. '
        + '« Presque » ne démontre rien.',
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
    {
      // La mise en garde du cours : quand les rapports diffèrent, ce n'est pas
      // la réciproque qui conclut, c'est la contraposée.
      id: 'e-1-3-11', type: 'choix', palier: 2, piege: 'reciproque-pour-non-parallele',
      consigne:
        'Les droites (BD) et (CE) sont sécantes en A, et les points sont alignés dans le même '
        + 'ordre. On veut savoir si (BC) et (DE) sont parallèles. Quel théorème permet de '
        + 'conclure ?',
      enonce: 'Calcule les deux rapports avec les longueurs de la figure.',
      figure: {
        modele: 'thales', sommet: 'A', d1: { B: 3, D: 7.5 }, d2: { C: 4, E: 9 }, angle: 45,
        cotes: { AB: '3', AD: '7,5', AC: '4', AE: '9' },
      },
      paralleles: false, memeOrdre: true,
      choix: THEOREMES, attendu: 'la contraposée du théorème de Thalès',
      fausses: [
        { valeur: 'la réciproque du théorème de Thalès', piege: 'reciproque-pour-non-parallele' },
        { valeur: 'le théorème de Thalès', piege: 'theoreme-mal-choisi' },
      ],
    },
    {
      // Les rapports sont égaux, et la conclusion est pourtant interdite : A
      // est au milieu d'un alignement et au bout de l'autre.
      id: 'e-1-3-12', type: 'choix', palier: 3, piege: 'ordre-des-points-ignore',
      consigne:
        'B, A, D sont alignés dans cet ordre, et A, C, E aussi. AB = 1,5 cm, AD = 4,5 cm, '
        + 'AC = 2 cm et AE = 6 cm : les deux rapports AB/AD et AC/AE valent 1/3. Que peut-on '
        + 'conclure ?',
      enonce: 'Observe l\'ordre des points sur la figure.',
      figure: { modele: 'thales', sommet: 'A', d1: { B: 1.5, D: -4.5 }, d2: { C: 2, E: 6 }, angle: 60 },
      paralleles: false, memeOrdre: false,
      choix: [
        '(BC) et (DE) sont parallèles, d\'après la réciproque du théorème de Thalès',
        'on ne peut pas utiliser la réciproque : les points ne sont pas alignés dans le même ordre',
      ],
      attendu: 'on ne peut pas utiliser la réciproque : les points ne sont pas alignés dans le même ordre',
      fausses: [
        { valeur: '(BC) et (DE) sont parallèles, d\'après la réciproque du théorème de Thalès', piege: 'ordre-des-points-ignore' },
      ],
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
    {
      id: 't-1-3-11', type: 'choix',
      consigne:
        'Les droites (RT) et (UV) sont sécantes en S, et les points sont alignés dans le même '
        + 'ordre. On veut savoir si (RU) et (TV) sont parallèles. Quel théorème permet de '
        + 'conclure ?',
      enonce: '\\text{SR = 2 cm, ST = 5 cm, SU = 3 cm, SV = 7,5 cm}',
      figure: { modele: 'thales', sommet: 'S', d1: { R: 2, T: -5 }, d2: { U: 3, V: -7.5 }, angle: 50 },
      paralleles: true, memeOrdre: true,
      choix: THEOREMES, attendu: 'la réciproque du théorème de Thalès',
      fausses: [
        { valeur: 'le théorème de Thalès', piege: 'theoreme-mal-choisi' },
        { valeur: 'la contraposée du théorème de Thalès', piege: 'rapports-mal-compares' },
      ],
      piege: 'theoreme-mal-choisi', revoir: 'theoreme',
    },
    {
      id: 't-1-3-12', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation: 'La réciproque du théorème de Thalès permet de prouver que deux droites ne sont pas parallèles.',
      attendu: false, piege: 'reciproque-pour-non-parallele', revoir: 'remarque',
    },
  ],
};
