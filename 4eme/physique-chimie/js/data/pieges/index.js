// Les pièges : les conceptions qui produisent les erreurs, et comment y répondre.
//
// Un piège n'est pas une erreur constatée, c'est la CONCEPTION qui la produit.
// « Au sommet du lancer, la balle n'est soumise à aucune force » n'est pas une
// étourderie : c'est un modèle qui prédit correctement la quasi-totalité de ce
// que l'élève a vu depuis qu'il est né. Savoir laquelle des conceptions a joué,
// c'est la différence entre corriger et expliquer.
//
// ── Ce que ce fichier est ─────────────────────────────────────────────────
//
// L'endroit unique où les six familles sont assemblées. `symbolique.js` le
// réclamait en toutes lettres — « trois fichiers, trois schémas : à trancher en
// un seul endroit avant que le vérificateur ne soit écrit, faute de quoi il
// sera écrit trois fois ». Ce fichier ne tranche rien du contenu : il pose la
// surface que le moteur, les items et `tools/tester-pieges.mjs` lisent, et il
// refuse au chargement les deux fautes qu'un assemblage silencieux rendrait
// invisibles — deux familles qui donnent le même identifiant à deux pièges
// différents, et un piège dont l'`id` interne contredit sa clé. Sans ces refus,
// la première écraserait un piège entier et la seconde renommerait un piège au
// passage : dans les deux cas sans un mot.
//
// Chaque piège reçoit ici son `id` (la clé) et sa `famille`. Les six fichiers de
// famille sont laissés intacts : ils portent leurs commentaires de dérivation de
// rang, qui sont ce qu'un relecteur doit pouvoir refuser.
//
// ── Ce que l'assemblage des six rend enfin vérifiable ─────────────────────
//
// Tant que « matière » et « contrat didactique » manquaient, deux exigences de
// `charte.md` restaient des réserves du contrôle. Les deux sont devenues des
// tests, et la première est la plus importante du catalogue :
//
//   · **La dépendance d'Andersson.** « Le piège conservation de la masse n'est
//     JAMAIS programmé avant que le piège le gaz n'est pas de la matière ait été
//     rencontré. » Un élève pour qui la fumée ne pèse rien ne peut pas comprendre
//     que la masse se conserve à la combustion : il n'a pas les termes du bilan.
//     Les deux pièges sont dans `matiere.js`, et la progression les sépare de
//     trois chapitres (`ch03-air-et-composition` avant
//     `ch06-transformations-chimiques`). Le corpus tient donc la dépendance sans
//     que le moteur ait à arbitrer — c'est ce que `tester-pieges.mjs` vérifie —
//     mais il ne la tient qu'à l'échelle du CORPUS. La règle à tenir n'est pas
//     « chapitre 3 avant chapitre 6 », c'est « ce piège-ci rencontré avant
//     celui-là », et elle se lit sur le profil élève. Le contrôle le redit en
//     réserve, parce qu'aucun test de ce fichier ne peut l'atteindre.
//   · **Aucune famille du catalogue n'est vide.** Les six y sont, avec les
//     effectifs que leurs en-têtes annoncent.
//
// ── Ce que l'assemblage des six fait tomber ───────────────────────────────
//
// Le plafond « au plus dix pièges de rang 1 » de `charte.md` est dépassé de
// trois : le catalogue complet en porte **treize**, et huit de rang 2. Le calcul
// qui FONDE ce plafond, lui, tient — 5 × 13 + 3 × 8 = 89 créneaux de
// re-confrontation pour 100 disponibles au minimum. `matiere.js` § « Ce que ce
// fichier impose au reste de l'application » écrit pourquoi les deux ne tombent
// pas ensemble : le plafond de dix était une traduction prudente d'un budget,
// calculée quand le catalogue supposait environ six rangs 2 ; avec huit, la même
// enveloppe finance plus de rangs 1 qu'il n'en tient.
//
// Le contrôle en tire la seule conséquence qu'un fichier de tests a le droit de
// tirer : il TESTE le budget, qui est la grandeur primitive et qui passe, et il
// porte le compte de dix en réserve, qui est une grandeur dérivée et dont la
// correction — refuser un rang par élimination, un par un — est une décision de
// contenu qu'aucun test ne peut prendre à la place d'un relecteur.
//
// ── Le champ `controle` ───────────────────────────────────────────────────
//
// C'est ce qui distingue cette appli d'un exerciseur : chaque piège porte un
// GESTE DE VÉRIFICATION que l'élève peut refaire seul, sans l'appli. La `regle`
// explique pourquoi c'était faux ; le `controle` lui donne le moyen de s'en
// apercevoir la prochaine fois. Et il se relit sur une réponse fausse typique :
// un contrôle qui la CONFIRME est le défaut le plus discret du projet.

import contrat from './contrat.js';
import electricite from './electricite.js';
import matiere from './matiere.js';
import mouvement from './mouvement.js';
import signaux from './signaux.js';
import symbolique from './symbolique.js';

// L'ordre est celui du catalogue de `charte.md` : « matière » ouvre, parce
// qu'elle porte le § 7 ② et que trois autres familles déclinent sa conception
// fondatrice ; « contrat didactique » ferme, parce qu'elle ne décrit pas le
// monde physique mais l'exercice, et qu'elle se rencontre sur les items des cinq
// autres.
const FAMILLES = [
  ['matiere', matiere],
  ['symbolique', symbolique],
  ['mouvement', mouvement],
  ['electricite', electricite],
  ['signaux', signaux],
  ['contrat', contrat],
];

const assembler = () => {
  const catalogue = {};
  for (const [famille, pieges] of FAMILLES) {
    for (const [id, piege] of Object.entries(pieges)) {
      if (catalogue[id]) {
        throw new Error(
          `Identifiant de piège en double : « ${id} », dans ${catalogue[id].famille} et ${famille}.`,
        );
      }
      // Trois familles écrivent un `id` dans l'objet lui-même, trois ne
      // l'écrivent pas. Là où il est écrit, il doit dire la même chose que la
      // clé : l'affectation ci-dessous l'écraserait en silence, et un piège
      // renommé au passage garderait ses `iatrogene` et ses renvois pointés sur
      // l'ancien nom.
      if (piege.id !== undefined && piege.id !== id) {
        throw new Error(
          `Le piège « ${id} » (${famille}) porte un identifiant interne différent : « ${piege.id} ».`,
        );
      }
      catalogue[id] = { ...piege, id, famille };
    }
  }
  return catalogue;
};

/** Tous les pièges des six familles, à plat, indexés par identifiant. */
export const PIEGES = assembler();

/**
 * Les pièges dont le chapitre indiqué est le point de DÉPART de la file espacée.
 * Ce n'est pas la liste des pièges qu'on y rencontre : un rang 1 revient dans au
 * moins deux chapitres postérieurs, et c'est le profil élève qui sait lesquels.
 */
export const piegesDuChapitre = (id) =>
  Object.values(PIEGES).filter((piege) => piege.chapitreOrigine === id);

/** Les pièges d'un rang donné — 1, 2 ou 3. C'est la donnée qui pilote la file. */
export const piegesDeRang = (n) => Object.values(PIEGES).filter((piege) => piege.rang === n);
