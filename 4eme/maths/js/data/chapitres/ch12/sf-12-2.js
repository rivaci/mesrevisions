// Chapitre 12, savoir-faire 2 — Calculer une longueur avec le théorème de Thalès.
//
// ── Ce que ce savoir-faire n'a PAS ────────────────────────────────────────
//
// Rien qui soit de 3e : ni la configuration « papillon », ni les homothéties,
// ni les triangles semblables. Une seule configuration, celle des triangles
// emboîtés — un sommet commun, deux droites parallèles qui coupent les deux
// mêmes demi-droites. Tout le reste attendra.
//
// ── Aucune figure n'est affichée, et c'est structurant ────────────────────
//
// L'appli ne dessine pas. Un énoncé de Thalès doit donc porter en toutes
// lettres ce qu'une figure montrerait d'un coup d'œil : qui est aligné avec
// qui, et dans quel ordre, et quelles droites sont parallèles. Loin d'être un
// handicap, ça sert exactement le savoir-faire : l'élève qui a l'habitude de
// « voir » la configuration sur le dessin doit ici la LIRE, phrase par phrase.
// C'est le geste qui lui manquera en contrôle, quand la figure sera codée mais
// pas légendée.
//
// ── Les deux confusions travaillées, et pourquoi dans cet ordre ───────────
//
// D'abord l'appariement. L'égalité AB/AD = BC/DE est écrite de travers bien
// plus souvent qu'elle n'est mal calculée : le petit triangle et le grand se
// mélangent dans une même fraction et le résultat part à l'envers. D'où le
// geste installé partout — écrire les deux triangles l'un sous l'autre, A B C
// au-dessus de A D E — et le contrôle qui va avec : dans un agrandissement,
// la longueur du grand est plus grande. Toujours.
//
// Ensuite la condition. Le parallélisme n'est pas une décoration de l'énoncé,
// c'est ce qui rend l'égalité vraie. Le piège s'installe tout seul quand tous
// les exercices d'un chapitre la remplissent : l'élève cesse de la chercher.
// Deux items donnent donc des nombres qui « tombent juste » sans que le
// théorème s'applique, et ils sont les seuls où la bonne réponse est de
// refuser de calculer.
//
// ── Les items neutres ─────────────────────────────────────────────────────
//
// Deux, parce que deux stratégies de surface menacent ici.
// « Le résultat est toujours plus grand » : faux dès qu'on cherche une
// longueur du PETIT triangle, ce que font e-12-2-3 et e-12-2-5.
// « On me demande si c'est plausible, donc c'est faux » : e-12-2-7 est une
// configuration parfaitement valable, calcul compris.

export default {
  id: 'sf-12-2',
  titre: 'Calculer une longueur avec le théorème de Thalès',
  attendus: [
    'Il utilise le théorème de Thalès pour calculer une longueur.',
  ],

  // On ne donne pas le théorème : on donne six mesures et on laisse l'élève
  // constater que le rapport est le même trois fois de suite. La deuxième
  // question va plus loin — elle lui fait UTILISER ce coefficient sur une
  // longueur qu'il n'a pas mesurée, c'est-à-dire exactement ce que le
  // théorème sert à faire.
  decouvrir: {
    titre: 'Trois fois le même nombre',
    texte:
      'Dans un triangle ADE, on place un point B sur le segment [AD] et un '
      + 'point C sur le segment [AE], de façon que la droite (BC) soit parallèle '
      + 'à la droite (DE). Deux triangles apparaissent alors, emboîtés l\'un dans '
      + 'l\'autre autour du sommet A : le petit ABC, et le grand ADE. On mesure '
      + 'leurs six côtés.',
    lignes: [
      { calcul: 'AB, puis AD', resultat: '3 cm, puis 9 cm' },
      { calcul: 'AC, puis AE', resultat: '4 cm, puis 12 cm' },
      { calcul: 'BC, puis DE', resultat: '5 cm, puis 15 cm' },
    ],
    question:
      'Pour chaque paire, divise la longueur du grand triangle par celle du '
      + 'petit : tu trouves trois fois le même nombre. Utilise-le ensuite pour '
      + 'répondre à une question qu\'aucune mesure ne donne : si BC avait mesuré '
      + '7 cm, combien aurait mesuré DE ?',
    champs: [
      { id: 'a', etiquette: 'AD ÷ AB =', attendu: 3 },
      { id: 'b', etiquette: 'DE si BC valait 7 cm, en cm :', attendu: 21 },
    ],
    conclusion:
      'Le grand triangle est un **agrandissement** du petit, et le coefficient '
      + 'est **le même pour toutes les longueurs** — pas seulement pour celles '
      + 'qu\'on a mesurées. C\'est ce que dit le théorème de Thalès, et c\'est ce '
      + 'qui permet de calculer une longueur qu\'aucune règle n\'a touchée. '
      + 'Attention : plus rien de tout cela n\'est vrai si (BC) et (DE) ne sont '
      + 'pas **parallèles**.',
  },

  cours: [
    {
      type: 'theoreme',
      titre: 'Théorème de Thalès (triangles emboîtés)',
      texte:
        'Les points A, B, D sont alignés dans cet ordre, et les points A, C, E '
        + 'sont alignés dans cet ordre.\n'
        + 'Si les droites (BC) et (DE) sont **parallèles**, alors :\n'
        + 'AB/AD = AC/AE = BC/DE.\n'
        + 'Ces trois rapports sont égaux : c\'est une seule et même fraction, '
        + 'écrite avec trois paires de longueurs différentes.',
    },
    {
      type: 'propriete',
      titre: 'Un seul coefficient pour tout le triangle',
      texte:
        'On passe donc du petit triangle au grand en multipliant **toutes** ses '
        + 'longueurs par un même nombre k, qui vaut AD ÷ AB.\n'
        + 'Et on revient du grand au petit en divisant par ce même k.',
    },
    {
      // La règle d'écriture, énoncée comme un geste et pas comme une formule :
      // c'est en superposant les deux noms de triangles que la correspondance
      // devient visible, et elle le reste quelles que soient les lettres.
      type: 'remarque',
      titre: 'Apparier les sommets avant d\'écrire quoi que ce soit',
      texte:
        'Écris les deux triangles l\'un sous l\'autre, dans l\'ordre où l\'énoncé '
        + 'les nomme :\n'
        + 'petit triangle : A  B  C\n'
        + 'grand triangle : A  D  E\n'
        + 'Chaque fraction compare une longueur du petit à **celle du grand qui '
        + 'se trouve juste en dessous** : AB avec AD, AC avec AE, BC avec DE. '
        + 'Jamais AB avec AE.',
    },
    {
      type: 'remarque',
      titre: 'Deux conditions, pas une',
      texte:
        'Le théorème demande que les droites soient **parallèles**, et que les '
        + 'points soient **alignés** de façon à former deux triangles emboîtés '
        + 'autour d\'un sommet commun. Si l\'énoncé ne dit ni l\'un ni l\'autre, '
        + 'il n\'y a rien à calculer : le théorème ne s\'applique pas, et les '
        + 'rapports ne sont pas égaux.',
    },
    {
      type: 'exemple',
      texte:
        'A, B, D alignés dans cet ordre, A, C, E alignés dans cet ordre, et '
        + '(BC) parallèle à (DE).\n'
        + 'Avec AB = 3 cm, AD = 9 cm et BC = 5 cm : de 3/9 = 5/DE on tire '
        + 'DE = 5 × 9 ÷ 3 = 15 cm.',
    },
  ],

  methode: {
    titre: 'Rédiger un calcul de longueur avec Thalès',
    enonce:
      'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
      + 'A, C, E. Les droites (BC) et (DE) sont parallèles. On donne AB = 6 cm, '
      + 'AD = 15 cm et BC = 8 cm. Calculer DE.',
    etapes: [
      {
        texte:
          'Je repère les deux triangles : ABC et ADE. Ils ont le sommet A en '
          + 'commun, B est sur [AD] et C est sur [AE].',
        note: 'Sans sommet commun, ce ne serait pas la configuration de Thalès.',
      },
      {
        texte: 'L\'énoncé dit que (BC) et (DE) sont parallèles : la condition est remplie.',
        note: 'C\'est la phrase à chercher en premier, avant le moindre calcul.',
      },
      {
        texte:
          'J\'écris les deux triangles l\'un sous l\'autre — A B C au-dessus de '
          + 'A D E — puis le théorème : AB/AD = AC/AE = BC/DE.',
        note: 'AB va avec AD, AC avec AE, BC avec DE.',
      },
      {
        texte: 'Je ne garde que les deux rapports utiles : AB/AD = BC/DE, soit 6/15 = 8/DE.',
        note: 'Le rapport AC/AE ne sert à rien ici : ni AC ni AE ne sont connus.',
      },
      {
        texte: 'Le produit en croix donne DE = 8 × 15 ÷ 6 = 20. Donc DE = 20 cm.',
        note: 'On multiplie par le nombre du grand triangle, on divise par celui du petit.',
      },
    ],
    controle:
      'Le contrôle : le grand triangle est un agrandissement du petit, donc DE '
      + 'doit être **plus long** que BC. Ici 20 cm contre 8 cm, c\'est cohérent. '
      + 'Si tu trouves une longueur du grand triangle plus courte que celle du '
      + 'petit, tu as retourné un rapport — inutile de chercher plus loin, '
      + 'réécris les deux triangles l\'un sous l\'autre.',
  },

  entrainement: [
    // ── Palier 1 : la configuration est donnée en entier, il reste à calculer ──
    {
      id: 'e-12-2-1', type: 'calcul', palier: 1, piege: 'rapports-mal-apparies',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. Calcule DE, en cm.',
      enonce: 'AB = 3 \\text{ cm}, \\quad AD = 12 \\text{ cm}, \\quad BC = 8 \\text{ cm}',
      attendu: 32,
      // 2, c'est 8 × 3 ÷ 12 : le rapport BC/DE a été retourné en DE/BC. Le
      // résultat est alors plus court que BC, ce que le contrôle attrape seul.
      fausses: [{ valeur: 2, piege: 'rapports-mal-apparies' }],
    },
    {
      id: 'e-12-2-2', type: 'calcul', palier: 1, piege: 'rapports-mal-apparies',
      consigne:
        'Les points M, N, P sont alignés dans cet ordre, ainsi que les points '
        + 'M, Q, R. Les droites (NQ) et (PR) sont parallèles. Calcule PR, en cm.',
      enonce: 'MN = 4 \\text{ cm}, \\quad MP = 12 \\text{ cm}, \\quad NQ = 9 \\text{ cm}',
      attendu: 27,
      fausses: [{ valeur: 3, piege: 'rapports-mal-apparies' }],
    },
    {
      // NEUTRE. Ici la longueur cherchée appartient au PETIT triangle : la
      // réponse est plus petite que la donnée, pas plus grande. Rien ne le
      // signale — même configuration, mêmes lettres, même palier. Sans cet
      // item, « je multiplie par le grand nombre » traverserait le palier sans
      // qu'aucun appariement soit jamais écrit.
      id: 'e-12-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'rapports-mal-apparies',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. Calcule BC, en cm.',
      enonce: 'AB = 4 \\text{ cm}, \\quad AD = 10 \\text{ cm}, \\quad DE = 15 \\text{ cm}',
      attendu: 6,
      // 37,5 vient de 15 × 10 ÷ 4 : le petit côté a été calculé comme s'il
      // était le grand. Une longueur du petit triangle plus longue que son
      // homologue du grand est impossible.
      fausses: [{ valeur: 37.5, piege: 'rapports-mal-apparies' }],
    },

    // ── Palier 2 : l'appariement s'écrit, et les conditions se cherchent ──────
    {
      id: 'e-12-2-4', type: 'trous', palier: 2, piege: 'rapports-mal-apparies',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. On donne '
        + 'AB = 6 cm, AD = 9 cm et BC = 10 cm. Complète.',
      enonce:
        '\\dfrac{AB}{AD} = \\dfrac{BC}{DE} \\quad \\text{donne} \\quad '
        + '\\dfrac{6}{\\square} = \\dfrac{10}{DE} \\quad \\text{puis} \\quad DE = \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'la longueur qui correspond à AB', attendu: 9 },
        { id: 'b', etiquette: 'longueur DE, en cm', attendu: 15 },
      ],
      // Écrire 10 sous le 6, c'est apparier AB avec BC : deux côtés du même
      // petit triangle, alors que la fraction doit traverser du petit au grand.
      fausses: [{ valeur: 10, piege: 'rapports-mal-apparies' }],
    },
    {
      // Les lettres ne sont plus A B C D E : impossible de se raccrocher à
      // l'ordre de l'alphabet, il faut relire quel point est sur quelle
      // demi-droite. Et là encore, la longueur cherchée rétrécit.
      id: 'e-12-2-5', type: 'calcul', palier: 2, piege: 'rapports-mal-apparies',
      consigne:
        'Les points S, T, U sont alignés dans cet ordre, ainsi que les points '
        + 'S, V, W. Les droites (TV) et (UW) sont parallèles. Calcule TV, en cm.',
      enonce: 'ST = 6 \\text{ cm}, \\quad SU = 21 \\text{ cm}, \\quad UW = 14 \\text{ cm}',
      attendu: 4,
      fausses: [{ valeur: 49, piege: 'rapports-mal-apparies' }],
    },
    {
      // Les nombres tombent juste, le calcul est celui du cours — et pourtant
      // la réponse est « non ». Rien n'affirme le parallélisme, donc rien ne
      // garantit l'égalité des rapports. C'est le seul type d'item où la
      // bonne réponse consiste à refuser de calculer.
      id: 'e-12-2-6', type: 'plausible', palier: 2, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, B, D alignés dans cet ordre, A, C, E alignés dans cet ordre.} \\quad '
        + 'AB = 3 \\text{ cm}, AD = 9 \\text{ cm}, BC = 4 \\text{ cm}, \\text{ donc } DE = 12 \\text{ cm}',
      attendu: false,
      explication:
        'Le calcul tomberait juste **si** (BC) et (DE) étaient parallèles — mais '
        + 'l\'énoncé ne le dit nulle part. Sans parallélisme, les rapports ne sont '
        + 'pas égaux et le théorème de Thalès ne s\'applique pas : DE ne peut pas '
        + 'être calculée. Cherche cette phrase avant d\'écrire le moindre rapport.',
    },
    {
      // NEUTRE parmi les « plausible » : ici tout est en règle, conditions
      // comprises, et le résultat est juste. Sans lui, « on me demande donc
      // c'est faux » deviendrait une stratégie gagnante et la recherche des
      // conditions ne servirait plus à rien.
      id: 'e-12-2-7', type: 'plausible', palier: 2, neutre: true, piege: 'thales-sans-parallelisme',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{(BC) // (DE). A, B, D alignés dans cet ordre, A, C, E alignés dans cet ordre.} \\quad '
        + 'AB = 8 \\text{ cm}, AD = 20 \\text{ cm}, BC = 6 \\text{ cm}, \\text{ donc } DE = 15 \\text{ cm}',
      attendu: true,
      explication:
        'Les deux conditions sont écrites : parallélisme et alignements. Le '
        + 'coefficient vaut 20 ÷ 8 = 2,5, et 6 × 2,5 = 15. Tout tient, et 15 cm '
        + 'est bien plus long que 6 cm comme il se doit dans un agrandissement.',
    },

    // ── Palier 3 : relire une production, et voir ce qui manque à l'énoncé ────
    {
      id: 'e-12-2-8', type: 'corriger', palier: 3, piege: 'rapports-mal-apparies',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{(BC) // (DE)}, \\quad AB = 2 \\text{ cm}, \\quad AD = 8 \\text{ cm}, '
        + '\\quad BC = 7 \\text{ cm}, \\quad DE = ?',
      lignes: [
        { texte: 'A, B, D sont alignés dans cet ordre, A, C, E aussi, et (BC) est parallèle à (DE).', fausse: false },
        { texte: 'D\'après le théorème de Thalès : AB/AD = BC/DE.', fausse: false },
        { texte: 'Donc 2/8 = DE/7.', fausse: true },
        { texte: 'DE = 7 × 2 ÷ 8 = 1,75 cm', fausse: false },
      ],
      explication:
        'Les deux premières lignes sont justes. À la troisième, le rapport BC/DE '
        + 'a été retourné en DE/BC : BC = 7 appartient au petit triangle, il doit '
        + 'rester au numérateur, du même côté que AB. En écrivant 2/8 = 7/DE, on '
        + 'trouve DE = 7 × 8 ÷ 2 = 28 cm. La dernière ligne est cohérente avec la '
        + 'faute, mais 1,75 cm serait plus court que BC = 7 cm — impossible dans '
        + 'un agrandissement.',
    },
    {
      // Le coefficient vaut pour les LONGUEURS. L'appliquer tel quel à une aire
      // est l'erreur la mieux documentée de tout le cycle 4, et elle survit à
      // l'énoncé du théorème : il faut la rencontrer, pas seulement l'entendre.
      id: 'e-12-2-9', type: 'vraifaux', palier: 3, piege: 'aire-et-rapport-confondus',
      consigne: 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple.',
      affirmation:
        'Dans une configuration de Thalès, si les longueurs du grand triangle sont trois fois celles du petit, alors son aire est trois fois plus grande.',
      attendu: false,
      contreExemple: {
        invite:
          'Choisis une base et une hauteur pour le petit triangle. On comparera '
          + 'son aire à celle du triangle dont toutes les longueurs sont trois '
          + 'fois plus grandes.',
        champs: [
          { id: 'a', etiquette: 'base du petit triangle, en cm' },
          { id: 'b', etiquette: 'hauteur du petit triangle, en cm' },
        ],
        // On vérifie la propriété — l'aire agrandie ne vaut pas trois fois
        // l'aire de départ — et non un couple imposé : n'importe quelles
        // dimensions positives font l'affaire, l'élève peut être créatif.
        valide: (a, b) => a > 0 && b > 0 && (3 * a) * (3 * b) / 2 !== 3 * (a * b / 2),
        temoin: [4, 5],
        exemple:
          'Base 4 cm et hauteur 5 cm : l\'aire du petit triangle vaut 10 cm². Le '
          + 'grand a alors une base de 12 cm et une hauteur de 15 cm, donc une '
          + 'aire de 90 cm² — neuf fois plus, pas trois. Une aire est un produit '
          + 'de deux longueurs : les deux sont multipliées par 3.',
      },
    },
    {
      // L'énoncé donne BD, un morceau, et pas AD, le côté du grand triangle.
      // Qui n'a pas identifié les deux triangles écrit AB/BD sans y penser.
      id: 'e-12-2-10', type: 'calcul', palier: 3, piege: 'configuration-non-verifiee',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. Calcule DE, en cm.',
      enonce: 'AB = 4 \\text{ cm}, \\quad BD = 6 \\text{ cm}, \\quad BC = 5 \\text{ cm}',
      attendu: 12.5,
      fausses: [
        // 7,5 = 5 × 6 ÷ 4 : [BD] a été pris pour un côté du grand triangle,
        // alors que le côté qui part du sommet commun A est [AD] = 10 cm.
        { valeur: 7.5, piege: 'configuration-non-verifiee' },
        // 2 = 5 × 4 ÷ 10 : la longueur AD est bien reconstituée, mais le
        // rapport est ensuite retourné.
        { valeur: 2, piege: 'rapports-mal-apparies' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-12-2-1',
      enonce:
        'Un piquet vertical de 1,8 m et un arbre vertical se dressent sur un '
        + 'terrain plat. Le soleil projette leur ombre du même côté, et les deux '
        + 'ombres se terminent exactement au même point S. Les points S, le pied '
        + 'du piquet et le pied de l\'arbre sont alignés dans cet ordre, à 3 m et '
        + '12 m de S. Le point S, le sommet du piquet et le sommet de l\'arbre '
        + 'sont eux aussi alignés dans cet ordre : c\'est le rayon de soleil. '
        + 'Le piquet et l\'arbre étant tous deux verticaux, ils sont parallèles.',
      questions: [
        { texte: 'Par combien la distance à S est-elle multipliée quand on passe du piquet à l\'arbre ?', attendu: 4 },
        { texte: 'Quelle est la hauteur de l\'arbre ?', attendu: 7.2, unite: 'm' },
      ],
    },
    {
      id: 'p-12-2-2',
      enonce:
        'Une rampe rectiligne part d\'un point A au sol et monte régulièrement. '
        + 'Des poteaux verticaux relient le sol à la rampe : ils sont donc tous '
        + 'parallèles entre eux. Le poteau [BC] a son pied en B et le poteau [DE] '
        + 'a son pied en D, avec A, B, D alignés dans cet ordre au sol et A, C, E '
        + 'alignés dans cet ordre le long de la rampe. On mesure AB = 2 m, '
        + 'AD = 5 m et BC = 0,8 m.',
      questions: [
        { texte: 'Quelle est la hauteur DE du second poteau ?', attendu: 2, unite: 'm' },
        { texte: 'Un troisième poteau vertical [FG] a son pied en F, dans l\'alignement de A, B et D, avec AF = 7,5 m. Quelle est sa hauteur ?', attendu: 3, unite: 'm' },
      ],
    },
    {
      id: 'p-12-2-3',
      enonce:
        'Un terrain a la forme du triangle ADE. Un chemin rectiligne [BC] le '
        + 'traverse : le point B appartient au segment [AD], le point C au '
        + 'segment [AE], et la droite (BC) est parallèle à la droite (DE). '
        + 'On relève AB = 24 m, AD = 60 m, DE = 45 m et AE = 50 m.',
      questions: [
        { texte: 'Quelle est la longueur du chemin BC ?', attendu: 18, unite: 'm' },
        { texte: 'Quelle est la longueur AC ?', attendu: 20, unite: 'm' },
      ],
    },
    {
      // La longueur du grand triangle n'est pas donnée : il faut d'abord la
      // reconstituer. C'est le problème qui refait, en contexte, ce que
      // e-12-2-10 travaille à sec.
      id: 'p-12-2-4',
      enonce:
        'Dans un triangle ADE, le point B appartient au segment [AD] et le '
        + 'point C au segment [AE]. Les droites (BC) et (DE) sont parallèles. '
        + 'On sait que AB = 6 cm, BD = 9 cm et BC = 8 cm.',
      questions: [
        { texte: 'Quelle est la longueur AD ?', attendu: 15, unite: 'cm' },
        { texte: 'Quelle est la longueur DE ?', attendu: 20, unite: 'cm' },
      ],
    },
    {
      id: 'p-12-2-5',
      enonce:
        'Un photographe pose son appareil au point A. Devant lui, un cadre '
        + 'rectiligne [BC] et un mur [DE] sont parallèles. Les points A, B, D '
        + 'sont alignés dans cet ordre, ainsi que les points A, C, E. '
        + 'On mesure AB = 1,2 m, AD = 4,8 m, et le mur DE mesure 6 m.',
      questions: [
        { texte: 'Par combien faut-il multiplier les longueurs du petit triangle pour obtenir celles du grand ?', attendu: 4 },
        { texte: 'Quelle est la largeur BC du cadre ?', attendu: 1.5, unite: 'm' },
      ],
    },
  ],

  test: [
    {
      id: 't-12-2-1', type: 'calcul',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. Calcule DE, en cm.',
      enonce: 'AB = 2 \\text{ cm}, \\quad AD = 10 \\text{ cm}, \\quad BC = 3 \\text{ cm}',
      attendu: 15,
      fausses: [{ valeur: 0.6, piege: 'rapports-mal-apparies' }],
      revoir: 'theoreme',
    },
    {
      id: 't-12-2-2', type: 'calcul',
      consigne:
        'Les points M, N, P sont alignés dans cet ordre, ainsi que les points '
        + 'M, Q, R. Les droites (NQ) et (PR) sont parallèles. Calcule PR, en cm.',
      enonce: 'MN = 6 \\text{ cm}, \\quad MP = 15 \\text{ cm}, \\quad NQ = 4 \\text{ cm}',
      attendu: 10,
      fausses: [{ valeur: 1.6, piege: 'rapports-mal-apparies' }],
      revoir: 'propriete',
    },
    {
      // La longueur cherchée est celle du petit triangle : elle rétrécit.
      id: 't-12-2-3', type: 'calcul',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. Calcule BC, en cm.',
      enonce: 'AB = 3 \\text{ cm}, \\quad AD = 12 \\text{ cm}, \\quad DE = 24 \\text{ cm}',
      attendu: 6,
      fausses: [{ valeur: 96, piege: 'rapports-mal-apparies' }],
      revoir: 'propriete',
    },
    {
      id: 't-12-2-4', type: 'trous',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. On donne '
        + 'AB = 5 cm, AD = 8 cm et BC = 4 cm. Complète.',
      enonce:
        '\\dfrac{5}{\\square} = \\dfrac{4}{DE} \\quad \\text{puis} \\quad DE = \\square \\text{ cm}',
      champs: [
        { id: 'a', etiquette: 'la longueur qui correspond à AB', attendu: 8 },
        { id: 'b', etiquette: 'longueur DE, en cm', attendu: 6.4 },
      ],
      fausses: [{ valeur: 4, piege: 'rapports-mal-apparies' }],
      revoir: 'remarque',
    },
    {
      id: 't-12-2-5', type: 'calcul',
      consigne:
        'Les points A, B, D sont alignés dans cet ordre, ainsi que les points '
        + 'A, C, E. Les droites (BC) et (DE) sont parallèles. Calcule DE, en cm.',
      enonce: 'AB = 5 \\text{ cm}, \\quad BD = 15 \\text{ cm}, \\quad BC = 3 \\text{ cm}',
      attendu: 12,
      fausses: [{ valeur: 9, piege: 'configuration-non-verifiee' }],
      revoir: 'remarque',
    },
    {
      id: 't-12-2-6', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{A, B, D alignés dans cet ordre, A, C, E alignés dans cet ordre.} \\quad '
        + 'AB = 4 \\text{ cm}, AD = 12 \\text{ cm}, BC = 5 \\text{ cm}, \\text{ donc } DE = 15 \\text{ cm}',
      attendu: false,
      explication:
        'Aucune phrase ne dit que (BC) et (DE) sont parallèles. Sans cette '
        + 'condition, les rapports ne sont pas égaux : le théorème de Thalès ne '
        + 's\'applique pas et DE reste inconnue, même si le calcul tombe rond.',
      piege: 'thales-sans-parallelisme',
      revoir: 'remarque',
    },
    {
      id: 't-12-2-7', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{(BC) // (DE). A, B, D alignés dans cet ordre, A, C, E alignés dans cet ordre.} \\quad '
        + 'AB = 7 \\text{ cm}, AD = 21 \\text{ cm}, BC = 4 \\text{ cm}, \\text{ donc } DE = 12 \\text{ cm}',
      attendu: true,
      explication:
        'Les deux conditions sont là. Le coefficient vaut 21 ÷ 7 = 3, et '
        + '4 × 3 = 12. La longueur du grand triangle est bien la plus grande.',
      revoir: 'exemple',
    },
    {
      id: 't-12-2-8', type: 'plausible',
      consigne: 'Ce résultat est-il plausible ?',
      enonce:
        '\\text{(BC) // (DE). A, B, D alignés dans cet ordre, A, C, E alignés dans cet ordre.} \\quad '
        + 'AB = 6 \\text{ cm}, AD = 18 \\text{ cm}, BC = 9 \\text{ cm}, \\text{ donc } DE = 3 \\text{ cm}',
      attendu: false,
      explication:
        'DE appartient au grand triangle : elle ne peut pas être plus courte que '
        + 'BC = 9 cm. Le rapport a été retourné. Le coefficient vaut 18 ÷ 6 = 3, '
        + 'donc DE = 9 × 3 = 27 cm.',
      piege: 'rapports-mal-apparies',
      revoir: 'propriete',
    },
    {
      id: 't-12-2-9', type: 'corriger',
      consigne: 'Ce calcul est faux. Trouve la ligne où l\'erreur apparaît.',
      enonce:
        '\\text{(BC) // (DE)}, \\quad AB = 5 \\text{ cm}, \\quad AD = 20 \\text{ cm}, '
        + '\\quad BC = 9 \\text{ cm}, \\quad DE = ?',
      lignes: [
        { texte: 'A, B, D sont alignés dans cet ordre, A, C, E aussi, et (BC) est parallèle à (DE).', fausse: false },
        { texte: 'D\'après le théorème de Thalès : AB/AD = BC/DE.', fausse: false },
        { texte: 'Donc 5/20 = 9/DE, puis DE = 9 × 5 ÷ 20 = 2,25 cm.', fausse: true },
      ],
      explication:
        'Le rapport 5/20 = 9/DE est bien écrit : c\'est le produit en croix qui '
        + 'dérape. DE s\'obtient en multipliant 9 par 20 puis en divisant par 5, '
        + 'soit DE = 36 cm. Le contrôle le disait déjà : 2,25 cm serait plus court '
        + 'que BC = 9 cm, ce qui est impossible dans un agrandissement.',
      piege: 'rapports-mal-apparies',
      revoir: 'exemple',
    },
    {
      id: 't-12-2-10', type: 'calcul',
      consigne:
        'Les points S, T, U sont alignés dans cet ordre, ainsi que les points '
        + 'S, V, W. Les droites (TV) et (UW) sont parallèles. Calcule TV, en cm.',
      enonce: 'ST = 3 \\text{ cm}, \\quad SU = 12 \\text{ cm}, \\quad UW = 20 \\text{ cm}',
      attendu: 5,
      fausses: [{ valeur: 80, piege: 'rapports-mal-apparies' }],
      revoir: 'theoreme',
    },
  ],
};
