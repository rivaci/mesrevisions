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

// ── Les enveloppes des deux fournisseurs ────────────────────────────────────
//
// `construireRequete` est pure pour cette raison : les deux enveloppes ne se
// ressemblent pas assez pour qu'une relecture suffise, et une erreur donne un
// HTTP 400 au premier exercice, pas un champ ignoré.

const { construireRequete } = await import('../../../commun/merlin.js');

const args = {
  cle: 'cle-test', modele: 'modele-test',
  consignes: 'CONSIGNES', profil: 'PROFIL', message: 'MESSAGE',
  schema: { type: 'object', properties: {}, required: [], additionalProperties: false },
  nomSchema: 'test', appli: 'maths4e',
};

const a = construireRequete({ ...args, fournisseur: 'anthropic' });
verifier('Anthropic — bonne URL', a.url === 'https://api.anthropic.com/v1/messages');
verifier("Anthropic — l'en-tête d'accès navigateur est présent (sans lui, pas de CORS)",
  a.entetes['anthropic-dangerous-direct-browser-access'] === 'true');
verifier('Anthropic — la clé va dans x-api-key', a.entetes['x-api-key'] === 'cle-test');
verifier('Anthropic — le plafond s\'appelle max_tokens', typeof a.corps.max_tokens === 'number');
verifier('Anthropic — pas de max_output_tokens', a.corps.max_output_tokens === undefined);
verifier('Anthropic — les consignes viennent AVANT le profil (ordre du cache)',
  a.corps.system[0].text === 'CONSIGNES' && a.corps.system[1].text === 'PROFIL');
verifier('Anthropic — les deux blocs système sont marqués pour le cache',
  a.corps.system.every((b) => b.cache_control?.type === 'ephemeral'));
verifier('Anthropic — le schéma n\'a pas de name ni de strict (refusés ici)',
  a.corps.output_config.format.schema.name === undefined);

const o = construireRequete({ ...args, fournisseur: 'openai' });
verifier('OpenAI — bonne URL', o.url === 'https://api.openai.com/v1/responses');
verifier('OpenAI — la clé va dans authorization', o.entetes.authorization === 'Bearer cle-test');
verifier('OpenAI — le plafond s\'appelle max_output_tokens', typeof o.corps.max_output_tokens === 'number');
verifier('OpenAI — pas de max_tokens', o.corps.max_tokens === undefined);
verifier('OpenAI — le travail de l\'enfant n\'est pas conservé côté fournisseur', o.corps.store === false);
verifier('OpenAI — name et strict sont obligatoires ici',
  o.corps.text.format.name === 'test' && o.corps.text.format.strict === true);
verifier('OpenAI — consignes puis profil dans instructions (ordre du cache)',
  o.corps.instructions.indexOf('CONSIGNES') < o.corps.instructions.indexOf('PROFIL'));

// ── Rapport ─────────────────────────────────────────────────────────────────

console.log(`${passes} test(s) passé(s).`);
for (const e of echecs) console.log(`  ✗ ${e}`);
if (echecs.length) {
  console.log(`\n${echecs.length} échec(s).`);
  process.exit(1);
}
