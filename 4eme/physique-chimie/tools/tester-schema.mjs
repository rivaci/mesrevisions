// Tests des figures engendrées, hors navigateur.
//
//     node tools/tester-schema.mjs
//
// Site (M) de la charte. L'épreuve décisive est l'invariant 6 : « tout schéma de
// circuit, schéma particulaire, graphique ou tableau de mesures qui n'est pas
// produit par le même objet formel que la correction est refusé ; toute
// référence à un fichier image dans un énoncé est refusée. »
//
// Une figure DÉCORATIVE passe tous les tests naïfs : elle est jolie, elle ne
// lève pas, elle contient bien un cercle et deux traits. Ce qui la distingue
// d'une figure ENGENDRÉE ne se voit qu'en faisant bouger l'objet formel. D'où
// les quatre attaques de ce fichier :
//
//   · l'invariance — deux écritures du même circuit (autres noms de nœuds,
//     fils de liaison, autre ordre de déclaration) doivent donner deux figures
//     qui représentent le même circuit : mêmes symboles sur les mêmes pistes,
//     mêmes noms, même cadre, mêmes jonctions. Pas la même chaîne : l'ordre de
//     deux dipôles interchangeables n'est pas une information du graphe, et
//     `signature` dit pourquoi ;
//   · la variance — dès que le graphe change (série → dérivation, interrupteur
//     ouvert → fermé, ampèremètre retourné), le SVG DOIT changer. Une figure qui
//     ne bouge pas quand l'objet bouge n'est pas engendrée, elle est plaquée ;
//   · la géométrie, qu'on relit sur le SVG rendu et non sur l'intention du
//     module : aucun fil n'en croise un autre, rien ne sort du `viewBox`,
//     aucune largeur en pixels, deux particules ne se chevauchent pas ;
//   · les entrées malformées — `null`, tableau vide, champ absent, nombre
//     d'atomes fractionnaire. Un verdict typé, jamais une exception, et jamais
//     une figure plausible tirée d'une donnée qu'on n'a pas comprise.
//
// La tolérance de lecture a son propre chapitre : la charte en fait le bénéfice
// collatéral de l'engendrement (« la tolérance devient calculable — une
// demi-graduation — au lieu d'être saisie »). Un module qui accepterait une
// tolérance déclarée, ou qui en rendrait une sur un axe dont aucune figure ne
// sort, rendrait le bénéfice à zéro sans que rien ne le signale.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  ELEMENTS,
  SORTES_DE_FIGURE,
  graphique,
  rendreFigure,
  schemaCircuit,
  schemaParticulaire,
  tableauDeMesures,
  toleranceDeLecture,
} from '../js/schema.js';

let passes = 0;
const echecs = [];

/** Un contrôle passe quand sa condition vaut exactement `true`.
 *
 *  La condition peut être une fonction, et c'est ce qu'on écrit dès qu'elle
 *  déréférence un résultat du module : une régression y lève, et une exception
 *  qui remonte tuerait la SUITE — c'est-à-dire tous les contrôles suivants, y
 *  compris ceux qui auraient nommé la panne. Un test qui explose ne rapporte
 *  rien ; il faut qu'il échoue. */
const verifier = (nom, condition) => {
  let issue;
  try {
    issue = typeof condition === 'function' ? condition() : condition;
  } catch (e) {
    echecs.push(`${nom} — a levé : ${e.message}`);
    return;
  }
  if (issue === true) passes += 1;
  else echecs.push(nom);
};

const ICI = dirname(fileURLToPath(import.meta.url));
// Le code seul : ce fichier PARLE de `Math.random` et de `<img src>` pour dire
// qu'il n'en veut pas, et un contrôle qui lirait les commentaires refuserait le
// module sur ses propres avertissements.
const SOURCE = readFileSync(join(ICI, '..', 'js', 'schema.js'), 'utf8')
  .split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');

// ── Relire le SVG rendu ─────────────────────────────────────────────────────
//
// Les tests qui suivent ne demandent pas au module ce qu'il a voulu dessiner :
// ils relisent ce qu'il a écrit. Un module qui calculerait juste et écrirait
// faux passerait tout contrôle fondé sur ses propres valeurs intermédiaires.

const NB = '(-?[\\d.]+)';
// `String(html ?? '')` : une régression qui ferait refuser une figure attendue
// rend `html === undefined`. Le contrôle doit alors ÉCHOUER en nommant ce qui
// manque, pas mourir sur un `matchAll` d'undefined à la ligne 90.
const lire = (html, motif) => [...String(html ?? '').matchAll(new RegExp(motif, 'g'))];

const lignes = (html) => lire(html, `<line x1="${NB}" y1="${NB}" x2="${NB}" y2="${NB}"([^>]*)>`)
  .map((m) => ({
    x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4], reste: m[5],
  }));

const cercles = (html) => lire(html, `<circle cx="${NB}" cy="${NB}" r="${NB}"([^>]*)>`)
  .map((m) => ({
    cx: +m[1], cy: +m[2], r: +m[3], reste: m[4],
  }));

const rectangles = (html) => lire(html, `<rect x="${NB}" y="${NB}" width="${NB}" height="${NB}"`)
  .map((m) => ({
    x: +m[1], y: +m[2], w: +m[3], h: +m[4],
  }));

const textes = (html) => lire(html, '<text ([^>]*)>([^<]*)</text>').map((m) => ({
  x: +(/(?:^|\s)x="(-?[\d.]+)"/.exec(m[1])?.[1] ?? NaN),
  y: +(/(?:^|\s)y="(-?[\d.]+)"/.exec(m[1])?.[1] ?? NaN),
  taille: +(/font-size="([\d.]+)"/.exec(m[1])?.[1] ?? NaN),
  ancre: /text-anchor="(\w+)"/.exec(m[1])?.[1] ?? 'start',
  centre: m[1].includes('text-anchor="middle"'),
  t: m[2],
}));

const cadre = (html) => {
  const m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(String(html ?? ''));
  return m ? { l: +m[1], h: +m[2] } : { l: NaN, h: NaN };
};

/** Le nom d'un dipôle est écrit sous son symbole, à 32 unités du fil. C'est ce
 *  qui permet de retrouver le centre de chaque symbole sans rien demander au
 *  module — donc de vérifier que deux écritures du même circuit dessinent le
 *  même symbole sous le même nom. */
function dipolesDessines(html) {
  const c = cercles(html);
  const l = lignes(html);
  const t = textes(html);
  const r = rectangles(html);
  const pres = (a, b) => Math.abs(a - b) < 0.6;
  return t.filter((e) => e.centre && e.taille === 15 && e.t !== '+').map((e) => {
    const cx = e.x;
    const cy = e.y - 32;
    const lettre = t.find((x) => x.taille === 19 && pres(x.x, cx) && pres(x.y, cy + 6))?.t;
    const rond17 = c.some((x) => pres(x.cx, cx) && pres(x.cy, cy) && x.r === 17);
    const plots = c.filter((x) => x.r === 3 && pres(x.cy, cy) && pres(Math.abs(x.cx - cx), 20)).length === 2;
    const barres = l.filter((x) => x.x1 === x.x2 && pres(Math.abs(x.x1 - cx), 7)
      && pres((x.y1 + x.y2) / 2, cy)).length === 2;
    const pave = r.some((x) => pres(x.x + x.w / 2, cx) && pres(x.y + x.h / 2, cy));
    let type = 'inconnu';
    if (lettre === 'M') type = 'moteur';
    else if (lettre === 'A') type = 'amperemetre';
    else if (lettre === 'V') type = 'voltmetre';
    else if (rond17) type = 'lampe';
    else if (plots) type = 'interrupteur';
    else if (barres) type = 'pile';
    else if (pave) type = 'resistance';
    return { nom: e.t, type, x: cx, y: cy };
  });
}

/** La signature topologique d'un schéma : ce qui doit être égal pour deux
 *  écritures d'un même circuit.
 *
 *  Elle n'exige NI le même ordre de gauche à droite, NI la même branche pour
 *  deux dipôles interchangeables, et ce n'est pas une faiblesse du test : c'est
 *  l'équivalence que `circuit.js` définit. Il trie les enfants d'un nœud SÉRIE
 *  et d'un nœud PARALLÈLE, et il oublie les identifiants dans la clé — « L1
 *  au-dessus de L2 » n'est donc PAS une information du graphe, et exiger que la
 *  figure la conserve reviendrait à exiger d'elle plus que ce que l'objet
 *  formel porte. Ce qui doit tenir : mêmes symboles, mêmes pistes, même cadre,
 *  mêmes jonctions, mêmes noms. */
const signature = (html) => JSON.stringify({
  cadre: cadre(html),
  symboles: dipolesDessines(html).map((d) => `${d.type}@${d.y}`).sort(),
  noms: dipolesDessines(html).map((d) => d.nom).sort(),
  jonctions: cercles(html).filter((c) => c.r === 4).map((c) => c.cy).sort(),
  fils: lignes(html).length,
});

/** Deux fils se croisent quand un segment vertical traverse un segment
 *  horizontal AILLEURS qu'à une extrémité. Un croisement est lu par l'élève
 *  comme une connexion : le module affirme qu'il n'en produit aucun. */
function croisements(html) {
  const l = lignes(html);
  const h = l.filter((s) => s.y1 === s.y2 && s.x1 !== s.x2);
  const v = l.filter((s) => s.x1 === s.x2 && s.y1 !== s.y2);
  const strictement = (a, x, b) => Math.min(a, b) + 1e-9 < x && x < Math.max(a, b) - 1e-9;
  const trouves = [];
  for (const a of h) {
    for (const b of v) {
      if (strictement(a.x1, b.x1, a.x2) && strictement(b.y1, a.y1, b.y2)) trouves.push([a, b]);
    }
  }
  return trouves;
}

/** Ce qui sort du cadre. Le texte est mesuré large (0,62 em par caractère) :
 *  on ne cherche pas la métrique exacte, on cherche l'étiquette posée hors du
 *  dessin — celle que l'élève ne verra jamais. */
function debordements(html) {
  const { l, h } = cadre(html);
  if (!Number.isFinite(l) || !Number.isFinite(h)) return ['aucun cadre'];
  const dehors = [];
  for (const c of cercles(html)) {
    if (c.cx - c.r < -0.5 || c.cx + c.r > l + 0.5 || c.cy - c.r < -0.5 || c.cy + c.r > h + 0.5) {
      dehors.push(`cercle ${c.cx},${c.cy}`);
    }
  }
  for (const s of lignes(html)) {
    for (const [x, y] of [[s.x1, s.y1], [s.x2, s.y2]]) {
      if (x < -0.5 || x > l + 0.5 || y < -0.5 || y > h + 0.5) dehors.push(`fil ${x},${y}`);
    }
  }
  for (const t of textes(html)) {
    const large = t.t.length * t.taille * 0.62;
    const g = t.ancre === 'middle' ? t.x - large / 2 : (t.ancre === 'end' ? t.x - large : t.x);
    if (g < -0.5 || g + large > l + 0.5 || t.y > h + 0.5) dehors.push(`texte ${t.t}`);
  }
  return dehors;
}

const dip = (id, type, moins, plus, extra = {}) => ({ id, type, bornes: [moins, plus], ...extra });

// ════════════════════════════════════════════════════════════════════════════
// 1. L'invariant 6 — la figure est-elle engendrée ?
// ════════════════════════════════════════════════════════════════════════════

// ── 1.1 Deux écritures du même circuit ──────────────────────────────────────
//
// Même circuit, écrit deux fois : autres noms de nœuds, deux fils de liaison en
// plus, dipôles déclarés dans un autre ordre. Le graphe est le même, la figure
// doit représenter le même circuit.

const SERIE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat: 'ferme' }),
  ],
};
const SERIE_AUTRE_ECRITURE = {
  dipoles: [
    dip('K', 'interrupteur', 'y3', 'y4', { etat: 'ferme' }),
    dip('w2', 'fil', 'y4', 'y5'),
    dip('L1', 'lampe', 'y2', 'y3'),
    dip('w1', 'fil', 'y5', 'y1'),
    dip('P', 'pile', 'y1', 'y2'),
  ],
};

const sA = schemaCircuit(SERIE);
const sB = schemaCircuit(SERIE_AUTRE_ECRITURE);
verifier('deux écritures du même circuit série sont toutes deux dessinables', sA.ok && sB.ok);
verifier('… et représentent le même circuit (mêmes symboles, même cadre, mêmes jonctions)',
  signature(sA.html) === signature(sB.html));
verifier('… un fil de liaison n\'est pas dessiné comme un composant de plus',
  dipolesDessines(sB.html).length === 3);
verifier('… et n\'apparaît pas dans la description',
  !sB.description.includes('w1') && !sB.description.includes('un fil'));

// Une dérivation, où l'écriture change en plus la répartition sur les pistes.
const DERIVATION = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('A', 'amperemetre', 'b', 'm'),
    dip('L1', 'lampe', 'm', 'a'),
    dip('L2', 'lampe', 'm', 'a'),
  ],
};
const DERIVATION_AUTRE_ECRITURE = {
  dipoles: [
    dip('L2', 'lampe', 'n2', 'n9'),
    dip('w', 'fil', 'n9', 'n1'),
    dip('P', 'pile', 'n1', 'n0'),
    dip('L1', 'lampe', 'n2', 'n1'),
    dip('A', 'amperemetre', 'n0', 'n2'),
  ],
};
const dA = schemaCircuit(DERIVATION);
const dB = schemaCircuit(DERIVATION_AUTRE_ECRITURE);
verifier('deux écritures d\'un circuit mixte sont toutes deux dessinables', dA.ok && dB.ok);
verifier('… et représentent le même circuit', signature(dA.html) === signature(dB.html));
verifier('… les deux lampes sont sur deux pistes différentes',
  new Set(dipolesDessines(dA.html).filter((d) => d.type === 'lampe').map((d) => d.y)).size === 2);
verifier('… l\'ampèremètre reste seul sur la piste du haut, en série', () => {
  const places = dipolesDessines(dA.html);
  const a = places.find((d) => d.nom === 'A');
  const l1 = places.find((d) => d.nom === 'L1');
  return a !== undefined && l1 !== undefined && a.y === l1.y;
});

// ── 1.2 Le SVG bouge quand le graphe bouge ──────────────────────────────────
//
// C'est le test qui sépare une figure engendrée d'une figure décorative. Chaque
// couple ci-dessous ne diffère que par UN caractère du graphe.

const dessin = (c) => schemaCircuit(c).html;

const SERIE_DEUX_LAMPES = {
  dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'), dip('L2', 'lampe', 'c', 'a')],
};
const DERIVATION_DEUX_LAMPES = {
  dipoles: [dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'a'), dip('L2', 'lampe', 'b', 'a')],
};
verifier('série et dérivation de deux lampes ne donnent pas le même dessin',
  dessin(SERIE_DEUX_LAMPES) !== dessin(DERIVATION_DEUX_LAMPES));
verifier('… et pas la même description parlée',
  schemaCircuit(SERIE_DEUX_LAMPES).description.includes('en série')
  && schemaCircuit(DERIVATION_DEUX_LAMPES).description.includes('en dérivation'));
verifier('… la dérivation est plus haute que la série (deux pistes)',
  cadre(dessin(DERIVATION_DEUX_LAMPES)).h > cadre(dessin(SERIE_DEUX_LAMPES)).h);
verifier('… et porte des points de jonction, que la série n\'a pas',
  cercles(dessin(DERIVATION_DEUX_LAMPES)).filter((c) => c.r === 4).length === 4
  && cercles(dessin(SERIE_DEUX_LAMPES)).filter((c) => c.r === 4).length === 0);

const interrupteur = (etat) => ({
  dipoles: [
    dip('P', 'pile', 'a', 'b'), dip('L1', 'lampe', 'b', 'c'),
    dip('K', 'interrupteur', 'c', 'a', { etat }),
  ],
});
verifier('un interrupteur ouvert ne se dessine pas comme un interrupteur fermé',
  dessin(interrupteur('ouvert')) !== dessin(interrupteur('ferme')));
verifier('… et la description le dit',
  schemaCircuit(interrupteur('ouvert')).description.includes('interrupteur ouvert'));
verifier('… l\'interrupteur ouvert garde ses deux plots (une coupure, pas une absence)',
  cercles(dessin(interrupteur('ouvert'))).filter((c) => c.r === 3).length === 2);

const ampereMetre = (m, p) => ({
  dipoles: [dip('P', 'pile', 'a', 'b'), dip('A', 'amperemetre', m, p), dip('L1', 'lampe', 'c', 'a')],
});
const marque = (html) => textes(html).filter((t) => t.t === '+').map((t) => t.x);
verifier('un ampèremètre monté à l\'envers ne se dessine pas comme un ampèremètre à l\'endroit',
  dessin(ampereMetre('c', 'b')) !== dessin(ampereMetre('b', 'c')));
verifier('… la marque « + » change de côté, et elle seule',
  marque(dessin(ampereMetre('c', 'b')))[0] !== marque(dessin(ampereMetre('b', 'c')))[0]);

verifier('renommer un dipôle change la figure',
  dessin(SERIE) !== dessin({ dipoles: [...SERIE.dipoles.slice(0, 1), { ...SERIE.dipoles[1], nom: 'Lampe du bureau' }, ...SERIE.dipoles.slice(2)] }));
const TROIS_EN_SERIE = {
  dipoles: [...SERIE_DEUX_LAMPES.dipoles.slice(0, 2),
    dip('L2', 'lampe', 'c', 'd'), dip('L3', 'lampe', 'd', 'a')],
};
verifier('ajouter un dipôle en série élargit le cadre',
  cadre(dessin(TROIS_EN_SERIE)).l > cadre(dessin(SERIE_DEUX_LAMPES)).l);

// Retourner la pile retourne le sens du courant. Sur un circuit qui ne porte
// aucun dipôle polarisé, c'est le même circuit et la figure a le droit d'être
// la même ; dès qu'un appareil de mesure est là, le retournement se voit — et
// c'est le cas qui compte, puisque c'est celui qu'on évalue.
const pileInversee = { dipoles: [dip('P', 'pile', 'b', 'a'), ...ampereMetre('c', 'b').dipoles.slice(1)] };
verifier('retourner la pile retourne le branchement de l\'ampèremètre, donc la figure',
  dessin(ampereMetre('c', 'b')) !== dessin(pileInversee));

// ── 1.3 Le déterminisme ─────────────────────────────────────────────────────
//
// « Deux appels sur le même objet rendent exactement la même chaîne — sans quoi
// "la figure est engendrée par l'objet" serait faux dès le second affichage. »

const EAU = {
  etat: 'liquide',
  contenu: [{
    nom: 'eau', formule: 'H₂O', nombre: 6, atomes: [{ element: 'O' }, { element: 'H', nombre: 2 }],
  }],
};
verifier('deux appels sur le même circuit rendent la même chaîne', dessin(SERIE) === dessin(SERIE));
verifier('deux appels sur le même schéma particulaire rendent la même chaîne',
  schemaParticulaire(EAU).html === schemaParticulaire(EAU).html);
verifier('le module ne tire aucun nombre au hasard et ne lit aucune horloge',
  !/Math\.random|new Date|Date\.now/.test(SOURCE));
verifier('une graine différente donne un désordre différent',
  schemaParticulaire({ ...EAU, graine: 1 }).html !== schemaParticulaire({ ...EAU, graine: 2 }).html);
verifier('… mais la même composition',
  schemaParticulaire({ ...EAU, graine: 1 }).description === schemaParticulaire({ ...EAU, graine: 2 }).description);

// ── 1.4 Aucun chemin de fichier image ───────────────────────────────────────
//
// C'est la moitié CONTRÔLABLE de l'invariant 6 : l'intention d'un auteur n'est
// pas détectable, un `<img src>` l'est.

verifier('le module n\'écrit jamais de balise image',
  !/<img|<image|xlink:href|<use\b/i.test(SOURCE));
verifier('le module ne mentionne aucun fichier image',
  !/\.(png|jpe?g|gif|webp|bmp|avif)\b/i.test(SOURCE));
verifier('le module ne charge rien depuis une URL', !/https?:\/\/|url\(/i.test(SOURCE));
verifier('aucune fonction ne prend de chemin de fichier',
  !/readFile|fetch\(|import\(/.test(SOURCE));

// Et si un auteur en glisse un quand même, il ne doit pas ressortir dans le
// balisage : ni comme attribut, ni comme texte non échappé.
const AVEC_IMAGE = schemaCircuit(SERIE, { titre: '<img src="triche.png">', image: 'triche.png' });
verifier('un champ `image` passé en option est ignoré', !AVEC_IMAGE.html.includes('triche.png"'));
verifier('… et un titre qui contient du balisage est échappé',
  !AVEC_IMAGE.html.includes('<img') && AVEC_IMAGE.html.includes('&lt;img'));
const partAvecImage = schemaParticulaire({ ...EAU, image: 'eau.png', titre: '<b>eau</b>' });
verifier('le schéma particulaire ignore lui aussi un champ `image`',
  !partAvecImage.html.includes('eau.png') && !partAvecImage.html.includes('<b>'));
const graphAvecImage = graphique({
  x: { titre: 'Temps (s)', min: 0, max: 10, pas: 1 },
  y: { titre: 'Distance (m)', min: 0, max: 40, pas: 5 },
  points: [[0, 0], [10, 35]],
  image: 'courbe.png',
  titre: '<svg onload=1>',
});
verifier('le graphique ignore lui aussi un champ `image`',
  !graphAvecImage.html.includes('courbe.png') && !graphAvecImage.html.includes('<svg onload'));

// ── 1.5 Aucune largeur en pixels, rien ne déborde à 375 px ──────────────────
//
// Rien n'est fixé en pixels : la figure se met à l'échelle du téléphone, et la
// question « déborde-t-elle à 375 px ? » n'a pas de réponse à donner — elle n'a
// pas lieu d'être posée. Ce qui se vérifie, c'est qu'aucune longueur absolue
// n'est écrite, et que rien ne sort du `viewBox`.

const TOUTES = [
  dessin(SERIE), dessin(DERIVATION), dessin(SERIE_DEUX_LAMPES),
  dessin(DERIVATION_DEUX_LAMPES), dessin(interrupteur('ouvert')),
  schemaParticulaire(EAU).html,
  schemaParticulaire({ etat: 'gaz', contenu: [{ nom: 'fer', formule: 'Fe', nombre: 9, atomes: [{ element: 'Fe' }] }] }).html,
  graphAvecImage.html,
];
verifier('aucune figure n\'écrit de longueur en pixels',
  TOUTES.every((h) => !/\dpx|width:\s*\d|height:\s*\d/.test(h)));
verifier('aucune figure ne fixe la largeur ou la hauteur du SVG',
  TOUTES.every((h) => !/<svg[^>]*\swidth=|<svg[^>]*\sheight=/.test(h)));
verifier('toutes portent un viewBox', TOUTES.every((h) => /<svg[^>]*viewBox="0 0 [\d.]+ [\d.]+"/.test(h)));
verifier('rien ne sort du viewBox', TOUTES.every((h) => debordements(h).length === 0));
verifier('le tableau de mesures, qui n\'est pas un SVG, défile dans son cadre',
  tableauDeMesures({
    x: { titre: 't (s)', min: 0, max: 5, pas: 1 }, y: { titre: 'd (m)', min: 0, max: 5, pas: 1 },
    points: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
  }).html.includes('overflow-x:auto'));

// ── 1.6 La tolérance de lecture : une demi-graduation, CALCULÉE ─────────────

verifier('la tolérance vaut la demi-graduation', toleranceDeLecture({ min: 0, max: 10, pas: 5 }) === 2.5);
verifier('… quel que soit le pas', toleranceDeLecture({ min: 0, max: 4, pas: 0.2 }) === 0.1);
verifier('… et elle ne dépend pas des bornes',
  toleranceDeLecture({ min: 100, max: 200, pas: 10 }) === toleranceDeLecture({ min: 0, max: 100, pas: 10 }));
verifier('une tolérance déclarée par l\'auteur est ignorée',
  toleranceDeLecture({ min: 0, max: 10, pas: 1, tolerance: 999 }) === 0.5);
verifier('un axe sans graduation ne donne pas de tolérance',
  toleranceDeLecture({ min: 0, max: 10 }) === null);
verifier('un pas nul non plus', toleranceDeLecture({ min: 0, max: 10, pas: 0 }) === null);
verifier('un pas négatif non plus', toleranceDeLecture({ min: 0, max: 10, pas: -1 }) === null);
verifier('un axe absent non plus', toleranceDeLecture(null) === null && toleranceDeLecture(undefined) === null);
verifier('un pas non numérique non plus', toleranceDeLecture({ min: 0, max: 10, pas: '1' }) === null);

// Le contrat que le module s'impose : `null` EXACTEMENT sur les axes dont
// aucune figure ne sort. Une tolérance rendue sur un axe que le tracé refuse
// serait une tolérance dérivée d'un graphique qui n'existe pas — la faille que
// l'invariant referme, rouverte par l'autre bout.
const AXES = [
  { min: 0, max: 10, pas: 5 },
  { min: 0, max: 10, pas: 0 },
  { min: 0, max: 10, pas: -1 },
  { min: 10, max: 0, pas: 1 },
  { min: 5, max: 5, pas: 1 },
  { min: NaN, max: 10, pas: 1 },
  { min: 0, max: Infinity, pas: 1 },
  { min: 0, max: 10, pas: 30 },
  { min: 0, max: 10, pas: 1 },
];
const desaccords = AXES.filter((axe) => {
  const trace = graphique({ x: axe, y: { min: 0, max: 10, pas: 1 }, points: [[axe.min ?? 0, 0]] });
  return trace.ok !== (toleranceDeLecture(axe) !== null);
});
verifier(`la tolérance est nulle exactement quand le tracé refuse l'axe (${desaccords.length} désaccord(s))`,
  desaccords.length === 0);
verifier('une graduation plus large que l\'axe lui-même est refusée : il n\'y a rien à lire',
  toleranceDeLecture({ min: 0, max: 10, pas: 30 }) === null);

// ════════════════════════════════════════════════════════════════════════════
// 2. Le schéma de circuit
// ════════════════════════════════════════════════════════════════════════════

// ── 2.1 Aucun fil n'en croise un autre ──────────────────────────────────────
//
// « Un croisement sur un schéma de circuit est lu par l'élève comme une
// connexion. » C'est une affirmation du module ; elle se relit sur le tracé.

const MIXTE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'c'),
    dip('L2', 'lampe', 'c', 'a'),
    dip('L3', 'lampe', 'c', 'a'),
  ],
};
const IMBRIQUE = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('K', 'interrupteur', 'b', 'e', { etat: 'ferme' }),
    dip('L1', 'lampe', 'e', 'c'),
    dip('L2', 'lampe', 'e', 'd'),
    dip('L3', 'lampe', 'd', 'c'),
    dip('L4', 'lampe', 'd', 'c'),
    dip('R', 'resistance', 'c', 'a'),
  ],
};
const TROIS_BRANCHES = {
  dipoles: [
    dip('P', 'pile', 'a', 'b'),
    dip('L1', 'lampe', 'b', 'a'),
    dip('L2', 'lampe', 'b', 'a'),
    dip('M', 'moteur', 'b', 'a'),
  ],
};
for (const [nom, c] of [['série', SERIE], ['mixte', MIXTE], ['imbriqué', IMBRIQUE],
  ['trois branches', TROIS_BRANCHES], ['dérivation', DERIVATION]]) {
  const html = schemaCircuit(c).html;
  verifier(`aucun fil n'en croise un autre (${nom})`, croisements(html).length === 0);
  verifier(`rien ne sort du cadre (${nom})`, debordements(html).length === 0);
  // Un fil de raccordement tracé à l'envers (x2 < x1) est le signe qu'une case
  // est devenue plus étroite que le symbole qu'elle doit contenir : le symbole
  // déborde alors sur les jonctions voisines, et le schéma se met à montrer des
  // contacts que le graphe ne porte pas.
  verifier(`aucun fil n'est tracé à l'envers (${nom})`,
    lignes(html).every((s) => s.x2 >= s.x1 - 1e-9 || s.x1 === s.x2));
  verifier(`chaque symbole tient dans sa case (${nom})`, (() => {
    const dessines = dipolesDessines(html);
    return cercles(html).filter((c2) => c2.r === 4).every((j) => dessines
      .every((d) => Math.hypot(d.x - j.cx, d.y - j.cy) > 17));
  }));
}

// ── 2.2 Ce que le dessin doit porter ────────────────────────────────────────

const dessinIMB = schemaCircuit(IMBRIQUE).html;
verifier('chaque dipôle du graphe est dessiné une fois et une seule',
  dipolesDessines(dessinIMB).length === 7);
verifier('… avec le bon symbole pour chacun', () => dipolesDessines(dessinIMB).every((d) => d.type !== 'inconnu')
  && dipolesDessines(dessinIMB).find((d) => d.nom === 'R')?.type === 'resistance'
  && dipolesDessines(dessinIMB).find((d) => d.nom === 'K')?.type === 'interrupteur'
  && dipolesDessines(dessinIMB).find((d) => d.nom === 'P')?.type === 'pile');
verifier('la pile est seule sur la ligne du bas',
  dipolesDessines(dessinIMB).filter((d) => d.y === Math.max(...dipolesDessines(dessinIMB).map((x) => x.y))).length === 1);

// La barre longue (le « + ») est à gauche : le réseau extérieur est orienté du
// « + » vers le « − », et la pile est retournée. Un schéma qui montrerait
// l'inverse enseignerait la mauvaise polarité.
const barresPile = lignes(dessin(SERIE)).filter((s) => s.x1 === s.x2 && Math.abs(s.y1 - s.y2) > 10);
const longue = barresPile.find((s) => Math.abs(s.y1 - s.y2) === 32);
const courte = barresPile.find((s) => Math.abs(s.y1 - s.y2) === 16);
verifier('la borne « + » de la pile (barre longue et fine) est à gauche de la barre « − »',
  longue !== undefined && courte !== undefined && longue.x1 < courte.x1);
verifier('… et la barre « − » est la plus épaisse', () => courte.reste.includes('stroke-width="5"'));

verifier('un ampèremètre porte la lettre A et la marque de sa borne « + »',
  textes(dessin(DERIVATION)).some((t) => t.t === 'A' && t.taille === 19)
  && marque(dessin(DERIVATION)).length === 1);
verifier('la couleur du trait n\'est jamais codée en dur',
  !/stroke="#|fill="#/.test(dessin(IMBRIQUE)));
verifier('les couleurs des atomes passent par une variable CSS avec repli',
  Object.values(ELEMENTS).every((e) => /^var\(--atome-[a-z]+, #[0-9a-f]{6}\)$/.test(e.couleur)));

// ── 2.3 La description parlée est engendrée par le dessin ───────────────────
//
// « Chaque figure porte un aria-label engendré du même objet que le dessin — un
// élève qui n'accède pas au tracé reçoit la même information, pas moins. » Donc
// l'inventaire suit la figure, et non l'ordre où l'auteur a tapé ses dipôles.

const aria = (html) => /aria-label="([^"]*)"/.exec(String(html ?? ''))?.[1] ?? '';
verifier('la description est bien portée par l\'aria-label',
  aria(dessin(SERIE)) === schemaCircuit(SERIE).description
    .replace(/</g, '&lt;').replace(/>/g, '&gt;'));
const ordreDessine = dipolesDessines(dessinIMB).map((d) => d.nom);
const ordreDit = [...schemaCircuit(IMBRIQUE).description.matchAll(/([^\s;:]+), un[e]? /g)].map((m) => m[1]);
verifier('l\'inventaire parlé suit l\'ordre du dessin, pas celui de la déclaration',
  JSON.stringify(ordreDit) === JSON.stringify(ordreDessine));
verifier('deux écritures du même circuit disent le même inventaire',
  JSON.stringify([...sA.description.matchAll(/([^\s;:]+), un[e]? /g)].map((m) => m[1]).sort())
  === JSON.stringify([...sB.description.matchAll(/([^\s;:]+), un[e]? /g)].map((m) => m[1]).sort()));
verifier('la description nomme l\'allure du circuit',
  schemaCircuit(MIXTE).description.includes('mixte'));

// ── 2.4 Les refus ───────────────────────────────────────────────────────────

const refuse = (r, raison) => r && r.ok === false && r.raison === raison && Array.isArray(r.details);
verifier('un circuit absent est refusé, pas dessiné', refuse(schemaCircuit(null), 'GRAPHE_VIDE'));
verifier('un circuit sans dipôle aussi', refuse(schemaCircuit({ dipoles: [] }), 'GRAPHE_VIDE'));
verifier('un circuit undefined aussi', refuse(schemaCircuit(undefined), 'GRAPHE_VIDE'));
verifier('un dipôle sans identifiant aussi',
  refuse(schemaCircuit({ dipoles: [{ type: 'pile', bornes: ['a', 'b'] }] }), 'DIPOLE_SANS_ID'));
verifier('un type inventé aussi',
  refuse(schemaCircuit({ dipoles: [dip('X', 'condensateur', 'a', 'b')] }), 'TYPE_INCONNU'));
verifier('une borne manquante aussi',
  refuse(schemaCircuit({ dipoles: [{ id: 'P', type: 'pile', bornes: ['a'] }] }), 'BORNES_INVALIDES'));
verifier('une pile toute seule est refusée, pas dessinée en boucle vide',
  schemaCircuit({ dipoles: [dip('P', 'pile', 'a', 'b')] }).ok === false);
verifier('un circuit sans générateur est refusé',
  refuse(schemaCircuit({ dipoles: [dip('L1', 'lampe', 'a', 'b'), dip('L2', 'lampe', 'b', 'a')] }), 'PAS_DE_GENERATEUR'));
verifier('deux générateurs sont refusés (pas de sens du courant à ancrer)',
  refuse(schemaCircuit({
    dipoles: [dip('P1', 'pile', 'a', 'b'), dip('P2', 'pile', 'b', 'c'), dip('L1', 'lampe', 'c', 'a')],
  }), 'PLUSIEURS_GENERATEURS'));

// Un pont de Wheatstone n'est pas série-parallèle : le module doit refuser
// plutôt que dessiner « à peu près » un circuit qu'il ne sait pas lire.
const PONT = {
  dipoles: [
    dip('P', 'pile', 'a', 'd'),
    dip('R1', 'resistance', 'd', 'b'), dip('R2', 'resistance', 'd', 'c'),
    dip('R3', 'resistance', 'b', 'a'), dip('R4', 'resistance', 'c', 'a'),
    dip('R5', 'resistance', 'b', 'c'),
  ],
};
verifier('un pont non série-parallèle est refusé, jamais approché',
  refuse(schemaCircuit(PONT), 'NON_SERIE_PARALLELE'));
verifier('le refus est distinguable d\'une figure vide',
  schemaCircuit(PONT).html === undefined && schemaCircuit(PONT).ok === false);

// ── 2.5 L'échappement ───────────────────────────────────────────────────────

const HOSTILE = schemaCircuit({
  dipoles: [
    dip('P', 'pile', 'a', 'b', { nom: '<script>alert(1)</script>' }),
    dip('L1', 'lampe', 'b', 'a', { nom: 'L"1 & L\'2' }),
  ],
}, { titre: '</svg><script>x</script>' });
verifier('un nom de dipôle hostile ne sort pas en balisage',
  !HOSTILE.html.includes('<script') && HOSTILE.html.includes('&lt;script&gt;'));
verifier('… ni dans l\'aria-label', !/aria-label="[^"]*<|aria-label="[^"]*"[^>]*>alert/.test(HOSTILE.html));
verifier('… l\'esperluette et le guillemet sont échappés une seule fois',
  HOSTILE.html.includes('L&quot;1 &amp; L\'2') && !HOSTILE.html.includes('&amp;amp;'));

// ════════════════════════════════════════════════════════════════════════════
// 3. Le schéma particulaire
// ════════════════════════════════════════════════════════════════════════════

// ── 3.1 Le rayon est une propriété de l'élément, jamais de l'état ───────────
//
// Invariant 20 : « un schéma particulaire dont le rayon d'une même espèce varie
// entre deux états » est refusé. Ici, c'est inatteignable par construction —
// donc c'est exactement ce qu'il faut vérifier, sinon la construction a bougé.

const FER = (etat) => ({
  etat, contenu: [{ nom: 'fer', formule: 'Fe', nombre: 9, atomes: [{ element: 'Fe' }] }], graine: 3,
});
const rayons = (html) => [...new Set(cercles(html).map((c) => c.r))].sort((a, b) => a - b);
verifier('le rayon d\'une espèce ne change pas entre solide, liquide et gaz',
  JSON.stringify(rayons(schemaParticulaire(FER('solide')).html))
  === JSON.stringify(rayons(schemaParticulaire(FER('gaz')).html))
  && JSON.stringify(rayons(schemaParticulaire(FER('liquide')).html))
  === JSON.stringify(rayons(schemaParticulaire(FER('gaz')).html)));
verifier('… et c\'est bien le rayon déclaré dans la table des éléments',
  rayons(schemaParticulaire(FER('solide')).html).includes(ELEMENTS.Fe.rayon));
verifier('le gaz occupe plus de place que le solide (l\'écart change, pas le grain)',
  cadre(schemaParticulaire(FER('gaz')).html).l > cadre(schemaParticulaire(FER('solide')).html).l);
verifier('le solide est ordonné : aucun décalage aléatoire',
  new Set(cercles(schemaParticulaire(FER('solide')).html).slice(0, 9).map((c) => c.cy)).size === 3);
verifier('le liquide, lui, est désordonné',
  new Set(cercles(schemaParticulaire(FER('liquide')).html).slice(0, 9).map((c) => c.cy)).size > 3);

// ── 3.2 Deux particules peuvent se toucher, jamais se chevaucher ────────────
//
// « Des particules qui s'interpénètrent enseigneraient que la matière se
// comprime en écrasant ses grains, c'est-à-dire l'inverse du modèle. » Sur une
// espèce monoatomique, chaque disque EST une particule : le contrôle est exact.

function chevauchements(html, tolerance = 0.01) {
  const c = cercles(html);
  const paires = [];
  for (let i = 0; i < c.length; i += 1) {
    for (let j = i + 1; j < c.length; j += 1) {
      const d = Math.hypot(c[i].cx - c[j].cx, c[i].cy - c[j].cy);
      if (d < c[i].r + c[j].r - tolerance) paires.push([i, j]);
    }
  }
  return paires;
}
for (const etat of ['solide', 'liquide', 'gaz']) {
  verifier(`aucun atome n'en chevauche un autre (${etat})`,
    chevauchements(schemaParticulaire(FER(etat)).html).length === 0);
}
for (let graine = 1; graine <= 25; graine += 1) {
  const html = schemaParticulaire({ ...FER('liquide'), graine }).html;
  if (chevauchements(html).length) { verifier(`désordre du liquide, graine ${graine}`, false); break; }
  if (graine === 25) verifier('vingt-cinq graines de désordre, aucun chevauchement', true);
}

// Dans une molécule, le centre recouvre volontairement ses voisins — c'est ce
// qui figure la liaison. Les atomes PÉRIPHÉRIQUES, eux, doivent rester
// comptables : la composition est l'attendu, et on ne compte pas des disques
// dont le centre tombe dans le voisin.
function peripheriquesLisibles(html, plat) {
  const n = plat.length - 1;
  if (n < 2) return true;
  const c = cercles(html);
  // Les n premiers disques de chaque molécule sont sa périphérie (le centre est
  // tracé en dernier), et la légende répète la molécule une fois.
  for (let base = 0; base + plat.length <= c.length; base += plat.length) {
    const peri = c.slice(base, base + n);
    for (let i = 0; i < peri.length; i += 1) {
      for (let j = i + 1; j < peri.length; j += 1) {
        const d = Math.hypot(peri[i].cx - peri[j].cx, peri[i].cy - peri[j].cy);
        // La même règle que pour deux particules du récipient : elles peuvent se
        // toucher, jamais se chevaucher. Seul l'atome CENTRAL a le droit de
        // recouvrir ses voisins — c'est lui qui figure la liaison.
        //
        // Le jeu de 0,2 est celui de l'arrondi au dixième des coordonnées, pas
        // une indulgence : deux voisines qui se touchent exactement peuvent
        // s'écrire à un dixième l'une de l'autre. Un vrai chevauchement se
        // compte en unités — celui qu'on cherche valait treize.
        if (d < peri[i].r + peri[j].r - 0.2) return false;
      }
    }
  }
  return true;
}

/** Deux MOLÉCULES ne se chevauchent pas davantage que deux atomes : la place
 *  réservée à une espèce dans la grille doit être celle qu'elle occupe
 *  vraiment. Sur une espèce unique, les disques se lisent par paquets de
 *  `taille` — la périphérie puis le centre, molécule après molécule. */
function moleculesDisjointes(html, taille) {
  const c = cercles(html);
  const paquets = [];
  for (let base = 0; base + taille <= c.length; base += taille) paquets.push(c.slice(base, base + taille));
  for (let a = 0; a < paquets.length; a += 1) {
    for (let b = a + 1; b < paquets.length; b += 1) {
      for (const x of paquets[a]) {
        for (const y of paquets[b]) {
          if (Math.hypot(x.cx - y.cx, x.cy - y.cy) < x.r + y.r - 0.2) return false;
        }
      }
    }
  }
  return true;
}

const METHANE = {
  etat: 'gaz', graine: 5,
  contenu: [{ nom: 'méthane', formule: 'CH₄', nombre: 4, atomes: [{ element: 'C' }, { element: 'H', nombre: 4 }] }],
};
const GLUCOSE = {
  etat: 'solide', graine: 5,
  contenu: [{
    nom: 'glucose', formule: 'C₆H₁₂O₆', nombre: 2,
    atomes: [{ element: 'C' }, { element: 'C', nombre: 5 }, { element: 'O', nombre: 6 }],
  }],
};
verifier('les atomes d\'une molécule d\'eau restent comptables',
  peripheriquesLisibles(schemaParticulaire(EAU).html, ['O', 'H', 'H']));
verifier('ceux d\'une molécule de méthane aussi',
  peripheriquesLisibles(schemaParticulaire(METHANE).html, ['C', 'H', 'H', 'H', 'H']));
verifier('ceux d\'une molécule à douze atomes périphériques aussi',
  peripheriquesLisibles(schemaParticulaire(GLUCOSE).html, ['C', ...Array(11).fill('X')]));
verifier('deux molécules d\'eau ne se chevauchent pas', moleculesDisjointes(schemaParticulaire(EAU).html, 3));
verifier('deux molécules de méthane non plus', moleculesDisjointes(schemaParticulaire(METHANE).html, 5));
verifier('deux molécules encombrantes non plus (la case suit la molécule)',
  moleculesDisjointes(schemaParticulaire(GLUCOSE).html, 12));
// Un mélange : chaque atome déclaré est tracé, une fois par particule, plus une
// fois dans la légende. Un atome qui manque au dessin est une composition
// fausse, et c'est la composition que l'item demande de lire.
const MELANGE = {
  etat: 'solide',
  graine: 2,
  contenu: [
    { nom: 'eau', formule: 'H₂O', nombre: 3, atomes: [{ element: 'O' }, { element: 'H', nombre: 2 }] },
    { nom: 'méthane', formule: 'CH₄', nombre: 3, atomes: [{ element: 'C' }, { element: 'H', nombre: 4 }] },
  ],
};
verifier('un mélange trace tous ses atomes, et sa légende une molécule de chaque espèce',
  cercles(schemaParticulaire(MELANGE).html).length === 3 * 3 + 3 * 5 + 3 + 5);
verifier('… et les deux espèces sont brassées, non servies en deux paquets', (() => {
  const c = cercles(schemaParticulaire(MELANGE).html);
  const parLigne = c.filter((x) => x.r === ELEMENTS.C.rayon).map((x) => x.cy);
  return new Set(parLigne).size > 1;
}));

verifier('tout tient dans le cadre, molécules et légende comprises',
  [EAU, METHANE, GLUCOSE, FER('gaz')].every((d) => debordements(schemaParticulaire(d).html).length === 0));
verifier('les particules restent dans le récipient dessiné', (() => {
  const html = schemaParticulaire(FER('gaz')).html;
  const [boite] = rectangles(html);
  return cercles(html).slice(0, 9).every((c) => c.cx - c.r >= boite.x - 0.5
    && c.cx + c.r <= boite.x + boite.w + 0.5
    && c.cy - c.r >= boite.y - 0.5 && c.cy + c.r <= boite.y + boite.h + 0.5);
}));

// ── 3.3 Ce que la description doit distinguer ───────────────────────────────

verifier('« atomes de fer » et « molécules d\'eau » ne sont pas confondus',
  schemaParticulaire(FER('solide')).description.includes('9 atomes de fer')
  && schemaParticulaire(EAU).description.includes('6 molécules d\'eau'));
verifier('l\'élision est faite (« de fer », mais « d\'eau »)',
  schemaParticulaire(EAU).description.includes("d'eau"));
verifier('la composition est dite en toutes lettres',
  schemaParticulaire(EAU).description.includes("1 atome d'oxygène et 2 atomes d'hydrogène"));
verifier('l\'arrangement est dit, et il dépend de l\'état',
  schemaParticulaire(FER('solide')).description.includes('rangées')
  && schemaParticulaire(FER('gaz')).description.includes('très espacées'));
verifier('la description change quand le nombre de particules change',
  schemaParticulaire(EAU).description !== schemaParticulaire({ ...EAU, contenu: [{ ...EAU.contenu[0], nombre: 7 }] }).description);
verifier('la légende porte la formule de chaque espèce',
  schemaParticulaire(GLUCOSE).html.includes('>C₆H₁₂O₆<'));

// ── 3.4 Les refus ───────────────────────────────────────────────────────────

verifier('une description absente est refusée', refuse(schemaParticulaire(null), 'DESCRIPTION_ABSENTE'));
verifier('un contenu vide aussi', refuse(schemaParticulaire({ etat: 'solide', contenu: [] }), 'DESCRIPTION_ABSENTE'));
verifier('un contenu qui n\'est pas un tableau aussi',
  refuse(schemaParticulaire({ etat: 'solide', contenu: 'eau' }), 'DESCRIPTION_ABSENTE'));
verifier('un état hors énuméré est refusé et nommé',
  refuse(schemaParticulaire({ etat: 'plasma', contenu: [{ atomes: [{ element: 'H' }] }] }), 'ETAT_INCONNU'));
verifier('une espèce sans atomes est refusée',
  refuse(schemaParticulaire({ etat: 'solide', contenu: [{ formule: 'X' }] }), 'ESPECE_SANS_ATOMES'));
verifier('un élément hors table est refusé ET nommé', (() => {
  const r = schemaParticulaire({ etat: 'solide', contenu: [{ atomes: [{ element: 'Xx' }] }] });
  return refuse(r, 'ELEMENT_INCONNU') && r.details.includes('Xx');
}));
verifier('une liste d\'atomes vide n\'est pas un élément inconnu',
  schemaParticulaire({ etat: 'solide', contenu: [{ formule: 'X', atomes: [] }] }).raison !== 'ELEMENT_INCONNU');
verifier('… c\'est une espèce vide, et le verdict le dit',
  refuse(schemaParticulaire({ etat: 'solide', contenu: [{ formule: 'X', atomes: [] }] }), 'ESPECE_VIDE'));
verifier('un nombre d\'atomes fractionnaire n\'est pas un élément inconnu', (() => {
  const r = schemaParticulaire({ etat: 'solide', contenu: [{ atomes: [{ element: 'H', nombre: 2.5 }] }] });
  return r.ok === false && r.raison !== 'ELEMENT_INCONNU' && r.details.length > 0;
}));
verifier('un nombre d\'atomes nul est refusé', (() => {
  const r = schemaParticulaire({ etat: 'solide', contenu: [{ atomes: [{ element: 'H', nombre: 0 }] }] });
  return r.ok === false && r.raison !== 'ELEMENT_INCONNU';
}));
verifier('un nombre de particules non entier est refusé',
  refuse(schemaParticulaire({ etat: 'solide', contenu: [{ atomes: [{ element: 'H' }], nombre: 1.5 }] }), 'NOMBRE_INVALIDE'));
verifier('un nombre de particules négatif aussi',
  refuse(schemaParticulaire({ etat: 'solide', contenu: [{ atomes: [{ element: 'H' }], nombre: -3 }] }), 'NOMBRE_INVALIDE'));
verifier('au-delà du plafond, le module refuse au lieu de rendre illisible', (() => {
  const r = schemaParticulaire({ etat: 'gaz', contenu: [{ atomes: [{ element: 'H' }], nombre: 40 }] });
  return refuse(r, 'TROP_DE_PARTICULES') && r.details[0] === 40;
}));
verifier('le plafond n\'est pas franchi par la somme de deux espèces',
  schemaParticulaire({
    etat: 'gaz',
    contenu: [{ atomes: [{ element: 'H' }], nombre: 20 }, { atomes: [{ element: 'O' }], nombre: 20 }],
  }).ok === false);

// ════════════════════════════════════════════════════════════════════════════
// 4. Le graphique et le tableau de mesures
// ════════════════════════════════════════════════════════════════════════════

const MESURES = {
  x: { titre: 'Temps (s)', min: 0, max: 10, pas: 1 },
  y: { titre: 'Distance (m)', min: 0, max: 40, pas: 5 },
  points: [[0, 0], [2, 8], [5, 20], [10, 35]],
  reperes: [[4, 16]],
  titre: 'Chute d\'une bille',
};

// ── 4.1 Un seul objet, deux registres ───────────────────────────────────────

const g = graphique(MESURES);
const t = tableauDeMesures(MESURES);
verifier('le graphique et le tableau acceptent le même objet', g.ok && t.ok);
verifier('le tableau porte exactement les points du graphique, dans l\'ordre',
  MESURES.points.every(([x, y]) => t.html.includes(`<td>${x}</td>`) && t.html.includes(`<td>${String(y).replace('.', ',')}</td>`))
  && (t.html.match(/<td>/g) ?? []).length === 2 * MESURES.points.length);
verifier('le graphique trace un disque par point',
  (g.html.match(/class="g-point"/g) ?? []).length === MESURES.points.length);
verifier('… et relie les points dans l\'ordre donné, par les mêmes coordonnées', (() => {
  const sommets = (/<polyline points="([^"]*)"/.exec(g.html)?.[1] ?? '').split(' ');
  const disques = [...g.html.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="4" class="g-point"/g)]
    .map((m) => `${m[1]},${m[2]}`);
  return sommets.length === MESURES.points.length && JSON.stringify(sommets) === JSON.stringify(disques);
}));
verifier('… et une abscisse plus grande est tracée plus à droite', (() => {
  const xs = [...g.html.matchAll(/<circle cx="([\d.]+)"[^>]*class="g-point"/g)].map((m) => +m[1]);
  return xs.every((x, i) => i === 0 || x > xs[i - 1]);
}));
verifier('`relie: false` donne un nuage de points, sans segment',
  !graphique({ ...MESURES, relie: false }).html.includes('<polyline'));
verifier('le repère montre le geste sans écrire la valeur',
  (g.html.match(/g-repere/g) ?? []).length === 2 && !g.html.includes('>16<'));
verifier('un jeu de données que le tracé refuse ne ressort pas non plus en tableau',
  tableauDeMesures({ ...MESURES, points: [[0, 0], [11, 5]] }).ok === false
  && graphique({ ...MESURES, points: [[0, 0], [11, 5]] }).ok === false);
verifier('les deux refusent avec le même code',
  tableauDeMesures({ ...MESURES, x: { min: 0, max: 10 } }).raison
  === graphique({ ...MESURES, x: { min: 0, max: 10 } }).raison);

// ── 4.2 Le point qu'on ne voit pas ──────────────────────────────────────────
//
// Un point hors cadre que la correction utilise EST le désaccord que
// l'invariant 6 refuse : il n'est pas filtré en silence, il est refusé et porté
// dans `details`.

verifier('une ordonnée hors cadre est refusée et rendue', (() => {
  const r = graphique({ ...MESURES, points: [[0, 0], [5, 50]] });
  return refuse(r, 'POINT_HORS_CADRE') && JSON.stringify(r.details) === JSON.stringify([[5, 50]]);
}));
verifier('une abscisse négative aussi', refuse(graphique({ ...MESURES, points: [[-1, 0]] }), 'POINT_HORS_CADRE'));
verifier('un REPÈRE hors cadre aussi',
  refuse(graphique({ ...MESURES, reperes: [[4, 99]] }), 'POINT_HORS_CADRE'));
verifier('un point sur la bordure est accepté',
  graphique({ ...MESURES, points: [[0, 0], [10, 40]] }).ok === true);
verifier('un point malformé est refusé, pas complété',
  refuse(graphique({ ...MESURES, points: [[3]] }), 'POINT_MALFORME'));
verifier('un point non numérique aussi',
  refuse(graphique({ ...MESURES, points: [['3', 4]] }), 'POINT_MALFORME'));
verifier('un NaN aussi', refuse(graphique({ ...MESURES, points: [[NaN, 4]] }), 'POINT_MALFORME'));
verifier('un null dans la liste aussi', refuse(graphique({ ...MESURES, points: [null] }), 'POINT_MALFORME'));
verifier('des données absentes sont refusées', refuse(graphique(null), 'DESCRIPTION_ABSENTE'));
verifier('un axe manquant aussi', refuse(graphique({ x: MESURES.x, points: [] }), 'DESCRIPTION_ABSENTE'));
verifier('un axe renversé est refusé et nommé', (() => {
  const r = graphique({ ...MESURES, y: { min: 40, max: 0, pas: 5 } });
  return refuse(r, 'AXE_INVALIDE') && r.details.includes('y');
}));
verifier('un axe plat aussi', refuse(graphique({ ...MESURES, x: { min: 3, max: 3, pas: 1 } }), 'AXE_INVALIDE'));
verifier('une graduation absente est refusée',
  refuse(graphique({ ...MESURES, x: { min: 0, max: 10 } }), 'GRADUATION_INVALIDE'));
verifier('un tableau sans mesure est refusé',
  refuse(tableauDeMesures({ ...MESURES, points: [], reperes: [[1, 1]] }), 'AUCUNE_MESURE'));
verifier('un graphique sans aucune donnée est refusé, pas rendu vide',
  graphique({ ...MESURES, points: [], reperes: [] }).ok === false);

// ── 4.3 Les nombres écrits sous l'axe ───────────────────────────────────────

const DECIMAL = graphique({
  x: { titre: 'x', min: 0, max: 1, pas: 0.1 }, y: { titre: 'y', min: -2, max: 2, pas: 1 },
  points: [[0, -2], [1, 2]],
});
verifier('un pas décimal ne dérive pas', !DECIMAL.html.includes('0000000'));
verifier('… et s\'écrit avec une virgule française', DECIMAL.html.includes('>0,3<'));
verifier('un nombre négatif porte le vrai signe moins', DECIMAL.html.includes('>−2<'));
verifier('… y compris dans la description parlée', DECIMAL.description.includes('−2'));
const DENSE = graphique({
  x: { titre: 'x', min: 0, max: 100, pas: 1 }, y: { titre: 'y', min: 0, max: 10, pas: 5 },
  points: [[0, 0], [100, 10]],
});
verifier('un axe très gradué n\'écrit pas toutes les étiquettes',
  (DENSE.html.match(/class="g-nombre"/g) ?? []).length < 30);
verifier('… mais garde toutes les lignes de la grille',
  (DENSE.html.match(/class="g-grille"/g) ?? []).length > 100);
verifier('la description dit la graduation, donc ce qui rend la tolérance calculable',
  g.description.includes('de 0 à 10 par 1') && g.description.includes('de 0 à 40 par 5'));
verifier('le titre d\'un tableau hostile est échappé',
  tableauDeMesures({ ...MESURES, titre: '<b>x</b>' }).html.includes('&lt;b&gt;x&lt;/b&gt;'));
verifier('le titre d\'axe hostile est échappé dans le graphique',
  graphique({ ...MESURES, x: { ...MESURES.x, titre: '<i>t</i>' } }).html.includes('&lt;i&gt;t&lt;/i&gt;'));

// ════════════════════════════════════════════════════════════════════════════
// 5. Ce qui ne doit jamais arriver, quelle que soit l'entrée
// ════════════════════════════════════════════════════════════════════════════

const HOSTILES = [
  undefined, null, 0, '', 'circuit', [], {}, { dipoles: null }, { dipoles: {} },
  { dipoles: [null] }, { dipoles: [{ id: 'P', type: 'pile', bornes: [1, 2] }] },
  { dipoles: [dip('P', 'pile', 'a', 'a'), dip('L', 'lampe', 'a', 'a')] },
  { etat: 'solide' }, { contenu: [] }, { contenu: [null] }, { etat: 'solide', contenu: [null] },
  { etat: 'solide', contenu: [{ atomes: null }] },
  { x: null, y: null }, { x: {}, y: {} }, { x: MESURES.x, y: MESURES.y, points: 'oui' },
  { x: MESURES.x, y: MESURES.y, points: [[0, 0]], reperes: 'non' },
  { x: MESURES.x, y: MESURES.y, points: [[Infinity, 0]] },
];
let leve = null;
let bavard = null;
for (const entree of HOSTILES) {
  for (const [nom, f] of [['schemaCircuit', schemaCircuit], ['schemaParticulaire', schemaParticulaire],
    ['graphique', graphique], ['tableauDeMesures', tableauDeMesures], ['toleranceDeLecture', toleranceDeLecture]]) {
    let r;
    try {
      r = f(entree);
    } catch (e) {
      leve = `${nom}(${JSON.stringify(entree)}) : ${e.message}`;
      continue;
    }
    if (nom === 'toleranceDeLecture') {
      if (r !== null && typeof r !== 'number') bavard = `${nom} rend ${JSON.stringify(r)}`;
      continue;
    }
    if (r?.ok === true && /undefined|NaN|\[object/.test(r.html)) {
      bavard = `${nom}(${JSON.stringify(entree)}) rend une figure trouée`;
    }
    if (r?.ok !== true && typeof r?.raison !== 'string') {
      bavard = `${nom}(${JSON.stringify(entree)}) refuse sans raison typée`;
    }
  }
}
verifier(`aucune entrée malformée ne lève (${leve ?? 'rien'})`, leve === null);
verifier(`aucune ne rend de verdict muet ni de figure trouée (${bavard ?? 'rien'})`, bavard === null);

const CORRECTES = [
  dessin(SERIE), dessin(MIXTE), dessin(IMBRIQUE), schemaParticulaire(EAU).html,
  schemaParticulaire(GLUCOSE).html, g.html, t.html, DENSE.html,
];
verifier('aucune figure correcte ne contient « undefined », « NaN » ou « null »',
  CORRECTES.every((h) => !/undefined|NaN|>null</.test(h)));
verifier('toutes portent une légende accessible non vide',
  CORRECTES.filter((h) => h.includes('<svg')).every((h) => aria(h).length > 20));
verifier('les balises ouvertes sont refermées',
  CORRECTES.every((h) => (h.match(/<figure/g) ?? []).length === (h.match(/<\/figure>/g) ?? []).length
    && (h.match(/<svg/g) ?? []).length === (h.match(/<\/svg>/g) ?? []).length));

// ════════════════════════════════════════════════════════════════════════════
// 6. L'aiguillage — quatre sortes, quatre fonctions, un seul endroit
// ════════════════════════════════════════════════════════════════════════════
//
// Un item qui porte une figure déclare sa `sorte`, et c'est ce module qui la
// résout. Le champ manquait, et son absence ne produisait aucune erreur : trois
// types d'item appellent une figure, mais « lecture » en désigne DEUX — le
// graphique et le tableau — et rien ne disait laquelle servir. L'aiguillage
// tombait alors sur chaque appelant, et le troisième se serait trompé.

verifier('les quatre sortes correspondent aux quatre fonctions de tracé',
  SORTES_DE_FIGURE.length === 4
  && ['circuit', 'particulaire', 'graphique', 'tableau'].every((s) => SORTES_DE_FIGURE.includes(s)));

const PAR_SORTE = {
  circuit: { sorte: 'circuit', circuit: SERIE, titre: 'Circuit série' },
  particulaire: { sorte: 'particulaire', description: EAU },
  graphique: { sorte: 'graphique', donnees: MESURES },
  tableau: { sorte: 'tableau', donnees: MESURES },
};
verifier('chaque sorte est tracée, et rend la même chose que sa fonction',
  SORTES_DE_FIGURE.every((s) => rendreFigure(PAR_SORTE[s]).ok === true));
verifier('le circuit passe par `schemaCircuit`, titre compris',
  rendreFigure(PAR_SORTE.circuit).html === schemaCircuit(SERIE, { titre: 'Circuit série' }).html);
verifier('le graphique et le tableau tracent le même objet de deux façons',
  rendreFigure(PAR_SORTE.graphique).html === graphique(MESURES).html
  && rendreFigure(PAR_SORTE.tableau).html === tableauDeMesures(MESURES).html);

// Une sorte inconnue est un REFUS typé, jamais une figure vide : l'élève
// chercherait sinon une donnée qui n'est nulle part.
verifier('une sorte hors énuméré est refusée avec sa raison',
  rendreFigure({ sorte: 'chronophotographie' }).raison === 'SORTE_DE_FIGURE_INCONNUE');
verifier('… et l\'absence de figure aussi',
  ['FIGURE_ABSENTE'].includes(rendreFigure(null).raison)
  && rendreFigure(undefined).raison === 'FIGURE_ABSENTE'
  && rendreFigure('graphique').raison === 'FIGURE_ABSENTE');
verifier('une sorte connue sur des données absentes refuse comme sa fonction refuse',
  rendreFigure({ sorte: 'graphique' }).ok === false
  && rendreFigure({ sorte: 'circuit' }).ok === false);

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
