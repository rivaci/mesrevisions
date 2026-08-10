// Chapitre 10, savoir-faire 4 — Utiliser les cas d'égalité des triangles.
//
// ── Le savoir-faire où l'on ne calcule rien ───────────────────────────────
//
// C'est le premier savoir-faire du chapitre où la réponse ne se trouve pas :
// elle se JUSTIFIE. Deux triangles sont égaux ou ne le sont pas, et ce qui
// tranche n'est pas un nombre mais la place des données. D'où le choix des
// types : `plausible` et `corriger` dominent l'entraînement, parce qu'ils
// demandent de juger un raisonnement, pas d'en produire un résultat.
//
// Le fait que l'application n'affiche aucune figure sert ici, et beaucoup :
// sur un dessin, deux triangles égaux se reconnaissent à l'œil, et l'élève
// conclut sans avoir rien démontré. Sans dessin, il ne reste que les données
// et leur position — c'est-à-dire exactement ce que le programme demande de
// travailler.
//
// ── Le piège central : l'angle mal placé ──────────────────────────────────
//
// « cas-degalite-invoque-sans-verifier ». Trois informations dans chaque
// triangle, et pourtant rien de démontré : c'est le cas « deux côtés et un
// angle » quand l'angle n'est PAS celui compris entre les deux côtés. La
// confusion est logique — l'élève compte les données au lieu de les situer —
// et elle est indétectable au résultat, puisqu'il n'y a pas de résultat.
// Trois items l'attaquent, sous trois formes différentes : juger une
// affirmation, repérer la ligne fautive d'une démonstration, et distinguer
// les deux triangles quand l'angle est bien placé dans l'un mais pas l'autre.
//
// Deux items neutres, parce que deux motifs de surface menacent :
//   — « quand on me demande, c'est que ça ne marche pas » : l'item 2 est un
//     cas d'égalité parfaitement aligné, et la réponse est « oui » ;
//   — « on me demande toujours de juger » : l'item 5 donne l'égalité comme
//     une donnée et n'attend qu'un calcul d'angle.

export default {
  id: 'sf-10-4',
  titre: 'Utiliser les cas d\'égalité des triangles',
  attendus: [
    'Il utilise les cas d\'égalité des triangles pour démontrer.',
    'Il reconnaît des données qui ne permettent pas de conclure.',
  ],

  // On ne donne pas les trois cas : on fait passer une commande par téléphone,
  // et l'élève constate que deux commandes suffisent pendant que la troisième
  // laisse le choix. Les deux champs demandent la même chose — compter les
  // informations — et donnent le même nombre : c'est le point de l'activité.
  // Ce n'est donc pas la quantité d'informations qui décide.
  decouvrir: {
    titre: 'Trois informations, et pourtant',
    texte:
      'Léa décrit un triangle par téléphone à Tom, qui doit le refaire à '
      + 'l\'identique, sans le voir. Voici trois descriptions possibles, et ce '
      + 'que Tom obtient à chaque fois.',
    lignes: [
      {
        calcul: 'Description 1 : les trois côtés, 6 cm, 8 cm et 9 cm',
        resultat: 'Tom retrouve exactement le triangle de Léa',
      },
      {
        calcul: 'Description 2 : un côté de 7 cm, et les deux angles à ses extrémités, 50° et 60°',
        resultat: 'Tom retrouve exactement le triangle de Léa',
      },
      {
        calcul: 'Description 3 : deux côtés, 5 cm et 8 cm, et un angle de 30° — sans dire où il est',
        resultat: 'Tom obtient un triangle différent de celui de Léa',
      },
    ],
    question:
      'Compte les informations que Léa donne dans chaque description : combien '
      + 'y en a-t-il dans la première ? et dans la troisième ?',
    champs: [
      { id: 'a', etiquette: 'informations de la description 1 :', attendu: 3 },
      { id: 'b', etiquette: 'informations de la description 3 :', attendu: 3 },
    ],
    conclusion:
      'Trois informations dans les deux cas — et pourtant la première suffit, '
      + 'la troisième non. Ce n\'est donc pas la **quantité** d\'informations qui '
      + 'décide, c\'est **lesquelles**, et surtout **où elles sont placées**. Dans '
      + 'la description 3, Léa n\'a pas dit où se trouvait l\'angle de 30° : Tom l\'a '
      + 'mis ailleurs, et son triangle n\'est plus le même.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Triangles égaux',
      texte:
        'Deux triangles sont **égaux** quand leurs côtés sont deux à deux de '
        + '**même longueur** et leurs angles deux à deux de **même mesure**. '
        + 'Autrement dit : ils sont **superposables**.\n'
        + 'On passe de l\'un à l\'autre par une translation, une symétrie ou une '
        + 'rotation : la position change, la forme et la taille non.',
    },
    {
      type: 'propriete',
      titre: 'Les trois cas d\'égalité',
      texte:
        'Deux triangles sont égaux dans **chacun** de ces trois cas :\n'
        + '• leurs **trois côtés** sont deux à deux de même longueur ;\n'
        + '• un **côté** est de même longueur dans les deux, et les **deux angles '
        + 'adjacents** à ce côté sont égaux deux à deux ;\n'
        + '• **deux côtés** sont de même longueur deux à deux, et l\'angle '
        + '**compris entre eux** est le même.',
    },
    {
      type: 'remarque',
      titre: 'Où doit être l\'angle, exactement',
      texte:
        'L\'angle **compris entre** deux côtés est celui du **sommet où ces deux '
        + 'côtés se rejoignent**. Dans un triangle ABC, l\'angle compris entre '
        + '[AB] et [BC] est celui de sommet **B** — c\'est la lettre commune aux '
        + 'deux côtés.\n'
        + 'Deux côtés et un angle placé **ailleurs** ne démontrent rien : avec ces '
        + 'données, on peut construire deux triangles de formes différentes. '
        + 'Il n\'existe **aucun** cas d\'égalité « deux côtés et un angle n\'importe où ».',
    },
    {
      type: 'remarque',
      titre: 'Les angles, eux, se rattrapent',
      texte:
        'La somme des trois angles d\'un triangle vaut **180°**. Si l\'un des '
        + 'angles connus n\'est pas adjacent au côté donné, on peut donc le '
        + 'calculer et se ramener au deuxième cas.\n'
        + 'Une longueur, elle, ne se rattrape jamais : c\'est pourquoi trois angles '
        + 'égaux ne suffisent **pas** — un triangle deux fois plus grand a '
        + 'exactement les mêmes angles.',
    },
    {
      type: 'exemple',
      texte:
        'Dans ABC : AB = 5 cm, BC = 7 cm et l\'angle en B mesure 40°. Dans DEF : '
        + 'DE = 5 cm, EF = 7 cm et l\'angle en E mesure 40°. Dans les deux, '
        + 'l\'angle donné est celui du sommet où se rejoignent les deux côtés '
        + 'donnés : les triangles sont égaux (troisième cas).',
    },
  ],

  // La correction est un TEXTE MODÈLE de rédaction : en géométrie, ce qu'on
  // attend de l'élève n'est pas un nombre mais une phrase qui cite le cas et
  // vérifie ses conditions. Le contrôle porte donc sur le geste qui décide de
  // tout — nommer le sommet, puis les deux côtés qui en partent.
  methode: {
    titre: 'Démontrer que deux triangles sont égaux',
    enonce:
      'Dans RST : RS = 6 cm, ST = 9 cm et l\'angle en S mesure 55°. Dans KLM : '
      + 'KL = 6 cm, LM = 9 cm et l\'angle en L mesure 55°. Ces triangles sont-ils égaux ?',
    etapes: [
      {
        texte: 'Je liste ce que je connais : dans chaque triangle, deux côtés et un angle.',
        note: 'Trois informations de chaque côté — ça ne décide encore rien.',
      },
      {
        texte: 'Dans RST, les deux côtés connus sont [RS] et [ST] : ils se rejoignent au sommet S.',
        note: 'S est la lettre commune aux deux côtés. L\'angle compris entre eux est donc celui de S.',
      },
      {
        texte: 'Or c\'est justement l\'angle en S qui est donné : la condition est remplie.',
        note: 'Si on m\'avait donné l\'angle en R, elle ne le serait pas.',
      },
      {
        texte: 'Dans KLM, les deux côtés connus sont [KL] et [LM] : ils se rejoignent en L, et c\'est l\'angle en L qui est donné.',
        note: 'Même vérification, faite dans le second triangle aussi.',
      },
      {
        texte:
          'Les deux côtés se correspondent (6 cm et 6 cm, 9 cm et 9 cm) et l\'angle compris '
          + 'entre eux est le même (55°). Donc, d\'après le cas « deux côtés et l\'angle '
          + 'compris entre eux », les triangles RST et KLM sont égaux.',
        note: 'On cite le cas par son nom : c\'est lui qui porte la démonstration.',
      },
    ],
    controle:
      'Le contrôle : nomme le sommet de l\'angle donné, puis les deux côtés qui '
      + 'en partent. Si ce sont exactement les deux longueurs de l\'énoncé, '
      + 'l\'angle est bien compris entre elles. Sinon, le cas ne s\'applique pas — '
      + 'et trois informations n\'y changeront rien. Ici, avec l\'angle en R au '
      + 'lieu de l\'angle en S, [RS] serait donné mais pas [RT] : la démonstration '
      + 'tomberait à l\'eau.',
  },

  entrainement: [
    {
      // Le geste isolé, avant toute conclusion : situer l'angle par rapport aux
      // deux côtés donnés. Tant qu'il n'est pas automatique, aucun cas d'égalité
      // ne peut être invoqué sans risque.
      id: 'e-10-4-1', type: 'trous', palier: 1, piege: 'cas-degalite-invoque-sans-verifier',
      consigne:
        'Dans le triangle ABC, on connaît deux longueurs : AB = 8 cm et BC = 5 cm. '
        + 'On va donner en plus la mesure d\'un angle. Écris 1 si cet angle est '
        + 'compris entre les deux côtés connus, et 0 sinon.',
      enonce: '\\text{angle en } B \\, : \\, \\square \\qquad \\text{angle en } C \\, : \\, \\square',
      champs: [
        { id: 'a', etiquette: 'angle en B', attendu: 1 },
        { id: 'b', etiquette: 'angle en C', attendu: 0 },
      ],
      fausses: [],
    },
    {
      // Premier neutre : tout est aligné — les deux côtés se correspondent dans
      // l'ordre, et l'angle donné est bien celui compris entre eux, dans les deux
      // triangles. Un élève qui conclut sans rien vérifier tombe juste : le piège
      // ne joue pas. Sans cet item, « quand on me le demande, c'est que ça ne
      // marche pas » suffirait à réussir tous les autres.
      id: 'e-10-4-2', type: 'plausible', palier: 1, neutre: true, piege: 'cas-degalite-invoque-sans-verifier',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC : AB = 8 cm, BC = 5 cm, angle en B = 70°} \\quad '
        + '\\text{DEF : DE = 8 cm, EF = 5 cm, angle en E = 70°} \\quad '
        + '\\text{Donc ABC et DEF sont égaux.}',
      attendu: true,
      explication:
        'Dans ABC, [AB] et [BC] se rejoignent en B, et c\'est l\'angle en B qui est '
        + 'donné. Dans DEF, [DE] et [EF] se rejoignent en E, et c\'est l\'angle en E '
        + 'qui est donné. C\'est exactement le cas « deux côtés et l\'angle compris '
        + 'entre eux » : les triangles sont bien égaux.',
    },
    {
      id: 'e-10-4-3', type: 'calcul', palier: 1, piege: 'conservation-mal-attribuee',
      consigne:
        'Le triangle A′B′C′ est l\'image du triangle ABC par une translation. '
        + 'On sait que AB = 7,5 cm. Calcule A′B′, en cm.',
      enonce: 'A\'B\'',
      attendu: 7.5,
      fausses: [
        { valeur: 15, piege: 'conservation-mal-attribuee' },
        { valeur: 3.75, piege: 'conservation-mal-attribuee' },
      ],
    },
    {
      // Le piège central, en pleine lumière : les deux côtés donnés se rejoignent
      // en A, et c'est l'angle en B qu'on donne. Les données ne sont pas fausses,
      // elles sont mal placées — et elles laissent construire deux triangles de
      // formes différentes.
      id: 'e-10-4-4', type: 'plausible', palier: 2, piege: 'cas-degalite-invoque-sans-verifier',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC : AB = 9 cm, AC = 6 cm, angle en B = 35°} \\quad '
        + '\\text{DEF : DE = 9 cm, DF = 6 cm, angle en E = 35°} \\quad '
        + '\\text{Donc ABC et DEF sont égaux.}',
      attendu: false,
      explication:
        'Les deux côtés donnés, [AB] et [AC], se rejoignent au sommet **A** : '
        + 'l\'angle compris entre eux est celui de A, pas celui de B. Il n\'existe '
        + 'aucun cas d\'égalité « deux côtés et un angle n\'importe où » — avec ces '
        + 'données on peut construire deux triangles de formes différentes. Rien ne '
        + 'prouve donc que ABC et DEF sont égaux.',
    },
    {
      // Second neutre : l'égalité est DONNÉE dans la consigne, avec son cas. Il
      // n'y a plus rien à vérifier, seulement un angle à calculer — le piège ne
      // joue pas. Sans cet item, « on me demande toujours de juger si c'est
      // valable » deviendrait le seul réflexe, et une question qui part d'une
      // égalité déjà démontrée bloquerait.
      id: 'e-10-4-5', type: 'calcul', palier: 2, neutre: true, piege: 'cas-degalite-invoque-sans-verifier',
      consigne:
        'Dans ABC : BC = 6 cm, l\'angle en B mesure 45° et l\'angle en C mesure 65°. '
        + 'Dans DEF : EF = 6 cm, l\'angle en E mesure 45° et l\'angle en F mesure 65°. '
        + 'Ces triangles sont donc égaux, d\'après le cas « un côté et les deux angles '
        + 'adjacents ». Calcule la mesure de l\'angle en D, en degrés.',
      enonce: '\\text{angle en } D',
      attendu: 70,
      fausses: [],
    },
    {
      // La variante la plus retorse : l'angle est bien placé dans le premier
      // triangle et mal placé dans le second. Vérifier un seul des deux ne suffit
      // donc pas — il faut faire le tour des deux énoncés.
      id: 'e-10-4-6', type: 'plausible', palier: 2, piege: 'cas-degalite-invoque-sans-verifier',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC : AB = 7 cm, BC = 4 cm, angle en B = 110°} \\quad '
        + '\\text{DEF : DE = 7 cm, EF = 4 cm, angle en F = 110°} \\quad '
        + '\\text{Donc ABC et DEF sont égaux.}',
      attendu: false,
      explication:
        'Dans ABC, tout va bien : [AB] et [BC] se rejoignent en B, donc l\'angle de '
        + '110° est bien compris entre les deux côtés donnés. Dans DEF, les deux '
        + 'côtés donnés se rejoignent en **E** — c\'est l\'angle en E qu\'il aurait '
        + 'fallu connaître, pas celui en F. Les deux triangles ne sont pas décrits '
        + 'de la même façon : le cas ne s\'applique pas.',
    },
    {
      id: 'e-10-4-7', type: 'trous', palier: 2, piege: 'conservation-mal-attribuee',
      consigne:
        'Les triangles ABC et DEF sont égaux, de telle façon que AB = DE, BC = EF '
        + 'et CA = FD. On sait que AB = 12 cm, BC = 7 cm, CA = 9 cm, et que l\'angle '
        + 'en B mesure 48°. Complète.',
      enonce: 'EF = \\square \\text{ cm} \\qquad \\text{angle en } E = \\square \\text{ degrés}',
      champs: [
        { id: 'a', etiquette: 'EF, en cm', attendu: 7 },
        { id: 'b', etiquette: 'angle en E, en degrés', attendu: 48 },
      ],
      fausses: [
        { valeur: 12, piege: 'conservation-mal-attribuee' },
        { valeur: 9, piege: 'conservation-mal-attribuee' },
      ],
    },
    {
      // La troisième ligne dit elle-même où ça coince, et c'est pourtant la
      // quatrième qui est fausse : l'erreur n'est pas dans un calcul, elle est
      // dans le fait de conclure malgré ce qu'on vient d'écrire.
      id: 'e-10-4-8', type: 'corriger', palier: 3, piege: 'cas-degalite-invoque-sans-verifier',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{ABC et DEF : deux côtés et un angle}',
      lignes: [
        {
          texte:
            'Dans ABC : AB = 11 cm, BC = 6 cm et l\'angle en A mesure 25°. '
            + 'Dans DEF : DE = 11 cm, EF = 6 cm et l\'angle en D mesure 25°.',
          fausse: false,
        },
        { texte: 'Dans ABC, les deux côtés connus, [AB] et [BC], se rejoignent au sommet B.', fausse: false },
        { texte: 'L\'angle compris entre ces deux côtés est donc celui de sommet B.', fausse: false },
        {
          texte:
            'On connaît l\'angle en A dans les deux triangles, donc d\'après le cas '
            + '« deux côtés et l\'angle compris entre eux », ABC et DEF sont égaux.',
          fausse: true,
        },
      ],
      explication:
        'Les trois premières lignes sont justes, et la troisième dit même exactement '
        + 'ce qu\'il fallait : l\'angle utile est celui de B. C\'est la quatrième qui '
        + 'casse tout — elle invoque le cas avec l\'angle en A, qui n\'est pas compris '
        + 'entre [AB] et [BC]. Le cas ne s\'applique pas, et ces données ne démontrent '
        + 'rien. Il aurait fallu connaître l\'angle en B.',
    },
    {
      id: 'e-10-4-9', type: 'vraifaux', palier: 3, piege: 'cas-degalite-invoque-sans-verifier',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Deux triangles dont les angles sont égaux deux à deux sont forcément égaux.',
      attendu: false,
      contreExemple: {
        invite:
          'Le triangle ABC a pour côtés 3 cm, 4 cm et 5 cm. En multipliant ses trois '
          + 'longueurs par un même nombre, on obtient un triangle qui a exactement les '
          + 'mêmes angles. Par quel nombre faut-il multiplier pour qu\'il ne soit PAS '
          + 'égal à ABC ?',
        champs: [{ id: 'a', etiquette: 'le nombre par lequel multiplier' }],
        // On vérifie une propriété, pas une valeur : tout nombre strictement
        // positif et différent de 1 convient. Agrandir comme rétrécir réfute
        // l'affirmation, et l'élève peut choisir son échelle.
        valide: (a) => Number.isFinite(a) && a > 0 && a !== 1,
        temoin: [2],
        exemple:
          '2 convient : le triangle de côtés 6 cm, 8 cm et 10 cm a exactement les mêmes '
          + 'angles que celui de 3 cm, 4 cm et 5 cm, mais il est deux fois plus grand. '
          + 'Mêmes angles, et pourtant pas égaux.',
      },
    },
    {
      // Le cas est là, mais il faut le faire apparaître : l'angle en B ne se lit
      // nulle part, il se calcule. C'est l'item qui récompense la remarque du
      // cours sur les 180°.
      id: 'e-10-4-10', type: 'plausible', palier: 3, piege: 'cas-degalite-invoque-sans-verifier',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC : AB = 8 cm, angle en A = 30°, angle en C = 100°} \\quad '
        + '\\text{DEF : DE = 8 cm, angle en D = 30°, angle en E = 50°} \\quad '
        + '\\text{Donc ABC et DEF sont égaux.}',
      attendu: true,
      explication:
        'Au premier coup d\'œil les angles ne se correspondent pas — mais celui de B '
        + 'se calcule : 180 − 30 − 100 = 50°. Le côté [AB] a donc pour angles adjacents '
        + '30° en A et 50° en B, exactement comme [DE] a 30° en D et 50° en E. C\'est le '
        + 'cas « un côté et les deux angles adjacents » : les triangles sont bien égaux.',
    },
  ],

  problemes: [
    {
      id: 'p-10-4-1',
      enonce:
        'Un charpentier fabrique des fermes triangulaires toutes identiques. Sur le '
        + 'modèle, les trois barres mesurent 180 cm, 240 cm et 300 cm, et le plus '
        + 'grand angle mesure 90°. Il coupe les barres d\'une nouvelle ferme : '
        + '180 cm, 240 cm et 300 cm.',
      questions: [
        { texte: 'Combien de longueurs faut-il comparer dans chaque triangle pour appliquer le cas des trois côtés ?', attendu: 3 },
        { texte: 'Quel est le périmètre de la nouvelle ferme, en cm ?', attendu: 720, unite: 'cm' },
        { texte: 'Combien mesure le plus grand angle de la nouvelle ferme, en degrés ?', attendu: 90, unite: '°' },
      ],
    },
    {
      id: 'p-10-4-2',
      enonce:
        'Deux triangles de verre sont découpés pour un vitrail. Dans ABC : '
        + 'AB = 12 cm, BC = 16 cm et l\'angle en B mesure 90°. Dans DEF : DE = 12 cm, '
        + 'EF = 16 cm et l\'angle en E mesure 90°.',
      questions: [
        { texte: 'Dans ABC, l\'angle donné est-il compris entre les deux côtés donnés ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
        { texte: 'Les deux triangles sont-ils égaux ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
        { texte: 'Combien mesure DF, en cm ?', attendu: 20, unite: 'cm' },
      ],
    },
    {
      // Le problème où la donnée manquante coûte quelque chose : deux menuisiers,
      // la même notice, deux meubles différents.
      id: 'p-10-4-3',
      enonce:
        'Sur une notice de meuble, un triangle de renfort est décrit ainsi : « deux '
        + 'côtés de 30 cm et 50 cm, et un angle de 40° ». Deux menuisiers suivent la '
        + 'notice à la lettre et obtiennent pourtant deux triangles différents.',
      questions: [
        { texte: 'Combien d\'informations la notice donne-t-elle sur ce triangle ?', attendu: 3 },
        { texte: 'Le premier menuisier place l\'angle de 40° entre les deux côtés donnés. Quelle est alors la somme des deux autres angles de son triangle, en degrés ?', attendu: 140, unite: '°' },
      ],
    },
    {
      id: 'p-10-4-4',
      enonce:
        'Un carreleur pose des triangles de céramique tous obtenus les uns des autres '
        + 'par translation. Le premier a pour côtés 15 cm, 20 cm et 25 cm, et son plus '
        + 'grand angle mesure 90° : il est donc rectangle, les côtés de l\'angle droit '
        + 'étant ceux de 15 cm et 20 cm.',
      questions: [
        { texte: 'Quel est le périmètre d\'un autre triangle de la pose, en cm ?', attendu: 60, unite: 'cm' },
        { texte: 'Combien mesure son plus grand angle, en degrés ?', attendu: 90, unite: '°' },
        { texte: 'Quelle est son aire, en cm² ?', attendu: 150, unite: 'cm²' },
      ],
    },
    {
      id: 'p-10-4-5',
      enonce:
        'Un géomètre veut savoir si deux parcelles triangulaires sont identiques. '
        + 'Parcelle ABC : AB = 45 m, l\'angle en A mesure 62° et l\'angle en B mesure '
        + '71°. Parcelle DEF : DE = 45 m, l\'angle en D mesure 62° et l\'angle en E '
        + 'mesure 71°.',
      questions: [
        { texte: 'Combien mesure l\'angle en C, en degrés ?', attendu: 47, unite: '°' },
        { texte: 'Combien mesure l\'angle en F, en degrés ?', attendu: 47, unite: '°' },
        { texte: 'Les deux parcelles sont-elles identiques ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
      ],
    },
  ],

  test: [
    {
      id: 't-10-4-1', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{MNP : MN = 3 cm, NP = 8 cm, angle en N = 72°} \\quad '
        + '\\text{QRS : QR = 3 cm, RS = 8 cm, angle en R = 72°} \\quad '
        + '\\text{Donc MNP et QRS sont égaux.}',
      attendu: true,
      explication:
        'Les deux côtés donnés se rejoignent en N dans le premier triangle, en R dans '
        + 'le second — et c\'est justement là que l\'angle est donné. Cas « deux côtés '
        + 'et l\'angle compris entre eux » : les triangles sont égaux.',
      revoir: 'exemple',
    },
    {
      id: 't-10-4-2', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{GHI : GH = 10 cm, GI = 8 cm, angle en H = 28°} \\quad '
        + '\\text{JKL : JK = 10 cm, JL = 8 cm, angle en K = 28°} \\quad '
        + '\\text{Donc GHI et JKL sont égaux.}',
      attendu: false,
      explication:
        'Les deux côtés donnés, [GH] et [GI], se rejoignent en G : c\'est l\'angle en G '
        + 'qui devrait être connu, pas celui en H. Deux côtés et un angle mal placé ne '
        + 'démontrent rien — deux triangles de formes différentes conviennent.',
      piege: 'cas-degalite-invoque-sans-verifier',
      revoir: 'remarque',
    },
    {
      id: 't-10-4-3', type: 'trous',
      consigne:
        'Dans le triangle PQR, on connaît PQ = 9 cm et PR = 6 cm. Écris 1 si l\'angle '
        + 'indiqué est compris entre ces deux côtés, et 0 sinon.',
      enonce: '\\text{angle en } P \\, : \\, \\square \\qquad \\text{angle en } Q \\, : \\, \\square',
      champs: [
        { id: 'a', etiquette: 'angle en P', attendu: 1 },
        { id: 'b', etiquette: 'angle en Q', attendu: 0 },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-10-4-4', type: 'calcul',
      consigne:
        'Dans ABC, l\'angle en A mesure 38° et l\'angle en B mesure 84°. Le triangle '
        + 'DEF est égal à ABC, A correspondant à D, B à E et C à F. Calcule la mesure '
        + 'de l\'angle en F, en degrés.',
      enonce: '\\text{angle en } F',
      attendu: 58,
      revoir: 'propriete',
    },
    {
      id: 't-10-4-5', type: 'calcul',
      consigne:
        'Le triangle U′V′W′ est l\'image de UVW par une translation. Le triangle UVW '
        + 'a pour côtés 5 cm, 12 cm et 13 cm. Calcule le périmètre de U′V′W′, en cm.',
      enonce: '\\text{périmètre de } U\'V\'W\'',
      attendu: 30,
      fausses: [{ valeur: 60, piege: 'conservation-mal-attribuee' }],
      revoir: 'definition',
    },
    {
      id: 't-10-4-6', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC : AB = 5 cm, BC = 9 cm, CA = 11 cm} \\quad '
        + '\\text{DEF : DE = 9 cm, EF = 11 cm, FD = 5 cm} \\quad '
        + '\\text{Donc ABC et DEF sont égaux.}',
      attendu: true,
      explication:
        'Les trois longueurs sont les mêmes des deux côtés, seulement écrites dans un '
        + 'autre ordre : AB = FD = 5 cm, BC = DE = 9 cm et CA = EF = 11 cm. Le cas des '
        + 'trois côtés s\'applique, même si les lettres ne se suivent pas.',
      revoir: 'propriete',
    },
    {
      id: 't-10-4-7', type: 'corriger',
      consigne: 'Cette démonstration est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{ABC et DEF : les mêmes angles}',
      lignes: [
        { texte: 'Les trois angles de ABC mesurent 45°, 60° et 75°.', fausse: false },
        { texte: 'Les trois angles de DEF mesurent eux aussi 45°, 60° et 75°.', fausse: false },
        { texte: 'Les angles de ABC et de DEF sont donc égaux deux à deux.', fausse: false },
        { texte: 'Donc ABC et DEF sont égaux.', fausse: true },
      ],
      explication:
        'Tout est juste jusqu\'à la dernière ligne. Trois angles égaux ne suffisent '
        + 'pas : un triangle deux fois plus grand a exactement les mêmes angles. Aucun '
        + 'des trois cas d\'égalité ne se contente d\'angles — il faut au moins une '
        + 'longueur.',
      piege: 'cas-degalite-invoque-sans-verifier',
      revoir: 'remarque',
    },
    {
      id: 't-10-4-8', type: 'trous',
      consigne:
        'Les triangles ABC et DEF sont égaux, avec AB = DE, BC = EF et CA = FD. On '
        + 'sait que CA = 14 cm et que l\'angle en C mesure 31°. Complète.',
      enonce: 'FD = \\square \\text{ cm} \\qquad \\text{angle en } F = \\square \\text{ degrés}',
      champs: [
        { id: 'a', etiquette: 'FD, en cm', attendu: 14 },
        { id: 'b', etiquette: 'angle en F, en degrés', attendu: 31 },
      ],
      revoir: 'definition',
    },
    {
      id: 't-10-4-9', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{ABC : AB = 6 cm, BC = 10 cm} \\quad '
        + '\\text{DEF : DE = 6 cm, EF = 10 cm} \\quad '
        + '\\text{Donc ABC et DEF sont égaux.}',
      attendu: false,
      explication:
        'Deux longueurs ne font aucun des trois cas : il manque une information. Sans '
        + 'le troisième côté, ou sans l\'angle en B compris entre [AB] et [BC], on peut '
        + 'ouvrir ou refermer cet angle et obtenir des triangles très différents.',
      piege: 'cas-degalite-invoque-sans-verifier',
      revoir: 'propriete',
    },
    {
      id: 't-10-4-10', type: 'comparer',
      consigne: 'Les triangles ABC et DEF sont égaux. Compare ces deux nombres.',
      enonce: '\\text{périmètre de } ABC \\, \\ldots \\, \\text{périmètre de } DEF',
      attendu: '=',
      fausses: [{ valeur: '>', piege: 'conservation-mal-attribuee' }],
      revoir: 'definition',
    },
  ],
};
