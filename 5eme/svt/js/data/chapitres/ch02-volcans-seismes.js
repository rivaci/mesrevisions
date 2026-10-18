// Chapitre 2 — L'activité interne de la Terre : le volcanisme et les séismes.
//
// D'après le polycopié de SVT d'Antonin transmis par Denis (« 5e - Volcanisme
// et séismes ») : 2.1 des phénomènes visibles en surface, 2.2 le volcanisme
// (deux volcans comparés, la classification, l'édification d'un volcan, le
// déclenchement des éruptions, la viscosité), 2.3 les séismes (intensité,
// magnitude, isoséistes, sismographe), 2.4 l'origine de l'énergie (contraintes,
// failles). Le même polycopié commence par le chapitre 1 (rappels de 6e :
// conditions de la vie, échelle des temps géologiques) : il n'est pas ici.
//
// Les réponses des activités sont celles que donnent les « Bilans » du
// polycopié ; l'ordre de l'édification d'un volcan et celui des étapes d'une
// éruption se déduisent des schémas et du bilan 2. La fiche résume en notes,
// sans recopier le polycopié (le dépôt est public).
//
// Deux écarts du polycopié, vérifiés sur des sources et non repris : le
// séisme d'Arette (1967) n'est pas dans les « Pyrénées orientales » mais dans
// les Pyrénées-Atlantiques, en Béarn (SisFrance) ; il a fait quelques
// blessés, pas des centaines (Larousse, 1968 ; le journal reproduit dans le
// polycopié en compte 14). Le mont Gerbier de Jonc est en Ardèche, pas dans
// la chaîne des Puys.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'ch02',
  numero: 2,
  titre: 'Volcans et séismes',
  detail: 'L\'activité interne de la Terre · Volcans effusifs et explosifs · Séismes et failles',

  // Ce que Merlin sait du chapitre quand il corrige une réponse rédigée.
  profilMerlin: 'Élève de 5e. SVT, chapitre « L\'activité interne de la Terre » : volcanisme et séismes. La Terre, très chaude à '
    + 'sa formation (accrétion), a gardé une grande partie de sa chaleur (la radioactivité des roches en produit aussi) : cette '
    + 'chaleur interne explique en grande partie les volcans et les séismes. Volcanisme : l\'arrivée en surface de magma (mélange '
    + 'de roche fondue et de gaz). Éruption effusive (volcan « rouge », ex. le Piton de la Fournaise) : lave fluide qui coule, '
    + 'coulées, fontaines de lave, projections ; cône volcanique avec cratère ; la lave refroidie donne du basalte. Éruption '
    + 'explosive (volcan « gris », ex. la Soufrière de Montserrat, la montagne Pelée) : violentes explosions, panaches de cendres '
    + 'et de gaz, nuées ardentes (nuages de gaz chauds et de débris qui dévalent la pente) ; la lave visqueuse ne coule pas, '
    + 'forme un dôme qui bouche le cratère et explosera à l\'éruption suivante. Le magma se forme en profondeur par fusion '
    + 'partielle des roches, s\'accumule dans un réservoir magmatique, remonte par la cheminée ; un brusque dégazage déclenche '
    + 'l\'éruption. Les gaz sous pression sont les « moteurs » des éruptions ; la lave est du magma dégazé. Le type d\'éruption '
    + 'dépend de la viscosité du magma : peu visqueux → effusive, très visqueux → explosive (les gaz ne peuvent pas s\'échapper). '
    + 'Le trémor : de petits séismes dus à la remontée du magma ; les ondes sismiques traversent mal les liquides, d\'où une '
    + 'zone sans séismes : le réservoir. Surveillance : le volcan gonfle (inclinomètres, balises). Séismes : vibrations du sol '
    + 'qui se propagent à 360° ; répliques ; le foyer (hypocentre) est le lieu de rupture des roches en profondeur, l\'épicentre '
    + 'le point de la surface à sa verticale, où l\'intensité est la plus forte. La magnitude mesure l\'énergie libérée ; '
    + 'l\'intensité (échelle MSK, de I à XII) mesure les effets ressentis en un lieu, et diminue avec la distance à l\'épicentre ; '
    + 'les isoséistes relient les lieux de même intensité. Le sismographe enregistre les ondes : le sismogramme. Origine : les '
    + 'roches subissent des contraintes dues au mouvement des plaques (compression ou distension), accumulent de l\'énergie et '
    + 'cassent : une faille (normale, inverse ou décrochante) ; l\'énergie se propage en ondes sismiques.',

  seances: [
    { numero: 1, partie: '2.1 et 2.2.1', titre: 'La chaleur de la Terre, et deux sortes de volcans' },
    { numero: 2, partie: '2.2.2', titre: 'Comment se déclenche une éruption' },
    { numero: 3, partie: '2.3', titre: 'Les séismes' },
    { numero: 4, partie: '2.4', titre: 'L\'origine des séismes : les failles' },
  ],

  etapes: [
    // ═══ Séance 1 — la chaleur interne, et les volcans ════════════════════

    {
      id: 'v1-mots',
      seance: 1,
      titre: 'Le vocabulaire du volcan',
      sousTitre: 'Magma, lave, cratère, cheminée…',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'La chaleur interne de la Terre',
          lignes: [
            'À sa formation, la Terre était **très chaude** : elle s\'est formée par l\'accumulation de poussières et d\'astéroïdes, l\'**accrétion**.',
            'Elle a gardé une bonne partie de cette chaleur, et la **radioactivité** des roches en produit aussi. Cette **chaleur interne** explique en grande partie les **volcans** et les **séismes**.',
            'De la surface vers le centre : la **croûte** (10 à 70 km d\'épaisseur), le **manteau**, puis le **noyau** — de plus en plus chaud.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les mots à savoir définir',
          colonnes: ['Le mot', 'Sa définition'],
          lignes: [
            ['le **magma**', 'un mélange de **roche fondue** et de **gaz**, formé en profondeur'],
            ['la **lave**', 'le magma arrivé en surface, qui a perdu ses gaz : du **magma dégazé**'],
            ['une **éruption**', 'l\'épisode pendant lequel un volcan **rejette du magma** : lave, gaz, cendres'],
            ['le **cratère**', 'l\'ouverture au sommet du volcan, d\'où sort la lave'],
            ['la **cheminée**', 'le conduit par lequel le magma remonte jusqu\'au cratère'],
            ['le **réservoir magmatique**', 'la poche où le magma s\'accumule sous le volcan (on dit aussi chambre magmatique)'],
            ['le **cône volcanique**', 'le relief formé par l\'accumulation des coulées et des projections'],
            ['une **nuée ardente**', 'un nuage de **gaz chauds** et de **débris** qui dévale la pente à grande vitesse'],
            ['le **dôme**', 'la lave **visqueuse** solidifiée qui bouche le cratère'],
            ['le **basalte**', 'la roche que donne la lave fluide en refroidissant'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**Magma** sous terre, **lave** en surface : la lave, c\'est le magma qui a perdu ses gaz.',
          ],
        },
      ],
      items: [
        {
          id: 'v-t-magma', type: 'terme', definition: 'Un mélange de roche fondue et de gaz, formé en profondeur', attendu: 'magma', accepte: ['le magma'],
          pieges: [{ si: ['lave'], message: 'Non : la lave, c\'est le magma arrivé en surface, qui a perdu ses gaz. Sous terre, avec ses gaz : le magma.' }],
        },
        {
          id: 'v-t-lave', type: 'terme', definition: 'Le magma arrivé en surface, qui a perdu ses gaz', attendu: 'lave', accepte: ['la lave', 'magma dégazé'],
          pieges: [{ si: ['magma'], message: 'Non : le magma est sous terre, avec ses gaz. En surface, dégazé : la lave.' }],
        },
        {
          id: 'v-t-eruption', type: 'terme', definition: 'L\'épisode pendant lequel un volcan rejette du magma : lave, gaz, cendres', attendu: 'éruption', accepte: ['une éruption', 'éruption volcanique'],
          pieges: [{ si: ['volcanisme', 'le volcanisme'], resultat: 'presque', message: 'Le volcanisme, c\'est l\'ensemble du phénomène. L\'épisode où le volcan rejette du magma : une éruption.' }],
        },
        { id: 'v-t-cratere', type: 'terme', definition: 'L\'ouverture au sommet du volcan, d\'où sort la lave', attendu: 'cratère', accepte: ['le cratère'] },
        { id: 'v-t-cheminee', type: 'terme', definition: 'Le conduit par lequel le magma remonte jusqu\'au cratère', attendu: 'cheminée', accepte: ['la cheminée', 'cheminée volcanique'] },
        {
          id: 'v-t-reservoir', type: 'terme', definition: 'La poche où le magma s\'accumule sous le volcan', attendu: 'réservoir magmatique',
          accepte: ['le réservoir magmatique', 'chambre magmatique', 'la chambre magmatique', 'réservoir', 'réserve de magma', 'la réserve de magma', 'réservoir de magma'],
        },
        {
          id: 'v-t-cone', type: 'terme', definition: 'Le relief formé par l\'accumulation des coulées et des projections', attendu: 'cône volcanique', accepte: ['le cône volcanique', 'cône'],
          pieges: [{ si: ['volcan', 'édifice volcanique'], resultat: 'presque', message: 'C\'est bien le volcan, mais ce relief a un nom précis dans le cours : le cône volcanique.' }],
        },
        { id: 'v-t-nuee', type: 'terme', definition: 'Un nuage de gaz chauds et de débris qui dévale la pente à grande vitesse', attendu: 'nuée ardente', accepte: ['une nuée ardente', 'nuées ardentes', 'nuée'] },
        {
          id: 'v-t-dome', type: 'terme', definition: 'La lave visqueuse solidifiée qui bouche le cratère', attendu: 'dôme', accepte: ['le dôme', 'dôme de lave'],
          pieges: [{ si: ['bouchon', 'un bouchon'], resultat: 'presque', message: 'Il fait bien bouchon, comme la purée de l\'expérience ; le mot du cours : le dôme.' }],
        },
        { id: 'v-t-basalte', type: 'terme', definition: 'La roche que donne la lave fluide en refroidissant', attendu: 'basalte', accepte: ['le basalte'] },
        {
          id: 'v-chaleur', type: 'choix', consigne: BLOC, phrase: 'Qu\'est-ce qui explique en grande partie les volcans et les séismes ?',
          options: ['La chaleur interne de la Terre', 'La chaleur du Soleil', 'Le vent et la pluie'], attendu: 'La chaleur interne de la Terre',
          explication: 'Héritée de sa formation (l\'accrétion), et produite aussi par la radioactivité des roches.',
        },
      ],
    },

    {
      id: 'v1-deux-volcans',
      seance: 1,
      titre: 'Effusif ou explosif ?',
      sousTitre: 'Le Piton de la Fournaise et la Soufrière de Montserrat',
      duree: 5,
      fiche: [
        {
          type: 'tableau',
          titre: 'Deux volcans comparés',
          colonnes: ['', 'Piton de la Fournaise (La Réunion)', 'Soufrière de Montserrat (Antilles)'],
          lignes: [
            ['**Type**', '**effusif**, dit « volcan **rouge** »', '**explosif**, dit « volcan **gris** »'],
            ['**Lave**', '**fluide** : elle coule', '**visqueuse** : elle ne coule pas'],
            ['**Ce qu\'il produit**', 'des **coulées** de lave, des **fontaines** de lave', 'un **nuage de cendres**, des **nuées ardentes** (300 °C, 300 km/h), un **dôme**'],
            ['**Édifice**', 'un **cône** volcanique avec un cratère', 'un **dôme** de lave refroidie'],
            ['**Le paysage**', 'l\'île s\'agrandit, paysages brûlés', 'destruction totale sur 25 km, dépôts de cendres'],
          ],
        },
        {
          type: 'tableau',
          titre: 'Six volcans classés',
          colonnes: ['Explosifs (cendres, explosions, pas de coulées)', 'Effusifs (coulées de lave)'],
          lignes: [
            ['El Chichón, mont Saint Helens', 'Etna, Kilauea'],
            ['**montagne Pelée** (29 000 morts, la ville de Saint-Pierre détruite)', '**Piton de la Fournaise**'],
          ],
        },
        {
          type: 'regle',
          titre: 'Reconnaître un volcan à sa forme (volcans du Massif central)',
          lignes: [
            'Un **cratère** bien visible : un volcan **effusif** — le puy de Pariou, le puy de Côme (deux cratères emboîtés).',
            'Un **dôme** : un volcan **explosif** — le puy de Dôme, le mont Gerbier de Jonc.',
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Effusif : un **cratère** et des **coulées**. Explosif : un **dôme** qui bouche le cratère, et pas de coulée.',
            'Un volcan explosif peut entrer en éruption plusieurs fois par le **même cratère** ; un volcan effusif, très rarement : sa lave sort souvent par une **nouvelle fissure**, d\'où des **cônes secondaires**.',
          ],
        },
      ],
      items: [
        {
          id: 'v-fournaise', type: 'choix', consigne: BLOC, phrase: 'Le Piton de la Fournaise, avec ses coulées de lave fluide, est un volcan…',
          options: ['effusif', 'explosif'], attendu: 'effusif',
          explication: 'Un volcan « rouge » : la lave fluide coule.',
        },
        {
          id: 'v-soufriere', type: 'choix', consigne: BLOC, phrase: 'La Soufrière de Montserrat, avec ses nuées ardentes et son dôme, est un volcan…',
          options: ['explosif', 'effusif'], attendu: 'explosif',
          explication: 'Un volcan « gris » : la lave visqueuse ne coule pas.',
        },
        {
          id: 'v-difference', type: 'choix', consigne: BLOC, phrase: 'Quelle est la principale différence entre les deux volcans ?',
          options: ['L\'un a une lave fluide qui coule, l\'autre une lave visqueuse et des explosions', 'L\'un est chaud, l\'autre est froid', 'L\'un est sur une île, l\'autre non'],
          attendu: 'L\'un a une lave fluide qui coule, l\'autre une lave visqueuse et des explosions',
          explication: 'Les deux sont sur des îles, et les deux sont chauds : c\'est la lave et le type d\'éruption qui changent.',
        },
        {
          id: 'v-rouge', type: 'choix', consigne: BLOC, phrase: 'On appelle « volcan rouge » un volcan…',
          options: ['effusif', 'explosif'], attendu: 'effusif',
          explication: 'Rouge, comme ses coulées de lave. Le volcan explosif est « gris », comme ses cendres.',
        },
        {
          id: 'v-nuee', type: 'choix', consigne: BLOC, phrase: 'Quel volcan produit des nuées ardentes ?',
          options: ['Un volcan explosif', 'Un volcan effusif'], attendu: 'Un volcan explosif',
          explication: 'Des nuages de gaz chauds et de débris, comme à la montagne Pelée.',
        },
        {
          id: 'v-pelee', type: 'choix', consigne: BLOC, phrase: 'La montagne Pelée (29 000 morts, la ville de Saint-Pierre détruite) est un volcan…',
          options: ['explosif', 'effusif'], attendu: 'explosif',
          explication: 'Des cendres, des explosions, pas de coulées de lave.',
        },
        {
          id: 'v-etna', type: 'choix', consigne: BLOC, phrase: 'L\'Etna, connu pour ses coulées de lave, est, d\'après le tableau du cours, un volcan…',
          options: ['effusif', 'explosif'], attendu: 'effusif',
          explication: 'Des coulées de lave : effusif, comme le Kilauea.',
        },
        {
          id: 'v-dome-forme', type: 'choix', consigne: BLOC, phrase: 'Le puy de Dôme a la forme d\'un dôme. C\'est donc un volcan…',
          options: ['explosif', 'effusif'], attendu: 'explosif',
          explication: 'Un dôme de lave visqueuse : explosif, comme le mont Gerbier de Jonc.',
        },
        {
          id: 'v-pariou', type: 'choix', consigne: BLOC, phrase: 'Le puy de Pariou a un cratère remarquable. C\'est donc un volcan…',
          options: ['effusif', 'explosif'], attendu: 'effusif',
          explication: 'Un cône avec un cratère : effusif, comme le puy de Côme.',
        },
        {
          id: 'v-fissure', type: 'choix', consigne: BLOC, phrase: 'Pourquoi un volcan effusif a-t-il souvent un cône principal et de nombreux cônes secondaires ?',
          options: ['Après chaque éruption, la fissure se bouche : le magma sort ensuite par une autre fissure', 'Parce que le dôme explose', 'Parce que les cendres forment des collines'],
          attendu: 'Après chaque éruption, la fissure se bouche : le magma sort ensuite par une autre fissure',
          explication: 'À chaque éruption, un cône : le massif du Piton de la Fournaise en compte beaucoup.',
        },
      ],
    },

    {
      id: 'v1-edification',
      seance: 1,
      titre: 'La naissance d\'un volcan effusif',
      sousTitre: 'Les étapes, et la structure',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: 'Les étapes',
          lignes: [
            'Le sol se bombe : une **fissure** s\'ouvre → des **fontaines de lave** et des **projections** retombent autour → elles **s\'accumulent** et forment le **cône** → le cratère s\'effondre et une **coulée** de lave s\'écoule.',
            'Sous le volcan : le **réservoir magmatique** → la **cheminée** → le **cratère**.',
          ],
        },
      ],
      items: [
        {
          id: 'v-ordre-edification', type: 'ordre', consigne: 'Remets dans l\'ordre la mise en place d\'un volcan effusif :',
          elements: [
            'Une fissure s\'ouvre dans le sol.',
            'Des fontaines de lave projettent des débris autour de la fissure.',
            'Les projections s\'accumulent et forment le cône volcanique.',
            'Le cratère s\'effondre et une coulée de lave se met en place.',
          ],
        },
        {
          id: 'v-ordre-trajet', type: 'ordre', consigne: 'Remets dans l\'ordre le trajet du magma, de la profondeur à la surface :',
          elements: [
            'Le réservoir magmatique',
            'La cheminée volcanique',
            'Le cratère',
            'La coulée de lave',
          ],
        },
      ],
    },

    // ═══ Séance 2 — le déclenchement d'une éruption ══════════════════════

    {
      id: 'v2-eruption',
      seance: 2,
      titre: 'Du magma à l\'éruption',
      sousTitre: 'Le trémor, les gaz, la viscosité',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Repérer le magma sous le volcan',
          lignes: [
            'Le magma qui remonte fissure les roches : de petits séismes, le **trémor**.',
            'Les ondes sismiques traversent **mal les liquides**, **bien les solides**. Sous le Piton de la Fournaise, avant l\'éruption de 2007 : les séismes les plus anciens sont **très profonds**, les plus récents **peu profonds** → le magma **remonte** ; une zone **sans séismes** : la **réserve de magma**.',
            'Avant une éruption, le volcan **gonfle** : les **inclinomètres** et des **balises** le détectent.',
          ],
        },
        {
          type: 'regle',
          titre: 'Les étapes d\'une éruption',
          lignes: [
            '1. Le **magma se forme** en profondeur par **fusion partielle** d\'une roche.',
            '2. Il **s\'accumule** dans le **réservoir magmatique**.',
            '3. Il **remonte** dans la **cheminée**.',
            '4. Un **brusque dégazage** déclenche l\'**éruption** — comme une bouteille de soda secouée qu\'on ouvre.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Pourquoi deux sortes d\'éruptions ? La viscosité',
          colonnes: ['Magma…', 'Les gaz…', 'L\'éruption'],
          lignes: [
            ['**peu visqueux** (fluide)', 's\'échappent facilement', '**effusive** : de longues coulées'],
            ['**très visqueux**', 'restent prisonniers, la pression monte', '**explosive** : explosions, dôme'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Les **gaz** sous pression sont les **moteurs** des éruptions : ils remontent en entraînant le magma. Arrivés en surface, ils s\'échappent : la **lave** est du **magma dégazé**.',
            'L\'expérience de la purée : la purée **liquide** coule le long du tube (**effusif**) ; la purée **épaisse** sort en bloc et fait bouchon (**explosif**).',
          ],
        },
      ],
      items: [
        { id: 'v-t-tremor', type: 'terme', definition: 'Les petits séismes provoqués par la remontée du magma sous le volcan', attendu: 'trémor', accepte: ['le trémor'] },
        { id: 'v-t-viscosite', type: 'terme', definition: 'La propriété d\'un magma plus ou moins épais, qui coule plus ou moins facilement', attendu: 'viscosité', accepte: ['la viscosité'] },
        {
          id: 'v-ordre-eruption', type: 'ordre', consigne: 'Remets dans l\'ordre les étapes d\'une éruption :',
          elements: [
            'Formation de magma par fusion partielle d\'une roche',
            'Accumulation du magma dans le réservoir magmatique',
            'Remontée du magma dans la cheminée du volcan',
            'Brusque dégazage à l\'origine de l\'éruption',
          ],
        },
        {
          id: 'v-moteur', type: 'choix', consigne: BLOC, phrase: 'Quels sont les « moteurs » des éruptions ?',
          options: ['Les gaz sous pression contenus dans le magma', 'Les coulées de lave', 'Les cendres'],
          attendu: 'Les gaz sous pression contenus dans le magma',
          explication: 'Ils remontent en entraînant le magma, comme le gaz d\'un soda secoué.',
        },
        {
          id: 'v-visqueux', type: 'choix', consigne: BLOC, phrase: 'Un magma très visqueux donne une éruption…',
          options: ['explosive', 'effusive'], attendu: 'explosive',
          explication: 'Les gaz ne peuvent pas s\'échapper : la pression monte jusqu\'à l\'explosion.',
        },
        {
          id: 'v-fluide', type: 'choix', consigne: BLOC, phrase: 'Un magma peu visqueux donne une éruption…',
          options: ['effusive', 'explosive'], attendu: 'effusive',
          explication: 'Les gaz s\'échappent facilement : la lave coule en longues coulées.',
        },
        {
          id: 'v-zone-sans', type: 'choix', consigne: 'D\'après les séismes sous le Piton de la Fournaise (2007) :', phrase: 'À quoi correspond la zone sans séismes sous le volcan ?',
          options: ['À une réserve de magma, car les ondes circulent mal dans les liquides', 'À une roche très dure', 'Au cratère'],
          attendu: 'À une réserve de magma, car les ondes circulent mal dans les liquides',
          explication: 'C\'est l\'explication du cours. Et puis, dans du magma liquide, la roche ne casse pas : pas de rupture, donc pas de séisme.',
        },
        {
          id: 'v-remonte', type: 'choix', consigne: 'D\'après les séismes sous le Piton de la Fournaise (2007) :', phrase: 'Les séismes les plus récents sont peu profonds, les plus anciens très profonds. Qu\'en déduit-on ?',
          options: ['Le magma remonte sous le volcan', 'Le magma descend vers le centre de la Terre', 'Il n\'y a pas de magma'],
          attendu: 'Le magma remonte sous le volcan',
          explication: 'Les séismes suivent le magma qui monte vers la surface.',
        },
        {
          id: 'v-gonfle', type: 'choix', consigne: BLOC, phrase: 'Comment les géologues savent-ils que du magma remonte dans un volcan ?',
          options: ['Le volcan gonfle : les inclinomètres et les balises le détectent', 'La lave change de couleur', 'Il pleut davantage'],
          attendu: 'Le volcan gonfle : les inclinomètres et les balises le détectent',
          explication: 'Les pentes changent d\'inclinaison et les balises s\'éloignent les unes des autres.',
        },
        {
          id: 'v-lave-degaze', type: 'choix', consigne: BLOC, phrase: 'La lave, c\'est…',
          options: ['du magma qui a perdu ses gaz', 'du magma avec plus de gaz', 'de la roche qui n\'a jamais fondu'],
          attendu: 'du magma qui a perdu ses gaz',
          explication: 'Arrivés en surface, les gaz s\'échappent : la lave est du magma dégazé.',
        },
      ],
    },

    {
      id: 'v2-ecrire',
      seance: 2,
      titre: 'Rédiger : effusif ou explosif',
      sousTitre: 'Expliquer la différence',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Une explication en trois temps',
          lignes: [
            '**Ce qu\'on observe** : le volcan effusif a des coulées de lave ; le volcan explosif, des explosions et un dôme.',
            '**Ce qu\'on sait** : le magma contient des gaz sous pression, les moteurs de l\'éruption.',
            '**L\'explication** : la viscosité. Magma fluide → les gaz s\'échappent → effusif. Magma visqueux → les gaz restent prisonniers → explosif.',
          ],
        },
      ],
      items: [
        {
          id: 'v-w-viscosite', type: 'decrire', sujet: 'Pourquoi certains volcans sont-ils effusifs et d\'autres explosifs ?', emoji: '🌋',
          indices: ['lave fluide', 'lave visqueuse', 'viscosité', 'gaz', 'coulées', 'dôme', 'explosions', 'Piton de la Fournaise', 'Soufrière de Montserrat'],
          consigne: 'Rédige trois ou quatre phrases : ce qu\'on observe pour chaque sorte de volcan, et ce qui explique la différence.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Un volcan effusif, comme le Piton de la Fournaise, produit des coulées de lave fluide, alors qu\'un volcan explosif, comme la Soufrière de Montserrat, produit des explosions, des nuées ardentes et un dôme. La différence vient de la viscosité du magma, qui contient des gaz sous pression. Quand le magma est fluide, les gaz s\'échappent facilement et la lave coule : l\'éruption est effusive. Quand le magma est très visqueux, les gaz restent prisonniers, la pression monte et le volcan explose.',
          criteres: [
            { id: 'observations', texte: 'Ce qu\'on observe : des coulées de lave fluide pour l\'effusif ; des explosions, des nuées ardentes ou un dôme pour l\'explosif' },
            { id: 'viscosite', texte: 'La cause : la viscosité du magma (fluide ou visqueux)' },
            { id: 'gaz', texte: 'Le rôle des gaz : ils s\'échappent d\'un magma fluide, restent prisonniers d\'un magma visqueux et le font exploser' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — les séismes ══════════════════════════════════════════

    {
      id: 'v3-mots',
      seance: 3,
      titre: 'Le vocabulaire des séismes',
      sousTitre: 'Foyer, épicentre, magnitude, intensité…',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les mots à savoir définir',
          colonnes: ['Le mot', 'Sa définition'],
          lignes: [
            ['un **séisme**', 'des **vibrations** du sol, horizontales et verticales, provoquées par la rupture de roches en profondeur'],
            ['une **réplique**', 'une **secousse secondaire**, moins forte, quelques heures après le séisme'],
            ['le **foyer** (ou **hypocentre**)', 'le lieu de **rupture des roches**, en profondeur'],
            ['l\'**épicentre**', 'le point de la **surface**, à la **verticale du foyer**, où l\'intensité est la plus forte'],
            ['la **magnitude**', 'la valeur qui **mesure l\'énergie libérée** par le séisme (sa puissance)'],
            ['l\'**intensité**', 'la façon dont les secousses sont **ressenties** en un lieu, de **I à XII** sur l\'**échelle MSK**'],
            ['une **isoséiste**', 'une courbe qui relie les lieux de **même intensité**'],
            ['une **onde** sismique', 'la vibration qui transporte l\'énergie du séisme dans toutes les directions'],
            ['le **sismographe**', 'l\'appareil qui **enregistre** les mouvements du sol (on dit aussi sismomètre)'],
            ['le **sismogramme**', 'l\'**enregistrement** obtenu, le tracé'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**Foyer** en profondeur, **épicentre** en surface, juste au-dessus.',
            '**Magnitude** : une seule valeur par séisme, la mesure de l\'énergie. **Intensité** : change d\'un lieu à l\'autre, ce qu\'on ressent. Comme une **lampe** : sa puissance (magnitude) est la même, mais la chaleur ressentie (intensité) baisse quand on s\'éloigne.',
            '**Sismographe**, l\'appareil ; **sismogramme**, le tracé (comme télégraphe et télégramme).',
          ],
        },
      ],
      items: [
        { id: 'v-t-seisme', type: 'terme', definition: 'Des vibrations du sol provoquées par la rupture de roches en profondeur', attendu: 'séisme', accepte: ['un séisme', 'séismes', 'tremblement de terre', 'un tremblement de terre', 'tremblements de terre'] },
        { id: 'v-t-replique', type: 'terme', definition: 'Une secousse secondaire, moins forte, quelques heures après le séisme', attendu: 'réplique', accepte: ['une réplique', 'répliques'] },
        {
          id: 'v-t-foyer', type: 'terme', definition: 'Le lieu de rupture des roches, en profondeur', attendu: 'foyer', accepte: ['le foyer', 'hypocentre', 'l\'hypocentre', 'foyer sismique', 'foyer du séisme'],
          pieges: [{ si: ['épicentre'], message: 'Non : l\'épicentre est en surface. En profondeur, là où la roche casse : le foyer (ou hypocentre).' }],
        },
        {
          id: 'v-t-epicentre', type: 'terme', definition: 'Le point de la surface, à la verticale du foyer, où l\'intensité est la plus forte', attendu: 'épicentre', accepte: ['l\'épicentre', 'épicentre du séisme'],
          pieges: [{ si: ['foyer', 'hypocentre'], message: 'Non : le foyer est en profondeur. Le point de la surface juste au-dessus : l\'épicentre.' }],
        },
        {
          id: 'v-t-magnitude', type: 'terme', definition: 'La valeur qui mesure l\'énergie libérée par un séisme, sa puissance', attendu: 'magnitude', accepte: ['la magnitude'],
          pieges: [{ si: ['intensité'], message: 'Non : l\'intensité, c\'est ce qu\'on ressent en un lieu. L\'énergie libérée : la magnitude.' }],
        },
        {
          id: 'v-t-intensite', type: 'terme', definition: 'La façon dont les secousses sont ressenties en un lieu, de I à XII', attendu: 'intensité', accepte: ['l\'intensité'],
          pieges: [{ si: ['magnitude'], message: 'Non : la magnitude, c\'est l\'énergie du séisme, la même partout. Ce qu\'on ressent en un lieu : l\'intensité.' }],
        },
        { id: 'v-t-isoseiste', type: 'terme', definition: 'Une courbe qui relie les lieux de même intensité', attendu: 'isoséiste', accepte: ['une isoséiste', 'isoséistes', 'courbe isoséiste', 'courbes isoséistes'] },
        {
          id: 'v-t-sismographe', type: 'terme', definition: 'L\'appareil qui enregistre les mouvements du sol', attendu: 'sismographe', accepte: ['le sismographe', 'sismomètre', 'le sismomètre'],
          pieges: [{ si: ['sismogramme'], message: 'Le sismogramme, c\'est le tracé. L\'appareil : le sismographe.' }],
        },
        {
          id: 'v-t-sismogramme', type: 'terme', definition: 'L\'enregistrement obtenu, le tracé des vibrations', attendu: 'sismogramme', accepte: ['le sismogramme'],
          pieges: [{ si: ['sismographe'], message: 'Le sismographe, c\'est l\'appareil. Le tracé : le sismogramme.' }],
        },
        { id: 'v-t-onde', type: 'terme', definition: 'La vibration qui transporte l\'énergie du séisme dans toutes les directions', attendu: 'onde sismique', accepte: ['onde', 'ondes', 'ondes sismiques', 'une onde sismique'] },
      ],
    },

    {
      id: 'v3-intensite',
      seance: 3,
      titre: 'Intensité, magnitude, enregistrement',
      sousTitre: 'Le séisme d\'Arette, le sismographe, Kobé',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'L\'intensité varie d\'un lieu à l\'autre',
          lignes: [
            'L\'intensité **diminue** quand on s\'**éloigne de l\'épicentre** : les ondes s\'affaiblissent avec la distance.',
            'Elle est **la plus forte à l\'épicentre**, à la verticale du foyer. Et plus la **magnitude** est forte, plus l\'intensité à l\'épicentre est forte.',
            'L\'échelle **MSK** (de I à XII) porte les noms de trois sismologues : Medvedev, Sponheuer et Kárník.',
          ],
        },
        {
          type: 'regle',
          titre: 'Un exemple : le séisme d\'Arette (Pyrénées-Atlantiques, 13 août 1967)',
          lignes: [
            'Magnitude **supérieure à 5,5** ; ressenti sur **150 000 km²**, jusqu\'au nord de l\'Espagne : un mort, des blessés, 62 communes sinistrées.',
            'Sur la carte, les **isoséistes** entourent la zone de plus forte intensité : l\'**épicentre**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Le sismographe',
          lignes: [
            'Un **socle** fixé au sol porte un **cylindre enregistreur**. Un **stylet**, relié à une **masse** suspendue à un **ressort**, touche le cylindre.',
            'Pendant le séisme, le sol, le socle et le cylindre bougent ; la **masse reste immobile** : le stylet trace un **sismogramme**. Plus les vibrations sont fortes, plus le tracé est **grand**.',
            'Le sismogramme donne la **puissance**, la **durée** et l\'**heure** du séisme. Un **réseau mondial** de sismographes enregistre en permanence les séismes.',
          ],
        },
        {
          type: 'regle',
          titre: 'Kobé (Japon), janvier 1995 : deux sismogrammes',
          lignes: [
            'Le séisme est enregistré **près de Kobé** et **en Auvergne**, à 9 000 km : les ondes arrivent **plus tard** en France, car elles mettent du **temps** à voyager.',
            'Au Japon, le tracé **déborde** de la feuille. Le séisme fait des dégâts au Japon, pas en France : les ondes **s\'affaiblissent** avec la distance.',
          ],
        },
      ],
      items: [
        {
          id: 'v-intensite-distance', type: 'choix', consigne: BLOC, phrase: 'Quand on s\'éloigne de l\'épicentre, l\'intensité…',
          options: ['diminue', 'augmente', 'reste la même'], attendu: 'diminue',
          explication: 'Les ondes s\'affaiblissent avec la distance.',
        },
        {
          id: 'v-intensite-max', type: 'choix', consigne: BLOC, phrase: 'Où l\'intensité d\'un séisme est-elle la plus forte ?',
          options: ['À l\'épicentre', 'Au foyer, en profondeur', 'Loin du séisme'], attendu: 'À l\'épicentre',
          explication: 'L\'intensité se mesure en surface : elle est la plus forte à l\'épicentre, juste au-dessus du foyer.',
        },
        {
          id: 'v-msk', type: 'choix', consigne: BLOC, phrase: 'Sur quelle échelle mesure-t-on l\'intensité, de I à XII ?',
          options: ['L\'échelle MSK', 'L\'échelle des temps géologiques', 'L\'échelle de la carte'], attendu: 'L\'échelle MSK',
          explication: 'Medvedev, Sponheuer et Kárník.',
        },
        {
          id: 'v-lampe', type: 'choix', consigne: BLOC, phrase: 'Dans l\'exemple de la lampe, la puissance de l\'ampoule correspond à…',
          options: ['la magnitude', 'l\'intensité', 'la réplique'], attendu: 'la magnitude',
          explication: 'La puissance est la même ; la chaleur ressentie (l\'intensité) dépend de la distance.',
        },
        {
          id: 'v-centre-isoseistes', type: 'choix', consigne: BLOC, phrase: 'Qu\'y a-t-il au centre des isoséistes ?',
          options: ['L\'épicentre', 'Le foyer', 'Le sismographe'], attendu: 'L\'épicentre',
          explication: 'La zone de plus forte intensité, au centre des courbes.',
        },
        {
          id: 'v-masse', type: 'choix', consigne: BLOC, phrase: 'Dans un sismographe, pendant un séisme, quelle pièce reste immobile ?',
          options: ['La masse', 'Le socle', 'Le cylindre enregistreur'], attendu: 'La masse',
          explication: 'Le sol, le socle et le cylindre bougent ; la masse suspendue reste immobile, et le stylet trace.',
        },
        {
          id: 'v-amplitude', type: 'choix', consigne: BLOC, phrase: 'Sur un sismogramme, plus les vibrations sont fortes…',
          options: ['plus le tracé est grand', 'plus le tracé est petit', 'plus le tracé est plat'], attendu: 'plus le tracé est grand',
          explication: 'La taille du tracé est proportionnelle au mouvement du sol.',
        },
        {
          id: 'v-kobe-retard', type: 'choix', consigne: 'D\'après les sismogrammes du séisme de Kobé (1995) :', phrase: 'Pourquoi le séisme est-il enregistré plus tard en France qu\'au Japon ?',
          options: ['Les ondes mettent du temps à parcourir 9 000 km', 'Il y a eu deux séismes', 'Le sismographe français est en panne'],
          attendu: 'Les ondes mettent du temps à parcourir 9 000 km',
          explication: 'Les ondes vont très vite, mais il leur faut du temps pour arriver si loin.',
        },
        {
          id: 'v-kobe-degats', type: 'choix', consigne: 'D\'après les sismogrammes du séisme de Kobé (1995) :', phrase: 'Pourquoi le séisme a-t-il fait des dégâts au Japon, mais pas en France ?',
          options: ['Les ondes s\'affaiblissent en s\'éloignant de l\'épicentre', 'La magnitude était différente en France', 'Les maisons françaises sont plus solides'],
          attendu: 'Les ondes s\'affaiblissent en s\'éloignant de l\'épicentre',
          explication: 'Un seul séisme, une seule magnitude ; mais l\'intensité baisse avec la distance.',
        },
        {
          id: 'v-arette', type: 'reponse', question: 'Le séisme d\'Arette a eu lieu en 1967. Dans quelle chaîne de montagnes ?', attendu: 'les Pyrénées',
          accepte: ['Pyrénées', 'dans les Pyrénées', 'chaîne des Pyrénées', 'la chaîne des Pyrénées', 'Pyrénées-Atlantiques', 'Pyrénées occidentales'],
          pieges: [{ si: ['Pyrénées orientales', 'Pyrénées-Orientales'], resultat: 'presque', message: 'Ton polycopié écrit « Pyrénées orientales », mais Arette est dans les Pyrénées-Atlantiques, à l\'ouest. La chaîne : les Pyrénées.' }],
          explication: 'Dans les Pyrénées, le 13 août 1967.',
        },
      ],
    },

    // ═══ Séance 4 — l'origine des séismes ════════════════════════════════

    {
      id: 'v4-failles',
      seance: 4,
      titre: 'Contraintes et failles',
      sousTitre: 'D\'où vient l\'énergie d\'un séisme',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'L\'origine de l\'énergie',
          lignes: [
            'Les roches du sous-sol subissent des **contraintes**, dues au **mouvement des plaques** : une **compression** (un resserrement) ou une **distension** (un écartement).',
            'Elles **accumulent de l\'énergie**, se **déforment**, puis **cassent** : c\'est le **séisme**. La grande cassure est une **faille** ; le lieu de rupture, le **foyer**.',
            'L\'énergie libérée, que mesure la **magnitude**, se propage dans **toutes les directions** sous forme d\'**ondes sismiques** ; elles atteignent la surface à l\'**épicentre**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Trois sortes de failles',
          colonnes: ['Faille', 'Les deux régions…', 'Ce qui se passe'],
          lignes: [
            ['**normale**', 's\'**écartent** (distension)', 'une partie **descend**'],
            ['**inverse**', 'se **rapprochent** (compression)', 'une partie **remonte**'],
            ['**décrochante**', 'glissent **côte à côte**, en sens opposés', 'elles coulissent l\'une le long de l\'autre'],
          ],
        },
      ],
      items: [
        { id: 'v-t-faille', type: 'terme', definition: 'La grande cassure dans les roches, le long de laquelle les terrains bougent', attendu: 'faille', accepte: ['une faille', 'failles'] },
        {
          id: 'v-t-compression', type: 'terme', definition: 'Une contrainte qui resserre les roches', attendu: 'compression', accepte: ['la compression'],
          pieges: [{ si: ['distension'], message: 'Dans l\'autre sens : la distension écarte les roches. Les resserrer : la compression.' }],
        },
        {
          id: 'v-t-distension', type: 'terme', definition: 'Une contrainte qui écarte les roches', attendu: 'distension', accepte: ['la distension'],
          pieges: [{ si: ['compression'], message: 'Dans l\'autre sens : la compression resserre les roches. Les écarter : la distension.' }],
        },
        {
          id: 'v-contraintes', type: 'choix', consigne: BLOC, phrase: 'Pourquoi les roches du sous-sol subissent-elles des contraintes ?',
          options: ['À cause du mouvement des plaques tectoniques', 'À cause de la pluie', 'À cause des racines des arbres'],
          attendu: 'À cause du mouvement des plaques tectoniques',
          explication: 'Les plaques bougent : elles compriment ou étirent les roches.',
        },
        {
          id: 'v-normale', type: 'choix', consigne: BLOC, phrase: 'Les deux régions s\'écartent et une partie descend : c\'est une faille…',
          options: ['normale', 'inverse', 'décrochante'], attendu: 'normale',
          explication: 'Distension : faille normale.',
        },
        {
          id: 'v-inverse', type: 'choix', consigne: BLOC, phrase: 'Les deux régions se rapprochent et une partie remonte : c\'est une faille…',
          options: ['inverse', 'normale', 'décrochante'], attendu: 'inverse',
          explication: 'Compression : faille inverse.',
        },
        {
          id: 'v-decrochante', type: 'choix', consigne: BLOC, phrase: 'Les deux régions glissent côte à côte, en sens opposés : c\'est une faille…',
          options: ['décrochante', 'normale', 'inverse'], attendu: 'décrochante',
          explication: 'Elles coulissent l\'une le long de l\'autre.',
        },
        {
          id: 'v-ordre-seisme', type: 'ordre', consigne: 'Remets dans l\'ordre ce qui se passe lors d\'un séisme :',
          elements: [
            'Les plaques bougent : les roches subissent des contraintes.',
            'Les roches accumulent de l\'énergie et se déforment.',
            'Les roches cassent au foyer : une faille se forme.',
            'L\'énergie se propage en ondes sismiques dans toutes les directions.',
            'Les ondes atteignent la surface à l\'épicentre.',
          ],
        },
      ],
    },

    {
      id: 'v4-ecrire',
      seance: 4,
      titre: 'Rédiger : un séisme, du foyer à l\'épicentre',
      sousTitre: 'Expliquer avec les mots du cours',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Une explication en trois temps',
          lignes: [
            '**La cause** : le mouvement des plaques ; les roches subissent des contraintes et accumulent de l\'énergie.',
            '**La rupture** : la roche casse au foyer (hypocentre), une faille se forme, l\'énergie est libérée — la magnitude la mesure.',
            '**Les ondes** : elles partent dans toutes les directions, arrivent à l\'épicentre, où l\'intensité est la plus forte, puis s\'affaiblissent en s\'éloignant.',
          ],
        },
      ],
      items: [
        {
          id: 'v-w-seisme', type: 'decrire', sujet: 'Explique comment se produit un séisme, du foyer jusqu\'à la surface.', emoji: '🌍',
          indices: ['plaques', 'contraintes', 'énergie', 'foyer', 'faille', 'ondes sismiques', 'épicentre', 'intensité', 'magnitude'],
          consigne: 'Rédige trois ou quatre phrases avec les mots du cours : pourquoi la roche casse, ce qui se passe au foyer, et comment les ondes arrivent en surface.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'À cause du mouvement des plaques, les roches du sous-sol subissent des contraintes et accumulent de l\'énergie. Quand elles ne peuvent plus résister, elles cassent au foyer, en profondeur, et une faille se forme : l\'énergie libérée est mesurée par la magnitude. Cette énergie se propage dans toutes les directions sous forme d\'ondes sismiques, qui atteignent la surface à l\'épicentre, à la verticale du foyer. C\'est là que l\'intensité est la plus forte ; elle diminue quand on s\'en éloigne.',
          criteres: [
            { id: 'cause', texte: 'La cause : les mouvements des plaques, des contraintes qui font accumuler de l\'énergie aux roches' },
            { id: 'rupture', texte: 'La rupture au foyer (hypocentre), qui forme une faille et libère l\'énergie' },
            { id: 'ondes', texte: 'Les ondes sismiques, qui arrivent à l\'épicentre, où l\'intensité est la plus forte, et s\'affaiblissent avec la distance' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 10,
    tirage: [
      { etape: 'v1-mots', nombre: 3 },
      { etape: 'v1-deux-volcans', nombre: 3 },
      { etape: 'v1-edification', nombre: 1 },
      { etape: 'v2-eruption', nombre: 3 },
      { etape: 'v3-mots', nombre: 3 },
      { etape: 'v3-intensite', nombre: 3 },
      { etape: 'v4-failles', nombre: 3 },
    ],
  },
};
