// Chapitre 2, savoir-faire 4 — « Lire une tension sur un appareil affiché, avec
// son calibre, et l’exprimer avec son unité ».
//
// Premier savoir-faire de CERCLE 3 réellement doté du projet. Le chapitre 1
// n’offrait qu’un item de cercle 3 sur 175, et le moteur signalait le plancher
// de cette bande comme intenable faute de vivier ; ce fichier en apporte seize.
// C’est aussi le premier fichier de contenu à faire tracer des circuits par
// `schema.js` et à faire juger ses graphes par `circuit.js`.
//
// ── Ce que ce fichier contient ─────────────────────────────────────────────
//
//   DECOUVERTE   trois relevés du même dipôle, aucune règle énoncée
//   COURS        sept blocs typés
//   METHODE      un exercice résolu, geste de contrôle compris
//   ENTRAINEMENT 10 items
//   PROBLEMES     5 items
//   TEST         10 items
//
// L’export par défaut est la concaténation des trois sections d’items — 25 —,
// parce que c’est cette liste-là que `validerItem` et `tools/verifier-contenu.mjs`
// lisent. `DECOUVERTE`, `COURS` et `METHODE` ne sont PAS des items : ils ne
// portent ni classe, ni cercle, ni palier.
//
// ── Répartition des classes de garantie ────────────────────────────────────
//
//   A  18   la chaîne est rejouée en rationnels exacts, avec dimensions
//   C   7   relu par un humain, scellé ; 7 sur 25, soit 28 %, sous le tiers
//
// Aucun A′ : il n’existe pas de table sourcée des tensions, et il n’en faut pas
// — une tension se LIT sur un appareil, elle ne se tabule pas. Aucune classe B :
// la classe B garantit l’accord entre l’énoncé et la correction par
// engendrement, et elle exige que l’objet formel de la figure SOIT celui de la
// réponse. Ici la réponse n’est jamais un graphe : c’est un nombre et une unité.
// Les quatre items qui portent un schéma de circuit sont donc de classe A, et
// c’est le bon rangement — voir la rubrique suivante.
//
// ── Les circuits sont des graphes, et ce qu’ils portent ici ────────────────
//
// Quatre items (`p01`, `p02`, `p05`, `t09`) portent une figure de sorte
// `circuit` : un graphe de dipôles, jamais une image, jamais une disposition.
// **Trois graphes pour quatre items** : `p02` et `p05` partagent
// `CIRCUIT_DEUX_LAMPES_EN_SERIE`, et ce partage est un CONSTAT, pas une
// économie. Une première rédaction donnait à `p05` un graphe distinct, où le
// voltmètre était aux bornes du premier dipôle et non du second ; `memeCircuit`
// le range sous la même clé — deux lampes en série sont indiscernables dans la
// forme canonique, et « l’autre lampe » n’est pas un autre circuit. Écrire deux
// constantes pour un seul graphe aurait fait croire à une variation qui n’en
// est pas une. C’est `memeCircuit` qui tranche, pas l’œil.
//
// `schema.js` les dessine, `circuit.js` les juge, et les trois graphes ont été
// passés à `diagnostiquer` : aucun ne rend le moindre constat, aucun n’est
// involontairement ouvert, aucun voltmètre n’y est monté à l’envers — la
// convention de bornes est `[borne « − » (COM), borne « + »]`, et le « + » d’un
// voltmètre est du côté du potentiel le plus haut, donc du côté de la borne
// « + » de la pile.
//
// **Et le `titre` d’une figure est servi à l’élève** : `schema.js` en fait un
// `<figcaption>`. Il nomme donc le montage, jamais la réponse à la question
// posée — une légende qui dit « le voltmètre est aux bornes de L2 » sous un
// énoncé qui demande de quelle lampe il s’agit rendrait la question gratuite.
//
// **Ce que le graphe porte ici, c’est OÙ le voltmètre est branché — pas ce
// qu’il affiche.** L’invariant 6 exige que la figure soit engendrée par le même
// objet formel que la correction, et l’identité de référence n’est contrôlée que
// sur la classe B, où la réponse EST le graphe. Ici la réponse est une tension,
// et elle sort de la chaîne de calcul ; le graphe dit de quel dipôle il s’agit,
// ce qui est exactement l’information sans laquelle l’énoncé serait ambigu. Un
// item qui ferait CORRIGER un montage attendrait un graphe en réponse et serait
// de classe B : c’est `ch02-sf3`, pas celui-ci.
//
// ── Le chiffre qui justifie ce chapitre, et ce qu’il ne dit pas ────────────
//
// 64 % des élèves branchent correctement un ampèremètre, 40 % seulement un
// voltmètre (CEDRE 2024, source primaire, citée par `charte.md`). Ce qui cède
// est le branchement EN DÉRIVATION, donc la lecture de la topologie. Ce
// savoir-faire-ci n’est PAS celui-là : il vient après, une fois l’appareil en
// place, et il porte sur le calibre, la lecture et l’unité. Le chiffre justifie
// le chapitre entier ; il ne mesure pas ce fichier, et l’écrire ici évite de lui
// faire dire ce qu’il ne dit pas.
//
// ── Cercle 3 : seize items, et pourquoi ce n’est pas un problème ───────────
//
//   cercle 3   16 items — lire une aiguille avec son calibre, lire un écran,
//              choisir un calibre, reconnaître un dépassement
//   cercle 1    8 items — écarts, croisement de deux lectures, critique d’une
//              valeur, tension restante
//   cercle 0    1 item  — « que manque-t-il à cette réponse ? »
//
// La règle de la charte est non négociable et elle est tenue à CHAQUE PALIER,
// pas seulement dans le total : **aucune maîtrise ne se déclare sur des items de
// cercle 3 seuls**, or un élève bloqué au palier 1 ne voit que les items de son
// palier. Un fichier dont les neuf items hors cercle 3 seraient tous au palier 4
// aurait un total flatteur et resterait inacquérable en pratique. D’où :
//
//   palier 1 — `e03` (cercle 0)
//   palier 2 — `e04`, `t04` (cercle 1)
//   palier 3 — `e07`, `t08` (cercle 1)
//   palier 4 — `e10`, `p03`, `p05`, `t10` (cercle 1)
//
// ── Le piège de l’unité, et ce qu’il ne teste QU’À MOITIÉ ici ──────────────
//
// `unite-absente-ou-fausse` est le seul piège que ce savoir-faire porte, et
// seize items le visent. Sa condition de validité est évaluée sur la
// `situation`, jamais déclarée : réponse dimensionnée, deux champs séparés,
// unité NON imposée, et au moins une unité de l’énoncé différente de l’unité
// attendue. Les seize la satisfont.
//
// **Mais il faut dire ce qui n’est pas couvert, et la première rédaction s’est
// trompée sur ce point précis.** Elle écrivait : « un élève qui recopie l’unité
// de l’énoncé se trompe d’un facteur mille ». C’est FAUX, et c’est l’inverse qui
// est vrai. Sur `e02`, le calibre vaut 300 mV, l’aiguille est au 84/100 de son
// échelle : le calcul rend 252, et l’élève qui colle « mV » écrit **252 mV**,
// c’est-à-dire la bonne tension. Le moteur rend `UNITE_NON_DEMANDEE`, `accepte:
// true`, et la `regle` du piège dit noir sur blanc que cet élève a **raison**.
// Le même raisonnement vaut sur les seize : le nombre sort du calibre, donc il
// sort déjà dans l’unité du calibre, et recopier cette unité-là est exact.
//
// Ce qui reste, donc, et ce n’est pas rien :
//
//   · **la branche « unité absente » est pleinement exercée.** « 252 » tout seul
//     rend `REPONSE_INCOMPLETE` sur le champ unité, et la `regle` le réfute
//     frontalement — une réponse sans unité ne dit AUCUNE valeur. C’est la
//     moitié du piège que les seize items visent réellement.
//   · **la branche « unité d’une autre nature » est structurellement
//     inatteignable ici.** Le volt et le millivolt ont la même dimension :
//     `DIMENSION_FAUSSE` ne peut pas se produire, et le `controle` du piège —
//     faire l’opération sur les unités seules — ne rend rien de neuf sur une
//     lecture d’appareil, où l’unité du résultat EST celle de la donnée. Le
//     `raisonnement` « unite-recopiee-de-l-enonce » le dit d’ailleurs
//     lui-même : le réflexe « ne tombe qu’en divisant ou multipliant deux
//     grandeurs différentes », ce que ce savoir-faire ne fait jamais.
//   · **l’erreur qui reste dangereuse — changer l’unité sans changer le
//     nombre — n’est réfutée par AUCUN champ du piège.** « 3,76 mV » pour
//     3,76 V n’est ni sans unité, ni d’une autre nature. C’est le bloc
//     `remarque` du COURS qui la réfute, et `t08` qui l’attaque de front ; le
//     catalogue, lui, est muet, et on ne s’attribue pas ce qu’il ne couvre pas.
//
// C’est donc un demi-test au sens strict, et c’est pourquoi **aucun item de ce
// fichier ne déclare `estFormatDiagnostique`** : le contexte que le piège impose
// à son format est « une grandeur composée (quotient ou produit) », qu’une
// tension lue sur un appareil n’est pas ; le format est d’ailleurs de la prose,
// qu’aucun programme ne vérifie, et se l’attribuer ici reviendrait à s’octroyer
// une couverture qu’on n’a pas. L’item qui la porte est `ch01-sf5-e04`, où la
// réponse est un quotient et où les grammes de l’énoncé ne sont d’aucune façon
// des g/L.
//
// **Et aucun item ne déclare `dispositifServi`**, pour la même raison et à la
// même rigueur. Une première rédaction en posait deux —
// `l-unite-calculee-avant-le-nombre` sur `e02`, `trois-copies-un-meme-calcul`
// sur `e09`. Ce sont des CONSTATS au sens de `srs.js` : une prédiction
// verrouillée, un résultat qui la contredit, un texte de conflit — l’un sur un
// trajet en km et une durée en minutes SANS AUCUN NOMBRE AFFICHÉ, l’autre sur
// trois copies de masse volumique rangées de la plus juste à la plus fausse.
// Ni `e02` ni `e09` ne joue quoi que ce soit de tout cela : ce sont deux
// lectures d’aiguille. Les déclarer inscrivait le dispositif dans
// `etat.dispositifsServis` sans qu’il ait été vu, ce qui **referme le cycle de
// variation du piège trop tôt** — exactement la panne que le commentaire de
// `apresReponsePiege` décrit. Les deux sont retirés.
//
// ── L’unité équivalente est ACCEPTÉE, et le contenu le dit à l’élève ───────
//
// `ch02-sf4` déclare `unite: 'libre'`. Un élève qui répond 4500 mV quand la
// correction attend 4,5 V a RAISON : le verdict rendu est `UNITE_NON_DEMANDEE`,
// accepté, signalé. Le bloc `remarque` du cours l’écrit noir sur blanc, et
// `e07` en fait la question elle-même — deux élèves, deux calibres, deux
// écritures, une seule tension. Refuser l’une des deux serait punir un élève qui
// a raison sur le savoir-faire même qu’on lui enseigne.
//
// ── Pourquoi aucune tolérance, et aucun distracteur quantitatif ────────────
//
//   · **Toutes les réponses chiffrées sont `semantique: 'exacte'`.** La
//     graduation atteinte par l’aiguille est DONNÉE dans l’énoncé (« l’aiguille
//     s’arrête sur 34 »), elle n’est pas à estimer à l’œil : il n’y a donc rien
//     à tolérer. Déclarer une fenêtre ici obligerait à écrire un modèle erroné
//     qui en sorte, c’est-à-dire à fabriquer une incertitude que l’énoncé
//     supprime. La tolérance de lecture existe et se calcule toute seule —
//     `schema.js:toleranceDeLecture`, une demi-graduation — mais elle est
//     dérivée d’un AXE de graphique, et un cadran de voltmètre n’en est pas un.
//   · **Aucun distracteur quantitatif**, donc aucun QCM de valeurs. Les deux
//     modèles erronés disponibles ici — « je lis la graduation comme si elle
//     était la tension » (21 au lieu de 4,2 V) et « je prends le calibre pour la
//     valeur » — ne sont portés par AUCUN piège du catalogue. Or un distracteur
//     numérique doit être rattaché à un piège (`DISTRACTEUR_SANS_PIEGE`), et le
//     rattacher à `unite-absente-ou-fausse` serait un diagnostic faux : l’erreur
//     y est de lecture, pas d’unité, et la `regle` du piège ne la contredit en
//     rien. Écrire le piège manquant est une décision de catalogue, pas de
//     contenu ; en attendant, on ne s’en attribue pas la couverture.
//
// ── Ce que le double QCM ne peut pas porter, et ce qu’on en a fait ─────────
//
// Les deux doubles QCM (`e07`, `t08`) ne déclarent AUCUN piège, et ce n’est pas
// un oubli : la condition de validité de `unite-absente-ou-fausse` exige
// `champUniteSepare === true`, c’est-à-dire une saisie libre en deux champs. Un
// double QCM n’en a pas — sa première moitié est un choix. Déclarer le piège
// dessus reviendrait à écrire `true` dans un champ dont la fausseté se voit à
// l’œil nu, sur le seul objet qui rend la condition contrôlable. Les
// justifications fausses, elles, continuent de citer les `raisonnements` du
// piège par leur `deriveDe` : c’est de là qu’elles viennent, et c’est
// vérifiable dans `js/data/pieges/contrat.js`.
//
// ── D’où viennent les justifications ───────────────────────────────────────
//
// Le corpus d’énoncés d’élèves n’existe pas. Les justifications fausses sont
// donc `reformulee` et citent leur source ; les justes sont `locale`. Aucune
// citation institutionnelle n’est inventée.
//
// ── CE QUE CE SAVOIR-FAIRE NE COUVRE PAS ───────────────────────────────────
//
//   · **Le geste.** On ne tourne aucun bouton, on ne pince aucune fiche
//     banane. « Mettre en œuvre » est hors périmètre, et le cours l’écrit à
//     l’élève. Les verbes servis sont « indiquer », « prévoir ce qu’affichera »,
//     « dire pourquoi cette lecture est impossible ».
//   · **Où brancher le voltmètre** — en dérivation, aux bornes du bon dipôle :
//     c’est `ch02-sf3`. Ici l’appareil est DÉJÀ en place, et les quatre schémas
//     ne servent qu’à dire de quel dipôle on parle.
//   · **Série ou dérivation** comme question posée à l’élève : c’est
//     `ch02-sf2`. `circuit.js:typeDeCircuit` sait répondre, et rien ici ne le
//     demande.
//   · **Les lois d’unicité et d’additivité** : `ch02-sf5` et `ch02-sf6`. Un seul
//     item s’appuie sur l’additivité — `p05`, qui la déclare en `sfSollicites`
//     et dont l’énoncé la rappelle — parce que la tension restante n’a pas
//     d’autre chemin ; elle n’y est jamais l’objet de la question.
//   · **La résistance, la loi d’Ohm, la puissance.** La puissance est hors
//     programme. Les deux premières vivent dans le **bloc optionnel A**
//     (`opt-a-loi-d-ohm` dans `js/data/savoir-faire.js`) — un bloc que le
//     programme laisse au choix de l’établissement et qu’un élève peut ne jamais
//     voir. Une première rédaction de ce commentaire les renvoyait au
//     « chapitre 8 », qui est celui du mouvement et de la vitesse : le renvoi
//     était faux, et il servait à justifier un schéma qui portait un dipôle
//     `resistance` alors qu’aucun item de ce fichier n’a besoin d’en montrer un.
//     Ce schéma a été retiré ; il ne reste ici que des piles, des lampes, des
//     interrupteurs et des voltmètres.
//   · **L’incertitude de mesure, les chiffres significatifs.** Rien de tout cela
//     n’est au programme du cycle 4. Le seul fait servi est qu’un calibre trop
//     grand donne une lecture JUSTE mais moins détaillée — et il est servi comme
//     un fait, jamais comme un calcul.
//   · **La discrimination mathématique.** `ch02-sf4` ne déclare aucun
//     `prerequisMaths` : la proportionnalité d’une échelle graduée est installée
//     depuis le cycle 3. Aucun item ne porte `discriminationMaths` — en poser un
//     serait refusé, et à juste titre : il n’y aurait rien à séparer.

// ════════════════════════════════════════════════════════════════════════════
// Les graphes de circuit — écrits une fois, cités là où ils servent
// ════════════════════════════════════════════════════════════════════════════
//
// Convention de `circuit.js` : `bornes = [borne « − » (COM), borne « + »]`. Pour
// un voltmètre, la borne « + » va du côté du potentiel le plus haut, c’est-à-dire
// du côté par lequel le courant ARRIVE dans le dipôle mesuré. Les trois graphes
// passent `diagnostiquer` sans un seul constat, et `formeCanonique` les accepte :
// ce sont des circuits série-parallèle, fermés, à générateur unique.

const dipole = (id, type, moins, plus, extra = {}) =>
  Object.freeze({ id, type, bornes: Object.freeze([moins, plus]), ...extra });

/** Pile, interrupteur fermé, une lampe ; le voltmètre en dérivation aux bornes
 *  de la lampe. Le circuit le plus simple sur lequel la question se pose. */
const CIRCUIT_UNE_LAMPE = Object.freeze({
  dipoles: Object.freeze([
    dipole('P', 'pile', 'a', 'b', { nom: 'P' }),
    dipole('L1', 'lampe', 'b', 'c', { nom: 'L1' }),
    dipole('K', 'interrupteur', 'c', 'a', { etat: 'ferme', nom: 'K' }),
    dipole('V', 'voltmetre', 'c', 'b', { nom: 'V' }),
  ]),
});

/** Deux lampes en SÉRIE, le voltmètre aux bornes de la seconde. Le graphe dit
 *  DE QUELLE lampe l’énoncé parle : sans lui, « la lampe L2 » ne désignerait
 *  rien. Servi par `p02` et par `p05` — et le partage n’est pas un raccourci :
 *  déplacer le voltmètre sur l’autre lampe rendrait la même clé canonique, deux
 *  lampes en série étant indiscernables pour `memeCircuit`. */
const CIRCUIT_DEUX_LAMPES_EN_SERIE = Object.freeze({
  dipoles: Object.freeze([
    dipole('P', 'pile', 'a', 'b', { nom: 'P' }),
    dipole('L1', 'lampe', 'b', 'c', { nom: 'L1' }),
    dipole('L2', 'lampe', 'c', 'd', { nom: 'L2' }),
    dipole('K', 'interrupteur', 'd', 'a', { etat: 'ferme', nom: 'K' }),
    dipole('V', 'voltmetre', 'd', 'c', { nom: 'V' }),
  ]),
});

/** Le voltmètre aux bornes de la PILE — le seul cas où l’appareil ne mesure pas
 *  un récepteur. `formeCanonique` le range en P(S(K, L1), V) : le voltmètre est
 *  bien en dérivation sur l’ensemble du reste du circuit. */
const CIRCUIT_AUX_BORNES_DE_LA_PILE = Object.freeze({
  dipoles: Object.freeze([
    dipole('P', 'pile', 'a', 'b', { nom: 'P' }),
    dipole('L1', 'lampe', 'b', 'c', { nom: 'L1' }),
    dipole('K', 'interrupteur', 'c', 'a', { etat: 'ferme', nom: 'K' }),
    dipole('V', 'voltmetre', 'a', 'b', { nom: 'V' }),
  ]),
});

// ════════════════════════════════════════════════════════════════════════════
// DÉCOUVERTE — une situation, aucune règle énoncée
// ════════════════════════════════════════════════════════════════════════════

export const DECOUVERTE = Object.freeze({
  titre: 'Trois appareils, une seule pile, trois nombres différents',
  texte:
    'Trois binômes mesurent la tension aux bornes de la MÊME pile bâton, chacun avec '
    + 'l’appareil de sa paillasse. Le premier a un voltmètre à aiguille : il l’a réglé sur '
    + 'le calibre 5 V, et l’aiguille s’arrête sur la graduation 15 d’une échelle qui va de '
    + '0 à 50. Le deuxième a un multimètre réglé sur le calibre 20 V : son écran affiche '
    + '1,50. Le troisième a le même multimètre réglé sur le calibre 2000 mV : son écran '
    + 'affiche 1500. Ils écrivent au tableau, dans l’ordre : 15, puis 1,50, puis 1500.',
  questions: Object.freeze([
    'Trois nombres différents pour une seule pile. Lequel des trois binômes s’est trompé ? '
      + 'Écris ta réponse avant de lire la suite.',
    'Le premier binôme a écrit 15. Regarde son appareil : où est-il allé chercher ce nombre, '
      + 'et qu’a-t-il oublié de faire avec ?',
    'Le deuxième a écrit 1,50 et le troisième 1500. Est-ce que ces deux-là se contredisent ?',
    'Si le professeur ne veut qu’UNE ligne au tableau, qu’y écrirais-tu — et combien de '
      + 'choses faut-il y mettre pour qu’elle veuille dire quelque chose ?',
  ]),
  cePourQuoiOnNeTranchePasEncore:
    'Aucune règle n’est donnée ici. Deux idées tiennent debout à ce stade, et elles ne se '
    + 'ressemblent pas. « Ils se contredisent, donc au moins deux se sont trompés » est une '
    + 'idée honnête : trois nombres différents, ça n’a pas l’air d’être la même mesure. '
    + '« Ils disent la même chose autrement » en est une autre. Le cours ne dira pas que la '
    + 'première est bête — deux nombres différents SONT souvent deux mesures différentes. Il '
    + 'dira ce qu’il faut regarder, sur l’appareil, pour savoir dans lequel des deux cas on '
    + 'est : le CALIBRE. Et il dira que sur les trois lignes du tableau, une seule est '
    + 'vraiment fausse.',
});

// ════════════════════════════════════════════════════════════════════════════
// COURS — sept blocs typés
// ════════════════════════════════════════════════════════════════════════════

export const COURS = Object.freeze({
  titre: 'Lire une tension avec son calibre',
  blocs: Object.freeze([
    {
      type: 'definition',
      titre: 'La tension et son unité',
      texte:
        'La **tension** entre deux points d’un circuit se note **U** et se mesure en '
        + '**volts**, de symbole **V**. Pour les petites tensions on emploie le **millivolt**, '
        + 'de symbole **mV** : **1 V = 1000 mV**. Ce sont deux écritures de la même grandeur, '
        + 'exactement comme le mètre et le centimètre pour une longueur.',
    },
    {
      type: 'definition',
      titre: 'Le calibre',
      texte:
        'Le **calibre** d’un voltmètre est la **plus grande tension qu’il peut mesurer** dans '
        + 'la position où on l’a réglé. Un appareil réglé sur le calibre 20 V mesure tout ce '
        + 'qui est en dessous de 20 V, et rien au-dessus. Le calibre n’est pas la tension '
        + 'mesurée : c’est la **règle graduée** avec laquelle on la mesure.',
    },
    {
      type: 'propriete',
      titre: 'Sur un appareil à aiguille, la graduation n’est pas la réponse',
      texte:
        'L’échelle d’un voltmètre à aiguille est graduée de 0 à un nombre qui ne change '
        + 'jamais — 50, 100, 30 selon l’appareil. Ce n’est **pas** une échelle en volts : '
        + 'c’est la même échelle pour tous les calibres. La tension se calcule :\n\n'
        + '**U = (graduation atteinte ÷ graduation totale) × calibre**\n\n'
        + 'Sur le calibre 5 V, avec une échelle de 0 à 50, l’aiguille sur 45 donne '
        + '(45 ÷ 50) × 5 = 4,5 V. Écrire « 45 V » revient à confondre la règle et la longueur '
        + 'qu’on mesure avec elle.',
    },
    {
      type: 'propriete',
      titre: 'Sur un appareil numérique, le calibre donne l’unité',
      texte:
        'Un multimètre affiche un nombre, et **c’est le calibre qui dit dans quelle unité**. '
        + 'Sur le calibre 20 V, « 4,50 » se lit 4,50 **V**. Sur le calibre 200 mV, « 148,6 » '
        + 'se lit 148,6 **mV**. Le même écran, le même nombre, deux tensions mille fois '
        + 'différentes : l’unité ne se devine pas sur l’écran, elle se lit sur le bouton.',
    },
    {
      type: 'remarque',
      titre: 'Quand l’écran n’affiche qu’un 1',
      texte:
        'Si la tension **dépasse le calibre**, l’appareil ne peut rien mesurer : l’écran '
        + 'n’affiche qu’un **1** tout seul, à gauche, et une aiguille se colle à la butée de '
        + 'droite. Ce n’est ni une panne, ni une pile morte : il faut **monter** de calibre. '
        + 'L’erreur inverse ne casse rien — un calibre trop grand donne une lecture '
        + '**juste**, mais avec moins de chiffres après la virgule, donc moins détaillée. '
        + 'Quand on ne sait pas, on **part du plus grand calibre et on descend**.',
    },
    {
      type: 'remarque',
      titre: 'Une valeur sans unité ne dit rien — et deux unités peuvent dire la même chose',
      texte:
        'Écrire « la tension vaut 4,5 » ne dit **aucune** valeur : 4,5 V et 4,5 mV sont deux '
        + 'tensions mille fois différentes, et rien dans le nombre ne les sépare. L’unité fait '
        + 'partie de la réponse. **Et il faut dire tout de suite ce qui n’est PAS une '
        + 'erreur** : si la question attend des volts et que tu réponds 4500 mV, tu as '
        + '**raison**. C’est la même tension écrite autrement, c’est **accepté**, et on te le '
        + 'signale seulement pour que tu saches quelle unité était demandée. Ce qui est faux, '
        + 'c’est de changer l’unité **sans changer le nombre** : 4,5 mV n’est pas 4,5 V.',
    },
    {
      type: 'remarque',
      titre: 'Ce que cette application ne te fera pas faire',
      texte:
        'Tu ne tourneras aucun bouton et tu ne brancheras aucune fiche ici : **le geste '
        + 'se fait en salle, pas sur un écran**. Ce qu’on travaille, c’est ce qui l’encadre — '
        + 'dire quel calibre choisir, prévoir ce que l’appareil affichera, lire ce qu’il '
        + 'affiche, et dire pourquoi une lecture est impossible. C’est aussi ce que l’écrit '
        + 'du brevet évalue.',
    },
  ].map(Object.freeze)),
});

// ════════════════════════════════════════════════════════════════════════════
// MÉTHODE — un exercice résolu, geste de contrôle compris
// ════════════════════════════════════════════════════════════════════════════

export const METHODE = Object.freeze({
  titre: 'Lire une tension sur un voltmètre à aiguille',
  enonce:
    'Un voltmètre à aiguille est branché aux bornes d’une lampe. Il est réglé sur le calibre '
    + '6 V, son échelle est graduée de 0 à 30, et l’aiguille s’arrête sur la graduation 19. '
    + 'Donne la tension aux bornes de la lampe, en millivolts.',
  etapes: Object.freeze([
    {
      geste: 'Note les trois nombres, et dis lequel est quoi.',
      redaction:
        'Graduation atteinte : 19. Graduation totale de l’échelle : 30. Calibre : 6 V. Les '
        + 'deux premiers se comptent en **rien du tout** — ce sont des repères sur un cadran ; '
        + 'seul le calibre porte des volts.',
    },
    {
      geste: 'Calcule la part de l’échelle parcourue.',
      redaction:
        '19 ÷ 30 : l’aiguille a parcouru un peu plus de la moitié de son échelle. Ce nombre '
        + 'n’a **pas d’unité**, et c’est normal : c’est une part, pas une tension.',
    },
    {
      geste: 'Calcule l’unité AVANT le nombre.',
      redaction:
        'Une part sans unité multipliée par un calibre en volts donne des **volts** — pas des '
        + 'graduations, qui n’en sont pas une. La question demande des **millivolts** : c’est '
        + 'la même grandeur, il faudra donc seulement changer d’écriture à la fin, pas de '
        + 'nature.',
    },
    {
      geste: 'Fais l’opération.',
      redaction: '(19 ÷ 30) × 6 = 114 ÷ 30 = 3,8. La tension vaut **3,8 V**.',
    },
    {
      geste: 'Écris-la dans l’unité demandée.',
      redaction:
        '1 V = 1000 mV, donc 3,8 V = **3800 mV**. Le nombre change parce que l’unité change : '
        + 'écrire « 3,8 mV » aurait été une tension mille fois plus petite.',
    },
  ].map(Object.freeze)),
  controle:
    'Deux vérifications, dans cet ordre. **La nature** : est-ce que ce que j’ai écrit est une '
    + 'tension ? Oui, des mV. **Le cadre** : ma valeur doit tomber **entre 0 et le calibre**. '
    + '3,8 V est bien entre 0 et 6 V — si j’avais trouvé 19 V ou 30 V, ce serait au-dessus du '
    + 'calibre, donc impossible, et je saurais avant même de chercher où que je me suis '
    + 'trompé. C’est le contrôle le plus rentable de ce chapitre : **le calibre est une borne, '
    + 'et une réponse qui la dépasse est fausse à coup sûr.**',
  erreurQuOnAttend:
    'La faute la plus fréquente n’est pas la division : c’est de recopier la graduation, '
    + '« 19 V ». Elle se voit immédiatement au contrôle ci-dessus — 19 est plus grand que le '
    + 'calibre 6 V, l’appareil n’aurait rien pu afficher. La seconde faute est d’écrire '
    + '« 3,8 mV » en croyant que changer d’unité, c’est changer le mot : c’est aussi changer '
    + 'le nombre.',
});

// ════════════════════════════════════════════════════════════════════════════
// ENTRAÎNEMENT — 10 items
// ════════════════════════════════════════════════════════════════════════════

export const ENTRAINEMENT = Object.freeze([

  // ── e01 — palier 1 · classe A · cercle 3 · la lecture fondatrice ────────
  //
  // Aucun piège : le calibre et la réponse sont tous deux en volts, et la
  // condition de validité de `unite-absente-ou-fausse` exige justement qu’une
  // unité de l’énoncé DIFFÈRE de l’unité attendue. La déclarer ici serait
  // fausse, et le prédicat la refuserait. Un savoir-faire n’est pas fait que de
  // pièges.
  {
    id: 'ch02-sf4-e01-aiguille-calibre-dix-volts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'voltmetre-a-aiguille-de-la-paillasse',
    enonce:
      'Un voltmètre à aiguille est réglé sur le calibre {{donnee:calibre}}. Son échelle est '
      + 'graduée de 0 à {{donnee:graduations}}, et l’aiguille s’arrête sur la graduation '
      + '{{donnee:aiguille}}. Quelle tension l’appareil indique-t-il ? Donne ta réponse avec '
      + 'son unité.',
    donnees: {
      aiguille: { valeur: [34, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [50, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [10, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [34, 5], unite: 'V', semantique: 'exacte' },
  },

  // ── e02 — palier 1 · classe A · cercle 3 · le calibre est en millivolts ──
  //
  // Le premier item du piège : l’énoncé ne porte que des mV, la réponse est
  // demandée en V, et la condition de validité est satisfaite.
  //
  // Ce que l’item met en défaut, et RIEN DE PLUS : l’élève qui écrit « 252 »
  // sans unité. Une première rédaction annonçait ici que « recopier l’unité de
  // l’énoncé donne une valeur mille fois trop petite » ; c’est faux — 252 mV EST
  // la bonne tension, le moteur rend `UNITE_NON_DEMANDEE`, `accepte: true`, et
  // la `regle` du piège dit que cet élève a raison. Le prétendre aurait fait
  // compter comme réfutée une erreur que le catalogue valide. Voir la rubrique
  // « Le piège de l’unité » de l’en-tête.
  {
    id: 'ch02-sf4-e02-calibre-trois-cents-millivolts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'photopile-eclairee-par-la-fenetre',
    enonce:
      'Aux bornes d’une petite photopile posée près de la fenêtre, un voltmètre à aiguille est '
      + 'réglé sur le calibre {{donnee:calibre}}. Son échelle est graduée de 0 à '
      + '{{donnee:graduations}}, et l’aiguille s’arrête sur la graduation {{donnee:aiguille}}. '
      + 'Le compte rendu demande cette tension **en volts**. Écris-la, avec son unité.',
    donnees: {
      aiguille: { valeur: [84, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [100, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [300, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [252, 1000], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'V',
      unitesPresentesDansLEnonce: ['mV'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── e03 — palier 1 · classe C · cercle 0 · l’item hors cercle 3 du palier 1 ──
  //
  // Sans lui, le palier 1 de ce savoir-faire serait entièrement de cercle 3, et
  // un élève qui n’en sort pas ne pourrait JAMAIS obtenir la réussite hors
  // cercle 3 que la charte exige pour déclarer la maîtrise. Le total du fichier
  // ne suffit pas : c’est le palier servi qui décide de ce qu’on voit.
  //
  // Classe C parce qu’il n’y a rien à rejouer : aucune chaîne, aucune requête —
  // la correction est une décision d’auteur, et elle est relue et scellée.
  {
    id: 'ch02-sf4-e03-que-manque-t-il-a-cette-reponse',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 0,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'ligne-recopiee-dans-un-compte-rendu',
    enonce:
      'Dans son compte rendu, un élève a écrit une seule ligne : « tension aux bornes de la '
      + 'lampe : 4,5 ». Il a bien lu son appareil et le nombre est le bon. Que manque-t-il à '
      + 'cette ligne pour qu’elle dise une tension ?',
    reponse: {
      libre: false,
      choix: 'l-unite',
      choixPossibles: [
        'l-unite',
        'le-calibre-utilise',
        'le-nom-de-l-appareil',
        'rien-de-plus-la-valeur-suffit',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '6facfbf387f10489' },
  },

  // ── e04 — palier 2 · classe A · cercle 1 · la grandeur en jeu change ────
  //
  // Palier 2 : ce n’est plus une lecture, c’est un ÉCART entre deux tensions.
  // `grandeur-en-jeu`, comme au chapitre 1 pour ce même piège — les paliers 2 et
  // 3 doivent déclarer deux dimensions distinctes, et le corpus a déjà fixé
  // celle du palier 3 à `mode-de-reponse`.
  {
    id: 'ch02-sf4-e04-lampe-de-six-volts-sous-alimentee',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'lampe-qui-eclaire-faiblement',
    enonce:
      'Une lampe porte l’indication {{donnee:nominale}} : c’est la tension pour laquelle elle '
      + 'a été fabriquée. Branché à ses bornes, le voltmètre indique {{donnee:mesuree}}, et la '
      + 'lampe éclaire faiblement. De combien la tension reçue est-elle inférieure à celle qui '
      + 'est marquée sur la lampe ? Donne ta réponse **en millivolts**.',
    donnees: {
      nominale: { valeur: [6, 1], unite: 'V' },
      mesuree: { valeur: [54, 10], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@nominale - @mesuree', unite: 'mV' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [600, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── e05 — palier 2 · classe A · cercle 3 · le sens de conversion s’inverse ──
  //
  // Le calibre est en volts et la réponse est demandée en millivolts : c’est
  // l’inverse de `e02`. Le nombre attendu est grand (19 000), ce qui rend la
  // faute d’unité visible sans qu’on ait besoin de la nommer.
  {
    id: 'ch02-sf4-e05-generateur-reglable-trente-volts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'generateur-reglable-du-labo',
    enonce:
      'Aux bornes d’un générateur réglable, le voltmètre à aiguille est sur le calibre '
      + '{{donnee:calibre}} et son échelle va de 0 à {{donnee:graduations}}. L’aiguille '
      + 's’arrête sur {{donnee:aiguille}}. Le tableau du compte rendu est en '
      + '**millivolts** : quelle valeur y écris-tu ? Donne-la avec son unité.',
    donnees: {
      aiguille: { valeur: [95, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [150, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [30, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'mV' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [19000, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── e06 — palier 2 · classe C · cercle 3 · le dépassement de calibre ────
  //
  // Le seul item du fichier où l’appareil n’affiche RIEN d’exploitable. La bonne
  // réponse n’est pas une valeur : c’est un geste à décider. Pas de piège — la
  // réponse n’est pas dimensionnée, et le prédicat de `unite-absente-ou-fausse`
  // exige qu’elle le soit, faute de quoi « sans unité » serait le bon choix et
  // le piège se déclencherait sur une réussite.
  {
    id: 'ch02-sf4-e06-l-ecran-n-affiche-qu-un-un',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'ecran-de-multimetre-avec-un-seul-chiffre',
    enonce:
      'Tu veux mesurer la tension aux bornes d’une pile plate. Le multimètre est réglé sur le '
      + 'calibre 2 V, il est correctement branché en dérivation, et son écran n’affiche qu’un '
      + '« 1 », tout seul, à gauche. Que faut-il faire ?',
    reponse: {
      libre: false,
      choix: 'il-faut-monter-d-un-calibre',
      choixPossibles: [
        'il-faut-monter-d-un-calibre',
        'il-faut-descendre-d-un-calibre',
        'il-faut-changer-la-pile',
        'il-faut-brancher-le-voltmetre-en-serie',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '40774bd095f589d9' },
  },

  // ── e07 — palier 3 · classe C · cercle 1 · double QCM, et sans piège ────
  //
  // Le mode de réponse change : on ne saisit plus, on choisit ET on justifie.
  //
  // AUCUN piège déclaré sur l’item, et c’est une contrainte du catalogue, pas
  // une négligence : la condition de validité de `unite-absente-ou-fausse` exige
  // `champUniteSepare === true`, c’est-à-dire une saisie libre en deux champs.
  // Un double QCM n’en a pas. Les trois justifications fausses viennent tout de
  // même des `raisonnements` du piège, et leur `deriveDe` le cite.
  //
  // LA TENSION A CHANGÉ, et il faut dire pourquoi. La première rédaction faisait
  // afficher 4520 à Basile **sur le calibre 2000 mV**. C’est impossible : 4520 mV
  // dépasse le calibre, l’écran n’aurait affiché qu’un « 1 ». Et ce n’était pas
  // une inexactitude de décor — c’est le contrôle que la MÉTHODE de ce même
  // savoir-faire enseigne (« ta valeur tombe entre zéro et le calibre ») et que
  // `t10` fait répéter en rituel. L’élève qui l’appliquait concluait « la lecture
  // de Basile est impossible, donc seule Alice a raison » — et il était compté
  // faux pour avoir appliqué correctement le geste du chapitre. La pile mesurée
  // vaut maintenant 1,52 V, ce que les deux calibres peuvent tous deux afficher.
  {
    id: 'ch02-sf4-e07-double-qcm-alice-et-basile',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'deux-eleves-deux-calibres',
    enonce:
      'Alice et Basile mesurent la tension aux bornes de la même pile bâton, l’un après '
      + 'l’autre, avec le même multimètre. Alice le règle sur le calibre 20 V : l’écran '
      + 'affiche 1,52. Basile le règle sur le calibre 2000 mV : l’écran affiche 1520. Chacun '
      + 'recopie ce qu’il voit avec l’unité de son calibre. Qui a raison ? Puis choisis la '
      + 'phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'les-deux-ont-raison',
      choixPossibles: [
        'seule-alice-a-raison',
        'seul-basile-a-raison',
        'les-deux-ont-raison',
        'aucun-des-deux',
      ],
    },
    justifications: [
      {
        id: 'meme-tension-deux-ecritures',
        texte:
          '1,52 V et 1520 mV sont la même tension écrite de deux façons, puisque 1 V vaut '
          + '1000 mV. Chacun a lu son écran dans l’unité de SON calibre, et c’est ce qu’il '
          + 'fallait faire.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'le-plus-grand-nombre-gagne',
        texte:
          'Basile a le plus grand nombre, donc il a mesuré la plus grande tension : c’est lui '
          + 'qui a raison, Alice a dû se tromper de bouton.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « unite-absente-ou-fausse », raisonnement « le-nombre-suffit » — '
          + 'js/data/pieges/contrat.js',
        piege: 'unite-absente-ou-fausse',
      },
      {
        id: 'le-cours-parlait-de-volts',
        texte:
          'Une tension se mesure en volts, c’est écrit dans le cours : seule Alice a répondu '
          + 'dans la bonne unité, donc seule Alice a raison.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « unite-absente-ou-fausse », raisonnement '
          + '« j-ai-repondu-dans-une-autre-unite » — js/data/pieges/contrat.js',
        piege: 'unite-absente-ou-fausse',
      },
      {
        id: 'deux-nombres-differents-deux-mesures',
        texte:
          'Deux nombres différents, ce sont deux mesures différentes : ils n’ont pas pu '
          + 'mesurer la même pile, donc aucun des deux ne peut être validé.',
        juste: false,
        provenance: 'reformulee',
        // Cette justification citait « unite-recopiee-de-l-enonce », et
        // l’attribution ne tenait pas : ce raisonnement-là parle de l’unité
        // qu’on colle à la fin, sa réponse ne dit rien de deux nombres qu’on
        // compare, et elle ne RÉFUTE donc pas l’élève qui les compare. C’est
        // « le-nombre-suffit » qui le réfute, et frontalement : un nombre nu ne
        // dit pas de quelle grandeur il est la mesure, donc 1,52 et 1520 ne se
        // contredisent pas tant qu’on n’a pas lu leurs unités. Deux
        // justifications de cet item citent le même raisonnement, et c’est
        // exact : elles en tirent deux conclusions différentes — « le plus grand
        // gagne » et « ils se contredisent ».
        deriveDe:
          'piège « unite-absente-ou-fausse », raisonnement « le-nombre-suffit » — '
          + 'js/data/pieges/contrat.js',
        piege: 'unite-absente-ou-fausse',
      },
    ],
    relu: { par: 'relecture-adverse', date: '2026-08-13', hash: '5e0aa83f50898c93' },
  },

  // ── e08 — palier 3 · classe A · cercle 3 · le mode de réponse change ────
  //
  // On ne demande plus la valeur exacte mais son ORDRE DE GRANDEUR, et l’unité
  // reste entièrement à produire. Les nombres sont choisis pour que la valeur
  // exacte SOIT une puissance de dix : la sémantique change, la correction ne
  // devient pas floue pour autant.
  {
    id: 'ch02-sf4-e08-ordre-de-grandeur-calibre-deux-cents-millivolts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'valeur-annoncee-au-tableau-avant-verification',
    enonce:
      'Avant de vérifier au calcul, la classe annonce au tableau l’ordre de grandeur de ce '
      + 'qu’elle mesure. Le voltmètre à aiguille est sur le calibre {{donnee:calibre}}, son '
      + 'échelle va de 0 à {{donnee:graduations}}, et l’aiguille est sur {{donnee:aiguille}}. '
      + 'Donne l’ORDRE DE GRANDEUR de cette tension **en volts**, avec son unité.',
    donnees: {
      aiguille: { valeur: [25, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [50, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [200, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [1, 10], unite: 'V', semantique: 'ordre-de-grandeur' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'V',
      unitesPresentesDansLEnonce: ['mV'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── e09 — palier 4 · classe A · cercle 3 · non étiqueté, deux gestes ────
  //
  // Rien ne dit à l’élève de quoi il s’agit. Il y a une lecture d’aiguille à
  // faire ET un changement d’unité, et l’ordre entre les deux n’est indiqué
  // nulle part. C’est l’item que le piège attend au palier non étiqueté.
  {
    id: 'ch02-sf4-e09-compte-rendu-en-millivolts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'seance-de-tp-sur-la-pile-bouton',
    enonce:
      'Aux bornes d’une pile bouton, le voltmètre est réglé sur le calibre {{donnee:calibre}} '
      + 'et son échelle est graduée de 0 à {{donnee:graduations}}. L’aiguille s’arrête sur '
      + '{{donnee:aiguille}}. La feuille de relevé porte une colonne « U (mV) ». Que faut-il y '
      + 'écrire ? Donne ta réponse avec son unité.',
    donnees: {
      aiguille: { valeur: [21, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [30, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [3, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'mV' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [2100, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── e10 — palier 4 · classe A · cercle 1 · croiser deux lectures ────────
  //
  // Deux appareils, deux calibres, deux écritures, et un écart réel entre les
  // deux relevés. La soustraction se fait entre des V et des mV : l’algèbre des
  // unités la mène en SI et rend le résultat dans l’unité déclarée, ce qui est
  // précisément le geste que le piège demande de faire à la main.
  //
  // Même correction que sur `e07`, et pour la même raison : la première
  // rédaction faisait afficher 4512 sur le calibre 2000 mV, une lecture que
  // l’appareil ne peut pas rendre — 4512 mV dépasse le calibre. Les deux relevés
  // valent maintenant 1,6 V et 1612 mV, tous deux sous leur calibre, et l’écart
  // de 12 mV est inchangé.
  {
    id: 'ch02-sf4-e10-deux-lectures-du-meme-dipole',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'deux-multimetres-compares-sur-la-meme-pile',
    enonce:
      'La même pile est mesurée deux fois de suite. Sur le calibre 20 V, le premier appareil '
      + 'affiche {{donnee:premiere}}. Sur le calibre 2000 mV, le second affiche '
      + '{{donnee:seconde}}. Les deux relevés ne sont pas tout à fait égaux. De combien '
      + 'diffèrent-ils ? Donne ta réponse **en millivolts**.',
    donnees: {
      premiere: { valeur: [16, 10], unite: 'V' },
      seconde: { valeur: [1612, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@seconde - @premiere', unite: 'mV' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [12, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V', 'mV'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// PROBLÈMES — 5 items
// ════════════════════════════════════════════════════════════════════════════

export const PROBLEMES = Object.freeze([

  // ── p01 — palier 4 · classe A · cercle 3 · le premier schéma engendré ───
  //
  // La figure est un GRAPHE, dessiné par `schema.js` à partir de lui seul :
  // aucune image, aucune disposition stockée. Ce qu’il porte, c’est de quel
  // dipôle on parle — sans lui, « aux bornes de la lampe » désignerait n’importe
  // quoi dans un circuit qui en compterait deux.
  {
    id: 'ch02-sf4-p01-schema-une-lampe-calibre-vingt-volts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'montage-pile-interrupteur-lampe',
    enonce:
      'Voici le montage réalisé. Le voltmètre V est réglé sur le calibre {{donnee:calibre}} et '
      + 'son échelle est graduée de 0 à {{donnee:graduations}} ; son aiguille s’arrête sur '
      + '{{donnee:aiguille}}. Quelle est la tension aux bornes de la lampe L1 ? Donne-la '
      + '**en millivolts**, avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_UNE_LAMPE,
      titre: 'Le voltmètre V, en dérivation aux bornes de la lampe L1',
    },
    donnees: {
      aiguille: { valeur: [21, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [100, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [20, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'mV' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [4200, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── p02 — palier 4 · classe A · cercle 3 · deux lampes, une seule mesurée ──
  //
  // Le schéma porte DEUX lampes en série et le voltmètre n’est aux bornes que de
  // la seconde. Le graphe dit lesquelles sont L1 et L2 : sans lui, « aux bornes
  // de la lampe L2 » ne désignerait rien.
  //
  // DEUX CORRECTIONS, et la première est la plus vilaine. L’énoncé demandait
  // « Quelle tension mesure-t-il, ET AUX BORNES DE QUELLE LAMPE ? » alors que la
  // correction ne porte qu’un nombre : la seconde moitié de la question n’avait
  // aucun champ de réponse, donc aucune façon d’être fausse. Un élève qui
  // répondait « 1,8 V aux bornes de L1 » était compté juste. Et la légende de la
  // figure — servie à l’élève en `<figcaption>` par `schema.js` — disait
  // « le voltmètre V est aux bornes de L2 », c’est-à-dire donnait la réponse à
  // la moitié qu’on ne corrigeait pas. La question est maintenant une seule
  // question, elle nomme la lampe, et la légende nomme le montage sans nommer
  // le dipôle mesuré.
  {
    id: 'ch02-sf4-p02-schema-deux-lampes-en-serie',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'guirlande-a-deux-lampes',
    enonce:
      'Voici le montage. Le voltmètre V est réglé sur le calibre {{donnee:calibre}}, son '
      + 'échelle va de 0 à {{donnee:graduations}}, et son aiguille s’arrête sur '
      + '{{donnee:aiguille}}. Quelle est la tension aux bornes de la lampe L2 ? '
      + 'Donne la valeur **en volts**, avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_DEUX_LAMPES_EN_SERIE,
      titre: 'Deux lampes L1 et L2 en série, avec le voltmètre V branché en dérivation',
    },
    donnees: {
      aiguille: { valeur: [45, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [50, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [2000, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [18, 10], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'V',
      unitesPresentesDansLEnonce: ['mV'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── p03 — palier 4 · classe C · cercle 1 · la moitié qui s’explique ─────
  //
  // Cet item et `p04` sont **le même relevé, scindé en deux**. « Dis pourquoi
  // cette valeur est impossible » et « donne la tension réelle » ne peuvent pas
  // cohabiter : un item qui porte à la fois une chaîne de calcul et une réponse
  // libre est refusé (ITEM_SCINDABLE_NON_SCINDE), et à juste titre — l’un se
  // vérifie mécaniquement, l’autre se relit, et on ne saurait plus lequel des
  // deux a échoué.
  {
    id: 'ch02-sf4-p03-pourquoi-trente-huit-volts-est-impossible',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'copie-a-corriger-trente-huit-volts',
    enonce:
      'Un compte rendu porte ceci : « voltmètre réglé sur le calibre 2 V ; échelle graduée de '
      + '0 à 50 ; aiguille sur 38 ; tension mesurée : 38 V ». Sans faire aucun calcul, dis en '
      + 'deux phrases pourquoi cette valeur ne peut pas être la bonne.',
    reponse: {
      libre: true,
      elementsAttendus: [
        'le calibre est de 2 V : c’est la plus grande tension que l’appareil puisse mesurer '
        + 'dans cette position, donc aucune lecture ne peut dépasser 2 V',
        '38 V est bien plus grand que 2 V : si la tension avait vraiment valu 38 V, '
        + 'l’aiguille serait restée collée à la butée et il n’y aurait rien eu à lire',
        'le 38 est la graduation atteinte, pas une tension : c’est un repère sur le cadran, '
        + 'et il faut encore le rapporter à l’échelle et au calibre',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '895a13ae78c3a14f' },
  },

  // ── p04 — palier 4 · classe A · cercle 3 · l’autre moitié ───────────────
  //
  // Le même relevé que `p03`, et cette fois la valeur est demandée. Ici tout se
  // rejoue : c’est une classe A, et l’élève qui a échoué sur `p03` peut réussir
  // celui-ci — ce sont deux choses différentes, et c’est tout l’objet de la
  // scission.
  {
    id: 'ch02-sf4-p04-la-tension-reelle-du-releve',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'meme-releve-la-valeur-a-retablir',
    enonce:
      'Reprends le relevé : voltmètre sur le calibre {{donnee:calibre}}, échelle graduée de 0 '
      + 'à {{donnee:graduations}}, aiguille sur {{donnee:aiguille}}. Quelle tension a-t-on '
      + 'réellement mesurée ? Donne ta réponse **en millivolts**, avec son unité.',
    donnees: {
      aiguille: { valeur: [38, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [50, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [2, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'mV' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [1520, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // ── p05 — palier 4 · classe A · cercle 1 · la tension qui reste ─────────
  //
  // Le seul item du fichier qui s’appuie sur une LOI, et il la déclare : la loi
  // d’additivité est `ch02-sf6`, elle est rappelée dans l’énoncé, et
  // `sfSollicites` inscrit la dépendance au lieu de la laisser tacite. Ce que
  // l’item évalue reste la lecture avec calibre — sans elle, il n’y a pas de
  // première tension à retrancher.
  //
  // LE DIPÔLE MESURÉ A CHANGÉ. C’était une RÉSISTANCE, et l’en-tête s’autorisait
  // ce dipôle en renvoyant au « chapitre 8 » — qui est celui du mouvement et de
  // la vitesse. La résistance vit en réalité dans le bloc **optionnel** A
  // (`opt-a-loi-d-ohm`), qu’un élève peut ne jamais voir : lui montrer au
  // chapitre 2 un symbole qu’aucun cours ne lui a présenté, dans un savoir-faire
  // dont le métier est justement de LIRE un schéma, revenait à faire porter à la
  // figure une charge hors programme. C’est maintenant une seconde lampe, et le
  // graphe est celui de `p02` — même montage, autre question.
  {
    id: 'ch02-sf4-p05-ce-qui-reste-pour-la-lampe',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    sfSollicites: ['ch02-sf6-loi-d-additivite-des-tensions'],
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'resistance-en-serie-avec-une-lampe',
    enonce:
      'Voici le montage : deux lampes L1 et L2 en série. Le voltmètre V, aux bornes de L2, '
      + 'est sur le calibre {{donnee:calibre}} ; son échelle va de 0 à '
      + '{{donnee:graduations}} et son aiguille s’arrête sur {{donnee:aiguille}}. La pile '
      + 'porte l’indication {{donnee:pile}}. Dans un circuit à une seule maille, les tensions '
      + 'des dipôles s’ajoutent pour donner celle du générateur. Quelle tension reste-t-il '
      + 'pour la lampe L1 ? Donne ta réponse **en millivolts**, avec son unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_DEUX_LAMPES_EN_SERIE,
      titre: 'Deux lampes L1 et L2 en série, avec le voltmètre V branché en dérivation',
    },
    donnees: {
      aiguille: { valeur: [16, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [25, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [5, 1], unite: 'V' },
      pile: { valeur: [45, 10], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'surL2', expr: '#part × @calibre', unite: 'V' },
        { id: 'surL1', expr: '@pile - #surL2', unite: 'mV' },
      ],
      reponse: 'surL1',
    },
    reponse: { valeur: [1300, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════
// TEST — 10 items
// ════════════════════════════════════════════════════════════════════════════
//
// Aucun de ces dix items ne reprend un appareil, un calibre, une échelle, une
// graduation ni un décor de l’entraînement ou des problèmes. Les seules valeurs
// communes sont celles que la physique impose et que le cours a données :
// 1 V = 1000 mV, et les calibres normalisés d’un multimètre.
//
// Sur les ÉNONCÉS, il faut être plus précis que ne l’était la première
// rédaction, qui promettait qu’aucun n’était repris. Deux situations sont
// délibérément parallèles à l’entraînement — `t01` reprend la forme de `e01`,
// `t07` celle de `e08` —, et c’est assumé : ce qu’on y mesure est un calcul, la
// phrase n’y porte aucune décision, et changer le décor pour le principe
// n’aurait rien mesuré de plus. Ce qui n’est PAS assumé, et qui a été corrigé,
// c’est le cas où la phrase porte le raisonnement : `t04` recopiait `e04`
// jusqu’au sens de la soustraction, et il a été retourné.

export const TEST = Object.freeze([

  // t01 — palier 1 · A · cercle 3 · la lecture nue, sans changement d’unité
  {
    id: 'ch02-sf4-t01-aiguille-calibre-quinze-volts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'voltmetre-emprunte-au-labo-voisin',
    enonce:
      'Un voltmètre à aiguille est réglé sur le calibre {{donnee:calibre}}. Son échelle est '
      + 'graduée de 0 à {{donnee:graduations}} et l’aiguille s’arrête sur '
      + '{{donnee:aiguille}}. Quelle tension indique-t-il ? Donne ta réponse avec son unité.',
    donnees: {
      aiguille: { valeur: [28, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [75, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [15, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [56, 10], unite: 'V', semantique: 'exacte' },
  },

  // t02 — palier 1 · A · cercle 3 · calibre en mV, réponse en V
  {
    id: 'ch02-sf4-t02-calibre-six-cents-millivolts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'capteur-de-luminosite',
    enonce:
      'Aux bornes d’un capteur, le voltmètre est réglé sur le calibre {{donnee:calibre}} ; son '
      + 'échelle va de 0 à {{donnee:graduations}} et l’aiguille est sur {{donnee:aiguille}}. '
      + 'Le tableau attend cette tension **en volts**. Écris-la avec son unité.',
    donnees: {
      aiguille: { valeur: [96, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [120, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [600, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [48, 100], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'V',
      unitesPresentesDansLEnonce: ['mV'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // t03 — palier 1 · C · cercle 3 · l’écran numérique, sans conversion
  //
  // Classe C : il n’y a rien à rejouer. Le calibre donne l’unité, l’écran donne
  // le nombre, et la correction est cette lecture — pas un calcul. La déclarer
  // classe A demanderait une chaîne sans opération, que le contrôle refuse
  // (CLASSE_A_SANS_OPERATION), et il a raison : recopier n’est pas calculer.
  {
    id: 'ch02-sf4-t03-ecran-sur-le-calibre-deux-cents-millivolts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 1,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'multimetre-numerique-en-petit-calibre',
    enonce:
      'Un multimètre est réglé sur le calibre 200 mV et son écran affiche 87,6. Quelle tension '
      + 'mesure-t-il ? Donne ta réponse avec son unité.',
    reponse: { valeur: [876, 10], unite: 'mV', semantique: 'exacte' },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '26424d57c84b9c0f' },
  },

  // t04 — palier 2 · A · cercle 1 · l’écart, en millivolts — et dans l’AUTRE sens
  //
  // Sa première rédaction recopiait l’énoncé de `e04` phrase pour phrase, seuls
  // les nombres changeant : même lampe sous-alimentée, même « de combien la
  // tension reçue est-elle INFÉRIEURE à celle qui est marquée ». Sur un item de
  // cercle 1, ce n’est pas anodin — ce qui est évalué ici n’est pas la
  // soustraction mais le SENS de la soustraction, et une phrase déjà rencontrée
  // à l’entraînement le donne. Le test mesure alors la mémoire de l’énoncé, pas
  // le raisonnement. La situation est donc retournée : un moteur sur-alimenté,
  // et un écart qui DÉPASSE au lieu de manquer.
  {
    id: 'ch02-sf4-t04-moteur-sur-alimente',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'petit-moteur-qui-tourne-trop-vite',
    enonce:
      'Un petit moteur électrique porte l’indication {{donnee:nominale}}. Aux bornes de ce '
      + 'moteur, le voltmètre indique {{donnee:mesuree}} et le moteur tourne trop vite. De '
      + 'combien la tension reçue dépasse-t-elle celle qui est marquée sur le moteur ? Donne '
      + 'ta réponse **en millivolts**.',
    donnees: {
      nominale: { valeur: [35, 10], unite: 'V' },
      mesuree: { valeur: [395, 100], unite: 'V' },
    },
    calcul: {
      etapes: [{ id: 'ecart', expr: '@mesuree - @nominale', unite: 'mV' }],
      reponse: 'ecart',
    },
    reponse: { valeur: [450, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // t05 — palier 2 · A · cercle 3 · gros calibre, réponse en millivolts
  {
    id: 'ch02-sf4-t05-calibre-cinquante-volts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'grandeur-en-jeu',
    contexteDeSurface: 'alimentation-stabilisee-de-la-salle',
    enonce:
      'Aux bornes d’une alimentation, le voltmètre est sur le calibre {{donnee:calibre}} ; son '
      + 'échelle va de 0 à {{donnee:graduations}} et l’aiguille est sur {{donnee:aiguille}}. '
      + 'La feuille de relevé est en **millivolts**. Quelle valeur y écris-tu ? Donne-la avec '
      + 'son unité.',
    donnees: {
      aiguille: { valeur: [24, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [100, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [50, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'mV' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [12000, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // t06 — palier 2 · C · cercle 3 · choisir le calibre AVANT de mesurer
  //
  // Le seul item du fichier où l’appareil n’a encore rien affiché. La réponse
  // n’est pas dimensionnée : le piège de l’unité n’a rien à y faire, et le
  // déclarer se déclencherait sur une réussite.
  {
    id: 'ch02-sf4-t06-quel-calibre-pour-une-pile-baton',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 3,
    palier: 2,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'objet-support',
    contexteDeSurface: 'bouton-de-calibre-a-regler',
    enonce:
      'Tu dois mesurer la tension aux bornes d’une pile bâton neuve, qui porte l’indication '
      + '1,5 V. Le bouton du multimètre offre quatre positions : 200 mV, 2 V, 20 V et 200 V. '
      + 'Laquelle choisis-tu pour lire la valeur la plus détaillée sans que l’écran refuse de '
      + 'mesurer ?',
    reponse: {
      libre: false,
      choix: 'le-calibre-2-v',
      choixPossibles: [
        'le-calibre-200-mv',
        'le-calibre-2-v',
        'le-calibre-20-v',
        'le-calibre-200-v',
      ],
    },
    relu: { par: 'auteur-du-corpus', date: '2026-08-13', hash: '57fec543663c644d' },
  },

  // t07 — palier 3 · A · cercle 3 · ordre de grandeur
  {
    id: 'ch02-sf4-t07-ordre-de-grandeur-calibre-deux-mille-millivolts',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 3,
    registre: 'macro',
    type: 'court',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'estimation-avant-le-calcul-exact',
    enonce:
      'Le voltmètre est sur le calibre {{donnee:calibre}}, son échelle va de 0 à '
      + '{{donnee:graduations}}, et l’aiguille est exactement sur {{donnee:aiguille}}. Sans '
      + 'poser le calcul complet, donne l’ORDRE DE GRANDEUR de cette tension **en volts**, '
      + 'avec son unité.',
    donnees: {
      aiguille: { valeur: [20, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [40, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [2000, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [1, 1], unite: 'V', semantique: 'ordre-de-grandeur' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'V',
      unitesPresentesDansLEnonce: ['mV'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // t08 — palier 3 · C · cercle 1 · double QCM, la règle appliquée à contretemps
  //
  // La justification fausse la plus intéressante du fichier est la troisième :
  // elle applique une règle VRAIE — « l’unité équivalente est acceptée » — à un
  // cas où elle ne s’applique pas, parce que changer d’unité oblige à changer
  // aussi le nombre. C’est la conception iatrogène que ce savoir-faire risque de
  // fabriquer s’il ne l’attaque pas de front, et elle est ici.
  //
  // ET C’EST PRÉCISÉMENT POURQUOI ELLE NE DÉCLARE PLUS DE `piege`. Elle en
  // déclarait un, avec un `deriveDe` vers le raisonnement
  // « j-ai-repondu-dans-une-autre-unite ». Or `corrigerDoubleQcm` fait de
  // `j.piege` le piège du verdict sur un juste/faux, et `app.js:vuePourquoi`
  // sert alors à l’élève la liste des `raisonnements` de ce piège. Celui qu’il
  // reconnaîtrait est justement « j-ai-repondu-dans-une-autre-unite », dont la
  // réponse commence par « Alors tu as répondu **juste**, et ce n’est pas compté
  // comme une erreur » — dite à un élève qui vient d’approuver « 3,76 mV vaut
  // 3,76 V ». Le catalogue n’a aucun raisonnement qui réfute cette erreur : sa
  // `regle` la VALIDE en l’état, parce qu’elle suppose que « la même grandeur
  // écrite autrement » a changé de nombre, sans jamais l’écrire. On ne rattache
  // donc pas cette justification à un piège dont la réponse la confirmerait ;
  // `deriveDe` cite la clause sur-généralisée, et la réfutation vient du bloc
  // `remarque` du COURS, qui est le seul endroit où elle est écrite. Écrire le
  // raisonnement manquant est une décision de catalogue, pas de contenu.
  {
    id: 'ch02-sf4-t08-double-qcm-quatre-virgule-mv',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'C',
    cercle: 1,
    palier: 3,
    registre: 'macro',
    type: 'double-qcm',
    dimensionVariee: 'mode-de-reponse',
    contexteDeSurface: 'unite-changee-sans-changer-le-nombre',
    enonce:
      'Un multimètre réglé sur le calibre 20 V affiche 3,76. Un élève recopie « 3,76 mV » '
      + 'dans son compte rendu, parce que le cours de la veille parlait de millivolts. '
      + 'Sa réponse est-elle juste ? Puis choisis la phrase qui dit pourquoi.',
    reponse: {
      libre: false,
      choix: 'non',
      choixPossibles: ['oui', 'non'],
    },
    justifications: [
      {
        id: 'changer-d-unite-change-le-nombre',
        texte:
          'Sur le calibre 20 V, l’écran affiche des volts : la tension vaut 3,76 V. On peut '
          + 'l’écrire en millivolts, mais alors le nombre change aussi — 3760 mV. « 3,76 mV » '
          + 'est une tension mille fois plus petite.',
        juste: true,
        provenance: 'locale',
      },
      {
        id: 'l-unite-du-cours-fera-l-affaire',
        texte:
          'Le cours parlait de millivolts, donc c’est l’unité qu’on attend : je l’ai remise à '
          + 'la fin, le nombre lu ne change pas pour autant.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « unite-absente-ou-fausse », raisonnement « unite-recopiee-de-l-enonce » — '
          + 'js/data/pieges/contrat.js',
        piege: 'unite-absente-ou-fausse',
      },
      {
        id: 'l-unite-equivalente-est-acceptee',
        texte:
          'Les volts et les millivolts mesurent la même grandeur : répondre dans l’une ou dans '
          + 'l’autre revient au même, et c’est accepté.',
        juste: false,
        provenance: 'reformulee',
        // Pas de `piege` : voir le commentaire de l’item. Le catalogue ne porte
        // aucun raisonnement qui réfute cette sur-généralisation, et celui qui
        // s’en approche le plus la confirmerait.
        deriveDe:
          'sur-généralisation de la clause « répondre dans une unité équivalente, c’est '
          + 'répondre juste » — `regle` du piège « unite-absente-ou-fausse », '
          + 'js/data/pieges/contrat.js. Réfutée par le bloc `remarque` du COURS de ce '
          + 'savoir-faire, pas par le catalogue.',
      },
      {
        id: 'le-nombre-lu-est-le-bon',
        texte:
          'Le nombre affiché est bien 3,76 et il l’a recopié sans se tromper : l’essentiel de '
          + 'la mesure est juste.',
        juste: false,
        provenance: 'reformulee',
        deriveDe:
          'piège « unite-absente-ou-fausse », raisonnement « le-nombre-suffit » — '
          + 'js/data/pieges/contrat.js',
        piege: 'unite-absente-ou-fausse',
      },
    ],
    relu: { par: 'relecture-adverse', date: '2026-08-13', hash: '40e06bcc0a748eb4' },
  },

  // t09 — palier 4 · A · cercle 3 · le voltmètre aux bornes de la pile
  //
  // Le seul schéma du fichier où l’appareil ne mesure pas un récepteur.
  // `formeCanonique` range le graphe en `P(S(K, L1), V)` : le voltmètre est en
  // dérivation sur tout le reste du circuit, ce qui est exactement ce que
  // « aux bornes de la pile » veut dire.
  {
    id: 'ch02-sf4-t09-schema-aux-bornes-de-la-pile',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 3,
    palier: 4,
    registre: 'macro',
    type: 'schema-circuit',
    contexteDeSurface: 'controle-d-une-pile-en-fin-de-vie',
    enonce:
      'Voici le montage. Le voltmètre V est sur le calibre {{donnee:calibre}}, son échelle va '
      + 'de 0 à {{donnee:graduations}}, et son aiguille s’arrête sur {{donnee:aiguille}}. '
      + 'Quelle tension la pile délivre-t-elle ? Donne ta réponse **en millivolts**, avec son '
      + 'unité.',
    figure: {
      sorte: 'circuit',
      circuit: CIRCUIT_AUX_BORNES_DE_LA_PILE,
      titre: 'Le voltmètre V, en dérivation aux bornes de la pile P',
    },
    donnees: {
      aiguille: { valeur: [22, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [50, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [10, 1], unite: 'V' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'mV' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [4400, 1], unite: 'mV', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'mV',
      unitesPresentesDansLEnonce: ['V'],
      champUniteSepare: true,
      uniteImposee: false,
    },
  },

  // t10 — palier 4 · A · cercle 1 · le rituel de contrôle
  //
  // Pas un automatisme de calcul : le GESTE de contrôle du chapitre — la valeur
  // trouvée tombe-t-elle entre zéro et le calibre, et l’unité écrite est-elle
  // celle qu’on demandait ? Il est exclu de la fenêtre des cinq séances, sinon
  // il sature mécaniquement sa bande.
  {
    id: 'ch02-sf4-t10-rituel-entre-zero-et-le-calibre',
    sfPrincipal: 'ch02-sf4-lire-une-tension-avec-son-calibre',
    chapitre: 'ch02-tension-electrique',
    programme: '2020',
    classe: 'A',
    cercle: 1,
    palier: 4,
    registre: 'macro',
    type: 'court',
    contexteDeSurface: 'controle-avant-d-ecrire-la-valeur',
    enonce:
      'Rituel de contrôle. Le voltmètre est sur le calibre {{donnee:calibre}}, son échelle va '
      + 'de 0 à {{donnee:graduations}}, l’aiguille est sur {{donnee:aiguille}}. Calcule la '
      + 'tension, vérifie qu’elle tombe bien entre zéro et le calibre, puis écris-la **en '
      + 'volts** avec son unité.',
    donnees: {
      aiguille: { valeur: [86, 1], unite: 'SANS_UNITE' },
      graduations: { valeur: [100, 1], unite: 'SANS_UNITE' },
      calibre: { valeur: [2000, 1], unite: 'mV' },
    },
    calcul: {
      etapes: [
        { id: 'part', expr: '@aiguille ÷ @graduations', unite: 'SANS_UNITE' },
        { id: 'tension', expr: '#part × @calibre', unite: 'V' },
      ],
      reponse: 'tension',
    },
    reponse: { valeur: [172, 100], unite: 'V', semantique: 'exacte' },
    piege: 'unite-absente-ou-fausse',
    situation: {
      reponseDimensionnee: true,
      uniteCible: 'V',
      unitesPresentesDansLEnonce: ['mV'],
      champUniteSepare: true,
      uniteImposee: false,
    },
    rituelDeControle: true,
  },
].map(Object.freeze));

// ════════════════════════════════════════════════════════════════════════════

/** Les 25 items du savoir-faire, dans l’ordre où le chapitre les présente.
 *  C’est cette liste que `validerItem` et `tools/verifier-contenu.mjs` lisent ;
 *  `DECOUVERTE`, `COURS` et `METHODE` n’en font pas partie et n’ont pas à en
 *  faire — ils ne portent ni classe de garantie, ni cercle, ni palier. */
export default Object.freeze([...ENTRAINEMENT, ...PROBLEMES, ...TEST]);
