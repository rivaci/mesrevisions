// Contrôle du contenu des unités.
//
//     node tools/verifier-contenu.mjs
//
// Une coquille dans une réponse attendue se paie cher : l'élève tape juste et
// l'appli lui dit faux, ou pire, apprend la coquille. Ce script rejoue donc
// chaque item contre son propre corrigé, et vérifie que les erreurs prévues ne
// recouvrent jamais une réponse acceptée.

import { UNIDADES, itemsDe } from '../js/data/unidades/index.js';
import { attendues, comparer, normaliser } from '../js/comparer.js';

const erreurs = [];
const signaler = (ou, quoi) => erreurs.push(`${ou} : ${quoi}`);

const TYPES = {
  mot: ['fr', 'es'],
  adjectif: ['fr', 'es'],
  forme: ['verbe', 'personne', 'es'],
  trou: ['phrase', 'verbe', 'es'],
  choix: ['phrase', 'options', 'es', 'explication'],
  pluriel: ['de', 'es', 'explication'],
  decrire: ['sujet', 'emoji', 'indices', 'consigne', 'modele', 'criteres'],
};
const BLOCS = ['vocabulaire', 'regle', 'piege', 'conjugaison'];
const BUDGET = 30;

const ids = new Set();

for (const u of UNIDADES) {
  // 1. Le budget de temps : la contrainte donnée par les parents.
  const total = u.etapes.reduce((s, e) => s + e.duree, 0) + u.interro.duree;
  if (total > BUDGET) signaler(u.id, `${total} minutes annoncées, au-delà des ${BUDGET}`);

  for (const e of u.etapes) {
    if (!e.fiche?.length) signaler(e.id, 'étape sans fiche');
    for (const b of e.fiche ?? []) {
      if (!BLOCS.includes(b.type)) signaler(e.id, `bloc de fiche inconnu « ${b.type} »`);
      if (b.type === 'conjugaison' && b.verbes.some((v) => v.formes.length !== 6)) signaler(e.id, 'une conjugaison sans ses six personnes');
    }
    if (!e.items?.length) signaler(e.id, 'étape sans question');

    for (const i of e.items) {
      const ou = `${e.id} › ${i.id}`;
      // 2. Identifiants uniques : la progression y est rangée.
      if (ids.has(i.id)) signaler(ou, 'identifiant en double');
      ids.add(i.id);

      // 3. Les champs du type.
      const champs = TYPES[i.type];
      if (!champs) { signaler(ou, `type inconnu « ${i.type} »`); continue; }
      for (const c of champs) if (i[c] == null || i[c] === '') signaler(ou, `champ « ${c} » manquant`);
      if (i.type === 'decrire') {
        const cles = i.criteres.map((c) => c.id);
        if (new Set(cles).size !== cles.length) signaler(ou, 'deux critères ont le même identifiant');
        continue;
      }

      // 4. Chaque réponse acceptée est jugée juste par le moteur.
      if (i.type === 'choix') {
        if (i.options.filter((o) => o === i.es).length !== 1) signaler(ou, 'la bonne réponse doit figurer une fois parmi les options');
        if (new Set(i.options).size !== i.options.length) signaler(ou, 'deux options identiques');
        if (!i.phrase.includes('___')) signaler(ou, 'phrase sans blanc « ___ »');
        continue;
      }
      if (i.type === 'trou' && !i.phrase.includes('___')) signaler(ou, 'phrase sans blanc « ___ »');
      for (const a of [i.es, i.fem, ...(i.accepte ?? [])].filter(Boolean)) {
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

      // 6. Une question de vocabulaire doit pouvoir servir de QCM à l'envers.
      if ((i.type === 'mot' || i.type === 'adjectif') && e.items.filter((x) => x.fr && x.id !== i.id).length < 2) {
        signaler(ou, 'pas assez de voisins pour un QCM à l\'envers');
      }
    }
  }

  // 7. La mini-interro tire dans des étapes qui existent, et qui ont assez de questions.
  for (const t of u.interro.tirage) {
    const e = u.etapes.find((x) => x.id === t.etape);
    if (!e) signaler(u.id, `mini-interro : étape inconnue « ${t.etape} »`);
    else if (e.items.filter((i) => i.type !== 'decrire').length < t.nombre) signaler(u.id, `mini-interro : pas assez de questions dans ${t.etape}`);
  }

  // 8. Une traduction française en double rendrait un QCM à l'envers ambigu.
  const frs = itemsDe(u).map((i) => i.fr).filter(Boolean);
  const doublons = frs.filter((f, k) => frs.indexOf(f) !== k);
  if (doublons.length) signaler(u.id, `traductions en double : ${doublons.join(', ')}`);
}

if (erreurs.length) {
  console.error(`✗ ${erreurs.length} problème(s) :`);
  for (const e of erreurs) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ Tout est bon : ${ids.size} questions dans ${UNIDADES.length} unité(s).`);
