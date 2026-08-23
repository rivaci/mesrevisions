// Convertit world.geojson en tracés SVG prêts à l'emploi.
//
// À lancer une seule fois (ou après modification des sources) :
//     node tools/build-maps.mjs
//
// Le résultat est écrit dans assets/maps/ et commité. Le site lui-même n'a donc
// aucune étape de build : il lit des fichiers JSON statiques.
//
// Deux cartes, deux projections, et ce n'est pas un détail :
//
// — le PLANISPHÈRE est en équirectangulaire. Mercator, qui va très bien pour
//   l'Europe, étire les pôles à l'infini : l'Antarctique y devient une bande
//   plus large que l'Afrique, et c'est l'un des six continents à reconnaître.
//   L'équirectangulaire déforme aussi, mais elle garde les latitudes
//   régulièrement espacées — donc l'équateur au milieu et les tropiques à
//   distance égale, ce qui est exactement l'image à mémoriser.
//
// — la MÉDITERRANÉE est en Mercator. Sur un bassin de quelques milliers de
//   kilomètres la déformation ne se voit pas, et c'est la projection des cartes
//   scolaires : les formes que l'élève reconnaîtra.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { union } from '@turf/union';
import { featureCollection } from '@turf/helpers';
import {
  CONTINENTS, A_CHEVAL, DECOR, LIGNES, OCEANS, VILLES_MEDITERRANEE, CADRE_MEDITERRANEE,
} from './sources/features.mjs';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sources = join(racine, 'tools', 'sources');
const sortie = join(racine, 'assets', 'maps');

const lire = (nom) => JSON.parse(readFileSync(join(sources, nom), 'utf8'));
const arrondir = (n) => Math.round(n * 10) / 10;

// --- Projections ------------------------------------------------------------

const equirectangulaire = ([lon, lat]) => [lon, lat];
const mercator = ([lon, lat]) => [
  lon,
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2)) * (180 / Math.PI),
];

/**
 * Construit une fonction qui projette lon/lat vers le repère SVG.
 *
 * Le cadrage vient de bornes DONNÉES, pas des points présents : sur un
 * planisphère, laisser les données décider ferait bouger le cadre — et donc la
 * position de l'équateur — au moindre ajout d'une île.
 */
function cadrer({ projection, ouest, est, sud, nord, largeur, hauteur, marge = 0 }) {
  const [minX] = projection([ouest, 0]);
  const [maxX] = projection([est, 0]);
  const [, minY] = projection([0, sud]);
  const [, maxY] = projection([0, nord]);

  const echelle = Math.min(
    (largeur - 2 * marge) / (maxX - minX),
    (hauteur - 2 * marge) / (maxY - minY),
  );
  const decalageX = (largeur - (maxX - minX) * echelle) / 2;
  const decalageY = (hauteur - (maxY - minY) * echelle) / 2;

  return (lonLat) => {
    const [x, y] = projection(lonLat);
    return [
      arrondir((x - minX) * echelle + decalageX),
      // L'axe Y du SVG descend, celui de la latitude monte.
      arrondir((maxY - y) * echelle + decalageY),
    ];
  };
}

// --- GeoJSON → chemin SVG ---------------------------------------------------

/** Retire les points quasi confondus une fois projetés : gain de poids sans perte visible. */
function alleger(points, seuil) {
  const gardes = [points[0]];
  for (const p of points.slice(1)) {
    const dernier = gardes[gardes.length - 1];
    if (Math.hypot(p[0] - dernier[0], p[1] - dernier[1]) >= seuil) gardes.push(p);
  }
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

/** Aire algébrique d'un anneau (formule du lacet). */
function aireAnneau(points) {
  let somme = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    somme += points[j][0] * points[i][1] - points[i][0] * points[j][1];
  }
  return somme / 2;
}

/** Centroïde d'un seul anneau, pondéré par son aire. */
function centroideAnneau(points) {
  const aire = aireAnneau(points);
  if (Math.abs(aire) < 1e-9) return null;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const croix = points[j][0] * points[i][1] - points[i][0] * points[j][1];
    cx += (points[j][0] + points[i][0]) * croix;
    cy += (points[j][1] + points[i][1]) * croix;
  }
  return { cx: cx / (6 * aire), cy: cy / (6 * aire), aire };
}

/**
 * Centre de masse d'un ensemble de géométries — la moyenne des centroïdes de
 * TOUS les anneaux, pondérée par leur aire.
 *
 * Prendre le plus grand anneau, comme pour un pays, ne marche pas pour un
 * continent : le plus grand pays d'Afrique est l'Algérie, et l'étiquette
 * « Afrique » se posait donc au Sahara, celle de l'« Europe » en Norvège.
 */
function centreEtAire(geometries, projeter, garder = () => true) {
  const anneaux = geometries
    .flatMap(anneauxDe)
    .filter((a) => a.some(garder))
    .map((a) => a.map(projeter));
  if (!anneaux.length) return { cx: 0, cy: 0, aire: 0 };

  let sommeAire = 0;
  let sommeX = 0;
  let sommeY = 0;
  for (const anneau of anneaux) {
    const c = centroideAnneau(anneau);
    if (!c) continue;
    // L'aire signée fait que les anneaux intérieurs (les trous) se retranchent.
    sommeAire += c.aire;
    sommeX += c.cx * c.aire;
    sommeY += c.cy * c.aire;
  }
  if (Math.abs(sommeAire) < 1e-9) {
    const tous = anneaux.flat();
    return {
      cx: arrondir(tous.reduce((s, p) => s + p[0], 0) / tous.length),
      cy: arrondir(tous.reduce((s, p) => s + p[1], 0) / tous.length),
      aire: 0,
    };
  }
  return {
    cx: arrondir(sommeX / sommeAire),
    cy: arrondir(sommeY / sommeAire),
    aire: Math.round(Math.abs(sommeAire)),
  };
}

/**
 * Fond les pays d'un continent en UNE seule forme.
 *
 * Concaténer leurs tracés ne suffit pas : chaque pays garde son contour, et
 * l'écran montre une mosaïque de 48 zones là où l'élève doit en voir une. Il en
 * conclut qu'il faut cliquer pays par pays — et c'est exactement ce qu'on a vu.
 *
 * L'union géométrique (turf) dissout les frontières intérieures. C'est une
 * dépendance de build seulement : le site lit un JSON, il n'en sait rien.
 */
function fusionner(features) {
  if (features.length === 1) return features[0].geometry;
  const resultat = union(featureCollection(features));
  if (!resultat) throw new Error('Union impossible');
  return resultat.geometry;
}

// --- Le planisphère ---------------------------------------------------------

function construireMonde() {
  const LARGEUR = 900;
  const HAUTEUR = 460;
  const CADRE = { ouest: -180, est: 180, sud: -85, nord: 84 };
  const monde = lire('world.geojson').features;
  const parNom = new Map(monde.map((f) => [f.properties.name, f]));

  // Garde-fou : un pays oublié dans la répartition laisserait un trou blanc sur
  // la carte, et personne ne le verrait avant l'élève.
  const ranges = new Set([
    ...Object.values(CONTINENTS).flatMap((c) => c.pays), ...A_CHEVAL, ...DECOR,
  ]);
  const oublies = monde.map((f) => f.properties.name).filter((n) => !ranges.has(n));
  if (oublies.length) throw new Error(`Pays sans continent : ${oublies.join(', ')}`);
  const inconnus = [...ranges].filter((n) => !parNom.has(n));
  if (inconnus.length) throw new Error(`Pays introuvables dans world.geojson : ${inconnus.join(', ')}`);

  const projeter = cadrer({ projection: equirectangulaire, ...CADRE, largeur: LARGEUR, hauteur: HAUTEUR });

  const continents = Object.entries(CONTINENTS).map(([id, c]) => {
    const geometrie = fusionner(c.pays.map((n) => parNom.get(n)));
    return {
      id,
      nom: c.nom,
      d: cheminDe(geometrie, projeter, 0.8),
      ...centreEtAire([geometrie], projeter),
    };
  });

  const decor = [...A_CHEVAL, ...DECOR]
    .map((n) => cheminDe(parNom.get(n).geometry, projeter, 1.2))
    .join('');

  // Les lignes traversent toute la carte : deux points suffisent.
  const lignes = LIGNES.map((l) => {
    const [a, b] = l.lat !== undefined
      ? [projeter([CADRE.ouest, l.lat]), projeter([CADRE.est, l.lat])]
      : [projeter([l.lon, CADRE.nord]), projeter([l.lon, CADRE.sud])];
    // Le centre sert au renfort de clic : au MILIEU du trait, pas à son bout,
    // sinon le renfort de l'équateur se poserait au bord de la carte.
    return {
      id: l.id,
      nom: l.nom,
      d: `M${a[0]},${a[1]}L${b[0]},${b[1]}`,
      cx: arrondir((a[0] + b[0]) / 2),
      cy: arrondir((a[1] + b[1]) / 2),
    };
  });

  const marqueurs = OCEANS.map((o) => {
    const [x, y] = projeter(o.point);
    return { id: o.id, nom: o.nom, x, y };
  });

  return { viewBox: `0 0 ${LARGEUR} ${HAUTEUR}`, decor, pays: continents, lignes, marqueurs };
}

// --- Le monde méditerranéen -------------------------------------------------

function construireMediterranee() {
  const LARGEUR = 820;
  const HAUTEUR = 460;
  const monde = lire('world.geojson').features;
  const { ouest, est, sud, nord } = CADRE_MEDITERRANEE;

  // Marge large sur le découpage : un pays n'est retenu que s'il touche la
  // fenêtre, mais on garde ses anneaux entiers pour ne pas hacher les côtes.
  const dansLeCadre = ([lon, lat]) => lon > ouest - 6 && lon < est + 6 && lat > sud - 6 && lat < nord + 6;
  const projeter = cadrer({ projection: mercator, ouest, est, sud, nord, largeur: LARGEUR, hauteur: HAUTEUR });

  const decor = monde
    .map((f) => cheminDe(f.geometry, projeter, 0.5, dansLeCadre))
    .filter(Boolean)
    .join('');

  const marqueurs = VILLES_MEDITERRANEE.map((v) => {
    const [x, y] = projeter(v.point);
    return { id: v.id, nom: v.nom, x, y };
  });

  return { viewBox: `0 0 ${LARGEUR} ${HAUTEUR}`, decor, pays: [], marqueurs };
}

// --- Écriture ---------------------------------------------------------------

for (const [nom, donnees] of [['monde', construireMonde()], ['mediterranee', construireMediterranee()]]) {
  const chemin = join(sortie, `${nom}.json`);
  writeFileSync(chemin, JSON.stringify(donnees));
  const poids = (readFileSync(chemin).length / 1024).toFixed(0);
  console.log(`${nom}.json écrit (${poids} Ko)`);
}
