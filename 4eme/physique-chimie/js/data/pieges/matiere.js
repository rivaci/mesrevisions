// Les pièges de la matière et de ses transformations — la famille fondatrice.
//
// Un piège n'est pas une erreur constatée : c'est une CONCEPTION documentée.
// L'élève qui écrit « la laine de fer brûlée pèse moins » n'a pas mal lu
// l'énoncé. Il applique un modèle dont les prémisses sont scientifiquement
// JUSTES — les cristaux rapetissent vraiment, la fumée est vraiment plus légère
// qu'un solide, l'oxygène ne se sent vraiment pas dans la main — et il en tire la
// seule conclusion disponible. L'erreur n'est pas dans les faits, elle est dans
// le DÉCOUPAGE DU SYSTÈME : il raisonne sur une partie et conclut sur le tout.
// Le catalogue décrit ce modèle, dit d'où on le sait, et dit comment le mettre en
// défaut.
//
// ── Pourquoi cette famille passe avant les autres ─────────────────────────
//
// `charte.md` § « Le diagnostic » n'en fait pas une famille parmi six : elle y
// est le diagnostic lui-même. « Le sucre dissous a disparu », « la fumée ne pèse
// rien », « le courant s'use en chemin », « l'énergie est perdue » y sont dites
// « une seule conception déclinée dans quatre chapitres qui ne se parlent
// jamais ». Les trois autres visages sont écrits ailleurs (`electricite.js`, et
// le fil transversal « énergie » qui ne l'est pas encore) ; celui-ci porte le
// premier, et il porte le seul piège de chimie que `didactique.md` § 7 range
// explicitement au rang 1.
//
// ── Ce que la famille couvre, et le rang de chacun ────────────────────────
//
// Critère du § 7, repris mot pour mot : rang 1 = persistance MESURÉE après un
// enseignement qui la visait explicitement ; rang 2 = conception que
// l'enseignement FABRIQUE ; rang 3 = conception qui cède effectivement à cet âge.
//
// TROIS pièges sont rangés par `didactique.md` lui-même :
//
//   · `conservation-de-la-masse` — RANG 1, nommé au § 7 ② (« l'enseignement en
//     gagne la moitié, pas plus »). C'est le seul de la famille dont le rang ne
//     soit pas une déduction de notre part.
//   · `particules-heritent-du-macroscopique` — RANG 2, nommé dans la liste du
//     § 7 (« les particules dotées de propriétés macroscopiques, renforcées par
//     les illustrations de manuels »).
//   · `frontiere-physique-chimique` — RANG 2, nommé dans la même liste (« le
//     classement physique / chimique, où l'erreur AUGMENTE avec l'âge »).
//
// CINQ ne le sont pas, et chacun porte ci-dessous la déduction qui lui donne son
// rang, écrite pour être refusée. Le procédé est celui d'`electricite.js` sur
// `pile-fabrique-le-courant-ampoule-le-consomme` : le champ n'admet que trois
// valeurs, deux sont frontalement contredites par les chiffres, la troisième
// reste — c'est un RANG PAR ÉLIMINATION, pas par preuve.
//
//   · `matiere-disparait-quand-on-ne-la-voit-plus` — rang 1 par élimination.
//     Rang 2 : aucun auteur ne prétend que l'enseignement la fabrique. Rang 3 :
//     contredit par § 3.1 — 44 % des élèves de 14 ans disent encore que le soluté
//     « disparaît » (Prieto et al. 1989), et § 3.1 décrit une « érosion lente et
//     incomplète », ce qui n'est pas « cède effectivement à cet âge ».
//     ATTENTION à ne pas confondre avec la RÉVERSIBILITÉ de l'évaporation, qui
//     est bien un rang 3 et n'est pas écrite ici (voir plus bas).
//   · `gaz-n-est-pas-de-la-matiere` — rang 1 par élimination, et c'est le rang le
//     plus contestable du fichier : le § 7 range au rang 3 « les idées
//     particulaires sur les gaz » (~60 % d'usage constant à 13-14 ans après
//     enseignement, plus de 90 % à 18 ans). Mais ce résultat porte sur l'USAGE DU
//     MODÈLE PARTICULAIRE à propos des gaz, pas sur leur MASSE, et les deux
//     mesures divergent : § 3.5 relève que 19 % des élèves de 15 ans, ayant déjà
//     deux ans de chimie derrière eux, prédisent encore une diminution de masse à
//     la combustion « parce qu'un gaz s'échappe ». Nous retenons donc rang 1.
//     Un relecteur qui préférerait rang 3 doit savoir ce qu'il achète : le rang 3
//     ne donne AUCUNE re-confrontation, et ce piège est le prérequis du § 7 ②.
//   · `vide-entre-les-particules-rempli` — rang 1 par élimination. Rang 3
//     frontalement contredit par § 3.4a, qui documente la conception « jusqu'à
//     l'université » et la voit MONTER (~25 % à 13-14 ans, ~40 % à 16 ans et
//     plus). Rang 2 : tentant — une conception qui monte après enseignement
//     ressemble à une conception fabriquée — mais `didactique.md` ne le dit nulle
//     part, et l'inventer reviendrait à s'accorder un `iatrogene` qu'aucune
//     source ne porte.
//   · `meme-taille-donc-meme-masse` et `confusion-masse-et-masse-volumique` —
//     rang 1 par élimination, sur un TROU DU CORPUS explicitement signalé : § 8
//     range la masse volumique parmi le « plausible mais peu ou pas documenté »
//     et écrit « aucune donnée chiffrée sur 12-14 ans ». Rang 3 affirmerait que
//     la conception cède, ce que rien n'établit — et un rang 3 ne revient jamais.
//     Entre affirmer une cession non mesurée et affirmer une persistance non
//     mesurée, la seconde coûte des créneaux et la première coûte l'élève. D'où
//     `fiabilite: 'non-documente'`, le rythme le plus lent du fichier, et le
//     garde-fou de la charte qui s'applique de plein droit : un piège
//     `non-documente` « ne peut jamais fonder à lui seul une décision de
//     maîtrise ». C'est le traitement que `mouvement.js` réserve à ses deux ○.
//
// ── La dépendance d'Andersson, et pourquoi elle est tenue ici ─────────────
//
// `charte.md` : « Le piège conservation de la masse n'est JAMAIS programmé avant
// que le piège le gaz n'est pas de la matière ait été rencontré. » Le motif est
// dans § 3.5 : pour décider si la masse est conservée, l'élève doit d'abord
// distinguer ce qui est matériel de ce qui ne l'est pas. Un élève pour qui la
// fumée ne pèse rien ne peut pas comprendre que la masse se conserve à la
// combustion — il n'a pas les termes du bilan.
//
// Contrairement au cas symétrique d'`electricite.js` (`pile-courant-constant`,
// dont le producteur est dans son propre chapitre), la dépendance est ici tenue
// par la PROGRESSION elle-même : `gaz-n-est-pas-de-la-matiere` part du chapitre 3
// (« L'air et sa composition »), `conservation-de-la-masse` du chapitre 6
// (« Transformations chimiques et combustions »). Trois chapitres les séparent,
// et `programme.md` ne permet pas de les inverser — la chaîne chimique y est
// « mélanges → composition de l'air → atomes et molécules → transformation
// chimique ». Le moteur n'a donc rien à arbitrer, à une exception près, et elle
// est réelle : le chapitre 3 est `noyau`, donc non désactivable, mais un élève
// qui n'a pas encore atteint le chapitre 3 dans son année ne l'a pas rencontré
// pour autant. La règle à tenir n'est pas « chapitre 3 avant chapitre 6 », c'est
// « ce piège-ci rencontré avant celui-là », et elle se lit sur le profil, pas
// sur le corpus.
//
// ── Ce que la famille NE couvre PAS, et pourquoi ──────────────────────────
//
//   · **Les solides non rigides** (« le sable et la pâte, ce ne sont pas
//     vraiment des solides », § 3.2). Rang 3, et `charte.md` le nomme dans sa
//     courte liste de « ce sur quoi on ne dépense pas d'effort » : la
//     catégorisation naïve cède avec l'enseignement du modèle particulaire.
//     50 % des 12-13 ans, mais c'est « une des conceptions les moins tenaces du
//     lot » (§ 3.2). Un créneau dépensé ici est un créneau retiré au § 7 ②.
//   · **La réversibilité de l'évaporation**. Rang 3, et le cas est plus net
//     encore : § 7 mesure un saut de 25 % à 60 % ENTRE 13 ET 14 ANS, c'est-à-dire
//     pile sur la classe visée. C'est l'un des rares points où la littérature
//     montre un effet net et daté de l'enseignement, et il joue en notre faveur.
//     Attention à ne pas la confondre avec `matiere-disparait-quand-on-ne-la-
//     voit-plus`, qui est écrit : l'un dit « l'eau évaporée peut revenir » et
//     cède, l'autre dit « l'eau évaporée n'est nulle part » et ne cède pas.
//   · **Les gaz animistes** (« l'air chaud monte », jamais « l'air froid
//     descend » ; « l'air veut s'étendre partout », § 3.3). Robustesse ○, source
//     française (Séré 1986) mais « descriptions qualitatives, pas de
//     pourcentage ». Un piège inventé vaut moins que pas de piège. Seule la
//     conséquence matérielle est écrite, et c'est celle que § 3.3 marque comme
//     documentée.
//   · **L'équation de réaction** — le `+` lu comme une addition, la flèche lue
//     comme un signe égal, coefficients et indices confondus. C'est la famille
//     `symbolique.js`, déjà écrite, et le registre y est symbolique et non
//     macroscopique.
//   · **Les quatre catégories d'Andersson** (déplacement, modification,
//     transmutation, réaction chimique). Elles sont prêtes à l'emploi pour typer
//     les DISTRACTEURS, et § 3.6 les donne ; mais l'article original n'a pas été
//     lu (○) et les distracteurs s'écrivent avec les items, qui n'existent pas.
//     La catégorie « modification » est tout de même présente en substance, comme
//     raisonnement de `conservation-de-la-masse` : c'est elle qui produit le tiers
//     d'élèves qui répondent « inchangé » sur le clou rouillé — la rouille aurait
//     déjà été là, sous la surface. ⚠ Cette réponse est FAUSSE, et il faut le
//     dire ici parce que le fichier a d'abord écrit le contraire : le clou rouillé
//     pesé seul s'ALOURDIT, § 3.5 range « inchangé » parmi les erreurs, et le
//     constat `deux-clous-dont-un-rouille` le montre. Le raisonnement qui la porte
//     est donc écrit pour être réfuté, jamais concédé — « bonne réponse pour une
//     mauvaise raison » est un compliment qu'on ne peut pas lui faire.
//
// ── Un seul piège pour trois régimes de conservation, et pourquoi ─────────
//
// `charte.md` § « Le catalogue » énumère trois entrées — « non-conservation de la
// masse en système fermé, en système ouvert (la rouille), en combustion ». Elles
// sont ici UN SEUL piège, et c'est un choix qu'il faut pouvoir refuser.
//
// L'argument qui le décide n'est pas l'économie de créneaux, c'est la RÈGLE.
// Écrire trois pièges obligerait à écrire trois règles, et deux d'entre elles
// seraient fausses : « la masse se conserve » est FAUX du clou rouillé pesé seul
// (il s'alourdit) et FAUX de la laine de fer brûlée pesée seule (elle s'alourdit
// aussi). Une règle qui doit être vraie dans les trois régimes ne peut porter que
// sur la FRONTIÈRE DU SYSTÈME — ce qui la traverse et dans quel sens — et c'est
// exactement le diagnostic de la charte : « l'erreur est dans le découpage du
// système ». Une seule idée, donc un seul piège ; le régime est porté par
// `situation.systeme`, que `charte.md` exige « déclaré, jamais implicite », et
// les trois régimes sont les contextes de surface des constats.
//
// Conséquence à surveiller à l'écriture des items : les quatre constats de ce
// piège couvrent la dissolution en système fermé, la formation d'un gaz en
// système fermé, la combustion et la rouille en système ouvert. Le moteur ne
// doit jamais en servir deux fois le même — sans quoi la re-confrontation
// dégénère en test de mémoire, l'élève se souvenant du résultat de la pesée.
//
// ── La fiabilité, et le chiffre qu'on n'a pas le droit d'invoquer ─────────
//
// Six des huit pièges portent `fiabilite: 'secondaire'`, et c'est plus sévère que
// ce que `didactique.md` laisserait croire. Le § 3.5 marque ✔ le « seuls 40 % des
// élèves de 12-13 ans prédisent correctement la conservation lors d'une
// dissolution » (Johnston & Scott 1991) — mais `charte.md` le corrige en note :
// ce chiffre « a été lu sur un article de vulgarisation de la Royal Society of
// Chemistry, PAS sur l'IJSE », et `questions-ouvertes.md` § 1 le range parmi les
// trois originaux à racheter. Tous les autres chiffres de la famille (Andersson,
// Stavy, Prieto, Russell, Griffiths & Preston, Novick & Nussbaum, Schollum,
// Méheut) transitent par Barker 2000 et sont ◆. Aucun n'a été relu.
//
// `primaire` n'est donc revendiqué NULLE PART dans ce fichier, contrairement à
// `mouvement.js` (ressources institutionnelles françaises lues) et à
// `symbolique.js` (Canac & Kermen, série française lue). C'est la famille la
// mieux chiffrée du corpus et la moins bien sourcée : les deux vont ensemble,
// puisque la densité vient d'une revue de synthèse.
//
// ── Ce qui ne figure pas dans le contenu servi à l'élève ──────────────────
//
// Aucun pourcentage, aucun effectif, aucune date d'étude. Tout ce qui est chiffré
// ci-dessus reste dans ce commentaire et dans `didactique.md`. C'est la règle de
// sourçage de `charte.md`, et l'épisode du « 57 % d'ampèremètre » — chiffre de
// presse devenu argument fondateur du composant le plus lourd du projet — dit ce
// que coûte la règle inverse. Les valeurs physiques que le contenu porte (une
// masse, un volume) ne sont pas concernées : ce sont des grandeurs d'énoncé, pas
// des résultats de recherche.
//
// Aucun `antecedentHistorique` non plus. Le champ existe pour deux pièges, et
// `charte.md` les nomme : le capital force (Viennot : « exactement la théorie
// médiévale de l'impetus ») et l'extramission. La tentation est forte ici —
// phlogistique, Lavoisier, la pesée en vase clos — et il faut y résister : ni
// `didactique.md` ni `charte.md` ne portent cette filiation, et la reconstruire
// nous-mêmes serait fabriquer de l'histoire des sciences sur un projet dont le
// différenciant affiché est de dire à l'élève ce qui est vrai, y compris ce que
// l'application ne sait pas.
//
// Et aucune métaphore non auditée. § 6.1f et le rapport RSC disent la même chose
// de deux côtés : l'analogie de la rivière renforce le raisonnement séquentiel,
// les illustrations de manuels renforcent les particules-qui-gonflent. « Un
// schéma faux coûte plus cher qu'une phrase fausse, parce qu'il n'est pas relu. »
// C'est pour cette raison exacte que `particules-heritent-du-macroscopique`
// porte, dans ses raisonnements, une phrase qui met en cause le dessin du manuel
// plutôt que l'élève : c'est le dessin qui a tort, et le lui dire est une
// information, pas une consolation.
//
// ── Ce que ce fichier impose au reste de l'application ────────────────────
//
// 1. **Le plafond de dix pièges de rang 1 tombe ; le budget de créneaux, lui,
//    tient.** `charte.md` pose les deux : « au plus dix de rang 1 et environ six
//    de rang 2 », et le calcul qui les justifie — cinq re-confrontations par an
//    pour un rang 1, trois pour un rang 2, sur 100 séances au minimum. Les deux
//    ne tombent pas ensemble, et il faut le dire séparément.
//    Cette famille ajoute six rangs 1 et deux rangs 2. Le catalogue passe à
//    treize rangs 1 et huit rangs 2, soit 5 × 13 + 3 × 8 = **89 créneaux pour
//    100 disponibles** : le budget qui fonde le plafond est tenu, avec de la
//    marge. C'est le COMPTE de dix qui est dépassé, de trois.
//    Ce que cela veut dire, et c'est un renseignement plutôt qu'une faute : le
//    plafond de dix était une traduction prudente d'un budget, et il a été
//    calculé quand le catalogue supposait environ six rangs 2. Avec huit, la
//    même enveloppe finance plus de rangs 1 qu'il n'en tient. Il n'est de toute
//    façon pas réparable en retirant un piège d'ici — le § 7 ② est dans cette
//    famille — et cinq des six rangs 1 sont des rangs par élimination qu'un
//    relecteur peut refuser un par un, ce qui est la bonne façon de faire
//    descendre le compte s'il doit descendre.
//    ⚠ Le calcul ci-dessus a changé pendant l'écriture de ce fichier, et c'est
//    la raison de la précision qui précède : les familles sœurs ont été
//    re-rangées entre-temps (deux rangs 1 de `mouvement.js` sont devenus des
//    rangs 3, un rang 1 de `symbolique.js` est devenu un rang 2), faisant passer
//    le catalogue de dix rangs 1 à sept avant même notre arrivée. Toute reprise
//    de ce commentaire doit recompter plutôt que recopier.
//    Conséquence directe et non négociable de ce re-rangement : le contrôle
//    exige que tout rang 1 revienne plus vite que tout rang 3, et le rang 3 le
//    plus rapide est désormais à huit séances. Les deux `non-documente` de la
//    masse volumique, écrits d'abord à huit, sont à sept.
// 2. **`origine: 'mathematique'` n'a pas encore de cible.** `charte.md` demande
//    que les pièges d'origine mathématique « portent EN PLUS la section de
//    maths-4e vers laquelle renvoyer », versionnée par `CONTRAT_MATHS` contre
//    `maths-4e/public/sections.json`. Ni cet artefact ni ce champ n'existent :
//    `symbolique.js` porte déjà un `origine: 'mathematique'` sans cible, et se
//    contente de nommer la section en commentaire. Nous suivons la même
//    convention plutôt que d'inventer un identifiant qui ne se résoudrait sur
//    rien. La cible de `confusion-masse-et-masse-volumique` est le chapitre 5 de
//    `maths-4e` (proportionnalité et grandeurs composées), et le piège de maths
//    le plus proche y est `grandeur-quotient-inversee` — proche, pas identique :
//    celui-là porte sur le SENS du quotient (diviser à l'envers), celui-ci sur la
//    confusion des deux grandeurs elles-mêmes. Un élève peut poser la division
//    dans le bon sens et rendre quand même une masse.
// 3. **Ce fichier n'est pas encore assemblé.** `index.js` n'importe que quatre
//    familles et `tools/tester-pieges.mjs` ne relit que leurs quatre sources ; ce
//    fichier n'est donc contrôlé par rien tant que les deux ne le citent pas.
//    C'est une modification d'un fichier qui ne nous a pas été confié, et elle est
//    signalée plutôt que faite : l'ajouter fera tomber deux réserves du contrôle
//    (« matiere sans aucun piège », et la dépendance d'Andersson invérifiable) et
//    en fera apparaître deux autres (le plafond ci-dessus, et l'ordre non garanti
//    des deux rangs 2, dont le producteur est dans le même chapitre que le piège).
//
// ── Les objets ────────────────────────────────────────────────────────────
//
// `conditionValidite` prend la forme déclarative `{ champs, predicat, enClair }`
// de `mouvement.js` et `signaux.js` — un prédicat sur la `situation`, jamais un
// drapeau saisi à la main. La forme fonction de `symbolique.js` n'a pas de raison
// d'être ici : aucune de ces conditions ne demande de lire un graphe, et le
// prédicat déclaré se relit d'un coup d'œil, ce qui est précisément ce qu'un
// relecteur doit pouvoir faire.
//
// `champs` n'énumère QUE ce que le prédicat lit. `mouvement.js` a payé pour
// l'apprendre : « un champ déclaré et jamais lu donne l'illusion d'une condition
// dérivée là où il n'y en a pas ». Les contraintes qui portent sur la SÉRIE des
// trois réussites, et non sur un item isolé, vivent dans `formatDiagnostique`,
// jamais dans `champs`.
//
// Un constat est un dispositif où l'élève PRÉDIT d'abord : `predictionEngagee`
// est verrouillée avant l'affichage de `resultat`, et `conflit` dit ce que
// l'écart contredit. Sans engagement préalable il n'y a pas de conflit, juste une
// information de plus — et c'est démontré sur CETTE conception précisément
// (§ 7, conséquence n°1 : « sur la conservation de la masse, dire la règle est
// démontré insuffisant »). Les noms sont ceux des quatre familles depuis leur
// réconciliation.
//
// C'est la famille la plus riche en constats possibles du catalogue, et c'est la
// seule où le dispositif canonique — la pesée en système fermé, avant/après,
// prédiction verrouillée — est nommé par la charte comme LE constat fondateur de
// la partie chimie. Un seul piège porte en plus un `contreModele` : les autres en
// ont deux ou plus, et `charte.md` ne le demande que « quand aucun constat n'est
// possible ».

/** Trois chiffres significatifs : ce qu'affiche une balance de salle de classe,
 *  et ce qui évite qu'un contre-modèle promette une différence que les nombres
 *  qu'il montre ne portent pas. */
const arrondi = (x) => Number(x.toPrecision(3));

export default {
  // ══════════════════════════════════════════════════════════════════════════
  //  ① La matière disparaît quand on ne la voit plus
  //
  //  Source : didactique.md § 3.1 — Piaget & Inhelder 1974 (la permanence de la
  //  matière est une conquête, pas une donnée), Russell et al. 1989-1990,
  //  Stavy 1990a, Prieto et al. 1989. Tous ◆, via Barker 2000. Le § 7 ne le
  //  classe pas : rang 1 par élimination, voir l'en-tête.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « le sucre a fondu, il a
  //  disparu ». La règle dit qu'il s'est dispersé et que l'eau est sucrée —
  //  elle contredit la réponse. Le contrôle la contredit sans l'appli et sans
  //  nous : goûte, sens, pèse, fais revenir. Une seule trace qui répond suffit.
  // ══════════════════════════════════════════════════════════════════════════
  'matiere-disparait-quand-on-ne-la-voit-plus': {
    conception:
      'Ce qui cesse d\'être visible cesse d\'exister. Le sucre dissous n\'est plus '
      + 'là ; l\'eau de la flaque est « partie », ce qui veut dire qu\'elle n\'est '
      + 'nulle part. La matière n\'a pas d\'aspect permanent : elle peut disparaître '
      + 'tandis que sa saveur ou son odeur subsistent, sans que cette survie du goût '
      + 'fasse problème.',
    enonceEleve:
      'Le sucre, il a fondu, il a disparu. Et l\'eau de la flaque, elle est partie, '
      + 'c\'est tout.',
    rang: 1,
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch01-melanges-et-solubilite',
    rythmeInitial: 4,
    formatDiagnostique: {
      modeDeReponse:
        'Question PRODUCTIVE : « où est le sucre, maintenant ? », « sous quelle '
        + 'forme, et à quel endroit ? » — jamais « le sucre a-t-il disparu ? ». Un '
        + 'oui/non est rempli par le contrat didactique : pendant le chapitre, rien '
        + 'ne disparaît jamais, et l\'élève le sait avant d\'avoir réfléchi.',
      contexteImpose:
        'Au moins une des trois réussites porte sur une DISSOLUTION (la matière reste '
        + 'dans le récipient) et au moins une sur une ÉVAPORATION ou une diffusion (la '
        + 'matière quitte le récipient). Motif : ce ne sont pas deux décors du même '
        + 'problème. Dans le premier cas, montrer où elle est passée suffit ; dans le '
        + 'second, il faut d\'abord admettre que « partie » veut dire « partie quelque '
        + 'part », et c\'est un pas de plus.',
      pourquoi:
        'La conception ne se voit ni sur un calcul ni sur un classement : elle se voit '
        + 'à ce que l\'élève est capable de DÉSIGNER. Tant qu\'il ne peut nommer ni le '
        + 'lieu ni la forme, la matière a bel et bien disparu pour lui, quelle que soit '
        + 'la case qu\'il coche.',
    },
    conditionValidite: {
      champs: ['visibiliteApres', 'modeDeReponse'],
      predicat: "visibiliteApres === 'invisible' && modeDeReponse !== 'oui-non'",
      enClair:
        'Deux exigences, et chacune ferme une porte que l\'autre laisse ouverte. La '
        + 'matière doit avoir quitté le champ de la vue : sur un mélange hétérogène, '
        + 'sur une suspension trouble, sur du sable au fond d\'un verre, l\'élève voit '
        + 'tout et conserve tout — il répond juste sans rien concéder, et l\'item ne '
        + 'mesure rien. Et la réponse ne peut pas être un oui/non, mode de réponse que '
        + 'le contrat didactique remplit à la place de l\'élève. `visibiliteApres` est '
        + 'une donnée de la situation décrite, pas un jugement de l\'auteur : elle se '
        + 'lit sur l\'état final du système.',
    },
    regle:
      'Le sucre n\'a pas disparu : il s\'est **dispersé**, en morceaux si petits '
      + 'qu\'aucun œil ne peut les voir, répartis dans toute l\'eau. La preuve tient '
      + 'dans ta bouche — **l\'eau est sucrée**, et rien de ce qui a cessé d\'exister '
      + 'ne peut donner du goût. De même, l\'eau évaporée n\'est pas partie « nulle '
      + 'part » : elle est dans l\'air, en vapeur, et elle en ressort dès qu\'elle '
      + 'touche une surface froide. Une matière peut cesser d\'être **visible** sans '
      + 'cesser d\'**être**.',
    controle:
      'Cherche une trace **autre que la vue**. Goûte, sens, pèse, refroidis pour la '
      + 'faire revenir, chauffe pour faire partir le reste. Si une seule de ces traces '
      + 'répond, la matière est encore là — et « je ne la vois plus » n\'est plus une '
      + 'réponse recevable. Et si aucune ne répond **là où tu cherches**, ça ne prouve '
      + 'rien du tout : ça veut dire qu\'il faut chercher ailleurs. Au-dessus d\'une '
      + 'flaque qui a séché, l\'air de la pièce est immense, et c\'est en le '
      + 'refroidissant sur une vitre qu\'on l\'oblige à rendre l\'eau. C\'est un geste '
      + 'qui marche partout, y compris sur des situations qu\'on ne t\'a jamais '
      + 'montrées.',
    raisonnements: [
      {
        id: 'je-ne-le-vois-plus',
        texte: 'Je ne le vois plus nulle part, donc il n\'y est plus',
        reponse:
          'Tu as raison sur le fait : il n\'est plus visible, personne ne peut le voir, '
          + 'et ça se vérifie. Ce que ta phrase ajoute sans le dire, c\'est que '
          + '« invisible » et « absent » sont la même chose. Ils le sont partout '
          + 'ailleurs dans ta vie — une chaussette qu\'on ne voit plus est perdue. Ils '
          + 'ne le sont pas pour la matière, et c\'est une des rares fois où il faut '
          + 'mettre ce réflexe de côté. Goûte l\'eau.',
      },
      {
        id: 'les-cristaux-ont-fondu',
        texte: 'Les cristaux ont rapetissé puis ont fondu : il n\'en reste rien',
        reponse:
          'L\'observation est exacte, et c\'est même la bonne description de ce qui se '
          + 'passe : ils rapetissent vraiment, jusqu\'à ne plus se voir. Ce qui '
          + 'rapetisse, c\'est chaque MORCEAU, pas la quantité de sucre. Tu es passé de '
          + 'quelques gros morceaux à un nombre immense de morceaux minuscules, '
          + 'répartis partout dans l\'eau. Compte le sucre, pas les morceaux.',
      },
      {
        id: 'la-flaque-a-seche',
        texte: 'L\'eau de la flaque s\'est évaporée : elle est partie, donc elle n\'est plus',
        reponse:
          '« Partie » est le bon mot, et il en dit plus que tu ne crois : partir, '
          + 'c\'est partir QUELQUE PART. Elle est dans l\'air de la pièce, en vapeur, '
          + 'invisible. Tiens un couvercle froid au-dessus d\'une casserole d\'eau '
          + 'chaude : elle revient, en gouttes, sous tes yeux.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Reprends par une trace qui n\'est pas la vue : est-ce que ça a encore un '
          + 'goût, une odeur, une masse ? Une seule réponse suffit.',
      },
    ],
    constats: [
      {
        id: 'sucre-dissous-puis-evapore',
        contexteDeSurface: 'dissolution-du-sucre',
        dispositif:
          'On dissout une cuillère de sucre dans un verre d\'eau tiède, jusqu\'à ce que '
          + 'plus rien ne se voie. On verse le tout dans une assiette large et on '
          + 'laisse l\'eau s\'évaporer pendant deux jours.',
        predictionEngagee: {
          question:
            'Avant de commencer : que restera-t-il dans l\'assiette quand toute l\'eau '
            + 'sera partie ?',
          champs: [
            { id: 'reste', etiquette: 'ce qu\'il restera dans l\'assiette' },
            { id: 'quantite', etiquette: 'plus, moins ou autant de sucre qu\'au départ' },
          ],
        },
        resultat:
          'Le sucre est là, au fond de l\'assiette, en croûte blanche — et la balance '
          + 'lui trouve la même masse qu\'à la cuillère de départ.',
        conflit:
          'Ce qui revient à l\'identique n\'a pas cessé d\'exister entre-temps. Le sucre '
          + 'est resté là pendant tout ce temps, sans qu\'on puisse le voir.',
      },
      {
        id: 'soucoupe-sous-cloche',
        contexteDeSurface: 'evaporation-de-l-eau',
        dispositif:
          'Une soucoupe d\'eau posée sous une cloche de verre transparente, fermée '
          + 'hermétiquement sur une plaque. On laisse au soleil une journée.',
        predictionEngagee: {
          question:
            'La soucoupe va-t-elle se vider ? Et si elle se vide, où sera l\'eau à la '
            + 'fin de la journée ? Montre-le sur la cloche.',
          champs: [
            { id: 'soucoupe', etiquette: 'état de la soucoupe le soir' },
            { id: 'ou', etiquette: 'où est l\'eau, à la fin' },
          ],
        },
        resultat:
          'La soucoupe se vide en grande partie, et des gouttes apparaissent partout '
          + 'sur la paroi intérieure de la cloche. Rien n\'est sorti : elle était fermée.',
        conflit:
          'L\'eau n\'a pas quitté l\'existence, elle a quitté la soucoupe. Elle est '
          + 'passée dans l\'air enfermé sous la cloche, et elle en ressort dès qu\'elle '
          + 'touche une paroi plus froide.',
      },
      {
        id: 'parfum-a-l-autre-bout-de-la-piece',
        contexteDeSurface: 'odeur-qui-traverse',
        dispositif:
          'On vaporise une fois du parfum dans un coin d\'une pièce fermée, sans '
          + 'courant d\'air. Trois personnes sont assises à trois distances '
          + 'différentes, les yeux ouverts.',
        predictionEngagee: {
          question:
            'Qui sentira quelque chose, dans quel ordre, et au bout de combien de '
            + 'temps ? Et qui VERRA passer quelque chose ?',
          champs: [
            { id: 'ordre', etiquette: 'ordre dans lequel les trois sentiront' },
            { id: 'vu', etiquette: 'ce que l\'on verra passer' },
          ],
        },
        resultat:
          'Les trois finissent par sentir, du plus proche au plus lointain, en quelques '
          + 'minutes. Personne ne voit passer quoi que ce soit.',
        conflit:
          'Rien de visible n\'a traversé la pièce, et pourtant quelque chose l\'a '
          + 'traversée : ça a mis du temps, ça a suivi un ordre, ça est arrivé. Ce qui '
          + 'se déplace et met du temps à arriver existe.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ② Le gaz n'est pas de la matière et ne pèse rien
  //
  //  Source : didactique.md § 3.3 (Séré 1986 — un gaz n'est jamais un objet,
  //  toujours une action) et § 3.1 (40 % des 10-12 ans jugent le propanone
  //  évaporé « sans poids » parce qu'il est devenu invisible, Stavy 1990a).
  //  Tous ◆. Rang 1 par élimination, et c'est le rang le plus contestable du
  //  fichier : voir l'en-tête, où l'objection du § 7 rang 3 est écrite.
  //
  //  ⚠ DÉPENDANCE ANDERSSON. Ce piège doit avoir été RENCONTRÉ avant que
  //  `conservation-de-la-masse` soit programmé — sans quoi l'élève n'a pas les
  //  termes du bilan qu'on lui demande de faire. Il part du chapitre 3, l'autre
  //  du chapitre 6 : la progression le garantit, à ceci près qu'un élève qui
  //  n'a pas encore atteint le chapitre 3 ne l'a pas rencontré pour autant. La
  //  règle se lit sur le profil, pas sur les numéros de chapitre.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « le ballon gonflé et le
  //  ballon dégonflé pèsent pareil ». La règle dit que le gonflé est plus lourd
  //  et qu'une balance assez fine le voit — elle contredit la réponse. Le
  //  contrôle mord sur la même : le gaz peut-il entrer ou sortir de ce que tu
  //  pèses, et dans quel sens ? Qui ne sait pas répondre l'avait compté zéro.
  // ══════════════════════════════════════════════════════════════════════════
  'gaz-n-est-pas-de-la-matiere': {
    conception:
      'Un gaz n\'est pas tout à fait de la matière : il n\'a pas de masse, ou une '
      + 'masse si petite qu\'elle vaut zéro. Il n\'est pas un objet mais une action — '
      + 'un souffle, une odeur, une poussée. On peut donc le laisser hors d\'un bilan '
      + 'de masse sans que rien ne s\'en ressente.',
    enonceEleve:
      'L\'air, ça ne pèse rien. Un ballon gonflé et le même ballon dégonflé, sur une '
      + 'balance, c\'est pareil.',
    rang: 1,
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch03-air-et-composition',
    rythmeInitial: 3,
    formatDiagnostique: {
      modeDeReponse:
        'Pesée avant/après, avec une VALEUR chiffrée prédite et son unité, '
        + 'verrouillées avant l\'affichage. Le sens seul ne suffit pas : « plus lourd » '
        + 'et « un peu plus lourd » se disent pareil, et l\'élève qui accorde du bout '
        + 'des lèvres une masse « négligeable » a répondu juste sans avoir bougé.',
      contexteImpose:
        'Au moins une des trois réussites porte sur un gaz qui n\'a NI odeur, NI '
        + 'couleur, NI effet visible — l\'air d\'un ballon, pas le gaz d\'une boisson qui '
        + 'pétille. Motif : sur un gaz qu\'on sent ou qu\'on voit bouillonner, l\'élève '
        + 'accorde une existence sans accorder une masse, et c\'est la masse qui est en '
        + 'jeu.',
      pourquoi:
        'La conception ne porte pas sur l\'existence du gaz — l\'élève sait que l\'air '
        + 'est là, il le sent quand il souffle. Elle porte sur son inscription dans un '
        + 'bilan. Seule une balance tranche.',
    },
    conditionValidite: {
      champs: ['quantiteDeGazVariable', 'grandeurInterrogee'],
      predicat: "quantiteDeGazVariable === true && grandeurInterrogee === 'masse'",
      enClair:
        'L\'item ne teste la conception que si la quantité de gaz présente dans ce '
        + 'qu\'on pèse CHANGE entre les deux mesures, et si ce qu\'on demande est une '
        + 'masse. Peser deux fois un flacon scellé sans rien y faire ne mesure rien : '
        + 'les deux modèles y prédisent la même chose. Et demander « l\'air est-il de la '
        + 'matière ? » mesure la leçon, pas la conception — c\'est la question type à '
        + 'laquelle un élève répond « oui » en continuant de peser comme si non. Ce que '
        + 'la RÉPONSE doit être (une valeur avec son unité) et sur quel gaz porte au '
        + 'moins une des réussites relèvent de `formatDiagnostique`, pas d\'ici : ce '
        + 'sont des contraintes sur la série, pas sur l\'item.',
    },
    regle:
      'Un gaz est de la matière, et **il pèse**. Un ballon bien gonflé est plus lourd '
      + 'que le même ballon dégonflé, et une balance assez fine le voit sans '
      + 'difficulté. Ce qui est vrai dans ce que tu dis, c\'est qu\'un gaz pèse **très '
      + 'peu pour la place qu\'il prend** — bien moins qu\'un liquide ou qu\'un solide '
      + 'du même volume. C\'est ce « très peu » que tu as arrondi à « rien ». Un gaz '
      + 'entre et sort d\'un bilan de masse comme n\'importe quelle autre matière : en '
      + 'emportant sa masse avec lui.',
    controle:
      'Avant de décider qu\'un gaz ne compte pas, demande-toi s\'il est **enfermé ou '
      + 'non** dans ce que tu pèses. S\'il peut entrer ou sortir, la balance changera — '
      + 'et dis dans quel sens : **le gaz qui entre alourdit, le gaz qui sort allège**. '
      + 'Si tu ne sais pas répondre à « dans quel sens ? », c\'est le signe que tu '
      + 'l\'avais compté pour zéro sans t\'en apercevoir.',
    raisonnements: [
      {
        id: 'un-ballon-monte',
        texte: 'Un ballon gonflé monte tout seul : ce qui monte ne peut pas peser',
        reponse:
          'Il monte vraiment, et c\'est une bonne observation — beaucoup ne la font '
          + 'pas. Un ballon d\'hélium monte parce que l\'air qui l\'entoure pèse PLUS que '
          + 'lui à volume égal, pas parce qu\'il ne pèse rien. Un bateau en acier '
          + 'flotte, et personne n\'en conclut que l\'acier ne pèse rien.',
      },
      {
        id: 'je-ne-le-sens-pas-dans-la-main',
        texte: 'Un sac vide et un sac plein d\'air, dans ma main, c\'est identique',
        reponse:
          'C\'est exact, et tu ne POURRAIS pas sentir la différence : ta main n\'est pas '
          + 'une balance assez fine, voilà tout. Le même raisonnement te ferait dire '
          + 'qu\'une feuille de papier ne pèse rien — pose-en mille sur une balance et '
          + 'regarde. « Trop petit pour ma main » n\'est pas « nul ».',
      },
      {
        id: 'un-gaz-c-est-presque-du-vide',
        texte: 'Un gaz, c\'est presque du vide : il n\'y a quasiment rien dedans',
        reponse:
          'Il y a beaucoup de vide, oui, bien plus que dans un liquide ou un solide, et '
          + 'cette partie de ton raisonnement est juste. Mais entre les vides il y a des '
          + 'particules, et chacune pèse exactement ce qu\'elle pèserait dans un liquide '
          + 'ou dans un solide. Elles sont moins nombreuses par litre, pas plus légères.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Repars de la balance : a-t-on ajouté ou retiré du gaz à ce qui est posé '
          + 'dessus ? Et dans quel sens ça devrait la faire bouger ?',
      },
    ],
    constats: [
      {
        id: 'ballon-de-basket-gonfle-a-la-pompe',
        contexteDeSurface: 'ballon-gonfle',
        dispositif:
          'Un ballon de basket un peu mou, posé sur une balance qui affiche le centième '
          + 'de gramme. On lit la masse, on le gonfle de vingt coups de pompe, on le '
          + 'repose sur la même balance.',
        predictionEngagee: {
          question:
            'Tu as sous les yeux la première pesée. Que va afficher la balance après '
            + 'les vingt coups de pompe ?',
          champs: [{ id: 'apres', etiquette: 'seconde pesée', unite: 'g' }],
        },
        resultat:
          'La seconde valeur est plus grande que la première. La différence est petite, '
          + 'et elle est bien là : stable, reproductible.',
        conflit:
          'On n\'a rien ajouté qu\'on puisse voir, et le ballon n\'a rien reçu d\'autre '
          + 'que de l\'air. La balance, elle, a vu arriver quelque chose.',
      },
      {
        id: 'bouteille-d-eau-gazeuse-ouverte',
        contexteDeSurface: 'eau-gazeuse',
        dispositif:
          'Une bouteille d\'eau gazeuse fermée, pesée. On l\'ouvre, on la laisse ouverte '
          + 'toute la nuit sans rien en verser, on la repèse le lendemain.',
        predictionEngagee: {
          question:
            'On n\'aura rien versé, pas une goutte. La balance affichera-t-elle plus, '
            + 'moins, ou la même chose ?',
          champs: [
            { id: 'sens', etiquette: 'plus / moins / pareil' },
            { id: 'pourquoi', etiquette: 'ce qui a bougé, s\'il y a lieu' },
          ],
        },
        resultat:
          'Moins. La bouteille est plus légère le lendemain, et l\'eau ne pétille plus.',
        conflit:
          'Le niveau du liquide n\'a pas baissé et rien n\'a été versé. Ce qui est parti '
          + 'est parti en bulles, sous forme de gaz — et ce départ se lit sur la '
          + 'balance. Un gaz qui s\'en va emporte de la masse.',
      },
      {
        id: 'dioxyde-de-carbone-verse-sur-une-bougie',
        contexteDeSurface: 'gaz-qu-on-verse',
        dispositif:
          'Un bécher qui a l\'air vide, mais qu\'on vient de remplir de dioxyde de '
          + 'carbone. Une bougie allumée, plus bas, à côté. On penche lentement le '
          + 'bécher au-dessus de la flamme, sans le toucher.',
        predictionEngagee: {
          question:
            'Le bécher a l\'air vide et on ne verse rien qui se voie. Que va-t-il '
            + 'arriver à la flamme, et pourquoi ?',
          champs: [
            { id: 'flamme', etiquette: 'ce qui arrive à la flamme' },
            { id: 'cause', etiquette: 'ce qui, selon toi, l\'a provoqué' },
          ],
        },
        resultat: 'La flamme s\'éteint, comme si on avait versé de l\'eau dessus.',
        conflit:
          'Quelque chose a coulé du bécher jusqu\'à la bougie, en descendant. Ce qui '
          + 'tombe est attiré par la Terre, et ce qui est attiré par la Terre a une '
          + 'masse. Personne ne l\'a vu passer.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ③ La masse ne se conserve pas — LE § 7 ②, et le seul rang 1 non déduit
  //
  //  Source : didactique.md § 3.5 et § 7 ② — Andersson 1984 et 1990, Driver dans
  //  Briggs et al. 1986, Johnston & Scott 1991. Le chiffre décisif du § 7 (la
  //  proportion d'élèves de 15 ans qui prédisent une masse inchangée passe d'un
  //  tiers à une moitié après un cours de chimie) est ◆ ; le seul ✔ du dossier,
  //  Johnston & Scott, est corrigé par charte.md en note — lu sur une page de
  //  vulgarisation, pas sur l'IJSE. D'où `fiabilite: 'secondaire'` malgré le ✔.
  //
  //  UN SEUL PIÈGE POUR TROIS RÉGIMES — voir l'en-tête. La raison est la règle :
  //  « la masse se conserve » est FAUX du clou rouillé pesé seul et FAUX de la
  //  laine de fer brûlée pesée seule, qui s'alourdissent tous les deux. Seule
  //  une règle portant sur la FRONTIÈRE du système est vraie dans les trois.
  //
  //  Épreuve de réfutation, faite deux fois plutôt qu'une, parce que ce piège
  //  produit deux réponses fausses opposées.
  //    · « la laine de fer brûlée pèse moins, la fumée est partie » — la règle
  //      dit que le fer capte l'oxygène de l'air et s'alourdit : contredit.
  //    · « le sucre dissous en flacon bouché pèse moins » — la règle dit que si
  //      rien ne franchit la frontière, la masse est exactement la même :
  //      contredit.
  //  Le contrôle mord sur les deux d'un seul geste : trace la frontière, puis
  //  demande si quelque chose l'a franchie et dans quel sens. « Ça a brûlé donc
  //  c'est plus léger » ne répond à aucune des deux questions.
  // ══════════════════════════════════════════════════════════════════════════
  'conservation-de-la-masse': {
    conception:
      'La masse suit ce qu\'on voit du système. Elle diminue quand quelque chose '
      + 'devient invisible ou s\'échappe — fumée, gaz, sucre dissous —, elle augmente '
      + 'quand un solide apparaît, et elle ne bouge pas quand l\'élève juge que la '
      + 'transformation n\'a fait que RÉVÉLER ce qui était déjà là (la rouille dormait '
      + 'sous la surface). Les prémisses sont justes : les cristaux rapetissent, la '
      + 'fumée est plus légère qu\'un solide, l\'oxygène ne se sent pas. L\'erreur est '
      + 'dans le découpage du système — on raisonne sur une partie, on conclut sur le '
      + 'tout.',
    enonceEleve:
      'Quand quelque chose part en fumée ou se dissout, forcément ça pèse moins '
      + 'après. Et le clou rouillé, la rouille l\'a rongé : il est plus léger.',
    rang: 1,
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch06-transformations-chimiques',
    rythmeInitial: 3,
    formatDiagnostique: {
      modeDeReponse:
        'Pesée avant/après avec la VALEUR prédite et son unité, saisies et '
        + '**verrouillées avant l\'affichage du résultat**. C\'est le dispositif que '
        + 'la charte nomme canonique pour toute la partie chimie, et son point dur '
        + 'est l\'engagement : sans prédiction verrouillée, la pesée n\'est pas un '
        + 'conflit, c\'est une information de plus. Le sens seul ne suffit pas — « ça '
        + 'pèse moins » ne distingue pas celui qui a compté le gaz sortant de celui '
        + 'qui n\'a rien compté du tout.',
      contexteImpose:
        'Les trois réussites ne portent pas toutes sur le même régime : au moins une '
        + 'en système FERMÉ et au moins une en système OUVERT. Motif tiré de § 3.5 : '
        + 'ce sont deux répartitions d\'erreurs différentes. En système fermé, un '
        + 'tiers des élèves de 15 ans ne conservent toujours pas ; en système ouvert, '
        + 'les réponses se partagent en trois tiers presque parfaits, dont un tiers '
        + 'de « inchangé » — réponse FAUSSE sur le clou, qui s\'alourdit, et qui vient '
        + 'd\'une conception à part entière : la rouille aurait déjà été là, sous la '
        + 'surface. Un élève juste en fermé peut être faux en ouvert, et l\'inverse.',
      pourquoi:
        'Énoncer la règle est démontré insuffisant sur cette conception précisément. '
        + 'Ce qui fait le travail, c\'est la pesée avec engagement préalable.',
    },
    conditionValidite: {
      champs: ['systeme', 'matiereQuiChangeDeVisibilite', 'grandeurInterrogee'],
      predicat:
        "grandeurInterrogee === 'masse' && matiereQuiChangeDeVisibilite === true "
        + "&& (systeme === 'ferme' || systeme === 'ouvert')",
      enClair:
        'Trois exigences. La grandeur, parce que ce piège est un piège de masse et '
        + 'que le même dispositif interrogé sur le volume ou la couleur ne le teste '
        + 'pas. Le changement de visibilité, parce qu\'un item où l\'on voit tout du '
        + 'début à la fin — mélanger deux liquides colorés qui restent là — est juste '
        + 'AVEC la conception : l\'élève voit tout, conserve tout, et l\'item confirme '
        + 'ce qu\'il croit. Et le régime, que charte.md exige « déclaré, jamais '
        + 'implicite » : un énoncé du type « on fait brûler du papier » ne permet '
        + 'aucune prédiction juste, parce que ni l\'élève ni nous ne savons ce qui est '
        + 'sur la balance. Le champ doit valoir l\'une des deux valeurs ; absent, il '
        + 'invalide l\'item plutôt que de laisser deviner.',
    },
    regle:
      'La masse ne suit pas ce qu\'on voit, elle suit **ce qui entre et ce qui sort**. '
      + 'Si rien n\'entre ni ne sort — récipient fermé —, la masse totale est '
      + '**exactement la même** avant et après, même si tout a changé d\'aspect, même '
      + 's\'il s\'est formé du gaz à l\'intérieur. Si le récipient est ouvert, la masse '
      + 'de ce qu\'on pèse change, mais **de la masse exacte de ce qui a traversé la '
      + 'frontière**, ni plus ni moins : le clou qui rouille et la laine de fer qui '
      + 'brûle **captent l\'oxygène de l\'air**, donc ils s\'**alourdissent** tous les '
      + 'deux.',
    controle:
      'Avant de prédire, **trace la frontière** : entoure du doigt ce qui est posé sur '
      + 'la balance. Puis pose une seule question — quelque chose a-t-il franchi ce '
      + 'trait ? Si **non**, ta prédiction ne peut être que « la même masse », et rien '
      + 'd\'autre. Si **oui**, dis dans quel sens : ce qui entre alourdit, ce qui sort '
      + 'allège. « Ça a brûlé, donc c\'est plus léger » ne répond à aucune des deux '
      + 'questions — et c\'est à ça que tu le reconnaîtras.',
    raisonnements: [
      {
        id: 'la-fumee-est-partie',
        texte: 'La fumée est partie, et ce qui est parti ne pèse plus',
        reponse:
          'Ce qui est parti ne pèse plus SUR CETTE BALANCE — là tu as parfaitement '
          + 'raison, et c\'est la moitié du raisonnement, la moitié que beaucoup '
          + 'oublient. Il manque l\'autre moitié : pendant que la fumée sortait, '
          + 'l\'oxygène de l\'air, lui, entrait. Et il en entre plus qu\'il ne sort de '
          + 'fumée. La laine de fer brûlée est plus lourde qu\'avant.',
      },
      {
        id: 'les-cristaux-rapetissent',
        texte: 'Les cristaux de sucre rapetissent jusqu\'à disparaître : il en reste moins',
        reponse:
          'Ton observation est exacte : ils rapetissent vraiment, c\'est ce qu\'on voit, '
          + 'et personne ne peut te dire le contraire. Ce qui rapetisse, c\'est chaque '
          + 'morceau, pas le total. Compte le sucre, pas les morceaux : il est entier, '
          + 'dispersé dans toute l\'eau, et la balance ne bouge pas d\'un dixième de '
          + 'gramme.',
      },
      {
        id: 'la-rouille-ronge-le-clou',
        texte: 'La rouille ronge le métal, donc le clou rouillé est plus léger',
        reponse:
          'Le clou est bien abîmé, il s\'effrite, il casse plus facilement : là-dessus '
          + 'tu ne te trompes pas du tout. Mais « abîmé » et « plus léger » ne sont pas '
          + 'la même chose. La rouille, c\'est du fer qui s\'est **combiné** à l\'oxygène '
          + 'de l\'air : rien n\'est parti, quelque chose est venu s\'ajouter. Un clou '
          + 'rouillé pèse plus lourd qu\'avant de rouiller.',
      },
      {
        id: 'la-rouille-etait-deja-la',
        texte: 'La rouille était déjà là sous la surface : elle est juste apparue, rien n\'a changé',
        reponse:
          'C\'est une idée cohérente, et elle explique bien ce que tu vois : la rouille a '
          + 'l\'air de remonter de l\'intérieur du métal, comme une couleur qui '
          + 'traverse. Elle te fait prédire « la même masse », et c\'est exactement là '
          + 'qu\'elle se casse — le clou rouillé pèse **plus lourd** que le clou neuf, et '
          + 'on peut le vérifier en le posant sur la balance à côté d\'un clou resté au '
          + 'sec. Rien n\'est remonté de l\'intérieur : quelque chose est venu du dehors. '
          + 'Le fer n\'avait pas la rouille en lui, il lui manquait l\'oxygène de l\'air.',
      },
      {
        id: 'ca-a-change-donc-ca-change',
        texte: 'Tout a changé d\'aspect : ça ne peut pas peser pareil',
        reponse:
          'C\'est le raisonnement le plus naturel du monde, et il marche pour presque '
          + 'tout ce que tu manipules — un objet transformé n\'est plus le même objet. '
          + 'En chimie il ne marche pas, et ce n\'est pas quelque chose qu\'on oublie : '
          + 'c\'est quelque chose qu\'on apprend à suspendre. Les chimistes y pensent à '
          + 'chaque pesée, et ils y penseront toute leur vie.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Trace la frontière : qu\'est-ce qui est posé sur la balance ? Et est-ce que '
          + 'quelque chose est entré ou sorti de ce trait ?',
      },
    ],
    constats: [
      {
        id: 'sucre-dissous-en-flacon-bouche',
        contexteDeSurface: 'dissolution-en-systeme-ferme',
        dispositif:
          'Un flacon à bouchon vissé, contenant de l\'eau et, posé à côté sur la '
          + 'balance, un sachet de sucre. On pèse l\'ensemble, on verse le sucre dans '
          + 'le flacon, on revisse, on agite jusqu\'à ce qu\'il ne reste rien à voir, on '
          + 'repose l\'ensemble sur la même balance.',
        predictionEngagee: {
          question:
            'La première pesée est affichée. Que va afficher la balance une fois tout '
            + 'le sucre dissous ?',
          champs: [{ id: 'apres', etiquette: 'seconde pesée', unite: 'g' }],
        },
        resultat: 'La même valeur, au centième de gramme près.',
        conflit:
          'Le sucre n\'est plus visible nulle part, et la balance ne s\'en est pas '
          + 'aperçue. Ce qui n\'a pas quitté le flacon n\'a pas quitté la pesée.',
      },
      {
        id: 'bouteille-scellee-vinaigre-bicarbonate',
        contexteDeSurface: 'gaz-forme-en-systeme-ferme',
        dispositif:
          'Une bouteille en plastique rigide à bouchon vissé : de l\'eau vinaigrée au '
          + 'fond, une capsule de bicarbonate suspendue sous le bouchon. On pèse la '
          + 'bouteille fermée, on la retourne pour faire tomber la capsule, ça mousse '
          + 'fort, on repèse — toujours fermée.',
        predictionEngagee: {
          question:
            'Il va se former beaucoup de gaz, tu vas le voir et l\'entendre. Que va '
            + 'afficher la balance après ?',
          champs: [
            { id: 'apres', etiquette: 'seconde pesée', unite: 'g' },
            { id: 'sens', etiquette: 'plus / moins / pareil, et pourquoi' },
          ],
        },
        resultat:
          'La même masse, au centième de gramme près. La bouteille est pourtant '
          + 'devenue dure, et il y a maintenant dedans un gaz qui n\'y était pas.',
        conflit:
          'Du gaz est apparu, et la balance n\'a rien vu apparaître ni disparaître. '
          + 'Rien n\'a franchi le bouchon : les atomes se sont réarrangés, ils ne se '
          + 'sont ni créés ni détruits.',
      },
      {
        id: 'laine-de-fer-brulee',
        contexteDeSurface: 'combustion-en-systeme-ouvert',
        dispositif:
          'Un tampon de laine de fer pesé à l\'air libre, puis enflammé au briquet — il '
          + 'rougeoie, il fume un peu — puis repesé une fois refroidi, sans qu\'on ait '
          + 'perdu un morceau.',
        predictionEngagee: {
          question:
            'Ça va brûler, fumer, changer complètement d\'aspect. Plus lourd, plus '
            + 'léger, ou pareil ? Écris aussi de combien, à ton avis.',
          champs: [
            { id: 'sens', etiquette: 'plus lourd / plus léger / pareil' },
            { id: 'apres', etiquette: 'seconde pesée', unite: 'g' },
          ],
        },
        resultat: 'Plus lourd qu\'avant. Nettement.',
        conflit:
          'Quelque chose de visible est parti — de la lumière, un peu de fumée — et '
          + 'pourtant la masse a AUGMENTÉ. Ce qui est entré sans se voir pesait plus '
          + 'que ce qui est sorti en se voyant. Le fer s\'est combiné à l\'oxygène.',
      },
      {
        id: 'deux-clous-dont-un-rouille',
        contexteDeSurface: 'rouille-en-systeme-ouvert',
        dispositif:
          'Deux clous neufs identiques, pesés séparément et notés. L\'un est enfermé au '
          + 'sec, l\'autre laissé dehors, humide, pendant trois semaines. On les repèse '
          + 'tous les deux, sans rien gratter.',
        predictionEngagee: {
          question:
            'Dans trois semaines, lequel des deux sera le plus lourd — et pourquoi ?',
          champs: [
            { id: 'lequel', etiquette: 'le clou sec / le clou rouillé / les deux pareil' },
            { id: 'raison', etiquette: 'ce qui, selon toi, explique la différence' },
          ],
        },
        resultat:
          'Le clou rouillé est le plus lourd des deux. Le clou resté au sec n\'a pas '
          + 'bougé.',
        conflit:
          'La rouille n\'a rien rongé : elle a AJOUTÉ. C\'est du fer qui a capturé de '
          + 'l\'oxygène de l\'air, et cet oxygène-là est venu de l\'extérieur du clou.',
      },
    ],
    // Le constat suffit à la remédiation ; le contre-modèle sert à autre chose,
    // et c'est la raison pour laquelle il est ici plutôt qu'ailleurs : il montre à
    // l'élève POURQUOI son modèle lui a si bien servi jusqu'ici.
    //
    // ⚠ Ce que ce contre-modèle NE dit PAS, et qu'une première rédaction lui
    // faisait dire : que le modèle de l'élève serait juste « en système fermé ».
    // Il ne l'est pas, et la fonction ci-dessous le calcule correctement — sur la
    // bouteille scellée du constat n° 2, où un gaz se forme À L'INTÉRIEUR, l'élève
    // retire cette masse-là et la balance ne la retire pas. Ce qui annule l'écart
    // n'est pas la fermeture du récipient, ce sont les DEUX PARAMÈTRES à zéro :
    // rien n'est devenu invisible, rien n'est entré sans se voir. C'est le cas de
    // presque tout ce que l'élève a manipulé, et c'est là toute l'explication de
    // la robustesse de sa conception. Un verdict qui absout le modèle en système
    // fermé conforte l'élève exactement sur le cas que `didactique.md` § 7 ②
    // désigne comme le plus coûteux, et il contredit les nombres qu'il affiche.
    contreModele: {
      enonce:
        'Si ce qui devient invisible cessait de compter, la balance perdrait la masse '
        + 'de tout ce qui est devenu gaz — qu\'il soit sorti ou qu\'il soit resté '
        + 'enfermé — et ne gagnerait rien de ce qui est entré sans se voir.',
      // Le modèle a deux paramètres, et ce sont les deux que l'élève renseigne
      // lui-même : ce qui est DEVENU gaz (sorti ou non — c'est la visibilité qui
      // commande sa conception, pas la frontière) et ce qui est entré depuis l'air. Le
      // modèle tourne avec SES valeurs. `relation` et `ecart` sont DÉRIVÉES des
      // nombres calculés, jamais annoncées d'avance : avec une entrée nulle, les
      // deux prédictions coïncident, et le contre-modèle ne peut pas affirmer une
      // différence que les nombres qu'il affiche ne portent pas.
      predire: ({
        systeme, masseAvant, masseDevenueGaz = 0, masseEntreeSansSeVoir = 0,
      }) => {
        const selonToi = arrondi(masseAvant - masseDevenueGaz);
        // La balance ne perd que ce qui a FRANCHI la frontière, et elle gagne ce
        // qui l'a franchie dans l'autre sens. En système fermé, le gaz formé
        // reste dedans et rien n'entre : les deux termes sont nuls.
        const mesuree = arrondi(systeme === 'ferme'
          ? masseAvant
          : masseAvant - masseDevenueGaz + masseEntreeSansSeVoir);
        const ecart = arrondi(mesuree - selonToi);
        let relation = 'identiques';
        if (ecart > 0) relation = 'ton modèle prédit trop peu';
        else if (ecart < 0) relation = 'ton modèle prédit trop';
        return { selonToi, mesuree, ecart, relation };
      },
      verdict:
        'Ton modèle et la balance tombent sur le même nombre dans un seul cas : quand '
        + 'rien n\'est devenu invisible et que rien n\'est entré sans se voir. C\'est '
        + 'presque tout ce que tu as manipulé dans ta vie, et c\'est exactement pour ça '
        + 'qu\'il t\'a si bien servi jusqu\'ici. Dès qu\'un gaz se forme, ton modèle '
        + 'retire sa masse — **même dans un récipient bien fermé d\'où rien ne peut '
        + 'sortir**, où la balance, elle, ne retire rien. Et à l\'air libre il lui '
        + 'manque en plus tout ce qui est entré sans se voir. Regarde l\'écart affiché : '
        + 'c\'est, au gramme près, la masse de ce que tu as cessé de compter.',
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ④ Les particules héritent des propriétés du macroscopique
  //     RANG 2, NOUS LE FABRIQUONS
  //
  //  Source : didactique.md § 3.4b et § 7 (liste du rang 2) — Happs 1980 (les
  //  particules « changent de forme, explosent, brûlent, se dilatent, changent
  //  de couleur, ou rétrécissent »), Griffiths & Preston 1992 (~50 % des jeunes
  //  de 18 ans pensent les molécules de vapeur plus grosses que celles de la
  //  glace). Tous ◆. § 3.4b : « l'obstacle le plus tenace et le plus
  //  spécifiquement chimie », un état intermédiaire durable dont beaucoup ne
  //  sortent jamais.
  //
  //  `iatrogene: 'ch05-sf7-changement-d-etat-microscopique'` — « Interpréter un
  //  changement d'état au niveau microscopique » (programme.md, ch. 5). C'est le
  //  savoir-faire qui installe le modèle particulaire ET qui demande de dessiner
  //  deux états du même corps : c'est là, et pas ailleurs, que l'élève apprend à
  //  transporter sur la particule ce qu'il sait du tas. Le mécanisme aggravant
  //  est nommé par le RSC et repris par § 7 : les illustrations de manuels
  //  « peuvent donner de fausses impressions sur les tailles, les échelles et le
  //  mouvement ». Nos schémas particulaires sont exactement ces illustrations, et
  //  c'est pourquoi charte.md impose qu'ils soient ENGENDRÉS (classe B) et non
  //  dessinés : un schéma faux coûte plus cher qu'une phrase fausse, parce qu'il
  //  n'est pas relu.
  //
  //  Producteur et piège partagent le chapitre 5 : la progression ne garantit
  //  aucun ordre, et c'est au moteur seul de refuser de programmer ce piège avant
  //  le savoir-faire qui le fabrique. Le contrôle le porte en réserve.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « quand on chauffe l'eau,
  //  les molécules gonflent ». La règle dit qu'une molécule d'eau est exactement
  //  la même dans les trois états et que ce qui change est entre elles : elle
  //  contredit la réponse. Le contrôle la contredit autrement et sans nous —
  //  pose la question à l'envers, qu'est-ce qui est resté identique ? Les ronds
  //  doivent avoir le même diamètre et être en même nombre sur les deux dessins.
  // ══════════════════════════════════════════════════════════════════════════
  'particules-heritent-du-macroscopique': {
    conception:
      'Ce qui est vrai de la matière en vrac est vrai de chacune de ses particules. '
      + 'Quand l\'eau chauffe, les molécules se dilatent ; quand le métal fond, les '
      + 'atomes deviennent liquides ; quand le sucre est blanc, les molécules sont '
      + 'blanches. Le modèle particulaire est utilisé comme une IMAGE RÉDUITE du '
      + 'macroscopique, et non comme un autre niveau de description.',
    enonceEleve:
      'Quand on chauffe l\'eau, les molécules gonflent. Et quand le fer fond, les '
      + 'atomes deviennent mous.',
    rang: 2,
    iatrogene: 'ch05-sf7-changement-d-etat-microscopique',
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch05-atomes-molecules',
    rythmeInitial: 6,
    formatDiagnostique: {
      modeDeReponse:
        'Schéma particulaire à COMPOSER — deux états du même corps, côte à côte — et '
        + 'non un choix verbal. La conception se dessine avant de se dire : l\'élève '
        + 'agrandit les ronds au lieu de les écarter, et il le fait sans y penser. '
        + 'Demandée en mots, elle se cache derrière la formule apprise ; demandée en '
        + 'dessin, elle se voit d\'un coup d\'œil.',
      contexteImpose:
        'Au moins une des trois réussites porte sur une propriété qui n\'est PAS la '
        + 'taille — la couleur, l\'état, la dureté. Motif : « les molécules ne '
        + 'grossissent pas » finit par s\'apprendre comme une phrase, et l\'élève qui '
        + 'la récite dessine encore des atomes de fer mous dans le fer fondu.',
      pourquoi:
        'C\'est nous qui fabriquons cette conception, avec nos propres schémas. Le '
        + 'format qui la diagnostique est donc le format même qui l\'installe, et on '
        + 'ne peut pas l\'éviter : on peut seulement rendre le schéma engendré, donc '
        + 'incapable de contredire sa propre correction.',
    },
    conditionValidite: {
      champs: ['registre', 'deuxEtatsDuMemeCorps', 'proprieteInterrogee'],
      predicat:
        "registre === 'submicro' && deuxEtatsDuMemeCorps === true "
        + "&& ['taille', 'forme', 'couleur', 'etat', 'masse'].includes(proprieteInterrogee)",
      enClair:
        'Trois exigences, et la troisième est celle qui mord vraiment. Le registre, '
        + 'parce que la question n\'a de sens qu\'au niveau submicroscopique. Les deux '
        + 'états, parce qu\'un schéma isolé ne demande aucune comparaison et ne montre '
        + 'donc rien. Et la propriété interrogée doit être une propriété DE LA '
        + 'PARTICULE : une question sur leur NOMBRE ou sur leur ARRANGEMENT est juste '
        + 'AVEC la conception, et c\'est le piège du piège. L\'élève qui croit que les '
        + 'molécules gonflent sait parfaitement qu\'elles sont plus écartées dans un '
        + 'gaz — il AJOUTE le gonflement à l\'écartement, il ne le remplace pas. Un '
        + 'item sur l\'espacement le renforcerait en lui donnant raison.',
    },
    regle:
      'Une molécule d\'eau est **exactement la même** dans la glace, dans l\'eau '
      + 'liquide et dans la vapeur : même taille, même forme, même masse. Ce qui '
      + 'change d\'un état à l\'autre, ce n\'est jamais la particule, c\'est **ce qui se '
      + 'passe entre les particules** — leur distance, leur agitation, leur '
      + 'arrangement. Un corps se dilate parce que ses particules **s\'écartent**, pas '
      + 'parce qu\'elles grossissent. Fondre, bouillir, se dilater, avoir une couleur '
      + 'sont des propriétés d\'un TAS : elles n\'ont aucun sens pour un seul grain.',
    controle:
      'Devant ton schéma, pose la question à l\'envers : **qu\'est-ce qui est resté '
      + 'identique ?** Les ronds doivent avoir le même diamètre sur les deux dessins, '
      + 'et ils doivent être en même nombre. Si tu as changé leur taille, leur forme ou '
      + 'leur couleur, tu as dessiné une propriété que la particule n\'a pas. Puis pose '
      + 'la même question **à ce que tu dis**, parce que la conception se cache mieux '
      + 'dans les mots que dans les ronds : as-tu écrit que les particules '
      + '**fondaient**, qu\'elles devenaient **molles**, **liquides**, **chaudes** ou '
      + '**dures** ? Fondre, être mou, être liquide, avoir une couleur sont des choses '
      + 'qui arrivent à un TAS, jamais à un grain — un atome de fer ne fond pas et ne '
      + 'ramollit pas, il se détache seulement de ses voisins. Tu peux te le dire tout '
      + 'seul, avant qu\'on te le dise.',
    raisonnements: [
      {
        id: 'l-eau-chaude-prend-plus-de-place',
        texte: 'L\'eau chaude prend plus de place, donc ses molécules ont grossi',
        reponse:
          'L\'eau chaude prend vraiment plus de place, et ton raisonnement est celui '
          + 'd\'un physicien : tu cherches d\'où vient le volume en plus, ce qui est '
          + 'exactement la bonne question. Il vient d\'ailleurs — les molécules '
          + 's\'agitent plus fort, se bousculent, et se tiennent plus loin les unes des '
          + 'autres. Compte-les : elles sont aussi nombreuses, et chacune est aussi '
          + 'grosse qu\'avant.',
      },
      {
        id: 'un-modele-sert-a-transporter',
        texte: 'Un modèle, c\'est une image en petit : ce qui est vrai en grand doit l\'être en petit',
        reponse:
          'C\'est exactement ce qu\'un modèle sert à faire d\'habitude, et personne ne '
          + 't\'a dit le contraire — on t\'a montré des dessins de particules sans '
          + 'jamais te dire ce qu\'une particule ne peut PAS faire. Celui-là s\'arrête à '
          + 'une frontière, et c\'est la seule chose à retenir : ce qui décrit un tas '
          + 'ne décrit pas un grain.',
      },
      {
        id: 'les-dessins-du-livre',
        texte: 'Sur les dessins du livre, les particules du gaz sont plus grosses',
        reponse:
          'Regarde-les encore : souvent elles le sont vraiment, et ce n\'est pas ton '
          + 'erreur, c\'est celle du dessin. Les illustrations sont faites pour montrer '
          + 'la dispersion et elles trichent sur les tailles. C\'est une des rares fois '
          + 'où il faut se méfier de son manuel, et tu as eu raison de le lire de près.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Reprends tes deux dessins et compare-les : les ronds ont-ils le même '
          + 'diamètre ? sont-ils en même nombre ? Ce qui doit changer est entre eux.',
      },
    ],
    constats: [
      {
        id: 'la-glace-flotte-et-fait-eclater-la-bouteille',
        contexteDeSurface: 'eau-et-glace',
        dispositif:
          'Une bouteille remplie d\'eau à ras bord, bouchée, mise au congélateur. Et à '
          + 'côté, un glaçon lâché dans un verre d\'eau.',
        predictionEngagee: {
          question:
            'Refroidir, dans ton modèle, rapetisse les particules. Le glaçon va-t-il '
            + 'couler ou flotter ? Et la bouteille pleine, que va-t-elle devenir ?',
          champs: [
            { id: 'glacon', etiquette: 'le glaçon coule / flotte' },
            { id: 'bouteille', etiquette: 'ce qui arrive à la bouteille pleine' },
          ],
        },
        resultat:
          'Le glaçon flotte, et la bouteille éclate : l\'eau gelée occupe PLUS de place '
          + 'que l\'eau liquide dont elle vient.',
        conflit:
          'Si le volume venait de la taille des molécules, refroidir les aurait '
          + 'rapetissées et la glace serait plus compacte que l\'eau. C\'est le '
          + 'contraire. Ce qui a changé, ce n\'est pas leur taille, c\'est leur '
          + 'RANGEMENT : en gelant, elles se mettent en ordre, et cet ordre-là prend '
          + 'plus de place que le désordre.',
      },
      {
        id: 'le-trou-de-la-plaque-chauffee',
        contexteDeSurface: 'anneau-metallique-perce',
        dispositif:
          'Une plaque de métal percée d\'un trou rond bien calibré, et une bille qui '
          + 'passe tout juste dedans à froid. On chauffe la plaque au bec, seule, sans '
          + 'toucher la bille.',
        predictionEngagee: {
          question:
            'La plaque va grandir en chauffant, tu le sais. Le trou va-t-il devenir '
            + 'plus grand, plus petit, ou rester pareil ? La bille passera-t-elle '
            + 'encore ?',
          champs: [
            { id: 'trou', etiquette: 'plus grand / plus petit / pareil' },
            { id: 'bille', etiquette: 'la bille passe / ne passe plus' },
          ],
        },
        resultat:
          'Le trou devient plus grand, et la bille passe avec du jeu. Le trou a grandi '
          + 'dans le même rapport que la plaque.',
        conflit:
          'Si le métal grandissait parce que chaque particule gonfle, la matière '
          + 'déborderait vers le vide et **boucherait** le trou. C\'est le contraire '
          + 'qui se passe : tout s\'écarte de tout, y compris les deux bords du trou.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑤ La frontière physique / chimique n'est pas où le programme la place
  //     RANG 2, NOUS LE FABRIQUONS
  //
  //  Source : didactique.md § 3.6 et § 7 (liste du rang 2) — Schollum (~70 % des
  //  élèves de 14 ans jugent chimique la dilution d'un jus de fruit ; 48 % à
  //  14 ans et 55 % à 16 ans pour la dissolution du sucre) et Méheut et al. 1985,
  //  référence française (~25 % des élèves de 14 ans décrivent la combustion
  //  d'une bougie comme un changement d'état). Tous ◆. Le fait qui donne le
  //  rang 2 : **l'erreur ne décroît pas avec l'âge, elle augmente**. § 7 : « plus
  //  on enseigne la chimie, plus chimique devient une étiquette qu'on colle
  //  largement. »
  //
  //  `iatrogene: 'ch06-sf1-identifier-une-transformation-chimique'` — le
  //  savoir-faire est bien celui qui IDENTIFIE la transformation chimique, pas
  //  celui qui la DISTINGUE (sf 2) : c'est en apprenant à reconnaître la
  //  catégorie positive, dans un chapitre où tout en relève, que l'élève en
  //  élargit le périmètre. Le sf 2 est le remède, pas la cause.
  //
  //  Producteur et piège partagent le chapitre 6 : ordre à tenir par le moteur.
  //
  //  C'est aussi le piège où le contrat didactique se voit le mieux : § 3.6 en
  //  tire que « les séries mélangées non étiquetées sont ici obligatoires ».
  //
  //  Épreuve de réfutation, faite deux fois — ce piège produit deux erreurs
  //  symétriques.
  //    · « diluer un sirop, c'est chimique » — la règle dit que la dilution ne
  //      change aucune molécule et que c'est donc physique : contredit.
  //    · « la bougie qui brûle, c'est la cire qui fond » — la règle dit qu'une
  //      bougie qui brûle fabrique des molécules qui n'existaient pas :
  //      contredit.
  //  Le contrôle mord sur les deux : retrouve-t-on les mêmes molécules à la fin ?
  //  Le sirop dilué se reconcentre en laissant l'eau s'évaporer ; la bûche brûlée
  //  ne redevient pas une bûche.
  // ══════════════════════════════════════════════════════════════════════════
  'frontiere-physique-chimique': {
    conception:
      '« Chimique » est une étiquette de langue courante, qui veut dire artificiel, '
      + 'transformé, spectaculaire ou dangereux — et non « des molécules ont disparu, '
      + 'd\'autres sont apparues ». Mélanger deux liquides, diluer un sirop, dissoudre '
      + 'du sucre tombent dans cette case. Symétriquement, « brûler » désigne ce qui '
      + 'laisse des cendres, si bien qu\'une bougie qui fond et une bougie qui brûle se '
      + 'confondent : ce qu\'on voit, c\'est de la cire qui coule.',
    enonceEleve:
      'Diluer un sirop, c\'est chimique : on a changé le produit. Et une bougie qui '
      + 'brûle, c\'est juste la cire qui fond.',
    rang: 2,
    iatrogene: 'ch06-sf1-identifier-une-transformation-chimique',
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch06-transformations-chimiques',
    rythmeInitial: 6,
    formatDiagnostique: {
      modeDeReponse:
        'Série MÉLANGÉE et non étiquetée, où la première tâche est de reconnaître de '
        + 'quoi il s\'agit avant de savoir quoi appliquer. Et un double QCM sur au '
        + 'moins un item de la série : le classement seul ne sépare pas celui qui a '
        + 'compté les molécules de celui qui a vu de la mousse.',
      contexteImpose:
        'Les deux erreurs symétriques doivent être atteignables dans la même série : '
        + 'au moins une transformation physique qui a l\'air chimique (dilution, '
        + 'dissolution, mélange coloré) et au moins une transformation chimique qui a '
        + 'l\'air physique (la bougie, le pain qui grille, le fer qui rouille).',
      pourquoi:
        'Un classement servi PENDANT le chapitre sur les transformations chimiques ne '
        + 'mesure rien : le titre au-dessus de l\'exercice répond à la place de '
        + 'l\'élève, et il a toujours raison en classe. C\'est le palier non étiqueté '
        + 'de la charte, et ce piège est celui pour lequel il a été inventé.',
    },
    conditionValidite: {
      champs: ['serieMelangee', 'chapitreAnnonce', 'apparenceTrompeuse'],
      predicat:
        'serieMelangee === true && chapitreAnnonce === false && apparenceTrompeuse === true',
      enClair:
        'Trois exigences, et aucune n\'est décorative. La série doit mélanger les deux '
        + 'catégories, sinon la réponse s\'obtient par élimination. Rien ne doit '
        + 'annoncer le chapitre — ni titre, ni consigne du type « parmi ces '
        + 'transformations chimiques » —, sans quoi on mesure l\'obéissance au contrat '
        + 'didactique. Et l\'item lui-même doit avoir une apparence trompeuse : classer '
        + '« faire fondre un glaçon » comme physique ne sépare personne, tout le monde '
        + 'répond juste, et le taux de réussite de la série monte sans qu\'aucun élève '
        + 'ait changé d\'idée. `apparenceTrompeuse` se lit sur la situation décrite — '
        + 'un changement visible d\'aspect, de couleur ou d\'odeur sans changement de '
        + 'molécules, ou l\'inverse — et non sur un jugement d\'auteur.',
    },
    regle:
      'Le mot « chimique » ne veut dire ni *artificiel*, ni *fabriqué*, ni '
      + '*dangereux*. Il dit une seule chose : **des molécules ont disparu et '
      + 'd\'autres sont apparues**. Diluer un sirop, dissoudre du sucre, faire fondre '
      + 'de la cire ne changent aucune molécule — c\'est **physique**, même quand le '
      + 'résultat n\'a plus rien à voir avec le départ. Une bougie qui brûle, elle, '
      + 'fabrique de l\'eau et du dioxyde de carbone qui n\'existaient pas : c\'est '
      + '**chimique**, même si la première chose qu\'on voit est la cire qui fond.',
    controle:
      'Une seule question, toujours la même : **retrouve-t-on les mêmes molécules à '
      + 'la fin ?** Pour y répondre, fais l\'inventaire des **deux côtés** — ce qui a '
      + 'disparu, et ce qui est apparu — et fais-le sur tout ce qui est en jeu, pas '
      + 'seulement sur la partie que tu regardes. Si tu retrouves à la fin tout ce que '
      + 'tu avais au départ, seulement mélangé, dilué ou changé d\'état, c\'est '
      + '**physique** : le sirop dilué se reconcentre en laissant l\'eau s\'évaporer, la '
      + 'cire fondue refroidit et te rend toute ta cire. S\'il **manque** quelque chose '
      + 'du départ, ou s\'il y a à la fin quelque chose qui n\'y était pas, c\'est '
      + '**chimique** : la bougie allumée raccourcit et la cire qui manque, on ne la '
      + 'retrouve nulle part — on retrouve de l\'eau et du dioxyde de carbone au-dessus '
      + 'de la flamme, et la bûche brûlée ne redevient jamais une bûche. Attention à ce '
      + 'que tu regardes : si tu ne poses la question qu\'à la cire qui coule, tu '
      + 'répondras « physique » sur une bougie qui brûle.',
    raisonnements: [
      {
        id: 'chimique-veut-dire-transforme',
        texte: 'On a changé le produit, donc c\'est chimique',
        reponse:
          'Tu utilises le mot comme tout le monde l\'utilise, y compris les emballages '
          + 'qui promettent « sans produits chimiques ». Dans ce sens-là tu as raison, '
          + 'et personne ne peut te reprocher de parler français. En chimie le mot est '
          + 'plus étroit : il ne parle que des molécules, et il se moque complètement '
          + 'de savoir si ça a l\'air naturel. L\'eau de pluie est un produit chimique.',
      },
      {
        id: 'il-y-a-eu-une-reaction',
        texte: 'Ça a moussé, ça a changé de couleur, ça a chauffé : donc c\'est chimique',
        reponse:
          'Ce sont de bons indices, et ils sont justes la plupart du temps : mousse, '
          + 'changement de couleur et dégagement de chaleur signalent souvent une '
          + 'transformation chimique. Ce sont des indices, pas la définition. Mélanger '
          + 'de l\'eau chaude et de l\'eau froide chauffe aussi ; un sirop change de '
          + 'couleur en se diluant. Reviens toujours à la question des molécules.',
      },
      {
        id: 'la-bougie-fond',
        texte: 'La bougie fond : je vois la cire couler, c\'est un changement d\'état',
        reponse:
          'La cire fond vraiment — tu observes bien, et cette partie-là EST physique, '
          + 'tu as raison de l\'appeler ainsi. Mais ce n\'est pas la cire fondue qui '
          + 'fait la lumière : c\'est la vapeur de cire qui réagit avec le dioxygène de '
          + 'l\'air, plus haut, dans la flamme. Deux choses arrivent en même temps, et '
          + 'tu n\'as vu que celle du bas.',
      },
      {
        id: 'c-etait-le-chapitre',
        texte: 'On est dans le chapitre sur les transformations chimiques, donc c\'est chimique',
        reponse:
          'C\'est une stratégie qui marche, et c\'est même pour ça qu\'on te sert des '
          + 'listes mélangées ici. En contrôle, plus rien n\'annoncera le chapitre — et '
          + 'le titre au-dessus de l\'exercice est le pire indice qui soit : il a '
          + 'toujours raison en classe et jamais ailleurs.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Pose-toi la seule question qui compte : retrouve-t-on les mêmes molécules à '
          + 'la fin ? Et peut-on revenir en arrière en chauffant ou en filtrant ?',
      },
    ],
    constats: [
      {
        id: 'sirop-dilue-puis-reconcentre',
        contexteDeSurface: 'dilution-du-sirop',
        dispositif:
          'On dilue un fond de sirop dans dix fois son volume d\'eau : la couleur '
          + 'pâlit, le goût s\'efface, on dirait un autre produit. Puis on laisse l\'eau '
          + 's\'évaporer doucement, sans rien ajouter.',
        predictionEngagee: {
          question:
            'Que restera-t-il dans le verre quand toute l\'eau ajoutée sera partie ? '
            + 'Même couleur qu\'au début, plus pâle, ou autre chose ?',
          champs: [
            { id: 'reste', etiquette: 'ce qu\'il restera' },
            { id: 'couleur', etiquette: 'sa couleur, comparée au sirop de départ' },
          ],
        },
        resultat:
          'Le sirop, à sa concentration de départ : même couleur, même odeur, même '
          + 'goût. On ne peut pas le distinguer de celui du flacon.',
        conflit:
          'Ce qui revient à l\'identique n\'a pas changé de nature. Rien n\'a été '
          + 'détruit ni fabriqué en chemin : les molécules de sirop étaient toutes là, '
          + 'seulement plus éloignées les unes des autres. Une transformation chimique, '
          + 'elle, ne se défait pas en laissant s\'évaporer de l\'eau.',
      },
      {
        id: 'verre-froid-au-dessus-de-la-flamme',
        contexteDeSurface: 'combustion-de-la-bougie',
        dispositif:
          'Une bougie allumée. On tient un verre bien froid quelques secondes '
          + 'au-dessus de la flamme, puis on y verse aussitôt un peu d\'eau de chaux et '
          + 'on agite.',
        predictionEngagee: {
          question:
            'Si la bougie ne fait que fondre, il ne peut se déposer que de la cire. '
            + 'Que vas-tu trouver sur le verre, et que fera l\'eau de chaux ?',
          champs: [
            { id: 'depot', etiquette: 'ce qui se dépose sur le verre' },
            { id: 'chaux', etiquette: 'ce que devient l\'eau de chaux' },
          ],
        },
        resultat:
          'De la buée — de l\'eau — sur le verre. Et l\'eau de chaux se trouble : il y a '
          + 'aussi du dioxyde de carbone. Pas de cire.',
        conflit:
          'Il n\'y avait ni eau ni dioxyde de carbone dans la bougie avant qu\'on '
          + 'l\'allume, et il n\'y en avait pas non plus dans la cire fondue de la '
          + 'coupelle. Ces molécules-là ont été FABRIQUÉES. Une cire qui fond ne '
          + 'fabrique rien : elle coule, et elle reste de la cire.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑥ Le vide entre les particules est rempli
  //
  //  Source : didactique.md § 3.4a — Novick & Nussbaum 1978 et 1981, Benson et
  //  al. 1993 : ~25 % des élèves de 13-14 ans affirment que l'espace entre les
  //  particules est rempli ou n'existe pas, ~40 % à 16 ans et plus répondent
  //  « de la vapeur ou de l'oxygène », plus 10-15 % « un polluant ». Tous ◆.
  //  Robustesse « forte, et documentée jusqu'à l'université ».
  //
  //  Rang 1 par élimination. Le rang 3 est frontalement contredit : la
  //  conception ne cède pas, elle MONTE entre 13-14 et 16 ans. Le rang 2 est
  //  tentant pour cette raison même — une conception qui monte après
  //  enseignement ressemble à une conception fabriquée, et la réponse « de la
  //  vapeur ou de l'oxygène » a tout d'un savoir scolaire mal rangé. Mais
  //  didactique.md ne le dit nulle part, et l'affirmer nous obligerait à nommer
  //  un `iatrogene` qu'aucune source ne porte. On note l'hypothèse, on ne la
  //  sert pas.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « entre les molécules
  //  d'eau, il y a de l'air ». La règle dit qu'il n'y a rien, et que l'air est
  //  lui-même fait de particules : elle contredit la réponse. Le contrôle la
  //  contredit sans nous, par régression : pose la même question à ce que tu as
  //  mis entre les particules — de quoi est-il fait, et qu'y a-t-il entre SES
  //  particules ? Une réponse qui se repose éternellement n'en est pas une.
  // ══════════════════════════════════════════════════════════════════════════
  'vide-entre-les-particules-rempli': {
    conception:
      'L\'espace entre les particules est occupé par quelque chose : de l\'air, de la '
      + 'vapeur, de la poussière, un autre gaz. « Rien du tout » n\'est pas une réponse '
      + 'disponible, parce que dans toute l\'expérience de l\'élève aucun endroit n\'est '
      + 'complètement vide — le plus vide des placards est plein d\'air.',
    enonceEleve:
      'Entre les molécules d\'eau, il y a de l\'air. Enfin, il y a bien quelque chose : '
      + 'ça ne peut pas être rien.',
    rang: 1,
    fiabilite: 'secondaire',
    origine: 'physique',
    chapitreOrigine: 'ch05-atomes-molecules',
    rythmeInitial: 5,
    formatDiagnostique: {
      modeDeReponse:
        'Schéma particulaire où l\'élève doit dire, ou annoter, ce qu\'il y a ENTRE les '
        + 'ronds — avec « rien » offert comme réponse explicite et légitime, jamais '
        + 'comme absence de réponse. Sans cette case, on ne mesure que l\'obéissance : '
        + 'un élève qui ne trouve pas où cocher ne coche pas, et on lit un refus là où '
        + 'il n\'y avait pas de choix.',
      contexteImpose:
        'Au moins une des trois réussites porte sur un LIQUIDE ou un SOLIDE. Motif : '
        + 'sur un gaz, la question se répond toute seule — « de l\'air entre les '
        + 'particules d\'air » s\'entend comme une plaisanterie, et l\'élève écarte la '
        + 'réponse sans avoir renoncé à la conception. C\'est sur l\'eau et sur le fer '
        + 'qu\'elle tient debout.',
      pourquoi:
        'La conception n\'est pas une ignorance, c\'est un remplissage : l\'élève a une '
        + 'réponse, et elle est raisonnable. On ne la voit qu\'en lui laissant la '
        + 'donner.',
    },
    conditionValidite: {
      champs: ['registre', 'etatDeLaMatiere', 'reponseRienDisponible'],
      predicat:
        "registre === 'submicro' && etatDeLaMatiere !== 'gaz' && reponseRienDisponible === true",
      enClair:
        'Trois exigences, et chacune ferme une porte. Le registre, parce que la '
        + 'question n\'a aucun sens au niveau macroscopique. L\'état, parce que sur un '
        + 'gaz l\'absurdité de la réponse se voit sans qu\'on ait rien compris — l\'élève '
        + 'écarte « de l\'air » par le comique de la phrase, pas par le modèle, et il '
        + 'répondra « de l\'air » sur l\'eau à la question suivante. Et la disponibilité '
        + 'explicite de « rien » : c\'est la seule bonne réponse, et un item qui ne la '
        + 'propose pas force l\'erreur qu\'il prétend mesurer.',
    },
    regle:
      'Entre deux particules, il n\'y a **rien**. Pas d\'air — l\'air est lui-même fait '
      + 'de particules, et il n\'y en a aucune là-dedans. Pas de vapeur, pas de '
      + 'poussière, pas de gaz. C\'est le seul endroit de tout ton programme où '
      + '« rien » est la bonne réponse, et **c\'est une réponse, pas un aveu '
      + 'd\'ignorance**. Ce qui tient les particules ensemble n\'est pas une matière de '
      + 'remplissage : ce sont des forces, qui agissent à distance.',
    controle:
      'Prends ce que tu as mis entre les particules et pose-lui **la même question** : '
      + 'de quoi est-il fait ? Si tu réponds « de l\'air », dessine alors les '
      + 'particules de cet air — et dis ce qu\'il y a entre elles. Tu peux recommencer '
      + 'sans fin, et c\'est justement le signe que la réponse est mauvaise : **une '
      + 'réponse qui se repose éternellement n\'en est pas une**.',
    raisonnements: [
      {
        id: 'le-vide-ca-n-existe-pas',
        texte: 'Le vide, ça n\'existe pas : il y a toujours quelque chose quelque part',
        reponse:
          'Dans ta vie de tous les jours, tu as complètement raison, et personne ne '
          + 'peut te montrer du vide : le plus vide des placards est plein d\'air. '
          + 'C\'est exactement pour ça que le vide est difficile — tu n\'en as jamais '
          + 'rencontré, et ton modèle est le bon partout où tu as regardé. Entre les '
          + 'particules, il y en a, et beaucoup plus qu\'on ne l\'imagine.',
      },
      {
        id: 'de-l-air-entre-les-molecules',
        texte: 'Entre les molécules d\'eau, il y a de l\'air',
        reponse:
          'Regarde ce que ça voudrait dire. De l\'air dissous dans l\'eau, il y en a un '
          + 'peu — les poissons le respirent, et tu as raison de le savoir. Mais ces '
          + 'molécules d\'air sont À CÔTÉ des molécules d\'eau, dans le même dessin, pas '
          + 'entre elles. Et entre deux molécules d\'air, il faudrait alors mettre… '
          + 'quoi ?',
      },
      {
        id: 'sinon-tout-s-effondrerait',
        texte: 'S\'il n\'y avait rien entre elles, tout s\'effondrerait ou tomberait',
        reponse:
          'C\'est une bonne objection, et c\'est celle d\'un physicien : il faut bien que '
          + 'quelque chose les tienne, tu as raison de le demander. Ce n\'est pas une '
          + 'matière de remplissage, ce sont des forces — elles s\'attirent et se '
          + 'repoussent à distance, comme deux aimants qui se tiennent sans que rien ne '
          + 'soit entre eux.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Essaie ta réponse sur elle-même : ce que tu as mis entre les particules, de '
          + 'quoi est-il fait, et qu\'y a-t-il entre SES particules ?',
      },
    ],
    constats: [
      {
        id: 'eau-et-alcool-melanges',
        contexteDeSurface: 'melange-de-volumes',
        dispositif:
          'Cinquante millilitres d\'eau et cinquante millilitres d\'alcool, mesurés '
          + 'séparément dans deux éprouvettes, pesés séparément aussi. On les verse '
          + 'ensemble dans une troisième éprouvette graduée, on repèse le tout.',
        predictionEngagee: {
          question:
            'Quel volume vas-tu lire dans la troisième éprouvette, et quelle masse va '
            + 'afficher la balance ?',
          champs: [
            { id: 'volume', etiquette: 'volume du mélange', unite: 'mL' },
            { id: 'masse', etiquette: 'masse du mélange', unite: 'g' },
          ],
        },
        resultat:
          'Moins de cent millilitres — la différence se lit à l\'œil sur la graduation. '
          + 'Et la masse, elle, est exactement la somme des deux.',
        conflit:
          'Rien n\'est parti : la masse le prouve. Et pourtant le volume a diminué. Des '
          + 'molécules se sont logées quelque part — dans une place qui existait déjà, '
          + 'et qui n\'était occupée par rien.',
      },
      {
        id: 'seringue-bouchee-air-puis-eau',
        contexteDeSurface: 'seringue-bouchee',
        dispositif:
          'Une seringue remplie d\'air, embout bouché avec le doigt : on pousse le '
          + 'piston aussi fort qu\'on peut. Puis la même seringue remplie d\'eau, embout '
          + 'bouché de la même façon : on repousse.',
        predictionEngagee: {
          question:
            'De combien vas-tu pouvoir enfoncer le piston dans chacun des deux cas ?',
          champs: [
            { id: 'air', etiquette: 'course du piston avec de l\'air' },
            { id: 'eau', etiquette: 'course du piston avec de l\'eau' },
          ],
        },
        resultat:
          'Beaucoup avec l\'air : le piston descend nettement, et il remonte quand on '
          + 'lâche. Pas du tout avec l\'eau : il ne bouge pas d\'un millimètre.',
        conflit:
          'L\'air se laisse comprimer parce qu\'il y a de la place entre ses particules, '
          + 'et qu\'on peut les rapprocher. S\'il y avait quelque chose dans cette place, '
          + 'il faudrait aussi le comprimer — et il faudrait dire quoi, et pourquoi ce '
          + 'quelque chose se comprime si bien alors que l\'eau, elle, ne se comprime '
          + 'pas du tout.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑦ Même taille, donc même masse
  //
  //  Source : didactique.md § 3.8 — Smith, Carey & Wiser 1985 : les enfants de
  //  5-7 ans ont un concept de poids INDIFFÉRENCIÉ qui contient à la fois
  //  « lourd » et « lourd pour sa taille ». La masse volumique n'est pas un
  //  savoir à apprendre, c'est le résultat d'une différenciation tardive ; tant
  //  qu'elle n'est pas faite, ρ = m/V est une formule sans référent.
  //
  //  ⚠ TROU DU CORPUS, signalé comme tel par § 8 : « aucune donnée chiffrée sur
  //  12-14 ans ». La référence canonique porte sur des 3-9 ans, les seuls
  //  pourcentages disponibles sur des 16-18 ans. D'où `fiabilite:
  //  'non-documente'`, le rythme le plus lent du fichier, et le garde-fou de
  //  charte.md : ce piège « ne peut jamais fonder à lui seul une décision de
  //  maîtrise ». Rang 1 par élimination, et l'élimination est ici plus faible
  //  qu'ailleurs : rien n'établit la persistance, mais rien n'établit non plus
  //  la cession, et un rang 3 ne revient jamais. Voir l'en-tête.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « les deux cubes font la
  //  même taille, donc ils pèsent pareil ». La règle dit qu'à volume égal le
  //  plomb pèse bien plus que le bois : elle contredit la réponse. Le contrôle
  //  mord sur la même — qu'est-ce qui est égal, qu'est-ce qui diffère ? Si les
  //  matières diffèrent, la taille ne dit plus rien.
  // ══════════════════════════════════════════════════════════════════════════
  'meme-taille-donc-meme-masse': {
    conception:
      '« Lourd » et « lourd pour sa taille » ne sont pas encore deux idées '
      + 'distinctes. La masse est lue comme une propriété de la TAILLE : deux objets '
      + 'de même volume doivent avoir la même masse, un gros objet est plus lourd '
      + 'qu\'un petit, et les solides sont plus lourds que les liquides, eux-mêmes plus '
      + 'lourds que les gaz.',
    enonceEleve:
      'Ils font la même taille, donc ils pèsent pareil. Et de toute façon un solide, '
      + 'c\'est plus lourd qu\'un liquide.',
    rang: 1,
    fiabilite: 'non-documente',
    origine: 'physique',
    chapitreOrigine: 'ch04-masse-volumique',
    // Le rythme le plus lent du fichier, et il est plafonné par le haut : le
    // contrôle refuse qu'un rang 1 revienne moins souvent que le rang 3 le plus
    // rapide du catalogue, qui est à huit séances. Sept est donc la valeur la
    // plus lente qu'un `non-documente` puisse porter sans inverser la seule
    // décision d'architecture que tout le dossier justifie.
    rythmeInitial: 7,
    formatDiagnostique: {
      modeDeReponse:
        'Comparaison de DEUX objets, avec prédiction engagée sur « lequel est le plus '
        + 'lourd, et à peu près combien de fois » — jamais un calcul. Dès qu\'on donne '
        + 'une formule, l\'élève l\'applique correctement sans avoir changé d\'idée : '
        + 'c\'est le cas d\'école de la bonne réponse sans adhésion.',
      contexteImpose:
        'Au moins une des trois réussites tient le VOLUME fixe (mêmes dimensions, '
        + 'matières différentes) et au moins une tient la MASSE fixe (mêmes '
        + 'kilogrammes, tailles différentes). Motif : ce sont deux moitiés de la même '
        + 'différenciation, et un élève peut faire la première sans la seconde — il '
        + 'accepte que le plomb soit plus lourd que le bois tout en refusant qu\'un '
        + 'kilogramme de plumes existe.',
      pourquoi:
        'La conception ne se voit pas sur un résultat, elle se voit sur une '
        + 'comparaison qualitative : c\'est là que l\'élève doit choisir entre la taille '
        + 'et la matière, et qu\'aucune formule ne choisit à sa place.',
    },
    conditionValidite: {
      champs: ['facteurTenuFixe', 'materiauxDifferents', 'grandeurInterrogee'],
      predicat:
        "materiauxDifferents === true "
        + "&& (facteurTenuFixe === 'volume' || facteurTenuFixe === 'masse') "
        + "&& grandeurInterrogee !== 'masse-volumique'",
      enClair:
        'Trois exigences. Les matériaux doivent différer : sur deux objets de la même '
        + 'matière, « plus gros donc plus lourd » est VRAI, l\'élève répond juste et '
        + 'l\'item le conforte. L\'un des deux facteurs doit être tenu fixe et déclaré, '
        + 'sans quoi la comparaison a deux inconnues et n\'importe quelle réponse se '
        + 'défend. Et la grandeur demandée ne peut pas être la masse volumique '
        + 'elle-même : dès qu\'on la demande, l\'élève applique ρ = m/V, ce qui teste le '
        + 'calcul et non la différenciation — c\'est le piège suivant, pas celui-ci.',
    },
    regle:
      'La taille ne décide pas de la masse. Ce qui décide, c\'est **la matière** : à '
      + 'volume égal, le plomb pèse bien plus que le bois, et un litre d\'huile pèse '
      + 'moins qu\'un litre d\'eau. C\'est exactement ce que la masse volumique mesure — '
      + '**la masse pour un volume donné**. Et « les solides sont plus lourds que les '
      + 'liquides » ne tient pas non plus : la glace flotte sur l\'eau, le bois aussi, '
      + 'et un bloc de polystyrène plus gros qu\'un caillou est bien plus léger que lui.',
    controle:
      'Avant de comparer deux objets, demande-toi ce qui est **égal** chez les deux et '
      + 'ce qui **diffère**. Si les matières diffèrent, la taille ne te dit plus rien : '
      + 'il faut aller chercher la masse volumique. Et vérifie ta réponse sur un cas '
      + 'que tu connais déjà — un kilogramme de plumes et un kilogramme de plomb pèsent '
      + 'pareil, et ils ne font pas du tout la même taille.',
    raisonnements: [
      {
        id: 'plus-gros-donc-plus-lourd',
        texte: 'Il est plus gros, donc il est plus lourd',
        reponse:
          'C\'est vrai neuf fois sur dix, parce que la plupart du temps tu compares '
          + 'deux objets de la même matière : deux pierres, deux morceaux de pain, deux '
          + 'bouteilles d\'eau. Ton raisonnement est bon à chaque fois, et il le restera. '
          + 'Il ne s\'applique plus dès que les matières changent — et c\'est précisément '
          + 'le seul cas qu\'on te posera ici.',
      },
      {
        id: 'meme-taille-meme-masse',
        texte: 'Ils occupent la même place, donc ils pèsent pareil',
        reponse:
          'Ils contiennent bien la même quantité de PLACE, et là tu ne te trompes pas '
          + 'du tout : c\'est exactement ce qu\'on appelle le volume. Ce qu\'ils ne '
          + 'contiennent pas en même quantité, c\'est la matière. Dans un même volume, '
          + 'un métal loge beaucoup plus de matière que du bois — les particules y sont '
          + 'plus serrées et plus lourdes.',
      },
      {
        id: 'un-solide-c-est-plus-lourd',
        texte: 'Un solide, c\'est plus lourd qu\'un liquide',
        reponse:
          'Souvent, oui, et l\'ordre solide-liquide-gaz est une bonne première idée — '
          + 'elle t\'évitera pas mal d\'erreurs. Elle a des exceptions faciles à '
          + 'vérifier toi-même : la glace flotte sur l\'eau, le bois flotte, la bougie '
          + 'flotte. À chaque fois, c\'est un solide moins lourd que l\'eau à volume égal.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Regarde ce qui est égal chez les deux objets et ce qui diffère. Si c\'est la '
          + 'matière qui diffère, la taille ne suffit plus à répondre.',
      },
    ],
    constats: [
      {
        id: 'deux-cubes-de-meme-arete',
        contexteDeSurface: 'volume-egal-matieres-differentes',
        dispositif:
          'Deux cubes rigoureusement identiques à l\'œil et à la règle — même arête, '
          + 'même aspect lisse — l\'un en bois dense, l\'autre en laiton. On les pose '
          + 'l\'un après l\'autre sur la même balance.',
        predictionEngagee: {
          question:
            'Ils occupent exactement le même volume. Que va afficher la balance pour '
            + 'chacun ?',
          champs: [
            { id: 'bois', etiquette: 'le cube de bois', unite: 'g' },
            { id: 'laiton', etiquette: 'le cube de laiton', unite: 'g' },
          ],
        },
        resultat:
          'Les deux valeurs sont très différentes : le laiton en affiche plusieurs fois '
          + 'celle du bois, alors que les deux cubes tiennent dans la même place.',
        conflit:
          'Le volume ne commande pas la masse. Entre les deux cubes, la seule '
          + 'différence est la matière — et c\'est elle qui a tout décidé.',
      },
      {
        id: 'un-kilogramme-de-chaque',
        contexteDeSurface: 'masse-egale-volumes-differents',
        dispositif:
          'Un kilogramme de billes de polystyrène et un kilogramme de boulons, pesés '
          + 'devant l\'élève puis posés côte à côte sur la table.',
        predictionEngagee: {
          question:
            'Lequel des deux tas sera le plus gros ? Et lequel sera le plus lourd ?',
          champs: [
            { id: 'gros', etiquette: 'le plus gros' },
            { id: 'lourd', etiquette: 'le plus lourd' },
          ],
        },
        resultat:
          'Le polystyrène remplit un carton entier, les boulons tiennent dans une main '
          + '— et la balance affiche la même valeur pour les deux tas.',
        conflit:
          'Même masse, volumes sans commune mesure. « Gros » et « lourd » ne sont donc '
          + 'pas la même idée, et il faut bien deux mots différents pour les dire.',
      },
      {
        id: 'huile-versee-sur-l-eau',
        contexteDeSurface: 'liquides-superposes',
        dispositif:
          'On verse doucement de l\'huile dans un verre d\'eau. Puis on remplit deux '
          + 'éprouvettes du même volume, l\'une d\'eau, l\'autre d\'huile, et on les pèse.',
        predictionEngagee: {
          question:
            'Où ira l\'huile — au-dessus, au-dessous, mélangée ? Et à volume égal, '
            + 'laquelle des deux pèsera le plus ?',
          champs: [
            { id: 'position', etiquette: 'position de l\'huile' },
            { id: 'plus-lourde', etiquette: 'la plus lourde à volume égal' },
          ],
        },
        resultat:
          'L\'huile reste au-dessus, en couche nette. Et à volume égal, c\'est elle qui '
          + 'pèse le moins.',
        conflit:
          'Deux liquides, même volume, masses différentes : c\'est déjà que le volume ne '
          + 'décide de rien. Et c\'est la plus petite masse qui surnage — ce qui donne '
          + 'un moyen de comparer sans balance.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ⑧ Masse et masse volumique confondues — ORIGINE MATHÉMATIQUE
  //
  //  Source : didactique.md § 3.8 — ~6 % confondent masse et masse volumique
  //  dans la question du phosphore (16-18 ans) ◆ ; ~17 % des élèves de 16 ans
  //  prédisent une augmentation de masse dans une précipitation parce qu'un
  //  solide « pèse plus qu'un liquide ». Même trou de corpus que le piège
  //  précédent : § 8 range la masse volumique dans le ○, sans donnée sur
  //  12-14 ans. `fiabilite: 'non-documente'`, rang 1 par élimination.
  //
  //  `origine: 'mathematique'` — et c'est le seul de la famille. § 3.8 :
  //  « la masse volumique est le point de contact direct avec les maths de 4e
  //  (grandeur quotient, proportionnalité). Une part de l'échec y est un échec
  //  de maths déguisé. » La cible du renvoi est le chapitre 5 de `maths-4e`
  //  (proportionnalité et grandeurs composées) ; le piège de maths le plus
  //  proche y est `grandeur-quotient-inversee`, PROCHE et non identique : celui-
  //  là porte sur le sens du quotient (diviser à l'envers), celui-ci sur la
  //  confusion des deux grandeurs. Un élève peut poser la division dans le bon
  //  sens et rendre quand même une masse. Le champ qui porterait la section
  //  n'existe dans aucune famille — voir l'en-tête, point 2.
  //
  //  C'est le piège qui justifie l'algèbre des unités du moteur : le verdict
  //  « ce que tu as écrit n'est pas une masse volumique, c'est une masse » est,
  //  dit charte.md, « le retour le plus utile de tout le moteur, et celui
  //  qu'aucune plateforme ne donne ». Sans ce piège, ce verdict n'aurait pas de
  //  conception à nommer.
  //
  //  Épreuve de réfutation. Réponse fausse typique : « 54 g » à une question qui
  //  demande une masse volumique. La règle dit qu'une masse ne peut pas répondre
  //  à cette question, quelle que soit sa valeur : elle contredit la réponse. Le
  //  contrôle la contredit avant tout calcul — ton unité contient-elle une barre
  //  de division, là où la question en demande une ?
  // ══════════════════════════════════════════════════════════════════════════
  'confusion-masse-et-masse-volumique': {
    conception:
      'Masse et masse volumique sont traitées comme deux noms de la même grandeur — '
      + '« ce qui est lourd ». L\'élève rend une masse quand on demande une masse '
      + 'volumique et l\'inverse, il compare des masses là où il faudrait comparer des '
      + 'quotients, et il ne voit dans « g/cm³ » qu\'une unité un peu longue plutôt '
      + 'qu\'une division écrite.',
    enonceEleve:
      'La masse volumique, c\'est le poids, en gros. J\'ai mis 54 g : c\'est bien ce '
      + 'qu\'on demandait, non ?',
    rang: 1,
    fiabilite: 'non-documente',
    origine: 'mathematique',
    chapitreOrigine: 'ch04-masse-volumique',
    // Même valeur et même motif que le piège précédent : voir la note qui y est
    // portée. Les deux pièges de masse volumique sont les plus lents du fichier.
    rythmeInitial: 7,
    formatDiagnostique: {
      modeDeReponse:
        'Saisie **valeur et unité séparées**, jamais un QCM. C\'est la DIMENSION de la '
        + 'réponse qui porte le diagnostic, et un QCM la donne : proposer « 2,7 g/cm³ » '
        + 'parmi les choix, c\'est écrire l\'unité à la place de l\'élève et perdre '
        + 'exactement ce qu\'on voulait mesurer.',
      contexteImpose:
        'Au moins une des trois réussites porte sur un énoncé où la grandeur de '
        + 'l\'AUTRE espèce figure dans les données — une masse donnée quand on cherche '
        + 'une masse volumique, ou l\'inverse. Sans elle, l\'élève ne peut rendre que ce '
        + 'qu\'il a calculé, et la confusion n\'a pas de prise pour se manifester.',
      pourquoi:
        'Le moteur sait dire « ta valeur est juste, ta dimension ne l\'est pas ». Ce '
        + 'verdict n\'existe que si l\'élève a pu écrire la dimension lui-même.',
    },
    conditionValidite: {
      champs: ['modeDeReponse', 'grandeurDemandee', 'grandeursFournies'],
      predicat:
        "modeDeReponse === 'valeur-et-unite' && (grandeurDemandee === 'masse-volumique' "
        + "? grandeursFournies.includes('masse') "
        + ": grandeursFournies.includes('masse-volumique'))",
      enClair:
        'Deux exigences, et la seconde est celle qui fait le diagnostic. Le mode de '
        + 'réponse doit laisser l\'élève écrire l\'unité : un QCM la lui fournit, et il '
        + 'coche la bonne case sans avoir distingué quoi que ce soit. Et l\'énoncé doit '
        + 'contenir, parmi ses données, une grandeur de l\'AUTRE espèce que celle '
        + 'demandée — c\'est elle que l\'élève rendra telle quelle s\'il ne les distingue '
        + 'pas. Un exercice qui demande une masse volumique en ne fournissant qu\'un '
        + 'volume et une longueur ne laisse rien à confondre : il teste le calcul.',
    },
    regle:
      'Une masse et une masse volumique ne se mesurent pas dans la même unité, parce '
      + 'que ce ne sont pas les mêmes grandeurs. Une masse se pèse et s\'écrit en '
      + 'grammes. Une masse volumique est un **quotient** — une masse **divisée par** '
      + 'un volume — et son unité le dit à voix haute : des g/cm³, c\'est-à-dire des '
      + 'grammes **par** centimètre cube. Une masse ne peut donc **pas répondre** à '
      + 'une question qui demande une masse volumique, quelle que soit sa valeur — et '
      + 'une masse volumique ne peut pas davantage répondre à « combien pèse cet '
      + 'objet ». Dans les deux sens, c\'est la mauvaise espèce de nombre. Et l\'une '
      + 'change quand on coupe l\'objet en deux, l\'autre non.',
    controle:
      'Lis ton unité à voix haute comme une phrase, et regarde si elle répond à la '
      + 'question posée. « 54 grammes » répond à « combien pèse cet objet ». '
      + '« 2,7 grammes **par** centimètre cube » répond à « combien pèse un centimètre '
      + 'cube de cette matière ». Puis compare les barres de division des deux côtés, '
      + 'dans les deux sens. Si ton unité **n\'en a pas** alors que la question en '
      + 'demande une, tu as rendu une masse là où l\'on voulait une masse volumique ; '
      + 'si ton unité **en a une** alors que la question n\'en demande pas, tu as rendu '
      + 'une masse volumique là où l\'on voulait la masse de cet objet-là. Dans les '
      + 'deux cas ta réponse est de la mauvaise espèce — et ça se voit **avant** '
      + 'd\'avoir vérifié le calcul.',
    raisonnements: [
      {
        id: 'c-est-le-poids-en-gros',
        texte: 'Masse volumique, masse : c\'est la même idée, ce qui est lourd',
        reponse:
          'Les deux parlent bien de lourdeur, et tu ne te trompes pas de sujet. Elles '
          + 'ne répondent simplement pas à la même question : la masse dit « combien '
          + 'pèse CET objet », la masse volumique dit « combien pèserait un centimètre '
          + 'cube de cette matière ». Coupe l\'objet en deux et tu verras la différence '
          + 'd\'un coup : la première est divisée par deux, la seconde ne bouge pas.',
      },
      {
        id: 'j-ai-rendu-le-nombre-de-l-enonce',
        texte: 'J\'ai repris le nombre qui était donné dans l\'énoncé',
        reponse:
          'C\'est souvent la bonne stratégie, et beaucoup d\'exercices ne demandent '
          + 'effectivement que de repérer la bonne donnée parmi celles qui traînent. '
          + 'Ici le nombre donné est d\'une autre espèce que celui demandé : il faut '
          + 'encore le diviser par le volume avant de le rendre. L\'unité te l\'aurait '
          + 'dit.',
      },
      {
        id: 'l-unite-je-la-mets-a-la-fin',
        texte: 'J\'ai trouvé la valeur, et j\'ai mis l\'unité après, un peu au hasard',
        reponse:
          'L\'unité n\'est pas une décoration qu\'on ajoute à la fin pour faire propre : '
          + 'c\'est elle qui dit ce que tu as calculé. Écris-la AVANT de calculer, au '
          + 'moment où tu choisis l\'opération — des g/cm³ contiennent une division, et '
          + 'cette division EST le calcul. Beaucoup d\'élèves gagnent des points rien '
          + 'qu\'en changeant cet ordre-là.',
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          'Relis l\'unité qu\'on te demande : contient-elle une barre de division ? Si '
          + 'oui, ta réponse doit venir d\'une division.',
      },
    ],
    constats: [
      {
        id: 'couper-le-cube-en-deux',
        contexteDeSurface: 'objet-coupe-en-deux',
        dispositif:
          'Un cube de métal, pesé et mesuré : on note sa masse et sa masse volumique. '
          + 'On le scie proprement en deux moitiés égales. On pèse une moitié et on '
          + 'mesure son volume.',
        predictionEngagee: {
          question:
            'Après la coupe, que valent la masse d\'une moitié et sa masse volumique, '
            + 'comparées à celles du cube entier ?',
          champs: [
            { id: 'masse', etiquette: 'la masse d\'une moitié' },
            { id: 'masse-volumique', etiquette: 'la masse volumique d\'une moitié' },
          ],
        },
        resultat:
          'La masse est divisée par deux. La masse volumique, elle, n\'a pas bougé d\'un '
          + 'centième — c\'est exactement la même valeur qu\'avant la coupe.',
        conflit:
          'Deux grandeurs qui ne réagissent pas pareil à la même action ne peuvent pas '
          + 'être la même grandeur. Celle qui ne bouge pas décrit la MATIÈRE ; celle qui '
          + 'est divisée décrit l\'OBJET.',
      },
      {
        id: 'deux-flacons-de-la-meme-huile',
        contexteDeSurface: 'deux-flacons-du-meme-liquide',
        dispositif:
          'Un petit flacon et un grand flacon, remplis de la même huile, tirée du même '
          + 'bidon. On pèse les deux, et on mesure le volume des deux.',
        predictionEngagee: {
          question:
            'Lequel des deux flacons a la plus grande masse ? Et lequel a la plus '
            + 'grande masse volumique ?',
          champs: [
            { id: 'masse', etiquette: 'le plus grand en masse' },
            { id: 'masse-volumique', etiquette: 'le plus grand en masse volumique' },
          ],
        },
        resultat:
          'Le grand flacon est nettement le plus lourd. Les deux ont exactement la même '
          + 'masse volumique.',
        conflit:
          'La même question posée sur les deux grandeurs donne deux réponses '
          + 'différentes : elles ne peuvent donc pas être la même grandeur. Et c\'est '
          + 'l\'huile qui a une masse volumique, pas le flacon.',
      },
    ],
  },
};
