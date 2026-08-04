// Convertit les GeoJSON de tools/sources/ en tracés SVG prêts à l'emploi.
//
// À lancer une seule fois (ou après modification des sources) :
//     node tools/build-maps.mjs
//
// Le résultat est écrit dans assets/maps/ et commité. Le site lui-même n'a
// donc aucune étape de build : il lit des fichiers JSON statiques.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FLEUVES, MASSIFS, MERS, VILLES, MARQUEURS_EUROPE } from './sources/features.mjs';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sources = join(racine, 'tools', 'sources');
const sortie = join(racine, 'assets', 'maps');

const lire = (nom) => JSON.parse(readFileSync(join(sources, nom), 'utf8'));

// --- Projection de Mercator -------------------------------------------------
// Choisie pour sa familiarité : c'est la projection des cartes scolaires et des
// cartes en ligne. Les formes reconnues par l'élève sont celles-là.

const mercator = ([lon, lat]) => [
  lon,
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2)) * (180 / Math.PI),
];

/** Construit une fonction qui projette lon/lat vers le repère SVG demandé. */
function cadrer(pointsLonLat, largeur, hauteur, marge = 8) {
  const projetes = pointsLonLat.map(mercator);
  const xs = projetes.map((p) => p[0]);
  const ys = projetes.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const echelle = Math.min(
    (largeur - 2 * marge) / (maxX - minX),
    (hauteur - 2 * marge) / (maxY - minY),
  );
  // Centre le contenu dans le cadre.
  const decalageX = (largeur - (maxX - minX) * echelle) / 2;
  const decalageY = (hauteur - (maxY - minY) * echelle) / 2;

  return (lonLat) => {
    const [x, y] = mercator(lonLat);
    return [
      arrondir((x - minX) * echelle + decalageX),
      // L'axe Y du SVG descend, celui de la latitude monte.
      arrondir((maxY - y) * echelle + decalageY),
    ];
  };
}

const arrondir = (n) => Math.round(n * 10) / 10;

// --- GeoJSON → chemin SVG ---------------------------------------------------

/** Retire les points quasi confondus une fois projetés : gain de poids sans perte visible. */
function alleger(points, seuil = 0.6) {
  const gardes = [points[0]];
  for (const p of points.slice(1)) {
    const dernier = gardes[gardes.length - 1];
    if (Math.hypot(p[0] - dernier[0], p[1] - dernier[1]) >= seuil) gardes.push(p);
  }
  // Un anneau doit garder au moins un triangle pour rester visible.
  return gardes.length >= 3 ? gardes : points;
}

function anneauxDe(geometrie) {
  if (geometrie.type === 'Polygon') return geometrie.coordinates;
  if (geometrie.type === 'MultiPolygon') return geometrie.coordinates.flat();
  throw new Error(`Géométrie non gérée : ${geometrie.type}`);
}

function cheminDe(geometrie, projeter, seuil, garder = () => true) {
  return anneauxDe(geometrie)
    .filter((anneau) => anneau.some(garder))
    .map((anneau) => alleger(anneau.map(projeter), seuil))
    .map((pts) => 'M' + pts.map((p) => `${p[0]},${p[1]}`).join('L') + 'Z')
    .join('');
}

const tousLesPoints = (features) =>
  features.flatMap((f) => anneauxDe(f.geometry).flat());

/** Aire algébrique d'un anneau (formule du lacet). Le signe indique le sens de parcours. */
function aireAnneau(points) {
  let somme = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    somme += points[j][0] * points[i][1] - points[i][0] * points[j][1];
  }
  return somme / 2;
}

/**
 * Centre visuel d'une géométrie, calculé sur son plus grand anneau seulement.
 * Sinon le centre de la France serait tiré vers la Corse, et celui de la Grèce
 * perdu au milieu de la mer Égée.
 */
function centreEtAire(geometrie, projeter, garder = () => true) {
  const anneaux = anneauxDe(geometrie)
    .filter((a) => a.some(garder))
    .map((a) => a.map(projeter));
  const principal = anneaux.reduce((a, b) =>
    Math.abs(aireAnneau(b)) > Math.abs(aireAnneau(a)) ? b : a,
  );

  const aire = aireAnneau(principal);
  // Centroïde polygonal. Si l'anneau est dégénéré (aire nulle), on retombe sur
  // la moyenne des sommets.
  if (Math.abs(aire) < 1e-6) {
    const n = principal.length;
    return {
      cx: arrondir(principal.reduce((s, p) => s + p[0], 0) / n),
      cy: arrondir(principal.reduce((s, p) => s + p[1], 0) / n),
      aire: 0,
    };
  }

  let cx = 0;
  let cy = 0;
  for (let i = 0, j = principal.length - 1; i < principal.length; j = i++) {
    const croix = principal[j][0] * principal[i][1] - principal[i][0] * principal[j][1];
    cx += (principal[j][0] + principal[i][0]) * croix;
    cy += (principal[j][1] + principal[i][1]) * croix;
  }
  return {
    cx: arrondir(cx / (6 * aire)),
    cy: arrondir(cy / (6 * aire)),
    aire: Math.round(Math.abs(aire)),
  };
}

// --- Carte de France --------------------------------------------------------

function construireFrance() {
  const LARGEUR = 640;
  const HAUTEUR = 640;

  const regions = lire('fr-regions.geojson').features;
  const monde = lire('world.geojson').features;

  // Le cadrage se cale sur les régions seules : les pays voisins ne servent que
  // de décor et ne doivent pas élargir la vue.
  const projeter = cadrer(tousLesPoints(regions), LARGEUR, HAUTEUR, 14);

  const voisins = ['Belgium', 'Germany', 'Luxembourg', 'Switzerland', 'Italy', 'Spain', 'United Kingdom', 'Netherlands', 'Andorra'];
  const decor = monde
    .filter((f) => voisins.includes(f.properties.name))
    .map((f) => cheminDe(f.geometry, projeter, 1.2))
    .join('');

  return {
    viewBox: `0 0 ${LARGEUR} ${HAUTEUR}`,
    decor,
    regions: regions.map((f) => ({
      id: f.properties.code,
      nom: f.properties.nom,
      d: cheminDe(f.geometry, projeter, 0.9),
      ...centreEtAire(f.geometry, projeter),
    })),
    fleuves: FLEUVES.map((f) => ({
      id: f.id,
      nom: f.nom,
      d: 'M' + f.points.map(projeter).map((p) => `${p[0]},${p[1]}`).join('L'),
    })),
    massifs: MASSIFS.map((m) => ({
      id: m.id,
      nom: m.nom,
      d: 'M' + m.contour.map(projeter).map((p) => `${p[0]},${p[1]}`).join('L') + 'Z',
    })),
    mers: MERS.map((m) => {
      const [x, y] = projeter(m.point);
      // Le rayon est donné en degrés : on le convertit en unités SVG en
      // projetant un second point décalé d'autant.
      const [x2] = projeter([m.point[0] + m.rayon, m.point[1]]);
      return { id: m.id, nom: m.nom, x, y, r: arrondir(Math.abs(x2 - x)) };
    }),
    villes: VILLES.map((v) => {
      const [x, y] = projeter(v.point);
      return { id: v.id, nom: v.nom, x, y };
    }),
    drom: construireDrom(),
  };
}

/** Chaque DROM est dessiné dans sa propre vignette, comme sur les cartes scolaires. */
function construireDrom() {
  const COTE = 200;
  const fichiers = readdirSync(sources).filter((f) => f.startsWith('drom-'));

  return fichiers.map((fichier) => {
    const brut = lire(fichier);
    const feature = brut.type === 'FeatureCollection' ? brut.features[0] : brut;
    const projeter = cadrer(anneauxDe(feature.geometry).flat(), COTE, COTE, 12);
    return {
      id: fichier.replace('drom-', '').replace('.geojson', ''),
      nom: feature.properties.nom,
      viewBox: `0 0 ${COTE} ${COTE}`,
      d: cheminDe(feature.geometry, projeter, 1.3),
    };
  });
}

// --- Carte d'Europe ---------------------------------------------------------

// Le GeoJSON mondial nomme les pays en anglais : on les repasse en français.
const PAYS_UE = {
  Austria: 'Autriche',
  Belgium: 'Belgique',
  Bulgaria: 'Bulgarie',
  Croatia: 'Croatie',
  Cyprus: 'Chypre',
  'Czech Republic': 'Tchéquie',
  Denmark: 'Danemark',
  Estonia: 'Estonie',
  Finland: 'Finlande',
  France: 'France',
  Germany: 'Allemagne',
  Greece: 'Grèce',
  Hungary: 'Hongrie',
  Ireland: 'Irlande',
  Italy: 'Italie',
  Latvia: 'Lettonie',
  Lithuania: 'Lituanie',
  Luxembourg: 'Luxembourg',
  Netherlands: 'Pays-Bas',
  Poland: 'Pologne',
  Portugal: 'Portugal',
  Romania: 'Roumanie',
  Slovakia: 'Slovaquie',
  Slovenia: 'Slovénie',
  Spain: 'Espagne',
  Sweden: 'Suède',
};

// Pays européens hors UE : dessinés en gris. Sans eux, l'élève trouverait les
// bonnes réponses par élimination au lieu de reconnaître les formes.
const HORS_UE = [
  'United Kingdom', 'Switzerland', 'Norway', 'Ukraine', 'Serbia', 'Belarus',
  'Bosnia and Herzegovina', 'Albania', 'Macedonia', 'Montenegro', 'Moldova',
  'Turkey', 'Iceland', 'Russia', 'Kosovo',
];

function construireEurope() {
  const LARGEUR = 760;
  const HAUTEUR = 700;
  const monde = lire('world.geojson').features;

  const trouver = (nom) => monde.find((f) => f.properties.name === nom);

  const membres = Object.keys(PAYS_UE).map((nomAnglais) => {
    const f = trouver(nomAnglais);
    if (!f) throw new Error(`Pays introuvable dans world.geojson : ${nomAnglais}`);
    return { nomAnglais, feature: f };
  });

  // Fenêtre européenne. Sans elle, la Guyane et La Réunion (rattachées au tracé
  // « France ») et les Açores étireraient la carte sur un demi-planisphère.
  // Bornes : Irlande à l'ouest (-10,5°), Chypre à l'est (34,6°) et au sud
  // (34,6°), Finlande au nord (70,1°).
  const dansLEurope = ([lon, lat]) => lon > -12 && lon < 36 && lat > 33.5 && lat < 72;
  const pointsCadrage = tousLesPoints(membres.map((m) => m.feature)).filter(dansLEurope);
  const projeter = cadrer(pointsCadrage, LARGEUR, HAUTEUR, 16);

  const decor = HORS_UE.map(trouver)
    .filter(Boolean)
    .map((f) => cheminDe(f.geometry, projeter, 1.4, dansLEurope))
    .join('');

  const pays = membres.map(({ nomAnglais, feature }) => ({
    id: identifiant(PAYS_UE[nomAnglais]),
    nom: PAYS_UE[nomAnglais],
    d: cheminDe(feature.geometry, projeter, 0.8, dansLEurope),
    ...centreEtAire(feature.geometry, projeter, dansLEurope),
  }));

  const marqueurs = MARQUEURS_EUROPE.map((m) => {
    const [x, y] = projeter(m.point);
    return { id: m.id, nom: m.nom, x, y };
  });

  return { viewBox: `0 0 ${LARGEUR} ${HAUTEUR}`, decor, pays, marqueurs };
}

const identifiant = (nom) =>
  nom.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, '-');

// --- Écriture ---------------------------------------------------------------

for (const [nom, donnees] of [['france', construireFrance()], ['europe', construireEurope()]]) {
  const chemin = join(sortie, `${nom}.json`);
  writeFileSync(chemin, JSON.stringify(donnees));
  const poids = (readFileSync(chemin).length / 1024).toFixed(0);
  console.log(`${nom}.json écrit (${poids} Ko)`);
}
