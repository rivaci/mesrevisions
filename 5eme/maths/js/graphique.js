// Tracé d'un repère et d'une dépendance, en SVG.
//
// ── Pourquoi une exception à la règle « aucune figure » ──────────────────────
//
// Le reste de l'appli décrit tout en toutes lettres : pas de triangle dessiné,
// pas de figure de Thalès, les alignements écrits en clair. Cette contrainte
// tient parce qu'aucun savoir-faire ne porte SUR la figure — Pythagore se
// calcule à partir de longueurs, pas d'un dessin.
//
// Le chapitre 14 rompt ce contrat : « lire et interpréter une valeur sur un
// graphique » est un savoir-faire dont l'objet EST le graphique. Le remplacer
// par un tableau de valeurs ne le dégrade pas, il le change — lire un tableau
// et lire un graphique sont deux gestes différents, et c'est précisément le
// second que le programme demande. On le trace donc.
//
// Ce n'est pas une image à trouver quelque part : ce sont des coordonnées que
// le contenu possède déjà, rendues en SVG. Aucun fichier, aucune licence,
// aucun poids ajouté, et le tracé se relit dans le code plutôt que dans un
// éditeur d'images. Il reste vérifiable : un point hors du cadre se détecte.
//
// ── Ce que ce module ne fait pas ────────────────────────────────────────────
//
// Ni courbes, ni échelles logarithmiques, ni légendes multiples. Une dépendance
// à la fois, des segments entre les points, des graduations régulières. C'est
// le programme de 4e, et rien de plus n'a été demandé.
//
// Pas d'import de MathLive ici — ce module se teste donc hors navigateur.

/** Écriture française d'un nombre : virgule décimale, vrai signe moins. */
const fr = (n) => String(n).replace('-', '−').replace('.', ',');

const echapper = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Le repère interne. L'affichage est piloté par viewBox : ces nombres ne sont
// pas des pixels à l'écran, seulement des proportions.
const L = 480;
const H = 320;
const MARGE = { gauche: 52, droite: 18, haut: 16, bas: 44 };
const X0 = MARGE.gauche;
const X1 = L - MARGE.droite;
const Y0 = MARGE.haut;
const Y1 = H - MARGE.bas;

/**
 * Les valeurs graduées d'un axe.
 *
 * Au-delà de onze étiquettes elles se chevauchent et deviennent illisibles :
 * on garde alors toutes les lignes de la grille, mais on n'écrit qu'une
 * graduation sur deux (ou sur trois). Une grille sans repère chiffré ne
 * servirait à rien — c'est justement en comptant les carreaux au lieu de lire
 * les nombres que l'élève se trompe.
 */
function graduations(axe) {
  const valeurs = [];
  const pas = axe.pas || 1;
  // Une somme répétée dériverait sur les pas décimaux (0,1 + 0,1 + 0,1 ≠ 0,3) :
  // on multiplie, et on arrondit au millième pour absorber le flottant.
  const n = Math.round((axe.max - axe.min) / pas);
  for (let i = 0; i <= n; i += 1) valeurs.push(Math.round((axe.min + i * pas) * 1000) / 1000);
  const saut = Math.ceil(valeurs.length / 11);
  return valeurs.map((v, i) => ({ v, ecrite: i % saut === 0 }));
}

/**
 * Le graphique d'une dépendance.
 *
 *   {
 *     x: { titre: 'Nombre de séances', min: 0, max: 10, pas: 1 },
 *     y: { titre: 'Prix (€)',          min: 0, max: 40, pas: 5 },
 *     points: [[0, 15], [10, 35]],   // reliés dans l'ordre donné
 *     relie: true,                    // false : un nuage de points isolés
 *     reperes: [[4, 23]],             // pointillés vers les deux axes
 *     titre: 'Le prix selon le nombre de séances',
 *   }
 *
 * Renvoie '' si la description est absente : les appelants peuvent donc
 * l'insérer sans condition.
 */
export function graphique(g) {
  if (!g || !g.x || !g.y) return '';

  const px = (v) => X0 + ((v - g.x.min) / (g.x.max - g.x.min)) * (X1 - X0);
  const py = (v) => Y1 - ((v - g.y.min) / (g.y.max - g.y.min)) * (Y1 - Y0);

  const grille = [];
  const etiquettes = [];

  for (const { v, ecrite } of graduations(g.x)) {
    const x = px(v);
    grille.push(`<line x1="${x}" y1="${Y0}" x2="${x}" y2="${Y1}" class="g-grille"/>`);
    if (ecrite) {
      grille.push(`<line x1="${x}" y1="${Y1}" x2="${x}" y2="${Y1 + 5}" class="g-axe"/>`);
      etiquettes.push(`<text x="${x}" y="${Y1 + 19}" class="g-nombre" text-anchor="middle">${fr(v)}</text>`);
    }
  }
  for (const { v, ecrite } of graduations(g.y)) {
    const y = py(v);
    grille.push(`<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y}" class="g-grille"/>`);
    if (ecrite) {
      grille.push(`<line x1="${X0 - 5}" y1="${y}" x2="${X0}" y2="${y}" class="g-axe"/>`);
      etiquettes.push(`<text x="${X0 - 9}" y="${y + 4}" class="g-nombre" text-anchor="end">${fr(v)}</text>`);
    }
  }

  const pts = g.points ?? [];
  const dedans = ([x, y]) => x >= g.x.min && x <= g.x.max && y >= g.y.min && y <= g.y.max;
  const trace = pts.filter(dedans);
  const ligne = g.relie !== false && trace.length > 1
    ? `<polyline points="${trace.map(([x, y]) => `${px(x)},${py(y)}`).join(' ')}" class="g-trace"/>`
    : '';
  const disques = trace.map(([x, y]) => `<circle cx="${px(x)}" cy="${py(y)}" r="4" class="g-point"/>`).join('');

  // Les pointillés du savoir-faire « lire une valeur » : ils montrent le
  // geste — monter depuis l'axe des abscisses, puis lire à gauche — sans
  // écrire la valeur, que l'élève doit trouver lui-même.
  const reperes = (g.reperes ?? []).filter(dedans).map(([x, y]) => `
    <line x1="${px(x)}" y1="${Y1}" x2="${px(x)}" y2="${py(y)}" class="g-repere"/>
    <line x1="${px(x)}" y1="${py(y)}" x2="${X0}" y2="${py(y)}" class="g-repere"/>
    <circle cx="${px(x)}" cy="${py(y)}" r="5" class="g-point g-point--vise"/>`).join('');

  const description = `${g.titre ? `${g.titre}. ` : ''}En abscisse : ${g.x.titre ?? 'x'}, de ${fr(g.x.min)} à ${fr(g.x.max)}. `
    + `En ordonnée : ${g.y.titre ?? 'y'}, de ${fr(g.y.min)} à ${fr(g.y.max)}.`;

  return `<figure class="graphique">
    ${g.titre ? `<figcaption>${echapper(g.titre)}</figcaption>` : ''}
    <svg viewBox="0 0 ${L} ${H}" role="img" aria-label="${echapper(description)}">
      ${grille.join('')}
      <line x1="${X0}" y1="${Y1}" x2="${X1 + 6}" y2="${Y1}" class="g-axe"/>
      <line x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0 - 6}" class="g-axe"/>
      ${reperes}${ligne}${disques}
      ${etiquettes.join('')}
      <text x="${X1 + 4}" y="${Y1 + 32}" class="g-titre-axe" text-anchor="end">${echapper(g.x.titre ?? '')}</text>
      <text x="${X0 - 6}" y="${Y0 - 4}" class="g-titre-axe" text-anchor="start">${echapper(g.y.titre ?? '')}</text>
    </svg>
  </figure>`;
}

/**
 * Le contrôle que le contenu doit passer : tout point doit tomber dans le cadre.
 *
 * Un point hors cadre est silencieux à l'écran — il n'est simplement pas
 * tracé — et l'élève cherche alors une valeur qui n'est nulle part. C'est
 * exactement le genre de faute qu'on refuse de laisser passer, d'où sa
 * remontée au contrôle de contenu plutôt qu'un filtrage discret.
 */
export function pointsHorsCadre(g) {
  if (!g || !g.x || !g.y) return [];
  return [...(g.points ?? []), ...(g.reperes ?? [])]
    .filter(([x, y]) => x < g.x.min || x > g.x.max || y < g.y.min || y > g.y.max);
}
