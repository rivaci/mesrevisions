// Savoir-faire 7-5 — Factoriser en repérant un facteur commun.
//
// C'est le geste qui manque le plus au lycée, et pour une raison précise : le
// développement se fait en avançant (je multiplie, je descends), la
// factorisation se fait en REMONTANT (je cherche ce qui multiplie déjà tout).
// L'élève qui n'a jamais fait le trajet dans ce sens croit que factoriser est
// une autre leçon, alors que c'est la même égalité lue à l'envers.
//
// Deux choix structurent le fichier :
//
//   1. L'élève ÉCRIT ses factorisations (type `expression`) au lieu de choisir.
//      Produire « 5(x + 3) » et reconnaître « 5(x + 3) » parmi deux propositions
//      ne sont pas la même compétence — et c'est la première qu'on lui demandera
//      en seconde.
//   2. Le contrôle est toujours le même, et il est parfait : REDÉVELOPPER doit
//      redonner le départ. C'est la seule étape du calcul littéral où l'élève
//      peut se corriger tout seul, sans corrigé et sans professeur. La méthode,
//      les explications et deux items entiers ne travaillent que ça.
//
// La progression des paliers suit les trois formes de facteur commun, dans
// l'ordre où elles résistent : numérique (5x + 15), littéral (x² + 5x), puis
// les deux à la fois (12x² + 8x) — c'est la troisième qui décroche les élèves,
// parce qu'il faut chercher deux choses en même temps.

export default {
  id: 'sf-7-5',
  titre: 'Factoriser en repérant un facteur commun',
  attendus: [
    'Il factorise une expression littérale en repérant un facteur commun.',
    'Il utilise la distributivité dans les deux sens : pour développer et pour factoriser.',
  ],

  // On ne dit pas « factoriser, c'est… ». On fait constater sur des NOMBRES,
  // où l'élève peut tout vérifier de tête, que les deux écritures donnent le
  // même résultat à chaque fois. La lettre n'arrive qu'à la conclusion, une
  // fois l'égalité devenue évidente.
  decouvrir: {
    titre: 'Deux façons de compter les mêmes carreaux',
    texte:
      'Un rectangle de hauteur 3 est coupé en deux morceaux. On peut compter '
      + 'son aire morceau par morceau, ou d\'un seul coup en additionnant '
      + 'd\'abord les largeurs. Voici ce que ça donne pour deux largeurs '
      + 'différentes.',
    lignes: [
      { calcul: '3 × 4 + 3 × 2', resultat: '18' },
      { calcul: '3 × (4 + 2)', resultat: '18' },
      { calcul: '3 × 10 + 3 × 2', resultat: '36' },
      { calcul: '3 × (10 + 2)', resultat: '36' },
    ],
    question: 'À ton tour, avec une largeur de 7. Calcule des deux façons.',
    champs: [
      { id: 'a', etiquette: '3 × 7 + 3 × 2 =', attendu: 27 },
      { id: 'b', etiquette: '3 × (7 + 2) =', attendu: 27 },
    ],
    conclusion:
      'Les deux écritures donnent toujours le même nombre, quelle que soit la '
      + 'largeur. On peut donc remplacer cette largeur par une lettre et écrire '
      + '**3x + 6 = 3(x + 2)**. Passer de la somme au produit, c\'est '
      + '**factoriser** — et c\'est exactement le développement parcouru en '
      + 'sens inverse.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Factoriser',
      texte:
        '**Factoriser** une expression, c\'est l\'écrire sous forme d\'un '
        + '**produit**.\n'
        + 'C\'est le chemin inverse du développement : développer transforme un '
        + 'produit en somme, factoriser transforme une somme en produit.',
    },
    {
      type: 'propriete',
      titre: 'Le facteur commun',
      texte:
        'Si un même facteur k multiplie **tous** les termes d\'une somme, on '
        + 'peut le sortir :\n'
        + '**k × a + k × b = k(a + b)**\n'
        + 'Le facteur k s\'appelle le **facteur commun**. C\'est l\'égalité de '
        + 'la distributivité, lue de droite à gauche.',
    },
    {
      type: 'remarque',
      titre: 'Où le chercher',
      texte:
        'Regarde d\'abord les **nombres** : quel est le plus grand nombre qui '
        + 'les divise tous ? Regarde ensuite les **lettres** : lesquelles sont '
        + 'présentes dans chaque terme ? Le facteur commun est le produit des '
        + 'deux réponses.\n'
        + 'Dans 12x + 18, les nombres 12 et 18 sont tous les deux dans la table '
        + 'de 6, et la lettre n\'est pas dans le second terme : le facteur '
        + 'commun est 6.',
    },
    {
      // La remarque qui justifie l'existence de ce savoir-faire dans l'appli :
      // c'est le seul endroit du calcul littéral où l'élève dispose d'une
      // vérification complète, exacte, et faisable sans aide.
      type: 'remarque',
      titre: 'Une factorisation se vérifie toute seule',
      texte:
        '**Redéveloppe ta réponse.** Si tu ne retombes pas exactement sur '
        + 'l\'expression de départ, elle est fausse — et tu le sais sans '
        + 'corrigé.\n'
        + 'Tu peux aussi remplacer la lettre par un nombre (évite 0, 1 et 2, qui '
        + 'font coïncider des écritures différentes) : les deux expressions '
        + 'doivent donner le même résultat.',
    },
    {
      type: 'exemple',
      texte:
        '3x + 6 = 3(x + 2)   ·   x² + 3x = x(x + 3)   ·   6x² + 4x = 2x(3x + 2)',
    },
  ],

  methode: {
    titre: 'Factoriser quand le facteur commun a un nombre ET une lettre',
    enonce: 'Factoriser A = 10x² + 15x.',
    etapes: [
      {
        texte: 'Je regarde les nombres : 10 et 15 sont tous les deux dans la table de 5.',
        note: 'Le facteur commun contient donc 5.',
      },
      {
        texte: 'Je regarde les lettres : 10x² = 10 × x × x et 15x = 15 × x. Chaque terme contient au moins un x.',
        note: 'Le facteur commun contient donc aussi x.',
      },
      {
        texte: 'Le facteur commun est 5x. J\'écris chaque terme comme un produit par 5x : 10x² = 5x × 2x et 15x = 5x × 3.',
        note: 'C\'est l\'étape qu\'on a envie de sauter, et c\'est celle qui évite toutes les erreurs.',
      },
      {
        texte: 'Donc A = 5x(2x + 3).',
        note: '',
      },
    ],
    controle:
      'Le contrôle : redéveloppe. 5x × 2x = 10x² et 5x × 3 = 15x, donc '
      + '5x(2x + 3) = 10x² + 15x — on retombe exactement sur le départ. Si tu '
      + 'préfères vérifier avec un nombre, prends x = 3 : l\'expression de '
      + 'départ donne 90 + 45 = 135, et 15 × 9 = 135 aussi.',
  },

  entrainement: [
    // ── Palier 1 : le facteur commun est un nombre ──────────────────────────
    {
      id: 'e-7-5-1', type: 'expression', palier: 1, piege: 'facteur-commun-non-vu',
      consigne: 'Factorise cette expression.',
      enonce: '5x + 15', attendu: '5(x+3)',
      fausses: [
        { valeur: '5(x+15)', piege: 'distributivite-incomplete' },
        { valeur: '20x', piege: 'concatenation' },
      ],
    },
    {
      id: 'e-7-5-2', type: 'expression', palier: 1, piege: 'facteur-commun-non-vu',
      consigne: 'Factorise cette expression.',
      enonce: '6x + 9', attendu: '3(2x+3)',
      fausses: [
        { valeur: '3(2x+9)', piege: 'distributivite-incomplete' },
        { valeur: '15x', piege: 'concatenation' },
      ],
    },
    {
      // NEUTRE — et c'est le contrepoids indispensable du savoir-faire. Ici il
      // n'y a AUCUN facteur commun : 3 et 7 n'ont pas de diviseur commun, et le
      // x n'est que dans un terme. Le piège « facteur commun non repéré » ne
      // peut donc pas jouer, puisqu'il n'y a rien à repérer. Sans cet item,
      // « on me donne une somme, donc je sors quelque chose » deviendrait la
      // règle — et c'est exactement ce qui produit les factorisations inventées.
      id: 'e-7-5-3', type: 'expression', palier: 1, neutre: true, piege: 'facteur-commun-non-vu',
      consigne: 'Factorise si c\'est possible. Sinon, recopie l\'expression : elle est déjà aussi simple que possible.',
      enonce: '3x + 7', attendu: '3x+7',
      fausses: [
        { valeur: '3(x+7)', piege: 'facteur-commun-non-vu' },
      ],
    },

    // ── Palier 2 : le facteur commun est une lettre ─────────────────────────
    {
      id: 'e-7-5-4', type: 'expression', palier: 2, piege: 'facteur-commun-non-vu',
      consigne: 'Factorise cette expression.',
      enonce: 'x^{2} + 5x', attendu: 'x(x+5)',
      fausses: [
        { valeur: '6x^2', piege: 'reduction-de-termes-non-semblables' },
        // Le x a bien été repéré et sorti — c'est le premier terme qui n'a pas
        // été divisé par lui. La confusion est donc celle du facteur porté sur
        // un seul terme, pas celle du facteur commun non vu : proposer « je ne
        // voyais rien de commun » à un élève qui l'a vu ne diagnostique rien.
        { valeur: 'x(x^2+5)', piege: 'distributivite-incomplete' },
      ],
    },
    {
      id: 'e-7-5-5', type: 'expression', palier: 2, piege: 'moins-devant-la-parenthese',
      consigne: 'Factorise cette expression.',
      enonce: '4x^{2} - 7x', attendu: 'x(4x-7)',
      fausses: [
        { valeur: 'x(4x+7)', piege: 'moins-devant-la-parenthese' },
        { valeur: '-3x', piege: 'reduction-de-termes-non-semblables' },
      ],
    },
    {
      id: 'e-7-5-6', type: 'trous', palier: 2, piege: 'distributivite-incomplete',
      consigne: 'Complète la factorisation.',
      enonce: '7x + 21 = \\square(x + \\square)',
      champs: [
        { id: 'a', etiquette: 'le facteur commun', attendu: 7 },
        { id: 'b', etiquette: 'le second terme de la parenthèse', attendu: 3 },
      ],
      fausses: [
        { valeur: 21, piege: 'distributivite-incomplete' },
      ],
    },
    {
      // NEUTRE — la factorisation proposée est JUSTE. Le piège « facteur
      // distribué sur un seul terme » ne joue donc pas : l'erreur possible est
      // ici de refuser une réponse correcte, pas d'en accepter une fausse.
      // Sans cet item, « on me demande si c'est plausible, donc c'est faux »
      // suffirait à réussir les deux questions de ce type.
      id: 'e-7-5-7', type: 'plausible', palier: 2, neutre: true, piege: 'distributivite-incomplete',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '8x + 20 = 4(2x + 5)', attendu: true,
      explication:
        'Redéveloppe : 4 × 2x = 8x et 4 × 5 = 20. On retombe exactement sur '
        + '8x + 20, donc la factorisation est juste. Le facteur commun 4 était '
        + 'bien le plus grand possible.',
    },

    // ── Palier 3 : le facteur commun a un nombre ET une lettre ──────────────
    {
      id: 'e-7-5-8', type: 'expression', palier: 3, piege: 'facteur-commun-non-vu',
      consigne: 'Factorise cette expression.',
      enonce: '12x^{2} + 8x', attendu: '4x(3x+2)',
      fausses: [
        { valeur: '4x(3x+8)', piege: 'distributivite-incomplete' },
        { valeur: '20x^2', piege: 'reduction-de-termes-non-semblables' },
      ],
    },
    {
      // Le facteur commun 3x est le bon : ce qui cloche est que le second
      // terme n'a pas été divisé par lui. C'est le même item que t-7-5-8, et
      // il porte le même piège — sur un « plausible » faux, le piège de
      // l'exercice n'est pas une hypothèse de repli, c'est LE diagnostic.
      id: 'e-7-5-9', type: 'plausible', palier: 3, piege: 'distributivite-incomplete',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '9x^{2} + 6x = 3x(3x + 6)', attendu: false,
      explication:
        'Redéveloppe : 3x × 3x = 9x², mais 3x × 6 = 18x, et non 6x. Cette '
        + 'écriture vaut donc 9x² + 18x, pas l\'expression de départ. Le second '
        + 'terme n\'a pas été divisé par 3x : la bonne factorisation est '
        + '3x(3x + 2).',
    },
    {
      id: 'e-7-5-10', type: 'corriger', palier: 3, piege: 'somme-et-produit-confondus',
      consigne: 'Cette factorisation est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '15x^{2} + 10x',
      lignes: [
        { texte: '15x² + 10x', fausse: false },
        { texte: '= 5x × 3x + 5x × 2x', fausse: true },
        { texte: '= 5x(3x + 2x)', fausse: false },
      ],
      explication:
        'La première ligne est le point de départ. C\'est la deuxième qui '
        + 'casse : 5x × 2x ne fait pas 10x mais 10x². Le second terme se découpe '
        + 'en 5x × 2, tout simplement. La troisième ligne ne fait que recopier '
        + 'l\'erreur. La bonne factorisation est 5x(3x + 2), et en la '
        + 'redéveloppant on retombe bien sur 15x² + 10x.',
    },
  ],

  problemes: [
    {
      id: 'p-7-5-1',
      enonce:
        'Un potager rectangulaire mesure 6 m de large. Il est partagé en deux '
        + 'parcelles mises bout à bout : la première mesure x mètres de long, la '
        + 'seconde 5 mètres. L\'aire totale s\'écrit donc 6x + 30, ou encore '
        + '6(x + 5).',
      questions: [
        { texte: 'Quelle est l\'aire totale pour x = 4 ?', attendu: 54, unite: 'm²' },
        { texte: 'Et pour x = 9 ?', attendu: 84, unite: 'm²' },
      ],
    },
    {
      id: 'p-7-5-2',
      enonce:
        'Une salle de sport facture 12 € la séance, quelle que soit l\'activité. '
        + 'Chloé prend x séances de danse et 7 séances d\'escalade. Sa dépense '
        + 's\'écrit 12x + 84.',
      questions: [
        { texte: 'Combien paie-t-elle si elle a pris 3 séances de danse ?', attendu: 120, unite: '€' },
        { texte: 'Elle a payé 180 € en tout. Combien de séances de danse a-t-elle prises ?', attendu: 8, unite: 'séances' },
      ],
    },
    {
      id: 'p-7-5-3',
      enonce:
        'Un carré de côté x cm est collé le long d\'un rectangle de x cm sur '
        + '4 cm. L\'aire de la figure obtenue s\'écrit x² + 4x, ou encore '
        + 'x(x + 4).',
      questions: [
        { texte: 'Quelle est cette aire pour x = 6 ?', attendu: 60, unite: 'cm²' },
        { texte: 'Et pour x = 10 ?', attendu: 140, unite: 'cm²' },
      ],
    },
    {
      id: 'p-7-5-4',
      enonce:
        'Deux terrains rectangulaires ont exactement la même longueur, x mètres. '
        + 'Le premier a une largeur de 9 m, le second de 11 m. L\'aire totale '
        + 's\'écrit 9x + 11x.',
      questions: [
        { texte: 'On met cette aire sous la forme d\'un seul produit. Par quel nombre x est-il multiplié ?', attendu: 20 },
        { texte: 'Quelle est l\'aire totale pour x = 15 ?', attendu: 300, unite: 'm²' },
      ],
    },
    {
      id: 'p-7-5-5',
      enonce:
        'Un rectangle a pour longueur x cm et pour largeur 7 cm. Son périmètre '
        + 's\'écrit 2x + 14, ou encore 2(x + 7).',
      questions: [
        { texte: 'Quel est son périmètre pour x = 11 ?', attendu: 36, unite: 'cm' },
        { texte: 'Son périmètre vaut 50 cm. Quelle est sa longueur ?', attendu: 18, unite: 'cm' },
      ],
    },
  ],

  test: [
    {
      id: 't-7-5-1', type: 'expression',
      consigne: 'Factorise cette expression.',
      enonce: '4x + 12', attendu: '4(x+3)', revoir: 'definition',
    },
    {
      id: 't-7-5-2', type: 'expression',
      consigne: 'Factorise cette expression.',
      enonce: '10x + 25', attendu: '5(2x+5)', revoir: 'propriete',
    },
    {
      id: 't-7-5-3', type: 'expression',
      consigne: 'Factorise cette expression.',
      enonce: 'x^{2} + 9x', attendu: 'x(x+9)', revoir: 'propriete',
    },
    {
      id: 't-7-5-4', type: 'expression',
      consigne: 'Factorise cette expression.',
      enonce: '8x^{2} - 6x', attendu: '2x(4x-3)', revoir: 'exemple',
    },
    {
      id: 't-7-5-5', type: 'trous',
      consigne: 'Complète la factorisation.',
      enonce: '9x + 24 = \\square(3x + \\square)',
      champs: [
        { id: 'a', etiquette: 'le facteur commun', attendu: 3 },
        { id: 'b', etiquette: 'le second terme de la parenthèse', attendu: 8 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-7-5-6', type: 'expression',
      consigne: 'Factorise si c\'est possible. Sinon, recopie l\'expression : elle est déjà aussi simple que possible.',
      enonce: '2x + 9', attendu: '2x+9', revoir: 'remarque',
    },
    {
      id: 't-7-5-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '7x^{2} + 21x = 7x(x + 3)', attendu: true,
      explication:
        'Redéveloppe : 7x × x = 7x² et 7x × 3 = 21x. On retombe exactement sur '
        + 'l\'expression de départ, donc la factorisation est juste.',
      revoir: 'exemple',
    },
    {
      id: 't-7-5-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '6x + 15 = 3(2x + 15)', attendu: false,
      explication:
        'Redéveloppe : 3 × 2x = 6x, mais 3 × 15 = 45. Cette écriture vaut donc '
        + '6x + 45. Le second terme n\'a pas été divisé par 3 : la bonne '
        + 'factorisation est 3(2x + 5).',
      piege: 'distributivite-incomplete', revoir: 'propriete',
    },
    {
      id: 't-7-5-9', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '5x + 20',
      lignes: [
        { texte: '5x + 20 = 5 × x + 5 × 4', fausse: false },
        { texte: '= 5(x + 4)', fausse: false },
        { texte: '= 25x', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : 5(x + 4) est bien la '
        + 'factorisation de 5x + 20. La troisième ajoute une étape qui n\'existe '
        + 'pas — tant qu\'on ne connaît pas x, on ne peut pas aller plus loin. '
        + 'Et l\'égalité écrite est fausse : pour x = 3, 5x + 20 vaut 35, alors '
        + 'que 25x en vaudrait 75.',
      piege: 'egal-qui-donne-le-resultat', revoir: 'definition',
    },
    {
      id: 't-7-5-10', type: 'trous',
      consigne: 'Complète pour que l\'égalité soit vraie.',
      enonce: '\\square x^{2} + 12x = 4x(2x + \\square)',
      champs: [
        { id: 'a', etiquette: 'le coefficient de x²', attendu: 8 },
        { id: 'b', etiquette: 'le second terme de la parenthèse', attendu: 3 },
      ],
      revoir: 'exemple',
    },
  ],
};
