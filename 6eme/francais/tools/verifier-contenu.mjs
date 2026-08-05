// Contrôle de cohérence du contenu des séances.
//
//     node tools/verifier-contenu.mjs
//
// Ne juge pas la pédagogie — vérifie ce qui casse en silence : un piège qui
// n'existe pas, un indice de mot hors du tableau, un mot de dictée absent de
// la phrase à dicter, une clé de correction vide.
//
// Et surtout : la règle des items neutres. Si tous les exercices d'un palier
// piègent dans le même sens, l'élève apprend un motif au lieu de la règle.

import { PIEGES } from '../js/data/pieges.js';
import { SEANCES, TOUS_EXERCICES, piegesUtilises } from '../js/data/seances/index.js';

const erreurs = [];
const avertissements = [];
const dire = (liste, message) => liste.push(message);

// --- Structure des séances --------------------------------------------------

const numerosVus = new Set();
for (const s of SEANCES) {
  const ou = `Séance ${s.numero}`;

  if (numerosVus.has(s.numero)) dire(erreurs, `${ou} : numéro en double`);
  numerosVus.add(s.numero);

  if (!s.titre) dire(erreurs, `${ou} : titre manquant`);
  if (!s.rappels?.length) dire(erreurs, `${ou} : aucun rappel`);
  if (!s.exercices?.length) dire(erreurs, `${ou} : aucun exercice`);

  for (const r of s.rappels ?? []) {
    const lignes = (r.texte ?? '').split('\n').filter((l) => l.trim()).length;
    if (lignes > 10) dire(avertissements, `${ou}, rappel « ${r.titre} » : ${lignes} lignes, c'est long`);
  }

  if ((s.rappels ?? []).length > 2) {
    dire(avertissements, `${ou} : ${s.rappels.length} rappels (2 au maximum recommandé)`);
  }

  const idsRappels = new Set((s.rappels ?? []).map((r) => r.id));
  for (const ex of s.exercices ?? []) {
    if (ex.rappel && !idsRappels.has(ex.rappel)) {
      dire(erreurs, `${ou}, ${ex.id} : renvoie au rappel « ${ex.rappel} » qui n'existe pas`);
    }
  }
}

if (SEANCES.length !== 20) dire(erreurs, `${SEANCES.length} séances au lieu de 20`);

// --- Exercices --------------------------------------------------------------

const idsExercices = new Set();
for (const ex of TOUS_EXERCICES) {
  const ou = `Séance ${ex.seance}, ${ex.id}`;

  if (idsExercices.has(ex.id)) dire(erreurs, `${ou} : identifiant en double`);
  idsExercices.add(ex.id);

  if (!ex.consigne) dire(erreurs, `${ou} : consigne manquante`);

  if (ex.piege && !PIEGES[ex.piege]) {
    dire(erreurs, `${ou} : piège « ${ex.piege} » inconnu du catalogue`);
  }

  if (ex.type === 'completer' || ex.type === 'qcm') {
    if (!ex.attendu || !String(ex.attendu).trim()) {
      dire(erreurs, `${ou} : clé de correction vide`);
    }
  }

  if (ex.type === 'qcm') {
    if (!ex.choix?.length) dire(erreurs, `${ou} : aucun choix proposé`);
    else if (!ex.choix.some((c) => c.trim().toLowerCase() === String(ex.attendu).trim().toLowerCase())) {
      dire(erreurs, `${ou} : la bonne réponse « ${ex.attendu} » ne figure pas parmi les choix`);
    }
  }

  if (ex.type === 'toucher') {
    if (!ex.mots?.length) dire(erreurs, `${ou} : aucun mot`);
    if (!ex.attendus?.length) dire(erreurs, `${ou} : aucun mot attendu`);
    for (const i of ex.attendus ?? []) {
      if (!Number.isInteger(i) || i < 0 || i >= (ex.mots?.length ?? 0)) {
        dire(erreurs, `${ou} : indice attendu ${i} hors du tableau de ${ex.mots?.length ?? 0} mots`);
      }
    }
  }

  if (ex.type === 'dictee') {
    if (!ex.texte) dire(erreurs, `${ou} : texte à dicter manquant`);
    const motsTexte = (ex.texte ?? '').toLowerCase().replace(/[.,;:!?«»']/g, ' ').split(/\s+/);
    for (const point of ex.pointsControle ?? []) {
      if (!PIEGES[point.piege]) {
        dire(erreurs, `${ou} : point de contrôle « ${point.mot} » lié au piège inconnu « ${point.piege} »`);
      }
      if (!motsTexte.includes(point.mot.toLowerCase())) {
        dire(erreurs, `${ou} : le mot « ${point.mot} » ne figure pas dans le texte à dicter`);
      }
    }
    if (!(ex.pointsControle ?? []).length) {
      dire(avertissements, `${ou} : dictée sans point de contrôle, rien ne sera diagnostiqué`);
    }
  }
}

// --- La règle des items neutres ---------------------------------------------
//
// Pour chaque couple (séance, piège) où le piège joue vraiment, il faut au
// moins deux items neutres. Sinon l'élève apprend « pluriel juste avant →
// singulier » au lieu de chercher le sujet, et se trompe partout ailleurs.

const groupes = new Map();
for (const ex of TOUS_EXERCICES) {
  if (!ex.piege || ex.type === 'dictee') continue;
  const cle = `${ex.seance}|${ex.piege}`;
  const g = groupes.get(cle) ?? { seance: ex.seance, piege: ex.piege, total: 0, neutres: 0 };
  g.total += 1;
  if (ex.neutre) g.neutres += 1;
  groupes.set(cle, g);
}

for (const g of groupes.values()) {
  // La règle ne vaut que pour les pièges qui se déclenchent dans UN SEUL sens
  // (`equilibre: 'neutres'`). Un sujet collé au verbe ou un verbe irrégulier ne
  // présentent aucun motif trompeur : exiger des items neutres pour eux serait
  // du remplissage, et masquerait les vrais manquements.
  if (PIEGES[g.piege]?.equilibre !== 'neutres') continue;

  // En dessous de 4 exercices, le piège n'est pas assez martelé pour qu'un
  // motif s'installe.
  if (g.total >= 4 && g.neutres < 2) {
    dire(erreurs,
      `Séance ${g.seance}, piège « ${g.piege} » : ${g.total} exercices mais seulement ` +
      `${g.neutres} item(s) neutre(s). Il en faut au moins 2, sinon l'élève apprend un motif.`);
  }
}

// Un piège déclaré 'neutres' mais qui n'a aucun item neutre nulle part signale
// une consigne de rédaction non appliquée.
for (const [id, piege] of Object.entries(PIEGES)) {
  if (piege.equilibre !== 'neutres') continue;
  const aDesNeutres = TOUS_EXERCICES.some((e) => e.piege === id && e.neutre);
  const estTravaille = TOUS_EXERCICES.some((e) => e.piege === id);
  if (estTravaille && !aDesNeutres) {
    dire(erreurs, `Piège « ${id} » : déclaré à équilibrer par items neutres, mais aucun n'existe.`);
  }
}

// --- Couverture -------------------------------------------------------------

const utilises = new Set(piegesUtilises());
for (const id of Object.keys(PIEGES)) {
  if (!utilises.has(id)) dire(avertissements, `Piège « ${id} » défini mais jamais travaillé`);
}

// --- Résultat ---------------------------------------------------------------

const totalExercices = TOUS_EXERCICES.length;
const totalNeutres = TOUS_EXERCICES.filter((e) => e.neutre).length;
const parType = TOUS_EXERCICES.reduce((acc, e) => ({ ...acc, [e.type]: (acc[e.type] ?? 0) + 1 }), {});

if (avertissements.length) {
  console.log(`${avertissements.length} avertissement(s) :`);
  for (const a of avertissements) console.log(`  ~ ${a}`);
  console.log('');
}

if (erreurs.length) {
  console.error(`${erreurs.length} erreur(s) :`);
  for (const e of erreurs) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(
  `Contenu cohérent : ${SEANCES.length} séances, ${totalExercices} exercices ` +
  `(${Object.entries(parType).map(([t, n]) => `${n} ${t}`).join(', ')}), ` +
  `${totalNeutres} items neutres, ${utilises.size}/${Object.keys(PIEGES).length} pièges travaillés.`,
);
