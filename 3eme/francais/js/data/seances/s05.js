// Séance 5 — Les classes en détail.
//
// Bloc 2 : les cartes mentales de révision données par la professeure. La
// première carte, « Les classes grammaticales », reprend le bloc 1 en allant
// plus loin : la SOUS-classe (quel déterminant, quel pronom, quel adverbe),
// le sens des conjonctions de subordination, et les propositions.
//
// Les phrases sont écrites pour l'appli : le dépôt est public, on n'y recopie
// pas les exemples des cartes.

export default {
  numero: 5,
  bloc: 2,
  titre: 'Les classes en détail',
  sousTitre: 'Quel déterminant, quel pronom, quelle conjonction ?',
  objectif: 'Préciser la sous-classe d\'un mot, le sens d\'une conjonction de subordination, et la nature d\'une proposition.',

  rappels: [
    {
      id: 'r1',
      titre: 'Déterminants et pronoms, en détail',
      texte:
        'Les **articles** : défini (*le, la, les*), indéfini (*un, une, des*), partitif (*du, de la* : *du pain*).\n\n' +
        'Les autres **déterminants** : possessif (*mon, leur*), démonstratif (*ce, cette*), indéfini (*chaque, plusieurs*), interrogatif (*quel livre ?*), exclamatif (*quel courage !*), numéral (*deux, cent*).\n\n' +
        'Les **pronoms** : personnel (*je, le, lui*), relatif (*qui, que, dont, où*), possessif (*le mien*), démonstratif (*celui-ci, cela*), indéfini (*chacun, personne*), interrogatif (*qui ? lequel ?*), adverbial (*en, y*).',
      exemples: [
        {
          phrase: '**Quel** temps ! / **Quel** temps fera-t-il demain ?',
          note: 'Le même *quel* : exclamatif dans une exclamation, interrogatif dans une question. Dans les deux cas, il annonce un nom : c\'est un déterminant.',
        },
        {
          phrase: 'Il vit **en** Espagne. / Des fraises ? J\'**en** veux.',
          note: 'Devant un nom, *en* est une préposition. Devant le verbe, il remplace « des fraises » : pronom adverbial.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'Adverbes, conjonctions, propositions',
      texte:
        'Les **adverbes** disent la manière (*vite*), le temps (*hier*), le lieu (*ici*), la négation (*ne… pas*), le degré (*très*), la **modalisation** — le doute ou la certitude (*peut-être, sans doute*) —, la **liaison** (*cependant, ensuite*), ou ils interrogent (*pourquoi ?*).\n\n' +
        'La **conjonction de subordination** ouvre une subordonnée et lui donne son sens : temps (*quand*), cause (*parce que, puisque*), conséquence (*si bien que*), but (*pour que*), opposition (*bien que*), condition (*si*), comparaison (*comme*).\n\n' +
        'Une **proposition** = un verbe conjugué et ce qui l\'entoure. **Subordonnée** : elle dépend d\'une **principale**. **Indépendante** : seule, ou reliée par *et, mais, ou…*',
      exemples: [
        {
          phrase: '**Comme** il pleuvait, nous sommes rentrés. / Elle chante **comme** sa mère.',
          note: 'Le premier *comme* donne la cause (« parce qu\'il pleuvait »). Le second compare.',
        },
      ],
    },
  ],

  exercices: [
    // ── Rappel 1 : déterminants et pronoms ───────────────────────────────
    {
      id: 's05-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'J\'ai oublié **mon** parapluie.',
      choix: ['déterminant possessif', 'pronom possessif', 'déterminant démonstratif'], attendu: 'déterminant possessif',
    },
    {
      id: 's05-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Ton parapluie est bleu ; **le mien** est noir.',
      choix: ['déterminant possessif', 'pronom possessif', 'pronom personnel'], attendu: 'pronom possessif',
    },
    {
      id: 's05-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: '**Chaque** joueur reçoit un maillot.',
      choix: ['déterminant indéfini', 'pronom indéfini', 'adjectif qualificatif'], attendu: 'déterminant indéfini',
    },
    {
      id: 's05-e4', rappel: 'r1', type: 'qcm', palier: 1, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Les joueurs entrent : **chacun** reçoit un maillot.',
      choix: ['déterminant indéfini', 'pronom indéfini', 'pronom personnel'], attendu: 'pronom indéfini',
    },
    {
      id: 's05-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: '**Quel** livre veux-tu emprunter ?',
      choix: ['déterminant interrogatif', 'déterminant exclamatif', 'pronom interrogatif'], attendu: 'déterminant interrogatif',
    },
    {
      id: 's05-e6', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: '**Quelle** surprise !',
      choix: ['déterminant interrogatif', 'déterminant exclamatif', 'pronom interrogatif'], attendu: 'déterminant exclamatif',
    },
    {
      id: 's05-e7', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Du chocolat ? J\'**en** voudrais un peu.',
      choix: ['préposition', 'pronom adverbial', 'déterminant partitif'], attendu: 'pronom adverbial',
    },
    {
      id: 's05-e8', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Ce bracelet est **en** argent.',
      choix: ['préposition', 'pronom adverbial', 'adverbe'], attendu: 'préposition',
    },
    {
      id: 's05-e9', rappel: 'r1', type: 'toucher', palier: 3, piege: 'sous-classe-du-mot',
      consigne: 'Touche le pronom démonstratif.',
      mots: ['Prends', 'ce', 'stylo', 'ou', 'celui-ci.'], attendus: [4],
    },

    // Réserve du rappel 1.
    {
      id: 's05-r1', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot', reserve: true,
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Ma trousse est pleine ; **la tienne** est vide.',
      choix: ['déterminant possessif', 'pronom possessif', 'pronom personnel'], attendu: 'pronom possessif',
    },
    {
      id: 's05-r2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot', reserve: true,
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: '**Quel** soleil magnifique !',
      choix: ['déterminant interrogatif', 'déterminant exclamatif', 'pronom interrogatif'], attendu: 'déterminant exclamatif',
    },
    {
      id: 's05-r3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot', reserve: true,
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Ce parc ? Nous **y** jouons souvent.',
      choix: ['préposition', 'pronom adverbial', 'pronom démonstratif'], attendu: 'pronom adverbial',
    },

    // ── Rappel 2 : adverbes, conjonctions, propositions ──────────────────
    {
      id: 's05-e10', rappel: 'r2', type: 'qcm', palier: 1, piege: 'sens-de-la-conjonction',
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: 'Nous sommes rentrés **parce qu\'**il pleuvait.',
      choix: ['cause', 'conséquence', 'but'], attendu: 'cause',
    },
    {
      id: 's05-e11', rappel: 'r2', type: 'qcm', palier: 1, piege: 'sens-de-la-conjonction',
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: 'Il pleuvait, **si bien que** nous sommes rentrés.',
      choix: ['cause', 'conséquence', 'but'], attendu: 'conséquence',
    },
    {
      id: 's05-e12', rappel: 'r2', type: 'qcm', palier: 1, piege: 'sens-de-la-conjonction',
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: 'Parle plus fort **pour qu\'**on t\'entende.',
      choix: ['cause', 'conséquence', 'but'], attendu: 'but',
    },
    {
      id: 's05-e13', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-de-la-conjonction',
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: '**Bien qu\'**il soit fatigué, il continue.',
      choix: ['opposition', 'cause', 'condition'], attendu: 'opposition',
    },
    {
      id: 's05-e14', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-de-la-conjonction',
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: '**Comme** il faisait froid, j\'ai pris un manteau.',
      choix: ['cause', 'comparaison', 'temps'], attendu: 'cause',
    },
    {
      id: 's05-e15', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-de-la-conjonction',
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: 'Elle danse **comme** sa sœur.',
      choix: ['cause', 'comparaison', 'temps'], attendu: 'comparaison',
    },
    {
      id: 's05-e16', rappel: 'r2', type: 'qcm', palier: 3, piege: 'sens-de-la-conjonction',
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: '**Si** tu te dépêches, tu auras le bus.',
      choix: ['condition', 'cause', 'temps'], attendu: 'condition',
    },
    {
      id: 's05-e17', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sous-classe-du-mot',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Il viendra **sans doute** demain.',
      choix: ['adverbe de modalisation', 'adverbe de temps', 'adverbe de manière'], attendu: 'adverbe de modalisation',
    },
    {
      id: 's05-e18', rappel: 'r2', type: 'qcm', palier: 2, piege: 'coordination-ou-adverbe',
      consigne: 'Quelle est la classe précise du mot en gras ?',
      phrase: 'Il s\'est beaucoup entraîné ; **pourtant**, il a perdu.',
      choix: ['adverbe de liaison', 'conjonction de coordination', 'adverbe de manière'], attendu: 'adverbe de liaison',
    },
    {
      id: 's05-e19', rappel: 'r2', type: 'qcm', palier: 3, piege: 'type-de-proposition',
      consigne: 'Quelle est la nature de la proposition en gras ?',
      phrase: '**Je sortirai** quand la pluie cessera.',
      choix: ['principale', 'subordonnée', 'indépendante'], attendu: 'principale',
    },
    {
      id: 's05-e20', rappel: 'r2', type: 'qcm', palier: 3, piege: 'type-de-proposition',
      consigne: 'Quelle est la nature de la proposition en gras ?',
      phrase: '**Quand la pluie cessera**, je sortirai.',
      choix: ['principale', 'subordonnée', 'indépendante'], attendu: 'subordonnée',
    },
    {
      id: 's05-e21', rappel: 'r2', type: 'qcm', palier: 3, piege: 'type-de-proposition',
      consigne: 'Quelle est la nature de la proposition en gras ?',
      phrase: '**Le vent souffle** et la pluie tombe.',
      choix: ['principale', 'subordonnée', 'indépendante'], attendu: 'indépendante',
    },

    // Réserve du rappel 2.
    {
      id: 's05-r4', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-de-la-conjonction', reserve: true,
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: 'Il s\'entraîne **afin qu\'**on le sélectionne.',
      choix: ['but', 'cause', 'conséquence'], attendu: 'but',
    },
    {
      id: 's05-r5', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-de-la-conjonction', reserve: true,
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: '**Puisque** tu es là, aide-moi.',
      choix: ['cause', 'condition', 'temps'], attendu: 'cause',
    },
    {
      id: 's05-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'sens-de-la-conjonction', reserve: true,
      consigne: 'Quel est le sens de la conjonction en gras ?',
      phrase: 'Le vent soufflait fort, **de sorte que** la course fut annulée.',
      choix: ['conséquence', 'cause', 'but'], attendu: 'conséquence',
    },
    {
      id: 's05-r7', rappel: 'r2', type: 'qcm', palier: 3, piege: 'type-de-proposition', reserve: true,
      consigne: 'Quelle est la nature de la proposition en gras ?',
      phrase: 'Je pense **que tu as raison**.',
      choix: ['principale', 'subordonnée', 'indépendante'], attendu: 'subordonnée',
    },
    {
      id: 's05-r8', rappel: 'r2', type: 'qcm', palier: 3, piege: 'type-de-proposition', reserve: true,
      consigne: 'Quelle est la nature de la proposition en gras ?',
      phrase: '**Il a ri**, mais personne ne l\'a suivi.',
      choix: ['principale', 'subordonnée', 'indépendante'], attendu: 'indépendante',
    },
    {
      id: 's05-r9', rappel: 'r2', type: 'qcm', palier: 3, piege: 'type-de-proposition', reserve: true,
      consigne: 'Quelle est la nature de la proposition en gras ?',
      phrase: '**Nous partirons** dès que tu seras prête.',
      choix: ['principale', 'subordonnée', 'indépendante'], attendu: 'principale',
    },
  ],
};
