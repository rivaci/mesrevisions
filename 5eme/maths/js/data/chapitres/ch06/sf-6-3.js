// Chapitre 6, savoir-faire 3 — Savoir si un triangle est constructible.
//
// ── D'où vient ce savoir-faire ────────────────────────────────────────────
//
// Du point [EIB] « constructibilité » de la liste de la professeure :
// l'inégalité triangulaire, et son cas d'égalité.
//
// ── Trois réponses, pas deux ─────────────────────────────────────────────
//
// Entre « oui » et « non », le cas d'égalité — 4, 5 et 9 cm — mérite sa
// propre réponse : les points sont alignés, le triangle est aplati. Le
// traiter comme un simple « non » cacherait la seule situation où les deux
// arcs se touchent. Chaque item porte ses `longueurs`, et le contrôle de
// contenu refait la comparaison.

const REPONSES = {
  oui: 'oui',
  non: 'non : les deux petits côtés sont trop courts',
  aplati: 'non : les trois points sont alignés (triangle aplati)',
};
const CHOIX = [REPONSES.oui, REPONSES.non, REPONSES.aplati];
// « 6,5 cm, 3 cm et 3,5 cm » : la virgule décimale interdit de repérer le
// dernier élément par une virgule, on assemble donc la liste à la main.
const enCm = (longueurs) => {
  const textes = longueurs.map((l) => `${String(l).replace('.', ',')} cm`);
  return `${textes.slice(0, -1).join(', ')} et ${textes.at(-1)}`;
};
const constructible = (id, palier, longueurs, attendu, extra = {}) => ({
  id, type: 'choix', palier,
  consigne: 'Peut-on construire un triangle avec ces trois longueurs ?',
  enonce: `Les longueurs ${enCm(longueurs)}.`,
  longueurs, choix: CHOIX, attendu,
  ...extra,
});
const tousFaux = (attendu) => CHOIX.filter((c) => c !== attendu).map((valeur) => ({ valeur, piege: 'inegalite-triangulaire' }));

export default {
  id: 'sf-6-3',
  titre: 'Savoir si un triangle est constructible',
  attendus: [
    'Il sait qu\'un triangle est constructible si la plus grande longueur est plus petite que la somme des deux autres.',
    'Il reconnaît le cas d\'égalité : les trois points sont alignés.',
    'Il sait que deux angles d\'un triangle ont une somme inférieure à 180°.',
  ],

  decouvrir: {
    titre: 'Trois bâtons',
    texte:
      'On essaie de former un triangle avec trois bâtons de 3 cm, 4 cm et 9 cm. Même mis bout à '
      + 'bout, les deux petits bâtons ne rejoignent pas les deux extrémités du grand.',
    question: 'Quelle longueur font les deux petits bâtons mis bout à bout ? Combien leur manque-t-il pour égaler le grand ?',
    champs: [
      { id: 'a', etiquette: 'bout à bout, en cm', attendu: 7 },
      { id: 'b', etiquette: 'il manque, en cm', attendu: 2 },
    ],
    conclusion:
      '3 + 4 = **7 cm**, soit **2 cm** de moins que 9 cm : impossible de fermer le triangle.\n'
      + 'Pour qu\'un triangle existe, sa **plus grande** longueur doit être **plus petite** que la '
      + 'somme des deux autres.',
  },

  cours: [
    {
      type: 'propriete',
      titre: 'L\'inégalité triangulaire',
      texte:
        'Dans un triangle, chaque côté est plus court que la somme des deux autres : pour aller de '
        + 'A à C, le chemin direct est le plus court.\n'
        + 'On peut donc construire un triangle de côtés a, b et c, où c est le plus grand, si '
        + '**c < a + b**.',
    },
    {
      type: 'remarque',
      titre: 'Le cas d\'égalité',
      texte:
        'Si **c = a + b**, les deux arcs de cercle se touchent sur le grand côté : les trois points '
        + 'sont **alignés**. On obtient un triangle « aplati », qui n\'est pas un vrai triangle.',
    },
    {
      type: 'remarque',
      titre: 'Une seule comparaison suffit',
      texte:
        'Seule la **plus grande** longueur peut poser problème. Si elle est plus petite que la somme '
        + 'des deux autres, les deux autres comparaisons sont forcément vraies.',
    },
    {
      type: 'propriete',
      titre: 'Et avec des angles',
      texte:
        'Deux angles d\'un triangle ont une somme **strictement inférieure à 180°** : sinon, il ne '
        + 'reste rien pour le troisième.',
    },
    {
      type: 'exemple',
      texte: '5, 6 et 10 : 10 < 11, constructible   ·   4, 5 et 9 : 9 = 9, aplati   ·   2, 3 et 8 : 8 > 5, impossible',
    },
  ],

  methode: {
    titre: 'Le triangle de côtés 6 cm, 4 cm et 11 cm existe-t-il ?',
    enonce: 'Peut-on construire un triangle dont les côtés mesurent 6 cm, 4 cm et 11 cm ?',
    etapes: [
      { texte: 'Je repère la plus grande longueur : 11 cm.', note: 'C\'est la seule à tester.' },
      { texte: 'Je calcule la somme des deux autres : 6 + 4 = 10 cm.', note: '' },
      { texte: 'Je compare : 11 > 10.', note: 'La plus grande longueur dépasse la somme des deux autres.' },
      { texte: 'Le triangle n\'est pas constructible.', note: '' },
    ],
    controle:
      'Le contrôle : imagine la construction. Deux arcs de rayons 6 cm et 4 cm, tracés aux '
      + 'extrémités d\'un segment de 11 cm, ne se rencontrent pas.',
  },

  entrainement: [
    // ── Palier 1 : des entiers, la plus grande longueur à la fin ───────────
    // NEUTRE : le triangle 3-4-5, qui existe sans discussion.
    constructible('e-6-3-1', 1, [3, 4, 5], REPONSES.oui, { neutre: true }),
    constructible('e-6-3-2', 1, [2, 3, 8], REPONSES.non, { piege: 'inegalite-triangulaire', fausses: tousFaux(REPONSES.non) }),
    constructible('e-6-3-3', 1, [4, 5, 9], REPONSES.aplati, { piege: 'inegalite-triangulaire', fausses: tousFaux(REPONSES.aplati) }),
    // La plus grande longueur n'est plus à la fin.
    constructible('e-6-3-4', 1, [10, 4, 7], REPONSES.oui, { piege: 'inegalite-triangulaire', fausses: tousFaux(REPONSES.oui) }),
    // ── Palier 2 : des décimaux, un troisième côté à chercher ──────────────
    constructible('e-6-3-5', 2, [6.5, 3, 3.5], REPONSES.aplati, { piege: 'inegalite-triangulaire', fausses: tousFaux(REPONSES.aplati) }),
    constructible('e-6-3-6', 2, [12, 5, 6], REPONSES.non, { piege: 'inegalite-triangulaire', fausses: tousFaux(REPONSES.non) }),
    {
      id: 'e-6-3-7', type: 'calcul', palier: 2, piege: 'inegalite-triangulaire',
      consigne: 'Réponds en centimètres.',
      enonce: 'Deux côtés d\'un triangle mesurent 5 cm et 8 cm. Le troisième mesure un nombre entier de centimètres. Quelle est sa plus grande longueur possible ?',
      attendu: 12,
      fausses: [{ valeur: 13, piege: 'inegalite-triangulaire' }],
    },
    {
      // NEUTRE : les angles, qui ne demandent que la somme.
      id: 'e-6-3-8', type: 'choix', palier: 2, neutre: true,
      consigne: 'Un triangle peut-il avoir ces deux angles ?', enonce: 'Deux angles de 70° et de 50°.',
      choix: ['oui', 'non'], attendu: 'oui',
    },
    // ── Palier 3 : bornes et réfutation ────────────────────────────────────
    {
      id: 'e-6-3-9', type: 'calcul', palier: 3, piege: 'inegalite-triangulaire',
      consigne: 'Réponds en centimètres.',
      enonce: 'Deux côtés d\'un triangle mesurent 5 cm et 8 cm. Le troisième mesure un nombre entier de centimètres. Quelle est sa plus petite longueur possible ?',
      attendu: 4,
      fausses: [{ valeur: 3, piege: 'inegalite-triangulaire' }],
    },
    {
      id: 'e-6-3-10', type: 'choix', palier: 3, piege: 'somme-angles-oubliee',
      consigne: 'Un triangle peut-il avoir ces deux angles ?', enonce: 'Deux angles de 100° et de 85°.',
      choix: ['oui', 'non'], attendu: 'non',
      fausses: [{ valeur: 'oui', piege: 'somme-angles-oubliee' }],
    },
    {
      id: 'e-6-3-11', type: 'vraifaux', palier: 3, piege: 'inegalite-triangulaire',
      consigne: 'Vrai ou faux ?',
      affirmation: 'Avec trois longueurs quelconques, on peut toujours construire un triangle.',
      attendu: false,
      contreExemple: {
        invite: 'Donne trois longueurs, en centimètres, avec lesquelles c\'est impossible.',
        champs: [{ id: 'a', etiquette: 'première' }, { id: 'b', etiquette: 'deuxième' }, { id: 'c', etiquette: 'troisième' }],
        valide: (a, b, c) => [a, b, c].every((l) => l > 0) && 2 * Math.max(a, b, c) > a + b + c,
        temoin: [1, 2, 10],
        exemple: '1 cm, 2 cm et 10 cm : 10 est plus grand que 1 + 2.',
      },
    },
    {
      id: 'e-6-3-12', type: 'choix', palier: 3, piege: 'inegalite-triangulaire',
      consigne: 'Avec quelles longueurs peut-on construire un vrai triangle ?', enonce: 'Trois séries de longueurs.',
      choix: ['2 cm, 3 cm et 6 cm', '1 cm, 5 cm et 6 cm', '4 cm, 4 cm et 7 cm'],
      attendu: '4 cm, 4 cm et 7 cm',
      fausses: [
        { valeur: '2 cm, 3 cm et 6 cm', piege: 'inegalite-triangulaire' },
        { valeur: '1 cm, 5 cm et 6 cm', piege: 'inegalite-triangulaire' },
      ],
    },
  ],

  problemes: [
    {
      id: 'p-6-3-1',
      enonce: 'Un fermier veut clôturer un champ triangulaire dont les côtés mesureraient 40 m, 25 m et 70 m.',
      questions: [
        { texte: 'Quelle est la somme des deux plus petits côtés ?', attendu: 65, unite: 'm' },
        { texte: 'De combien de mètres le plus grand côté dépasse-t-il cette somme ?', attendu: 5, unite: 'm' },
      ],
    },
    {
      id: 'p-6-3-2',
      enonce:
        'Pour aller de la maison M à l\'école E, on peut passer par la boulangerie B, avec '
        + 'MB = 600 m et BE = 450 m.',
      questions: [
        { texte: 'Quelle est la longueur du trajet qui passe par la boulangerie ?', attendu: 1050, unite: 'm' },
        { texte: 'Au plus, combien de mètres mesure le trajet direct de M à E ?', attendu: 1050, unite: 'm' },
      ],
    },
    {
      id: 'p-6-3-3',
      enonce: 'Un triangle a deux côtés de 9 cm et 4 cm. Son troisième côté mesure un nombre entier de centimètres.',
      questions: [
        { texte: 'Quelle est la plus petite longueur possible ?', attendu: 6, unite: 'cm' },
        { texte: 'Quelle est la plus grande longueur possible ?', attendu: 12, unite: 'cm' },
        { texte: 'Combien de longueurs entières sont possibles ?', attendu: 7 },
      ],
    },
    {
      id: 'p-6-3-4',
      enonce: 'Un triangle isocèle a deux côtés égaux de 5 cm. Son troisième côté mesure un nombre entier de centimètres.',
      questions: [
        { texte: 'Quelle est la plus grande longueur possible pour ce troisième côté ?', attendu: 9, unite: 'cm' },
        { texte: 'Quel est alors le périmètre du triangle ?', attendu: 19, unite: 'cm' },
      ],
    },
    {
      id: 'p-6-3-5',
      enonce: 'Dans un triangle, un angle mesure 95°. Les autres angles mesurent un nombre entier de degrés.',
      questions: [
        { texte: 'Quelle est la plus grande mesure possible pour un deuxième angle ?', attendu: 84, unite: '°' },
        { texte: 'Combien mesure alors le troisième angle ?', attendu: 1, unite: '°' },
      ],
    },
  ],

  test: [
    constructible('t-6-3-1', undefined, [5, 7, 10], REPONSES.oui, { revoir: 'propriete' }),
    constructible('t-6-3-2', undefined, [3, 5, 9], REPONSES.non, { revoir: 'propriete' }),
    constructible('t-6-3-3', undefined, [6, 2, 4], REPONSES.aplati, { revoir: 'remarque' }),
    constructible('t-6-3-4', undefined, [8, 8, 15], REPONSES.oui, { revoir: 'propriete' }),
    constructible('t-6-3-5', undefined, [1.5, 2.5, 4.5], REPONSES.non, { revoir: 'propriete' }),
    {
      id: 't-6-3-6', type: 'choix', consigne: 'Un triangle peut-il avoir ces deux angles ?', enonce: 'Deux angles de 120° et de 60°.',
      choix: ['oui', 'non'], attendu: 'non', revoir: 'propriete',
    },
    {
      id: 't-6-3-7', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'Deux côtés d\'un triangle mesurent 3 cm et 7 cm. Le troisième mesure un nombre entier de centimètres. Quelle est sa plus grande longueur possible ?',
      attendu: 9, revoir: 'propriete',
    },
    {
      id: 't-6-3-8', type: 'calcul', consigne: 'Réponds en centimètres.',
      enonce: 'Deux côtés d\'un triangle mesurent 3 cm et 7 cm. Le troisième mesure un nombre entier de centimètres. Quelle est sa plus petite longueur possible ?',
      attendu: 5, revoir: 'propriete',
    },
    {
      id: 't-6-3-9', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'Si la plus grande longueur est égale à la somme des deux autres, les trois points sont alignés.',
      attendu: true, revoir: 'remarque',
    },
    {
      id: 't-6-3-10', type: 'vraifaux', consigne: 'Vrai ou faux ?',
      affirmation: 'On peut construire un triangle dont les côtés mesurent 2 cm, 2 cm et 5 cm.', attendu: false, revoir: 'propriete',
    },
  ],
};
