// Le vivier — tous les items publiés, quelle que soit leur provenance.
//
// ── Pourquoi ce fichier existe ──────────────────────────────────────────────
//
// `tools/verifier-contenu.mjs` et `js/seance.js` demandaient leurs items à
// `items/exemples.js`, c'est-à-dire à l'ÉCHANTILLON. Tant qu'aucun chapitre
// n'était écrit, ça ne se voyait pas ; le jour où le chapitre 1 arrive, le
// contrôle continuerait de juger onze items de démonstration et de déclarer
// « conforme » sans avoir regardé les cent soixante-quinze autres. Un contrôle
// qui compare à rien passe toujours — c'est la panne que ce fichier supprime.
//
// ── Deux provenances, une seule liste ───────────────────────────────────────
//
// `exemples.js` reste : ses onze items ne sont pas du remplissage, chacun exerce
// une clause que le contrôleur applique et son pendant fautif est dans
// `fautifs.js`. Les retirer désarmerait les refus qu'ils sont seuls à déclencher.
// Ils sont donc SERVIS comme les autres, et soumis aux mêmes invariants.
//
// ── `CORPUS_PARTIEL` reste vrai, et ce n'est pas un oubli ───────────────────
//
// Deux chapitres sur treize, quatorze savoir-faire sur 86 : les invariants de
// VOLUME (plancher de neuf items, couverture des savoir-faire, plafond global de
// classe C) mesureraient le vide sur les 72 autres. Le drapeau bascule quand le
// corpus est écrit, pas quand les deux premiers chapitres le sont.

import { ITEMS as ITEMS_CH01, SAVOIR_FAIRE as SF_CH01 } from './ch01/index.js';
import { ITEMS as ITEMS_CH02, SAVOIR_FAIRE as SF_CH02 } from './ch02/index.js';
import { CORPUS_PARTIEL as CORPUS_PARTIEL_EXEMPLES, ITEMS as ITEMS_EXEMPLES } from './exemples.js';

/** Les chapitres écrits, dans l'ordre de la progression. */
export const CHAPITRES_ECRITS = Object.freeze(['ch01-melanges-et-solubilite', 'ch02-tension-electrique']);

export { ITEMS_CH01, ITEMS_CH02, ITEMS_EXEMPLES };

/** Le corpus est encore un échantillon : les invariants de VOLUME sont en
 *  réserve, les invariants de CONFORMITÉ mordent. */
export const CORPUS_PARTIEL = CORPUS_PARTIEL_EXEMPLES;

export const ITEMS = Object.freeze([...ITEMS_CH01, ...ITEMS_CH02, ...ITEMS_EXEMPLES]);

export default ITEMS;

/** Les savoir-faire écrits, avec leurs items et leurs sections — pour le
 *  consommateur qui veut le cours et pas seulement les exercices. */
export const SAVOIR_FAIRE_ECRITS = Object.freeze([...SF_CH01, ...SF_CH02]);
