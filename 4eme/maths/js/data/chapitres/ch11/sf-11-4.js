// Savoir-faire 11-4 — Mettre un problème en équation.
//
// C'est le savoir-faire que le programme met en avant — « en introduisant une
// lettre pour désigner une inconnue » — et celui que les exerciseurs sautent,
// parce qu'il ne se corrige pas par un nombre. Ici il se corrige : l'élève
// PRODUIT l'expression qui traduit l'énoncé, et le moteur la compare à la
// bonne écriture en remplaçant la lettre par des nombres. Toute écriture
// équivalente passe.
//
// ── Pourquoi on ne demande pas la solution ────────────────────────────────
//
// Résoudre est déjà travaillé par les savoir-faire précédents. Ce qui reste
// difficile, et qui n'est presque jamais entraîné seul, c'est le passage de la
// phrase à l'écriture. Un élève qui sait résoudre 4x = 96 peut très bien ne pas
// savoir d'où vient ce 4x. On isole donc ce geste-là, et rien d'autre.
//
// ── Le piège, et le choix de conception qu'il impose ──────────────────────
//
// L'erreur documentée n'est pas « il ne sait pas traduire » : c'est que la
// lettre ne désigne pas dans sa tête ce que l'énoncé dit qu'elle désigne. Il
// écrit alors une expression PARFAITEMENT correcte — pour une autre grandeur.
// Aucun contrôle sur le résultat ne l'attrape, puisqu'il n'y a pas de résultat.
//
// D'où le parti pris de tous les énoncés : c'est l'application qui impose la
// phrase « on note x … », et elle l'impose souvent sur la grandeur que l'élève
// n'aurait PAS choisie spontanément. Qui traduit mécaniquement les mots sans
// relire cette phrase produit exactement la réponse fausse déclarée. Le
// diagnostic est donc net : ce n'est pas la traduction qui a raté, c'est la
// lettre qui pointait ailleurs.
//
// Le palier 3 termine sur le cas le plus vicieux : une résolution entièrement
// juste dont la conclusion répond à côté. C'est le vrai visage du piège en
// contrôle.

export default {
  id: 'sf-11-4',
  titre: 'Mettre un problème en équation',
  attendus: [
    'Il met un problème en équation en introduisant une lettre pour désigner une inconnue.',
    'Il modélise une situation à l\'aide d\'une expression littérale, puis d\'une égalité.',
  ],

  // On ne présente pas l'équation comme une nouveauté à apprendre : on fait
  // faire des essais jusqu'à ce que leur lenteur se sente, puis on montre
  // qu'une seule écriture les contient tous. L'équation apparaît alors comme
  // un raccourci qu'on avait envie d'avoir, pas comme une règle de plus.
  decouvrir: {
    titre: 'Essayer des nombres, ou écrire ce qu\'on cherche',
    texte:
      'Un rectangle a une longueur qui dépasse sa largeur de 3 cm, et son '
      + 'périmètre mesure 34 cm. On cherche sa largeur. Voici trois essais.',
    lignes: [
      { calcul: 'largeur 5 cm, donc longueur 8 cm', resultat: 'périmètre 26 cm' },
      { calcul: 'largeur 6 cm, donc longueur 9 cm', resultat: 'périmètre 30 cm' },
      { calcul: 'largeur 8 cm, donc longueur 11 cm', resultat: 'périmètre 38 cm' },
    ],
    question:
      'Note x la largeur, en centimètres. La longueur vaut alors x + 3, et le '
      + 'périmètre 2 × (x + x + 3), c\'est-à-dire 2 × (2x + 3). Vérifie que cette '
      + 'écriture redonne bien deux des essais ci-dessus.',
    champs: [
      { id: 'a', etiquette: 'pour x = 5 : 2 × (2 × 5 + 3) =', attendu: 26 },
      { id: 'b', etiquette: 'pour x = 8 : 2 × (2 × 8 + 3) =', attendu: 38 },
    ],
    conclusion:
      'Une seule écriture, **2(2x + 3)**, contient tous les essais à la fois. '
      + 'Le problème réclame un périmètre de 34 cm : il suffit donc d\'écrire '
      + '**2(2x + 3) = 34** et de chercher la valeur de x qui convient. C\'est ça, '
      + 'mettre en équation — on arrête de deviner, on écrit ce qu\'on cherche. Et '
      + 'tout commence par une phrase : **« je note x la largeur »**.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Mettre en équation',
      texte:
        '**Mettre un problème en équation**, c\'est le traduire par une égalité '
        + 'qui contient une lettre.\n'
        + 'Cette lettre s\'appelle l\'**inconnue** : elle désigne une grandeur qu\'on '
        + 'ne connaît pas encore et qu\'on cherche.',
    },
    {
      // Le cœur du savoir-faire tient dans cette phrase, et c'est précisément
      // celle que les copies ne portent pas. La rendre obligatoire coûte dix
      // secondes et supprime l'erreur la plus coûteuse du chapitre.
      type: 'remarque',
      titre: 'La phrase qui commence tout',
      texte:
        'Écris toujours, en toutes lettres, **ce que désigne la lettre** : '
        + '« je note x le nombre de … », « je note x le prix de …, en euros ».\n'
        + 'Le plus sûr est de noter x **la grandeur qu\'on te demande**. Les autres '
        + 'grandeurs s\'écrivent ensuite en fonction d\'elle.',
    },
    {
      type: 'remarque',
      titre: 'Traduire les mots en opérations',
      texte:
        '« 5 de plus que x » s\'écrit **x + 5**.\n'
        + '« 5 de moins que x » s\'écrit **x − 5**.\n'
        + '« 5 fois plus que x » s\'écrit **5x**, et surtout pas x + 5.\n'
        + '« le tiers de x » s\'écrit **x ÷ 3**.\n'
        + 'Deux grandeurs réunies, c\'est la **somme** de leurs deux expressions.',
    },
    {
      type: 'remarque',
      titre: 'La dernière étape : revenir à la question',
      texte:
        'Trouver x ne termine pas le problème. Relis la question : si tu as noté x '
        + 'le prix du pull alors qu\'on demandait celui du tee-shirt, il te reste **un '
        + 'calcul à faire**.\n'
        + 'Une équation juste peut très bien répondre à une autre question que celle posée.',
    },
    {
      type: 'exemple',
      texte:
        'Problème : « Sacha et Nour ont 45 € à eux deux, et Nour a 7 € de plus que '
        + 'Sacha. Combien Sacha a-t-il ? »\n'
        + 'On note x la somme de Sacha, en euros. Nour a alors x + 7.\n'
        + 'À eux deux : x + (x + 7) = 45, c\'est-à-dire 2x + 7 = 45.',
    },
  ],

  methode: {
    titre: 'Passer d\'un énoncé à une équation',
    enonce:
      'Dans un club, il y a 3 fois plus d\'adhérents au judo qu\'à l\'escrime, et le '
      + 'club compte 96 adhérents. Mettre ce problème en équation, puis dire combien '
      + 'd\'adhérents font de l\'escrime.',
    etapes: [
      {
        texte:
          'Je relis la question : on cherche le nombre d\'adhérents à l\'escrime. '
          + 'C\'est donc lui que je note x, et je l\'écris.',
        note: 'La grandeur cherchée d\'abord — l\'autre s\'exprimera en fonction d\'elle.',
      },
      {
        texte: 'Le judo en compte 3 fois plus, donc 3x.',
        note: '« 3 fois plus » donne 3x, jamais x + 3.',
      },
      {
        texte: 'Le club entier compte x + 3x adhérents, c\'est-à-dire 4x. Et il en compte 96.',
        note: 'Deux écritures de la même grandeur : voilà d\'où sort l\'égalité.',
      },
      {
        texte: 'L\'équation est donc 4x = 96, ce qui donne x = 24.',
        note: 'On divise les deux membres par 4 : le 4 multiplie x, il ne s\'ajoute pas à lui.',
      },
      {
        texte: 'La question portait sur l\'escrime : il y a 24 adhérents à l\'escrime, et 72 au judo.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : remets tes deux nombres dans l\'énoncé de départ, pas dans ton '
      + 'équation. 72 est bien 3 fois 24, et 24 + 72 = 96 : les deux phrases de '
      + 'l\'énoncé sont vérifiées. Si l\'une des deux ne colle pas, c\'est l\'équation '
      + 'qu\'il faut reprendre, pas le calcul.',
  },

  entrainement: [
    // ── Palier 1 : la lettre est nommée pour toi, traduis une phrase ────────
    {
      id: 'e-11-4-1', type: 'expression', palier: 1, piege: 'inconnue-mal-choisie',
      consigne:
        'Marc a 5 billes de plus que Léa. On note x le nombre de billes de Léa. '
        + 'Écris le nombre de billes de Marc en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de billes de Léa}',
      attendu: 'x+5',
      fausses: [
        // x − 5, c'est le nombre de billes de Léa quand x désigne celles de
        // Marc : l'expression est juste, la lettre pointe la mauvaise personne.
        { valeur: 'x-5', piege: 'inconnue-mal-choisie' },
      ],
    },
    {
      id: 'e-11-4-2', type: 'expression', palier: 1, piege: 'inconnue-mal-choisie',
      consigne:
        'Dans un club, il y a 6 adhérents de moins en escrime qu\'en judo. On note x '
        + 'le nombre de judokas. Écris le nombre de personnes qui font de l\'escrime '
        + 'en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de judokas}',
      attendu: 'x-6',
      fausses: [
        { valeur: 'x+6', piege: 'inconnue-mal-choisie' },
      ],
    },
    {
      // Item neutre : une seule grandeur inconnue est en jeu, il n'y a donc
      // aucune autre grandeur que la lettre pourrait désigner — le piège ne
      // peut pas jouer. Sans lui, « il y a deux nombres dans l'énoncé, donc
      // j'écris une somme ou une différence » traverserait tout le palier.
      id: 'e-11-4-3', type: 'expression', palier: 1, neutre: true,
      consigne:
        'Un cahier coûte 3 €. On note x le nombre de cahiers achetés. Écris le prix '
        + 'payé, en euros, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de cahiers achetés}',
      attendu: '3x',
      fausses: [],
    },

    // ── Palier 2 : la lettre désigne la grandeur qu'on n'aurait pas choisie ─
    {
      id: 'e-11-4-4', type: 'expression', palier: 2, piege: 'inconnue-mal-choisie',
      consigne:
        'Un pantalon coûte 3 fois plus cher qu\'un tee-shirt. On note x le prix du '
        + 'pantalon, en euros. Écris le prix du tee-shirt en fonction de x.',
      enonce: '\\text{on note } x \\text{ le prix du pantalon, en euros}',
      attendu: 'x/3',
      fausses: [
        // 3x est la réponse de qui a lu « 3 fois plus » et écrit 3x sans
        // regarder ce que x désigne : ce serait juste si x était le tee-shirt.
        { valeur: '3x', piege: 'inconnue-mal-choisie' },
      ],
    },
    {
      id: 'e-11-4-5', type: 'expression', palier: 2, piege: 'inconnue-mal-choisie',
      consigne:
        'Deux sacs contiennent des billes. Le grand sac en contient 5 de plus que le '
        + 'petit. On note x le nombre de billes du petit sac. Écris, en fonction de x, '
        + 'le nombre total de billes des deux sacs.',
      enonce: '\\text{on note } x \\text{ le nombre de billes du petit sac}',
      attendu: '2x+5',
      fausses: [
        // 2x − 5 est le total quand x désigne le GRAND sac : même raisonnement,
        // autre lettre.
        { valeur: '2x-5', piege: 'inconnue-mal-choisie' },
      ],
    },
    {
      id: 'e-11-4-6', type: 'plausible', palier: 2, piege: 'solution-non-verifiee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{somme des deux nombres : } 40 \\text{ ; écart entre eux : } 6 \\text{ ; le plus petit vaudrait } 18',
      attendu: false,
      explication:
        'Il suffit de remplacer pour voir : si le plus petit valait 18, le plus grand '
        + 'vaudrait 24, et leur somme ferait 42, pas 40. En notant x le plus petit, '
        + 'l\'équation est x + (x + 6) = 40, soit 2x + 6 = 40 : le plus petit vaut 17.',
    },
    {
      // Item neutre : le résultat proposé est JUSTE. Sans lui, « on me demande
      // si c'est plausible, donc c'est faux » suffirait à réussir. Et il dit
      // aussi autre chose : vérifier sert à confirmer, pas seulement à démolir.
      id: 'e-11-4-7', type: 'plausible', palier: 2, neutre: true,
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{un pull coûte } 4 \\text{ fois le prix du bonnet ; les deux ensemble : } 65 \\text{ € ; le bonnet vaudrait } 13 \\text{ €}',
      attendu: true,
      explication:
        'On remplace : si le bonnet coûte 13 €, le pull en coûte 52, et les deux '
        + 'ensemble font bien 65 €. Tout colle. L\'équation était x + 4x = 65, soit 5x = 65.',
    },

    // ── Palier 3 : relire une production, et se contrôler ───────────────────
    {
      // Le cas le plus vicieux du savoir-faire : tout est juste sauf la
      // dernière ligne. Aucun contrôle sur le calcul ne peut l'attraper — il
      // faut relire la question, ce que la consigne oblige à faire.
      id: 'e-11-4-8', type: 'corriger', palier: 3, piege: 'inconnue-mal-choisie',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{le pull coûte } 12 \\text{ € de plus que le tee-shirt ; les deux ensemble : } 46 \\text{ €}',
      lignes: [
        { texte: 'Je note x le prix du pull, en euros. Le tee-shirt coûte alors x − 12.', fausse: false },
        { texte: 'Les deux ensemble : x + (x − 12) = 46, donc 2x − 12 = 46, donc 2x = 58 et x = 29.', fausse: false },
        { texte: 'Le tee-shirt coûte donc 29 €.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, et pourtant la réponse est fausse : '
        + '29 € est le prix du PULL, puisque c\'est lui qui avait été noté x. Le '
        + 'tee-shirt coûte 29 − 12 = 17 €. Contrôle dans l\'énoncé de départ : '
        + '17 + 29 = 46, et 29 − 17 = 12. Le plus simple était de noter x le prix du '
        + 'tee-shirt dès le début, puisque c\'est lui qu\'on cherche.',
    },
    {
      id: 'e-11-4-9', type: 'vraifaux', palier: 3, piege: 'inconnue-mal-choisie',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Un stylo coûte 2 € de plus qu\'un crayon. On note x le prix du crayon, en '
        + 'euros. Alors le prix des deux réunis s\'écrit x + 2.',
      attendu: false,
      contreExemple: {
        invite: 'Donne un prix de crayon pour lequel x + 2 ne donne pas le prix des deux réunis.',
        champs: [{ id: 'a', etiquette: 'prix du crayon, en euros' }],
        // On vérifie la PROPRIÉTÉ — les deux écritures diffèrent — et non une
        // valeur imposée. Tout prix non nul convient, et c'est exactement ce
        // qu'il faut comprendre : l'écart entre les deux vaut le prix du crayon.
        valide: (a) => Number.isFinite(a) && a + (a + 2) !== a + 2,
        temoin: [3],
        exemple:
          'Avec x = 3 : le crayon coûte 3 €, le stylo 5 €, et les deux réunis 8 € — '
          + 'alors que x + 2 donne 5, c\'est-à-dire le prix du stylo seul. L\'écriture '
          + 'x + 2 est juste, mais elle répond à une autre question. Seul x = 0 les '
          + 'confond, et un crayon gratuit ne prouve rien.',
      },
    },
    {
      id: 'e-11-4-10', type: 'expression', palier: 3, piege: 'inconnue-mal-choisie',
      consigne:
        'Une salle de cinéma a deux rangées. La seconde rangée compte 7 sièges de plus '
        + 'que la première. Le jour de la séance, 4 sièges de la première rangée sont '
        + 'cassés. On note x le nombre de sièges de la seconde rangée. Écris, en '
        + 'fonction de x, le nombre de sièges utilisables dans la salle.',
      enonce: '\\text{on note } x \\text{ le nombre de sièges de la seconde rangée}',
      attendu: '2x-11',
      fausses: [
        // 2x + 3 est le nombre de sièges utilisables quand x désigne la
        // PREMIÈRE rangée : (x − 4) + (x + 7). Le raisonnement est impeccable,
        // la lettre désigne l'autre rangée.
        { valeur: '2x+3', piege: 'inconnue-mal-choisie' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-11-4-1',
      enonce:
        'Un club de tennis de table compte 12 adhérents de plus chez les jeunes que '
        + 'chez les adultes, et 76 adhérents en tout.',
      questions: [
        { texte: 'Combien y a-t-il d\'adultes ?', attendu: 32, unite: 'adhérents' },
        { texte: 'Combien y a-t-il de jeunes ?', attendu: 44, unite: 'adhérents' },
      ],
    },
    {
      id: 'p-11-4-2',
      enonce: 'Un vélo coûte 4 fois plus cher qu\'une trottinette. Ensemble, ils coûtent 250 €.',
      questions: [
        { texte: 'Combien coûte la trottinette ?', attendu: 50, unite: '€' },
        { texte: 'Combien coûte le vélo ?', attendu: 200, unite: '€' },
      ],
    },
    {
      id: 'p-11-4-3',
      enonce:
        'Un rectangle a une longueur qui dépasse sa largeur de 9 cm. Son périmètre '
        + 'mesure 62 cm.',
      questions: [
        { texte: 'Quelle est sa largeur ?', attendu: 11, unite: 'cm' },
        { texte: 'Quelle est sa longueur ?', attendu: 20, unite: 'cm' },
        { texte: 'Quelle est son aire ?', attendu: 220, unite: 'cm²' },
      ],
    },
    {
      id: 'p-11-4-4',
      enonce:
        'Une salle de sport propose deux formules. Formule A : 45 € d\'inscription, '
        + 'puis 3 € par séance. Formule B : 6 € par séance, sans inscription. Sacha '
        + 'cherche le nombre de séances pour lequel les deux formules reviennent au même.',
      questions: [
        { texte: 'Pour combien de séances les deux formules coûtent-elles le même prix ?', attendu: 15, unite: 'séances' },
        { texte: 'Combien coûte alors chacune des deux formules ?', attendu: 90, unite: '€' },
      ],
    },
    {
      id: 'p-11-4-5',
      enonce:
        'Trois amis se partagent 130 billes. Yanis en a 2 fois plus que Chloé, et Malo '
        + 'en a 10 de moins que Chloé.',
      questions: [
        { texte: 'Combien Chloé a-t-elle de billes ?', attendu: 35, unite: 'billes' },
        { texte: 'Combien Yanis en a-t-il ?', attendu: 70, unite: 'billes' },
        { texte: 'Combien Malo en a-t-il ?', attendu: 25, unite: 'billes' },
      ],
    },
  ],

  test: [
    {
      id: 't-11-4-1', type: 'expression',
      consigne:
        'Une écharpe coûte 7 € de plus qu\'un bonnet. On note x le prix du bonnet, en '
        + 'euros. Écris le prix de l\'écharpe en fonction de x.',
      enonce: '\\text{on note } x \\text{ le prix du bonnet, en euros}',
      attendu: 'x+7',
      fausses: [{ valeur: 'x-7', piege: 'inconnue-mal-choisie' }],
      revoir: 'remarque',
    },
    {
      id: 't-11-4-2', type: 'expression',
      consigne:
        'Il y a 5 fois plus de spectateurs en tribune nord qu\'en tribune sud. On note '
        + 'x le nombre de spectateurs de la tribune nord. Écris le nombre de '
        + 'spectateurs de la tribune sud en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de spectateurs de la tribune nord}',
      attendu: 'x/5',
      fausses: [{ valeur: '5x', piege: 'inconnue-mal-choisie' }],
      revoir: 'remarque',
    },
    {
      id: 't-11-4-3', type: 'expression',
      consigne:
        'Un carnet coûte 4 €. On note x le nombre de carnets achetés. Écris le prix '
        + 'payé, en euros, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de carnets achetés}',
      attendu: '4x',
      revoir: 'definition',
    },
    {
      id: 't-11-4-4', type: 'expression',
      consigne:
        'Deux boîtes contiennent des perles. La grande en contient 3 de plus que la '
        + 'petite. On note x le nombre de perles de la petite boîte. Écris, en fonction '
        + 'de x, le nombre total de perles.',
      enonce: '\\text{on note } x \\text{ le nombre de perles de la petite boîte}',
      attendu: '2x+3',
      fausses: [{ valeur: '2x-3', piege: 'inconnue-mal-choisie' }],
      revoir: 'exemple',
    },
    {
      id: 't-11-4-5', type: 'expression',
      consigne:
        'Un rectangle a une longueur qui dépasse sa largeur de 6 cm. On note x la '
        + 'largeur, en centimètres. Écris le périmètre du rectangle en fonction de x.',
      enonce: '\\text{on note } x \\text{ la largeur, en cm}',
      attendu: '2(2x+6)',
      fausses: [{ valeur: '2(2x-6)', piege: 'inconnue-mal-choisie' }],
      revoir: 'exemple',
    },
    {
      id: 't-11-4-6', type: 'expression',
      consigne:
        'Dans un panier, il y a 8 pommes de moins que de poires. On note x le nombre '
        + 'de poires. Écris le nombre total de fruits en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de poires}',
      attendu: '2x-8',
      fausses: [{ valeur: '2x+8', piege: 'inconnue-mal-choisie' }],
      revoir: 'remarque',
    },
    {
      id: 't-11-4-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{un sac contient } 3 \\text{ fois plus de billes rouges que de bleues, } 48 \\text{ en tout : il y aurait } 16 \\text{ bleues}',
      attendu: false,
      explication:
        'On remplace : avec 16 billes bleues, il y en aurait 48 rouges, donc 64 en '
        + 'tout — pas 48. L\'équation est x + 3x = 48, soit 4x = 48 : il y a 12 billes '
        + 'bleues et 36 rouges.',
      piege: 'solution-non-verifiee', revoir: 'remarque',
    },
    {
      id: 't-11-4-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce: '\\text{somme des deux nombres : } 44 \\text{ ; écart entre eux : } 12 \\text{ ; le plus grand vaudrait } 28',
      attendu: true,
      explication:
        'On vérifie : si le plus grand vaut 28, le plus petit vaut 16, et leur somme '
        + 'fait bien 44. En notant x le plus grand, l\'équation était x + (x − 12) = 44, '
        + 'soit 2x − 12 = 44.',
      revoir: 'exemple',
    },
    {
      id: 't-11-4-9', type: 'corriger',
      consigne: 'Cette résolution est fausse. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{la place de concert coûte } 9 \\text{ € de plus que la place de cinéma ; les deux : } 37 \\text{ €}',
      lignes: [
        { texte: 'Je note x le prix de la place de concert, en euros. La place de cinéma coûte alors x − 9.', fausse: false },
        { texte: 'Les deux ensemble : x + (x − 9) = 37, donc 2x − 9 = 37, donc 2x = 46 et x = 23.', fausse: false },
        { texte: 'La place de cinéma coûte donc 23 €.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes : 23 € est le prix de la place de '
        + 'CONCERT, puisque c\'est elle qui avait été notée x. La place de cinéma coûte '
        + '23 − 9 = 14 €. Contrôle dans l\'énoncé : 14 + 23 = 37, et 23 − 14 = 9.',
      piege: 'inconnue-mal-choisie', revoir: 'remarque',
    },
    {
      id: 't-11-4-10', type: 'expression',
      consigne:
        'Dans un car à deux niveaux, le niveau haut compte 8 places de plus que le '
        + 'niveau bas. Au départ, 5 places du niveau bas sont réservées aux '
        + 'accompagnateurs. On note x le nombre de places du niveau haut. Écris, en '
        + 'fonction de x, le nombre de places encore libres dans le car.',
      enonce: '\\text{on note } x \\text{ le nombre de places du niveau haut}',
      attendu: '2x-13',
      fausses: [{ valeur: '2x+3', piege: 'inconnue-mal-choisie' }],
      revoir: 'exemple',
    },
  ],
};
