// Figures de géométrie : deux droites coupées par une sécante, ou deux droites
// qui se croisent. En SVG, comme graphique.js.
//
// ── Pourquoi une nouvelle exception à la règle « aucune figure » ──────────
//
// Le chapitre des angles porte SUR la figure : « alternes-internes » ne se
// définit que par une position — de part et d'autre de la sécante, entre les
// deux droites. Le décrire en toutes lettres reviendrait à faire apprendre la
// définition à la place de l'exercice qui la met en œuvre.
//
// ── Deux modèles, et une numérotation fixe ────────────────────────────────
//
//   'croisement'  une droite (D) coupée par (d) en A : angles 1 à 4
//   'secante'     deux droites (D) et (D') coupées par (d) en A et B : 1 à 8
//
// En chaque point, les angles sont numérotés dans le même ordre :
//
//        1 | 2          1 = en haut à gauche de la sécante
//     ─────A─────       2 = en haut à droite
//        4 | 3          3 = en bas à droite, 4 = en bas à gauche
//
// et de 5 à 8 au point B, dans le même ordre. « En haut », c'est du côté de
// la droite qui regarde vers le haut ; « à droite », du côté droit de (d).
//
// La numérotation n'est pas un détail d'affichage : c'est elle que les
// exercices citent (« les angles 3 et 5 »). D'où `natureDePaire` et
// `mesureDessinee`, qui permettent au contrôle de contenu de refuser un
// exercice dont la réponse contredit sa propre figure.
//
// Pas d'import ici : le module se teste hors navigateur.

const L = 480;
const H = 300;
const A = { x: 270, y: 95 };
const DISTANCE_AB = 150;
const INCLINAISON_D = 10;   // la droite (D) monte un peu : une figure droite a l'air d'un cas particulier
const RAYON_ARC = 24;
const RAYON_NUMERO = 38;

const echapper = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const rad = (d) => (d * Math.PI) / 180;
const arrondi = (v) => Math.round(v * 10) / 10;
/** Point à distance r dans la direction φ (en degrés, sens trigonométrique, y vers le haut). */
const vers = (p, phi, r) => ({ x: arrondi(p.x + r * Math.cos(rad(phi))), y: arrondi(p.y - r * Math.sin(rad(phi))) });

export const NOMBRE_ANGLES = { croisement: 4, secante: 8 };

/** Où se trouve l'angle n : en quel point, et dans quel coin. */
export function positionAngle(n) {
  const i = n - 1;
  const coin = i % 4;   // 0 haut-gauche, 1 haut-droite, 2 bas-droite, 3 bas-gauche
  return {
    point: i < 4 ? 'A' : 'B',
    coin,
    haut: coin <= 1,
    droite: coin === 1 || coin === 2,
  };
}

/** Un angle est « interne » quand il est entre les deux droites (D) et (D'). */
const estInterne = ({ point, haut }) => (point === 'A' ? !haut : haut);

/**
 * La nature d'une paire d'angles, lue sur la numérotation.
 * Renvoie l'une des chaînes utilisées telles quelles dans les exercices.
 */
export function natureDePaire(a, b) {
  const p = positionAngle(a);
  const q = positionAngle(b);
  if (a === b) return 'aucune';
  if (p.point === q.point) {
    return Math.abs(p.coin - q.coin) === 2 ? 'opposés par le sommet' : 'adjacents';
  }
  if (p.droite === q.droite) return p.haut === q.haut ? 'correspondants' : 'aucune';
  if (estInterne(p) && estInterne(q)) return 'alternes-internes';
  if (!estInterne(p) && !estInterne(q)) return 'alternes-externes';
  return 'aucune';
}

/**
 * La mesure que la figure DESSINE pour l'angle n, en degrés.
 * `angle` est la mesure de l'angle 2 ; `angleB` celle de l'angle 6 (égale à
 * `angle` par défaut, ce qui dessine (D) et (D') parallèles).
 */
export function mesureDessinee(f, n) {
  const { point, coin } = positionAngle(n);
  const theta = point === 'A' ? f.angle : (f.angleB ?? f.angle);
  return coin === 1 || coin === 3 ? theta : 180 - theta;
}

/** Les angles d'une figure sont-ils dessinés sur des droites parallèles ? */
export const parallelesDessinees = (f) => f.modele === 'secante' && (f.angleB ?? f.angle) === f.angle;

/** Les défauts d'une figure, pour le contrôle de contenu. */
export function erreursFigure(f) {
  const erreurs = [];
  if (!NOMBRE_ANGLES[f.modele]) return [`modèle de figure inconnu : « ${f.modele} »`];
  const n = NOMBRE_ANGLES[f.modele];
  for (const [nom, v] of [['angle', f.angle], ['angleB', f.angleB]]) {
    if (v === undefined && nom === 'angleB') continue;
    if (typeof v !== 'number' || v < 20 || v > 160) erreurs.push(`${nom} doit valoir entre 20 et 160 degrés (${v})`);
  }
  if (f.angleB !== undefined && f.modele !== 'secante') erreurs.push('angleB n\'a de sens que pour une sécante');
  const cles = [...Object.keys(f.surligner ?? {}), ...Object.keys(f.mesures ?? {})].map(Number);
  for (const k of cles) {
    if (!Number.isInteger(k) || k < 1 || k > n) erreurs.push(`angle ${k} inexistant : la figure en a ${n}`);
  }
  return erreurs;
}

/** Les quatre coins autour d'un point : [début, fin] en degrés, sens trigonométrique. */
function coins(alpha, beta) {
  return [
    [beta, alpha + 180],          // 0 haut-gauche
    [alpha, beta],                // 1 haut-droite
    [beta + 180, alpha + 360],    // 2 bas-droite
    [alpha + 180, beta + 180],    // 3 bas-gauche
  ];
}

function droite(p, phi, classe) {
  const a = vers(p, phi, 700);
  const b = vers(p, phi + 180, 700);
  return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="${classe}"/>`;
}

/** Le nom d'une droite, posé près du bord droit de la figure. */
function nomDroite(p, phi, texte) {
  const x = L - 22;
  const y = arrondi(p.y - (x - p.x) * Math.tan(rad(phi)) - 10);
  return `<text x="${x}" y="${y}" class="f-nom" text-anchor="end">${echapper(texte)}</text>`;
}

/**
 * La figure en SVG, ou une chaîne vide s'il n'y en a pas.
 *
 *   modele      'secante' ou 'croisement'
 *   angle       mesure de l'angle 2, en degrés (20 à 160)
 *   angleB      mesure de l'angle 6 (sécante seulement) ; par défaut = angle
 *   surligner   { numéro: 'a' | 'b' | 'c' } — coloré, comme les feutres du cahier
 *   mesures     { numéro: '60°' } — une mesure écrite à la place du numéro
 *   numeros     false pour ne montrer que les angles surlignés ou mesurés
 */
export function figure(f) {
  if (!f || !NOMBRE_ANGLES[f.modele]) return '';
  const secante = f.modele === 'secante';
  const beta = INCLINAISON_D + f.angle;                         // direction de (d)
  const points = [{ nom: 'A', p: A, alpha: INCLINAISON_D, premier: 1 }];
  if (secante) {
    const B = vers(A, beta + 180, DISTANCE_AB);
    points.push({ nom: 'B', p: B, alpha: beta - (f.angleB ?? f.angle), premier: 5 });
  }

  const surligner = Array.isArray(f.surligner)
    ? Object.fromEntries(f.surligner.map((n) => [n, 'a']))
    : (f.surligner ?? {});
  const mesures = f.mesures ?? {};
  const montrerNumeros = f.numeros !== false;

  const traits = [droite(A, beta, 'f-secante')];
  const arcs = [];
  const etiquettes = [];
  const noms = { D: '(D)', Dp: "(D')", d: '(d)', ...(f.noms ?? {}) };

  for (const { nom, p, alpha, premier } of points) {
    traits.push(droite(p, alpha, 'f-droite'));
    etiquettes.push(nomDroite(p, alpha, nom === 'A' ? noms.D : noms.Dp));
    coins(alpha, beta).forEach(([debut, fin], coin) => {
      const n = premier + coin;
      const milieu = (debut + fin) / 2;
      if (surligner[n] || mesures[n]) {
        const d1 = vers(p, debut, RAYON_ARC);
        const d2 = vers(p, fin, RAYON_ARC);
        const grand = fin - debut > 180 ? 1 : 0;
        arcs.push(`<path d="M${p.x},${p.y} L${d1.x},${d1.y} A${RAYON_ARC},${RAYON_ARC} 0 ${grand} 0 ${d2.x},${d2.y} Z" class="f-arc f-arc--${surligner[n] ?? 'neutre'}"/>`);
      }
      const texte = mesures[n] ?? (montrerNumeros || surligner[n] ? String(n) : '');
      if (texte) {
        const e = vers(p, milieu, mesures[n] ? RAYON_NUMERO + 8 : RAYON_NUMERO);
        etiquettes.push(`<text x="${e.x}" y="${e.y}" class="f-numero${mesures[n] ? ' f-mesure' : ''}" text-anchor="middle" dominant-baseline="middle">${echapper(texte)}</text>`);
      }
    });
    etiquettes.push(`<circle cx="${p.x}" cy="${p.y}" r="2.5" class="f-point"/>`);
  }
  // Le nom de la sécante, près de son extrémité haute — mais jamais collé au
  // bord : une sécante très pentue sortait son nom du cadre.
  const haut = vers(A, beta, 72);
  const xNom = Math.min(Math.max(haut.x + 8, 8), L - 40);
  const yNom = Math.max(haut.y, 18);
  etiquettes.push(`<text x="${xNom}" y="${yNom}" class="f-nom">${echapper(noms.d)}</text>`);

  const description = secante
    ? `Deux droites ${noms.D} et ${noms.Dp} coupées par la sécante ${noms.d}, en A puis en B. `
      + 'Autour de A, les angles 1 (en haut à gauche), 2 (en haut à droite), 3 (en bas à droite) et 4 (en bas à gauche) ; '
      + 'autour de B, les angles 5 à 8 dans le même ordre.'
    : `Deux droites ${noms.D} et ${noms.d} qui se coupent en A, formant les angles 1 (en haut à gauche), `
      + '2 (en haut à droite), 3 (en bas à droite) et 4 (en bas à gauche).';

  return `<figure class="graphique figure-geo">
    ${f.titre ? `<figcaption>${echapper(f.titre)}</figcaption>` : ''}
    <svg viewBox="0 0 ${L} ${H}" role="img" aria-label="${echapper(description)}">
      ${arcs.join('')}${traits.join('')}${etiquettes.join('')}
    </svg>
  </figure>`;
}
