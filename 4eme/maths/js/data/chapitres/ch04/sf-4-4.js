// Chapitre 4, savoir-faire 4 — Enchaîner des additions et des soustractions
// de nombres rationnels.
//
// ── Ce que ce savoir-faire ajoute aux précédents ──────────────────────────
//
// Additionner deux fractions est déjà acquis ici. Ce qui est neuf, c'est la
// CHAÎNE : trois termes, parfois une parenthèse, parfois une fraction
// négative. Et une chaîne de soustractions n'est pas commutative — c'est là
// que tout se joue. 5/6 − 1/3 − 1/6 ne vaut pas 5/6 − (1/3 − 1/6), et
// l'élève qui « regroupe ce qui se ressemble » invente une parenthèse.
//
// ── Le piège du moment, et ses neutres ────────────────────────────────────
//
// Le piège dominant est « soustraction-inversee », sous ses deux faces :
// retourner a − b en b − a pour éviter un résultat négatif, et perdre l'ordre
// des termes en passant au dénominateur commun. Deux items neutres le
// désamorcent : l'un est une différence dont le résultat est POSITIF (sans
// lui, « une soustraction de fractions donne un négatif » deviendrait la
// règle apprise), l'autre est un calcul juste qu'on demande de valider (sans
// lui, « on me demande si c'est plausible, donc c'est faux » suffirait).
//
// Le geste de contrôle du chapitre est la comparaison : savoir laquelle des
// deux fractions est la plus grande AVANT de soustraire, c'est connaître le
// signe du résultat avant de l'avoir calculé. C'est pour cette raison que
// deux items de comparaison figurent dans l'auto-évaluation.

export default {
  id: 'sf-4-4',
  titre: 'Enchaîner des additions et des soustractions',
  attendus: [
    'Il effectue une suite d\'additions et de soustractions de nombres rationnels.',
  ],

  // On ne dit pas « les soustractions s'enchaînent de gauche à droite » : on
  // montre deux copies qui donnent deux résultats différents sur le même
  // calcul. L'élève constate d'abord que l'ordre change tout ; la règle vient
  // ensuite nommer ce qu'il a vu.
  decouvrir: {
    titre: 'Deux façons de s\'y prendre, deux résultats',
    texte:
      'On demande de calculer 5/6 − 1/3 − 1/6. Sacha commence par les deux '
      + 'dernières fractions, qui se ressemblent. Inès prend le calcul dans '
      + 'l\'ordre où il est écrit.',
    copies: [
      { nom: 'Sacha', calcul: '1/3 − 1/6 = 2/6 − 1/6 = 1/6, puis 5/6 − 1/6 = 4/6', resultat: '2/3' },
      { nom: 'Inès', calcul: '5/6 − 1/3 = 5/6 − 2/6 = 3/6, puis 3/6 − 1/6 = 2/6', resultat: '1/3' },
    ],
    question:
      'Une seule des deux méthodes est correcte. Écris le résultat juste, '
      + 'simplifié au maximum.',
    champs: [
      { id: 'a', etiquette: 'numérateur', attendu: 1 },
      { id: 'b', etiquette: 'dénominateur', attendu: 3 },
    ],
    conclusion:
      'C\'est **Inès**. Les additions et les soustractions s\'enchaînent **de '
      + 'gauche à droite**. En commençant par la droite, Sacha a calculé en '
      + 'réalité 5/6 − (1/3 − 1/6) : il a **ajouté une parenthèse** que '
      + 'l\'énoncé ne contient pas.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Additionner ou soustraire deux fractions',
      texte:
        'Quand deux fractions ont le **même dénominateur**, on additionne ou on '
        + 'soustrait **les numérateurs seulement** : le dénominateur ne bouge pas.\n'
        + 'Sinon, on commence par les mettre au même dénominateur.',
    },
    {
      type: 'propriete',
      titre: 'Dans quel ordre enchaîner',
      texte:
        '1. Ce qui est entre **parenthèses** se calcule en premier.\n'
        + '2. Les additions et les soustractions s\'enchaînent ensuite **de gauche '
        + 'à droite**.\n'
        + 'Une soustraction ne se déplace pas : a − b − c n\'est pas a − (b − c).',
    },
    {
      type: 'remarque',
      titre: 'Un seul dénominateur pour tout le calcul',
      texte:
        'Avec trois termes, inutile de s\'y prendre deux fois : on cherche un '
        + 'dénominateur commun aux **trois** fractions dès le départ, puis on '
        + 'enchaîne les numérateurs dans l\'ordre.',
    },
    {
      type: 'remarque',
      titre: 'Où mettre le signe d\'une fraction négative',
      texte:
        'Le signe porte sur toute la fraction : −3/4 vaut la même chose que '
        + '(−3)/4. Écris-le **au numérateur** dès la première ligne, il ne se '
        + 'perdra pas en route.',
    },
    {
      type: 'exemple',
      texte:
        '2/3 + 1/4 − 1/2 = 8/12 + 3/12 − 6/12 = 5/12   ·   '
        + '1/4 − 2/3 = 3/12 − 8/12 = −5/12',
    },
  ],

  methode: {
    titre: 'Enchaîner sans perdre l\'ordre',
    enonce: 'Calculer A = 7/10 − (1/2 − 1/5).',
    etapes: [
      {
        texte: 'Il y a une parenthèse : je la calcule en premier.',
        note: 'Elle passe avant tout le reste.',
      },
      {
        texte: 'Dans la parenthèse : 1/2 = 5/10 et 1/5 = 2/10, donc 1/2 − 1/5 = 3/10.',
        note: '10 convient aux deux dénominateurs, 2 et 5.',
      },
      {
        texte: 'Je réécris le calcul en entier : A = 7/10 − 3/10.',
        note: 'Recopier l\'opération complète, dans le même ordre : c\'est là qu\'on l\'intervertit.',
      },
      {
        texte: 'Les dénominateurs sont égaux : A = 4/10, que je simplifie en 2/5.',
        note: 'On divise le haut et le bas par 2.',
      },
    ],
    controle:
      'Le contrôle : compare avant de conclure. La parenthèse vaut 3/10, plus '
      + 'petit que 7/10 : le résultat doit donc être positif et plus petit que '
      + '7/10. C\'est bien le cas de 2/5, qui vaut 4/10. Si tu trouves un '
      + 'résultat négatif, c\'est que la soustraction s\'est retournée.',
  },

  entrainement: [
    // Palier 1 — le cas où les dénominateurs sont déjà égaux, puis les deux
    // conversions de base. On installe le geste avant de l'enchaîner.
    {
      id: 'e-4-4-1', type: 'fraction', palier: 1, piege: 'addition-terme-a-terme',
      consigne: 'Calcule et donne le résultat simplifié au maximum.',
      enonce: '\\dfrac{5}{7} - \\dfrac{2}{7}', attendu: [3, 7],
      fausses: [{ valeur: '3/14', piege: 'addition-terme-a-terme' }],
    },
    {
      id: 'e-4-4-2', type: 'fraction', palier: 1, piege: 'addition-terme-a-terme',
      consigne: 'Calcule et donne le résultat simplifié au maximum.',
      enonce: '\\dfrac{1}{2} + \\dfrac{1}{3}', attendu: [5, 6],
      fausses: [{ valeur: '2/5', piege: 'addition-terme-a-terme' }],
    },
    {
      id: 'e-4-4-3', type: 'fraction', palier: 1, piege: 'denominateur-non-reporte',
      consigne: 'Calcule et donne le résultat simplifié au maximum.',
      enonce: '\\dfrac{3}{4} - \\dfrac{1}{8}', attendu: [5, 8],
      // 2/8, c'est 3/8 − 1/8 : le dénominateur a été changé sans toucher au
      // numérateur.
      fausses: [{ valeur: '2/8', piege: 'denominateur-non-reporte' }],
    },

    // Palier 2 — trois termes, et la découverte qu'une différence peut être
    // négative.
    {
      id: 'e-4-4-4', type: 'fraction', palier: 2, piege: 'denominateur-non-reporte',
      consigne: 'Calcule et donne le résultat simplifié au maximum.',
      enonce: '\\dfrac{3}{4} + \\dfrac{1}{5} - \\dfrac{1}{2}', attendu: [9, 20],
      // 1/6 vient de 2/12 + 1/12 − 1/12 : les trois dénominateurs ont été
      // remplacés par 12 sans que les numérateurs suivent.
      fausses: [{ valeur: '3/20', piege: 'denominateur-non-reporte' }],
    },
    {
      id: 'e-4-4-5', type: 'fraction', palier: 2, piege: 'soustraction-inversee',
      consigne: 'Calcule et donne le résultat simplifié au maximum.',
      enonce: '\\dfrac{1}{5} - \\dfrac{3}{4}', attendu: [-11, 20],
      fausses: [{ valeur: '11/20', piege: 'soustraction-inversee' }],
    },
    {
      // Item neutre : même forme que le précédent, mais la première fraction
      // est la plus grande, donc le résultat est positif. Sans lui, « une
      // soustraction de fractions donne un négatif » deviendrait la règle
      // apprise, et l'élève retournerait tout par réflexe.
      id: 'e-4-4-6', type: 'fraction', palier: 2, neutre: true, piege: 'soustraction-inversee',
      consigne: 'Calcule et donne le résultat simplifié au maximum.',
      enonce: '\\dfrac{5}{6} - \\dfrac{1}{4}', attendu: [7, 12],
    },
    {
      id: 'e-4-4-7', type: 'plausible', palier: 2, piege: 'addition-terme-a-terme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{2}{5} + \\dfrac{1}{3} = \\dfrac{3}{8}', attendu: false,
      explication:
        'Non : 2/5 vaut déjà presque 1/2, donc la somme dépasse forcément 1/2, '
        + 'alors que 3/8 est plus petit que 1/2. Les numérateurs ont été '
        + 'additionnés entre eux et les dénominateurs entre eux. Au même '
        + 'dénominateur : 6/15 + 5/15 = 11/15.',
    },

    // Palier 3 — fractions négatives, et l'ordre des termes mis à l'épreuve.
    {
      id: 'e-4-4-8', type: 'fraction', palier: 3, piege: 'signe-de-fraction-perdu',
      consigne: 'Calcule et donne le résultat simplifié au maximum.',
      enonce: '-\\dfrac{3}{4} + \\dfrac{1}{2} - \\dfrac{1}{8}', attendu: [-3, 8],
      // 9/8, c'est le calcul mené sans le signe du premier terme.
      fausses: [{ valeur: '9/8', piege: 'signe-de-fraction-perdu' }],
    },
    {
      // C'est l'erreur de Sacha dans l'activité, mise à plat ligne par ligne :
      // la parenthèse inventée. Le calcul qui suit est cohérent avec elle, ce
      // qui rend l'erreur invisible si on ne remonte pas à sa source.
      id: 'e-4-4-9', type: 'corriger', palier: 3, piege: 'soustraction-inversee',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{7}{8} - \\dfrac{1}{2} - \\dfrac{1}{8}',
      lignes: [
        { texte: '7/8 − 1/2 − 1/8', fausse: false },
        { texte: '= 7/8 − (4/8 − 1/8)', fausse: true },
        { texte: '= 7/8 − 3/8 = 4/8 = 1/2', fausse: false },
      ],
      explication:
        'La deuxième ligne ajoute une parenthèse que l\'énoncé ne contient pas. '
        + 'Sans elle, on enchaîne de gauche à droite : 7/8 − 4/8 = 3/8, puis '
        + '3/8 − 1/8 = 2/8, soit 1/4.',
    },
    {
      // Second item neutre : le calcul proposé est juste. Sans lui, « on me
      // demande si c'est plausible, donc c'est faux » suffirait à réussir tous
      // les items de ce type. Il est aussi long à vérifier que les autres.
      id: 'e-4-4-10', type: 'plausible', palier: 3, neutre: true, piege: 'addition-terme-a-terme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{3}{4} - \\dfrac{1}{3} - \\dfrac{1}{4} = \\dfrac{1}{6}', attendu: true,
      explication:
        'Oui : au dénominateur commun 12, le calcul devient 9/12 − 4/12 − 3/12 = '
        + '2/12, soit 1/6. L\'estimation le confirme aussi — on enlève à 3/4 un '
        + 'peu plus de la moitié de lui-même, il reste peu de chose.',
    },
  ],

  problemes: [
    {
      id: 'p-4-4-1',
      enonce:
        'Un pichet de jus est plein. Léa en boit le quart, puis Tom en boit le '
        + 'tiers.',
      questions: [
        { texte: 'Quelle part du pichet a été bue ? Donne le numérateur, le dénominateur étant 12.', attendu: 7 },
        { texte: 'Quelle part reste-t-il ? Donne le numérateur, toujours sur 12.', attendu: 5 },
      ],
    },
    {
      id: 'p-4-4-2',
      enonce:
        'Sur un circuit à vélo, Marc parcourt les deux cinquièmes du trajet le '
        + 'matin, puis le quart du trajet l\'après-midi.',
      questions: [
        { texte: 'Quelle part du circuit a-t-il parcourue en tout ? Donne le numérateur, le dénominateur étant 20.', attendu: 13 },
        { texte: 'Quelle part lui reste-t-il ? Numérateur sur 20.', attendu: 7 },
      ],
    },
    {
      id: 'p-4-4-3',
      enonce:
        'Sur une journée de 24 heures, Inès dort le tiers du temps et passe le '
        + 'quart de la journée au collège.',
      questions: [
        { texte: 'Combien d\'heures dort-elle ?', attendu: 8, unite: 'h' },
        { texte: 'Combien d\'heures ces deux activités prennent-elles à elles deux ?', attendu: 14, unite: 'h' },
        { texte: 'Combien d\'heures lui reste-t-il pour le reste de la journée ?', attendu: 10, unite: 'h' },
      ],
    },
    {
      id: 'p-4-4-4',
      enonce:
        'Un réservoir contient 60 litres d\'eau. On en utilise le tiers lundi, '
        + 'puis le quart de la contenance de départ mardi.',
      questions: [
        { texte: 'Combien de litres sont utilisés lundi ?', attendu: 20, unite: 'L' },
        { texte: 'Combien de litres sont utilisés sur les deux jours ?', attendu: 35, unite: 'L' },
        { texte: 'Combien de litres reste-t-il ?', attendu: 25, unite: 'L' },
      ],
    },
    {
      // Le seul problème dont la réponse finale est négative : la baisse
      // l'emporte sur la hausse. C'est le pendant, côté contexte, de l'item
      // e-4-4-5 — un résultat négatif est une réponse, pas une erreur.
      id: 'p-4-4-5',
      enonce:
        'Un thermomètre monte de trois quarts de degré dans la matinée, puis '
        + 'descend d\'un demi-degré, puis descend encore de deux tiers de degré.',
      questions: [
        { texte: 'Après la montée et la première baisse, la variation vaut un quart de degré. Quel en est le numérateur, sur 4 ?', attendu: 1 },
        { texte: 'Quelle est la variation totale de la journée ? Donne son numérateur, le dénominateur étant 12.', attendu: -5 },
      ],
    },
  ],

  test: [
    {
      id: 't-4-4-1', type: 'fraction', consigne: 'Calcule et simplifie au maximum.',
      enonce: '\\dfrac{1}{3} + \\dfrac{1}{4}', attendu: [7, 12],
      fausses: [{ valeur: '2/7', piege: 'addition-terme-a-terme' }],
      revoir: 'propriete',
    },
    {
      id: 't-4-4-2', type: 'fraction', consigne: 'Calcule et simplifie au maximum.',
      enonce: '\\dfrac{5}{8} - \\dfrac{1}{4}', attendu: [3, 8],
      fausses: [{ valeur: '4/8', piege: 'denominateur-non-reporte' }],
      revoir: 'propriete',
    },
    {
      // La comparaison est le geste de contrôle du savoir-faire : elle donne
      // le signe de la différence avant tout calcul. Ici les numérateurs
      // mènent à la mauvaise réponse.
      id: 't-4-4-3', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{3}{5} \\ldots \\dfrac{5}{9}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'comparaison-par-les-numerateurs' }],
      revoir: 'propriete',
    },
    {
      id: 't-4-4-4', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{1}{4} \\ldots \\dfrac{1}{3}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'grand-denominateur-grande-fraction' }],
      revoir: 'remarque',
    },
    {
      id: 't-4-4-5', type: 'fraction', consigne: 'Calcule et simplifie au maximum.',
      enonce: '\\dfrac{2}{3} - \\dfrac{5}{6}', attendu: [-1, 6],
      fausses: [{ valeur: '1/6', piege: 'soustraction-inversee' }],
      revoir: 'propriete',
    },
    {
      id: 't-4-4-6', type: 'fraction', consigne: 'Calcule et simplifie au maximum.',
      enonce: '\\dfrac{1}{2} + \\dfrac{1}{4} - \\dfrac{1}{8}', attendu: [5, 8],
      revoir: 'remarque',
    },
    {
      id: 't-4-4-7', type: 'fraction', consigne: 'Calcule et simplifie au maximum.',
      enonce: '-\\dfrac{2}{5} + \\dfrac{1}{2}', attendu: [1, 10],
      fausses: [{ valeur: '9/10', piege: 'signe-de-fraction-perdu' }],
      revoir: 'remarque',
    },
    {
      id: 't-4-4-8', type: 'fraction', consigne: 'Calcule et simplifie au maximum.',
      enonce: '\\dfrac{3}{4} - \\left( \\dfrac{1}{3} + \\dfrac{1}{4} \\right)', attendu: [1, 6],
      revoir: 'propriete',
    },
    {
      id: 't-4-4-9', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{2}{3} + \\dfrac{1}{5} = \\dfrac{3}{8}', attendu: false,
      explication:
        'Non : 2/3 dépasse déjà 1/2, donc la somme aussi — or 3/8 est plus petit '
        + 'que 1/2. Les numérateurs et les dénominateurs ont été additionnés '
        + 'séparément. Le vrai calcul donne 10/15 + 3/15 = 13/15.',
      piege: 'addition-terme-a-terme', revoir: 'propriete',
    },
    {
      id: 't-4-4-10', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5}{6} - \\dfrac{1}{3} - \\dfrac{1}{6} = \\dfrac{1}{3}', attendu: true,
      explication:
        'Oui : de gauche à droite, 5/6 − 2/6 = 3/6, puis 3/6 − 1/6 = 2/6, soit 1/3.',
      revoir: 'propriete',
    },
  ],
};
