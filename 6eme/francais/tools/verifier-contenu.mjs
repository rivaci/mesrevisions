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
import { enonceLisible, reponseAttendue } from '../js/exercice.js';

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

if (SEANCES.length !== 21) dire(erreurs, `${SEANCES.length} séances au lieu de 21`);

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

  // Chaque exercice doit pouvoir dire ce qu'il fallait répondre — c'est affiché
  // dans la correction ET envoyé à l'IA comme réponse attendue. C'est ce
  // contrôle qui manquait quand « La réponse était : undefined » est parti en
  // production : le contenu était bon, c'est le code de lecture qui ignorait un
  // des quatre types.
  if (!String(reponseAttendue(ex)).trim()) {
    dire(erreurs, `${ou} (${ex.type}) : impossible de dire ce qu'il fallait répondre`);
  }
  if (!String(enonceLisible(ex)).trim()) {
    dire(erreurs, `${ou} (${ex.type}) : énoncé illisible à plat, l'IA recevrait une phrase vide`);
  }

  // L'indice de l'infinitif s'affiche ENTRE la saisie et la suite de la phrase :
  // « [___] (manger)-en une. » Le trait d'union se colle alors à l'indice au lieu
  // de la réponse — précisément dans la séance où le trait d'union est la leçon.
  if (ex.type === 'completer' && ex.verbe && String(ex.apres ?? '').startsWith('-')) {
    dire(erreurs,
      `${ou} : « ${ex.apres} » commence par un trait d'union alors qu'un indice « (${ex.verbe}) » ` +
      `s'insère juste avant. Mets l'infinitif dans la consigne et retire le champ « verbe ».`);
  }

  if (ex.type === 'corriger') {
    if (!ex.mots?.length) dire(erreurs, `${ou} : aucun mot`);
    if (!ex.fautes?.length) dire(erreurs, `${ou} : un texte à corriger sans faute n'a rien à corriger`);
    for (const f of ex.fautes ?? []) {
      if (!Number.isInteger(f?.mot) || f.mot < 0 || f.mot >= (ex.mots?.length ?? 0)) {
        dire(erreurs, `${ou} : indice de faute ${f?.mot} hors du tableau de ${ex.mots?.length ?? 0} mots`);
      } else if (!f.juste || String(f.juste).trim() === String(ex.mots[f.mot]).trim()) {
        // Une « faute » identique à sa correction ne serait pas une faute :
        // l'élève chercherait indéfiniment ce qui cloche.
        dire(erreurs, `${ou} : le mot « ${ex.mots[f.mot]} » est marqué fautif mais sa correction est vide ou identique`);
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

// --- Indices de surface -----------------------------------------------------
//
// Même famille de défaut que les items neutres, un cran plus sournois : si un
// détail typographique sépare parfaitement les phrases piégeantes des neutres,
// l'élève peut répondre juste sans jamais appliquer la règle. Il apprend la
// virgule, pas l'accord — et se trompera en dictée, là où on l'attend.
//
// Trouvé pour de vrai : au palier 2 de la séance 8, tous les items neutres
// portaient une virgule après le complément en tête, aucun des piégeants.

const groupes3 = new Map();
for (const ex of TOUS_EXERCICES) {
  if (ex.type === 'dictee' || !ex.piege) continue;
  const cle = `${ex.seance}|${ex.palier}|${ex.piege}`;
  const texte = `${ex.avant ?? ''}${ex.apres ?? ''}` || (ex.mots ?? []).join(' ');
  const g = groupes3.get(cle) ?? { neutres: [], piegeants: [] };
  g[ex.neutre ? 'neutres' : 'piegeants'].push(texte.includes(','));
  groupes3.set(cle, g);
}

for (const [cle, g] of groupes3) {
  // En dessous de deux de chaque, la coïncidence n'a rien de significatif.
  if (g.neutres.length < 2 || g.piegeants.length < 2) continue;
  const virguleSiNeutre = g.neutres.every(Boolean) && !g.piegeants.some(Boolean);
  const virguleSiPiege = !g.neutres.some(Boolean) && g.piegeants.every(Boolean);
  if (virguleSiNeutre || virguleSiPiege) {
    const [seance, palier, piege] = cle.split('|');
    dire(erreurs,
      `Séance ${seance}, palier ${palier}, piège « ${piege} » : la virgule sépare ` +
      `parfaitement les items neutres des piégeants. L'élève peut répondre juste ` +
      `sans chercher le sujet — ajoute un contre-exemple.`);
  }
}

// --- La réserve -------------------------------------------------------------
//
// La remédiation en début de séance et la seconde chance après une erreur
// exigent toutes deux une phrase JAMAIS VUE portant le même piège. Une séance
// jouée en entier consommant tous ses exercices, sans réserve il n'en reste
// aucune : la reprise ne se déclenche alors jamais. C'est arrivé, et ça n'a été
// vu qu'en simulant les vingt séances — d'où ce contrôle.

const RESERVE_MINIMALE = 3;

for (const [id, piege] of Object.entries(PIEGES)) {
  const duPiege = TOUS_EXERCICES.filter((e) => e.piege === id && e.type !== 'dictee');
  if (!duPiege.length) continue;
  // Seules les phrases piégeantes servent aux reprises (`!ex.neutre`).
  const reserve = duPiege.filter((e) => e.reserve && !e.neutre);
  if (reserve.length < RESERVE_MINIMALE) {
    dire(avertissements,
      `Piège « ${id} » : ${reserve.length} phrase(s) de réserve piégeantes, ` +
      `${RESERVE_MINIMALE} attendues. En dessous, la reprise s'épuise et se répète.`);
  }
}

// Une réserve doit rester en réserve : rattachée à un rappel existant de sa
// séance, sinon elle ne sera jamais proposée au bon moment.
for (const ex of TOUS_EXERCICES.filter((e) => e.reserve)) {
  if (ex.type === 'dictee') {
    dire(erreurs, `${ex.id} : une dictée ne peut pas servir de réserve (les reprises les excluent).`);
  }
  if (!ex.piege) {
    dire(erreurs, `${ex.id} : une phrase de réserve sans piège ne sera jamais reproposée.`);
  }
}

// --- Réserves trop proches d'un exercice existant ---------------------------
//
// Une réserve n'a qu'une raison d'être : proposer une phrase JAMAIS VUE quand
// l'élève doit réessayer. Si elle décalque un exercice du parcours, la seconde
// chance teste sa mémoire de la correction plutôt que la règle — exactement ce
// que la reprise cherche à éviter.
//
// Comparaison par mots pleins (les outils grammaticaux sont écartés : ils sont
// forcément communs à deux phrases qui travaillent le même piège).

const OUTILS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'au', 'aux', 'et', 'ou', 'en',
  'dans', 'sur', 'sous', 'pour', 'avec', 'par', 'vers', 'chez', 'depuis',
  'son', 'sa', 'ses', 'leur', 'leurs', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
  'ce', 'cet', 'cette', 'il', 'elle', 'ils', 'elles', 'je', 'tu', 'nous', 'vous',
  'on', 'qui', 'que', 'est', 'sont', 'ne', 'pas', 'plus', 'tout', 'toute', 'tous',
  'toutes', 'se', 'me', 'te', 'lui',
]);

const motsPleins = (ex) => {
  const brut = [ex.avant, ex.apres, ex.verbe, ex.texte, (ex.mots ?? []).join(' ')]
    .filter(Boolean).join(' ').toLowerCase();
  return new Set(
    brut.normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z' ]/g, ' ').split(/[\s']+/)
      .filter((m) => m.length > 2 && !OUTILS.has(m)),
  );
};

const ressemblance = (a, b) => {
  const commun = [...a].filter((m) => b.has(m)).length;
  const union = new Set([...a, ...b]).size;
  return union ? commun / union : 0;
};

const empreintes = TOUS_EXERCICES.map((ex) => ({ ex, mots: motsPleins(ex) }));

for (const r of empreintes.filter((e) => e.ex.reserve)) {
  for (const autre of empreintes) {
    // On ne dédoublonne le signalement qu'entre DEUX réserves : comparer une
    // réserve à un exercice joué doit se faire quel que soit l'ordre des
    // identifiants, sinon un clone parfait passe à travers.
    if (autre.ex.id === r.ex.id) continue;
    if (autre.ex.reserve && autre.ex.id < r.ex.id) continue;
    const s = ressemblance(r.mots, autre.mots);
    if (s >= 0.75) {
      dire(erreurs,
        `${r.ex.id} : réserve trop proche de ${autre.ex.id} (${Math.round(s * 100)} % de mots communs). ` +
        `Une réserve doit proposer une phrase neuve, sinon la seconde chance teste la mémoire.`);
    } else if (s >= 0.6) {
      dire(avertissements, `${r.ex.id} : ressemble à ${autre.ex.id} (${Math.round(s * 100)} %).`);
    }
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
const totalReserve = TOUS_EXERCICES.filter((e) => e.reserve).length;
const joues = totalExercices - totalReserve;
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
console.log(
  `  dont ${joues} joués dans le parcours (${(joues / SEANCES.length).toFixed(1)} par séance) ` +
  `et ${totalReserve} en réserve pour les reprises.`,
);
