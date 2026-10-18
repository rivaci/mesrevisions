// Chapitre 2, savoir-faire 5 — Calculer avec les fractions.
//
// Trois blancs de l'interrogation : 1/2 ÷ 7/9, simplifier 16/18, 1/4 + 3/12.
// Les deux réussis, 2/6 + 3/6 et 3/4 × 3/5, sont les cas où l'on n'a rien à
// transformer : même dénominateur, ou un produit qui se fait tout droit. Le
// savoir-faire vise donc ce qui demande UNE transformation avant de calculer :
// mettre au même dénominateur, retourner la fraction par laquelle on divise,
// simplifier jusqu'au bout. Les réponses s'écrivent en fraction simplifiée.

export default {
  id: 'sf-2-5',
  titre: 'Calculer avec les fractions',
  attendus: [
    'Il additionne, soustrait, multiplie et divise des fractions simples de tête.',
    'Il donne le résultat sous forme de fraction simplifiée.',
  ],

  cours: [
    {
      type: 'propriete',
      titre: 'Additionner ou soustraire : le même dénominateur d\'abord',
      texte:
        'On met les fractions au **même dénominateur**, puis on additionne **les numérateurs seulement** :\n'
        + '1/3 + 1/6 = 2/6 + 1/6 = 3/6 = **1/2**.',
    },
    {
      type: 'propriete',
      titre: 'Multiplier : en haut ensemble, en bas ensemble',
      texte: 'Numérateur × numérateur, dénominateur × dénominateur : 2/3 × 4/5 = **8/15**.',
    },
    {
      type: 'propriete',
      titre: 'Diviser : multiplier par l\'inverse',
      texte: 'Diviser par une fraction, c\'est **multiplier par son inverse** : 2/5 ÷ 3/4 = 2/5 × 4/3 = **8/15**.',
    },
    {
      type: 'propriete',
      titre: 'Simplifier',
      texte:
        'On divise le numérateur et le dénominateur **par un même nombre**, jusqu\'à ce qu\'on ne puisse '
        + 'plus : 12/20 = **3/5** (÷ 4).',
    },
  ],

  methode: {
    titre: 'Transformer d\'abord, calculer ensuite',
    enonce: 'Calculer 1/6 + 2/3, puis 3/4 ÷ 5/8.',
    etapes: [
      { texte: '1/6 + 2/3 : je mets au même dénominateur, 2/3 = 4/6. Donc 1/6 + 4/6 = 5/6.', note: 'Seuls les numérateurs s\'additionnent.' },
      { texte: '3/4 ÷ 5/8 : je retourne la deuxième fraction, 3/4 × 8/5 = 24/20.', note: '' },
      { texte: 'Je simplifie : 24/20 = 6/5 (÷ 4).', note: 'Toujours jusqu\'au bout.' },
    ],
    controle:
      'Le contrôle : diviser par 5/8, plus petit que 1, doit agrandir — 6/5 est bien plus grand que '
      + '3/4. Et 5/6 est plus grand que 2/3 : une somme dépasse chacun de ses termes.',
  },

  entrainement: [
    // ── Palier 1 : même dénominateur, puis un dénominateur à changer ───────
    {
      // NEUTRE : les dénominateurs sont déjà les mêmes, rien à transformer.
      id: 'e-2-5-1', type: 'fraction', palier: 1, neutre: true, piege: 'cm-fraction-addition',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{2}{7} + \\dfrac{3}{7}', attendu: [5, 7],
      fausses: [{ valeur: '5/14', piege: 'cm-fraction-addition' }],
    },
    {
      id: 'e-2-5-2', type: 'fraction', palier: 1, piege: 'cm-fraction-addition',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{1}{5} + \\dfrac{3}{10}', attendu: [1, 2],
      fausses: [{ valeur: '4/15', piege: 'cm-fraction-addition' }, { valeur: '5/10', piege: 'cm-fraction-non-simplifiee' }],
    },
    {
      id: 'e-2-5-3', type: 'fraction', palier: 1, piege: 'cm-fraction-non-simplifiee',
      consigne: 'Simplifie au maximum.', enonce: '\\dfrac{20}{24}', attendu: [5, 6],
      fausses: [{ valeur: '10/12', piege: 'cm-fraction-non-simplifiee' }],
    },
    // ── Palier 2 : la division, la soustraction ────────────────────────────
    {
      id: 'e-2-5-4', type: 'fraction', palier: 2, piege: 'cm-fraction-division',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{1}{3} \\div \\dfrac{5}{6}', attendu: [2, 5],
      fausses: [{ valeur: '5/18', piege: 'cm-fraction-division' }, { valeur: '6/15', piege: 'cm-fraction-non-simplifiee' }],
    },
    {
      id: 'e-2-5-5', type: 'fraction', palier: 2, piege: 'cm-fraction-addition',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{3}{8} + \\dfrac{1}{4}', attendu: [5, 8],
      fausses: [{ valeur: '4/12', piege: 'cm-fraction-addition' }, { valeur: '1/3', piege: 'cm-fraction-addition' }],
    },
    {
      id: 'e-2-5-6', type: 'fraction', palier: 2, piege: 'cm-fraction-addition',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{5}{6} - \\dfrac{1}{3}', attendu: [1, 2],
      fausses: [{ valeur: '4/3', piege: 'cm-fraction-addition' }, { valeur: '3/6', piege: 'cm-fraction-non-simplifiee' }],
    },
    {
      id: 'e-2-5-7', type: 'fraction', palier: 2, piege: 'cm-fraction-non-simplifiee',
      consigne: 'Simplifie au maximum.', enonce: '\\dfrac{14}{21}', attendu: [2, 3],
    },
    // ── Palier 3 : tout ensemble ───────────────────────────────────────────
    {
      id: 'e-2-5-8', type: 'fraction', palier: 3, piege: 'cm-fraction-division',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{3}{5} \\div \\dfrac{9}{10}', attendu: [2, 3],
      fausses: [{ valeur: '27/50', piege: 'cm-fraction-division' }, { valeur: '30/45', piege: 'cm-fraction-non-simplifiee' }],
    },
    {
      // NEUTRE : un produit, qui se fait tout droit — rien à retourner.
      id: 'e-2-5-9', type: 'fraction', palier: 3, neutre: true, piege: 'cm-fraction-division',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{2}{3} \\times \\dfrac{5}{7}', attendu: [10, 21],
    },
    {
      id: 'e-2-5-10', type: 'fraction', palier: 3, piege: 'cm-fraction-division',
      consigne: 'Calcule et simplifie.', enonce: '\\dfrac{2}{3} \\div 2', attendu: [1, 3],
      fausses: [{ valeur: '4/3', piege: 'cm-fraction-division' }],
    },
  ],

  // Les fractions de l'interrogation, dont les trois blancs, puis des voisines.
  test: [
    { id: 't-2-5-1', type: 'fraction', consigne: 'Calcule et simplifie.', enonce: '\\dfrac{1}{4} + \\dfrac{3}{12}', attendu: [1, 2], fausses: [{ valeur: '4/16', piege: 'cm-fraction-addition' }, { valeur: '1/4', piege: 'cm-fraction-addition' }, { valeur: '6/12', piege: 'cm-fraction-non-simplifiee' }], revoir: 'propriete' },
    { id: 't-2-5-2', type: 'fraction', consigne: 'Calcule et simplifie.', enonce: '\\dfrac{1}{2} \\div \\dfrac{7}{9}', attendu: [9, 14], fausses: [{ valeur: '7/18', piege: 'cm-fraction-division' }, { valeur: '14/9', piege: 'cm-fraction-division' }], revoir: 'propriete' },
    { id: 't-2-5-3', type: 'fraction', consigne: 'Simplifie au maximum.', enonce: '\\dfrac{16}{18}', attendu: [8, 9], revoir: 'propriete' },
    { id: 't-2-5-4', type: 'fraction', consigne: 'Calcule et simplifie.', enonce: '\\dfrac{2}{6} + \\dfrac{3}{6}', attendu: [5, 6], fausses: [{ valeur: '5/12', piege: 'cm-fraction-addition' }], revoir: 'propriete' },
    { id: 't-2-5-5', type: 'fraction', consigne: 'Calcule et simplifie.', enonce: '\\dfrac{3}{4} \\times \\dfrac{3}{5}', attendu: [9, 20], revoir: 'propriete' },
    { id: 't-2-5-6', type: 'calcul', consigne: 'Calcule de tête.', enonce: '\\dfrac{1}{4} \\times 4', attendu: 1, revoir: 'propriete' },
    { id: 't-2-5-7', type: 'fraction', consigne: 'Calcule et simplifie.', enonce: '\\dfrac{2}{5} + \\dfrac{1}{10}', attendu: [1, 2], fausses: [{ valeur: '3/15', piege: 'cm-fraction-addition' }, { valeur: '5/10', piege: 'cm-fraction-non-simplifiee' }], revoir: 'propriete' },
    { id: 't-2-5-8', type: 'fraction', consigne: 'Calcule et simplifie.', enonce: '\\dfrac{3}{4} \\div \\dfrac{1}{2}', attendu: [3, 2], fausses: [{ valeur: '3/8', piege: 'cm-fraction-division' }, { valeur: '6/4', piege: 'cm-fraction-non-simplifiee' }], revoir: 'propriete' },
    { id: 't-2-5-9', type: 'fraction', consigne: 'Simplifie au maximum.', enonce: '\\dfrac{12}{30}', attendu: [2, 5], fausses: [{ valeur: '6/15', piege: 'cm-fraction-non-simplifiee' }], revoir: 'propriete' },
    { id: 't-2-5-10', type: 'fraction', consigne: 'Calcule et simplifie.', enonce: '\\dfrac{5}{8} - \\dfrac{1}{4}', attendu: [3, 8], fausses: [{ valeur: '4/4', piege: 'cm-fraction-addition' }], revoir: 'propriete' },
  ],
};
