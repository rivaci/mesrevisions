// Qui utilise l'appli — et pourquoi le prénom n'est pas qu'un affichage.
//
// Le prénom sert de CLÉ À LA MÉMOIRE TRANSVERSALE, celle qui décrit comment
// l'élève apprend et qui se partage entre ses matières. Toutes les pages de
// rivaci.github.io partagent un même stockage : sans cette clé, deux enfants
// sur le même appareil se partageraient un profil d'apprentissage.
//
// C'est aussi ce qui fait que Merlin, en maths, connaît déjà l'élève par le
// français. Même prénom, même clé, même mémoire — rien à brancher.

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

/** Prénom réduit à des lettres et des chiffres : clé de stockage, nom de fichier. */
export const slug = (prenom = eleve().prenom) =>
  prenom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '') || 'anonyme';

/** La clé partagée entre les applis d'un même élève. Identique à celle du français. */
export const cleTransversale = () => `eleve.${slug()}.transversal.v1`;
