// Figures du chapitre Thalès : la configuration de Thalès (triangles emboîtés
// ou papillon) et deux triangles semblables. En SVG.
//
// ── Pourquoi des figures, dans une appli qui s'en passait ─────────────────
//
// Le chapitre avait d'abord été écrit sans aucune figure : chaque énoncé dit
// en toutes lettres qui est aligné avec qui. Le cours d'Evan, lui, part
// toujours d'une figure — « on considère la figure ci-contre » — et c'est une
// figure qu'il aura sous les yeux en contrôle. Les énoncés gardent leurs
// phrases ; la figure s'y ajoute.
//
// ── Le contrat : une figure sait ce qu'elle dessine ───────────────────────
//
// Comme dans l'appli de 5e. Une figure est construite À PARTIR des longueurs
// ou des angles de l'exercice : elle est donc juste, à l'échelle près. Elle
// répond aux questions qu'un exercice peut poser — la longueur d'un segment,
// le parallélisme de deux droites, l'ordre des points, le sommet ou le côté
// homologue — et le contrôle de contenu refuse un exercice dont la réponse
// contredit sa figure, ou dont une longueur écrite n'est pas celle dessinée.
//
// ── Deux modèles ──────────────────────────────────────────────────────────
//
//   thales      deux droites sécantes en `sommet`, deux points sur chacune,
//               repérés par leur distance au sommet. Une distance NÉGATIVE
//               place le point de l'autre côté du sommet : c'est ainsi qu'on
//               obtient un papillon.
//                 { modele: 'thales', sommet: 'A',
//                   d1: { M: 2, B: 5 }, d2: { N: 1.5, C: 3.75 },
//                   base: ['MN', 2.4]  ou  angle: 40,   rotation: 0,
//                   cotes: { AM: '2 cm', MN: '?' } }
//               Le premier point de chaque droite est à une distance positive.
//               `base` donne la longueur d'un segment joignant les deux
//               droites, d'où se déduit l'angle entre elles. Les deux
//               « transversales » relient les premiers points entre eux, puis
//               les seconds.
//
//   semblables  deux triangles de mêmes angles. Le second est le premier
//               multiplié par k, tourné, retourné s'il le faut ; ses sommets
//               sont donnés dans l'ordre des HOMOLOGUES de ceux du premier.
//                 { modele: 'semblables',
//                   t1: { sommets: ['A', 'B', 'C'], angles: { B: 40, C: 80 } }
//                       ou { sommets, longueurs: { AB: 4, BC: 6, CA: 5 } },
//                   t2: { sommets: ['E', 'F', 'D'], k: 1.5, rotation: 150, miroir: true },
//                   couleurs: true, etiquettes: { A: '60°', F: '?', AB: '4 cm' } }
//               Les angles de même mesure ont la même couleur, comme dans le
//               cours ; `couleurs: false` les laisse tous pareils, quand c'est
//               justement l'élève qui doit retrouver les homologues.

const L = 480;
const TOLERANCE = 1e-6;

const echapper = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const arrondi = (v) => Math.round(v * 10) / 10;
const pt = (p) => `${arrondi(p.x)},${arrondi(p.y)}`;
const plus = (p, v, k = 1) => ({ x: p.x + k * v.x, y: p.y + k * v.y });
const moins = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const scalaire = (a, b) => a.x * b.x + a.y * b.y;
const unitaire = (v) => { const n = Math.hypot(v.x, v.y) || 1; return { x: v.x / n, y: v.y / n }; };
const normale = (v) => ({ x: -v.y, y: v.x });
const oppose = (v) => ({ x: -v.x, y: -v.y });
/** Le nombre écrit dans une étiquette — « 2,5 cm » donne 2.5 — ou null. */
const nombreEcrit = (texte) => {
  const m = String(texte).replace(',', '.').match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
};
const texte = (p, contenu, classe, ancre = 'middle') =>
  `<text x="${arrondi(p.x)}" y="${arrondi(p.y)}" class="${classe}" text-anchor="${ancre}" dominant-baseline="middle">${echapper(contenu)}</text>`;
const trait = (a, b, classe) =>
  `<line x1="${arrondi(a.x)}" y1="${arrondi(a.y)}" x2="${arrondi(b.x)}" y2="${arrondi(b.y)}" class="${classe}"/>`;

/** Le cadre d'une figure : une figure du cours, en SVG accessible. */
const cadre = (f, hauteur, description, contenu) => `<figure class="graphique figure-geo">
    ${f.titre ? `<figcaption>${echapper(f.titre)}</figcaption>` : ''}
    <svg viewBox="0 0 ${L} ${arrondi(hauteur)}" role="img" aria-label="${echapper(description)}">
      ${contenu}
    </svg>
  </figure>`;

/** La distance d'un point au segment [ab]. */
function distanceSegment(p, a, b) {
  const ab = moins(b, a);
  const t = Math.max(0, Math.min(1, scalaire(moins(p, a), ab) / (scalaire(ab, ab) || 1)));
  return Math.hypot(p.x - (a.x + t * ab.x), p.y - (a.y + t * ab.y));
}

/**
 * L'endroit où poser une étiquette autour d'un point : celui, à la distance
 * voulue, qui s'écarte le plus de tous les traits déjà tracés et de toutes
 * les étiquettes déjà posées. On essaie tout le tour, par pas de 10°.
 */
function meilleurePlace(centre, rayon, segments, occupes) {
  let meilleure = plus(centre, { x: 0, y: -1 }, rayon);
  let marge = -Infinity;
  for (let a = 0; a < 360; a += 10) {
    const p = plus(centre, { x: Math.cos(rad(a)), y: Math.sin(rad(a)) }, rayon);
    const d = Math.min(
      ...segments.map(([u, v]) => distanceSegment(p, u, v)),
      ...occupes.map((o) => Math.hypot(o.x - p.x, o.y - p.y) - 7),
    );
    if (d > marge + 1e-9) { marge = d; meilleure = p; }
  }
  return meilleure;
}

/**
 * Ce qu'occupe une étiquette de longueur posée à côté d'un trait de normale n.
 *
 * Le texte reste horizontal : le long d'une droite penchée, « 10 cm » centré
 * déborderait sur son trait. On l'aligne alors par le bord qui fait face au
 * trait, et on mesure ce qu'il déborde encore vers le trait (sa demi-hauteur)
 * et ce qu'il occupe au-delà : une cote voisine se pose plus loin. `centre`
 * garde le texte centré (sous un segment court, entre les deux droites).
 * Mesures à la taille du texte sur téléphone (20 px, voir style.css), la plus
 * grande : environ 0,6 em par caractère.
 */
function encombrement(etiquette, n, centre = false) {
  const largeur = 12 * String(etiquette).length;
  const demiHauteur = 10;
  const penche = !centre && Math.abs(n.x) >= 0.3;
  const sens = n.x > 0 ? 1 : -1;
  return {
    ancre: penche ? (sens > 0 ? 'start' : 'end') : 'middle',
    versLeTrait: (penche ? 0 : (largeur / 2) * Math.abs(n.x)) + demiHauteur * Math.abs(n.y),
    auDela: (penche ? largeur : largeur / 2) * Math.abs(n.x) + demiHauteur * Math.abs(n.y),
    // Les points que couvre le texte, d'un bout à l'autre, tous les 12 : les
    // noms des points évitent le texte entier, pas seulement son centre.
    empreinte: (ici) => {
      const debut = penche ? (sens > 0 ? 0 : -largeur) : -largeur / 2;
      return Array.from({ length: String(etiquette).length + 1 }, (_, i) => ({ x: ici.x + debut + 12 * i, y: ici.y }));
    },
  };
}

// ── Configuration de Thalès ─────────────────────────────────────────────────

/** Chaque point : sa droite (0 pour le sommet) et sa distance signée au sommet. */
function pointsThales(f) {
  const points = { [f.sommet]: { droite: 0, d: 0 } };
  [f.d1, f.d2].forEach((d, i) => {
    for (const [nom, dist] of Object.entries(d ?? {})) points[nom] = { droite: i + 1, d: dist };
  });
  return points;
}

/** Le cosinus de l'angle entre les deux demi-droites « positives ». */
function cosAngle(f) {
  if (f.base) {
    const [segment, longueur] = f.base;
    const pts = pointsThales(f);
    const [p, q] = [pts[segment[0]], pts[segment[1]]];
    // Loi des cosinus, avec des distances signées : elle vaut aussi quand un
    // point est de l'autre côté du sommet.
    return (p.d ** 2 + q.d ** 2 - longueur ** 2) / (2 * p.d * q.d);
  }
  return Math.cos(rad(f.angle ?? 45));
}

/** Les coordonnées des points, en unités de longueur, y vers le haut. */
function coordonneesThales(f) {
  const theta = Math.acos(Math.max(-1, Math.min(1, cosAngle(f))));
  const r = rad(f.rotation ?? 0);
  // Les deux demi-droites positives descendent de part et d'autre de la
  // verticale : le sommet en haut, comme dans le cours.
  const phi = { 1: -Math.PI / 2 - theta / 2 + r, 2: -Math.PI / 2 + theta / 2 + r };
  const coords = {};
  for (const [nom, p] of Object.entries(pointsThales(f))) {
    const a = phi[p.droite] ?? 0;
    coords[nom] = { x: p.d * Math.cos(a), y: p.d * Math.sin(a) };
  }
  return coords;
}

/** La longueur du segment [XY], dans l'unité de l'exercice. */
export function longueurThales(f, segment) {
  const c = coordonneesThales(f);
  const [a, b] = [c[segment[0]], c[segment[1]]];
  if (!a || !b) return undefined;
  return Math.hypot(a.x - b.x, a.y - b.y);
}

const valeurs = (d) => Object.values(d ?? {});

/** Les deux transversales, nommées par leurs extrémités : ['MN', 'BC']. */
export function transversales(f) {
  const [a1, b1] = Object.keys(f.d1);
  const [a2, b2] = Object.keys(f.d2);
  return [a1 + a2, b1 + b2];
}

/** Les deux transversales sont-elles parallèles ? Rapports SIGNÉS égaux. */
export function sontParalleles(f) {
  const [p1, q1] = valeurs(f.d1);
  const [p2, q2] = valeurs(f.d2);
  return Math.abs(q1 / p1 - q2 / p2) < TOLERANCE;
}

/** Les rapports de longueurs, sans signe, sont-ils égaux ? */
export function rapportsEgaux(f) {
  const [p1, q1] = valeurs(f.d1);
  const [p2, q2] = valeurs(f.d2);
  return Math.abs(Math.abs(p1 / q1) - Math.abs(p2 / q2)) < TOLERANCE;
}

/** Les points sont-ils alignés dans le même ordre sur les deux droites ? */
export function memeOrdre(f) {
  const position = ([p, q]) => {
    if (q < 0) return 'de part et d\'autre';
    return q > p ? 'au-delà' : 'entre';
  };
  return position(valeurs(f.d1)) === position(valeurs(f.d2));
}

/** 'papillon' si le sommet est entre les points, 'emboîtés' sinon. */
export const configuration = (f) => (valeurs(f.d1)[1] < 0 && valeurs(f.d2)[1] < 0 ? 'papillon' : 'emboîtés');

export function erreursThales(f) {
  const erreurs = [];
  if (!f.sommet) return ['il faut un sommet'];
  const d1 = Object.entries(f.d1 ?? {});
  const d2 = Object.entries(f.d2 ?? {});
  if (d1.length !== 2 || d2.length !== 2) return ['chaque droite porte exactement deux points'];
  const noms = [f.sommet, ...d1.map(([n]) => n), ...d2.map(([n]) => n)];
  if (new Set(noms).size !== 5) erreurs.push('les cinq points doivent avoir des noms différents');
  for (const [[nom, p], [autre, q]] of [d1, d2]) {
    if (!(p > 0)) erreurs.push(`le premier point de chaque droite doit être à une distance positive (${nom} : ${p})`);
    if (!q || Math.abs(q - p) < TOLERANCE) erreurs.push(`le point ${autre} doit être distinct du sommet et de ${nom}`);
  }
  const cos = cosAngle(f);
  if (f.base) {
    const pts = pointsThales(f);
    const [x, y] = [pts[f.base[0][0]], pts[f.base[0][1]]];
    if (!x || !y || x.droite === 0 || y.droite === 0 || x.droite === y.droite) {
      erreurs.push(`la base ${f.base[0]} doit joindre un point de chaque droite`);
    } else if (!(Math.abs(cos) < 1)) {
      erreurs.push(`aucun triangle n'a ces longueurs : la base ${f.base[0]} = ${f.base[1]} est impossible`);
    }
  }
  // Un angle trop fermé colle les deux droites ; trop ouvert, il les aligne.
  const angle = deg(Math.acos(Math.max(-1, Math.min(1, cos))));
  if (angle < 20 || angle > 150) erreurs.push(`l'angle entre les deux droites (${Math.round(angle)}°) rend la figure illisible`);
  for (const [segment, etiquette] of Object.entries(f.cotes ?? {})) {
    const longueur = longueurThales(f, segment);
    if (longueur === undefined) { erreurs.push(`longueur écrite sur un segment inconnu : ${segment}`); continue; }
    const lue = nombreEcrit(etiquette);
    if (lue !== null && Math.abs(lue - longueur) > TOLERANCE) {
      erreurs.push(`${segment} est écrit ${etiquette}, mais la figure le dessine à ${Math.round(longueur * 1000) / 1000}`);
    }
  }
  return erreurs;
}

export function figureThales(f) {
  const c = coordonneesThales(f);
  const noms = Object.keys(c);
  const xs = noms.map((n) => c[n].x);
  const ys = noms.map((n) => c[n].y);
  const [xmin, xmax, ymin, ymax] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const marge = 58;
  const largeur = Math.max(xmax - xmin, 1e-6);
  const haut = Math.max(ymax - ymin, 1e-6);
  const echelle = Math.min((L - 2 * marge) / largeur, (300 - 2 * marge) / haut);
  const hauteur = haut * echelle + 2 * marge;
  const decalage = (L - 2 * marge - largeur * echelle) / 2;
  const P = Object.fromEntries(noms.map((n) => [n, {
    x: marge + decalage + (c[n].x - xmin) * echelle,
    y: marge + (ymax - c[n].y) * echelle,
  }]));
  const S = P[f.sommet];
  const pts = pointsThales(f);
  const [a1, b1] = Object.keys(f.d1);
  const [a2, b2] = Object.keys(f.d2);
  const direction = { 1: unitaire(moins(P[a1], S)), 2: unitaire(moins(P[a2], S)) };

  // Chaque trait est gardé en mémoire : les lettres devront l'éviter.
  const segments = [];
  const tracer = (a, b, classe) => { segments.push([a, b]); return trait(a, b, classe); };

  // Les deux droites sécantes, prolongées au-delà de leurs points.
  const traits = [];
  for (const [i, d] of [[1, f.d1], [2, f.d2]]) {
    const ds = [0, ...valeurs(d)];
    const u = direction[i];
    traits.push(tracer(plus(S, u, Math.min(...ds) * echelle - 28), plus(S, u, Math.max(...ds) * echelle + 28), 'f-droite'));
  }
  // Les deux transversales, prolongées elles aussi : ce sont des droites.
  for (const [x, y] of [[a1, a2], [b1, b2]]) {
    const u = unitaire(moins(P[y], P[x]));
    traits.push(tracer(plus(P[x], u, -22), plus(P[y], u, 22), 'f-transversale'));
  }

  // Les longueurs : une cote le long des droites, une étiquette pour les transversales.
  const cotes = [];
  const occupes = [];
  const surLaDroite = (seg) => {
    const ds = [...seg].map((l) => pts[l]?.droite);
    if (ds.includes(undefined)) return null;
    const hors = ds.filter((d) => d !== 0);
    if (!hors.length) return null;
    return hors.every((d) => d === hors[0]) ? hors[0] : null;
  };
  const prochain = {};
  const entrees = Object.entries(f.cotes ?? {})
    .map(([seg, etiquette]) => ({ seg, etiquette, droite: surLaDroite(seg), longueur: longueurThales(f, seg) }))
    .filter((e) => e.longueur !== undefined)
    .sort((a, b) => a.longueur - b.longueur);
  for (const { seg, etiquette, droite } of entrees) {
    const [X, Y] = [P[seg[0]], P[seg[1]]];
    const milieu = { x: (X.x + Y.x) / 2, y: (X.y + Y.y) / 2 };
    const classe = `f-cote-texte${String(etiquette).includes('?') ? ' f-inconnue' : ''}`;
    if (!droite) {
      let n = normale(unitaire(moins(Y, X)));
      if (scalaire(n, moins(milieu, S)) < 0) n = oppose(n);
      const e = encombrement(etiquette, n, true);
      const ici = plus(milieu, n, 6 + e.versLeTrait);
      occupes.push(...e.empreinte(ici));
      cotes.push(texte(ici, etiquette, classe));
      continue;
    }
    // Le côté extérieur : à l'opposé des points de l'autre droite qui sont du
    // même côté du sommet — c'est de là que partent les transversales.
    const autre = droite === 1 ? f.d2 : f.d1;
    const cote = Math.sign([...seg].reduce((t, l) => t + (pts[l]?.d ?? 0), 0)) || 1;
    const voisins = Object.keys(autre).filter((l) => Math.sign(pts[l].d) === cote);
    const reference = voisins.length ? voisins : Object.keys(autre);
    const vers = reference.reduce((t, l) => plus(t, moins(P[l], S)), { x: 0, y: 0 });
    let n = normale(direction[droite]);
    if (scalaire(n, vers) > 0) n = oppose(n);
    const cle = `${droite}${Math.sign(scalaire(n, normale(direction[droite])))}`;
    const ecart = prochain[cle] ?? 16;
    const [X2, Y2] = [plus(X, n, ecart), plus(Y, n, ecart)];
    cotes.push(tracer(X2, Y2, 'f-cote'));
    for (const E of [X2, Y2]) cotes.push(tracer(plus(E, n, -4), plus(E, n, 4), 'f-cote'));
    const e = encombrement(etiquette, n);
    const ici = plus({ x: (X2.x + Y2.x) / 2, y: (X2.y + Y2.y) / 2 }, n, 4 + e.versLeTrait);
    // La cote suivante, du même côté de la même droite, passe au-delà de ce texte.
    prochain[cle] = ecart + 4 + e.versLeTrait + e.auDela + 5;
    occupes.push(...e.empreinte(ici));
    cotes.push(texte(ici, etiquette, classe, e.ancre));
  }

  // Les noms des points, là où ils gênent le moins : loin des traits, des
  // cotes et des autres noms. Le sommet d'abord, c'est le plus encombré.
  const lettres = [];
  for (const nom of [f.sommet, ...noms.filter((n) => n !== f.sommet)]) {
    const ici = meilleurePlace(P[nom], nom === f.sommet ? 17 : 15, segments, occupes);
    occupes.push(ici);
    lettres.push(texte(ici, nom, 'f-lettre'));
  }

  const points = noms.map((n) => `<circle cx="${arrondi(P[n].x)}" cy="${arrondi(P[n].y)}" r="3.2" class="f-point"/>`);
  const ordre = (d, nom1, nom2) => {
    const [p, q] = valeurs(d);
    return q < 0 ? `${nom1} et ${nom2} de part et d'autre de ${f.sommet}` : `${nom1} et ${nom2} du même côté de ${f.sommet}`;
  };
  const description = `Deux droites sécantes en ${f.sommet} : ${f.sommet}, ${a1}, ${b1} sont alignés (${ordre(f.d1, a1, b1)}), `
    + `ainsi que ${f.sommet}, ${a2}, ${b2} (${ordre(f.d2, a2, b2)}). Les droites (${a1}${a2}) et (${b1}${b2}) sont tracées.`
    + (entrees.length ? ` Longueurs indiquées : ${entrees.map((e) => `${e.seg} = ${e.etiquette}`).join(', ')}.` : '');
  return cadre(f, hauteur, description, `${traits.join('')}${cotes.join('')}${points.join('')}${lettres.join('')}`);
}

// ── Triangles semblables ────────────────────────────────────────────────────

/** Cherche la longueur de [XY] dans une table { AB: 4 } écrite dans un sens ou l'autre. */
const cote = (table, x, y) => table?.[x + y] ?? table?.[y + x];

/** Les trois angles du premier triangle, par sommet. */
function anglesT1(f) {
  const [A, B, C] = f.t1.sommets;
  if (f.t1.angles) {
    const a = { ...f.t1.angles };
    const connus = [A, B, C].filter((s) => a[s] !== undefined);
    if (connus.length === 2) {
      const manquant = [A, B, C].find((s) => a[s] === undefined);
      a[manquant] = 180 - connus.reduce((s, x) => s + a[x], 0);
    }
    return a;
  }
  const [ab, bc, ca] = [cote(f.t1.longueurs, A, B), cote(f.t1.longueurs, B, C), cote(f.t1.longueurs, C, A)];
  const angle = (adj1, adj2, oppose) => deg(Math.acos((adj1 ** 2 + adj2 ** 2 - oppose ** 2) / (2 * adj1 * adj2)));
  return { [A]: angle(ab, ca, bc), [B]: angle(ab, bc, ca), [C]: angle(bc, ca, ab) };
}

/** Le sommet (ou le côté) homologue, dans l'autre triangle. */
export function homologue(f, x) {
  const [a, b] = [f.t1.sommets, f.t2.sommets];
  const un = (l) => {
    const i = a.indexOf(l);
    if (i >= 0) return b[i];
    const j = b.indexOf(l);
    return j >= 0 ? a[j] : undefined;
  };
  const res = [...x].map(un);
  return res.includes(undefined) ? undefined : res.join('');
}

/** La mesure de l'angle en un sommet, dans l'un ou l'autre triangle. */
export function angleSemblables(f, sommet) {
  const angles = anglesT1(f);
  if (f.t1.sommets.includes(sommet)) return angles[sommet];
  const h = homologue(f, sommet);
  return h ? angles[h] : undefined;
}

/** La longueur d'un côté — seulement si le premier triangle est donné par ses longueurs. */
export function longueurSemblables(f, segment) {
  if (!f.t1.longueurs) return undefined;
  const [x, y] = segment;
  const direct = cote(f.t1.longueurs, x, y);
  if (direct !== undefined && f.t1.sommets.includes(x)) return direct;
  const h = homologue(f, segment);
  if (!h || !f.t2.sommets.includes(x)) return undefined;
  const origine = cote(f.t1.longueurs, h[0], h[1]);
  return origine === undefined ? undefined : origine * f.t2.k;
}

export function erreursSemblables(f) {
  const erreurs = [];
  const s1 = f.t1?.sommets ?? [];
  const s2 = f.t2?.sommets ?? [];
  if (s1.length !== 3 || s2.length !== 3) return ['chaque triangle a trois sommets'];
  if (new Set([...s1, ...s2]).size !== 6) erreurs.push('les six sommets doivent avoir des noms différents');
  if (!!f.t1.angles === !!f.t1.longueurs) return [...erreurs, 'le premier triangle se donne par ses angles OU par ses longueurs'];
  if (!(f.t2.k > 0)) erreurs.push('le coefficient k doit être positif');
  if (f.t1.angles) {
    const n = Object.keys(f.t1.angles).length;
    if (n < 2) erreurs.push('il faut au moins deux angles');
    if (n === 3 && Math.abs(Object.values(f.t1.angles).reduce((s, v) => s + v, 0) - 180) > TOLERANCE) {
      erreurs.push('les trois angles ne font pas 180°');
    }
  } else {
    const [A, B, C] = s1;
    const l = [cote(f.t1.longueurs, A, B), cote(f.t1.longueurs, B, C), cote(f.t1.longueurs, C, A)];
    if (l.some((v) => !(v > 0))) return [...erreurs, 'il faut les trois longueurs du premier triangle'];
    const [p, q, r] = [...l].sort((u, v) => u - v);
    if (!(r < p + q)) return [...erreurs, `aucun triangle n'a pour côtés ${l.join(', ')}`];
  }
  const angles = anglesT1(f);
  if (Object.values(angles).some((v) => !(v >= 15))) erreurs.push('un angle trop fermé rend la figure illisible');
  for (const [cle, etiquette] of Object.entries(f.etiquettes ?? {})) {
    const lue = nombreEcrit(etiquette);
    if (cle.length === 1) {
      if (![...s1, ...s2].includes(cle)) { erreurs.push(`étiquette sur un sommet inconnu : ${cle}`); continue; }
      if (lue !== null && String(etiquette).includes('°') && Math.abs(lue - angleSemblables(f, cle)) > TOLERANCE) {
        erreurs.push(`l'angle en ${cle} est écrit ${etiquette}, mais il est dessiné à ${Math.round(angleSemblables(f, cle) * 10) / 10}°`);
      }
      continue;
    }
    const dansT1 = [...cle].every((l) => s1.includes(l));
    const dansT2 = [...cle].every((l) => s2.includes(l));
    if (cle.length !== 2 || !(dansT1 || dansT2)) { erreurs.push(`étiquette sur un côté inconnu : ${cle}`); continue; }
    if (lue === null) continue;
    // Une longueur n'est écrite que sur une figure donnée par ses longueurs :
    // sur une figure donnée par ses angles, rien ne dit qu'elle serait juste.
    const longueur = longueurSemblables(f, cle);
    if (longueur === undefined) erreurs.push(`longueur écrite sur ${cle}, mais le premier triangle n'est pas donné par ses longueurs`);
    else if (Math.abs(lue - longueur) > TOLERANCE) erreurs.push(`${cle} est écrit ${etiquette}, mais la figure le dessine à ${Math.round(longueur * 1000) / 1000}`);
  }
  return erreurs;
}

export function figureSemblables(f) {
  const [A, B, C] = f.t1.sommets;
  const angles = anglesT1(f);
  // Le premier triangle : [BC] sur l'horizontale, A au-dessus.
  let ab;
  let bc;
  if (f.t1.longueurs) {
    ab = cote(f.t1.longueurs, A, B);
    bc = cote(f.t1.longueurs, B, C);
  } else {
    bc = 1;
    ab = Math.sin(rad(angles[C])) / Math.sin(rad(angles[A]));
  }
  const t1 = [
    { x: ab * Math.cos(rad(angles[B])), y: ab * Math.sin(rad(angles[B])) },
    { x: 0, y: 0 },
    { x: bc, y: 0 },
  ];
  // Le second : multiplié par k, retourné s'il le faut, puis tourné.
  const r = rad(f.t2.rotation ?? 0);
  const t2 = t1.map((p) => {
    const x = (f.t2.miroir ? -p.x : p.x) * f.t2.k;
    const y = p.y * f.t2.k;
    return { x: x * Math.cos(r) - y * Math.sin(r), y: x * Math.sin(r) + y * Math.cos(r) };
  });
  const boite = (t) => {
    const xs = t.map((p) => p.x);
    const ys = t.map((p) => p.y);
    return { xmin: Math.min(...xs), xmax: Math.max(...xs), ymin: Math.min(...ys), ymax: Math.max(...ys) };
  };
  const [b1, b2] = [boite(t1), boite(t2)];
  const [w1, w2] = [b1.xmax - b1.xmin, b2.xmax - b2.xmin];
  const [h1, h2] = [b1.ymax - b1.ymin, b2.ymax - b2.ymin];
  const marge = 46;
  const ecart = 70;
  const echelle = Math.min((L - 2 * marge - ecart) / (w1 + w2), (260 - 2 * marge) / Math.max(h1, h2));
  const hmax = Math.max(h1, h2) * echelle;
  const debut = marge + (L - 2 * marge - ecart - (w1 + w2) * echelle) / 2;
  const placer = (t, b, x0) => t.map((p) => ({
    x: x0 + (p.x - b.xmin) * echelle,
    y: marge + (hmax - (b.ymax - b.ymin) * echelle) / 2 + (b.ymax - p.y) * echelle,
  }));
  const T1 = placer(t1, b1, debut);
  const T2 = placer(t2, b2, debut + w1 * echelle + ecart);

  const couleurs = ['a', 'b', 'c'];
  const dessins = [];
  const textes = [];
  for (const [T, sommets] of [[T1, f.t1.sommets], [T2, f.t2.sommets]]) {
    dessins.push(`<path d="M${pt(T[0])} L${pt(T[1])} L${pt(T[2])} Z" class="f-triangle"/>`);
    const centre = { x: (T[0].x + T[1].x + T[2].x) / 3, y: (T[0].y + T[1].y + T[2].y) / 3 };
    T.forEach((V, i) => {
      const [P, Q] = [T[(i + 1) % 3], T[(i + 2) % 3]];
      const [u, v] = [unitaire(moins(P, V)), unitaire(moins(Q, V))];
      const rayon = 16;
      const [d1, d2] = [plus(V, u, rayon), plus(V, v, rayon)];
      const sens = u.x * v.y - u.y * v.x > 0 ? 1 : 0;
      const classe = f.couleurs === false ? 'neutre' : couleurs[i];
      dessins.push(`<path d="M${pt(V)} L${pt(d1)} A${rayon},${rayon} 0 0 ${sens} ${pt(d2)} Z" class="f-arc f-arc--${classe}"/>`);
      textes.push(texte(plus(V, unitaire(moins(V, centre)), 15), sommets[i], 'f-lettre'));
      const etiquette = f.etiquettes?.[sommets[i]];
      if (etiquette) textes.push(texte(plus(V, unitaire(plus(u, v)), 36), etiquette, 'f-mesure'));
    });
    // Les longueurs écrites sur les côtés, à l'extérieur du triangle.
    for (let i = 0; i < 3; i += 1) {
      const [X, Y] = [T[i], T[(i + 1) % 3]];
      const nom = sommets[i] + sommets[(i + 1) % 3];
      const etiquette = f.etiquettes?.[nom] ?? f.etiquettes?.[nom[1] + nom[0]];
      if (!etiquette) continue;
      const milieu = { x: (X.x + Y.x) / 2, y: (X.y + Y.y) / 2 };
      let n = normale(unitaire(moins(Y, X)));
      if (scalaire(n, moins(milieu, centre)) < 0) n = oppose(n);
      textes.push(texte(plus(milieu, n, 13), etiquette, `f-cote-texte${String(etiquette).includes('?') ? ' f-inconnue' : ''}`));
    }
  }
  // Les noms dans l'ordre alphabétique : l'ordre de t2 dirait les homologues.
  const nom = (s) => [...s].sort().join('');
  const description = `Deux triangles, ${nom(f.t1.sommets)} et ${nom(f.t2.sommets)}.`
    + (f.couleurs === false ? '' : ' Les angles de même couleur ont la même mesure.');
  return cadre(f, hmax + 2 * marge, description, `${dessins.join('')}${textes.join('')}`);
}

// ── Aiguillage ──────────────────────────────────────────────────────────────

const MODELES = {
  thales: { tracer: figureThales, erreurs: erreursThales },
  semblables: { tracer: figureSemblables, erreurs: erreursSemblables },
};

/** La figure en SVG, ou une chaîne vide s'il n'y en a pas. */
export const figure = (f) => (f && MODELES[f.modele] ? MODELES[f.modele].tracer(f) : '');

/** Les défauts d'une figure, pour le contrôle de contenu. */
export const erreursFigure = (f) => (MODELES[f?.modele] ? MODELES[f.modele].erreurs(f) : [`modèle de figure inconnu : « ${f?.modele} »`]);
