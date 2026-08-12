// La construction d'une séance — ce que l'élève voit, dans quel ordre, et ce
// que le moteur REFUSE de composer.
//
// ── Pourquoi ce module existe ───────────────────────────────────────────────
//
// `charte.md` § « Conséquences pour le moteur » l'ouvre par une phrase sans
// détour : le générateur de séance *n'existe pas*. Dans le prototype maths,
// `fileDeRemediation`, `estARevoir` et `tauxAcquis` sont exportés et importés
// nulle part ; la navigation est cadrée par chapitre. Or trois mécanismes
// centraux de cette charte ne vivent que dans une composition inter-chapitres :
// la re-confrontation prise HORS du chapitre en cours, la fenêtre glissante de
// cinq séances, et l'ordre de priorité entre une échéance et une bande.
//
// Ce module est cette composition, et rien d'autre. Il ne fait pas avancer le
// SRS (ni celui des savoir-faire, ni celui des pièges) : il LIT des échéances et
// rend une séance. C'est la séparation qui rend les deux testables séparément.
//
// ── La contrainte de forme, qui vient du site (S) ───────────────────────────
//
// `genererSeance(etatEleve, graine)` est une FONCTION PURE. Ce n'est pas une
// élégance : `tools/simuler-parcours.mjs` rejoue des trajectoires complètes sur
// trois profils déclarés, et sans détermination par la graine, rien de ce qui
// porte sur les séances — l'invariant 13 en entier — n'est vérifiable. Aucune
// date système non plus : le temps se compte en SÉANCES. Un élève qui condense
// deux séances dans la même journée ne doit pas repousser une re-confrontation
// d'un jour ; c'est exactement le mécanisme que la charte déclare non
// négociable.
//
// ── Ce que le module rend, et pourquoi il rend deux choses ──────────────────
//
// Une séance ET le compte rendu de ses arbitrages. Un moteur qui compose en
// silence est invérifiable : l'invariant 13 refuse « un ordre de priorité violé
// — une échéance due reportée au profit d'une bande », et cette phrase ne se
// contrôle sur AUCUNE séance prise isolément. Ce qui la rend décidable, c'est
// que le générateur déclare ce qu'il a sacrifié et pour quel motif. Le contrôle
// lit le motif. Le générateur, lui, n'émet jamais le motif `bande` — mais le
// refus existe pour que la faute reste attrapable le jour où quelqu'un modifie
// la composition sans lire ce commentaire.
//
// ── Le désaccord assumé avec la consigne, écrit plutôt que tranché en douce ──
//
// La commande de ce module disait : « en physique-chimie, palier mélangé et
// reprise du piège sont le même créneau ». C'est la formulation de la VERSION 1
// de la charte, et la version 2 la donne pour fausse — § « Pourquoi les créneaux
// 2 et 3 ont été séparés » — dans les deux sens, chiffres à l'appui :
//
//   · le créneau étant « pris hors du chapitre en cours », le savoir-faire du
//     chapitre courant n'aurait JAMAIS pu être testé au palier 4, donc jamais
//     été acquis tant que le chapitre est en cours, et jamais du tout pour le
//     dernier chapitre de l'année ;
//   · un créneau unique offre ~120 items de palier 4 par an pour ~260 réussites
//     requises (86 savoir-faire × 3). Le budget ne boucle pas.
//
// Ce module suit donc la charte : le palier 4 est servi DANS LE CŒUR, la
// re-confrontation occupe son propre créneau. Fusionner les deux rendrait la
// moitié du corpus inacquérable, et aucun test ne le dirait.

// ── Le vocabulaire d'état est celui de `srs.js`, et il n'y en a qu'un ────────
//
// Ce module LIT des échéances, `srs.js` les FIXE. Les deux ont été écrits en
// parallèle et ont nommé la même chose de deux façons : `revoirALaSeance` chez
// l'auteur, `echeance` chez le lecteur ; `rencontre` chez l'un, `rencontres`
// chez l'autre. Branchés l'un sur l'autre, `echeance` valait `undefined`, tout
// piège était déclaré dû, la file était saturée en permanence — et rien ne le
// disait, parce qu'une file saturée est une file parfaitement normale.
//
// Le profil élève EST donc, champ pour champ, ce que `srs.js` écrit. Ce module
// ne renomme rien et n'invente rien : ce qu'il ne sait pas lire, il le refuse.
import { PIEGES } from './data/pieges/index.js';
import { SAVOIR_FAIRE_PAR_ID } from './data/savoir-faire.js';
import {
  PLAFOND_INTERVALLE,
  comparerPiegesDus,
  dispositifsDeReconfrontation,
  // La famine se MESURE dans `srs.js` et se CONSTATE ici. Réécrire la
  // soustraction serait rouvrir, d'un cran plus bas, la file en double que la
  // réconciliation vient de supprimer.
  ecartReel,
  enFamine,
  estMaitrise,
} from './srs.js';

// ════════════════════════════════════════════════════════════════════════════
// Les constantes de la charte — lues, jamais inventées
// ════════════════════════════════════════════════════════════════════════════

/** Les quatre cercles PARTITIONNENT le contenu : tout item en porte exactement
 *  un. C'est ce qui donne son sens au refus « somme des quatre parts ≠ 1 » —
 *  une somme différente de 1 ne signale pas un arrondi, elle signale un item
 *  sans cercle ou un cercle hors énuméré. */
export const CERCLES = Object.freeze([0, 1, 2, 3]);

/** Les quatre paliers, § « La difficulté croît par variation ». Ils sont ici
 *  parce qu'un item dont le palier n'est pas l'un des quatre n'est servable à
 *  aucun moment : ni en passe 1 (qui compare au palier servi), ni en passe 2
 *  (qui compare de même). Il ne provoquerait aucune erreur — il disparaîtrait. */
const PALIERS = Object.freeze([1, 2, 3, 4]);

/**
 * Les bandes de proportion, en pourcentage entier, § « La proportion cible ».
 *
 * Les planchers somment à 77 et les plafonds à 122 : la cible est atteignable,
 * ce qui n'allait pas de soi et vaut d'être vérifié une fois pour toutes ici.
 *
 * Le cercle 3 — la lecture de dispositif — est PLAFONNÉ ET NON ENCOURAGÉ. Son
 * plancher existe (un savoir-faire de branchement ne s'entraîne pas à zéro
 * item), mais rien dans ce module ne le pousse au-delà : c'est le poste de
 * développement le plus cher du projet et la compétence la moins bien justifiée
 * par la recherche que le dossier invoque. Le plafond est ce qui l'empêche de
 * devenir l'application.
 */
export const BANDES = Object.freeze({
  0: Object.freeze({ plancher: 10, plafond: 20 }), // raisonnement conceptuel et registres
  1: Object.freeze({ plancher: 45, plafond: 60 }), // raisonnement sur données
  2: Object.freeze({ plancher: 12, plafond: 22 }), // contrôle des variables
  3: Object.freeze({ plancher: 10, plafond: 20 }), // geste figuré
});

/**
 * La mesure porte sur CINQ séances, et pas sur une.
 *
 * Une séance porte 8 à 12 items courts : à cette échelle, un item de plus ou de
 * moins déplace une part de dix points et une bande de dix points de large n'a
 * aucun sens. La fenêtre est glissante, le RITUEL EN EST EXCLU — sinon il
 * sature mécaniquement le cercle 1, dont il relève presque entièrement — et la
 * mesure ne mord qu'à partir de la cinquième séance, faute de fenêtre pleine
 * avant.
 */
export const TAILLE_FENETRE = 5;

/**
 * Le coût d'un item, en DIXIÈMES DE MINUTE.
 *
 * En dixièmes, donc en entiers : la contrainte de durée est de premier rang et
 * elle se compare, additionne et refuse ; la faire en flottants, c'est accepter
 * qu'une séance à 15,000000000000002 minutes soit refusée et qu'une autre à
 * 14,999999999999998 passe. Le module `unites.js` refuse les flottants pour la
 * même raison, sur le même projet.
 *
 * La valeur retenue est la BORNE HAUTE de la fourchette de la charte. Estimer
 * au plus bas ferait passer le contrôle sur des séances qui débordent en vrai :
 * ce qui doit être garanti, c'est que ça rentre, pas que ça pourrait rentrer.
 */
export const COUTS = Object.freeze({
  court: 10, //                 QCM, classer, valeur + unité      0,5 à 1 min
  lecture: 15, //               graphique ou tableau              1 à 1,5 min
  'double-qcm': 20, //          réponse + justification           1,5 à 2 min
  'prediction-engagee': 30, //  item à constat                    2 à 3 min
  'schema-particulaire': 30, // à composer                        2 à 3 min
  'schema-circuit': 40, //      à construire                      3 à 4 min
});

export const TYPES_D_ITEM = Object.freeze(Object.keys(COUTS));

/** 15 minutes, contrainte de premier rang. Ce qui ne rentre pas attend la
 *  séance suivante — ce n'est pas une dette, c'est le fonctionnement. */
export const BUDGET_SEANCE = 150;

/** Le rituel du contrôle : 3 à 4 minutes. Le plancher n'est pas décoratif —
 *  un rituel d'un seul item n'installe pas un geste. */
export const BUDGET_RITUEL_MIN = 30;
export const BUDGET_RITUEL_MAX = 40;

/** Le cœur porte 5 à 8 items — le compte est indicatif, c'est la durée qui lie. */
export const COEUR_MIN = 5;
export const COEUR_MAX = 8;

/** L'intervalle d'un piège de rang 1 ne dépasse jamais 20 séances. Ce module ne
 *  FIXE pas les échéances (c'est le SRS des pièges), mais il les lit, et une
 *  échéance au-delà du plafond est signalée en réserve dans le compte rendu
 *  plutôt que subie en silence.
 *
 *  La valeur est LUE dans `srs.js` et non réécrite ici. Les deux fichiers ont été
 *  écrits en parallèle et portaient chacun son 20 : deux constantes égales par
 *  coïncidence, que rien n'obligeait à le rester. Le jour où le plafond bouge
 *  d'un côté, le contrôle de l'autre continue de mesurer contre l'ancien — et il
 *  ne dit rien, puisqu'il mesure toujours quelque chose. */
export const PLAFOND_INTERVALLE_RANG_1 = PLAFOND_INTERVALLE[1];

/**
 * Les motifs recevables pour n'avoir pas servi une échéance due.
 *
 * `duree` est légitime : la durée est priorité 2, au-dessus des bandes.
 * `vivier`, `chapitre-desactive`, `dependance` et `non-programme` disent que le
 * contenu ou la progression ne permettaient pas de servir — ce n'est pas une
 * faute de moteur. `non-programme` est le motif de la convention
 * `revoirALaSeance: null` : le piège attend sa première rencontre, et il le
 * DIT, au lieu de disparaître de la file sans un mot.
 * `bande` est le motif interdit, et c'est tout l'objet de l'énuméré : il rend
 * l'invariant 13 décidable au lieu de le laisser à l'appréciation d'un lecteur.
 */
export const MOTIFS_DE_SACRIFICE = Object.freeze([
  'duree', 'vivier', 'chapitre-desactive', 'dependance', 'non-programme', 'bande',
]);

/**
 * L'ordre de préférence entre cercles, à besoin égal.
 *
 * Le cercle 1 d'abord : c'est ce que l'épreuve pèse le plus et c'est
 * intégralement transposable à l'écrit. Le cercle 3 en dernier, toujours :
 * « plafonné, pas encouragé » n'est pas une intention si rien ne l'exécute.
 */
const ORDRE_DE_PREFERENCE = [1, 0, 2, 3];

/**
 * Les dépendances de PROGRAMMATION entre pièges — celles qui se lisent sur le
 * profil élève et non sur le corpus.
 *
 * `data/pieges/index.js` le dit en toutes lettres et le range en réserve, parce
 * qu'aucun test de contenu ne peut l'atteindre : « la règle à tenir n'est pas
 * chapitre 3 avant chapitre 6, c'est CE PIÈGE-CI rencontré avant celui-là ».
 * C'est ici, et nulle part ailleurs, que la règle a un endroit où s'exécuter.
 *
 * Andersson : pour décider si la masse se conserve, l'élève doit d'abord
 * distinguer ce qui est matériel de ce qui ne l'est pas. Un élève pour qui la
 * fumée ne pèse rien n'a pas les termes du bilan — lui opposer la conservation
 * revient à réfuter une phrase qu'il ne peut pas former.
 */
const DEPENDANCES_ENTRE_PIEGES = Object.freeze([
  Object.freeze({ piege: 'conservation-de-la-masse', apres: 'gaz-n-est-pas-de-la-matiere' }),
]);

// ════════════════════════════════════════════════════════════════════════════
// Le tirage déterministe
// ════════════════════════════════════════════════════════════════════════════

/**
 * Une suite pseudo-aléatoire reproductible, dérivée de la seule graine.
 *
 * `Math.random()` rendrait `genererSeance` non pure et le site (S) inopérant :
 * une séance qui déborde ne serait plus rejouable, donc plus corrigeable. Le
 * générateur est un mulberry32 — cinq lignes, aucune dépendance, et la seule
 * propriété qu'on lui demande est de ne pas dépendre de l'heure qu'il est.
 */
function suiteDepuis(graine) {
  let a = (Number(graine) >>> 0) || 0x9e3779b9;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates sur une COPIE : le vivier appartient à l'appelant. */
function melanger(liste, alea) {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(alea() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// ════════════════════════════════════════════════════════════════════════════
// Lire l'état — et refuser plutôt que deviner
// ════════════════════════════════════════════════════════════════════════════

/**
 * La forme attendue de `etatEleve`. Elle est documentée ici parce qu'elle est
 * le contrat entre ce module, l'application et le simulateur — trois écrivains
 * qui n'ont aucun autre endroit pour se mettre d'accord.
 *
 *   {
 *     numeroSeance,       // entier ≥ 1. Le temps du projet, en séances.
 *     chapitreCourant,    // id du chapitre travaillé dans le cœur
 *     chapitresFaits,     // [id] — l'interrupteur « ton prof l'a fait ? ».
 *                         //   Un chapitre absent de cette liste reste
 *                         //   ACCESSIBLE mais sort du suivi : ni lacune, ni
 *                         //   échéance, ni ligne au panneau parents.
 *     vivier,             // [item] — voir plus bas
 *     savoirFaire,        // { [sfId]: état de savoir-faire de `srs.js` }
 *     pieges,             // { [piegeId]: état de piège de `srs.js` }
 *     fenetre,            // [resume] — les séances précédentes, les plus
 *                         //   récentes en dernier. Voir `resumerSeance`.
 *     dernierPiegeRevise, // id | null — pour ne pas rejouer au palier 4 le
 *                         //   piège d'avant-hier
 *   }
 *
 * Les deux tables de suivi ne sont pas décrites ici champ par champ, et c'est
 * volontaire : elles SONT ce que rendent `etatInitialPiege`,
 * `etatInitialSavoirFaire` et les transitions de `srs.js`. Les redécrire serait
 * rouvrir la porte au désaccord — une deuxième description finit toujours par
 * diverger de la première. Ce module lit, d'un piège :
 * `revoirALaSeance`, `rencontre`, `intervalle`, `echecs`, `dispositifsServis` ;
 * d'un savoir-faire : `revoirALaSeance`, `palierServi`, `rencontres`, et ce que
 * `estMaitrise` réclame.
 *
 *   item = {
 *     id, sfPrincipal, chapitre,
 *     cercle,             // 0 | 1 | 2 | 3, obligatoire
 *     palier,             // 1 | 2 | 3 | 4
 *     type,               // clé de COUTS — c'est LUI qui porte le coût, pas
 *                         //   une durée saisie item par item
 *     piege,              // id de piège | null
 *     rituelDeControle,   // true si l'item est un geste de contrôle (ordre de
 *                         //   grandeur, dimension, vraisemblance) ou un geste
 *                         //   mathématique tiré de la file de révision
 *     contexteDeSurface,  // id de contexte, pour varier les re-confrontations
 *     figure,             // { sorte, … } | null — voir SORTES_PAR_TYPE
 *     estFormatDiagnostique, // true si l'item respecte le `formatDiagnostique`
 *                         //   du piège qu'il porte. Booléen : le format
 *                         //   lui-même est un objet, et il est au catalogue.
 *   }
 */
function lireEtat(etatEleve) {
  const manques = [];
  const e = etatEleve ?? {};

  if (!Number.isInteger(e.numeroSeance) || e.numeroSeance < 1) {
    manques.push('`numeroSeance` doit être un entier ≥ 1 — le temps se compte en séances.');
  }
  if (!Array.isArray(e.vivier) || e.vivier.length === 0) {
    manques.push('`vivier` est vide : il n\'y a rien à composer.');
  }
  if (typeof e.chapitreCourant !== 'string' || !e.chapitreCourant) {
    manques.push('`chapitreCourant` absent : le cœur et la re-confrontation en dépendent tous les deux.');
  }
  if (!Array.isArray(e.chapitresFaits)) {
    manques.push('`chapitresFaits` absent : sans l\'interrupteur, on ne sait pas quel chapitre est suivi.');
  }
  manques.push(...defautsDeSuivi('savoirFaire', e.savoirFaire), ...defautsDeSuiviDePiege(e.pieges));
  if (manques.length) return { ok: false, manques };

  // Un item mal formé n'est pas une donnée manquante, c'est une faute de
  // contenu — et elle est fatale ici : un item sans cercle fait échouer la
  // somme des parts, un type inconnu n'a pas de coût. On refuse la SÉANCE
  // plutôt que d'écarter l'item en douce, sans quoi un corpus fautif produirait
  // des séances plausibles et le défaut resterait invisible.
  const fautifs = e.vivier
    .map((i) => ({ item: i, defaut: defautDeLItem(i) }))
    .filter(({ defaut }) => defaut !== null);
  if (fautifs.length) {
    return {
      ok: false,
      manques: fautifs.slice(0, 5).map(({ item, defaut }) => `item « ${item?.id ?? '?'} » : ${defaut}.`),
    };
  }

  return {
    ok: true,
    etat: {
      numeroSeance: e.numeroSeance,
      chapitreCourant: e.chapitreCourant,
      chapitresFaits: e.chapitresFaits,
      vivier: e.vivier,
      savoirFaire: e.savoirFaire ?? {},
      pieges: e.pieges ?? {},
      fenetre: Array.isArray(e.fenetre) ? e.fenetre : [],
      dernierPiegeRevise: e.dernierPiegeRevise ?? null,
    },
  };
}

const estObjetSimple = (v) => !!v && typeof v === 'object' && !Array.isArray(v);

/**
 * Ce qui manque à un item pour être servable, ou `null` s'il l'est.
 *
 * Les six champs sont exigés parce que leur absence ne produit AUCUNE erreur —
 * elle produit une séance plausible et fausse, ce qui est le seul défaut que ce
 * module n'a aucun moyen de rattraper plus tard :
 *
 *   · `id` est la clé d'unicité du tirage. Deux items sans `id` en partagent
 *     une (`undefined`) : en servir un rend l'autre indisponible, et le cœur se
 *     vide sans un mot ;
 *   · `sfPrincipal` indexe les échéances. Absent, il fait comparer `undefined`
 *     au tri des dettes — le module lève au lieu de refuser ;
 *   · `chapitre` décide de tout : cœur, rituel, re-confrontation hors chapitre.
 *     Absent, l'item n'est candidat à rien et s'évapore ;
 *   · `cercle` porte la mesure des bandes, `type` porte le coût ;
 *   · `palier` décide de la servabilité. Hors des quatre, l'item n'est jamais
 *     servi mais reste compté parmi « ce que le vivier offrait » — et le
 *     contrôle de la fenêtre accuse alors le moteur d'un plancher que le vivier
 *     ne permettait pas de tenir. C'est l'inverse exact de ce que la charte
 *     demande.
 */
const defautDeLItem = (item) => {
  if (!estObjetSimple(item)) return 'ce n\'est pas un item';
  for (const champ of ['id', 'sfPrincipal', 'chapitre']) {
    if (typeof item[champ] !== 'string' || !item[champ]) return `\`${champ}\` absent`;
  }
  if (!CERCLES.includes(item.cercle)) return '`cercle` hors énuméré';
  if (!Object.hasOwn(COUTS, item.type)) return '`type` sans coût déclaré';
  if (!PALIERS.includes(item.palier)) return '`palier` hors énuméré';
  return defautDeLaFigure(item);
};

/**
 * Quelles figures chaque type d'item désigne — et pourquoi ce n'est pas une
 * simple table de correspondance.
 *
 * Trois des six types appellent une figure, et l'un des trois en désigne DEUX :
 * « lecture » couvre le graphique et le tableau de mesures, que `schema.js` sait
 * tracer tous les deux et qui coûtent la même chose (1 à 1,5 min dans la table
 * de la charte). Scinder le type en deux aurait dédoublé une ligne de `COUTS`
 * pour une distinction qui n'a aucun effet sur la durée ; c'est donc L'ITEM qui
 * dit laquelle des deux figures il porte, par `figure.sorte`.
 *
 * Sans ce champ, rien sur l'item ne permettait de choisir la fonction de tracé :
 * l'aiguillage tombait sur l'appelant, qui n'a pas de règle pour le faire, et
 * un item de lecture pouvait être servi en graphique ou en tableau selon
 * l'humeur de l'écrivain d'application. Deux registres différents pour un même
 * énoncé, sur la matière dont le diagnostic sépare précisément les registres.
 *
 * L'énuméré des sortes est celui de `schema.js` — quatre fonctions, quatre
 * sortes — et `tools/tester-integration.mjs` vérifie que les deux listes n'ont
 * pas divergé. Il n'est pas IMPORTÉ : composer une séance ne demande pas de
 * savoir dessiner, et ce module n'a aucune raison de tirer le tracé de circuit
 * dans le navigateur pour valider un champ.
 */
export const SORTES_PAR_TYPE = Object.freeze({
  lecture: Object.freeze(['graphique', 'tableau']),
  'schema-circuit': Object.freeze(['circuit']),
  'schema-particulaire': Object.freeze(['particulaire']),
});

const defautDeLaFigure = (item) => {
  const sortes = SORTES_PAR_TYPE[item.type];
  if (!sortes) {
    // Un type qui n'appelle aucune figure n'en porte pas : une figure servie
    // sur un QCM court est un dessin que personne n'affichera, ou pire, un
    // dessin affiché là où l'énoncé n'en parle pas.
    return item.figure === undefined || item.figure === null
      ? null
      : `\`figure\` sur un item de type « ${item.type} », qui n'en désigne aucune`;
  }
  if (!estObjetSimple(item.figure)) {
    return `type « ${item.type} » sans \`figure\` : ${sortes.length > 1 ? 'deux sortes' : 'une sorte'} `
      + `possible(s) (${sortes.join(', ')}), et rien ne dit laquelle`;
  }
  if (!sortes.includes(item.figure.sorte)) {
    return `\`figure.sorte\` « ${item.figure.sorte} » hors des sortes du type « ${item.type} » (${sortes.join(', ')})`;
  }
  return null;
};

/**
 * Les défauts d'une table de suivi — `savoirFaire` ou `pieges`.
 *
 * Une échéance qui n'est pas un entier de séance était lue « pas due » :
 * `'plus tard' <= 7` est faux, comme l'est toute comparaison avec `NaN`. Un
 * profil corrompu faisait donc TAIRE une dette, silencieusement, et l'invariant
 * 13 ne pouvait rien voir — il ne contrôle que les échéances qu'on lui déclare.
 * Le temps se compte en séances : ce qui n'est pas un entier de séance n'est
 * pas une échéance.
 *
 * `null` est la seule non-échéance admise, et elle a un sens précis, écrit dans
 * `etatInitialPiege` : « pas encore dans la file ». Tout le reste est refusé.
 */
const defautsDeSuivi = (nom, table) => {
  if (table === undefined || table === null) return [];
  if (!estObjetSimple(table)) return [`\`${nom}\` doit être un objet indexé par identifiant.`];
  const defauts = [];
  for (const [cle, suivi] of Object.entries(table)) {
    if (!estObjetSimple(suivi)) {
      defauts.push(`\`${nom}.${cle}\` n'est pas un état de suivi.`);
    } else if (suivi.revoirALaSeance !== undefined
      && suivi.revoirALaSeance !== null
      && !Number.isInteger(suivi.revoirALaSeance)) {
      defauts.push(
        `\`${nom}.${cle}.revoirALaSeance\` doit être un entier de séance ou \`null\` `
        + `(« pas encore dans la file ») : « ${suivi.revoirALaSeance} » n'est ni l'un ni l'autre.`,
      );
    }
  }
  return defauts;
};

/**
 * Ce qu'un état de piège doit porter EN PLUS — et pourquoi le contrôle est ici.
 *
 * Deux exigences, et chacune répare un silence :
 *
 *  · `revoirALaSeance` et `rencontre` varient ENSEMBLE. `null` avec
 *    `rencontre: true` dirait « rencontré mais jamais programmé », état que
 *    `programmerPiege` ne peut pas produire et que ce module lirait « pas dû » —
 *    un piège rencontré qui ne revient jamais, sans une ligne de journal. Un
 *    entier avec `rencontre: false` dirait l'inverse et ferait écarter le piège
 *    au motif `chapitre-desactive` alors que son échéance est posée ;
 *  · `intervalle` et `echecs` sont exigés dès que le piège est dans la file,
 *    parce que le comparateur de `srs.js` les LIT. Sans `intervalle`, l'écart
 *    réel vaut `NaN`, `NaN > 20` est faux, et le garde-fou de famine — le seul
 *    qui empêche un rang 1 de rester éternellement deuxième — s'éteint sans
 *    rien dire. C'est le mode de panne que `srs.js` documente sur vingt lignes,
 *    reproduit par une table de suivi incomplète.
 */
const defautsDeSuiviDePiege = (table) => {
  const defauts = defautsDeSuivi('pieges', table);
  if (defauts.length || !estObjetSimple(table)) return defauts;

  for (const [cle, suivi] of Object.entries(table)) {
    const programme = Number.isInteger(suivi.revoirALaSeance);
    if (programme !== (suivi.rencontre === true)) {
      defauts.push(
        `\`pieges.${cle}\` : \`revoirALaSeance\` ${programme ? 'est posée' : 'vaut null'} et `
        + `\`rencontre\` vaut ${suivi.rencontre === true}. Les deux champs disent la même chose — `
        + 'l\'entrée dans la file — et `programmerPiege` les écrit ensemble.',
      );
      continue;
    }
    if (!programme) continue;
    for (const champ of ['intervalle', 'echecs']) {
      if (!Number.isInteger(suivi[champ])) {
        defauts.push(
          `\`pieges.${cle}.${champ}\` absent ou non entier : le comparateur de \`srs.js\` le lit, `
          + 'et sans lui le garde-fou de famine s\'éteint en silence.',
        );
      }
    }
  }
  return defauts;
};

/**
 * Une préférence de tirage qui CÈDE — le seul régime admis ici.
 *
 * Les contraintes de variation de la charte portent sur le décor et le format,
 * jamais sur l'échéance : « mieux vaut une re-confrontation dans un décor déjà
 * vu qu'une échéance reportée ». Une préférence qui refuserait au lieu de céder
 * remonterait la variation au-dessus de la dette, c'est-à-dire au-dessus du
 * premier rang de l'ordre de priorité.
 */
const preferer = (liste, garder) => {
  const retenus = liste.filter(garder);
  return retenus.length ? retenus : liste;
};

/** Le coût d'un item, en dixièmes de minute. */
export const coutItem = (item) => COUTS[item?.type] ?? 0;

/** Le coût d'une liste d'items. */
export const coutDe = (items) => items.reduce((somme, item) => somme + coutItem(item), 0);

// ════════════════════════════════════════════════════════════════════════════
// Les bandes — une cible, jamais une dette
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les parts des quatre cercles sur une liste d'items.
 *
 * `sansCercle` est compté à part et n'est pas une curiosité : c'est le seul
 * symptôme observable de l'item qui n'appartient à aucun cercle, celui que la
 * version 1 de la charte laissait passer par quinzaines. Une somme des quatre
 * parts différente de 1 ne se produit pas autrement.
 */
export function partsParCercle(items) {
  const compte = { 0: 0, 1: 0, 2: 0, 3: 0 };
  let sansCercle = 0;
  for (const item of items) {
    if (CERCLES.includes(item?.cercle)) compte[item.cercle] += 1;
    else sansCercle += 1;
  }
  return { compte, total: items.length, sansCercle };
}

/** Comparaisons de parts en entiers — voir `COUTS` pour le motif. */
const depasseLePlafond = (compte, total, cercle) => 100 * compte > BANDES[cercle].plafond * total;
const sousLePlancher = (compte, total, cercle) => 100 * compte < BANDES[cercle].plancher * total;

/**
 * Combien d'items du cercle il faudrait ÉCHANGER pour tenir le plancher.
 *
 * Un échange, pas un ajout : le total de la fenêtre est ce qu'il est, et la
 * question posée par l'invariant 13 est « le vivier permettait-il de le
 * tenir ? », c'est-à-dire « y avait-il, dans le vivier, des items de ce cercle
 * que le moteur aurait pu prendre à la place d'autres ? ».
 */
const manqueAuPlancher = (compte, total, cercle) =>
  Math.max(0, Math.ceil((BANDES[cercle].plancher * total - 100 * compte) / 100));

/**
 * Combien d'items d'un cercle son plafond autorise sur une fenêtre de `total`
 * items — au moins un.
 *
 * `Math.floor(plafond × total / 100)` est le plafond STRICT, réécrit en items :
 * `compte ≤ floor(plafond × total / 100)` et `100 × compte ≤ plafond × total`
 * disent la même chose sur des entiers. Le `Math.max(1, …)` ne s'applique donc
 * que là où le plafond n'autorise pas même un item — c'est-à-dire sur une
 * fenêtre trop petite pour en porter un, où la proportion n'a pas encore de
 * sens.
 *
 * Sans ce plancher d'un item, le premier item d'une séance est refusé QUEL QUE
 * SOIT son cercle : un item sur un est 100 % de la fenêtre, et 100 % dépasse
 * les quatre plafonds. Le cœur restait alors vide sur un vivier riche, et la
 * bande — priorité 3, « qui cède en dernier » — l'emportait sur la séance
 * entière. La charte demande l'inverse : l'écart de bande est JOURNALISÉ, il
 * n'est pas opposé à la composition. Le refus, lui, reste entier au contrôle de
 * la fenêtre, où la comparaison stricte s'applique sur cinq séances pleines.
 */
const plafondEnItems = (total, cercle) =>
  Math.max(1, Math.floor((BANDES[cercle].plafond * total) / 100));

/**
 * Le cercle à servir en priorité, l'item choisi étant tiré parmi les candidats
 * de ce cercle.
 *
 * Trois règles, dans cet ordre :
 *   1. tout cercle dont l'ajout ferait DÉPASSER son plafond est écarté — les
 *      plafonds lient toujours, y compris quand il ne reste plus rien d'autre ;
 *   2. les cercles sous leur plancher passent devant, du déficit le plus grand
 *      au plus petit ;
 *   3. à égalité, `ORDRE_DE_PREFERENCE`.
 *
 * Rend `null` si tout candidat crèverait un plafond : l'appelant s'arrête et
 * journalise. Servir quand même serait exactement l'inverse de ce que la charte
 * demande — la bande est une cible, mais le plafond, lui, est une limite.
 */
function cercleAServir(candidats, projection) {
  const disponibles = new Set(candidats.map((i) => i.cercle));
  const { compte, total } = projection;

  const admis = [...disponibles].filter(
    (c) => compte[c] + 1 <= plafondEnItems(total + 1, c),
  );
  if (!admis.length) return null;

  admis.sort((a, b) => {
    const da = sousLePlancher(compte[a], total, a) ? manqueAuPlancher(compte[a], total, a) : 0;
    const db = sousLePlancher(compte[b], total, b) ? manqueAuPlancher(compte[b], total, b) : 0;
    if (da !== db) return db - da;
    return ORDRE_DE_PREFERENCE.indexOf(a) - ORDRE_DE_PREFERENCE.indexOf(b);
  });
  return admis[0];
}

/** L'état de la fenêtre glissante, séance courante comprise. */
function projeter(fenetre, itemsDeLaSeance) {
  const recentes = fenetre.slice(-(TAILLE_FENETRE - 1));
  const compte = { 0: 0, 1: 0, 2: 0, 3: 0 };
  let total = 0;
  for (const resume of recentes) {
    for (const c of CERCLES) compte[c] += resume?.parCercle?.[c] ?? 0;
    total += resume?.total ?? 0;
  }
  for (const item of itemsDeLaSeance) {
    if (CERCLES.includes(item.cercle)) compte[item.cercle] += 1;
    total += 1;
  }
  return { compte, total, seancesDansLaFenetre: recentes.length + 1 };
}

// ════════════════════════════════════════════════════════════════════════════
// Les échéances — la dette, qui gagne toujours contre la cible
// ════════════════════════════════════════════════════════════════════════════

/**
 * Un savoir-faire jamais vu est dû, comme dans le SRS des maths : sans quoi
 * rien n'entrerait jamais dans la file. C'est le sens exact de
 * `estARevoirSavoirFaire` dans `srs.js`, et de son état initial, qui pose
 * `revoirALaSeance: 0`.
 *
 * ⚠ Sa première branche — « pas d'échéance lisible ⇒ dû » — vaut pour les
 * SAVOIR-FAIRE et pour eux seuls. Un piège sans échéance n'est pas dû, il n'est
 * pas dans la file : `piegesDusDeLaSeance` établit `piegeProgramme` AVANT
 * d'appeler ce prédicat, qui s'y réduit alors à la comparaison des séances. Les
 * deux règles sont opposées et chacune a sa raison : un savoir-faire doit entrer
 * dans la rotation, une conception doit d'abord avoir été rencontrée.
 */
const echeanceDue = (etatSuivi, numeroSeance) =>
  !Number.isInteger(etatSuivi?.revoirALaSeance) || etatSuivi.revoirALaSeance <= numeroSeance;

const retardDe = (etatSuivi, numeroSeance) =>
  (Number.isInteger(etatSuivi?.revoirALaSeance) ? numeroSeance - etatSuivi.revoirALaSeance : numeroSeance);

/** Le piège est-il entré dans la file ? Voir `etatInitialPiege` : `null` veut
 *  dire « pas encore », et c'est `programmerPiege` qui fait l'entrée. */
const piegeProgramme = (suivi) => Number.isInteger(suivi?.revoirALaSeance);

/**
 * Quels pièges sont dus À CETTE SÉANCE, et pourquoi les autres ne le sont pas.
 *
 * ⚠ Le nom : cette fonction s'appelait `fileDeReconfrontation`, et `srs.js`
 * exporte une fonction du même nom. Les deux ont été écrites en parallèle, sans
 * se voir, et elles ne prennent ni les mêmes arguments ni le même sens — celle
 * de `srs.js` prend `[{ piege, etat }]` et porte le garde-fou de famine, celle-ci
 * prend le profil élève entier et arbitre les dépendances. Un appelant qui
 * importait les deux ne compilait pas : « Identifier 'fileDeReconfrontation' has
 * already been declared ». Le nom d'ici a cédé, parce que `srs.js` est le module
 * qui TIENT la file, tandis que celui-ci ne fait qu'y puiser pour une séance.
 *
 * Les écartés sont rendus AVEC leur motif, et c'est la moitié de l'intérêt de
 * la fonction : « ce piège n'est pas passé » n'est pas une information, « ce
 * piège n'est pas passé parce que son savoir-faire producteur n'a pas encore
 * été servi » en est une.
 *
 * L'ordre est rang 1, puis rang 2, puis rang 3. La charte budgète cinq
 * re-confrontations par an pour un rang 1, trois pour un rang 2, ZÉRO pour un
 * rang 3 : le rang 3 n'est donc pas interdit de créneau — il porte un rythme
 * comme les autres — il est simplement toujours dernier, ce qui produit le
 * budget voulu sans avoir à refuser un piège que le contenu programme.
 *
 * ⚠ Mais l'ordre lui-même n'est PAS écrit ici : il est importé de `srs.js`
 * (`comparerPiegesDus`). Ce module portait le sien — rang, retard, identifiant —
 * et il ordonnait presque comme l'autre : le retard décroissant et l'échéance
 * croissante sont la même chose. Presque. Il lui manquait le garde-fou de
 * famine, et « presque » suffit à rouvrir le mode de panne que `srs.js`
 * documente sur vingt lignes — un rang 1 dû à chaque séance, jamais servi, parce
 * que toujours deuxième. Deux tris qui ordonnent presque pareil sont pires
 * qu'un seul : la simulation qui vérifie l'un ne dit rien de l'autre, et c'est
 * l'autre qui tourne.
 */
export function piegesDusDeLaSeance(etat, catalogue = PIEGES) {
  const file = [];
  const ecartes = [];

  for (const piege of Object.values(catalogue)) {
    const suivi = etat.pieges[piege.id];
    const chapitreOuvert = etat.chapitresFaits.includes(piege.chapitreOrigine);

    // Un piège dont le chapitre d'origine n'a pas été fait n'a pas été
    // rencontré : le re-confronter serait une première rencontre déguisée en
    // révision. Sauf si l'état dit le contraire — un piège peut avoir été
    // rencontré ailleurs que dans son chapitre d'origine.
    if (!chapitreOuvert && suivi?.rencontre !== true) {
      ecartes.push({ piege: piege.id, motif: 'chapitre-desactive', detail: piege.chapitreOrigine });
      continue;
    }

    // Chapitre fait, piège jamais rencontré : `revoirALaSeance` vaut `null` (ou
    // le profil ne porte pas encore d'entrée). Il n'est pas dû — il n'est pas
    // dans la file — et il le DIT. C'est la moitié qui manquait à la
    // convention : lu comme « dû », ce piège saturait la file de tout ce que la
    // progression n'avait pas encore introduit ; lu comme « pas dû » sans être
    // écrit nulle part, il aurait disparu du même silence, par l'autre bord.
    if (!piegeProgramme(suivi)) {
      ecartes.push({
        piege: piege.id,
        motif: 'non-programme',
        detail: 'chapitre fait, piège jamais rencontré : `programmerPiege` ne l\'a pas encore fait entrer dans la file',
      });
      continue;
    }

    if (!echeanceDue(suivi, etat.numeroSeance)) continue;

    // Rang 2 : la conception que NOUS fabriquons. Elle n'existe pas avant le
    // savoir-faire qui la produit — la programmer avant, c'est réfuter une
    // croyance que l'élève n'a pas encore, et lui en donner l'idée.
    if (piege.rang === 2) {
      if (!piege.iatrogene) {
        ecartes.push({ piege: piege.id, motif: 'dependance', detail: 'rang 2 sans `iatrogene` déclaré' });
        continue;
      }
      if (!(etat.savoirFaire[piege.iatrogene]?.rencontres > 0)) {
        ecartes.push({ piege: piege.id, motif: 'dependance', detail: `attend ${piege.iatrogene}` });
        continue;
      }
    }

    const dependance = DEPENDANCES_ENTRE_PIEGES.find((d) => d.piege === piege.id);
    if (dependance && etat.pieges[dependance.apres]?.rencontre !== true) {
      ecartes.push({ piege: piege.id, motif: 'dependance', detail: `attend ${dependance.apres}` });
      continue;
    }

    // `etat` est porté dans l'entrée parce que c'est ce que le comparateur de
    // `srs.js` lit ; `retard` reste, parce que c'est ce que le compte rendu
    // affiche. La donnée est la même, dite deux fois pour deux usages.
    file.push({ piege, etat: suivi, retard: retardDe(suivi, etat.numeroSeance) });
  }

  // Le tri est total et ne dépend que des données : deux exécutions sur le même
  // état rendent la même file. L'identifiant tranche les ex æquo — c'est
  // arbitraire, mais c'est reproductible, et c'est ce qu'on demande ici.
  file.sort(comparerPiegesDus(etat.numeroSeance));

  return { file, ecartes };
}

// ════════════════════════════════════════════════════════════════════════════
// Les trois temps
// ════════════════════════════════════════════════════════════════════════════

/**
 * ① Le rituel du contrôle — 3 à 4 minutes, en tête de séance.
 *
 * Pas des automatismes de calcul : le GESTE DE CONTRÔLE, qui est précisément ce
 * que le diagnostic désigne comme manquant. Ordre de grandeur, cohérence
 * dimensionnelle, vraisemblance d'une lecture — plus les gestes mathématiques
 * que le chapitre en cours exige, tirés de la file de révision.
 *
 * Aucune bande n'intervient ici, et c'est voulu : le rituel est EXCLU de la
 * fenêtre de mesure. L'y faire participer reviendrait à composer selon une
 * proportion qu'on ne mesure pas.
 */
function composerRituel(etat, alea) {
  const candidats = etat.vivier.filter(
    (i) => i.rituelDeControle === true && etat.chapitresFaits.includes(i.chapitre),
  );
  // Les gestes dus d'abord : le rituel est aussi le lieu où l'on détecte
  // l'élève sans le socle mathématique de 4e, et un geste dû non servi est une
  // échéance manquée comme une autre.
  const dus = melanger(
    candidats.filter((i) => echeanceDue(etat.savoirFaire[i.sfPrincipal], etat.numeroSeance)),
    alea,
  );
  const autres = melanger(
    candidats.filter((i) => !echeanceDue(etat.savoirFaire[i.sfPrincipal], etat.numeroSeance)),
    alea,
  );

  const retenus = [];
  let cout = 0;
  for (const item of [...dus, ...autres]) {
    if (cout + coutItem(item) > BUDGET_RITUEL_MAX) continue;
    retenus.push(item);
    cout += coutItem(item);
    if (cout >= BUDGET_RITUEL_MIN) break;
  }
  return { items: retenus, cout };
}

/**
 * ③ La re-confrontation — un piège déjà rencontré, PRIS HORS DU CHAPITRE EN
 * COURS.
 *
 * Composée AVANT le cœur bien qu'elle vienne en dernier dans la séance, parce
 * que l'ordre de composition est l'ordre de PRIORITÉ et non l'ordre d'affichage.
 * Une échéance de piège placée après le remplissage du cœur se ferait manger par
 * la durée au profit d'items choisis pour une bande : ce serait exactement
 * l'ordre de priorité violé que l'invariant 13 refuse. Réserver son coût
 * d'abord, c'est rendre la faute impossible par construction plutôt que la
 * détecter après coup.
 *
 * Le garde-fou de l'interrupteur est ici : la re-confrontation d'un rang 1 ne
 * peut pas dépendre d'un chapitre désactivé. Si les chapitres postérieurs qui la
 * portent sont tous répondus « pas encore », on tire dans un chapitre actif —
 * sans ce garde-fou, le mécanisme que la charte déclare non négociable
 * disparaîtrait en silence, et seul le profil « pas encore partout » du site (S)
 * s'en apercevrait.
 *
 * En revanche on ne prend JAMAIS dans le chapitre courant : là, tout est
 * étiqueté par le chapitre, et le piège se reconnaît sans être reconnu. Faute de
 * candidat hors chapitre, le créneau est vide et le dit.
 */
function composerReconfrontation(etat, budget, alea, catalogue) {
  const { file, ecartes } = piegesDusDeLaSeance(etat, catalogue);
  const sacrifices = ecartes.map((e) => ({ quoi: e.piege, type: 'piege', ...e }));

  for (const { piege } of file) {
    // `rituelDeControle !== true` comme dans le cœur, et pour la même raison,
    // à laquelle s'en ajoute une propre à ce créneau : un item de rituel
    // porteur d'un piège dû était pris ICI ET LÀ. Il figurait deux fois dans la
    // séance, son coût était compté deux fois, et — le pire — il entrait dans
    // `itemsMesures`, c'est-à-dire dans la mesure des bandes, alors que « les
    // items du rituel en sont exclus ». Le rituel saturant le cercle 1, c'est
    // exactement la contamination que l'exclusion existe pour empêcher.
    const portes = etat.vivier.filter((i) => i.piege === piege.id
      && i.rituelDeControle !== true
      && i.chapitre !== etat.chapitreCourant
      && etat.chapitresFaits.includes(i.chapitre));

    if (!portes.length) {
      sacrifices.push({
        quoi: piege.id,
        type: 'piege',
        motif: 'vivier',
        detail: 'aucun item hors du chapitre en cours dans un chapitre suivi',
      });
      continue;
    }

    const abordables = portes.filter((i) => coutItem(i) <= budget);
    if (!abordables.length) {
      sacrifices.push({ quoi: piege.id, type: 'piege', motif: 'duree', detail: 'budget épuisé' });
      continue;
    }

    // Ce qui revient est VARIÉ, sinon la re-confrontation dégénère en test de
    // mémoire : on évite les contextes de surface déjà servis pour ce piège. La
    // préférence cède si le vivier ne l'autorise pas — mieux vaut une
    // re-confrontation dans un décor déjà vu qu'une échéance reportée.
    //
    // ⚠ Les contextes vus ne sont pas un champ de plus dans le profil : ils se
    // DÉDUISENT des dispositifs que `srs.js` a enregistrés. Ce module lisait
    // `derniersContextes`, que rien n'écrivait jamais — la variation était donc
    // un filtre sur une liste toujours vide, c'est-à-dire aucune variation, et
    // aucun test ne pouvait le voir puisque le filtre s'appliquait bel et bien.
    // Un état écrit par un module et lu par un autre sous un autre nom est un
    // état que personne n'écrit.
    const suivi = etat.pieges[piege.id];
    const vus = contextesDejaServis(piege, suivi);
    const neufs = abordables.filter((i) => !vus.includes(i.contexteDeSurface));

    // ⚠ Et la contrainte du juste/faux, qui n'avait AUCUN lecteur.
    //
    // « Une réponse juste assortie d'une mauvaise justification reprogramme le
    // piège de conception, avec la contrainte que LA FOIS SUIVANTE serve un item
    // de format ou de contexte différent. » `srs.js` pose `formatDifferentExige`
    // sur le juste/faux depuis deux passes, en le commentant « lu par le
    // générateur au tirage suivant » — et ce générateur ne l'a jamais lu. Le
    // filtre de contexte ci-dessus ne la couvrait qu'en apparence : il se lit
    // sur `dispositifsServis`, que l'appelant n'est PAS tenu de renseigner, et
    // il retombe à vide dès que le cycle des dispositifs se referme. Dans les
    // deux cas, le même item pouvait revenir à l'identique, ce qui est
    // exactement le « test de mémoire » que la variation existe pour empêcher.
    const contraint = suivi?.formatDifferentExige === true && estObjetSimple(suivi.dernierServi);
    const choix = melanger(
      contraint
        ? preferer(neufs.length ? neufs : abordables, (i) => i.type !== suivi.dernierServi.type
          || i.contexteDeSurface !== suivi.dernierServi.contexteDeSurface)
        : (neufs.length ? neufs : abordables),
      alea,
    )[0];

    return {
      item: choix,
      piege: piege.id,
      contexteDejaVu: !neufs.length,
      // Ce que la contrainte a obtenu, dit plutôt que supposé : une contrainte
      // qui cède en silence est une contrainte dont on croit qu'elle tient.
      formatDifferentExige: contraint,
      formatIdentiqueMalgreTout: contraint
        && choix?.type === suivi.dernierServi.type
        && choix?.contexteDeSurface === suivi.dernierServi.contexteDeSurface,
      sacrifices,
      // Le SRS des pièges n'est pas ici, mais son plafond se LIT : une échéance
      // de rang 1 posée au-delà de vingt séances est un défaut, et le taire
      // reviendrait à laisser un piège de rang 1 sortir de la file pour l'année.
      reserves: intervalleHorsPlafond(etat, file, catalogue),
    };
  }

  return { item: null, piege: null, sacrifices, reserves: intervalleHorsPlafond(etat, file, catalogue) };
}

/**
 * Les contextes de surface déjà servis pour ce piège.
 *
 * `srs.js` mémorise les DISPOSITIFS servis (`dispositifsServis`) et les fait
 * tourner en cycle ; ce module raisonne en contextes de surface, parce que
 * c'est ce que l'item porte. Les deux règles visent la même chose — ne pas
 * resservir le même décor — et elles se lisent maintenant sur la même donnée :
 * celle que `srs.js` écrit, traduite par la table du catalogue, jamais recopiée
 * dans le profil.
 */
function contextesDejaServis(piege, suivi) {
  const servis = new Set(suivi?.dispositifsServis ?? []);
  if (servis.size === 0) return [];
  return dispositifsDeReconfrontation(piege)
    .filter((d) => servis.has(d.id))
    .map((d) => d.contexteDeSurface)
    .filter(Boolean);
}

function intervalleHorsPlafond(etat, file, catalogue) {
  // ── La famine, DITE ────────────────────────────────────────────────────────
  //
  // `srs.js` la mesure et le comparateur la fait remonter dans la file — mais
  // remonter ne suffit pas quand le créneau est unique. Chez l'élève qui échoue,
  // la file de rang 1 sature les cent séances de l'année ; le rang ne se
  // réordonne jamais entre rangs, délibérément (« un rang 2 affamé ne passe pas
  // devant un rang 1 dû ») ; et les pièges de rang 2 reçoivent alors ZÉRO
  // re-confrontation sur l'année là où la charte en budgète trois. Rien ne le
  // disait : ils ne sont pas écartés — ils sont dans la file, simplement jamais
  // premiers, donc absents des `sacrifices` comme des réserves. C'est le mode de
  // panne que `srs.js` documente pour le rang 1, déplacé d'un rang.
  const affames = file
    .filter((e) => enFamine(e, etat.numeroSeance))
    .map((e) => ({
      code: 'PIEGE_EN_FAMINE',
      piege: e.piege.id,
      message: `« ${e.piege.id} » (rang ${e.piege.rang}) n'a pas été re-confronté depuis `
        + `${ecartReel(e.etat, etat.numeroSeance)} séances, pour un plafond de `
        + `${PLAFOND_INTERVALLE[e.piege.rang]}. Il est dans la file et n'en sort pas : le créneau `
        + 'est unique et un rang inférieur passe toujours devant.',
    }));

  return affames.concat(Object.values(catalogue)
    .filter((p) => p.rang === 1)
    .filter((p) => {
      const e = etat.pieges[p.id]?.revoirALaSeance;
      return Number.isInteger(e) && e - etat.numeroSeance > PLAFOND_INTERVALLE_RANG_1;
    })
    .map((p) => ({
      code: 'INTERVALLE_RANG_1_HORS_PLAFOND',
      piege: p.id,
      message: `Échéance à ${etat.pieges[p.id].revoirALaSeance} — plus de ${PLAFOND_INTERVALLE_RANG_1} séances. `
        + 'Une réussite n\'éteint jamais un piège : elle allonge l\'intervalle jusqu\'au plafond, et rien de plus.',
    }))
    .concat(file.length === 0 ? [{ code: 'FILE_DE_PIEGES_VIDE', message: 'Aucun piège dû ce jour.' }] : []));
}

/**
 * ② Le cœur — le savoir-faire du moment, gradué par paliers, PALIER 4 COMPRIS.
 *
 * Deux passes, et leur ordre EST l'ordre de priorité de la charte :
 *
 *   passe 1 — les dettes. Les savoir-faire du chapitre courant dont l'échéance
 *     est due, du plus en retard au moins. Aucune bande ne les filtre : « quand
 *     une échéance est due et qu'elle contredit une bande, l'échéance gagne ».
 *     Seule la durée peut les écarter, et c'est journalisé comme tel.
 *
 *   passe 2 — la cible. On complète jusqu'à COEUR_MIN..COEUR_MAX en suivant les
 *     bandes sur la fenêtre glissante. C'est là, et seulement là, que la
 *     proportion décide.
 *
 * Entre les deux, le palier 4 : dès qu'un savoir-faire y est monté, le cœur en
 * porte au moins un item. C'est la conséquence directe de la séparation des
 * créneaux 2 et 3 — sans cette ligne, le savoir-faire du chapitre en cours ne
 * verrait jamais le palier non étiqueté, donc ne serait jamais acquis.
 */
function composerCoeur(etat, budget, alea, dejaComptes, savoirFaireDeclares) {
  const retenus = [];
  const sacrifices = [];
  let reste = budget;

  // Un savoir-faire acquis sort du cœur — mais « acquis » n'est pas un booléen
  // du profil : c'est le verdict de `srs.js`, et il n'y en a qu'un. Ce module
  // lisait `savoirFaire[sf].acquis`, champ qu'aucune transition de `srs.js`
  // n'écrit jamais : la lecture rendait `undefined`, aucun savoir-faire n'était
  // jamais retiré du cœur, et la seule façon de s'en apercevoir aurait été
  // qu'un élève acquière quelque chose.
  //
  // Le verdict réclame le savoir-faire lui-même (`{ diagnostic }`) : un
  // savoir-faire sans piège typé n'est jamais « acquis » mais « couvert, non
  // diagnostiqué », et cette décision n'est pas calculable depuis un état. Tant
  // qu'aucun catalogue de savoir-faire n'existe, `savoirFaireDeclares` est vide,
  // `estMaitrise` rend `diagnostic-hors-enumere` et RIEN ne sort du cœur : le
  // moteur en dit trop peu plutôt que trop, ce qui est le bon sens de l'erreur.
  const estAcquis = (sf) => estMaitrise(etat.savoirFaire[sf], savoirFaireDeclares[sf] ?? {}).maitrise;

  const duChapitre = etat.vivier.filter((i) => i.chapitre === etat.chapitreCourant
    && i.rituelDeControle !== true
    && !estAcquis(i.sfPrincipal));

  const palierServi = (sf) => etat.savoirFaire[sf]?.palierServi ?? 1;
  const disponibles = new Set(duChapitre.map((i) => i.id));

  const prendre = (item) => {
    retenus.push(item);
    reste -= coutItem(item);
    disponibles.delete(item.id);
  };

  // Le prédicat unique de la passe 2 — et, plus bas, de ce que le moteur
  // déclare avoir eu sous la main. Les deux DOIVENT être le même : « le vivier
  // permettait-il de tenir le plancher ? » ne veut rien dire si la réponse
  // compte des items que la composition n'aurait pas pu prendre.
  const estServable = (i) => disponibles.has(i.id)
    && coutItem(i) <= reste
    && i.palier <= palierServi(i.sfPrincipal);

  // ── Passe 1 : les dettes ────────────────────────────────────────────────
  const sfDus = [...new Set(duChapitre.map((i) => i.sfPrincipal))]
    .filter((sf) => echeanceDue(etat.savoirFaire[sf], etat.numeroSeance))
    .sort((a, b) => retardDe(etat.savoirFaire[b], etat.numeroSeance)
      - retardDe(etat.savoirFaire[a], etat.numeroSeance)
      || a.localeCompare(b));

  // Aucune borne de COMPTE ici, et c'est l'ordre de priorité qui l'exige. Le
  // cœur « porte 5 à 8 items », mais « le compte est indicatif, c'est la durée
  // qui lie » — la charte le redit dans les deux sens : « la contrainte porte
  // sur le temps, pas sur le nombre d'items ». Refuser une dette parce que le
  // huitième item est servi, c'est reporter une échéance devant une contrainte
  // qui n'est même pas la deuxième du classement ; et le faire sous le motif
  // `duree` alors que la moitié du budget reste, c'est le déclarer faussement
  // recevable. Ce qui borne cette passe est la durée, et elle seule.
  for (const sf of sfDus) {
    const suiviSf = etat.savoirFaire[sf];
    const candidats = melanger(
      duChapitre.filter((i) => disponibles.has(i.id)
        && i.sfPrincipal === sf
        && i.palier === palierServi(sf)),
      alea,
    );

    // ⚠ La redescente, et le décor qu'elle exige.
    //
    // « Deux échecs au même palier renvoient le savoir-faire au palier
    // inférieur, DANS UN CONTEXTE DE SURFACE NEUF. Sans elle, l'échec répété au
    // palier mélangé — garanti par la recherche, ces conceptions résistent à un
    // enseignement qui les vise — serait une boucle sans sortie. »
    //
    // `srs.js` posait `contexteNeufExige` et ce module ne l'a jamais lu : la
    // redescente reservait le décor de l'échec, à la fréquence exacte où le
    // vivier le contenait. Le drapeau était vrai, le vivier offrait le décor
    // neuf, et le tirage le manquait trois fois sur quatre — sans une ligne,
    // puisqu'un item au bon palier pour le bon savoir-faire est un item
    // parfaitement recevable.
    const ordonnes = (suiviSf?.contexteNeufExige === true && estObjetSimple(suiviSf.dernierServi))
      ? preferer(candidats, (i) => i.contexteDeSurface !== suiviSf.dernierServi.contexteDeSurface)
      : candidats;

    const abordable = ordonnes.find((i) => coutItem(i) <= reste);
    if (!abordable) {
      sacrifices.push({
        quoi: sf,
        type: 'savoir-faire',
        motif: candidats.length ? 'duree' : 'vivier',
        detail: candidats.length ? `${reste} dixièmes restants` : `aucun item au palier ${palierServi(sf)}`,
      });
      continue;
    }
    prendre(abordable);
  }

  // ── Le palier 4, dans le cœur ───────────────────────────────────────────
  const attendPalier4 = [...new Set(duChapitre.map((i) => i.sfPrincipal))]
    .some((sf) => palierServi(sf) >= 4);
  if (attendPalier4 && !retenus.some((i) => i.palier === 4)) {
    // « Le tirage est composé majoritairement hors de la file de révision du
    // moment » : on écarte d'abord le piège révisé le plus récemment, sans quoi
    // « le piège d'aujourd'hui est celui que j'ai raté avant-hier » rétablit un
    // titre de chapitre — c'est-à-dire précisément ce que le palier 4 retire.
    const p4 = duChapitre.filter((i) => disponibles.has(i.id) && i.palier === 4 && coutItem(i) <= reste);
    const horsFile = p4.filter((i) => i.piege !== etat.dernierPiegeRevise);
    const choix = melanger(horsFile.length ? horsFile : p4, alea)[0];
    if (choix) prendre(choix);
    else {
      sacrifices.push({
        quoi: 'palier-4',
        type: 'palier',
        motif: p4.length ? 'duree' : 'vivier',
        detail: 'le cœur ne porte aucun item de palier 4 alors qu\'un savoir-faire y est monté',
      });
    }
  }

  // ── Passe 2 : la cible ──────────────────────────────────────────────────
  let plafondAtteint = false;
  while (retenus.length < COEUR_MAX) {
    const candidats = duChapitre.filter(estServable);
    if (!candidats.length) break;

    const projection = projeter(etat.fenetre, [...dejaComptes, ...retenus]);
    const cercle = cercleAServir(candidats, projection);
    if (cercle === null) { plafondAtteint = true; break; }

    prendre(melanger(candidats.filter((i) => i.cercle === cercle), alea)[0]);
    if (retenus.length >= COEUR_MIN && reste < Math.min(...Object.values(COUTS))) break;
  }

  // Ce que le moteur AURAIT PU prendre et n'a pas pris : c'est la donnée qui
  // permet de dire, plus tard, si un plancher non tenu est une faute de moteur
  // ou une pauvreté du vivier. Sans elle, l'invariant 13 devrait choisir entre
  // refuser des séances légitimes et ne rien refuser du tout.
  //
  // Elle comptait des items d'un palier supérieur à celui que l'élève a
  // atteint — que la passe 2 ne prend jamais. Le moteur déclarait donc avoir
  // eu sous la main ce qu'il ne pouvait pas servir, et `controlerFenetre`
  // rendait « il manque 2 items et le vivier en offrait 5 : c'est une faute de
  // moteur » sur une séance parfaitement légitime. Une accusation à tort est
  // pire qu'un silence : elle apprend à ne plus lire le contrôle.
  const nonServis = { 0: 0, 1: 0, 2: 0, 3: 0 };
  for (const item of duChapitre) {
    if (estServable(item)) nonServis[item.cercle] += 1;
  }

  return { items: retenus, sacrifices, disponiblesNonServis: nonServis, plafondAtteint };
}

// ════════════════════════════════════════════════════════════════════════════
// La composition
// ════════════════════════════════════════════════════════════════════════════

/**
 * Une séance, et le compte rendu de ses arbitrages.
 *
 * Fonction pure : mêmes `etatEleve` et même `graine` ⇒ même séance, sur node
 * comme dans le navigateur, aujourd'hui comme dans six mois.
 *
 * En cas d'état hors cadre, la séance rendue est VIDE et porte un `refus`
 * explicite. On ne compose pas « au mieux » avec un état qu'on ne comprend pas :
 * une séance plausible issue d'un état fautif est le pire des deux mondes — elle
 * ne sert pas l'élève et elle masque le défaut.
 */
export function genererSeance(etatEleve, graine = 0, {
  catalogue = PIEGES,
  // Le catalogue des savoir-faire — `{ [sfId]: { diagnostic: 'type' | 'absent' } }`.
  //
  // ⚠ Il valait `{}` par défaut, du temps où aucun fichier ne DÉFINISSAIT un
  // savoir-faire. `js/data/savoir-faire.js` en porte maintenant 86, avec leur
  // `diagnostic` DÉRIVÉ de leurs pièges — et personne ne le passait. Le défaut
  // ne levait pas et ne faisait échouer aucun test : `estMaitrise` rendait
  // `diagnostic-hors-enumere` pour tout le monde, donc `estAcquis` était faux
  // pour tout le monde, donc AUCUN savoir-faire ne sortait jamais du cœur. Un
  // élève ayant acquis un savoir-faire aurait continué à le réviser toute
  // l'année, et la seule façon de s'en apercevoir aurait été qu'il en acquière
  // un. Le défaut est donc le catalogue réel, comme `catalogue = PIEGES` juste
  // au-dessus : deux corpus, un seul régime.
  savoirFaireDeclares = SAVOIR_FAIRE_PAR_ID,
} = {}) {
  const lu = lireEtat(etatEleve);
  if (!lu.ok) {
    return {
      numeroSeance: etatEleve?.numeroSeance ?? null,
      graine,
      rituel: [],
      coeur: [],
      reconfrontation: null,
      items: [],
      itemsMesures: [],
      cout: { total: 0, rituel: 0, coeur: 0, reconfrontation: 0 },
      compteRendu: null,
      refus: { code: 'ETAT_HORS_CADRE', manques: lu.manques },
    };
  }

  const etat = lu.etat;
  const alea = suiteDepuis(graine);

  // ① Le rituel, en tête, quand l'attention est intacte.
  const rituel = composerRituel(etat, alea);

  // ③ La re-confrontation : composée deuxième, servie dernière. Voir le
  //    commentaire de `composerReconfrontation` — c'est une dette, et les
  //    dettes se réservent avant les cibles.
  const reste = BUDGET_SEANCE - rituel.cout;
  const reconf = composerReconfrontation(etat, reste, alea, catalogue);
  const coutReconf = reconf.item ? coutItem(reconf.item) : 0;

  // ② Le cœur, avec ce qui reste. La re-confrontation compte déjà dans la
  //    fenêtre : elle n'est pas du rituel, donc elle est mesurée.
  const coeur = composerCoeur(
    etat, reste - coutReconf, alea, reconf.item ? [reconf.item] : [], savoirFaireDeclares,
  );

  const itemsMesures = [...coeur.items, ...(reconf.item ? [reconf.item] : [])];
  const items = [...rituel.items, ...itemsMesures];
  const cout = {
    rituel: rituel.cout,
    coeur: coutDe(coeur.items),
    reconfrontation: coutReconf,
    total: coutDe(items),
  };

  const projection = projeter(etat.fenetre, itemsMesures);
  const sacrifices = [...reconf.sacrifices, ...coeur.sacrifices];

  return {
    numeroSeance: etat.numeroSeance,
    graine,
    // Reporté sur la séance parce que `controlerSeance` en a besoin et n'a pas
    // accès au profil : « la re-confrontation est prise hors du chapitre en
    // cours » n'est pas contrôlable sur une séance qui a oublié quel il était.
    chapitreCourant: etat.chapitreCourant,
    rituel: rituel.items,
    coeur: coeur.items,
    reconfrontation: reconf.item
      ? {
        item: reconf.item,
        piege: reconf.piege,
        contexteDejaVu: reconf.contexteDejaVu,
        // Ce que la contrainte du juste/faux a demandé, et ce qu'elle a obtenu.
        // Les deux sont rapportés : une contrainte qui cède sans le dire est
        // une contrainte dont on croit qu'elle tient — c'est ce qu'était
        // `formatDifferentExige` tant que rien ne le lisait.
        formatDifferentExige: reconf.formatDifferentExige,
        formatIdentiqueMalgreTout: reconf.formatIdentiqueMalgreTout,
      }
      : null,
    items,
    itemsMesures,
    cout,
    disponiblesNonServis: coeur.disponiblesNonServis,
    compteRendu: {
      sacrifices,
      // Ce que le module ne peut pas décider seul, dit plutôt que passé sous
      // silence : une composition dégradée qui ne se signale pas est une
      // composition qu'on croira normale.
      reserves: [
        ...reconf.reserves,
        ...(rituel.cout < BUDGET_RITUEL_MIN
          ? [{ code: 'RITUEL_TROP_COURT', message: `Rituel à ${rituel.cout} dixièmes de minute : le vivier de gestes de contrôle ne suffit pas.` }]
          : []),
        ...(coeur.items.length < COEUR_MIN
          ? [{ code: 'COEUR_TROP_COURT', message: `${coeur.items.length} items de cœur pour un plancher de ${COEUR_MIN}.` }]
          : []),
        ...(coeur.items.length > COEUR_MAX
          ? [{
            code: 'COEUR_SURCHARGE',
            message: `${coeur.items.length} items de cœur pour un repère de ${COEUR_MAX} : ce sont des échéances dues, `
              + 'et une échéance ne se reporte pas devant un compte qui est indicatif. La durée, elle, est tenue.',
          }]
          : []),
        ...(coeur.plafondAtteint
          ? [{ code: 'PLAFOND_BLOQUANT', message: 'Le cœur s\'est arrêté : tout candidat restant aurait fait dépasser un plafond de cercle.' }]
          : []),
      ],
      bandes: {
        mesuree: projection.seancesDansLaFenetre >= TAILLE_FENETRE,
        seancesDansLaFenetre: projection.seancesDansLaFenetre,
        projection,
        ecarts: ecartsDeBande(projection, coeur.disponiblesNonServis),
      },
    },
    refus: null,
  };
}

/**
 * Les écarts aux bandes, JOURNALISÉS et non refusés à la composition.
 *
 * « Les bandes cèdent en dernier et leur écart est journalisé au lieu d'être
 * refusé » : refuser ici reviendrait à ne pas rendre de séance à un élève dont
 * le vivier est simplement déséquilibré. Le refus, lui, vit dans
 * `controlerFenetre` — au site (S), là où l'on regarde des trajectoires et non
 * un tirage.
 */
function ecartsDeBande({ compte, total }, disponiblesNonServis = {}) {
  if (total === 0) return [];
  const ecarts = [];
  for (const c of CERCLES) {
    if (depasseLePlafond(compte[c], total, c)) {
      ecarts.push({ cercle: c, sens: 'plafond', compte: compte[c], total, plafond: BANDES[c].plafond });
    } else if (sousLePlancher(compte[c], total, c)) {
      const manque = manqueAuPlancher(compte[c], total, c);
      ecarts.push({
        cercle: c,
        sens: 'plancher',
        compte: compte[c],
        total,
        plancher: BANDES[c].plancher,
        manque,
        // La nuance qui décide si c'est une faute : un plancher non tenu faute
        // d'items disponibles n'est pas une faute de moteur.
        vivierPermettait: (disponiblesNonServis[c] ?? 0) >= manque,
      });
    }
  }
  return ecarts;
}

/**
 * Ce qui empêche de LIRE une séance, ou `null` si elle se lit.
 *
 * Les deux fonctions qui reçoivent une séance de l'extérieur — `resumerSeance`
 * et `controlerSeance` — passent par ici. Aucune ne doit lever : une exception
 * remplace un verdict par une pile d'appels, et l'appelant ne peut alors plus
 * distinguer « la séance est conforme » de « le contrôle est en panne ». Ce
 * sont deux réponses opposées et c'est la seconde qui se perd.
 */
const defautDeLaSeance = (seance) => {
  if (!estObjetSimple(seance)) {
    return { code: 'SEANCE_HORS_CADRE', message: 'Ce n\'est pas une séance.' };
  }
  if (seance.refus) {
    return {
      code: 'SEANCE_REFUSEE',
      message: seance.refus.manques?.join(' ') ?? 'État hors cadre : aucune séance composée.',
    };
  }
  if (!Array.isArray(seance.itemsMesures)
    || !estObjetSimple(seance.cout) || !Number.isInteger(seance.cout.total)
    || !estObjetSimple(seance.compteRendu)) {
    return {
      code: 'SEANCE_HORS_CADRE',
      message: 'Séance illisible : il y manque les items mesurés, le coût ou le compte rendu des arbitrages.',
    };
  }
  return null;
};

/** Ce qui empêche de COMPTER un résumé dans la fenêtre, ou `null`. */
const defautDuResume = (r) => {
  if (!estObjetSimple(r)) return 'ce n\'est pas un résumé de séance';
  if (r.horsCadre) return r.horsCadre.message ?? 'résumé d\'une séance hors cadre';
  if (!Number.isInteger(r.total) || r.total < 0) return '`total` absent ou non entier';
  if (!estObjetSimple(r.parCercle) || !CERCLES.every((c) => Number.isInteger(r.parCercle[c]))) {
    return '`parCercle` absent ou incomplet — les quatre parts ne se comptent pas';
  }
  return null;
};

/**
 * Ce qu'une séance laisse derrière elle pour la fenêtre glissante.
 *
 * Rendu par ce module plutôt que reconstruit par l'appelant : deux lectures du
 * même objet finiraient par diverger, et c'est la mesure des bandes qui en
 * paierait le prix.
 */
export function resumerSeance(seance) {
  // Résumer ce qui n'est pas une séance et rendre un objet d'apparence normale
  // serait la faute la plus coûteuse du module : la fenêtre glissante
  // compterait cinq séances quand il n'y en a eu que quatre, et une séance
  // fantôme — zéro item, zéro coût, quatre parts nulles — passerait tous les
  // contrôles. Le résumé porte donc la marque, et `controlerFenetre` la refuse.
  const horsCadre = defautDeLaSeance(seance);
  if (horsCadre) {
    return {
      numeroSeance: seance?.numeroSeance ?? null,
      parCercle: { 0: 0, 1: 0, 2: 0, 3: 0 },
      sansCercle: 0,
      total: 0,
      cout: 0,
      disponiblesNonServis: { 0: 0, 1: 0, 2: 0, 3: 0 },
      sacrifices: [],
      horsCadre,
    };
  }

  const { compte, total, sansCercle } = partsParCercle(seance.itemsMesures ?? []);
  return {
    numeroSeance: seance.numeroSeance,
    parCercle: compte,
    sansCercle,
    total,
    cout: seance.cout?.total ?? 0,
    disponiblesNonServis: seance.disponiblesNonServis ?? { 0: 0, 1: 0, 2: 0, 3: 0 },
    sacrifices: seance.compteRendu?.sacrifices ?? [],
  };
}

// ════════════════════════════════════════════════════════════════════════════
// Les refus — invariant 13
// ════════════════════════════════════════════════════════════════════════════

/**
 * Ce qui se refuse sur UNE séance : la durée et l'ordre de priorité.
 *
 * Les deux autres clauses de l'invariant 13 — somme des parts et bandes —
 * portent sur la fenêtre et vivent dans `controlerFenetre`. Les séparer n'est
 * pas de la présentation : appliquer une bande à une séance de huit items,
 * c'est refuser des séances parfaitement conformes, et c'est l'erreur que la
 * fenêtre glissante existe pour empêcher.
 */
export function controlerSeance(seance) {
  const anomalies = [];
  if (!seance || seance.refus) {
    return [{ code: 'SEANCE_REFUSEE', message: seance?.refus?.manques?.join(' ') ?? 'Aucune séance.' }];
  }

  // Un contrôle qui lève sur ce qu'il ne sait pas lire ne contrôle rien : il
  // remonte une pile d'appels à la place d'un verdict, et l'appelant ne peut
  // plus distinguer « séance conforme » de « contrôle en panne ».
  const defaut = defautDeLaSeance(seance);
  if (defaut) return [defaut];

  if (seance.cout.total > BUDGET_SEANCE) {
    anomalies.push({
      code: 'BUDGET_DEPASSE',
      message: `Séance estimée à ${seance.cout.total} dixièmes de minute pour un plafond de ${BUDGET_SEANCE} `
        + '(15 minutes). La durée est une contrainte de premier rang : ce qui ne rentre pas attend la séance suivante.',
    });
  }
  if (seance.cout.rituel > BUDGET_RITUEL_MAX) {
    anomalies.push({
      code: 'RITUEL_TROP_LONG',
      message: `Rituel à ${seance.cout.rituel} dixièmes pour un plafond de ${BUDGET_RITUEL_MAX} (4 minutes).`,
    });
  }

  // Le refus qui compte, et celui qu'aucune inspection du résultat ne
  // permettrait : une échéance due, reportée au profit d'une bande. La bande
  // est une cible, l'échéance est une dette.
  for (const sacrifice of seance.compteRendu?.sacrifices ?? []) {
    if (sacrifice.motif === 'bande') {
      anomalies.push({
        code: 'ECHEANCE_REPORTEE',
        message: `« ${sacrifice.quoi} » était dû et a été reporté au profit d'une bande de proportion. `
          + 'L\'ordre de priorité est : échéances, puis durée, puis bandes.',
      });
    } else if (!MOTIFS_DE_SACRIFICE.includes(sacrifice.motif)) {
      anomalies.push({
        code: 'MOTIF_HORS_ENUMERE',
        message: `Sacrifice de « ${sacrifice.quoi} » au motif « ${sacrifice.motif} », hors énuméré.`,
      });
    }
  }

  // La re-confrontation est prise HORS du chapitre en cours — sinon la série
  // est étiquetée par son chapitre et le piège se reconnaît sans être reconnu.
  const reconf = seance.reconfrontation;
  if (reconf && seance.chapitreCourant && reconf.item.chapitre === seance.chapitreCourant) {
    anomalies.push({
      code: 'RECONFRONTATION_DANS_LE_CHAPITRE',
      message: `Le piège « ${reconf.piege} » est re-confronté dans le chapitre en cours.`,
    });
  }

  return anomalies;
}

/**
 * L'invariant 13 sur la fenêtre glissante de cinq séances, rituel exclu, à
 * partir de la cinquième séance.
 *
 * Avant la cinquième, la fonction rend `mesuree: false` et AUCUNE anomalie :
 * une fenêtre incomplète n'est pas une fenêtre conforme, et refuser sur trois
 * séances reviendrait à exiger d'une séance ce que la charte refuse
 * explicitement de lui demander.
 *
 * Quatre refus, dans l'ordre où ils se lisent :
 *   · une somme des quatre parts différente de 1 — signe d'un item sans cercle ;
 *   · un plafond dépassé — les plafonds lient toujours ;
 *   · un plancher non tenu ALORS QUE LE VIVIER PERMETTAIT DE LE TENIR ;
 *   · une séance dont le coût dépasse 15 minutes.
 * Le cinquième — l'ordre de priorité violé — se lit séance par séance, dans
 * `controlerSeance`, et il est repris ici parce qu'une trajectoire complète est
 * le seul endroit d'où l'on regarde vraiment.
 */
export function controlerFenetre(resumes) {
  const fenetre = (resumes ?? []).slice(-TAILLE_FENETRE);
  if (fenetre.length < TAILLE_FENETRE) {
    return { mesuree: false, seances: fenetre.length, anomalies: [] };
  }

  const anomalies = [];
  const compte = { 0: 0, 1: 0, 2: 0, 3: 0 };
  let total = 0;
  let sansCercle = 0;
  const disponibles = { 0: 0, 1: 0, 2: 0, 3: 0 };

  for (const r of fenetre) {
    // Un résumé qu'on ne sait pas lire ne vaut pas zéro : il vaut un refus.
    // Compté comme une séance à zéro item, il diluerait les parts des quatre
    // autres et rendrait « conforme » une fenêtre dont on ne sait rien.
    const defaut = defautDuResume(r);
    if (defaut) {
      anomalies.push({
        code: 'RESUME_HORS_CADRE',
        seance: r?.numeroSeance ?? null,
        message: `Un résumé de la fenêtre est illisible (${defaut}) : la mesure porterait sur une séance dont on ne sait rien.`,
      });
      continue;
    }

    for (const c of CERCLES) {
      compte[c] += r.parCercle?.[c] ?? 0;
      disponibles[c] += r.disponiblesNonServis?.[c] ?? 0;
    }
    total += r.total ?? 0;
    sansCercle += r.sansCercle ?? 0;

    if ((r.cout ?? 0) > BUDGET_SEANCE) {
      anomalies.push({
        code: 'BUDGET_DEPASSE',
        seance: r.numeroSeance,
        message: `Séance ${r.numeroSeance} : ${r.cout} dixièmes de minute, plafond ${BUDGET_SEANCE}.`,
      });
    }
    for (const s of r.sacrifices ?? []) {
      if (s.motif === 'bande') {
        anomalies.push({
          code: 'ECHEANCE_REPORTEE',
          seance: r.numeroSeance,
          message: `Séance ${r.numeroSeance} : « ${s.quoi} » était dû et a cédé devant une bande.`,
        });
      }
    }
  }

  if (sansCercle > 0) {
    anomalies.push({
      code: 'SOMME_DES_PARTS',
      message: `${sansCercle} item(s) sans cercle sur la fenêtre : les quatre parts ne somment pas à 1, `
        + 'ce qui signale un item hors des quatre cercles ou un cercle hors énuméré.',
    });
  }

  for (const c of CERCLES) {
    if (depasseLePlafond(compte[c], total, c)) {
      anomalies.push({
        code: 'PLAFOND_DEPASSE',
        cercle: c,
        message: `Cercle ${c} : ${compte[c]}/${total} sur la fenêtre, plafond ${BANDES[c].plafond} %.`
          + (c === 3 ? ' Le cercle 3 est plafonné, pas encouragé.' : ''),
      });
      continue;
    }
    if (!sousLePlancher(compte[c], total, c)) continue;

    const manque = manqueAuPlancher(compte[c], total, c);
    if (disponibles[c] >= manque) {
      anomalies.push({
        code: 'PLANCHER_NON_TENU',
        cercle: c,
        message: `Cercle ${c} : ${compte[c]}/${total} sur la fenêtre, plancher ${BANDES[c].plancher} %. `
          + `Il manque ${manque} item(s) et le vivier en offrait ${disponibles[c]} : c'est une faute de moteur.`,
      });
    }
    // Sinon : plancher non tenu faute d'items disponibles. Ce n'est PAS une
    // anomalie. Un élève qui répond « pas encore » aux chapitres d'électricité
    // vide le vivier du cercle 3, et refuser alors une séance parfaitement
    // légitime serait absurde. L'écart reste lisible dans le compte rendu de
    // chaque séance, où il est journalisé avec `vivierPermettait: false`.
  }

  return {
    mesuree: true,
    seances: fenetre.length,
    parts: CERCLES.reduce((acc, c) => ({ ...acc, [c]: { compte: compte[c], total } }), {}),
    anomalies,
  };
}
