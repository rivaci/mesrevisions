// Chapitre 1, savoir-faire 4 — Prévoir si deux liquides sont miscibles.
//
// Premier contenu écrit contre le moteur. Ce qui suit dit ce que le fichier
// contient, pourquoi il le contient sous cette forme-là, et — plus utile — ce
// qu’il ne couvre pas et pour quel motif.
//
// ── Le décompte, tel que le fichier est vraiment ──────────────────────────
//
//   découverte 1 · cours 7 blocs · méthode 1
//   entraînement 10 · problèmes 5 · auto-évaluation 10  →  `default` : 25 items
//
//   classes    A 12 · A_TABLE 1 · B 4 · C 8      (C = 8/25, sous le tiers)
//   cercles    0 : 11 · 1 : 14                   (aucun cercle 2, aucun cercle 3)
//   paliers    1 : 7 · 2 : 4 · 3 : 5 · 4 : 9
//   registres  macro 22 · submicro 3        (aucun item symbolique)
//   types      court 12 · lecture 4 · double-qcm 3 · prédiction engagée 3 ·
//              schéma particulaire 3
//   piège      2 items portent `serie-etiquetee-par-le-chapitre`, aux paliers 3
//              et 4, tous deux servis au chapitre 6
//
// ── Le problème que ce savoir-faire pose, et la façon dont il est réglé ───
//
// Il est qualitatif : « miscible ou non », « lequel surnage ». Or les classes de
// garantie mécanique — A, A′, B — demandent respectivement une chaîne de calcul,
// une requête tabulée et un objet formel. Écrire vingt-cinq QCM qualitatifs
// aurait donc produit vingt-cinq items de classe C, soit trois fois le plafond.
//
// La sortie n’est pas de contourner le plafond, elle est de **faire porter le
// raisonnement qualitatif par une grandeur qu’on peut recalculer** : le volume
// des couches. Prédire que la couche du dessus mesure 40 mL et non 60 exige
// d’avoir décidé (1) qu’il y a deux couches et (2) laquelle est en haut — les
// deux gestes du savoir-faire —, et le contrôle rejoue l’arithmétique. Les
// distracteurs valent alors diagnostic : « l’eau au-dessus » et « les deux se
// mélangent » sont deux modèles erronés EXÉCUTABLES qui rendent deux nombres
// différents, donc deux conceptions distinguables.
//
// **Aucune addition de volumes miscibles nulle part.** 50 mL d’eau et 50 mL
// d’alcool ne font pas 100 mL — la contraction est réelle et se voit à
// l’éprouvette. Toutes les additions et soustractions du fichier portent sur des
// couples NON miscibles, où l’additivité tient à la lecture près.
//
// ── L’alternance miscible / non miscible, qui n’est pas décorative ────────
//
// Le piège porté par ce savoir-faire est `serie-etiquetee-par-le-chapitre`, et
// il a une branche inverse : l’élève qui repère le dispositif au lieu de lire
// l’énoncé. Si tous les couples du fichier étaient non miscibles, « c’est
// toujours deux couches » réussirait la série entière sans qu’on ait rien
// reconnu — le contrat didactique réinstallé par nos soins, un cran plus bas.
// Neuf items sur vingt-cinq portent donc un couple MISCIBLE (eau-alcool,
// eau-sirop, eau-vinaigre), et l’item 4 de l’entraînement est explicitement
// NEUTRE : deux couches bien visibles AVANT agitation, et pourtant miscibles.
// L’item 7, à l’inverse, est celui où l’on ne voit plus aucune couche et où il
// y en a pourtant deux.
//
// ── Ce que ce savoir-faire ne couvre pas ──────────────────────────────────
//
//   · **La masse volumique, et donc le « pourquoi » de l’ordre des couches.**
//     Elle est au chapitre 4. Aucun item ne fait calculer ni comparer deux
//     masses volumiques, et aucun n’interroge la table centrale à ce sujet :
//     ici, « l’huile est au-dessus » est un FAIT observé et retenu, pas un
//     résultat. Le cours le dit à l’élève en toutes lettres plutôt que de
//     laisser un trou.
//   · **Le schéma particulaire d’un mélange NON miscible.** `schema.js` brasse
//     toujours l’échantillon — c’est une décision de l’invariant 20, un mélange
//     dessiné en couches serait un schéma de mélange hétérogène — et le lexique
//     fermé des éléments ne porte aucune formule honnête pour « l’huile ». Les
//     trois items submicroscopiques portent donc tous sur eau-éthanol, où le
//     brassage EST la bonne réponse. Le registre submicro n’a, sur ce
//     savoir-faire, aucun item du côté non miscible : c’est un manque, il est
//     dans le module et pas dans le contenu, et il ne se comble pas ici.
//     ⚠ Et ces trois items ne sont PAS servis au chapitre 1 : « molécule » est le
//     mot du chapitre 5, et les servir plus tôt demanderait à l’élève de composer
//     une grille dont il n’a pas encore le vocabulaire. C’est la faute même que ce
//     fichier refuse à la masse volumique du chapitre 4, et il l’avait commise
//     ici. `validerItem` ne pouvait pas la voir : il ne compare l’ordre des
//     chapitres qu’à `sfPrincipal`, jamais aux `sfSollicites`. Ils portent donc
//     `chapitre: CH_MOLECULES`, et ce sont, avec les deux items du piège, les
//     cinq items du fichier servis hors du chapitre 1.
//   · **Aucun piège de MISCIBILITÉ dans le catalogue, et c’est la contrainte la
//     plus lourde de ce fichier.** Les 31 pièges portent la disparition de la
//     matière, la masse lue sur la taille, la frontière physique / chimique — pas
//     « deux liquides quelconques se mélangent ». Or c’est là qu’est l’erreur de
//     l’élève sur presque tous les items d’ici. Chaque distracteur doit pourtant
//     être rattaché à un piège du catalogue, sous peine de refus
//     (`DISTRACTEUR_SANS_PIEGE`), et le rattachement est alors FORCÉ. Il tient
//     quand la réponse fausse dit « il n’en reste rien » (la règle de
//     `matiere-disparait…` la contredit) ou « c’est plus épais donc plus lourd »
//     (celle de `meme-taille-donc-meme-masse` la contredit). Il ne tient PAS
//     quand elle dit « ça s’est mélangé » ou « l’alcool est plus léger, il reste
//     dessus » : la première est ce que la règle de la dispersion ENSEIGNE, la
//     seconde a une prémisse VRAIE que la règle de la masse concède. La liste
//     précise est au bas de ce fichier, sous « Les rattachements qui ne tiennent
//     pas ». Elle ne se répare pas ici : elle demande un piège de plus dans
//     `pieges/matiere.js`, et ce fichier-là n’est pas le nôtre.
//   · **Le cercle 2 (conception de protocole).** Décider si deux liquides sont
//     miscibles demande un tube, une agitation et un regard : il n’y a aucune
//     variable à contrôler, aucun « lequel de ces trois dispositifs teste
//     l’hypothèse ». Écrire un item de cercle 2 ici aurait été fabriquer un
//     protocole pour remplir une bande.
//   · **Le cercle 3 (geste instrumental figuré).** Il n’y a pas d’appareil :
//     l’éprouvette est un support de lecture, pas un instrument à brancher ni à
//     calibrer. Aucun item n’est donc de cercle 3, et la condition « au moins
//     une réussite hors cercle 3 » est tenue par les vingt-cinq.
//   · **La séparation comme geste.** On prédit ce que l’ampoule à décanter
//     donnera, on ne la manipule pas : « mettre en œuvre » est hors périmètre, et
//     l’application l’écrit à l’élève (bloc de cours « ce que l’application ne
//     t’apprendra pas »).
//   · **La solubilité d’un solide** (savoir-faire 5 et 6 du même chapitre) :
//     miscible se dit de deux LIQUIDES, et la confusion est traitée ici comme
//     une remarque de cours, jamais comme un item — un item de solubilité aurait
//     un autre `sfPrincipal`.
//   · **Les émulsifiants, le pH, la concentration.** Hors programme du cycle 4
//     ou hors chapitre : la vinaigrette est traitée sans le mot « émulsion ».
//
// ── Trois décisions de forme ──────────────────────────────────────────────
//
//   1. **La découverte, le cours et la méthode ne sont pas des items.** Le
//      schéma d’`item.js` n’a aucun champ pour eux et leur en inventer un aurait
//      ajouté un trente-et-unième champ à une liste fermée. Ils sont exportés à
//      côté ; `default` ne contient que ce que le contrôleur et le moteur de
//      séance savent lire — les 25 items, dans l’ordre entraînement, problèmes,
//      auto-évaluation.
//   2. **Les données de l’item de lecture TABULÉE sont DÉRIVÉES des points de sa
//      figure**, par `mesuresDepuisPoints` (problème 3, le seul du fichier).
//      La chaîne de calcul et le tableau montré sortent ainsi du même tableau de
//      nombres, ce qui referme sur les items de classe A la porte que
//      l’invariant 6 ferme sur ceux de classe B. Les deux lectures GRAPHIQUES
//      (problème 5, test 10) ne le font pas : leur chaîne est une addition sur
//      des données d’énoncé, et la figure n’y sert qu’à fixer la fenêtre de
//      tolérance. C’est un écart, il est écrit ici, et il n’est pas comblé.
//   3. **L’auto-évaluation ne recopie aucun item d’entraînement**, ni énoncé, ni
//      valeurs : couples de liquides différents, volumes différents, jusqu’aux
//      effectifs des grilles submicroscopiques (10 + 4, 6 + 2, 8 + 6).

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — écrits une fois, cités deux
// ════════════════════════════════════════════════════════════════════════════
//
// L’invariant 6 est contrôlé par IDENTITÉ DE RÉFÉRENCE : la figure et la
// correction doivent être le même objet, pas deux objets égaux. Ces constantes
// sont donc l’unique exemplaire.

/** L’éthanol, dans la géométrie conventionnelle de `schema.js` : le premier
 *  atome déclaré est le centre, les autres se répartissent autour. Deux carbones,
 *  un oxygène, six hydrogènes — la COMPOSITION est l’attendu de 4ᵉ, les angles
 *  n’en sont pas un. */
const ETHANOL = Object.freeze({
  nom: 'éthanol',
  formule: 'C₂H₆O',
  atomes: Object.freeze([
    { element: 'C', nombre: 2 },
    { element: 'O' },
    { element: 'H', nombre: 6 },
  ].map(Object.freeze)),
});

const EAU = Object.freeze({
  nom: 'eau',
  formule: 'H₂O',
  atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }].map(Object.freeze)),
});

const especes = (nEau, nEthanol) => Object.freeze([
  Object.freeze({ ...EAU, nombre: nEau }),
  Object.freeze({ ...ETHANOL, nombre: nEthanol }),
]);

/** Le verre entier, après agitation. `schema.js` brasse le paquet : deux espèces
 *  déclarées l’une après l’autre ne ressortent jamais en deux paquets, et c’est
 *  exactement ce que « miscibles » veut dire. */
const MELANGE_EAU_ALCOOL = Object.freeze({
  etat: 'liquide',
  graine: 11,
  contenu: especes(10, 4),
});

/** La goutte prélevée AU FOND, une heure après. Le résultat qui compte n’est pas
 *  le dessin, c’est qu’il y ait des molécules d’éthanol dedans : un mélange
 *  homogène le reste, l’alcool ne « remonte » pas avec le temps. */
const GOUTTE_DU_FOND = Object.freeze({
  etat: 'liquide',
  graine: 23,
  contenu: especes(6, 2),
});

/** La grille de l’auto-évaluation — d’autres effectifs, pour qu’elle ne se
 *  réussisse pas de mémoire. */
const MELANGE_DU_TEST = Object.freeze({
  etat: 'liquide',
  graine: 37,
  contenu: especes(8, 6),
});

/** Cinq éprouvettes, même volume d’eau, cinq volumes d’huile. Le tableau est le
 *  stimulus ET la donnée de la chaîne : voir `mesuresDepuisPoints`. */
const SERIE_EPROUVETTES = Object.freeze({
  titre: 'Volume total lu après repos, dans cinq éprouvettes contenant chacune 60 mL d’eau',
  x: Object.freeze({ titre: 'Éprouvette n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Volume total lu (mL)', min: 60, max: 120, pas: 10 }),
  points: Object.freeze([[1, 75], [2, 90], [3, 100], [4, 110], [5, 85]].map(Object.freeze)),
});

/** Le tableau ATTENDU de l’item de composition : c’est la correction, et la
 *  figure en dérive. L’élève, lui, ne reçoit que les trois volumes versés.
 *
 *  ⚠ `titre` n’est PAS un champ d’auteur : `schema.js` le rend en `<figcaption>`,
 *  donc l’élève le lit. Il avait d’abord été écrit « Tableau attendu », ce qui
 *  annonçait à l’élève que la figure sous ses yeux était la correction. Le titre
 *  décrit désormais la manipulation, comme celui de `SERIE_EPROUVETTES`. */
const TABLEAU_ATTENDU = Object.freeze({
  titre: 'Volume total lu après repos, dans trois éprouvettes contenant chacune 50 mL d’eau',
  x: Object.freeze({ titre: 'Volume d’huile versé (mL)', min: 0, max: 50, pas: 5 }),
  y: Object.freeze({ titre: 'Volume total lu (mL)', min: 50, max: 100, pas: 5 }),
  points: Object.freeze([[20, 70], [35, 85], [45, 95]].map(Object.freeze)),
});

/** La droite de l’atelier : 60 mL d’eau, plus ce qu’on verse. La tolérance de
 *  lecture n’est pas saisie — `schema.js` la calcule, une demi-graduation, soit
 *  5 mL ici. C’est le bénéfice collatéral de l’engendrement des figures. */
const COURBE_ATELIER = Object.freeze({
  titre: 'Volume total lu dans la cuve, selon le volume d’huile versé',
  x: Object.freeze({ titre: 'Volume d’huile versé (mL)', min: 0, max: 60, pas: 10 }),
  y: Object.freeze({ titre: 'Volume total lu (mL)', min: 60, max: 120, pas: 10 }),
  points: Object.freeze([[0, 60], [10, 70], [20, 80], [30, 90], [40, 100], [50, 110], [60, 120]].map(Object.freeze)),
  relie: true,
});

/** La même chose au white-spirit, graduée de 5 en 5 : la demi-graduation vaut
 *  2,5 mL, et la fenêtre du test est donc deux fois plus serrée que celle du
 *  problème — sans qu’aucun nombre de tolérance ait été écrit à la main. */
const COURBE_ATELIER_TEST = Object.freeze({
  titre: 'Volume total lu dans le bac, selon le volume de white-spirit versé',
  x: Object.freeze({ titre: 'Volume de white-spirit versé (mL)', min: 0, max: 40, pas: 5 }),
  y: Object.freeze({ titre: 'Volume total lu (mL)', min: 40, max: 80, pas: 5 }),
  points: Object.freeze([[0, 40], [10, 50], [20, 60], [30, 70], [40, 80]].map(Object.freeze)),
  relie: true,
});

/**
 * Les données d’un item, DÉRIVÉES des points de sa figure.
 *
 * Recopier les nombres du tableau dans le bloc `donnees` marche, et diverge à la
 * première correction : c’est le désaccord figure / correction que l’invariant 6
 * refuse sur les items de classe B, et que rien n’attrape sur ceux de classe A.
 * Une fonction le rend impossible plutôt qu’improbable.
 */
const mesuresDepuisPoints = (points, prefixe, unite) => Object.fromEntries(
  points.map(([x, y]) => [`${prefixe}${x}`, { valeur: [y, 1], unite }]),
);

// ── Deux valeurs de champ qui reviennent partout ──────────────────────────

const SF = 'ch01-sf4-prevoir-la-miscibilite-de-deux-liquides';
const CH = 'ch01-melanges-et-solubilite';
/** Le chapitre où la série mélangée est SERVIE — pas celui dont l’item relève.
 *  C’est l’écart entre les deux que la condition de validité du piège exige. */
const CH_SERIE = 'ch06-transformations-chimiques';
/** Le chapitre où les items SUBMICROSCOPIQUES sont servis, et il n’est pas le
 *  chapitre 1. « Molécule » est le mot du chapitre 5 ; demander à un élève de
 *  composer une grille de molécules d’eau et d’éthanol pendant le chapitre 1,
 *  c’est exactement la faute que ce fichier refuse à la masse volumique du
 *  chapitre 4. `validerItem` ne l’attrape pas — il ne contrôle l’ordre des
 *  chapitres que sur `sfPrincipal`, jamais sur `sfSollicites` —, et un contrôle
 *  qui ne voit rien ne vaut pas permission. Les trois items sont donc servis au
 *  chapitre 5, en re-confrontation du savoir-faire du chapitre 1. */
const CH_MOLECULES = 'ch05-atomes-molecules';

const RELU = Object.freeze({ par: 'auteur-du-corpus', date: '2026-08-12' });

export const SF_ID = SF;

// ════════════════════════════════════════════════════════════════════════════
// La découverte — une expérience DÉCRITE, trois verres, une seule différence
// ════════════════════════════════════════════════════════════════════════════
//
// Elle est bâtie pour que le mot « miscible » soit la CONCLUSION et jamais le
// point de départ. Le verre 2 est là exprès : le sirop forme d’abord une couche
// bien nette, et il est pourtant miscible. Sans lui, l’élève sortirait de la
// découverte avec « deux couches au départ ⇒ non miscibles », c’est-à-dire avec
// une règle fausse installée par notre propre dispositif.

export const DECOUVERTE = Object.freeze({
  id: 'ch01-sf4-decouverte-trois-verres',
  titre: 'Trois verres, un seul garde ses deux couches',
  texte:
    'Dans trois verres identiques, on verse d’abord la même chose : de l’eau, à peu près '
    + 'la moitié du verre. On ajoute ensuite un fond d’un autre liquide — de l’alcool à 90° '
    + 'dans le premier, du sirop de menthe dans le deuxième, de l’huile de tournesol dans le '
    + 'troisième. Au moment où on les verse, les trois se voient très bien : l’alcool fait des '
    + 'traînées, le sirop tombe au fond en une couche verte, l’huile reste en surface. On remue '
    + 'les trois verres dix secondes, puis on les laisse tranquilles une minute.',
  lignes: Object.freeze([
    { observation: 'Verre 1 — eau et alcool', resultat: 'un seul liquide transparent ; on ne voit plus où était l’alcool' },
    { observation: 'Verre 2 — eau et sirop', resultat: 'un seul liquide, vert du haut jusqu’en bas' },
    { observation: 'Verre 3 — eau et huile', resultat: 'deux couches nettes, séparées par une surface horizontale, l’huile au-dessus' },
  ].map(Object.freeze)),
  question:
    'Avant qu’on remue, le sirop faisait une couche aussi visible que celle de l’huile. '
    + 'Après, il n’en reste rien et la couche d’huile, elle, est revenue. Réponds aux deux '
    + 'questions avant de lire la suite.',
  champs: Object.freeze([
    Object.freeze({
      id: 'a',
      etiquette: 'Après agitation, dans combien de verres reste-t-il deux couches ?',
      choix: Object.freeze(['aucun', 'un seul', 'deux', 'les trois']),
      attendu: 'un seul',
    }),
    Object.freeze({
      id: 'b',
      etiquette: 'Ce qui décide, c’est…',
      choix: Object.freeze([
        'la couleur des liquides',
        'lequel des deux a été versé en premier',
        'le couple de liquides lui-même',
        'la force avec laquelle on a remué',
      ]),
      attendu: 'le couple de liquides lui-même',
    }),
  ]),
  conclusion:
    'Deux liquides qui, une fois remués, donnent **un seul liquide** dont on ne peut plus '
    + 'séparer les parties à l’œil sont dits **miscibles** : eau et alcool, eau et sirop. Deux '
    + 'liquides qui reviennent en **deux couches** dès qu’on les laisse tranquilles sont **non '
    + 'miscibles** : eau et huile. Ce n’est ni la couleur, ni l’ordre du versement, ni la force '
    + 'du poignet qui décide — c’est le couple lui-même, et il donne toujours le même résultat.',
});

// ════════════════════════════════════════════════════════════════════════════
// Le cours
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze([
  Object.freeze({
    type: 'definition',
    titre: 'Miscibles, non miscibles',
    texte:
      'Deux liquides sont **miscibles** lorsque, mélangés, ils donnent un seul liquide '
      + 'homogène : on ne distingue plus ce qui vient de l’un et ce qui vient de l’autre.\n'
      + 'Ils sont **non miscibles** lorsqu’ils forment **deux couches** superposées, séparées '
      + 'par une surface horizontale. Chaque couche s’appelle une **phase**.\n'
      + 'Un mélange de liquides miscibles est **homogène** ; un mélange de liquides non '
      + 'miscibles est **hétérogène**.',
  }),
  Object.freeze({
    type: 'propriete',
    titre: 'Le couple décide, et il décide toujours pareil',
    texte:
      'La miscibilité est une propriété du **couple** de liquides, pas d’un liquide tout seul. '
      + 'On ne dit pas « l’alcool est miscible », on dit « l’alcool et l’eau sont miscibles ».\n'
      + 'Pour un couple donné, le résultat ne change pas : ni avec l’ordre du versement, ni '
      + 'avec les quantités, ni avec la vigueur de l’agitation.',
  }),
  Object.freeze({
    type: 'propriete',
    titre: 'Laquelle des deux phases est au-dessus',
    texte:
      'Pour un couple donné, c’est **toujours le même liquide** qui surnage. L’huile surnage '
      + 'sur l’eau ; l’essence, le gazole et le white-spirit aussi.\n'
      + 'À ce stade de l’année, c’est un fait qu’on **observe et qu’on retient** : le prévoir '
      + 'par le calcul demande la **masse volumique**, qui est au chapitre 4. Ne cherche pas à '
      + 'le deviner avec « c’est plus épais donc c’est plus lourd » — l’huile est plus épaisse '
      + 'que l’eau, et pourtant elle est au-dessus.',
  }),
  Object.freeze({
    type: 'remarque',
    titre: 'Miscible n’est pas soluble',
    texte:
      '**Miscible** ne se dit que de deux **liquides**. Pour un solide dans un liquide — du '
      + 'sel ou du sucre dans l’eau —, on dit **soluble**, et c’est une autre leçon.\n'
      + 'Le sirop, lui, est bien un liquide : eau et sirop sont **miscibles**.',
  }),
  Object.freeze({
    type: 'remarque',
    titre: 'Agiter ne rend pas miscible',
    texte:
      'Secoue une vinaigrette : elle devient trouble et uniforme, et on ne voit plus deux '
      + 'couches. L’agitation n’a pourtant rien changé au couple — elle a seulement dispersé '
      + 'l’huile en gouttelettes minuscules. Laisse reposer : les gouttelettes se rassemblent '
      + 'et les deux phases reviennent.\n'
      + '**Ne plus voir deux couches ne veut pas dire qu’il n’y en a plus.** Et l’inverse est '
      + 'vrai aussi : le sirop versé doucement fait une couche bien visible avant qu’on remue, '
      + 'alors qu’il est miscible.',
  }),
  Object.freeze({
    type: 'exemple',
    texte:
      'Miscibles à l’eau : l’alcool (éthanol), le sirop, le vinaigre, le jus de citron.\n'
      + 'Non miscibles à l’eau : l’huile, l’essence, le gazole, le white-spirit — et dans '
      + 'chacun de ces cas, c’est l’autre liquide qui surnage, jamais l’eau.',
  }),
  Object.freeze({
    // La phrase que `charte.md` exige DANS l’application, et pas seulement dans
    // la charte. Aucune plateforme ne dit à l’élève ce qu’elle ne lui apprend
    // pas ; ici elle a en plus une conséquence directe sur ce savoir-faire.
    type: 'remarque',
    titre: 'Ce que cette application ne t’apprendra pas',
    texte:
      'Cette application entraîne le **raisonnement** sur une situation d’expérience décrite : '
      + 'prévoir, choisir, critiquer, exploiter, contrôler. Elle **n’entraîne pas le geste**, et '
      + 'elle ne remplace pas le TP.\n'
      + 'Ici, tu prévoiras ce qu’une ampoule à décanter donnera ; tu n’apprendras pas à '
      + 'l’ouvrir au bon moment, et ça, seul le TP te l’apprendra.',
  }),
]);

// ════════════════════════════════════════════════════════════════════════════
// La méthode
// ════════════════════════════════════════════════════════════════════════════
//
// Trois étapes, dans cet ordre, parce que c’est l’ordre où l’élève se trompe :
// il répond au volume avant d’avoir décidé du nombre de phases, puis il place la
// couche au hasard. Le contrôle final est celui qui rattrape le plus d’erreurs à
// lui seul — une phase ne peut pas mesurer plus que le tube.

export const METHODE = Object.freeze({
  titre: 'Prévoir ce qu’on lira dans le tube',
  enonce:
    'On verse 30 mL d’huile dans une éprouvette qui contient 70 mL d’eau. On agite, puis on '
    + 'laisse reposer. Que lira-t-on, et où ?',
  etapes: Object.freeze([
    Object.freeze({
      texte: 'Je repère le couple : eau et huile. Je me demande d’abord s’ils sont miscibles — ils ne le sont pas.',
      note: 'Toujours cette question en premier. Tant qu’elle n’est pas tranchée, aucun volume ne veut dire quoi que ce soit.',
    }),
    Object.freeze({
      texte: 'Non miscibles, donc **deux phases**, séparées par une surface horizontale.',
      note: 'Miscibles, j’aurais écrit « une seule phase » et le volume de chaque couche n’aurait plus eu de sens.',
    }),
    Object.freeze({
      texte: 'Je place les phases : l’huile surnage, elle est **au-dessus**. L’eau est en dessous.',
      note: 'C’est un fait de cours, pas une déduction. Le calcul viendra au chapitre 4, avec la masse volumique.',
    }),
    Object.freeze({
      texte: 'J’écris les volumes : 30 mL en haut, 70 mL en bas, et 30 + 70 = 100 mL en tout.',
      note: 'Les volumes s’ajoutent parce que les deux liquides restent séparés. Sur des liquides miscibles, cette addition n’est pas exacte.',
    }),
  ]),
  controle:
    'Le contrôle, en une phrase : **la somme des deux couches doit faire ce que la graduation '
    + 'du haut indique**, et aucune couche ne peut mesurer plus que le total. Si tu annonces '
    + '70 mL pour la couche du dessus dans un tube qui indique 100 mL et qui contient 70 mL '
    + 'd’eau, tu viens de mettre 140 mL dans une éprouvette de 100.',
});

// ════════════════════════════════════════════════════════════════════════════
// L’entraînement — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── 1. Le fait de base, et les deux façons de le rater ───────────────────
  //
  // Classe C : il n’y a ici ni chaîne à rejouer, ni table à interroger, ni objet
  // formel à engendrer — c’est une réponse conceptuelle, et la charte a prévu
  // pour elle une classe sans garantie mécanique, comptée et plafonnée.
  {
    id: 'ch01-sf4-e01-huile-dans-un-verre-d-eau',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'verre-d-eau-et-cuilleree-d-huile',
    enonce:
      'On verse une cuillerée d’huile dans un verre d’eau, on remue une dizaine de secondes, '
      + 'puis on laisse le verre au repos une minute. Que voit-on alors dans le verre ?',
    reponse: {
      libre: false,
      choix: 'deux-couches-separees',
      choixPossibles: ['deux-couches-separees', 'un-seul-liquide-transparent', 'un-liquide-trouble-qui-le-reste'],
    },
    distracteurs: [
      {
        // ⚠ Ce distracteur disait « l’huile s’est dissoute dans l’eau ». La règle
        // du piège enseigne EXACTEMENT cela du sucre — « il s’est dispersé, en
        // morceaux si petits qu’aucun œil ne peut les voir » —, si bien qu’elle
        // concédait à l’élève sa prémisse au lieu de la réfuter. Ce que la règle
        // réfute, c’est la DISPARITION : elle est donc écrite ici, et le contrôle
        // (« goûte, sens, pèse ») mord dessus.
        id: 'l-huile-a-disparu',
        texte: 'Un seul liquide : à force de remuer, l’huile a disparu et il n’en reste plus rien.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'un-liquide-nouveau',
        texte: 'Un liquide trouble, et il le restera : en remuant, on a fabriqué un liquide nouveau.',
        piege: 'frontiere-physique-chimique',
      },
    ],
    relu: { ...RELU, hash: 'fc7fc2b98327874f' },
  },

  // ── 2. Le raisonnement qualitatif porté par un volume ────────────────────
  //
  // L’item pivot du fichier, et le motif est dans l’en-tête : répondre 40 exige
  // d’avoir décidé qu’il y a deux couches ET laquelle est en haut. Les deux
  // modèles erronés sont exécutables et rendent 60 et 100 — deux conceptions
  // que l’application peut distinguer, ce qu’un « c’est faux » ne permet pas.
  {
    id: 'ch01-sf4-e02-le-volume-de-la-couche-du-dessus',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'eprouvette-graduee-du-laboratoire',
    enonce:
      'Une éprouvette contient {{donnee:eau}} d’eau, sur laquelle on a versé de l’huile. Après '
      + 'agitation puis repos, la graduation du haut indique {{donnee:total}} en tout. Quel '
      + 'volume la couche du dessus occupe-t-elle ? Donne ta réponse avec son unité.',
    donnees: {
      eau: { valeur: [60, 1], unite: 'mL' },
      total: { valeur: [100, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'huile', expr: '@total − @eau', unite: 'mL' }],
      reponse: 'huile',
    },
    reponse: { valeur: [40, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'c-est-l-eau-qui-surnage',
        valeur: [60, 1],
        unite: 'mL',
        // « L’huile est plus épaisse, donc plus lourde, donc au fond » : c’est
        // « lourd » et « lourd pour sa taille » traités comme une seule idée.
        piege: 'meme-taille-donc-meme-masse',
        modeleErrone: {
          id: 'la-couche-du-dessus-est-l-eau',
          nom: 'modèle « le liquide le plus épais va au fond » : la couche du dessus est celle d’eau',
          calcul: { etapes: [{ id: 'x', expr: '@eau', unite: 'mL' }], reponse: 'x' },
        },
      },
      {
        id: 'les-deux-se-melangent',
        valeur: [100, 1],
        unite: 'mL',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        modeleErrone: {
          id: 'une-seule-couche',
          nom: 'modèle « on a remué, donc c’est mélangé » : une seule couche, qui vaut tout le tube',
          calcul: { etapes: [{ id: 'x', expr: '@total', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 3. Le double QCM, sur le couple miscible ─────────────────────────────
  //
  // Le format différenciant : « une seule couche » se coche juste par hasard une
  // fois sur trois, la justification non. Les trois fausses sont les trois
  // raisons pour lesquelles on répond « une seule » sans avoir compris —
  // l’alcool s’est évaporé, il est resté dessus sans qu’on le voie, mélanger
  // deux liquides est une réaction chimique.
  {
    id: 'ch01-sf4-e03-eau-et-alcool-double-qcm',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'flacon-d-alcool-a-90-degres',
    enonce:
      'On verse un fond d’alcool à 90° dans un verre d’eau et on remue. Combien de couches '
      + 'distingue-t-on après une minute de repos ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'une-seule-couche',
      choixPossibles: ['une-seule-couche', 'deux-couches', 'trois-couches'],
    },
    justifications: [
      {
        id: 'miscibles-donc-homogene',
        texte: 'L’eau et l’alcool sont miscibles : une fois remués, ils font un seul liquide et on ne peut plus les distinguer.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'l-alcool-s-est-evapore',
        texte: 'Il n’en reste qu’une parce que l’alcool s’est évaporé pendant qu’on remuait.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Prieto et al. (1989) — « le soluté disparaît » ; catégorie « disparition » d’Andersson, rapportée dans didactique.md § 3.1',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'l-alcool-est-reste-dessus',
        texte: 'Il y en a deux : l’alcool est plus léger, il reste au-dessus, on le voit mal parce qu’il est transparent.',
        juste: false,
        provenance: 'locale',
        piege: 'meme-taille-donc-meme-masse',
      },
      {
        id: 'melanger-c-est-chimique',
        texte: 'Il n’en reste qu’une parce que mélanger deux liquides est une réaction chimique : ça a fait un troisième liquide.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Schollum — « diluer un jus de fruit avec de l’eau est un changement chimique », énoncé-élève rapporté dans didactique.md § 3.6 (via Barker 2000, § 5)',
        piege: 'frontiere-physique-chimique',
      },
    ],
    relu: { ...RELU, hash: 'e240bae59f67ce11' },
  },

  // ── 4. L’item NEUTRE, et il n’est pas facultatif ─────────────────────────
  //
  // Deux couches bien visibles AVANT agitation, et pourtant miscibles. Sans lui,
  // le fichier enseigne « j’ai vu deux couches, donc non miscibles » — une règle
  // fausse que notre propre série aurait installée.
  {
    id: 'ch01-sf4-e04-le-sirop-au-fond-du-verre',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'sirop-de-menthe-verse-doucement',
    enonce:
      'On verse doucement du sirop de menthe au fond d’un verre d’eau, sans remuer : on '
      + 'distingue très bien deux couches, le sirop en dessous. On remue ensuite dix secondes, '
      + 'puis on laisse reposer. Que voit-on ?',
    reponse: {
      libre: false,
      choix: 'une-seule-couche-verte',
      choixPossibles: ['une-seule-couche-verte', 'les-deux-couches-reviennent', 'du-sirop-solide-au-fond'],
    },
    distracteurs: [
      {
        // ⚠ Ce distracteur disait « le sirop est plus lourd, il redescend au
        // fond ». La prémisse est VRAIE — un sirop de sucre est plus dense que
        // l’eau, et la découverte de ce fichier le montre elle-même : « le sirop
        // tombe au fond en une couche verte ». La règle du piège
        // (« un litre d’huile pèse moins qu’un litre d’eau ») ne pouvait donc pas
        // la contredire ; elle la concédait. Ce qui est faux, et ce que la règle
        // réfute, c’est le pas de plus : lire la masse sur l’ÉPAISSEUR.
        id: 'les-deux-couches-reviennent',
        texte:
          'Les deux couches reviennent : le sirop est un liquide bien plus épais que l’eau, et '
          + 'ce qui est plus épais est toujours plus lourd — ça finit au fond.',
        piege: 'meme-taille-donc-meme-masse',
      },
      {
        id: 'du-sirop-solide-au-fond',
        texte: 'Le sirop finit par se déposer au fond, comme du sucre qu’on n’aurait pas dissous.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
    relu: { ...RELU, hash: '833f14e9beac12b5' },
  },

  // ── 5. Palier 2 — ce qui varie, c’est le SENS du changement ──────────────
  //
  // On n’observe plus un état, on ajoute quelque chose et on prédit l’effet. Le
  // liquide ajouté rejoint SA phase, et le distracteur à 30 mL est celui de
  // l’élève pour qui « ce qu’on ajoute tombe au fond » : sa couche du dessus
  // reste celle du départ. Un modèle erroné se rejoue SUR LA QUESTION POSÉE —
  // rendre la couche du bas quand on demande celle du haut produit un nombre
  // qu’aucun élève cohérent n’écrira.
  {
    id: 'ch01-sf4-e05-on-rajoute-de-l-huile',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'tube-a-essai-que-l-on-complete',
    enonce:
      'Un tube contient {{donnee:eau}} d’eau surmontés de {{donnee:huileDepart}} d’huile. On '
      + 'verse encore {{donnee:huileAjoutee}} d’huile, on agite, on laisse reposer. Quel volume '
      + 'la couche du dessus occupe-t-elle alors ?',
    donnees: {
      eau: { valeur: [50, 1], unite: 'mL' },
      huileDepart: { valeur: [30, 1], unite: 'mL' },
      huileAjoutee: { valeur: [20, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'dessus', expr: '@huileDepart + @huileAjoutee', unite: 'mL' }],
      reponse: 'dessus',
    },
    reponse: { valeur: [50, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'ce-qu-on-ajoute-tombe-au-fond',
        valeur: [30, 1],
        unite: 'mL',
        piege: 'meme-taille-donc-meme-masse',
        modeleErrone: {
          id: 'l-huile-ajoutee-rejoint-l-eau',
          // ⚠ Ce modèle a d’abord rendu 70 mL, c’est-à-dire `@eau + @huileAjoutee`
          // — la couche du BAS. Or la question porte sur la couche du DESSUS. Un
          // élève qui applique « ce qu’on verse tombe au fond » et qui répond à la
          // question posée écrit 30 : la couche du dessus reste celle du départ.
          // Le contrôle mécanique ne voyait rien, puisqu’il compare le calcul au
          // nombre affiché et non le modèle à l’énoncé.
          nom: 'modèle « ce qu’on verse tombe au fond » : l’huile ajoutée grossit la couche du bas, celle du dessus reste celle du départ',
          calcul: { etapes: [{ id: 'x', expr: '@huileDepart', unite: 'mL' }], reponse: 'x' },
        },
      },
      {
        id: 'tout-ne-fait-qu-une-couche',
        valeur: [100, 1],
        unite: 'mL',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        modeleErrone: {
          id: 'une-seule-couche-apres-agitation',
          nom: 'modèle « on a agité, donc tout est mélangé » : une seule couche, qui vaut le tube entier',
          calcul: { etapes: [{ id: 'x', expr: '@eau + @huileDepart + @huileAjoutee', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 6. Palier 2 — ce qui varie, c’est le REGISTRE ────────────────────────
  //
  // Classe B : la figure et la correction sont le MÊME objet, et le brassage que
  // `schema.js` impose est ici la bonne réponse — un mélange miscible dessiné en
  // deux paquets serait un mélange hétérogène. L’élève ne peut donc pas voir un
  // dessin qui contredise ce qu’on lui demande.
  {
    id: 'ch01-sf4-e06-eau-et-alcool-au-niveau-des-molecules',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf7-changement-d-etat-microscopique'],
    chapitre: CH_MOLECULES,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'verre-d-eau-alcoolisee-vu-de-tres-pres',
    enonce:
      'Voici ce que contient un verre où l’alcool a été versé dans l’eau, puis remué : dix '
      + 'molécules d’eau et quatre molécules d’éthanol, à l’état liquide. Compose la grille qui '
      + 'représente ce mélange à l’échelle des particules.',
    figure: { sorte: 'particulaire', description: MELANGE_EAU_ALCOOL },
    reponse: { objetFormel: MELANGE_EAU_ALCOOL },
  },

  // ── 7. Palier 3 — ce qui varie, c’est le MODE DE RÉPONSE ─────────────────
  //
  // La vinaigrette : le seul item du fichier où « on ne voit plus deux couches »
  // est vrai sur le moment et faux deux minutes plus tard. C’est le contre-cas
  // de l’item 4, dans l’autre sens.
  {
    id: 'ch01-sf4-e07-la-vinaigrette-secouee',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'bocal-de-vinaigrette-secoue',
    enonce:
      'On secoue énergiquement une vinaigrette — de l’huile et du vinaigre. Elle devient '
      + 'trouble et uniforme : on ne distingue plus aucune couche. Que voit-on deux minutes '
      + 'plus tard ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'deux-couches-a-nouveau',
      choixPossibles: ['deux-couches-a-nouveau', 'toujours-un-liquide-trouble', 'une-seule-couche-transparente'],
    },
    justifications: [
      {
        id: 'les-gouttelettes-se-rassemblent',
        texte: 'Secouer n’a fait que casser l’huile en gouttelettes minuscules ; au repos, elles se rassemblent et remontent.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'secouer-rend-miscible',
        texte: 'Si on secoue assez fort, les deux liquides deviennent miscibles : ils le restent.',
        juste: false,
        provenance: 'locale',
        piege: 'frontiere-physique-chimique',
      },
      {
        id: 'on-ne-les-voit-plus-donc-ils-n-y-sont-plus',
        texte: 'Quand on ne voit plus les deux liquides séparés, c’est qu’ils ne sont plus séparés : il n’y a plus qu’un liquide.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Prieto et al. (1989) et Stavy (1990a) — « ce qui cesse d’être visible cesse d’exister », rapporté dans didactique.md § 3.1',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'le-vinaigre-a-dissous-l-huile',
        texte: 'Le vinaigre est acide : il a dissous l’huile, il ne reste qu’un liquide.',
        juste: false,
        provenance: 'locale',
        piege: 'frontiere-physique-chimique',
      },
    ],
    relu: { ...RELU, hash: 'b0cb24cd64b96b5d' },
  },

  // ── 8. Palier 3 — ce qui varie, c’est l’OBJET SUPPORT ────────────────────
  //
  // Trois liquides, deux phases. L’élève doit décider que le sirop rejoint
  // l’eau : c’est la première situation du fichier où « combien de couches ? »
  // n’a pas la même réponse que « combien de liquides ? ».
  //
  // ⚠ La chaîne a d’abord été écrite `@eau + @sirop`, c’est-à-dire 60 mL d’eau
  // PLUS 20 mL de sirop = 80 mL exactement. C’était une addition de volumes
  // MISCIBLES, que l’en-tête de ce fichier interdit en toutes lettres et que la
  // paillasse dément : un sirop de sucre mélangé à l’eau contracte, et 60 + 20 ne
  // font pas 80 au trait de jauge. La couche du dessous se lit désormais comme
  // celle du problème 5 et de l’item 7 du test — par SOUSTRACTION d’un total LU.
  // Les seules additions du fichier portent donc bien, toutes, sur des liquides
  // qui restent séparés.
  {
    id: 'ch01-sf4-e08-trois-liquides-dans-le-meme-tube',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'tube-a-trois-liquides',
    enonce:
      'Dans un même tube, on verse de l’eau, {{donnee:sirop}} de sirop de menthe et '
      + '{{donnee:huile}} d’huile. On agite, on laisse reposer : la graduation du haut indique '
      + '{{donnee:total}} en tout. Quel volume la couche du dessous occupe-t-elle ?',
    donnees: {
      total: { valeur: [110, 1], unite: 'mL' },
      sirop: { valeur: [20, 1], unite: 'mL' },
      huile: { valeur: [30, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'dessous', expr: '@total − @huile', unite: 'mL' }],
      reponse: 'dessous',
    },
    reponse: { valeur: [80, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'le-sirop-monte-avec-l-huile',
        valeur: [60, 1],
        unite: 'mL',
        piege: 'meme-taille-donc-meme-masse',
        modeleErrone: {
          id: 'sirop-et-huile-ensemble',
          // ⚠ Rendait 50 mL, c’est-à-dire `@sirop + @huile` — la couche du HAUT
          // sous ce modèle, alors que la question porte sur celle du DESSOUS.
          // L’élève qui met le sirop en haut avec l’huile laisse l’eau seule en
          // bas, et l’eau seule, c’est le total moins les deux autres.
          nom: 'modèle « les deux ajouts font une couche, l’eau fait l’autre » : sirop et huile comptés ensemble au-dessus, l’eau seule en dessous',
          calcul: { etapes: [{ id: 'x', expr: '@total − @huile − @sirop', unite: 'mL' }], reponse: 'x' },
        },
      },
      {
        id: 'tout-se-melange',
        valeur: [110, 1],
        unite: 'mL',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        modeleErrone: {
          id: 'une-seule-couche-de-trois-liquides',
          nom: 'modèle « trois liquides remués font un seul liquide » : une couche unique, qui vaut tout le tube',
          calcul: { etapes: [{ id: 'x', expr: '@total', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 9. Le rituel du contrôle ─────────────────────────────────────────────
  //
  // Pas un automatisme : le GESTE de contrôle. Une couche ne peut pas mesurer
  // plus que le tube, et 80 mL de couche du dessus dans un tube de 130 mL qui
  // contient 80 mL d’eau, c’est 160 mL de liquide dans une éprouvette de 130.
  // Exclu de la fenêtre des cinq séances, comme tout rituel.
  //
  // ⚠ Les nombres étaient d’abord ceux de l’exemple traité de la méthode — 70 mL
  // d’eau, 100 mL au total, l’élève qui annonce 70. Le rituel se réussissait alors
  // de mémoire, en recopiant la phrase de contrôle qu’on venait de lire, sans
  // refaire le compte. Ce sont les mêmes nombres qui rendaient l’item inutile.
  {
    id: 'ch01-sf4-e09-rituel-une-couche-ne-depasse-pas-le-tube',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'copie-d-eleve-a-verifier',
    enonce:
      'Un tube contient {{donnee:eau}} d’eau ; on verse de l’huile par-dessus, et la graduation '
      + 'du haut indique {{donnee:total}} en tout. Un élève annonce que la couche du dessus '
      + 'mesure {{donnee:annonce}}. Avant de le croire, refais le compte : quel volume la couche '
      + 'du dessus mesure-t-elle ?',
    donnees: {
      eau: { valeur: [80, 1], unite: 'mL' },
      total: { valeur: [130, 1], unite: 'mL' },
      annonce: { valeur: [80, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'dessus', expr: '@total − @eau', unite: 'mL' }],
      reponse: 'dessus',
    },
    reponse: { valeur: [50, 1], unite: 'mL', semantique: 'exacte' },
    rituelDeControle: true,
  },

  // ── 10. Le palier non étiqueté, et le format diagnostique du piège ───────
  //
  // Servi au chapitre 6, dans une série mélangée sans titre : c’est la seule
  // situation où la stratégie « c’est le chapitre en cours, donc c’est une
  // transformation chimique » se paie. La condition de validité du piège l’exige
  // — et elle est DÉRIVÉE de `situation`, pas cochée : rien n’annonce le
  // chapitre, la série est mélangée, et la réponse n’est pas celle du chapitre
  // en cours.
  {
    id: 'ch01-sf4-e10-de-quoi-s-agit-il',
    sfPrincipal: SF,
    chapitre: CH_SERIE,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'serie-melangee-sans-titre',
    enonce:
      'Dans un verre d’eau, on verse de l’huile de tournesol, on remue longuement, on laisse '
      + 'reposer. Première question, avant toute autre : de quoi s’agit-il ? Une combustion, '
      + 'une transformation chimique, la dissolution d’un solide, ou un mélange de deux liquides '
      + 'non miscibles ?',
    reponse: {
      libre: false,
      choix: 'un-melange-de-deux-liquides-non-miscibles',
      choixPossibles: [
        'une-combustion',
        'une-transformation-chimique',
        'la-dissolution-d-un-solide',
        'un-melange-de-deux-liquides-non-miscibles',
      ],
    },
    distracteurs: [
      {
        id: 'c-est-le-chapitre-en-cours',
        texte: 'Une transformation chimique.',
        piege: 'serie-etiquetee-par-le-chapitre',
      },
      {
        id: 'c-est-une-dissolution',
        texte: 'La dissolution d’un solide : l’huile finit par disparaître dans l’eau.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: CH_SERIE,
      chapitreReel: CH,
      serieMelangee: true,
    },
    dispositifServi: 'la-page-qui-ne-tient-pas-sa-promesse',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Aucun titre, aucune loi nommée, aucun encadré de rappel : l’item est servi dans une '
      + 'série mélangée du chapitre 6, aux côtés d’items de combustion qui, eux, relèvent bien '
      + 'du chapitre en cours — ce sont eux qui rendent la stratégie d’évitement perdante. Et la '
      + 'PREMIÈRE question posée est « de quoi s’agit-il ? », avant toute question de valeur : '
      + 'c’est le mode de réponse que le piège déclare canonique. Un item de volume servi au '
      + 'même endroit ne dirait rien — on peut compter des millilitres sans avoir reconnu quoi '
      + 'que ce soit.',
    relu: { ...RELU, hash: '658a3f4907d03260' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// Les problèmes — 5 items
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── 1. L’ampoule à décanter, en prédiction engagée ───────────────────────
  //
  // La prédiction est saisie et VERROUILLÉE avant le résultat : sans engagement
  // préalable, il n’y a pas de conflit, juste une information de plus. Et l’item
  // prédit ce que l’ampoule donnera — il ne fait pas manipuler l’ampoule, ce qui
  // serait hors périmètre.
  {
    id: 'ch01-sf4-p01-l-ampoule-a-decanter',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'ampoule-a-decanter-au-dessus-d-un-becher',
    enonce:
      'Une ampoule à décanter — un récipient fermé en bas par un robinet — contient '
      + '{{donnee:total}} de liquide en tout : de l’eau, sur laquelle on avait versé '
      + '{{donnee:huile}} d’huile. On ouvre le robinet du bas, on laisse couler dans un bécher '
      + 'jusqu’à ce que la surface de séparation arrive au robinet, puis on referme. Écris le '
      + 'volume recueilli dans le bécher, avec son unité. Ta prédiction sera verrouillée avant '
      + 'le résultat.',
    donnees: {
      total: { valeur: [120, 1], unite: 'mL' },
      huile: { valeur: [45, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'recueilli', expr: '@total − @huile', unite: 'mL' }],
      reponse: 'recueilli',
    },
    reponse: { valeur: [75, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'c-est-l-huile-qui-sort',
        valeur: [45, 1],
        unite: 'mL',
        piege: 'meme-taille-donc-meme-masse',
        modeleErrone: {
          id: 'l-huile-est-en-bas',
          nom: 'modèle « l’huile est plus épaisse, donc en bas » : c’est elle qui sort par le robinet',
          calcul: { etapes: [{ id: 'x', expr: '@huile', unite: 'mL' }], reponse: 'x' },
        },
      },
      {
        id: 'tout-sort-ensemble',
        valeur: [120, 1],
        unite: 'mL',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        modeleErrone: {
          id: 'un-seul-liquide-dans-l-ampoule',
          nom: 'modèle « il n’y a qu’un liquide » : il n’existe aucune surface de séparation, tout coule',
          calcul: { etapes: [{ id: 'x', expr: '@total', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 2. La goutte prélevée au fond, une heure après ───────────────────────
  //
  // Ce que l’item mesure n’est pas le dessin : c’est qu’il y ait de l’éthanol
  // DANS la goutte du fond. Un mélange homogène le reste — l’alcool ne remonte
  // pas avec le temps, et « ça finit par se séparer tout seul » est la version
  // lente de « deux liquides restent deux liquides ».
  {
    id: 'ch01-sf4-p02-la-goutte-prelevee-au-fond-du-verre',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf7-changement-d-etat-microscopique'],
    chapitre: CH_MOLECULES,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 3,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'pipette-plongee-au-fond-du-verre',
    enonce:
      'Le verre d’eau alcoolisée a été remué il y a une heure, et personne n’y a touché depuis. '
      + 'On prélève à la pipette une goutte tout au fond du verre. Compose la grille qui '
      + 'représente cette goutte : six molécules d’eau et deux molécules d’éthanol, à l’état '
      + 'liquide.',
    figure: { sorte: 'particulaire', description: GOUTTE_DU_FOND },
    reponse: { objetFormel: GOUTTE_DU_FOND },
  },

  // ── 3. Exploiter un tableau de mesures ───────────────────────────────────
  //
  // Les données de la chaîne sont DÉRIVÉES des points du tableau : la figure
  // montrée et le calcul rejoué sortent du même jeu de nombres, et ils ne
  // peuvent pas diverger à la première correction.
  {
    id: 'ch01-sf4-p03-cinq-eprouvettes',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'paillasse-de-cinq-eprouvettes',
    enonce:
      'Cinq éprouvettes contiennent chacune {{donnee:eau}} d’eau. On verse dans chacune un '
      + 'volume d’huile différent, on agite, on laisse reposer, puis on lit le volume total. '
      + 'Quel volume d’huile a-t-on versé dans l’éprouvette n° 4 ? Donne ta réponse avec son '
      + 'unité.',
    figure: { sorte: 'tableau', donnees: SERIE_EPROUVETTES },
    donnees: {
      eau: { valeur: [60, 1], unite: 'mL' },
      ...mesuresDepuisPoints(SERIE_EPROUVETTES.points, 'v', 'mL'),
    },
    calcul: {
      etapes: [{ id: 'huile', expr: '@v4 − @eau', unite: 'mL' }],
      reponse: 'huile',
    },
    reponse: { valeur: [50, 1], unite: 'mL', semantique: 'exacte' },
  },

  // ── 4. La nappe dans le port ─────────────────────────────────────────────
  //
  // Le transfert que le palier non étiqueté demande : le gazole n’a jamais été
  // nommé dans le cours autrement que dans une liste, et rien dans l’énoncé ne
  // dit qu’il ne se mélange pas. Classe C — la réponse est conceptuelle, il n’y
  // a ni chaîne ni objet formel, et l’avouer vaut mieux que fabriquer une
  // garantie.
  {
    id: 'ch01-sf4-p04-la-nappe-dans-le-port',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'bateau-qui-fuit-dans-un-port',
    enonce:
      'Un bateau perd du gazole dans un port. Le gazole est un liquide, comme l’essence ou le '
      + 'white-spirit. Écris ce que les secours verront une heure plus tard, avant de lire la '
      + 'suite : une nappe étalée en surface, un dépôt au fond du bassin, ou plus rien de '
      + 'visible. Ta prédiction sera verrouillée avant le résultat.',
    reponse: {
      libre: false,
      choix: 'une-nappe-etalee-en-surface',
      choixPossibles: ['une-nappe-etalee-en-surface', 'un-depot-au-fond-du-bassin', 'plus-rien-de-visible'],
    },
    distracteurs: [
      {
        id: 'un-depot-au-fond-du-bassin',
        texte: 'Un dépôt au fond : le gazole est un liquide lourd et gras, il coule.',
        piege: 'meme-taille-donc-meme-masse',
      },
      {
        id: 'plus-rien-de-visible',
        texte: 'Plus rien : la mer est immense, le gazole s’y est mélangé et a disparu.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
    relu: { ...RELU, hash: '7212d8cfd774a1d3' },
  },

  // ── 5. Une lecture graphique, et une tolérance CALCULÉE ──────────────────
  //
  // La fenêtre n’est pas saisie : `schema.js` la déduit de la graduation de
  // l’axe — une demi-graduation, 5 mL ici. Le modèle erroné « les liquides se
  // mélangent, le niveau ne bouge pas » est exécuté par le contrôle, qui vérifie
  // qu’il tombe HORS de la fenêtre : sans quoi l’élève qui l’applique serait
  // compté juste.
  {
    id: 'ch01-sf4-p05-le-graphique-de-l-atelier',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'cuve-d-atelier-remplie-chaque-matin',
    enonce:
      'Dans un atelier, on prépare tous les matins le même bain : {{donnee:eau}} d’eau, sur '
      + 'lesquels on verse un volume d’huile qui change d’un jour à l’autre. Le graphique donne '
      + 'le volume total lu dans la cuve après repos, selon le volume d’huile versé. Ce matin, '
      + 'on a versé {{donnee:huile}}. Quel volume total lira-t-on ? Donne ta réponse avec son '
      + 'unité.',
    figure: { sorte: 'graphique', donnees: COURBE_ATELIER },
    donnees: {
      eau: { valeur: [60, 1], unite: 'mL' },
      huile: { valeur: [35, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'total', expr: '@huile + @eau', unite: 'mL' }],
      reponse: 'total',
    },
    reponse: { valeur: [95, 1], unite: 'mL', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'le-niveau-ne-bouge-pas',
        nom: 'modèle « l’huile se mélange à l’eau » : le volume lu reste celui de l’eau',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        calcul: { etapes: [{ id: 'x', expr: '@eau', unite: 'mL' }], reponse: 'x' },
      },
    ],
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// L’auto-évaluation — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun item d’entraînement n’y est recopié, valeurs comprises : couples de
// liquides différents, volumes différents, effectifs de grilles différents. Un
// test qui se réussit de mémoire ne mesure que la mémoire.

export const AUTO_EVALUATION = Object.freeze([

  // ── 1 ────────────────────────────────────────────────────────────────────
  {
    id: 'ch01-sf4-t01-white-spirit-et-eau',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'bocal-de-nettoyage-des-pinceaux',
    enonce:
      'Pour nettoyer ses pinceaux, un peintre verse du white-spirit dans un bocal qui contient '
      + 'un fond d’eau, puis il secoue. Que voit-on dans le bocal après une minute de repos ?',
    reponse: {
      libre: false,
      choix: 'deux-couches-le-white-spirit-au-dessus',
      choixPossibles: [
        'deux-couches-le-white-spirit-au-dessus',
        'deux-couches-le-white-spirit-en-dessous',
        'un-seul-liquide',
      ],
    },
    distracteurs: [
      {
        id: 'le-white-spirit-en-dessous',
        texte: 'Deux couches, le white-spirit en dessous : c’est un produit lourd.',
        piege: 'meme-taille-donc-meme-masse',
      },
      {
        id: 'un-seul-liquide',
        texte: 'Un seul liquide : le white-spirit est un solvant, il se mélange à tout.',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
    relu: { ...RELU, hash: 'bd97b32fc357a495' },
  },

  // ── 2 ── Le piège, servi une seconde fois, à un autre palier ─────────────
  //
  // L’item du chapitre 6 où la bonne réponse EST « il ne s’est rien formé ».
  // Palier 3 : ce qui varie par rapport au palier 4 de l’entraînement, c’est le
  // mode de réponse — il faut en plus dire pourquoi.
  //
  // ⚠ Une seule des trois justifications fausses répond au CHAPITRE en cours :
  // « le vinaigre est un acide, il a réagi ». Le commentaire prétendait qu’elles
  // le faisaient toutes les trois ; les deux autres — le vinaigre plus lourd, le
  // vinaigre évaporé — n’ont rien à voir avec le chapitre 6 et portent leur
  // propre piège. C’est la première, et elle seule, qui rend l’item diagnostique
  // pour `serie-etiquetee-par-le-chapitre` ; les deux autres élargissent le
  // diagnostic sans le porter.
  {
    id: 'ch01-sf4-t02-vinaigre-dans-l-eau-double-qcm',
    sfPrincipal: SF,
    chapitre: CH_SERIE,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'verre-de-vinaigre-et-d-eau',
    enonce:
      'On verse du vinaigre dans un verre d’eau et on remue. Combien de couches voit-on après '
      + 'repos ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'une-seule-couche',
      choixPossibles: ['une-seule-couche', 'deux-couches', 'deux-couches-puis-une-seule'],
    },
    justifications: [
      {
        id: 'vinaigre-et-eau-sont-miscibles',
        texte: 'Le vinaigre et l’eau sont miscibles : le mélange est homogène, on ne peut plus les distinguer.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'l-acide-a-reagi-avec-l-eau',
        texte: 'Le vinaigre est un acide : il a réagi avec l’eau et il s’est formé un produit nouveau.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Schollum — « diluer un jus de fruit avec de l’eau est un changement chimique », énoncé-élève rapporté dans didactique.md § 3.6 (via Barker 2000, § 5)',
        piege: 'frontiere-physique-chimique',
      },
      {
        id: 'deux-couches-le-vinaigre-est-lourd',
        texte: 'Deux couches : le vinaigre est plus lourd que l’eau, il reste au fond du verre.',
        juste: false,
        provenance: 'locale',
        piege: 'meme-taille-donc-meme-masse',
      },
      {
        id: 'le-vinaigre-s-est-evapore',
        texte: 'On ne le voit plus, donc il n’y en a plus : le vinaigre s’est évaporé, il n’en reste que l’odeur.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Stavy (1990a) — « l’odeur reste alors que la matière s’est évanouie », rapporté dans didactique.md § 3.1',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
    ],
    piege: 'serie-etiquetee-par-le-chapitre',
    situation: {
      chapitreAnnonce: null,
      chapitreEnCours: CH_SERIE,
      chapitreReel: CH,
      serieMelangee: true,
    },
    relu: { ...RELU, hash: '3a9a11b8520dda31' },
  },

  // ── 3 ────────────────────────────────────────────────────────────────────
  {
    id: 'ch01-sf4-t03-le-volume-de-la-couche-du-dessous',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'eprouvette-du-controle-ecrit',
    enonce:
      'Une éprouvette indique {{donnee:total}} en tout : de l’eau, et {{donnee:huile}} d’huile '
      + 'versés par-dessus. Quel volume la couche du dessous occupe-t-elle ? Donne ta réponse '
      + 'avec son unité.',
    donnees: {
      total: { valeur: [90, 1], unite: 'mL' },
      huile: { valeur: [25, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'dessous', expr: '@total − @huile', unite: 'mL' }],
      reponse: 'dessous',
    },
    reponse: { valeur: [65, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'la-couche-du-dessous-c-est-l-huile',
        valeur: [25, 1],
        unite: 'mL',
        piege: 'meme-taille-donc-meme-masse',
        modeleErrone: {
          id: 'l-huile-au-fond',
          nom: 'modèle « le liquide le plus épais va au fond » : la couche du dessous est celle d’huile',
          calcul: { etapes: [{ id: 'x', expr: '@huile', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 4 ────────────────────────────────────────────────────────────────────
  {
    id: 'ch01-sf4-t04-on-rajoute-de-l-eau',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'flacon-que-l-on-remplit-au-robinet',
    enonce:
      'Un flacon contient {{donnee:eau}} d’eau surmontés de {{donnee:spirit}} de white-spirit. '
      + 'On ajoute {{donnee:eauAjoutee}} d’eau, on agite, on laisse reposer. Quel volume la '
      + 'couche du dessous occupe-t-elle alors ?',
    donnees: {
      eau: { valeur: [40, 1], unite: 'mL' },
      spirit: { valeur: [15, 1], unite: 'mL' },
      eauAjoutee: { valeur: [30, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'dessous', expr: '@eau + @eauAjoutee', unite: 'mL' }],
      reponse: 'dessous',
    },
    reponse: { valeur: [70, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'l-eau-ajoutee-passe-au-dessus',
        valeur: [40, 1],
        unite: 'mL',
        piege: 'meme-taille-donc-meme-masse',
        modeleErrone: {
          id: 'ce-qu-on-verse-reste-en-haut',
          // ⚠ Rendait 45 mL, c’est-à-dire `@spirit + @eauAjoutee` — la couche du
          // HAUT sous ce modèle, alors que la question porte sur celle du DESSOUS.
          // Qui croit que ce qu’on verse en dernier reste au-dessus laisse en bas
          // l’eau du départ, et rien d’autre.
          nom: 'modèle « ce qu’on verse en dernier reste au-dessus » : l’eau ajoutée grossit la couche du haut, celle du dessous reste l’eau du départ',
          calcul: { etapes: [{ id: 'x', expr: '@eau', unite: 'mL' }], reponse: 'x' },
        },
      },
      {
        id: 'plus-d-eau-donc-tout-se-melange',
        valeur: [85, 1],
        unite: 'mL',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        modeleErrone: {
          id: 'assez-d-eau-pour-tout-melanger',
          nom: 'modèle « avec assez d’eau, ça finit par se mélanger » : une seule couche, tout le flacon',
          calcul: { etapes: [{ id: 'x', expr: '@eau + @spirit + @eauAjoutee', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 5 ────────────────────────────────────────────────────────────────────
  {
    id: 'ch01-sf4-t05-la-grille-du-melange-alcoolise',
    sfPrincipal: SF,
    sfSollicites: ['ch05-sf7-changement-d-etat-microscopique'],
    chapitre: CH_MOLECULES,
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'echantillon-preleve-dans-un-melange-alcoolise',
    enonce:
      'Un échantillon prélevé dans un mélange d’eau et d’alcool contient huit molécules d’eau '
      + 'et six molécules d’éthanol, à l’état liquide. Compose la grille qui le représente à '
      + 'l’échelle des particules.',
    figure: { sorte: 'particulaire', description: MELANGE_DU_TEST },
    reponse: { objetFormel: MELANGE_DU_TEST },
  },

  // ── 6 ── Composer le tableau, et non le lire ─────────────────────────────
  //
  // Classe B : le tableau MONTRÉ en correction et la réponse attendue sont le
  // même objet. L’élève, lui, ne reçoit que les trois volumes versés et le
  // volume d’eau — il produit les trois totaux.
  {
    id: 'ch01-sf4-t06-completer-le-tableau-des-totaux',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'cahier-d-experience-a-completer',
    enonce:
      'Trois éprouvettes contiennent chacune 50 mL d’eau. On verse dans la première 20 mL '
      + 'd’huile, dans la deuxième 35 mL, dans la troisième 45 mL. On agite, on laisse reposer. '
      + 'Complète la ligne « volume total lu » du tableau, pour les trois éprouvettes.',
    figure: { sorte: 'tableau', donnees: TABLEAU_ATTENDU },
    reponse: { objetFormel: TABLEAU_ATTENDU },
  },

  // ── 7 ────────────────────────────────────────────────────────────────────
  {
    id: 'ch01-sf4-t07-la-bouteille-de-sirop',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'bouteille-oubliee-au-fond-du-frigo',
    enonce:
      'Une bouteille contient {{donnee:total}} de liquide en tout : de l’eau, {{donnee:sirop}} '
      + 'de sirop de grenadine et {{donnee:huile}} d’huile tombée dedans par accident. On '
      + 'secoue, on laisse reposer. Quel volume la couche du dessous occupe-t-elle ? Donne ta '
      + 'réponse avec son unité.',
    donnees: {
      total: { valeur: [250, 1], unite: 'mL' },
      sirop: { valeur: [45, 1], unite: 'mL' },
      huile: { valeur: [30, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'dessous', expr: '@total − @huile', unite: 'mL' }],
      reponse: 'dessous',
    },
    reponse: { valeur: [220, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'le-sirop-fait-sa-couche',
        valeur: [175, 1],
        unite: 'mL',
        piege: 'meme-taille-donc-meme-masse',
        modeleErrone: {
          id: 'trois-liquides-trois-couches',
          nom: 'modèle « trois liquides, trois couches » : le sirop est compté à part de l’eau',
          calcul: { etapes: [{ id: 'x', expr: '@total − @huile − @sirop', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 8 ────────────────────────────────────────────────────────────────────
  {
    id: 'ch01-sf4-t08-prediction-du-volume-total',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'grande-eprouvette-de-demonstration',
    enonce:
      'On verse {{donnee:huile}} d’huile dans une éprouvette qui contient {{donnee:eau}} d’eau. '
      + 'On agite, on laisse reposer. Écris le volume total que la graduation du haut indiquera, '
      + 'avec son unité. Ta prédiction sera verrouillée avant le résultat.',
    donnees: {
      huile: { valeur: [60, 1], unite: 'mL' },
      eau: { valeur: [90, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'total', expr: '@huile + @eau', unite: 'mL' }],
      reponse: 'total',
    },
    reponse: { valeur: [150, 1], unite: 'mL', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'le-niveau-ne-monte-pas',
        valeur: [90, 1],
        unite: 'mL',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        modeleErrone: {
          id: 'l-huile-se-loge-dans-l-eau',
          nom: 'modèle « l’huile se mélange à l’eau » : le niveau reste celui de l’eau seule',
          calcul: { etapes: [{ id: 'x', expr: '@eau', unite: 'mL' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── 9 ── La conséquence de la miscibilité, et la seule classe A′ du lot ──
  //
  // Deux liquides miscibles ne se décantent pas : on les sépare en chauffant.
  // La valeur demandée n’est pas un théorème, c’est un FAIT, et la classe A′ le
  // rejoue sur la table centrale sourcée au lieu de le faire relire par un
  // humain. Le savoir-faire principal reste celui-ci : c’est la miscibilité qui
  // décide de la méthode de séparation.
  //
  // ⚠ L’énoncé nommait d’abord l’éthanol et demandait sa température
  // d’ébullition : la question se réussissait en lisant la ligne qu’elle
  // désignait, sans avoir rien décidé de la miscibilité ni du couple. L’énoncé
  // ne nomme plus le liquide à chercher — il faut savoir lequel des deux bout le
  // plus bas pour savoir quelle ligne interroger. La requête, elle, est
  // inchangée : c’est bien `ethanol / ebullition` que la table rejoue.
  {
    id: 'ch01-sf4-t09-ce-qui-ne-se-decante-pas-se-distille',
    sfPrincipal: SF,
    sfSollicites: ['ch01-sf3-identifier-un-corps-pur-par-sa-temperature'],
    chapitre: CH,
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'montage-de-distillation-decrit',
    enonce:
      'Un mélange d’eau et d’alcool (éthanol) : les deux liquides sont miscibles, les laisser '
      + 'reposer ne les sépare pas, et une ampoule à décanter n’y ferait rien. On les sépare '
      + 'donc en chauffant doucement le mélange — celui des deux qui bout le plus bas part en '
      + 'vapeur le premier, et c’est lui qu’on recueille à part. À quelle température ce '
      + 'premier liquide se met-il à bouillir ? Donne ta réponse avec son unité.',
    requete: { table: 'changements-d-etat', cle: 'ethanol', colonne: 'ebullition' },
    reponse: { valeur: [78, 1], unite: '°C', semantique: 'exacte' },
  },

  // ── 10 ── La lecture graphique du test, deux fois plus serrée ────────────
  //
  // Même geste qu’au problème 5, autre couple et autre graduation : la
  // demi-graduation vaut 2,5 mL au lieu de 5. La fenêtre n’a pas été resserrée à
  // la main — elle l’est parce que l’axe est gradué de 5 en 5.
  {
    id: 'ch01-sf4-t10-le-graphique-du-bac-de-trempage',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'bac-de-trempage-de-l-atelier',
    enonce:
      'Un bac de trempage contient toujours {{donnee:eau}} d’eau. On y verse chaque jour un '
      + 'volume de white-spirit qui change. Le graphique donne le volume total lu après repos, '
      + 'selon le volume de white-spirit versé. Aujourd’hui, on en a versé {{donnee:spirit}}. '
      + 'Quel volume total lira-t-on ? Donne ta réponse avec son unité.',
    figure: { sorte: 'graphique', donnees: COURBE_ATELIER_TEST },
    donnees: {
      eau: { valeur: [40, 1], unite: 'mL' },
      spirit: { valeur: [25, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [{ id: 'total', expr: '@spirit + @eau', unite: 'mL' }],
      reponse: 'total',
    },
    reponse: { valeur: [65, 1], unite: 'mL', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'le-niveau-reste-celui-de-l-eau',
        nom: 'modèle « le white-spirit se mélange à l’eau » : le niveau ne bouge pas',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
        calcul: { etapes: [{ id: 'x', expr: '@eau', unite: 'mL' }], reponse: 'x' },
      },
      {
        id: 'le-volume-verse-au-lieu-du-total',
        nom: 'modèle « on me demande ce que j’ai versé » : l’élève rend la valeur lue en abscisse',
        piege: 'donnees-superflues-et-questions-sans-reponse',
        calcul: { etapes: [{ id: 'x', expr: '@spirit', unite: 'mL' }], reponse: 'x' },
      },
    ],
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// Les rattachements qui ne tiennent pas — la dette, écrite plutôt que masquée
// ════════════════════════════════════════════════════════════════════════════
//
// L’épreuve d’un rattachement n’est pas « le piège existe-t-il au catalogue ? » —
// aucun contrôle ne lit autre chose — c’est : la RÈGLE du piège, appliquée à la
// réponse fausse de l’élève, la RÉFUTE-t-elle ? Les huit rattachements ci-dessous
// échouent à cette épreuve, et il faut le savoir avant de s’appuyer sur eux pour
// reprogrammer quoi que ce soit. Aucun n’est réparable à l’intérieur de ce
// fichier : il n’existe au catalogue aucun piège de miscibilité.
//
// ── La règle VALIDE la réponse fausse ─────────────────────────────────────
//
//   · e03, justification `l-alcool-est-reste-dessus` → `meme-taille-donc-meme-
//     masse`. L’élève dit « l’alcool est plus léger, il reste au-dessus ». La
//     prémisse est VRAIE (l’éthanol est moins dense que l’eau) et la règle du
//     piège en donne elle-même l’équivalent — « un litre d’huile pèse moins qu’un
//     litre d’eau ». Elle ne peut donc rien contredire. Ce qui est faux est le
//     pas suivant — moins dense n’empêche pas de se mélanger — et aucune règle du
//     catalogue ne le dit.
//   · p04, distracteur `un-depot-au-fond-du-bassin` → même piège, même mode de
//     panne à l’envers : la règle réfute bien « le gazole coule », mais par un
//     fait de masse volumique que le cours de ce chapitre s’interdit d’invoquer.
//
// ── La règle est MUETTE ───────────────────────────────────────────────────
//
//   · e02 `les-deux-se-melangent`, e05 `tout-ne-fait-qu-une-couche`,
//     e08 `tout-se-melange`, p01 `tout-sort-ensemble`,
//     t04 `plus-d-eau-donc-tout-se-melange` → `matiere-disparait-quand-on-ne-la-
//     voit-plus`. Ces cinq élèves CONSERVENT tout : ils rendent le tube entier,
//     somme exacte des deux volumes. Ils ne font disparaître aucune matière, ils
//     nient l’interface. La règle du piège porte sur l’existence de la matière et
//     ne dit rien de l’interface ; elle ne les réfute pas.
//     (À distinguer de t08 `le-niveau-ne-monte-pas`, p05 et t10 `le niveau reste
//     celui de l’eau` : ceux-là font bien disparaître un volume, et la règle mord.)
//   · t07 `le-sirop-fait-sa-couche` → `meme-taille-donc-meme-masse`. Le modèle
//     « trois liquides, trois couches » ne dit rien d’une masse ; il ignore que
//     le sirop est miscible. La règle est hors sujet.
//   · e07, justification `secouer-rend-miscible` → `frontiere-physique-chimique`.
//     L’élève ne classe rien en chimique : il croit que l’agitation change le
//     couple. La règle du piège (« chimique veut dire que des molécules ont
//     disparu et d’autres sont apparues ») ne le contredit pas.
//
// ── Ce qu’il faudrait, et ce que ça coûte ─────────────────────────────────
//
// Un piège de plus dans `pieges/matiere.js` — « deux liquides remués finissent
// toujours par se mélanger », de rang à établir, dont la règle dirait que la
// miscibilité est une propriété du COUPLE et que ni l’agitation ni les quantités
// ne la changent. Il porterait à lui seul huit des rattachements ci-dessus. Tant
// qu’il n’existe pas, ces huit distracteurs restent de bons distracteurs — ils
// séparent les élèves — mais ils ne valent pas DIAGNOSTIC : ce qu’ils font
// remonter dans `srs.js` reprogrammera une conception que l’élève n’a peut-être
// pas.

// ════════════════════════════════════════════════════════════════════════════
// Ce que le moteur et le contrôleur lisent : les 25 items, et rien d’autre
// ════════════════════════════════════════════════════════════════════════════

export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...AUTO_EVALUATION]);
