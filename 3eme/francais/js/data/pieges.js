// Les pièges : ce qui fait rater l'identification de la classe d'un mot.
//
// Un piège n'est pas une définition oubliée, c'est une SITUATION qui fait
// échouer la définition. Evan peut réciter « l'adverbe est invariable » et
// classer quand même « fort » en adjectif dans « ils parlent fort » — parce
// qu'il a regardé le mot, pas ce que le mot fait dans la phrase.
//
// ── L'erreur de fond, commune à tous ─────────────────────────────────────
//
// Classer un mot d'après son SENS ou d'après son allure habituelle, au lieu de
// son comportement dans CETTE phrase. « Course » dit une action, c'est pourtant
// un nom. « Le » est d'ordinaire un déterminant, mais pas dans « je le vois ».
// D'où la forme de chaque `geste` : un test à faire sur la phrase (remplacer,
// mettre au pluriel, conjuguer, regarder ce qui suit), jamais une définition à
// réciter. C'est aussi ce qui servira pendant le contrôle en classe.
//
// Chaque piège porte :
//   raisonnements  ce qu'on propose à l'élève quand il s'est trompé, et la
//                  réponse propre à CHAQUE choix ;
//   regle          la réexplication, trois lignes maximum ;
//   geste          le test à refaire, formulé comme une action.
//
// Les raisonnements sont rédigés pour être POSSIBLES sur les deux formes
// d'exercice du chapitre — « touche le mot » et « quelle est la classe du mot
// en gras » — puisque le moteur les propose sur l'une comme sur l'autre.

// `equilibre` dit COMMENT on empêche l'élève d'apprendre un motif à la place de
// la règle :
//
//   'neutres'  Le piège ne joue que dans un sens : il faut des items marqués
//              `neutre: true` où il ne joue pas.
//   'naturel'  Les deux réponses apparaissent spontanément dans le lot (le
//              déterminant ET le pronom, l'adjectif ET l'adverbe) : l'équilibre
//              se fait tout seul, à condition que le contenu alterne vraiment.
//   'aucun'    Pas de leurre de surface à contrer.
//
// Tous les pièges de ce chapitre sont des CONFUSIONS ENTRE DEUX CLASSES : ils
// sont donc 'naturel', sauf le pronom méconnu, qui ne se trompe que dans un
// sens (on ne prend jamais un nom pour un pronom).

export const PIEGES = {
  'determinant-ou-pronom': {
    nom: 'Déterminant ou pronom ?',
    equilibre: 'naturel',
    regle:
      "*le, la, les, l', leur* peuvent être déterminants ou pronoms. Le **déterminant** se place devant un **nom**. " +
      'Le **pronom** remplace un nom, et se place souvent devant un **verbe**.',
    geste: 'Regarde le mot qui suit : un nom → déterminant ; un verbe → pronom.',
    raisonnements: [
      {
        id: 'petit-mot-habituel',
        texte: "Je me suis fié à ce que ce petit mot est d'habitude",
        reponse:
          "Ces petits mots changent de classe. *les* est un déterminant dans « j'attends **les** élèves », un pronom dans « je **les** attends ». Ce n'est pas le mot qui décide, c'est ce qui le suit.",
      },
      {
        id: 'pas-regarde-la-suite',
        texte: "Je n'ai pas regardé le mot qui venait après",
        reponse:
          "C'est lui qui décide. Devant un nom (« **leur** maison »), c'est un déterminant. Devant un verbe (« je **leur** parle »), c'est un pronom.",
      },
      {
        id: 'leur-embrouille',
        texte: "*leur* ou *leurs* m'a embrouillé",
        reponse:
          "Un indice sûr : devant un nom, *leur* est un déterminant et prend un -s si le nom est au pluriel (« **leurs** clés »). Devant un verbe, c'est un pronom, et il ne prend jamais de -s (« je **leur** parle »).",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Regarde juste le mot qui suit : un nom, ou un verbe ?' },
    ],
  },

  'adjectif-ou-adverbe': {
    nom: 'Adjectif ou adverbe ?',
    equilibre: 'naturel',
    regle:
      "L'**adjectif** précise un nom et **s'accorde** avec lui. L'**adverbe** précise un verbe, un adjectif ou un autre adverbe, et reste **invariable**. " +
      'Certains mots sont les deux : *fort, bas, clair, juste, cher*.',
    geste: 'Mets le nom au pluriel ou au féminin : si le mot change avec lui, adjectif ; sinon, adverbe.',
    raisonnements: [
      {
        id: 'choisi-au-sens',
        texte: "Le mot décrit quelque chose, j'ai choisi d'après le sens",
        reponse:
          "Les deux décrivent : l'adjectif décrit un nom, l'adverbe une action ou une qualité. Fais le test du pluriel. « Ta réponse est **fausse** » → « tes réponses sont fausses » : le mot change, adjectif. « Elle chante **faux** » → « elles chantent faux » : il ne bouge pas, adverbe.",
      },
      {
        id: 'mot-a-deux-classes',
        texte: "Ce mot peut être adjectif ou adverbe, j'ai hésité",
        reponse:
          "Justement, il faut regarder CETTE phrase. « Un mur **bas** » : adjectif, il deviendrait « des murs bas ». « Parle **bas** » : adverbe, il ne bouge jamais.",
      },
      {
        id: 'terminaison',
        texte: "Je me suis fié à la terminaison du mot",
        reponse:
          "-ment signale souvent un adverbe (*calmement*), mais pas toujours (*un bâtiment* est un nom), et beaucoup d'adverbes n'ont pas de -ment (*vite, fort, bon*). Seul le test du pluriel tranche.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Mets le nom de la phrase au pluriel. Le mot change-t-il avec lui ?' },
    ],
  },

  'nom-ou-verbe': {
    nom: 'Nom ou verbe ?',
    equilibre: 'naturel',
    regle:
      "Le **verbe** se conjugue : il change quand on change le temps. Le **nom** peut être précédé d'un **déterminant**. " +
      '*marche, porte, rire, dîner* peuvent être l\'un ou l\'autre selon la phrase.',
    geste: 'Mets « hier » devant la phrase : si le mot change, verbe. Sinon, cherche un déterminant devant lui : nom.',
    raisonnements: [
      {
        id: 'choisi-au-sens',
        texte: "Je me suis fié au sens du mot",
        reponse:
          "Le sens trompe dans les deux sens : *course* dit une action et c'est un nom, *aboie* dit une action et c'est un verbe. Seul le test tranche : mets « hier » devant la phrase — le verbe change, le nom garde sa forme.",
      },
      {
        id: 'mot-a-deux-classes',
        texte: "Ce mot peut être un nom ou un verbe, j'ai hésité",
        reponse:
          "Justement, il faut regarder CETTE phrase. « Il **marche** vite » → hier il marchait : verbe. « Une **marche** rapide » → *une* devant, rien ne se conjugue : nom.",
      },
      {
        id: 'test-hier-oublie',
        texte: "Je n'ai pas fait le test « hier »",
        reponse:
          "C'est lui qui départage. Le mot qui change quand on met « hier » est le verbe. Et un verbe à l'infinitif (*il faut partir*) reste un verbe — sauf s'il a un déterminant devant : *le dîner* est un nom.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Y a-t-il un déterminant juste devant le mot ?' },
    ],
  },

  'pronom-meconnu': {
    nom: 'Le pronom qui ne ressemble pas à un pronom',
    equilibre: 'aucun',
    regle:
      "Les pronoms ne sont pas seulement *il, elle, nous*. *le mien, celui-ci, qui, dont, personne, rien, chacun, en, y* sont aussi des pronoms : " +
      'ils **remplacent un nom** ou un groupe nominal.',
    geste: 'Demande-toi : ce mot remplace-t-il un nom ? Essaie de mettre le nom à sa place.',
    raisonnements: [
      {
        id: 'seulement-personnels',
        texte: "Pour moi, les pronoms, ce sont *je, tu, il…*",
        reponse:
          "Ce sont les plus connus, pas les seuls. Dans « ton vélo est bleu, **le mien** est rouge », *le mien* remplace « mon vélo » : c'est un pronom.",
      },
      {
        id: 'personne-chacun',
        texte: "*personne*, *rien* ou *chacun* m'ont embrouillé",
        reponse:
          "« Une **personne** gentille » : un déterminant devant, c'est un nom. « **Personne** n'est venu » : pas de déterminant, il tient la place du sujet — c'est un pronom. De même *chaque élève* (déterminant) et *chacun* (pronom).",
      },
      {
        id: 'remplacement-oublie',
        texte: "Je n'ai pas cherché quel nom le mot remplaçait",
        reponse:
          "C'est le test du pronom : si tu peux remettre un nom à sa place (*le mien* → mon vélo, *en* → du gâteau, *qui* → le garçon), c'est un pronom. S'il a un déterminant devant lui, c'est un nom.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel nom ce mot pourrait-il remplacer dans la phrase ?' },
    ],
  },

  'que-relatif-ou-conjonction': {
    nom: '« Que » : pronom relatif ou conjonction ?',
    equilibre: 'naturel',
    regle:
      "*que* est **pronom relatif** quand il reprend un nom placé juste avant lui (son antécédent) : « le livre **que** je lis ». " +
      'Il est **conjonction de subordination** quand il ne remplace rien : « je pense **que** tu as raison ».',
    geste: 'Cherche un nom juste avant *que* et remplace *que* par ce nom : si ça a du sens, pronom relatif.',
    raisonnements: [
      {
        id: 'toujours-conjonction',
        texte: "Pour moi, *que* est toujours une conjonction",
        reponse:
          "Pas quand il reprend un nom. « Le film **que** j'ai vu » : *que* = le film (« j'ai vu le film »). Il remplace un nom : c'est un pronom relatif.",
      },
      {
        id: 'nom-avant',
        texte: "Il y avait un nom avant, donc j'ai dit pronom relatif",
        reponse:
          "Il faut que *que* le reprenne vraiment. « Il dit à sa sœur **que** le film commence » : *que* ne remplace pas « sa sœur ». Il introduit ce qui est dit : conjonction.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Essaie de remplacer *que* par le nom qui est juste avant. Ça a du sens ?' },
    ],
  },

  'preposition-ou-conjonction': {
    nom: 'Préposition ou conjonction de subordination ?',
    equilibre: 'naturel',
    regle:
      'La **préposition** (*à, de, pour, sans, avant, après…*) introduit un nom, un pronom ou un infinitif. ' +
      'La **conjonction de subordination** (*que, quand, parce que, si, lorsque…*) introduit une proposition, avec un **verbe conjugué**.',
    geste: 'Regarde ce qui suit le mot : un verbe conjugué → conjonction ; un nom ou un infinitif → préposition.',
    raisonnements: [
      {
        id: 'sens-proche',
        texte: "Deux mots de sens proche, j'ai confondu leur classe",
        reponse:
          "*avant* et *avant que*, *pour* et *parce que* ont des sens proches mais pas la même classe. Regarde ce qui suit : un nom ou un infinitif → préposition ; une proposition avec un verbe conjugué → conjonction de subordination.",
      },
      {
        id: 'pas-regarde-la-suite',
        texte: "Je n'ai pas regardé ce qui suivait le mot",
        reponse:
          "C'est tout le test. « **sans** bruit », « **chez** son cousin », « **pour** progresser » : un nom ou un infinitif suit, préposition. « **quand** la pluie cessera » : un verbe conjugué suit, conjonction.",
      },
      {
        id: 'infinitif-conjugue',
        texte: "J'ai pris l'infinitif pour un verbe conjugué",
        reponse:
          "Un infinitif (*partir, manger*) ne se conjugue pas : il ne dit ni qui, ni quand. Devant lui, le petit mot est une préposition : « **sans** partir ».",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Qu'est-ce qui suit le mot : un verbe conjugué, ou pas ?" },
    ],
  },

  'coordination-ou-adverbe': {
    nom: 'Conjonction de coordination ou adverbe ?',
    equilibre: 'naturel',
    regle:
      'Il n\'y a que **sept** conjonctions de coordination : *mais, ou, et, donc, or, ni, car*. ' +
      '*puis, ensuite, alors, pourtant* relient aussi des idées, mais ce sont des **adverbes**.',
    geste: 'Récite la liste « mais, ou, et, donc, or, ni, car » : si le mot n\'y est pas, ce n\'est pas une conjonction de coordination.',
    raisonnements: [
      {
        id: 'relie-donc-conjonction',
        texte: "Le mot relie deux idées, donc j'ai pensé conjonction",
        reponse:
          "Beaucoup de mots relient des idées. La classe se vérifie par la liste : *puis* et *ensuite* n'y sont pas. Ce sont des adverbes.",
      },
      {
        id: 'or-car-meconnus',
        texte: "Je n'ai pas reconnu *or*, *ni* ou *car*",
        reponse:
          "Ce sont les trois qu'on oublie. « Il est resté, **car** il pleuvait » : *car* relie deux propositions et fait partie de la liste — conjonction de coordination.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le mot fait-il partie de « mais, ou, et, donc, or, ni, car » ?' },
    ],
  },
};

/** Le raisonnement « au hasard » est proposé partout : c'est le signal le plus
 *  utile pour les parents, et un enfant ne l'écrirait jamais spontanément. */
export const idsPieges = () => Object.keys(PIEGES);
