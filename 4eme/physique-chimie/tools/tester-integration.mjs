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
// Un désaccord d'interface ne se voit sur aucun des deux côtés. `srs.js` écrit
// `revoirALaSeance` et ses 204 tests passent ; `seance.js` lit `echeance` et ses
// 173 tests passent ; branchés l'un sur l'autre, `echeance` vaut `undefined`,
// `echeanceDue` répond « oui » pour TOUS les pièges, la file est saturée en
// permanence — et `controlerSeance` rend zéro anomalie, parce qu'une file
// saturée est une file parfaitement normale. Aucun test de l'un ni de l'autre ne
// peut voir cela : il faut les deux dans le même processus.
//
// La forme de ce fichier suit donc cette idée : il commence par un ADAPTATEUR,
// qui est la liste des désaccords écrite en code, et chaque traduction que
// l'adaptateur doit faire est comptée. Un adaptateur vide serait la preuve que
// les trois modules s'emboîtent ; celui-ci ne l'est pas, et sa longueur est le
// verdict.
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
  TAILLE_FENETRE,
  TYPES_D_ITEM,
  controlerFenetre,
  controlerSeance,
  genererSeance,
  piegesDusDeLaSeance,
  resumerSeance,
} from '../js/seance.js';

import { graphique, schemaCircuit, schemaParticulaire, tableauDeMesures } from '../js/schema.js';
import { PIEGES } from '../js/data/pieges/index.js';

let passes = 0;
const echecs = [];
const reserves = [];
/** Les traductions que l'adaptateur doit faire : c'est le vrai résultat. */
const traductions = [];

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
const traduction = (champ, texte) => traductions.push({ champ, texte });

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
 * Le profil, à la séance 12.
 *
 * Aucun état n'est écrit à la main : tous passent par les constructeurs de
 * `srs.js`, sans quoi ce fichier testerait sa propre idée de ce qu'est un état.
 */
function profilInitial() {
  const pieges = {};
  for (const p of PIEGES_OUVERTS) {
    // La séance de première rencontre : le rang du chapitre d'origine, décalé
    // pour que les échéances ne tombent pas toutes ensemble.
    const rencontre = 1 + 2 * CHAPITRES.indexOf(p.chapitreOrigine);
    pieges[p.id] = programmerPiege(etatInitialPiege(p), p, rencontre);
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

  return { numeroSeance: 12, pieges, savoirFaire, fenetre: [], dernierPiegeRevise: null };
}

// ════════════════════════════════════════════════════════════════════════════
// 2. L'ADAPTATEUR — les désaccords, écrits en code
// ════════════════════════════════════════════════════════════════════════════
//
// Chaque entrée est une phrase de la forme « le module A appelle ceci comme
// cela, le module B autrement ». Elles sont ici plutôt que dans `seance.js` ou
// dans `srs.js` parce qu'aucun des deux ne peut les prendre seul : les mettre
// d'un côté serait trancher l'arbitrage en douce.

traduction('pieges[].revoirALaSeance → pieges[].echeance',
  '`srs.js` écrit `revoirALaSeance`, `seance.js` lit `echeance`. Sans traduction, `echeance` vaut '
  + '`undefined`, `echeanceDue` répond « due » pour TOUS les pièges, et rien ne le signale.');

traduction('revoirALaSeance: null → (aucune entrée)',
  '`srs.js` dit « pas encore entré dans la file » par `null` ; `seance.js` dit « due » par '
  + '`undefined` et REFUSE la séance entière sur `echeance: null` (`Number.isInteger(null)` est '
  + 'faux). Les deux conventions sont incompatibles : il n\'existe aucune valeur d\'`echeance` qui '
  + 'signifie « pas encore programmé ».');

traduction('pieges[].rencontre (booléen) → pieges[].rencontres (compte)',
  'Deux noms à une lettre près pour deux types différents. `seance.js` teste `rencontres > 0`, '
  + 'ce qui vaut `false` sur `undefined` — donc un piège hors de son chapitre d\'origine est écarté '
  + 'au motif `chapitre-desactive` alors qu\'il a bel et bien été rencontré.');

traduction('savoirFaire[].rencontres — n\'existe nulle part',
  '`seance.js` en dépend pour la dépendance iatrogène des rangs 2 (`savoirFaire[iatrogene].rencontres > 0`). '
  + 'L\'état de savoir-faire de `srs.js` ne porte ni `rencontre` ni `rencontres` : il compte '
  + '`reussites` et `echecs`. Sans traduction, AUCUN piège de rang 2 n\'est jamais servi — huit du catalogue.');

traduction('estMaitrise(...).maitrise → savoirFaire[].acquis',
  '`seance.js` lit un booléen `acquis` pour retirer un savoir-faire du cœur ; `srs.js` rend un '
  + 'verdict `{ maitrise, statut, manque }` et n\'écrit aucun booléen dans l\'état. Il faut aussi '
  + 'lui fournir le savoir-faire lui-même (`{ diagnostic }`), qu\'aucun fichier ne définit.');

traduction('dispositifsServis (id de dispositif) → derniersContextes (id de contexte)',
  '`srs.js` mémorise les DISPOSITIFS servis et les fait tourner en cycle ; `seance.js` évite les '
  + 'CONTEXTES DE SURFACE déjà vus. Les deux règles visent la même chose et ne se lisent pas sur '
  + 'la même clé. Rien n\'écrit jamais `derniersContextes` : sans traduction, la variation de '
  + '`seance.js` est un filtre sur une liste toujours vide.');

/** Le profil `srs.js` traduit en `etatEleve` de `seance.js`. */
function adapter(profilCourant) {
  const pieges = {};
  for (const [id, etat] of Object.entries(profilCourant.pieges)) {
    // Le piège pas encore programmé n'a AUCUNE écriture possible ici : on omet
    // l'entrée, et `seance.js` le lira alors comme dû. C'est le seul des six
    // désaccords que l'adaptateur ne sait pas réparer.
    if (etat.revoirALaSeance === null) continue;
    const servis = new Set(etat.dispositifsServis);
    pieges[id] = {
      echeance: etat.revoirALaSeance,
      rencontres: etat.rencontre ? Math.max(1, etat.reussites + etat.echecs) : 0,
      derniersContextes: dispositifsDeReconfrontation(PIEGES[id])
        .filter((d) => servis.has(d.id))
        .map((d) => d.contexteDeSurface)
        .filter(Boolean),
    };
  }

  const savoirFaire = {};
  for (const [id, etat] of Object.entries(profilCourant.savoirFaire)) {
    savoirFaire[id] = {
      echeance: etat.revoirALaSeance,
      palierServi: etat.palierServi,
      // `diagnostic` est inventé ici, faute de catalogue de savoir-faire : tout
      // savoir-faire portant un piège serait `'type'`, les autres `'absent'`.
      acquis: estMaitrise(etat, { diagnostic: 'type' }).maitrise,
      rencontres: etat.reussites + etat.echecs,
    };
  }

  return {
    numeroSeance: profilCourant.numeroSeance,
    chapitreCourant: CHAPITRE_COURANT,
    chapitresFaits: CHAPITRES,
    vivier: VIVIER,
    savoirFaire,
    pieges,
    fenetre: profilCourant.fenetre,
    dernierPiegeRevise: profilCourant.dernierPiegeRevise,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// 3. Le vivier artificiel — mais des contextes de surface RÉELS
// ════════════════════════════════════════════════════════════════════════════
//
// Les items n'existent pas ; leurs `contexteDeSurface`, si. Les tirer du
// catalogue plutôt que de les inventer est ce qui rend le joint testable : si
// l'item porte `ctx-3` et le catalogue `dissolution-en-systeme-ferme`, les deux
// règles de variation ne se contredisent pas — elles ne se rencontrent jamais.

/** Les champs qu'aucun des trois modules ne définit, et qu'il a fallu inventer
 *  pour que la boucle se referme. Ils sont marqués, et comptés en réserve. */
const CHAMPS_INVENTES = ['classe', 'formatDiagnostique', 'figure', 'dispositifServi'];

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
  // ── au-delà d'ici, rien n'est déclaré par aucun module ──
  classe: o.classe ?? 'A',
  formatDiagnostique: o.formatDiagnostique === true,
  figure: o.figure ?? null,
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
    formatDiagnostique: true,
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

/** Trois items à figure, un par sorte que `schema.js` sait tracer. */
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
];

const VIVIER = [...ITEMS_DE_PIEGE, ...ITEMS_DU_COEUR, ...ITEMS_DU_RITUEL, ...ITEMS_A_FIGURE];

// ════════════════════════════════════════════════════════════════════════════
// 4. Ce que coûte l'absence d'adaptateur — mesuré, pas supposé
// ════════════════════════════════════════════════════════════════════════════

const profil = profilInitial();

// Le profil `srs.js` passé TEL QUEL à `seance.js` : c'est ce qu'écrirait une
// application qui a lu les deux commentaires d'en-tête et les a crus d'accord.
const etatBrut = {
  numeroSeance: profil.numeroSeance,
  chapitreCourant: CHAPITRE_COURANT,
  chapitresFaits: CHAPITRES,
  vivier: VIVIER,
  savoirFaire: profil.savoirFaire,
  pieges: profil.pieges,
  fenetre: [],
  dernierPiegeRevise: null,
};
const etatAdapte = adapter(profil);

const seanceBrute = sansLever('un profil srs.js brut ne fait pas lever seance.js',
  () => genererSeance(etatBrut, 7));
const seanceAdaptee = sansLever('un profil traduit ne fait pas lever seance.js',
  () => genererSeance(etatAdapte, 7));

verifier('le profil brut est ACCEPTÉ par seance.js : aucun champ manquant n\'est détecté',
  seanceBrute?.refus === null);
verifier('… et controlerSeance ne trouve rien à redire : le désaccord est parfaitement silencieux',
  controlerSeance(seanceBrute).length === 0);
verifier('le profil traduit compose lui aussi une séance', seanceAdaptee?.refus === null);

const dusBrut = piegesDusDeLaSeance(etatBrut, PIEGES).file.length;
const dusAdapte = piegesDusDeLaSeance(etatAdapte, PIEGES).file.length;
verifier('… mais la file de pièges du profil brut est plus fournie que celle du profil traduit',
  dusBrut > dusAdapte);

// La signature exacte du désaccord : `retardDe` rend `numeroSeance` quand
// l'échéance manque. Tout piège du profil brut est donc déclaré en retard de
// DOUZE séances — un chiffre qu'aucun écran n'affiche et qu'aucun contrôle ne
// relit, sur un profil dont la moitié des pièges vient d'être programmée.
verifier('… et chaque piège du profil brut est déclaré en retard de la séance entière',
  piegesDusDeLaSeance(etatBrut, PIEGES).file.every((e) => e.retard === etatBrut.numeroSeance));
verifier('… alors qu\'aucun piège du profil traduit ne l\'est',
  piegesDusDeLaSeance(etatAdapte, PIEGES).file.every((e) => e.retard < etatAdapte.numeroSeance));
verifier('… et aucun rang 2 ne figure dans la file brute, faute de `savoirFaire[].rencontres`',
  piegesDusDeLaSeance(etatBrut, PIEGES).file.every((e) => e.piege.rang !== 2));

// Le rang 2 se contrôle plus bas, sur la trajectoire : à la séance 12 aucun
// n'est encore dû (leurs échéances tombent entre 13 et 17), et le tester ici
// dirait « aucun rang 2 » pour une raison de calendrier plutôt que d'interface.

// ════════════════════════════════════════════════════════════════════════════
// 5. Les formes, champ par champ
// ════════════════════════════════════════════════════════════════════════════

// ── 5.1 Ce que `seance.js` lit sur un piège, `data/pieges` l'écrit-il ? ──────
verifier('tout piège du catalogue porte `rang`, `chapitreOrigine` et `rythmeInitial`',
  Object.values(PIEGES).every((p) => [1, 2, 3].includes(p.rang)
    && typeof p.chapitreOrigine === 'string'
    && Number.isInteger(p.rythmeInitial)));
verifier('tout piège de rang 2 porte `iatrogene` — sans quoi seance.js l\'écarte à jamais',
  Object.values(PIEGES).filter((p) => p.rang === 2).every((p) => typeof p.iatrogene === 'string'));
verifier('aucun piège ne porte d\'échéance : le corpus ne porte qu\'un rythme',
  Object.values(PIEGES).every((p) => p.echeance === undefined && p.revoirALaSeance === undefined));

// ── 5.2 Le plafond, lu par les deux modules ─────────────────────────────────
verifier('le plafond du rang 1 est le même des deux côtés (une seule constante)',
  PLAFOND_INTERVALLE[1] === 20 && PLAFOND_INTERVALLE[3] === Infinity);
verifier('aucun rythme initial ne dépasse le plafond de son rang',
  Object.values(PIEGES).every((p) => p.rythmeInitial <= PLAFOND_INTERVALLE[p.rang]));

// ── 5.3 `formatDiagnostique` : un nom, plusieurs types ──────────────────────
const typesDeFormatDiagnostique = new Set(
  Object.values(PIEGES).map((p) => (p.formatDiagnostique === undefined ? 'absent' : typeof p.formatDiagnostique)),
);
verifier('le catalogue lui-même n\'est pas d\'accord sur le type de `formatDiagnostique`',
  typesDeFormatDiagnostique.size > 1);

// ── 5.4 Le contexte de surface : le seul champ que tout le monde nomme pareil ─
const contextesDuCatalogue = new Set(
  Object.values(PIEGES).flatMap((p) => dispositifsDeReconfrontation(p).map((d) => d.contexteDeSurface)),
);
verifier('les contextes de surface des items sont ceux du catalogue, sans traduction',
  ITEMS_DE_PIEGE.every((i) => i.contexteDeSurface === null || contextesDuCatalogue.has(i.contexteDeSurface)));

// ── 5.5 Les types d'item et les fonctions de figure ─────────────────────────
const FIGURES_PAR_TYPE = {
  'schema-circuit': [schemaCircuit],
  'schema-particulaire': [schemaParticulaire],
  lecture: [graphique, tableauDeMesures],
};
verifier('deux types d\'item sur six désignent une figure et une seule',
  TYPES_D_ITEM.filter((t) => FIGURES_PAR_TYPE[t]?.length === 1).length === 2);
verifier('« lecture » en désigne DEUX, et rien sur l\'item ne dit laquelle',
  FIGURES_PAR_TYPE.lecture.length === 2);
verifier('« prediction-engagee » n\'en désigne aucune : son dispositif est dans le catalogue',
  FIGURES_PAR_TYPE['prediction-engagee'] === undefined
  && Object.values(PIEGES).some((p) => (p.constats ?? []).some((c) => c.predictionEngagee)));

// ════════════════════════════════════════════════════════════════════════════
// 6. Le chemin complet — six séances, du tirage à la figure
// ════════════════════════════════════════════════════════════════════════════

/** Une réponse d'élève reproductible : ni date, ni `Math.random`. */
function repondre(unItem, numeroSeance) {
  let h = 2166136261;
  for (const c of `${unItem.id}#${numeroSeance}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const t = ((h >>> 0) % 100) / 100;
  if (unItem.type === 'double-qcm') return issueDuDoubleQcm(t < 0.75, t < 0.55);
  return t < 0.7 ? 'reussite' : 'echec';
}

/** L'aiguillage item → figure. Il n'existe dans aucun module : `schema.js` ne
 *  connaît pas les items, `seance.js` ne connaît pas les figures. */
function rendre(figure) {
  switch (figure.sorte) {
    case 'circuit': return schemaCircuit(figure.circuit, { titre: figure.titre });
    case 'particulaire': return schemaParticulaire(figure.description);
    case 'graphique': return graphique(figure.donnees);
    case 'tableau': return tableauDeMesures(figure.donnees);
    default: return { ok: false, raison: 'SORTE_DE_FIGURE_INCONNUE' };
  }
}

/**
 * Ce que l'application aurait à écrire entre deux séances : servir la séance,
 * lire les réponses, et faire avancer les DEUX SRS.
 *
 * `dispositifServi` est le champ inventé : `seance.js` choisit un item par son
 * contexte de surface, `srs.js` exige un identifiant de dispositif, et rien ne
 * les relie. Ici l'item le porte parce qu'on l'a mis ; dans le corpus réel il
 * faudra que quelqu'un décide qui l'écrit.
 */
function jouerUneSeance(profilCourant, graine) {
  const seance = genererSeance(adapter(profilCourant), graine);
  const anomalies = controlerSeance(seance);

  const pieges = { ...profilCourant.pieges };
  const savoirFaire = { ...profilCourant.savoirFaire };
  const n = profilCourant.numeroSeance;
  const figures = [];

  for (const it of seance.items) {
    const issue = repondre(it, n);

    savoirFaire[it.sfPrincipal] = apresReponseSavoirFaire(
      savoirFaire[it.sfPrincipal] ?? etatInitialSavoirFaire(),
      {
        issue,
        numeroSeance: n,
        palier: it.palier,
        cercle: it.cercle,
        classe: it.classe,
        formatDiagnostique: it.formatDiagnostique,
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

    if (it.figure) figures.push(rendre(it.figure));
  }

  return {
    seance,
    anomalies,
    figures,
    profil: {
      numeroSeance: n + 1,
      pieges,
      savoirFaire,
      fenetre: [...profilCourant.fenetre, resumerSeance(seance)].slice(-TAILLE_FENETRE),
      dernierPiegeRevise: seance.reconfrontation?.piege ?? profilCourant.dernierPiegeRevise,
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
const filesDeLaTrajectoire = trace.map((t) => piegesDusDeLaSeance(adapter(t.profil), PIEGES));
verifier('un piège de rang 2 finit par entrer dans la file, sa dépendance iatrogène levée',
  filesDeLaTrajectoire.some((f) => f.file.some((e) => e.piege.rang === 2)));
verifier('la dépendance d\'Andersson tient : conservation-de-la-masse n\'entre pas dans la file '
  + 'tant que gaz-n-est-pas-de-la-matiere n\'a pas été rencontré',
  trace.every((t) => {
    const etatLu = adapter(t.profil);
    const { ecartes, file } = piegesDusDeLaSeance(etatLu, PIEGES);
    const gazVu = (etatLu.pieges['gaz-n-est-pas-de-la-matiere']?.rencontres ?? 0) > 0;
    return gazVu || (!file.some((e) => e.piege.id === 'conservation-de-la-masse')
      && ecartes.some((e) => e.piege === 'conservation-de-la-masse' && e.motif === 'dependance'));
  }));

// ── 6.1 Le SRS a-t-il vraiment avancé ? ─────────────────────────────────────
const piegesServis = trace.map((t) => t.seance.reconfrontation?.piege).filter(Boolean);
verifier('des pièges ont été servis, et leurs échéances ont bougé',
  piegesServis.length > 0
  && piegesServis.every((id) => courant.pieges[id].revoirALaSeance > profil.pieges[id].revoirALaSeance));
verifier('tout piège servi a bien enregistré sa réponse',
  piegesServis.every((id) => courant.pieges[id].reussites + courant.pieges[id].echecs > 0));
verifier('aucun piège n\'a d\'intervalle au-dessus du plafond de son rang',
  Object.entries(courant.pieges).every(([id, e]) => e.intervalle <= PLAFOND_INTERVALLE[PIEGES[id].rang]));
verifier('aucun état de piège n\'est sorti de la file (pas d\'état absorbant)',
  Object.values(courant.pieges).every((e) => e.revoirALaSeance !== null && Number.isInteger(e.revoirALaSeance)));

// ── 6.2 La fenêtre glissante ────────────────────────────────────────────────
const fenetre = trace.map((t) => resumerSeance(t.seance)).slice(-TAILLE_FENETRE);
const controleFenetre = sansLever('controlerFenetre lit les résumés des séances jouées',
  () => controlerFenetre(fenetre));
verifier('la fenêtre est mesurée à partir de la cinquième séance', controleFenetre?.mesuree === true);
verifier('aucun résumé n\'est hors cadre',
  (controleFenetre?.anomalies ?? []).every((a) => a.code !== 'RESUME_HORS_CADRE'));
verifier('aucun item sans cercle sur la fenêtre',
  (controleFenetre?.anomalies ?? []).every((a) => a.code !== 'SOMME_DES_PARTS'));

// ── 6.3 Les figures rendues ─────────────────────────────────────────────────
const toutesLesFigures = trace.flatMap((t) => t.figures);
verifier('des figures ont été rendues au fil des séances', toutesLesFigures.length > 0);
verifier('toutes sont engendrées sans refus', toutesLesFigures.every((f) => f.ok === true));
verifier('chacune porte un `aria-label` engendré du même objet que le dessin',
  toutesLesFigures.every((f) => typeof f.description === 'string' && f.description.length > 20
    && (!f.html.includes('<svg') || f.html.includes('aria-label='))));
verifier('aucune figure ne référence un fichier image (invariant 6)',
  toutesLesFigures.every((f) => !/<img|xlink:href|url\(/.test(f.html)));

// Les quatre sortes, rendues hors séance pour qu'aucune ne dépende du tirage.
const figuresHorsSeance = [
  schemaCircuit(CIRCUIT_SERIE, { titre: 'Circuit série' }),
  schemaParticulaire(ECHANTILLON),
  graphique(MESURES),
  tableauDeMesures(MESURES),
];
verifier('les quatre fonctions de figure rendent toutes `ok` sur les objets du vivier',
  figuresHorsSeance.every((f) => f.ok === true));

// Le graphique et le tableau prennent LE MÊME objet : ils énoncent donc les
// mêmes couples, et ils refusent les mêmes données. Le second point est le vrai
// contrôle — deux fonctions qui tracent d'accord mais refusent en désaccord
// serviraient à l'élève, dans un registre, la donnée dont l'autre vient
// d'établir qu'elle est fausse.
verifier('le graphique et le tableau énoncent les mêmes couples',
  MESURES.points.every(([x, y]) => figuresHorsSeance[2].description.includes(`${x} ; ${y}`)
    && figuresHorsSeance[3].description.includes(`${x} ; ${y}`)));

const donneesHorsCadre = { ...MESURES, points: [...MESURES.points, [60, 60]] };
verifier('… et refusent le même jeu de données, avec la même raison',
  graphique(donneesHorsCadre).ok === false
  && graphique(donneesHorsCadre).raison === tableauDeMesures(donneesHorsCadre).raison);

// ── 6.4 Le savoir-faire s'acquiert, le piège jamais ─────────────────────────
const verdicts = Object.values(courant.savoirFaire).map((e) => estMaitrise(e, { diagnostic: 'type' }));
verifier('estMaitrise rend un verdict lisible pour chaque savoir-faire du profil',
  verdicts.every((v) => typeof v.maitrise === 'boolean' && Array.isArray(v.manque)));
verifier('un savoir-faire non acquis dit CE QU\'IL LUI MANQUE, jamais un booléen nu',
  verdicts.filter((v) => !v.maitrise).every((v) => v.manque.length > 0));

// ════════════════════════════════════════════════════════════════════════════
// 7. Les deux règles de variation, mises face à face
// ════════════════════════════════════════════════════════════════════════════
//
// `srs.js` décide du dispositif suivant, `seance.js` décide de l'item suivant.
// Personne ne les a présentés l'un à l'autre. On mesure ici de combien ils
// divergent : ce n'est pas un test qui peut échouer, c'est un chiffre à lire.

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

// ════════════════════════════════════════════════════════════════════════════
// Rapport
// ════════════════════════════════════════════════════════════════════════════

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);

console.log('\nLe joint, en chiffres :');
console.log(`  · ${Object.keys(PIEGES).length} pièges au catalogue, ${PIEGES_OUVERTS.length} ouverts par le profil.`);
console.log(`  · file de pièges à la séance 12 — profil brut : ${dusBrut} dus ; profil traduit : ${dusAdapte}.`);
console.log(`  · six séances jouées, ${trace.reduce((s, t) => s + t.seance.items.length, 0)} items servis, `
  + `${piegesServis.length} re-confrontation(s), ${toutesLesFigures.length} figure(s) rendue(s).`);
console.log(`  · variation : ${accords} accord(s) et ${desaccords} désaccord(s) entre `
  + 'le dispositif que srs.js servirait et l\'item que seance.js choisit.');
console.log(`  · coût des séances (dixièmes de minute) : ${trace.map((t) => t.seance.cout.total).join(', ')} `
  + `pour un plafond de ${BUDGET_SEANCE}.`);

console.log(`\n${traductions.length} traduction(s) que l'adaptateur doit faire — chacune est un désaccord :`);
for (const t of traductions) console.log(`  → ${t.champ}\n      ${t.texte}`);

reserve(
  `${CHAMPS_INVENTES.length} champs d'item ont dû être inventés pour que la boucle se referme :\n`
  + `      ${CHAMPS_INVENTES.join(', ')}. Aucun n'est déclaré par seance.js, srs.js ni schema.js,\n`
  + '      et sans eux le chemin s\'arrête : pas de `classe` ⇒ estMaitrise refuse à jamais ; pas de\n'
  + '      `figure` ⇒ schema.js n\'a rien à tracer ; pas de `dispositifServi` ⇒ srs.js ne compte rien.',
);
reserve(
  'aucun catalogue de savoir-faire n\'existe. `estMaitrise` exige `{ diagnostic: \'type\' | \'absent\' }`\n'
  + '      et refuse tout le reste ; ce fichier écrit `\'type\'` partout, ce qui est un choix pris ici\n'
  + '      faute de fichier où le prendre. Les identifiants de savoir-faire ne sont eux non plus\n'
  + '      déclarés nulle part — ils apparaissent dans `iatrogene` et dans `sfPrincipal`, jamais définis.',
);
reserve(
  '`chapitresPourReconfrontation` (srs.js) n\'a aucun appelant et aucune donnée : elle attend\n'
  + '      `porteursPosterieurs`, champ qu\'aucun piège du catalogue ne porte. Le garde-fou de\n'
  + '      l\'interrupteur — déclaré non négociable — n\'est donc branché sur rien.',
);
reserve(
  'la garantie de famine de srs.js (`enFamine`, dans sa `fileDeReconfrontation`) ne s\'applique pas\n'
  + '      à la file que `seance.js` utilise réellement : `piegesDusDeLaSeance` trie sur rang, retard\n'
  + '      et identifiant, sans garde-fou. Le rang 1 servi zéro fois sur cent séances que srs.js\n'
  + '      décrit reste possible par ce chemin-ci.',
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
