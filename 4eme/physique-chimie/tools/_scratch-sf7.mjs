import ITEMS from '../js/data/items/ch01/sf7.js';
import { validerItem, hachageItem } from '../js/item.js';

console.log('items:', ITEMS.length);
let n = 0;
for (const it of ITEMS) {
  const v = validerItem(it);
  if (!v.ok) {
    n++;
    console.log(`\n✗ ${it.id}`);
    for (const r of v.refus) console.log(`   [${r.code}] ${r.message}`);
  }
}
console.log(`\n${n} item(s) refuse(s) sur ${ITEMS.length}`);
for (const it of ITEMS) if (it.classe === 'C') console.log(it.id, 'hash calcule =', hachageItem(it), '| declare =', it.relu?.hash);
