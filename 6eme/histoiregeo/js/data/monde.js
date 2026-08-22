// Contenu de géographie, repris de la fiche de révision en vue de la 5ᵉ.
//
// Ce fichier ne contient que des faits : aucune logique d'application. Corriger
// une erreur ici ne demande donc de toucher à rien d'autre.
//
// Les `id` doivent correspondre à ceux produits par tools/build-maps.mjs, sinon
// la carte ne saura pas quelle zone mettre en valeur. C'est vérifié par
// tools/verifier-donnees.mjs.

export const CONTINENTS = [
  {
    id: 'afrique',
    nom: "L'Afrique",
    court: 'Afrique',
    note: "Traversée par l'équateur en son milieu, et par les deux tropiques. Le seul continent présent dans les quatre hémisphères.",
  },
  {
    id: 'amerique',
    nom: "L'Amérique",
    court: 'Amérique',
    note: "En France on compte l'Amérique pour UN continent, du Groenland à la Terre de Feu. Les pays anglophones en comptent deux.",
  },
  {
    id: 'asie',
    nom: "L'Asie",
    court: 'Asie',
    note: 'Le plus vaste et le plus peuplé des continents.',
  },
  {
    id: 'europe',
    nom: "L'Europe",
    court: 'Europe',
    note: "Le plus petit continent habité. Il n'est séparé de l'Asie par aucune mer : la limite est une convention, l'Oural.",
  },
  {
    id: 'oceanie',
    nom: "L'Océanie",
    court: 'Océanie',
    note: "L'Australie et des milliers d'îles du Pacifique.",
  },
  {
    id: 'antarctique',
    nom: "L'Antarctique",
    court: 'Antarctique',
    note: "Un continent couvert de glace, sans population permanente. À ne pas confondre avec l'Arctique, qui est un océan gelé.",
  },
];

export const OCEANS = [
  {
    id: 'pacifique',
    nom: "L'océan Pacifique",
    court: 'Pacifique',
    note: "Le plus vaste : à lui seul, il couvre près d'un tiers de la planète. Entre l'Amérique et l'Asie.",
  },
  {
    id: 'atlantique',
    nom: "L'océan Atlantique",
    court: 'Atlantique',
    note: "Entre l'Amérique d'un côté, l'Europe et l'Afrique de l'autre. C'est celui qui borde la France.",
  },
  {
    id: 'indien',
    nom: "L'océan Indien",
    court: 'Indien',
    note: "Entre l'Afrique, l'Asie et l'Océanie.",
  },
  {
    id: 'arctique',
    nom: "L'océan Arctique",
    court: 'Arctique',
    note: "Autour du pôle Nord. C'est un OCÉAN gelé, pas un continent — l'Antarctique, au sud, est l'inverse.",
  },
  {
    id: 'austral',
    nom: "L'océan Austral",
    court: 'Austral',
    note: "Autour de l'Antarctique. C'est le plus récemment reconnu des cinq.",
  },
];

/**
 * Les lignes imaginaires. Aucune n'existe sur le terrain : ce sont des repères
 * tracés par les géographes, et c'est le premier point à comprendre.
 */
export const LIGNES = [
  {
    id: 'equateur',
    nom: "L'équateur",
    famille: 'parallele',
    note: "Le parallèle de référence, à 0° de latitude. Il partage la Terre en deux hémisphères, nord et sud.",
  },
  {
    id: 'tropique-cancer',
    nom: 'Le tropique du Cancer',
    famille: 'parallele',
    note: "Le parallèle situé à 23°N. C'est la limite nord de la zone où le Soleil peut passer à la verticale.",
  },
  {
    id: 'tropique-capricorne',
    nom: 'Le tropique du Capricorne',
    famille: 'parallele',
    note: "Le même, au sud : 23°S. Entre les deux tropiques s'étend la zone chaude.",
  },
  {
    id: 'cercle-arctique',
    nom: 'Le cercle polaire arctique',
    famille: 'parallele',
    note: "À 66°N. Au-delà, il existe des jours où le Soleil ne se couche pas, et d'autres où il ne se lève pas.",
  },
  {
    id: 'cercle-antarctique',
    nom: 'Le cercle polaire antarctique',
    famille: 'parallele',
    note: 'Le même, au sud : 66°S.',
  },
  {
    id: 'greenwich',
    nom: 'Le méridien de Greenwich',
    famille: 'meridien',
    note: "Le méridien de référence, à 0° de longitude. Il passe par l'observatoire de Greenwich, à Londres, et sépare l'est de l'ouest.",
  },
];

/**
 * Parallèles et méridiens : la distinction que la fiche demande de savoir.
 * Ce sont deux familles de lignes, pas deux lignes.
 */
export const FAMILLES_LIGNES = [
  {
    id: 'parallele',
    nom: 'Un parallèle',
    reponse: "Un cercle horizontal, parallèle à l'équateur",
    note: "Les parallèles font le tour de la Terre d'est en ouest. Ils donnent la LATITUDE, en degrés nord ou sud. L'équateur et les tropiques en sont.",
  },
  {
    id: 'meridien',
    nom: 'Un méridien',
    reponse: "Un demi-cercle vertical, qui joint le pôle Nord au pôle Sud",
    note: 'Les méridiens vont du nord au sud. Ils donnent la LONGITUDE, en degrés est ou ouest. Greenwich en est le méridien de référence.',
  },
  {
    id: 'latitude',
    nom: 'La latitude',
    reponse: "La distance à l'équateur, en degrés nord ou sud",
    note: 'Elle se lit sur les parallèles. Paris est à 48° de latitude nord.',
  },
  {
    id: 'longitude',
    nom: 'La longitude',
    reponse: 'La distance au méridien de Greenwich, en degrés est ou ouest',
    note: 'Elle se lit sur les méridiens. Paris est à 2° de longitude est.',
  },
  {
    id: 'hemisphere',
    nom: 'Un hémisphère',
    reponse: "La moitié de la Terre, de part et d'autre de l'équateur",
    note: "La France est dans l'hémisphère nord. Quand c'est l'été chez nous, c'est l'hiver dans l'hémisphère sud.",
  },
];

/**
 * La rose des vents. Les quatre points cardinaux, puis les quatre intermédiaires
 * — ce sont ces derniers qui se retiennent mal, parce qu'ils se déduisent.
 */
export const DIRECTIONS = [
  { id: 'nord', nom: 'le nord', abrege: 'N', note: 'En haut de la carte, par convention.' },
  { id: 'sud', nom: 'le sud', abrege: 'S', note: 'En bas de la carte.' },
  { id: 'est', nom: "l'est", abrege: 'E', note: 'À droite. Le côté où le Soleil se lève.' },
  { id: 'ouest', nom: "l'ouest", abrege: 'O', note: "À gauche. Le côté où le Soleil se couche. En anglais, W pour West." },
  { id: 'nord-est', nom: 'le nord-est', abrege: 'NE', note: 'Entre le nord et l\'est.' },
  { id: 'nord-ouest', nom: 'le nord-ouest', abrege: 'NO', note: "Entre le nord et l'ouest." },
  { id: 'sud-est', nom: 'le sud-est', abrege: 'SE', note: "Entre le sud et l'est." },
  { id: 'sud-ouest', nom: 'le sud-ouest', abrege: 'SO', note: "Entre le sud et l'ouest." },
];

/**
 * Les outils du géographe : ce qu'une carte porte, et pourquoi.
 *
 * Séparé des calculs d'échelle à dessein. Mélangés, les leurres d'un QCM
 * devenaient invraisemblables — « 70 km » proposé face à « Mesurer les
 * distances réelles » se élimine sans rien savoir.
 */
export const OUTILS_CARTE = [
  {
    id: 'echelle-sens',
    question: "Que permet de faire l'échelle d'une carte ?",
    reponse: 'Mesurer les distances réelles',
    note: "L'échelle est le RAPPORT entre une distance mesurée sur la carte et la distance réelle. Sans elle, une carte ne dit pas si on parle d'un quartier ou d'un continent.",
  },
  {
    id: 'echelle-detail',
    question: "Une carte où 1 cm vaut 1 km, comparée à une où 1 cm vaut 100 km : que montre-t-elle ?",
    reponse: 'Un plus petit territoire, mais bien plus de détails',
    note: "Plus la distance réelle représentée par 1 cm est petite, plus la carte est détaillée — et plus le territoire montré est réduit.",
  },
  {
    id: 'legende-role',
    question: "À quoi sert la légende d'une carte ?",
    reponse: 'À expliquer ce que signifient les couleurs et les symboles',
    note: "Une carte ne se lit pas sans sa légende : le même bleu peut désigner une mer sur une carte et une région froide sur une autre.",
  },
  {
    id: 'legende-elements',
    question: "Que doit toujours porter une carte, en plus de son dessin ?",
    reponse: 'Un titre, une légende et une échelle',
    note: "On y ajoute l'orientation — la rose des vents ou une flèche vers le nord — quand le nord n'est pas en haut.",
  },
  {
    id: 'legende-titre',
    question: "À quoi sert le titre d'une carte ?",
    reponse: 'À dire de quel territoire elle parle, et de quoi',
    note: "« La France en 1789 » et « La France aujourd'hui » montrent le même pays et deux cartes très différentes.",
  },
  {
    id: 'orientation',
    question: 'Sur une carte, où se trouve le nord par convention ?',
    reponse: 'En haut',
    note: "C'est une convention, pas une loi : une carte peut être orientée autrement, et elle le signale alors par une rose des vents.",
  },
];

/**
 * Les calculs d'échelle. Toutes les réponses sont des distances : les leurres
 * d'un QCM sont donc plausibles, et il faut vraiment calculer pour trancher.
 */
export const CALCULS_ECHELLE = [
  {
    id: 'echelle-3-50',
    question: 'Sur une carte, 3 cm valent 50 km. Que représentent 6 cm ?',
    reponse: '100 km',
    note: 'Deux fois plus sur la carte, donc deux fois plus sur le terrain.',
  },
  {
    id: 'echelle-1-10',
    question: 'Sur une carte, 1 cm vaut 10 km. Deux villes sont distantes de 7 cm. Quelle distance réelle ?',
    reponse: '70 km',
    note: '7 × 10 = 70. On multiplie la mesure par ce que vaut 1 cm.',
  },
  {
    id: 'echelle-2-30',
    question: 'Sur une carte, 2 cm valent 30 km. Que représentent 8 cm ?',
    reponse: '120 km',
    note: "8 cm, c'est quatre fois 2 cm : 4 × 30 = 120.",
  },
  {
    id: 'echelle-1-5',
    question: 'Sur une carte, 1 cm vaut 5 km. Deux villes sont distantes de 9 cm. Quelle distance réelle ?',
    reponse: '45 km',
    note: '9 × 5 = 45.',
  },
  {
    id: 'echelle-inverse',
    question: 'Sur une carte, 1 cm vaut 25 km. Deux villes sont séparées de 200 km. Combien de cm sur la carte ?',
    reponse: '8 cm',
    note: "200 ÷ 25 = 8. Dans l'autre sens, on divise.",
  },
];

/**
 * Le monde méditerranéen. Ce ne sont pas six points sur une carte : chacune de
 * ces villes est le centre d'un chapitre de la 6ᵉ, et la note le rappelle.
 */
export const VILLES = [
  {
    id: 'marseille',
    nom: 'Marseille',
    pays: 'France',
    note: "Fondée vers 600 av. J.-C. par des Grecs venus de Phocée, en Asie Mineure. C'est la plus ancienne ville de France.",
  },
  {
    id: 'rome',
    nom: 'Rome',
    pays: 'Italie',
    note: "Sur le Tibre. Fondée selon la légende en 753 av. J.-C., elle devient le centre d'un empire qui fait de la Méditerranée « mare nostrum », notre mer.",
  },
  {
    id: 'byzance',
    nom: 'Byzance',
    pays: 'Turquie',
    note: "Sur le détroit du Bosphore, entre Europe et Asie. Devient Constantinople en 330, capitale de l'Empire romain d'Orient, puis Istanbul en 1453.",
  },
  {
    id: 'alexandrie',
    nom: 'Alexandrie',
    pays: 'Égypte',
    note: "Fondée par Alexandre le Grand en 331 av. J.-C., sur le delta du Nil. Célèbre pour son phare et sa bibliothèque.",
  },
  {
    id: 'athenes',
    nom: 'Athènes',
    pays: 'Grèce',
    note: "Cité-État grecque, berceau de la démocratie au Ve siècle av. J.-C. On y trouve l'Acropole et le Parthénon.",
  },
  {
    id: 'jerusalem',
    nom: 'Jérusalem',
    pays: 'Israël',
    note: "Ville sainte pour le judaïsme, le christianisme et l'islam. La seule des six qui ne soit pas sur la côte.",
  },
];
