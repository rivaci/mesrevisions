// Chapitre 14, savoir-faire 1 — Produire une formule littérale traduisant une
// dépendance.
//
// Le programme interdit ici la notation fonctionnelle : ni f(x), ni « image »,
// ni « antécédent ». On parle de deux grandeurs dont l’une dépend de l’autre,
// et la formule garde le nom de la grandeur cherchée à gauche du signe égal —
// prix = 2 × x + 5. C’est plus lourd à écrire qu’un f(x), et c’est exactement
// ce que demande la 4e : la dépendance avant l’objet qui la nommera en 3e.
//
// ── L’élève ÉCRIT la formule ──────────────────────────────────────────────
//
// D’où le type « expression », emprunté à sf-11-4 : rien à choisir, une
// écriture à produire, et le moteur compare en remplaçant la lettre par des
// nombres. Toute écriture équivalente passe — 15x + 9x vaut 24x, et l’élève qui
// a gardé ses deux parts séparées n’est pas puni de ne pas avoir réduit.
//
// ── Pourquoi alterner proportionnel et affine ─────────────────────────────
//
// Un lot fait uniquement de « 3 € le ticket » se traverse avec une règle de
// surface : je prends le nombre de l’énoncé et je le multiplie par la lettre.
// Les situations affines — une somme payée une seule fois, puis un prix par
// unité — mettent cette règle en défaut, et c’est là que loge le piège
// `part-fixe-multipliee` : quatre des dix items d’entraînement en portent une.
// Les dépendances demandées dans l’autre sens la mettent en défaut elles aussi,
// mais autrement : le nombre de l’énoncé y DIVISE la lettre au lieu de la
// multiplier, et c’est `formule-inversee` qui s’y déclenche.
//
// ── Les trois items neutres ───────────────────────────────────────────────
//
// Deux d’entre eux (e-14-1-3 et e-14-1-8) reposent sur des dépendances
// RÉVERSIBLES : sur un trajet de 300 km, les kilomètres restants s’écrivent
// 300 − x, et les kilomètres parcourus s’écrivent eux aussi 300 − x en partant
// des restants. Même chose pour la longueur et la largeur d’un rectangle d’aire
// fixée : 36 ÷ x dans les deux sens. Un élève qui écrit la formule à l’envers y
// répond juste — `formule-inversee` ne peut pas y produire l’erreur, et c’est
// ce qui les rend neutres.
//
// Le troisième (e-14-1-6) donne deux nombres dont AUCUN n’est fixe : deux
// tarifs horaires qui se cumulent. Qui multiplie tout répond juste. Sans lui,
// « quand il y a deux nombres, l’un multiplie et l’autre s’ajoute » deviendrait
// une recette applicable à n’importe quel énoncé — l’erreur symétrique de celle
// qu’on combat, et aussi coûteuse.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
// Ni tableau, ni graphique : les produire et les lire sont d’autres savoir-faire
// du chapitre, et un tracé n’apporterait rien à l’écriture d’une formule. La
// résolution non plus : retrouver x à partir du prix n’apparaît que dans les
// problèmes, où la réponse attendue est un nombre.

export default {
  id: 'sf-14-1',
  titre: 'Produire une formule littérale traduisant une dépendance',
  attendus: [
    'Il comprend et utilise la notion de dépendance entre deux grandeurs.',
    'Il produit une formule littérale traduisant une dépendance entre deux grandeurs.',
  ],

  // On ne donne pas la formule pour la faire appliquer : on fait calculer deux
  // cas de plus, dont celui de zéro tour. C’est ce cas-là qui sépare les deux
  // rôles — un nombre qu’on paie à chaque fois, un nombre qu’on paie une fois —
  // et c’est exactement le geste de contrôle du piège `part-fixe-multipliee`.
  decouvrir: {
    titre: 'Un prix qui change, et un prix qui ne change pas',
    texte:
      'À la fête foraine, l’entrée coûte 5 € et chaque tour de manège coûte '
      + '2 €. Voici ce qu’ont payé trois amis en sortant.',
    lignes: [
      { calcul: 'Nour, qui a fait 1 tour', resultat: '7 €' },
      { calcul: 'Sacha, qui a fait 3 tours', resultat: '11 €' },
      { calcul: 'Malo, qui a fait 6 tours', resultat: '17 €' },
    ],
    question: 'Que paierait quelqu’un qui fait 10 tours ? Et quelqu’un qui entre sans faire un seul tour ?',
    champs: [
      { id: 'a', etiquette: 'pour 10 tours, on paie, en euros', attendu: 25 },
      { id: 'b', etiquette: 'pour 0 tour, on paie, en euros', attendu: 5 },
    ],
    conclusion:
      'Une seule écriture donne toutes ces réponses d’un coup. En notant x le '
      + 'nombre de tours : **prix = 2 × x + 5**.\n'
      + 'Les deux nombres de l’énoncé n’y jouent pas le même rôle. Le **2** '
      + 'multiplie x, parce qu’on le paie à chaque tour. Le **5** s’ajoute une '
      + 'seule fois, parce qu’on n’entre qu’une fois — et ta seconde réponse le '
      + 'dit : sans aucun tour, on paie déjà 5 €.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Deux grandeurs qui dépendent l’une de l’autre',
      texte:
        'Deux grandeurs **dépendent** l’une de l’autre quand la valeur de la '
        + 'première décide de celle de la seconde : le nombre de tours de manège '
        + 'décide du prix payé.\n'
        + 'Pour écrire cette dépendance, on note par une **lettre** la grandeur '
        + 'qui varie, puis on écrit le calcul qui donne l’autre. Ce calcul est '
        + 'une **formule littérale**, et on lui garde son nom devant : '
        + 'prix = 2 × x + 5.',
    },
    {
      type: 'propriete',
      titre: 'Deux dépendances très fréquentes',
      texte:
        'Quand chaque unité apporte la même chose et qu’il n’y a rien d’autre, '
        + 'la formule s’écrit **grandeur cherchée = a × x**. La situation est '
        + 'alors **proportionnelle** : deux fois plus de tickets, deux fois plus '
        + 'cher.\n'
        + 'Quand s’ajoute une quantité qui ne dépend pas de x — payée une seule '
        + 'fois, ou déjà présente au départ — la formule s’écrit **grandeur '
        + 'cherchée = a × x + b**. La situation n’est plus proportionnelle : '
        + 'doubler x ne double pas le résultat, parce que b, lui, ne double pas.',
    },
    {
      // Le sens de la formule : c’est le point que le piège `formule-inversee`
      // fait manquer, et il ne se voit pas sur l’écriture — il se voit sur un
      // nombre qu’on y met.
      type: 'remarque',
      titre: 'Une formule ne raconte pas, elle calcule',
      texte:
        'On écrit à gauche la grandeur qu’on **cherche**, et à droite le calcul '
        + 'qui la donne. L’ordre des mots de l’énoncé ne décide de rien.\n'
        + 'Une même situation donne d’ailleurs deux formules différentes selon '
        + 'ce qu’on cherche. Un robinet verse 4 litres par minute : '
        + 'volume = 4 × durée, mais durée = volume ÷ 4. Pour 20 litres, la '
        + 'première annoncerait 4 × 20 = 80 minutes, alors qu’il en faut '
        + '20 ÷ 4 = 5. En 80 minutes, ce robinet aurait versé 320 litres.',
    },
    {
      type: 'remarque',
      titre: 'Ce qui multiplie, et ce qui s’ajoute',
      texte:
        'Cherche le mot **par** : par séance, par kilomètre, par mois. Le nombre '
        + 'qu’il annonce multiplie la lettre **quand la lettre compte justement '
        + 'ces unités-là** — x séances, x kilomètres, x mois. Ce qu’on paie une '
        + 'seule fois s’ajoute, et ne se multiplie jamais.\n'
        + 'Attention, ce repère a une limite : si la lettre compte autre chose, '
        + 'le nombre annoncé « par » divise au lieu de multiplier. Reprends le '
        + 'robinet de 4 litres par minute : quand x compte les minutes, on écrit '
        + 'bien 4 × x, mais quand x compte les litres, la durée s’écrit x ÷ 4.\n'
        + 'Pour la part fixe, le contrôle tient en une ligne : '
        + 'remplace la lettre par **0**. Une '
        + 'salle qui prend 30 € d’inscription puis 4 € par séance donne '
        + '4 × 0 + 30 = 30 €, l’inscription et rien d’autre. La formule 34 × x, '
        + 'elle, donnerait 0 € : elle est donc fausse.',
    },
    {
      type: 'exemple',
      texte:
        'Un livre coûte 8 €. On note x le nombre de livres achetés. Le prix '
        + 'payé, en euros, s’écrit **prix = 8 × x**.\n'
        + 'Pour 6 livres : 8 × 6 = 48 €. Pour 0 livre : 8 × 0 = 0 € — sans '
        + 'achat, on ne paie rien, et c’est la marque d’une situation '
        + 'proportionnelle.',
    },
    {
      type: 'exemple',
      texte:
        'Une patinoire fait payer 6 € l’entrée, puis 3 € par heure de location '
        + 'de patins. On note x le nombre d’heures. Le prix payé, en euros, '
        + 's’écrit **prix = 3 × x + 6**.\n'
        + 'Pour 4 heures : 3 × 4 + 6 = 18 €. Pour 0 heure : 6 €, car on est '
        + 'entré. Et 8 heures coûtent 3 × 8 + 6 = 30 €, ce qui n’est pas le '
        + 'double de 18 € : la situation n’est pas proportionnelle.',
    },
  ],

  methode: {
    titre: 'Écrire la formule d’une dépendance',
    enonce:
      'Un club d’escalade demande 25 € d’inscription à l’année, puis 4 € par '
      + 'séance. Écris la formule qui donne le prix payé, en euros, selon le '
      + 'nombre de séances.',
    etapes: [
      {
        texte: 'Je repère les deux grandeurs et je dis laquelle dépend de l’autre : le prix dépend du nombre de séances.',
        note: 'C’est la grandeur qui décide — le nombre de séances — que je vais noter par une lettre.',
      },
      {
        texte: 'Je note x le nombre de séances, et j’écris d’abord ce que je cherche : prix = …',
        note: 'La formule commence par la grandeur cherchée, quel que soit l’ordre des mots de l’énoncé.',
      },
      {
        texte: 'Je cherche ce qu’on paie à chaque séance : 4 €, annoncés « par séance ». Cette part vaut 4 × x.',
        note: 'Ici la lettre compte des séances, et le tarif est annoncé « par séance » : c’est la même unité, donc ce nombre multiplie x.',
      },
      {
        texte: 'Je cherche ce qu’on paie une seule fois : les 25 € d’inscription. Cette part s’ajoute.',
        note: 'Elle est la même pour tout le monde, quel que soit x : elle ne peut donc pas être multipliée par x.',
      },
      {
        texte: 'La formule est prix = 4 × x + 25.',
        note: '',
      },
    ],
    controle:
      'Le contrôle : remplace x par 0, puis par 1. Avec 0 séance, la formule '
      + 'doit rendre l’inscription seule, 25 € — elle donne 4 × 0 + 25 = 25. '
      + 'Avec 1 séance, elle doit rendre 29 €, et elle donne 4 × 1 + 25 = 29. '
      + 'Vérifie enfin ce que tu as obtenu : un prix, en euros. Si ton résultat '
      + 'ressemble à un nombre de séances, c’est que ta formule est écrite dans '
      + 'l’autre sens.',
  },

  entrainement: [
    // ── Palier 1 : écrire une dépendance proportionnelle, dans le bon sens ──
    {
      id: 'e-14-1-1', type: 'expression', palier: 1, piege: 'formule-inversee',
      consigne:
        'Une place de cinéma coûte 9 €. On note x le nombre de places achetées. '
        + 'Écris le prix payé, en euros, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de places achetées}',
      attendu: '9x',
      fausses: [
        // x ÷ 9 est la formule qui donne le NOMBRE DE PLACES à partir de la
        // somme dépensée : la bonne dépendance, écrite dans l’autre sens. Le
        // contrôle du piège la réfute — pour x = 4 places, elle annonce 4 ÷ 9,
        // qui n’est pas un prix payé pour 4 places.
        { valeur: 'x/9', piege: 'formule-inversee' },
      ],
    },
    {
      // Ici le tarif est annoncé dans un sens et la formule demandée dans
      // l’autre : c’est la situation où l’inversion est la plus probable, parce
      // que recopier le nombre de l’énoncé comme facteur suffit à se tromper.
      id: 'e-14-1-2', type: 'expression', palier: 1, piege: 'formule-inversee',
      consigne:
        'Un robinet verse 5 litres d’eau par minute. On note x le nombre de '
        + 'litres versés. Écris la durée du remplissage, en minutes, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de litres versés}',
      attendu: 'x/5',
      fausses: [
        // 5 × x donne le VOLUME à partir de la durée. Contrôle : pour
        // x = 10 litres, elle annonce 50 minutes, alors qu’en 50 minutes ce
        // robinet aurait versé 250 litres.
        { valeur: '5x', piege: 'formule-inversee' },
      ],
    },
    {
      // NEUTRE. La dépendance est réversible : les kilomètres restants valent
      // 300 − parcourus, et les parcourus valent 300 − restants. Qui écrit la
      // formule dans le mauvais sens écrit donc la même chose, et répond juste.
      // Sans un item comme celui-ci, « quand j’hésite sur le sens, je divise »
      // resterait une stratégie payante.
      id: 'e-14-1-3', type: 'expression', palier: 1, neutre: true, piege: 'formule-inversee',
      consigne:
        'Un trajet mesure 300 km. On note x le nombre de kilomètres déjà '
        + 'parcourus. Écris le nombre de kilomètres qui restent à parcourir, en '
        + 'fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de kilomètres déjà parcourus}',
      attendu: '300-x',
      fausses: [],
    },

    // ── Palier 2 : une part fixe apparaît ───────────────────────────────────
    {
      id: 'e-14-1-4', type: 'expression', palier: 2, piege: 'part-fixe-multipliee',
      consigne:
        'Dans un club de danse, on paie 20 € d’adhésion une seule fois, puis 6 € '
        + 'par séance. On note x le nombre de séances. Écris le prix payé, en '
        + 'euros, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de séances}',
      attendu: '6x+20',
      fausses: [
        // Les deux nombres réunis en un seul facteur. Contrôle : pour x = 0,
        // elle donne 0 €, alors que l’adhésion de 20 € est déjà payée.
        { valeur: '26x', piege: 'part-fixe-multipliee' },
        // Les rôles échangés, dans l’ordre où les nombres apparaissent dans le
        // texte. Contrôle : pour x = 0, elle donne 6 € et non 20 €. Et le
        // nombre annoncé « par séance » est 6, c’est donc lui qui multiplie.
        { valeur: '20x+6', piege: 'part-fixe-multipliee' },
      ],
    },
    {
      id: 'e-14-1-5', type: 'plausible', palier: 2, piege: 'part-fixe-multipliee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{un forfait de téléphone coûte } 5 \\text{ € à l’ouverture de la ligne, puis } '
        + '8 \\text{ € par mois ; pour } x \\text{ mois, le prix s’écrirait } 13 \\times x',
      attendu: false,
      explication:
        'Remplace x par 0 : la formule donne 0 €, alors que les 5 € d’ouverture '
        + 'ont déjà été payés. Pour 4 mois, elle annonce 52 € au lieu de '
        + '8 × 4 + 5 = 37 €. Seul le prix mensuel se multiplie : le prix s’écrit '
        + '8 × x + 5.\n'
        + 'Attention, pour un seul mois les deux écritures donnent 13 € — c’est '
        + 'ce qui rend cette formule crédible. Elle s’écarte dès le deuxième mois.',
    },
    {
      // NEUTRE. Deux nombres dans l’énoncé, et les deux sont annoncés « par
      // heure » : rien n’est fixe, donc multiplier tout donne la bonne réponse.
      // C’est le contrepoids exact des items précédents — sans lui, « un nombre
      // multiplie, l’autre s’ajoute » deviendrait la règle de tout énoncé qui
      // contient deux nombres.
      id: 'e-14-1-6', type: 'expression', palier: 2, neutre: true, piege: 'part-fixe-multipliee',
      consigne:
        'Un menuisier facture 15 € par heure de travail, et son apprenti 9 € par '
        + 'heure. Ils travaillent toujours ensemble, le même nombre d’heures. On '
        + 'note x ce nombre d’heures. Écris le prix total, en euros, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre d’heures de travail}',
      attendu: '24x',
      fausses: [],
    },
    {
      // Un « plausible » dont la réponse est OUI, et sur une formule affine
      // correcte : sans lui, « on me montre une formule, donc elle est fausse »
      // suffirait, et l’élève convaincu que les deux nombres se multiplient
      // rejetterait cette formule-ci — c’est bien le piège qui se déclenche.
      id: 'e-14-1-7', type: 'plausible', palier: 2, piege: 'part-fixe-multipliee',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{une location de kayak coûte } 8 \\text{ € pour le prêt du gilet, puis } '
        + '5 \\text{ € par heure ; pour } x \\text{ heures, le prix s’écrirait } 5 \\times x + 8',
      attendu: true,
      explication:
        'Remplace x par 0 : la formule donne 8 €, exactement ce que paie '
        + 'quelqu’un qui prend le gilet sans partir. Pour 3 heures : '
        + '5 × 3 + 8 = 23 €, soit les trois heures à 5 € plus les 8 € du gilet. '
        + 'Le nombre annoncé « par heure » multiplie bien x, et le prêt du gilet '
        + 's’ajoute une seule fois : la formule tient.',
    },

    // ── Palier 3 : des dépendances moins attendues, et relire une production ─
    {
      // NEUTRE, et il fait deux choses. La dépendance est réversible — la
      // largeur vaut 36 ÷ longueur, la longueur vaut 36 ÷ largeur — donc
      // `formule-inversee` ne peut pas y produire l’erreur. Et elle n’est ni
      // proportionnelle ni affine : « je multiplie » et « je multiplie puis
      // j’ajoute » n’épuisent pas les dépendances du programme.
      id: 'e-14-1-8', type: 'expression', palier: 3, neutre: true, piege: 'formule-inversee',
      consigne:
        'Un rectangle a une aire de 36 cm². On note x sa longueur, en '
        + 'centimètres. Écris sa largeur, en centimètres, en fonction de x.',
      enonce: '\\text{on note } x \\text{ la longueur du rectangle, en cm}',
      attendu: '36/x',
      fausses: [],
    },
    {
      id: 'e-14-1-9', type: 'corriger', palier: 3, piege: 'part-fixe-multipliee',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{un parking fait payer } 3 \\text{ € à l’entrée, puis } 2 \\text{ € par heure de stationnement.} '
        + '\\quad \\text{Quelle formule donne le prix payé pour } x \\text{ heures ?}',
      lignes: [
        { texte: 'Ce qu’on paie à chaque heure vaut 2 €, donc cette part s’écrit 2 × x.', fausse: false },
        { texte: 'Les 3 € de l’entrée se paient à chaque heure eux aussi, donc cette part s’écrit 3 × x.', fausse: true },
        { texte: 'Le prix payé s’écrit donc 2 × x + 3 × x, c’est-à-dire 5 × x.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et la troisième additionne correctement '
        + 'les deux parts qu’on lui a données. C’est la deuxième qui casse tout : '
        + 'les 3 € se paient à l’entrée, une seule fois, quelle que soit la '
        + 'durée. Le contrôle le montre d’un coup — la formule 5 × x donne 0 € '
        + 'pour 0 heure, alors qu’on a déjà payé 3 € en entrant. La bonne '
        + 'formule est 2 × x + 3.',
    },
    {
      id: 'e-14-1-10', type: 'vraifaux', palier: 3, piege: 'formule-inversee',
      consigne: 'Vrai ou faux ? Si c’est faux, donne un contre-exemple.',
      affirmation:
        'Un tapis roulant avance de 3 mètres par seconde. On note x la distance '
        + 'parcourue, en mètres. Alors la durée du trajet, en secondes, s’écrit 3 × x.',
      attendu: false,
      contreExemple: {
        // Le contre-exemple ne demande pas de réciter le bon sens : il demande
        // de calculer la durée réelle, puis de la comparer à ce qu’annonce la
        // formule. C’est le geste de contrôle du piège, fait par l’élève.
        invite:
          'Choisis une distance, puis donne la durée réelle de ce trajet, en '
          + 'secondes — celle que la formule 3 × x ne donne pas.',
        champs: [
          { id: 'a', etiquette: 'distance choisie, en mètres' },
          { id: 'b', etiquette: 'durée réelle de ce trajet, en secondes' },
        ],
        valide: (a, b) => Number.isFinite(a) && Number.isFinite(b) && a > 0
          && Math.abs(b - a / 3) < 1e-9 && Math.abs(b - 3 * a) > 1e-9,
        temoin: [12, 4],
        exemple:
          'Avec 12 mètres : le tapis avance de 3 mètres chaque seconde, il lui '
          + 'faut donc 4 secondes. La formule 3 × x annoncerait 36 secondes — et '
          + 'en 36 secondes, le tapis aurait avancé de 108 mètres. L’écriture '
          + '3 × x donne la distance à partir de la durée : c’est la formule de '
          + 'l’autre grandeur. La durée s’écrit x ÷ 3.',
      },
    },
  ],

  problemes: [
    {
      id: 'p-14-1-1',
      enonce:
        'Une salle de sport demande 18 € d’inscription à l’année, puis 4 € par '
        + 'séance.',
      questions: [
        { texte: 'Combien paie un adhérent qui vient à 7 séances ?', attendu: 46, unite: '€' },
        { texte: 'Combien paie un adhérent qui s’inscrit et ne vient à aucune séance ?', attendu: 18, unite: '€' },
        { texte: 'Combien de séances a faites un adhérent qui a payé 66 € ?', attendu: 12, unite: 'séances' },
      ],
    },
    {
      // La troisième question montre ce que la part fixe ne fait pas : elle
      // disparaît d’une différence de prix, puisqu’elle est payée dans les
      // deux cas.
      id: 'p-14-1-2',
      enonce: 'Un taxi facture 4 € de prise en charge, puis 2 € par kilomètre parcouru.',
      questions: [
        { texte: 'Combien coûte un trajet de 15 km ?', attendu: 34, unite: '€' },
        { texte: 'Quelle distance a parcourue un client qui a payé 26 € ?', attendu: 11, unite: 'km' },
        { texte: 'De combien le prix d’un trajet de 20 km dépasse-t-il celui d’un trajet de 10 km ?', attendu: 20, unite: '€' },
      ],
    },
    {
      id: 'p-14-1-3',
      enonce: 'Une imprimante imprime 12 pages par minute, sans jamais s’arrêter.',
      questions: [
        { texte: 'Combien de pages imprime-t-elle en 7 minutes ?', attendu: 84, unite: 'pages' },
        { texte: 'Combien de minutes lui faut-il pour imprimer 300 pages ?', attendu: 25, unite: 'minutes' },
        { texte: 'Combien de pages imprime-t-elle en une demi-heure ?', attendu: 360, unite: 'pages' },
      ],
    },
    {
      id: 'p-14-1-4',
      enonce:
        'Une bougie mesure 24 cm avant d’être allumée. En brûlant, elle perd '
        + '3 cm par heure.',
      questions: [
        { texte: 'Quelle est sa hauteur au bout de 5 heures ?', attendu: 9, unite: 'cm' },
        { texte: 'Au bout de combien d’heures a-t-elle entièrement brûlé ?', attendu: 8, unite: 'heures' },
        { texte: 'Après combien d’heures n’en reste-t-il que 6 cm ?', attendu: 6, unite: 'heures' },
      ],
    },
    {
      id: 'p-14-1-5',
      enonce:
        'Deux loueurs de vélos. Chez Alpha, on paie 12 € à la prise du vélo, '
        + 'puis 2 € par heure. Chez Bêta, on paie 5 € par heure et rien d’autre.',
      questions: [
        { texte: 'Combien coûtent 3 heures chez Alpha ?', attendu: 18, unite: '€' },
        { texte: 'Combien coûtent 3 heures chez Bêta ?', attendu: 15, unite: '€' },
        { texte: 'Pour quelle durée les deux loueurs demandent-ils le même prix ?', attendu: 4, unite: 'heures' },
      ],
    },
  ],

  test: [
    {
      id: 't-14-1-1', type: 'expression',
      consigne:
        'Un kilogramme de cerises coûte 6 €. On note x la masse achetée, en '
        + 'kilogrammes. Écris le prix payé, en euros, en fonction de x.',
      enonce: '\\text{on note } x \\text{ la masse achetée, en kg}',
      attendu: '6x',
      fausses: [{ valeur: 'x/6', piege: 'formule-inversee' }],
      revoir: 'definition',
    },
    {
      id: 't-14-1-2', type: 'expression',
      consigne:
        'Une piscine vend un abonnement à 15 €, puis fait payer 3 € par entrée. '
        + 'On note x le nombre d’entrées. Écris le prix payé, en euros, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre d’entrées}',
      attendu: '3x+15',
      fausses: [
        { valeur: '18x', piege: 'part-fixe-multipliee' },
        { valeur: '15x+3', piege: 'part-fixe-multipliee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-14-1-3', type: 'expression',
      consigne:
        'Un train roule à 90 kilomètres par heure. On note x la distance '
        + 'parcourue, en kilomètres. Écris la durée du trajet, en heures, en fonction de x.',
      enonce: '\\text{on note } x \\text{ la distance parcourue, en km}',
      attendu: 'x/90',
      fausses: [{ valeur: '90x', piege: 'formule-inversee' }],
      revoir: 'remarque',
    },
    {
      id: 't-14-1-4', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{un abonnement coûte } 20 \\text{ € à l’ouverture, puis } 7 \\text{ € par mois ; } '
        + '\\text{pour } x \\text{ mois, le prix s’écrirait } 27 \\times x',
      attendu: false,
      explication:
        'Pour 0 mois, cette formule donne 0 €, alors que les 20 € d’ouverture '
        + 'ont déjà été payés. Pour 3 mois, elle annonce 81 € au lieu de '
        + '7 × 3 + 20 = 41 €. Le prix s’écrit 7 × x + 20.',
      piege: 'part-fixe-multipliee', revoir: 'remarque',
    },
    {
      id: 't-14-1-5', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{un plombier facture } 40 \\text{ € de déplacement, puis } 35 \\text{ € par heure ; } '
        + '\\text{pour } x \\text{ heures, le prix s’écrirait } 35 \\times x + 40',
      attendu: true,
      explication:
        'Pour 0 heure, la formule donne 40 € : le déplacement seul, exactement '
        + 'ce qu’annonce l’énoncé. Pour 2 heures : 35 × 2 + 40 = 110 €. Le '
        + 'nombre annoncé « par heure » multiplie x, le déplacement s’ajoute une '
        + 'seule fois — la formule est juste.',
      revoir: 'exemple',
    },
    {
      id: 't-14-1-6', type: 'expression',
      consigne:
        'Un paquet contient 12 gâteaux. On note x le nombre de gâteaux déjà '
        + 'mangés. Écris le nombre de gâteaux restants en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de gâteaux déjà mangés}',
      attendu: '12-x',
      revoir: 'definition',
    },
    {
      id: 't-14-1-7', type: 'expression',
      consigne:
        'Dans un tournoi, une victoire rapporte 3 points, un match nul 1 point '
        + 'et une défaite aucun. Une équipe a fait 4 matchs nuls. On note x son '
        + 'nombre de victoires. '
        + 'Écris le nombre de points de cette équipe en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre de victoires de l’équipe}',
      attendu: '3x+4',
      fausses: [
        { valeur: '7x', piege: 'part-fixe-multipliee' },
        { valeur: '4x+3', piege: 'part-fixe-multipliee' },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-14-1-8', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l’erreur apparaît.',
      enonce:
        '\\text{un vélo roule à } 15 \\text{ kilomètres par heure ; on note } x \\text{ la distance parcourue, en km.} '
        + '\\quad \\text{Quelle formule donne la durée du trajet, en heures ?}',
      lignes: [
        { texte: 'La durée dépend de la distance : c’est donc la durée qu’on écrit seule, à gauche du signe égal.', fausse: false },
        { texte: 'Le vélo parcourt 15 km en une heure, donc pour x kilomètres il roule 15 × x heures.', fausse: true },
        { texte: 'La formule est donc durée = 15 × x.', fausse: false },
      ],
      explication:
        'La première ligne pose le bon sens, et la troisième ne fait que '
        + 'recopier la deuxième. C’est la deuxième qui casse tout : 15 × x est '
        + 'la distance parcourue en x heures, pas la durée. Pour 30 km, elle '
        + 'annoncerait 450 heures, alors qu’il en faut 2. La formule est '
        + 'durée = x ÷ 15.',
      piege: 'formule-inversee', revoir: 'remarque',
    },
    {
      id: 't-14-1-9', type: 'expression',
      consigne:
        'Une bougie mesure 30 cm et perd 2 cm par heure en brûlant. On note x le '
        + 'nombre d’heures. Écris la hauteur restante, en centimètres, en fonction de x.',
      enonce: '\\text{on note } x \\text{ le nombre d’heures de combustion}',
      attendu: '30-2x',
      fausses: [
        { valeur: '28x', piege: 'part-fixe-multipliee' },
        { valeur: '30x-2', piege: 'part-fixe-multipliee' },
      ],
      revoir: 'exemple',
    },
    {
      id: 't-14-1-10', type: 'expression',
      consigne:
        'Un rectangle a une aire de 48 cm². On note x sa largeur, en '
        + 'centimètres. Écris sa longueur, en centimètres, en fonction de x.',
      enonce: '\\text{on note } x \\text{ la largeur du rectangle, en cm}',
      attendu: '48/x',
      revoir: 'propriete',
    },
  ],
};
