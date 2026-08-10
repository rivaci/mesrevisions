// Chapitre 17 — Algorithmique et programmation.
//
// ── Pourquoi c'est un chapitre, alors que le programme dit le contraire ───
//
// Les repères officiels demandent de greffer ces sections en fin de chapitres,
// et c'est ce que font Transmath et Myriade. On s'en écarte, pour un motif
// propre à l'application : un manuel se feuillette, alors qu'ici le suivi est
// par savoir-faire et les révisions sont espacées dans le temps. Trois
// sections cachées en queue de trois chapitres différents ne se retrouvent
// pas, et donc ne se révisent jamais.
//
// ── L'idée que le collégien n'a nulle part ailleurs ───────────────────────
//
// Un programme s'exécute DANS LE TEMPS. Une expression mathématique est vraie
// ou fausse une fois pour toutes ; une variable, elle, vaut des choses
// différentes selon le moment où on la regarde. Les cinq pièges du chapitre
// découlent tous de là.
//
// Le cas le plus net est « x prend la valeur x + 1 ». L'élève arrive du
// chapitre 11, où cette écriture est une équation SANS solution. Ici ce n'est
// pas une équation du tout, mais un ordre : calculer x + 1 avec l'ancienne
// valeur, puis ranger le résultat à la place. C'est le seul endroit du
// programme de 4e où le signe = du calcul littéral et l'affectation se
// rencontrent, et rien ne prévient l'élève du changement de contrat.
//
// ── Le retrait est une donnée, pas une mise en page ───────────────────────
//
// Les programmes s'affichent par js/rendu.js (export « programme ») : un
// tableau de lignes rendu tel quel, retraits compris. Tout le reste du contenu
// passe par mathsOuTexte, qui écrase les blancs — ce qu'il faut pour une
// phrase, où deux espaces sont une coquille. Ici c'est l'inverse : le retrait
// dit ce qui est dans la boucle et ce qui vient après, et le chapitre fait
// précisément répondre à cette question.
//
// ── Ce que ce chapitre n'a PAS ────────────────────────────────────────────
//
// Niveaux 1 et 2 attendus en fin de 4e : instruction conditionnelle, boucle
// bornée, variable. Ni boucle « tant que » non bornée, ni fonction, ni liste,
// ni récursivité. Les programmes tiennent en dix lignes, et le pseudo-code est
// celui des blocs Scratch — le programme de 4e est visuel, pas textuel.

import sf171 from './ch17/sf-17-1.js';
import sf172 from './ch17/sf-17-2.js';
import sf173 from './ch17/sf-17-3.js';

export default {
  numero: 17,
  titre: 'Algorithmique et programmation',
  theme: 'Algorithmique et programmation',
  trimestre: 3,
  programme: '2020',
  prerequis: [
    'Calcul littéral : la lettre qui désigne un nombre (chapitre 7)',
    'Équations : le signe égal du calcul (chapitre 11)',
    'Opérations sur les relatifs (chapitre 1)',
  ],
  savoirFaire: [sf171, sf172, sf173],
};
