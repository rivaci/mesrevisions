// Entendre le mot : la synthèse vocale du navigateur, en espagnol d'Espagne
// (le manuel dit « vosotros », « gafas », « zapatillas »).
//
// Les voix se chargent après la page dans Chrome : tant que la liste est vide,
// on garde le bouton, et le navigateur choisit lui-même une voix pour « es-ES ».
// On ne le retire que si, liste chargée, aucune voix espagnole n'existe — une
// voix française qui lit « cejas » apprendrait une fausse prononciation.

const synthese = () => (typeof window !== 'undefined' ? window.speechSynthesis : undefined);

const voixEspagnole = () => {
  const toutes = synthese()?.getVoices() ?? [];
  return toutes.find((v) => v.lang === 'es-ES')
    ?? toutes.find((v) => /^es([-_]|$)/i.test(v.lang))
    ?? null;
};

export function voixPossible() {
  const s = synthese();
  if (!s) return false;
  return s.getVoices().length === 0 || Boolean(voixEspagnole());
}

export function parler(texte) {
  const s = synthese();
  if (!s) return;
  s.cancel();
  // « alto ≠ bajo » se lit « alto, bajo » : le signe n'est pas un mot.
  const u = new SpeechSynthesisUtterance(String(texte).replace(/≠/g, ',').replace(/…/g, ''));
  u.lang = 'es-ES';
  const v = voixEspagnole();
  if (v) u.voice = v;
  u.rate = 0.9;
  s.speak(u);
}
