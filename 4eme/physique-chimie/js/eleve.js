// Qui utilise l'appli — et pourquoi ce fichier est une COPIE de celui des
// mathématiques plutôt qu'une variante.
//
// Le prénom sert de CLÉ À LA MÉMOIRE TRANSVERSALE, celle qui décrit comment
// l'élève apprend et qui se partage entre ses matières. Toutes les pages de
// rivaci.github.io partagent un même stockage : sans cette clé, deux enfants
// sur le même appareil se partageraient un profil d'apprentissage.
//
// ── Pourquoi la clé s'appelle encore « maths4e » ────────────────────────────
//
// Parce que c'est la MÊME clé, et que c'est tout l'intérêt. L'élève qui arrive
// ici depuis les mathématiques ne doit pas se réinscrire : son prénom, son
// avatar et la mémoire que Merlin a de lui sont déjà là. Renommer la clé en
// « physique4e » rendrait le fichier plus joli et le profil réellement partagé
// deviendrait deux profils jumeaux qui divergent — exactement la panne que ce
// fichier existe pour éviter.
//
// Le nom de la clé est donc un fait historique, pas une description : c'est
// l'appli de maths qui l'a écrite la première. On ne la renomme que le jour où
// on écrit une migration, et pas pour des raisons d'esthétique.

const CLE_IDENTITE = 'maths4e.eleve.v1';

export const AVATARS = ['🦊', '🦉', '🐙', '🦁', '🐢', '🦄', '🐝', '🦕'];

const lire = () => {
  try { return JSON.parse(localStorage.getItem(CLE_IDENTITE)) ?? null; }
  catch { return null; }
};

export const eleve = () => lire() ?? { prenom: '', avatar: AVATARS[0] };

export function definirEleve(prenom, avatar) {
  try {
    localStorage.setItem(CLE_IDENTITE, JSON.stringify({
      prenom: prenom.trim().slice(0, 20),
      avatar: avatar ?? AVATARS[0],
    }));
  } catch { /* stockage refusé : l'appli reste jouable, sans mémoire */ }
}

export const estInstalle = () => Boolean(eleve().prenom);

// ── Le code parental ────────────────────────────────────────────────────────
//
// C'est un RIDEAU, pas une serrure. Sur un site statique, qui sait ouvrir les
// outils de développement passe outre — et c'est assumé. Son rôle est d'éviter
// que l'enfant tombe par hasard sur la liste de ses difficultés et sur ce que
// Merlin a noté de lui, pas de protéger la clé d'API.

const CLE_CODE = 'maths4e.code-parent.v1';

export const codeDefini = () => Boolean(localStorage.getItem(CLE_CODE));

export const codeValide = (saisi) => localStorage.getItem(CLE_CODE) === String(saisi);

export function definirCode(code) {
  try {
    if (!code) localStorage.removeItem(CLE_CODE);
    else localStorage.setItem(CLE_CODE, String(code));
  } catch { /* ignoré */ }
}

/** Prénom réduit à des lettres et des chiffres : clé de stockage, nom de fichier. */
export const slug = (prenom = eleve().prenom) =>
  prenom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '') || 'anonyme';

/** La clé partagée entre les applis d'un même élève. Identique à celle du français. */
export const cleTransversale = () => `eleve.${slug()}.transversal.v1`;
