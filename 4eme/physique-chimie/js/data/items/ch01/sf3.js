// Ch. 1 — « Identifier un corps pur par sa température de changement d’état ».
//
//     import ITEMS, { DECOUVERTE, COURS, METHODE,
//                     ENTRAINEMENT, PROBLEMES, TEST } from './ch01/sf3.js';
//
// Premier contenu du projet. Le moteur existe et il est testé ; rien n’avait
// encore été écrit contre lui. Ce fichier est donc autant un contenu qu’une
// épreuve du schéma : chaque décision ci-dessous a été prise parce que
// `js/item.js` la rendait obligatoire, ou parce qu’il refusait l’autre.
//
// ── Ce que ce savoir-faire est, et pourquoi il est le plus « classe A » ────
//
// Un corps pur change d’état à température CONSTANTE ; un mélange, non. Le
// critère est donc entièrement lisible sur une courbe de température : un
// palier, sa valeur, sa durée. Et une courbe, ici, n’est pas une image — c’est
// un jeu de mesures que `js/schema.js` trace (invariant 6). Le bénéfice n’est
// pas cosmétique : sur toute lecture de palier, `fenetreDeTolerance` dérive la
// tolérance de la GRADUATION DÉCLARÉE de l’axe — une demi-graduation — au lieu
// de la laisser saisir par l’auteur.
//
// Treize items lisent une figure engendrée ; sept d’entre eux rendent un nombre.
// Cinq sont des lectures de palier sur courbe, et leurs cinq fenêtres sont
// dérivées de l’axe : quatre valent 2,5 °C, la cinquième 2 °C parce que son axe
// est gradué de quatre en quatre. Les deux autres lisent un tableau et sont
// déclarées exactes — une durée de palier comptée minute par minute n’est pas
// approchée, elle se compte. `tolerancePourcent` n’apparaît nulle part dans ce
// fichier : aucune fenêtre n’a été choisie par un auteur.
//
// ── Les décisions de classe, une par une ──────────────────────────────────
//
//   · **B — lire un palier.** La figure et la correction citent LE MÊME objet
//     (identité de référence, contrôlée par `item.js`) : éditer les points
//     déplace le palier dessiné et l’item cesse d’être conforme au lieu de
//     mentir en silence. Ce que la classe B ne garantit PAS ici, et il faut
//     l’écrire : la `valeur` du palier reste affirmée par l’auteur, elle n’est
//     pas recalculée depuis les points. La garantie porte sur l’unicité de
//     l’objet et sur la tolérance, pas sur la lecture elle-même.
//   · **A — un vrai calcul.** Durée d’un palier, écart à une valeur de
//     référence, moyenne de deux lectures : chaînes rejouées en rationnels
//     exacts, dimensions comprises. Les données citées sont celles que la
//     figure porte, jamais des nombres apparus dans la correction.
//   · **A_TABLE — un fait n’est pas un théorème.** Les cinq cases utiles de
//     `changements-d-etat` sont servies UNE fois chacune, et les cinq requêtes
//     sont rejouées : eau/fusion, eau/ébullition, éthanol/fusion,
//     éthanol/ébullition, fer/fusion.
//   · **C — trois items, tous relus et scellés.** Le plafond est d’un tiers par
//     savoir-faire ; on est à 3 sur 25, soit 12 %. Aucun item ne porte à la fois
//     un calcul et une réponse libre : e09 et p05 demandent l’ÉCART, qui se
//     recalcule, et s’arrêtent là. La conclusion (« ce n’est donc pas de l’eau »,
//     « c’est peut-être de l’éthanol ») n’est écrite NULLE PART dans ce fichier,
//     et il faut le dire au lieu de le laisser croire : elle serait une réponse
//     libre, donc de classe C, et le budget de trois items relus est déjà pris
//     par les trois doubles QCM. Les items qui rendent le verdict « corps pur ou
//     mélange » — e02, e10, p02, p04, t02, t09 — le rendent sur LEUR propre
//     situation ; aucun n’est la seconde moitié de e09 ni de p05.
//
// ── Le savoir-faire ne porte AUCUN piège, et cela se voit partout ──────────
//
// `data/savoir-faire.js` ne lui en déclare pas — il est le seul du chapitre
// dans ce cas, et son `diagnostic` vaut donc `absent`. Trois conséquences,
// toutes appliquées ici :
//
//   1. aucun item ne porte `piege`, `situation`, `dispositifServi` ni
//      `estFormatDiagnostique` : `item.js` refuse un piège que le savoir-faire
//      ne déclare pas, et le format diagnostique est celui d’un piège — il
//      n’existe pas dans l’absolu. **Une seule JUSTIFICATION de double QCM porte
//      un `piege`** (e08, `on-est-au-chapitre-des-corps-purs` →
//      `serie-etiquetee-par-le-chapitre`, déclaré par le savoir-faire sollicité
//      `ch01-sf1`), et il faut le dire ici parce que `item.js` ne contrôle PAS ce
//      champ-là : à ce niveau, un rattachement faux ne fait rien échouer. Les
//      trois autres justifications fausses de ce fichier en portaient un et
//      l’ont perdu — voir le détail à chacune. Le test à appliquer est toujours
//      le même : la RÈGLE du piège réfute-t-elle la réponse de l’élève ? Si elle
//      lui donne raison, ou si elle est muette, le rattachement est faux, et il
//      est pire qu’absent — la re-confrontation servira le mauvais contre-modèle ;
//   2. **aucun distracteur.** Un distracteur quantitatif doit être rattaché à un
//      piège du catalogue ET produit par un modèle erroné exécutable. Les
//      lectures fautives de palier (lire le premier point, lire le dernier, lire
//      le haut de la montée) ne correspondent à aucune conception documentée du
//      catalogue : les rattacher à un piège voisin pour satisfaire un champ
//      aurait rendu la re-confrontation fausse. Elles sont donc écrites en
//      `modelesErrones` — exécutées, et vérifiées hors de la fenêtre de
//      tolérance —, ce qui est exactement la clause que la charte réclamait pour
//      les items à saisie libre ;
//   3. le double QCM n’est pas exigé par le contrôleur ici (il l’est des
//      savoir-faire porteurs d’un piège). Trois sont quand même écrits : le
//      « juste/faux » est le seul état qui sépare « il a coché juste » de « il a
//      compris », et sur un critère aussi facile à réciter que « un corps pur a
//      une température fixe », c’est le seul format qui le mette à l’épreuve.
//
// ── Le registre est macro partout, et c’est une décision ──────────────────
//
// Le triplet de Johnstone est déclaré item par item, et il vaut `macro` pour
// les vingt-cinq. Ce savoir-faire se joue entièrement sur des grandeurs
// mesurées ; l’interprétation particulaire du changement d’état est un autre
// savoir-faire (`ch05-sf7`), dans un autre chapitre, et lui donner un item ici
// reviendrait à évaluer sous ce nom une compétence que le suivi attribue
// ailleurs.
//
// ── Ce que ce savoir-faire NE COUVRE PAS ──────────────────────────────────
//
//   · **le geste expérimental.** L’application ne fait pas « mettre en œuvre » :
//     ni montage, ni placement du thermomètre, ni réglage du chauffage. On
//     travaille le raisonnement sur situation décrite — proposer, choisir,
//     critiquer, exploiter, contrôler —, et l’élève doit le lire dans le cours,
//     où c’est écrit ;
//   · **l’explication du palier.** Pourquoi la température ne monte pas pendant
//     le changement d’état demande l’énergie de changement d’état : hors 4ᵉ. Le
//     cours dit que c’est un fait mesuré, et ne fait pas semblant de l’expliquer ;
//   · **l’effet de la pression.** La table des changements d’état est déclarée
//     « sous pression atmosphérique » et p03 travaille cette CONDITION de
//     validité, sans aucune loi quantitative — qui est hors cycle 4 ;
//   · **la solubilité** (`ch01-sf5`, `ch01-sf6`), **l’homogène et l’hétérogène**
//     (`ch01-sf2`), **la miscibilité** (`ch01-sf4`), **la masse volumique comme
//     second critère d’identification** (`ch04-sf6`) : quatre voisins immédiats,
//     aucun item ici ;
//   · **surfusion, eutectiques, corps purs à plusieurs formes cristallines** :
//     hors programme, et le silence est volontaire — un contre-exemple non
//     enseignable affaiblirait un critère que l’élève doit d’abord tenir ;
//   · **aucune discrimination mathématique.** `ch01-sf3` ne déclare pas de
//     `prerequisMaths` ; poser un rôle de discrimination rendrait un verdict sur
//     une distinction qui n’existe pas, et `item.js` le refuse.
//
// ── Décompte réel du fichier ──────────────────────────────────────────────
//
//   Découverte 1 (deux courbes) · cours 6 blocs · méthode 1 (quatre étapes) ·
//   entraînement 10 · problèmes 5 · auto-évaluation 10 — soit 25 items, tous
//   passés par `validerItem`, zéro refus.
//
//   Classes : A 6 · A_TABLE 5 · B 11 · C 3 (12 %, plafond au tiers).
//   Cercles : 0 → 1 · 1 → 21 · 2 → 3 · 3 → 0.
//   Paliers : 1 → 6 · 2 → 7 · 3 → 5 · 4 → 7.
//   Types   : court 8 · lecture 13 · double-qcm 3 · prediction-engagee 1.
//   Figures engendrées : 16 objets formels distincts (13 portés par un item,
//   2 par la découverte, 1 par la méthode), 0 référence à un fichier image.
//
// Le cercle 3 est VIDE, et ce n’est pas un oubli : le geste figuré est celui du
// schéma de circuit et du schéma particulaire, et ce savoir-faire n’en demande
// aucun. Le contrôle exige au moins un item hors cercle 3 pour qu’un savoir-faire
// soit acquérable ; il y en a vingt-cinq.
//
// Le test ne reprend aucun énoncé, aucune courbe et aucune valeur de réponse de
// l’entraînement ni des problèmes : les cinq courbes du test sont à elles, et
// les cinq cases de la table des changements d’état sont réparties de sorte
// qu’aucune ne serve deux fois. Un test qui se réussit de mémoire ne mesure que
// la mémoire.

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — écrits une fois, cités par la figure ET par la correction
// ════════════════════════════════════════════════════════════════════════════
//
// L’invariant 6 est contrôlé par IDENTITÉ DE RÉFÉRENCE : ces constantes sont
// l’unique exemplaire. Chaque axe déclare son `pas`, et c’est ce pas — et lui
// seul — qui fixe la tolérance de lecture des items qui en dérivent.

/** Fusion de la glace : le palier de référence, à 0 °C. Demi-graduation 2,5 °C. */
const FUSION_EAU_PURE = Object.freeze({
  titre: 'Chauffage régulier d’un glaçon d’eau pure, température relevée chaque minute',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: -20, max: 30, pas: 5 }),
  points: Object.freeze([
    [0, -20], [1, -12], [2, -5], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [8, 5], [9, 12], [10, 18], [11, 24], [12, 30],
  ].map(Object.freeze)),
});

/** Le même chauffage, sur un glaçon d’eau salée : la température ne s’arrête
 *  jamais. C’est le contre-exemple, et il partage les axes du précédent — sans
 *  quoi l’élève comparerait deux échelles au lieu de comparer deux courbes. */
const FUSION_EAU_SALEE = Object.freeze({
  titre: 'Chauffage régulier d’un glaçon d’eau salée, température relevée chaque minute',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: -20, max: 30, pas: 5 }),
  points: Object.freeze([
    [0, -20], [1, -14], [2, -9], [3, -6], [4, -4], [5, -2], [6, 0],
    [7, 3], [8, 7], [9, 12], [10, 18], [11, 24], [12, 30],
  ].map(Object.freeze)),
});

/** Ébullition d’un liquide non nommé, palier à 65 °C. Il n’est PAS dans la
 *  table : l’item demande de lire, pas d’identifier — ce sont deux gestes, donc
 *  deux items. Demi-graduation 2,5 °C. */
const EBULLITION_INCONNU_65 = Object.freeze({
  titre: 'Chauffage du liquide du flacon A jusqu’à l’ébullition',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 10, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 20, max: 90, pas: 5 }),
  points: Object.freeze([
    [0, 20], [1, 32], [2, 45], [3, 55], [4, 62], [5, 65],
    [6, 65], [7, 65], [8, 65], [9, 65], [10, 65],
  ].map(Object.freeze)),
});

/** Refroidissement : le palier existe aussi dans l’autre sens, et à une valeur
 *  négative. Demi-graduation 2,5 °C. */
const SOLIDIFICATION_INCONNU_MOINS_10 = Object.freeze({
  titre: 'Refroidissement du liquide du flacon B jusqu’à sa solidification complète',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: -25, max: 25, pas: 5 }),
  points: Object.freeze([
    [0, 20], [1, 12], [2, 5], [3, 0], [4, -5], [5, -10], [6, -10],
    [7, -10], [8, -10], [9, -15], [10, -20], [11, -23], [12, -25],
  ].map(Object.freeze)),
});

/** Palier à 100 °C : la courbe d’un liquide qu’on peut ensuite identifier. */
const EBULLITION_BOUTEILLE_SANS_ETIQUETTE = Object.freeze({
  titre: 'Chauffage du liquide incolore d’une bouteille sans étiquette',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 10, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 0, max: 120, pas: 10 }),
  points: Object.freeze([
    [0, 20], [1, 40], [2, 60], [3, 80], [4, 95], [5, 100],
    [6, 100], [7, 100], [8, 100], [9, 100], [10, 100],
  ].map(Object.freeze)),
});

/** Le sirop de sucre : il bout, et sa température continue de monter tant qu’il
 *  bout. Le cas de la vie courante où « ça bout » et « c’est un corps pur » se
 *  séparent. Demi-graduation 1 °C — la plus fine du fichier, et c’est l’axe qui
 *  la donne.
 *
 *  ⚠ Ce jeu de mesures remplace une eau de cuisson salée qui montait à 104 °C.
 *  C’était une valeur inventée : dix grammes de sel par litre — le salage réel
 *  d’une eau de pâtes — élèvent la température d’ébullition d’environ un dixième
 *  de degré, invisible sur tout thermomètre de cuisine. Un sirop, lui, monte
 *  vraiment de plusieurs degrés en bouillant, à mesure que l’eau s’évapore et
 *  que le sucre se concentre : c’est le principe même du thermomètre à
 *  confiserie. La montée est de UN degré par minute, jamais nulle — l’ancienne
 *  courbe portait quatre segments d’une minute à température constante, dans
 *  l’item même dont toute la question est « la température ne reste jamais
 *  fixe ». */
const SIROP_DE_SUCRE = Object.freeze({
  titre: 'Chauffage d’un sirop — sucre dissous dans l’eau avant le chauffage',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 80, max: 110, pas: 2 }),
  points: Object.freeze([
    [0, 80], [1, 85], [2, 90], [3, 95], [4, 100], [5, 101], [6, 102],
    [7, 103], [8, 104], [9, 105], [10, 106], [11, 107], [12, 108],
  ].map(Object.freeze)),
});

/** Le même jeu de mesures rendu en TABLEAU : `schema.js` trace les deux depuis
 *  un seul objet, donc un tableau ne peut pas contredire son graphique. Palier
 *  de la deuxième à la cinquième minute. */
const RELEVE_FUSION_TROIS_MINUTES = Object.freeze({
  titre: 'Relevé minute par minute du chauffage d’un solide inconnu',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 10, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: -10, max: 60, pas: 5 }),
  points: Object.freeze([
    [0, -10], [1, -5], [2, 0], [3, 0], [4, 0], [5, 0],
    [6, 5], [7, 15], [8, 28], [9, 42], [10, 55],
  ].map(Object.freeze)),
});

/** Un relevé pris toutes les cinq minutes : un seul point tombe sur le palier,
 *  donc le palier ne se VOIT pas. Le critère est bon, la mesure ne permet pas
 *  de l’appliquer — c’est ce que l’item p04 fait dire. */
const RELEVE_TROP_ESPACE = Object.freeze({
  titre: 'Relevé effectué toutes les cinq minutes sur un solide chauffé régulièrement',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 30, pas: 5 }),
  y: Object.freeze({ titre: 'Température (°C)', min: -20, max: 40, pas: 10 }),
  points: Object.freeze([
    [0, -20], [5, -4], [10, 0], [15, 10], [20, 22], [25, 32], [30, 40],
  ].map(Object.freeze)),
});

// ── Les cinq objets du test : aucun n’apparaît ailleurs ────────────────────

/** Palier à 25 °C. Demi-graduation 2,5 °C. */
const T_FUSION_25 = Object.freeze({
  titre: 'Chauffage de l’échantillon n° 1, un solide inconnu',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 10, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 0, max: 50, pas: 5 }),
  points: Object.freeze([
    [0, 0], [1, 8], [2, 16], [3, 22], [4, 25], [5, 25],
    [6, 25], [7, 25], [8, 32], [9, 41], [10, 50],
  ].map(Object.freeze)),
});

/** Refroidissement sans aucun palier. */
const T_REFROIDISSEMENT_MELANGE = Object.freeze({
  titre: 'Refroidissement de l’échantillon n° 2, un liquide inconnu',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 10, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: -15, max: 25, pas: 5 }),
  points: Object.freeze([
    [0, 25], [1, 19], [2, 14], [3, 10], [4, 6], [5, 3],
    [6, 0], [7, -4], [8, -8], [9, -12], [10, -15],
  ].map(Object.freeze)),
});

/** Palier à 56 °C sur un axe gradué de quatre en quatre : demi-graduation 2 °C.
 *  La fenêtre la plus serrée des lectures du test, et personne ne l’a saisie. */
const T_EBULLITION_56 = Object.freeze({
  titre: 'Chauffage de l’échantillon n° 3, un liquide très volatil',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 10, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 20, max: 80, pas: 4 }),
  points: Object.freeze([
    [0, 20], [1, 32], [2, 44], [3, 52], [4, 56], [5, 56],
    [6, 56], [7, 56], [8, 56], [9, 56], [10, 56],
  ].map(Object.freeze)),
});

/** Palier de la cinquième à la dixième minute : cinq minutes. */
const T_RELEVE_FUSION_CINQ_MINUTES = Object.freeze({
  titre: 'Relevé minute par minute du chauffage de l’échantillon n° 4',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 14, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 20, max: 90, pas: 5 }),
  points: Object.freeze([
    [0, 20], [1, 32], [2, 44], [3, 55], [4, 64], [5, 70], [6, 70], [7, 70],
    [8, 70], [9, 70], [10, 70], [11, 74], [12, 80], [13, 85], [14, 90],
  ].map(Object.freeze)),
});

/** Le cas difficile : la montée ralentit, mais elle ne s’arrête jamais. Un
 *  élève qui a retenu « ça fait un plat » répond corps pur ; le critère dit
 *  « constante », pas « qui monte moins vite ». */
const T_PALIER_INCLINE = Object.freeze({
  titre: 'Chauffage de l’échantillon n° 5, un solide inconnu',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 40, max: 100, pas: 5 }),
  points: Object.freeze([
    [0, 40], [1, 55], [2, 68], [3, 76], [4, 78], [5, 80], [6, 82],
    [7, 84], [8, 86], [9, 92], [10, 96], [11, 98], [12, 100],
  ].map(Object.freeze)),
});

// ── Les objets de la découverte et de la méthode ───────────────────────────

/** Découverte, courbe A : un corps pur qui se solidifie, palier à 53 °C. */
const DECOUVERTE_SOLIDIFICATION_A = Object.freeze({
  titre: 'Refroidissement du produit A',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 30, max: 80, pas: 5 }),
  points: Object.freeze([
    [0, 80], [1, 72], [2, 65], [3, 58], [4, 53], [5, 53], [6, 53],
    [7, 53], [8, 53], [9, 48], [10, 42], [11, 36], [12, 30],
  ].map(Object.freeze)),
});

/** Découverte, courbe B : mêmes axes, mêmes bornes, mêmes instants — et aucun
 *  palier. Deux courbes qui ne diffèrent que par ce qu’on veut faire voir. */
const DECOUVERTE_SOLIDIFICATION_B = Object.freeze({
  titre: 'Refroidissement du produit B',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 30, max: 80, pas: 5 }),
  points: Object.freeze([
    [0, 80], [1, 73], [2, 67], [3, 61], [4, 56], [5, 52], [6, 48],
    [7, 45], [8, 42], [9, 39], [10, 36], [11, 33], [12, 30],
  ].map(Object.freeze)),
});

/** La courbe de l’exercice résolu : palier à 44 °C, demi-graduation 2,5 °C. */
const METHODE_FUSION_44 = Object.freeze({
  titre: 'Chauffage régulier d’un solide blanc prélevé dans un flacon non étiqueté',
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 10, pas: 1 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 20, max: 70, pas: 5 }),
  points: Object.freeze([
    [0, 20], [1, 28], [2, 36], [3, 42], [4, 44], [5, 44],
    [6, 44], [7, 44], [8, 50], [9, 60], [10, 70],
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// La découverte — rencontrer le critère avant de le nommer
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun mot de cours n’y figure : ni « corps pur », ni « palier ». On donne deux
// refroidissements, on demande ce qui les distingue, et le nom vient après. Une
// découverte qui commence par la définition est une leçon déguisée.

export const DECOUVERTE = Object.freeze({
  titre: 'Deux produits qui refroidissent, et une différence qui saute aux yeux',
  texte: 'Deux produits liquides sont sortis d’une étuve et laissés à refroidir dans '
    + 'la même pièce. On relève leur température chaque minute jusqu’à ce qu’ils soient '
    + 'entièrement solides. Les deux courbes sont tracées sur les mêmes axes.',
  figures: Object.freeze([
    Object.freeze({ sorte: 'graphique', donnees: DECOUVERTE_SOLIDIFICATION_A }),
    Object.freeze({ sorte: 'graphique', donnees: DECOUVERTE_SOLIDIFICATION_B }),
  ]),
  question: 'Pendant tout le refroidissement, l’une des deux températures fait quelque '
    + 'chose que l’autre ne fait jamais. Quoi, et pendant combien de temps ?',
  champs: Object.freeze([
    Object.freeze({
      id: 'ce-que-fait-a',
      etiquette: 'Le produit A : sa température…',
      attendu: 'reste fixe pendant un moment',
      choix: Object.freeze([
        'reste fixe pendant un moment',
        'descend de plus en plus vite',
        'descend toujours à la même allure',
      ]),
    }),
    Object.freeze({
      id: 'duree-du-palier-de-a',
      etiquette: 'Elle reste fixe pendant… (en minutes)',
      attendu: 4,
      unite: 'min',
    }),
  ]),
  conclusion: 'Le produit A s’arrête à une température et y reste tant qu’il est en '
    + 'train de se solidifier ; le produit B, lui, descend sans jamais s’arrêter. Cette '
    + 'différence n’est pas un hasard de manipulation : c’est **la** façon de reconnaître '
    + 'un corps pur d’un mélange, et la valeur à laquelle A s’arrête suffit souvent à '
    + 'dire de quel corps pur il s’agit.',
});

// ════════════════════════════════════════════════════════════════════════════
// Le cours — court, et honnête sur ce qu’il n’explique pas
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze([
  Object.freeze({
    type: 'definition',
    titre: 'Palier de changement d’état',
    texte: 'Sur une courbe de température en fonction du temps, un **palier** est une '
      + 'portion où la température **ne change plus**, alors que le chauffage ou le '
      + 'refroidissement continue.',
  }),
  Object.freeze({
    type: 'propriete',
    titre: 'Le critère',
    texte: 'Un **corps pur** change d’état à **température constante** : sa courbe '
      + 'présente un palier.\n'
      + 'Un **mélange** change d’état **sans température constante** : sa courbe n’a pas '
      + 'de palier — au mieux, elle ralentit.',
  }),
  Object.freeze({
    type: 'propriete',
    titre: 'La valeur du palier identifie le corps pur',
    texte: 'La température du palier ne dépend pas de la quantité de matière ni de la '
      + 'puissance du chauffage : **sous une pression donnée**, elle ne dépend que du '
      + 'corps. On la compare donc à une table de référence, et c’est ainsi qu’on '
      + 'identifie le corps pur. La précision « sous une pression donnée » n’est pas un '
      + 'détail : la remarque suivante dit ce qu’elle change.',
  }),
  Object.freeze({
    type: 'remarque',
    titre: 'Sous pression atmosphérique — la condition qu’on oublie',
    texte: 'Les valeurs de la table sont données **sous pression atmosphérique**. En '
      + 'altitude, la pression est plus faible et l’eau bout plus bas : la température du '
      + 'palier change, alors que le corps, lui, n’a pas changé. Un palier plus bas que '
      + 'la table ne veut donc pas dire « ce n’est pas de l’eau » — il veut dire « on '
      + 'n’est pas dans les conditions de la table ».',
  }),
  Object.freeze({
    type: 'remarque',
    titre: 'Ce que ce cours n’explique pas',
    texte: 'Pourquoi la température s’arrête de monter pendant la fusion, alors qu’on '
      + 'chauffe toujours ? La réponse demande la notion d’énergie de changement d’état, '
      + 'qui n’est pas au programme de quatrième. Ici, le palier est un **fait mesuré** : '
      + 'on l’utilise, on ne l’explique pas. Tu peux t’en servir sans chercher à le '
      + '« voir ».',
  }),
  Object.freeze({
    type: 'exemple',
    titre: 'Deux valeurs à connaître, et deux repères',
    texte: 'Sous pression atmosphérique, l’eau pure fond à zéro degré Celsius et bout à '
      + 'cent degrés Celsius : ce sont les deux valeurs à retenir par cœur. Les autres se '
      + 'lisent dans la table, et deux repères suffisent à s’orienter — l’éthanol bout '
      + 'bien plus bas que l’eau, le fer fond bien plus haut. Les paliers s’étalent ainsi '
      + 'sur toute l’échelle, et c’est ce qui les rend utiles pour identifier.',
  }),
]);

// ════════════════════════════════════════════════════════════════════════════
// La méthode — un exercice résolu, et le geste de contrôle à la fin
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Identifier un solide à partir de sa courbe de chauffage',
  enonce: 'On chauffe régulièrement un solide blanc prélevé dans un flacon non étiqueté '
    + 'et on relève sa température chaque minute. La courbe est tracée ci-dessous. '
    + 'Ce solide est-il un corps pur ? Si oui, à quelle température fond-il ?',
  figure: Object.freeze({ sorte: 'graphique', donnees: METHODE_FUSION_44 }),
  etapes: Object.freeze([
    Object.freeze({
      geste: 'Chercher une portion horizontale',
      redaction: 'Entre la quatrième et la septième minute, la température ne change pas : '
        + 'il y a un palier.',
    }),
    Object.freeze({
      geste: 'Conclure sur la nature du corps',
      redaction: 'La température reste constante pendant le changement d’état : ce solide '
        + 'est donc un corps pur.',
    }),
    Object.freeze({
      geste: 'Lire la valeur du palier sur l’axe des ordonnées',
      redaction: 'Le palier se situe entre la graduation 40 et la graduation 45, plus près '
        + 'de la seconde : la température de fusion vaut environ quarante-quatre degrés '
        + 'Celsius.',
    }),
    Object.freeze({
      geste: 'Écrire la réponse AVEC son unité',
      redaction: 'Température de fusion : quarante-quatre degrés Celsius.',
    }),
  ]),
  controle: 'Deux vérifications, toujours les mêmes. **Un** : le palier est-il vraiment '
    + 'horizontal, ou seulement moins pentu qu’avant ? Une portion qui monte encore, même '
    + 'lentement, n’est pas un palier. **Deux** : ai-je lu sur l’axe des températures, et '
    + 'non sur celui des temps ? Le nombre lu doit être une température, et il s’écrit '
    + 'avec son unité.',
  toleranceDeLecture: 'La graduation de l’axe des températures vaut cinq degrés : on '
    + 'accepte donc une demi-graduation d’écart, soit deux degrés et demi. Cette tolérance '
    + 'n’est pas décidée par l’auteur de l’exercice, elle est calculée à partir de l’axe.',
});

// ════════════════════════════════════════════════════════════════════════════
// L’entraînement — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 · Le palier de référence, et la tolérance qui se calcule ─────────
  //
  // Classe B : la figure et la correction citent le même objet. Les deux modèles
  // erronés sont les deux lectures fautives que produit un élève qui n’a pas
  // compris qu’on lit une portion et non un point — le premier point, le
  // dernier. Ils sont EXÉCUTÉS, et le contrôle vérifie qu’ils tombent hors de la
  // fenêtre de 2,5 °C que l’axe donne.
  {
    id: 'ch01-sf3-e01-palier-de-fusion-de-la-glace',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    sfSollicites: [],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'glacon-chauffe-et-releve-minute-par-minute',
    enonce: 'On chauffe régulièrement un glaçon d’eau pure et on relève sa température '
      + 'chaque minute. Repère le palier, puis donne la température à laquelle il se '
      + 'situe, avec son unité.',
    figure: { sorte: 'graphique', donnees: FUSION_EAU_PURE },
    donnees: {
      temperatureInitiale: { valeur: [-20, 1], unite: '°C' },
      temperatureFinale: { valeur: [30, 1], unite: '°C' },
    },
    reponse: {
      objetFormel: FUSION_EAU_PURE,
      valeur: [0, 1],
      unite: '°C',
      semantique: 'tolerante',
    },
    modelesErrones: [
      {
        id: 'lecture-du-premier-point',
        nom: 'modèle « la température de fusion, c’est celle d’où l’on part » : on lit le '
          + 'premier point du relevé au lieu de chercher la portion horizontale',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureInitiale', unite: '°C' }], reponse: 'x' },
      },
      {
        id: 'lecture-du-dernier-point',
        nom: 'modèle « la température de fusion, c’est celle qu’on atteint à la fin » : on '
          + 'lit le dernier point, celui où tout est fondu depuis longtemps',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureFinale', unite: '°C' }], reponse: 'x' },
      },
    ],
  },

  // ── e02 · Le contre-exemple, sur les mêmes axes ──────────────────────────
  //
  // La réponse est un CHOIX, pas un nombre : aucune unité n’est en jeu, donc
  // aucune tolérance. Ce qui est garanti reste l’essentiel — le verdict porte
  // sur le même objet que la figure.
  {
    id: 'ch01-sf3-e02-eau-salee-na-pas-de-palier',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'glacon-d-eau-salee-chauffe-de-la-meme-facon',
    enonce: 'On refait exactement la même expérience avec un glaçon d’eau salée : même '
      + 'chauffage, mêmes instants de relevé, mêmes axes. Ce glaçon est-il fait d’un corps '
      + 'pur ou d’un mélange ?',
    figure: { sorte: 'graphique', donnees: FUSION_EAU_SALEE },
    reponse: {
      objetFormel: FUSION_EAU_SALEE,
      libre: false,
      choix: 'un-melange',
      choixPossibles: ['un-corps-pur', 'un-melange', 'on-ne-peut-pas-savoir'],
    },
  },

  // ── e03 · Le rituel de contrôle ─────────────────────────────────────────
  //
  // Pas un automatisme de calcul : le geste qu’on veut voir revenir — aller
  // chercher la valeur de référence AVANT de conclure. `rituelDeControle` exclut
  // l’item de la fenêtre des cinq séances, sinon il saturerait le cercle 1.
  {
    id: 'ch01-sf3-e03-rituel-la-valeur-de-reference-de-l-eau',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'valeur-de-reference-avant-de-conclure',
    enonce: 'Un liquide gèle à température constante et on se demande si c’est de l’eau. '
      + 'Avant de répondre : quelle est la température de fusion de l’eau pure sous '
      + 'pression atmosphérique ? Donne-la avec son unité.',
    requete: { table: 'changements-d-etat', cle: 'eau', colonne: 'fusion' },
    reponse: { valeur: [0, 1], unite: '°C', semantique: 'exacte' },
    rituelDeControle: true,
  },

  // ── e04 · Palier 2 — on change de grandeur : ébullition ─────────────────
  //
  // Le liquide n’est PAS dans la table : l’item demande de lire une valeur, pas
  // d’identifier un corps. Le second modèle erroné est le plus intéressant —
  // lire le dernier point de la MONTÉE, à 62 °C, c’est-à-dire rater le palier de
  // trois degrés là où la fenêtre en vaut deux et demi.
  {
    id: 'ch01-sf3-e04-palier-d-ebullition-du-flacon-a',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'flacon-a-chauffe-jusqu-a-ebullition',
    enonce: 'On chauffe le liquide du flacon A jusqu’à ce qu’il bouille. À quelle '
      + 'température ce liquide bout-il ? Réponds avec son unité.',
    figure: { sorte: 'graphique', donnees: EBULLITION_INCONNU_65 },
    donnees: {
      temperatureInitiale: { valeur: [20, 1], unite: '°C' },
      derniereTemperatureAvantLePalier: { valeur: [62, 1], unite: '°C' },
    },
    reponse: {
      objetFormel: EBULLITION_INCONNU_65,
      valeur: [65, 1],
      unite: '°C',
      semantique: 'tolerante',
    },
    modelesErrones: [
      {
        id: 'lecture-du-premier-point',
        nom: 'modèle « c’est la température de départ » : on lit le premier point du relevé',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureInitiale', unite: '°C' }], reponse: 'x' },
      },
      {
        id: 'lecture-du-haut-de-la-montee',
        nom: 'modèle « le palier commence là où la courbe se casse » : on lit le dernier '
          + 'point de la montée au lieu du premier point de la portion horizontale',
        calcul: { etapes: [{ id: 'x', expr: '@derniereTemperatureAvantLePalier', unite: '°C' }], reponse: 'x' },
      },
    ],
  },

  // ── e05 · Palier 2 — on change de sens : refroidissement, valeur négative ─
  {
    id: 'ch01-sf3-e05-palier-de-solidification-du-flacon-b',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'flacon-b-refroidi-jusqu-a-solidification',
    enonce: 'Cette fois on refroidit : le liquide du flacon B est placé au congélateur et '
      + 'sa température est relevée jusqu’à ce qu’il soit entièrement solide. À quelle '
      + 'température ce liquide se solidifie-t-il ? Réponds avec son unité.',
    figure: { sorte: 'graphique', donnees: SOLIDIFICATION_INCONNU_MOINS_10 },
    donnees: {
      temperatureInitiale: { valeur: [20, 1], unite: '°C' },
      temperatureFinale: { valeur: [-25, 1], unite: '°C' },
    },
    reponse: {
      objetFormel: SOLIDIFICATION_INCONNU_MOINS_10,
      valeur: [-10, 1],
      unite: '°C',
      semantique: 'tolerante',
    },
    modelesErrones: [
      {
        id: 'lecture-du-premier-point',
        nom: 'modèle « c’est la température de départ » : on lit le premier point du relevé',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureInitiale', unite: '°C' }], reponse: 'x' },
      },
      {
        id: 'lecture-de-la-plus-basse-temperature',
        nom: 'modèle « il gèle à la température la plus basse atteinte » : on lit le dernier '
          + 'point, là où le solide continue de refroidir',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureFinale', unite: '°C' }], reponse: 'x' },
      },
    ],
  },

  // ── e06 · Palier 2 — on change de support : le tableau, et un vrai calcul ─
  //
  // Classe A. Les deux données sont les instants que le TABLEAU porte : l’élève
  // les y lit, la chaîne les rejoue en rationnels exacts avec leur dimension. Un
  // tableau ne donne pas de demi-graduation, donc la sémantique est exacte — et
  // c’est vrai : sur un relevé minute par minute, une durée de palier n’est pas
  // approchée, elle se compte.
  {
    id: 'ch01-sf3-e06-duree-du-palier-sur-un-releve',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'releve-en-tableau-d-un-solide-inconnu',
    enonce: 'Voici le relevé, minute par minute, du chauffage régulier d’un solide '
      + 'inconnu. Repère le palier, puis donne sa durée — de l’instant où il commence à '
      + 'l’instant où il finit — avec son unité.',
    figure: { sorte: 'tableau', donnees: RELEVE_FUSION_TROIS_MINUTES },
    donnees: {
      debutDuPalier: { valeur: [2, 1], unite: 'min' },
      finDuPalier: { valeur: [5, 1], unite: 'min' },
    },
    calcul: {
      etapes: [{ id: 'duree', expr: '@finDuPalier - @debutDuPalier', unite: 'min' }],
      reponse: 'duree',
    },
    reponse: { valeur: [3, 1], unite: 'min', semantique: 'exacte' },
  },

  // ── e07 · Rituel — la valeur de référence de l’autre corps de la table ───
  {
    id: 'ch01-sf3-e07-rituel-l-ethanol-reste-liquide-tres-bas',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'thermometre-a-alcool-qui-ne-gele-pas',
    enonce: 'Les thermomètres de laboratoire sont remplis d’éthanol coloré parce que '
      + 'l’éthanol reste liquide très bas. À quelle température l’éthanol pur fond-il, '
      + 'sous pression atmosphérique ? Réponds avec son unité.',
    requete: { table: 'changements-d-etat', cle: 'ethanol', colonne: 'fusion' },
    reponse: { valeur: [-114, 1], unite: '°C', semantique: 'exacte' },
    rituelDeControle: true,
  },

  // ── e08 · Palier 3 — on change de mode de réponse : le double QCM ────────
  //
  // Classe C, la seule sans garantie mécanique : elle est comptée, plafonnée et
  // relue, et le scellé porte sur l’item entier moins le bloc `relu` — donc sur
  // les justifications, qui sont ici la partie risquée.
  //
  // Aucune des justifications fausses n’invente une conception : la première
  // tourne en rond — elle énonce le critère sans jamais le mettre en face des
  // données —, la deuxième est le contrat didactique lui-même — on est au
  // chapitre des corps purs, donc c’en est un —, la troisième confond « il
  // change d’état » avec « il est pur ». Une seule est TYPÉE, la deuxième : les
  // deux autres sont fausses sans être l’instance d’une conception du catalogue,
  // et c’est l’état honnête plutôt qu’un rattachement de complaisance.
  {
    id: 'ch01-sf3-e08-double-qcm-le-liquide-qui-ne-s-arrete-jamais',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'liquide-place-au-congelateur-et-surveille',
    enonce: 'Un liquide est placé au congélateur. Du début à la fin de sa solidification, '
      + 'la température relevée descend, sans jamais rester fixe. Ce liquide est-il un '
      + 'corps pur ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non-c-est-un-melange',
      choixPossibles: ['oui-c-est-un-corps-pur', 'non-c-est-un-melange', 'on-ne-peut-pas-savoir'],
    },
    justifications: [
      {
        id: 'pas-de-palier-donc-pas-corps-pur',
        texte: 'Un corps pur se solidifie à température constante. Ici la température '
          + 'n’est jamais restée fixe : ce n’est donc pas un corps pur.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'la-regle-recitee',
        texte: 'Un corps pur a une température de changement d’état, donc il en a une.',
        juste: false,
        provenance: 'locale',
        // ⚠ Portait `piege: 'reponse-conforme-sans-adhesion'`. Ce piège se lit dans
        // l’ÉCART entre une loi restituée et une prédiction faite ailleurs — sa
        // propre `conditionValidite` exige une PAIRE d’items séparés, et dit en
        // toutes lettres que « la conception se lit dans l’écart entre les deux,
        // jamais dans l’un des deux pris seul ». Sur un double QCM isolé, son
        // contrôle (« fais tourner ta propre phrase sur la situation ») n’a rien à
        // faire tourner : la phrase est circulaire, elle ne prédit rien. Et
        // `pieges/contrat.js` range explicitement « la justification vide » hors
        // des conceptions typées. La règle est MUETTE sur cette réponse : le
        // rattachement est retiré.
      },
      {
        id: 'on-est-au-chapitre-des-corps-purs',
        texte: 'C’est le chapitre sur les corps purs, et on nous montre un liquide qui '
          + 'gèle : c’est donc un corps pur.',
        juste: false,
        // ⚠ Portait `provenance: 'reformulee'` avec un `deriveDe` renvoyant à
        // « Barker 2000 § 5 ». `sf1.js` cite cette même section pour un TOUT AUTRE
        // résultat — « chimique veut dire artificiel » —, et le catalogue déclare
        // ce piège `fiabilite: 'non-documente'` : dériver la justification d’une
        // étude primaire pour une conception que le catalogue dit non documentée
        // fabrique une provenance résoluble et fausse. `sf2.js` écrit la règle de
        // la maison et l’applique à la conception identique : `locale`, sans
        // `deriveDe`. Le rattachement au piège, lui, TIENT — sa règle réfute la
        // réponse mot pour mot (« montre le mot de l’énoncé sur lequel ta réponse
        // s’appuie »), et `sfSollicites` porte le savoir-faire qui le déclare.
        provenance: 'locale',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'il-gele-donc-il-est-pur',
        texte: 'Il finit bien par geler entièrement, donc il est pur : un mélange, ça ne '
          + 'gèle pas.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: '902be08278c188e9',
    },
  },

  // ── e09 · Palier 3 — l’écart à la valeur de référence, calculé ───────────
  //
  // La conclusion (« ce n’est donc pas de l’eau ») n’est PAS demandée ici : elle
  // est libre, donc invérifiable, donc elle relève de la classe C. Et elle n’est
  // écrite dans AUCUN item de ce fichier — le budget de trois items relus est
  // pris par les trois doubles QCM. Le découpage est appliqué ; la seconde moitié
  // n’est pas promise ailleurs, elle est absente, et c’est ce qui est vrai.
  {
    id: 'ch01-sf3-e09-ecart-entre-le-palier-et-la-reference',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'palier-mesure-compare-a-la-table',
    enonce: 'Un élève mesure un palier d’ébullition à {{donnee:temperatureDuPalier}} sur '
      + 'un liquide qu’il croit être de l’eau. La table donne l’eau pure à '
      + '{{donnee:temperatureDeReference}} sous pression atmosphérique. De combien son '
      + 'palier s’écarte-t-il de la valeur de référence ? Réponds avec son unité.',
    donnees: {
      temperatureDeReference: { valeur: [100, 1], unite: '°C' },
      temperatureDuPalier: { valeur: [97, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@temperatureDeReference - @temperatureDuPalier', unite: '°C' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [3, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── e10 · Palier 4 — non étiqueté : reconnaître d’abord de quoi il s’agit ─
  //
  // Rien dans l’énoncé ne dit « cherche un palier ». La première tâche est de
  // reconnaître que c’est là que se joue la question, et c’est précisément ce
  // que le palier non étiqueté mesure.
  {
    id: 'ch01-sf3-e10-la-bouteille-sans-etiquette',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'bouteille-sans-etiquette-au-laboratoire',
    enonce: 'On a retrouvé au laboratoire une bouteille sans étiquette contenant un '
      + 'liquide incolore. On en chauffe un peu et on relève la température. Ce liquide '
      + 'est-il un corps pur ou un mélange ?',
    figure: { sorte: 'graphique', donnees: EBULLITION_BOUTEILLE_SANS_ETIQUETTE },
    reponse: {
      objetFormel: EBULLITION_BOUTEILLE_SANS_ETIQUETTE,
      libre: false,
      choix: 'un-corps-pur',
      choixPossibles: ['un-corps-pur', 'un-melange', 'on-ne-peut-pas-savoir'],
    },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// Les problèmes — 5 énoncés contextualisés
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 · La prédiction engagée, sur le cas le plus contre-intuitif ──────
  //
  // On chauffe plus fort, et la température ne bouge pas. La valeur prédite et
  // son unité sont saisies et verrouillées AVANT le résultat : sans engagement
  // préalable, il n’y a pas de conflit, juste une information de plus. Aucun
  // `estFormatDiagnostique` ici — ce drapeau appartient à un piège, et ce
  // savoir-faire n’en déclare aucun.
  {
    id: 'ch01-sf3-p01-on-chauffe-plus-fort-pendant-l-ebullition',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'casserole-d-eau-pure-sur-une-plaque-reglable',
    enonce: 'De l’eau pure bout dans une casserole, sur une plaque réglable, sous '
      + 'pression atmosphérique. Un thermomètre plonge dedans. On pousse la plaque à sa '
      + 'puissance maximale et on attend deux minutes : l’eau bout beaucoup plus fort. '
      + 'Écris la température que le thermomètre affichera alors, avec son unité. Ta '
      + 'prédiction sera verrouillée avant le résultat.',
    requete: { table: 'changements-d-etat', cle: 'eau', colonne: 'ebullition' },
    reponse: { valeur: [100, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── p02 · La cuisine : « ça bout » n’est pas « c’est un corps pur » ──────
  //
  // La graduation la plus fine du fichier, deux degrés, donc une demi-graduation
  // d’un degré. La courbe monte d’UN degré par minute pendant toute l’ébullition,
  // soit une demi-graduation : à l’œil, c’est presque plat — et ce n’est pas un
  // palier, parce qu’elle ne s’arrête jamais une seule minute.
  {
    id: 'ch01-sf3-p02-le-sirop-qui-continue-de-monter',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'casserole-de-sirop-de-sucre',
    enonce: 'Pour faire un sirop, on dissout du sucre dans l’eau avant de mettre la '
      + 'casserole à chauffer. Un thermomètre de cuisine relève la température toutes les '
      + 'minutes, jusqu’à ce que le sirop bouillonne franchement. Ce sirop est-il un corps '
      + 'pur ou un mélange ? Regarde ce que fait la température pendant que ça bout.',
    figure: { sorte: 'graphique', donnees: SIROP_DE_SUCRE },
    reponse: {
      objetFormel: SIROP_DE_SUCRE,
      libre: false,
      choix: 'un-melange',
      choixPossibles: ['un-corps-pur', 'un-melange', 'on-ne-peut-pas-savoir'],
    },
  },

  // ── p03 · Cercle 2 — la CONDITION de validité du critère ────────────────
  //
  // Le seul item du fichier qui interroge les conditions de la mesure plutôt que
  // la mesure : la table vaut sous pression atmosphérique, et un palier plus bas
  // ne dit pas « ce n’est pas de l’eau », il dit « on n’est plus dans les
  // conditions de la table ». Aucune loi quantitative n’est demandée ni
  // suggérée — l’effet de la pression est hors cycle 4, et le cours le dit.
  //
  // ⚠ L’énoncé disait « on chauffe de l’eau PURE », puis demandait « cette eau
  // est-elle un corps pur ? ». La réponse était dans la question : l’item se
  // réussissait en recopiant un mot de l’énoncé, sans jamais regarder ce que fait
  // la température. Le liquide n’est donc plus nommé, et c’est la constance du
  // palier — la seule chose qui prouve quoi que ce soit ici — qui porte la
  // réponse.
  {
    id: 'ch01-sf3-p03-double-qcm-l-eau-qui-bout-en-altitude',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'refuge-de-haute-montagne',
    enonce: 'Dans un refuge de haute montagne, on chauffe le liquide incolore d’un bidon. '
      + 'Il se met à bouillir et le thermomètre se stabilise à '
      + '{{donnee:palierEnAltitude}}, et y reste tant que ça bout. La table donne l’eau '
      + 'pure à {{donnee:ebullitionDeReference}} sous pression atmosphérique. Ce liquide '
      + 'est-il un corps pur ? Puis choisis la phrase qui dit pourquoi.',
    donnees: {
      palierEnAltitude: { valeur: [93, 1], unite: '°C' },
      ebullitionDeReference: { valeur: [100, 1], unite: '°C' },
    },
    reponse: {
      libre: false,
      choix: 'oui-c-est-un-corps-pur',
      choixPossibles: ['oui-c-est-un-corps-pur', 'non-c-est-un-melange', 'on-ne-peut-pas-savoir'],
    },
    justifications: [
      {
        id: 'la-constance-suffit-la-valeur-depend-des-conditions',
        texte: 'Ce qui prouve qu’on a un corps pur, c’est que la température reste fixe '
          + 'pendant toute l’ébullition. La valeur du palier, elle, dépend des conditions '
          + 'de l’expérience : en montagne on n’est plus dans celles de la table.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'BO n° 31 du 30 juillet 2020, programme de physique-chimie du cycle 4 — '
          + 'les températures de changement d’état sont données sous pression atmosphérique',
      },
      {
        id: 'la-valeur-ne-colle-pas-donc-ce-n-est-pas-de-l-eau',
        texte: 'La table dit cent degrés et le thermomètre en dit sept de moins : ce n’est '
          + 'donc pas de l’eau pure, il y a forcément autre chose dedans.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'le-thermometre-est-casse',
        texte: 'La valeur ne correspond pas à la table, donc le thermomètre est faux : on '
          + 'ne peut rien conclure de cette expérience.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'la-regle-recitee-a-l-envers',
        texte: 'L’eau pure bout à cent degrés : c’est la règle, elle est vraie partout et '
          + 'toujours.',
        juste: false,
        provenance: 'locale',
        // ⚠ Cette justification portait `piege: 'reponse-conforme-sans-adhesion'`.
        // Le rattachement était faux, et il l’était dans le sens le plus grave :
        // la RÈGLE de ce piège REND RAISON à l’élève. Elle dit « quand une loi de
        // physique et une impression se contredisent, c’est l’impression qui
        // perd », et son contrôle ajoute « si l’exercice t’oblige à n’en donner
        // qu’une, donne celle de la loi ». Ici c’est l’inverse qu’il faut faire :
        // la mesure — quatre-vingt-treize degrés, constants — l’emporte sur la
        // règle récitée hors de ses conditions de validité. Re-confronter cet
        // élève avec ce piège l’enfoncerait dans son erreur. La conception en jeu
        // — étendre une loi au-delà de ses conditions — n’est au catalogue sous
        // aucun nom, et `ch01-sf3` ne déclare aucun piège : la justification reste
        // fausse et non typée, ce qui est l’état honnête.
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: '2e65945cb9606215',
    },
  },

  // ── p04 · Cercle 2 — la mesure ne permet pas d’appliquer le critère ──────
  //
  // Le relevé est pris toutes les cinq minutes : un seul point tombe sur le
  // palier, donc rien ne distingue un palier d’un simple passage. Le bon
  // raisonnement n’est pas « c’est un mélange », c’est « ce relevé ne permet
  // pas de trancher » — et c’est une réponse de plein droit, pas une échappatoire.
  {
    id: 'ch01-sf3-p04-un-releve-trop-espace-pour-conclure',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'releve-espace-de-cinq-minutes',
    enonce: 'Un groupe a chauffé un solide régulièrement, mais n’a noté la température '
      + 'que toutes les cinq minutes. Voici son relevé. Que peut-on en conclure sur la '
      + 'nature de ce solide ?',
    figure: { sorte: 'tableau', donnees: RELEVE_TROP_ESPACE },
    reponse: {
      objetFormel: RELEVE_TROP_ESPACE,
      libre: false,
      choix: 'on-ne-peut-pas-conclure',
      choixPossibles: ['oui-c-est-un-corps-pur', 'non-c-est-un-melange', 'on-ne-peut-pas-conclure'],
    },
  },

  // ── p05 · Palier 4 — le calcul qui prépare l’identification ─────────────
  //
  // La question posée est l’écart, qui est vérifiable. « Est-ce de l’éthanol ? »
  // serait une réponse libre, donc un item de classe C — et il n’en reste pas
  // dans le budget de ce savoir-faire. Il n’est donc pas écrit, ici ni ailleurs
  // dans ce fichier, et le dire vaut mieux que renvoyer à un item qui n’existe
  // pas.
  {
    id: 'ch01-sf3-p05-a-un-degre-pres-de-l-ethanol',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'liquide-recupere-dans-un-becher-non-etiquete',
    enonce: 'Un liquide récupéré dans un bécher non étiqueté bout à température '
      + 'constante : le palier est relevé à {{donnee:palierMesure}}. La table donne '
      + 'l’éthanol pur à {{donnee:ebullitionDeLEthanol}} sous pression atmosphérique. De '
      + 'combien le palier mesuré s’écarte-t-il de cette valeur ? Réponds avec son unité.',
    donnees: {
      palierMesure: { valeur: [79, 1], unite: '°C' },
      ebullitionDeLEthanol: { valeur: [78, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@palierMesure - @ebullitionDeLEthanol', unite: '°C' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [1, 1], unite: '°C', semantique: 'exacte' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// L’auto-évaluation — 10 items, et rien de recopié
// ════════════════════════════════════════════════════════════════════════════
//
// Aucune courbe, aucun relevé, aucun énoncé et aucune valeur de réponse n’est
// repris de l’entraînement ni des problèmes. Les cinq cases utiles de la table
// des changements d’état sont réparties de sorte qu’aucune ne serve deux fois
// dans tout le fichier : eau/fusion et éthanol/fusion à l’entraînement,
// eau/ébullition aux problèmes, fer/fusion et éthanol/ébullition ici. Un test
// qui se réussit de mémoire ne mesure que la mémoire.

export const TEST = Object.freeze([

  // ── t01 · Lire un palier ────────────────────────────────────────────────
  {
    id: 'ch01-sf3-t01-palier-de-l-echantillon-1',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'echantillon-numero-un-chauffe-au-laboratoire',
    enonce: 'On chauffe régulièrement l’échantillon n° 1, un solide inconnu, et on relève '
      + 'sa température chaque minute. À quelle température ce solide fond-il ? Réponds '
      + 'avec son unité.',
    figure: { sorte: 'graphique', donnees: T_FUSION_25 },
    donnees: {
      temperatureInitiale: { valeur: [0, 1], unite: '°C' },
      temperatureFinale: { valeur: [50, 1], unite: '°C' },
    },
    reponse: {
      objetFormel: T_FUSION_25,
      valeur: [25, 1],
      unite: '°C',
      semantique: 'tolerante',
    },
    modelesErrones: [
      {
        id: 'lecture-du-premier-point',
        nom: 'modèle « c’est la température de départ » : on lit le premier point du relevé',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureInitiale', unite: '°C' }], reponse: 'x' },
      },
      {
        id: 'lecture-du-dernier-point',
        nom: 'modèle « c’est la température atteinte à la fin » : on lit le dernier point, '
          + 'là où tout est fondu depuis longtemps',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureFinale', unite: '°C' }], reponse: 'x' },
      },
    ],
  },

  // ── t02 · Reconnaître l’absence de palier ───────────────────────────────
  {
    id: 'ch01-sf3-t02-l-echantillon-2-descend-sans-s-arreter',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'echantillon-numero-deux-mis-a-refroidir',
    enonce: 'L’échantillon n° 2 est un liquide qu’on laisse refroidir jusqu’à ce qu’il '
      + 'soit entièrement solide. Est-ce un corps pur ou un mélange ?',
    figure: { sorte: 'graphique', donnees: T_REFROIDISSEMENT_MELANGE },
    reponse: {
      objetFormel: T_REFROIDISSEMENT_MELANGE,
      libre: false,
      choix: 'un-melange',
      choixPossibles: ['un-corps-pur', 'un-melange', 'on-ne-peut-pas-savoir'],
    },
  },

  // ── t03 · La valeur de référence, au bout haut de l’échelle ─────────────
  {
    id: 'ch01-sf3-t03-a-quelle-temperature-le-fer-fond',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'four-de-fonderie',
    enonce: 'Dans une fonderie, on chauffe du fer jusqu’à ce qu’il devienne liquide. Le '
      + 'fer est un corps pur : sa fusion a donc lieu à une température fixe. Laquelle ? '
      + 'Réponds avec son unité.',
    requete: { table: 'changements-d-etat', cle: 'fer', colonne: 'fusion' },
    reponse: { valeur: [1538, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── t04 · La durée d’un palier, sur un relevé neuf ──────────────────────
  {
    id: 'ch01-sf3-t04-duree-du-palier-de-l-echantillon-4',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'releve-en-tableau-de-l-echantillon-numero-quatre',
    enonce: 'Voici le relevé, minute par minute, du chauffage régulier de l’échantillon '
      + 'n° 4. Combien de temps la fusion a-t-elle duré — de l’instant où le palier '
      + 'commence à l’instant où il finit ? Réponds avec son unité.',
    figure: { sorte: 'tableau', donnees: T_RELEVE_FUSION_CINQ_MINUTES },
    donnees: {
      debutDuPalier: { valeur: [5, 1], unite: 'min' },
      finDuPalier: { valeur: [10, 1], unite: 'min' },
    },
    calcul: {
      etapes: [{ id: 'duree', expr: '@finDuPalier - @debutDuPalier', unite: 'min' }],
      reponse: 'duree',
    },
    reponse: { valeur: [5, 1], unite: 'min', semantique: 'exacte' },
  },

  // ── t05 · Le palier le plus finement gradué du test ─────────────────────
  //
  // L’axe est gradué de quatre en quatre : la fenêtre vaut deux degrés, et elle
  // est calculée. La lecture fautive « le haut de la montée » tombe à quatre
  // degrés du palier, donc dehors — de peu, ce qui est exactement ce qu’on veut
  // d’un item d’auto-évaluation.
  {
    id: 'ch01-sf3-t05-palier-du-liquide-tres-volatil',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'echantillon-numero-trois-tres-volatil',
    enonce: 'L’échantillon n° 3 est un liquide très volatil : il bout bien avant l’eau. '
      + 'À quelle température bout-il ? Réponds avec son unité.',
    figure: { sorte: 'graphique', donnees: T_EBULLITION_56 },
    donnees: {
      temperatureInitiale: { valeur: [20, 1], unite: '°C' },
      derniereTemperatureAvantLePalier: { valeur: [52, 1], unite: '°C' },
    },
    reponse: {
      objetFormel: T_EBULLITION_56,
      valeur: [56, 1],
      unite: '°C',
      semantique: 'tolerante',
    },
    modelesErrones: [
      {
        id: 'lecture-du-premier-point',
        nom: 'modèle « c’est la température de départ » : on lit le premier point du relevé',
        calcul: { etapes: [{ id: 'x', expr: '@temperatureInitiale', unite: '°C' }], reponse: 'x' },
      },
      {
        id: 'lecture-du-haut-de-la-montee',
        nom: 'modèle « le palier commence là où la courbe se casse » : on lit le dernier '
          + 'point de la montée au lieu du premier point de la portion horizontale',
        calcul: { etapes: [{ id: 'x', expr: '@derniereTemperatureAvantLePalier', unite: '°C' }], reponse: 'x' },
      },
    ],
  },

  // ── t06 · La cinquième et dernière case de la table ─────────────────────
  {
    id: 'ch01-sf3-t06-a-quelle-temperature-l-ethanol-bout',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'distillation-scolaire-d-un-melange-eau-ethanol',
    enonce: 'Pour séparer l’éthanol de l’eau, on chauffe le mélange : l’éthanol part le '
      + 'premier parce qu’il bout plus bas. À quelle température l’éthanol pur bout-il, '
      + 'sous pression atmosphérique ? Réponds avec son unité.',
    requete: { table: 'changements-d-etat', cle: 'ethanol', colonne: 'ebullition' },
    reponse: { valeur: [78, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── t07 · Le double QCM du test — cercle 0, le raisonnement nu ──────────
  //
  // Aucune courbe : la situation est décrite, et ce qui est mesuré est la
  // capacité à opposer le critère à ce qui est dit. La justification juste
  // n’est pas la plus longue, et la plus séduisante est fausse — sans quoi le
  // format ne sépare rien.
  {
    id: 'ch01-sf3-t07-double-qcm-deux-morceaux-de-tailles-differentes',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'deux-morceaux-du-meme-solide-de-masses-differentes',
    enonce: 'On coupe un même solide pur en deux morceaux, un gros et un petit, et on les '
      + 'chauffe séparément, chacun avec sa propre plaque réglée à la même puissance. '
      + 'Les deux courbes auront-elles leur palier à la même température ? Puis choisis '
      + 'la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'oui-a-la-meme-temperature',
      choixPossibles: [
        'oui-a-la-meme-temperature',
        'non-le-gros-morceau-fond-plus-haut',
        'non-le-petit-morceau-fond-plus-haut',
      ],
    },
    justifications: [
      {
        id: 'la-temperature-du-palier-ne-depend-que-du-corps',
        texte: 'La température du palier ne dépend que du corps, pas de sa quantité. Seule '
          + 'la durée du palier change : le gros morceau met plus longtemps à fondre.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'plus-il-y-en-a-plus-il-faut-chauffer',
        texte: 'Plus il y a de matière, plus il faut chauffer : le gros morceau fondra '
          + 'donc à une température plus élevée.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'le-petit-chauffe-plus-vite-donc-plus-haut',
        texte: 'Le petit morceau reçoit autant de chaleur pour moins de matière : il monte '
          + 'plus vite, donc son palier est plus haut.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'la-regle-recitee-sans-la-question',
        texte: 'Un corps pur fond à température constante : les deux paliers sont donc '
          + 'constants, et c’est tout ce qu’on peut dire.',
        juste: false,
        provenance: 'locale',
        // ⚠ Portait `piege: 'reponse-conforme-sans-adhesion'`. La phrase récitée
        // est ici VRAIE et correctement appliquée — l’élève se contente de ne pas
        // répondre à la question posée, qui portait sur l’égalité des deux
        // paliers, pas sur leur constance. Il n’y a donc aucun écart entre ce
        // qu’il dit et ce qu’il prédirait : la règle du piège n’a rien à réfuter,
        // et son contrôle ne se déclenche sur rien. Éluder n’est pas une
        // conception ; la justification reste fausse et non typée.
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: 'd2264c0332d92200',
    },
  },

  // ── t08 · L’écart entre deux paliers ────────────────────────────────────
  {
    id: 'ch01-sf3-t08-ecart-entre-les-paliers-de-deux-solides',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'deux-solides-purs-compares-au-laboratoire',
    enonce: 'Deux solides purs sont chauffés séparément. Le premier fond à '
      + '{{donnee:palierDuSolideA}}, le second à {{donnee:palierDuSolideB}}. De combien '
      + 'leurs températures de fusion diffèrent-elles ? Réponds avec son unité.',
    donnees: {
      palierDuSolideA: { valeur: [118, 1], unite: '°C' },
      palierDuSolideB: { valeur: [92, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@palierDuSolideA - @palierDuSolideB', unite: '°C' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [26, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── t09 · Palier 4 — le cas où « presque plat » n’est pas « plat » ──────
  //
  // Le plus difficile du fichier. Entre la quatrième et la huitième minute, la
  // courbe monte de deux degrés par minute : c’est visiblement plus lent, et ce
  // n’est pas constant. Un élève qui a retenu « ça fait un plat » se trompe ici,
  // et c’est ce qu’on veut savoir.
  {
    id: 'ch01-sf3-t09-la-montee-qui-ralentit-sans-s-arreter',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    sfSollicites: ['ch01-sf1-distinguer-corps-pur-et-melange'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'echantillon-numero-cinq-chauffe-regulierement',
    enonce: 'L’échantillon n° 5 est chauffé régulièrement et sa température est relevée '
      + 'chaque minute. Est-ce un corps pur ou un mélange ? Regarde la courbe pendant '
      + 'toute la durée du changement d’état, pas seulement son allure générale.',
    figure: { sorte: 'graphique', donnees: T_PALIER_INCLINE },
    reponse: {
      objetFormel: T_PALIER_INCLINE,
      libre: false,
      choix: 'un-melange',
      choixPossibles: ['un-corps-pur', 'un-melange', 'on-ne-peut-pas-savoir'],
    },
  },

  // ── t10 · Cercle 2 — deux lectures du même palier, et ce qu’on en fait ──
  //
  // Deux élèves lisent le même palier et ne rendent pas le même nombre : chacune
  // des deux lectures est à deux degrés de leur moyenne, donc à l’intérieur de la
  // demi-graduation de deux degrés et demi que donne un axe gradué de cinq en
  // cinq. La moyenne est le geste de contrôle correspondant, et il est recalculé
  // en rationnels exacts.
  //
  // ⚠ L’énoncé faisait lire « le même THERMOMÈTRE » aux deux élèves. Deux
  // lecteurs d’un thermomètre de laboratoire ne divergent pas de quatre degrés —
  // ils divergent d’une demi-graduation, soit un demi-degré —, et l’énoncé
  // affirmait par-dessus qu’aucune des deux n’était aberrante : la situation
  // décrite ne se produit pas. Le commentaire invoquait par ailleurs « la
  // demi-graduation » alors que l’item, de type `court`, ne déclare aucun axe.
  // Les deux élèves lisent maintenant une COURBE, dont l’énoncé dit la
  // graduation — et l’écart de quatre degrés devient exactement ce que le
  // commentaire prétendait.
  {
    id: 'ch01-sf3-t10-moyenne-de-deux-lectures-du-meme-palier',
    sfPrincipal: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-eleves-lisent-la-meme-courbe',
    enonce: 'Deux élèves lisent le palier sur la même courbe, dont l’axe des températures '
      + 'est gradué de cinq en cinq degrés. L’un annonce {{donnee:premiereLecture}}, '
      + 'l’autre {{donnee:secondeLecture}}. Aucune des deux lectures n’est aberrante. '
      + 'Quelle valeur retiennent-ils s’ils font la moyenne de leurs deux lectures ? '
      + 'Réponds avec son unité.',
    donnees: {
      premiereLecture: { valeur: [82, 1], unite: '°C' },
      secondeLecture: { valeur: [86, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'moyenne', expr: '(@premiereLecture + @secondeLecture) ÷ 2', unite: '°C' }],
      reponse: 'moyenne',
    },
    reponse: { valeur: [84, 1], unite: '°C', semantique: 'exacte' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════

/** Les 25 items du savoir-faire, dans l’ordre du parcours. C’est cette liste que
 *  `tools/verifier-contenu.mjs` valide item par item. */
export const ITEMS = Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);

export default ITEMS;
