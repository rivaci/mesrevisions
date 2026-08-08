// Chapitre 3, savoir-faire 6 — Démontrer qu'un triangle n'est pas rectangle.
//
// Le geste est le même qu'au savoir-faire précédent : on calcule les deux
// membres séparément, puis on compare. Seule la conclusion change de sens.
// C'est justement ce qui le rend piégeux : l'élève apprend vite que « quand
// on me pose la question, c'est que ce n'est pas rectangle » — un motif de
// surface qui marche dans les manuels et qui échoue en contrôle.
//
// D'où le choix qui structure tout le fichier : PRESQUE LA MOITIÉ des triangles
// proposés SONT rectangles. Le seul moyen de répondre est de calculer.
//
// Note de rigueur : prouver qu'un triangle n'est PAS rectangle relève de la
// contraposée du théorème direct, pas de la réciproque. Le cours le dit
// honnêtement, tout en acceptant la formulation des manuels — l'élève ne doit
// pas être pénalisé pour la phrase que son professeur lui a fait apprendre.

export default {
  id: 'sf-3-6',
  titre: 'Démontrer qu\'un triangle n\'est pas rectangle',
  attendus: [
    'Il montre qu\'un triangle n\'est pas rectangle en utilisant la réciproque du théorème de Pythagore.',
    'Il caractérise le triangle rectangle par l\'égalité de Pythagore.',
  ],

  // On ne donne pas la règle : on montre deux triangles rectangles où les deux
  // nombres coïncident, puis un troisième où l'élève découvre lui-même qu'ils
  // ne coïncident pas. L'écart choisi est petit (81 contre 85) pour que
  // personne ne puisse trancher à l'œil.
  decouvrir: {
    titre: 'Quand les deux nombres ne tombent pas pareil',
    texte:
      'Voici trois triangles. Les deux premiers sont rectangles. Pour chacun, on '
      + 'compare deux nombres : le carré du plus grand côté, et la somme des carrés '
      + 'des deux autres.',
    lignes: [
      { calcul: 'côtés 6 ; 8 ; 10 → 10² et 6² + 8²', resultat: '100 et 100' },
      { calcul: 'côtés 9 ; 12 ; 15 → 15² et 9² + 12²', resultat: '225 et 225' },
      { calcul: 'côtés 6 ; 7 ; 9 → 9² et 6² + 7²', resultat: '? et ?' },
    ],
    question: 'Calcule les deux nombres du troisième triangle.',
    champs: [
      { id: 'a', etiquette: '9² =', attendu: 81 },
      { id: 'b', etiquette: '6² + 7² =', attendu: 85 },
    ],
    conclusion:
      'Chez les deux triangles rectangles, les deux nombres sont **égaux**. Chez le '
      + 'troisième, 81 et 85 sont **différents** : il n\'est donc pas rectangle. '
      + 'Un écart de 4, c\'est peu — mais un angle presque droit n\'est pas un angle droit.',
  },

  cours: [
    {
      type: 'theoreme',
      titre: 'Réciproque du théorème de Pythagore',
      texte:
        'Dans un triangle, si le carré du **plus grand côté** est **égal** à la somme '
        + 'des carrés des deux autres, alors ce triangle est **rectangle** — et son '
        + 'angle droit est celui qui est opposé au plus grand côté.',
    },
    {
      type: 'propriete',
      titre: 'Quand l\'égalité est fausse',
      texte:
        'Si le carré du plus grand côté n\'est **pas** égal à la somme des carrés des '
        + 'deux autres, alors le triangle **n\'est pas rectangle**.\n'
        + 'C\'est le théorème de Pythagore lu à l\'envers : un triangle rectangle vérifie '
        + 'toujours l\'égalité, donc un triangle qui ne la vérifie pas ne peut pas être '
        + 'rectangle. On appelle cela la **contraposée**.',
    },
    {
      type: 'remarque',
      titre: 'Deux calculs séparés, la comparaison ensuite',
      texte:
        'On ne part **jamais** de l\'égalité comme si elle était déjà vraie. On calcule '
        + 'd\'un côté le carré du plus grand côté, de l\'autre la somme des carrés, '
        + '**séparément** — et c\'est seulement à la fin qu\'on regarde si les deux '
        + 'nombres coïncident.',
    },
    {
      type: 'remarque',
      titre: 'Le plus grand côté, toujours',
      texte:
        'Si le triangle était rectangle, ce serait le **plus grand côté** qui jouerait '
        + 'le rôle de l\'hypoténuse. C\'est donc lui qu\'on met seul d\'un côté de la '
        + 'comparaison. Mettre un autre côté à sa place ne prouve rien du tout.',
    },
    {
      type: 'exemple',
      texte:
        'Côtés 6 cm, 7 cm et 9 cm : 9² = 81 et 6² + 7² = 36 + 49 = 85. '
        + 'Comme 81 ≠ 85, le triangle n\'est pas rectangle.',
    },
  ],

  methode: {
    titre: 'Rédiger qu\'un triangle n\'est pas rectangle',
    enonce: 'Le triangle MNP a pour côtés MN = 5 cm, NP = 8 cm et MP = 10 cm. Est-il rectangle ?',
    etapes: [
      {
        texte: 'Le plus grand côté est [MP], qui mesure 10 cm.',
        note: 'Si le triangle était rectangle, [MP] serait son hypoténuse.',
      },
      { texte: 'D\'un côté : MP² = 10² = 100.', note: '' },
      {
        texte: 'De l\'autre : MN² + NP² = 5² + 8² = 25 + 64 = 89.',
        note: 'Les deux calculs sont menés séparément, sans jamais écrire « = » entre eux.',
      },
      { texte: 'Or 100 ≠ 89.', note: '' },
      {
        texte: 'Donc, d\'après la contraposée du théorème de Pythagore, le triangle MNP n\'est pas rectangle.',
        note: 'Ton manuel écrit peut-être « d\'après la réciproque » : les deux sont acceptés.',
      },
    ],
    controle:
      'Le contrôle : vérifie que c\'est bien le PLUS GRAND côté que tu as mis seul. '
      + 'Avec un autre côté, la comparaison ne veut rien dire. Et si les deux nombres '
      + 'étaient tombés égaux, la conclusion s\'inverserait : le triangle serait '
      + 'rectangle, avec son angle droit en N.',
  },

  entrainement: [
    {
      id: 'e-3-6-1', type: 'calcul', palier: 1, piege: 'carre-pris-pour-double',
      consigne: 'Dans un triangle de côtés 6 cm, 7 cm et 9 cm, calcule le carré du plus grand côté.',
      enonce: '9^2', attendu: 81,
      fausses: [{ valeur: 18, piege: 'carre-pris-pour-double' }],
    },
    {
      id: 'e-3-6-2', type: 'calcul', palier: 1, piege: 'racine-linearisee',
      consigne: 'Même triangle : calcule la somme des carrés des deux autres côtés.',
      enonce: '6^2 + 7^2', attendu: 85,
      fausses: [
        { valeur: 169, piege: 'racine-linearisee' },
        { valeur: 26, piege: 'carre-pris-pour-double' },
      ],
    },
    {
      id: 'e-3-6-3', type: 'comparer', palier: 1, piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres.',
      enonce: '9^2 \\ldots 6^2 + 7^2', attendu: '<',
      fausses: [{ valeur: '=', piege: 'reciproque-confondue' }],
    },
    {
      id: 'e-3-6-4', type: 'comparer', palier: 2, piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres. Ce sont ceux d\'un triangle de côtés 5 cm, 8 cm et 10 cm.',
      enonce: '10^2 \\ldots 5^2 + 8^2', attendu: '>',
      fausses: [{ valeur: '=', piege: 'reciproque-confondue' }],
    },
    {
      // Item neutre : ce triangle-là EST rectangle, donc les deux nombres sont
      // égaux. Sans lui, « on me demande de comparer, donc ce sera différent »
      // suffirait à réussir toute la série sans jamais calculer.
      id: 'e-3-6-5', type: 'comparer', palier: 2, neutre: true, piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres. Ce sont ceux d\'un triangle de côtés 9 cm, 12 cm et 15 cm.',
      enonce: '15^2 \\ldots 9^2 + 12^2', attendu: '=',
      fausses: [{ valeur: '>', piege: 'reciproque-confondue' }],
    },
    {
      // 8 ; 15 ; 16 ressemble à s'y méprendre au triangle 8 ; 15 ; 17, qui est
      // rectangle. Un élève qui reconnaît le « triplet connu » sans calculer
      // tombe dedans.
      id: 'e-3-6-6', type: 'trous', palier: 2, piege: 'carre-pris-pour-double',
      consigne: 'Le triangle ABC a pour côtés AB = 8 cm, AC = 15 cm et BC = 16 cm. Complète les deux membres.',
      enonce: '16^2 = \\square \\quad ; \\quad 8^2 + 15^2 = \\square',
      champs: [
        { id: 'a', attendu: 256 },
        { id: 'b', attendu: 289 },
      ],
      fausses: [
        { valeur: 32, piege: 'carre-pris-pour-double' },
        { valeur: 46, piege: 'carre-pris-pour-double' },
      ],
    },
    {
      id: 'e-3-6-7', type: 'plausible', palier: 2, piege: 'racine-linearisee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{côtés } 5 \\text{ ; } 6 \\text{ ; } 9 \\quad : \\quad 9^2 = 81 \\text{ et } 5^2 + 6^2 = 121',
      attendu: false,
      explication:
        '5² + 6² vaut 25 + 36 = 61, pas 121. Le nombre 121, c\'est (5 + 6)² : '
        + 'le carré a été pris sur la somme au lieu d\'être pris sur chaque côté. '
        + 'La conclusion reste la même ici, mais le calcul est faux.',
    },
    {
      // Item neutre du palier 3 : tout est juste. Sans lui, « on me demande si
      // c'est plausible, donc c'est faux » remplacerait la vérification.
      id: 'e-3-6-8', type: 'plausible', palier: 3, neutre: true, piege: 'racine-linearisee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{côtés } 7 \\text{ ; } 8 \\text{ ; } 11 \\quad : \\quad 11^2 = 121 \\text{ et } 7^2 + 8^2 = 113',
      attendu: true,
      explication:
        '11² = 121, et 7² + 8² = 49 + 64 = 113. Les deux calculs sont justes. '
        + 'Comme 121 ≠ 113, ce triangle n\'est effectivement pas rectangle.',
    },
    {
      // Le raisonnement est impeccable... à partir d'un plus grand côté mal
      // choisi. Et le vrai triangle, lui, EST rectangle : l'erreur de départ
      // renverse complètement la conclusion.
      id: 'e-3-6-9', type: 'corriger', palier: 3, piege: 'hypotenuse-mal-identifiee',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{DEF : } DE = 12 \\text{ cm, } EF = 5 \\text{ cm, } DF = 13 \\text{ cm}',
      lignes: [
        { texte: 'Le plus grand côté est [DE], qui mesure 12 cm.', fausse: true },
        { texte: 'D\'un côté : DE² = 12² = 144.', fausse: false },
        { texte: 'De l\'autre : EF² + DF² = 5² + 13² = 25 + 169 = 194.', fausse: false },
        { texte: 'Or 144 ≠ 194, donc le triangle DEF n\'est pas rectangle.', fausse: false },
      ],
      explication:
        'Tous les calculs sont exacts, mais ils partent du mauvais côté : le plus grand '
        + 'est [DF] (13 cm), pas [DE] (12 cm). Avec le bon : DF² = 169 et '
        + 'DE² + EF² = 144 + 25 = 169. Les deux nombres sont égaux — ce triangle EST '
        + 'rectangle, en E.',
    },
    {
      // Deuxième neutre : l'affirmation à démentir dit « n'est pas rectangle »,
      // et pourtant il l'est. Le réflexe « on me le demande, donc c'est vrai »
      // est exactement ce qu'on veut casser.
      id: 'e-3-6-10', type: 'vraifaux', palier: 3, neutre: true, piege: 'reciproque-confondue',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Un triangle dont les côtés mesurent 6 cm, 8 cm et 10 cm n\'est pas rectangle.',
      attendu: false,
      contreExemple: {
        invite: 'Calcule les deux membres pour le montrer.',
        champs: [
          { id: 'a', etiquette: '10² =' },
          { id: 'b', etiquette: '6² + 8² =' },
        ],
        valide: (a, b) => a === 100 && b === 100,
        exemple:
          '10² = 100 et 6² + 8² = 36 + 64 = 100. Les deux sont égaux, donc le triangle '
          + 'est rectangle — l\'angle droit est opposé au côté de 10 cm.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-3-6-1',
      enonce:
        'Un menuisier assemble un cadre. Il mesure deux côtés qu\'il croit '
        + 'perpendiculaires, 30 cm et 40 cm, puis la diagonale du cadre : 51 cm.',
      questions: [
        { texte: 'Quel est le carré de la diagonale mesurée ?', attendu: 2601, unite: 'cm²' },
        { texte: 'Quelle est la somme des carrés des deux autres côtés ?', attendu: 2500, unite: 'cm²' },
        { texte: 'Le cadre est-il d\'équerre ? Réponds 1 pour oui, 0 pour non.', attendu: 0 },
      ],
    },
    {
      id: 'p-3-6-2',
      enonce:
        'Un jardinier veut vérifier qu\'un coin de sa parcelle forme un angle droit. '
        + 'Il plante trois piquets et mesure les trois distances entre eux : 9 m, 12 m '
        + 'et 15 m.',
      questions: [
        { texte: 'Quel est le carré de la plus grande distance ?', attendu: 225, unite: 'm²' },
        { texte: 'Quelle est la somme des carrés des deux autres ?', attendu: 225, unite: 'm²' },
        { texte: 'Le coin est-il droit ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
      ],
    },
    {
      id: 'p-3-6-3',
      enonce:
        'Anaïs découpe un triangle en carton dont les côtés mesurent 12 cm, 16 cm et '
        + '21 cm. Elle affirme qu\'il est rectangle, parce qu\'il en a l\'air.',
      questions: [
        { texte: 'Quel est le carré du plus grand côté ?', attendu: 441, unite: 'cm²' },
        { texte: 'Quelle est la somme des carrés des deux autres ?', attendu: 400, unite: 'cm²' },
        { texte: 'Quelle longueur devrait avoir le plus grand côté pour que le triangle soit rectangle ?', attendu: 20, unite: 'cm' },
      ],
    },
    {
      id: 'p-3-6-4',
      enonce:
        'Une échelle de 5 m est appuyée contre un mur. Son pied est à 3 m du mur et '
        + 'son sommet touche le mur à 4 m du sol. On veut savoir si le mur est bien '
        + 'perpendiculaire au sol.',
      questions: [
        { texte: 'Quel est le carré de la longueur de l\'échelle ?', attendu: 25, unite: 'm²' },
        { texte: 'Quelle est la somme des carrés des deux autres longueurs ?', attendu: 25, unite: 'm²' },
        { texte: 'Le mur est-il perpendiculaire au sol ? Réponds 1 pour oui, 0 pour non.', attendu: 1 },
      ],
    },
    {
      id: 'p-3-6-5',
      enonce:
        'Trois bornes A, B et C sont plantées dans un champ. On mesure AB = 40 m, '
        + 'AC = 75 m et BC = 90 m. Un technicien affirme que l\'angle en A est droit.',
      questions: [
        { texte: 'Quelle est la somme des carrés de AB et AC ?', attendu: 7225, unite: 'm²' },
        { texte: 'Quel est le carré de BC ?', attendu: 8100, unite: 'm²' },
        { texte: 'Quelle distance BC rendrait l\'angle en A vraiment droit ?', attendu: 85, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-3-6-1', type: 'comparer', piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres.',
      enonce: '10^2 \\ldots 6^2 + 8^2', attendu: '=',
      fausses: [{ valeur: '>', piege: 'reciproque-confondue' }],
      revoir: 'theoreme',
    },
    {
      id: 't-3-6-2', type: 'comparer', piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres.',
      enonce: '9^2 \\ldots 4^2 + 8^2', attendu: '>',
      fausses: [{ valeur: '=', piege: 'reciproque-confondue' }],
      revoir: 'propriete',
    },
    {
      id: 't-3-6-3', type: 'calcul', piege: 'racine-linearisee',
      consigne: 'Calcule la somme des carrés.',
      enonce: '12^2 + 16^2', attendu: 400,
      fausses: [{ valeur: 784, piege: 'racine-linearisee' }],
      revoir: 'remarque',
    },
    {
      id: 't-3-6-4', type: 'comparer', piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres.',
      enonce: '21^2 \\ldots 12^2 + 16^2', attendu: '>',
      fausses: [{ valeur: '=', piege: 'reciproque-confondue' }],
      revoir: 'propriete',
    },
    {
      id: 't-3-6-5', type: 'comparer', piege: 'reciproque-confondue',
      consigne: 'Compare ces deux nombres.',
      enonce: '26^2 \\ldots 10^2 + 24^2', attendu: '=',
      fausses: [{ valeur: '<', piege: 'reciproque-confondue' }],
      revoir: 'theoreme',
    },
    {
      id: 't-3-6-6', type: 'trous', piege: 'carre-pris-pour-double',
      consigne: 'Le triangle a pour côtés 5 cm, 11 cm et 13 cm. Complète les deux membres.',
      enonce: '13^2 = \\square \\quad ; \\quad 5^2 + 11^2 = \\square',
      champs: [
        { id: 'a', attendu: 169 },
        { id: 'b', attendu: 146 },
      ],
      fausses: [{ valeur: 26, piege: 'carre-pris-pour-double' }],
      revoir: 'remarque',
    },
    {
      id: 't-3-6-7', type: 'plausible', piege: 'racine-linearisee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{côtés } 6 \\text{ ; } 8 \\text{ ; } 11 \\quad : \\quad 11^2 = 121 \\text{ et } 6^2 + 8^2 = 100',
      attendu: true,
      explication:
        '11² = 121 et 6² + 8² = 36 + 64 = 100. Les deux calculs sont justes, et comme '
        + '121 ≠ 100, le triangle n\'est pas rectangle.',
      revoir: 'exemple',
    },
    {
      id: 't-3-6-8', type: 'plausible', piege: 'racine-linearisee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{côtés } 3 \\text{ ; } 4 \\text{ ; } 6 \\quad : \\quad 6^2 = 36 \\text{ et } 3^2 + 4^2 = 49',
      attendu: false,
      explication:
        '3² + 4² vaut 9 + 16 = 25, pas 49. Le nombre 49, c\'est (3 + 4)² : le carré ne '
        + 'se distribue pas sur une somme.',
      revoir: 'remarque',
    },
    {
      id: 't-3-6-9', type: 'vraifaux', piege: 'reciproque-confondue',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Un triangle dont les côtés mesurent 8 cm, 15 cm et 17 cm n\'est pas rectangle.',
      attendu: false,
      contreExemple: {
        invite: 'Calcule les deux membres pour le montrer.',
        champs: [
          { id: 'a', etiquette: '17² =' },
          { id: 'b', etiquette: '8² + 15² =' },
        ],
        valide: (a, b) => a === 289 && b === 289,
        exemple: '17² = 289 et 8² + 15² = 64 + 225 = 289. Les deux sont égaux : le triangle est rectangle.',
      },
      revoir: 'theoreme',
    },
    {
      id: 't-3-6-10', type: 'vraifaux', piege: 'reciproque-confondue',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Un triangle dont les côtés mesurent 5 cm, 7 cm et 9 cm n\'est pas rectangle.',
      attendu: true,
      revoir: 'propriete',
    },
  ],
};
