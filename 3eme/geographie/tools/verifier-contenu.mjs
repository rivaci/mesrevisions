// Contrôle du contenu des chapitres.
//
//     node tools/verifier-contenu.mjs
//
// Une coquille dans une réponse attendue se paie cher : l'élève répond juste et
// l'appli lui dit faux, ou pire, apprend la coquille. Ce script rejoue donc
// chaque item contre son propre corrigé, vérifie que les erreurs prévues ne
// recouvrent jamais une réponse acceptée, et que le chapitre tient dans l'heure.

import { CHAPITRES, itemsDe } from '../js/data/chapitres/index.js';
import { attendues, comparer, normaliser, sansAccents } from '../js/comparer.js';

const erreurs = [];
const signaler = (ou, quoi) => erreurs.push(`${ou} : ${quoi}`);

const TYPES = {
  terme: ['definition', 'attendu'],
  reponse: ['question', 'attendu'],
  trou: ['consigne', 'phrase', 'attendu'],
  choix: ['phrase', 'options', 'attendu', 'explication'],
  ordre: ['consigne', 'elements'],
  decrire: ['sujet', 'emoji', 'indices', 'consigne', 'modele', 'criteres'],
};
const BLOCS = ['regle', 'piege', 'tableau'];
// Comme l'espagnol et l'histoire d'Evan : une heure au plus, contrôle blanc
// compris, et une séance qui tient d'une traite.
const BUDGET = 60;
const BUDGET_SEANCE = 20;

const ids = new Set();

for (const c of CHAPITRES) {
  // 1. Le temps : le chapitre, et chaque séance.
  const total = c.etapes.reduce((s, e) => s + e.duree, 0) + c.interro.duree;
  if (total > BUDGET) signaler(c.id, `${total} minutes annoncées, au-delà des ${BUDGET}`);
  for (const s of c.seances ?? []) {
    const duree = c.etapes.filter((e) => e.seance === s.numero).reduce((t, e) => t + e.duree, 0);
    if (!duree) signaler(c.id, `séance ${s.numero} sans étape`);
    if (duree > BUDGET_SEANCE) signaler(c.id, `séance ${s.numero} : ${duree} minutes, au-delà des ${BUDGET_SEANCE}`);
  }
  if (!c.profilMerlin) signaler(c.id, 'pas de profil pour Merlin');

  for (const e of c.etapes) {
    if (!c.seances?.some((s) => s.numero === e.seance)) signaler(e.id, `séance inconnue « ${e.seance} »`);
    if (!e.fiche?.length) signaler(e.id, 'étape sans fiche');
    for (const b of e.fiche ?? []) {
      if (!BLOCS.includes(b.type)) signaler(e.id, `bloc de fiche inconnu « ${b.type} »`);
      if (b.type === 'tableau' && b.colonnes && b.lignes.some((l) => l.length !== b.colonnes.length)) {
        signaler(e.id, `tableau « ${b.titre} » : une ligne n'a pas autant de cases que de colonnes`);
      }
    }
    if (!e.items?.length) signaler(e.id, 'étape sans question');
    if (e.items.some((i) => i.type === 'decrire') && !e.items.every((i) => i.type === 'decrire')) {
      signaler(e.id, 'un écrit se fait dans une étape à part');
    }

    for (const i of e.items) {
      const ou = `${e.id} › ${i.id}`;
      // 2. Identifiants uniques : la progression y est rangée.
      if (ids.has(i.id)) signaler(ou, 'identifiant en double');
      ids.add(i.id);

      // 3. Les champs du type.
      const champs = TYPES[i.type];
      if (!champs) { signaler(ou, `type inconnu « ${i.type} »`); continue; }
      for (const k of champs) if (i[k] == null || i[k] === '') signaler(ou, `champ « ${k} » manquant`);

      if (i.type === 'decrire') {
        const cles = i.criteres.map((x) => x.id);
        if (new Set(cles).size !== cles.length) signaler(ou, 'deux critères ont le même identifiant');
        continue;
      }
      if (i.type === 'ordre') {
        if (i.elements.length < 3) signaler(ou, 'moins de trois étapes à ranger');
        if (new Set(i.elements).size !== i.elements.length) signaler(ou, 'deux étapes identiques');
        continue;
      }
      if (['trou', 'choix'].includes(i.type) && (i.phrase.match(/___/g) ?? []).length > 1) signaler(ou, 'plus d\'un blanc « ___ »');
      if (i.type === 'trou' && !i.phrase.includes('___')) signaler(ou, 'phrase sans blanc « ___ »');

      // 4. Chaque réponse acceptée est jugée juste par le moteur.
      if (i.type === 'choix') {
        if (i.options.filter((o) => o === i.attendu).length !== 1) signaler(ou, 'la bonne réponse doit figurer une fois parmi les options');
        if (new Set(i.options).size !== i.options.length) signaler(ou, 'deux options identiques');
        continue;
      }
      for (const a of [i.attendu, ...(i.accepte ?? [])]) {
        const r = comparer(a, i);
        if (r.resultat !== 'juste') signaler(ou, `« ${a} » est jugé ${r.resultat} par le moteur`);
      }

      // 5. Une erreur prévue ne doit jamais recouvrir une réponse acceptée —
      // accents mis à part, puisque les pièges se reconnaissent sans eux.
      const bonnes = attendues(i).map(sansAccents);
      for (const p of i.pieges ?? []) {
        for (const si of [p.si].flat()) {
          if (bonnes.includes(sansAccents(normaliser(si)))) signaler(ou, `le piège « ${si} » est aussi une réponse acceptée`);
          if (comparer(si, i).raison !== 'piege') signaler(ou, `le piège « ${si} » n'est pas reconnu comme tel`);
        }
        if (!p.message) signaler(ou, 'piège sans message');
        if (p.resultat && !['presque', 'faux'].includes(p.resultat)) signaler(ou, `résultat de piège inconnu « ${p.resultat} »`);
      }
    }
  }

  // 6. Le contrôle blanc tire dans des étapes qui existent, et qui ont assez de questions.
  for (const t of c.interro.tirage) {
    const e = c.etapes.find((x) => x.id === t.etape);
    if (!e) signaler(c.id, `contrôle blanc : étape inconnue « ${t.etape} »`);
    else if (e.items.filter((i) => i.type !== 'decrire').length < t.nombre) signaler(c.id, `contrôle blanc : pas assez de questions dans ${t.etape}`);
  }

  // 7. Le QCM à l'envers propose trois définitions : il en faut assez, et
  // toutes différentes, sinon deux options diraient la même chose.
  const definitions = itemsDe(c).filter((i) => i.type === 'terme').map((i) => i.definition);
  if (definitions.length < 3) signaler(c.id, 'moins de trois termes : pas de QCM à l\'envers possible');
  const doublons = definitions.filter((d, k) => definitions.indexOf(d) !== k);
  if (doublons.length) signaler(c.id, `définitions en double : ${doublons.join(', ')}`);
}

if (erreurs.length) {
  console.error(`✗ ${erreurs.length} problème(s) :`);
  for (const e of erreurs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ Tout est bon : ${ids.size} questions dans ${CHAPITRES.length} chapitre(s).`);
