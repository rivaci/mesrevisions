// Choisir les options du « Pourquoi as-tu choisi ça ? ».
//
// ── Pourquoi ce module existe ─────────────────────────────────────────────
//
// Les options étaient attachées au PIÈGE, et à lui seul. Elles s'affichaient
// donc telles quelles sur n'importe quel exercice du piège — y compris quand
// elles étaient impossibles. Sur « Touche le verbe conjugué », l'appli
// demandait à l'élève s'il s'était « trompé sur la terminaison » alors qu'il
// n'avait rien écrit : il avait désigné un mot. 153 exercices sur 574 étaient
// dans ce cas.
//
// Une option impossible ne fait pas que gêner : l'élève en coche une quand même,
// et ce choix part dans le journal, dans le bilan parents et dans ce que Merlin
// croit savoir de lui. Un diagnostic faux vaut moins que pas de diagnostic.
//
// Ce module ne garde donc que les options que la tâche rend possibles, et en
// ajoute deux que le catalogue ne pouvait pas prévoir : la faute de frappe,
// quand elle est crédible, et la réponse libre, quand Merlin peut la lire.

// Deux frontières, pas une.
//
// Certaines options supposent que l'élève a PRODUIT la forme : « j'ai oublié
// d'accorder » n'a de sens que s'il l'a écrite ou choisie.
const PRODUIT_UNE_FORME = new Set(['completer', 'qcm', 'dictee']);

// D'autres portent sur l'orthographe d'une forme écrite sans qu'il l'ait
// produite : sur « touche ce qui est mal écrit », « je mets toujours un -s avec
// tu » explique très bien pourquoi il n'a rien vu. C'est seulement quand il
// DÉSIGNE un mot qu'elles n'ont plus de prise — on ne pointe pas un sujet
// « parce que ça sonnait mieux ».
const CONCERNE_L_ECRIT = new Set([...PRODUIT_UNE_FORME, 'corriger']);

/**
 * Options communes aux tâches où l'on DÉSIGNE au lieu d'écrire. Le catalogue
 * des pièges n'en a pas : il a été écrit pour des exercices à trous, et les
 * exercices « touche le mot » sont venus après.
 */
const PAR_TACHE = {
  toucher: [
    { id: 'autre-mot', texte: 'J\'ai confondu avec un autre mot de la phrase',
      reponse: 'Relis la phrase en entier avant de toucher : le mot qui saute aux yeux n\'est pas toujours le bon.' },
    { id: 'trop-vite', texte: 'Je suis allé trop vite',
      reponse: 'Prends le temps de poser la question de la leçon avant de toucher. Aller vite ne fait pas gagner de temps ici.' },
  ],
  corriger: [
    { id: 'faute-non-vue', texte: 'Je n\'ai pas vu qu\'il y avait une faute',
      reponse: 'Relis en t\'arrêtant sur chaque verbe et chaque accord, un par un. Une faute ne se voit pas, elle se cherche.' },
    { id: 'faux-positif', texte: 'J\'ai touché un mot qui était correct',
      reponse: 'Avant de marquer un mot, vérifie avec quoi il s\'accorde. Si tu trouves le bon lien, le mot est juste.' },
  ],
};

const FRAPPE = {
  id: 'frappe',
  texte: 'J\'ai fait une faute de frappe',
  reponse: 'Ça arrive. Relis-toi une seconde avant de valider : c\'est le geste le moins cher qui existe.',
};

const LIBRE = {
  id: 'libre',
  texte: 'Aucune de ces réponses — je t\'explique',
  reponse: '',
};

// --- La faute de frappe est-elle crédible ? ---------------------------------
//
// C'est le point délicat. Proposée à tout coup, elle devient un bouton
// « j'esquive » plus flatteur que « au hasard », et le diagnostic s'effondre.
//
// La ligne de partage est pédagogique, pas orthographique : « jetes » pour
// « jettes » n'est PAS une faute de frappe, c'est exactement le piège de la
// séance. « jettse » en est une. Les deux sont pourtant à une lettre près.
//
// Ce qui les sépare : « jetes » reste une forme conjuguée plausible — même
// radical, terminaison connue. « jettse » n'en est pas une.

const TERMINAISONS = [
  'aient', 'erais', 'erait', 'eront', 'ions', 'iez', 'ais', 'ait', 'ons', 'ez',
  'ent', 'es', 'er', 'ée', 'és', 'ée', 'e', 's', 't', 'é', 'x', '',
];

const sansDoubles = (mot) => mot.replace(/(.)\1+/g, '$1');
const normaliser = (mot) => String(mot ?? '').trim().toLowerCase();

/** Le radical : le mot privé de la plus longue terminaison connue, doubles écrasées. */
function radical(mot) {
  for (const fin of TERMINAISONS) {
    if (fin && mot.endsWith(fin)) return sansDoubles(mot.slice(0, -fin.length));
  }
  return sansDoubles(mot);
}

/**
 * Distance de Damerau-Levenshtein, plafonnée : au-delà de `plafond`, la valeur
 * exacte ne nous intéresse pas. L'interversion compte pour 1 — c'est la faute
 * de frappe par excellence, et jamais un choix de conjugaison.
 */
export function distanceFrappe(a, b, plafond = 3) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > plafond) return plafond + 1;
  const lignes = [];
  for (let i = 0; i <= a.length; i += 1) lignes.push(new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) lignes[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) lignes[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cout = a[i - 1] === b[j - 1] ? 0 : 1;
      lignes[i][j] = Math.min(lignes[i - 1][j] + 1, lignes[i][j - 1] + 1, lignes[i - 1][j - 1] + cout);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        lignes[i][j] = Math.min(lignes[i][j], lignes[i - 2][j - 2] + 1);
      }
    }
  }
  return Math.min(lignes[a.length][b.length], plafond + 1);
}

/**
 * Ce qu'il a écrit est-il une forme plausible du même mot — donc un CHOIX de
 * conjugaison ou d'accord, et non un dérapage de doigt ?
 */
export function estFormePlausible(donnee, attendu) {
  const d = normaliser(donnee);
  const a = normaliser(attendu);
  if (!d || !a) return false;
  return radical(d) === radical(a);
}

/** La faute de frappe n'est proposée que si elle peut être vraie. */
export function frappeCredible(exercice, reponseDonnee) {
  // Seul un exercice à trou fait taper un mot. Une dictée en fait taper une
  // phrase entière : « faute de frappe » y couvrirait n'importe quoi.
  if (exercice?.type !== 'completer') return false;
  const donnee = normaliser(reponseDonnee);
  const attendu = normaliser(exercice.attendu);
  if (!donnee || !attendu || donnee === attendu) return false;
  if (estFormePlausible(donnee, attendu)) return false;
  return distanceFrappe(donnee, attendu) <= 2;
}

// --- La liste finale --------------------------------------------------------

/**
 * Les options à afficher, dans l'ordre : celles du piège que la tâche autorise,
 * celles propres à la tâche, la faute de frappe si elle est crédible, la
 * réponse libre si Merlin peut y répondre, et « au hasard » en dernier.
 *
 * « au hasard » reste toujours là et toujours en dernier : c'est le signal le
 * plus utile du bilan parents, et le seul qu'un enfant coche sans qu'on le lui
 * demande.
 */
export function optionsRaisonnement({ piege, exercice, reponseDonnee, avecMerlin = false }) {
  const toutes = piege?.raisonnements ?? [];
  const hasard = toutes.filter((r) => r.id === 'hasard');
  const type = exercice?.type;
  const possible = (r) => {
    if (r.exige === 'forme') return PRODUIT_UNE_FORME.has(type);
    if (r.exige === 'ecrit') return CONCERNE_L_ECRIT.has(type);
    return true;
  };

  const duPiege = toutes.filter((r) => r.id !== 'hasard' && possible(r));
  const deLaTache = PRODUIT_UNE_FORME.has(type) ? [] : (PAR_TACHE[type] ?? []);

  const options = [...duPiege, ...deLaTache];
  if (frappeCredible(exercice, reponseDonnee)) options.push(FRAPPE);
  if (avecMerlin) options.push(LIBRE);
  return [...options, ...hasard];
}
