// Chapitre 5 — Additions et soustractions de nombres relatifs.
//
// ── D'où vient ce chapitre ───────────────────────────────────────────────
//
// Du point 5 de la liste de la professeure, écrit avant le cours d'Antonin :
//
//   · additionner deux ou plusieurs relatifs, soustraire ;
//   · parenthèses indispensables ;
//   · simplifier des sommes avec parenthèses ;
//   · enchaîner additions et soustractions ;
//   · problèmes.
//
// La multiplication et la division des relatifs sont au chapitre 7, dans le
// parcours EIB. D'où une vigilance particulière : « moins par moins donne
// plus » circule dans les classes bien avant d'être enseigné, et contamine
// l'addition. C'est un piège à part entière.

import sf51 from './ch05/sf-5-1.js';
import sf52 from './ch05/sf-5-2.js';
import sf53 from './ch05/sf-5-3.js';
import sf54 from './ch05/sf-5-4.js';

export default {
  numero: 5,
  titre: 'Additions et soustractions de relatifs',
  theme: 'Nombres et calculs',
  trimestre: 2,
  programme: '2025',
  signesEnJeu: true,
  prerequis: [
    'Opposé et distance à zéro d\'un nombre relatif (chapitre 3)',
    'Comparer des nombres relatifs (chapitre 3)',
    'Enchaîner des opérations de même niveau (chapitre 1)',
  ],
  savoirFaire: [sf51, sf52, sf53, sf54],
};
