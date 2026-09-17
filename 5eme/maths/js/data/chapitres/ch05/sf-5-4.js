// Chapitre 5, savoir-faire 4 — Enchaîner additions et soustractions.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Des deux derniers points du chapitre 5 dans la liste de la professeure :
// « enchaîner additions et soustractions » et « problèmes ».
//
// ── Regrouper, sans détacher les signes ──────────────────────────────────
//
// Lire de gauche à droite marche toujours, mais oblige à changer de règle à
// chaque terme. Regrouper les positifs puis les négatifs ne demande plus
// qu'une addition de signes contraires, à la fin. Le risque de ce geste est
// précis : détacher un signe de son nombre en regroupant — 7 − 12 + 3 lu
// comme 7 − (12 + 3). Les réponses fausses prévues sont calculées ainsi.

export default {
  id: 'sf-5-4',
  titre: 'Calculer une suite d\'additions et de soustractions',
  attendus: [
    'Il calcule une somme de plusieurs relatifs, de gauche à droite ou en regroupant.',
    'Il regroupe les termes positifs et les termes négatifs pour calculer plus vite.',
    'Il résout un problème qui enchaîne plusieurs variations.',
  ],

  decouvrir: {
    titre: 'Deux façons de compter',
    texte:
      'Pour calculer 8 − 13 + 4 − 6 + 9, on peut lire de gauche à droite, ou regrouper les '
      + 'nombres positifs d\'un côté et les nombres négatifs de l\'autre.',
    question: 'Calcule la somme des nombres positifs, la somme des nombres négatifs, puis le résultat.',
    champs: [
      { id: 'a', etiquette: 'somme des positifs', attendu: 21 },
      { id: 'b', etiquette: 'somme des négatifs', attendu: -19 },
      { id: 'c', etiquette: 'résultat', attendu: 2 },
    ],
    conclusion:
      'Positifs : 8 + 4 + 9 = **21**. Négatifs : −13 − 6 = **−19**. Résultat : 21 − 19 = **2**.\n'
      + 'De gauche à droite, on trouve la même chose : 8 − 13 = −5 ; −5 + 4 = −1 ; −1 − 6 = −7 ; '
      + '−7 + 9 = 2. Regrouper évite de changer de règle à chaque nombre.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'On peut changer l\'ordre des termes',
      texte:
        'Dans une somme de relatifs, on peut **changer l\'ordre** des termes et les **regrouper** '
        + 'comme on veut, à condition que chaque nombre **garde son signe**.',
    },
    {
      type: 'propriete',
      titre: 'Regrouper les positifs et les négatifs',
      texte:
        'On additionne tous les termes positifs, puis tous les termes négatifs. Il ne reste '
        + 'qu\'une addition de deux nombres de signes contraires.\n'
        + '8 − 13 + 4 − 6 + 9 = (8 + 4 + 9) − (13 + 6) = 21 − 19 = 2',
    },
    {
      type: 'remarque',
      titre: 'Les opposés s\'annulent',
      texte:
        'Deux termes opposés ont une somme nulle : dans 7 − 5 + 3 + 5, on barre −5 et +5, il '
        + 'reste 7 + 3 = 10.',
    },
    {
      type: 'exemple',
      texte: '−3 + 7 − 2 − 8 + 1 : positifs 7 + 1 = 8 ; négatifs −3 − 2 − 8 = −13 ; résultat 8 − 13 = −5',
    },
  ],

  methode: {
    titre: 'Calculer −12 + 5 − 3 + 9 − 4',
    enonce: 'Calculer −12 + 5 − 3 + 9 − 4.',
    etapes: [
      {
        texte: 'Je souligne les termes positifs, +5 et +9 : leur somme est 14.',
        note: 'Chaque nombre garde le signe écrit juste devant lui.',
      },
      { texte: 'J\'entoure les termes négatifs, −12, −3 et −4 : leur somme est −19.', note: '' },
      { texte: 'Je termine : 14 − 19 = −5.', note: 'Signes contraires : 19 − 14 = 5, et le signe de −19.' },
    ],
    controle:
      'Le contrôle : refais le calcul de gauche à droite. −12 + 5 = −7 ; −7 − 3 = −10 ; '
      + '−10 + 9 = −1 ; −1 − 4 = −5.',
  },

  entrainement: [
    // ── Palier 1 : trois termes ────────────────────────────────────────────
    {
      // NEUTRE : de gauche à droite, sans jamais passer sous zéro.
      id: 'e-5-4-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '10 - 3 - 2', attendu: 5,
    },
    {
      id: 'e-5-4-2', type: 'calcul', palier: 1, piege: 'signe-detache-du-nombre',
      consigne: 'Calcule.', enonce: '-5 + 8 - 6', attendu: -3,
      fausses: [
        // −(5 + 8) − 6 : le premier « − » étendu au 8.
        { valeur: -19, piege: 'signe-detache-du-nombre' },
        { valeur: 3, piege: 'signe-du-plus-grand' },
      ],
    },
    {
      id: 'e-5-4-3', type: 'calcul', palier: 1, piege: 'signe-detache-du-nombre',
      consigne: 'Calcule.', enonce: '7 - 12 + 3', attendu: -2,
      fausses: [
        // 7 − (12 + 3).
        { valeur: -8, piege: 'signe-detache-du-nombre' },
        { valeur: 2, piege: 'signe-du-plus-grand' },
      ],
    },
    {
      id: 'e-5-4-4', type: 'calcul', palier: 1, piege: 'signe-detache-du-nombre',
      consigne: 'Calcule.', enonce: '-4 - 6 + 15', attendu: 5,
      fausses: [
        { valeur: -25, piege: 'signe-detache-du-nombre' },
        { valeur: -5, piege: 'signe-du-plus-grand' },
      ],
    },
    // ── Palier 2 : regrouper ───────────────────────────────────────────────
    {
      id: 'e-5-4-5', type: 'trous', palier: 2, piege: 'signe-detache-du-nombre',
      consigne: 'Regroupe les termes, puis calcule.', enonce: '9 - 4 + 6 - 13 + 1',
      champs: [
        { id: 'a', etiquette: 'somme des positifs', attendu: 16 },
        { id: 'b', etiquette: 'somme des négatifs', attendu: -17 },
        { id: 'c', etiquette: 'résultat', attendu: -1 },
      ],
      fausses: [
        { valeur: 17, piege: 'signe-detache-du-nombre' },
        { valeur: 1, piege: 'signe-du-plus-grand' },
      ],
    },
    {
      id: 'e-5-4-6', type: 'calcul', palier: 2, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '-2{,}5 + 4 - 1{,}5 - 3', attendu: -3,
      fausses: [{ valeur: 3, piege: 'signe-du-plus-grand' }],
    },
    {
      // NEUTRE : les opposés s'annulent, il n'y a presque rien à calculer.
      id: 'e-5-4-7', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule.', enonce: '6 - 9 + 9 - 6 + 4', attendu: 4,
    },
    {
      id: 'e-5-4-8', type: 'calcul', palier: 2, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '-15 + 8 - 7 + 20', attendu: 6,
      fausses: [{ valeur: -6, piege: 'signe-du-plus-grand' }],
    },
    // ── Palier 3 : de longues suites, et les problèmes ─────────────────────
    {
      id: 'e-5-4-9', type: 'calcul', palier: 3, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '-1 + 2 - 3 + 4 - 5 + 6', attendu: 3,
      fausses: [{ valeur: -3, piege: 'signe-du-plus-grand' }],
    },
    {
      id: 'e-5-4-10', type: 'choix', palier: 3, piege: 'signe-detache-du-nombre',
      consigne: 'Quel regroupement est correct ?', enonce: '5 - 8 + 3 - 2',
      choix: ['(5 + 3) − (8 − 2)', '(5 + 3) − (8 + 2)', '5 − (8 + 3) − 2'],
      attendu: '(5 + 3) − (8 + 2)',
      fausses: [
        { valeur: '(5 + 3) − (8 − 2)', piege: 'signe-detache-du-nombre' },
        { valeur: '5 − (8 + 3) − 2', piege: 'signe-detache-du-nombre' },
      ],
    },
    {
      id: 'e-5-4-11', type: 'vraifaux', palier: 3, piege: 'signe-du-plus-grand',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Une somme de relatifs a toujours le signe de son premier terme.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve deux nombres a et b : a est positif, et a + b est négatif.',
        champs: [{ id: 'a', etiquette: 'a' }, { id: 'b', etiquette: 'b' }],
        valide: (a, b) => a > 0 && a + b < 0,
        exemple: '3 + (−10) = −7 : le premier terme est positif, la somme est négative.',
      },
    },
    {
      id: 'e-5-4-12', type: 'calcul', palier: 3, piege: 'signe-detache-du-nombre',
      consigne: 'Réponds en mètres, avec un nombre relatif.',
      enonce: 'Un plongeur part de −5 m. Il descend de 12 m, remonte de 9 m, puis descend de 3 m. À quelle altitude est-il ?',
      attendu: -11,
      fausses: [
        { valeur: 11, piege: 'signe-oublie' },
        // La remontée comptée comme une descente.
        { valeur: -29, piege: 'signe-detache-du-nombre' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-5-4-1',
      enonce:
        'Un compte contient 3 €. Pendant la semaine, on y dépose 15 €, on paie 7 €, on paie '
        + '12 €, puis on dépose 5 €.',
      questions: [
        { texte: 'Quel est le solde à la fin de la semaine ?', attendu: 4, unite: '€' },
        { texte: 'Quel a été le solde le plus bas pendant la semaine ?', attendu: -1, unite: '€' },
      ],
    },
    {
      id: 'p-5-4-2',
      enonce:
        'En randonnée, on part d\'une altitude de 1 200 m. On monte de 350 m, on descend de '
        + '180 m, puis on monte de 95 m.',
      questions: [
        { texte: 'À quelle altitude arrive-t-on ?', attendu: 1465, unite: 'm' },
        { texte: 'De combien de mètres a-t-on gagné en altitude depuis le départ ?', attendu: 265, unite: 'm' },
      ],
    },
    {
      id: 'p-5-4-3',
      enonce: 'Dans un jeu vidéo, un joueur marque ces points en cinq manches : +40, −25, −30, +10, −15.',
      questions: [
        { texte: 'Quel est son total ?', attendu: -20 },
        { texte: 'Combien de points aurait-il fallu marquer à une sixième manche pour finir à 0 ?', attendu: 20 },
      ],
    },
    {
      id: 'p-5-4-4',
      enonce:
        'La température part de −4 °C, puis varie d\'heure en heure de : +2, +3, +5, −1, −6, −3 '
        + 'degrés.',
      questions: [
        { texte: 'Quelle température fait-il à la fin ?', attendu: -4, unite: '°C' },
        { texte: 'Quelle a été la température la plus haute ?', attendu: 6, unite: '°C' },
      ],
    },
    {
      id: 'p-5-4-5',
      enonce:
        'Dans un immeuble, on part du niveau −2. On monte de 6 niveaux, on descend de 3, on '
        + 'monte de 1, puis on descend de 4.',
      questions: [
        { texte: 'À quel niveau arrive-t-on ?', attendu: -2 },
        { texte: 'Combien de niveaux a-t-on parcourus en tout, en montant et en descendant ?', attendu: 14 },
      ],
    },
  ],

  test: [
    { id: 't-5-4-1', type: 'calcul', consigne: 'Calcule.', enonce: '8 - 3 - 7', attendu: -2, revoir: 'propriete' },
    { id: 't-5-4-2', type: 'calcul', consigne: 'Calcule.', enonce: '-6 + 10 - 1', attendu: 3, revoir: 'propriete' },
    { id: 't-5-4-3', type: 'calcul', consigne: 'Calcule.', enonce: '-9 - 4 + 5', attendu: -8, revoir: 'propriete' },
    { id: 't-5-4-4', type: 'calcul', consigne: 'Calcule.', enonce: '12 - 20 + 3 - 1', attendu: -6, revoir: 'propriete' },
    { id: 't-5-4-5', type: 'calcul', consigne: 'Calcule.', enonce: '-2 + 7 - 5 + 2', attendu: 2, revoir: 'remarque' },
    { id: 't-5-4-6', type: 'calcul', consigne: 'Calcule.', enonce: '1{,}5 - 4 + 0{,}5', attendu: -2, revoir: 'propriete' },
    {
      id: 't-5-4-7', type: 'trous', consigne: 'Regroupe les termes, puis calcule.', enonce: '-8 + 3 - 2 + 6',
      champs: [
        { id: 'a', etiquette: 'somme des positifs', attendu: 9 },
        { id: 'b', etiquette: 'somme des négatifs', attendu: -10 },
        { id: 'c', etiquette: 'résultat', attendu: -1 },
      ],
      revoir: 'propriete',
    },
    {
      id: 't-5-4-8', type: 'choix', consigne: 'Quel regroupement est correct ?', enonce: '-7 + 2 - 4 + 9',
      choix: ['(2 + 9) − (7 − 4)', '(7 + 4) − (2 + 9)', '(2 + 9) − (7 + 4)'], attendu: '(2 + 9) − (7 + 4)', revoir: 'propriete',
    },
    {
      id: 't-5-4-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'On peut changer l\'ordre des termes d\'une somme de relatifs, si chaque nombre garde son signe.',
      attendu: true, revoir: 'propriete',
    },
    {
      id: 't-5-4-10', type: 'calcul', consigne: 'Réponds avec un nombre relatif.',
      enonce: 'Un ascenseur part du niveau 3, descend de 5 niveaux, monte de 1, puis descend de 2. À quel niveau est-il ?',
      attendu: -3, revoir: 'propriete',
    },
  ],
};
