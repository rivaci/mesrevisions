// Chapitre 1, savoir-faire 4 — Déterminer l'effet d'un agrandissement.
//
// C'est le piège le mieux documenté de tout le programme du collège. De Bock a
// mesuré plus de 90 % d'échec chez des élèves de cet âge sur la question « les
// longueurs sont multipliées par 3, par combien l'aire l'est-elle ? » — et,
// surtout, il a montré que l'erreur RÉSISTE à un enseignement qui se contente
// d'énoncer la règle. Répéter « aires × k² » ne suffit donc pas ; il faut que
// l'élève CONSTATE l'écart, et qu'il le constate sur un cas qu'il peut refaire.
//
// ── La découverte compare deux grandeurs de la MÊME figure ────────────────
//
// Le périmètre et l'aire d'un même carré, agrandi une seule fois. Le périmètre
// suit le coefficient, l'aire ne le suit pas. Mettre les deux côte à côte est
// ce qui rend l'écart visible : si on ne montrait que l'aire, l'élève
// retiendrait « quand on agrandit, on met un carré partout », ce qui est une
// deuxième erreur, aussi coûteuse que la première.
//
// ── Pourquoi les items neutres portent sur les longueurs ──────────────────
//
// Cette erreur symétrique — mettre k² là où k suffit — est exactement ce que
// produit un entraînement fait uniquement d'aires. Trois items neutres portent
// donc sur des longueurs : un côté, un périmètre (une somme de longueurs, donc
// une longueur, et l'endroit où l'on se trompe le plus), et un « plausible »
// vrai. Sans eux, « on me parle d'agrandissement, donc je mets un carré »
// traverserait le savoir-faire entier sans jamais être mis en défaut.
//
// ── Aucune figure n'est affichée ──────────────────────────────────────────
//
// Tout est décrit en toutes lettres : dimensions données, coefficient énoncé,
// grandeur demandée nommée. La contrainte tombe bien ici, parce que la seule
// question qui compte se pose sans dessin : longueur, aire ou volume ?

export default {
  id: 'sf-1-4',
  titre: 'Déterminer l\'effet d\'un agrandissement',
  attendus: [
    'Il comprend l\'effet d\'un agrandissement ou d\'une réduction sur les longueurs, les aires et les volumes.',
  ],

  // On ne dit pas « l'aire est multipliée par k² » : on fait calculer deux
  // grandeurs de la même figure agrandie une seule fois, et c'est l'élève qui
  // trouve deux coefficients différents là où il en attendait un seul.
  decouvrir: {
    titre: 'Le carré qui double, et l\'aire qui ne double pas',
    texte:
      'On part d\'un carré de 3 cm de côté. On l\'agrandit en multipliant '
      + 'toutes ses longueurs par 2 : chacun de ses côtés passe donc à 6 cm. '
      + 'Voici son périmètre et son aire, avant et après.',
    lignes: [
      { calcul: 'le périmètre du carré de côté 3 cm', resultat: '12 cm' },
      { calcul: 'le périmètre du carré de côté 6 cm', resultat: '24 cm' },
      { calcul: 'l\'aire du carré de côté 3 cm', resultat: '9 cm²' },
      { calcul: 'l\'aire du carré de côté 6 cm', resultat: '36 cm²' },
    ],
    question: 'Par combien le périmètre a-t-il été multiplié ? Et l\'aire ?',
    champs: [
      { id: 'a', etiquette: 'le périmètre a été multiplié par', attendu: 2 },
      { id: 'b', etiquette: 'l\'aire a été multipliée par', attendu: 4 },
    ],
    conclusion:
      'Le périmètre suit les côtés : il est multiplié par **2**, comme eux. '
      + 'L\'aire, elle, est multipliée par **4** — et 4, c\'est 2 × 2.\n'
      + 'Ce n\'est pas une bizarrerie : pour obtenir une aire, on multiplie '
      + '**deux** longueurs entre elles, et chacune des deux a été doublée. Le '
      + 'coefficient de l\'aire est donc **2 × 2**, et pas 2.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Agrandissement et réduction',
      texte:
        '**Agrandir** ou **réduire** une figure, c\'est en construire une '
        + 'nouvelle dont toutes les longueurs sont multipliées par un même '
        + 'nombre k, appelé le **coefficient**.\n'
        + 'Si k > 1, c\'est un agrandissement. Si k est compris entre 0 et 1, '
        + 'c\'est une réduction. Les angles, eux, ne changent pas : la forme '
        + 'est conservée.',
    },
    {
      type: 'propriete',
      titre: 'Effet sur les longueurs, les aires et les volumes',
      texte:
        'Quand toutes les longueurs sont multipliées par k :\n'
        + 'les **longueurs** (côtés, périmètres, hauteurs, diagonales) sont '
        + 'multipliées par **k** ;\n'
        + 'les **aires** sont multipliées par **k × k**, c\'est-à-dire k² ;\n'
        + 'les **volumes** sont multipliés par **k × k × k**, c\'est-à-dire k³.',
    },
    {
      // La justification, et non la formule : c'est elle qui se retrouve seule
      // en contrôle, quand le carré et le cube se sont mélangés.
      type: 'remarque',
      titre: 'Pourquoi un carré pour les aires, un cube pour les volumes',
      texte:
        'Compte les longueurs qu\'il faut multiplier pour obtenir la grandeur '
        + 'demandée. Une longueur, c\'est **une** longueur : le coefficient est '
        + 'k. Une aire, c\'est **deux** longueurs multipliées entre elles : '
        + 'chacune est multipliée par k, donc l\'aire l\'est par k × k. Un '
        + 'volume en demande **trois** : k × k × k.\n'
        + 'Un périmètre est une somme de longueurs, pas un produit : il suit '
        + 'donc k, comme les côtés.',
    },
    {
      type: 'remarque',
      titre: 'Une réduction rétrécit encore plus vite',
      texte:
        'La règle ne change pas quand k est plus petit que 1, mais l\'effet '
        + 'surprend : avec k = 0,5, les aires sont multipliées par '
        + '0,5 × 0,5 = 0,25, donc **divisées par 4**. Diviser les longueurs par '
        + 'deux divise l\'aire par quatre, et le volume par huit.',
    },
    {
      type: 'exemple',
      texte:
        'Un rectangle de 2 cm sur 7 cm a une aire de 14 cm². En multipliant '
        + 'toutes ses longueurs par 3, il devient un rectangle de 6 cm sur '
        + '21 cm, dont l\'aire vaut 126 cm² — soit bien 14 × 9.',
    },
  ],

  methode: {
    titre: 'Choisir le bon coefficient',
    enonce:
      'Un triangle a une aire de 6 cm². On l\'agrandit en multipliant toutes '
      + 'ses longueurs par 5. Quelle est l\'aire du triangle agrandi ?',
    etapes: [
      {
        texte: 'J\'écris le coefficient : toutes les longueurs sont multipliées par 5, donc k = 5.',
        note: 'C\'est la première chose à poser, avant tout calcul.',
      },
      {
        texte: 'Je regarde ce qu\'on me demande : une AIRE, pas une longueur.',
        note: 'C\'est cette question-là qui décide de tout le reste.',
      },
      {
        texte: 'Une aire est un produit de deux longueurs : son coefficient est donc 5 × 5 = 25.',
        note: 'Je ne récite pas « k² », je recompte les longueurs.',
      },
      {
        texte: 'L\'aire agrandie vaut 6 × 25 = 150 cm².',
        note: '',
      },
    ],
    controle:
      'Le contrôle : refais-le sur une figure facile, où tu peux tout '
      + 'recalculer. Un rectangle de 2 cm sur 3 cm a bien une aire de 6 cm². '
      + 'Agrandi, il mesure 10 cm sur 15 cm, donc son aire vaut 150 cm². Tu '
      + 'retombes sur le même nombre, sans avoir utilisé la règle : elle tient. '
      + 'Et avant chaque calcul, pose-toi la seule question qui compte — '
      + 'longueur, aire ou volume ?',
  },

  entrainement: [
    // ── Palier 1 : sur quelle grandeur porte la question ───────────────────
    {
      // NEUTRE. On demande une longueur : le coefficient est k, sans carré ni
      // cube, et le piège ne peut pas jouer. Sans cet item, « agrandissement,
      // donc je mets un carré » réussirait partout et deviendrait la règle —
      // l'erreur symétrique de celle qu'on combat, et tout aussi coûteuse.
      id: 'e-1-4-1', type: 'calcul', palier: 1, neutre: true, piege: 'aire-et-rapport-confondus',
      consigne: 'Toutes les longueurs d\'un triangle sont multipliées par 3. Calcule la nouvelle longueur de ce côté, en cm.',
      enonce: '\\text{un côté qui mesurait 8 cm}',
      attendu: 24,
      fausses: [],
    },
    {
      id: 'e-1-4-2', type: 'calcul', palier: 1, piege: 'aire-et-rapport-confondus',
      consigne: 'Toutes les longueurs d\'un triangle sont multipliées par 2. Calcule l\'aire du triangle agrandi, en cm².',
      enonce: '\\text{aire du triangle de départ : 15 cm²}',
      attendu: 60,
      fausses: [
        { valeur: 30, piege: 'aire-et-rapport-confondus' },
      ],
    },
    {
      id: 'e-1-4-3', type: 'trous', palier: 1, piege: 'aire-et-rapport-confondus',
      consigne: 'Toutes les longueurs d\'un solide sont multipliées par 5. Complète les deux coefficients.',
      enonce:
        '\\text{les aires sont multipliées par } \\square \\qquad '
        + '\\text{les volumes sont multipliés par } \\square',
      champs: [
        { id: 'a', etiquette: 'coefficient des aires', attendu: 25 },
        { id: 'b', etiquette: 'coefficient des volumes', attendu: 125 },
      ],
      fausses: [
        { valeur: 5, piege: 'aire-et-rapport-confondus' },
      ],
    },

    // ── Palier 2 : volumes, réductions, et la grandeur qu'on croit piégée ──
    {
      id: 'e-1-4-4', type: 'calcul', palier: 2, piege: 'aire-et-rapport-confondus',
      consigne: 'Toutes les longueurs d\'un solide sont multipliées par 3. Calcule le volume du solide agrandi, en cm³.',
      enonce: '\\text{volume du solide de départ : 4 cm³}',
      attendu: 108,
      fausses: [
        { valeur: 12, piege: 'aire-et-rapport-confondus' },
        { valeur: 36, piege: 'aire-et-rapport-confondus' },
      ],
    },
    {
      id: 'e-1-4-5', type: 'calcul', palier: 2, piege: 'aire-et-rapport-confondus',
      consigne: 'Toutes les longueurs d\'un rectangle sont multipliées par 0,5. Calcule l\'aire du rectangle réduit, en cm².',
      enonce: '\\text{aire du rectangle de départ : 48 cm²}',
      attendu: 12,
      fausses: [
        { valeur: 24, piege: 'aire-et-rapport-confondus' },
      ],
    },
    {
      // NEUTRE, et le plus important des trois : un périmètre RESSEMBLE à une
      // grandeur de surface parce qu'il décrit le tour d'une figure. C'est une
      // somme de longueurs, donc une longueur, et le coefficient reste k.
      id: 'e-1-4-6', type: 'calcul', palier: 2, neutre: true, piege: 'aire-et-rapport-confondus',
      consigne: 'Toutes les longueurs d\'un pentagone sont multipliées par 4. Calcule le périmètre du pentagone agrandi, en cm.',
      enonce: '\\text{périmètre du pentagone de départ : 26 cm}',
      attendu: 104,
      fausses: [],
    },
    {
      id: 'e-1-4-7', type: 'plausible', palier: 2, piege: 'aire-et-rapport-confondus',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Toutes les longueurs d\'une figure sont multipliées par 3. Son aire passe de 8 cm² à 24 cm².}',
      attendu: false,
      explication:
        'L\'aire a été multipliée par 3, comme les longueurs. Or il en faut '
        + 'deux pour faire une aire : le coefficient est 3 × 3 = 9, et l\'aire '
        + 'passe donc à 72 cm². Le résultat annoncé est trois fois trop petit.',
    },
    {
      // NEUTRE. Un « plausible » vrai, et sur une longueur : deux façons de
      // casser la stratégie de surface d'un coup. Sans lui, « on me demande si
      // c'est plausible, donc c'est faux » suffirait, et « agrandissement,
      // donc carré » aussi.
      id: 'e-1-4-8', type: 'plausible', palier: 2, neutre: true, piege: 'aire-et-rapport-confondus',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Toutes les longueurs d\'un triangle sont multipliées par 6. Son périmètre passe de 9 cm à 54 cm.}',
      attendu: true,
      explication:
        'Un périmètre est une somme de longueurs : il suit le coefficient sans '
        + 'carré. 9 × 6 = 54, le compte y est. Toutes les grandeurs d\'un '
        + 'agrandissement ne changent pas de la même façon, et celle-ci suit '
        + 'bien les côtés.',
    },

    // ── Palier 3 : relire un raisonnement, et le réfuter par un nombre ─────
    {
      id: 'e-1-4-9', type: 'corriger', palier: 3, piege: 'aire-et-rapport-confondus',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{Les droites (BC) et (DE) sont parallèles. A, B, D sont alignés dans cet ordre, ainsi que A, C, E.} '
        + '\\quad \\text{AB = 2 cm, AD = 8 cm, et le triangle ABC a une aire de 3 cm². Quelle est l\'aire du triangle ADE ?}',
      lignes: [
        { texte: 'Les longueurs du grand triangle sont celles du petit multipliées par 8 ÷ 2 = 4.', fausse: false },
        { texte: 'L\'aire est donc multipliée par 4 elle aussi.', fausse: true },
        { texte: 'L\'aire du triangle ADE vaut 3 × 4 = 12 cm².', fausse: false },
      ],
      explication:
        'La première ligne est juste : le coefficient vaut bien 4. Et la '
        + 'troisième calcule correctement à partir de la deuxième. C\'est la '
        + 'deuxième qui casse tout — une aire demande deux longueurs, donc son '
        + 'coefficient est 4 × 4 = 16. L\'aire du triangle ADE vaut '
        + '3 × 16 = 48 cm².',
    },
    {
      id: 'e-1-4-10', type: 'vraifaux', palier: 3, piege: 'aire-et-rapport-confondus',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Quand on agrandit une figure, son aire est multipliée par le même nombre que ses longueurs.',
      attendu: false,
      contreExemple: {
        // Le contre-exemple ne demande pas de réciter la règle : il demande de
        // CALCULER les deux aires. C'est le dispositif de De Bock, et c'est la
        // seule chose qui déloge la conception — deux nombres qu'on a obtenus
        // soi-même et qui ne sont pas dans le rapport annoncé.
        invite:
          'Prends un rectangle de 2 cm sur 5 cm et multiplie toutes ses '
          + 'longueurs par 4 : il devient un rectangle de 8 cm sur 20 cm. '
          + 'Donne l\'aire du rectangle de départ, puis celle du rectangle '
          + 'agrandi.',
        champs: [
          { id: 'a', etiquette: 'aire du rectangle de départ, en cm²' },
          { id: 'b', etiquette: 'aire du rectangle agrandi, en cm²' },
        ],
        valide: (a, b) => Math.abs(a - 10) < 1e-9 && Math.abs(b - 160) < 1e-9,
        temoin: [10, 160],
        exemple:
          'Le rectangle de départ a une aire de 2 × 5 = 10 cm². Le rectangle '
          + 'agrandi a une aire de 8 × 20 = 160 cm². Les longueurs ont été '
          + 'multipliées par 4, mais l\'aire par 16 — et 16, c\'est 4 × 4.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-1-4-1',
      enonce:
        'Une photo rectangulaire mesure 10 cm sur 15 cm. Un laboratoire en '
        + 'fait un agrandissement dont toutes les longueurs sont multipliées '
        + 'par 3.',
      questions: [
        { texte: 'Combien mesure le grand côté de l\'agrandissement ?', attendu: 45, unite: 'cm' },
        { texte: 'Quelle est l\'aire de la photo de départ ?', attendu: 150, unite: 'cm²' },
        { texte: 'Quelle est l\'aire de l\'agrandissement ?', attendu: 1350, unite: 'cm²' },
      ],
    },
    {
      // Le lien avec le reste du chapitre : dans des triangles emboîtés, le
      // grand triangle EST un agrandissement du petit, et le coefficient se
      // lit sur deux longueurs de l'énoncé.
      id: 'p-1-4-2',
      enonce:
        'Les droites (BC) et (DE) sont parallèles. A, B, D sont alignés dans '
        + 'cet ordre, ainsi que A, C, E. On donne AB = 3 cm et AD = 12 cm. Le '
        + 'triangle ABC a une aire de 5 cm².',
      questions: [
        { texte: 'Par combien faut-il multiplier les longueurs du triangle ABC pour obtenir celles du triangle ADE ?', attendu: 4 },
        { texte: 'Quelle est l\'aire du triangle ADE ?', attendu: 80, unite: 'cm²' },
      ],
    },
    {
      id: 'p-1-4-3',
      enonce:
        'Un cube en bois a 6 cm d\'arête. On en fabrique une réduction dont '
        + 'toutes les longueurs sont multipliées par 0,5.',
      questions: [
        { texte: 'Quelle est l\'arête du petit cube ?', attendu: 3, unite: 'cm' },
        { texte: 'Quel est le volume du grand cube ?', attendu: 216, unite: 'cm³' },
        { texte: 'Quel est le volume du petit cube ?', attendu: 27, unite: 'cm³' },
      ],
    },
    {
      id: 'p-1-4-4',
      enonce:
        'Il faut 8 cL de peinture pour couvrir une affiche. On refait la même '
        + 'affiche en multipliant toutes ses longueurs par 5, avec la même '
        + 'épaisseur de peinture : la quantité nécessaire est donc '
        + 'proportionnelle à l\'aire.',
      questions: [
        { texte: 'Par combien l\'aire de l\'affiche est-elle multipliée ?', attendu: 25 },
        { texte: 'Combien faut-il de peinture pour la grande affiche ?', attendu: 200, unite: 'cL' },
      ],
    },
    {
      id: 'p-1-4-5',
      enonce:
        'La maquette d\'une voiture est une réduction du modèle réel : toutes '
        + 'les longueurs de la maquette valent celles de la voiture divisées '
        + 'par 20. La voiture réelle mesure 440 cm de long, et son pare-brise a '
        + 'une aire de 8 000 cm².',
      questions: [
        { texte: 'Quelle est la longueur de la maquette ?', attendu: 22, unite: 'cm' },
        { texte: 'Quelle est l\'aire du pare-brise de la maquette ?', attendu: 20, unite: 'cm²' },
      ],
    },
  ],

  test: [
    {
      id: 't-1-4-1', type: 'calcul',
      consigne: 'Toutes les longueurs d\'un carré sont multipliées par 6. Calcule le côté du carré agrandi, en cm.',
      enonce: '\\text{côté du carré de départ : 5 cm}',
      attendu: 30,
      revoir: 'definition',
    },
    {
      id: 't-1-4-2', type: 'calcul',
      consigne: 'Toutes les longueurs d\'une figure sont multipliées par 4. Calcule l\'aire de la figure agrandie, en cm².',
      enonce: '\\text{aire de la figure de départ : 7 cm²}',
      attendu: 112,
      fausses: [{ valeur: 28, piege: 'aire-et-rapport-confondus' }],
      revoir: 'propriete',
    },
    {
      id: 't-1-4-3', type: 'trous',
      consigne: 'Toutes les longueurs d\'un solide sont multipliées par 10. Complète les deux coefficients.',
      enonce:
        '\\text{les aires sont multipliées par } \\square \\qquad '
        + '\\text{les volumes sont multipliés par } \\square',
      champs: [
        { id: 'a', etiquette: 'coefficient des aires', attendu: 100 },
        { id: 'b', etiquette: 'coefficient des volumes', attendu: 1000 },
      ],
      fausses: [{ valeur: 10, piege: 'aire-et-rapport-confondus' }],
      revoir: 'propriete',
    },
    {
      id: 't-1-4-4', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Toutes les longueurs d\'une figure sont multipliées par 5. Son aire passe de 3 cm² à 75 cm².}',
      attendu: true,
      explication:
        'Une aire demande deux longueurs : son coefficient est 5 × 5 = 25. Et '
        + '3 × 25 = 75. Le résultat tient.',
      revoir: 'propriete',
    },
    {
      id: 't-1-4-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Toutes les longueurs d\'un solide sont multipliées par 2. Son volume passe de 9 cm³ à 36 cm³.}',
      attendu: false,
      explication:
        'Le coefficient 4 est celui des aires, pas celui des volumes. Un '
        + 'volume demande trois longueurs : 2 × 2 × 2 = 8, donc le volume passe '
        + 'à 72 cm³.',
      piege: 'aire-et-rapport-confondus', revoir: 'propriete',
    },
    {
      id: 't-1-4-6', type: 'calcul',
      consigne: 'Toutes les longueurs d\'un panneau sont multipliées par 0,1. Calcule l\'aire du panneau réduit, en cm².',
      enonce: '\\text{aire du panneau de départ : 500 cm²}',
      attendu: 5,
      fausses: [{ valeur: 50, piege: 'aire-et-rapport-confondus' }],
      revoir: 'remarque',
    },
    {
      id: 't-1-4-7', type: 'calcul',
      consigne: 'Toutes les longueurs d\'un solide sont multipliées par 2. Calcule le volume du solide agrandi, en cm³.',
      enonce: '\\text{volume du solide de départ : 6 cm³}',
      attendu: 48,
      fausses: [
        { valeur: 12, piege: 'aire-et-rapport-confondus' },
        { valeur: 24, piege: 'aire-et-rapport-confondus' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-1-4-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{Toutes les longueurs d\'un panneau sont multipliées par 0,5. Son aire était de 20 cm².} '
        + '\\quad \\text{Quelle est l\'aire du panneau réduit ?}',
      lignes: [
        { texte: 'Le coefficient de la réduction est 0,5.', fausse: false },
        { texte: 'L\'aire est donc multipliée par 0,5 elle aussi.', fausse: true },
        { texte: 'L\'aire du panneau réduit vaut 20 × 0,5 = 10 cm².', fausse: false },
      ],
      explication:
        'La première ligne ne fait que relire l\'énoncé, et la troisième '
        + 'calcule correctement à partir de la deuxième. C\'est la deuxième qui '
        + 'casse : l\'aire est multipliée par 0,5 × 0,5 = 0,25, donc elle vaut '
        + '20 × 0,25 = 5 cm². Diviser les longueurs par deux divise l\'aire par '
        + 'quatre.',
      piege: 'aire-et-rapport-confondus', revoir: 'remarque',
    },
    {
      id: 't-1-4-9', type: 'calcul',
      consigne:
        'Les droites (BC) et (DE) sont parallèles. A, B, D sont alignés dans '
        + 'cet ordre, ainsi que A, C, E. Par combien faut-il multiplier les '
        + 'longueurs du triangle ABC pour obtenir celles du triangle ADE ?',
      enonce: '\\text{AB = 5 cm, AD = 20 cm}',
      attendu: 4,
      fausses: [{ valeur: 0.25, piege: 'rapports-mal-apparies' }],
      revoir: 'definition',
    },
    {
      id: 't-1-4-10', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{Toutes les longueurs d\'un quadrilatère sont multipliées par 7. Son périmètre passe de 6 cm à 42 cm.}',
      attendu: true,
      explication:
        'Un périmètre est une somme de longueurs : il suit le coefficient, '
        + 'sans carré. 6 × 7 = 42, tout est cohérent.',
      revoir: 'remarque',
    },
  ],
};
