// Ce que le GeoJSON ne contient pas.
//
// world.geojson ne porte qu'une propriété par pays : son nom anglais. Il ne dit
// ni à quel continent il appartient, ni où passent les lignes imaginaires, ni où
// sont les villes. Tout cela est écrit ici, à la main, et vérifié au build : un
// pays absent de la répartition fait échouer la construction plutôt que de
// laisser un trou blanc sur la carte.

/**
 * Les six continents du découpage scolaire français.
 *
 * L'Amérique compte pour UN continent — c'est l'usage en France, là où le monde
 * anglophone en compte deux. La carte doit dire ce que dit le cours.
 */
export const CONTINENTS = {
  afrique: {
    nom: 'Afrique',
    pays: [
      'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon',
      'Central African Republic', 'Chad', 'Democratic Republic of the Congo', 'Djibouti',
      'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana',
      'Guinea', 'Guinea Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya',
      'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Morocco', 'Mozambique', 'Namibia',
      'Niger', 'Nigeria', 'Republic of the Congo', 'Rwanda', 'Senegal', 'Sierra Leone',
      'Somalia', 'Somaliland', 'South Africa', 'South Sudan', 'Sudan', 'Swaziland', 'Togo',
      'Tunisia', 'Uganda', 'United Republic of Tanzania', 'Western Sahara', 'Zambia', 'Zimbabwe',
    ],
  },
  amerique: {
    nom: 'Amérique',
    pays: [
      'Argentina', 'Belize', 'Bolivia', 'Brazil', 'Canada', 'Chile', 'Colombia', 'Costa Rica',
      'Cuba', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Falkland Islands', 'Greenland',
      'Guatemala', 'Guyana', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama',
      'Paraguay', 'Peru', 'Puerto Rico', 'Suriname', 'The Bahamas', 'Trinidad and Tobago',
      'USA', 'Uruguay', 'Venezuela',
    ],
  },
  asie: {
    nom: 'Asie',
    pays: [
      'Afghanistan', 'Armenia', 'Azerbaijan', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia',
      'China', 'Cyprus', 'East Timor', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq',
      'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon',
      'Malaysia', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Northern Cyprus', 'Oman',
      'Pakistan', 'Philippines', 'Qatar', 'Saudi Arabia', 'South Korea', 'Sri Lanka', 'Syria',
      'Taiwan', 'Tajikistan', 'Thailand', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan',
      'Vietnam', 'West Bank', 'Yemen',
    ],
  },
  europe: {
    nom: 'Europe',
    pays: [
      'Albania', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria',
      'Croatia', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Finland', 'France',
      'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia',
      'Lithuania', 'Luxembourg', 'Macedonia', 'Moldova', 'Montenegro', 'Netherlands',
      'Norway', 'Poland', 'Portugal', 'Republic of Serbia', 'Romania', 'Slovakia',
      'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine',
    ],
  },
  oceanie: {
    nom: 'Océanie',
    pays: [
      'Australia', 'Fiji', 'New Caledonia', 'New Zealand', 'Papua New Guinea',
      'Solomon Islands', 'Vanuatu',
    ],
  },
  antarctique: {
    nom: 'Antarctique',
    pays: ['Antarctica'],
  },
};

/**
 * Les pays à cheval sur deux continents.
 *
 * Ils ne sont pas rangés dans un continent : les colorier comme européens
 * peindrait la Sibérie en Europe, et comme asiatiques effacerait Moscou et
 * Istanbul de l'Europe. Ils s'affichent donc dans une teinte à part — et c'est
 * un fait du programme de 6e, pas un défaut de la carte.
 */
export const A_CHEVAL = ['Russia', 'Turkey'];

/** Ni continent ni pays à cheval : du décor, pour que la carte reste lisible. */
export const DECOR = ['French Southern and Antarctic Lands'];

/**
 * Les lignes imaginaires. En projection équirectangulaire elles sont droites,
 * ce qui est exactement l'image que l'élève doit garder en tête.
 *
 * `lat` pour un parallèle, `lon` pour un méridien.
 */
export const LIGNES = [
  { id: 'equateur', nom: "L'équateur", lat: 0 },
  { id: 'tropique-cancer', nom: 'Le tropique du Cancer', lat: 23.44 },
  { id: 'tropique-capricorne', nom: 'Le tropique du Capricorne', lat: -23.44 },
  { id: 'cercle-arctique', nom: 'Le cercle polaire arctique', lat: 66.56 },
  { id: 'cercle-antarctique', nom: 'Le cercle polaire antarctique', lat: -66.56 },
  { id: 'greenwich', nom: 'Le méridien de Greenwich', lon: 0 },
];

/**
 * Les océans n'ont pas de tracé dans le GeoJSON : ce sont les creux entre les
 * terres. On les place donc par un point, au milieu de leur étendue.
 */
export const OCEANS = [
  { id: 'pacifique', nom: 'Océan Pacifique', point: [-150, 5] },
  { id: 'atlantique', nom: 'Océan Atlantique', point: [-30, 10] },
  { id: 'indien', nom: 'Océan Indien', point: [75, -25] },
  { id: 'arctique', nom: 'Océan Arctique', point: [-40, 80] },
  { id: 'austral', nom: 'Océan Austral', point: [60, -60] },
];

/**
 * Les six villes du monde méditerranéen demandées par la fiche.
 *
 * Byzance est placée à Istanbul : c'est la même ville, et c'est précisément ce
 * qu'il faut retenir — Byzance, puis Constantinople, puis Istanbul.
 */
export const VILLES_MEDITERRANEE = [
  { id: 'marseille', nom: 'Marseille', point: [5.37, 43.30] },
  { id: 'rome', nom: 'Rome', point: [12.50, 41.90] },
  { id: 'byzance', nom: 'Byzance', point: [28.98, 41.01] },
  { id: 'alexandrie', nom: 'Alexandrie', point: [29.92, 31.20] },
  { id: 'athenes', nom: 'Athènes', point: [23.73, 37.98] },
  { id: 'jerusalem', nom: 'Jérusalem', point: [35.22, 31.78] },
];

/** La fenêtre du bassin méditerranéen : de Gibraltar au Levant. */
export const CADRE_MEDITERRANEE = { ouest: -7, est: 40, sud: 28, nord: 48 };
