// Affichage : les maths, et le peu de mise en forme dont le contenu a besoin.
//
// ── Pourquoi MathLive tout seul ───────────────────────────────────────────
//
// Les deux projets libres français qui ont résolu la saisie d'expressions —
// MathALÉA et le moteur de Mathenpoche — utilisent tous deux MathLive. La
// documentation recommande de l'accompagner de KaTeX pour l'affichage, mais
// MathLive expose `convertLatexToMarkup` et embarque déjà les polices KaTeX :
// prendre les deux paierait deux fois 280 Ko de fontes pour le même rendu.
//
// Une bibliothèque, une licence (MIT), et l'affichage exactement identique à
// la saisie — ce qui compte quand l'élève doit reconnaître dans le champ ce
// qu'il a lu dans l'énoncé.
//
// ── Pourquoi le contenu est écrit en LaTeX ────────────────────────────────
//
// « (-2{,}5) \times (-4) » plutôt que « (−2,5) × (−4) » : c'est plus pénible à
// écrire, mais c'est le seul format qui donne la virgule décimale française
// correctement espacée, le signe moins typographique (et non le trait d'union),
// et les fractions empilées dont les chapitres suivants auront besoin.

// Le fichier est renommé en `.js` alors que le paquet le livre en `.mjs` :
// beaucoup de serveurs statiques — dont `python -m http.server` — ne
// connaissent pas l'extension `.mjs` et la servent en `text/plain`, ce que les
// navigateurs refusent d'exécuter comme module. L'extension ne change rien à
// la sémantique du module, seulement au type MIME renvoyé.
import { convertLatexToMarkup } from '../vendor/mathlive/mathlive.min.js';

/** Une expression mathématique, en ligne dans un texte. */
export const maths = (latex) => convertLatexToMarkup(latex);

/** Une expression mise en valeur, seule sur sa ligne. */
export const mathsBloc = (latex) => `<div class="maths-bloc">${convertLatexToMarkup(latex)}</div>`;

export const echapper = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/**
 * Le gras du contenu, sans embarquer un moteur markdown pour trois étoiles.
 *
 * Le contenu en a un usage précis et rare : mettre en relief le mot qui porte
 * la règle (« le produit de deux nombres de **même signe** »). Si le besoin
 * grandit au-delà, ce sera le signe qu'il faut une vraie bibliothèque.
 */
export const enrichir = (s) =>
  echapper(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/** Un texte de contenu, avec ses paragraphes et son gras. */
export const paragraphes = (s) =>
  String(s).split('\n').filter((l) => l.trim()).map((l) => `<p>${enrichir(l)}</p>`).join('');

/**
 * Un nombre tel qu'on l'écrit en français : virgule décimale.
 *
 * `String(-1.2)` donne « -1.2 » — un point anglais et un trait d'union. Sur la
 * copie d'un élève de 4e, les deux sont des fautes.
 */
export const nombre = (n) => String(n).replace('-', '−').replace('.', ',');

/**
 * Ce que l'élève a tapé, converti en nombre — ou `null`.
 *
 * On accepte les deux séparateurs décimaux et les deux signes moins : exiger
 * le bon caractère serait sanctionner le clavier, pas le calcul. Les espaces
 * sont tolérés, y compris l'espace fine des milliers.
 */
export function lireNombre(saisie) {
  const propre = String(saisie ?? '')
    .replace(/[−–—]/g, '-')
    .replace(',', '.')
    .replace(/[\s  ]/g, '')
    .trim();
  if (!propre || !/^-?\d*\.?\d+$/.test(propre)) return null;
  const n = Number.parseFloat(propre);
  return Number.isFinite(n) ? n : null;
}

/**
 * Une décomposition tapée par l'élève, lue en liste de facteurs.
 *
 * On accepte tous les séparateurs qu'un élève de 4e est susceptible d'écrire :
 * le × du cours, la croix du clavier, l'étoile, la virgule, l'espace. Exiger le
 * bon caractère reviendrait à corriger le clavier, pas la décomposition.
 *
 * Renvoie `null` si rien d'exploitable n'a été saisi.
 */
export function lireFacteurs(saisie) {
  const morceaux = String(saisie ?? '')
    .split(/[×xX*,;\s]+/)
    .map((m) => m.trim())
    .filter(Boolean);
  if (!morceaux.length) return null;
  const nombres = morceaux.map((m) => Number.parseInt(m, 10));
  return nombres.some((n) => !Number.isInteger(n) || n < 2) ? null : nombres;
}

/**
 * Deux nombres sont-ils égaux, du point de vue d'une correction ?
 *
 * Les décimaux du chapitre 1 (−1,2 ; −6,4) ne se comparent pas avec `===` :
 * 2.4 * -0.5 vaut -1.2000000000000002 en JavaScript. On arrondit au
 * dix-millième, largement au-delà de la précision demandée en 4e.
 */
export const memeNombre = (a, b) => Math.abs(a - b) < 1e-9;
