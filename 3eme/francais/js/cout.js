// Ce que coûte chaque appel au modèle, pour l'afficher à Denis.
//
// Tarifs en dollars par MILLION de tokens, vérifiés sur les pages officielles
// (Anthropic) et une source concordante (OpenAI) en août 2026. À revérifier si
// les tarifs bougent — un compteur faux est pire qu'un compteur absent.
//
// Deux comptabilités différentes, à ne pas mélanger :
//   Anthropic — input_tokens ne compte QUE le non-caché ; le cache lu et le
//               cache écrit sont des champs séparés, facturés à part.
//   OpenAI    — input_tokens INCLUT déjà les tokens cachés ; on retranche donc
//               cached_tokens pour obtenir le « plein tarif ».

const TARIFS = {
  'claude-opus-5':  { in: 5,    out: 25,   cacheLu: 0.50, cacheEcrit: 6.25 },
  'claude-fable-5': { in: 10,   out: 50,   cacheLu: 1,    cacheEcrit: 12.50 },
  'gpt-5.6-sol':    { in: 5,    out: 30,   cacheLu: 0.50, cacheEcrit: 6.25 },
  'gpt-5.6-terra':  { in: 2,    out: 12,   cacheLu: 0.20, cacheEcrit: 2.50 },
  'gpt-5.6-luna':   { in: 0.20, out: 1.20, cacheLu: 0.02, cacheEcrit: 0.25 },
};

// Sonnet 5 change de tarif au 1ᵉʳ septembre 2026 : le compteur doit choisir
// selon la date de l'appel, sinon il sous-facture dès la rentrée.
const BASCULE_SONNET = Date.UTC(2026, 8, 1); // 2026-09-01
const tarifSonnet5 = (date) =>
  date.getTime() < BASCULE_SONNET
    ? { in: 2, out: 10, cacheLu: 0.20, cacheEcrit: 2.50 }
    : { in: 3, out: 15, cacheLu: 0.30, cacheEcrit: 3.75 };

export function tarif(modele, date = new Date()) {
  if (modele === 'claude-sonnet-5') return tarifSonnet5(date);
  return TARIFS[modele] ?? null;
}

/** Coût d'un appel en dollars, à partir de son objet `usage`. 0 si modèle inconnu. */
export function coutAppel(usage, modele, date = new Date()) {
  const t = tarif(modele, date);
  if (!t || !usage) return 0;
  const M = 1e6;

  if (String(modele).startsWith('claude')) {
    return (
      (usage.input_tokens ?? 0) * t.in +
      (usage.cache_read_input_tokens ?? 0) * t.cacheLu +
      (usage.cache_creation_input_tokens ?? 0) * t.cacheEcrit +
      (usage.output_tokens ?? 0) * t.out
    ) / M;
  }

  const details = usage.input_tokens_details ?? {};
  const caches = details.cached_tokens ?? 0;
  const ecrits = details.cache_write_tokens ?? 0;
  const pleins = Math.max(0, (usage.input_tokens ?? 0) - caches); // cached ⊂ input
  return (
    pleins * t.in +
    caches * t.cacheLu +
    ecrits * t.cacheEcrit +
    (usage.output_tokens ?? 0) * t.out // inclut déjà les tokens de raisonnement
  ) / M;
}

/** Tokens d'entrée / sortie, tous fournisseurs, pour l'affichage. */
export function tokensDe(usage, modele) {
  if (!usage) return { entree: 0, sortie: 0 };
  if (String(modele).startsWith('claude')) {
    return {
      entree: (usage.input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0) + (usage.cache_creation_input_tokens ?? 0),
      sortie: usage.output_tokens ?? 0,
    };
  }
  return { entree: usage.input_tokens ?? 0, sortie: usage.output_tokens ?? 0 };
}

/** Le coût, écrit court : « < 0,1 ¢ », « 3,2 ¢ », « 25 ¢ », « 1,05 $ ». */
export function formaterCout(dollars) {
  if (!dollars) return '0 ¢';
  const cents = dollars * 100;
  if (cents < 0.1) return '< 0,1 ¢'; // un appel isolé est trop petit pour un chiffre honnête
  if (dollars < 1) return `${cents.toFixed(cents < 10 ? 1 : 0)} ¢`.replace('.', ',');
  return `${dollars.toFixed(2).replace('.', ',')} $`;
}

/** Un nombre de tokens, écrit court : « 840 », « 12,3 k », « 1,2 M ». */
export function formaterTokens(n) {
  if (n < 1000) return String(n);
  if (n < 1e6) return `${(n / 1000).toFixed(1).replace('.', ',')} k`;
  return `${(n / 1e6).toFixed(1).replace('.', ',')} M`;
}
