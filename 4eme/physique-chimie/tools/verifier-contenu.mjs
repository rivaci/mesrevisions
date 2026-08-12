// Le contrôle du contenu — les invariants « (C) » de la charte, rendus exécutables.
//
//     node tools/verifier-contenu.mjs
//
// ── Ce qu'il fait, et ce qu'il ne fait pas ────────────────────────────────
//
// Il applique les invariants dont `charte.md` § « Les trois sites d'exécution »
// porte le site **(C)** : ceux qui se lisent sur des FICHIERS, au build. Les
// invariants (M) sont dans les sept suites de `tools/tester-*.mjs` ; les
// invariants (S) attendent `tools/simuler-parcours.mjs`, qui n'existe pas — et
// c'est écrit ici plutôt que masqué, parce qu'un outil qui laisse croire qu'il
// couvre tout est pire qu'un outil qui dit ce qu'il ne voit pas.
//
// Il ne juge pas la pédagogie. Il juge ce qui casse en silence : une correction
// fausse, un distracteur inventé, une figure qui ne dérive pas de la réponse, un
// piège qu'aucun savoir-faire ne porte, un savoir-faire que rien ne rend
// acquérable.
//
// ── Trois verdicts, et pourquoi pas deux ──────────────────────────────────
//
// **REFUS** — une faute de conformité. Elle ne dépend pas du volume du corpus :
// un item mal formé est mal formé qu'il y en ait dix ou mille. Sortie non nulle.
//
// **RÉSERVE** — ce que le corpus ACTUEL ne permet pas de décider. Le vivier
// compte une poignée d'items ; refuser les 86 savoir-faire pour cause de
// plancher non atteint noierait les refus utiles sous une évidence. Les réserves
// redeviennent des refus dès que `CORPUS_PARTIEL` passe à `false`, et la liste
// de ce qui bascule est écrite ici, pas laissée à découvrir.
//
// **ÉPREUVE** — le contrôleur se contrôle. `js/data/items/fautifs.js` porte des
// items volontairement fautifs avec le code attendu, et cette phase échoue de
// deux façons : un item fautif passé (le refus a disparu), ou refusé pour un
// AUTRE motif (le refus existe mais ne regarde pas ce qu'on croit — la panne la
// plus trompeuse des deux, parce que le compte reste juste).
//
// **Un contrôleur qui n'a jamais rien refusé ne vaut rien.**

import {
  ARBITRAGES_EN_ATTENTE,
  ATTENDUS_BO,
  CHAPITRES,
  CHAPITRE_PAR_ID,
  CONTRAT_MATHS,
  EFFECTIFS,
  NON_DEMANDE,
  SAVOIR_FAIRE,
  SAVOIR_FAIRE_PAR_ID,
  piegesOrphelins,
} from '../js/data/savoir-faire.js';
import { CONSTANTES, TABLES } from '../js/data/tables.js';
import { PIEGES } from '../js/data/pieges/index.js';
import { CORPUS_PARTIEL, ITEMS } from '../js/data/items/exemples.js';
import { ITEMS_FAUTIFS } from '../js/data/items/fautifs.js';
import { CODES_DE_REFUS, estDoubleQcm, validerItem } from '../js/item.js';
import { controlerPiegeSrs } from '../js/srs.js';
import { controlerUniteAuteur } from '../js/unites.js';

const refus = [];
const reserves = [];
const epreuve = { passes: 0, echecs: [] };

const REFUSER = (code, message) => refus.push({ code, message });
const RESERVER = (message) => reserves.push(message);

/**
 * Ce qui devient un refus le jour où le corpus est complet.
 *
 * Le déclarer, c'est la différence entre « pas encore contrôlé » et « jamais
 * contrôlé ». Sur un corpus partiel, ces manques se comptent par dizaines et
 * sont TOUS la même information — « le corpus n'est pas écrit » — : les lister
 * un par un noierait les refus utiles sous une évidence. Ils sont donc groupés
 * par code, avec trois exemples et un compte.
 */
const parCode = new Map();
const SELON_LE_VOLUME = (code, message) => {
  if (!CORPUS_PARTIEL) { REFUSER(code, message); return; }
  if (!parCode.has(code)) parCode.set(code, []);
  parCode.get(code).push(message);
};

const viderLesReservesDeVolume = () => {
  for (const [code, messages] of [...parCode.entries()].sort((a, b) => b[1].length - a[1].length)) {
    const exemples = messages.slice(0, 3).map((m) => `
      · ${m}`).join('');
    RESERVER(`[deviendra un refus — ${code}] ${messages.length} cas${exemples}`
      + (messages.length > 3 ? `
      · … et ${messages.length - 3} autres` : ''));
  }
};

// ════════════════════════════════════════════════════════════════════════════
// 1. Ligne 1 — le schéma et les énumérés (invariants 1, 2, 4, 5, 6, 8, 10, 11,
//    12, 15, 18, 19, item par item)
// ════════════════════════════════════════════════════════════════════════════
//
// Sans elle, aucun autre invariant n'est fiable : ils lisent tous des champs
// dont on ne sait pas s'ils existent.

const vus = new Set();
for (const item of ITEMS) {
  if (vus.has(item.id)) {
    REFUSER('IDENTIFIANT_EN_DOUBLE', `item « ${item.id} » : identifiant en double. Deux items de même id en partagent un dans le tirage : en servir un rend l'autre indisponible, et le cœur se vide sans un mot.`);
  }
  vus.add(item.id);
  for (const r of validerItem(item).refus) REFUSER(r.code, r.message);
}

// ════════════════════════════════════════════════════════════════════════════
// 2. Invariant 3 — le plafond de la classe C
// ════════════════════════════════════════════════════════════════════════════
//
// Trois décisions de comptage, sans lesquelles le plafond n'est pas calculable
// et que la v1 laissait ouvertes : le dénominateur est `sfPrincipal` (un item de
// palier 4 sollicite plusieurs savoir-faire, l'appartenance n'était donc pas
// fonctionnelle) ; le seuil global est un comptage À PLAT, pas une moyenne de
// ratios ; et les deux seuils sont en tension — si chaque savoir-faire atteignait
// son tiers, le global vaudrait 33,3 % et échouerait.

const PLAFOND_LOCAL = 1 / 3;
const PLAFOND_GLOBAL = 0.3;

const parSavoirFaire = new Map();
for (const item of ITEMS) {
  if (!parSavoirFaire.has(item.sfPrincipal)) parSavoirFaire.set(item.sfPrincipal, []);
  parSavoirFaire.get(item.sfPrincipal).push(item);
}

const totalC = ITEMS.filter((i) => i.classe === 'C').length;
if (ITEMS.length && totalC / ITEMS.length > PLAFOND_GLOBAL) {
  const message = `${totalC} items de classe C sur ${ITEMS.length} = ${Math.round((100 * totalC) / ITEMS.length)} %, au-dessus du budget global de 30 %.`;
  // Le seuil global est le budget qui LIE ; sur dix items il ne mesure rien.
  SELON_LE_VOLUME('PLAFOND_GLOBAL_DE_CLASSE_C', message);
}

for (const [id, items] of parSavoirFaire) {
  const sf = SAVOIR_FAIRE_PAR_ID[id];
  const c = items.filter((i) => i.classe === 'C').length;
  if (c / items.length > PLAFOND_LOCAL) {
    SELON_LE_VOLUME('PLAFOND_LOCAL_DE_CLASSE_C', `« ${id} » : ${c} items de classe C sur ${items.length}, au-dessus du tiers.`);
  }

  // Un palier composé EXCLUSIVEMENT d'items de classe C : celui-là ne dépend pas
  // du volume. Un palier entier sans aucune garantie mécanique est une faute de
  // composition, qu'il porte un item ou dix.
  const paliers = new Map();
  for (const i of items) {
    if (!paliers.has(i.palier)) paliers.set(i.palier, []);
    paliers.get(i.palier).push(i);
  }
  for (const [palier, lot] of paliers) {
    if (lot.length >= 2 && lot.every((i) => i.classe === 'C')) {
      REFUSER('PALIER_TOUT_EN_CLASSE_C', `« ${id} », palier ${palier} : ${lot.length} items, tous de classe C. Aucune garantie mécanique sur un palier entier.`);
    }
  }

  // Tout savoir-faire porte au moins un item HORS cercle 3. Aucune exception
  // n'est ouverte : sans cet item, le savoir-faire est mécaniquement
  // inacquérable — Shavelson dit que le cercle 3 n'est pas substituable, et
  // l'élève le reverrait indéfiniment sans jamais le voir sortir de la file.
  if (!items.some((i) => i.cercle !== 3)) {
    REFUSER('SAVOIR_FAIRE_TOUT_EN_CERCLE_3', `« ${id} » : tous ses items sont de cercle 3, donc il n'est jamais acquérable.`);
  }

  // Un savoir-faire porteur d'un piège doit porter un double QCM : c'est la
  // deuxième des cinq conditions de maîtrise, et sans l'item elle est
  // inatteignable.
  if (sf?.diagnostic === 'type' && !items.some(estDoubleQcm)) {
    SELON_LE_VOLUME('SANS_DOUBLE_QCM', `« ${id} » porte un piège de conception et aucun double QCM : la condition « au moins une réussite juste/juste » est inatteignable.`);
  }

  // Les deux items de discrimination mathématique, quand un prérequis est déclaré.
  if (sf?.prerequisMaths) {
    for (const role of ['geste-isole', 'choix-de-relation']) {
      if (!items.some((i) => i.discriminationMaths === role)) {
        SELON_LE_VOLUME('DISCRIMINATION_INCOMPLETE', `« ${id} » déclare un prérequis mathématique et n'a pas d'item « ${role} » : on saura qu'il a échoué, pas laquelle des deux compétences a cédé.`);
      }
    }
  }

  // Le plancher d'items, calculé par la charte plutôt que posé : 3 au palier 4,
  // 2 au palier 3, 2 au palier 2, 2 au palier 1, +2 de discrimination, +1 de
  // double QCM, +1 au format diagnostique. Neuf au minimum, sans aucune marge.
  if (items.length < 9) {
    SELON_LE_VOLUME('PLANCHER_D_ITEMS', `« ${id} » : ${items.length} item(s) publiés, 9 au minimum (12 à 13 en pratique).`);
  }
}

for (const sf of SAVOIR_FAIRE) {
  if (!parSavoirFaire.has(sf.id)) {
    SELON_LE_VOLUME('SAVOIR_FAIRE_SANS_ITEM', `« ${sf.id} » n'a aucun item.`);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 3. Invariant 15 — la variation, palier par palier, piège par piège
// ════════════════════════════════════════════════════════════════════════════
//
// « Les paliers 2 et 3 d'un même piège en choisissent DEUX DISTINCTES. » Ce
// refus est celui que la v1 rendait impossible : en définissant le palier 2
// *comme* le changement de contexte et le palier 3 *comme* le changement de mode
// de réponse, elle faisait de la dimension une conséquence du palier.

const parPiege = new Map();
for (const item of ITEMS) {
  if (!item.piege) continue;
  if (!parPiege.has(item.piege)) parPiege.set(item.piege, []);
  parPiege.get(item.piege).push(item);
}

for (const [idPiege, items] of parPiege) {
  const dimensions = new Map();
  for (const i of items) {
    if (![2, 3].includes(i.palier)) continue;
    if (!dimensions.has(i.palier)) dimensions.set(i.palier, new Set());
    dimensions.get(i.palier).add(i.dimensionVariee);
  }
  const d2 = dimensions.get(2);
  const d3 = dimensions.get(3);
  if (d2 && d3) {
    const communes = [...d2].filter((d) => d3.has(d));
    if (communes.length) {
      REFUSER('MEME_DIMENSION_AUX_DEUX_PALIERS', `piège « ${idPiege} » : les paliers 2 et 3 déclarent tous deux « ${communes.join(', ')} ». La difficulté croît par VARIATION, et si rien de neuf ne varie il n'y a pas de palier.`);
    }
  }

  // Un piège absent du palier non étiqueté n'est jamais éprouvé là où se joue le
  // contrat didactique — et c'est là que le critère de maîtrise l'attend.
  if (!items.some((i) => i.palier === 4)) {
    SELON_LE_VOLUME('PIEGE_ABSENT_DU_PALIER_4', `piège « ${idPiege} » : aucun item au palier non étiqueté, où la première tâche est de RECONNAÎTRE de quoi il s'agit.`);
  }

  // Un piège qui déclare un `formatDiagnostique` sans qu'aucun item ne l'atteste
  // rend la quatrième condition de maîtrise impossible à remplir.
  if (PIEGES[idPiege]?.formatDiagnostique && !items.some((i) => i.estFormatDiagnostique === true)) {
    SELON_LE_VOLUME('FORMAT_DIAGNOSTIQUE_SANS_ITEM', `piège « ${idPiege} » : aucun item déclaré au format diagnostique ; « au moins une des trois réussites » y est inatteignable.`);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 4. Invariant 14 (part contenu) — la réfutation espacée
// ════════════════════════════════════════════════════════════════════════════
//
// La lecture est celle de `srs.js`, jamais réécrite ici : c'est ce fichier qui
// décide ce qu'est un rythme et ce qu'est un dispositif, et un contrôle qui
// referait sa propre lecture contrôlerait autre chose que ce que le moteur
// exécute.

const formesDeCondition = {
  absente: [], fonction: [], champsEtSource: [], situationEtFonction: [], illisible: [],
};

for (const piege of Object.values(PIEGES)) {
  for (const a of controlerPiegeSrs(piege)) REFUSER(a.code, a.message);

  if (piege.rang === 2) {
    if (!piege.iatrogene) {
      REFUSER('RANG_2_SANS_IATROGENE', `« ${piege.id} » est de rang 2 et ne déclare pas le savoir-faire qui le PRODUIT. L'application enseignera la conservation de l'intensité et le sens du courant : elle fabriquera ces conceptions chez des élèves qui ne les avaient pas.`);
    } else {
      const producteur = SAVOIR_FAIRE_PAR_ID[piege.iatrogene];
      if (!producteur) {
        REFUSER('IATROGENE_INCONNU', `« ${piege.id} » : \`iatrogene\` « ${piege.iatrogene} » n'est dans aucun chapitre.`);
      } else {
        const chProducteur = CHAPITRE_PAR_ID[producteur.chapitre];
        const chPiege = CHAPITRE_PAR_ID[piege.chapitreOrigine];
        if (chProducteur && chPiege && chPiege.numero < chProducteur.numero) {
          REFUSER('RANG_2_PROGRAMME_AVANT_SON_PRODUCTEUR', `« ${piege.id} » démarre au chapitre ${chPiege.numero}, avant « ${producteur.id} » (chapitre ${chProducteur.numero}) : on réfuterait une conception que l'élève n'a pas encore.`);
        }
      }
    }
  }

  if (!piege.formatDiagnostique) {
    REFUSER('PIEGE_SANS_FORMAT_DIAGNOSTIQUE', `« ${piege.id} » : aucun \`formatDiagnostique\`. Ranger uniformément le dessin en palier 3 laisse un piège atteindre trois réussites sans jamais avoir été posé dans le seul format où la recherche dit qu'il se voit.`);
  }

  // La condition de validité doit être EXÉCUTABLE — `{ champs, predicat }` — et
  // non de la prose. Une condition en prose ne refuse rien : c'est le même
  // défaut que le drapeau saisi de la v1, déplacé d'un cran.
  // Trois formes coexistent dans le catalogue pour un même concept — un objet
  // { champs, predicat }, une fonction nue, un objet { situation, predicat } —
  // et `item.js` les normalise toutes les trois. La réserve nomme la divergence
  // sans en faire un refus : les trois SONT exécutables, ce qui est la seule
  // chose qui compte pour l'invariant 15. Mais un lecteur qui n'en reconnaîtrait
  // qu'une laisserait 23 pièges sur 31 sans condition évaluée, et ne dirait
  // rien : une condition qu'on ne sait pas lire est une condition toujours
  // satisfaite. C'est le mode de panne que ce projet vient d'éliminer entre
  // trois modules, un cran plus bas.
  const cv = piege.conditionValidite;
  if (!cv) formesDeCondition.absente.push(piege.id);
  else if (typeof cv === 'function') formesDeCondition.fonction.push(piege.id);
  else if (Array.isArray(cv.champs) && typeof cv.predicat === 'string') formesDeCondition.champsEtSource.push(piege.id);
  else if (typeof cv.predicat === 'function') formesDeCondition.situationEtFonction.push(piege.id);
  else formesDeCondition.illisible.push(piege.id);
}

if (formesDeCondition.absente.length) {
  REFUSER('PIEGE_SANS_CONDITION_DE_VALIDITE', `${formesDeCondition.absente.length} piège(s) sans \`conditionValidite\` : ${formesDeCondition.absente.join(', ')}. L'invariant 15 n'a rien à évaluer sur leurs items, et un item qui ne teste rien passe pour un item qui teste.`);
}
if (formesDeCondition.illisible.length) {
  REFUSER('CONDITION_DE_VALIDITE_ILLISIBLE', `${formesDeCondition.illisible.length} piège(s) dont la \`conditionValidite\` n'est ni une fonction ni une source évaluable : ${formesDeCondition.illisible.join(', ')}.`);
}
const formes = [
  ['{ champs, predicat: source }', formesDeCondition.champsEtSource.length],
  ['fonction nue', formesDeCondition.fonction.length],
  ['{ situation: prose, predicat: fonction }', formesDeCondition.situationEtFonction.length],
].filter(([, n]) => n > 0);
if (formes.length > 1) {
  RESERVER(`les conditions de validité prennent ${formes.length} formes différentes dans le catalogue `
    + `(${formes.map(([nom, n]) => `${nom} : ${n}`).join(' · ')}). Les trois sont exécutables et `
    + '`item.js` les normalise, mais les six familles de pièges ont été écrites en parallèle et '
    + "n'ont pas convergé : c'est exactement le désaccord d'interface que la réconciliation des "
    + 'modules vient de supprimer un cran plus haut, et il reste ici.');
}

const orphelins = piegesOrphelins();
if (orphelins.length) {
  REFUSER('PIEGE_ORPHELIN', `${orphelins.length} piège(s) qu'aucun savoir-faire ne porte : ${orphelins.join(', ')}. Ils ont un rythme, des constats, et ils ne sont jamais servis — rien n'échoue, un piège disparaît.`);
}

// ════════════════════════════════════════════════════════════════════════════
// 5. Le catalogue des savoir-faire
// ════════════════════════════════════════════════════════════════════════════

for (const sf of SAVOIR_FAIRE) {
  const attendu = (sf.diagnostic === 'type') === (sf.pieges.length > 0);
  if (!attendu) {
    REFUSER('DIAGNOSTIC_CONTREDIT_LES_PIEGES', `« ${sf.id} » : \`diagnostic: ${sf.diagnostic}\` avec ${sf.pieges.length} piège(s). Le diagnostic est DÉRIVÉ ; un champ saisi à côté de la liste qui le détermine finit par la contredire.`);
  }
  for (const p of sf.pieges) {
    if (!PIEGES[p]) REFUSER('PIEGE_INCONNU', `« ${sf.id} » déclare le piège inconnu « ${p} ».`);
  }
  if (!ATTENDUS_BO[sf.attendu]) {
    REFUSER('ATTENDU_BO_INCONNU', `« ${sf.id} » : \`attendu\` « ${sf.attendu} » hors de la table des attendus de fin de cycle.`);
  }
  if (!CHAPITRE_PAR_ID[sf.chapitre]) {
    REFUSER('CHAPITRE_INCONNU', `« ${sf.id} » : chapitre « ${sf.chapitre} » inconnu.`);
  }
  // `unite: 'imposee'` sans motif écrit : le seul motif recevable est que la
  // conversion SOIT le savoir-faire — trois cas dans tout le plan. Partout
  // ailleurs, refuser une unité équivalente punit un élève qui a raison.
  for (const a of controlerUniteAuteur('SANS_UNITE')) REFUSER(a.code, a.message);
  if (sf.unite === 'imposee' && !String(sf.motifUniteImposee ?? '').trim()) {
    REFUSER('MOTIF_UNITE_IMPOSEE_ABSENT', `« ${sf.id} » : \`unite: 'imposee'\` sans motif écrit.`);
  }
  if (!['libre', 'imposee'].includes(sf.unite)) {
    REFUSER('UNITE_HORS_ENUMERE', `« ${sf.id} » : \`unite\` « ${sf.unite} » hors énuméré (libre | imposee).`);
  }
}

const imposees = SAVOIR_FAIRE.filter((s) => s.unite === 'imposee');
if (imposees.length > 3) {
  REFUSER('TROP_D_UNITES_IMPOSEES', `${imposees.length} savoir-faire à unité imposée : la charte en ouvre TROIS (g/cm³ ↔ kg/m³, m/s ↔ km/h, J ↔ kWh). Au-delà, on punit des élèves qui ont raison.`);
}

// ════════════════════════════════════════════════════════════════════════════
// 6. Invariant 17 — couverture, statut, litige
// ════════════════════════════════════════════════════════════════════════════

for (const ch of CHAPITRES) {
  if (!['noyau', 'frontiere'].includes(ch.statut)) {
    REFUSER('CHAPITRE_SANS_STATUT', `chapitre « ${ch.id} » : statut « ${ch.statut} » hors énuméré.`);
  }
  if (ch.dispute !== null) {
    // L'interrupteur est étendu à TOUT chapitre disputé, quel que soit son
    // statut : attaché à la seule valeur `frontiere`, il désertait exactement le
    // chapitre 4, noyau et disputé, où un élève risque le plus de tomber sur un
    // chapitre non fait.
    if (!Array.isArray(ch.dispute.textes) || ch.dispute.textes.length !== 2) {
      REFUSER('LITIGE_SANS_DEUX_CITATIONS', `chapitre « ${ch.id} » : \`dispute\` sans ses DEUX citations contradictoires. Un statut « frontière » dit « ton prof l'a peut-être fait » ; aucun ne dit « les textes ne sont pas d'accord ».`);
    }
  }
  if (ch.programme !== '2020') {
    REFUSER('PROGRAMME_NON_DECLARE', `chapitre « ${ch.id} » : version de programme non déclarée.`);
  }
}

const couverts = new Set(SAVOIR_FAIRE.map((s) => s.attendu));
const exclus = new Set(NON_DEMANDE.filter((n) => n.portee === 'totale').map((n) => n.attendu));
for (const [id, attendu] of Object.entries(ATTENDUS_BO)) {
  if (couverts.has(id) || exclus.has(id)) continue;
  REFUSER('ATTENDU_BO_NI_COUVERT_NI_EXCLU', `attendu « ${id} » (${attendu.texte}) : aucun savoir-faire ne le couvre et la rubrique « ce qui n'est pas demandé » ne l'écarte pas.`);
}
for (const arbitrage of ARBITRAGES_EN_ATTENTE) {
  // La charte l'écrit sans détour : l'invariant BLOQUE LE BUILD tant que ce
  // n'est pas tranché. Ce n'est pas une réserve — c'est le seul angle mort
  // silencieux du plan face au texte du BO, et le rendre bruyant est tout
  // l'objet de l'invariant 17.
  REFUSER('ARBITRAGE_EN_ATTENTE', `attendu « ${arbitrage.attendu} », ${arbitrage.quoi} : ${arbitrage.etat}. « ${arbitrage.citation} » (${arbitrage.source}). ${arbitrage.aFaire}`);
}

// ════════════════════════════════════════════════════════════════════════════
// 7. Invariants 4 et 5 — les tables et les constantes sont sourcées
// ════════════════════════════════════════════════════════════════════════════

for (const [nom, table] of Object.entries(TABLES)) {
  if (!table.source) REFUSER('TABLE_SANS_SOURCE', `table « ${nom} » : aucune source.`);
  if (table.statut !== 'primaire') {
    REFUSER('CITATION_NON_PRIMAIRE', `table « ${nom} » : statut « ${table.statut} ». Un chiffre repris d'une revue secondaire et non revérifié sur l'original ne figure pas dans le contenu publié.`);
  }
  for (const [cle, ligne] of Object.entries(table.lignes)) {
    for (const colonne of table.colonnes) {
      if (!(colonne in ligne)) {
        REFUSER('TABLE_INCOMPLETE', `table « ${nom} », ligne « ${cle} » : colonne « ${colonne} » absente. Une case absente et une case nulle ne disent pas la même chose.`);
      }
    }
  }
}
for (const [nom, constante] of Object.entries(CONSTANTES)) {
  if (!constante.source) REFUSER('CONSTANTE_SANS_SOURCE', `constante « ${nom} » : aucune source.`);
  for (const a of controlerUniteAuteur(constante.unite)) {
    REFUSER('UNITE_AUTEUR_REFUSEE', `constante « ${nom} » : ${a.message}`);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 8. Invariant 18 — le contrat inter-dépôts avec les mathématiques
// ════════════════════════════════════════════════════════════════════════════

if (CONTRAT_MATHS.version === null) {
  RESERVER(`le renvoi vers les mathématiques n'est pas vérifiable : ${CONTRAT_MATHS.artefact} n'existe pas (${CONTRAT_MATHS.motif}). Un contrôle qui compare à rien passe toujours — la version et l'existence de chaque section citée restent à vérifier le jour où l'artefact est publié.`);
}
for (const sf of SAVOIR_FAIRE) {
  const p = sf.prerequisMaths;
  if (!p) continue;
  if (!Number.isInteger(p.chapitre) || !Array.isArray(p.sections) || p.sections.length === 0) {
    REFUSER('RENVOI_MATHS_MAL_FORME', `« ${sf.id} » : \`prerequisMaths\` sans chapitre entier ni liste de sections.`);
  }
  const trimestreSf = CHAPITRE_PAR_ID[sf.chapitre]?.trimestre;
  if (Number.isInteger(p.trimestre) && Number.isInteger(trimestreSf) && p.trimestre > trimestreSf) {
    REFUSER('PREREQUIS_MATHS_POSTERIEUR', `« ${sf.id} » est au trimestre ${trimestreSf} et s'appuie sur des mathématiques du trimestre ${p.trimestre} : la garantie « le prérequis est déjà installé » est fausse.`);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 9. L'épreuve — le contrôleur se contrôle
// ════════════════════════════════════════════════════════════════════════════

const idsFautifs = new Set();
for (const cas of ITEMS_FAUTIFS) {
  const { attendu, item } = cas;
  if (idsFautifs.has(item.id)) {
    epreuve.echecs.push(`deux cas fautifs partagent l'identifiant « ${item.id} »`);
  }
  idsFautifs.add(item.id);
  if (vus.has(item.id)) {
    epreuve.echecs.push(`le cas fautif « ${item.id} » porte l'identifiant d'un item publié`);
  }

  const codes = validerItem(item).refus.map((r) => r.code);
  if (codes.length === 0) {
    epreuve.echecs.push(`« ${item.id} » : PASSÉ, alors qu'il doit être refusé pour ${attendu}. ${cas.pourquoi}`);
  } else if (!codes.includes(attendu)) {
    epreuve.echecs.push(`« ${item.id} » : refusé pour ${codes.join(', ')} au lieu de ${attendu}. Le refus existe mais ne regarde pas ce qu'on croit.`);
  } else {
    epreuve.passes += 1;
  }
}

// Un contrôleur dont l'épreuve ne couvre pas ses propres codes est un contrôleur
// qu'on n'a testé qu'à moitié. Ce n'est pas un refus : c'est la mesure honnête de
// ce qui est éprouvé.
//
// ⚠ Elle n'était honnête qu'à moitié : « 39 codes éprouvés » se lit comme une
// couverture tant qu'on ne dit pas SUR COMBIEN. Treize des 52 codes de
// `CODES_DE_REFUS` n'avaient aucun cas fautif, et un refus qu'aucun cas ne
// déclenche est indiscernable d'un refus supprimé — l'un d'eux
// (`FRONTIERE_DE_SYSTEME_ABSENTE`) était d'ailleurs devenu inatteignable sans
// que rien ne le dise. Le dénominateur est donc imprimé, et les manquants sont
// NOMMÉS : c'est la seule forme sous laquelle un trou de couverture se comble.
const codesEprouves = new Set(ITEMS_FAUTIFS.map((c) => c.attendu));

/**
 * Les codes qui ne se lisent PAS sur un item, et qu'aucun item fautif ne peut
 * donc atteindre. Ils sont nommés ici pour ne pas gonfler faussement le trou de
 * couverture — mais ils sont nommés, et non retirés de `CODES_DE_REFUS` : leur
 * épreuve reste à écrire, sur le corpus des tables et non sur un item.
 */
const CODES_HORS_ITEM = Object.freeze(['TABLE_SANS_SOURCE']);

const codesSansCas = CODES_DE_REFUS
  .filter((c) => !codesEprouves.has(c) && !CODES_HORS_ITEM.includes(c));
const codesInventes = [...codesEprouves].filter((c) => !CODES_DE_REFUS.includes(c));

if (codesSansCas.length) {
  RESERVER(`${codesSansCas.length} code(s) de refus d'item sur `
    + `${CODES_DE_REFUS.length - CODES_HORS_ITEM.length} n'ont aucun cas fautif : `
    + `${codesSansCas.join(', ')}. Un refus qu'aucun cas ne déclenche est indiscernable d'un refus `
    + "supprimé — c'est le mode de panne le plus discret d'un outil de build.");
}
RESERVER(`${CODES_HORS_ITEM.join(', ')} : contrôle de CORPUS (il se lit sur la table, pas sur `
  + "l'item), donc hors d'atteinte d'un item fautif. Son épreuve reste à écrire — la seule qui "
  + 'la porterait serait un catalogue de tables volontairement fautif.');

if (codesInventes.length) {
  REFUSER('CODE_ATTENDU_INCONNU', `un cas fautif attend ${codesInventes.join(', ')}, `
    + 'qui ne figure pas dans `CODES_DE_REFUS` : le cas ne pourra jamais passer.');
}

viderLesReservesDeVolume();

// ════════════════════════════════════════════════════════════════════════════
// Le compte rendu
// ════════════════════════════════════════════════════════════════════════════

const ligne = (n = 76) => '─'.repeat(n);

console.log(`\nContrôle du contenu — physique-chimie 4ᵉ`);
console.log(ligne());
console.log(`Chapitres ${EFFECTIFS.chapitres} · savoir-faire ${EFFECTIFS.savoirFaire} `
  + `(${EFFECTIFS.noyau} noyau, ${EFFECTIFS.frontiere} frontière)`);
console.log(`Diagnostiqués ${EFFECTIFS.diagnostiques} · couverts non diagnostiqués ${EFFECTIFS.couvertsNonDiagnostiques}`);
console.log(`Pièges ${Object.keys(PIEGES).length} · items publiés ${ITEMS.length} · cas fautifs ${ITEMS_FAUTIFS.length}`);
console.log(`Corpus déclaré ${CORPUS_PARTIEL ? 'PARTIEL' : 'complet'}`);

console.log(`\nÉPREUVE DU CONTRÔLEUR — ${epreuve.passes}/${ITEMS_FAUTIFS.length} refus attendus obtenus, `
  + `${codesEprouves.size} codes éprouvés`);
console.log(ligne());
if (epreuve.echecs.length === 0) {
  console.log('  Chaque item fautif est refusé, et pour son motif.');
} else {
  for (const e of epreuve.echecs) console.log(`  ✗ ${e}`);
}

console.log(`\nREFUS — ${refus.length}`);
console.log(ligne());
if (refus.length === 0) console.log('  aucun.');
for (const r of refus) console.log(`  ✗ [${r.code}] ${r.message}`);

console.log(`\nRÉSERVES — ${reserves.length}`);
console.log(ligne());
if (reserves.length === 0) console.log('  aucune.');
for (const r of reserves) console.log(`  · ${r}`);

console.log(`\nCE QUE CE CONTRÔLE NE VOIT PAS`);
console.log(ligne());
console.log('  · les invariants (S) — proportions des cercles sur les séances générées, budget de');
console.log('    15 minutes, ordre de priorité, critère de maîtrise, quatre re-confrontations par an :');
console.log('    ils portent sur des trajectoires, et `tools/simuler-parcours.mjs` n\'existe pas ;');
console.log('  · les invariants (M) — lexique élève, quatrième verdict, cas-témoins du vérificateur');
console.log('    de circuit : ils sont dans les sept suites `tools/tester-*.mjs` ;');
console.log('  · l\'audit humain des supports (invariant 20) : une analogie ne se contrôle pas, elle');
console.log('    se relit, et `audite: true` ne prouve rien.');

const echoue = refus.length > 0 || epreuve.echecs.length > 0;
console.log(`\n${echoue ? 'REFUSÉ' : 'CONFORME'}\n`);
process.exit(echoue ? 1 : 0);
