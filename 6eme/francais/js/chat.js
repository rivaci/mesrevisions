// Un panneau de discussion avec Merlin, réutilisé à deux endroits : sous une
// erreur (ancré à l'exercice) et depuis l'écran « Demander à Merlin ».
//
// Tout ce que Merlin renvoie passe par rendu.js — jamais d'innerHTML sur son
// texte. Les questions ET les réponses sont stockées (store) pour l'écran
// parents. Le coût de chaque appel est déjà journalisé par ia.discuter ; on
// prévient l'en-tête qu'il doit se rafraîchir via l'événement « cout-maj ».

import * as ia from './ia.js';
import * as store from './store.js';
import * as rendu from './rendu.js';

// Garde-fou souple : borne le coût d'un emballement sans brider une vraie
// discussion. Au-delà, on invite à reprendre plus tard.
const MAX_MESSAGES = 30;

/** Rend une réponse de Merlin : markdown + schémas ```schema {…}``` que NOUS traçons. */
function rendreReponse(texte) {
  const fragment = document.createDocumentFragment();
  const motif = /```schema\s*([\s\S]*?)```/g;
  let dernier = 0;
  let m;
  while ((m = motif.exec(texte)) !== null) {
    const avant = texte.slice(dernier, m.index);
    if (avant.trim()) fragment.append(rendu.rendreMarkdown(avant));
    try {
      fragment.append(rendu.schemaPhrase(JSON.parse(m[1])));
    } catch { /* JSON encore incomplet en cours de streaming : on saute ce bloc */ }
    dernier = motif.lastIndex;
  }
  // Ne pas afficher un bloc ```schema ouvert mais pas encore fermé (streaming).
  const reste = texte.slice(dernier).replace(/```schema[\s\S]*$/, '');
  if (reste.trim()) fragment.append(rendu.rendreMarkdown(reste));
  return fragment;
}

const REFLEXION =
  '<span class="reflexion"><span class="reflexion-chapeau" aria-hidden="true">🎩</span>' +
  '<span>Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></span></span>';

/**
 * Monte un chat dans `conteneur`. `contexte` (optionnel) décrit l'exercice en
 * cours pour ancrer la discussion ; `profilTexte` est le profil figé de l'élève.
 */
export function monterChat({ conteneur, contexte = null, profilTexte }) {
  let convId = null;                 // créé au premier envoi, pas avant
  const messages = [];               // { role: 'eleve' | 'merlin', texte }

  conteneur.classList.add('chat');
  const journal = document.createElement('div');
  journal.className = 'chat-journal';
  const form = document.createElement('form');
  form.className = 'chat-saisie';

  const champ = document.createElement('input');
  champ.type = 'text';
  champ.autocomplete = 'off';
  champ.placeholder = 'Pose ta question à Merlin…';
  champ.setAttribute('aria-label', 'Ta question à Merlin');
  const envoi = document.createElement('button');
  envoi.type = 'submit';
  envoi.className = 'bouton bouton--principal';
  envoi.textContent = 'Envoyer';
  form.append(champ, envoi);
  conteneur.append(journal, form);

  const bulle = (role) => {
    const el = document.createElement('div');
    el.className = `bulle bulle--${role}`;
    journal.append(el);
    journal.scrollTop = journal.scrollHeight;
    return el;
  };

  async function envoyer(question) {
    const q = question.trim();
    if (!q) return;
    if (messages.length >= MAX_MESSAGES) {
      bulle('merlin').textContent = 'On a déjà bien discuté ! Garde tes questions pour la prochaine fois 😊';
      champ.disabled = true;
      return;
    }

    champ.value = '';
    champ.disabled = true;
    envoi.disabled = true;

    bulle('eleve').textContent = q;
    messages.push({ role: 'eleve', texte: q });
    if (!convId) convId = store.nouvelleConversation(contexte);
    store.ajouterMessage(convId, 'eleve', q);

    const reponse = bulle('merlin');
    reponse.innerHTML = REFLEXION;

    const historique = messages.map((m) => ({
      role: m.role === 'merlin' ? 'assistant' : 'user',
      texte: m.texte,
    }));

    const r = await ia.discuter({
      profilTexte,
      contexte,
      historique,
      onDelta: (texte) => {
        reponse.replaceChildren(rendreReponse(texte));
        journal.scrollTop = journal.scrollHeight;
      },
    });

    if (r.disponible) {
      reponse.replaceChildren(rendreReponse(r.texte));
      messages.push({ role: 'merlin', texte: r.texte });
      store.ajouterMessage(convId, 'merlin', r.texte);
    } else {
      reponse.textContent = "Merlin n'est pas joignable là. Réessaie dans un instant ?";
    }

    window.dispatchEvent(new CustomEvent('cout-maj'));
    champ.disabled = false;
    envoi.disabled = false;
    champ.focus();
  }

  form.addEventListener('submit', (evenement) => {
    evenement.preventDefault();
    envoyer(champ.value);
  });
  champ.focus();
}
