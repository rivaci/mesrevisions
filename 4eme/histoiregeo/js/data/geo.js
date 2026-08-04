// Contenu de géographie, repris de la fiche de révision.
//
// Ce fichier ne contient que des faits : aucune logique d'application. Corriger
// une erreur ici ne demande donc de toucher à rien d'autre.
//
// Les `id` des régions sont les codes INSEE, ceux des DROM, fleuves, massifs et
// mers viennent de tools/sources/features.mjs. Ils doivent correspondre aux
// identifiants présents dans assets/maps/france.json, sinon la carte ne saura
// pas quoi mettre en valeur.

export const REGIONS = [
  { id: '11', nom: 'Île-de-France', capitale: 'Paris', de: "de l'Île-de-France" },
  { id: '24', nom: 'Centre-Val de Loire', capitale: 'Orléans', de: "du Centre-Val de Loire" },
  { id: '27', nom: 'Bourgogne-Franche-Comté', capitale: 'Dijon', de: "de la Bourgogne-Franche-Comté" },
  { id: '28', nom: 'Normandie', capitale: 'Rouen', de: "de la Normandie" },
  { id: '32', nom: 'Hauts-de-France', capitale: 'Lille', de: "des Hauts-de-France" },
  { id: '44', nom: 'Grand Est', capitale: 'Strasbourg', de: "du Grand Est" },
  { id: '52', nom: 'Pays de la Loire', capitale: 'Nantes', de: "des Pays de la Loire" },
  { id: '53', nom: 'Bretagne', capitale: 'Rennes', de: "de la Bretagne" },
  { id: '75', nom: 'Nouvelle-Aquitaine', capitale: 'Bordeaux', de: "de la Nouvelle-Aquitaine" },
  { id: '76', nom: 'Occitanie', capitale: 'Toulouse', de: "de l'Occitanie" },
  { id: '84', nom: 'Auvergne-Rhône-Alpes', capitale: 'Lyon', de: "de l'Auvergne-Rhône-Alpes" },
  { id: '93', nom: "Provence-Alpes-Côte d'Azur", capitale: 'Marseille', de: "de la Provence-Alpes-Côte d'Azur" },
  { id: '94', nom: 'Corse', capitale: 'Ajaccio', de: "de la Corse" },
];

export const DROM = [
  {
    id: 'guadeloupe',
    de: "de la Guadeloupe",
    nom: 'La Guadeloupe',
    capitale: 'Basse-Terre',
    ocean: 'mer des Caraïbes (océan Atlantique)',
    note: "Archipel des Antilles, en forme de papillon : Basse-Terre et Grande-Terre séparées par un bras de mer.",
  },
  {
    id: 'martinique',
    de: "de la Martinique",
    nom: 'La Martinique',
    capitale: 'Fort-de-France',
    ocean: 'mer des Caraïbes (océan Atlantique)',
    note: 'Île des Antilles, dominée par le volcan de la montagne Pelée.',
  },
  {
    id: 'guyane',
    de: "de la Guyane",
    nom: 'La Guyane',
    capitale: 'Cayenne',
    ocean: 'océan Atlantique',
    note: "Seul DROM qui n'est pas une île : c'est un territoire d'Amérique du Sud, couvert de forêt équatoriale. De loin le plus vaste.",
  },
  {
    id: 'la-reunion',
    de: "de La Réunion",
    nom: 'La Réunion',
    capitale: 'Saint-Denis',
    ocean: 'océan Indien',
    note: 'Île volcanique de l\'océan Indien, à l\'est de Madagascar. Le Piton de la Fournaise est toujours en activité.',
  },
  {
    id: 'mayotte',
    de: "de Mayotte",
    nom: 'Mayotte',
    capitale: 'Mamoudzou',
    ocean: 'océan Indien',
    note: "Île de l'archipel des Comores, devenue département français en 2011 : c'est le DROM le plus récent.",
  },
];

export const FLEUVES = [
  {
    id: 'loire',
    nom: 'La Loire',
    note: 'Le plus long fleuve de France (environ 1 000 km). Elle naît dans le Massif central et se jette dans l\'Atlantique près de Saint-Nazaire. Elle passe par Orléans, Tours et Nantes.',
  },
  {
    id: 'seine',
    nom: 'La Seine',
    note: 'Elle naît en Bourgogne, traverse Paris et Rouen, puis se jette dans la Manche au niveau du Havre.',
  },
  {
    id: 'garonne',
    nom: 'La Garonne',
    note: "Elle descend des Pyrénées, passe par Toulouse et Bordeaux, puis rejoint l'Atlantique par l'estuaire de la Gironde.",
  },
  {
    id: 'rhone',
    nom: 'Le Rhône',
    note: 'Il vient des Alpes suisses, sort du lac Léman, passe par Lyon et se jette dans la Méditerranée par le delta de la Camargue.',
  },
  {
    id: 'rhin',
    nom: 'Le Rhin',
    note: "Il sert de frontière naturelle entre la France et l'Allemagne, le long de l'Alsace. Il se jette dans la mer du Nord, aux Pays-Bas.",
  },
];

export const MASSIFS = [
  {
    id: 'alpes',
    nom: 'Les Alpes',
    note: "La plus haute chaîne de France, au sud-est, à la frontière avec l'Italie et la Suisse. Elles abritent le mont Blanc, point culminant du pays (environ 4 800 m).",
  },
  {
    id: 'pyrenees',
    nom: 'Les Pyrénées',
    note: "Chaîne du sud-ouest, qui forme la frontière naturelle avec l'Espagne, de l'Atlantique à la Méditerranée.",
  },
  {
    id: 'massif-central',
    nom: 'Le Massif central',
    note: 'Massif ancien situé au centre-sud de la France, aux sommets arrondis. On y trouve des volcans éteints, comme le puy de Dôme.',
  },
  {
    id: 'jura',
    nom: 'Le Jura',
    note: 'Chaîne de moyenne montagne à la frontière avec la Suisse, au nord des Alpes.',
  },
  {
    id: 'vosges',
    nom: 'Les Vosges',
    note: "Massif ancien du nord-est, à l'ouest de la plaine d'Alsace. Ses sommets arrondis s'appellent des « ballons ».",
  },
  {
    id: 'massif-armoricain',
    nom: 'Le Massif armoricain',
    note: "Massif très ancien et très érodé qui occupe la Bretagne. Il est aujourd'hui peu élevé : moins de 500 m.",
  },
];

export const MERS = [
  {
    id: 'atlantique',
    nom: "L'océan Atlantique",
    note: "Il borde toute la façade ouest de la France, de la Bretagne au Pays basque.",
  },
  {
    id: 'manche',
    nom: 'La Manche',
    note: "Mer étroite du nord-ouest, qui sépare la France du Royaume-Uni.",
  },
  {
    id: 'mer-du-nord',
    nom: 'La mer du Nord',
    note: "Au nord, la France n'en possède qu'une toute petite façade, près de Dunkerque.",
  },
  {
    id: 'mediterranee',
    nom: 'La mer Méditerranée',
    note: 'Elle borde le sud de la France, de la frontière espagnole à la frontière italienne, ainsi que la Corse.',
  },
];

// Les 27 États membres de l'Union européenne.
// Le Royaume-Uni n'en fait plus partie depuis sa sortie en 2020 (Brexit).
// `id` doit correspondre aux identifiants de assets/maps/europe.json.
export const PAYS_UE = [
  { id: 'allemagne', nom: 'Allemagne', capitale: 'Berlin' },
  { id: 'autriche', nom: 'Autriche', capitale: 'Vienne' },
  { id: 'belgique', nom: 'Belgique', capitale: 'Bruxelles' },
  { id: 'bulgarie', nom: 'Bulgarie', capitale: 'Sofia' },
  { id: 'chypre', nom: 'Chypre', capitale: 'Nicosie' },
  { id: 'croatie', nom: 'Croatie', capitale: 'Zagreb' },
  { id: 'danemark', nom: 'Danemark', capitale: 'Copenhague' },
  { id: 'espagne', nom: 'Espagne', capitale: 'Madrid' },
  { id: 'estonie', nom: 'Estonie', capitale: 'Tallinn' },
  { id: 'finlande', nom: 'Finlande', capitale: 'Helsinki' },
  { id: 'france', nom: 'France', capitale: 'Paris' },
  { id: 'grece', nom: 'Grèce', capitale: 'Athènes' },
  { id: 'hongrie', nom: 'Hongrie', capitale: 'Budapest' },
  { id: 'irlande', nom: 'Irlande', capitale: 'Dublin' },
  { id: 'italie', nom: 'Italie', capitale: 'Rome' },
  { id: 'lettonie', nom: 'Lettonie', capitale: 'Riga' },
  { id: 'lituanie', nom: 'Lituanie', capitale: 'Vilnius' },
  { id: 'luxembourg', nom: 'Luxembourg', capitale: 'Luxembourg' },
  { id: 'malte', nom: 'Malte', capitale: 'La Valette' },
  { id: 'pays-bas', nom: 'Pays-Bas', capitale: 'Amsterdam' },
  { id: 'pologne', nom: 'Pologne', capitale: 'Varsovie' },
  { id: 'portugal', nom: 'Portugal', capitale: 'Lisbonne' },
  { id: 'roumanie', nom: 'Roumanie', capitale: 'Bucarest' },
  { id: 'slovaquie', nom: 'Slovaquie', capitale: 'Bratislava' },
  { id: 'slovenie', nom: 'Slovénie', capitale: 'Ljubljana' },
  { id: 'suede', nom: 'Suède', capitale: 'Stockholm' },
  { id: 'tchequie', nom: 'Tchéquie', capitale: 'Prague' },
];
