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
