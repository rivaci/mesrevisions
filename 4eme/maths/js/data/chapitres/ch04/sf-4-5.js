// Chapitre 4, savoir-faire 5 — Résoudre un problème avec des fractions.
//
// Celui qui clôt le chapitre, et le seul où la difficulté n'est pas le calcul.
// Additionner 1/4 et 3/8 est acquis depuis sf-4-2 ; ce qui se joue ici, c'est
// de savoir SUR QUOI porte la fraction. « La moitié du reste » n'est pas « la
// moitié du tout », et l'erreur ne se voit pas dans le calcul : elle se voit
// dans la lecture de l'énoncé.
//
// ── Un piège de contenu sans identifiant ──────────────────────────────────
//
// Le catalogue du chapitre n'a pas de piège pour « fraction prise sur le
// mauvais tout » — c'est une confusion de lecture, pas de calcul, et les six
// pièges du chapitre portent tous sur le calcul des fractions. On ne fabrique
// donc pas un identifiant : les items concernés sont rattachés au piège de
// calcul le plus proche (la soustraction qui donne le reste), et toute la
// charge d'enseignement est portée par les `explication` des items `plausible`
// et `corriger`, par la remarque du cours et par le contrôle de la méthode.
// C'est honnête : mieux vaut une explication écrite au bon endroit qu'un
// diagnostic étiqueté de travers.
//
// ── Le contrôle qui mord ──────────────────────────────────────────────────
//
// Le geste de vérification choisi n'est pas « refais le calcul » mais « une
// part prise ne peut pas dépasser ce qui restait ». Les nombres de la méthode
// sont choisis pour que la mauvaise méthode donne un résultat matériellement
// impossible (enlever 24 bonbons d'un bocal qui n'en contient plus que 12) :
// l'absurdité fait le travail toute seule.

export default {
  id: 'sf-4-5',
  titre: 'Résoudre un problème avec des fractions',
  attendus: ['Il résout des problèmes mettant en jeu des nombres rationnels.'],

  // Deux copies plutôt qu'une suite de calculs : la confusion visée est une
  // divergence d'interprétation, pas une erreur de technique. Il faut donc
  // deux lectures possibles du même énoncé, et un comptage concret pour
  // trancher — 20 carrés qu'on peut compter sur les doigts.
  decouvrir: {
    titre: 'La moitié de quoi, au juste ?',
    texte:
      'Une tablette de 20 carrés. Léo en mange les 2/5. Sa sœur arrive ensuite '
      + 'et mange la moitié de ce qui reste. Deux élèves calculent la part de la sœur.',
    copies: [
      { nom: 'Noé', calcul: 'la moitié de la tablette, c\'est 20 ÷ 2', resultat: '10 carrés' },
      { nom: 'Jade', calcul: 'il reste 12 carrés, et 12 ÷ 2 = 6', resultat: '6 carrés' },
    ],
    question: 'Avant de trancher, compte toi-même : combien de carrés Léo mange-t-il, et combien en reste-t-il ?',
    champs: [
      { id: 'a', etiquette: 'carrés mangés par Léo :', attendu: 8 },
      { id: 'b', etiquette: 'carrés restants :', attendu: 12 },
    ],
    conclusion:
      'C\'est **Jade**. La sœur ne mange pas la moitié de la tablette, mais la '
      + 'moitié **de ce qui reste** : 6 carrés, pas 10. Dès qu\'une part a été '
      + 'prise, le reste devient le **nouveau tout** — et c\'est sur lui que porte '
      + 'la suite de l\'énoncé.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Prendre une fraction d\'une quantité',
      texte:
        'Prendre les **a/b** d\'une quantité, c\'est la partager en **b** parts '
        + 'égales et en prendre **a**.\n'
        + 'En pratique : on **divise par le dénominateur**, puis on **multiplie par '
        + 'le numérateur**.',
    },
    {
      type: 'propriete',
      titre: 'Ce qui reste',
      texte:
        'Le tout vaut **1**, et 1 s\'écrit b/b. Si on a pris les a/b, il reste '
        + '**1 − a/b**, c\'est-à-dire (b − a)/b.\n'
        + 'Si plusieurs parts du **même tout** ont été prises, on les additionne '
        + 'd\'abord — au même dénominateur — puis on retranche la somme de 1. '
        + 'Comparer deux parts demande le même geste : les écrire avec le **même '
        + 'dénominateur**.',
    },
    {
      // La remarque centrale du savoir-faire. Elle donne un geste de lecture
      // (souligner le mot qui dit sur quoi porte la fraction), parce que
      // l'erreur naît avant le calcul, pas pendant.
      type: 'remarque',
      titre: '« du reste » n\'est pas « du tout »',
      texte:
        'Souligne dans l\'énoncé le mot qui dit **sur quoi** porte chaque fraction : '
        + '« du reste », « de ce qui reste », « du stock initial », « du total ». '
        + 'Ce mot change tout.\n'
        + 'Sur 40 gâteaux dont on a mangé les 2/5, il en reste 24 : la moitié du '
        + '**reste** fait 12 gâteaux, la moitié du **paquet** en ferait 20.',
    },
    {
      type: 'exemple',
      texte:
        'Les 2/5 de 30 € : 30 ÷ 5 = 6, puis 6 × 2 = 12 €.\n'
        + 'Une bouteille vidée aux 3/8 : il en reste 1 − 3/8 = 8/8 − 3/8 = 5/8.\n'
        + '60 bonbons dont on prend le quart (15), puis le tiers du reste '
        + '(45 ÷ 3 = 15) : il en reste 30.',
    },
  ],

  methode: {
    titre: 'Suivre ce qui reste, étape par étape',
    enonce: 'Un bocal contient 48 bonbons. Léa en prend les 3/4, puis Tom prend la moitié de ce qui reste. Combien reste-t-il de bonbons ?',
    etapes: [
      {
        texte: 'Je calcule la part de Léa : les 3/4 de 48. Je divise par 4 : 48 ÷ 4 = 12, puis je multiplie par 3 : 12 × 3 = 36 bonbons.',
        note: 'Diviser par le dénominateur, multiplier par le numérateur.',
      },
      {
        texte: 'Il reste 48 − 36 = 12 bonbons dans le bocal.',
        note: 'À partir d\'ici, le « tout » n\'est plus 48 : c\'est 12.',
      },
      {
        texte: 'Tom prend la moitié de ce reste : 12 ÷ 2 = 6 bonbons.',
        note: 'La moitié de 12, pas la moitié de 48.',
      },
      {
        texte: 'Il reste donc 12 − 6 = 6 bonbons.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : une part prise ne peut jamais dépasser ce qui restait. Si tu '
      + 'avais pris la moitié de 48, soit 24, tu aurais enlevé 24 bonbons d\'un '
      + 'bocal qui n\'en contenait plus que 12 — impossible. Quand un résultat '
      + 'devient absurde, c\'est presque toujours qu\'une fraction a été prise sur '
      + 'le mauvais tout.',
  },

  entrainement: [
    {
      // Répondre 6, c'est avoir divisé par 7 sans multiplier par 2 : un seul
      // des deux nombres de la fraction a été utilisé. C'est exactement la
      // conception que porte « denominateur-non-reporte ».
      id: 'e-4-5-1', type: 'calcul', palier: 1, piege: 'denominateur-non-reporte',
      consigne: 'Un panier contient 42 fruits, dont les 2/7 sont des pommes. Combien y a-t-il de pommes ?',
      enonce: '\\dfrac{2}{7} \\text{ de } 42', attendu: 12,
      fausses: [
        { valeur: 6, piege: 'denominateur-non-reporte' },
        { valeur: 21, piege: 'denominateur-non-reporte' },
      ],
    },
    {
      id: 'e-4-5-2', type: 'fraction', palier: 1, piege: 'soustraction-inversee',
      consigne: 'On a bu les 3/8 du contenu d\'une bouteille. Quelle fraction du contenu reste-t-il ?',
      enonce: '1 - \\dfrac{3}{8}', attendu: [5, 8],
      fausses: [{ valeur: '3/8', piege: 'soustraction-inversee' }],
    },
    {
      // Les numérateurs et les dénominateurs sont TOUS les deux plus grands
      // d'un côté : comparer 5 à 7 donne « < », comparer 8 à 12 donne « < »
      // aussi. Les deux raccourcis mènent à la même réponse fausse.
      id: 'e-4-5-3', type: 'comparer', palier: 1, piege: 'comparaison-par-les-numerateurs',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{5}{8} \\ldots \\dfrac{7}{12}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'comparaison-par-les-numerateurs' }],
    },
    {
      // L'énoncé complet est dans la consigne et l'énoncé LaTeX ne fait que
      // rappeler les données : il ne résout pas la question à la place de
      // l'élève, sinon le travail de lecture — le vrai travail — disparaît.
      id: 'e-4-5-4', type: 'calcul', palier: 2, piege: 'soustraction-inversee',
      consigne: 'Un paquet contient 40 gâteaux. Hugo en mange les 2/5, puis Lina mange la moitié de ce qui reste. Combien de gâteaux Lina mange-t-elle ?',
      enonce: '40 \\text{ parts} \\quad \\dfrac{2}{5} \\text{ puis } \\dfrac{1}{2} \\text{ du reste}',
      attendu: 12,
    },
    {
      // Item neutre : la seconde fraction porte sur le STOCK INITIAL, pas sur
      // le reste. Un élève qui a retenu « la deuxième fraction se prend
      // toujours sur ce qui reste » se trompe ici. Même longueur, mêmes
      // nombres, même effort : rien ne le rend plus facile.
      id: 'e-4-5-5', type: 'calcul', palier: 2, neutre: true, piege: 'soustraction-inversee',
      consigne: 'Un rayon contient 45 magazines. Le matin, on en vend les 2/5. L\'après-midi, on en vend le tiers du stock initial. Combien de magazines vend-on l\'après-midi ?',
      enonce: '45 \\text{ magazines} \\quad \\dfrac{2}{5} \\text{ puis } \\dfrac{1}{3} \\text{ du stock initial}',
      attendu: 15,
    },
    {
      id: 'e-4-5-6', type: 'fraction', palier: 2, piege: 'addition-terme-a-terme',
      consigne: 'D\'une tarte, on mange 1/4, puis 3/8. Quelle fraction de la tarte reste-t-il ?',
      enonce: '1 - \\dfrac{1}{4} - \\dfrac{3}{8}', attendu: [3, 8],
      fausses: [{ valeur: '2/3', piege: 'addition-terme-a-terme' }],
    },
    {
      id: 'e-4-5-7', type: 'plausible', palier: 2, piege: 'grand-denominateur-grande-fraction',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{1}{8} > \\dfrac{1}{6}', attendu: false,
      explication:
        'Dans un collège, un élève sur 8 ne fait pas plus de monde qu\'un élève sur 6 : '
        + 'plus on partage en parts, plus les parts sont **petites**. En vingt-quatrièmes, '
        + '1/8 = 3/24 et 1/6 = 4/24, donc 1/8 est bien le plus petit des deux.',
    },
    {
      // Un « oui » qui a l'air suspect : 30 L, c'est exactement la moitié du
      // bidon, et pourtant le calcul est juste. Sans un item comme celui-ci,
      // « on me demande si c'est plausible, donc c'est faux » suffirait.
      id: 'e-4-5-8', type: 'plausible', palier: 3, piege: 'soustraction-inversee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '60 \\text{ L} \\quad \\dfrac{1}{4} \\text{ puis } \\dfrac{1}{3} \\text{ du reste} \\quad \\text{: il reste } 30 \\text{ L}',
      attendu: true,
      explication:
        'Le quart de 60 L fait 15 L, il reste 45 L. Le tiers de ce reste fait '
        + '45 ÷ 3 = 15 L. Il reste donc 45 − 15 = 30 L : le compte y est. Le résultat '
        + 'tombe sur la moitié du bidon, mais c\'est une coïncidence — pas la preuve '
        + 'd\'une erreur.',
    },
    {
      id: 'e-4-5-9', type: 'corriger', palier: 3, piege: 'addition-terme-a-terme',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '1 - \\left( \\dfrac{1}{3} + \\dfrac{1}{4} \\right)',
      lignes: [
        { texte: 'Le budget du club est partagé : 1/3 pour le matériel et 1/4 pour les déplacements.', fausse: false },
        { texte: 'Ensemble, cela fait 1/3 + 1/4 = 2/7 du budget.', fausse: true },
        { texte: 'Il reste 1 − 2/7, et 1 = 7/7.', fausse: false },
        { texte: 'Il reste donc 5/7 du budget pour les sorties.', fausse: false },
      ],
      explication:
        'Deuxième ligne : les numérateurs ont été additionnés entre eux et les '
        + 'dénominateurs entre eux. Il fallait d\'abord un dénominateur commun : '
        + '1/3 + 1/4 = 4/12 + 3/12 = 7/12. Il reste donc 12/12 − 7/12 = **5/12** du '
        + 'budget, et non 5/7. L\'estimation le montrait : un tiers plus un quart, '
        + 'c\'est un peu plus d\'une demi-part, alors que 2/7 est plus petit qu\'un tiers.',
    },
    {
      id: 'e-4-5-10', type: 'vraifaux', palier: 3, piege: 'soustraction-inversee',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'On ne peut pas calculer 2/5 − 3/4, parce que la première fraction est plus petite que la seconde.',
      attendu: false,
      contreExemple: {
        invite: 'Écris les deux fractions sur 20, puis donne le numérateur du résultat de 2/5 − 3/4.',
        champs: [{ id: 'a', etiquette: 'numérateur du résultat, sur 20' }],
        valide: (a) => a === -7,
        exemple:
          '2/5 = 8/20 et 3/4 = 15/20, donc 2/5 − 3/4 = −7/20. Le calcul se fait très '
          + 'bien : le résultat est simplement négatif.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-4-5-1',
      enonce: 'Dans une classe de 28 élèves, les 3/7 sont inscrits à la chorale.',
      questions: [
        { texte: 'Combien d\'élèves sont inscrits à la chorale ?', attendu: 12, unite: 'élèves' },
        { texte: 'Combien ne le sont pas ?', attendu: 16, unite: 'élèves' },
      ],
    },
    {
      id: 'p-4-5-2',
      enonce:
        'Une recette de pain demande 750 g de farine. Nina a déjà versé les 2/5 '
        + 'de cette quantité dans le saladier.',
      questions: [
        { texte: 'Combien de grammes a-t-elle versés ?', attendu: 300, unite: 'g' },
        { texte: 'Combien lui en reste-t-il à verser ?', attendu: 450, unite: 'g' },
      ],
    },
    {
      // Le problème « deux prélèvements en chaîne » : la seconde fraction porte
      // sur le reste, et les trois questions obligent à passer par l'étape
      // intermédiaire au lieu de sauter à la fin.
      id: 'p-4-5-3',
      enonce:
        'Un sachet contient 24 billes. Hugo en prend le tiers, puis Zoé prend le '
        + 'quart de ce qui reste dans le sachet.',
      questions: [
        { texte: 'Combien de billes Hugo prend-il ?', attendu: 8, unite: 'billes' },
        { texte: 'Combien de billes Zoé prend-elle ?', attendu: 4, unite: 'billes' },
        { texte: 'Combien de billes reste-t-il dans le sachet ?', attendu: 12, unite: 'billes' },
      ],
    },
    {
      id: 'p-4-5-4',
      enonce:
        'Le budget d\'un club de sport est de 1 200 €. Le tiers va au matériel, '
        + 'le quart aux déplacements, et tout le reste aux sorties.',
      questions: [
        { texte: 'Combien d\'euros pour le matériel ?', attendu: 400, unite: '€' },
        { texte: 'Combien d\'euros pour les déplacements ?', attendu: 300, unite: '€' },
        { texte: 'Combien d\'euros reste-t-il pour les sorties ?', attendu: 500, unite: '€' },
      ],
    },
    {
      id: 'p-4-5-5',
      enonce:
        'Sur un sentier de 30 km, Lou a parcouru les 2/5 du trajet dans la matinée, '
        + 'et Sam en a parcouru les 3/10.',
      questions: [
        { texte: 'Combien de kilomètres Lou a-t-elle parcourus ?', attendu: 12, unite: 'km' },
        { texte: 'Et Sam ?', attendu: 9, unite: 'km' },
        { texte: 'Combien de kilomètres d\'avance Lou a-t-elle sur Sam ?', attendu: 3, unite: 'km' },
      ],
    },
  ],

  test: [
    {
      id: 't-4-5-1', type: 'calcul',
      consigne: 'Un carton contient 54 œufs, dont les 2/9 sont cassés. Combien d\'œufs sont cassés ?',
      enonce: '\\dfrac{2}{9} \\text{ de } 54', attendu: 12, revoir: 'definition',
    },
    {
      id: 't-4-5-2', type: 'fraction',
      consigne: 'Une citerne a été vidée aux 5/12. Quelle fraction du contenu reste-t-il ?',
      enonce: '1 - \\dfrac{5}{12}', attendu: [7, 12], revoir: 'propriete',
    },
    {
      id: 't-4-5-3', type: 'calcul',
      consigne: 'Une boîte contient 36 parts de gâteau. On en mange les 5/9, puis la moitié de ce qui reste. Combien de parts fait cette moitié ?',
      enonce: '36 \\text{ parts} \\quad \\dfrac{5}{9} \\text{ puis } \\dfrac{1}{2} \\text{ du reste}',
      attendu: 8, revoir: 'remarque',
    },
    {
      id: 't-4-5-4', type: 'fraction',
      consigne: 'D\'une pizza, on mange 1/6, puis 1/3. Quelle fraction de la pizza reste-t-il ?',
      enonce: '1 - \\dfrac{1}{6} - \\dfrac{1}{3}', attendu: [1, 2], revoir: 'propriete',
    },
    {
      id: 't-4-5-5', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{4}{9} \\ldots \\dfrac{5}{12}', attendu: '>',
      piege: 'comparaison-par-les-numerateurs', revoir: 'propriete',
    },
    {
      id: 't-4-5-6', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '40 \\text{ L} \\quad \\dfrac{3}{5} \\text{ puis } \\dfrac{1}{2} \\text{ du reste} \\quad \\text{: il reste } 20 \\text{ L}',
      attendu: false,
      explication:
        'Les 3/5 de 40 L font 24 L, il reste donc 16 L. La moitié de ce reste fait 8 L, '
        + 'et il reste 8 L à la fin — pas 20 L. Les 20 L annoncés, c\'est la moitié du '
        + 'bidon **plein** : la fraction a été prise sur le mauvais tout.',
      piege: 'soustraction-inversee', revoir: 'remarque',
    },
    {
      // Comme l'item neutre de l'entraînement : la seconde fraction porte sur
      // le stock de départ. Le test doit vérifier que la lecture tient encore.
      id: 't-4-5-7', type: 'calcul',
      consigne: 'Un rayon contient 56 livres. On en vend les 3/8 le matin, puis le quart du stock initial l\'après-midi. Combien de livres vend-on l\'après-midi ?',
      enonce: '56 \\text{ livres} \\quad \\dfrac{3}{8} \\text{ le matin, } \\dfrac{1}{4} \\text{ du stock initial}',
      attendu: 14, revoir: 'remarque',
    },
    {
      id: 't-4-5-8', type: 'calcul',
      consigne: 'On dispose de 90 euros. On en dépense les 2/3, puis le tiers de ce qui reste. Combien d\'euros reste-t-il ?',
      enonce: '90 \\text{ euros} \\quad \\dfrac{2}{3} \\text{ puis } \\dfrac{1}{3} \\text{ du reste}',
      attendu: 20, revoir: 'exemple',
    },
    {
      id: 't-4-5-9', type: 'fraction',
      consigne: 'Léa a parcouru 1/3 du trajet, Tom en a parcouru 5/6. Calcule la part de Léa moins celle de Tom.',
      enonce: '\\dfrac{1}{3} - \\dfrac{5}{6}', attendu: [-1, 2],
      piege: 'signe-de-fraction-perdu', revoir: 'propriete',
    },
    {
      id: 't-4-5-10', type: 'fraction',
      consigne: 'D\'un pot de peinture, on utilise les 2/5, puis 1/4. Quelle fraction du pot reste-t-il ?',
      enonce: '1 - \\dfrac{2}{5} - \\dfrac{1}{4}', attendu: [7, 20],
      piege: 'addition-terme-a-terme', revoir: 'propriete',
    },
  ],
};
