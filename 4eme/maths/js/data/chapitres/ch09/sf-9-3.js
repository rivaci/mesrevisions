// Chapitre 9, savoir-faire 3 — Diviser deux fractions.
//
// ── Ce que ce savoir-faire doit défaire ───────────────────────────────────
//
// Trois transferts se bousculent ici, et ils viennent tous d'ailleurs :
//   — du chapitre 4 : « pour calculer avec deux fractions, il faut d'abord un
//     dénominateur commun ». Faux pour un quotient, comme pour un produit ;
//   — du chapitre précédent : « on multiplie les numérateurs entre eux » —
//     appliqué tel quel à une division, ça oublie de retourner le diviseur ;
//   — de toute la scolarité primaire : « diviser rend plus petit ». C'est ce
//     dernier qui résiste le plus longtemps, et c'est pour ça que le programme
//     demande explicitement des quotients PLUS GRANDS que le dividende.
//
// ── Pourquoi la découverte passe par « combien tient dedans » ──────────────
//
// La division-partage (« partager en 4 ») ne dit rien quand le diviseur est
// une fraction : on ne partage pas en un quart. La division-quotition
// (« combien de quarts tiennent dans 3 ? ») marche, elle, et elle fait
// apparaître d'un coup les deux choses à comprendre : qu'on multiplie par 4,
// et que le résultat est plus grand que 3. On part donc de là.
//
// ── Les deux items neutres, et ce qu'ils empêchent ────────────────────────
//
//   — e-9-3-6 : le diviseur y est PLUS GRAND que 1, donc le quotient diminue.
//     Sans lui, « une division par une fraction agrandit toujours » remplacerait
//     simplement l'ancienne règle fausse par une nouvelle.
//   — e-9-3-7 : retourner l'une ou l'autre des deux fractions y donne le même
//     résultat. Le piège ne peut pas jouer, et l'item le dit franchement.

export default {
  id: 'sf-9-3',
  titre: 'Diviser deux fractions',
  attendus: [
    'Il calcule le quotient de nombres rationnels.',
    'Il donne le résultat sous forme d\'une fraction simplifiée au maximum.',
  ],

  // On ne nomme ni « inverse » ni « diviseur » : on compte des quarts de litre.
  // Les deux réponses demandées sont exactement les deux constats du cours —
  // le résultat dépasse le nombre de départ, et on a multiplié par 4.
  decouvrir: {
    titre: 'Combien de quarts de litre tiennent dans 3 litres ?',
    texte:
      'Un pâtissier a 3 litres de crème. Chaque verrine en demande un quart de '
      + 'litre. Demander « 3 ÷ 1/4 », c\'est demander combien de quarts de litre '
      + 'tiennent dans ses 3 litres.',
    lignes: [
      { calcul: 'dans 1 litre', resultat: '4 quarts de litre' },
      { calcul: 'dans 2 litres', resultat: '8 quarts de litre' },
    ],
    question:
      'Combien de quarts de litre y a-t-il dans 3 litres ? Et par combien '
      + 'faut-il multiplier 3 pour trouver ce nombre ?',
    champs: [
      { id: 'a', etiquette: '3 ÷ 1/4 =', attendu: 12 },
      { id: 'b', etiquette: 'on a donc multiplié 3 par :', attendu: 4 },
    ],
    conclusion:
      'Diviser par 1/4 revient à **multiplier par 4**. Et 12 est bien **plus '
      + 'grand** que 3 : une division ne rend pas toujours plus petit — ça dépend '
      + 'si on divise par un nombre plus grand ou plus petit que 1. Le nombre 4, '
      + 'c\'est l\'**inverse** de 1/4 : la fraction retournée.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Inverse d\'un nombre',
      texte:
        'L\'**inverse** d\'un nombre non nul est le nombre par lequel il faut le '
        + 'multiplier pour obtenir **1**.\n'
        + 'L\'inverse de a/b est **b/a** : on retourne la fraction. L\'inverse de 4 '
        + 'est 1/4, car 4 × 1/4 = 1.',
    },
    {
      type: 'propriete',
      titre: 'Diviser par une fraction',
      texte:
        'Diviser par un nombre non nul revient à **multiplier par son inverse** :\n'
        + 'a/b ÷ c/d = a/b × **d/c**.\n'
        + 'C\'est la **seconde** fraction — celle qui divise — qu\'on retourne. La '
        + 'première ne bouge pas. Aucun dénominateur commun n\'est nécessaire.',
    },
    {
      type: 'remarque',
      titre: 'Inverse et opposé ne sont pas la même chose',
      texte:
        'L\'**opposé** de 2/3 est −2/3 : leur **somme** fait 0.\n'
        + 'L\'**inverse** de 2/3 est 3/2 : leur **produit** fait 1.\n'
        + 'Le mot à retenir avec chacun : opposé pour additionner, inverse pour multiplier.',
    },
    {
      type: 'remarque',
      titre: 'Le quotient peut être plus grand que le nombre de départ',
      texte:
        'Si le diviseur est **plus petit que 1**, le quotient est **plus grand** '
        + 'que le dividende — c\'est ce qu\'on a vu avec les quarts de litre.\n'
        + 'Si le diviseur est **plus grand que 1**, le quotient est plus petit. '
        + 'Comparer le diviseur à 1 suffit donc à prévoir le sens du résultat.',
    },
    {
      type: 'exemple',
      texte:
        '4/9 ÷ 2/3 = 4/9 × 3/2 = 12/18 = 2/3   ·   3/5 ÷ 1/10 = 3/5 × 10/1 = 30/5 = 6   ·   '
        + '5/8 ÷ 3 = 5/8 × 1/3 = 5/24',
    },
  ],

  methode: {
    titre: 'Diviser une fraction par une fraction',
    enonce: 'Calculer B = 7/10 ÷ 14/15.',
    etapes: [
      {
        texte: 'Je repère le diviseur : c\'est la fraction qui suit le signe ÷, donc 14/15.',
        note: 'C\'est elle, et elle seule, que je vais retourner.',
      },
      {
        texte: 'Je remplace la division par une multiplication par son inverse : 7/10 × 15/14.',
        note: 'Le 7/10 est recopié tel quel. Retourner les deux fractions donnerait un tout autre nombre.',
      },
      {
        texte: 'Je simplifie avant de multiplier : 7 et 14 se divisent par 7, 15 et 10 par 5. Il reste (1 × 3)/(2 × 2).',
        note: 'Simplifier maintenant m\'évite d\'écrire 105/140 puis de chercher par combien le réduire.',
      },
      {
        texte: 'Je multiplie : B = 3/4.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : multiplie ta réponse par le diviseur, tu dois retomber sur '
      + 'le nombre de départ. Ici 3/4 × 14/15 = 42/60 = 7/10 : c\'est bon.\n'
      + 'Et l\'estimation, avant même de calculer : 14/15 est un peu plus petit '
      + 'que 1, donc le quotient doit être un peu plus **grand** que 7/10. '
      + '3/4 vaut 0,75 et 7/10 vaut 0,7 — cohérent.',
  },

  entrainement: [
    {
      // L'inverse isolé, avant qu'il serve : c'est le mot que l'élève doit
      // pouvoir produire seul, et celui qu'il confond avec « opposé ».
      id: 'e-9-3-1', type: 'calcul', palier: 1, piege: 'inverse-et-oppose-confondus',
      consigne: 'Donne l\'inverse de ce nombre, sous forme décimale.',
      enonce: '4', attendu: 0.25,
      fausses: [{ valeur: -4, piege: 'inverse-et-oppose-confondus' }],
    },
    {
      // Le geste seul, sans calcul derrière : quelle fraction retourne-t-on ?
      // Isolé ici parce que c'est là que tout se joue, et que noyé dans un
      // calcul complet il passe inaperçu.
      id: 'e-9-3-2', type: 'trous', palier: 1, piege: 'mauvaise-fraction-inversee',
      consigne: 'Complète pour transformer cette division en multiplication.',
      enonce: '\\dfrac{5}{9} \\div \\dfrac{2}{3} = \\dfrac{5}{9} \\times \\dfrac{\\square}{\\square}',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: 3 },
        { id: 'b', etiquette: 'dénominateur', attendu: 2 },
      ],
    },
    {
      id: 'e-9-3-3', type: 'fraction', palier: 1, piege: 'division-terme-a-terme',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{2}{3} \\div \\dfrac{5}{7}', attendu: [14, 15],
      fausses: [
        { valeur: '10/21', piege: 'division-terme-a-terme' },
        { valeur: '15/14', piege: 'mauvaise-fraction-inversee' },
      ],
    },
    {
      id: 'e-9-3-4', type: 'fraction', palier: 2, piege: 'mauvaise-fraction-inversee',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{4} \\div \\dfrac{9}{8}', attendu: [2, 3],
      fausses: [
        { valeur: '27/32', piege: 'division-terme-a-terme' },
        { valeur: '3/2', piege: 'mauvaise-fraction-inversee' },
        { valeur: '36/24', piege: 'mauvaise-fraction-inversee' },
      ],
    },
    {
      // Le quotient (3/2) dépasse largement le dividende (3/8) : c'est le cas
      // que le programme demande d'inclure, et celui qui heurte le plus.
      id: 'e-9-3-5', type: 'fraction', palier: 2, piege: 'quotient-de-fractions-plus-petit',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{8} \\div \\dfrac{1}{4}', attendu: [3, 2],
      fausses: [
        { valeur: '3/32', piege: 'division-terme-a-terme' },
        { valeur: '2/3', piege: 'mauvaise-fraction-inversee' },
        { valeur: '8/12', piege: 'mauvaise-fraction-inversee' },
      ],
    },
    {
      // Premier neutre : le diviseur 8/3 est PLUS GRAND que 1, donc le quotient
      // (3/10) est plus petit que le dividende (4/5) — exactement ce que
      // l'intuition d'école primaire prédit. Le piège ne joue pas.
      // Sans cet item, l'élève ressortirait du savoir-faire avec une nouvelle
      // règle fausse, symétrique de l'ancienne : « diviser par une fraction,
      // ça agrandit ». Ce qui décide, c'est la comparaison du diviseur à 1.
      id: 'e-9-3-6', type: 'fraction', palier: 2, neutre: true, piege: 'quotient-de-fractions-plus-petit',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{4}{5} \\div \\dfrac{8}{3}', attendu: [3, 10],
      fausses: [
        { valeur: '32/15', piege: 'division-terme-a-terme' },
        { valeur: '10/3', piege: 'mauvaise-fraction-inversee' },
        { valeur: '40/12', piege: 'mauvaise-fraction-inversee' },
      ],
    },
    {
      // Second neutre, et le seul cas du savoir-faire où retourner la mauvaise
      // fraction ne se voit pas : 11/6 × 6/11 vaut 1 tout autant que
      // 6/11 × 11/6. Le piège ne peut pas jouer, l'explication le dit sans
      // faire semblant. L'item sert surtout à empêcher deux automatismes :
      // « on me demande si c'est plausible, donc c'est faux », et « le quotient
      // est forcément plus grand ou plus petit » — ici il vaut exactement 1.
      id: 'e-9-3-7', type: 'plausible', palier: 2, neutre: true, piege: 'mauvaise-fraction-inversee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{6}{11} \\div \\dfrac{6}{11} = 1', attendu: true,
      explication:
        'Oui : un nombre divisé par lui-même donne 1, et les fractions ne font pas '
        + 'exception. Par la règle : 6/11 × 11/6 = 66/66 = 1.\n'
        + 'Remarque honnête : ici, retourner la première fraction au lieu de la '
        + 'seconde donnerait le même résultat. C\'est le seul cas où l\'erreur ne '
        + 'se voit pas — ne compte pas dessus ailleurs.',
    },
    {
      // Un entier divisé par une fraction : la situation exacte de l'activité,
      // avec d'autres nombres. Le quotient (7,5) dépasse le dividende (5).
      id: 'e-9-3-8', type: 'fraction', palier: 3, piege: 'division-terme-a-terme',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '5 \\div \\dfrac{2}{3}', attendu: [15, 2],
      fausses: [
        { valeur: '10/3', piege: 'division-terme-a-terme' },
        { valeur: '2/15', piege: 'mauvaise-fraction-inversee' },
      ],
    },
    {
      id: 'e-9-3-9', type: 'plausible', palier: 3, piege: 'division-terme-a-terme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{7}{8} \\div \\dfrac{1}{2} = \\dfrac{7}{16}', attendu: false,
      explication:
        'Non. Diviser par 1/2, c\'est demander combien de demis tiennent dans 7/8 : '
        + 'il y en a plus d\'un, donc le résultat doit **dépasser** 7/8. Or 7/16 est '
        + 'plus petit. Les deux fractions ont été multipliées sans que la seconde '
        + 'soit retournée. Le vrai résultat est 7/8 × 2/1 = 14/8 = 7/4.',
    },
    {
      // Le réflexe du chapitre 4 pris sur le fait. Les deux premières lignes
      // sont volontairement JUSTES : mettre au même dénominateur ne se trompe
      // pas, ça ne sert simplement à rien ici. L'erreur est ailleurs, et c'est
      // ce déplacement que l'item fait travailler.
      id: 'e-9-3-10', type: 'corriger', palier: 3, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{2}{3} \\div \\dfrac{1}{6}',
      lignes: [
        { texte: '2/3 ÷ 1/6', fausse: false },
        { texte: '= 4/6 ÷ 1/6', fausse: false },
        { texte: '= 4/6', fausse: true },
      ],
      explication:
        'La deuxième ligne est juste : 2/3 vaut bien 4/6. Mettre au même '
        + 'dénominateur n\'est jamais faux — c\'est seulement inutile pour une '
        + 'division. C\'est la troisième ligne qui casse : le dénominateur a été '
        + 'gardé, comme dans une addition. La question posée est « combien de '
        + 'sixièmes tiennent dans 4 sixièmes ? », et la réponse est 4, pas 4/6. '
        + 'Par la règle : 2/3 × 6/1 = 12/3 = 4.',
    },
  ],

  problemes: [
    {
      id: 'p-9-3-1',
      enonce:
        'Un pâtissier dispose de 3/4 de litre de crème. Chaque verrine qu\'il '
        + 'garnit demande 1/16 de litre de crème.',
      questions: [
        { texte: 'Combien de verrines peut-il garnir ?', attendu: 12, unite: 'verrines' },
        { texte: 'Le lendemain il n\'a plus que 1/2 litre de crème. Combien de verrines alors ?', attendu: 8, unite: 'verrines' },
      ],
    },
    {
      id: 'p-9-3-2',
      enonce:
        'Une bobine porte 9/10 de mètre de ruban. On veut la découper en morceaux '
        + 'tous égaux.',
      questions: [
        { texte: 'Combien de morceaux de 3/20 de mètre obtient-on ?', attendu: 6, unite: 'morceaux' },
        { texte: 'Et combien de morceaux de 1/20 de mètre ?', attendu: 18, unite: 'morceaux' },
      ],
    },
    {
      // Le quotient est ici un nombre de bon sens — une durée — et il dépasse
      // 1 dans un cas, pas dans l'autre. Le contrôle de plausibilité se fait
      // tout seul : un robinet plus rapide met moins de temps.
      id: 'p-9-3-3',
      enonce:
        'Un robinet remplit 2/5 d\'une citerne en une heure, à débit constant. '
        + 'Un second robinet, plus rapide, en remplit 5/8 en une heure.',
      questions: [
        { texte: 'En combien d\'heures le premier robinet remplit-il la citerne entière ?', attendu: 2.5, unite: 'h' },
        { texte: 'Et le second, s\'il coule seul ?', attendu: 1.6, unite: 'h' },
      ],
    },
    {
      id: 'p-9-3-4',
      enonce:
        'Léa a 5/6 d\'une plaquette de beurre. Elle veut faire des gâteaux tous '
        + 'identiques.',
      questions: [
        { texte: 'Si chaque gâteau demande 5/24 de plaquette, combien peut-elle en faire ?', attendu: 4, unite: 'gâteaux' },
        { texte: 'Si chaque gâteau demande 5/12 de plaquette, combien peut-elle en faire ?', attendu: 2, unite: 'gâteaux' },
      ],
    },
    {
      id: 'p-9-3-5',
      enonce:
        'Un coureur avance à allure régulière. Il a parcouru 2/3 de son parcours '
        + 'en une demi-heure.',
      questions: [
        { texte: 'Combien d\'heures lui faut-il pour le parcours entier ?', attendu: 0.75, unite: 'h' },
        { texte: 'Combien de minutes cela représente-t-il ?', attendu: 45, unite: 'min' },
      ],
    },
  ],

  test: [
    {
      id: 't-9-3-1', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{5} \\div \\dfrac{2}{7}', attendu: [21, 10],
      fausses: [
        { valeur: '6/35', piege: 'division-terme-a-terme' },
        { valeur: '10/21', piege: 'mauvaise-fraction-inversee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-9-3-2', type: 'calcul', consigne: 'Donne l\'inverse de ce nombre.',
      enonce: '0{,}5', attendu: 2,
      fausses: [{ valeur: -0.5, piege: 'inverse-et-oppose-confondus' }],
      revoir: 'definition',
    },
    {
      id: 't-9-3-3', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{5}{12} \\div \\dfrac{5}{6}', attendu: [1, 2],
      fausses: [
        { valeur: '25/72', piege: 'division-terme-a-terme' },
        { valeur: '2/1', piege: 'mauvaise-fraction-inversee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-9-3-4', type: 'trous', consigne: 'Complète pour transformer cette division en multiplication.',
      enonce: '\\dfrac{7}{8} \\div \\dfrac{3}{5} = \\dfrac{7}{8} \\times \\dfrac{\\square}{\\square}',
      champs: [
        { id: 'a', etiquette: 'numérateur', attendu: 5 },
        { id: 'b', etiquette: 'dénominateur', attendu: 3 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-9-3-5', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{4}{9} \\div \\dfrac{1}{3}', attendu: [4, 3],
      fausses: [
        { valeur: '4/27', piege: 'division-terme-a-terme' },
        { valeur: '3/4', piege: 'mauvaise-fraction-inversee' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-9-3-6', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{5}{6} \\div \\dfrac{1}{3} = \\dfrac{5}{18}', attendu: false,
      explication:
        'Non. Diviser par 1/3 revient à multiplier par 3 : le résultat doit être '
        + 'plus grand que 5/6, et 5/18 est plus petit. Les deux fractions ont été '
        + 'multipliées sans retourner la seconde. Le vrai résultat est '
        + '5/6 × 3/1 = 15/6 = 5/2.',
      piege: 'division-terme-a-terme', revoir: 'exemple',
    },
    {
      id: 't-9-3-7', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '2 \\div \\dfrac{4}{7}', attendu: [7, 2],
      fausses: [
        { valeur: '8/7', piege: 'division-terme-a-terme' },
        { valeur: '2/7', piege: 'mauvaise-fraction-inversee' },
      ],
      revoir: 'remarque',
    },
    {
      id: 't-9-3-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{7}{9} \\div \\dfrac{7}{3} = \\dfrac{1}{3}', attendu: true,
      explication:
        'Oui. Le diviseur 7/3 est plus grand que 1, donc le quotient doit être plus '
        + 'petit que 7/9 — et 1/3 l\'est. Par le calcul : 7/9 × 3/7 = 21/63 = 1/3.',
      revoir: 'remarque',
    },
    {
      id: 't-9-3-9', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{9}{10} \\div \\dfrac{3}{4}', attendu: [6, 5],
      fausses: [
        { valeur: '27/40', piege: 'division-terme-a-terme' },
        { valeur: '5/6', piege: 'mauvaise-fraction-inversee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-9-3-10', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{3}{7} \\div \\dfrac{5}{6} \\ldots \\dfrac{3}{7}', attendu: '>',
      fausses: [{ valeur: '<', piege: 'quotient-de-fractions-plus-petit' }],
      revoir: 'remarque',
    },
  ],
};
