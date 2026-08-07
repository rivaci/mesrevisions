// Les pièges : ce qui fait échouer un accord, et comment y répondre.
//
// Un piège n'est pas une règle, c'est une SITUATION qui fait rater la règle.
// « Le panier des chats est vide » ne demande pas de connaître une règle
// nouvelle — juste de ne pas se laisser attirer par le nom voisin.
//
// Chaque piège porte :
//   raisonnements  ce qu'on propose à l'élève quand il s'est trompé, et la
//                  réponse propre à CHAQUE choix (c'est ça qui rend le
//                  dialogue diagnostique plutôt que générique) ;
//   regle          la réexplication, trois lignes maximum ;
//   geste          le réflexe à installer, formulé comme une action.
//
// Les raisonnements sont définis ici une seule fois et réutilisés par tous les
// exercices qui portent le même piège : une centaine d'exercices, quinze menus.
// Sans cette mutualisation il faudrait rédiger — et maintenir — un menu par
// exercice, avec la dérive de formulation que ça suppose.

// `equilibre` dit COMMENT on empêche l'élève d'apprendre un motif à la place de
// la règle. Trois cas, et le contrôle de contenu s'appuie dessus :
//
//   'neutres'  Le piège ne se déclenche que dans un sens (un nom voisin au
//              pluriel tire vers le pluriel, jamais l'inverse). Il faut donc
//              des items explicitement marqués `neutre: true` où il ne joue
//              pas — sinon « pluriel juste avant → singulier » devient une
//              fausse règle qui se retourne partout ailleurs.
//   'naturel'  Les deux réponses apparaissent spontanément dans le lot
//              (é/er, -ait/-aient) : l'équilibre se fait tout seul.
//   'aucun'    Pas de leurre de surface à contrer. Le sujet collé au verbe ou
//              un verbe irrégulier ne présentent aucun motif trompeur.

export const PIEGES = {
  'sujet-colle': {
    nom: 'Sujet collé au verbe',
    equilibre: 'aucun',
    regle: "Le verbe s'accorde avec son sujet. Pour le trouver : « qui est-ce qui » + le verbe.",
    geste: "Pose la question « qui est-ce qui… ? » avant d'écrire.",
    raisonnements: [
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'ai trouvé le sujet, mais je me suis trompé sur la terminaison",
        reponse: "Le plus dur est fait : tu as le bon sujet. Il ne reste qu'à choisir la bonne terminaison.",
      },
      {
        id: 'sonorite',
        texte: 'Parce que ça sonnait mieux',
        reponse: "L'oreille ne suffit pas : au singulier comme au pluriel, beaucoup de verbes se prononcent pareil. C'est le sujet qui décide, pas le son.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Pas grave, mais essayons la méthode : encadre le verbe, puis demande-toi « qui est-ce qui… ? ».",
      },
    ],
  },

  'ecran-complement-du-nom': {
    nom: 'Écran du complément du nom',
    equilibre: 'neutres',
    regle: "Un nom placé juste avant le verbe n'est pas forcément le sujet. Dans « le panier des chats », c'est *le panier* le sujet ; *des chats* complète seulement le nom.",
    geste: "Demande « qui est-ce qui… ? » — le mot le plus proche du verbe n'est pas la réponse.",
    raisonnements: [
      {
        id: 'nom-voisin',
        texte: 'Parce que le nom juste avant le verbe est au pluriel',
        reponse: "C'est exactement le piège. Ce nom-là complète le nom principal, il ne commande pas le verbe. Repose la question « qui est-ce qui… ? » : la réponse est le mot d'avant.",
      },
      {
        id: 'plusieurs-choses',
        texte: 'Parce que ça parle de plusieurs choses',
        reponse: "Attention à ce dont on parle vraiment. Ce ne sont pas les compléments qui font l'action, c'est le nom principal — et il est seul.",
      },
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'ai trouvé le bon sujet mais mal accordé",
        reponse: "Alors tu as réussi le plus difficile. Vérifie juste : ton sujet est-il singulier ou pluriel ?",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Essayons ensemble : quel mot répond à « qui est-ce qui… ? » Ce n'est pas celui qui touche le verbe.",
      },
    ],
  },

  'ecran-pronom': {
    nom: 'Écran du pronom',
    equilibre: 'neutres',
    regle: "Un pronom comme *le*, *la*, *les*, *me*, *nous* peut se glisser entre le sujet et le verbe. Il ne change rien : il est complément, pas sujet.",
    geste: 'Saute le petit mot et cherche qui fait vraiment l\'action.',
    raisonnements: [
      {
        id: 'pronom-pluriel',
        texte: "Parce que le petit mot juste avant le verbe est au pluriel",
        reponse: "Ce petit mot est un pronom complément : il désigne ce qui subit l'action, pas qui la fait. Le sujet est avant lui.",
      },
      {
        id: 'pronom-sujet',
        texte: "Je pensais que c'était lui le sujet",
        reponse: "Bonne remarque, c'est exactement là qu'on se fait avoir. Teste : remplace-le par un nom. « Le chat **les** mange » → il mange quoi ? Les autres. C'est donc un complément.",
      },
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'ai trouvé le bon sujet mais mal accordé",
        reponse: 'Le repérage était bon. Reste l\'accord : ton sujet est-il un seul ou plusieurs ?',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Reprenons : cache le petit mot avec le doigt, et relis la phrase sans lui.',
      },
    ],
  },

  'sujet-inverse': {
    nom: 'Sujet inversé',
    equilibre: 'neutres',
    regle: "Le sujet passe parfois après le verbe, surtout dans les questions et après un complément placé en tête. Il commande l'accord quand même.",
    geste: "Remets la phrase dans l'ordre normal pour retrouver le sujet.",
    raisonnements: [
      {
        id: 'pas-de-sujet',
        texte: "Je n'ai pas trouvé de sujet avant le verbe",
        reponse: "Normal : il est derrière. Remets la phrase à l'endroit — « où vont les enfants ? » devient « les enfants vont où ? ». Le sujet apparaît.",
      },
      {
        id: 'mot-devant',
        exige: 'forme',
        texte: "J'ai accordé avec le mot placé devant le verbe",
        reponse: "Ce mot devant n'est pas le sujet, c'est un complément déplacé. Le sujet est de l'autre côté du verbe.",
      },
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'ai trouvé le bon sujet mais mal accordé",
        reponse: "Tu as fait le plus dur : repérer un sujet inversé. Vérifie maintenant s'il est singulier ou pluriel.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Essaie de retourner la phrase dans ta tête pour la remettre dans l'ordre habituel.",
      },
    ],
  },

  'sujets-coordonnes': {
    nom: 'Sujets coordonnés',
    equilibre: 'neutres',
    regle: 'Deux sujets reliés par *et* font un pluriel, même si chacun est au singulier : « le chat et le chien dorment ».',
    geste: "Compte les sujets : s'il y en a deux, le verbe se met au pluriel.",
    raisonnements: [
      {
        id: 'dernier-sujet',
        exige: 'forme',
        texte: "J'ai accordé avec le sujet le plus proche du verbe",
        reponse: "Les deux comptent. « Le chat et le chien » forment un groupe, et ce groupe est pluriel — remplace-le par « ils » pour t'en convaincre.",
      },
      {
        id: 'chacun-singulier',
        texte: 'Parce que chaque sujet est au singulier',
        reponse: "Chacun l'est, mais ensemble ils sont plusieurs. Un chat plus un chien, ça fait bien deux êtres qui dorment.",
      },
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'ai vu les deux sujets mais mal accordé",
        reponse: 'Bon repérage. Deux sujets reliés par « et » → remplace par « ils » ou « elles », et accorde avec ça.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Cherche combien de sujets font l\'action. Un seul, ou plusieurs ?',
      },
    ],
  },

  'sujet-collectif': {
    nom: 'Sujet collectif',
    equilibre: 'neutres',
    regle: "Un groupe compté comme un tout reste singulier : « un groupe d'élèves **attend** ». C'est *le groupe* qui attend, pas les élèves un par un.",
    geste: 'Cherche le nom principal du groupe, pas ce qui le complète.',
    raisonnements: [
      {
        id: 'nom-voisin',
        texte: 'Parce que le nom au pluriel est juste avant le verbe',
        reponse: "Même piège que le complément du nom : « d'élèves » complète « un groupe ». Le sujet, c'est le groupe — un seul.",
      },
      {
        id: 'plusieurs-personnes',
        texte: 'Parce que ça représente plusieurs personnes',
        reponse: "Le sens dit plusieurs, la grammaire dit un. En français, c'est le nom principal qui commande : « un groupe » est singulier.",
      },
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'ai trouvé le bon sujet mais mal accordé",
        reponse: 'Le repérage est juste. « Un groupe », « une foule », « une équipe » : ce sont des singuliers.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Repère le premier nom du groupe sujet, celui qui porte le déterminant.",
      },
    ],
  },

  'pronom-relatif-sujet': {
    nom: 'Le pronom relatif sujet',
    equilibre: 'neutres',
    regle: "*qui* prend la personne de ce qu'il remplace : « c'est **moi** qui **suis** », « c'est **toi** qui **es** », « les élèves **qui travaillent** ».",
    geste: 'Cherche le mot que « qui » remplace, juste avant lui.',
    raisonnements: [
      {
        id: 'troisieme-personne',
        exige: 'forme',
        texte: "J'ai conjugué à la 3ᵉ personne parce qu'il y a « qui »",
        reponse: "C'est l'erreur la plus courante. « qui » n'a pas de personne à lui : il emprunte celle du mot qu'il remplace. Après « moi qui », le verbe se met à la 1ʳᵉ personne.",
      },
      {
        id: 'mauvais-antecedent',
        texte: "Je n'ai pas vu quel mot « qui » remplaçait",
        reponse: "Regarde juste devant « qui » : c'est ce mot-là qui commande. Remplace mentalement « qui » par lui et l'accord devient évident.",
      },
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'ai trouvé le bon mot mais mal accordé",
        reponse: 'Bien vu. Maintenant conjugue à la personne de ce mot, pas à la troisième.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Repère le mot placé juste avant « qui » : c'est lui qui décide.",
      },
    ],
  },

  'e-ou-er': {
    nom: 'é ou er ?',
    equilibre: 'naturel',
    regle: 'Remplace le verbe par *vendre*. Si « vendre » va, on écrit **-er**. Si c\'est « vendu » qui va, on écrit **-é**.',
    geste: 'Fais le test « vendre / vendu » dans ta tête avant de choisir.',
    raisonnements: [
      {
        id: 'meme-son',
        texte: 'Parce que ça se prononce pareil',
        reponse: "C'est vrai, et c'est pour ça qu'il faut un test. Remplace par « vendre » : si la phrase tient, c'est -er. Sinon c'est -é.",
      },
      {
        id: 'test-rate',
        texte: "J'ai fait le test mais je me suis trompé",
        reponse: "Refais-le lentement : lis la phrase à voix basse en disant « vendre », puis en disant « vendu ». Une seule des deux sonne juste.",
      },
      {
        id: 'pas-connu',
        texte: 'Je ne connaissais pas le test',
        reponse: "Alors retiens-le, c'est le plus rentable de tous : remplace le verbe par « vendre ». Si ça marche → -er. Si c'est « vendu » qui marche → -é.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Essaie le test « vendre / vendu » : il tranche à tous les coups.',
      },
    ],
  },

  'ait-aient': {
    nom: 'Singulier ou pluriel qui se prononcent pareil',
    equilibre: 'naturel',
    regle: '*-ait* et *-aient* se disent exactement de la même façon. Seul le sujet permet de choisir.',
    geste: 'Reviens au sujet : un seul ou plusieurs ?',
    raisonnements: [
      {
        id: 'meme-son',
        texte: 'Parce que ça se prononce pareil',
        reponse: "Justement : à l'oreille, impossible de trancher. Il faut revenir au sujet et compter.",
      },
      {
        id: 'mauvais-sujet',
        texte: "Je me suis trompé de sujet",
        reponse: "C'est là que tout se joue. Repose la question « qui est-ce qui… ? » et compte : un ou plusieurs ?",
      },
      {
        id: 'bon-sujet',
        exige: 'forme',
        texte: "J'avais le bon sujet mais j'ai hésité sur la terminaison",
        reponse: 'Retiens la règle courte : un seul → -ait. Plusieurs → -aient.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Cherche le sujet, compte-le, puis choisis la terminaison.',
      },
    ],
  },

  'futur-conditionnel': {
    nom: 'Futur ou conditionnel',
    equilibre: 'naturel',
    regle: "*je serai* annonce ce qui va arriver ; *je serais* pose une condition. Les deux portent le **-r-**, seule la fin change.",
    geste: 'Demande-toi : est-ce que ça arrivera vraiment, ou est-ce que ça dépend de quelque chose ?',
    raisonnements: [
      {
        id: 'meme-son',
        texte: 'Parce que ça se prononce presque pareil',
        reponse: "Presque, oui — et c'est un piège de dictée classique. Le sens tranche : une chose certaine prend -ai, une chose qui dépend d'une condition prend -ais.",
      },
      {
        id: 'sens-inverse',
        texte: "Je me suis trompé sur le sens de la phrase",
        reponse: "Relis-la en cherchant un « si ». S'il y en a un, ou s'il est sous-entendu, c'est le conditionnel.",
      },
      {
        id: 'confusion-personne',
        texte: "Je pensais que ça dépendait de la personne",
        reponse: "Non, ici les deux formes sont à la même personne. C'est le sens de la phrase qui décide, pas le sujet.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Cherche s'il y a une condition dans la phrase — un « si », un « au cas où ».",
      },
    ],
  },

  'participe-etre': {
    nom: 'Participe passé avec être',
    equilibre: 'neutres',
    regle: "Avec **être**, le participe passé s'accorde avec le sujet, comme un adjectif : « elles sont **parties** ».",
    geste: 'Repère l\'auxiliaire : si c\'est « être », accorde avec le sujet.',
    raisonnements: [
      {
        id: 'oubli-accord',
        exige: 'forme',
        texte: "J'ai oublié d'accorder",
        reponse: "C'est l'oubli le plus fréquent en dictée. Avec « être », le participe se comporte comme un adjectif : il suit le sujet.",
      },
      {
        id: 'mauvais-auxiliaire',
        texte: "Je pensais que c'était l'auxiliaire avoir",
        reponse: 'Regarde bien le petit verbe devant : « est », « sont », « était » viennent d\'être, pas d\'avoir. Avec être, on accorde.',
      },
      {
        id: 'mauvais-sujet',
        texte: "Je me suis trompé de sujet",
        reponse: "Repose la question « qui est-ce qui… ? », puis accorde le participe avec cette réponse.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Deux étapes : quel est l'auxiliaire ? quel est le sujet ? L'accord suit.",
      },
    ],
  },

  'participe-avoir': {
    nom: 'Participe passé avec avoir',
    equilibre: 'neutres',
    regle: "Avec **avoir**, pas d'accord — sauf si ce qu'on subit est placé **avant** le verbe : « les pommes que j'ai **mangées** ».",
    geste: "Cherche si le complément est passé devant le verbe. Sinon, ne touche à rien.",
    raisonnements: [
      {
        id: 'accord-sujet',
        exige: 'forme',
        texte: "J'ai accordé avec le sujet",
        reponse: "Piège classique : avec « avoir », le sujet ne commande pas le participe. Ce qui compte, c'est ce qu'on subit, et seulement s'il est placé avant.",
      },
      {
        id: 'oubli-antepose',
        texte: "Je n'ai pas vu que le complément était placé avant",
        reponse: "C'est le seul cas où l'accord se fait. Repère le mot ou le pronom placé devant le verbe : c'est avec lui qu'on accorde.",
      },
      {
        id: 'accord-inutile',
        exige: 'forme',
        texte: "J'ai accordé alors qu'il ne fallait pas",
        reponse: "Ici le complément est après le verbe, donc rien ne bouge. Avec « avoir », l'immobilité est la règle et l'accord l'exception.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Une seule question : ce qu'on subit est-il placé avant le verbe ? Si non, on ne change rien.",
      },
    ],
  },

  'chaine-groupe-nominal': {
    nom: 'Chaîne d\'accords dans le groupe nominal',
    equilibre: 'neutres',
    regle: "Le nom donne son genre et son nombre à tout ce qui l'accompagne — déterminant et adjectifs — même à distance.",
    geste: 'Trouve le nom principal, puis accorde tout ce qui gravite autour.',
    raisonnements: [
      {
        id: 'mot-voisin',
        exige: 'forme',
        texte: "J'ai accordé avec le mot le plus proche",
        reponse: "Ce n'est pas la proximité qui compte, c'est le nom principal du groupe. Trouve-le d'abord, tout le reste s'aligne dessus.",
      },
      {
        id: 'distance',
        texte: "L'adjectif était loin du nom",
        reponse: "La distance ne change rien. Même séparé par plusieurs mots, l'adjectif s'accorde avec le nom auquel il se rapporte.",
      },
      {
        id: 'genre',
        texte: "Je me suis trompé sur le genre du nom",
        reponse: "Teste avec « un » ou « une » devant le nom : celui qui sonne juste te donne le genre.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Repère le nom principal, dis-le à voix basse avec son déterminant, puis accorde le reste.',
      },
    ],
  },

  'homophone-grammatical': {
    nom: 'Homophones grammaticaux',
    equilibre: 'naturel',
    regle: 'Deux mots qui se prononcent pareil mais qui ne font pas le même travail. Un test de remplacement permet de trancher à tous les coups.',
    geste: 'Applique le test de remplacement avant de choisir.',
    raisonnements: [
      {
        id: 'meme-son',
        texte: 'Parce que ça se prononce pareil',
        reponse: "C'est justement pour ça qu'on ne choisit pas à l'oreille. Chaque paire a son test de remplacement — c'est lui qui décide.",
      },
      {
        id: 'test-oublie',
        texte: "Je n'ai pas pensé à faire le test",
        reponse: "Le réflexe à installer : dès que tu vois un de ces mots, tu remplaces. C'est plus rapide que d'hésiter.",
      },
      {
        id: 'test-rate',
        texte: "J'ai fait le test mais je me suis trompé",
        reponse: 'Refais-le lentement en lisant la phrase entière avec le mot de remplacement. Une seule version a du sens.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Reprenons le test ensemble : remplace, relis, et vois laquelle des deux phrases tient debout.',
      },
    ],
  },

  'radical-premier-groupe': {
    nom: 'Radical qui change au 1ᵉʳ groupe',
    equilibre: 'naturel',
    regle: "Certains verbes en -er modifient leur radical selon la personne : *j'appelle* mais *nous appelons*, *je jette* mais *nous jetons*.",
    geste: 'Écoute la voyelle avant la terminaison : elle change selon la personne.',
    raisonnements: [
      {
        id: 'regulier',
        exige: 'forme',
        texte: "J'ai conjugué comme un verbe régulier",
        reponse: "Ce verbe fait partie des exceptions du 1ᵉʳ groupe. Le radical change quand l'accent tombe dessus.",
      },
      {
        id: 'oubli-double',
        exige: 'forme',
        texte: "J'ai oublié de doubler la consonne",
        reponse: "Repère la personne : aux formes où on entend fortement la voyelle, la consonne double.",
      },
      {
        id: 'bon-verbe',
        exige: 'forme',
        texte: "J'avais la bonne terminaison mais pas le bon radical",
        reponse: 'La terminaison était juste, il ne reste que le début du mot à corriger.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: 'Conjugue le verbe à voix basse à toutes les personnes : tu entendras où le radical change.',
      },
    ],
  },

  'irregulier': {
    nom: 'Verbe irrégulier',
    equilibre: 'aucun',
    regle: "Les huit irréguliers du programme — *faire, aller, dire, venir, pouvoir, voir, vouloir, prendre* — s'apprennent par cœur, forme par forme.",
    geste: 'Récite la conjugaison entière dans ta tête avant de choisir la forme.',
    raisonnements: [
      {
        id: 'regulier',
        exige: 'forme',
        texte: "J'ai appliqué la terminaison habituelle",
        reponse: "Ces verbes ne suivent pas le modèle courant. C'est pour ça qu'ils sont au programme : ils s'apprennent forme par forme.",
      },
      {
        id: 'confusion-personne',
        texte: "Je me suis trompé de personne",
        reponse: "Reviens au sujet et récite la conjugaison depuis le début : « je…, tu…, il… » jusqu'à tomber sur la bonne.",
      },
      {
        id: 'presque',
        texte: "J'étais presque juste",
        reponse: "Tu n'es pas loin. Regarde bien la fin du mot — c'est souvent là que ces verbes surprennent.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse: "Récite la conjugaison complète du verbe, tu retrouveras la forme.",
      },
    ],
  },

  // Ce piège-là, l'appli le fabrique elle-même : vingt séances à marteler
  // « cherche le sujet, accorde le verbe », et arrive le seul temps où le sujet
  // n'est pas écrit. L'élève applique le réflexe qu'on vient de lui installer et
  // écrit « manges ta soupe ». D'où une séance dédiée, et tard dans le parcours.
  imperatif: {
    nom: "L'impératif",
    equilibre: 'neutres',
    regle:
      "À l'impératif, on donne un ordre ou un conseil : **pas de sujet écrit**, donc rien " +
      "avec quoi accorder. À la 2ᵉ personne, les verbes en *-er* n'ont **pas de -s** : " +
      "*mange*, *va*, *n'oublie pas*. Le -s revient seulement devant **en** et **y** : " +
      "*manges-en*, *vas-y*.",
    geste: "Demande-toi : est-ce que la phrase donne un ordre ? Alors pas de sujet, et pas de -s.",
    raisonnements: [
      {
        id: 'sujet-sous-entendu',
        texte: "J'ai pensé au « tu » sous-entendu",
        reponse:
          "C'est justement le piège. À l'impératif il n'y a pas de sujet, donc rien à accorder : " +
          "on écrit *mange ta soupe*, alors qu'avec un sujet on écrirait *tu manges ta soupe*.",
      },
      {
        id: 'reflexe-du-s',
        texte: "Je mets toujours un -s avec « tu »",
        reponse:
          "Bon réflexe ailleurs, mauvais ici : sans sujet écrit, pas de marque de personne. " +
          "Le -s ne revient que devant *en* et *y*, pour que ça se prononce : *manges-en*.",
      },
      {
        id: 'en-y-oublie',
        texte: "J'ai oublié le cas de « en » et « y »",
        reponse:
          "Dis la phrase à voix haute sans le -s : *mange-en* ne se prononce pas. " +
          "C'est pour ça qu'on l'ajoute — uniquement devant ces deux petits mots.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          "Repère si la phrase donne un ordre. Si oui : pas de sujet, pas de -s — sauf devant *en* ou *y*.",
      },
    ],
  },
};

/** Le raisonnement « au hasard » est proposé partout : c'est le signal le plus
 *  utile pour les parents, et un enfant ne l'écrirait jamais spontanément. */
export const idsPieges = () => Object.keys(PIEGES);
