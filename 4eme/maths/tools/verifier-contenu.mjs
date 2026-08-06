// Contrôle du contenu — les invariants de la charte, rendus exécutables.
//
//     node tools/verifier-contenu.mjs
//
// La charte maths-4e définit six invariants. Ce fichier en est la traduction :
// tant qu'ils ne sont pas vérifiés par une machine, ce ne sont que des bonnes
// intentions — et le benchmark montre que les bonnes intentions produisent des
// corrections fausses en production.
//
// Ce qui est vérifié ici ne juge pas la pédagogie. Il juge ce qui casse en
// silence : une correction fausse, un contre-exemple qui ne réfute rien, un
// palier où une stratégie de surface suffit.

import SEANCE from '../js/data/seance-prototype.js';
import { PIEGES } from '../js/data/pieges.js';
import { TEMOINS_INTERDITS, discrimine, estExact } from '../js/verification.js';

const erreurs = [];
const avertissements = [];
const dire = (liste, message) => liste.push(message);

/** Les valeurs sur lesquelles on teste une identité. Plusieurs, et pas les
 *  valeurs piégeuses : une égalité vraie pour un seul nombre ne prouve rien. */
const TEMOINS_DE_TEST = [3, 4, 5, 7, -3, -4];

const exercices = SEANCE.exercices ?? [];

// --- Structure --------------------------------------------------------------

const ids = new Set();
for (const ex of [...(SEANCE.rituel ?? []), ...exercices]) {
  if (ids.has(ex.id)) dire(erreurs, `${ex.id} : identifiant en double`);
  ids.add(ex.id);
  if (!ex.piege) dire(erreurs, `${ex.id} : aucun piège`);
  else if (!PIEGES[ex.piege]) dire(erreurs, `${ex.id} : piège « ${ex.piege} » inconnu du catalogue`);
}

for (const ex of exercices) {
  if (!ex.consigne) dire(erreurs, `${ex.id} : consigne manquante`);
  if (!ex.palier) dire(erreurs, `${ex.id} : palier manquant`);
  const options = ex.options ?? [];
  if (options.filter((o) => o.correct).length !== 1) {
    dire(erreurs, `${ex.id} : il faut exactement une bonne réponse`);
  }
  for (const o of options) {
    if (!o.texte) dire(erreurs, `${ex.id} : une option sans texte`);
    if (!o.correct && !o.piege) {
      dire(erreurs, `${ex.id} : le distracteur « ${o.texte} » n'est rattaché à aucun piège`);
    }
    if (o.piege && !PIEGES[o.piege]) {
      dire(erreurs, `${ex.id} : distracteur rattaché au piège inconnu « ${o.piege} »`);
    }
  }
}

// --- Invariant 1 : aucune correction fausse ne peut être publiée -------------
//
// Deux transcriptions indépendantes de la même chose — l'expression affichée
// et la bonne réponse — doivent coïncider sur plusieurs valeurs. Un auteur qui
// affiche « 2(x + 5) » et coche « 2x + 5 » est attrapé ici.

for (const ex of exercices) {
  const attendu = (ex.options ?? []).find((o) => o.correct);
  if (!ex.valeur || !attendu?.evaluer) continue;

  for (const t of TEMOINS_DE_TEST) {
    const gauche = ex.valeur(t);
    const droite = attendu.evaluer(t);
    if (!estExact(gauche) || !estExact(droite)) {
      dire(erreurs, `${ex.id} : évaluation non entière en ${t} — hors du cadre exact`);
      break;
    }
    if (gauche !== droite) {
      dire(
        erreurs,
        `${ex.id} : CORRECTION FAUSSE — « ${ex.expression} » vaut ${gauche} en ${t}, ` +
        `mais la réponse cochée « ${attendu.texte} » vaut ${droite}`,
      );
      break;
    }
  }
}

// Invariant 1 décliné : géométrie.
for (const ex of exercices) {
  if (ex.pythagore) {
    const { cotes: [a, b], hypotenuse } = ex.pythagore;
    if (a * a + b * b !== hypotenuse * hypotenuse) {
      dire(erreurs, `${ex.id} : ${a}² + ${b}² ne fait pas ${hypotenuse}²`);
    }
  }
  if (ex.indetermination) {
    const { cotesConnus: [a, b], reponsesPossibles } = ex.indetermination;
    if (new Set(reponsesPossibles).size < 2) {
      dire(erreurs, `${ex.id} : il faut deux réponses DIFFÉRENTES pour prouver l'indétermination`);
    }
    // Chaque réponse proposée doit donner un triangle réellement constructible,
    // sinon le « on ne peut pas conclure » repose sur un cas impossible.
    for (const c of reponsesPossibles) {
      const constructible = a + b > c && a + c > b && b + c > a;
      if (!constructible) {
        dire(erreurs, `${ex.id} : avec ${a}, ${b} et ${c}, le triangle n'existe pas`);
      }
    }
  }
}

// --- Invariant 2 : chaque distracteur a son témoin discriminant --------------
//
// Par PAIRE, et hors des valeurs qui mentent. C'est ce qui empêche l'appli de
// saboter son propre geste : un contre-exemple qui donnerait deux fois le même
// nombre « réfuterait » la bonne réponse.

for (const ex of exercices) {
  const attendu = (ex.options ?? []).find((o) => o.correct);
  if (!attendu?.evaluer) continue;

  // Une expression sans variable (registre numérique) n'a rien à substituer :
  // « 3² vaut 9 » se contrôle en comptant, pas en remplaçant une lettre. Le
  // témoin n'a de sens que là où il y a une lettre à remplacer.
  if (attendu.evaluer.length === 0) continue;

  for (const o of ex.options.filter((x) => !x.correct && x.evaluer)) {
    if (o.temoin == null) {
      dire(erreurs, `${ex.id} : le distracteur « ${o.texte} » n'a pas de témoin`);
      continue;
    }
    if (TEMOINS_INTERDITS.includes(o.temoin)) {
      dire(
        erreurs,
        `${ex.id} : témoin ${o.temoin} interdit pour « ${o.texte} » ` +
        `(les valeurs ${TEMOINS_INTERDITS.join(', ')} confondent des écritures différentes)`,
      );
      continue;
    }
    if (!discrimine(o.temoin, attendu.evaluer, o.evaluer)) {
      dire(
        erreurs,
        `${ex.id} : en ${o.temoin}, « ${o.texte} » et « ${attendu.texte} » donnent la même valeur — ` +
        `le contre-exemple ne réfuterait rien`,
      );
    }
  }
}

// --- Invariant 4 : aucune stratégie de surface ne doit suffire ---------------
//
// Pour la famille « réduis si c'est possible », l'équilibre est naturel : il
// faut que les DEUX réponses existent à chaque palier. Un palier où tout se
// réduit apprend « transforme toujours » ; un palier où rien ne se réduit
// apprend « réponds toujours rien à faire ». Les deux sont des motifs de
// surface, et le second est celui qu'on fabriquerait sans y penser.

// L'équilibre ne se pose que là où « faut-il transformer ? » est une vraie
// question. Sous une consigne « Développe », il y a toujours quelque chose à
// faire : le motif à combattre n'est plus « transforme toujours » mais « quelle
// transformation », et c'est le rôle des distracteurs typés.
const CONCERNES = new Set(['reduire', 'outil']);

const parPalier = new Map();
for (const ex of exercices.filter((e) => CONCERNES.has(e.question))) {
  if (!parPalier.has(ex.palier)) parPalier.set(ex.palier, []);
  parPalier.get(ex.palier).push(ex);
}

for (const ex of exercices) {
  if (!ex.question) dire(erreurs, `${ex.id} : champ « question » manquant`);
}

for (const [palier, lot] of [...parPalier.entries()].sort((a, b) => a[0] - b[0])) {
  const sans = lot.filter((ex) => ex.sansTransformation).length;
  const avec = lot.length - sans;
  if (sans === 0) {
    dire(avertissements, `Palier ${palier} : aucun item « rien à faire » — « transforme toujours » suffirait`);
  }
  if (avec === 0) {
    dire(erreurs, `Palier ${palier} : tous les items sont « rien à faire » — la réponse se devine`);
  }
  const part = sans / lot.length;
  if (lot.length >= 4 && (part < 0.25 || part > 0.6)) {
    dire(
      avertissements,
      `Palier ${palier} : ${Math.round(part * 100)} % d'items « rien à faire » ` +
      `(la charte vise environ un tiers)`,
    );
  }
}

// Les pièges à équilibre 'neutres' exigent des items explicitement marqués.
const piegesUtilises = new Set(exercices.map((ex) => ex.piege));
for (const id of piegesUtilises) {
  if (PIEGES[id]?.equilibre !== 'neutres') continue;
  const lot = exercices.filter((ex) => ex.piege === id);
  if (!lot.some((ex) => ex.neutre)) {
    dire(erreurs, `Piège « ${id} » : équilibre « neutres » mais aucun item neutre`);
  }
}

// --- Invariant 5 : le rituel couvre le socle, chaque piège a son geste -------

for (const [id, piege] of Object.entries(PIEGES)) {
  if (!piege.regle) dire(erreurs, `Piège « ${id} » : pas de règle`);
  if (!piege.geste) dire(erreurs, `Piège « ${id} » : pas de geste de contrôle`);
  if ((piege.raisonnements ?? []).length < 2) {
    dire(erreurs, `Piège « ${id} » : il faut au moins deux raisonnements pour que le dialogue diagnostique`);
  }
  const idsRaisonnements = new Set();
  for (const r of piege.raisonnements ?? []) {
    if (idsRaisonnements.has(r.id)) dire(erreurs, `Piège « ${id} » : raisonnement « ${r.id} » en double`);
    idsRaisonnements.add(r.id);
    if (!r.texte || !r.reponse) dire(erreurs, `Piège « ${id} » : raisonnement « ${r.id} » incomplet`);
  }
}

for (const ex of SEANCE.rituel ?? []) {
  if (PIEGES[ex.piege]?.famille !== 'socle') {
    dire(erreurs, `${ex.id} : le rituel ne doit contenir que des pièges du socle`);
  }
  if (!Number.isInteger(ex.attendu)) dire(erreurs, `${ex.id} : réponse attendue non entière`);
}

// --- Rapport ----------------------------------------------------------------

const total = (SEANCE.rituel?.length ?? 0) + exercices.length;
console.log(`Séance ${SEANCE.numero} — ${total} items, ${piegesUtilises.size} pièges travaillés.`);

for (const a of avertissements) console.log(`  ~ ${a}`);
for (const e of erreurs) console.log(`  ✗ ${e}`);

if (erreurs.length) {
  console.log(`\n${erreurs.length} erreur(s). Le contenu n'est pas publiable.`);
  process.exit(1);
}
console.log(avertissements.length ? `\n${avertissements.length} avertissement(s), rien de bloquant.` : '\nTout est bon.');
