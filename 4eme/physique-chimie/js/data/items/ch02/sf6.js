// Chapitre 2, savoir-faire 6 — « Utiliser la loi d’additivité des tensions
// (circuit à une maille) ».
//
// Le savoir-faire le plus arithmétique du chapitre, et le seul dont TOUTES les
// chaînes se rejouent en rationnels exacts : une tension se retranche ou
// s’additionne, jamais rien d’autre. Ce qui suit dit ce que le schéma a imposé,
// ce qu’il a refusé, et où le savoir-faire s’arrête.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   une situation, aucune règle énoncée
//   COURS        sept blocs typés
//   METHODE      un exercice résolu en deux colonnes, geste de contrôle compris
//   ENTRAINEMENT 10 items
//   PROBLEMES     5 items
//   TEST         10 items
//
// L’export par défaut est la concaténation des trois sections d’items — 25 —,
// parce que c’est cette liste-là que `validerItem` et `tools/verifier-contenu.mjs`
// lisent. `DECOUVERTE`, `COURS` et `METHODE` ne sont PAS des items : ils ne
// portent ni classe, ni cercle, ni palier, et les faire passer pour des items
// fausserait tous les dénominateurs de la charte.
//
// ── Répartition ───────────────────────────────────────────────────────────
//
//   Classes    A 20 · C 5 (20 %, sous le tiers)
//   Cercles    0 : 4 items · 1 : 21 items · 2 : aucun · 3 : AUCUN
//   Paliers    1 : 8 · 2 : 6 · 3 : 4 · 4 : 7
//   Types      court 14 · schema-circuit 6 · double-qcm 4 · prediction-engagee 1
//   Pièges     unite-absente-ou-fausse 7 · reponse-conforme-sans-adhesion 4 ·
//              aucun piège 14
//
// ── ZÉRO ITEM DE CERCLE 3, et c’est une décision ──────────────────────────
//
// Quatre des sept savoir-faire de ce chapitre sont de cercle 3 — schématiser,
// distinguer série et dérivation, placer un voltmètre, lire avec un calibre —,
// et c’est à eux que revient de combler le vivier que le chapitre 1 laissait
// vide. Celui-ci est de cercle 1, et il le reste : `seance.js` écrit que le
// cercle 3 est **plafonné et non encouragé**, parce qu’un schéma à l’écran
// relève de la simulation informatique, moitié basse de l’éventail de
// Shavelson. Ajouter ici des items de cercle 3 pour « aider la bande » les
// ferait porter par le savoir-faire qui les justifie le moins.
//
// Six items portent pourtant un SCHÉMA de circuit. Le schéma n’y est pas le
// geste : il est la donnée. Ce qu’on demande devant lui — « que vaut la tension
// aux bornes de L2 ? » — est un raisonnement sur données, donc cercle 1. Le
// cercle qualifie la tâche, pas la présence d’un dessin ; en faire dépendre le
// cercle du support gonflerait la bande la plus chère du projet avec des items
// qui n’entraînent aucun geste.
//
// ── Les circuits sont des GRAPHES, écrits une fois ────────────────────────
//
// Six graphes, six items. Aucune image, aucune disposition stockée : `schema.js`
// dessine, `circuit.js` juge, et deux schémas topologiquement identiques mais
// dessinés autrement sont le même circuit. Les six sont deux à deux DISTINCTS
// au sens de `formeCanonique` — ce n’est pas décoratif : deux items servis sur
// le même graphe avec d’autres valeurs sont deux exemplaires du même exercice,
// et le test n’aurait plus le droit d’en porter un.
//
// Les six ont été passés à `diagnostiquer` : aucun ne rend le moindre constat.
// Pas de circuit ouvert involontaire, pas de dipôle isolé, pas de court-circuit,
// pas de borne inversée — un graphe fautif est ici une faute de CONTENU, pas une
// réponse fausse, et il ressortirait avec `ok: false` sans qu’aucun élève ne
// puisse rien y faire.
//
// Aucun voltmètre ne figure dans ces graphes, et c’est délibéré. Ce
// savoir-faire ne fait pas PLACER l’appareil — c’est `ch02-sf3` —, il fait
// exploiter ce qu’il indique. Un voltmètre dessiné ici ajouterait au schéma une
// maille que l’énoncé ne commente pas, et surtout il rendrait jugeable, sur un
// item qui ne l’évalue pas, un branchement que l’élève n’a pas fait.
//
// ── Ce que le schéma a refusé, et qui a changé le contenu ─────────────────
//
//   · **Un circuit ne se montre que sur un `schema-circuit`.** `SORTES_PAR_TYPE`
//     n’ouvre la sorte `circuit` qu’à ce type-là ; une figure de circuit sur un
//     `court` ou un `double-qcm` est refusée (FIGURE_HORS_TYPE). Les quatre
//     doubles QCM de ce fichier décrivent donc leur montage EN TOUTES LETTRES.
//     C’est une vraie limite : le montage y est du texte, et rien ne garantit
//     mécaniquement qu’il s’accorde à ce que la correction suppose. Les quatre
//     sont de classe C pour cette raison même.
//   · **Un item ne peut pas porter à la fois un calcul et une réponse libre**
//     (ITEM_SCINDABLE_NON_SCINDE). « Recalcule la tension » et « dis pourquoi
//     cette valeur est impossible » sont deux items, jamais un seul : `p04` est
//     le second, sans chaîne de calcul, et il assume sa classe C.
//   · **Un palier 2 ou 3 sans `dimensionVariee` est refusé**, piège ou pas
//     (DIMENSION_VARIEE_ABSENTE) — et un palier 1 ou 4 qui en porte une l’est
//     tout autant (DIMENSION_VARIEE_HORS_PALIER). Quatre items sans piège
//     déclarent donc leur dimension : elle ne sert aucun comptage, mais elle
//     documente ce qui a changé.
//   · **`mV` existe, `kV` aussi, mais pas `volt` écrit en toutes lettres** dans
//     un champ d’unité : le lexique auteur est une liste blanche fermée.
//
// ── Les deux pièges, et ce qu’ils coûtent ici ─────────────────────────────
//
//   unite-absente-ou-fausse            7 items, paliers 1, 2, 3 et 4
//   reponse-conforme-sans-adhesion     4 items, paliers 1, 2, 3 et 4
//   aucun piège                       14 items
//
// **Les deux pièges commencent AVANT leur chapitre d’origine**, et il faut
// l’écrire plutôt que le laisser découvrir : `unite-absente-ou-fausse` déclare
// `chapitreOrigine: 'ch04-masse-volumique'`, `reponse-conforme-sans-adhesion`
// déclare `ch06-transformations-chimiques`, et nous sommes au chapitre 2. Ce
// n’est refusé nulle part — seul un piège de RANG 2 ne peut pas démarrer avant
// le savoir-faire qui le produit, et ces deux-là sont de rang 3. C’est le
// catalogue des savoir-faire qui en décide, pas ce fichier : `ch02-sf6` déclare
// ces deux pièges, et un item dont le champ `piege` en nommerait un troisième
// serait refusé (PIEGE_INCONNU sur le savoir-faire). La conséquence pratique est
// que la file de re-confrontation de ces deux pièges s’ouvre deux à quatre
// chapitres plus tôt que le catalogue ne l’annonce.
//
// **Le champ `piege` de l’item, et lui seul.** Ce contrôle-là ne porte que sur
// `item.piege` : `refusDesDistracteurs` n’exige d’un distracteur que d’être
// rattaché à un piège EXISTANT du catalogue, jamais à un piège du savoir-faire.
// Trois items d’ici — `e01`, `p03`, `p04` — rattachent donc leurs distracteurs à
// `valeur-invraisemblable-non-critiquee`, qui n’est pas déclaré sur `ch02-sf6`,
// et passent. Ce n’est pas une échappatoire : un distracteur nomme ce que
// l’élève a CRU, et cela n’a aucune raison de tomber dans la liste des pièges
// que le savoir-faire suit. Mais il faut l’écrire, parce que le contrôle ne le
// dira pas.
//
// **`unite-absente-ou-fausse` tient ici par les millivolts, et par eux seuls.**
// Son prédicat exige qu’au moins une unité de l’énoncé DIFFÈRE de l’unité
// attendue — sans quoi recopier suffit à répondre juste. Sur une addition de
// tensions, tout est en volts et cette exigence tombe : les sept items du piège
// donnent donc au moins une lecture en mV. Ce n’est pas une coquetterie, c’est
// la seule forme sous laquelle ce piège est honnête sur ce savoir-faire.
//
// Aucun de ces sept items ne déclare `estFormatDiagnostique`. Le format du
// piège exige « une grandeur composée (quotient ou produit) » : une tension n’en
// est pas une, et se déclarer au format diagnostique ici serait s’attribuer une
// couverture qu’on n’a pas. Le chapitre 1 la porte déjà, et `ch02-sf4` — lire
// une tension avec son calibre — est le bon endroit pour la porter ici.
//
// **`reponse-conforme-sans-adhesion` se sert par PAIRES, et son prédicat
// n’accepte que la seconde moitié.** La condition de validité exige
// `roleDeCetItem === 'prediction'` : un item de RESTITUTION qui déclarerait ce
// piège serait refusé (CONDITION_DE_VALIDITE_NON_SATISFAITE), et c’est juste —
// l’élève conforme réussit l’item de restitution par définition, il ne mesure
// rien. Les quatre restitutions de ce fichier — `e02`, `e07`, `p02`, `t02` — ne
// portent donc AUCUN piège ; les quatre prédictions — `e05`, `e10`, `p05`,
// `t06` — le portent et nomment leur paire.
//
// **Et AUCUNE de leurs justifications fausses n’en porte non plus.** Une
// rédaction antérieure attachait `reponse-conforme-sans-adhesion` aux neuf
// justifications fausses de `e02`, `e07` et `p02`, et c’était une faute — la
// seule que la relecture adverse ait trouvée sur ce fichier qui coûte quelque
// chose à un élève. `corrigerDoubleQcm` rend le piège de la JUSTIFICATION sur le
// quadrant juste/faux ; l’application aurait donc servi, à l’élève qui coche
// « six divisé par deux fait trois », la règle de ce piège-là : la voiture et le
// camion, les deux dynamomètres accrochés dos à dos, « si ta phrase et ton geste
// ne donnent pas la même chose, écris les deux ». Cette règle ne réfute pas le
// partage en parts égales — elle ne parle ni de tension ni de partage —, et elle
// diagnostique comme INSINCÈRE un élève qui est sincèrement dans l’erreur. Or
// aucune des neuf ne récite le cours sans y adhérer : ce sont neuf conceptions de
// physique distinctes, et le catalogue n’en documente aucune. Le chapitre 1 tient
// la convention juste — `ch01-sf7-t07` réserve ce piège à « la masse se conserve
// toujours, dans tous les cas et dans tous les récipients », qui EST une récitation
// appliquée sans regarder. Faute de piège qui les décrive, les neuf n’en portent
// plus : inventer un rattachement aurait réfuté une conception que l’élève n’a pas,
// et `t02` était déjà écrit ainsi.
//
// Les quatre paires respectent les trois conditions du prédicat : même loi, deux
// écrans distincts (`memeEcran: false`), et au moins un item intercalé — deux
// pour trois d’entre elles, trois pour celle du test. C’est `seance.js` qui
// devra les servir dans cet ordre ; le contenu ne peut que le déclarer, et il
// le déclare.
//
// ── Un refus obtenu, et il ne venait pas de ce fichier seul ───────────────
//
// MEME_DIMENSION_AUX_DEUX_PALIERS se calcule sur un PIÈGE, à travers tout le
// corpus — pas sur un savoir-faire, pas sur un fichier. Or
// `reponse-conforme-sans-adhesion` est aussi le piège de `ch02-sf5`, la loi
// d’unicité, écrite en parallèle de celle-ci. Les deux fichiers ont choisi la
// convention du chapitre 1 — `objet-support` au palier 2, `mode-de-reponse` au
// palier 3 — mais `ch02-sf5` l’a prise à l’envers, et l’union des deux
// savoir-faire donnait { objet-support, mode-de-reponse } aux DEUX paliers. Le
// contrôle a refusé, et il a eu raison : sur le suivi d’un élève, ces deux
// paliers ne varient alors plus rien l’un par rapport à l’autre.
//
// La correction est de ce côté-ci, et elle est volontairement ROBUSTE : ce
// fichier n’emploie plus, pour ce piège, aucune des deux dimensions que
// `ch02-sf5` peut choisir. Son palier 2 déclare `grandeur-en-jeu`, son palier 3
// `sens-du-changement` — quel que soit le sens dans lequel l’autre fichier
// range sa paire, les deux ensembles restent disjoints. Ce n’est pas un
// contournement : les deux étiquettes sont exactes, et il a fallu réécrire
// `t06` pour qu’elles le soient. Il partait du générateur comme les trois
// autres prédictions ; il part maintenant des récepteurs et remonte à
// l’alimentation, ce qui EST un changement de sens. Le format
// `prediction-engagee` — la prédiction verrouillée avant tout affichage — a
// migré vers `p05`, au palier non étiqueté, où aucune `dimensionVariee` n’est
// déclarée et où il ne force donc plus la main à l’étiquette.
//
// La même exposition existe sur `unite-absente-ou-fausse`, que ce fichier
// partage avec le chapitre 1 et avec `ch02-sf4`. Elle est tenue autrement,
// parce qu’une convention y est déjà installée : le chapitre 1 emploie
// `grandeur-en-jeu` au palier 2 et `mode-de-reponse` au palier 3 sur ses six
// items, et ce fichier prend les deux dimensions restantes — `objet-support` au
// palier 2, où le montage passe du texte au schéma, `sens-du-changement` au
// palier 3, où l’on remonte des récepteurs au générateur. Les deux ensembles
// restent disjoints, mais rien ici ne peut le GARANTIR pour un fichier qui
// s’écrit à côté : ce croisement est un invariant de corpus, et il se vérifie au
// build, pas à l’écriture. C’est écrit là plutôt que découvert.
//
// **Aucun `dispositifServi` n’est écrit dans ce fichier.** Les quatre
// dispositifs des deux pièges ont un `contexteDeSurface` posé ailleurs — la
// voiture et le camion, le ballon sur la table, trois copies de masse volumique,
// un trajet en km et une durée en minutes. Aucun n’est électrique. En déclarer
// un ici le compterait comme SERVI et refermerait le cycle de variation du piège
// sur un décor que l’élève n’aura jamais vu ; `apresReponsePiege` ne lèverait
// pas — le dispositif appartient bien au piège — et c’est précisément pour ça
// que la faute serait silencieuse.
//
// ── D’où viennent les justifications des doubles QCM ──────────────────────
//
// Le corpus d’énoncés d’élèves n’existe pas encore, et le catalogue des pièges
// n’offre ici aucun `raisonnement` transposable : ceux de
// `reponse-conforme-sans-adhesion` sont écrits sur la troisième loi de Newton,
// ceux de `unite-absente-ou-fausse` sur la masse volumique. Les reformuler en
// électricité produirait une citation qui ne cite rien. Les seize
// justifications de ce fichier sont donc toutes `locale` — écrites ici, sans
// source empruntée. Aucune citation institutionnelle n’est inventée.
//
// ── Les distracteurs, et pourquoi il y en a si peu ────────────────────────
//
// Quatre items seulement portent des distracteurs — `e01`, `p01`, `p03` et
// `p04` —, et tous les quatre les rattachent à
// `valeur-invraisemblable-non-critiquee` ou à `unite-absente-ou-fausse`. Trois
// d’entre eux portent un distracteur QUANTITATIF, donc un modèle erroné
// exécutable ; les deux distracteurs de `p04` sont qualitatifs — leur `id` est
// la clé du choix lui-même — et n’ont aucun nombre à produire.
//
// La raison de cette rareté est nette : la faute la plus fréquente
// sur ce savoir-faire — additionner là où il fallait retrancher — n’est portée
// par AUCUN piège du catalogue. Elle est servie tout de même, mais seulement là
// où son résultat dépasse la tension du générateur : ce qu’elle diagnostique
// alors n’est pas l’opération, c’est l’absence de contrôle de vraisemblance, et
// ce piège-là existe. Partout ailleurs, inventer un rattachement aurait produit
// un diagnostic faux — l’application aurait réfuté une conception que l’élève
// n’a pas.
//
// Les vingt items à saisie déclarent `semantique: 'exacte'` et non `'tolerante'`.
// Une soustraction de deux décimaux n’a pas de route arrondie : une fenêtre de
// tolérance y serait une largeur sans objet, et elle entraînerait l’obligation
// d’un modèle erroné (TOLERANCE_SANS_MODELE_ERRONE) là où il n’y a rien à
// modéliser.
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ──────────────────────────────────
//
//   · **Le geste de branchement.** On ne branche rien ici. Les énoncés disent
//     « le voltmètre indique », « que va indiquer le voltmètre » — jamais
//     « branche le voltmètre ». Placer l’appareil est `ch02-sf3`, et l’y laisser
//     est la condition pour que cet item-ci reste de cercle 1.
//   · **La loi d’UNICITÉ des tensions** — les branches en dérivation ont la même
//     tension : c’est `ch02-sf5`. Tous les circuits de ce fichier sont à UNE
//     SEULE MAILLE, sans exception, et le titre du savoir-faire le dit.
//   · **Le calibre et le chiffre de trop.** Une lecture d’appareil avec son
//     calibre est `ch02-sf4` ; ici les indications sont données, jamais lues sur
//     un cadran.
//   · **L’adaptation d’une lampe à un générateur** — « 3,5 V sur une pile de
//     4,5 V, elle grille » : c’est `ch02-sf7`. Aucun item ne conclut sur ce
//     qu’une lampe supporte.
//   · **L’intensité, la loi d’Ohm, la puissance.** L’intensité est le chapitre
//     7, la loi d’Ohm est un chapitre frontière du plan, la puissance n’est pas
//     au cycle 4. Aucune donnée de ce fichier n’est un ampère.
//   · **La tension aux bornes d’un interrupteur OUVERT.** Le cours dit qu’un
//     interrupteur FERMÉ et un fil ne prennent aucune tension, parce qu’il faut
//     le dire pour que l’addition se fasse sur les bons termes. Ce que lit un
//     voltmètre aux bornes d’un interrupteur ouvert est un attendu de lycée, et
//     aucun item ne le demande.
//   · **La discrimination mathématique.** `ch02-sf6` ne déclare aucun
//     `prerequisMaths` : additionner et retrancher des décimaux est installé
//     depuis le cycle 3. Aucun item ne porte `discriminationMaths` — en poser un
//     serait refusé (DISCRIMINATION_SANS_PREREQUIS).

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — les six graphes, écrits une fois
// ════════════════════════════════════════════════════════════════════════════
//
// Convention de bornes de `circuit.js`, valable pour tout dipôle polarisé :
//
//     bornes = [ borne « − » (COM, noire) , borne « + » (rouge) ]
//
// Pour la pile, le courant sort par « + », donc par `bornes[1]`. Les nœuds sont
// nommés d’après le montage, jamais d’après le dessin : la disposition n’est
// pas une donnée, `schema.js` la déduit du graphe.

const dipole = (id, nom, type, moins, plus, extra = {}) => Object.freeze({
  id, nom, type, bornes: Object.freeze([moins, plus]), ...extra,
});

const circuit = (...dipoles) => Object.freeze({ dipoles: Object.freeze(dipoles) });

/** Pile, interrupteur fermé, deux lampes. Le circuit le plus simple où la loi
 *  ait deux termes à additionner. */
const CIRCUIT_DEUX_LAMPES = circuit(
  dipole('G', 'la pile', 'pile', 'g-', 'g+'),
  dipole('K', 'K', 'interrupteur', 'g+', 'n1', { etat: 'ferme' }),
  dipole('L1', 'L1', 'lampe', 'n1', 'n2'),
  dipole('L2', 'L2', 'lampe', 'n2', 'g-'),
);

/** Pile, résistance, lampe — SANS interrupteur. Le montage permanent d’une
 *  veilleuse : rien à commander, donc rien à commuter. */
const CIRCUIT_RESISTANCE_ET_LAMPE = circuit(
  dipole('G', 'la pile', 'pile', 'g-', 'g+'),
  dipole('R', 'R', 'resistance', 'g+', 'n1'),
  dipole('L1', 'L1', 'lampe', 'n1', 'g-'),
);

/** Pile, interrupteur fermé, trois lampes. C’est le circuit où la tension
 *  cherchée n’est PAS la dernière de la boucle. */
const CIRCUIT_TROIS_LAMPES = circuit(
  dipole('G', 'la pile', 'pile', 'g-', 'g+'),
  dipole('K', 'K', 'interrupteur', 'g+', 'n1', { etat: 'ferme' }),
  dipole('L1', 'L1', 'lampe', 'n1', 'n2'),
  dipole('L2', 'L2', 'lampe', 'n2', 'n3'),
  dipole('L3', 'L3', 'lampe', 'n3', 'g-'),
);

/** Pile, interrupteur fermé, moteur, deux lampes. Un récepteur qui n’est pas
 *  une lampe : la loi ne fait aucune différence, et c’est ce qu’il faut voir. */
const CIRCUIT_MOTEUR_ET_DEUX_LAMPES = circuit(
  dipole('G', 'la pile', 'pile', 'g-', 'g+'),
  dipole('K', 'K', 'interrupteur', 'g+', 'n1', { etat: 'ferme' }),
  dipole('M', 'M', 'moteur', 'n1', 'n2'),
  dipole('L1', 'L1', 'lampe', 'n2', 'n3'),
  dipole('L2', 'L2', 'lampe', 'n3', 'g-'),
);

/** Pile, interrupteur fermé, moteur, lampe. */
const CIRCUIT_LAMPE_ET_MOTEUR = circuit(
  dipole('G', 'la pile', 'pile', 'g-', 'g+'),
  dipole('K', 'K', 'interrupteur', 'g+', 'n1', { etat: 'ferme' }),
  dipole('M', 'M', 'moteur', 'n1', 'n2'),
  dipole('L1', 'L1', 'lampe', 'n2', 'g-'),
);

/** Pile, interrupteur fermé, deux lampes et une résistance : cinq dipôles, dont
 *  deux qui ne prennent aucune tension et un qu’on oublie. */
const CIRCUIT_CINQ_DIPOLES = circuit(
  dipole('G', 'la pile', 'pile', 'g-', 'g+'),
  dipole('K', 'K', 'interrupteur', 'g+', 'n1', { etat: 'ferme' }),
  dipole('L1', 'L1', 'lampe', 'n1', 'n2'),
  dipole('R', 'R', 'resistance', 'n2', 'n3'),
  dipole('L2', 'L2', 'lampe', 'n3', 'g-'),
);

// ── Les constantes du fichier, pour ne pas les réécrire vingt-cinq fois ────

const SF = 'ch02-sf6-loi-d-additivite-des-tensions';
const CH = 'ch02-tension-electrique';

/** La `situation` du piège de l’unité, telle que son prédicat la lit. Les
 *  quatre exigences sont écrites à chaque item plutôt que dérivées d’un
 *  raccourci : ce sont des données de l’item, pas une propriété du fichier. */
const situationUnite = (unitesPresentesDansLEnonce) => ({
  reponseDimensionnee: true,
  uniteCible: 'V',
  unitesPresentesDansLEnonce,
  champUniteSepare: true,
  uniteImposee: false,
});

/** La `situation` d’un item de PRÉDICTION apparié. `itemsIntercales` compte les
 *  items servis entre les deux : le prédicat en exige au moins un, et la
 *  section en place deux. */
const paireAvec = (restitution, prediction, itemsIntercales) => ({
  paire: { restitution, prediction },
  roleDeCetItem: 'prediction',
  memeEcran: false,
  itemsIntercales,
});

const MOTIF_PAIRE = (restitution) =>
  'Second item d’une PAIRE appariée, et le seul des deux dont l’issue diagnostique quelque chose. '
  + `L’item de restitution « ${restitution} » demande d’énoncer la loi dans les mots du cours ; `
  + 'celui-ci demande de PRÉDIRE ce qu’un appareil affichera sur une situation concrète qui relève '
  + 'de la même loi. Les deux ne sont jamais sur le même écran, et au moins deux items les '
  + 'séparent : sur un '
  + 'même écran, l’élève aligne sa seconde réponse sur la première — non par tricherie, mais parce '
  + 'que la cohérence est ce qu’on lui a appris à produire — et l’écart qu’on veut mesurer '
  + 'disparaît. La conception se lit dans l’ÉCART entre les deux, jamais dans l’un des deux pris '
  + 'seul.';

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — une situation, aucune règle énoncée
// ════════════════════════════════════════════════════════════════════════════

export const DECOUVERTE = Object.freeze({
  titre: 'Six volts pour trois lampes, et personne ne sait comment ils se partagent',
  texte:
    'Une classe monte en série une pile plate, un interrupteur et trois petites lampes de '
    + 'tailles différentes. La pile porte l’indication 6 V. Chaque binôme branche un voltmètre '
    + 'aux bornes d’un dipôle, et on écrit les six relevés au tableau.',
  releve: Object.freeze([
    'aux bornes de la pile : 6 V',
    'aux bornes de l’interrupteur fermé : 0 V',
    'aux bornes de la petite lampe : 1,2 V',
    'aux bornes de la lampe moyenne : 1,9 V',
    'aux bornes de la grosse lampe : 2,9 V',
    'aux bornes d’un fil de connexion : 0 V',
  ]),
  questions: Object.freeze([
    'Avant de lire la suite : additionne les trois tensions des lampes. Que remarques-tu ?',
    'L’interrupteur et le fil affichent zéro. Est-ce qu’ils comptent dans cette addition ?',
    'Un binôme propose : « 6 divisé par 3, chaque lampe devrait recevoir 2 V ». '
      + 'Sur quelles lampes cette phrase tomberait-elle juste, et sur lesquelles tomberait-elle faux ?',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées tiennent debout à ce stade : « la pile envoie ses '
    + '6 V à chaque lampe, sinon la dernière ne s’allumerait pas » et « les 6 V se partagent, et '
    + 'ils se partagent en parts égales ». Le cours ne va dire ni que la première est absurde — '
    + 'elle explique très bien pourquoi les trois lampes brillent —, ni que la seconde est bête : '
    + 'elle est même exactement vraie quand les dipôles sont identiques. Il va dire ce qui, dans '
    + 'les deux, ne survit pas au relevé du tableau.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — sept blocs typés
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'La loi d’additivité des tensions dans un circuit à une seule boucle',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'Tension et volt',
      texte:
        'La **tension** se mesure ENTRE deux points — les deux bornes d’un dipôle — et jamais en '
        + 'un point seul. On la note **U**, avec le nom du dipôle en indice, et elle s’exprime en '
        + '**volts (V)**. Un millivolt (mV) vaut un millième de volt : **1 000 mV = 1 V**. Un '
        + 'appareil qui affiche 1 800 mV et un appareil qui affiche 1,8 V disent exactement la '
        + 'même chose.',
    },
    {
      type: 'propriete',
      titre: 'La loi d’additivité',
      texte:
        'Dans un circuit qui ne comporte **qu’une seule boucle**, la tension aux bornes du '
        + 'générateur est égale à la **somme** des tensions aux bornes de tous les autres '
        + 'dipôles :\n\n'
        + '**U(pile) = U(dipôle 1) + U(dipôle 2) + … + U(dernier dipôle)**\n\n'
        + 'Sur le relevé de la découverte : 1,2 + 1,9 + 2,9 = 6, et la pile affiche 6 V. Ce n’est '
        + 'pas une coïncidence, c’est la loi.',
    },
    {
      type: 'propriete',
      titre: 'Ce qui ne prend aucune tension',
      texte:
        'Aux bornes d’un **fil de connexion** et aux bornes d’un **interrupteur fermé**, un '
        + 'voltmètre affiche **0 V**. Ils figurent bien dans l’addition, mais ils y ajoutent zéro : '
        + 'autant dire qu’on peut les sauter. C’est pour ça que « U(pile) = U(L1) + U(L2) » et '
        + '« U(pile) = U(K) + U(L1) + U(L2) » sont **la même égalité** quand K est fermé.',
    },
    {
      type: 'remarque',
      titre: 'Le partage n’est égal que si les dipôles le sont',
      texte:
        'Diviser la tension de la pile par le nombre de dipôles ne marche **que si les dipôles '
        + 'sont identiques** — une guirlande de six ampoules toutes pareilles, oui ; une petite '
        + 'lampe et un moteur, non. La loi ne dit pas comment le partage se fait, elle dit '
        + 'seulement que **le total est conservé**. Deux lampes différentes se partagent les '
        + 'mêmes 6 V, mais pas en deux fois 3 V.',
    },
    {
      type: 'propriete',
      titre: 'La loi se lit dans les deux sens',
      texte:
        'Si tu connais toutes les tensions sauf une, tu **retranches** : la tension manquante est '
        + 'celle de la pile moins toutes les autres. Si tu connais toutes celles des dipôles et '
        + 'pas celle de la pile, tu **additionnes**. Et la tension cherchée n’est pas forcément '
        + 'la dernière de la boucle : elle peut être **au milieu**, cela ne change rien à '
        + 'l’opération.',
    },
    {
      type: 'remarque',
      titre: 'Le contrôle qui attrape presque tout',
      texte:
        'Une tension aux bornes d’un dipôle **ne peut pas dépasser** celle de la pile, dans un '
        + 'circuit à une boucle. Et elle **ne peut pas être négative**. Alors avant d’écrire ta '
        + 'réponse : additionne-la aux autres et compare le total à la pile. S’il dépasse, tu as '
        + 'additionné là où il fallait retrancher — c’est l’erreur la plus fréquente, et c’est '
        + 'celle qui se rattrape le plus vite.',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne brancheras aucun voltmètre ici : **le geste se prend en salle, pas sur un écran**. '
        + 'Ce qu’on travaille, c’est ce qui vient avant et après — dire où il faudrait le brancher, '
        + 'prévoir ce qu’il affichera, exploiter ce qu’il a affiché, et refuser une valeur qui ne '
        + 'peut pas être vraie.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un exercice résolu, geste de contrôle compris
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Trouver la tension manquante dans un circuit à une boucle',
  enonce:
    'Une pile de 4,5 V alimente, en série, un interrupteur fermé K, une lampe L1 et un buzzer B. '
    + 'Le voltmètre aux bornes de L1 indique 2 600 mV. Que vaut la tension aux bornes du buzzer ? '
    + 'Donne ta réponse avec son unité.',
  etapes: Object.freeze([
    {
      geste: 'Écris la loi pour CE circuit, dipôle par dipôle.',
      redaction:
        'Une seule boucle, quatre dipôles : U(pile) = U(K) + U(L1) + U(B). Je n’en oublie aucun, '
        + 'même ceux dont je devine la valeur.',
    },
    {
      geste: 'Raye ce qui vaut zéro, et dis-le.',
      redaction:
        'K est **fermé** : U(K) = 0 V. Il reste U(pile) = U(L1) + U(B). Je l’écris, je ne le '
        + 'fais pas en silence.',
    },
    {
      geste: 'Mets toutes les tensions dans la MÊME unité, avant de calculer.',
      redaction:
        '2 600 mV, ce sont des millièmes de volt : 2 600 ÷ 1 000 = **2,6 V**. Maintenant les deux '
        + 'nombres se comparent — avant, non.',
    },
    {
      geste: 'Isole la tension cherchée.',
      redaction: 'U(B) = U(pile) − U(L1) = 4,5 − 2,6 = **1,9 V**.',
    },
    {
      geste: 'Écris la réponse avec son unité.',
      redaction:
        'La tension aux bornes du buzzer vaut **1,9 V**. J’aurais pu écrire 1 900 mV : c’est la '
        + 'même tension, et c’est accepté.',
    },
  ].map(Object.freeze)),
  controle:
    'Deux vérifications, dans cet ordre. **La nature** : ce que j’ai écrit se lit-il comme une '
    + 'tension ? Oui, des volts — pas des ampères, pas un nombre nu. **La somme** : je remets ma '
    + 'réponse dans la loi et je compare à la pile. 0 + 2,6 + 1,9 = 4,5, et la pile affiche 4,5 V. '
    + 'Ça tombe. Si j’avais trouvé 7,1 V, la somme aurait donné 9,7 V pour une pile de 4,5 V, et '
    + 'j’aurais su que j’avais additionné au lieu de retrancher — sans même relire mon calcul.',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas la soustraction : c’est d’avoir travaillé sur 2 600 et '
    + '4,5 sans convertir. 4,5 − 2 600 donne −2 595,5, et une tension négative aux bornes d’un '
    + 'buzzer n’existe pas. La seconde, c’est d’avoir additionné : 4,5 + 2,6 = 7,1 V, soit une '
    + 'tension aux bornes d’un seul dipôle plus grande que celle de la pile entière.',
});

// ════════════════════════════════════════════════════════════════════════════
// ENTRAÎNEMENT — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 — palier 1 · classe A · le cas de base, sur un schéma ───────────
  //
  // Le seul item du fichier à porter un distracteur sur une soustraction, et il
  // ne rattrape pas l’opération : il rattrape l’ABSENCE DE CONTRÔLE. 7,2 V aux
  // bornes d’une lampe alimentée par une pile de 4,5 V ne peut pas être vrai, et
  // c’est ce constat-là — pas « tu as fait une addition » — que le piège porte.
  {
    id: 'ch02-sf6-e01-deux-lampes-sur-une-pile-plate',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'deux-lampes-sur-une-pile-plate',
    enonce:
      'Dans ce circuit, la pile délivre {{donnee:ug}} et un voltmètre branché aux bornes de L1 '
      + 'indique {{donnee:u1}}. Quelle tension un voltmètre branché aux bornes de L2 '
      + 'indiquerait-il ? Donne ta réponse avec son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_DEUX_LAMPES, titre: 'Deux lampes en série sur une pile plate' },
    donnees: {
      ug: { valeur: [9, 2], unite: 'V' },
      u1: { valeur: [27, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@ug − @u1', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [9, 5], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'on-additionne-au-lieu-de-retrancher',
        valeur: [36, 5],
        unite: 'V',
        // Le rattachement est à la vraisemblance, PAS à l’opération : 7,2 V aux
        // bornes de L2 donnerait 2,7 + 7,2 = 9,9 V pour une pile de 4,5 V. Le
        // geste de contrôle du cours l’attrape sans refaire le calcul, et c’est
        // exactement ce que ce piège demande d’installer.
        piege: 'valeur-invraisemblable-non-critiquee',
        modeleErrone: {
          id: 'la-loi-appliquee-comme-une-addition',
          nom: 'modèle « la loi dit d’additionner » : on ajoute les deux tensions connues',
          calcul: { etapes: [{ id: 'x', expr: '@ug + @u1', unite: 'V' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── e02 — palier 1 · classe C · double QCM · RESTITUTION de la paire 1 ──
  //
  // Aucun piège déclaré, et ce n’est pas un oubli : le prédicat de
  // `reponse-conforme-sans-adhesion` n’accepte que `roleDeCetItem: 'prediction'`.
  // Un item de restitution qui se déclarerait au piège serait refusé, et il le
  // mérite — l’élève conforme y réussit par définition, il ne mesure rien.
  // C’est `e05` qui porte le piège, deux items plus loin.
  //
  // Les trois justifications fausses n’en portent aucun non plus, et c’est la
  // correction de la relecture adverse : ce sont trois conceptions de PHYSIQUE —
  // « chacune reçoit tout », « on divise en parts égales », « la première se sert
  // d’abord » —, et le catalogue n’en documente aucune. Les rattacher à
  // `reponse-conforme-sans-adhesion` faisait servir, sur le quadrant juste/faux,
  // une règle qui parle de la voiture et du camion : elle ne réfute rien ici, et
  // elle traite d’insincère un élève qui se trompe sincèrement.
  {
    id: 'ch02-sf6-e02-restitution-la-loi-en-une-phrase',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'la-loi-enoncee-en-debut-de-seance',
    enonce:
      'Une pile alimente deux lampes montées en série, dans une seule boucle. Parmi ces quatre '
      + 'phrases, laquelle dit juste ce que valent les tensions ? Puis choisis la phrase qui dit '
      + 'pourquoi.',
    reponse: {
      libre: false,
      choix: 'la-tension-de-la-pile-est-la-somme-des-tensions-des-dipoles',
      choixPossibles: [
        'la-tension-de-la-pile-est-la-somme-des-tensions-des-dipoles',
        'chaque-lampe-recoit-la-tension-entiere-de-la-pile',
        'la-tension-de-la-pile-se-partage-toujours-en-parts-egales',
        'la-premiere-lampe-prend-ce-qu-il-lui-faut-la-seconde-prend-le-reste',
      ],
    },
    justifications: [
      {
        id: 'le-total-se-conserve-le-partage-n-est-pas-dit',
        texte:
          'La loi dit que le total est conservé : en ajoutant les tensions de tous les dipôles, '
          + 'je retrouve celle de la pile. Elle ne dit pas comment le partage se fait — deux '
          + 'lampes différentes se partagent les mêmes volts, mais pas en deux parts égales.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'sinon-la-deuxieme-ne-s-allumerait-pas',
        texte:
          'Si la première lampe prenait une partie des volts, il n’en resterait pas assez pour la '
          + 'seconde et elle ne s’allumerait pas. Donc chacune reçoit la tension entière.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'six-divise-par-deux-fait-trois',
        texte:
          'Il y a deux lampes et la pile donne 6 V : 6 divisé par 2 fait 3, donc chaque lampe '
          + 'reçoit 3 V. C’est comme ça qu’on partage.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'le-courant-arrive-d-abord-a-la-premiere',
        texte:
          'Le courant sort de la pile et rencontre L1 en premier : elle se sert d’abord, et L2 '
          + 'reçoit ce qui reste après elle.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '1400b6c6bbfeb72b' },
  },

  // ── e03 — palier 1 · classe A · la tension cherchée est AU MILIEU ───────
  //
  // Trois lampes, deux voltmètres, et celui qui manque est le deuxième. Rien ne
  // change à l’opération — et c’est précisément ce que l’item fait constater :
  // l’élève qui a compris la loi comme « on retranche ce qui précède » ne peut
  // pas répondre ici, celui qui l’a comprise comme « le total est conservé »
  // n’y voit aucune difficulté nouvelle.
  {
    id: 'ch02-sf6-e03-la-lampe-du-milieu-sans-voltmetre',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'trois-lampes-deux-voltmetres',
    enonce:
      'Trois lampes L1, L2 et L3 sont montées en série avec une pile qui délivre {{donnee:ug}}. '
      + 'La classe ne dispose que de deux voltmètres : aux bornes de L1 on lit {{donnee:u1}}, aux '
      + 'bornes de L3 on lit {{donnee:u3}}. Que vaut la tension aux bornes de L2 ? Donne ta '
      + 'réponse avec son unité.',
    donnees: {
      ug: { valeur: [6, 1], unite: 'V' },
      u1: { valeur: [3, 2], unite: 'V' },
      u3: { valeur: [5, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@ug − @u1 − @u3', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [2, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── e04 — palier 1 · classe A · le piège de l’unité, par les millivolts ─
  //
  // La quatrième exigence du prédicat — « au moins une unité de l’énoncé DIFFÈRE
  // de l’unité attendue » — est ce qui rend ce piège honnête sur ce
  // savoir-faire. Sur une addition de tensions toutes écrites en volts, recopier
  // suffirait à répondre juste, et l’item conforterait le modèle de l’élève au
  // lieu de le mettre en défaut. D’où les millivolts, ici et sur les six autres.
  {
    id: 'ch02-sf6-e04-del-et-resistance-de-protection',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'del-et-resistance-de-protection',
    enonce:
      'Une pile de {{donnee:ug}} alimente, en série, une DEL et une résistance de protection. Le '
      + 'voltmètre branché aux bornes de la DEL affiche {{donnee:udel}}. Que vaut la tension aux '
      + 'bornes de la résistance ? Donne ta réponse avec son unité.',
    donnees: {
      ug: { valeur: [9, 2], unite: 'V' },
      udel: { valeur: [1800, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'ur', expr: '@ug − @udel', unite: 'V' }],
      reponse: 'ur',
    },
    reponse: { valeur: [27, 10], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: situationUnite(['V', 'mV']),
  },

  // ── e05 — palier 1 · classe A · PRÉDICTION de la paire 1 ───────────────
  //
  // Deux items séparent celui-ci de `e02` — `e03` et `e04` —, et les deux ne
  // sont jamais sur le même écran. C’est la condition du prédicat, et ce n’est
  // pas une précaution de forme : sur un même écran, l’élève aligne sa seconde
  // réponse sur la première, et l’écart qu’on veut mesurer disparaît sous nos
  // yeux.
  {
    id: 'ch02-sf6-e05-prediction-la-lampe-temoin-du-velo',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'lampe-temoin-et-moteur-de-velo-electrique',
    enonce:
      'Sur le guidon d’un vélo électrique, une lampe témoin et un petit moteur d’assistance sont '
      + 'branchés en série sur une batterie de {{donnee:ug}}. Le voltmètre aux bornes du moteur '
      + 'indique {{donnee:um}}. Que va indiquer le voltmètre branché aux bornes de la lampe '
      + 'témoin ? Donne ta réponse avec son unité.',
    donnees: {
      ug: { valeur: [12, 1], unite: 'V' },
      um: { valeur: [17, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ul', expr: '@ug − @um', unite: 'V' }],
      reponse: 'ul',
    },
    reponse: { valeur: [7, 2], unite: 'V', semantique: 'exacte' },
    piege: 'reponse-conforme-sans-adhesion',
    situation: paireAvec(
      'ch02-sf6-e02-restitution-la-loi-en-une-phrase',
      'ch02-sf6-e05-prediction-la-lampe-temoin-du-velo',
      2,
    ),
    estFormatDiagnostique: true,
    motifFormatDiagnostique: MOTIF_PAIRE('ch02-sf6-e02-restitution-la-loi-en-une-phrase'),
  },

  // ── e06 — palier 2 · classe A · le support devient un SCHÉMA ────────────
  //
  // `dimensionVariee: 'objet-support'` : le montage n’est plus décrit, il est
  // dessiné, et l’élève doit lire lui-même combien de dipôles entrent dans
  // l’addition. Ce circuit-ci n’a pas d’interrupteur — une veilleuse ne se
  // commande pas —, ce qui interdit de compter les dipôles de mémoire.
  {
    id: 'ch02-sf6-e06-veilleuse-resistance-et-lampe',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'veilleuse-de-couloir-sans-interrupteur',
    enonce:
      'Voici le circuit permanent d’une veilleuse de couloir : il ne comporte aucun interrupteur. '
      + 'La pile délivre {{donnee:ug}}, et le voltmètre branché aux bornes de la lampe L1 affiche '
      + '{{donnee:ul}}. Que vaut la tension aux bornes de la résistance R ? Donne ta réponse avec '
      + 'son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_RESISTANCE_ET_LAMPE, titre: 'Le circuit permanent d’une veilleuse' },
    donnees: {
      ug: { valeur: [3, 1], unite: 'V' },
      ul: { valeur: [2100, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'ur', expr: '@ug − @ul', unite: 'V' }],
      reponse: 'ur',
    },
    reponse: { valeur: [9, 10], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: situationUnite(['V', 'mV']),
  },

  // ── e07 — palier 2 · classe C · double QCM · RESTITUTION de la paire 2 ──
  //
  // `dimensionVariee` est OBLIGATOIRE au palier 2, piège ou pas
  // (DIMENSION_VARIEE_ABSENTE) : cet item n’en porte aucun, sa dimension ne
  // compte donc dans aucun croisement, et elle est écrite quand même — elle dit
  // ce qui a changé depuis `e02`, à savoir la grandeur interrogée.
  //
  // Ses trois justifications fausses ne portent aucun piège, pour la raison dite
  // à `e02` : « fermé, il laisse passer les volts » est une confusion entre
  // courant et tension, « il est à côté donc il affiche pareil » est la loi
  // d’unicité appliquée hors de son cas, « ça dépend du modèle » est un refus de
  // prédire. Trois conceptions, aucune au catalogue, et aucune qui soit une
  // récitation du cours sans adhésion.
  {
    id: 'ch02-sf6-e07-restitution-la-tension-d-un-interrupteur-ferme',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 2,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'un-voltmetre-aux-bornes-de-l-interrupteur',
    enonce:
      'Dans un circuit à une seule boucle, un voltmètre est branché aux bornes d’un interrupteur '
      + 'FERMÉ. Que doit-il afficher, d’après le cours ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'zero-volt',
      choixPossibles: [
        'zero-volt',
        'la-tension-de-la-pile',
        'la-meme-tension-que-la-lampe-voisine',
        'on-ne-peut-pas-le-savoir-sans-mesurer',
      ],
    },
    justifications: [
      {
        id: 'il-figure-dans-l-addition-et-il-y-ajoute-zero',
        texte:
          'Un interrupteur fermé, c’est un fil : il figure bien dans l’addition des tensions, '
          + 'mais il y ajoute zéro. C’est pour ça qu’on peut l’écrire ou le sauter sans changer '
          + 'l’égalité.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'il-laisse-passer-donc-il-laisse-passer-les-volts',
        texte:
          'Fermé, il laisse tout passer : les volts de la pile le traversent entièrement, donc le '
          + 'voltmètre affiche la tension de la pile.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'il-est-a-cote-donc-il-affiche-pareil',
        texte:
          'Il est juste à côté de la lampe, sur la même boucle : le voltmètre affichera la même '
          + 'chose qu’aux bornes de la lampe.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'ca-depend-de-l-interrupteur-qu-on-a-pris',
        texte:
          'Ça dépend du modèle d’interrupteur et de son état d’usure : il faut mesurer pour le '
          + 'savoir, on ne peut pas le prévoir.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'e7b3c47b32392f7e' },
  },

  // ── e08 — palier 2 · classe A · la loi lue dans l’autre sens ────────────
  //
  // `dimensionVariee: 'sens-du-changement'` : jusqu’ici on retranchait, ici on
  // additionne. C’est la même loi, et c’est bien le sens du parcours qui change
  // — pas le support, pas le mode de réponse. Aucun piège déclaré : rien dans
  // cet item ne place l’élève devant une conception que le catalogue porte.
  {
    id: 'ch02-sf6-e08-quelle-pile-faut-il',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'maquette-a-alimenter-lampes-et-moteur',
    enonce:
      'Une maquette comporte, en série, deux lampes L1 et L2, un petit moteur et un interrupteur '
      + 'fermé. Pour qu’elle fonctionne, il faut {{donnee:u1}} aux bornes de L1, {{donnee:u2}} aux '
      + 'bornes de L2 et {{donnee:um}} aux bornes du moteur. Quelle tension la pile doit-elle '
      + 'délivrer ? Donne ta réponse avec son unité.',
    donnees: {
      u1: { valeur: [23, 10], unite: 'V' },
      u2: { valeur: [19, 10], unite: 'V' },
      um: { valeur: [43, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ug', expr: '@u1 + @u2 + @um', unite: 'V' }],
      reponse: 'ug',
    },
    reponse: { valeur: [17, 2], unite: 'V', semantique: 'exacte' },
  },

  // ── e09 — palier 4 · classe A · le palier non étiqueté ──────────────────
  //
  // Rien ne dit à l’élève ce qu’on lui demande de reconnaître : trois dipôles,
  // deux unités, et la tension cherchée est la dernière — mais seulement parce
  // qu’il l’aura constaté, pas parce qu’on le lui a annoncé.
  {
    id: 'ch02-sf6-e09-boitier-a-trois-dipoles',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'boitier-de-jeu-electronique',
    enonce:
      'Le boîtier d’un jeu électronique comporte, en série sur une pile de {{donnee:ug}} : une '
      + 'lampe L1, une résistance R et une lampe L2. Les voltmètres indiquent {{donnee:u1}} aux '
      + 'bornes de L1 et {{donnee:ur}} aux bornes de R. Que vaut la tension aux bornes de L2 ? '
      + 'Donne ta réponse avec son unité.',
    donnees: {
      ug: { valeur: [9, 1], unite: 'V' },
      u1: { valeur: [16, 5], unite: 'V' },
      ur: { valeur: [2500, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@ug − @u1 − @ur', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [33, 10], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: situationUnite(['V', 'mV']),
  },

  // ── e10 — palier 2 · classe A · PRÉDICTION de la paire 2 ───────────────
  //
  // Le pendant de `e07` : là-bas on faisait DIRE que la tension aux bornes d’un
  // interrupteur fermé vaut zéro ; ici il faut la PRODUIRE, sur un montage
  // concret, sans qu’on la rappelle.
  //
  // ⚠ CET ITEM A ÉTÉ RETOURNÉ, et il faut dire ce qu’il était. Il donnait
  // `uk = 0 V` dans l’énoncé et demandait la tension aux bornes de L2, en
  // retranchant `uk` dans la chaîne. Un commentaire affirmait qu’« un élève qui
  // ajoute ici la tension de l’interrupteur à celle des lampes est exactement
  // celui que ce piège cherche ». C’était arithmétiquement faux : ajouter zéro
  // ou ne pas l’ajouter donne le même nombre. L’item ne pouvait séparer AUCUN
  // élève sur la seule chose que sa restitution avait énoncée, et la moitié
  // diagnostique de la paire 2 ne diagnostiquait rien.
  //
  // Il demande donc maintenant la tension aux bornes de K, les deux lampes
  // étant données. La conception est alors en jeu pour de bon : l’élève qui a
  // coché « zéro volt » chez `e07` puis qui prédit ici 6 V — c’est exactement ce
  // que dit la justification fausse « fermé, il laisse tout passer, donc le
  // voltmètre affiche la tension de la pile » — est celui que la paire cherche.
  // Et la réponse n’est atteignable que par la loi : il faut additionner 2,65 et
  // 3,35, constater que les deux lampes épuisent les 6 V, et conclure qu’il ne
  // reste rien pour K.
  //
  // `dimensionVariee: 'grandeur-en-jeu'` — ce qui entre en jeu depuis `e05`,
  // c’est une tension d’un genre nouveau : celle d’un dipôle qui n’en prend
  // aucune. L’étiquette était déjà écrite ; elle n’est exacte que depuis que
  // c’est bien CETTE tension-là qu’on demande. Voir l’en-tête pour la raison qui
  // a écarté `objet-support`.
  {
    id: 'ch02-sf6-e10-prediction-le-troisieme-voltmetre',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'montage-de-paillasse-a-trois-voltmetres',
    enonce:
      'Sur la paillasse : une pile de {{donnee:ug}}, un interrupteur fermé K et deux lampes L1 et '
      + 'L2, le tout en série. Le voltmètre aux bornes de L1 affiche {{donnee:u1}} ; celui aux '
      + 'bornes de L2 affiche {{donnee:u2}}. Que va afficher le troisième voltmètre, aux bornes de '
      + 'K ? Donne ta réponse avec son unité.',
    donnees: {
      ug: { valeur: [6, 1], unite: 'V' },
      u1: { valeur: [53, 20], unite: 'V' },
      u2: { valeur: [67, 20], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'uk', expr: '@ug − @u1 − @u2', unite: 'V' }],
      reponse: 'uk',
    },
    reponse: { valeur: [0, 1], unite: 'V', semantique: 'exacte' },
    piege: 'reponse-conforme-sans-adhesion',
    situation: paireAvec(
      'ch02-sf6-e07-restitution-la-tension-d-un-interrupteur-ferme',
      'ch02-sf6-e10-prediction-le-troisieme-voltmetre',
      2,
    ),
    estFormatDiagnostique: true,
    motifFormatDiagnostique: MOTIF_PAIRE('ch02-sf6-e07-restitution-la-tension-d-un-interrupteur-ferme'),
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 — palier 3 · classe A · l’unité, et le préfixe qui décide de tout ─
  //
  // `dimensionVariee: 'sens-du-changement'` pour le piège de l’unité : ses
  // paliers 2 portent `grandeur-en-jeu` et `objet-support`, ses paliers 3
  // portent `mode-de-reponse` et celle-ci — les deux jeux restent disjoints,
  // sans quoi MEME_DIMENSION_AUX_DEUX_PALIERS mordrait.
  //
  // Le distracteur est le seul du fichier à réclamer une donnée qui n’est PAS
  // dans l’énoncé : `u1SansSonPrefixe` est le nombre 2 400 lu comme des volts.
  // Ce n’est pas une grandeur de la situation, c’est la LECTURE que fait le
  // modèle erroné, et elle doit être exécutable pour que le distracteur ne soit
  // pas inventé. Elle rend 9 600 V — un bloc secteur de guirlande à neuf mille
  // volts —, ce qui dit assez que le préfixe n’est pas une décoration.
  {
    id: 'ch02-sf6-p01-quatre-ampoules-de-guirlande',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'guirlande-de-quatre-ampoules-identiques',
    enonce:
      'Une guirlande comporte quatre ampoules IDENTIQUES montées en série sur un bloc '
      + 'd’alimentation. L’étiquette d’une ampoule indique {{donnee:u1}}. Quelle tension le bloc '
      + 'doit-il délivrer pour que les quatre fonctionnent correctement ? Donne ta réponse avec '
      + 'son unité.',
    donnees: {
      u1: { valeur: [2400, 1], unite: 'mV' },
      // Le nombre de l’étiquette pris pour des volts. Aucune grandeur de la
      // situation ne vaut cela : c’est le modèle erroné qui la fabrique, et
      // elle est écrite ici parce qu’un distracteur non exécutable ne dit rien
      // de ce que l’élève croit.
      u1SansSonPrefixe: { valeur: [2400, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ug', expr: '@u1 × 4', unite: 'V' }],
      reponse: 'ug',
    },
    reponse: { valeur: [48, 5], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'le-prefixe-est-une-decoration',
        valeur: [9600, 1],
        unite: 'V',
        piege: 'unite-absente-ou-fausse',
        modeleErrone: {
          id: 'les-millivolts-comptes-comme-des-volts',
          nom: 'modèle « l’unité s’ajoute à la fin » : on multiplie le nombre de l’étiquette sans lire son préfixe',
          calcul: { etapes: [{ id: 'x', expr: '@u1SansSonPrefixe × 4', unite: 'V' }], reponse: 'x' },
        },
      },
    ],
    piege: 'unite-absente-ou-fausse',
    situation: situationUnite(['mV']),
  },

  // ── p02 — palier 4 · classe C · double QCM · RESTITUTION de la paire 4 ──
  //
  // La loi sous sa forme SYMBOLIQUE, au palier non étiqueté. Le registre reste
  // `macro` : ce ne sont pas des symboles de chimie ni un modèle particulaire,
  // c’est une égalité entre grandeurs mesurées, écrite avec leurs noms.
  //
  // Justifications fausses sans piège, même raison qu’à `e02` et `e07` : « la
  // lampe consomme le plus donc elle est seule d’un côté », « en série tout est
  // égal partout » et « le moteur rend ce qu’il n’utilise pas » sont trois
  // conceptions de physique, non documentées au catalogue, et aucune n’est une
  // récitation appliquée sans y croire.
  {
    id: 'ch02-sf6-p02-restitution-quelle-egalite',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'quatre-egalites-au-tableau',
    enonce:
      'On monte en série une pile, une lampe et un moteur. Laquelle de ces quatre égalités traduit '
      + 'la loi d’additivité des tensions pour ce circuit ? Puis choisis la phrase qui dit '
      + 'pourquoi.',
    reponse: {
      libre: false,
      choix: 'u-pile-egale-u-lampe-plus-u-moteur',
      choixPossibles: [
        'u-pile-egale-u-lampe-plus-u-moteur',
        'u-lampe-egale-u-pile-plus-u-moteur',
        'u-pile-egale-u-lampe-egale-u-moteur',
        'u-pile-egale-u-lampe-moins-u-moteur',
      ],
    },
    justifications: [
      {
        id: 'le-generateur-d-un-cote-les-recepteurs-de-l-autre',
        texte:
          'D’un côté de l’égalité, le générateur seul ; de l’autre, tous les autres dipôles '
          + 'additionnés. C’est ce qui rend l’égalité vraie quel que soit le nombre de dipôles '
          + 'qu’on ajoute dans la boucle.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'la-lampe-est-la-plus-grosse-donc-elle-est-devant',
        texte:
          'C’est la lampe qui consomme le plus, donc c’est elle qu’on met toute seule d’un côté : '
          + 'la pile et le moteur s’ajoutent pour l’alimenter.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'en-serie-tout-est-egal-partout',
        texte:
          'En série, tout est pareil partout dans le circuit : la pile, la lampe et le moteur ont '
          + 'donc la même tension.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'le-moteur-rend-ce-qu-il-n-utilise-pas',
        texte:
          'Le moteur ne se sert pas de tout : ce qu’il n’utilise pas repart vers la pile, donc on '
          + 'le retranche.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'c33d19732f78f10a' },
  },

  // ── p03 — palier 4 · classe A · trois lampes, deux unités, un schéma ────
  //
  // Le distracteur nomme l’oubli le plus banal du palier non étiqueté : on
  // retranche la première tension et on s’arrête là. 5,4 V aux bornes de L2
  // donnerait 3,6 + 5,4 + 2,2 = 11,2 V pour une pile de 9 V — le geste de
  // contrôle du cours l’attrape sans qu’on ait à relire le calcul, et c’est
  // pour cela que le rattachement se fait à la vraisemblance.
  {
    id: 'ch02-sf6-p03-trois-lampes-sur-neuf-volts',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'rampe-de-trois-lampes-de-maquette',
    enonce:
      'La rampe d’éclairage d’une maquette porte trois lampes en série. La pile délivre '
      + '{{donnee:ug}}. Aux bornes de L1, le voltmètre indique {{donnee:u1}} ; aux bornes de L3, '
      + 'il indique {{donnee:u3}}. Que vaut la tension aux bornes de L2 ? Donne ta réponse avec '
      + 'son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_TROIS_LAMPES, titre: 'La rampe d’éclairage de la maquette' },
    donnees: {
      ug: { valeur: [9, 1], unite: 'V' },
      u1: { valeur: [18, 5], unite: 'V' },
      u3: { valeur: [2200, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@ug − @u1 − @u3', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [16, 5], unite: 'V', semantique: 'exacte' },
    distracteurs: [
      {
        id: 'on-oublie-la-troisieme-lampe',
        valeur: [27, 5],
        unite: 'V',
        piege: 'valeur-invraisemblable-non-critiquee',
        modeleErrone: {
          id: 'on-ne-retranche-que-la-premiere',
          nom: 'modèle « il n’y a que deux termes » : on retranche L1 et on s’arrête là',
          calcul: { etapes: [{ id: 'x', expr: '@ug − @u1', unite: 'V' }], reponse: 'x' },
        },
      },
    ],
  },

  // ── p04 — palier 4 · classe C · CRITIQUER une valeur, sans la recalculer ─
  //
  // Item SCINDÉ. « Recalcule la tension » et « dis si cette valeur est possible »
  // sont deux tâches, et les réunir serait refusé
  // (ITEM_SCINDABLE_NON_SCINDE) dès lors que la seconde appelle une réponse
  // libre. Celui-ci ne porte donc aucune chaîne de calcul : c’est exactement ce
  // que la consigne demande — trancher SANS refaire le calcul —, et c’est
  // pourquoi il assume sa classe C plutôt que de simuler une garantie.
  //
  // Les deux distracteurs sont QUALITATIFS : leur `id` est la clé du choix
  // lui-même, ils ne portent pas de valeur, et aucun modèle erroné n’est donc
  // requis — il n’y a pas de nombre à produire.
  {
    id: 'ch02-sf6-p04-cette-valeur-est-elle-possible',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'la-copie-du-voisin-a-corriger',
    enonce:
      'Sur un circuit à une seule boucle, la pile délivre 4,5 V et le voltmètre aux bornes de L1 '
      + 'affiche 1,7 V. Un camarade annonce 3,8 V aux bornes de L2. Sans refaire son calcul, que '
      + 'peux-tu dire de cette valeur ?',
    reponse: {
      libre: false,
      choix: 'elle-est-impossible-la-somme-depasserait-celle-de-la-pile',
      choixPossibles: [
        'elle-est-impossible-la-somme-depasserait-celle-de-la-pile',
        'elle-est-possible-le-calcul-le-dira',
        'elle-est-impossible-une-tension-ne-depasse-jamais-un-volt',
        'on-ne-peut-rien-dire-sans-refaire-le-calcul',
      ],
    },
    distracteurs: [
      {
        id: 'elle-est-possible-le-calcul-le-dira',
        texte:
          'Le nombre sort d’un calcul, donc il n’y a rien à en penser : on verra bien à la '
          + 'correction.',
        piege: 'valeur-invraisemblable-non-critiquee',
      },
      {
        id: 'on-ne-peut-rien-dire-sans-refaire-le-calcul',
        texte:
          'Tant qu’on n’a pas refait l’opération, aucune valeur ne peut être écartée : juger avant '
          + 'de calculer, ce serait deviner.',
        piege: 'valeur-invraisemblable-non-critiquee',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '462a9aece2c7c6fa' },
  },

  // ── p05 — palier 4 · classe A · PRÉDICTION de la paire 4 ───────────────
  //
  // La restitution `p02` demande d’écrire l’égalité ; celle-ci demande, deux
  // items plus loin, ce qu’un appareil affichera — sur le même couple lampe et
  // moteur, pour que la conception se lise dans l’écart et non dans la
  // différence de situation.
  //
  // Le seul `prediction-engagee` du fichier, et il est ici plutôt qu’au palier 3
  // pour une raison de comptage : ce type EST un mode de réponse particulier —
  // la prédiction se VERROUILLE avant tout affichage —, et le déclarer à un
  // palier à variation obligerait `dimensionVariee` à valoir `mode-de-reponse`.
  // Le palier non étiqueté n’en porte aucune, et le format y est libre de servir
  // pour ce qu’il vaut. C’est aussi le meilleur endroit pour lui : rien
  // n’annonce à l’élève ce qu’on lui demande de reconnaître, et il doit engager
  // sa réponse quand même.
  {
    id: 'ch02-sf6-p05-prediction-la-lampe-et-le-moteur',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'prediction-engagee',
    contexteDeSurface: 'lampe-et-moteur-sur-la-paillasse',
    enonce:
      'Sur la paillasse : une pile de {{donnee:ug}}, une lampe et un moteur montés en série. Le '
      + 'voltmètre aux bornes du moteur indique {{donnee:um}}. Verrouille ta prédiction avant '
      + 'qu’on branche le second voltmètre : que va-t-il afficher aux bornes de la lampe ? Donne '
      + 'ta réponse avec son unité.',
    donnees: {
      ug: { valeur: [9, 2], unite: 'V' },
      um: { valeur: [13, 5], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ul', expr: '@ug − @um', unite: 'V' }],
      reponse: 'ul',
    },
    reponse: { valeur: [19, 10], unite: 'V', semantique: 'exacte' },
    piege: 'reponse-conforme-sans-adhesion',
    situation: paireAvec(
      'ch02-sf6-p02-restitution-quelle-egalite',
      'ch02-sf6-p05-prediction-la-lampe-et-le-moteur',
      2,
    ),
    estFormatDiagnostique: true,
    motifFormatDiagnostique: MOTIF_PAIRE('ch02-sf6-p02-restitution-quelle-egalite'),
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucune valeur de l’entraînement ni des problèmes n’est reprise : ni une
// tension de pile, ni une lecture de voltmètre, ni une réponse attendue. DEUX
// exceptions, vérifiées en valeurs SI et écrites plutôt que laissées à trouver.
// Le ZÉRO d’abord : `t10` donne `uk = 0 V`, et c’est la réponse attendue de
// `e10`. Il n’est reprenable ni évitable — la tension aux bornes d’un
// interrupteur fermé ne vaut rien d’autre, et la seule façon de ne pas la
// répéter serait de ne l’interroger qu’une fois. Le 2,4 V ensuite : `t06` le
// donne comme lecture de voltmètre, `p01` le donne comme étiquette d’ampoule
// écrite « 2 400 mV ». Ni le décor, ni l’écriture, ni la nature de la donnée ne
// se recoupent, et aucune des deux n’est une réponse attendue. Les
// trois graphes servis ici — `CIRCUIT_MOTEUR_ET_DEUX_LAMPES`,
// `CIRCUIT_LAMPE_ET_MOTEUR` et `CIRCUIT_CINQ_DIPOLES` — ne sont servis nulle
// part ailleurs, et aucun des six n’est le même circuit qu’un autre au sens de
// `formeCanonique`.

export const TEST = Object.freeze([

  // ── t01 — palier 1 · classe A ──────────────────────────────────────────
  {
    id: 'ch02-sf6-t01-deux-lampes-sur-quinze-volts',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'projecteur-portatif-a-deux-lampes',
    enonce:
      'Un projecteur portatif contient deux lampes en série, alimentées par une batterie de '
      + '{{donnee:ug}}. Aux bornes de L1, le voltmètre indique {{donnee:u1}}. Que vaut la tension '
      + 'aux bornes de L2 ? Donne ta réponse avec son unité.',
    donnees: {
      ug: { valeur: [15, 1], unite: 'V' },
      u1: { valeur: [47, 5], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@ug − @u1', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [28, 5], unite: 'V', semantique: 'exacte' },
  },

  // ── t02 — palier 3 · classe C · double QCM · RESTITUTION de la paire 3 ──
  //
  // `dimensionVariee: 'mode-de-reponse'` — la restitution ne porte plus sur une
  // phrase à choisir dans l’absolu mais sur une phrase d’ÉLÈVE à valider ou à
  // refuser. Cet item ne déclare aucun piège : il n’entre donc dans aucun
  // croisement de dimensions, et sa dimension ne documente que ce qui a changé.
  {
    id: 'ch02-sf6-t02-restitution-six-volts-divises-par-trois',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'la-phrase-d-un-camarade-a-valider',
    enonce:
      'Trois dipôles sont montés en série sur une pile. Un camarade écrit : « la pile donne 6 V, '
      + 'donc chaque dipôle reçoit 2 V ». Cette phrase est-elle toujours vraie ? Puis choisis la '
      + 'phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non-seulement-si-les-trois-dipoles-sont-identiques',
      choixPossibles: [
        'oui-toujours',
        'non-seulement-si-les-trois-dipoles-sont-identiques',
        'non-jamais',
        'on-ne-peut-pas-le-savoir-sans-mesurer',
      ],
    },
    justifications: [
      {
        id: 'la-loi-conserve-le-total-elle-ne-dit-pas-le-partage',
        texte:
          'La loi garantit que la somme des trois fait 6 V, rien de plus. Trois dipôles identiques '
          + 'se partagent bien 2 V chacun ; une petite lampe et un moteur, non — et la somme fera '
          + 'quand même 6 V.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'partager-c-est-diviser-en-parts-egales',
        texte:
          'Partager, ça veut dire donner la même chose à chacun : six volts pour trois dipôles, '
          + 'ça fait deux volts chacun, toujours.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'jamais-egal-parce-que-le-courant-s-affaiblit',
        texte:
          'Ce n’est jamais égal : le courant s’affaiblit en avançant, donc le dernier dipôle reçoit '
          + 'toujours moins que le premier.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'chaque-montage-est-different-il-faut-mesurer',
        texte:
          'Chaque montage est un cas particulier : sans voltmètre on ne peut rien affirmer, même '
          + 'pas que la somme fait 6 V.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '2d67462177685541' },
  },

  // ── t03 — palier 1 · classe A · sur schéma, la tension cherchée en tête ─
  {
    id: 'ch02-sf6-t03-moteur-et-deux-lampes',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'ventilateur-de-bureau-a-deux-temoins',
    enonce:
      'Ce circuit alimente le moteur M d’un petit ventilateur et ses deux lampes témoins L1 et L2. '
      + 'La pile délivre {{donnee:ug}}. Aux bornes du moteur, le voltmètre indique {{donnee:um}} ; '
      + 'aux bornes de L2, il indique {{donnee:u2}}. Que vaut la tension aux bornes de L1 ? Donne '
      + 'ta réponse avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_MOTEUR_ET_DEUX_LAMPES,
      titre: 'Le ventilateur de bureau et ses deux témoins',
    },
    donnees: {
      ug: { valeur: [15, 2], unite: 'V' },
      um: { valeur: [43, 20], unite: 'V' },
      u2: { valeur: [39, 20], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u1', expr: '@ug − @um − @u2', unite: 'V' }],
      reponse: 'u1',
    },
    reponse: { valeur: [17, 5], unite: 'V', semantique: 'exacte' },
  },

  // ── t04 — palier 1 · classe A · le piège de l’unité ─────────────────────
  {
    id: 'ch02-sf6-t04-buzzer-et-resistance',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'buzzer-d-alarme-et-sa-resistance',
    enonce:
      'Le buzzer d’une petite alarme et une résistance sont branchés en série sur une pile de '
      + '{{donnee:ug}}. Le voltmètre aux bornes du buzzer affiche {{donnee:ub}}. Que vaut la '
      + 'tension aux bornes de la résistance ? Donne ta réponse avec son unité.',
    donnees: {
      ug: { valeur: [24, 5], unite: 'V' },
      ub: { valeur: [1950, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'ur', expr: '@ug − @ub', unite: 'V' }],
      reponse: 'ur',
    },
    reponse: { valeur: [57, 20], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: situationUnite(['V', 'mV']),
  },

  // ── t05 — palier 2 · classe A · le support devient un schéma ────────────
  {
    id: 'ch02-sf6-t05-moteur-et-lampe-sur-schema',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'schema-circuit',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'treuil-de-maquette-et-sa-lampe',
    enonce:
      'Le treuil d’une maquette est entraîné par le moteur M ; la lampe L1 signale qu’il tourne. '
      + 'La pile délivre {{donnee:ug}} et le voltmètre aux bornes du moteur affiche {{donnee:um}}. '
      + 'Que vaut la tension aux bornes de L1 ? Donne ta réponse avec son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_LAMPE_ET_MOTEUR, titre: 'Le treuil de la maquette et sa lampe' },
    donnees: {
      ug: { valeur: [5, 1], unite: 'V' },
      um: { valeur: [3250, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'ul', expr: '@ug − @um', unite: 'V' }],
      reponse: 'ul',
    },
    reponse: { valeur: [7, 4], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: situationUnite(['V', 'mV']),
  },

  // ── t06 — palier 3 · classe A · PRÉDICTION de la paire 3 ───────────────
  //
  // `dimensionVariee: 'sens-du-changement'` : les trois autres prédictions de ce
  // fichier partent du générateur et retranchent ; celle-ci part des récepteurs
  // et remonte à l’afficheur de l’alimentation. C’est le seul de ses quatre
  // aspects qui change — le support reste une situation décrite, le mode de
  // réponse reste une saisie valeur + unité, la grandeur reste une tension —, et
  // c’est ce qui rend l’étiquette exacte plutôt que commode. L’en-tête dit
  // pourquoi les deux dimensions les plus naturelles étaient interdites ici.
  //
  // Ce que cet item NE fait PAS, et qu’une rédaction antérieure lui prêtait. Elle
  // écrivait que « le décor reprend celui de `t02` » et que « l’élève qui prédit
  // ici 2 × 2,4 V est celui que la paire cherche ». Les deux sont faux. Le décor
  // ne se reprend pas — `t02` est une phrase de camarade sur trois dipôles, ici
  // ce sont deux lampes sur une alimentation masquée, et les deux
  // `contexteDeSurface` diffèrent. Surtout, le partage égal est INDÉFENDABLE
  // devant cet énoncé : les deux lectures y sont données, 2,4 V et 8,1 V, et
  // elles se contredisent avant que l’élève ait à répondre. Aucun élève ne peut
  // produire ici la prédiction que le commentaire lui prêtait.
  //
  // Ce que la paire mesure vraiment, c’est l’autre moitié de `t02` : la
  // CONSERVATION DU TOTAL. `t02` fait dire que la loi garantit la somme et rien
  // d’autre ; ici il faut s’en servir dans le sens qui remonte, alimentation
  // masquée. L’élève qui a coché juste et qui répond 8,1 V — « la source doit
  // au moins fournir la plus grosse » — ou qui donne la moyenne des deux est
  // celui que l’écart révèle. C’est ce que la paire peut montrer, et rien de plus.
  {
    id: 'ch02-sf6-t06-prediction-la-petite-et-la-grosse-lampe',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'lampe-de-poche-et-lampe-de-velo-en-serie',
    enonce:
      'Sur la paillasse, une petite lampe de poche et une grosse lampe de vélo — deux lampes '
      + 'visiblement différentes — sont montées en série sur une alimentation réglable dont '
      + 'l’afficheur est masqué. Le voltmètre aux bornes de la petite indique {{donnee:up}} ; '
      + 'celui aux bornes de la grosse indique {{donnee:ugrosse}}. Que va-t-on lire sur '
      + 'l’afficheur de l’alimentation quand on le découvrira ? Donne ta réponse avec son unité.',
    donnees: {
      up: { valeur: [12, 5], unite: 'V' },
      ugrosse: { valeur: [81, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ug', expr: '@up + @ugrosse', unite: 'V' }],
      reponse: 'ug',
    },
    reponse: { valeur: [21, 2], unite: 'V', semantique: 'exacte' },
    piege: 'reponse-conforme-sans-adhesion',
    situation: paireAvec(
      'ch02-sf6-t02-restitution-six-volts-divises-par-trois',
      'ch02-sf6-t06-prediction-la-petite-et-la-grosse-lampe',
      3,
    ),
    estFormatDiagnostique: true,
    motifFormatDiagnostique: MOTIF_PAIRE('ch02-sf6-t02-restitution-six-volts-divises-par-trois'),
  },

  // ── t07 — palier 2 · classe A · la loi lue dans l’autre sens ────────────
  {
    id: 'ch02-sf6-t07-quelle-alimentation-choisir',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'panneau-de-commande-a-trois-dipoles',
    enonce:
      'Un panneau de commande comporte, en série, deux lampes de signalisation et une résistance. '
      + 'Il faut {{donnee:u1}} aux bornes de la première lampe, {{donnee:u2}} aux bornes de la '
      + 'seconde et {{donnee:ur}} aux bornes de la résistance. Quelle tension l’alimentation '
      + 'doit-elle délivrer ? Donne ta réponse avec son unité.',
    donnees: {
      u1: { valeur: [23, 20], unite: 'V' },
      u2: { valeur: [47, 20], unite: 'V' },
      ur: { valeur: [3, 4], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ug', expr: '@u1 + @u2 + @ur', unite: 'V' }],
      reponse: 'ug',
    },
    reponse: { valeur: [17, 4], unite: 'V', semantique: 'exacte' },
  },

  // ── t08 — palier 3 · classe A · le partage égal, là où il est vrai ─────
  //
  // Six ampoules IDENTIQUES : c’est le seul cas où diviser est licite, et
  // l’item existe pour que le cours ne soit pas lu comme « diviser est toujours
  // faux ». `dimensionVariee: 'grandeur-en-jeu'` — on ne cherche plus une
  // tension manquante mais la part d’un dipôle dans un total. Aucun piège n’est
  // déclaré : cet item ne place l’élève devant aucune conception du catalogue,
  // il l’empêche seulement d’en fabriquer une.
  {
    id: 'ch02-sf6-t08-six-ampoules-identiques',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'guirlande-de-six-ampoules-identiques',
    enonce:
      'Une guirlande de six ampoules IDENTIQUES, montées en série, est branchée sur un bloc qui '
      + 'délivre {{donnee:ug}}. Que vaut la tension aux bornes d’UNE ampoule ? Donne ta réponse '
      + 'avec son unité.',
    donnees: {
      ug: { valeur: [93, 5], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u1', expr: '@ug ÷ 6', unite: 'V' }],
      reponse: 'u1',
    },
    reponse: { valeur: [31, 10], unite: 'V', semantique: 'exacte' },
  },

  // ── t09 — palier 4 · classe A · le piège de l’unité, palier non étiqueté ─
  {
    id: 'ch02-sf6-t09-trois-dipoles-deux-unites',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'banc-d-essai-lampe-moteur-resistance',
    enonce:
      'Sur un banc d’essai, une lampe, un moteur et une résistance sont montés en série sur une '
      + 'pile. Les trois voltmètres indiquent {{donnee:ul}} aux bornes de la lampe, {{donnee:um}} '
      + 'aux bornes du moteur et {{donnee:ur}} aux bornes de la résistance. Quelle tension la pile '
      + 'délivre-t-elle ? Donne ta réponse avec son unité.',
    donnees: {
      ul: { valeur: [1250, 1], unite: 'mV' },
      um: { valeur: [103, 20], unite: 'V' },
      ur: { valeur: [850, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'ug', expr: '@ul + @um + @ur', unite: 'V' }],
      reponse: 'ug',
    },
    reponse: { valeur: [29, 4], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: situationUnite(['mV', 'V']),
  },

  // ── t10 — palier 4 · classe A · cinq dipôles, dont un qui vaut zéro ─────
  //
  // Le circuit le plus fourni du fichier, servi au palier non étiqueté : cinq
  // dipôles, quatre tensions données dont une nulle, et rien qui annonce ce
  // qu’il faut reconnaître.
  {
    id: 'ch02-sf6-t10-cinq-dipoles-sur-le-schema',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'tableau-de-bord-de-maquette-a-cinq-dipoles',
    enonce:
      'Ce circuit comporte une pile, un interrupteur fermé K, deux lampes L1 et L2 et une '
      + 'résistance R. La pile délivre {{donnee:ug}}. Les voltmètres indiquent {{donnee:u1}} aux '
      + 'bornes de L1, {{donnee:ur}} aux bornes de R et {{donnee:uk}} aux bornes de K. Que vaut la '
      + 'tension aux bornes de L2 ? Donne ta réponse avec son unité.',
    figure: { sorte: 'circuit', circuit: CIRCUIT_CINQ_DIPOLES, titre: 'Le tableau de bord de la maquette' },
    donnees: {
      ug: { valeur: [42, 5], unite: 'V' },
      u1: { valeur: [41, 20], unite: 'V' },
      ur: { valeur: [29, 20], unite: 'V' },
      uk: { valeur: [0, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'u2', expr: '@ug − @u1 − @ur − @uk', unite: 'V' }],
      reponse: 'u2',
    },
    reponse: { valeur: [49, 10], unite: 'V', semantique: 'exacte' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════

/** Les 25 items du savoir-faire, dans l’ordre où le chapitre les présente.
 *  C’est cette liste que `validerItem` et `tools/verifier-contenu.mjs` lisent :
 *  `DECOUVERTE`, `COURS` et `METHODE` n’en font pas partie et n’ont pas à en
 *  faire — ils ne portent ni classe de garantie, ni cercle, ni palier, et les
 *  compter fausserait tous les dénominateurs de la charte. */
export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);
