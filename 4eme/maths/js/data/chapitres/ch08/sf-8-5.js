// Savoir-faire 8-5 — Choisir et interpréter un indicateur.
//
// Le seul savoir-faire du chapitre où la bonne réponse n'est pas un calcul
// mais un JUGEMENT : lequel des deux indicateurs décrit vraiment la série ?
// Il vient en dernier parce qu'il suppose les précédents — on ne choisit
// qu'entre des outils qu'on sait déjà fabriquer.
//
// ── Pourquoi ce savoir-faire existe ───────────────────────────────────────
//
// Un élève qui sait calculer une moyenne et une médiane sans savoir ce
// qu'elles disent produit des phrases fausses en toute confiance : « la
// moitié des gens gagnent plus que la moyenne » est l'erreur d'interprétation
// la plus répandue, et elle survit très bien à la maîtrise du calcul. La
// moitié, c'est la médiane. La moyenne, elle, ne promet rien de tel.
//
// Le fait central, celui qu'on installe ici : la moyenne dépend de la TAILLE
// des valeurs, la médiane seulement de leur RANG. Une valeur extrême déplace
// donc la première et laisse la seconde immobile. Ce n'est pas un défaut de
// la moyenne : c'est ce qui la rend irremplaçable quand on a besoin du total
// (moyenne × effectif = somme), et inutilisable quand on veut décrire un cas
// ordinaire.
//
// ── Pourquoi autant de « vrai/faux » et de « plausible » ──────────────────
//
// Parce que le geste travaillé est un jugement. Mais chaque item garde une
// réponse unique et vérifiable : on juge SUR des nombres, jamais dans le
// vide. Les explications portent tout le contenu — c'est là que se joue
// l'interprétation, pas dans la case cochée.

export default {
  id: 'sf-8-5',
  titre: 'Choisir et interpréter un indicateur',
  attendus: [
    'Il interprète la moyenne et la médiane d\'une série de données.',
    'Il comprend la sensibilité de la moyenne aux valeurs extrêmes, à laquelle la médiane résiste.',
  ],

  // On ne dit pas « la médiane résiste » : on met l'élève devant un écart de
  // 1 000 € entre deux indicateurs de la MÊME série, et devant le fait
  // troublant qui en découle — six personnes sur sept gagnent moins que la
  // moyenne. C'est ce fait-là qui rend le reste nécessaire, et il n'a pas
  // besoin d'être commenté pour être frappant.
  decouvrir: {
    titre: 'Le salaire que personne ne gagne',
    texte:
      'Dans un petit garage, sept personnes travaillent. Voici leurs salaires '
      + 'mensuels, déjà rangés du plus petit au plus grand : 1 500 €, 1 600 €, '
      + '1 700 €, 1 800 €, 1 900 €, 2 000 € et 9 100 €. Le dernier est celui '
      + 'du patron.',
    question: 'Calcule la moyenne de ces sept salaires, puis leur médiane.',
    champs: [
      { id: 'a', etiquette: 'moyenne des sept salaires, en €', attendu: 2800 },
      { id: 'b', etiquette: 'médiane des sept salaires, en €', attendu: 1800 },
    ],
    conclusion:
      'Regarde qui gagne moins que la moyenne : **six personnes sur sept**. '
      + 'Un salaire de 2 800 € par mois, dans ce garage, personne ne le touche. '
      + 'Un seul salaire, celui du patron, a suffi à tirer la moyenne vers le '
      + 'haut de 1 000 €.\n'
      + 'La médiane, elle, vaut **1 800 €** et ne bougerait pas d\'un centime si '
      + 'le patron gagnait 20 000 €. Elle ne regarde que le **rang** des valeurs, '
      + 'pas leur taille — et c\'est bien elle qui décrit ce qu\'on gagne ici.',
  },

  cours: [
    {
      type: 'definition',
      titre: 'Ce que chaque indicateur répond',
      texte:
        'La **moyenne** répond à : « et si tout le monde avait la même valeur ? » '
        + 'On met tout en commun, puis on partage également entre les individus.\n'
        + 'La **médiane** répond à : « quelle valeur coupe le groupe en deux ? » '
        + 'Une fois les valeurs rangées, la moitié de l\'effectif est en dessous, '
        + 'l\'autre moitié au-dessus.',
    },
    {
      type: 'propriete',
      titre: 'La médiane résiste aux valeurs extrêmes',
      texte:
        'La moyenne dépend de la **taille** de chaque valeur : en changer une '
        + 'seule la déplace, et une valeur très à l\'écart la déplace beaucoup.\n'
        + 'La médiane ne dépend que du **rang** des valeurs. Tant qu\'une valeur '
        + 'extrême reste du même côté, on peut l\'agrandir autant qu\'on veut : '
        + 'la médiane ne bouge pas.',
    },
    {
      type: 'remarque',
      titre: 'Laquelle choisir ?',
      texte:
        'La **médiane** quand quelques valeurs sont très à l\'écart des autres : '
        + 'salaires, prix des logements, temps d\'attente. Elle décrit alors un '
        + 'cas ordinaire.\n'
        + 'La **moyenne** quand les valeurs sont groupées, et surtout dès qu\'on a '
        + 'besoin du total : moyenne × effectif = somme. La médiane, elle, ne '
        + 'permet jamais de retrouver un total.\n'
        + 'Conséquence directe : **on ne fait pas la moyenne de deux moyennes**. '
        + 'Deux groupes d\'effectifs différents ne pèsent pas pareil — il faut '
        + 'repartir des sommes.',
    },
    {
      // Interpréter, c'est aussi savoir ce qu'un indicateur ne peut PAS valoir.
      // Un résultat hors de ses bornes se repère sans refaire le calcul, et
      // c'est le contrôle le moins coûteux de tout le chapitre.
      type: 'remarque',
      titre: 'Chaque indicateur a ses bornes',
      texte:
        'Un **effectif** compte des individus : c\'est un entier positif.\n'
        + 'Une **fréquence** est une part du total : elle est comprise entre 0 et 1, '
        + 'ou entre 0 % et 100 %. Une fréquence supérieure à 1 n\'existe pas — '
        + 'c\'est le signe que la division a été faite à l\'envers.\n'
        + 'Une moyenne et une médiane, elles, sont toujours comprises entre la plus '
        + 'petite et la plus grande valeur de la série.',
    },
    {
      type: 'exemple',
      texte:
        'Série 3 ; 4 ; 5 ; 6 ; 32 → moyenne 10, médiane 5.\n'
        + 'Quatre valeurs sur cinq sont en dessous de la moyenne. Remplace le 32 '
        + 'par 132 : la moyenne passe à 30, la médiane reste 5.',
    },
  ],

  methode: {
    titre: 'Choisir l\'indicateur qui décrit vraiment',
    enonce:
      'Dans un club, les neuf adhérents ont payé ces cotisations, en euros : '
      + '20 ; 20 ; 25 ; 25 ; 30 ; 30 ; 35 ; 40 ; 180. Quel indicateur décrit le '
      + 'mieux ce que paie un adhérent ?',
    etapes: [
      {
        texte: 'Je regarde d\'abord la série : huit cotisations entre 20 et 40 €, et une seule à 180 €.',
        note: 'Repérer une valeur à l\'écart passe avant tout calcul — c\'est elle qui décidera de la suite.',
      },
      {
        texte: 'Je calcule la moyenne : la somme vaut 405 €, l\'effectif 9, donc 405 ÷ 9 = 45 €.',
        note: 'Aucun adhérent ne paie 45 €, et huit sur neuf paient moins.',
      },
      {
        texte: 'Je calcule la médiane : 9 valeurs rangées, la médiane est la 5e, soit 30 €.',
        note: 'Quatre cotisations avant elle, quatre après : le compte y est.',
      },
      {
        texte: 'La cotisation de 180 € tire la moyenne vers le haut sans déplacer la médiane. C\'est donc la médiane, 30 €, qui décrit ce que paie un adhérent.',
        note: 'La moyenne reste utile pour autre chose : elle seule donne le total encaissé, 405 €.',
      },
    ],
    controle:
      'Le contrôle : compte combien de valeurs sont en dessous de ta moyenne. '
      + 'Si presque toutes le sont, c\'est qu\'une valeur extrême la tire, et la '
      + 'médiane dira mieux les choses. Et vérifie ta médiane en comptant de '
      + 'chaque côté : il doit y avoir autant de valeurs à gauche qu\'à droite.',
  },

  entrainement: [
    {
      id: 'e-8-5-1', type: 'calcul', palier: 1, piege: 'mediane-sans-ranger',
      consigne: 'Voici les notes de cinq élèves. Donne la médiane de cette série.',
      enonce: '8 \\,;\\, 15 \\,;\\, 4 \\,;\\, 11 \\,;\\, 6',
      attendu: 8,
      fausses: [
        { valeur: 4, piege: 'mediane-sans-ranger' },
        { valeur: 8.8, piege: 'mediane-sans-ranger' },
      ],
    },
    {
      id: 'e-8-5-2', type: 'calcul', palier: 1, piege: 'mediane-effectif-pair',
      consigne: 'Voici les durées de six trajets, en minutes, déjà rangées. Donne la médiane.',
      enonce: '12 \\,;\\, 14 \\,;\\, 15 \\,;\\, 19 \\,;\\, 20 \\,;\\, 26',
      attendu: 17,
      fausses: [
        { valeur: 15, piege: 'mediane-effectif-pair' },
        { valeur: 19, piege: 'mediane-effectif-pair' },
      ],
    },
    {
      // ITEM NEUTRE. Série rangée, effectif impair, aucune valeur à l'écart :
      // les trois pièges du palier sont hors jeu, et moyenne et médiane
      // tombent sur le même nombre. Sans lui, tout le savoir-faire crierait
      // « les deux indicateurs sont toujours différents », et « je réponds
      // médiane » suffirait à traverser la série. Ici, les deux se valent —
      // et savoir le reconnaître fait partie du choix. Aucune erreur n'est
      // prévisible sur une telle série, d'où `fausses` vide.
      id: 'e-8-5-3', type: 'trous', palier: 1, neutre: true, piege: 'mediane-sans-ranger',
      consigne: 'Voici cinq températures relevées à midi, en °C, déjà rangées. Calcule les deux indicateurs.',
      enonce: '11 \\,;\\, 12 \\,;\\, 14 \\,;\\, 15 \\,;\\, 18',
      champs: [
        { id: 'a', etiquette: 'moyenne, en °C', attendu: 14 },
        { id: 'b', etiquette: 'médiane, en °C', attendu: 14 },
      ],
      fausses: [],
    },
    {
      // Une affirmation VRAIE, et volontairement placée tôt : sans elle,
      // « on me demande vrai ou faux, donc c'est faux » deviendrait la
      // stratégie gagnante du savoir-faire.
      id: 'e-8-5-4', type: 'vraifaux', palier: 1, piege: 'mediane-effectif-pair',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Dans une série de 8 valeurs rangées, la médiane est la moyenne de la 4e et de la 5e valeur.',
      attendu: true,
    },
    {
      id: 'e-8-5-5', type: 'trous', palier: 2, piege: 'moyenne-des-moyennes',
      consigne:
        'Cinq amis notent le nombre de livres lus dans l\'année : 6 ; 7 ; 8 ; 9 ; 10. '
        + 'Leur moyenne et leur médiane valent toutes les deux 8. Le dernier corrige : '
        + 'il en a lu 45, pas 10. Recalcule les deux indicateurs sur la série corrigée.',
      enonce: '6 \\,;\\, 7 \\,;\\, 8 \\,;\\, 9 \\,;\\, 45',
      champs: [
        { id: 'a', etiquette: 'nouvelle moyenne', attendu: 15 },
        { id: 'b', etiquette: 'nouvelle médiane', attendu: 8 },
      ],
      fausses: [
        // (8 + 45) ÷ 2 : l'ancienne moyenne moyennée avec la valeur nouvelle,
        // comme si un groupe de quatre pesait autant qu'un individu seul.
        { valeur: 26.5, piege: 'moyenne-des-moyennes' },
      ],
    },
    {
      id: 'e-8-5-6', type: 'plausible', palier: 2, piege: 'moyenne-des-moyennes',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '20 \\text{ élèves à } 12 \\;;\\; 5 \\text{ élèves à } 17 '
        + '\\;\\longrightarrow\\; \\text{moyenne des } 25 \\text{ élèves} = 14{,}5',
      attendu: false,
      explication:
        'Les deux moyennes ont été moyennées comme si les groupes étaient de même '
        + 'taille. Or 20 élèves pèsent quatre fois plus que 5. On repart des totaux : '
        + '20 × 12 = 240 points et 5 × 17 = 85 points, soit 325 points pour 25 élèves, '
        + 'donc **13** de moyenne. Et c\'est logique : le résultat doit pencher du '
        + 'côté du groupe le plus nombreux, donc être plus proche de 12 que de 17.',
    },
    {
      id: 'e-8-5-7', type: 'plausible', palier: 2, piege: 'mediane-sans-ranger',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '1500 \\,;\\, 1600 \\,;\\, 1800 \\,;\\, 1900 \\,;\\, 9200 '
        + '\\;\\longrightarrow\\; \\text{moyenne } 3200\\text{ €, médiane } 1800\\text{ €}',
      attendu: true,
      explication:
        'Les deux calculs sont justes : la somme vaut 16 000 €, donc la moyenne '
        + 'est 16 000 ÷ 5 = 3 200 €, et la 3e valeur rangée est bien 1 800 €. '
        + 'L\'écart énorme entre les deux n\'a **rien d\'anormal** : le salaire de '
        + '9 200 € tire la moyenne et laisse la médiane où elle est. Quatre '
        + 'salariés sur cinq gagnent moins que la moyenne.',
    },
    {
      id: 'e-8-5-8', type: 'vraifaux', palier: 3, piege: 'mediane-sans-ranger',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation: 'Dans une série, il y a toujours autant de valeurs au-dessus de la moyenne qu\'en dessous.',
      attendu: false,
      contreExemple: {
        invite:
          'Complète la série 1 ; 2 ; 3 ; 4 ; ? avec une valeur de ton choix, '
          + 'strictement supérieure à 10, puis calcule la moyenne obtenue.',
        champs: [
          { id: 'a', etiquette: 'la valeur que tu ajoutes' },
          { id: 'b', etiquette: 'la moyenne de la série obtenue' },
        ],
        // On vérifie la PROPRIÉTÉ qui fait le contre-exemple, pas une valeur
        // imposée : dès que la cinquième valeur dépasse 10, la moyenne dépasse
        // 4, donc une seule valeur sur cinq est au-dessus. Tout choix au-delà
        // de 10 convient — l'élève fabrique le sien.
        valide: (a, b) => a > 10 && Math.abs(b - (10 + a) / 5) < 1e-9,
        temoin: [40, 10],
        exemple:
          'Avec 40 : la série 1 ; 2 ; 3 ; 4 ; 40 a pour moyenne 50 ÷ 5 = 10. '
          + 'Une seule valeur dépasse cette moyenne, et quatre sont en dessous. '
          + 'Le partage en deux moitiés, c\'est la médiane qui le garantit — jamais la moyenne.',
      },
    },
    {
      id: 'e-8-5-9', type: 'plausible', palier: 3, piege: 'frequence-et-effectif-confondus',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Sur } 250 \\text{ élèves, } 60 \\text{ sont demi-pensionnaires} '
        + '\\;\\longrightarrow\\; \\text{fréquence } = 4{,}17',
      attendu: false,
      explication:
        'Une fréquence est une **part du total** : elle ne peut pas dépasser 1. '
        + 'Ici la division a été faite à l\'envers — 250 ÷ 60 donne bien 4,17. '
        + 'La bonne fréquence est 60 ÷ 250 = **0,24**, soit 24 %. Ce contrôle ne '
        + 'coûte rien : un coup d\'œil aux bornes de l\'indicateur suffit à écarter '
        + 'le résultat sans refaire le calcul.',
    },
    {
      id: 'e-8-5-10', type: 'corriger', palier: 3, piege: 'moyenne-des-moyennes',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{Groupe A : } 8 \\text{ coureurs, } 30 \\text{ min de moyenne. '
        + 'Groupe B : } 12 \\text{ coureurs, } 40 \\text{ min de moyenne.}',
      lignes: [
        { texte: 'Le groupe A a couru 8 × 30 = 240 minutes en tout.', fausse: false },
        { texte: 'Le groupe B a couru 12 × 40 = 480 minutes en tout.', fausse: false },
        { texte: 'La moyenne des 20 coureurs est donc (30 + 40) ÷ 2 = 35 minutes.', fausse: true },
      ],
      explication:
        'Les deux premières lignes sont justes, et elles contiennent déjà tout ce '
        + 'qu\'il faut. C\'est la troisième qui casse : les deux moyennes ont été '
        + 'moyennées alors que les groupes n\'ont pas le même effectif. Il fallait '
        + 'continuer le travail commencé : 240 + 480 = 720 minutes pour 20 coureurs, '
        + 'donc 720 ÷ 20 = **36 minutes**. Le groupe B, plus nombreux, tire la '
        + 'moyenne vers lui — le résultat devait être plus proche de 40 que de 30.',
    },
  ],

  problemes: [
    {
      id: 'p-8-5-1',
      enonce:
        'Huit élèves notent leur temps de trajet jusqu\'au collège, en minutes : '
        + '5 ; 8 ; 10 ; 10 ; 12 ; 15 ; 20 ; 60. Le dernier habite un village éloigné.',
      questions: [
        { texte: 'Quelle est la moyenne des huit temps de trajet ?', attendu: 17.5, unite: 'min' },
        { texte: 'Quelle est la médiane des huit temps de trajet ?', attendu: 11, unite: 'min' },
        { texte: 'Combien d\'élèves mettent moins de temps que la moyenne ?', attendu: 6, unite: 'élèves' },
      ],
    },
    {
      id: 'p-8-5-2',
      enonce:
        'La classe de 4e A compte 28 élèves et a obtenu 11 de moyenne au dernier '
        + 'contrôle. La 4e B compte 22 élèves et a obtenu 13,5 de moyenne. Le '
        + 'professeur veut la moyenne des deux classes réunies.',
      questions: [
        { texte: 'Quel est le total des points de la 4e A ?', attendu: 308, unite: 'points' },
        { texte: 'Quel est le total des points de la 4e B ?', attendu: 297, unite: 'points' },
        { texte: 'Quelle est la moyenne des 50 élèves réunis ?', attendu: 12.1 },
      ],
    },
    {
      id: 'p-8-5-3',
      enonce:
        'Dans un club de lecture, sept membres ont lu respectivement 4, 5, 6, 7, 8, '
        + '9 et 38 livres cette année.',
      questions: [
        { texte: 'Quelle est la moyenne de la série ?', attendu: 11, unite: 'livres' },
        { texte: 'Quelle est la médiane de la série ?', attendu: 7, unite: 'livres' },
        { texte: 'Le membre qui a lu 38 livres quitte le club. Quelle est la moyenne des six restants ?', attendu: 6.5, unite: 'livres' },
      ],
    },
    {
      id: 'p-8-5-4',
      enonce:
        'Un sondage est réalisé auprès de 400 personnes à la sortie d\'une gare. '
        + '100 d\'entre elles déclarent être venues à vélo.',
      questions: [
        { texte: 'Quelle est la fréquence des personnes venues à vélo ? Donne-la en écriture décimale.', attendu: 0.25 },
        { texte: 'Quel pourcentage cela représente-t-il ? Donne le nombre seul.', attendu: 25 },
        { texte: 'Combien de personnes ne sont pas venues à vélo ?', attendu: 300, unite: 'personnes' },
      ],
    },
    {
      id: 'p-8-5-5',
      enonce:
        'Un magasin de cycles note ses ventes des sept jours de la semaine : '
        + '2 ; 3 ; 3 ; 4 ; 4 ; 5 ; 105. Le 105 correspond à une commande unique '
        + 'passée par une mairie. Le gérant veut annoncer ce qu\'il vend un jour ordinaire.',
      questions: [
        { texte: 'Quelle est la moyenne des ventes quotidiennes ?', attendu: 18, unite: 'vélos' },
        { texte: 'Quelle est la médiane des ventes quotidiennes ?', attendu: 4, unite: 'vélos' },
        { texte: 'Combien de jours ont des ventes inférieures à la moyenne ?', attendu: 6, unite: 'jours' },
      ],
    },
  ],

  test: [
    {
      id: 't-8-5-1', type: 'calcul',
      consigne: 'Donne la médiane de cette série.',
      enonce: '9 \\,;\\, 3 \\,;\\, 12 \\,;\\, 5 \\,;\\, 7',
      attendu: 7, piege: 'mediane-sans-ranger', revoir: 'definition',
    },
    {
      id: 't-8-5-2', type: 'calcul',
      consigne: 'Cette série est déjà rangée. Donne sa médiane.',
      enonce: '4 \\,;\\, 6 \\,;\\, 9 \\,;\\, 11 \\,;\\, 14 \\,;\\, 16',
      attendu: 10, piege: 'mediane-effectif-pair', revoir: 'definition',
    },
    {
      id: 't-8-5-3', type: 'calcul',
      consigne: 'Donne la moyenne de cette série.',
      enonce: '2 \\,;\\, 3 \\,;\\, 4 \\,;\\, 6 \\,;\\, 40',
      attendu: 11, revoir: 'propriete',
    },
    {
      id: 't-8-5-4', type: 'trous',
      consigne: 'Cette série est déjà rangée. Calcule ses deux indicateurs.',
      enonce: '1 \\,;\\, 2 \\,;\\, 3 \\,;\\, 4 \\,;\\, 50',
      champs: [
        { id: 'a', etiquette: 'moyenne', attendu: 12 },
        { id: 'b', etiquette: 'médiane', attendu: 3 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-8-5-5', type: 'calcul',
      consigne:
        'Dans un club, 15 personnes ont 20 ans de moyenne et 5 personnes en ont 40. '
        + 'Quelle est la moyenne d\'âge des 20 personnes ? Donne le nombre seul.',
      enonce: '15 \\text{ à } 20 \\text{ ans} \\;;\\; 5 \\text{ à } 40 \\text{ ans}',
      attendu: 25, piege: 'moyenne-des-moyennes', revoir: 'remarque',
    },
    {
      id: 't-8-5-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '30 \\text{ élèves à } 10 \\;;\\; 10 \\text{ élèves à } 14 '
        + '\\;\\longrightarrow\\; \\text{moyenne des } 40 \\text{ élèves} = 12',
      attendu: false,
      explication:
        'Les deux moyennes ont été moyennées : (10 + 14) ÷ 2 = 12. Mais le groupe '
        + 'de 30 pèse trois fois plus que celui de 10. On repart des totaux : '
        + '30 × 10 = 300 et 10 × 14 = 140, soit 440 points pour 40 élèves, donc '
        + '**11** de moyenne — bien plus près de 10 que de 14.',
      piege: 'moyenne-des-moyennes', revoir: 'remarque',
    },
    {
      id: 't-8-5-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '12 \\,;\\, 13 \\,;\\, 14 \\,;\\, 15 \\,;\\, 96 '
        + '\\;\\longrightarrow\\; \\text{moyenne } 30, \\text{ médiane } 14',
      attendu: true,
      explication:
        'Les deux sont justes : la somme vaut 150, donc la moyenne est 150 ÷ 5 = 30, '
        + 'et la 3e valeur rangée est 14. Une moyenne qui dépasse quatre des cinq '
        + 'valeurs n\'a rien d\'impossible : c\'est le 96 qui la tire là-haut, '
        + 'pendant que la médiane reste au milieu du peloton.',
      revoir: 'propriete',
    },
    {
      id: 't-8-5-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{Sur } 80 \\text{ élèves, } 24 \\text{ font du sport en club} '
        + '\\;\\longrightarrow\\; \\text{fréquence } = 3{,}33',
      attendu: false,
      explication:
        'Une fréquence ne dépasse jamais 1. Celle-ci vaut 80 ÷ 24, c\'est-à-dire '
        + 'la division prise à l\'envers. La bonne fréquence est 24 ÷ 80 = **0,3**, '
        + 'soit 30 %.',
      piege: 'frequence-et-effectif-confondus', revoir: 'remarque',
    },
    {
      id: 't-8-5-9', type: 'vraifaux',
      consigne: 'Vrai ou faux ?',
      // Formulée sur une série précise plutôt qu'en général : « on peut modifier
      // la plus grande valeur sans changer la médiane » se lit aussi bien comme
      // « toujours », et l'item deviendrait une question de lecture.
      affirmation: 'Dans la série 4 ; 6 ; 8 ; 10 ; 50, on peut remplacer le 50 par 500 sans changer la médiane.',
      attendu: true,
      revoir: 'propriete',
    },
    {
      id: 't-8-5-10', type: 'corriger',
      consigne: 'Ce raisonnement est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce: '\\text{Série : } 7 \\,;\\, 22 \\,;\\, 9 \\,;\\, 4 \\,;\\, 3',
      lignes: [
        { texte: 'La série compte 5 valeurs : la médiane est donc la 3e une fois la série rangée.', fausse: false },
        { texte: 'Une fois la série rangée, la 3e valeur est 9.', fausse: true },
        { texte: 'La médiane vaut donc 9.', fausse: false },
      ],
      explication:
        'La première ligne est juste, et elle dit même exactement ce qu\'il fallait '
        + 'faire. C\'est la deuxième qui casse : la série n\'a jamais été rangée. '
        + 'Rangée, elle donne 3 ; 4 ; 7 ; 9 ; 22, et la 3e valeur est **7**. Le 9 '
        + 'n\'avait que le mérite d\'être écrit au milieu de la liste — ce qui ne '
        + 'veut rien dire tant que l\'ordre n\'est pas fait.',
      piege: 'mediane-sans-ranger', revoir: 'definition',
    },
  ],
};
