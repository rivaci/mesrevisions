// Figures du plan : droite graduée, repère, triangle. En SVG, sans import.
//
// ── Le même contrat que figure.js ─────────────────────────────────────────
//
// Une figure ne se contente pas d'être dessinée : elle sait ce qu'elle
// dessine. L'abscisse d'un point, ses coordonnées, le symétrique d'un point,
// la mesure d'un angle, la nature d'une droite tracée — tout ce qu'un
// exercice peut demander se lit ICI, et le contrôle de contenu refuse un
// exercice dont la réponse ne concorde pas avec sa figure.
//
// ── Trois modèles ─────────────────────────────────────────────────────────
//
//   droite    { min, max, pas, ecrites, points: { A: -2.5 } }
//             une droite graduée ; seules les valeurs `ecrites` portent un
//             nombre, les autres graduations se comptent
//   repere    { xmin, xmax, ymin, ymax, points: { A: [2, -3] }, segments, axe }
//             un repère orthogonal quadrillé, unité 1 sur chaque axe ; `axe`
//             trace une droite (d) verticale { x: 1 } ou horizontale { y: -2 }
//   triangle  { sommets: ['A','B','C'], angles: { B: 50, C: 60 },
//               etiquettes: { A: '?' }, droite: 'hauteur', parallele }
//             sommets[0] en haut, sommets[1] et [2] sur la base ; l'angle
//             du haut se déduit (180° − B − C). `droite` trace, depuis le
//             sommet du haut ou sur la base : hauteur, mediane, mediatrice,
//             bissectrice. `parallele` trace la parallèle (d) à la base
//             passant par le sommet du haut, avec les angles 1 (à gauche) et
//             2 (à droite) qu'elle forme avec les côtés : la figure de la
//             démonstration de la somme des angles.

const L = 480;
const TOLERANCE = 1e-9;

const echapper = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
/** Écriture française d'un nombre : virgule décimale, vrai signe moins. */
const fr = (n) => String(n).replace('-', '−').replace('.', ',');
const arrondi = (v) => Math.round(v * 10) / 10;
const multipleDe = (v, pas) => Math.abs(v / pas - Math.round(v / pas)) < TOLERANCE;
const rad = (d) => (d * Math.PI) / 180;

// ── Droite graduée ──────────────────────────────────────────────────────────

const D_X0 = 36;
const D_X1 = 444;
const D_Y = 58;

export const abscisse = (f, lettre) => f.points?.[lettre];
export const lettresAbscisse = (f, v) =>
  Object.entries(f.points ?? {}).filter(([, x]) => Math.abs(x - v) < TOLERANCE).map(([l]) => l);

function valeursEcrites(f) {
  const pas = f.pas ?? 1;
  return f.ecrites ?? [0, pas].filter((v) => v >= f.min && v <= f.max);
}

export function erreursDroite(f) {
  const erreurs = [];
  const pas = f.pas ?? 1;
  if (!(f.min < f.max)) return ['min doit être plus petit que max'];
  const n = (f.max - f.min) / pas;
  if (!Number.isInteger(Math.round(n)) || Math.abs(n - Math.round(n)) > TOLERANCE || n < 2 || n > 30) {
    erreurs.push(`de ${f.min} à ${f.max} par pas de ${pas} : il faut entre 2 et 30 graduations`);
  }
  for (const v of valeursEcrites(f)) {
    if (v < f.min || v > f.max || !multipleDe(v - f.min, pas)) erreurs.push(`la valeur écrite ${v} ne tombe pas sur une graduation`);
  }
  const px = (v) => D_X0 + ((v - f.min) / (f.max - f.min)) * (D_X1 - D_X0);
  const places = [];
  for (const [lettre, v] of Object.entries(f.points ?? {})) {
    if (v < f.min || v > f.max) erreurs.push(`le point ${lettre} (${v}) sort de la droite`);
    // Un point se lit sur une graduation, ou au milieu de deux : au-delà, sa
    // lecture devient une devinette.
    else if (!multipleDe(v - f.min, pas / 2)) erreurs.push(`le point ${lettre} (${v}) n'est ni sur une graduation ni au milieu de deux`);
    for (const [autre, x] of places) {
      if (Math.abs(px(v) - x) < 16) erreurs.push(`les points ${autre} et ${lettre} sont trop proches pour être lus`);
    }
    places.push([lettre, px(v)]);
  }
  return erreurs;
}

export function figureDroite(f) {
  const pas = f.pas ?? 1;
  const px = (v) => arrondi(D_X0 + ((v - f.min) / (f.max - f.min)) * (D_X1 - D_X0));
  const traits = [`<line x1="${D_X0 - 14}" y1="${D_Y}" x2="${D_X1 + 22}" y2="${D_Y}" class="f-axe"/>`,
    `<path d="M${D_X1 + 22},${D_Y} l-9,-5 l0,10 Z" class="f-fleche"/>`];
  const n = Math.round((f.max - f.min) / pas);
  for (let i = 0; i <= n; i++) {
    const v = f.min + i * pas;
    const x = px(v);
    const origine = Math.abs(v) < TOLERANCE;
    traits.push(`<line x1="${x}" y1="${D_Y - (origine ? 9 : 6)}" x2="${x}" y2="${D_Y + (origine ? 9 : 6)}" class="f-graduation${origine ? ' f-graduation--origine' : ''}"/>`);
  }
  const textes = valeursEcrites(f).map((v) =>
    `<text x="${px(v)}" y="${D_Y + 28}" class="f-nombre" text-anchor="middle">${fr(Math.round(v * 1000) / 1000)}</text>`);
  const points = Object.entries(f.points ?? {}).map(([lettre, v]) => `
    <circle cx="${px(v)}" cy="${D_Y}" r="4.5" class="f-point-plan"/>
    <text x="${px(v)}" y="${D_Y - 16}" class="f-lettre" text-anchor="middle">${echapper(lettre)}</text>`);
  const description = `Droite graduée de ${fr(f.min)} à ${fr(f.max)}, une graduation tous les ${fr(pas)}. `
    + `Nombres écrits : ${valeursEcrites(f).map(fr).join(', ')}. Points : ${Object.keys(f.points ?? {}).join(', ') || 'aucun'}.`;
  return `<figure class="graphique figure-geo">
    ${f.titre ? `<figcaption>${echapper(f.titre)}</figcaption>` : ''}
    <svg viewBox="0 0 ${L} 100" role="img" aria-label="${echapper(description)}">
      ${traits.join('')}${textes.join('')}${points.join('')}
    </svg>
  </figure>`;
}

// ── Repère ──────────────────────────────────────────────────────────────────

const bornesRepere = (f) => ({ xmin: f.xmin ?? -5, xmax: f.xmax ?? 5, ymin: f.ymin ?? -4, ymax: f.ymax ?? 4 });

export const coordonnees = (f, lettre) => f.points?.[lettre];
export const lettresAux = (f, [x, y]) => Object.entries(f.points ?? {})
  .filter(([, [a, b]]) => Math.abs(a - x) < TOLERANCE && Math.abs(b - y) < TOLERANCE)
  .map(([l]) => l);
export const milieu = (f, a, b) => {
  if (f.modele === 'droite') return (abscisse(f, a) + abscisse(f, b)) / 2;
  const [p, q] = [coordonnees(f, a), coordonnees(f, b)];
  return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
};
export const symetriqueCentral = (f, point, centre) => {
  const [p, c] = [coordonnees(f, point), coordonnees(f, centre)];
  return [2 * c[0] - p[0], 2 * c[1] - p[1]];
};
/** Symétrique par rapport à la droite x = k ou y = k. */
export const symetriqueAxial = (f, point, axe) => {
  const [x, y] = coordonnees(f, point);
  return axe.x !== undefined ? [2 * axe.x - x, y] : [x, 2 * axe.y - y];
};

/**
 * La droite (d) tracée est-elle la médiatrice de [ab] ? Il faut les deux :
 * passer par le milieu, et être perpendiculaire au segment. Une droite
 * verticale n'est perpendiculaire qu'à un segment horizontal.
 */
export function estMediatrice(f, a, b) {
  if (!f.axe) return false;
  const [p, q] = [coordonnees(f, a), coordonnees(f, b)];
  const [mx, my] = milieu(f, a, b);
  if (f.axe.x !== undefined) return p[1] === q[1] && p[0] !== q[0] && Math.abs(mx - f.axe.x) < TOLERANCE;
  return p[0] === q[0] && p[1] !== q[1] && Math.abs(my - f.axe.y) < TOLERANCE;
}

function geometrieRepere(f) {
  const { xmin, xmax, ymin, ymax } = bornesRepere(f);
  const cellule = Math.min(420 / (xmax - xmin), 300 / (ymax - ymin));
  const largeur = cellule * (xmax - xmin);
  const hauteur = cellule * (ymax - ymin);
  const x0 = (L - largeur) / 2;
  const y0 = 18;
  return {
    xmin, xmax, ymin, ymax, cellule, hauteurVue: hauteur + 44,
    // Le cadre serre le quadrillage : sur un téléphone, c'est la largeur qui
    // limite, et chaque unité de marge inutile rapetisse les graduations.
    gaucheVue: x0 - 24, largeurVue: largeur + 48,
    px: (x) => arrondi(x0 + (x - xmin) * cellule),
    py: (y) => arrondi(y0 + (ymax - y) * cellule),
  };
}

export function erreursRepere(f) {
  const erreurs = [];
  const { xmin, xmax, ymin, ymax, cellule } = geometrieRepere(f);
  if (![xmin, xmax, ymin, ymax].every(Number.isInteger)) erreurs.push('les bornes du repère doivent être entières');
  if (!(xmin < 0 && xmax > 0 && ymin < 0 && ymax > 0)) erreurs.push('les deux axes doivent être visibles : bornes de part et d\'autre de 0');
  if (cellule < 24) erreurs.push('carreaux trop petits pour être lus : réduis les bornes');
  const vus = new Map();
  for (const [lettre, [x, y]] of Object.entries(f.points ?? {})) {
    if (x < xmin || x > xmax || y < ymin || y > ymax) erreurs.push(`le point ${lettre} (${x} ; ${y}) sort du repère`);
    if (!multipleDe(x, 0.5) || !multipleDe(y, 0.5)) erreurs.push(`le point ${lettre} n'est pas sur le quadrillage ni au milieu d'un carreau`);
    const cle = `${x};${y}`;
    if (vus.has(cle)) erreurs.push(`les points ${vus.get(cle)} et ${lettre} sont au même endroit`);
    vus.set(cle, lettre);
  }
  for (const s of f.segments ?? []) {
    for (const l of s) if (!f.points?.[l]) erreurs.push(`segment vers un point inconnu : ${l}`);
  }
  if (f.axe) {
    const cles = Object.keys(f.axe);
    const v = f.axe.x ?? f.axe.y;
    const [bas, haut] = f.axe.x !== undefined ? [xmin, xmax] : [ymin, ymax];
    if (cles.length !== 1 || !['x', 'y'].includes(cles[0])) erreurs.push("l'axe est vertical { x } ou horizontal { y }, pas les deux");
    else if (v <= bas || v >= haut) erreurs.push(`l'axe ${cles[0]} = ${v} sort du repère`);
    else if (!multipleDe(v, 0.5)) erreurs.push(`l'axe ${cles[0]} = ${v} ne suit pas le quadrillage`);
  }
  return erreurs;
}

export function figureRepere(f) {
  const g = geometrieRepere(f);
  const traits = [];
  for (let x = g.xmin; x <= g.xmax; x++) traits.push(`<line x1="${g.px(x)}" y1="${g.py(g.ymin)}" x2="${g.px(x)}" y2="${g.py(g.ymax)}" class="f-grille"/>`);
  for (let y = g.ymin; y <= g.ymax; y++) traits.push(`<line x1="${g.px(g.xmin)}" y1="${g.py(y)}" x2="${g.px(g.xmax)}" y2="${g.py(y)}" class="f-grille"/>`);
  traits.push(`<line x1="${g.px(g.xmin)}" y1="${g.py(0)}" x2="${g.px(g.xmax) + 10}" y2="${g.py(0)}" class="f-axe"/>`);
  traits.push(`<line x1="${g.px(0)}" y1="${g.py(g.ymin)}" x2="${g.px(0)}" y2="${g.py(g.ymax) - 10}" class="f-axe"/>`);
  const nombres = [];
  for (let x = g.xmin; x <= g.xmax; x++) {
    if (x !== 0) nombres.push(`<text x="${g.px(x)}" y="${g.py(0) + 15}" class="f-nombre f-nombre--petit" text-anchor="middle">${fr(x)}</text>`);
  }
  for (let y = g.ymin; y <= g.ymax; y++) {
    if (y !== 0) nombres.push(`<text x="${g.px(0) - 6}" y="${g.py(y) + 4}" class="f-nombre f-nombre--petit" text-anchor="end">${fr(y)}</text>`);
  }
  nombres.push(`<text x="${g.px(0) - 6}" y="${g.py(0) + 15}" class="f-nombre f-nombre--petit" text-anchor="end">O</text>`);
  const segments = (f.segments ?? []).map(([a, b]) => {
    const [p, q] = [f.points[a], f.points[b]];
    return `<line x1="${g.px(p[0])}" y1="${g.py(p[1])}" x2="${g.px(q[0])}" y2="${g.py(q[1])}" class="f-segment"/>`;
  });
  // L'axe (d) passe sous les points mais au-dessus du quadrillage. Son nom est
  // posé à gauche ou en dessous : les lettres des points sont en haut à droite.
  const nomAxe = echapper(f.nomAxe ?? '(d)');
  const axe = !f.axe ? '' : f.axe.x !== undefined
    ? `<line x1="${g.px(f.axe.x)}" y1="${g.py(g.ymin)}" x2="${g.px(f.axe.x)}" y2="${g.py(g.ymax)}" class="f-axe-symetrie"/>
      <text x="${g.px(f.axe.x) - 5}" y="${g.py(g.ymax) + 14}" class="f-nom-axe" text-anchor="end">${nomAxe}</text>`
    : `<line x1="${g.px(g.xmin)}" y1="${g.py(f.axe.y)}" x2="${g.px(g.xmax)}" y2="${g.py(f.axe.y)}" class="f-axe-symetrie"/>
      <text x="${g.px(g.xmax) - 4}" y="${g.py(f.axe.y) + 17}" class="f-nom-axe" text-anchor="end">${nomAxe}</text>`;
  const points = Object.entries(f.points ?? {}).map(([lettre, [x, y]]) => {
    const [cx, cy] = [g.px(x), g.py(y)];
    return `<path d="M${cx - 5},${cy - 5} L${cx + 5},${cy + 5} M${cx - 5},${cy + 5} L${cx + 5},${cy - 5}" class="f-croix"/>
      <text x="${cx + 7}" y="${cy - 7}" class="f-lettre">${echapper(lettre)}</text>`;
  });
  const description = `Repère orthogonal, abscisses de ${fr(g.xmin)} à ${fr(g.xmax)}, ordonnées de ${fr(g.ymin)} à ${fr(g.ymax)}. `
    + `Points placés : ${Object.keys(f.points ?? {}).join(', ') || 'aucun'}.`
    + (!f.axe ? '' : f.axe.x !== undefined
      ? ` Une droite ${f.nomAxe ?? '(d)'} verticale passe par l'abscisse ${fr(f.axe.x)}.`
      : ` Une droite ${f.nomAxe ?? '(d)'} horizontale passe par l'ordonnée ${fr(f.axe.y)}.`);
  return `<figure class="graphique figure-geo figure-repere">
    ${f.titre ? `<figcaption>${echapper(f.titre)}</figcaption>` : ''}
    <svg viewBox="${arrondi(g.gaucheVue)} 0 ${arrondi(g.largeurVue)} ${arrondi(g.hauteurVue)}" role="img" aria-label="${echapper(description)}">
      ${traits.join('')}${axe}${segments.join('')}${nombres.join('')}${points.join('')}
    </svg>
  </figure>`;
}

// ── Triangle ────────────────────────────────────────────────────────────────

const NATURES_DROITE = {
  hauteur: 'une hauteur',
  mediane: 'une médiane',
  mediatrice: 'une médiatrice',
  bissectrice: 'une bissectrice',
};

/** La mesure de l'angle au sommet `lettre`, en degrés. */
export function angleSommet(f, lettre) {
  const [haut, gauche, droite] = f.sommets;
  const B = f.angles[gauche];
  const C = f.angles[droite];
  if (lettre === gauche) return B;
  if (lettre === droite) return C;
  if (lettre === haut) return 180 - B - C;
  // Les angles 1 et 2 sont alternes-internes avec les angles de la base.
  if (f.parallele && lettre === '1') return B;
  if (f.parallele && lettre === '2') return C;
  return undefined;
}

export const natureDroite = (f) => NATURES_DROITE[f.droite] ?? null;

export function erreursTriangle(f) {
  const erreurs = [];
  if (!Array.isArray(f.sommets) || f.sommets.length !== 3 || new Set(f.sommets).size !== 3) return ['il faut trois sommets distincts'];
  const [haut, gauche, droite] = f.sommets;
  const B = f.angles?.[gauche];
  const C = f.angles?.[droite];
  if (typeof B !== 'number' || typeof C !== 'number') return [`les angles en ${gauche} et en ${droite} sont obligatoires`];
  if (B <= 0 || C <= 0 || B + C >= 180) erreurs.push(`angles impossibles : ${B}° + ${C}° laisse ${180 - B - C}° au sommet ${haut}`);
  if (180 - B - C < 20 || B < 15 || C < 15) erreurs.push('un angle trop fermé rend la figure illisible');
  if (f.droite && !NATURES_DROITE[f.droite]) erreurs.push(`droite inconnue : ${f.droite}`);
  if (f.droite === 'hauteur' && (B >= 90 || C >= 90)) erreurs.push('une hauteur issue du sommet du haut sortirait de la base : angles de base aigus seulement');
  for (const [lettre, texte] of Object.entries(f.etiquettes ?? {})) {
    if (!f.sommets.includes(lettre)) erreurs.push(`étiquette sur un sommet inconnu : ${lettre}`);
    const lue = Number(String(texte).replace('°', '').replace(',', '.'));
    if (String(texte).includes('°') && Number.isFinite(lue) && lue !== angleSommet(f, lettre)) {
      erreurs.push(`l'angle en ${lettre} est écrit ${texte}, mais il est dessiné à ${angleSommet(f, lettre)}°`);
    }
  }
  return erreurs;
}

function geometrieTriangle(f) {
  const [, gauche, droite] = f.sommets;
  const B = f.angles[gauche];
  const C = f.angles[droite];
  // Base de 340 unités, puis réduite si le triangle est trop haut pour le cadre.
  let base = 340;
  let h = base / (1 / Math.tan(rad(B)) + 1 / Math.tan(rad(C)));
  if (h > 190) { base *= 190 / h; h = 190; }
  const yBase = 225;
  const xG = (L - base) / 2;
  const P1 = { x: xG, y: yBase };
  const P2 = { x: xG + base, y: yBase };
  const P0 = { x: xG + h / Math.tan(rad(B)), y: yBase - h };
  return { P0, P1, P2 };
}

const pt = (p) => `${arrondi(p.x)},${arrondi(p.y)}`;
const vecteur = (a, b) => ({ x: b.x - a.x, y: b.y - a.y });
const unitaire = (v) => { const n = Math.hypot(v.x, v.y); return { x: v.x / n, y: v.y / n }; };
const plus = (p, v, k = 1) => ({ x: p.x + k * v.x, y: p.y + k * v.y });

/** Deux petits traits sur un segment : le codage « longueurs égales ». */
function codageMilieu(a, b) {
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const u = unitaire(vecteur(a, b));
  const n = { x: -u.y, y: u.x };
  return `<line x1="${arrondi(m.x + 6 * n.x)}" y1="${arrondi(m.y + 6 * n.y)}" x2="${arrondi(m.x - 6 * n.x)}" y2="${arrondi(m.y - 6 * n.y)}" class="f-codage"/>`;
}

/** Le petit carré de l'angle droit, au point p, entre les directions u et v. */
function angleDroit(p, u, v) {
  const a = plus(p, u, 10);
  const b = plus(plus(p, u, 10), v, 10);
  const c = plus(p, v, 10);
  return `<path d="M${pt(a)} L${pt(b)} L${pt(c)}" class="f-codage" fill="none"/>`;
}

export function figureTriangle(f) {
  const [haut, gauche, droite] = f.sommets;
  const { P0, P1, P2 } = geometrieTriangle(f);
  const traits = [`<path d="M${pt(P0)} L${pt(P1)} L${pt(P2)} Z" class="f-triangle"/>`];
  const I = { x: (P1.x + P2.x) / 2, y: P1.y };
  const uBase = unitaire(vecteur(P1, P2));

  if (f.droite === 'hauteur') {
    const H = { x: P0.x, y: P1.y };
    traits.push(`<line x1="${arrondi(P0.x)}" y1="${arrondi(P0.y)}" x2="${arrondi(H.x)}" y2="${arrondi(H.y)}" class="f-remarquable"/>`);
    traits.push(angleDroit(H, uBase, { x: 0, y: -1 }));
  } else if (f.droite === 'mediane') {
    traits.push(`<line x1="${arrondi(P0.x)}" y1="${arrondi(P0.y)}" x2="${arrondi(I.x)}" y2="${arrondi(I.y)}" class="f-remarquable"/>`);
    traits.push(codageMilieu(P1, I), codageMilieu(I, P2));
  } else if (f.droite === 'mediatrice') {
    traits.push(`<line x1="${arrondi(I.x)}" y1="${arrondi(I.y + 45)}" x2="${arrondi(I.x)}" y2="12" class="f-remarquable"/>`);
    traits.push(angleDroit(I, uBase, { x: 0, y: -1 }), codageMilieu(P1, I), codageMilieu(I, P2));
  } else if (f.droite === 'bissectrice') {
    const u1 = unitaire(vecteur(P0, P1));
    const u2 = unitaire(vecteur(P0, P2));
    const bis = unitaire({ x: u1.x + u2.x, y: u1.y + u2.y });
    const t = (P1.y - P0.y) / bis.y;
    const Dp = plus(P0, bis, t);
    traits.push(`<line x1="${arrondi(P0.x)}" y1="${arrondi(P0.y)}" x2="${arrondi(Dp.x)}" y2="${arrondi(Dp.y)}" class="f-remarquable"/>`);
    // Deux petits arcs identiques de part et d'autre : les deux moitiés égales.
    for (const u of [u1, u2]) {
      const a = plus(P0, u, 26);
      const b = plus(P0, bis, 26);
      traits.push(`<path d="M${pt(a)} Q${pt(plus(P0, unitaire({ x: u.x + bis.x, y: u.y + bis.y }), 30))} ${pt(b)}" class="f-codage" fill="none"/>`);
    }
  }

  const etiquettes = [];
  if (f.parallele) {
    traits.push(`<line x1="12" y1="${arrondi(P0.y)}" x2="${L - 12}" y2="${arrondi(P0.y)}" class="f-parallele"/>`);
    etiquettes.push(`<text x="${L - 14}" y="${arrondi(P0.y - 8)}" class="f-nom" text-anchor="end">(d)</text>`);
    // Les angles égaux ont la même couleur : 1 et l'angle en B, 2 et l'angle
    // en C. Secteurs de 22 unités, tracés sous les côtés.
    const secteur = (p, u, v, sens, couleur) => {
      const [a, b] = [plus(p, u, 22), plus(p, v, 22)];
      return `<path d="M${pt(p)} L${pt(a)} A22,22 0 0 ${sens} ${pt(b)} Z" class="f-arc f-arc--${couleur}"/>`;
    };
    const [gaucheH, droiteH] = [{ x: -1, y: 0 }, { x: 1, y: 0 }];
    // Les angles 1 et 2 sont hors du triangle ; ceux de la base sont dedans,
    // donc posés sur le remplissage, et le contour est repassé par-dessus.
    traits.unshift(
      secteur(P0, gaucheH, unitaire(vecteur(P0, P1)), 0, 'a'),
      secteur(P0, droiteH, unitaire(vecteur(P0, P2)), 1, 'c'),
    );
    traits.splice(
      3, 0,
      secteur(P1, droiteH, unitaire(vecteur(P1, P0)), 0, 'a'),
      secteur(P2, gaucheH, unitaire(vecteur(P2, P0)), 1, 'c'),
      `<path d="M${pt(P0)} L${pt(P1)} L${pt(P2)} Z" class="f-triangle f-contour"/>`,
    );
    // Chaque numéro sur la bissectrice de l'angle entre (d) et le côté.
    for (const [numero, horizontale, sommet] of [['1', gaucheH, P1], ['2', droiteH, P2]]) {
      const bis = unitaire(plus(horizontale, unitaire(vecteur(P0, sommet))));
      const e = plus(P0, bis, 30);
      etiquettes.push(`<text x="${arrondi(e.x)}" y="${arrondi(e.y + 5)}" class="f-numero" text-anchor="middle">${numero}</text>`);
    }
  }
  const centre = { x: (P0.x + P1.x + P2.x) / 3, y: (P0.y + P1.y + P2.y) / 3 };
  for (const [lettre, p] of [[haut, P0], [gauche, P1], [droite, P2]]) {
    const dehors = unitaire(vecteur(centre, p));
    const l = plus(p, dehors, 16);
    etiquettes.push(`<text x="${arrondi(l.x)}" y="${arrondi(l.y + 5)}" class="f-lettre" text-anchor="middle">${echapper(lettre)}</text>`);
    const texte = f.etiquettes?.[lettre];
    if (texte) {
      const e = plus(p, unitaire(vecteur(p, centre)), 42);
      etiquettes.push(`<text x="${arrondi(e.x)}" y="${arrondi(e.y + 5)}" class="f-numero f-mesure" text-anchor="middle">${echapper(texte)}</text>`);
    }
  }
  const description = `Triangle ${haut}${gauche}${droite}, ${haut} en haut, ${gauche} et ${droite} sur la base.`
    // Neutre : nommer la droite tracée donnerait la réponse de l'exercice.
    + (f.droite ? ' Une droite remarquable est tracée.' : '')
    + (f.parallele ? ` La droite (d) passe par ${haut}, parallèle à (${gauche}${droite}) ; elle forme l'angle 1 avec [${haut}${gauche}] et l'angle 2 avec [${haut}${droite}].` : '');
  return `<figure class="graphique figure-geo">
    ${f.titre ? `<figcaption>${echapper(f.titre)}</figcaption>` : ''}
    <svg viewBox="0 0 ${L} 270" role="img" aria-label="${echapper(description)}">
      ${traits.join('')}${etiquettes.join('')}
    </svg>
  </figure>`;
}
