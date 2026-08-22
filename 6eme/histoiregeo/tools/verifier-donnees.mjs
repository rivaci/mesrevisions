// Contrôle de cohérence entre le contenu (js/data/) et les cartes (assets/maps/).
//
//     node tools/verifier-donnees.mjs
//
// Il ne vérifie pas l'exactitude historique — ça, c'est le travail du relecteur.
// Il vérifie ce qui se désynchronise en silence : un identifiant qui ne
// correspond à aucun tracé donne une carte muette, impossible à réussir, et
// rien ne le signale avant que l'élève ne bloque dessus.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEMES } from '../js/data/themes.js';
import { ETAPES } from '../js/data/parcours.js';
import { NOMBRES_ROMAINS, SYMBOLES_ROMAINS, PERIODES } from '../js/data/temps.js';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const carte = (nom) => JSON.parse(readFileSync(join(racine, 'assets', 'maps', `${nom}.json`), 'utf8'));

const erreurs = [];
const verifier = (condition, message) => { if (!condition) erreurs.push(message); };

// --- Chaque item cartographique doit avoir son tracé ------------------------

for (const [id, theme] of Object.entries(THEMES)) {
  if (!theme.carte) continue;
  const donnees = carte(theme.carte.fichier);
  const traces = new Set((donnees[theme.carte.couche] ?? []).map((z) => z.id));
  verifier(traces.size > 0,
    `Thème « ${id} » : la couche « ${theme.carte.couche} » est vide dans ${theme.carte.fichier}.json`);
  for (const item of theme.items) {
    verifier(traces.has(item.id),
      `Thème « ${id} » : « ${item.id} » n'a aucun tracé dans ${theme.carte.fichier}.json / ${theme.carte.couche}`);
  }
  // L'inverse compte aussi : un tracé sans item est une zone cliquable qui ne
  // sera jamais la bonne réponse, et qui vole des clics à ses voisines.
  const attendus = new Set(theme.items.map((i) => i.id));
  for (const trace of traces) {
    verifier(attendus.has(trace),
      `Carte ${theme.carte.fichier} / ${theme.carte.couche} : « ${trace} » n'est demandé par aucun item de « ${id} »`);
  }
}

// --- Chaque thème doit pouvoir fabriquer ses questions ----------------------

for (const [id, theme] of Object.entries(THEMES)) {
  verifier(theme.items?.length > 0, `Thème « ${id} » : aucun item`);
  verifier(typeof theme.question === 'function', `Thème « ${id} » : pas de question`);
  verifier(typeof theme.reponse === 'function', `Thème « ${id} » : pas de réponse`);
  verifier(typeof theme.detail === 'function', `Thème « ${id} » : pas de détail`);
  verifier(!theme.carte || theme.reconnaissance,
    `Thème « ${id} » : cartographique mais sans libellé de reconnaissance`);

  const ids = theme.items.map((i) => i.id);
  const doublons = ids.filter((x, i) => ids.indexOf(x) !== i);
  verifier(doublons.length === 0, `Thème « ${id} » : identifiants en double — ${[...new Set(doublons)].join(', ')}`);

  for (const item of theme.items) {
    verifier(String(theme.question(item) ?? '').trim(), `Thème « ${id} », item « ${item.id} » : question vide`);
    verifier(String(theme.reponse(item) ?? '').trim(), `Thème « ${id} », item « ${item.id} » : réponse vide`);
    verifier(String(theme.detail(item) ?? '').trim(), `Thème « ${id} », item « ${item.id} » : détail vide`);
  }

  // Un QCM tire trois leurres parmi les autres réponses du thème. En dessous de
  // quatre réponses distinctes, il devient une pièce à pile ou face — et l'élève
  // gagne sans savoir.
  if (!theme.carte) {
    const distinctes = new Set(theme.items.map((i) => theme.reponse(i)));
    verifier(distinctes.size >= 4,
      `Thème « ${id} » : seulement ${distinctes.size} réponses distinctes, un QCM à 4 choix est impossible`);
  }

  // Une réponse qui figure déjà dans l'énoncé se devine sans rien savoir.
  for (const item of theme.items) {
    const enonce = String(theme.question(item)).toLowerCase();
    const reponse = String(theme.reponse(item)).toLowerCase();
    verifier(theme.carte || reponse.length < 3 || !enonce.includes(reponse),
      `Thème « ${id} », item « ${item.id} » : la réponse « ${theme.reponse(item)} » est déjà dans l'énoncé`);
  }
}

// --- Le parcours ------------------------------------------------------------

const themesDuParcours = new Set(ETAPES.flatMap((e) => e.lots.map((l) => l.themeId)));
for (const id of Object.keys(THEMES)) {
  verifier(themesDuParcours.has(id), `Thème « ${id} » : défini mais absent du parcours, donc jamais joué`);
}
const idsEtapes = ETAPES.map((e) => e.id);
verifier(new Set(idsEtapes).size === idsEtapes.length, 'Deux étapes portent le même identifiant');

// --- Les chiffres romains, vérifiés par le calcul ---------------------------
//
// La table est écrite à la main : une coquille y est invisible à la relecture.
// On la contrôle donc avec une conversion indépendante, écrite ici.

const VALEURS = Object.fromEntries(SYMBOLES_ROMAINS.map((s) => [s.signe, s.valeur]));

function romainVersArabe(romain) {
  let total = 0;
  for (let i = 0; i < romain.length; i += 1) {
    const v = VALEURS[romain[i]];
    const suivant = VALEURS[romain[i + 1]] ?? 0;
    total += v < suivant ? -v : v;
  }
  return total;
}

for (const n of NOMBRES_ROMAINS) {
  verifier([...n.romain].every((c) => VALEURS[c] !== undefined),
    `Chiffre romain « ${n.romain} » : symbole inconnu`);
  verifier(romainVersArabe(n.romain) === n.arabe,
    `Chiffre romain « ${n.romain} » : vaut ${romainVersArabe(n.romain)}, pas ${n.arabe}`);
  verifier(!/(.)\1\1\1/.test(n.romain), `Chiffre romain « ${n.romain} » : un symbole y est répété quatre fois`);
  verifier(!/(V.*V|L.*L|D.*D)/.test(n.romain), `Chiffre romain « ${n.romain} » : V, L ou D y figure deux fois`);
}

// --- Les périodes -----------------------------------------------------------

const ordres = PERIODES.map((p) => p.ordre);
verifier(new Set(ordres).size === ordres.length, 'Deux périodes portent le même ordre sur la frise');
verifier(Math.min(...ordres) === 1 && Math.max(...ordres) === PERIODES.length,
  `Les ordres des périodes ne vont pas de 1 à ${PERIODES.length}`);

// --- Résultat ---------------------------------------------------------------

if (erreurs.length) {
  console.error(`${erreurs.length} erreur(s) :`);
  for (const e of erreurs) console.error(`  ✗ ${e}`);
  process.exit(1);
}

const items = Object.values(THEMES).reduce((s, t) => s + t.items.length, 0);
const cartographiques = Object.values(THEMES).filter((t) => t.carte).length;
console.log(
  `Contenu cohérent : ${ETAPES.length} étapes, ${Object.keys(THEMES).length} thèmes `
  + `(dont ${cartographiques} sur carte), ${items} connaissances.`,
);
