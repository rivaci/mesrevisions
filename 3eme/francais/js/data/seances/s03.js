// Séance 3 — Les mots invariables : adverbe, préposition, conjonction,
// interjection.
//
// Les quatre classes qu'on confond entre elles, précisément parce qu'elles ne
// varient pas : le test du pluriel ne sert à rien pour les départager. Ce qui
// les sépare, c'est ce qu'elles font — préciser (adverbe), introduire un
// complément (préposition), relier (conjonction) — et surtout ce qui les SUIT.
//
// Trois confusions, trois pièges :
//   adjectif-ou-adverbe         « elle chante faux » / « ta réponse est fausse » ;
//   coordination-ou-adverbe     « puis, ensuite » relient des idées mais ne sont
//                               pas dans la liste « mais, ou, et, donc, or, ni,
//                               car » ;
//   preposition-ou-conjonction  « avant le dîner » / « avant que ton père
//                               arrive » : un verbe conjugué suit, ou pas.
//
// L'interjection n'a pas de piège : personne ne la prend pour autre chose. Ses
// items n'en portent donc pas, et le moteur se contente d'afficher la réponse.

export default {
  numero: 3,
  bloc: 1,
  titre: 'Les mots invariables',
  sousTitre: 'Adverbe, préposition, conjonction, interjection',
  objectif: 'Départager les mots invariables en regardant ce qu\'ils font dans la phrase, et ce qui les suit.',

  rappels: [
    {
      id: 'r1',
      titre: 'L\'adverbe et la préposition',
      texte:
        'L\'**adverbe** précise un verbe, un adjectif ou un autre adverbe. Il est **invariable** : *vite, bien, très, souvent, hier, rapidement*.\n\n' +
        'La **préposition** est un petit mot invariable qui **introduit un complément** : *à, de, pour, sans, avec, dans, sur, avant, après, chez*.\n\n' +
        'Le test de l\'adverbe : il ne change jamais, même quand on met la phrase au pluriel ou au féminin.',
      exemples: [
        {
          phrase: 'Il court **très** **vite** **avec** son chien.',
          note: '*très* précise *vite*, qui précise *court* : deux adverbes. *avec* introduit le complément « son chien » : préposition.',
        },
      ],
    },
    {
      id: 'r2',
      titre: 'La conjonction et l\'interjection',
      texte:
        'Les **conjonctions de coordination** relient deux mots ou deux propositions. Il n\'y en a que sept : *mais, ou, et, donc, or, ni, car*.\n\n' +
        'Les **conjonctions de subordination** introduisent une proposition, avec un **verbe conjugué** : *que, quand, parce que, si, lorsque, puisque*.\n\n' +
        'L\'**interjection** exprime une émotion ou imite un bruit, souvent suivie d\'un point d\'exclamation : *Oh ! Aïe ! Chut !*',
      exemples: [
        {
          phrase: 'Il pleut, **mais** nous sortons **parce que** nous aimons marcher.',
          note: '*mais* est dans la liste des sept : coordination. *parce que* est suivi du verbe conjugué *aimons* : subordination.',
        },
      ],
    },
  ],

  exercices: [
    // ── Palier 1 : l'adverbe et la préposition ───────────────────────────
    {
      id: 's03-e1', rappel: 'r1', type: 'toucher', palier: 1, piege: 'adjectif-ou-adverbe',
      consigne: 'Touche l\'adverbe.',
      mots: ['Le', 'train', 'arrive', 'bientôt.'], attendus: [3],
    },
    {
      id: 's03-e2', rappel: 'r1', type: 'qcm', palier: 1, piege: 'adjectif-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Elle chante **faux**.',
      choix: ['adjectif', 'adverbe'], attendu: 'adverbe',
    },
    {
      id: 's03-e3', rappel: 'r1', type: 'qcm', palier: 1, piege: 'adjectif-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Ta réponse est **fausse**.',
      choix: ['adjectif', 'adverbe'], attendu: 'adjectif',
    },
    {
      id: 's03-e4', rappel: 'r1', type: 'toucher', palier: 1, piege: 'preposition-ou-conjonction',
      consigne: 'Touche la préposition.',
      mots: ['Evan', 'part', 'chez', 'son', 'cousin.'], attendus: [2],
    },
    {
      id: 's03-e5', rappel: 'r1', type: 'toucher', palier: 1, piege: 'adjectif-ou-adverbe',
      consigne: 'Touche les deux adverbes.',
      mots: ['Elle', 'répond', 'assez', 'calmement.'], attendus: [2, 3],
    },

    // ── Palier 2 : la conjonction et l'interjection ──────────────────────
    {
      id: 's03-e6', rappel: 'r2', type: 'toucher', palier: 2, piege: 'coordination-ou-adverbe',
      consigne: 'Touche la conjonction de coordination.',
      mots: ['Il', 'est', 'fatigué,', 'donc', 'il', 'se', 'couche.'], attendus: [3],
    },
    {
      id: 's03-e7', rappel: 'r2', type: 'qcm', palier: 2, piege: 'coordination-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Il a mangé, **puis** il est parti.',
      choix: ['conjonction de coordination', 'adverbe'], attendu: 'adverbe',
    },
    {
      id: 's03-e8', rappel: 'r2', type: 'qcm', palier: 2, piege: 'coordination-ou-adverbe',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Je reste à la maison, **car** il est tard.',
      choix: ['conjonction de coordination', 'adverbe', 'préposition'], attendu: 'conjonction de coordination',
    },
    {
      id: 's03-e9', rappel: 'r2', type: 'qcm', palier: 2, piege: 'preposition-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Nous jouerons dehors **quand** la pluie cessera.',
      choix: ['préposition', 'conjonction de subordination', 'adverbe'], attendu: 'conjonction de subordination',
    },
    {
      id: 's03-e10', rappel: 'r2', type: 'qcm', palier: 2,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: '**Aïe** ! Je me suis coupé.',
      choix: ['interjection', 'nom', 'adverbe'], attendu: 'interjection',
    },

    // ── Palier 3 : préposition ou conjonction de subordination ───────────
    {
      id: 's03-e11', rappel: 'r2', type: 'qcm', palier: 3, piege: 'preposition-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Range ta chambre **avant** le dîner.',
      choix: ['préposition', 'conjonction de subordination'], attendu: 'préposition',
    },
    {
      id: 's03-e12', rappel: 'r2', type: 'qcm', palier: 3, piege: 'preposition-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale des mots en gras ?',
      phrase: 'Range ta chambre **avant que** ton père arrive.',
      choix: ['préposition', 'conjonction de subordination'], attendu: 'conjonction de subordination',
    },
    {
      id: 's03-e13', rappel: 'r2', type: 'qcm', palier: 3, piege: 'preposition-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Il s\'entraîne chaque soir **pour** progresser.',
      choix: ['préposition', 'conjonction de subordination'], attendu: 'préposition',
    },
    {
      id: 's03-e14', rappel: 'r2', type: 'qcm', palier: 3, piege: 'preposition-ou-conjonction',
      consigne: 'Quelle est la classe grammaticale des mots en gras ?',
      phrase: '**Parce que** son frère l\'aide, il progresse.',
      choix: ['préposition', 'conjonction de subordination'], attendu: 'conjonction de subordination',
    },

    // ── Réserve ──────────────────────────────────────────────────────────
    {
      id: 's03-r1', rappel: 'r2', type: 'qcm', palier: 2, piege: 'coordination-ou-adverbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Tu viens avec nous **ou** tu restes ici ?',
      choix: ['conjonction de coordination', 'adverbe'], attendu: 'conjonction de coordination',
    },
    {
      id: 's03-r2', rappel: 'r2', type: 'qcm', palier: 2, piege: 'coordination-ou-adverbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: 'Il a fini ses devoirs, **ensuite** il est sorti.',
      choix: ['conjonction de coordination', 'adverbe'], attendu: 'adverbe',
    },
    {
      id: 's03-r3', rappel: 'r1', type: 'qcm', palier: 3, piege: 'preposition-ou-conjonction',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Il est rentré **après** le match.",
      choix: ['préposition', 'conjonction de subordination'], attendu: 'préposition',
    },
    {
      id: 's03-r4', rappel: 'r2', type: 'qcm', palier: 3, piege: 'preposition-ou-conjonction',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Je t'appellerai **lorsque** le train arrivera.",
      choix: ['préposition', 'conjonction de subordination'], attendu: 'conjonction de subordination',
    },
    {
      id: 's03-r5', rappel: 'r1', type: 'qcm', palier: 3, piege: 'preposition-ou-conjonction',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Elle lit **sans** s'arrêter.",
      choix: ['préposition', 'conjonction de subordination'], attendu: 'préposition',
    },
    {
      id: 's03-r6', rappel: 'r2', type: 'qcm', palier: 2, piege: 'coordination-ou-adverbe',
      reserve: true,
      consigne: 'Quelle est la classe grammaticale du mot en gras ?',
      phrase: "Je ne veux **ni** thé ni café.",
      choix: ['conjonction de coordination', 'adverbe'], attendu: 'conjonction de coordination',
    },
  ],
};
