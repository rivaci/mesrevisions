// Animer une phrase pour montrer ce qu'un texte n'arrive pas à faire voir.
//
// ── Pourquoi ──────────────────────────────────────────────────────────────
//
// Antonin l'a dit lui-même à Merlin : « j'ai du mal à voir les liens entre les
// différents composants de la phrase ». Une leçon écrite décrit ces liens ; une
// animation les MONTRE — la question « qui est-ce qui ? » qui part du verbe et
// cherche son sujet, l'écran qui s'intercale et détourne l'accord.
//
// ── Pourquoi pas une vidéo ────────────────────────────────────────────────
//
// Quarante leçons en fichiers vidéo, c'est des dizaines de mégaoctets dans un
// dépôt qui tient sur une disquette, la data du téléphone qui fond, le
// chargement instantané perdu, le hors-ligne perdu — et un réexport complet à
// chaque correction de contenu. Ici l'animation est une DONNÉE : quelques
// lignes décrivent la phrase et les étapes, le navigateur dessine.
//
// ── La même règle que le reste ────────────────────────────────────────────
//
// Merlin peut proposer une animation sur la phrase que l'élève vient de rater.
// Il n'écrit donc JAMAIS de SVG : il renvoie les données du script, et c'est ce
// fichier qui dessine, avec des attributs qu'il contrôle entièrement. Un indice
// hors bornes est ignoré en silence : une donnée bancale ne casse pas la page.
//
// ── Format d'un script ────────────────────────────────────────────────────
//
//   { mots: ['Le','panier','des','chats','est','renversé'],
//     scenes: [
//       { type: 'dire',        texte: 'D\'abord, le verbe.' },
//       { type: 'surligner',   mots: [4], role: 'verbe' },
//       { type: 'fausse-piste', mot: 3, texte: 'les chats ? Non.' },
//       { type: 'fleche',      de: 1, vers: 4, label: 'sujet' },
//     ] }

const TYPES = new Set(['dire', 'surligner', 'fausse-piste', 'fleche', 'terminaison']);
const ROLES = new Set(['sujet', 'verbe', 'ecran', 'accord']);

/**
 * Valide et nettoie un script. Pure : testable sans navigateur.
 *
 * Renvoie toujours un script jouable — les scènes incohérentes sont retirées
 * plutôt que de faire échouer l'ensemble, parce qu'un script vient parfois d'un
 * modèle de langage.
 */
export function normaliserScript(brut) {
  const mots = Array.isArray(brut?.mots) ? brut.mots.map(String) : [];
  if (!mots.length) return { mots: [], scenes: [] };

  const dansLaPhrase = (i) => Number.isInteger(i) && i >= 0 && i < mots.length;

  const scenes = (Array.isArray(brut?.scenes) ? brut.scenes : []).flatMap((s) => {
    if (!TYPES.has(s?.type)) return [];
    if (s.type === 'dire') return s.texte ? [{ type: 'dire', texte: String(s.texte) }] : [];

    if (s.type === 'surligner') {
      const cibles = (Array.isArray(s.mots) ? s.mots : []).filter(dansLaPhrase);
      if (!cibles.length) return [];
      return [{ type: 'surligner', mots: cibles, role: ROLES.has(s.role) ? s.role : 'sujet', texte: s.texte ? String(s.texte) : '' }];
    }

    if (s.type === 'fausse-piste') {
      return dansLaPhrase(s.mot) ? [{ type: 'fausse-piste', mot: s.mot, texte: s.texte ? String(s.texte) : '' }] : [];
    }

    if (s.type === 'fleche') {
      if (!dansLaPhrase(s.de) || !dansLaPhrase(s.vers) || s.de === s.vers) return [];
      return [{ type: 'fleche', de: s.de, vers: s.vers, label: s.label ? String(s.label) : '', texte: s.texte ? String(s.texte) : '' }];
    }

    // terminaison : la fin du mot qui change quand le sujet change de nombre
    if (!dansLaPhrase(s.mot) || !s.devient) return [];
    return [{ type: 'terminaison', mot: s.mot, devient: String(s.devient), texte: s.texte ? String(s.texte) : '' }];
  });

  return { mots, scenes };
}

// --- Rendu ------------------------------------------------------------------

const SVG = 'http://www.w3.org/2000/svg';
const noeud = (nom, attrs = {}) => {
  const el = document.createElementNS(SVG, nom);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
};

// Une scène dure le temps de LIRE son texte — un enfant de douze ans lit
// l'écran, il ne le photographie pas. Plancher pour les scènes muettes, et
// soixante millisecondes par caractère au-delà.
const DUREE_MINIMALE = 2200;
const dureeScene = (s) =>
  Math.max(DUREE_MINIMALE, 1400 + (s.texte ? s.texte.length * 60 : 0));
const H = 38;
const GAP = 10;
const MARGE = 14;
const HAUT_ARC = 46;
const CRAN_ARC = 26; // chaque flèche supplémentaire monte d'un cran, étiquette comprise

const reduitLeMouvement = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Monte une animation dans `conteneur`.
 *
 * Rejouable, et jamais automatique en boucle : une animation qui tourne en
 * fond pendant qu'on lit, c'est du bruit. Quand le système demande moins de
 * mouvement, on affiche directement l'état final — l'information reste,
 * l'agitation disparaît.
 */
export function animerPhrase(conteneur, scriptBrut) {
  const script = normaliserScript(scriptBrut);
  if (!script.mots.length) return { arreter() {} };

  const { mots, scenes } = script;
  const largeurs = mots.map((m) => Math.max(34, m.length * 9.5 + 18));
  const x = [];
  let curseur = MARGE;
  for (const w of largeurs) { x.push(curseur); curseur += w + GAP; }
  const largeurTotale = curseur - GAP + MARGE;
  // Les flèches s'accumulent dans une scène : chacune monte d'un cran au-dessus
  // de la précédente, étiquette comprise — sinon deux libellés aux milieux
  // proches s'écrivent l'un sur l'autre. On réserve la hauteur du pire cas.
  const nbFleches = scenes.filter((s) => s.type === 'fleche').length;
  const yMot = MARGE + HAUT_ARC + Math.max(0, nbFleches - 1) * CRAN_ARC;
  const hauteur = yMot + H + MARGE;
  const centre = (i) => x[i] + largeurs[i] / 2;

  const bloc = document.createElement('div');
  bloc.className = 'anim';
  const svg = noeud('svg', {
    viewBox: `0 0 ${largeurTotale} ${hauteur}`, class: 'anim-scene',
    role: 'img', 'aria-label': `Animation : ${mots.join(' ')}`,
  });

  // Les mots, posés une fois pour toutes ; seules leurs classes changent.
  const cases = [];
  const etiquettes = [];
  mots.forEach((mot, i) => {
    const rect = noeud('rect', { x: x[i], y: yMot, width: largeurs[i], height: H, rx: 7, class: 'anim-mot' });
    const texte = noeud('text', { x: centre(i), y: yMot + H / 2 + 5, 'text-anchor': 'middle', class: 'anim-mot-texte' });
    texte.textContent = mot;
    svg.append(rect, texte);
    cases.push(rect);
    etiquettes.push(texte);
  });

  const couche = noeud('g', { class: 'anim-couche' }); // arcs et croix, effacés entre les scènes
  svg.append(couche);

  // Le fil des explications. Chaque scène AJOUTE sa ligne, les précédentes
  // restent lisibles en retrait : une leçon se relit, elle ne s'efface pas au
  // fur et à mesure qu'on la donne.
  const legende = document.createElement('div');
  legende.className = 'anim-legende';
  legende.setAttribute('role', 'status');

  const direLigne = (texte) => {
    if (!texte) return;
    legende.querySelector('.est-courante')?.classList.remove('est-courante');
    const ligne = document.createElement('p');
    ligne.className = 'anim-ligne est-courante';
    ligne.textContent = texte;
    legende.append(ligne);
  };

  const rejouer = document.createElement('button');
  rejouer.type = 'button';
  rejouer.className = 'anim-rejouer';
  rejouer.textContent = '↻ Revoir';

  bloc.append(svg, legende, rejouer);
  conteneur.append(bloc);

  // --- Déroulé ---
  let minuterie = null;
  let arrete = false;

  const nettoyer = () => {
    couche.replaceChildren();
    legende.replaceChildren();
    for (const c of cases) c.setAttribute('class', 'anim-mot');
    for (const t of etiquettes) {
      t.setAttribute('class', 'anim-mot-texte');
    }
    mots.forEach((mot, i) => { etiquettes[i].textContent = mot; });
  };

  const jouerScene = (s) => {
    direLigne(s.texte);

    if (s.type === 'dire') return;

    if (s.type === 'surligner') {
      for (const i of s.mots) cases[i].setAttribute('class', `anim-mot est-${s.role}`);
      return;
    }

    if (s.type === 'fausse-piste') {
      cases[s.mot].setAttribute('class', 'anim-mot est-fausse-piste');
      const b = cases[s.mot];
      const x1 = Number(b.getAttribute('x'));
      const x2 = x1 + Number(b.getAttribute('width'));
      couche.append(noeud('line', { x1, y1: yMot, x2, y2: yMot + H, class: 'anim-barre' }));
      couche.append(noeud('line', { x1, y1: yMot + H, x2, y2: yMot, class: 'anim-barre' }));
      return;
    }

    if (s.type === 'fleche') {
      const mx = (centre(s.de) + centre(s.vers)) / 2;
      // Un cran plus haut que les flèches déjà à l'écran.
      const niveau = couche.querySelectorAll('.anim-arc').length;
      const apex = yMot - HAUT_ARC - niveau * CRAN_ARC;
      couche.append(noeud('path', {
        d: `M ${centre(s.de)} ${yMot} Q ${mx} ${apex} ${centre(s.vers)} ${yMot}`,
        class: 'anim-arc', fill: 'none',
      }));
      couche.append(noeud('circle', { cx: centre(s.vers), cy: yMot, r: 4, class: 'anim-pointe' }));
      if (s.label) {
        const t = noeud('text', { x: mx, y: apex + 4, 'text-anchor': 'middle', class: 'anim-arc-label' });
        t.textContent = s.label;
        couche.append(t);
      }
      return;
    }

    // terminaison : le mot se réécrit, la partie qui change est mise en avant
    etiquettes[s.mot].textContent = s.devient;
    cases[s.mot].setAttribute('class', 'anim-mot est-accord');
    etiquettes[s.mot].setAttribute('class', 'anim-mot-texte est-change');
  };

  const jouer = (depuis = 0) => {
    if (arrete || !bloc.isConnected) return;
    if (depuis === 0) nettoyer();
    const s = scenes[depuis];
    if (!s) { rejouer.hidden = false; return; }
    rejouer.hidden = true;
    jouerScene(s);
    minuterie = setTimeout(() => jouer(depuis + 1), dureeScene(s));
  };

  const toutMontrer = () => {
    nettoyer();
    for (const s of scenes) jouerScene(s);
    legende.querySelector('.est-courante')?.classList.remove('est-courante');
    rejouer.hidden = true;
  };

  rejouer.addEventListener('click', () => jouer(0));

  if (reduitLeMouvement()) toutMontrer();
  else jouer(0);

  return {
    arreter() {
      arrete = true;
      if (minuterie) clearTimeout(minuterie);
    },
  };
}
