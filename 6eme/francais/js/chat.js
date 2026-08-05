// Un panneau de discussion avec Merlin, réutilisé à deux endroits : sous une
// erreur (ancré à l'exercice) et depuis l'écran « Demander à Merlin ».
//
// Tout ce que Merlin renvoie passe par rendu.js — jamais d'innerHTML sur son
// texte. Les questions ET les réponses sont stockées (store) pour l'écran
// parents. Le coût de chaque appel est déjà journalisé par ia.discuter ; on
// prévient l'en-tête qu'il doit se rafraîchir via l'événement « cout-maj ».

import * as ia from './ia.js';
import * as store from './store.js';
import { rendreReponseMerlin } from './rendu.js';

// Garde-fou souple : borne le coût d'un emballement sans brider une vraie
// discussion. Au-delà, on invite à reprendre plus tard.
const MAX_MESSAGES = 30;

const REFLEXION =
  '<span class="reflexion"><span class="reflexion-chapeau" aria-hidden="true">🎩</span>' +
  '<span>Merlin réfléchit<span class="points"><span>.</span><span>.</span><span>.</span></span></span></span>';

/**
 * Monte un chat dans `conteneur`. `contexte` (optionnel) décrit l'exercice en
 * cours pour ancrer la discussion ; `profilTexte` est le profil figé de l'élève.
 */
export function monterChat({ conteneur, contexte = null, profilTexte, pleinePage = false }) {
  let convId = null;                 // créé au premier envoi, pas avant
  const messages = [];               // { role: 'eleve' | 'merlin', texte }

  conteneur.classList.add('chat');
  // Sur l'écran dédié, la discussion prend la hauteur libre et le composeur
  // reste en bas ; sous une correction, le chat s'insère dans le flux.
  if (pleinePage) conteneur.classList.add('chat--page');
  const journal = document.createElement('div');
  journal.className = 'chat-journal';
  const form = document.createElement('form');
  form.className = 'chat-saisie';

  const champ = document.createElement('input');
  champ.type = 'text';
  champ.autocomplete = 'off';
  champ.placeholder = 'Pose ta question à Merlin…';
  champ.setAttribute('aria-label', 'Ta question à Merlin');
  // Flèche plutôt que « Envoyer » : c'est le geste universel des messageries,
  // et ça laisse toute la largeur au champ de saisie.
  const envoi = document.createElement('button');
  envoi.type = 'submit';
  envoi.className = 'chat-envoi';
  envoi.setAttribute('aria-label', 'Envoyer');
  envoi.textContent = '↑';
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
        reponse.replaceChildren(rendreReponseMerlin(texte));
        journal.scrollTop = journal.scrollHeight;
      },
    });

    if (r.disponible) {
      reponse.replaceChildren(rendreReponseMerlin(r.texte));
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
