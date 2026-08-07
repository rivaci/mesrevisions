// Relire les animations : la phrase, état par état.
//
//     node tools/relire-animations.mjs [numéro de séance…]
//
// Une animation réécrit des mots en cours de route. Le script peut être
// parfaitement valide — indices en place, scènes acceptées — et produire une
// phrase fausse : « Mon cousin joue » dont on met le nom au pluriel devient
// « Mon cousins jouent », et rien dans les données ne le signale.
//
// Aucun contrôle automatique ne sait juger ça. Cet outil ne juge pas : il
// déplie, pour qu'un humain lise en trente secondes ce qu'il faudrait sinon
// jouer à l'écran quarante fois.

import { SEANCES } from '../js/data/seances/index.js';
import { normaliserScript } from '../js/animation.js';

const filtre = process.argv.slice(2).map(Number).filter(Boolean);
const GRIS = '[90m';
const FIN = '[0m';

let vues = 0;
for (const s of SEANCES) {
  if (filtre.length && !filtre.includes(s.numero)) continue;
  for (const r of s.rappels) {
    if (!r.animation) continue;
    vues += 1;
    const { mots, scenes } = normaliserScript(r.animation);
    console.log(`\n── Séance ${s.numero} · ${r.titre}`);

    const etat = [...mots];
    console.log(`   ${etat.join(' ')}`);
    for (const scene of scenes) {
      if (scene.type !== 'terminaison') continue;
      etat[scene.mot] = scene.devient;
      console.log(`   → ${etat.join(' ')}   ${GRIS}(${mots[scene.mot]} → ${scene.devient})${FIN}`);
    }

    // Le fil des légendes, tel qu'il s'accumule à l'écran.
    for (const scene of scenes) {
      if (scene.texte) console.log(`     ${GRIS}· ${scene.texte}${FIN}`);
    }
  }
}

console.log(`\n${vues} animation(s) relue(s).`);
