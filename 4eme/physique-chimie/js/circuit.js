// Vérificateur topologique de circuit — le schéma est un graphe, pas une image.
//
// Ce que CEDRE 2024 mesure : 64 % des élèves branchent correctement un
// ampèremètre, 40 % seulement un voltmètre. Les deux gestes sont le même geste ;
// ce qui les sépare, c'est que le voltmètre se branche EN DÉRIVATION. Ce n'est
// donc pas la main qui échoue, c'est la LECTURE DE LA TOPOLOGIE. Un module qui
// répondrait vrai/faux raterait exactement l'information utile.
//
// D'où la forme du verdict : ce module ne renvoie pas un booléen, il renvoie une
// LISTE DE CONSTATS TYPÉS. « Ton schéma est faux » et « ton ampèremètre est en
// dérivation, il court-circuite la lampe L1 » ne sont pas deux formulations du
// même message : le premier ne se corrige pas, le second se corrige. Chaque
// constat porte un code stable et NOMME les dipôles concernés (invariant 7 : tout
// codeErreurCircuit a son message préécrit).
//
// ── Le graphe est la source de vérité (invariant 6) ─────────────────────────
//
// L'énoncé montré à l'élève est ENGENDRÉ par l'objet que voici : le dessin ne
// peut pas contredire la correction puisqu'il en dérive. Aucune fonction de ce
// module ne lit une image, une disposition ou une réponse saisie à la main ; la
// disposition (le tracé) est une donnée stockée à côté du graphe, jamais une
// autorité sur lui.
//
// ── Ce que ce module ne calcule pas, et pourquoi ────────────────────────────
//
// Aucune arithmétique. Pas une addition. Tous les prédicats sont des prédicats
// de graphe (connexité, degré, classes d'équivalence), donc l'exigence de
// rationnels exacts n'a rien à mordre ici : il n'y a pas de valeur physique à
// comparer. Le jour où l'on prédira ce que l'appareil AFFICHE (« et prévoir ce
// qu'il lira », ch. 7), ce calcul viendra du module d'arithmétique rationnelle,
// pas d'ici — un flottant ne peut pas entrer dans ce fichier parce qu'aucun
// nombre n'y entre.
//
// ── On refuse de corriger plutôt que de corriger de travers ─────────────────
//
// Trois fonctions renvoient `null` ou un `raison:` au lieu d'un verdict :
// `formeCanonique` sur un graphe non série-parallèle ou sans générateur unique,
// `memeCircuit` quand l'un des deux graphes est hors cadre, `diagnostiquer` sur
// un graphe invalide. Un cas non prévu doit rester distinguable d'une réponse
// fausse : compter faux un élève sur un cas que le vérificateur ne sait pas lire
// est exactement le faux négatif silencieux que la charte redoute pour la
// classe B.

// ── Le vocabulaire des dipôles ──────────────────────────────────────────────
//
// Convention de bornes, valable pour TOUT dipôle polarisé :
//
//     bornes = [ borne « − » (COM, noire) , borne « + » (rouge) ]
//
//   · pile        : le courant SORT par « + », il entre donc dans le circuit
//                   extérieur par bornes[1] ;
//   · ampèremètre : le courant doit ENTRER par « + » et ressortir par « COM » ;
//   · voltmètre   : « + » du côté du potentiel le plus haut.
//
// Le `fil` n'est pas un dipôle au sens physique : c'est une arête de résistance
// nulle, donc une identité entre deux nœuds. Il disparaît à la normalisation.

export const TYPES_DIPOLES = Object.freeze([
  'pile', 'lampe', 'moteur', 'interrupteur', 'resistance', 'amperemetre', 'voltmetre', 'fil',
]);

/** Les dipôles dont le sens de branchement est évalué.
 *
 *  Le moteur n'y figure pas volontairement : son sens de rotation dépend bien de
 *  la polarité, mais ce n'est un attendu d'aucun savoir-faire de 4e. L'y mettre
 *  compterait faux un schéma sur un aspect qu'on n'évalue pas. */
export const TYPES_POLARISES = Object.freeze(['pile', 'amperemetre', 'voltmetre']);

/** Les dipôles qui opposent une résistance — donc ceux qu'un chemin de
 *  résistance nulle peut court-circuiter. Un interrupteur ouvert « shunté » par
 *  un fil n'est pas un court-circuit, c'est un interrupteur inutile. */
export const TYPES_AVEC_RESISTANCE = Object.freeze(['pile', 'lampe', 'moteur', 'resistance']);

/** L'énuméré fermé de la charte (invariant 1). Chaque code de ce module s'y
 *  rattache par sa `famille` : le diagnostic est plus fin que l'énuméré — il
 *  distingue l'ampèremètre du voltmètre parce que le message à l'élève n'est pas
 *  le même — mais il ne peut pas en sortir. */
export const FAMILLES_CHARTE = Object.freeze([
  'APPAREIL_EN_DERIVATION', 'APPAREIL_EN_SERIE', 'COURT_CIRCUIT', 'CIRCUIT_OUVERT',
  'BORNE_INVERSEE', 'COMPOSANT_MANQUANT', 'COMPOSANT_EN_TROP', 'TOPOLOGIE_INCORRECTE',
]);

/** Les codes du diagnostic, chacun avec son message préécrit.
 *
 *  `gravite` ordonne les constats servis à l'élève : ce qui empêche le circuit de
 *  fonctionner (1) avant ce qui rend la mesure fausse (2), avant ce qui est
 *  seulement inutile (3). Sans cet ordre, « une lampe est isolée » pourrait
 *  s'afficher avant « la pile est court-circuitée ». */
export const CODES_ERREUR_CIRCUIT = Object.freeze({
  PAS_DE_GENERATEUR: {
    famille: 'COMPOSANT_MANQUANT', gravite: 1,
    message: "Il n'y a pas de générateur dans ce circuit. Sans pile, rien ne met "
      + 'le courant en mouvement : aucun dipôle ne fonctionne.',
  },
  GENERATEURS_OPPOSES: {
    famille: 'TOPOLOGIE_INCORRECTE', gravite: 1,
    message: 'Deux générateurs sont branchés en opposition : le « + » de l\'un fait '
      + 'face au « + » de l\'autre. Ils se contrarient au lieu de s\'ajouter.',
  },
  CIRCUIT_OUVERT: {
    famille: 'CIRCUIT_OUVERT', gravite: 1,
    message: "Le circuit n'est pas fermé : on ne peut pas partir d'une borne de la "
      + "pile et revenir à l'autre sans lever le crayon. Le courant ne circule nulle "
      + 'part — donc aucun dipôle ne fonctionne, pas seulement celui qui manque.',
  },
  COURT_CIRCUIT: {
    famille: 'COURT_CIRCUIT', gravite: 1,
    message: "Un chemin sans résistance relie directement les deux bornes d'un "
      + 'dipôle : le courant passe par là plutôt que par lui. Le dipôle ne '
      + "fonctionne pas, et si c'est la pile qui est court-circuitée, elle chauffe.",
  },
  AMPEREMETRE_EN_DERIVATION: {
    famille: 'APPAREIL_EN_DERIVATION', gravite: 1,
    message: "L'ampèremètre est branché en dérivation. Une intensité se mesure EN "
      + "SÉRIE : l'appareil doit être traversé par le courant qu'il mesure. Branché "
      + "en dérivation, il court-circuite le dipôle — c'est le branchement qui "
      + "détruit l'appareil.",
  },
  VOLTMETRE_EN_SERIE: {
    famille: 'APPAREIL_EN_SERIE', gravite: 2,
    message: 'Le voltmètre est branché en série. Une tension se mesure ENTRE deux '
      + 'points, donc EN DÉRIVATION, aux bornes du dipôle. Placé en série, il '
      + 'empêche le courant de passer et plus rien ne fonctionne.',
  },
  VOLTMETRE_AUX_MAUVAISES_BORNES: {
    famille: 'TOPOLOGIE_INCORRECTE', gravite: 2,
    message: 'Le voltmètre est bien en dérivation — le geste est bon — mais il '
      + "n'est pas aux bornes du dipôle demandé : il mesure la tension d'un autre.",
  },
  BORNE_INVERSEE: {
    famille: 'BORNE_INVERSEE', gravite: 2,
    message: "L'appareil est branché à l'envers : le courant doit entrer par sa "
      + 'borne « + » et ressortir par la borne « COM ». Dans l\'autre sens, il '
      + 'affiche une valeur négative.',
  },
  DIPOLE_ISOLE: {
    famille: 'TOPOLOGIE_INCORRECTE', gravite: 3,
    message: "Un dipôle n'est traversé par aucun courant : il n'appartient à aucune "
      + "boucle fermée passant par le générateur. Il est dessiné, mais il ne sert à rien.",
  },
  COMPOSANT_MANQUANT: {
    famille: 'COMPOSANT_MANQUANT', gravite: 2,
    message: 'Il manque un dipôle par rapport au circuit demandé.',
  },
  COMPOSANT_EN_TROP: {
    famille: 'COMPOSANT_EN_TROP', gravite: 2,
    message: "Le schéma comporte un dipôle qui n'était pas demandé.",
  },
  TOPOLOGIE_INCORRECTE: {
    famille: 'TOPOLOGIE_INCORRECTE', gravite: 2,
    message: 'Les dipôles sont les bons, mais ils ne sont pas reliés comme demandé : '
      + "ce n'est pas le même circuit.",
  },
});

// ── Normalisation ───────────────────────────────────────────────────────────
//
// Deux schémas topologiquement identiques mais dessinés différemment doivent
// être le même objet. Un fil est une arête de résistance nulle : le contracter
// fusionne ses deux nœuds. C'est toute la normalisation — le reste (permutation
// dans une branche série, orientation) est traité par la forme canonique.

function fusionneur() {
  const parent = new Map();
  const trouver = (x) => {
    if (!parent.has(x)) parent.set(x, x);
    let r = x;
    while (parent.get(r) !== r) r = parent.get(r);
    let c = x;
    while (parent.get(c) !== r) { const s = parent.get(c); parent.set(c, r); c = s; }
    return r;
  };
  const unir = (a, b) => { const ra = trouver(a); const rb = trouver(b); if (ra !== rb) parent.set(ra, rb); };
  return { trouver, unir };
}

const refus = (raison, details = []) => ({ ok: false, raison, details });

/**
 * Valide le graphe et contracte les fils.
 *
 * Refuse plutôt que de deviner : un dipôle sans identifiant, un type hors
 * énuméré ou un nombre de bornes différent de deux est une erreur de contenu, et
 * une erreur de contenu ne doit jamais ressortir en « réponse fausse ».
 */
export function normaliser(circuit) {
  const bruts = circuit?.dipoles;
  if (!Array.isArray(bruts) || bruts.length === 0) return refus('GRAPHE_VIDE');

  const vus = new Set();
  for (const d of bruts) {
    if (!d || typeof d.id !== 'string' || d.id === '') return refus('DIPOLE_SANS_ID');
    if (vus.has(d.id)) return refus('IDENTIFIANT_DUPLIQUE', [d.id]);
    vus.add(d.id);
    if (!TYPES_DIPOLES.includes(d.type)) return refus('TYPE_INCONNU', [d.id, String(d.type)]);
    if (!Array.isArray(d.bornes) || d.bornes.length !== 2
      || d.bornes.some((b) => typeof b !== 'string' || b === '')) return refus('BORNES_INVALIDES', [d.id]);
    if (d.type === 'interrupteur' && d.etat !== undefined
      && d.etat !== 'ouvert' && d.etat !== 'ferme') return refus('ETAT_INCONNU', [d.id, String(d.etat)]);
  }

  const { trouver, unir } = fusionneur();
  for (const d of bruts) { trouver(d.bornes[0]); trouver(d.bornes[1]); }
  for (const d of bruts) if (d.type === 'fil') unir(d.bornes[0], d.bornes[1]);

  const dipoles = [];
  const fils = [];
  for (const d of bruts) {
    const normalise = {
      id: d.id,
      nom: typeof d.nom === 'string' && d.nom !== '' ? d.nom : d.id,
      type: d.type,
      etat: d.type === 'interrupteur' ? (d.etat ?? 'ferme') : undefined,
      bornesOrigine: [d.bornes[0], d.bornes[1]],
      bornes: [trouver(d.bornes[0]), trouver(d.bornes[1])],
    };
    (d.type === 'fil' ? fils : dipoles).push(normalise);
  }

  const degre = new Map();
  const incidents = new Map();
  for (const d of dipoles) {
    for (const b of d.bornes) {
      degre.set(b, (degre.get(b) ?? 0) + 1);
      if (!incidents.has(b)) incidents.set(b, []);
      incidents.get(b).push(d.id);
    }
  }

  return {
    ok: true,
    dipoles,
    fils,
    noeuds: [...degre.keys()],
    degre,
    incidents,
    parId: new Map(dipoles.map((d) => [d.id, d])),
    noms: new Map([...dipoles, ...fils].map((d) => [d.id, d.nom])),
  };
}

/** Accepte indifféremment un graphe brut ou déjà normalisé — les fonctions
 *  publiques sont appelées depuis l'appli comme depuis les tests. */
const assurer = (x) => (x && x.ok === true && x.parId ? x : normaliser(x));

const nommer = (g, ids) => ids.map((id) => g.noms.get(id) ?? id);

// ── Les relations topologiques, calculées et non déclarées ──────────────────

const memeNoeud = (a, b) => (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0]);

/**
 * Série ou dérivation, avec une précédence qui n'est pas arbitraire.
 *
 * Deux dipôles seuls dans une boucle (une pile et une lampe) satisfont les DEUX
 * définitions : ils partagent un nœud de degré 2 et ils relient la même paire de
 * nœuds. Dire « la lampe est en dérivation sur la pile » serait enseigner le
 * mauvais mot pour le circuit le plus simple qui soit. La série l'emporte, et la
 * dérivation exige en plus qu'un des deux nœuds soit une vraie jonction
 * (degré ≥ 3) — c'est-à-dire qu'il y ait quelque chose à dériver.
 */
export function relationTopologique(circuit, idA, idB) {
  const g = assurer(circuit);
  if (!g.ok || idA === idB) return null;
  const a = g.parId.get(idA);
  const b = g.parId.get(idB);
  if (!a || !b) return null;
  const partages = a.bornes.filter((n) => b.bornes.includes(n));
  if (partages.some((n) => g.degre.get(n) === 2)) return 'SERIE';
  if (memeNoeud(a.bornes, b.bornes)
    && a.bornes.some((n) => g.degre.get(n) > 2)) return 'DERIVATION';
  return 'INDEPENDANTS';
}

export function sontEnSerie(circuit, idA, idB) {
  const r = relationTopologique(circuit, idA, idB);
  return r === null ? null : r === 'SERIE';
}

export function sontEnDerivation(circuit, idA, idB) {
  const r = relationTopologique(circuit, idA, idB);
  return r === null ? null : r === 'DERIVATION';
}

/** Les deux extrémités d'un ensemble de dipôles supposé former une chaîne.
 *
 *  `null` si ce n'est pas une chaîne simple (embranchement, morceaux
 *  disjoints, boucle fermée) : « la branche B » n'a alors pas de sens, et il
 *  vaut mieux ne rien répondre que de répondre sur une branche inventée. */
export function extremitesDeBranche(circuit, ids) {
  const g = assurer(circuit);
  if (!g.ok || !Array.isArray(ids) || ids.length === 0) return null;
  const membres = ids.map((id) => g.parId.get(id));
  if (membres.some((d) => !d)) return null;

  const occurrences = new Map();
  for (const d of membres) for (const n of d.bornes) occurrences.set(n, (occurrences.get(n) ?? 0) + 1);
  const bouts = [...occurrences].filter(([, n]) => n === 1).map(([n]) => n);
  if (bouts.length !== 2) return null;
  if ([...occurrences.values()].some((n) => n > 2)) return null;

  // Connexité : sans elle, deux dipôles isolés l'un de l'autre passeraient pour
  // une branche dès qu'ils ont deux bouts libres à eux deux.
  const { trouver, unir } = fusionneur();
  for (const d of membres) unir(d.bornes[0], d.bornes[1]);
  if (trouver(bouts[0]) !== trouver(bouts[1])) return null;
  return bouts;
}

/** « Le dipôle D est en série avec la branche B. » */
export function enSerieAvecBranche(circuit, id, idsBranche) {
  const g = assurer(circuit);
  if (!g.ok) return null;
  const d = g.parId.get(id);
  const bouts = extremitesDeBranche(g, idsBranche);
  if (!d || !bouts || idsBranche.includes(id)) return null;
  return bouts.some((n) => g.degre.get(n) === 2 && d.bornes.includes(n));
}

/** « Le voltmètre est en dérivation aux bornes de la lampe L2. »
 *  `cible` est un identifiant ou une branche entière (liste d'identifiants). */
export function enDerivationAuxBornesDe(circuit, id, cible) {
  const g = assurer(circuit);
  if (!g.ok) return null;
  const d = g.parId.get(id);
  if (!d) return null;
  const ids = Array.isArray(cible) ? cible : [cible];
  if (ids.includes(id)) return null;
  const bouts = ids.length === 1
    ? g.parId.get(ids[0])?.bornes
    : extremitesDeBranche(g, ids);
  if (!bouts) return null;
  return memeNoeud(d.bornes, bouts) && bouts.some((n) => g.degre.get(n) > 2);
}

/** Les branches maximales : les chaînes série que l'on peut parcourir sans
 *  rencontrer de jonction. Deux dipôles sont dans la même branche s'ils se
 *  suivent par des nœuds de degré 2. */
export function branches(circuit) {
  const g = assurer(circuit);
  if (!g.ok) return null;
  const { trouver, unir } = fusionneur();
  for (const d of g.dipoles) trouver(d.id);
  for (const [n, deg] of g.degre) {
    if (deg !== 2) continue;
    const [a, b] = g.incidents.get(n);
    unir(a, b);
  }
  const groupes = new Map();
  for (const d of g.dipoles) {
    const r = trouver(d.id);
    if (!groupes.has(r)) groupes.set(r, []);
    groupes.get(r).push(d);
  }
  return [...groupes.values()].map((membres) => {
    const bouts = [];
    for (const d of membres) for (const n of d.bornes) if (g.degre.get(n) !== 2) bouts.push(n);
    return {
      dipoles: membres.map((d) => d.id),
      extremites: bouts.length === 2 ? bouts : null,
    };
  });
}

// ── La forme canonique ──────────────────────────────────────────────────────
//
// La bonne équivalence n'est ni « à isomorphisme près » ni « à équivalence
// électrique près ». La charte tranche les deux erreurs :
//
//   · trop stricte — un cycle (pile, K, L, A) et un cycle (pile, K, A, L) ne
//     sont pas isomorphes comme cycles étiquetés. L'élève qui place
//     l'ampèremètre APRÈS la lampe au lieu d'avant aurait été compté faux, sur
//     le savoir-faire même pour lequel ce module existe. D'où : les enfants d'un
//     nœud SÉRIE sont un MULTI-ENSEMBLE TRIÉ, l'ordre ne compte pas.
//   · trop lâche — un ampèremètre idéal vaut un fil et un voltmètre idéal vaut
//     une branche absente : un schéma SANS APPAREIL DE MESURE aurait été
//     accepté. D'où : les dipôles sont des arêtes identifiées et NON
//     SUPPRIMABLES, chacun laisse sa trace dans la clé.
//
// Et la polarité est comparée : un ampèremètre monté à l'envers n'est pas le
// même circuit. On l'obtient sans travail supplémentaire en ancrant
// l'orientation sur le générateur — le réseau extérieur est orienté de la borne
// « + » vers la borne « − », c'est-à-dire DANS LE SENS DU COURANT.
//
// La réduction est série-parallèle, en temps linéaire, sans algorithme
// d'isomorphisme général. Un circuit de 4e est toujours série-parallèle ; un
// schéma d'élève peut ne pas l'être (pont, branche pendante, boucle morte), et
// dans ce cas la forme canonique est REFUSÉE plutôt qu'approchée.

const feuille = (d) => ({ sorte: 'DIPOLE', id: d.id, type: d.type, etat: d.etat, sens: 1 });

// Aplatir : sans quoi S(a, S(b, c)) et S(a, b, c) auraient des clés différentes
// alors que c'est la même branche série — et la permutation ne serait plus libre.
const noeudSerie = (enfants) => ({
  sorte: 'SERIE', enfants: enfants.flatMap((e) => (e.sorte === 'SERIE' ? e.enfants : [e])),
});
const noeudParallele = (enfants) => ({
  sorte: 'PARALLELE', enfants: enfants.flatMap((e) => (e.sorte === 'PARALLELE' ? e.enfants : [e])),
});

/** Retourner un sous-réseau retourne le sens de tous ses dipôles. L'ordre des
 *  enfants n'a pas à être inversé : ils sont triés à la sérialisation. */
function renverser(n) {
  if (n.sorte === 'DIPOLE') return { ...n, sens: -n.sens };
  return { sorte: n.sorte, enfants: n.enfants.map(renverser) };
}

function serialiser(n) {
  if (n.sorte === 'DIPOLE') {
    let cle = n.type;
    // L'état de l'interrupteur entre dans la clé : sans lui, « interrupteur
    // ouvert » et « interrupteur fermé » seraient le même circuit, alors que
    // l'un allume la lampe et l'autre non.
    if (n.type === 'interrupteur') cle += `:${n.etat}`;
    if (TYPES_POLARISES.includes(n.type)) cle += n.sens > 0 ? '>' : '<';
    return cle;
  }
  const enfants = n.enfants.map(serialiser).sort();
  return `${n.sorte === 'SERIE' ? 'S' : 'P'}(${enfants.join('|')})`;
}

function collecterSens(n, dans = new Map()) {
  if (n.sorte === 'DIPOLE') dans.set(n.id, n.sens);
  else for (const e of n.enfants) collecterSens(e, dans);
  return dans;
}

function compterParalleles(n) {
  if (n.sorte === 'DIPOLE') return 0;
  const propres = n.sorte === 'PARALLELE' ? 1 : 0;
  return propres + n.enfants.reduce((s, e) => s + compterParalleles(e), 0);
}

/** Un RÉCEPTEUR en série avec un bloc en dérivation.
 *
 *  C'est ce qui sépare le circuit mixte du circuit en dérivation, et compter les
 *  blocs parallèles ne suffit pas à le voir : « un interrupteur qui commande
 *  deux lampes en dérivation » et « une lampe traversée par tout le courant,
 *  puis deux lampes qui se le partagent » ont tous deux un seul bloc parallèle,
 *  et ne se qualifient pas de la même façon. L'interrupteur ne compte pas : il
 *  commande la dérivation sans en sortir. */
function recepteurEnSerieAvecUnParallele(n) {
  if (n.sorte === 'DIPOLE') return false;
  const propre = n.sorte === 'SERIE'
    && n.enfants.some((e) => e.sorte === 'PARALLELE')
    && n.enfants.some((e) => e.sorte === 'DIPOLE' && TYPES_AVEC_RESISTANCE.includes(e.type));
  return propre || n.enfants.some(recepteurEnSerieAvecUnParallele);
}

// La clé d'une paire de nœuds. `JSON.stringify` plutôt qu'un séparateur choisi :
// un nœud peut s'appeler « a b », et la paire (« a b », « c ») ne doit pas avoir la
// même clé que (« a », « b c ») : deux arêtes étrangères l'une à l'autre seraient
// réduites en parallèle, et un circuit série ressortirait en dérivation.
const cleDePaire = (a, b) => JSON.stringify([a, b].sort());

/**
 * La forme canonique du circuit, ou le refus motivé de la produire.
 *
 * Renvoie `{ cle, arbre, sens, pile }` ou `{ cle: null, raison }`. La clé est une
 * chaîne : deux circuits sont le même circuit si et seulement si leurs clés sont
 * égales — c'est tout ce dont `memeCircuit` a besoin.
 */
export function formeCanonique(circuit) {
  const g = assurer(circuit);
  if (!g.ok) return { cle: null, raison: g.raison, details: g.details };

  const piles = g.dipoles.filter((d) => d.type === 'pile');
  // Le générateur est l'ancre de l'orientation : sans lui, ou avec plusieurs,
  // il n'y a pas de sens du courant à comparer. On refuse — `diagnostiquer`, lui,
  // sait quoi dire de ces deux cas.
  if (piles.length === 0) return { cle: null, raison: 'PAS_DE_GENERATEUR' };
  if (piles.length > 1) return { cle: null, raison: 'PLUSIEURS_GENERATEURS' };

  const pile = piles[0];
  const depart = pile.bornes[1]; // borne « + » : le courant sort par là
  const arrivee = pile.bornes[0]; // borne « − » : il y revient
  if (depart === arrivee) return { cle: null, raison: 'GENERATEUR_EN_COURT_CIRCUIT' };

  let aretes = g.dipoles
    .filter((d) => d.id !== pile.id)
    .map((d) => ({ u: d.bornes[0], v: d.bornes[1], arbre: feuille(d) }));

  let progres = true;
  while (progres) {
    progres = false;

    // Parallèle : plusieurs arêtes entre les deux mêmes nœuds.
    const paires = new Map();
    for (const a of aretes) {
      if (a.u === a.v) continue;
      const cle = cleDePaire(a.u, a.v);
      if (!paires.has(cle)) paires.set(cle, []);
      paires.get(cle).push(a);
    }
    for (const groupe of paires.values()) {
      if (groupe.length < 2) continue;
      const { u, v } = groupe[0];
      const enfants = groupe.map((a) => (a.u === u ? a.arbre : renverser(a.arbre)));
      aretes = aretes.filter((a) => !groupe.includes(a));
      aretes.push({ u, v, arbre: noeudParallele(enfants) });
      progres = true;
      break;
    }
    if (progres) continue;

    // Série : un nœud interne de degré 2, qui n'est pas une borne du générateur.
    const degre = new Map();
    for (const a of aretes) for (const n of [a.u, a.v]) degre.set(n, (degre.get(n) ?? 0) + 1);
    for (const [n, deg] of degre) {
      if (n === depart || n === arrivee || deg !== 2) continue;
      const incidentes = aretes.filter((a) => a.u === n || a.v === n);
      // Une boucle sur elle-même donne un degré 2 avec une seule arête : ce n'est
      // pas une réduction série, c'est un dipôle court-circuité. On laisse la
      // réduction échouer plutôt que d'inventer.
      if (incidentes.length !== 2) continue;
      const [e1, e2] = incidentes;
      const arriveEnN = e1.v === n;
      const a1 = arriveEnN ? e1.arbre : renverser(e1.arbre);
      const u = arriveEnN ? e1.u : e1.v;
      const partDeN = e2.u === n;
      const a2 = partDeN ? e2.arbre : renverser(e2.arbre);
      const v = partDeN ? e2.v : e2.u;
      aretes = aretes.filter((a) => a !== e1 && a !== e2);
      aretes.push({ u, v, arbre: noeudSerie([a1, a2]) });
      progres = true;
      break;
    }
  }

  if (aretes.length !== 1) return { cle: null, raison: 'NON_SERIE_PARALLELE' };
  const [reste] = aretes;
  if (!memeNoeud([reste.u, reste.v], [depart, arrivee])) {
    return { cle: null, raison: 'NON_SERIE_PARALLELE' };
  }
  const exterieur = reste.u === depart ? reste.arbre : renverser(reste.arbre);
  return {
    cle: `pile[${serialiser(exterieur)}]`,
    arbre: exterieur,
    sens: collecterSens(exterieur),
    pile: pile.id,
  };
}

/**
 * Deux schémas sont-ils le même circuit ?
 *
 * `null` — jamais `false` — si l'un des deux sort du cadre série-parallèle :
 * l'appelant doit alors diagnostiquer, pas compter faux. C'est le même contrat
 * que `equivalentes` côté mathématiques.
 */
export function memeCircuit(circuitA, circuitB) {
  const a = formeCanonique(circuitA);
  const b = formeCanonique(circuitB);
  if (a.cle === null || b.cle === null) return null;
  return a.cle === b.cle;
}

/**
 * Le sens du courant dans chaque dipôle : `+1` de bornes[0] vers bornes[1],
 * `-1` dans l'autre sens.
 *
 * Pour le voltmètre — qu'aucun courant ne traverse — c'est le sens de la chute
 * de potentiel, donc l'information dont on a besoin pour dire si sa borne « + »
 * est du bon côté. Pour un dipôle d'une branche non parcourue (derrière un
 * interrupteur ouvert), c'est l'orientation géométrique, pas un courant réel.
 */
export function sensDuCourant(circuit) {
  const c = formeCanonique(circuit);
  if (c.cle === null) return null;
  // Dans le générateur, le courant va de « − » vers « + » : c'est ce qui donne
  // son sens à tout le reste, donc il vaut +1 par définition.
  return new Map([...c.sens, [c.pile, 1]]);
}

/** Un appareil de mesure est bien orienté quand le courant ENTRE par sa borne
 *  « + » : il le parcourt donc de bornes[1] vers bornes[0], soit `sens = -1`. */
const bienOriente = (sens) => sens === -1;

/**
 * Série, dérivation, ou mixte — la question posée à l'élève.
 *
 * Calculé sur le circuit privé de ses voltmètres : un voltmètre correctement
 * branché ajoute une maille, et un circuit série muni d'un voltmètre serait
 * déclaré « en dérivation ». La question porte sur le circuit, pas sur
 * l'appareil qu'on y a posé pour l'observer.
 *
 * MIXTE dès qu'un récepteur est en série avec un bloc en dérivation, et pas
 * seulement à partir de deux blocs : dire « en dérivation » d'un circuit où une
 * lampe est traversée par tout le courant compterait faux l'élève qui répond
 * « mixte », sur la question même qu'on lui pose.
 */
export function typeDeCircuit(circuit) {
  const g = assurer(circuit);
  if (!g.ok) return { type: null, raison: g.raison };
  // On repart des bornes DÉJÀ contractées : les fils ont disparu, il n'y a donc
  // plus rien à contracter et la topologie est celle du graphe normalisé.
  const dipoles = g.dipoles
    .filter((d) => d.type !== 'voltmetre')
    .map((d) => ({ id: d.id, nom: d.nom, type: d.type, etat: d.etat, bornes: d.bornes }));
  const c = formeCanonique({ dipoles });
  if (c.cle === null) return { type: null, raison: c.raison };
  const n = compterParalleles(c.arbre);
  const mixte = n >= 2 || recepteurEnSerieAvecUnParallele(c.arbre);
  return { type: n === 0 ? 'SERIE' : mixte ? 'MIXTE' : 'DERIVATION', paralleles: n };
}

// ── Le diagnostic ───────────────────────────────────────────────────────────
//
// Le cœur du module. Il ne répond pas « juste / faux » : il produit une liste de
// constats typés, ordonnés par gravité, chacun nommant les dipôles en cause.
//
// Deux constats peuvent porter sur le même geste sans faire double emploi :
// « ton ampèremètre est en dérivation » dit ce qu'il faut refaire, « la lampe L1
// est court-circuitée » dit ce que ça produit. Les fusionner ferait perdre l'un
// ou l'autre. En revanche TOPOLOGIE_INCORRECTE — « ce n'est pas le circuit
// demandé » — n'est servi que si RIEN de plus précis n'a pu être dit : c'est
// littéralement le constat par défaut, et le servir en présence d'un constat
// précis remettrait l'élève devant le verdict que ce module existe pour éviter.

const estResistanceNulle = (d) => d.type === 'fil' || d.type === 'amperemetre'
  || (d.type === 'interrupteur' && d.etat === 'ferme');

/** Les classes de nœuds reliés par de la résistance nulle, calculées sur les
 *  bornes D'ORIGINE : c'est ce qui permet de nommer les fils fautifs, alors que
 *  la normalisation les a justement fait disparaître. */
function classesResistanceNulle(g) {
  const { trouver, unir } = fusionneur();
  for (const d of [...g.dipoles, ...g.fils]) {
    trouver(d.bornesOrigine[0]);
    trouver(d.bornesOrigine[1]);
    if (estResistanceNulle(d)) unir(d.bornesOrigine[0], d.bornesOrigine[1]);
  }
  return trouver;
}

/** Le chemin de résistance nulle qui relie deux nœuds, en dipôles — c'est lui
 *  qu'on montre à l'élève : « le fil F et l'ampèremètre A court-circuitent L1 ». */
function cheminResistanceNulle(g, a, b) {
  if (a === b) return [];
  const conducteurs = [...g.dipoles, ...g.fils].filter(estResistanceNulle);
  const venuDe = new Map([[a, null]]);
  const file = [a];
  while (file.length) {
    const n = file.shift();
    for (const d of conducteurs) {
      const [x, y] = d.bornesOrigine;
      const autre = x === n ? y : (y === n ? x : null);
      if (autre === null || venuDe.has(autre)) continue;
      venuDe.set(autre, { via: d.id, depuis: n });
      if (autre === b) {
        const chemin = [];
        for (let c = b; venuDe.get(c); c = venuDe.get(c).depuis) chemin.push(venuDe.get(c).via);
        return chemin.reverse();
      }
      file.push(autre);
    }
  }
  return [];
}

/** Deux nœuds sont-ils reliés par ces dipôles ? (bornes normalisées) */
function relie(dipoles, a, b) {
  const { trouver, unir } = fusionneur();
  trouver(a);
  trouver(b);
  for (const d of dipoles) unir(d.bornes[0], d.bornes[1]);
  return trouver(a) === trouver(b);
}

/** Parcourt une chaîne série d'un bout à l'autre et donne le sens de chaque
 *  dipôle par rapport à ce parcours. Sert à comparer deux générateurs entre eux,
 *  cas où la forme canonique ne peut pas aider — elle exige une pile unique. */
function parcourirChaine(g, ids) {
  const membres = ids.map((id) => g.parId.get(id));
  const occurrences = new Map();
  for (const d of membres) for (const n of d.bornes) occurrences.set(n, (occurrences.get(n) ?? 0) + 1);
  const depart = [...occurrences].find(([, n]) => n === 1)?.[0] ?? membres[0].bornes[0];
  const restants = new Set(ids);
  const ordre = [];
  let noeud = depart;
  while (restants.size) {
    const suivant = membres.find((d) => restants.has(d.id) && d.bornes.includes(noeud));
    if (!suivant) return null;
    restants.delete(suivant.id);
    const sens = suivant.bornes[0] === noeud ? 1 : -1;
    ordre.push({ id: suivant.id, sens });
    noeud = suivant.bornes[0] === noeud ? suivant.bornes[1] : suivant.bornes[0];
  }
  return ordre;
}

const enumerer = (noms) => (noms.length <= 1 ? (noms[0] ?? '')
  : `${noms.slice(0, -1).join(', ')} et ${noms[noms.length - 1]}`);

/**
 * Le diagnostic complet d'un schéma.
 *
 * `attendu` est facultatif et porte ce que l'exercice demandait :
 *   { graphe, mesure: { appareil, auxBornesDe } }
 * — `graphe` étant le circuit demandé (le même objet formel que celui qui a
 * engendré l'énoncé), `auxBornesDe` un identifiant de dipôle ou une branche.
 *
 * Rend `{ ok: false, raison }` sans aucun constat sur toute erreur de contenu —
 * schéma illisible, `graphe` demandé illisible (`ATTENDU_INVALIDE`), appareil de
 * mesure qui n'est pas un voltmètre (`MESURE_HORS_VOLTMETRE`). Ne lève jamais.
 */
export function diagnostiquer(circuit, attenduBrut = {}) {
  const attendu = attenduBrut ?? {};
  const g = assurer(circuit);
  // Un graphe invalide est une erreur de CONTENU, pas une réponse fausse : il
  // ressort avec `ok: false` et ne produit aucun constat, pour rester
  // distinguable d'un schéma d'élève qu'on saurait corriger.
  if (!g.ok) return { ok: false, raison: g.raison, details: g.details, constats: [] };

  // ── L'énoncé est-il lisible ? ─────────────────────────────────────────────
  //
  // Symétrique du contrôle précédent, et plus coûteux à omettre : un `attendu`
  // illisible taisait toute comparaison et rendait « aucun constat », ce qui se
  // lit exactement comme « le schéma est juste ». Un élève aurait été validé
  // sans que rien n'ait été comparé — le faux positif silencieux, cette fois du
  // côté de l'énoncé.
  const cible = attendu.graphe === undefined ? undefined : assurer(attendu.graphe);
  if (cible && !cible.ok) {
    return {
      ok: false, raison: 'ATTENDU_INVALIDE', details: [cible.raison, ...cible.details], constats: [],
    };
  }
  const mesure = attendu.mesure;
  const cibles = mesure?.auxBornesDe === undefined ? []
    : (Array.isArray(mesure.auxBornesDe) ? mesure.auxBornesDe : [mesure.auxBornesDe]);
  const appareil = mesure?.appareil && cibles.length ? g.parId.get(mesure.appareil) : undefined;
  // « Mesurer la tension aux bornes de X avec une lampe » n'est pas une réponse
  // fausse, c'est un énoncé faux. Le taire mettrait l'erreur au compte de l'élève.
  if (appareil && appareil.type !== 'voltmetre') {
    return {
      ok: false, raison: 'MESURE_HORS_VOLTMETRE', details: [mesure.appareil, appareil.type], constats: [],
    };
  }

  const constats = [];
  const ajouter = (code, dipoles, precision) => {
    const def = CODES_ERREUR_CIRCUIT[code];
    constats.push({
      code, famille: def.famille, gravite: def.gravite, message: def.message, precision, dipoles,
    });
  };
  const dejaMisEnCause = (id) => constats.some((c) => c.dipoles[0] === id);

  const piles = g.dipoles.filter((d) => d.type === 'pile');
  const lesBranches = branches(g);
  const brancheDe = new Map();
  for (const b of lesBranches) for (const id of b.dipoles) brancheDe.set(id, b);

  // ── Le générateur ─────────────────────────────────────────────────────────
  if (piles.length === 0) {
    ajouter('PAS_DE_GENERATEUR', [], 'Aucun générateur ne figure sur le schéma.');
  }

  if (piles.length > 1) {
    const opposes = [];
    // Deux piles d'une même branche série : on parcourt la branche et on compare
    // le sens de traversée.
    for (const b of lesBranches) {
      const dedans = b.dipoles.filter((id) => g.parId.get(id).type === 'pile');
      if (dedans.length < 2) continue;
      const ordre = parcourirChaine(g, b.dipoles);
      if (!ordre) continue;
      const sens = new Map(ordre.map((e) => [e.id, e.sens]));
      for (let i = 0; i < dedans.length; i += 1) {
        for (let j = i + 1; j < dedans.length; j += 1) {
          if (sens.get(dedans[i]) !== sens.get(dedans[j])) opposes.push([dedans[i], dedans[j]]);
        }
      }
    }
    // Deux piles en dérivation : opposées si leurs bornes « + » ne sont pas sur
    // le même nœud.
    for (let i = 0; i < piles.length; i += 1) {
      for (let j = i + 1; j < piles.length; j += 1) {
        const [a, b] = [piles[i], piles[j]];
        if (memeNoeud(a.bornes, b.bornes) && a.bornes[1] !== b.bornes[1]) opposes.push([a.id, b.id]);
      }
    }
    for (const paire of opposes) {
      ajouter('GENERATEURS_OPPOSES', paire,
        `${enumerer(nommer(g, paire))} sont montés tête-bêche.`);
    }
  }

  // ── Le circuit est-il fermé ? ─────────────────────────────────────────────
  //
  // Le graphe de conduction exclut les voltmètres (idéaux : aucun courant ne les
  // traverse) et les interrupteurs ouverts. C'est sur lui que se lit « une boucle
  // fermée passant par le générateur ».
  const ouverts = g.dipoles.filter((d) => d.type === 'interrupteur' && d.etat === 'ouvert');
  const voltmetres = g.dipoles.filter((d) => d.type === 'voltmetre');
  const conduction = g.dipoles.filter((d) => d.type !== 'voltmetre'
    && !(d.type === 'interrupteur' && d.etat === 'ouvert'));

  for (const P of piles) {
    const sansLaPile = conduction.filter((d) => d.id !== P.id);
    if (relie(sansLaPile, P.bornes[0], P.bornes[1])) continue;
    // Nommer la cause plutôt que le symptôme : ce qui, remis dans le circuit, le
    // refermerait. Un pont qui reste indispensable est la coupure elle-même.
    const causes = [];
    const essayer = (ajouts) => {
      const avec = sansLaPile.concat(ajouts);
      if (!relie(avec, P.bornes[0], P.bornes[1])) return false;
      for (const d of ajouts) {
        if (!relie(avec.filter((x) => x.id !== d.id), P.bornes[0], P.bornes[1])) causes.push(d.id);
      }
      return true;
    };
    if (!essayer(ouverts)) essayer(voltmetres);
    ajouter('CIRCUIT_OUVERT', [P.id, ...causes], causes.length
      ? `La boucle est interrompue par ${enumerer(nommer(g, causes))}.`
      : `Aucune boucle ne part de ${g.noms.get(P.id)} et n'y revient.`);
  }
  const circuitOuvert = constats.some((c) => c.code === 'CIRCUIT_OUVERT');

  // ── L'ampèremètre ─────────────────────────────────────────────────────────
  //
  // Ce bloc passe AVANT les court-circuits, à gravité égale : un ampèremètre en
  // dérivation en produit un, et l'élève doit lire le geste à corriger avant
  // d'en lire la conséquence. « La lampe L1 est court-circuitée » ne dit pas
  // quoi refaire ; « ton ampèremètre est en dérivation » le dit.
  //
  // Le critère n'est pas « il relie deux nœuds de jonction » : un ampèremètre
  // placé EN SÉRIE dans une branche d'un circuit en dérivation est correct, et
  // ce critère l'aurait compté faux. C'est le geste physique qui décide :
  // l'ampèremètre est mal placé quand sa branche ne contient aucun dipôle
  // résistant et qu'une autre branche relie les mêmes nœuds — autrement dit
  // quand il court-circuite cette branche au lieu d'être traversé par elle.
  for (const A of g.dipoles.filter((d) => d.type === 'amperemetre')) {
    const b = brancheDe.get(A.id);
    if (!b.extremites) continue;
    if (!b.dipoles.every((id) => estResistanceNulle(g.parId.get(id)))) continue;
    const paralleles = lesBranches.filter((x) => x !== b && x.extremites
      && memeNoeud(x.extremites, b.extremites));
    if (paralleles.length === 0) continue;
    const shunte = paralleles.find((x) => !x.dipoles.some((id) => g.parId.get(id).type === 'pile'))
      ?? paralleles[0];
    ajouter('AMPEREMETRE_EN_DERIVATION', [A.id, ...shunte.dipoles],
      `${g.noms.get(A.id)} est branché aux bornes de ${enumerer(nommer(g, shunte.dipoles))}, `
      + 'au lieu d\'être inséré dans le circuit.');
  }

  // ── Les court-circuits ────────────────────────────────────────────────────
  const classeZero = classesResistanceNulle(g);
  for (const d of g.dipoles) {
    if (!TYPES_AVEC_RESISTANCE.includes(d.type)) continue;
    if (classeZero(d.bornesOrigine[0]) !== classeZero(d.bornesOrigine[1])) continue;
    const chemin = cheminResistanceNulle(g, d.bornesOrigine[0], d.bornesOrigine[1]);
    ajouter('COURT_CIRCUIT', [d.id, ...chemin], chemin.length
      ? `${enumerer(nommer(g, chemin))} relie${chemin.length > 1 ? 'nt' : ''} directement les deux bornes de ${g.noms.get(d.id)}.`
      : `Les deux bornes de ${g.noms.get(d.id)} sont reliées entre elles.`);
  }

  // ── Le voltmètre ──────────────────────────────────────────────────────────
  //
  // En série ⟺ il partage un nœud de degré 2, c'est-à-dire qu'il est inséré dans
  // une chaîne au lieu d'être posé en travers.
  for (const V of voltmetres) {
    const noeud = V.bornes.find((n) => g.degre.get(n) === 2);
    if (noeud === undefined) continue;
    const voisins = g.incidents.get(noeud).filter((id) => id !== V.id);
    ajouter('VOLTMETRE_EN_SERIE', [V.id, ...voisins],
      `${g.noms.get(V.id)} est inséré dans le circuit, à la suite de ${enumerer(nommer(g, voisins))}.`);
  }

  if (mesure?.appareil && cibles.length) {
    // Un dipôle dont la mesure dépend et qui ne figure pas sur le schéma est un
    // composant manquant — pas un silence. C'est le cas de l'élève qui n'a
    // simplement pas dessiné le voltmètre : sans ce constat, son schéma
    // ressortait sans aucune remarque.
    const absents = [mesure.appareil, ...cibles].filter((id) => !g.parId.get(id));
    if (absents.length) {
      ajouter('COMPOSANT_MANQUANT', absents,
        `${enumerer(nommer(g, absents))} ne figure${absents.length > 1 ? 'nt' : ''} pas sur le schéma, `
        + 'alors que la mesure demandée en dépend.');
    } else if (!dejaMisEnCause(appareil.id)
      && enDerivationAuxBornesDe(g, appareil.id, mesure.auxBornesDe) === false) {
      // Ce que le voltmètre mesure VRAIMENT, et non la liste de tout ce qui est
      // aux mêmes bornes que lui : la branche du générateur l'est par
      // construction, et la nommer ferait lire à l'élève qu'il a mesuré le
      // circuit entier. Le constat cesserait alors de se corriger.
      const memesBornes = lesBranches.filter((b) => b.extremites
        && memeNoeud(b.extremites, appareil.bornes) && !b.dipoles.includes(appareil.id));
      const reel = (memesBornes.find((b) => !b.dipoles.some((id) => g.parId.get(id).type === 'pile'))
        ?? memesBornes[0])?.dipoles ?? [];
      ajouter('VOLTMETRE_AUX_MAUVAISES_BORNES', [appareil.id, ...cibles],
        `${g.noms.get(appareil.id)} mesure la tension aux bornes de `
        + `${reel.length ? enumerer(nommer(g, reel)) : 'quelque chose d\'autre'}, `
        + `pas de ${enumerer(nommer(g, cibles))}.`);
    }
  }

  // ── Le sens de branchement des appareils ──────────────────────────────────
  //
  // Indécidable sans forme canonique (il faut un sens du courant), donc muet
  // plutôt qu'approximatif quand le circuit sort du cadre série-parallèle. Un
  // appareil déjà signalé mal placé n'est pas jugé sur son sens : lui reprocher
  // deux choses à la fois brouillerait la seule qui compte.
  const sens = sensDuCourant(g);
  if (sens) {
    for (const d of g.dipoles) {
      if (d.type !== 'amperemetre' && d.type !== 'voltmetre') continue;
      if (dejaMisEnCause(d.id)) continue;
      const s = sens.get(d.id);
      if (s === undefined || bienOriente(s)) continue;
      ajouter('BORNE_INVERSEE', [d.id],
        `Le courant entre dans ${g.noms.get(d.id)} par sa borne « COM » au lieu de la borne « + ».`);
    }
  }

  // ── Les dipôles que rien ne traverse ──────────────────────────────────────
  //
  // Un dipôle est traversé s'il appartient à une boucle passant par un
  // générateur. Le constat est tu quand le circuit est ouvert : tous les dipôles
  // le seraient alors, et l'énumération noierait le seul constat utile.
  if (piles.length > 0 && !circuitOuvert) {
    for (const d of conduction) {
      // Bornes confondues : le dipôle est court-circuité, pas isolé — et
      // COURT_CIRCUIT l'a déjà dit avec le bon mot.
      if (d.bornes[0] === d.bornes[1]) continue;
      let traverse = false;
      if (d.type === 'pile') {
        traverse = relie(conduction.filter((x) => x.id !== d.id), d.bornes[0], d.bornes[1]);
      } else {
        for (const P of piles) {
          const reste = conduction.filter((x) => x.id !== d.id && x.id !== P.id);
          traverse = (relie(reste, d.bornes[0], P.bornes[0]) && relie(reste, d.bornes[1], P.bornes[1]))
            || (relie(reste, d.bornes[0], P.bornes[1]) && relie(reste, d.bornes[1], P.bornes[0]));
          if (traverse) break;
        }
      }
      if (!traverse) {
        ajouter('DIPOLE_ISOLE', [d.id],
          `${g.noms.get(d.id)} n'est sur aucune boucle passant par le générateur.`);
      }
    }
  }

  // ── La comparaison au circuit demandé ─────────────────────────────────────
  let conforme;
  if (cible) {
    const compter = (x) => {
      const m = new Map();
      for (const d of x.dipoles) m.set(d.type, (m.get(d.type) ?? 0) + 1);
      return m;
    };
    const ici = compter(g);
    const la = compter(cible);
    for (const type of new Set([...ici.keys(), ...la.keys()])) {
      const ecart = (ici.get(type) ?? 0) - (la.get(type) ?? 0);
      if (ecart < 0) {
        ajouter('COMPOSANT_MANQUANT', [],
          `Il manque ${-ecart} ${type} par rapport au circuit demandé.`);
      } else if (ecart > 0) {
        const surnombre = g.dipoles.filter((d) => d.type === type).map((d) => d.id);
        ajouter('COMPOSANT_EN_TROP', surnombre,
          `Il y a ${ecart} ${type} de trop : ${enumerer(nommer(g, surnombre))}.`);
      }
    }
    conforme = memeCircuit(g, cible);
    if (conforme === false && constats.length === 0) {
      ajouter('TOPOLOGIE_INCORRECTE', [],
        'Les dipôles sont les bons, mais les liaisons ne sont pas celles demandées.');
    }
  }

  constats.sort((a, b) => a.gravite - b.gravite);
  const canonique = formeCanonique(g);
  return {
    ok: true,
    constats,
    codes: constats.map((c) => c.code),
    conforme,
    cle: canonique.cle,
    raisonCanonique: canonique.cle === null ? canonique.raison : undefined,
    type: typeDeCircuit(g),
  };
}

// ── Les cas-témoins ─────────────────────────────────────────────────────────
//
// « La classe B garantit l'accord entre l'énoncé et la correction. Elle ne
// garantit PAS la justesse du comparateur : décider que deux graphes de circuit
// sont équivalents est un programme non trivial, écrit à la main, que rien ne
// teste. Un bug y produirait des faux négatifs silencieux sur toute une famille
// de savoir-faire. » C'est la contre-mesure de la charte, et la voici :
//
//   · deux schémas électriquement équivalents mais dessinés différemment,
//   · deux schémas non équivalents et de même allure,
//   · un cas par code d'erreur diagnostiqué.
//
// Un vérificateur non testé ne vaut rien — et celui-ci décide de l'acquisition
// du seul savoir-faire pour lequel il a été écrit.

const dip = (id, type, moins, plus, extra = {}) => ({ id, type, bornes: [moins, plus], ...extra });

// Le circuit de référence : pile, interrupteur fermé, lampe.
const SERIE_CANONIQUE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
  ],
};

// Le même, dessiné autrement : autres noms de nœuds, deux fils de liaison, et
// les dipôles rencontrés dans l'autre ordre.
const SERIE_AUTRE_DESSIN = {
  dipoles: [
    dip('G', 'pile', 'x1', 'x2'),
    dip('f1', 'fil', 'x2', 'x3'),
    dip('inter', 'interrupteur', 'x3', 'x4', { etat: 'ferme' }),
    dip('f2', 'fil', 'x4', 'x5'),
    dip('lampe', 'lampe', 'x5', 'x1'),
  ],
};

const PILE_ET_LAMPE = {
  dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a')],
};

// Même allure, circuits différents : deux lampes en série, deux lampes en
// dérivation. C'est le couple que le comparateur ne doit surtout pas confondre.
const SERIE_DEUX_LAMPES = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('L2', 'lampe', 'c', 'a'),
  ],
};
const DERIVATION_DEUX_LAMPES = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'a'),
    dip('L2', 'lampe', 'b', 'a'),
  ],
};

const DERIVATION_AVEC_INTERRUPTEUR = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
    dip('L1', 'lampe', 'c', 'd'),
    dip('L2', 'lampe', 'c', 'd'),
    dip('f', 'fil', 'd', 'a'),
  ],
};

const MIXTE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('L2', 'lampe', 'b', 'c'),
    dip('L3', 'lampe', 'c', 'a'),
    dip('L4', 'lampe', 'c', 'a'),
  ],
};

// Ampèremètre en série, bien orienté : le courant sort de la pile par « b »,
// entre dans A par sa borne « + » et ressort par « COM ».
const AMPEREMETRE_CORRECT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('A', 'amperemetre', 'c', 'b'),
    dip('L1', 'lampe', 'c', 'd'),
    dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
  ],
};
const AMPEREMETRE_INVERSE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('A', 'amperemetre', 'b', 'c'),
    dip('L1', 'lampe', 'c', 'd'),
    dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
  ],
};

// L'erreur symétrique, et la plus dangereuse : l'ampèremètre posé en travers de
// la lampe. Il la court-circuite — et court-circuite la pile par la même
// occasion, ce que le diagnostic doit dire séparément.
const AMPEREMETRE_EN_DERIVATION = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
    dip('A', 'amperemetre', 'c', 'b'),
  ],
};

const VOLTMETRE_CORRECT = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
    dip('V', 'voltmetre', 'c', 'b'),
  ],
};

// L'erreur des 60 % : le voltmètre inséré dans le circuit.
const VOLTMETRE_INSERE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('V', 'voltmetre', 'c', 'a'),
  ],
};

// Le geste est bon, la cible ne l'est pas : en dérivation, mais sur L1 quand on
// demandait L2. Sans ce cas, « en dérivation » suffirait à valider.
const VOLTMETRE_MAUVAISES_BORNES = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('L2', 'lampe', 'c', 'd'),
    dip('K', 'interrupteur', 'd', 'a', { etat: 'ferme' }),
    dip('V', 'voltmetre', 'c', 'b'),
  ],
};

const CIRCUIT_OUVERT_PAR_INTERRUPTEUR = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ouvert' }),
  ],
};

const COURT_CIRCUIT_PAR_FIL = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
    dip('F', 'fil', 'b', 'c'),
  ],
};

// Deux lampes et un interrupteur, et rien pour les alimenter. La boucle est
// fermée : c'est bien l'absence de générateur, et elle seule, qu'on veut voir
// signalée. (Une seule lampe et l'interrupteur suffiraient à fermer la boucle,
// mais l'interrupteur serait alors en travers de la lampe et la
// court-circuiterait — un court-circuit n'a pas besoin de générateur pour en
// être un, et le cas-témoin doit isoler un constat à la fois.)
const SANS_GENERATEUR = {
  dipoles: [
    dip('L1', 'lampe', 'a', 'b'),
    dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
    dip('L2', 'lampe', 'c', 'a'),
  ],
};

// Deux piles montées tête-bêche : les deux bornes « + » se font face.
const PILES_OPPOSEES = {
  dipoles: [
    dip('P1', 'pile', 'a', 'b'),
    dip('P2', 'pile', 'c', 'b'),
    dip('L1', 'lampe', 'c', 'a'),
  ],
};

const AVEC_DIPOLE_ISOLE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
    dip('L2', 'lampe', 'c', 'd'),
  ],
};

// Le cas exact que la charte donne comme contre-exemple à « isomorphisme près » :
// (pile, K, L, A) et (pile, K, A, L). C'est le même circuit ; l'élève qui place
// l'ampèremètre après la lampe au lieu d'avant a raison.
const ORDRE_LAMPE_PUIS_AMPEREMETRE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
    dip('L1', 'lampe', 'c', 'd'),
    dip('A', 'amperemetre', 'a', 'd'),
  ],
};
const ORDRE_AMPEREMETRE_PUIS_LAMPE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
    dip('A', 'amperemetre', 'd', 'c'),
    dip('L1', 'lampe', 'd', 'a'),
  ],
};

export const CAS_TEMOINS = Object.freeze({
  circuits: Object.freeze([
    { nom: 'série canonique', graphe: SERIE_CANONIQUE, codes: [], type: 'SERIE' },
    { nom: 'série, autre dessin', graphe: SERIE_AUTRE_DESSIN, codes: [], type: 'SERIE' },
    { nom: 'deux lampes en série', graphe: SERIE_DEUX_LAMPES, codes: [], type: 'SERIE' },
    { nom: 'deux lampes en dérivation', graphe: DERIVATION_DEUX_LAMPES, codes: [], type: 'DERIVATION' },
    { nom: 'dérivation commandée par un interrupteur', graphe: DERIVATION_AVEC_INTERRUPTEUR, codes: [], type: 'DERIVATION' },
    { nom: 'circuit mixte', graphe: MIXTE, codes: [], type: 'MIXTE' },
    { nom: 'ampèremètre en série, bien orienté', graphe: AMPEREMETRE_CORRECT, codes: [], type: 'SERIE' },
    { nom: 'ampèremètre à l\'envers', graphe: AMPEREMETRE_INVERSE, codes: ['BORNE_INVERSEE'], type: 'SERIE' },
    {
      nom: 'ampèremètre en dérivation',
      graphe: AMPEREMETRE_EN_DERIVATION,
      codes: ['AMPEREMETRE_EN_DERIVATION', 'COURT_CIRCUIT', 'COURT_CIRCUIT'],
      type: 'DERIVATION',
    },
    { nom: 'voltmètre en dérivation aux bonnes bornes', graphe: VOLTMETRE_CORRECT, codes: [], type: 'SERIE' },
    {
      nom: 'voltmètre en série',
      graphe: VOLTMETRE_INSERE,
      codes: ['VOLTMETRE_EN_SERIE', 'CIRCUIT_OUVERT'],
      type: null,
    },
    {
      nom: 'voltmètre aux mauvaises bornes',
      graphe: VOLTMETRE_MAUVAISES_BORNES,
      attendu: { mesure: { appareil: 'V', auxBornesDe: 'L2' } },
      codes: ['VOLTMETRE_AUX_MAUVAISES_BORNES'],
      type: 'SERIE',
    },
    { nom: 'interrupteur ouvert', graphe: CIRCUIT_OUVERT_PAR_INTERRUPTEUR, codes: ['CIRCUIT_OUVERT'], type: 'SERIE' },
    {
      nom: 'lampe court-circuitée par un fil',
      graphe: COURT_CIRCUIT_PAR_FIL,
      codes: ['COURT_CIRCUIT', 'COURT_CIRCUIT'],
      type: null,
      canoniqueRefusee: true,
    },
    { nom: 'aucun générateur', graphe: SANS_GENERATEUR, codes: ['PAS_DE_GENERATEUR'], type: null },
    { nom: 'deux piles tête-bêche', graphe: PILES_OPPOSEES, codes: ['GENERATEURS_OPPOSES'], type: null },
    {
      nom: 'lampe pendante',
      graphe: AVEC_DIPOLE_ISOLE,
      codes: ['DIPOLE_ISOLE'],
      type: null,
      canoniqueRefusee: true,
    },
    {
      nom: 'une lampe manquante',
      graphe: PILE_ET_LAMPE,
      attendu: { graphe: SERIE_DEUX_LAMPES },
      codes: ['COMPOSANT_MANQUANT'],
      type: 'SERIE',
    },
    {
      nom: 'une lampe en trop',
      graphe: SERIE_DEUX_LAMPES,
      attendu: { graphe: PILE_ET_LAMPE },
      codes: ['COMPOSANT_EN_TROP'],
      type: 'SERIE',
    },
    {
      nom: 'bons dipôles, mauvaises liaisons',
      graphe: DERIVATION_DEUX_LAMPES,
      attendu: { graphe: SERIE_DEUX_LAMPES },
      codes: ['TOPOLOGIE_INCORRECTE'],
      type: 'DERIVATION',
    },
    { nom: 'lampe puis ampèremètre', graphe: ORDRE_LAMPE_PUIS_AMPEREMETRE, codes: [], type: 'SERIE' },
    { nom: 'ampèremètre puis lampe', graphe: ORDRE_AMPEREMETRE_PUIS_LAMPE, codes: [], type: 'SERIE' },
  ]),
  equivalences: Object.freeze([
    {
      nom: 'deux dessins du même circuit série sont le même circuit',
      a: SERIE_CANONIQUE, b: SERIE_AUTRE_DESSIN, memes: true,
    },
    {
      nom: 'l\'ordre des dipôles dans une branche série est indifférent',
      a: ORDRE_LAMPE_PUIS_AMPEREMETRE, b: ORDRE_AMPEREMETRE_PUIS_LAMPE, memes: true,
    },
    {
      nom: 'série et dérivation ne sont pas le même circuit, malgré l\'allure',
      a: SERIE_DEUX_LAMPES, b: DERIVATION_DEUX_LAMPES, memes: false,
    },
    {
      nom: 'un schéma sans appareil de mesure n\'équivaut pas au schéma qui en porte un',
      a: AMPEREMETRE_CORRECT, b: SERIE_CANONIQUE, memes: false,
    },
    {
      nom: 'la polarité est comparée : un ampèremètre retourné change le circuit',
      a: AMPEREMETRE_CORRECT, b: AMPEREMETRE_INVERSE, memes: false,
    },
    {
      nom: 'un circuit hors cadre série-parallèle ne reçoit pas de verdict',
      a: COURT_CIRCUIT_PAR_FIL, b: SERIE_CANONIQUE, memes: null,
    },
  ]),
});

/**
 * Rejoue les cas-témoins. Appelé par `tools/tester-moteur.mjs` (site M).
 *
 * Vérifie trois choses que l'invariant 7 exige : que tout code porte un message
 * préécrit rattaché à l'énuméré fermé de la charte, que chaque code soit couvert
 * par au moins un cas, et que chaque cas rende exactement le diagnostic annoncé.
 */
export function verifierCasTemoins() {
  const echecs = [];
  let passes = 0;
  const verifier = (nom, condition) => {
    if (condition) passes += 1;
    else echecs.push(nom);
  };

  for (const [code, def] of Object.entries(CODES_ERREUR_CIRCUIT)) {
    verifier(`${code} porte un message préécrit`,
      typeof def.message === 'string' && def.message.length > 20);
    verifier(`${code} se rattache à l'énuméré fermé de la charte`,
      FAMILLES_CHARTE.includes(def.famille));
  }

  const couverts = new Set();
  for (const cas of CAS_TEMOINS.circuits) {
    const r = diagnostiquer(cas.graphe, cas.attendu);
    verifier(`${cas.nom} : le graphe est lisible`, r.ok);
    if (!r.ok) continue;
    for (const c of r.codes) couverts.add(c);

    const obtenus = [...r.codes].sort().join(', ') || '—';
    const voulus = [...cas.codes].sort().join(', ') || '—';
    verifier(`${cas.nom} : attendu [${voulus}], obtenu [${obtenus}]`, obtenus === voulus);
    // « Chaque constat doit nommer les dipôles concernés, pour que le message
    // serve à l'élève » : un constat sans précision est un constat inutilisable.
    verifier(`${cas.nom} : chaque constat est circonstancié`,
      r.constats.every((c) => typeof c.precision === 'string' && c.precision.length > 0));
    verifier(`${cas.nom} : circuit ${cas.type ?? 'hors cadre'}`, (r.type.type ?? null) === cas.type);
    if (cas.canoniqueRefusee) {
      verifier(`${cas.nom} : la forme canonique est refusée, pas approchée`, r.cle === null);
    }
  }

  for (const code of Object.keys(CODES_ERREUR_CIRCUIT)) {
    verifier(`${code} est couvert par un cas-témoin`, couverts.has(code));
  }

  for (const cas of CAS_TEMOINS.equivalences) {
    verifier(cas.nom, memeCircuit(cas.a, cas.b) === cas.memes);
  }

  return { passes, echecs };
}
