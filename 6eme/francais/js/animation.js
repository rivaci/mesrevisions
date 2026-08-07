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

// --- Vitesse de lecture, commune à toutes les animations ---------------------
//
// Une préférence de confort, pas un réglage par leçon : l'élève qui lit vite
// lit vite partout. La clé est volontairement SANS préfixe d'appli, comme la
// mémoire transversale — les animations des autres matières la partageront.

export const VITESSES = [
  { id: 'lente', libelle: '🐢 lent', facteur: 1.4 },
  { id: 'normale', libelle: '▶ normal', facteur: 1 },
  { id: 'rapide', libelle: '🐇 rapide', facteur: 0.65 },
];

const CLE_VITESSE = 'eleve.animation-vitesse.v1';

export function lireVitesse() {
  try {
    const id = localStorage.getItem(CLE_VITESSE);
    return VITESSES.find((v) => v.id === id) ?? VITESSES[1];
  } catch {
    return VITESSES[1];
  }
}

export function definirVitesse(id) {
  try { localStorage.setItem(CLE_VITESSE, id); } catch { /* stockage refusé : la préférence ne tient pas */ }
}

// --- Voix -------------------------------------------------------------------
//
// La synthèse du navigateur, la même que celle des dictées : gratuite, hors
// ligne, rien n'est envoyé nulle part. VOLONTAIREMENT désactivée par défaut —
// une page qui se met à parler sans qu'on le lui ait demandé, non. Une fois
// activée, la préférence vaut pour toutes les animations, comme la vitesse.
//
// Quand la voix est active, c'est ELLE qui donne le tempo : la scène suivante
// part quand la phrase finit d'être dite, pas quand un chronomètre le décide.

const CLE_VOIX = 'eleve.animation-voix.v1';

export const voixDisponible = () => typeof speechSynthesis !== 'undefined';

export function lireVoix() {
  try { return localStorage.getItem(CLE_VOIX) === 'oui'; } catch { return false; }
}

export function definirVoix(active) {
  try { localStorage.setItem(CLE_VOIX, active ? 'oui' : 'non'); } catch { /* ignoré */ }
}

// La vitesse de lecture vaut aussi pour la voix : lent parle plus lentement.
const RATES = { lente: 0.85, normale: 1, rapide: 1.15 };

// Sur certains navigateurs, getVoices() est vide tant que la liste n'est pas
// chargée : on la réclame tôt et on écoute son arrivée, pour que la première
// phrase profite déjà de la bonne voix.
if (voixDisponible()) {
  speechSynthesis.getVoices();
  speechSynthesis.addEventListener?.('voiceschanged', () => speechSynthesis.getVoices());
}

/**
 * La meilleure voix française disponible — pas la première venue.
 *
 * La qualité varie du simple au triple derrière la même API : Edge expose des
 * voix neuronales (« … Online (Natural) »), Chrome a « Google français », iOS
 * ses voix « enhanced ». La voix par défaut de Windows, elle, est robotique —
 * c'est pourtant elle que prenait un simple find() sur la langue.
 */
const scoreVoix = (v) => {
  const nom = v.name.toLowerCase();
  let s = 0;
  if (nom.includes('natural')) s += 4;
  if (nom.includes('neural')) s += 4;
  if (nom.includes('google')) s += 3;
  if (nom.includes('premium') || nom.includes('enhanced') || nom.includes('siri')) s += 3;
  if (nom.includes('online')) s += 1;
  if (v.lang === 'fr-FR') s += 1;
  return s;
};

export function meilleureVoixFr(liste = speechSynthesis.getVoices()) {
  const francaises = liste.filter((v) => v.lang?.toLowerCase().startsWith('fr'));
  if (!francaises.length) return null;
  return [...francaises].sort((a, b) => scoreVoix(a) < scoreVoix(b) ? 1 : -1)[0];
}

/**
 * Vrai si l'appareil offre une voix française de qualité (neuronale ou
 * équivalente). Sinon, l'appli glisse un indice : sur Windows, ouvrir le même
 * site dans Edge suffit à passer d'une voix robotique à une voix naturelle —
 * encore faut-il le savoir.
 */
export function voixNaturelleDisponible(liste = speechSynthesis.getVoices()) {
  const meilleure = meilleureVoixFr(liste);
  return Boolean(meilleure && scoreVoix(meilleure) >= 3);
}

function direAVoixHaute(texte, surFin) {
  const message = new SpeechSynthesisUtterance(texte);
  message.lang = 'fr-FR';
  message.rate = RATES[lireVitesse().id] ?? 1;
  const voixFr = meilleureVoixFr();
  if (voixFr) message.voice = voixFr;
  let fini = false;
  const finir = () => { if (!fini) { fini = true; surFin?.(); } };
  message.onend = finir;
  message.onerror = finir;
  speechSynthesis.cancel();
  speechSynthesis.speak(message);
  return finir;
}

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
  // La case doit tenir la forme la plus longue que le mot prendra : une scène
  // « terminaison » réécrit son texte sur place, et « veulent » qui devient
  // « voulaient » débordait de son cadre.
  const plusLong = mots.map((m, i) => scenes
    .filter((s) => s.type === 'terminaison' && s.mot === i)
    .reduce((long, s) => (s.devient.length > long.length ? s.devient : long), m));
  const largeurs = plusLong.map((m) => Math.max(34, m.length * 9.5 + 18));
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

  // --- Les commandes : précédent, lecture/pause, suivant, vitesse -----------
  //
  // Une leçon se travaille au pas : on revient sur l'étape qu'on n'a pas
  // comprise, on avance quand on est prêt. L'avance et le recul mettent en
  // pause — celui qui appuie sur « étape suivante » a repris la main.

  const barre = document.createElement('div');
  barre.className = 'anim-controles';
  const fabriquerBouton = (classe, texte, aria) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = classe;
    b.textContent = texte;
    b.setAttribute('aria-label', aria);
    barre.append(b);
    return b;
  };
  const precedent = fabriquerBouton('anim-bouton', '⏮', 'Étape précédente');
  const lectureBtn = fabriquerBouton('anim-bouton anim-bouton--lecture', '⏸', 'Pause');
  const suivant = fabriquerBouton('anim-bouton', '⏭', 'Étape suivante');
  const voixBtn = fabriquerBouton('anim-bouton', lireVoix() ? '🔊' : '🔇', 'Lire les textes à voix haute');
  voixBtn.setAttribute('aria-pressed', String(lireVoix()));
  if (!voixDisponible()) voixBtn.hidden = true;
  const vitesseBtn = fabriquerBouton('anim-vitesse', lireVitesse().libelle, 'Vitesse de lecture');

  bloc.append(svg, legende, barre);
  conteneur.append(bloc);

  // --- Déroulé ---
  let minuterie = null;
  let arrete = false;
  let courante = -1;   // indice de la dernière scène appliquée
  let lecture = false;

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

  const derniere = scenes.length - 1;

  const majBoutons = () => {
    precedent.disabled = courante <= 0;
    suivant.disabled = courante >= derniere;
    const fini = courante >= derniere;
    lectureBtn.textContent = lecture ? '⏸' : (fini ? '↻' : '▶');
    lectureBtn.setAttribute('aria-label', lecture ? 'Pause' : (fini ? 'Revoir' : 'Lecture'));
  };

  const arreterMinuterie = () => {
    if (minuterie) { clearTimeout(minuterie); minuterie = null; }
    if (voixDisponible()) speechSynthesis.cancel();
  };

  const pause = () => { lecture = false; arreterMinuterie(); majBoutons(); };

  /** La ligne courante, dite à voix haute si la voix est active. */
  const direCourante = () => {
    const texte = scenes[courante]?.texte;
    if (texte && lireVoix() && voixDisponible()) direAVoixHaute(texte);
  };

  /** Applique la scène suivante. Les scènes s'accumulent : avancer n'efface rien. */
  const avancer = () => {
    if (courante >= derniere) return false;
    courante += 1;
    jouerScene(scenes[courante]);
    majBoutons();
    return true;
  };

  /** L'état exact après les scènes 0..jusqua — reculer, c'est rejouer moins loin. */
  const reconstruire = (jusqua) => {
    nettoyer();
    for (let i = 0; i <= jusqua; i += 1) jouerScene(scenes[i]);
    courante = jusqua;
    majBoutons();
  };

  const boucle = () => {
    if (arrete || !bloc.isConnected || !lecture) return;
    if (!avancer()) { pause(); return; }
    const s = scenes[courante];
    // La vitesse est relue à chaque pas : la changer agit dès la scène suivante.
    const duree = dureeScene(s) * lireVitesse().facteur;

    if (s.texte && lireVoix() && voixDisponible()) {
      // La voix donne le tempo : on enchaîne quand la phrase est dite. Le
      // minuteur ne sert plus que de filet, au cas où le navigateur n'appelle
      // jamais la fin — certains moteurs de synthèse se taisent sans prévenir.
      const finir = direAVoixHaute(s.texte, () => {
        if (minuterie) { clearTimeout(minuterie); minuterie = null; }
        if (lecture) minuterie = setTimeout(boucle, 350);
      });
      minuterie = setTimeout(finir, duree * 2.5);
    } else {
      minuterie = setTimeout(boucle, duree);
    }
  };

  const jouerDepuisLeDebut = () => {
    arreterMinuterie();
    reconstruire(-1);
    lecture = true;
    majBoutons();
    boucle();
  };

  lectureBtn.addEventListener('click', () => {
    if (lecture) { pause(); return; }
    if (courante >= derniere) { jouerDepuisLeDebut(); return; }
    lecture = true;
    majBoutons();
    boucle();
  });

  precedent.addEventListener('click', () => {
    pause();
    reconstruire(Math.max(0, courante - 1));
    direCourante();
  });

  suivant.addEventListener('click', () => {
    pause();
    avancer();
    direCourante();
  });

  // L'indice n'apparaît que si la voix est demandée ET que l'appareil n'a
  // rien de mieux qu'une voix robotique — inutile de parler d'Edge à qui
  // entend déjà une voix naturelle, ou n'a pas activé le son.
  const astuce = document.createElement('p');
  astuce.className = 'anim-astuce-voix';
  astuce.textContent = 'Astuce : sur cet appareil, le navigateur Edge lit avec une voix bien plus naturelle.';
  astuce.hidden = true;
  bloc.append(astuce);

  const majAstuce = () => {
    astuce.hidden = !(lireVoix() && voixDisponible() && !voixNaturelleDisponible());
  };
  majAstuce();

  voixBtn.addEventListener('click', () => {
    const active = !lireVoix();
    definirVoix(active);
    voixBtn.textContent = active ? '🔊' : '🔇';
    voixBtn.setAttribute('aria-pressed', String(active));
    majAstuce();
    if (active) direCourante();
    else if (voixDisponible()) speechSynthesis.cancel();
  });

  vitesseBtn.addEventListener('click', () => {
    const idx = VITESSES.findIndex((v) => v.id === lireVitesse().id);
    const prochaine = VITESSES[(idx + 1) % VITESSES.length];
    definirVitesse(prochaine.id);
    vitesseBtn.textContent = prochaine.libelle;
  });

  if (reduitLeMouvement()) {
    // Pas de défilement automatique : l'état final d'emblée, et l'élève remonte
    // le fil au pas s'il le souhaite — un geste volontaire n'est pas du bruit.
    lectureBtn.hidden = true;
    vitesseBtn.hidden = true;
    reconstruire(derniere);
  } else {
    jouerDepuisLeDebut();
  }

  return {
    arreter() {
      arrete = true;
      arreterMinuterie();
    },
  };
}
