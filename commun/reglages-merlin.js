// La page « Merlin et clé d'API », commune à toutes les applis du site.
//
// La clé est rangée une seule fois par navigateur (merlin.js, `eleve.ia.v1`)
// et toutes les applis la lisent : maths, français, langues, histoire, SVT.
// Cette page permet de la régler depuis n'importe laquelle — avant elle, il
// fallait savoir qu'elle se cachait dans les réglages de l'appli de maths.
//
// On n'enregistre qu'une clé vérifiée auprès du fournisseur : une clé fausse
// gardée en mémoire ferait échouer chaque correction en silence. La clé
// enregistrée n'est jamais réaffichée, seulement ses quatre derniers
// caractères.

import * as merlin from './merlin.js';

const page = document.getElementById('reglages');

const echapper = (texte) => String(texte ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

// Le retour vers l'appli d'où l'on vient (« 5eme/histoire-si/ ») : un chemin
// du site, jamais une adresse extérieure. Sans lui, l'accueil du site.
const retour = (() => {
  const r = new URLSearchParams(location.search).get('retour') ?? '';
  return /^[0-9a-z-]+\/[0-9a-z-]+\/$/.test(r) ? { href: `../${r}`, texte: '← Retour à l\'appli' } : { href: '../', texte: '← Toutes les applis' };
})();

let vue = { fournisseur: merlin.configIA().fournisseur, verif: null, enCours: false };

function rendre() {
  const c = merlin.configIA();
  const f = merlin.FOURNISSEURS[vue.fournisseur];
  const enregistree = c.cles[c.fournisseur] ?? '';
  const cout = merlin.lireCout();

  const etat = enregistree
    ? `<p class="etat est-ok">✓ Une clé ${echapper(merlin.FOURNISSEURS[c.fournisseur]?.nom)} est enregistrée sur cet appareil
         (…${echapper(enregistree.slice(-4))}). Toutes les applis du site l'utilisent.</p>`
    : `<p class="etat est-vide">Aucune clé sur cet appareil. Les applis fonctionnent quand même : les écrits se
         corrigent alors avec l'exemple, et les explications sont celles écrites d'avance.</p>`;

  page.innerHTML = `
    <a class="retour" href="${retour.href}">${retour.texte}</a>
    <h1>🎩 Merlin</h1>
    <p class="doux">Merlin corrige les écrits et explique les erreurs dans les applis de révision. Il a
      besoin d'une clé d'API. Elle se règle <strong>une fois par appareil et par navigateur</strong> :
      toutes les applis de ce site la partagent.</p>

    <section class="carte">
      ${etat}

      <label>Fournisseur</label>
      <div class="choix">
        ${Object.entries(merlin.FOURNISSEURS).map(([id, x]) => `
          <button type="button" class="${id === vue.fournisseur ? 'actif' : ''}" data-fournisseur="${id}">${echapper(x.nom)}</button>`).join('')}
      </div>

      <label for="cle">Clé d'API — à créer sur ${echapper(f.console)}</label>
      <input id="cle" type="password" autocomplete="off" spellcheck="false"
             placeholder="${enregistree && vue.fournisseur === c.fournisseur ? 'Colle une nouvelle clé pour la changer' : 'Colle la clé ici'}">

      <label for="modele">Modèle</label>
      <input id="modele" type="text" autocomplete="off" spellcheck="false" list="modeles"
             placeholder="${echapper(f.modeles[0].id)}" value="${echapper(vue.fournisseur === c.fournisseur ? c.modele : '')}">
      <datalist id="modeles">${f.modeles.map((m) => `<option value="${echapper(m.id)}">${echapper(m.libelle)}</option>`).join('')}</datalist>
      <p class="doux">Vide : ${echapper(f.modeles[0].libelle)}.</p>

      ${vue.verif ? `<p class="verdict ${vue.verif.ok ? 'est-ok' : 'est-faux'}" role="status">${echapper(vue.verif.ok
        ? 'La clé fonctionne : elle est enregistrée pour toutes les applis.'
        : vue.verif.message)}</p>` : ''}
      <button type="button" class="principal" data-action="verifier" ${vue.enCours ? 'disabled' : ''}>
        ${vue.enCours ? 'Vérification…' : 'Vérifier et enregistrer'}</button>
      ${enregistree ? '<button type="button" class="secondaire" data-action="retirer">Retirer la clé de cet appareil</button>' : ''}
    </section>

    ${cout.appels ? `<p class="doux">Merlin a fait ${cout.appels} appel${cout.appels > 1 ? 's' : ''} sur cet appareil —
      ${cout.entree.toLocaleString('fr')} jetons envoyés, ${cout.sortie.toLocaleString('fr')} reçus.</p>` : ''}`;
}

async function verifier() {
  if (vue.enCours) return;
  const cle = page.querySelector('#cle').value.trim();
  const modele = page.querySelector('#modele').value.trim();
  if (!cle) {
    vue = { ...vue, verif: { ok: false, message: 'Colle d\'abord la clé dans le champ.' } };
    return rendre();
  }
  vue = { ...vue, enCours: true, verif: null };
  rendre();
  const r = await merlin.verifierReglages({ fournisseur: vue.fournisseur, cle, modele });
  if (r.ok) merlin.definirConfig({ fournisseur: vue.fournisseur, cle, modele });
  vue = { ...vue, enCours: false, verif: r };
  rendre();
}

page.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b || b.disabled) return;
  if (b.dataset.fournisseur) {
    vue = { ...vue, fournisseur: b.dataset.fournisseur, verif: null };
    return rendre();
  }
  if (b.dataset.action === 'verifier') return verifier();
  if (b.dataset.action === 'retirer') {
    if (!window.confirm('Retirer la clé ? Merlin ne corrigera plus sur cet appareil, dans aucune appli.')) return;
    merlin.definirConfig({ cle: '' });
    vue = { ...vue, verif: null };
    rendre();
  }
});

page.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.matches('input')) verifier();
});

rendre();
