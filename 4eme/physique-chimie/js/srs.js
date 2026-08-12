// Reprise espacée — comptée en SÉANCES, et NON ABSORBANTE pour les pièges.
//
// ── Le fait qui commande ─────────────────────────────────────────────────────
//
// Chez des élèves de 13-14 ans, l'effet d'une leçon réfutationnelle est mesurable
// au post-test immédiat et a DISPARU à trois-cinq mois. L'imagerie dit pourquoi :
// les experts en physique n'ont pas effacé la conception erronée, ils activent
// plus que les novices leurs régions d'inhibition. Une conception ne s'éteint
// pas, elle s'inhibe, et l'inhibition s'entretient.
//
// Un SRS par défaut fait exactement le contraire : il allonge l'intervalle après
// une réussite et RETIRE DE LA FILE ce qui est acquis. Traiter la réussite
// immédiate comme preuve d'extinction est l'erreur que ce module existe pour
// interdire — sur les 17 sujets revenus au test différé de Winer, 7 étaient
// repassés sous le seuil, dont 6 avaient un score parfait au temps 1.
//
// ── Ce que fait le moteur de mathématiques, et qu'on ne reproduit pas ────────
//
// `4eme/maths/js/srs.js` a été relu pour écrire ce fichier, et le défaut est pire
// que sa description : `fileDeRemediation` filtre sur `!estAcquis`, `estAcquis`
// est un état absorbant, et sa troisième condition — `palierMax >= palierRate` —
// est VRAIE PAR DÉFAUT tant que l'élève n'a jamais échoué à un palier élevé
// (0 >= 0 à l'état initial). Trois réussites de suite au palier 1, dans deux
// séances, et le piège sort de la file pour toujours : pas au palier maximal,
// au palier le plus facile. Là-bas la conséquence est discutable ; ici elle
// serait la négation du diagnostic.
//
// D'où la règle centrale de ce module : AUCUN PIÈGE N'A D'ÉTAT ABSORBANT. Il n'y
// a pas de fonction `estAcquisPiege`, et son absence est le fichier. Ce qui
// distingue un rang 1 d'un rang 3 n'est pas qu'on déclare l'un éteint et pas
// l'autre : c'est le PLAFOND de son intervalle. Un rang 3 sans plafond s'éloigne
// de lui-même jusqu'à sortir de l'année ; un rang 1 revient tous les 20 séances
// jusqu'au bout, quoi qu'il ait réussi.
//
// ── Pourquoi en séances, jamais en jours ────────────────────────────────────
//
// L'élève peut condenser deux séances dans la même journée. Avec des intervalles
// en jours, tout serait repoussé au lendemain et une révision dense repousserait
// la re-confrontation au lieu de l'avancer. Aucune date système n'entre ici : le
// temps est un entier passé en paramètre.
//
// ── Deux états distincts, que la v1 de la charte confondait ──────────────────
//
// Le CONTENU porte un `rythmeInitial`, en séances. L'ÉCHÉANCE est une donnée de
// PROFIL ÉLÈVE. Aucune fonction de ce fichier n'écrit dans un objet piège, et
// aucun état ne recopie une donnée de corpus : c'est pourquoi toutes les
// transitions prennent le piège ET l'état, plutôt que de fusionner les deux.
// `controlerPiegeSrs` refuse au build un piège qui porterait une échéance.
//
// Module ES pur : ni DOM, ni import, ni date, ni aléa, ni état global. Testable
// sous node comme dans le navigateur — c'est ce qui rend le contrôle possible
// hors ligne, et ce qui rend `simuler-parcours.mjs` écrivable.

// ════════════════════════════════════════════════════════════════════════════
// Les constantes, et d'où viennent leurs valeurs
// ════════════════════════════════════════════════════════════════════════════

/**
 * Le plafond d'intervalle, en séances, par rang de piège.
 *
 * Le 20 du rang 1 est écrit dans la charte : sur une année de 100 séances il
 * garantit au moins cinq re-confrontations, sur une année plus lâche de 90 au
 * moins quatre. Le 33 du rang 2 n'est pas inventé — c'est LE MÊME CALCUL appliqué
 * à la cible que la charte déclare dans la même phrase (« cinq re-confrontations
 * par an pour un rang 1, trois pour un rang 2, zéro pour un rang 3 ») : 100/3.
 *
 * Le rang 3 n'a pas de plafond, et c'est la seule façon honnête d'écrire « zéro
 * re-confrontation par an » sans rouvrir un état absorbant. Son intervalle croît
 * jusqu'à dépasser l'année et le piège cesse d'être tiré ; personne n'a déclaré
 * qu'il était éteint, et une seule erreur le ramène à son rythme initial. La
 * différence n'est pas cosmétique : un état absorbant ne revient JAMAIS, un
 * intervalle long revient dès qu'un échec le rappelle.
 */
export const PLAFOND_INTERVALLE = Object.freeze({ 1: 20, 2: 33, 3: Infinity });

/**
 * De combien l'intervalle s'allonge à chaque réussite.
 *
 * Le doublement n'est pas ce qui porte la garantie — le plafond l'est. Ce facteur
 * décide seulement en combien de réussites on l'atteint : depuis un rythme de 3,
 * trois réussites suffisent (3 → 6 → 12 → 20). Un facteur plus doux ne changerait
 * rien à la borne, seulement au nombre de créneaux dépensés pour y arriver, et
 * ces créneaux sont comptés (68 sur 100 au budget de la charte).
 */
const CROISSANCE = 2;

/** Réussites consécutives exigées pour parler de maîtrise d'un SAVOIR-FAIRE. */
const REUSSITES_POUR_MAITRISE = 3;

/** Séances distinctes exigées : réussir trois fois dans la même séance prouve
 *  surtout qu'on se souvient de la correction reçue dix secondes plus tôt. */
const SEANCES_POUR_MAITRISE = 2;

/** Échecs consécutifs au même palier avant de redescendre d'un cran. Sans
 *  redescente, l'échec répété au palier mélangé — que la recherche garantit, ces
 *  conceptions résistant à un enseignement qui les vise — serait une boucle sans
 *  sortie. */
const ECHECS_AVANT_REDESCENTE = 2;

/**
 * Les quatre issues possibles d'un item, énuméré fermé de la charte.
 *
 * Le résultat d'un item n'est PAS un booléen, et c'est la conséquence de moteur
 * la plus coûteuse du double QCM. `unites.js` produit déjà ces valeurs
 * (`issueDepuisVerdict`) : les deux fichiers parlent la même langue sans se
 * connaître.
 */
export const ISSUES = Object.freeze([
  'reussite',
  'echec',
  'reussite-sans-justification',
  'unite-non-reconnue',
]);

// ════════════════════════════════════════════════════════════════════════════
// Le double QCM — quatre états, pas deux
// ════════════════════════════════════════════════════════════════════════════

/**
 * L'issue d'un double QCM, depuis la réponse et sa justification.
 *
 * Le quadrant qui compte est juste/faux. Le passer en `correct = false` — ce que
 * fait tout moteur à booléen — produirait TROIS effets non voulus d'un coup :
 * redescente de palier, incrément des échecs consécutifs, et relèvement de
 * `palierRate`, qui bloquerait la maîtrise jusqu'à une réussite au même palier.
 * Or il n'y a rien à réenseigner sur la valeur : l'élève l'a trouvée. Ce qui est
 * en cause est le raisonnement, et c'est le piège de CONCEPTION qu'on
 * reprogramme, par l'autre canal.
 *
 * Le quadrant faux/juste est un échec ordinaire sur la valeur — et c'est le cas
 * le plus instructif du lot : « ton raisonnement était le bon, ta réponse ne l'a
 * pas suivi » est une phrase qu'aucune plateforme ne sait dire.
 */
export function issueDuDoubleQcm(reponseJuste, justificationJuste) {
  if (reponseJuste && justificationJuste) return 'reussite';
  if (reponseJuste) return 'reussite-sans-justification';
  return 'echec';
}

// ════════════════════════════════════════════════════════════════════════════
// L'état d'un piège dans le profil de l'élève
// ════════════════════════════════════════════════════════════════════════════

const entierPositif = (v) => Number.isInteger(v) && v >= 1;

/**
 * Les rangs, en liste fermée plutôt qu'en clés d'objet.
 *
 * `rang in PLAFOND_INTERVALLE` avait l'air d'un contrôle d'énuméré et n'en était
 * pas un : la chaîne de prototype d'un objet répond `true` à `'toString'`, à
 * `'constructor'` et à onze autres noms, et `PLAFOND_INTERVALLE['toString']` est
 * une FONCTION — `Math.min(fonction, 6)` vaut `NaN`, donc une échéance muette.
 * Le même contrôle acceptait `'1'` écrit en texte, qui ne se distingue de `1`
 * nulle part à l'écran. Un énuméré fermé se lit sur une liste.
 */
const RANGS = Object.freeze([1, 2, 3]);
const rangValide = (rang) => RANGS.includes(rang);

/**
 * Un numéro de séance est un entier — le temps de ce module, et son seul temps.
 *
 * Sans ce contrôle, `numeroSeance + intervalle` vaut `NaN` dès qu'il manque, et
 * `NaN <= n` est faux pour tout `n` : le piège n'est plus jamais dû. C'est le
 * mode de panne que tout ce fichier existe pour interdire, atteint par une
 * étourderie d'appelant plutôt que par un filtre d'acquisition — un piège de
 * rang 1 sorti de la file, sans une ligne de journal, derrière un écran de
 * séance parfaitement normal.
 */
const numeroDeSeanceValide = (v) => Number.isInteger(v) && v >= 0;

/**
 * Ce qu'un piège doit porter pour que le moteur puisse calculer une échéance.
 *
 * Appelé à chaque transition et pas seulement à l'état initial : rien ne garantit
 * que le piège passé à `apresReponsePiege` est celui qui a produit l'état — un
 * profil rechargé, un catalogue modifié entre deux versions, et l'échéance
 * devient `NaN` par un chemin que l'état initial n'a jamais vu.
 */
function exigerPiegeUtilisable(piege, contexte) {
  if (!piege || typeof piege !== 'object') {
    throw new Error(`${contexte} : piège absent.`);
  }
  if (!entierPositif(piege.rythmeInitial)) {
    throw new Error(
      `Piège « ${piege.id} » : rythmeInitial absent ou non entier positif (${piege.rythmeInitial}).`,
    );
  }
  if (!rangValide(piege.rang)) {
    throw new Error(`Piège « ${piege.id} » : rang « ${piege.rang} » hors énuméré (1 | 2 | 3).`);
  }
}

function exigerNumeroDeSeance(numeroSeance, contexte) {
  if (!numeroDeSeanceValide(numeroSeance)) {
    throw new Error(`${contexte} : numéro de séance « ${numeroSeance} » qui n'est pas un entier de séance.`);
  }
}

/**
 * L'état initial d'un piège, avant toute rencontre.
 *
 * ── LA CONVENTION « pas encore dans la file », écrite une fois pour les deux
 *    modules qui la lisent ───────────────────────────────────────────────────
 *
 *   revoirALaSeance: null   ⇒ le piège N'EST PAS dans la file, et il n'est
 *                             JAMAIS dû. `rencontre` vaut `false`. C'est
 *                             exactement l'état « chapitre fait, piège jamais
 *                             rencontré » : le chapitre d'origine a beau être
 *                             suivi, tant que l'élève n'a pas croisé la
 *                             conception, la re-confronter serait une première
 *                             rencontre déguisée en révision.
 *   revoirALaSeance: entier ⇒ le piège est dans la file, dû dès que la séance
 *                             l'a atteint. `rencontre` vaut `true`.
 *
 * Les deux champs varient donc ENSEMBLE, et `seance.js` refuse un état qui les
 * dissocierait. `programmerPiege` fait l'entrée dans la file, et lui seul.
 *
 * `null` et non `0` : à `0` le piège serait dû dès la première séance, et la
 * dépendance d'Andersson comme l'ordre des rangs 2 tomberaient — la file ne
 * peut pas servir ce que la progression n'a pas encore introduit.
 *
 * ⚠ La valeur `undefined` ne fait PAS partie de la convention : elle ne signifie
 * ni « pas encore programmé » ni « dû maintenant », elle signifie qu'aucun état
 * n'a été construit. C'est le seul point où les deux modules divergeaient, et
 * `seance.js` lit désormais `null` comme « pas dû » plutôt que l'inverse.
 *
 * On LÈVE sur un contenu fautif plutôt que de choisir un rythme à la place de
 * l'auteur : un piège sans `rythmeInitial` est refusé au build par l'invariant 14,
 * et il vaut mieux que le moteur explose au chargement du profil que de
 * fabriquer une échéance qui n'a été décidée par personne.
 */
export function etatInitialPiege(piege = {}) {
  exigerPiegeUtilisable(piege, 'État initial');
  return {
    intervalle: piege.rythmeInitial,
    revoirALaSeance: null,
    rencontre: false,
    reussitesConsecutives: 0,
    echecsConsecutifs: 0,
    reussites: 0,
    echecs: 0,
    sansJustification: 0,
    seancesReussies: [],
    palierMax: 0,
    palierRate: 0,
    palierServi: 1,
    // Ce qui a déjà été servi, pour ne jamais resservir la même pesée.
    dispositifsServis: [],
    // Posé par un juste/faux, lu par le générateur au tirage suivant.
    formatDifferentExige: false,
    // Posé par une redescente de palier : on redescend dans un décor neuf.
    contexteNeufExige: false,
    // Ce qui vient d'être servi — `{ type, contexteDeSurface }` ou `null`.
    //
    // ⚠ Sans lui, les deux drapeaux ci-dessus ne sont PAS exécutables : ils
    // portent tous deux sur LA FOIS SUIVANTE — « un item de format ou de
    // contexte différent », « on redescend dans un décor neuf » — et « différent
    // de quoi ? » n'a pas de réponse dans un état qui ne retient pas ce qu'il a
    // servi. Ils ont donc vécu deux passes sans aucun lecteur : posés ici,
    // commentés « lu par le générateur au tirage suivant », et lus par personne.
    // C'est le défaut de `derniersContextes` retourné — là, un lecteur lisait un
    // champ que rien n'écrivait ; ici, un écrivain écrivait un champ que rien ne
    // lisait. Les deux sont muets, et le second l'est plus longtemps : un champ
    // jamais lu ne fait même pas `undefined` quelque part.
    dernierServi: null,
  };
}

/**
 * L'entrée dans la file : le piège vient d'être rencontré dans son chapitre.
 *
 * La première re-confrontation tombe `rythmeInitial` séances plus tard — c'est la
 * définition du champ, et c'est tout ce que le corpus a le droit de dire du
 * temps. Appelé deux fois, il ne fait rien la seconde : une deuxième rencontre
 * n'a pas à repousser une échéance déjà posée.
 */
export function programmerPiege(etat, piege, numeroSeance) {
  exigerPiegeUtilisable(piege, 'Programmation');
  exigerNumeroDeSeance(numeroSeance, `Programmation de « ${piege.id} »`);
  if (etat.rencontre) return etat;
  return {
    ...etat,
    rencontre: true,
    intervalle: piege.rythmeInitial,
    revoirALaSeance: numeroSeance + piege.rythmeInitial,
  };
}

/**
 * Le nouvel intervalle après une réponse.
 *
 * Une réussite l'allonge JUSQU'AU PLAFOND, et rien de plus : c'est la règle 2 de
 * la charte, écrite en une ligne. Tout le reste du fichier existe pour que cette
 * ligne ne puisse pas être contournée ailleurs.
 *
 * Un échec — et un juste/faux, qui est un échec du raisonnement — ramène au
 * rythme initial. Pas à la moitié, pas d'un cran : au départ. Une conception qui
 * se réveille n'a pas été « un peu moins bien inhibée », elle a repris la main,
 * et le crédit accumulé ne dit plus rien.
 */
function intervalleSuivant(etat, piege, issue) {
  if (issue === 'reussite') {
    return Math.min(PLAFOND_INTERVALLE[piege.rang], etat.intervalle * CROISSANCE);
  }
  return piege.rythmeInitial;
}

const ajouterUneFois = (liste, valeur) => (liste.includes(valeur) ? liste : [...liste, valeur]);

/**
 * Le nouvel état d'un piège après une réponse.
 *
 *   evenement = { issue, numeroSeance, palier, dispositifServi }
 *
 * `dispositifServi` est l'identifiant du constat ou de l'exécution de
 * contre-modèle qui vient d'être joué : c'est lui qui alimente la règle de
 * variation. Le passer est facultatif — un item de re-confrontation n'en porte
 * pas toujours — mais l'omettre sur un dispositif réellement servi ferait
 * resservir la même pesée à la fois d'après.
 */
export function apresReponsePiege(etat, piege, evenement = {}) {
  const {
    issue, numeroSeance, palier = 1, dispositifServi = null,
    // Le format et le décor de l'item qui vient d'être servi. Facultatifs comme
    // `dispositifServi`, et pour la même raison — mais les omettre éteint la
    // contrainte « la fois suivante, un format ou un contexte différent »
    // plutôt que de la fausser : `dernierServi` reste ce qu'il était.
    type = null, contexteDeSurface = null,
  } = evenement;

  if (!ISSUES.includes(issue)) {
    throw new Error(`Issue « ${issue} » hors énuméré (${ISSUES.join(' | ')}).`);
  }
  exigerPiegeUtilisable(piege, 'Réponse');
  exigerNumeroDeSeance(numeroSeance, `Réponse sur « ${piege.id} »`);

  // Un dispositif que ce piège ne porte pas ne peut pas être enregistré comme
  // servi : il compterait dans la longueur du cycle, le cycle se refermerait
  // trop tôt, et un constat serait resservi alors qu'un autre n'a jamais été vu.
  // C'est la règle de variation défaite par une faute de frappe.
  if (dispositifServi !== null
    && !dispositifsDeReconfrontation(piege).some((d) => d.id === dispositifServi)) {
    throw new Error(
      `Dispositif « ${dispositifServi} » étranger au piège « ${piege.id} » : `
      + 'le compter comme servi refermerait son cycle de variation trop tôt.',
    );
  }

  // Une saisie d'unité illisible n'est ni juste ni fausse : elle ne consomme pas
  // d'essai, ne touche à rien, et l'appelant redemande. La rendre à l'identique
  // est le seul comportement qui respecte l'invariant 9 — un `unite-non-reconnue`
  // comptabilisé comme échec ferait redescendre un palier sur une faute de frappe.
  if (issue === 'unite-non-reconnue') return etat;

  const reussite = issue === 'reussite';
  const echec = issue === 'echec';
  // Le juste/faux : la série est interrompue, et RIEN D'AUTRE ne bouge du côté
  // de la valeur. Ni `echecsConsecutifs`, ni `palierRate`, ni le palier servi.
  const sansJustification = issue === 'reussite-sans-justification';

  const echecsConsecutifs = echec ? etat.echecsConsecutifs + 1 : (sansJustification ? etat.echecsConsecutifs : 0);
  const redescente = echec && echecsConsecutifs >= ECHECS_AVANT_REDESCENTE;

  const dispositifs = dispositifServi === null
    ? etat.dispositifsServis
    : ajouterUneFois(etat.dispositifsServis, dispositifServi);

  const intervalle = intervalleSuivant(etat, piege, issue);

  return {
    ...etat,
    intervalle,
    revoirALaSeance: numeroSeance + intervalle,
    rencontre: true,
    reussitesConsecutives: reussite ? etat.reussitesConsecutives + 1 : 0,
    echecsConsecutifs,
    reussites: etat.reussites + (reussite ? 1 : 0),
    echecs: etat.echecs + (echec ? 1 : 0),
    sansJustification: etat.sansJustification + (sansJustification ? 1 : 0),
    seancesReussies: reussite ? ajouterUneFois(etat.seancesReussies, numeroSeance) : etat.seancesReussies,
    // On ne retient un palier que s'il est RÉUSSI : c'est la condition qui
    // distingue « il sait » de « il a vu ».
    palierMax: reussite ? Math.max(etat.palierMax, palier) : etat.palierMax,
    palierRate: echec ? Math.max(etat.palierRate, palier) : etat.palierRate,
    palierServi: redescente ? Math.max(1, palier - 1) : (reussite ? Math.max(etat.palierServi, palier) : etat.palierServi),
    dispositifsServis: cycleDeDispositifs(dispositifs, piege),
    // Le juste/faux pose la contrainte, toute autre réponse la lève : elle porte
    // sur LA FOIS SUIVANTE, pas sur toutes les suivantes.
    formatDifferentExige: sansJustification,
    contexteNeufExige: redescente,
    dernierServi: (type !== null || contexteDeSurface !== null)
      ? { type, contexteDeSurface }
      : etat.dernierServi ?? null,
  };
}

/** Un piège est à revoir s'il est entré dans la file et que sa séance est arrivée. */
export const estARevoirPiege = (etat, numeroSeance) =>
  etat.revoirALaSeance !== null && etat.revoirALaSeance <= numeroSeance;

// ════════════════════════════════════════════════════════════════════════════
// La variation des dispositifs — sans quoi l'espacement ressert un souvenir
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les dispositifs de re-confrontation d'un piège, constats et exécutions de
 * contre-modèle confondus.
 *
 * La charte les met sur le même plan — « au moins deux constats (ou deux
 * exécutions de contre-modèle) de contextes de surface différents » — et elle a
 * raison de le faire : `extramission` ne porte aucun constat et trois exécutions,
 * parce qu'on ne peut pas faire constater à l'écran que rien ne sort de l'œil. La
 * réunion des deux est ce qui rend la règle applicable à tout le catalogue.
 *
 * Les contre-modèles de forme `{ enonce, predire, verdict }` — la majorité —
 * n'entrent PAS dans cette liste : ils n'ont ni identifiant ni contexte de
 * surface, donc ils ne varient rien. Les compter gonflerait le vivier d'un
 * dispositif que le moteur ne saurait pas ne pas resservir.
 */
export function dispositifsDeReconfrontation(piege = {}) {
  const constats = (piege.constats ?? [])
    .filter((c) => c && c.id)
    .map((c) => ({ id: c.id, contexteDeSurface: c.contexteDeSurface, type: 'constat', source: c }));

  const executions = (piege.contreModele?.executions ?? [])
    .filter((e) => e && e.id)
    .map((e) => ({ id: e.id, contexteDeSurface: e.contexteDeSurface, type: 'contre-modele', source: e }));

  return [...constats, ...executions];
}

/**
 * Referme le cycle quand tout a été servi.
 *
 * La règle est « jamais deux fois le même TANT QU'IL EN RESTE UN NON SERVI » :
 * elle n'interdit pas de recommencer, elle interdit de sauter son tour. Une fois
 * les quatre pesées de `conservation-de-la-masse` passées, on repart de la
 * première — à ce stade des dizaines de séances ont passé, et c'est le principe
 * même de l'espacement.
 */
function cycleDeDispositifs(servis, piege) {
  const total = dispositifsDeReconfrontation(piege).length;
  return total > 0 && servis.length >= total ? [] : servis;
}

/**
 * Le prochain dispositif à servir pour ce piège, ou un verdict explicite.
 *
 * Sans cette règle, l'espacement est programmé mais ce qu'il ressert n'est plus
 * une réfutation : à la deuxième re-confrontation, l'élève se souvient du
 * résultat de la pesée, il n'y a plus de conflit, juste une information connue.
 *
 * `variationImpossible` est un drapeau et non un refus : le dispositif existe, le
 * servir vaut mieux que ne rien servir, et c'est `controlerPiegeSrs` — au build,
 * là où un auteur peut encore agir — qui refuse un rang 1 sous-doté.
 */
export function dispositifSuivant(piege, etat) {
  const pool = dispositifsDeReconfrontation(piege);
  if (pool.length === 0) {
    return { ok: false, code: 'AUCUN_DISPOSITIF', piege: piege.id };
  }

  const servis = etat?.dispositifsServis ?? [];
  const dispositif = pool.find((d) => !servis.includes(d.id)) ?? pool[0];
  const contextes = new Set(pool.map((d) => d.contexteDeSurface).filter(Boolean));

  return {
    ok: true,
    dispositif,
    // Vrai quand le catalogue ne permet pas la variation que le rang exige.
    variationImpossible: piege.rang === 1 && contextes.size < 2,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// La file de re-confrontation — et ce qu'elle ne filtre PAS
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les pièges dus à cette séance, du plus urgent au moins urgent.
 *
 *   entrees = [{ piege, etat }]
 *
 * ⚠ IL N'Y A AUCUN FILTRE D'ACQUISITION, et c'est tout le fichier. Le moteur de
 * mathématiques écrit `.filter((e) => !estAcquis(e.etat) && …)` ; la même ligne
 * ici retirerait de la file, définitivement, le piège que la charte déclare non
 * négociable. Un rang 1 reste dans la file toute l'année : il n'en sort pas.
 *
 * `chapitreEnCours` retire les pièges du chapitre en cours d'étude — la
 * re-confrontation se prend HORS du chapitre du moment, sinon « le piège
 * d'aujourd'hui est celui que j'ai raté avant-hier » rétablit un titre de
 * chapitre, et le palier non étiqueté cesse de l'être.
 *
 * L'ordre : le rang d'abord, parce que c'est la donnée organisatrice du dossier
 * et que le rang 1 ne se reporte pas ; LE RETARD ensuite ; les échecs après lui,
 * parce que le plus fragile passe pendant que l'attention est intacte ; l'`id`
 * enfin, pour que deux pièges à égalité ne s'échangent pas leur place d'une
 * séance à l'autre — un tri instable rendrait `genererSeance` non déterministe à
 * graine fixée.
 *
 * ⚠ Le retard passe AVANT les échecs, et l'inverse a été écrit d'abord. Trier
 * sur les échecs en clé principale referme une boucle : pour passer il faut des
 * échecs, et pour avoir des échecs il faut passer. Un piège jamais servi a zéro
 * échec, reste donc derrière tous ceux qui en ont, et n'a aucun moyen de
 * remonter. Le créneau de re-confrontation est UNIQUE par séance : quand la file
 * est saturée — c'est-à-dire chez l'élève qui échoue, celui que la charte
 * déclare précisément pour cela — la simulation d'année montrait un rang 1 servi
 * ZÉRO fois sur cent séances, échéance à jour, jamais sorti de la file,
 * simplement toujours deuxième. Aucun état ne le disait, et c'est le même
 * silence que l'état absorbant du moteur de mathématiques, obtenu par le tri.
 *
 * Le retard en clé principale est une file d'attente : personne ne double
 * indéfiniment, et le classement par fragilité garde tout son sens là où il peut
 * l'avoir sans famine — entre deux pièges dus à la même séance.
 *
 * ⚠ Et le retard seul ne suffit pas non plus. Servir « le plus tôt dû d'abord »
 * distribue les créneaux proportionnellement à 1/rythme : chez l'élève qui
 * échoue, la demande de la file monte à trois pièges par séance pour UN créneau,
 * et les pièges de rythme long — 6, 7 séances — passent sous les quatre
 * re-confrontations annuelles sur une année de 90 séances. C'est `enFamine` qui
 * répare cela, et voir plus bas pourquoi ce n'est pas un réglage.
 */

/**
 * Le piège qu'on n'a pas revu depuis plus longtemps que son plafond.
 *
 * Le plafond de la charte est une PROMESSE — « l'intervalle d'un piège de rang 1
 * ne dépasse jamais 20 séances » — et une promesse porte sur l'écart RÉEL entre
 * deux re-confrontations, pas sur le nombre écrit dans l'état. Un piège dont
 * l'échéance est tombée il y a trente séances et que la file n'a jamais servi,
 * parce que d'autres passaient toujours devant, a un intervalle de 6 dans son
 * état et un écart réel de trente-six. Rien ne le dit : ni son état, ni la file,
 * ni l'écran. C'est la troisième forme du même silence, après l'état absorbant
 * et l'échéance `NaN`, et c'est celle qu'on n'atteint qu'en simulant une année.
 *
 * L'écart réel se lit sans champ supplémentaire : `revoirALaSeance - intervalle`
 * est la séance de la dernière réponse, `programmerPiege` comme
 * `apresReponsePiege` posant l'échéance à `séance + intervalle`.
 *
 * Le garde-fou est dormant en régime normal — il ne se déclenche qu'une fois le
 * plafond DÉPASSÉ, donc jamais tant que la file suit — et il ne réordonne rien
 * entre rangs : un rang 2 affamé ne passe pas devant un rang 1 dû. Le rang 3,
 * sans plafond, n'est jamais en famine, ce qui est la traduction exacte de sa
 * cible de zéro re-confrontation par an.
 */
export const ecartReel = (etat, numeroSeance) =>
  numeroSeance - (etat.revoirALaSeance - etat.intervalle);

/**
 * Exporté, et pour la raison qui a fait exporter `comparerPiegesDus` : la famine
 * se MESURE ici et se CONSTATE ailleurs. `comparerPiegesDus` s'en sert pour
 * réordonner ; `seance.js` s'en sert pour le DIRE — un piège affamé que le
 * comparateur remonte sans jamais lui donner le créneau unique de la séance ne
 * laisse, sinon, aucune trace. C'est le cas du rang 2 chez l'élève qui échoue :
 * la file de rang 1 sature les cent séances de l'année, le rang ne se réordonne
 * jamais entre eux — délibérément — et les six pièges de rang 2 du catalogue
 * ouvert reçoivent ZÉRO re-confrontation là où la charte en budgète trois.
 * Une deuxième implémentation de cette soustraction serait la file en double
 * que la réconciliation vient de supprimer.
 */
export const enFamine = (entree, numeroSeance) =>
  ecartReel(entree.etat, numeroSeance) > PLAFOND_INTERVALLE[entree.piege.rang];

/**
 * L'ordre de la file, isolé de la file elle-même — et EXPORTÉ.
 *
 * Il l'est parce que ce module n'est pas le seul à ordonner des pièges dus :
 * `seance.js` porte l'arbitrage (il filtre au niveau de l'ITEM, il connaît les
 * dépendances iatrogènes et celle d'Andersson, il sait quel chapitre est en
 * cours) et il puise dans la file pour composer un créneau unique. Tant qu'il
 * portait SON tri — rang, retard, identifiant — les deux ordres coexistaient
 * sans que rien n'oblige à les faire coïncider : le garde-fou de famine
 * n'existait que sur le chemin que l'application n'emprunte pas, et le mode de
 * panne documenté vingt lignes plus haut — un rang 1 servi zéro fois sur cent
 * séances, échéance à jour, simplement toujours deuxième — restait atteignable
 * par le chemin réel. Deux files qui ordonnent différemment sont une file de
 * moins, pas une de plus.
 *
 * Le comparateur prend le numéro de séance parce que la famine se mesure contre
 * lui : à graine et à état fixés, il rend toujours le même ordre.
 *
 *   entrees = [{ piege, etat }]   — `etat` est l'état de piège de CE module.
 */
export function comparerPiegesDus(numeroSeance) {
  return (a, b) => (
    a.piege.rang - b.piege.rang
    || Number(enFamine(b, numeroSeance)) - Number(enFamine(a, numeroSeance))
    || a.etat.revoirALaSeance - b.etat.revoirALaSeance
    || b.etat.echecs - a.etat.echecs
    || (a.piege.id < b.piege.id ? -1 : 1)
  );
}

export function fileDeReconfrontation(entrees, numeroSeance, { chapitreEnCours = null } = {}) {
  return entrees
    .filter((e) => estARevoirPiege(e.etat, numeroSeance))
    .filter((e) => chapitreEnCours === null || e.piege.chapitreOrigine !== chapitreEnCours)
    .sort(comparerPiegesDus(numeroSeance));
}

/**
 * Le garde-fou de l'interrupteur.
 *
 * Un chapitre répondu « pas encore » sort du suivi — c'est la décision n°2 de la
 * charte et elle ne bouge pas. Mais la re-confrontation d'un rang 1 ne peut pas
 * dépendre d'un chapitre désactivé : si les chapitres postérieurs qui la portent
 * sont tous éteints, le mécanisme déclaré non négociable disparaîtrait EN
 * SILENCE, sans une lacune ni une ligne de journal. Le moteur tire alors dans un
 * chapitre actif quelconque, et le dit (`gardeFou: true`).
 *
 * Le repli est réservé au rang 1. Pour un rang 2 ou 3, l'absence de porteur actif
 * est un verdict — le piège attend — parce que rien dans la charte ne déclare
 * leur reprise non négociable, et qu'aller les servir dans un décor sans rapport
 * coûterait un créneau à ceux qui le sont.
 *
 * On rend la LISTE des chapitres éligibles, pas un chapitre : le tirage appartient
 * à `genererSeance(etatEleve, graine)`, seul endroit où une graine a le droit
 * d'exister. Ce module n'a ni aléa ni préférence.
 */
export function chapitresPourReconfrontation(piege, {
  porteursPosterieurs = [],
  chapitresActifs = [],
  chapitreEnCours = null,
} = {}) {
  const actif = (id) => chapitresActifs.includes(id) && id !== chapitreEnCours;

  const porteurs = porteursPosterieurs.filter(actif);
  if (porteurs.length > 0) return { ok: true, chapitres: porteurs, gardeFou: false };

  if (piege.rang !== 1) {
    return { ok: false, code: 'AUCUN_CHAPITRE_PORTEUR_ACTIF', piege: piege.id };
  }

  const repli = chapitresActifs.filter(actif);
  if (repli.length === 0) {
    // Tous les chapitres sont éteints : il n'y a plus d'application, et inventer
    // un chapitre serait servir un décor que l'élève n'a pas vu.
    return { ok: false, code: 'AUCUN_CHAPITRE_ACTIF', piege: piege.id };
  }
  return { ok: true, chapitres: repli, gardeFou: true };
}

// ════════════════════════════════════════════════════════════════════════════
// Le savoir-faire — lui, il s'acquiert
// ════════════════════════════════════════════════════════════════════════════

/** Délai avant nouvelle présentation, en séances, selon le niveau atteint. Table
 *  reprise du moteur de mathématiques : un savoir-faire est un savoir-faire, et
 *  ce qui devait changer ici n'est pas l'espacement, c'est l'absorption. */
const INTERVALLES_SAVOIR_FAIRE = [0, 1, 2, 4, 6, 8];

export const NIVEAU_MAX = INTERVALLES_SAVOIR_FAIRE.length - 1;

export const etatInitialSavoirFaire = () => ({
  niveau: 0,
  revoirALaSeance: 0,
  reussitesConsecutives: 0,
  echecsConsecutifs: 0,
  reussites: 0,
  echecs: 0,
  // Le compte des rencontres — toute réponse comptée, quelle que soit son issue.
  //
  // Il ne se déduit PAS de `reussites + echecs` : un juste/faux est une
  // rencontre et n'est ni l'un ni l'autre, et un savoir-faire qui n'aurait
  // produit que des juste/faux serait lu « jamais rencontré ». C'est ce que
  // `seance.js` lit pour tenir la dépendance iatrogène — un piège de rang 2 est
  // la conception que le savoir-faire producteur FABRIQUE, donc il n'existe pas
  // avant lui. Tant que ce champ manquait, `savoirFaire[iatrogene].rencontres`
  // valait `undefined`, la comparaison `> 0` était fausse, et AUCUN des huit
  // pièges de rang 2 du catalogue n'était jamais servi — sans une ligne de
  // journal, puisqu'un piège écarté au motif d'une dépendance non levée est un
  // écart parfaitement normal.
  rencontres: 0,
  palierMax: 0,
  palierRate: 0,
  palierServi: 1,
  contexteNeufExige: false,
  // Le décor et le format du dernier item servi — voir `etatInitialPiege`, même
  // champ et même raison. « On redescend dans un décor NEUF » est une contrainte
  // sur le tirage suivant, et sans mémoire de ce qui vient d'être servi elle
  // n'est pas exécutable : `composerCoeur` reservait le décor de l'échec, et le
  // drapeau restait vrai dans un état que personne n'interrogeait.
  dernierServi: null,
  // La fenêtre des trois dernières réussites, avec leurs attributs.
  //
  // Les compteurs à plat du moteur de mathématiques ne suffisent PAS ici, et
  // c'est une conséquence directe du critère : la charte parle des « trois
  // réussites qui déclarent l'acquisition », pas de l'historique. Un double QCM
  // juste/juste obtenu il y a quarante séances, suivi de trois réussites de
  // lecture de dispositif, ne déclare rien du tout. La fenêtre est donc l'état,
  // et un booléen cumulé aurait été un faux ami.
  dernieresReussites: [],
});

/**
 * Le nouvel état d'un savoir-faire après une réponse.
 *
 *   evenement = { issue, numeroSeance, palier, cercle, classe, estFormatDiagnostique, doubleQcm }
 *
 * `cercle` et `classe` sont les énumérés fermés de la charte (0-3, A/A_TABLE/B/C).
 * `estFormatDiagnostique` dit si l'item a été servi dans le format où la
 * conception se voit — dessin annoté sur objet non lumineux pour l'extramission,
 * pesée avec valeur prédite et verrouillée pour la conservation de la masse.
 *
 * ⚠ Le drapeau s'appelait `formatDiagnostique`, du nom du champ de piège qui
 * DÉCRIT ce format — `{ modeDeReponse, contexteImpose, pourquoi }`. Deux objets
 * de natures différentes sous un seul nom : l'un est la prescription portée par
 * le catalogue, l'autre le constat qu'un item l'a respectée. Le booléen porte
 * donc son propre nom, et l'objet garde le sien.
 *
 * `doubleQcm` est un drapeau à part, et il ne se déduit PAS de `classe: 'C'` : la
 * classe C couvre aussi la critique de résultat, la traduction entre registres et
 * les explications rédigées. Les confondre déclarerait la condition « un double
 * QCM juste/juste » remplie par une justification libre relue à la main, c'est-
 * à-dire par autre chose que le format qui sépare « il a coché juste » de « il a
 * compris ». Sur un double QCM, l'issue `reussite` VAUT juste/juste — c'est
 * `issueDuDoubleQcm` qui le garantit — donc le drapeau suffit.
 */
export function apresReponseSavoirFaire(etat, evenement = {}) {
  const {
    issue, numeroSeance, palier = 1, cercle = null, classe = null,
    estFormatDiagnostique = false, doubleQcm = false,
    type = null, contexteDeSurface = null,
  } = evenement;

  if (!ISSUES.includes(issue)) {
    throw new Error(`Issue « ${issue} » hors énuméré (${ISSUES.join(' | ')}).`);
  }
  exigerNumeroDeSeance(numeroSeance, 'Réponse sur un savoir-faire');
  if (issue === 'unite-non-reconnue') return etat;

  const reussite = issue === 'reussite';
  const echec = issue === 'echec';
  const sansJustification = issue === 'reussite-sans-justification';

  // Le juste/faux ne fait pas redescendre le niveau. Il interrompt la série, et
  // il laisse l'espacement où il est : la valeur est sue, ce n'est pas elle qu'il
  // faut revoir plus tôt — c'est le piège de conception, reprogrammé de son côté.
  const niveau = reussite
    ? Math.min(etat.niveau + 1, NIVEAU_MAX)
    : (echec ? Math.max(etat.niveau - 1, 0) : etat.niveau);

  const echecsConsecutifs = echec ? etat.echecsConsecutifs + 1 : (sansJustification ? etat.echecsConsecutifs : 0);
  const redescente = echec && echecsConsecutifs >= ECHECS_AVANT_REDESCENTE;

  // La fenêtre est remise à zéro dès que la série est rompue : trois réussites
  // « consécutives » n'ont de sens que si l'on ne garde pas les survivantes d'une
  // série précédente.
  const dernieresReussites = reussite
    ? [...etat.dernieresReussites, { seance: numeroSeance, palier, cercle, classe, estFormatDiagnostique, doubleQcm }]
      .slice(-REUSSITES_POUR_MAITRISE)
    : [];

  return {
    niveau,
    revoirALaSeance: numeroSeance + INTERVALLES_SAVOIR_FAIRE[niveau],
    reussitesConsecutives: reussite ? etat.reussitesConsecutives + 1 : 0,
    echecsConsecutifs,
    reussites: etat.reussites + (reussite ? 1 : 0),
    echecs: etat.echecs + (echec ? 1 : 0),
    // Une rencontre de plus, quelle que soit l'issue — le juste/faux compris.
    // L'`unite-non-reconnue` est déjà sortie plus haut : elle ne consomme rien.
    rencontres: (etat.rencontres ?? 0) + 1,
    palierMax: reussite ? Math.max(etat.palierMax, palier) : etat.palierMax,
    // Un juste/faux laisse `palierRate` INCHANGÉ. Le relever bloquerait la
    // maîtrise jusqu'à une réussite au même palier, pour une valeur trouvée.
    palierRate: echec ? Math.max(etat.palierRate, palier) : etat.palierRate,
    palierServi: redescente ? Math.max(1, palier - 1) : (reussite ? Math.max(etat.palierServi, palier) : etat.palierServi),
    contexteNeufExige: redescente,
    dernierServi: (type !== null || contexteDeSurface !== null)
      ? { type, contexteDeSurface }
      : etat.dernierServi ?? null,
    dernieresReussites,
  };
}

/** Un savoir-faire est à revoir s'il n'a jamais été vu, ou si sa séance est arrivée. */
export const estARevoirSavoirFaire = (etat, numeroSeance) =>
  etat.reussites + etat.echecs === 0 || etat.revoirALaSeance <= numeroSeance;

/**
 * La maîtrise d'un savoir-faire — verdict explicite, jamais un booléen nu.
 *
 *   savoirFaire = { diagnostic: 'type' | 'absent' }
 *
 * Trois réussites consécutives, dans au moins deux séances distinctes, au palier
 * le plus élevé déjà rencontré — puis cinq conditions propres à cette matière,
 * qui portent toutes sur CES trois réussites et non sur l'historique :
 *
 *  1. au moins une hors cercle 3. La charte l'écrit deux fois, des deux côtés :
 *     « au moins un item calculé ou raisonné » et « jamais sur des items de
 *     lecture de dispositif seuls ». C'est la MÊME exigence, et elle s'écrit une
 *     seule fois, sur le seul énuméré fermé qui la porte. Motif nommé pour ce
 *     qu'il est : un choix de prudence adossé à Shavelson, où un schéma à l'écran
 *     relève de la simulation informatique — la moitié basse de l'éventail des
 *     corrélations — et non du cahier d'expérience ;
 *  2. au moins un double QCM juste/juste, pour un savoir-faire porteur d'un
 *     piège. C'est ce qui fait du double QCM le format central sans le rendre
 *     majoritaire : il est la porte, pas le volume ;
 *  3. au plus une réussite de classe C, et c'est ce double QCM — qui EST de
 *     classe C. Les deux conditions sont donc liées, et la seconde est exactement
 *     ce que la première rend inévitable ;
 *  4. au moins une dans le `formatDiagnostique` du piège : sans elle, une
 *     conception d'extramission atteindrait trois réussites au palier 4 sans
 *     jamais avoir été posée en dessin sur un objet non lumineux, c'est-à-dire
 *     dans le seul format où la recherche dit qu'elle se voit.
 *
 * Un savoir-faire `diagnostic: 'absent'` — les quatre d'énergie, « reconnaître
 * qu'un signal transporte une information » — ne remplit aucune de ces conditions
 * par construction. Le déclarer acquis reviendrait à donner la barre la plus
 * basse aux contenus les moins documentés : il est « couvert, non diagnostiqué »,
 * à l'élève comme au panneau parents.
 *
 * `manque` n'est pas un ornement : c'est le verdict, et il alimente le « il te
 * reste ceci » plutôt qu'une barre qui ne bouge pas sans dire pourquoi.
 */
export function estMaitrise(etat, savoirFaire = {}) {
  if (savoirFaire.diagnostic === 'absent') {
    return {
      maitrise: false,
      statut: 'couvert-non-diagnostique',
      manque: ['aucun piège typé : ce savoir-faire n\'est pas diagnostiqué'],
    };
  }
  // `diagnostic` est un énuméré fermé, et son absence n'est pas `'type'`. Le
  // traiter comme un savoir-faire diagnostiqué déclarerait acquis sur la foi d'un
  // champ que personne n'a écrit — exactement la décision que l'invariant 16
  // refuse, prise par défaut au lieu d'être prise par un auteur.
  if (savoirFaire.diagnostic !== 'type') {
    return {
      maitrise: false,
      statut: 'diagnostic-hors-enumere',
      manque: [`diagnostic « ${savoirFaire.diagnostic} » hors énuméré (type | absent)`],
    };
  }

  // Un état sans fenêtre de réussites n'est pas une erreur à lever : c'est un
  // état qui ne déclare AUCUNE des trois réussites, donc un savoir-faire non
  // acquis, et `manque` le dira mot pour mot. Lever ici ferait remonter une pile
  // d'appels à la place d'un verdict chez le seul appelant qui interroge un
  // profil entier — `seance.js`, qui doit rendre une séance quoi qu'il arrive.
  const trois = etat?.dernieresReussites ?? [];
  const seances = new Set(trois.map((r) => r.seance));
  const manque = [];

  if (trois.length < REUSSITES_POUR_MAITRISE) {
    manque.push(`${REUSSITES_POUR_MAITRISE - trois.length} réussite(s) consécutive(s)`);
  }
  if (seances.size < SEANCES_POUR_MAITRISE) {
    manque.push('les réussites tiennent dans une seule séance');
  }
  // Sans cette condition on déclarerait acquis un savoir-faire que l'élève
  // n'exécute que quand la consigne le lui souffle — pour un savoir-faire porteur
  // d'un piège, le palier le plus élevé est le palier NON ÉTIQUETÉ, et c'est là
  // que se joue le contrat didactique.
  //
  // La condition porte sur LES TROIS RÉUSSITES, et non sur `palierMax`, pour la
  // raison qui a fait écrire ce fichier : `palierMax` est une ligne de plus haute
  // eau qu'aucun échec ne redescend, donc `palierMax < palierRate` devient
  // définitivement faux dès la première réussite au palier le plus haut jamais
  // servi. C'était la forme exacte du défaut du moteur de mathématiques — une
  // troisième condition vraie par construction — et le message qu'elle porte,
  // « raté et jamais réussi DEPUIS », promettait déjà ce que le code ne calculait
  // pas : un palier 4 réussi en octobre, raté en mars, puis trois réussites de
  // palier 1 suffisaient à déclarer l'acquisition.
  const palierDesTrois = trois.length > 0 ? Math.max(...trois.map((r) => r.palier ?? 0)) : 0;
  if (palierDesTrois < (etat?.palierRate ?? 0)) {
    manque.push(`palier ${etat.palierRate} raté et jamais réussi depuis`);
  }
  if (palierDesTrois < (etat?.palierMax ?? 0)) {
    manque.push(`palier ${etat.palierMax} déjà atteint, mais aucune des trois réussites n'y est`);
  }
  if (!trois.some((r) => r.cercle !== null && r.cercle !== 3)) {
    manque.push('aucune réussite hors cercle 3 (lecture de dispositif seule)');
  }
  if (!trois.some((r) => r.doubleQcm === true)) {
    manque.push('aucun double QCM juste/juste');
  }
  if (trois.filter((r) => r.classe === 'C').length > 1) {
    manque.push('plus d\'une réussite de classe C');
  }
  if (!trois.some((r) => r.estFormatDiagnostique === true)) {
    manque.push('aucune réussite dans le format diagnostique du piège');
  }

  return {
    maitrise: manque.length === 0,
    statut: manque.length === 0 ? 'acquis' : 'en-cours',
    manque,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// Le contrôle côté auteur — la part de l'invariant 14 qui se lit sur un piège
// ════════════════════════════════════════════════════════════════════════════

/**
 * Ce que l'invariant 14 refuse au contenu, en une fonction destinée à
 * `tools/verifier-contenu.mjs`. Renvoie la liste des anomalies ; vide = conforme.
 *
 * Elle est ici plutôt que dans l'outil, pour la raison qui vaut dans tout le
 * projet : c'est ce fichier qui décide ce qu'est un rythme et ce qu'est un
 * dispositif, et un contrôle qui referait sa propre lecture contrôlerait autre
 * chose que ce que le moteur exécute.
 *
 * Le refus « une échéance dans le corpus » n'est pas décoratif : c'est la faute
 * exacte que la v1 de la charte rendait possible en appelant `echeance` un champ
 * de contenu. Une échéance écrite dans le catalogue serait la même pour tous les
 * élèves, donc ne serait plus une échéance.
 */
export function controlerPiegeSrs(piege = {}) {
  const anomalies = [];

  if (!entierPositif(piege.rythmeInitial)) {
    anomalies.push({
      code: 'RYTHME_INITIAL_ABSENT',
      message: `« ${piege.id} » : rythmeInitial absent ou non entier positif (${piege.rythmeInitial}).`,
    });
  }
  for (const champ of ['echeance', 'revoirALaSeance', 'intervalle', 'prochaineSeance']) {
    if (piege[champ] !== undefined) {
      anomalies.push({
        code: 'ECHEANCE_DANS_LE_CORPUS',
        message: `« ${piege.id} » porte « ${champ} » : une échéance est une donnée de profil élève, le contenu ne porte qu'un rythme.`,
      });
    }
  }
  if (!rangValide(piege.rang)) {
    anomalies.push({
      code: 'RANG_HORS_ENUMERE',
      message: `« ${piege.id} » : rang « ${piege.rang} » hors énuméré (1 | 2 | 3).`,
    });
  }
  if (piege.rang === 1) {
    const contextes = new Set(
      dispositifsDeReconfrontation(piege).map((d) => d.contexteDeSurface).filter(Boolean),
    );
    if (contextes.size < 2) {
      anomalies.push({
        code: 'VARIATION_INSUFFISANTE',
        message: `« ${piege.id} » est de rang 1 et ne porte que ${contextes.size} contexte(s) de surface : à la deuxième re-confrontation, l'élève se souviendra du résultat.`,
      });
    }
  }
  // Un rythme initial déjà au-dessus du plafond de son rang serait un piège que
  // le plafond ne borne plus : la première re-confrontation tomberait après la
  // borne que la charte garantit.
  if (entierPositif(piege.rythmeInitial) && piege.rythmeInitial > PLAFOND_INTERVALLE[piege.rang]) {
    anomalies.push({
      code: 'RYTHME_AU_DESSUS_DU_PLAFOND',
      message: `« ${piege.id} » : rythmeInitial ${piege.rythmeInitial} dépasse le plafond ${PLAFOND_INTERVALLE[piege.rang]} du rang ${piege.rang}.`,
    });
  }

  return anomalies;
}
