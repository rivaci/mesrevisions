// Chapitre 4, savoir-faire 3 — Soustraire deux fractions.
//
// L'addition est déjà passée (sf-4-2) : la mise au même dénominateur n'est
// donc plus la nouveauté. Ce qui est neuf ici, et ce qui produit presque
// toutes les erreurs, tient en une phrase : la soustraction n'est pas
// symétrique.
//
// ── Pourquoi tout le savoir-faire tourne autour du signe ──────────────────
//
// Devant 2/5 − 3/4, l'élève de 4e a un réflexe hérité du primaire : soustraire
// le petit du grand, parce qu'« on ne peut pas enlever plus qu'on n'a ». Il
// calcule donc 3/4 − 2/5 et rend 7/20 — un nombre juste, obtenu par un calcul
// faux, ce qui le rend particulièrement difficile à débusquer seul.
//
// D'où le choix de bout en bout : l'activité fait rencontrer le cas négatif
// AVANT toute règle, la méthode installe la comparaison comme geste préalable,
// et le contrôle proposé n'est pas « refais le calcul » mais « compare d'abord,
// tu sauras quel signe attendre ». C'est ce qui permet de s'apercevoir seul de
// l'erreur : le signe est prévisible sans calculer.
//
// ── Le neutre, et ce qu'il empêche ────────────────────────────────────────
//
// Avec autant de résultats négatifs, une stratégie de surface guette : « dans
// ce chapitre, on met un moins ». L'item neutre (5/6 − 3/4) donne un résultat
// positif alors que rien, à l'œil, ne le laissait prévoir — il faut vraiment
// comparer pour trancher.

export default {
  id: 'sf-4-3',
  titre: 'Soustraire deux fractions',
  attendus: [
    'Il calcule la différence de deux nombres rationnels de dénominateurs quelconques.',
    'Il calcule mentalement : 3/4 − 1/8 ; 5/6 − 1/3.',
  ],

  // Deux copies plutôt qu'une suite de lignes : l'enjeu n'est pas une
  // technique à prolonger, c'est un désaccord à trancher. Sacha fait
  // exactement ce que la classe fera, et son résultat a l'air propre.
  decouvrir: {
    titre: 'Deux copies, deux résultats opposés',
    texte:
      'On demande de calculer 2/5 − 3/4. Les deux élèves ont trouvé le même '
      + 'dénominateur commun, 20, mais pas la même réponse.',
    copies: [
      { nom: 'Sacha', calcul: '3/4 − 2/5 = 15/20 − 8/20', resultat: '7/20' },
      { nom: 'Inès', calcul: '2/5 − 3/4 = 8/20 − 15/20', resultat: '?' },
    ],
    question:
      'Sacha a échangé les deux fractions pour éviter d\'enlever 15 à 8. Inès a '
      + 'gardé l\'ordre de l\'énoncé : termine son calcul.',
    champs: [
      { id: 'a', etiquette: 'numérateur trouvé par Inès :', attendu: -7 },
      { id: 'b', etiquette: 'dénominateur :', attendu: 20 },
    ],
    conclusion:
      'Inès trouve **−7/20**, et c\'est la bonne réponse. 2/5 − 3/4 et 3/4 − 2/5 '
      + 'ne sont pas le même calcul : ils donnent deux résultats **opposés**. Un '
      + 'résultat négatif n\'est pas le signe d\'une erreur — c\'est une réponse.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Mettre au même dénominateur',
      texte:
        'Mettre deux fractions au **même dénominateur**, c\'est les réécrire avec '
        + 'le même nombre en bas, sans changer leur valeur : on multiplie le '
        + 'numérateur **et** le dénominateur par un même nombre.\n'
        + 'Ainsi 1/3 = 2/6 = 4/12 : c\'est le même nombre, écrit avec des parts '
        + 'de plus en plus petites.',
    },
    {
      type: 'propriete',
      titre: 'Soustraire deux fractions',
      texte:
        'Quand les dénominateurs sont **les mêmes**, on soustrait les numérateurs '
        + 'et on **garde** le dénominateur :\n'
        + 'a/c − b/c = (a − b)/c.\n'
        + 'Quand ils sont différents, on commence par mettre les deux fractions au '
        + 'même dénominateur.',
    },
    {
      type: 'remarque',
      titre: 'L\'ordre compte, et le résultat peut être négatif',
      texte:
        'a/c − b/c n\'est **pas** b/c − a/c : les deux résultats sont opposés. Si la '
        + 'seconde fraction est la plus grande, la différence est **négative**, et '
        + 'c\'est une réponse valable.\n'
        + 'Le signe porte sur toute la fraction : −7/20 s\'écrit aussi (−7)/20. Le '
        + 'placer au numérateur dès le départ évite de le perdre en route.',
    },
    {
      type: 'exemple',
      texte:
        '5/6 − 1/4 = 10/12 − 3/12 = 7/12   ·   2/5 − 3/4 = 8/20 − 15/20 = −7/20',
    },
  ],

  methode: {
    titre: 'Soustraire en sachant d\'avance le signe',
    enonce: 'Calculer A = 3/8 − 5/6.',
    etapes: [
      {
        texte: 'Avant tout, je compare : 3/8 est inférieur à la moitié, 5/6 la dépasse largement. Donc 3/8 < 5/6.',
        note: 'Je sais déjà que A sera négatif.',
      },
      {
        texte: 'Je cherche un dénominateur commun à 8 et 6 : 24 convient, car 8 × 3 = 24 et 6 × 4 = 24.',
        note: '8 × 6 = 48 marcherait aussi, mais 24 donne des nombres plus faciles.',
      },
      {
        texte: 'Je convertis les deux : 3/8 = 9/24 (× 3 en haut et en bas) et 5/6 = 20/24 (× 4 en haut et en bas).',
        note: 'Le numérateur suit toujours le dénominateur.',
      },
      {
        texte: 'Je soustrais les numérateurs dans l\'ordre de l\'énoncé : 9 − 20 = −11. Donc A = −11/24.',
        note: 'Le dénominateur, lui, ne bouge pas.',
      },
    ],
    controle:
      'Le contrôle : compare les deux fractions AVANT de calculer. Tu sais alors '
      + 'quel signe attendre, et un résultat de 11/24 se repère tout seul comme une '
      + 'soustraction faite à l\'envers.',
  },

  entrainement: [
    {
      id: 'e-4-3-1', type: 'fraction', palier: 1, piege: 'addition-terme-a-terme',
      consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{5}{7} - \\dfrac{2}{7}', attendu: [3, 7],
    },
    {
      // La comparaison est le geste de contrôle du savoir-faire, donc elle
      // s'entraîne ici et pas seulement dans le savoir-faire précédent : c'est
      // elle qui donne le signe avant même de calculer.
      id: 'e-4-3-2', type: 'comparer', palier: 1, piege: 'comparaison-par-les-numerateurs',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{3}{8} \\ldots \\dfrac{2}{5}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'comparaison-par-les-numerateurs' }],
    },
    {
      id: 'e-4-3-3', type: 'fraction', palier: 1, piege: 'denominateur-non-reporte',
      consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{3}{4} - \\dfrac{1}{8}', attendu: [5, 8],
    },
    {
      id: 'e-4-3-4', type: 'trous', palier: 2, piege: 'denominateur-non-reporte',
      consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\dfrac{5}{6} = \\dfrac{\\square}{24}',
      champs: [{ id: 'a', attendu: 20 }],
      fausses: [{ valeur: 5, piege: 'denominateur-non-reporte' }],
    },
    {
      // Neutre : le résultat est POSITIF, alors que ni les numérateurs ni les
      // dénominateurs ne le laissaient deviner (5 > 3 et 6 > 4). L'élève qui
      // soustrait systématiquement le plus petit du plus grand tombe juste
      // ici — donc rien ne le trahit, et rien ne permet non plus d'apprendre
      // « dans ce chapitre, la réponse est négative ». Il faut comparer.
      id: 'e-4-3-5', type: 'fraction', palier: 2, neutre: true, piege: 'soustraction-inversee',
      consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{5}{6} - \\dfrac{3}{4}', attendu: [1, 12],
    },
    {
      id: 'e-4-3-6', type: 'fraction', palier: 2, piege: 'soustraction-inversee',
      consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{2}{5} - \\dfrac{3}{4}', attendu: [-7, 20],
    },
    {
      id: 'e-4-3-7', type: 'plausible', palier: 2, piege: 'addition-terme-a-terme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{7}{8} - \\dfrac{2}{3} = \\dfrac{5}{5}', attendu: false,
      explication:
        'Non : 5/5 vaut 1. Or 7/8 est déjà plus petit que 1, et on lui enlève '
        + 'encore quelque chose — le résultat ne peut pas valoir 1. Ici les '
        + 'numérateurs et les dénominateurs ont été soustraits séparément. Au '
        + 'dénominateur commun 24 : 21/24 − 16/24 = **5/24**.',
    },
    {
      // Un plausible qui vaut true ET dont la réponse est négative : la
      // vérification porte sur le signe, pas sur le calcul complet.
      id: 'e-4-3-8', type: 'plausible', palier: 3, piege: 'signe-de-fraction-perdu',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5}{12} - \\dfrac{7}{8} = -\\dfrac{11}{24}', attendu: true,
      explication:
        'Oui : 5/12 est inférieur à la moitié, 7/8 est tout proche de 1, donc la '
        + 'différence est bien **négative**. Au dénominateur commun 24 : '
        + '10/24 − 21/24 = −11/24.',
    },
    {
      id: 'e-4-3-9', type: 'corriger', palier: 3, piege: 'denominateur-non-reporte',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{7}{10} - \\dfrac{2}{5}',
      lignes: [
        { texte: '7/10 − 2/5', fausse: false },
        { texte: '= 7/10 − 2/10', fausse: true },
        { texte: '= 5/10 = 1/2', fausse: false },
      ],
      explication:
        'C\'est la deuxième ligne qui casse : le dénominateur est passé de 5 à 10, '
        + 'mais le numérateur est resté à 2. Il faut multiplier les deux par 2, donc '
        + '2/5 = 4/10. Le bon calcul est 7/10 − 4/10 = **3/10**. La troisième ligne '
        + 'calcule juste, mais à partir d\'une écriture déjà fausse.',
    },
    {
      id: 'e-4-3-10', type: 'vraifaux', palier: 3, piege: 'soustraction-inversee',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'La différence de deux fractions positives est toujours positive.',
      attendu: false,
      contreExemple: {
        invite: 'Choisis deux numérateurs a et b pour que a/12 − b/12 soit négatif.',
        champs: [{ id: 'a', etiquette: 'numérateur a' }, { id: 'b', etiquette: 'numérateur b' }],
        // On vérifie la propriété « la seconde est la plus grande » : tous les
        // couples qui la respectent conviennent, l'élève choisit les siens.
        valide: (a, b) => Number.isInteger(a) && Number.isInteger(b)
          && a > 0 && b > 0 && a < b,
        exemple: 'Avec a = 5 et b = 7 : 5/12 − 7/12 = −2/12, c\'est-à-dire −1/6.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-4-3-1',
      enonce:
        'Une bouteille contient 3/4 de litre de sirop. On en verse 1/6 de litre '
        + 'dans une carafe.',
      questions: [
        { texte: 'Quel est le plus petit dénominateur commun à 4 et 6 ?', attendu: 12 },
        { texte: 'La quantité restante s\'écrit en douzièmes de litre : quel est son numérateur ?', attendu: 7 },
      ],
    },
    {
      id: 'p-4-3-2',
      enonce:
        'Sur un parcours de course d\'orientation, Léa a franchi 5/8 du trajet et '
        + 'Tom seulement 2/5. On veut l\'écart entre les deux, c\'est-à-dire la part '
        + 'de Léa moins celle de Tom.',
      questions: [
        { texte: 'Quel est le plus petit dénominateur commun à 8 et 5 ?', attendu: 40 },
        { texte: 'Quel est le numérateur de l\'écart, exprimé en quarantièmes ?', attendu: 9 },
      ],
    },
    {
      // Le seul problème dont la réponse est négative, et l'énoncé impose
      // l'ordre : c'est la part de Sacha moins celle d'Inès, pas l'inverse.
      id: 'p-4-3-3',
      enonce:
        'Sacha a lu 2/7 de son livre, Inès en a lu la moitié. On calcule la part de '
        + 'Sacha moins la part d\'Inès, dans cet ordre.',
      questions: [
        { texte: 'Quel est le plus petit dénominateur commun aux deux fractions ?', attendu: 14 },
        { texte: 'Le résultat s\'écrit en quatorzièmes : quel est son numérateur, signe compris ?', attendu: -3 },
      ],
    },
    {
      id: 'p-4-3-4',
      enonce:
        'Un ruban mesure 60 cm. On y découpe une première bande représentant 2/5 du '
        + 'ruban, puis une seconde représentant 1/4 du ruban.',
      questions: [
        { texte: 'Quelle est la longueur de la première bande ?', attendu: 24, unite: 'cm' },
        { texte: 'Quelle est la longueur de la seconde ?', attendu: 15, unite: 'cm' },
        { texte: 'De combien de centimètres la première dépasse-t-elle la seconde ?', attendu: 9, unite: 'cm' },
      ],
    },
    {
      id: 'p-4-3-5',
      enonce:
        'Une cuve de 240 litres est remplie aux 5/8 de sa capacité. On en retire '
        + 'ensuite le tiers de sa capacité totale.',
      questions: [
        { texte: 'Combien de litres contient-elle au départ ?', attendu: 150, unite: 'L' },
        { texte: 'Combien de litres retire-t-on ?', attendu: 80, unite: 'L' },
        { texte: 'Combien de litres reste-t-il ?', attendu: 70, unite: 'L' },
      ],
    },
  ],

  test: [
    {
      id: 't-4-3-1', type: 'fraction', consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{7}{9} - \\dfrac{2}{9}', attendu: [5, 9], revoir: 'propriete',
    },
    {
      id: 't-4-3-2', type: 'fraction', consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{2}{3} - \\dfrac{1}{6}', attendu: [1, 2], revoir: 'definition',
    },
    {
      id: 't-4-3-3', type: 'fraction', consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{1}{4} - \\dfrac{2}{3}', attendu: [-5, 12], revoir: 'remarque',
    },
    {
      id: 't-4-3-4', type: 'trous', consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\dfrac{3}{4} = \\dfrac{\\square}{20}',
      champs: [{ id: 'a', attendu: 15 }],
      fausses: [{ valeur: 3, piege: 'denominateur-non-reporte' }],
      revoir: 'definition',
    },
    {
      id: 't-4-3-5', type: 'fraction', consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{5}{6} - \\dfrac{2}{5}', attendu: [13, 30], revoir: 'propriete',
    },
    {
      // Ici c'est le dénominateur qui trompe : 18 est plus grand que 12, mais
      // 5/18 reste plus petit que 7/12.
      id: 't-4-3-6', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{7}{12} \\ldots \\dfrac{5}{18}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'grand-denominateur-grande-fraction' }],
      revoir: 'definition',
    },
    {
      id: 't-4-3-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5}{6} - \\dfrac{1}{4} = \\dfrac{4}{2}', attendu: false,
      explication:
        'Non : 4/2 vaut 2, alors que 5/6 est plus petit que 1. Les numérateurs et '
        + 'les dénominateurs ont été soustraits séparément. Au dénominateur commun '
        + '12 : 10/12 − 3/12 = **7/12**.',
      piege: 'addition-terme-a-terme', revoir: 'propriete',
    },
    {
      id: 't-4-3-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{3}{10} - \\dfrac{4}{5} = -\\dfrac{1}{2}', attendu: true,
      explication:
        'Oui : 3/10 est plus petit que 4/5, donc la différence est négative. En '
        + 'dixièmes : 3/10 − 8/10 = −5/10, soit −1/2.',
      revoir: 'remarque',
    },
    {
      id: 't-4-3-9', type: 'fraction', consigne: 'Calcule et simplifie si c\'est possible.',
      enonce: '\\dfrac{7}{12} - \\dfrac{3}{8}', attendu: [5, 24], revoir: 'propriete',
    },
    {
      id: 't-4-3-10', type: 'corriger', consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{1}{6} - \\dfrac{3}{4}',
      lignes: [
        { texte: '1/6 − 3/4', fausse: false },
        { texte: '= 2/12 − 9/12', fausse: false },
        { texte: '= 9/12 − 2/12 = 7/12', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes. À la troisième, les deux fractions '
        + 'ont été échangées pour éviter d\'enlever 9 à 2. Il faut garder l\'ordre de '
        + 'l\'énoncé : 2 − 9 = −7, donc le résultat est **−7/12**.',
      piege: 'soustraction-inversee', revoir: 'remarque',
    },
  ],
};
