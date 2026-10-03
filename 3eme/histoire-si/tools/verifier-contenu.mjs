// Contrôle du contenu des chapitres.
//
//     node tools/verifier-contenu.mjs
//
// Une coquille dans une réponse attendue se paie cher : l'élève répond juste et
// l'appli lui dit faux, ou pire, apprend la coquille. Ce script rejoue donc
// chaque item contre son propre corrigé, vérifie que les erreurs prévues ne
// recouvrent jamais une réponse acceptée, et que le chapitre tient dans l'heure.

import { CHAPITRES, itemsDe } from '../js/data/chapitres/index.js';
import { attendues, comparer, normaliser } from '../js/comparer.js';

const erreurs = [];
const signaler = (ou, quoi) => erreurs.push(`${ou} : ${quoi}`);

const TYPES = {
  terme: ['fr', 'attendu'],
  reponse: ['question', 'attendu'],
  trou: ['consigne', 'phrase', 'attendu'],
  choix: ['phrase', 'options', 'attendu', 'explication'],
  chrono: ['consigne', 'evenements'],
  decrire: ['sujet', 'emoji', 'indices', 'consigne', 'modele', 'criteres'],
};
const BLOCS = ['vocabulaire', 'regle', 'piege'];
// Comme l'espagnol d'Evan : une heure au plus, contrôle blanc compris, et une
// séance qui tient d'une traite.
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
    for (const b of e.fiche ?? []) if (!BLOCS.includes(b.type)) signaler(e.id, `bloc de fiche inconnu « ${b.type} »`);
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
      if (i.type === 'chrono') {
        if (i.evenements.length < 3) signaler(ou, 'moins de trois événements à ranger');
        if (i.evenements.some((v) => !v.texte || !v.date)) signaler(ou, 'un événement sans texte ou sans date');
        if (new Set(i.evenements.map((v) => v.texte)).size !== i.evenements.length) signaler(ou, 'deux événements identiques');
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

      // 5. Une erreur prévue ne doit jamais recouvrir une réponse acceptée.
      const bonnes = attendues(i);
      for (const p of i.pieges ?? []) {
        for (const si of [p.si].flat()) {
          if (bonnes.includes(normaliser(si))) signaler(ou, `le piège « ${si} » est aussi une réponse acceptée`);
          if (comparer(si, i).raison !== 'piege') signaler(ou, `le piège « ${si} » n'est pas reconnu comme tel`);
        }
        if (!p.message) signaler(ou, 'piège sans message');
        if (p.resultat && !['presque', 'faux'].includes(p.resultat)) signaler(ou, `résultat de piège inconnu « ${p.resultat} »`);
      }

      // 6. Un terme doit pouvoir servir de QCM à l'envers.
      if (i.type === 'terme' && e.items.filter((x) => x.type === 'terme' && x.id !== i.id).length < 2) {
        signaler(ou, 'pas assez de termes voisins pour un QCM à l\'envers');
      }
    }
  }

  // 7. Le contrôle blanc tire dans des étapes qui existent, et qui ont assez de questions.
  for (const t of c.interro.tirage) {
    const e = c.etapes.find((x) => x.id === t.etape);
    if (!e) signaler(c.id, `contrôle blanc : étape inconnue « ${t.etape} »`);
    else if (e.items.filter((i) => i.type !== 'decrire').length < t.nombre) signaler(c.id, `contrôle blanc : pas assez de questions dans ${t.etape}`);
  }

  // 8. Une traduction en double rendrait un QCM à l'envers ambigu.
  const frs = itemsDe(c).filter((i) => i.type === 'terme').map((i) => i.fr);
  const doublons = frs.filter((f, k) => frs.indexOf(f) !== k);
  if (doublons.length) signaler(c.id, `traductions en double : ${doublons.join(', ')}`);
}

if (erreurs.length) {
  console.error(`✗ ${erreurs.length} problème(s) :`);
  for (const e of erreurs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ Tout est bon : ${ids.size} questions dans ${CHAPITRES.length} chapitre(s).`);
