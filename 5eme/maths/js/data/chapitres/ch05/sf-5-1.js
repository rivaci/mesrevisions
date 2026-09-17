// Chapitre 5, savoir-faire 1 — Additionner deux nombres relatifs.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du premier point du chapitre 5 de la liste de la professeure :
// « additionner deux ou plusieurs relatifs ». Les sommes de plusieurs
// relatifs viennent au savoir-faire 4, une fois les écritures simplifiées.
//
// ── Deux décisions, deux pièges ──────────────────────────────────────────
//
// Additionner deux relatifs, c'est décider deux choses : faut-il additionner
// ou soustraire les distances à zéro, et quel signe porte le résultat. Les
// réponses fausses prévues se rangent exactement là — les distances mal
// combinées, le signe mal choisi — plus la contamination par « moins par
// moins donne plus », qui touche beaucoup d'élèves dès qu'ils en ont
// entendu parler.

export default {
  id: 'sf-5-1',
  titre: 'Additionner deux nombres relatifs',
  attendus: [
    'Il additionne deux relatifs de même signe.',
    'Il additionne deux relatifs de signes contraires, en choisissant le bon signe.',
    'Il sait que la somme de deux nombres opposés est nulle.',
  ],

  decouvrir: {
    titre: 'Des points gagnés, des points perdus',
    texte:
      'Dans un jeu, les points gagnés s\'écrivent avec des nombres positifs, les points perdus '
      + 'avec des nombres négatifs. On gagne 5 points au premier tour, puis on en perd 8 au '
      + 'second.',
    lignes: [
      { calcul: 'Premier tour', resultat: '+5' },
      { calcul: 'Second tour', resultat: '−8' },
    ],
    question: 'Quel est le score après les deux tours ?',
    champs: [{ id: 'a', etiquette: 'score', attendu: -3 }],
    conclusion:
      '(+5) + (−8) = **−3** : les 5 points gagnés compensent 5 des 8 points perdus, il reste '
      + '3 points de perte.\n'
      + 'Quand les signes sont **contraires**, on **soustrait** les distances à zéro, et le '
      + 'résultat prend le signe du nombre **le plus éloigné de zéro**.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'Deux nombres de même signe',
      texte:
        'On **additionne** leurs distances à zéro, et le résultat garde **leur signe**.\n'
        + '(+3) + (+4) = +7   ·   (−3) + (−4) = −7',
    },
    {
      type: 'propriete',
      titre: 'Deux nombres de signes contraires',
      texte:
        'On **soustrait** la plus petite distance à zéro de la plus grande, et le résultat prend '
        + 'le signe du nombre **le plus éloigné de zéro**.\n'
        + '(−8) + (+5) = −3, car 8 − 5 = 3 et −8 est le plus loin de zéro. De même, '
        + '(+8) + (−5) = +3.',
    },
    {
      type: 'propriete',
      titre: 'Deux nombres opposés',
      texte: 'La somme de deux nombres opposés est **nulle** : (−6) + (+6) = 0.',
    },
    {
      type: 'remarque',
      titre: 'Vérifier sur la droite graduée',
      texte:
        'Ajouter un nombre positif, c\'est **avancer** vers la droite ; ajouter un nombre '
        + 'négatif, c\'est **reculer** vers la gauche.\n'
        + '(−2) + (−3) : on part de −2 et on recule de 3, on arrive à −5.',
    },
    {
      type: 'exemple',
      texte: '(+3) + (+4) = +7   ·   (−3) + (−4) = −7   ·   (−8) + (+5) = −3   ·   (+8) + (−5) = +3',
    },
  ],

  methode: {
    titre: 'Calculer (−9) + (+4)',
    enonce: 'Calculer (−9) + (+4).',
    etapes: [
      {
        texte: 'Les signes sont contraires : je vais soustraire les distances à zéro.',
        note: 'Signes identiques : on additionne. Signes contraires : on soustrait.',
      },
      { texte: 'Les distances à zéro sont 9 et 4 : 9 − 4 = 5.', note: '' },
      { texte: 'Le plus éloigné de zéro est −9 : le résultat est négatif.', note: 'C\'est lui qui l\'emporte.' },
      { texte: 'Donc (−9) + (+4) = −5.', note: '' },
    ],
    controle:
      'Le contrôle : sur une droite graduée, pars de −9 et avance de 4. Tu arrives à −5 — ni à '
      + '+5, ni à −13.',
  },

  entrainement: [
    // ── Palier 1 : des entiers ─────────────────────────────────────────────
    {
      // NEUTRE : deux positifs, l'addition de toujours.
      id: 'e-5-1-1', type: 'calcul', palier: 1, neutre: true,
      consigne: 'Calcule.', enonce: '(+6) + (+9)', attendu: 15,
    },
    {
      id: 'e-5-1-2', type: 'calcul', palier: 1, piege: 'deux-negatifs-donnent-positif',
      consigne: 'Calcule.', enonce: '(-7) + (-5)', attendu: -12,
      fausses: [
        { valeur: 12, piege: 'deux-negatifs-donnent-positif' },
        { valeur: -2, piege: 'distances-mal-combinees' },
        { valeur: 2, piege: 'distances-mal-combinees' },
      ],
    },
    {
      id: 'e-5-1-3', type: 'calcul', palier: 1, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '(-9) + (+3)', attendu: -6,
      fausses: [
        { valeur: 6, piege: 'signe-du-plus-grand' },
        { valeur: -12, piege: 'distances-mal-combinees' },
        { valeur: 12, piege: 'distances-mal-combinees' },
      ],
    },
    {
      id: 'e-5-1-4', type: 'calcul', palier: 1, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '(+10) + (-4)', attendu: 6,
      fausses: [
        { valeur: -6, piege: 'signe-du-plus-grand' },
        { valeur: 14, piege: 'distances-mal-combinees' },
      ],
    },
    // ── Palier 2 : des décimaux, et le premier nombre n'est plus le plus grand
    {
      id: 'e-5-1-5', type: 'calcul', palier: 2, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '(-2{,}5) + (+7)', attendu: 4.5,
      fausses: [
        { valeur: -4.5, piege: 'signe-du-plus-grand' },
        { valeur: 9.5, piege: 'distances-mal-combinees' },
      ],
    },
    {
      id: 'e-5-1-6', type: 'calcul', palier: 2, piege: 'signe-du-plus-grand',
      consigne: 'Calcule.', enonce: '(+3) + (-11)', attendu: -8,
      fausses: [
        { valeur: 8, piege: 'signe-du-plus-grand' },
        { valeur: 14, piege: 'distances-mal-combinees' },
      ],
    },
    {
      // NEUTRE : deux opposés, le signe ne se pose pas.
      id: 'e-5-1-7', type: 'calcul', palier: 2, neutre: true,
      consigne: 'Calcule.', enonce: '(-15) + (+15)', attendu: 0,
      fausses: [{ valeur: -30, piege: 'distances-mal-combinees' }],
    },
    {
      id: 'e-5-1-8', type: 'calcul', palier: 2, piege: 'deux-negatifs-donnent-positif',
      consigne: 'Calcule.', enonce: '(-4{,}2) + (-1{,}3)', attendu: -5.5,
      fausses: [
        { valeur: 5.5, piege: 'deux-negatifs-donnent-positif' },
        { valeur: -2.9, piege: 'distances-mal-combinees' },
      ],
    },
    // ── Palier 3 : le nombre manquant, et réfuter ──────────────────────────
    {
      id: 'e-5-1-9', type: 'trous', palier: 3, piege: 'distances-mal-combinees',
      consigne: 'Complète avec le nombre qui manque.', enonce: '(-6) + \\ldots = -10',
      champs: [{ id: 'a', etiquette: 'le nombre manquant', attendu: -4 }],
      fausses: [
        { valeur: -16, piege: 'distances-mal-combinees' },
        { valeur: 4, piege: 'distances-mal-combinees' },
      ],
    },
    {
      id: 'e-5-1-10', type: 'vraifaux', palier: 3, piege: 'deux-negatifs-donnent-positif',
      consigne: 'Vrai ou faux ?',
      affirmation: 'La somme de deux nombres relatifs est toujours plus grande que chacun des deux.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve deux nombres dont la somme est plus petite que chacun des deux.',
        champs: [{ id: 'a', etiquette: 'premier nombre' }, { id: 'b', etiquette: 'second nombre' }],
        valide: (a, b) => a + b < a && a + b < b,
        exemple: '(−3) + (−4) = −7, plus petit que −3 et que −4.',
      },
    },
    {
      id: 'e-5-1-11', type: 'vraifaux', palier: 3, piege: 'signe-du-plus-grand',
      consigne: 'Vrai ou faux ?',
      affirmation: 'La somme de deux nombres de signes contraires a toujours le signe du premier nombre.',
      attendu: false,
      contreExemple: {
        invite: 'Trouve deux nombres de signes contraires dont la somme n\'a pas le signe du premier.',
        champs: [{ id: 'a', etiquette: 'premier nombre' }, { id: 'b', etiquette: 'second nombre' }],
        valide: (a, b) => a * b < 0 && (a + b) * a < 0,
        exemple: '(+2) + (−9) = −7 : le premier nombre est positif, la somme est négative.',
      },
    },
    {
      id: 'e-5-1-12', type: 'calcul', palier: 3, piege: 'signe-du-plus-grand',
      consigne: 'Réponds en degrés.',
      enonce: 'Il fait −4 °C, puis la température monte de 9 degrés. Quelle température fait-il ?',
      attendu: 5,
      fausses: [
        { valeur: -5, piege: 'signe-du-plus-grand' },
        { valeur: -13, piege: 'distances-mal-combinees' },
        { valeur: 13, piege: 'distances-mal-combinees' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-5-1-1',
      enonce:
        'À 6 h, il fait −7 °C. À midi, la température a monté de 12 degrés. Le soir, elle a '
        + 'baissé de 8 degrés par rapport à midi.',
      questions: [
        { texte: 'Quelle température fait-il à midi ?', attendu: 5, unite: '°C' },
        { texte: 'Quelle température fait-il le soir ?', attendu: -3, unite: '°C' },
      ],
    },
    {
      id: 'p-5-1-2',
      enonce: 'Un sous-marin est à l\'altitude −120 m. Il remonte de 45 m, puis plonge de 60 m.',
      questions: [
        { texte: 'À quelle altitude est-il après être remonté ?', attendu: -75, unite: 'm' },
        { texte: 'À quelle altitude est-il à la fin ?', attendu: -135, unite: 'm' },
      ],
    },
    {
      id: 'p-5-1-3',
      enonce: 'Un compte affiche un solde de −35 €. On y dépose 50 €, puis on paie un achat de 28 €.',
      questions: [
        { texte: 'Quel est le solde après le dépôt ?', attendu: 15, unite: '€' },
        { texte: 'Quel est le solde à la fin ?', attendu: -13, unite: '€' },
      ],
    },
    {
      id: 'p-5-1-4',
      enonce: 'Dans un jeu, on marque ces points en trois manches : +12, puis −20, puis +5.',
      questions: [
        { texte: 'Quel est le score après les deux premières manches ?', attendu: -8 },
        { texte: 'Quel est le score final ?', attendu: -3 },
      ],
    },
    {
      id: 'p-5-1-5',
      enonce: 'Un ascenseur part du niveau −3, monte de 7 niveaux, puis descend de 2 niveaux.',
      questions: [
        { texte: 'À quel niveau est-il après être monté ?', attendu: 4 },
        { texte: 'À quel niveau s\'arrête-t-il ?', attendu: 2 },
      ],
    },
  ],

  test: [
    { id: 't-5-1-1', type: 'calcul', consigne: 'Calcule.', enonce: '(+8) + (+7)', attendu: 15, revoir: 'propriete' },
    { id: 't-5-1-2', type: 'calcul', consigne: 'Calcule.', enonce: '(-8) + (-7)', attendu: -15, revoir: 'propriete' },
    { id: 't-5-1-3', type: 'calcul', consigne: 'Calcule.', enonce: '(-8) + (+7)', attendu: -1, revoir: 'propriete' },
    { id: 't-5-1-4', type: 'calcul', consigne: 'Calcule.', enonce: '(+8) + (-7)', attendu: 1, revoir: 'propriete' },
    { id: 't-5-1-5', type: 'calcul', consigne: 'Calcule.', enonce: '(-12) + (+5)', attendu: -7, revoir: 'propriete' },
    { id: 't-5-1-6', type: 'calcul', consigne: 'Calcule.', enonce: '(+4{,}5) + (-6)', attendu: -1.5, revoir: 'propriete' },
    { id: 't-5-1-7', type: 'calcul', consigne: 'Calcule.', enonce: '(-9) + (+9)', attendu: 0, revoir: 'propriete' },
    { id: 't-5-1-8', type: 'calcul', consigne: 'Calcule.', enonce: '(-0{,}7) + (-2{,}6)', attendu: -3.3, revoir: 'propriete' },
    {
      id: 't-5-1-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'La somme de deux nombres opposés est égale à 0.', attendu: true, revoir: 'propriete',
    },
    {
      id: 't-5-1-10', type: 'calcul', consigne: 'Réponds en degrés.',
      enonce: 'Il fait −6 °C, puis la température baisse de 5 degrés. Quelle température fait-il ?',
      attendu: -11, revoir: 'remarque',
    },
  ],
};
