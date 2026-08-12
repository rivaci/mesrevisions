// Chapitre 1, savoir-faire 5 — « Exploiter une série de mesures pour estimer une
// solubilité, et dire pourquoi une seule mesure ne suffit pas ».
//
// Premier contenu du projet. Tout le moteur existait et était testé ; rien
// n’avait encore été écrit contre lui. Ce fichier est donc autant un contenu
// qu’un procès-verbal : ce qui suit dit ce que le schéma a imposé, ce qu’il a
// refusé, et où le savoir-faire s’arrête.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   une situation, aucune règle énoncée
//   COURS        six blocs typés
//   METHODE      un exercice résolu en deux colonnes, geste de contrôle compris
//   ENTRAINEMENT 10 items
//   PROBLEMES     5 items
//   TEST         10 items
//
// L’export par défaut est la concaténation des trois sections d’items — 25 —,
// parce que c’est cette liste-là que `validerItem` et `tools/verifier-contenu.mjs`
// lisent. `DECOUVERTE`, `COURS` et `METHODE` ne sont PAS des items : ils ne
// portent ni classe, ni cercle, ni palier, et les faire passer pour des items
// fausserait tous les dénominateurs de la charte. Le schéma d’item n’a d’ailleurs
// aucun champ « section » — la liste des champs est fermée, un champ inconnu est
// refusé — et c’est la bonne décision : la place d’un item dans un chapitre est
// une affaire de mise en page, pas de garantie.
//
// ── Répartition des classes de garantie ────────────────────────────────────
//
//   A       15    la chaîne est rejouée en rationnels exacts, avec dimensions
//   A_TABLE  1    une requête sur la table centrale sourcée
//   B        4    la correction est CALCULÉE à partir du même objet formel que
//                 l’énoncé — voir `manqueDe` plus bas
//   C        5    relu par un humain, scellé ; 5 sur 25, soit 20 %, sous le tiers
//
// Les quatre items de classe B ne portent pas de figure : ils portent un dossier
// documentaire, et leur correction (« il manque le volume d’eau », « ces deux
// grandeurs-là ne servent pas ») n’est pas saisie, elle est DÉRIVÉE du dossier
// par `manqueDe` et `superfluDe` — `t07`, décidable, n’a rien qui manque et sort
// donc sa correction du second. C’est exactement ce que la
// classe B garantit — l’accord entre l’énoncé et la correction par engendrement
// — et il se trouve que ça vaut pour un dossier comme pour un schéma. Écrire la
// grandeur manquante à la main aurait rouvert la seule faille que cette classe
// existe pour fermer : un énoncé qu’on modifie et une correction qui ne suit pas.
//
// ── Les séries sont des figures engendrées ─────────────────────────────────
//
// Aucune série n’est écrite deux fois. Chaque `SERIE_*` ci-dessous est l’unique
// exemplaire : la figure la rend (tableau ou nuage de points, `schema.js`), le
// bloc `donnees` la reprend mesure par mesure pour la chaîne de calcul, et la
// `situation` la redonne au prédicat du piège. Une valeur aberrante déplacée
// dans la figure sans l’être dans les données produirait un item où le dessin et
// la correction ne parlent pas de la même expérience ; c’est ce que l’invariant 6
// refuse, et c’est la raison pour laquelle les points sont écrits UNE fois.
//
// Quinze séries sont écrites, servies par 12 tableaux et 3 nuages de points ;
// sept portent une mesure fautive, huit sont saines.
//
// Bénéfice mesurable : sur les trois items servis en nuage de points (`e03`,
// `p04`, `t02`), la tolérance n’est pas saisie — `fenetreDeTolerance` la calcule,
// une demi-graduation de l’axe des ordonnées. Sur `e03`, l’axe est gradué de 10
// en 10 g/L, donc la fenêtre vaut ± 5 g/L, et personne n’a eu à en décider.
//
// ── Ce que le schéma a refusé, et qui a changé le contenu ──────────────────
//
//   · **Un double QCM ne peut pas porter de figure.** `SORTES_PAR_TYPE` n’ouvre
//     de figure qu’aux types `lecture`, `schema-circuit` et `schema-particulaire` ;
//     une figure sur un `double-qcm` est refusée (FIGURE_HORS_TYPE). Les cinq
//     doubles QCM de ce fichier donnent donc EN TOUTES LETTRES dans l’énoncé ce
//     qu’une figure aurait porté — une série pour `e05`, `p03` et `t05`, un
//     relevé pour `e08` et `t09`. C’est une vraie limite, pas une élégance : la
//     série y est du
//     texte, pas un objet formel, et rien ne garantit mécaniquement qu’elle
//     s’accorde à la `situation` déclarée juste en dessous. Les cinq sont de
//     classe C pour cette raison même — c’est le seul endroit du fichier où la
//     relecture humaine porte autre chose qu’une justification.
//   · **`mg` n’existe pas pour l’auteur.** Le lexique auteur est une liste
//     blanche fermée et n’admet aucun préfixe : `g`, `kg`, `t`, `L`, `mL` — pas
//     `mg`. Les milligrammes ont disparu des énoncés.
//   · **`g/100 mL` est refusé** (FACTEUR_NUMERIQUE) : une unité ne porte pas de
//     facteur numérique. Toutes les solubilités de ce fichier s’écrivent en g/L.
//     L’élève qui répond en g/mL a raison et le moteur l’accepte : l’unité n’est
//     imposée nulle part ici (`unite: 'libre'` au catalogue), et le verdict rendu
//     est UNITE_NON_DEMANDEE, accepté, signalé.
//   · **Un item ne peut pas porter à la fois un calcul et une réponse libre**
//     (ITEM_SCINDABLE_NON_SCINDE). « Donne la solubilité » et « explique pourquoi
//     tu écartes la sixième mesure » sont deux items, jamais un seul en classe C.
//   · **Un modèle erroné doit sortir de la fenêtre.** Sur `e02`, la série est
//     saine : écarter la mesure la plus éloignée donne 319,5 g/L, qui tombe dans
//     la tolérance. Aucun modèle erroné n’y est donc défendable, et
//     `motifSansModeleErrone` l’écrit au lieu d’en inventer un.
//
// ── Les trois pièges, et leur couverture ───────────────────────────────────
//
//   valeur-aberrante-d-une-serie-non-reperee        11 items, paliers 1 à 4
//   unite-absente-ou-fausse                          5 items, paliers 2 à 4
//   donnees-superflues-et-questions-sans-reponse     7 items, paliers 1 à 4
//   aucun piège                                      2 items (`p05`, `t10`)
//
// Chacun des trois porte un item au palier non étiqueté, un item déclaré au
// format diagnostique du piège avec son motif écrit, et deux dimensions de
// variation DISTINCTES entre les paliers 2 et 3 — sans quoi le refus
// MEME_DIMENSION_AUX_DEUX_PALIERS n’aurait rien à mordre. Ces deux dimensions
// sont, dans l’ordre des trois pièges : objet-support / mode-de-reponse,
// grandeur-en-jeu / mode-de-reponse, objet-support / sens-du-changement.
//
// `e02` est l’item de série SAINE du piège de la mesure aberrante — le seul du
// fichier à déclarer `aberrante: null` au prédicat. Ce n’est pas de la
// décoration : le piège l’exige explicitement, parce que « il y en a toujours une
// à jeter » est un contrat didactique, pas un contrôle, et que ce serait
// exactement celui que ce piège prétend défaire. Quatre items posent une question
// à laquelle ON NE PEUT PAS RÉPONDRE (`e07`, `e08`, `p02`, `t04`), et l’option
// « on ne peut pas répondre, il manque… » est offerte à CHACUNE des questions
// servies sur un dossier ou un relevé — les sept items du piège du contrat, plus
// `e05` —, y compris là où elle est fausse : `e06`, `t07` et `t09` la portent sur
// des questions parfaitement décidables. Servie seulement là où elle est bonne,
// sa seule présence donnerait la réponse. Elle n’est PAS offerte sur les items à
// saisie libre, où il n’y a pas de liste de choix : le piège n’en demande pas
// tant, et l’écrire ici serait s’attribuer une couverture qu’on n’a pas.
//
// ── D’où viennent les justifications des doubles QCM ───────────────────────
//
// Le corpus d’énoncés d’élèves n’existe pas encore. Les justifications fausses
// sont donc `reformulee`, et leur `deriveDe` cite ce qui les porte réellement :
// les `raisonnements` du catalogue des pièges, qui sont écrits en voix d’élève et
// vérifiables dans `js/data/pieges/contrat.js`. Les justifications justes sont
// `locale` — écrites ici, sans source empruntée. Aucune citation institutionnelle
// n’est inventée : c’est le point sur lequel un contenu scolaire se disqualifie
// le plus vite, et une provenance graduée existe précisément pour ne pas avoir à
// mentir en attendant le corpus.
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ───────────────────────────────────
//
//   · **Le geste expérimental.** On ne pèse pas, on n’agite pas, on ne filtre
//     pas. Tous les énoncés décrivent une manipulation DÉJÀ FAITE et demandent de
//     l’exploiter, de la critiquer ou de dire ce qui manque. L’application l’écrit
//     à l’élève dans le cours ; un énoncé qui ferait « mettre en œuvre » un
//     protocole serait hors périmètre, et il n’y en a aucun ici.
//   · **La solubilité en fonction de la température** — courbe, lecture,
//     interpolation : c’est `ch01-sf6-exploiter-une-courbe-de-solubilite`. Ici la
//     température est FIXÉE et déclarée dans chaque énoncé ; elle n’apparaît
//     comme grandeur qu’une fois, dans `t04`, où son ABSENCE rend la question
//     indécidable.
//   · **La saturation et la notion de solution saturée** en tant que concept :
//     posées comme acquises du chapitre, jamais interrogées pour elles-mêmes.
//   · **La concentration**, la mole, la dissolution d’un gaz : hors attendus du
//     cycle 4 pour les deux premières (rubrique « ce qui n’est pas demandé » du
//     chapitre), et `ch01-sf7` pour la troisième.
//   · **L’écart-type, la médiane, l’incertitude** : rien de tout cela n’est au
//     programme de 4ᵉ. Le seul critère servi est celui du catalogue — ranger les
//     mesures et regarder les écarts entre voisines —, et il se fait à la main.
//   · **Le repérage de l’anomalie comme tâche explicite.** « Quelle mesure est
//     aberrante ? » n’est jamais demandé, et ce n’est pas un oubli : le prédicat
//     du piège refuse un item dont la `tacheDemandee` n’est pas `'exploiter'`.
//     Nommer la tâche la fait réussir à ceux qui ne regardent jamais leurs séries.
//   · **La discrimination mathématique.** Le savoir-faire ne déclare aucun
//     `prerequisMaths` : la moyenne arithmétique est installée depuis le cycle 3.
//     Aucun item ne porte `discriminationMaths` — en poser un serait refusé
//     (DISCRIMINATION_SANS_PREREQUIS), et à juste titre : il n’y aurait rien à
//     séparer.

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — écrits une fois, cités partout où ils servent
// ════════════════════════════════════════════════════════════════════════════

/** Huit essais de dissolution du sel, à 20 °C. La septième pesée vaut à peu près
 *  la moitié des autres : une balance restée tarée sur son support. Rien dans
 *  l’énoncé ne le signale — c’est la condition même du piège. */
const SERIE_SEL_HUIT_ESSAIS = Object.freeze({
  titre: 'Huit essais de dissolution du sel dans un litre d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 8, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute par litre (g/L)', min: 150, max: 400, pas: 25 }),
  points: Object.freeze([[1, 358], [2, 362], [3, 359], [4, 361], [5, 360], [6, 357], [7, 176], [8, 363]].map(Object.freeze)),
});

/** Cinq essais de dissolution du sulfate de cuivre : série SAINE. Le vivier en
 *  exige, et pas par symétrie — sans elles, l’élève apprend « il y en a toujours
 *  une à jeter », qui est un contrat didactique de plus. */
const SERIE_SULFATE_DE_CUIVRE_SAINE = Object.freeze({
  titre: 'Cinq essais de dissolution du sulfate de cuivre dans un litre d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute par litre (g/L)', min: 300, max: 340, pas: 5 }),
  points: Object.freeze([[1, 318], [2, 322], [3, 320], [4, 319], [5, 321]].map(Object.freeze)),
});

/** Six essais de dissolution du bicarbonate, servis en nuage de points. La
 *  quatrième mesure vaut le double des autres — une pesée faite sans avoir retiré
 *  la coupelle. L’axe est gradué de 10 en 10 : la tolérance vaut donc ± 5 g/L, et
 *  elle est CALCULÉE, jamais saisie. */
const SERIE_BICARBONATE_NUAGE = Object.freeze({
  titre: 'Six essais de dissolution du bicarbonate de sodium dans un litre d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute par litre (g/L)', min: 80, max: 210, pas: 10 }),
  points: Object.freeze([[1, 95], [2, 97], [3, 96], [4, 198], [5, 94], [6, 98]].map(Object.freeze)),
  relie: false,
});

/** Cinq essais, mais la grandeur mesurée n’est plus une solubilité : c’est une
 *  MASSE, dissoute dans 250 mL. L’énoncé porte donc des g et des mL, et la
 *  réponse n’est ni des uns ni des autres. C’est la condition de validité du
 *  piège de l’unité. */
const SERIE_SEL_DANS_250_ML = Object.freeze({
  titre: 'Cinq essais : masse de sel dissoute dans 250 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse de sel dissoute (g)', min: 80, max: 100, pas: 2 }),
  points: Object.freeze([[1, 89], [2, 91], [3, 90], [4, 92], [5, 88]].map(Object.freeze)),
});

/** Cinq essais de sulfate de magnésium dans 500 mL. Série saine : ce qui est en
 *  jeu ici est la donnée superflue, pas la mesure fautive. */
const SERIE_SULFATE_DE_MAGNESIUM_500_ML = Object.freeze({
  titre: 'Cinq essais : masse de sulfate de magnésium dissoute dans 500 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute (g)', min: 170, max: 180, pas: 2 }),
  points: Object.freeze([[1, 174], [2, 176], [3, 175], [4, 177], [5, 173]].map(Object.freeze)),
});

/** Cinq essais de sucre dans 100 mL. Deux mille grammes par litre : l’ordre de
 *  grandeur est le mode de réponse de cet item. */
const SERIE_SUCRE_DANS_100_ML = Object.freeze({
  titre: 'Cinq essais : masse de sucre dissoute dans 100 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse de sucre dissoute (g)', min: 190, max: 210, pas: 2 }),
  points: Object.freeze([[1, 199], [2, 201], [3, 200], [4, 202], [5, 198]].map(Object.freeze)),
});

/** Sept essais de nitrate de potassium dans 200 mL, dont un double. Palier non
 *  étiqueté : rien ne dit à l’élève ce qu’on lui demande de repérer, et il y a
 *  deux gestes à faire — écarter, puis rapporter au litre. */
const SERIE_NITRATE_DE_POTASSIUM_200_ML = Object.freeze({
  titre: 'Sept essais : masse de nitrate de potassium dissoute dans 200 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 7, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute (g)', min: 55, max: 135, pas: 5 }),
  points: Object.freeze([[1, 63], [2, 65], [3, 64], [4, 66], [5, 128], [6, 62], [7, 64]].map(Object.freeze)),
});

/** Six essais de chlorure de calcium dans 50 mL. Série saine ; ce qui coûte ici
 *  est le passage de la masse au litre puis du litre au volume demandé. */
const SERIE_CHLORURE_DE_CALCIUM_50_ML = Object.freeze({
  titre: 'Six essais : masse de chlorure de calcium dissoute dans 50 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute (g)', min: 30, max: 40, pas: 1 }),
  points: Object.freeze([[1, 36], [2, 38], [3, 37], [4, 39], [5, 35], [6, 37]].map(Object.freeze)),
});

/** Sept essais d’acide citrique, en nuage de points, dont un lu sur la mauvaise
 *  graduation. Sert le seul item du fichier où l’élève CHOISIT sa réponse au lieu
 *  de la saisir — la dimension variée du palier 3. */
const SERIE_ACIDE_CITRIQUE_NUAGE = Object.freeze({
  titre: 'Sept essais de dissolution de l’acide citrique dans un litre d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 7, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute par litre (g/L)', min: 700, max: 1700, pas: 100 }),
  points: Object.freeze([[1, 1580], [2, 1620], [3, 1600], [4, 1590], [5, 760], [6, 1610], [7, 1600]].map(Object.freeze)),
  relie: false,
});

/** Cinq essais de chlorure d’ammonium, série saine, servie au palier non
 *  étiqueté sans aucun piège déclaré. Un savoir-faire n’est pas fait que de
 *  pièges. */
const SERIE_CHLORURE_D_AMMONIUM = Object.freeze({
  titre: 'Cinq essais de dissolution du chlorure d’ammonium dans un litre d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute par litre (g/L)', min: 360, max: 380, pas: 2 }),
  points: Object.freeze([[1, 368], [2, 372], [3, 370], [4, 371], [5, 369]].map(Object.freeze)),
});

// ── Les séries du test : aucune valeur reprise de l’entraînement ───────────

const SERIE_NITRATE_DE_POTASSIUM_LITRE = Object.freeze({
  titre: 'Six essais de dissolution du nitrate de potassium dans un litre d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute par litre (g/L)', min: 150, max: 330, pas: 20 }),
  points: Object.freeze([[1, 314], [2, 318], [3, 316], [4, 317], [5, 315], [6, 158]].map(Object.freeze)),
});

const SERIE_CARBONATE_NUAGE = Object.freeze({
  titre: 'Six essais de dissolution du carbonate de sodium dans un litre d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute par litre (g/L)', min: 200, max: 440, pas: 20 }),
  points: Object.freeze([[1, 212], [2, 216], [3, 214], [4, 213], [5, 428], [6, 215]].map(Object.freeze)),
  relie: false,
});

const SERIE_NITRATE_DE_SODIUM_400_ML = Object.freeze({
  titre: 'Cinq essais : masse de nitrate de sodium dissoute dans 400 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute (g)', min: 345, max: 360, pas: 5 }),
  points: Object.freeze([[1, 350], [2, 354], [3, 352], [4, 353], [5, 351]].map(Object.freeze)),
});

const SERIE_SULFATE_DE_ZINC_100_ML = Object.freeze({
  titre: 'Cinq essais : masse de sulfate de zinc dissoute dans 100 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute (g)', min: 50, max: 60, pas: 2 }),
  points: Object.freeze([[1, 53], [2, 55], [3, 54], [4, 56], [5, 52]].map(Object.freeze)),
});

const SERIE_SULFATE_D_AMMONIUM_400_ML = Object.freeze({
  titre: 'Six essais : masse de sulfate d’ammonium dissoute dans 400 mL d’eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute (g)', min: 140, max: 310, pas: 10 }),
  points: Object.freeze([[1, 297], [2, 303], [3, 300], [4, 302], [5, 150], [6, 298]].map(Object.freeze)),
});

// ── Les dossiers documentaires, et la correction qui s’en DÉDUIT ───────────
//
// Un dossier porte deux listes de grandeurs : celles qu’il fournit, celles que la
// question réclame. Tout le reste s’en déduit — ce qui manque, ce qui est de
// trop, et si la question a une réponse. C’est ce qui rend ces items de classe B
// plutôt que de classe C : la correction n’est pas écrite à côté du dossier, elle
// en sort.

const dossier = (e) => Object.freeze({ ...e, fournies: Object.freeze(e.fournies), necessaires: Object.freeze(e.necessaires) });

/** Les grandeurs qu’il faudrait et qu’on n’a pas. Une ligne vide dans la liste
 *  du contrôle, exactement. */
const manqueDe = (d) => Object.freeze(d.necessaires.filter((g) => !d.fournies.includes(g)));

/** Les grandeurs fournies qui ne servent à rien pour CETTE question. */
const superfluDe = (d) => Object.freeze(d.fournies.filter((g) => !d.necessaires.includes(g)));

/** Le compte rendu qui donne tout ce qu’il faut, plus une grandeur qui ne sert à
 *  aucune des questions posées. Question décidable.
 *
 *  ⚠ `temperature-de-l-eau` est NÉCESSAIRE, et une première rédaction la rangeait
 *  au superflu. C’était une faute de fond, pas une approximation : le bloc
 *  `definition` du cours écrit qu’une solubilité sans température n’est pas une
 *  solubilité, et `t04` fait de son ABSENCE le motif d’indécidabilité. Déclarer
 *  ici que la température ne sert à rien pour une solubilité, c’est enseigner à
 *  l’élève, dans le même savoir-faire, l’exact contraire de ce que le cours et
 *  `t04` lui disent — et `superfluDe` l’aurait écrit noir sur blanc dans la
 *  correction. */
const DOSSIER_MAGNESIUM_COMPLET = dossier({
  titre: 'Compte rendu du binôme 3 — dissolution du sulfate de magnésium',
  fournies: ['masse-dissoute', 'volume-d-eau', 'temperature-de-l-eau', 'duree-d-agitation'],
  necessaires: ['masse-dissoute', 'volume-d-eau', 'temperature-de-l-eau'],
});

/** Le compte rendu où le volume d’eau n’a jamais été noté. Indécidable, et la
 *  grandeur qui manque est la plus banale des trois. La température est ici
 *  fournie ET nécessaire, comme dans les quatre autres dossiers : ce qui manque
 *  reste le seul volume d’eau, et `manqueDe` le dit tout seul. */
const DOSSIER_SUCRE_SANS_VOLUME = dossier({
  titre: 'Compte rendu du binôme 5 — dissolution du sucre',
  fournies: ['masse-de-sucre-dissoute', 'temperature-de-l-eau', 'duree-d-agitation'],
  necessaires: ['masse-de-sucre-dissoute', 'volume-d-eau', 'temperature-de-l-eau'],
});

/** Le dossier de trois documents où c’est la MASSE qui manque : on sait combien
 *  d’eau, on sait à quelle température, on ne sait pas combien de sel a été
 *  dissous. La température est donc FOURNIE et NÉCESSAIRE — même correction que
 *  pour `DOSSIER_MAGNESIUM_COMPLET`, et c’est ici qu’elle se voyait le plus,
 *  puisque `p02` publie son `superflu` à l’élève. */
const DOSSIER_SEL_SANS_MASSE = dossier({
  titre: 'Dossier « atelier salines » — trois documents',
  fournies: ['volume-d-eau', 'temperature-de-l-eau', 'masse-du-becher-vide', 'marque-de-la-balance'],
  necessaires: ['masse-dissoute', 'volume-d-eau', 'temperature-de-l-eau'],
});

/** Le dossier où c’est la TEMPÉRATURE qui manque. Le cas le plus intéressant du
 *  chapitre : une solubilité sans température n’est pas une solubilité, et un
 *  élève qui rend un nombre a fait un calcul juste sur une question qui n’en
 *  était pas une. */
const DOSSIER_SANS_TEMPERATURE = dossier({
  titre: 'Fiche d’expérience retrouvée dans un classeur',
  fournies: ['masse-dissoute', 'volume-d-eau', 'marque-de-la-balance'],
  necessaires: ['masse-dissoute', 'volume-d-eau', 'temperature-de-l-eau'],
});

/** Le dossier documentaire complet du palier non étiqueté : CINQ grandeurs
 *  fournies, trois utiles, deux de trop, question décidable. */
const DOSSIER_SALINE_DECIDABLE = dossier({
  titre: 'Dossier « marais salant » — un texte, un tableau de relevés, une fiche technique',
  fournies: ['masse-dissoute', 'volume-d-eau', 'surface-du-bassin', 'vitesse-du-vent', 'temperature-de-l-eau'],
  necessaires: ['masse-dissoute', 'volume-d-eau', 'temperature-de-l-eau'],
});

/** L’option servie à CHAQUE question, y compris à celles où elle est fausse. */
const CHOIX_AVEC_ISSUE_INDECIDABLE = Object.freeze([
  'je-donne-la-valeur',
  'on-ne-peut-pas-repondre-il-manque-une-grandeur',
]);

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — une situation, aucune règle énoncée
// ════════════════════════════════════════════════════════════════════════════

export const DECOUVERTE = Object.freeze({
  titre: 'Huit binômes, huit résultats, un seul sel',
  texte:
    'Une classe cherche combien de sel peut se dissoudre au maximum dans un litre '
    + 'd’eau à 20 °C. Chaque binôme fait la manipulation une fois et écrit son '
    + 'résultat au tableau. À la fin de l’heure, il y a huit nombres au tableau, et '
    + 'ils ne sont pas égaux.',
  releve: Object.freeze(['358 g/L', '362 g/L', '359 g/L', '361 g/L', '360 g/L', '357 g/L', '176 g/L', '363 g/L']),
  questions: Object.freeze([
    'Le professeur demande : « quel binôme a raison ? » Écris ta réponse avant de lire la suite.',
    'Sept résultats se tiennent dans un mouchoir de poche. Le huitième est deux fois plus petit. '
      + 'Est-ce que ça se règle de la même façon que l’écart entre 357 et 363 ?',
    'Si on te demandait maintenant UN seul nombre à écrire dans le cahier, lequel donnerais-tu, '
      + 'et qu’écrirais-tu à côté ?',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées différentes tiennent debout à ce stade : '
    + '« on fait la moyenne de tout, c’est la seule façon de ne rien choisir » et « on met la '
    + 'huitième de côté ». Le cours ne va pas dire que la première est bête — elle est bonne pour '
    + 'les petits écarts, et c’est même pour cela qu’on fait plusieurs mesures. Il va dire à quel '
    + 'moment elle cesse de l’être, et comment le reconnaître sans se fier à son impression.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — six blocs typés
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'Estimer une solubilité à partir de plusieurs mesures',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'Solubilité',
      texte:
        'La **solubilité** d’une espèce dans l’eau, **à une température donnée**, est la masse '
        + 'maximale de cette espèce qu’un litre d’eau peut dissoudre. Elle s’exprime en **g/L**. '
        + 'La température fait partie de la définition : « la solubilité du sel » ne veut rien dire '
        + 'tant qu’on n’a pas dit à quelle température.',
    },
    {
      type: 'propriete',
      titre: 'Pourquoi une seule mesure ne suffit pas',
      texte:
        'Deux mesures de la même grandeur ne donnent jamais exactement le même nombre : la balance, '
        + 'la lecture, la quantité d’eau versée varient un peu à chaque fois. C’est **normal**, et '
        + 'ce n’est pas une erreur. On répète donc la mesure, et on prend la **moyenne** des '
        + 'résultats : les petits écarts se compensent, et le nombre obtenu est plus sûr que '
        + 'n’importe lequel des nombres qui l’ont produit.',
    },
    {
      type: 'propriete',
      titre: 'Ce que la moyenne ne rattrape pas',
      texte:
        'La moyenne **lisse les petits écarts** et **transporte les gros**. Une mesure très éloignée '
        + 'des autres n’est pas absorbée : elle tire le résultat à elle, et sur six mesures elle '
        + 'peut le déplacer plus que les cinq autres réunies. Une telle mesure n’est pas une donnée '
        + 'comme les autres : c’est le signe qu’il s’est passé quelque chose pendant cette mesure-là '
        + '— une balance non remise à zéro, une virgule, une lecture prise de travers.',
    },
    {
      type: 'remarque',
      titre: 'Signaler n’est pas supprimer',
      texte:
        'On n’efface **jamais** une mesure. On l’**écrit**, on dit **ce qui a pu se passer**, et on '
        + 'calcule **sans elle en le précisant**. C’est le contraire d’un truquage : c’est ce qu’un '
        + 'compte rendu doit contenir. Et l’inverse est interdit tout autant — on n’écarte pas une '
        + 'mesure parce qu’elle est gênante. Ce qui autorise à mettre une mesure de côté, c’est '
        + 'qu’elle soit **hors du lot**, jamais qu’elle soit la moins commode.',
    },
    {
      type: 'propriete',
      titre: 'L’unité se calcule, elle ne se recopie pas',
      texte:
        'Si tes mesures sont des **grammes** et que l’eau se compte en **millilitres**, la '
        + 'solubilité n’est ni des grammes ni des millilitres : c’est une masse **divisée par** un '
        + 'volume, donc des g/L. Fais l’opération sur les unités **avant** de toucher aux nombres : '
        + 'elle te dira si une conversion a été oubliée. Et si tu réponds en g/mL au lieu de g/L, tu '
        + 'as **raison** — c’est la même grandeur écrite autrement, elle est acceptée, on te signale '
        + 'seulement l’unité demandée.',
    },
    {
      type: 'remarque',
      titre: 'Toutes les questions n’ont pas de réponse',
      texte:
        'Un compte rendu peut porter des grandeurs qui ne servent à rien pour la question posée : '
        + 'c’est normal, un document sert à tout un sujet. Il peut aussi **manquer** une grandeur, '
        + 'et alors la bonne réponse est de dire **laquelle** manque, pas d’en fabriquer une avec ce '
        + 'qui traîne. « On ne peut pas répondre, il manque le volume d’eau » est une réponse '
        + 'complète, et elle est comptée juste quand elle l’est.',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne pèseras rien ici, et tu n’agiteras aucun bécher : **le geste expérimental s’apprend '
        + 'en salle, pas sur un écran**. Ce qu’on travaille, c’est ce qui vient avant et après — '
        + 'choisir un protocole, lire une série, la critiquer, l’exploiter, et dire ce qui manque. '
        + 'C’est aussi ce que l’épreuve du brevet évalue.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un exercice résolu, geste de contrôle compris
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Estimer une solubilité à partir d’une série de mesures',
  enonce:
    'Six binômes ont mesuré la masse de sulfate de cuivre dissoute au maximum dans 250 mL d’eau à '
    + '20 °C, et ont trouvé : 80 g, 82 g, 81 g, 40 g, 79 g, 83 g. Donne la solubilité du sulfate '
    + 'de cuivre à 20 °C, avec son unité.',
  etapes: Object.freeze([
    {
      geste: 'Range les mesures et regarde les écarts entre voisines.',
      redaction:
        '40 — 79 — 80 — 81 — 82 — 83. Les écarts entre voisines valent 39, puis 1, 1, 1, 1. Le '
        + 'premier est bien plus grand que tous les autres : la mesure de 40 g est **à part**.',
    },
    {
      geste: 'Écris la mesure à part, dis ce qui a pu se passer, et annonce ce que tu fais.',
      redaction:
        'La mesure de 40 g vaut à peu près la moitié des autres : la balance a probablement été '
        + 'tarée avec la coupelle encore dessus. Je la garde dans mon compte rendu et je calcule '
        + 'la moyenne **sans elle**, en le précisant.',
    },
    {
      geste: 'Fais la moyenne des mesures qui se tiennent.',
      redaction: '(80 + 82 + 81 + 79 + 83) ÷ 5 = 405 ÷ 5 = 81 g dissous dans 250 mL.',
    },
    {
      geste: 'Calcule l’unité AVANT le nombre.',
      redaction:
        'On demande une solubilité : une masse **pour** un volume. Des g ÷ des L, donc des **g/L** '
        + '— ni des g, qui étaient l’unité des mesures, ni des mL, qui étaient celle de l’eau. Il '
        + 'faut donc que le volume soit en litres : 250 mL = 0,25 L.',
    },
    {
      geste: 'Fais l’opération.',
      redaction: '81 ÷ 0,25 = 324. La solubilité vaut **324 g/L** à 20 °C.',
    },
  ].map(Object.freeze)),
  controle:
    'Deux vérifications, dans cet ordre. **La nature** : est-ce que ce que j’ai écrit se lit comme '
    + 'une masse pour un volume ? Oui, des g/L. **L’ordre de grandeur** : 324 g/L, c’est à peu près '
    + 'un tiers de kilo de solide dans une bouteille d’eau. C’est beaucoup, mais c’est ce que fait '
    + 'un sel très soluble — et c’est du même ordre que le sel de cuisine, dont je connais la '
    + 'valeur. Si j’avais trouvé 0,3 g/L ou 3 000 g/L, je reprendrais mon calcul.',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas la division : c’est d’avoir fait la moyenne des **six** '
    + 'mesures, 445 ÷ 6 ≈ 74,2 g, donc environ 297 g/L. Une seule mesure fautive aura déplacé le '
    + 'résultat de vingt-sept grammes par litre.',
});

// ════════════════════════════════════════════════════════════════════════════
// ENTRAÎNEMENT — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 — palier 1 · classe A · le format diagnostique du piège de la série ──
  //
  // Tableau servi SANS aucune consigne de repérage, tâche demandée : exploiter.
  // C’est le format dans lequel la conception se voit, et le motif l’écrit —
  // aucun programme ne sait comparer un item à la prose d’un `formatDiagnostique`.
  {
    id: 'ch01-sf5-e01-huit-essais-de-sel',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'huit-binomes-un-litre-d-eau',
    enonce:
      'Huit binômes ont mesuré la masse de sel qu’un litre d’eau peut dissoudre au maximum à '
      + '20 °C. Voici leurs résultats. Donne la solubilité du sel à 20 °C, avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_SEL_HUIT_ESSAIS },
    donnees: {
      m1: { valeur: [358, 1], unite: 'g/L' },
      m2: { valeur: [362, 1], unite: 'g/L' },
      m3: { valeur: [359, 1], unite: 'g/L' },
      m4: { valeur: [361, 1], unite: 'g/L' },
      m5: { valeur: [360, 1], unite: 'g/L' },
      m6: { valeur: [357, 1], unite: 'g/L' },
      m7: { valeur: [176, 1], unite: 'g/L' },
      m8: { valeur: [363, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6 + @m8', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 7', unite: 'g/L' },
      ],
      reponse: 'moyenne',
    },
    reponse: {
      valeur: [360, 1], unite: 'g/L', semantique: 'tolerante',
      tolerancePourcent: 2, decimalesIntermediaires: 1,
    },
    modelesErrones: [
      {
        id: 'moyenne-des-huit',
        nom: 'modèle « toutes les mesures se valent » : on moyenne les huit sans regarder la série',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [
            { id: 'somme8', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6 + @m7 + @m8', unite: 'g/L' },
            { id: 'moy8', expr: '#somme8 ÷ 8', unite: 'g/L' },
          ],
          reponse: 'moy8',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [358, 362, 359, 361, 360, 357, 176, 363],
      repereeParLEnonce: false,
      aberrante: { index: 6, facteur: 0.49 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'la-moyenne-avec-et-sans',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Tableau de huit mesures répétées, servi sans aucune consigne de repérage : la question porte '
      + 'sur une EXPLOITATION — « donne la solubilité » — et jamais sur « repère l’erreur ». '
      + 'La réponse est une saisie libre en deux champs, valeur et unité, comme le piège le '
      + 'demande. Demander « quelle mesure est aberrante ? » nommerait la tâche, et l’élève qui ne '
      + 'regarde jamais ses séries y réussirait parfaitement.',
  },

  // ── e02 — palier 1 · classe A · la série SAINE, et l’aveu écrit ─────────
  //
  // Le vivier en exige, et le contenu doit s’y plier même quand c’est coûteux :
  // ici aucun modèle erroné n’est défendable, parce qu’écarter la mesure la plus
  // éloignée d’une série saine tombe DANS la fenêtre. `motifSansModeleErrone`
  // l’écrit plutôt que d’inventer un modèle qui ne discriminerait rien.
  {
    id: 'ch01-sf5-e02-cinq-essais-sulfate-de-cuivre',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'sulfate-de-cuivre-cinq-essais',
    enonce:
      'Un groupe a refait cinq fois la même mesure sur le sulfate de cuivre, dans un litre d’eau à '
      + '20 °C. Donne la solubilité du sulfate de cuivre à 20 °C, avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_SULFATE_DE_CUIVRE_SAINE },
    donnees: {
      m1: { valeur: [318, 1], unite: 'g/L' },
      m2: { valeur: [322, 1], unite: 'g/L' },
      m3: { valeur: [320, 1], unite: 'g/L' },
      m4: { valeur: [319, 1], unite: 'g/L' },
      m5: { valeur: [321, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g/L' },
      ],
      reponse: 'moyenne',
    },
    reponse: {
      valeur: [320, 1], unite: 'g/L', semantique: 'tolerante',
      tolerancePourcent: 2, decimalesIntermediaires: 1,
    },
    motifSansModeleErrone:
      'Aucun modèle erroné exécutable ne sort de la fenêtre, et c’est exactement ce que cet item '
      + 'doit faire constater. Le seul modèle candidat — « j’écarte la mesure la plus éloignée » — '
      + 'donne (318 + 320 + 319 + 321) ÷ 4 = 319,5 g/L, qui tombe DANS la tolérance de ± 2 %. Sur '
      + 'une série saine, écarter ne change rien : en inventer un modèle qui discrimine reviendrait '
      + 'à fabriquer une série qui n’est pas saine, donc à retirer du vivier le cas que le piège '
      + 'rend obligatoire.',
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [318, 322, 320, 319, 321],
      repereeParLEnonce: false,
      aberrante: null,
      tacheDemandee: 'exploiter',
    },
  },

  // ── e03 — palier 2 · classe A · nuage de points, tolérance CALCULÉE ─────
  //
  // Palier 2 : le support change — un nuage de points au lieu d’un tableau —, et
  // la mesure fautive est cette fois trop HAUTE. La fenêtre de tolérance n’est
  // pas saisie : l’axe est gradué de 10 en 10 g/L, `fenetreDeTolerance` en tire
  // une demi-graduation, ± 5 g/L. C’est le bénéfice de l’engendrement des
  // figures, sur les items où la tolérance est le gros du bataillon.
  {
    id: 'ch01-sf5-e03-nuage-bicarbonate',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'bicarbonate-en-nuage-de-points',
    // Aucun `sfSollicites` : une première rédaction citait ici
    // `ch01-sf6-exploiter-une-courbe-de-solubilite`, ce que la rubrique
    // « ce que ce savoir-faire ne couvre pas » de l’en-tête contredit mot pour
    // mot — sf6 est la solubilité EN FONCTION DE LA TEMPÉRATURE : courbe, lecture,
    // interpolation. Ici la température est FIXÉE et l’axe des abscisses porte le
    // numéro d’essai. Ce nuage n’est pas une courbe de solubilité, et le déclarer
    // sollicité aurait porté des réussites au crédit d’un savoir-faire que l’item
    // ne travaille pas.
    enonce:
      'Six essais de dissolution du bicarbonate de sodium dans un litre d’eau à 20 °C ont été '
      + 'reportés sur ce graphique. Donne la solubilité du bicarbonate de sodium à 20 °C, avec son '
      + 'unité.',
    figure: { sorte: 'graphique', donnees: SERIE_BICARBONATE_NUAGE },
    donnees: {
      m1: { valeur: [95, 1], unite: 'g/L' },
      m2: { valeur: [97, 1], unite: 'g/L' },
      m3: { valeur: [96, 1], unite: 'g/L' },
      m4: { valeur: [198, 1], unite: 'g/L' },
      m5: { valeur: [94, 1], unite: 'g/L' },
      m6: { valeur: [98, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m5 + @m6', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g/L' },
      ],
      reponse: 'moyenne',
    },
    reponse: { valeur: [96, 1], unite: 'g/L', semantique: 'tolerante', decimalesIntermediaires: 1 },
    modelesErrones: [
      {
        id: 'moyenne-des-six-points',
        nom: 'modèle « un point est un point » : on moyenne les six sans regarder le nuage',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [
            { id: 'somme6', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6', unite: 'g/L' },
            { id: 'moy6', expr: '#somme6 ÷ 6', unite: 'g/L' },
          ],
          reponse: 'moy6',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [95, 97, 96, 198, 94, 98],
      repereeParLEnonce: false,
      aberrante: { index: 3, facteur: 2.06 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'le-point-qui-tord-la-courbe',
  },

  // ── e04 — palier 2 · classe A · le format diagnostique du piège de l’unité ──
  //
  // L’énoncé porte des g et des mL, la réponse n’est ni les uns ni les autres :
  // c’est la quatrième exigence du prédicat, celle sans laquelle recopier
  // suffirait à répondre juste. Saisie libre, deux champs, « sans unité »
  // disponible — jamais un QCM d’unités, que le piège refuse explicitement.
  {
    id: 'ch01-sf5-e04-sel-dans-250-ml',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'becher-de-250-ml',
    enonce:
      'Un binôme n’avait qu’un petit bécher : il a travaillé sur {{donnee:volume}} d’eau à 20 °C et '
      + 'a noté, à chaque essai, la masse de sel dissoute. Donne la solubilité du sel à 20 °C, avec '
      + 'son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_SEL_DANS_250_ML },
    donnees: {
      m1: { valeur: [89, 1], unite: 'g' },
      m2: { valeur: [91, 1], unite: 'g' },
      m3: { valeur: [90, 1], unite: 'g' },
      m4: { valeur: [92, 1], unite: 'g' },
      m5: { valeur: [88, 1], unite: 'g' },
      volume: { valeur: [250, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volume', unite: 'g/L' },
      ],
      reponse: 'solubilite',
    },
    reponse: { valeur: [360, 1], unite: 'g/L', semantique: 'tolerante', tolerancePourcent: 2 },
    modelesErrones: [
      {
        id: 'on-s-arrete-a-la-moyenne-en-grammes',
        nom: 'modèle « l’unité est celle des données » : on rend la moyenne des masses, en grammes',
        piege: 'unite-absente-ou-fausse',
        calcul: {
          etapes: [
            { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
            { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
          ],
          reponse: 'moyenne',
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g/L',
      unitesPresentesDansLEnonce: ['g', 'mL'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'l-unite-calculee-avant-le-nombre',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'Saisie libre, valeur et unité dans DEUX champs distincts, l’état « sans unité » offert dans '
      + 'la liste : aucun QCM d’unités, que le piège refuse parce que reconnaître une unité dans '
      + 'une liste n’est pas la produire, et que le modèle de l’élève y réussit. Le contexte imposé '
      + 'est là aussi : la grandeur demandée est un quotient, et l’énoncé porte deux unités '
      + 'différentes parmi ses données — des grammes et des millilitres —, dont aucune n’est celle '
      + 'de la réponse.',
  },

  // ── e05 — palier 1 · classe C · double QCM, série donnée en toutes lettres ──
  //
  // Un `double-qcm` ne peut PAS porter de figure : `SORTES_PAR_TYPE` n’en ouvre
  // qu’aux trois types qui en désignent une, et le contrôleur refuse le reste.
  // La série est donc du texte. C’est la limite du format, et c’est aussi
  // pourquoi cet item est relu : rien de mécanique ne garantit que les six
  // nombres de la phrase sont ceux de la `situation`.
  {
    id: 'ch01-sf5-e05-double-qcm-quelle-valeur-retenir',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'six-pesees-notees-au-brouillon',
    enonce:
      'Un binôme a refait six fois la mesure de la solubilité du sel à 20 °C et a noté, dans '
      + 'l’ordre : 355 g/L, 358 g/L, 172 g/L, 356 g/L, 359 g/L, 357 g/L. Il doit écrire UNE valeur '
      + 'dans son compte rendu. Laquelle ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'la-moyenne-des-cinq-qui-se-tiennent',
      choixPossibles: [
        'la-moyenne-des-six',
        'la-moyenne-des-cinq-qui-se-tiennent',
        'la-plus-petite-des-six',
        'on-ne-peut-pas-repondre-il-manque-une-grandeur',
      ],
    },
    justifications: [
      {
        id: 'une-mesure-hors-du-lot-se-signale',
        texte:
          'La troisième vaut à peu près la moitié des cinq autres : je l’écris, je dis que la '
          + 'balance a pu rester tarée sur son support, et je calcule sans elle en le précisant.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'ce-serait-tricher-d-en-enlever-une',
        texte: 'On n’a pas le droit d’enlever une mesure, ce serait tricher : je fais la moyenne des six.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « valeur-aberrante-d-une-serie-non-reperee », raisonnement '
          + '« on-n-a-pas-le-droit-d-enlever-une-mesure » — js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'la-moyenne-rattrape-les-ecarts',
        texte: 'La moyenne rattrape les écarts, c’est fait pour ça : les six donneront le bon résultat.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « valeur-aberrante-d-une-serie-non-reperee », raisonnement '
          + '« la-moyenne-absorbe-tout » — js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'elles-ont-toutes-ete-faites-pareil',
        texte:
          'Elles ont toutes été faites de la même façon, je n’ai aucune raison d’en préférer une : '
          + 'je prends la plus petite, comme ça je ne risque pas d’exagérer.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « valeur-aberrante-d-une-serie-non-reperee », raisonnement '
          + '« toutes-les-mesures-se-valent » — js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [355, 358, 172, 356, 359, 357],
      repereeParLEnonce: false,
      aberrante: { index: 2, facteur: 0.48 },
      tacheDemandee: 'exploiter',
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: 'bc0e2a9e96e64a61' },
  },

  // ── e06 — palier 1 · classe A · une grandeur de trop, question décidable ───
  //
  // La première moitié du piège du contrat : une donnée peut être là pour rien.
  // Une seule l'est ici — la durée d'agitation. La température, elle, est
  // fournie ET nécessaire : sans elle il n'y a pas de solubilité, c'est ce que
  // le bloc `definition` du cours écrit et ce que `t04` fait constater.
  // Le modèle erroné fait entrer la durée d’agitation dans le calcul, et il
  // s’exécute — c’est ce qui le rend opposable : g ÷ min est dimensionnellement
  // correct, donc l’algèbre des unités ne l’attrape pas, seul le sens le fait.
  {
    id: 'ch01-sf5-e06-compte-rendu-avec-deux-grandeurs-de-trop',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'compte-rendu-du-binome-3',
    enonce:
      'Voici le compte rendu du binôme 3. Il a dissous du sulfate de magnésium dans '
      + '{{donnee:volume}} d’eau à {{donnee:temperature}}, en agitant {{donnee:duree}} à chaque '
      + 'essai, et il a noté la masse dissoute. Donne la solubilité du sulfate de magnésium à '
      + '20 °C, avec son unité — ou dis qu’on ne peut pas répondre, en précisant ce qui manque.',
    figure: { sorte: 'tableau', donnees: SERIE_SULFATE_DE_MAGNESIUM_500_ML },
    donnees: {
      m1: { valeur: [174, 1], unite: 'g' },
      m2: { valeur: [176, 1], unite: 'g' },
      m3: { valeur: [175, 1], unite: 'g' },
      m4: { valeur: [177, 1], unite: 'g' },
      m5: { valeur: [173, 1], unite: 'g' },
      volume: { valeur: [500, 1], unite: 'mL' },
      temperature: { valeur: [20, 1], unite: '°C' },
      duree: { valeur: [5, 1], unite: 'min' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volume', unite: 'g/L' },
      ],
      reponse: 'solubilite',
    },
    reponse: { valeur: [350, 1], unite: 'g/L', semantique: 'tolerante', tolerancePourcent: 2 },
    modelesErrones: [
      {
        id: 'la-duree-doit-bien-servir',
        nom: 'modèle « si le nombre est là, c’est qu’il doit servir » : on divise par la durée d’agitation',
        piege: 'donnees-superflues-et-questions-sans-reponse',
        calcul: {
          etapes: [
            { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
            { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
            { id: 'parMinute', expr: '#moyenne ÷ @duree', unite: 'g/min' },
          ],
          reponse: 'parMinute',
        },
      },
    ],
    piege: 'donnees-superflues-et-questions-sans-reponse',
    situation: {
      donneesFournies: DOSSIER_MAGNESIUM_COMPLET.fournies,
      donneesNecessaires: DOSSIER_MAGNESIUM_COMPLET.necessaires,
      optionIndecidableDisponible: true,
      questionDecidable: true,
    },
    dispositifServi: 'le-dossier-qui-en-donne-trop',
  },

  // ── e07 — palier 2 · classe B · le format diagnostique du contrat ───────
  //
  // Classe B sans figure, et c’est légitime : ce qui est engendré ici n’est pas
  // un dessin, c’est la CORRECTION. `manqueDe(DOSSIER)` calcule la grandeur
  // absente à partir des deux listes que porte le dossier — le même objet formel
  // que la `situation` donne au prédicat du piège. Écrire « il manque le volume »
  // à la main aurait rouvert le désaccord que la classe B ferme.
  {
    id: 'ch01-sf5-e07-compte-rendu-sans-volume',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'compte-rendu-du-binome-5',
    enonce:
      'Le binôme 5 a écrit : « on a dissous du sucre dans l’eau à 20 °C jusqu’à ce qu’il ne se '
      + 'dissolve plus rien ; masse dissoute : 200 g ; on a agité 5 min. » On te demande la '
      + 'solubilité du sucre à 20 °C. Donne-la avec son unité, ou dis qu’on ne peut pas répondre en '
      + 'précisant ce qui manque.',
    reponse: {
      objetFormel: DOSSIER_SUCRE_SANS_VOLUME,
      libre: false,
      choix: 'on-ne-peut-pas-repondre-il-manque-une-grandeur',
      choixPossibles: CHOIX_AVEC_ISSUE_INDECIDABLE,
      manque: manqueDe(DOSSIER_SUCRE_SANS_VOLUME),
    },
    piege: 'donnees-superflues-et-questions-sans-reponse',
    situation: {
      donneesFournies: DOSSIER_SUCRE_SANS_VOLUME.fournies,
      donneesNecessaires: DOSSIER_SUCRE_SANS_VOLUME.necessaires,
      optionIndecidableDisponible: true,
      questionDecidable: false,
    },
    dispositifServi: 'la-question-a-laquelle-on-ne-peut-pas-repondre',
    estFormatDiagnostique: true,
    motifFormatDiagnostique:
      'L’option « on ne peut pas répondre, il manque… » est offerte ICI comme elle l’est à toutes '
      + 'les autres questions du savoir-faire servies sur un dossier ou un relevé, y compris à '
      + 'celles où elle est fausse — e06, t07 et t09 '
      + 'la portent sur des questions parfaitement décidables. C’est la condition que le piège pose '
      + 'et la seule qui compte : servie seulement là où elle est bonne, sa présence annoncerait la '
      + 'réponse, et on ne mesurerait plus que la docilité de l’élève au format.',
  },

  // ── e08 — palier 3 · classe C · double QCM sur la question sans réponse ──
  //
  // Palier 3 : le mode de réponse a déjà changé au palier 2 pour ce piège, donc
  // ici c’est le SENS DU CHANGEMENT — on ne demande plus « peux-tu répondre ? »,
  // on demande de justifier le refus de répondre.
  {
    id: 'ch01-sf5-e08-double-qcm-il-manque-le-volume',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'fiche-du-classeur-sans-volume',
    enonce:
      'Une fiche retrouvée dans un classeur porte : « sucre dissous : 200 g ; température de '
      + 'l’eau : 20 °C ; agitation : 5 min ». La question posée est : « quelle est la solubilité du '
      + 'sucre à 20 °C ? » Que réponds-tu ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'on-ne-peut-pas-repondre-il-manque-une-grandeur',
      choixPossibles: [
        'je-donne-la-valeur',
        'on-ne-peut-pas-repondre-il-manque-une-grandeur',
        'je-donne-la-valeur-en-supposant-un-litre',
      ],
    },
    justifications: [
      {
        id: 'la-ligne-volume-reste-vide',
        texte:
          'Pour une solubilité il faut une masse ET un volume d’eau. La ligne « volume » de ma '
          + 'liste reste vide : on ne peut pas répondre, et ce qui manque, c’est le volume d’eau.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'il-fallait-bien-mettre-quelque-chose',
        texte: 'Je ne pouvais pas laisser vide, alors j’ai mis 200 g/L.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « donnees-superflues-et-questions-sans-reponse », raisonnement '
          + '« il-fallait-bien-repondre-quelque-chose » — js/data/pieges/contrat.js',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
      {
        id: 'on-ne-poserait-pas-la-question',
        texte: 'On ne poserait pas la question s’il était impossible d’y répondre : c’est donc 200 g/L.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « donnees-superflues-et-questions-sans-reponse », raisonnement '
          + '« si-la-question-est-posee-c-est-qu-on-peut-y-repondre » — js/data/pieges/contrat.js',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
      {
        id: 'j-ai-pris-les-nombres-qui-etaient-la',
        texte: 'J’ai divisé les 200 g par les 5 min d’agitation, ça faisait deux nombres à utiliser.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « donnees-superflues-et-questions-sans-reponse », raisonnement '
          + '« j-ai-pris-les-deux-derniers-nombres » — js/data/pieges/contrat.js',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
    ],
    piege: 'donnees-superflues-et-questions-sans-reponse',
    situation: {
      donneesFournies: DOSSIER_SUCRE_SANS_VOLUME.fournies,
      donneesNecessaires: DOSSIER_SUCRE_SANS_VOLUME.necessaires,
      optionIndecidableDisponible: true,
      questionDecidable: false,
    },
    relu: { par: 'relecture-adverse', date: '2026-08-12', hash: 'fd31285e42f10535' },
  },

  // ── e09 — palier 3 · classe A · le mode de réponse change : ordre de grandeur ──
  //
  // Pour le piège de l’unité, le palier 2 faisait varier la grandeur en jeu ;
  // ici c’est le MODE DE RÉPONSE — on ne demande plus une valeur exacte mais un
  // ordre de grandeur, et l’unité reste entièrement à produire.
  {
    id: 'ch01-sf5-e09-ordre-de-grandeur-du-sucre',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'sucre-dans-un-verre-de-100-ml',
    enonce:
      'Cinq essais ont été faits sur {{donnee:volume}} d’eau à 20 °C : à chaque fois, on a noté la '
      + 'masse de sucre dissoute au maximum. Donne l’ORDRE DE GRANDEUR de la solubilité du sucre à '
      + '20 °C, avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_SUCRE_DANS_100_ML },
    donnees: {
      m1: { valeur: [199, 1], unite: 'g' },
      m2: { valeur: [201, 1], unite: 'g' },
      m3: { valeur: [200, 1], unite: 'g' },
      m4: { valeur: [202, 1], unite: 'g' },
      m5: { valeur: [198, 1], unite: 'g' },
      volume: { valeur: [100, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volume', unite: 'g/L' },
      ],
      reponse: 'solubilite',
    },
    reponse: { valeur: [2000, 1], unite: 'g/L', semantique: 'ordre-de-grandeur' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g/L',
      unitesPresentesDansLEnonce: ['g', 'mL'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── e10 — palier 4 · classe A · non étiqueté, deux gestes à faire ───────
  //
  // Rien ne dit à l’élève de quoi il s’agit : la première tâche est de
  // RECONNAÎTRE. Il y a une mesure à écarter ET un passage au litre à faire, et
  // l’ordre entre les deux n’est indiqué nulle part.
  {
    id: 'ch01-sf5-e10-nitrate-de-potassium-sept-essais',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'atelier-de-cristallisation',
    enonce:
      'Sept essais ont été faits sur {{donnee:volume}} d’eau à 20 °C, en notant à chaque fois la '
      + 'masse de nitrate de potassium dissoute au maximum. Donne la solubilité du nitrate de '
      + 'potassium à 20 °C, avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_NITRATE_DE_POTASSIUM_200_ML },
    donnees: {
      m1: { valeur: [63, 1], unite: 'g' },
      m2: { valeur: [65, 1], unite: 'g' },
      m3: { valeur: [64, 1], unite: 'g' },
      m4: { valeur: [66, 1], unite: 'g' },
      m5: { valeur: [128, 1], unite: 'g' },
      m6: { valeur: [62, 1], unite: 'g' },
      m7: { valeur: [64, 1], unite: 'g' },
      volume: { valeur: [200, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m6 + @m7', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 6', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volume', unite: 'g/L' },
      ],
      reponse: 'solubilite',
    },
    reponse: { valeur: [320, 1], unite: 'g/L', semantique: 'tolerante', tolerancePourcent: 2 },
    modelesErrones: [
      {
        id: 'les-sept-puis-le-litre',
        nom: 'modèle « toutes les mesures se valent » : les sept sont moyennées, puis rapportées au litre',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [
            { id: 'somme7', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6 + @m7', unite: 'g' },
            { id: 'moy7', expr: '#somme7 ÷ 7', unite: 'g' },
            { id: 'sol7', expr: '#moy7 ÷ @volume', unite: 'g/L' },
          ],
          reponse: 'sol7',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [63, 65, 64, 66, 128, 62, 64],
      repereeParLEnonce: false,
      aberrante: { index: 4, facteur: 2 },
      tacheDemandee: 'exploiter',
    },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 — palier 4 · classe A · le piège de l’unité au palier non étiqueté ──
  //
  // Quatre étapes, trois unités différentes dans l’énoncé, et la réponse est une
  // MASSE : ni des g/L, qui sont le résultat intermédiaire, ni des mL. Le premier
  // modèle erroné est précisément « je rends l’étape d’avant ».
  {
    id: 'ch01-sf5-p01-combien-de-chlorure-de-calcium',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'bain-antigel-de-chlorure-de-calcium',
    enonce:
      'Pour préparer un bain, on doit dissoudre le plus de chlorure de calcium possible dans '
      + '{{donnee:volumeDemande}} d’eau à 20 °C. Six essais préalables ont été faits sur '
      + '{{donnee:volumeEssai}} d’eau, en notant la masse dissoute. Quelle masse de chlorure de '
      + 'calcium faut-il prévoir ? Donne ta réponse avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_CHLORURE_DE_CALCIUM_50_ML },
    donnees: {
      m1: { valeur: [36, 1], unite: 'g' },
      m2: { valeur: [38, 1], unite: 'g' },
      m3: { valeur: [37, 1], unite: 'g' },
      m4: { valeur: [39, 1], unite: 'g' },
      m5: { valeur: [35, 1], unite: 'g' },
      m6: { valeur: [37, 1], unite: 'g' },
      volumeEssai: { valeur: [50, 1], unite: 'mL' },
      volumeDemande: { valeur: [250, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 6', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volumeEssai', unite: 'g/L' },
        { id: 'masse', expr: '#solubilite × @volumeDemande', unite: 'g' },
      ],
      reponse: 'masse',
    },
    reponse: { valeur: [185, 1], unite: 'g', semantique: 'tolerante', tolerancePourcent: 2 },
    modelesErrones: [
      {
        id: 'je-rends-la-solubilite',
        nom: 'modèle « l’unité est celle de l’étape d’avant » : on rend la solubilité au lieu de la masse',
        piege: 'unite-absente-ou-fausse',
        calcul: {
          etapes: [
            { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6', unite: 'g' },
            { id: 'moyenne', expr: '#somme ÷ 6', unite: 'g' },
            { id: 'solubilite', expr: '#moyenne ÷ @volumeEssai', unite: 'g/L' },
          ],
          reponse: 'solubilite',
        },
      },
      {
        id: 'la-somme-des-six',
        nom: 'modèle « le total, c’est le résultat » : on additionne les six masses et on s’arrête là',
        // AUCUN piège rattaché, et c’est le résultat d’une relecture de
        // réfutation. Ce modèle rend 222 g : la même NATURE et la même unité que
        // la bonne réponse, 185 g. Appliquer la `regle` de
        // `unite-absente-ou-fausse` — « des g ÷ des cm³ ne donnent pas des g » —
        // ne le contredit en rien, et son `controle` — « de quelle nature est ce
        // qu’on attend ? une masse ? oui, des grammes » — le VALIDE. Un piège
        // dont la règle confirme la réponse fausse ne diagnostique pas une
        // conception : il en fabrique une. Le modèle reste, parce qu’il discrimine
        // (222 ≠ 185, hors fenêtre), mais il ne prétend plus rattraper l’unité :
        // l’erreur est d’avoir sauté la moyenne, et aucun piège du catalogue ne
        // la porte.
        calcul: {
          etapes: [{ id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6', unite: 'g' }],
          reponse: 'somme',
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g',
      unitesPresentesDansLEnonce: ['g', 'mL'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    dispositifServi: 'trois-copies-un-meme-calcul',
  },

  // ── p02 — palier 4 · classe B · le dossier où la masse manque ───────────
  //
  // Trois documents, quatre grandeurs, et la plus banale des trois nécessaires
  // n’y est pas. La correction est calculée par `manqueDe` : le jour où l’on
  // ajoute la masse au dossier, l’item devient décidable et la réponse suit,
  // sans qu’on ait à toucher à autre chose.
  {
    id: 'ch01-sf5-p02-dossier-atelier-salines',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'dossier-atelier-salines',
    enonce:
      'Dossier « atelier salines », trois documents. Document 1 : « le bac contient 2 L d’eau ». '
      + 'Document 2 : « la température de l’eau est de 20 °C ». Document 3 : la fiche de la balance '
      + 'et la masse du bécher vide, 145 g. Question : quelle est la solubilité du sel à 20 °C ? '
      + 'Donne-la avec son unité, ou dis qu’on ne peut pas répondre en précisant ce qui manque.',
    reponse: {
      objetFormel: DOSSIER_SEL_SANS_MASSE,
      libre: false,
      choix: 'on-ne-peut-pas-repondre-il-manque-une-grandeur',
      choixPossibles: CHOIX_AVEC_ISSUE_INDECIDABLE,
      manque: manqueDe(DOSSIER_SEL_SANS_MASSE),
      superflu: superfluDe(DOSSIER_SEL_SANS_MASSE),
    },
    piege: 'donnees-superflues-et-questions-sans-reponse',
    situation: {
      donneesFournies: DOSSIER_SEL_SANS_MASSE.fournies,
      donneesNecessaires: DOSSIER_SEL_SANS_MASSE.necessaires,
      optionIndecidableDisponible: true,
      questionDecidable: false,
    },
  },

  // ── p03 — palier 4 · classe C · deux séries, deux binômes ───────────────
  //
  // Le seul item du fichier où deux séries sont en jeu. Le double QCM ne peut
  // porter aucune figure ; les deux séries sont donc écrites, et c’est celle du
  // binôme B que la `situation` déclare, parce que c’est elle qui porte la
  // mesure à part.
  {
    id: 'ch01-sf5-p03-double-qcm-deux-binomes',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'deux-binomes-deux-series',
    enonce:
      'Deux binômes ont mesuré la solubilité du même sel à 20 °C. Binôme A : 340 g/L, 344 g/L, '
      + '342 g/L, 341 g/L, 343 g/L. Binôme B : 341 g/L, 343 g/L, 168 g/L, 342 g/L, 344 g/L, '
      + '340 g/L. Les deux calculent la moyenne de TOUTES leurs mesures et obtiennent des résultats '
      + 'différents. Lequel des deux résultats faut-il corriger ? Puis choisis la phrase qui dit '
      + 'pourquoi.',
    reponse: {
      libre: false,
      choix: 'celui-du-binome-b',
      choixPossibles: [
        'celui-du-binome-a',
        'celui-du-binome-b',
        'les-deux',
        'aucun-des-deux',
      ],
    },
    justifications: [
      {
        id: 'un-ecart-bien-plus-grand-que-les-autres',
        texte:
          'Chez A, les écarts entre voisines se ressemblent tous : la série est saine, on garde '
          + 'tout. Chez B, un écart est bien plus grand que les autres, et la mesure de l’autre '
          + 'côté est à part : c’est le résultat de B qu’il faut refaire sans elle, en le disant.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'les-deux-il-y-a-toujours-une-a-jeter',
        texte:
          'Les deux : dans toute série il y a une mesure ratée, il faut toujours enlever la plus '
          + 'éloignée avant de faire la moyenne.',
        juste: false,
        // La conception SYMÉTRIQUE, celle que ce piège risque de fabriquer.
        // Le catalogue l’écrit dans sa `regle` : on n’écarte jamais une mesure
        // parce qu’elle est gênante. La servir ici est la seule façon de ne pas
        // apprendre à jeter les données qui dérangent.
        provenance: 'locale',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'aucun-on-n-y-touche-pas',
        texte: 'Aucun des deux : on n’a pas le droit de toucher aux mesures qui ont été faites.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « valeur-aberrante-d-une-serie-non-reperee », raisonnement '
          + '« on-n-a-pas-le-droit-d-enlever-une-mesure » — js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        // RÉÉCRITE à la relecture de réfutation. Elle disait : « celui de A : il
        // n’a fait que cinq mesures, donc son résultat est moins sûr ». Le motif
        // était intenable à deux titres. D’abord la `regle` du piège ne dit rien
        // du NOMBRE de mesures : elle est muette sur cette réponse, donc elle ne
        // la réfute pas. Ensuite et surtout, le cours de ce savoir-faire enseigne
        // la phrase comme VRAIE — « le nombre obtenu est plus sûr que n’importe
        // lequel des nombres qui l’ont produit » —, et compter faux un élève qui
        // récite ce qu’on vient de lui apprendre est le contraire d’un
        // diagnostic. La version ci-dessous applique à la série SAINE de A le
        // geste que le piège interdit ; la règle la contredit (« une valeur un
        // peu au-dessus ou un peu en dessous des autres est normale ») et le
        // contrôle aussi (« si tous les écarts se ressemblent, garde tout »).
        id: 'celui-de-a-il-faut-enlever-les-extremes',
        texte:
          'Celui de A : ses mesures ne sont pas identiques, elles vont de 340 à 344 g/L — '
          + 'j’enlève la plus haute et la plus basse, comme ça il ne reste que celles qui '
          + 'sont d’accord.',
        juste: false,
        provenance: 'locale',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [341, 343, 168, 342, 344, 340],
      repereeParLEnonce: false,
      aberrante: { index: 2, facteur: 0.49 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'la-moyenne-avec-et-sans',
    relu: { par: 'relecture-adverse', date: '2026-08-12', hash: '700f22012346cb25' },
  },

  // ── p04 — palier 3 · classe A · on CHOISIT au lieu de saisir ───────────
  //
  // La dimension variée du palier 3 pour le piège de la série : le mode de
  // réponse. Les deux distracteurs ne sont pas inventés — chacun est produit par
  // un modèle erroné EXÉCUTABLE, rejoué par le contrôle sur les données de
  // l’item, et le contrôle vérifie en plus qu’aucun ne tombe dans la fenêtre de
  // tolérance, qui vaut ici une demi-graduation : ± 50 g/L.
  {
    id: 'ch01-sf5-p04-acide-citrique-au-choix',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'acide-citrique-en-nuage',
    enonce:
      'Sept essais de dissolution de l’acide citrique dans un litre d’eau à 20 °C sont reportés sur '
      + 'ce graphique. Choisis la solubilité de l’acide citrique à 20 °C parmi les valeurs '
      + 'proposées.',
    figure: { sorte: 'graphique', donnees: SERIE_ACIDE_CITRIQUE_NUAGE },
    donnees: {
      m1: { valeur: [1580, 1], unite: 'g/L' },
      m2: { valeur: [1620, 1], unite: 'g/L' },
      m3: { valeur: [1600, 1], unite: 'g/L' },
      m4: { valeur: [1590, 1], unite: 'g/L' },
      m5: { valeur: [760, 1], unite: 'g/L' },
      m6: { valeur: [1610, 1], unite: 'g/L' },
      m7: { valeur: [1600, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m6 + @m7', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 6', unite: 'g/L' },
      ],
      reponse: 'moyenne',
    },
    reponse: { valeur: [1600, 1], unite: 'g/L', semantique: 'tolerante', decimalesIntermediaires: 1 },
    distracteurs: [
      {
        id: 'moyenne-des-sept',
        valeur: [1480, 1],
        unite: 'g/L',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        modeleErrone: {
          id: 'moyenne-des-sept-points',
          nom: 'on moyenne les sept points sans regarder le nuage',
          calcul: {
            etapes: [
              { id: 's7', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6 + @m7', unite: 'g/L' },
              { id: 'm7moy', expr: '#s7 ÷ 7', unite: 'g/L' },
            ],
            reponse: 'm7moy',
          },
        },
      },
      {
        id: 'milieu-des-deux-extremes',
        valeur: [1190, 1],
        unite: 'g/L',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        modeleErrone: {
          id: 'moyenne-du-plus-petit-et-du-plus-grand',
          nom: 'on prend le milieu entre la plus petite et la plus grande mesure',
          calcul: {
            etapes: [{ id: 'milieu', expr: '(@m5 + @m2) ÷ 2', unite: 'g/L' }],
            reponse: 'milieu',
          },
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [1580, 1620, 1600, 1590, 760, 1610, 1600],
      repereeParLEnonce: false,
      aberrante: { index: 4, facteur: 0.475 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'le-point-qui-tord-la-courbe',
  },

  // ── p05 — palier 4 · classe A · sans piège, et c’est voulu ─────────────
  //
  // Un savoir-faire n’est pas fait que de pièges : la série est saine, les
  // données sont exactement celles qu’il faut, et il reste un vrai problème à
  // résoudre. Sans items comme celui-ci, l’élève apprendrait que toute série
  // cache un traquenard — ce qui est un contrat didactique de plus.
  {
    id: 'ch01-sf5-p05-saturer-750-ml-d-eau',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'preparer-une-solution-saturee',
    // ⚠ L’énoncé disait « préparer 750 mL de SOLUTION saturée ». La chaîne, elle,
    // multiplie une masse par litre d’EAU par 750 mL — et le bloc `definition` du
    // cours dit bien « ce qu’un litre d’eau peut dissoudre ». Les deux volumes ne
    // sont pas le même : 277,5 g de solide dissous dans 750 mL d’eau font
    // nettement plus de 750 mL de solution. L’énoncé posait donc une question à
    // laquelle le calcul ne répondait pas, et l’écart n’est pas dans le bruit.
    enonce:
      'Cinq essais donnent la masse de chlorure d’ammonium dissoute au maximum dans un litre d’eau '
      + 'à 20 °C. On veut saturer {{donnee:volume}} d’eau à cette même température. '
      + 'Quelle masse de chlorure d’ammonium faut-il peser ? Donne ta réponse avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_CHLORURE_D_AMMONIUM },
    donnees: {
      m1: { valeur: [368, 1], unite: 'g/L' },
      m2: { valeur: [372, 1], unite: 'g/L' },
      m3: { valeur: [370, 1], unite: 'g/L' },
      m4: { valeur: [371, 1], unite: 'g/L' },
      m5: { valeur: [369, 1], unite: 'g/L' },
      volume: { valeur: [750, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g/L' },
        { id: 'masse', expr: '#moyenne × @volume', unite: 'g' },
      ],
      reponse: 'masse',
    },
    reponse: { valeur: [555, 2], unite: 'g', semantique: 'tolerante', tolerancePourcent: 2 },
    modelesErrones: [
      {
        id: 'oubli-de-la-moyenne',
        nom: 'modèle « le total tient lieu de mesure » : on multiplie la somme des cinq par le volume',
        calcul: {
          etapes: [
            { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g/L' },
            { id: 'masse', expr: '#somme × @volume', unite: 'g' },
          ],
          reponse: 'masse',
        },
      },
    ],
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items d’auto-évaluation
// ════════════════════════════════════════════════════════════════════════════
//
// Aucune SÉRIE de l’entraînement ni des problèmes n’est reprise, et aucune
// RÉPONSE non plus : les quinze séries sont écrites une fois, et les six
// valeurs numériques rendues ici — 316, 214, 880, 540 et 750 g/L, 1 g/cm³ — ne
// figurent nulle part avant. Un test qui recopie ses items se réussit de
// mémoire, et il mesure alors ce qu’on vient de faire, pas ce qu’on sait faire.
//
// ⚠ Ce paragraphe annonçait aussi « ni un volume », et c’était faux : les
// contenants sont ceux d’une paillasse et ils reviennent — 100 mL (`e09`, `t06`),
// 250 mL (`e04`, `p01`, `t09`), 400 mL (`t03`, `t08`), 500 mL (`e06`, `t04`).
// C’est sans conséquence, parce qu’un volume ne se retient pas comme une réponse
// se retient, mais l’écrire faux valait plus cher que de ne rien écrire.
//
// ⚠ Il annonçait enfin « les deux items qui reprennent une espèce déjà vue : le
// nitrate de potassium, le sulfate d’ammonium ». Le décompte était faux des deux
// côtés. Le sulfate d’ammonium (`t08`) n’apparaît nulle part avant. Et l’espèce
// réellement reprise est LE SEL, qui revient trois fois (`t04`, `t07`, `t09`), à
// côté du nitrate de potassium (`t01`, déjà servi en `e10`). Les quatre le font
// sur une autre série, un autre volume et une autre question.

export const TEST = Object.freeze([

  // t01 — palier 1 · A · la série la plus simple : mesures déjà en g/L
  {
    id: 'ch01-sf5-t01-six-essais-nitrate',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'six-essais-au-laboratoire',
    enonce:
      'Six essais de dissolution du nitrate de potassium dans un litre d’eau à 20 °C. Donne la '
      + 'solubilité du nitrate de potassium à 20 °C, avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_NITRATE_DE_POTASSIUM_LITRE },
    donnees: {
      m1: { valeur: [314, 1], unite: 'g/L' },
      m2: { valeur: [318, 1], unite: 'g/L' },
      m3: { valeur: [316, 1], unite: 'g/L' },
      m4: { valeur: [317, 1], unite: 'g/L' },
      m5: { valeur: [315, 1], unite: 'g/L' },
      m6: { valeur: [158, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g/L' },
      ],
      reponse: 'moyenne',
    },
    reponse: {
      valeur: [316, 1], unite: 'g/L', semantique: 'tolerante',
      tolerancePourcent: 2, decimalesIntermediaires: 1,
    },
    modelesErrones: [
      {
        id: 'moyenne-des-six-mesures',
        nom: 'modèle « toutes les mesures se valent » : la moyenne des six',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [
            { id: 's6', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6', unite: 'g/L' },
            { id: 'moy6', expr: '#s6 ÷ 6', unite: 'g/L' },
          ],
          reponse: 'moy6',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [314, 318, 316, 317, 315, 158],
      repereeParLEnonce: false,
      aberrante: { index: 5, facteur: 0.5 },
      tacheDemandee: 'exploiter',
    },
  },

  // t02 — palier 2 · A · le support change : nuage de points, mesure trop haute
  {
    id: 'ch01-sf5-t02-nuage-carbonate',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'carbonate-en-nuage-de-points',
    // Aucun `sfSollicites` : une première rédaction citait ici
    // `ch01-sf6-exploiter-une-courbe-de-solubilite`, ce que la rubrique
    // « ce que ce savoir-faire ne couvre pas » de l’en-tête contredit mot pour
    // mot — sf6 est la solubilité EN FONCTION DE LA TEMPÉRATURE : courbe, lecture,
    // interpolation. Ici la température est FIXÉE et l’axe des abscisses porte le
    // numéro d’essai. Ce nuage n’est pas une courbe de solubilité, et le déclarer
    // sollicité aurait porté des réussites au crédit d’un savoir-faire que l’item
    // ne travaille pas.
    enonce:
      'Six essais de dissolution du carbonate de sodium dans un litre d’eau à 20 °C sont reportés '
      + 'sur ce graphique. Donne la solubilité du carbonate de sodium à 20 °C, avec son unité.',
    figure: { sorte: 'graphique', donnees: SERIE_CARBONATE_NUAGE },
    donnees: {
      m1: { valeur: [212, 1], unite: 'g/L' },
      m2: { valeur: [216, 1], unite: 'g/L' },
      m3: { valeur: [214, 1], unite: 'g/L' },
      m4: { valeur: [213, 1], unite: 'g/L' },
      m5: { valeur: [428, 1], unite: 'g/L' },
      m6: { valeur: [215, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m6', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g/L' },
      ],
      reponse: 'moyenne',
    },
    reponse: { valeur: [214, 1], unite: 'g/L', semantique: 'tolerante', decimalesIntermediaires: 1 },
    modelesErrones: [
      {
        id: 'les-six-points-se-valent',
        nom: 'modèle « un point est un point » : la moyenne des six points du nuage',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [
            { id: 's6', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6', unite: 'g/L' },
            { id: 'moy6', expr: '#s6 ÷ 6', unite: 'g/L' },
          ],
          reponse: 'moy6',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [212, 216, 214, 213, 428, 215],
      repereeParLEnonce: false,
      aberrante: { index: 4, facteur: 2 },
      tacheDemandee: 'exploiter',
    },
  },

  // t03 — palier 2 · A · la grandeur en jeu change : des masses et un volume
  {
    id: 'ch01-sf5-t03-nitrate-de-sodium-dans-400-ml',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'flacon-de-400-ml',
    enonce:
      'Cinq essais ont été faits sur {{donnee:volume}} d’eau à 20 °C : à chaque fois on a noté la '
      + 'masse de nitrate de sodium dissoute au maximum. Donne la solubilité du nitrate de sodium à '
      + '20 °C, avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_NITRATE_DE_SODIUM_400_ML },
    donnees: {
      m1: { valeur: [350, 1], unite: 'g' },
      m2: { valeur: [354, 1], unite: 'g' },
      m3: { valeur: [352, 1], unite: 'g' },
      m4: { valeur: [353, 1], unite: 'g' },
      m5: { valeur: [351, 1], unite: 'g' },
      volume: { valeur: [400, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volume', unite: 'g/L' },
      ],
      reponse: 'solubilite',
    },
    reponse: { valeur: [880, 1], unite: 'g/L', semantique: 'tolerante', tolerancePourcent: 2 },
    modelesErrones: [
      {
        id: 'la-moyenne-en-grammes-suffit',
        nom: 'modèle « l’unité est celle des données » : on rend la moyenne des masses',
        piege: 'unite-absente-ou-fausse',
        calcul: {
          etapes: [
            { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
            { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
          ],
          reponse: 'moyenne',
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g/L',
      unitesPresentesDansLEnonce: ['g', 'mL'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // t04 — palier 2 · B · la température manquante, cas le plus fin du chapitre
  {
    id: 'ch01-sf5-t04-fiche-sans-temperature',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'fiche-d-experience-incomplete',
    enonce:
      'Une fiche d’expérience porte : « masse de sel dissoute : 180 g ; volume d’eau : 500 mL ; '
      + 'balance au centigramme ». Question : quelle est la solubilité de ce sel ? Donne-la avec '
      + 'son unité, ou dis qu’on ne peut pas répondre en précisant ce qui manque.',
    reponse: {
      objetFormel: DOSSIER_SANS_TEMPERATURE,
      libre: false,
      choix: 'on-ne-peut-pas-repondre-il-manque-une-grandeur',
      choixPossibles: CHOIX_AVEC_ISSUE_INDECIDABLE,
      manque: manqueDe(DOSSIER_SANS_TEMPERATURE),
      superflu: superfluDe(DOSSIER_SANS_TEMPERATURE),
    },
    piege: 'donnees-superflues-et-questions-sans-reponse',
    situation: {
      donneesFournies: DOSSIER_SANS_TEMPERATURE.fournies,
      donneesNecessaires: DOSSIER_SANS_TEMPERATURE.necessaires,
      optionIndecidableDisponible: true,
      questionDecidable: false,
    },
  },

  // t05 — palier 3 · C · double QCM, le mode de réponse change
  {
    id: 'ch01-sf5-t05-double-qcm-que-fait-on-de-la-quatrieme',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'cinq-mesures-recopiees-au-tableau',
    enonce:
      'Cinq essais sur le chlorate de potassium à 20 °C ont donné, dans l’ordre : 72 g/L, 74 g/L, '
      + '73 g/L, 152 g/L, 71 g/L. Un élève doit écrire une solubilité dans son cahier. Que doit-il '
      + 'écrire à côté de sa valeur ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'la-quatrieme-mesure-est-a-part-je-l-ecris-et-je-calcule-sans-elle',
      choixPossibles: [
        'rien-de-plus-la-valeur-suffit',
        'la-quatrieme-mesure-est-a-part-je-l-ecris-et-je-calcule-sans-elle',
        'j-efface-la-quatrieme-mesure-de-mon-tableau',
      ],
    },
    justifications: [
      {
        id: 'signaler-n-est-pas-supprimer',
        texte:
          'Signaler n’est pas supprimer : j’écris la mesure, je dis ce qui a pu se passer, et je '
          + 'précise que ma moyenne est faite sans elle. C’est ce qu’un compte rendu doit contenir.',
        juste: true,
        provenance: 'locale',
      },
      {
        // Rattachée à `valeur-aberrante`, et PAS à `unite-absente-ou-fausse`
        // comme une première rédaction le faisait. Les cinq mesures sont déjà
        // en g/L : ce qui manque à côté de la valeur n’est pas une unité, c’est
        // le SIGNALEMENT de la quatrième mesure. La règle du piège de l’unité
        // est muette là-dessus, et son contrôle — « de quelle nature est ce
        // qu’on attend ? une masse pour un volume ? oui, des g/L » — validait la
        // réponse fausse. Celle de la mesure aberrante la contredit mot pour
        // mot : « on calcule sans elle EN L’ÉCRIVANT ».
        id: 'la-valeur-se-suffit',
        texte: 'La valeur est juste, on voit bien de quoi je parle : je n’ai rien d’autre à écrire.',
        juste: false,
        provenance: 'locale',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'j-efface-pour-que-ce-soit-propre',
        texte: 'J’efface la mesure ratée de mon tableau, comme ça la moyenne est directement bonne.',
        juste: false,
        provenance: 'locale',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
      {
        id: 'la-moyenne-fera-le-tri',
        texte: 'La moyenne rattrape les écarts : je garde les cinq et je n’écris rien de plus.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « valeur-aberrante-d-une-serie-non-reperee », raisonnement '
          + '« la-moyenne-absorbe-tout » — js/data/pieges/contrat.js',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [72, 74, 73, 152, 71],
      repereeParLEnonce: false,
      // 152 ÷ 72,5 — la moyenne des quatre saines, qui est la convention suivie
      // par les onze situations de ce fichier. La première rédaction écrivait
      // 2,08, qui est 152 ÷ 73 : le rapport à UNE mesure, pas au lot.
      aberrante: { index: 3, facteur: 2.1 },
      tacheDemandee: 'exploiter',
    },
    relu: { par: 'relecture-adverse', date: '2026-08-12', hash: '790f39fc9c057c70' },
  },

  // t06 — palier 3 · A · l’ordre de grandeur, unité entièrement à produire
  {
    id: 'ch01-sf5-t06-ordre-de-grandeur-sulfate-de-zinc',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'sulfate-de-zinc-en-petit-volume',
    enonce:
      'Cinq essais ont été faits sur {{donnee:volume}} d’eau à 20 °C, en notant la masse de sulfate '
      + 'de zinc dissoute au maximum. Donne l’ORDRE DE GRANDEUR de la solubilité du sulfate de zinc '
      + 'à 20 °C, avec son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_SULFATE_DE_ZINC_100_ML },
    donnees: {
      m1: { valeur: [53, 1], unite: 'g' },
      m2: { valeur: [55, 1], unite: 'g' },
      m3: { valeur: [54, 1], unite: 'g' },
      m4: { valeur: [56, 1], unite: 'g' },
      m5: { valeur: [52, 1], unite: 'g' },
      volume: { valeur: [100, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volume', unite: 'g/L' },
      ],
      reponse: 'solubilite',
    },
    reponse: { valeur: [540, 1], unite: 'g/L', semantique: 'ordre-de-grandeur' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'g/L',
      unitesPresentesDansLEnonce: ['g', 'mL'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // t07 — palier 4 · B · le dossier décidable : trois grandeurs sur cinq servent
  {
    id: 'ch01-sf5-t07-dossier-marais-salant',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'B',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'dossier-marais-salant',
    enonce:
      'Dossier « marais salant » : un texte donne la surface du bassin et la vitesse du vent du '
      + 'jour ; un tableau de relevés donne la masse de sel dissoute et le volume d’eau du bassin ; '
      + 'une fiche technique donne la température de l’eau. On demande la solubilité du sel à cette '
      + 'température. Indique les grandeurs du dossier dont tu as besoin pour répondre — ou dis '
      + 'qu’on ne peut pas répondre en précisant ce qui manque.',
    reponse: {
      objetFormel: DOSSIER_SALINE_DECIDABLE,
      libre: false,
      // Pas `CHOIX_AVEC_ISSUE_INDECIDABLE` : son premier choix s’appelle
      // « je-donne-la-valeur », et cet énoncé-ci ne demande AUCUNE valeur — le
      // dossier n’en porte pas un seul chiffre. L’élève qui cochait
      // « je donne la valeur » se voyait donc demander un nombre qu’il n’avait
      // pas de quoi calculer. L’issue indécidable, elle, reste offerte mot pour
      // mot, ce qui est la seule chose que le piège exige.
      choix: 'je-peux-repondre-voici-les-grandeurs-utiles',
      choixPossibles: [
        'je-peux-repondre-voici-les-grandeurs-utiles',
        'on-ne-peut-pas-repondre-il-manque-une-grandeur',
      ],
      grandeursUtiles: DOSSIER_SALINE_DECIDABLE.necessaires,
      superflu: superfluDe(DOSSIER_SALINE_DECIDABLE),
    },
    piege: 'donnees-superflues-et-questions-sans-reponse',
    situation: {
      donneesFournies: DOSSIER_SALINE_DECIDABLE.fournies,
      donneesNecessaires: DOSSIER_SALINE_DECIDABLE.necessaires,
      optionIndecidableDisponible: true,
      questionDecidable: true,
    },
    dispositifServi: 'le-dossier-qui-en-donne-trop',
  },

  // t08 — palier 4 · A · non étiqueté : écarter, puis rapporter au litre
  {
    id: 'ch01-sf5-t08-sulfate-d-ammonium-six-essais',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 4,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'engrais-au-sulfate-d-ammonium',
    enonce:
      'Six essais ont été faits sur {{donnee:volume}} d’eau à 20 °C, en notant la masse de sulfate '
      + 'd’ammonium dissoute au maximum. Donne la solubilité du sulfate d’ammonium à 20 °C, avec '
      + 'son unité.',
    figure: { sorte: 'tableau', donnees: SERIE_SULFATE_D_AMMONIUM_400_ML },
    donnees: {
      m1: { valeur: [297, 1], unite: 'g' },
      m2: { valeur: [303, 1], unite: 'g' },
      m3: { valeur: [300, 1], unite: 'g' },
      m4: { valeur: [302, 1], unite: 'g' },
      m5: { valeur: [150, 1], unite: 'g' },
      m6: { valeur: [298, 1], unite: 'g' },
      volume: { valeur: [400, 1], unite: 'mL' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m6', unite: 'g' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g' },
        { id: 'solubilite', expr: '#moyenne ÷ @volume', unite: 'g/L' },
      ],
      reponse: 'solubilite',
    },
    reponse: { valeur: [750, 1], unite: 'g/L', semantique: 'tolerante', tolerancePourcent: 2 },
    modelesErrones: [
      {
        id: 'les-six-puis-le-litre',
        nom: 'modèle « toutes les mesures se valent » : les six sont moyennées, puis rapportées au litre',
        piege: 'valeur-aberrante-d-une-serie-non-reperee',
        calcul: {
          etapes: [
            { id: 's6', expr: '@m1 + @m2 + @m3 + @m4 + @m5 + @m6', unite: 'g' },
            { id: 'moy6', expr: '#s6 ÷ 6', unite: 'g' },
            { id: 'sol6', expr: '#moy6 ÷ @volume', unite: 'g/L' },
          ],
          reponse: 'sol6',
        },
      },
    ],
    piege: 'valeur-aberrante-d-une-serie-non-reperee',
    situation: {
      serie: [297, 303, 300, 302, 150, 298],
      repereeParLEnonce: false,
      aberrante: { index: 4, facteur: 0.5 },
      tacheDemandee: 'exploiter',
    },
  },

  // t09 — palier 3 · C · double QCM : ici, on PEUT répondre
  //
  // L’option « on ne peut pas répondre » est offerte, et elle est FAUSSE. C’est
  // la contrepartie sans laquelle l’item précédent ne mesurerait rien : servie
  // seulement là où elle est bonne, sa présence donnerait la réponse.
  {
    id: 'ch01-sf5-t09-double-qcm-le-thermometre-ne-sert-pas',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'C',
    cercle: 2,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'releve-avec-une-grandeur-de-trop',
    enonce:
      'Un relevé donne : masse de sel dissoute 90 g ; volume d’eau 250 mL ; température de l’eau '
      + '20 °C ; durée d’agitation 5 min ; masse du bécher vide 145 g. On demande la solubilité du '
      + 'sel à 20 °C. Peux-tu répondre ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'oui-on-peut-repondre',
      choixPossibles: [
        'oui-on-peut-repondre',
        'non-il-manque-une-grandeur',
        'non-il-y-a-trop-de-grandeurs',
      ],
    },
    justifications: [
      {
        id: 'les-deux-lignes-de-ma-liste-sont-remplies',
        texte:
          'Ma liste contient deux lignes — une masse dissoute et un volume d’eau — et les deux sont '
          + 'remplies. Les trois autres grandeurs du relevé servent à d’autres questions, ou à '
          + 'rien : ça ne m’empêche pas de répondre.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'trop-de-nombres-donc-quelque-chose-cloche',
        texte:
          'Il reste trois nombres dont je ne me sers pas, donc je m’y suis mal pris : on ne peut '
          + 'pas répondre comme ça.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « donnees-superflues-et-questions-sans-reponse », raisonnement '
          + '« toutes-les-donnees-doivent-servir » — js/data/pieges/contrat.js',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
      {
        id: 'il-manque-la-masse-du-becher-plein',
        texte:
          'Il manque la masse du bécher plein : sans elle je ne peux pas retrouver la masse '
          + 'dissoute.',
        juste: false,
        provenance: 'locale',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
      {
        id: 'je-divise-les-deux-derniers-nombres',
        texte: 'On peut répondre : je prends les deux derniers nombres du relevé et je les divise.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « donnees-superflues-et-questions-sans-reponse », raisonnement '
          + '« j-ai-pris-les-deux-derniers-nombres » — js/data/pieges/contrat.js',
        piege: 'donnees-superflues-et-questions-sans-reponse',
      },
    ],
    piege: 'donnees-superflues-et-questions-sans-reponse',
    situation: {
      donneesFournies: ['masse-dissoute', 'volume-d-eau', 'temperature-de-l-eau', 'duree-d-agitation', 'masse-du-becher-vide'],
      donneesNecessaires: ['masse-dissoute', 'volume-d-eau', 'temperature-de-l-eau'],
      optionIndecidableDisponible: true,
      questionDecidable: true,
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-12', hash: 'ee4beaa77c734d4d' },
  },

  // t10 — palier 1 · A′ · le rituel de contrôle
  //
  // Pas un automatisme de calcul : le GESTE de contrôle. Il est exclu de la
  // fenêtre des cinq séances, sinon il sature mécaniquement le cercle 1. La
  // valeur n’est pas démontrée, elle est LUE dans la table centrale sourcée, et
  // le contrôle rejoue la lecture.
  //
  // ⚠ Une première rédaction demandait « quelle est la masse volumique de
  // l’eau ? » sans rien d’autre. C’était demander DE MÉMOIRE une notion du
  // chapitre 4 à un élève qui est au chapitre 1 — et le chapitre 4 est le seul
  // du plan que deux textes officiels se disputent, donc précisément celui dont
  // on ne peut rien présupposer. C’était aussi contredire le commentaire
  // ci-dessus, qui annonce une valeur LUE. L’énoncé donne maintenant la table à
  // lire, comme le fait `ch01-sf2-e04` pour la même grandeur au même chapitre,
  // et `sfSollicites` inscrit la dépendance au lieu de la laisser tacite.
  {
    id: 'ch01-sf5-t10-rituel-un-litre-d-eau-pese-combien',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    sfSollicites: ['ch04-sf6-identifier-un-materiau-par-sa-masse-volumique'],
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'ordre-de-grandeur-avant-de-conclure',
    enonce:
      'Tu viens de trouver qu’un litre d’eau peut dissoudre plusieurs centaines de grammes de sel. '
      + 'Avant de conclure, tu contrôles l’ordre de grandeur : combien pèse l’eau elle-même ? Lis '
      + 'dans la table des masses volumiques la ligne « eau », et recopie sa valeur avec son unité.',
    requete: { table: 'masses-volumiques', cle: 'eau', colonne: 'masseVolumique' },
    reponse: { valeur: [1, 1], unite: 'g/cm³', semantique: 'exacte' },
    rituelDeControle: true,
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════

/** Les 25 items du savoir-faire, dans l’ordre où le chapitre les présente.
 *  C’est cette liste que `validerItem` et `tools/verifier-contenu.mjs` lisent :
 *  `DECOUVERTE`, `COURS` et `METHODE` n’en font pas partie et n’ont pas à en
 *  faire — ils ne portent ni classe de garantie, ni cercle, ni palier, et les
 *  compter fausserait tous les dénominateurs de la charte. */
export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);
