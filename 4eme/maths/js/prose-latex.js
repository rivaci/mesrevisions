// Un énoncé LaTeX ramené à du texte lisible.
//
// Cette fonction vit à part de `rendu.js` pour une seule raison : `rendu.js`
// importe MathLive, qui ne se charge pas hors navigateur. Or c'est ICI que se
// cachent les erreurs coûteuses — un énoncé affiché « 2{,}5 h » au lieu de
// « 2,5 h » ne se voit qu'en ouvrant la page, sur le bon exercice. Isolée,
// la conversion devient testable par `tools/tester-moteur.mjs`.
//
// ── La dernière règle est un piège ───────────────────────────────────────
//
// `[/\\[a-zA-Z]+/g, '']` efface toute commande qu'on n'a pas prévue. C'est un
// filet, mais un filet MUET : rien ne signale la perte. Trois défauts sont
// partis en ligne comme ça, et n'ont été trouvés qu'en recensant, pour chaque
// énoncé de prose, les commandes qui tombaient dans ce trou :
//
//   \rightarrow, \to, \longrightarrow — 75 fois — « 7 kg → 15,40 € » devenait
//       « 7 kg 15,40 € ». La flèche portait le sens, et disparaissait.
//   \circ — 19 fois — « 108^\circ » devenait « 108^ », un accent orphelin.
//   les exposants — 51 fois — « m^2 » s'affichait tel quel, au lieu de m².
//
// Toute commande ajoutée au contenu doit donc être ajoutée ici AUSSI. Le
// vérificateur de contenu refuse maintenant celles qu'il ne connaît pas, pour
// que l'oubli soit une erreur bruyante et non une disparition silencieuse.

const EXPOSANTS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };

export const COMMANDES = [
  // « 2{,}5 » : les accolades servent à LaTeX pour coller la virgule aux
  // chiffres, elles ne veulent rien dire en prose.
  [/\{([,.])\}/g, '$1'],
  [/\\text\{([^{}]*)\}/g, '$1'],
  [/\\d?frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2'],

  // Le degré s'écrit « 90^\circ ». À traiter avant le nettoyage, sinon il ne
  // reste que l'accent circonflexe.
  [/\^?\\circ(?![a-zA-Z])/g, '°'],
  // Les exposants numériques deviennent de vrais exposants : m², cm³, 10⁻⁸.
  [/\^\{?(-?\d+)\}?/g, (_, n) => [...n].map((c) => EXPOSANTS[c] ?? c).join('')],
  // Un exposant qui n'est pas un nombre (« 10^{\square} ») garde son accent,
  // mais perd ses accolades.
  [/\^\{([^{}]*)\}/g, '^$1'],

  [/\\longrightarrow|\\rightarrow|\\to(?![a-zA-Z])/g, '→'],
  [/\\Rightarrow/g, '⇒'],
  [/\\parallel(?![a-zA-Z])/g, '∥'],
  [/\\square(?![a-zA-Z])/g, '□'],
  [/\\times(?![a-zA-Z])/g, '×'],
  [/\\div(?![a-zA-Z])/g, '÷'],
  [/\\ldots|\\dots(?![a-zA-Z])/g, '…'],
  [/\\approx(?![a-zA-Z])/g, '≈'],
  [/\\mu(?![a-zA-Z])/g, 'µ'],
  [/\\rho(?![a-zA-Z])/g, 'ρ'],
  [/\\qquad|\\quad/g, '   '],
  [/\\[,;: ]/g, ' '],
  // Les caractères que LaTeX oblige à échapper. Sans cette ligne, l'antislash
  // reste visible : « 25\% de 180 » — c'était le cas 19 fois chez Evan.
  [/\\([%&_$#{}])/g, '$1'],
  [/\\[a-zA-Z]+/g, ''],
];

/**
 * Les commandes que la conversion sait rendre.
 *
 * `tools/verifier-contenu.mjs` s'en sert pour refuser un énoncé qui en
 * emploierait une autre : c'est ce qui empêche la disparition silencieuse.
 */
export const COMMANDES_CONNUES = new Set([
  'text', 'frac', 'dfrac', 'circ', 'longrightarrow', 'rightarrow', 'to',
  'Rightarrow', 'parallel', 'square', 'times', 'div', 'ldots', 'dots',
  'approx', 'mu', 'rho', 'qquad', 'quad',
]);

/** Le LaTeX de prose, rendu en texte brut — sans échappement HTML. */
export const enProse = (s) =>
  COMMANDES
    .reduce((acc, [motif, par]) => acc.replace(motif, par), String(s ?? ''))
    .replace(/\s+/g, ' ')
    .trim();
