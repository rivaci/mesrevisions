// La série chronométrée de calcul mental — le format de l'interrogation.
//
// L'interrogation d'Evan : 40 calculs mêlés, notés sur 20, un demi-point par
// calcul. Neuf cases sont restées vides, dont des calculs faciles : il manque
// de la vitesse autant que des règles. La série le remet dans ce format, avec
// le chronomètre sous les yeux, et la correction à la fin.
//
// Le tirage pioche dans « S'entraîner » et « Se tester » du chapitre 2, dans
// les proportions de l'interrogation : beaucoup de calculs sur les entiers, et
// toutes les familles où il a perdu des points.

export const SERIE = {
  id: 'serie-cm',
  titre: 'Série chronométrée',
  sousTitre: '40 calculs mêlés, comme l\'interrogation',
  bareme: 20,
  tirage: [
    { sf: 'sf-2-1', nombre: 8 },  // décimaux
    { sf: 'sf-2-2', nombre: 4 },  // carrés et racines
    { sf: 'sf-2-3', nombre: 6 },  // nombre manquant
    { sf: 'sf-2-4', nombre: 10 }, // entiers
    { sf: 'sf-2-5', nombre: 6 },  // fractions
    { sf: 'sf-2-6', nombre: 6 },  // relatifs
  ],
};
