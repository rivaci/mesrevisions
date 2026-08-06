// Tests du moteur de vérification, hors navigateur.
//
//     node tools/tester-moteur.mjs
//
// Le contrôle de contenu repose entièrement sur `discrimine`. Un contrôle qui
// passerait toujours ne prouverait rien : ces tests vérifient qu'il REFUSE ce
// qu'il doit refuser — en particulier les valeurs qui mentent, celles pour
// lesquelles deux écritures différentes donnent le même nombre.
//
// C'est le pendant du « la réponse était : undefined » de l'appli de français :
// une erreur enfouie dans du code à DOM n'est atteignable que par le bon clic
// sur le bon exercice ; sortie ici, elle devient une assertion.

import { contreExemple, discrimine, estExact, evaluer } from '../js/verification.js';

let passes = 0;
const echecs = [];

const verifier = (nom, condition) => {
  if (condition) passes += 1;
  else echecs.push(nom);
};

// ── Les valeurs qui mentent ─────────────────────────────────────────────────

const carre = (a) => a * a;
const double = (a) => 2 * a;

verifier(
  'a = 2 est refusé pour a² contre 2a (les deux valent 4 — le contre-exemple confirmerait l\'erreur)',
  !discrimine(2, carre, double),
);
verifier('a = 0 est refusé pour a² contre 2a', !discrimine(0, carre, double));
verifier('a = 3 est accepté pour a² contre 2a (9 contre 6)', discrimine(3, carre, double));

const identite = (x) => x;
verifier('x = 1 est refusé pour x² contre x', !discrimine(1, carre, identite));
verifier('x = 5 est accepté pour x² contre x', discrimine(5, carre, identite));

verifier(
  'x = -1 est refusé même quand il discriminerait (interdit par la charte)',
  !discrimine(-1, (x) => x * x * x, identite),
);

// ── Le cadre exact ──────────────────────────────────────────────────────────

verifier('un entier est exact', estExact(7));
verifier('un flottant ne l\'est pas', !estExact(0.30000000000000004));
verifier('une division non entière est rejetée', evaluer((x) => x / 2, 3) === null);
verifier('une division entière passe', evaluer((x) => x / 2, 4) === 2);
verifier('une expression non finie est rejetée', evaluer((x) => x / 0, 1) === null);

// ── Le contre-exemple servi à l'élève ───────────────────────────────────────

const ce = contreExemple(
  { texte: '5x', evaluer: (x) => 5 * x },
  { texte: '3x + 2', evaluer: (x) => 3 * x + 2 },
  3,
);
verifier('le contre-exemple calcule la valeur de CE que l\'élève a écrit', ce?.sien === 15);
verifier('le contre-exemple calcule la valeur de ce qui était juste', ce?.juste === 11);
verifier('le contre-exemple garde les deux écritures pour l\'affichage', ce?.texteSien === '5x');

verifier(
  'aucun contre-exemple n\'est produit quand les deux valeurs coïncident',
  contreExemple({ texte: 'a²', evaluer: carre }, { texte: '2a', evaluer: double }, 2) === null,
);

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
