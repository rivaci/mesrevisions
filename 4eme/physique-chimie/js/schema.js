// Les figures engendrées — schémas de circuit, schémas particulaires,
// graphiques et tableaux de mesures, tracés à partir de l'objet formel et de lui
// seul.
//
// ── Pourquoi ce module existe (invariant 6) ─────────────────────────────────
//
// « Tout schéma de circuit, schéma particulaire, graphique, chronophotographie
// ou tableau de mesures qui n'est pas produit par le même objet formel que la
// correction est refusé ; toute référence à un fichier image dans un énoncé est
// refusée. » La deuxième moitié de la phrase est ce qui rend la première
// contrôlable : l'intention d'un auteur n'est pas détectable par un programme,
// un `<img src>` l'est. Il faut donc que l'auteur n'ait JAMAIS besoin d'une
// image — d'où ce fichier.
//
// La garantie obtenue est exactement celle de la classe B : le dessin ne peut
// pas contredire la correction, PUISQU'IL EN DÉRIVE. Un schéma de circuit montré
// à l'élève et un schéma de circuit comparé par `circuit.js` sont le même graphe
// lu deux fois ; un graphique et le tableau de mesures qui l'accompagne sont le
// même jeu de points rendu deux fois.
//
// ── Ce que ce module ne stocke pas, et pourquoi ─────────────────────────────
//
// Aucune disposition. L'invariant 6 refuse « une disposition stockée qui ne
// représente pas le graphe qu'elle accompagne » : le seul moyen de rendre ce
// désaccord IMPOSSIBLE plutôt que détectable est de ne rien stocker et de
// déduire le placement du graphe à chaque tracé. Une boucle simple devient un
// rectangle, un bloc en dérivation devient des branches empilées entre deux
// jonctions — parce que c'est ce que dit l'arbre série-parallèle de
// `formeCanonique`, pas parce qu'un auteur l'a dessiné ainsi.
//
// ── Ce qu'il ne fait pas ────────────────────────────────────────────────────
//
// Aucune arithmétique de contenu : les valeurs affichées sont celles que l'objet
// porte, mises en forme. Tout ce qui se calcule (conversions, comparaisons,
// tolérances appliquées) appartient à `unites.js`, en rationnels exacts. Ici,
// des coordonnées de tracé — jamais une valeur physique dérivée d'une autre.
//
// Module ES pur : ni DOM, ni dépendance, ni date, ni `Math.random`. Il se charge
// sous node comme dans le navigateur, et deux appels sur le même objet rendent
// exactement la même chaîne — sans quoi « la figure est engendrée par l'objet »
// serait faux dès le second affichage.
//
// ── Affichage ───────────────────────────────────────────────────────────────
//
// · `viewBox` partout, aucune largeur en pixels : la figure se met à l'échelle
//   du téléphone, et rien ne peut déborder à 375 px puisque rien n'est fixé en
//   pixels. Le seul élément qui ne se met pas à l'échelle est le tableau de
//   mesures, qui n'est pas un SVG : il défile horizontalement dans son cadre.
// · Les couleurs sont des variables CSS, avec une valeur de repli. Une règle CSS
//   l'emporte toujours sur un attribut de présentation : `stroke="currentColor"`
//   dans le balisage donne donc une figure lisible AVANT même qu'une feuille de
//   style existe, sans jamais retirer la main au thème.
// · Chaque figure porte un `aria-label` engendré du même objet que le dessin —
//   un élève qui n'accède pas au tracé reçoit la même information, pas moins.

import { formeCanonique, normaliser, typeDeCircuit } from './circuit.js';

// ── Utilitaires communs ─────────────────────────────────────────────────────

/** Écriture française d'un nombre : virgule décimale, vrai signe moins. */
const fr = (n) => String(n).replace('-', '−').replace('.', ',');

const echapper = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** Le verdict de refus, de même forme que ceux de `circuit.js` et `unites.js` :
 *  un cas hors cadre doit rester DISTINGUABLE d'une figure vide. Une fonction
 *  qui renverrait `''` ferait disparaître la figure en silence, et l'élève
 *  chercherait une donnée qui n'est nulle part. */
const refus = (raison, details = []) => ({ ok: false, raison, details });

const nombreFini = (x) => typeof x === 'number' && Number.isFinite(x);

/** Arrondi au dixième d'unité de tracé : les coordonnées entrent dans une chaîne
 *  et `0.1 + 0.2` y écrirait `0.30000000000000004`. C'est de la mise en forme,
 *  pas du calcul — la valeur physique, elle, ne passe jamais par ici. */
const u = (x) => Math.round(x * 10) / 10;

const enumerer = (parts) => (parts.length <= 1 ? (parts[0] ?? '')
  : `${parts.slice(0, -1).join(', ')} et ${parts[parts.length - 1]}`);

/** « de fer », mais « d'eau ». La description est LUE par une synthèse vocale
 *  quand l'élève n'accède pas au tracé : une élision manquée s'y entend. */
const de = (mot) => (/^[aeiouyàâéèêîôhœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

/** L'enveloppe commune : une figure, sa légende visible, son SVG décrit. */
const figure = (classe, titre, contenu, description, largeur, hauteur) => `<figure class="${classe}">
  ${titre ? `<figcaption>${echapper(titre)}</figcaption>` : ''}
  <svg viewBox="0 0 ${u(largeur)} ${u(hauteur)}" role="img" aria-label="${echapper(description)}">
    ${contenu}
  </svg>
</figure>`;

// ════════════════════════════════════════════════════════════════════════════
// 1. Le schéma de circuit
// ════════════════════════════════════════════════════════════════════════════
//
// Le placement se DÉDUIT du graphe, en trois temps :
//
//   1. `formeCanonique` rend l'arbre série-parallèle du réseau extérieur,
//      orienté de la borne « + » vers la borne « − » — donc DANS LE SENS DU
//      COURANT. C'est lui qui décide de tout : rien d'autre n'est consulté.
//   2. On mesure l'arbre en cases (largeur) et en pistes (hauteur) : un dipôle
//      occupe une case ; une série additionne les largeurs, une dérivation
//      additionne les hauteurs. C'est la traduction littérale de « les branches
//      en dérivation se dessinent côte à côte ».
//   3. On place : le réseau extérieur en haut, de gauche à droite ; la pile
//      seule sur la ligne du bas ; deux fils verticaux referment le rectangle.
//
// Un fil du graphe n'est pas dessiné comme un symbole : c'est une identité entre
// deux nœuds, `normaliser` l'a déjà contracté, et il ressort ici sous la forme
// des liaisons elles-mêmes. Dessiner un rectangle « fil » entre deux dipôles
// ajouterait à l'énoncé un composant que le graphe ne porte pas.
//
// TOUT NŒUD A SES DEUX BORNES SUR SA PREMIÈRE PISTE — c'est l'invariant de
// placement qui rend la récursion correcte : un enfant, série ou dérivation,
// se raccorde toujours à la hauteur où il commence. Il a une conséquence utile :
// les fils verticaux extérieurs longent les bords, les bus de jonction sont en
// retrait, et AUCUN FIL N'EN CROISE UN AUTRE. Un croisement sur un schéma de
// circuit est lu par l'élève comme une connexion.

const PAS_X = 110; // largeur d'une case de dipôle, unités de viewBox
const PAS_Y = 90; // écart entre deux pistes en dérivation
const MARGE = 30;
const MARGE_BAS = 44; // de quoi écrire le nom de la pile sous son symbole
const LARGEUR_MIN = 240; // un circuit à un seul dipôle reste un rectangle, pas un trait
const RETRAIT_JONCTION = 26; // recul des bus de dérivation par rapport aux bords du bloc

/** Le nom lisible d'un type de dipôle, pour la description parlée. */
const NOM_DU_TYPE = Object.freeze({
  pile: 'une pile',
  lampe: 'une lampe',
  moteur: 'un moteur',
  resistance: 'une résistance',
  amperemetre: 'un ampèremètre',
  voltmetre: 'un voltmètre',
  fil: 'un fil',
});

const nomDuDipole = (d) => (d.type === 'interrupteur'
  ? `un interrupteur ${d.etat === 'ouvert' ? 'ouvert' : 'fermé'}`
  : NOM_DU_TYPE[d.type] ?? d.type);

const ALLURE = Object.freeze({ SERIE: 'en série', DERIVATION: 'en dérivation', MIXTE: 'mixte' });

/** Largeur en unités de tracé, hauteur en pistes. La série additionne les
 *  largeurs, la dérivation additionne les pistes : c'est toute la mise en page.
 *
 *  Une dérivation réclame en plus la place de ses deux bus de jonction, qui sont
 *  en retrait des bords du bloc. Mesurer en « cases » sans ce supplément faisait
 *  payer le retrait aux enfants : à la deuxième imbrication, la case offerte à
 *  un dipôle devenait plus étroite que son symbole, ses fils de raccordement se
 *  traçaient à l'envers et le symbole recouvrait les points de jonction — un
 *  contact dessiné que le graphe ne porte pas. */
function mesurer(n) {
  if (n.sorte === 'DIPOLE') return { largeur: PAS_X, pistes: 1 };
  const enfants = n.enfants.map(mesurer);
  if (n.sorte === 'SERIE') {
    return {
      largeur: enfants.reduce((s, e) => s + e.largeur, 0),
      pistes: Math.max(...enfants.map((e) => e.pistes)),
    };
  }
  return {
    largeur: Math.max(...enfants.map((e) => e.largeur)) + 2 * RETRAIT_JONCTION,
    pistes: enfants.reduce((s, e) => s + e.pistes, 0),
  };
}

/**
 * Place un nœud entre `x0` et `x1`, ses deux bornes sur la piste `piste`.
 *
 * Empile les tracés dans `sortie` plutôt que de rendre une chaîne : les fils
 * doivent être écrits avant les symboles, sans quoi un trait traverse un cercle
 * de lampe. C'est un ordre de rendu, pas une donnée.
 */
function placer(n, x0, x1, piste, sortie, y) {
  if (n.sorte === 'DIPOLE') {
    sortie.dipoles.push({ ...n, x0, x1, y: y(piste) });
    return;
  }
  if (n.sorte === 'SERIE') {
    const largeurs = n.enfants.map((e) => mesurer(e).largeur);
    const total = largeurs.reduce((s, c) => s + c, 0);
    let x = x0;
    n.enfants.forEach((e, i) => {
      const suivant = x + ((x1 - x0) * largeurs[i]) / total;
      placer(e, x, suivant, piste, sortie, y);
      x = suivant;
    });
    return;
  }
  // Dérivation : chaque enfant sur ses propres pistes, tous entre les deux mêmes
  // jonctions. Les bus verticaux matérialisent les nœuds partagés — ce sont eux
  // que l'élève doit voir pour lire « ces deux branches ont les mêmes bornes ».
  const xa = x0 + RETRAIT_JONCTION;
  const xb = x1 - RETRAIT_JONCTION;
  sortie.fils.push([x0, y(piste), xa, y(piste)], [xb, y(piste), x1, y(piste)]);
  let p = piste;
  const departs = [];
  for (const e of n.enfants) {
    departs.push(p);
    placer(e, xa, xb, p, sortie, y);
    p += mesurer(e).pistes;
  }
  const derniere = departs[departs.length - 1];
  sortie.fils.push([xa, y(piste), xa, y(derniere)], [xb, y(piste), xb, y(derniere)]);
  for (const d of departs) sortie.jonctions.push([xa, y(d)], [xb, y(d)]);
}

/**
 * Le symbole normalisé d'un dipôle, posé horizontalement entre `x0` et `x1`.
 *
 * `sens` vaut +1 quand `bornes[0]` est à gauche du dessin. Pour les dipôles
 * polarisés, c'est lui — et lui seul — qui décide de quel côté se trouve la
 * borne « + » : la polarité du dessin est donc celle du graphe, y compris
 * lorsqu'un ampèremètre est monté à l'envers. Un schéma qui montrerait le bon
 * branchement alors que le graphe en porte un mauvais ferait exactement ce que
 * l'invariant 6 interdit.
 */
function symbole(d) {
  const cx = (d.x0 + d.x1) / 2;
  const { y } = d;
  const cote = d.sens > 0 ? 1 : -1; // côté de la borne « + »
  const rond = (lettre) => `<circle cx="${u(cx)}" cy="${u(y)}" r="17"/>`
    + `<text x="${u(cx)}" y="${u(y + 6)}" text-anchor="middle" font-size="19" font-weight="600"`
    + ` fill="currentColor" stroke="none">${lettre}</text>`;
  // La borne « + » d'un appareil de mesure est écrite : c'est la donnée que le
  // savoir-faire « brancher un ampèremètre » demande de lire.
  const marquePlus = `<text x="${u(cx + cote * 27)}" y="${u(y - 9)}" text-anchor="middle"`
    + ` font-size="15" fill="currentColor" stroke="none">+</text>`;

  switch (d.type) {
    case 'lampe':
      return {
        demi: 17,
        corps: `<circle cx="${u(cx)}" cy="${u(y)}" r="17"/>`
          + `<line x1="${u(cx - 12)}" y1="${u(y - 12)}" x2="${u(cx + 12)}" y2="${u(y + 12)}"/>`
          + `<line x1="${u(cx - 12)}" y1="${u(y + 12)}" x2="${u(cx + 12)}" y2="${u(y - 12)}"/>`,
      };
    case 'moteur':
      return { demi: 17, corps: rond('M') };
    case 'amperemetre':
      return { demi: 17, corps: rond('A') + marquePlus };
    case 'voltmetre':
      return { demi: 17, corps: rond('V') + marquePlus };
    case 'resistance':
      return {
        demi: 22,
        corps: `<rect x="${u(cx - 22)}" y="${u(y - 9)}" width="44" height="18" rx="2"/>`,
      };
    case 'interrupteur': {
      // Les deux plots sont dessinés dans les deux cas : c'est ce qui montre que
      // l'interrupteur ouvert laisse une COUPURE, et non un dipôle absent.
      const plots = `<circle cx="${u(cx - 20)}" cy="${u(y)}" r="3" fill="currentColor"/>`
        + `<circle cx="${u(cx + 20)}" cy="${u(y)}" r="3" fill="currentColor"/>`;
      const lame = d.etat === 'ouvert'
        ? `<line x1="${u(cx - 20)}" y1="${u(y)}" x2="${u(cx + 15)}" y2="${u(y - 19)}"/>`
        : `<line x1="${u(cx - 20)}" y1="${u(y)}" x2="${u(cx + 20)}" y2="${u(y)}"/>`;
      return { demi: 20, corps: plots + lame };
    }
    case 'pile': {
      // Barre longue et fine du côté « + », barre courte et épaisse du côté
      // « − » : c'est la convention du collège, et elle porte la polarité sans
      // qu'aucun texte ne soit nécessaire.
      const xPlus = cx + cote * 7;
      const xMoins = cx - cote * 7;
      return {
        demi: 14,
        corps: `<line x1="${u(xPlus)}" y1="${u(y - 16)}" x2="${u(xPlus)}" y2="${u(y + 16)}"/>`
          + `<line x1="${u(xMoins)}" y1="${u(y - 8)}" x2="${u(xMoins)}" y2="${u(y + 8)}" stroke-width="5"/>`,
      };
    }
    default:
      // `fil` et tout type que la normalisation aurait laissé passer : une
      // liaison, donc rien à dessiner de plus que le trait de raccordement.
      return { demi: 0, corps: '' };
  }
}

const tracerDipole = (d) => {
  const cx = (d.x0 + d.x1) / 2;
  const { demi, corps } = symbole(d);
  return `<line x1="${u(d.x0)}" y1="${u(d.y)}" x2="${u(cx - demi)}" y2="${u(d.y)}"/>`
    + `<line x1="${u(cx + demi)}" y1="${u(d.y)}" x2="${u(d.x1)}" y2="${u(d.y)}"/>`
    + corps
    + `<text x="${u(cx)}" y="${u(d.y + 32)}" text-anchor="middle" font-size="15"`
    + ` fill="currentColor" stroke="none">${echapper(d.nom)}</text>`;
};

/**
 * Le schéma d'un circuit, engendré à partir de son graphe.
 *
 * Accepte le même objet que `circuit.js` — brut ou déjà normalisé — et un
 * `{ titre }` facultatif, qui est la seule chose que l'appelant décide : tout le
 * reste du dessin vient du graphe. Rend `{ ok: true, html, description }`, ou
 * `{ ok: false, raison, details }` quand le graphe n'est pas lisible ou sort du
 * cadre série-parallèle.
 *
 * Le refus n'est pas une lacune, c'est la règle de la charte appliquée au
 * tracé : un schéma d'élève peut comporter un pont ou une boucle morte, et
 * dessiner « à peu près » un circuit qu'on ne sait pas lire produirait une
 * figure qui ne représente pas le graphe — l'exacte faute que l'invariant 6
 * refuse. L'appelant a `diagnostiquer` pour ces cas-là ; il a besoin de savoir
 * qu'il est dans ce cas.
 */
export function schemaCircuit(circuit, options = {}) {
  const g = normaliser(circuit);
  if (!g.ok) return refus(g.raison, g.details);

  const canonique = formeCanonique(g);
  if (canonique.cle === null) return refus(canonique.raison, canonique.details ?? []);

  const { largeur: largeurArbre, pistes } = mesurer(canonique.arbre);
  const largeurReseau = Math.max(largeurArbre, LARGEUR_MIN);
  const largeur = largeurReseau + 2 * MARGE;
  const yPiste = (p) => MARGE + p * PAS_Y;
  const yPile = yPiste(pistes);
  const hauteur = yPile + MARGE_BAS;
  const xGauche = MARGE;
  const xDroite = MARGE + largeurReseau;

  const sortie = { fils: [], dipoles: [], jonctions: [] };
  placer(canonique.arbre, xGauche, xDroite, 0, sortie, yPiste);

  // Les deux montants du rectangle, puis la pile sur la ligne du bas. Le réseau
  // extérieur est orienté du « + » vers le « − » : la borne « + » de la pile est
  // donc à gauche, et le dessin de la pile est retourné (`sens: -1`).
  sortie.fils.push(
    [xGauche, yPiste(0), xGauche, yPile],
    [xDroite, yPiste(0), xDroite, yPile],
  );
  const pile = g.parId.get(canonique.pile);
  sortie.dipoles.push({
    sorte: 'DIPOLE', type: 'pile', nom: pile.nom, sens: -1, x0: xGauche, x1: xDroite, y: yPile,
  });

  const nommes = sortie.dipoles.map((d) => ({ ...d, nom: d.nom ?? g.noms.get(d.id) ?? d.id }));
  const traces = nommes.map(tracerDipole).join('');
  const fils = sortie.fils
    .map(([x1, y1, x2, y2]) => `<line x1="${u(x1)}" y1="${u(y1)}" x2="${u(x2)}" y2="${u(y2)}"/>`)
    .join('');
  // Un point de jonction dessiné : sans lui, un bus qui longe une branche sans
  // s'y connecter aurait la même allure qu'un bus qui s'y connecte.
  const jonctions = sortie.jonctions
    .map(([x, y]) => `<circle cx="${u(x)}" cy="${u(y)}" r="4" fill="currentColor" stroke="none"/>`)
    .join('');

  // Les dipôles séparés par des points-virgules, pas par « et » : chaque entrée
  // porte déjà une virgule (« L1, une lampe »), et une énumération à deux
  // niveaux de virgules ne se comprend plus une fois lue à voix haute.
  //
  // L'inventaire suit les dipôles PLACÉS, donc la figure : de gauche à droite,
  // piste après piste, la pile en dernier sur sa ligne. Le lire sur `g.dipoles`
  // le faisait suivre l'ordre où l'auteur avait tapé ses dipôles — un ordre que
  // le graphe ne porte pas, et qui ne correspondait déjà pas au dessin. L'élève
  // qui n'accède pas au tracé doit recevoir la même figure, pas un autre
  // parcours de la même liste.
  const allure = ALLURE[typeDeCircuit(g).type] ?? '';
  const inventaire = nommes.map((d) => `${d.nom}, ${nomDuDipole(d)}`).join(' ; ');
  const description = `Schéma d'un circuit électrique${allure ? ` ${allure}` : ''}. `
    + `Dipôles : ${inventaire}.`;

  const html = figure(
    'schema-circuit',
    options.titre,
    `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">`
      + `${fils}${traces}${jonctions}</g>`,
    description,
    largeur,
    hauteur,
  );
  return { ok: true, html, description };
}

// ════════════════════════════════════════════════════════════════════════════
// 2. Le schéma particulaire
// ════════════════════════════════════════════════════════════════════════════
//
// C'est le support du passage entre le registre macroscopique et le registre
// submicroscopique — celui que les données françaises chiffrent le plus
// sévèrement (Canac & Kermen : 2 % à 15 % de réussite au collège selon la
// formule). Il porte donc une charge que les autres figures n'ont pas : ce
// qu'il montre EST le contenu enseigné, pas son illustration.
//
// Deux décisions viennent de l'invariant 20, qui refuse mécaniquement « un
// schéma particulaire dont le rayon d'une même espèce varie entre deux états » :
//
//   · le rayon est une propriété de L'ÉLÉMENT, lue dans une table fermée. L'état
//     ne décide que de l'ARRANGEMENT. Le refus de l'invariant devient donc
//     inatteignable par construction plutôt que contrôlé après coup : « les
//     molécules gonflent quand ça chauffe » est le piège lui-même, et un
//     programme qui pourrait le dessiner finirait par le dessiner.
//   · deux particules peuvent se toucher, jamais se chevaucher. Le décalage
//     aléatoire vaut au plus la moitié de l'espace libre. Des particules qui
//     s'interpénètrent enseigneraient que la matière se comprime en écrasant ses
//     grains, c'est-à-dire l'inverse du modèle.
//
// La géométrie des molécules est CONVENTIONNELLE et ne prétend rien : les atomes
// périphériques sont répartis régulièrement autour du premier déclaré. Les
// angles ne sont pas un attendu de 4e, la COMPOSITION en est un — combien
// d'atomes de quoi. Le dire ici évite qu'on lise le schéma comme un modèle
// moléculaire, qu'il n'est pas.

/** Le lexique fermé des éléments dessinables : rayon, nom, couleur de repli.
 *
 *  Fermé pour la même raison que le lexique auteur des unités — un symbole
 *  inconnu est une erreur d'énoncé, pas une figure approximative. Ajouter un
 *  élément est une décision de contenu, prise ici, une fois.
 *
 *  La couleur passe par une variable CSS et n'est jamais la seule différence
 *  entre deux espèces : les rayons diffèrent aussi, et la description parlée dit
 *  la composition en toutes lettres. */
export const ELEMENTS = Object.freeze({
  H: { nom: 'hydrogène', rayon: 9, couleur: 'var(--atome-h, #f2f0ea)' },
  C: { nom: 'carbone', rayon: 14, couleur: 'var(--atome-c, #3f4553)' },
  N: { nom: 'azote', rayon: 13, couleur: 'var(--atome-n, #2d7fa6)' },
  O: { nom: 'oxygène', rayon: 13, couleur: 'var(--atome-o, #c4373c)' },
  S: { nom: 'soufre', rayon: 16, couleur: 'var(--atome-s, #d9a824)' },
  Cl: { nom: 'chlore', rayon: 16, couleur: 'var(--atome-cl, #2a8256)' },
  Na: { nom: 'sodium', rayon: 17, couleur: 'var(--atome-na, #8264c8)' },
  Fe: { nom: 'fer', rayon: 17, couleur: 'var(--atome-fe, #a2632a)' },
  Cu: { nom: 'cuivre', rayon: 17, couleur: 'var(--atome-cu, #b5651d)' },
  Al: { nom: 'aluminium', rayon: 16, couleur: 'var(--atome-al, #8a8f98)' },
});

const ETATS = Object.freeze({
  solide: {
    ecart: 8,
    desordre: 0,
    phrase: 'rangées, ordonnées et serrées les unes contre les autres',
  },
  liquide: {
    ecart: 14,
    desordre: 0.5,
    phrase: 'serrées les unes contre les autres mais désordonnées',
  },
  gaz: {
    ecart: 56,
    desordre: 0.5,
    phrase: 'très espacées et désordonnées, occupant tout le récipient',
  },
});

/** Au-delà, les disques deviennent illisibles sur un téléphone et le schéma
 *  cesse de servir à ce pour quoi il existe : compter et comparer. */
const PARTICULES_MAX = 36;

/**
 * Générateur pseudo-aléatoire déterministe (xorshift 32 bits), semé par le
 * contenu.
 *
 * `Math.random` rendrait deux dessins différents pour le même objet formel : la
 * figure ne serait plus engendrée par lui, elle serait engendrée par lui ET par
 * l'instant de l'affichage. L'état vit dans la fermeture, jamais au dehors.
 */
function suite(graine) {
  let x = (graine >>> 0) || 2463534242;
  return () => {
    x ^= x << 13; x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5; x >>>= 0;
    return x / 4294967296;
  };
}

/** Les atomes d'une espèce, déployés à plat : le PREMIER déclaré est le centre,
 *  les suivants sont répartis autour de lui. L'ordre de déclaration est donc une
 *  donnée du contenu, et l'auteur en a la maîtrise.
 *
 *  Rend `{ plat }` ou `{ erreur, details }`. Trois fautes distinctes — un
 *  symbole hors table, un nombre d'atomes qui n'est pas un entier positif, une
 *  espèce sans aucun atome — méritent trois verdicts : un code unique les
 *  aurait fait toutes ressortir en « élément inconnu », en désignant un élément
 *  qui, dans deux cas sur trois, n'a rien à se reprocher. */
function deployer(atomes) {
  const plat = [];
  for (const a of atomes) {
    if (!ELEMENTS[a?.element]) return { erreur: 'ELEMENT_INCONNU', details: [String(a?.element)] };
    const combien = a.nombre ?? 1;
    if (!Number.isInteger(combien) || combien < 1) {
      return { erreur: 'NOMBRE_ATOMES_INVALIDE', details: [a.element, String(a.nombre)] };
    }
    for (let i = 0; i < combien; i += 1) plat.push(a.element);
  }
  return plat.length ? { plat } : { erreur: 'ESPECE_VIDE', details: [] };
}

/**
 * La géométrie conventionnelle d'une molécule : le rayon de l'anneau où se
 * posent les atomes périphériques, et le rayon d'encombrement de l'ensemble.
 *
 * Le premier terme est le contact avec l'atome central — c'est lui qui figure
 * la liaison sans qu'un trait la représente. Le second n'entre en jeu qu'à
 * partir de trois voisins : sur un anneau trop petit, les périphériques se
 * recouvrent au point qu'on ne peut plus les COMPTER, et compter les atomes est
 * précisément l'attendu (« associer une formule chimique au modèle moléculaire
 * correspondant »). On écarte donc l'anneau jusqu'à ce que deux voisines se
 * touchent au plus — ce qui ne change rien à l'eau ni au méthane, et rend le
 * glucose lisible.
 *
 * Une seule fonction pour les deux usages : le tracé et l'encombrement doivent
 * être calculés ensemble, sinon la place réservée à une molécule finit par ne
 * plus être celle qu'elle occupe.
 */
function geometrie(plat) {
  const centre = ELEMENTS[plat[0]].rayon;
  const autour = plat.slice(1).map((e) => ELEMENTS[e].rayon);
  if (!autour.length) return { anneau: 0, rayon: centre };
  const large = Math.max(...autour);
  const contact = centre + 0.8 * large;
  const cote = autour.length > 2 ? large / Math.sin(Math.PI / autour.length) : 0;
  const anneau = Math.max(contact, cote);
  return { anneau, rayon: anneau + large };
}

/** Une molécule dessinée en (cx, cy). Les atomes périphériques sont tracés
 *  d'abord : le centre les recouvre partiellement, ce qui donne la liaison sans
 *  qu'un trait la représente. */
function molecule(plat, cx, cy) {
  const autour = plat.slice(1);
  const { anneau } = geometrie(plat);
  const disque = (element, x, y) => `<circle cx="${u(x)}" cy="${u(y)}" r="${ELEMENTS[element].rayon}"`
    + ` fill="${ELEMENTS[element].couleur}" stroke="currentColor" stroke-width="1.5"/>`;
  const peripherie = autour.map((element, i) => {
    const angle = (2 * Math.PI * i) / autour.length;
    return disque(element, cx + anneau * Math.cos(angle), cy + anneau * Math.sin(angle));
  }).join('');
  return peripherie + disque(plat[0], cx, cy);
}

const composition = (plat) => enumerer(
  [...new Set(plat)].map((e) => {
    const n = plat.filter((x) => x === e).length;
    return `${n} atome${n > 1 ? 's' : ''} ${de(ELEMENTS[e].nom)}`;
  }),
);

/**
 * Le schéma particulaire d'un contenu déclaré.
 *
 *   {
 *     etat: 'solide' | 'liquide' | 'gaz',
 *     contenu: [
 *       { nom: 'eau', formule: 'H₂O', nombre: 6,
 *         atomes: [{ element: 'O' }, { element: 'H', nombre: 2 }] },
 *     ],
 *     graine: 7,        // facultatif : fixe le désordre, qui reste reproductible
 *     titre: '…',
 *   }
 *
 * Le mélange est brassé — deux espèces déclarées l'une après l'autre ne
 * ressortent pas en deux paquets : un mélange dessiné en couches serait un
 * schéma de mélange hétérogène, et l'élève lirait la figure, pas l'énoncé.
 */
export function schemaParticulaire(description) {
  if (!description || !Array.isArray(description.contenu) || description.contenu.length === 0) {
    return refus('DESCRIPTION_ABSENTE');
  }
  const etat = ETATS[description.etat];
  if (!etat) return refus('ETAT_INCONNU', [String(description.etat)]);

  const especes = [];
  for (const espece of description.contenu) {
    if (!Array.isArray(espece?.atomes)) return refus('ESPECE_SANS_ATOMES', [String(espece?.formule)]);
    const { plat, erreur, details } = deployer(espece.atomes);
    if (erreur) return refus(erreur, details);
    const combien = espece.nombre ?? 1;
    if (!Number.isInteger(combien) || combien < 1) return refus('NOMBRE_INVALIDE', [String(espece.nombre)]);
    especes.push({
      ...espece, plat, nombre: combien, rayon: geometrie(plat).rayon,
    });
  }

  const total = especes.reduce((s, e) => s + e.nombre, 0);
  if (total > PARTICULES_MAX) return refus('TROP_DE_PARTICULES', [total, PARTICULES_MAX]);

  // Une grille carrée, brassée par la graine. Le pas est le même pour toutes les
  // espèces : c'est la place de la plus grosse molécule qui le fixe, sinon deux
  // espèces de tailles différentes ne pourraient pas partager le récipient.
  const rayonMax = Math.max(...especes.map((e) => e.rayon));
  const pas = 2 * rayonMax + etat.ecart;
  const colonnes = Math.ceil(Math.sqrt(total));
  const lignes = Math.ceil(total / colonnes);

  const tirer = suite(description.graine ?? 1);
  const paquet = especes.flatMap((e) => Array.from({ length: e.nombre }, () => e));
  for (let i = paquet.length - 1; i > 0; i -= 1) {
    const j = Math.floor(tirer() * (i + 1));
    [paquet[i], paquet[j]] = [paquet[j], paquet[i]];
  }

  const boite = { x: MARGE, y: MARGE, w: colonnes * pas, h: lignes * pas };
  // Le décalage vaut au plus la moitié de l'espace libre de la case : deux
  // molécules peuvent se toucher, jamais se chevaucher.
  const jeu = (pas - 2 * rayonMax) * etat.desordre;
  const dessins = paquet.map((espece, i) => {
    const cx = boite.x + (i % colonnes) * pas + pas / 2 + (tirer() - 0.5) * jeu;
    const cy = boite.y + Math.floor(i / colonnes) * pas + pas / 2 + (tirer() - 0.5) * jeu;
    return molecule(espece.plat, cx, cy);
  }).join('');

  // La légende porte la molécule elle-même, dessinée par la même fonction que le
  // récipient : une légende qui ne serait pas engendrée pourrait mentir sur ce
  // qu'elle légende.
  // La légende est posée sous le récipient, à 34 unités de son bord — et c'est
  // le BORD de la molécule dessinée qui doit s'y trouver, pas son centre. Sans
  // le rayon, une grosse molécule de légende remontait dans le récipient et se
  // superposait aux particules : la figure montrait alors une entité de plus
  // que l'échantillon n'en contient.
  const yLegende = boite.y + boite.h + 34 + rayonMax;
  const pasLegende = Math.max(2 * rayonMax + 90, 150);
  const legende = especes.map((e, i) => {
    const x = MARGE + rayonMax + i * pasLegende;
    return molecule(e.plat, x, yLegende)
      + `<text x="${u(x + rayonMax + 8)}" y="${u(yLegende + 5)}" font-size="15"`
      + ` fill="currentColor" stroke="none">${echapper(e.formule ?? e.nom ?? '')}</text>`;
  }).join('');

  const largeur = Math.max(boite.w, especes.length * pasLegende) + 2 * MARGE;
  const hauteur = yLegende + rayonMax + MARGE;

  // « 12 atomes de fer » et « 6 molécules d'eau » ne sont pas deux façons de
  // dire la même chose : c'est la distinction que le registre submicroscopique
  // demande, et elle se lit sur l'objet formel — une espèce à un seul atome est
  // un atome. La description parlée ne peut donc pas la manquer.
  const inventaire = enumerer(especes.map((e) => {
    const entite = e.plat.length > 1 ? 'molécule' : 'atome';
    const quoi = e.nom ? ` ${de(e.nom)}` : '';
    const formule = e.formule ? ` (${e.formule})` : '';
    return `${e.nombre} ${entite}${e.nombre > 1 ? 's' : ''}${quoi}${formule}`;
  }));
  const detail = especes.filter((e) => e.plat.length > 1)
    .map((e) => `${e.formule ?? e.nom} : ${composition(e.plat)}`).join(' ; ');
  // L'arrangement est une phrase à part : accordé à l'inventaire, il dirait
  // « 12 atomes de fer, rangées et serrées ».
  const texte = `Schéma à l'échelle des particules. État : ${description.etat}. `
    + `L'échantillon contient ${inventaire}. Les particules sont ${etat.phrase}.`
    + `${detail ? ` ${detail}.` : ''}`;

  const contenu = `<rect x="${u(boite.x)}" y="${u(boite.y)}" width="${u(boite.w)}" height="${u(boite.h)}"`
    + ` rx="10" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.45"/>`
    + dessins + legende;

  return {
    ok: true,
    html: figure('schema-particulaire', description.titre, contenu, texte, largeur, hauteur),
    description: texte,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// 3. Le graphique et le tableau de mesures
// ════════════════════════════════════════════════════════════════════════════
//
// Repris de `4eme/maths/js/graphique.js`, dont l'esprit tient ici sans
// changement : ce ne sont pas des images à trouver quelque part, ce sont des
// coordonnées que le contenu possède déjà, rendues en SVG.
//
// Deux différences, et elles viennent toutes deux de la charte.
//
//   · `graphique` et `tableauDeMesures` prennent LE MÊME OBJET. Un tableau qui
//     contredirait son graphique est impossible, pas improbable — et « exploiter
//     un tableau » et « lire un graphique » sont deux savoir-faire distincts
//     servis à partir d'une seule donnée.
//   · un point hors cadre est REFUSÉ, là où le module de mathématiques le
//     filtrait en silence et signalait au build. La raison est l'invariant 6 :
//     la figure et la correction sortent du même objet, donc un point que le
//     tracé ne montre pas mais que la correction utilise EST le désaccord que
//     l'invariant refuse. Le refus porte les points fautifs dans `details`.
//
// Bénéfice écrit dans la charte, et c'est `toleranceDeLecture` qui le rend :
// « un graphique produit à partir d'un jeu de données et d'une graduation
// déclarés rend la tolérance CALCULABLE — une demi-graduation — au lieu d'être
// saisie à la main ». Sur les items de lecture graphique, qui en sont le gros du
// bataillon, la faille « la tolérance est un contenu faillible » se referme
// d'elle-même.

const L_GRAPH = 480;
const H_GRAPH = 320;
const MARGES_GRAPH = { gauche: 52, droite: 18, haut: 16, bas: 44 };
const GX0 = MARGES_GRAPH.gauche;
const GX1 = L_GRAPH - MARGES_GRAPH.droite;
const GY0 = MARGES_GRAPH.haut;
const GY1 = H_GRAPH - MARGES_GRAPH.bas;

/**
 * Les valeurs graduées d'un axe.
 *
 * Au-delà de onze étiquettes elles se chevauchent : on garde toutes les lignes
 * de la grille, on n'écrit qu'une graduation sur deux (ou sur trois). Une somme
 * répétée dériverait sur les pas décimaux (0,1 + 0,1 + 0,1 ≠ 0,3) : on
 * multiplie, et on arrondit au millième pour absorber le flottant.
 */
function graduations(axe) {
  const valeurs = [];
  const n = Math.round((axe.max - axe.min) / axe.pas);
  for (let i = 0; i <= n; i += 1) valeurs.push(Math.round((axe.min + i * axe.pas) * 1000) / 1000);
  const saut = Math.ceil(valeurs.length / 11);
  return valeurs.map((v, i) => ({ v, ecrite: i % saut === 0 }));
}

/** Un axe qu'on ne peut pas tracer, et un axe qu'on ne peut pas graduer.
 *
 *  Séparés, parce que les deux refus ne disent pas la même chose à l'auteur —
 *  et communs au tracé ET à la tolérance, parce que ces deux-là doivent refuser
 *  les mêmes axes. Une graduation plus large que l'axe lui-même ne pose aucune
 *  ligne de grille : elle rendrait une « demi-graduation » plus grande que tout
 *  ce que le graphique montre, c'est-à-dire une tolérance qui accepte tout. */
const axeIllisible = (a) => !a || !nombreFini(a.min) || !nombreFini(a.max) || a.max <= a.min;
const graduationIllisible = (a) => !nombreFini(a.pas) || a.pas <= 0 || a.pas > a.max - a.min;

/**
 * La tolérance de lecture d'un axe : une demi-graduation, dans l'unité de l'axe.
 *
 * Calculée, jamais saisie — c'est tout l'intérêt. `null` sur un axe que le tracé
 * refuserait, pour qu'aucun appelant ne dérive une tolérance d'un axe dont
 * aucune figure ne sortira. C'est un contrat, donc il se teste : le module
 * rendait auparavant une tolérance sur un axe renversé ou plat, que `graphique`
 * refuse — la tolérance d'un graphique qui n'existe pas.
 */
export function toleranceDeLecture(axe) {
  if (axeIllisible(axe) || graduationIllisible(axe)) return null;
  return axe.pas / 2;
}

/** Le contrat commun au graphique et au tableau — un seul objet, un seul
 *  verdict. Un jeu de données qui ne peut pas être tracé ne doit pas non plus
 *  ressortir en tableau : ce serait servir à l'élève une donnée dont on vient
 *  d'établir qu'elle est fausse, dans l'autre registre. */
function lireDonnees(d) {
  if (!d || !d.x || !d.y) return refus('DESCRIPTION_ABSENTE');
  for (const [nom, axe] of [['x', d.x], ['y', d.y]]) {
    if (axeIllisible(axe)) return refus('AXE_INVALIDE', [nom]);
    if (graduationIllisible(axe)) return refus('GRADUATION_INVALIDE', [nom]);
  }
  for (const [nom, liste] of [['points', d.points], ['reperes', d.reperes]]) {
    if (liste !== undefined && !Array.isArray(liste)) return refus('SERIE_MALFORMEE', [nom]);
  }
  const points = d.points ?? [];
  const reperes = d.reperes ?? [];
  const tous = [...points, ...reperes];
  // Une figure engendrée par rien n'est pas une figure vide, c'est une donnée
  // manquante : le dire évite qu'un élève cherche sur un quadrillage nu une
  // mesure que l'énoncé n'a jamais portée.
  if (tous.length === 0) return refus('AUCUNE_MESURE');
  const malformes = tous.filter((p) => !Array.isArray(p) || p.length !== 2 || !p.every(nombreFini));
  if (malformes.length) return refus('POINT_MALFORME', malformes);
  const dehors = tous.filter(([x, y]) => x < d.x.min || x > d.x.max || y < d.y.min || y > d.y.max);
  if (dehors.length) return refus('POINT_HORS_CADRE', dehors);
  return { ok: true, points, reperes };
}

const legendeAxe = (axe, defaut) => `${axe.titre ?? defaut}`;

/**
 * Le graphique d'un jeu de mesures.
 *
 *   {
 *     x: { titre: 'Temps (s)',    min: 0, max: 10, pas: 1 },
 *     y: { titre: 'Distance (m)', min: 0, max: 40, pas: 5 },
 *     points: [[0, 0], [10, 35]],
 *     relie: true,          // false : un nuage de points, sans segment
 *     reperes: [[4, 23]],   // le geste de lecture, montré sans être chiffré
 *     titre: '…',
 *   }
 */
export function graphique(donnees) {
  const lu = lireDonnees(donnees);
  if (!lu.ok) return lu;
  const g = donnees;

  const px = (v) => GX0 + ((v - g.x.min) / (g.x.max - g.x.min)) * (GX1 - GX0);
  const py = (v) => GY1 - ((v - g.y.min) / (g.y.max - g.y.min)) * (GY1 - GY0);

  const grille = [];
  const etiquettes = [];
  for (const { v, ecrite } of graduations(g.x)) {
    const x = px(v);
    grille.push(`<line x1="${u(x)}" y1="${GY0}" x2="${u(x)}" y2="${GY1}" class="g-grille" stroke="currentColor" stroke-opacity="0.2"/>`);
    if (ecrite) {
      grille.push(`<line x1="${u(x)}" y1="${GY1}" x2="${u(x)}" y2="${GY1 + 5}" class="g-axe" stroke="currentColor"/>`);
      etiquettes.push(`<text x="${u(x)}" y="${GY1 + 19}" class="g-nombre" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">${fr(v)}</text>`);
    }
  }
  for (const { v, ecrite } of graduations(g.y)) {
    const y = py(v);
    grille.push(`<line x1="${GX0}" y1="${u(y)}" x2="${GX1}" y2="${u(y)}" class="g-grille" stroke="currentColor" stroke-opacity="0.2"/>`);
    if (ecrite) {
      grille.push(`<line x1="${GX0 - 5}" y1="${u(y)}" x2="${GX0}" y2="${u(y)}" class="g-axe" stroke="currentColor"/>`);
      etiquettes.push(`<text x="${GX0 - 9}" y="${u(y + 4)}" class="g-nombre" text-anchor="end" font-size="13" fill="currentColor" stroke="none">${fr(v)}</text>`);
    }
  }

  const ligne = g.relie !== false && lu.points.length > 1
    ? `<polyline points="${lu.points.map(([x, y]) => `${u(px(x))},${u(py(y))}`).join(' ')}" class="g-trace" fill="none" stroke="var(--bleu-clair, currentColor)" stroke-width="2.5" stroke-linejoin="round"/>`
    : '';
  const disques = lu.points
    .map(([x, y]) => `<circle cx="${u(px(x))}" cy="${u(py(y))}" r="4" class="g-point" fill="var(--bleu, currentColor)"/>`)
    .join('');

  // Les pointillés du savoir-faire « lire une valeur » : ils montrent le geste —
  // monter depuis l'axe des abscisses, puis lire à gauche — sans écrire la
  // valeur, que l'élève doit trouver lui-même.
  const reperes = lu.reperes.map(([x, y]) => `<line x1="${u(px(x))}" y1="${GY1}" x2="${u(px(x))}" y2="${u(py(y))}" class="g-repere" stroke="var(--ambre, currentColor)" stroke-width="1.5" stroke-dasharray="4 3"/>`
    + `<line x1="${u(px(x))}" y1="${u(py(y))}" x2="${GX0}" y2="${u(py(y))}" class="g-repere" stroke="var(--ambre, currentColor)" stroke-width="1.5" stroke-dasharray="4 3"/>`
    + `<circle cx="${u(px(x))}" cy="${u(py(y))}" r="5" class="g-point g-point--vise" fill="var(--ambre, currentColor)"/>`).join('');

  // Sans point, la phrase d'énumération n'a rien à énumérer : elle se lisait
  // « 0 point : . », qui n'est une phrase dans aucun registre — et c'est une
  // synthèse vocale qui la prononce.
  const combien = lu.points.length;
  const description = `${g.titre ? `${g.titre}. ` : ''}Graphique. `
    + `En abscisse : ${legendeAxe(g.x, 'x')}, de ${fr(g.x.min)} à ${fr(g.x.max)} par ${fr(g.x.pas)}. `
    + `En ordonnée : ${legendeAxe(g.y, 'y')}, de ${fr(g.y.min)} à ${fr(g.y.max)} par ${fr(g.y.pas)}. `
    + (combien
      ? `${combien} point${combien > 1 ? 's' : ''} : `
        + `${lu.points.map(([x, y]) => `(${fr(x)} ; ${fr(y)})`).join(', ')}.`
      : 'Aucun point tracé.');

  const contenu = `${grille.join('')}`
    + `<line x1="${GX0}" y1="${GY1}" x2="${GX1 + 6}" y2="${GY1}" class="g-axe" stroke="currentColor" stroke-width="1.5"/>`
    + `<line x1="${GX0}" y1="${GY1}" x2="${GX0}" y2="${GY0 - 6}" class="g-axe" stroke="currentColor" stroke-width="1.5"/>`
    + `${reperes}${ligne}${disques}${etiquettes.join('')}`
    + `<text x="${GX1 + 4}" y="${GY1 + 32}" class="g-titre-axe" text-anchor="end" font-size="13" font-style="italic" fill="currentColor" stroke="none">${echapper(legendeAxe(g.x, ''))}</text>`
    + `<text x="${GX0 - 6}" y="${GY0 - 4}" class="g-titre-axe" text-anchor="start" font-size="13" font-style="italic" fill="currentColor" stroke="none">${echapper(legendeAxe(g.y, ''))}</text>`;

  return {
    ok: true,
    html: figure('graphique', g.titre, contenu, description, L_GRAPH, H_GRAPH),
    description,
  };
}

/**
 * Le tableau de mesures du MÊME jeu de données.
 *
 * Deux lignes, une par grandeur, dans l'ordre où les axes sont déclarés : c'est
 * la disposition des cahiers, et elle met les couples en colonnes.
 *
 * Le tableau n'est pas un SVG : il ne se met pas à l'échelle, il défile dans son
 * cadre. Une série de douze mesures réduite à la largeur d'un téléphone serait
 * illisible bien avant d'être débordante — mieux vaut faire glisser que rendre
 * les chiffres minuscules.
 */
export function tableauDeMesures(donnees) {
  const lu = lireDonnees(donnees);
  if (!lu.ok) return lu;
  if (lu.points.length === 0) return refus('AUCUNE_MESURE');
  const g = donnees;

  const ligne = (titre, valeurs) => `<tr><th scope="row">${echapper(titre)}</th>`
    + `${valeurs.map((v) => `<td>${fr(v)}</td>`).join('')}</tr>`;

  const description = `${g.titre ? `${g.titre}. ` : ''}Tableau de ${lu.points.length} mesures. `
    + `${legendeAxe(g.x, 'x')} et ${legendeAxe(g.y, 'y')} : `
    + `${lu.points.map(([x, y]) => `${fr(x)} ; ${fr(y)}`).join(', puis ')}.`;

  const html = `<figure class="tableau-mesures">
  ${g.titre ? `<figcaption>${echapper(g.titre)}</figcaption>` : ''}
  <div class="tableau-defile" style="overflow-x:auto">
    <table>
      <tbody>
        ${ligne(legendeAxe(g.x, 'x'), lu.points.map(([x]) => x))}
        ${ligne(legendeAxe(g.y, 'y'), lu.points.map(([, y]) => y))}
      </tbody>
    </table>
  </div>
</figure>`;

  return { ok: true, html, description };
}
