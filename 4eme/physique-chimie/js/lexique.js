// Le lexique d'affichage — la seule table qui traduit une CLÉ du corpus en
// français lisible par un élève de treize ans.
//
// ── Pourquoi ce fichier a dû être écrit, et pourquoi il est fermé ───────────
//
// Le corpus déclare ses réponses par des identifiants : `melange-heterogene`,
// `on-ne-peut-pas-repondre-il-manque-une-grandeur`, `plus-leger`. Ce sont des
// clés — elles servent à comparer une réponse, pas à être lues. La passe
// précédente a eu raison de refuser de les afficher : « melange heterogene »
// est du français sans accents servi à un enfant, et une expression régulière
// qui remettrait les accents écrirait du contenu depuis la couche d'affichage.
//
// Mais sans traduction, le DOUBLE QCM n'existe pas : sa première moitié — la
// réponse, avant la justification — se choisit parmi ces clés. Le lexique est
// donc la décision de contenu qui manquait, prise ici, en un seul endroit, et
// écrite à la main clé par clé plutôt que dérivée.
//
// Trois règles le tiennent :
//
//   1. **Il est FERMÉ.** Une clé absente ne se rattrape pas : `libelle` rend
//      `null`, et l'appelant affiche « il manque le libellé de cette réponse »
//      plutôt qu'un mot mal orthographié. Un lexique qui devine en dernier
//      recours redevient l'expression régulière qu'on a refusée, avec une
//      étape de plus.
//   2. **Il ne dit rien de plus que la clé.** Aucun libellé n'ajoute
//      d'information, ne corrige un énoncé, ni ne souffle la réponse : ce sont
//      les mêmes mots, avec leurs accents et leurs majuscules.
//   3. **Il ne trie pas.** L'ordre des propositions vient de l'item, et le
//      mélange des justifications vient de `app.js` — pas d'ici.
//
// `tools/tester-reponse.mjs` refuse le corpus dont une clé de `choixPossibles`
// manquerait à cette table : c'est ce qui empêche la table de vieillir en
// silence quand un chapitre s'ajoute.

/**
 * Les clés de `reponse.choixPossibles`, telles qu'elles se lisent à l'écran.
 *
 * Rangées par famille de sens plutôt que par ordre alphabétique : c'est comme
 * cela qu'on repère qu'une variante manque — `un-corps-pur` et `corps-pur`
 * coexistent dans le corpus, et les voir côte à côte est le seul moyen de ne
 * pas en oublier une.
 */
export const LIBELLES = Object.freeze({
  // ── Oui / non / on ne peut pas savoir ────────────────────────────────────
  oui: 'Oui',
  non: 'Non',
  'on-ne-peut-pas-savoir': 'On ne peut pas savoir',
  'on-ne-peut-pas-conclure': 'On ne peut pas conclure',
  'oui-on-peut-repondre': 'Oui, on peut répondre',
  'seulement-si-la-balance-est-precise': 'Seulement si la balance est précise',

  // ── Corps pur et mélange ─────────────────────────────────────────────────
  'corps-pur': 'Un corps pur',
  'un-corps-pur': 'Un corps pur',
  'un-melange': 'Un mélange',
  'oui-c-est-un-corps-pur': "Oui, c'est un corps pur",
  'non-c-est-un-melange': "Non, c'est un mélange",
  homogene: 'Homogène',
  heterogene: 'Hétérogène',
  'melange-homogene': 'Un mélange homogène',
  'melange-heterogene': 'Un mélange hétérogène',

  // ── Ce qu'on voit dans le récipient ──────────────────────────────────────
  'une-seule-couche': 'Une seule couche',
  'une-seule-couche-transparente': 'Une seule couche transparente',
  'une-seule-couche-verte': 'Une seule couche verte',
  'deux-couches': 'Deux couches',
  'deux-couches-separees': 'Deux couches séparées',
  'deux-couches-a-nouveau': 'Deux couches, à nouveau',
  'deux-couches-puis-une-seule': 'Deux couches, puis une seule',
  'trois-couches': 'Trois couches',
  'les-deux-couches-reviennent': 'Les deux couches reviennent',
  'un-seul-liquide': 'Un seul liquide',
  'un-seul-liquide-transparent': 'Un seul liquide transparent',
  'un-liquide-trouble-qui-le-reste': 'Un liquide trouble, qui le reste',
  'toujours-un-liquide-trouble': 'Toujours un liquide trouble',
  'du-sirop-solide-au-fond': 'Du sirop solide au fond',
  'des-cristaux-au-fond': 'Des cristaux au fond',
  'toute-la-solution-devient-solide': 'Toute la solution devient solide',
  'rien-de-nouveau': 'Rien de nouveau',
  'deux-couches-le-white-spirit-au-dessus': 'Deux couches, le white-spirit au-dessus',
  'deux-couches-le-white-spirit-en-dessous': 'Deux couches, le white-spirit en dessous',
  'une-nappe-etalee-en-surface': 'Une nappe étalée en surface',
  'un-depot-au-fond-du-bassin': 'Un dépôt au fond du bassin',
  'plus-rien-de-visible': 'Plus rien de visible',

  // ── Où est passée la matière ─────────────────────────────────────────────
  'il-n-existe-plus': "Il n'existe plus",
  'dans-l-air-de-la-piece': "Dans l'air de la pièce",
  'au-fond-de-la-bouteille': 'Au fond de la bouteille',

  // ── Ce que la balance affiche ────────────────────────────────────────────
  plus: 'Plus',
  autant: 'Autant',
  moins: 'Moins',
  'plus-leger': 'Plus léger',
  'la-meme-masse': 'La même masse',
  'plus-lourd': 'Plus lourd',

  // ── Nature de la transformation ──────────────────────────────────────────
  'une-combustion': 'Une combustion',
  'transformation-chimique': 'Une transformation chimique',
  'une-transformation-chimique': 'Une transformation chimique',
  'la-dissolution-d-un-solide': "La dissolution d'un solide",
  'un-melange-de-deux-liquides-non-miscibles': 'Un mélange de deux liquides non miscibles',

  // ── Températures de changement d'état ────────────────────────────────────
  'oui-a-la-meme-temperature': 'Oui, à la même température',
  'non-le-gros-morceau-fond-plus-haut': 'Non, le gros morceau fond plus haut',
  'non-le-petit-morceau-fond-plus-haut': 'Non, le petit morceau fond plus haut',

  // ── Que faire d'une mesure aberrante ─────────────────────────────────────
  'la-moyenne-des-six': 'La moyenne des six',
  'la-moyenne-des-cinq-qui-se-tiennent': 'La moyenne des cinq qui se tiennent',
  'la-plus-petite-des-six': 'La plus petite des six',
  'on-la-garde-comme-les-autres': 'On la garde comme les autres',
  'on-la-signale-et-on-trace-sans-elle': 'On la signale, et on trace sans elle',
  'on-l-efface-du-compte-rendu': "On l'efface du compte rendu",
  'on-refait-toute-la-serie': 'On refait toute la série',
  'la-quatrieme-mesure-est-a-part-je-l-ecris-et-je-calcule-sans-elle':
    "La quatrième mesure est à part : je l'écris, et je calcule sans elle",
  'j-efface-la-quatrieme-mesure-de-mon-tableau': "J'efface la quatrième mesure de mon tableau",
  'celui-du-binome-a': 'Celui du binôme A',
  'celui-du-binome-b': 'Celui du binôme B',
  'les-deux': 'Les deux',
  'aucun-des-deux': 'Aucun des deux',

  // ── Données superflues, données manquantes ───────────────────────────────
  'je-donne-la-valeur': 'Je donne la valeur',
  'je-donne-la-valeur-en-supposant-un-litre': 'Je donne la valeur, en supposant un litre',
  'je-peux-repondre-voici-les-grandeurs-utiles': 'Je peux répondre : voici les grandeurs utiles',
  'on-ne-peut-pas-repondre-il-manque-une-grandeur': "On ne peut pas répondre : il manque une grandeur",
  'non-il-manque-une-grandeur': 'Non, il manque une grandeur',
  'non-il-y-a-trop-de-grandeurs': 'Non, il y a trop de grandeurs',
  'rien-de-plus-la-valeur-suffit': 'Rien de plus : la valeur suffit',
});

/** Le libellé d'une clé, ou `null` si le lexique ne la connaît pas. */
export const libelle = (cle) => LIBELLES[cle] ?? null;

/**
 * Les clés d'une liste que le lexique ne sait pas dire.
 *
 * Exportée pour l'outil de contrôle ET pour l'application : celle-ci refuse
 * d'afficher un jeu de propositions incomplet plutôt que d'en afficher trois
 * sur quatre, ce qui donnerait la réponse par élimination.
 */
export const clesInconnues = (cles = []) => cles.filter((c) => !(c in LIBELLES));
