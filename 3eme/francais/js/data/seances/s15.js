// Séance 15 — Reconnaître n'importe quelle figure.
//
// Le bilan du bloc, comme la feuille d'exercices d'Evan : « associe chaque
// phrase à une figure », toutes mêlées. Ici, pas de nouvelle figure : une
// méthode en quatre questions, et des choix qui mélangent les familles —
// c'est là que les confusions des séances 12 à 14 ressortent.
//
// Un classique libre de droits (Corneille) ; le reste est écrit pour l'appli.

export default {
  numero: 15,
  bloc: 3,
  titre: 'Reconnaître n\'importe quelle figure',
  sousTitre: 'Toutes les figures mêlées, et une méthode pour s\'y retrouver',
  objectif: 'Nommer une figure sans savoir d\'avance de quelle famille elle est.',

  rappels: [
    {
      id: 'r1',
      titre: 'Quatre questions, dans l\'ordre',
      texte:
        '1. Deux éléments **rapprochés** ? Avec un outil : **comparaison** ; sans : **métaphore**. Une idée abstraite incarnée : **allégorie** ; une chose qui vit : **personnification**. Un mot remplacé par une expression : **périphrase**.\n\n' +
        '2. Deux éléments **opposés** ? Soudés : **oxymore** ; répartis : **antithèse**. Le contraire de ce qu\'on pense : **antiphrase**.\n\n' +
        '3. **Plus** ou **moins** que la réalité ? **Hyperbole**, **accumulation**, **gradation** — ou **euphémisme**, **litote**.\n\n' +
        '4. Quelque chose **revient** ? Un mot en tête : **anaphore** ; des mots croisés : **chiasme** ; deux mots presque pareils : **paronomase** ; un son : **assonance** ou **allitération**.',
      exemples: [
        { phrase: 'Cette ville est **une fourmilière**.', note: 'Question 1 : rapprochement sans outil — métaphore.' },
        { phrase: 'Va, **cours**, **vole**, et nous venge ! (Corneille)', note: 'Question 3 : de plus en plus fort — gradation.' },
      ],
    },
  ],

  exercices: [
    {
      id: 's15-e1', rappel: 'r1', type: 'qcm', palier: 1, piege: 'comparaison-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'En sortant de l\'eau, il était **pâle comme un linge**.',
      choix: ['une comparaison', 'une métaphore', 'une hyperbole', 'une périphrase'], attendu: 'une comparaison',
    },
    {
      id: 's15-e2', rappel: 'r1', type: 'qcm', palier: 2, piege: 'comparaison-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ses joues étaient **deux pommes** bien rouges.',
      choix: ['une métaphore', 'une comparaison', 'une personnification', 'une hyperbole'], attendu: 'une métaphore',
    },
    {
      id: 's15-e3', rappel: 'r1', type: 'qcm', palier: 2, piege: 'personnification-ou-allegorie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**La Peur** frappait à toutes les portes du village.',
      choix: ['une allégorie', 'une personnification', 'une métaphore', 'une périphrase'], attendu: 'une allégorie',
    },
    {
      id: 's15-e4', rappel: 'r1', type: 'qcm', palier: 2, piege: 'personnification-ou-allegorie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Le ruisseau **bavard** chantait sous les pierres.',
      choix: ['une personnification', 'une allégorie', 'une métaphore', 'une allitération'], attendu: 'une personnification',
    },
    {
      id: 's15-e5', rappel: 'r1', type: 'qcm', palier: 2, piege: 'periphrase-ou-metaphore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**La cité des Papes** attire chaque été des milliers de touristes.',
      choix: ['une périphrase', 'une métaphore', 'une allégorie', 'une hyperbole'], attendu: 'une périphrase',
    },
    {
      id: 's15-e6', rappel: 'r1', type: 'qcm', palier: 3, piege: 'antithese-ou-oxymore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il m\'a répondu avec **une douce violence**.',
      choix: ['un oxymore', 'une antithèse', 'une antiphrase', 'un chiasme'], attendu: 'un oxymore',
    },
    {
      id: 's15-e7', rappel: 'r1', type: 'qcm', palier: 3, piege: 'antithese-ou-oxymore',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il **gagne** tout au jeu et **perd** tout en amour.',
      choix: ['une antithèse', 'un oxymore', 'un chiasme', 'une antiphrase'], attendu: 'une antithèse',
    },
    {
      id: 's15-e8', rappel: 'r1', type: 'qcm', palier: 2, piege: 'attenuation-ou-ironie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Tu as eu 2 sur 20 ? **Félicitations, champion !**',
      choix: ['une antiphrase', 'une litote', 'un euphémisme', 'une hyperbole'], attendu: 'une antiphrase',
    },
    {
      id: 's15-e9', rappel: 'r1', type: 'qcm', palier: 3, piege: 'attenuation-ou-ironie',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Ce concert ? **Ce n\'était pas désagréable.**',
      choix: ['une litote', 'un euphémisme', 'une antiphrase', 'une hyperbole'], attendu: 'une litote',
    },
    {
      id: 's15-e10', rappel: 'r1', type: 'qcm', palier: 2, piege: 'hyperbole-gradation-accumulation',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'J\'ai tellement faim que **je mangerais un éléphant**.',
      choix: ['une hyperbole', 'une gradation', 'une accumulation', 'une comparaison'], attendu: 'une hyperbole',
    },
    {
      id: 's15-e11', rappel: 'r1', type: 'qcm', palier: 3, piege: 'hyperbole-gradation-accumulation',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il **chuchota**, **parla**, puis **hurla** son nom.',
      choix: ['une gradation', 'une accumulation', 'une anaphore', 'une hyperbole'], attendu: 'une gradation',
    },
    {
      id: 's15-e12', rappel: 'r1', type: 'qcm', palier: 2, piege: 'quelle-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: '**Assez** de cris, **assez** de larmes, **assez** de peur.',
      choix: ['une anaphore', 'une accumulation', 'un chiasme', 'une paronomase'], attendu: 'une anaphore',
    },
    {
      id: 's15-e13', rappel: 'r1', type: 'qcm', palier: 3, piege: 'assonance-ou-alliteration',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Sous le **s**able **s**ec, **s**ix **s**erpents **s**ommeillaient.',
      choix: ['une allitération', 'une assonance', 'une anaphore', 'une paronomase'], attendu: 'une allitération',
    },
    {
      id: 's15-e14', rappel: 'r1', type: 'qcm', palier: 3, piege: 'chiasme-ou-repetition',
      consigne: 'Quelle est cette figure de style ?',
      phrase: 'Il **dit** ce qu\'il **pense**, et **pense** ce qu\'il **dit**.',
      choix: ['un chiasme', 'une anaphore', 'une antithèse', 'une paronomase'], attendu: 'un chiasme',
    },
  ],
};
