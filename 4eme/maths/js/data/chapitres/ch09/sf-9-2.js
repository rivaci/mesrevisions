// Chapitre 9, savoir-faire 2 — Multiplier deux fractions.
//
// ── Le problème, et il vient du chapitre 4 ────────────────────────────────
//
// Ce savoir-faire arrive APRÈS « additionner deux fractions ». L'élève sort
// donc d'un chapitre entier où la première question à se poser était « quel
// dénominateur commun ? ». C'est un bon réflexe, chèrement acquis — et il ne
// sert à rien ici. Pire : il coûte du temps et, une fois les deux fractions
// écrites sur le même dénominateur, il invite à garder ce dénominateur, comme
// dans une somme. C'est le piège central du chapitre.
//
// On ne le combat pas en interdisant le dénominateur commun : on montre qu'il
// est INUTILE pour un produit, et l'exercice de correction va jusqu'à dire que
// le détour n'est même pas faux — seule la ligne suivante l'est. La nuance
// compte : « ne mets jamais au même dénominateur » serait une règle aussi
// fausse que celle qu'on corrige, et elle détruirait le chapitre 4.
//
// ── Les deux items neutres ────────────────────────────────────────────────
//
// Deux motifs de surface menacent, et chacun a son neutre :
//
//   — « dans ce chapitre, on ne met plus jamais au même dénominateur » :
//     l'item 6 est une SOMME glissée au milieu des produits, où le
//     dénominateur commun est indispensable. Le piège du chapitre n'y joue
//     pas, et c'est exactement pour ça qu'il est là.
//   — « multiplier des fractions, ça rend toujours plus petit » : l'item 8
//     propose un produit de deux fractions supérieures à 1, donc plus grand
//     que chacune. La règle « multiplier diminue » n'y joue pas non plus.
//
// ── Simplifier avant de multiplier ────────────────────────────────────────
//
// Le programme le demande, et ce n'est pas de l'élégance : sans ça, 5/8 × 4/15
// devient 20/120, un nombre qu'il faut ensuite savoir réduire par 20. La
// méthode fait donc le geste dans l'ordre où il coûte le moins cher.

export default {
  id: 'sf-9-2',
  titre: 'Multiplier deux fractions',
  attendus: [
    'Il calcule le produit de nombres rationnels.',
    'Il donne le résultat sous forme d\'une fraction simplifiée au maximum.',
  ],

  // On ne donne pas la règle : on la fait SORTIR d'un comptage de carrés. Le
  // 6 et le 12 apparaissent avant qu'on dise d'où ils viennent, et l'élève
  // constate lui-même qu'aucun dénominateur commun n'a été utilisé.
  decouvrir: {
    titre: 'Les deux tiers des trois quarts',
    texte:
      'Une tablette de chocolat compte 12 carrés, rangés en 3 rangées de 4. '
      + 'Camille en prend les 3/4, puis mange les 2/3 de ce qu\'elle a pris.',
    lignes: [
      { calcul: 'la tablette entière', resultat: '12 carrés' },
      { calcul: 'les 3/4 de la tablette', resultat: '9 carrés' },
    ],
    question:
      'Camille a donc 9 carrés dans la main, et elle en mange les 2/3. Combien '
      + 'en mange-t-elle ? Et combien lui en reste-t-il ensuite dans la main ?',
    champs: [
      { id: 'a', etiquette: 'carrés mangés :', attendu: 6 },
      { id: 'b', etiquette: 'carrés restants dans la main :', attendu: 3 },
    ],
    conclusion:
      'Camille a mangé 6 carrés sur les 12 de la tablette, soit 6/12, c\'est-à-dire '
      + '**1/2**. Autrement dit : 2/3 × 3/4 = 1/2.\n'
      + 'Regarde d\'où viennent ces deux nombres : 6 = 2 × 3, les deux **numérateurs**, '
      + 'et 12 = 3 × 4, les deux **dénominateurs**. À aucun moment on n\'a eu besoin '
      + 'd\'un dénominateur commun — c\'est la **somme** qui en avait besoin, pas le '
      + 'produit.\n'
      + 'Et remarque au passage : 1/2 est plus **petit** que 3/4. Multiplier par 2/3, '
      + 'c\'est en prendre une part seulement.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Produit de deux fractions',
      texte:
        'Pour multiplier deux fractions, on multiplie les **numérateurs** entre eux '
        + 'et les **dénominateurs** entre eux :\n'
        + '(a/b) × (c/d) = (a × c)/(b × d).\n'
        + 'Aucun **dénominateur commun** n\'est nécessaire.',
    },
    {
      type: 'remarque',
      titre: 'Simplifier avant de multiplier',
      texte:
        'Rien n\'oblige à multiplier d\'abord. Dans 4/9 × 3/8, on peut simplifier '
        + '**en croix** : 4 et 8 se divisent par 4, 3 et 9 se divisent par 3. Il reste '
        + '1/3 × 1/2, soit 1/6 — sans jamais écrire 12/72.\n'
        + 'On simplifie toujours un facteur du **haut** avec un facteur du **bas**, '
        + 'jamais deux du même côté.',
    },
    {
      type: 'remarque',
      titre: 'Quand une fraction est négative',
      texte:
        'Le signe se traite comme pour les relatifs : (−2)/5 × 3/7 = (−6)/35. Deux '
        + 'facteurs négatifs donneraient un produit positif.\n'
        + 'Et rappelle-toi : −3/4, (−3)/4 et 3/(−4) désignent le même nombre.',
    },
    {
      // La remarque qui répond à l'intuition de primaire. Elle est ici plutôt
      // qu'au chapitre 1 parce que c'est avec les fractions qu'elle devient
      // spectaculaire : le produit peut être plus petit que les DEUX facteurs.
      type: 'remarque',
      titre: 'Multiplier ne veut pas dire agrandir',
      texte:
        'Quand les deux facteurs sont **plus petits que 1**, le produit est plus petit '
        + 'que chacun d\'eux : 1/2 × 1/3 = 1/6.\n'
        + 'Mais dès qu\'un facteur **dépasse 1**, il agrandit : 5/2 × 4/7 vaut 20/14, '
        + 'soit 10/7 — plus grand que 4/7.',
    },
    {
      type: 'exemple',
      texte: '2/3 × 4/5 = 8/15   ·   4/9 × 3/8 = 1/6   ·   (−2)/5 × 3/7 = (−6)/35',
    },
  ],

  methode: {
    titre: 'Multiplier en simplifiant d\'abord',
    enonce: 'Calculer A = 5/8 × 4/15.',
    etapes: [
      {
        texte: 'Je regarde l\'opération : c\'est un produit. Je ne cherche donc aucun dénominateur commun.',
        note: 'Le dénominateur commun, c\'était pour la somme.',
      },
      {
        texte: 'J\'écris le tout en une seule fraction : (5 × 4)/(8 × 15).',
        note: 'Les numérateurs ensemble, les dénominateurs ensemble.',
      },
      {
        texte: 'Avant de multiplier, je simplifie : 5 avec 15 (÷5), et 4 avec 8 (÷4). Il reste (1 × 1)/(2 × 3).',
        note: 'Toujours un facteur du haut avec un facteur du bas.',
      },
      {
        texte: 'Donc A = 1/6.',
        note: 'En multipliant d\'abord, j\'aurais obtenu 20/120 — juste, mais à réduire par 20.',
      },
    ],
    controle:
      'Le contrôle : 5/8 est un peu plus que 1/2, et 4/15 un peu plus que 1/4. Le '
      + 'produit doit donc valoir environ 1/8, et surtout être **plus petit que chacun '
      + 'des deux facteurs**. 1/6 tient la route. Un résultat comme 9/23, plus grand '
      + 'que 4/15, aurait été repéré comme faux sans refaire un seul calcul.',
  },

  entrainement: [
    {
      id: 'e-9-2-1', type: 'fraction', palier: 1, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{4}{7} \\times \\dfrac{2}{3}', attendu: [8, 21],
    },
    {
      // La règle prise à l'envers : c'est là qu'on voit si l'élève a compris
      // que le numérateur du résultat vient des numérateurs, et rien d'autre.
      id: 'e-9-2-2', type: 'trous', palier: 1, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\dfrac{3}{7} \\times \\dfrac{\\square}{4} = \\dfrac{15}{28}',
      champs: [{ id: 'a', attendu: 5 }],
    },
    {
      id: 'e-9-2-3', type: 'fraction', palier: 1, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{4} \\times \\dfrac{8}{9}', attendu: [2, 3],
      fausses: [{ valeur: '24/36', piege: 'denominateur-commun-pour-multiplier' }],
    },
    {
      id: 'e-9-2-4', type: 'fraction', palier: 2, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '-\\dfrac{3}{8} \\times \\dfrac{4}{5}', attendu: [-3, 10],
      fausses: [{ valeur: '-12/40', piege: 'denominateur-commun-pour-multiplier' }],
    },
    {
      id: 'e-9-2-5', type: 'fraction', palier: 2, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{5}{6} \\times \\dfrac{9}{10}', attendu: [3, 4],
      fausses: [{ valeur: '45/60', piege: 'denominateur-commun-pour-multiplier' }],
    },
    {
      // NEUTRE, et c'est le plus important du savoir-faire : une SOMME au
      // milieu des produits. Le piège du chapitre — « pas besoin de
      // dénominateur commun » — n'y joue pas du tout : ici il en faut un, et
      // le calcul est impossible sans lui. Sans cet item, l'élève repartirait
      // avec « dans ce chapitre on ne met plus jamais au même dénominateur »,
      // c'est-à-dire une règle aussi fausse que celle qu'on corrige, et le
      // chapitre 4 serait effacé. La consigne prévient : c'est l'opération
      // qu'il faut lire d'abord.
      id: 'e-9-2-6', type: 'fraction', palier: 2, neutre: true, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Attention à l\'opération. Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{1}{6} + \\dfrac{3}{8}', attendu: [13, 24],
    },
    {
      id: 'e-9-2-7', type: 'comparer', palier: 2, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{3}{4} \\times \\dfrac{2}{7} \\ldots \\dfrac{3}{4}',
      attendu: '<',
      fausses: [{ valeur: '>', piege: 'produit-de-fractions-plus-grand' }],
    },
    {
      // NEUTRE : les deux facteurs dépassent 1, donc « multiplier des
      // fractions diminue » ne joue pas — le produit est bien plus grand que
      // chacun d'eux. Sans cet item, la remarque du cours deviendrait une loi
      // universelle et l'élève refuserait un résultat pourtant juste.
      id: 'e-9-2-8', type: 'plausible', palier: 3, neutre: true, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5}{3} \\times \\dfrac{9}{4} = \\dfrac{15}{4}', attendu: true,
      explication:
        '5/3 et 9/4 dépassent toutes les deux 1, donc le produit dépasse chacune '
        + 'd\'elles. 15/4 vaut 3,75 : c\'est bien plus grand que 5/3 et que 9/4. Le '
        + 'calcul le confirme : (5 × 9)/(3 × 4) = 45/12 = 15/4.',
    },
    {
      id: 'e-9-2-9', type: 'plausible', palier: 3, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{2}{5} \\times \\dfrac{3}{4} = \\dfrac{5}{9}', attendu: false,
      explication:
        '2/5 et 3/4 sont toutes les deux plus petites que 1, donc leur produit est plus '
        + 'petit que chacune. Or 5/9 dépasse la moitié, alors que 2/5 ne l\'atteint même '
        + 'pas : impossible. Ici les numérateurs et les dénominateurs ont été additionnés. '
        + 'Le vrai résultat est (2 × 3)/(5 × 4) = 6/20 = 3/10.',
    },
    {
      // L'item le plus fin du savoir-faire : le détour par le dénominateur
      // commun n'est PAS l'erreur — il est seulement inutile. L'erreur arrive
      // à la ligne d'après, quand ce dénominateur est gardé comme dans une
      // somme. Confondre les deux ferait interdire un geste qui reste juste.
      id: 'e-9-2-10', type: 'corriger', palier: 3, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{2}{3} \\times \\dfrac{5}{6}',
      lignes: [
        { texte: '2/3 × 5/6', fausse: false },
        { texte: '= 4/6 × 5/6', fausse: false },
        { texte: '= 20/6', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : 2/3 vaut bien 4/6. Ce détour par le '
        + 'dénominateur commun ne sert à rien dans un produit, mais il ne casse rien. '
        + 'C\'est à la troisième ligne que ça casse — le dénominateur a été gardé, comme '
        + 'dans une addition, au lieu d\'être multiplié lui aussi. Le calcul juste : '
        + '(2 × 5)/(3 × 6) = 10/18 = 5/9.',
    },
  ],

  problemes: [
    {
      id: 'p-9-2-1',
      enonce:
        'Une recette pour 4 personnes demande 3/4 de litre de lait. Léa n\'en prépare '
        + 'que la moitié.',
      questions: [
        { texte: 'Quelle quantité de lait lui faut-il ? Donne-la en huitièmes de litre.', attendu: 3 },
        { texte: 'Combien cela fait-il de centilitres ? (1 L = 100 cL)', attendu: 37.5, unite: 'cL' },
      ],
    },
    {
      id: 'p-9-2-2',
      enonce:
        'Dans un collège de 480 élèves, les 5/8 sont demi-pensionnaires. Parmi ces '
        + 'demi-pensionnaires, les 2/5 mangent au premier service.',
      questions: [
        { texte: 'Combien d\'élèves sont demi-pensionnaires ?', attendu: 300, unite: 'élèves' },
        { texte: 'Combien mangent au premier service ?', attendu: 120, unite: 'élèves' },
        {
          texte:
            'Ces élèves représentent une fraction de TOUT le collège. Simplifiée au '
            + 'maximum, quel est son dénominateur ?',
          attendu: 4,
        },
      ],
    },
    {
      id: 'p-9-2-3',
      enonce:
        'Un terrain rectangulaire mesure 3/4 de kilomètre de long et 2/5 de kilomètre '
        + 'de large.',
      questions: [
        { texte: 'Quelle est son aire ? Donne-la en dixièmes de km².', attendu: 3 },
        { texte: 'Combien cela fait-il de m² ? (1 km² = 1 000 000 m²)', attendu: 300000, unite: 'm²' },
      ],
    },
    {
      id: 'p-9-2-4',
      enonce:
        'Tom a lu les 3/8 d\'un livre de 288 pages. Le lendemain, il lit les 2/3 de '
        + 'ce qu\'il lui restait.',
      questions: [
        { texte: 'Combien de pages a-t-il lues le premier jour ?', attendu: 108, unite: 'pages' },
        { texte: 'Combien de pages lui restait-il alors ?', attendu: 180, unite: 'pages' },
        { texte: 'Combien de pages lit-il le lendemain ?', attendu: 120, unite: 'pages' },
      ],
    },
    {
      // Le problème où le produit AGRANDIT : un facteur dépasse 1. Il est là
      // pour la même raison que l'item neutre 8 — un chapitre entier de
      // produits qui diminuent installerait une règle fausse.
      id: 'p-9-2-5',
      enonce:
        'Un sac de farine pèse 3/4 de kilogramme. Une recette de pain en demande '
        + 'les 5/3.',
      questions: [
        { texte: 'Quelle masse de farine faut-il ? Donne-la en grammes.', attendu: 1250, unite: 'g' },
        { texte: 'Combien de grammes de plus que le contenu d\'un sac cela représente-t-il ?', attendu: 500, unite: 'g' },
      ],
    },
  ],

  test: [
    {
      id: 't-9-2-1', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{2}{5} \\times \\dfrac{7}{9}', attendu: [14, 45], revoir: 'propriete',
    },
    {
      id: 't-9-2-2', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{5}{8} \\times \\dfrac{2}{3}', attendu: [5, 12], revoir: 'propriete',
    },
    {
      id: 't-9-2-3', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{10} \\times \\dfrac{5}{6}', attendu: [1, 4], revoir: 'remarque',
    },
    {
      id: 't-9-2-4', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '-\\dfrac{4}{7} \\times \\dfrac{7}{8}', attendu: [-1, 2], revoir: 'remarque',
    },
    {
      id: 't-9-2-5', type: 'trous', consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\dfrac{5}{6} \\times \\dfrac{\\square}{7} = \\dfrac{10}{21}',
      champs: [{ id: 'a', attendu: 4 }], revoir: 'propriete',
    },
    {
      id: 't-9-2-6', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{7}{12} \\times \\dfrac{4}{5}', attendu: [7, 15], revoir: 'remarque',
    },
    {
      id: 't-9-2-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{3}{5} \\times \\dfrac{5}{6} = \\dfrac{8}{11}', attendu: false,
      explication:
        '3/5 et 5/6 sont plus petites que 1, donc le produit est plus petit que chacune. '
        + 'Or 8/11 dépasse 3/5 : impossible. Le vrai résultat est (3 × 5)/(5 × 6) = 15/30 = 1/2.',
      piege: 'produit-de-fractions-plus-grand', revoir: 'remarque',
    },
    {
      id: 't-9-2-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{7}{4} \\times \\dfrac{6}{5} = \\dfrac{21}{10}', attendu: true,
      explication:
        'Les deux facteurs dépassent 1, donc le produit dépasse chacun d\'eux. 21/10 vaut '
        + '2,1 : c\'est bien plus grand que 7/4 et que 6/5. Le calcul confirme : 42/20 = 21/10.',
      revoir: 'remarque',
    },
    {
      id: 't-9-2-9', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{5}{9} \\times \\dfrac{2}{3} \\ldots \\dfrac{5}{9}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'produit-de-fractions-plus-grand' }],
      revoir: 'remarque',
    },
    {
      id: 't-9-2-10', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '-\\dfrac{5}{6} \\times \\dfrac{3}{4}', attendu: [-5, 8], revoir: 'exemple',
    },
  ],
};
