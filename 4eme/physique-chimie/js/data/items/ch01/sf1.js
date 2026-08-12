// Chapitre 1, savoir-faire 1 — Distinguer un corps pur d'un mélange.
//
// C'est le PREMIER contenu écrit contre le moteur. Tout ce qui suit a été plié
// au schéma d'item, jamais l'inverse : quand une idée d'exercice ne rentrait pas
// dans un champ existant, c'est l'exercice qui a changé.
//
// ── Le problème de ce savoir-faire, en une phrase ─────────────────────────
//
// Son enjeu est un couple de mots — corps pur, mélange — et **l'item qui ne fait
// que nommer ne mesure rien**. « Un corps pur ne contient qu'une seule espèce
// chimique » se récite en une séance et ne prédit aucune réponse : la difficulté
// n'est pas la définition, c'est de la faire mordre sur un objet réel, où trois
// indices concurrents s'y opposent tous les trois.
//
//   · **Ce qui est limpide passe pour pur.** L'eau salée, l'eau minérale, l'air
//     sont homogènes ET des mélanges. `didactique.md` § 3.1 : 44 % des élèves de
//     14 ans disent que le soluté « disparaît » à la dissolution — et ce qui a
//     disparu ne compte plus dans l'inventaire des espèces.
//   · **Le mot « pur » de la langue courante veut dire propre, naturel, non
//     trafiqué.** § 3.6 le documente sur son symétrique : « chimique » veut dire
//     *artificiel*, et c'est pourquoi diluer un sirop passe pour une réaction
//     chimique chez plus de la moitié des élèves de 16 ans. Une eau « pure de
//     source » est donc un corps pur, une eau distillée sortie d'un appareil ne
//     l'est pas — exactement l'inverse de la chimie.
//   · **L'état de la matière passe pour un critère.** Un solide dur est pur, un
//     gaz n'est pas vraiment de la matière (§ 3.2, § 3.3).
//
// Chaque item de ce fichier attaque l'un de ces trois indices. Aucun ne demande
// la définition.
//
// ── Le critère servi, et le seul ───────────────────────────────────────────
//
// **Une espèce chimique / plusieurs espèces chimiques.** C'est le vocabulaire du
// programme 2020 au cycle 4, et il est tenu partout, y compris quand il coûte :
// l'eau est un corps pur bien que sa molécule porte deux éléments, et le dire
// tôt évite que « pur » devienne synonyme de « simple ».
//
// Le critère EXPÉRIMENTAL servi est le palier de température : un corps pur
// change d'état à température constante, un mélange non. Il est ici en position
// de preuve, jamais de savoir-faire — c'est `ch01-sf3` qui l'enseigne, et il est
// déclaré en `sfSollicites` partout où il sert.
//
// ── Ce que ce savoir-faire NE COUVRE PAS ──────────────────────────────────
//
//   · **Homogène / hétérogène** : c'est `ch01-sf2`. Un seul item de ce fichier
//     s'en approche (l'eau minérale limpide), et c'est pour dire que l'homogène
//     ne décide pas du pur — pas pour classer.
//   · **La lecture d'un palier de température comme savoir-faire** : `ch01-sf3`.
//   · **La solubilité, la miscibilité, la dissolution des gaz** : `ch01-sf4`,
//     `ch01-sf5`, `ch01-sf6`, `ch01-sf7`.
//   · **Corps pur simple / corps pur composé.** Hors programme de 4ᵉ ; la
//     distinction n'est demandée dans aucun item, et l'eau y est traitée comme
//     un corps pur sans que sa formule soit un argument.
//   · **Les techniques de séparation** (décantation, filtration, distillation,
//     chromatographie). Elles relèvent du geste, et l'application ne l'entraîne
//     pas : elle raisonne sur situation décrite. Les deux items qui touchent au
//     dispositif (`e02`, `e10`) demandent de CHOISIR ou de CRITIQUER un montage
//     décrit, jamais de le mettre en œuvre ; `t10` demande d'ORDONNER les étapes
//     d'un test, ce que `charte.md` § « les quatre cercles » range explicitement
//     dans le cercle 3 — geste instrumental **figuré**.
//   · **La masse volumique.** Elle est au chapitre 4, et deux items la
//     mobilisent : `e10` et `p04`, qui demandent tous deux de JUGER un protocole
//     de masse volumique. Aucun des deux n'explique ce qu'est une masse
//     volumique — un élève du chapitre 1 ne peut donc pas les faire. Ils sont
//     servis au chapitre 4, comme les quatre porteurs du piège sont servis aux
//     chapitres 3, 5 et 6. `sfSollicites` DÉCLARE la dépendance ; il ne la
//     résout pas, aucun module ne le lit, et le champ qui décide du créneau est
//     `chapitre`.
//   · **Le modèle particulaire** est au chapitre 5, et `e06`, `p03`, `t06` le
//     montrent. Ceux-là restent au chapitre 1 : leur énoncé DONNE la
//     composition à représenter (« douze molécules faites chacune de deux atomes
//     d'oxygène »), et la tâche est de composer la grille, pas de connaître la
//     formule. La dépendance est déclarée en `sfSollicites`, comme `e07` et
//     `t05` le faisaient déjà pour les symboles.
//   · **Le pH, la concentration, la mole** : écartés par la rubrique
//     `nonDemande` du chapitre 1 lui-même.
//
// ── Le piège, et pourquoi il ne vit qu'au palier 4 ────────────────────────
//
// Le savoir-faire porte `serie-etiquetee-par-le-chapitre`, et sa condition de
// validité est un prédicat exécuté sur la `situation` de l'item :
//
//     chapitreAnnonce === null && serieMelangee === true
//     && typeof chapitreReel === 'string' && chapitreReel !== chapitreEnCours
//
// La troisième clause décide de toute la forme de ce fichier. Elle exige que la
// bonne réponse **ne soit pas celle du chapitre en cours** — sinon la stratégie
// de l'élève (« on est dans le chapitre X, donc c'est X ») donne le bon résultat,
// l'item la conforte, et nous comptons une réussite pour une conception intacte.
//
// Conséquence : **aucun item servi au chapitre 1 ne peut porter ce piège.** Un
// item de corps pur / mélange servi pendant le chapitre des mélanges a
// `chapitreReel === chapitreEnCours`, et le prédicat le refuse — à juste titre.
// Les quatre items porteurs (`e09`, `p01`, `t08`, `t09`) sont donc tous servis
// PLUS TARD, dans un chapitre où le contrat pousse à une autre réponse :
//
//   · `e09` et `t09` au chapitre 6 (transformations chimiques), où tout devient
//     une transformation chimique — le sucre remué, le beurre fondu ;
//   · `p01` au chapitre 5 (atomes et molécules), où tout devient une question de
//     modèle particulaire ;
//   · `t08` au chapitre 3 (l'air), où tout gaz devient un mélange — et où c'est
//     précisément une bouteille de diazote seul qui tombe.
//
// C'est la lecture littérale de `charte.md` : « servir un savoir-faire APRÈS son
// chapitre est légitime — c'est le palier 4, mélangé, servi plus tard ».
//
// **Ce que cela coûte, et il faut le dire.** Le piège n'a donc aucun item aux
// paliers 2 et 3, et le refus `MEME_DIMENSION_AUX_DEUX_PALIERS` ne peut pas se
// déclencher sur lui. Ce n'est pas un contournement : c'est une propriété du
// piège, dont le format diagnostique est lui-même une série mélangée non
// étiquetée.
//
// Les paliers 2 et 3 de ce savoir-faire varient bel et bien, et leurs deux jeux
// de dimensions sont tenus DISJOINTS alors que rien ne l'exige ici — palier 2 :
// `objet-support` et `grandeur-en-jeu` ; palier 3 : `registre` et
// `mode-de-reponse`. Le refus ne mordrait que sur des items porteurs du piège, et
// il n'y en a pas à ces paliers ; les respecter quand même évite qu'un futur
// auteur qui ajoutera un item porteur découvre le refus après coup.
//
// ── Les classes, et pourquoi si peu de C ──────────────────────────────────
//
// Un savoir-faire de classement paraît condamné à la classe C : « corps pur ou
// mélange ? » ne se recalcule pas. C'est faux, et `charte.md` le dit en toutes
// lettres — **classer est de classe B** : « la réponse attendue est un objet
// formel — graphe, multi-ensemble, permutation ». Quatorze items portent donc un
// `reponse.objetFormel` qui EST la correction : le multi-ensemble des affectations,
// la permutation des étapes, la description particulaire. Trois items seulement
// tombent en C, et ce sont les trois doubles QCM, où c'est la JUSTIFICATION qui
// n'a aucune garantie mécanique.
//
// La proportion de cercle 0 (15 items sur 25) dépasse largement la bande 10-20 %.
// C'est normal et ce n'est pas mesuré ici : la bande porte sur une SÉANCE, tous
// savoir-faire confondus, et celui-ci est déclaré `cercle: 0` au catalogue. Un
// savoir-faire de classement qui produirait 15 % de cercle 0 serait le signe
// qu'on a écrit autre chose que ce qui était demandé.
//
// ── Le rattachement des distracteurs, et l'épreuve qu'il doit passer ──────
//
// `item.js` exige qu'un distracteur porte un piège du catalogue. Il ne vérifie
// pas — il ne PEUT pas vérifier — que ce piège dise quoi que ce soit de la
// réponse fausse en question, et c'est le seul endroit du fichier où une faute
// ne coûte rien au build et tout à l'élève : le moteur servira la `regle` et le
// `controle` du piège nommé à un élève dont ils ne parlent pas.
//
// L'épreuve appliquée ici, distracteur par distracteur : **prends la `regle` et
// le `controle` du piège, applique-les à la réponse fausse, et demande si elle
// tombe.** Trois façons d'échouer, et les trois ont été trouvées dans ce
// fichier :
//
//   · **la règle donne raison à l'élève.** `t09`, « il fond et il resolidifie,
//     donc corps pur » sous `frontiere-physique-chimique`, dont la règle dit
//     qu'une fusion suivie d'une solidification est physique — ce que l'élève
//     affirme. Elle confirmait sa prémisse et ne touchait pas sa conclusion.
//   · **la règle est muette.** `e10` et `p04` sous
//     `confusion-masse-et-masse-volumique` : l'élève n'y confond aucune des deux
//     grandeurs, il croit qu'une mesure identifie une matière. `t03` sous
//     `gaz-n-est-pas-de-la-matiere`, dont tout le texte porte sur la MASSE d'un
//     gaz, face à un élève qui lui en accorde une et lui prête seulement
//     plusieurs espèces. `t10` sous `valeur-aberrante-d-une-serie-non-reperee`,
//     dont le contrôle range une série que l'item ne comporte pas.
//   · **le piège couvre un autre objet que celui de l'erreur.**
//     `frontiere-physique-chimique` classe des TRANSFORMATIONS. Employé sur
//     `e04`, `e08`, `t01`, `t07` — quatre situations où rien ne se transforme —,
//     il faisait servir « retrouve-t-on les mêmes molécules à la fin ? » à des
//     élèves qui n'avaient transformé rien du tout. Il reste sur les trois
//     seules erreurs de ce fichier qui portent bien sur une transformation :
//     `e09`, `p01`, `t09`.
//
// **Ce que le catalogue n'a pas, et qu'il ne faut pas fabriquer ici.** Quatre de
// ces erreurs — « pur veut dire naturel », « pur veut dire propre », « rien n'a
// été ajouté », « une poudre, c'est une seule matière » — sont une seule
// conception : le sens courant du mot importé dans la chimie. Aucun piège du
// catalogue ne la porte ; `frontiere-physique-chimique` la porte sur son
// symétrique, le mot « chimique », et c'est ce voisinage qui a fait la faute.
// Deux issues ont été prises, et aucune n'invente de piège : soit le texte du
// distracteur convoque le mot que `frontiere-physique-chimique` possède
// vraiment (`e08`, `t07` premier), soit il passe sous
// `reponse-conforme-sans-adhesion`, dont le contrôle — « fais tourner ta propre
// phrase sur la situation avant de répondre » — réfute chacune de ces quatre
// réponses sans rien ajouter au catalogue.
//
// ── Ce qui n'est pas dans le schéma d'item, et vit à côté ─────────────────
//
// `DECOUVERTE`, `COURS` et `METHODE` ne sont PAS des items : le schéma est une
// liste fermée de trente champs, et aucun ne porte de la prose de cours. Ils sont
// exportés séparément, et **aucun module ne les lit encore** — c'est écrit ici
// plutôt que découvert plus tard. Ils CITENT le catalogue des pièges au lieu de
// le recopier (`regle`, `controle`, `constats` y sont déjà écrits, une fois) :
// deux prose égales par copie divergent au premier auteur qui corrige l'une.

import { SANS_UNITE } from '../../../unites.js';

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — écrits une fois, cités par la correction
// ════════════════════════════════════════════════════════════════════════════
//
// Pour les items de classe B sans figure (classer, ordonner, choisir un
// dispositif), l'objet formel n'engendre pas de dessin : il EST la correction, et
// l'énoncé n'en est que la lecture en français. Pour les trois schémas
// particulaires, la même constante est citée par `figure.description` et par
// `reponse.objetFormel` — identité de référence, contrôlée par `item.js`.

/** Le multi-ensemble d'un item de classement : deux catégories, une affectation
 *  par étiquette. C'est la forme que `charte.md` désigne pour « classer ». */
const classement = (affectation) => Object.freeze({
  question: 'corps-pur-ou-melange',
  categories: Object.freeze(['corps-pur', 'melange']),
  affectation: Object.freeze(affectation),
});

const CLASSEMENT_PAILLASSE = classement({
  'eau distillée': 'corps-pur',
  'fer du clou neuf': 'corps-pur',
  'eau salée': 'melange',
  'air du ballon de baudruche': 'melange',
});

/** Les quatre du placard sont choisis pour que l'ÉTAT ne prédise rien : un
 *  solide pur, un solide mélangé, un liquide pur, un liquide mélangé. La
 *  première rédaction rangeait les deux solides en corps purs et les deux
 *  liquides en mélanges — c'est-à-dire qu'elle donnait raison, quatre fois sur
 *  quatre, à la stratégie « un liquide, ça se mélange » que son propre
 *  distracteur prétendait piéger. */
const CLASSEMENT_CUISINE = classement({
  'sucre en poudre': 'corps-pur',
  farine: 'melange',
  "eau déminéralisée du fer à repasser": 'corps-pur',
  "huile de tournesol": 'melange',
});

const CLASSEMENT_VITRINE = classement({
  diamant: 'corps-pur',
  "cuivre du fil électrique dénudé": 'corps-pur',
  lait: 'melange',
  vinaigre: 'melange',
});

/** `diazote`, et non `azote` : l'azote est l'ÉLÉMENT, le diazote est l'espèce
 *  chimique, et c'est le compte des espèces qui décide ici. Le fichier écrivait
 *  « azote liquide » ici et « diazote » en `t08`, sur la même substance. */
const CLASSEMENT_PHARMACIE = classement({
  "dioxygène de la bouteille médicale": 'corps-pur',
  'diazote liquide du bidon': 'corps-pur',
  "eau oxygénée du flacon": 'melange',
  "alcool à friction": 'melange',
});

/** Le contrôle à faire AVANT de croire « limpide donc pur ». Objet formel, donc
 *  correction rejouable : un choix parmi des contrôles nommés, pas une phrase. */
const CONTROLE_DU_LIMPIDE = Object.freeze({
  question: 'quel-controle-avant-de-conclure',
  choisi: 'suivre-la-temperature-pendant-tout-le-changement-d-etat',
  ecartes: Object.freeze([
    'regarder-de-plus-pres-a-la-loupe',
    'sentir-l-odeur',
    'verser-dans-un-verre-plus-large',
  ]),
});

/** Le dispositif qui TRANCHE, parmi trois décrits. Le contrôle des variables au
 *  sens du cercle 2 : ce n'est pas la mesure qui décide, c'est ce qu'elle sépare. */
const DISPOSITIF_QUI_TRANCHE = Object.freeze({
  question: 'lequel-permet-de-conclure',
  choisi: 'suivi-de-temperature-pendant-tout-le-changement-d-etat',
  ecartes: Object.freeze([
    'mesure-de-masse-volumique-comparee-a-l-eau',
    'observation-a-la-loupe',
  ]),
  pourquoi: 'un-melange-n-a-pas-de-palier',
});

/** La permutation des trois étapes du test. Objet formel de plein droit —
 *  `charte.md` range « ordonner » en classe B, et « ordonner les étapes d'un
 *  test » dans le cercle 3, le geste instrumental FIGURÉ. */
const ORDRE_DU_TEST = Object.freeze({
  question: 'ordonner-les-etapes',
  ordre: Object.freeze([
    'refroidir-le-liquide-lentement',
    'relever-la-temperature-pendant-tout-le-changement-d-etat',
    'conclure-selon-que-la-temperature-est-restee-constante-ou-non',
  ]),
});

/** Les quatre reconnaissances de palier 4. L'objet formel porte la NATURE et
 *  l'inventaire des espèces : la réponse n'est pas un mot, c'est un compte. */
const RECONNAISSANCE_SUCRE_REMUE = Object.freeze({
  question: 'de-quoi-s-agit-il',
  nature: 'melange',
  transformation: 'dissolution',
  especes: Object.freeze(['eau', 'saccharose']),
});

const RECONNAISSANCE_TRACE_BLANCHE = Object.freeze({
  question: 'de-quoi-s-agit-il',
  nature: 'melange',
  transformation: 'evaporation',
  especes: Object.freeze(['eau', 'sels dissous']),
});

const RECONNAISSANCE_BOUTEILLE_DE_DIAZOTE = Object.freeze({
  question: 'de-quoi-s-agit-il',
  nature: 'corps-pur',
  transformation: 'aucune',
  especes: Object.freeze(['diazote']),
});

const RECONNAISSANCE_BEURRE_FONDU = Object.freeze({
  question: 'de-quoi-s-agit-il',
  nature: 'melange',
  transformation: 'fusion-puis-solidification',
  especes: Object.freeze(['matières grasses', 'eau', 'protéines du lait']),
});

// ── Les descriptions particulaires ────────────────────────────────────────
//
// Le rayon d'un atome est dérivé de son seul symbole par `schema.js` : deux
// grilles du même fichier ne peuvent pas dessiner le même élément à deux tailles.

const GRILLE_DIOXYGENE_GAZ = Object.freeze({
  etat: 'gaz',
  graine: 11,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'dioxygène',
      formule: 'O₂',
      nombre: 12,
      atomes: Object.freeze([{ element: 'O' }, { element: 'O' }]),
    }),
  ]),
});

const GRILLE_EAU_GAZEUSE = Object.freeze({
  etat: 'liquide',
  graine: 23,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'eau',
      formule: 'H₂O',
      nombre: 10,
      atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }]),
    }),
    Object.freeze({
      nom: 'dioxyde de carbone',
      formule: 'CO₂',
      nombre: 3,
      atomes: Object.freeze([{ element: 'C' }, { element: 'O', nombre: 2 }]),
    }),
  ]),
});

const GRILLE_FER_SOLIDE = Object.freeze({
  etat: 'solide',
  graine: 37,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'fer',
      formule: 'Fe',
      nombre: 16,
      atomes: Object.freeze([{ element: 'Fe' }]),
    }),
  ]),
});

// ── Les jeux de mesures ───────────────────────────────────────────────────
//
// Le tableau et le graphique sont ENGENDRÉS par ces objets, et la chaîne de
// calcul de l'item lit les mêmes nombres. Sur `p05`, la tolérance n'est pas
// saisie : `schema.js` la calcule, une demi-graduation de l'axe des ordonnées.

const REFROIDISSEMENT_AVEC_PALIER = Object.freeze({
  titre: "Température d'un liquide refroidi, relevée toutes les deux minutes",
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 2 }),
  y: Object.freeze({ titre: 'Température (°C)', min: -10, max: 30, pas: 5 }),
  points: Object.freeze([[0, 22], [2, 12], [4, 2], [6, 0], [8, 0], [10, 0], [12, -6]].map(Object.freeze)),
});

const EBULLITION_SANS_PALIER = Object.freeze({
  titre: "Température d'un liquide chauffé, relevée toutes les trois minutes",
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 18, pas: 3 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 0, max: 120, pas: 20 }),
  points: Object.freeze([[0, 20], [3, 55], [6, 90], [9, 102], [12, 106], [15, 110], [18, 112]].map(Object.freeze)),
});

const CHAUFFAGE_AVEC_PALIER = Object.freeze({
  titre: "Température d'un liquide chauffé, relevée en continu",
  x: Object.freeze({ titre: 'Temps (min)', min: 0, max: 12, pas: 2 }),
  y: Object.freeze({ titre: 'Température (°C)', min: 0, max: 100, pas: 10 }),
  points: Object.freeze([[0, 20], [2, 30], [4, 52], [6, 78], [8, 78], [10, 78], [12, 78]].map(Object.freeze)),
  relie: true,
});

// ════════════════════════════════════════════════════════════════════════════
// La découverte, le cours, la méthode — hors schéma d'item
// ════════════════════════════════════════════════════════════════════════════

/**
 * La découverte. Elle ne DIT pas la définition : elle fait rater une prédiction.
 *
 * La forme est celle des `constats` du catalogue — prédiction verrouillée, puis
 * résultat, puis conflit — parce que c'est la seule forme dont `didactique.md`
 * § 2.1 dise qu'elle déplace quelque chose. Le résultat est DÉTERMINÉ : il ne
 * dépend pas de la performance de l'élève, donc le dispositif ne peut pas tomber
 * à plat.
 */
export const DECOUVERTE = Object.freeze({
  titre: 'Trois liquides limpides',
  texte:
    'Trois verres, trois liquides parfaitement transparents et incolores : de '
    + "l'eau distillée, de l'eau salée, de l'eau sucrée. Rien à l'œil ne les "
    + 'sépare. On les refroidit tous les trois de la même façon et on relève la '
    + 'température pendant toute la solidification.',
  predictionEngagee:
    'Verrouille ta prédiction avant de voir les courbes : combien de ces trois '
    + 'liquides vont geler à température constante ? (les trois / deux / un seul / aucun)',
  resultat:
    "Un seul. L'eau distillée reste à la même température pendant toute sa "
    + 'solidification ; les deux autres voient leur température baisser sans arrêt '
    + 'pendant qu’elles gèlent.',
  conflit:
    "Les trois se ressemblaient, et un seul s'est comporté comme un corps pur. "
    + "Ce qui les sépare n'est donc pas ce qu'on voit : c'est le nombre d'espèces "
    + 'chimiques présentes, et il se lit sur un thermomètre, pas à l’œil.',
  // Le piège CONFRONTÉ, et non celui que le savoir-faire porte au catalogue.
  // Ce dispositif ne met en défaut aucune stratégie d'étiquetage : il met en
  // défaut « ce qui est limpide est pur », c'est-à-dire l'idée que ce qu'on ne
  // voit plus ne compte plus. Citer `serie-etiquetee-par-le-chapitre` ici — ce
  // que faisait la première rédaction — annonçait une réfutation que le
  // résultat ne produit pas.
  citeLePiege: 'matiere-disparait-quand-on-ne-la-voit-plus',
});

/**
 * Le cours. Trois blocs, et pas un de plus.
 *
 * La règle du piège n'est pas recopiée ici : elle est écrite une fois, dans
 * `js/data/pieges/contrat.js`, et `renvoiRegle` la cite. Deux proses égales par
 * copie divergent au premier auteur qui corrige l'une des deux.
 */
export const COURS = Object.freeze([
  Object.freeze({
    type: 'definition',
    titre: 'Corps pur et mélange',
    texte:
      "Un **corps pur** ne contient **qu'une seule espèce chimique**. Un "
      + '**mélange** en contient **au moins deux**.\n'
      + "C'est un COMPTE, pas une apparence : la question à se poser n'est jamais "
      + '« est-ce que ça a l’air propre ? », c’est **« combien d’espèces '
      + 'chimiques différentes y a-t-il là-dedans ? »**',
  }),
  Object.freeze({
    type: 'propriete',
    titre: 'Ce qui ne décide pas',
    texte:
      "**Être limpide ne décide pas.** L'eau salée est parfaitement transparente "
      + 'et contient deux espèces chimiques : c’est un mélange.\n'
      + "**L'état ne décide pas.** L'air est un mélange gazeux, le diamant est un "
      + 'corps pur solide, l’eau distillée est un corps pur liquide.\n'
      + '**Le mot « pur » de l’étiquette ne décide pas.** Sur un emballage, « pur » '
      + 'veut dire *sans ajout* ; en chimie, il veut dire *une seule espèce*. Une '
      + 'eau de source « pure » contient des sels dissous : c’est un mélange.',
  }),
  Object.freeze({
    type: 'exemple',
    titre: 'Le test qui tranche',
    texte:
      'Pendant un changement d’état, **un corps pur garde une température '
      + 'constante** : la courbe fait un **palier**. Un mélange, non : sa '
      + 'température continue de varier pendant qu’il fond, gèle ou bout.\n'
      + 'Ce test est vu en détail au savoir-faire suivant ; ici, il sert de preuve.',
  }),
]);

/**
 * La méthode. Trois gestes, dans l'ordre, et le troisième est le contrôle.
 *
 * Le contrôle n'est pas réécrit : c'est celui du piège, cité par son
 * identifiant. Le geste propre à ce savoir-faire est le deuxième — compter au
 * lieu de regarder.
 */
export const METHODE = Object.freeze({
  titre: 'Corps pur ou mélange : trois gestes',
  etapes: Object.freeze([
    Object.freeze({
      geste: 'Lis ce qu’on te décrit, pas ce qu’on te montre.',
      detail:
        'Souligne dans l’énoncé tout ce qui a été **mis dedans** : ce qu’on a '
        + 'versé, dissous, ajouté, ce que l’étiquette annonce. Ce qui a été mis '
        + 'dedans y est encore, même si tu ne le vois plus.',
    }),
    Object.freeze({
      geste: 'Compte les espèces chimiques.',
      detail:
        'Une seule → corps pur. Deux ou plus → mélange. Ne compte pas les '
        + 'états, ni les couleurs, ni les récipients.',
    }),
    Object.freeze({
      geste: 'Contrôle : ta réponse tiendrait-elle sans le titre ?',
      detail:
        'Si ta seule raison est « on est dans le chapitre des mélanges », tu n’as '
        + 'pas encore de raison. Montre le mot de l’énoncé sur lequel ta réponse '
        + 's’appuie.',
    }),
  ]),
  renvoiControle: 'serie-etiquetee-par-le-chapitre',
});

// ════════════════════════════════════════════════════════════════════════════
// Les items
// ════════════════════════════════════════════════════════════════════════════

const SF = 'ch01-sf1-distinguer-corps-pur-et-melange';
const CH01 = 'ch01-melanges-et-solubilite';

export default Object.freeze([

  // ══════════════════════════════════════════════════════════════════════════
  // ENTRAÎNEMENT — 10 items
  // ══════════════════════════════════════════════════════════════════════════

  // ── e01 · palier 1 · le classement canonique ─────────────────────────────
  //
  // Le décor du cours, et les quatre étiquettes choisies pour que les trois
  // indices concurrents tombent en même temps : l'eau salée est limpide, l'air
  // est un gaz, le fer est un solide dur.
  {
    id: 'ch01-sf1-e01-quatre-flacons-de-la-paillasse',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'quatre-flacons-de-la-paillasse',
    enonce:
      'Sur la paillasse : un flacon d’eau distillée, un flacon d’eau salée, un '
      + 'clou de fer neuf, un ballon de baudruche gonflé à l’air. Range chacun des '
      + 'quatre dans la colonne « corps pur » ou dans la colonne « mélange ».',
    reponse: { objetFormel: CLASSEMENT_PAILLASSE },
    distracteurs: [
      {
        id: 'eau-salee-rangee-en-corps-pur',
        texte: "L'eau salée en « corps pur » : le sel ne se voit plus, il n'est plus là.",
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'air-range-en-corps-pur',
        texte: "L'air en « corps pur » : il n'y a rien dedans, c'est du vide.",
        piege: 'gaz-n-est-pas-de-la-matiere',
      },
    ],
    rituelDeControle: false,
  },

  // ── e02 · palier 1 · le rituel du contrôle ───────────────────────────────
  //
  // Pas un automatisme de calcul : le GESTE DE CONTRÔLE, qui est ce qui manque
  // au diagnostic. « Limpide donc pur » est la conclusion la plus rapide et la
  // plus fausse du chapitre ; l'item ne la corrige pas, il demande ce qu'on fait
  // AVANT d'y arriver. Exclu de la fenêtre des cinq séances par le moteur.
  {
    id: 'ch01-sf1-e02-limpide-donc-pur',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'un-camarade-affirme-que-c-est-pur',
    enonce:
      'Un camarade te montre un liquide transparent et incolore et te dit : « on '
      + 'voit à travers, donc c’est un corps pur ». Avant de le croire ou de le '
      + 'contredire, quel contrôle faut-il faire ? Choisis-en un seul.',
    reponse: { objetFormel: CONTROLE_DU_LIMPIDE },
    distracteurs: [
      {
        id: 'regarder-mieux',
        texte: 'Regarder de plus près, à la loupe : si on ne voit rien d’autre, c’est pur.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
    rituelDeControle: true,
  },

  // ── e03 · palier 1 · la preuve chiffrée, en une soustraction ─────────────
  //
  // Classe A : la chaîne est rejouée en rationnels exacts, avec dimensions. Le
  // verdict de dimension se rend AVANT celui de valeur — un élève qui écrit
  // « 6 » sans unité reçoit REPONSE_INCOMPLETE, pas « faux ».
  {
    id: 'ch01-sf1-e03-ebullition-qui-ne-tient-pas',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'ballon-a-fond-rond-sur-chauffe-ballon',
    enonce:
      'On chauffe un liquide limpide. L’ébullition commence quand le thermomètre '
      + 'indique {{donnee:tDebut}} ; quand le dernier liquide disparaît, il indique '
      + '{{donnee:tFin}}. De combien la température a-t-elle varié pendant toute '
      + 'l’ébullition ? Donne l’écart avec son unité.',
    donnees: {
      tDebut: { valeur: [78, 1], unite: '°C' },
      tFin: { valeur: [84, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@tFin - @tDebut', unite: '°C' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [6, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── e04 · palier 2 · même piège, autre décor ─────────────────────────────
  //
  // La dimension variée est `objet-support` : on quitte la paillasse pour le
  // placard de cuisine. Les quatre étiquettes font un carré : un solide pur, un
  // solide mélangé, un liquide pur, un liquide mélangé. L'état ne prédit donc
  // rien, et c'est le seul point de l'item — ce qui exige que la stratégie de
  // l'état SE TROMPE, deux fois sur quatre, et non qu'elle tombe juste.
  //
  // Le distracteur ne relève pas de `frontiere-physique-chimique` : ce piège
  // porte sur le classement d'une TRANSFORMATION, et il n'y a ici aucune
  // transformation. Sa règle et son contrôle — « retrouve-t-on les mêmes
  // molécules à la fin ? » — n'ont rien à réfuter. Ce que l'élève fait ici,
  // c'est réciter un critère et en appliquer un autre : c'est le contrôle de
  // `reponse-conforme-sans-adhesion` qui mord, et lui seul (« fais tourner ta
  // propre phrase sur la situation avant de répondre »).
  {
    id: 'ch01-sf1-e04-le-placard-de-cuisine',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'placard-de-cuisine',
    enonce:
      'Dans un placard de cuisine : du sucre en poudre, qui ne contient que du '
      + 'saccharose ; un paquet de farine, faite d’amidon, de protéines et d’eau ; '
      + 'une bouteille d’huile de tournesol, qui contient plusieurs corps gras '
      + 'différents ; et la bouteille d’eau déminéralisée du fer à repasser, qui ne '
      + 'contient que de l’eau. Range les quatre en « corps pur » ou « mélange ».',
    reponse: { objetFormel: CLASSEMENT_CUISINE },
    distracteurs: [
      {
        id: 'les-poudres-sont-pures',
        texte:
          'Les deux poudres en « corps pur » et les deux liquides en « mélange » : '
          + 'une poudre, c’est une seule matière ; un liquide, ça se mélange.',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
  },

  // ── e05 · palier 2 · le tableau de mesures, engendré ─────────────────────
  //
  // La dimension variée est `grandeur-en-jeu` : on ne classe plus, on mesure une
  // durée. Le tableau est ENGENDRÉ par `REFROIDISSEMENT_AVEC_PALIER` et la chaîne
  // de calcul lit les mêmes nombres — aucun fichier image nulle part.
  {
    id: 'ch01-sf1-e05-duree-du-palier-de-solidification',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'liquide-refroidi-au-congelateur',
    figure: { sorte: 'tableau', donnees: REFROIDISSEMENT_AVEC_PALIER },
    enonce:
      'Voici la température d’un liquide qu’on refroidit, relevée toutes les deux '
      + 'minutes. La solidification occupe toute la durée où la température ne '
      + 'bouge plus : elle commence à la minute {{donnee:debutPalier}} et finit à la '
      + 'minute {{donnee:finPalier}}. Combien de temps dure-t-elle ? Donne la durée '
      + 'avec son unité.',
    donnees: {
      debutPalier: { valeur: [6, 1], unite: 'min' },
      finPalier: { valeur: [10, 1], unite: 'min' },
    },
    calcul: {
      etapes: [{ id: 'duree', expr: '@finPalier - @debutPalier', unite: 'min' }],
      reponse: 'duree',
    },
    reponse: { valeur: [4, 1], unite: 'min', semantique: 'exacte' },
  },

  // ── e06 · palier 3 · le registre submicroscopique ────────────────────────
  //
  // Johnstone : la difficulté propre de la chimie tient au passage d'un niveau à
  // l'autre. La grille est composée par l'élève, et c'est le MÊME objet formel
  // qui la dessine et qui la corrige — identité de référence, pas égalité champ
  // à champ. Palier 3 et non 2 : ce qui change ici n'est pas le décor, c'est le
  // niveau auquel la question est posée — et composer une grille n'est pas
  // cocher une case.
  {
    id: 'ch01-sf1-e06-douze-molecules-identiques',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf1-distinguer-un-atome-d-une-molecule'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 3,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'bouteille-de-dioxygene-du-laboratoire',
    figure: { sorte: 'particulaire', description: GRILLE_DIOXYGENE_GAZ },
    enonce:
      'Une bouteille de laboratoire ne contient que du dioxygène. Compose la '
      + 'grille qui représente ce gaz : douze molécules, toutes identiques, faites '
      + 'chacune de deux atomes d’oxygène.',
    reponse: { objetFormel: GRILLE_DIOXYGENE_GAZ },
  },

  // ── e07 · palier 3 · le registre symbolique, et la classe A′ ─────────────
  //
  // Un fait n'est pas un théorème, mais il se rejoue : la requête est déclarée et
  // le contrôle la joue sur la table sourcée. Le mode de réponse change — on
  // écrit un symbole au lieu de choisir une case.
  {
    id: 'ch01-sf1-e07-symbole-de-l-element-du-dioxygene',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf2-associer-un-symbole-a-un-element'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 0,
    palier: 3,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'etiquette-de-bouteille-de-gaz',
    enonce:
      'Le dioxygène est un corps pur : toutes ses molécules sont identiques et '
      + 'faites du même élément chimique. Écris le symbole de cet élément, puis '
      + 'coche « sans unité ».',
    requete: { table: 'symboles-des-elements', cle: 'oxygene', colonne: 'symbole' },
    reponse: { valeur: 'O', unite: SANS_UNITE, semantique: 'exacte' },
  },

  // ── e08 · palier 3 · le double QCM, et le mot « pur » de l'étiquette ─────
  //
  // Le format différenciant, et le seul sans garantie mécanique : compté,
  // plafonné, relu, scellé. Quatre justifications, dont TROIS fausses — le
  // compte annoncé ici en disait quatre —, et les trois viennent de trois
  // conceptions distinctes : ce qu'on ne voit plus n'y est plus, « naturel donc
  // sans rien de chimique », et la phrase du cours récitée à contretemps.
  //
  // La deuxième a dû être réécrite. Elle disait « pure est écrit sur la
  // bouteille, donc c'est un corps pur » sous le piège
  // `frontiere-physique-chimique` — dont la règle ne parle que du mot
  // « chimique » et dont le contrôle demande si les molécules sont les mêmes à
  // la fin. Sur une bouteille qu'on n'a pas transformée, ni l'une ni l'autre
  // n'avait quoi que ce soit à réfuter. Le texte convoque désormais le mot que
  // le piège possède, et la règle mord dessus : « l'eau de pluie est un produit
  // chimique ».
  {
    id: 'ch01-sf1-e08-eau-pure-de-source',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'bouteille-d-eau-minerale-du-commerce',
    enonce:
      'Une bouteille d’eau minérale porte la mention « eau pure de source ». Au '
      + 'dos, l’étiquette liste du calcium, du magnésium et des bicarbonates '
      + 'dissous. Le liquide de la bouteille est-il un corps pur ? Puis choisis la '
      + 'phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non',
      choixPossibles: ['oui', 'non', 'on-ne-peut-pas-savoir'],
    },
    justifications: [
      {
        id: 'l-etiquette-liste-des-sels',
        texte:
          "L'étiquette annonce elle-même des sels dissous : il y a donc plusieurs "
          + 'espèces chimiques dans la bouteille.',
        juste: true,
        provenance: 'institutionnelle',
        source: "Éduscol, ressource d'accompagnement du cycle 4, juin 2016",
      },
      {
        id: 'limpide-donc-rien-dedans',
        texte: 'Elle est limpide et incolore : on ne voit rien d’autre que de l’eau.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Prieto et al. 1989, « le soluté disparaît à la dissolution » — énoncé-élève '
          + 'rapporté dans didactique.md § 3.1',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'c-est-ecrit-pur',
        texte:
          'C’est une eau naturelle, sortie d’une source : on n’y a rien ajouté de '
          + 'chimique, donc c’est un corps pur.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          "Barker 2000 § 5, « chimique veut dire artificiel » — sens courant du mot, "
          + 'rapporté dans didactique.md § 3.6',
        piege: 'frontiere-physique-chimique',
      },
      {
        id: 'l-eau-est-un-corps-pur',
        texte:
          "L'eau est un corps pur, on l'a écrit dans le cours : donc l'eau de cette "
          + 'bouteille est un corps pur.',
        juste: false,
        // Conforme, récitée, et fausse ici : la phrase du cours parle de l'eau,
        // pas du contenu de la bouteille. C'est le cas que le double QCM existe
        // pour séparer de la compréhension.
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: 'e664d8f3acb46705',
    },
  },

  // ── e09 · palier 4 · le piège, servi au chapitre des combustions ─────────
  //
  // La condition de validité EXIGE que la bonne réponse ne soit pas celle du
  // chapitre en cours : servi au chapitre 6, cet item de chapitre 1 la satisfait,
  // et l'élève qui répond « transformation chimique » répond au titre.
  {
    id: 'ch01-sf1-e09-sucre-remue-au-chapitre-des-combustions',
    sfPrincipal: SF,
    sfSollicites: ['ch06-sf2-distinguer-transformation-chimique-physique-et-melange'],
    chapitre: 'ch06-transformations-chimiques',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'sucre-remue-dans-un-verre-d-eau-tiede',
    enonce:
      'Cette série ne porte aucun titre et ses questions viennent de plusieurs '
      + 'chapitres. Celle-ci : on remue du sucre en poudre dans un verre d’eau '
      + 'tiède jusqu’à ce qu’on ne le voie plus. De quoi s’agit-il, et que contient '
      + 'le verre à la fin ?',
    reponse: { objetFormel: RECONNAISSANCE_SUCRE_REMUE },
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch06-transformations-chimiques',
      chapitreReel: CH01,
      serieMelangee: true,
    },
    dispositifServi: 'la-page-qui-ne-tient-pas-sa-promesse',
    distracteurs: [
      {
        id: 'une-combustion',
        texte: 'Une combustion.',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'une-transformation-chimique',
        texte: 'Une transformation chimique : le sucre a disparu, donc il a réagi avec l’eau.',
        piege: 'frontiere-physique-chimique',
      },
      {
        id: 'un-corps-pur-a-la-fin',
        texte: 'À la fin, le verre ne contient plus qu’un seul liquide : c’est un corps pur.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
  },

  // ── e10 · palier 4 · quel dispositif TRANCHE ─────────────────────────────
  //
  // Cercle 2 — le contrôle des variables. La question n'est pas « comment
  // mesure-t-on », c'est « laquelle de ces mesures SÉPARE les deux cas ». Une
  // masse volumique ne sépare rien : un mélange peut avoir celle de l'eau.
  //
  // ⚠ Servi au chapitre 4, et pas au chapitre 1. L'item demande de JUGER un
  // protocole de masse volumique, et rien dans l'énoncé ne dit ce qu'est une
  // masse volumique : un élève du chapitre 1 ne l'a jamais rencontrée, et
  // `sfSollicites` déclare la dépendance sans la résoudre — aucun module ne le
  // lit. Le palier 4 est le palier « mélangé, servi plus tard » : c'est
  // exactement sa place.
  //
  // Le distracteur ne relève pas de `confusion-masse-et-masse-volumique` :
  // l'élève qui écrit ça ne confond pas les deux grandeurs, il s'en sert
  // correctement et croit seulement qu'une mesure identifie une matière. La
  // règle de ce piège-là — « une masse ne peut pas répondre à une question qui
  // demande une masse volumique » — n'a rien à lui dire. C'est le contrôle de
  // `donnees-superflues-et-questions-sans-reponse` qui mord : écris ce qu'on
  // demande, puis ce qu'il faut pour l'obtenir, et si une ligne reste vide,
  // c'est qu'on ne peut pas conclure.
  {
    id: 'ch01-sf1-e10-lequel-des-trois-dispositifs-tranche',
    sfPrincipal: SF,
    sfSollicites: ['ch04-sf2-calculer-une-masse-volumique'],
    chapitre: 'ch04-masse-volumique',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'trois-protocoles-proposes-par-des-eleves',
    enonce:
      'Trois élèves proposent chacun un moyen de savoir si un liquide limpide est '
      + 'un corps pur : mesurer sa masse volumique et la comparer à celle de l’eau ; '
      + 'l’observer à la loupe ; suivre sa température pendant tout son changement '
      + 'd’état. Lequel des trois permet de conclure à coup sûr ?',
    reponse: { objetFormel: DISPOSITIF_QUI_TRANCHE },
    distracteurs: [
      {
        id: 'la-masse-volumique-suffit',
        texte: 'La masse volumique : si elle vaut celle de l’eau, c’est de l’eau pure.',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
      {
        id: 'la-loupe-suffit',
        texte: 'La loupe : si on ne voit aucune particule, il n’y a rien d’autre.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PROBLÈMES — 5 items
  // ══════════════════════════════════════════════════════════════════════════

  // ── p01 · palier 4 · LE FORMAT DIAGNOSTIQUE ──────────────────────────────
  //
  // Le format que le piège déclare canonique : série mélangée non étiquetée, dont
  // la première question est « de quoi s'agit-il ? » AVANT toute question de
  // valeur. Le drapeau porte son motif écrit — aucun programme ne sait comparer
  // un item à la prose d'un `formatDiagnostique`, seul un auteur le peut.
  //
  // ⚠ Deux corrections de fond. `sfSollicites` déclarait
  // `ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite` : cet item
  // n'exploite aucune série et n'estime aucune solubilité, et déclarer un
  // savoir-faire qu'un item ne mobilise pas est un renseignement faux donné au
  // suivi. Et l'item porte le piège de la série non étiquetée SANS proposer la
  // réponse que le chapitre en cours pousse — le chapitre 5 est celui des
  // atomes et des molécules, et « l'eau s'est décomposée en atomes » est ce que
  // la stratégie d'étiquetage produit ici. C'est ce distracteur-là que le piège
  // attend ; il manquait.
  {
    id: 'ch01-sf1-p01-trace-blanche-au-chapitre-des-molecules',
    sfPrincipal: SF,
    chapitre: 'ch05-atomes-molecules',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'verre-d-eau-du-robinet-oublie-sur-un-radiateur',
    enonce:
      'Aucun titre au-dessus de cette série, et ses questions ne viennent pas '
      + 'toutes du même chapitre. Celle-ci : un verre d’eau du robinet a été oublié '
      + 'sur un radiateur ; au bout de trois jours il est vide, et il reste au fond '
      + 'une trace blanche. Première question, avant toute autre : de quoi s’agit-il, '
      + 'et l’eau du robinet était-elle un corps pur ?',
    reponse: { objetFormel: RECONNAISSANCE_TRACE_BLANCHE },
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch05-atomes-molecules',
      chapitreReel: CH01,
      serieMelangee: true,
    },
    dispositifServi: 'la-question-de-brevet-sans-etiquette',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Série mélangée servie SANS titre de chapitre, sans encadré de rappel et sans '
      + 'loi nommée, et dont la première question posée est « de quoi s’agit-il ? » '
      + 'avant toute question de valeur — le mode de réponse que le piège déclare '
      + 'canonique. Le contexte imposé est respecté aussi : la série d’où vient cet '
      + 'item porte des questions d’au moins deux chapitres, dont le chapitre 5 en '
      + 'cours, ce qui rend perdante la stratégie d’évitement symétrique (« série '
      + 'mélangée, donc jamais le chapitre du moment »).',
    distracteurs: [
      {
        id: 'les-molecules-d-eau-se-sont-cassees',
        texte:
          'Les molécules d’eau se sont cassées en atomes, et la trace blanche est '
          + 'faite de ces atomes-là.',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'un-changement-d-etat-donc-un-corps-pur',
        texte: 'L’eau s’est évaporée : c’est un changement d’état, donc c’était un corps pur.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'la-trace-s-est-formee',
        texte: 'La trace blanche s’est fabriquée en séchant : l’eau s’est transformée en solide.',
        piege: 'frontiere-physique-chimique',
      },
    ],
  },

  // ── p02 · palier 4 · la prédiction engagée ───────────────────────────────
  //
  // La valeur prédite est saisie et VERROUILLÉE avant l'affichage : sans
  // engagement préalable, il n'y a pas de conflit, juste une information de plus.
  // Le point visé n'est pas la conservation pour elle-même — c'est qu'une masse
  // inchangée prouve que le sucre est encore là, donc que le verre contient deux
  // espèces chimiques.
  {
    id: 'ch01-sf1-p02-la-balance-apres-la-dissolution',
    sfPrincipal: SF,
    sfSollicites: ['ch06-sf6-conservation-de-la-masse'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'verre-et-morceau-de-sucre-sur-une-balance',
    enonce:
      'Sur le plateau de la balance, un verre d’eau et rien d’autre : elle affiche '
      + '{{donnee:masseVerre}}. Posé sur la table, à côté de la balance, un morceau '
      + 'de sucre pesé à part : {{donnee:masseSucre}}. On verse le sucre dans le '
      + 'verre, qui ne quitte pas le plateau, et on remue jusqu’à ce qu’il ne se '
      + 'voie plus, sans rien renverser. Écris ce que la balance affichera alors, '
      + 'avec son unité. Ta prédiction sera verrouillée avant le résultat.',
    donnees: {
      masseVerre: { valeur: [320, 1], unite: 'g' },
      masseSucre: { valeur: [6, 1], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'total', expr: '@masseVerre + @masseSucre', unite: 'g' }],
      reponse: 'total',
    },
    reponse: { valeur: [326, 1], unite: 'g', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'le-sucre-ne-pese-plus',
        valeur: [320, 1],
        unite: 'g',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        modeleErrone: {
          id: 'ce-qu-on-ne-voit-plus-ne-pese-plus',
          nom:
            'modèle « le sucre dissous n’existe plus » : la balance ne retient que ce '
            + 'qui reste visible',
          calcul: {
            etapes: [{ id: 'x', expr: '@masseVerre × 1', unite: 'g' }],
            reponse: 'x',
          },
        },
      },
    ],
  },

  // ── p03 · palier 3 · le mélange, au niveau des molécules ─────────────────
  //
  // Le pendant de `e06` : deux espèces au lieu d'une, dans la même grille. C'est
  // le seul endroit du savoir-faire où « mélange » se voit sans être dit, et le
  // rayon de chaque atome est dérivé de son symbole — deux grilles du fichier ne
  // peuvent pas dessiner l'oxygène à deux tailles.
  {
    id: 'ch01-sf1-p03-l-eau-gazeuse-au-niveau-des-molecules',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf7-decrire-la-dissolution-d-un-gaz'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 3,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'bouteille-d-eau-gazeuse-fermee',
    figure: { sorte: 'particulaire', description: GRILLE_EAU_GAZEUSE },
    enonce:
      'Une eau gazeuse contient de l’eau et du dioxyde de carbone dissous. Compose '
      + 'la grille qui la représente à l’état liquide : dix molécules d’eau, faites '
      + 'chacune d’un atome d’oxygène et de deux atomes d’hydrogène, et trois '
      + 'molécules de dioxyde de carbone, faites chacune d’un atome de carbone et de '
      + 'deux atomes d’oxygène.',
    reponse: { objetFormel: GRILLE_EAU_GAZEUSE },
  },

  // ── p04 · palier 3 · critiquer une méthode, en double QCM ────────────────
  //
  // Cercle 2 encore, mais en double QCM : la réponse « non » est facile à cocher
  // au hasard, et c'est la justification qui sépare celui qui sait pourquoi de
  // celui qui a deviné. Classe C, relue et scellée.
  //
  // ⚠ Servi au chapitre 4, pour la même raison que `e10` : critiquer un
  // protocole de masse volumique suppose de savoir ce qu'est une masse
  // volumique, et le chapitre 1 ne l'a pas encore dite.
  //
  // Les quatre justifications portent quatre conceptions DISTINCTES, et deux
  // d'entre elles étaient mal rattachées. « Chaque liquide a la sienne » ne
  // confond pas masse et masse volumique — elle croit qu'une mesure identifie
  // une matière, et c'est le contrôle de
  // `donnees-superflues-et-questions-sans-reponse` qui la met en défaut. « Il
  // faut juste une balance plus précise » n'est pas un défaut de vraisemblance :
  // c'est croire qu'une masse volumique se LIT sur une balance, et là
  // `confusion-masse-et-masse-volumique` mord exactement — « une masse volumique
  // est un quotient, une masse divisée par un volume ».
  {
    id: 'ch01-sf1-p04-la-masse-volumique-suffit-elle',
    sfPrincipal: SF,
    sfSollicites: ['ch04-sf6-identifier-un-materiau-par-sa-masse-volumique'],
    chapitre: 'ch04-masse-volumique',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'protocole-propose-par-un-eleve-en-classe',
    enonce:
      'Pour savoir si un liquide limpide est de l’eau pure, un élève propose de '
      + 'mesurer sa masse volumique et de la comparer à celle de l’eau. Sa méthode '
      + 'permet-elle de conclure à coup sûr ? Puis choisis la phrase qui dit '
      + 'pourquoi.',
    reponse: {
      libre: false,
      choix: 'non',
      choixPossibles: ['oui', 'non', 'seulement-si-la-balance-est-precise'],
    },
    justifications: [
      {
        id: 'deux-liquides-peuvent-avoir-la-meme',
        texte:
          'Deux liquides différents peuvent avoir la même masse volumique : la mesure '
          + 'ne sépare pas les deux cas.',
        juste: true,
        provenance: 'institutionnelle',
        source: "Éduscol, ressource d'accompagnement du cycle 4, juin 2016",
      },
      {
        id: 'chaque-liquide-a-la-sienne',
        texte: 'Chaque liquide a sa masse volumique à lui : elle suffit toujours à l’identifier.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Barker 2000 § 1.4, la masse volumique traitée comme une étiquette d’identité — '
          + 'trou du corpus signalé dans didactique.md § 3.8',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
      {
        id: 'question-de-precision',
        texte:
          'Ça marche, il faut juste une balance assez précise : on lit la masse '
          + 'volumique dessus, au gramme près.',
        juste: false,
        provenance: 'locale',
        piege: 'confusion-masse-et-masse-volumique',
      },
      {
        id: 'la-masse-volumique-de-l-eau-est-connue',
        texte:
          'La masse volumique de l’eau est dans le tableau du cours, donc la comparaison '
          + 'donne toujours la réponse.',
        juste: false,
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: 'e7a3668bb4f00d98',
    },
  },

  // ── p05 · palier 3 · la lecture graphique, et sa tolérance CALCULÉE ──────
  //
  // La fenêtre n'est pas saisie par l'auteur : `schema.js` la dérive de l'axe —
  // une demi-graduation, donc cinq degrés ici. C'est le bénéfice collatéral de
  // l'engendrement des figures, et il tombe exactement là où la tolérance est un
  // contenu faillible. Le modèle erroné est EXÉCUTÉ et le contrôle vérifie qu'il
  // tombe hors de la fenêtre : l'élève qui lit la valeur finale au lieu de
  // l'écart ne peut pas être compté juste.
  {
    id: 'ch01-sf1-p05-de-combien-monte-t-elle',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'courbe-de-chauffage-relevee-en-continu',
    figure: { sorte: 'graphique', donnees: CHAUFFAGE_AVEC_PALIER },
    enonce:
      'Voici la température d’un liquide qu’on chauffe, relevée en continu. Lis la '
      + 'courbe : de combien la température monte-t-elle entre la deuxième et la '
      + 'sixième minute ? Donne l’écart avec son unité. (Tu remarqueras qu’ensuite '
      + 'elle ne bouge plus : c’est ce palier qui dira si le liquide est un corps '
      + 'pur.)',
    // `tDeuxiemeMinute`, et non `tTrenteDeuxiemeMinute` : la valeur est bien la
    // température lue à la DEUXIÈME minute, 30 °C. Le nom précédent se lisait
    // « trente-deuxième minute » — un instant qui n'existe sur aucun axe de ce
    // fichier — et rien ne l'aurait signalé, l'énoncé n'interpolant pas ces
    // deux données.
    donnees: {
      tDeuxiemeMinute: { valeur: [30, 1], unite: '°C' },
      tSixiemeMinute: { valeur: [78, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'montee', expr: '@tSixiemeMinute - @tDeuxiemeMinute', unite: '°C' }],
      reponse: 'montee',
    },
    reponse: { valeur: [48, 1], unite: '°C', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'lire-la-valeur-au-lieu-de-l-ecart',
        nom:
          'modèle « la question demande une température, je lis la température » : on '
          + 'rend l’ordonnée du second point au lieu de la différence',
        piege: 'donnees-superflues-et-questions-sans-reponse',
        calcul: {
          etapes: [{ id: 'x', expr: '@tSixiemeMinute × 1', unite: '°C' }],
          reponse: 'x',
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // AUTO-ÉVALUATION — 10 items
  //
  // Aucun item d'entraînement n'est repris, valeurs comprises : ni les mêmes
  // objets, ni les mêmes nombres, ni les mêmes contextes de surface. Un test qui
  // recopie l'entraînement se réussit de mémoire, et il mesure alors la mémoire.
  // ══════════════════════════════════════════════════════════════════════════

  // ── t01 · palier 1 · classer, quatre nouveaux objets ─────────────────────
  //
  // Le distracteur disait « rien d'autre n'a été ajouté dedans » sous
  // `frontiere-physique-chimique` : ce piège classe des TRANSFORMATIONS, et sa
  // règle comme son contrôle portent sur les molécules avant et après. Sur une
  // brique de lait qu'on n'a pas transformée, ils ne réfutent rien. La raison
  // qui produit vraiment l'erreur ici est celle du chapitre — un liquide
  // uniforme ne laisse voir qu'une seule chose —, et son contrôle est « cherche
  // une trace autre que la vue » : le lait est sucré au goût, et la crème monte.
  {
    id: 'ch01-sf1-t01-la-vitrine-et-le-frigo',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'vitrine-de-bijoutier-et-porte-de-frigo',
    enonce:
      'Quatre objets : un diamant, une brique de lait, le cuivre d’un fil '
      + 'électrique dénudé, une bouteille de vinaigre. Range les quatre en « corps '
      + 'pur » ou « mélange ».',
    reponse: { objetFormel: CLASSEMENT_VITRINE },
    distracteurs: [
      {
        id: 'le-lait-est-pur',
        texte:
          'Le lait en « corps pur » : c’est un seul liquide blanc, uniforme, on n’y '
          + 'distingue rien d’autre.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
  },

  // ── t02 · palier 1 · la soustraction, autres valeurs ─────────────────────
  //
  // ⚠ Les valeurs et le décor ont changé, parce que les précédents étaient
  // faux. L'item faisait bouillir l'eau de cuisson des pâtes à 103 °C puis
  // 108 °C : une eau salée à la cuisine bout à 100,2 °C environ, l'élévation y
  // est de deux dixièmes de degré et aucun thermomètre de classe ne la voit.
  // Cinq degrés d'écart demandent une saumure qu'on fait réduire jusqu'au bord
  // de la saturation — la saumure saturée bout à 108,7 °C —, et c'est ce que
  // l'énoncé décrit maintenant. La réponse, elle, ne bouge pas : 5 °C.
  {
    id: 'ch01-sf1-t02-l-eau-salee-qui-bout',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'casserole-de-saumure-qu-on-fait-reduire',
    enonce:
      'On fait réduire à gros bouillons une casserole d’eau très salée, sans jamais '
      + 'en rajouter. Le thermomètre indique {{donnee:tDebut}} quand l’ébullition '
      + 'commence et {{donnee:tFin}} un long moment plus tard, alors qu’elle bout '
      + 'toujours. De combien la température a-t-elle varié ? Donne l’écart avec '
      + 'son unité.',
    donnees: {
      tDebut: { valeur: [101, 1], unite: '°C' },
      tFin: { valeur: [106, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@tFin - @tDebut', unite: '°C' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [5, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── t03 · palier 2 · autre décor ─────────────────────────────────────────
  //
  // ⚠ Deux corrections. Le distracteur rangeait « les deux gaz » en mélange
  // alors qu'un seul des quatre contenants porte un gaz : le bidon d'azote est
  // LIQUIDE, c'est même tout son intérêt ici. Et la raison qu'il donnait — « un
  // gaz, c'est toujours plusieurs choses ensemble » — était rattachée à
  // `gaz-n-est-pas-de-la-matiere`, dont la règle et le contrôle ne parlent que
  // de MASSE : ils n'ont rien à dire à un élève qui accorde au gaz une pleine
  // existence et lui prête seulement plusieurs espèces. Les deux distracteurs
  // sont désormais chacun sous le piège que sa propre règle réfute.
  {
    id: 'ch01-sf1-t03-l-armoire-a-pharmacie',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'armoire-a-pharmacie-et-bidon-d-azote',
    enonce:
      'Quatre contenants : une bouteille médicale de dioxygène gazeux, un bidon de '
      + 'diazote liquide, un flacon d’eau oxygénée — de l’eau et du peroxyde '
      + 'd’hydrogène —, un flacon d’alcool à friction, qui est un mélange d’alcool '
      + 'et d’eau. Range les quatre en « corps pur » ou « mélange ».',
    reponse: { objetFormel: CLASSEMENT_PHARMACIE },
    distracteurs: [
      {
        id: 'les-liquides-transparents-sont-purs',
        texte:
          'L’eau oxygénée et l’alcool à friction en « corps pur » : ce sont deux '
          + 'liquides parfaitement transparents, on n’y voit qu’une seule chose.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'la-bouteille-de-gaz-ne-compte-pas',
        texte:
          'La bouteille de dioxygène : ni l’un ni l’autre, un gaz n’est pas vraiment '
          + 'de la matière — il n’y a rien à compter dedans.',
        piege: 'gaz-n-est-pas-de-la-matiere',
      },
    ],
  },

  // ── t04 · palier 2 · l'autre tableau : celui qui n'a pas de palier ───────
  //
  // ⚠ L'énoncé écrivait « il bout déjà à la minute {{donnee:debutEbullition}} »
  // avec, derrière l'interpolation, une TEMPÉRATURE de 102 °C : l'élève lisait
  // « à la minute 102 °C ». Les deux instants sont des données du tableau, pas
  // des inconnues ; ce sont les deux températures qu'il faut interpoler, et ce
  // sont elles qu'on soustrait. L'écart ne change pas : 10 °C.
  {
    id: 'ch01-sf1-t04-l-ebullition-qui-monte-toujours',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'liquide-chauffe-sur-plaque-electrique',
    figure: { sorte: 'tableau', donnees: EBULLITION_SANS_PALIER },
    enonce:
      'Voici la température d’un liquide qu’on chauffe, relevée toutes les trois '
      + 'minutes. Il bout déjà à la neuvième minute, où le thermomètre indique '
      + '{{donnee:tDebutEbullition}}, et il bout encore à la dix-huitième, où il '
      + 'indique {{donnee:tFinReleve}}. De combien sa température a-t-elle augmenté '
      + 'entre ces deux instants ? Donne l’écart avec son unité.',
    donnees: {
      tDebutEbullition: { valeur: [102, 1], unite: '°C' },
      tFinReleve: { valeur: [112, 1], unite: '°C' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@tFinReleve - @tDebutEbullition', unite: '°C' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [10, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── t05 · palier 3 · l'autre symbole ─────────────────────────────────────
  {
    id: 'ch01-sf1-t05-symbole-de-l-element-du-diamant',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf2-associer-un-symbole-a-un-element'],
    chapitre: CH01,
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 0,
    palier: 3,
    registre: 'symbolique',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'fiche-de-mineralogie',
    enonce:
      'Un diamant est un corps pur : il n’est fait que d’un seul élément chimique. '
      + 'Écris le symbole de cet élément, puis coche « sans unité ».',
    requete: { table: 'symboles-des-elements', cle: 'carbone', colonne: 'symbole' },
    reponse: { valeur: 'C', unite: SANS_UNITE, semantique: 'exacte' },
  },

  // ── t06 · palier 3 · la grille d'un métal ────────────────────────────────
  {
    id: 'ch01-sf1-t06-le-fer-au-niveau-des-atomes',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf1-distinguer-un-atome-d-une-molecule'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 3,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'barreau-de-fer-de-l-atelier',
    figure: { sorte: 'particulaire', description: GRILLE_FER_SOLIDE },
    enonce:
      'Un barreau de fer ne contient qu’une seule espèce chimique. Compose la '
      + 'grille qui le représente à l’état solide : seize particules identiques, '
      + 'faites chacune d’un seul atome de fer.',
    reponse: { objetFormel: GRILLE_FER_SOLIDE },
  },

  // ── t07 · palier 3 · le double QCM du test ───────────────────────────────
  //
  // Ni le contexte ni les justifications de `e08` : là c'était le mot « pur »
  // d'une étiquette, ici c'est le mot « naturel », et la justification juste
  // porte sur un compte, pas sur une étiquette.
  //
  // ⚠ Deux justifications tenaient `frontiere-physique-chimique` — le piège des
  // transformations — sur un jus qu'on ne transforme pas : sa règle et son
  // contrôle n'avaient rien à réfuter. La première convoque désormais le mot
  // que ce piège possède (« rien de chimique », « produit naturel »), et sa
  // règle mord dessus mot pour mot : « le mot chimique ne veut dire ni
  // artificiel, ni fabriqué, ni dangereux ». La seconde — « pur veut dire
  // propre » — passe sous `reponse-conforme-sans-adhesion`, dont le contrôle
  // est exactement le geste qui manque : faire tourner sa propre phrase de
  // cours sur la situation avant de répondre.
  {
    id: 'ch01-sf1-t07-le-jus-d-orange-sans-sucre-ajoute',
    sfPrincipal: SF,
    chapitre: CH01,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'brique-de-jus-d-orange-du-petit-dejeuner',
    enonce:
      'Une brique de jus d’orange annonce « pur jus, sans sucre ajouté, sans '
      + 'conservateur ». Le liquide qu’elle contient est-il un corps pur ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non',
      choixPossibles: ['oui', 'non', 'on-ne-peut-pas-savoir'],
    },
    justifications: [
      {
        id: 'de-l-eau-des-sucres-des-acides',
        texte:
          'Un jus d’orange contient de l’eau, des sucres, des acides et bien d’autres '
          + 'espèces chimiques : ça fait beaucoup plus qu’une.',
        juste: true,
        provenance: 'institutionnelle',
        source: "Éduscol, ressource d'accompagnement du cycle 4, juin 2016",
      },
      {
        id: 'rien-n-a-ete-ajoute',
        texte:
          'Il n’y a rien de chimique là-dedans : c’est du jus pressé, pas un produit '
          + 'fabriqué. Un produit naturel n’est pas un mélange.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          "Barker 2000 § 5, « chimique veut dire artificiel, ajouté » — sens courant du "
          + 'mot, rapporté dans didactique.md § 3.6',
        piege: 'frontiere-physique-chimique',
      },
      {
        id: 'c-est-un-seul-liquide',
        texte: 'C’est un seul liquide, d’une seule couleur : c’est donc un seul corps.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'Prieto et al. 1989, le soluté cesse d’être compté dès qu’il ne se voit plus — '
          + 'énoncé-élève rapporté dans didactique.md § 3.1',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'un-corps-pur-est-un-corps-propre',
        texte:
          'Un corps pur, c’est un corps qui n’est pas pollué. Ce jus est bon pour la '
          + 'santé, donc il est pur.',
        juste: false,
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: '1c8a9ff01efc650b',
    },
  },

  // ── t08 · palier 4 · le piège, servi au chapitre de l'air ────────────────
  //
  // Le chapitre en cours enseigne que l'air est un mélange, et la bonne réponse
  // est « corps pur » : la stratégie de l'élève donne le contraire de la bonne
  // réponse, ce qui est exactement ce que la troisième clause du prédicat exige.
  // Aucun `dispositifServi` : un item de test ne consomme pas de dispositif de
  // re-confrontation, sinon il refermerait le cycle de variation du piège.
  {
    id: 'ch01-sf1-t08-la-bouteille-de-diazote-au-chapitre-de-l-air',
    sfPrincipal: SF,
    sfSollicites: ['ch03-sf1-composition-de-l-air'],
    chapitre: 'ch03-air-et-composition',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'bouteille-de-diazote-du-laboratoire',
    enonce:
      'Rien n’indique de quel chapitre vient cette question. Une bouteille de '
      + 'laboratoire porte l’étiquette « diazote » et ne contient rien d’autre. Son '
      + 'contenu est-il un corps pur ou un mélange, et de quelles espèces chimiques '
      + 'est-il fait ?',
    reponse: { objetFormel: RECONNAISSANCE_BOUTEILLE_DE_DIAZOTE },
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch03-air-et-composition',
      chapitreReel: CH01,
      serieMelangee: true,
    },
    distracteurs: [
      {
        id: 'un-gaz-c-est-un-melange',
        texte: 'Un mélange : un gaz, c’est toujours plusieurs gaz ensemble, comme l’air.',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'du-diazote-et-du-dioxygene',
        texte: 'Un mélange de diazote et de dioxygène, dans les mêmes proportions que l’air.',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'ce-n-est-pas-de-la-matiere',
        texte: 'Ni l’un ni l’autre : la bouteille est vide, un gaz n’est pas vraiment de la matière.',
        piege: 'gaz-n-est-pas-de-la-matiere',
      },
    ],
  },

  // ── t09 · palier 4 · le piège, servi au chapitre des combustions ─────────
  //
  // Second item porteur du piège dans le test, et sur une autre surface que
  // `e09` : le beurre fondu n'est pas le sucre remué, et la fusion n'est pas la
  // dissolution. La règle de redescente en contexte neuf exige deux surfaces
  // différentes ; les voici.
  {
    id: 'ch01-sf1-t09-le-beurre-fondu-au-chapitre-des-combustions',
    sfPrincipal: SF,
    sfSollicites: ['ch06-sf2-distinguer-transformation-chimique-physique-et-melange'],
    chapitre: 'ch06-transformations-chimiques',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'noix-de-beurre-dans-une-casserole',
    enonce:
      'Cette série n’est pas étiquetée. Celle-ci : on chauffe doucement une noix '
      + 'de beurre dans une casserole ; elle devient liquide sur une plage de '
      + 'températures, sans jamais s’arrêter à une valeur fixe. On la laisse '
      + 'refroidir : elle redevient solide. De quoi s’agit-il, et le beurre est-il '
      + 'un corps pur ?',
    reponse: { objetFormel: RECONNAISSANCE_BEURRE_FONDU },
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: 'ch06-transformations-chimiques',
      chapitreReel: CH01,
      serieMelangee: true,
    },
    distracteurs: [
      {
        id: 'une-transformation-chimique',
        texte: 'Une transformation chimique : le beurre a changé d’aspect, donc il a changé de nature.',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'une-combustion-douce',
        texte: 'Une combustion douce : on l’a chauffé, donc il a brûlé un peu.',
        piege: 'frontiere-physique-chimique',
      },
      {
        id: 'corps-pur-puisqu-il-refond',
        texte: 'Un corps pur : il fond et il resolidifie, donc c’est toujours la même chose.',
        // ⚠ Ce distracteur était rattaché à `frontiere-physique-chimique`, dont
        // la règle DONNE RAISON à l'élève : « faire fondre de la cire ne change
        // aucune molécule — c'est physique », et le contrôle ajoute que si l'on
        // retrouve tout à la fin, c'est physique. Or l'élève dit vrai sur ce
        // point ; il en tire seulement une conclusion sur le NOMBRE d'espèces,
        // dont ce piège ne parle jamais. Un piège qui confirme la réponse fausse
        // ne discrimine rien. Le geste qui manque est de faire tourner sa propre
        // phrase de cours — un corps pur fond à température constante, et
        // l'énoncé dit que celle-ci ne s'arrête à aucune valeur fixe.
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
  },

  // ── t10 · palier 4 · le geste figuré, ordonné ────────────────────────────
  //
  // Le seul item de cercle 3 du savoir-faire. « Ordonner les étapes d'un test »
  // est du geste instrumental FIGURÉ : l'élève ne manipule rien, il met en ordre
  // un protocole décrit. L'application ne prétend pas remplacer le TP, et elle
  // l'écrit à l'élève.
  {
    id: 'ch01-sf1-t10-remets-le-test-dans-l-ordre',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH01,
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'trois-etiquettes-a-remettre-dans-l-ordre',
    enonce:
      'Voici les trois étapes du test qui dit si un liquide est un corps pur, '
      + 'données dans le désordre : conclure selon que la température est restée '
      + 'constante ou non ; refroidir le liquide lentement ; relever la température '
      + 'pendant tout le changement d’état. Remets-les dans l’ordre.',
    reponse: { objetFormel: ORDRE_DU_TEST },
    distracteurs: [
      {
        id: 'conclure-avant-de-relever',
        texte: 'Refroidir, conclure, puis relever la température pour vérifier.',
        piege: 'reponse-conforme-sans-adhesion',
      },
      {
        id: 'un-seul-releve',
        texte: 'Refroidir, relever la température une fois au début, conclure.',
        // ⚠ Pas `valeur-aberrante-d-une-serie-non-reperee` : ce piège porte sur
        // une mesure fautive au milieu d'une série, et son contrôle demande de
        // ranger les mesures et de comparer les écarts entre voisines. Ici il
        // n'y a pas de série du tout, et il n'a rien à ranger. Ce qui met
        // l'ordre en défaut, c'est le contrôle de
        // `donnees-superflues-et-questions-sans-reponse` : écris ce qu'on
        // demande — la température est-elle restée constante ? —, puis ce qu'il
        // faut pour l'obtenir ; un seul relevé laisse la ligne vide.
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
    ],
  },
].map(Object.freeze));
