// Chapitre 1 — Les objets techniques : fiches 1, 2 et 3 du cours.
//
// D'après le document « Révisions 1 » transmis par Denis : les fiches du
// cahier de technologie d'Evan. Fiche 1 « Les objets et systèmes
// techniques », fiche 2 « Analyser un objet technique », fiche 3
// « Représenter un objet technique » (SysML). Une séance par fiche.
//
// La fiche de l'appli résume en notes, sans recopier le cours (le dépôt est
// public) ; les définitions courtes restent proches des siennes, puisque ce
// sont elles qu'Evan doit restituer. Les exemples des questions de
// classement (les critères d'évolution, les impacts) sont écrits pour
// l'appli ; ceux de la fiche sont ceux du cours : le marteau, le smartphone,
// la gourde, la trottinette électrique, la lampe automatique.
//
// Le cours donne « la découverte de l'électricité (fin du XVIIIe siècle) »
// comme exemple d'invention : la fiche le reprend, mais aucune question ne
// porte dessus — une découverte n'est pas tout à fait une invention, et la
// définition du cours suffit.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';

export default {
  id: 'ch01',
  numero: 1,
  titre: 'Les objets techniques',
  detail: 'Fiche 1 · Les objets et systèmes techniques · Fiche 2 · Analyser un objet · Fiche 3 · Le représenter avec SysML',

  // Ce que Merlin sait du chapitre quand il corrige une réponse rédigée.
  profilMerlin: 'Élève de 3e. Technologie, fiches 1 à 3 du cours. Un objet ou système technique (OST) est fabriqué par '
    + 'l\'être humain pour répondre à un besoin. Objet technique : réalise une fonction simple (le marteau : frapper). '
    + 'Système technique : ensemble de composants qui interagissent pour réaliser une ou plusieurs fonctions (le smartphone : '
    + 'batterie pour l\'alimentation, processeur pour le traitement, réseau pour la communication, applications). Invention : '
    + 'création d\'une idée, d\'un objet ou d\'un procédé nouveau (exemple du cours : la découverte de l\'électricité, fin du XVIIIe siècle). '
    + 'Innovation : amélioration ou mise en application nouvelle d\'une invention (l\'ampoule à incandescence remplacée par '
    + 'l\'ampoule LED, plus performante). Innovation de rupture : innovation qui transforme profondément les usages et la '
    + 'société (l\'intelligence artificielle générative). Famille d\'objets : objets qui répondent au même besoin et '
    + 'remplissent la même fonction d\'usage (vélo, moto, voiture, bus : se déplacer sur terre). Lignée d\'objets : objets '
    + 'd\'une même famille rangés dans l\'ordre de leur évolution, avec le même principe technique réalisé par des solutions '
    + 'différentes et améliorées (Ford Model T 1908, Citroën 2CV 1948, Renault 5 1972, Renault Clio 1990 : un moteur à '
    + 'combustion interne entraîne les roues). Les objets évoluent pour mieux répondre aux besoins de la société : besoins, '
    + 'performances, sécurité, confort et ergonomie, coût, matériaux, énergie, environnement, numérique et automatisation. '
    + 'Analyser un objet : besoin (nécessité ou désir à satisfaire), fonction d\'usage (à quoi sert l\'objet), principe '
    + 'technique (phénomène ou loi scientifique utilisée), fonction technique (action réalisée par une partie de l\'objet pour '
    + 'assurer la fonction d\'usage), solutions techniques (moyens concrets choisis pour réaliser la fonction technique). La '
    + 'gourde : besoin boire en déplacement ; fonction d\'usage permettre de transporter et de boire de l\'eau ; fonction '
    + 'technique assurer l\'étanchéité (empêcher l\'eau de s\'écouler), principe d\'étanchéité avec un joint ; solutions '
    + 'techniques le bouchon, le filetage, le joint ; composants : le corps en inox (contenir), le bouchon (fermer), le joint '
    + '(étanchéité). Composants : éléments matériels qui assurent une fonction ; structure : organisation et liens entre les '
    + 'composants. Contraintes : limites à respecter (obligations ou souhaits) ; critères de choix : éléments de comparaison '
    + 'pour choisir ; caractéristiques et performances : propriétés mesurables ; coût et indice de réparabilité (sur 10). '
    + 'Expérience utilisateur ; impacts des OST sur la société ; impacts des contraintes sociétales sur les OST. SysML : '
    + 'langage de modélisation pour représenter un objet ou un système technique, avec des diagrammes complémentaires : '
    + 'des besoins (pourquoi ?), de contexte (où et avec qui ?), des exigences (quelles contraintes ?), des cas d\'utilisation '
    + '(qui fait quoi ? les services rendus aux acteurs), de séquence (dans quel ordre ? la chronologie des messages entre '
    + 'les éléments), d\'activité (comment ça fonctionne ? l\'enchaînement des actions et des décisions). Exemples du cours : '
    + 'la trottinette électrique (contexte, exigences, cas d\'utilisation démarrer-rouler-s\'arrêter, séquence de démarrage '
    + 'utilisateur → IHM → contrôleur → moteur) et la lampe automatique (activité : si une présence est détectée, la lampe '
    + 's\'allume, sinon elle reste éteinte).',

  seances: [
    { numero: 1, partie: 'Fiche 1', titre: 'Les objets et systèmes techniques' },
    { numero: 2, partie: 'Fiche 2', titre: 'Analyser un objet technique' },
    { numero: 3, partie: 'Fiche 3', titre: 'Représenter un objet technique : SysML' },
  ],

  etapes: [
    // ═══ Séance 1 — fiche 1 : les objets et systèmes techniques ══════════

    {
      id: 'o1-ost',
      seance: 1,
      titre: 'Objet ou système technique ?',
      sousTitre: 'L\'OST, le marteau, le smartphone',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'L\'OST',
          lignes: [
            'Un **objet ou système technique** (**OST**) est fabriqué par l\'être humain pour **répondre à un besoin**.',
            'Un **objet technique** réalise une **fonction simple**. Le **marteau** : une seule action, frapper.',
            'Un **système technique** est un **ensemble de composants qui interagissent** pour réaliser **une ou plusieurs fonctions**. Le **smartphone** : un système complexe, avec un écran, des capteurs (photo…), un micro, un haut-parleur, et les composants du tableau.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Le smartphone et ses composants',
          colonnes: ['Composant', 'Ce qu\'il assure'],
          lignes: [
            ['la **batterie**', 'l\'alimentation'],
            ['le **processeur**', 'le traitement'],
            ['le **réseau**', 'la communication'],
            ['les **applications**', 'des fonctions variées'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Un **objet** technique fait **une** chose ; un **système** réunit **plusieurs composants** qui travaillent **ensemble**.',
          ],
        },
      ],
      items: [
        {
          id: 'ost-sigle', type: 'choix', consigne: BLOC, phrase: 'Le sigle OST veut dire…',
          options: ['objet ou système technique', 'outil simple et technique', 'objet sans technologie'], attendu: 'objet ou système technique',
          explication: 'Un objet ou système technique, fabriqué par l\'être humain pour répondre à un besoin.',
        },
        {
          id: 'ost-t-objet', type: 'terme', definition: 'Un objet fabriqué par l\'être humain qui réalise une fonction simple, comme le marteau',
          attendu: 'objet technique', accepte: ['objet technique simple'],
          pieges: [{ si: ['système technique', 'système technique complexe'], message: 'Un système réunit plusieurs composants qui interagissent. Le marteau ne fait qu\'une chose, frapper : c\'est un objet technique.' }],
        },
        {
          id: 'ost-t-systeme', type: 'terme', definition: 'Un ensemble de composants qui interagissent pour réaliser une ou plusieurs fonctions, comme le smartphone',
          attendu: 'système technique', accepte: ['système technique complexe'],
          pieges: [{ si: ['objet technique', 'objet technique simple'], message: 'Un objet technique ne réalise qu\'une fonction simple. Plusieurs composants qui interagissent : un système technique.' }],
        },
        {
          id: 'ost-marteau', type: 'choix', consigne: BLOC, phrase: 'Le marteau est…',
          options: ['un objet technique simple', 'un système technique complexe', 'une innovation de rupture'], attendu: 'un objet technique simple',
          explication: 'Il réalise une action unique : frapper.',
        },
        {
          id: 'ost-smartphone', type: 'choix', consigne: BLOC, phrase: 'Le smartphone est…',
          options: ['un système technique complexe', 'un objet technique simple', 'une famille d\'objets'], attendu: 'un système technique complexe',
          explication: 'Plusieurs composants (écran, batterie, processeur…) et plusieurs fonctions.',
        },
        {
          id: 'ost-batterie', type: 'choix', consigne: BLOC, phrase: 'Dans le smartphone, la batterie assure…',
          options: ['l\'alimentation', 'le traitement', 'la communication'], attendu: 'l\'alimentation',
          explication: 'La batterie alimente ; le processeur traite ; le réseau communique.',
        },
        {
          id: 'ost-processeur', type: 'choix', consigne: BLOC, phrase: 'Dans le smartphone, le processeur assure…',
          options: ['le traitement', 'l\'alimentation', 'la communication'], attendu: 'le traitement',
          explication: 'Le processeur traite les informations.',
        },
      ],
    },

    {
      id: 'o1-innovation',
      seance: 1,
      titre: 'Invention, innovation, rupture',
      sousTitre: 'Créer, améliorer, bouleverser',
      duree: 3,
      fiche: [
        {
          type: 'tableau',
          titre: 'Trois mots à ne pas confondre',
          colonnes: ['', 'Ce que c\'est', 'L\'exemple du cours'],
          lignes: [
            ['**Invention**', 'la **création** d\'une idée, d\'un objet ou d\'un procédé **nouveau**', 'la découverte de l\'électricité, à la fin du XVIIIe siècle'],
            ['**Innovation**', 'l\'**amélioration** d\'une invention, ou sa **mise en application** nouvelle', 'l\'ampoule LED, plus performante, remplace l\'ampoule à incandescence'],
            ['**Innovation de rupture**', 'une innovation qui **transforme profondément** les usages et la société', 'l\'intelligence artificielle générative : on apprend, travaille et communique autrement'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'L\'invention **crée** du nouveau ; l\'innovation **améliore** ou **applique** ce qui existe déjà.',
          ],
        },
      ],
      items: [
        {
          id: 'inv-t-invention', type: 'terme', definition: 'La création d\'une idée, d\'un objet ou d\'un procédé nouveau',
          attendu: 'invention',
          pieges: [{ si: 'innovation', message: 'L\'innovation améliore une invention ou la met en application. Créer quelque chose de nouveau, c\'est l\'invention.' }],
        },
        {
          id: 'inv-t-innovation', type: 'terme', definition: 'L\'amélioration d\'une invention, ou sa mise en application nouvelle',
          attendu: 'innovation',
          pieges: [{ si: 'invention', message: 'L\'invention crée du nouveau. Améliorer une invention, ou l\'appliquer autrement, c\'est l\'innovation.' }],
        },
        {
          id: 'inv-t-rupture', type: 'terme', definition: 'Une innovation qui transforme profondément les usages et la société',
          attendu: 'innovation de rupture',
          pieges: [{ si: 'innovation', resultat: 'presque', message: 'Oui, mais une innovation qui bouleverse les usages et la société porte un nom précis : une innovation de rupture.' }],
        },
        {
          id: 'inv-led', type: 'choix', consigne: BLOC, phrase: 'Le passage de l\'ampoule à incandescence à l\'ampoule LED est…',
          options: ['une innovation', 'une invention', 'une innovation de rupture'], attendu: 'une innovation',
          explication: 'La LED améliore l\'éclairage, elle est plus performante : une innovation.',
        },
        {
          id: 'inv-ia', type: 'choix', consigne: BLOC, phrase: 'L\'intelligence artificielle générative, qui change nos façons d\'apprendre, de travailler et de communiquer, est…',
          options: ['une innovation de rupture', 'une invention', 'une famille d\'objets'], attendu: 'une innovation de rupture',
          explication: 'Elle transforme profondément les usages et la société.',
        },
        {
          id: 'inv-ordre', type: 'ordre', consigne: 'Remets dans l\'ordre, de la création à la transformation de la société :',
          elements: ['L\'invention', 'L\'innovation', 'L\'innovation de rupture'],
        },
      ],
    },

    {
      id: 'o1-familles',
      seance: 1,
      titre: 'Famille et lignée d\'objets',
      sousTitre: 'Même besoin, même principe technique',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'La famille d\'objets',
          lignes: [
            'Une **famille d\'objets** : des objets qui répondent au **même besoin** et remplissent la **même fonction d\'usage**.',
            'Le vélo, la moto, la voiture, le bus : la famille des moyens de transport terrestre. Le besoin : **se déplacer sur terre**.',
          ],
        },
        {
          type: 'regle',
          titre: 'La lignée d\'objets',
          lignes: [
            'Une **lignée d\'objets** : des objets d\'**une même famille**, rangés dans **l\'ordre de leur évolution**.',
            'Ils gardent le **même principe technique** (la même fonction technique), réalisé par des **solutions techniques différentes et améliorées**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'La lignée des voitures à moteur thermique',
          colonnes: ['Année', 'La voiture'],
          lignes: [
            ['1908', 'Ford Model T'],
            ['1948', 'Citroën 2CV'],
            ['1972', 'Renault 5'],
            ['1990', 'Renault Clio'],
            ['aujourd\'hui', 'Renault Clio'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**Famille** : le même **besoin**. **Lignée** : le même **principe technique** — ici, un moteur à combustion interne entraîne les roues —, dans l\'ordre du temps.',
          ],
        },
      ],
      items: [
        {
          id: 'fam-t-famille', type: 'terme', definition: 'Des objets qui répondent au même besoin et remplissent la même fonction d\'usage',
          attendu: 'famille d\'objets', accepte: ['famille'],
          pieges: [{ si: ['lignée d\'objets', 'lignée'], message: 'Une lignée, c\'est le même principe technique, dans l\'ordre du temps. Le même besoin, c\'est une famille d\'objets.' }],
        },
        {
          id: 'fam-t-lignee', type: 'terme', definition: 'Des objets d\'une même famille, rangés dans l\'ordre de leur évolution, qui gardent le même principe technique',
          attendu: 'lignée d\'objets', accepte: ['lignée'],
          pieges: [{ si: ['famille d\'objets', 'famille'], message: 'Une famille réunit des objets qui ont le même besoin. Rangés dans le temps, avec le même principe technique : une lignée.' }],
        },
        {
          id: 'fam-transport', type: 'choix', consigne: BLOC, phrase: 'Le vélo, la moto, la voiture et le bus forment…',
          options: ['une famille d\'objets', 'une lignée d\'objets', 'un système technique'], attendu: 'une famille d\'objets',
          explication: 'Le même besoin, se déplacer sur terre. Mais pas le même principe technique : ce n\'est pas une lignée.',
        },
        {
          id: 'fam-principe', type: 'choix', consigne: BLOC, phrase: 'Le principe technique commun à la lignée des voitures à moteur thermique, c\'est que…',
          options: ['un moteur à combustion interne entraîne les roues', 'un moteur électrique entraîne les roues', 'les pédales entraînent les roues'],
          attendu: 'un moteur à combustion interne entraîne les roues',
          explication: 'De la Ford Model T à la Clio, le même principe : un moteur à combustion interne entraîne les roues.',
        },
        {
          id: 'fam-ordre', type: 'ordre', consigne: 'Range la lignée des voitures à moteur thermique, de la plus ancienne à la plus récente :',
          elements: ['Ford Model T', 'Citroën 2CV', 'Renault 5', 'Renault Clio (1990)'],
        },
      ],
    },

    {
      id: 'o1-evolution',
      seance: 1,
      titre: 'Pourquoi les objets évoluent',
      sousTitre: 'Les critères d\'évolution',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: 'L\'évolution des objets techniques',
          lignes: [
            'Les objets techniques **évoluent** au cours du temps pour **mieux répondre aux besoins de la société**. Plusieurs **critères** guident cette évolution.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les critères d\'évolution',
          colonnes: ['Critère', 'Ce qu\'on cherche'],
          lignes: [
            ['les besoins', 'répondre aux besoins des utilisateurs'],
            ['les performances', 'plus d\'efficacité'],
            ['la sécurité', 'plus de sécurité'],
            ['le confort', 'le confort et l\'ergonomie'],
            ['le coût', 'le prix'],
            ['les matériaux', 'plus légers, plus résistants'],
            ['l\'énergie', 'consommer moins'],
            ['l\'environnement', 'moins d\'impact'],
            ['le numérique', 'l\'automatisation : des objets plus intelligents'],
          ],
        },
      ],
      items: [
        {
          id: 'evo-pourquoi', type: 'choix', consigne: BLOC, phrase: 'Pourquoi les objets techniques évoluent-ils ?',
          options: ['pour mieux répondre aux besoins de la société', 'parce que leur principe technique s\'use', 'pour changer de famille d\'objets'],
          attendu: 'pour mieux répondre aux besoins de la société',
          explication: 'Leur évolution suit les besoins de la société, selon plusieurs critères.',
        },
        {
          id: 'evo-materiaux', type: 'choix', consigne: BLOC, phrase: 'Un cadre de vélo en acier remplacé par un cadre en aluminium, plus léger : quel critère d\'évolution ?',
          options: ['les matériaux', 'le numérique', 'la sécurité'], attendu: 'les matériaux',
          explication: 'Des matériaux plus légers, plus résistants.',
        },
        {
          id: 'evo-numerique', type: 'choix', consigne: BLOC, phrase: 'Un chauffage qu\'on règle à distance depuis son smartphone : quel critère d\'évolution ?',
          options: ['le numérique et l\'automatisation', 'les matériaux', 'le coût'], attendu: 'le numérique et l\'automatisation',
          explication: 'Des objets plus intelligents, pilotés à distance.',
        },
        {
          id: 'evo-energie', type: 'choix', consigne: BLOC, phrase: 'Un réfrigérateur qui consomme moins d\'électricité : quel critère d\'évolution ?',
          options: ['l\'énergie', 'le confort', 'les matériaux'], attendu: 'l\'énergie',
          explication: 'Consommer moins d\'énergie.',
        },
        {
          id: 'evo-securite', type: 'choix', consigne: BLOC, phrase: 'Des airbags ajoutés dans les voitures : quel critère d\'évolution ?',
          options: ['la sécurité', 'le coût', 'l\'environnement'], attendu: 'la sécurité',
          explication: 'Ils protègent les passagers : la sécurité.',
        },
      ],
    },

    {
      id: 'o1-ecrit',
      seance: 1,
      titre: 'Rédiger : invention et innovation',
      sousTitre: 'Deux notions, deux exemples',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour rédiger',
          lignes: [
            'Pour chaque notion : **ce que c\'est**, puis **un exemple**.',
            'Pour relier : **alors que**, **au contraire**, **par exemple**.',
          ],
        },
      ],
      items: [
        {
          id: 'inv-w-difference', type: 'decrire', sujet: 'Explique la différence entre une invention et une innovation, avec un exemple pour chacune.', emoji: '💡',
          indices: ['invention', 'créer', 'nouveau', 'innovation', 'améliorer', 'mettre en application', 'ampoule LED', 'électricité'],
          consigne: 'Rédige quelques lignes : ce qu\'est une invention, ce qu\'est une innovation, et un exemple de chaque.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Une invention est la création d\'une idée, d\'un objet ou d\'un procédé nouveau : l\'exemple du cours est la découverte de l\'électricité, à la fin du XVIIIe siècle. Une innovation améliore une invention ou lui trouve une nouvelle application : par exemple, l\'ampoule LED, plus performante, a remplacé l\'ampoule à incandescence. L\'innovation part donc de ce qui existe déjà, alors que l\'invention crée quelque chose de nouveau.',
          criteres: [
            { id: 'invention', texte: 'L\'invention : la création de quelque chose de nouveau (une idée, un objet, un procédé)' },
            { id: 'innovation', texte: 'L\'innovation : l\'amélioration d\'une invention, ou sa mise en application nouvelle' },
            { id: 'exemples', texte: 'Un exemple juste pour chacune : une invention, puis une innovation' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — fiche 2 : analyser un objet technique ═════════════════

    {
      id: 'o2-comprendre',
      seance: 2,
      titre: 'Comprendre l\'objet',
      sousTitre: 'Du besoin aux solutions techniques',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Cinq mots, avec la gourde du cours',
          colonnes: ['Le mot', 'Ce que c\'est', 'La gourde'],
          lignes: [
            ['**Besoin**', 'une nécessité ou un désir à satisfaire', 'boire en déplacement'],
            ['**Fonction d\'usage**', 'à quoi sert l\'objet', 'permettre de transporter et de boire de l\'eau'],
            ['**Principe technique**', 'le phénomène ou la loi scientifique utilisée','l\'étanchéité grâce à un joint'],
            ['**Fonction technique**', 'l\'action réalisée par une partie de l\'objet pour assurer la fonction d\'usage', 'assurer l\'étanchéité : empêcher l\'eau de s\'écouler'],
            ['**Solutions techniques**', 'les moyens concrets choisis pour réaliser la fonction technique', 'le bouchon, le filetage, le joint'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'La **fonction d\'usage** répond à « à quoi sert l\'objet ? » ; une **fonction technique** est réalisée par **une partie** de l\'objet ; une **solution technique** est **concrète** : une pièce, un matériau.',
          ],
        },
      ],
      items: [
        { id: 'an-t-besoin', type: 'terme', definition: 'Une nécessité ou un désir à satisfaire', attendu: 'besoin' },
        {
          id: 'an-t-usage', type: 'terme', definition: 'Ce à quoi sert l\'objet pour son utilisateur',
          attendu: 'fonction d\'usage',
          pieges: [{ si: 'fonction technique', message: 'Une fonction technique est réalisée par une partie de l\'objet. À quoi sert l\'objet tout entier : sa fonction d\'usage.' }],
        },
        { id: 'an-t-principe', type: 'terme', definition: 'Le phénomène ou la loi scientifique sur lequel repose le fonctionnement de l\'objet', attendu: 'principe technique' },
        {
          id: 'an-t-ftechnique', type: 'terme', definition: 'Une action réalisée par une partie de l\'objet pour assurer la fonction d\'usage',
          attendu: 'fonction technique',
          pieges: [{ si: 'fonction d\'usage', message: 'La fonction d\'usage, c\'est à quoi sert l\'objet tout entier. L\'action d\'une partie de l\'objet : une fonction technique.' }],
        },
        {
          id: 'an-t-solution', type: 'terme', definition: 'Les moyens concrets (pièces, matériaux) choisis pour réaliser une fonction technique',
          attendu: 'solutions techniques', accepte: ['solution technique'],
          pieges: [{ si: ['composants', 'composant'], message: 'Les composants sont les éléments de l\'objet. Les moyens choisis pour réaliser une fonction technique s\'appellent les solutions techniques.' }],
        },
        {
          id: 'an-gourde-besoin', type: 'choix', consigne: BLOC, phrase: 'Pour la gourde, « boire en déplacement », c\'est…',
          options: ['le besoin', 'la fonction d\'usage', 'une fonction technique'], attendu: 'le besoin',
          explication: 'Le besoin : ce que l\'utilisateur veut faire, boire en déplacement.',
        },
        {
          id: 'an-gourde-usage', type: 'choix', consigne: BLOC, phrase: '« Permettre de transporter et de boire de l\'eau », c\'est…',
          options: ['la fonction d\'usage', 'le besoin', 'une solution technique'], attendu: 'la fonction d\'usage',
          explication: 'C\'est à quoi sert la gourde : sa fonction d\'usage.',
        },
        {
          id: 'an-gourde-etanche', type: 'choix', consigne: BLOC, phrase: '« Assurer l\'étanchéité » de la gourde, c\'est…',
          options: ['une fonction technique', 'la fonction d\'usage', 'une solution technique'], attendu: 'une fonction technique',
          explication: 'Une action réalisée par une partie de la gourde : une fonction technique.',
        },
        {
          id: 'an-gourde-joint', type: 'choix', consigne: BLOC, phrase: 'Le bouchon, le filetage et le joint de la gourde sont…',
          options: ['des solutions techniques', 'des fonctions techniques', 'des besoins'], attendu: 'des solutions techniques',
          explication: 'Des moyens concrets qui réalisent l\'étanchéité.',
        },
      ],
    },

    {
      id: 'o2-fonctionnement',
      seance: 2,
      titre: 'Les composants et la structure',
      sousTitre: 'Comment l\'objet fonctionne',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: 'Étudier le fonctionnement',
          lignes: [
            'Les **composants** : les éléments matériels qui assurent chacun une fonction dans le système.',
            'La **structure** du système : l\'organisation et les liens entre les composants, pour qu\'ils fonctionnent ensemble.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les composants de la gourde',
          colonnes: ['Le composant', 'Sa fonction'],
          lignes: [
            ['le corps en inox', 'contenir le liquide'],
            ['le bouchon', 'fermer'],
            ['le joint', 'assurer l\'étanchéité'],
          ],
        },
      ],
      items: [
        { id: 'an-t-composant', type: 'terme', definition: 'Un élément matériel qui assure une fonction dans le système', attendu: 'composant', accepte: ['composants'] },
        { id: 'an-t-structure', type: 'terme', definition: 'L\'organisation et les liens entre les composants, pour qu\'ils fonctionnent ensemble', attendu: 'structure', accepte: ['structure du système'] },
        {
          id: 'an-corps', type: 'choix', consigne: BLOC, phrase: 'Dans la gourde, le corps en inox sert à…',
          options: ['contenir le liquide', 'fermer la gourde', 'assurer l\'étanchéité'], attendu: 'contenir le liquide',
          explication: 'Le corps contient ; le bouchon ferme ; le joint assure l\'étanchéité.',
        },
        {
          id: 'an-joint-role', type: 'choix', consigne: BLOC, phrase: 'Dans la gourde, le joint sert à…',
          options: ['assurer l\'étanchéité', 'contenir le liquide', 'fermer la gourde'], attendu: 'assurer l\'étanchéité',
          explication: 'Le joint empêche l\'eau de s\'écouler.',
        },
      ],
    },

    {
      id: 'o2-evaluer',
      seance: 2,
      titre: 'Évaluer et choisir un objet',
      sousTitre: 'Contraintes, critères, performances, coût',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Les mots pour évaluer',
          colonnes: ['La notion', 'Ce que c\'est, et des exemples'],
          lignes: [
            ['**Contraintes**', 'les limites à respecter : des obligations ou des souhaits. Sécurité, réglementation, budget, environnement, ergonomie, esthétique…'],
            ['**Critères de choix**', 'les éléments qu\'on compare pour choisir la meilleure solution. Prix, poids, autonomie, fiabilité, impact environnemental, confort…'],
            ['**Caractéristiques et performances**', 'les propriétés mesurables qui disent l\'efficacité de l\'objet. La gourde : 0,75 L, 200 g, 25 cm, inox, étanche, 12 h d\'isolation thermique.'],
            ['**Coût**', 'le prix d\'achat, et les coûts d\'usage (entretien, pièces…). La gourde : 24,90 €.'],
            ['**Indice de réparabilité**', 'la facilité à réparer l\'objet, notée sur 10. La gourde : 8,5 / 10, facile à réparer (pièces disponibles).'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Une **contrainte** s\'impose : on doit la respecter. Un **critère de choix** sert à **comparer** des solutions entre elles.',
          ],
        },
      ],
      items: [
        {
          id: 'ev-t-contrainte', type: 'terme', definition: 'Une limite à respecter : une obligation ou un souhait',
          attendu: 'contrainte', accepte: ['contraintes'],
          pieges: [{ si: ['critère de choix', 'critères de choix'], message: 'Un critère de choix sert à comparer. Une limite qu\'on doit respecter : une contrainte.' }],
        },
        {
          id: 'ev-t-critere', type: 'terme', definition: 'Un élément qu\'on compare pour choisir la meilleure solution',
          attendu: 'critère de choix', accepte: ['critères de choix'],
          pieges: [{ si: ['contrainte', 'contraintes'], message: 'Une contrainte s\'impose. Un élément qu\'on compare pour choisir : un critère de choix.' }],
        },
        {
          id: 'ev-t-performance', type: 'terme', definition: 'Une propriété mesurable qui indique le niveau d\'efficacité de l\'objet',
          attendu: 'caractéristique', accepte: ['caractéristiques', 'performance', 'performances', 'caractéristiques et performances'],
        },
        { id: 'ev-t-reparabilite', type: 'terme', definition: 'La note sur 10 qui dit si un objet est facile à réparer', attendu: 'indice de réparabilité' },
        {
          id: 'ev-capacite', type: 'choix', consigne: BLOC, phrase: '« Capacité : 0,75 L », pour la gourde, c\'est…',
          options: ['une caractéristique', 'une contrainte', 'un critère de choix'], attendu: 'une caractéristique',
          explication: 'Une propriété mesurable : une caractéristique, ou une performance.',
        },
        {
          id: 'ev-reglementation', type: 'choix', consigne: BLOC, phrase: 'Respecter la réglementation, pour un objet, c\'est…',
          options: ['une contrainte', 'une caractéristique', 'un indice de réparabilité'], attendu: 'une contrainte',
          explication: 'Une obligation à respecter : une contrainte.',
        },
        {
          id: 'ev-note', type: 'choix', consigne: BLOC, phrase: 'Un indice de réparabilité de 8,5 / 10 veut dire que l\'objet est…',
          options: ['facile à réparer', 'impossible à réparer', 'cher à l\'achat'], attendu: 'facile à réparer',
          explication: 'Plus la note sur 10 est haute, plus l\'objet se répare facilement.',
        },
        {
          id: 'ev-usage', type: 'choix', consigne: BLOC, phrase: 'Les coûts d\'usage d\'un objet, ce sont…',
          options: ['l\'entretien et les pièces', 'le prix d\'achat', 'le poids de l\'objet'], attendu: 'l\'entretien et les pièces',
          explication: 'Après l\'achat, ce que coûte l\'objet quand on s\'en sert.',
        },
      ],
    },

    {
      id: 'o2-societe',
      seance: 2,
      titre: 'L\'utilisateur et la société',
      sousTitre: 'L\'expérience utilisateur, les impacts',
      duree: 2,
      fiche: [
        {
          type: 'tableau',
          titre: 'L\'objet, son utilisateur, la société',
          colonnes: ['La notion', 'Ce que c\'est', 'Ce qu\'on regarde'],
          lignes: [
            ['**Expérience utilisateur**', 'la satisfaction de l\'utilisateur quand il se sert de l\'objet', 'facilité d\'utilisation, confort, sécurité perçue, design'],
            ['**Impacts des OST sur la société**', 'leurs effets positifs et négatifs', 'économie, emplois, environnement, modes de vie, accessibilité, risques d\'usage'],
            ['**Impacts des contraintes sociétales sur les OST**', 'les exigences de la société qui influencent la conception des objets', 'normes et lois, transition écologique, santé et sécurité, inclusion, ressources limitées'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Dans un sens, **l\'objet change la société** : ce sont les impacts des OST. Dans l\'autre, **la société impose ses exigences à l\'objet** : ce sont les contraintes sociétales.',
          ],
        },
      ],
      items: [
        { id: 'so-t-experience', type: 'terme', definition: 'La satisfaction de l\'utilisateur quand il se sert de l\'objet', attendu: 'expérience utilisateur' },
        {
          id: 'so-emplois', type: 'choix', consigne: BLOC, phrase: 'Des robots qui suppriment des emplois dans une usine, et en créent d\'autres pour les entretenir, c\'est…',
          options: ['un impact des OST sur la société', 'une contrainte sociétale sur les OST', 'l\'expérience utilisateur'], attendu: 'un impact des OST sur la société',
          explication: 'L\'objet change la société, ici l\'emploi.',
        },
        {
          id: 'so-loi', type: 'choix', consigne: BLOC, phrase: 'Une loi qui oblige les fabricants à afficher un indice de réparabilité, c\'est…',
          options: ['une contrainte sociétale qui influence les OST', 'un impact des OST sur la société', 'l\'expérience utilisateur'],
          attendu: 'une contrainte sociétale qui influence les OST',
          explication: 'La société impose une exigence à la conception des objets.',
        },
        {
          id: 'so-ux', type: 'choix', consigne: BLOC, phrase: 'Un objet facile à utiliser, confortable et agréable : on parle de…',
          options: ['l\'expérience utilisateur', 'l\'indice de réparabilité', 'la structure du système'], attendu: 'l\'expérience utilisateur',
          explication: 'La satisfaction de celui qui s\'en sert.',
        },
      ],
    },

    {
      id: 'o2-ecrit',
      seance: 2,
      titre: 'Rédiger : analyser la gourde',
      sousTitre: 'Fonction d\'usage, fonction technique, solutions',
      duree: 5,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour rédiger',
          lignes: [
            'Commence par **à quoi sert** l\'objet, puis **ce que fait une partie** de l\'objet, puis **avec quoi** elle le fait.',
          ],
        },
      ],
      items: [
        {
          id: 'an-w-gourde', type: 'decrire', sujet: 'Pour une gourde, explique la différence entre sa fonction d\'usage et une fonction technique, et donne les solutions techniques qui réalisent cette fonction technique.', emoji: '💧',
          indices: ['fonction d\'usage', 'à quoi sert', 'transporter et boire', 'fonction technique', 'une partie de l\'objet', 'étanchéité', 'bouchon', 'filetage', 'joint'],
          consigne: 'Rédige quelques lignes : la fonction d\'usage de la gourde, une de ses fonctions techniques, et les solutions techniques qui la réalisent.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'La fonction d\'usage dit à quoi sert l\'objet pour son utilisateur : la gourde permet de transporter et de boire de l\'eau. Une fonction technique est une action réalisée par une partie de l\'objet pour assurer la fonction d\'usage : par exemple, assurer l\'étanchéité, c\'est-à-dire empêcher l\'eau de s\'écouler. Les solutions techniques choisies pour la réaliser sont le bouchon, le filetage et le joint.',
          criteres: [
            { id: 'usage', texte: 'La fonction d\'usage : à quoi sert l\'objet — pour la gourde, transporter et boire de l\'eau' },
            { id: 'technique', texte: 'Une fonction technique : l\'action d\'une partie de l\'objet — par exemple assurer l\'étanchéité' },
            { id: 'solutions', texte: 'Les solutions techniques qui réalisent cette fonction technique : par exemple le bouchon, le filetage, le joint' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — fiche 3 : représenter un objet avec SysML ═════════════

    {
      id: 'o3-sysml',
      seance: 3,
      titre: 'SysML',
      sousTitre: 'Un langage, plusieurs diagrammes',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: 'SysML',
          lignes: [
            '**SysML** est un **langage de modélisation** : il sert à **représenter** un objet ou un système technique.',
            'Il utilise **plusieurs diagrammes complémentaires** : chacun montre une facette du système.',
            'Les six du cours : le diagramme **des besoins**, **de contexte**, **des exigences**, **des cas d\'utilisation**, **de séquence** et **d\'activité**.',
          ],
        },
      ],
      items: [
        { id: 'sy-t-sysml', type: 'terme', definition: 'Le langage de modélisation qui représente un objet ou un système technique avec plusieurs diagrammes', attendu: 'SysML' },
        {
          id: 'sy-role', type: 'choix', consigne: BLOC, phrase: 'SysML sert à…',
          options: ['représenter un objet ou un système technique', 'programmer un robot', 'mesurer l\'énergie consommée'], attendu: 'représenter un objet ou un système technique',
          explication: 'C\'est un langage de modélisation : il représente le système avec des diagrammes.',
        },
        {
          id: 'sy-intrus', type: 'choix', consigne: BLOC, phrase: 'Lequel n\'est PAS un diagramme SysML du cours ?',
          options: ['le diagramme en barres', 'le diagramme de séquence', 'le diagramme de contexte'], attendu: 'le diagramme en barres',
          explication: 'Le diagramme en barres sert en mathématiques. SysML : besoins, contexte, exigences, cas d\'utilisation, séquence, activité.',
        },
      ],
    },

    {
      id: 'o3-questions',
      seance: 3,
      titre: 'À chaque diagramme sa question',
      sousTitre: 'Pourquoi ? Où ? Quelles contraintes ? Qui ? Dans quel ordre ? Comment ?',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'Le diagramme, sa question, ce qu\'il montre',
          colonnes: ['Le diagramme…', 'Sa question', 'Ce qu\'il montre'],
          lignes: [
            ['**des besoins**', '**Pourquoi ?**', 'le besoin auquel répond l\'objet'],
            ['**de contexte**', '**Où et avec qui ?**', 'les acteurs et les éléments de l\'environnement en interaction avec l\'objet'],
            ['**des exigences**', '**Quelles contraintes ?**', 'les exigences à respecter, fonctionnelles ou non'],
            ['**des cas d\'utilisation**', '**Qui fait quoi ?**', 'les services rendus aux utilisateurs, les acteurs'],
            ['**de séquence**', '**Dans quel ordre ?**', 'la chronologie des messages échangés entre les éléments du système'],
            ['**d\'activité**', '**Comment ça fonctionne ?**', 'l\'enchaînement des actions et des décisions'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**Séquence** : des **messages** échangés **dans l\'ordre** entre des éléments. **Activité** : des **actions** et des **décisions** (oui ou non) qui s\'enchaînent.',
          ],
        },
      ],
      items: [
        {
          id: 'sy-t-besoins', type: 'terme', definition: 'Le diagramme SysML qui répond à « Pourquoi ? » : le besoin auquel l\'objet doit répondre',
          attendu: 'diagramme des besoins', accepte: ['besoins', 'diagramme de besoins', 'diagramme du besoin'],
        },
        {
          id: 'sy-t-contexte', type: 'terme', definition: 'Le diagramme SysML qui répond à « Où et avec qui ? » : les acteurs et l\'environnement en interaction avec l\'objet',
          attendu: 'diagramme de contexte', accepte: ['contexte', 'diagramme du contexte'],
        },
        {
          id: 'sy-t-exigences', type: 'terme', definition: 'Le diagramme SysML qui répond à « Quelles contraintes ? » : les exigences à respecter',
          attendu: 'diagramme des exigences', accepte: ['exigences', 'diagramme d\'exigences'],
        },
        {
          id: 'sy-t-cas', type: 'terme', definition: 'Le diagramme SysML qui répond à « Qui fait quoi ? » : les services rendus aux utilisateurs',
          attendu: 'diagramme des cas d\'utilisation', accepte: ['cas d\'utilisation', 'diagramme de cas d\'utilisation'],
        },
        {
          id: 'sy-t-sequence', type: 'terme', definition: 'Le diagramme SysML qui répond à « Dans quel ordre ? » : la chronologie des messages échangés',
          attendu: 'diagramme de séquence', accepte: ['séquence', 'diagramme des séquences'],
          pieges: [{ si: ['diagramme d\'activité', 'activité'], message: 'Le diagramme d\'activité enchaîne des actions et des décisions. Des messages échangés dans l\'ordre : le diagramme de séquence.' }],
        },
        {
          id: 'sy-t-activite', type: 'terme', definition: 'Le diagramme SysML qui répond à « Comment ça fonctionne ? » : l\'enchaînement des actions et des décisions',
          attendu: 'diagramme d\'activité', accepte: ['activité', 'diagramme des activités'],
          pieges: [{ si: ['diagramme de séquence', 'séquence'], message: 'Le diagramme de séquence montre des messages dans l\'ordre. Des actions et des décisions qui s\'enchaînent : le diagramme d\'activité.' }],
        },
        {
          id: 'sy-ordre-messages', type: 'choix', consigne: BLOC, phrase: 'Pour montrer dans quel ordre l\'utilisateur, l\'IHM, le contrôleur et le moteur s\'échangent des messages, on utilise…',
          options: ['le diagramme de séquence', 'le diagramme d\'activité', 'le diagramme de contexte'], attendu: 'le diagramme de séquence',
          explication: 'Des messages échangés dans l\'ordre : le diagramme de séquence.',
        },
      ],
    },

    {
      id: 'o3-exemples',
      seance: 3,
      titre: 'Lire les diagrammes du cours',
      sousTitre: 'La trottinette électrique, la lampe automatique',
      duree: 4,
      fiche: [
        {
          type: 'tableau',
          titre: 'La trottinette électrique',
          colonnes: ['Le diagramme', 'Ce qu\'on y lit'],
          lignes: [
            ['des besoins', 'l\'utilisateur exprime un besoin : se déplacer plus facilement'],
            ['de contexte', 'autour de la trottinette : l\'utilisateur, l\'environnement (route, météo), le réseau (Wi-Fi, GPS), la réglementation (code de la route)'],
            ['des exigences', 'être légère (Id 1.1), avoir une autonomie d\'au moins 20 km (Id 1.2), être sécurisée (Id 1.3)'],
            ['des cas d\'utilisation', 'l\'utilisateur peut démarrer, rouler, s\'arrêter'],
            ['de séquence (le démarrage)', '1. l\'utilisateur appuie sur le bouton de l\'IHM · 2. l\'IHM envoie l\'ordre de démarrage au contrôleur · 3. le contrôleur active le moteur · 4. une confirmation revient à l\'utilisateur'],
          ],
        },
        {
          type: 'regle',
          titre: 'Le diagramme d\'activité : la lampe automatique',
          lignes: [
            'Détecter une présence → **présence détectée ?** → **oui** : allumer la lampe ; **non** : laisser la lampe éteinte.',
            'Le **losange** est une **décision** ; le rond noir marque le **début**, le rond cerclé la **fin**.',
          ],
        },
      ],
      items: [
        {
          id: 'sy-seq-ordre', type: 'ordre', consigne: 'Remets dans l\'ordre le diagramme de séquence du démarrage de la trottinette :',
          elements: [
            'L\'utilisateur appuie sur le bouton',
            'L\'IHM envoie l\'ordre de démarrage au contrôleur',
            'Le contrôleur active le moteur',
            'Une confirmation revient à l\'utilisateur',
          ],
        },
        {
          id: 'sy-ex-exigence', type: 'choix', consigne: BLOC, phrase: '« Avoir une autonomie d\'au moins 20 km » se lit dans…',
          options: ['le diagramme des exigences', 'le diagramme des cas d\'utilisation', 'le diagramme de contexte'], attendu: 'le diagramme des exigences',
          explication: 'Une exigence à respecter, avec son identifiant (Id 1.2).',
        },
        {
          id: 'sy-ex-contexte', type: 'choix', consigne: BLOC, phrase: 'La météo, la route et le code de la route apparaissent dans…',
          options: ['le diagramme de contexte', 'le diagramme de séquence', 'le diagramme des besoins'], attendu: 'le diagramme de contexte',
          explication: 'Où et avec qui : l\'environnement et la réglementation autour de la trottinette.',
        },
        {
          id: 'sy-ex-cas', type: 'choix', consigne: BLOC, phrase: '« Démarrer, rouler, s\'arrêter », les services rendus à l\'utilisateur, se lisent dans…',
          options: ['le diagramme des cas d\'utilisation', 'le diagramme d\'activité', 'le diagramme des exigences'], attendu: 'le diagramme des cas d\'utilisation',
          explication: 'Qui fait quoi : l\'utilisateur et les services que lui rend la trottinette.',
        },
        {
          id: 'sy-ex-losange', type: 'choix', consigne: BLOC, phrase: 'Dans le diagramme d\'activité de la lampe, « Présence détectée ? » est…',
          options: ['une décision', 'une exigence', 'un acteur'], attendu: 'une décision',
          explication: 'Le losange : une décision, avec deux sorties, oui ou non.',
        },
        {
          id: 'sy-ex-non', type: 'choix', consigne: BLOC, phrase: 'Si aucune présence n\'est détectée, la lampe automatique…',
          options: ['reste éteinte', 's\'allume', 'clignote'], attendu: 'reste éteinte',
          explication: 'Non : on laisse la lampe éteinte.',
        },
      ],
    },

    {
      id: 'o3-ecrit',
      seance: 3,
      titre: 'Rédiger : séquence ou activité ?',
      sousTitre: 'Deux diagrammes qu\'on confond',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Pour rédiger',
          lignes: [
            'Pour chaque diagramme : **sa question**, **ce qu\'il montre**, puis **un exemple du cours**.',
          ],
        },
      ],
      items: [
        {
          id: 'sy-w-sequence', type: 'decrire', sujet: 'Explique la différence entre le diagramme de séquence et le diagramme d\'activité, avec un exemple du cours pour chacun.', emoji: '📐',
          indices: ['dans quel ordre', 'messages', 'éléments du système', 'comment ça fonctionne', 'actions', 'décisions', 'trottinette', 'lampe automatique'],
          consigne: 'Rédige quelques lignes : à quelle question répond chaque diagramme, ce qu\'il montre, et un exemple.',
          titreModele: 'Une réponse d\'exemple',
          modele: 'Le diagramme de séquence répond à la question « dans quel ordre ? » : il montre la chronologie des messages échangés entre les éléments du système, comme le démarrage de la trottinette électrique, où l\'utilisateur appuie sur le bouton, puis l\'IHM transmet l\'ordre au contrôleur, qui active le moteur. Le diagramme d\'activité répond à « comment ça fonctionne ? » : il décrit l\'enchaînement des actions et des décisions, comme la lampe automatique, qui s\'allume seulement si une présence est détectée.',
          criteres: [
            { id: 'sequence', texte: 'Le diagramme de séquence : dans quel ordre — les messages échangés entre les éléments, dans l\'ordre du temps' },
            { id: 'activite', texte: 'Le diagramme d\'activité : comment ça fonctionne — l\'enchaînement des actions et des décisions' },
            { id: 'exemples', texte: 'Un exemple juste pour chacun : par exemple le démarrage de la trottinette, la lampe automatique' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 10,
    tirage: [
      { etape: 'o1-ost', nombre: 2 },
      { etape: 'o1-innovation', nombre: 2 },
      { etape: 'o1-familles', nombre: 2 },
      { etape: 'o1-evolution', nombre: 1 },
      { etape: 'o2-comprendre', nombre: 3 },
      { etape: 'o2-fonctionnement', nombre: 1 },
      { etape: 'o2-evaluer', nombre: 2 },
      { etape: 'o2-societe', nombre: 1 },
      { etape: 'o3-sysml', nombre: 1 },
      { etape: 'o3-questions', nombre: 3 },
      { etape: 'o3-exemples', nombre: 2 },
    ],
  },
};
