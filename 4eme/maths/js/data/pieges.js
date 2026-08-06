// Les pièges : les confusions qui font rater un calcul, et comment y répondre.
//
// Un piège n'est pas une erreur constatée, c'est une CONCEPTION qui la produit.
// « 3x + 2 = 5x » n'est pas une étourderie : c'est le signe égal de l'école
// primaire, celui qui annonce un résultat, appliqué à une somme qu'il faut
// bien « finir ». La typologie vient de la lignée Pépite (Grugeon-Allys) —
// c'est elle qui rend le dialogue diagnostique plutôt que générique.
//
// Chaque piège porte :
//   raisonnements  ce qu'on propose à l'élève quand il s'est trompé, et la
//                  réponse propre à CHAQUE choix ;
//   regle          la réexplication, trois lignes maximum, servie APRÈS le
//                  contre-exemple — jamais avant ;
//   geste          le réflexe à installer, formulé comme une action.
//
// ── equilibre : comment on empêche d'apprendre un motif de surface ───────────
//
//   'naturel'  Les deux réponses apparaissent dans le lot. C'est le cas de
//              toute la famille « réduis si c'est possible » : le piège
//              consiste à transformer ce qui ne se transforme pas, donc la
//              bonne réponse est souvent « rien à faire ». Un lot qui ne
//              contiendrait QUE ces items apprendrait « réponds toujours rien
//              à faire » — l'inverse exact du motif qu'on combat, aussi faux.
//              Le contrôle exige donc les deux réponses à chaque palier.
//
//   'neutres'  Le piège ne joue que dans un sens ; il faut des items marqués
//              `neutre: true` où il ne joue pas. Les neutres sont APPARIÉS EN
//              SURFACE aux items piégés : « 3x² + 5x » (même lettre, même
//              forme) et non « 3x + 2y », qu'un motif « deux lettres
//              différentes → rien à faire » suffirait à repérer sans rien
//              comprendre aux termes semblables.
//
//   'aucun'    Pas de leurre de surface à contrer.

export const PIEGES = {
  // ── Socle, travaillé au rituel ─────────────────────────────────────────────

  'soustraire-un-negatif': {
    nom: "Soustraire un nombre négatif",
    famille: 'socle',
    equilibre: 'aucun',
    regle: "Soustraire un nombre négatif, c'est ajouter son opposé : 4 − (−3) = 4 + 3 = 7.",
    geste: "Quand tu vois « − (− », transforme les deux signes en un « + » avant de calculer.",
    raisonnements: [
      {
        id: 'deux-moins-annulent',
        texte: "Les deux moins m'ont fait enlever quelque chose",
        reponse: "Ils font l'inverse. Enlever une dette, c'est gagner. 4 − (−3) donne 7, pas 1.",
      },
      {
        id: 'ignore-parenthese',
        texte: "Je n'ai pas vu la parenthèse",
        reponse: "Elle change tout : 4 − 3 fait 1, mais 4 − (−3) fait 7. Repère-la avant de calculer.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Essayons la méthode : « − (− » devient « + »." },
    ],
  },

  'regle-des-signes-sur-laddition': {
    nom: "La règle des signes appliquée à une addition",
    famille: 'socle',
    // Glaeser : le produit de deux négatifs n'a PAS de justification concrète.
    // On ne prétend donc pas en donner une — voir la note de la séance.
    equilibre: 'aucun',
    regle: "« Moins par moins fait plus » ne vaut que pour les multiplications. Pour une addition, on compte : −2 + 5, c'est reculer de 2 puis avancer de 5.",
    geste: "Avant d'appliquer la règle des signes, demande-toi : est-ce que je multiplie, ou est-ce que j'ajoute ?",
    raisonnements: [
      {
        id: 'regle-des-signes',
        texte: "J'ai appliqué « moins et plus font moins »",
        reponse: "Cette règle-là est celle de la multiplication. Ici tu ajoutes : place-toi sur la droite des nombres et déplace-toi.",
      },
      {
        id: 'signe-du-plus-grand',
        texte: "J'ai gardé le signe du premier nombre",
        reponse: "C'est le plus grand écart qui donne le signe, pas la position. De −2, avancer de 5 te fait dépasser zéro.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Reprenons doucement : pars de −2 et avance de 5 cases." },
    ],
  },

  // ── Calcul littéral, travaillé au cœur ─────────────────────────────────────

  concatenation: {
    nom: "Terminer une somme qu'on ne peut pas terminer",
    famille: 'litteral',
    equilibre: 'naturel',
    regle: "3x + 2 ne se réduit pas : 3x compte des x, 2 compte des unités. On n'additionne que des termes semblables.",
    geste: "Demande-toi ce que chaque terme compte. Si ce n'est pas la même chose, tu ne peux pas les additionner.",
    raisonnements: [
      {
        id: 'faut-finir',
        texte: "Une réponse ne peut pas rester avec un « + » dedans",
        reponse: "Si, et c'est même très fréquent en algèbre. « 3x + 2 » est une réponse complète : c'est un nombre, écrit avec la lettre qu'on ne connaît pas encore.",
      },
      {
        id: 'colle-les-nombres',
        texte: "J'ai additionné 3 et 2",
        reponse: "Le 3 est collé au x, il compte des x. Le 2 est seul, il compte des unités. Les additionner reviendrait à ajouter des pommes et des heures.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Regarde ce que compte chaque terme avant de choisir." },
    ],
  },

  linearisation: {
    nom: "Transformer un carré en double",
    famille: 'litteral',
    equilibre: 'naturel',
    regle: "a² veut dire a × a, pas a + a. a × a et 2a ne sont égaux que par hasard, pour a = 0 et a = 2.",
    geste: "Devant un exposant, écris-le en toutes lettres : a² = a × a. Tu verras tout de suite si c'est un double.",
    raisonnements: [
      {
        id: 'exposant-est-facteur',
        texte: "Le petit 2 veut dire « fois 2 »",
        reponse: "Il veut dire « deux fois le même facteur », donc a × a. « Fois 2 » s'écrirait 2a, sans exposant.",
      },
      {
        id: 'deux-a-partout',
        texte: "a + a fait 2a, donc a × a aussi",
        reponse: "a + a fait bien 2a. Mais a × a est un produit, pas une somme — et les deux ne donnent pas la même chose.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Écris l'exposant en toutes lettres et compare." },
    ],
  },

  'moins-devant-la-parenthese': {
    nom: "Le moins qui ne distribue que sur le premier terme",
    famille: 'litteral',
    equilibre: 'naturel',
    regle: "−(x − 3) veut dire « l'opposé de tout ce qu'il y a dans la parenthèse » : chaque terme change de signe, donc −x + 3.",
    geste: "Le signe moins devant une parenthèse touche TOUS les termes, pas seulement le premier.",
    raisonnements: [
      {
        id: 'premier-terme-seul',
        texte: "Je n'ai changé que le signe du premier terme",
        reponse: "C'est le piège exact. Le moins s'applique à la parenthèse entière — donc aussi au −3, qui devient +3.",
      },
      {
        id: 'recopie-linterieur',
        texte: "J'ai recopié l'intérieur en mettant un moins devant",
        reponse: "Écrire −x − 3 revient à enlever x ET enlever 3. Or on enlève (x − 3), c'est-à-dire un peu moins que x.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Change le signe de chaque terme, un par un." },
    ],
  },

  'distributivite-incomplete': {
    nom: "Distribuer sur un seul terme",
    famille: 'litteral',
    equilibre: 'naturel',
    regle: "2(x + 5) veut dire « deux paquets de (x + 5) ». Chaque terme de la parenthèse est multiplié : 2x + 10.",
    geste: "Trace mentalement une flèche du facteur vers CHAQUE terme de la parenthèse.",
    raisonnements: [
      {
        id: 'oublie-second-terme',
        texte: "J'ai multiplié le premier terme et recopié le reste",
        reponse: "Le facteur porte sur toute la parenthèse. Si tu prends deux paquets de (x + 5), tu as deux x et deux fois 5.",
      },
      {
        id: 'confond-avec-2x-plus-5',
        texte: "Pour moi 2(x + 5) et 2x + 5, c'est pareil",
        reponse: "Non : la parenthèse dit qu'on double la somme entière. Sans elle, on ne doublerait que le x.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Une flèche vers chaque terme, et compte." },
    ],
  },

  'somme-et-produit-confondus': {
    nom: "Additionner les coefficients d'un produit",
    famille: 'litteral',
    equilibre: 'naturel',
    regle: "Dans 3x × 5x, on multiplie les nombres entre eux et les lettres entre elles : 15 et x², donc 15x².",
    geste: "Sépare le calcul en deux : les nombres d'un côté, les lettres de l'autre.",
    raisonnements: [
      {
        id: 'regle-de-la-somme',
        texte: "J'ai additionné 3 et 5 comme pour une somme",
        reponse: "C'est la règle de l'addition transportée à la multiplication. Ici on multiplie : 3 × 5 fait 15.",
      },
      {
        id: 'oublie-le-carre',
        texte: "J'ai multiplié les nombres mais laissé un seul x",
        reponse: "Bon réflexe sur les nombres. Il reste x × x, qui fait x² et non x.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Les nombres ensemble, les lettres ensemble." },
    ],
  },

  // ── Contrat didactique, travaillé au palier mélangé ────────────────────────

  'outil-du-chapitre': {
    nom: "Appliquer l'outil du moment sans vérifier qu'il s'applique",
    famille: 'contrat',
    equilibre: 'neutres',
    regle: "Avant de calculer, il faut décider quel outil convient — et parfois aucun ne convient, ou il manque une information.",
    geste: "Demande-toi d'abord « qu'est-ce que je sais ? » et « qu'est-ce que je cherche ? », avant « quelle règle ? ».",
    raisonnements: [
      {
        id: 'cetait-le-chapitre',
        texte: "C'était la règle qu'on vient de travailler",
        reponse: "En contrôle, plus rien n'annonce le chapitre. C'est justement ce qu'on entraîne ici : reconnaître, pas appliquer au réflexe.",
      },
      {
        id: 'des-nombres-donc-je-calcule',
        texte: "Il y avait des nombres, alors je les ai combinés",
        reponse: "Des nombres dans un énoncé ne veulent pas dire qu'ils vont ensemble. Certains ne servent pas, et certaines questions n'ont pas de réponse.",
      },
      { id: 'hasard', texte: "J'ai répondu au hasard", reponse: "Reprends l'énoncé : que sait-on exactement ?" },
    ],
  },
};

/** Les pièges du socle : ceux que le rituel entretient en répétition espacée. */
export const PIEGES_SOCLE = Object.entries(PIEGES)
  .filter(([, p]) => p.famille === 'socle')
  .map(([id]) => id);
