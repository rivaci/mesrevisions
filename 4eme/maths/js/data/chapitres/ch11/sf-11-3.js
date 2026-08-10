// Savoir-faire 11-3 — Résoudre une équation avec l'inconnue des deux côtés.
//
// C'est le premier endroit du programme où l'élève ne peut plus « voir » la
// réponse. Devant 3x + 5 = 20, beaucoup trouvent 5 de tête et n'ont jamais eu
// besoin d'une méthode ; devant 5x + 2 = 3x + 14, le calcul mental ne donne
// plus rien. La méthode cesse d'être une formalité et devient le seul chemin —
// ce qui rend ce savoir-faire décisif, et pas seulement « plus difficile ».
//
// ── Pourquoi la formule est le vrai adversaire ────────────────────────────
//
// « Ça change de côté, ça change de signe » n'est pas une erreur, c'est un
// résumé exact du geste légitime — retrancher la même chose aux deux membres —
// mais amputé de la raison qui le rend vrai. L'élève qui l'a apprise ainsi ne
// connaît pas son domaine de validité, et l'applique donc au coefficient : de
// 2x = 12 il tire x = 10. Répéter la formule ne peut pas défaire ce que la
// formule a produit. On la remplace donc par la question qu'elle escamote :
// ce nombre est-il AJOUTÉ à x, ou MULTIPLIÉ par x ?
//
// D'où trois partis pris :
//
//   1. Le cours n'énonce jamais la formule. Il énonce les deux opérations
//      autorisées sur une équation, et la marche à suivre en découle.
//   2. Les coefficients négatifs ne sont pas relégués en fin de parcours. Un
//      élève qui n'a rencontré que des −4x = −12 « qui tombent bien » prendra
//      le signe négatif pour une faute. Le palier 2 en est fait.
//   3. Le contrôle est la substitution dans l'équation de DÉPART. C'est le seul
//      chapitre de l'année où l'élève peut savoir seul, à coup sûr et sans
//      corrigé, s'il a juste. Ce serait absurde de ne pas le lui apprendre.
//
// Le type `corriger` porte le palier 3 : il demande de désigner la LIGNE où la
// résolution dérape, pas de refaire le calcul. C'est le geste qu'exige une
// résolution en quatre lignes, où le résultat final ne dit rien de l'endroit
// où l'on s'est perdu.

export default {
  id: 'sf-11-3',
  titre: 'Résoudre une équation avec l\'inconnue des deux côtés',
  attendus: [
    'Il résout une équation du premier degré du type ax + b = cx + d.',
    'Il vérifie qu\'un nombre donné est solution d\'une équation.',
  ],

  // Deux tarifs qu'on compare : la situation produit l'équation au lieu de
  // l'illustrer. L'élève calcule d'abord des cas particuliers — c'est de
  // l'arithmétique, rien à savoir d'avance — et constate que les deux colonnes
  // se rejoignent. La conclusion peut alors dire ce que les essais ne diront
  // jamais : qu'on ne trouvera pas toujours le point de rencontre en tâtonnant.
  decouvrir: {
    titre: 'Deux tarifs qui finissent par se rejoindre',
    texte:
      'Une salle d\'escalade propose deux formules. La formule A demande 24 € '
      + 'd\'inscription, puis 4 € par séance. La formule B ne demande aucune '
      + 'inscription, mais 7 € par séance. On a calculé ce que coûte chaque '
      + 'formule pour quelques nombres de séances.',
    lignes: [
      { calcul: 'pour 4 séances, la formule A : 24 + 4 × 4', resultat: '40 €' },
      { calcul: 'pour 4 séances, la formule B : 7 × 4', resultat: '28 €' },
      { calcul: 'pour 6 séances, la formule A : 24 + 4 × 6', resultat: '48 €' },
      { calcul: 'pour 6 séances, la formule B : 7 × 6', resultat: '42 €' },
    ],
    question: 'L\'écart se resserre. Calcule ce que coûte chaque formule pour 8 séances.',
    champs: [
      { id: 'a', etiquette: 'formule A, 8 séances : 24 + 4 × 8 =', attendu: 56 },
      { id: 'b', etiquette: 'formule B, 8 séances : 7 × 8 =', attendu: 56 },
    ],
    conclusion:
      'À 8 séances, les deux formules coûtent **exactement pareil**. Tu l\'as '
      + 'trouvé en essayant — mais si la réponse avait été 143 séances, tu y '
      + 'serais encore.\n'
      + 'En appelant **x** le nombre de séances, la question s\'écrit d\'une '
      + 'seule ligne : **24 + 4x = 7x**. Cette fois le x est **des deux côtés**, '
      + 'et c\'est justement ce qui rend la réponse impossible à deviner. Il va '
      + 'falloir rassembler les x d\'un côté.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Ce qu\'on a le droit de faire à une équation',
      texte:
        'Une équation est une **balance** : les deux membres s\'équilibrent.\n'
        + 'On peut **ajouter** ou **retrancher un même nombre** — ou une même '
        + 'expression, comme 3x — **aux deux membres** à la fois.\n'
        + 'On peut **multiplier** ou **diviser les deux membres par un même '
        + 'nombre non nul**.\n'
        + 'Dans les deux cas, l\'équation obtenue a **exactement les mêmes '
        + 'solutions** que celle de départ.',
    },
    {
      type: 'remarque',
      titre: 'La marche à suivre',
      texte:
        'Quand l\'inconnue est des deux côtés, on procède dans cet ordre :\n'
        + '1. Retrancher aux deux membres le terme en x du membre où l\'on ne '
        + 'veut pas le garder : tous les x se retrouvent du même côté.\n'
        + '2. Retrancher (ou ajouter) aux deux membres le nombre seul qui '
        + 'traîne du côté des x : tous les nombres passent de l\'autre.\n'
        + '3. Diviser les deux membres par le coefficient de x.',
    },
    {
      // La remarque qui porte tout le savoir-faire. Elle ne dit pas « attention
      // au coefficient » — elle donne la question qui tranche, et qui ne
      // demande de retenir aucune formule.
      type: 'remarque',
      titre: 'Ajouté, ou multiplié ?',
      texte:
        'On annule une **addition** par une soustraction, et une '
        + '**multiplication** par une division. Avant de faire passer un nombre '
        + 'de l\'autre côté, demande-toi lequel des deux tu as sous les yeux.\n'
        + 'Dans 2x = 12, le 2 **multiplie** x : on divise les deux membres par 2, '
        + 'et x vaut 6. Écrire x = 12 − 2 reviendrait à annuler une addition qui '
        + 'n\'existe pas.\n'
        + 'Un coefficient **négatif** n\'a rien d\'anormal : −3x = 12 donne '
        + 'x = 12 ÷ (−3) = −4, et une solution négative est une réponse comme '
        + 'une autre.',
    },
    {
      type: 'exemple',
      texte:
        '5x + 3 = 2x + 18\n'
        + 'On retranche 2x aux deux membres : 3x + 3 = 18.\n'
        + 'On retranche 3 aux deux membres : 3x = 15.\n'
        + 'On divise les deux membres par 3 : x = 5.\n'
        + 'Vérification : 5 × 5 + 3 = 28 et 2 × 5 + 18 = 28. L\'égalité tient.',
    },
  ],

  methode: {
    titre: 'Rassembler, puis diviser',
    enonce: 'Résoudre l\'équation 7x − 4 = 3x + 12.',
    etapes: [
      {
        texte: 'Je retranche 3x aux deux membres : 7x − 3x − 4 = 12, donc 4x − 4 = 12.',
        note: 'Je choisis de garder les x à gauche, où ils sont les plus nombreux : le coefficient restera positif.',
      },
      {
        texte: 'J\'ajoute 4 aux deux membres : 4x = 16.',
        note: 'Le 4 est retranché à 4x, il ne le multiplie pas : c\'est donc une addition qui l\'annule.',
      },
      {
        texte: 'Le 4 multiplie x. Je divise donc les deux membres par 4 : x = 4.',
        note: 'Ici la formule « ça change de côté, ça change de signe » ne s\'applique pas : le 4 n\'est pas ajouté.',
      },
    ],
    controle:
      'Le contrôle : remplace x par ta réponse dans l\'équation de DÉPART, et '
      + 'calcule les deux membres séparément. Ici 7 × 4 − 4 = 24 et '
      + '3 × 4 + 12 = 24 : les deux donnent 24, donc 4 est bien solution. C\'est '
      + 'le seul exercice de maths où tu peux savoir tout seul, à coup sûr, que '
      + 'tu as juste.',
  },

  entrainement: [
    // ── Palier 1 : rassembler les x, coefficient final positif ──────────────
    {
      id: 'e-11-3-1', type: 'calcul', palier: 1, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '5x + 2 = 3x + 14', attendu: 6,
      fausses: [
        { valeur: 10, piege: 'transposition-du-coefficient' },
        { valeur: 7, piege: 'operation-sur-un-seul-membre' },
      ],
    },
    {
      id: 'e-11-3-2', type: 'calcul', palier: 1, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '6x - 4 = 2x + 16', attendu: 5,
      fausses: [
        { valeur: 16, piege: 'transposition-du-coefficient' },
        { valeur: 4, piege: 'operation-sur-un-seul-membre' },
      ],
    },
    {
      // Neutre : une fois les x rassemblés, il ne reste qu'UN seul x — le
      // coefficient vaut 1, il n'y a rien à diviser, et le piège du coefficient
      // ne peut donc pas jouer. Sans cet item, « une équation finit toujours
      // par une division » deviendrait la règle, et l'élève chercherait une
      // division là où il n'y en a pas. L'erreur encore possible ici est
      // ailleurs : ne retrancher le 7 que du membre de gauche.
      id: 'e-11-3-3', type: 'calcul', palier: 1, neutre: true, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '5x + 7 = 4x + 11', attendu: 4,
      fausses: [
        { valeur: 11, piege: 'operation-sur-un-seul-membre' },
      ],
    },

    // ── Palier 2 : coefficient négatif, solution négative ───────────────────
    {
      id: 'e-11-3-4', type: 'calcul', palier: 2, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '2x + 9 = 6x - 3', attendu: 3,
      fausses: [
        { valeur: -8, piege: 'transposition-du-coefficient' },
        { valeur: -3, piege: 'solution-non-verifiee' },
      ],
    },
    {
      id: 'e-11-3-5', type: 'calcul', palier: 2, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '5x + 12 = 2x + 3', attendu: -3,
      fausses: [
        { valeur: -12, piege: 'transposition-du-coefficient' },
        { valeur: 1, piege: 'operation-sur-un-seul-membre' },
      ],
    },
    {
      id: 'e-11-3-6', type: 'calcul', palier: 2, piege: 'transposition-du-coefficient',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: 'x + 4 = 5x + 20', attendu: -4,
      fausses: [
        { valeur: 20, piege: 'transposition-du-coefficient' },
        { valeur: -5, piege: 'operation-sur-un-seul-membre' },
      ],
    },

    // ── Palier 3 : développer d'abord, puis relire une résolution ───────────
    {
      id: 'e-11-3-7', type: 'calcul', palier: 3, piege: 'transposition-du-coefficient',
      consigne: 'Développe d\'abord, puis résous cette équation. Donne la valeur de x.',
      enonce: '3(x - 2) = x + 8', attendu: 7,
      fausses: [
        { valeur: 12, piege: 'transposition-du-coefficient' },
        { valeur: 4, piege: 'operation-sur-un-seul-membre' },
      ],
    },
    {
      // La résolution est juste jusqu'à la dernière ligne, et c'est ce qui la
      // rend instructive : trois lignes de méthode correcte n'empêchent pas la
      // formule récitée de tout gâcher au moment où le coefficient apparaît.
      id: 'e-11-3-8', type: 'corriger', palier: 3, piege: 'transposition-du-coefficient',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '8x - 5 = 3x + 20',
      lignes: [
        { texte: '8x − 5 = 3x + 20', fausse: false },
        { texte: 'Je retranche 3x aux deux membres et j\'ajoute 5 aux deux membres : 8x − 3x = 20 + 5', fausse: false },
        { texte: '5x = 25', fausse: false },
        { texte: 'Le 5 passe de l\'autre côté en changeant de signe : x = 25 − 5 = 20', fausse: true },
      ],
      explication:
        'Les trois premières lignes sont justes : les x sont bien rassemblés et '
        + '5x = 25 est correct. C\'est à la dernière que ça casse. Le 5 n\'est pas '
        + 'ajouté à x, il le **multiplie** : c\'est une division qui l\'annule, pas '
        + 'une soustraction. On divise donc les deux membres par 5, et x = 5. '
        + 'Contrôle : 8 × 5 − 5 = 35 et 3 × 5 + 20 = 35.',
    },
    {
      id: 'e-11-3-9', type: 'corriger', palier: 3, piege: 'operation-sur-un-seul-membre',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '5x + 6 = 2x + 15',
      lignes: [
        { texte: '5x + 6 = 2x + 15', fausse: false },
        { texte: 'Je retranche 2x aux deux membres : 3x + 6 = 15', fausse: false },
        { texte: 'Je retranche 6 au membre de gauche : 3x = 15', fausse: true },
        { texte: 'Je divise les deux membres par 3 : x = 5', fausse: false },
      ],
      explication:
        'La dernière ligne est correcte — mais elle divise une égalité déjà '
        + 'fausse. L\'erreur est à la troisième : le 6 n\'a été retranché qu\'à '
        + 'gauche. Le membre de droite doit subir la même soustraction : '
        + '15 − 6 = 9, donc 3x = 9 et x = 3. Contrôle : 5 × 3 + 6 = 21 et '
        + '2 × 3 + 15 = 21.',
    },
    {
      id: 'e-11-3-10', type: 'vraifaux', palier: 3, piege: 'operation-sur-un-seul-membre',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Ajouter un nombre au membre de gauche d\'une équation, sans rien changer '
        + 'à droite, ne modifie pas sa solution.',
      attendu: false,
      contreExemple: {
        invite:
          'L\'équation 2x = 8 a pour solution 4. Donne un nombre qui, ajouté au '
          + 'membre de gauche seulement, change cette solution.',
        champs: [{ id: 'a', etiquette: 'nombre ajouté à gauche' }],
        // On vérifie la PROPRIÉTÉ — la solution de 2x + a = 8 n'est plus 4 — et
        // non une valeur imposée : n'importe quel nombre non nul convient, et
        // c'est exactement ce que l'élève doit constater.
        valide: (a) => Number.isFinite(a) && (8 - a) / 2 !== 4,
        temoin: [6],
        exemple:
          'Avec 6 : l\'équation devient 2x + 6 = 8, dont la solution est 1 et non '
          + 'plus 4. La balance a penché, donc l\'équilibre s\'est déplacé.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-11-3-1',
      enonce:
        'Un service de vélos en libre-service propose deux offres. L\'offre A '
        + 'coûte 18 € d\'abonnement, puis 2 € par trajet. L\'offre B n\'a pas '
        + 'd\'abonnement, mais coûte 5 € par trajet.',
      questions: [
        { texte: 'Combien coûte l\'offre A pour 4 trajets ?', attendu: 26, unite: '€' },
        { texte: 'Combien coûte l\'offre B pour 4 trajets ?', attendu: 20, unite: '€' },
        { texte: 'Pour combien de trajets les deux offres coûtent-elles le même prix ?', attendu: 6, unite: 'trajets' },
      ],
    },
    {
      id: 'p-11-3-2',
      enonce:
        'Deux cuves sont surveillées à partir du même instant. La première '
        + 'contient 120 L et se vide de 8 L par minute. La seconde contient 40 L '
        + 'et se remplit de 12 L par minute.',
      questions: [
        { texte: 'Combien la première cuve contient-elle après 3 minutes ?', attendu: 96, unite: 'L' },
        { texte: 'Au bout de combien de minutes les deux cuves contiennent-elles le même volume ?', attendu: 4, unite: 'min' },
        { texte: 'Quel est alors ce volume commun ?', attendu: 88, unite: 'L' },
      ],
    },
    {
      id: 'p-11-3-3',
      enonce:
        'Aujourd\'hui, Léa a 32 ans et sa nièce Anaïs en a 8. Chaque année qui '
        + 'passe les fait vieillir toutes les deux d\'un an.',
      questions: [
        { texte: 'Dans combien d\'années Léa aura-t-elle exactement le triple de l\'âge d\'Anaïs ?', attendu: 4, unite: 'ans' },
        { texte: 'Quel âge Léa aura-t-elle à ce moment-là ?', attendu: 36, unite: 'ans' },
      ],
    },
    {
      id: 'p-11-3-4',
      enonce:
        'Un triangle isocèle a deux côtés de même longueur x cm et une base de '
        + '8 cm. Un carré a pour côté x − 3 cm. Ces deux figures ont le même '
        + 'périmètre.',
      questions: [
        { texte: 'Quelle est la valeur de x, en centimètres ?', attendu: 10, unite: 'cm' },
        { texte: 'Quel est alors le périmètre commun aux deux figures ?', attendu: 28, unite: 'cm' },
      ],
    },
    {
      id: 'p-11-3-5',
      enonce:
        'Deux programmes de calcul sont affichés au tableau. Programme A : '
        + '« choisis un nombre, multiplie-le par 5, puis ajoute 4 ». Programme B : '
        + '« choisis un nombre, multiplie-le par 2, puis ajoute 19 ».',
      questions: [
        { texte: 'Quel résultat donne le programme A en partant de 3 ?', attendu: 19 },
        { texte: 'Quel résultat donne le programme B en partant de 3 ?', attendu: 25 },
        { texte: 'Pour quel nombre de départ les deux programmes donnent-ils le même résultat ?', attendu: 5 },
      ],
    },
  ],

  test: [
    {
      id: 't-11-3-1', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '4x + 5 = x + 23', attendu: 6,
      fausses: [{ valeur: 15, piege: 'transposition-du-coefficient' }],
      revoir: 'propriete',
    },
    {
      id: 't-11-3-2', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '7x - 2 = 3x + 14', attendu: 4,
      fausses: [{ valeur: 12, piege: 'transposition-du-coefficient' }],
      revoir: 'propriete',
    },
    {
      id: 't-11-3-3', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '2x + 11 = 5x + 2', attendu: 3,
      fausses: [{ valeur: 6, piege: 'transposition-du-coefficient' }],
      revoir: 'remarque',
    },
    {
      id: 't-11-3-4', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '6x + 19 = 2x + 3', attendu: -4,
      fausses: [{ valeur: -12, piege: 'transposition-du-coefficient' }],
      revoir: 'exemple',
    },
    {
      id: 't-11-3-5', type: 'calcul',
      consigne: 'Résous cette équation. Donne la valeur de x.',
      enonce: '5x + 1 = 8x + 7', attendu: -2,
      fausses: [{ valeur: -9, piege: 'transposition-du-coefficient' }],
      revoir: 'remarque',
    },
    {
      id: 't-11-3-6', type: 'trous',
      consigne: 'On veut que 5 soit solution de cette équation. Quel nombre doit remplacer le carré ?',
      enonce: '3x + \\square = x + 12',
      champs: [{ id: 'a', attendu: 2 }],
      fausses: [{ valeur: -3, piege: 'operation-sur-un-seul-membre' }],
      revoir: 'propriete',
    },
    {
      id: 't-11-3-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '6x + 5 = 2x + 29 \\quad \\text{a pour solution} \\quad x = 6', attendu: true,
      explication:
        'Oui. En remplaçant x par 6 : le membre de gauche donne 6 × 6 + 5 = 41, '
        + 'et le membre de droite 2 × 6 + 29 = 41. Les deux membres donnent le '
        + 'même nombre, donc 6 est bien solution.',
      revoir: 'exemple',
    },
    {
      id: 't-11-3-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '3x + 8 = 7x - 4 \\quad \\text{a pour solution} \\quad x = 8', attendu: false,
      explication:
        'Non. En remplaçant x par 8 : à gauche 3 × 8 + 8 = 32, à droite '
        + '7 × 8 − 4 = 52. Les deux membres ne donnent pas le même nombre. En '
        + 'rassemblant, on obtient 12 = 4x : le 4 multiplie x, on divise donc par '
        + '4 et la solution est 3. Contrôle : 3 × 3 + 8 = 17 et 7 × 3 − 4 = 17.',
      piege: 'transposition-du-coefficient', revoir: 'remarque',
    },
    {
      id: 't-11-3-9', type: 'corriger',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '4x + 9 = 10x - 3',
      lignes: [
        { texte: '4x + 9 = 10x − 3', fausse: false },
        { texte: 'Je retranche 10x aux deux membres : −6x + 9 = −3', fausse: false },
        { texte: 'Je retranche 9 au membre de gauche : −6x = −3', fausse: true },
        { texte: 'Je divise les deux membres par −6 : x = 0,5', fausse: false },
      ],
      explication:
        'La deuxième ligne est juste, y compris son coefficient négatif : −6x '
        + 'n\'a rien d\'anormal. L\'erreur est à la troisième — le 9 n\'a été '
        + 'retranché qu\'à gauche. À droite aussi : −3 − 9 = −12, donc −6x = −12 '
        + 'et x = 2. Contrôle : 4 × 2 + 9 = 17 et 10 × 2 − 3 = 17.',
      piege: 'operation-sur-un-seul-membre', revoir: 'propriete',
    },
    {
      id: 't-11-3-10', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      affirmation:
        'Pour savoir si un nombre est solution d\'une équation, il suffit de le '
        + 'remplacer dans l\'équation de départ et de vérifier que les deux '
        + 'membres donnent le même résultat.',
      attendu: true,
      revoir: 'propriete',
    },
  ],
};
