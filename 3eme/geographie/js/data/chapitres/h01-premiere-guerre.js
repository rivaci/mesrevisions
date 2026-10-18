// Histoire, chapitre 1 — La Première Guerre mondiale (1914-1918).
//
// D'après le cours d'Evan photographié par Denis : I. une guerre d'une
// violence inédite (les causes, la guerre de mouvement, la guerre de position,
// 1917), II. une guerre totale (la mobilisation des hommes, des économies et
// des civils, l'étude de cas n° 2 sur le génocide des Arméniens), III. de
// lourdes conséquences ; et ses deux frises chronologiques. La fiche résume le
// cours en notes, sans le recopier (le dépôt est public).
//
// Là où le cours s'écarte des manuels, on suit le cours, sans en faire une
// question :
// - le cours dit que von Moltke « met au point » le plan Schlieffen ; le plan
//   est de Schlieffen (avant 1906), Moltke l'a appliqué. La fiche dit
//   « appliqué par von Moltke » et aucune question ne porte sur son auteur ;
// - la bataille de la Marne, « du 5 au 11 septembre » dans le cours (on lit
//   souvent jusqu'au 12) : les questions ne demandent que septembre 1914 ;
// - la Belgique envahie « le 3 août » (le 4 en général) : la fiche dit
//   « début août » ;
// - Verdun : la fin au 15 décembre 1916 est juste (on lit aussi le 18) ; la
//   contre-offensive française « à partir de juillet » l'est moins :
//   l'offensive allemande s'arrête en juillet, l'initiative passe aux
//   Français fin août-septembre, Douaumont est repris le 24 octobre. La
//   fiche dit « à partir de l'été » ;
// - Citroën cité parmi les usines civiles reconverties : l'usine du quai de
//   Javel est construite en 1915 pour les obus, la fiche le dit ainsi ;
// - la loi de 1919 « oblige » les communes à élever un monument aux morts :
//   elle les y encourage et les subventionne ; la fiche dit qu'elle le leur
//   « demande » ;
// - la chanson de Craonne est citée, pas ses paroles.
//
// Relu par un agent indépendant avant publication.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'h01',
  matiere: 'Histoire',
  numero: 1,
  titre: 'La Première Guerre mondiale (1914-1918)',
  detail: 'Une violence inédite · Une guerre totale · De lourdes conséquences',

  profilMerlin: 'Élève de 3e. Histoire, chapitre « La Première Guerre mondiale (1914-1918) », d\'après son cours. '
    + 'I. Une guerre d\'une violence inédite. Causes : deux alliances défensives, la Triple Alliance (Allemagne, Autriche-Hongrie, '
    + 'Italie, neutre en 1914, qui rejoint l\'Entente en 1915) et la Triple Entente (France, Russie, Royaume-Uni) ; l\'Empire '
    + 'ottoman et la Bulgarie avec les Empires centraux ; l\'impérialisme (crises marocaines de 1905 et 1911) ; le nationalisme '
    + '(la France veut l\'Alsace-Lorraine perdue en 1871). Attentat de Sarajevo le 28 juin 1914 (l\'archiduc François-Ferdinand, '
    + 'tué par un nationaliste serbe de Bosnie), puis l\'engrenage des alliances : l\'Autriche-Hongrie déclare la guerre à la Serbie '
    + '(28 juillet), la Russie mobilise (30 juillet), l\'Allemagne déclare la guerre à la Russie (1er août) puis à la France '
    + '(3 août), le Royaume-Uni à l\'Allemagne (4 août). Soldats partis « la fleur au fusil ». 1914, guerre de mouvement : plan '
    + 'Schlieffen (vaincre la France en passant par la Belgique neutre, puis la Russie), Allemands à 40 km de Paris, gouvernement à '
    + 'Bordeaux, bataille de la Marne (5-11 septembre, Joffre, Gallieni et les 630 taxis), course à la mer, Tannenberg ; en novembre, '
    + 'front stabilisé sur 700 km, tranchées. 1915-1917, guerre de position : Verdun (21 février - 15 décembre 1916, « saigner à '
    + 'blanc » l\'armée française, Voie sacrée, environ 700 000 victimes, défaite allemande, symbole de l\'héroïsme français) ; la '
    + 'Somme (1er juillet - 18 novembre 1916, offensive alliée pour soulager Verdun, environ 1 million de victimes). 1917 : échec du '
    + 'Chemin des Dames (16 avril), mutineries, quelques fusillés pour l\'exemple, Pétain améliore le quotidien ; entrée en guerre des '
    + 'États-Unis (6 avril) ; deux révolutions russes (le tsar renversé en février, Lénine et les bolcheviks au pouvoir en '
    + 'octobre), armistice germano-russe (décembre). II. Une guerre '
    + 'totale : conscription, mobilisation générale du 2 août 1914 (plus de 3 millions d\'hommes de 20 à 48 ans) ; reconversion '
    + 'industrielle (Renault passe des voitures aux obus, chars et moteurs ; Citroën ouvre une usine d\'obus en 1915 ; femmes, '
    + 'jeunes, 180 000 immigrés) ; effort de guerre, l\'État '
    + 'intervient (impôts, emprunts, affiches « Pour la France, versez votre or ») ; les femmes remplacent les hommes '
    + '(munitionnettes, agriculture, infirmières, marraines de guerre), sans toujours obtenir le droit de vote ; propagande '
    + '(« bourrage de crâne », valoriser son camp et diaboliser l\'autre, Le Canard enchaîné en 1915) et censure des lettres ; '
    + 'civils occupés (travail forcé, violences), bombardements ; abdication de Guillaume II le 9 novembre 1918 ; génocide des '
    + 'Arméniens (1915-1916, ordre de Talaat Pacha, fusillades, déportations vers le désert syrien, 1,2 million de morts, les deux '
    + 'tiers des Arméniens de Turquie). III. De lourdes conséquences : 70 millions de mobilisés, 10 millions de morts, 21 millions '
    + 'de blessés dont 6 millions de mutilés (« gueules cassées »), 3 millions de veuves, 6 millions d\'orphelins ; grippe '
    + 'espagnole ; « génération du feu », pacifisme, « la der des ders », monuments aux morts (loi de 1919) ; armistice du 11 '
    + 'novembre 1918 ; conférence de la paix à Paris, traité de Versailles (28 juin 1919) : l\'Allemagne responsable, réparations, '
    + 'perte des colonies et de l\'Alsace-Moselle, armée de 100 000 hommes, « Diktat » ; démembrement de l\'Autriche-Hongrie et de '
    + 'l\'Empire ottoman ; la SDN à Genève (1920), sans les États-Unis. Une guerre totale mobilise toutes les forces d\'un pays : '
    + 'les soldats, l\'économie et les civils.',

  seances: [
    { numero: 1, partie: 'I. A et B.1', titre: 'Les causes, et la guerre de mouvement (1914)' },
    { numero: 2, partie: 'I. B.2', titre: 'La guerre de position (1915-1917)' },
    { numero: 3, partie: 'II', titre: 'Une guerre totale' },
    { numero: 4, partie: 'III', titre: 'De lourdes conséquences, et la frise' },
  ],

  etapes: [
    // ═══ Séance 1 — les causes, et 1914 ══════════════════════════════════

    {
      id: 'h1-causes',
      seance: 1,
      titre: 'Les causes de la guerre',
      sousTitre: 'Les alliances, l\'impérialisme, le nationalisme',
      duree: 5,
      fiche: [
        {
          type: 'tableau',
          titre: 'Deux grandes alliances',
          colonnes: ['Alliance', 'Pays', 'À retenir'],
          lignes: [
            ['la **Triple Alliance** (ou Triplice)', 'l\'**Allemagne**, l\'**Autriche-Hongrie**, l\'**Italie**', 'une alliance **défensive** : si l\'un est attaqué, les autres l\'aident'],
            ['la **Triple Entente**', 'la **France**, la **Russie**, le **Royaume-Uni**', 'défensive elle aussi'],
          ],
        },
        {
          type: 'regle',
          titre: 'Les camps bougent',
          lignes: [
            'L\'**Italie** reste **neutre** en 1914, puis rejoint l\'**Entente** en **1915** : on lui promet des territoires (les « terres irrédentes » : Trentin, Istrie, Dalmatie).',
            'L\'**Empire ottoman** et la **Bulgarie** combattent avec l\'Allemagne et l\'Autriche-Hongrie : ce sont les **Empires centraux**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Ce qui fait monter les tensions',
          colonnes: ['Cause', 'Ce que c\'est', 'Exemple'],
          lignes: [
            ['l\'**impérialisme**', 'les puissances veulent **agrandir leurs empires coloniaux** et leur puissance', 'le **Royaume-Uni** et la **France**, premières puissances coloniales ; les **crises marocaines** de **1905** et **1911** : la France impose son protectorat au Maroc (1912), l\'Allemagne obtient une partie du Congo'],
            ['le **nationalisme**', 'il renforce les tensions entre les **peuples** et les **États**', 'la France veut reprendre l\'**Alsace-Lorraine**, perdue face à la Prusse en **1871** ; l\'Allemagne veut réunir les peuples de langue allemande ; l\'Empire ottoman, humilié dans les **Balkans**, veut sa revanche'],
          ],
        },
      ],
      items: [
        {
          id: 'h-t-entente', type: 'terme', definition: 'L\'alliance de la France, de la Russie et du Royaume-Uni', attendu: 'Triple Entente',
          accepte: ['la Triple Entente', 'Entente', 'l\'Entente'],
          pieges: [{ si: ['Triple Alliance', 'Triplice'], message: 'Non : la Triple Alliance, c\'est l\'Allemagne, l\'Autriche-Hongrie et l\'Italie. La France est dans la Triple Entente.' }],
        },
        {
          id: 'h-t-alliance', type: 'terme', definition: 'L\'alliance de l\'Allemagne, de l\'Autriche-Hongrie et de l\'Italie avant la guerre', attendu: 'Triple Alliance',
          accepte: ['la Triple Alliance', 'Triplice', 'la Triplice'],
          pieges: [{ si: ['Triple Entente', 'Entente'], message: 'Non : la Triple Entente, c\'est la France, la Russie et le Royaume-Uni. L\'Allemagne est dans la Triple Alliance.' }],
        },
        {
          id: 'h-t-centraux', type: 'terme', definition: 'Le nom donné à l\'Allemagne et à l\'Autriche-Hongrie, rejointes par l\'Empire ottoman et la Bulgarie', attendu: 'Empires centraux',
          accepte: ['les Empires centraux', 'puissances centrales', 'les puissances centrales'],
          pieges: [{ si: ['Triple Alliance', 'Triplice'], message: 'Non : la Triple Alliance, c\'était avant la guerre, avec l\'Italie — qui change de camp. Pendant la guerre, l\'Allemagne et ses alliés sont les Empires centraux.' }],
        },
        {
          id: 'h-t-imperialisme', type: 'terme', definition: 'La volonté des puissances d\'agrandir leur empire colonial et leur puissance', attendu: 'impérialisme', accepte: ['l\'impérialisme'],
          pieges: [
            { si: ['nationalisme'], message: 'Non : le nationalisme oppose les peuples et les nations. Agrandir son empire colonial : l\'impérialisme.' },
            { si: ['colonialisme'], resultat: 'presque', message: 'Proche, mais le mot du cours est : l\'impérialisme.' },
          ],
        },
        {
          id: 'h-t-nationalisme', type: 'terme', definition: 'Le sentiment qui exalte sa nation et renforce les tensions entre les peuples', attendu: 'nationalisme', accepte: ['le nationalisme'],
          pieges: [
            { si: ['impérialisme'], message: 'Non : l\'impérialisme, ce sont les conquêtes coloniales. Exalter sa nation : le nationalisme.' },
            { si: ['patriotisme'], resultat: 'presque', message: 'Proche, mais le patriotisme, c\'est l\'amour de son pays ; le nationalisme l\'exalte contre les autres. Le mot du cours : le nationalisme.' },
          ],
        },
        {
          id: 'h-italie', type: 'choix', consigne: BLOC, phrase: 'Que fait l\'Italie en 1914, puis en 1915 ?',
          options: ['Neutre en 1914, elle rejoint l\'Entente en 1915', 'Elle combat avec l\'Allemagne dès 1914', 'Elle reste neutre toute la guerre'],
          attendu: 'Neutre en 1914, elle rejoint l\'Entente en 1915',
          explication: 'On lui promet des territoires : les terres irrédentes (Trentin, Istrie, Dalmatie).',
        },
        {
          id: 'h-ottoman', type: 'choix', consigne: BLOC, phrase: 'Avec qui l\'Empire ottoman combat-il ?',
          options: ['Avec l\'Allemagne et l\'Autriche-Hongrie', 'Avec la France et le Royaume-Uni', 'Il reste neutre'],
          attendu: 'Avec l\'Allemagne et l\'Autriche-Hongrie',
          explication: 'Avec la Bulgarie, il rejoint les Empires centraux.',
        },
        {
          id: 'h-alsace', type: 'choix', consigne: BLOC, phrase: 'Quel territoire la France veut-elle récupérer ?',
          options: ['L\'Alsace-Lorraine', 'Le Maroc', 'La Belgique'], attendu: 'L\'Alsace-Lorraine',
          explication: 'Perdue face à la Prusse en 1871 : c\'est le nationalisme français.',
        },
        {
          id: 'h-maroc', type: 'choix', consigne: BLOC, phrase: 'Quelles crises opposent la France et l\'Allemagne en 1905 et en 1911 ?',
          options: ['Les crises marocaines', 'Les crises des Balkans', 'Les crises d\'Alsace'], attendu: 'Les crises marocaines',
          explication: 'Des rivalités coloniales : c\'est l\'impérialisme. La France impose son protectorat au Maroc en 1912.',
        },
        {
          id: 'h-coloniales', type: 'choix', consigne: BLOC, phrase: 'Quelles sont les deux premières puissances coloniales ?',
          options: ['Le Royaume-Uni et la France', 'L\'Allemagne et l\'Italie', 'La Russie et l\'Autriche-Hongrie'], attendu: 'Le Royaume-Uni et la France',
          explication: 'Leurs empires coloniaux sont les plus grands.',
        },
      ],
    },

    {
      id: 'h1-engrenage',
      seance: 1,
      titre: 'L\'été 1914 : l\'engrenage',
      sousTitre: 'De Sarajevo à la guerre européenne',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'L\'attentat de Sarajevo, le 28 juin 1914',
          lignes: [
            'L\'archiduc **François-Ferdinand**, **héritier** du trône d\'**Autriche-Hongrie**, est assassiné à **Sarajevo** (en Bosnie) par un **nationaliste serbe** de Bosnie.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Le jeu des alliances',
          colonnes: ['Date', 'Ce qui se passe'],
          lignes: [
            ['**28 juillet 1914**', 'l\'**Autriche-Hongrie** accuse la **Serbie** et lui **déclare la guerre**'],
            ['**30 juillet**', 'la **Russie** annonce la **mobilisation générale** contre l\'Autriche-Hongrie'],
            ['**1er août**', 'l\'**Allemagne** déclare la guerre à la **Russie**'],
            ['**3 août**', 'la France a mobilisé pour secourir la Russie : l\'**Allemagne** lui **déclare la guerre**'],
            ['**4 août**', 'le **Royaume-Uni** déclare la guerre à l\'**Allemagne**'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Les soldats partent « **la fleur au fusil** » : ils croient à une guerre **courte**, finie pour les vendanges, ou au plus tard à **Noël**.',
          ],
        },
      ],
      items: [
        {
          id: 'h-sarajevo-date', type: 'reponse', question: 'Quelle est la date de l\'attentat de Sarajevo ?', attendu: '28 juin 1914',
          accepte: ['le 28 juin 1914', '28/06/1914', '28/6/1914'],
          explication: 'Le 28 juin 1914 : le début de l\'engrenage.',
        },
        {
          id: 'h-archiduc', type: 'choix', consigne: BLOC, phrase: 'Qui est assassiné à Sarajevo ?',
          options: ['L\'archiduc François-Ferdinand, héritier de l\'Autriche-Hongrie', 'Le roi de Serbie', 'L\'empereur d\'Allemagne'],
          attendu: 'L\'archiduc François-Ferdinand, héritier de l\'Autriche-Hongrie',
          explication: 'L\'héritier du trône d\'Autriche-Hongrie.',
        },
        {
          id: 'h-assassin', type: 'choix', consigne: BLOC, phrase: 'Qui est l\'auteur de l\'attentat ?',
          options: ['Un nationaliste serbe de Bosnie', 'Un soldat allemand', 'Un espion russe'], attendu: 'Un nationaliste serbe de Bosnie',
          explication: 'D\'où la guerre déclarée par l\'Autriche-Hongrie à la Serbie.',
        },
        {
          id: 'h-engrenage', type: 'ordre', consigne: 'Remets l\'engrenage de l\'été 1914 dans l\'ordre :',
          elements: [
            'L\'archiduc François-Ferdinand est assassiné à Sarajevo.',
            'L\'Autriche-Hongrie déclare la guerre à la Serbie.',
            'La Russie mobilise contre l\'Autriche-Hongrie.',
            'L\'Allemagne déclare la guerre à la Russie.',
            'L\'Allemagne déclare la guerre à la France.',
            'Le Royaume-Uni déclare la guerre à l\'Allemagne.',
          ],
        },
        {
          id: 'h-fleur', type: 'choix', consigne: BLOC, phrase: 'Dans quel état d\'esprit les soldats partent-ils en août 1914 ?',
          options: ['« La fleur au fusil » : ils croient à une guerre courte', 'Ils savent que la guerre durera quatre ans', 'Ils refusent de partir'],
          attendu: '« La fleur au fusil » : ils croient à une guerre courte',
          explication: 'Ils pensent rentrer pour les vendanges, ou au plus tard à Noël.',
        },
        {
          id: 'h-royaume-uni', type: 'choix', consigne: BLOC, phrase: 'Quand le Royaume-Uni déclare-t-il la guerre à l\'Allemagne ?',
          options: ['Le 4 août 1914', 'Le 28 juin 1914', 'En avril 1917'], attendu: 'Le 4 août 1914',
          explication: 'Le dernier maillon de l\'engrenage. Avril 1917, ce sont les États-Unis.',
        },
      ],
    },

    {
      id: 'h1-mouvement',
      seance: 1,
      titre: '1914, la guerre de mouvement',
      sousTitre: 'Le plan allemand, la Marne, la course à la mer',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Le plan allemand',
          lignes: [
            'Pour ne pas être **prise en tenaille** entre la France à l\'ouest et la Russie à l\'est, l\'Allemagne veut **vaincre vite à l\'Ouest**, puis se retourner contre la **Russie**.',
            'C\'est le **plan Schlieffen**, appliqué par le chef d\'état-major allemand **von Moltke** : passer par la **Belgique**, pourtant **neutre**, et **encercler** l\'armée française.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Une percée rapide, puis l\'échec',
          colonnes: ['Quand', 'Ce qui se passe'],
          lignes: [
            ['**début août**', 'la **Belgique** est envahie'],
            ['**fin août**', 'à l\'Est, les **Russes** sont écrasés à **Tannenberg**'],
            ['**2 septembre**', 'les Allemands sont à **40 km de Paris** ; le gouvernement part à **Bordeaux**'],
            ['**5-11 septembre**', 'la **bataille de la Marne** : le général **Joffre** contre-attaque ; **Gallieni**, gouverneur de Paris, réquisitionne **630 taxis** pour amener des soldats ; **échec des Allemands**'],
            ['**12 sept. – 15 nov.**', 'la **course à la mer** : chaque armée essaie de déborder l\'autre vers le nord'],
            ['**novembre**', 'le front se **stabilise** sur près de **700 km** : on creuse des **tranchées**'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Novembre 1914 : c\'est l\'**échec de la guerre de mouvement**, et de l\'espoir d\'une victoire rapide. Commence la **guerre de position**.',
            'Le soldat français de 1914 porte encore un **pantalon rouge garance** et un **képi**, bien visibles : la tenue « bleu horizon » ne se généralise qu\'en 1915.',
          ],
        },
      ],
      items: [
        {
          id: 'h-schlieffen', type: 'choix', consigne: BLOC, phrase: 'En quoi consiste le plan Schlieffen ?',
          options: ['Vaincre vite la France en passant par la Belgique, puis se retourner contre la Russie', 'Attaquer d\'abord la Russie, puis la France', 'Défendre l\'Allemagne sans attaquer'],
          attendu: 'Vaincre vite la France en passant par la Belgique, puis se retourner contre la Russie',
          explication: 'Pour ne pas combattre sur deux fronts à la fois.',
        },
        {
          id: 'h-tenaille', type: 'choix', consigne: BLOC, phrase: 'Pourquoi l\'Allemagne veut-elle vaincre vite à l\'Ouest ?',
          options: ['Pour ne pas être prise en tenaille entre la France et la Russie', 'Pour conquérir le Royaume-Uni', 'Parce que la Russie est son alliée'],
          attendu: 'Pour ne pas être prise en tenaille entre la France et la Russie',
          explication: 'La France à l\'ouest, la Russie à l\'est.',
        },
        {
          id: 'h-belgique', type: 'choix', consigne: BLOC, phrase: 'Par quel pays neutre l\'armée allemande passe-t-elle ?',
          options: ['La Belgique', 'La Suisse', 'L\'Italie'], attendu: 'La Belgique',
          explication: 'Envahie début août 1914, malgré sa neutralité.',
        },
        {
          id: 'h-marne', type: 'reponse', question: 'Quelle bataille arrête les Allemands en septembre 1914 ?', attendu: 'la Marne',
          accepte: ['Marne', 'bataille de la Marne', 'la bataille de la Marne', 'première bataille de la Marne', 'la première bataille de la Marne', '1re bataille de la Marne'],
          pieges: [{ si: ['Verdun', 'la Somme', 'Somme'], message: 'Non : Verdun et la Somme, c\'est 1916. En septembre 1914, c\'est la Marne.' }],
          explication: 'La bataille de la Marne, du 5 au 11 septembre 1914 : l\'échec du plan allemand.',
        },
        {
          id: 'h-taxis', type: 'choix', consigne: BLOC, phrase: 'Que fait Gallieni pendant la bataille de la Marne ?',
          options: ['Il réquisitionne 630 taxis parisiens pour amener des soldats', 'Il signe l\'armistice', 'Il organise la Voie sacrée'],
          attendu: 'Il réquisitionne 630 taxis parisiens pour amener des soldats',
          explication: 'Les « taxis de la Marne ». La Voie sacrée, c\'est Verdun, en 1916.',
        },
        {
          id: 'h-bordeaux', type: 'choix', consigne: BLOC, phrase: 'Où part le gouvernement français quand les Allemands approchent de Paris ?',
          options: ['À Bordeaux', 'À Lyon', 'À Verdun'], attendu: 'À Bordeaux',
          explication: 'Les Allemands sont à 40 km de Paris, le 2 septembre 1914.',
        },
        {
          id: 'h-tannenberg', type: 'choix', consigne: BLOC, phrase: 'Que se passe-t-il à Tannenberg, à la fin d\'août 1914 ?',
          options: ['Les Russes sont écrasés par les Allemands', 'Les Français arrêtent les Allemands', 'Les Américains débarquent'],
          attendu: 'Les Russes sont écrasés par les Allemands',
          explication: 'À l\'Est. À l\'Ouest, c\'est la Marne qui arrête les Allemands.',
        },
        {
          id: 'h-t-course', type: 'terme', definition: 'En 1914, chaque armée essaie de déborder l\'autre vers le nord, jusqu\'à la mer du Nord', attendu: 'course à la mer',
          accepte: ['la course à la mer'],
        },
        {
          id: 'h-t-mouvement', type: 'terme', definition: 'La phase de 1914 où les armées avancent et reculent vite, en espérant une victoire rapide', attendu: 'guerre de mouvement',
          accepte: ['la guerre de mouvement'],
          pieges: [{ si: ['guerre de position', 'guerre des tranchées'], message: 'Non : la guerre de position, c\'est 1915-1917, quand les armées sont enterrées. En 1914, elles bougent : guerre de mouvement.' }],
        },
        {
          id: 'h-novembre', type: 'choix', consigne: BLOC, phrase: 'Que se passe-t-il en novembre 1914 ?',
          options: ['Le front se stabilise sur près de 700 km, les soldats creusent des tranchées', 'Les Allemands entrent dans Paris', 'La guerre se termine'],
          attendu: 'Le front se stabilise sur près de 700 km, les soldats creusent des tranchées',
          explication: 'L\'échec de la guerre de mouvement.',
        },
      ],
    },

    // ═══ Séance 2 — la guerre de position ════════════════════════════════

    {
      id: 'h2-tranchees',
      seance: 2,
      titre: 'La guerre des tranchées',
      sousTitre: 'Verdun, la Somme, la violence des combats',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'La guerre de position (1915-1917)',
          lignes: [
            'Les deux armées sont **enterrées dans des tranchées**, face à face, le long d\'un **front** qui court de la **Suisse à la mer du Nord**.',
            'De grandes batailles cherchent à **percer le front**, **sans succès**. Exemple étudié en classe : la bataille des **Éparges** (février-avril 1915).',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les grandes batailles de 1916',
          colonnes: ['', 'Verdun', 'La Somme'],
          lignes: [
            ['**Dates**', '**21 février – 15 décembre 1916**', '**1er juillet – 18 novembre 1916**'],
            ['**Qui attaque ?**', 'l\'**Allemagne**, pour « **saigner à blanc** » l\'armée française', 'les **Alliés**, pour **percer** le front et **soulager** les Français à Verdun'],
            ['**Déroulement**', 'offensive allemande en février, puis, à partir de l\'été, **contre-offensive française** victorieuse', 'une grande offensive dans la région de la Somme'],
            ['**Victimes**', 'environ **700 000** morts, blessés et disparus, des deux camps', 'environ **1 million** de morts, blessés ou disparus'],
            ['**Bilan**', 'une **défaite allemande** ; Verdun devient le **symbole de l\'héroïsme** des soldats français', 'le front n\'est pas percé'],
          ],
        },
        {
          type: 'regle',
          titre: 'Verdun, un piège',
          lignes: [
            'Verdun n\'est ravitaillée que par **une seule route**, la « **Voie sacrée** » : de février 1916 à janvier 1917, des milliers de **camions** y passent jour et nuit pour amener les renforts et évacuer les **blessés**.',
            '« **Courage ! On les aura !** » : l\'ordre du jour du général **Pétain**, le 10 avril 1916.',
          ],
        },
        {
          type: 'regle',
          titre: 'Les documents : la violence des tranchées',
          lignes: [
            'La **lettre d\'un soldat** écrite pendant la bataille de la **Somme**, en septembre 1916 : des camarades tués ou déchiquetés par les **obus**, des **disparus** jamais retrouvés. Une **blessure** y devient un « bonheur » : elle éloigne du front pour des semaines.',
            '***Blessé*** (1924), une gravure de l\'artiste allemand **Otto Dix**, ancien soldat : un visage déformé par la **peur** et la **douleur**. L\'artiste montre l\'**horreur** de la guerre.',
          ],
        },
      ],
      items: [
        {
          id: 'h-t-position', type: 'terme', definition: 'La phase de 1915 à 1917 où les armées, enterrées dans des tranchées, ne bougent presque plus', attendu: 'guerre de position',
          accepte: ['la guerre de position', 'guerre des tranchées', 'la guerre des tranchées'],
          pieges: [{ si: ['guerre de mouvement'], message: 'Non : la guerre de mouvement, c\'est 1914, quand les armées avancent. Enterrées dans les tranchées : guerre de position.' }],
        },
        { id: 'h-t-poilu', type: 'terme', definition: 'Le surnom des soldats français de la Grande Guerre', attendu: 'poilu', accepte: ['poilus', 'les poilus', 'un poilu'] },
        { id: 'h-t-voie', type: 'terme', definition: 'La seule route qui ravitaille Verdun, où des milliers de camions passent jour et nuit', attendu: 'Voie sacrée', accepte: ['la Voie sacrée'] },
        {
          id: 'h-verdun-annee', type: 'reponse', question: 'En quelle année a lieu la bataille de Verdun ?', attendu: '1916',
          explication: 'Du 21 février au 15 décembre 1916.',
        },
        {
          id: 'h-saigner', type: 'choix', consigne: BLOC, phrase: 'Pourquoi l\'état-major allemand attaque-t-il à Verdun ?',
          options: ['Pour « saigner à blanc » l\'armée française', 'Pour soulager ses alliés autrichiens', 'Pour atteindre la mer du Nord'],
          attendu: 'Pour « saigner à blanc » l\'armée française',
          explication: 'User l\'armée française en lui infligeant des pertes énormes.',
        },
        {
          id: 'h-verdun-fin', type: 'choix', consigne: BLOC, phrase: 'Comment se termine la bataille de Verdun ?',
          options: ['Par une défaite allemande, en décembre 1916', 'Par une victoire allemande', 'Par l\'armistice'], attendu: 'Par une défaite allemande, en décembre 1916',
          explication: 'Après la contre-offensive française, qui reprend le terrain perdu.',
        },
        {
          id: 'h-verdun-victimes', type: 'choix', consigne: BLOC, phrase: 'Combien de victimes (morts, blessés, disparus) la bataille de Verdun fait-elle ?',
          options: ['Environ 700 000', 'Environ 7 000', 'Environ 70 millions'], attendu: 'Environ 700 000',
          explication: 'Des deux camps. La Somme : environ 1 million.',
        },
        {
          id: 'h-somme-but', type: 'choix', consigne: BLOC, phrase: 'Pourquoi les Alliés lancent-ils l\'offensive de la Somme, le 1er juillet 1916 ?',
          options: ['Pour percer le front allemand et soulager les Français à Verdun', 'Pour envahir la Belgique', 'Pour aider les Russes à Tannenberg'],
          attendu: 'Pour percer le front allemand et soulager les Français à Verdun',
          explication: 'Le front n\'est pas percé, et la bataille fait environ 1 million de victimes.',
        },
        {
          id: 'h-somme-victimes', type: 'choix', consigne: BLOC, phrase: 'Combien de morts, blessés ou disparus la bataille de la Somme fait-elle ?',
          options: ['Environ 1 million', 'Environ 100 000', 'Environ 10 millions'], attendu: 'Environ 1 million',
          explication: 'Encore plus que Verdun (environ 700 000).',
        },
        {
          id: 'h-on-les-aura', type: 'choix', consigne: BLOC, phrase: '« Courage ! On les aura ! » : qui le dit, et quand ?',
          options: ['Le général Pétain, à Verdun, en avril 1916', 'Le général Joffre, sur la Marne, en 1914', 'Gallieni, à Paris, en 1914'],
          attendu: 'Le général Pétain, à Verdun, en avril 1916',
          explication: 'L\'ordre du jour du 10 avril 1916.',
        },
        {
          id: 'h-symbole', type: 'choix', consigne: BLOC, phrase: 'Que symbolise la bataille de Verdun pour les Français ?',
          options: ['L\'héroïsme des soldats français', 'La défaite de la France', 'L\'entrée en guerre des États-Unis'], attendu: 'L\'héroïsme des soldats français',
          explication: 'Ils ont tenu, au prix de pertes immenses.',
        },
        {
          id: 'h-hopital', type: 'choix', consigne: 'D\'après la lettre d\'un soldat de la Somme (1916) :', phrase: 'Pourquoi une blessure peut-elle sembler un « bonheur » ?',
          options: ['Elle éloigne du front pour des semaines, loin des obus', 'Les blessés rentrent chez eux pour toujours', 'Les blessés reçoivent une prime'],
          attendu: 'Elle éloigne du front pour des semaines, loin des obus',
          explication: 'Au front, la mort est partout : l\'hôpital, c\'est survivre.',
        },
        {
          id: 'h-dix', type: 'choix', consigne: BLOC, phrase: 'Que montre l\'œuvre « Blessé » (1924) d\'Otto Dix ?',
          options: ['L\'horreur de la guerre : un soldat déformé par la douleur et la peur', 'La gloire d\'un soldat victorieux', 'Un paysage de campagne paisible'],
          attendu: 'L\'horreur de la guerre : un soldat déformé par la douleur et la peur',
          explication: 'Otto Dix, ancien soldat allemand, peint la violence qu\'il a vécue.',
        },
      ],
    },

    {
      id: 'h2-1917',
      seance: 2,
      titre: '1917, une année décisive',
      sousTitre: 'Les mutineries, les États-Unis, la Russie',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Des soldats à bout',
          lignes: [
            'La guerre s\'éternise : les soldats sont **fatigués** et **démoralisés**.',
            'Le **16 avril 1917**, l\'offensive du **Chemin des Dames** échoue : une **hécatombe**.',
            'Des soldats **refusent de monter à l\'assaut** : ce sont les **mutineries**. La **répression** reste **limitée**, mais certains sont **fusillés pour l\'exemple**.',
            'Le général **Pétain** améliore le **quotidien** des poilus : de meilleures **rations**, plus de **permissions**.',
            'Une chanson anonyme, la **chanson de Craonne**, dit la **souffrance** des poilus.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Deux tournants',
          colonnes: ['Pays', 'En 1917'],
          lignes: [
            ['les **États-Unis**', 'ils rompent avec leur **isolationnisme** et déclarent la guerre à l\'Allemagne le **6 avril 1917**. Pétain : « J\'attends les chars et les Américains. »'],
            ['la **Russie**', '**deux révolutions** : en février, le **tsar** est renversé ; en octobre, **Lénine** et les **bolcheviks** prennent le pouvoir. En **décembre 1917**, un **armistice** avec l\'Allemagne : la Russie sort de la guerre'],
          ],
        },
      ],
      items: [
        {
          id: 'h-t-mutinerie', type: 'terme', definition: 'Le refus collectif de soldats d\'obéir et de monter à l\'assaut, en 1917', attendu: 'mutineries',
          accepte: ['mutinerie', 'les mutineries', 'une mutinerie'],
        },
        {
          id: 'h-chemin', type: 'choix', consigne: BLOC, phrase: 'Quelle offensive échoue le 16 avril 1917, causant une hécatombe ?',
          options: ['Le Chemin des Dames', 'La Marne', 'Verdun'], attendu: 'Le Chemin des Dames',
          explication: 'Cet échec déclenche les mutineries.',
        },
        {
          id: 'h-fusilles', type: 'choix', consigne: BLOC, phrase: 'Comment l\'armée réagit-elle aux mutineries ?',
          options: ['Une répression limitée, mais certains sont fusillés pour l\'exemple', 'Tous les mutins sont fusillés', 'Aucune sanction'],
          attendu: 'Une répression limitée, mais certains sont fusillés pour l\'exemple',
          explication: 'Et Pétain améliore le quotidien des soldats.',
        },
        {
          id: 'h-petain-1917', type: 'choix', consigne: BLOC, phrase: 'Que fait le général Pétain pour redonner le moral aux soldats ?',
          options: ['Il améliore leur quotidien : rations et permissions', 'Il lance une grande offensive', 'Il signe la paix'],
          attendu: 'Il améliore leur quotidien : rations et permissions',
          explication: 'Et il attend « les chars et les Américains ».',
        },
        {
          id: 'h-usa-date', type: 'reponse', question: 'En quel mois et quelle année les États-Unis entrent-ils en guerre ?', attendu: 'avril 1917',
          accepte: ['6 avril 1917', 'le 6 avril 1917', 'en avril 1917'],
          explication: 'Le 6 avril 1917, contre l\'Allemagne.',
        },
        {
          id: 'h-isolationnisme', type: 'choix', consigne: BLOC, phrase: 'Avec quelle politique les États-Unis rompent-ils en 1917 ?',
          options: ['L\'isolationnisme : ne pas se mêler des conflits européens', 'Le colonialisme', 'Le communisme'],
          attendu: 'L\'isolationnisme : ne pas se mêler des conflits européens',
          explication: 'Ils entrent en guerre contre l\'Allemagne.',
        },
        {
          id: 'h-russie', type: 'choix', consigne: BLOC, phrase: 'Que se passe-t-il en Russie en 1917 ?',
          options: ['Deux révolutions : le tsar est renversé, puis Lénine et les bolcheviks prennent le pouvoir', 'Le tsar remporte une grande victoire', 'La Russie entre en guerre aux côtés de la France'],
          attendu: 'Deux révolutions : le tsar est renversé, puis Lénine et les bolcheviks prennent le pouvoir',
          explication: 'Et en décembre 1917, la Russie signe un armistice avec l\'Allemagne.',
        },
        {
          id: 'h-armistice-russe', type: 'choix', consigne: BLOC, phrase: 'En décembre 1917, la Russie…',
          options: ['signe un armistice avec l\'Allemagne et sort de la guerre', 'déclare la guerre aux États-Unis', 'envahit l\'Allemagne'],
          attendu: 'signe un armistice avec l\'Allemagne et sort de la guerre',
          explication: 'L\'armistice germano-russe : l\'Allemagne n\'a plus qu\'un front.',
        },
        {
          id: 'h-craonne', type: 'choix', consigne: BLOC, phrase: 'Que montre la chanson de Craonne ?',
          options: ['La souffrance des poilus', 'La joie de la victoire', 'L\'arrivée des Américains'], attendu: 'La souffrance des poilus',
          explication: 'Une chanson de soldats, de 1917.',
        },
      ],
    },

    {
      id: 'h2-ecrire',
      seance: 2,
      titre: 'Rédiger : la violence des combats',
      sousTitre: 'Un développement construit, comme au brevet',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Un développement en trois temps',
          lignes: [
            '**D\'abord**, les conditions : après 1914, les soldats sont **enterrés dans des tranchées**, sous les **obus**, sur un front de la Suisse à la mer du Nord.',
            '**Ensuite**, un exemple précis : **Verdun** (1916) — l\'Allemagne veut « saigner à blanc » l\'armée française, environ **700 000 victimes** ; ou la **Somme** (environ **1 million**).',
            '**Enfin**, les conséquences en **1917** : épuisement, échec du **Chemin des Dames**, **mutineries**, **fusillés pour l\'exemple**.',
            'Mots utiles : *d\'abord, ensuite, enfin, par exemple, car, c\'est pourquoi.*',
          ],
        },
      ],
      items: [
        {
          id: 'h-w-violence', type: 'decrire', sujet: 'Montre que les soldats ont subi une violence de masse pendant la Première Guerre mondiale', emoji: '🪖',
          indices: ['tranchées', 'guerre de position', 'obus', 'Verdun', '1916', '700 000 victimes', 'la Somme', 'Chemin des Dames', 'mutineries', 'fusillés pour l\'exemple'],
          consigne: 'Rédige un développement construit de quelques lignes : les conditions de combat, un exemple de bataille avec des chiffres, et ce que vivent les soldats en 1917.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Pendant la Première Guerre mondiale, les soldats subissent une violence de masse. D\'abord, après l\'échec de la guerre de mouvement en 1914, ils vivent enterrés dans des tranchées, sur un front qui va de la Suisse à la mer du Nord, sous les obus et les mitrailleuses. Ensuite, de grandes batailles font d\'énormes pertes : à Verdun, en 1916, l\'Allemagne veut « saigner à blanc » l\'armée française ; la bataille dure de février à décembre et fait environ 700 000 victimes. La même année, la bataille de la Somme fait environ un million de morts, de blessés et de disparus. Enfin, en 1917, les soldats sont épuisés : après l\'échec meurtrier du Chemin des Dames, certains refusent de monter à l\'assaut. Ce sont les mutineries, et quelques soldats sont fusillés pour l\'exemple.',
          criteres: [
            { id: 'conditions', texte: 'Les conditions de combat : les tranchées, la guerre de position, les obus' },
            { id: 'bataille', texte: 'Une bataille précise, datée et chiffrée : Verdun (1916, environ 700 000 victimes, « saigner à blanc ») ou la Somme (1916, environ 1 million)' },
            { id: '1917', texte: 'L\'épuisement des soldats en 1917 : le Chemin des Dames, les mutineries, les fusillés pour l\'exemple' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — une guerre totale ════════════════════════════════════

    {
      id: 'h3-economie',
      seance: 3,
      titre: 'Mobiliser les hommes et l\'économie',
      sousTitre: 'Conscription, usines de guerre, effort de guerre',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Les hommes',
          lignes: [
            'La **conscription**, c\'est le **service militaire obligatoire**. La **mobilisation générale** du **2 août 1914** met sur pied plus de **3 millions** d\'hommes, de **20 à 48 ans**.',
            'S\'y ajoutent des **engagés volontaires**, dès **17 ans**.',
          ],
        },
        {
          type: 'regle',
          titre: 'La reconversion industrielle',
          lignes: [
            'On croyait à une guerre courte : l\'économie s\'est **arrêtée**. Il faut **rouvrir les usines** et produire pour la guerre, à une échelle jamais vue.',
            'Les usines civiles deviennent des usines **militaires** : chez **Renault** (Boulogne-Billancourt), on passe des voitures aux camions, aux chars, aux moteurs d\'avion et aux **obus**. **Citroën** ouvre en 1915, quai de Javel, une usine d\'**obus**.',
            'En **1915**, des ouvriers qualifiés et des ingénieurs sont **rappelés du front**. On emploie aussi des **femmes**, des **très jeunes** et des **immigrés** : **180 000**, venus des colonies et de Chine.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les usines Renault, 1913 → 1918',
          colonnes: ['', '1913', '1918'],
          lignes: [
            ['voitures', '1 484', '553'],
            ['chars d\'assaut', '0', '1 750'],
            ['moteurs d\'avion', '0', '5 050'],
            ['obus', '0', '**2 070 400**'],
            ['ouvriers', '6 300', '22 500'],
            ['dont femmes', '3,8 %', '**31,6 %**'],
          ],
        },
        {
          type: 'regle',
          titre: 'L\'effort de guerre',
          lignes: [
            'Une économie **entièrement organisée** pour les besoins du conflit : l\'**État intervient** bien plus dans l\'économie.',
            'Il **augmente les impôts** et lance des **emprunts** auprès de la population et des **banques américaines**.',
            'Il en appelle au **patriotisme** par des **affiches** : « **Pour la France, versez votre or** » (1915) — l\'argent prêté fera gagner la guerre.',
          ],
        },
      ],
      items: [
        { id: 'h-t-conscription', type: 'terme', definition: 'Le service militaire obligatoire', attendu: 'conscription', accepte: ['la conscription'] },
        {
          id: 'h-t-effort', type: 'terme', definition: 'Une économie entièrement organisée pour répondre aux besoins de la guerre', attendu: 'effort de guerre',
          accepte: ['l\'effort de guerre', 'économie de guerre', 'l\'économie de guerre'],
        },
        {
          id: 'h-t-totale', type: 'terme', definition: 'Une guerre qui mobilise toutes les forces d\'un pays : les soldats, l\'économie et les civils', attendu: 'guerre totale',
          accepte: ['une guerre totale', 'la guerre totale'],
        },
        {
          id: 'h-mobilisation-date', type: 'reponse', question: 'Quelle est la date de la mobilisation générale en France ?', attendu: '2 août 1914',
          accepte: ['le 2 août 1914', '02/08/1914', '2/08/1914', '2/8/1914'],
          explication: 'Le 2 août 1914 : plus de 3 millions d\'hommes de 20 à 48 ans.',
        },
        {
          id: 'h-trois-millions', type: 'choix', consigne: BLOC, phrase: 'Combien d\'hommes la mobilisation générale de 1914 met-elle sur pied ?',
          options: ['Plus de 3 millions', 'Environ 300 000', 'Plus de 30 millions'], attendu: 'Plus de 3 millions',
          explication: 'Des hommes de 20 à 48 ans.',
        },
        {
          id: 'h-reconversion', type: 'choix', consigne: BLOC, phrase: 'Qu\'est-ce que la reconversion industrielle ?',
          options: ['Des usines civiles qui produisent du matériel militaire', 'Des usines qui ferment pendant la guerre', 'Des usines déplacées aux États-Unis'],
          attendu: 'Des usines civiles qui produisent du matériel militaire',
          explication: 'Chez Renault : des voitures aux obus et aux chars.',
        },
        {
          id: 'h-renault-obus', type: 'choix', consigne: 'D\'après le tableau des usines Renault :', phrase: 'Combien d\'obus Renault fabrique-t-il en 1918, contre aucun en 1913 ?',
          options: ['Plus de 2 millions', 'Environ 550', 'Environ 1 750'], attendu: 'Plus de 2 millions',
          explication: '2 070 400 obus. 553, ce sont les voitures ; 1 750, les chars.',
        },
        {
          id: 'h-renault-femmes', type: 'choix', consigne: 'D\'après le tableau des usines Renault :', phrase: 'Les femmes passent de 3,8 % à 31,6 % des ouvriers. Qu\'est-ce que cela montre ?',
          options: ['Les femmes remplacent les hommes partis au front', 'Les hommes quittent l\'usine pour les champs', 'Les usines ferment'],
          attendu: 'Les femmes remplacent les hommes partis au front',
          explication: 'Les « munitionnettes » fabriquent les obus.',
        },
        {
          id: 'h-emprunts', type: 'choix', consigne: BLOC, phrase: 'Comment l\'État finance-t-il la guerre ?',
          options: ['Il augmente les impôts et lance des emprunts', 'Il vend ses colonies', 'Il cesse de payer les soldats'],
          attendu: 'Il augmente les impôts et lance des emprunts',
          explication: 'Des emprunts auprès de la population et des banques américaines.',
        },
        {
          id: 'h-affiche-or', type: 'choix', consigne: BLOC, phrase: 'Que demande l\'affiche « Pour la France, versez votre or » (1915) ?',
          options: ['De prêter son argent à l\'État pour gagner la guerre', 'De s\'engager dans l\'armée', 'De travailler dans les usines d\'obus'],
          attendu: 'De prêter son argent à l\'État pour gagner la guerre',
          explication: 'Une affiche qui appelle les Français à confier leur or à l\'État pour financer la guerre.',
        },
        {
          id: 'h-main-oeuvre', type: 'choix', consigne: BLOC, phrase: 'Qui remplace les ouvriers partis au front ?',
          options: ['Des femmes, des très jeunes et des immigrés des colonies et de Chine', 'Des prisonniers américains', 'Personne : les usines ferment'],
          attendu: 'Des femmes, des très jeunes et des immigrés des colonies et de Chine',
          explication: 'Et des ouvriers qualifiés rappelés du front en 1915.',
        },
      ],
    },

    {
      id: 'h3-civils',
      seance: 3,
      titre: 'Mobiliser les civils',
      sousTitre: 'Les femmes, la propagande, la censure, les civils victimes',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Le rôle des femmes',
          lignes: [
            'Elles **remplacent les hommes** partout : dans les usines d\'armement (les **munitionnettes**, ou obusettes), à la tête des **exploitations agricoles** et des entreprises familiales ; **infirmières** de la Croix-Rouge ; **marraines de guerre** bénévoles, qui écrivent aux soldats.',
            'La guerre amorce la **féminisation** des métiers de service : enseignement, poste, banque, transports.',
            'Travailler est une **nécessité** : l\'indemnité versée quand le mari est mobilisé ne suffit pas, et les femmes sont **moins payées** que les hommes. Veuves et orphelins vivent dans la **précarité**.',
            'L\'**Union sacrée**, c\'est l\'union de tous les Français, au-delà de leurs opinions, pour défendre le pays. Les féministes s\'y rangent et suspendent leurs revendications. Mais après la guerre, certains pays, comme la France, **ne leur donnent pas le droit de vote**.',
          ],
        },
        {
          type: 'regle',
          titre: 'La propagande',
          lignes: [
            'La propagande **valorise son camp et diabolise l\'autre**. Les poilus la dénoncent : c\'est le « **bourrage de crâne** ». On ment à l\'arrière pour ne pas l\'inquiéter : un ennemi ridiculisé, ou au contraire **barbare**.',
            'Elle vise aussi les **enfants** : livres, jeux, illustrés (*Bécassine*, *Les Pieds Nickelés*), pour qu\'ils trouvent la guerre **juste** et soient prêts au sacrifice. Des garçons de 15-16 ans mentent sur leur âge pour s\'engager.',
            'En **1915** naît **Le Canard enchaîné**, un journal satirique qui **dénonce** la propagande.',
          ],
        },
        {
          type: 'regle',
          titre: 'La censure',
          lignes: [
            'Les lettres des poilus sont **lues**, **censurées** ou confisquées : pour ne pas révéler des **positions** militaires, et pour ne pas **démoraliser l\'arrière**.',
            'Elles sont conservées dans les archives militaires, à **Vincennes** : des **témoignages** précieux, pour le **devoir de mémoire**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Les civils, victimes de la guerre',
          lignes: [
            'Dans les régions **occupées** (Belgique, nord de la France, Serbie) : le **travail forcé**, les **violences** des soldats, dont les femmes sont les premières victimes.',
            'Les **bombardements** détruisent et tuent.',
            'Des **révolutions** : en Russie (1917) ; en Allemagne, l\'empereur **Guillaume II abdique** le **9 novembre 1918** et la **République** est proclamée ; en janvier 1919, à Berlin, les **spartakistes** (communistes) échouent à prendre le pouvoir.',
          ],
        },
      ],
      items: [
        {
          id: 'h-t-munitionnette', type: 'terme', definition: 'Une femme qui travaille dans une usine d\'armement', attendu: 'munitionnette',
          accepte: ['munitionnettes', 'une munitionnette', 'obusette', 'obusettes'],
        },
        { id: 'h-t-marraine', type: 'terme', definition: 'Une femme bénévole qui écrit à un soldat du front pour le soutenir', attendu: 'marraine de guerre', accepte: ['marraines de guerre', 'une marraine de guerre'] },
        { id: 'h-t-bourrage', type: 'terme', definition: 'Le nom donné par les poilus aux mensonges de la propagande', attendu: 'bourrage de crâne', accepte: ['le bourrage de crâne', 'bourrage de crane'] },
        {
          id: 'h-t-propagande', type: 'terme', definition: 'Les moyens utilisés pour valoriser son camp et diaboliser l\'ennemi', attendu: 'propagande', accepte: ['la propagande'],
          pieges: [
            { si: ['censure'], message: 'Non : la censure supprime ce qu\'on ne veut pas laisser dire. Valoriser son camp et diaboliser l\'autre : la propagande.' },
            { si: ['bourrage de crâne'], resultat: 'presque', message: 'Presque : c\'est le surnom que les poilus lui donnent. Le mot du cours : la propagande.' },
          ],
        },
        {
          id: 'h-t-censure', type: 'terme', definition: 'Le contrôle qui supprime ou interdit des informations, par exemple dans les lettres des soldats', attendu: 'censure', accepte: ['la censure'],
          pieges: [{ si: ['propagande'], message: 'Non : la propagande diffuse des messages. Supprimer ou interdire des informations : la censure.' }],
        },
        { id: 'h-t-union', type: 'terme', definition: 'L\'union de tous les Français, au-delà de leurs opinions, pour défendre le pays', attendu: 'Union sacrée', accepte: ['l\'Union sacrée'] },
        {
          id: 'h-femmes-pourquoi', type: 'choix', consigne: BLOC, phrase: 'Pourquoi le travail des femmes est-il une nécessité ?',
          options: ['Privées du salaire de leur mari mobilisé, elles ne peuvent pas vivre de la seule indemnité', 'Parce que la loi les y oblige', 'Parce qu\'elles sont mieux payées que les hommes'],
          attendu: 'Privées du salaire de leur mari mobilisé, elles ne peuvent pas vivre de la seule indemnité',
          explication: 'Et leur salaire reste plus faible que celui des hommes.',
        },
        {
          id: 'h-vote', type: 'choix', consigne: BLOC, phrase: 'L\'engagement des femmes est-il récompensé après la guerre ?',
          options: ['Pas toujours : certains pays, comme la France, ne leur donnent pas le droit de vote', 'Oui : toutes les Européennes votent dès 1919', 'Oui : leur salaire devient égal à celui des hommes'],
          attendu: 'Pas toujours : certains pays, comme la France, ne leur donnent pas le droit de vote',
          explication: 'Leur implication n\'est pas forcément récompensée.',
        },
        {
          id: 'h-censure-pourquoi', type: 'choix', consigne: BLOC, phrase: 'Pourquoi les lettres des poilus sont-elles censurées ?',
          options: ['Pour ne pas révéler des positions et ne pas démoraliser l\'arrière', 'Pour corriger leurs fautes d\'orthographe', 'Pour les publier dans les journaux'],
          attendu: 'Pour ne pas révéler des positions et ne pas démoraliser l\'arrière',
          explication: 'Elles sont aujourd\'hui des témoignages précieux.',
        },
        {
          id: 'h-canard', type: 'choix', consigne: BLOC, phrase: 'Quel journal satirique naît en 1915 pour dénoncer la propagande ?',
          options: ['Le Canard enchaîné', 'Le Petit Journal', 'Bécassine'], attendu: 'Le Canard enchaîné',
          explication: 'Bécassine est une héroïne d\'illustrés pour enfants, utilisée par la propagande.',
        },
        {
          id: 'h-enfants', type: 'choix', consigne: BLOC, phrase: 'Pourquoi la propagande vise-t-elle aussi les enfants ?',
          options: ['Pour qu\'ils trouvent la guerre juste et soient prêts à se sacrifier à leur tour', 'Pour les faire rire de la guerre', 'Pour qu\'ils refusent la guerre'],
          attendu: 'Pour qu\'ils trouvent la guerre juste et soient prêts à se sacrifier à leur tour',
          explication: 'Livres, jeux, illustrés : la guerre est partout.',
        },
        {
          id: 'h-occupes', type: 'choix', consigne: BLOC, phrase: 'Que subissent les civils des régions occupées ?',
          options: ['Le travail forcé, les violences, les bombardements', 'Rien : la guerre ne touche que les soldats', 'Un service militaire plus court'],
          attendu: 'Le travail forcé, les violences, les bombardements',
          explication: 'En Belgique, dans le nord de la France, en Serbie.',
        },
        {
          id: 'h-guillaume', type: 'choix', consigne: BLOC, phrase: 'Que se passe-t-il en Allemagne le 9 novembre 1918 ?',
          options: ['L\'empereur Guillaume II abdique et la République est proclamée', 'Les spartakistes prennent durablement le pouvoir', 'L\'Allemagne déclare la guerre aux États-Unis'],
          attendu: 'L\'empereur Guillaume II abdique et la République est proclamée',
          explication: 'Deux jours avant l\'armistice. Les spartakistes échouent en janvier 1919.',
        },
      ],
    },

    {
      id: 'h3-armeniens',
      seance: 3,
      titre: 'Le génocide des Arméniens (1915-1916)',
      sousTitre: 'L\'étude de cas n° 2',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Un génocide',
          lignes: [
            'Un **génocide**, c\'est l\'**extermination volontaire et organisée** d\'un peuple.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Le génocide des Arméniens',
          colonnes: ['', 'À retenir'],
          lignes: [
            ['**Le contexte**', 'l\'**Empire ottoman** combat avec l\'Allemagne et l\'Autriche-Hongrie, contre les **Russes** dans le **Caucase**. Les Arméniens (environ **1,8 million**) vivent surtout dans le **nord-est** de l\'Empire (l\'est de l\'**Anatolie**) et à **Constantinople**'],
            ['**L\'ordre**', 'en **1915**, le ministre de l\'Intérieur **Talaat Pacha** ordonne l\'**extermination** des Arméniens. **Prétexte** : ils pourraient **aider la Russie**. Qui désobéit est sévèrement puni'],
            ['**Les procédés**', 'les hommes **fusillés** près des villes ; femmes, enfants et vieillards **déportés** dans de longues **marches**, massacrés, puis mourant dans des **camps** du **désert syrien**'],
            ['**Le bilan**', 'les **deux tiers** des Arméniens de Turquie sont assassinés : **1,2 million** de personnes. Un tiers échappe à la mort, en fuyant dans le Caucase russe ou en se cachant'],
            ['**Les témoins**', 'dès 1915, les **consuls des États-Unis** reçoivent des **centaines de témoignages** de rescapés et d\'Ottomans opposés au gouvernement'],
          ],
        },
      ],
      items: [
        { id: 'h-t-genocide', type: 'terme', definition: 'L\'extermination volontaire et organisée d\'un peuple', attendu: 'génocide', accepte: ['un génocide', 'le génocide'] },
        {
          id: 'h-armeniens-annee', type: 'reponse', question: 'En quelle année commence le génocide des Arméniens ?', attendu: '1915',
          explication: '1915-1916, sur ordre de Talaat Pacha.',
        },
        {
          id: 'h-talaat', type: 'choix', consigne: BLOC, phrase: 'Qui donne l\'ordre d\'exterminer les Arméniens ?',
          options: ['Talaat Pacha, ministre ottoman de l\'Intérieur', 'Guillaume II, empereur d\'Allemagne', 'Lénine'], attendu: 'Talaat Pacha, ministre ottoman de l\'Intérieur',
          explication: 'En 1915.',
        },
        {
          id: 'h-pretexte', type: 'choix', consigne: BLOC, phrase: 'Quel prétexte le gouvernement ottoman donne-t-il ?',
          options: ['Les Arméniens pourraient aider la Russie', 'Les Arméniens refusent de payer l\'impôt', 'Les Arméniens ont assassiné l\'archiduc'],
          attendu: 'Les Arméniens pourraient aider la Russie',
          explication: 'La défaite face aux Russes sert de prétexte.',
        },
        {
          id: 'h-procedes', type: 'choix', consigne: BLOC, phrase: 'Comment les Arméniens sont-ils exterminés ?',
          options: ['Fusillades des hommes, déportations et marches vers des camps du désert syrien', 'Ils sont expulsés en bateau vers l\'Amérique', 'Ils sont enrôlés de force dans l\'armée russe'],
          attendu: 'Fusillades des hommes, déportations et marches vers des camps du désert syrien',
          explication: 'Les femmes, les enfants et les vieillards sont déportés et massacrés en chemin.',
        },
        {
          id: 'h-bilan-armeniens', type: 'choix', consigne: BLOC, phrase: 'Combien d\'Arméniens sont assassinés ?',
          options: ['1,2 million, les deux tiers des Arméniens de Turquie', 'Environ 12 000', 'Environ 10 millions'],
          attendu: '1,2 million, les deux tiers des Arméniens de Turquie',
          explication: 'Un tiers a pu échapper à la mort.',
        },
        {
          id: 'h-temoins', type: 'choix', consigne: BLOC, phrase: 'Comment le génocide est-il connu dès 1915 ?',
          options: ['Par des centaines de témoignages reçus par les consuls des États-Unis', 'Par les journaux ottomans', 'Il n\'a été connu qu\'après 1990'],
          attendu: 'Par des centaines de témoignages reçus par les consuls des États-Unis',
          explication: 'Des rescapés, et des Ottomans en désaccord avec leur gouvernement.',
        },
      ],
    },

    {
      id: 'h3-ecrire',
      seance: 3,
      titre: 'Rédiger : une guerre totale',
      sousTitre: 'Le grand sujet du chapitre',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Une guerre totale, en trois temps',
          lignes: [
            '**Les hommes** : la **conscription**, la mobilisation générale du **2 août 1914**, plus de **3 millions** de soldats.',
            '**L\'économie** : la **reconversion** des usines (Renault : plus de 2 millions d\'obus en 1918), l\'**État** qui intervient, les **emprunts**.',
            '**Les civils** : les **femmes** qui remplacent les hommes (munitionnettes), la **propagande** et la **censure** ; et des civils **victimes** : occupation, bombardements, **génocide des Arméniens**.',
            'Mots utiles : *d\'abord, ensuite, enfin, par exemple, ainsi, c\'est pourquoi.*',
          ],
        },
      ],
      items: [
        {
          id: 'h-w-totale', type: 'decrire', sujet: 'Montre que la Première Guerre mondiale est une guerre totale', emoji: '🏭',
          indices: ['conscription', '2 août 1914', '3 millions', 'reconversion', 'Renault', 'obus', 'emprunts', 'munitionnettes', 'propagande', 'censure', 'génocide des Arméniens'],
          consigne: 'Rédige un développement construit de quelques lignes : comment la guerre mobilise les hommes, l\'économie et les civils.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'La Première Guerre mondiale est une guerre totale, car elle mobilise toutes les forces des pays en guerre. D\'abord, elle mobilise les hommes : en France, grâce à la conscription, la mobilisation générale du 2 août 1914 envoie plus de 3 millions d\'hommes au front. Ensuite, elle mobilise l\'économie : les usines civiles se reconvertissent dans la production de guerre, comme Renault, qui fabrique plus de 2 millions d\'obus en 1918. L\'État intervient davantage : il augmente les impôts et lance des emprunts, avec des affiches comme « Pour la France, versez votre or ». Enfin, elle mobilise les civils : les femmes remplacent les hommes dans les usines, comme les munitionnettes, et dans les champs ; la propagande et la censure encadrent l\'arrière. Les civils sont aussi des victimes, comme les Arméniens, victimes d\'un génocide en 1915-1916.',
          criteres: [
            { id: 'hommes', texte: 'Les hommes mobilisés : la conscription ou la mobilisation générale (2 août 1914, plus de 3 millions)' },
            { id: 'economie', texte: 'L\'économie mobilisée : la reconversion des usines (un exemple : Renault, les obus), ou l\'État qui intervient (impôts, emprunts)' },
            { id: 'civils', texte: 'Les civils mobilisés ou touchés : les femmes (munitionnettes), la propagande ou la censure, ou des civils victimes (occupation, génocide des Arméniens)' },
          ],
        },
      ],
    },

    // ═══ Séance 4 — les conséquences, et la frise ════════════════════════

    {
      id: 'h4-consequences',
      seance: 4,
      titre: 'De lourdes conséquences',
      sousTitre: 'Le bilan, la mémoire, la paix',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Un bilan dramatique',
          colonnes: ['', 'Combien ?'],
          lignes: [
            ['soldats **mobilisés** (Europe, colonies, Amérique)', '**70 millions**'],
            ['**morts**', '**10 millions**'],
            ['**blessés**', '**21 millions**, dont **6 millions** de **mutilés**, comme les « **gueules cassées** »'],
            ['**veuves** et **orphelins**', '**3 millions** de veuves, **6 millions** d\'orphelins'],
          ],
        },
        {
          type: 'regle',
          titre: 'Des sociétés marquées',
          lignes: [
            'Les morts et les naissances qui manquent font **vieillir** la population de l\'Europe. S\'y ajoute la **grippe espagnole** (1918-1919) : entre 20 et 100 millions de morts dans le monde, environ 240 000 en France.',
            'La « **génération du feu** » est **traumatisée** ; habitués à tuer, d\'anciens soldats nourrissent la violence d\'après-guerre dans plusieurs pays. Mais beaucoup de **vétérans** deviennent **pacifistes**, surtout en France : que ce soit « la **der des ders** ».',
            'Une **loi de 1919** demande aux communes d\'honorer leurs morts : on élève des **monuments aux morts**. Les zones de combat sont ravagées, des villes sont à **reconstruire**.',
          ],
        },
        {
          type: 'regle',
          titre: 'Une nouvelle organisation du monde',
          lignes: [
            'L\'**armistice** est signé le **11 novembre 1918**. En **1919**, la **conférence de la paix** réunit les **vainqueurs** à **Paris**.',
            'Le **traité de Versailles** est signé le **28 juin 1919**, dans la **galerie des Glaces**. L\'**Allemagne**, déclarée **responsable** de la guerre, doit payer de lourdes **réparations** ; elle perd ses **colonies** et une partie de son territoire, dont l\'**Alsace-Moselle**, rendue à la France ; son armée est limitée à **100 000 hommes**. Elle dénonce un **Diktat** : une paix imposée.',
            'En 1919 et 1920, d\'autres traités **démembrent** l\'**Autriche-Hongrie** et l\'**Empire ottoman** : de **nouveaux États** naissent.',
            'La **SDN** (Société des Nations) est créée pour **maintenir la paix** ; elle s\'installe à **Genève** en 1920. Les **États-Unis** n\'en font **pas partie**.',
          ],
        },
      ],
      items: [
        {
          id: 'h-armistice', type: 'reponse', question: 'Quelle est la date de l\'armistice ?', attendu: '11 novembre 1918',
          accepte: ['le 11 novembre 1918', '11/11/1918'],
          explication: 'Le 11 novembre 1918 : la fin des combats.',
        },
        {
          id: 'h-morts', type: 'choix', consigne: BLOC, phrase: 'Combien de morts la Première Guerre mondiale fait-elle ?',
          options: ['10 millions', '1 million', '100 millions'], attendu: '10 millions',
          explication: 'Et 21 millions de blessés, 70 millions de mobilisés.',
        },
        { id: 'h-t-gueules', type: 'terme', definition: 'Le surnom des soldats défigurés par leurs blessures', attendu: 'gueules cassées', accepte: ['les gueules cassées'] },
        { id: 'h-t-diktat', type: 'terme', definition: 'Le nom que les Allemands donnent au traité de Versailles : une paix imposée', attendu: 'Diktat', accepte: ['un diktat', 'le diktat'] },
        {
          id: 'h-t-sdn', type: 'terme', definition: 'L\'organisation créée pour maintenir la paix, installée à Genève en 1920', attendu: 'SDN',
          accepte: ['Société des Nations', 'la SDN', 'la Société des Nations', 'S.D.N.'],
        },
        {
          id: 'h-versailles-date', type: 'reponse', question: 'Quand le traité de Versailles est-il signé ?', attendu: '28 juin 1919',
          accepte: ['le 28 juin 1919', '28/06/1919', '28/6/1919'],
          explication: 'Le 28 juin 1919, dans la galerie des Glaces — cinq ans jour pour jour après l\'attentat de Sarajevo.',
        },
        {
          id: 'h-versailles-allemagne', type: 'choix', consigne: BLOC, phrase: 'Que doit faire l\'Allemagne d\'après le traité de Versailles ?',
          options: ['Payer des réparations, perdre ses colonies et l\'Alsace-Moselle, limiter son armée à 100 000 hommes', 'Recevoir l\'Alsace-Moselle et de nouvelles colonies', 'Annexer la Belgique'],
          attendu: 'Payer des réparations, perdre ses colonies et l\'Alsace-Moselle, limiter son armée à 100 000 hommes',
          explication: 'Déclarée responsable de la guerre, elle dénonce un Diktat.',
        },
        {
          id: 'h-monuments', type: 'choix', consigne: BLOC, phrase: 'Que font les communes, après une loi de 1919 ?',
          options: ['Elles honorent leurs morts par un monument aux morts', 'Elles construisent une caserne', 'Elles accueillent un régiment américain'],
          attendu: 'Elles honorent leurs morts par un monument aux morts',
          explication: 'On en trouve dans presque toutes les communes de France.',
        },
        {
          id: 'h-der', type: 'choix', consigne: BLOC, phrase: 'Que veut dire « la der des ders » ?',
          options: ['La dernière des dernières guerres : beaucoup d\'anciens soldats deviennent pacifistes', 'La dernière bataille de 1918', 'Le dernier soldat mort au front'],
          attendu: 'La dernière des dernières guerres : beaucoup d\'anciens soldats deviennent pacifistes',
          explication: 'Surtout en France.',
        },
        {
          id: 'h-grippe', type: 'choix', consigne: BLOC, phrase: 'Quelle épidémie frappe le monde en 1918-1919 ?',
          options: ['La grippe espagnole', 'La peste', 'Le choléra'], attendu: 'La grippe espagnole',
          explication: 'Entre 20 et 100 millions de morts dans le monde.',
        },
        {
          id: 'h-usa-sdn', type: 'choix', consigne: BLOC, phrase: 'Quel grand pays ne fait pas partie de la SDN ?',
          options: ['Les États-Unis', 'La France', 'Le Royaume-Uni'], attendu: 'Les États-Unis',
          explication: 'La SDN s\'installe à Genève en 1920, sans eux.',
        },
        {
          id: 'h-empires', type: 'choix', consigne: BLOC, phrase: 'Que deviennent l\'Autriche-Hongrie et l\'Empire ottoman après la guerre ?',
          options: ['Ils sont démembrés, et de nouveaux États naissent', 'Ils s\'agrandissent', 'Ils deviennent des colonies françaises'],
          attendu: 'Ils sont démembrés, et de nouveaux États naissent',
          explication: 'Par les traités de 1919 et 1920.',
        },
      ],
    },

    {
      id: 'h4-frise',
      seance: 4,
      titre: 'La frise chronologique',
      sousTitre: 'Les dates et les phases de la guerre',
      duree: 3,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les dates à connaître',
          colonnes: ['Date', 'Événement'],
          lignes: [
            ['**28 juin 1914**', 'l\'attentat de **Sarajevo**'],
            ['**août 1914**', 'le **début de la guerre**'],
            ['**septembre 1914**', 'la **bataille de la Marne**'],
            ['**1915**', 'le début du **génocide des Arméniens**'],
            ['**1916**', 'les batailles de **Verdun** et de la **Somme**'],
            ['**1917**', 'les **révolutions russes** ; en **avril**, l\'**entrée en guerre des États-Unis** ; en **décembre**, l\'**armistice germano-russe**'],
            ['**1918**', 'la **seconde bataille de la Marne** ; le **11 novembre**, l\'**armistice**'],
            ['**janvier 1919**', 'la **conférence de la paix** s\'ouvre à Paris'],
            ['**28 juin 1919**', 'le **traité de Versailles**'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Deux phases : la **guerre de mouvement** en **1914**, et de nouveau en **1918** ; la **guerre de position** de **1915 à 1917**.',
            'Il y a donc **deux batailles de la Marne** : en 1914, et en 1918.',
          ],
        },
      ],
      items: [
        {
          id: 'h-frise', type: 'ordre', consigne: 'Remets ces événements dans l\'ordre chronologique :',
          elements: [
            'L\'attentat de Sarajevo',
            'La première bataille de la Marne',
            'La bataille de Verdun',
            'L\'entrée en guerre des États-Unis',
            'L\'armistice germano-russe',
            'L\'armistice du 11 novembre',
            'Le traité de Versailles',
          ],
        },
        {
          id: 'h-phases', type: 'ordre', consigne: 'Remets les phases de la guerre dans l\'ordre :',
          elements: [
            'La guerre de mouvement et la course à la mer',
            'La guerre des tranchées',
            'Le retour de la guerre de mouvement',
            'L\'armistice',
            'La conférence de la paix',
          ],
        },
        {
          id: 'h-duree', type: 'reponse', question: 'De quelle année à quelle année la guerre dure-t-elle ? (écris les deux années)', attendu: '1914-1918',
          accepte: ['1914 - 1918', 'de 1914 à 1918', '1914 à 1918', '1914–1918', '1914 1918', '1914 et 1918', 'entre 1914 et 1918'],
          explication: 'De l\'été 1914 au 11 novembre 1918.',
        },
        {
          id: 'h-phase-1916', type: 'choix', consigne: BLOC, phrase: 'En 1916, dans quelle phase de la guerre est-on ?',
          options: ['La guerre de position', 'La guerre de mouvement', 'L\'après-guerre'], attendu: 'La guerre de position',
          explication: 'De 1915 à 1917 : Verdun et la Somme en 1916.',
        },
        {
          id: 'h-deux-marne', type: 'choix', consigne: BLOC, phrase: 'Combien y a-t-il eu de batailles de la Marne ?',
          options: ['Deux : en 1914 et en 1918', 'Une seule, en 1914', 'Une seule, en 1916'], attendu: 'Deux : en 1914 et en 1918',
          explication: 'La première arrête les Allemands en 1914 ; la seconde, en 1918, annonce la victoire alliée.',
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 10,
    tirage: [
      { etape: 'h1-causes', nombre: 3 },
      { etape: 'h1-engrenage', nombre: 2 },
      { etape: 'h1-mouvement', nombre: 3 },
      { etape: 'h2-tranchees', nombre: 3 },
      { etape: 'h2-1917', nombre: 2 },
      { etape: 'h3-economie', nombre: 2 },
      { etape: 'h3-civils', nombre: 3 },
      { etape: 'h3-armeniens', nombre: 1 },
      { etape: 'h4-consequences', nombre: 2 },
      { etape: 'h4-frise', nombre: 1 },
    ],
  },
};
