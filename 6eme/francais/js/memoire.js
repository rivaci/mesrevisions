// Mémoire de l'élève — ce qui fait la différence entre un questionnaire et un suivi.
//
// Sans elle, l'IA repart de zéro à chaque erreur : elle peut réexpliquer trois
// fois la même règle avec la même image qui ne passe pas, sans jamais s'en
// apercevoir. Un professeur particulier, lui, sait au bout de deux séances que
// cet élève-là trouve toujours le sujet quand il pose la question à voix haute.
//
// ── Deux couches ──────────────────────────────────────────────────────────
//
// TRANSVERSALE   Comment il apprend : longueur d'explication qu'il supporte,
//                exemple plutôt que règle, moment où il décroche. Ça vaut dans
//                toutes les matières, donc c'est stocké hors de l'appli — et
//                l'origine commune des GitHub Pages, qui est un risque pour la
//                clé d'API, devient ici exactement ce qu'il faut : deux applis
//                d'un même élève partagent la couche sans rien à brancher.
//
// DISCIPLINAIRE  Ce qui résiste en français, ce qui marche pour l'expliquer,
//                ce qu'on a déjà essayé sans effet. Ne se transfère pas.
//
// ── Deux origines, à ne pas mélanger ──────────────────────────────────────
//
// Les CHIFFRES sont calculés à partir de la progression réelle : nombre
// d'erreurs, échecs après explication, pièges acquis. L'IA ne les écrit jamais
// — sinon elle inventerait des statistiques plausibles et fausses.
//
// Les OBSERVATIONS qualitatives, elles, ne peuvent venir que de l'IA : aucun
// calcul ne dira que la métaphore du chef d'orchestre est tombée à plat.
//
// ── Garde-fous ────────────────────────────────────────────────────────────
//
// Plafonnée      Une mémoire qui gonfle sans limite coûte plus qu'elle ne
//                rapporte et noie les deux ou trois choses qui comptent.
// Datée          Chaque note porte la séance où elle a été écrite, pour qu'un
//                jugement formé sur deux erreurs ne se fige pas un mois durant.
// Corrigeable    Tout est lisible et supprimable depuis l'écran parents. Une
//                IA qui tient un dossier illisible sur un enfant, non.

import { PIEGES } from './data/pieges.js';
import { estAcquis } from './srs.js';
import { eleve } from './eleve.js';

const MAX_NOTES = 6;

export const profilVierge = () => ({
  transversal: { notes: [] },
  francais: { marche: [], aEviter: [] },
});

let compteur = 0;
const nouvelId = () => `n${Date.now().toString(36)}${(compteur++).toString(36)}`;

/** Ajoute des observations et élague. Les plus anciennes sortent en premier. */
export function ajouterNotes(liste, textes, numeroSeance) {
  const ajoutees = textes
    .filter((t) => t && t.trim())
    .map((texte) => ({ id: nouvelId(), texte: texte.trim(), seance: numeroSeance }));

  // Dédoublonnage grossier : deux notes qui commencent pareil disent
  // probablement la même chose, et la plus récente est la mieux formulée.
  const empreinte = (n) => n.texte.slice(0, 40).toLowerCase();
  const vues = new Set(ajoutees.map(empreinte));
  const conservees = liste.filter((n) => !vues.has(empreinte(n)));

  return [...conservees, ...ajoutees].slice(-MAX_NOTES);
}

export const supprimerNote = (liste, id) => liste.filter((n) => n.id !== id);

const nomEnMajuscules = () => (eleve().prenom || "L'ÉLÈVE").toUpperCase();

// --- Ce que l'IA reçoit -----------------------------------------------------

/**
 * Rend le profil sous la forme injectée dans le prompt système.
 *
 * Ce texte est stable pendant toute une séance : il est mis à jour une seule
 * fois, à la fin. C'est ce qui permet de le placer dans la partie MISE EN
 * CACHE du prompt et de le relire à un dixième du prix. S'il changeait à
 * chaque échange, le cache serait cassé à chaque appel.
 */
export function profilPourIA(profil, etatsPieges, numeroSeance) {
  const sections = [];

  const resiste = pointsQuiResistent(etatsPieges);
  if (resiste.length) {
    sections.push(
      'CE QUI RÉSISTE\n' +
      resiste.map((p) => `• ${p.nom} — ${p.detail}`).join('\n'),
    );
  }

  const acquis = etatsPieges.filter((e) => estAcquis(e.etat));
  if (acquis.length) {
    sections.push(
      'DÉJÀ ACQUIS (ne pas réexpliquer depuis le début)\n' +
      acquis.map((e) => `• ${PIEGES[e.id]?.nom ?? e.id}`).join('\n'),
    );
  }

  if (profil.francais.marche.length) {
    sections.push(
      'CE QUI MARCHE POUR LUI\n' +
      profil.francais.marche.map((n) => `• ${n.texte}`).join('\n'),
    );
  }

  if (profil.francais.aEviter.length) {
    sections.push(
      'DÉJÀ ESSAYÉ SANS EFFET — NE PAS REFAIRE\n' +
      profil.francais.aEviter.map((n) => `• ${n.texte}`).join('\n'),
    );
  }

  if (profil.transversal.notes.length) {
    sections.push(
      'COMMENT IL APPREND\n' +
      profil.transversal.notes.map((n) => `• ${n.texte}`).join('\n'),
    );
  }

  if (!sections.length) {
    return `PROFIL DE ${nomEnMajuscules()} — première séance, rien d'observé pour l'instant.`;
  }

  return `PROFIL DE ${nomEnMajuscules()} — séance ${numeroSeance}\n\n${sections.join('\n\n')}`;
}

/** Les pièges qui coûtent le plus, chiffres à l'appui. Calculé, jamais écrit par l'IA. */
export function pointsQuiResistent(etatsPieges, maximum = 5) {
  return etatsPieges
    .filter((e) => e.etat.echecs > 0 && !estAcquis(e.etat))
    .sort((a, b) => b.etat.echecs - a.etat.echecs)
    .slice(0, maximum)
    .map((e) => ({
      id: e.id,
      nom: PIEGES[e.id]?.nom ?? e.id,
      detail:
        `${e.etat.echecs} erreur${e.etat.echecs > 1 ? 's' : ''}` +
        (e.etat.reussites ? `, ${e.etat.reussites} réussite${e.etat.reussites > 1 ? 's' : ''}` : '') +
        (e.etat.palierRate > e.etat.palierMax
          ? ` — tient au palier ${e.etat.palierMax}, lâche au palier ${e.etat.palierRate}`
          : ''),
    }));
}
