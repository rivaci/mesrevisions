// Ce qu'un exercice dit de lui-même, quel que soit son type.
//
// Ces deux fonctions sont dans leur propre fichier pour une raison précise :
// elles doivent être vérifiables sur les 268 exercices sans navigateur.
//
// Le « La réponse était : undefined » qui a atteint la production venait de là.
// Le code lisait `exercice.attendu ?? exercice.texte` — deux champs que le type
// « toucher » ne possède pas, sa réponse étant un indice dans un tableau de
// mots. Enfoui dans du code qui a besoin du DOM, ce trou n'était atteignable
// que par un clic sur le bon exercice de la bonne séance. Sorti ici, il devient
// une boucle sur tout le contenu dans tools/verifier-contenu.mjs.

/** La phrase telle qu'on peut la lire à plat — pour le journal et pour l'IA. */
export const enonceLisible = (ex) => {
  if (ex.type === 'toucher') return ex.mots.join(' ');
  if (ex.type === 'dictee') return ex.texte;
  const phrase = `${ex.avant ?? ''}___${ex.apres ?? ''}`.trim();
  // Le verbe entre parenthèses n'existe que pour le « completer » : c'est
  // l'infinitif à conjuguer. Un qcm sans lui donnait « … ( ) » au modèle.
  return ex.verbe ? `${phrase} (${ex.verbe})` : phrase;
};

/**
 * Ce que l'élève aurait dû répondre.
 *
 * C'est affiché tel quel dans la correction, et envoyé à l'IA comme réponse
 * attendue. Une valeur vide n'est donc pas un détail d'affichage : le modèle
 * expliquerait une erreur sans savoir ce qui était juste.
 */
export const reponseAttendue = (ex) => {
  if (ex.type === 'toucher') return (ex.attendus ?? []).map((i) => ex.mots?.[i]).join(' ');
  return ex.attendu ?? ex.texte ?? '';
};
