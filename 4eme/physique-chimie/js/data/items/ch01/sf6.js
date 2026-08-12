// Chapitre 1 — « Exploiter une courbe de solubilité en fonction de la température »
// ch01-sf6-exploiter-une-courbe-de-solubilite
//
// Premier contenu écrit contre le moteur. Ce qui suit dit ce que j’ai décidé,
// pourquoi, et surtout ce que ce savoir-faire NE couvre pas.
//
// ── Les six objets formels, écrits une fois et cités deux ───────────────────
//
// L’invariant 6 est tenu par IDENTITÉ DE RÉFÉRENCE, pas par ressemblance : les
// courbes ci-dessous sont l’unique exemplaire, `figure.donnees` les montre et,
// sur les items de classe B, `reponse.objetFormel` EST la même constante. Un
// auteur qui corrigerait une ordonnée corrige donc la figure et la correction
// d’un seul geste, parce qu’il n’y a qu’un objet.
//
// Aucune valeur ne vient d’une table du corpus : `js/data/tables.js` ne porte
// pas de table de solubilité, et je n’en ai pas ouvert une — une table réclame
// une source primaire relue en original, ce qui est une décision de contenu et
// pas un effet de bord de ce fichier. **Conséquence à écrire plutôt qu’à
// taire : zéro item de classe A′ dans cette section.** Les courbes sont des
// séries de mesures plausibles, arrondies à la graduation pour être lisibles ;
// rien dans le contrôleur ne les vérifie, et c’est le point faible assumé de
// cette section. Le jour où une table `solubilites` existe, les items de
// lecture pure (classe B) peuvent basculer en A′ sans changer d’énoncé.
//
// ── Trois choses que la mécanique impose, et qu’il vaut mieux savoir ────────
//
// 1. **La demi-graduation est celle de l’axe des ORDONNÉES, toujours.**
//    `fenetreDeTolerance` lit `figure.donnees.y.pas` dès que la figure est un
//    graphique, quelle que soit la grandeur demandée. Sur une lecture
//    d’ABSCISSE — « à partir de quelle température ? » — elle rendrait une
//    fenêtre de ±50 °C, c’est-à-dire n’importe quoi. Ces items-là sont donc
//    déclarés `semantique: 'exacte'`, et leur réponse tombe sur une graduation
//    de l’axe des températures, jamais entre deux. Ce n’est pas un contournement
//    du contrôle : c’est la seule lecture d’abscisse qu’on ait le droit de
//    demander sans tolérance.
//
// 2. **Les items chiffrés qui portent une figure travaillent sur UN litre.**
//    La demi-graduation est exprimée dans l’unité de la réponse : sur une masse
//    en grammes, elle vaut numériquement la demi-graduation de l’axe en g/L.
//    Les deux ne coïncident que si le volume vaut exactement un litre. Au-delà,
//    la fenêtre serait plus étroite que l’incertitude réelle de lecture et
//    compterait faux un élève qui a bien lu. Les items à volume autre (2 L, 3 L,
//    4 L) demandent donc une solubilité en g/L, ou se passent de figure et
//    portent alors une tolérance en pourcentage.
//
// 3. **Un double QCM ne peut pas montrer de courbe.** `SORTES_PAR_TYPE` ne
//    donne de figure qu’aux types `lecture`, `schema-circuit` et
//    `schema-particulaire` ; une figure sur un `double-qcm` est refusée
//    (FIGURE_HORS_TYPE). Des trois doubles QCM de cette section, les deux qui
//    portent une série la décrivent donc en toutes lettres dans l’énoncé (e07,
//    t07) ; le troisième (p02) est qualitatif et n’a rien à montrer. C’est une
//    contrainte réelle, pas une négligence.
//
// ── Les données non citées par {{donnee:…}} ─────────────────────────────────
//
// Convention posée ici, et rien dans le contrôleur ne l’impose : une `donnee`
// citée par `{{donnee:…}}` est AFFICHÉE (l’énoncé la fournit) ; une `donnee`
// non citée est une valeur que l’élève doit LIRE sur la courbe, et elle
// n’existe dans l’item que pour porter le recalcul de classe A. Au palier 1 les
// solubilités sont citées — la lecture est étayée — ; aux paliers 3 et 4 elles
// ne le sont plus. Le volume, lui, est toujours cité : c’est une donnée de
// l’énoncé, pas une lecture.
//
// ── Les deux pièges, et la variation ───────────────────────────────────────
//
// `savoir-faire.js` en déclare deux : `valeur-aberrante-d-une-serie-non-reperee`
// et `unite-absente-ou-fausse`. Leur condition de validité est ÉVALUÉE sur
// l’objet `situation`, jamais cochée. Les dimensions variées sont distinctes
// palier 2 / palier 3 pour chacun :
//
//   · valeur aberrante — palier 2 : `objet-support` · palier 3 : `mode-de-reponse`
//   · unité            — palier 2 : `grandeur-en-jeu` · palier 3 : `mode-de-reponse`
//
// Le piège de la valeur aberrante exige que le vivier porte AUSSI des séries
// propres, sans quoi « il y en a toujours une à jeter » devient le contrat
// qu’on prétendait défaire : `ESSAIS_PROPRES` (item e10) est là pour ça, avec
// `aberrante: null`.
//
// ── L’unité : g/L, et rien d’autre ─────────────────────────────────────────
//
// Décision de la charte, appliquée sans exception : une solubilité s’écrit en
// g/L. `g/100 mL`, l’écriture usuelle des manuels, est refusée par le lexique
// auteur lui-même (FACTEUR_NUMERIQUE) — ce n’est donc même pas une discipline
// d’auteur, c’est une impossibilité. En revanche `ch01-sf6` porte
// `unite: 'libre'` : un élève qui répond en kg/m³ a raison, et l’application le
// lui dit. Aucun item d’ici n’impose une unité.
//
// ── Ce que ce savoir-faire NE couvre PAS ───────────────────────────────────
//
//   · **Le geste expérimental.** On ne fait pas dissoudre, on ne filtre pas, on
//     ne pèse pas. Tous les énoncés portent sur une situation DÉCRITE : lire,
//     exploiter, critiquer, prévoir. Un item qui ferait « mettre en œuvre » un
//     protocole est hors périmètre, et il n’y en a aucun.
//   · **La construction de la courbe** — placer les points, choisir les
//     graduations, tracer. C’est un geste figuré (cercle 3) qu’aucune figure
//     engendrée ne sait faire construire par l’élève : `schema.js` trace, il ne
//     recueille pas. Aucun item de cercle 3 dans cette section, et le
//     savoir-faire n’en a pas besoin pour être acquérable.
//   · **La moyenne de mesures répétées à une même température**, et le « pourquoi
//     dix mesures et pas une » : c’est `ch01-sf5`, cercle 2, qui l’a déjà.
//     Ici la série est indexée par la TEMPÉRATURE, pas par le numéro d’essai —
//     c’est ce qui sépare les deux savoir-faire, et le piège de la valeur
//     aberrante les traverse tous les deux.
//   · **La concentration, la mole, l’effet de la pression sur la solubilité des
//     gaz.** Le chapitre 1 les écarte explicitement (`nonDemande`), et rien ici
//     ne les effleure.
//   · **La dissolution d’un gaz** (`ch01-sf7`) : la courbe d’un gaz descend
//     quand on chauffe, et c’est un contre-exemple précieux — mais il appartient
//     à un autre savoir-faire et à un autre piège.
//   · **La discrimination mathématique.** `ch01-sf6` ne déclare aucun
//     `prerequisMaths` ; poser un rôle de discrimination ici serait refusé
//     (DISCRIMINATION_SANS_PREREQUIS), et à juste titre : il n’y aurait rien à
//     séparer.
//
// ── Décompte, vérifié sur le fichier ───────────────────────────────────────
//
//   Découverte 1 · cours 1 · méthode 1 (ce ne sont pas des items)
//   Entraînement 10 · problèmes 5 · auto-évaluation 10  =  25 items
//   Classes : A 13 · A_TABLE 0 · B 7 · C 5
//   Paliers : 1 → 6 · 2 → 6 · 3 → 5 · 4 → 8
//   Cercles : 0 → 3 · 1 → 16 · 2 → 6 · 3 → 0
//   Doubles QCM 3 · items au format diagnostique 2 · rituel de contrôle 1
//
// L’auto-évaluation ne recopie aucun item d’entraînement ni de problème : elle
// travaille sur deux autres solutés (chlorate de potassium, bicarbonate) et sur
// une autre série d’essais, donc sur d’autres valeurs de bout en bout. Un test
// qui reprend les nombres de l’entraînement se réussit de mémoire.

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — l’unique exemplaire de chaque figure
// ════════════════════════════════════════════════════════════════════════════

/** La courbe de référence de la section : le nitrate de potassium, dont la
 *  solubilité est fortement croissante — c’est ce qui rend le refroidissement
 *  spectaculaire, et donc enseignable. Graduation de l’ordonnée : 100 g/L,
 *  d’où une tolérance de lecture calculée de ±50 g/L. */
const COURBE_NITRATE = Object.freeze({
  titre: 'Solubilité du nitrate de potassium dans l’eau, selon la température',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 60, pas: 10 }),
  y: Object.freeze({ titre: 'Solubilité (g/L)', min: 0, max: 1200, pas: 100 }),
  points: Object.freeze([[0, 100], [10, 200], [20, 300], [30, 450], [40, 650], [50, 850], [60, 1100]].map(Object.freeze)),
  relie: true,
});

/** Le contre-exemple obligatoire : le sel de cuisine, dont la courbe est
 *  presque plate. Sans lui, « chauffer dissout mieux » devient une loi générale
 *  dans la tête de l’élève, et c’est faux. Graduation fine (10 g/L) parce que
 *  tout l’intérêt est dans un écart que la courbe du nitrate écraserait. */
const COURBE_SEL = Object.freeze({
  titre: 'Solubilité du chlorure de sodium (sel de cuisine) dans l’eau',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 80, pas: 20 }),
  y: Object.freeze({ titre: 'Solubilité (g/L)', min: 340, max: 400, pas: 10 }),
  points: Object.freeze([[0, 355], [20, 360], [40, 365], [60, 375], [80, 385]].map(Object.freeze)),
  relie: true,
});

/** La courbe du sucre : mêmes gestes, ordre de grandeur tout autre. Elle sert
 *  le palier non étiqueté, où la première tâche est de reconnaître de quoi il
 *  s’agit sans que le décor ne le souffle. */
const COURBE_SUCRE = Object.freeze({
  titre: 'Solubilité du sucre (saccharose) dans l’eau',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 80, pas: 20 }),
  y: Object.freeze({ titre: 'Solubilité (g/L)', min: 1500, max: 3800, pas: 100 }),
  points: Object.freeze([[0, 1800], [20, 2050], [40, 2400], [60, 2900], [80, 3600]].map(Object.freeze)),
  relie: true,
});

/** Sept essais d’un groupe, dont un reporté sur la mauvaise graduation : la
 *  valeur du troisième vaut le double de ce que la courbe donne. Le tracé est
 *  RELIÉ — c’est ce qui fait voir le pic, et c’est exactement le dispositif
 *  « le point qui tord la courbe » du catalogue des pièges. */
const ESSAIS_NITRATE = Object.freeze({
  titre: 'Sept essais d’un groupe : masse de nitrate dissoute dans un litre d’eau',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 60, pas: 10 }),
  y: Object.freeze({ titre: 'Masse dissoute (g/L)', min: 0, max: 1200, pas: 100 }),
  points: Object.freeze([[0, 100], [10, 200], [20, 300], [30, 900], [40, 650], [50, 850], [60, 1100]].map(Object.freeze)),
  relie: true,
});

/** La série PROPRE, sans aucune mesure à écarter. Elle est obligatoire au
 *  vivier : une section où toute série servie porte une valeur aberrante
 *  enseigne « il y en a toujours une à jeter », c’est-à-dire le contrat
 *  didactique que le piège prétend défaire. */
const ESSAIS_PROPRES = Object.freeze({
  titre: 'Six essais d’un autre groupe, dans les mêmes conditions',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 50, pas: 10 }),
  y: Object.freeze({ titre: 'Masse dissoute (g/L)', min: 0, max: 1000, pas: 100 }),
  points: Object.freeze([[0, 110], [10, 190], [20, 310], [30, 440], [40, 660], [50, 840]].map(Object.freeze)),
  relie: true,
});

/** Auto-évaluation. Le chlorate de potassium : croissance forte comme le
 *  nitrate, mais dix fois plus petite en valeur — un élève qui aurait retenu
 *  « le nitrate, c’est mille et quelque » ne peut pas la resservir ici.
 *  Graduation de 25 g/L, tolérance calculée de ±12,5 g/L. */
const COURBE_CHLORATE = Object.freeze({
  titre: 'Solubilité du chlorate de potassium dans l’eau',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 80, pas: 10 }),
  y: Object.freeze({ titre: 'Solubilité (g/L)', min: 0, max: 400, pas: 25 }),
  points: Object.freeze([[0, 30], [10, 50], [20, 75], [30, 100], [40, 135], [50, 180], [60, 240], [70, 300], [80, 375]].map(Object.freeze)),
  relie: true,
});

/** Auto-évaluation. Le bicarbonate : croissance douce, graduation de 10 g/L,
 *  donc une tolérance serrée (±5 g/L). C’est la courbe où lire au jugé ne
 *  passe pas. */
const COURBE_BICARBONATE = Object.freeze({
  titre: 'Solubilité de l’hydrogénocarbonate de sodium (bicarbonate) dans l’eau',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 60, pas: 10 }),
  y: Object.freeze({ titre: 'Solubilité (g/L)', min: 50, max: 180, pas: 10 }),
  points: Object.freeze([[0, 70], [10, 80], [20, 95], [30, 110], [40, 125], [50, 145], [60, 165]].map(Object.freeze)),
  relie: true,
});

/** Auto-évaluation. La même série, avec une pesée faite sans avoir remis la
 *  balance à zéro sur son support : la valeur tombe à la MOITIÉ de ce qu’elle
 *  devrait valoir. L’écart franc vers le bas est la panne la plus banale de
 *  toutes, et le prédicat du piège la lit dans ce sens-là aussi. */
const ESSAIS_BICARBONATE = Object.freeze({
  titre: 'Sept pesées d’un binôme : masse de bicarbonate dissoute dans un litre d’eau',
  x: Object.freeze({ titre: 'Température (°C)', min: 0, max: 60, pas: 10 }),
  y: Object.freeze({ titre: 'Masse dissoute (g/L)', min: 50, max: 180, pas: 10 }),
  points: Object.freeze([[0, 70], [10, 80], [20, 95], [30, 55], [40, 125], [50, 145], [60, 165]].map(Object.freeze)),
  relie: true,
});

/** La courbe du nitrate AVEC les pointillés du geste de lecture — monter depuis
 *  l’abscisse, puis lire à gauche. Elle n’existe que pour la méthode : sur un
 *  item, elle donnerait la réponse. C’est pourquoi elle est un objet à part et
 *  non un champ ajouté à `COURBE_NITRATE`. */
const COURBE_NITRATE_MONTREE = Object.freeze({
  ...COURBE_NITRATE,
  titre: 'Lire la solubilité du nitrate de potassium à 40 °C',
  reperes: Object.freeze([Object.freeze([40, 650])]),
});

// ════════════════════════════════════════════════════════════════════════════
// La découverte, le cours, la méthode
// ════════════════════════════════════════════════════════════════════════════
//
// Ce ne sont PAS des items : ils ne passent pas par `validerItem`, ils ne
// portent ni palier ni cercle, ils ne sont jamais tirés par `seance.js`. Ils
// portent une figure engendrée comme les items, par le même module.

export const DECOUVERTE = Object.freeze({
  id: 'ch01-sf6-decouverte',
  titre: 'Pourquoi une courbe, et pas un nombre',
  figure: Object.freeze({ sorte: 'graphique', donnees: COURBE_NITRATE }),
  texte: [
    'Tu sais déjà qu’un litre d’eau ne peut pas dissoudre n’importe quelle masse '
    + 'de sel : à un moment, il en reste au fond. Cette masse maximale porte un nom '
    + '— la solubilité — et une unité : des grammes par litre, g/L.',
    'Ce que tu ne sais peut-être pas encore, c’est qu’elle n’a pas UNE valeur. Elle '
    + 'en a une par température. Voilà pourquoi on ne peut pas l’écrire dans un '
    + 'tableau à une seule case, et pourquoi on la donne sous forme de courbe : '
    + 'l’axe du bas porte la température, l’axe de gauche la solubilité.',
    'Regarde la courbe ci-contre. Elle monte, et elle monte fort : entre l’eau '
    + 'froide et l’eau chaude, la solubilité du nitrate de potassium est multipliée '
    + 'par plus de dix. Retiens tout de suite qu’il n’en va pas ainsi de tous les '
    + 'solides — celle du sel de cuisine, elle, ne bouge presque pas, et tu la '
    + 'verras plus loin.',
  ],
});

export const COURS = Object.freeze({
  id: 'ch01-sf6-cours',
  titre: 'Lire et exploiter une courbe de solubilité',
  figure: Object.freeze({ sorte: 'graphique', donnees: COURBE_SEL }),
  points: Object.freeze([
    Object.freeze({
      titre: 'Ce que la courbe dit',
      texte: 'Pour une température donnée, la courbe donne la masse maximale de soluté '
        + 'qu’un litre d’eau peut dissoudre à cette température. On l’écrit en g/L. '
        + 'Au-dessus de la courbe, il reste du solide au fond : la solution est saturée. '
        + 'En dessous, tout est dissous.',
    }),
    Object.freeze({
      titre: 'Saturée, à partir de quand',
      texte: 'Si tu connais la masse dissoute dans un litre, tu peux remonter à la '
        + 'température : c’est la lecture dans l’autre sens. Au-dessus de cette '
        + 'température, tout tient dans l’eau ; en dessous, l’eau ne peut plus tout '
        + 'garder.',
    }),
    Object.freeze({
      titre: 'Refroidir une solution saturée',
      texte: 'C’est le geste qui fait toute la différence entre savoir lire une courbe '
        + 'et savoir s’en servir. Une solution saturée qu’on refroidit ne peut plus '
        + 'garder tout ce qu’elle contenait : la différence entre les deux solubilités '
        + 'se dépose au fond, en cristaux. Pour un litre, cette différence EST la masse '
        + 'de cristaux, en grammes.',
    }),
    Object.freeze({
      titre: 'Toutes les courbes ne montent pas de la même façon',
      texte: 'Celle du sel de cuisine, ci-contre, est presque plate : chauffer l’eau ne '
        + 'sert quasiment à rien pour dissoudre du sel. « Ça se dissout mieux à chaud » '
        + 'est vrai pour beaucoup de solides, pas pour tous, et jamais pour les gaz — '
        + 'la courbe d’un gaz descend quand on chauffe.',
    }),
    Object.freeze({
      titre: 'L’unité, toujours',
      texte: 'Une solubilité est une masse POUR UN VOLUME : elle s’écrit en g/L. Une '
        + 'masse de cristaux, elle, s’écrit en g. Ce ne sont pas les mêmes grandeurs, '
        + 'et l’unité est ce qui les distingue — pas le nombre.',
    }),
  ]),
});

export const METHODE = Object.freeze({
  id: 'ch01-sf6-methode',
  titre: 'Lire une valeur sur une courbe, puis l’exploiter',
  figure: Object.freeze({ sorte: 'graphique', donnees: COURBE_NITRATE_MONTREE }),
  etapes: Object.freeze([
    Object.freeze({
      titre: 'Repère l’axe avant le point',
      texte: 'Lis d’abord les deux titres d’axes et leurs unités. Sur cette courbe, le '
        + 'bas porte des °C et la gauche des g/L : c’est déjà la moitié de la réponse, '
        + 'et c’est ce qui t’évitera de donner une température quand on demande une '
        + 'solubilité.',
    }),
    Object.freeze({
      titre: 'Monte, puis va à gauche',
      texte: 'Place-toi sur la température demandée, monte à la verticale jusqu’à la '
        + 'courbe, puis file à l’horizontale jusqu’à l’axe de gauche. Les pointillés '
        + 'de la figure montrent ce geste pour 40 °C.',
    }),
    Object.freeze({
      titre: 'Lis entre les graduations, sans inventer',
      texte: 'Si le point tombe entre deux graduations, annonce la moitié : c’est la '
        + 'précision que la courbe permet, ni plus, ni moins. Une réponse à la '
        + 'demi-graduation près est comptée juste.',
    }),
    Object.freeze({
      titre: 'Écris l’unité avant le nombre',
      texte: 'Fais l’opération sur les unités seules : des g/L retranchés à des g/L '
        + 'donnent des g/L ; des g/L multipliés par des L donnent des g. C’est l’unité '
        + 'qui te dit si tu as répondu à la question posée.',
    }),
    Object.freeze({
      titre: 'Regarde la série avant de calculer',
      texte: 'Quand ce sont des essais d’élèves et non une courbe de référence, ne range '
        + 'PAS les mesures par valeur : ici elles sont rangées par température, et c’est '
        + 'cet ordre-là qui les rend lisibles. Suis-les de la plus froide à la plus '
        + 'chaude et regarde si l’une casse le mouvement des autres — elle redescend '
        + 'quand tout monte, ou elle saute bien plus haut que ses deux voisines. '
        + 'Celle-là se signale, se commente, et se met de côté EN L’ÉCRIVANT — on ne '
        + 'l’efface jamais. Pour l’estimer autrement, encadre-la par ses deux voisines.',
    }),
  ]),
});

// ════════════════════════════════════════════════════════════════════════════
// Entraînement — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 · palier 1 — la lecture d’ordonnée, le geste de base ─────────────
  //
  // Classe B : la figure et la correction sont la MÊME constante. La tolérance
  // n’est pas saisie, elle vaut une demi-graduation de l’axe des ordonnées,
  // soit ±50 g/L, et `schema.js` la calcule.
  {
    id: 'ch01-sf6-e01-lire-la-solubilite-a-20-degres',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'courbe-de-reference-du-nitrate',
    enonce: 'Voici la courbe de solubilité du nitrate de potassium. Quelle masse de '
      + 'nitrate un litre d’eau peut-il dissoudre au maximum à 20 °C ? Donne la valeur '
      + 'avec son unité.',
    figure: { sorte: 'graphique', donnees: COURBE_NITRATE },
    reponse: {
      objetFormel: COURBE_NITRATE,
      valeur: [300, 1],
      unite: 'g/L',
      semantique: 'tolerante',
    },
    motifSansModeleErrone: 'Les deux fautes de lecture réelles — se tromper d’axe, lire à '
      + 'la graduation voisine — sont des GESTES, pas des modèles calculables : l’item ne '
      + 'porte aucune donnée à partir de laquelle une chaîne fausse pourrait être rejouée, '
      + 'puisque la seule donnée est la courbe. La demi-graduation calculée sépare déjà la '
      + 'lecture voisine de la bonne.',
  },

  // ── e02 · palier 1 — la lecture d’abscisse, et pourquoi elle est exacte ──
  //
  // La réponse est une TEMPÉRATURE : la demi-graduation de l’axe des ordonnées
  // ne veut rien dire ici (elle rendrait ±50 °C). L’item est donc `exacte` et
  // sa réponse tombe sur une graduation de l’axe des températures.
  {
    id: 'ch01-sf6-e02-a-partir-de-quelle-temperature',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'bocal-de-nitrate-qu-on-chauffe',
    enonce: 'On veut dissoudre entièrement {{donnee:masse}} de nitrate de potassium dans '
      + '{{donnee:volume}} d’eau. À partir de quelle température tout est-il dissous ? '
      + 'Lis-la sur la courbe et donne-la avec son unité.',
    donnees: {
      masse: { valeur: [650, 1], unite: 'g' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_NITRATE },
    reponse: {
      objetFormel: COURBE_NITRATE,
      valeur: [40, 1],
      unite: '°C',
      semantique: 'exacte',
    },
  },

  // ── e03 · palier 1 — refroidir, et la première unité composée ────────────
  //
  // Classe A : la chaîne est rejouée en rationnels exacts, et elle porte les
  // dimensions. `g/L − g/L → g/L`, puis `g/L × L → g` : c’est là que le piège
  // de l’unité mord, et le volume vaut UN litre pour que la demi-graduation de
  // l’axe (±50 g/L) et la fenêtre sur la masse (±50 g) coïncident exactement.
  {
    id: 'ch01-sf6-e03-refroidir-un-litre-de-60-a-20',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'becher-qu-on-laisse-refroidir-sur-la-paillasse',
    enonce: 'On a saturé {{donnee:volume}} d’eau en nitrate de potassium à '
      + '60 °C. On laisse refroidir jusqu’à 20 °C. La courbe donne {{donnee:s60}} à '
      + '60 °C et {{donnee:s20}} à 20 °C. Quelle masse de nitrate se dépose au fond ? '
      + 'Donne la valeur avec son unité.',
    donnees: {
      s60: { valeur: [1100, 1], unite: 'g/L' },
      s20: { valeur: [300, 1], unite: 'g/L' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_NITRATE },
    calcul: {
      etapes: [
        { id: 'ecart', expr: '@s60 - @s20', unite: 'g/L' },
        { id: 'cristaux', expr: '#ecart × @volume', unite: 'g' },
      ],
      reponse: 'cristaux',
    },
    reponse: { valeur: [800, 1], unite: 'g', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'tout-ce-qui-etait-dissous',
        // PAS de `piege`, et c’est délibéré. Cet élève écrit 1100 **g** : la
        // nature de sa réponse est juste, son algèbre d’unités est juste
        // (g/L × L → g), et le `controle` d’`unite-absente-ou-fausse` — « fais
        // l’opération sur les unités seules » — la VALIDE. Le rattacher à ce
        // piège ferait diagnostiquer un rapport à la dimension là où la faute
        // est un modèle du refroidissement : « tout ce qui était dissous
        // ressort ». Aucun des 31 pièges du catalogue ne porte cette
        // conception ; le modèle reste exécutable et discriminant, ce que le
        // schéma demande, et il ne prétend rien de plus.
        nom: 'modèle « en refroidissant, tout ressort » : l’élève rend la masse dissoute à '
          + '60 °C au lieu de la différence',
        calcul: {
          etapes: [{ id: 'm', expr: '@s60 × @volume', unite: 'g' }],
          reponse: 'm',
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g',
      unitesPresentesDansLEnonce: ['g/L', 'L'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'l-unite-calculee-avant-le-nombre',
  },

  // ── e04 · palier 2 — l’objet-support change : la courbe qui ne monte pas ──
  {
    id: 'ch01-sf6-e04-le-sel-a-80-degres',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'casserole-d-eau-salee-sur-le-feu',
    enonce: 'Voici maintenant la courbe du sel de cuisine. Quelle est sa solubilité à '
      + '80 °C ? Donne la valeur avec son unité, et regarde au passage l’écart avec sa '
      + 'valeur à froid.',
    figure: { sorte: 'graphique', donnees: COURBE_SEL },
    reponse: {
      objetFormel: COURBE_SEL,
      valeur: [385, 1],
      unite: 'g/L',
      semantique: 'tolerante',
    },
    motifSansModeleErrone: 'Aucune donnée chiffrée dans l’énoncé, donc aucune chaîne fausse '
      + 'à rejouer : la faute possible est de lire l’axe du bas, et la demi-graduation de '
      + '5 g/L la sépare largement de la bonne réponse.',
  },

  // ── e05 · palier 2 — la grandeur en jeu change, et c’est le format
  //         diagnostique de l’unité ─────────────────────────────────────────
  //
  // L’énoncé porte des g et des L, la réponse demande des g/L : le modèle de
  // l’élève — « je recopie l’unité de l’énoncé » — ne peut pas gagner ici, ce
  // qui est la quatrième exigence de la condition de validité du piège.
  {
    id: 'ch01-sf6-e05-neuf-cents-grammes-dans-deux-litres',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'bidon-de-deux-litres-en-atelier',
    enonce: 'Un atelier dissout au maximum {{donnee:masse}} de nitrate de potassium dans '
      + '{{donnee:volume}} d’eau à 30 °C. Quelle est la solubilité du nitrate à cette '
      + 'température ? Donne la valeur avec son unité, puis vérifie-la sur la courbe.',
    donnees: {
      masse: { valeur: [900, 1], unite: 'g' },
      volume: { valeur: [2, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_NITRATE },
    calcul: {
      etapes: [{ id: 's', expr: '@masse ÷ @volume', unite: 'g/L' }],
      reponse: 's',
    },
    reponse: { valeur: [450, 1], unite: 'g/L', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'divise-comme-s-il-y-avait-un-litre',
        nom: 'modèle « un litre par défaut » : l’élève garde la masse telle quelle et la '
          + 'donne en g/L sans regarder le volume. `@volume ÷ 2` est l’écriture exacte '
          + 'd’« un litre » sans ajouter de donnée fantôme à l’item.',
        piege: 'unite-absente-ou-fausse',
        calcul: {
          etapes: [{ id: 'x', expr: '@masse ÷ (@volume ÷ 2)', unite: 'g/L' }],
          reponse: 'x',
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g/L',
      unitesPresentesDansLEnonce: ['g', 'L'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'trois-copies-un-meme-calcul',
    estFormatDiagnostique: true,
    motifFormatDiagnostique: 'Saisie libre, valeur et unité dans deux champs distincts, '
      + 'l’état « sans unité » disponible — jamais un QCM d’unités. La grandeur demandée '
      + 'est COMPOSÉE (une masse pour un volume) et l’énoncé porte deux unités différentes, '
      + 'des g et des L, dont aucune n’est celle de la réponse : recopier ne peut pas '
      + 'suffire, ce qui est la condition que le piège exige pour que l’item mette le '
      + 'modèle de l’élève en défaut au lieu de le conforter.',
  },

  // ── e06 · palier 2 — la série qui tord la courbe ─────────────────────────
  //
  // Rien n’annonce l’anomalie et la tâche demandée est une EXPLOITATION : ce
  // sont les deux premières exigences du prédicat, et elles se lisent sur
  // `situation`, jamais sur un drapeau. La mesure de 30 °C vaut le double de ce
  // que la courbe donne ; l’exploitation consiste à l’écarter et à encadrer par
  // ses voisines.
  {
    id: 'ch01-sf6-e06-le-point-qui-tord-la-courbe',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    sfSollicites: ['ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'compte-rendu-manuscrit-d-un-groupe-de-quatrieme',
    enonce: 'Un groupe a reporté ses sept essais sur ce graphique. D’après leurs mesures, '
      + 'quelle est la solubilité du nitrate de potassium à 30 °C ? Donne la valeur avec '
      + 'son unité, et écris en une phrase comment tu l’as obtenue.',
    donnees: {
      s20: { valeur: [300, 1], unite: 'g/L' },
      s40: { valeur: [650, 1], unite: 'g/L' },
      s30Mesure: { valeur: [900, 1], unite: 'g/L' },
    },
    figure: { sorte: 'graphique', donnees: ESSAIS_NITRATE },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@s20 + @s40', unite: 'g/L' },
        { id: 'milieu', expr: '#somme ÷ 2', unite: 'g/L' },
      ],
      reponse: 'milieu',
    },
    reponse: { valeur: [475, 1], unite: 'g/L', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'garde-la-mesure-du-pic',
        nom: 'modèle « toutes les mesures se valent » : l’élève lit le point de 30 °C tel '
          + 'qu’il est reporté, sans regarder ce que ses voisins imposent',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [{ id: 'x', expr: '@s30Mesure × 1', unite: 'g/L' }],
          reponse: 'x',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [100, 200, 300, 900, 650, 850, 1100],
      repereeParLEnonce: false,
      aberrante: { index: 3, facteur: 2 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'le-point-qui-tord-la-courbe',
    estFormatDiagnostique: true,
    motifFormatDiagnostique: 'Nuage de sept mesures servi SANS aucune consigne de repérage : '
      + 'la question porte sur une exploitation — donner une solubilité — et jamais sur '
      + '« repère l’erreur ». Rien dans l’énoncé, le titre de la figure ou la légende ne '
      + 'signale qu’une mesure est fautive, et l’écart est franc (le double). C’est le seul '
      + 'format où l’élève qui ne regarde jamais sa série paie de ne pas l’avoir regardée.',
  },

  // ── e07 · palier 3 — le mode de réponse change : double QCM ──────────────
  //
  // Classe C, la seule sans garantie mécanique : comptée, plafonnée, relue, et
  // scellée sur l’item ENTIER moins le bloc `relu` — parce que ce qui est
  // risqué dans un double QCM, ce ne sont pas les énoncés, ce sont les
  // justifications. Aucune figure : le type ne l’autorise pas, la série est
  // donc décrite en toutes lettres.
  {
    id: 'ch01-sf6-e07-que-fait-on-de-cette-mesure',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'discussion-de-fin-de-seance-entre-deux-binomes',
    enonce: 'Un groupe a relevé, pour le nitrate de potassium : à 0 °C, 100 g/L ; à 10 °C, '
      + '200 g/L ; à 20 °C, 300 g/L ; à 30 °C, 900 g/L ; à 40 °C, 650 g/L ; à 50 °C, '
      + '850 g/L ; à 60 °C, 1100 g/L. Ils doivent en tirer la courbe. Que font-ils de la '
      + 'mesure de 30 °C ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'on-la-signale-et-on-trace-sans-elle',
      choixPossibles: [
        'on-la-garde-comme-les-autres',
        'on-la-signale-et-on-trace-sans-elle',
        'on-l-efface-du-compte-rendu',
      ],
    },
    justifications: [
      {
        id: 'ecrite-commentee-mise-de-cote',
        texte: 'Elle est trop loin de ses voisines pour être une mesure ordinaire : on '
          + 'l’écrit, on dit ce qui a pu se passer, et on trace sans elle en le précisant.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'ce-serait-tricher-de-l-enlever',
        texte: 'On n’a pas le droit d’enlever une mesure, ce serait tricher : elle a été '
          + 'faite, donc elle compte comme les autres.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Raisonnement-élève « on-n-a-pas-le-droit-d-enlever-une-mesure » du piège '
          + '« valeur-aberrante-d-une-serie-non-reperee », js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'la-courbe-lissera',
        texte: 'On la garde : quand on trace la courbe, elle passe au milieu et l’écart se '
          + 'rattrape tout seul.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Raisonnement-élève « la-moyenne-absorbe-tout » du piège '
          + '« valeur-aberrante-d-une-serie-non-reperee », js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'la-solubilite-augmente-avec-la-temperature',
        texte: 'La solubilité augmente avec la température, c’est la règle du cours, donc la '
          + 'courbe monte et il n’y a rien d’autre à dire.',
        juste: false,
        // Conforme, récitée, et sans adhésion : la phrase du cours est vraie
        // ici, et elle ne répond pas à la question posée. C’est le cas que le
        // double QCM existe pour séparer de la compréhension.
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [100, 200, 300, 900, 650, 850, 1100],
      repereeParLEnonce: false,
      aberrante: { index: 3, facteur: 2 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'la-moyenne-avec-et-sans',
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: 'dac139444c7d85b0',
    },
  },

  // ── e08 · palier 3 — le mode de réponse change encore : on engage l’unité
  //         AVANT le nombre ─────────────────────────────────────────────────
  //
  // Pas de figure (le type ne l’autorise pas), et pas de tolérance : le calcul
  // est exact. Ce qui est verrouillé, c’est l’unité — et c’est exactement le
  // geste que le `controle` du piège demande.
  {
    id: 'ch01-sf6-e08-ecris-l-unite-avant-le-nombre',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'seau-de-trois-litres-dans-un-atelier-de-teinture',
    enonce: 'À 20 °C, la courbe donne {{donnee:s20}} pour le nitrate de potassium. On veut '
      + 'saturer {{donnee:volume}} d’eau à cette température. Écris d’abord l’unité que '
      + 'portera ta réponse, puis la valeur : ta prédiction sera verrouillée avant le '
      + 'résultat.',
    donnees: {
      s20: { valeur: [300, 1], unite: 'g/L' },
      volume: { valeur: [3, 1], unite: 'L' },
    },
    calcul: {
      etapes: [{ id: 'm', expr: '@s20 × @volume', unite: 'g' }],
      reponse: 'm',
    },
    reponse: { valeur: [900, 1], unite: 'g', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g',
      unitesPresentesDansLEnonce: ['g/L', 'L'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'l-unite-calculee-avant-le-nombre',
  },

  // ── e09 · palier 4 — le rituel de contrôle ───────────────────────────────
  //
  // Le geste de contrôle, pas l’automatisme de calcul : faire l’opération sur
  // les unités seules avant de toucher aux nombres. `rituelDeControle` l’exclut
  // de la fenêtre des cinq séances — sinon il sature mécaniquement le cercle 1,
  // dont il relève presque entièrement.
  {
    id: 'ch01-sf6-e09-rituel-l-unite-d-une-solubilite',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'ouverture-de-seance-au-tableau',
    enonce: 'Rituel. {{donnee:volume}} d’eau à 20 °C dissout au maximum {{donnee:masse}} de '
      + 'sel de cuisine. Fais l’opération sur les unités seules avant de toucher aux '
      + 'nombres, puis donne la solubilité du sel à 20 °C avec son unité.',
    donnees: {
      masse: { valeur: [360, 1], unite: 'g' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    calcul: {
      etapes: [{ id: 's', expr: '@masse ÷ @volume', unite: 'g/L' }],
      reponse: 's',
    },
    reponse: { valeur: [360, 1], unite: 'g/L', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g/L',
      unitesPresentesDansLEnonce: ['g', 'L'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'trois-copies-un-meme-calcul',
    rituelDeControle: true,
  },

  // ── e10 · palier 4 — la série PROPRE ─────────────────────────────────────
  //
  // Obligatoire au vivier : `aberrante: null`. Une section où toute série
  // servie porte une valeur à jeter enseigne « il y en a toujours une », et
  // l’élève réussit sans plus rien regarder. Ici il n’y a rien à écarter, et
  // c’est cela qu’il faut voir.
  {
    id: 'ch01-sf6-e10-la-serie-sans-rien-a-jeter',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    sfSollicites: ['ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'affichage-des-resultats-de-toute-la-classe',
    enonce: 'Voici les six essais d’un autre groupe, dans les mêmes conditions. D’après '
      + 'leurs mesures, quelle est la solubilité du nitrate de potassium à 40 °C ? Donne la '
      + 'valeur avec son unité.',
    figure: { sorte: 'graphique', donnees: ESSAIS_PROPRES },
    reponse: {
      objetFormel: ESSAIS_PROPRES,
      valeur: [660, 1],
      unite: 'g/L',
      semantique: 'tolerante',
    },
    motifSansModeleErrone: 'Il n’y a rien à écarter : le modèle erroné du piège — garder la '
      + 'mesure hors du lot — n’a pas de mesure sur laquelle s’appliquer, et en fabriquer '
      + 'une reviendrait à mettre dans la série l’anomalie que cet item existe pour ne PAS '
      + 'y mettre.',
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [110, 190, 310, 440, 660, 840],
      repereeParLEnonce: false,
      aberrante: null,
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'la-moyenne-avec-et-sans',
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// Problèmes — 5 items
// ════════════════════════════════════════════════════════════════════════════
//
// Plusieurs lectures, plusieurs étapes, et le palier non étiqueté en majorité :
// c’est là que se joue le contrat didactique, puisque rien n’annonce le
// chapitre.

export const PROBLEMES = Object.freeze([

  // ── p01 · palier 4 — le sirop ────────────────────────────────────────────
  {
    id: 'ch01-sf6-p01-le-sirop-qui-cristallise',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'sirop-de-sucre-oublie-au-frais',
    enonce: 'On fait un sirop en saturant {{donnee:volume}} d’eau en sucre à 80 °C, '
      + 'puis on l’oublie au frais jusqu’à 20 °C. Le lendemain, des cristaux se sont '
      + 'déposés au fond. Lis les deux solubilités sur la courbe et donne la masse de sucre '
      + 'déposée, avec son unité.',
    donnees: {
      s80: { valeur: [3600, 1], unite: 'g/L' },
      s20: { valeur: [2050, 1], unite: 'g/L' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_SUCRE },
    calcul: {
      etapes: [
        { id: 'ecart', expr: '@s80 - @s20', unite: 'g/L' },
        { id: 'depot', expr: '#ecart × @volume', unite: 'g' },
      ],
      reponse: 'depot',
    },
    reponse: { valeur: [1550, 1], unite: 'g', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'tout-le-sucre-ressort',
        // Sans `piege` — même raison qu’en e03 : l’élève écrit 3600 g, l’unité
        // est de la bonne nature, et c’est le modèle du refroidissement qui est
        // faux, pas le rapport à la dimension.
        nom: 'modèle « en refroidissant, tout ressort » : l’élève rend la masse dissoute à '
          + 'chaud au lieu de la différence des deux solubilités',
        calcul: {
          etapes: [{ id: 'm', expr: '@s80 × @volume', unite: 'g' }],
          reponse: 'm',
        },
      },
    ],
  },

  // ── p02 · palier 4 — ce qu’on voit, et pourquoi ──────────────────────────
  //
  // Aucun piège d’item : les deux pièges de ce savoir-faire portent sur la
  // série et sur l’unité, et ni l’un ni l’autre n’est en jeu ici. Une
  // justification renvoie en revanche à un piège d’un AUTRE savoir-faire du
  // chapitre — la matière qu’on ne voit plus —, ce qui est exactement ce qu’une
  // justification doit faire : nommer la conception qui la produit.
  {
    id: 'ch01-sf6-p02-que-voit-on-dans-le-becher',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'becher-sorti-du-refrigerateur-le-matin',
    enonce: 'Une solution saturée de nitrate de potassium à 60 °C est laissée à refroidir '
      + 'jusqu’à 20 °C, sans qu’on y touche et sans rien ajouter. Que voit-on dans le '
      + 'bécher ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'des-cristaux-au-fond',
      choixPossibles: [
        'rien-de-nouveau',
        'des-cristaux-au-fond',
        'toute-la-solution-devient-solide',
      ],
    },
    justifications: [
      {
        id: 'l-eau-froide-en-garde-moins',
        texte: 'À 20 °C, un litre d’eau garde bien moins de nitrate qu’à 60 °C : ce que '
          + 'l’eau ne peut plus garder se dépose au fond.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'une-fois-dissous-c-est-fini',
        texte: 'Une fois dissous, le nitrate a disparu : il ne peut pas revenir, il n’existe '
          + 'plus en tant que solide.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Conception « la matière disparaît quand on ne la voit plus », piège '
          + '« matiere-disparait-quand-on-ne-la-voit-plus » du catalogue, famille matière',
        piege: 'matiere-disparait-quand-on-ne-la-voit-plus',
      },
      {
        id: 'le-froid-fige-tout',
        texte: 'Le froid fige la solution entière : elle devient un bloc, comme de l’eau qui '
          + 'gèle.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'la-courbe-monte-donc-rien-ne-change',
        texte: 'La courbe de solubilité monte avec la température : c’est la règle du '
          + 'chapitre, donc rien ne change quand on refroidit.',
        juste: false,
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: '834f608d0f36d9db',
    },
  },

  // ── p03 · palier 3 — la série décrite, la prédiction verrouillée ─────────
  //
  // Le mode de réponse change : plus de figure, plus de nuage, la série est
  // donnée en toutes lettres et la prédiction est engagée avant tout affichage.
  // La mesure de 60 °C vaut le double de ce que ses voisines imposent.
  {
    id: 'ch01-sf6-p03-la-mesure-qui-double',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    sfSollicites: ['ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'cahier-de-laboratoire-recopie-au-propre',
    enonce: 'Un binôme a mesuré la solubilité du sel de cuisine à six températures et noté : '
      + 'à 0 °C, 355 g/L ; à 20 °C, {{donnee:s20}} ; à 40 °C, {{donnee:s40}} ; à 60 °C, '
      + '{{donnee:s60Mesure}} ; à 80 °C, {{donnee:s80}} ; à 100 °C, 398 g/L. Verrouille ta '
      + 'prédiction : quelle valeur retiens-tu pour 60 °C ? Donne-la avec son unité.',
    donnees: {
      s20: { valeur: [360, 1], unite: 'g/L' },
      s40: { valeur: [365, 1], unite: 'g/L' },
      s60Mesure: { valeur: [750, 1], unite: 'g/L' },
      s80: { valeur: [385, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@s40 + @s80', unite: 'g/L' },
        { id: 'milieu', expr: '#somme ÷ 2', unite: 'g/L' },
      ],
      reponse: 'milieu',
    },
    reponse: {
      valeur: [375, 1],
      unite: 'g/L',
      semantique: 'tolerante',
      tolerancePourcent: 2,
      decimalesIntermediaires: 1,
    },
    modelesErrones: [
      {
        id: 'retient-la-mesure-telle-quelle',
        nom: 'modèle « elle a été faite, donc elle vaut » : l’élève retient les 750 g/L sans '
          + 'les confronter à ses voisines, alors que la courbe du sel est plate',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [{ id: 'x', expr: '@s60Mesure × 1', unite: 'g/L' }],
          reponse: 'x',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [355, 360, 365, 750, 385, 398],
      repereeParLEnonce: false,
      aberrante: { index: 3, facteur: 2 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'la-moyenne-avec-et-sans',
  },

  // ── p04 · palier 4 — la critique, en réponse libre ───────────────────────
  //
  // Classe C, et elle est ici à sa place : ce qu’on demande n’est pas une
  // valeur, c’est un raisonnement. Aucun `calcul` — un item qui porterait les
  // deux serait scindable et le contrôleur le refuserait, à raison : désigner
  // une valeur est vérifiable, expliquer pourquoi ne l’est pas.
  {
    id: 'ch01-sf6-p04-chauffer-autant-qu-on-veut',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'phrase-entendue-en-cuisine',
    enonce: 'Un élève écrit : « le sel se dissout de mieux en mieux quand on chauffe, donc '
      + 'en chauffant assez fort on peut en dissoudre autant qu’on veut. » Dis en deux '
      + 'phrases ce qui est juste dans ce raisonnement, et ce qui ne l’est pas. Appuie-toi '
      + 'sur ce que tu as vu de la courbe du sel.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'la solubilité du sel augmente bien avec la température : ce point est juste',
        'mais elle augmente très peu — la courbe du sel est presque plate, l’écart entre '
        + 'l’eau froide et l’eau bouillante reste faible',
        'et il existe toujours une valeur maximale à chaque température : « autant qu’on '
        + 'veut » est faux à toute température',
      ],
    },
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: '576e3ea80200ec02',
    },
  },

  // ── p05 · palier 4 — trois lectures, deux étapes ─────────────────────────
  //
  // Aucune solubilité n’est citée dans l’énoncé : elles sont toutes les trois à
  // lire sur la courbe. Les `donnees` non citées portent le recalcul, elles ne
  // sont pas affichées — c’est la convention posée en tête de fichier.
  {
    id: 'ch01-sf6-p05-refroidir-filtrer-rechauffer',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'protocole-de-recristallisation-decrit-en-trois-lignes',
    enonce: 'On part de {{donnee:volume}} d’eau saturée en nitrate de potassium à '
      + '50 °C. On la refroidit jusqu’à 30 °C, on retire les cristaux déposés, puis on '
      + 'réchauffe le liquide restant jusqu’à 60 °C. Quelle masse de nitrate faut-il encore '
      + 'ajouter pour le saturer à nouveau à 60 °C ? Donne la valeur avec son unité.',
    donnees: {
      s50: { valeur: [850, 1], unite: 'g/L' },
      s30: { valeur: [450, 1], unite: 'g/L' },
      s60: { valeur: [1100, 1], unite: 'g/L' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_NITRATE },
    calcul: {
      etapes: [
        { id: 'manque', expr: '@s60 - @s30', unite: 'g/L' },
        { id: 'aAjouter', expr: '#manque × @volume', unite: 'g' },
      ],
      reponse: 'aAjouter',
    },
    reponse: { valeur: [650, 1], unite: 'g', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'part-de-la-solution-initiale',
        // Sans `piege`. Cet élève suit l’algèbre des unités jusqu’au bout —
        // g/L − g/L → g/L, puis × L → g — et rend 250 g. Ce que le `controle`
        // d’`unite-absente-ou-fausse` demande, il l’a fait ; ce qu’il a manqué,
        // c’est l’état de départ. Le piège de l’unité est muet là-dessus.
        nom: 'modèle « le filtrage n’a rien changé » : l’élève compare 60 °C à l’état de '
          + 'départ (50 °C) et oublie que les cristaux ont emporté de la matière',
        calcul: {
          etapes: [
            { id: 'ecart', expr: '@s60 - @s50', unite: 'g/L' },
            { id: 'm', expr: '#ecart × @volume', unite: 'g' },
          ],
          reponse: 'm',
        },
      },
    ],
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// Auto-évaluation — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Deux autres solutés et une autre série d’essais : aucun énoncé, aucune
// courbe, aucune valeur de l’entraînement ou des problèmes n’est reprise. Un
// test qui recopie ses items se réussit de mémoire, et il mesure alors la
// mémoire.

export const AUTO_EVALUATION = Object.freeze([

  // ── t01 · palier 1 — lecture d’ordonnée ──────────────────────────────────
  {
    id: 'ch01-sf6-t01-chlorate-a-30-degres',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'fiche-de-securite-d-un-produit-de-laboratoire',
    enonce: 'Voici la courbe de solubilité du chlorate de potassium. Quelle est sa '
      + 'solubilité à 30 °C ? Donne la valeur avec son unité.',
    figure: { sorte: 'graphique', donnees: COURBE_CHLORATE },
    reponse: {
      objetFormel: COURBE_CHLORATE,
      valeur: [100, 1],
      unite: 'g/L',
      semantique: 'tolerante',
    },
    motifSansModeleErrone: 'Lecture pure : aucune donnée chiffrée dans l’énoncé, donc aucune '
      + 'chaîne fausse à rejouer. La demi-graduation calculée vaut 12,5 g/L et sépare les '
      + 'graduations voisines de la bonne réponse.',
  },

  // ── t02 · palier 1 — lecture d’abscisse, exacte ──────────────────────────
  {
    id: 'ch01-sf6-t02-a-partir-de-quelle-temperature-le-chlorate',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'preparation-d-une-solution-au-bain-marie',
    enonce: 'On veut dissoudre entièrement {{donnee:masse}} de chlorate de potassium dans '
      + '{{donnee:volume}} d’eau. À partir de quelle température tout est-il dissous ? '
      + 'Lis-la sur la courbe et donne-la avec son unité.',
    donnees: {
      masse: { valeur: [240, 1], unite: 'g' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_CHLORATE },
    reponse: {
      objetFormel: COURBE_CHLORATE,
      valeur: [60, 1],
      unite: '°C',
      semantique: 'exacte',
    },
  },

  // ── t03 · palier 1 — refroidir un litre ──────────────────────────────────
  {
    id: 'ch01-sf6-t03-refroidir-un-litre-de-bicarbonate',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'flacon-de-bicarbonate-range-au-frais',
    enonce: 'On a saturé {{donnee:volume}} d’eau en bicarbonate à 60 °C, puis on laisse '
      + 'revenir à 20 °C. La courbe donne {{donnee:s60}} à 60 °C et {{donnee:s20}} à 20 °C. '
      + 'Quelle masse de bicarbonate se dépose ? Donne la valeur avec son unité.',
    donnees: {
      s60: { valeur: [165, 1], unite: 'g/L' },
      s20: { valeur: [95, 1], unite: 'g/L' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_BICARBONATE },
    calcul: {
      etapes: [
        { id: 'ecart', expr: '@s60 - @s20', unite: 'g/L' },
        { id: 'depot', expr: '#ecart × @volume', unite: 'g' },
      ],
      reponse: 'depot',
    },
    reponse: { valeur: [70, 1], unite: 'g', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'tout-le-bicarbonate-ressort',
        // Sans `piege` — voir e03. La réponse fausse est 165 g : l’unité est de
        // la bonne nature, seul le modèle du refroidissement est en cause.
        nom: 'modèle « en refroidissant, tout ressort » : la masse dissoute à chaud est '
          + 'rendue au lieu de la différence',
        calcul: {
          etapes: [{ id: 'm', expr: '@s60 × @volume', unite: 'g' }],
          reponse: 'm',
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g',
      unitesPresentesDansLEnonce: ['g/L', 'L'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'l-unite-calculee-avant-le-nombre',
  },

  // ── t04 · palier 2 — l’objet-support change ──────────────────────────────
  {
    id: 'ch01-sf6-t04-bicarbonate-a-40-degres',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'recette-de-patisserie-au-bicarbonate',
    enonce: 'Voici la courbe du bicarbonate. Quelle est sa solubilité à 40 °C ? Donne la '
      + 'valeur avec son unité, et regarde de combien elle a changé depuis l’eau froide.',
    figure: { sorte: 'graphique', donnees: COURBE_BICARBONATE },
    reponse: {
      objetFormel: COURBE_BICARBONATE,
      valeur: [125, 1],
      unite: 'g/L',
      semantique: 'tolerante',
    },
    motifSansModeleErrone: 'Lecture pure sur une graduation fine (10 g/L) : la fenêtre '
      + 'calculée vaut ±5 g/L, aucune donnée de l’énoncé n’alimenterait une chaîne fausse, '
      + 'et la faute possible — lire l’axe du bas — n’est pas un modèle exécutable.',
  },

  // ── t05 · palier 2 — la grandeur en jeu change ───────────────────────────
  {
    id: 'ch01-sf6-t05-cinq-cent-quarante-grammes-dans-trois-litres',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'cuve-de-trois-litres-dans-un-atelier-photo',
    enonce: 'À 50 °C, une cuve dissout au maximum {{donnee:masse}} de chlorate de potassium '
      + 'dans {{donnee:volume}} d’eau. Quelle est la solubilité du chlorate à cette '
      + 'température ? Donne la valeur avec son unité, puis vérifie-la sur la courbe.',
    donnees: {
      masse: { valeur: [540, 1], unite: 'g' },
      volume: { valeur: [3, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_CHLORATE },
    calcul: {
      etapes: [{ id: 's', expr: '@masse ÷ @volume', unite: 'g/L' }],
      reponse: 's',
    },
    reponse: { valeur: [180, 1], unite: 'g/L', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'divise-comme-s-il-y-avait-un-litre',
        nom: 'modèle « un litre par défaut » : la masse est rendue telle quelle en g/L. '
          + '`@volume ÷ 3` est l’écriture exacte d’« un litre » à partir des seules données '
          + 'de l’item.',
        piege: 'unite-absente-ou-fausse',
        calcul: {
          etapes: [{ id: 'x', expr: '@masse ÷ (@volume ÷ 3)', unite: 'g/L' }],
          reponse: 'x',
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g/L',
      unitesPresentesDansLEnonce: ['g', 'L'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'trois-copies-un-meme-calcul',
  },

  // ── t06 · palier 2 — la pesée faite sans remettre la balance à zéro ──────
  //
  // L’écart est franc VERS LE BAS : la mesure vaut la moitié de ce que ses
  // voisines imposent. C’est la panne la plus banale de toutes, et le prédicat
  // du piège la lit dans ce sens-là depuis qu’il a été corrigé.
  {
    id: 'ch01-sf6-t06-la-pesee-qui-vaut-la-moitie',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    sfSollicites: ['ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'binome-qui-partage-la-balance-avec-la-paillasse-voisine',
    enonce: 'Un binôme a reporté ses sept pesées de bicarbonate sur ce graphique. D’après '
      + 'ces mesures, quelle est la solubilité du bicarbonate à 30 °C ? Donne la valeur '
      + 'avec son unité, et écris en une phrase comment tu l’as obtenue.',
    donnees: {
      s20: { valeur: [95, 1], unite: 'g/L' },
      s40: { valeur: [125, 1], unite: 'g/L' },
      s30Mesure: { valeur: [55, 1], unite: 'g/L' },
    },
    figure: { sorte: 'graphique', donnees: ESSAIS_BICARBONATE },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@s20 + @s40', unite: 'g/L' },
        { id: 'milieu', expr: '#somme ÷ 2', unite: 'g/L' },
      ],
      reponse: 'milieu',
    },
    reponse: { valeur: [110, 1], unite: 'g/L', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'garde-la-pesee-basse',
        nom: 'modèle « elles ont toutes été faites pareil » : la pesée du creux est lue '
          + 'telle quelle, sans confrontation à ses voisines',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [{ id: 'x', expr: '@s30Mesure × 1', unite: 'g/L' }],
          reponse: 'x',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [70, 80, 95, 55, 125, 145, 165],
      repereeParLEnonce: false,
      aberrante: { index: 3, facteur: 0.5 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'le-point-qui-tord-la-courbe',
  },

  // ── t07 · palier 3 — double QCM ──────────────────────────────────────────
  {
    id: 'ch01-sf6-t07-le-creux-dans-la-serie',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'correction-collective-au-videoprojecteur',
    enonce: 'Un binôme a relevé, pour le bicarbonate : à 0 °C, 70 g/L ; à 10 °C, 80 g/L ; à '
      + '20 °C, 95 g/L ; à 30 °C, 55 g/L ; à 40 °C, 125 g/L ; à 50 °C, 145 g/L ; à 60 °C, '
      + '165 g/L. Que font-ils de la pesée de 30 °C ? Puis choisis la phrase qui dit '
      + 'pourquoi.',
    reponse: {
      libre: false,
      choix: 'on-la-signale-et-on-trace-sans-elle',
      choixPossibles: [
        'on-la-garde-comme-les-autres',
        'on-la-signale-et-on-trace-sans-elle',
        'on-refait-toute-la-serie',
      ],
    },
    justifications: [
      {
        id: 'un-creux-entre-deux-montees',
        texte: 'Toutes les autres montent régulièrement ; celle-là descend puis remonte. '
          + 'C’est le signe qu’il s’est passé quelque chose pendant cette pesée : on '
          + 'l’écrit, on dit quoi, et on trace sans elle.',
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d’accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'aucune-raison-d-en-preferer-une',
        texte: 'Elles ont toutes été faites de la même façon : je n’ai aucune raison d’en '
          + 'préférer une, donc je les garde toutes.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Raisonnement-élève « toutes-les-mesures-se-valent » du piège '
          + '« valeur-aberrante-d-une-serie-non-reperee », js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'une-mesure-basse-n-est-pas-grave',
        texte: 'Une mesure un peu basse ne change rien : la courbe passera au milieu de tout '
          + 'ça et l’écart se rattrapera.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Raisonnement-élève « la-moyenne-absorbe-tout » du piège '
          + '« valeur-aberrante-d-une-serie-non-reperee », js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'il-faut-tout-refaire',
        texte: 'Dès qu’une mesure sort du lot, la série entière est fausse : il faut tout '
          + 'recommencer depuis le début.',
        juste: false,
        provenance: 'locale',
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [70, 80, 95, 55, 125, 145, 165],
      repereeParLEnonce: false,
      aberrante: { index: 3, facteur: 0.5 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'la-moyenne-avec-et-sans',
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: 'feaa7e6e82ce640d',
    },
  },

  // ── t08 · palier 3 — l’unité engagée avant le nombre ─────────────────────
  {
    id: 'ch01-sf6-t08-quatre-litres-a-vingt-degres',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'bidon-de-quatre-litres-a-preparer-la-veille',
    enonce: 'À 20 °C, la courbe donne {{donnee:s20}} pour le chlorate de potassium. On veut '
      + 'saturer {{donnee:volume}} d’eau à cette température. Écris d’abord l’unité que '
      + 'portera ta réponse, puis la valeur : ta prédiction sera verrouillée avant le '
      + 'résultat.',
    donnees: {
      s20: { valeur: [75, 1], unite: 'g/L' },
      volume: { valeur: [4, 1], unite: 'L' },
    },
    calcul: {
      etapes: [{ id: 'm', expr: '@s20 × @volume', unite: 'g' }],
      reponse: 'm',
    },
    reponse: { valeur: [300, 1], unite: 'g', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g',
      unitesPresentesDansLEnonce: ['g/L', 'L'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'l-unite-calculee-avant-le-nombre',
  },

  // ── t09 · palier 4 — non étiqueté, deux lectures ─────────────────────────
  {
    id: 'ch01-sf6-t09-de-quatre-vingts-a-quarante',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'bain-qui-refroidit-pendant-la-nuit',
    enonce: 'On laisse {{donnee:volume}} d’eau saturée en chlorate de potassium '
      + 'passer de 80 °C à 40 °C. Lis les deux solubilités sur la courbe et donne la masse '
      + 'de chlorate qui cristallise, avec son unité.',
    donnees: {
      s80: { valeur: [375, 1], unite: 'g/L' },
      s40: { valeur: [135, 1], unite: 'g/L' },
      volume: { valeur: [1, 1], unite: 'L' },
    },
    figure: { sorte: 'graphique', donnees: COURBE_CHLORATE },
    calcul: {
      etapes: [
        { id: 'ecart', expr: '@s80 - @s40', unite: 'g/L' },
        { id: 'cristaux', expr: '#ecart × @volume', unite: 'g' },
      ],
      reponse: 'cristaux',
    },
    reponse: { valeur: [240, 1], unite: 'g', semantique: 'tolerante' },
    modelesErrones: [
      {
        id: 'tout-ce-qui-etait-dissous',
        // Sans `piege` — voir e03. Réponse fausse 375 g, unité de bonne nature.
        nom: 'modèle « en refroidissant, tout ressort » : la masse dissoute à 80 °C est '
          + 'rendue au lieu de la différence',
        calcul: {
          etapes: [{ id: 'm', expr: '@s80 × @volume', unite: 'g' }],
          reponse: 'm',
        },
      },
    ],
  },

  // ── t10 · palier 4 — la critique, en réponse libre ───────────────────────
  {
    id: 'ch01-sf6-t10-la-courbe-qui-descend',
    sfPrincipal: 'ch01-sf6-exploiter-une-courbe-de-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'affiche-de-vulgarisation-lue-dans-un-couloir',
    enonce: 'Une affiche annonce : « plus c’est chaud, plus ça se dissout — c’est vrai pour '
      + 'tout. » Tu as vu trois courbes cette année. Dis en deux phrases pourquoi cette '
      + 'affirmation est trop générale, et donne un exemple précis qui la met en défaut.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'la solubilité augmente effectivement avec la température pour beaucoup de solides, '
        + 'comme le nitrate de potassium ou le chlorate',
        'mais l’augmentation peut être minuscule : la courbe du sel de cuisine est presque '
        + 'plate, chauffer n’y change quasiment rien',
        'et le sens peut même s’inverser : la solubilité d’un gaz dans l’eau DIMINUE quand '
        + 'on chauffe',
      ],
    },
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: '5623b27a5b74aa25',
    },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// L’export par défaut — les 25 items, dans l’ordre où ils sont travaillés
// ════════════════════════════════════════════════════════════════════════════
//
// Le moteur ne connaît que des items : ni « entraînement », ni « problème », ni
// « auto-évaluation » n’existent dans le schéma, et un champ `section` posé sur
// un item serait refusé (CHAMP_INCONNU). Le découpage vit donc dans les trois
// exports nommés ci-dessus, qui sont des LISTES et non des champs — c’est-à-dire
// à un endroit où il ne peut pas contredire l’item qu’il décrit.

export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...AUTO_EVALUATION]);
