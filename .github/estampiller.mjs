// Estampille chaque référence de fichier avec le SHA du déploiement.
//
//     node .github/estampiller.mjs <sha>
//
// GitHub Pages sert tout avec « max-age=600 » : le navigateur garde dix
// minutes une copie sans rien demander. Après un déploiement, l'élève peut
// donc voir l'ancienne appli un bon moment — et ça s'est vu.
//
// Un rechargement ne règle rien : mesuré dans Chrome, `location.reload()`
// redemande l'index SEULEMENT, ni le CSS ni les modules importés en chaîne.
// Une ressource en cache ne peut être invalidée que par une URL nouvelle.
//
// Ce script réécrit donc, dans la copie destinée à la publication :
//   — <link href="css/…">, <script src="js/…">        dans les index.html
//   — import … from './x.js', import('./x.js')         dans les .js
//   — fetch(`assets/maps/${nom}.json`)                  dans carte.js
// en leur ajoutant « ?v=<sha> ». Même contenu → même URL, donc le cache reste
// utile ; contenu nouveau → URL nouvelle, donc le cache est contourné.
//
// Il ne tourne QUE dans le workflow, sur la copie envoyée à Pages. Le dépôt
// reste propre, sans build, et le serveur local sert les fichiers tels quels.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const sha = process.argv[2];
if (!/^[0-9a-f]{40}$/.test(sha ?? '')) {
  console.error('Usage : node .github/estampiller.mjs <sha de 40 caractères>');
  process.exit(1);
}
const v = sha.slice(0, 12);

function* fichiers(dossier) {
  for (const nom of readdirSync(dossier)) {
    if (nom === 'node_modules' || nom.startsWith('.')) continue;
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) yield* fichiers(chemin);
    else yield chemin;
  }
}

let touches = 0;
for (const chemin of fichiers('.')) {
  const ext = extname(chemin);
  if (ext !== '.html' && ext !== '.js') continue;
  const avant = readFileSync(chemin, 'utf8');
  let apres = avant;

  if (ext === '.html') {
    apres = apres
      .replace(/(<link[^>]+href=")([^"?]+\.css)(")/g, `$1$2?v=${v}$3`)
      .replace(/(<script[^>]+src=")([^"?]+\.js)(")/g, `$1$2?v=${v}$3`);
  } else {
    apres = apres
      // import x from './a.js'  /  import './a.js'  /  import('./a.js')
      .replace(/((?:from|import)\s*\(?\s*['"])(\.{1,2}\/[^'"?]+\.js)(['"])/g, `$1$2?v=${v}$3`)
      // fetch(`assets/maps/${nom}.json`)
      .replace(/(fetch\(\s*`[^`]*\.json)(`)/g, `$1?v=${v}$2`);
  }

  if (apres !== avant) { writeFileSync(chemin, apres); touches += 1; }
}
console.log(`${touches} fichier(s) estampillé(s) avec v=${v}`);
