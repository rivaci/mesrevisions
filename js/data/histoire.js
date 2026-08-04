// Contenu d'histoire, repris de la fiche de révision.
//
// Comme geo.js, ce fichier ne contient que des faits.
//
// ATTENTION : la fiche donne les 23 dates et les 21 noms, mais pas leur
// contenu. Les explications ci-dessous ont donc été rédigées pour l'application
// et doivent être relues avant toute diffusion à d'autres élèves.
//
// `annee` sert au classement sur la frise chronologique : c'est toujours
// l'année de début de l'événement.

export const DATES = [
  {
    id: '1914',
    annee: 1914,
    label: '1914',
    evenement: 'Début de la Première Guerre mondiale',
    periode: 'gm1',
    detail:
      "L'assassinat de l'archiduc d'Autriche à Sarajevo déclenche le jeu des alliances : en quelques semaines, toute l'Europe entre en guerre.",
  },
  {
    id: '1916',
    annee: 1916,
    label: '1916',
    evenement: 'Bataille de Verdun',
    periode: 'gm1',
    detail:
      "Dix mois de combats acharnés entre Français et Allemands, sans que le front bouge vraiment. Elle est devenue le symbole de la violence de la guerre de tranchées.",
  },
  {
    id: '1917',
    annee: 1917,
    label: '1917',
    evenement: 'Révolutions russes',
    periode: 'gm1',
    detail:
      "Deux révolutions la même année : en février, le tsar est renversé ; en octobre, les bolcheviks de Lénine prennent le pouvoir. La Russie quitte la guerre.",
  },
  {
    id: '1918',
    annee: 1918,
    label: '11 novembre 1918',
    evenement: 'Armistice',
    periode: 'gm1',
    detail:
      "Signé dans un wagon à Rethondes, il arrête les combats de la Première Guerre mondiale. La paix sera fixée l'année suivante par le traité de Versailles.",
  },
  {
    id: '1929',
    annee: 1929,
    label: '1929',
    evenement: 'Crise économique mondiale',
    periode: 'entre-deux-guerres',
    detail:
      "Le krach de la Bourse de New York, en octobre, ruine des milliers d'épargnants. La crise gagne le monde entier et jette des millions de personnes au chômage.",
  },
  {
    id: '1933',
    annee: 1933,
    label: '1933',
    evenement: "Arrivée d'Hitler au pouvoir",
    periode: 'entre-deux-guerres',
    detail:
      "Nommé chancelier en janvier, Hitler transforme en quelques mois l'Allemagne en dictature nazie : parti unique, police politique, premiers camps de concentration.",
  },
  {
    id: '1936',
    annee: 1936,
    label: '1936',
    evenement: 'Élection du Front populaire en France',
    periode: 'entre-deux-guerres',
    detail:
      "L'alliance des partis de gauche gagne les élections. Elle obtient les congés payés, la semaine de 40 heures et les conventions collectives.",
  },
  {
    id: '1939-1945',
    annee: 1939,
    label: '1939-1945',
    evenement: 'Seconde Guerre mondiale',
    periode: 'gm2',
    detail:
      "Déclenchée par l'invasion de la Pologne par l'Allemagne, elle devient un conflit mondial et fait environ 60 millions de morts, en majorité des civils.",
  },
  {
    id: '1940',
    annee: 1940,
    label: '18 juin 1940',
    evenement: 'Appel du général de Gaulle',
    periode: 'gm2',
    detail:
      "Depuis Londres, de Gaulle appelle à la radio britannique (BBC) à refuser la défaite et à continuer le combat. C'est l'acte de naissance de la France libre.",
  },
  {
    id: '1944-06',
    annee: 1944,
    label: '6 juin 1944',
    evenement: 'Débarquement en Normandie',
    periode: 'gm2',
    detail:
      "Les Alliés débarquent sur les plages normandes. C'est le début de la libération de l'Europe de l'Ouest.",
  },
  {
    id: '1944',
    annee: 1944,
    label: '1944',
    evenement: 'Libération de la France',
    periode: 'gm2',
    detail:
      "Après le débarquement, les Alliés et la Résistance libèrent le pays. Paris est libéré fin août 1944.",
  },
  {
    id: '1945-05',
    annee: 1945,
    label: '8 mai 1945',
    evenement: 'Capitulation allemande',
    periode: 'gm2',
    detail: "L'Allemagne nazie capitule sans condition : la Seconde Guerre mondiale se termine en Europe.",
  },
  {
    id: '1945-08',
    annee: 1945,
    label: 'Août 1945',
    evenement: 'Bombardements atomiques du Japon',
    periode: 'gm2',
    detail:
      "Les États-Unis larguent une bombe atomique sur Hiroshima puis sur Nagasaki. Le Japon capitule, ce qui met fin à la guerre en Asie.",
  },
  {
    id: '1945-onu',
    annee: 1945,
    label: '1945',
    evenement: "Création de l'Organisation des Nations unies",
    periode: 'gm2',
    detail:
      "Créée au lendemain de la guerre pour maintenir la paix, l'ONU remplace la Société des Nations, qui n'avait pas su empêcher le conflit.",
  },
  {
    id: '1947',
    annee: 1947,
    label: '1947',
    evenement: 'Début de la guerre froide',
    periode: 'guerre-froide',
    detail:
      "Les États-Unis et l'URSS, alliés pendant la guerre, deviennent rivaux. Le monde se partage en deux blocs qui s'affrontent sans jamais se combattre directement.",
  },
  {
    id: '1948',
    annee: 1948,
    label: '1948-1949',
    evenement: 'Blocus de Berlin',
    periode: 'guerre-froide',
    detail:
      "L'URSS coupe les accès terrestres à Berlin-Ouest. Les Occidentaux ravitaillent la ville par avion pendant près d'un an : c'est la première grande crise de la guerre froide.",
  },
  {
    id: '1957',
    annee: 1957,
    label: '1957',
    evenement: 'Traité de Rome',
    periode: 'europe',
    detail:
      "Six pays créent la Communauté économique européenne (CEE) : c'est l'ancêtre de l'Union européenne.",
  },
  {
    id: '1961',
    annee: 1961,
    label: '1961',
    evenement: 'Construction du mur de Berlin',
    periode: 'guerre-froide',
    detail:
      "L'Allemagne de l'Est mure sa frontière pour empêcher ses habitants de fuir vers l'Ouest. Le mur devient le symbole du rideau de fer.",
  },
  {
    id: '1962',
    annee: 1962,
    label: '1962',
    evenement: 'Crise de Cuba',
    periode: 'guerre-froide',
    detail:
      "L'URSS installe des missiles nucléaires à Cuba, tout près des États-Unis. Pendant quelques jours, le monde frôle la guerre nucléaire, avant que l'URSS ne recule.",
  },
  {
    id: '1989',
    annee: 1989,
    label: '1989',
    evenement: 'Chute du mur de Berlin',
    periode: 'guerre-froide',
    detail:
      "Sous la pression de sa population, l'Allemagne de l'Est ouvre ses frontières. Le mur est abattu : le bloc communiste s'effondre en Europe.",
  },
  {
    id: '1991',
    annee: 1991,
    label: '1991',
    evenement: "Disparition de l'Union soviétique",
    periode: 'guerre-froide',
    detail:
      "L'URSS se dissout en plusieurs États indépendants. La guerre froide est finie : il ne reste qu'une seule superpuissance, les États-Unis.",
  },
  {
    id: '1992',
    annee: 1992,
    label: '1992',
    evenement: 'Traité de Maastricht',
    periode: 'europe',
    detail:
      "Il transforme la CEE en Union européenne, crée la citoyenneté européenne et prépare la monnaie unique.",
  },
  {
    id: '2002',
    annee: 2002,
    label: '2002',
    evenement: "Mise en circulation de l'euro",
    periode: 'europe',
    detail:
      "Les pièces et les billets en euros remplacent les monnaies nationales, dont le franc français.",
  },
];

// Les périodes servent à regrouper les dates sur la frise et à colorer les repères.
export const PERIODES = [
  { id: 'gm1', nom: 'Première Guerre mondiale', couleur: '#8d6e63' },
  { id: 'entre-deux-guerres', nom: 'Entre-deux-guerres', couleur: '#ef6c00' },
  { id: 'gm2', nom: 'Seconde Guerre mondiale', couleur: '#c62828' },
  { id: 'guerre-froide', nom: 'Guerre froide', couleur: '#1565c0' },
  { id: 'decolonisation', nom: 'Décolonisation', couleur: '#6a1b9a' },
  { id: 'europe', nom: 'Construction européenne', couleur: '#2e7d32' },
];

// `resume` est la réponse courte attendue ; `role` est le « quelques lignes »
// que demande la fiche.
export const PERSONNAGES = [
  {
    id: 'clemenceau',
    nom: 'Georges Clemenceau',
    vie: '1841-1929',
    periode: 'gm1',
    resume: 'Chef du gouvernement français à la fin de la Première Guerre mondiale',
    role: "Président du Conseil à partir de 1917, il redonne courage au pays dans les moments les plus durs de la guerre et refuse toute paix négociée, ce qui lui vaut le surnom de « Père la Victoire ». Il défend ensuite les intérêts de la France lors du traité de Versailles.",
  },
  {
    id: 'jaures',
    nom: 'Jean Jaurès',
    vie: '1859-1914',
    periode: 'gm1',
    resume: 'Député socialiste français, pacifiste, assassiné en 1914',
    role: "Grand orateur et figure du socialisme français, il fonde le journal L'Humanité. Il se bat jusqu'au bout pour éviter la guerre en appelant les ouvriers d'Europe à refuser de se battre. Il est assassiné par un nationaliste à la veille du conflit, en juillet 1914.",
  },
  {
    id: 'lenine',
    nom: 'Vladimir Lénine',
    vie: '1870-1924',
    periode: 'gm1',
    resume: 'Chef des bolcheviks, dirigeant de la révolution russe de 1917',
    role: "Il dirige le parti bolchevik et prend le pouvoir en Russie lors de la révolution d'octobre 1917. Il sort le pays de la guerre, installe un régime communiste à parti unique et fonde l'URSS en 1922.",
  },
  {
    id: 'staline',
    nom: 'Joseph Staline',
    vie: '1878-1953',
    periode: 'gm2',
    resume: "Dictateur de l'URSS de 1924 à 1953",
    role: "Successeur de Lénine, il met en place un régime totalitaire : culture de sa propre personne, police politique, procès truqués et camps de travail (le Goulag). Allié des Occidentaux contre Hitler, il devient leur adversaire dès la fin de la guerre et impose le communisme à l'Europe de l'Est.",
  },
  {
    id: 'hitler',
    nom: 'Adolf Hitler',
    vie: '1889-1945',
    periode: 'gm2',
    resume: 'Chef du parti nazi, dictateur de l\'Allemagne de 1933 à 1945',
    role: "Arrivé au pouvoir en 1933, il fait de l'Allemagne une dictature raciste et antisémite. Sa politique de conquête déclenche la Seconde Guerre mondiale en Europe. Il est le principal responsable de la Shoah, l'extermination de près de six millions de Juifs d'Europe. Il se suicide en 1945.",
  },
  {
    id: 'mussolini',
    nom: 'Benito Mussolini',
    vie: '1883-1945',
    periode: 'entre-deux-guerres',
    resume: "Fondateur du fascisme, dictateur de l'Italie",
    role: "Il prend le pouvoir en Italie en 1922 et instaure le premier régime fasciste d'Europe, qui servira de modèle à d'autres dictatures. Surnommé le « Duce », il s'allie à Hitler et entre en guerre à ses côtés en 1940.",
  },
  {
    id: 'de-gaulle',
    nom: 'Charles de Gaulle',
    vie: '1890-1970',
    periode: 'gm2',
    resume: 'Chef de la France libre, puis président de la Ve République',
    role: "Refusant la défaite de 1940, il lance depuis Londres l'appel du 18 juin et prend la tête de la France libre. Il unifie la Résistance et dirige le pays à la Libération. Revenu au pouvoir en 1958, il fonde la Ve République et en devient le premier président.",
  },
  {
    id: 'petain',
    nom: 'Philippe Pétain',
    vie: '1856-1951',
    periode: 'gm2',
    resume: "Vainqueur de Verdun, puis chef de l'État français de Vichy",
    role: "Général admiré pour son rôle à Verdun en 1916, il demande l'armistice en juin 1940 et prend les pleins pouvoirs. À la tête de l'État français, il choisit la collaboration avec l'Allemagne nazie et participe à la persécution des Juifs. Il est condamné pour trahison à la Libération.",
  },
  {
    id: 'jean-moulin',
    nom: 'Jean Moulin',
    vie: '1899-1943',
    periode: 'gm2',
    resume: 'Résistant qui a unifié la Résistance française',
    role: "Envoyé par de Gaulle, il parvient à rassembler les mouvements de résistance, jusque-là dispersés, au sein du Conseil national de la Résistance en 1943. Arrêté peu après et torturé, il meurt sans avoir parlé. Il entre au Panthéon en 1964.",
  },
  {
    id: 'roosevelt',
    nom: 'Franklin D. Roosevelt',
    vie: '1882-1945',
    periode: 'gm2',
    resume: 'Président des États-Unis pendant la crise de 1929 et la guerre',
    role: "Élu en pleine crise économique, il lance le New Deal, un vaste programme de grands travaux et d'aide sociale pour relancer le pays. Il engage les États-Unis dans la Seconde Guerre mondiale après l'attaque japonaise de Pearl Harbor en 1941.",
  },
  {
    id: 'churchill',
    nom: 'Winston Churchill',
    vie: '1874-1965',
    periode: 'gm2',
    resume: 'Premier ministre britannique pendant la Seconde Guerre mondiale',
    role: "Devenu Premier ministre en 1940, il refuse tout accord avec Hitler alors que le Royaume-Uni se retrouve seul face à l'Allemagne. Ses discours galvanisent son pays pendant les bombardements. Après la guerre, il alerte l'Occident sur le « rideau de fer » qui coupe l'Europe en deux.",
  },
  {
    id: 'lucie-aubrac',
    nom: 'Lucie Aubrac',
    vie: '1912-2007',
    periode: 'gm2',
    resume: 'Résistante française, cofondatrice de Libération-Sud',
    role: "Professeure d'histoire, elle participe à la création du mouvement de résistance Libération-Sud. Elle organise plusieurs opérations pour libérer des résistants arrêtés, dont son mari Raymond en 1943. Après la guerre, elle consacre sa vie à témoigner auprès des élèves.",
  },
  {
    id: 'germaine-tillion',
    nom: 'Germaine Tillion',
    vie: '1907-2008',
    periode: 'gm2',
    resume: 'Ethnologue et résistante, déportée à Ravensbrück',
    role: "Ethnologue de formation, elle rejoint dès 1940 l'un des tout premiers réseaux de résistance. Dénoncée et déportée au camp de Ravensbrück, elle y observe et documente le système concentrationnaire. Elle est entrée au Panthéon en 2015.",
  },
  {
    id: 'simone-veil',
    nom: 'Simone Veil',
    vie: '1927-2017',
    periode: 'europe',
    resume: "Rescapée d'Auschwitz, ministre, présidente du Parlement européen",
    role: "Déportée à Auschwitz à 16 ans, elle survit et devient magistrate puis ministre de la Santé. Elle fait adopter en 1975, malgré une violente opposition, la loi autorisant l'interruption volontaire de grossesse. Elle est ensuite la première présidente du Parlement européen élu au suffrage universel. Elle est entrée au Panthéon en 2018.",
  },
  {
    id: 'nehru',
    nom: 'Jawaharlal Nehru',
    vie: '1889-1964',
    periode: 'decolonisation',
    resume: "Premier chef du gouvernement de l'Inde indépendante",
    role: "Compagnon de lutte de Gandhi pour l'indépendance de l'Inde, obtenue en 1947, il devient le premier Premier ministre du pays. Il est l'une des grandes figures du non-alignement : refuser de choisir entre le bloc américain et le bloc soviétique.",
  },
  {
    id: 'nasser',
    nom: 'Gamal Abdel Nasser',
    vie: '1918-1970',
    periode: 'decolonisation',
    resume: "Président égyptien, symbole de l'émancipation du tiers-monde",
    role: "Président de l'Égypte, il nationalise en 1956 le canal de Suez, jusque-là contrôlé par la France et le Royaume-Uni, et sort vainqueur politiquement de la crise qui suit. Il devient un modèle pour les pays nouvellement indépendants et défend lui aussi le non-alignement.",
  },
  {
    id: 'truman',
    nom: 'Harry S. Truman',
    vie: '1884-1972',
    periode: 'guerre-froide',
    resume: 'Président des États-Unis au début de la guerre froide',
    role: "Devenu président à la mort de Roosevelt, il décide d'employer la bombe atomique contre le Japon. En 1947, il annonce que les États-Unis aideront tout pays menacé par le communisme : c'est la doctrine Truman, qui ouvre la guerre froide.",
  },
  {
    id: 'khrouchtchev',
    nom: 'Nikita Khrouchtchev',
    vie: '1894-1971',
    periode: 'guerre-froide',
    resume: "Dirigeant de l'URSS de 1953 à 1964",
    role: "Successeur de Staline, il dénonce ses crimes en 1956 : c'est la déstalinisation. Sa direction est pourtant marquée par deux crises majeures, la construction du mur de Berlin en 1961 et la crise de Cuba en 1962.",
  },
  {
    id: 'gorbatchev',
    nom: 'Mikhaïl Gorbatchev',
    vie: '1931-2022',
    periode: 'guerre-froide',
    resume: "Dernier dirigeant de l'URSS",
    role: "Arrivé au pouvoir en 1985, il tente de réformer un pays à bout de souffle par la perestroïka (restructuration) et la glasnost (transparence). Il renonce à intervenir militairement dans les pays de l'Est, ce qui laisse tomber le mur de Berlin. L'URSS disparaît en 1991.",
  },
  {
    id: 'schuman',
    nom: 'Robert Schuman',
    vie: '1886-1963',
    periode: 'europe',
    resume: 'Ministre français à l\'origine de la construction européenne',
    role: "Ministre des Affaires étrangères, il propose le 9 mai 1950 de placer le charbon et l'acier français et allemands sous une autorité commune. L'idée : rendre une nouvelle guerre entre les deux pays matériellement impossible. Cette déclaration est le point de départ de la construction européenne.",
  },
  {
    id: 'mitterrand',
    nom: 'François Mitterrand',
    vie: '1916-1996',
    periode: 'europe',
    resume: 'Président de la République de 1981 à 1995',
    role: "Premier président socialiste de la Ve République, il reste quatorze ans au pouvoir. Avec le chancelier allemand Helmut Kohl, il relance la construction européenne et fait adopter en France le traité de Maastricht en 1992.",
  },
];
