// Cartes interactives.
//
// Construit une carte SVG cliquable à partir des tracés produits par
// tools/build-maps.mjs. C'est ce que la fiche papier ne peut pas offrir :
// l'élève place lui-même les régions au lieu de regarder une image.

const SVG = 'http://www.w3.org/2000/svg';

const cache = new Map();

/** Charge un jeu de tracés (france ou europe). Le résultat est mémorisé. */
export async function chargerCarte(nom) {
  if (!cache.has(nom)) {
    cache.set(
      nom,
      fetch(`assets/maps/${nom}.json`).then((r) => {
        if (!r.ok) throw new Error(`Carte « ${nom} » introuvable (${r.status})`);
        return r.json();
      }),
    );
  }
  return cache.get(nom);
}

const creer = (balise, attributs = {}) => {
  const el = document.createElementNS(SVG, balise);
  for (const [cle, valeur] of Object.entries(attributs)) el.setAttribute(cle, valeur);
  return el;
};

/**
 * Zone de clic ajoutée aux tracés minuscules, en unités SVG.
 *
 * Le Luxembourg, Chypre, la Slovénie et Malte mesurent 6 à 14 px à l'écran sur
 * un téléphone : impossible à viser au doigt. On leur superpose un disque
 * invisible plus large.
 *
 * Ce renfort n'est posé que sur la zone effectivement demandée. Permanent, il
 * recouvrirait ses voisins et leur volerait des clics : on désignerait la
 * Belgique et le Luxembourg répondrait à sa place.
 */
const RAYON_RENFORT = 34;
const AIRE_MINI = 900;

/**
 * Dessine une carte et renvoie de quoi la piloter.
 *
 *   couche : 'regions' | 'fleuves' | 'massifs' | 'mers' | 'pays' | 'drom'
 *   surClic(id)     : appelé quand l'élève désigne une zone
 *   cibleRenforcee  : id de la zone attendue, à agrandir si elle est minuscule
 */
export function dessinerCarte(donnees, couche, { surClic, cibleRenforcee } = {}) {
  if (couche === 'drom') return dessinerVignettesDrom(donnees, { surClic });

  const svg = creer('svg', {
    viewBox: donnees.viewBox,
    class: 'carte',
    role: 'group',
    'aria-label': 'Carte interactive',
  });

  // Décor : pays voisins, non cliquables. Ils donnent les repères sans
  // lesquels l'élève reconnaîtrait les formes par simple élimination.
  if (donnees.decor) {
    svg.append(creer('path', { d: donnees.decor, class: 'carte-decor' }));
  }

  // Le fond du pays reste visible sous toutes les couches : c'est le repère
  // principal quand on cherche un fleuve ou un massif.
  const fond = creer('g', { class: 'carte-fond' });
  for (const zone of zonesDeFond(donnees)) {
    fond.append(creer('path', { d: zone.d }));
  }
  svg.append(fond);

  // Les massifs débordent volontairement de la France : on les détoure par la
  // silhouette du pays plutôt que d'épouser le littoral point par point.
  if (couche === 'massifs') svg.append(silhouette(donnees));

  const groupe = creer('g', {
    class: `carte-cibles carte-cibles--${couche}`,
    ...(couche === 'massifs' ? { 'clip-path': 'url(#silhouette-france)' } : {}),
  });

  const cibles = new Map();
  for (const zone of donnees[couche] ?? []) {
    const forme = formeDe(couche, zone);
    forme.setAttribute('class', 'carte-cible');
    forme.dataset.id = zone.id;
    // Pas de <title> : l'infobulle du navigateur donnerait la réponse au survol.
    groupe.append(forme);
    cibles.set(zone.id, [forme]);
  }

  // Marqueurs : pour les États trop petits pour être dessinés à cette échelle.
  for (const marqueur of couche === 'pays' ? donnees.marqueurs ?? [] : []) {
    const point = creer('circle', { cx: marqueur.x, cy: marqueur.y, r: 7 });
    point.setAttribute('class', 'carte-cible carte-cible--marqueur');
    point.dataset.id = marqueur.id;
    groupe.append(point);
    cibles.set(marqueur.id, [point]);
  }

  // Renfort de clic, posé en dernier pour passer devant les tracés voisins.
  const aRenforcer = renfortNecessaire(donnees, couche, cibleRenforcee);
  if (aRenforcer) {
    const renfort = creer('circle', {
      cx: aRenforcer.cx ?? aRenforcer.x,
      cy: aRenforcer.cy ?? aRenforcer.y,
      r: RAYON_RENFORT,
    });
    renfort.setAttribute('class', 'carte-renfort');
    renfort.dataset.id = aRenforcer.id;
    groupe.append(renfort);
    cibles.get(aRenforcer.id)?.push(renfort);
  }

  svg.append(groupe);

  if (surClic) {
    svg.addEventListener('click', (evenement) => {
      const cible = evenement.target.closest('[data-id]');
      if (cible) surClic(cible.dataset.id);
    });
  }

  return { element: svg, ...pilotage(cibles, donnees, couche) };
}

/** Fond affiché sous la couche interrogée. */
function zonesDeFond(donnees) {
  return donnees.regions ?? donnees.pays ?? [];
}

/** La zone attendue mérite-t-elle un renfort de clic ? Renvoie la zone, ou null. */
function renfortNecessaire(donnees, couche, cibleRenforcee) {
  if (!cibleRenforcee) return null;

  // Un marqueur est déjà un point de 7 unités : toujours trop petit.
  const marqueur = (couche === 'pays' ? donnees.marqueurs ?? [] : [])
    .find((m) => m.id === cibleRenforcee);
  if (marqueur) return marqueur;

  const zone = (donnees[couche] ?? []).find((z) => z.id === cibleRenforcee);
  return zone && zone.aire !== undefined && zone.aire < AIRE_MINI ? zone : null;
}

function silhouette(donnees) {
  const defs = creer('defs');
  const clip = creer('clipPath', { id: 'silhouette-france' });
  for (const region of donnees.regions) clip.append(creer('path', { d: region.d }));
  defs.append(clip);
  return defs;
}

function formeDe(couche, zone) {
  if (couche === 'mers') return creer('circle', { cx: zone.x, cy: zone.y, r: zone.r });
  return creer('path', { d: zone.d });
}

/** Les DROM sont présentés côte à côte, chacun dans sa vignette, comme sur les
 *  cartes scolaires : leurs échelles réelles sont trop différentes. */
function dessinerVignettesDrom(donnees, { surClic }) {
  const conteneur = document.createElement('div');
  conteneur.className = 'vignettes';

  const cibles = new Map();
  for (const drom of donnees.drom) {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'vignette carte-cible';
    bouton.dataset.id = drom.id;

    const svg = creer('svg', { viewBox: drom.viewBox, class: 'vignette-carte' });
    svg.append(creer('path', { d: drom.d }));
    bouton.append(svg);
    conteneur.append(bouton);
    cibles.set(drom.id, [bouton]);
  }

  if (surClic) {
    conteneur.addEventListener('click', (evenement) => {
      const cible = evenement.target.closest('[data-id]');
      if (cible) surClic(cible.dataset.id);
    });
  }

  return { element: conteneur, ...pilotage(cibles, donnees, 'drom') };
}

/** Méthodes communes à toutes les cartes. */
function pilotage(cibles, donnees, couche) {
  const elementsDe = (id) => cibles.get(id) ?? [];
  const toutes = () => [...cibles.values()].flat();

  const marquer = (id, classe) => elementsDe(id).forEach((el) => el.classList.add(classe));

  return {
    /** Signale la zone désignée comme juste ou fausse. */
    marquerReponse(id, correct) {
      marquer(id, correct ? 'est-juste' : 'est-faux');
    },
    /** Montre la bonne réponse quand l'élève s'est trompé. */
    revelerCible(id) {
      marquer(id, 'est-attendu');
    },
    /** Met en valeur une zone pour demander « qu'est-ce que c'est ? ». */
    designer(id) {
      marquer(id, 'est-designe');
    },
    /** Empêche toute nouvelle réponse une fois la question tranchée. */
    figer() {
      toutes().forEach((el) => el.classList.add('est-fige'));
    },
    nomDe(id) {
      return (donnees[couche] ?? []).concat(donnees.marqueurs ?? []).find((z) => z.id === id)?.nom ?? id;
    },
  };
}
