// La progression d'Evan en SVT, dans le stockage du navigateur.
//
// Écrite à CHAQUE premier essai, pas en fin d'étape : un tour quitté au milieu
// garde ce qu'il a appris sur lui — c'est justement ce qui doit revenir dans
// « À revoir ». Les fonctions qui changent le profil sont pures ; seules
// `charger` et `sauver` touchent au stockage.

const CLE = 'svt3e.progres.v1';

export const profilVierge = () => ({ items: {}, etapes: {}, interros: [] });

export function charger() {
  try {
    const lu = JSON.parse(localStorage.getItem(CLE));
    if (lu) return { ...profilVierge(), ...lu };
  } catch { /* stockage refusé ou illisible : on repart de zéro */ }
  return profilVierge();
}

export function sauver(profil) {
  try { localStorage.setItem(CLE, JSON.stringify(profil)); } catch { /* ignoré : l'appli reste jouable */ }
}

/**
 * Le premier essai d'une question dans un tour. Un mot n'est plus « à revoir »
 * que lorsqu'il est réussi du premier coup lors d'un tour suivant.
 */
export function noterEssai(profil, id, resultat) {
  const avant = profil.items[id] ?? { vus: 0, justes: 0 };
  return {
    ...profil,
    items: {
      ...profil.items,
      [id]: {
        vus: avant.vus + 1,
        justes: avant.justes + (resultat === 'juste' ? 1 : 0),
        dernier: resultat,
        aRevoir: resultat !== 'juste',
      },
    },
  };
}

export function terminerEtape(profil, etapeId, { justes, presque, faux }, date = new Date().toISOString()) {
  return { ...profil, etapes: { ...profil.etapes, [etapeId]: { faite: true, date, justes, presque, faux } } };
}

export function noterInterro(profil, uniteId, { points, sur }, date = new Date().toISOString()) {
  return { ...profil, interros: [...profil.interros, { uniteId, date, points, sur }] };
}

/** Ce qui reste à revoir dans une unité : ce qui n'a pas été réussi du premier coup. */
export const aRevoir = (profil, items) =>
  items.filter((i) => i.type !== 'decrire' && profil.items[i.id]?.aRevoir);

export const derniereInterro = (profil, uniteId) =>
  [...profil.interros].reverse().find((n) => n.uniteId === uniteId) ?? null;
