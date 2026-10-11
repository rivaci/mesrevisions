// Entendre le terme : la synthèse vocale du navigateur, en anglais britannique
// (le cours dit « England », « recognise »).
//
// Les voix se chargent après la page dans Chrome : tant que la liste est vide,
// on garde le bouton, et le navigateur choisit lui-même une voix pour « en-GB ».
// On ne le retire que si, liste chargée, aucune voix anglaise n'existe — une
// voix française qui lit « heir » apprendrait une fausse prononciation.

const synthese = () => (typeof window !== 'undefined' ? window.speechSynthesis : undefined);

const voixAnglaise = () => {
  const toutes = synthese()?.getVoices() ?? [];
  return toutes.find((v) => v.lang === 'en-GB')
    ?? toutes.find((v) => /^en([-_]|$)/i.test(v.lang))
    ?? null;
};

export function voixPossible() {
  const s = synthese();
  if (!s) return false;
  return s.getVoices().length === 0 || Boolean(voixAnglaise());
}

export function parler(texte) {
  const s = synthese();
  if (!s) return;
  s.cancel();
  const u = new SpeechSynthesisUtterance(String(texte).replace(/…/g, ''));
  u.lang = 'en-GB';
  const v = voixAnglaise();
  if (v) u.voice = v;
  u.rate = 0.95;
  s.speak(u);
}
