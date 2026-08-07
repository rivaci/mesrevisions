// Chapitre 1 — Opérations sur les nombres relatifs.
//
// Premier chapitre de l'année et premier chapitre écrit : c'est lui qui fixe
// le format de tous les autres.
//
// ── Le format, et pourquoi ────────────────────────────────────────────────
//
// L'unité n'est ni le chapitre ni le piège : c'est le SAVOIR-FAIRE, nommé par
// un verbe et un objet. C'est le découpage commun à Sésamath, iParcours et
// aux cahiers — 3 à 9 par chapitre, 120 pour tout le cycle 4. Un savoir-faire
// est ce qu'on écrit, ce qu'on suit dans le profil de l'élève, et ce qui porte
// les pièges.
//
// Chaque savoir-faire a six sections, dans l'ordre d'un vrai chapitre :
//
//   decouvrir     Une situation qui fait rencontrer la notion AVANT de la
//                 nommer. Jamais une leçon déguisée.
//   cours         Blocs typés : definition, propriete, remarque, exemple.
//                 Court — les manuels donnent 19 % de leurs pages au cours et
//                 44 % aux exercices.
//   methode       Un exercice résolu en deux colonnes. En géométrie la
//                 correction est un TEXTE MODÈLE de rédaction, pas un
//                 résultat ; ici elle montre le geste de contrôle.
//   entrainement  6 à 10 exercices gradués, à saisie réelle.
//   problemes     3 à 5 énoncés contextualisés.
//   test          Auto-évaluation, avec renvoi vers la partie du cours.
//
// ── Les réponses fausses portent le diagnostic ────────────────────────────
//
// L'élève TAPE sa réponse : produire un nombre n'est pas le même geste que
// reconnaître le bon parmi deux. Mais on ne renonce pas au diagnostic pour
// autant — chaque exercice liste les réponses fausses PRÉVISIBLES et le piège
// qui les produit. Taper −12 pour (−3) × (−4), c'est appliquer la règle des
// signes à l'envers ; taper 7, c'est avoir additionné. L'appli sait laquelle
// des deux confusions a joué, sans jamais avoir montré la mauvaise réponse.
//
// C'est le meilleur des deux mondes : la production du QCM en moins, le
// diagnostic du QCM en plus.

export default {
  numero: 1,
  titre: 'Opérations sur les nombres relatifs',
  theme: 'Nombres et calculs',
  trimestre: 1,
  programme: '2020',
  prerequis: [
    'Addition et soustraction des nombres relatifs (5e)',
    'Opposé d\'un nombre (5e)',
    'Priorités opératoires (6e et 5e)',
  ],

  savoirFaire: [
    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-1',
      titre: 'Multiplier deux nombres relatifs',
      attendus: [
        'Il calcule le produit de nombres décimaux relatifs.',
        'Il calcule mentalement : −7 × 3 ; −2,5 × (−4) ; 2,4 × (−0,5).',
      ],

      // On ne DIT pas la règle : on la fait apparaître comme la seule
      // prolongation cohérente d'une suite. C'est la seule justification
      // honnête du produit de deux négatifs (Glaeser) — aucun modèle concret
      // ne l'explique, et l'appli ne fera pas semblant du contraire.
      decouvrir: {
        titre: 'La suite qui ne peut finir que d\'une façon',
        texte:
          'Regarde cette suite de calculs. À chaque ligne, le premier facteur '
          + 'diminue de 1.',
        lignes: [
          { calcul: '3 × (−4)', resultat: '−12' },
          { calcul: '2 × (−4)', resultat: '−8' },
          { calcul: '1 × (−4)', resultat: '−4' },
          { calcul: '0 × (−4)', resultat: '0' },
        ],
        question: 'À chaque ligne, le résultat augmente de 4. Si on continue, que valent (−1) × (−4) puis (−2) × (−4) ?',
        champs: [
          { id: 'a', etiquette: '(−1) × (−4) =', attendu: 4 },
          { id: 'b', etiquette: '(−2) × (−4) =', attendu: 8 },
        ],
        conclusion:
          'Le produit de deux nombres négatifs est **positif**. Ce n\'est pas '
          + 'un caprice : c\'est la seule façon de prolonger la suite sans la casser.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Règle des signes',
          texte:
            'Le produit de deux nombres de **même signe** est **positif**.\n'
            + 'Le produit de deux nombres de **signes contraires** est **négatif**.',
        },
        {
          type: 'remarque',
          texte:
            'Pour multiplier, on procède en deux temps : on calcule d\'abord le '
            + 'produit des **distances à zéro** (les nombres sans leur signe), '
            + 'puis on détermine le signe.',
        },
        {
          // La remarque la plus importante du chapitre, et celle que les
          // manuels escamotent : dire honnêtement qu'il n'y a pas d'image.
          type: 'remarque',
          titre: 'Pourquoi « moins par moins fait plus » ne s\'explique pas',
          texte:
            'Les dettes et les gains expliquent bien l\'addition des relatifs, '
            + 'mais **pas** le produit de deux négatifs : personne ne sait ce que '
            + 'serait « −3 dettes de 4 € ». Il a fallu plus de mille ans aux '
            + 'mathématiciens pour l\'admettre. Cette règle se justifie par la '
            + '**cohérence du calcul**, comme dans l\'activité — pas par une image. '
            + 'Tu peux la mémoriser sans chercher à la « voir ».',
        },
        {
          type: 'exemple',
          texte: '(−7) × 3 = −21   ·   (−2,5) × (−4) = 10   ·   2,4 × (−0,5) = −1,2',
        },
      ],

      methode: {
        titre: 'Multiplier deux relatifs',
        enonce: 'Calculer A = (−2,5) × (−4).',
        etapes: [
          { texte: 'Les deux facteurs sont négatifs, donc de même signe.', note: 'Le signe du résultat sera positif.' },
          { texte: 'Je calcule le produit des distances à zéro : 2,5 × 4 = 10.', note: 'On oublie les signes le temps du calcul.' },
          { texte: 'Donc A = 10.', note: '' },
        ],
        controle:
          'Le contrôle : si tu hésites sur le signe, redescends la suite de '
          + 'l\'activité. Deux négatifs, c\'est positif.',
      },

      entrainement: [
        {
          id: 'e-1-1-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '(−7) \\times 3', attendu: -21,
          fausses: [
            { valeur: 21, piege: 'regle-des-signes-inversee' },
            { valeur: -4, piege: 'addition-au-lieu-du-produit' },
          ],
        },
        {
          id: 'e-1-1-2', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '(-3) \\times (-4)', attendu: 12,
          fausses: [
            { valeur: -12, piege: 'regle-des-signes-inversee' },
            { valeur: -7, piege: 'addition-au-lieu-du-produit' },
            { valeur: 7, piege: 'addition-au-lieu-du-produit' },
          ],
        },
        {
          // Item neutre du palier : un produit de deux positifs, où la règle
          // des signes ne joue pas. Sans lui, « il y a des parenthèses donc
          // le résultat est positif » suffirait à réussir.
          id: 'e-1-1-3', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '6 \\times 5', attendu: 30,
          fausses: [{ valeur: 11, piege: 'addition-au-lieu-du-produit' }],
        },
        {
          id: 'e-1-1-4', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '8 \\times (-5)', attendu: -40,
          fausses: [{ valeur: 40, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-1-5', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '(-2{,}5) \\times (-4)', attendu: 10,
          fausses: [
            { valeur: -10, piege: 'regle-des-signes-inversee' },
            { valeur: -6.5, piege: 'addition-au-lieu-du-produit' },
          ],
        },
        {
          id: 'e-1-1-6', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '2{,}4 \\times (-0{,}5)', attendu: -1.2,
          fausses: [
            { valeur: 1.2, piege: 'regle-des-signes-inversee' },
            { valeur: -12, piege: 'virgule-perdue' },
          ],
        },
        {
          // Multiplier par un nombre entre 0 et 1 DIMINUE : c'est un piège
          // documenté, indépendant des signes, et il tombe pile ici.
          id: 'e-1-1-7', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '(-6) \\times 0{,}5', attendu: -3,
          fausses: [
            { valeur: -12, piege: 'multiplier-agrandit-toujours' },
            { valeur: 3, piege: 'regle-des-signes-inversee' },
          ],
        },
        {
          id: 'e-1-1-8', type: 'trous', palier: 3,
          consigne: 'Complète pour que l\'égalité soit vraie.',
          enonce: '(-4) \\times \\square = -28',
          champs: [{ id: 'a', attendu: 7 }],
          fausses: [{ valeur: -7, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-1-9', type: 'trous', palier: 3,
          consigne: 'Complète pour que l\'égalité soit vraie.',
          enonce: '\\square \\times (-3) = 15',
          champs: [{ id: 'a', attendu: -5 }],
          fausses: [{ valeur: 5, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-1-10', type: 'vraifaux', palier: 3,
          consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
          affirmation: 'Le produit de deux nombres relatifs est toujours plus grand que chacun d\'eux.',
          attendu: false,
          contreExemple: {
            invite: 'Trouve deux nombres dont le produit est plus petit que les deux.',
            champs: [{ id: 'a', etiquette: 'premier nombre' }, { id: 'b', etiquette: 'second nombre' }],
            // Un contre-exemple est valide si le produit est inférieur aux
            // deux facteurs : on VÉRIFIE la propriété, on ne compare pas à une
            // réponse unique. L'élève peut être créatif.
            valide: (a, b) => a * b < a && a * b < b,
            exemple: '3 et (−2) : leur produit vaut −6, plus petit que les deux.',
          },
          piege: 'multiplier-agrandit-toujours',
        },
      ],

      problemes: [
        {
          id: 'p-1-1-1',
          enonce:
            'Un plongeur descend à la vitesse de 2 m par seconde. On note les '
            + 'profondeurs par des nombres négatifs.',
          questions: [
            { texte: 'Quelle est sa profondeur après 7 secondes ?', attendu: -14, unite: 'm' },
            { texte: 'Et après 25 secondes ?', attendu: -50, unite: 'm' },
          ],
        },
        {
          id: 'p-1-1-2',
          enonce:
            'La température baisse de 1,5 °C par heure. Il est 14 h et il fait 6 °C.',
          questions: [
            { texte: 'De combien la température aura-t-elle varié en 4 heures ?', attendu: -6, unite: '°C' },
            { texte: 'Quelle température fera-t-il à 18 h ?', attendu: 0, unite: '°C' },
          ],
        },
        {
          id: 'p-1-1-3',
          enonce:
            'Un compte est débité de 12,50 € chaque mois pour un abonnement. '
            + 'Le solde était de 80 € au départ.',
          questions: [
            { texte: 'Quelle est la variation du solde après 6 mois ?', attendu: -75, unite: '€' },
            { texte: 'Quel est le solde au bout de 6 mois ?', attendu: 5, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-1-1-1', type: 'calcul', enonce: '(-9) \\times 4', attendu: -36, revoir: 'propriete' },
        { id: 't-1-1-2', type: 'calcul', enonce: '(-5) \\times (-6)', attendu: 30, revoir: 'propriete' },
        { id: 't-1-1-3', type: 'calcul', enonce: '(-1{,}5) \\times 2', attendu: -3, revoir: 'exemple' },
        { id: 't-1-1-4', type: 'trous', enonce: '7 \\times \\square = -42', champs: [{ id: 'a', attendu: -6 }], revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-2',
      titre: 'Diviser deux nombres relatifs',
      attendus: ['Il calcule le quotient de nombres décimaux relatifs.'],

      decouvrir: {
        titre: 'Diviser, c\'est retrouver un facteur',
        texte:
          'On sait que (−4) × 3 = −12. La division pose la question inverse : '
          + '« par combien faut-il multiplier −4 pour obtenir −12 ? »',
        question: 'En utilisant l\'égalité ci-dessus, complète.',
        champs: [
          { id: 'a', etiquette: '(−12) ÷ (−4) =', attendu: 3 },
          { id: 'b', etiquette: '(−12) ÷ 3 =', attendu: -4 },
        ],
        conclusion:
          'La règle des signes de la division est **la même** que celle de la '
          + 'multiplication — forcément, puisque diviser revient à retrouver un facteur.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Règle des signes pour le quotient',
          texte:
            'Le quotient de deux nombres de **même signe** est **positif**.\n'
            + 'Le quotient de deux nombres de **signes contraires** est **négatif**.',
        },
        {
          type: 'remarque',
          texte: 'C\'est la même règle que pour le produit : il n\'y en a qu\'une à retenir.',
        },
        {
          type: 'exemple',
          texte: '(−63) ÷ (−7) = 9   ·   (−12,8) ÷ 2 = −6,4   ·   45 ÷ (−9) = −5',
        },
      ],

      methode: {
        titre: 'Diviser deux relatifs',
        enonce: 'Calculer B = (−12,8) ÷ 2.',
        etapes: [
          { texte: 'Les deux nombres sont de signes contraires.', note: 'Le résultat sera négatif.' },
          { texte: 'Je divise les distances à zéro : 12,8 ÷ 2 = 6,4.', note: '' },
          { texte: 'Donc B = −6,4.', note: '' },
        ],
        controle:
          'Le contrôle : multiplie ta réponse par le diviseur. Ici −6,4 × 2 = −12,8. '
          + 'Tu retombes sur le nombre de départ, donc c\'est juste.',
      },

      entrainement: [
        {
          id: 'e-1-2-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '(-63) \\div (-7)', attendu: 9,
          fausses: [{ valeur: -9, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-2-2', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '45 \\div (-9)', attendu: -5,
          fausses: [{ valeur: 5, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-2-3', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '56 \\div 8', attendu: 7,
          fausses: [],
        },
        {
          id: 'e-1-2-4', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '(-12{,}8) \\div 2', attendu: -6.4,
          fausses: [{ valeur: 6.4, piege: 'regle-des-signes-inversee' }],
        },
        {
          // Diviser par un nombre plus petit que 1 AGRANDIT — l'autre moitié
          // de la conception « diviser rend plus petit ».
          id: 'e-1-2-5', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '(-63) \\div (-0{,}7)', attendu: 90,
          fausses: [
            { valeur: -90, piege: 'regle-des-signes-inversee' },
            { valeur: 9, piege: 'diviser-diminue-toujours' },
          ],
        },
        {
          id: 'e-1-2-6', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '(-4{,}5) \\div (-0{,}5)', attendu: 9,
          fausses: [{ valeur: -9, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-2-7', type: 'trous', palier: 3,
          consigne: 'Complète pour que l\'égalité soit vraie.',
          enonce: '\\square \\div (-6) = -8',
          champs: [{ id: 'a', attendu: 48 }],
          fausses: [{ valeur: -48, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-2-8', type: 'vraifaux', palier: 3,
          consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
          affirmation: 'Diviser un nombre par un autre donne toujours un résultat plus petit que le premier.',
          attendu: false,
          contreExemple: {
            invite: 'Trouve deux nombres positifs dont le quotient dépasse le premier.',
            champs: [{ id: 'a', etiquette: 'nombre à diviser' }, { id: 'b', etiquette: 'diviseur' }],
            valide: (a, b) => b !== 0 && a > 0 && a / b > a,
            exemple: '6 divisé par 0,5 donne 12, qui est plus grand que 6.',
          },
          piege: 'diviser-diminue-toujours',
        },
      ],

      problemes: [
        {
          id: 'p-1-2-1',
          enonce:
            'Un sous-marin est descendu de 156 m en 12 minutes, à vitesse constante. '
            + 'On compte les descentes en nombres négatifs.',
          questions: [
            { texte: 'De combien de mètres descend-il chaque minute ?', attendu: -13, unite: 'm' },
          ],
        },
        {
          id: 'p-1-2-2',
          enonce:
            'En 5 heures, la température est passée de 8 °C à −7 °C, en baissant '
            + 'régulièrement.',
          questions: [
            { texte: 'Quelle est la variation totale de température ?', attendu: -15, unite: '°C' },
            { texte: 'De combien la température baisse-t-elle chaque heure ?', attendu: -3, unite: '°C' },
          ],
        },
        {
          id: 'p-1-2-3',
          enonce: 'Un compte affiche un solde de −84 € après 7 prélèvements identiques, en partant de 0 €.',
          questions: [
            { texte: 'Quel est le montant de chaque prélèvement ?', attendu: -12, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-1-2-1', type: 'calcul', enonce: '(-48) \\div 6', attendu: -8, revoir: 'propriete' },
        { id: 't-1-2-2', type: 'calcul', enonce: '(-35) \\div (-5)', attendu: 7, revoir: 'propriete' },
        { id: 't-1-2-3', type: 'calcul', enonce: '(-9) \\div (-0{,}5)', attendu: 18, revoir: 'exemple' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-3',
      titre: 'Déterminer le signe d\'un produit de plusieurs facteurs',
      attendus: ['Il détermine le signe d\'un produit de plusieurs facteurs relatifs.'],

      decouvrir: {
        titre: 'Compter les négatifs',
        texte: 'Calcule ces produits de tête, en avançant facteur par facteur.',
        lignes: [
          { calcul: '(−1) × (−1)', resultat: '1' },
          { calcul: '(−1) × (−1) × (−1)', resultat: '−1' },
          { calcul: '(−1) × (−1) × (−1) × (−1)', resultat: '1' },
        ],
        question: 'Que vaut un produit de cinq facteurs égaux à −1 ? Et de six ?',
        champs: [
          { id: 'a', etiquette: 'cinq facteurs (−1) :', attendu: -1 },
          { id: 'b', etiquette: 'six facteurs (−1) :', attendu: 1 },
        ],
        conclusion:
          'Ce n\'est pas le nombre de facteurs qui compte, c\'est le **nombre de '
          + 'facteurs négatifs**, et seulement sa parité : pair → positif, impair → négatif.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Signe d\'un produit',
          texte:
            'Un produit de facteurs non nuls est **positif** si le nombre de '
            + 'facteurs négatifs est **pair**, et **négatif** si ce nombre est **impair**.',
        },
        {
          type: 'remarque',
          texte:
            'Il suffit donc de **compter les facteurs négatifs** — inutile de '
            + 'calculer quoi que ce soit pour connaître le signe.',
        },
        {
          type: 'remarque',
          texte: 'Si l\'un des facteurs est nul, le produit est nul : il n\'a pas de signe à déterminer.',
        },
        {
          type: 'exemple',
          texte:
            '(−2) × 3 × (−5) : deux facteurs négatifs, nombre pair → le produit est positif (il vaut 30).',
        },
      ],

      methode: {
        titre: 'Déterminer un signe sans calculer',
        enonce: 'Sans le calculer, donner le signe de P = (−3) × 4 × (−2) × (−1).',
        etapes: [
          { texte: 'Je compte les facteurs négatifs : −3, −2 et −1, soit trois.', note: 'Le 4 est positif, il ne compte pas.' },
          { texte: 'Trois est un nombre impair.', note: '' },
          { texte: 'Donc P est négatif.', note: 'On le sait sans avoir fait une seule multiplication.' },
        ],
        controle: 'Le contrôle : calcule quand même une fois, pour vérifier. P = −24, bien négatif.',
      },

      entrainement: [
        {
          id: 'e-1-3-1', type: 'signe', palier: 1,
          consigne: 'Sans calculer, donne le signe de ce produit.',
          enonce: '(-2) \\times (-5)', attendu: 'positif',
          fausses: [{ valeur: 'négatif', piege: 'compte-les-facteurs-pas-les-negatifs' }],
        },
        {
          id: 'e-1-3-2', type: 'signe', palier: 1,
          consigne: 'Sans calculer, donne le signe de ce produit.',
          enonce: '(-3) \\times 4 \\times (-2) \\times (-1)', attendu: 'négatif',
          fausses: [{ valeur: 'positif', piege: 'compte-les-facteurs-pas-les-negatifs' }],
        },
        {
          // Neutre : que des facteurs positifs. Sans lui, « il y a des
          // parenthèses, donc je compte » deviendrait un réflexe aveugle.
          id: 'e-1-3-3', type: 'signe', palier: 1, neutre: true,
          consigne: 'Sans calculer, donne le signe de ce produit.',
          enonce: '2 \\times 7 \\times 3', attendu: 'positif', fausses: [],
        },
        {
          id: 'e-1-3-4', type: 'signe', palier: 2,
          consigne: 'Sans calculer, donne le signe de ce produit.',
          enonce: '(-1) \\times (-2) \\times (-3) \\times (-4) \\times (-5)', attendu: 'négatif',
          fausses: [{ valeur: 'positif', piege: 'compte-les-facteurs-pas-les-negatifs' }],
        },
        {
          // Le zéro : ni positif ni négatif. Item qui casse la stratégie
          // « je compte, je réponds » sans regarder les facteurs.
          id: 'e-1-3-5', type: 'signe', palier: 2, neutre: true,
          consigne: 'Sans calculer, donne le signe de ce produit.',
          enonce: '(-7) \\times 0 \\times (-3)', attendu: 'nul',
          fausses: [{ valeur: 'positif', piege: 'zero-oublie' }, { valeur: 'négatif', piege: 'zero-oublie' }],
        },
        {
          id: 'e-1-3-6', type: 'calcul', palier: 3,
          consigne: 'Calcule.', enonce: '(-2) \\times 3 \\times (-5)', attendu: 30,
          fausses: [{ valeur: -30, piege: 'compte-les-facteurs-pas-les-negatifs' }],
        },
        {
          id: 'e-1-3-7', type: 'calcul', palier: 3,
          consigne: 'Calcule.', enonce: '(-1) \\times (-4) \\times (-2{,}5)', attendu: -10,
          fausses: [{ valeur: 10, piege: 'compte-les-facteurs-pas-les-negatifs' }],
        },
        {
          id: 'e-1-3-8', type: 'vraifaux', palier: 3,
          consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
          affirmation: 'Un produit qui contient un facteur négatif est négatif.',
          attendu: false,
          contreExemple: {
            invite: 'Trouve deux nombres négatifs : leur produit contient bien des facteurs négatifs.',
            champs: [{ id: 'a', etiquette: 'premier facteur' }, { id: 'b', etiquette: 'second facteur' }],
            valide: (a, b) => a < 0 && b < 0,
            exemple: '(−2) × (−3) = 6, qui est positif.',
          },
          piege: 'un-negatif-suffit',
        },
      ],

      problemes: [
        {
          id: 'p-1-3-1',
          enonce:
            'Un jeu se joue avec des cartes qui multiplient le score. Léa a un score '
            + 'de 5 et tire successivement les cartes ×(−2), ×(−1) et ×3.',
          questions: [
            { texte: 'Quel est son score final ?', attendu: 30, unite: 'points' },
          ],
        },
        {
          id: 'p-1-3-2',
          enonce:
            'Sans faire un seul calcul, on veut connaître le signe du produit de tous '
            + 'les entiers de −5 à −1, c\'est-à-dire (−5) × (−4) × (−3) × (−2) × (−1).',
          questions: [
            { texte: 'Combien y a-t-il de facteurs négatifs ?', attendu: 5 },
          ],
        },
      ],

      test: [
        { id: 't-1-3-1', type: 'signe', enonce: '(-3) \\times (-8)', attendu: 'positif', revoir: 'propriete' },
        { id: 't-1-3-2', type: 'signe', enonce: '(-1) \\times 5 \\times (-2) \\times (-6)', attendu: 'négatif', revoir: 'propriete' },
        { id: 't-1-3-3', type: 'calcul', enonce: '(-2) \\times (-3) \\times (-4)', attendu: -24, revoir: 'exemple' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-4',
      titre: 'Enchaîner des opérations en respectant les priorités',
      attendus: [
        'Il effectue une suite de calculs avec des nombres relatifs en respectant les priorités opératoires.',
      ],

      decouvrir: {
        titre: 'Deux élèves, deux résultats',
        texte:
          'On demande de calculer 3 − 2 × (−4). Voici deux copies.',
        copies: [
          { nom: 'Sacha', calcul: '3 − 2 = 1, puis 1 × (−4) = −4', resultat: '−4' },
          { nom: 'Inès', calcul: '2 × (−4) = −8, puis 3 − (−8) = 11', resultat: '11' },
        ],
        question: 'Qui a raison ? Écris le résultat correct.',
        champs: [{ id: 'a', etiquette: '3 − 2 × (−4) =', attendu: 11 }],
        conclusion:
          'C\'est **Inès**. La multiplication passe avant la soustraction, quels '
          + 'que soient les signes. Sacha a calculé de gauche à droite, ce qui n\'est '
          + 'la bonne méthode que si les opérations ont la même priorité.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Ordre des priorités',
          texte:
            '1. Les calculs entre **parenthèses**.\n'
            + '2. Les **multiplications** et les **divisions**, de gauche à droite.\n'
            + '3. Les **additions** et les **soustractions**, de gauche à droite.',
        },
        {
          type: 'remarque',
          texte:
            'Les signes des nombres ne changent rien à l\'ordre des opérations. '
            + 'Un nombre négatif ne « passe » pas avant les autres.',
        },
        {
          type: 'remarque',
          titre: 'Attention aux deux sens du signe −',
          texte:
            'Dans 3 − 2, le signe − est une **opération**. Dans (−2), il fait partie '
            + 'du **nombre**. Repère lequel des deux tu as sous les yeux avant de calculer.',
        },
        {
          type: 'exemple',
          texte: '−5 + 3 × (−2) = −5 + (−6) = −11',
        },
      ],

      methode: {
        titre: 'Enchaîner sans se tromper',
        enonce: 'Calculer C = −4 + 6 ÷ (−3) × 2.',
        etapes: [
          { texte: 'Pas de parenthèses à calculer. Je traite division et multiplication, de gauche à droite.', note: '' },
          { texte: '6 ÷ (−3) = −2.', note: 'Signes contraires, donc négatif.' },
          { texte: '(−2) × 2 = −4.', note: '' },
          { texte: 'Il reste C = −4 + (−4) = −8.', note: 'Maintenant seulement, l\'addition.' },
        ],
        controle:
          'Le contrôle : réécris chaque étape en entier plutôt que de calculer de tête. '
          + 'La plupart des erreurs viennent d\'une étape sautée, pas d\'un calcul faux.',
      },

      entrainement: [
        {
          id: 'e-1-4-1', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '3 - 2 \\times (-4)', attendu: 11,
          fausses: [
            { valeur: -4, piege: 'calcul-de-gauche-a-droite' },
            { valeur: -5, piege: 'regle-des-signes-inversee' },
          ],
        },
        {
          id: 'e-1-4-2', type: 'calcul', palier: 1,
          consigne: 'Calcule.', enonce: '-5 + 3 \\times (-2)', attendu: -11,
          fausses: [
            { valeur: -4, piege: 'calcul-de-gauche-a-droite' },
            { valeur: 1, piege: 'regle-des-signes-inversee' },
          ],
        },
        {
          // Neutre : ici gauche-à-droite donne le bon résultat, parce que les
          // opérations ont la même priorité. Sans cet item, « il faut toujours
          // commencer par la fin » deviendrait la nouvelle règle fausse.
          id: 'e-1-4-3', type: 'calcul', palier: 1, neutre: true,
          consigne: 'Calcule.', enonce: '-8 + 5 - 3', attendu: -6, fausses: [],
        },
        {
          id: 'e-1-4-4', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '(-4) \\times (3 - 7)', attendu: 16,
          fausses: [
            { valeur: -16, piege: 'regle-des-signes-inversee' },
            { valeur: -19, piege: 'parenthese-ignoree' },
          ],
        },
        {
          id: 'e-1-4-5', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '-4 + 6 \\div (-3) \\times 2', attendu: -8,
          fausses: [
            { valeur: -3, piege: 'calcul-de-gauche-a-droite' },
            { valeur: 0, piege: 'regle-des-signes-inversee' },
          ],
        },
        {
          id: 'e-1-4-6', type: 'calcul', palier: 2,
          consigne: 'Calcule.', enonce: '10 - (-3) \\times (-2)', attendu: 4,
          fausses: [
            { valeur: 16, piege: 'regle-des-signes-inversee' },
            { valeur: 26, piege: 'calcul-de-gauche-a-droite' },
          ],
        },
        {
          id: 'e-1-4-7', type: 'corriger', palier: 3,
          consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
          enonce: '-2 + 4 \\times (-3)',
          lignes: [
            { texte: '−2 + 4 × (−3)', fausse: false },
            { texte: '= 2 × (−3)', fausse: true },
            { texte: '= −6', fausse: false },
          ],
          explication:
            'C\'est à la deuxième ligne que ça casse : −2 + 4 a été calculé en premier, '
            + 'alors que la multiplication est prioritaire. Le bon calcul est '
            + '−2 + (−12) = −14.',
          piege: 'calcul-de-gauche-a-droite',
        },
        {
          id: 'e-1-4-8', type: 'corriger', palier: 3,
          consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
          enonce: '5 - 3 \\times (-2)',
          lignes: [
            { texte: '5 − 3 × (−2)', fausse: false },
            { texte: '= 5 − (−6)', fausse: false },
            { texte: '= 5 − 6 = −1', fausse: true },
          ],
          explication:
            'Les deux premières lignes sont justes. L\'erreur est à la troisième : '
            + 'soustraire −6 revient à ajouter 6. Le résultat est 11.',
          piege: 'soustraire-un-negatif',
        },
        {
          id: 'e-1-4-9', type: 'calcul', palier: 3,
          consigne: 'Calcule.', enonce: '(-3) \\times (-2) - 8 \\div (-4)', attendu: 8,
          fausses: [
            { valeur: 4, piege: 'regle-des-signes-inversee' },
            { valeur: -2, piege: 'calcul-de-gauche-a-droite' },
          ],
        },
      ],

      problemes: [
        {
          id: 'p-1-4-1',
          enonce:
            'Un jeu attribue +5 points par bonne réponse et −3 points par erreur. '
            + 'Tom a donné 7 bonnes réponses et fait 4 erreurs.',
          questions: [
            { texte: 'Quel est son score ?', attendu: 23, unite: 'points' },
          ],
        },
        {
          id: 'p-1-4-2',
          enonce:
            'Un ascenseur part du 3e étage. Il descend de 5 étages, puis remonte '
            + 'de 2 étages, puis descend encore de 4 étages. Le rez-de-chaussée est l\'étage 0.',
          questions: [
            { texte: 'À quel étage arrive-t-il ?', attendu: -4 },
          ],
        },
        {
          id: 'p-1-4-3',
          enonce:
            'Une entreprise perd 1 200 € par mois pendant 3 mois, puis gagne 800 € '
            + 'par mois pendant 5 mois.',
          questions: [
            { texte: 'Quel est son résultat sur ces 8 mois ?', attendu: 400, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-1-4-1', type: 'calcul', enonce: '7 - 4 \\times (-2)', attendu: 15, revoir: 'propriete' },
        { id: 't-1-4-2', type: 'calcul', enonce: '(-6) \\times (2 - 5)', attendu: 18, revoir: 'propriete' },
        { id: 't-1-4-3', type: 'calcul', enonce: '-9 + 12 \\div (-4)', attendu: -12, revoir: 'exemple' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-1-5',
      titre: 'Contrôler un résultat par un ordre de grandeur',
      attendus: [
        'Il vérifie la vraisemblance d\'un résultat, notamment en estimant son ordre de grandeur.',
      ],

      // Ce savoir-faire est au programme, mais c'est surtout LE geste que la
      // charte veut installer : savoir si un résultat est plausible avant de
      // le rendre. Il clôt le chapitre pour cette raison.
      decouvrir: {
        titre: 'Repérer l\'absurde sans calculer',
        texte:
          'Une calculatrice affiche ces résultats. L\'un d\'eux est forcément faux, '
          + 'même sans refaire le calcul.',
        copies: [
          { nom: 'A', calcul: '(−19,8) × 4,1', resultat: '≈ −81' },
          { nom: 'B', calcul: '(−19,8) × 4,1', resultat: '≈ −8,1' },
          { nom: 'C', calcul: '(−19,8) × 4,1', resultat: '≈ 81' },
        ],
        question: 'Arrondis chaque facteur à l\'entier le plus proche, puis calcule ce produit approché.',
        champs: [{ id: 'a', etiquette: '(−20) × 4 =', attendu: -80 }],
        conclusion:
          'Seule la réponse **A** est plausible. B se trompe d\'un facteur 10, C se '
          + 'trompe de signe. Un ordre de grandeur ne donne pas le résultat, mais il '
          + 'élimine les résultats impossibles — et ça suffit souvent.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Ordre de grandeur',
          texte:
            'Un **ordre de grandeur** d\'un calcul est le résultat approché qu\'on '
            + 'obtient en remplaçant chaque nombre par une valeur proche et simple.',
        },
        {
          type: 'remarque',
          texte:
            'Il ne remplace pas le calcul : il sert à **vérifier** que le résultat '
            + 'trouvé est vraisemblable. C\'est un garde-fou, pas une méthode.',
        },
        {
          type: 'remarque',
          texte:
            'Deux erreurs qu\'un ordre de grandeur attrape presque toujours : une '
            + 'virgule mal placée, et un signe inversé.',
        },
        {
          type: 'exemple',
          texte:
            'Pour (−19,8) × 4,1 : on prend (−20) × 4 = −80. Le résultat exact, '
            + '−81,18, est bien proche de −80.',
        },
      ],

      methode: {
        titre: 'Vérifier avant de rendre',
        enonce: 'Un élève trouve (−48,6) ÷ 5,1 ≈ −95. Ce résultat est-il plausible ?',
        etapes: [
          { texte: 'J\'arrondis : (−50) ÷ 5.', note: 'Des nombres simples, calculables de tête.' },
          { texte: 'L\'ordre de grandeur est −10.', note: '' },
          { texte: '−95 est très loin de −10 : le résultat n\'est pas plausible.', note: 'Il s\'est probablement trompé d\'opération.' },
        ],
        controle:
          'Le contrôle : le signe d\'abord, la taille ensuite. Un résultat du bon '
          + 'signe mais dix fois trop grand vient presque toujours d\'une virgule.',
      },

      entrainement: [
        {
          id: 'e-1-5-1', type: 'calcul', palier: 1,
          consigne: 'Donne un ordre de grandeur en arrondissant chaque nombre à l\'entier le plus proche.',
          enonce: '(-19{,}8) \\times 4{,}1', attendu: -80,
          fausses: [{ valeur: 80, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-5-2', type: 'calcul', palier: 1,
          consigne: 'Donne un ordre de grandeur en arrondissant chaque nombre à l\'entier le plus proche.',
          enonce: '(-48{,}6) \\div 5{,}1', attendu: -10,
          fausses: [{ valeur: 10, piege: 'regle-des-signes-inversee' }],
        },
        {
          id: 'e-1-5-3', type: 'plausible', palier: 2,
          consigne: 'Ce résultat est-il plausible ?',
          enonce: '(-30{,}2) \\times 2{,}9 \\approx -87', attendu: true,
          explication: 'Ordre de grandeur : (−30) × 3 = −90. Le résultat en est proche.',
        },
        {
          id: 'e-1-5-4', type: 'plausible', palier: 2,
          consigne: 'Ce résultat est-il plausible ?',
          enonce: '(-7{,}9) \\times (-5{,}2) \\approx -41', attendu: false,
          explication:
            'L\'ordre de grandeur est (−8) × (−5) = 40, **positif**. Le résultat proposé '
            + 'est négatif : c\'est une erreur de signe.',
          piege: 'regle-des-signes-inversee',
        },
        {
          id: 'e-1-5-5', type: 'plausible', palier: 2,
          consigne: 'Ce résultat est-il plausible ?',
          enonce: '(-6{,}1) \\times 0{,}98 \\approx -60', attendu: false,
          explication:
            'L\'ordre de grandeur est (−6) × 1 = −6. Le résultat proposé est dix fois '
            + 'trop grand : une virgule s\'est perdue.',
          piege: 'virgule-perdue',
        },
        {
          // Neutre : un résultat plausible qui a l'air surprenant. Sans lui,
          // « on me demande si c'est plausible, donc c'est faux » suffirait.
          id: 'e-1-5-6', type: 'plausible', palier: 2, neutre: true,
          consigne: 'Ce résultat est-il plausible ?',
          enonce: '(-0{,}52) \\times (-0{,}48) \\approx 0{,}25', attendu: true,
          explication:
            'Ordre de grandeur : (−0,5) × (−0,5) = 0,25. Multiplier deux nombres '
            + 'plus petits que 1 donne bien un résultat encore plus petit.',
        },
        {
          id: 'e-1-5-7', type: 'calcul', palier: 3,
          consigne: 'Donne un ordre de grandeur de ce calcul.',
          enonce: '(-102) \\times 4{,}9 + 51', attendu: -450,
          fausses: [{ valeur: 450, piege: 'regle-des-signes-inversee' }],
        },
      ],

      problemes: [
        {
          id: 'p-1-5-1',
          enonce:
            'Un plongeur descend de 3,9 m par minute pendant 9,8 minutes. Sa montre '
            + 'affiche une profondeur de −38 m.',
          questions: [
            { texte: 'Donne un ordre de grandeur de la profondeur attendue.', attendu: -40, unite: 'm' },
          ],
        },
        {
          id: 'p-1-5-2',
          enonce:
            'Une facture indique 11 prélèvements de 19,90 € et affiche un total de '
            + '−2 189 €. Le comptable trouve ce total suspect.',
          questions: [
            { texte: 'Donne un ordre de grandeur du total attendu.', attendu: -200, unite: '€' },
          ],
        },
      ],

      test: [
        { id: 't-1-5-1', type: 'calcul', enonce: '(-9{,}8) \\times 5{,}2', attendu: -50, revoir: 'definition', consigne: 'Donne un ordre de grandeur.' },
        {
          id: 't-1-5-2', type: 'plausible', enonce: '(-4{,}1) \\times (-2{,}9) \\approx -12', attendu: false,
          explication:
            'L\'ordre de grandeur est (−4) × (−3) = 12, **positif** : deux facteurs '
            + 'négatifs. La taille est bonne, c\'est le signe qui ne l\'est pas.',
          piege: 'regle-des-signes-inversee', revoir: 'remarque',
        },
      ],
    },
  ],
};
