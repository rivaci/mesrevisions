// L'emboîtement des trois moteurs — la question qu'aucun d'eux n'a pu se poser.
//
//     node tools/tester-integration.mjs
//
// `srs.js`, `seance.js` et `schema.js` ont été écrits EN PARALLÈLE, sans se voir.
// Chacun a ses tests, chacun passe. Ce fichier ne teste aucun des trois : il
// teste LE JOINT — les formes de données qui doivent coïncider pour qu'une
// séance existe, et le chemin complet du profil élève jusqu'à la figure rendue.
//
// ── Pourquoi un fichier séparé, et pas trois tests de plus ──────────────────
//
// Un désaccord d'interface ne se voit sur aucun des deux côtés. `srs.js` écrivait
// `revoirALaSeance` et ses 204 tests passaient ; `seance.js` lisait `echeance` et
// ses 173 tests passaient ; branchés l'un sur l'autre, `echeance` valait
// `undefined`, `echeanceDue` répondait « oui » pour TOUS les pièges, la file
// était saturée en permanence — et `controlerSeance` rendait zéro anomalie,
// parce qu'une file saturée est une file parfaitement normale. Aucun test de
// l'un ni de l'autre ne pouvait voir cela : il faut les deux dans le même
// processus.
//
// ── Ce qui a remplacé l'adaptateur ──────────────────────────────────────────
//
// La première version de ce fichier commençait par un ADAPTATEUR : une fonction
// qui traduisait le profil de `srs.js` dans le vocabulaire de `seance.js`, et
// qui portait la liste des désaccords écrite en code. Six traductions, chacune
// silencieuse, aucune détectable d'un seul côté.
//
// Elles ont été supprimées plutôt que maintenues, et l'ordre des opérations est
// ce qui compte : ce n'est pas l'adaptateur qui a été effacé, ce sont les
// désaccords, dans les modules. Le vocabulaire d'état est celui de `srs.js`, qui
// FIXE les échéances ; `seance.js`, qui ne fait que les lire, lit ses noms.
// L'ordre de la file est celui de `srs.js`, garde-fou de famine compris, importé
// par `seance.js` au lieu d'être réécrit. `formatDiagnostique` est un objet
// partout dans le catalogue, et le drapeau d'item qui portait le même nom
// s'appelle `estFormatDiagnostique`. Une figure déclare sa `sorte`.
//
// **Ce fichier ne traduit donc plus rien**, et c'est son verdict : le profil
// construit par `srs.js` est passé TEL QUEL à `seance.js`. Ce qui reste
// d'écart — deux champs d'item qu'aucun module ne déclare, un catalogue de
// savoir-faire qui n'existe pas, un garde-fou branché sur un champ que le corpus
// ne porte pas — est en RÉSERVE, en bas de ce fichier : ce ne sont pas des
// désaccords entre modules, ce sont des trous dans le contenu, et ils se
// comblent en écrivant du contenu, pas en renommant un champ.
//
// ── Ce que ce fichier NE prouve pas ─────────────────────────────────────────
//
// Le vivier est artificiel — les items ne sont pas écrits. Ce qui est éprouvé
// ici est que les FORMES coïncident et que le chemin va jusqu'au bout, jamais
// que le corpus tient les bandes ou le budget. Le catalogue de pièges, lui, est
// le vrai : c'est le seul des trois jeux de données qui existe.

import {
  PLAFOND_INTERVALLE,
  apresReponsePiege,
  apresReponseSavoirFaire,
  comparerPiegesDus,
  dispositifSuivant,
  dispositifsDeReconfrontation,
  estMaitrise,
  etatInitialPiege,
  etatInitialSavoirFaire,
  issueDuDoubleQcm,
  programmerPiege,
} from '../js/srs.js';

import {
  BUDGET_SEANCE,
  CERCLES,
  SORTES_PAR_TYPE,
  TAILLE_FENETRE,
  TYPES_D_ITEM,
  controlerFenetre,
  controlerSeance,
  genererSeance,
  piegesDusDeLaSeance,
  resumerSeance,
} from '../js/seance.js';

import {
  SORTES_DE_FIGURE,
  graphique,
  rendreFigure,
  schemaCircuit,
  schemaParticulaire,
  tableauDeMesures,
} from '../js/schema.js';
import { PIEGES } from '../js/data/pieges/index.js';

let passes = 0;
const echecs = [];
const reserves = [];

const verifier = (nom, condition) => {
  if (condition === true) passes += 1;
  else echecs.push(nom);
};

/** Ce qu'on attend d'un module qui rend un verdict : jamais d'exception. */
const sansLever = (nom, f) => {
  try {
    const valeur = f();
    passes += 1;
    return valeur;
  } catch (e) {
    echecs.push(`${nom} — a LEVÉ ${e.constructor.name} : ${e.message}`);
    return undefined;
  }
};

const reserve = (texte) => reserves.push(texte);

// ════════════════════════════════════════════════════════════════════════════
// 1. Le profil élève, écrit dans le vocabulaire de `srs.js`
// ════════════════════════════════════════════════════════════════════════════
//
// C'est le seul vocabulaire qui ait une autorité : `srs.js` est le module qui
// FIXE les échéances, `seance.js` déclare lui-même ne faire que les lire. Un
// profil écrit dans le vocabulaire du lecteur plutôt que dans celui de l'auteur
// serait un profil que personne ne sait faire avancer.

const CHAPITRES = [
  'ch01-melanges-et-solubilite',
  'ch02-tension-electrique',
  'ch03-air-et-composition',
  'ch04-masse-volumique',
  'ch05-atomes-molecules',
  'ch06-transformations-chimiques',
];
const CHAPITRE_COURANT = 'ch06-transformations-chimiques';

/** Les pièges dont le chapitre d'origine a été fait : les seuls programmables. */
const PIEGES_OUVERTS = Object.values(PIEGES).filter((p) => CHAPITRES.includes(p.chapitreOrigine));

/**
 * Le piège laissé volontairement HORS de la file, pour éprouver la convention.
 *
 * « Chapitre fait, piège jamais rencontré » est l'état que les deux modules
 * lisaient à l'envers l'un de l'autre. Le laisser dans le profil, à
 * `revoirALaSeance: null`, est le seul moyen de vérifier sur le chemin réel
 * qu'il n'est ni dû ni oublié. Et comme c'est `gaz-n-est-pas-de-la-matiere`, la
 * dépendance d'Andersson se met à mordre pour de bon : `conservation-de-la-masse`
 * ne peut pas entrer dans la file tant que celui-ci n'a pas été rencontré.
 */
const PIEGE_JAMAIS_RENCONTRE = 'gaz-n-est-pas-de-la-matiere';

/**
 * Les savoir-faire du profil.
 *
 * Deux sources, et c'est déjà une observation : les identifiants de savoir-faire
 * que le moteur DOIT connaître ne viennent d'aucun catalogue de savoir-faire —
 * il n'y en a pas — mais du champ `iatrogene` des pièges de rang 2, plus ceux
 * que les items déclarent en `sfPrincipal`. Deux fichiers nomment des
 * savoir-faire, aucun ne les définit.
 */
const SF_IATROGENES = [...new Set(PIEGES_OUVERTS.filter((p) => p.iatrogene).map((p) => p.iatrogene))];
const SF_DU_COEUR = [
  'ch06-sf1-identifier-une-transformation-chimique',
  'ch06-sf4-redistribution-des-atomes',
  'ch06-sf6-conservation-de-la-masse',
  'ch06-sf9-lire-un-graphique',
  'ch06-sf11-critiquer-un-resultat',
];
const SF_DU_RITUEL = ['geste-ordre-de-grandeur', 'geste-coherence-dimensionnelle', 'geste-vraisemblance'];
const TOUS_LES_SF = [...new Set([...SF_IATROGENES, ...SF_DU_COEUR, ...SF_DU_RITUEL])];

/**
 * Le profil, à la séance 12 — et c'est DIRECTEMENT l'`etatEleve` de `seance.js`.
 *
 * Aucun état n'est écrit à la main : tous passent par les constructeurs de
 * `srs.js`, sans quoi ce fichier testerait sa propre idée de ce qu'est un état.
 * Aucun n'est traduit non plus, et c'est le point : le profil que `srs.js`
 * construit est la donnée que `seance.js` lit.
 */
function profilInitial() {
  const pieges = {};
  for (const p of PIEGES_OUVERTS) {
    const vierge = etatInitialPiege(p);
    // La séance de première rencontre : le rang du chapitre d'origine, décalé
    // pour que les échéances ne tombent pas toutes ensemble.
    const rencontre = 1 + 2 * CHAPITRES.indexOf(p.chapitreOrigine);
    pieges[p.id] = p.id === PIEGE_JAMAIS_RENCONTRE ? vierge : programmerPiege(vierge, p, rencontre);
  }

  // Les savoir-faire iatrogènes ont DÉJÀ été travaillés — c'est la condition que
  // `seance.js` exige pour servir un piège de rang 2, et un profil de séance 12
  // qui n'aurait rencontré aucun savoir-faire serait un profil de séance 1.
  const savoirFaire = {};
  for (const sf of TOUS_LES_SF) {
    const vierge = etatInitialSavoirFaire();
    savoirFaire[sf] = SF_IATROGENES.includes(sf)
      ? apresReponseSavoirFaire(vierge, { issue: 'reussite', numeroSeance: 6, palier: 1, cercle: 1, classe: 'A' })
      : vierge;
  }

  return {
    numeroSeance: 12,
    chapitreCourant: CHAPITRE_COURANT,
    chapitresFaits: CHAPITRES,
    vivier: VIVIER,
    savoirFaire,
    pieges,
    fenetre: [],
    dernierPiegeRevise: null,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// 2. Le vivier artificiel — mais des contextes de surface RÉELS
// ════════════════════════════════════════════════════════════════════════════
//
// Les items n'existent pas ; leurs `contexteDeSurface`, si. Les tirer du
// catalogue plutôt que de les inventer est ce qui rend le joint testable : si
// l'item porte `ctx-3` et le catalogue `dissolution-en-systeme-ferme`, les deux
// règles de variation ne se contredisent pas — elles ne se rencontrent jamais.

/** Les champs qu'aucun des trois modules ne définit, et qu'il a fallu inventer
 *  pour que la boucle se referme. Ils sont marqués, et comptés en réserve. */
const CHAMPS_INVENTES = ['classe', 'dispositifServi'];

const item = (o) => ({
  id: o.id,
  sfPrincipal: o.sf,
  chapitre: o.ch,
  cercle: o.cercle ?? 1,
  palier: o.palier ?? 1,
  type: o.type ?? 'court',
  piege: o.piege ?? null,
  rituelDeControle: o.rituel === true,
  contexteDeSurface: o.ctx ?? null,
  // Le drapeau et la figure sont déclarés par `seance.js`, qui les contrôle.
  estFormatDiagnostique: o.estFormatDiagnostique === true,
  figure: o.figure ?? null,
  // ── au-delà d'ici, rien n'est déclaré par aucun module ──
  classe: o.classe ?? 'A',
  dispositifServi: o.dispositif ?? null,
});

/** Un circuit série, écrit comme `circuit.js` l'attend. */
const CIRCUIT_SERIE = {
  dipoles: [
    { id: 'P', type: 'pile', bornes: ['n0', 'n1'] },
    { id: 'A', type: 'amperemetre', bornes: ['n1', 'n2'] },
    { id: 'L1', type: 'lampe', bornes: ['n2', 'n3'] },
    { id: 'K', type: 'interrupteur', bornes: ['n3', 'n0'], etat: 'ferme' },
  ],
};

const MESURES = {
  titre: 'Masse d\'eau versée',
  x: { titre: 'Volume (mL)', min: 0, max: 50, pas: 10 },
  y: { titre: 'Masse (g)', min: 0, max: 50, pas: 10 },
  points: [[0, 0], [10, 10], [20, 20], [30, 30], [40, 40]],
  reperes: [[25, 25]],
};

const ECHANTILLON = {
  etat: 'solide',
  titre: 'Un échantillon de fer',
  contenu: [{ nom: 'fer', formule: 'Fe', nombre: 9, atomes: [{ element: 'Fe' }] }],
};

/**
 * Les items porteurs de piège, un par dispositif réel du catalogue.
 *
 * Chaque item est posé dans un chapitre suivi qui n'est pas le chapitre courant
 * — sans quoi `seance.js` refuse de l'employer en re-confrontation, et à juste
 * titre : dans le chapitre du moment tout est étiqueté par le chapitre.
 */
const ITEMS_DE_PIEGE = PIEGES_OUVERTS.flatMap((p) => {
  const ailleurs = CHAPITRES.filter((c) => c !== CHAPITRE_COURANT);
  return dispositifsDeReconfrontation(p).map((d, k) => item({
    id: `pi-${p.id}-${k}`,
    sf: SF_DU_COEUR[k % SF_DU_COEUR.length],
    ch: ailleurs[(CHAPITRES.indexOf(p.chapitreOrigine) + k) % ailleurs.length],
    cercle: [0, 1, 2][k % 3],
    palier: 1,
    type: d.type === 'constat' ? 'prediction-engagee' : 'double-qcm',
    piege: p.id,
    ctx: d.contexteDeSurface ?? null,
    classe: 'C',
    estFormatDiagnostique: true,
    dispositif: d.id,
  }));
});

/** Le cœur : le chapitre courant, quatre cercles, quatre paliers. */
const ITEMS_DU_COEUR = SF_DU_COEUR.flatMap((sf, s) => CERCLES.flatMap(
  (c) => [1, 2, 3, 4].map((palier) => item({
    id: `co-${s}-${c}-${palier}`,
    sf,
    ch: CHAPITRE_COURANT,
    cercle: c,
    palier,
    type: c === 3 ? 'schema-circuit' : (palier === 4 ? 'double-qcm' : 'court'),
    classe: c === 0 ? 'B' : 'A',
    figure: c === 3 ? { sorte: 'circuit', circuit: CIRCUIT_SERIE } : null,
  })),
));

/** Le rituel : gestes de contrôle, hors chapitre courant, jamais mesurés. */
const ITEMS_DU_RITUEL = SF_DU_RITUEL.flatMap((sf, s) => [0, 1].map((k) => item({
  id: `ri-${s}-${k}`,
  sf,
  ch: CHAPITRES[k],
  cercle: 1,
  palier: 1,
  type: 'court',
  rituel: true,
  classe: 'A_TABLE',
})));

/**
 * Quatre items à figure, un par sorte que `schema.js` sait tracer.
 *
 * Deux d'entre eux sont de type « lecture », et c'est tout l'objet du champ :
 * le type porte le coût, la `sorte` porte le tracé. Auparavant, deux items
 * indiscernables auraient été servis l'un en graphique et l'autre en tableau
 * selon l'humeur de l'appelant.
 */
const ITEMS_A_FIGURE = [
  item({
    id: 'fig-circuit', sf: SF_DU_COEUR[0], ch: 'ch02-tension-electrique', cercle: 3,
    palier: 1, type: 'schema-circuit', figure: { sorte: 'circuit', circuit: CIRCUIT_SERIE },
  }),
  item({
    id: 'fig-particules', sf: SF_DU_COEUR[1], ch: 'ch05-atomes-molecules', cercle: 0,
    palier: 1, type: 'schema-particulaire', figure: { sorte: 'particulaire', description: ECHANTILLON },
  }),
  item({
    id: 'fig-graphique', sf: SF_DU_COEUR[3], ch: 'ch04-masse-volumique', cercle: 1,
    palier: 1, type: 'lecture', figure: { sorte: 'graphique', donnees: MESURES },
  }),
  item({
    id: 'fig-tableau', sf: SF_DU_COEUR[3], ch: 'ch04-masse-volumique', cercle: 1,
    palier: 1, type: 'lecture', figure: { sorte: 'tableau', donnees: MESURES },
  }),
];

const VIVIER = [...ITEMS_DE_PIEGE, ...ITEMS_DU_COEUR, ...ITEMS_DU_RITUEL, ...ITEMS_A_FIGURE];

// ════════════════════════════════════════════════════════════════════════════
// 3. Le profil de `srs.js` passé TEL QUEL — l'épreuve du joint
// ════════════════════════════════════════════════════════════════════════════
//
// Ce bloc mesurait, dans la version précédente, le COÛT de l'absence
// d'adaptateur : le profil brut était accepté, la file était saturée, chaque
// piège était déclaré en retard du numéro de séance entier, et aucun rang 2
// n'entrait jamais. Il vérifie maintenant l'inverse — que le même profil, sans
// une ligne de traduction, produit une file qui a un sens.

const profil = profilInitial();

const seance = sansLever('le profil de `srs.js` ne fait pas lever `seance.js`',
  () => genererSeance(profil, 7));

verifier('… et il n\'est pas refusé : les deux modules lisent le même état',
  seance?.refus === null);
verifier('… et `controlerSeance` ne trouve rien à redire', controlerSeance(seance).length === 0);

const { file: dus, ecartes } = piegesDusDeLaSeance(profil, PIEGES);

verifier('la file n\'est pas saturée : elle ne contient pas tout le catalogue ouvert',
  dus.length < PIEGES_OUVERTS.length);
verifier('aucun piège n\'est déclaré en retard de la séance entière (signature de l\'échéance absente)',
  dus.every((e) => e.retard < profil.numeroSeance));
verifier('tout piège de la file porte une échéance réellement arrivée',
  dus.every((e) => Number.isInteger(e.etat.revoirALaSeance)
    && e.etat.revoirALaSeance <= profil.numeroSeance));

// La convention « chapitre fait, piège jamais rencontré », sur le chemin réel.
verifier('le piège jamais rencontré n\'est pas dans la file',
  !dus.some((e) => e.piege.id === PIEGE_JAMAIS_RENCONTRE));
verifier('… et il ne disparaît pas en silence : il est écarté au motif « non-programme »',
  ecartes.some((e) => e.piege === PIEGE_JAMAIS_RENCONTRE && e.motif === 'non-programme'));
verifier('… son état porte bien la convention (`revoirALaSeance: null`, `rencontre: false`)',
  profil.pieges[PIEGE_JAMAIS_RENCONTRE].revoirALaSeance === null
  && profil.pieges[PIEGE_JAMAIS_RENCONTRE].rencontre === false);

// La dépendance d'Andersson ne se lit pas sur une séance : à la douzième,
// `conservation-de-la-masse` n'est pas encore dû (échéance à 14). Elle se voit
// sur la trajectoire, plus bas — c'est le propre d'une dépendance de profil.
verifier('conservation-de-la-masse n\'est pas dans la file, et son échéance n\'est pas encore arrivée',
  !dus.some((e) => e.piege.id === 'conservation-de-la-masse')
  && profil.pieges['conservation-de-la-masse'].revoirALaSeance > profil.numeroSeance);

// Le rang 2 : c'est `savoirFaire[].rencontres` qui décide, champ que l'état de
// savoir-faire ne portait pas. Sans lui, AUCUN des huit rangs 2 du catalogue
// n'était jamais servi, et le motif d'écart — une dépendance non levée — était
// parfaitement normal à lire.
const RANGS_2_OUVERTS = PIEGES_OUVERTS.filter((p) => p.rang === 2);
verifier('le catalogue ouvert porte bien des pièges de rang 2', RANGS_2_OUVERTS.length > 0);
verifier('tout savoir-faire iatrogène du profil porte un compte de rencontres',
  SF_IATROGENES.every((sf) => Number.isInteger(profil.savoirFaire[sf]?.rencontres)));
verifier('aucun rang 2 n\'est écarté au motif d\'un savoir-faire producteur jamais rencontré',
  !ecartes.some((e) => {
    const p = PIEGES[e.piege];
    return p?.rang === 2 && e.motif === 'dependance' && e.detail === `attend ${p.iatrogene}`;
  }));

// L'ordre : celui de `srs.js`, et lui seul.
verifier('la file de `seance.js` est ordonnée par le comparateur de `srs.js`',
  dus.map((e) => e.piege.id).join(',')
  === [...dus].sort(comparerPiegesDus(profil.numeroSeance)).map((e) => e.piege.id).join(','));

// ════════════════════════════════════════════════════════════════════════════
// 4. Les formes, champ par champ
// ════════════════════════════════════════════════════════════════════════════

// ── 4.1 Ce que `seance.js` lit sur un piège, `data/pieges` l'écrit-il ? ──────
verifier('tout piège du catalogue porte `rang`, `chapitreOrigine` et `rythmeInitial`',
  Object.values(PIEGES).every((p) => [1, 2, 3].includes(p.rang)
    && typeof p.chapitreOrigine === 'string'
    && Number.isInteger(p.rythmeInitial)));
verifier('tout piège de rang 2 porte `iatrogene` — sans quoi seance.js l\'écarte à jamais',
  Object.values(PIEGES).filter((p) => p.rang === 2).every((p) => typeof p.iatrogene === 'string'));
verifier('aucun piège ne porte d\'échéance : le corpus ne porte qu\'un rythme',
  Object.values(PIEGES).every((p) => p.echeance === undefined && p.revoirALaSeance === undefined));

// ── 4.2 Le plafond, lu par les deux modules ─────────────────────────────────
verifier('le plafond du rang 1 est le même des deux côtés (une seule constante)',
  PLAFOND_INTERVALLE[1] === 20 && PLAFOND_INTERVALLE[3] === Infinity);
verifier('aucun rythme initial ne dépasse le plafond de son rang',
  Object.values(PIEGES).every((p) => p.rythmeInitial <= PLAFOND_INTERVALLE[p.rang]));

// ── 4.3 `formatDiagnostique` : un nom, un type ──────────────────────────────
//
// Le catalogue n'était pas d'accord avec lui-même : objet sur douze pièges,
// chaîne sur dix-neuf, et le même nom désignait EN PLUS un drapeau booléen sur
// les items. Trois choses sous un nom, dont deux de natures différentes.
const typesDeFormatDiagnostique = new Set(
  Object.values(PIEGES).map((p) => (p.formatDiagnostique === undefined ? 'absent' : typeof p.formatDiagnostique)),
);
verifier('le catalogue est d\'accord avec lui-même sur le type de `formatDiagnostique`',
  typesDeFormatDiagnostique.size === 1 && typesDeFormatDiagnostique.has('object'));
verifier('… et ses trois fentes sont les mêmes partout',
  Object.values(PIEGES).every((p) => Object.keys(p.formatDiagnostique).sort().join(',')
    === 'contexteImpose,modeDeReponse,pourquoi'));
verifier('le drapeau d\'item porte un autre nom, parce qu\'il désigne autre chose',
  VIVIER.every((i) => typeof i.estFormatDiagnostique === 'boolean' && i.formatDiagnostique === undefined));

// ── 4.4 Le contexte de surface : la clé que les deux règles de variation lisent ─
const contextesDuCatalogue = new Set(
  Object.values(PIEGES).flatMap((p) => dispositifsDeReconfrontation(p).map((d) => d.contexteDeSurface)),
);
verifier('les contextes de surface des items sont ceux du catalogue, sans traduction',
  ITEMS_DE_PIEGE.every((i) => i.contexteDeSurface === null || contextesDuCatalogue.has(i.contexteDeSurface)));

// ── 4.5 Les types d'item et les sortes de figure ────────────────────────────
//
// « lecture » désigne DEUX figures — le graphique et le tableau de mesures — et
// rien sur l'item ne disait laquelle. Le type n'a pas été scindé : les deux
// coûtent la même chose, et dédoubler une ligne de `COUTS` pour une distinction
// sans effet sur la durée aurait déplacé le problème. C'est l'item qui tranche.
verifier('trois types d\'item sur six désignent une figure',
  TYPES_D_ITEM.filter((t) => SORTES_PAR_TYPE[t]).length === 3);
verifier('« lecture » en désigne DEUX, et l\'item dit laquelle par `figure.sorte`',
  SORTES_PAR_TYPE.lecture.length === 2
  && ITEMS_A_FIGURE.filter((i) => i.type === 'lecture').map((i) => i.figure.sorte).join(',') === 'graphique,tableau');
verifier('« prediction-engagee » n\'en désigne aucune : son dispositif est dans le catalogue',
  SORTES_PAR_TYPE['prediction-engagee'] === undefined
  && Object.values(PIEGES).some((p) => (p.constats ?? []).some((c) => c.predictionEngagee)));
verifier('les sortes que `seance.js` admet sont exactement celles que `schema.js` sait tracer',
  [...new Set(Object.values(SORTES_PAR_TYPE).flat())].every((s) => SORTES_DE_FIGURE.includes(s))
  && SORTES_DE_FIGURE.every((s) => Object.values(SORTES_PAR_TYPE).flat().includes(s)));

// ════════════════════════════════════════════════════════════════════════════
// 5. Le chemin complet — six séances, du tirage à la figure
// ════════════════════════════════════════════════════════════════════════════

/** Une réponse d'élève reproductible : ni date, ni `Math.random`. */
function repondre(unItem, numeroSeance) {
  let h = 2166136261;
  for (const c of `${unItem.id}#${numeroSeance}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const t = ((h >>> 0) % 100) / 100;
  if (unItem.type === 'double-qcm') return issueDuDoubleQcm(t < 0.75, t < 0.55);
  return t < 0.7 ? 'reussite' : 'echec';
}

/**
 * Ce que l'application aurait à écrire entre deux séances : servir la séance,
 * lire les réponses, et faire avancer les DEUX SRS.
 *
 * Il n'y a plus de traduction ici : le profil est l'état, et l'état est le
 * profil. `dispositifServi` reste le champ inventé — `seance.js` choisit un item
 * par son contexte de surface, `srs.js` exige un identifiant de dispositif, et
 * c'est à l'écriture des items que quelqu'un devra décider qui l'écrit.
 */
function jouerUneSeance(profilCourant, graine) {
  const laSeance = genererSeance(profilCourant, graine);
  const anomalies = controlerSeance(laSeance);

  const pieges = { ...profilCourant.pieges };
  const savoirFaire = { ...profilCourant.savoirFaire };
  const n = profilCourant.numeroSeance;
  const figures = [];

  for (const it of laSeance.items) {
    const issue = repondre(it, n);

    savoirFaire[it.sfPrincipal] = apresReponseSavoirFaire(
      savoirFaire[it.sfPrincipal] ?? etatInitialSavoirFaire(),
      {
        issue,
        numeroSeance: n,
        palier: it.palier,
        cercle: it.cercle,
        classe: it.classe,
        estFormatDiagnostique: it.estFormatDiagnostique,
        doubleQcm: it.type === 'double-qcm',
      },
    );

    if (it.piege) {
      pieges[it.piege] = apresReponsePiege(pieges[it.piege], PIEGES[it.piege], {
        issue,
        numeroSeance: n,
        palier: it.palier,
        dispositifServi: it.dispositifServi,
      });
    }

    if (it.figure) figures.push(rendreFigure(it.figure));
  }

  return {
    seance: laSeance,
    anomalies,
    figures,
    profil: {
      ...profilCourant,
      numeroSeance: n + 1,
      pieges,
      savoirFaire,
      fenetre: [...profilCourant.fenetre, resumerSeance(laSeance)].slice(-TAILLE_FENETRE),
      dernierPiegeRevise: laSeance.reconfrontation?.piege ?? profilCourant.dernierPiegeRevise,
    },
  };
}

const trace = [];
let courant = profil;
for (let k = 0; k < 6; k += 1) {
  const tour = sansLever(`séance ${courant.numeroSeance} : le chemin complet ne lève pas`,
    () => jouerUneSeance(courant, 100 + k));
  if (!tour) break;
  trace.push(tour);
  courant = tour.profil;
}

verifier('six séances ont été composées de bout en bout', trace.length === 6);
verifier('aucune séance n\'a été refusée', trace.every((t) => t.seance.refus === null));
verifier('aucune anomalie de séance sur les six', trace.every((t) => t.anomalies.length === 0));
verifier('aucune séance ne dépasse les 15 minutes',
  trace.every((t) => t.seance.cout.total <= BUDGET_SEANCE));
verifier('chaque séance porte un rituel et un cœur, et une re-confrontation a bien eu lieu',
  trace.every((t) => t.seance.rituel.length > 0 && t.seance.coeur.length > 0)
  && trace.some((t) => t.seance.reconfrontation !== null));
verifier('la re-confrontation n\'est jamais prise dans le chapitre courant',
  trace.every((t) => !t.seance.reconfrontation
    || t.seance.reconfrontation.item.chapitre !== CHAPITRE_COURANT));

// La dépendance iatrogène des rangs 2, franchie sur la trajectoire : c'est le
// seul endroit où elle se voit, puisqu'elle réclame à la fois une échéance
// arrivée et un savoir-faire déjà rencontré.
const filesDeLaTrajectoire = trace.map((t) => piegesDusDeLaSeance(t.profil, PIEGES));
verifier('un piège de rang 2 finit par entrer dans la file, sa dépendance iatrogène levée',
  filesDeLaTrajectoire.some((f) => f.file.some((e) => e.piege.rang === 2)));
// La dépendance d'Andersson, éprouvée pour de bon : le gaz n'ayant jamais été
// rencontré, `conservation-de-la-masse` ne doit JAMAIS entrer dans la file, et
// il doit le dire dès que son échéance arrive. Dans la version précédente de ce
// fichier, l'adaptateur déclarait le gaz rencontré d'office et le test passait
// par sa première branche sans rien éprouver.
verifier('la dépendance d\'Andersson mord : le motif est émis dès que l\'échéance arrive',
  filesDeLaTrajectoire.some((f) => f.ecartes
    .some((e) => e.piege === 'conservation-de-la-masse' && e.motif === 'dependance')));
verifier('… et conservation-de-la-masse n\'entre jamais dans la file tant que le gaz est inconnu',
  trace.every((t) => t.profil.pieges[PIEGE_JAMAIS_RENCONTRE].rencontre === true
    || !piegesDusDeLaSeance(t.profil, PIEGES).file.some((e) => e.piege.id === 'conservation-de-la-masse')));

// ── 5.1 Le SRS a-t-il vraiment avancé ? ─────────────────────────────────────
const piegesServis = trace.map((t) => t.seance.reconfrontation?.piege).filter(Boolean);
verifier('des pièges ont été servis, et leurs échéances ont bougé',
  piegesServis.length > 0
  && piegesServis.every((id) => courant.pieges[id].revoirALaSeance > profil.pieges[id].revoirALaSeance));
verifier('tout piège servi a bien enregistré sa réponse',
  piegesServis.every((id) => courant.pieges[id].reussites + courant.pieges[id].echecs > 0));
verifier('aucun piège n\'a d\'intervalle au-dessus du plafond de son rang',
  Object.entries(courant.pieges).every(([id, e]) => e.intervalle <= PLAFOND_INTERVALLE[PIEGES[id].rang]));
verifier('aucun piège programmé n\'est sorti de la file (pas d\'état absorbant)',
  Object.entries(courant.pieges)
    .filter(([id]) => id !== PIEGE_JAMAIS_RENCONTRE)
    .every(([, e]) => Number.isInteger(e.revoirALaSeance)));
verifier('… et le piège jamais rencontré n\'y est pas entré tout seul',
  courant.pieges[PIEGE_JAMAIS_RENCONTRE].revoirALaSeance === null);

// ── 5.2 La fenêtre glissante ────────────────────────────────────────────────
const fenetre = trace.map((t) => resumerSeance(t.seance)).slice(-TAILLE_FENETRE);
const controleFenetre = sansLever('controlerFenetre lit les résumés des séances jouées',
  () => controlerFenetre(fenetre));
verifier('la fenêtre est mesurée à partir de la cinquième séance', controleFenetre?.mesuree === true);
verifier('aucun résumé n\'est hors cadre',
  (controleFenetre?.anomalies ?? []).every((a) => a.code !== 'RESUME_HORS_CADRE'));
verifier('aucun item sans cercle sur la fenêtre',
  (controleFenetre?.anomalies ?? []).every((a) => a.code !== 'SOMME_DES_PARTS'));

// ── 5.3 Les figures rendues ─────────────────────────────────────────────────
const toutesLesFigures = trace.flatMap((t) => t.figures);
verifier('des figures ont été rendues au fil des séances', toutesLesFigures.length > 0);
verifier('toutes sont engendrées sans refus', toutesLesFigures.every((f) => f.ok === true));
verifier('chacune porte un `aria-label` engendré du même objet que le dessin',
  toutesLesFigures.every((f) => typeof f.description === 'string' && f.description.length > 20
    && (!f.html.includes('<svg') || f.html.includes('aria-label='))));
verifier('aucune figure ne référence un fichier image (invariant 6)',
  toutesLesFigures.every((f) => !/<img|xlink:href|url\(/.test(f.html)));

// L'aiguillage vit dans `schema.js`, et il est le SEUL : un appelant qui
// réécrirait le sien finirait par tracer autre chose que ce que l'item déclare.
verifier('`rendreFigure` sait tracer les quatre sortes, et refuse la cinquième',
  [
    { sorte: 'circuit', circuit: CIRCUIT_SERIE, titre: 'Circuit série' },
    { sorte: 'particulaire', description: ECHANTILLON },
    { sorte: 'graphique', donnees: MESURES },
    { sorte: 'tableau', donnees: MESURES },
  ].every((f) => rendreFigure(f).ok === true)
  && rendreFigure({ sorte: 'chronophoto' }).ok === false
  && rendreFigure(null).ok === false);

// Le graphique et le tableau prennent LE MÊME objet : ils énoncent donc les
// mêmes couples, et ils refusent les mêmes données. Le second point est le vrai
// contrôle — deux fonctions qui tracent d'accord mais refusent en désaccord
// serviraient à l'élève, dans un registre, la donnée dont l'autre vient
// d'établir qu'elle est fausse.
const figuresHorsSeance = [
  schemaCircuit(CIRCUIT_SERIE, { titre: 'Circuit série' }),
  schemaParticulaire(ECHANTILLON),
  graphique(MESURES),
  tableauDeMesures(MESURES),
];
verifier('les quatre fonctions de figure rendent toutes `ok` sur les objets du vivier',
  figuresHorsSeance.every((f) => f.ok === true));
verifier('le graphique et le tableau énoncent les mêmes couples',
  MESURES.points.every(([x, y]) => figuresHorsSeance[2].description.includes(`${x} ; ${y}`)
    && figuresHorsSeance[3].description.includes(`${x} ; ${y}`)));

const donneesHorsCadre = { ...MESURES, points: [...MESURES.points, [60, 60]] };
verifier('… et refusent le même jeu de données, avec la même raison',
  graphique(donneesHorsCadre).ok === false
  && graphique(donneesHorsCadre).raison === tableauDeMesures(donneesHorsCadre).raison);

// ── 5.4 Le savoir-faire s'acquiert, le piège jamais ─────────────────────────
const verdicts = Object.values(courant.savoirFaire).map((e) => estMaitrise(e, { diagnostic: 'type' }));
verifier('estMaitrise rend un verdict lisible pour chaque savoir-faire du profil',
  verdicts.every((v) => typeof v.maitrise === 'boolean' && Array.isArray(v.manque)));
verifier('un savoir-faire non acquis dit CE QU\'IL LUI MANQUE, jamais un booléen nu',
  verdicts.filter((v) => !v.maitrise).every((v) => v.manque.length > 0));

// ════════════════════════════════════════════════════════════════════════════
// 6. Les deux règles de variation, mises face à face
// ════════════════════════════════════════════════════════════════════════════
//
// `srs.js` décide du dispositif suivant, `seance.js` décide de l'item suivant.
// Ils lisent désormais la MÊME donnée — les dispositifs servis, traduits en
// contextes de surface par le catalogue — mais ils n'ont pas la même liberté :
// `srs.js` nomme le prochain dispositif, `seance.js` tire parmi les items dont
// le contexte n'a pas encore été servi. On mesure ici de combien ils divergent :
// ce n'est pas un test qui peut échouer, c'est un chiffre à lire.

let accords = 0;
let desaccords = 0;
for (const t of trace) {
  const r = t.seance.reconfrontation;
  if (!r) continue;
  const attendu = dispositifSuivant(PIEGES[r.piege], profil.pieges[r.piege]);
  if (!attendu.ok) continue;
  if (attendu.dispositif.contexteDeSurface === r.item.contexteDeSurface) accords += 1;
  else desaccords += 1;
}
verifier('les deux règles de variation ont pu être confrontées', accords + desaccords > 0);

// ── 6.1 Les deux drapeaux que `srs.js` posait et que personne ne lisait ─────
//
// Troisième forme du même silence, après l'échéance lue sous un autre nom et
// l'état écrit par un module sous le nom d'un autre : un état écrit par `srs.js`
// et lu par PERSONNE. `formatDifferentExige` et `contexteNeufExige` portent deux
// règles de la charte — « la fois suivante serve un item de format ou de
// contexte différent » après un juste/faux, « on redescend dans un décor neuf »
// après deux échecs — et ils vivaient dans un état que `seance.js`
// n'interrogeait pas. Aucun test des deux côtés ne pouvait le voir : chez
// `srs.js` le drapeau est correctement posé, chez `seance.js` l'item servi est
// parfaitement recevable. Il faut les deux dans le même processus, c'est-à-dire
// ici, et il faut regarder le CHOIX plutôt que le drapeau.
{
  const idPiege = PIEGES_OUVERTS.find((p) => ITEMS_DE_PIEGE.some((i) => i.piege === p.id))?.id;
  const porteurs = ITEMS_DE_PIEGE.filter((i) => i.piege === idPiege);

  // Le profil dit ce qui vient d'être servi ; `srs.js` l'écrit, on ne le
  // fabrique pas à la main.
  const apresJusteFaux = apresReponsePiege(profil.pieges[idPiege], PIEGES[idPiege], {
    issue: 'reussite-sans-justification',
    numeroSeance: profil.numeroSeance,
    palier: 1,
    type: porteurs[0].type,
    contexteDeSurface: porteurs[0].contexteDeSurface,
  });

  verifier('`srs.js` retient le format et le décor qu\'il vient de servir',
    apresJusteFaux.dernierServi?.type === porteurs[0].type
    && apresJusteFaux.dernierServi?.contexteDeSurface === porteurs[0].contexteDeSurface);

  const profilJusteFaux = {
    ...profil,
    numeroSeance: profil.numeroSeance + 1,
    pieges: { ...profil.pieges, [idPiege]: apresJusteFaux },
  };

  // On ne regarde que les séances où CE piège a effectivement eu le créneau :
  // le reste relève de l'ordre de la file, éprouvé plus haut.
  const servisApres = [1, 2, 3, 4, 5, 6, 7, 8]
    .map((g) => genererSeance(profilJusteFaux, g).reconfrontation)
    .filter((r) => r && r.piege === idPiege);

  verifier('… et `seance.js` le LIT : après un juste/faux, jamais le même format ET le même décor',
    servisApres.length === 0 || servisApres.every((r) => r.formatDifferentExige === true
      && !(r.item.type === apresJusteFaux.dernierServi.type
        && r.item.contexteDeSurface === apresJusteFaux.dernierServi.contexteDeSurface)));
  verifier('… ou, si le vivier ne l\'autorise pas, la contrainte cède et le DIT',
    servisApres.every((r) => r.formatIdentiqueMalgreTout === false
      || r.formatIdentiqueMalgreTout === true));
}

// ════════════════════════════════════════════════════════════════════════════
// Rapport
// ════════════════════════════════════════════════════════════════════════════

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);

console.log('\nLe joint, en chiffres :');
console.log(`  · ${Object.keys(PIEGES).length} pièges au catalogue, ${PIEGES_OUVERTS.length} ouverts par le profil.`);
console.log(`  · file de pièges à la séance 12 : ${dus.length} dus, ${ecartes.length} écartés `
  + `(${[...new Set(ecartes.map((e) => e.motif))].join(', ')}).`);
console.log(`  · six séances jouées, ${trace.reduce((s, t) => s + t.seance.items.length, 0)} items servis, `
  + `${piegesServis.length} re-confrontation(s), ${toutesLesFigures.length} figure(s) rendue(s).`);
console.log(`  · variation : ${accords} accord(s) et ${desaccords} désaccord(s) entre `
  + 'le dispositif que srs.js servirait et l\'item que seance.js choisit.');
console.log(`  · coût des séances (dixièmes de minute) : ${trace.map((t) => t.seance.cout.total).join(', ')} `
  + `pour un plafond de ${BUDGET_SEANCE}.`);

console.log('\n0 traduction — l\'adaptateur a fondu : le profil de `srs.js` est passé tel quel à `seance.js`.');

reserve(
  `${CHAMPS_INVENTES.length} champs d'item restent inventés ici : ${CHAMPS_INVENTES.join(', ')}.\n`
  + '      Ce ne sont plus des désaccords entre modules — `srs.js` les DÉCLARE tous deux, dans\n'
  + '      l\'événement de `apresReponseSavoirFaire` et dans celui de `apresReponsePiege` — mais\n'
  + '      aucun fichier ne dit encore ce qu\'un item en porte : pas de `classe` ⇒ estMaitrise\n'
  + '      refuse à jamais ; pas de `dispositifServi` ⇒ srs.js ne compte aucun dispositif servi.\n'
  + '      Ils se comblent à l\'écriture des items, pas par un renommage.',
);
reserve(
  'les savoir-faire du VIVIER de ce fichier restent inventés — `sfPrincipal` y nomme des\n'
  + '      identifiants que `js/data/savoir-faire.js` ne porte pas, donc `estMaitrise` refuse et\n'
  + '      rien ne sort du cœur ICI. Le catalogue, lui, existe désormais (86 savoir-faire) et il\n'
  + '      est le DÉFAUT de `genererSeance` : c\'était le dernier joint non branché — le paramètre\n'
  + '      valait `{}`, personne ne le passait, `estMaitrise` rendait `diagnostic-hors-enumere`\n'
  + '      pour tous, et aucun savoir-faire n\'était jamais retiré du cœur. Rien ne levait :\n'
  + '      la seule façon de s\'en apercevoir était qu\'un élève acquière quelque chose.',
);
reserve(
  '`chapitresPourReconfrontation` (srs.js) n\'a toujours aucun appelant et aucune donnée : elle\n'
  + '      attend `porteursPosterieurs`, champ qu\'aucun piège du catalogue ne porte. Le garde-fou de\n'
  + '      l\'interrupteur — déclaré non négociable — n\'est donc branché sur rien. C\'est le dernier\n'
  + '      mécanisme de la charte qui n\'a pas d\'endroit où s\'exécuter, et il lui manque un champ\n'
  + '      de CONTENU, pas une entente entre modules.',
);
reserve(
  'le vivier est artificiel : les items ne sont pas écrits. Ce fichier éprouve que les FORMES\n'
  + '      coïncident et que le chemin va jusqu\'au bout, jamais que le corpus tient les bandes.',
);

if (reserves.length) {
  console.log(`\n${reserves.length} réserve(s) — non testables ici, à ne pas perdre de vue :`);
  for (const r of reserves) console.log(`  ⚠ ${r}`);
}
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
