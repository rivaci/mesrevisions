// Les savoir-faire du programme — l'objet que le moteur nommait sans le définir.
//
// ── Pourquoi ce fichier existe ──────────────────────────────────────────────
//
// `srs.js` demande `{ diagnostic: 'type' | 'absent' }` pour décider d'une
// maîtrise ; `seance.js` indexe ses échéances par `sfPrincipal` ; huit pièges de
// rang 2 portent un `iatrogene` qui est un identifiant de savoir-faire. Trois
// modules lisaient donc un catalogue qui n'existait nulle part, et le résultat
// n'était pas une erreur : `estMaitrise` renvoyait « diagnostic hors énuméré »
// pour TOUS les savoir-faire, ce qui est un verdict parfaitement normal — aucun
// savoir-faire ne pouvait être acquis, et rien ne le disait.
//
// ── Ce que ce fichier tranche, et ce qu'il ne tranche pas ───────────────────
//
// Il tranche la LISTE : 86 savoir-faire, 13 chapitres, dans l'ordre et avec les
// formulations de `programme.md` § 3, corrigées par les onze reformulations que
// `charte.md` § « Les douze savoir-faire à reformuler » impose — le verbe du
// geste (« brancher », « mesurer », « mettre en œuvre ») est remplacé partout
// par le verbe de la représentation, et le « et prévoir ce qu'il indiquera » de
// la colonne de droite n'est pas cosmétique : c'est lui qui produit l'item hors
// cercle 3 sans lequel le savoir-faire n'est pas acquérable.
//
// Il ne tranche PAS le contenu des sections : ni cours, ni items. Un savoir-faire
// est ici une CLÉ et ses contraintes, pas une leçon.
//
// ── La règle qui a décidé du champ `diagnostic` ─────────────────────────────
//
// `diagnostic` n'est pas déclaré à la main : il est DÉRIVÉ de `pieges`. La
// charte écrit « un savoir-faire sans piège typé porte `diagnostic: absent` », et
// un champ saisi à côté de la liste qui le détermine est un champ qui finira par
// la contredire — c'est exactement le défaut que la charte reproche au
// `formatDiagnostique` déclaré de la v1. Le contrôle refuse toute contradiction
// entre les deux, ce qui rend le dérivé opposable au lieu de tacite.
//
// Conséquence à regarder en face : le catalogue des pièges en porte 31, et il ne
// couvre pas les 86 savoir-faire. VINGT d'entre eux sont donc « couverts, non
// diagnostiqués », et ils le RESTENT tant qu'aucun piège documenté ne les vise.
// C'est la position de la charte, écrite en toutes lettres — « un piège inventé
// vaut moins que pas de piège » — et son coût est nommé : ces vingt ne
// paraîtront jamais « acquis » dans le panneau parents, seulement « couverts ».
//
// ── L'unité imposée : trois cas dans tout le plan, et pas un de plus ────────
//
// `charte.md` § « L'algèbre des unités » : le seul motif recevable pour refuser
// une unité équivalente est que la conversion SOIT le savoir-faire. Trois cas —
// g/cm³ ↔ kg/m³, m/s ↔ km/h, J ↔ kWh. Partout ailleurs `unite: 'libre'`, parce
// que refuser 2 700 kg/m³ à un élève qui répond juste est une faute d'exerciseur
// et la première cause de faux négatifs relevée au benchmark.

import { PIEGES } from './pieges/index.js';

// ════════════════════════════════════════════════════════════════════════════
// Les attendus du BO — ce à quoi tout savoir-faire doit se rattacher
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les attendus de fin de cycle du programme 2020, thème par thème.
 *
 * Le programme n'énonce QUE cela : il n'existe ni attendus de fin de 4ᵉ ni
 * repères annuels en physique-chimie (le BO n°22 du 29 mai 2019 qui les a créés
 * ne couvre que le français et les mathématiques). Toute la répartition par
 * année de ce fichier est donc une reconstruction argumentée, et le seul point
 * d'ancrage officiel est cette table. L'invariant 17 s'y adosse : un attendu ni
 * couvert ni exclu bloque le build.
 */
export const ATTENDUS_BO = Object.freeze({
  't1-constitution-et-etats': { theme: 1, texte: 'Décrire la constitution et les états de la matière' },
  't1-transformations': { theme: 1, texte: 'Décrire et expliquer des transformations chimiques' },
  't1-organisation-univers': { theme: 1, texte: "Décrire l'organisation de la matière dans l'Univers" },
  't2-mouvement': { theme: 2, texte: 'Caractériser un mouvement' },
  't2-interaction-force': {
    theme: 2,
    texte: 'Modéliser une interaction par une force caractérisée par un point '
      + "d'application, une direction, un sens et une valeur",
  },
  't3-energie': { theme: 3, texte: 'Identifier les sources, les transferts, les conversions et les formes d\'énergie' },
  't3-conservation': { theme: 3, texte: "Utiliser la conservation de l'énergie" },
  't3-circuits': { theme: 3, texte: "Réaliser des circuits électriques simples et exploiter les lois de l'électricité" },
  't4-types-de-signaux': { theme: 4, texte: 'Caractériser différents types de signaux (lumineux, sonores, radio…)' },
  't4-proprietes-des-signaux': { theme: 4, texte: 'Utiliser les propriétés de ces signaux' },
});

/**
 * Ce que l'application ÉCARTE d'un attendu officiel, avec la citation qui le
 * justifie. Sans cette rubrique, écarter un attendu est un silence ; avec elle,
 * c'est une décision qu'un professeur peut contester.
 */
export const NON_DEMANDE = Object.freeze([
  Object.freeze({
    attendu: 't3-conservation',
    portee: 'totale',
    motif: "Le programme en fait un objectif de FIN DE CYCLE, et la recherche situe l'acquisition "
      + 'deux ans plus loin (Neumann et al. 2013 : les élèves de grade 8 acquièrent le transfert et '
      + "la conversion, pas la conservation). C'est la première fois que l'application écarte un "
      + 'attendu officiel plutôt qu\'une notion de 3ᵉ, et c\'est assumé par écrit.',
    citation: 'la pleine maîtrise de la notion de conservation de l\'énergie est également un objectif de fin de cycle',
    source: 'BO n°31 du 30 juillet 2020, programme de physique-chimie du cycle 4',
  }),
  Object.freeze({
    attendu: 't4-types-de-signaux',
    portee: 'partielle',
    quoi: 'les rayonnements autres que la lumière visible et le son : ondes radio, rayons X, infrarouges, ultraviolets',
    motif: "Le programme range ces rayonnements dans une DÉCOUVERTE de fin de cycle, sans "
      + "attendu de savoir-faire, et aucune des sept progressions de professeurs dépouillées pour "
      + 'ce projet ne les place en 4ᵉ. Le reste de l\'attendu est couvert : le chapitre 9 traite la '
      + "lumière et le son, leurs conditions de propagation et leurs vitesses. Ce qui est écarté, "
      + "c'est le panorama du spectre — et l'application le DIT à l'élève plutôt que de le taire, "
      + "parce que « est-ce que c'est au programme ? » est la question la plus fréquente avant un "
      + 'contrôle, et que personne sur le marché n\'y répond.',
    citation: 'les élèves découvrent différents types de rayonnements (lumière visible, ondes radio, rayons X…)',
    source: 'BO n°31 du 30 juillet 2020, programme de physique-chimie du cycle 4',
  }),
]);

/**
 * Les arbitrages que personne n'a pris, et que le contrôle refuse de laisser
 * passer en silence.
 *
 * `charte.md` invariant 17 : « un attendu du BO ni couvert ni exclu — c'est le
 * cas aujourd'hui des ondes radio et des autres rayonnements, et l'invariant
 * BLOQUE LE BUILD tant qu'il n'est pas tranché ». Cette liste est le mécanisme
 * de ce blocage : elle est vide quand tout est tranché.
 *
 * Ne pas la vider en écrivant l'exclusion à la place de l'auteur : décider que
 * les ondes radio sortent du périmètre est une décision de contenu, pas une
 * décision de contrôleur.
 */
// Vide : tout est tranché. Le dernier arbitrage — les ondes radio et les autres
// rayonnements — est parti dans NON_DEMANDE en portée partielle, avec sa
// citation. Le chapitre 9 couvre bien la lumière et le son ; c'est le panorama
// du spectre qui sort, et l'application le dit à l'élève.
//
// Cette liste se remplit à nouveau dès qu'un attendu du BO se retrouve ni
// couvert ni exclu, et l'invariant 17 bloque alors le build. C'est voulu : un
// attendu oublié doit coûter un arrêt, pas produire un silence.
export const ARBITRAGES_EN_ATTENTE = Object.freeze([]);

// ════════════════════════════════════════════════════════════════════════════
// Le contrat inter-dépôts avec les mathématiques
// ════════════════════════════════════════════════════════════════════════════

/**
 * `charte.md` § « Le lien avec les mathématiques » : la liste des sections de
 * `maths-4e` est un artefact publié et versionné, `maths-4e/public/sections.json`,
 * dont la version est figée ici. Le contrôle vérifie la version, puis l'existence
 * de chaque identifiant cité.
 *
 * ⚠ L'artefact N'EXISTE PAS aujourd'hui : `4eme/maths/` n'a pas de dossier
 * `public/`. `version: null` le déclare plutôt que de figer un numéro inventé,
 * et le contrôle en fait une RÉSERVE nommée — « le renvoi n'est pas vérifiable »
 * — au lieu de vérifier contre une cible absente et de conclure que tout va bien.
 * Un contrôle qui compare à rien passe toujours.
 */
export const CONTRAT_MATHS = Object.freeze({
  artefact: 'maths-4e/public/sections.json',
  version: null,
  motif: "l'artefact n'est pas encore publié ; les identifiants ci-dessous sont ceux de "
    + '`4eme/maths/js/data/chapitres/`, lus le 12 août 2026, et rien ne garantit leur stabilité.',
});

/** Un renvoi vers les mathématiques, dans la forme que le contrôle sait lire. */
const maths = (chapitre, sections, trimestre, pourquoi) =>
  Object.freeze({ chapitre, sections: Object.freeze(sections), trimestre, pourquoi });

const MATHS_QUOTIENT = maths(
  5, ['sf-5-5', 'sf-5-6'], 1,
  'grandeur quotient et conversion d\'unités composées — installées depuis la fin du trimestre 1',
);
const MATHS_PUISSANCES = maths(
  6, ['sf-6-3', 'sf-6-4', 'sf-6-5'], 2,
  'puissances de dix, notation scientifique et comparaison d\'ordres de grandeur',
);

// ════════════════════════════════════════════════════════════════════════════
// Les chapitres
// ════════════════════════════════════════════════════════════════════════════

/**
 * `statut` et `dispute` sont DEUX AXES, pas trois valeurs.
 *
 * La v1 de la charte en faisait une énumération exclusive, et l'effet était
 * exactement contraire à l'intention : l'interrupteur « ton prof a-t-il fait ce
 * chapitre ? » était attaché à la seule valeur `frontiere`, si bien que marquer
 * le chapitre 10 « disputé » le lui retirait, et que le chapitre 4 — noyau ET
 * disputé, le chapitre le plus emblématique de la 4ᵉ — n'en recevait jamais.
 * Le troisième statut, ajouté pour dire la vérité, désactivait le dispositif qui
 * la rendait utilisable.
 *
 * L'interrupteur est donc étendu à tout chapitre dont `dispute ≠ null`, quel que
 * soit son statut.
 */
export const CHAPITRES = Object.freeze([
  {
    id: 'ch01-melanges-et-solubilite',
    numero: 1,
    titre: 'Mélanges, corps purs et solubilité',
    statut: 'noyau',
    trimestre: 1,
    programme: '2020',
    dispute: null,
    nonDemande: [
      { notion: 'mesure de pH et lien pH ↔ ions', niveau: '3ᵉ', citation: "le lien entre le pH et les ions hydrogène suppose l'étude des ions et donc de la structure de l'atome. Elle n'est pas à envisager à ce niveau", source: 'Éduscol, ressource d\'accompagnement, juin 2016' },
      { notion: 'concentration et mole', niveau: 'lycée', citation: 'notions implicites, hors attendus du cycle 4', source: 'BO n°31 du 30 juillet 2020' },
      { notion: "pression et son effet sur la solubilité des gaz", niveau: 'hors cycle 4', citation: 'la pression ne figure qu\'en notion implicite', source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'ch02-tension-electrique',
    numero: 2,
    titre: 'La tension électrique',
    statut: 'noyau',
    trimestre: 1,
    programme: '2020',
    dispute: null,
    ordreImpose: {
      quoi: 'tension avant intensité',
      choisiParNous: true,
      pour: "aborder l'intensité avant la tension peut induire l'idée que la tension est due au courant",
      contre: "les différentes lois de l'électricité peuvent être abordées sans qu'un ordre précis ne s'impose",
      // Le programme n'impose PAS cet ordre : nous l'imposons, l'application le
      // dit, et la dépendance est SIGNALANTE, jamais bloquante. C'est le reproche
      // exact adressé au marché ; on ne le commet pas en silence.
      bloquant: false,
    },
    nonDemande: [
      { notion: 'puissance électrique P = U·I et E = P·t', niveau: '3ᵉ', citation: 'les aspects énergétiques peuvent être réservés à la classe de troisième', source: 'BO n°31 du 30 juillet 2020' },
      { notion: 'régime alternatif', niveau: 'hors cycle 4', citation: 'aucun attendu de fin de cycle n\'est lié aux circuits en régime alternatif', source: 'Éduscol, juin 2016' },
    ],
  },
  {
    id: 'ch03-air-et-composition',
    numero: 3,
    titre: "L'air et sa composition",
    statut: 'noyau',
    trimestre: 1,
    programme: '2020',
    dispute: null,
    nonDemande: [
      { notion: 'tests d\'ions', niveau: '3ᵉ', citation: 'les ions relèvent de la classe de troisième', source: 'Éduscol, juin 2016' },
      { notion: 'pression atmosphérique', niveau: 'hors cycle 4', citation: 'notion implicite, pas un attendu', source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'ch04-masse-volumique',
    numero: 4,
    titre: 'Masse volumique',
    statut: 'noyau',
    trimestre: 1,
    programme: '2020',
    // Le seul chapitre du programme sur lequel deux textes officiels se
    // contredisent. Il reste `noyau` — les sept progressions dépouillées le
    // mettent toutes en 4ᵉ — mais il porte l'interrupteur, parce que c'est
    // précisément là qu'un élève risque de tomber sur un chapitre non fait.
    dispute: {
      textes: [
        { texte: "L'introduction de la grandeur quotient masse volumique se fait progressivement à partir de la classe de 4ᵉ.", source: 'Repères de progressivité, BO n°31 du 30 juillet 2020' },
        { texte: 'la grandeur quotient masse volumique pourra être introduite en troisième', source: "Éduscol, ressource d'accompagnement, note 6, juin 2016" },
      ],
    },
    nonDemande: [
      { notion: 'densité au sens strict', niveau: 'hors programme', citation: 'le programme dit masse volumique, jamais densité', source: 'BO n°31 du 30 juillet 2020' },
      { notion: "poussée d'Archimède", niveau: 'lycée', citation: 'hors attendus du cycle 4', source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'ch05-atomes-molecules',
    numero: 5,
    titre: 'Atomes, molécules et formules chimiques',
    statut: 'noyau',
    trimestre: 2,
    programme: '2020',
    dispute: null,
    nonDemande: [
      { notion: "structure de l'atome (noyau, protons, neutrons, électrons)", niveau: '3ᵉ', citation: 'peut être réservée à la classe de troisième', source: 'BO n°31 du 30 juillet 2020' },
      { notion: 'ions', niveau: '3ᵉ', citation: 'les ions relèvent de la classe de troisième', source: 'Éduscol, juin 2016' },
      { notion: "insistance sur la notion d'élément chimique", niveau: 'hors 4ᵉ', citation: 'le tableau périodique est considéré à partir de la classe de 4ᵉ comme un outil de classement et de repérage des atomes constitutifs de la matière, sans qu\'il faille insister sur la notion d\'élément chimique', source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'ch06-transformations-chimiques',
    numero: 6,
    titre: 'Transformations chimiques et combustions',
    statut: 'noyau',
    trimestre: 2,
    programme: '2020',
    dispute: null,
    nonDemande: [
      // Le faux ami n°1 de toute la matière.
      { notion: "ajuster (« équilibrer ») une équation de réaction", niveau: 'aucune année du collège', citation: "Aucun attendu de fin de cycle n'est fixé en termes d'ajustement d'une équation de réaction.", source: 'Éduscol, juin 2016' },
      { notion: 'transformations mettant en jeu des espèces chargées', niveau: '3ᵉ', citation: 'en quatrième, on peut travailler à partir de transformations chimiques ne mettant en jeu que des espèces neutres', source: 'Éduscol, juin 2016' },
    ],
  },
  {
    id: 'ch07-intensite-du-courant',
    numero: 7,
    titre: "L'intensité du courant",
    statut: 'noyau',
    trimestre: 2,
    programme: '2020',
    dispute: null,
    nonDemande: [
      { notion: "résistance et loi d'Ohm", niveau: 'non tranché par le programme', citation: "les différentes lois de l'électricité peuvent être abordées sans qu'un ordre précis ne s'impose", source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'ch08-mouvement-et-vitesse',
    numero: 8,
    titre: 'Mouvement et vitesse',
    statut: 'noyau',
    trimestre: 2,
    programme: '2020',
    dispute: null,
    nonDemande: [
      { notion: 'vecteur vitesse', niveau: 'lycée', citation: 'la notion de vecteur vitesse relevant du lycée', source: 'Éduscol, juin 2016' },
      { notion: "accélération comme grandeur, principe d'inertie", niveau: '3ᵉ ou lycée', citation: 'hors attendus de la 4ᵉ', source: 'Éduscol, juin 2016' },
    ],
  },
  {
    id: 'ch09-lumiere-son',
    numero: 9,
    titre: 'Vitesse de propagation de la lumière et du son',
    statut: 'noyau',
    trimestre: 3,
    programme: '2020',
    dispute: null,
    nonDemande: [
      { notion: 'fréquence, T = 1/f, sons audibles', niveau: '3ᵉ', citation: 'non exigible en fin de cycle', source: 'BO n°31 du 30 juillet 2020' },
      { notion: "longueur d'onde, réfraction quantitative", niveau: 'lycée', citation: 'hors attendus du cycle 4', source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'ch10-interactions-et-forces',
    numero: 10,
    titre: 'Interactions et forces',
    statut: 'frontiere',
    trimestre: 3,
    programme: '2020',
    dispute: {
      textes: [
        { texte: "En classe de quatrième, il est possible par exemple de se focaliser sur l'interaction à distance que la Terre exerce sur un objet à son voisinage et d'étudier le poids, le concept de force étant généralisé en troisième.", source: "Éduscol, ressource d'accompagnement, juin 2016" },
        { texte: 'Les progressions réelles dépouillées font l\'inverse : les forces en 4ᵉ, le poids et P = m·g en 3ᵉ (6 progressions sur 7).', source: 'Progressions académiques Lille et Limoges, 2016-2022' },
      ],
    },
    nonDemande: [
      { notion: 'gravitation universelle quantitative', niveau: 'fin de cycle / lycée', citation: 'loi fournie, hors 4ᵉ', source: 'BO n°31 du 30 juillet 2020' },
      { notion: 'équilibre formalisé, impesanteur quantitative', niveau: 'hors 4ᵉ', citation: "l'impesanteur n'est abordée que qualitativement", source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'ch11-univers-systeme-solaire',
    numero: 11,
    titre: "L'Univers et le système solaire",
    statut: 'frontiere',
    trimestre: 3,
    programme: '2020',
    dispute: null,
    // Le chapitre le plus mobile du cycle : 4ᵉ dans 3 sources sur 7, 5ᵉ dans 2,
    // 3ᵉ dans 2. Il ne doit JAMAIS être prérequis d'un autre chapitre.
    jamaisPrerequis: true,
    nonDemande: [
      { notion: "constituants de l'atome et nucléosynthèse", niveau: '3ᵉ', citation: 'hors 4ᵉ', source: 'Éduscol, juin 2016' },
      { notion: 'lois de Kepler, gravitation quantitative', niveau: 'lycée', citation: 'hors cycle 4', source: 'BO n°31 du 30 juillet 2020' },
    ],
  },
  {
    id: 'opt-a-loi-d-ohm',
    numero: 12,
    titre: "Loi d'Ohm et résistance électrique",
    statut: 'frontiere',
    trimestre: 3,
    programme: '2020',
    dispute: {
      textes: [
        { texte: "les différentes lois de l'électricité peuvent être abordées sans qu'un ordre précis ne s'impose", source: 'BO n°31 du 30 juillet 2020' },
        { texte: "4ᵉ dans 3 des 7 progressions dépouillées, 3ᵉ dans les 4 autres : aucun texte ne tranche.", source: 'Progressions académiques Lille et Limoges, 2016-2022' },
      ],
    },
    nonDemande: [],
  },
  {
    id: 'opt-b-poids-et-pesanteur',
    numero: 13,
    titre: 'Poids et pesanteur',
    statut: 'frontiere',
    trimestre: 3,
    programme: '2020',
    dispute: {
      textes: [
        { texte: "En classe de quatrième, il est possible par exemple […] d'étudier le poids, le concept de force étant généralisé en troisième.", source: "Éduscol, ressource d'accompagnement, juin 2016" },
        { texte: 'P = m·g et la distinction poids/masse sont en 3ᵉ dans 6 progressions réelles sur 7.', source: 'Progressions académiques Lille et Limoges, 2016-2022' },
      ],
    },
    nonDemande: [],
  },
].map(Object.freeze));

export const CHAPITRE_PAR_ID = Object.freeze(Object.fromEntries(CHAPITRES.map((c) => [c.id, c])));

// ════════════════════════════════════════════════════════════════════════════
// Les 86 savoir-faire
// ════════════════════════════════════════════════════════════════════════════

/**
 * Un savoir-faire, dans la forme que trois modules lisent.
 *
 *   id            un verbe, un objet — la clé du suivi, jamais renommée
 *   titre         la formulation SERVIE, celle de charte.md quand elle reformule
 *   chapitre      id de chapitre
 *   cercle        le cercle DOMINANT — indicatif. Le cercle qui compte est celui
 *                 de l'ITEM ; celui-ci sert au repérage d'auteur et au contrôle
 *                 « tout savoir-faire porte au moins un item hors cercle 3 ».
 *   pieges        les pièges de conception que ce savoir-faire rencontre
 *   diagnostic    DÉRIVÉ de `pieges` — voir l'en-tête
 *   unite         'libre' | 'imposee' (+ motifUniteImposee)
 *   prerequisMaths  null, ou un renvoi versionné vers maths-4e
 *   attendu       clé de ATTENDUS_BO
 *   reformule     la formulation d'origine, quand charte.md l'a corrigée
 *   filTransversal  'energie' pour les quatre sections greffées
 */
const sf = (e) => Object.freeze({
  sfSollicitesFrequents: Object.freeze([]),
  pieges: Object.freeze([]),
  unite: 'libre',
  prerequisMaths: null,
  filTransversal: null,
  reformule: null,
  ...e,
  pieges: Object.freeze(e.pieges ?? []),
  diagnostic: (e.pieges ?? []).length > 0 ? 'type' : 'absent',
});

export const SAVOIR_FAIRE = Object.freeze([
  // ── Ch. 1 — Mélanges, corps purs et solubilité ────────────────────────────
  sf({ id: 'ch01-sf1-distinguer-corps-pur-et-melange', titre: "Distinguer un corps pur d'un mélange", chapitre: 'ch01-melanges-et-solubilite', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['serie-etiquetee-par-le-chapitre'] }),
  sf({ id: 'ch01-sf2-distinguer-melange-homogene-et-heterogene', titre: "Distinguer un mélange homogène d'un mélange hétérogène", chapitre: 'ch01-melanges-et-solubilite', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['serie-etiquetee-par-le-chapitre'] }),
  sf({ id: 'ch01-sf3-identifier-un-corps-pur-par-sa-temperature', titre: 'Identifier un corps pur par sa température de changement d\'état', chapitre: 'ch01-melanges-et-solubilite', cercle: 1, attendu: 't1-constitution-et-etats' }),
  sf({ id: 'ch01-sf4-prevoir-la-miscibilite-de-deux-liquides', titre: 'Prévoir si deux liquides sont miscibles', chapitre: 'ch01-melanges-et-solubilite', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['serie-etiquetee-par-le-chapitre'] }),
  sf({
    id: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    titre: "Exploiter une série de mesures pour estimer une solubilité, et dire pourquoi une seule mesure ne suffit pas",
    reformule: 'Estimer expérimentalement une valeur de solubilité dans l\'eau',
    chapitre: 'ch01-melanges-et-solubilite', cercle: 2, attendu: 't1-constitution-et-etats',
    pieges: ['valeur-aberrante-d-une-serie-non-reperee', 'unite-absente-ou-fausse', 'donnees-superflues-et-questions-sans-reponse'],
  }),
  sf({ id: 'ch01-sf6-exploiter-une-courbe-de-solubilite', titre: 'Exploiter une courbe de solubilité en fonction de la température', chapitre: 'ch01-melanges-et-solubilite', cercle: 1, attendu: 't1-constitution-et-etats', pieges: ['valeur-aberrante-d-une-serie-non-reperee', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch01-sf7-decrire-la-dissolution-d-un-gaz', titre: "Décrire la dissolution d'un gaz dans l'eau et son effet sur la masse", chapitre: 'ch01-melanges-et-solubilite', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['matiere-disparait-quand-on-ne-la-voit-plus'] }),

  // ── Ch. 2 — La tension électrique ─────────────────────────────────────────
  sf({ id: 'ch02-sf1-schematiser-un-circuit', titre: 'Schématiser un circuit avec les symboles normalisés', chapitre: 'ch02-tension-electrique', cercle: 3, attendu: 't3-circuits' }),
  sf({ id: 'ch02-sf2-distinguer-serie-et-derivation', titre: "Distinguer un circuit en série d'un circuit en dérivation", chapitre: 'ch02-tension-electrique', cercle: 3, attendu: 't3-circuits', pieges: ['mesurer-en-coupant-le-circuit'] }),
  sf({
    id: 'ch02-sf3-placer-un-voltmetre-et-prevoir-son-indication',
    titre: "Indiquer où placer un voltmètre sur un schéma, et prévoir ce qu'il indiquera",
    reformule: 'Brancher un voltmètre en dérivation aux bornes d\'un dipôle',
    chapitre: 'ch02-tension-electrique', cercle: 3, attendu: 't3-circuits',
    pieges: ['mesurer-en-coupant-le-circuit'],
  }),
  sf({
    id: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    titre: "Lire une tension sur un appareil affiché, avec son calibre, et l'exprimer avec son unité",
    reformule: 'Mesurer une tension et l\'exprimer avec son unité',
    chapitre: 'ch02-tension-electrique', cercle: 3, attendu: 't3-circuits',
    pieges: ['unite-absente-ou-fausse'],
  }),
  sf({ id: 'ch02-sf5-loi-d-unicite-des-tensions', titre: "Utiliser la loi d'unicité des tensions", chapitre: 'ch02-tension-electrique', cercle: 1, attendu: 't3-circuits', pieges: ['reponse-conforme-sans-adhesion'] }),
  sf({ id: 'ch02-sf6-loi-d-additivite-des-tensions', titre: "Utiliser la loi d'additivité des tensions (circuit à une maille)", chapitre: 'ch02-tension-electrique', cercle: 1, attendu: 't3-circuits', pieges: ['reponse-conforme-sans-adhesion', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch02-sf7-verifier-l-adaptation-d-une-lampe', titre: "Vérifier l'adaptation d'une lampe à un générateur", chapitre: 'ch02-tension-electrique', cercle: 1, attendu: 't3-circuits' }),

  // ── Ch. 3 — L'air et sa composition ───────────────────────────────────────
  sf({ id: 'ch03-sf1-composition-de-l-air', titre: "Donner la composition de l'air en dioxygène et diazote", chapitre: 'ch03-air-et-composition', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['gaz-n-est-pas-de-la-matiere'] }),
  sf({ id: 'ch03-sf2-ordonner-le-test-du-dioxygene', titre: 'Ordonner les étapes du test du dioxygène, et prévoir son résultat', reformule: 'Mettre en œuvre le test du dioxygène', chapitre: 'ch03-air-et-composition', cercle: 3, attendu: 't1-transformations' }),
  sf({ id: 'ch03-sf3-ordonner-le-test-du-dioxyde-de-carbone', titre: 'Ordonner les étapes du test du dioxyde de carbone, et prévoir son résultat', reformule: 'Mettre en œuvre le test du dioxyde de carbone', chapitre: 'ch03-air-et-composition', cercle: 3, attendu: 't1-transformations' }),
  sf({ id: 'ch03-sf4-ordonner-le-test-de-l-eau', titre: "Ordonner les étapes du test de l'eau, et prévoir son résultat", reformule: "Mettre en œuvre le test de l'eau", chapitre: 'ch03-air-et-composition', cercle: 3, attendu: 't1-transformations' }),
  sf({
    id: 'ch03-sf5-exploiter-une-pesee-pour-etablir-que-l-air-a-une-masse',
    titre: "Exploiter une pesée avant/après pour établir que l'air a une masse",
    reformule: "Montrer expérimentalement que l'air a une masse",
    chapitre: 'ch03-air-et-composition', cercle: 1, attendu: 't1-constitution-et-etats',
    pieges: ['gaz-n-est-pas-de-la-matiere', 'unite-absente-ou-fausse', 'donnees-superflues-et-questions-sans-reponse'],
  }),
  sf({ id: 'ch03-sf6-identifier-un-gaz-a-effet-de-serre', titre: 'Identifier un gaz à effet de serre parmi une liste', chapitre: 'ch03-air-et-composition', cercle: 0, attendu: 't1-constitution-et-etats' }),

  // ── Ch. 4 — Masse volumique ───────────────────────────────────────────────
  sf({
    id: 'ch04-sf1-lire-une-masse-et-un-volume-par-deplacement-d-eau',
    titre: "Lire une masse et un volume sur des appareils affichés, et en déduire le volume de l'objet immergé",
    reformule: "Mesurer une masse et un volume, y compris par déplacement d'eau",
    chapitre: 'ch04-masse-volumique', cercle: 3, attendu: 't1-constitution-et-etats',
    pieges: ['unite-absente-ou-fausse'],
  }),
  sf({ id: 'ch04-sf2-calculer-une-masse-volumique', titre: "Calculer une masse volumique à partir d'une masse et d'un volume", chapitre: 'ch04-masse-volumique', cercle: 1, attendu: 't1-constitution-et-etats', prerequisMaths: MATHS_QUOTIENT, pieges: ['confusion-masse-et-masse-volumique', 'meme-taille-donc-meme-masse', 'unite-absente-ou-fausse', 'valeur-invraisemblable-non-critiquee'] }),
  sf({ id: 'ch04-sf3-calculer-une-masse', titre: 'Calculer une masse connaissant la masse volumique et le volume', chapitre: 'ch04-masse-volumique', cercle: 1, attendu: 't1-constitution-et-etats', prerequisMaths: MATHS_QUOTIENT, pieges: ['confusion-masse-et-masse-volumique', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch04-sf4-calculer-un-volume', titre: 'Calculer un volume connaissant la masse volumique et la masse', chapitre: 'ch04-masse-volumique', cercle: 1, attendu: 't1-constitution-et-etats', prerequisMaths: MATHS_QUOTIENT, pieges: ['confusion-masse-et-masse-volumique', 'unite-absente-ou-fausse'] }),
  sf({
    id: 'ch04-sf5-convertir-entre-g-par-cm3-et-kg-par-m3',
    titre: 'Convertir entre g/cm³ et kg/m³',
    chapitre: 'ch04-masse-volumique', cercle: 1, attendu: 't1-constitution-et-etats',
    prerequisMaths: MATHS_QUOTIENT,
    unite: 'imposee',
    motifUniteImposee: "la conversion EST le savoir-faire : accepter g/cm³ à une question posée en kg/m³ "
      + "reviendrait à valider la réponse non convertie. C'est l'un des trois seuls cas du plan.",
    pieges: ['confusion-masse-et-masse-volumique', 'unite-absente-ou-fausse'],
  }),
  sf({ id: 'ch04-sf6-identifier-un-materiau-par-sa-masse-volumique', titre: 'Identifier un matériau en comparant sa masse volumique à une table', chapitre: 'ch04-masse-volumique', cercle: 1, attendu: 't1-constitution-et-etats', pieges: ['meme-taille-donc-meme-masse', 'valeur-invraisemblable-non-critiquee', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch04-sf7-prevoir-la-position-de-deux-liquides-non-miscibles', titre: 'Prévoir la position relative de deux liquides non miscibles', chapitre: 'ch04-masse-volumique', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['meme-taille-donc-meme-masse'] }),
  sf({ id: 'ch04-sf8-expliquer-la-dilatation-de-l-eau', titre: "Expliquer la dilatation de l'eau par la variation de sa masse volumique", chapitre: 'ch04-masse-volumique', cercle: 0, attendu: 't1-constitution-et-etats' }),

  // ── Ch. 5 — Atomes, molécules et formules chimiques ───────────────────────
  sf({ id: 'ch05-sf1-distinguer-un-atome-d-une-molecule', titre: "Distinguer un atome d'une molécule", chapitre: 'ch05-atomes-molecules', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['particules-heritent-du-macroscopique', 'vide-entre-les-particules-rempli'] }),
  sf({ id: 'ch05-sf2-associer-un-symbole-a-un-element', titre: "Associer un symbole à un élément à l'aide du tableau périodique", chapitre: 'ch05-atomes-molecules', cercle: 0, attendu: 't1-constitution-et-etats' }),
  sf({ id: 'ch05-sf3-retrouver-un-element-a-partir-de-son-symbole', titre: 'Retrouver un élément à partir de son symbole, et réciproquement', chapitre: 'ch05-atomes-molecules', cercle: 0, attendu: 't1-constitution-et-etats' }),
  sf({ id: 'ch05-sf4-interpreter-formule-chimique', titre: 'Interpréter une formule chimique en nombre et nature d\'atomes', chapitre: 'ch05-atomes-molecules', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['formule-substance-ou-entite', 'coefficient-et-indice-confondus'] }),
  sf({ id: 'ch05-sf5-nommer-une-molecule-courante', titre: 'Nommer une molécule courante à partir de sa formule (O₂, N₂, H₂O, CO₂, CH₄)', chapitre: 'ch05-atomes-molecules', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['formule-substance-ou-entite'] }),
  sf({
    id: 'ch05-sf6-associer-formule-et-modele-moleculaire',
    titre: 'Associer une formule chimique au modèle moléculaire correspondant, et réciproquement',
    reformule: 'Représenter une molécule avec un modèle moléculaire',
    chapitre: 'ch05-atomes-molecules', cercle: 0, attendu: 't1-constitution-et-etats',
  }),
  sf({ id: 'ch05-sf7-changement-d-etat-microscopique', titre: "Interpréter un changement d'état au niveau microscopique", chapitre: 'ch05-atomes-molecules', cercle: 0, attendu: 't1-constitution-et-etats', pieges: ['particules-heritent-du-macroscopique', 'vide-entre-les-particules-rempli'] }),

  // ── Ch. 6 — Transformations chimiques et combustions ──────────────────────
  sf({
    id: 'ch06-sf1-identifier-une-transformation-chimique',
    titre: "Identifier une transformation chimique à partir des observations d'une expérience décrite",
    reformule: 'Identifier expérimentalement une transformation chimique',
    chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't1-transformations',
    pieges: ['frontiere-physique-chimique', 'serie-etiquetee-par-le-chapitre'],
  }),
  sf({ id: 'ch06-sf2-distinguer-transformation-chimique-physique-et-melange', titre: "Distinguer une transformation chimique d'une transformation physique et d'un simple mélange", chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't1-transformations', pieges: ['frontiere-physique-chimique', 'serie-etiquetee-par-le-chapitre', 'reponse-conforme-sans-adhesion', 'matiere-disparait-quand-on-ne-la-voit-plus'] }),
  sf({ id: 'ch06-sf3-identifier-reactifs-et-produits', titre: "Identifier les réactifs et les produits d'une transformation", chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't1-transformations', pieges: ['fleche-lue-comme-egal'] }),
  sf({ id: 'ch06-sf4-redistribution-des-atomes', titre: 'Interpréter une transformation chimique comme une redistribution des atomes', chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't1-transformations', pieges: ['coefficient-et-indice-confondus'] }),
  sf({ id: 'ch06-sf5-lire-une-equation-de-reaction-fournie', titre: 'Lire une équation de réaction fournie pour décrire une transformation', chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't1-transformations', pieges: ['plus-lu-comme-addition', 'fleche-lue-comme-egal', 'coefficient-et-indice-confondus'] }),
  sf({ id: 'ch06-sf6-conservation-de-la-masse', titre: 'Vérifier la conservation de la masse lors d\'une transformation chimique', chapitre: 'ch06-transformations-chimiques', cercle: 1, attendu: 't1-transformations', pieges: ['conservation-de-la-masse', 'gaz-n-est-pas-de-la-matiere', 'matiere-disparait-quand-on-ne-la-voit-plus', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch06-sf7-decrire-une-combustion', titre: 'Décrire une combustion en identifiant combustible, comburant et produits', chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't1-transformations', pieges: ['conservation-de-la-masse', 'gaz-n-est-pas-de-la-matiere', 'serie-etiquetee-par-le-chapitre'] }),
  sf({ id: 'ch06-sf8-distinguer-combustion-complete-et-incomplete', titre: "Distinguer une combustion complète d'une combustion incomplète", chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't1-transformations', pieges: ['conservation-de-la-masse', 'serie-etiquetee-par-le-chapitre'] }),
  // Les deux premières sections greffées du fil « énergie ». Elles se greffent
  // après les combustions, comme le font toutes les progressions dépouillées :
  // l'énergie n'est jamais un onglet.
  sf({ id: 'ch06-sf9-identifier-les-formes-d-energie', titre: "Identifier les formes d'énergie mises en jeu dans une situation", chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't3-energie', filTransversal: 'energie' }),
  sf({ id: 'ch06-sf10-distinguer-source-transfert-et-conversion', titre: 'Distinguer une source, un transfert et une conversion', chapitre: 'ch06-transformations-chimiques', cercle: 0, attendu: 't3-energie', filTransversal: 'energie' }),

  // ── Ch. 7 — L'intensité du courant ────────────────────────────────────────
  sf({
    id: 'ch07-sf1-placer-un-amperemetre-et-prevoir-sa-lecture',
    titre: "Indiquer où placer un ampèremètre sur un schéma, et prévoir ce qu'il lira",
    reformule: 'Brancher un ampèremètre en série',
    chapitre: 'ch07-intensite-du-courant', cercle: 3, attendu: 't3-circuits',
    // Deux pièges pour un savoir-faire, et c'est le « et » de la reformulation
    // qui l'exige. « Où le placer » est un geste de topologie, et c'est là que
    // `mesurer-en-coupant-le-circuit` mord ; « ce qu'il lira » est une
    // prédiction, et c'est là que `courant-qui-s-use` mord. Sans la seconde
    // moitié, le savoir-faire n'aurait que des items de cercle 3 — donc serait
    // inacquérable, ce que le contrôle refuse.
    pieges: ['mesurer-en-coupant-le-circuit', 'courant-qui-s-use'],
  }),
  sf({
    id: 'ch07-sf2-lire-une-intensite-avec-son-calibre',
    titre: "Lire une intensité avec son calibre et l'exprimer avec son unité",
    reformule: 'Mesurer une intensité et l\'exprimer avec son unité',
    chapitre: 'ch07-intensite-du-courant', cercle: 3, attendu: 't3-circuits',
    pieges: ['unite-absente-ou-fausse'],
  }),
  sf({ id: 'ch07-sf3-choisir-le-calibre-d-un-appareil', titre: "Choisir le calibre d'un appareil de mesure", chapitre: 'ch07-intensite-du-courant', cercle: 3, attendu: 't3-circuits' }),
  sf({ id: 'ch07-sf4-loi-d-unicite-de-l-intensite', titre: "Utiliser la loi d'unicité de l'intensité (circuit en série)", chapitre: 'ch07-intensite-du-courant', cercle: 1, attendu: 't3-circuits', pieges: ['courant-qui-s-use', 'pile-fabrique-le-courant-ampoule-le-consomme', 'raisonnement-sequentiel', 'pile-generateur-de-courant-constant'] }),
  sf({ id: 'ch07-sf5-loi-d-additivite-des-intensites', titre: "Utiliser la loi d'additivité des intensités (circuit à deux mailles)", chapitre: 'ch07-intensite-du-courant', cercle: 1, attendu: 't3-circuits', pieges: ['courant-qui-s-use', 'pile-fabrique-le-courant-ampoule-le-consomme', 'raisonnement-sequentiel', 'pile-generateur-de-courant-constant', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch07-sf6-expliquer-un-court-circuit', titre: 'Expliquer un court-circuit et une surintensité', chapitre: 'ch07-intensite-du-courant', cercle: 0, attendu: 't3-circuits', pieges: ['courant-qui-s-use'] }),
  sf({ id: 'ch07-sf7-relier-une-loi-a-une-regle-de-securite', titre: "Relier une loi de l'électricité à une règle de sécurité", chapitre: 'ch07-intensite-du-courant', cercle: 0, attendu: 't3-circuits' }),
  sf({
    id: 'ch07-sf8-entrees-et-sorties-d-energie',
    titre: "Identifier les entrées et les sorties d'énergie d'un système, et nommer la conversion",
    reformule: 'Établir un bilan énergétique pour un système simple',
    chapitre: 'ch07-intensite-du-courant', cercle: 0, attendu: 't3-energie', filTransversal: 'energie',
    // Contrainte de contenu opposable, charte.md § « L'énergie est sous-dotée » :
    // le système est TOUJOURS fourni et délimité par l'énoncé, jamais à découper
    // par l'élève — délimiter est précisément le geste que le diagnostic fondateur
    // désigne comme le lieu de l'erreur. Le contrôle refuse un item d'énergie dont
    // la `situation` ne déclare pas sa frontière de système.
    frontiereDeSystemeObligatoire: true,
  }),
  sf({
    id: 'ch07-sf9-convertir-les-unites-d-energie',
    titre: "Utiliser et convertir les unités d'énergie (J, kWh)",
    chapitre: 'ch07-intensite-du-courant', cercle: 1, attendu: 't3-energie', filTransversal: 'energie',
    unite: 'imposee',
    motifUniteImposee: "la conversion J ↔ kWh EST le savoir-faire — troisième et dernier cas du plan.",
    prerequisMaths: MATHS_PUISSANCES,
  }),

  // ── Ch. 8 — Mouvement et vitesse ──────────────────────────────────────────
  sf({ id: 'ch08-sf1-decrire-une-trajectoire', titre: 'Décrire une trajectoire (rectiligne, circulaire)', chapitre: 'ch08-mouvement-et-vitesse', cercle: 0, attendu: 't2-mouvement', reactivation: true, pieges: ['mouvement-absolu'] }),
  sf({ id: 'ch08-sf2-qualifier-un-mouvement', titre: 'Qualifier un mouvement (uniforme, accéléré, ralenti)', chapitre: 'ch08-mouvement-et-vitesse', cercle: 1, attendu: 't2-mouvement', reactivation: true, pieges: ['adherence-force-vitesse'] }),
  sf({ id: 'ch08-sf3-exploiter-une-chronophotographie', titre: 'Exploiter une chronophotographie pour décrire un mouvement', chapitre: 'ch08-mouvement-et-vitesse', cercle: 1, attendu: 't2-mouvement', reactivation: true, pieges: ['valeur-aberrante-d-une-serie-non-reperee'] }),
  sf({ id: 'ch08-sf4-calculer-une-vitesse', titre: "Calculer une vitesse à partir d'une distance et d'une durée", chapitre: 'ch08-mouvement-et-vitesse', cercle: 1, attendu: 't2-mouvement', prerequisMaths: MATHS_QUOTIENT, pieges: ['unite-absente-ou-fausse', 'valeur-invraisemblable-non-critiquee', 'donnees-superflues-et-questions-sans-reponse'] }),
  sf({ id: 'ch08-sf5-calculer-une-distance', titre: "Calculer une distance à partir d'une vitesse et d'une durée", chapitre: 'ch08-mouvement-et-vitesse', cercle: 1, attendu: 't2-mouvement', prerequisMaths: MATHS_QUOTIENT, pieges: ['unite-absente-ou-fausse', 'donnees-superflues-et-questions-sans-reponse'] }),
  sf({ id: 'ch08-sf6-calculer-une-duree', titre: "Calculer une durée à partir d'une vitesse et d'une distance", chapitre: 'ch08-mouvement-et-vitesse', cercle: 1, attendu: 't2-mouvement', prerequisMaths: MATHS_QUOTIENT, pieges: ['unite-absente-ou-fausse', 'donnees-superflues-et-questions-sans-reponse'] }),
  sf({
    id: 'ch08-sf7-convertir-une-vitesse-m-par-s-et-km-par-h',
    titre: 'Convertir une vitesse entre m/s et km/h',
    chapitre: 'ch08-mouvement-et-vitesse', cercle: 1, attendu: 't2-mouvement',
    prerequisMaths: MATHS_QUOTIENT,
    unite: 'imposee',
    motifUniteImposee: "la conversion m/s ↔ km/h EST le savoir-faire — deuxième des trois cas du plan.",
    pieges: ['unite-absente-ou-fausse'],
  }),
  sf({ id: 'ch08-sf8-identifier-le-referentiel', titre: 'Identifier le référentiel et décrire la relativité du mouvement dans un cas simple', chapitre: 'ch08-mouvement-et-vitesse', cercle: 0, attendu: 't2-mouvement', pieges: ['mouvement-absolu'] }),

  // ── Ch. 9 — Vitesse de propagation de la lumière et du son ────────────────
  sf({ id: 'ch09-sf1-distinguer-source-primaire-et-objet-diffusant', titre: "Distinguer une source primaire d'un objet diffusant", chapitre: 'ch09-lumiere-son', cercle: 0, attendu: 't4-types-de-signaux', pieges: ['extramission', 'objets-ordinaires-ne-diffusent-pas', 'reponse-conforme-sans-adhesion'] }),
  sf({ id: 'ch09-sf2-enoncer-les-conditions-de-visibilite', titre: "Énoncer les conditions de visibilité d'un objet", chapitre: 'ch09-lumiere-son', cercle: 0, attendu: 't4-proprietes-des-signaux', pieges: ['extramission', 'objets-ordinaires-ne-diffusent-pas', 'reponse-conforme-sans-adhesion'] }),
  sf({ id: 'ch09-sf3-tracer-un-rayon-et-exploiter-la-propagation-rectiligne', titre: 'Tracer un rayon lumineux et exploiter la propagation rectiligne', chapitre: 'ch09-lumiere-son', cercle: 3, attendu: 't4-proprietes-des-signaux', pieges: ['extramission'] }),
  sf({ id: 'ch09-sf4-decrire-les-conditions-de-propagation-d-un-son', titre: "Décrire les conditions de propagation d'un son", chapitre: 'ch09-lumiere-son', cercle: 0, attendu: 't4-types-de-signaux', pieges: ['son-matiere-transportee'] }),
  sf({ id: 'ch09-sf5-comparer-les-vitesses-du-son-et-de-la-lumiere', titre: 'Comparer les vitesses de propagation du son et de la lumière', chapitre: 'ch09-lumiere-son', cercle: 1, attendu: 't4-proprietes-des-signaux', pieges: ['son-matiere-transportee', 'valeur-invraisemblable-non-critiquee', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch09-sf6-calculer-une-distance-par-une-duree-de-propagation', titre: "Calculer une distance à partir d'une durée de propagation (orage, sonar, télémètre)", chapitre: 'ch09-lumiere-son', cercle: 1, attendu: 't4-proprietes-des-signaux', prerequisMaths: MATHS_QUOTIENT, pieges: ['unite-absente-ou-fausse', 'donnees-superflues-et-questions-sans-reponse'] }),
  // Le seul savoir-faire du chapitre que le catalogue ne diagnostique pas, et la
  // charte le nomme : « Signal et information » n'est pas « pas de difficulté »,
  // c'est NON DOCUMENTÉ. Aucun piège, et la rubrique le dit.
  sf({ id: 'ch09-sf7-reconnaitre-qu-un-signal-transporte-une-information', titre: "Reconnaître qu'un signal transporte une information", chapitre: 'ch09-lumiere-son', cercle: 0, attendu: 't4-types-de-signaux' }),

  // ── Ch. 10 — Interactions et forces ───────────────────────────────────────
  sf({ id: 'ch10-sf1-distinguer-action-de-contact-et-a-distance', titre: "Distinguer une action de contact d'une action à distance", chapitre: 'ch10-interactions-et-forces', cercle: 0, attendu: 't2-interaction-force', pieges: ['action-reservee-au-vivant', 'serie-etiquetee-par-le-chapitre'] }),
  sf({ id: 'ch10-sf2-recenser-les-interactions', titre: "Recenser les interactions d'un objet avec un diagramme objet-interactions", chapitre: 'ch10-interactions-et-forces', cercle: 0, attendu: 't2-interaction-force', pieges: ['action-reservee-au-vivant', 'troisieme-loi-effets-visibles'] }),
  sf({ id: 'ch10-sf3-modeliser-une-action-par-une-force', titre: 'Modéliser une action par une force (point d\'application, direction, sens, valeur)', chapitre: 'ch10-interactions-et-forces', cercle: 0, attendu: 't2-interaction-force', pieges: ['adherence-force-vitesse', 'force-propriete-de-l-objet'] }),
  sf({ id: 'ch10-sf4-representer-une-force-par-un-segment-fleche', titre: 'Représenter une force par un segment fléché à l\'échelle', chapitre: 'ch10-interactions-et-forces', cercle: 3, attendu: 't2-interaction-force', pieges: ['adherence-force-vitesse'] }),
  sf({
    id: 'ch10-sf5-lire-la-valeur-d-un-dynamometre',
    titre: "Lire la valeur indiquée par un dynamomètre et l'exprimer avec son unité",
    reformule: "Mesurer la valeur d'une force avec un dynamomètre",
    chapitre: 'ch10-interactions-et-forces', cercle: 3, attendu: 't2-interaction-force',
    pieges: ['unite-absente-ou-fausse'],
  }),
  // Ce savoir-faire n'est pas cosmétique : c'est le vérificateur de forme du
  // chapitre (`forceNaming`), et sa réponse est un TRIPLET saisi — donc classe B,
  // pas de la rédaction libre. C'est l'exemple que la charte donne du « plafond
  // qui se respecte en découpant, pas en supprimant des formats ».
  sf({ id: 'ch10-sf6-ecrire-force-exercee-par-x-sur-y', titre: 'Écrire une force sous la forme « force exercée par X sur Y »', chapitre: 'ch10-interactions-et-forces', cercle: 0, attendu: 't2-interaction-force', pieges: ['force-propriete-de-l-objet', 'troisieme-loi-effets-visibles', 'reponse-conforme-sans-adhesion'] }),

  // ── Ch. 11 — L'Univers et le système solaire ──────────────────────────────
  sf({ id: 'ch11-sf1-decrire-la-structure-du-systeme-solaire', titre: 'Décrire la structure du système solaire', chapitre: 'ch11-univers-systeme-solaire', cercle: 0, attendu: 't1-organisation-univers' }),
  sf({ id: 'ch11-sf2-situer-la-terre-dans-la-galaxie', titre: "Situer la Terre dans la Galaxie et dans l'Univers", chapitre: 'ch11-univers-systeme-solaire', cercle: 0, attendu: 't1-organisation-univers' }),
  sf({ id: 'ch11-sf3-comparer-des-ordres-de-grandeur-astronomiques', titre: 'Comparer des ordres de grandeur de distances astronomiques', chapitre: 'ch11-univers-systeme-solaire', cercle: 1, attendu: 't1-organisation-univers', prerequisMaths: MATHS_PUISSANCES, pieges: ['valeur-invraisemblable-non-critiquee', 'unite-absente-ou-fausse'] }),
  sf({ id: 'ch11-sf4-exprimer-une-distance-en-notation-scientifique', titre: 'Exprimer une distance en notation scientifique', chapitre: 'ch11-univers-systeme-solaire', cercle: 1, attendu: 't1-organisation-univers', prerequisMaths: MATHS_PUISSANCES, pieges: ['unite-absente-ou-fausse'] }),
  sf({ id: 'ch11-sf5-convertir-du-kilometre-a-l-annee-lumiere', titre: "Convertir du kilomètre à l'année-lumière", chapitre: 'ch11-univers-systeme-solaire', cercle: 1, attendu: 't1-organisation-univers', prerequisMaths: MATHS_PUISSANCES, pieges: ['unite-absente-ou-fausse'] }),
  sf({ id: 'ch11-sf6-expliquer-que-voir-loin-c-est-voir-dans-le-passe', titre: "Expliquer que voir loin, c'est voir dans le passé", chapitre: 'ch11-univers-systeme-solaire', cercle: 0, attendu: 't1-organisation-univers', pieges: ['reponse-conforme-sans-adhesion'] }),

  // ── Bloc optionnel A — Loi d'Ohm ──────────────────────────────────────────
  sf({ id: 'opta-sf1-reconnaitre-une-resistance-et-lire-sa-valeur', titre: 'Reconnaître une résistance et lire sa valeur', chapitre: 'opt-a-loi-d-ohm', cercle: 3, attendu: 't3-circuits', pieges: ['unite-absente-ou-fausse'] }),
  sf({ id: 'opta-sf2-utiliser-la-relation-u-egale-r-i', titre: 'Utiliser la relation U = R·I', chapitre: 'opt-a-loi-d-ohm', cercle: 1, attendu: 't3-circuits', prerequisMaths: MATHS_QUOTIENT, pieges: ['unite-absente-ou-fausse', 'raisonnement-sequentiel'] }),
  sf({ id: 'opta-sf3-exploiter-un-graphique-u-en-fonction-de-i', titre: 'Exploiter un graphique de U en fonction de I', chapitre: 'opt-a-loi-d-ohm', cercle: 1, attendu: 't3-circuits', pieges: ['unite-absente-ou-fausse', 'valeur-aberrante-d-une-serie-non-reperee'] }),

  // ── Bloc optionnel B — Poids et pesanteur ─────────────────────────────────
  sf({ id: 'optb-sf1-distinguer-le-poids-de-la-masse', titre: 'Distinguer le poids de la masse, avec leurs unités', chapitre: 'opt-b-poids-et-pesanteur', cercle: 0, attendu: 't2-interaction-force', pieges: ['confusion-masse-et-masse-volumique', 'unite-absente-ou-fausse'] }),
  sf({ id: 'optb-sf2-utiliser-la-relation-p-egale-m-g', titre: 'Utiliser la relation P = m·g', chapitre: 'opt-b-poids-et-pesanteur', cercle: 1, attendu: 't2-interaction-force', prerequisMaths: MATHS_QUOTIENT, pieges: ['unite-absente-ou-fausse', 'valeur-invraisemblable-non-critiquee'] }),
]);

export const SAVOIR_FAIRE_PAR_ID = Object.freeze(
  Object.fromEntries(SAVOIR_FAIRE.map((s) => [s.id, s])),
);

/** Les savoir-faire d'un chapitre, dans l'ordre du programme. */
export const savoirFaireDuChapitre = (idChapitre) =>
  SAVOIR_FAIRE.filter((s) => s.chapitre === idChapitre);

/** Les savoir-faire que ce piège vise — l'inverse de `sf.pieges`, calculé une fois. */
const PAR_PIEGE = (() => {
  const table = {};
  for (const s of SAVOIR_FAIRE) for (const p of s.pieges) (table[p] ??= []).push(s.id);
  return Object.freeze(table);
})();

export const savoirFairePourPiege = (idPiege) => PAR_PIEGE[idPiege] ?? [];

/**
 * Les pièges du catalogue qu'AUCUN savoir-faire ne porte.
 *
 * Un piège qu'aucun savoir-faire ne vise n'est jamais servi : il a un rythme,
 * une échéance, des constats, et il n'apparaît nulle part. C'est le mode de
 * panne le plus discret du corpus — rien n'échoue, un piège disparaît. Le
 * contrôle en fait un refus.
 */
export const piegesOrphelins = () =>
  Object.keys(PIEGES).filter((id) => !PAR_PIEGE[id]);

/**
 * Le trimestre où un savoir-faire est programmé — c'est lui, et non le numéro de
 * chapitre, qui décide de la contrainte « avant maths Ch. 11 ».
 */
export const trimestreDe = (savoirFaire) => CHAPITRE_PAR_ID[savoirFaire?.chapitre]?.trimestre ?? null;

/**
 * L'isolement d'une inconnue est-il disponible pour ce savoir-faire ?
 *
 * Les équations sont au chapitre 11 de `maths-4e`, en trimestre 3 — et NON au
 * chapitre 7, qui est le calcul littéral. La v1 de la charte et `programme.md`
 * écrivaient tous deux « maths Ch. 7 », ce qui rendait fausse la garantie « le
 * prérequis mathématique est déjà installé » sur le chapitre 8, placé en
 * trimestre 2. L'arbitrage retenu : le chapitre 8 reste en trimestre 2 et
 * *v = d/t* y est traité par la voie de la grandeur quotient, jamais par
 * transposition de terme.
 */
export const transpositionDisponible = (savoirFaire) => trimestreDe(savoirFaire) >= 3;

/** Le compte que `programme.md` annonce, vérifiable d'un coup d'œil. */
export const EFFECTIFS = Object.freeze({
  chapitres: CHAPITRES.length,
  savoirFaire: SAVOIR_FAIRE.length,
  noyau: SAVOIR_FAIRE.filter((s) => CHAPITRE_PAR_ID[s.chapitre].statut === 'noyau').length,
  frontiere: SAVOIR_FAIRE.filter((s) => CHAPITRE_PAR_ID[s.chapitre].statut === 'frontiere').length,
  diagnostiques: SAVOIR_FAIRE.filter((s) => s.diagnostic === 'type').length,
  couvertsNonDiagnostiques: SAVOIR_FAIRE.filter((s) => s.diagnostic === 'absent').length,
});
