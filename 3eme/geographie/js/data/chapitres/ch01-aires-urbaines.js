// Chapitre 1 — « Les aires urbaines en France » : l'étude de cas de Lyon.
//
// D'après les pages du manuel d'Evan photographiées par Denis (chapitre 11 du
// manuel, « Les aires urbaines en France », étude de cas « Une aire urbaine :
// Lyon », p. 236 à 239) : A. comment se manifeste l'étalement urbain, B.
// quelles sont les mobilités quotidiennes des habitants. Les pages de cours du
// chapitre ne sont pas dans les photos : l'appli ne couvre que l'étude de cas.
//
// Le manuel ne définit que deux mots (aire urbaine, étalement urbain) ; les
// autres définitions sont celles du programme de 3e, en mots simples. Le reste
// de la fiche résume les documents en notes, sans recopier le manuel (le dépôt
// est public), et les chiffres sont ceux des documents : c'est sur eux que
// s'appuie un texte construit.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'ch01',
  matiere: 'Géographie',
  numero: 1,
  titre: 'Les aires urbaines : l\'exemple de Lyon',
  detail: 'Étude de cas · L\'étalement urbain · Les mobilités quotidiennes',

  // Ce que Merlin sait du chapitre quand il corrige un texte rédigé.
  profilMerlin: 'Élève de 3e. Géographie, chapitre « Les aires urbaines en France », étude de cas « Une aire urbaine : Lyon » '
    + '(documents du manuel). Vocabulaire : une aire urbaine est un espace formé d\'une ville-centre, de ses banlieues et d\'une '
    + 'couronne périurbaine ; l\'étalement urbain est l\'extension des banlieues et des espaces périurbains d\'une ville. Lyon : '
    + 'plus de 2,3 millions d\'habitants, deuxième aire urbaine de France ; cartes de 1975 (1,6 million), 1999 (1,9 million) et '
    + '2020 (2,3 millions, 507 communes, 6 019 km²) : la banlieue et surtout la couronne périurbaine s\'étendent, l\'aire urbaine '
    + 'déborde du Rhône sur l\'Ain, l\'Isère et la Loire. Ville-centre : quais du Rhône aménagés en espace de loisirs, Hôtel-Dieu '
    + 'rénové (2015-2019) en commerces et hôtel, la Presqu\'île cœur commercial, culturel et résidentiel. Anse, commune de '
    + 'banlieue : 3 100 habitants en 1975, 7 300 en 2020, attirés par le cadre de vie, la situation entre Lyon et '
    + 'Villefranche-sur-Saône, la gare TER et l\'autoroute A6 ; lotissements de maisons individuelles. Couronne périurbaine : '
    + 'peuplée depuis les années 1960-1970 grâce à l\'automobile (habiter loin du travail, logement plus grand, devenir '
    + 'propriétaire) ; près de 30 % des habitants de l\'aire urbaine, soit 630 000 personnes ; au-delà, paysages de campagne et '
    + 'communes souvent de moins de 2 000 habitants ; croissance de plus de 1 % par an (2007-2012). Mobilités : autoroutes, TER, '
    + 'TGV (gare Lyon-Saint-Exupéry) ; le plus de déplacements à l\'intérieur de l\'agglomération lyonnaise, et des flux entre le '
    + 'périurbain et le centre ; 68 % des déplacements en voiture, 22 % en transports en commun, 10 % en modes doux (marche, '
    + 'vélo) ; 3,6 déplacements par jour et par habitant, 62 minutes par jour ; embouteillages : 135 heures perdues en 2019 '
    + '(tunnel de Fourvière). Aménagements : pont Raymond Barre (2014) réservé à la marche, au vélo et au tramway, entre '
    + 'Confluence et Gerland ; e-Vélo\'v (2020), vélo électrique en libre-service, alternative à la voiture pour la qualité de '
    + 'l\'air.',

  seances: [
    { numero: 1, partie: 'Étude de cas, A', titre: 'Comment se manifeste l\'étalement urbain ?' },
    { numero: 2, partie: 'Étude de cas, B', titre: 'Quelles sont les mobilités quotidiennes ?' },
  ],

  etapes: [
    // ═══ Séance 1 — l'étalement urbain ═══════════════════════════════════

    {
      id: 'g1-mots',
      seance: 1,
      titre: 'Le vocabulaire',
      sousTitre: 'Les mots de l\'aire urbaine',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les mots à savoir définir',
          colonnes: ['Le mot', 'Sa définition'],
          lignes: [
            ['une **aire urbaine**', 'un espace formé d\'une **ville-centre**, de ses **banlieues** et d\'une **couronne périurbaine**'],
            ['l\'**étalement urbain**', 'l\'extension des **banlieues** et des **espaces périurbains** d\'une ville'],
            ['la **ville-centre**', 'la commune principale, au cœur de l\'aire urbaine'],
            ['une **banlieue**', 'les communes urbanisées qui entourent la ville-centre, sans interruption'],
            ['la **couronne périurbaine**', 'les communes plus loin, à l\'allure encore rurale, dont beaucoup d\'habitants travaillent en ville'],
            ['la **périurbanisation**', 'l\'installation de citadins dans les communes rurales autour des villes'],
            ['les **mobilités**', 'les déplacements des habitants, surtout entre leur domicile et leur travail'],
            ['les **modes doux**', 'les façons de se déplacer sans moteur : la marche, le vélo'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Du centre vers l\'extérieur : **ville-centre → banlieue → couronne périurbaine**. La banlieue touche la ville ; le périurbain, plus loin, a gardé un air de campagne.',
          ],
        },
      ],
      items: [
        {
          id: 'g-t-aire', type: 'terme', definition: 'Espace formé d\'une ville-centre, de ses banlieues et d\'une couronne périurbaine', attendu: 'aire urbaine',
          accepte: ['une aire urbaine'],
          pieges: [{ si: ['agglomération', 'ville'], message: 'Plus large : avec la couronne périurbaine, c\'est l\'aire urbaine.' }],
        },
        {
          id: 'g-t-etalement', type: 'terme', definition: 'Extension des banlieues et des espaces périurbains d\'une ville', attendu: 'étalement urbain',
          pieges: [{ si: ['périurbanisation'], resultat: 'presque', message: 'Proche, mais le mot du manuel pour cette définition est : étalement urbain.' }],
        },
        { id: 'g-t-centre', type: 'terme', definition: 'Commune principale, au cœur de l\'aire urbaine', attendu: 'ville-centre', accepte: ['ville centre'] },
        {
          id: 'g-t-banlieue', type: 'terme', definition: 'Communes urbanisées qui entourent la ville-centre, sans interruption', attendu: 'banlieue',
          accepte: ['banlieues', 'la banlieue'],
          pieges: [{ si: ['couronne périurbaine', 'périurbain'], message: 'Non : la couronne périurbaine est plus loin, avec un air de campagne. Celles qui touchent la ville forment la banlieue.' }],
        },
        {
          id: 'g-t-couronne', type: 'terme', definition: 'Communes plus éloignées, à l\'allure encore rurale, dont beaucoup d\'habitants travaillent en ville',
          attendu: 'couronne périurbaine', accepte: ['espace périurbain', 'périurbain', 'espaces périurbains'],
          pieges: [{ si: ['banlieue', 'banlieues'], message: 'Non : la banlieue touche la ville. Plus loin, à l\'allure rurale : la couronne périurbaine.' }],
        },
        { id: 'g-t-periurbanisation', type: 'terme', definition: 'Installation de citadins dans les communes rurales autour des villes', attendu: 'périurbanisation' },
        { id: 'g-t-mobilites', type: 'terme', definition: 'Les déplacements des habitants, surtout entre leur domicile et leur travail', attendu: 'mobilités', accepte: ['mobilité', 'les mobilités'] },
        { id: 'g-t-doux', type: 'terme', definition: 'Façons de se déplacer sans moteur : la marche, le vélo', attendu: 'modes doux', accepte: ['mobilités douces', 'modes de déplacement doux', 'déplacements doux'] },
      ],
    },

    {
      id: 'g1-etalement',
      seance: 1,
      titre: 'L\'étalement de l\'aire urbaine de Lyon',
      sousTitre: 'Docs 1 à 4 : les cartes, la ville-centre, Anse, le périurbain',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: 'Lyon, la deuxième aire urbaine de France',
          lignes: [
            'Plus de **2,3 millions d\'habitants** : la **2e aire urbaine** la plus peuplée de France, après Paris.',
            'Sa population grandit vite → l\'aire urbaine **s\'étale**, et ses habitants **se déplacent** beaucoup.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Doc. 1 — Trois cartes, trois dates',
          colonnes: ['Année', 'Habitants', 'Ce que montre la carte'],
          lignes: [
            ['**1975**', '1,6 million', 'une banlieue serrée autour de Lyon'],
            ['**1999**', '1,9 million', 'la banlieue et la couronne périurbaine s\'élargissent'],
            ['**2020**', '2,3 millions', '**507 communes**, **6 019 km²** : la couronne périurbaine s\'étend loin, dans l\'Ain, l\'Isère, la Loire'],
          ],
        },
        {
          type: 'regle',
          titre: 'Doc. 2 — Dans la ville-centre',
          lignes: [
            'Loisirs, commerces, culture, logements : les **quais du Rhône** aménagés pour les loisirs ; l\'**Hôtel-Dieu**, un ancien hôpital rénové de 2015 à 2019 en commerces et en hôtel de luxe.',
            'La **Presqu\'île** : le cœur commercial, culturel et résidentiel de Lyon.',
          ],
        },
        {
          type: 'regle',
          titre: 'Doc. 3 — Anse, une commune de banlieue qui grandit',
          lignes: [
            '**3 100 habitants en 1975 → 7 300 en 2020** : plus du double.',
            'Pourquoi ? Son **cadre de vie**, sa place entre **Lyon et Villefranche-sur-Saône**, ses **transports** (gare TER, autoroute A6).',
            'Sur la photo : des **lotissements** de maisons individuelles, des routes et un rond-point, des champs tout autour.',
          ],
        },
        {
          type: 'regle',
          titre: 'Doc. 4 — Une couronne périurbaine attractive',
          lignes: [
            'Depuis les années **1960-1970**, grâce à la **voiture**, des familles habitent **plus loin de leur travail** : un logement **plus grand**, et souvent **propriétaires**.',
            'Près de **30 %** des habitants de l\'aire urbaine vivent dans le périurbain : **630 000** personnes.',
            'Plus loin encore : des paysages de **campagne**, des communes souvent de **moins de 2 000 habitants**.',
            'La périurbanisation **continue** : plus de **1 % de croissance par an** (2007-2012).',
          ],
        },
      ],
      items: [
        {
          id: 'g-rang', type: 'choix', consigne: BLOC, phrase: 'Quelle est la place de l\'aire urbaine de Lyon en France, par sa population ?',
          options: ['La deuxième', 'La première', 'La dixième'], attendu: 'La deuxième',
          explication: 'La deuxième, avec plus de 2,3 millions d\'habitants, après Paris.',
        },
        {
          id: 'g-espaces', type: 'choix', consigne: BLOC, phrase: 'Quels sont les trois espaces de l\'aire urbaine de Lyon (doc. 1) ?',
          options: ['La ville-centre, la banlieue et la couronne périurbaine', 'La ville-centre, la campagne et la montagne', 'Le centre, les quartiers et les zones industrielles'],
          attendu: 'La ville-centre, la banlieue et la couronne périurbaine',
          explication: 'Ville-centre, banlieue, couronne périurbaine : du centre vers l\'extérieur.',
        },
        {
          id: 'g-evolution', type: 'choix', consigne: BLOC, phrase: 'Comment la population de l\'aire urbaine a-t-elle évolué de 1975 à 2020 (doc. 1) ?',
          options: ['De 1,6 à 2,3 millions d\'habitants', 'De 2,3 à 1,6 millions d\'habitants', 'Elle est restée à 1,9 million'],
          attendu: 'De 1,6 à 2,3 millions d\'habitants',
          explication: '1,6 million en 1975, 1,9 en 1999, 2,3 en 2020.',
        },
        {
          id: 'g-pourquoi-etalement', type: 'choix', consigne: BLOC, phrase: 'Pourquoi peut-on parler d\'étalement urbain depuis 1975 ?',
          options: ['La banlieue et la couronne périurbaine s\'étendent de plus en plus loin de Lyon', 'La ville-centre construit des tours plus hautes', 'Les habitants quittent l\'aire urbaine'],
          attendu: 'La banlieue et la couronne périurbaine s\'étendent de plus en plus loin de Lyon',
          explication: 'Sur les cartes, les espaces urbanisés et la limite de l\'aire urbaine s\'éloignent de Lyon.',
        },
        {
          id: 'g-plus-grandi', type: 'choix', consigne: BLOC, phrase: 'Quel espace a le plus grandi entre 1975 et 2020 ?',
          options: ['La couronne périurbaine', 'La ville-centre', 'Aucun : l\'aire urbaine n\'a pas changé'], attendu: 'La couronne périurbaine',
          explication: 'La couronne périurbaine, en jaune sur les cartes, s\'étend le plus.',
        },
        {
          id: 'g-communes', type: 'choix', consigne: BLOC, phrase: 'En 2020, combien de communes compte l\'aire urbaine de Lyon ?',
          options: ['507', '50', '5 000'], attendu: '507',
          explication: '507 communes, sur 6 019 km².',
        },
        {
          id: 'g-centre', type: 'choix', consigne: BLOC, phrase: 'Quelles activités trouve-t-on dans la ville-centre (doc. 2) ?',
          options: ['Des commerces, des lieux de culture et de loisirs, des logements', 'Surtout des champs et des fermes', 'Surtout des usines et des entrepôts'],
          attendu: 'Des commerces, des lieux de culture et de loisirs, des logements',
          explication: 'Les quais pour les loisirs, l\'Hôtel-Dieu pour les commerces, la Presqu\'île cœur commercial, culturel et résidentiel.',
        },
        {
          id: 'g-anse', type: 'choix', consigne: BLOC, phrase: 'Comment la population d\'Anse a-t-elle évolué de 1975 à 2020 (doc. 3) ?',
          options: ['Elle a plus que doublé : de 3 100 à 7 300 habitants', 'Elle a baissé de moitié', 'Elle n\'a pas changé'],
          attendu: 'Elle a plus que doublé : de 3 100 à 7 300 habitants',
          explication: 'De 3 100 à 7 300 habitants : plus du double.',
        },
        {
          id: 'g-anse-pourquoi', type: 'choix', consigne: BLOC, phrase: 'Pourquoi Anse attire-t-elle des habitants ?',
          options: ['Son cadre de vie, sa place entre Lyon et Villefranche, sa gare TER et l\'autoroute A6', 'Son métro et ses grandes tours de bureaux', 'Ses usines qui embauchent beaucoup'],
          attendu: 'Son cadre de vie, sa place entre Lyon et Villefranche, sa gare TER et l\'autoroute A6',
          explication: 'Le cadre de vie, la situation et les transports.',
        },
        {
          id: 'g-voiture-1960', type: 'choix', consigne: BLOC, phrase: 'Qu\'est-ce qui a permis aux communes périurbaines de se peupler à partir des années 1960-1970 (doc. 4) ?',
          options: ['La diffusion de l\'automobile', 'L\'arrivée du TGV', 'La construction du métro'], attendu: 'La diffusion de l\'automobile',
          explication: 'La voiture permet d\'habiter loin de son travail.',
        },
        {
          id: 'g-gain', type: 'choix', consigne: BLOC, phrase: 'Qu\'ont gagné les familles parties vivre dans le périurbain ?',
          options: ['Un logement plus grand, et souvent d\'être propriétaires', 'Un trajet plus court jusqu\'à leur travail', 'Des commerces au pied de chez elles'],
          attendu: 'Un logement plus grand, et souvent d\'être propriétaires',
          explication: 'Plus d\'espace, et la propriété — au prix de trajets plus longs.',
        },
        {
          id: 'g-30', type: 'reponse', question: 'Quelle part des habitants de l\'aire urbaine vit dans le périurbain (doc. 4) ?', attendu: '30 %',
          accepte: ['30%', '30', 'près de 30 %', 'près de 30%', 'environ 30 %', 'presque 30 %', '30 pour cent'],
          explication: 'Près de 30 %, soit 630 000 personnes.',
        },
        {
          id: 'g-departements', type: 'choix', consigne: BLOC, phrase: 'En plus du Rhône, sur quels départements l\'aire urbaine s\'étend-elle ?',
          options: ['L\'Ain, l\'Isère et la Loire', 'Paris et la Gironde', 'Aucun : elle reste dans le Rhône'], attendu: 'L\'Ain, l\'Isère et la Loire',
          explication: 'L\'aire urbaine déborde sur l\'Ain, l\'Isère et la Loire.',
        },
      ],
    },

    {
      id: 'g1-ecrire-etalement',
      seance: 1,
      titre: 'Rédiger : l\'étalement urbain',
      sousTitre: 'Un texte construit, comme au contrôle',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Un texte construit en trois temps',
          lignes: [
            '**D\'abord**, les trois espaces de l\'aire urbaine : la ville-centre, la banlieue, la couronne périurbaine.',
            '**Ensuite**, l\'étalement : 1,6 million d\'habitants en 1975, 2,3 millions en 2020 ; la banlieue et surtout le périurbain s\'étendent (Anse : 3 100 → 7 300 habitants).',
            '**Enfin**, les raisons : la voiture depuis les années 1960-1970, un logement plus grand, la propriété, le cadre de vie et les transports.',
            'Mots utiles : *d\'abord, ensuite, enfin, car, c\'est pourquoi, par exemple.*',
          ],
        },
      ],
      items: [
        {
          id: 'g-w-etalement', type: 'decrire', sujet: 'Comment se manifeste l\'étalement urbain dans l\'aire urbaine de Lyon ?', emoji: '🏘️',
          indices: ['ville-centre', 'banlieue', 'couronne périurbaine', '1975', '2,3 millions', 'Anse', 'automobile', 'logement plus grand'],
          consigne: 'Rédige un texte de quelques lignes : les trois espaces de l\'aire urbaine, comment elle s\'étale, et pourquoi.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'L\'aire urbaine de Lyon, la deuxième de France, est formée de trois espaces : la ville-centre, Lyon, avec ses commerces et ses lieux de culture ; la banlieue qui l\'entoure ; et la couronne périurbaine, plus loin, à l\'allure encore rurale. Depuis 1975, elle s\'étale : elle est passée de 1,6 à 2,3 millions d\'habitants, et la banlieue et surtout le périurbain s\'étendent de plus en plus loin, jusque dans l\'Ain et l\'Isère. Par exemple, Anse est passée de 3 100 à 7 300 habitants. Cet étalement s\'explique par la voiture, qui permet depuis les années 1960-1970 d\'habiter loin de son travail, dans un logement plus grand dont on peut devenir propriétaire, et par le cadre de vie et les transports de ces communes.',
          criteres: [
            { id: 'espaces', texte: 'Les trois espaces : ville-centre, banlieue, couronne périurbaine' },
            { id: 'etalement', texte: 'L\'étalement, avec un exemple chiffré : la population (1,6 → 2,3 millions) ou Anse (3 100 → 7 300), l\'aire qui s\'étend' },
            { id: 'raisons', texte: 'Les raisons : la voiture (depuis 1960-1970), un logement plus grand ou la propriété, le cadre de vie ou les transports' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — les mobilités quotidiennes ════════════════════════════

    {
      id: 'g2-mobilites',
      seance: 2,
      titre: 'Les mobilités dans l\'aire urbaine',
      sousTitre: 'Docs 1 à 6 : transports, déplacements, voiture, modes doux',
      duree: 6,
      fiche: [
        {
          type: 'regle',
          titre: 'Doc. 1 — Les espaces et les transports',
          lignes: [
            'Des **autoroutes** (A6, A7, A42, A43…), des lignes **TER** et **TGV** (gare TGV Lyon-Aéroport Saint-Exupéry) relient Lyon au reste de l\'aire urbaine.',
            'Les **grosses flèches** de la légende : l\'**étalement urbain**, qui continue vers l\'extérieur. Les **transports en commun** desservent surtout la ville-centre et la banlieue.',
          ],
        },
        {
          type: 'regle',
          titre: 'Doc. 2 — Les déplacements de chaque jour',
          lignes: [
            'Le plus de déplacements : **à l\'intérieur de l\'agglomération lyonnaise** (plus de 4 millions par jour).',
            'D\'autres flux relient chaque secteur du **périurbain** (Beaujolais, Ain, Ouest Rhône, Vienne, Nord-Dauphiné…) au **centre**, et les secteurs entre eux.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Docs 3 et 4 — La voiture domine',
          colonnes: ['Mode de déplacement', 'Part des déplacements'],
          lignes: [
            ['🚗 la **voiture**', '**68 %**'],
            ['🚆 les **transports en commun**', '**22 %**'],
            ['🚲 les **modes doux** (marche, vélo)', '**10 %**'],
          ],
        },
        {
          type: 'regle',
          titre: 'Ce que cela coûte aux habitants',
          lignes: [
            '**3,6 déplacements** par habitant et par jour ; **62 minutes** par jour à se déplacer.',
            'Les **embouteillages** : 135 heures perdues en 2019 par les conducteurs lyonnais (ici, à l\'entrée du tunnel de Fourvière).',
          ],
        },
        {
          type: 'regle',
          titre: 'Docs 5 et 6 — Aménager pour d\'autres mobilités',
          lignes: [
            'Le **pont Raymond Barre** (2014), réservé à la **marche**, au **vélo** et au **tramway**, entre le quartier de Confluence et Gerland.',
            'Le **e-Vélo\'v** (2020) : un **vélo à assistance électrique** en libre-service, une **alternative à la voiture** pour la **qualité de l\'air**.',
          ],
        },
      ],
      items: [
        {
          id: 'g-voiture-part', type: 'choix', consigne: BLOC, phrase: 'Quelle part des déplacements se fait en voiture (doc. 4) ?',
          options: ['68 %', '22 %', '10 %'], attendu: '68 %',
          explication: '68 % en voiture, 22 % en transports en commun, 10 % en modes doux.',
        },
        {
          id: 'g-tc-part', type: 'choix', consigne: BLOC, phrase: 'Quelle part des déplacements se fait en transports en commun ?',
          options: ['22 %', '68 %', '10 %'], attendu: '22 %',
          explication: '22 % en transports en commun.',
        },
        {
          id: 'g-doux', type: 'reponse', question: 'Comment appelle-t-on la marche et le vélo, comme façons de se déplacer ?', attendu: 'modes doux',
          accepte: ['mobilités douces', 'modes de déplacement doux', 'déplacements doux', 'modes de transport doux'],
          explication: 'Les modes doux : 10 % des déplacements.',
        },
        {
          id: 'g-bouchons', type: 'choix', consigne: BLOC, phrase: 'Quel problème la place de la voiture pose-t-elle (doc. 3) ?',
          options: ['Les embouteillages : 135 heures perdues en 2019', 'Le manque de routes', 'Le prix des transports en commun'],
          attendu: 'Les embouteillages : 135 heures perdues en 2019',
          explication: 'Les embouteillages — et la pollution de l\'air, dont parle le doc. 6.',
        },
        {
          id: 'g-temps', type: 'choix', consigne: BLOC, phrase: 'Combien de temps un habitant passe-t-il chaque jour à se déplacer ?',
          options: ['62 minutes', '6 minutes', '6 heures'], attendu: '62 minutes',
          explication: '62 minutes par jour, pour 3,6 déplacements.',
        },
        {
          id: 'g-nombre', type: 'choix', consigne: BLOC, phrase: 'Combien de déplacements un habitant fait-il par jour, en moyenne ?',
          options: ['3,6', '36', '0,6'], attendu: '3,6',
          explication: '3,6 déplacements par jour et par habitant.',
        },
        {
          id: 'g-flux', type: 'choix', consigne: 'D\'après la carte des mobilités (doc. 2) :', phrase: 'Où se font le plus de déplacements ?',
          options: ['À l\'intérieur de l\'agglomération lyonnaise', 'Entre le Beaujolais et l\'Isère', 'Entre Lyon et Paris'],
          attendu: 'À l\'intérieur de l\'agglomération lyonnaise',
          explication: 'Plus de 4 millions de déplacements par jour dans l\'agglomération lyonnaise.',
        },
        {
          id: 'g-flux-peri', type: 'choix', consigne: 'D\'après la carte des mobilités (doc. 2) :', phrase: 'Que montrent les flèches entre les secteurs du périurbain et l\'agglomération ?',
          options: ['Des déplacements quotidiens entre le périurbain et le centre', 'Des déménagements vers l\'étranger', 'Les trajets des touristes en été'],
          attendu: 'Des déplacements quotidiens entre le périurbain et le centre',
          explication: 'Chaque jour, des habitants du périurbain vont dans l\'agglomération (travail, études, achats).',
        },
        {
          id: 'g-legende', type: 'choix', consigne: 'D\'après la légende de la carte 1 :', phrase: 'Que représentent les grosses flèches vers l\'extérieur de l\'aire urbaine ?',
          options: ['L\'étalement urbain', 'Les autoroutes', 'Les lignes TGV'], attendu: 'L\'étalement urbain',
          explication: 'Les grosses flèches : l\'étalement urbain. Les traits rouges fins : les autoroutes.',
        },
        {
          id: 'g-axes', type: 'choix', consigne: BLOC, phrase: 'Quels axes de transport relient l\'aire urbaine (doc. 1) ?',
          options: ['Des autoroutes, des lignes TER et TGV', 'Seulement des pistes cyclables', 'Des canaux et des fleuves'], attendu: 'Des autoroutes, des lignes TER et TGV',
          explication: 'Autoroutes, TER et TGV, avec la gare TGV de Lyon-Saint-Exupéry.',
        },
        {
          id: 'g-pont', type: 'choix', consigne: BLOC, phrase: 'Le pont Raymond Barre (2014) est réservé…',
          options: ['à la marche, au vélo et au tramway', 'aux voitures et aux camions', 'aux trains de marchandises'], attendu: 'à la marche, au vélo et au tramway',
          explication: 'Aux modes doux et au tramway.',
        },
        {
          id: 'g-velov', type: 'choix', consigne: BLOC, phrase: 'Pourquoi Lyon a-t-elle lancé le e-Vélo\'v (doc. 6) ?',
          options: ['Pour offrir une alternative à la voiture et améliorer la qualité de l\'air', 'Pour remplacer le métro', 'Pour les touristes seulement'],
          attendu: 'Pour offrir une alternative à la voiture et améliorer la qualité de l\'air',
          explication: 'Une alternative à la voiture, pour la qualité de l\'air.',
        },
        {
          id: 'g-amenagements', type: 'choix', consigne: BLOC, phrase: 'Quels aménagements favorisent d\'autres mobilités que la voiture ?',
          options: ['Des ponts réservés aux modes doux, le tramway, des vélos en libre-service', 'De nouvelles autoroutes en plein centre', 'Des parkings gratuits partout'],
          attendu: 'Des ponts réservés aux modes doux, le tramway, des vélos en libre-service',
          explication: 'Le pont Raymond Barre, le tramway, le e-Vélo\'v.',
        },
      ],
    },

    {
      id: 'g2-enchainement',
      seance: 2,
      titre: 'Tout s\'enchaîne',
      sousTitre: 'De la voiture à l\'étalement, et de l\'étalement aux mobilités',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Le fil de l\'étude de cas',
          lignes: [
            'La **voiture** se diffuse → des familles s\'installent **plus loin** → le **périurbain** grandit (l\'**étalement urbain**) → les **trajets** quotidiens vers le centre s\'allongent et se multiplient → **embouteillages** et pollution → la ville **aménage** d\'autres mobilités (tramway, vélo, transports en commun).',
          ],
        },
      ],
      items: [
        {
          id: 'g-chaine', type: 'ordre', consigne: 'Remets dans l\'ordre l\'enchaînement de l\'étude de cas :',
          elements: [
            'La voiture se diffuse dans les années 1960-1970.',
            'Des familles s\'installent loin du centre, dans un logement plus grand.',
            'La banlieue et la couronne périurbaine s\'étendent : c\'est l\'étalement urbain.',
            'Les habitants font chaque jour de longs trajets, surtout en voiture.',
            'Embouteillages et pollution : la ville aménage d\'autres mobilités.',
          ],
        },
        {
          id: 'g-cause', type: 'choix', consigne: BLOC, phrase: 'Pourquoi les habitants du périurbain utilisent-ils autant la voiture ?',
          options: ['Ils habitent loin de leur travail, là où les transports en commun desservent peu', 'Ils n\'aiment pas le vélo', 'Les transports en commun sont interdits dans le périurbain'],
          attendu: 'Ils habitent loin de leur travail, là où les transports en commun desservent peu',
          explication: 'Les transports en commun desservent surtout la ville-centre et la banlieue (doc. 1).',
        },
        {
          id: 'g-consequence', type: 'choix', consigne: BLOC, phrase: 'Quelle est une conséquence de l\'étalement urbain ?',
          options: ['Des trajets quotidiens plus longs et plus nombreux', 'Moins de voitures sur les routes', 'Une population qui baisse'],
          attendu: 'Des trajets quotidiens plus longs et plus nombreux',
          explication: 'Plus on habite loin, plus on se déplace : 62 minutes par jour.',
        },
      ],
    },

    {
      id: 'g2-ecrire-mobilites',
      seance: 2,
      titre: 'Rédiger : les mobilités',
      sousTitre: 'Un texte construit, comme au contrôle',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Les mobilités en trois temps',
          lignes: [
            '**Les déplacements** : nombreux chaque jour (3,6 par habitant), surtout dans l\'agglomération, et entre le périurbain et le centre.',
            '**Les modes de transport** : la voiture domine (68 %), d\'où les embouteillages ; puis les transports en commun (22 %) et les modes doux (10 %).',
            '**Les aménagements** : le pont Raymond Barre, le tramway, le e-Vélo\'v, pour d\'autres mobilités et un air plus pur.',
            'Mots utiles : *d\'abord, ensuite, enfin, car, c\'est pourquoi, par exemple.*',
          ],
        },
      ],
      items: [
        {
          id: 'g-w-mobilites', type: 'decrire', sujet: 'Les mobilités dans l\'aire urbaine lyonnaise', emoji: '🚲',
          indices: ['déplacements quotidiens', 'agglomération', 'périurbain', 'voiture 68 %', 'embouteillages', 'transports en commun', 'modes doux', 'pont Raymond Barre', 'e-Vélo\'v'],
          consigne: 'Rédige un texte de quelques lignes sur les mobilités dans l\'aire urbaine de Lyon : les déplacements, les modes de transport, les aménagements.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Chaque jour, les habitants de l\'aire urbaine de Lyon se déplacent beaucoup : 3,6 fois par jour en moyenne, surtout à l\'intérieur de l\'agglomération, mais aussi entre les communes périurbaines et le centre, où beaucoup travaillent. La voiture est le premier moyen de transport, avec 68 % des déplacements, ce qui provoque des embouteillages : les conducteurs lyonnais ont perdu 135 heures dans les bouchons en 2019. Les transports en commun (22 %) et les modes doux, la marche et le vélo (10 %), comptent moins. C\'est pourquoi la ville aménage d\'autres mobilités, comme le pont Raymond Barre réservé aux piétons, aux vélos et au tramway, ou les vélos électriques e-Vélo\'v, pour réduire la place de la voiture et améliorer la qualité de l\'air.',
          criteres: [
            { id: 'deplacements', texte: 'Les déplacements : nombreux chaque jour, dans l\'agglomération et entre le périurbain et le centre' },
            { id: 'voiture', texte: 'La voiture domine (68 %), avec un problème : les embouteillages (ou la pollution)' },
            { id: 'alternatives', texte: 'Les autres modes (transports en commun, modes doux) et un aménagement précis : le pont Raymond Barre, le tramway ou le e-Vélo\'v' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 10,
    tirage: [
      { etape: 'g1-mots', nombre: 4 },
      { etape: 'g1-etalement', nombre: 6 },
      { etape: 'g2-mobilites', nombre: 6 },
      { etape: 'g2-enchainement', nombre: 2 },
    ],
  },
};
