// Chapitre 4, savoir-faire 2 — Additionner deux fractions.
//
// ── Ce que ce savoir-faire n'a PAS ────────────────────────────────────────
//
// Ni produit, ni quotient de fractions : ils viennent au chapitre suivant, et
// les mélanger ici serait le meilleur moyen d'installer la confusion qu'on
// cherche justement à éviter — celle qui fait additionner les dénominateurs
// « comme pour la multiplication ». Pas de PGCD non plus : on simplifie en
// décomposant, comme au chapitre 2.
//
// La progression suit les précisions du programme : dénominateurs identiques,
// puis multiples l'un de l'autre, puis quelconques. Jamais l'inverse.
//
// ── Le piège du moment, et ses neutres ────────────────────────────────────
//
// Le piège travaillé est « addition-terme-a-terme » : 1/2 + 1/3 = 2/5. Il est
// tenace parce qu'il est LOGIQUE — c'est la règle du produit, et c'est aussi
// celle que la vie donne (un joueur qui réussit 1 tir sur 2 puis 1 sur 3 en a
// bien réussi 2 sur 5). Le combattre par la règle seule ne suffit pas : on
// l'attaque par l'estimation, qui rend l'erreur visible sans calcul.
//
// Deux items neutres, parce que deux motifs de surface menacent :
//   — « il faut toujours changer les dénominateurs » : l'item 5 a déjà le même
//     dénominateur des deux côtés, et il n'est pas plus facile pour autant ;
//   — « le dénominateur de la réponse est le dénominateur commun » : l'item 8
//     se simplifie, et le dénominateur final n'est plus celui du calcul.

export default {
  id: 'sf-4-2',
  titre: 'Additionner deux fractions',
  attendus: [
    'Il calcule la somme de nombres rationnels de dénominateurs quelconques.',
    'Il donne le résultat sous forme d\'une fraction simplifiée au maximum.',
  ],

  // On ne dit pas « il faut un dénominateur commun » : on redécoupe une
  // tablette, et l'élève constate que le comptage ne devient possible qu'une
  // fois toutes les parts de la même taille. Le mot « dénominateur commun »
  // arrive au cours, une fois le geste fait.
  decouvrir: {
    titre: 'Des parts qui n\'ont pas la même taille',
    texte:
      'On veut ajouter la moitié d\'une tablette de chocolat et le tiers de la '
      + 'même tablette. Une moitié et un tiers ne sont pas des parts de la même '
      + 'taille : impossible de les compter ensemble. On redécoupe donc tout en '
      + 'sixièmes.',
    lignes: [
      { calcul: 'la tablette entière', resultat: '6 sixièmes' },
      { calcul: '1/2 de la tablette', resultat: '3 sixièmes' },
      { calcul: '1/3 de la tablette', resultat: '2 sixièmes' },
    ],
    question:
      'Une fois tout redécoupé, combien de sixièmes fait le total ? Et combien '
      + 'en resterait-il pour finir la tablette ?',
    champs: [
      { id: 'a', etiquette: 'sixièmes en tout :', attendu: 5 },
      { id: 'b', etiquette: 'sixièmes restants :', attendu: 1 },
    ],
    conclusion:
      'Donc 1/2 + 1/3 = **5/6**. On n\'a additionné que les **numérateurs** — '
      + '3 + 2 — parce que les parts avaient enfin la même taille. Le dénominateur, '
      + 'lui, ne s\'additionne pas : il dit seulement en combien de morceaux on a '
      + 'coupé. Écrire 2/5 serait d\'ailleurs absurde : ce serait **moins** qu\'une '
      + 'demi-tablette, alors qu\'on vient d\'en ajouter.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Même dénominateur',
      texte:
        'Quand deux fractions ont le **même dénominateur**, on additionne les '
        + '**numérateurs** et on **garde** le dénominateur :\n'
        + '2/7 + 3/7 = 5/7.',
    },
    {
      type: 'propriete',
      titre: 'Dénominateurs différents',
      texte:
        'On commence par les mettre au **même dénominateur**. Multiplier le '
        + 'numérateur **et** le dénominateur par un même nombre non nul ne change '
        + 'pas la valeur d\'une fraction : 1/3 = 2/6.\n'
        + 'Une fois les deux fractions écrites avec le même dénominateur, on '
        + 'applique la règle précédente.',
    },
    {
      type: 'remarque',
      titre: 'Choisir le dénominateur commun, et finir le travail',
      texte:
        'Si l\'un des dénominateurs est un **multiple** de l\'autre, il fait '
        + 'l\'affaire : pour 1/3 et 5/6, on prend 6. Sinon, le **produit** des deux '
        + 'marche toujours : pour 2/3 et 1/5, on prend 15.\n'
        + 'Et on **simplifie le résultat** au maximum : 12/18 s\'écrit 2/3.',
    },
    {
      type: 'remarque',
      titre: 'Quand une fraction est négative',
      texte:
        '−3/4, (−3)/4 et 3/(−4) désignent le **même nombre**. Pour additionner, '
        + 'place le signe au **numérateur** : (−3)/4 + 2/4 = (−3 + 2)/4 = −1/4. '
        + 'Ce sont alors des relatifs comme les autres.',
    },
    {
      type: 'exemple',
      texte:
        '1/3 + 5/6 = 2/6 + 5/6 = 7/6   ·   2/3 + 1/5 = 10/15 + 3/15 = 13/15   ·   '
        + '−3/4 + 1/2 = −3/4 + 2/4 = −1/4',
    },
  ],

  methode: {
    titre: 'Additionner deux fractions de dénominateurs différents',
    enonce: 'Calculer A = 5/6 + 3/4.',
    etapes: [
      {
        texte: 'Je cherche un dénominateur commun à 6 et 4. Ni l\'un ni l\'autre ne convient, mais 12 est dans les deux tables.',
        note: '24, leur produit, marcherait aussi — avec de plus grands nombres à manipuler.',
      },
      {
        texte: 'Je transforme chaque fraction : 5/6 = 10/12 (×2 en haut et en bas) et 3/4 = 9/12 (×3 en haut et en bas).',
        note: 'Le numérateur suit toujours le dénominateur, sinon la fraction change de valeur.',
      },
      {
        texte: 'J\'additionne les numérateurs et je garde le dénominateur : 10/12 + 9/12 = 19/12.',
        note: '',
      },
      {
        texte: 'Je cherche à simplifier : 19 est premier et ne divise pas 12. Donc A = 19/12.',
        note: 'Rien à simplifier ici, mais la question doit être posée à chaque fois.',
      },
    ],
    controle:
      'Le contrôle : estime avant de conclure. 5/6 est un peu moins que 1, 3/4 '
      + 'aussi — la somme doit donc être entre 1 et 2. 19/12 vaut environ 1,6 : '
      + 'c\'est cohérent. Un résultat comme 8/10, plus petit que 1, aurait été '
      + 'repéré comme faux sans refaire un seul calcul.',
  },

  entrainement: [
    {
      id: 'e-4-2-1', type: 'fraction', palier: 1, piege: 'addition-terme-a-terme',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{2}{7} + \\dfrac{3}{7}', attendu: [5, 7],
    },
    {
      // La conversion isolée, avant qu'elle serve dans une addition : c'est
      // l'étape où le numérateur se fait oublier, autant la travailler seule.
      id: 'e-4-2-2', type: 'trous', palier: 1, piege: 'denominateur-non-reporte',
      consigne: 'Complète pour que les deux fractions soient égales.',
      enonce: '\\dfrac{3}{4} = \\dfrac{\\square}{20}',
      champs: [{ id: 'a', attendu: 15 }],
      fausses: [{ valeur: 3, piege: 'denominateur-non-reporte' }],
    },
    {
      id: 'e-4-2-3', type: 'fraction', palier: 1, piege: 'denominateur-non-reporte',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{1}{4} + \\dfrac{5}{8}', attendu: [7, 8],
    },
    {
      id: 'e-4-2-4', type: 'fraction', palier: 2, piege: 'addition-terme-a-terme',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{2}{3} + \\dfrac{1}{5}', attendu: [13, 15],
    },
    {
      // Premier neutre : les dénominateurs sont DÉJÀ les mêmes, donc l'étape de
      // réduction ne joue pas. L'item n'est pas plus facile pour autant — les
      // nombres sont grands et le résultat demande une simplification par 6.
      // Sans lui, « avant d'additionner, je multiplie les deux dénominateurs »
      // deviendrait un réflexe aveugle, et 18 × 18 = 324 la punition.
      id: 'e-4-2-5', type: 'fraction', palier: 2, neutre: true, piege: 'denominateur-non-reporte',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{7}{18} + \\dfrac{5}{18}', attendu: [2, 3],
    },
    {
      // La réponse fausse « = » est exactement celle que produit l'addition
      // terme à terme : 1/2 + 1/3 donnerait 2/5, donc l'égalité. Le diagnostic
      // est sans ambiguïté.
      id: 'e-4-2-6', type: 'comparer', palier: 2, piege: 'addition-terme-a-terme',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{1}{2} + \\dfrac{1}{3} \\ldots \\dfrac{2}{5}',
      attendu: '>',
      fausses: [{ valeur: '=', piege: 'addition-terme-a-terme' }],
    },
    {
      id: 'e-4-2-7', type: 'plausible', palier: 2, piege: 'addition-terme-a-terme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5}{6} + \\dfrac{3}{4} = \\dfrac{8}{10}', attendu: false,
      explication:
        '5/6 et 3/4 dépassent chacune 1/2, donc leur somme dépasse 1. Or 8/10 est '
        + 'plus petit que 1 : impossible. Les numérateurs et les dénominateurs ont '
        + 'été additionnés séparément. Le vrai résultat est 10/12 + 9/12 = 19/12.',
    },
    {
      // Second neutre : ici le calcul proposé est JUSTE, et son dénominateur
      // final (2) n'est pas le dénominateur commun (6) — la simplification l'a
      // changé. Sans cet item, deux motifs de surface s'installeraient :
      // « on me demande si c'est plausible, donc c'est faux », et « la réponse
      // garde forcément le dénominateur du calcul ».
      id: 'e-4-2-8', type: 'plausible', palier: 3, neutre: true, piege: 'addition-terme-a-terme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{2}', attendu: true,
      explication:
        'En sixièmes : 1/6 + 2/6 = 3/6, qui se simplifie en 1/2. Le dénominateur de '
        + 'la réponse n\'est donc pas toujours celui du calcul — la simplification '
        + 'peut le changer.',
    },
    {
      id: 'e-4-2-9', type: 'fraction', palier: 3, piege: 'signe-de-fraction-perdu',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '-\\dfrac{3}{4} + \\dfrac{1}{2}', attendu: [-1, 4],
    },
    {
      id: 'e-4-2-10', type: 'corriger', palier: 3, piege: 'addition-terme-a-terme',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{3}{5} + \\dfrac{1}{4}',
      lignes: [
        { texte: '3/5 + 1/4', fausse: false },
        { texte: '= 12/20 + 5/20', fausse: false },
        { texte: '= 17/40', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : 3/5 = 12/20 et 1/4 = 5/20. C\'est à '
        + 'la troisième que ça casse — les dénominateurs ont été additionnés eux '
        + 'aussi. Quand les parts ont la même taille, on n\'additionne que les '
        + 'numérateurs : 12/20 + 5/20 = 17/20.',
    },
  ],

  problemes: [
    {
      id: 'p-4-2-1',
      enonce:
        'Pour un gâteau, Lina verse 1/4 de litre de lait, puis en rajoute 1/8 de '
        + 'litre. Elle veut savoir combien de huitièmes de litre elle a utilisés en tout.',
      questions: [
        { texte: 'Combien de huitièmes de litre font 1/4 de litre ?', attendu: 2 },
        { texte: 'Combien de huitièmes de litre a-t-elle utilisés en tout ?', attendu: 3 },
      ],
    },
    {
      id: 'p-4-2-2',
      enonce:
        'Tom passe 1/3 de sa journée à dormir et 1/4 de sa journée au collège. '
        + 'Une journée compte 24 heures.',
      questions: [
        { texte: 'Combien d\'heures dort-il ?', attendu: 8, unite: 'h' },
        { texte: 'Combien d\'heures passe-t-il au collège ?', attendu: 6, unite: 'h' },
        { texte: 'Ces deux activités occupent combien de douzièmes de sa journée ?', attendu: 7 },
      ],
    },
    {
      id: 'p-4-2-3',
      enonce:
        'Un réservoir de 60 litres est rempli aux 2/5. On y ajoute ensuite '
        + 'l\'équivalent de 1/4 du réservoir.',
      questions: [
        { texte: 'Combien de litres contient-il au départ ?', attendu: 24, unite: 'L' },
        { texte: 'Combien de litres ajoute-t-on ?', attendu: 15, unite: 'L' },
        { texte: 'Le réservoir est alors rempli d\'un certain nombre de vingtièmes. Lequel ?', attendu: 13 },
      ],
    },
    {
      id: 'p-4-2-4',
      enonce:
        'Maël reçoit 36 euros d\'argent de poche par mois. Il en dépense 1/6 en '
        + 'bandes dessinées et 1/2 en sorties.',
      questions: [
        { texte: 'Combien dépense-t-il en bandes dessinées ?', attendu: 6, unite: '€' },
        { texte: 'Combien dépense-t-il en sorties ?', attendu: 18, unite: '€' },
        { texte: 'Combien lui reste-t-il à la fin du mois ?', attendu: 12, unite: '€' },
      ],
    },
    {
      // Le problème où l'addition sert à DÉCIDER quelque chose : le pot
      // déborde-t-il ? C'est le même calcul que la méthode, dans un contexte
      // où se tromper a une conséquence visible.
      id: 'p-4-2-5',
      enonce:
        'Un peintre mélange 5/6 de litre de blanc et 3/4 de litre de bleu. Il verse '
        + 'le tout dans un pot d\'un litre et demi, soit 18 douzièmes de litre.',
      questions: [
        { texte: 'Combien de douzièmes de litre de blanc verse-t-il ?', attendu: 10 },
        { texte: 'Et combien de douzièmes de litre de bleu ?', attendu: 9 },
        { texte: 'Combien de douzièmes de litre fait le mélange ? (compare ensuite à 18)', attendu: 19 },
      ],
    },
  ],

  test: [
    {
      id: 't-4-2-1', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{4}{9} + \\dfrac{2}{9}', attendu: [2, 3], revoir: 'propriete',
    },
    {
      id: 't-4-2-2', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{1}{4} + \\dfrac{3}{8}', attendu: [5, 8], revoir: 'propriete',
    },
    {
      id: 't-4-2-3', type: 'trous', consigne: 'Complète pour que les deux fractions soient égales.',
      enonce: '\\dfrac{2}{5} = \\dfrac{\\square}{15}',
      champs: [{ id: 'a', attendu: 6 }],
      fausses: [{ valeur: 2, piege: 'denominateur-non-reporte' }],
      revoir: 'propriete',
    },
    {
      id: 't-4-2-4', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{4} + \\dfrac{1}{6}', attendu: [11, 12], revoir: 'remarque',
    },
    {
      id: 't-4-2-5', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{2}{5} + \\dfrac{1}{3}', attendu: [11, 15], revoir: 'propriete',
    },
    {
      id: 't-4-2-6', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{5}{12} + \\dfrac{1}{12}', attendu: [1, 2], revoir: 'remarque',
    },
    {
      id: 't-4-2-7', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{2}{3} + \\dfrac{3}{4} = \\dfrac{5}{7}', attendu: false,
      explication:
        '2/3 et 3/4 dépassent chacune 1/2, donc leur somme dépasse 1. Or 5/7 est plus '
        + 'petit que 1. Le vrai résultat est 8/12 + 9/12 = 17/12.',
      piege: 'addition-terme-a-terme', revoir: 'exemple',
    },
    {
      id: 't-4-2-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{3}{10} + \\dfrac{1}{5} = \\dfrac{1}{2}', attendu: true,
      explication: 'En dixièmes : 3/10 + 2/10 = 5/10, qui se simplifie en 1/2. Le compte y est.',
      revoir: 'remarque',
    },
    {
      id: 't-4-2-9', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '-\\dfrac{2}{3} + \\dfrac{1}{6}', attendu: [-1, 2], revoir: 'remarque',
    },
    {
      id: 't-4-2-10', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{1}{3} + \\dfrac{1}{4} \\ldots \\dfrac{2}{7}', attendu: '>',
      fausses: [{ valeur: '=', piege: 'addition-terme-a-terme' }],
      revoir: 'exemple',
    },
  ],
};
