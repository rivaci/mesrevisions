// Chapitre 1, savoir-faire 4 — Les puissances dans l'ordre, et les groupements.
//
// ── Deux choses du cahier, réunies ici ───────────────────────────────────
//
// « Puissances sont encore au niveau supérieur », et la remarque « penser aux
// groupements ». Elles sont regroupées parce qu'elles ferment le chapitre de la
// même façon : ce sont les deux dernières marches de l'échelle des priorités,
// et les deux derniers endroits où l'ordre de lecture se fait piéger.
//
// ── Ce que « puissance » veut dire à ce niveau ───────────────────────────
//
// Le carré et le cube, pas davantage. L'exposant dit COMBIEN DE FOIS le nombre
// se multiplie par lui-même — et la première erreur, avant toute question de
// priorité, est de lire 3² comme 3 × 2. Un item entier lui est consacré, sinon
// le reste du savoir-faire porterait sur du sable.
//
// ── L'erreur de portée ───────────────────────────────────────────────────
//
// Une fois 3² compris, l'erreur devient celle de la PORTÉE : dans 2 × 3², le
// carré ne concerne que le 3. L'élève qui écrit 36 n'a pas mal calculé, il a
// élevé au carré le mauvais objet — il a lu (2 × 3)². C'est une erreur de
// lecture, pas d'arithmétique, et le geste de contrôle le dit ainsi : entourer
// le nombre qui porte l'exposant, lui seul.
//
// ── Pourquoi les groupements ferment le chapitre ─────────────────────────
//
// Parce qu'ils demandent tout ce qui précède. Décider si 17 − 25 + 3 autorise
// un regroupement suppose de savoir que − et + sont de même niveau, que l'ordre
// de lecture s'y applique, et que le signe placé devant un nombre lui donne son
// rôle. C'est le seul savoir-faire du chapitre où l'élève doit refuser une
// méthode qui marche ailleurs.

export default {
  id: 'sf-1-4',
  titre: 'Les puissances et les groupements astucieux',
  attendus: [
    'Il calcule une puissance avant les multiplications et les divisions.',
    'Il sait qu\'un exposant ne porte que sur le nombre qui le précède.',
    'Il regroupe des termes seulement lorsque l\'opération le permet.',
  ],

  decouvrir: {
    titre: 'Sur quel nombre porte le petit 2 ?',
    texte:
      'On veut calculer 2 × 3². Un élève comprend « je multiplie 2 par 3, et '
      + 'j\'élève le tout au carré ». Un autre comprend « le carré ne concerne '
      + 'que le 3 ».',
    lignes: [
      { calcul: 'Le premier élève', resultat: '(2 × 3)² = 6²' },
      { calcul: 'Le second élève', resultat: '2 × (3 × 3)' },
    ],
    question: 'Calcule les deux.',
    champs: [
      { id: 'a', etiquette: 'le premier trouve', attendu: 36 },
      { id: 'b', etiquette: 'le second trouve', attendu: 18 },
    ],
    conclusion:
      'C\'est le **second** qui a raison : 2 × 3² = 2 × 9 = **18**.\n'
      + 'Un exposant ne porte que sur le nombre **juste avant lui**. Pour qu\'il '
      + 'porte sur tout le calcul, il faudrait l\'écrire (2 × 3)².\n'
      + 'Et la puissance se calcule **avant** la multiplication : elle est au '
      + 'niveau juste en dessous des parenthèses.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Le carré et le cube',
      texte:
        '**3²** se lit « trois au carré » et vaut 3 × 3 = **9**.\n'
        + '**2³** se lit « deux au cube » et vaut 2 × 2 × 2 = **8**.\n'
        + 'L\'exposant dit **combien de fois** le nombre se multiplie par '
        + 'lui-même. Il ne se multiplie pas avec : 3² ne vaut pas 3 × 2.',
    },
    {
      type: 'propriete',
      titre: 'L\'échelle complète des priorités',
      texte:
        '1. les **parenthèses**, en commençant par la plus intérieure ;\n'
        + '2. les **puissances** ;\n'
        + '3. les **multiplications et divisions**, de gauche à droite ;\n'
        + '4. les **additions et soustractions**, de gauche à droite.',
    },
    {
      type: 'propriete',
      titre: 'La portée d\'un exposant',
      texte:
        'Un exposant ne concerne que le nombre **collé à lui**.\n'
        + 'Dans **2 × 3²**, le carré porte sur le 3 seul : 2 × 9 = **18**.\n'
        + 'Dans **(2 × 3)²**, il porte sur le résultat de la parenthèse : '
        + '6² = **36**.',
    },
    {
      type: 'remarque',
      titre: 'Regrouper, mais seulement entre + ou entre ×',
      texte:
        'Regrouper pour tomber juste fait gagner du temps, et c\'est permis '
        + 'entre **additions** ou entre **multiplications** :\n'
        + '25 + 17 + 75 : on regroupe 25 + 75 = 100, puis 100 + 17 = **117**.\n'
        + 'Mais dans **17 − 25 + 3**, on ne peut pas rapprocher le 25 et le 3 : '
        + 'l\'un est enlevé, l\'autre ajouté. Regarde le signe **devant** chaque '
        + 'nombre avant de le déplacer.',
    },
    {
      type: 'exemple',
      texte:
        '2 × 3² = 18   ·   (2 × 3)² = 36   ·   5 + 2³ = 13   ·   '
        + '25 + 17 + 75 = 117 (en regroupant 25 + 75)',
    },
  ],

  methode: {
    titre: 'Calculer 5 + 2 × 3²',
    enonce: 'Calculer 5 + 2 × 3².',
    etapes: [
      {
        texte: 'J\'entoure le nombre qui porte l\'exposant : c\'est le 3, et lui seul.',
        note: 'Pas le 2 × 3 : l\'exposant ne saute pas par-dessus la multiplication.',
      },
      { texte: 'Je calcule la puissance : 3² = 3 × 3 = 9.', note: 'Elle passe avant la multiplication.' },
      { texte: 'Je recopie : 5 + 2 × 9.', note: '' },
      { texte: 'Puis la multiplication : 2 × 9 = 18. Il reste 5 + 18.', note: '' },
      { texte: 'Enfin l\'addition : 5 + 18 = 23.', note: '' },
    ],
    controle:
      'Le contrôle : une puissance fait grandir vite. Si ton résultat est du '
      + 'même ordre que le calcul sans exposant (ici 5 + 2 × 3 = 11), c\'est que '
      + 'tu as oublié la puissance. S\'il est beaucoup trop grand, tu l\'as sans '
      + 'doute appliquée à tout le produit.',
  },

  entrainement: [
    // ── Palier 1 : ce qu'un exposant veut dire ─────────────────────────────
    {
      id: 'e-1-4-1', type: 'calcul', palier: 1, piege: 'puissance-mal-lue',
      consigne: 'Calcule.', enonce: '3^2', attendu: 9,
      fausses: [{ valeur: 6, piege: 'puissance-mal-lue' }],
    },
    {
      id: 'e-1-4-2', type: 'calcul', palier: 1, piege: 'puissance-mal-lue',
      consigne: 'Calcule.', enonce: '2^3', attendu: 8,
      fausses: [{ valeur: 6, piege: 'puissance-mal-lue' }],
    },
    {
      id: 'e-1-4-3', type: 'calcul', palier: 1, piege: 'puissance-mal-placee',
      consigne: 'Calcule.', enonce: '2 \\times 3^2', attendu: 18,
      fausses: [{ valeur: 36, piege: 'puissance-mal-placee' }],
    },
    {
      // NEUTRE, et jumeau du précédent : ici la parenthèse rend le 36 juste.
      // Sans lui, « 36 est toujours faux » remplacerait la règle de portée.
      id: 'e-1-4-4', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '(2 \\times 3)^2', attendu: 36,
    },
    // ── Palier 2 : la puissance dans un calcul plus long ───────────────────
    {
      id: 'e-1-4-5', type: 'calcul', palier: 2, piege: 'puissance-mal-placee',
      consigne: 'Calcule.', enonce: '5 + 2 \\times 3^2', attendu: 23,
      fausses: [
        // 5 + 6² = 41 : l'exposant appliqué au produit.
        { valeur: 41, piege: 'puissance-mal-placee' },
        // 5 + 2 × 3 = 11 : la puissance simplement ignorée.
        { valeur: 11, piege: 'puissance-mal-placee' },
      ],
    },
    {
      id: 'e-1-4-6', type: 'calcul', palier: 2, piege: 'puissance-mal-placee',
      consigne: 'Calcule.', enonce: '4^2 - 6', attendu: 10,
      fausses: [{ valeur: 2, piege: 'puissance-mal-lue' }],
    },
    {
      // NEUTRE. Un regroupement astucieux parfaitement permis : que des
      // additions. Il faut que l'élève ose le faire, pas seulement qu'il sache
      // quand s'en abstenir.
      id: 'e-1-4-7', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule, en regroupant astucieusement.', enonce: '25 + 17 + 75', attendu: 117,
    },
    {
      id: 'e-1-4-8', type: 'trous', palier: 2, piege: 'puissance-mal-placee',
      consigne: 'Calcule 3 × 4² en deux étapes.',
      enonce: '3 \\times 4^2',
      champs: [
        { id: 'a', etiquette: 'la puissance : 4²', attendu: 16 },
        { id: 'b', etiquette: 'résultat final', attendu: 48 },
      ],
    },
    // ── Palier 3 : décider si le regroupement est permis ───────────────────
    {
      id: 'e-1-4-9', type: 'calcul', palier: 3, piege: 'groupement-abusif',
      consigne: 'Calcule.', enonce: '40 - 18 + 8', attendu: 30,
      fausses: [
        // 40 − 26 : le 18 et le 8 regroupés, alors que l'un est enlevé et
        // l'autre ajouté.
        { valeur: 14, piege: 'groupement-abusif' },
      ],
    },
    {
      id: 'e-1-4-10', type: 'corriger', palier: 3, piege: 'groupement-abusif',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Calculer } 50 - 12 + 8',
      lignes: [
        { texte: 'Il n\'y a que des additions et des soustractions : même niveau.', fausse: false },
        { texte: 'Je regroupe 12 + 8 = 20 pour aller plus vite.', fausse: true },
        { texte: 'Puis 50 − 20 = 30.', fausse: false },
        { texte: 'Donc 50 − 12 + 8 = 30.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et le calcul des deux dernières aussi — '
        + 'mais le regroupement de la deuxième ne l\'est pas. Le 12 est enlevé, '
        + 'le 8 est ajouté : les rapprocher revient à enlever le 8 lui aussi. '
        + 'De gauche à droite : 50 − 12 = 38, puis 38 + 8 = 46.',
    },
  ],

  problemes: [
    {
      id: 'p-1-4-1',
      enonce: 'Un carré mesure 6 cm de côté.',
      questions: [
        { texte: 'Quelle est son aire, en cm² ?', attendu: 36, unite: 'cm²' },
        { texte: 'Quel est son périmètre, en cm ?', attendu: 24, unite: 'cm' },
      ],
    },
    {
      id: 'p-1-4-2',
      enonce:
        'Un cube a une arête de 4 cm. On veut connaître son volume, qui vaut '
        + 'l\'arête au cube.',
      questions: [
        { texte: 'Quelle est l\'aire d\'une de ses faces, en cm² ?', attendu: 16, unite: 'cm²' },
        { texte: 'Quel est son volume, en cm³ ?', attendu: 64, unite: 'cm³' },
      ],
    },
    {
      id: 'p-1-4-3',
      enonce:
        'Une salle est carrée et mesure 5 m de côté. On y pose un tapis carré '
        + 'de 3 m de côté.',
      questions: [
        { texte: 'Quelle est l\'aire de la salle, en m² ?', attendu: 25, unite: 'm²' },
        { texte: 'Quelle est l\'aire du tapis, en m² ?', attendu: 9, unite: 'm²' },
        { texte: 'Quelle aire de sol reste visible, en m² ?', attendu: 16, unite: 'm²' },
      ],
    },
    {
      id: 'p-1-4-4',
      enonce:
        'Antonin range 45 billes, en donne 18 à son frère, puis en récupère 18 '
        + 'ailleurs.',
      questions: [
        { texte: 'Combien de billes après avoir donné ?', attendu: 27, unite: 'billes' },
        { texte: 'Combien de billes à la fin ?', attendu: 45, unite: 'billes' },
      ],
    },
    {
      id: 'p-1-4-5',
      enonce:
        'Une facture comprend 3 articles à 25 €, 1 article à 17 € et '
        + '1 article à 75 €.',
      questions: [
        { texte: 'Combien coûtent les trois articles identiques ?', attendu: 75, unite: '€' },
        { texte: 'Quel est le total de la facture ?', attendu: 167, unite: '€' },
      ],
    },
  ],

  test: [
    { id: 't-1-4-1', type: 'calcul', consigne: 'Calcule.', enonce: '5^2', attendu: 25, revoir: 'definition' },
    { id: 't-1-4-2', type: 'calcul', consigne: 'Calcule.', enonce: '3^3', attendu: 27, revoir: 'definition' },
    { id: 't-1-4-3', type: 'calcul', consigne: 'Calcule.', enonce: '2 \\times 5^2', attendu: 50, revoir: 'propriete' },
    { id: 't-1-4-4', type: 'calcul', consigne: 'Calcule.', enonce: '(2 \\times 5)^2', attendu: 100, revoir: 'propriete' },
    { id: 't-1-4-5', type: 'calcul', consigne: 'Calcule.', enonce: '4 + 3 \\times 2^2', attendu: 16, revoir: 'exemple' },
    {
      id: 't-1-4-6', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Le nombre 4 au carré est égal à 8.',
      attendu: false, revoir: 'definition',
    },
    { id: 't-1-4-7', type: 'calcul', consigne: 'Calcule, en regroupant astucieusement.', enonce: '38 + 47 + 62', attendu: 147, revoir: 'remarque' },
    { id: 't-1-4-8', type: 'calcul', consigne: 'Calcule.', enonce: '60 - 25 + 5', attendu: 40, revoir: 'remarque' },
    {
      id: 't-1-4-9', type: 'trous', consigne: 'Calcule 2 × 6² en deux étapes.',
      enonce: '2 \\times 6^2',
      champs: [
        { id: 'a', etiquette: 'la puissance : 6²', attendu: 36 },
        { id: 'b', etiquette: 'résultat final', attendu: 72 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-1-4-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Dans le calcul 5 − 2 + 3, on peut regrouper le 2 et le 3 pour aller plus vite.',
      attendu: false, revoir: 'remarque',
    },
  ],
};
