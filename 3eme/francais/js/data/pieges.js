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

  // ══ Bloc 2 — les cartes mentales de révision ═══════════════════════════
  //
  // Même principe qu'au bloc 1 : chaque piège est une confusion entre deux
  // réponses, et son geste est un test à refaire sur la phrase. Ceux du
  // participe passé exigent une forme écrite ou choisie (`exige: 'ecrit'`) :
  // « j'ai accordé avec le sujet » n'a pas de sens sur un mot qu'on touche.

  'sous-classe-du-mot': {
    nom: 'Préciser la classe d\'un mot',
    equilibre: 'naturel',
    regle:
      'Après la classe, la sous-classe : déterminant ou pronom **possessif** (*mon* / *le mien*), **démonstratif** (*ce* / *celui*), ' +
      '**indéfini** (*chaque* / *chacun*), **interrogatif** (*quel… ?*), **exclamatif** (*quel… !*) ; *en* et *y* qui remplacent un groupe, **pronoms adverbiaux** (mais *en* devant un nom ou dans un gérondif, *en marchant*, est une préposition) ; ' +
      'adverbe de **manière, temps, lieu, degré, modalisation** (*peut-être*), **liaison** (*cependant*).',
    geste: 'Regarde d\'abord ce qui suit le mot (un nom ? un verbe ?), puis demande-toi ce qu\'il exprime : à qui, lequel, une question, une exclamation, un doute.',
    raisonnements: [
      {
        id: 'determinant-pronom',
        texte: "J'ai confondu le déterminant et le pronom",
        reponse:
          "*mon* annonce un nom (« **mon** vélo »), *le mien* le remplace (« **le mien** est rouge »). Même famille, possessive, mais pas la même classe : regarde s'il y a un nom juste après.",
      },
      {
        id: 'question-exclamation',
        texte: "Je n'ai pas regardé si la phrase posait une question ou s'exclamait",
        reponse:
          "*quel* change de sous-classe avec la ponctuation : « **Quel** livre lis-tu ? » demande, il est interrogatif ; « **Quel** beau livre ! » s'exclame, il est exclamatif.",
      },
      {
        id: 'en-y-preposition',
        texte: "J'ai pris « en » ou « y » pour une préposition",
        reponse:
          "Devant un nom (« **en** France ») ou dans un gérondif (« **en** marchant »), *en* est une préposition. Quand *en* ou *y* remplacent un groupe — « des pommes ? j'**en** mange », « ce parc ? nous **y** jouons » —, ce sont des pronoms adverbiaux.",
      },
      {
        id: 'adverbe-sens',
        texte: "Je n'ai pas su dire ce qu'exprimait l'adverbe",
        reponse:
          "Pose la question : comment ? (manière), quand ? (temps), où ? (lieu), à quel point ? (degré). *peut-être, sans doute* disent si l'on est sûr : modalisation. *cependant, ensuite* relient deux idées : liaison.",
      },
      {
        id: 'determinant-adjectif',
        texte: "J'ai pris le déterminant pour un adjectif",
        reponse:
          "Le déterminant ouvre le groupe nominal et ne peut pas disparaître : « **chaque** joueur », pas « joueur reçoit un maillot ». L'adjectif, lui, précise le nom et s'enlève souvent sans casser la phrase.",
      },
      {
        id: 'sous-classe-pronom',
        texte: "J'ai bien vu un pronom, mais pas lequel",
        reponse:
          "Demande-toi ce qu'il remplace, et comment : à qui ? (*le mien* : possessif) ; lequel ? (*celui-ci* : démonstratif) ; une quantité vague (*chacun, personne* : indéfini) ; un groupe introduit par *de* ou *à* (*en, y* : adverbial).",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Un nom suit-il le mot ? Puis : qu\'exprime-t-il — à qui, lequel, une question, un doute ?' },
    ],
  },

  'sens-de-la-conjonction': {
    nom: 'Cause, conséquence, but…',
    equilibre: 'naturel',
    regle:
      'La conjonction de subordination donne son sens à la subordonnée : **cause** (*parce que, puisque, comme* en tête), **conséquence** (*si bien que, de sorte que*), ' +
      '**but** (*pour que, afin que*), **opposition** (*bien que*), **condition** (*si*), **temps** (*quand*), **comparaison** (*comme, ainsi que*).',
    geste: 'Remplace la conjonction par « parce que », puis par « si bien que », puis par « pour que » : celle qui garde le sens de la phrase donne la réponse.',
    raisonnements: [
      {
        id: 'cause-consequence',
        texte: "J'ai confondu la cause et la conséquence",
        reponse:
          "Dans les faits, la cause a lieu d'abord et la conséquence en résulte ; l'ordre dans la phrase ne compte pas. « Il a couru, **si bien qu'**il est essoufflé » : l'essoufflement suit la course, c'est la conséquence.",
      },
      {
        id: 'cause-but',
        texte: "J'ai confondu la cause et le but",
        reponse:
          "Le but est voulu, pas encore réalisé : « Il parle fort **pour qu'**on l'entende ». La cause est déjà là, elle explique : « Il parle fort **parce qu'**il est loin ».",
      },
      {
        id: 'comme-comparaison',
        texte: "« comme » m'a fait penser à une comparaison",
        reponse:
          "*comme* a plusieurs sens. En tête, devant une proposition, il donne souvent la cause (« **Comme** il neigeait, l'école a fermé » = parce qu'il neigeait), parfois le temps (« **Comme** il sortait, le téléphone sonna » = au moment où). Il compare quand on peut dire « de la même façon que ».",
      },
      {
        id: 'opposition',
        texte: "J'ai confondu l'opposition avec la cause ou la condition",
        reponse:
          "L'opposition dit que l'action a lieu MALGRÉ autre chose : « **Bien qu'**il soit fatigué, il continue » — la fatigue devrait l'arrêter, et ne l'arrête pas. La condition dit ce qui doit se produire d'abord : « **Si** tu te dépêches, tu auras le bus ».",
      },
      {
        id: 'pas-remplace',
        texte: "Je n'ai pas essayé de remplacer la conjonction",
        reponse:
          "Remplace-la par une conjonction dont tu es sûr : « parce que » (cause), « si bien que » (conséquence), « pour que » (but), « bien que » (opposition), « si » (condition), « quand » (temps). Celle qui garde le sens de la phrase donne la réponse.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Remplace la conjonction par « parce que », puis par « si bien que » : laquelle garde le sens ?' },
    ],
  },

  'type-de-proposition': {
    nom: 'Principale, subordonnée ou indépendante ?',
    equilibre: 'naturel',
    regle:
      'Une **proposition** = un verbe conjugué et ce qui l\'entoure. La **subordonnée** commence par un mot subordonnant (*que, qui, quand, parce que…*) ' +
      'et dépend de la **principale**. Une proposition seule, ou reliée par *et, mais, ou…*, est **indépendante**.',
    geste: 'Repère chaque verbe conjugué, puis le mot qui ouvre sa proposition. Un subordonnant → subordonnée. Pas de subordonnant : si une subordonnée dépend d\'elle → principale ; sinon → indépendante.',
    raisonnements: [
      {
        id: 'premiere-principale',
        texte: "J'ai pris la première proposition pour la principale",
        reponse:
          "L'ordre ne décide pas : dans « **Quand il pleut**, je lis », la subordonnée vient en premier. C'est le mot qui l'ouvre, *quand*, qui en fait une subordonnée.",
      },
      {
        id: 'coordonnees',
        texte: "Deux propositions reliées par « et », j'ai pensé principale et subordonnée",
        reponse:
          "*et, mais, ou, donc, or, ni, car* coordonnent : les deux propositions restent au même rang. Si aucune ne dépend d'une autre, chacune est **indépendante**. Seul un mot subordonnant crée une subordonnée.",
      },
      {
        id: 'subordonnant-rate',
        texte: "Je n'ai pas repéré le mot subordonnant",
        reponse:
          "Une subordonnée commence par un mot qui la rattache à une autre proposition : *que, qui, quand, si, parce que, dès que, bien que*… S'il y en a un en tête de la proposition, c'est une subordonnée ; celle dont elle dépend est la principale.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Un subordonnant ouvre-t-il la proposition ? Sinon : une subordonnée dépend-elle d\'elle (principale), ou aucune (indépendante) ?' },
    ],
  },

  'sujet-inverse': {
    nom: 'Le sujet placé après le verbe',
    equilibre: 'naturel',
    regle:
      'Le **sujet** n\'est pas toujours avant le verbe : *Dans la forêt vivait **un ogre**.* ' +
      'Pour le trouver, pose « qui est-ce qui ? » ou « qu\'est-ce qui ? » devant le verbe.',
    geste: 'Pose la question « Qui est-ce qui… ? » avec le verbe : la réponse est le sujet, même s\'il vient après.',
    raisonnements: [
      {
        id: 'groupe-avant',
        texte: "J'ai pris le groupe placé avant le verbe",
        reponse:
          "Avant le verbe, il y a souvent un complément circonstanciel : « **Dans la forêt** vivait un ogre ». Pose la question : qui est-ce qui vivait ? — un ogre. C'est le sujet, même placé après.",
      },
      {
        id: 'apres-donc-cod',
        texte: "Le groupe était après le verbe, j'ai pensé COD",
        reponse:
          "Un COD subit l'action. Dans « Au loin passait **un train** », le train ne subit rien, c'est lui qui passe. Qui est-ce qui passait ? — un train : sujet inversé.",
      },
      {
        id: 'cod-coi',
        texte: "J'ai confondu COD et COI",
        reponse:
          "Le COD se construit sans préposition : « le facteur apporte **un colis** ». Le COI est introduit par une préposition, *à* ou *de* : « il parle **à sa voisine** ».",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Pose « Qui est-ce qui… ? » devant le verbe.' },
    ],
  },

  'complement-du-verbe-ou-cc': {
    nom: 'Complément du verbe ou circonstanciel ?',
    equilibre: 'naturel',
    regle:
      'Le **complément circonstanciel** se **déplace** en tête de phrase, et le plus souvent se supprime : *Le matin, je cours.* ' +
      'Le **COI** et le **complément essentiel** (lieu, temps, prix, poids, mesure) sont liés au verbe : ils ne se déplacent pas en tête, et souvent ne se suppriment pas (*Il va **à Rome***, *Ce sac pèse **trois kilos***). ' +
      'À la voix passive, celui qui fait l\'action est **complément d\'agent**.',
    geste: 'Mets le groupe en tête de phrase : s\'il s\'y déplace sans abîmer la phrase, c\'est un complément circonstanciel.',
    raisonnements: [
      {
        id: 'lieu-donc-cc',
        texte: "Il indiquait un lieu ou un temps, donc j'ai pensé circonstanciel",
        reponse:
          "Le sens ne suffit pas. « Il va **à Rome** » : sans *à Rome*, la phrase ne tient plus, et « À Rome, il va » sonne faux — complément essentiel de lieu. « Il étudie **à Rome** » se déplace (« À Rome, il étudie ») : CC de lieu.",
      },
      {
        id: 'cod-coi',
        texte: "J'ai confondu COD et COI",
        reponse:
          "Le COD se construit sans préposition : « elle aide **son frère** ». Le COI est introduit par une préposition, *à* ou *de* : « elle parle **à son frère** », « il rêve **de vacances** ».",
      },
      {
        id: 'coi-ou-cc',
        texte: "J'ai confondu COI et complément circonstanciel",
        reponse:
          "Les deux peuvent commencer par *à* ou *de*. Le COI répond à « à qui ? / à quoi ? » et ne se déplace pas : « elle pense **à son frère** ». Le CC se déplace : « **À la cantine**, il mange ».",
      },
      {
        id: 'mesure-cod',
        texte: "J'ai pris le complément de prix ou de poids pour un COD",
        reponse:
          "« Ce melon pèse **deux kilos** » : on ne peut pas dire « deux kilos sont pesés par ce melon ». Le groupe mesure, il ne subit rien : complément essentiel de poids. Dans « le marchand pèse **le melon** », c'est un COD.",
      },
      {
        id: 'par-agent',
        texte: "« par » m'a trompé",
        reponse:
          "Avec un verbe passif, *par* introduit celui qui fait l'action : « La lettre est écrite **par Lucie** » → Lucie écrit la lettre : complément d'agent. Sinon, *par* peut introduire un lieu : « il entre **par la fenêtre** ».",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Mets le groupe en tête de phrase : se déplace-t-il sans abîmer la phrase ?' },
    ],
  },

  'cod-ou-attribut': {
    nom: 'COD ou attribut ?',
    equilibre: 'naturel',
    regle:
      'Après un **verbe d\'état** (*être, paraître, sembler, devenir, rester, avoir l\'air*), le groupe qui dit ce qu\'est le sujet est **attribut du sujet**. ' +
      'Après un verbe d\'action, le groupe qui subit l\'action est **COD**. L\'**attribut du COD** dit ce qu\'est le COD : *On l\'a élu **capitaine***.',
    geste: 'Remplace le verbe par « être » : si la phrase garde son sens (il devient médecin → il est médecin), c\'est un attribut.',
    raisonnements: [
      {
        id: 'question-quoi',
        texte: "J'ai posé la question « quoi ? » après le verbe",
        reponse:
          "« Il devient quoi ? — médecin » : la question marche, mais elle ne suffit pas. Après un verbe d'état, le groupe désigne le sujet lui-même (il = médecin) : attribut. Le COD est un autre être, qui subit l'action : « il appelle **un médecin** ».",
      },
      {
        id: 'verbe-etat-meconnu',
        texte: "Je n'ai pas reconnu le verbe d'état",
        reponse:
          "Les verbes d'état ne sont pas seulement *être* : *paraître, sembler, devenir, demeurer, rester, avoir l'air* en sont aussi. Fais le test : remplace-le par *être*.",
      },
      {
        id: 'attribut-du-cod',
        texte: "J'ai oublié l'attribut du COD",
        reponse:
          "Dans « On l'a élu **capitaine** », *l'* est COD, et *capitaine* dit ce qu'il est devenu : attribut du COD. Le test : « il est capitaine ».",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Remplace le verbe par « être » : la phrase garde-t-elle son sens ?' },
    ],
  },

  'complement-de-l-adjectif': {
    nom: 'Le complément de l\'adjectif',
    equilibre: 'naturel',
    regle:
      'Un complément peut dépendre d\'un **adjectif** : *fier **de son fils*** (complément de l\'adjectif), *plus grand **que moi*** (complément du comparatif), ' +
      '*le plus rapide **de la classe*** (complément du superlatif).',
    geste: 'Retire l\'adjectif : si le complément n\'a plus de sens, ou plus le même, c\'est l\'adjectif qu\'il complétait.',
    raisonnements: [
      {
        id: 'preposition-coi',
        texte: "La préposition m'a fait penser à un COI",
        reponse:
          "« Il est fier **de son fils** » : *de son fils* complète *fier*, pas le verbe — « il est de son fils » ne veut rien dire. C'est un complément de l'adjectif.",
      },
      {
        id: 'comparatif-superlatif',
        texte: "J'ai confondu comparatif et superlatif",
        reponse:
          "Le comparatif met deux êtres face à face : « plus grand **que moi** ». Le superlatif place au sommet d'un ensemble : « le plus grand **de la classe** ».",
      },
      {
        id: 'complement-du-nom',
        texte: "J'ai pensé à un complément du nom",
        reponse:
          "Un complément du nom complète un NOM. Ici, le groupe complète un ADJECTIF (*allergique, heureuse, le plus jeune*) : retire l'adjectif, et le complément n'a plus de sens, ou plus le même.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Retire l\'adjectif : le complément garde-t-il le même sens ?' },
    ],
  },

  'epithete-ou-attribut': {
    nom: 'Épithète ou attribut ?',
    equilibre: 'naturel',
    regle:
      'L\'adjectif **épithète** fait partie du groupe nominal : collé au nom (**liée** : *un ciel **bleu***) ou séparé par une virgule (**détachée**). ' +
      'L\'**attribut** est relié au sujet par un **verbe d\'état** : *le ciel est **bleu***.',
    geste: 'Cherche un verbe d\'état entre le nom et l\'adjectif : s\'il y en a un, attribut ; sinon, épithète.',
    raisonnements: [
      {
        id: 'liee-detachee',
        texte: "J'ai confondu épithète liée et épithète détachée",
        reponse:
          "L'épithète **liée** est collée au nom, sans virgule : « un berger **inquiet** ». **Détachée**, elle est séparée du nom par une virgule, et on peut la déplacer : « **Inquiet**, le berger… » ou « Le berger, **inquiet**, … ».",
      },
      {
        id: 'virgule-attribut',
        texte: "La virgule m'a fait penser à un attribut",
        reponse:
          "Une virgule ne fait pas un attribut. « **Fatigué**, le coureur ralentit » : aucun verbe d'état ne relie *fatigué* à *coureur* — c'est une épithète détachée.",
      },
      {
        id: 'verbe-etat-oublie',
        texte: "Je n'ai pas vu le verbe d'état",
        reponse:
          "« La soupe semble **froide** » : *semble* est un verbe d'état, il relie *froide* au sujet. C'est un attribut du sujet.",
      },
      {
        id: 'loin-du-nom',
        texte: "L'adjectif était loin du nom",
        reponse:
          "La distance ne décide pas. « La mer, ce matin, est **calme** » : l'adjectif est loin du nom, mais relié par *est* — attribut.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Y a-t-il un verbe d\'état entre le nom et l\'adjectif ?' },
    ],
  },

  'expansion-du-nom': {
    nom: 'Quelle expansion du nom ?',
    equilibre: 'naturel',
    regle:
      'On regarde la **classe** de l\'expansion : un adjectif ou un participe → **épithète** ; un groupe prépositionnel → **complément du nom** ; ' +
      'une relative → **complément de l\'antécédent** ; un nom, un groupe nominal ou un infinitif détaché qui désigne la même réalité → **apposition**.',
    geste: 'Trouve d\'abord la classe du groupe (adjectif ? préposition + nom ? *qui, que* ? nom ?), puis déduis-en la fonction.',
    raisonnements: [
      {
        id: 'virgule-suffit',
        texte: "Je me suis fié aux virgules",
        reponse:
          "Les virgules disent qu'un élément est détaché, pas lequel. « Lucas, **mon voisin** » : un groupe nominal, apposition. « Lucas, **ravi** » : un adjectif, épithète détachée.",
      },
      {
        id: 'participe-nom',
        texte: "J'ai pris le participe pour un nom",
        reponse:
          "« **Épuisé** par la course, il s'assit » : *épuisé* vient du verbe *épuiser* et s'accorde comme un adjectif (épuisée, épuisés). Un participe détaché est une épithète détachée.",
      },
      {
        id: 'infinitif',
        texte: "Je ne pensais pas qu'un infinitif pouvait être une apposition",
        reponse:
          "Si : « Son rêve, **voyager**, l'occupe tout entier » — *voyager* désigne la même chose que *son rêve*, comme un nom. C'est une apposition.",
      },
      {
        id: 'cdn-ou-coi',
        texte: "J'ai confondu le complément du nom et un complément du verbe",
        reponse:
          "Le complément du nom complète un **nom** : « la peur **du noir** ». Le COI complète un **verbe** : « il parle **du film** ». Demande-toi quel mot le groupe complète.",
      },
      {
        id: 'relative',
        texte: "Je n'ai pas reconnu la relative",
        reponse:
          "Une proposition ouverte par *qui, que, dont, où* qui complète le nom placé juste avant (l'antécédent) est une relative : sa fonction est complément de l'antécédent. « Le film **que j'ai vu** ».",
      },
      {
        id: 'classe-du-groupe',
        texte: "Je n'ai pas regardé la classe du groupe",
        reponse:
          "La fonction se déduit de la classe : un adjectif ou un participe → épithète ; une préposition suivie d'un nom → complément du nom (« une boîte **à chaussures** ») ; *qui, que, dont, où* → relative ; un nom détaché → apposition.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quelle est la classe du groupe : adjectif, groupe prépositionnel, relative, nom ?' },
    ],
  },

  'sens-du-cc': {
    nom: 'Quel complément circonstanciel ?',
    equilibre: 'naturel',
    regle:
      'Le CC dit une **circonstance** : temps (quand ?), lieu (où ?), **moyen** (avec quoi ?), **manière** (comment ?), **accompagnement** (avec qui ?), ' +
      '**cause** (pourquoi ?), **but** (pour quoi faire ?), conséquence, comparaison, **opposition**, **condition**.',
    geste: 'Pose la question : avec quoi ? (moyen) — comment ? (manière) — avec qui ? (accompagnement) — pourquoi ? (cause) — pour quoi faire ? (but).',
    raisonnements: [
      {
        id: 'moyen-maniere',
        texte: "J'ai confondu le moyen et la manière",
        reponse:
          "Le moyen est un outil : « Il écrit **avec un stylo** » (avec quoi ?). La manière dit comment l'action se fait : « Il écrit **avec soin** » (comment ?).",
      },
      {
        id: 'cause-but',
        texte: "J'ai confondu la cause et le but",
        reponse:
          "La cause explique ce qui a déjà eu lieu : « Il est resté **à cause de la pluie** ». Le but vise ce qu'on veut obtenir : « Il s'entraîne **pour gagner** ».",
      },
      {
        id: 'avec',
        texte: "« avec » m'a fait choisir trop vite",
        reponse:
          "*avec* introduit plusieurs circonstances. Avec une personne (« il part **avec son frère** ») : accompagnement. Avec un outil : moyen. Avec un nom abstrait (*avec patience*) : manière.",
      },
      {
        id: 'opposition-condition',
        texte: "J'ai confondu l'opposition et la condition",
        reponse:
          "L'opposition dit que l'action se fait malgré un obstacle : « **Malgré le froid**, il sort ». La condition dit ce qui doit arriver pour que l'action ait lieu : « **En cas de pluie**, on reste ».",
      },
      {
        id: 'question-pas-posee',
        texte: "Je n'ai pas posé la bonne question",
        reponse:
          "Pose les questions une à une : quand ? où ? avec quoi ? comment ? avec qui ? pourquoi ? pour quoi faire ? malgré quoi ? à quelle condition ? Celle à laquelle le groupe répond donne la circonstance.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'À quelle question le groupe répond-il : quand ? où ? comment ? avec quoi ? pourquoi ?' },
    ],
  },

  'groupe-du-verbe': {
    nom: 'Quel groupe ?',
    equilibre: 'naturel',
    regle:
      '**1er groupe** : infinitif en *-er* (sauf *aller*). **2e groupe** : en *-ir*, avec *-issons* à « nous » (*finir* → *nous finissons*). ' +
      '**3e groupe** : tous les autres (*partir, dire, voir, croire*… et *aller*).',
    geste: 'Retrouve l\'infinitif. S\'il finit en *-ir*, dis « nous … » : *-issons* → 2e groupe, sinon → 3e groupe.',
    raisonnements: [
      {
        id: 'ir-deuxieme',
        texte: "Pour moi, tous les verbes en -ir sont du 2e groupe",
        reponse:
          "Non : *partir* fait « nous partons », pas « nous partissons » — 3e groupe. Seuls les verbes en *-ir* qui font *-issons* sont du 2e groupe (*finir, réfléchir, grandir*).",
      },
      {
        id: 'aller',
        texte: "« aller » finit en -er, donc 1er groupe",
        reponse:
          "*aller* est l'exception : il finit en *-er*, mais il est très irrégulier (je **vais**, j'**irai**). Il appartient au 3e groupe.",
      },
      {
        id: 'forme-conjuguee',
        texte: "Je me suis fié à la forme conjuguée",
        reponse:
          "Le groupe se lit sur l'**infinitif**, pas sur la forme : « ils **sortent** » vient de *sortir* ; « nous sortons », pas « sortissons » → 3e groupe.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel est l\'infinitif, et que donne « nous … » ?' },
    ],
  },

  'mode-du-verbe': {
    nom: 'Quel mode ?',
    equilibre: 'naturel',
    regle:
      '**Indicatif** : l\'action est réelle. **Subjonctif** : souhaitée, douteuse, ou imposée par certains mots (*il faut que, bien que, pour que* : *que tu viennes*). **Conditionnel** : éventuelle (*tu viendrais*). ' +
      '**Impératif** : un ordre, sans sujet (*viens !*). Sans personne : **infinitif** (*venir*), **participe** (*venant, venu*), **gérondif** (*en venant*).',
    geste: 'Cherche l\'indice : pas de sujet (ordre) ? *il faut que, je veux que, bien que* devant (subjonctif : vérifie avec *faire*, « que tu fasses ») ? un *si* + imparfait, avec le conditionnel dans l\'autre proposition — jamais juste après *si* ? *en* devant un verbe en *-ant* (gérondif) ?',
    raisonnements: [
      {
        id: 'subjonctif',
        texte: "Je n'ai pas pensé au subjonctif",
        reponse:
          "Après *il faut que, je veux que, bien que*, le verbe est au subjonctif. Le test : mets *faire* à la place — « que tu **fasses** », pas « que tu fais ».",
      },
      {
        id: 'participe-gerondif',
        texte: "J'ai confondu le participe présent et le gérondif",
        reponse:
          "Le gérondif, c'est le participe présent **précédé de *en*** : « **en** marchant ». Sans *en*, c'est un participe présent : « **Marchant** vite, il… ».",
      },
      {
        id: 'imperatif',
        texte: "J'ai pris l'impératif pour un présent",
        reponse:
          "« **Ferme** la porte ! » n'a pas de sujet : c'est un ordre, à l'impératif. « Tu **fermes** la porte » a un sujet : présent de l'indicatif.",
      },
      {
        id: 'conditionnel',
        texte: "Je n'ai pas reconnu le conditionnel",
        reponse:
          "Le conditionnel a la terminaison de l'imparfait avec le *r* du futur : je viend**rais**, nous viend**rions**. Il dit une action éventuelle, souvent avec *si* + imparfait : « si j'avais le temps, je viendrais ».",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Y a-t-il un sujet ? *il faut que, bien que…* devant le verbe ? *en* devant un verbe en -ant ?' },
    ],
  },

  'temps-de-l-indicatif': {
    nom: 'Quel temps ?',
    equilibre: 'naturel',
    regle:
      '**Temps simples** : présent, imparfait (*il chantait*), passé simple (*il chanta*), futur (*il chantera*). ' +
      '**Temps composés** : auxiliaire + participe passé, et le temps de l\'auxiliaire donne le nom : *a chanté* (passé composé), *avait chanté* (plus-que-parfait), ' +
      '*eut chanté* (passé antérieur), *aura chanté* (futur antérieur).',
    geste: 'Pour un temps composé, conjugue l\'auxiliaire seul : présent → passé composé ; imparfait → plus-que-parfait ; passé simple → passé antérieur ; futur → futur antérieur.',
    raisonnements: [
      {
        id: 'ai-ais',
        texte: "J'ai confondu « -ai » et « -ais »",
        reponse:
          "« Je mangeai » (passé simple) et « je mangeais » (imparfait) se ressemblent. Passe à « il » : il **mangea** (passé simple), il **mangeait** (imparfait).",
      },
      {
        id: 'auxiliaire',
        texte: "Je n'ai pas regardé le temps de l'auxiliaire",
        reponse:
          "Dans un temps composé, tout se lit sur l'auxiliaire : « tu **eus** fini » → *eus* est au passé simple, donc passé antérieur ; « tu **avais** fini » → imparfait, donc plus-que-parfait.",
      },
      {
        id: 'futur-conditionnel',
        texte: "J'ai confondu le futur et le conditionnel",
        reponse:
          "« Je mangerai » (futur) et « je mangerais » (conditionnel) : passe à « nous » — nous **mangerons**, nous **mangerions**. Le *-ions* signe le conditionnel.",
        exige: 'forme',
      },
      {
        id: 'simple-compose',
        texte: "J'ai confondu un temps simple et un temps composé",
        reponse:
          "Un temps composé tient en deux mots : un auxiliaire (*avoir* ou *être*) et un participe passé — « il **a chanté** ». Un temps simple n'en a qu'un : « il **chanta** », « il **chantait** ».",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Simple ou composé ? Si composé, à quel temps est l\'auxiliaire ?' },
    ],
  },

  'voix-passive-ou-active': {
    nom: 'Voix passive ou passé composé ?',
    equilibre: 'naturel',
    regle:
      'À la **voix passive**, le sujet **subit** l\'action : *La souris est attrapée par le chat* (*être* + participe passé). ' +
      'Mais *être* forme aussi des passés composés actifs : *Elle est partie* — là, le sujet **fait** l\'action.',
    geste: 'Le sujet fait-il l\'action, ou la subit-il ? Essaie d\'ajouter « par quelqu\'un » : si ça marche, voix passive.',
    raisonnements: [
      {
        id: 'etre-donc-passif',
        texte: "J'ai vu « être », j'ai pensé passif",
        reponse:
          "*être* + participe n'est pas toujours passif : « elle **est partie** » — c'est elle qui part, le sujet fait l'action : passé composé actif. Au passif, le sujet subit : « elle **est punie** » (par quelqu'un).",
      },
      {
        id: 'temps-du-passif',
        texte: "J'ai cru que le passif était forcément au passé",
        reponse:
          "« La porte **est fermée** par le gardien » est au **présent** passif : le temps se lit sur *être*, ici au présent. « La porte **a été fermée** » : passé composé passif.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Le sujet fait-il l\'action, ou la subit-il ?' },
    ],
  },

  'valeur-du-present': {
    nom: 'Quelle valeur du présent ?',
    equilibre: 'naturel',
    regle:
      'Le présent peut dire ce qui se passe **maintenant** (énonciation), une **habitude**, une action qui **dure**, une **vérité générale**, un **ordre** ; ' +
      'un **passé proche** ou un **futur proche** ; une **hypothèse** après *si* ; et, dans un récit au passé, la **narration**.',
    geste: 'Cherche l\'indice autour du verbe : un récit au passé ? « chaque jour » ? « depuis » ? « demain », « à l\'instant » ? un *si* ? une vérité qui vaut toujours ?',
    raisonnements: [
      {
        id: 'narration-enonciation',
        texte: "J'ai confondu narration et énonciation",
        reponse:
          "Le présent de narration surgit au milieu d'un récit au passé, pour rendre la scène vivante : « Il marchait seul… soudain, un chien **aboie** ». Le présent d'énonciation dit ce qui se passe au moment où l'on parle.",
      },
      {
        id: 'habitude-verite',
        texte: "J'ai confondu l'habitude et la vérité générale",
        reponse:
          "L'habitude est celle de quelqu'un : « Je **cours** chaque matin ». La vérité générale vaut pour tous et toujours : « La Terre **tourne** autour du Soleil ».",
      },
      {
        id: 'indice-temps',
        texte: "Je n'ai pas vu l'indice de temps",
        reponse:
          "Les mots autour du verbe décident : « j'**arrive** à l'instant » (passé proche), « je **pars** demain » (futur proche), « il pleut **depuis** deux jours » (action qui dure).",
      },
      {
        id: 'ordre-hypothese',
        texte: "Je n'ai pas pensé à l'ordre ou à l'hypothèse",
        reponse:
          "Après *si*, le présent exprime une hypothèse : « Si tu **travailles**, tu progresseras ». Quand on dit à quelqu'un ce qu'il doit faire, le présent remplace l'impératif : « Vous **rangez** vos affaires » = rangez vos affaires.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Quel indice entoure le verbe : un récit au passé, « chaque jour », « demain », « depuis », un *si* ?' },
    ],
  },

  'imparfait-ou-passe-simple': {
    nom: 'Imparfait ou passé simple ?',
    equilibre: 'naturel',
    regle:
      'L\'**imparfait** peint l\'**arrière-plan** : description, habitude, action en cours, sans limite précise. ' +
      'Le **passé simple** raconte le **premier plan** : action ponctuelle, terminée, et les actions qui se succèdent.',
    geste: 'Demande-toi : est-ce le décor, une habitude, ce qui était en cours (imparfait) — ou un événement qui fait avancer l\'histoire (passé simple) ?',
    raisonnements: [
      {
        id: 'duree-longue',
        texte: "L'action était longue, j'ai choisi l'imparfait",
        reponse:
          "La longueur ne suffit pas : « La guerre **dura** cent ans » — une durée, mais bornée et terminée : passé simple. « La guerre **durait** depuis des années » : en cours, sans fin dite — imparfait.",
      },
      {
        id: 'decor-evenement',
        texte: "Je n'ai pas distingué le décor de l'événement",
        reponse:
          "« Je **dormais** quand le réveil **sonna** » : le sommeil est le décor, en cours (imparfait) ; la sonnerie est l'événement qui surgit (passé simple).",
      },
      {
        id: 'habitude-une-fois',
        texte: "J'ai confondu l'habitude et l'action unique",
        reponse:
          "« Chaque été, il **partait** à la mer » : une habitude, imparfait. « Cet été-là, il **partit** à la mer » : une seule fois, passé simple.",
      },
      {
        id: 'description-habitude',
        texte: "J'ai confondu la description et l'habitude",
        reponse:
          "La description dit comment étaient les choses : « la maison **était** grande ». L'habitude dit ce qui se répétait : cherche un « chaque », « tous les », « souvent » — « tous les dimanches, nous **déjeunions**… ».",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Décor ou événement ? Habitude ou une seule fois ?' },
    ],
  },

  'point-de-vue': {
    nom: 'Quel point de vue ?',
    equilibre: 'naturel',
    regle:
      '**Omniscient** : le narrateur sait tout, même les pensées de **plusieurs** personnages. **Interne** : on voit et on pense avec **un seul** personnage. ' +
      '**Externe** : le narrateur observe de l\'extérieur, comme une caméra, sans entrer dans **aucune** pensée.',
    geste: 'Cherche les pensées et les sentiments : ceux de plusieurs personnages → omniscient ; d\'un seul → interne ; aucun → externe.',
    raisonnements: [
      {
        id: 'pensees-un-seul',
        texte: "Il y avait des pensées, j'ai pensé omniscient",
        reponse:
          "Les pensées d'**un seul** personnage, et tout vu par ses yeux : c'est le point de vue interne. L'omniscient entre dans la tête de plusieurs personnages, ou sait ce qu'aucun ne sait encore.",
      },
      {
        id: 'description-externe',
        texte: "Il y avait une description, j'ai pensé externe",
        reponse:
          "Une description peut être vue par un personnage (« elle aperçut… » : interne). Le point de vue externe ne donne **aucune** pensée ni aucun sentiment : seulement les gestes et les paroles.",
      },
      {
        id: 'premiere-personne',
        texte: "Je n'ai pas tenu compte du « je »",
        reponse:
          "Quand le narrateur est un personnage de l'histoire (récit à la 1re personne), il ne voit que par ses yeux : c'est forcément le point de vue interne.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Entre-t-on dans des pensées ? Celles d\'un seul personnage, ou de plusieurs ?' },
    ],
  },

  'pp-etre': {
    nom: 'Participe passé avec être, ou seul',
    equilibre: 'naturel',
    regle:
      'Avec **être** (verbe non pronominal), le participe passé s\'accorde avec le **sujet** : *Elles sont arriv**ées***. ' +
      'Employé **sans auxiliaire**, il s\'accorde comme un adjectif avec le nom qu\'il qualifie : ***Fatigués**, ils dorment.*',
    geste: 'Trouve le sujet (qui est-ce qui ?) ou le nom qualifié, puis regarde son genre et son nombre.',
    raisonnements: [
      {
        id: 'sujet-pas-trouve',
        texte: "Je n'ai pas trouvé le bon sujet",
        reponse:
          "Pose « Qui est-ce qui est arrivé ? » : la réponse donne le genre et le nombre. « Mes cousines sont arriv**ées** » : féminin pluriel.",
        exige: 'ecrit',
      },
      {
        id: 'sans-auxiliaire',
        texte: "Sans auxiliaire, je n'ai pas pensé à accorder",
        reponse:
          "Seul, le participe se comporte comme un adjectif : « **Épuisées**, les joueuses s'assoient » — il s'accorde avec *les joueuses*.",
        exige: 'ecrit',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Qui est-ce qui… ? Le sujet est-il masculin ou féminin, singulier ou pluriel ?' },
    ],
  },

  'pp-avoir': {
    nom: 'Participe passé avec avoir',
    equilibre: 'naturel',
    regle:
      'Avec **avoir**, le participe ne s\'accorde **jamais avec le sujet**. Il s\'accorde avec le **COD** seulement si celui-ci est placé **avant** le verbe : ' +
      '*Les pommes qu\'ils ont mang**ées***. Sinon, il reste invariable : *Ils ont mangé des pommes.*',
    geste: 'Cherche le COD (« … quoi ? ») : est-il avant le verbe ? Si oui, accorde avec lui ; s\'il est après, ou absent, n\'accorde pas.',
    raisonnements: [
      {
        id: 'accord-sujet',
        texte: "J'ai accordé avec le sujet",
        reponse:
          "Avec *avoir*, jamais avec le sujet : « Elles **ont mangé** des pommes » — *mangé* ne s'accorde pas avec *elles*.",
        exige: 'ecrit',
      },
      {
        id: 'cod-avant',
        texte: "Je n'ai pas vu le COD placé avant",
        reponse:
          "Dans « les lettres **que** j'ai écrites », *que* reprend *les lettres* et il est placé avant le verbe : c'est le COD. Le participe s'accorde avec lui : écrites. Même chose avec *les, la, l'* : « je **les** ai lues ».",
        exige: 'ecrit',
      },
      {
        id: 'cod-apres',
        texte: "J'ai accordé avec le COD placé après",
        reponse:
          "Le COD placé après ne compte pas : « J'ai **écrit** des lettres » — quand on écrit le participe, on ne sait pas encore ce qui a été écrit. Pas d'accord.",
        exige: 'ecrit',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Où est le COD : avant le verbe, ou après ?' },
    ],
  },

  'pp-pronominal': {
    nom: 'Participe passé des verbes pronominaux',
    equilibre: 'naturel',
    regle:
      'Verbe **toujours pronominal** (*se souvenir, s\'enfuir*) ou de **sens passif** : accord avec le **sujet**. Pour les autres, on fait comme avec *avoir* : ' +
      'accord avec le **COD placé avant** (*Elle s\'est lav**ée***), pas d\'accord s\'il est après (*Elle s\'est lavé les mains*) ou s\'il n\'y en a pas (*Ils se sont parlé*).',
    geste: 'Remplace *être* par *avoir* et cherche le COD : « elle a lavé qui ? — elle-même (*se*, avant) » → accord ; « elle a lavé quoi ? — les mains (après) » → pas d\'accord.',
    raisonnements: [
      {
        id: 'etre-donc-sujet',
        texte: "Avec « être », j'ai accordé avec le sujet",
        reponse:
          "Pour un verbe pronominal, *être* ne suffit pas. « Elle s'est **lavé** les mains » : elle a lavé quoi ? les mains, placées après — pas d'accord. « Elle s'est **lavée** » : elle a lavé qui ? *se*, placé avant — accord.",
        exige: 'ecrit',
      },
      {
        id: 'se-coi',
        texte: "J'ai cru que « se » était toujours COD",
        reponse:
          "Pas toujours : dans « elles se sont **téléphoné** », on téléphone **à** quelqu'un — *se* est COI, il n'y a pas de COD. Le participe reste invariable.",
        exige: 'ecrit',
      },
      {
        id: 'toujours-pronominal',
        texte: "Je ne savais pas que ce verbe est toujours pronominal",
        reponse:
          "*se souvenir, s'enfuir, s'évanouir, s'écrier* n'existent qu'à la forme pronominale : le participe s'accorde alors avec le sujet. « Elles se sont **enfuies** ».",
        exige: 'ecrit',
      },
      {
        id: 'se-cod-oublie',
        texte: "Je n'ai pas vu que « se » était le COD",
        reponse:
          "Dans « ils se sont **promenés** », on promène qui ? — eux-mêmes : *se* est le COD, placé avant. Le participe s'accorde donc avec lui : promenés.",
        exige: 'ecrit',
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: 'Remplace *être* par *avoir* : quel est le COD, et où est-il ?' },
    ],
  },
};

/** Le raisonnement « au hasard » est proposé partout : c'est le signal le plus
 *  utile pour les parents, et un enfant ne l'écrirait jamais spontanément. */
export const idsPieges = () => Object.keys(PIEGES);
