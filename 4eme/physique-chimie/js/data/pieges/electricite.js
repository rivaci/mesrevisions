// Les pièges de l'électricité — la famille la mieux documentée du corpus.
//
// Un piège n'est pas une erreur constatée : c'est une CONCEPTION documentée.
// L'élève qui répond « la deuxième lampe brille moins » n'a pas mal lu l'énoncé,
// il applique un modèle cohérent qui prédit correctement la quasi-totalité de ce
// qu'il a vu dans sa vie. Le catalogue décrit ce modèle, dit d'où on le sait, et
// dit comment le mettre en défaut.
//
// ── Pourquoi ces cinq-là ───────────────────────────────────────────────────
//
// `didactique.md` § 8 range l'électricité en tête de ce qui est « solidement
// établi » : source-consommateur, courant qui s'use, raisonnement séquentiel,
// pile-courant-constant sont chiffrés par âge, répliqués sur cinq pays, et
// portent les seules données françaises massives du corpus (Dupin & Johsua 1987,
// 920 sujets de la 6e à l'université). Le cinquième, le branchement des appareils
// de mesure, n'est pas une conception de la littérature internationale : c'est un
// échec MESURÉ EN FRANCE, sur source primaire, en fin de collège.
//
// Ce que la famille NE couvre PAS, et volontairement :
//
//   · les courants antagonistes (le courant sortant des deux bornes de la pile) —
//     rang 3 : ~35 % à 12 ans, ~10 % à 14 ans, 0 % à 17 ans (§ 7). À l'âge visé,
//     ce piège est déjà largement résolu ; y dépenser un créneau, c'est en retirer
//     un à ceux qui montent ;
//   · « l'énergie est perdue dans les frottements » — § 5.4 le marque ○ (aucun
//     chiffre, aucune donnée sur 12-14 ans) et la charte en fait une HYPOTHÈSE de
//     regroupement avec « le courant s'use », pas une identité. Il relève du fil
//     transversal « énergie », pas d'ici, et il portera `fiabilite:
//     non-documente` là où il sera écrit ;
//   · la loi d'Ohm, la puissance, le court-circuit comme règle de sécurité : ce
//     sont des savoir-faire, pas des conceptions typées.
//
// ── Le rang, et les deux cas où `didactique.md` ne tranche pas ──────────────
//
// Critère du § 7, repris mot pour mot : rang 1 = persistance MESURÉE après un
// enseignement qui la visait explicitement ; rang 2 = conception que
// l'enseignement FABRIQUE ; rang 3 = conception qui cède effectivement à cet âge.
//
//   · `courant-qui-s-use` — rang 1, nommé au § 7 ④ (« le modèle unidirectionnel
//     sans conservation passe de ~50 % à 12 ans à ~60 % à 14 ans, puis ~40 % à
//     17 ans »). Fiabilité ◆ : Shipstone 1984 repris de Tallant 1993, jamais relu
//     sur l'original. C'est l'un des trois ◆ que `questions-ouvertes.md` § 1
//     désigne comme portant une décision d'architecture.
//   · `pile-generateur-de-courant-constant` et `raisonnement-sequentiel` —
//     rang 2, nommés au § 7. Voir la section suivante.
//   · `pile-fabrique-le-courant-ampoule-le-consomme` — LE § 7 NE LE CLASSE PAS.
//     Il est chiffré (§ 6.1a : ~80 % des 550 élèves de 12-15 ans d'Andersson 1982 ;
//     ~60 % des élèves de 6e chez Dupin & Johsua ; 10 professeurs sur 14 chez
//     Heller & Finley) mais aucune source ne mesure sa persistance CONTRE un
//     enseignement qui la visait. Nous le déclarons **rang 1 par élimination, et
//     non par preuve** : le rang 3 est frontalement contredit par les chiffres
//     ci-dessus, le rang 2 n'est revendiqué par aucun auteur, et le champ n'admet
//     pas de troisième issue. C'est le point de ce fichier à revoir en premier
//     quand le dépouillement de CEDRE 2024 (§ 10) sera fait.
//   · `mesurer-en-coupant-le-circuit` — LE § 7 NE LE CLASSE PAS NON PLUS, pour
//     une raison différente : il n'est pas issu de la littérature des conceptions
//     mais de la mesure institutionnelle française. CEDRE 2024 (DEPP, note
//     n°26.13, note primaire lue) donne 64 % de branchements corrects pour
//     l'ampèremètre et 40 % pour le voltmètre, sur des élèves de 3e — donc APRÈS
//     l'enseignement d'un savoir-faire qui le vise explicitement (« brancher un
//     voltmètre en dérivation », ch. 2). Le critère du rang 1 est ici tenu à la
//     lettre, sur une source ✔ ; c'est nous, et non `didactique.md`, qui faisons
//     la déduction, et elle est écrite ici pour être contestable.
//
// ── Les deux pièges que NOUS fabriquerons — rang 2 ──────────────────────────
//
// C'est le résultat le plus opérationnel du dossier. Dupin & Johsua font
// l'hypothèse que la pile-générateur-de-courant-constant est produite par
// l'insistance mise sur la conservation du courant ; Rhöneck & Grob écrivent que
// « quand on introduit le sens du courant, le raisonnement séquentiel est
// inévitable ». L'application enseignera les deux — la loi d'unicité de
// l'intensité (ch. 7) et le sens du courant sur un schéma (ch. 2). Elle
// installera donc ces conceptions chez des élèves qui ne les avaient pas.
//
// D'où le champ `iatrogene`, qui porte l'identifiant du savoir-faire producteur
// dans l'espace de nommage des fichiers frères — `chNN-sfN-slug`, celui de
// `symbolique.js`. Écrit autrement (`sf-7-4`), il ne se résout sur rien et le
// contrôle de l'invariant 14 n'a plus d'ordre à vérifier.
//
// Le moteur ne doit JAMAIS programmer un piège de rang 2 avant son producteur, et
// la progression ne le garantit QUE pour l'un des deux. Pour le raisonnement
// séquentiel, `ch02-sf1-schematiser-un-circuit` est au chapitre 2, le piège
// démarre au chapitre 7 : l'ordre est acquis sans rien demander à personne. Pour
// la pile-courant-constant, `ch07-sf4-loi-d-unicite-de-l-intensite` est DANS le
// chapitre 7, c'est-à-dire dans le même chapitre que le piège — rien dans le
// contenu ne dit lequel des deux passe d'abord, et c'est au moteur, seul, de
// tenir l'ordre. La version précédente de ce commentaire affirmait que les deux
// `chapitreOrigine` suffisaient ; ils ne suffisent que pour le premier.
//
// ── Ce que ce fichier impose au reste de l'application ─────────────────────
//
// Quatre des cinq pièges ont pour `chapitreOrigine` le chapitre 7, et
// l'invariant 14 refuse « un piège de rang 1 qui n'apparaît que dans son
// chapitre d'origine (minimum : deux chapitres postérieurs) ». Or après le
// chapitre 7, `programme.md` ne porte qu'un seul chapitre d'électricité — le
// bloc optionnel A, loi d'Ohm — et il est `frontiere`, donc désactivable par
// l'élève. `courant-qui-s-use` et `pile-fabrique-le-courant-ampoule-le-consomme`,
// tous deux de rang 1, n'ont donc PAS deux chapitres postérieurs disponibles.
// Ce n'est pas réparable ici : c'est une contrainte sur l'écriture des items —
// leurs re-confrontations devront être portées par des savoir-faire du chapitre 2
// et du bloc A, ou l'invariant devra admettre qu'un piège d'électricité se
// re-confronte dans un chapitre postérieur qui n'est pas d'électricité. À
// trancher avant l'écriture des items, pas après. `mesurer-en-coupant-le-circuit`
// n'a pas le problème : parti du chapitre 2, il a le chapitre 7 et le bloc A.
//
// Conséquence de ton, qui n'est pas une politesse — et qui ne porte PAS sur les
// deux pièges du paragraphe précédent, comme une rédaction antérieure le laissait
// lire, mais sur les DEUX RANGS 2, `raisonnement-sequentiel` et
// `pile-generateur-de-courant-constant` : sur ceux-là, la réfutation doit
// commencer par ACCORDER la loi qu'on vient d'enseigner. Elle est vraie. Ce qui
// est faux, c'est le périmètre que l'élève lui donne — et c'est nous qui lui avons
// laissé croire qu'il n'y en avait pas.
//
// ── Ce qui ne figure pas dans le contenu servi à l'élève ────────────────────
//
// Aucun pourcentage. Tous les chiffres ci-dessus sont ◆ sauf CEDRE, et un chiffre
// de revue secondaire devenu argument est exactement ce qui a produit l'épisode
// du « 57 % d'ampèremètre ». Ils restent dans ce commentaire et dans
// `didactique.md`.
//
// Aucun `antecedentHistorique` non plus. Le champ existe pour le capital force
// (Viennot : « exactement la théorie médiévale de l'impetus ») et pour
// l'extramission. Servie ici, la phrase « des savants l'ont cru » fabriquerait de
// l'histoire des sciences.
//
// Et aucune analogie hydraulique, nulle part. § 6.1f : « l'analogie de la rivière
// risque de renforcer les élèves dans leur raisonnement séquentiel », et le
// circuit hydraulique fermé « est mal compris et ne peut pas servir de
// fondation ». Une métaphore s'audite comme un énoncé ; celle-là installerait
// précisément le piège n°3 de ce fichier. Les comparaisons retenues (le péage, le
// compteur) portent sur le GESTE DE MESURE, jamais sur la circulation.
//
// ── La `situation`, objet formel dont l'énoncé est engendré ─────────────────
//
// `conditionValidite` est un PRÉDICAT EXÉCUTABLE, pas une case à cocher. La
// charte est explicite : la condition est dérivée, « le contrôle lit la
// situation, pas le drapeau », et pour le raisonnement séquentiel elle exige que
// la position d'un dipôle en aval soit « lue sur le graphe du circuit et non sur
// un booléen ». Les prédicats ci-dessous lisent donc le graphe, avec le module
// `js/circuit.js` comme source de vérité.
//
//   situation = {
//     circuit,        // graphe au format js/circuit.js (celui d'APRÈS la
//                     // modification, quand il y en a une)
//     circuits,       // deux graphes ou plus, pour les items de comparaison ;
//                     // le MÊME générateur y porte le MÊME identifiant — c'est
//                     // ce qui fait de « la même pile » une donnée du graphe
//     mesures,        // [{ id, type }] — les appareils déjà posés, à lire
//     mesure,         // { appareil, type, cible } — l'appareil à PLACER
//     modification,   // { dipole, nature } | null — le dipôle ajouté ou changé
//     pointDeMesure,  // id de l'appareil depuis lequel on raisonne
//     demande,        // 'valeur' | 'comparaison' | 'justification'
//                     //   | 'valeur-et-justification' | 'schema'
//                     // La quatrième entrée manquait, et son absence rendait le
//                     // `formatDiagnostique` du piège ① inatteignable : il exige
//                     // un DOUBLE QCM — une valeur ET la justification qui va
//                     // avec — alors que sa `conditionValidite` n'acceptait que
//                     // 'justification'. Aucune situation ne pouvait satisfaire
//                     // les deux, et la condition 4 du critère de maîtrise
//                     // (« une réussite dans le formatDiagnostique ») n'était
//                     // remplissable par rien.
//     contexte,       // identifiant de contexte de surface
//   }
//
// ── Les constats ───────────────────────────────────────────────────────────
//
// Un constat est un dispositif où l'élève PRÉDIT d'abord. `predictionEngagee`
// est verrouillée avant que `resultat` ne soit affiché, et `conflit` dit ce que
// l'écart contredit : sans engagement préalable il n'y a pas de conflit, juste
// une information de plus. L'ordre des clés ne garantit rien — c'est au moteur
// de tenir la règle, et de ne jamais servir deux fois le même constat pour un
// même piège. Ces trois noms, et `contexteDeSurface`, sont ceux des quatre
// familles depuis leur réconciliation : ici `prediction`, `conclusion` et
// `contexte` (au niveau du constat — celui de la `situation` n'a pas bougé).
//
// Chaque piège de rang 1 en porte au moins deux, de contextes de surface
// DIFFÉRENTS : à la deuxième re-confrontation, un constat identique ne serait
// plus une réfutation mais un test de mémoire.
//
// ── Le contre-modèle ───────────────────────────────────────────────────────
//
// `contreModele.predire` EXÉCUTE le modèle de l'élève et dit ce qu'il prédirait.
// Le verdict n'est donc pas rédigé à la main. Quatre des cinq pièges en portent
// un ; le cinquième, le branchement des appareils, n'en a pas besoin — ses trois
// constats sont déjà exécutables par `js/circuit.js`, et le simuler reviendrait à
// réécrire des messages qui existent.
//
// Deux d'entre eux prennent en paramètre `partConsommeeParRecepteur` : c'est
// l'élève qui la choisit, et le modèle tourne avec SA valeur — l'engagement
// préalable, transposé au contre-modèle.
//
// `relation` et `consequence` sont DÉRIVÉES des valeurs que le modèle vient de
// produire ; elles ne sont pas annoncées d'avance. Une version antérieure les
// écrivait en dur (« strictement inférieure », « une dernière lampe presque
// noire ») en se justifiant de ce que le verdict portait sur une inégalité et non
// sur une valeur. C'était l'inverse qui était vrai : avec une part très petite,
// les deux lectures deviennent ÉGALES après arrondi, et le contre-modèle
// affichait alors deux nombres identiques en affirmant qu'ils diffèrent ; avec
// une part faible sur quatre lampes, il annonçait une extinction que son propre
// calcul ne donne pas. Un contre-modèle qui affirme autre chose que ce qu'il
// calcule n'est plus un contre-modèle, c'est une phrase. Les verdicts disent donc
// « dès que la part n'est pas nulle », et non « quelle que soit la part » : une
// part nulle, c'est l'élève qui a déjà raison, et on ne le réfute pas.
//
// La correction était restée à mi-chemin, et la relecture adverse a trouvé les
// trois morceaux qui manquaient :
//
//   · `courant-qui-s-use` ne mettait dans `lectures` que les valeurs D'APRÈS
//     chaque récepteur, pas celle du départ. Sur le cas canonique — deux
//     ampèremètres de part et d'autre d'UNE lampe, qui est le premier constat du
//     piège — le tableau n'avait donc qu'une entrée, `decroit` était faux, et le
//     contre-modèle annonçait à l'élève que son modèle prédit des lectures
//     CONSTANTES. C'est l'inverse exact de sa conception, servi sur l'item le plus
//     courant du piège. La lecture de départ est maintenant la première du
//     tableau ;
//   · le verdict et la conséquence du même piège parlaient de « quatre valeurs »
//     et de « la guirlande » alors que le modèle tourne sur n'importe quel nombre
//     de récepteurs. Ils sont désormais indépendants du décompte ;
//   · `raisonnement-sequentiel` écrivait sa conséquence, son verdict et son
//     `codeCircuit` pour le seul cas de l'interrupteur ouvert, alors que sa
//     `conditionValidite` admet AUSSI l'ajout d'un récepteur — le premier de ses
//     deux constats. Sur cet item-là, « le circuit est ouvert » est faux et
//     `diagnostiquer()` ne rend pas CIRCUIT_OUVERT. La conséquence est dérivée
//     d'un paramètre, le verdict couvre les deux cas, et le `codeCircuit` est
//     descendu sur le constat qui le vérifie — là où le piège ⑤ le met déjà.

import {
  formeCanonique, normaliser, sensDuCourant, TYPES_AVEC_RESISTANCE,
} from '../../circuit.js';

// ── Lire la boucle, plutôt que la déclarer ─────────────────────────────────

/** Les types qui opposent une résistance, générateur exclu : ce sont eux qui
 *  « consomment » dans le modèle de l'élève, et eux qui séparent deux points de
 *  mesure. */
const estRecepteur = (type) => TYPES_AVEC_RESISTANCE.includes(type) && type !== 'pile';

/**
 * La boucle du courant, dans l'ordre où le courant la parcourt.
 *
 * Renvoie `{ ordre, types, etats, pile }` ou `null`. Refuse — ne devine pas — dès que le
 * circuit n'est pas une maille unique : « en aval » n'a alors plus de sens
 * univoque, et répondre sur une boucle inventée serait pire que se taire. C'est
 * le contrat de `js/circuit.js`, tenu ici aussi.
 *
 * Les voltmètres sont retirés d'abord : idéaux, aucun courant ne les traverse, et
 * les laisser créerait des jonctions là où le courant n'en voit pas.
 */
function analyserBoucle(circuit) {
  const brut = normaliser(circuit);
  if (!brut.ok) return null;

  const dipoles = brut.dipoles
    .filter((d) => d.type !== 'voltmetre')
    .map((d) => ({ id: d.id, type: d.type, etat: d.etat, bornes: d.bornes }));
  if (dipoles.length < 2) return null;

  const g = normaliser({ dipoles });
  if (!g.ok) return null;
  if ([...g.degre.values()].some((deg) => deg !== 2)) return null;

  const sens = sensDuCourant(g);
  if (!sens) return null;

  const ordre = [];
  const depart = g.dipoles[0];
  let d = depart;
  do {
    ordre.push(d.id);
    const s = sens.get(d.id);
    if (s === undefined) return null;
    const sortie = s === 1 ? d.bornes[1] : d.bornes[0];
    const suivant = g.incidents.get(sortie).find((id) => id !== d.id);
    if (suivant === undefined) return null;
    d = g.parId.get(suivant);
  } while (d.id !== depart.id && ordre.length <= g.dipoles.length);

  if (ordre.length !== g.dipoles.length) return null;
  const types = new Map(g.dipoles.map((x) => [x.id, x.type]));
  // L'état de l'interrupteur, parce qu'un interrupteur OUVERT change le circuit
  // et qu'un interrupteur FERMÉ n'y change rien : la distinction décide de la
  // validité d'un item du raisonnement séquentiel.
  const etats = new Map(g.dipoles.map((x) => [x.id, x.etat]));
  const pile = g.dipoles.find((x) => x.type === 'pile');
  return pile ? { ordre, types, etats, pile: pile.id } : null;
}

/** Ce que le courant rencontre entre `depuis` et `jusqua`, les deux exclus.
 *  `null` si l'un des deux n'est pas sur la boucle. */
function segment(ordre, depuis, jusqua) {
  const i = ordre.indexOf(depuis);
  const j = ordre.indexOf(jusqua);
  if (i < 0 || j < 0 || i === j) return null;
  const entre = [];
  for (let k = (i + 1) % ordre.length; k !== j; k = (k + 1) % ordre.length) entre.push(ordre[k]);
  return entre;
}

/** « En aval du point de mesure » = ce que le courant rencontre en partant de
 *  l'appareil et AVANT de revenir au générateur. Dans une boucle, tout est aussi
 *  bien avant qu'après : c'est le générateur qui fait l'origine, et c'est
 *  exactement l'ordre de lecture que l'élève applique. */
const enAval = (b, ref) => segment(b.ordre, ref, b.pile);

const recepteursDe = (b) => b.ordre.filter((id) => estRecepteur(b.types.get(id)));

/**
 * Une boucle dont aucun interrupteur n'est ouvert.
 *
 * Un interrupteur ouvert met TOUTES les lectures à zéro. « La même intensité
 * partout » y est alors vraie sans rien devoir au raisonnement, et l'élève qui
 * avait prédit deux valeurs décroissantes serait démenti par un circuit mort et
 * non par sa conception : il aurait raison de trouver la réfutation truquée.
 * Les pièges ① et ② l'exigent donc ; ③ ne l'exige pas, l'interrupteur ouvert en
 * aval étant précisément l'un de ses deux constats.
 */
const boucleFermee = (b) => b.ordre.every((id) => b.etats.get(id) !== 'ouvert');

/**
 * La charge qu'un circuit oppose à sa pile : sa forme canonique, appareils de
 * mesure ôtés. Deux circuits de charges égales débitent la même intensité, et
 * l'item ne teste alors rien.
 *
 * Le multi-ensemble trié des récepteurs ne suffisait pas, et c'est le contrôle
 * qui l'a montré : deux lampes EN SÉRIE et deux lampes EN DÉRIVATION donnent le
 * même multi-ensemble alors que la pile n'y débite pas du tout la même chose. La
 * comparaison refusait donc l'un des items les plus démonstratifs qui soient, sur
 * le piège même qu'il est fait pour mettre en défaut. La forme canonique, elle,
 * porte la topologie.
 *
 * Les appareils retirés avant comparaison parce qu'ils ne font pas la charge : un
 * ampèremètre idéal est un fil — donc une identité entre deux nœuds, que
 * `normaliser` contracte — et un voltmètre idéal une branche absente. Sans cela,
 * « une lampe » et « une lampe plus l'ampèremètre qui la mesure » seraient deux
 * charges différentes.
 *
 * L'interrupteur FERMÉ est traité comme un fil pour la même raison, et c'est la
 * relecture adverse qui l'a trouvé : sa clé canonique porte `interrupteur:ferme`,
 * si bien que « une lampe » et « une lampe avec son interrupteur fermé »
 * passaient pour deux charges différentes. L'item était alors déclaré valide
 * alors que la pile y débite exactement la même intensité — c'est-à-dire que la
 * conception fausse y prédit JUSTE, et que l'élève repartait conforté sur le
 * piège même qu'on prétendait lui opposer. `js/circuit.js` range déjà
 * l'interrupteur fermé parmi les résistances nulles (`estResistanceNulle`) ; on
 * ne fait ici que le suivre. L'interrupteur OUVERT, lui, reste dans la clé : il
 * ne fait pas la même charge, il l'interrompt.
 *
 * `null` si le circuit n'a aucun récepteur : la pile y est en court-circuit, et
 * comparer deux montages dont l'un n'oppose rien n'apprend rien à personne.
 */
function signatureDeCharge(circuit) {
  const g = normaliser(circuit);
  if (!g.ok || !g.dipoles.some((d) => estRecepteur(d.type))) return null;
  const resistanceNulle = (d) => d.type === 'amperemetre'
    || (d.type === 'interrupteur' && d.etat === 'ferme');
  const dipoles = g.dipoles
    .filter((d) => d.type !== 'voltmetre')
    .map((d) => (resistanceNulle(d)
      ? { id: d.id, type: 'fil', bornes: d.bornes }
      : { id: d.id, type: d.type, etat: d.etat, bornes: d.bornes }));
  return formeCanonique({ dipoles }).cle;
}

const arrondi = (x) => Number(x.toPrecision(3));

export default {
  // ══════════════════════════════════════════════════════════════════════════
  //  ① La pile fabrique, l'ampoule consomme
  //
  //  Source : didactique.md § 6.1a — Andersson et al. 1982 (550 élèves de
  //  12-15 ans), Dupin & Johsua 1987 (920 sujets, données françaises), Heller &
  //  Finley 1989 (les professeurs). Tous ◆, via Tallant 1993. Rang non tranché
  //  au § 7 : voir l'en-tête, rang 1 par élimination.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « l'ampèremètre du retour
  //  lit moins que celui du départ, parce que la lampe a pris du courant ». La
  //  règle dit que c'est la même intensité qui part et qui revient, et que ce qui
  //  s'épuise est une réserve d'ÉNERGIE — elle contredit la valeur ET la
  //  justification. Le contrôle le fait voir sans l'appli : sur le fil de retour,
  //  la différence manquante devrait être quelque part, et il n'y a là qu'un fil.
  // ══════════════════════════════════════════════════════════════════════════
  'pile-fabrique-le-courant-ampoule-le-consomme': {
    id: 'pile-fabrique-le-courant-ampoule-le-consomme',
    conception:
      'Le courant est une substance que le générateur fabrique et que les '
      + 'récepteurs consomment : il en revient à la pile moins qu\'il n\'en est '
      + 'parti, et c\'est cette consommation qui use la pile. Courant et énergie '
      + 'ne sont pas distingués.',
    enonceEleve:
      "La pile fabrique le courant, l'ampoule le consomme — c'est bien pour ça "
      + "qu'une pile finit par être vide.",
    rang: 1,
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch07-intensite-du-courant',
    rythmeInitial: 4,
    formatDiagnostique: {
      modeDeReponse: 'Double QCM — une valeur de lecture ET la justification qui va avec.',
      contexteImpose:
        'Un circuit dont le récepteur « rend » quelque chose de visible (lumière, '
        + 'mouvement, chaleur).',
      pourquoi:
        'La valeur seule ne sépare rien : on peut lire juste et penser que la lampe '
        + 'a prélevé sa part.',
    },
    // Un item ne teste la conception que s'il porte sur CE QUI REVIENT au
    // générateur — donc si un point de mesure se trouve sur le chemin de retour,
    // après le dernier récepteur — et s'il demande la justification.
    //
    // La justification peut être demandée seule ou avec la valeur : le
    // `formatDiagnostique` ci-dessus exige le DOUBLE QCM, et n'accepter que
    // 'justification' rendait ce format irrecevable par la condition du piège
    // qui le déclare. Ce qui est refusé, c'est la valeur SEULE — « on peut lire
    // juste et penser que la lampe a prélevé sa part ».
    conditionValidite: (situation) => {
      const demande = situation?.demande;
      if (demande !== 'justification' && demande !== 'valeur-et-justification') return false;
      const b = analyserBoucle(situation.circuit);
      if (!b || !boucleFermee(b) || recepteursDe(b).length === 0) return false;
      return (situation.mesures ?? []).some((m) => {
        if (m.type !== 'amperemetre') return false;
        const aval = enAval(b, m.id);
        return aval !== null && aval.every((id) => !estRecepteur(b.types.get(id)));
      });
    },
    regle:
      'Ce qui sort de la pile et ce qui y revient, c\'est **la même intensité** : '
      + 'la lampe ne prélève pas de courant, elle **convertit de l\'énergie**. '
      + 'La pile s\'use, c\'est vrai — mais elle ne se vide pas de son courant, '
      + 'elle épuise sa réserve d\'énergie chimique.',
    controle:
      'Place-toi par la pensée sur le fil de retour, juste avant la borne « − » de '
      + 'la pile, et demande-toi ce qu\'y lirait un ampèremètre. Si ta réponse est '
      + 'plus petite qu\'au départ, cherche où serait passée la différence : entre '
      + 'les deux, il n\'y a qu\'un fil, et tout ce qui entre dans un dipôle en ressort.',
    raisonnements: [
      {
        id: 'la-pile-finit-vide',
        texte: 'Une pile finit par être vide, donc quelque chose est bien consommé',
        reponse:
          'Tu as raison, et c\'est vérifiable : une pile s\'use vraiment, et elle '
          + 's\'use plus vite si on laisse le circuit fermé. Ce qui s\'épuise, c\'est '
          + 'sa réserve d\'énergie chimique. Le courant, lui, ne s\'entasse et ne '
          + 'disparaît nulle part : il tourne.',
      },
      {
        id: 'elle-rend-de-la-lumiere',
        texte: 'L\'ampoule reçoit du courant et rend de la lumière : elle l\'a donc transformé',
        reponse:
          'Elle transforme quelque chose, oui — de l\'énergie, et ton raisonnement '
          + 'est bon sur ce point. Le compte tombe juste côté énergie ; il ne tombe '
          + 'pas juste côté courant : la même intensité entre dans la lampe et en sort.',
      },
      {
        id: 'ca-marche-partout-ailleurs',
        texte: 'Partout ailleurs, ce qui sert est consommé — je raisonne comme d\'habitude',
        reponse:
          'Et tu as raison presque partout : l\'essence, la nourriture, le crédit du '
          + 'téléphone, tout cela se consomme vraiment. Ce modèle prédit juste dans la '
          + 'quasi-totalité de ta vie quotidienne. Le circuit fermé est une des rares '
          + 'exceptions — et les physiciens n\'oublient pas ce modèle, ils apprennent à '
          + 'le suspendre quand ils voient une boucle.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Repars du fil de retour : que lirait un ampèremètre juste avant la borne « − » ?',
      },
    ],
    constats: [
      {
        id: 'deux-amperemetres-lampe-de-poche',
        contexteDeSurface: 'pile-lampe',
        dispositif:
          'Une pile, une lampe, et deux ampèremètres : A1 entre la pile et la lampe, '
          + 'A2 entre la lampe et le retour à la pile.',
        predictionEngagee: {
          question: 'Avant de fermer l\'interrupteur : que va afficher chaque appareil ?',
          champs: [
            { id: 'a1', etiquette: 'A1 (avant la lampe)', unite: 'A' },
            { id: 'a2', etiquette: 'A2 (après la lampe)', unite: 'A' },
          ],
        },
        resultat: 'Les deux appareils affichent la même valeur, au chiffre près.',
        conflit:
          'La lampe n\'a rien retenu. Ce qu\'elle a pris, elle l\'a pris à l\'énergie, '
          + 'et ça ne se lit pas sur un ampèremètre.',
      },
      {
        id: 'batterie-et-moteur-de-ventilateur',
        contexteDeSurface: 'batterie-moteur',
        dispositif:
          'Une batterie, un petit moteur de ventilateur qui tourne visiblement, un '
          + 'ampèremètre juste avant lui — celui-là affiche sa valeur, tu la lis — et '
          + 'un autre sur le fil de retour à la batterie, encore masqué.',
        // La lecture d'entrée est DONNÉE avant la prédiction : sans elle, l'élève
        // doit avancer un nombre qu'il n'a aucun moyen de calculer, et le résultat
        // (« la même valeur qu'à l'entrée ») ne se compare à rien de ce qu'il a
        // engagé. Un engagement qu'on ne peut pas confronter ne fait pas conflit.
        predictionEngagee: {
          question:
            'Le moteur tourne : il travaille, il chauffe, il fait du bruit. Tu as sous '
            + 'les yeux ce qu\'affiche l\'appareil d\'entrée — que va afficher celui du '
            + 'retour ?',
          champs: [{ id: 'retour', etiquette: 'ampèremètre du retour', unite: 'A' }],
        },
        resultat: 'La même valeur qu\'à l\'entrée du moteur.',
        conflit:
          'Un moteur qui travaille beaucoup ne renvoie pas moins de courant : il '
          + 'prélève davantage d\'énergie, et l\'intensité, elle, est la même des deux côtés.',
      },
    ],
    contreModele: {
      enonce:
        'Si le récepteur consommait du courant, il en reviendrait moins à la pile '
        + 'qu\'il n\'en est parti.',
      // Le modèle a un paramètre libre : la part consommée. C'est l'élève qui la
      // fixe, et le modèle tourne avec SA valeur — s'il en choisit une autre, la
      // conclusion ne bouge pas, ce qui est justement le propre d'un modèle qu'on
      // réfute.
      predire: ({ intensiteAuDepart, partConsommeeParRecepteur, nombreDeRecepteurs = 1 }) => {
        const restant = intensiteAuDepart * (1 - partConsommeeParRecepteur) ** nombreDeRecepteurs;
        const depart = arrondi(intensiteAuDepart);
        const retour = arrondi(restant);
        // Lue sur les deux valeurs AFFICHÉES, jamais annoncée d'avance : une part
        // nulle — ou assez petite pour que l'arrondi les confonde — les rend
        // égales, et le contre-modèle ne peut pas affirmer une différence que les
        // nombres qu'il montre ne portent pas.
        return { depart, retour, relation: retour < depart ? 'strictement inférieure' : 'égale' };
      },
      verdict:
        'Dès que la part que tu choisis n\'est pas nulle, ton modèle prédit deux '
        + 'lectures différentes. Les deux appareils affichent la même valeur.',
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ② Le courant s'use le long du circuit
  //
  //  Source : didactique.md § 6.1b et § 7 ④ — Shipstone 1984, modèle
  //  « unidirectionnel sans conservation », ~50 % à 12 ans, ~60 % à 14 ans, ~40 %
  //  à 17 ans. ◆ (repris de Tallant 1993, non relu sur l'original.) Le pic tombe
  //  exactement sur la classe visée : la conception ne recule pas pendant les
  //  années où on l'enseigne, elle monte.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « A1 = 0,30 A, A2 = 0,15 A ».
  //  La règle dit que l'intensité est la même partout dans un circuit série et que
  //  ce qui diminue quand on ajoute des lampes diminue PARTOUT À LA FOIS — elle
  //  contredit l'inégalité, tout en accordant l'observation vraie qui la nourrit.
  //  Le contrôle mord sur la même réponse : entre A1 et A2 il n'y a qu'une lampe,
  //  et il faudrait dire où sont passés les 0,15 A manquants.
  // ══════════════════════════════════════════════════════════════════════════
  'courant-qui-s-use': {
    id: 'courant-qui-s-use',
    conception:
      'Le courant part du générateur avec une certaine intensité et en perd une '
      + 'part à chaque dipôle traversé : plus on est loin de la pile en suivant le '
      + 'sens du courant, moins il en reste.',
    enonceEleve:
      'La deuxième lampe brille moins que la première, parce que le courant est '
      + 'déjà passé par la première.',
    rang: 1,
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch07-intensite-du-courant',
    rythmeInitial: 3,
    formatDiagnostique: {
      modeDeReponse:
        'Prédiction chiffrée de DEUX lectures d\'ampèremètre, saisies avec leur '
        + 'unité et verrouillées avant l\'affichage. Au moins une fois en dessin '
        + 'annoté, où c\'est l\'élève qui place les deux appareils.',
      contexteImpose:
        'Les deux appareils placés de part et d\'autre d\'un récepteur.',
      pourquoi: 'Demandé en choix, le piège se voit beaucoup moins.',
    },
    // Deux points de mesure séparés par au moins un récepteur, lus sur le graphe.
    // Un seul ampèremètre, ou deux appareils qui se suivent sans rien entre eux,
    // ne distinguent pas les deux modèles : l'item ne mesure alors rien.
    //
    // Et le segment séparateur ne doit pas passer par le générateur : dans le
    // modèle de l'élève, l'usure se compte DEPUIS la pile. Deux appareils placés
    // côte à côte après la lampe ont traversé les mêmes récepteurs — son modèle
    // et le bon prédisent alors la même chose, et l'item confirmerait l'élève
    // pour de mauvaises raisons. Le cas est passé au contrôle : il a fallu le
    // corriger ici.
    conditionValidite: (situation) => {
      const b = analyserBoucle(situation?.circuit);
      if (!b || !boucleFermee(b)) return false;
      const appareils = (situation.mesures ?? [])
        .filter((m) => m.type === 'amperemetre').map((m) => m.id);
      if (appareils.length < 2) return false;
      return appareils.some((a) => appareils.some((z) => {
        const entre = segment(b.ordre, a, z);
        return entre !== null && !entre.includes(b.pile)
          && entre.some((id) => estRecepteur(b.types.get(id)));
      }));
    },
    regle:
      'Dans un circuit **en série**, l\'intensité est **la même en tout point** : '
      + 'avant la lampe, après la lampe, dans le fil de retour. Ce qui diminue quand '
      + 'on ajoute une lampe, c\'est cette valeur unique — elle baisse **partout à la '
      + 'fois**, pas le long du chemin.',
    controle:
      'Compare tes deux lectures. Si elles diffèrent, cherche par où la différence '
      + 'serait sortie du circuit : entre les deux appareils il n\'y a que des fils et '
      + 'des dipôles, et un dipôle ne garde rien — tout ce qui y entre en ressort. Tu '
      + 'ne trouveras pas de sortie, parce qu\'il n\'y en a pas.',
    raisonnements: [
      {
        id: 'la-premiere-prend-sa-part',
        texte: 'La première lampe prend sa part, il en reste moins pour la suivante',
        reponse:
          'C\'est le partage, et c\'est ce qu\'on fait avec tout ce qui se distribue. '
          + 'Mais la lampe n\'est pas servie la première : elle est **traversée**. '
          + 'Ce qui entre chez elle en ressort, et la seconde reçoit exactement autant '
          + 'que la première.',
      },
      {
        id: 'elles-brillent-moins',
        texte: "J'ai vu qu'avec deux lampes, elles brillent moins qu'avec une seule",
        reponse:
          'Tu as bien observé, et c\'est vrai : avec deux lampes en série, elles '
          + 'brillent moins. Regarde-les mieux, pourtant — elles brillent moins **toutes '
          + 'les deux, autant l\'une que l\'autre**. Ce n\'est pas la première qui a '
          + 'servi, c\'est le courant qui a baissé partout.',
      },
      {
        id: 'loin-donc-moins',
        texte: 'Plus on est loin de la pile, moins il doit en rester',
        reponse:
          'Ce raisonnement marche pour presque tout ce que tu connais — la chaleur '
          + 'd\'un radiateur, le son qui s\'éloigne, la peinture qui s\'épuise en fin de '
          + 'rouleau. Ici il ne marche pas, et ça ne s\'oublie pas : ça s\'inhibe. C\'est '
          + 'ce que font les physiciens, qui doivent y penser à chaque fois.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Y a-t-il une sortie possible pour le courant entre les deux appareils ?',
      },
    ],
    constats: [
      {
        id: 'deux-amperemetres-de-part-et-d-autre',
        contexteDeSurface: 'pile-lampe',
        dispositif: 'Une pile, une lampe, un ampèremètre juste avant elle et un juste après.',
        predictionEngagee: {
          question: 'Que va afficher chaque appareil ?',
          champs: [
            { id: 'avant', etiquette: 'avant la lampe', unite: 'A' },
            { id: 'apres', etiquette: 'après la lampe', unite: 'A' },
          ],
        },
        resultat: 'Les deux affichent la même valeur.',
        conflit: 'La lampe ne prélève pas de courant. Elle est traversée.',
      },
      {
        id: 'guirlande-quatre-lampes',
        contexteDeSurface: 'guirlande',
        dispositif:
          'Une guirlande de quatre lampes identiques en série, avec un ampèremètre '
          + 'après chacune d\'elles.',
        predictionEngagee: {
          question:
            'Range les quatre lampes de la plus brillante à la moins brillante, puis '
            + 'donne les quatre lectures.',
          champs: [
            { id: 'classement', etiquette: 'ordre des lampes, de la plus brillante à la moins' },
            { id: 'lectures', etiquette: 'les quatre lectures', unite: 'A' },
          ],
        },
        resultat:
          'Les quatre lampes brillent identiquement et les quatre appareils affichent '
          + 'la même valeur.',
        conflit:
          'Il n\'y a pas de « dernière servie ». Enlève une lampe : les trois autres '
          + 'brilleront plus fort, ensemble.',
      },
      {
        id: 'ordre-inverse-moteur-et-resistance',
        contexteDeSurface: 'batterie-moteur',
        dispositif:
          'Une batterie, un moteur et une résistance en série, avec un ampèremètre. '
          + 'On refait le même circuit en échangeant la place du moteur et de la résistance.',
        predictionEngagee: {
          question: 'Le moteur tournera-t-il plus vite, moins vite, ou pareil dans le second montage ?',
          champs: [{ id: 'effet', etiquette: 'plus vite / moins vite / pareil' }],
        },
        resultat: 'Exactement pareil, et l\'ampèremètre affiche la même valeur dans les deux montages.',
        conflit:
          'L\'ordre des dipôles ne change rien. S\'il y avait une part prélevée en '
          + 'chemin, être premier ou dernier ferait une différence — il n\'y en a aucune.',
      },
    ],
    contreModele: {
      enonce:
        'Si chaque dipôle traversé retenait une part du courant, les lectures '
        + 'décroîtraient le long de la boucle.',
      // La LECTURE DE DÉPART ouvre le tableau, et ce n'est pas cosmétique : sans
      // elle, un item à UN SEUL récepteur — deux ampèremètres de part et d'autre
      // d'une lampe, le premier constat de ce piège et sa forme la plus courante —
      // ne produisait qu'une seule valeur. `decroit` était alors faux, et le
      // contre-modèle annonçait à l'élève que SON modèle prédit des lectures
      // constantes : l'inverse exact de sa conception, sur l'item qui la vise le
      // plus directement.
      predire: ({ intensiteAuDepart, partConsommeeParRecepteur, nombreDeRecepteurs }) => {
        let i = intensiteAuDepart;
        const lectures = [arrondi(i)];
        for (let n = 0; n < nombreDeRecepteurs; n += 1) {
          i *= (1 - partConsommeeParRecepteur);
          lectures.push(arrondi(i));
        }
        // Ce que le modèle produit vraiment, et rien de plus. « Presque éteinte »
        // était écrit à la main par-dessus un calcul qui, pour une part faible, ne
        // le donne pas : le contre-modèle promettait un spectacle que son propre
        // résultat ne montrait pas, et l'élève qui avait choisi une petite part
        // pouvait y voir sa prudence confirmée. Le décompte non plus n'est pas
        // annoncé d'avance : « quatre lampes » et « la guirlande » étaient écrits
        // en dur alors que le modèle tourne sur le nombre de récepteurs qu'on lui
        // donne, et il en reçoit un sur le premier constat.
        const derniere = lectures[lectures.length - 1];
        const decroit = derniere < lectures[0];
        return {
          lectures,
          relation: decroit ? 'strictement décroissante' : 'constante',
          consequence: decroit
            ? 'le dernier récepteur recevrait moins que le premier, et devrait donc '
              + 'fonctionner visiblement moins bien que lui — une lampe plus sombre, '
              + 'un moteur plus lent'
            : 'tous les récepteurs fonctionneraient identiquement — c\'est ce que ton '
              + 'modèle prédit lui-même si rien n\'est prélevé en chemin',
        };
      },
      verdict:
        'Dès que la part que tu choisis n\'est pas nulle, ton modèle prédit des lectures '
        + 'qui baissent le long de la boucle et un dernier récepteur moins alimenté que '
        + 'le premier. Les appareils affichent tous la même valeur, et les lampes '
        + 'brillent pareil.',
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ③ Le raisonnement séquentiel — RANG 2, NOUS LE FABRIQUONS
  //
  //  Source : didactique.md § 6.1c et § 7 (rang 2) — Closset 1983 (thèse
  //  française), Rhöneck & Grob 1987 : « quand on introduit le sens du courant, le
  //  raisonnement séquentiel est inévitable ». Robustesse extrême : 28 % de 230
  //  étudiants de licence de biologie raisonnaient encore séquentiellement
  //  (Danusso & Dupre 1987). Tous ◆.
  //
  //  `iatrogene: 'ch02-sf1-schematiser-un-circuit'` — « Schématiser un circuit
  //  avec les symboles normalisés » (programme.md, ch. 2), dès que le sens du
  //  courant y figure. Le piège démarre au chapitre 7, donc après lui : c'est le
  //  seul des deux rangs 2 du fichier dont la contrainte de programmation soit
  //  tenue par la progression elle-même.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « j'ai ajouté une lampe
  //  après l'ampèremètre, donc il affiche toujours 0,30 A ». La règle dit qu'un
  //  circuit est une boucle sans début ni fin et que l'ajout change aussi ce qui
  //  se lit en amont — elle contredit la réponse. Le contrôle la contredit
  //  autrement, et sans l'appli : on repart du dipôle ajouté et on suit la boucle
  //  du doigt ; on revient au point de mesure, donc il est concerné.
  // ══════════════════════════════════════════════════════════════════════════
  'raisonnement-sequentiel': {
    id: 'raisonnement-sequentiel',
    conception:
      'Le courant parcourt le circuit dans l\'ordre où on le lit, et ce qu\'il '
      + 'rencontre après un point ne peut pas agir sur ce qui se passe avant : une '
      + 'modification en aval du point de mesure y est sans effet. C\'est une '
      + 'causalité temporelle appliquée à un système stationnaire.',
    enonceEleve:
      "J'ai ajouté une lampe après l'ampèremètre : ça ne peut pas changer ce qu'il "
      + 'affiche, le courant est déjà passé.',
    rang: 2,
    iatrogene: 'ch02-sf1-schematiser-un-circuit',
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch07-intensite-du-courant',
    rythmeInitial: 5,
    formatDiagnostique: {
      modeDeReponse:
        'Item de prédiction. Au moins une fois en dessin annoté, où l\'élève marque '
        + 'lui-même le point de mesure et le dipôle ajouté.',
      contexteImpose:
        'La modification est EN AVAL du point de mesure et la question porte sur '
        + 'l\'AMONT.',
      pourquoi:
        'Le tracé du sens du courant est ce qui déclenche la conception, c\'est donc '
        + 'là qu\'il faut aller la chercher.',
    },
    // La charte l'exige explicitement : « présence déclarée d'un dipôle en aval du
    // point de mesure, lue sur le graphe du circuit et non sur un booléen ».
    // Une modification en amont ne teste rien — les deux modèles y prédisent la
    // même chose.
    //
    // Mais la position ne suffit pas, et s'en contenter retournait le piège contre
    // l'élève. Ajouter en aval un interrupteur FERMÉ, un ampèremètre de plus ou un
    // fil ne change rien à ce que lit l'amont : l'élève qui répond « ça ne change
    // rien » a alors raison, et la règle — « ce que tu ajoutes après change aussi
    // ce qui s'y lit » — le contredirait sur une réponse juste. C'est le défaut
    // exact que la relecture cherche : une règle qui ne réfute pas, ou qui réfute
    // ce qu'il ne faut pas.
    //
    // Le dipôle en aval doit donc CHANGER quelque chose, et c'est lu sur le graphe
    // d'après modification : soit il oppose une résistance nouvelle (récepteur),
    // soit il coupe la boucle (interrupteur ouvert) — les deux cas des constats
    // ci-dessous. Le voltmètre, lui, ne peut pas se présenter : `analyserBoucle`
    // le retire, et un voltmètre idéal ne modifie effectivement rien.
    conditionValidite: (situation) => {
      const b = analyserBoucle(situation?.circuit);
      const ref = situation?.pointDeMesure;
      const modifie = situation?.modification?.dipole;
      if (!b || !ref || !modifie) return false;
      const aval = enAval(b, ref);
      if (aval === null || !aval.includes(modifie)) return false;
      const type = b.types.get(modifie);
      return estRecepteur(type)
        || (type === 'interrupteur' && b.etats.get(modifie) === 'ouvert');
    },
    regle:
      'Un circuit n\'a ni début ni fin : c\'est une **boucle**. Le courant ne part '
      + 'pas de la pile pour arriver à la lampe, il s\'établit **partout en même '
      + 'temps**. Ce que tu ajoutes après le point de mesure change donc aussi ce '
      + 'qui s\'y lit.',
    controle:
      'Avant de conclure « ça ne change rien », repars du dipôle que tu as ajouté et '
      + 'suis la boucle du doigt, dans le sens du courant. Tu reviens à ton point de '
      + 'mesure. S\'il est sur la même boucle, il est concerné — toujours.',
    raisonnements: [
      {
        id: 'le-courant-est-deja-passe',
        texte: 'Le courant est déjà passé par là, il ne peut pas revenir en arrière',
        reponse:
          'Tu as raison : il ne revient pas en arrière. Mais il n\'en a pas besoin — '
          + 'il tourne. Ce qui gêne le passage quelque part sur la boucle gêne le '
          + 'passage partout sur la boucle, au même instant.',
      },
      {
        id: 'je-lis-dans-le-sens-du-courant',
        texte: 'Je lis le schéma dans le sens du courant, comme on me l\'a appris',
        reponse:
          'Et c\'est exactement ce qu\'on t\'a demandé de faire — c\'est utile pour '
          + 'raconter un circuit et pour brancher les appareils dans le bon sens. La '
          + 'flèche dit où va le courant ; elle ne dit pas dans quel ordre les choses '
          + 'se décident. Elles se décident toutes ensemble.',
      },
      {
        id: 'la-file-d-attente',
        texte: 'Ce qui vient après ne change jamais ce qui est avant',
        reponse:
          'Dans une file d\'attente, sur une route, dans une recette, c\'est vrai — et '
          + 'c\'est vrai presque partout. Le circuit fermé fait partie des rares objets '
          + 'où ça ne l\'est pas. Les physiciens ne perdent pas ce réflexe : ils '
          + 'apprennent à le suspendre dès qu\'ils voient une boucle.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Suis la boucle du doigt en partant du dipôle ajouté : où arrives-tu ?',
      },
    ],
    constats: [
      {
        id: 'lampe-ajoutee-en-aval',
        contexteDeSurface: 'pile-lampe',
        dispositif:
          'Un ampèremètre placé juste à la sortie de la borne « + », une lampe, puis '
          + 'on ajoute une seconde lampe en série tout au bout de la boucle, loin '
          + 'après l\'appareil.',
        predictionEngagee: {
          question: 'Que va afficher l\'ampèremètre après l\'ajout ?',
          champs: [
            { id: 'avant-ajout', etiquette: 'avant l\'ajout', unite: 'A' },
            { id: 'apres-ajout', etiquette: 'après l\'ajout', unite: 'A' },
          ],
        },
        resultat: 'La valeur affichée baisse, alors que rien n\'a changé entre la pile et l\'appareil.',
        conflit:
          'Ce qui a été ajouté « après » a agi « avant ». Sur une boucle, il n\'y a '
          + 'pas d\'après.',
      },
      {
        id: 'interrupteur-ouvert-en-aval',
        contexteDeSurface: 'batterie-moteur',
        dispositif:
          'Une batterie, un ampèremètre, un moteur, puis un interrupteur placé tout au '
          + 'bout de la boucle, juste avant le retour à la batterie. On l\'ouvre.',
        predictionEngagee: {
          question:
            'L\'interrupteur est loin après l\'appareil. Que lit l\'ampèremètre quand on '
            + 'l\'ouvre ?',
          champs: [{ id: 'lecture', etiquette: 'ampèremètre, interrupteur ouvert', unite: 'A' }],
        },
        resultat: 'Zéro. Le moteur s\'arrête, et l\'appareil placé bien avant affiche zéro lui aussi.',
        conflit:
          'Si l\'aval n\'agissait pas sur l\'amont, il devrait sortir du courant de la '
          + 'pile alors que la boucle est coupée plus loin — et ce courant n\'irait nulle part.',
        // Le constat n'est pas une opinion : `diagnostiquer()` du module circuit
        // rend CIRCUIT_OUVERT sur CE graphe-ci, avec son message déjà écrit. Le
        // code est attaché ici — comme dans le piège ⑤ — et non au contre-modèle :
        // accroché là-haut, il était annoncé aussi sur l'item du constat
        // précédent, où l'on ajoute une lampe et où le circuit reste fermé.
        codeCircuit: 'CIRCUIT_OUVERT',
      },
    ],
    contreModele: {
      enonce:
        'Si ce qui est en aval n\'agissait pas sur l\'amont, l\'appareil placé près de '
        + 'la pile afficherait la même chose quoi qu\'on fasse plus loin.',
      // `avalCoupe` dit lequel des deux cas admis par `conditionValidite` est
      // servi : un récepteur ajouté (la boucle reste fermée, la lecture baisse) ou
      // un interrupteur ouvert (la boucle est coupée, la lecture tombe à zéro). La
      // conséquence en est dérivée. Écrite pour le seul interrupteur, elle
      // affirmait « la boucle est coupée » sur l'item de la lampe ajoutée, où
      // c'est faux : le contre-modèle décrivait une situation qui n'était pas
      // celle de l'élève.
      predire: ({ intensiteAvantModification, avalCoupe = false }) => ({
        lecture: arrondi(intensiteAvantModification),
        relation: 'inchangée',
        consequence: avalCoupe
          ? 'avec la boucle coupée plus loin, ce modèle prédit du courant qui sort de '
            + 'la pile et ne revient nulle part'
          : 'avec un récepteur de plus sur la boucle, ce modèle prédit la même lecture '
            + 'qu\'avant l\'ajout, au chiffre près — comme si le nouveau dipôle '
            + 'n\'existait pas pour l\'appareil',
      }),
      verdict:
        'Ton modèle prédit une lecture inchangée. L\'appareil en affiche une autre : '
        + 'plus petite si tu as ajouté un récepteur, nulle si tu as coupé la boucle plus '
        + 'loin. Dans les deux cas, ce que tu as mis « après » a agi sur ce qui se lit '
        + '« avant ».',
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ④ La pile délivre le même courant dans n'importe quel circuit
  //     RANG 2, NOUS LE FABRIQUONS
  //
  //  Source : didactique.md § 6.1d et § 7 (rang 2) — Dupin & Johsua 1987, ~50 %
  //  des sujets de la 6e à la 2de (920 sujets) ; Heller & Finley 1989, 13
  //  professeurs sur 14. ◆. Et l'hypothèse qui fait le rang : cette conception
  //  serait « produite par l'insistance mise sur la conservation du courant ».
  //
  //  `iatrogene: 'ch07-sf4-loi-d-unicite-de-l-intensite'` — « Utiliser la loi
  //  d'unicité de l'intensité (circuit en série) » (programme.md, ch. 7). C'est
  //  nous qui l'enseignerons, et c'est nous qui installerons le piège : la
  //  réfutation commence donc par accorder la loi, qui est vraie, et par corriger
  //  le PÉRIMÈTRE que l'élève lui donne.
  //
  //  Producteur et piège sont dans le MÊME chapitre : la progression ne garantit
  //  ici aucun ordre, et c'est au moteur de refuser de programmer ce piège avant
  //  le savoir-faire qui le fabrique. Voir l'en-tête.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « la pile débitait 0,30 A
  //  avec une lampe, elle débitera 0,30 A avec deux ». La règle dit qu'une pile
  //  impose une tension, pas une intensité, et que l'intensité est fixée par le
  //  circuit entier — elle contredit la prédiction. Le contrôle la contredit par
  //  un cas extrême que l'élève peut se poser seul : si la pile imposait son
  //  intensité, un court-circuit ne la ferait pas chauffer. Il la fait chauffer.
  // ══════════════════════════════════════════════════════════════════════════
  'pile-generateur-de-courant-constant': {
    id: 'pile-generateur-de-courant-constant',
    conception:
      'L\'intensité est une caractéristique du générateur : la pile « délivre » sa '
      + 'valeur, et elle la délivrera à l\'identique dans n\'importe quel circuit '
      + 'branché sur elle. La loi d\'unicité de l\'intensité est étendue d\'un '
      + 'circuit à tous les circuits.',
    enonceEleve:
      'Cette pile débite 0,30 A. Elle débitera 0,30 A dans n\'importe quel circuit.',
    rang: 2,
    iatrogene: 'ch07-sf4-loi-d-unicite-de-l-intensite',
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch07-intensite-du-courant',
    rythmeInitial: 6,
    formatDiagnostique: {
      modeDeReponse: 'Prédiction chiffrée des deux intensités avant affichage.',
      contexteImpose:
        'DEUX circuits alimentés par la même pile, présentés côte à côte.',
      pourquoi:
        'Un seul circuit ne peut rien montrer : la conception ne se voit que dans la '
        + 'comparaison.',
    },
    // Deux circuits au moins, la même pile (même identifiant dans les deux
    // graphes), et des charges qui diffèrent réellement. Deux circuits de même
    // charge donnent la même intensité : l'item confirmerait l'élève au lieu de le
    // mettre en défaut.
    //
    // « Charge » se lit sur la forme canonique, appareils de mesure ôtés, et non
    // sur le multi-ensemble des récepteurs — voir `signatureDeCharge` : deux
    // lampes en série et deux lampes en dérivation ont les mêmes récepteurs et ne
    // font pas débiter la même chose.
    conditionValidite: (situation) => {
      const circuits = situation?.circuits;
      if (!Array.isArray(circuits) || circuits.length < 2) return false;
      const piles = circuits.map((c) => {
        const g = normaliser(c);
        if (!g.ok) return null;
        const trouvees = g.dipoles.filter((d) => d.type === 'pile');
        return trouvees.length === 1 ? trouvees[0].id : null;
      });
      if (piles.some((p) => p === null) || new Set(piles).size !== 1) return false;
      const charges = circuits.map(signatureDeCharge);
      if (charges.some((s) => s === null)) return false;
      return new Set(charges).size > 1;
    },
    regle:
      'Une pile n\'impose pas une intensité : elle impose une **tension**. '
      + 'L\'intensité, elle, est fixée par **le circuit entier** — la même pile '
      + 'débite d\'autant plus que le circuit lui oppose peu de résistance. La loi '
      + 'd\'unicité que tu as apprise compare des points **d\'un même circuit**, '
      + 'jamais deux circuits entre eux.',
    controle:
      'Pousse ta réponse jusqu\'au cas extrême : si la pile imposait son intensité, '
      + 'relier ses deux bornes par un fil ne changerait rien et elle ne chaufferait '
      + 'pas. Or un court-circuit la fait chauffer, et vite. C\'est donc le circuit '
      + 'qui décide de l\'intensité.',
    raisonnements: [
      {
        id: 'l-unicite-appliquee',
        texte: 'On vient de voir que l\'intensité est la même partout : je l\'ai appliquée',
        reponse:
          'Et tu l\'as bien appliquée — dans un circuit en série, elle est vraiment la '
          + 'même partout. Il manque deux mots à la loi : « dans **un** circuit ». Elle '
          + 'compare des points d\'un même montage, pas deux montages entre eux. Cette '
          + 'confusion-là, c\'est la leçon qui la fabrique, pas toi.',
      },
      {
        id: 'c-est-marque-sur-la-pile',
        texte: 'L\'intensité, c\'est une caractéristique de la pile, comme sa taille',
        reponse:
          'Regarde ce qui est écrit sur une pile : 1,5 V, 4,5 V, 9 V — une **tension**. '
          + 'Aucune pile n\'annonce une intensité, et c\'est justement parce qu\'elle ne '
          + 'peut pas : cette valeur-là dépend de ce qu\'on branche.',
      },
      {
        id: 'ca-marche-quand-je-refais-le-meme-montage',
        texte: 'Quand je refais le même montage, je retrouve toujours la même valeur',
        reponse:
          'C\'est vrai, et c\'est même une bonne raison de faire confiance à ta mesure : '
          + 'même pile, même circuit, même intensité. Ce qui met ta règle en défaut, ce '
          + 'n\'est pas de refaire le montage, c\'est de le **changer**. Ce réflexe ne '
          + 'disparaîtra pas, et on ne te demande pas de l\'effacer : seulement de te '
          + 'poser à chaque fois la question « même circuit, ou pas ? ».',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Compare les deux circuits : lequel oppose le plus de résistance à la pile ?',
      },
    ],
    constats: [
      {
        id: 'meme-pile-une-puis-deux-lampes',
        contexteDeSurface: 'pile-lampe',
        dispositif:
          'La même pile, d\'abord avec une lampe, puis avec deux lampes identiques en '
          + 'série. Un ampèremètre dans chaque montage.',
        predictionEngagee: {
          question: 'Que va afficher l\'ampèremètre dans chacun des deux montages ?',
          champs: [
            { id: 'une', etiquette: 'avec une lampe', unite: 'A' },
            { id: 'deux', etiquette: 'avec deux lampes', unite: 'A' },
          ],
        },
        resultat: 'La valeur est plus faible avec deux lampes.',
        conflit:
          'La pile n\'a pas changé et la valeur a changé : elle ne venait donc pas de '
          + 'la pile seule. Et c\'est cohérent avec ce que tu vois — les deux lampes '
          + 'brillent moins.',
      },
      {
        id: 'meme-batterie-moteur-seul-puis-avec-resistance',
        contexteDeSurface: 'batterie-moteur',
        dispositif:
          'La même batterie, d\'abord sur un moteur seul, puis sur le même moteur avec '
          + 'une résistance en série.',
        predictionEngagee: {
          question: 'Même batterie dans les deux cas : que lira l\'ampèremètre à chaque fois ?',
          champs: [
            { id: 'moteur-seul', etiquette: 'moteur seul', unite: 'A' },
            { id: 'avec-resistance', etiquette: 'moteur + résistance', unite: 'A' },
          ],
        },
        resultat: 'La valeur baisse et le moteur tourne plus lentement.',
        conflit:
          'C\'est le circuit branché sur elle qui décide de ce que la batterie débite, '
          + 'pas la batterie.',
      },
    ],
    contreModele: {
      enonce: 'Si la pile imposait son intensité, elle débiterait la même valeur dans les deux circuits.',
      predire: ({ intensiteMesureeDansLePremier, nombreDeCircuits = 2 }) => ({
        lectures: Array.from({ length: nombreDeCircuits }, () => arrondi(intensiteMesureeDansLePremier)),
        relation: 'identiques',
        // Le constat servi peut être celui des lampes comme celui du moteur : la
        // conséquence ne présume donc ni d'un décor, ni d'une observation que
        // l'élève aurait déjà faite.
        consequence:
          'ajouter un récepteur en série ne changerait alors rien pour les autres — ni '
          + 'l\'éclat d\'une lampe, ni la vitesse d\'un moteur',
      }),
      verdict:
        'Ton modèle prédit deux fois la même valeur. Les deux montages n\'affichent pas '
        + 'la même, et le second brille moins : c\'est la même observation, vue deux fois.',
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑤ Mesurer, c'est couper le fil et intercaler l'appareil
  //
  //  Source : CEDRE 2024, DEPP note d'information n°26.13 (avril 2026, note
  //  PRIMAIRE lue), compétences expérimentales : 71 % réalisent un montage à
  //  partir d'un schéma, 64 % branchent correctement un ampèremètre, 40 %
  //  seulement un voltmètre. ✔ — donc `fiabilite: primaire`. Ce qui sépare les
  //  deux gestes n'est pas la main, c'est le branchement EN DÉRIVATION, donc la
  //  lecture de la topologie. Rang non tranché au § 7, qui ne traite pas ce point :
  //  voir l'en-tête (rang 1, déduit, contestable).
  //
  //  C'est aussi le seul piège de la famille qui vive en cercle 3, et le module
  //  `js/circuit.js` le corrige déjà avec ses codes VOLTMETRE_EN_SERIE,
  //  AMPEREMETRE_EN_DERIVATION et VOLTMETRE_AUX_MAUVAISES_BORNES : les constats
  //  ci-dessous s'y rattachent par `codeCircuit` plutôt que de réécrire ses messages.
  //
  //  Épreuve de réfutation, ET ELLE A TROIS SENS — la première rédaction n'en
  //  voyait qu'un, la deuxième deux, et il en manquait encore un.
  //
  //  Réponse fausse n°1 : un schéma où le voltmètre est inséré dans la boucle,
  //  entre la lampe et la pile. Réponse fausse n°2, celle du deuxième constat : un
  //  ampèremètre posé en travers, aux bornes du récepteur.
  //
  //  Réponse fausse n°3, celle du TROISIÈME constat, et c'est elle que la
  //  relecture adverse a trouvée sans réfutation : le voltmètre bien en dérivation,
  //  mais aux bornes de L1 alors qu'on demandait L3. Le constat existait ; la règle
  //  et le contrôle, eux, ne parlaient que du GESTE. L'élève qui appliquait le
  //  contrôle mot pour mot — « s'il continue de fonctionner comme si l'appareil
  //  n'était pas là, c'est une dérivation : bon pour un voltmètre » — lisait
  //  « bon » sur une mesure fausse et repartait conforté. C'est exactement le
  //  défaut que ce fichier prétendait avoir corrigé, déplacé d'un cran : un
  //  contrôle qui VALIDE la réponse fausse, sur le seul piège du corpus dont la
  //  source soit ✔ et française.
  //
  //  Le geste et la cible sont donc les deux moitiés de la règle, et le contrôle
  //  se fait en deux temps : d'abord « en série ou en dérivation, et pour quel
  //  appareil ? », puis « en dérivation aux bornes de QUOI ? ». `js/circuit.js`
  //  tient déjà la distinction — VOLTMETRE_EN_SERIE et
  //  VOLTMETRE_AUX_MAUVAISES_BORNES sont deux codes, pas un.
  // ══════════════════════════════════════════════════════════════════════════
  'mesurer-en-coupant-le-circuit': {
    id: 'mesurer-en-coupant-le-circuit',
    conception:
      'Le branchement d\'un appareil de mesure est un geste unique, indifférent à ce '
      + 'qu\'on mesure : on l\'intercale sur le trajet — on coupe le fil et on l\'insère '
      + '— ou bien, une fois le mot « dérivation » retenu, on le pose en travers, mais '
      + 'sans que le choix dépende de l\'appareil. La tension est traitée comme quelque '
      + 'chose qui circule et qu\'on intercepte, au lieu d\'un écart entre deux points ; '
      + 'et symétriquement, l\'ampèremètre se retrouve posé aux bornes d\'un dipôle, où '
      + 'il ne compte plus rien. Même conception au dernier degré : si la tension '
      + 'circule, elle est la même partout, et il suffit d\'être « en dérivation » '
      + 'quelque part — le dipôle aux bornes duquel on se pose devient indifférent.',
    enonceEleve:
      'Pour mesurer, je coupe le fil et je mets l\'appareil dedans — sinon il ne '
      + 'verra rien passer.',
    rang: 1,
    fiabilite: 'primaire',
    origine: 'physique',
    chapitreOrigine: 'ch02-tension-electrique',
    rythmeInitial: 3,
    formatDiagnostique: {
      modeDeReponse:
        'Schéma de circuit à construire : l\'élève place lui-même l\'appareil sur le '
        + 'graphe, et dit ce qu\'il affichera.',
      contexteImpose: null,
      pourquoi:
        'Un QCM « en série ou en dérivation ? » ne suffit pas — le mot se récite '
        + 'sans que le geste soit tenu, et c\'est précisément ce que le double QCM '
        + 'est là pour séparer.',
    },
    // La condition la moins évidente du fichier, et elle est lue sur le graphe :
    // avec un SEUL dipôle résistant, « aux bornes de la lampe » et « aux bornes de
    // la pile » sont le même branchement (js/circuit.js le dit : deux dipôles
    // seuls dans une boucle satisfont à la fois la définition de la série et celle
    // de la dérivation). L'item ne distingue alors rien. Il faut aussi que
    // l'appareil reste à placer : s'il est déjà sur le schéma, il n'y a plus de
    // geste à évaluer.
    conditionValidite: (situation) => {
      const mesure = situation?.mesure;
      if (situation?.demande !== 'schema' || !mesure?.appareil || !mesure?.cible) return false;
      const g = normaliser(situation.circuit);
      if (!g.ok) return false;
      if (g.parId.has(mesure.appareil)) return false;
      if (!g.parId.has(mesure.cible)) return false;
      return g.dipoles.filter((d) => estRecepteur(d.type)).length >= 2;
    },
    regle:
      'Une intensité se mesure **en série** : l\'appareil doit être **traversé** par '
      + 'le courant qu\'il compte. Une tension, non — elle ne se mesure pas sur un '
      + 'trajet mais **entre deux points**, donc **en dérivation**, l\'appareil posé '
      + 'en travers sans qu\'on coupe quoi que ce soit. Une tension n\'est pas quelque '
      + 'chose qui passe : c\'est un **écart entre deux endroits**. Et l\'échange se '
      + 'paie **dans les deux sens** : un voltmètre inséré coupe le circuit, un '
      + 'ampèremètre posé en travers n\'est plus traversé par le courant du dipôle — '
      + 'il lui offre un chemin sans résistance, le dipôle s\'arrête et l\'appareil se '
      + 'détruit. Enfin, une tension est un écart entre deux points **nommés** : « aux '
      + 'bornes de L3 » n\'est pas « aux bornes de L1 ». Le bon geste sur le mauvais '
      + 'dipôle donne une valeur parfaitement lisible — et qui répond à une autre '
      + 'question que celle qu\'on t\'a posée.',
    // Les trois moitiés du contrôle comptent, et il en manquait deux tour à tour.
    // Écrit dans un seul sens — « c'est une dérivation : bon pour un voltmètre » —
    // il laissait sans réponse l'élève qui a posé son AMPÈREMÈTRE en travers, alors
    // que c'est l'erreur du deuxième constat : il lisait « bon », et repartait
    // conforté sur la plus coûteuse des deux fautes.
    //
    // Réparé dans les deux sens, il validait encore le TROISIÈME constat : un
    // voltmètre bien en dérivation, mais aux bornes de la mauvaise lampe, passe la
    // question « le circuit est-il coupé ? » sans encombre, et l'élève lisait
    // « bon » sur une mesure fausse. Un contrôle en un temps ne peut pas trancher
    // une question qui en a deux : le geste D'ABORD, la cible ENSUITE.
    controle:
      'Avant de valider ton schéma, deux questions, dans cet ordre. **Un** : enlève '
      + 'l\'appareil par la pensée. Si le circuit se retrouve **coupé**, c\'est que tu '
      + 'l\'avais mis en série — bon pour un ampèremètre, faux pour un voltmètre. S\'il '
      + 'continue de fonctionner comme si l\'appareil n\'était pas là, c\'est une '
      + 'dérivation — bon pour un voltmètre, **faux pour un ampèremètre**. Le geste '
      + 'n\'est jamais juste tout seul : il l\'est ou non pour l\'appareil que tu '
      + 'branches. **Deux** : relis la question, et suis du doigt les deux fils de ton '
      + 'appareil. Aboutissent-ils bien de part et d\'autre du dipôle qu\'on te '
      + 'demandait — pas de son voisin, pas de deux d\'un coup ? Tant que la deuxième '
      + 'question n\'est pas posée, un branchement irréprochable peut mesurer autre '
      + 'chose que ce qu\'on t\'a demandé, et rien à l\'écran ne te le dira.',
    raisonnements: [
      {
        id: 'il-faut-etre-sur-le-passage',
        texte: 'Pour mesurer quelque chose, il faut être sur son passage',
        reponse:
          'C\'est vrai de presque tous les appareils que tu connais : un compteur d\'eau, '
          + 'un péage, un tourniquet, un ampèremètre. Tout ce qui compte ce qui passe doit '
          + 'être traversé. Mais une tension ne passe pas — il n\'y a donc pas de passage '
          + 'où se placer, seulement deux points entre lesquels se tendre. '
          + 'Le réflexe reste bon et il restera là : il s\'agit de le suspendre le temps '
          + 'de regarder QUELLE grandeur on te demande.',
      },
      {
        id: 'meme-geste-que-l-amperemetre',
        texte: "J'ai fait comme pour l'ampèremètre",
        reponse:
          'Le geste est juste, c\'est l\'appareil qui ne va pas avec : tu as branché un '
          + 'voltmètre comme on branche un ampèremètre. Ce qui sépare les deux n\'est pas '
          + 'la main mais ce qu\'on mesure — un débit se coupe pour être compté, un écart '
          + 'se lit entre deux points.',
      },
      {
        id: 'en-travers-il-ne-verra-rien',
        texte: 'Posé en travers, il ne verrait rien passer',
        reponse:
          'Il verra la différence entre les deux points où tu l\'as posé, et c\'est '
          + 'exactement ce qu\'on lui demande. Inséré dans la boucle, en revanche, il '
          + 'empêche le courant de passer : la lampe s\'éteint et il t\'affiche la tension '
          + 'de la pile — une valeur qui a l\'air correcte, et qui ne répond pas à la question.',
      },
      // Le menu doit porter la troisième faute, sans quoi l'élève du troisième
      // constat n'a aucune entrée qui décrive ce qu'il a fait — et choisirait
      // « au hasard » une explication qui n'est pas la sienne.
      {
        id: 'en-derivation-donc-c-est-bon',
        texte: 'Je l\'ai bien mis en dérivation, comme on me l\'a appris',
        reponse:
          'Et c\'est fait, vraiment : le geste est bon, et c\'est déjà ce qui manque à '
          + 'la plupart. Il reste la moitié qu\'on t\'a moins dite — **aux bornes de '
          + 'quoi**. Une tension n\'existe pas toute seule dans un circuit : il y a '
          + 'celle de L1, celle de L3, celle de la pile, et ce ne sont pas les mêmes. '
          + 'Ton appareil a mesuré, correctement, la tension d\'un autre dipôle que '
          + 'celui de la question.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Deux questions, dans l\'ordre : enlève l\'appareil par la pensée — le circuit '
          + 'est-il coupé ? Puis suis ses deux fils — encadrent-ils bien le dipôle qu\'on '
          + 'te demandait ?',
      },
    ],
    constats: [
      {
        id: 'voltmetre-insere-dans-la-boucle',
        contexteDeSurface: 'pile-lampe',
        dispositif:
          'Le schéma de l\'élève est exécuté tel qu\'il l\'a dessiné : voltmètre inséré '
          + 'entre la lampe L1 et la lampe L2.',
        predictionEngagee: {
          question: 'Avant d\'exécuter : la lampe L1 s\'allume-t-elle, et que lit le voltmètre ?',
          champs: [
            { id: 'lampe', etiquette: 'L1 allumée ? oui / non' },
            { id: 'lecture', etiquette: 'lecture du voltmètre', unite: 'V' },
          ],
        },
        resultat:
          'Les deux lampes restent éteintes et le voltmètre affiche presque toute la '
          + 'tension de la pile.',
        conflit:
          'Un voltmètre inséré ne mesure pas la lampe : il la remplace. Et la valeur '
          + 'affichée ressemble à une bonne réponse, ce qui la rend plus dangereuse qu\'une '
          + 'panne franche.',
        codeCircuit: 'VOLTMETRE_EN_SERIE',
      },
      {
        id: 'amperemetre-pose-aux-bornes-du-moteur',
        contexteDeSurface: 'batterie-moteur',
        dispositif:
          'Un ampèremètre posé en travers, aux bornes du moteur, comme on poserait un '
          + 'voltmètre.',
        predictionEngagee: {
          question: 'Le moteur tourne-t-il ? Que lit l\'ampèremètre ?',
          champs: [
            { id: 'moteur', etiquette: 'moteur en marche ? oui / non' },
            { id: 'lecture', etiquette: 'lecture de l\'ampèremètre', unite: 'A' },
          ],
        },
        resultat:
          'Le moteur s\'arrête et l\'appareil affiche une valeur très élevée : le courant '
          + 'passe par lui au lieu de passer par le moteur.',
        conflit:
          'C\'est le branchement qui détruit l\'appareil. Le même geste, avec l\'autre '
          + 'appareil, n\'a pas du tout la même conséquence.',
        codeCircuit: 'AMPEREMETRE_EN_DERIVATION',
      },
      {
        id: 'voltmetre-aux-bornes-de-la-mauvaise-lampe',
        contexteDeSurface: 'guirlande',
        dispositif:
          'Trois lampes en série, dont deux identiques. Le voltmètre est bien en '
          + 'dérivation — mais aux bornes de L1 alors qu\'on demandait L3.',
        predictionEngagee: {
          question: 'Le branchement est en dérivation : la mesure est-elle bonne ?',
          champs: [{ id: 'verdict', etiquette: 'oui / non, et pourquoi' }],
        },
        resultat:
          'Le circuit fonctionne, la valeur est stable et lisible — et ce n\'est pas la '
          + 'tension demandée.',
        conflit:
          'Le geste est acquis : c\'est déjà l\'essentiel, et c\'est ce qui manque à la '
          + 'plupart. Reste à viser les deux bons points — un branchement correct sur le '
          + 'mauvais dipôle donne une valeur juste à une question qu\'on n\'a pas posée.',
        codeCircuit: 'VOLTMETRE_AUX_MAUVAISES_BORNES',
      },
    ],
  },
};
