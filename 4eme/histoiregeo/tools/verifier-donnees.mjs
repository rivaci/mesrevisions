// Contrôle de cohérence entre le contenu (js/data/) et les cartes (assets/maps/).
//
//     node tools/verifier-donnees.mjs
//
// Il ne vérifie pas l'exactitude historique — ça, c'est le travail du relecteur.
// Il vérifie que rien ne se désynchronise en silence : un identifiant de région
// qui ne correspond à aucun tracé donne une carte muette impossible à réussir.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REGIONS, DROM, FLEUVES, MASSIFS, MERS, PAYS_UE } from '../js/data/geo.js';
import { DATES, PERIODES, PERSONNAGES } from '../js/data/histoire.js';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const carte = (nom) => JSON.parse(readFileSync(join(racine, 'assets', 'maps', `${nom}.json`), 'utf8'));
const france = carte('france');
const europe = carte('europe');

const erreurs = [];
const verifier = (condition, message) => { if (!condition) erreurs.push(message); };

// --- Chaque contenu doit avoir son tracé sur la carte ------------------------

const relier = (libelle, items, tracesIds) => {
  for (const item of items) {
    verifier(tracesIds.includes(item.id), `${libelle} « ${item.nom} » : aucun tracé d'id « ${item.id} »`);
  }
  for (const id of tracesIds) {
    verifier(items.some((i) => i.id === id), `${libelle} : le tracé « ${id} » n'a pas de contenu associé`);
  }
};

relier('Région', REGIONS, france.regions.map((r) => r.id));
relier('DROM', DROM, france.drom.map((d) => d.id));
relier('Fleuve', FLEUVES, france.fleuves.map((f) => f.id));
relier('Massif', MASSIFS, france.massifs.map((m) => m.id));
relier('Mer', MERS, france.mers.map((m) => m.id));

// Malte est un marqueur, pas un polygone : les deux sources comptent.
const idsEurope = [...europe.pays.map((p) => p.id), ...europe.marqueurs.map((m) => m.id)];
relier('Pays', PAYS_UE, idsEurope);

// --- Effectifs attendus par la fiche de révision ----------------------------

const effectif = (libelle, items, attendu) =>
  verifier(items.length === attendu, `${libelle} : ${items.length} au lieu de ${attendu}`);

effectif('Régions métropolitaines', REGIONS, 13);
effectif('DROM', DROM, 5);
effectif("États membres de l'UE", PAYS_UE, 27);
effectif('Dates', DATES, 23);
effectif('Personnages', PERSONNAGES, 21);

// --- Cohérence interne ------------------------------------------------------

const doublons = (libelle, valeurs) => {
  const vus = new Set();
  for (const v of valeurs) {
    verifier(!vus.has(v), `${libelle} : « ${v} » apparaît deux fois`);
    vus.add(v);
  }
};

doublons("Identifiant de date", DATES.map((d) => d.id));
doublons('Identifiant de personnage', PERSONNAGES.map((p) => p.id));
doublons('Nom de personnage', PERSONNAGES.map((p) => p.nom));
doublons('Capitale de région', REGIONS.map((r) => r.capitale));

const idsPeriodes = PERIODES.map((p) => p.id);
for (const d of DATES) {
  verifier(idsPeriodes.includes(d.periode), `Date « ${d.label} » : période inconnue « ${d.periode} »`);
}
for (const p of PERSONNAGES) {
  verifier(idsPeriodes.includes(p.periode), `Personnage « ${p.nom} » : période inconnue « ${p.periode} »`);
}
for (const p of PERIODES) {
  const utilisee = DATES.some((d) => d.periode === p.id) || PERSONNAGES.some((x) => x.periode === p.id);
  verifier(utilisee, `Période « ${p.nom} » : déclarée mais jamais utilisée`);
}

// Une capitale doit aussi exister comme point sur la carte, sinon on ne peut pas
// la faire placer par l'élève.
const villes = france.villes.map((v) => v.nom);
for (const r of REGIONS) {
  verifier(villes.includes(r.capitale), `Capitale « ${r.capitale} » : absente des points de la carte`);
}

// --- Résultat ---------------------------------------------------------------

if (erreurs.length) {
  console.error(`${erreurs.length} problème(s) :\n` + erreurs.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(
  `Données cohérentes : ${REGIONS.length} régions, ${DROM.length} DROM, ${FLEUVES.length} fleuves, ` +
  `${MASSIFS.length} massifs, ${MERS.length} mers, ${PAYS_UE.length} pays, ` +
  `${DATES.length} dates, ${PERSONNAGES.length} personnages.`,
);
