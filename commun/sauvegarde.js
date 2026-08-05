// Sauvegarde et restauration, partagées par toutes les applis du dépôt.
//
// ── Pourquoi c'est nécessaire ─────────────────────────────────────────────
//
// Tout vit dans le localStorage : c'est ce qui permet de se passer de compte et
// de serveur, et donc de partager le lien à une classe entière. Le prix, c'est
// qu'un navigateur qu'on vide, un téléphone qu'on change ou un profil qui se
// réinitialise emportent des semaines de travail.
//
// ── Un seul fichier pour toutes les applis ────────────────────────────────
//
// Les pages de rivaci.github.io partagent une même origine, donc un même
// stockage. On sauvegarde donc TOUT ce qui s'y trouve — français, histoire-géo,
// et ce qui viendra — plutôt que d'énumérer des clés qu'on oubliera de tenir à
// jour. Une seule liste à maintenir : celle de ce qu'on refuse d'emporter.
//
// ── Ce qu'on n'emporte JAMAIS ─────────────────────────────────────────────
//
// La clé d'API. Un fichier de sauvegarde finit sur un Drive, dans un mail, sur
// une clé USB. Une clé d'API qui voyage est une clé qui fuit — et la ressaisir
// prend dix secondes.

const FORMAT = 1;

/** Clés exclues de la sauvegarde : secrets qui ne doivent pas voyager. */
const EXCLUES = new Set([
  'eleve.ia.v1',        // fournisseur + clés d'API
  'eleve.cle-api.v1',   // ancien format, même contenu
]);

const lisibles = () => {
  const tout = {};
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const cle = localStorage.key(i);
      if (!EXCLUES.has(cle)) tout[cle] = localStorage.getItem(cle);
    }
  } catch { /* stockage refusé : on renverra un objet vide */ }
  return tout;
};

/** L'instantané complet, prêt à être écrit dans un fichier. */
export function instantane() {
  return {
    format: FORMAT,
    application: 'mesrevisions',
    date: new Date().toISOString(),
    donnees: lisibles(),
  };
}

export const nomFichier = () =>
  `mesrevisions-${new Date().toISOString().slice(0, 10)}.json`;

/**
 * Relit une sauvegarde et réécrit le stockage.
 *
 * N'efface rien qui ne soit pas dans le fichier : restaurer la sauvegarde d'un
 * appareil où seul le français a été travaillé ne doit pas effacer l'histoire-géo
 * de l'autre. Et la clé d'API en place n'est jamais touchée.
 */
export function restaurer(contenu) {
  let lu;
  try {
    lu = typeof contenu === 'string' ? JSON.parse(contenu) : contenu;
  } catch {
    return { ok: false, message: "Ce fichier n'est pas une sauvegarde lisible." };
  }

  if (!lu || lu.application !== 'mesrevisions' || !lu.donnees || typeof lu.donnees !== 'object') {
    return { ok: false, message: "Ce fichier ne vient pas de cette application." };
  }
  if (lu.format > FORMAT) {
    return { ok: false, message: 'Cette sauvegarde vient d\'une version plus récente de l\'appli.' };
  }

  let ecrites = 0;
  try {
    for (const [cle, valeur] of Object.entries(lu.donnees)) {
      if (EXCLUES.has(cle) || typeof valeur !== 'string') continue;
      localStorage.setItem(cle, valeur);
      ecrites += 1;
    }
  } catch {
    return { ok: false, message: 'Le navigateur a refusé d\'écrire. Stockage plein ?' };
  }

  return { ok: true, ecrites, date: lu.date };
}

// --- Téléchargement et lecture de fichier (partout) -------------------------

export function telecharger() {
  const texte = JSON.stringify(instantane(), null, 2);
  const lien = document.createElement('a');
  lien.href = URL.createObjectURL(new Blob([texte], { type: 'application/json' }));
  lien.download = nomFichier();
  lien.click();
  URL.revokeObjectURL(lien.href);
}

/** Ouvre un sélecteur de fichier et restaure ce qu'on y trouve. */
export function restaurerDepuisFichier(fichier) {
  return new Promise((resoudre) => {
    const lecteur = new FileReader();
    lecteur.onload = () => resoudre(restaurer(String(lecteur.result)));
    lecteur.onerror = () => resoudre({ ok: false, message: 'Fichier illisible.' });
    lecteur.readAsText(fichier);
  });
}

// --- Sauvegarde automatique dans un fichier choisi une fois -----------------
//
// L'API File System Access permet de garder une POIGNÉE sur un vrai fichier du
// disque et d'y réécrire sans redemander où. Si ce fichier est placé dans un
// dossier synchronisé (Google Drive, OneDrive, Dropbox), c'est le client de
// synchronisation qui fait le voyage vers le nuage : pas d'OAuth, pas de compte,
// rien à configurer côté service.
//
// Chromium seulement (Chrome, Edge). Ailleurs, on garde l'export manuel.

export const autoDisponible = () =>
  typeof window !== 'undefined' && typeof window.showSaveFilePicker === 'function';

// Les poignées de fichier ne tiennent pas dans le localStorage (ce sont des
// objets, pas du texte) mais survivent au clonage structuré d'IndexedDB.
const BASE = 'mesrevisions-sauvegarde';
const MAGASIN = 'poignees';

const ouvrirBase = () => new Promise((resoudre, rejeter) => {
  const requete = indexedDB.open(BASE, 1);
  requete.onupgradeneeded = () => requete.result.createObjectStore(MAGASIN);
  requete.onsuccess = () => resoudre(requete.result);
  requete.onerror = () => rejeter(requete.error);
});

const transaction = async (mode, action) => {
  const base = await ouvrirBase();
  return new Promise((resoudre, rejeter) => {
    const t = base.transaction(MAGASIN, mode);
    const requete = action(t.objectStore(MAGASIN));
    requete.onsuccess = () => resoudre(requete.result);
    requete.onerror = () => rejeter(requete.error);
  });
};

const lirePoignee = () => transaction('readonly', (m) => m.get('fichier')).catch(() => null);
const ecrirePoignee = (p) => transaction('readwrite', (m) => m.put(p, 'fichier')).catch(() => null);
const effacerPoignee = () => transaction('readwrite', (m) => m.delete('fichier')).catch(() => null);

/** Demande où sauvegarder. À appeler depuis un clic : le navigateur l'exige. */
export async function choisirFichierAuto() {
  if (!autoDisponible()) return { ok: false, message: 'Ce navigateur ne le permet pas.' };
  try {
    const poignee = await window.showSaveFilePicker({
      suggestedName: nomFichier(),
      types: [{ description: 'Sauvegarde Mes révisions', accept: { 'application/json': ['.json'] } }],
    });
    await ecrirePoignee(poignee);
    const r = await ecrireDansFichier(poignee);
    return r.ok ? { ok: true, nom: poignee.name } : r;
  } catch (erreur) {
    // L'utilisateur a simplement fermé la fenêtre : ce n'est pas une erreur.
    if (erreur?.name === 'AbortError') return { ok: false, annule: true };
    return { ok: false, message: "Impossible d'ouvrir ce fichier." };
  }
}

export async function fichierAutoChoisi() {
  const poignee = await lirePoignee();
  return poignee ? { nom: poignee.name } : null;
}

export async function oublierFichierAuto() {
  await effacerPoignee();
}

async function ecrireDansFichier(poignee) {
  try {
    const flux = await poignee.createWritable();
    await flux.write(JSON.stringify(instantane(), null, 2));
    await flux.close();
    return { ok: true };
  } catch {
    return { ok: false, message: "Le fichier n'a pas pu être écrit." };
  }
}

// Écriture en cours et écriture réclamée pendant celle-ci : deux écritures qui
// se chevauchent sur la même poignée peuvent lever.
let minuterie = null;
let enCours = false;
let redemande = false;

/**
 * Réécrit la sauvegarde automatique, s'il y en a une et si la permission tient
 * toujours. Ne redemande JAMAIS la permission : ça exige un clic, et cette
 * fonction est appelée sans geste de l'utilisateur. Quand la permission est
 * retombée, on le signale plutôt que d'échouer en silence.
 */
export async function sauvegardeAuto() {
  // Deux écritures qui se chevauchent sur la même poignée peuvent lever. On
  // laisse celle en cours finir et on en redemande une juste après.
  if (enCours) { redemande = true; return { fait: false, differee: true }; }

  const poignee = await lirePoignee();
  if (!poignee) return { fait: false };

  try {
    const etat = await poignee.queryPermission({ mode: 'readwrite' });
    if (etat !== 'granted') return { fait: false, permissionPerdue: true, nom: poignee.name };
  } catch {
    return { fait: false, permissionPerdue: true, nom: poignee.name };
  }

  enCours = true;
  let r;
  try {
    r = await ecrireDansFichier(poignee);
  } finally {
    enCours = false;
    if (redemande) { redemande = false; planifierSauvegarde(500); }
  }
  return r.ok ? { fait: true, nom: poignee.name } : { fait: false, nom: poignee.name };
}

// --- Sauvegarde au fil de l'eau ---------------------------------------------
//
// Attendre la fin d'une séance laissait deux trous : une séance quittée en cours
// de route et les discussions avec Merlin hors séance n'atteignaient jamais le
// fichier. Le stockage, lui, était bien à jour — mais c'est justement ce qu'on
// cherche à ne pas perdre.
//
// On écrit donc à chaque changement, mais DIFFÉRÉ : une réponse d'exercice
// déclenche une écriture disque, et un fichier posé dans un dossier synchronisé
// déclenche un envoi vers le nuage. Regrouper les changements d'une même minute
// évite d'écrire vingt fois pour vingt exercices.

const DELAI_REGROUPEMENT = 4000;

/**
 * À appeler à chaque écriture du stockage. Regroupe les rafales.
 *
 * Ne fait rien là où la sauvegarde automatique n'existe pas — Firefox, Safari,
 * et les outils en ligne de commande qui importent le store pour le tester :
 * inutile d'armer une minuterie qui ne mènera nulle part, et qui retiendrait
 * node éveillé quatre secondes à la fin de chaque suite de tests.
 */
export function planifierSauvegarde(delai = DELAI_REGROUPEMENT) {
  if (!autoDisponible()) return;
  if (minuterie) clearTimeout(minuterie);
  minuterie = setTimeout(() => {
    minuterie = null;
    sauvegardeAuto().catch(() => {});
  }, delai);
}

/** Écrit tout de suite, sans attendre le regroupement. */
export function sauvegarderMaintenant() {
  if (minuterie) { clearTimeout(minuterie); minuterie = null; }
  return sauvegardeAuto();
}

// Quand l'onglet passe en arrière-plan ou se ferme, la minuterie ne tiendra pas
// (les navigateurs la brident, puis la page meurt) : on écrit immédiatement.
// C'est le filet du « il a fermé l'onglet au milieu ».
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && minuterie) sauvegarderMaintenant().catch(() => {});
  });
}

/** Redonne la permission puis réécrit. À appeler depuis un clic. */
export async function reprendreSauvegardeAuto() {
  const poignee = await lirePoignee();
  if (!poignee) return { ok: false, message: 'Aucun fichier choisi.' };
  try {
    const etat = await poignee.requestPermission({ mode: 'readwrite' });
    if (etat !== 'granted') return { ok: false, message: 'Permission refusée.' };
  } catch {
    return { ok: false, message: 'Permission refusée.' };
  }
  return ecrireDansFichier(poignee);
}
