// Chapitre 1 — « Diversité et stabilité génétique des êtres vivants »
// (thème 1, « Le vivant et son évolution »).
//
// D'après le polycopié d'Evan, photographié par Denis : les activités 1 à 4,
// la tâche complexe de M. et Mme Martin, l'activité de synthèse et
// l'activité 7 ; les bilans 1, 2, 5, 6 et 7 ; le vocabulaire à maîtriser et
// « ce qui est attendu en fin de chapitre ». Il manque les pages entre
// l'activité 4 et la situation des Martin — sans doute la mitose (partie 4) et
// les bilans 3 et 4. Ce que la fiche dit de la mitose s'appuie donc sur le
// vocabulaire, le bilan 6, le tableau comparatif de la synthèse et le
// programme de 3e.
//
// Les définitions du vocabulaire à maîtriser sont reprises comme le cours les
// donne : c'est ce que le contrôle demande. Le reste de la fiche résume le
// cours en notes (le dépôt est public).
//
// Le bronzage n'est classé dans aucune question : selon les corrigés, il est
// « environnement » ou « les deux ». La fiche le signale ; c'est le classement
// fait en classe qui compte.
//
// Les identifiants ne se renumérotent jamais : la progression y est rangée.

const BLOC = 'Choisis la bonne réponse :';
const VISIBLE = 'Ce caractère est-il directement visible ?';
const CLASSER = 'Ce caractère dépend…';
const CLASSES = ['de l\'hérédité uniquement', 'de l\'environnement uniquement', 'des deux'];
const CROISEMENT = 'Tableau de croisement des Martin :';

export default {
  id: 'ch01',
  numero: 1,
  titre: 'Diversité et stabilité génétique des êtres vivants',
  detail: 'Phénotype · ADN et chromosomes · Gènes et allèles · Méiose et fécondation · Mutations',

  // Ce que Merlin sait du chapitre quand il corrige une réponse rédigée.
  profilMerlin: 'Élève de 3e. Chapitre de SVT « Diversité et stabilité génétique des êtres vivants ». Ce que dit son cours : '
    + 'le phénotype est l\'ensemble des caractères d\'un individu, observables à différentes échelles ; certains caractères sont '
    + 'héréditaires (groupe sanguin, couleur du pelage), d\'autres dus à l\'environnement (le hêtre tordu par le vent : ses graines, '
    + 'semées dans un milieu peu venté, donnent des arbres sans cette allure). Démarche J.O.D. : J\'observe / Or je sais / Donc '
    + 'j\'en déduis. Transfert de noyau : ovule de lapine noire énucléé, noyau d\'une cellule de lapine rousse, mère porteuse '
    + 'blanche, lapereau roux — l\'information génétique est dans le noyau. ADN déroulé hors division, enroulé en chromosomes '
    + 'pendant la division. Caryotype : chromosomes classés par paires selon leur taille ; 46 chromosomes, soit 23 paires, chez '
    + 'l\'être humain ; 46, XX pour une femme, 46, XY pour un homme ; trisomie 21 (syndrome de Down) : trois chromosomes 21. '
    + 'Gène : portion de chromosome portant l\'information à l\'origine d\'un caractère héréditaire ; allèle : version d\'un gène ; '
    + 'génotype : ensemble des allèles d\'un individu. Groupe sanguin : un gène sur la paire n° 9, allèles A, B et O ; A et O '
    + 'donnent le groupe A. Mitose : conserve le nombre de chromosomes ; méiose : forme les gamètes (23 chromosomes, un de chaque '
    + 'paire) ; fécondation : rétablit 46. Brassage : répartition au hasard des chromosomes de chaque paire à la méiose, rencontre '
    + 'au hasard des gamètes à la fécondation. Le spermatozoïde (X ou Y) détermine le sexe. M. Martin : allèles A et O, XY ; '
    + 'Mme Martin : allèles A et B, XX ; tableau de croisement : 8 cases équiprobables, garçon de groupe A = 2 sur 8 = 1 chance sur 4. '
    + 'Mutation : modification aléatoire de l\'ADN d\'un gène, créant un nouvel allèle ; les UV en augmentent la fréquence ; transmise '
    + 'à la descendance seulement si elle touche un gamète (la pomme dorée : non ; le chat polydactyle, depuis sa naissance : oui). '
    + 'Les pages vues du cours n\'emploient ni « dominant », ni « récessif », ni « chromatide » : ne les exige pas.',

  seances: [
    { numero: 1, partie: 'Partie 1', titre: 'Le phénotype' },
    { numero: 2, partie: 'Parties 2 et 3', titre: 'Noyau, chromosomes, gènes' },
    { numero: 3, partie: 'Parties 4 à 6', titre: 'Mitose, méiose, fécondation' },
    { numero: 4, partie: 'Partie 7', titre: 'Les mutations' },
  ],

  etapes: [
    // ═══ Séance 1 — le phénotype ═════════════════════════════════════════════

    {
      id: 'svt-diversite',
      seance: 1,
      titre: 'La diversité des individus',
      sousTitre: 'Activité 1 — pensées sauvages et êtres humains',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: '1. La notion de phénotype',
          lignes: [
            'Une même **espèce** : des individus qui se ressemblent… sans jamais être identiques.',
            'Pensées sauvages (*Viola tricolor*) : couleur dominante des pétales, forme, nombre de stries… varient d\'une plante à l\'autre.',
            'Des différences **dans une population** et **d\'une population à l\'autre** : le **mauve** domine dans la prairie des Alpes (près de 40 %), le **blanc** dans celle du Jura (près de 45 %).',
            '**Population** : ensemble d\'individus d\'une même espèce occupant un même territoire.',
          ],
        },
        {
          type: 'regle',
          titre: 'Ce qui se voit, ce qui ne se voit pas',
          lignes: [
            '**Directement visibles** : la forme des yeux, la couleur de la peau…',
            '**Pas directement visible** : le **groupe sanguin**. On le connaît par une **analyse de sang**.',
            '**Phénotype** : ensemble des caractères d\'un individu, observables à différentes échelles — **macroscopique**, **cellulaire**, **moléculaire**.',
          ],
        },
      ],
      items: [
        {
          id: 'div-espece', type: 'choix', consigne: BLOC, phrase: 'Les pensées sauvages des Alpes et du Jura sont-elles de la même espèce ?',
          options: ['Oui : ce sont toutes des Viola tricolor', 'Non : une espèce par couleur de pétales', 'Non : une espèce par prairie'],
          attendu: 'Oui : ce sont toutes des Viola tricolor',
          explication: 'Une seule espèce, Viola tricolor : seuls certains caractères varient.',
        },
        {
          id: 'div-alpes', type: 'choix', consigne: BLOC, phrase: 'Dans la prairie des Alpes, quelle couleur de pétales est la plus fréquente ?',
          options: ['Le mauve', 'Le blanc', 'Le jaune'], attendu: 'Le mauve',
          explication: 'Le mauve : près de 40 % des pensées des Alpes. Le blanc y est le plus rare.',
        },
        {
          id: 'div-jura', type: 'choix', consigne: BLOC, phrase: 'Dans la prairie du Jura, quelle couleur de pétales est la plus fréquente ?',
          options: ['Le mauve', 'Le blanc', 'Le jaune'], attendu: 'Le blanc',
          explication: 'Le blanc : près de 45 % des pensées du Jura.',
        },
        {
          id: 'div-conclusion', type: 'choix', consigne: BLOC, phrase: 'Que montrent ces observations sur les pensées ?',
          options: [
            'Les individus d\'une même espèce diffèrent, dans une population comme d\'une population à l\'autre',
            'Chaque prairie abrite une espèce différente',
            'Dans une population, tous les individus sont identiques',
          ],
          attendu: 'Les individus d\'une même espèce diffèrent, dans une population comme d\'une population à l\'autre',
          explication: 'Même espèce, caractères variés : à l\'intérieur d\'une population, et d\'une population à l\'autre.',
        },
        {
          id: 'div-sang', type: 'choix', consigne: VISIBLE, phrase: 'Le groupe sanguin',
          options: ['Directement visible', 'Pas directement visible'], attendu: 'Pas directement visible',
          explication: 'Il ne se voit pas : on le connaît par une analyse de sang.',
        },
        {
          id: 'div-yeux', type: 'choix', consigne: VISIBLE, phrase: 'La forme des yeux',
          options: ['Directement visible', 'Pas directement visible'], attendu: 'Directement visible',
          explication: 'La forme des yeux, la couleur de la peau : visibles directement.',
        },
        {
          id: 'div-analyse', type: 'choix', consigne: BLOC, phrase: 'Comment connaître le groupe sanguin d\'une personne ?',
          options: ['Par une analyse de sang', 'En observant la couleur de sa peau', 'En mesurant sa taille'], attendu: 'Par une analyse de sang',
          explication: 'Un caractère invisible se révèle par une analyse : ici, une prise de sang.',
        },
        {
          id: 'div-echelles', type: 'choix', consigne: BLOC, phrase: 'À quelles échelles observe-t-on le phénotype ?',
          options: [
            'À l\'échelle de l\'organisme seulement',
            'À l\'échelle de l\'organisme, des cellules et des molécules',
            'À l\'échelle des molécules seulement',
          ],
          attendu: 'À l\'échelle de l\'organisme, des cellules et des molécules',
          explication: 'Macroscopique, cellulaire, moléculaire : le groupe sanguin, par exemple, tient à des molécules à la surface des globules rouges.',
        },
        {
          id: 't-phenotype', type: 'terme', definition: 'Ensemble des caractères d\'un individu, observables à différentes échelles', attendu: 'phénotype',
          pieges: [{ si: 'génotype', message: 'Le génotype, ce sont les allèles. L\'ensemble des caractères, c\'est le phénotype.' }],
        },
        { id: 't-population', type: 'terme', definition: 'Ensemble d\'individus d\'une même espèce occupant un même territoire', attendu: 'population' },
      ],
    },

    {
      id: 'svt-hereditaire',
      seance: 1,
      titre: 'Héréditaire ou non ?',
      sousTitre: 'Activité 1 — groupe sanguin, pelage, hêtre, et le tableau à classer',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Héréditaire, ou dû à l\'environnement',
          lignes: [
            '**Caractère héréditaire** : il se transmet des parents à leurs descendants.',
            '**Groupe sanguin** : des parents de groupes A et B ont une fille AB — elle tient A de l\'un, B de l\'autre. Héréditaire.',
            '**Couleur du pelage** : l\'arbre généalogique du chiot la montre passer de génération en génération. Héréditaire.',
            '**Allure du hêtre** tordu par le vent : ses graines, semées dans un milieu peu venté, donnent des arbres sans cette allure. Pas héréditaire : due à l\'**environnement**, le vent.',
            'Le **phénotype** résulte à la fois des caractères **héréditaires** et de l\'action de l\'**environnement**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Le tableau à savoir remplir',
          colonnes: ['Le caractère dépend…', 'Exemples'],
          lignes: [
            ['de l\'**hérédité** uniquement', 'la couleur des yeux, le groupe sanguin, la forme du lobe de l\'oreille, la présence de 32 dents à l\'âge adulte'],
            ['de l\'**environnement** ou du mode de vie uniquement', 'une cicatrice, la langue maternelle'],
            ['des **deux**', 'la taille adulte, la masse corporelle : l\'hérédité, mais aussi l\'alimentation, l\'activité…'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            '**Le bronzage** vient du soleil : l\'environnement. Mais la couleur de peau de départ est héréditaire — certains le rangent donc dans « les deux ». Garde le classement fait en classe.',
          ],
        },
      ],
      items: [
        {
          id: 'her-sang', type: 'choix', consigne: BLOC, phrase: 'Des parents de groupes sanguins A et B ont une fille de groupe AB. Qu\'est-ce que cela montre ?',
          options: [
            'Le groupe sanguin se transmet des parents à l\'enfant : il est héréditaire',
            'Le groupe sanguin dépend de l\'alimentation',
            'Le groupe sanguin change au cours de la vie',
          ],
          attendu: 'Le groupe sanguin se transmet des parents à l\'enfant : il est héréditaire',
          explication: 'Elle a reçu A d\'un parent et B de l\'autre : le groupe sanguin est héréditaire.',
        },
        {
          id: 'her-pelage', type: 'choix', consigne: BLOC, phrase: 'Que permet de suivre l\'arbre généalogique du chiot ?',
          options: [
            'La transmission de la couleur du pelage, de génération en génération',
            'L\'effet de l\'alimentation sur le pelage',
            'L\'âge des chiens de la famille',
          ],
          attendu: 'La transmission de la couleur du pelage, de génération en génération',
          explication: 'La couleur du pelage passe des parents au chiot : elle est héréditaire.',
        },
        {
          id: 'her-graines', type: 'choix', consigne: BLOC, phrase: 'On sème, dans un milieu peu venté, les graines du hêtre tordu par le vent. Les arbres obtenus…',
          options: ['ont la même allure tordue', 'n\'ont pas cette allure', 'ne poussent pas'], attendu: 'n\'ont pas cette allure',
          explication: 'L\'allure tordue ne passe pas aux graines : elle est due au vent.',
        },
        {
          id: 'her-hetre', type: 'choix', consigne: BLOC, phrase: 'L\'allure du hêtre de milieu venté est un caractère…',
          options: ['héréditaire', 'dû à l\'environnement'], attendu: 'dû à l\'environnement',
          explication: 'Due au vent, elle n\'est pas transmise à ses graines.',
        },
        {
          id: 'her-phenotype', type: 'choix', consigne: BLOC, phrase: 'De quoi résulte le phénotype d\'un individu ?',
          options: [
            'De ses caractères héréditaires seulement',
            'De l\'environnement seulement',
            'De ses caractères héréditaires et de l\'action de l\'environnement',
          ],
          attendu: 'De ses caractères héréditaires et de l\'action de l\'environnement',
          explication: 'Les deux : l\'hérédité, et l\'action de l\'environnement.',
        },
        {
          id: 't-hereditaire', type: 'terme', definition: 'Se dit d\'un caractère qui se transmet des parents à leurs descendants',
          attendu: 'héréditaire', accepte: ['caractère héréditaire'],
        },
        {
          id: 'cl-yeux', type: 'choix', consigne: CLASSER, phrase: 'La couleur des yeux', options: CLASSES, attendu: CLASSES[0],
          explication: 'Héréditaire : elle se transmet des parents aux enfants.',
        },
        {
          id: 'cl-sang', type: 'choix', consigne: CLASSER, phrase: 'Le groupe sanguin', options: CLASSES, attendu: CLASSES[0],
          explication: 'Héréditaire : il se transmet des parents aux enfants.',
        },
        {
          id: 'cl-lobe', type: 'choix', consigne: CLASSER, phrase: 'La forme du lobe de l\'oreille', options: CLASSES, attendu: CLASSES[0],
          explication: 'Héréditaire : lobe attaché ou décollé, il se transmet.',
        },
        {
          id: 'cl-dents', type: 'choix', consigne: CLASSER, phrase: 'La présence de 32 dents à l\'âge adulte', options: CLASSES, attendu: CLASSES[0],
          explication: 'Héréditaire : c\'est un caractère de l\'espèce humaine.',
        },
        {
          id: 'cl-cicatrice', type: 'choix', consigne: CLASSER, phrase: 'Une cicatrice', options: CLASSES, attendu: CLASSES[1],
          explication: 'Elle vient de l\'histoire de l\'individu — une blessure : elle ne se transmet pas.',
        },
        {
          id: 'cl-langue', type: 'choix', consigne: CLASSER, phrase: 'La langue maternelle', options: CLASSES, attendu: CLASSES[1],
          explication: 'Elle s\'apprend, dans le milieu où l\'on grandit.',
        },
        {
          id: 'cl-masse', type: 'choix', consigne: CLASSER, phrase: 'La masse corporelle', options: CLASSES, attendu: CLASSES[2],
          explication: 'L\'hérédité compte, mais aussi l\'alimentation et l\'activité physique.',
        },
        {
          id: 'cl-taille', type: 'choix', consigne: CLASSER, phrase: 'La taille adulte', options: CLASSES, attendu: CLASSES[2],
          explication: 'L\'hérédité compte, mais aussi l\'alimentation et la santé pendant la croissance.',
        },
      ],
    },

    {
      id: 'svt-ecrire-hetre',
      seance: 1,
      titre: 'Écrire : le hêtre, avec la démarche J.O.D.',
      sousTitre: 'J\'observe / Or je sais / Donc j\'en déduis',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'La démarche J.O.D.',
          lignes: [
            '**J\'observe** : un fait précis, tiré du document.',
            '**Or je sais** : une connaissance du cours qui éclaire ce fait.',
            '**Donc j\'en déduis** : la conclusion, qui répond à la question.',
            'Pour le hêtre : que deviennent ses graines, semées à l\'abri du vent ?',
          ],
        },
      ],
      items: [
        {
          id: 'w-hetre', type: 'decrire', sujet: 'Le hêtre du milieu venté', emoji: '🌳',
          indices: ['J\'observe…', 'Or je sais…', 'Donc j\'en déduis…', 'graines', 'milieu peu venté', 'environnement'],
          consigne: 'Avec la démarche J.O.D., explique pourquoi l\'allure du hêtre de milieu venté n\'est pas un caractère héréditaire.',
          titreModele: 'Un exemple',
          modele: 'J\'observe que les graines du hêtre tordu par le vent, semées dans un milieu peu venté, donnent des arbres qui n\'ont pas cette allure. Or je sais qu\'un caractère héréditaire se transmet des parents à leurs descendants. Donc j\'en déduis que l\'allure du hêtre n\'est pas un caractère héréditaire : elle est due à l\'environnement, ici au vent.',
          criteres: [
            { id: 'observe', texte: 'J\'observe : les graines semées dans un milieu peu venté donnent des arbres sans cette allure' },
            { id: 'sais', texte: 'Or je sais : un caractère héréditaire se transmet des parents aux descendants' },
            { id: 'deduis', texte: 'Donc : l\'allure n\'est pas héréditaire, elle est due à l\'environnement (le vent)' },
          ],
        },
      ],
    },

    // ═══ Séance 2 — noyau, chromosomes, gènes ════════════════════════════════

    {
      id: 'svt-noyau',
      seance: 2,
      titre: 'Le noyau, siège de l\'information',
      sousTitre: 'Activité 2 — le transfert de noyau',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: '2. L\'origine des caractères héréditaires',
          lignes: [
            '**Rappel** : à la fécondation, un spermatozoïde et un ovule s\'unissent en une **cellule-œuf**, qui reçoit de chaque parent une part de l\'information des caractères héréditaires.',
            '**Hypothèse** : cette information se trouve dans le **noyau** de la cellule-œuf.',
          ],
        },
        {
          type: 'regle',
          titre: 'L\'expérience des lapines',
          lignes: [
            'Ovule d\'une **lapine noire**, **énucléé** (son noyau retiré) + **noyau** d\'une cellule de **lapine rousse** → une cellule-œuf, implantée chez une **lapine blanche**, la mère porteuse.',
            'Il naît un lapereau **roux** : les caractères de la donneuse du **noyau** — ni ceux de la donneuse de l\'ovule, ni ceux de la mère porteuse.',
            'Chez la souris, même résultat : le souriceau est **marron**, comme les parents qui ont fourni le noyau.',
            '**Conclusion** : l\'information à l\'origine des caractères héréditaires — l\'**information génétique** — est dans le **noyau**. L\'hypothèse est validée.',
          ],
        },
      ],
      items: [
        {
          id: 'noy-ordre', type: 'ordre', consigne: 'Remets les étapes de l\'expérience dans l\'ordre :',
          elements: [
            'On prélève un ovule chez la lapine noire.',
            'On retire le noyau de cet ovule : c\'est l\'énucléation.',
            'On place dans l\'ovule sans noyau le noyau d\'une cellule de la lapine rousse.',
            'On implante la cellule-œuf obtenue chez la lapine blanche, la mère porteuse.',
            'Après la gestation, il naît un lapereau roux.',
          ],
        },
        {
          id: 'noy-lapereau', type: 'choix', consigne: BLOC, phrase: 'De quelle couleur est le lapereau obtenu ?',
          options: ['Roux, comme la lapine qui a donné le noyau', 'Noir, comme la lapine qui a donné l\'ovule', 'Blanc, comme la mère porteuse'],
          attendu: 'Roux, comme la lapine qui a donné le noyau',
          explication: 'Roux : il a les caractères de la lapine qui a fourni le noyau.',
        },
        {
          id: 'noy-souris', type: 'choix', consigne: BLOC,
          phrase: 'Le noyau d\'une cellule-œuf de souris blanche est remplacé par celui d\'une cellule-œuf de souris marron ; elle se développe chez une souris noire. Le souriceau est…',
          options: ['blanc', 'marron', 'noir'], attendu: 'marron',
          explication: 'Marron, comme les parents qui ont fourni le noyau.',
        },
        {
          id: 'noy-ou', type: 'choix', consigne: BLOC, phrase: 'Où se trouve l\'information à l\'origine des caractères héréditaires ?',
          options: ['Dans le noyau de la cellule', 'Dans l\'ovule, autour du noyau', 'Chez la mère porteuse'], attendu: 'Dans le noyau de la cellule',
          explication: 'Dans le noyau : c\'est l\'information génétique. L\'hypothèse est validée.',
        },
        {
          id: 't-cellule-oeuf', type: 'terme', definition: 'Première cellule d\'un nouvel individu, issue de la fécondation', attendu: 'cellule-œuf',
          accepte: ['œuf'],
          pieges: [{ si: 'fécondation', message: 'La fécondation est l\'union des gamètes ; la cellule qu\'elle forme, c\'est la cellule-œuf.' }],
        },
        { id: 't-enucleation', type: 'terme', definition: 'Le fait d\'enlever le noyau d\'une cellule', attendu: 'énucléation' },
      ],
    },

    {
      id: 'svt-adn',
      seance: 2,
      titre: 'L\'ADN et les chromosomes',
      sousTitre: 'Activité 2 — ce que contient le noyau',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'Dans le noyau : l\'ADN',
          lignes: [
            '**ADN** : acide désoxyribonucléique, molécule support de l\'information génétique, contenue dans le noyau des cellules.',
            '**Hors division** : l\'ADN est déroulé — on voit le noyau, pas de chromosomes.',
            '**Pendant une division** : le noyau ne se voit plus ; chaque molécule d\'ADN s\'enroule sur elle-même → un **chromosome**, visible en bâtonnet.',
            '**Chromosome** : forme condensée d\'une molécule d\'ADN, visible au moment des divisions cellulaires.',
            'L\'information génétique reste **en permanence** dans le noyau.',
          ],
        },
        {
          type: 'regle',
          titre: 'Repère d\'histoire des sciences',
          lignes: [
            '**1952** : la chimiste britannique **Rosalind Franklin** (1920–1958) obtient des clichés de l\'ADN par diffraction des rayons X.',
            '**1953** : grâce à eux, on établit la structure de l\'ADN en **double hélice**.',
          ],
        },
      ],
      items: [
        {
          id: 'adn-sigle', type: 'reponse', question: 'Que signifie le sigle ADN ?', attendu: 'acide désoxyribonucléique',
          pieges: [{ si: 'désoxyribonucléique', resultat: 'presque', message: 'Il manque le premier mot : acide désoxyribonucléique.' }],
          explication: 'ADN : acide désoxyribonucléique.',
        },
        {
          id: 'adn-hors', type: 'choix', consigne: BLOC, phrase: 'En dehors d\'une division, sous quelle forme se trouve l\'ADN dans le noyau ?',
          options: ['Déroulé : les chromosomes ne se voient pas', 'Enroulé en bâtonnets bien visibles', 'Hors du noyau'],
          attendu: 'Déroulé : les chromosomes ne se voient pas',
          explication: 'Déroulé, invisible au microscope — mais toujours là, dans le noyau.',
        },
        {
          id: 'adn-division', type: 'choix', consigne: BLOC, phrase: 'Au moment d\'une division, que devient chaque molécule d\'ADN ?',
          options: ['Elle s\'enroule sur elle-même et devient visible : un chromosome', 'Elle disparaît', 'Elle sort de la cellule'],
          attendu: 'Elle s\'enroule sur elle-même et devient visible : un chromosome',
          explication: 'Enroulée sur elle-même, elle devient visible en bâtonnet : un chromosome.',
        },
        {
          id: 'adn-franklin', type: 'reponse', question: 'Quelle chimiste britannique obtient, en 1952, des clichés de l\'ADN d\'une qualité inédite ?',
          attendu: 'Rosalind Franklin', accepte: ['Franklin'],
          explication: 'Rosalind Franklin (1920–1958) : ses clichés permettent d\'établir en 1953 la double hélice de l\'ADN.',
        },
        {
          id: 'adn-helice', type: 'trou', consigne: 'Complète :', phrase: 'En 1953, on établit la structure de l\'ADN : une double ___.',
          attendu: 'hélice', accepte: ['double hélice'], explication: 'Une double hélice.',
        },
        {
          id: 't-adn', type: 'terme', definition: 'Molécule support de l\'information génétique, contenue dans le noyau des cellules', attendu: 'ADN',
          accepte: ['acide désoxyribonucléique'],
        },
        {
          id: 't-chromosome', type: 'terme', definition: 'Forme condensée d\'une molécule d\'ADN, visible au moment des divisions cellulaires',
          attendu: 'chromosome',
        },
      ],
    },

    {
      id: 'svt-clonage',
      seance: 2,
      titre: 'Le clonage',
      sousTitre: 'Activité 2 — une technologie en débat',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: 'Le clonage, une technologie en débat',
          lignes: [
            '**Clonage** : produire un organisme, ou une partie d\'organisme, identique à un organisme qui existe déjà. Le clonage reproductif utilise le transfert de noyau.',
            '**Reproductif** : un nouvel individu identique — comme la brebis **Dolly**, premier mammifère cloné (1996). **Pour** : produire en nombre des animaux intéressants, sauver des espèces en voie de disparition.',
            '**Thérapeutique** : des cellules, des tissus, voire des organes, à partir des cellules d\'un individu. **Pour** : faciliter les greffes.',
            '**Contre** : des questions de **bioéthique** — quel intérêt à cloner des humains ? Que vivrait un clone, en se sachant la copie d\'un autre ?',
            '**Bioéthique** : étude des problèmes moraux posés par la recherche médicale et biologique.',
            'En France, la **loi de bioéthique** (depuis 1994, révisée régulièrement) **interdit tout clonage humain**, reproductif ou thérapeutique.',
          ],
        },
      ],
      items: [
        {
          id: 'clo-reproductif', type: 'terme', definition: 'Le clonage qui produit un nouvel individu identique à celui de départ',
          attendu: 'clonage reproductif', accepte: ['reproductif'],
          pieges: [{ si: ['clonage thérapeutique', 'thérapeutique'], message: 'Le thérapeutique crée des cellules, des tissus, des organes. Un nouvel individu : le clonage reproductif.' }],
        },
        {
          id: 'clo-therapeutique', type: 'terme', definition: 'Le clonage qui crée des cellules, des tissus, voire des organes, à partir des cellules d\'un individu',
          attendu: 'clonage thérapeutique', accepte: ['thérapeutique'],
          pieges: [{ si: ['clonage reproductif', 'reproductif'], message: 'Le reproductif produit un nouvel individu. Des cellules ou des organes : le clonage thérapeutique.' }],
        },
        {
          id: 't-bioethique', type: 'terme', definition: 'Étude des problèmes moraux posés par la recherche médicale et biologique',
          attendu: 'bioéthique', accepte: ['bio-éthique'],
        },
        {
          id: 'clo-loi', type: 'choix', consigne: BLOC, phrase: 'Que prévoit la loi française sur le clonage humain ?',
          options: ['Elle interdit tout clonage humain, reproductif ou thérapeutique', 'Elle n\'autorise que le clonage thérapeutique', 'Elle autorise tout clonage humain'],
          attendu: 'Elle interdit tout clonage humain, reproductif ou thérapeutique',
          explication: 'La loi de bioéthique interdit tout clonage humain, reproductif ou thérapeutique.',
        },
        {
          id: 'clo-pour', type: 'choix', consigne: BLOC, phrase: 'Lequel est un argument favorable au clonage animal ?',
          options: ['Sauvegarder des espèces en voie de disparition', 'Les questions morales qu\'il soulève', 'Il donne des individus tous différents'],
          attendu: 'Sauvegarder des espèces en voie de disparition',
          explication: 'Pour : sauver des espèces menacées, produire en nombre des animaux intéressants. Contre : les questions de bioéthique.',
        },
        {
          id: 'clo-dolly', type: 'reponse', question: 'Comment s\'appelle la brebis qui fut le premier mammifère cloné ?', attendu: 'Dolly',
          accepte: ['brebis Dolly'], explication: 'Dolly, née en 1996.',
        },
      ],
    },

    {
      id: 'svt-caryotype',
      seance: 2,
      titre: 'Le caryotype',
      sousTitre: 'Activité 3 — compter et ranger les chromosomes',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: '3. Le caryotype',
          lignes: [
            '**Caryotype** : ensemble des chromosomes d\'une cellule, classés par paires selon leur taille.',
            'Le réaliser : cultiver des cellules → **arrêter la division** au moment où les chromosomes sont visibles → étaler, colorer → observer au microscope, photographier → **ranger par paires**, selon la taille.',
            'Pourquoi arrêter la division ? Les chromosomes ne sont **visibles que pendant une division**.',
            'Toutes les cellules d\'un individu ont le même caryotype — sauf les cellules reproductrices.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Un nombre de chromosomes par espèce (2n)',
          colonnes: ['Espèce', '2n'],
          lignes: [
            ['Pigeon domestique', '80'], ['Cheval', '64'], ['**Être humain**', '**46**'], ['Lapin de garenne', '44'],
            ['*Haemanthus* (une plante)', '18'], ['Orge', '14'], ['Ver rond', '12'], ['Drosophile', '8'],
          ],
        },
        {
          type: 'regle',
          lignes: [
            'Chaque **espèce** a un nombre précis de chromosomes, de forme et de taille caractéristiques. Le nombre ne dit rien de la « complexité » : le pigeon en a 80, l\'humain 46.',
          ],
        },
        {
          type: 'regle',
          titre: 'Chez l\'être humain',
          lignes: [
            '**46 chromosomes**, soit **23 paires**.',
            'Une seule différence entre les sexes, la paire des chromosomes sexuels : **XX** chez la femme (**46, XX**), **XY** chez l\'homme (**46, XY**).',
            '**Trisomie 21** (syndrome de Down) : **trois chromosomes 21** au lieu de deux, soit 47 chromosomes. Environ une naissance sur 700.',
            '**1959**, à Paris : la pédiatre et chercheuse **Marthe Gautier** (1925–2022) met au point la culture des cellules et observe le chromosome 21 en trop — un travail longtemps passé sous silence.',
          ],
        },
      ],
      items: [
        {
          id: 'car-ordre', type: 'ordre', consigne: 'Remets dans l\'ordre les étapes de réalisation d\'un caryotype :',
          elements: [
            'Prélever des cellules et les mettre en culture.',
            'Arrêter la division au moment où les chromosomes sont visibles.',
            'Étaler la préparation et colorer les chromosomes.',
            'Observer au microscope et photographier.',
            'Ranger les chromosomes par paires, selon leur taille.',
          ],
        },
        {
          id: 'car-pourquoi', type: 'choix', consigne: BLOC, phrase: 'Pourquoi arrête-t-on la division des cellules avant de les observer ?',
          options: ['Les chromosomes ne sont visibles que pendant la division', 'Pour tuer les cellules malades', 'Pour que les cellules grossissent'],
          attendu: 'Les chromosomes ne sont visibles que pendant la division',
          explication: 'Hors division, l\'ADN est déroulé : on ne voit pas les chromosomes.',
        },
        {
          id: 'car-humain', type: 'reponse', question: 'Combien de chromosomes possède une cellule humaine ordinaire ?', attendu: '46',
          accepte: ['46 chromosomes', '2n = 46'],
          pieges: [{ si: ['23', '23 chromosomes'], message: '23, c\'est le nombre de paires. Une cellule ordinaire a 46 chromosomes.' }],
          explication: '46 chromosomes, soit 23 paires.',
        },
        {
          id: 'car-paires', type: 'reponse', question: 'Combien de paires de chromosomes une cellule humaine ordinaire possède-t-elle ?', attendu: '23',
          accepte: ['23 paires'],
          pieges: [{ si: ['46', '46 paires'], message: '46, c\'est le nombre de chromosomes : ils forment 23 paires.' }],
          explication: '23 paires, soit 46 chromosomes.',
        },
        {
          id: 'car-drosophile', type: 'reponse', question: 'Combien de chromosomes possède une cellule de drosophile ?', attendu: '8',
          accepte: ['8 chromosomes', '2n = 8'], explication: '8 chromosomes, soit 4 paires.',
        },
        {
          id: 'car-espece', type: 'choix', consigne: BLOC, phrase: 'Drosophile 8, Haemanthus 18, être humain 46 : que peut-on conclure ?',
          options: [
            'Chaque espèce a un nombre précis de chromosomes',
            'Toutes les espèces ont le même nombre de chromosomes',
            'Plus une espèce est complexe, plus elle a de chromosomes',
          ],
          attendu: 'Chaque espèce a un nombre précis de chromosomes',
          explication: 'Le nombre de chromosomes caractérise l\'espèce — le pigeon en a 80, plus que l\'humain.',
        },
        {
          id: 'car-sexe', type: 'choix', consigne: BLOC, phrase: 'Quelle est la seule différence entre le caryotype d\'un homme et celui d\'une femme ?',
          options: ['La paire de chromosomes sexuels : XY chez l\'homme, XX chez la femme', 'L\'homme a un chromosome de plus', 'La femme n\'a pas de chromosome 21'],
          attendu: 'La paire de chromosomes sexuels : XY chez l\'homme, XX chez la femme',
          explication: 'Tout est identique, sauf une paire : XX chez la femme, XY chez l\'homme.',
        },
        {
          id: 'car-formule', type: 'choix', consigne: BLOC, phrase: 'Quelle est la formule chromosomique d\'un homme ?',
          options: ['46, XX', '46, XY', '23, XY'], attendu: '46, XY',
          explication: 'Un homme : 46, XY. Une femme : 46, XX.',
        },
        {
          id: 'car-trisomie', type: 'choix', consigne: BLOC, phrase: 'Que montre le caryotype d\'une personne atteinte du syndrome de Down ?',
          options: ['Trois chromosomes 21 au lieu de deux', 'Un chromosome 21 en moins', 'Deux chromosomes Y'],
          attendu: 'Trois chromosomes 21 au lieu de deux',
          explication: '« Tri » : trois exemplaires du chromosome 21. D\'où le nom de trisomie 21.',
        },
        {
          id: 'car-47', type: 'reponse', question: 'Combien de chromosomes compte une cellule d\'une personne atteinte de trisomie 21 ?', attendu: '47',
          accepte: ['47 chromosomes'],
          pieges: [{ si: ['46', '46 chromosomes'], message: '46, c\'est sans anomalie. Un chromosome 21 en plus : 47.' }],
          explication: '46, plus un chromosome 21 en trop : 47.',
        },
        {
          id: 't-caryotype', type: 'terme', definition: 'Ensemble des chromosomes d\'une cellule, classés par paires selon leur taille', attendu: 'caryotype',
          pieges: [{ si: 'génotype', message: 'Le génotype, ce sont les allèles. Les chromosomes rangés par paires, c\'est le caryotype.' }],
        },
        {
          id: 'car-gautier', type: 'reponse', question: 'Quelle pédiatre et chercheuse observe, en 1959 à Paris, le chromosome 21 en trop ?',
          attendu: 'Marthe Gautier', accepte: ['Gautier'],
          explication: 'Marthe Gautier (1925–2022) : une découverte longtemps passée sous silence.',
        },
      ],
    },

    {
      id: 'svt-genes',
      seance: 2,
      titre: 'Gènes et allèles',
      sousTitre: 'Activité 4 — syndrome de Williams, groupes sanguins',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Les gènes',
          lignes: [
            '**Gène** : portion de chromosome portant l\'information à l\'origine d\'un caractère héréditaire.',
            '**Syndrome de Williams** : sur l\'un des deux chromosomes 7, il **manque une petite portion** — celle qui porte le gène de l\'**élastine** et des gènes utiles au cerveau. D\'où des anomalies des vaisseaux sanguins (l\'élastine rend les tissus élastiques) et des troubles cognitifs.',
            'Un chromosome 7 porte à lui seul plus de **1 400 gènes** ; nos 23 paires, près de **25 000**.',
            'Les deux chromosomes d\'une paire portent les **mêmes gènes, aux mêmes endroits**. **Tous les humains ont les mêmes gènes** (toutes les drosophiles aussi).',
          ],
        },
        {
          type: 'regle',
          titre: 'Les allèles : l\'exemple du groupe sanguin',
          lignes: [
            'Quatre groupes : **A, B, AB, O** — selon les molécules à la surface des globules rouges : A, B, les deux, ou aucune.',
            'Un seul gène, sur la **paire n° 9**, en deux exemplaires : un par chromosome de la paire.',
            '**Allèle** : version d\'un gène. Pour le groupe sanguin, trois allèles : **A, B, O**. Chacun en possède deux, identiques ou différents.',
            '**Génotype** : ensemble des allèles d\'un individu. Il est propre à chacun : c\'est la **diversité génétique**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Groupe sanguin et allèles',
          colonnes: ['Groupe', 'Allèles possibles'],
          lignes: [['A', 'A et A, ou A et O'], ['B', 'B et B, ou B et O'], ['AB', 'A et B'], ['O', 'O et O']],
        },
        {
          type: 'piege',
          lignes: [
            '**Gène** ≠ **allèle** : tous les humains ont le même gène du groupe sanguin, mais pas les mêmes allèles.',
            '**Génotype** (les allèles) ≠ **phénotype** (les caractères). L\'allèle O ne fait fabriquer aucune molécule : A et O donnent le groupe A.',
          ],
        },
      ],
      items: [
        {
          id: 'gen-williams', type: 'choix', consigne: BLOC, phrase: 'Qu\'est-ce qui distingue le caryotype d\'une personne atteinte du syndrome de Williams ?',
          options: [
            'Sur l\'un des chromosomes 7, il manque la petite portion qui porte le gène de l\'élastine',
            'Elle a trois chromosomes 7',
            'Elle n\'a aucun chromosome 7',
          ],
          attendu: 'Sur l\'un des chromosomes 7, il manque la petite portion qui porte le gène de l\'élastine',
          explication: 'Il manque un petit morceau d\'un chromosome 7 — et les gènes qu\'il porte.',
        },
        {
          id: 'gen-williams-pheno', type: 'choix', consigne: BLOC, phrase: 'Pourquoi le syndrome de Williams touche-t-il les vaisseaux sanguins ?',
          options: [
            'La portion manquante porte le gène de l\'élastine, qui rend les vaisseaux élastiques',
            'Le chromosome 7 transporte le sang',
            'Il y a trop d\'élastine dans le sang',
          ],
          attendu: 'La portion manquante porte le gène de l\'élastine, qui rend les vaisseaux élastiques',
          explication: 'L\'élastine donne leur élasticité aux tissus, aux vaisseaux sanguins notamment. Les troubles cognitifs viennent d\'autres gènes de la même portion.',
        },
        {
          id: 't-gene', type: 'terme', definition: 'Portion de chromosome portant l\'information à l\'origine d\'un caractère héréditaire', attendu: 'gène',
          pieges: [{ si: 'allèle', message: 'Un allèle est une version d\'un gène. La portion de chromosome elle-même, c\'est le gène.' }],
        },
        {
          id: 'gen-memes', type: 'choix', consigne: BLOC, phrase: 'Pourquoi peut-on dire que tous les humains possèdent les mêmes gènes ?',
          options: [
            'Ils ont les mêmes chromosomes, qui portent les mêmes gènes aux mêmes endroits',
            'Parce qu\'ils se ressemblent tous parfaitement',
            'Parce qu\'ils ont tous le même groupe sanguin',
          ],
          attendu: 'Ils ont les mêmes chromosomes, qui portent les mêmes gènes aux mêmes endroits',
          explication: 'Même caryotype, mêmes gènes aux mêmes endroits : ce qui change d\'un humain à l\'autre, ce sont les allèles.',
        },
        {
          id: 'gen-groupes', type: 'choix', consigne: BLOC, phrase: 'Tous les humains ont le même gène du groupe sanguin. Pourquoi y a-t-il quatre groupes ?',
          options: ['Ce gène existe en plusieurs versions : les allèles A, B et O', 'Certains humains n\'ont pas ce gène', 'Le groupe dépend de l\'alimentation'],
          attendu: 'Ce gène existe en plusieurs versions : les allèles A, B et O',
          explication: 'Trois allèles, deux par personne : leurs combinaisons donnent A, B, AB ou O.',
        },
        {
          id: 't-allele', type: 'terme', definition: 'Version d\'un gène', attendu: 'allèle',
          pieges: [{ si: 'gène', message: 'Le gène est la portion de chromosome ; ses différentes versions sont les allèles.' }],
        },
        {
          id: 't-genotype', type: 'terme', definition: 'Ensemble des allèles d\'un individu', attendu: 'génotype',
          pieges: [
            { si: 'phénotype', message: 'Le phénotype, ce sont les caractères. L\'ensemble des allèles, c\'est le génotype.' },
            { si: 'caryotype', message: 'Le caryotype, ce sont les chromosomes rangés par paires. L\'ensemble des allèles, c\'est le génotype.' },
          ],
        },
        {
          id: 'gen-paire', type: 'choix', consigne: BLOC, phrase: 'Sur quelle paire de chromosomes se trouve le gène du groupe sanguin ?',
          options: ['La paire n° 9', 'La paire n° 21', 'La paire n° 7'], attendu: 'La paire n° 9',
          explication: 'Paire n° 9 : un exemplaire du gène sur chaque chromosome de la paire.',
        },
        {
          id: 'gen-ab', type: 'choix', consigne: BLOC, phrase: 'Quels allèles possède une personne du groupe AB ?',
          options: ['A et B', 'A et A', 'A et O'], attendu: 'A et B',
          explication: 'AB : un allèle A et un allèle B — ses globules rouges portent les deux molécules.',
        },
        {
          id: 'gen-o', type: 'choix', consigne: BLOC, phrase: 'Quels allèles possède une personne du groupe O ?',
          options: ['O et O', 'A et O', 'B et O'], attendu: 'O et O',
          explication: 'O : deux allèles O — ni molécule A, ni molécule B.',
        },
        {
          id: 'gen-ao', type: 'choix', consigne: BLOC, phrase: 'Une personne a les allèles A et O. Quel est son groupe sanguin ?',
          options: ['A', 'O', 'AB'], attendu: 'A',
          explication: 'L\'allèle O ne fait fabriquer aucune molécule : seules les molécules A sont présentes. Groupe A.',
        },
      ],
    },

    {
      id: 'svt-ecrire-caryotype',
      seance: 2,
      titre: 'Écrire : le diagnostic du biologiste',
      sousTitre: 'La tâche complexe de l\'activité 3',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Rédiger la tâche complexe',
          lignes: [
            'Des **phrases complètes**, avec les **observations** utilisées et les **connaissances** du cours.',
            'Observer : le nombre de chromosomes, la paire des chromosomes sexuels, la paire n° 21.',
            'Savoir : 46 chromosomes chez l\'être humain ; XX chez la femme, XY chez l\'homme ; trois chromosomes 21, c\'est la trisomie 21.',
          ],
        },
      ],
      items: [
        {
          id: 'w-caryotype', type: 'decrire', sujet: 'Le diagnostic du biologiste', emoji: '🔬',
          indices: ['caryotype', 'paires', '46', 'XX', 'chromosome 21', 'trisomie 21'],
          consigne: 'Devant une photographie de chromosomes, un biologiste affirme : « Cette cellule appartient à un humain de sexe féminin, atteint du syndrome de Down. » Explique, en phrases complètes, comment il a pu le déduire.',
          titreModele: 'Un exemple',
          modele: 'Le biologiste a réalisé un caryotype : il a photographié les chromosomes d\'une cellule en division, puis les a rangés par paires selon leur taille. Chez l\'être humain, une cellule possède normalement 46 chromosomes, soit 23 paires, et la paire des chromosomes sexuels est XX chez la femme, XY chez l\'homme. Ici, cette paire est XX : la personne est donc de sexe féminin. Mais on compte trois chromosomes 21 au lieu de deux, soit 47 chromosomes : c\'est une trisomie 21, l\'anomalie responsable du syndrome de Down.',
          criteres: [
            { id: 'caryotype', texte: 'Le caryotype : les chromosomes photographiés, puis rangés par paires selon leur taille' },
            { id: 'normal', texte: 'La norme : 46 chromosomes, soit 23 paires, chez l\'être humain' },
            { id: 'sexe', texte: 'Le sexe : la paire de chromosomes sexuels est XX, donc une femme (XY chez un homme)' },
            { id: 'trisomie', texte: 'Le syndrome : trois chromosomes 21 au lieu de deux, c\'est la trisomie 21' },
          ],
        },
      ],
    },

    // ═══ Séance 3 — mitose, méiose, fécondation ══════════════════════════════

    {
      id: 'svt-divisions',
      seance: 3,
      titre: 'Mitose, méiose, fécondation',
      sousTitre: 'Parties 4 et 5 — ce que deviennent les chromosomes',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: '4. La mitose : la stabilité de l\'individu',
          lignes: [
            '**Mitose** : division cellulaire concernant toutes les cellules sauf les gamètes, conservant le nombre de chromosomes.',
            'Avant la division, chaque chromosome est **copié** : il est alors fait de deux molécules d\'ADN identiques. Pendant la mitose, les deux copies se **séparent** : chaque cellule fille en reçoit une.',
            '1 cellule à 46 chromosomes → **2 cellules identiques** à 46 chromosomes. Le patrimoine génétique est ainsi copié à l\'identique dans toutes les cellules de l\'organisme.',
          ],
        },
        {
          type: 'regle',
          titre: '5. La méiose et la fécondation',
          lignes: [
            '**Gamète** : cellule reproductrice, ne contenant qu\'un chromosome de chaque paire — **23** chez l\'être humain, 22 chez le lapin.',
            '**Méiose** : division cellulaire à l\'origine des gamètes, divisant par deux le nombre de chromosomes. Elle a lieu dans les **organes reproducteurs**.',
            '**Fécondation** : union d\'un gamète mâle et d\'un gamète femelle, rétablissant le nombre de chromosomes de l\'espèce : 23 + 23 = **46**.',
            'L\'alternance **méiose – fécondation** maintient le caryotype de génération en génération : la **stabilité génétique de l\'espèce**.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Le tableau comparatif',
          // Quatre colonnes sur un téléphone : les mots longs portent une
          // césure conditionnelle (­), invisible tant qu'ils tiennent.
          colonnes: ['', 'Mitose', 'Méiose', 'Fécon­dation'],
          lignes: [
            ['Départ', '1 cellule', '1 cellule d\'un testi­cule ou d\'un ovaire', '2 gamètes'],
            ['Obtenu', '2 cellules iden­tiques', 'des gamètes', '1 cellule-œuf'],
            ['Chromo­somes', '46 → 46', '46 → 23', '23 + 23 → 46'],
            ['Où ?', 'tout l\'orga­nisme', 'organes repro­ducteurs', 'une trompe, chez la femme'],
            ['Rôle', 'stabilité', 'diversité (brassage)', 'diversité (brassage)'],
          ],
        },
        {
          type: 'piege',
          lignes: [
            'Méiose et fécondation brassent chacune les allèles : la **diversité**. Mais ensemble, elles maintiennent le caryotype : la **stabilité de l\'espèce**.',
          ],
        },
      ],
      items: [
        {
          id: 't-mitose', type: 'terme', definition: 'Division cellulaire concernant toutes les cellules sauf les gamètes, conservant le nombre de chromosomes',
          attendu: 'mitose',
          pieges: [{ si: 'méiose', message: 'La méiose forme les gamètes et divise par deux le nombre de chromosomes. Celle qui le conserve, c\'est la mitose.' }],
        },
        {
          id: 't-meiose', type: 'terme', definition: 'Division cellulaire à l\'origine des gamètes, divisant par deux le nombre de chromosomes',
          attendu: 'méiose',
          pieges: [{ si: 'mitose', message: 'La mitose conserve le nombre de chromosomes. Celle qui forme les gamètes et le divise par deux, c\'est la méiose.' }],
        },
        { id: 't-gamete', type: 'terme', definition: 'Cellule reproductrice, ne contenant qu\'un chromosome de chaque paire', attendu: 'gamète' },
        {
          id: 't-fecondation', type: 'terme', definition: 'Union d\'un gamète mâle et d\'un gamète femelle, rétablissant le nombre de chromosomes de l\'espèce',
          attendu: 'fécondation',
          pieges: [{ si: ['cellule-œuf', 'œuf'], message: 'La cellule-œuf est ce que forme la fécondation ; l\'union des gamètes, c\'est la fécondation.' }],
        },
        {
          id: 'dvs-mitose', type: 'choix', consigne: BLOC, phrase: 'Que donne une mitose ?',
          options: ['Deux cellules identiques à la cellule de départ, avec 46 chromosomes', 'Des gamètes à 23 chromosomes', 'Une cellule-œuf'],
          attendu: 'Deux cellules identiques à la cellule de départ, avec 46 chromosomes',
          explication: '1 cellule à 46 chromosomes → 2 cellules identiques à 46 chromosomes.',
        },
        {
          id: 'dvs-copie', type: 'choix', consigne: BLOC, phrase: 'Pourquoi les deux cellules issues d\'une mitose ont-elles la même information génétique ?',
          options: [
            'Chaque chromosome a été copié, puis les deux copies se sont séparées : une dans chaque cellule',
            'Chaque cellule reçoit la moitié des chromosomes',
            'Les chromosomes se répartissent au hasard',
          ],
          attendu: 'Chaque chromosome a été copié, puis les deux copies se sont séparées : une dans chaque cellule',
          explication: 'Copie, puis séparation des copies : chaque cellule fille reçoit un exemplaire de chaque chromosome.',
        },
        {
          id: 'dvs-role', type: 'choix', consigne: BLOC, phrase: 'Les mitoses assurent…',
          options: ['la stabilité génétique des cellules de l\'individu', 'la diversité génétique des individus', 'la formation des gamètes'],
          attendu: 'la stabilité génétique des cellules de l\'individu',
          explication: 'Le patrimoine génétique est copié à l\'identique dans toutes les cellules de l\'organisme.',
        },
        {
          id: 'dvs-gamete', type: 'reponse', question: 'Combien de chromosomes contient un gamète humain ?', attendu: '23',
          accepte: ['23 chromosomes', 'n = 23'],
          pieges: [{ si: ['46', '46 chromosomes'], message: '46, c\'est une cellule ordinaire. La méiose divise ce nombre par deux : 23.' }],
          explication: 'Un chromosome de chaque paire : 23.',
        },
        {
          id: 'dvs-meiose-ou', type: 'choix', consigne: BLOC, phrase: 'Où a lieu la méiose ?',
          options: ['Dans les organes reproducteurs', 'Dans toutes les cellules du corps', 'Dans la cellule-œuf'], attendu: 'Dans les organes reproducteurs',
          explication: 'Dans les organes reproducteurs : testicules et ovaires.',
        },
        {
          id: 'dvs-fecondation', type: 'choix', consigne: BLOC, phrase: 'Que rétablit la fécondation ?',
          options: ['Le nombre de chromosomes de l\'espèce : 23 + 23 = 46', 'La moitié des chromosomes', 'Le caryotype de la mère'],
          attendu: 'Le nombre de chromosomes de l\'espèce : 23 + 23 = 46',
          explication: 'Un gamète à 23 + un gamète à 23 → une cellule-œuf à 46.',
        },
        {
          id: 'dvs-espece', type: 'choix', consigne: BLOC, phrase: 'Qu\'est-ce qui maintient le caryotype de l\'espèce de génération en génération ?',
          options: ['L\'alternance de la méiose et de la fécondation', 'Les mitoses seules', 'Les mutations'],
          attendu: 'L\'alternance de la méiose et de la fécondation',
          explication: 'La méiose divise par deux, la fécondation rétablit : le caryotype se maintient.',
        },
      ],
    },

    {
      id: 'svt-brassage',
      seance: 3,
      titre: 'Le brassage : M. et Mme Martin',
      sousTitre: 'Partie 5 — gamètes et tableau de croisement',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Les gamètes',
          lignes: [
            'Un gamète : **23 chromosomes**, un de chaque paire. Une cellule ordinaire : 46, soit 23 paires.',
            'Les ovules portent toujours un chromosome **X** ; les spermatozoïdes, **X ou Y** : c\'est le **spermatozoïde qui détermine le sexe** de l\'enfant.',
          ],
        },
        {
          type: 'regle',
          titre: 'Le brassage des allèles',
          lignes: [
            '**Brassage** : formation de nouvelles associations d\'allèles lors de la méiose et de la fécondation.',
            '**À la méiose**, les chromosomes de chaque paire se répartissent **au hasard** dans les gamètes : un même individu fait des gamètes aux combinaisons d\'allèles différentes.',
            '**À la fécondation**, la rencontre des gamètes est elle aussi **aléatoire**.',
            'Ce **double brassage** fait de chaque cellule-œuf une combinaison **unique** : c\'est l\'origine de la diversité génétique des individus.',
          ],
        },
        {
          type: 'regle',
          titre: 'M. et Mme Martin',
          lignes: [
            '**M. Martin** : allèles **A et O** (paire n° 9), **XY**. Les deux paires se répartissent au hasard : **4 sortes de spermatozoïdes** — A ; X, A ; Y, O ; X, O ; Y.',
            '**Mme Martin** : allèles **A et B**, **XX** : **2 sortes d\'ovules** — A ; X, B ; X.',
            'Le tableau de croisement : les gamètes du père d\'un côté, ceux de la mère de l\'autre ; chaque case est une cellule-œuf possible.',
          ],
        },
        {
          type: 'tableau',
          titre: 'Les huit cellules-œufs possibles',
          colonnes: ['Spermato­zoïde', 'Ovule', 'Enfant'],
          lignes: [
            ['O ; Y', 'B ; X', 'B et O, XY : garçon B'],
            ['A ; X', 'B ; X', 'A et B, XX : fille AB'],
            ['A ; Y', 'B ; X', 'A et B, XY : garçon AB'],
            ['O ; X', 'B ; X', 'B et O, XX : fille B'],
            ['O ; Y', 'A ; X', 'A et O, XY : **garçon A**'],
            ['A ; X', 'A ; X', 'A et A, XX : fille A'],
            ['A ; Y', 'A ; X', 'A et A, XY : **garçon A**'],
            ['O ; X', 'A ; X', 'A et O, XX : fille A'],
          ],
        },
        {
          type: 'regle',
          lignes: [
            'Un garçon de groupe A : **2 cases sur 8**, soit **1 chance sur 4**. Le groupe O est impossible : Mme Martin n\'a pas d\'allèle O.',
            'On ne peut **jamais prévoir avec certitude** le génotype d\'un enfant : méiose et fécondation se font au hasard.',
            'Pour les 23 paires : plus de 8 millions (2²³) de gamètes différents par parent, et environ **70 000 milliards** (7 × 10¹³) de cellules-œufs différentes par couple. Chaque individu est unique.',
          ],
        },
      ],
      items: [
        {
          id: 'bra-gamete', type: 'choix', consigne: BLOC, phrase: 'Comparé à une cellule ordinaire, que contient un gamète humain ?',
          options: ['23 chromosomes, un de chaque paire', '46 chromosomes, comme toutes les cellules', '23 paires de chromosomes'],
          attendu: '23 chromosomes, un de chaque paire',
          explication: 'Cellule ordinaire : 46 chromosomes, 23 paires. Gamète : 23 chromosomes, un de chaque paire.',
        },
        {
          id: 'bra-sexe', type: 'choix', consigne: BLOC, phrase: 'Quel gamète détermine le sexe de l\'enfant ?',
          options: ['Le spermatozoïde : il porte un X ou un Y', 'L\'ovule : il porte un X ou un Y', 'Les deux à égalité'],
          attendu: 'Le spermatozoïde : il porte un X ou un Y',
          explication: 'L\'ovule porte toujours un X ; le spermatozoïde, un X (fille, XX) ou un Y (garçon, XY).',
        },
        {
          id: 'bra-quatre', type: 'choix', consigne: BLOC, phrase: 'M. Martin (allèles A et O, XY) produit quatre sortes de spermatozoïdes pour ces deux paires. Pourquoi ?',
          options: [
            'À la méiose, les chromosomes de chaque paire se répartissent au hasard : A ou O, avec X ou Y',
            'Parce qu\'il a quatre allèles du groupe sanguin',
            'Parce que chaque spermatozoïde reçoit les deux chromosomes de chaque paire',
          ],
          attendu: 'À la méiose, les chromosomes de chaque paire se répartissent au hasard : A ou O, avec X ou Y',
          explication: '2 possibilités pour la paire n° 9 × 2 pour la paire sexuelle = 4 : A ; X, A ; Y, O ; X, O ; Y.',
        },
        {
          id: 'bra-ovules', type: 'choix', consigne: BLOC, phrase: 'Mme Martin a les allèles A et B, et deux chromosomes X. Quelles sortes d\'ovules produit-elle ?',
          options: ['A ; X et B ; X', 'A ; X, A ; Y, B ; X et B ; Y', 'AB ; XX'], attendu: 'A ; X et B ; X',
          explication: 'Un allèle et un X par ovule : A ; X ou B ; X.',
        },
        {
          id: 'bra-oy', type: 'choix', consigne: CROISEMENT, phrase: 'Spermatozoïde O ; Y + ovule A ; X : quel enfant ?',
          options: ['Un garçon de groupe A (A et O, XY)', 'Un garçon de groupe O (O et O, XY)', 'Une fille de groupe A (A et O, XX)'],
          attendu: 'Un garçon de groupe A (A et O, XY)',
          explication: 'A et O → groupe A ; X et Y → garçon.',
        },
        {
          id: 'bra-ay', type: 'choix', consigne: CROISEMENT, phrase: 'Spermatozoïde A ; Y + ovule B ; X : quel enfant ?',
          options: ['Un garçon de groupe AB (A et B, XY)', 'Une fille de groupe AB (A et B, XX)', 'Un garçon de groupe A (A et A, XY)'],
          attendu: 'Un garçon de groupe AB (A et B, XY)',
          explication: 'A et B → groupe AB ; X et Y → garçon.',
        },
        {
          id: 'bra-ox', type: 'choix', consigne: CROISEMENT, phrase: 'Spermatozoïde O ; X + ovule B ; X : quel enfant ?',
          options: ['Une fille de groupe B (B et O, XX)', 'Une fille de groupe O (O et O, XX)', 'Un garçon de groupe B (B et O, XY)'],
          attendu: 'Une fille de groupe B (B et O, XX)',
          explication: 'B et O → groupe B ; X et X → fille.',
        },
        {
          id: 'bra-proba', type: 'choix', consigne: BLOC, phrase: 'Quelle est la probabilité que l\'enfant des Martin soit un garçon de groupe A ?',
          options: ['1 chance sur 4 (2 cases sur 8)', '1 chance sur 2', '1 chance sur 8'], attendu: '1 chance sur 4 (2 cases sur 8)',
          explication: 'Garçon A : O ; Y + A ; X, et A ; Y + A ; X. 2 cases sur 8, soit 1 chance sur 4.',
        },
        {
          id: 'bra-groupe-o', type: 'choix', consigne: BLOC, phrase: 'Les Martin peuvent-ils avoir un enfant de groupe O ?',
          options: ['Non : Mme Martin n\'a pas d\'allèle O', 'Oui, une chance sur 4', 'Oui, si c\'est une fille'], attendu: 'Non : Mme Martin n\'a pas d\'allèle O',
          explication: 'Pour être du groupe O, il faut deux allèles O : Mme Martin ne peut en transmettre aucun.',
        },
        {
          id: 't-brassage', type: 'terme', definition: 'Formation de nouvelles associations d\'allèles lors de la méiose et de la fécondation',
          attendu: 'brassage', accepte: ['brassage génétique', 'brassage des allèles'],
          pieges: [{ si: 'mutation', message: 'Une mutation crée un nouvel allèle. De nouvelles associations d\'allèles qui existent déjà, c\'est le brassage.' }],
        },
        {
          id: 'bra-algo', type: 'choix', consigne: BLOC, phrase: 'Avec 23 paires de chromosomes, combien de cellules-œufs génétiquement différentes un couple peut-il produire ?',
          options: ['Environ 70 000 milliards (7 × 10¹³)', 'Environ 8 millions', '46'], attendu: 'Environ 70 000 milliards (7 × 10¹³)',
          explication: 'Chaque parent : 2²³, plus de 8 millions de gamètes différents. Un couple : 8 388 608 × 8 388 608 ≈ 7 × 10¹³. Chaque individu est unique.',
        },
        {
          id: 'bra-certitude', type: 'choix', consigne: BLOC, phrase: 'Pourquoi ne peut-on pas prévoir avec certitude le génotype d\'un futur enfant ?',
          options: ['Méiose et fécondation se font au hasard', 'Les allèles changent pendant la grossesse', 'Le génotype dépend de l\'environnement'],
          attendu: 'Méiose et fécondation se font au hasard',
          explication: 'Répartition des chromosomes au hasard à la méiose, rencontre des gamètes au hasard à la fécondation.',
        },
      ],
    },

    {
      id: 'svt-ecrire-martin',
      seance: 3,
      titre: 'Écrire : la réponse aux Martin',
      sousTitre: 'La tâche complexe de la partie 5',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: 'Répondre à M. et Mme Martin',
          lignes: [
            'Les **gamètes** de chacun : ceux du père, ceux de la mère.',
            'Le **tableau de croisement** : chaque case est une cellule-œuf possible, toutes aussi probables.',
            'La **probabilité** demandée, les **autres possibilités**, et pourquoi on ne peut **pas prévoir avec certitude**.',
          ],
        },
      ],
      items: [
        {
          id: 'w-martin', type: 'decrire', sujet: 'Un garçon de groupe A ?', emoji: '👶',
          indices: ['spermatozoïdes', 'ovules', 'tableau de croisement', 'probabilité', 'méiose', 'fécondation', 'hasard'],
          consigne: 'M. Martin a les allèles A et O du gène du groupe sanguin, et les chromosomes sexuels X et Y ; Mme Martin a les allèles A et B, et deux chromosomes X. Elle est enceinte, et ils pensent que ce sera un garçon de groupe A. Écris-leur ta réponse : la probabilité que ce soit un garçon de groupe A, les autres possibilités, et pourquoi on ne peut pas prévoir avec certitude le génotype d\'un futur enfant.',
          titreModele: 'Un exemple',
          modele: 'À la méiose, les chromosomes de chaque paire se répartissent au hasard dans les gamètes. M. Martin produit donc quatre sortes de spermatozoïdes : A ; X, A ; Y, O ; X et O ; Y. Mme Martin produit deux sortes d\'ovules : A ; X et B ; X. Le tableau de croisement donne huit cellules-œufs possibles, toutes aussi probables. Deux d\'entre elles donnent un garçon de groupe A : A et O avec XY, et A et A avec XY. La probabilité est donc de 2 sur 8, soit 1 chance sur 4. Les autres possibilités sont un garçon de groupe B ou AB, ou une fille de groupe A, B ou AB ; le groupe O est impossible, car Mme Martin n\'a pas d\'allèle O. On ne peut pas prévoir avec certitude le génotype de l\'enfant, car la répartition des chromosomes à la méiose et la rencontre des gamètes à la fécondation se font au hasard.',
          criteres: [
            { id: 'gametes', texte: 'Les gamètes : quatre sortes de spermatozoïdes (A ; X, A ; Y, O ; X, O ; Y), deux sortes d\'ovules (A ; X, B ; X)' },
            { id: 'probabilite', texte: 'La probabilité : 2 cellules-œufs sur 8, soit 1 chance sur 4, d\'avoir un garçon de groupe A' },
            { id: 'autres', texte: 'Les autres possibilités : un garçon de groupe B ou AB, une fille de groupe A, B ou AB' },
            { id: 'hasard', texte: 'Pas de certitude : la méiose et la fécondation se font au hasard' },
          ],
        },
      ],
    },

    {
      id: 'svt-cycle',
      seance: 3,
      titre: 'Le cycle et le patrimoine génétique',
      sousTitre: 'Partie 6 — l\'activité de synthèse',
      duree: 2,
      fiche: [
        {
          type: 'regle',
          titre: '6. Le cycle de développement',
          lignes: [
            '**Cellule-œuf** (46) → **mitoses** → un **individu** (46 dans chaque cellule) → **méiose**, dans les organes reproducteurs → **gamètes** (23) → **fécondation** → une nouvelle cellule-œuf (46).',
            'Stabilité : les **mitoses** pour les cellules de l\'individu ; l\'alternance **méiose – fécondation** pour le caryotype de l\'espèce.',
            'Diversité : le **brassage** des allèles, à la méiose et à la fécondation, et les **mutations** de l\'ADN.',
          ],
        },
        {
          type: 'regle',
          titre: 'Le patrimoine génétique',
          lignes: [
            '**Patrimoine génétique** : ensemble de l\'information génétique transmise par les parents — portée par les chromosomes, faite de gènes.',
            'Chaque parent en transmet la **moitié**, par un gamète ; les mitoses le copient à l\'identique dans toutes les cellules.',
            'Il garde les caractéristiques de l\'**espèce** (mêmes gènes, même caryotype) et reste **unique** (une combinaison d\'allèles propre, issue du brassage).',
            'Le **phénotype** : l\'expression du génotype, modulée par l\'**environnement**.',
          ],
        },
      ],
      items: [
        {
          id: 'cyc-ordre', type: 'ordre', consigne: 'Le cycle de développement de l\'être humain : remets-le dans l\'ordre, en partant de la cellule-œuf.',
          elements: [
            'La cellule-œuf : 46 chromosomes.',
            'Des mitoses successives : la cellule-œuf devient un individu.',
            'L\'individu : 46 chromosomes dans chacune de ses cellules.',
            'La méiose, dans les organes reproducteurs.',
            'Les gamètes : 23 chromosomes.',
            'La fécondation : une nouvelle cellule-œuf à 46 chromosomes.',
          ],
        },
        {
          id: 't-patrimoine', type: 'terme', definition: 'Ensemble de l\'information génétique transmise par les parents', attendu: 'patrimoine génétique',
          pieges: [
            { si: 'patrimoine', resultat: 'presque', message: 'Le terme complet : patrimoine génétique.' },
            { si: 'génotype', message: 'Le génotype, c\'est l\'ensemble des allèles. Toute l\'information génétique transmise par les parents : le patrimoine génétique.' },
          ],
        },
        {
          id: 'cyc-moitie', type: 'choix', consigne: BLOC, phrase: 'Quelle part de son patrimoine génétique chaque parent transmet-il, et comment ?',
          options: ['La moitié, par un gamète', 'La totalité, par la cellule-œuf', 'Un quart, par le sang'], attendu: 'La moitié, par un gamète',
          explication: 'Un gamète : un chromosome de chaque paire, la moitié du patrimoine génétique.',
        },
        {
          id: 'cyc-unique', type: 'choix', consigne: BLOC, phrase: 'Le patrimoine génétique d\'un individu est…',
          options: [
            'commun à l\'espèce (mêmes gènes, même caryotype), mais unique par sa combinaison d\'allèles',
            'identique à celui de ses parents',
            'le même pour tous les humains',
          ],
          attendu: 'commun à l\'espèce (mêmes gènes, même caryotype), mais unique par sa combinaison d\'allèles',
          explication: 'Les gènes et le caryotype de l\'espèce ; une combinaison d\'allèles qui n\'appartient qu\'à lui.',
        },
        {
          id: 'cyc-copie', type: 'choix', consigne: BLOC, phrase: 'Comment le patrimoine génétique se retrouve-t-il dans toutes les cellules de l\'organisme ?',
          options: ['Il est copié à l\'identique par les mitoses', 'Chaque cellule le reçoit de la mère', 'Chaque organe fabrique le sien'],
          attendu: 'Il est copié à l\'identique par les mitoses',
          explication: 'Les mitoses copient le patrimoine génétique à l\'identique, de la cellule-œuf à toutes les cellules.',
        },
        {
          id: 'cyc-phenotype', type: 'choix', consigne: BLOC, phrase: 'Le phénotype d\'un individu résulte…',
          options: ['de l\'expression de son génotype, modulée par l\'environnement', 'de son environnement seulement', 'de son caryotype seulement'],
          attendu: 'de l\'expression de son génotype, modulée par l\'environnement',
          explication: 'Le génotype s\'exprime, l\'environnement module : c\'est le phénotype.',
        },
      ],
    },

    // ═══ Séance 4 — les mutations ════════════════════════════════════════════

    {
      id: 'svt-mutations',
      seance: 4,
      titre: 'Les mutations',
      sousTitre: 'Activité 7 — chat polydactyle, levures, pomme dorée',
      duree: 4,
      fiche: [
        {
          type: 'regle',
          titre: '7. La notion de mutation',
          lignes: [
            '**Mutation** : modification aléatoire de l\'ADN d\'un gène, créant un nouvel allèle.',
            'Elle survient **spontanément, au hasard** ; certains facteurs de l\'environnement, comme les **ultraviolets** (UV), augmentent sa fréquence.',
            'Un nouvel allèle peut donner un **nouveau phénotype** : chat à six doigts, levure crème, pomme dorée.',
          ],
        },
        {
          type: 'regle',
          titre: 'Les exemples du cours',
          lignes: [
            '**Chat polydactyle** : un ou plusieurs doigts en plus, **depuis la naissance**. L\'allèle du gène qui contrôle l\'organisation de la patte a muté : nouveau génotype → nouveau phénotype.',
            '**Levures** (rouges) exposées aux **UV** : une colonie **crème** apparaît — une levure a muté. Les levures crème donnent toujours des levures crème : le nouveau caractère est **héréditaire**.',
            '**Pomme dorée** : une cellule du fruit a muté ; par mitoses, elle a transmis son génotype aux cellules issues d\'elle — d\'où une partie dorée.',
          ],
        },
        {
          type: 'regle',
          titre: 'Transmise ou pas ?',
          lignes: [
            'La mutation passe, par les **mitoses**, à toutes les cellules issues de la cellule mutée.',
            'Dans une cellule d\'un **organe non reproducteur** (le fruit) : **pas transmise** à la descendance.',
            'Dans un **gamète** (ovule ou spermatozoïde) : **transmise** à la descendance — elle peut se répandre dans la population.',
            'Les mutations sont la source de **nouveaux allèles** et, à long terme, de l\'**évolution des espèces**.',
          ],
        },
      ],
      items: [
        {
          id: 't-mutation', type: 'terme', definition: 'Modification aléatoire de l\'ADN d\'un gène, créant un nouvel allèle', attendu: 'mutation',
          pieges: [{ si: 'brassage', message: 'Le brassage associe autrement des allèles qui existent déjà. Créer un nouvel allèle, c\'est une mutation.' }],
        },
        {
          id: 'mut-chat', type: 'choix', consigne: BLOC, phrase: 'Qu\'ont de particulier les chats polydactyles, et depuis quand ?',
          options: ['Un ou plusieurs doigts en plus aux pattes, depuis la naissance', 'Des doigts en moins, après un accident', 'Des griffes plus longues, avec l\'âge'],
          attendu: 'Un ou plusieurs doigts en plus aux pattes, depuis la naissance',
          explication: 'Des doigts supplémentaires, en général aux pattes avant, depuis la naissance.',
        },
        {
          id: 'mut-chat-explication', type: 'choix', consigne: BLOC, phrase: 'Comment expliquer le sixième doigt du chat ?',
          options: [
            'L\'allèle du gène qui contrôle l\'organisation de la patte a muté : nouveau génotype, nouveau phénotype',
            'Le chat a perdu un gène',
            'L\'environnement a fait pousser un doigt',
          ],
          attendu: 'L\'allèle du gène qui contrôle l\'organisation de la patte a muté : nouveau génotype, nouveau phénotype',
          explication: 'Mutation → allèle modifié (le génotype change) → six doigts (le phénotype change).',
        },
        {
          id: 'mut-levure', type: 'choix', consigne: BLOC, phrase: 'Pourquoi une colonie crème apparaît-elle dans la boîte exposée aux UV ?',
          options: ['Les UV ont provoqué une mutation chez une levure', 'Les UV ont décoloré les levures', 'Des levures crème sont venues d\'ailleurs'],
          attendu: 'Les UV ont provoqué une mutation chez une levure',
          explication: 'Les UV augmentent la fréquence des mutations : une levure a muté, et toute sa colonie est crème.',
        },
        {
          id: 'mut-levure-hereditaire', type: 'choix', consigne: BLOC, phrase: 'Le caractère « crème » est-il héréditaire chez la levure ?',
          options: ['Oui : en se multipliant, les levures crème donnent toujours des levures crème', 'Non : il disparaît à la génération suivante'],
          attendu: 'Oui : en se multipliant, les levures crème donnent toujours des levures crème',
          explication: 'Il passe à toutes les levures issues de la levure mutée : il est héréditaire.',
        },
        {
          id: 'mut-allele', type: 'choix', consigne: BLOC, phrase: 'Que crée une mutation ?',
          options: ['Un nouvel allèle', 'Un nouveau gène', 'Un nouveau chromosome'], attendu: 'Un nouvel allèle',
          explication: 'Le gène reste le même ; l\'une de ses versions change : un nouvel allèle.',
        },
        {
          id: 'mut-hasard', type: 'choix', consigne: BLOC, phrase: 'Comment survient une mutation ?',
          options: ['Spontanément, au hasard — les UV en augmentent la fréquence', 'Uniquement à cause des UV', 'Quand l\'individu en a besoin'],
          attendu: 'Spontanément, au hasard — les UV en augmentent la fréquence',
          explication: 'Spontanée et aléatoire ; des facteurs comme les UV la rendent plus fréquente.',
        },
        {
          id: 'mut-pomme', type: 'choix', consigne: BLOC, phrase: 'La couleur dorée de la pomme mutée sera-t-elle transmise aux descendants du pommier ?',
          options: ['Non : la mutation touche une cellule d\'un organe non reproducteur', 'Oui : toute mutation se transmet'],
          attendu: 'Non : la mutation touche une cellule d\'un organe non reproducteur',
          explication: 'Elle ne touche pas les gamètes : elle ne passe pas à la descendance.',
        },
        {
          id: 'mut-transmise', type: 'choix', consigne: BLOC, phrase: 'Quand une mutation est-elle transmise à la descendance ?',
          options: ['Quand elle touche un gamète (ovule ou spermatozoïde)', 'Quand elle touche une cellule de la peau', 'Jamais'],
          attendu: 'Quand elle touche un gamète (ovule ou spermatozoïde)',
          explication: 'Seule une mutation présente dans un gamète passe aux descendants.',
        },
        {
          id: 'mut-mitoses', type: 'choix', consigne: BLOC, phrase: 'Comment la mutation s\'est-elle étendue à toute une partie de la pomme ?',
          options: [
            'La cellule mutée s\'est multipliée par mitoses : ses cellules ont hérité de son génotype',
            'Le soleil a doré cette partie',
            'La mutation a sauté d\'une cellule voisine à l\'autre',
          ],
          attendu: 'La cellule mutée s\'est multipliée par mitoses : ses cellules ont hérité de son génotype',
          explication: 'Les mitoses copient l\'ADN muté dans toutes les cellules issues de la cellule mutée.',
        },
        {
          id: 'mut-evolution', type: 'choix', consigne: BLOC, phrase: 'À long terme, de quoi les mutations sont-elles la source ?',
          options: ['De nouveaux allèles et de l\'évolution des espèces', 'De la stabilité des espèces', 'De nouveaux chromosomes à chaque génération'],
          attendu: 'De nouveaux allèles et de l\'évolution des espèces',
          explication: 'Nouveaux allèles, et à long terme, évolution des espèces.',
        },
      ],
    },

    {
      id: 'svt-ecrire-mutation',
      seance: 4,
      titre: 'Écrire : la pomme et le chat',
      sousTitre: 'Pourquoi l\'une se transmet, et pas l\'autre',
      duree: 3,
      fiche: [
        {
          type: 'regle',
          titre: 'La pomme et le chat',
          lignes: [
            'Ce qui décide : **quelle cellule** a muté.',
            'Une cellule d\'un **organe non reproducteur** → par mitoses, ses cellules filles ; pas les gamètes.',
            'Un **gamète** → la cellule-œuf, puis toutes les cellules du descendant, gamètes compris.',
          ],
        },
      ],
      items: [
        {
          id: 'w-mutation', type: 'decrire', sujet: 'La pomme dorée et le chat polydactyle', emoji: '🍎',
          indices: ['mutation', 'cellule du fruit', 'mitoses', 'gamète', 'descendance', 'depuis la naissance'],
          consigne: 'Explique pourquoi la couleur dorée de la pomme mutée ne sera pas transmise aux descendants du pommier, alors que la polydactylie du chat se transmet à ses chatons.',
          titreModele: 'Un exemple',
          modele: 'Une mutation n\'est transmise à la descendance que si elle touche un gamète. Chez la pomme, la mutation a touché une cellule du fruit, un organe non reproducteur : par mitoses, elle est passée à toutes les cellules issues de cette cellule, qui sont dorées, mais pas aux gamètes du pommier. La couleur dorée ne sera donc pas transmise à ses descendants. Le chat polydactyle, lui, a ce caractère depuis sa naissance : la mutation était dans le gamète dont il est issu, elle est donc présente dans toutes ses cellules, y compris ses gamètes. Elle se transmet ainsi à ses chatons.',
          criteres: [
            { id: 'regle', texte: 'La règle : une mutation n\'est transmise à la descendance que si elle touche un gamète' },
            { id: 'pomme', texte: 'La pomme : la mutation touche une cellule du fruit, un organe non reproducteur — transmise par mitoses à ses cellules, pas à la descendance' },
            { id: 'chat', texte: 'Le chat : la mutation est là depuis sa naissance, donc dans ses gamètes — elle passe aux chatons' },
          ],
        },
      ],
    },
  ],

  // ── Le contrôle blanc ───────────────────────────────────────────────────
  interro: {
    duree: 8,
    tirage: [
      { etape: 'svt-diversite', nombre: 1 },
      { etape: 'svt-hereditaire', nombre: 2 },
      { etape: 'svt-noyau', nombre: 1 },
      { etape: 'svt-adn', nombre: 1 },
      { etape: 'svt-clonage', nombre: 1 },
      { etape: 'svt-caryotype', nombre: 2 },
      { etape: 'svt-genes', nombre: 2 },
      { etape: 'svt-divisions', nombre: 2 },
      { etape: 'svt-brassage', nombre: 1 },
      { etape: 'svt-cycle', nombre: 1 },
      { etape: 'svt-mutations', nombre: 2 },
    ],
  },
};
