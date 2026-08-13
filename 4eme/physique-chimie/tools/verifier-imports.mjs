// Tout import nommé résout-il ?
//
//     node tools/verifier-imports.mjs
//
// C'est la panne qui blanchit une page sans autre trace qu'une ligne de console,
// et elle a frappé les DEUX applications de ce dépôt. Le navigateur ne dit rien
// d'autre que « The requested module does not provide an export named X », et
// tout le reste — les 1 207 tests, le contrôleur de contenu — reste au vert :
// aucun d'eux ne charge app.js, qui touche le DOM à l'import.
//
// D'où ce contrôle, qui lit le SOURCE au lieu d'importer. Il ne remplace pas le
// navigateur ; il attrape la seule chose que le navigateur est seul à voir, et
// il l'attrape avant lui.
//
// ── Pourquoi il a d'abord crié au loup ──────────────────────────────────────
//
// Sa première version comptait les commentaires écrits À L'INTÉRIEUR d'une liste
// d'imports comme des noms à résoudre. Ce projet en met partout — « // la file
// en double que la réconciliation vient de supprimer » — et il signalait trois
// imports manquants qui n'existaient pas. Un contrôle qui crie au loup finit
// ignoré, et celui-ci n'aurait pas survécu à sa deuxième exécution.

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Les commentaires, retirés avant tout découpage. Voir l'en-tête. */
const sansCommentaires = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\/\/[^\n]*/g, '');

const fichiers = [];
(function balayer(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = join(d, e.name);
    if (e.isDirectory()) balayer(p);
    else if (/\.(js|mjs)$/.test(e.name)) fichiers.push(p);
  }
}(RACINE));

/**
 * Les noms qu'un module expose.
 *
 * Trois formes coexistent dans ce dépôt : `export const x`, `export { a as b }`,
 * et `export default`. Les manquer produirait un faux positif, c'est-à-dire
 * exactement ce que ce fichier existe pour éviter.
 */
function exportsDe(src) {
  const noms = new Set();
  for (const m of src.matchAll(/^export\s+(?:const|let|var|function\*?|class|async\s+function)\s+([A-Za-z_$][\w$]*)/gm)) {
    noms.add(m[1]);
  }
  for (const m of src.matchAll(/^export\s*\{([^}]*)\}/gms)) {
    for (const bout of m[1].split(',')) {
      const t = bout.trim();
      if (!t) continue;
      const as = t.split(/\s+as\s+/);
      noms.add((as[1] ?? as[0]).trim());
    }
  }
  if (/^export\s+default/m.test(src)) noms.add('default');
  return noms;
}

const cache = new Map();
function lireExports(chemin) {
  if (!cache.has(chemin)) {
    try { cache.set(chemin, exportsDe(sansCommentaires(readFileSync(chemin, 'utf8')))); }
    catch { cache.set(chemin, null); }
  }
  return cache.get(chemin);
}

const anomalies = [];

for (const f of fichiers) {
  const src = sansCommentaires(readFileSync(f, 'utf8'));
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"](\.[^'"]+)['"]/gs)) {
    const cible = resolve(dirname(f), m[2]);
    const dispo = lireExports(cible);
    const ou = relative(RACINE, f).replace(/\\/g, '/');
    if (dispo === null) {
      anomalies.push(`${ou} : module introuvable « ${m[2]} »`);
      continue;
    }
    for (const bout of m[1].split(',')) {
      const t = bout.trim();
      if (!t) continue;
      const nom = t.split(/\s+as\s+/)[0].trim();
      if (!dispo.has(nom)) {
        anomalies.push(`${ou} : « ${nom} » n'est pas exporté par ${m[2]}`);
      }
    }
  }
}

if (anomalies.length) {
  console.log(`${anomalies.length} import(s) non résolu(s) — la page sera blanche :\n`);
  for (const a of anomalies) console.log(`  ✗ ${a}`);
  process.exit(1);
}
console.log(`${fichiers.length} fichiers, tous les imports résolvent.`);
