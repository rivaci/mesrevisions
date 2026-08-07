// Chapitre 2 — Divisibilité et nombres premiers.
//
// Deuxième chapitre écrit, donc premier test réel du format : est-ce qu'il se
// réplique sans se réinventer ? Le format tient, avec deux ajustements notés
// au passage.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Pas de PGCD, pas d'algorithme d'Euclide, pas de fraction irréductible : les
// repères de progression les placent en 3e. Ici on cherche des diviseurs
// communs en les listant ou en décomposant, et on simplifie « autant qu'on
// peut » sans nommer l'irréductibilité.
//
// La liste des premiers s'arrête à 100 — c'est l'attendu de fin de 4e, ni plus
// ni moins.

export default {
  numero: 2,
  titre: 'Divisibilité et nombres premiers',
  theme: 'Nombres et calculs',
  trimestre: 1,
  programme: '2020',
  prerequis: [
    'Multiples et diviseurs, critères de divisibilité par 2, 3, 5, 9 et 10 (6e)',
    'Les nombres premiers jusqu\'à 30 (5e)',
    'Fractions égales et simplification simple (5e)',
  ],

  savoirFaire: [
    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-1',
      titre: 'Reconnaître un nombre premier',
      attendus: [
        'Il connaît et utilise la liste des nombres premiers inférieurs ou égaux à 100.',
        'Il détermine si un entier est premier.',
      ],

      decouvrir: {
        titre: 'Combien de diviseurs ?',
        texte:
          'On cherche tous les diviseurs de quelques nombres — c\'est-à-dire tous '
          + 'les nombres par lesquels on peut les diviser sans reste.',
        lignes: [
          { calcul: '7', resultat: '1 et 7' },
          { calcul: '9', resultat: '1, 3 et 9' },
          { calcul: '13', resultat: '1 et 13' },
          { calcul: '1', resultat: '1' },
        ],
        question:
          'Combien 7 a-t-il de diviseurs ? Et 9 ? Compte-les.',
        champs: [
          { id: 'a', etiquette: 'diviseurs de 7 :', attendu: 2 },
          { id: 'b', etiquette: 'diviseurs de 9 :', attendu: 3 },
        ],
        conclusion:
          'Les nombres qui ont **exactement deux** diviseurs sont appelés **premiers**. '
          + '7 et 13 en font partie ; 9 non, il en a trois. Et **1 non plus** : il n\'en '
          + 'a qu\'un seul.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Nombre premier',
          texte:
            'Un nombre entier est **premier** s\'il a **exactement deux** diviseurs : '
            + '1 et lui-même.',
        },
        {
          type: 'remarque',
          titre: 'Deux cas à retenir',
          texte:
            '**1 n\'est pas premier** : il n\'a qu\'un seul diviseur, lui-même.\n'
            + '**2 est premier**, et c\'est le seul nombre pair à l\'être — tous les autres '
            + 'nombres pairs sont divisibles par 2.',
        },
        {
          type: 'propriete',
          titre: 'Quand s\'arrêter d\'essayer',
          texte:
            'Pour savoir si un nombre est premier, on essaie de le diviser par 2, 3, 5, 7… '
            + 'On peut s\'arrêter dès que le diviseur essayé, **multiplié par lui-même**, '
            + 'dépasse le nombre.',
        },
        {
          type: 'exemple',
          texte:
            'Les premiers jusqu\'à 100 : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, '
            + '43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.',
        },
      ],

      methode: {
        titre: 'Décider si un nombre est premier',
        enonce: '91 est-il un nombre premier ?',
        etapes: [
          { texte: 'Je vais essayer les diviseurs premiers dans l\'ordre : 2, 3, 5, 7…', note: '' },
          { texte: '91 est impair, donc pas divisible par 2. Il ne finit ni par 0 ni par 5, donc pas par 5.', note: '' },
          { texte: '9 + 1 = 10, qui n\'est pas dans la table de 3 : pas divisible par 3.', note: 'Le critère de divisibilité par 3.' },
          { texte: '91 ÷ 7 = 13, sans reste.', note: 'Un diviseur trouvé : on peut s\'arrêter.' },
          { texte: '91 a donc au moins trois diviseurs (1, 7 et 91) : il n\'est pas premier.', note: '' },
        ],
        controle:
          'Jusqu\'où essayer ? Tant que le diviseur multiplié par lui-même ne dépasse '
          + 'pas le nombre. Ici 9 × 9 = 81 et 10 × 10 = 100 : on s\'arrêtait à 9.',
      },

      entrainement: [
        {
          id: 'e-2-1-1', type: 'vraifaux', palier: 1, piege: 'un-est-premier',
          consigne: 'Vrai ou faux ?',
          affirmation: '1 est un nombre premier.',
          attendu: false,
          contreExemple: {
            invite: 'Combien 1 a-t-il de diviseurs ? Écris ce nombre.',
            champs: [{ id: 'a', etiquette: 'nombre de diviseurs de 1' }],
            valide: (a) => a === 1,
            exemple: '1 n\'a qu\'un seul diviseur : lui-même. Il en faudrait deux.',
          },
        },
        {
          id: 'e-2-1-2', type: 'premier', palier: 1, piege: 'impair-donc-premier',
          consigne: 'Ce nombre est-il premier ?',
          enonce: '17', attendu: true,
        },
        {
          id: 'e-2-1-3', type: 'premier', palier: 1, piege: 'impair-donc-premier',
          consigne: 'Ce nombre est-il premier ?',
          enonce: '9', attendu: false,
          fausses: [{ valeur: true, piege: 'impair-donc-premier' }],
        },
        {
          // Neutre : un pair, où le piège « impair donc premier » ne joue pas.
          id: 'e-2-1-4', type: 'premier', palier: 1, neutre: true, piege: 'un-est-premier',
          consigne: 'Ce nombre est-il premier ?',
          enonce: '2', attendu: true,
        },
        {
          id: 'e-2-1-5', type: 'premier', palier: 2, piege: 'impair-donc-premier',
          consigne: 'Ce nombre est-il premier ?',
          enonce: '21', attendu: false,
          fausses: [{ valeur: true, piege: 'impair-donc-premier' }],
        },
        {
          id: 'e-2-1-6', type: 'premier', palier: 2, piege: 'arret-trop-tot',
          consigne: 'Ce nombre est-il premier ?',
          enonce: '91', attendu: false,
          fausses: [{ valeur: true, piege: 'arret-trop-tot' }],
        },
        {
          id: 'e-2-1-7', type: 'premier', palier: 2, piege: 'arret-trop-tot',
          consigne: 'Ce nombre est-il premier ?',
          enonce: '97', attendu: true,
        },
        {
          id: 'e-2-1-8', type: 'vraifaux', palier: 3, piege: 'impair-donc-premier',
          consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
          affirmation: 'Tous les nombres impairs sont premiers.',
          attendu: false,
          contreExemple: {
            invite: 'Trouve un nombre impair qui n\'est pas premier.',
            champs: [{ id: 'a', etiquette: 'ce nombre' }],
            // On vérifie une propriété, pas une réponse unique : 9, 15, 21, 25…
            // conviennent tous, et l'élève a le droit d'être inventif.
            valide: (a) => Number.isInteger(a) && a > 1 && a % 2 === 1
              && [...Array(a - 2)].some((_, i) => a % (i + 2) === 0),
            exemple: '9 est impair, mais 9 = 3 × 3 : il a trois diviseurs.',
          },
        },
        {
          id: 'e-2-1-9', type: 'premier', palier: 3, piege: 'arret-trop-tot',
          consigne: 'Ce nombre est-il premier ?',
          enonce: '87', attendu: false,
          fausses: [{ valeur: true, piege: 'arret-trop-tot' }],
        },
        {
          id: 'e-2-1-10', type: 'calcul', palier: 3, piege: 'arret-trop-tot',
          consigne: 'Jusqu\'à quel diviseur faut-il essayer pour ce nombre ?',
          enonce: '149', attendu: 12,
          fausses: [{ valeur: 149, piege: 'arret-trop-tot' }],
        },
      ],

      problemes: [
        {
          id: 'p-2-1-1',
          enonce:
            'Un professeur affirme : « entre 20 et 30, il y a exactement deux nombres '
            + 'premiers ». On veut vérifier.',
          questions: [
            { texte: 'Quel est le plus petit des deux ?', attendu: 23 },
            { texte: 'Et le plus grand ?', attendu: 29 },
          ],
        },
        {
          id: 'p-2-1-2',
          enonce:
            'Deux nombres premiers qui se suivent en ne laissant qu\'un nombre entre eux '
            + 'sont appelés « jumeaux » — comme 11 et 13. On en cherche entre 40 et 50.',
          questions: [
            { texte: 'Quel est le premier des deux jumeaux ?', attendu: 41 },
            { texte: 'Et le second ?', attendu: 43 },
          ],
        },
        {
          id: 'p-2-1-3',
          enonce:
            'Un élève dit que 51 est premier parce qu\'il est impair et qu\'il ne '
            + 'finit ni par 0 ni par 5.',
          questions: [
            { texte: 'Trouve un diviseur de 51 autre que 1 et 51.', attendu: 3 },
            { texte: 'Quel est l\'autre facteur ?', attendu: 17 },
          ],
        },
        {
          id: 'p-2-1-4',
          enonce:
            'On veut ranger 47 livres en piles contenant toutes le même nombre de '
            + 'livres, avec au moins deux piles et au moins deux livres par pile.',
          questions: [
            { texte: 'Combien de rangements différents sont possibles ?', attendu: 0 },
          ],
        },
        {
          id: 'p-2-1-5',
          enonce:
            'Un code d\'entrée est le produit de deux nombres premiers consécutifs, '
            + 'les plus petits qui existent.',
          questions: [
            { texte: 'Quel est le plus petit nombre premier ?', attendu: 2 },
            { texte: 'Quel est le code ?', attendu: 6 },
          ],
        },
      ],

      test: [
        { id: 't-2-1-1', type: 'premier', enonce: '11', attendu: true, revoir: 'definition' },
        { id: 't-2-1-2', type: 'premier', enonce: '15', attendu: false, revoir: 'definition' },
        { id: 't-2-1-3', type: 'premier', enonce: '1', attendu: false, revoir: 'remarque' },
        { id: 't-2-1-4', type: 'premier', enonce: '2', attendu: true, revoir: 'remarque' },
        { id: 't-2-1-5', type: 'premier', enonce: '49', attendu: false, revoir: 'propriete' },
        { id: 't-2-1-6', type: 'premier', enonce: '53', attendu: true, revoir: 'exemple' },
        { id: 't-2-1-7', type: 'premier', enonce: '57', attendu: false, revoir: 'propriete' },
        { id: 't-2-1-8', type: 'premier', enonce: '83', attendu: true, revoir: 'exemple' },
        { id: 't-2-1-9', type: 'premier', enonce: '77', attendu: false, revoir: 'propriete' },
        { id: 't-2-1-10', type: 'calcul', enonce: '121', attendu: 11, consigne: 'Jusqu\'à quel diviseur faut-il essayer ?', revoir: 'propriete' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-2',
      titre: 'Décomposer un nombre en produit de facteurs premiers',
      attendus: [
        'Il décompose un nombre entier en produit de facteurs premiers.',
      ],

      decouvrir: {
        titre: 'Deux chemins, une seule arrivée',
        texte:
          'Deux élèves décomposent 60. Sacha commence par 6 × 10, Inès par 4 × 15. '
          + 'Ils continuent chacun jusqu\'à n\'avoir que des nombres premiers.',
        copies: [
          { nom: 'Sacha', calcul: '60 = 6 × 10 = (2 × 3) × (2 × 5)', resultat: '2 × 2 × 3 × 5' },
          { nom: 'Inès', calcul: '60 = 4 × 15 = (2 × 2) × (3 × 5)', resultat: '2 × 2 × 3 × 5' },
        ],
        question: 'Combien de fois le facteur 2 apparaît-il dans le résultat ? Et le facteur 3 ?',
        champs: [
          { id: 'a', etiquette: 'nombre de 2 :', attendu: 2 },
          { id: 'b', etiquette: 'nombre de 3 :', attendu: 1 },
        ],
        conclusion:
          'Les deux chemins donnent **exactement les mêmes facteurs**, dans le même '
          + 'nombre d\'exemplaires. C\'est toujours le cas : la décomposition d\'un '
          + 'nombre est **unique**, quel que soit l\'ordre dans lequel on s\'y prend.',
      },

      cours: [
        {
          type: 'theoreme',
          titre: 'Décomposition en facteurs premiers',
          texte:
            'Tout entier plus grand que 1 s\'écrit comme un **produit de nombres '
            + 'premiers**, et cette écriture est **unique** si l\'on ne tient pas compte '
            + 'de l\'ordre des facteurs.',
        },
        {
          type: 'remarque',
          texte:
            'La méthode la plus sûre : diviser par le **plus petit** nombre premier '
            + 'possible, puis recommencer avec le résultat, jusqu\'à obtenir 1.',
        },
        {
          type: 'remarque',
          titre: 'Un facteur peut revenir plusieurs fois',
          texte:
            '12 = 2 × 2 × 3, et non 2 × 3. Chaque division compte : c\'est ce qui fait '
            + 'la différence entre une décomposition et une simple liste de diviseurs.',
        },
        { type: 'exemple', texte: '84 = 2 × 2 × 3 × 7   ·   45 = 3 × 3 × 5   ·   50 = 2 × 5 × 5' },
      ],

      methode: {
        titre: 'Décomposer par divisions successives',
        enonce: 'Décomposer 84 en produit de facteurs premiers.',
        etapes: [
          { texte: '84 est pair : 84 ÷ 2 = 42.', note: 'On commence toujours par le plus petit premier.' },
          { texte: '42 est pair : 42 ÷ 2 = 21.', note: 'Le 2 revient une seconde fois.' },
          { texte: '21 n\'est pas pair ; 2 + 1 = 3, donc divisible par 3 : 21 ÷ 3 = 7.', note: '' },
          { texte: '7 est premier : 7 ÷ 7 = 1. On s\'arrête.', note: '' },
          { texte: 'Donc 84 = 2 × 2 × 3 × 7.', note: '' },
        ],
        controle:
          'Multiplie tes facteurs : 2 × 2 × 3 × 7 = 84. Si tu ne retombes pas sur le '
          + 'nombre de départ, un facteur manque ou est en trop.',
      },

      entrainement: [
        {
          id: 'e-2-2-1', type: 'facteurs', palier: 1, piege: 'facteur-repete-oublie',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '12', attendu: [2, 2, 3],
          fausses: [{ valeur: '2 × 3', piege: 'facteur-repete-oublie' }],
        },
        {
          id: 'e-2-2-2', type: 'facteurs', palier: 1, piege: 'decomposition-incomplete',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '20', attendu: [2, 2, 5],
          fausses: [{ valeur: '4 × 5', piege: 'decomposition-incomplete' }],
        },
        {
          // Neutre : un nombre premier ne se décompose pas — il est déjà sa
          // propre décomposition. Sans cet item, « il y a toujours au moins
          // deux facteurs » deviendrait une règle fausse.
          id: 'e-2-2-3', type: 'facteurs', palier: 1, neutre: true, piege: 'decomposition-incomplete',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '13', attendu: [13],
        },
        {
          id: 'e-2-2-4', type: 'facteurs', palier: 2, piege: 'decomposition-incomplete',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '84', attendu: [2, 2, 3, 7],
          fausses: [{ valeur: '4 × 21', piege: 'decomposition-incomplete' }],
        },
        {
          id: 'e-2-2-5', type: 'facteurs', palier: 2, piege: 'facteur-repete-oublie',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '45', attendu: [3, 3, 5],
          fausses: [{ valeur: '3 × 5', piege: 'facteur-repete-oublie' }],
        },
        {
          id: 'e-2-2-6', type: 'facteurs', palier: 2, piege: 'decomposition-incomplete',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '90', attendu: [2, 3, 3, 5],
        },
        {
          id: 'e-2-2-7', type: 'facteurs', palier: 3, piege: 'facteur-repete-oublie',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '72', attendu: [2, 2, 2, 3, 3],
          fausses: [{ valeur: '2 × 3', piege: 'facteur-repete-oublie' }],
        },
        {
          id: 'e-2-2-8', type: 'facteurs', palier: 3, piege: 'decomposition-incomplete',
          consigne: 'Décompose en produit de facteurs premiers.',
          enonce: '147', attendu: [3, 7, 7],
        },
        {
          id: 'e-2-2-9', type: 'calcul', palier: 3, piege: 'facteur-repete-oublie',
          consigne: 'Combien de fois le facteur 2 apparaît-il dans la décomposition de 96 ?',
          enonce: '96', attendu: 5,
          fausses: [{ valeur: 1, piege: 'facteur-repete-oublie' }],
        },
        {
          id: 'e-2-2-10', type: 'vraifaux', palier: 3, piege: 'decomposition-incomplete',
          consigne: 'Vrai ou faux ?',
          affirmation: '2 × 2 × 15 est la décomposition en facteurs premiers de 60.',
          attendu: false,
          contreExemple: {
            invite: 'Quel facteur n\'est pas premier ? Écris-le.',
            champs: [{ id: 'a', etiquette: 'le facteur fautif' }],
            valide: (a) => a === 15,
            exemple: '15 n\'est pas premier : 15 = 3 × 5. La décomposition est 2 × 2 × 3 × 5.',
          },
        },
      ],

      problemes: [
        {
          id: 'p-2-2-1',
          enonce:
            'On veut construire un rectangle de 60 carreaux, dont les côtés font plus '
            + 'de 1 carreau. On s\'aide de la décomposition 60 = 2 × 2 × 3 × 5.',
          questions: [
            { texte: 'Si un côté fait 4 carreaux, combien fait l\'autre ?', attendu: 15 },
            { texte: 'Et si un côté fait 6 ?', attendu: 10 },
          ],
        },
        {
          id: 'p-2-2-2',
          enonce:
            'Un nombre se décompose en 2 × 3 × 3 × 5.',
          questions: [
            { texte: 'Quel est ce nombre ?', attendu: 90 },
          ],
        },
        {
          id: 'p-2-2-3',
          enonce:
            'On décompose 360. Le résultat contient plusieurs fois le facteur 2 et '
            + 'plusieurs fois le facteur 3.',
          questions: [
            { texte: 'Combien de fois le facteur 2 apparaît-il ?', attendu: 3 },
            { texte: 'Combien de fois le facteur 3 ?', attendu: 2 },
          ],
        },
        {
          id: 'p-2-2-4',
          enonce:
            'Un carré est pavé avec des carreaux identiques. Sa surface vaut 196 '
            + 'carreaux, et 196 = 2 × 2 × 7 × 7.',
          questions: [
            { texte: 'Combien de carreaux mesure son côté ?', attendu: 14 },
          ],
        },
        {
          id: 'p-2-2-5',
          enonce:
            'Deux nombres se décomposent en 2 × 2 × 3 et en 2 × 3 × 5. On veut les '
            + 'facteurs qu\'ils ont en commun.',
          questions: [
            { texte: 'Combien de fois le facteur 2 est-il commun aux deux ?', attendu: 1 },
            { texte: 'Quel est le produit de tous leurs facteurs communs ?', attendu: 6 },
          ],
        },
      ],

      test: [
        { id: 't-2-2-1', type: 'facteurs', enonce: '18', attendu: [2, 3, 3], revoir: 'theoreme' },
        { id: 't-2-2-2', type: 'facteurs', enonce: '28', attendu: [2, 2, 7], revoir: 'theoreme' },
        { id: 't-2-2-3', type: 'facteurs', enonce: '17', attendu: [17], revoir: 'remarque' },
        { id: 't-2-2-4', type: 'facteurs', enonce: '50', attendu: [2, 5, 5], revoir: 'exemple' },
        { id: 't-2-2-5', type: 'facteurs', enonce: '64', attendu: [2, 2, 2, 2, 2, 2], revoir: 'remarque' },
        { id: 't-2-2-6', type: 'facteurs', enonce: '75', attendu: [3, 5, 5], revoir: 'exemple' },
        { id: 't-2-2-7', type: 'facteurs', enonce: '100', attendu: [2, 2, 5, 5], revoir: 'exemple' },
        { id: 't-2-2-8', type: 'facteurs', enonce: '105', attendu: [3, 5, 7], revoir: 'theoreme' },
        { id: 't-2-2-9', type: 'calcul', enonce: '48', attendu: 4, consigne: 'Combien de fois le facteur 2 apparaît-il ?', revoir: 'remarque' },
        { id: 't-2-2-10', type: 'facteurs', enonce: '126', attendu: [2, 3, 3, 7], revoir: 'theoreme' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-3',
      titre: 'Simplifier une fraction',
      attendus: [
        'Il utilise la décomposition en facteurs premiers pour produire des fractions égales et simplifier une fraction.',
      ],

      decouvrir: {
        titre: 'Simplifier d\'un coup, ou par étapes',
        texte:
          'On veut simplifier 84/210. Deux élèves s\'y prennent différemment.',
        copies: [
          { nom: 'Sacha', calcul: 'Je divise deux fois par 2, puis par 3, puis par 7', resultat: '2/5' },
          { nom: 'Inès', calcul: 'Je décompose : 84 = 2×2×3×7 et 210 = 2×3×5×7, je barre les facteurs communs', resultat: '2/5' },
        ],
        question: 'Par quel nombre Inès a-t-elle divisé en une seule fois ? (c\'est le produit des facteurs communs)',
        champs: [{ id: 'a', etiquette: 'ce nombre :', attendu: 42 }],
        conclusion:
          'Les deux méthodes marchent. La décomposition va **plus vite quand les '
          + 'nombres sont grands**, parce qu\'elle montre d\'un coup tous les facteurs '
          + 'communs au lieu de les chercher un par un.',
      },

      cours: [
        {
          type: 'propriete',
          titre: 'Simplifier une fraction',
          texte:
            'Diviser le numérateur **et** le dénominateur par un même nombre non nul '
            + 'donne une fraction **égale**. Simplifier, c\'est faire cette division.',
        },
        {
          type: 'remarque',
          texte:
            'Avec la décomposition, les facteurs communs au numérateur et au '
            + 'dénominateur se voient d\'un coup d\'œil, et on les supprime tous en '
            + 'même temps.',
        },
        {
          type: 'remarque',
          titre: 'On simplifie des facteurs, jamais des termes',
          texte:
            'Dans (2 + 6)/2, le 2 du haut est **ajouté**, pas multiplié : on ne peut '
            + 'rien barrer. Il faut d\'abord calculer 2 + 6 = 8, puis simplifier 8/2 = 4.',
        },
        { type: 'exemple', texte: '84/210 = (2×2×3×7)/(2×3×5×7) = 2/5' },
      ],

      methode: {
        titre: 'Simplifier avec la décomposition',
        enonce: 'Simplifier la fraction 90/126 autant que possible.',
        etapes: [
          { texte: 'Je décompose le numérateur : 90 = 2 × 3 × 3 × 5.', note: '' },
          { texte: 'Puis le dénominateur : 126 = 2 × 3 × 3 × 7.', note: '' },
          { texte: 'Les facteurs communs sont 2, 3 et 3 — leur produit vaut 18.', note: '' },
          { texte: 'Je divise les deux par 18 : 90 ÷ 18 = 5 et 126 ÷ 18 = 7.', note: '' },
          { texte: 'Donc 90/126 = 5/7.', note: 'Il ne reste aucun facteur commun.' },
        ],
        controle:
          'Vérifie qu\'il ne reste rien à simplifier : 5 et 7 sont premiers et '
          + 'différents, donc c\'est fini.',
      },

      entrainement: [
        {
          id: 'e-2-3-1', type: 'fraction', palier: 1, piege: 'chiffres-barres',
          consigne: 'Simplifie autant que possible.',
          enonce: '\\dfrac{12}{18}', attendu: [2, 3],
          fausses: [{ valeur: '1/8', piege: 'chiffres-barres' }],
        },
        {
          id: 'e-2-3-2', type: 'fraction', palier: 1, piege: 'chiffres-barres',
          consigne: 'Simplifie autant que possible.',
          enonce: '\\dfrac{16}{64}', attendu: [1, 4],
          fausses: [{ valeur: '1/4 par barrage', piege: 'chiffres-barres' }],
        },
        {
          // Neutre : rien à simplifier. Sans cet item, « il y a toujours quelque
          // chose à barrer » deviendrait un réflexe.
          id: 'e-2-3-3', type: 'fraction', palier: 1, neutre: true, piege: 'chiffres-barres',
          consigne: 'Simplifie autant que possible.',
          enonce: '\\dfrac{7}{9}', attendu: [7, 9],
        },
        {
          id: 'e-2-3-4', type: 'fraction', palier: 2, piege: 'chiffres-barres',
          consigne: 'Simplifie autant que possible.',
          enonce: '\\dfrac{84}{210}', attendu: [2, 5],
        },
        {
          id: 'e-2-3-5', type: 'fraction', palier: 2, piege: 'chiffres-barres',
          consigne: 'Simplifie autant que possible.',
          enonce: '\\dfrac{90}{126}', attendu: [5, 7],
        },
        {
          id: 'e-2-3-6', type: 'fraction', palier: 2, neutre: true, piege: 'chiffres-barres',
          consigne: 'Simplifie autant que possible.',
          enonce: '\\dfrac{15}{28}', attendu: [15, 28],
        },
        {
          id: 'e-2-3-7', type: 'fraction', palier: 3, piege: 'simplification-de-somme',
          consigne: 'Calcule puis simplifie autant que possible.',
          enonce: '\\dfrac{2 + 6}{2}', attendu: [4, 1],
          fausses: [{ valeur: '6', piege: 'simplification-de-somme' }],
        },
        {
          id: 'e-2-3-8', type: 'fraction', palier: 3, piege: 'simplification-de-somme',
          consigne: 'Calcule puis simplifie autant que possible.',
          enonce: '\\dfrac{3 + 9}{3}', attendu: [4, 1],
          fausses: [{ valeur: '9', piege: 'simplification-de-somme' }],
        },
        {
          id: 'e-2-3-9', type: 'fraction', palier: 3, piege: 'chiffres-barres',
          consigne: 'Simplifie autant que possible.',
          enonce: '\\dfrac{132}{352}', attendu: [3, 8],
        },
        {
          id: 'e-2-3-10', type: 'vraifaux', palier: 3, piege: 'simplification-de-somme',
          consigne: 'Vrai ou faux ?',
          affirmation: 'Dans (5 + 10)/5, on peut barrer les deux 5 et il reste 10.',
          attendu: false,
          contreExemple: {
            invite: 'Calcule d\'abord le haut, puis divise. Que trouves-tu ?',
            champs: [{ id: 'a', etiquette: 'le résultat correct' }],
            valide: (a) => a === 3,
            exemple: '(5 + 10)/5 = 15/5 = 3, et non 10.',
          },
        },
      ],

      problemes: [
        {
          id: 'p-2-3-1',
          enonce: 'Sur 120 élèves d\'un collège, 45 font du sport en club.',
          questions: [
            { texte: 'Simplifie 45/120 : quel est le numérateur obtenu ?', attendu: 3 },
            { texte: 'Et le dénominateur ?', attendu: 8 },
          ],
        },
        {
          id: 'p-2-3-2',
          enonce: 'Une recette pour 8 personnes demande 210 g de farine. On la réduit pour 4 personnes.',
          questions: [
            { texte: 'Combien de grammes faut-il ?', attendu: 105, unite: 'g' },
          ],
        },
        {
          id: 'p-2-3-3',
          enonce:
            'Un sondage donne 168 réponses « oui » sur 280 réponses au total. On veut '
            + 'la fraction la plus simple.',
          questions: [
            { texte: 'Numérateur après simplification ?', attendu: 3 },
            { texte: 'Dénominateur ?', attendu: 5 },
          ],
        },
        {
          id: 'p-2-3-4',
          enonce: 'Deux fractions, 36/48 et 45/60, semblent différentes.',
          questions: [
            { texte: 'Numérateur de leur forme simplifiée commune ?', attendu: 3 },
            { texte: 'Dénominateur ?', attendu: 4 },
          ],
        },
        {
          id: 'p-2-3-5',
          enonce:
            'Un élève écrit : « (7 + 14)/7 = 14 parce que les 7 se barrent ». '
            + 'On veut lui montrer son erreur par le calcul.',
          questions: [
            { texte: 'Combien vaut le numérateur une fois calculé ?', attendu: 21 },
            { texte: 'Quel est donc le vrai résultat ?', attendu: 3 },
          ],
        },
      ],

      test: [
        { id: 't-2-3-1', type: 'fraction', enonce: '\\dfrac{10}{15}', attendu: [2, 3], revoir: 'propriete' },
        { id: 't-2-3-2', type: 'fraction', enonce: '\\dfrac{24}{36}', attendu: [2, 3], revoir: 'propriete' },
        { id: 't-2-3-3', type: 'fraction', enonce: '\\dfrac{11}{13}', attendu: [11, 13], revoir: 'propriete' },
        { id: 't-2-3-4', type: 'fraction', enonce: '\\dfrac{63}{81}', attendu: [7, 9], revoir: 'remarque' },
        { id: 't-2-3-5', type: 'fraction', enonce: '\\dfrac{4 + 8}{4}', attendu: [3, 1], revoir: 'remarque' },
        { id: 't-2-3-6', type: 'fraction', enonce: '\\dfrac{54}{72}', attendu: [3, 4], revoir: 'remarque' },
        { id: 't-2-3-7', type: 'fraction', enonce: '\\dfrac{25}{100}', attendu: [1, 4], revoir: 'exemple' },
        { id: 't-2-3-8', type: 'fraction', enonce: '\\dfrac{98}{154}', attendu: [7, 11], revoir: 'exemple' },
        { id: 't-2-3-9', type: 'fraction', enonce: '\\dfrac{9}{20}', attendu: [9, 20], revoir: 'propriete' },
        { id: 't-2-3-10', type: 'fraction', enonce: '\\dfrac{6 + 12}{6}', attendu: [3, 1], revoir: 'remarque' },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════
    {
      id: 'sf-2-4',
      titre: 'Résoudre un problème de diviseurs communs',
      attendus: [
        'Il résout des problèmes de divisibilité : partages en parts égales, dallages, bouquets.',
      ],

      decouvrir: {
        titre: 'Des bouquets identiques',
        texte:
          'Un fleuriste a 12 roses et 18 tulipes. Il veut composer des bouquets '
          + '**tous identiques**, en utilisant toutes ses fleurs.',
        lignes: [
          { calcul: 'diviseurs de 12', resultat: '1, 2, 3, 4, 6, 12' },
          { calcul: 'diviseurs de 18', resultat: '1, 2, 3, 6, 9, 18' },
        ],
        question: 'Quel est le plus grand nombre de bouquets possible ? Combien de roses dans chacun ?',
        champs: [
          { id: 'a', etiquette: 'nombre de bouquets :', attendu: 6 },
          { id: 'b', etiquette: 'roses par bouquet :', attendu: 2 },
        ],
        conclusion:
          'Le nombre de bouquets doit diviser **les deux** quantités : c\'est un '
          + '**diviseur commun**. Le plus grand des diviseurs communs de 12 et 18 est 6.',
      },

      cours: [
        {
          type: 'definition',
          titre: 'Diviseur commun',
          texte:
            'Un **diviseur commun** à deux nombres est un nombre qui les divise tous '
            + 'les deux sans reste.',
        },
        {
          type: 'remarque',
          texte:
            'Pour les trouver : on liste les diviseurs de chacun, et on repère ceux qui '
            + 'sont dans les deux listes. Avec de grands nombres, la décomposition en '
            + 'facteurs premiers va plus vite.',
        },
        {
          type: 'remarque',
          titre: 'Reconnaître ce genre de problème',
          texte:
            'Quand un énoncé demande de faire des **parts identiques** en utilisant '
            + '**tout** — bouquets, paquets, dallages, rangées — c\'est un problème de '
            + 'diviseurs communs.',
        },
        { type: 'exemple', texte: 'Diviseurs communs de 12 et 18 : 1, 2, 3 et 6. Le plus grand est 6.' },
      ],

      methode: {
        titre: 'Faire des parts identiques',
        enonce:
          'On veut ranger 24 stylos et 36 crayons dans des trousses identiques, en '
          + 'utilisant tout. Combien de trousses au maximum, et que contient chacune ?',
        etapes: [
          { texte: 'Le nombre de trousses doit diviser 24 et 36.', note: 'C\'est ce que veut dire « identiques » et « en utilisant tout ».' },
          { texte: 'Diviseurs de 24 : 1, 2, 3, 4, 6, 8, 12, 24.', note: '' },
          { texte: 'Diviseurs de 36 : 1, 2, 3, 4, 6, 9, 12, 18, 36.', note: '' },
          { texte: 'Communs : 1, 2, 3, 4, 6, 12. Le plus grand est 12.', note: '' },
          { texte: 'Chaque trousse contient 24 ÷ 12 = 2 stylos et 36 ÷ 12 = 3 crayons.', note: '' },
        ],
        controle:
          'Vérifie que tout est utilisé : 12 × 2 = 24 stylos et 12 × 3 = 36 crayons. '
          + 'Aucun reste, donc c\'est bon.',
      },

      entrainement: [
        {
          id: 'e-2-4-1', type: 'calcul', palier: 1, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus grand diviseur commun à ces deux nombres ?',
          enonce: '12 \\text{ et } 18', attendu: 6,
          fausses: [{ valeur: 36, piege: 'multiple-et-diviseur-confondus' }],
        },
        {
          id: 'e-2-4-2', type: 'calcul', palier: 1, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus grand diviseur commun à ces deux nombres ?',
          enonce: '20 \\text{ et } 30', attendu: 10,
          fausses: [{ valeur: 60, piege: 'multiple-et-diviseur-confondus' }],
        },
        {
          // Neutre : deux nombres sans diviseur commun autre que 1. Sans cet
          // item, « il y a toujours un grand diviseur commun » s'installerait.
          id: 'e-2-4-3', type: 'calcul', palier: 1, neutre: true, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus grand diviseur commun à ces deux nombres ?',
          enonce: '9 \\text{ et } 20', attendu: 1,
        },
        {
          id: 'e-2-4-4', type: 'calcul', palier: 2, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus grand diviseur commun à ces deux nombres ?',
          enonce: '24 \\text{ et } 36', attendu: 12,
          fausses: [{ valeur: 72, piege: 'multiple-et-diviseur-confondus' }],
        },
        {
          id: 'e-2-4-5', type: 'calcul', palier: 2, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus grand diviseur commun à ces deux nombres ?',
          enonce: '48 \\text{ et } 72', attendu: 24,
        },
        {
          id: 'e-2-4-6', type: 'calcul', palier: 2, neutre: true, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus petit multiple commun à ces deux nombres ?',
          enonce: '4 \\text{ et } 6', attendu: 12,
          fausses: [{ valeur: 2, piege: 'multiple-et-diviseur-confondus' }],
        },
        {
          id: 'e-2-4-7', type: 'calcul', palier: 3, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus grand diviseur commun à ces deux nombres ?',
          enonce: '84 \\text{ et } 126', attendu: 42,
        },
        {
          id: 'e-2-4-8', type: 'calcul', palier: 3, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Combien 30 et 45 ont-ils de diviseurs communs en tout ?',
          enonce: '30 \\text{ et } 45', attendu: 4,
        },
        {
          id: 'e-2-4-9', type: 'vraifaux', palier: 3, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
          affirmation: 'Deux nombres différents ont toujours un diviseur commun plus grand que 1.',
          attendu: false,
          contreExemple: {
            invite: 'Trouve un nombre qui n\'a que 1 en commun avec 9.',
            champs: [{ id: 'a', etiquette: 'ce nombre' }],
            valide: (a) => {
              if (!Number.isInteger(a) || a < 2 || a === 9) return false;
              const pgcd = (x, y) => (y ? pgcd(y, x % y) : Math.abs(x));
              return pgcd(a, 9) === 1;
            },
            exemple: '20 et 9 n\'ont que 1 comme diviseur commun.',
          },
        },
        {
          id: 'e-2-4-10', type: 'calcul', palier: 3, piege: 'multiple-et-diviseur-confondus',
          consigne: 'Quel est le plus grand diviseur commun à ces deux nombres ?',
          enonce: '17 \\text{ et } 51', attendu: 17,
        },
      ],

      problemes: [
        {
          id: 'p-2-4-1',
          enonce:
            'Un fleuriste dispose de 12 roses et 18 tulipes. Il compose des bouquets '
            + 'identiques en utilisant toutes ses fleurs.',
          questions: [
            { texte: 'Combien de bouquets au maximum ?', attendu: 6 },
            { texte: 'Combien de tulipes par bouquet ?', attendu: 3 },
          ],
        },
        {
          id: 'p-2-4-2',
          enonce:
            'On veut carreler une pièce de 240 cm sur 180 cm avec des dalles carrées '
            + 'identiques, sans en couper aucune.',
          questions: [
            { texte: 'Quel est le plus grand côté de dalle possible, en cm ?', attendu: 60, unite: 'cm' },
            { texte: 'Combien de dalles faudra-t-il ?', attendu: 12 },
          ],
        },
        {
          id: 'p-2-4-3',
          enonce:
            'Une classe de 28 filles et 21 garçons est répartie en équipes identiques, '
            + 'chacune ayant le même nombre de filles et le même nombre de garçons.',
          questions: [
            { texte: 'Combien d\'équipes au maximum ?', attendu: 7 },
            { texte: 'Combien de filles par équipe ?', attendu: 4 },
          ],
        },
        {
          id: 'p-2-4-4',
          enonce:
            'Un pâtissier a 45 macarons et 60 chocolats. Il fait des coffrets identiques '
            + 'sans rien laisser.',
          questions: [
            { texte: 'Combien de coffrets au maximum ?', attendu: 15 },
            { texte: 'Combien de chocolats par coffret ?', attendu: 4 },
          ],
        },
        {
          id: 'p-2-4-5',
          enonce:
            'Deux phares clignotent, l\'un toutes les 4 secondes, l\'autre toutes les '
            + '6 secondes. Ils viennent de clignoter ensemble.',
          questions: [
            { texte: 'Dans combien de secondes clignoteront-ils à nouveau ensemble ?', attendu: 12, unite: 's' },
          ],
        },
      ],

      test: [
        { id: 't-2-4-1', type: 'calcul', enonce: '8 \\text{ et } 12', attendu: 4, consigne: 'Plus grand diviseur commun ?', revoir: 'definition' },
        { id: 't-2-4-2', type: 'calcul', enonce: '15 \\text{ et } 25', attendu: 5, consigne: 'Plus grand diviseur commun ?', revoir: 'definition' },
        { id: 't-2-4-3', type: 'calcul', enonce: '7 \\text{ et } 10', attendu: 1, consigne: 'Plus grand diviseur commun ?', revoir: 'exemple' },
        { id: 't-2-4-4', type: 'calcul', enonce: '36 \\text{ et } 60', attendu: 12, consigne: 'Plus grand diviseur commun ?', revoir: 'remarque' },
        { id: 't-2-4-5', type: 'calcul', enonce: '14 \\text{ et } 35', attendu: 7, consigne: 'Plus grand diviseur commun ?', revoir: 'definition' },
        { id: 't-2-4-6', type: 'calcul', enonce: '3 \\text{ et } 5', attendu: 15, consigne: 'Plus petit multiple commun ?', revoir: 'remarque' },
        { id: 't-2-4-7', type: 'calcul', enonce: '50 \\text{ et } 75', attendu: 25, consigne: 'Plus grand diviseur commun ?', revoir: 'remarque' },
        { id: 't-2-4-8', type: 'calcul', enonce: '11 \\text{ et } 33', attendu: 11, consigne: 'Plus grand diviseur commun ?', revoir: 'definition' },
        { id: 't-2-4-9', type: 'calcul', enonce: '6 \\text{ et } 8', attendu: 24, consigne: 'Plus petit multiple commun ?', revoir: 'remarque' },
        { id: 't-2-4-10', type: 'calcul', enonce: '54 \\text{ et } 90', attendu: 18, consigne: 'Plus grand diviseur commun ?', revoir: 'remarque' },
      ],
    },
  ],
};
