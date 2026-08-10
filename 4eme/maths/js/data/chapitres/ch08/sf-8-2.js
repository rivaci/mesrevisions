// Savoir-faire 8-2 — Déterminer une médiane.
//
// Deux gestes, et rien d'autre :
//
//   1. RANGER avant de compter. « La valeur du milieu » ne veut rien dire tant
//      que la série n'est pas ordonnée — et c'est l'étape que les élèves
//      sautent, parce que l'énoncé leur donne déjà une liste qui a l'air d'un
//      rangement.
//   2. Regarder si l'effectif est pair. Les manuels s'en tirent souvent avec
//      des séries de 5, 7 ou 9 valeurs, et l'élève installe « la médiane, c'est
//      une valeur de la série » comme une règle. Elle tombe au premier effectif
//      pair rencontré en contrôle. Ici, la moitié des séries sont paires.
//
// Le programme borne l'effectif à 30 : toutes les séries sont donc données en
// extension, et se rangent à la main. Aucun tableau d'effectifs — c'est le
// savoir-faire d'après.

// Une série statistique s'écrit avec des points-virgules : c'est ce qui
// distingue « 12 ; 25 » de « 1 225 ». L'écrire à la main une trentaine de fois,
// c'est autant d'occasions d'oublier un séparateur — d'où ce raccourci, qui a
// surtout le mérite de laisser les valeurs lisibles d'un coup d'œil.
const serie = (...valeurs) => valeurs.join(' \\text{ ; } ');

export default {
  id: 'sf-8-2',
  titre: 'Déterminer une médiane',
  attendus: [
    'Il détermine la médiane d\'une série statistique d\'effectif au plus 30.',
  ],

  // On ne dit pas « il faut ranger » : on met face à face deux copies dont une
  // seule range, et on laisse l'élève constater que le résultat de Sacha est le
  // PLUS GRAND temps de tous — donc qu'il ne partage rien du tout. C'est le
  // constat qui donne son sens au rangement, pas la consigne.
  decouvrir: {
    titre: 'La valeur du milieu — mais du milieu de quoi ?',
    texte:
      'Sept élèves ont noté le temps, en minutes, qu\'ils mettent pour venir '
      + 'au collège :\n'
      + '12 ; 25 ; 8 ; 30 ; 14 ; 10 ; 18.\n'
      + 'On cherche le temps « du milieu ». Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: 'Il y a 7 temps, je prends le 4e de la liste', resultat: '30 min' },
      {
        nom: 'Inès',
        calcul: 'Je range d\'abord : 8 ; 10 ; 12 ; 14 ; 18 ; 25 ; 30, puis je prends le 4e',
        resultat: '14 min',
      },
    ],
    question: 'Range toi-même les sept temps, puis réponds.',
    champs: [
      { id: 'a', etiquette: 'le 4e temps de la série rangée =', attendu: 14 },
      { id: 'b', etiquette: 'combien de temps sont plus petits que lui ?', attendu: 3 },
    ],
    conclusion:
      'C\'est **Inès**. Le 4e temps de la série rangée est **14 min**, et il a '
      + '**3** temps en dessous de lui et **3** au-dessus : il coupe la série en '
      + 'deux groupes de même taille. Le 30 min de Sacha, lui, est le plus grand '
      + 'temps de tous — il ne coupe rien. **On range avant de chercher le '
      + 'milieu**, sinon « le milieu » ne désigne rien.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Médiane d\'une série',
      texte:
        'On range d\'abord toutes les valeurs de la série dans l\'**ordre '
        + 'croissant**.\n'
        + 'La **médiane** est une valeur qui partage la série rangée en **deux '
        + 'groupes de même effectif** : autant de valeurs en dessous d\'elle '
        + 'qu\'au-dessus.',
    },
    {
      type: 'propriete',
      titre: 'Effectif impair : une valeur de la série',
      texte:
        'Si l\'effectif est **impair**, une valeur se trouve exactement au '
        + 'milieu : c\'est elle, la médiane.\n'
        + 'Pour 7 valeurs, c\'est la 4e ; pour 9 valeurs, la 5e ; pour 11 '
        + 'valeurs, la 6e.',
    },
    {
      // La moitié du savoir-faire tient dans ce bloc, et c'est celle que les
      // séries de manuel escamotent en ne proposant que des effectifs impairs.
      type: 'propriete',
      titre: 'Effectif pair : la moyenne des deux valeurs du milieu',
      texte:
        'Si l\'effectif est **pair**, aucune valeur n\'est seule au milieu : il '
        + 'y en a **deux**. La médiane est alors leur **moyenne**.\n'
        + 'Pour 8 valeurs, c\'est la moyenne de la 4e et de la 5e ; pour 10 '
        + 'valeurs, celle de la 5e et de la 6e.',
    },
    {
      type: 'remarque',
      titre: 'La médiane n\'est pas la moyenne',
      texte:
        'La moyenne additionne toutes les valeurs et partage ; la médiane se '
        + 'contente de couper la série rangée en deux. Une seule valeur très '
        + 'grande fait bondir la moyenne et laisse la médiane presque immobile — '
        + 'c\'est pour ça qu\'on donne le **salaire médian** et non le salaire moyen.\n'
        + 'Quand l\'effectif est pair, la médiane peut d\'ailleurs **ne pas '
        + 'figurer dans la série**. Ce n\'est pas une erreur.',
    },
    {
      type: 'exemple',
      texte:
        'Série 7 ; 9 ; 12 ; 15 ; 20 → 5 valeurs, la médiane est la 3e : 12.\n'
        + 'Série 7 ; 9 ; 12 ; 15 → 4 valeurs, la médiane est (9 + 12) ÷ 2 = 10,5.',
    },
  ],

  // La méthode traite le cas le plus exposé : effectif pair ET série en
  // désordre. Le cas impair se lit dans l'exemple du cours ; celui-ci demande
  // les deux gestes à la suite, et c'est là que les erreurs se logent.
  methode: {
    titre: 'Déterminer une médiane quand l\'effectif est pair',
    enonce: 'Déterminer la médiane de la série : 13 ; 8 ; 21 ; 16 ; 5 ; 11 ; 19 ; 9 ; 24 ; 14.',
    etapes: [
      {
        texte: 'Je range dans l\'ordre croissant : 5 ; 8 ; 9 ; 11 ; 13 ; 14 ; 16 ; 19 ; 21 ; 24.',
        note: 'Rien ne commence avant ce rangement — pas même le comptage.',
      },
      {
        texte: 'Je compte les valeurs : il y en a 10.',
        note: '10 ÷ 2 = 5 tombe juste : l\'effectif est pair, il faudra donc deux valeurs.',
      },
      {
        texte: 'Les deux valeurs du milieu sont la 5e et la 6e, c\'est-à-dire 13 et 14.',
        note: 'Quatre valeurs avant elles, quatre valeurs après.',
      },
      {
        texte: 'La médiane est leur moyenne : (13 + 14) ÷ 2 = 13,5.',
        note: '13,5 ne figure pas dans la série, et c\'est normal.',
      },
    ],
    controle:
      'Le contrôle : compte les valeurs de part et d\'autre de ta médiane, il '
      + 'doit y en avoir autant des deux côtés. Ici 5 ; 8 ; 9 ; 11 ; 13 d\'un '
      + 'côté et 14 ; 16 ; 19 ; 21 ; 24 de l\'autre — cinq et cinq.',
  },

  entrainement: [
    {
      id: 'e-8-2-1', type: 'calcul', palier: 1, piege: 'mediane-sans-ranger',
      consigne: 'Détermine la médiane de cette série.',
      enonce: serie(14, 9, 19, 6, 17, 11, 8), attendu: 11,
      fausses: [
        // 6 est la 4e valeur de la liste telle qu'elle est écrite : c'est le
        // résultat exact de « je compte sans ranger ».
        { valeur: 6, piege: 'mediane-sans-ranger' },
        // 12 est la moyenne (84 ÷ 7) : l'autre confusion que porte ce piège.
        { valeur: 12, piege: 'mediane-sans-ranger' },
      ],
    },
    {
      id: 'e-8-2-2', type: 'calcul', palier: 1, piege: 'mediane-sans-ranger',
      consigne: 'Détermine la médiane de cette série.',
      enonce: serie(12, 7, 23, 15, 4, 10, 6, 13, 9), attendu: 10,
      fausses: [
        { valeur: 4, piege: 'mediane-sans-ranger' },
        { valeur: 11, piege: 'mediane-sans-ranger' },
      ],
    },
    {
      // Item neutre : la série est DÉJÀ rangée, donc le piège « chercher le
      // milieu sans ranger » ne peut pas jouer — les deux méthodes tombent sur
      // la même valeur. Et sa somme vaut 40, donc la moyenne aussi vaut 8 :
      // l'autre confusion que porte ce piège est neutralisée du même coup, sans
      // quoi l'item n'aurait été neutre qu'à moitié. Sans lui, ranger
      // deviendrait un rituel qu'on exécute sans savoir à quoi il sert. Aucune
      // erreur n'est prévisible ici, d'où une liste `fausses` vide.
      id: 'e-8-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'mediane-sans-ranger',
      consigne: 'Détermine la médiane de cette série, déjà rangée.',
      enonce: serie(3, 5, 8, 11, 13), attendu: 8,
      fausses: [],
    },
    {
      id: 'e-8-2-4', type: 'calcul', palier: 2, piege: 'mediane-effectif-pair',
      consigne: 'Détermine la médiane de cette série, déjà rangée.',
      enonce: serie(5, 7, 10, 12, 16, 18, 21, 25), attendu: 14,
      fausses: [
        // Les deux façons de n'en garder qu'une : la 4e seule, ou la 5e seule.
        { valeur: 12, piege: 'mediane-effectif-pair' },
        { valeur: 16, piege: 'mediane-effectif-pair' },
      ],
    },
    {
      id: 'e-8-2-5', type: 'calcul', palier: 2, piege: 'mediane-effectif-pair',
      consigne: 'Détermine la médiane de cette série.',
      enonce: serie(9, 14, 4, 20, 11, 6), attendu: 10,
      fausses: [
        { valeur: 9, piege: 'mediane-effectif-pair' },
        { valeur: 11, piege: 'mediane-effectif-pair' },
        // 12 est la moyenne des 3e et 4e valeurs de la liste NON rangée
        // (4 et 20) : les deux gestes ont été sautés l'un après l'autre.
        { valeur: 12, piege: 'mediane-sans-ranger' },
      ],
    },
    {
      id: 'e-8-2-6', type: 'calcul', palier: 2, piege: 'mediane-effectif-pair',
      consigne: 'Détermine la médiane de cette série.',
      enonce: serie(25, 18, 22, 16, 12, 30, 14, 28, 20, 15), attendu: 19,
      fausses: [
        { valeur: 18, piege: 'mediane-effectif-pair' },
        { valeur: 20, piege: 'mediane-effectif-pair' },
        { valeur: 21, piege: 'mediane-sans-ranger' },
      ],
    },
    {
      // On découpe le geste en deux : la somme des valeurs du milieu, puis la
      // médiane. C'est la seule façon de savoir OÙ ça a cassé — sur le repérage
      // des deux rangs, ou sur la moyenne elle-même.
      id: 'e-8-2-7', type: 'trous', palier: 2, piege: 'mediane-effectif-pair',
      consigne: 'Cette série est déjà rangée. Complète le calcul de sa médiane.',
      enonce: `${serie(2, 3, 5, 5, 7, 8, 9, 11, 12, 14, 16, 20)} \\qquad \\dfrac{\\square}{2} = \\square`,
      champs: [
        { id: 'a', etiquette: 'somme des deux valeurs du milieu', attendu: 17 },
        { id: 'b', etiquette: 'médiane', attendu: 8.5 },
      ],
      fausses: [
        // Ni 8 ni 9 n'est une réponse attendue ici : les voir apparaître dans
        // l'un des deux champs signe une valeur du milieu prise toute seule.
        { valeur: 8, piege: 'mediane-effectif-pair' },
        { valeur: 9, piege: 'mediane-effectif-pair' },
      ],
    },
    {
      id: 'e-8-2-8', type: 'plausible', palier: 3, piege: 'mediane-sans-ranger',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: `${serie(4, 6, 8, 9, 30)} \\qquad \\text{médiane} = 11{,}4`,
      attendu: false,
      explication:
        'La série compte 5 valeurs — un effectif **impair** — donc la médiane '
        + 'est l\'une d\'elles, la 3e : **8**. Le 11,4 proposé est la moyenne '
        + '(4 + 6 + 8 + 9 + 30 = 57, et 57 ÷ 5 = 11,4). La valeur extrême 30 '
        + 'tire la moyenne vers le haut ; la médiane, elle, ne bouge pas.',
    },
    {
      id: 'e-8-2-9', type: 'plausible', palier: 3, piege: 'mediane-effectif-pair',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: `${serie(2, 5, 6, 11)} \\qquad \\text{médiane} = 5{,}5`,
      attendu: true,
      explication:
        'L\'effectif est pair : la médiane est la moyenne de la 2e et de la 3e '
        + 'valeur, soit (5 + 6) ÷ 2 = 5,5. Qu\'elle ne figure pas dans la série '
        + 'ne la rend pas fausse — c\'est même ce qui arrive presque toujours '
        + 'quand l\'effectif est pair.',
    },
    {
      id: 'e-8-2-10', type: 'vraifaux', palier: 3, piege: 'mediane-effectif-pair',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'La médiane d\'une série est toujours l\'une des valeurs de la série.',
      attendu: false,
      contreExemple: {
        invite:
          'Donne deux nombres. On formera la série faite de ces deux valeurs '
          + 'seulement : trouve un cas où leur médiane n\'est ni l\'une ni l\'autre.',
        champs: [
          { id: 'a', etiquette: 'première valeur' },
          { id: 'b', etiquette: 'seconde valeur' },
        ],
        // On vérifie la PROPRIÉTÉ qui rend le contre-exemple valable : deux
        // valeurs distinctes suffisent, puisque leur moyenne tombe strictement
        // entre les deux et n'est donc aucune d'elles. L'élève choisit son
        // couple, on ne lui en impose pas un.
        valide: (a, b) => Number.isFinite(a) && Number.isFinite(b) && a !== b,
        temoin: [3, 8],
        exemple:
          'Avec la série 3 ; 8, la médiane vaut (3 + 8) ÷ 2 = 5,5 — et 5,5 ne '
          + 'figure pas dans la série.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-8-2-1',
      enonce:
        'Neuf élèves ont noté le temps, en minutes, qu\'ils mettent pour venir '
        + 'au collège : 12 ; 25 ; 8 ; 40 ; 15 ; 10 ; 20 ; 35 ; 18.',
      questions: [
        { texte: 'Quelle est la médiane de ces temps ?', attendu: 18, unite: 'min' },
        { texte: 'Combien d\'élèves mettent strictement moins de temps que cette médiane ?', attendu: 4, unite: 'élèves' },
      ],
    },
    {
      id: 'p-8-2-2',
      enonce:
        'Voici les dix notes obtenues à un contrôle : 6 ; 14 ; 9 ; 17 ; 11 ; '
        + '8 ; 15 ; 12 ; 10 ; 19.',
      questions: [
        { texte: 'Quelle est la médiane de ces notes ?', attendu: 11.5 },
        { texte: 'Combien d\'élèves ont une note strictement supérieure à la médiane ?', attendu: 5, unite: 'élèves' },
      ],
    },
    {
      id: 'p-8-2-3',
      enonce:
        'Le club de judo compte douze licenciés. Voici leurs âges : 11 ; 14 ; '
        + '9 ; 16 ; 12 ; 10 ; 13 ; 15 ; 11 ; 17 ; 12 ; 14.',
      questions: [
        { texte: 'Quelle est la médiane de ces âges ?', attendu: 12.5, unite: 'ans' },
        { texte: 'Un treizième licencié, âgé de 18 ans, s\'inscrit. Quelle est la médiane des treize âges ?', attendu: 13, unite: 'ans' },
      ],
    },
    {
      id: 'p-8-2-4',
      enonce:
        'Lors de ses sept premiers matchs, une équipe a marqué : 3 ; 1 ; 4 ; '
        + '0 ; 2 ; 5 ; 1 buts.',
      questions: [
        { texte: 'Quelle est la médiane de ces nombres de buts ?', attendu: 2, unite: 'buts' },
        { texte: 'Au huitième match, l\'équipe marque 6 buts. Quelle est la médiane des huit matchs ?', attendu: 2.5, unite: 'buts' },
      ],
    },
    {
      // Le problème qui justifie l'existence même de la médiane : un seul
      // salaire hors norme suffit à rendre la moyenne annoncée trompeuse.
      id: 'p-8-2-5',
      enonce:
        'Dans une petite entreprise, les neuf salaires mensuels, en euros, '
        + 'sont : 1 500 ; 1 600 ; 1 700 ; 1 800 ; 1 900 ; 2 000 ; 2 100 ; '
        + '2 200 ; 8 600. Le patron annonce « chez nous, le salaire moyen est '
        + 'de 2 600 € ».',
      questions: [
        { texte: 'Quelle est la médiane de ces salaires ?', attendu: 1900, unite: '€' },
        { texte: 'Combien de salariés gagnent moins que les 2 600 € annoncés ?', attendu: 8, unite: 'salariés' },
      ],
    },
  ],

  test: [
    {
      id: 't-8-2-1', type: 'calcul', consigne: 'Détermine la médiane de cette série.',
      enonce: serie(9, 3, 15, 6, 11), attendu: 9, revoir: 'definition',
    },
    {
      id: 't-8-2-2', type: 'calcul', consigne: 'Détermine la médiane de cette série.',
      enonce: serie(21, 14, 30, 17, 9, 25, 12), attendu: 17, revoir: 'propriete',
    },
    {
      id: 't-8-2-3', type: 'calcul', consigne: 'Détermine la médiane de cette série.',
      enonce: serie(8, 15, 3, 12, 6, 19), attendu: 10, revoir: 'propriete',
    },
    {
      id: 't-8-2-4', type: 'calcul', consigne: 'Détermine la médiane de cette série, déjà rangée.',
      enonce: serie(4, 7, 9, 13, 14, 18, 22, 27), attendu: 13.5, revoir: 'propriete',
    },
    {
      id: 't-8-2-5', type: 'calcul', consigne: 'Détermine la médiane de cette série.',
      enonce: serie(33, 27, 41, 19, 38, 24, 45, 30, 36), attendu: 33, revoir: 'propriete',
    },
    {
      id: 't-8-2-6', type: 'trous',
      consigne: 'Cette série est déjà rangée. Complète le calcul de sa médiane.',
      enonce: `${serie(2, 4, 5, 8, 9, 12, 14, 15, 18, 21)} \\qquad \\dfrac{\\square}{2} = \\square`,
      champs: [
        { id: 'a', etiquette: 'somme des deux valeurs du milieu', attendu: 21 },
        { id: 'b', etiquette: 'médiane', attendu: 10.5 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-8-2-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: `${serie(3, 5, 6, 8, 9, 11)} \\qquad \\text{médiane} = 6`,
      attendu: false,
      explication:
        'La série est rangée, mais elle compte 6 valeurs : l\'effectif est '
        + '**pair**. Le 6 proposé est la 3e valeur prise toute seule. Il faut la '
        + 'moyenne de la 3e et de la 4e : (6 + 8) ÷ 2 = 7.',
      piege: 'mediane-effectif-pair', revoir: 'propriete',
    },
    {
      id: 't-8-2-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: `${serie(2, 4, 7, 9, 10)} \\qquad \\text{médiane} = 7`,
      attendu: true,
      explication:
        'La série est rangée et compte 5 valeurs : l\'effectif est impair, donc '
        + 'la médiane est la 3e valeur. C\'est bien 7, avec deux valeurs en '
        + 'dessous et deux au-dessus.',
      revoir: 'exemple',
    },
    {
      id: 't-8-2-9', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: serie(10, 4, 7, 2, 9, 6),
      lignes: [
        { texte: 'Je range : 2 ; 4 ; 6 ; 7 ; 9 ; 10.', fausse: false },
        { texte: 'Il y a 6 valeurs, donc la médiane est la 3e.', fausse: true },
        { texte: 'La médiane vaut donc 6.', fausse: false },
      ],
      explication:
        'Le rangement de la première ligne est juste. C\'est à la deuxième que '
        + 'ça casse : 6 est un effectif **pair**, donc aucune valeur n\'est '
        + 'seule au milieu. Il faut la moyenne de la 3e et de la 4e, soit '
        + '(6 + 7) ÷ 2 = 6,5.',
      piege: 'mediane-effectif-pair', revoir: 'propriete',
    },
    {
      id: 't-8-2-10', type: 'calcul', consigne: 'Détermine la médiane de cette série, déjà rangée.',
      enonce: serie(6, 9, 14, 21), attendu: 11.5, revoir: 'remarque',
    },
  ],
};
