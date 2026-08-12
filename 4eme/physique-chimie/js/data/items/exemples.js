// Une poignée d'items JUSTES — la preuve que le schéma est écrivable.
//
// ── Ce que ce fichier n'est pas ────────────────────────────────────────────
//
// Ce n'est PAS le corpus. Le corpus demande 1 000 à 1 300 items (9 au minimum
// par savoir-faire, 12 à 13 en pratique), et il n'est pas écrit. Ces huit-là
// existent pour une seule raison : un schéma qu'on n'a jamais rempli est un
// schéma dont on ne sait pas s'il se remplit. Chacun exerce une clause que le
// contrôleur applique, et le pendant fautif est dans `fautifs.js`.
//
// `CORPUS_PARTIEL` le déclare, et le contrôleur s'en sert pour distinguer ce
// qu'il REFUSE (une faute de conformité, qui ne dépend pas du volume) de ce
// qu'il met en réserve (un plancher de volume, une couverture, un plafond
// global — trois mesures qu'un échantillon ne peut pas rendre). Sans ce
// drapeau, le contrôleur refuserait les 86 savoir-faire pour cause d'items
// manquants et le refus utile serait noyé.

import { SANS_UNITE } from '../../unites.js';

/** Le corpus est un échantillon : les invariants de VOLUME sont en réserve, les
 *  invariants de CONFORMITÉ mordent. */
export const CORPUS_PARTIEL = true;

// ── Les objets formels, écrits UNE fois et cités deux ──────────────────────
//
// L'invariant 6 exige que la figure soit engendrée par le même objet formel que
// la correction, et `item.js` le contrôle par IDENTITÉ DE RÉFÉRENCE. C'est donc
// ici que se joue la garantie : ces constantes sont l'unique exemplaire, la
// figure les montre et la correction les attend.

/** Le circuit DONNÉ par l'énoncé : pile, deux lampes, interrupteur fermé, et
 *  aucun appareil de mesure. C'est lui qui porte la `situation` — la condition
 *  de validité du piège « mesurer en coupant le circuit » exige que l'appareil à
 *  placer ne soit PAS déjà là et qu'il reste au moins deux récepteurs, sans quoi
 *  « en série avec la lampe » et « en série avec tout » se confondent. */
const CIRCUIT_DONNE_DEUX_LAMPES = Object.freeze({
  dipoles: Object.freeze([
    { id: 'P', type: 'pile', bornes: ['a', 'b'] },
    { id: 'L1', type: 'lampe', bornes: ['b', 'c'] },
    { id: 'L2', type: 'lampe', bornes: ['c', 'd'] },
    { id: 'K', type: 'interrupteur', bornes: ['d', 'a'], etat: 'ferme' },
  ].map(Object.freeze)),
});

/** Le circuit ATTENDU : le même, ampèremètre inséré en série et bien orienté —
 *  le courant entre par sa borne « + ». C'est la correction, et la figure en
 *  dérive. */
const CIRCUIT_AMPEREMETRE_EN_SERIE = Object.freeze({
  dipoles: Object.freeze([
    { id: 'P', type: 'pile', bornes: ['a', 'b'] },
    { id: 'A', type: 'amperemetre', bornes: ['c', 'b'] },
    { id: 'L1', type: 'lampe', bornes: ['c', 'd'] },
    { id: 'L2', type: 'lampe', bornes: ['d', 'e'] },
    { id: 'K', type: 'interrupteur', bornes: ['e', 'a'], etat: 'ferme' },
  ].map(Object.freeze)),
});

/** La boucle à deux ampèremètres, de part et d'autre de la première lampe.
 *  C'est le dispositif que le piège « le courant s'use » nomme, et la condition
 *  de validité le vérifie SUR LE GRAPHE : deux ampèremètres, un récepteur entre
 *  eux, et la pile hors du segment. Un booléen ne dirait pas ça. */
const BOUCLE_DEUX_AMPEREMETRES = Object.freeze({
  dipoles: Object.freeze([
    { id: 'P', type: 'pile', bornes: ['a', 'b'] },
    { id: 'A1', type: 'amperemetre', bornes: ['c', 'b'] },
    { id: 'L1', type: 'lampe', bornes: ['c', 'd'] },
    { id: 'A2', type: 'amperemetre', bornes: ['e', 'd'] },
    { id: 'K', type: 'interrupteur', bornes: ['e', 'a'], etat: 'ferme' },
  ].map(Object.freeze)),
});

/** Six molécules d'eau à l'état solide. Le rayon d'une même espèce ne varie pas
 *  d'un état à l'autre — c'est ce que l'invariant 20 refuse mécaniquement, et
 *  `schema.js` l'assure en dérivant le rayon de la seule composition. */
const EAU_SOLIDE = Object.freeze({
  etat: 'solide',
  graine: 7,
  contenu: Object.freeze([
    Object.freeze({
      nom: 'eau',
      formule: 'H₂O',
      nombre: 9,
      atomes: Object.freeze([{ element: 'O' }, { element: 'H', nombre: 2 }]),
    }),
  ]),
});

/** La série de six essais de solubilité, dont un aberrant. Elle est le stimulus
 *  ET la donnée du calcul : le tableau montre ce que la chaîne exploite. */
const SERIE_SOLUBILITE = Object.freeze({
  titre: 'Six essais de dissolution du sel dans un litre d\'eau, à 20 °C',
  x: Object.freeze({ titre: 'Essai n°', min: 1, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Masse dissoute (g/L)', min: 150, max: 400, pas: 25 }),
  points: Object.freeze([[1, 358], [2, 360], [3, 357], [4, 361], [5, 359], [6, 180]].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════

export const ITEMS = Object.freeze([

  // ── 1. Classe A — le recalcul intégral, et le geste isolé ────────────────
  //
  // L'item de discrimination « le geste mathématique reste » : la relation est
  // donnée dans l'énoncé, seule la division est à faire. Son jumeau est l'item 2.
  {
    id: 'ch04-sf2-i01-cube-d-aluminium',
    sfPrincipal: 'ch04-sf2-calculer-une-masse-volumique',
    sfSollicites: [],
    chapitre: 'ch04-masse-volumique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'bloc-metallique-sur-une-balance',
    enonce: 'On pose un bloc de métal sur une balance : elle affiche {{donnee:masse}}. '
      + "Plongé dans une éprouvette, le bloc fait monter l'eau de {{donnee:volume}}. "
      + 'La masse volumique est le quotient de la masse par le volume. Calcule-la, avec son unité.',
    donnees: {
      masse: { valeur: [540, 1], unite: 'g' },
      volume: { valeur: [200, 1], unite: 'cm³' },
    },
    calcul: {
      etapes: [{ id: 'rho', expr: '@masse ÷ @volume', unite: 'g/cm³' }],
      reponse: 'rho',
    },
    reponse: { valeur: [27, 10], unite: 'g/cm³', semantique: 'exacte' },
    piege: 'confusion-masse-et-masse-volumique',
    // La condition de validité est DÉRIVÉE de cet objet, jamais d'un drapeau :
    // l'énoncé fournit une masse alors qu'il demande une masse volumique, et
    // c'est elle que l'élève rendra telle quelle s'il ne les distingue pas.
    situation: {
      modeDeReponse: 'valeur-et-unite',
      grandeurDemandee: 'masse-volumique',
      grandeursFournies: ['masse', 'volume'],
    },
    discriminationMaths: 'geste-isole',
    rituelDeControle: false,
  },

  // ── 2. Classe A — le choix de relation, et sa trivialité DÉRIVÉE ─────────
  //
  // Une seule opération, littéraux entiers de valeur absolue < 100 : la
  // trivialité n'est pas un adjectif d'auteur, elle se lit sur la chaîne. Si cet
  // item échoue et que le premier réussit, c'est la relation qui manque, pas le
  // calcul — et l'application sait le dire.
  {
    id: 'ch04-sf2-i02-quelle-relation',
    sfPrincipal: 'ch04-sf2-calculer-une-masse-volumique',
    chapitre: 'ch04-masse-volumique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'petit-galet-pese',
    enonce: 'Un galet a une masse de {{donnee:masse}} et un volume de {{donnee:volume}}. '
      + 'Quelle est sa masse volumique ?',
    donnees: {
      masse: { valeur: [12, 1], unite: 'g' },
      volume: { valeur: [4, 1], unite: 'cm³' },
    },
    calcul: {
      etapes: [{ id: 'rho', expr: '@masse ÷ @volume', unite: 'g/cm³' }],
      reponse: 'rho',
    },
    reponse: { valeur: [3, 1], unite: 'g/cm³', semantique: 'exacte' },
    discriminationMaths: 'choix-de-relation',
  },

  // ── 3. Classe A′ — la requête tabulée, rejouée ───────────────────────────
  //
  // Un fait n'est pas un théorème : cette réponse ne se démontre pas, elle se
  // LIT dans la table centrale sourcée, et le contrôle rejoue la lecture. Sans
  // cette classe, l'item tombait en C et consommait du budget de relecture
  // humaine alors qu'il est mécaniquement vérifiable à l'identique de A.
  {
    id: 'ch04-sf6-i01-quel-metal',
    sfPrincipal: 'ch04-sf6-identifier-un-materiau-par-sa-masse-volumique',
    chapitre: 'ch04-masse-volumique',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'table-de-masses-volumiques',
    enonce: "Un atelier mesure la masse volumique d'un métal inconnu et lit une valeur "
      + "égale à celle de l'aluminium dans la table. Quelle est cette valeur, avec son unité ?",
    requete: { table: 'masses-volumiques', cle: 'aluminium', colonne: 'masseVolumique' },
    reponse: { valeur: [27, 10], unite: 'g/cm³', semantique: 'exacte' },
  },

  // ── 4. Classe B — la figure EST la correction ────────────────────────────
  //
  // `reponse.objetFormel` et `figure.circuit` sont le MÊME objet, pas deux
  // copies : c'est ce qui rend impossible le désaccord entre le schéma montré et
  // la réponse attendue. Aucun schéma n'est dessiné à la main, nulle part.
  {
    id: 'ch07-sf1-i01-ou-placer-l-amperemetre',
    sfPrincipal: 'ch07-sf1-placer-un-amperemetre-et-prevoir-sa-lecture',
    chapitre: 'ch07-intensite-du-courant',
    programme: '2020',
    classe: 'B',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'pile-lampe-interrupteur',
    enonce: "Le circuit comporte une pile, deux lampes en série et un interrupteur. "
      + "Complète-le pour mesurer l'intensité qui traverse la première lampe : place "
      + "l'ampèremètre et oriente-le, le courant doit entrer par sa borne « + ».",
    figure: { sorte: 'circuit', circuit: CIRCUIT_AMPEREMETRE_EN_SERIE, titre: 'Montage attendu' },
    reponse: { objetFormel: CIRCUIT_AMPEREMETRE_EN_SERIE },
    piege: 'mesurer-en-coupant-le-circuit',
    // La condition de validité de ce piège se lit SUR LE GRAPHE, pas sur un
    // drapeau : l'appareil demandé ne doit pas déjà figurer au circuit, sa cible
    // doit y être, et il faut au moins deux récepteurs — sinon « en série avec la
    // lampe » et « en série avec le circuit » sont la même chose et l'item ne
    // teste rien.
    situation: {
      demande: 'schema',
      mesure: { appareil: 'A', cible: 'L1' },
      circuit: CIRCUIT_DONNE_DEUX_LAMPES,
    },
    dispositifServi: 'amperemetre-pose-aux-bornes-du-moteur',
  },

  // ── 5. Classe B — le schéma particulaire ─────────────────────────────────
  //
  // Palier 2 : même piège, autre registre. La `dimensionVariee` est déclarée et
  // son énuméré est PLUS FIN que le palier — sans quoi le refus « deux paliers
  // d'un même piège déclarant la même dimension » ne pourrait jamais mordre.
  {
    id: 'ch05-sf7-i01-glace-au-niveau-des-molecules',
    sfPrincipal: 'ch05-sf7-changement-d-etat-microscopique',
    chapitre: 'ch05-atomes-molecules',
    programme: '2020',
    classe: 'B',
    cercle: 0,
    palier: 2,
    registre: 'submicro',
    type: 'schema-particulaire',
    dimensionVariee: 'registre',
    contexteDeSurface: 'eau-qui-gele',
    enonce: "Compose la grille qui représente l'eau à l'état solide : neuf molécules d'eau, "
      + 'chacune faite d\'un atome d\'oxygène et de deux atomes d\'hydrogène.',
    figure: { sorte: 'particulaire', description: EAU_SOLIDE },
    reponse: { objetFormel: EAU_SOLIDE },
  },

  // ── 6. La prédiction engagée, et le format diagnostique ──────────────────
  //
  // Le format dans lequel la conception se VOIT : pesée avant/après, valeur
  // prédite saisie et verrouillée avant l'affichage. Sans engagement préalable,
  // il n'y a pas de conflit — juste une information de plus. Le drapeau porte
  // son motif écrit, parce qu'aucun programme ne sait comparer un item à la
  // prose d'un `formatDiagnostique`.
  {
    id: 'ch06-sf6-i01-sucre-en-flacon-bouche',
    sfPrincipal: 'ch06-sf6-conservation-de-la-masse',
    chapitre: 'ch06-transformations-chimiques',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'flacon-bouche-sur-une-balance',
    enonce: "Sur la balance : un flacon d'eau bouché, {{donnee:masseFlacon}}, et à côté un sachet "
      + 'de sucre, {{donnee:masseSucre}}. On verse le sucre dans le flacon, on revisse, on agite '
      + "jusqu'à ce qu'il ne reste rien à voir. Écris ce que la balance affichera, avec son unité. "
      + 'Ta prédiction sera verrouillée avant le résultat.',
    donnees: {
      masseFlacon: { valeur: [250, 1], unite: 'g' },
      masseSucre: { valeur: [4, 1], unite: 'g' },
    },
    calcul: {
      etapes: [{ id: 'total', expr: '@masseFlacon + @masseSucre', unite: 'g' }],
      reponse: 'total',
    },
    reponse: { valeur: [254, 1], unite: 'g', semantique: 'exacte' },
    piege: 'conservation-de-la-masse',
    situation: {
      systeme: 'ferme',
      matiereQuiChangeDeVisibilite: true,
      grandeurInterrogee: 'masse',
    },
    dispositifServi: 'sucre-dissous-en-flacon-bouche',
    estFormatDiagnostique: true,
    motifFormatDiagnostique: "Pesée avant/après en système fermé, avec la VALEUR prédite et son "
      + "unité saisies puis verrouillées avant l'affichage du résultat — le mode de réponse que le "
      + 'piège déclare canonique. Le sens seul ne suffirait pas : « ça pèse pareil » ne distingue '
      + "pas celui qui a compté le sucre dissous de celui qui n'a rien compté du tout.",
  },

  // ── 7. Classe C — le double QCM, et sa relecture scellée ─────────────────
  //
  // Le format différenciant, et le seul de la charte qui n'a AUCUNE garantie
  // mécanique. Il est compté, plafonné, relu — et le scellé porte sur l'item
  // entier moins le bloc `relu`, parce que ce qui est risqué ici n'est pas
  // l'énoncé, ce sont les justifications.
  {
    id: 'ch06-sf6-i02-laine-de-fer-double-qcm',
    sfPrincipal: 'ch06-sf6-conservation-de-la-masse',
    chapitre: 'ch06-transformations-chimiques',
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'laine-de-fer-brulee-a-l-air-libre',
    enonce: "On pèse une pelote de laine de fer, on la fait brûler à l'air libre, on repèse ce "
      + 'qui reste dans la coupelle. Que lit-on à la seconde pesée ? Puis choisis la phrase qui '
      + 'dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'plus-lourd',
      choixPossibles: ['plus-leger', 'la-meme-masse', 'plus-lourd'],
    },
    justifications: [
      {
        id: 'oxygene-capte',
        texte: "Le fer s'est combiné à l'oxygène de l'air : quelque chose est entré dans la coupelle.",
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d\'accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'la-fumee-est-partie',
        texte: 'La fumée est partie, et ce qui est parti ne pèse plus.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: "Andersson, catégorie « disparition » — énoncé-élève rapporté dans didactique.md § 3.5",
        piege: 'conservation-de-la-masse',
      },
      {
        id: 'le-feu-ne-pese-rien',
        texte: 'Le feu a brûlé le fer, donc il en reste moins : ça ne peut pas peser plus.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: "Andersson, catégorie « transmutation » — énoncé-élève rapporté dans didactique.md § 3.5",
        piege: 'conservation-de-la-masse',
      },
      {
        id: 'rien-ne-se-perd',
        texte: 'Rien ne se perd, rien ne se crée : la masse ne change jamais, dans aucun récipient.',
        juste: false,
        // La justification conforme et sans adhésion : la phrase est celle du
        // cours, elle est récitée, et elle est FAUSSE ici — le récipient est
        // ouvert. C'est le cas que le double QCM existe pour attraper.
        provenance: 'locale',
        piege: 'reponse-conforme-sans-adhesion',
      },
    ],
    piege: 'conservation-de-la-masse',
    situation: {
      systeme: 'ouvert',
      matiereQuiChangeDeVisibilite: true,
      grandeurInterrogee: 'masse',
    },
    dispositifServi: 'laine-de-fer-brulee',
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      // FNV-1a 64 de l'item entier MOINS ce bloc, clés triées. Éditer une seule
      // justification le change : c'est tout l'objet du scellé.
      hash: '207fcf75aee2c5d7',
    },
  },

  // ── 8. Tolérance, modèle erroné exécutable, et la valeur aberrante ───────
  //
  // L'item où la v1 passait trivialement : saisie libre, tolérance, aucun
  // distracteur, donc aucun modèle erroné exigé — c'est-à-dire aucun contrôle
  // là où la tolérance est réellement à risque. Ici le modèle de l'élève qui ne
  // regarde pas sa série est EXÉCUTÉ, et le contrôle vérifie qu'il tombe hors
  // de la fenêtre.
  {
    id: 'ch01-sf5-i01-six-essais-de-solubilite',
    sfPrincipal: 'ch01-sf5-exploiter-une-serie-pour-estimer-une-solubilite',
    chapitre: 'ch01-melanges-et-solubilite',
    programme: '2020',
    classe: 'A',
    cercle: 2,
    palier: 1,
    registre: 'macro',
    type: 'lecture',
    contexteDeSurface: 'six-essais-de-dissolution-du-sel',
    enonce: "Voici les six essais d'une classe. Donne la solubilité du sel à 20 °C, avec son unité.",
    figure: { sorte: 'tableau', donnees: SERIE_SOLUBILITE },
    donnees: {
      m1: { valeur: [358, 1], unite: 'g/L' },
      m2: { valeur: [360, 1], unite: 'g/L' },
      m3: { valeur: [357, 1], unite: 'g/L' },
      m4: { valeur: [361, 1], unite: 'g/L' },
      m5: { valeur: [359, 1], unite: 'g/L' },
      m6: { valeur: [180, 1], unite: 'g/L' },
    },
    calcul: {
      etapes: [
        { id: 'somme', expr: '@m1 + @m2 + @m3 + @m4 + @m5', unite: 'g/L' },
        { id: 'moyenne', expr: '#somme ÷ 5', unite: 'g/L' },
      ],
      reponse: 'moyenne',
    },
    reponse: {
      valeur: [359, 1],
      unite: 'g/L',
      semantique: 'tolerante',
      tolerancePourcent: 2,
      decimalesIntermediaires: 1,
    },
    modelesErrones: [
      {
        id: 'moyenne-avec-l-aberrante',
        nom: "modèle « toutes les mesures se valent » : on moyenne les six sans regarder la série",
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
    // Rien dans l'énoncé n'annonce l'anomalie, la tâche demandée est une
    // EXPLOITATION, la série compte six mesures et l'écart est franc — la
    // sixième vaut la moitié des autres, ce que produit une balance restée tarée
    // sur son support. Les quatre exigences du prédicat, portées par des données
    // et non par une case cochée.
    situation: {
      serie: [358, 360, 357, 361, 359, 180],
      repereeParLEnonce: false,
      aberrante: { index: 5, facteur: 0.5 },
      tacheDemandee: 'exploiter',
    },
    dispositifServi: 'la-moyenne-avec-et-sans',
  },

  // ── 9. Le rituel du contrôle ─────────────────────────────────────────────
  //
  // Pas un automatisme de calcul : le GESTE DE CONTRÔLE, qui est ce qui manque
  // au diagnostic. Il est exclu de la fenêtre des cinq séances — sinon il sature
  // mécaniquement le cercle 1, dont il relève presque entièrement.
  {
    id: 'ch04-sf6-i02-rituel-un-litre-d-eau',
    sfPrincipal: 'ch04-sf6-identifier-un-materiau-par-sa-masse-volumique',
    chapitre: 'ch04-masse-volumique',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'ordre-de-grandeur-de-l-eau',
    enonce: "Un litre d'eau qui pèse deux kilos et demi, c'est possible ? Donne la masse "
      + "volumique de l'eau, avec son unité, avant de répondre.",
    requete: { table: 'masses-volumiques', cle: 'eau', colonne: 'masseVolumique' },
    reponse: { valeur: [1, 1], unite: 'g/cm³', semantique: 'exacte' },
    rituelDeControle: true,
  },

  // ── 10. L'autre moitié du savoir-faire de branchement ────────────────────
  //
  // « Indiquer où placer un ampèremètre **et prévoir ce qu'il lira** ». Le « et »
  // de la reformulation n'est pas cosmétique : c'est lui qui produit l'item hors
  // cercle 3 sans lequel le savoir-faire n'est pas acquérable. Sans cet item,
  // « ch07-sf1 » ne porterait que du cercle 3, et le contrôle le refuse —
  // Shavelson dit que le cercle 3 n'est pas substituable, pas que le cercle 1
  // est obligatoire, mais un savoir-faire qui n'a QUE du cercle 3 ne sort jamais
  // de la file.
  {
    id: 'ch07-sf1-i02-que-lira-t-il-apres-la-lampe',
    sfPrincipal: 'ch07-sf1-placer-un-amperemetre-et-prevoir-sa-lecture',
    chapitre: 'ch07-intensite-du-courant',
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'guirlande-a-une-seule-boucle',
    enonce: "Dans un circuit en série, un ampèremètre placé entre la pile et la lampe indique "
      + "une certaine intensité. On en place un second entre la lampe et la pile. "
      + 'Qu\'indiquera-t-il ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'la-meme-valeur',
      choixPossibles: ['une-valeur-plus-faible', 'la-meme-valeur', 'une-valeur-nulle'],
    },
    justifications: [
      {
        id: 'meme-boucle-meme-courant',
        texte: "Il n'y a qu'une seule boucle : ce qui passe dans un fil passe dans tous les autres.",
        juste: true,
        provenance: 'institutionnelle',
        source: 'Éduscol, ressource d\'accompagnement du cycle 4, juin 2016',
      },
      {
        id: 'la-lampe-en-consomme',
        texte: "La lampe consomme du courant pour briller : il en ressort forcément moins.",
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Shipstone, modèle « atténuation » — typologie rapportée dans didactique.md § 4.2',
        piege: 'courant-qui-s-use',
      },
      {
        id: 'la-pile-en-fabrique',
        texte: 'La pile fabrique le courant, donc il est plus fort juste à sa sortie.',
        juste: false,
        provenance: 'reformulee',
        deriveDe: 'Shipstone, modèle « source constante de courant » — didactique.md § 4.2',
        piege: 'pile-fabrique-le-courant-ampoule-le-consomme',
      },
      {
        id: 'les-lois-sont-des-lois',
        texte: "La loi d'unicité dit que c'est pareil partout, donc c'est pareil partout.",
        juste: false,
        // Conforme, récitée, et sans adhésion : elle ne dit pas POURQUOI, elle
        // récite le titre du chapitre. C'est le cas que le double QCM existe
        // pour séparer de la compréhension.
        provenance: 'locale',
        piege: 'raisonnement-sequentiel',
      },
    ],
    piege: 'courant-qui-s-use',
    situation: {
      circuit: BOUCLE_DEUX_AMPEREMETRES,
      mesures: [{ type: 'amperemetre', id: 'A1' }, { type: 'amperemetre', id: 'A2' }],
    },
    dispositifServi: 'deux-amperemetres-de-part-et-d-autre',
    relu: {
      par: 'auteur-du-corpus',
      date: '2026-08-12',
      hash: '24545dafe57bd0b1',
    },
  },

  // ── 11. Une réponse sans dimension, et son état explicite ────────────────
  //
  // « Sans unité » est une réponse de PLEIN DROIT, et c'est le troisième état du
  // champ. Sans lui, on ne distingue pas l'oubli d'unité du refus légitime, et
  // tout vérificateur « l'élève a-t-il mis une unité ? » produit des faux
  // positifs sur chaque réponse adimensionnée du corpus.
  {
    id: 'ch03-sf1-i01-proportion-de-dioxygene',
    sfPrincipal: 'ch03-sf1-composition-de-l-air',
    chapitre: 'ch03-air-et-composition',
    programme: '2020',
    classe: 'A_TABLE',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'composition-de-l-air-sec',
    enonce: "Quelle fraction du volume de l'air sec le dioxygène occupe-t-il ? "
      + 'Réponds par une fraction, et coche « sans unité ».',
    requete: { table: 'composition-de-l-air', cle: 'dioxygene', colonne: 'proportion' },
    reponse: { valeur: [1, 5], unite: SANS_UNITE, semantique: 'exacte' },
  },
].map(Object.freeze));
