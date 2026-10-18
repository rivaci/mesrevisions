// Chapitre 2, savoir-faire 2 — Les carrés, les cubes et les racines carrées à connaître.
//
// À l'interrogation, √169 a donné 36 : ni la moitié, ni un carré voisin — un
// carré pas su. Une racine carrée ne se calcule pas de tête, elle se
// RECONNAÎT : il faut avoir les carrés de 1 à 15 en mémoire. D'où un cours qui
// les donne en entier, et des exercices qui les font fonctionner dans les deux
// sens (13² et √169), avec l'autre erreur classique : 13² lu 13 × 2.

export default {
  id: 'sf-2-2',
  titre: 'Les carrés, les cubes et les racines carrées à connaître',
  attendus: [
    'Il connaît les carrés des entiers de 1 à 15 et les cubes de 2, 3 et 10.',
    'Il donne de tête la racine carrée d\'un carré parfait.',
  ],

  cours: [
    {
      type: 'definition',
      titre: 'Le carré et le cube',
      texte:
        'Le **carré** d\'un nombre, c\'est ce nombre multiplié par lui-même : a² = a × a. Le **cube** : '
        + 'a³ = a × a × a.\n'
        + '7² = 7 × 7 = 49   ·   2³ = 2 × 2 × 2 = 8',
    },
    {
      type: 'definition',
      titre: 'La racine carrée',
      texte:
        'La **racine carrée** de b (b positif), notée √b, est le nombre **positif** dont le carré vaut b.\n'
        + '√81 = 9, car 9² = 81.',
    },
    {
      type: 'propriete',
      titre: 'Les carrés à savoir par cœur',
      texte:
        '1² = 1 · 2² = 4 · 3² = 9 · 4² = 16 · 5² = 25 · 6² = 36 · 7² = 49 · 8² = 64\n'
        + '9² = 81 · 10² = 100 · 11² = 121 · 12² = 144 · 13² = 169 · 14² = 196 · 15² = 225\n'
        + 'Et les cubes : 2³ = 8 · 3³ = 27 · 10³ = 1 000.',
    },
    {
      type: 'remarque',
      titre: 'Lire la table dans les deux sens',
      texte:
        'La même table donne les racines : si 12² = 144, alors √144 = 12. Pour une racine, on ne '
        + 'divise pas par 2 : on cherche le nombre qui, multiplié par lui-même, redonne le nombre.',
    },
  ],

  methode: {
    titre: 'Trouver une racine carrée de tête',
    enonce: 'Calculer √196.',
    etapes: [
      { texte: 'Je cherche le nombre dont le carré vaut 196.', note: 'Une racine se reconnaît dans la table des carrés.' },
      { texte: '13² = 169 : trop petit. 14² = 196 : c\'est lui.', note: '' },
      { texte: 'Donc √196 = 14.', note: '' },
    ],
    controle: 'Le contrôle : 14 × 14 = 140 + 56 = 196. Ta réponse multipliée par elle-même doit redonner le nombre.',
  },

  entrainement: [
    // ── Palier 1 : la table, dans les deux sens ────────────────────────────
    {
      id: 'e-2-2-1', type: 'calcul', palier: 1, piege: 'cm-carre-double',
      consigne: 'Calcule de tête.', enonce: '12^2', attendu: 144,
      fausses: [{ valeur: 24, piege: 'cm-carre-double' }],
    },
    {
      id: 'e-2-2-2', type: 'calcul', palier: 1, piege: 'cm-racine-carree',
      consigne: 'Calcule de tête.', enonce: '\\sqrt{64}', attendu: 8,
      fausses: [{ valeur: 32, piege: 'cm-racine-carree' }],
    },
    {
      // NEUTRE : 10², la puissance de 10 qu'on lit sans table.
      id: 'e-2-2-3', type: 'calcul', palier: 1, neutre: true, piege: 'cm-carre-double',
      consigne: 'Calcule de tête.', enonce: '10^2', attendu: 100,
    },
    {
      id: 'e-2-2-4', type: 'calcul', palier: 1, piege: 'cm-racine-carree',
      consigne: 'Calcule de tête.', enonce: '\\sqrt{121}', attendu: 11,
      fausses: [{ valeur: 60.5, piege: 'cm-racine-carree' }],
    },
    // ── Palier 2 : le haut de la table ─────────────────────────────────────
    {
      id: 'e-2-2-5', type: 'calcul', palier: 2, piege: 'cm-carre-double',
      consigne: 'Calcule de tête.', enonce: '13^2', attendu: 169,
      fausses: [{ valeur: 26, piege: 'cm-carre-double' }],
    },
    {
      id: 'e-2-2-6', type: 'calcul', palier: 2, piege: 'cm-racine-carree',
      consigne: 'Calcule de tête.', enonce: '\\sqrt{225}', attendu: 15,
      fausses: [{ valeur: 112.5, piege: 'cm-racine-carree' }],
    },
    {
      id: 'e-2-2-7', type: 'calcul', palier: 2, piege: 'cm-carre-double',
      consigne: 'Calcule de tête.', enonce: '4^3', attendu: 64,
      fausses: [{ valeur: 12, piege: 'cm-carre-double' }, { valeur: 16, piege: 'cm-carre-double' }],
    },
    {
      id: 'e-2-2-8', type: 'calcul', palier: 2, piege: 'cm-racine-carree',
      consigne: 'Calcule de tête.', enonce: '\\sqrt{144}', attendu: 12,
      fausses: [{ valeur: 72, piege: 'cm-racine-carree' }],
    },
    // ── Palier 3 : mêlés, et un calcul autour ──────────────────────────────
    {
      id: 'e-2-2-9', type: 'calcul', palier: 3, piege: 'cm-carre-double',
      consigne: 'Calcule de tête.', enonce: '15^2', attendu: 225,
      fausses: [{ valeur: 30, piege: 'cm-carre-double' }],
    },
    {
      id: 'e-2-2-10', type: 'calcul', palier: 3, piege: 'cm-racine-carree',
      consigne: 'Calcule de tête.', enonce: '\\sqrt{49} + \\sqrt{36}', attendu: 13,
      fausses: [{ valeur: 42.5, piege: 'cm-racine-carree' }],
    },
  ],

  test: [
    {
      id: 't-2-2-1', type: 'calcul', consigne: 'Calcule de tête.', enonce: '\\sqrt{169}', attendu: 13,
      fausses: [{ valeur: 84.5, piege: 'cm-racine-carree' }, { valeur: 36, piege: 'cm-racine-carree' }], revoir: 'propriete',
    },
    { id: 't-2-2-2', type: 'calcul', consigne: 'Calcule de tête.', enonce: '5^2', attendu: 25, fausses: [{ valeur: 10, piege: 'cm-carre-double' }], revoir: 'definition' },
    { id: 't-2-2-3', type: 'calcul', consigne: 'Calcule de tête.', enonce: '3^3', attendu: 27, fausses: [{ valeur: 9, piege: 'cm-carre-double' }], revoir: 'definition' },
    { id: 't-2-2-4', type: 'calcul', consigne: 'Calcule de tête.', enonce: '\\sqrt{81}', attendu: 9, fausses: [{ valeur: 40.5, piege: 'cm-racine-carree' }], revoir: 'definition' },
    { id: 't-2-2-5', type: 'calcul', consigne: 'Calcule de tête.', enonce: '14^2', attendu: 196, fausses: [{ valeur: 28, piege: 'cm-carre-double' }], revoir: 'propriete' },
    { id: 't-2-2-6', type: 'calcul', consigne: 'Calcule de tête.', enonce: '\\sqrt{25}', attendu: 5, fausses: [{ valeur: 12.5, piege: 'cm-racine-carree' }], revoir: 'propriete' },
    { id: 't-2-2-7', type: 'calcul', consigne: 'Calcule de tête.', enonce: '10^3', attendu: 1000, fausses: [{ valeur: 30, piege: 'cm-carre-double' }], revoir: 'propriete' },
    { id: 't-2-2-8', type: 'calcul', consigne: 'Calcule de tête.', enonce: '11^2', attendu: 121, fausses: [{ valeur: 22, piege: 'cm-carre-double' }], revoir: 'propriete' },
    { id: 't-2-2-9', type: 'calcul', consigne: 'Calcule de tête.', enonce: '\\sqrt{100}', attendu: 10, fausses: [{ valeur: 50, piege: 'cm-racine-carree' }], revoir: 'definition' },
    { id: 't-2-2-10', type: 'calcul', consigne: 'Calcule de tête.', enonce: '2^3', attendu: 8, fausses: [{ valeur: 6, piege: 'cm-carre-double' }], revoir: 'definition' },
  ],
};
