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
//
// ── Le second emploi : les OBJETS FORMELS ──────────────────────────────────
//
// Un `reponse.objetFormel` n'est pas un jeu de propositions : c'est un objet à
// COMPOSER — un classement à remplir, une grille de particules, des étapes à
// remettre en ordre, un couple (lieu, forme). Ses champs portent, eux aussi,
// des identifiants : `corps-pur`, `dans-l-eau-elle-meme`,
// `suivre-la-temperature-pendant-tout-le-changement-d-etat`. Le raisonnement
// est le même qu'au-dessus, et la réponse aussi : une table écrite à la main.
//
// Elle est SÉPARÉE de `LIBELLES` — `LIBELLES_FORMELS` et `NOMS_FORMELS` — pour
// une raison qui se voit sur une seule clé. `corps-pur` est à la fois une
// proposition de QCM (« Un corps pur », phrase entière, cochable) et une
// CATÉGORIE de classement (« Corps purs » en tête de colonne, « un corps pur »
// dans la phrase de correction). Ce sont deux emplois, donc deux formes ; une
// table unique devrait en choisir une, et l'autre s'écrirait ailleurs — dans
// l'affichage, c'est-à-dire nulle part.
//
// Deux clés vivent donc dans les deux tables, et c'est voulu : `corps-pur`,
// dont les deux formes diffèrent, et `dans-l-air-de-la-piece`, dont les deux
// formes coïncident aujourd'hui. Aucun repli de l'une sur l'autre n'est écrit :
// un repli serait juste pour la seconde et faux pour la première, et un défaut
// qui a raison une fois sur deux est plus coûteux qu'une ligne recopiée.
//
// `tools/verifier-contenu.mjs` refuse au build tout identifiant d'objet formel
// absent de ces tables, et tout CHAMP d'objet formel que `CHAMPS_D_OBJET_FORMEL`
// ne classe pas — les deux moitiés du même invariant, parce qu'un champ non
// classé est un champ dont on ne sait pas s'il porte des identifiants.

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

  // ── Série, dérivation, et où l’on branche l’appareil (ch. 2) ─────────────
  'en-serie': 'En série',
  'en-derivation': 'En dérivation',
  mixte: 'Un montage mixte',
  'aux-bornes-de-la-lampe-sans-rien-couper': 'Aux bornes de la lampe, sans rien couper',
  'dans-la-boucle-a-la-place-d-un-fil': 'Dans la boucle, à la place d’un fil',
  'entre-la-pile-et-l-interrupteur': 'Entre la pile et l’interrupteur',
  'c-est-le-meme-circuit': 'C’est le même circuit',
  'ce-sont-deux-circuits-differents': 'Ce sont deux circuits différents',
  'oui-la-mesure-est-bonne': 'Oui, la mesure est bonne',
  'non-il-a-mesure-la-tension-d-un-autre-dipole': 'Non : il a mesuré la tension d’un autre dipôle',
  'toutes-les-autres-s-eteignent': 'Toutes les autres s’éteignent',
  'les-autres-restent-allumees': 'Les autres restent allumées',

  // ── Où brancher le voltmètre — les quatre positions nommées (ch02-sf3) ───
  //
  // Les deux « en série » sont écrites SÉPARÉMENT, avant et après le dipôle,
  // et ce n'est pas du remplissage : l'élève qui coupe le fil hésite justement
  // sur le côté, et n'offrir qu'une seule position en série lui ferait lire que
  // le côté est ce qui se joue.
  'en-serie-juste-avant-l1': 'En série, juste avant L1',
  'en-derivation-aux-bornes-de-l1': 'En dérivation, aux bornes de L1',
  'en-serie-juste-apres-l1': 'En série, juste après L1',
  'en-derivation-aux-bornes-de-la-pile': 'En dérivation, aux bornes de la pile',

  // ── Lequel des trois montages ? (ch02-sf3) ───────────────────────────────
  'le-montage-de-lea': 'Le montage de Léa',
  'le-montage-de-sacha': 'Le montage de Sacha',
  'le-montage-de-nour': 'Le montage de Nour',
  'aucun-des-trois': 'Aucun des trois',

  // ── Le geste est bon, la cible ne l'est pas (ch02-sf3) ───────────────────
  //
  // Les quatre issues d'un branchement, et la seconde est celle que personne
  // n'enseigne : une valeur parfaitement lisible qui répond à une autre
  // question. Les trois autres sont les verdicts que `circuit.js` rend —
  // conforme, CIRCUIT_OUVERT, AMPEREMETRE_EN_DERIVATION.
  'la-mesure-est-bonne-le-branchement-est-en-derivation':
    'La mesure est bonne : le branchement est en dérivation',
  'la-lecture-est-bonne-mais-ce-n-est-pas-la-tension-demandee':
    'La lecture est bonne, mais ce n’est pas la tension demandée',
  'la-mesure-est-impossible-le-circuit-est-coupe':
    'La mesure est impossible : le circuit est coupé',
  'la-valeur-affichee-ne-veut-rien-dire-rien-ne-traverse-l-appareil':
    'La valeur affichée ne veut rien dire : rien ne traverse l’appareil',
  'le-voltmetre-va-etre-detruit': 'Le voltmètre va être détruit',

  // ── Données superflues, données manquantes ───────────────────────────────
  'je-donne-la-valeur': 'Je donne la valeur',
  'je-donne-la-valeur-en-supposant-un-litre': 'Je donne la valeur, en supposant un litre',
  'je-peux-repondre-voici-les-grandeurs-utiles': 'Je peux répondre : voici les grandeurs utiles',
  'on-ne-peut-pas-repondre-il-manque-une-grandeur': "On ne peut pas répondre : il manque une grandeur",
  'non-il-manque-une-grandeur': 'Non, il manque une grandeur',
  'non-il-y-a-trop-de-grandeurs': 'Non, il y a trop de grandeurs',
  'rien-de-plus-la-valeur-suffit': 'Rien de plus : la valeur suffit',

  // ── Deux schémas représentent-ils le même circuit ? (chapitre 2) ─────────
  //
  // La question du savoir-faire « schématiser un circuit », posée dans les deux
  // sens : deux dessins différents pour un même circuit, deux dessins de même
  // allure pour deux circuits différents. Les deux refus sont écrits séparément
  // parce qu'ils ne disent pas la même chose — l'un porte sur la PLACE des
  // symboles, l'autre sur les LIAISONS, et c'est exactement ce que l'élève doit
  // apprendre à distinguer.
  'oui-c-est-le-meme-circuit': 'Oui, c’est le même circuit',
  'non-les-dipoles-ne-sont-pas-au-meme-endroit': 'Non, les dipôles ne sont pas au même endroit',
  'non-ce-ne-sont-pas-les-memes-liaisons': 'Non, ce ne sont pas les mêmes liaisons',

  // ── Ce qui manque à une valeur écrite (chapitre 2, la tension) ───────────
  //
  // `rien-de-plus-la-valeur-suffit`, plus haut, sert de quatrième proposition à
  // `ch02-sf4-e03` : c'est la même phrase et le même sens qu'au chapitre 1, et
  // la recopier sous une seconde clé aurait fait deux libellés à corriger le
  // jour où l'un des deux bouge.
  'l-unite': 'L’unité',
  'le-calibre-utilise': 'Le calibre utilisé',
  'le-nom-de-l-appareil': 'Le nom de l’appareil',

  // ── Le calibre d'un voltmètre : le choisir, le corriger ──────────────────
  //
  // Les quatre positions sont celles d'un multimètre de collège, et elles
  // s'affichent avec leur unité : « Le calibre 2 V » et « Le calibre 200 mV »
  // ne se distinguent que par elle, et c'est exactement ce que l'élève doit
  // lire sur le bouton.
  'le-calibre-200-mv': 'Le calibre 200 mV',
  'le-calibre-2-v': 'Le calibre 2 V',
  'le-calibre-20-v': 'Le calibre 20 V',
  'le-calibre-200-v': 'Le calibre 200 V',
  'il-faut-monter-d-un-calibre': 'Il faut monter d’un calibre',
  'il-faut-descendre-d-un-calibre': 'Il faut descendre d’un calibre',
  'il-faut-changer-la-pile': 'Il faut changer la pile',
  'il-faut-brancher-le-voltmetre-en-serie': 'Il faut brancher le voltmètre en série',

  // ── Deux relevés, deux calibres : qui a raison ? ─────────────────────────
  'seule-alice-a-raison': 'Seule Alice a raison',
  'seul-basile-a-raison': 'Seul Basile a raison',
  'les-deux-ont-raison': 'Les deux ont raison',

  // ── La loi d'additivité des tensions (chapitre 2, sf6) ───────────────────
  //
  // Les égalités s'écrivent U(pile), U(lampe). La notation du cours met le nom
  // du dipôle en INDICE, et une chaîne de caractères ne porte pas d'indice :
  // ces tables n'admettent aucun balisage, et le fabriquer depuis l'affichage
  // serait écrire du contenu là où il ne s'écrit pas. La parenthèse dit la même
  // chose et se lit à voix haute — « U de la pile ».
  'la-tension-de-la-pile-est-la-somme-des-tensions-des-dipoles':
    'La tension de la pile est la somme des tensions des autres dipôles',
  'chaque-lampe-recoit-la-tension-entiere-de-la-pile': 'Chaque lampe reçoit la tension entière de la pile',
  'la-tension-de-la-pile-se-partage-toujours-en-parts-egales':
    'La tension de la pile se partage toujours en parts égales',
  'la-premiere-lampe-prend-ce-qu-il-lui-faut-la-seconde-prend-le-reste':
    'La première lampe prend ce qu’il lui faut, la seconde prend le reste',
  'u-pile-egale-u-lampe-plus-u-moteur': 'U(pile) = U(lampe) + U(moteur)',
  'u-lampe-egale-u-pile-plus-u-moteur': 'U(lampe) = U(pile) + U(moteur)',
  'u-pile-egale-u-lampe-egale-u-moteur': 'U(pile) = U(lampe) = U(moteur)',
  'u-pile-egale-u-lampe-moins-u-moteur': 'U(pile) = U(lampe) − U(moteur)',

  // ── Ce qu'affiche un voltmètre aux bornes d'un interrupteur fermé ────────
  'zero-volt': 'Zéro volt',
  'la-tension-de-la-pile': 'La tension de la pile',
  'la-meme-tension-que-la-lampe-voisine': 'La même tension que la lampe voisine',
  'on-ne-peut-pas-le-savoir-sans-mesurer': 'On ne peut pas le savoir sans mesurer',

  // ── Une phrase de camarade, à valider ou à refuser ───────────────────────
  'oui-toujours': 'Oui, toujours',
  'non-seulement-si-les-trois-dipoles-sont-identiques': 'Non : seulement si les trois dipôles sont identiques',
  'non-jamais': 'Non, jamais',

  // ── Critiquer une valeur sans la recalculer ──────────────────────────────
  'elle-est-impossible-la-somme-depasserait-celle-de-la-pile':
    'Elle est impossible : la somme dépasserait la tension de la pile',
  'elle-est-possible-le-calcul-le-dira': 'Elle est possible : le calcul le dira',
  'elle-est-impossible-une-tension-ne-depasse-jamais-un-volt':
    'Elle est impossible : une tension ne dépasse jamais un volt',
  'on-ne-peut-rien-dire-sans-refaire-le-calcul': 'On ne peut rien dire sans refaire le calcul',

  // ── Deux tensions, égales ou non — ch02-sf5, « loi d'unicité » ───────────
  //
  // Les propositions des trois doubles QCM du savoir-faire. Aucune ne porte de
  // VALEUR : la loi d'unicité dit une égalité, pas un nombre, et une proposition
  // qui dirait « 4,5 V » ne se réemploierait sur aucun autre item.
  // `on-ne-peut-pas-le-savoir-sans-mesurer` sert de quatrième proposition aux
  // trois : il est écrit plus haut, au chapitre 2 lui aussi, et le recopier sous
  // une seconde clé ferait deux libellés à corriger le jour où l'un bouge.
  'les-deux-tensions-sont-egales': 'Les deux tensions sont égales',
  'la-tension-se-partage-entre-les-deux': 'La tension se partage entre les deux',
  'la-plus-proche-de-la-pile-a-la-plus-grande-tension':
    'Celle qui est la plus proche de la pile a la plus grande tension',
  'le-moteur-a-la-plus-grande-tension': 'Le moteur a la plus grande tension',
  'la-lampe-a-la-plus-grande-tension': 'La lampe a la plus grande tension',
  'la-tension-aux-bornes-de-l-ensemble-est-la-meme':
    "La tension aux bornes de l'ensemble est la même",
  'la-tension-aux-bornes-de-l-ensemble-est-double':
    "La tension aux bornes de l'ensemble est deux fois plus grande",
  'la-tension-aux-bornes-de-l-ensemble-est-la-moitie':
    "La tension aux bornes de l'ensemble est deux fois plus petite",
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

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — les phrases
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les identifiants d'objet formel qui se disent d'une PHRASE : une consigne,
 * un geste proposé, une étape, un lieu, une trace. Rien à accorder — on ne dit
 * pas « un dans l'eau elle-même » —, donc une chaîne suffit.
 *
 * ── D'où viennent ces mots ────────────────────────────────────────────────
 *
 * **Quand l'énoncé énumère les propositions, le libellé reprend les mots de
 * l'énoncé ; sinon, ceux de la clé.** Ce n'est pas une préférence de style,
 * c'est le seul ordre qui ne triche pas, et un item le prouve :
 * `ch01-sf7-e03` énumère quatre gestes, dont « le laisser sur un radiateur et
 * regarder les parois ». La clé, elle, s'appelle
 * `rechauffer-doucement-l-eau-et-regarder-des-bulles-se-former-sur-les-parois`
 * — elle ANNONCE les bulles, c'est-à-dire la réponse. L'afficher telle quelle
 * désignerait la bonne case avant que l'élève ait réfléchi. L'énoncé, lui, a
 * été écrit pour ne rien dire de tel : c'est lui qui fait foi.
 *
 * L'inverse n'existe pas : aucun libellé n'ajoute à l'énoncé une information
 * qu'il ne porte pas. Quand l'énoncé n'énumère rien (`ch01-sf1-e02`), les mots
 * de la clé sont les seuls dont on dispose, et ils suffisent.
 */
export const LIBELLES_FORMELS = Object.freeze({
  // ── Les consignes — ce qui se lit au-dessus de la zone à composer ────────
  'corps-pur-ou-melange': 'Corps pur ou mélange ?',
  'de-quoi-s-agit-il': "De quoi s'agit-il ?",
  'lequel-permet-de-conclure': 'Lequel permet de conclure ?',
  'ordonner-les-etapes': 'Remettre les étapes dans l\'ordre',
  'ou-est-il-et-sous-quelle-forme': 'Où est-il, et sous quelle forme ?',
  'quel-controle-avant-de-conclure': 'Quel contrôle, avant de conclure ?',
  'quel-controle-prouve-la-presence-du-gaz': 'Quel contrôle prouve la présence du gaz ?',

  // ── Les gestes proposés — ch01-sf1-e02, dont l'énoncé n'énumère pas ──────
  'suivre-la-temperature-pendant-tout-le-changement-d-etat':
    "Suivre la température pendant tout le changement d'état",
  'regarder-de-plus-pres-a-la-loupe': 'Regarder de plus près, à la loupe',
  'sentir-l-odeur': "Sentir l'odeur",
  'verser-dans-un-verre-plus-large': 'Verser dans un verre plus large',

  // ── ch01-sf1-e10 — l'énoncé énumère : « mesurer sa masse volumique et la
  //    comparer à celle de l'eau ; l'observer à la loupe ; suivre sa
  //    température pendant tout son changement d'état »
  'suivi-de-temperature-pendant-tout-le-changement-d-etat':
    "Suivre sa température pendant tout son changement d'état",
  'mesure-de-masse-volumique-comparee-a-l-eau':
    "Mesurer sa masse volumique et la comparer à celle de l'eau",
  'observation-a-la-loupe': "L'observer à la loupe",

  // ── ch01-sf7-e03 — l'énoncé énumère, et c'est lui qui fait foi : la clé du
  //    geste juste annonce les bulles, l'énoncé ne dit que le radiateur
  'rechauffer-doucement-l-eau-et-regarder-des-bulles-se-former-sur-les-parois':
    'Le laisser sur un radiateur et regarder les parois',
  'regarder-le-verre-a-contre-jour': 'Regarder le verre à contre-jour',
  'verser-l-eau-dans-un-verre-plus-large': "Verser l'eau dans un verre plus large",
  'attendre-que-l-eau-devienne-trouble': "Attendre que l'eau devienne trouble",

  // ── ch01-sf7-t10 — l'énoncé énumère les trois moyens ─────────────────────
  'peser-la-bouteille-fermee-puis-la-repeser-ouverte-apres-deux-jours':
    'Peser la bouteille fermée, puis la repeser ouverte deux jours plus tard',
  'regarder-s-il-monte-des-bulles': "Regarder plus longtemps s'il monte des bulles",
  'comparer-la-transparence-avec-une-bouteille-d-eau-plate':
    "Comparer la transparence de cette bouteille avec celle d'une bouteille d'eau plate",

  // ── La raison du choix — le second temps des items à `pourquoi` ──────────
  'un-melange-n-a-pas-de-palier': "Un mélange n'a pas de palier",
  'seule-la-balance-repond-quand-il-n-y-a-rien-a-voir':
    "Seule la balance répond quand il n'y a rien à voir",

  // ── Les étapes à remettre en ordre ───────────────────────────────────────
  'refroidir-le-liquide-lentement': 'Refroidir le liquide lentement',
  'relever-la-temperature-pendant-tout-le-changement-d-etat':
    "Relever la température pendant tout le changement d'état",
  'conclure-selon-que-la-temperature-est-restee-constante-ou-non':
    'Conclure selon que la température est restée constante ou non',

  // ── Où est la matière ────────────────────────────────────────────────────
  //
  // `dans-l-air-de-la-piece` figure AUSSI dans `LIBELLES`, avec le même texte :
  // c'est là-bas une proposition de QCM, ici un lieu. Voir l'en-tête.
  'dans-l-eau-elle-meme': "Dans l'eau elle-même",
  'dans-l-eau-de-l-aquarium': "Dans l'eau de l'aquarium",
  'dans-le-liquide-de-la-canette': 'Dans le liquide de la canette',
  'dans-l-air-de-la-piece': "Dans l'air de la pièce",
  'dans-l-air-du-refrigerateur': "Dans l'air du réfrigérateur",
  'dans-l-air-enferme-sous-la-cloche': "Dans l'air enfermé sous la cloche",
  'dans-l-air-au-dessus-de-la-casserole': "Dans l'air, au-dessus de la casserole",

  // ── Sous quelle forme ────────────────────────────────────────────────────
  'molecules-dispersees-entre-celles-de-l-eau':
    "Des molécules dispersées entre celles de l'eau",
  'molecules-dispersees-entre-celles-du-liquide':
    'Des molécules dispersées entre celles du liquide',
  'molecules-melangees-a-celles-de-l-air': "Des molécules mélangées à celles de l'air",
  'vapeur-invisible-melangee-a-l-air': "De la vapeur invisible, mélangée à l'air",

  // ── La trace — ce qui prouve la présence de ce qu'on ne voit pas ─────────
  'l-eau-pique-la-langue': "L'eau pique la langue",
  'les-poissons-respirent-sans-remonter-a-la-surface':
    'Les poissons respirent sans remonter à la surface',
  'la-carafe-pese-quelques-grammes-de-moins-que-ce-matin':
    'La carafe pèse quelques grammes de moins que ce matin',
  'la-canette-est-dure-au-toucher-et-mousse-a-l-ouverture':
    "La canette est dure au toucher, et mousse à l'ouverture",
  'le-soda-ne-pique-plus-et-le-verre-s-est-allege': "Le soda ne pique plus, et le verre s'est allégé",
  'un-poisson-place-dans-cette-eau-manque-d-air': "Un poisson placé dans cette eau manque d'air",
  'des-gouttes-apparaissent-sur-la-paroi-interieure':
    'Des gouttes apparaissent sur la paroi intérieure',

  // ── Le cas sans transformation ───────────────────────────────────────────
  //
  // `aucune` n'est pas un nom : « une aucune » ne se dit pas. Sa place est ici,
  // et la phrase porte le mot que la clé sous-entend.
  aucune: 'Aucune transformation',

  // ── L'état d'un interrupteur (`figure.circuit`, chapitres 2 et 7) ────────
  ferme: 'Fermé',
  ouvert: 'Ouvert',

  // ── Les questions posées sur un circuit (chapitre 2) ─────────────────────
  //
  // Elles sont portées par le GRAPHE lui-même — `{ question, dipoles }` — et
  // non par un objet qui l'envelopperait : `item.js` compare la figure et la
  // correction par identité de référence, donc le circuit montré et l'objet
  // formel attendu sont le même objet, et il n'y a pas d'autre endroit où
  // écrire la question.
  'ce-montage-est-il-en-serie-ou-en-derivation': 'Ce montage est-il en série ou en dérivation ?',
  'que-deviennent-les-autres-si-on-devisse-une-lampe':
    'Que deviennent les autres lampes si on en dévisse une ?',
  'ou-brancher-le-voltmetre': 'Où brancher le voltmètre ?',
  'corrige-le-montage': 'Corrige le montage',
  'redessine-le-meme-circuit': 'Redessine le même circuit, autrement',
  'range-chaque-montage': 'Range chaque montage',

  // ── Le vocabulaire graphique — ch02-sf1, « schématiser un circuit » ───────
  //
  // Trois consignes, et elles ne sont pas interchangeables : l'une va du RÔLE
  // au symbole (« l'appareil qui mesure la tension se dessine comment ? »),
  // l'autre du SYMBOLE au dipôle (« ce rond marqué M, c'est quoi ? »), la
  // troisième compare une liste à un dessin. Les fusionner en « quel symbole ? »
  // aurait rendu les trois items indiscernables à l'écran.
  'par-quel-symbole-se-dessine-t-il': 'Par quel symbole se dessine-t-il ?',
  'de-quel-dipole-est-ce-le-symbole': 'De quel dipôle est-ce le symbole ?',
  'quel-symbole-manque-t-il': 'Quel symbole manque-t-il ?',
  'combien-de-boucles-peut-on-suivre': 'Combien de trajets différents peut-on suivre ?',
  'lequel-de-ces-schemas-represente-le-montage': 'Lequel de ces schémas représente le montage ?',

  // Les deux permutations : tracer, puis relire. Ce sont deux fiches
  // différentes, et leurs étapes ne se recouvrent pas — c'est ce qui permet à
  // l'entraînement et au test d'en porter chacun une sans se recopier.
  'ordonner-les-etapes-du-schema': 'Remettre dans l’ordre les étapes du tracé',
  'lister-les-dipoles-du-montage': 'Faire la liste des dipôles, et nommer chacun',
  'reperer-les-points-partages-par-plus-de-deux-dipoles':
    'Repérer les points partagés par plus de deux dipôles',
  'placer-les-symboles-normalises': 'Placer les symboles normalisés',
  'fermer-les-liaisons-par-des-traits-droits': 'Fermer les liaisons par des traits droits',
  'ecrire-le-nom-de-chaque-dipole': 'Écrire le nom de chaque dipôle à côté de son symbole',

  'ordonner-les-etapes-de-la-relecture': 'Remettre dans l’ordre les gestes de relecture',
  'compter-les-symboles-et-les-comparer-aux-dipoles-du-montage':
    'Compter les symboles, et les comparer aux dipôles du montage',
  'verifier-que-chaque-symbole-est-le-bon': 'Vérifier que chaque symbole est le bon',
  'suivre-la-boucle-du-doigt-sans-lever-la-main':
    'Suivre la boucle du doigt, sans lever la main',
  'verifier-que-chaque-dipole-porte-son-nom': 'Vérifier que chaque dipôle porte son nom',

  // Trois schémas décrits en français : le seul endroit du savoir-faire où les
  // propositions sont des TOPOLOGIES et non des dipôles. Un `double-qcm` ne peut
  // pas porter de figure, et un choix raisonné n'en porte pas non plus : les
  // trois candidats se disent donc, faute de pouvoir se montrer.
  'une-seule-boucle-ou-les-deux-lampes-se-suivent':
    'Une seule boucle, où les deux lampes se suivent',
  'deux-branches-portant-chacune-une-lampe': 'Deux branches, portant chacune une lampe',
  'une-boucle-ou-la-deuxieme-lampe-est-reliee-par-un-seul-fil':
    'Une boucle où la deuxième lampe n’est reliée que par un seul fil',

  // Le décompte des trajets fermés, sur un montage à deux branches.
  'une-seule-boucle': 'Un seul trajet',
  'deux-boucles': 'Deux trajets',
  'trois-boucles': 'Trois trajets',

  // ── Les choix raisonnés de ch02-sf5, « loi d'unicité des tensions » ──────
  //
  // Sept objets formels `{ question, choisi, ecartes }`, donc sept questions et
  // leurs propositions. `zero-volt` et `on-ne-peut-pas-le-savoir-sans-mesurer`
  // vivent AUSSI dans `LIBELLES`, avec le même texte : là-bas ce sont des
  // propositions de double QCM, ici des choix écartés d'un objet formel. Voir
  // l'en-tête — aucun repli de l'une des tables sur l'autre n'est écrit.
  'que-lira-l-autre-voltmetre': 'Que lira l’autre voltmètre ?',
  'que-va-afficher-le-voltmetre-du-bout-de-la-vitrine':
    'Que va afficher le voltmètre au bout de la vitrine ?',
  'quel-montage-permet-de-trancher': 'Quel montage permet de trancher ?',
  'la-meme-tension-prouve-t-elle-la-derivation': 'La même tension prouve-t-elle une dérivation ?',
  'quelle-explication-tient': 'Quelle explication tient ?',
  'sur-quel-couple-la-loi-s-applique-t-elle': 'Sur quel couple la loi d’unicité s’applique-t-elle ?',

  'la-meme-tension-que-l-autre-dipole': 'La même tension que l’autre dipôle',
  'une-tension-plus-grande': 'Une tension plus grande',
  'une-tension-plus-petite': 'Une tension plus petite',
  'la-moitie-de-la-tension-de-la-pile': 'La moitié de la tension de la pile',
  'zero-volt': 'Zéro volt',
  'on-ne-peut-pas-le-savoir-sans-mesurer': 'On ne peut pas le savoir sans mesurer',

  // La prédiction engagée du bandeau de vitrine — l'item de format diagnostique
  // du piège « reponse-conforme-sans-adhesion ». Les trois écartés nomment trois
  // modèles distincts : la distance, le partage, et le refus de se prononcer.
  'exactement-la-meme-chose-qu-a-la-premiere-lampe':
    'Exactement la même chose qu’à la première lampe',
  'un-peu-moins-parce-que-la-vitrine-est-longue':
    'Un peu moins, parce que la vitrine est longue',
  'trois-fois-moins-puisqu-il-y-a-trois-lampes':
    'Trois fois moins, puisqu’il y a trois lampes',

  // Les montages proposés au contrôle des variables. Le montage à deux dipôles
  // IDENTIQUES n'est ni bon ni mauvais en soi, et c'est tout l'enjeu de la paire
  // `e05` / `t05` : il ne tranche RIEN sur la taille — les deux hypothèses y
  // prédisent la même chose — et il est le SEUL à trancher sur la distance,
  // parce qu'il y fixe ce qui doit rester constant. Ce qu'il faut reconnaître
  // n'est donc pas un bon montage, c'est quelle variable l'hypothèse met en jeu.
  'deux-dipoles-differents-en-derivation-un-voltmetre-sur-chacun':
    'Deux dipôles différents en dérivation, un voltmètre sur chacun',
  'deux-dipoles-identiques-en-derivation-un-voltmetre-sur-chacun':
    'Deux dipôles identiques en dérivation, un voltmètre sur chacun',
  'deux-dipoles-differents-en-serie-un-voltmetre-sur-chacun':
    'Deux dipôles différents en série, un voltmètre sur chacun',
  'un-seul-dipole-et-un-voltmetre-a-ses-bornes': 'Un seul dipôle, et un voltmètre à ses bornes',
  'trois-dipoles-identiques-en-derivation-un-voltmetre-sur-le-plus-eloigne':
    'Trois dipôles identiques en dérivation, un voltmètre sur le plus éloigné',

  // La réciproque de la loi, qui est fausse.
  'non-deux-dipoles-identiques-en-serie-donnent-aussi-deux-tensions-egales':
    'Non : deux dipôles identiques en série donnent aussi deux tensions égales',
  'oui-c-est-la-definition-de-la-derivation': 'Oui : c’est la définition de la dérivation',
  'oui-a-condition-que-les-deux-dipoles-soient-differents':
    'Oui, à condition que les deux dipôles soient différents',

  // Pourquoi la troisième lecture décroche.
  'le-troisieme-voltmetre-n-est-pas-aux-bornes-de-sa-lampe':
    'Le troisième voltmètre n’est pas aux bornes de sa lampe',
  'la-troisieme-lampe-est-plus-loin-de-la-pile': 'La troisième lampe est plus loin de la pile',
  'la-loi-ne-vaut-plus-au-dela-de-deux-lampes': 'La loi ne vaut plus au-delà de deux lampes',
  'un-ecart-pareil-est-normal-entre-trois-mesures':
    'Un écart pareil est normal entre trois mesures',

  // Sur quel couple la loi porte, dans un montage mixte décrit en toutes lettres.
  'l2-et-l3-qui-ont-les-memes-bornes': 'L2 et L3, qui ont les mêmes bornes',
  'l1-et-l2-qui-se-suivent': 'L1 et L2, qui se suivent',
  'l1-et-la-pile': 'L1 et la pile',
  'les-trois-lampes-ensemble': 'Les trois lampes ensemble',
});

// ════════════════════════════════════════════════════════════════════════════
// Les objets formels — les noms, avec leur genre et leur nombre
// ════════════════════════════════════════════════════════════════════════════

/**
 * Les identifiants qui se disent d'un NOM, et que l'affichage doit accorder.
 *
 * « Corps pur » en tête de colonne, « un corps pur » dans la phrase de
 * correction, « corps purs » quand la colonne se nomme au pluriel : c'est le
 * même contenu sous trois formes, et une seule chaîne ne peut pas les rendre
 * toutes les trois. Le genre est donc DÉCLARÉ, jamais deviné — « une pile » et
 * « un ampèremètre » ne se distinguent par aucune règle qu'un programme sache
 * appliquer, et un « une ampèremètre » se voit du premier coup d'œil.
 *
 * `pluriel` n'est écrit que là où un pluriel s'affiche — aujourd'hui les deux
 * catégories du classement, qui titrent des colonnes. Ailleurs il vaut
 * `undefined` et `auPluriel` rend `null` : le jour où un affichage en demande
 * un, il s'écrit ici, à la main, comme le reste. Le fabriquer par une règle
 * (« + s ») serait l'expression régulière qu'on a refusée en en-tête : « corps
 * pur » y survit, « gaz » et « vitesse du vent » non.
 */
export const NOMS_FORMELS = Object.freeze({
  // ── Les catégories du classement, et la nature d'un échantillon ──────────
  'corps-pur': { nom: 'corps pur', genre: 'm', pluriel: 'corps purs' },
  melange: { nom: 'mélange', genre: 'm', pluriel: 'mélanges' },

  // ── Ce qui s'est passé ───────────────────────────────────────────────────
  dissolution: { nom: 'dissolution', genre: 'f' },
  evaporation: { nom: 'évaporation', genre: 'f' },
  'fusion-puis-solidification': { nom: "fusion suivie d'une solidification", genre: 'f' },

  // ── Les trois états ──────────────────────────────────────────────────────
  //
  // `schema.js` en connaît déjà l'écart entre particules et la phrase qui le
  // décrit (« serrées les unes contre les autres mais désordonnées ») : c'est
  // la PHYSIQUE de l'état. Ici, c'est son NOM — ce qu'on écrit au-dessus de la
  // grille à composer. Deux choses différentes, deux endroits.
  solide: { nom: 'solide', genre: 'm' },
  liquide: { nom: 'liquide', genre: 'm' },
  gaz: { nom: 'gaz', genre: 'm' },

  // ── Les grandeurs d'un dossier documentaire ──────────────────────────────
  //
  // Elles s'affichent seules (« Volume d'eau », en tête d'une case à cocher) et
  // dans une phrase (« il manque le volume d'eau ») : le genre sert aux deux.
  'masse-dissoute': { nom: 'masse dissoute', genre: 'f' },
  'masse-de-sucre-dissoute': { nom: 'masse de sucre dissoute', genre: 'f' },
  'masse-du-becher-vide': { nom: 'masse du bécher vide', genre: 'f' },
  'volume-d-eau': { nom: "volume d'eau", genre: 'm' },
  'temperature-de-l-eau': { nom: "température de l'eau", genre: 'f' },
  'duree-d-agitation': { nom: "durée d'agitation", genre: 'f' },
  'marque-de-la-balance': { nom: 'marque de la balance', genre: 'f' },
  'surface-du-bassin': { nom: 'surface du bassin', genre: 'f' },
  'vitesse-du-vent': { nom: 'vitesse du vent', genre: 'f' },

  // ── Les dipôles d'un schéma de circuit (chapitres 2 et 7) ────────────────
  //
  // Les huit types de `circuit.js`, et pas seulement ceux qu'un chapitre écrit
  // emploie : `CHAMPS_D_OBJET_FORMEL.dipoles` lit le `type` de CHAQUE dipôle
  // d'un circuit servi en objet formel, et il a suffi que le chapitre 2 pose un
  // voltmètre pour que le build refuse. Le type est un énuméré FERMÉ là-bas ;
  // la table peut donc l'être ici aussi, une fois, plutôt que de rattraper son
  // retard chapitre après chapitre.
  pile: { nom: 'pile', genre: 'f' },
  lampe: { nom: 'lampe', genre: 'f' },
  moteur: { nom: 'moteur', genre: 'm' },
  resistance: { nom: 'résistance', genre: 'f' },
  amperemetre: { nom: 'ampèremètre', genre: 'm' },
  voltmetre: { nom: 'voltmètre', genre: 'm' },
  interrupteur: { nom: 'interrupteur', genre: 'm' },
  fil: { nom: 'fil', genre: 'm' },

  // ── Les deux façons de monter deux lampes, comme CATÉGORIES de classement ─
  //
  // Distinctes de `en-serie` et `en-derivation` de `LIBELLES`, qui sont des
  // propositions de QCM (« En série », cochable) : ici ce sont des colonnes à
  // titrer, donc des noms, et ils s'affichent au pluriel.
  'montage-en-serie': { nom: 'montage en série', genre: 'm', pluriel: 'montages en série' },
  'montage-en-derivation': { nom: 'montage en dérivation', genre: 'm', pluriel: 'montages en dérivation' },
});

const capitale = (mot) => mot.charAt(0).toUpperCase() + mot.slice(1);

/** Le libellé d'un identifiant d'objet formel, tel qu'il s'affiche SEUL : une
 *  tête de colonne, une case à cocher, un bouton. Capitale initiale, singulier.
 *  `null` si le lexique ne connaît pas la clé — comme partout ici, on préfère
 *  le dire à l'élève plutôt que lui servir un mot mal écrit. */
export const libelleFormel = (cle) => {
  const nom = NOMS_FORMELS[cle];
  if (nom) return capitale(nom.nom);
  return LIBELLES_FORMELS[cle] ?? null;
};

/** Le nom précédé de son article indéfini, pour une phrase : « c'est un corps
 *  pur », « il s'agit d'une dissolution ». `null` sur une clé qui n'est pas un
 *  nom : « un dans l'eau elle-même » ne se dit pas, et l'appelant qui reçoit
 *  `null` doit écrire sa phrase autrement, pas coller l'article lui-même. */
export const avecUn = (cle) => {
  const nom = NOMS_FORMELS[cle];
  return nom ? `${nom.genre === 'f' ? 'une' : 'un'} ${nom.nom}` : null;
};

/** Le nom au pluriel, capitale initiale — « Corps purs », « Mélanges ». `null`
 *  si la clé n'est pas un nom, ou si son pluriel n'a pas été écrit. */
export const auPluriel = (cle) => {
  const nom = NOMS_FORMELS[cle];
  return nom?.pluriel ? capitale(nom.pluriel) : null;
};

/** Le lexique des objets formels dit-il cette clé ? */
export const identifiantConnu = (cle) => cle in NOMS_FORMELS || cle in LIBELLES_FORMELS;

// ════════════════════════════════════════════════════════════════════════════
// Ce que porte chaque champ d'un objet formel
// ════════════════════════════════════════════════════════════════════════════

const texte = (v) => typeof v === 'string' && v !== '';
const liste = (v) => (Array.isArray(v) ? v.filter(texte) : [v].filter(texte));

/** Un champ qui ne porte AUCUN identifiant. La constante existe pour que le
 *  tableau ci-dessous soit une DÉCISION à chaque ligne : `null` s'y lit « on a
 *  regardé, il n'y a rien à traduire », là où un champ simplement absent se
 *  lirait « personne n'a regardé ». */
const AUCUN = null;

/**
 * Les champs qu'un `reponse.objetFormel` peut porter, et ce que chacun
 * contient : une fonction qui rend ses identifiants, ou `AUCUN`.
 *
 * **La table est fermée, et c'est la moitié utile de l'invariant.** Un champ
 * qu'elle ne classe pas est refusé au build — non parce qu'il est interdit,
 * mais parce qu'on ne sait pas s'il porte des identifiants, et qu'un champ non
 * regardé est exactement la façon dont douze identifiants nus entreraient au
 * chapitre suivant sans que personne ne s'en aperçoive. Ajouter une forme
 * d'objet formel, c'est ajouter ses champs ici : une ligne, une décision.
 */
export const CHAMPS_D_OBJET_FORMEL = Object.freeze({
  // ── Le classement : { question, categories, affectation } ────────────────
  question: liste,
  categories: liste,
  // Les CLÉS de l'affectation sont les étiquettes à ranger — « eau distillée »,
  // « air du ballon de baudruche » : du français écrit par l'auteur, qui
  // s'affiche tel quel. Seules les VALEURS sont des catégories, donc des clés.
  affectation: (v) => liste(Object.values(v ?? {})),

  // ── La nature et la transformation : { question, especes, nature,
  //    transformation } ────────────────────────────────────────────────────
  nature: liste,
  transformation: liste,
  // Les espèces chimiques sont nommées en français dans le corpus — « eau »,
  // « sels dissous », « protéines du lait ». Ce sont des noms, pas des clés :
  // rien à traduire.
  especes: AUCUN,

  // ── Le choix raisonné : { question, choisi, ecartes[, pourquoi] } ────────
  choisi: liste,
  ecartes: liste,
  pourquoi: liste,

  // ── La remise en ordre : { question, ordre } ─────────────────────────────
  ordre: liste,

  // ── Où est la matière : { question, visible, lieu, forme, trace } ────────
  lieu: liste,
  forme: liste,
  trace: liste,
  // Un booléen : « on le voit » ou non. Il n'y a pas de mot à choisir.
  visible: AUCUN,

  // ── La grille de particules : { contenu, etat, graine } ──────────────────
  etat: liste,
  // `schema.js` ferme déjà ce que `contenu` peut dire : ses symboles d'éléments
  // sortent de `ELEMENTS`, qui porte leur nom français, et les `nom` d'espèces
  // sont du français d'auteur. Deux tables pour les mêmes symboles finiraient
  // par ne plus dire la même chose.
  contenu: AUCUN,
  graine: AUCUN,

  // ── Le repère et la courbe : { titre, x, y, points[, relie] } ────────────
  //
  // Titres d'axes et titre de figure sont des phrases d'auteur, les points sont
  // des nombres.
  titre: AUCUN,
  x: AUCUN,
  y: AUCUN,
  points: AUCUN,
  relie: AUCUN,

  // ── Le dossier documentaire : { titre, fournies, necessaires } ───────────
  fournies: liste,
  necessaires: liste,

  // ── Le circuit (chapitre 7) : { dipoles } ────────────────────────────────
  //
  // `id` et `bornes` sont les étiquettes du schéma — « L1 », « a » — et se
  // dessinent telles quelles ; `circuit.js` ferme `type` et `etat`, et c'est
  // leur NOM français qui manque, pas leur validité.
  dipoles: (v) => (Array.isArray(v) ? v : []).flatMap((d) => liste(d?.type).concat(liste(d?.etat))),
});

/**
 * Ce qu'un objet formel demande au lexique.
 *
 *   identifiants    les clés qu'il emploie, dédoublonnées, dans l'ordre où on
 *                   les a rencontrées ;
 *   champsInconnus  les champs que `CHAMPS_D_OBJET_FORMEL` ne classe pas.
 *
 * Les deux sont rendus ensemble parce qu'ils se refusent ensemble : un objet
 * dont un champ n'est pas classé peut fort bien n'avoir aucun identifiant
 * manquant, et l'annoncer conforme serait le mensonge le plus coûteux des deux.
 */
export function lireObjetFormel(objetFormel) {
  const identifiants = new Set();
  const champsInconnus = [];
  for (const [champ, valeur] of Object.entries(objetFormel ?? {})) {
    if (!(champ in CHAMPS_D_OBJET_FORMEL)) {
      champsInconnus.push(champ);
      continue;
    }
    const lire = CHAMPS_D_OBJET_FORMEL[champ];
    if (lire) for (const id of lire(valeur)) identifiants.add(id);
  }
  return { identifiants: [...identifiants], champsInconnus };
}

/** Les identifiants d'un objet formel que le lexique ne sait pas dire. Vide sur
 *  un objet formel affichable — c'est la forme sous laquelle l'invariant du
 *  build et la zone de réponse posent la MÊME question. */
export const identifiantsSansLibelle = (objetFormel) => lireObjetFormel(objetFormel)
  .identifiants.filter((c) => !identifiantConnu(c));
