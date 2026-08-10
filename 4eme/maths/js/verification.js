// Vérification numérique — ce qui rend une correction fausse impossible à publier.
//
// En français, qu'une clé de correction soit juste se relit. En maths, ça se
// PROUVE : une expression et sa forme réduite sont égales pour toute valeur de
// la lettre, ou elles ne le sont pas. Le contenu porte donc ses expressions
// sous forme de fonctions JavaScript, et le contrôle les évalue.
//
// C'est la réponse directe à la plainte la plus virulente du benchmark contre
// les plateformes existantes : des corrections fausses en production.
//
// ── Pourquoi des fonctions plutôt que des chaînes ────────────────────────────
//
// Stocker « 2*(x+5) » en texte imposerait d'écrire un analyseur d'expressions,
// donc du code à tester avant de pouvoir tester le contenu. Une fonction
// `(x) => 2 * (x + 5)` est évaluable telle quelle par le navigateur ET par
// node, sans dépendance et sans étape de build. Le texte affiché à l'élève est
// un champ séparé — et le contrôle vérifie qu'ils ne divergent pas, en testant
// la fonction, jamais la chaîne.
//
// ── Pourquoi seulement des entiers ───────────────────────────────────────────
//
// La charte exige des comparaisons exactes, pas des flottants : 0.1 + 0.2 vaut
// 0.30000000000000004, et une égalité approchée qui passe à 1e-9 près finirait
// par valider une correction fausse. Plutôt que d'embarquer une bibliothèque de
// rationnels pour un prototype, on impose une précondition vérifiable :
// coefficients entiers, témoins entiers, donc résultats entiers. `estExact`
// rejette tout ce qui sort de ce cadre — une expression qui divise se signale
// au contrôle au lieu de passer en silence.

// ── Lire une expression tapée par l'élève ───────────────────────────────────
//
// C'est ce qui permet au chapitre 7 de demander « développe 2(x + 5) » plutôt
// que de faire choisir entre deux propositions. L'élève PRODUIT son écriture,
// et on vérifie qu'elle est équivalente à la bonne — pas qu'elle lui ressemble.
//
// ── Pourquoi une évaluation numérique et pas un calcul formel ───────────────
//
// Deux expressions sont égales si elles donnent le même nombre pour toute
// valeur de la lettre. Les tester sur plusieurs valeurs bien choisies suffit
// donc, et c'est exactement la voie qu'a prise Sésamath pour son moteur
// d'exercices : le calcul formel complet pèse plus de 2 Mo pour un gain nul à
// ce niveau.
//
// La conversion ci-dessous couvre volontairement peu : polynômes à une lettre,
// parenthèses, puissances entières. C'est le programme de 4e. Tout ce qui en
// sort renvoie `null` — on refuse de corriger plutôt que de corriger de travers.

/** Les écritures qu'un élève de 4e peut produire, ramenées à du JavaScript. */
export function versFonction(saisie, lettre = 'x') {
  let s = String(saisie ?? '')
    .replace(/\\left|\\right/g, '')
    .replace(/\\times|\\cdot/g, '*')
    .replace(/\\d?frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
    .replace(/[−–—]/g, '-')
    .replace(/,/g, '.')
    .replace(/\s/g, '');
  if (!s) return null;

  // Les exposants : x^{2} et x^2 deviennent x**2.
  s = s.replace(/\^\{(-?\d+)\}/g, '**($1)').replace(/\^(-?\d+)/g, '**($1)');

  // Refus net de tout ce qui n'est pas une expression polynomiale simple : on
  // ne cherche pas à deviner, on renvoie null et l'appli demande autre chose.
  const permis = new RegExp(`^[0-9${lettre}+\\-*/().]*$`);
  if (!permis.test(s.replace(/\*\*/g, '*'))) return null;

  // La multiplication implicite, dans les trois formes qu'écrivent les élèves :
  // 2x, x(…), )( et )2.
  s = s
    .replace(new RegExp(`(\\d)(${lettre})`, 'g'), '$1*$2')
    .replace(new RegExp(`(${lettre})(\\d)`, 'g'), '$1*$2')
    .replace(new RegExp(`(\\d|${lettre}|\\))\\(`, 'g'), '$1*(')
    .replace(new RegExp(`\\)(\\d|${lettre})`, 'g'), ')*$1');

  try {
    // eslint-disable-next-line no-new-func
    const f = Function(lettre, `"use strict";return (${s});`);
    // Un essai à blanc : une expression mal formée lève ici, pas en plein
    // exercice devant l'élève.
    const t = f(2);
    return Number.isFinite(t) ? f : null;
  } catch {
    return null;
  }
}

/** Les valeurs sur lesquelles on compare deux écritures.
 *
 *  Ni 0 ni 1 ni 2 : ce sont précisément celles qui confondent des expressions
 *  différentes. Cinq valeurs suffisent largement pour des polynômes de 4e. */
const TEMOINS_EQUIVALENCE = [3, 5, -4, 7, -2.5];

/**
 * Deux écritures sont-elles équivalentes ?
 *
 * `null` si l'une des deux n'est pas lisible — l'appelant doit alors demander
 * à l'élève de réécrire, et surtout pas compter la réponse fausse.
 */
export function equivalentes(saisie, attendu, lettre = 'x') {
  const a = versFonction(saisie, lettre);
  const b = versFonction(attendu, lettre);
  if (!a || !b) return null;
  return TEMOINS_EQUIVALENCE.every((t) => {
    try {
      const x = a(t);
      const y = b(t);
      return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) < 1e-9;
    } catch {
      return false;
    }
  });
}

/** Les valeurs qui mentent : elles confondent des expressions différentes.
 *
 *  x = 1 rend x² et x égaux, x = 0 rend (−x)² et −x² égaux, a = 2 rend a² et
 *  2a égaux — c'est-à-dire que le contre-exemple censé réfuter « a² = 2a »
 *  la CONFIRMERAIT. Un témoin pris ici ne prouve rien ; la charte les interdit. */
export const TEMOINS_INTERDITS = [-1, 0, 1, 2];

/** Une évaluation n'est exploitable que si elle est entière et finie. */
export const estExact = (valeur) => Number.isInteger(valeur);

/**
 * Évalue une expression du contenu sur un témoin.
 *
 * Renvoie `null` — plutôt que de lever — quand le résultat sort du cadre
 * exact : l'appelant décide s'il s'agit d'une erreur de contenu (au contrôle)
 * ou d'un contre-exemple à ne pas proposer (dans l'appli).
 */
export function evaluer(fn, temoin) {
  if (typeof fn !== 'function') return null;
  const valeur = fn(temoin);
  return estExact(valeur) ? valeur : null;
}

/**
 * Le témoin discrimine-t-il vraiment ces deux expressions ?
 *
 * C'est la question que pose l'invariant 2, et elle se pose PAR PAIRE : un
 * témoin qui sépare la bonne réponse du distracteur A peut coïncider avec le
 * distracteur B. Chaque distracteur porte donc le sien.
 */
export function discrimine(temoin, attendu, distracteur) {
  if (TEMOINS_INTERDITS.includes(temoin)) return false;
  const a = evaluer(attendu, temoin);
  const b = evaluer(distracteur, temoin);
  return a !== null && b !== null && a !== b;
}

/**
 * Les deux valeurs à faire calculer à l'élève, dans l'ordre où on les lui
 * demande : ce qu'il a écrit d'abord, ce qui était juste ensuite.
 *
 * L'ordre n'est pas cosmétique. « Tu as écrit a² = 2a ; avec a = 3, ton
 * expression donne… » part de SA réponse : c'est elle qu'on réfute, et il faut
 * qu'il la calcule lui-même pour que la réfutation lui appartienne.
 */
export function contreExemple(option, attendu, temoin) {
  const sien = evaluer(option.evaluer, temoin);
  const juste = evaluer(attendu.evaluer, temoin);
  if (sien === null || juste === null || sien === juste) return null;
  return { temoin, sien, juste, texteSien: option.texte, texteJuste: attendu.texte };
}
