import ITEMS, { DECOUVERTE, COURS, METHODE, ENTRAINEMENT, PROBLEMES, AUTO_EVALUATION } from '../js/data/items/ch01/sf4.js';
import { validerItem, hachageItem, fenetreDeTolerance, evaluerCalcul } from '../js/item.js';
import { rendreFigure, toleranceDeLecture } from '../js/schema.js';
import { rationnelVersTexte } from '../js/unites.js';
import { PIEGES } from '../js/data/pieges/index.js';

console.log('== effectifs ==');
console.log('E', ENTRAINEMENT.length, 'P', PROBLEMES.length, 'T', AUTO_EVALUATION.length, 'total', ITEMS.length);
console.log('COURS', COURS.length, 'METHODE etapes', METHODE.etapes.length);

console.log('\n== validerItem ==');
let n = 0;
for (const it of ITEMS) {
  const v = validerItem(it);
  if (!v.ok) { n++; for (const r of v.refus) console.log('  X', it.id, '[' + r.code + ']', r.message); }
}
console.log(n === 0 ? '  aucun refus' : '  ' + n + ' items refuses');

console.log('\n== compte ==');
const cnt = (f) => { const m = {}; for (const i of ITEMS) m[f(i)] = (m[f(i)] || 0) + 1; return m; };
console.log('classes', cnt(i => i.classe));
console.log('cercles', cnt(i => i.cercle));
console.log('paliers', cnt(i => i.palier));
console.log('registres', cnt(i => i.registre));
console.log('types', cnt(i => i.type));
const c = ITEMS.filter(i => i.classe === 'C').length;
console.log('classe C', c, '/', ITEMS.length, 'tiers =', (ITEMS.length / 3).toFixed(2));

console.log('\n== hashes classe C ==');
for (const it of ITEMS) if (it.classe === 'C') console.log(' ', it.id, it.relu?.hash, '==', hachageItem(it), it.relu?.hash === hachageItem(it) ? 'OK' : 'FAUX');

console.log('\n== calculs rejoues ==');
for (const it of ITEMS) {
  if (!it.calcul) continue;
  const r = evaluerCalcul(it.calcul, { donnees: it.donnees ?? {} });
  console.log(' ', it.id, r.ok ? rationnelVersTexte(r.reponse.q) : 'ERREUR ' + r.code + ' ' + r.detail, '| attendu', JSON.stringify(it.reponse.valeur), it.reponse.unite);
  for (const d of it.distracteurs ?? []) {
    if (!d.modeleErrone) continue;
    const x = evaluerCalcul(d.modeleErrone.calcul, { donnees: it.donnees ?? {} });
    console.log('      distr', d.id, x.ok ? rationnelVersTexte(x.reponse.q) : 'ERREUR', '| declare', JSON.stringify(d.valeur));
  }
  for (const me of it.modelesErrones ?? []) {
    const x = evaluerCalcul(me.calcul, { donnees: it.donnees ?? {} });
    console.log('      modele', me.id, x.ok ? rationnelVersTexte(x.reponse.q) : 'ERREUR');
  }
}

console.log('\n== tolerances ==');
for (const it of ITEMS) {
  if (it.reponse?.semantique !== 'tolerante') continue;
  const f = fenetreDeTolerance(it);
  const demi = it.figure?.sorte === 'graphique' ? toleranceDeLecture(it.figure.donnees?.y) : null;
  console.log(' ', it.id, 'demi-grad', JSON.stringify(demi), 'fenetre', f ? rationnelVersTexte(f.bas) + ' .. ' + rationnelVersTexte(f.haut) : null);
}

console.log('\n== figures ==');
for (const it of ITEMS) {
  if (!it.figure) continue;
  const t = rendreFigure(it.figure);
  console.log(t.ok ? '  ok ' : '  X  ', it.id, it.figure.sorte, t.ok ? '' : t.raison + ' ' + JSON.stringify(t.details));
}

console.log('\n== contextes en double ==');
const ctx = {};
for (const it of ITEMS) (ctx[it.contexteDeSurface] ??= []).push(it.id);
for (const [k, v] of Object.entries(ctx)) if (v.length > 1) console.log('  double:', k, v);

console.log('\n== ids en double ==');
const ids = {};
for (const it of ITEMS) (ids[it.id] ??= []).push(1);
for (const [k, v] of Object.entries(ids)) if (v.length > 1) console.log('  double:', k);

console.log('\n== pieges cites ==');
const pcnt = {};
for (const it of ITEMS) {
  if (it.piege) pcnt['ITEM:' + it.piege] = (pcnt['ITEM:' + it.piege] || 0) + 1;
  for (const d of it.distracteurs ?? []) pcnt[d.piege] = (pcnt[d.piege] || 0) + 1;
  for (const j of it.justifications ?? []) if (j.piege) pcnt[j.piege] = (pcnt[j.piege] || 0) + 1;
  for (const m of it.modelesErrones ?? []) if (m.piege) pcnt[m.piege] = (pcnt[m.piege] || 0) + 1;
}
console.log(pcnt);
console.log('inconnus:', Object.keys(pcnt).filter(k => !k.startsWith('ITEM:') && !PIEGES[k]));
