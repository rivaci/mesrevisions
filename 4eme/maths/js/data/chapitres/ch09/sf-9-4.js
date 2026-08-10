// Chapitre 9, savoir-faire 4 — Enchaîner des opérations sur les fractions.
//
// ── Pourquoi ce savoir-faire ferme le chapitre ────────────────────────────
//
// Les trois précédents installent chacun UNE technique : multiplier, prendre
// un inverse, diviser. Tant qu'un exercice ne contient qu'une opération, la
// technique se déclenche sans être choisie — le titre de la page suffit à
// savoir quoi faire. Ici la chaîne mélange une somme et un produit, et la
// méthode doit donc CHANGER au milieu du calcul : dénominateur commun pour
// la somme, surtout pas pour le produit. C'est le seul endroit où l'élève est
// obligé de lire le signe de l'opération avant d'agir.
//
// C'est aussi la raison pour laquelle le chapitre 4 (additionner, soustraire)
// et celui-ci sont séparés dans les manuels : c'est le transfert des règles
// de la somme vers le produit qu'on combat, et un chapitre unique le
// favoriserait.
//
// ── Les pièges du moment, et leurs neutres ────────────────────────────────
//
// Deux confusions dominent la chaîne :
//   — « denominateur-commun-pour-multiplier » : le réflexe du chapitre 4 qui
//     survit au changement d'opération ;
//   — « produit-de-fractions-plus-grand » : multiplier par 1/2 diminue, ce qui
//     contredit dix ans d'arithmétique des entiers.
// La division apporte les deux siennes : « division-terme-a-terme » (multiplié
// sans retourner) et « mauvaise-fraction-inversee » (retourné la première).
//
// Deux items neutres, parce que deux motifs de surface menacent :
//   — « dans une chaîne, il y a toujours un produit à traiter d'abord » :
//     l'item 3 n'a que des sommes et des différences, et le calcul de gauche à
//     droite y est la bonne méthode ;
//   — « multiplier des fractions, ça diminue toujours » : l'item 7 multiplie
//     2/3 par 3/2, facteur supérieur à 1, et le produit y dépasse 2/3. Sans
//     lui, la sur-correction remplacerait le piège par son symétrique.
//
// ── Les réponses fausses qu'on déclare, et celles qu'on ne déclare pas ────
//
// Une chaîne mal ordonnée (« calculé de gauche à droite ») relève d'un piège
// du chapitre 1, pas de celui-ci : on ne l'attache donc à aucune réponse
// fausse ici, plutôt que de la ranger sous une confusion qui n'a pas joué. Les
// `fausses` déclarées sont uniquement celles dont la valeur se déduit
// exactement d'une des confusions du chapitre.

export default {
  id: 'sf-9-4',
  titre: 'Enchaîner des opérations sur les fractions',
  attendus: [
    'Il effectue une suite d\'opérations sur des nombres rationnels en respectant les priorités opératoires.',
    'Il donne le résultat sous forme d\'une fraction simplifiée au maximum.',
  ],

  // On ne rappelle pas la règle des priorités : on met face à face deux copies
  // qui traitent le MÊME calcul dans deux ordres différents. L'élève tranche
  // en calculant, et découvre au passage que les deux opérations de la chaîne
  // ne se traitent pas de la même façon — ce qui est le vrai sujet.
  decouvrir: {
    titre: 'Le même calcul, deux ordres, deux résultats',
    texte:
      'On demande de calculer 1/2 + 1/3 × 3/4. Voici deux copies.',
    copies: [
      { nom: 'Sacha', calcul: '1/2 + 1/3 = 5/6, puis 5/6 × 3/4 = 15/24', resultat: '5/8' },
      { nom: 'Inès', calcul: '1/3 × 3/4 = 3/12 = 1/4, puis 1/2 + 1/4', resultat: '3/4' },
    ],
    question:
      'Une seule des deux copies respecte les priorités. Écris le résultat '
      + 'correct, simplifié au maximum.',
    champs: [
      { id: 'a', etiquette: 'numérateur du résultat :', attendu: 3 },
      { id: 'b', etiquette: 'dénominateur du résultat :', attendu: 4 },
    ],
    conclusion:
      'C\'est **Inès**. La multiplication passe avant l\'addition, exactement '
      + 'comme avec des nombres entiers. Et regarde ce qu\'elle a fait : pour le '
      + '**produit**, elle n\'a cherché **aucun dénominateur commun** — elle a '
      + 'multiplié en haut et en bas. Le dénominateur commun n\'est revenu que '
      + 'pour l\'**addition**. Dans une même chaîne, la méthode change avec '
      + 'l\'opération.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Ordre des priorités',
      texte:
        '1. Les calculs entre **parenthèses**.\n'
        + '2. Les **multiplications** et les **divisions**, de gauche à droite.\n'
        + '3. Les **additions** et les **soustractions**, de gauche à droite.\n'
        + 'Les fractions ne changent rien à cet ordre : c\'est celui de tous les nombres.',
    },
    {
      type: 'propriete',
      titre: 'À chaque opération sa méthode',
      texte:
        'Pour une **somme** ou une **différence** : il faut un **dénominateur '
        + 'commun**, puis on n\'additionne que les numérateurs.\n'
        + 'Pour un **produit** : aucun dénominateur commun. On multiplie les '
        + 'numérateurs entre eux et les dénominateurs entre eux.\n'
        + 'Pour un **quotient** : on multiplie par l\'**inverse du diviseur**, '
        + 'c\'est-à-dire de la fraction qui suit le signe ÷.',
    },
    {
      type: 'remarque',
      titre: 'Quand une fraction est négative',
      texte:
        '−2/3, (−2)/3 et 2/(−3) désignent le **même nombre**. Place le signe au '
        + '**numérateur** avant de calculer : la règle des signes s\'applique '
        + 'ensuite telle quelle, au produit comme au quotient.',
    },
    {
      type: 'remarque',
      titre: 'Estimer chaque étape',
      texte:
        'Multiplier par une fraction **plus petite que 1 diminue** : prendre la '
        + 'moitié de quelque chose, c\'est bien multiplier. Multiplier par une '
        + 'fraction **plus grande que 1 augmente**. Diviser fait l\'inverse.\n'
        + 'Une estimation à chaque étape repère les résultats impossibles sans '
        + 'refaire le calcul. Et quand c\'est possible, **simplifie avant de '
        + 'multiplier** : les nombres restent petits.',
    },
    {
      type: 'exemple',
      texte:
        '(3/4 − 1/2) × 2/3 = 1/4 × 2/3 = 1/6   ·   '
        + '−1/4 + 2/3 ÷ 4/3 = −1/4 + 1/2 = 1/4',
    },
  ],

  methode: {
    titre: 'Enchaîner sans changer de méthode au mauvais moment',
    enonce: 'Calculer A = 5/6 − 2/3 × 9/8.',
    etapes: [
      {
        texte: 'Pas de parenthèses. La multiplication passe avant la soustraction : je commence par 2/3 × 9/8.',
        note: 'Le signe − ne protège pas ce qui le suit.',
      },
      {
        texte: 'Pour ce produit, aucun dénominateur commun : je multiplie en haut et en bas, en simplifiant avant. 9 et 3 se divisent par 3, 2 et 8 par 2 : il reste (1 × 3) / (1 × 4) = 3/4.',
        note: 'Sans simplifier avant, j\'obtiendrais 18/24 — le même nombre, avec plus de travail.',
      },
      {
        texte: 'Il reste 5/6 − 3/4. Là, le dénominateur commun redevient indispensable : 10/12 − 9/12 = 1/12.',
        note: 'Deux méthodes différentes dans un seul calcul, c\'est normal.',
      },
      {
        texte: '1 et 12 n\'ont pas de diviseur commun. Donc A = 1/12.',
        note: 'La question « puis-je simplifier ? » se pose à chaque fois.',
      },
    ],
    controle:
      'Le contrôle : avant chaque ligne, demande-toi quelle opération tu fais. '
      + 'Le dénominateur commun sert à la somme et à la différence, jamais au '
      + 'produit. Estime ensuite : 5/6 vaut environ 0,83 et le produit 0,75 — '
      + 'leur différence doit être petite et positive. 1/12 ≈ 0,08 : cohérent. '
      + 'Un résultat comme 5/8 aurait été repéré comme faux sans refaire un seul calcul.',
  },

  entrainement: [
    {
      // Les deux fractions du produit ont le même dénominateur : c'est la
      // configuration où le réflexe du chapitre 4 est le plus tentant, et où
      // la réponse fausse qu'il produit (6/5 au lieu de 6/25) est exactement
      // calculable. Le diagnostic est donc sans ambiguïté.
      id: 'e-9-4-1', type: 'fraction', palier: 1, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{2}{5} \\times \\dfrac{3}{5} + \\dfrac{1}{5}', attendu: [11, 25],
      fausses: [{ valeur: '7/5', piege: 'denominateur-commun-pour-multiplier' }],
    },
    {
      id: 'e-9-4-2', type: 'fraction', palier: 1, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{5}{6} - \\dfrac{1}{2} \\times \\dfrac{1}{3}', attendu: [2, 3],
    },
    {
      // Premier neutre : aucune multiplication, aucune division. Les deux
      // opérations ont la même priorité, donc le calcul de gauche à droite est
      // ici la BONNE méthode. Sans cet item, « dans une chaîne, il faut
      // toujours commencer par le milieu » deviendrait la règle apprise. Il
      // n'est pas plus facile pour autant : le résultat demande encore une
      // simplification.
      id: 'e-9-4-3', type: 'fraction', palier: 1, neutre: true, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{3}{8} + \\dfrac{1}{8} - \\dfrac{1}{4}', attendu: [1, 4],
    },
    {
      // Le produit d'un nombre par son inverse vaut 1, pas 0 : c'est la somme
      // d'un nombre et de son opposé qui vaut 0. Répondre 0 ici, c'est avoir
      // pris le premier produit pour 0 — la confusion se lit dans la valeur.
      id: 'e-9-4-4', type: 'trous', palier: 2, piege: 'inverse-et-oppose-confondus',
      consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\dfrac{3}{7} \\times \\dfrac{7}{3} - \\square = 0',
      champs: [{ id: 'a', attendu: 1 }],
      fausses: [{ valeur: 0, piege: 'inverse-et-oppose-confondus' }],
    },
    {
      // Les deux façons de rater une division donnent ici deux valeurs
      // distinctes : 31/30 si on a multiplié sans retourner, 17/10 si on a
      // retourné la première fraction au lieu du diviseur.
      id: 'e-9-4-5', type: 'fraction', palier: 2, piege: 'division-terme-a-terme',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{1}{2} + \\dfrac{2}{3} \\div \\dfrac{4}{5}', attendu: [4, 3],
      fausses: [
        { valeur: '31/30', piege: 'division-terme-a-terme' },
        { valeur: '17/10', piege: 'mauvaise-fraction-inversee' },
      ],
    },
    {
      // Comparer sans calculer : à gauche, 1/3 est multiplié par 1/2 avant
      // d'être ajouté, donc on ajoute moins. Répondre « > », c'est croire que
      // multiplier agrandit — et ça se voit sans qu'aucun calcul soit faux.
      id: 'e-9-4-6', type: 'comparer', palier: 2, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{1}{2} + \\dfrac{1}{3} \\times \\dfrac{1}{2} \\ldots \\dfrac{1}{2} + \\dfrac{1}{3}',
      attendu: '<',
      fausses: [{ valeur: '>', piege: 'produit-de-fractions-plus-grand' }],
    },
    {
      // Second neutre : le facteur 3/2 est PLUS GRAND que 1, donc multiplier
      // 2/3 par lui AUGMENTE — le produit vaut 1, plus que 2/3. Le piège ne
      // joue pas : il donnerait même la bonne intuition. Sans cet item, la
      // sur-correction « un produit de fractions est toujours plus petit »
      // remplacerait simplement l'erreur de départ par sa symétrique.
      id: 'e-9-4-7', type: 'plausible', palier: 2, neutre: true, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{3}{2} \\times \\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{5}{4}', attendu: true,
      explication:
        '3/2 × 2/3 = 6/6 = 1 : comme 3/2 dépasse 1, multiplier 2/3 par 3/2 '
        + '**augmente** — le produit vaut 1, soit plus que 2/3. Puis 1 + 1/4 = 5/4. '
        + 'Le compte y est.',
    },
    {
      // Parenthèse et fraction négative dans la même chaîne : la parenthèse se
      // calcule d'abord (dénominateur commun), et son résultat négatif part
      // ensuite dans un produit (surtout pas de dénominateur commun).
      id: 'e-9-4-8', type: 'fraction', palier: 3, piege: 'denominateur-commun-pour-multiplier',
      consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\left( \\dfrac{1}{2} - \\dfrac{5}{6} \\right) \\times \\dfrac{3}{4}', attendu: [-1, 4],
    },
    {
      id: 'e-9-4-9', type: 'plausible', palier: 3, piege: 'produit-de-fractions-plus-grand',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{1}{2} \\times \\dfrac{2}{5} + \\dfrac{1}{5} = \\dfrac{9}{10}', attendu: false,
      explication:
        'Multiplier 2/5 par 1/2, c\'est en prendre la moitié : le produit vaut 1/5, '
        + '**plus petit** que 2/5. En ajoutant 1/5, on obtient 2/5, soit 0,4. Le '
        + 'résultat proposé vaut presque 1 : il supposerait que le produit ait '
        + 'agrandi 2/5, alors qu\'il l\'a diminué.',
    },
    {
      // La troisième ligne est cohérente avec la deuxième : l'erreur est donc
      // bien localisée en ligne 2, et l'élève ne peut pas la repérer en
      // vérifiant seulement le dernier calcul.
      id: 'e-9-4-10', type: 'corriger', palier: 3, piege: 'mauvaise-fraction-inversee',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\dfrac{1}{2} + \\dfrac{3}{4} \\div \\dfrac{3}{8}',
      lignes: [
        { texte: '1/2 + 3/4 ÷ 3/8', fausse: false },
        { texte: '= 1/2 + 4/3 × 3/8', fausse: true },
        { texte: '= 1/2 + 1/2 = 1', fausse: false },
      ],
      explication:
        'Les priorités sont respectées, et la troisième ligne est juste si l\'on '
        + 'accepte la deuxième : 4/3 × 3/8 = 12/24 = 1/2. C\'est donc la deuxième '
        + 'ligne qui casse — c\'est la première fraction qui a été retournée, alors '
        + 'qu\'on retourne le **diviseur**, celui qui suit le signe ÷. Le bon calcul : '
        + '3/4 ÷ 3/8 = 3/4 × 8/3 = 2, puis 1/2 + 2 = 5/2.',
    },
  ],

  problemes: [
    {
      id: 'p-9-4-1',
      enonce:
        'Un pot contient 60 cL de sirop. Tom en verse les 2/3 dans une carafe, '
        + 'puis y ajoute encore l\'équivalent de 1/4 du pot plein.',
      questions: [
        { texte: 'Combien de centilitres verse-t-il d\'abord ?', attendu: 40, unite: 'cL' },
        { texte: 'Combien en ajoute-t-il ensuite ?', attendu: 15, unite: 'cL' },
        { texte: 'Combien de centilitres reste-t-il dans le pot ?', attendu: 5, unite: 'cL' },
      ],
    },
    {
      // La « fraction du reste » : le second pourcentage ne porte pas sur le
      // total. C'est le contexte où la chaîne d'opérations a une conséquence
      // concrète — se tromper de référence change la réponse du simple au double.
      id: 'p-9-4-2',
      enonce:
        'Marc a 48 € d\'économies. Il dépense 1/3 de cette somme pour un jeu, '
        + 'puis les 3/4 de ce qui lui reste pour des cadeaux.',
      questions: [
        { texte: 'Combien coûte le jeu ?', attendu: 16, unite: '€' },
        { texte: 'Combien lui reste-t-il après cet achat ?', attendu: 32, unite: '€' },
        { texte: 'Combien dépense-t-il en cadeaux ?', attendu: 24, unite: '€' },
      ],
    },
    {
      // Une fraction d'une fraction : 2/5 des 3/4 font 3/10 du total, soit
      // moins que chacune des deux. Le calcul le montre en nombres de places.
      id: 'p-9-4-3',
      enonce:
        'Une salle de cinéma compte 200 places. Les 3/4 ont été vendues, et '
        + 'parmi les places vendues, 2/5 sont à tarif réduit.',
      questions: [
        { texte: 'Combien de places ont été vendues ?', attendu: 150, unite: 'places' },
        { texte: 'Combien de places à tarif réduit ?', attendu: 60, unite: 'places' },
        { texte: 'Combien de places vendues sont au plein tarif ?', attendu: 90, unite: 'places' },
      ],
    },
    {
      id: 'p-9-4-4',
      enonce:
        'Une recette de crêpes pour 6 personnes demande 750 mL de lait et 500 g '
        + 'de farine. Sarah cuisine pour 9 personnes : elle multiplie donc chaque '
        + 'quantité par 3/2.',
      questions: [
        { texte: 'Combien de millilitres de lait lui faut-il ?', attendu: 1125, unite: 'mL' },
        { texte: 'Combien de grammes de farine ?', attendu: 750, unite: 'g' },
        { texte: 'Elle n\'a qu\'un litre de lait. Combien de millilitres lui manque-t-il ?', attendu: 125, unite: 'mL' },
      ],
    },
    {
      // Une division par une fraction plus petite que 1 : le nombre de
      // morceaux dépasse la longueur du ruban, ce qui surprend et se vérifie.
      id: 'p-9-4-5',
      enonce:
        'Un ruban mesure 9/4 de mètre. On le coupe en morceaux de 3/8 de mètre, '
        + 'sans perte.',
      questions: [
        { texte: 'Combien de morceaux obtient-on ?', attendu: 6, unite: 'morceaux' },
        { texte: 'Si on retire d\'abord 3/4 de mètre du ruban, combien de morceaux obtient-on ?', attendu: 4, unite: 'morceaux' },
      ],
    },
  ],

  test: [
    {
      id: 't-9-4-1', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{1}{3} + \\dfrac{1}{2} \\times \\dfrac{2}{5}', attendu: [8, 15], revoir: 'propriete',
    },
    {
      id: 't-9-4-2', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{7}{8} - \\dfrac{1}{2} \\times \\dfrac{3}{4}', attendu: [1, 2], revoir: 'propriete',
    },
    {
      id: 't-9-4-3', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{2}{5} \\times \\dfrac{5}{6} + \\dfrac{1}{3}', attendu: [2, 3], revoir: 'exemple',
    },
    {
      id: 't-9-4-4', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\dfrac{1}{4} + \\dfrac{3}{5} \\div \\dfrac{6}{5}', attendu: [3, 4], revoir: 'propriete',
    },
    {
      id: 't-9-4-5', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '\\left( \\dfrac{2}{3} - \\dfrac{1}{6} \\right) \\times \\dfrac{2}{5}', attendu: [1, 5], revoir: 'propriete',
    },
    {
      id: 't-9-4-6', type: 'fraction', consigne: 'Calcule et simplifie autant que possible.',
      enonce: '-\\dfrac{2}{3} + \\dfrac{1}{2} \\times \\dfrac{4}{5}', attendu: [-4, 15], revoir: 'remarque',
    },
    {
      id: 't-9-4-7', type: 'trous', consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\dfrac{5}{9} \\times \\dfrac{9}{5} + \\square = 3',
      champs: [{ id: 'a', attendu: 2 }],
      fausses: [{ valeur: 3, piege: 'inverse-et-oppose-confondus' }],
      revoir: 'propriete',
    },
    {
      id: 't-9-4-8', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{3}{4} \\times \\dfrac{2}{3} + \\dfrac{1}{2} = 1', attendu: true,
      explication:
        '3/4 × 2/3 = 6/12 = 1/2 — plus petit que chacun des deux facteurs, c\'est '
        + 'normal. Puis 1/2 + 1/2 = 1. Le compte y est.',
      revoir: 'exemple',
    },
    {
      id: 't-9-4-9', type: 'plausible', consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\dfrac{1}{3} + \\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{4}{3}', attendu: false,
      explication:
        'Multiplier 1/3 par 1/2, c\'est prendre sa moitié : 1/6. On ajoute donc à '
        + '1/3 un nombre plus petit que 1/3 — impossible de dépasser 1. Un '
        + 'dénominateur commun a été cherché pour le produit, comme s\'il s\'agissait '
        + 'd\'une somme. Le vrai résultat : 1/3 + 1/6 = 1/2.',
      piege: 'denominateur-commun-pour-multiplier', revoir: 'propriete',
    },
    {
      id: 't-9-4-10', type: 'comparer', consigne: 'Compare ces deux nombres.',
      enonce: '\\dfrac{3}{4} \\times \\dfrac{4}{5} \\ldots \\dfrac{3}{4}', attendu: '<',
      fausses: [{ valeur: '>', piege: 'produit-de-fractions-plus-grand' }],
      revoir: 'remarque',
    },
  ],
};
