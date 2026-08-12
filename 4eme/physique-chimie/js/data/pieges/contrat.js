// Pièges — famille « Le contrat didactique ».
//
// Un piège n'est pas une erreur constatée : c'est une CONCEPTION documentée.
// Les cinq autres familles décrivent ce que l'élève croit du monde physique.
// Celle-ci décrit autre chose, et c'est ce qui la rend inhabituelle : elle
// décrit ce que l'élève croit de l'EXERCICE. « Ce qui est écrit au-dessus dit
// ce qu'il faut appliquer », « toutes les données servent », « une question
// posée a une réponse », « un calcul juste donne un résultat vrai ». Ce sont
// des modèles, ils sont cohérents, et ils prédisent correctement la
// quasi-totalité de ce que l'élève a rencontré depuis le CP — parce que les
// exercices d'entraînement sont écrits pour qu'ils marchent. Ils tombent tous
// au même endroit : **en contrôle, au brevet, rien n'annonce le chapitre.**
//
// ── Pourquoi ces six-là ────────────────────────────────────────────────────
//
// Ce sont exactement les six entrées « Contrat didactique » du catalogue de
// `charte.md` : la série étiquetée par chapitre ; la réponse conforme sans
// adhésion ; l'unité absente ou fausse ; la valeur invraisemblable non
// critiquée ; la valeur aberrante d'une série non repérée ; les données
// superflues et les questions auxquelles on ne peut pas répondre. Les deux
// dernières entrées du catalogue sont réunies en un seul piège
// (`donnees-superflues-et-questions-sans-reponse`) parce qu'elles sont une
// seule conception prise par ses deux bouts : *l'énoncé est calibré, on m'a
// donné ce qu'il faut et rien d'autre*. Les séparer aurait produit deux pièges
// portant la même règle et le même contrôle, donc deux fois la même
// re-confrontation sous deux noms.
//
// `didactique.md` § 9 range le contrat didactique cinquième par centralité —
// « classement physique/chimique, séries étiquetées par chapitre, réponses
// conformes sans adhésion (3ᵉ loi). Même obstacle qu'en maths, mêmes remèdes :
// mélanger, ne pas étiqueter, demander la justification. » Et § 7, point 5 des
// six conséquences du rang 1, le pose comme une contrainte de FORME sur toutes
// les autres familles : « pendant le chapitre sur les transformations
// chimiques, tout est une transformation chimique ».
//
// ── Le rang : AUCUN des six n'est une reprise de didactique.md § 7 ─────────
//
// Il faut le dire d'emblée, parce que le champ `rang` est défini comme la
// reprise littérale du § 7 et qu'un rang posé sans lui ferait mentir le champ.
// Le § 7 nomme quatre rangs 1 (extramission, conservation de la masse,
// adhérence force-vitesse, courant qui s'use), cinq rangs 2 (pile-courant-
// constant, raisonnement séquentiel, classement physique/chimique, particules
// aux propriétés macroscopiques, analogies) et quatre rangs 3. **Aucune des six
// conceptions de ce fichier n'y figure.**
//
// Deux issues étaient possibles, et la seconde a été retenue.
//
//   · **Rang 2** — tentant, parce que ces conceptions sont bel et bien
//     fabriquées par l'école : c'est le découpage en chapitres qui enseigne que
//     le titre dit la loi. Refusé pour deux raisons. D'abord `charte.md`
//     § « Les conceptions que nous fabriquerons » **clôt la liste des pièges
//     iatrogènes à deux** et les nomme (`pile-courant-constant`,
//     `raisonnement-sequentiel`) ; en ajouter un troisième depuis un fichier de
//     contenu, c'est amender la charte en passant. Ensuite le rang 2 exige
//     `iatrogene`, l'identifiant du savoir-faire **qui produit** la conception.
//     Ici le producteur n'est pas un savoir-faire, c'est la structure entière du
//     cours. Nommer un savoir-faire au hasard pour satisfaire le contrôle
//     produirait un champ résoluble et faux — pire qu'un champ absent.
//
//   · **Rang 3** — retenu, avec la formulation que `signaux.js` a fixée pour
//     ses deux rangs 3 et qui vaut ici mot pour mot : **le rang 3 N'AFFIRME PAS
//     que la conception cède à cet âge.** Personne n'en sait rien : aucune des
//     six n'a jamais été testée contre un enseignement qui la visait. Il dit que
//     nous ne dépensons pas sur elles le budget de réfutation espacée d'un
//     rang 1 — cinq créneaux annuels chacune — tant qu'aucune donnée de
//     persistance n'existe.
//
// Et il y a, ici, une raison supplémentaire de ne pas s'en désoler, qui
// n'existait pas pour `signaux.js`. Un rang 3 ne reçoit pas de créneau 3 (la
// re-confrontation), mais **ce n'est pas par là que cette famille est servie**.
// `charte.md` § « La structure de séance » place le palier 4 — non étiqueté,
// mélangé, « la première tâche est de reconnaître » — dans le **cœur** de la
// séance, pour tout savoir-faire porteur d'un piège, et le critère de maîtrise
// exige trois réussites à ce palier. Ces six conceptions sont exactement ce que
// le palier 4 mesure : elles sont donc servies cinq à huit fois par séance, par
// tous les autres pièges, sans consommer un seul créneau de la file de
// réfutation. Le rang 3 est ici un choix de comptabilité, pas un renoncement.
//
// **Le plafond, et ce qu'il pèse réellement dans la décision.** Une première
// rédaction de ce commentaire annonçait ici « dix rangs 1 déjà écrits, plafond
// atteint », et s'en servait comme argument principal. Le décompte était faux et
// l'argument avec lui ; il est refait sur les fichiers, et il est plus modeste.
// État au moment de cette relecture : **symbolique 0** (ses quatre pièges sont
// tous de rang 2), **mouvement 3**, **électricité 3**, **signaux 1** — soit
// **sept**, pour un plafond de « au plus dix » chez `charte.md`. `matiere.js`
// est en cours d'écriture, porte déjà deux rangs 1, et doit encore apporter la
// conservation de la masse, qui est le § 7 ② et ne se négocie pas.
//
// Ce qu'il faut en conclure, et rien de plus : **le plafond n'est pas atteint,
// donc il ne tranche pas à notre place.** Il exerce une pression — la file de
// `matiere.js` n'est pas close et c'est elle qui a les meilleurs titres —, mais
// un argument de budget ne peut pas décider d'un rang, qui est une affirmation
// sur ce que la recherche a mesuré. Le motif qui porte reste donc le seul
// motif honnête : **aucune de ces six conceptions n'a de persistance mesurée
// après un enseignement qui la visait**, et le § 7 ne les nomme pas.
//
// **La quasi-collision à ne pas confondre.** Le § 7 range en rang 2 « le
// classement physique / chimique, où l'erreur augmente avec l'âge ». Ce n'est
// PAS le piège `serie-etiquetee-par-le-chapitre` de ce fichier. Le rang 2 du
// § 7 porte sur le CONTENU de la catégorie (« chimique » devient une étiquette
// qu'on colle largement) et appartient à la famille `matiere`, où
// `charte.md` § « Le catalogue » le range explicitement (« la frontière
// physique/chimique n'est pas où le programme la place »). Le piège d'ici porte
// sur la STRATÉGIE (lire le titre au lieu de lire la situation), qui n'est
// classée nulle part. Un relecteur qui verrait ici un rang 2 escamoté regarde
// le bon endroit et la mauvaise conception ; les deux pièges se rencontreront
// souvent sur le même item, et c'est normal.
//
// ── La fiabilité : cinq non-documentées, une primaire ──────────────────────
//
// `fiabilite` ne dit pas la même chose que `rang`. Le rang parle de résistance
// à un enseignement ciblé ; la fiabilité parle de la SOURCE de la description,
// sur la convention ✔ / ◆ / ○ de `didactique.md`. Une conception peut donc être
// décrite sur une source primaire et n'avoir jamais été testée : c'est
// exactement le cas de `reponse-conforme-sans-adhesion`.
//
//   · `reponse-conforme-sans-adhesion` — **`primaire`**. § 4.5, marqué ✔ :
//     « il arrive que certains élèves *jouant le jeu scolaire* produisent des
//     réponses en accord avec le principe des actions réciproques tout en
//     continuant à penser » le contraire (Éduscol / DGESCO 2019, ressource
//     institutionnelle française lue en original). La phrase décrit le
//     phénomène ; elle ne mesure ni sa fréquence ni sa persistance. D'où
//     `fiabilite: primaire` ET `rang: 3`, qui ne se contredisent pas.
//   · Les cinq autres — **`non-documente`**. `didactique.md` ne porte sur elles
//     ni chiffre, ni typologie, ni marqueur. Le voisinage le plus proche est
//     § 3.6 (le classement, ◆) pour la première et § 3.8 (masse volumique, ○,
//     « c'est un trou du corpus ») pour la troisième et la quatrième — voisinage
//     n'est pas source, et il n'est pas transformé en rang.
//     Conséquence de charte, qui porte : **un piège `non-documente` ne peut pas
//     fonder à lui seul une décision de maîtrise.**
//
// **La condition de révision est écrite, et elle est bon marché.**
// `didactique.md` § 10 signale le dossier DEPP « CEDRE Sciences collège
// physique-chimie 2024 » (Document de travail n° 2026-E12, série Études,
// juillet 2026, public — `didactique.md` ne dit rien de sa licence et ce
// commentaire n'en invente pas)
// qui donne, pour seize situations, **la répartition des erreurs sur chaque
// distracteur** — et il n'a pas été dépouillé. Quatre de ses situations portent
// directement sur cette famille : 2.8 (« Lire et analyser les données d'un
// graphique »), 2.12 (« Interroger la fiabilité d'une source d'information »),
// 2.13 (« Vérifier le respect des données scientifiques dans une
// représentation ») et 2.3 (« Mesurer une masse de sucre en prenant en compte
// la masse de la tasse » — une donnée superflue au sens strict). C'est là qu'il
// faut aller avant de reclasser quoi que ce soit ici, et cela ne coûte qu'une
// lecture.
//
// ── Le croisement avec `js/unites.js`, et ce qu'il interdit d'écrire ───────
//
// `unite-absente-ou-fausse` est le seul piège du catalogue dont la
// reconnaissance est déjà implémentée : `comparerReponse` rend quatre verdicts
// distincts, et **ils ne se confondent jamais**. Le piège doit être écrit en
// conséquence, sans quoi il contredirait le moteur qui le sert :
//
//   · `DIMENSION_FAUSSE` — une masse là où on attendait une masse volumique.
//     **C'est le piège**, et c'est le seul cas où il est atteint par l'unité.
//   · `REPONSE_INCOMPLETE` sur le champ unité — l'unité manque. C'est le piège
//     aussi, par son autre bout. Le champ a trois états et « sans unité » y est
//     un CHOIX explicite : sans ce troisième état, on ne distinguerait pas
//     l'oubli du refus légitime, et le piège se déclencherait sur des réponses
//     adimensionnées parfaitement justes.
//   · `UNITE_NON_DEMANDEE` — **ce n'est PAS une erreur, et le piège ne doit
//     jamais la traiter comme telle.** Répondre 2 700 kg/m³ à une question posée
//     en g/cm³, c'est répondre juste : `accepte: true`, réussite comptée,
//     signalée. Le refus n'existe que si `uniteImposee` vaut vrai, ce que
//     `charte.md` réserve à trois cas dans toute l'année — g/cm³ ↔ kg/m³,
//     m/s ↔ km/h, J ↔ kWh — où la conversion EST le savoir-faire demandé. La
//     `conditionValidite` du piège exclut donc explicitement ces items, et un
//     `raisonnement` est écrit pour le dire à l'élève dans ses mots.
//   · `UNITE_NON_RECONNUE` — ni juste, ni faux, **ne consomme pas d'essai**,
//     redemande. Une saisie que le lexique élève ne sait pas lire n'est pas une
//     conception : c'est un clavier. Un raisonnement le dit aussi, parce qu'un
//     élève à qui l'on redemande sans explication croit toujours qu'il s'est
//     trompé.
//
// ── Ce que cette famille ne couvre PAS ─────────────────────────────────────
//
//   · **La conversion ratée** (g/cm³ → kg/m³, min → h, isoler une inconnue).
//     Ce n'est pas un rapport à l'exercice, c'est un geste mathématique, et il
//     porte `origine: mathematique` là où il est écrit. Le catalogue de
//     `maths-4e` porte déjà `unites-non-converties` et `grandeur-quotient-
//     inversee` (chapitre 5), avec le même contrôle — lire l'unité comme une
//     division. Aucun piège d'ici ne les double, et aucun ne porte
//     `origine: mathematique` : ce serait promettre un renvoi vers une section
//     de `maths-4e` que ce fichier n'a pas vérifiée contre `CONTRAT_MATHS`.
//   · **La lecture de graphique en elle-même** (choisir l'axe, interpoler).
//     Savoir-faire, pas conception.
//   · **La justification vide** (« parce que c'est comme ça »). C'est un état du
//     double QCM, traité par le moteur (juste/faux → série interrompue, pas de
//     redescente de palier), pas une conception typée.
//   · **L'anxiété d'évaluation, la gestion du temps, la copie blanche.** Réels,
//     coûteux, et hors de tout ce que ce dossier documente. Un piège inventé
//     vaut moins que pas de piège.
//
// ── La forme des champs ────────────────────────────────────────────────────
//
// `conditionValidite` suit la forme de `signaux.js` — `{ situation, predicat,
// pourquoi }` — et non les deux autres formes des fichiers frères (fonction nue
// dans `symbolique.js` et `electricite.js`, `{ champs, predicat: STRING,
// enClair }` dans `mouvement.js`). C'est la seule des trois qui porte à la fois
// le type de la `situation` et un prédicat **exécutable**, donc la seule qui
// satisfasse l'exigence de `charte.md` — la condition est *dérivée* de la
// situation, « le contrôle lit la situation, pas le drapeau » — sans exiger
// d'évaluer une chaîne de caractères. La réconciliation reste à faire dans
// `schema/piege.schema.json`, et ce fichier ne l'aggrave pas.
//
// Aucun `distracteurs` : ils s'écrivent avec les items, et les items n'existent
// pas. Aucun `iatrogene` : aucun rang 2, voir plus haut. Aucun
// `antecedentHistorique` : le champ n'existe que pour le capital force et
// l'extramission, et servi ici la phrase « des savants l'ont cru » fabriquerait
// de l'histoire des sciences.
//
// ── Aucun chiffre, et la raison vaut aussi pour les valeurs physiques ──────
//
// Rien de ce qui est servi à l'élève ne porte de pourcentage. Tout ce que ce
// commentaire cite est ◆ ou ✔ et reste dans `didactique.md` : un chiffre de
// revue secondaire devenu argument est exactement ce qui a produit l'épisode du
// « 57 % d'ampèremètre ». La règle vaut aussi pour les valeurs physiques, et
// elle mord ici plus qu'ailleurs, parce que deux de ces pièges parlent de
// vraisemblance : la masse d'un litre d'eau et la vitesse d'un cycliste se
// disent **en mots**, par comparaison à un objet que l'élève soulève, et les
// valeurs mesurées vivent dans la table de constantes sourcée dont les items de
// classe A′ les tirent.
//
// **L'exception, qui est réelle et qu'il faut nommer plutôt que la taire.**
// `unite-absente-ou-fausse` sert « 2,7 » et « 2 700 kg/m³ » dans sa `regle` et
// dans son premier constat. Ce ne sont pas des valeurs mesurées affirmées comme
// des faits — le piège ne dit nulle part « la masse volumique du galet vaut
// 2,7 » : il montre **la même grandeur écrite de deux façons**, et le nombre y
// est un exemple d'écriture dont seule l'équivalence est en jeu. Cette
// équivalence-là est une conversion, pas une donnée du corpus, et elle se
// vérifie mécaniquement. Partout ailleurs, un piège n'est pas l'endroit où l'on
// écrit un nombre en dur.
//
// ── Le ton, qui décide de tout dans cette famille ──────────────────────────
//
// Deux choses toujours vraies, et elles doivent transparaître dans les
// `raisonnements` : la conception de l'élève prédit correctement la
// quasi-totalité de ses situations quotidiennes, et il devra apprendre à
// l'INHIBER plutôt qu'à l'oublier — c'est ce que font les experts. On n'écrit
// jamais « c'est faux, voilà la règle », et **on accorde ce qui est vrai AVANT
// de corriger**.
//
// Ici cette règle n'est pas une politesse, c'est une exactitude. Un élève qui
// applique la loi du chapitre en cours a raison neuf fois sur dix, et il a
// raison parce que nous, les professeurs et les manuels, avons écrit les
// exercices pour qu'il ait raison. Lui reprocher sa stratégie sans reconnaître
// d'abord qu'elle marche — et que c'est nous qui l'avons installée — serait à la
// fois faux et injuste. Chaque `raisonnement` de ce fichier commence donc par
// l'accord, et plusieurs disent explicitement que le réflexe est bon et qu'il
// s'agit de savoir quand ne pas le suivre.
//
// ── La relecture de réfutation, faite piège par piège ─────────────────────
//
// Chaque bloc ci-dessous s'ouvre sur l'épreuve exigée : une réponse fausse
// typique, sa `regle` et son `controle` appliqués dessus, et la vérification
// qu'ils la CONTREDISENT. **Quatre des six** ont dû être réécrits, en deux
// vagues, et il faut dire lesquelles parce que le défaut n'est pas le même.
//
// Première vague — la branche inverse manquante :
//   · `valeur-invraisemblable-non-critiquee`, dont la première règle félicitait
//     l'élève qui trouve tout surprenant ;
//   · `valeur-aberrante-d-une-serie-non-reperee`, dont la première règle
//     autorisait à jeter n'importe quelle mesure gênante.
//
// Seconde vague, à la relecture adverse, et les deux défauts sont plus graves
// que les premiers :
//   · `reponse-conforme-sans-adhesion` — sa règle disait « c'est la situation
//     qui tranche ». Appliquée à la réponse fausse typique, où l'élève PRÉDIT
//     sur la situation et se trompe, elle le **confortait** : sa prédiction est
//     ce qu'il lit sur la situation, donc elle gagnait. C'était le pire des
//     trois cas — la règle validait l'erreur qu'elle devait réfuter. Elle dit
//     maintenant que ni la phrase du cours ni l'impression ne gagnent par
//     autorité, que ce qui tranche est ce qu'on peut MESURER, et — parce que
//     c'est vrai et que le taire serait lâche — que dans ce désaccord-là c'est
//     presque toujours l'impression qui perd.
//   · `serie-etiquetee-par-le-chapitre` — sa règle et son contrôle ne
//     couvraient qu'un sens. L'élève qui bascule dans l'autre (« série
//     mélangée, donc la réponse n'est jamais celle du chapitre en cours »)
//     n'était réfuté par rien, alors que c'est exactement le contrat que ce
//     piège risque d'installer en le défaisant. Branche inverse ajoutée à la
//     règle, au contrôle, et un `raisonnement` pour cet élève-là.
//
// **Et deux prédicats ne couvraient eux aussi qu'un sens** — le même défaut,
// mais logé dans le code plutôt que dans la prose. `valeur-invraisemblable`
// n'acceptait un item que si `facteurDEcart >= 10`, ce qui rejetait toute
// valeur DIX FOIS TROP PETITE ; `valeur-aberrante` n'acceptait qu'un
// `facteur >= 2`, ce qui rejetait toute mesure deux fois trop faible. Les deux
// familles d'items les plus naturelles — un litre d'eau qui pèserait un gramme,
// une pesée où la balance n'a lu que la moitié — étaient mécaniquement
// interdites. Les deux prédicats lisent maintenant le facteur dans les deux
// sens.

export default {
  // ── La série étiquetée par le chapitre ───────────────────────────────────
  //
  // ÉPREUVE DE RÉFUTATION. Réponse fausse typique : dans une série servie
  // pendant le chapitre des combustions, un item décrit du sucre qu'on remue
  // dans de l'eau jusqu'à ce qu'il ne se voie plus ; l'élève répond
  // « combustion » — ou, plus fréquent et plus insidieux, « transformation
  // chimique », parce que c'est le mot du chapitre.
  //
  //   · La `regle` mord : elle dit que le titre n'est pas une donnée de
  //     l'énoncé et que ce qui tranche est ce qui a CHANGÉ dans ce qui est
  //     décrit. Appliquée à l'item, elle ne trouve aucune espèce nouvelle, donc
  //     elle contredit la réponse au lieu de la confirmer.
  //   · Le `controle` mord aussi, et par un chemin différent : « ta réponse
  //     tiendrait-elle si cet exercice était tombé au milieu d'un autre
  //     chapitre ? » — appliqué à « combustion », il rend la réponse
  //     indéfendable sans le titre.
  //
  // Ni l'un ni l'autre ne peut valider la réponse, y compris dans le cas où
  // l'élève tombe juste par hasard : le contrôle porte sur le CHEMIN, pas sur la
  // valeur, et c'est ce qui le rend utilisable au palier non étiqueté.
  //
  // LA BRANCHE INVERSE, ajoutée à la relecture adverse, et c'est le défaut qui
  // manquait. L'erreur symétrique est ici particulièrement facile à fabriquer,
  // parce que c'est NOTRE dispositif qui la fabrique : à force de servir des
  // séries mélangées, l'élève apprend « on me sert une série mélangée, donc la
  // réponse n'est jamais celle du chapitre en cours ». Il a alors remplacé une
  // lecture du titre par une lecture du DISPOSITIF, et il n'a toujours rien
  // reconnu. Or la règle et le contrôle d'origine étaient muets sur lui : « ta
  // réponse tiendrait-elle dans un autre chapitre ? » — oui, dit-il, puisqu'il a
  // justement évité le chapitre. Il passait le contrôle sans être réfuté.
  //
  // Ce que la correction fait, en trois endroits :
  //   · le `formatDiagnostique` exigeait déjà des items du chapitre en cours
  //     DANS la série ; le `pourquoi` du prédicat le relie maintenant
  //     explicitement à cette erreur-là, parce que c'est ce mélange, et lui
  //     seul, qui rend la stratégie d'évitement perdante ;
  //   · la `regle` dit que la bonne réponse est parfois celle du chapitre en
  //     cours, et que la refuser pour cette raison est la même faute retournée ;
  //   · un `raisonnement` est écrit pour cet élève, et il n'est pas grondé :
  //     il a repéré une régularité du dispositif, ce qui est un travail
  //     d'observation réel, mal employé.

  'serie-etiquetee-par-le-chapitre': {
    id: 'serie-etiquetee-par-le-chapitre',
    conception:
      "Le titre écrit au-dessus de l'exercice — chapitre, page, leçon du jour — "
      + "désigne la loi ou la catégorie à appliquer. La tâche n'est pas de "
      + "reconnaître de quoi il s'agit, elle est de retrouver ce qu'on vient "
      + "d'apprendre et de l'appliquer. La situation décrite sert à habiller la "
      + "question, pas à la trancher.",
    enonceEleve:
      "On est dans le chapitre des combustions, donc c'est une combustion. On vient "
      + "de faire la formule, donc c'est cette formule-là qu'il faut utiliser.",

    // Rang 3, et ce N'EST PAS une reprise de didactique.md § 7 : voir l'en-tête,
    // section « Le rang ». Le § 7 range en rang 2 le CLASSEMENT
    // physique/chimique, qui est une autre conception et appartient à
    // `matiere`. La stratégie d'étiquetage, elle, n'est classée nulle part.
    // Le rang 3 n'affirme pas qu'elle cède à cet âge.
    rang: 3,
    fiabilite: 'non-documente',
    origine: 'physique',
    chapitreOrigine: 'ch06-transformations-chimiques',

    // Le locus documenté : `didactique.md` § 7, point 5 — « pendant le chapitre
    // sur les transformations chimiques, tout est une transformation chimique ».
    // Le chapitre 6 est en trimestre 2 et laisse SEPT chapitres après lui — 7 à
    // 11, plus les deux blocs que `charte.md` § « La progression » érige en
    // chapitres de plein droit (loi d'Ohm, poids et pesanteur), ce qui porte le
    // plan à treize. Trois de ces sept sont [F] ; quatre sont de noyau, et ça
    // suffirait même si le rang montait un jour.
    //
    // Le plus court rythme de la famille : c'est la conception que le palier 4
    // mesure directement, donc celle dont l'entretien coûte le moins et rapporte
    // le plus. Décalé de 10 pour `reponse-conforme-sans-adhesion`, qui part du
    // même chapitre — deux pièges d'un même chapitre qui retomberaient ensemble
    // feraient reconnaître le motif au lieu de la situation.
    rythmeInitial: 9,

    formatDiagnostique: {
      modeDeReponse:
        "série mélangée NON étiquetée — aucun titre de chapitre, aucune loi nommée, "
        + "aucun encadré de rappel visible —, dont la première question est « de quoi "
        + "s'agit-il ? » avant toute question de valeur",
      contexteImpose:
        "des items d'au moins deux chapitres différents, dont le chapitre en cours",
      pourquoi: null,
    },

    conditionValidite: {
      situation:
        '{ chapitreAnnonce: string | null, chapitreEnCours: string, '
        + 'chapitreReel: string, serieMelangee: boolean }',
      predicat: (s) =>
        s?.chapitreAnnonce === null
        && s.serieMelangee === true
        && typeof s.chapitreReel === 'string'
        && s.chapitreReel !== s.chapitreEnCours,
      pourquoi:
        "Trois exigences, et la troisième est celle qu'on oublie. (1) Rien ne doit "
        + "annoncer le chapitre : un titre, un encadré « rappel de cours », même la "
        + "position dans une page, et l'item ne mesure plus que l'obéissance. "
        + "(2) La série doit être MÉLANGÉE : servie seule, une question hors "
        + "chapitre redevient elle-même une étiquette — « celle-ci est différente, "
        + "donc c'est un piège » — et l'élève réussit sans avoir rien reconnu. "
        + "(3) Et l'item ne discrimine que si sa réponse N'EST PAS celle du "
        + "chapitre en cours. C'est la clause décisive : sur un item du chapitre "
        + "courant, la stratégie de l'élève donne la bonne réponse, l'item le "
        + "conforte, et nous aurions compté une réussite pour une conception "
        + "intacte. Le prédicat porte donc sur `chapitreReel !== chapitreEnCours`, "
        + "lu sur la situation et jamais sur un drapeau saisi par l'auteur. "
        + "**Et il faut immédiatement dire ce que cette clause ne doit PAS "
        + "devenir.** Elle sélectionne les items qui DIAGNOSTIQUENT ; elle ne "
        + "décrit pas la série servie. Si le vivier ne contenait que des items "
        + "hors chapitre, nous aurions remplacé un contrat par son exact "
        + "symétrique — « ici, ce n'est jamais le chapitre en cours » — et "
        + "l'élève qui l'aurait repéré réussirait tout sans rien reconnaître. "
        + "C'est pourquoi le `formatDiagnostique` exige que la série porte AUSSI "
        + "des items du chapitre courant : ils ne comptent pas au diagnostic, ils "
        + "sont ce qui rend l'évitement perdant. Les deux clauses sont "
        + "solidaires, et retirer l'une casse l'autre.",
    },

    regle:
      "**Le titre d'un chapitre n'est pas une donnée de l'énoncé.** Il dit ce qu'on "
      + "est en train d'apprendre, pas ce que la situation est. En contrôle et au "
      + "brevet il n'y en a plus, et c'est précisément ce que l'épreuve mesure : "
      + "**reconnaître avant d'appliquer**. La question à laquelle il faut répondre "
      + "en premier n'est donc jamais « quelle formule ai-je vue cette semaine ? », "
      + "c'est **« qu'est-ce qui a changé dans ce qui est décrit ? »** — et la "
      + "réponse ne se lit que dans l'énoncé. Une loi qu'on applique parce qu'elle "
      + "est au programme du jour n'a pas été choisie : elle a été subie. "
      + "**Et attention à ne pas retourner la faute**, parce que c'est le piège "
      + "d'après : dans une série mélangée, la bonne réponse est **souvent celle "
      + "du chapitre en cours**, et l'écarter parce qu'elle est celle du chapitre, "
      + "c'est répondre au dispositif au lieu de répondre à la question — la même "
      + "erreur, dans l'autre sens. Ce qui est interdit n'est pas la réponse du "
      + "chapitre : c'est de la donner **sans être allé la chercher dans "
      + "l'énoncé**.",

    controle:
      "Cache le titre avec la main, et relis. Souligne dans l'énoncé les mots qui "
      + "disent ce qu'on **observe** — ce qui est mélangé, chauffé, branché, lâché, "
      + "ce qui apparaît, ce qui disparaît. Ta réponse doit s'appuyer sur au moins "
      + "un de ces mots-là. Puis pose-toi la seule question qui tranche : **ta "
      + "réponse tiendrait-elle si cet exercice était tombé au milieu d'un autre "
      + "chapitre ?** Si ta seule raison est « c'est ce qu'on fait en ce moment », "
      + "tu n'as pas encore de raison. **Et pose-toi la question dans l'autre "
      + "sens aussi** : est-ce que tu as écarté une réponse uniquement parce "
      + "qu'elle était celle du chapitre ? Si oui, tu n'as pas de raison non plus "
      + "— tu as juste deviné dans l'autre sens. Les deux fois, le test est le "
      + "même : montre le mot de l'énoncé sur lequel ta réponse s'appuie.",

    raisonnements: [
      {
        id: 'c-est-le-chapitre-en-cours',
        texte: "On vient de faire les combustions, donc c'était forcément ça",
        reponse:
          "Et tu as raison neuf fois sur dix — c'est même une bonne stratégie de "
          + "révision, parce que les exercices d'une page sont écrits exprès pour "
          + "travailler la leçon de la page. Ce n'est pas toi qui as inventé cette "
          + "règle : ce sont les manuels, et nous, qui te l'avons installée. Elle "
          + "s'arrête exactement là où l'année s'arrête, au contrôle et au brevet, "
          + "où plus rien n'est rangé. Le réflexe ne disparaîtra pas, et ce n'est "
          + "pas le but : il s'agit d'apprendre à ne pas le laisser répondre en "
          + "premier — c'est ce que font les physiciens, qui l'ont aussi.",
      },
      {
        id: 'le-mot-du-titre-etait-dans-l-enonce',
        texte: "Le mot du chapitre était dans l'énoncé, je l'ai suivi",
        reponse:
          "Repérer les mots-clés est utile, et tu as bien fait de les chercher. "
          + "Seulement un mot n'est pas une observation : « chauffer » apparaît dans "
          + "une fusion comme dans une combustion, « mélanger » dans une dissolution "
          + "comme dans une réaction. Ce qui distingue les deux n'est jamais le "
          + "verbe, c'est ce qu'on voit **à la fin** et qui n'était pas là **au "
          + "début**.",
      },
      {
        id: 'ce-ne-pouvait-pas-etre-le-chapitre-en-cours',
        texte: "La série est mélangée, donc ce n'était pas le chapitre qu'on étudie",
        reponse:
          "Tu as repéré quelque chose de vrai sur la façon dont ces séries sont "
          + "faites, et repérer une régularité comme celle-là demande de "
          + "l'observation — c'est le même talent que celui qu'on te demande sur les "
          + "énoncés. Seulement tu l'as appliqué au mauvais objet : tu as lu le "
          + "dispositif au lieu de lire la situation, et c'est exactement le geste "
          + "qu'on essaie de défaire, simplement retourné. Il y a bien des items du "
          + "chapitre en cours dans cette série, et sur ceux-là ta stratégie te fait "
          + "rater une réponse que tu connaissais. La question ne change pas : "
          + "qu'est-ce qui est décrit, et sur quel mot t'appuies-tu ?",
      },
      {
        id: 'les-questions-d-une-page-se-ressemblent',
        texte: "Toutes les questions d'une même série demandent la même chose",
        reponse:
          "C'est vrai dans un cahier d'entraînement, et c'est fait pour : on répète "
          + "pour installer un geste. Ici c'est l'inverse qui est demandé, et la "
          + "série est mélangée exprès. Regarde chaque énoncé comme s'il arrivait "
          + "seul, sans les autres autour — c'est exactement la situation d'un "
          + "sujet d'examen.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          "Reprenons par l'énoncé seul, sans regarder ce qu'il y a autour : qu'est-ce "
          + "qui est décrit au début, et qu'est-ce qui a changé à la fin ?",
      },
    ],

    // Deux constats, alors qu'un rang 3 n'en exige aucun. Même raison que dans
    // `signaux.js` : si le dépouillement de CEDRE fait remonter le rang, le
    // piège est déjà au format exigé et il n'y a rien à réécrire. Les deux
    // verrouillent une prédiction dont le résultat est DÉTERMINÉ — il ne dépend
    // pas de la performance de l'élève, donc le dispositif ne peut pas tomber à
    // plat.
    constats: [
      {
        id: 'la-page-qui-ne-tient-pas-sa-promesse',
        contexteDeSurface:
          "une page de manuel titrée « Les combustions », six exercices numérotés, "
          + "aucun autre indice",
        predictionEngagee:
          "Verrouille ta prédiction avant de lire les six énoncés : combien d'entre "
          + "eux décrivent réellement une combustion ? (les six / cinq / quatre / "
          + "moins de quatre)",
        resultat:
          "Quatre des six en décrivent une. Le troisième décrit du sucre dissous "
          + "dans de l'eau, le sixième de la cire qui fond au sommet d'une bougie — "
          + "et la page n'en dit rien nulle part.",
        conflit:
          "Le titre a annoncé six combustions, les énoncés en décrivent quatre. Ce "
          + "n'est pas une page mal faite : c'est une page ordinaire, et les deux "
          + "intrus y sont depuis toujours. Tant que tu réponds au titre, tu ne peux "
          + "pas les voir — pas parce que tu ne saurais pas les reconnaître, mais "
          + "parce que tu ne les as pas cherchés.",
      },
      {
        id: 'la-question-de-brevet-sans-etiquette',
        contexteDeSurface:
          "une question de dossier documentaire au format de l'épreuve — un texte "
          + "sur un ballon-sonde, un graphique, un tableau —, servie sans aucune "
          + "mention de chapitre",
        predictionEngagee:
          "Verrouille ta prédiction avant la correction : de quel chapitre cette "
          + "question relève-t-elle ? (masse volumique / mouvement et vitesse / "
          + "l'air et sa composition / plusieurs à la fois)",
        resultat:
          "Elle en croise trois : il faut la composition de l'air pour lire le "
          + "document, la masse volumique pour expliquer la montée, et la vitesse "
          + "pour exploiter le graphique.",
        conflit:
          "Il n'y avait pas de bonne case, et ce n'est pas un défaut du sujet — "
          + "c'est sa forme normale. Une question d'examen n'est pas rangée dans un "
          + "chapitre ; c'est toi qui vas chercher, dans plusieurs chapitres, ce "
          + "dont elle a besoin. Chercher **la** case est donc une stratégie qui n'a "
          + "pas seulement échoué ici : elle n'avait rien à trouver.",
      },
    ],
  },

  // ── La réponse conforme sans adhésion ────────────────────────────────────
  //
  // ÉPREUVE DE RÉFUTATION. Réponse fausse typique, et c'est un couple : l'élève
  // écrit « la voiture et le camion exercent l'un sur l'autre des forces de même
  // valeur » à l'item de restitution — c'est juste, mot pour mot le cours — et,
  // à l'item de prédiction servi plus loin dans la séance, il coche « le camion
  // pousse plus fort, c'est pour ça que la voiture recule ».
  //
  //   · La `regle` mord, et c'est le point délicat : elle doit contredire SANS
  //     valider la phrase juste. Elle dit que savoir énoncer une loi et savoir
  //     s'en servir ne sont pas la même chose et que la première ne compte pas
  //     pour la seconde. L'élève ne peut pas en sortir « à moitié juste » : il en
  //     sort avec deux réponses qui ne peuvent pas être vraies ensemble.
  //     **DÉFAUT CORRIGÉ ICI, et c'était le plus grave du fichier.** La règle
  //     disait, pour refuser à la phrase du cours de gagner par autorité :
  //     « c'est la situation qui tranche ». Or la réponse fausse de ce couple
  //     EST une lecture de la situation — l'élève regarde le dessin et voit le
  //     camion pousser plus fort. La règle, appliquée à lui, lui donnait donc
  //     raison : elle validait précisément la moitié fausse. Ce qui tranche
  //     n'est pas « la situation » au sens de ce qu'on croit y voir, c'est ce
  //     qu'on peut **mesurer** dessus, et il faut le dire dans ces mots-là.
  //   · Le `controle` mord par un geste exécutable : faire TOURNER sa propre
  //     phrase sur la situation et comparer à sa prédiction. Appliqué au couple
  //     ci-dessus, il produit « des forces de même valeur » d'un côté et « le
  //     camion pousse plus fort » de l'autre, donc il désigne le conflit au lieu
  //     de le masquer.
  //
  // Ce que ni l'un ni l'autre ne fait : féliciter. C'est délibéré, et c'est
  // l'état juste/faux du double QCM tel que `charte.md` le décrit — « pas une
  // réussite, il n'y a rien à réenseigner sur la valeur ». Le cas symétrique
  // (réponse fausse, justification juste), lui, EST félicité, mais il n'est pas
  // ce piège.

  'reponse-conforme-sans-adhesion': {
    id: 'reponse-conforme-sans-adhesion',
    conception:
      "Répondre juste et penser juste sont deux tâches distinctes, et l'école ne "
      + "demande que la première. La justification est une formalité à produire dans "
      + "les mots du cours ; ce que l'élève prédirait vraiment devant la situation "
      + "concrète relève d'un autre registre, qui n'entre pas en contradiction avec "
      + "le premier parce qu'ils ne se rencontrent jamais.",
    enonceEleve:
      "Je sais ce qu'il faut répondre, je l'ai appris. Après, ce que je pense qu'il "
      + "se passe vraiment, ce n'est pas ce qu'on me demande.",

    // Rang 3, comme toute la famille — voir l'en-tête. Mais `fiabilite:
    // primaire`, et c'est le seul du fichier : didactique.md § 4.5 décrit le
    // phénomène sur une ressource institutionnelle française lue en original et
    // marquée ✔ (Éduscol / DGESCO, « Les conceptions initiales en mécanique »,
    // 2019). La source décrit ; elle ne mesure ni fréquence ni persistance. Les
    // deux champs ne se contredisent donc pas : l'un dit d'où vient la
    // description, l'autre dit ce qu'on sait de sa résistance, et on n'en sait
    // rien.
    rang: 3,
    fiabilite: 'primaire',
    origine: 'physique',

    // Éduscol documente ce fait sur la troisième loi, donc au chapitre 10. Ce
    // n'est PAS le chapitre retenu, et il faut dire pourquoi : le chapitre 10 est
    // marqué [F] dans `programme.md`, et les TROIS chapitres qui le suivent — 11
    // (l'Univers), la loi d'Ohm, le couple poids/pesanteur — sont [F] eux aussi.
    // C'est le décompte que `mouvement.js` établit au même endroit, et il faut
    // s'y tenir : le dernier chapitre de noyau du plan est le 9. Y faire partir
    // la file, c'est la faire partir là où elle ne peut plus courir dès que
    // l'élève répond « pas encore » aux chapitres frontière. Le piège est transversal
    // par nature ; sa file démarre donc au premier chapitre où le dispositif
    // apparié a un contenu documenté à faire tourner — le chapitre 6, avec la
    // conservation de la masse en combustion. L'item CANONIQUE, lui, reste celui
    // d'Éduscol, servi au chapitre 10 : le chapitre d'origine n'est pas le
    // chapitre de référence.
    chapitreOrigine: 'ch06-transformations-chimiques',

    // Décalé de 9 (`serie-etiquetee-par-le-chapitre`), qui part du même
    // chapitre. Un cran plus lent parce que le dispositif est cher : il exige
    // deux items appariés servis à distance l'un de l'autre dans la séance.
    rythmeInitial: 10,

    formatDiagnostique: {
      modeDeReponse:
        "PAIRE d'items appariés : un item de restitution (double QCM, réponse ET "
        + "justification, justifications tirées de productions d'élèves) et un item "
        + "de PRÉDICTION sur une situation concrète portant sur la même loi",
      contexteImpose:
        "les deux items servis dans la même séance, mais séparés par d'autres items "
        + "et jamais visibles ensemble",
      pourquoi:
        "La conception se lit dans l'ÉCART entre les deux, jamais dans l'un des deux "
        + "pris seul.",
    },

    conditionValidite: {
      situation:
        '{ paire: { restitution: string, prediction: string } | null, '
        + "roleDeCetItem: 'restitution' | 'prediction', memeEcran: boolean, "
        + 'itemsIntercales: number }',
      predicat: (s) =>
        s?.paire !== null
        && typeof s?.paire?.restitution === 'string'
        && typeof s?.paire?.prediction === 'string'
        && s.roleDeCetItem === 'prediction'
        && s.memeEcran === false
        && (s.itemsIntercales ?? 0) >= 1,
      pourquoi:
        "C'est la condition la plus contraignante du fichier, et elle est dérivée, "
        + "pas déclarée. Un item de restitution servi SEUL ne mesure rien : l'élève "
        + "conforme y réussit, c'est même sa définition. Un item de prédiction servi "
        + "seul ne mesure rien non plus : il ne distingue pas celui qui ignore la loi "
        + "de celui qui la connaît et ne la croit pas — or ce sont deux élèves à qui "
        + "l'on doit deux choses différentes. Seule la PAIRE rend l'écart visible, et "
        + "elle ne le rend visible qu'à trois conditions : les deux items portent sur "
        + "la même loi, ils ne sont jamais sur le même écran, et au moins un item les "
        + "sépare. Sur le même écran, l'élève aligne sa seconde réponse sur la "
        + "première — non par tricherie, mais parce que la cohérence est ce qu'on lui "
        + "a appris à produire — et l'écart qu'on voulait mesurer disparaît sous nos "
        + "yeux. Le prédicat ne se déclenche que sur l'item de PRÉDICTION, qui est "
        + "celui des deux dont l'issue diagnostique quelque chose.",
    },

    regle:
      "**Savoir dire une loi et savoir s'en servir ne sont pas la même chose, et la "
      + "première ne compte pas pour la seconde.** Une loi qui ne sert pas à prédire "
      + "n'est pas une loi, c'est une phrase. Alors si ce que tu écris et ce que tu "
      + "prédis ne disent pas la même chose, tu n'as pas une réponse à moitié juste : "
      + "tu as **deux réponses à la même question**, et c'en est une de trop. "
      + "**Aucune des deux ne gagne parce qu'elle est la tienne, et aucune ne gagne "
      + "parce qu'elle est celle du cours.** Ce qui tranche, c'est ce qu'on peut "
      + "**mesurer** : les deux dynamomètres accrochés dos à dos, la balance avant "
      + "et après, le chronomètre. Et il faut te dire tout de suite comment ça finit "
      + "presque toujours, parce que te le cacher ne t'aiderait pas : **quand une "
      + "loi de physique et une impression se contredisent, c'est l'impression qui "
      + "perd** — non pas parce que le cours a autorité, mais parce que cette loi-là "
      + "a déjà été mise à l'épreuve des milliers de fois et qu'elle a tenu. C'est "
      + "exactement pour ça qu'elle vaut la peine d'être apprise, et c'est aussi "
      + "pour ça que ton impression ne disparaîtra pas : tu auras à la reconnaître "
      + "et à ne pas la suivre. La bonne nouvelle, c'est que le désaccord est le "
      + "signal le plus utile que tu puisses produire : il dit exactement où le "
      + "travail reste à faire.",

    controle:
      "Fais **tourner ta propre phrase** sur la situation, à voix basse, avant de "
      + "répondre. « Les deux forces ont la même valeur » — donc, sur ce dessin, la "
      + "flèche de la voiture sur le camion et celle du camion sur la voiture ont la "
      + "même longueur : est-ce bien ce que j'allais dessiner ? Si ta phrase et ton "
      + "geste ne donnent pas la même chose, **ne choisis pas en silence**. Écris les "
      + "deux et écris qu'elles se contredisent : « d'après la loi, elles sont "
      + "égales ; d'après ce que je vois, le camion pousse plus fort ». Cette "
      + "phrase-là vaut des points, et c'est celle qui te fera avancer. **Et si "
      + "l'exercice t'oblige à n'en donner qu'une, donne celle de la loi** — puis "
      + "écris à côté que ton intuition dit autre chose. Ce n'est pas te renier : "
      + "c'est signaler le seul endroit où il te reste quelque chose à comprendre.",

    raisonnements: [
      {
        id: 'c-est-ce-qu-il-faut-repondre',
        texte: "J'ai écrit ce qu'il fallait répondre, c'est bien ce qu'on demandait",
        reponse:
          "Repérer ce qu'on attend de toi est une vraie compétence, elle est rare, et "
          + "elle te servira toute ta vie. Elle a juste une limite précise : elle ne "
          + "fonctionne que là où quelqu'un attend quelque chose. Devant une situation "
          + "que personne n'a préparée — une panne, une mesure qui ne tombe pas juste, "
          + "une question de brevet écrite pour surprendre —, il n'y a plus rien à "
          + "deviner, et il ne reste que ce qu'on comprend vraiment.",
      },
      {
        id: 'les-deux-sont-vrais-chacun-a-sa-place',
        texte: "En cours c'est comme ça, mais dans la vraie vie ça se passe autrement",
        reponse:
          "Ta méfiance est saine, et elle est souvent fondée : beaucoup de modèles "
          + "scolaires sont simplifiés, et on te le dit rarement. Mais regarde bien "
          + "les deux réponses que tu as données : elles portent sur **la même "
          + "situation**, le même camion, le même instant. Il n'y a pas deux mondes "
          + "ici, il y en a un — et deux réponses qui ne peuvent pas y être vraies "
          + "ensemble.",
      },
      {
        id: 'je-l-ai-appris-sans-y-croire',
        texte: "Je l'ai appris par cœur, mais au fond je n'y crois pas",
        reponse:
          "C'est la chose la plus utile que tu puisses dire, et il faut du courage "
          + "pour l'écrire. Tu n'es pas seul : les physiciens n'y croient pas "
          + "spontanément non plus. On a mesuré ce qui se passe dans leur cerveau "
          + "quand on leur pose ces questions-là, et ce n'est pas qu'ils ont oublié "
          + "l'idée d'avant — c'est qu'ils la **retiennent** activement à chaque fois. "
          + "Ce que tu as à apprendre n'est donc pas à croire sur commande : c'est à "
          + "reconnaître le moment où ton intuition parle, et à ne pas la suivre là.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          "Reprenons sur la situation seule, sans la loi : à ton avis, qu'est-ce qui "
          + "se passe vraiment pour la voiture et le camion ? Réponds ce que tu "
          + "penses, pas ce que tu crois qu'on attend.",
      },
    ],

    // Le dispositif propre de ce piège : lui faire constater son PROPRE écart.
    // C'est un constat au sens strict — la prédiction est verrouillée avant
    // l'affichage — mais son résultat dépend de l'élève, contrairement aux
    // quatre autres constats du fichier. Les deux portent donc une BRANCHE
    // HONNÊTE : ce qu'on dit à celui qui a effectivement répondu pareil. Sans
    // elle, le dispositif annoncerait un conflit à un élève qui n'en a pas, ce
    // qui est le pire des trois cas — il repart en sachant que l'appli s'est
    // trompée sur lui.
    constats: [
      {
        id: 'tes-deux-reponses-cote-a-cote',
        contexteDeSurface:
          "la voiture et le camion qui se percutent — restitution de la loi en début "
          + "de séance, prédiction sur le dessin dix minutes plus tard",
        predictionEngagee:
          "Avant de revoir ce que tu as répondu tout à l'heure : penses-tu avoir dit "
          + "la même chose aux deux questions ? (oui, exactement / oui, à peu près / "
          + "non, je crois que j'ai changé d'avis)",
        resultat:
          "Tes deux réponses s'affichent côte à côte, telles que tu les as écrites, "
          + "avec l'heure de chacune.",
        conflit:
          "Si elles se contredisent : ce n'est pas une étourderie, et surtout ce "
          + "n'est pas une raison de rayer la seconde. Les deux sont à toi, et la "
          + "seconde est celle que tu utiliserais vraiment — c'est elle qui parle "
          + "quand personne ne demande rien. C'est donc sur elle qu'il y a du travail, "
          + "pas sur la phrase que tu sais déjà réciter. Si elles s'accordent : c'est "
          + "une vraie bonne nouvelle, et elle vaut mieux qu'une bonne note — garde ce "
          + "réflexe de vérifier, il ne coûte rien et il attrape ce que rien d'autre "
          + "n'attrape.",
      },
      {
        id: 'la-phrase-et-le-dessin',
        contexteDeSurface:
          "comment on voit un ballon posé sur une table — une phrase à choisir, puis, "
          + "plus tard, un dessin de flèches à orienter et à numéroter",
        predictionEngagee:
          "Tu viens de choisir la phrase. Avant de revoir ton dessin de tout à "
          + "l'heure : les flèches que tu as tracées iront-elles dans le même sens que "
          + "cette phrase ? (oui / non / je ne m'en souviens plus)",
        resultat:
          "Ta phrase et ton dessin s'affichent l'un sous l'autre, avec le sens de "
          + "chaque flèche.",
        conflit:
          "Ce décor n'est pas choisi au hasard : sur la vision, l'écart entre ce "
          + "qu'on dit et ce qu'on dessine est le mieux connu de toute la physique "
          + "scolaire, et il touche aussi les adultes. Dessiner ne se surveille pas "
          + "comme écrire — la main répond avant la phrase. Si tes deux réponses "
          + "divergent, tu viens de voir par où ton intuition passe quand tu ne la "
          + "surveilles pas. Si elles s'accordent, note-le : c'est exactement le "
          + "format où c'était le plus difficile.",
      },
    ],
  },

  // ── L'unité absente ou fausse ────────────────────────────────────────────
  //
  // ÉPREUVE DE RÉFUTATION, sur les quatre saisies typiques d'une question de
  // masse volumique posée en g/cm³, et il faut les traiter séparément parce que
  // deux d'entre elles ne sont PAS des erreurs.
  //
  //   1. « 2,7 » sans unité → REPONSE_INCOMPLETE sur le champ unité. La règle
  //      dit qu'une réponse sans unité ne dit aucune valeur : elle contredit.
  //      Le contrôle demande d'écrire l'unité AVANT le nombre : il l'attrape.
  //   2. « 2,7 g » → DIMENSION_FAUSSE. La règle dit que des grammes divisés par
  //      des centimètres cubes ne donnent pas des grammes : elle contredit
  //      frontalement, et elle nomme la nature, ce que le moteur fait aussi.
  //   3. « 2 700 kg/m³ » → UNITE_NON_DEMANDEE, `accepte: true`. **La règle dit
  //      explicitement que c'est JUSTE.** C'est la clause la plus importante du
  //      piège : écrite autrement, elle contredirait le moteur qui la sert et
  //      punirait un élève qui a raison.
  //   4. « 2,7 g/cm3 » → variante tolérée du lexique élève, donc JUSTE. Et une
  //      saisie hors lexique → UNITE_NON_RECONNUE : ni juste ni faux, aucun
  //      essai consommé. Un raisonnement le dit, parce qu'un élève à qui l'on
  //      redemande sans rien expliquer conclut qu'il s'est trompé.
  //
  // Le piège ne se déclenche donc que sur (1) et (2), et sa `conditionValidite`
  // exclut les items où l'unité est imposée — ceux où répondre en kg/m³ EST une
  // erreur, parce que la conversion y est le savoir-faire demandé. C'est cette
  // exclusion, et elle seule, qui rend `origine: physique` honnête : ce qui
  // reste après elle est dimensionnel, et le dimensionnel n'existe qu'ici.

  'unite-absente-ou-fausse': {
    id: 'unite-absente-ou-fausse',
    conception:
      "L'unité est une étiquette qu'on recopie de l'énoncé et qu'on colle à la fin, "
      + "pas une partie de la réponse. Le calcul se fait sur les nombres seuls ; "
      + "l'unité n'en sort pas, elle s'y ajoute — et n'importe laquelle des unités "
      + "qui traînent dans l'énoncé fera l'affaire, puisque le résultat, lui, est "
      + "déjà trouvé.",
    enonceEleve:
      "J'ai divisé, ça fait 2,7. L'unité, je la remets à la fin — il y avait des "
      + "grammes dans l'énoncé, alors je mets des grammes.",

    // Rang 3, non-documente. `didactique.md` ne porte aucune donnée sur l'oubli
    // d'unité. Le plus proche est § 4.6, qui relève l'usage fautif « kilomètre
    // heure » sur une source ✔ — c'est un fait de langue relevé au passage, pas
    // une conception mesurée, et le convertir en rang serait exactement ce que
    // `charte.md` § « Règle de sourçage » interdit. § 3.8 marque par ailleurs
    // toute la masse volumique ○ pour la tranche 12-14 ans : « c'est un trou du
    // corpus ». Condition de révision : la situation CEDRE 2.4 (« Comparer des
    // masses volumiques à partir d'une expérience »), non dépouillée.
    rang: 3,
    fiabilite: 'non-documente',

    // `physique`, et c'est un choix que la conditionValidite rend défendable —
    // pas l'inverse. La conversion ratée (g/cm³ ↔ kg/m³, min ↔ h) est un geste
    // mathématique, elle est déjà couverte par `unites-non-converties` et
    // `grandeur-quotient-inversee` dans le catalogue de `maths-4e` (chapitre 5),
    // avec le même contrôle — lire l'unité comme une division. Le prédicat
    // ci-dessous EXCLUT les items à unité imposée, c'est-à-dire précisément ceux
    // où la conversion est l'enjeu. Ce qui reste est le rapport de l'élève à la
    // dimension, et il n'a pas d'équivalent côté maths : aucun renvoi ne part
    // d'ici, et aucune section de `maths-4e` n'est citée — ce fichier n'a pas
    // vérifié `CONTRAT_MATHS`, donc il ne promet rien.
    origine: 'physique',
    chapitreOrigine: 'ch04-masse-volumique',

    // Le chapitre 4 est le premier de l'année où la réponse est une grandeur
    // COMPOSÉE, donc le premier où le verdict de dimension a quelque chose à
    // dire. NEUF chapitres après lui sur les treize du plan, dont cinq de
    // noyau : la marge est confortable, et elle l'est encore pour un élève qui
    // désactive tous les chapitres frontière.
    //
    // Un cran plus lent que les deux premiers pièges, parce que celui-ci est
    // déjà servi tous les jours par ailleurs — `charte.md` place la cohérence
    // dimensionnelle dans le RITUEL de contrôle, en ouverture de chaque séance.
    // Le rythme ne porte donc que la re-confrontation sur item complet.
    rythmeInitial: 11,

    formatDiagnostique: {
      modeDeReponse:
        "saisie libre, valeur et unité dans DEUX champs distincts, l'état « sans "
        + "unité » explicitement disponible. Jamais un QCM d'unités",
      contexteImpose:
        "une grandeur composée (quotient ou produit), l'énoncé portant au moins deux "
        + "unités différentes parmi ses données",
      pourquoi:
        "Reconnaître une unité dans une liste n'est pas la produire, et le modèle de "
        + "l'élève y réussit.",
    },

    conditionValidite: {
      situation:
        '{ reponseDimensionnee: boolean, uniteCible: string, '
        + 'unitesPresentesDansLEnonce: string[], champUniteSepare: boolean, '
        + 'uniteImposee: boolean }',
      predicat: (s) =>
        s?.reponseDimensionnee === true
        && s.champUniteSepare === true
        && s.uniteImposee === false
        && Array.isArray(s.unitesPresentesDansLEnonce)
        && s.unitesPresentesDansLEnonce.some((u) => u !== s.uniteCible),
      pourquoi:
        "Quatre exigences, et la troisième est celle qui décide de l'honnêteté du "
        + "piège. (1) La réponse doit être dimensionnée : sur une réponse sans "
        + "dimension, « sans unité » est le bon choix et le piège se déclencherait "
        + "sur une réussite. (2) Les deux champs doivent être séparés : dans un champ "
        + "unique, on ne sait pas distinguer une unité fausse d'une frappe. "
        + "(3) `uniteImposee` doit être FAUX. Là où l'unité est imposée — trois cas "
        + "dans toute l'année, ceux où la conversion EST le savoir-faire —, répondre "
        + "en kg/m³ pour des g/cm³ est refusé pour une raison qui n'a rien à voir "
        + "avec ce piège, et compter cet élève comme y étant tombé serait un "
        + "diagnostic faux. (4) Au moins une unité de l'énoncé doit DIFFÉRER de "
        + "l'unité attendue, sinon recopier suffit à répondre juste : le modèle de "
        + "l'élève gagne, et l'item le conforte au lieu de le mettre en défaut.",
    },

    regle:
      "L'unité n'est pas une étiquette qu'on colle à la fin : elle **fait partie de "
      + "la réponse**, et elle se **calcule** en même temps que le nombre. Des "
      + "grammes divisés par des centimètres cubes donnent des g/cm³ — pas des "
      + "grammes, qui étaient l'unité d'une des données et de rien d'autre. Une "
      + "réponse sans unité, ou avec une unité d'une autre **nature**, ne dit pas une "
      + "valeur approximative : elle n'en dit **aucune**. **Et il faut dire "
      + "immédiatement ce qui n'est PAS une erreur** : répondre 2 700 kg/m³ à une "
      + "question posée en g/cm³, c'est répondre **juste**. C'est la même grandeur "
      + "écrite autrement, c'est accepté, et on te le signale seulement pour que tu "
      + "saches que tu n'as pas répondu dans l'unité demandée. Il n'y a que trois "
      + "endroits dans l'année où l'unité est **imposée** — et là, c'est écrit dans "
      + "la question, parce que la conversion est justement ce qu'on te demande de "
      + "faire.",

    controle:
      "**Écris l'unité d'abord, avant le nombre**, en faisant l'opération sur les "
      + "unités toutes seules : des g ÷ des cm³, ça donne des g/cm³ ; des km ÷ des "
      + "min, ça donne des km/min — et c'est ce qui te dit qu'il fallait convertir. "
      + "Puis relis la question et demande-toi de quelle **nature** est ce qu'on "
      + "attend : une masse ? un volume ? une masse pour un volume ? Si ce que tu as "
      + "écrit ne se lit pas comme la réponse à cette question-là, ce n'est pas le "
      + "nombre qui est en cause, c'est la nature — et le nombre n'y changera rien. "
      + "Deux points pour finir, tous deux pour ne pas te corriger à tort. Si ton "
      + "unité n'est pas celle qu'on demandait mais qu'elle dit **la même chose**, "
      + "tu n'as rien à changer. Et si l'opération sur les unités les fait "
      + "**disparaître** — des grammes divisés par des grammes, une longueur "
      + "divisée par une longueur —, alors la réponse **n'a pas d'unité**, et « sans "
      + "unité » est le bon choix, pas un oubli. Mettre une unité partout n'est pas "
      + "plus prudent que n'en mettre nulle part : c'est dire quelque chose de faux "
      + "sur la nature du résultat.",

    raisonnements: [
      {
        id: 'unite-recopiee-de-l-enonce',
        texte: "J'ai remis l'unité qui était dans l'énoncé",
        reponse:
          "C'est un bon réflexe et il marche très souvent : quand on additionne des "
          + "masses, quand on lit une valeur sur un appareil, quand on convertit, "
          + "l'unité du résultat est bien celle des données. Il tombe dès qu'on "
          + "**divise ou multiplie deux grandeurs différentes** — parce qu'alors "
          + "l'unité du résultat n'est plus aucune des deux, c'est une troisième, "
          + "faite des deux premières.",
      },
      {
        id: 'le-nombre-suffit',
        texte: "Le nombre est juste, on voit bien de quoi je parle",
        reponse:
          "Dans une conversation, oui — et c'est pour ça que le réflexe tient. Sur "
          + "une copie, non : « 2,7 » peut être 2,7 g, 2,7 cm³ ou 2,7 g/cm³, trois "
          + "réponses différentes à trois questions différentes, et une seule est la "
          + "bonne. Ce n'est pas une exigence de forme : l'unité est le seul endroit "
          + "où tu dis **de quoi** tu parles.",
      },
      {
        id: 'j-ai-repondu-dans-une-autre-unite',
        texte: "J'ai répondu en kg/m³ alors qu'on demandait des g/cm³",
        reponse:
          "Alors tu as répondu **juste**, et ce n'est pas compté comme une erreur. "
          + "kg/m³ et g/cm³ sont la même grandeur écrite autrement : ta réponse est "
          + "acceptée, elle compte comme une réussite, et on te signale simplement "
          + "l'unité demandée pour que tu le saches. Il n'y a que trois questions dans "
          + "toute l'année où l'unité est imposée, parce que la conversion y est le "
          + "travail lui-même — et dans ces trois cas, la question le dit.",
      },
      {
        id: 'mon-unite-n-a-pas-ete-reconnue',
        texte: "J'ai écrit une unité et on me l'a redemandée",
        reponse:
          "Ce n'est ni juste ni faux, et ça ne t'a coûté aucun essai : je n'ai "
          + "simplement pas su lire ce que tu as tapé. Beaucoup d'écritures passent — "
          + "`g/cm3` sans le petit 3, la virgule ou le point, les espaces des "
          + "milliers — mais pas toutes. Réécris-la avec les symboles du cours, et "
          + "rien n'est perdu.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          "Reprenons par l'unité seule, sans toucher aux nombres : quelles unités "
          + "avais-tu au départ, et quelle opération as-tu faite entre elles ?",
      },
    ],

    constats: [
      {
        id: 'trois-copies-un-meme-calcul',
        contexteDeSurface:
          "trois copies rendues pour la même question de masse volumique d'un galet — "
          + "« 2,7 », « 2,7 g » et « 2 700 kg/m³ »",
        predictionEngagee:
          "Verrouille ton classement avant la correction : range ces trois réponses "
          + "de la plus juste à la plus fausse.",
        resultat:
          "La correction ne les range pas dans cet ordre-là. « 2 700 kg/m³ » est "
          + "**juste** — même grandeur, autre écriture, acceptée. « 2,7 g » est "
          + "**faux**, et pas d'un peu : c'est une masse, pas une masse volumique. "
          + "« 2,7 » ne dit aucune valeur.",
        conflit:
          "Presque tout le monde met « 2 700 kg/m³ » en dernier, parce que ce n'était "
          + "pas ce qu'on demandait, et « 2,7 g » en deuxième, parce que le nombre est "
          + "le bon. C'est exactement l'inverse. Le nombre juste avec la mauvaise "
          + "nature ne vaut rien ; la bonne grandeur dans une autre écriture vaut "
          + "tout. Ce qui compte n'est donc pas le chiffre que tu as trouvé : c'est "
          + "**de quoi** tu as dit qu'il était la mesure.",
      },
      {
        id: 'l-unite-calculee-avant-le-nombre',
        contexteDeSurface:
          "un trajet donné en kilomètres et une durée donnée en minutes, la vitesse à "
          + "trouver, et **aucun nombre affiché** — seulement les unités",
        predictionEngagee:
          "Verrouille ta prédiction avant qu'on te montre les valeurs : en faisant "
          + "l'opération sur les unités seules, qu'obtiens-tu ? (des km / des min / "
          + "des km/h / des km/min)",
        resultat:
          "Des **km/min**. Et c'est cette unité-là, pas les nombres, qui dit qu'il "
          + "fallait convertir la durée avant de diviser.",
        conflit:
          "Presque tout le monde répond « des km/h », parce que c'est l'unité d'une "
          + "vitesse — et c'est vrai, une vitesse s'exprime en km/h. Sauf que ce n'est "
          + "pas ce que le calcul a produit : le calcul a produit ce que les données "
          + "portaient. L'unité n'était donc pas décidée d'avance par le mot "
          + "« vitesse » : elle est **sortie de l'opération**, et elle t'a prévenu "
          + "d'une conversion oubliée avant même que tu aies touché à un nombre.",
      },
    ],
  },

  // ── La valeur invraisemblable non critiquée ──────────────────────────────
  //
  // ÉPREUVE DE RÉFUTATION. Réponse fausse typique : on affiche « d'après ce
  // calcul, un litre d'eau a une masse de 2,7 kg » et l'élève répond « possible »
  // ou passe à la question suivante sans rien dire.
  //
  //   · La `regle` mord : elle dit qu'un résultat n'est pas vrai parce qu'il
  //     sort d'un calcul, et elle rend à l'élève les repères qu'il possède déjà.
  //     Appliquée à la bouteille, elle contredit.
  //   · Le `controle` mord par un geste : chercher un objet connu de la même
  //     grandeur. Une bouteille d'un litre se soulève d'une main ; elle ne pèse
  //     pas comme un cartable plein.
  //
  // RÉÉCRITURE APRÈS RELECTURE, et il faut la dire. La première version de la
  // règle s'arrêtait à « un résultat qui te surprend est probablement faux ».
  // Elle validait alors l'erreur SYMÉTRIQUE, qui est celle que ce piège risque
  // de fabriquer : l'élève qui, ayant compris qu'il faut critiquer, se met à
  // rejeter toute valeur inhabituelle — et la physique en est pleine. Une règle
  // qui ne couvre qu'un sens de l'erreur ne réfute que la moitié des élèves. La
  // règle dit donc les deux sens, et le second est ce qui la rend utilisable :
  // **ce qui déclenche la reprise n'est pas l'étonnement, c'est un repère qu'on
  // peut nommer et qui contredit.**

  'valeur-invraisemblable-non-critiquee': {
    id: 'valeur-invraisemblable-non-critiquee',
    conception:
      "Le résultat d'un calcul correctement mené est vrai par construction : il n'y "
      + "a rien à en penser, et le monde décrit n'a pas son mot à dire. La "
      + "calculatrice ou la formule répond, l'élève transcrit. L'ordre de grandeur "
      + "des choses réelles est un savoir de la vie courante, sans statut dans un "
      + "exercice — et le convoquer serait même suspect, puisque ce n'est pas une "
      + "donnée de l'énoncé.",
    enonceEleve:
      "J'ai appliqué la formule et ça donne ça. Un litre d'eau qui pèse comme un "
      + "cartable, pourquoi pas — c'est ce que le calcul a dit.",

    // Rang 3, non-documente. `didactique.md` ne porte rien sur la critique de
    // vraisemblance ; § 9 range le contrat didactique cinquième par centralité
    // sans le chiffrer. Le seul appui français est institutionnel et non
    // dépouillé : les situations CEDRE 2.13 (« Vérifier le respect des données
    // scientifiques dans une représentation du système solaire ») et 2.12
    // (« Interroger la fiabilité d'une source d'information »), § 10. C'est la
    // condition de révision, et le dossier DEPP donne la répartition des erreurs
    // par distracteur — donc de quoi typer, pas seulement de quoi classer.
    rang: 3,
    fiabilite: 'non-documente',

    // `physique`, et la frontière est tenue par le prédicat plutôt que par une
    // déclaration. Quand l'échec porte sur la PUISSANCE DE DIX elle-même — un
    // facteur mille perdu dans une notation scientifique —, ce n'est pas ce
    // piège, c'est un geste mathématique, et il relève du chapitre 6 de
    // `maths-4e`. Le champ `origine` ne peut pas porter deux valeurs ; le partage
    // se fait donc sur `recalculNecessaire`, qui doit être FAUX ici. Si l'élève
    // doit refaire le calcul pour trancher, on ne mesure plus sa vraisemblance,
    // on mesure son calcul.
    origine: 'physique',
    chapitreOrigine: 'ch04-masse-volumique',

    // Chapitre 4 comme le piège précédent : c'est la première grandeur composée
    // de l'année, donc le premier endroit où une valeur peut être franchement
    // impossible sans être visiblement fausse. `charte.md` en fait d'ailleurs
    // l'exemple canonique de son rituel de contrôle — « un litre d'eau qui pèse
    // 2,7 kg, c'est possible ? ».
    //
    // Nettement plus lent que `unite-absente-ou-fausse` (11), qui part du même
    // chapitre, et pour la même raison qu'ailleurs : deux pièges d'un même
    // chapitre qui retombent ensemble font reconnaître le motif.
    rythmeInitial: 13,

    formatDiagnostique: {
      modeDeReponse:
        "item de CRITIQUE : la valeur est fournie, l'élève doit dire si elle est "
        + "possible AVANT tout recalcul, et **rien n'annonce qu'il y a une erreur**",
      contexteImpose:
        "une part substantielle des valeurs servies est CORRECTE",
      pourquoi:
        "Sinon « on me la montre, donc elle est fausse » remplace un contrat par un "
        + "autre, et l'élève réussit sans plus rien critiquer.",
    },

    conditionValidite: {
      situation:
        '{ erreurAnnoncee: boolean, facteurDEcart: number | null, '
        + 'recalculNecessaire: boolean, bandeDOrdreDeGrandeur: [number, number] | null }',
      predicat: (s) => {
        if (s?.erreurAnnoncee !== false) return false;
        if (s.recalculNecessaire !== false) return false;
        if (!Array.isArray(s.bandeDOrdreDeGrandeur)) return false;
        // `facteurDEcart: null` = la valeur servie est JUSTE, cas obligatoire du
        // vivier. Sinon l'écart doit être franc DANS LES DEUX SENS : un facteur
        // dix en trop (`>= 10`) comme un facteur dix en moins (`<= 0,1`). La
        // première rédaction ne testait que `>= 10` et rejetait donc tout item
        // bâti sur une valeur trop PETITE — « un litre d'eau pèse 1 g » —, qui
        // est pourtant la moitié de ce que ce piège doit servir.
        if (s.facteurDEcart === null) return true;
        const f = Math.abs(s.facteurDEcart);
        return f >= 10 || (f > 0 && f <= 0.1);
      },
      pourquoi:
        "Quatre exigences. (1) Rien ne doit annoncer l'erreur : « trouve l'erreur » "
        + "transforme la critique en chasse, et l'élève qui ne critique jamais y "
        + "réussit très bien. (2) Le verdict doit être atteignable SANS recalcul, "
        + "sinon on mesure le calcul et non la vraisemblance — et l'échec, alors, "
        + "serait à imputer ailleurs. (3) La bande d'ordre de grandeur doit être "
        + "tabulée et sourcée : c'est ce qui rend l'item mécaniquement vérifiable "
        + "(classe A′) au lieu de reposer sur le jugement de l'auteur. (4) L'écart "
        + "doit être FRANC — un facteur dix au moins. Un écart de quelques pour cent "
        + "n'est pas critiquable sans recalcul, et bâtir un item dessus "
        + "apprendrait à rejeter des valeurs correctes. **Franc dans les deux "
        + "sens** : dix fois trop grand comme dix fois trop petit. Le prédicat ne "
        + "lisait d'abord que le premier, ce qui rendait mécaniquement "
        + "inconstruisibles les items d'écrasement — le litre d'eau à un gramme, la "
        + "salle de classe de trois centimètres — alors que ce sont ceux où "
        + "l'élève a le plus de repères. Enfin `facteurDEcart: null` "
        + "est le cas des valeurs JUSTES, et il est obligatoire dans le vivier : une "
        + "série où tout ce qu'on montre est faux enseigne exactement le contrat "
        + "qu'on prétend défaire.",
    },

    regle:
      "Un calcul mené correctement peut donner un résultat impossible : il suffit "
      + "d'une virgule, d'une unité oubliée, d'une donnée lue sur la mauvaise ligne. "
      + "**Un résultat n'est pas vrai parce qu'il sort d'un calcul — il est vrai s'il "
      + "tient debout dans le monde qu'on décrit.** Et tu as en tête bien plus de "
      + "repères que tu ne crois : ce que pèse une bouteille d'eau qu'on soulève "
      + "d'une main, la vitesse à laquelle on descend une côte à vélo, la taille "
      + "d'une salle de classe. Ce sont eux qui tranchent, et ils tranchent avant la "
      + "calculatrice. **Mais l'inverse n'est pas permis non plus** : un résultat qui "
      + "surprend n'est pas fautif pour autant, et la physique est pleine de nombres "
      + "déroutants qui sont exacts. Ce qui déclenche la reprise n'est jamais "
      + "l'étonnement tout seul — c'est **un repère que tu peux nommer** et qui dit "
      + "le contraire.",

    controle:
      "Avant d'écrire ta réponse, cherche **un objet que tu connais** de la même "
      + "grandeur, et compare-lui. Un litre d'eau, c'est la petite bouteille : elle "
      + "se soulève d'une main, elle ne pèse pas comme un cartable plein de livres. "
      + "Un pas, c'est à peu près un mètre. Une salle de classe fait quelques mètres "
      + "de côté. Si ton repère et ton résultat ne peuvent pas être vrais ensemble, "
      + "**écris-le** : « ce résultat me paraît trop grand, une bouteille d'un litre "
      + "ne pèse pas ça » vaut des points et vaut mieux qu'un chiffre auquel tu ne "
      + "crois pas. **Et regarde aussi vers le bas** : trop petit est aussi "
      + "impossible que trop grand, et c'est plus difficile à voir — une bouteille "
      + "d'eau qui pèserait un gramme, une salle de classe de trois centimètres, "
      + "personne ne les remarque parce qu'un petit nombre n'a l'air de rien. Enfin, "
      + "si tu ne trouves aucun repère, dis-le aussi — **« je ne peux "
      + "pas juger » est une réponse**, et c'est la bonne quand c'est vrai.",

    raisonnements: [
      {
        id: 'la-formule-a-repondu',
        texte: "J'ai appliqué la formule, c'est le résultat qu'elle donne",
        reponse:
          "Et appliquer la formule était le bon geste, il est même juste ici — c'est "
          + "l'essentiel du travail. Ce que la formule ne fait pas, c'est relire "
          + "l'énoncé à ta place : elle ne sait pas si tu as pris les grammes pour des "
          + "kilogrammes, ni si le volume était en litres. Elle calcule ce que tu lui "
          + "donnes, très exactement, y compris quand ce n'est pas ce que tu voulais "
          + "lui donner.",
      },
      {
        id: 'en-physique-tout-est-possible',
        texte: "En physique il y a plein de nombres bizarres, celui-là aussi peut-être",
        reponse:
          "C'est vrai, et c'est même une des choses qui rendent la matière "
          + "intéressante : la vitesse de la lumière, la distance des étoiles, la "
          + "taille d'un atome sont toutes déroutantes et toutes exactes. C'est "
          + "précisément pour ça qu'on ne juge pas au feeling. On juge sur un repère "
          + "qu'on peut **nommer** : ici, une bouteille d'eau que tu as soulevée mille "
          + "fois. Si tu n'as pas de repère, on ne critique pas — et c'est une "
          + "position parfaitement honnête.",
      },
      {
        id: 'je-n-avais-aucun-repere',
        texte: "Je ne savais pas à quoi comparer",
        reponse:
          "C'est une réponse honnête, et elle vaut infiniment mieux que d'inventer un "
          + "avis. Tu en as pourtant quelques-uns sans le savoir, et trois suffisent "
          + "presque partout : une bouteille d'eau d'un litre se soulève d'une main ; "
          + "un pas fait à peu près un mètre ; on marche beaucoup plus lentement qu'on "
          + "ne roule à vélo, et bien plus lentement encore qu'une voiture en ville. "
          + "Ce sont des repères de **comparaison**, pas des valeurs à retenir.",
      },
      {
        id: 'j-avais-un-doute-mais-je-n-ai-rien-dit',
        texte: "Ça me paraissait bizarre mais je n'ai rien écrit",
        reponse:
          "Alors tu avais déjà fait la moitié du travail, et la moitié la plus "
          + "difficile. Ce qui manquait n'est pas le raisonnement, c'est le courage de "
          + "l'écrire — et il n'y a rien à risquer : dire « ce résultat me paraît trop "
          + "grand » est valorisé partout, au brevet comme dans un compte rendu. Un "
          + "doute écrit vaut des points ; un doute gardé pour soi vaut zéro.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          "Reprenons par un objet que tu connais : une bouteille d'eau d'un litre, "
          + "est-ce que tu la soulèves d'une main, ou est-ce que c'est lourd comme un "
          + "cartable plein ?",
      },
    ],

    constats: [
      {
        id: 'la-bouteille-sur-la-balance',
        contexteDeSurface:
          "une bouteille d'un litre d'eau posée sur une balance de cuisine, à côté "
          + "d'un paquet de sucre et d'un cartable rempli",
        predictionEngagee:
          "Verrouille ta prédiction avant l'affichage de la balance : la bouteille "
          + "pèsera-t-elle à peu près comme le paquet de sucre, comme le cartable, ou "
          + "entre les deux ?",
        resultat:
          "Comme le paquet de sucre, à très peu de chose près. Les trois affichages "
          + "sont montrés l'un après l'autre.",
        conflit:
          "Le résultat que tu avais laissé passer sans rien dire mettait ce litre "
          + "d'eau du côté du cartable. Tu n'avais pas besoin de savoir la valeur pour "
          + "le refuser : il te suffisait de te souvenir de ce que tu portes dans un "
          + "sac de courses. Le repère était déjà là ; c'est de le convoquer qui ne "
          + "l'était pas.",
      },
      {
        id: 'la-vitesse-du-velo',
        contexteDeSurface:
          "un calcul de vitesse pour un élève rentrant du collège à vélo, dont le "
          + "résultat est affiché sans commentaire",
        predictionEngagee:
          "Verrouille ton classement avant l'affichage : qui va le plus vite — toi à "
          + "vélo en descente, un coureur du Tour de France en contre-la-montre, ou "
          + "une voiture en ville ?",
        resultat:
          "Le classement s'affiche, puis le résultat du calcul vient se placer "
          + "dedans : **au-dessus des trois**, coureur du Tour compris.",
        conflit:
          "Un élève qui rentre du collège ne dépasse pas un coureur professionnel en "
          + "contre-la-montre, et tu le savais avant de faire le moindre calcul. "
          + "L'erreur venait d'une durée laissée en minutes là où il fallait des "
          + "heures — mais remarque bien que tu n'as pas eu besoin de le savoir pour "
          + "dire que quelque chose n'allait pas. **Critiquer vient avant de "
          + "corriger**, et ça ne coûte que quelques secondes.",
      },
    ],
  },

  // ── La valeur aberrante d'une série non repérée ──────────────────────────
  //
  // ÉPREUVE DE RÉFUTATION. Réponse fausse typique : six pesées d'un même galet
  // dont l'une, faite sans avoir remis la balance à zéro, sort franchement du
  // lot ; l'élève fait la moyenne des six et rend un résultat que la mesure
  // fautive a tiré à elle.
  //
  //   · La `regle` mord : elle dit qu'une mesure hors du lot n'est pas une
  //     donnée comme les autres et qu'on ne la fond pas dans la moyenne.
  //   · Le `controle` mord par un geste exécutable à la main : ranger les
  //     mesures dans l'ordre et regarder les ÉCARTS entre voisines. Sur cette
  //     série, un écart est bien plus grand que les autres, et il désigne la
  //     mesure sans qu'on ait rien à calculer.
  //
  // RÉÉCRITURE APRÈS RELECTURE. La première version disait « écarte la mesure
  // qui ne va pas avec les autres » — et elle autorisait exactement le geste que
  // ce piège doit interdire par son autre bout : jeter une mesure parce qu'elle
  // dérange. Un élève à qui l'on apprend à écarter apprend aussi à écarter ce
  // qui gêne, et c'est plus grave que de tout garder. La règle dit donc les deux
  // sens, et le contrôle est fondé sur l'écart entre voisines — un critère qui
  // se calcule, et non sur « ce qui ne va pas avec les autres », qui s'invoque.

  'valeur-aberrante-d-une-serie-non-reperee': {
    id: 'valeur-aberrante-d-une-serie-non-reperee',
    conception:
      "Toutes les mesures écrites dans un tableau se valent : elles ont été faites, "
      + "donc elles sont des données, donc on les traite en bloc — moyenne, tracé, "
      + "conclusion. Se demander si l'une d'elles est fautive n'est pas une tâche "
      + "prévue, et l'écarter serait même malhonnête, puisqu'on n'a pas le droit de "
      + "toucher aux mesures.",
    enonceEleve:
      "Il y a six mesures dans le tableau, donc je fais la moyenne des six. On n'a "
      + "pas le droit d'en enlever une, ce serait tricher.",

    // Rang 3, non-documente. `didactique.md` ne porte rien sur le repérage d'une
    // mesure aberrante. L'ancrage est côté programme : `charte.md` reformule le
    // savoir-faire 5 du chapitre 1 en « Exploiter une série de mesures pour
    // estimer une solubilité, ET dire pourquoi une seule mesure ne suffit pas »,
    // et le cercle 2 porte « pourquoi dix mesures et pas une ? ». Condition de
    // révision : la situation CEDRE 2.8 (« Lire et analyser les données d'un
    // graphique »), transversale et non dépouillée.
    rang: 3,
    fiabilite: 'non-documente',
    origine: 'physique',

    // Chapitre 1 : c'est le premier de l'année à porter une série de mesures
    // répétées, et le savoir-faire reformulé de la charte l'y installe
    // explicitement. DOUZE chapitres après lui, dont huit de noyau — c'est le
    // meilleur départ de file de tout le fichier.
    chapitreOrigine: 'ch01-melanges-et-solubilite',

    // Lent, et assumé : le geste est étroit (une série de mesures répétées, ce
    // qui n'arrive pas dans tous les chapitres) et le vivier d'items est
    // naturellement mince. Un rythme court produirait des re-confrontations sur
    // les mêmes trois décors, c'est-à-dire un test de mémoire.
    rythmeInitial: 14,

    formatDiagnostique: {
      modeDeReponse:
        "tableau ou nuage de points servi SANS aucune consigne de repérage : la "
        + "question porte sur une exploitation — faire une moyenne, tracer, conclure "
        + "— et jamais sur « repère l'erreur »",
      contexteImpose:
        "une série de mesures répétées ; une part substantielle des séries servies "
        + "ne contient AUCUNE mesure aberrante",
      pourquoi: null,
    },

    conditionValidite: {
      situation:
        '{ serie: number[], repereeParLEnonce: boolean, '
        + "aberrante: { index: number, facteur: number } | null, "
        + "tacheDemandee: 'exploiter' | 'reperer' }",
      predicat: (s) => {
        if (s?.repereeParLEnonce !== false) return false;
        if (s.tacheDemandee !== 'exploiter') return false;
        if (!Array.isArray(s.serie) || s.serie.length < 5) return false;
        // `aberrante: null` = série propre, cas obligatoire du vivier. Sinon
        // l'écart doit être franc DANS LES DEUX SENS : deux fois trop haut
        // (`>= 2`) comme deux fois trop bas (`<= 0,5`). La première rédaction ne
        // testait que `>= 2`, ce qui interdisait la moitié basse — or la panne de
        // mesure la plus banale, la balance qui n'a pas été remise à zéro sur le
        // support, produit précisément une valeur trop FAIBLE.
        if (s.aberrante === null) return true;
        const f = Math.abs(s.aberrante.facteur);
        return f >= 2 || (f > 0 && f <= 0.5);
      },
      pourquoi:
        "Quatre exigences. (1) Rien ne doit annoncer l'anomalie : demander « quelle "
        + "mesure est aberrante ? » nomme la tâche, et l'élève qui ne regarde jamais "
        + "ses séries y réussit parfaitement. (2) La tâche demandée doit être une "
        + "EXPLOITATION — c'est le seul contexte où ne pas regarder coûte quelque "
        + "chose. (3) Cinq mesures au minimum : sur trois, on ne peut pas dire "
        + "laquelle sort du lot, et un item construit là-dessus n'aurait pas de "
        + "réponse défendable. (4) L'écart doit être FRANC, et **dans les deux "
        + "sens** : deux fois trop haut comme deux fois trop bas — la balance "
        + "restée tarée sur un support pèse en MOINS, et c'est la panne la plus "
        + "banale de toutes. Une mesure à quelques pour "
        + "cent des autres n'est pas aberrante, elle est **normale** — c'est même "
        + "pourquoi on fait plusieurs mesures —, et un item bâti sur elle "
        + "apprendrait à jeter les données qui dérangent. Enfin `aberrante: null`, "
        + "les séries propres, est obligatoire dans le vivier : « il y en a toujours "
        + "une à jeter » est un contrat didactique, pas un contrôle, et ce serait "
        + "exactement celui que ce piège prétend défaire.",
    },

    regle:
      "Une mesure qui sort **franchement** du lot n'est pas une donnée comme les "
      + "autres : c'est le signe qu'il s'est passé quelque chose pendant cette "
      + "mesure-là — une balance non remise à zéro, une virgule, une lecture prise "
      + "de travers. On la **signale**, on dit ce qui a pu se passer, et on calcule "
      + "sans elle **en l'écrivant**. La fondre dans la moyenne, ce n'est pas être "
      + "prudent : c'est laisser une mesure fautive décider du résultat à elle seule. "
      + "**Et l'inverse est interdit tout autant** : on n'écarte jamais une mesure "
      + "parce qu'elle est gênante. Une valeur un peu au-dessus ou un peu en dessous "
      + "des autres est **normale**, et c'est précisément pour ça qu'on en fait "
      + "plusieurs. Ce qui autorise à mettre une mesure de côté, c'est qu'elle soit "
      + "**hors du lot**, jamais qu'elle soit la moins commode.",

    controle:
      "Avant de calculer quoi que ce soit, **range les mesures dans l'ordre** et "
      + "regarde les **écarts entre voisines**, pas les valeurs. Si tous les écarts "
      + "se ressemblent, garde tout : la série est saine, et c'est le cas le plus "
      + "fréquent. Si l'un des écarts est bien plus grand que tous les autres, la "
      + "mesure qui se trouve de l'autre côté est à part. Alors trois gestes, dans "
      + "cet ordre : tu l'**écris quand même**, tu dis **ce qui a pu se passer**, et "
      + "tu calcules **sans elle en le précisant**. Ce n'est pas une entorse à "
      + "l'honnêteté — c'est exactement ce qu'on attend dans un compte rendu.",

    raisonnements: [
      {
        id: 'on-n-a-pas-le-droit-d-enlever-une-mesure',
        texte: "On n'a pas le droit d'enlever une mesure, ce serait tricher",
        reponse:
          "C'est une règle d'honnêteté, elle est excellente, et beaucoup de gens "
          + "feraient bien de l'avoir : supprimer en silence les mesures qui dérangent "
          + "est exactement ce qu'on reproche à une expérience truquée. Seulement "
          + "**signaler n'est pas supprimer**. Tu écris la mesure, tu dis qu'elle est à "
          + "part, tu dis pourquoi, et tu donnes les deux résultats si tu veux. C'est "
          + "le contraire d'un truquage : c'est ce qu'un compte rendu doit contenir.",
      },
      {
        id: 'la-moyenne-absorbe-tout',
        texte: "La moyenne rattrape les écarts, c'est fait pour ça",
        reponse:
          "Et c'est vrai pour les petits écarts — c'est même toute l'utilité de faire "
          + "plusieurs mesures plutôt qu'une, et tu as compris l'essentiel. Une mesure "
          + "très loin des autres, elle, ne se lisse pas : elle est seule à tirer, et "
          + "elle tire fort. Sur six mesures, une seule très éloignée peut déplacer la "
          + "moyenne plus que les cinq autres réunies.",
      },
      {
        id: 'toutes-les-mesures-se-valent',
        texte: "Elles ont toutes été faites pareil, je n'ai pas de raison d'en préférer une",
        reponse:
          "Exact, et c'est bien pour ça qu'on ne choisit pas selon ce qui nous "
          + "arrange. Ce n'est pas la **valeur** qui décide, c'est l'**écart** : "
          + "range-les dans l'ordre et regarde les distances entre voisines. Ce "
          + "critère-là ne dépend pas de ce que tu attendais comme résultat — et c'est "
          + "précisément ce qui le rend utilisable.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          "Reprenons doucement : range les six mesures de la plus petite à la plus "
          + "grande, et regarde s'il y a un trou plus grand que les autres.",
      },
    ],

    constats: [
      {
        id: 'la-moyenne-avec-et-sans',
        contexteDeSurface:
          "six pesées du même galet, dont une faite sans avoir remis la balance à "
          + "zéro — le tableau des six est affiché, rien n'est signalé",
        predictionEngagee:
          "Verrouille ta prédiction avant l'affichage : si on met de côté la mesure "
          + "qui sort du lot, de combien la moyenne va-t-elle bouger ? (presque pas / "
          + "un peu / beaucoup)",
        resultat:
          "Les deux moyennes s'affichent côte à côte, avec l'écart entre elles.",
        conflit:
          "Une seule mesure sur six a déplacé le résultat plus que tu ne l'attendais. "
          + "C'est la propriété de la moyenne qu'on oublie : elle lisse les petits "
          + "écarts, elle **transporte** les gros. Garder cette mesure n'était donc "
          + "pas neutre — c'était choisir de laisser une balance mal réglée répondre à "
          + "ta place.",
      },
      {
        id: 'le-point-qui-tord-la-courbe',
        contexteDeSurface:
          "une courbe de solubilité en fonction de la température, sept points "
          + "reportés, dont un lu sur la mauvaise graduation",
        predictionEngagee:
          "Verrouille ta prédiction avant le tracé : la courbe passera-t-elle "
          + "joliment par les six autres points, ou sera-t-elle tirée vers celui qui "
          + "est à côté ?",
        resultat:
          "Les deux tracés sont superposés — celui qui prend les sept points et celui "
          + "qui en prend six.",
        conflit:
          "Ici tu n'as même pas eu besoin de calculer : le point à part se **voit**, "
          + "et c'est ce que le graphique fait de mieux. Retiens le décor autant que "
          + "le résultat — devant un tableau de chiffres, range et regarde les écarts ; "
          + "devant un nuage de points, regarde-le simplement. Le geste est le même, "
          + "l'œil fait juste une partie du travail à ta place.",
      },
    ],
  },

  // ── Les données superflues et les questions sans réponse ─────────────────
  //
  // ÉPREUVE DE RÉFUTATION, sur les deux réponses fausses typiques, qui sont les
  // deux faces d'un même modèle.
  //
  //   1. Superflu. Un dossier donne la distance, la durée et la masse du
  //      coureur ; on demande la vitesse. L'élève, gêné qu'un nombre reste
  //      inutilisé, le fait entrer dans le calcul.
  //      · La `regle` mord : elle dit qu'une donnée peut être là pour rien, et
  //        que c'est la forme normale d'un dossier documentaire.
  //      · Le `controle` mord : partir de ce qu'on demande, écrire les grandeurs
  //        nécessaires, et aller les chercher — la masse n'apparaît sur aucune
  //        ligne de la liste.
  //   2. Indécidable. Le dossier donne la distance et l'heure de départ, pas
  //      l'heure d'arrivée ; on demande la vitesse. L'élève produit un nombre.
  //      · La `regle` mord : la bonne réponse est de dire **laquelle** grandeur
  //        manque, pas d'en fabriquer une.
  //      · Le `controle` mord : la liste des grandeurs nécessaires contient une
  //        ligne qui reste vide, et c'est elle qu'on écrit.
  //
  // Et la branche inverse, sans laquelle ce piège fabriquerait sa propre erreur
  // symétrique : l'élève qui, ayant compris qu'il y a du superflu, décrète
  // inutile toute donnée dont il ne voit pas l'emploi — alors que c'est parfois
  // son chemin qui est incomplet. La règle porte cette branche explicitement, et
  // le contrôle en fait un geste (« demande-toi si elle manque à ta liste »).
  //
  // POURQUOI UN SEUL PIÈGE POUR DEUX ENTRÉES DU CATALOGUE : c'est une seule
  // conception prise par ses deux bouts — *l'énoncé est calibré, on m'a donné ce
  // qu'il faut et rien d'autre*. Séparées, les deux auraient porté la même
  // règle, le même contrôle et le même geste, donc deux re-confrontations
  // identiques sous deux noms.

  'donnees-superflues-et-questions-sans-reponse': {
    id: 'donnees-superflues-et-questions-sans-reponse',
    conception:
      "Un énoncé scolaire est calibré : toutes les données qu'il porte servent, et "
      + "toute question qu'il pose a une réponse calculable. Deux conséquences que "
      + "l'élève tire, et qui sont exactes dans un cahier d'entraînement : si une "
      + "donnée reste inutilisée, c'est que je m'y suis mal pris ; et si je n'arrive "
      + "pas à répondre, c'est que je n'ai pas trouvé le bon calcul — jamais que la "
      + "réponse n'existe pas.",
    enonceEleve:
      "Il restait un nombre dont je ne m'étais pas servi, alors je l'ai mis dans le "
      + "calcul. Et de toute façon il fallait bien répondre quelque chose.",

    // Rang 3, non-documente. `didactique.md` ne porte rien là-dessus : ni
    // chiffre, ni typologie, ni marqueur. Le phénomène est décrit ailleurs, en
    // didactique des mathématiques, mais ce dossier ne le porte pas — et une
    // source qui n'est pas dans le corpus n'en devient pas une parce qu'on la
    // connaît. Ce qui l'installe ici, c'est `charte.md`, qui le range dans le
    // catalogue au titre du contrat didactique. Condition de révision : les
    // situations CEDRE 2.12 (« Interroger la fiabilité d'une source
    // d'information ») et 2.3 (« Mesurer une masse de sucre en prenant en compte
    // la masse de la tasse » — une donnée superflue au sens strict), § 10, non
    // dépouillées.
    rang: 3,
    fiabilite: 'non-documente',

    // `physique`, et sans hésitation : l'échec ne porte sur aucun geste
    // mathématique. L'élève qui multiplie par la masse du coureur sait
    // parfaitement multiplier. Aucun renvoi vers `maths-4e` n'aurait de sens
    // ici, et en poser un enverrait l'élève réviser ce qu'il maîtrise.
    origine: 'physique',

    // Chapitre 8 : c'est là que le trio distance / durée / vitesse offre
    // naturellement les deux cas — une donnée de trop, et une grandeur qui
    // manque — sur des énoncés courts que l'élève lit en entier. CINQ chapitres
    // après lui, mais **un seul de noyau** (le 9), les quatre autres étant [F] :
    // c'est le départ de file le plus étroit du fichier. Il suffit pour un
    // rang 3, dont `charte.md` ne programme aucune re-confrontation ; il
    // deviendrait tendu si le rang montait, et c'est à ce moment-là qu'il
    // faudrait redescendre le départ vers le chapitre 4, où le trio existe déjà
    // sous la forme masse / volume / masse volumique.
    chapitreOrigine: 'ch08-mouvement-et-vitesse',

    // Le plus lent du fichier. Le dispositif exige un dossier documentaire
    // complet — plusieurs documents, plusieurs questions —, donc un item lourd
    // au sens du budget de séance (`charte.md` : deux à trois minutes). On ne le
    // ressert pas souvent, on le ressert bien.
    rythmeInitial: 16,

    formatDiagnostique: {
      modeDeReponse:
        "**L'option « on ne peut pas répondre, il manque… » est disponible à CHAQUE "
        + "question**, y compris aux questions décidables",
      contexteImpose:
        "dossier documentaire au format de l'épreuve — plusieurs documents, questions "
        + "courtes —, chaque question n'utilisant qu'une partie des documents, et "
        + "l'une au moins n'étant pas décidable",
      pourquoi:
        "Offerte seulement là où elle est bonne, sa présence annoncerait la réponse ; "
        + "absente, l'élève ne peut pas la donner et on mesure sa docilité au format.",
    },

    conditionValidite: {
      situation:
        '{ donneesFournies: string[], donneesNecessaires: string[], '
        + 'optionIndecidableDisponible: boolean, questionDecidable: boolean }',
      predicat: (s) => {
        if (s?.optionIndecidableDisponible !== true) return false;
        const fournies = new Set(s.donneesFournies ?? []);
        const necessaires = s.donneesNecessaires ?? [];
        const manquantes = necessaires.filter((g) => !fournies.has(g));
        const superflues = [...fournies].filter((g) => !necessaires.includes(g));
        return s.questionDecidable === true
          ? manquantes.length === 0 && superflues.length >= 1
          : manquantes.length >= 1;
      },
      pourquoi:
        "Trois exigences, dont deux qu'on ne voit pas venir. (1) L'option « on ne "
        + "peut pas répondre » doit être disponible partout, y compris là où elle est "
        + "fausse : servie seulement là où elle est bonne, elle annonce la réponse par "
        + "sa seule présence, et l'item ne mesure plus rien. (2) Un item ne "
        + "discrimine que dans l'un des deux cas exactement — soit il est décidable ET "
        + "porte au moins une donnée superflue, soit il ne l'est pas. Une question "
        + "décidable sans rien de superflu ne teste rien : le modèle de l'élève y "
        + "répond juste. (3) Le prédicat lit les deux listes de grandeurs et les "
        + "compare ; il ne lit aucun drapeau d'auteur, ce qui interdit qu'un item "
        + "déclare porter du superflu sans en porter.",
    },

    regle:
      "Un énoncé n'est pas un sac qu'il faut vider jusqu'au fond. **Une donnée peut "
      + "être là pour rien** — et c'est la forme normale d'un dossier documentaire, "
      + "où les documents servent à tout le sujet et pas à chaque question. Et **une "
      + "question peut être sans réponse** : s'il manque une grandeur, la bonne "
      + "réponse est de dire **laquelle** manque, pas d'en fabriquer une avec ce qui "
      + "traîne. **Attention pourtant à ne pas basculer dans l'autre sens** : qu'une "
      + "donnée te reste sur les bras ne prouve pas qu'elle est inutile — c'est "
      + "peut-être ton chemin qui a sauté une étape. Ce qui tranche, dans les deux "
      + "cas, c'est le même geste : partir de **ce que la question demande** et "
      + "remonter aux grandeurs qu'il faut pour l'obtenir.",

    controle:
      "**Fais la liste à l'envers.** Écris d'abord ce qu'on demande, puis, juste en "
      + "dessous, les grandeurs qu'il faut pour l'obtenir — une par ligne. Va les "
      + "chercher une à une dans les documents, en cochant. À la fin, deux "
      + "vérifications, et elles sont différentes. S'il te reste une grandeur non "
      + "cochée dans les documents : demande-toi si elle manque à ta liste. Si oui, "
      + "et seulement si oui, ton chemin est incomplet ; sinon elle était là pour une "
      + "autre question. S'il reste une ligne **vide dans ta liste** : c'est qu'on ne "
      + "peut pas répondre, et tu l'écris. **« On ne peut pas répondre, il manque la "
      + "durée » est une réponse complète**, et elle est comptée juste quand elle "
      + "l'est.",

    raisonnements: [
      {
        id: 'toutes-les-donnees-doivent-servir',
        texte: "Si le nombre est dans l'énoncé, c'est qu'il doit servir",
        reponse:
          "Dans un exercice d'entraînement, c'est presque toujours vrai — l'auteur a "
          + "mis exactement ce qu'il fallait —, et ce réflexe t'a fait gagner du temps "
          + "pendant des années. Il tombe au moment précis où l'épreuve change de "
          + "forme : un dossier documentaire porte des documents pour l'ensemble du "
          + "sujet. Une donnée qui reste n'est donc pas le signe que tu t'es trompé ; "
          + "c'est le plus souvent le signe qu'elle servira trois questions plus loin.",
      },
      {
        id: 'il-fallait-bien-repondre-quelque-chose',
        texte: "Je ne pouvais pas laisser vide, alors j'ai mis un nombre",
        reponse:
          "Tu as raison de ne pas laisser vide : une case blanche ne rapporte jamais "
          + "rien, c'est une règle solide et elle vaut partout. Mais « on ne peut pas "
          + "répondre, il manque l'heure d'arrivée » **n'est pas une case vide** : "
          + "c'est une réponse, elle est comptée juste quand elle l'est, et elle "
          + "montre que tu as su chercher — ce qu'un nombre inventé, lui, ne montre "
          + "pas.",
      },
      {
        id: 'j-ai-pris-les-deux-derniers-nombres',
        texte: "J'ai pris les nombres qui étaient là et je les ai divisés",
        reponse:
          "C'est une stratégie, et elle marche souvent, parce que les énoncés courts "
          + "sont écrits dans l'ordre du calcul — ce n'est pas de la paresse, c'est "
          + "une régularité que tu as repérée toi-même. Elle ne survit pas à un "
          + "dossier documentaire, où les nombres sont dispersés dans trois documents "
          + "et où l'ordre ne veut plus rien dire. Là, il faut partir de la question, "
          + "pas des nombres.",
      },
      {
        id: 'si-la-question-est-posee-c-est-qu-on-peut-y-repondre',
        texte: "On ne poserait pas la question s'il était impossible d'y répondre",
        reponse:
          "Dans un cahier d'exercices, c'est vrai : quelqu'un a vérifié avant toi. En "
          + "sciences, c'est exactement l'inverse — repérer **ce qui manque** est une "
          + "des compétences les plus recherchées. Un chercheur devant un protocole "
          + "incomplet, un médecin devant une analyse partielle, un technicien devant "
          + "une panne font tous le même geste : dire quelle donnée il faudrait aller "
          + "chercher. C'est ce qu'on te demande ici, et ce n'est pas un piège.",
      },
      {
        id: 'hasard',
        texte: "J'ai répondu au hasard",
        reponse:
          "Reprenons par la question seule : qu'est-ce qu'on te demande de trouver, "
          + "et de quelles grandeurs as-tu besoin pour l'obtenir ? Écris-les avant de "
          + "regarder les documents.",
      },
    ],

    constats: [
      {
        id: 'le-dossier-qui-en-donne-trop',
        contexteDeSurface:
          "un dossier documentaire sur un semi-marathon — trois documents (un texte, "
          + "un tableau de temps de passage, une fiche du coureur) et quatre questions "
          + "courtes",
        predictionEngagee:
          "Verrouille ta prédiction avant la correction : pour répondre à la première "
          + "question, combien des trois documents faut-il utiliser ? (un / deux / les "
          + "trois)",
        resultat:
          "Un seul. Et en regardant les quatre questions ensemble, la fiche du "
          + "coureur ne sert à **aucune** des quatre.",
        conflit:
          "Un document entier était là pour rien, et rien ne le signalait — ce n'est "
          + "pas une maladresse du sujet, c'est sa forme habituelle. Tant que tu pars "
          + "des documents, tu chercheras à tout caser et tu perdras du temps sur "
          + "chaque question. En partant de la question, tu n'aurais ouvert qu'un seul "
          + "document.",
      },
      {
        id: 'la-question-a-laquelle-on-ne-peut-pas-repondre',
        contexteDeSurface:
          "un trajet en train — la distance entre les deux gares et l'heure de départ "
          + "sont données, la vitesse moyenne est demandée",
        predictionEngagee:
          "Verrouille ta réponse avant la correction : peux-tu calculer cette vitesse "
          + "avec ces documents ? (oui / non, il manque quelque chose, et je dis quoi "
          + "/ non, mais je ne vois pas quoi)",
        resultat:
          "Non : il manque l'heure d'arrivée, donc la durée. La correction attend "
          + "précisément cette phrase, et elle la compte juste.",
        conflit:
          "Si tu as donné un nombre, regarde d'où il venait : tu as pris deux "
          + "grandeurs qui étaient là et tu les as mises ensemble. Elles n'avaient "
          + "aucune raison d'aller ensemble — une distance divisée par une heure de "
          + "départ ne veut rien dire. Ce n'est pas un calcul un peu faux, c'est un "
          + "calcul qui ne portait sur rien. Et le décor compte : ici, la grandeur "
          + "manquante n'est même pas une grandeur exotique, c'est la plus banale des "
          + "trois — il suffisait de la chercher dans ta liste.",
      },
    ],
  },
};
