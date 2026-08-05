// L'écran de sauvegarde, identique dans toutes les applis du dépôt.
//
// Écrit en DOM plutôt qu'en gabarit : il y a des états (fichier choisi ou non,
// permission perdue, restauration en cours) et un rendu unique évite de les
// rejouer à la main dans chaque appli.

import * as sauvegarde from './sauvegarde.js';

const bouton = (texte, classe = 'bouton') => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = classe;
  b.textContent = texte;
  return b;
};

/**
 * Monte la section « Sauvegarde » dans `conteneur`.
 *
 * `surRestauration` est appelé après une restauration réussie : chaque appli
 * décide quoi faire (ici, recharger — les modules ont déjà lu le stockage en
 * mémoire, les rafraîchir un à un serait plus fragile qu'un rechargement).
 */
export function monterSauvegarde(conteneur, { surRestauration } = {}) {
  const section = document.createElement('section');
  section.className = 'sauv';
  conteneur.append(section);

  const etat = document.createElement('p');
  etat.className = 'sauv-etat';
  etat.setAttribute('role', 'status');

  const dire = (texte, sorte = '') => {
    etat.textContent = texte;
    etat.className = `sauv-etat ${sorte}`;
  };

  const rendre = async () => {
    section.replaceChildren();
    section.append(document.createRange().createContextualFragment(`
      <h2 class="titre-section">Sauvegarde</h2>
      <p class="sauv-note">
        Toute la progression vit dans ce navigateur. La vider, changer d'appareil
        ou réinstaller Chrome efface tout : garde un fichier de sauvegarde.
        Il couvre <strong>toutes les applis de révision</strong> de cet appareil.
      </p>
      <p class="sauv-note sauv-note--discrete">
        La clé d'API n'est jamais mise dans le fichier — elle se ressaisit en dix secondes.
      </p>`));

    const actions = document.createElement('div');
    actions.className = 'sauv-actions';

    const enregistrer = bouton('Sauvegarder maintenant', 'bouton bouton--principal');
    enregistrer.addEventListener('click', () => {
      sauvegarde.telecharger();
      dire('Fichier téléchargé. Range-le dans ton Drive ou sur une clé.', 'est-juste');
    });

    const restaurer = bouton('Restaurer un fichier');
    const champFichier = document.createElement('input');
    champFichier.type = 'file';
    champFichier.accept = 'application/json,.json';
    champFichier.className = 'sauv-fichier';
    restaurer.addEventListener('click', () => champFichier.click());
    champFichier.addEventListener('change', async () => {
      const fichier = champFichier.files?.[0];
      champFichier.value = '';
      if (!fichier) return;
      if (!confirm('Remplacer la progression de cet appareil par celle du fichier ?')) return;

      dire('Restauration…');
      const r = await sauvegarde.restaurerDepuisFichier(fichier);
      if (!r.ok) return dire(`✗ ${r.message}`, 'est-faux');
      dire(`✓ ${r.ecrites} éléments restaurés. Rechargement…`, 'est-juste');
      surRestauration?.();
    });

    actions.append(enregistrer, restaurer, champFichier);
    section.append(actions);

    // Tout ce qui suit peut attendre IndexedDB : la ligne d'état est posée
    // maintenant, sinon `dire()` écrirait dans un élément encore détaché.
    const placeAuto = document.createElement('div');
    section.append(placeAuto, etat);

    // --- Sauvegarde automatique (Chromium seulement) ---
    if (sauvegarde.autoDisponible()) {
      const auto = document.createElement('div');
      auto.className = 'sauv-auto';
      const choisi = await sauvegarde.fichierAutoChoisi();

      const titre = document.createElement('p');
      titre.className = 'sauv-auto-titre';
      titre.textContent = 'Sauvegarde automatique';
      const explication = document.createElement('p');
      explication.className = 'sauv-note';
      explication.textContent = choisi
        ? `Réécrit à la fin de chaque séance dans « ${choisi.nom} ».`
        : "Choisis un fichier une bonne fois — par exemple dans ton dossier Google Drive : "
          + "l'appli le réécrira toute seule à la fin de chaque séance, et Drive s'occupe du reste.";
      auto.append(titre, explication);

      const actionsAuto = document.createElement('div');
      actionsAuto.className = 'sauv-actions';

      const choisirBtn = bouton(choisi ? 'Changer de fichier' : 'Choisir le fichier');
      choisirBtn.addEventListener('click', async () => {
        dire('En attente du choix de fichier…');
        const r = await sauvegarde.choisirFichierAuto();
        if (r.annule) return dire('');
        if (!r.ok) return dire(`✗ ${r.message}`, 'est-faux');
        dire(`✓ Sauvegarde automatique activée dans « ${r.nom} ».`, 'est-juste');
        rendre();
      });
      actionsAuto.append(choisirBtn);

      if (choisi) {
        const arreter = bouton('Désactiver', 'lien-discret');
        arreter.addEventListener('click', async () => {
          await sauvegarde.oublierFichierAuto();
          dire('Sauvegarde automatique désactivée.');
          rendre();
        });
        actionsAuto.append(arreter);
      }

      auto.append(actionsAuto);
      placeAuto.append(auto);
    } else {
      placeAuto.append(document.createRange().createContextualFragment(`
        <p class="sauv-note sauv-note--discrete">
          La sauvegarde automatique dans un fichier n'existe que sur Chrome et Edge.
          Ici, pense à télécharger le fichier de temps en temps.
        </p>`));
    }
  };

  rendre();
}
