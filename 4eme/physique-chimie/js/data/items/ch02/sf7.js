// Chapitre 2, savoir-faire 7 — « Vérifier l’adaptation d’une lampe à un
// générateur ».
//
// Le savoir-faire le plus proche du réel du chapitre, et le seul des sept à ne
// porter AUCUN piège de conception : `savoir-faire.js` ne lui en déclare pas, et
// `diagnostic` en est dérivé — il vaut donc `absent`. Tout ce que le catalogue
// des pièges apporte ailleurs (condition de validité, format diagnostique,
// dispositif de re-confrontation, distracteur rattaché) est ici hors d’atteinte,
// et l’écrire quand même serait refusé au build. Ce fichier est donc le contraire
// d’un fichier appauvri : ce qu’un piège aurait porté, il faut le porter
// autrement, et cet en-tête dit comment.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   une situation, aucune règle énoncée
//   COURS        six blocs typés
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
// ── Les décomptes ─────────────────────────────────────────────────────────
//
//   Classes    A 18 · C 7 — 7 sur 25, soit 28 %, sous le tiers
//   Cercles    0 → 5 · 1 → 16 · 3 → 4
//   Paliers    1 → 7 · 2 → 4 · 3 → 6 · 4 → 8
//   Types      court 13 · lecture 3 · double-qcm 4 · prediction-engagee 1 ·
//              schema-circuit 4
//   Figures    2 tableaux · 1 graphique · 4 circuits
//
// Aucun item ne porte `piege`, `situation`, `dispositifServi`,
// `estFormatDiagnostique`, `distracteurs` ni `discriminationMaths` : les cinq
// premiers exigent un piège que ce savoir-faire ne déclare pas, le sixième un
// `prerequisMaths` qu’il ne déclare pas non plus (DISCRIMINATION_SANS_PREREQUIS).
//
// ── Pourquoi aucune réponse n’est « tolérante », et ce que ça supprime ─────
//
// Les 18 items de classe A rendent tous `semantique: 'exacte'`. Ce n’est pas un
// choix de facilité : il n’y a ici AUCUNE mesure. Une tension nominale est une
// inscription gravée sur un culot, la tension d’un générateur est un réglage, et
// tout le calcul se réduit à additionner, soustraire ou diviser des valeurs
// déclarées. Rien n’est lu sur une graduation, donc rien n’a de demi-graduation,
// donc aucune fenêtre n’a de largeur à justifier.
//
// Conséquence directe : pas un seul `modelesErrones`, pas un seul distracteur
// quantitatif. La règle du projet — « tout distracteur quantitatif est produit
// par un modèle erroné exécutable » — n’est pas contournée ici, elle est SANS
// OBJET, et il valait mieux l’écrire que laisser croire à un oubli. Les modèles
// faux de ce savoir-faire ne sont pas numériques : ils sont des phrases (« la
// lampe prend ce qu’il lui faut », « en dessous, elle ne s’allume pas du tout »,
// « une pile plus forte éclaire mieux »), et ils vivent dans les justifications
// fausses des quatre doubles QCM, où l’élève les reconnaît au lieu de tomber
// dessus par un calcul.
//
// ── Le lexique a décidé de la forme des QCM ───────────────────────────────
//
// `js/lexique.js` est une liste blanche FERMÉE, et l’application refuse
// d’afficher un jeu de propositions dont une clé manque — plutôt que d’en
// afficher trois sur quatre, ce qui donnerait la réponse par élimination. Or le
// lexique, écrit avant ce chapitre, ne porte AUCUNE clé propre à l’adaptation :
// ni « elle brille faiblement », ni « elle grille », ni « elle brille
// normalement ». Les quatre doubles QCM — les quatre SEULS items à choix du
// fichier, aucun autre ne porte de `choixPossibles` — se posent donc en oui /
// non, sur les clés génériques `oui`, `non`, `on-ne-peut-pas-savoir`, et tout le
// contenu passe dans les JUSTIFICATIONS, qui sont du texte d’auteur et
// n’empruntent rien au lexique.
//
// C’est une vraie limite, pas une élégance : la première moitié d’un double QCM
// discrimine moins qu’elle ne le pourrait, et un élève a une chance sur trois de
// cocher juste sans rien savoir. Encore faut-il que ce soit une chance sur
// trois : les quatre ne peuvent pas répondre « non », sans quoi cocher « non »
// partout donnerait quatre premières moitiés justes sans rien savoir du tout.
// `t10` répond « on ne peut pas savoir », et ce n’est pas un rééquilibrage
// cosmétique — c’est la seule réponse vraie quand le générateur n’affiche que
// des ampères, et c’est la clé du lexique qui la dit. Ce que le format sauve
// pour les trois autres, c’est la seconde moitié : le juste/juste reste la
// seule réussite comptée. Le jour où trois libellés
// s’écrivent au lexique (« Elle brillera faiblement », « Elle brillera trop fort
// puis grillera », « Elle brillera normalement »), les quatre items gagnent leur
// première moitié sans changer d’une ligne leur seconde.
//
// Aucun `reponse.objetFormel` n’est écrit dans ce fichier, pour la même raison
// prise par l’autre bout : un objet formel exige que CHACUN de ses identifiants
// ait son libellé français, et ceux qu’il faudrait ici n’existent pas. Il n’y a
// donc aucun item de classe B — ce qui coûte quelque chose, et c’est dit plus
// bas.
//
// ── D’où viennent les justifications fausses ──────────────────────────────
//
// Toutes les justifications, justes et fausses, sont `provenance: 'locale'`.
// C’est le seul type honnête : `reformulee` exige un `deriveDe`, et la source
// qu’il citerait — les `raisonnements` d’un piège du catalogue, écrits en voix
// d’élève — n’existe pas pour ce savoir-faire, qui ne porte aucun piège. Citer
// le catalogue d’un piège voisin (« mesurer-en-coupant-le-circuit ») serait
// s’attribuer une provenance qu’on n’a pas, sur le point exact où un contenu
// scolaire se disqualifie le plus vite. Le corpus d’énoncés d’élèves n’existe pas
// encore ; quand il existera, ces quatorze phrases seront les premières à
// reprendre leur vraie source.
//
// ── Les circuits sont des graphes, et un seul générateur par figure ────────
//
// Quatre items montrent un montage. Chacun porte son GRAPHE — `schema.js` le
// dessine, `circuit.js` le juge —, aucun ne porte d’image ni de disposition.
// TROIS des quatre topologies ont exactement la clé canonique d’un cas-témoin de
// `circuit.js` — `pile[S(lampe|lampe)]`, `pile[P(lampe|lampe)]` et
// `pile[S(P(lampe|lampe)|interrupteur:ferme)]` —, donc trois graphes dont on
// sait déjà qu’ils se dessinent, qu’ils se ferment et qu’ils ne produisent aucun
// constat d’erreur.
//
// La quatrième — deux lampes ET un interrupteur dans la même boucle, soit
// `pile[S(interrupteur:ferme|lampe|lampe)]` — n’est PAS un cas-témoin : la liste
// de `circuit.js` porte « série canonique » (une lampe et un interrupteur) et
// « deux lampes en série » (sans interrupteur), pas leur composition. Elle a
// donc été passée pour elle-même sous `diagnostiquer` — zéro constat — et sous
// `memeCircuit`, qui la sépare bien des trois autres. L’écrire vaut mieux que de
// l’annexer à une liste où elle ne figure pas : la garantie n’a pas la même
// force, et c’est précisément le genre d’écart qu’un en-tête ne doit pas lisser.
//
// ⚠ Une contrainte a changé le contenu : **`formeCanonique` refuse un graphe à
// plusieurs générateurs** (`PLUSIEURS_GENERATEURS`), donc `schemaCircuit` aussi,
// donc `validerItem` refuse la figure (FIGURE_NON_ENGENDREE). « Que se passe-t-il
// si on met deux piles ? » — qui est la question la plus naturelle du
// savoir-faire — ne peut donc PAS être montrée. Elle est posée en toutes lettres
// (`e03`, `e05`, `p03`, `t02`, `t04`, et la méthode), où « bout à bout » remplace
// le dessin et où la tension de l’ensemble est une donnée calculée, jamais une
// figure. C’est le même mode de limitation que le double QCM sans figure du
// chapitre 1 : le format ne porte pas ce qu’on voudrait lui faire porter, et on
// l’écrit plutôt que de le contourner.
//
// ── Ce que le cercle 3 fait ici, et ce qu’il ne fait pas ──────────────────
//
// Quatre items sur 25 sont de cercle 3 — les quatre qui montrent un montage. Ce
// savoir-faire est déclaré de cercle 1 et n’a aucune obligation d’en porter ; il
// en porte parce que la topologie DÉCIDE ici d’une question de fond, et pas
// seulement du décor : une lampe ne reçoit la tension entière du générateur que
// si elle est SEULE dans la boucle. Comparer l’inscription du culot à la tension
// de la pile est juste sur `p01` et `t07` (dérivation), et faux sur `e08` et
// `p05` (série) — et rien d’autre que le schéma ne le dit. Les quatre items
// restent minoritaires : le cercle 3 est plafonné et non encouragé, et un
// savoir-faire qui n’a pas besoin du dessin n’a pas à s’en faire une spécialité.
//
// Les 21 autres raisonnent : ils comparent, ils prévoient, ils critiquent une
// situation. La maîtrise de ce savoir-faire ne peut donc jamais être déclarée
// sur des items de cercle 3 seuls, et ce n’est pas une précaution ajoutée après
// coup — c’est la composition même du fichier.
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ──────────────────────────────────
//
//   · **Le geste.** On ne branche rien, on ne visse aucune lampe, on ne règle
//     aucune alimentation. Tous les énoncés décrivent un montage DÉJÀ fait, ou
//     demandent de prévoir avant de faire. « Mettre en œuvre » est hors
//     périmètre, et le cours l’écrit à l’élève.
//   · **Le partage de la tension pour lui-même** — l’unicité en dérivation
//     (`ch02-sf5`) et l’additivité en série (`ch02-sf6`). Les six items qui s’en
//     servent (`e08`, `e10`, `p01`, `p05`, `t07`, `t09`) DONNENT la règle dans
//     l’énoncé et déclarent leur dépendance en `sfSollicites` : ce qu’on évalue
//     ici est la comparaison à la tension nominale, jamais le partage.
//   · **L’intensité.** Une lampe porte deux inscriptions, « 3,5 V » et
//     « 0,2 A » ; la seconde n’est jamais exploitée. Elle n’apparaît qu’une fois,
//     dans `t10`, où c’est précisément le fait qu’un ampère ne réponde pas à une
//     question de volts qui est en jeu.
//   · **La puissance, l’énergie, la durée de vie chiffrée d’un filament** :
//     P = U·I et E = P·t sont réservés à la troisième — la rubrique « ce qui
//     n’est pas demandé » du chapitre 2 le cite du BO — et rien ici ne calcule
//     une usure.
//   · **La résistance et la loi d’Ohm** : chapitre ultérieur. « Elle brille
//     faiblement » est un constat, jamais une justification par la résistance du
//     filament.
//   · **Le secteur.** Aucun énoncé ne branche quoi que ce soit sur une prise :
//     un contenu qui fait raisonner un élève de treize ans sur 230 V n’a pas sa
//     place dans un exercice d’adaptation, et les générateurs de ce fichier sont
//     tous des piles ou des alimentations de laboratoire.
//   · **La classe B, donc l’engendrement de la correction.** Sans objet formel
//     — voir plus haut, le lexique —, les sept items non calculables sont de
//     classe C, c’est-à-dire relus et scellés. C’est ce que ce fichier a de plus
//     faible, et c’est le premier endroit où il gagnerait à être repris.

// ════════════════════════════════════════════════════════════════════════════
// Les identifiants, écrits une fois
// ════════════════════════════════════════════════════════════════════════════

const SF = 'ch02-sf7-verifier-l-adaptation-d-une-lampe';
const CH = 'ch02-tension-electrique';

/** Les deux lois de partage, citées et jamais évaluées ici. */
const SF_UNICITE = 'ch02-sf5-loi-d-unicite-des-tensions';
const SF_ADDITIVITE = 'ch02-sf6-loi-d-additivite-des-tensions';

/** Les trois clés de QCM que le lexique sait dire, et les seules employées.
 *  Voir l’en-tête : le lexique ne porte aucun libellé propre à l’adaptation. */
const OUI_NON_SAIT_PAS = Object.freeze(['oui', 'non', 'on-ne-peut-pas-savoir']);

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — écrits une fois, cités là où ils servent
// ════════════════════════════════════════════════════════════════════════════

const dipole = (id, type, moins, plus, extra = {}) => Object.freeze({
  id, type, bornes: Object.freeze([moins, plus]), ...extra,
});

/** Deux lampes qui se suivent dans la boucle, commandées par un interrupteur.
 *  Ni l’une ni l’autre ne reçoit la tension de la pile : c’est tout l’objet de
 *  `e08`, et c’est le schéma — pas l’énoncé — qui le dit. */
const CIRCUIT_SERIE_COMMANDEE = Object.freeze({
  dipoles: Object.freeze([
    dipole('P', 'pile', 'a', 'b'),
    dipole('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
    dipole('L1', 'lampe', 'c', 'd'),
    dipole('L2', 'lampe', 'd', 'a'),
  ]),
});

/** Deux lampes dans deux branches distinctes, commandées ensemble. Chacune est
 *  aux bornes de la pile : la comparaison directe à l’inscription du culot est
 *  ici légitime, et elle ne l’était pas ci-dessus. */
const CIRCUIT_DERIVATION_COMMANDEE = Object.freeze({
  dipoles: Object.freeze([
    dipole('P', 'pile', 'a', 'b'),
    dipole('K', 'interrupteur', 'b', 'c', { etat: 'ferme' }),
    dipole('L1', 'lampe', 'c', 'd'),
    dipole('L2', 'lampe', 'c', 'd'),
    dipole('F', 'fil', 'd', 'a'),
  ]),
});

/** Deux lampes en série, sans interrupteur, et surtout NON identiques : le
 *  partage en deux parts égales ne s’applique pas, et `p05` donne la tension
 *  de la première pour que la seconde soit calculable. */
const CIRCUIT_SERIE_NUE = Object.freeze({
  dipoles: Object.freeze([
    dipole('P', 'pile', 'a', 'b'),
    dipole('L1', 'lampe', 'b', 'c'),
    dipole('L2', 'lampe', 'c', 'a'),
  ]),
});

/** Deux lampes en dérivation, sans rien d’autre : la forme la plus dépouillée
 *  du montage où l’inscription se compare directement à la pile. */
const CIRCUIT_DERIVATION_NUE = Object.freeze({
  dipoles: Object.freeze([
    dipole('P', 'pile', 'a', 'b'),
    dipole('L1', 'lampe', 'b', 'a'),
    dipole('L2', 'lampe', 'b', 'a'),
  ]),
});

/** Les six lampes de l’armoire, servies en tableau. La série est écrite UNE
 *  fois : `e04` la rend en figure et reprend la seule valeur dont il a besoin
 *  dans ses `donnees`, sous le même nombre. */
const TABLEAU_ARMOIRE = Object.freeze({
  titre: 'Tensions nominales des six lampes de l’armoire du laboratoire',
  x: Object.freeze({ titre: 'Lampe n°', min: 1, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Tension nominale (V)', min: 0, max: 14, pas: 2 }),
  points: Object.freeze([[1, 2.5], [2, 3.5], [3, 6], [4, 12], [5, 4], [6, 1.5]].map(Object.freeze)),
});

/** Le tiroir de rechange du test. Aucune de ses cinq lampes ne reprend le
 *  couple (tension nominale, tension du générateur) d’un item d’entraînement. */
const TABLEAU_TIROIR = Object.freeze({
  titre: 'Tensions nominales des cinq lampes du tiroir de rechange',
  x: Object.freeze({ titre: 'Lampe n°', min: 1, max: 5, pas: 1 }),
  y: Object.freeze({ titre: 'Tension nominale (V)', min: 0, max: 26, pas: 2 }),
  points: Object.freeze([[1, 1.5], [2, 3], [3, 4], [4, 6], [5, 24]].map(Object.freeze)),
});

/** La tension d’un empilement de piles bâtons, en fonction de leur nombre. Une
 *  droite, tracée : c’est le seul graphique du fichier, et il sert à LIRE un
 *  nombre de piles, pas une tension — la réponse de `p04` est donc sans unité,
 *  et aucune demi-graduation n’entre dans sa correction. */
const GRAPHIQUE_EMPILEMENT = Object.freeze({
  titre: 'Tension délivrée par des piles bâtons montées bout à bout',
  x: Object.freeze({ titre: 'Nombre de piles', min: 0, max: 6, pas: 1 }),
  y: Object.freeze({ titre: 'Tension délivrée (V)', min: 0, max: 9, pas: 1 }),
  points: Object.freeze([[0, 0], [1, 1.5], [2, 3], [3, 4.5], [4, 6], [5, 7.5]].map(Object.freeze)),
  relie: true,
});

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — une situation, aucune règle énoncée
// ════════════════════════════════════════════════════════════════════════════

export const DECOUVERTE = Object.freeze({
  titre: 'Deux lampes qui se ressemblent, une pile, et une qui ne survit pas',
  texte:
    'Dans le tiroir du laboratoire, deux lampes se ressemblent : même culot, même verre, '
    + 'même taille. On visse la première dans sa douille, on la branche aux bornes d’une pile '
    + 'plate, elle éclaire tranquillement. On la dévisse, on visse la seconde à sa place, sans '
    + 'rien changer d’autre. La seconde brille très fort pendant une seconde, puis s’éteint — '
    + 'et elle ne se rallumera plus jamais.',
  inscriptions: Object.freeze([
    'sur le culot de la première, en tout petit : 4,5 V',
    'sur le culot de la seconde, au même endroit : 1,5 V',
    'sur la pile plate : 4,5 V',
  ]),
  questions: Object.freeze([
    'Le montage n’a pas changé entre les deux essais : même pile, même douille, même fil. '
      + 'Qu’est-ce qui a changé, alors ?',
    'La seconde lampe était-elle défectueuse au départ ? Écris ta réponse avant de lire la suite.',
    'Si on avait fait l’inverse — la lampe marquée 4,5 V sur une pile bâton de 1,5 V —, '
      + 'penses-tu qu’elle aurait grillé elle aussi ?',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées tiennent debout à ce stade : « le nombre écrit sur '
    + 'la lampe dit ce qu’elle produit » et « le nombre écrit sur la lampe dit ce qu’elle supporte ». '
    + 'La première n’est pas idiote — on écrit bien 4,5 V sur la pile pour dire ce qu’elle donne, et '
    + 'rien sur le culot ne prévient que l’inscription ne se lit pas de la même façon. Le cours ne '
    + 'va pas se contenter de dire laquelle est la bonne : il va dire ce que chacune des deux '
    + 'PRÉDIT, et pourquoi une seule des deux explique que la troisième question ci-dessus n’ait pas '
    + 'la même réponse que la deuxième.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — six blocs typés
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'La tension nominale, et ce qui arrive quand on ne la respecte pas',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'Tension nominale',
      texte:
        'La **tension nominale** d’une lampe est la tension **pour laquelle elle est faite**. Elle '
        + 'est écrite sur son culot ou sur sa douille, en volts : « 3,5 V », « 6 V », « 12 V ». Ce '
        + 'n’est **pas** ce que la lampe produit — une lampe ne produit rien — et ce n’est **pas** '
        + 'ce qu’elle réclame au générateur. C’est la tension sous laquelle son filament a été '
        + 'calculé pour briller normalement, sans se détruire.',
    },
    {
      type: 'propriete',
      titre: 'Les trois cas, et un seul est bon',
      texte:
        'On compare deux tensions : celle que la lampe **reçoit** et celle qui est **écrite** '
        + 'dessus.\n\n'
        + '· **reçue = nominale** : la lampe brille normalement, elle est **adaptée** ;\n'
        + '· **reçue plus petite que la nominale** : elle brille **faiblement**, et si l’écart est '
        + 'grand, elle ne s’allume pas du tout ;\n'
        + '· **reçue plus grande que la nominale** : elle brille **trop fort**, et son filament '
        + 'fond — elle **grille**, définitivement.',
    },
    {
      type: 'propriete',
      titre: 'La lampe ne choisit pas',
      texte:
        'Une idée très répandue, et fausse : « la lampe prend ce qu’il lui faut, la pile s’adapte ». '
        + 'Le générateur **impose** sa tension ; la lampe la **subit**. Une lampe de 1,5 V posée aux '
        + 'bornes d’une pile de 4,5 V reçoit 4,5 V, pas 1,5 V — et c’est exactement pour cela '
        + 'qu’elle grille. Vérifier l’adaptation, c’est donc regarder **avant**, pas espérer que ça '
        + 'se règle tout seul.',
    },
    {
      type: 'propriete',
      titre: 'Elle ne reçoit la tension du générateur que si elle est seule dans la boucle',
      texte:
        'Comparer l’inscription du culot à ce qui est marqué sur la pile n’est juste que dans deux '
        + 'cas : la lampe est **seule** dans le circuit, ou elle est **en dérivation**, c’est-à-dire '
        + 'seule dans sa branche. Si elle est **en série** avec un autre dipôle, elle n’en reçoit '
        + 'qu’une **part** : la tension du générateur se partage. Alors la comparaison ne se fait '
        + 'plus avec la pile, mais avec la part réellement reçue.\n\n'
        + 'Deux dipôles ne comptent pas dans ce partage : **les fils et un interrupteur fermé ne '
        + 'prennent aucune tension**. Une lampe qu’un interrupteur fermé sépare de la pile reçoit '
        + 'donc quand même la tension entière ; « en série avec un autre dipôle » veut dire en série '
        + 'avec une autre **lampe**, un moteur ou une résistance. Sans cette précision, on lirait '
        + 'sur un schéma qu’une lampe commandée par un interrupteur ne reçoit qu’une part — et ce '
        + 'serait faux.',
    },
    {
      type: 'remarque',
      titre: 'Trop peu n’abîme rien, trop détruit',
      texte:
        'Les deux erreurs ne coûtent pas la même chose, et c’est ce qu’il faut retenir pour agir. '
        + 'Une lampe **sous-alimentée** est décevante, mais **intacte** : on la rebranche ailleurs, '
        + 'elle refonctionne. Une lampe **survoltée** est perdue en une seconde, et aucune '
        + 'manipulation ne la récupère. Quand on hésite entre deux montages, on choisit donc celui '
        + 'qui reste **en dessous** — jamais celui qui dépasse « juste un peu ».',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne visseras aucune lampe et tu ne règleras aucune alimentation ici : **le geste '
        + 'expérimental s’apprend en salle, pas sur un écran**. Ce qu’on travaille, c’est ce qui '
        + 'vient avant et après — lire une inscription, prévoir ce qui va se passer, dire pourquoi '
        + 'un montage est impossible, critiquer une phrase. C’est aussi ce que l’épreuve du brevet '
        + 'évalue.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un exercice résolu, geste de contrôle compris
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Vérifier qu’une lampe est adaptée à son générateur',
  enonce:
    'Une lampe porte l’inscription « 3,5 V ». On veut l’allumer avec trois piles bâtons de 1,5 V '
    + 'montées bout à bout, la lampe étant seule dans le circuit. Cette lampe est-elle adaptée ? '
    + 'Si elle ne l’est pas, dis ce qui va se passer et ce que tu ferais à la place.',
  etapes: Object.freeze([
    {
      geste: 'Lis la tension nominale, sur la lampe.',
      redaction:
        'Sur le culot : **3,5 V**. C’est la tension pour laquelle elle est faite — pas ce qu’elle '
        + 'produit, pas ce qu’elle réclame.',
    },
    {
      geste: 'Calcule la tension du générateur.',
      redaction:
        'Trois piles bout à bout : 3 × 1,5 = **4,5 V**. C’est ce que l’ensemble impose au circuit.',
    },
    {
      geste: 'Vérifie que la lampe est bien seule dans la boucle.',
      redaction:
        'L’énoncé le dit : elle est seule. Elle reçoit donc la tension entière du générateur, '
        + '**4,5 V**. Si une autre lampe avait été en série avec elle, cette étape aurait tout '
        + 'changé — il aurait fallu chercher la part reçue, et non la tension du générateur.',
    },
    {
      geste: 'Compare les deux tensions — la nature d’abord, la valeur ensuite.',
      redaction:
        'Des volts d’un côté, des volts de l’autre : les deux nombres sont **comparables**. Et '
        + '4,5 V **est plus grand que** 3,5 V. L’écart vaut 4,5 − 3,5 = **1 V** de trop.',
    },
    {
      geste: 'Conclus, puis propose.',
      redaction:
        'La lampe **n’est pas adaptée** : elle reçoit 1 V de trop, elle brillera trop fort et son '
        + 'filament risque de fondre. À la place, j’enlève une pile : deux piles donnent 3 V, soit '
        + '0,5 V **en dessous** de la tension nominale. Elle brillera un peu moins fort, mais elle '
        + 'ne sera pas détruite.',
  }].map(Object.freeze)),
  controle:
    'Deux vérifications, dans cet ordre. **La nature** : est-ce que je compare bien deux tensions ? '
    + 'Des volts avec des volts, et non des volts avec des ampères ou avec un nombre de piles. '
    + '**La place de la lampe** : est-elle seule, ou en dérivation ? Si elle est en série avec un '
    + 'autre dipôle, la tension du générateur n’est PAS celle qu’elle reçoit, et toute la '
    + 'comparaison est à refaire sur la part.',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas le calcul de 3 × 1,5 : c’est de conclure « ça ira, ce '
    + 'n’est qu’un volt de plus ». Un volt de plus sur une lampe de 3,5 V, c’est près d’un tiers de '
    + 'sa tension nominale, et le filament ne négocie pas. La seconde faute est symétrique : croire '
    + 'que deux piles seulement « ne l’allumeront pas ». Elle s’allumera, plus faiblement, et elle '
    + 'survivra.',
});

// ════════════════════════════════════════════════════════════════════════════
// ENTRAÎNEMENT — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 — palier 1 · classe A · cercle 1 · l’écart, dans le sens du danger ──
  //
  // Le geste nu du savoir-faire : deux tensions, une soustraction, un signe. La
  // lampe est déclarée SEULE dans le circuit, et cette précision n’est pas du
  // décor — sans elle, la tension reçue ne serait pas celle de la pile, et
  // l’item n’aurait pas de réponse.
  {
    id: 'ch02-sf7-e01-lampe-de-poche-sur-pile-plate',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'lampe-de-poche-et-pile-plate',
    enonce:
      'Sur le culot d’une lampe on lit « {{donnee:unom}} ». On la branche seule aux bornes d’une '
      + 'pile plate qui délivre {{donnee:ugen}}. De combien la tension reçue par la lampe '
      + 'dépasse-t-elle sa tension nominale ? Donne l’écart avec son unité.',
    donnees: {
      unom: { valeur: [7, 2], unite: 'V' },
      ugen: { valeur: [9, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@ugen − @unom', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [1, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── e02 — palier 1 · classe C · cercle 0 · double QCM : elle ne grille pas ──
  //
  // Le cas SOUS la tension nominale, servi en premier et volontairement : le
  // réflexe qu’on installe est « je compare », pas « je crains ». Les trois
  // justifications fausses sont les trois modèles que la recherche et les copies
  // font remonter — la lampe qui se sert, le seuil d’allumage, l’indifférence.
  {
    id: 'ch02-sf7-e02-double-qcm-lampe-de-six-volts-sur-pile-plate',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'lampe-de-six-volts-et-pile-plate',
    enonce:
      'Une lampe porte l’inscription « 6 V ». On veut l’allumer avec une pile plate de 4,5 V, la '
      + 'lampe étant seule dans le circuit. Cette lampe est-elle adaptée à cette pile ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non',
      choixPossibles: OUI_NON_SAIT_PAS,
    },
    justifications: [
      {
        id: 'elle-recoit-moins-que-l-inscription',
        texte:
          'La pile impose 4,5 V, et il est écrit 6 V sur la lampe : elle reçoit moins que ce pour '
          + 'quoi elle est faite. Elle s’allumera, mais faiblement — elle ne sera pas détruite.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'la-lampe-prend-ce-qu-il-lui-faut',
        texte:
          'La lampe prend d’elle-même les 6 V dont elle a besoin : c’est la pile qui s’adapte à ce '
          + 'qu’on branche dessus.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'en-dessous-elle-ne-s-allume-pas-du-tout',
        texte:
          'En dessous de la tension écrite sur le culot, une lampe ne s’allume pas : il ne se '
          + 'passera strictement rien.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'toute-lampe-va-sur-toute-pile',
        texte:
          'Une lampe s’allume sur n’importe quelle pile ; le nombre écrit sur le culot dit la '
          + 'lumière qu’elle produit, pas la pile qu’il lui faut.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'df47b376e768e45b' },
  },

  // ── e03 — palier 1 · classe A · cercle 1 · combien de piles ────────────────
  //
  // La réponse est SANS UNITÉ, et c’est le point : un nombre de piles n’est pas
  // une tension. La chaîne le rend mécaniquement — des volts divisés par des
  // volts donnent une dimension nulle —, donc l’item refuserait de se valider si
  // l’auteur avait écrit « V » à l’arrivée.
  {
    id: 'ch02-sf7-e03-combien-de-piles-batons',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'piles-batons-bout-a-bout',
    enonce:
      'Une lampe porte l’inscription « {{donnee:unom}} ». On ne dispose que de piles bâtons '
      + 'délivrant chacune {{donnee:upile}}, que l’on peut monter bout à bout. Combien en faut-il '
      + 'pour que la lampe reçoive exactement sa tension nominale ?',
    donnees: {
      unom: { valeur: [9, 2], unite: 'V' },
      upile: { valeur: [3, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'nombre', expr: '@unom ÷ @upile', unite: 'SANS_UNITE' }],
      reponse: 'nombre',
    },
    reponse: { valeur: [3, 1], unite: 'SANS_UNITE', semantique: 'exacte' },
  },

  // ── e04 — palier 2 · classe A · cercle 1 · le support change ───────────────
  //
  // Palier 2, dimension variée : l’objet-support. La tension nominale n’est plus
  // donnée par une phrase, elle se lit dans un tableau où cinq autres lampes
  // sont là pour rien. La série est écrite une seule fois — `TABLEAU_ARMOIRE` —,
  // la figure la rend et `donnees` en reprend la seule valeur utilisée.
  {
    id: 'ch02-sf7-e04-armoire-du-laboratoire',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'armoire-a-lampes-du-laboratoire',
    enonce:
      'L’armoire du laboratoire contient six lampes, rangées par numéro ; le tableau donne la '
      + 'tension nominale de chacune. On branche la lampe n° 3 seule aux bornes d’un générateur '
      + 'réglé sur {{donnee:ugen}}. De combien la tension reçue dépasse-t-elle sa tension '
      + 'nominale ? Donne l’écart avec son unité.',
    figure: { sorte: 'tableau', donnees: TABLEAU_ARMOIRE },
    donnees: {
      unom: { valeur: [6, 1], unite: 'V' },
      ugen: { valeur: [9, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@ugen − @unom', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [3, 1], unite: 'V', semantique: 'exacte' },
  },

  // ── e05 — palier 2 · classe A · cercle 1 · la grandeur change ──────────────
  //
  // Même palier, autre dimension : ce n’est plus un écart qu’on demande, c’est
  // la tension du générateur elle-même. Le nombre de piles entre dans le calcul
  // comme une donnée SANS UNITÉ — un compte, pas une grandeur physique.
  {
    id: 'ch02-sf7-e05-trois-piles-bout-a-bout',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'porte-piles-a-trois-emplacements',
    enonce:
      'On place {{donnee:n}} piles bâtons dans un porte-piles, montées bout à bout ; chacune '
      + 'délivre {{donnee:upile}}. Quelle tension l’ensemble délivre-t-il ? Donne la valeur avec '
      + 'son unité.',
    donnees: {
      n: { valeur: [3, 1], unite: 'SANS_UNITE' },
      upile: { valeur: [3, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'total', expr: '@n × @upile', unite: 'V' }],
      reponse: 'total',
    },
    reponse: { valeur: [9, 2], unite: 'V', semantique: 'exacte' },
  },

  // ── e06 — palier 3 · classe C · cercle 0 · la prédiction engagée ───────────
  //
  // La prédiction est verrouillée avant le constat : sans engagement, il n’y a
  // pas de conflit, juste une information de plus. Aucun `calcul` ici — un item
  // qui porterait à la fois une chaîne et une réponse libre serait refusé
  // (ITEM_SCINDABLE_NON_SCINDE), et il aurait raison de l’être : « écris ce que
  // tu prévois » et « calcule l’écart » sont deux tâches.
  {
    id: 'ch02-sf7-e06-prediction-lampe-sur-pile-de-neuf-volts',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'prediction-engagee',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'pile-de-neuf-volts-a-pression',
    enonce:
      'On branche une lampe qui porte « 3,5 V » directement aux bornes d’une pile de 9 V, la lampe '
      + 'étant seule dans le circuit. Avant de lire la suite : écris ce que tu prévois — ce que va '
      + 'faire la lampe, et pourquoi. Ta prédiction sera verrouillée avant le résultat.',
    reponse: {
      libre: true,
      elementsAttendus: [
        '9 V est bien plus grand que les 3,5 V écrits sur le culot : la lampe reçoit beaucoup trop',
        'elle va briller très fort, très peu de temps, puis son filament va fondre',
        'la destruction est définitive : ce n’est pas la pile qui s’adapte, c’est la lampe qui subit',
      ],
      constat:
        'La lampe éclaire violemment pendant environ une seconde, puis s’éteint. Rebranchée sur une '
        + 'pile de 4,5 V, puis sur une pile de 1,5 V, elle reste éteinte : le filament est coupé.',
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '1a1f6f5808bf5470' },
  },

  // ── e07 — palier 1 · classe A · cercle 1 · le rituel de contrôle ───────────
  //
  // Pas un automatisme de calcul : le GESTE. Lire, lire, soustraire — et
  // constater qu’un écart NUL est ce qu’on cherche, ce qui est le seul cas où le
  // résultat du contrôle est zéro et où zéro est une bonne nouvelle. L’item est
  // exclu de la fenêtre des cinq séances, sinon il sature le cercle 1.
  {
    id: 'ch02-sf7-e07-rituel-l-ecart-avant-de-brancher',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'alimentation-de-laboratoire-reglee',
    enonce:
      'Le geste à faire avant tout branchement : lire la tension nominale sur la lampe, lire la '
      + 'tension du générateur, et faire la différence. La lampe porte « {{donnee:unom}} », '
      + 'l’alimentation est réglée sur {{donnee:ugen}}, et la lampe sera seule dans le circuit. '
      + 'Écris l’écart, avec son unité.',
    donnees: {
      unom: { valeur: [12, 1], unite: 'V' },
      ugen: { valeur: [12, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@ugen − @unom', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [0, 1], unite: 'V', semantique: 'exacte' },
    rituelDeControle: true,
  },

  // ── e08 — palier 4 · classe A · cercle 3 · le schéma dit ce que l’énoncé
  //    ne dit pas ─────────────────────────────────────────────────────────────
  //
  // Palier non étiqueté : rien n’annonce qu’il s’agit d’adaptation, et la
  // première tâche est de reconnaître de quoi il s’agit. Les deux lampes se
  // suivent dans la boucle : comparer « 2 V » à la tension de la pile serait
  // faux, et seul le graphe le dit. La règle de partage est DONNÉE dans
  // l’énoncé — on n’évalue pas l’additivité ici, on l’emprunte, et
  // `sfSollicites` l’inscrit.
  {
    id: 'ch02-sf7-e08-deux-lampes-identiques-en-serie',
    sfPrincipal: SF,
    sfSollicites: [SF_ADDITIVITE],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'deux-lampes-identiques-commandees-par-un-interrupteur',
    enonce:
      'Sur ce montage, les deux lampes sont identiques et portent chacune l’inscription « 2 V ». '
      + 'La pile délivre {{donnee:upile}}. Comme les deux lampes sont identiques et se suivent dans '
      + 'la boucle, elles se partagent la tension de la pile en deux parts égales. Quelle tension '
      + 'chacune reçoit-elle ? Donne la valeur avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_SERIE_COMMANDEE,
      titre: 'Deux lampes identiques dans la même boucle',
    },
    donnees: {
      upile: { valeur: [9, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'parLampe', expr: '@upile ÷ 2', unite: 'V' }],
      reponse: 'parLampe',
    },
    reponse: { valeur: [9, 4], unite: 'V', semantique: 'exacte' },
  },

  // ── e09 — palier 3 · classe C · cercle 1 · le sens du changement s’inverse ──
  //
  // Palier 3, dimension variée : le sens du changement. Jusqu’ici la lampe
  // recevait trop peu ; ici un élève AUGMENTE délibérément la tension pour mieux
  // éclairer, ce qui est le raisonnement de bon sens à défaire. Les trois
  // justifications fausses sont les trois façons de le tenir.
  {
    id: 'ch02-sf7-e09-double-qcm-remplacer-la-pile-par-une-plus-forte',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'velo-eclaire-trop-faiblement-au-gout-de-son-proprietaire',
    enonce:
      'Une lampe « 4,5 V » branchée seule sur une pile plate de 4,5 V brille normalement. Son '
      + 'propriétaire trouve qu’elle n’éclaire pas assez et remplace la pile plate par une pile de '
      + '9 V, sans rien changer d’autre. Ce remplacement est-il sans danger pour la lampe ? Puis '
      + 'choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non',
      choixPossibles: OUI_NON_SAIT_PAS,
    },
    justifications: [
      {
        id: 'le-double-de-l-inscription',
        texte:
          '9 V, c’est le double de ce qui est écrit sur la lampe. Le filament recevra deux fois la '
          + 'tension pour laquelle il est fait : il brillera très fort, puis il fondra.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'plus-de-tension-plus-de-lumiere',
        texte:
          'Une pile plus forte donne plus de lumière, c’est tout : la lampe éclairera simplement '
          + 'mieux, ce qui est exactement ce qu’il cherchait.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'la-lampe-ne-prendra-que-ses-quatre-volts-et-demi',
        texte:
          'La lampe ne prendra que les 4,5 V dont elle a besoin et laissera le reste dans la pile : '
          + 'il n’y a aucun risque, la pile durera seulement moins longtemps.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'le-danger-vient-de-la-duree',
        texte:
          'Le danger ne vient pas de la tension mais du temps : elle grillera seulement si on la '
          + 'laisse allumée trop longtemps.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'e35d04aaf238855f' },
  },

  // ── e10 — palier 4 · classe A · cercle 1 · la question retournée ───────────
  //
  // Non étiqueté, et la comparaison se fait à l’envers : ce n’est plus « cette
  // lampe convient-elle à ce générateur ? » mais « sur quoi régler le générateur
  // pour que ces lampes-là conviennent ? ». Même savoir-faire, sens de lecture
  // inverse — c’est ce qu’un palier non étiqueté doit contenir.
  {
    id: 'ch02-sf7-e10-guirlande-de-trois-lampes',
    sfPrincipal: SF,
    sfSollicites: [SF_ADDITIVITE],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'guirlande-de-decoration-a-trois-lampes',
    enonce:
      'Une guirlande porte {{donnee:n}} lampes identiques montées bout à bout, chacune marquée '
      + '« {{donnee:unom}} ». Elles se partagent la tension de l’alimentation en parts égales. Sur '
      + 'quelle tension faut-il régler l’alimentation pour que chacune reçoive exactement sa '
      + 'tension nominale ? Donne la valeur avec son unité.',
    donnees: {
      n: { valeur: [3, 1], unite: 'SANS_UNITE' },
      unom: { valeur: [4, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'reglage', expr: '@n × @unom', unite: 'V' }],
      reponse: 'reglage',
    },
    reponse: { valeur: [12, 1], unite: 'V', semantique: 'exacte' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 — palier 4 · classe A · cercle 3 · en dérivation, la comparaison
  //    directe est LÉGITIME ───────────────────────────────────────────────────
  //
  // Le pendant de `e08`, et il est indispensable : sans lui, l’élève retiendrait
  // « on ne compare jamais à la pile », qui est une règle fausse. Ici chaque
  // lampe est seule dans sa branche, et la comparaison directe est la bonne.
  // C’est le schéma, encore, qui fait la différence entre les deux items.
  //
  // ⚠ L’énoncé ne dit PAS « branchée directement aux bornes de la pile » : ce
  // serait contredit par le graphe, où l’interrupteur K est sur le chemin —
  // `relationTopologique(P, L1)` rend `INDEPENDANTS`, pas `DERIVATION`, et c’est
  // `t07` (sans interrupteur) qui rend `DERIVATION`. Ce qui rend la comparaison
  // légitime ici, c’est que K est FERMÉ et ne prend aucune tension ; l’énoncé le
  // donne, comme il donne les deux lois de partage, et `sfSollicites` inscrit
  // l’additivité qu’il emprunte pour cela.
  {
    id: 'ch02-sf7-p01-deux-lampes-en-derivation',
    sfPrincipal: SF,
    sfSollicites: [SF_UNICITE, SF_ADDITIVITE],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'deux-branches-commandees-par-un-seul-interrupteur',
    enonce:
      'Sur ce montage, les deux lampes ne sont pas dans la même boucle : chacune est seule dans sa '
      + 'branche. L’interrupteur est fermé, et un interrupteur fermé ne prend aucune tension : '
      + 'chacune des deux lampes reçoit donc la tension entière de la pile, soit {{donnee:upile}}. '
      + 'L1 porte l’inscription « 4,5 V », L2 porte « {{donnee:unom2}} ». De combien la tension '
      + 'reçue par L2 dépasse-t-elle sa tension nominale ? Donne l’écart avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_DERIVATION_COMMANDEE,
      titre: 'Deux lampes dans deux branches distinctes',
    },
    donnees: {
      upile: { valeur: [9, 2], unite: 'V' },
      unom2: { valeur: [4, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@upile − @unom2', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [1, 2], unite: 'V', semantique: 'exacte' },
  },

  // ── p02 — palier 4 · classe C · cercle 0 · critiquer une règle de bon sens ──
  //
  // La phrase à critiquer n’est pas absurde, et c’est ce qui la rend utile :
  // « prendre un peu plus fort » marche pour un pull, pour un budget, pour une
  // marge de sécurité. Elle échoue ici, et l’élève doit dire OÙ elle échoue, pas
  // seulement qu’elle échoue.
  {
    id: 'ch02-sf7-p02-critiquer-la-regle-du-un-peu-plus-fort',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'phrase-de-camarade-a-trancher',
    enonce:
      'Un camarade écrit : « pour être sûr qu’une lampe s’allume bien, il vaut mieux prendre une '
      + 'pile un peu plus forte que ce qui est marqué dessus. » Écris en deux ou trois phrases ce '
      + 'que cette règle a de juste, ce qu’elle a de faux, et ce qui arrive si on l’applique.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'ce qu’elle a de juste : une lampe sous-alimentée éclaire peu, donc on comprend l’envie de '
          + 'monter un peu',
        'ce qu’elle a de faux : les deux erreurs ne se valent pas — en dessous la lampe est '
          + 'décevante mais intacte, au-dessus elle est détruite et ne revient pas',
        'ce qui arrive : le filament reçoit plus que ce pour quoi il est fait, il brille trop fort '
          + 'puis fond ; la bonne règle est de rester en dessous quand on hésite',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '220d3e0dd71b2460' },
  },

  // ── p03 — palier 3 · classe A · cercle 1 · deux étapes, et le manque ───────
  //
  // Palier 3, dimension variée : la grandeur en jeu. La chaîne fait deux pas —
  // la tension de l’empilement, puis ce qui lui manque — et la question est
  // posée dans le sens du DÉFICIT, ce qu’aucun item précédent ne demandait.
  {
    id: 'ch02-sf7-p03-projecteur-de-vingt-quatre-volts',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'projecteur-de-scene-au-club-theatre',
    enonce:
      'Le projecteur du club théâtre porte une lampe marquée « {{donnee:unom}} ». On n’a sous la '
      + 'main que des piles plates de {{donnee:upile}}, et on en monte {{donnee:n}} bout à bout. De '
      + 'combien la tension obtenue est-elle INFÉRIEURE à la tension nominale de la lampe ? Donne '
      + 'le manque avec son unité.',
    donnees: {
      unom: { valeur: [24, 1], unite: 'V' },
      upile: { valeur: [9, 2], unite: 'V' },
      n: { valeur: [5, 1], unite: 'SANS_UNITE' },
    },
    calcul: {
      etapes: [
        { id: 'total', expr: '@n × @upile', unite: 'V' },
        { id: 'manque', expr: '@unom − #total', unite: 'V' },
      ],
      reponse: 'manque',
    },
    reponse: { valeur: [3, 2], unite: 'V', semantique: 'exacte' },
  },

  // ── p04 — palier 3 · classe A · cercle 1 · lire un nombre, pas une tension ──
  //
  // Palier 3, dimension variée : l’objet-support — le seul graphique du fichier.
  // Ce qu’on lit dessus est un NOMBRE DE PILES, en abscisse : la réponse est
  // sans unité, donc aucune demi-graduation de l’axe des ordonnées n’entre dans
  // sa correction, et la sémantique reste exacte. Une réponse tolérante aurait
  // ici tiré sa fenêtre de l’axe des volts pour juger un compte — une tolérance
  // qui n’aurait mesuré rien de ce qu’on demande.
  {
    id: 'ch02-sf7-p04-graphique-de-l-empilement',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'graphique-affiche-au-mur-du-laboratoire',
    enonce:
      'Le graphique affiché au mur du laboratoire donne la tension délivrée par des piles bâtons '
      + 'montées bout à bout, en fonction de leur nombre ; chaque pile délivre {{donnee:upile}}. '
      + 'Une lampe porte l’inscription « {{donnee:unom}} ». Combien faut-il de piles pour qu’elle '
      + 'reçoive exactement sa tension nominale ?',
    figure: { sorte: 'graphique', donnees: GRAPHIQUE_EMPILEMENT },
    donnees: {
      unom: { valeur: [6, 1], unite: 'V' },
      upile: { valeur: [3, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'nombre', expr: '@unom ÷ @upile', unite: 'SANS_UNITE' }],
      reponse: 'nombre',
    },
    reponse: { valeur: [4, 1], unite: 'SANS_UNITE', semantique: 'exacte' },
  },

  // ── p05 — palier 4 · classe A · cercle 3 · deux lampes qui ne sont PAS
  //    identiques ─────────────────────────────────────────────────────────────
  //
  // Le cas que `e08` ne pouvait pas porter : en série avec des lampes
  // différentes, le partage n’est pas en parts égales, et aucune règle de 4ᵉ ne
  // permet de le prévoir. L’énoncé donne donc la tension mesurée aux bornes de
  // la première — c’est la seule façon honnête de rendre la seconde calculable
  // sans convoquer la résistance, qui n’est pas au programme du chapitre.
  {
    id: 'ch02-sf7-p05-deux-lampes-differentes-en-serie',
    sfPrincipal: SF,
    sfSollicites: [SF_ADDITIVITE],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'deux-lampes-depareillees-dans-la-meme-boucle',
    enonce:
      'Sur ce montage, les deux lampes ne sont pas identiques : L1 porte « 2,5 V » et L2 porte '
      + '« {{donnee:unom2}} ». La pile délivre {{donnee:upile}}, et la tension de la pile se '
      + 'partage entre les deux lampes. On a mesuré {{donnee:u1}} aux bornes de L1. De combien la '
      + 'tension reçue par L2 est-elle INFÉRIEURE à sa tension nominale ? Donne le manque avec son '
      + 'unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_SERIE_NUE,
      titre: 'Deux lampes dépareillées dans la même boucle',
    },
    donnees: {
      upile: { valeur: [9, 2], unite: 'V' },
      u1: { valeur: [13, 5], unite: 'V' },
      unom2: { valeur: [2, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'recue', expr: '@upile − @u1', unite: 'V' },
        { id: 'manque', expr: '@unom2 − #recue', unite: 'V' },
      ],
      reponse: 'manque',
    },
    reponse: { valeur: [1, 10], unite: 'V', semantique: 'exacte' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun item du test ne reprend un item d’entraînement, valeurs comprises. La
// vérification n’est pas déclarative : le domaine ne compte qu’une poignée
// d’inscriptions de culot (1,5 · 2 · 2,5 · 3 · 3,5 · 4 · 4,5 · 6 · 12 · 24 V) et une
// poignée de générateurs, donc interdire à un nombre de reparaître serait
// interdire d’écrire dix items. Ce qui est garanti est plus fort et se lit :
// aucun COUPLE (tension nominale, tension du générateur) d’un item
// d’entraînement ou de problème ne reparaît ici. Les couples déjà servis sont
//
//   (3,5 ; 4,5) · (6 ; 4,5) · (4,5 ; 1,5) · (6 ; 9) · (3 × 1,5) · (3,5 ; 9) ·
//   (12 ; 12) · (2 ; 4,5) · (4,5 ; 9) · (3 × 4) · (4 ; 4,5) · (24 ; 5 × 4,5) ·
//   (6 ; 1,5) · (2 ; 4,5 − 2,6)
//
// et les dix ci-dessous en emploient dix autres — à une exception près, écrite
// parce qu’elle est voulue. `t08` reprend le couple (4 ; 4,5) de `p01`, et il le
// reprend PARCE QUE c’est ce couple-là : l’item demande de choisir entre 3 V et
// 4,5 V pour une lampe de 4 V, et l’écart de 0,5 V que `p01` faisait calculer
// est exactement ce qu’il faut peser ici. Décaler le nombre pour satisfaire la
// phrase ci-dessus abîmerait le seul item du fichier qui n’a pas de réponse
// arithmétique, et n’apprendrait rien à personne.
//
// `t07`, lui, reprenait (6 ; 4,5) de `e02` sans aucune raison de ce genre —
// même comparaison, même couple, deux formats différents —, et c’est lui qui a
// été changé : il porte maintenant (12 ; 9).

export const TEST = Object.freeze([

  // t01 — palier 1 · A · le geste nu, sur un autre couple
  {
    id: 'ch02-sf7-t01-lampe-de-deux-volts-et-demi',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'lampe-temoin-d-une-maquette',
    enonce:
      'La lampe témoin d’une maquette porte l’inscription « {{donnee:unom}} ». Elle est branchée '
      + 'seule aux bornes d’une pile plate qui délivre {{donnee:ugen}}. De combien la tension reçue '
      + 'dépasse-t-elle sa tension nominale ? Donne l’écart avec son unité.',
    donnees: {
      unom: { valeur: [5, 2], unite: 'V' },
      ugen: { valeur: [9, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@ugen − @unom', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [2, 1], unite: 'V', semantique: 'exacte' },
  },

  // t02 — palier 1 · A · le compte de piles, sur une lampe de 9 V
  {
    id: 'ch02-sf7-t02-combien-de-piles-pour-neuf-volts',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'boitier-de-piles-d-un-jouet',
    enonce:
      'Le boîtier d’un jouet reçoit des piles bâtons de {{donnee:upile}} montées bout à bout. La '
      + 'lampe du jouet porte l’inscription « {{donnee:unom}} ». Combien de piles faut-il pour '
      + 'qu’elle reçoive exactement sa tension nominale ?',
    donnees: {
      unom: { valeur: [9, 1], unite: 'V' },
      upile: { valeur: [3, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'nombre', expr: '@unom ÷ @upile', unite: 'SANS_UNITE' }],
      reponse: 'nombre',
    },
    reponse: { valeur: [6, 1], unite: 'SANS_UNITE', semantique: 'exacte' },
  },

  // t03 — palier 2 · A · objet-support : un autre tableau, un autre tiroir
  {
    id: 'ch02-sf7-t03-tiroir-de-rechange',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'lecture',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'tiroir-de-lampes-de-rechange',
    enonce:
      'Le tiroir de rechange contient cinq lampes, rangées par numéro ; le tableau donne la tension '
      + 'nominale de chacune. On branche la lampe n° 3 seule aux bornes d’un générateur réglé sur '
      + '{{donnee:ugen}}. De combien la tension reçue dépasse-t-elle sa tension nominale ? Donne '
      + 'l’écart avec son unité.',
    figure: { sorte: 'tableau', donnees: TABLEAU_TIROIR },
    donnees: {
      unom: { valeur: [4, 1], unite: 'V' },
      ugen: { valeur: [10, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@ugen − @unom', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [6, 1], unite: 'V', semantique: 'exacte' },
  },

  // t04 — palier 2 · A · grandeur-en-jeu : la tension de l’ensemble
  {
    id: 'ch02-sf7-t04-quatre-piles-dans-la-lampe-frontale',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'lampe-frontale-a-quatre-piles',
    enonce:
      'Une lampe frontale reçoit {{donnee:n}} piles bâtons montées bout à bout, chacune délivrant '
      + '{{donnee:upile}}. Quelle tension l’ensemble délivre-t-il ? Donne la valeur avec son unité.',
    donnees: {
      n: { valeur: [4, 1], unite: 'SANS_UNITE' },
      upile: { valeur: [3, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'total', expr: '@n × @upile', unite: 'V' }],
      reponse: 'total',
    },
    reponse: { valeur: [6, 1], unite: 'V', semantique: 'exacte' },
  },

  // t05 — palier 3 · C · mode-de-reponse : l’asymétrie, dans l’autre sens
  //
  // L’élève de l’énoncé craint la destruction là où il n’y en a pas. C’est
  // l’exacte symétrique de `e09`, où il ne la craignait pas là où elle était :
  // les deux ensemble mesurent si l’asymétrie « trop peu n’abîme rien, trop
  // détruit » est installée, ou si l’élève a seulement retenu « attention aux
  // lampes ».
  {
    id: 'ch02-sf7-t05-double-qcm-va-t-elle-griller',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'lampe-de-douze-volts-trouvee-dans-une-boite',
    enonce:
      'Une lampe qui porte « 12 V » est branchée seule aux bornes d’une pile plate de 4,5 V. Un '
      + 'élève refuse de fermer l’interrupteur : il est sûr qu’elle va griller. A-t-il raison de le '
      + 'craindre ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non',
      choixPossibles: OUI_NON_SAIT_PAS,
    },
    justifications: [
      {
        id: 'trop-peu-n-abime-pas',
        texte:
          '4,5 V est bien moins que les 12 V écrits sur la lampe : elle reçoit trop peu. Elle '
          + 'brillera très faiblement, voire pas du tout — mais on ne détruit pas une lampe en lui '
          + 'donnant moins que sa tension nominale.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'toute-lampe-mal-appariee-grille',
        texte:
          'Dès qu’une lampe n’est pas branchée sur la pile prévue pour elle, elle grille : c’est '
          + 'pour ça qu’on écrit un nombre sur le culot.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'le-plus-grand-nombre-l-emporte',
        texte:
          '12 est plus grand que 4,5 : c’est donc 12 V qui traversent la lampe, et elle ne le '
          + 'supportera pas.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'la-pile-va-forcer-pour-l-allumer',
        texte:
          'La pile va devoir forcer pour allumer une lampe trop grosse pour elle : elle va chauffer '
          + 'et finir par brûler le filament.',
        juste: false,
        provenance: 'locale',
      },
    ],
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '66c0846021b069c3' },
  },

  // t06 — palier 3 · A · sens-du-changement : on passait dessous, on passe dessus
  {
    id: 'ch02-sf7-t06-de-la-pile-a-l-alimentation-reglable',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'sens-du-changement',
    contexteDeSurface: 'passage-de-la-pile-a-l-alimentation-reglable',
    enonce:
      'Une lampe « {{donnee:unom}} » était branchée seule sur une pile plate de 4,5 V : elle '
      + 'recevait moins que sa tension nominale et brillait faiblement. On la branche maintenant, '
      + 'toujours seule, sur une alimentation réglée sur {{donnee:ugen}}. De combien la tension '
      + 'reçue dépasse-t-elle maintenant sa tension nominale ? Donne l’écart avec son unité.',
    donnees: {
      unom: { valeur: [6, 1], unite: 'V' },
      ugen: { valeur: [15, 2], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@ugen − @unom', unite: 'V' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [3, 2], unite: 'V', semantique: 'exacte' },
  },

  // t07 — palier 4 · A · cercle 3 · en dérivation, et c’est la lampe qui MANQUE
  //
  // Le montage montre les deux issues à la fois : L2 dépasse sa tension
  // nominale, L1 est en dessous de la sienne. La question porte sur L1, donc sur
  // le manque — l’élève qui a retenu « en dérivation, ça grille » répondra sur
  // la mauvaise lampe.
  //
  // La pile est de 9 V et non de 4,5 V, et L1 porte 12 V et non 6 V : le couple
  // (6 ; 4,5) est celui de `e02`, et le servir ici aurait été le seul endroit du
  // fichier où le test reprend un couple de l’entraînement.
  {
    id: 'ch02-sf7-t07-deux-lampes-depareillees-en-derivation',
    sfPrincipal: SF,
    sfSollicites: [SF_UNICITE],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'deux-lampes-depareillees-dans-deux-branches',
    enonce:
      'Sur ce montage, chacune des deux lampes est branchée directement aux bornes de la pile : '
      + 'chacune reçoit donc la tension entière de la pile, soit {{donnee:upile}}. L1 porte '
      + 'l’inscription « {{donnee:unom1}} », L2 porte « 3 V ». De combien la tension reçue par L1 '
      + 'est-elle INFÉRIEURE à sa tension nominale ? Donne le manque avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_DERIVATION_NUE,
      titre: 'Deux lampes dépareillées, chacune aux bornes de la pile',
    },
    donnees: {
      upile: { valeur: [9, 1], unite: 'V' },
      unom1: { valeur: [12, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'manque', expr: '@unom1 − @upile', unite: 'V' }],
      reponse: 'manque',
    },
    reponse: { valeur: [3, 1], unite: 'V', semantique: 'exacte' },
  },

  // t08 — palier 4 · C · cercle 0 · aucun montage n’est exact : il faut choisir
  //
  // Le seul item du fichier où il n’existe PAS de bonne réponse arithmétique, et
  // c’est le plus proche du réel : dans une salle de classe, aucun empilement ne
  // tombe juste. Ce qui est évalué est le critère de décision — l’asymétrie du
  // cours —, pas le nombre choisi, et la correction accepte les deux nombres
  // pourvu que la raison soit la bonne.
  {
    id: 'ch02-sf7-t08-deux-piles-ou-trois',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'aucun-empilement-ne-tombe-juste',
    enonce:
      'On veut allumer une lampe qui porte « 4 V ». On ne dispose que de piles bâtons de 1,5 V, à '
      + 'monter bout à bout : deux donnent 3 V, trois donnent 4,5 V. Aucun nombre de piles ne donne '
      + 'exactement 4 V. Écris ce que tu choisirais, et pourquoi.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'les deux écarts sont comparés : 1 V en dessous avec deux piles, 0,5 V au-dessus avec trois',
        'les deux erreurs ne coûtent pas la même chose : en dessous la lampe brille faiblement et '
          + 'reste intacte, au-dessus elle risque d’être détruite définitivement',
        'la réponse « deux piles » est attendue, et le nombre importe moins que le critère : quand '
          + 'on hésite, on reste en dessous',
      ],
      reponsesAcceptees:
        'Une copie qui choisit trois piles est comptée juste si — et seulement si — elle reconnaît '
        + 'le dépassement et le justifie autrement (par exemple : il ne vaut que 0,5 V, la lampe '
        + 'sera peu sollicitée, on ne l’allume qu’un instant). Ce qui est refusé est la réponse qui '
        + 'ne compare rien, ou qui choisit « le plus proche » sans voir que le plus proche est du '
        + 'mauvais côté.',
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'a95c8632f7001e1e' },
  },

  // t09 — palier 4 · A · la question retournée une fois de plus : l’inscription
  //       est l’INCONNUE, et le montage est déclaré correct
  {
    id: 'ch02-sf7-t09-guirlande-de-cinq-lampes',
    sfPrincipal: SF,
    sfSollicites: [SF_ADDITIVITE],
    chapitre: CH,
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'guirlande-dont-l-inscription-est-effacee',
    enonce:
      'Une guirlande de {{donnee:n}} lampes identiques montées bout à bout est branchée sur une '
      + 'alimentation réglée sur {{donnee:ugen}}, et chacune brille exactement comme elle doit. '
      + 'Elles se partagent la tension de l’alimentation en parts égales, mais l’inscription des '
      + 'culots est effacée. Quelle est la tension nominale d’une lampe ? Donne la valeur avec son '
      + 'unité.',
    donnees: {
      n: { valeur: [5, 1], unite: 'SANS_UNITE' },
      ugen: { valeur: [20, 1], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'unom', expr: '@ugen ÷ @n', unite: 'V' }],
      reponse: 'unom',
    },
    reponse: { valeur: [4, 1], unite: 'V', semantique: 'exacte' },
  },

  // t10 — palier 1 · C · le rituel du test : la dimension avant la valeur
  //
  // Le seul endroit du fichier où l’intensité apparaît, et elle n’y est pas
  // exploitée : elle y est le PIÈGE de lecture. Deux nombres égaux, deux unités
  // différentes, et rien à conclure — c’est le verdict de dimension, rendu avant
  // celui de valeur, appliqué à la main par l’élève sur un cas où il décide de
  // tout.
  //
  // ⚠ La question porte sur l’ADAPTATION, et la réponse est « on ne peut pas
  // savoir ». Elle a d’abord été posée « peut-on conclure comme lui ? », réponse
  // « non » — et c’était une seconde lecture ouverte : « non, on ne peut pas
  // conclure » et « on ne peut pas savoir » sont la MÊME phrase, et la
  // justification juste (« il n’y a rien à comparer ») dit mot pour mot le
  // distracteur. L’élève qui avait le mieux compris était tiré vers la case
  // fausse. Posée sur l’adaptation, la clé du lexique dit exactement la
  // physique, et « non » redevient aussi injustifiable que « oui » : rien ici
  // n’autorise à affirmer que la lampe n’est PAS adaptée.
  //
  // Effet de bord voulu : c’est le seul double QCM du fichier qui ne répond pas
  // « non ». Voir l’en-tête, section « le lexique a décidé de la forme des QCM ».
  {
    id: 'ch02-sf7-t10-rituel-un-ampere-n-est-pas-un-volt',
    sfPrincipal: SF,
    chapitre: CH,
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 1,
    registre: 'macro',
    type: 'double-qcm',
    contexteDeSurface: 'afficheur-du-generateur-lu-de-travers',
    enonce:
      'Une lampe porte l’inscription « 3,5 V ». Sur le générateur, un afficheur indique « 3,5 A », '
      + 'et c’est la seule indication dont on dispose. Un élève en conclut que la lampe est adaptée '
      + 'à ce générateur. Avec ce qui est écrit ici, cette lampe est-elle adaptée ? Puis choisis la '
      + 'phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'on-ne-peut-pas-savoir',
      choixPossibles: OUI_NON_SAIT_PAS,
    },
    justifications: [
      {
        id: 'un-ampere-ne-repond-pas-a-une-question-de-volts',
        texte:
          '« A » est le symbole de l’ampère, qui sert à l’intensité, pas à la tension. Le '
          + 'générateur n’affiche donc pas ce qu’on cherche : tant qu’on n’a pas lu une tension, en '
          + 'volts, il n’y a rien à comparer.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'les-deux-nombres-sont-egaux',
        texte:
          'Les deux nombres sont les mêmes, 3,5 et 3,5 : la lampe reçoit donc exactement ce qui est '
          + 'écrit sur son culot.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'a-et-v-c-est-le-meme-afficheur',
        texte:
          'A et V sont deux façons d’écrire la même chose sur l’afficheur d’un générateur ; ce qui '
          + 'compte, c’est le nombre.',
        juste: false,
        provenance: 'locale',
      },
      {
        id: 'on-verifie-en-branchant',
        texte:
          'On ne peut pas savoir avant d’essayer : on branche, et si elle grille, c’est qu’elle '
          + 'n’était pas adaptée.',
        juste: false,
        provenance: 'locale',
      },
    ],
    rituelDeControle: true,
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: 'a6f3498ee84575b4' },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════

/** Les 25 items du savoir-faire, dans l’ordre où le chapitre les présente.
 *  C’est cette liste que `validerItem` et `tools/verifier-contenu.mjs` lisent :
 *  `DECOUVERTE`, `COURS` et `METHODE` n’en font pas partie et n’ont pas à en
 *  faire — ils ne portent ni classe de garantie, ni cercle, ni palier, et les
 *  compter fausserait tous les dénominateurs de la charte. */
export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);
