// Rendu de ce que Merlin renvoie — tableaux, listes, et schémas de phrase.
//
// ── La règle unique, non négociable ───────────────────────────────────────
//
// Le texte vient d'un MODÈLE de langage et s'affiche sur la page d'un enfant.
// On ne le met JAMAIS dans un innerHTML. Tout est construit nœud par nœud, et
// le texte passe toujours par textContent / createTextNode. Un « <script> »
// écrit par le modèle devient donc du texte visible, pas du code exécuté.
//
// Même principe pour les schémas : Merlin ne dessine pas de SVG (une balise
// piégée fuirait). Il renvoie les DONNÉES du graphe — des mots et des relations
// — et c'est cette fonction qui trace le SVG, avec des attributs qu'elle
// contrôle entièrement.
//
// ── Ce qu'on rend ─────────────────────────────────────────────────────────
//
// Un sous-ensemble de Markdown : paragraphes, **gras**, `code`, listes à puces,
// et tableaux à barres verticales (conjugaisons, paires d'homophones, chaînes
// d'accord). L'analyse est pure et testée hors navigateur ; le rendu, lui, a
// besoin du DOM.

import { animerPhrase } from './animation.js';

// --- Analyse (pure, testable sans navigateur) -------------------------------

// Une emphase ne s'accroche pas à une espace : « 3 * 4 » est une multiplication,
// pas une ouverture d'italique. C'est la règle qui empêche une astérisque
// arithmétique d'avaler la moitié de la phrase.
const estBlanc = (c) => c === undefined || /\s/.test(c);

/**
 * Cherche le marqueur fermant d'une emphase, en sautant les marqueurs imbriqués.
 * Rend -1 si rien ne ferme avant la fin de ligne — l'astérisque reste alors du
 * texte, plutôt que d'avaler le reste de la phrase.
 */
function chercherFermeture(texte, depart, taille) {
  for (let i = depart; i < texte.length; i += 1) {
    if (texte[i] === '\n') return -1;
    if (texte[i] !== '*') continue;
    const suite = texte[i + 1] === '*' ? 2 : 1;
    if (suite === taille && !estBlanc(texte[i - 1])) return i;
    i += suite - 1; // un ** rencontré en cherchant un *, ou l'inverse : on l'enjambe
  }
  return -1;
}

/**
 * Découpe une ligne en segments : `normal` et `code` portent un `texte`, `gras`
 * et `italique` portent des `enfants` — car les deux s'imbriquent.
 *
 * Cette imbrication n'est pas un raffinement : c'est la notation des leçons.
 * « *je **ferai*** » cite le mot en italique et souligne en gras ce qui le rend
 * irrégulier. Une analyse à plat laissait quatre astérisques à l'écran.
 *
 * L'emphase ne traverse pas une fin de ligne, et un marqueur non fermé reste
 * du texte : un contenu bancal s'affiche imparfaitement, il ne disparaît pas.
 */
export function analyserInline(texte) {
  const segments = [];
  const source = texte ?? '';
  let tampon = '';
  const viderTampon = () => {
    if (tampon) segments.push({ style: 'normal', texte: tampon });
    tampon = '';
  };

  let i = 0;
  while (i < source.length) {
    const c = source[i];

    if (c === '`') {
      const fin = source.indexOf('`', i + 1);
      const saut = source.indexOf('\n', i + 1);
      if (fin !== -1 && (saut === -1 || fin < saut)) {
        viderTampon();
        segments.push({ style: 'code', texte: source.slice(i + 1, fin) });
        i = fin + 1;
        continue;
      }
    } else if (c === '*' && !estBlanc(source[i + (source[i + 1] === '*' ? 2 : 1)])) {
      const taille = source[i + 1] === '*' ? 2 : 1;
      const fin = chercherFermeture(source, i + taille, taille);
      if (fin > i + taille) {
        viderTampon();
        segments.push({
          style: taille === 2 ? 'gras' : 'italique',
          enfants: analyserInline(source.slice(i + taille, fin)),
        });
        i = fin + taille;
        continue;
      }
    }

    tampon += c;
    i += 1;
  }
  viderTampon();
  return segments;
}

const estSeparateur = (l) => l.includes('-') && /^[\s:|-]*-[\s:|-]*$/.test(l);
const cellules = (l) => l.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
const estListe = (l) => /^\s*[-*]\s+/.test(l);
const ouvreTableau = (lignes, i) =>
  lignes[i].includes('|') && i + 1 < lignes.length && estSeparateur(lignes[i + 1]);

/** Transforme le texte en blocs : paragraphe, liste, tableau. */
export function analyserMarkdown(texte) {
  const lignes = (texte ?? '').replace(/\r/g, '').split('\n');
  const blocs = [];
  let i = 0;

  while (i < lignes.length) {
    if (!lignes[i].trim()) { i += 1; continue; }

    if (ouvreTableau(lignes, i)) {
      const entetes = cellules(lignes[i]);
      const corps = [];
      i += 2;
      while (i < lignes.length && lignes[i].trim() && lignes[i].includes('|')) {
        corps.push(cellules(lignes[i]));
        i += 1;
      }
      blocs.push({ type: 'tableau', entetes, lignes: corps });
      continue;
    }

    if (estListe(lignes[i])) {
      const items = [];
      while (i < lignes.length && estListe(lignes[i])) {
        items.push(analyserInline(lignes[i].replace(/^\s*[-*]\s+/, '')));
        i += 1;
      }
      blocs.push({ type: 'liste', items });
      continue;
    }

    // Un paragraphe garde ses retours à la ligne : quand l'auteur écrit quatre
    // règles sur quatre lignes, ce sont quatre lignes. Les recoller par une
    // espace transformait l'énumération en pavé — « -cer → ç devant le o : nous
    // plaçons. -ger → un e devant le o : nous mangeons. -yer → … ».
    const buffer = [];
    while (i < lignes.length && lignes[i].trim() && !estListe(lignes[i]) && !ouvreTableau(lignes, i)) {
      buffer.push(lignes[i]);
      i += 1;
    }
    blocs.push({ type: 'paragraphe', lignes: buffer.map((l) => analyserInline(l)) });
  }

  return blocs;
}

// --- Rendu (DOM) ------------------------------------------------------------

const BALISES = { gras: 'strong', italique: 'em', code: 'code' };

function poserSegments(cible, segments) {
  for (const s of segments) {
    const balise = BALISES[s.style];
    if (!balise) { cible.append(document.createTextNode(s.texte)); continue; }
    const el = document.createElement(balise);
    if (s.enfants) poserSegments(el, s.enfants);
    else el.textContent = s.texte;
    cible.append(el);
  }
}

function rendreTableau(bloc) {
  const enveloppe = document.createElement('div');
  enveloppe.className = 'table-riche';
  const table = document.createElement('table');

  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  for (const entete of bloc.entetes) {
    const th = document.createElement('th');
    poserSegments(th, analyserInline(entete));
    trh.append(th);
  }
  thead.append(trh);
  table.append(thead);

  const tbody = document.createElement('tbody');
  for (const ligne of bloc.lignes) {
    const tr = document.createElement('tr');
    for (const cellule of ligne) {
      const td = document.createElement('td');
      poserSegments(td, analyserInline(cellule));
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.append(tbody);
  enveloppe.append(table);
  return enveloppe;
}

/** Rend un texte Markdown de Merlin dans un fragment, sans jamais exécuter son HTML. */
export function rendreMarkdown(texte) {
  const fragment = document.createDocumentFragment();
  for (const bloc of analyserMarkdown(texte)) {
    if (bloc.type === 'paragraphe') {
      const p = document.createElement('p');
      // Une ligne = un bloc, pas un <br> : quatre règles écrites sur quatre
      // lignes se touchaient, et une règle qui déborde sur deux lignes devenait
      // impossible à distinguer de la suivante. Un <br> ne prend pas de marge.
      const seule = bloc.lignes.length === 1;
      bloc.lignes.forEach((segments) => {
        if (seule) { poserSegments(p, segments); return; }
        const ligne = document.createElement('span');
        ligne.className = 'ligne';
        poserSegments(ligne, segments);
        p.append(ligne);
      });
      fragment.append(p);
    } else if (bloc.type === 'liste') {
      const ul = document.createElement('ul');
      for (const item of bloc.items) {
        const li = document.createElement('li');
        poserSegments(li, item);
        ul.append(li);
      }
      fragment.append(ul);
    } else if (bloc.type === 'tableau') {
      fragment.append(rendreTableau(bloc));
    }
  }
  return fragment;
}

/**
 * Le même balisage, mais rendu en chaîne HTML : pour les textes courts insérés
 * dans un gabarit (exemples d'une leçon, explications préécrites).
 *
 * Il passe par le MÊME analyseur que `rendreMarkdown`, pour que `*italique*`
 * s'affiche partout pareil — il montrait ses astérisques ici, à 166 endroits du
 * contenu. Le texte est échappé au passage : une explication vient parfois d'un
 * modèle de langage, et celle-ci finira dans un innerHTML.
 */
const ENTITES_HTML = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
const echapperHtml = (s) => s.replace(/[&<>]/g, (c) => ENTITES_HTML[c]);

const baliser = (segments) =>
  segments
    .map((s) => {
      const balise = BALISES[s.style];
      const contenu = s.enfants ? baliser(s.enfants) : echapperHtml(s.texte);
      return balise ? `<${balise}>${contenu}</${balise}>` : contenu;
    })
    .join('');

export const enrichir = (texte) =>
  (texte ?? '')
    .split('\n\n')
    .map((paragraphe) => baliser(analyserInline(paragraphe)))
    .join('</p><p>');

/**
 * Une réponse de Merlin, entière : markdown + blocs ```schema {…}``` (relations
 * figées) et ```anim {…}``` (la même chose, jouée dans le temps) — que NOUS
 * traçons dans les deux cas. Utilisée à l'écran par l'élève ET dans la
 * relecture des parents : c'est la même fonction, pour que le parent voie
 * exactement ce que l'enfant a vu.
 */
export function rendreReponseMerlin(texte) {
  const fragment = document.createDocumentFragment();
  const motif = /```(schema|anim)\s*([\s\S]*?)```/g;
  let dernier = 0;
  let m;
  while ((m = motif.exec(texte)) !== null) {
    const avant = texte.slice(dernier, m.index);
    if (avant.trim()) fragment.append(rendreMarkdown(avant));
    try {
      const donnees = JSON.parse(m[2]);
      if (m[1] === 'schema') {
        fragment.append(schemaPhrase(donnees));
      } else {
        const hote = document.createElement('div');
        animerPhrase(hote, donnees);
        fragment.append(hote);
      }
    } catch { /* JSON encore incomplet pendant le streaming : on saute ce bloc */ }
    dernier = motif.lastIndex;
  }
  // Ne pas afficher un bloc ouvert mais pas encore fermé (streaming).
  const reste = texte.slice(dernier).replace(/```(schema|anim)[\s\S]*$/, '');
  if (reste.trim()) fragment.append(rendreMarkdown(reste));
  return fragment;
}

// --- Schéma de phrase (SVG tracé par nous, jamais par le modèle) ------------

const SVG = 'http://www.w3.org/2000/svg';
const noeudSvg = (nom, attrs = {}) => {
  const el = document.createElementNS(SVG, nom);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
};

/**
 * Dessine les relations d'une phrase : les mots en ligne, des arcs étiquetés
 * au-dessus (sujet → verbe, adjectif → nom, pronom → antécédent).
 *
 * `graphe` = { mots: [...], relations: [{ de, vers, label }] }. Les indices
 * invalides sont ignorés en silence : une donnée malformée ne casse pas la page.
 */
export function schemaPhrase(graphe) {
  const mots = Array.isArray(graphe?.mots) ? graphe.mots.map(String) : [];
  if (!mots.length) return document.createDocumentFragment();

  const H = 32;      // hauteur d'un mot
  const GAP = 12;    // espace entre mots
  const MARGE = 12;
  const ARC = 26;    // hauteur d'un cran d'arc

  const largeurs = mots.map((m) => Math.max(30, m.length * 9 + 16));
  const x = [];
  let curseur = MARGE;
  for (const w of largeurs) { x.push(curseur); curseur += w + GAP; }
  const largeurTotale = curseur - GAP + MARGE;

  const relations = (Array.isArray(graphe?.relations) ? graphe.relations : []).filter(
    (r) => Number.isInteger(r?.de) && Number.isInteger(r?.vers) &&
      r.de >= 0 && r.vers >= 0 && r.de < mots.length && r.vers < mots.length && r.de !== r.vers,
  );

  const crans = Math.max(1, relations.length);
  const yMot = MARGE + crans * ARC + 4;
  const hauteur = yMot + H + MARGE;

  const svg = noeudSvg('svg', {
    viewBox: `0 0 ${largeurTotale} ${hauteur}`, class: 'schema-phrase', role: 'img',
    'aria-label': 'Relations entre les mots de la phrase',
  });

  const centre = (i) => x[i] + largeurs[i] / 2;
  relations.forEach((r, k) => {
    const apex = yMot - (k + 1) * ARC;
    const mx = (centre(r.de) + centre(r.vers)) / 2;
    svg.append(noeudSvg('path', {
      d: `M ${centre(r.de)} ${yMot} Q ${mx} ${apex} ${centre(r.vers)} ${yMot}`,
      class: 'schema-arc', fill: 'none',
    }));
    svg.append(noeudSvg('circle', { cx: centre(r.vers), cy: yMot, r: 3.5, class: 'schema-cible' }));
    if (r.label) {
      const t = noeudSvg('text', { x: mx, y: apex - 3, 'text-anchor': 'middle', class: 'schema-label' });
      t.textContent = String(r.label);
      svg.append(t);
    }
  });

  mots.forEach((m, i) => {
    svg.append(noeudSvg('rect', { x: x[i], y: yMot, width: largeurs[i], height: H, rx: 6, class: 'schema-mot' }));
    const t = noeudSvg('text', {
      x: centre(i), y: yMot + H / 2 + 5, 'text-anchor': 'middle', class: 'schema-mot-texte',
    });
    t.textContent = m;
    svg.append(t);
  });

  return svg;
}

/**
 * Surligne une phrase par rôle grammatical : { mots: [...], roles: [...] }, un
 * rôle par mot (ou null). Sert quand un schéma serait trop lourd — juste voir,
 * en couleur, ce qui est sujet, verbe, accordé.
 */
export function surlignerPhrase({ mots, roles = [] }) {
  const p = document.createElement('p');
  p.className = 'phrase-surlignee';
  (Array.isArray(mots) ? mots : []).forEach((mot, i) => {
    const span = document.createElement('span');
    span.textContent = String(mot);
    const role = roles[i];
    if (role) span.className = `role role--${String(role).toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}`;
    p.append(span, document.createTextNode(' '));
  });
  return p;
}
