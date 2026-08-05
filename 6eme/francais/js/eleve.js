// Qui utilise l'appli : prénom, avatar, et code parental facultatif.
//
// ── Pourquoi le prénom n'est pas qu'un détail d'affichage ─────────────────
//
// Il sert de CLÉ à la couche de mémoire transversale — celle qui décrit comment
// l'élève apprend et qui doit être partagée entre ses matières. Toutes les pages
// de rivaci.github.io partagent un seul stockage : sans le prénom dans la clé,
// deux enfants qui utiliseraient le même appareil se partageraient un profil
// d'apprentissage, et l'appli de maths du grand lirait les observations faites
// sur le petit en français.
//
// L'identité elle-même reste propre à l'appli : c'est ce qui permet à deux
// enfants de coexister sur un même navigateur.
//
// ── Le code parental ──────────────────────────────────────────────────────
//
// C'est un RIDEAU, pas une serrure, et le réglage le dit à l'utilisateur. Sur un
// site statique, tout est dans le stockage du navigateur : quiconque ouvre les
// outils de développement passe outre en dix secondes, et un collégien de douze
// ans en est parfaitement capable.
//
// Son rôle réel est ailleurs : éviter que l'enfant tombe par hasard sur un écran
// qui liste ses difficultés et ce que l'IA a noté de lui. Ça, un rideau le fait
// très bien. Prétendre que ça protège la clé d'API serait mentir.

const CLE_IDENTITE = 'francais6e.eleve.v1';
const CLE_CODE = 'francais6e.code-parent.v1';

export const AVATARS = [
  '🦊', '🦉', '🐙', '🦖', '🐼', '🦈',
  '🐸', '🦁', '🐨', '🦄', '🐝', '🐢',
];

const lire = (cle, parDefaut = null) => {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? JSON.parse(brut) : parDefaut;
  } catch {
    return parDefaut;
  }
};

const ecrire = (cle, valeur) => {
  try {
    if (valeur === null) localStorage.removeItem(cle);
    else localStorage.setItem(cle, JSON.stringify(valeur));
  } catch { /* stockage refusé : l'appli reste utilisable, rien n'est retenu */ }
};

export const eleve = () => lire(CLE_IDENTITE, { prenom: '', avatar: AVATARS[0] });

export const estConfigure = () => Boolean(eleve().prenom);

export function definirEleve({ prenom, avatar }) {
  ecrire(CLE_IDENTITE, { prenom: prenom.trim().slice(0, 20), avatar });
}

/**
 * Clé de la mémoire transversale, dérivée du prénom.
 *
 * Sans prénom on retombe sur une clé anonyme : l'appli reste utilisable avant
 * la configuration, et le profil sera simplement reparti à neuf ensuite.
 */
export function cleTransversale() {
  return `eleve.${slug()}.transversal.v1`;
}

/** Prénom réduit à des lettres et des chiffres : clé de stockage, nom de fichier. */
export const slug = (prenom = eleve().prenom) =>
  prenom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '') || 'anonyme';

/**
 * « de Léa », mais « d'Anto ».
 *
 * Dans une appli qui enseigne l'élision, « Suivi de Alexandre » serait une faute
 * affichée en permanence à l'élève. Le h est traité comme muet : c'est le cas de
 * tous les prénoms courants (Hugo, Hélène, Henri).
 */
export const de = (prenom = eleve().prenom) =>
  /^[aeiouyàâäéèêëîïôöùûüh]/i.test(prenom) ? `d'${prenom}` : `de ${prenom}`;

// --- Code parental ----------------------------------------------------------

export const codeParentDefini = () => Boolean(lire(CLE_CODE));

export const verifierCodeParent = (saisi) => lire(CLE_CODE) === saisi.trim();

export const definirCodeParent = (code) => ecrire(CLE_CODE, code ? code.trim() : null);

// Une fois le code donné, on ne le redemande pas à chaque aller-retour entre
// l'écran parents et les réglages — seulement à la prochaine ouverture.
let deverrouille = false;
export const estDeverrouille = () => !codeParentDefini() || deverrouille;
export const deverrouiller = () => { deverrouille = true; };
export const reverrouiller = () => { deverrouille = false; };
