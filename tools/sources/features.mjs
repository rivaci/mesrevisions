// Tracés géographiques saisis à la main, en coordonnées (longitude, latitude).
// Ils complètent les GeoJSON : fleuves, massifs et mers n'existent pas dans les
// jeux de données de frontières. Le script build-maps.mjs les projette avec la
// même projection que les régions, donc tout reste aligné.
//
// Ces tracés sont volontairement approximatifs : ils servent de zone cliquable
// et de repère visuel, pas de référence cartographique.

export const FLEUVES = [
  {
    id: 'seine',
    nom: 'La Seine',
    // Source en Bourgogne → estuaire du Havre (Manche)
    points: [[4.72, 47.48], [4.07, 48.30], [3.29, 48.52], [2.35, 48.86], [1.72, 49.05], [1.10, 49.44], [0.11, 49.49]],
  },
  {
    id: 'loire',
    nom: 'La Loire',
    // Mont Gerbier-de-Jonc → estuaire de Saint-Nazaire (Atlantique)
    points: [[4.22, 44.84], [3.89, 45.75], [3.16, 46.99], [2.40, 47.55], [1.90, 47.90], [0.69, 47.39], [-0.55, 47.47], [-1.55, 47.22], [-2.20, 47.28]],
  },
  {
    id: 'garonne',
    nom: 'La Garonne',
    // Pyrénées → estuaire de la Gironde (Atlantique)
    points: [[0.83, 42.75], [1.10, 43.10], [1.44, 43.60], [0.62, 44.20], [-0.58, 44.84], [-0.75, 45.20], [-1.05, 45.57]],
  },
  {
    id: 'rhone',
    nom: 'Le Rhône',
    // Sort du lac Léman → delta de Camargue (Méditerranée)
    points: [[6.15, 46.20], [5.70, 45.95], [4.83, 45.76], [4.89, 44.93], [4.81, 43.95], [4.60, 43.35]],
  },
  {
    id: 'rhin',
    nom: 'Le Rhin',
    // Frontière avec l'Allemagne, de Bâle à Lauterbourg
    points: [[7.59, 47.56], [7.53, 48.00], [7.79, 48.58], [8.05, 48.80], [8.18, 48.97]],
  },
];

// Les contours débordent volontairement sur la mer et les pays voisins : ils
// sont détourés à l'affichage par la silhouette de la France (clipPath), ce qui
// évite d'avoir à épouser le littoral point par point.
export const MASSIFS = [
  {
    id: 'alpes',
    nom: 'Les Alpes',
    contour: [[5.85, 46.35], [6.4, 46.3], [6.9, 46.05], [7.35, 45.95], [7.7, 45.6], [7.65, 45.15], [7.5, 44.6], [7.4, 44.15], [7.0, 43.95], [6.55, 44.25], [6.15, 44.7], [5.8, 45.2], [5.6, 45.7], [5.65, 46.1]],
  },
  {
    id: 'pyrenees',
    nom: 'Les Pyrénées',
    contour: [[-1.75, 43.35], [-1.0, 43.05], [-0.2, 42.85], [0.6, 42.7], [1.4, 42.5], [2.2, 42.4], [3.05, 42.42], [3.1, 42.72], [2.3, 42.78], [1.5, 42.92], [0.7, 43.08], [-0.15, 43.22], [-1.0, 43.42], [-1.65, 43.55]],
  },
  {
    id: 'massif-central',
    nom: 'Le Massif central',
    contour: [[2.15, 45.85], [2.7, 46.05], [3.35, 46.0], [3.9, 45.75], [4.3, 45.35], [4.45, 44.85], [4.35, 44.4], [3.9, 44.05], [3.3, 43.95], [2.75, 44.15], [2.3, 44.55], [2.0, 45.0], [1.95, 45.45]],
  },
  {
    id: 'jura',
    nom: 'Le Jura',
    contour: [[5.75, 46.25], [6.1, 46.45], [6.5, 46.85], [6.9, 47.25], [7.05, 47.45], [6.75, 47.5], [6.35, 47.15], [6.0, 46.75], [5.7, 46.4]],
  },
  {
    id: 'vosges',
    nom: 'Les Vosges',
    contour: [[6.75, 47.65], [7.1, 47.95], [7.3, 48.35], [7.2, 48.75], [6.95, 48.85], [6.7, 48.5], [6.55, 48.1], [6.55, 47.8]],
  },
  {
    id: 'massif-armoricain',
    nom: 'Le Massif armoricain',
    contour: [[-4.75, 48.55], [-4.2, 48.7], [-3.4, 48.65], [-2.7, 48.55], [-2.0, 48.45], [-1.5, 48.3], [-1.15, 48.0], [-1.35, 47.75], [-2.0, 47.65], [-2.9, 47.7], [-3.7, 47.85], [-4.4, 48.05], [-4.75, 48.3]],
  },
];

// Zones maritimes : un point d'ancrage pour la pastille cliquable + son rayon
// (en degrés de longitude). Volontairement modeste : la pastille doit rester en
// eau libre sans mordre sur les côtes ni sur les autres mers.
export const MERS = [
  { id: 'manche', nom: 'La Manche', point: [-0.9, 50.0], rayon: 0.75 },
  { id: 'mer-du-nord', nom: 'La mer du Nord', point: [2.6, 51.7], rayon: 0.6 },
  { id: 'atlantique', nom: "L'océan Atlantique", point: [-4.4, 45.8], rayon: 0.85 },
  { id: 'mediterranee', nom: 'La mer Méditerranée', point: [4.8, 42.3], rayon: 0.8 },
];

// Capitales régionales : position du point sur la carte.
export const VILLES = [
  { id: 'paris', nom: 'Paris', point: [2.35, 48.86] },
  { id: 'lyon', nom: 'Lyon', point: [4.83, 45.76] },
  { id: 'marseille', nom: 'Marseille', point: [5.37, 43.30] },
  { id: 'toulouse', nom: 'Toulouse', point: [1.44, 43.60] },
  { id: 'bordeaux', nom: 'Bordeaux', point: [-0.58, 44.84] },
  { id: 'nantes', nom: 'Nantes', point: [-1.55, 47.22] },
  { id: 'rennes', nom: 'Rennes', point: [-1.68, 48.11] },
  { id: 'lille', nom: 'Lille', point: [3.06, 50.63] },
  { id: 'strasbourg', nom: 'Strasbourg', point: [7.75, 48.57] },
  { id: 'dijon', nom: 'Dijon', point: [5.04, 47.32] },
  { id: 'orleans', nom: 'Orléans', point: [1.90, 47.90] },
  { id: 'rouen', nom: 'Rouen', point: [1.10, 49.44] },
  { id: 'ajaccio', nom: 'Ajaccio', point: [8.74, 41.93] },
];

// Malte est absente du GeoJSON mondial (île trop petite pour la résolution du
// jeu de données). On la place en marqueur pour qu'elle reste jouable.
export const MARQUEURS_EUROPE = [
  { id: 'malte', nom: 'Malte', point: [14.44, 35.90] },
];
