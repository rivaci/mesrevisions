// Pièges — famille « Mouvement et interactions » (thème 2 du cycle 4).
//
// Un piège n'est pas une erreur constatée : c'est une CONCEPTION documentée.
// L'élève qui écrit « au sommet du lancer, la balle n'est soumise à aucune
// force » n'a pas répondu au hasard — il applique un modèle qui prédit
// correctement la quasi-totalité de ce qu'il voit depuis qu'il est né. Le
// catalogue décrit ce modèle, dit d'où on le sait, et dit comment le mettre en
// défaut.
//
// ── Pourquoi ces cinq-là ──────────────────────────────────────────────────
//
// Ce sont les cinq conceptions que `didactique.md` § 4 documente pour la
// mécanique, et les cinq que `charte.md` § « Le catalogue » liste pour cette
// famille. Elles ont une particularité que les autres familles n'ont pas :
// elles reposent sur DEUX ressources institutionnelles françaises lues en
// primaire (Éduscol/DGESCO 2019 « Les conceptions initiales en mécanique »,
// GRIESP 2018 « Réussir en mécanique »), qui citent elles-mêmes les sources
// primaires françaises (Viennot, Saltiel, Closset) et donnent des productions
// d'élèves authentiques. En contrepartie, `didactique.md` § 8 le dit sans
// détour : « peu de pourcentages ». L'ancrage est institutionnel, pas
// statistique. Aucun chiffre DE LA LITTÉRATURE ne figure donc dans ce fichier :
// taux, pourcentages et effectifs restent dans `didactique.md`, conformément à
// la règle de sourçage de la charte. Les valeurs qu'on lit malgré tout ici — un
// rapport de masses de dix, une vitesse de train, une lecture de dynamomètre —
// décrivent un DISPOSITIF et ne sont reprises d'aucune source. La version
// précédente de ce commentaire écrivait « aucun chiffre ne figure dans ce
// fichier », ce qui était faux au premier constat venu.
//
// ── Le rang : ce que § 7 range, et ce qu'il ne range pas ──────────────────
//
// C'est le point à relire en premier.
//
// `didactique.md` § 7 énumère le rang 1 de façon fermée (« Les voici »), sur un
// critère strict : persistance MESURÉE après un enseignement qui la visait
// explicitement. Sur les cinq conceptions de cette famille, § 7 n'en range
// qu'UNE : l'adhérence force-vitesse (③). Les quatre autres ne sont rangées
// nulle part — ni en rang 1, ni en rang 2, ni en rang 3.
//
// ⚠ Une version précédente de ce fichier les portait TOUTES LES CINQ en rang 1.
// L'argument était que le rang 2 est exclu (aucune n'est fabriquée par
// l'enseignement, et le contrôle refuse un rang 2 sans `iatrogene`), que le
// rang 3 l'est aussi (§ 4 les date toutes au-delà de la 4e), qu'il ne reste
// donc que 1, et que l'incertitude serait portée par `fiabilite`. Il avait deux
// défauts, et le second est disqualifiant :
//
//   • il lisait `rang: 3` comme une AFFIRMATION sur l'élève (« cette conception
//     cède à cet âge »). `signaux.js` a tranché le même dilemme dans l'autre
//     sens et en toutes lettres : le rang 3 n'affirme rien : il dit que nous ne
//     dépensons pas sur cette conception le budget de réfutation espacée d'un
//     rang 1 tant qu'aucune donnée de persistance n'existe. Deux fichiers du
//     même catalogue ne peuvent pas donner deux sens au même énuméré fermé ;
//   • il produisait `rang: 1` avec `fiabilite: non-documente` sur deux pièges,
//     ce qui est contradictoire dans les termes. Le rang 1 SE DÉFINIT par une
//     persistance mesurée ; `non-documente` dit qu'il n'existe aucune mesure.
//     La fiabilité ne rattrapait pas le rang, elle le démentait.
//
// Rangs retenus, et ce qui les fonde — deux d'entre eux sont des DÉCISIONS et
// non des lectures du § 7, et ils sont signalés comme tels :
//
//   • `adherence-force-vitesse` — rang 1, reprise littérale (§ 7, entrée ③).
//     `fiabilite: primaire`.
//   • `force-propriete-de-l-objet` — rang 1, décision. § 4.4 documente la
//     persistance APRÈS enseignement et son mécanisme (« la force exercée par X
//     sur Y devient la force de X sur Y, puis la force de X »), sur deux
//     ressources ✔, et § 8 la range dans « solidement établi ». La persistance
//     est décrite, pas chiffrée : `fiabilite: primaire` porte l'appui des
//     sources, pas une mesure.
//   • `troisieme-loi-effets-visibles` — rang 1, décision de même nature. § 4.5
//     est le seul endroit du § 4 qui donne des effectifs — sur des élèves de
//     terminale, donc après des années d'enseignement qui l'ont visée — et
//     Éduscol y ajoute la réponse conforme sans adhésion. ✔.
//   • `action-reservee-au-vivant` — rang 3. § 4.3 : robustesse ○, « pas de
//     pourcentage ».
//   • `mouvement-absolu` — rang 3. § 4.1 : « Chiffres : aucun. ○ », et la
//     conception ne figure pas dans la liste « solidement établi » du § 8.
//
// Les deux rangs 3 N'AFFIRMENT PAS que la conception cède en 4e : personne n'en
// sait rien, et § 4.1 date au contraire le mouvement absolu « du cycle 3 à la
// seconde ». Ils disent que ces deux-là ne consomment pas de créneau de
// re-confrontation tant qu'aucune persistance n'est mesurée. La conséquence est
// chère et elle est écrite : ils sortent de la file annuelle et leurs cinq
// re-confrontations tombent. Leurs dispositifs restent au format exigé d'un
// rang 1 — deux constats de contextes de surface distincts chacun — donc
// relever le rang ne demandera aucune réécriture. Condition de révision : le
// dépouillement du volet CEDRE physique-chimie 2024 (§ 10), ou toute mesure de
// persistance après enseignement ciblé sur l'une des deux.
//
// Ce qu'il ne faut PAS faire, et qu'une version précédente recommandait :
// donner à `rang` une quatrième valeur, « tenace mais persistance non mesurée ».
// `rang` est un énuméré fermé de la charte (invariant 1) et sa définition est
// une reprise littérale du § 7 ; l'élargir ici changerait un contrôle qui refuse
// en un contrôle qui n'a plus rien à refuser.
//
// ── Le budget de rang 1, qui était dépassé et ne l'est plus ────────────────
//
// `charte.md` § « Pourquoi les créneaux 2 et 3 ont été séparés » plafonne le
// catalogue à « au plus dix pièges de rang 1 », pour tenir le budget de
// re-confrontations (cinq par an et par rang 1). Décompte réel, à ce jour :
//
//   • TROIS ici ;
//   • deux ailleurs — `extramission` dans `signaux.js`,
//     `formule-substance-ou-entite` dans `symbolique.js` ;
//   • trois dans `electricite.js` — `courant-qui-s-use`, que `didactique.md`
//     § 7 ④ range explicitement, plus `pile-fabrique-le-courant-...` et
//     `mesurer-en-coupant-le-circuit` ;
//   • un encore à écrire et non négociable, puisque § 7 ② le range
//     explicitement : la conservation de la masse, dans la famille
//     « matière », qui n'existe pas encore.
//
// Soit HUIT écrits, NEUF avec la conservation de la masse : sous le plafond,
// marge de un. Avec les cinq rangs 1 de la version précédente, on était à DIX
// écrits et ONZE obligés — c'est-à-dire au-dessus du plafond, franchi par un
// piège que la charte impose. Le rang des deux `non-documente` n'était donc pas
// seulement contradictoire : il rendait le budget insoluble.
// `tools/tester-pieges.mjs` tient le compte.
//
// ── L'antécédent historique : un seul, et il est ici ───────────────────────
//
// `charte.md` § « Le dialogue après l'erreur » n'autorise la phrase « des
// savants l'ont défendue » que sur un `antecedentHistorique` sourcé, et n'en
// reconnaît que deux dans tout le projet. L'un des deux est dans cette famille :
// le capital force, dont Viennot écrit qu'il est « exactement la théorie
// médiévale de l'impetus ». Il est porté par `adherence-force-vitesse` et par
// lui seul. Servie sur les quatre autres, la phrase fabriquerait de l'histoire
// des sciences.
//
// ── La condition de validité, qui compte plus ici qu'ailleurs ──────────────
//
// C'est la donnée la plus utile que la didactique fournisse sur ce thème, et
// elle vaut pour les cinq, pas seulement pour l'adhérence : un item porteur
// d'une de ces conceptions ne mesure quelque chose QUE si la conception y
// produit une réponse différente de la bonne. Une chute libre simple ne teste
// pas l'adhérence (force et vitesse y sont compatibles) ; deux chariots
// identiques ne testent pas la troisième loi (les effets visibles y sont
// symétriques) ; une main qui pousse ne teste pas « seul un vivant agit » ; une
// question dont la réponse est la même dans les deux référentiels ne teste pas
// le mouvement absolu. `conditionValidite` porte le prédicat, il est calculé sur
// la `situation` — objet formel — et jamais sur un drapeau saisi à la main.
//
// ⚠ ET LE PRÉDICAT DOIT COUVRIR L'ERREUR DANS TOUS SES SENS. Trop étroit, il ne
// se contente pas de laisser passer : il déclare INVALIDES les items qui
// diagnostiquent le mieux, et le dispositif s'invalide lui-même en silence. Deux
// l'ont manqué et sont corrigés. L'adhérence excluait la vitesse non nulle avec
// force nulle — le palet qui glisse alors que plus rien ne le pousse, c'est-à-
// dire la forme directe de « pour qu'un objet avance, il faut qu'il soit
// poussé ». La troisième loi ne connaissait que deux des TROIS sources
// d'asymétrie visible (rapport de masses, objet tenu) et rejetait la troisième —
// « un seul des deux pousse, l'autre se contente de résister » — qui est
// justement celle sur laquelle reposent ses deux dispositifs. Le détail est dans
// chaque `pourquoi`.
//
// ⚠ CORRECTION DE FORME, ET ELLE PORTAIT SUR LE FOND. Ce fichier écrivait
// jusqu'ici `conditionValidite: { champs, predicat: CHAÎNE, enClair }` — le
// prédicat était un texte, par exemple `'vSigne * fSigne <= 0 && …'`. Une chaîne
// ne s'exécute pas : aucun contrôle ne pouvait la faire tourner sur une
// `situation` sans l'évaluer d'abord, c'est-à-dire sans réintroduire exactement
// ce que `charte.md` § « La condition de validité d'un item » refuse — une
// condition DÉCLARÉE là où elle doit être DÉRIVÉE. La forme était donc
// auto-satisfaite : elle avait l'air d'un prédicat et ne refusait rien.
// `signaux.js` l'avait relevé en toutes lettres et proposé la forme qui tient :
// `{ situation, predicat: FONCTION, pourquoi }`, où `situation` type l'objet
// formel et où `predicat` est appelable tel quel. C'est celle-ci désormais, et
// les DEUX familles qui portent une forme d'objet — `signaux.js` et celle-ci —
// portent la même. (Une version précédente de ce commentaire en écrivait trois :
// il n'y en a jamais eu que deux.) Aucun texte de justification n'a été perdu au
// passage : `enClair` est devenu `pourquoi`, à l'identique.
//
// Reste un écart que ce fichier ne peut pas refermer seul : `symbolique.js` et
// `electricite.js` portent une FONCTION NUE, sans type de situation ni motif.
// Deux formes valent mieux que trois, ce n'est pas une raison pour en garder
// deux — à trancher au `piege.schema.json`, et le prédicat exécutable est le
// point commun sur lequel les quatre familles sont maintenant d'accord.
//
// ── Le contre-modèle : « exécuté » est un abus, et il faut l'écrire ────────
//
// `charte.md` § « Le dialogue après l'erreur » dit du modèle erroné qu'il « est
// *exécutable*, donc son verdict n'est pas rédigé à la main », et son exemple
// est quantitatif : deux lectures d'ampèremètre calculées. Ici, `modele` et
// `predictionDuModele` sont de la PROSE : la prédiction du modèle de l'élève a
// été dérivée par l'auteur, à la main, et rien ne la revérifie. Ce fichier
// écrivait pourtant « le modèle exécute » et « il se met en défaut par le
// calcul » — c'est-à-dire exactement le défaut qu'il venait de corriger sur
// `conditionValidite` : une forme qui a l'air d'être exécutée et qui ne
// s'exécute pas. Les deux `contreModele` disent maintenant ce qu'ils font
// vraiment. `signaux.js` avait nommé cet abus le premier, pour ses trois pièges.
// Ce qu'on a réellement, ce sont des contre-modèles RELUS, de classe C, et c'est
// ainsi qu'il faut les compter. L'invariant 11 ne mord pas ici — il ne contraint
// que les distracteurs QUANTITATIFS — mais un invariant qui ne mord pas ne rend
// pas la promesse vraie.
//
// ── Ce que ce fichier ne porte pas, et qu'un contrôle refusera ─────────────
//
// `charte.md` liste `distracteurs` parmi les champs obligatoires d'un piège.
// Aucun des cinq n'en porte : les distracteurs s'écrivent avec les items, et les
// items n'existent pas encore. Manque daté, pas oubli — écrit ici pour que
// l'invariant 1 le trouve, exactement comme `signaux.js` et `symbolique.js` le
// font pour les leurs. Pas d'`iatrogene` non plus, et c'est normal : aucun
// rang 2 dans cette famille.
//
// ── Ce que cette famille NE couvre PAS, et pourquoi ────────────────────────
//
//   • Poids et masse. § 4.6 signale la difficulté comme persistant au lycée,
//     mais avertit que les pourcentages qui circulent (79 %, 48 %) portent sur
//     des étudiants futurs professeurs et sont « inutilisables tels quels ».
//     S'ajoute que `programme.md` place P = m·g en 3e dans six progressions
//     réelles sur sept. Aucun piège écrit : un piège inventé vaut moins que pas
//     de piège.
//   • « Les objets lourds tombent plus vite ». Même motif : ○, chiffres sur
//     étudiants.
//   • Vitesse et accélération comme grandeurs (« kilomètre heure », accélération
//     vécue comme une action et non comme une valeur, § 4.6 ✔). C'est réel, mais
//     ce n'est pas une conception à réfuter : c'est l'algèbre des unités et le
//     lien avec les maths (grandeur quotient, chapitre 5 de `maths-4e`) qui le
//     traitent, avec `origine: 'mathematique'` s'il faut un jour l'écrire.
//   • Le principe d'inertie, l'équilibre formalisé, la gravitation quantitative :
//     hors programme de 4e (`programme.md`, encadrés des Ch. 8 et 10).
//
// ── Deux contraintes que ce fichier impose au reste de l'application ───────
//
//   1. La flèche. § 4.6 (✔, Éduscol 2019) : le même objet graphique pour la
//      vitesse et pour la force RENFORCE l'adhérence. Tout schéma de cette
//      famille doit donc porter un code couleur systématique et une légende
//      obligatoire sur chaque vecteur. Ce n'est pas une préférence esthétique,
//      c'est la contrainte du § 7-6 de `didactique.md` : « un schéma faux coûte
//      plus cher qu'une phrase fausse, parce qu'il n'est pas relu ».
//   2. L'interrupteur — et ce n'est pas « à tester en session simulée » : c'est
//      déjà décidable sur `programme.md`, et ça ne passe pas. Les TROIS rangs 1
//      de cette famille ont pour `chapitreOrigine` le chapitre 10, marqué [F] et
//      `dispute`, donc désactivable par l'élève (« mon prof ne l'a pas fait »).
//      L'invariant 14 exige d'un rang 1 qu'il apparaisse dans au moins DEUX
//      chapitres POSTÉRIEURS à son chapitre d'origine, et qu'il ne disparaisse
//      pas quand l'élève répond « pas encore » à tous les chapitres frontière —
//      profil que `charte.md` déclare et simule nommément. Or après le
//      chapitre 10 il n'existe que trois chapitres — 11 (l'Univers), la loi
//      d'Ohm, le couple poids/pesanteur — et les TROIS sont [F], comme le
//      chapitre 10 lui-même : le dernier chapitre de noyau du plan est le 9.
//      Pour ce profil, ces trois pièges n'ont aucun chapitre actif où être
//      re-confrontés, et le garde-fou (« le moteur tire dans un chapitre
//      actif ») n'a rien où tirer.
//      Ça ne se corrige pas dans ce fichier, et ça ne s'ignore pas non plus. Les
//      deux issues, à arbitrer AVANT la première session simulée : rattacher des
//      items de ces pièges à un chapitre de noyau antérieur — ce que leur contenu
//      rend difficile, puisque les forces sont au 10 et nulle part avant —, ou
//      écrire dans l'invariant 14 une exception nommée pour les familles dont
//      tout le domaine est en frontière. `signaux.js` bute sur le même mur au
//      chapitre 9 ; c'est donc un défaut de plan, pas de famille.
//
// ── L'audit de réfutation, à refaire à chaque relecture ───────────────────
//
// Le défaut le plus grave et le plus discret du projet est une `regle` qui
// VALIDE la réponse fausse qu'elle est censée réfuter. Il ne se voit pas à la
// lecture du piège : il se voit en prenant une réponse fausse typique, en lui
// appliquant la `regle` PUIS le `controle`, et en vérifiant que les deux la
// contredisent. Muets, ils échouent aussi. L'audit des cinq, à rejouer :
//
//   • adhérence — « au sommet, la balle n'est soumise à aucune force ». La
//     règle : la Terre la tire « exactement comme pendant tout le reste du
//     vol ». Le contrôle demande la liste des objets, pas une direction : il
//     rend la Terre. Contredite deux fois.
//   • force-propriété — « la force du poids ». La règle : il faut deux objets,
//     un après « par », un après « sur ». Le contrôle nomme le cas :
//     « si l'un des deux n'est pas un objet mais une grandeur, comme le poids ».
//     Contredite.
//   • action réservée au vivant — « la table n'exerce rien ». La règle : le test
//     n'est ni « est-il vivant ? » ni « bouge-t-il ? ». Le contrôle fait enlever
//     la table par la pensée ; le livre tombe. Contredite.
//   • troisième loi — « la Terre attire la Lune plus fort ». La règle : les deux
//     valeurs sont toujours égales, c'est l'effet qui diffère. Le contrôle
//     attrape le geste exact : « si tu t'es servi d'une masse pour dire laquelle
//     des deux FORCES est la plus grande ». Contredite.
//   • mouvement absolu — « le passager est immobile, point ». Attention, c'est
//     le cas piégeux du lot : la valeur « immobile » n'est pas fausse, et une
//     règle qui la déclarerait fausse mentirait. Ce qui est faux, c'est la
//     réponse SANS repère, et c'est ce que la règle réfute (« n'est pas une
//     réponse complète… ce qui est faux, c'est de n'en déclarer aucun »). Le
//     contrôle fait rejouer la question dans l'autre repère et montre la réponse
//     bouger — et quand elle ne bouge pas, il refuse quand même de valider :
//     « la ligne "par rapport à" reste à écrire ». C'est aussi pourquoi
//     `conditionValidite` n'accepte que les items où la réponse change.
//
// ── Le ton ────────────────────────────────────────────────────────────────
//
// Deux choses toujours vraies, et elles doivent s'entendre dans les
// `raisonnements` : la conception de l'élève prédit correctement la
// quasi-totalité des situations quotidiennes, et il devra apprendre à
// l'INHIBER, pas à l'oublier — c'est ce que font les experts (Masson 2012). On
// n'écrit jamais « c'est faux, voilà la règle ». Et on accorde ce qui est vrai
// AVANT de corriger : un élève qui dit « sans force, ça s'arrête » a raison sur
// tout ce qu'il a observé.

export default {
  // ── Chapitre 10 — Interactions et forces ────────────────────────────────

  'adherence-force-vitesse': {
    nom: 'Adhérence force-vitesse — le capital force',
    conception:
      'La force est pensée comme la cause du mouvement et non comme la cause de '
      + 'sa variation. Elle est solidaire de la vitesse : même sens qu\'elle, '
      + 'proportionnelle à elle, nulle quand l\'objet est immobile. L\'objet lancé '
      + 'emporte un capital de force qui s\'épuise en même temps que son effet.',
    enonceEleve:
      'Pour qu\'un objet avance, il faut qu\'il soit poussé. Plus il va vite, plus '
      + 'la force est grande. Un objet immobile n\'est soumis à aucune force.',
    rang: 1,
    fiabilite: 'primaire',
    origine: 'physique',
    chapitreOrigine: 'ch10-interactions-et-forces',
    rythmeInitial: 5,
    formatDiagnostique:
      'Diagramme objet-interactions à compléter — flèches légendées, code couleur '
      + 'distinct pour vitesse et force — sur une phase où force et vitesse sont '
      + 'incompatibles : montée d\'un lancer vertical, freinage, réception.',
    conditionValidite: {
      situation:
        '{ phase: "lancer-montee" | "sommet" | "chute" | "freinage" | "reception" '
        + '| "glissement-libre", vSigne: -1 | 0 | 1, fSigne: -1 | 0 | 1 }',
      predicat: (s) => s.vSigne * s.fSigne <= 0 && !(s.vSigne === 0 && s.fSigne === 0),
      pourquoi:
        'L\'item ne teste la conception que si force et vitesse sont incompatibles. '
        + '`didactique.md` § 4.2 définit la COMPATIBILITÉ — « même sens, ou toutes '
        + 'deux nulles » — et l\'incompatibilité est tout le reste. Elle a donc TROIS '
        + 'formes, pas deux : sens opposés (montée d\'un lancer, freinage) ; vitesse '
        + 'nulle avec force non nulle (le sommet) ; et vitesse non nulle avec force '
        + 'nulle — le palet qui glisse alors que plus rien ne le pousse. La troisième '
        + 'est la forme directe de « pour qu\'un objet avance, il faut qu\'il soit '
        + 'poussé », c\'est-à-dire la première phrase de l\'`enonceEleve`, et c\'est la '
        + 'situation du premier constat de ce piège. Le prédicat précédent '
        + '(`vSigne * fSigne < 0 || (vSigne === 0 && fSigne !== 0)`) l\'excluait : il '
        + 'ne réfutait qu\'un sens de l\'erreur et invalidait son propre dispositif. '
        + 'Sur une chute libre simple, en revanche, force et vitesse sont dans le même '
        + 'sens et l\'élève porteur de la conception répond juste : l\'item ne mesure '
        + 'rien.',
    },
    regle:
      'Une force ne dit pas **où va** l\'objet, elle dit **ce qui change** sa '
      + 'vitesse. Au sommet d\'un lancer, la balle ne monte plus et ne descend pas '
      + 'encore — et la Terre la tire vers le bas exactement comme pendant tout le '
      + 'reste du vol. **Un objet peut aller vite sans que rien ne le pousse dans '
      + 'ce sens, et être immobile en étant tiré.**',
    controle:
      'Pose-toi les deux questions séparément, jamais ensemble : d\'abord *dans quel '
      + 'sens ça bouge, et est-ce que ça accélère ou ça ralentit ?*, ensuite *quels '
      + 'objets sont en contact avec lui, ou agissent à distance ?* La deuxième '
      + 'réponse ne se lit pas dans la première — c\'est une liste d\'objets, pas une '
      + 'direction.',
    antecedentHistorique: {
      texte:
        'Ce raisonnement porte un nom et il a une histoire : c\'est la théorie de '
        + 'l\'impetus, défendue au Moyen Âge par les physiciens de l\'université de '
        + 'Paris. Un objet lancé emportait une « impetus » qui le maintenait en '
        + 'mouvement et s\'épuisait. Il a fallu attendre Galilée et Newton pour en '
        + 'sortir, et ce n\'est pas un hasard : il faut imaginer un monde sans '
        + 'frottement, que personne n\'a jamais vu.',
      source:
        'Viennot L. (1979), « Le raisonnement spontané en dynamique élémentaire », '
        + 'Hermann — repris dans didactique.md § 4.2 : le capital force est '
        + '« exactement la théorie médiévale de l\'impetus ».',
    },
    source:
      'didactique.md § 4.2 et § 7, rang 1, entrée ③ (l\'entrée ① du § 7 est '
      + 'l\'extramission, pas celle-ci) ; Éduscol/DGESCO 2019, « Les '
      + 'conceptions initiales en mécanique » ✔ ; GRIESP 2018, « Réussir en '
      + 'mécanique du cycle 3 au cycle terminal » ✔ ; Viennot 1979.',
    raisonnements: [
      {
        id: 'sans-force-ca-sarrete',
        texte: 'S\'il n\'y a plus de force, l\'objet finit forcément par s\'arrêter',
        reponse:
          'Et tu as raison sur tout ce que tu as vu : une bille lancée sur une table '
          + 's\'arrête, un ballon qui roule aussi. Ce n\'est pas la force du départ qui '
          + 's\'épuise — c\'est qu\'un autre objet agit pendant tout le trajet : la '
          + 'table, l\'air. Sur un coussin d\'air, où ce frottement est presque nul, la '
          + 'bille ne s\'arrête plus. Ton modèle ne se jette pas : il faut apprendre à '
          + 'le mettre en veille quand le frottement est faible. Les physiciens ne font '
          + 'rien d\'autre — ils l\'ont toujours dans la tête, ils l\'inhibent.',
      },
      {
        id: 'force-vers-le-haut-en-montee',
        texte: 'La balle monte, donc quelque chose la pousse vers le haut',
        reponse:
          'C\'est la lecture la plus naturelle, et elle marche partout où quelqu\'un '
          + 'pousse pendant tout le trajet — un caddie, une porte. Ici la main a lâché '
          + 'la balle : elle ne la touche plus, donc elle n\'agit plus. Regarde la '
          + 'chronophotographie de la montée : les intervalles rétrécissent, la balle '
          + '**ralentit**. Ce qui la ralentit tire vers le bas, pendant la montée aussi.',
      },
      {
        id: 'immobile-donc-rien',
        texte: 'Au sommet elle est immobile, donc plus aucune force ne s\'exerce',
        reponse:
          'La vitesse est bien nulle une fraction de seconde, tu l\'as vu juste. Mais '
          + 'si plus rien n\'agissait, elle resterait là — or elle repart vers le bas '
          + 'immédiatement, et de plus en plus vite. Une force n\'a pas besoin de '
          + 'vitesse pour exister : demande-toi quels objets sont là, pas à quelle '
          + 'vitesse ça va.',
      },
      {
        id: 'hasard',
        texte: 'J\'ai répondu au hasard',
        reponse:
          'Reprenons par le seul geste qui marche à tous les coups : liste les objets '
          + 'en contact avec la balle, puis ceux qui agissent à distance. Combien '
          + 'en trouves-tu, au sommet ?',
      },
    ],
    constats: [
      {
        id: 'palet-sur-coussin-dair',
        contexteDeSurface: 'glissement horizontal, table à coussin d\'air',
        dispositif:
          'Un palet est lancé sur une table à coussin d\'air, puis plus rien ne le '
          + 'touche. Enregistrement chronophotographique, intervalle de temps constant.',
        predictionEngagee:
          'Avant l\'affichage : « une fois lâché, que deviennent les écarts entre deux '
          + 'positions successives ? » — (a) ils rétrécissent régulièrement, (b) ils '
          + 'restent égaux, (c) ils rétrécissent puis s\'annulent d\'un coup. La '
          + 'réponse est verrouillée avant que l\'enregistrement ne s\'affiche.',
        resultat:
          'Les écarts restent égaux d\'un bout à l\'autre de l\'enregistrement. Le palet '
          + 'garde la même vitesse alors que plus rien ne le pousse.',
        conflit:
          'Le mouvement n\'a pas besoin d\'être entretenu. Ce qui arrête une bille sur '
          + 'une table, ce n\'est pas la fin d\'un capital : c\'est la table.',
      },
      {
        id: 'lancer-vertical-montee-et-descente',
        contexteDeSurface: 'lancer vertical, chronophotographie',
        dispositif:
          'Une balle est lancée verticalement. On mesure, sur l\'enregistrement, de '
          + 'combien la vitesse change entre deux images — pendant la montée, puis '
          + 'pendant la descente, à la même hauteur.',
        predictionEngagee:
          'Avant l\'affichage : « la vitesse perdue par image en montée est-elle plus '
          + 'petite que, égale à, ou plus grande que la vitesse gagnée par image en '
          + 'descente ? » Réponse verrouillée.',
        resultat:
          'Les deux valeurs sont égales, à la précision de la mesure près — en montée '
          + 'comme en descente, et aussi au sommet.',
        conflit:
          'L\'action ne suit pas la vitesse : elle est la même partout, dans le même '
          + 'sens, quelle que soit la phase. C\'est la vitesse qui change, pas elle.',
      },
    ],
    contreModele: {
      id: 'capital-qui-suse',
      modele:
        'Modèle de l\'élève, énoncé assez précisément pour qu\'on puisse en tirer une '
        + 'prédiction : « en quittant la main, l\'objet emporte un capital de force '
        + 'dirigé dans le sens du lancer ; ce capital est maximal au départ, il '
        + 's\'épuise à mesure, et quand il est nul plus rien ne s\'exerce sur '
        + 'l\'objet ». Il ne fait intervenir aucun autre objet — c\'est ce qui rend sa '
        + 'prédiction lisible sans ambiguïté. (Cette prédiction est DÉRIVÉE À LA MAIN '
        + 'et relue, pas calculée : voir la note sur le contre-modèle en tête de '
        + 'fichier.)',
      executions: [
        {
          id: 'chariot-lance-sur-un-plan-incline',
          contexteDeSurface: 'plan incliné, chariot lancé vers le haut de la pente',
          predictionEngagee:
            'Un chariot est lancé vers le haut d\'un plan incliné, puis plus personne '
            + 'ne le touche. Avant de continuer : selon TON modèle, une fois le '
            + 'capital épuisé — là où le chariot s\'arrête sur la pente — que fait-il ? '
            + '(à choisir et à verrouiller : il reste là / il redescend tout de suite / '
            + 'il redescend après un temps d\'arrêt visible)',
          predictionDuModele:
            'Le modèle prédit **il reste là**. Le capital était la seule chose qui '
            + 's\'exerçait sur le chariot, il vaut zéro, et le modèle ne connaît rien '
            + 'd\'autre qui pourrait le remettre en route.',
          ceQuiSePasse:
            'Le chariot repart vers le bas sans le moindre temps d\'arrêt, et il '
            + 'accélère en descendant au rythme même où il ralentissait en montant. '
            + 'L\'enregistrement le montre image par image : il n\'y a pas deux '
            + 'positions successives identiques.',
          conflit:
            'Ce qui ralentissait le chariot en montée n\'a pas disparu au sommet — '
            + 'c\'est la même chose qui le fait redescendre. Le modèle avait besoin '
            + 'que quelque chose s\'épuise ; ce qui agit, lui, n\'a jamais varié.',
        },
      ],
      lecture:
        'Le modèle n\'est pas absurde : il rend compte de tout ce qui ralentit et '
        + 's\'arrête, c\'est-à-dire de presque tout ce que tu vois. Il ne perd que '
        + 'quand on lui demande ce qui se passe APRÈS l\'épuisement — et c\'est '
        + 'justement là qu\'on lui a posé la question.',
    },
  },

  'force-propriete-de-l-objet': {
    nom: 'La force comme propriété de l\'objet, non comme relation',
    conception:
      'La force est traitée comme un attribut que l\'objet possède, au même titre '
      + 'que sa masse ou sa couleur, et non comme le nom d\'une interaction entre '
      + 'deux objets. La conséquence est visible dans l\'écriture : « la force de X » '
      + 'au lieu de « force exercée par X sur Y », l\'objet receveur disparaissant en '
      + 'premier, puis l\'objet auteur.',
    enonceEleve:
      'La force du poids. La force de l\'aimant. La masse a de la force vers le haut, '
      + 'sinon comment tiendrait-elle en l\'air en haut de la trajectoire ?',
    rang: 1,
    fiabilite: 'primaire',
    origine: 'physique',
    chapitreOrigine: 'ch10-interactions-et-forces',
    rythmeInitial: 6,
    formatDiagnostique:
      'Écriture libre de la force, vérifiée par le vérificateur de forme '
      + '`forceNaming` : la valeur peut être juste et la forme fausse, et c\'est '
      + 'précisément cet écart qui diagnostique. Un QCM où les deux objets sont déjà '
      + 'écrits ne voit rien.',
    conditionValidite: {
      situation:
        '{ objetsEnJeu: string[], formeAttendue: "par-X-sur-Y" | "valeur-seule", '
        + 'auteurImpose: boolean, receveurImpose: boolean }',
      predicat: (s) =>
        s.objetsEnJeu.length >= 2
        && s.formeAttendue === 'par-X-sur-Y'
        && s.auteurImpose === false
        && s.receveurImpose === false,
      pourquoi:
        'L\'item ne teste la conception que si l\'élève doit produire lui-même les '
        + 'DEUX objets — et il faut le vérifier des deux côtés, sans quoi le prédicat '
        + 'ne réfute qu\'un sens de l\'erreur. Un énoncé qui fournit l\'auteur '
        + '(« quelle force la Terre exerce-t-elle ? ») laisse l\'élève compléter sans '
        + 'rien changer à son modèle. Un énoncé qui fournit le receveur (« quelle '
        + 'force s\'exerce sur la balle ? ») est pire encore : le receveur est '
        + 'précisément l\'objet que la conception fait disparaître EN PREMIER '
        + '(`didactique.md` § 4.4 : « la force exercée par X sur Y devient la force de '
        + 'X sur Y, puis la force de X »), et l\'énoncé écrirait alors à la place de '
        + 'l\'élève la moitié qu\'on voulait mesurer.',
    },
    regle:
      'Une force n\'appartient à personne : c\'est le **nom d\'un lien entre deux '
      + 'objets**, et il en faut donc toujours deux pour l\'écrire — **force exercée '
      + 'par X sur Y**. « La force de l\'aimant » ne dit pas sur quoi elle s\'exerce ; '
      + '« la force du poids » ne nomme ni celui qui tire, ni celui qui est tiré. '
      + 'Change l\'un des deux objets et la force change ; retire-en un et elle '
      + 'n\'existe plus.',
    controle:
      'Relis ce que tu viens d\'écrire et pointe **deux noms d\'objets** : un après '
      + '« par », un après « sur ». S\'il n\'y en a qu\'un — ou si l\'un des deux '
      + 'n\'est pas un objet mais une grandeur, comme « le poids » ou « la masse » — '
      + 'il manque la moitié de la force.',
    source:
      'didactique.md § 4.4 ✔ (Éduscol/DGESCO 2019 ; Viennot L., 1989, « Bilans des '
      + 'forces et loi des actions réciproques », BUP 716) et § 8, liste '
      + '« solidement établi ». § 7 ne la range pas — voir la note de rang en tête '
      + 'de fichier.',
    raisonnements: [
      {
        id: 'cest-comme-ca-quon-parle',
        texte: 'On dit bien « la force de quelqu\'un », c\'est comme ça qu\'on parle',
        reponse:
          'Exactement, et c\'est le français correct : « il a de la force », « la force '
          + 'du vent ». Le problème n\'est pas ta langue, c\'est qu\'en physique le mot '
          + 'a un autre statut — il ne désigne pas ce qu\'on a, il désigne ce qui se '
          + 'passe entre deux choses. Tu n\'as pas à changer ta façon de parler dehors : '
          + 'tu as à la mettre de côté quand tu écris une force. C\'est le même geste '
          + 'que tout physicien fait, y compris ton professeur.',
      },
      {
        id: 'le-poids-est-une-force',
        texte: 'J\'ai écrit « la force du poids » : le poids, c\'est bien une force',
        reponse:
          'Le poids est bien une force, tu ne t\'es pas trompé là-dessus. Mais alors '
          + '« la force du poids », c\'est « la force de la force » — et ça ne dit '
          + 'toujours pas qui tire, ni sur quoi. Le poids a un auteur et un receveur : '
          + 'force exercée par la Terre sur la balle.',
      },
      {
        id: 'un-seul-objet-suffit',
        texte: 'J\'ai nommé l\'objet qui agit, ça me paraissait suffisant',
        reponse:
          'C\'est la moitié la plus difficile, et tu l\'as trouvée. Mais une même '
          + 'source agit différemment sur des objets différents : l\'aimant attire le '
          + 'trombone et ne fait rien au bouchon. Sans le receveur, on ne sait pas de '
          + 'quelle force on parle.',
      },
      {
        id: 'hasard',
        texte: 'J\'ai répondu au hasard',
        reponse:
          'Reprenons simplement : quels sont les deux objets en présence ? Écris '
          + '« force exercée par … sur … » et remplis les deux trous.',
      },
    ],
    constats: [
      {
        id: 'aimant-et-fer-sur-deux-chariots',
        contexteDeSurface: 'magnétisme, deux chariots sur rail',
        dispositif:
          'Deux chariots identiques sur un rail à faible frottement, tenus puis '
          + 'lâchés en même temps. L\'un porte un aimant, l\'autre un simple morceau '
          + 'de fer non aimanté — et les deux chariots sont lestés jusqu\'à la MÊME '
          + 'masse, pesée devant l\'élève. Sans cette égalisation, les deux ne se '
          + 'rejoindraient pas au milieu et la comparaison des déplacements ne '
          + 'voudrait plus rien dire : le résultat affiché serait faux.',
        predictionEngagee:
          'Avant l\'affichage : « lequel se met en mouvement ? » — (a) celui qui porte '
          + 'l\'aimant, puisque c\'est lui qui a la force, (b) celui qui porte le fer, '
          + '(c) les deux, l\'un vers l\'autre. Réponse verrouillée.',
        resultat:
          'Les deux partent, l\'un vers l\'autre, et se rejoignent au milieu. Le fer, '
          + 'qui « n\'a pas de force », a bougé autant que l\'aimant.',
        conflit:
          'La force n\'était pas dans l\'aimant : elle était entre les deux. On ne peut '
          + 'pas la ranger dans un objet — il en faut deux pour qu\'elle existe.',
      },
      {
        id: 'pierre-suspendue-a-lelastique',
        contexteDeSurface: 'suspension, élastique, recensement d\'interactions',
        dispositif:
          'Une pierre est suspendue à un élastique. On demande d\'abord la liste des '
          + 'objets qui agissent sur elle, puis on coupe l\'élastique, caméra en marche.',
        predictionEngagee:
          'La liste écrite par l\'élève est verrouillée avant la coupure — chaque '
          + 'entrée devant nommer un OBJET, pas une grandeur (« l\'attraction », « la '
          + 'lourdeur de la pierre » ne sont pas des objets).',
        resultat:
          'À la coupure, la pierre part vers le bas et accélère. Quelque chose la tire '
          + 'donc vers le bas, et cet objet doit figurer dans la liste — c\'est la Terre.',
        conflit:
          'Une liste qui contient « la lourdeur » et pas « la Terre » ne contient aucun '
          + 'auteur : elle décrit une propriété de la pierre. Or la pierre seule ne '
          + 'tombe nulle part ; c\'est la Terre qui la tire.',
      },
    ],
  },

  'action-reservee-au-vivant': {
    nom: 'Seul un être vivant peut exercer une action',
    conception:
      'Agir est confondu avec être actif : les objets sont triés en auteurs (qui '
      + 'poussent, tirent, sont vivants ou motorisés) et en décors (qui retiennent, '
      + 'supportent, tendent). Retenir n\'apparaît pas comme une action, et un objet '
      + 'inerte et immobile est vu comme n\'exerçant rien. La tension d\'un fil et la '
      + 'réaction d\'un support sont les deux forces les plus souvent absentes des '
      + 'diagrammes.',
    enonceEleve:
      'Si je m\'appuie sur un mur, moi j\'agis. Mais le mur, comment veux-tu qu\'il '
      + 'agisse sur moi ? Il ne peut même pas bouger. Le fil, il ne tire pas : il '
      + 'tient, c\'est tout.',
    rang: 3,
    fiabilite: 'non-documente',
    origine: 'physique',
    chapitreOrigine: 'ch10-interactions-et-forces',
    rythmeInitial: 8,
    formatDiagnostique:
      'Diagramme objet-interactions à compléter sur un objet IMMOBILE tenu par un '
      + 'support ou un lien inerte (livre sur table, masse au bout d\'un fil, lampe '
      + 'suspendue). L\'omission se voit dans ce qui manque au schéma, jamais dans '
      + 'une réponse cochée.',
    conditionValidite: {
      situation:
        '{ auteurAnime: boolean, typeDAction: "retenue" | "soutien" | "poussee" '
        + '| "traction" }',
      predicat: (s) =>
        s.auteurAnime === false
        && (s.typeDAction === 'retenue' || s.typeDAction === 'soutien'),
      pourquoi:
        'L\'item ne teste la conception que si la force attendue est exercée par un '
        + 'objet inerte ET dans un rôle de retenue ou de soutien. Les deux conditions '
        + 'sont nécessaires, et la seconde ne se déduit pas de la première : '
        + '`didactique.md` § 4.3 rapporte que les élèves trient spontanément les '
        + 'objets à rôle ACTIF — pousser, tirer — de ceux à rôle PASSIF — retenir, '
        + 'supporter —, et que « retenir n\'apparaît pas forcément comme une action ». '
        + 'C\'est le rôle, pas la seule inertie, qui décide de l\'omission : un aimant '
        + 'qui attire un trombone est inerte et pourtant cité sans difficulté, parce '
        + 'qu\'on le voit tirer. Une main qui pousse un chariot est écartée dès la '
        + 'première condition. La situation portait en plus '
        + '`objetEnMouvement`, que le prédicat ne lisait pas — un champ déclaré et '
        + 'jamais lu donne l\'illusion d\'une condition dérivée là où il n\'y en a pas, '
        + 'et il est retiré. Que l\'objet receveur bouge ou non ne change rien ici : '
        + 'c\'est le rôle de l\'AUTEUR qui décide. Ce rôle était nommé `roleDeLAuteur: '
        + '"passif"`, ce qui était un JUGEMENT sur l\'action et non un fait du '
        + 'dispositif — et « passif » est très exactement le mot de la conception '
        + 'qu\'on prétend mesurer. `typeDAction` nomme ce que le dispositif fait '
        + '(retenue, soutien, poussée, traction) et laisse le prédicat trancher.',
    },
    regle:
      'Un objet qui ne bouge pas, et qui n\'est pas vivant, **agit quand même** : la '
      + 'table, le fil, le sol le font en permanence. Le test n\'est pas « est-il '
      + 'vivant ? » ni « bouge-t-il ? », c\'est **« qu\'est-ce qui changerait si on '
      + 'l\'enlevait ? »**. Retire la table sous le livre : le livre tombe. Elle '
      + 'faisait donc quelque chose, et elle le faisait déjà avant.',
    controle:
      'Deux tours, jamais un seul. **Le tour des contacts** d\'abord : support, fil, '
      + 'crochet, air, main — tout ce qui touche l\'objet. **Puis le tour de ce qui '
      + 'agit sans toucher** : la Terre, toujours ; un aimant, s\'il y en a un. Pour '
      + 'chaque objet trouvé, enlève-le par la pensée : si l\'objet part, se met à '
      + 'tomber ou change de forme, alors cet objet exerçait une force et il doit '
      + 'figurer sur ton schéma. Le second tour n\'est pas un supplément : la Terre '
      + 'est l\'objet le plus souvent oublié des listes, et elle ne touche rien. Un '
      + 'contrôle qui ne fait que le tour des contacts te ferait l\'oublier à tous '
      + 'les coups.',
    source:
      'didactique.md § 4.3 (Éduscol/DGESCO 2019, sections « Action/agir » et « La '
      + 'notion de force » ✔ ; GRIESP 2018 ✔) — robustesse marquée ○, « pas de '
      + 'pourcentage », d\'où `fiabilite: non-documente`. § 7 ne la range nulle part, '
      + 'et aucune persistance n\'a été mesurée après un enseignement qui la visait : '
      + 'd\'où `rang: 3`, qui n\'affirme PAS qu\'elle cède à cet âge mais qu\'elle ne '
      + 'consomme pas de créneau de re-confrontation tant qu\'on n\'en sait rien. Les '
      + 'deux constats restent au format d\'un rang 1 : voir la note de rang en tête '
      + 'de fichier.',
    raisonnements: [
      {
        id: 'un-objet-ne-fait-rien',
        texte: 'Une table ne fait rien, elle est juste là',
        reponse:
          'Dans la vie, c\'est exactement ça, et personne ne dit « la table pousse mon '
          + 'livre » — ce serait bizarre. Regarde pourtant une table très souple, une '
          + 'règle posée sur deux appuis : quand tu poses le livre dessus, elle se '
          + 'courbe, et elle se redresse dès que tu l\'enlèves. Une table rigide fait '
          + 'la même chose, en beaucoup plus petit. Tu n\'as pas à cesser de penser '
          + 'qu\'une table est un décor : tu as à mettre cette idée de côté le temps '
          + 'de faire le schéma.',
      },
      {
        id: 'retenir-nest-pas-agir',
        texte: 'Le fil retient, il ne tire pas — ce n\'est pas pareil',
        reponse:
          'La distinction est fine et elle est juste dans la langue : retenir, ce '
          + 'n\'est pas pousser. En physique il n\'y a qu\'un mot pour les deux, parce '
          + 'que le fil fait bel et bien quelque chose : mets un dynamomètre dans le '
          + 'fil, il affiche une valeur. Un objet qui ne ferait rien afficherait zéro.',
      },
      {
        id: 'il-ne-bouge-pas-donc-rien',
        texte: 'Le mur ne bouge pas, donc il ne peut pas agir sur moi',
        reponse:
          'C\'est le raisonnement le plus fréquent, et il repose sur une observation '
          + 'exacte : le mur ne bouge pas d\'un millimètre visible. Mais ce qui agit '
          + 'ne bouge pas forcément — sinon rien ne t\'empêcherait de traverser le mur '
          + 'en t\'appuyant dessus. Ce qui t\'arrête vient bien de quelque part.',
      },
      {
        id: 'hasard',
        texte: 'J\'ai répondu au hasard',
        reponse:
          'Reprenons avec un seul geste : qu\'est-ce qui touche l\'objet ? Enlève-le '
          + 'par la pensée, et regarde si l\'objet reste où il est.',
      },
    ],
    constats: [
      {
        id: 'lame-flexible-sous-le-livre',
        contexteDeSurface: 'appui, support qui se déforme',
        dispositif:
          'Un livre est posé au milieu d\'une lame flexible reposant sur deux appuis. '
          + 'Un repère laser projeté sur le mur amplifie la flexion.',
        predictionEngagee:
          'Avant l\'affichage : « quand on posera le livre, le point lumineux va-t-il '
          + '(a) ne pas bouger, la lame ne faisant rien, (b) descendre puis rester en '
          + 'bas, (c) descendre puis remonter tout seul ? » Réponse verrouillée.',
        resultat:
          'Le point descend d\'un cran net à la pose, y reste tant que le livre est là, '
          + 'et remonte exactement à sa position d\'origine quand on retire le livre.',
        conflit:
          'La lame se déforme d\'autant qu\'il faut et repousse le livre : c\'est ça, '
          + 'exercer une force. Une table rigide fait la même chose — la déformation '
          + 'est simplement trop petite pour se voir à l\'œil nu.',
      },
      {
        id: 'dynamometre-insere-dans-le-fil',
        contexteDeSurface: 'suspension, fil et masse marquée',
        dispositif:
          'Une masse marquée pend au bout d\'un fil accroché au plafond. On ouvre le '
          + 'fil et on y insère un dynamomètre, sans rien changer d\'autre.',
        predictionEngagee:
          'Avant l\'affichage : « que va indiquer le dynamomètre ? » — (a) 0 N, parce '
          + 'que rien ne bouge, (b) une valeur qui augmente peu à peu, (c) tout de '
          + 'suite une valeur égale au poids de la masse. Réponse verrouillée.',
        resultat:
          'Le dynamomètre affiche immédiatement une valeur non nulle, égale au poids '
          + 'de la masse, et elle ne varie pas tant qu\'on ne touche à rien.',
        conflit:
          'Rien ne bouge, et pourtant le fil tire. Une force ne se lit pas dans le '
          + 'mouvement : elle se lit sur l\'appareil.',
      },
    ],
  },

  'troisieme-loi-effets-visibles': {
    nom: 'Troisième loi — raisonner sur les effets, pas sur les forces',
    conception:
      'Dans une interaction, l\'élève compare ce qu\'il voit bouger et transporte '
      + 'cette asymétrie sur les forces : le plus gros, le plus lourd ou le plus '
      + 'rapide exercerait la force la plus grande. La masse sert d\'argument direct '
      + 'sur la valeur de la force. S\'y ajoute une confusion entre première et '
      + 'troisième lois : les forces qui se compensent portent sur un seul système '
      + 'dans la première, sur deux systèmes distincts dans la seconde.',
    enonceEleve:
      'La Terre attire la Lune beaucoup plus fort que la Lune n\'attire la Terre, '
      + 'puisqu\'elle est bien plus grosse. Si j\'appuyais sur la Terre aussi fort '
      + 'qu\'elle appuie sur moi, je la déplacerais en sautant.',
    rang: 1,
    fiabilite: 'primaire',
    origine: 'physique',
    chapitreOrigine: 'ch10-interactions-et-forces',
    rythmeInitial: 6,
    formatDiagnostique:
      'Double QCM — valeur PUIS justification — sur une interaction dont les effets '
      + 'visibles sont franchement asymétriques. C\'est le seul format qui vaut ici : '
      + 'la source institutionnelle note que des élèves « jouant le jeu scolaire » '
      + 'produisent la réponse conforme tout en continuant de penser le contraire. '
      + 'Une bonne réponse à un QCM simple ne prouve rien.',
    conditionValidite: {
      situation:
        '{ rapportDesMasses: number, unObjetTenu: boolean, '
        + 'unSeulAuteurApparent: boolean }',
      predicat: (s) =>
        Math.max(s.rapportDesMasses, 1 / s.rapportDesMasses) >= 10
        || s.unObjetTenu === true
        || s.unSeulAuteurApparent === true,
      pourquoi:
        'L\'item ne teste la conception que si l\'asymétrie visible est produite par '
        + 'la situation elle-même. Elle a TROIS sources, pas deux, et le prédicat '
        + 'précédent (`rapportDesMasses >= 10 || unObjetTenu`) n\'en couvrait que '
        + 'deux : il excluait celle sur laquelle reposent les DEUX dispositifs de ce '
        + 'piège. (a) Les masses sont dans un rapport d\'au moins dix — les effets '
        + 'diffèrent d\'autant. (b) L\'un des deux objets est tenu, fixé ou solidaire '
        + 'du sol (un mur, la Terre, un adulte arc-bouté) : il ne bouge pas. (c) Un '
        + 'seul des deux est décrit comme poussant ou tirant, l\'autre comme se '
        + 'contentant de résister — et la conception attribue alors la plus grande '
        + 'force à celui qui « fait l\'effort », indépendamment des masses. C\'est '
        + 'exactement le constat des deux dynamomètres (l\'adulte tire, l\'enfant '
        + 'résiste) et l\'exécution du contre-modèle sur planches à roulettes (rapport '
        + 'de masses trois, personne de tenu) : sans (c), le prédicat déclarait '
        + 'invalides les items bâtis sur les dispositifs du piège lui-même. Deux '
        + 'chariots identiques qui se repoussent au même instant : aucune des trois, '
        + 'l\'élève porteur de la conception répond « forces égales » et l\'item ne '
        + 'mesure rien. Le rapport est lu dans les deux sens — `Math.max(r, 1/r)` — '
        + 'sans quoi le même dispositif serait valide ou non selon l\'ordre dans lequel '
        + 'l\'auteur a nommé les deux objets. Le champ d\'une version précédente — '
        + '`effetsVisibles === \'asymetriques\'` — n\'était pas dérivé de la situation, '
        + 'c\'était la CONCLUSION saisie à la main par l\'auteur, puis comparée à un '
        + 'autre champ du même auteur. C\'est très exactement la case à cocher qui se '
        + 'vérifie elle-même que `charte.md` § « La condition de validité d\'un item » '
        + 'refuse, et l\'invariant 15 avec elle. Les trois champs retenus sont des '
        + 'faits du dispositif, au même titre que `systeme: ouvert | ferme` pour la '
        + 'conservation de la masse.',
    },
    regle:
      'Quand deux objets interagissent, les deux forces ont **toujours la même '
      + 'valeur** — quelles que soient leur taille, leur masse, et quoi qu\'on voie '
      + 'bouger. Ce qui diffère, ce n\'est pas la force : c\'est **l\'effet**, parce '
      + 'que la même force ne produit pas le même changement de vitesse sur un '
      + 'kilogramme et sur une tonne. Et ces deux forces égales **ne se compensent '
      + 'jamais** : elles ne s\'exercent pas sur le même objet, l\'une porte sur X et '
      + 'l\'autre sur Y. Deux forces ne peuvent s\'annuler que si elles tirent le '
      + '**même** objet — ce qui n\'arrive jamais entre les deux forces d\'une '
      + 'interaction.',
    controle:
      'Trois questions, dans cet ordre, jamais mélangées : *sur quel objet porte '
      + 'chacune des deux forces ?* — sur deux objets différents, donc elles ne '
      + 's\'annulent pas — puis *quelle est la valeur des deux forces ?* — elles sont '
      + 'égales, toujours — puis *qu\'est-ce qui bouge le plus ?* — le plus léger. Si '
      + 'tu t\'es servi d\'une masse pour dire laquelle des deux FORCES est la plus '
      + 'grande, c\'est que tu as répondu à la troisième question en croyant répondre '
      + 'à la deuxième.',
    source:
      'didactique.md § 4.5 ✔ (Éduscol/DGESCO 2019 ; GRIESP 2018, annexe 2 — les '
      + 'chiffres cités y portent sur des élèves de terminale et restent dans '
      + '`didactique.md`). § 7 ne la range pas : voir la note de rang en tête de '
      + 'fichier. Contexte français récent : situation CEDRE 2.7, « Identifier la '
      + 'modélisation de l\'interaction Terre-Lune ».',
    raisonnements: [
      {
        id: 'la-masse-decide',
        texte: 'La Lune est bien plus petite, donc elle attire bien moins fort',
        reponse:
          'C\'est le raisonnement le plus répandu, et il tient debout : la masse compte '
          + 'vraiment, ta prémisse n\'est pas fausse — et elle compte même pour la '
          + 'valeur de la force, je ne vais pas te raconter le contraire. Ce qu\'elle '
          + 'ne fait pas, c\'est choisir un camp : l\'attraction met en jeu les DEUX '
          + 'masses ensemble, la même paire des deux côtés, donc la même valeur des '
          + 'deux côtés. Ce que la petite masse de la Lune change, ce n\'est pas la '
          + 'force qu\'elle exerce : c\'est qu\'elle est bien plus remuée que la Terre '
          + 'par cette force-là. Ton '
          + 'réflexe « gros = fort » reste utile partout ailleurs ; ici il faut le '
          + 'retenir une seconde avant de répondre, et c\'est ce que font ceux qui '
          + 'répondent juste.',
      },
      {
        id: 'ce-qui-bouge-a-recu-plus',
        texte: 'C\'est le camion qui pousse la voiture, pas l\'inverse : on le voit bien',
        reponse:
          'Tu as raison sur ce que tu vois, et c\'est ce qui rend cette loi si étrange : '
          + 'la voiture recule, le camion non. Mets un capteur de force sur chacun et '
          + 'tu liras deux fois la même valeur, à chaque instant. Ton œil mesure des '
          + 'effets ; le capteur mesure des forces. Les deux disent vrai, ils ne '
          + 'répondent pas à la même question — et savoir laquelle des deux on t\'a '
          + 'posée, c\'est tout le travail.',
      },
      {
        id: 'sinon-rien-ne-bougerait',
        texte: 'Si les deux forces étaient égales, elles se compenseraient et rien ne bougerait',
        reponse:
          'L\'objection est excellente, et c\'est celle que se posent tous ceux qui ont '
          + 'compris quelque chose. Deux forces ne se compensent que si elles agissent '
          + 'sur **le même** objet. Ici elles agissent sur deux objets différents : '
          + 'l\'une sur la voiture, l\'autre sur le camion. Chacune fait son effet de '
          + 'son côté, et rien ne s\'annule.',
      },
      {
        id: 'hasard',
        texte: 'J\'ai répondu au hasard',
        reponse:
          'Reprenons : combien d\'objets sont en jeu, et sur lequel des deux porte '
          + 'chacune des deux forces ?',
      },
    ],
    constats: [
      {
        id: 'deux-dynamometres-bout-a-bout',
        contexteDeSurface: 'traction, deux dynamomètres accrochés l\'un à l\'autre',
        dispositif:
          'Deux dynamomètres sont accrochés l\'un à l\'autre. Un adulte tient le '
          + 'premier et tire ; un enfant tient le second sans rien faire d\'autre que '
          + 'résister. Les deux cadrans sont filmés dans le même plan.',
        predictionEngagee:
          'Avant l\'affichage : « les deux aiguilles vont-elles indiquer (a) une valeur '
          + 'plus grande du côté de celui qui tire, (b) la même valeur, (c) une valeur '
          + 'plus grande du côté de celui qui résiste ? » Réponse verrouillée.',
        resultat:
          'Les deux aiguilles indiquent la même valeur, et elles la gardent identique '
          + 'quand l\'adulte tire plus fort ou relâche.',
        conflit:
          'Un seul des deux « fait l\'effort », et pourtant les deux forces sont '
          + 'égales. Tirer plus fort ne fait pas pencher la balance : ça monte les '
          + 'deux valeurs ensemble.',
      },
      {
        id: 'chariots-de-masses-differentes',
        contexteDeSurface: 'répulsion, deux chariots de masses très différentes',
        dispositif:
          'Deux chariots sur rail, l\'un dix fois plus lourd que l\'autre, séparés par '
          + 'un ressort comprimé qu\'on libère. Chacun porte un capteur de force ; les '
          + 'deux courbes sont enregistrées.',
        predictionEngagee:
          'Avant l\'affichage, deux prédictions séparées et verrouillées : « lequel '
          + 'partira le plus vite ? » et « lequel des deux capteurs affichera la plus '
          + 'grande valeur ? ».',
        resultat:
          'Le chariot léger part environ dix fois plus vite — la première prédiction '
          + 'est en général juste. Mais les deux courbes de force se superposent '
          + 'exactement, du début à la fin de la poussée.',
        conflit:
          'C\'est le cœur du piège, et le constat le sépare en deux : les effets sont '
          + 'dans un rapport de dix, les forces sont égales. Avoir raison sur ce qui '
          + 'bouge ne donne pas raison sur les forces.',
      },
    ],
    contreModele: {
      id: 'force-proportionnelle-a-la-masse',
      modele:
        'Modèle de l\'élève, énoncé assez précisément pour qu\'on puisse en tirer une '
        + 'prédiction chiffrée : « dans une interaction, la force se partage comme les '
        + 'masses — celui qui est n fois plus lourd exerce une force n fois plus '
        + 'grande ». On lui fait donc produire deux nombres, et on les compare aux '
        + 'deux appareils. (Le passage du modèle au nombre est écrit à la main et '
        + 'relu, pas calculé par le moteur : voir la note sur le contre-modèle en tête '
        + 'de fichier.)',
      executions: [
        {
          id: 'poussee-entre-deux-personnes-sur-planches-a-roulettes',
          contexteDeSurface:
            'poussée entre deux personnes de masses très différentes, chacune sur une '
            + 'planche à roulettes',
          predictionEngagee:
            'Un adulte et un enfant se font face, chacun sur une planche à roulettes, '
            + 'paume contre paume, un capteur de force entre les deux mains. L\'adulte '
            + 'seul pousse ; l\'enfant se contente de tenir sa main tendue. Avant de '
            + 'continuer, deux réponses à verrouiller : (a) qui part en arrière — '
            + 'l\'enfant seul, l\'adulte seul, ou les deux ? (b) les deux capteurs '
            + 'afficheront-ils la même valeur, ou celle du côté de l\'adulte sera-t-elle '
            + 'plus grande ?',
          predictionDuModele:
            'On déroule le modèle. L\'adulte pesant environ trois fois l\'enfant, il pose '
            + 'F(adulte sur enfant) = 3 × F(enfant sur adulte) : il prédit donc deux '
            + 'lectures nettement différentes, la plus grande du côté de l\'adulte. Et '
            + 'comme l\'enfant « ne pousse pas », il prédit que l\'adulte, lui, ne '
            + 'recule pas.',
          ceQuiSePasse:
            'Les deux capteurs affichent la même valeur, à chaque instant de la '
            + 'poussée. Et les deux personnes partent en arrière — l\'enfant nettement '
            + 'plus vite que l\'adulte, mais l\'adulte part.',
          conflit:
            'Le modèle avait raison sur ce qu\'on voit — l\'enfant est bien plus remué '
            + '— et faux sur ce qu\'il en déduisait. Il a lu les forces sur les '
            + 'effets. Et il s\'est trompé sur ton propre corps : tu recules aussi, '
            + 'alors que tu es le seul à pousser.',
        },
      ],
      lecture:
        'C\'est le même partage entre **la valeur** et **l\'effet** que le constat des '
        + 'chariots, mais dans un décor où l\'élève est lui-même l\'un des deux objets '
        + '— et où le modèle prédit quelque chose de faux sur ce qu\'il a déjà '
        + 'ressenti. Le décor est volontairement différent de celui des deux constats : '
        + 'un dispositif de remédiation qui reservirait la même expérience ne '
        + 'produirait plus de conflit, seulement un souvenir.',
    },
  },

  // ── Chapitre 8 — Mouvement et vitesse ───────────────────────────────────

  'mouvement-absolu': {
    nom: 'Le mouvement absolu — référentiel jamais déclaré',
    conception:
      'Bouger ou être immobile est traité comme une propriété de l\'objet, vraie ou '
      + 'fausse en soi. Le référentiel n\'est pas omis par étourderie : la nécessité '
      + 'de le déclarer n\'apparaît pas, puisqu\'il y en a toujours un, implicite et '
      + 'unique — le sol. La conception s\'étend à la vitesse et à la trajectoire, '
      + 'également pensées comme absolues, et le repos est vu comme un état de nature '
      + 'différente du mouvement plutôt que comme l\'un de ses cas.',
    enonceEleve:
      'Le train bouge, point. Le passager assis est immobile, point. « Par rapport à '
      + 'quoi ? », je ne vois pas ce que ça change.',
    rang: 3,
    fiabilite: 'non-documente',
    origine: 'physique',
    chapitreOrigine: 'ch08-mouvement-et-vitesse',
    rythmeInitial: 8,
    formatDiagnostique:
      'Réponse obligatoirement assortie du référentiel déclaré, sur un enregistrement '
      + 'où DEUX référentiels sont disponibles et donnent des réponses différentes '
      + '(chronophotographie repérée deux fois, ou deux vues synchrones du même '
      + 'événement). Une question à référentiel unique ne peut pas diagnostiquer une '
      + 'omission de référentiel.',
    conditionValidite: {
      situation:
        '{ referentiels: string[], reponseParReferentiel: Record<string, string> }',
      predicat: (s) =>
        s.referentiels.length >= 2
        && new Set(Object.values(s.reponseParReferentiel)).size >= 2,
      pourquoi:
        'L\'item ne teste la conception que si la réponse CHANGE d\'un référentiel à '
        + 'l\'autre. Si elle est la même dans les deux, ne pas déclarer le référentiel '
        + 'ne coûte rien et l\'élève porteur de la conception répond juste.',
    },
    regle:
      '« Il bouge » n\'est pas une réponse complète : **un mouvement n\'existe que par '
      + 'rapport à quelque chose**. Le passager assis est immobile par rapport au '
      + 'wagon **et** file à 120 km/h par rapport au quai — les deux réponses sont '
      + 'vraies, elles ne parlent simplement pas du même repère. Ce qui est faux, ce '
      + 'n\'est pas d\'en choisir un : c\'est de n\'en déclarer aucun.',
    controle:
      'Avant d\'écrire ta réponse, écris d\'abord **par rapport à quoi** tu la donnes. '
      + 'Ça, ce n\'est jamais facultatif : sans repère, une réponse est incomplète même '
      + 'quand elle est juste, parce que rien ne dit de quoi elle parle. Puis fais le '
      + 'test qui te montre ce que ton repère a changé : repose-toi la question avec '
      + 'l\'autre repère disponible et regarde si la réponse bouge. Si elle bouge, tu '
      + 'viens de voir pourquoi on déclare le repère. Si elle ne bouge pas, tu n\'as '
      + 'rien à corriger à ce que tu as écrit — tu as simplement eu de la chance sur '
      + 'cette question-là, et la ligne « par rapport à » reste à écrire la fois '
      + 'suivante.',
    source:
      'didactique.md § 4.1 (GRIESP 2018 ✔ ; sources primaires Saltiel & Malgrange '
      + '1979, BUP 616 ; thèse Saltiel 1978) — « Chiffres : aucun. ○ », et la '
      + 'conception ne figure pas dans la liste « solidement établi » du § 8, d\'où '
      + '`fiabilite: non-documente`. § 7 ne la range nulle part, et aucune '
      + 'persistance n\'a été mesurée après un enseignement qui la visait : d\'où '
      + '`rang: 3`, qui n\'affirme PAS qu\'elle cède à cet âge — § 4.1 la date au '
      + 'contraire « du cycle 3 à la seconde » — mais qu\'elle ne consomme pas de '
      + 'créneau de re-confrontation tant qu\'on n\'a pas de mesure. Les deux constats '
      + 'restent au format d\'un rang 1 : voir la note de rang en tête de fichier.',
    raisonnements: [
      {
        id: 'il-ny-a-quun-repere',
        texte: 'Le sol ne bouge pas, donc c\'est lui le bon repère',
        reponse:
          'Et c\'est le bon réflexe presque partout : dans la vie courante, tout le '
          + 'monde prend le sol et personne n\'a besoin de le dire. '
          + 'Le sol n\'est pourtant pas fixe non plus — il tourne avec la Terre. Il '
          + 'n\'y a pas de repère « vrai » : il y a celui qu\'on choisit, et qu\'on '
          + 'annonce. Garde ton réflexe, ajoute-lui une ligne.',
      },
      {
        id: 'immobile-ou-pas-cest-lun-ou-lautre',
        texte: 'Un objet est immobile ou il bouge, il ne peut pas être les deux',
        reponse:
          'Dans ton expérience quotidienne, c\'est effectivement toujours l\'un ou '
          + 'l\'autre — parce que tout le monde regarde depuis le même endroit. Assis '
          + 'dans un train, tu ne bouges pas d\'un centimètre par rapport à ton siège, '
          + 'et tu parcours deux kilomètres par minute par rapport aux rails. Les deux '
          + 'sont vraies en même temps. Ce n\'est pas une contradiction, c\'est deux '
          + 'questions différentes.',
      },
      {
        id: 'la-trajectoire-est-la-trajectoire',
        texte: 'Une trajectoire est une trajectoire, elle ne dépend pas de qui regarde',
        reponse:
          'C\'est ce que suggère le mot, et c\'est la première chose qu\'on pense. '
          + 'Filme la valve d\'une roue de vélo qui avance : depuis le cadre, elle '
          + 'décrit un cercle ; depuis le trottoir, une suite d\'arceaux. Même valve, '
          + 'même film, deux tracés. La trajectoire n\'appartient pas à l\'objet — elle '
          + 'appartient au couple objet-repère.',
      },
      {
        id: 'hasard',
        texte: 'J\'ai répondu au hasard',
        reponse:
          'Reprenons par le début : quels repères sont disponibles dans cette '
          + 'situation ? Nomme-les, puis choisis-en un.',
      },
    ],
    constats: [
      {
        id: 'valve-de-roue-de-velo',
        contexteDeSurface: 'roue de vélo, trajectoire',
        dispositif:
          'Un vélo avance à vitesse constante ; la valve de la roue avant est repérée. '
          + 'Le même enregistrement est traité deux fois — une fois en fixant le '
          + 'cadre, une fois en fixant le trottoir.',
        predictionEngagee:
          'Avant l\'affichage : « quelle est la trajectoire de la valve ? » — (a) un '
          + 'cercle, (b) une ligne droite, (c) une suite d\'arceaux, (d) ça dépend. '
          + 'Réponse verrouillée.',
        resultat:
          'Les deux traitements s\'affichent côte à côte : un cercle parfait dans le '
          + 'repère du cadre, une suite d\'arceaux dans le repère du trottoir.',
        conflit:
          'Un seul enregistrement, deux trajectoires, aucune des deux fausse. La '
          + 'question « quelle est sa trajectoire ? » n\'avait pas de réponse tant '
          + 'qu\'on n\'avait pas dit depuis où on regardait.',
      },
      {
        id: 'passager-qui-marche-dans-le-train',
        contexteDeSurface: 'train, valeur d\'une vitesse',
        dispositif:
          'Un passager marche dans le couloir d\'un train qui roule. Deux mesures sont '
          + 'faites sur le même trajet : l\'une avec un repère peint sur le plancher du '
          + 'wagon, l\'autre avec les poteaux du quai.',
        predictionEngagee:
          'Avant l\'affichage : « à quelle vitesse va le passager ? » — l\'élève écrit '
          + 'une valeur avec son unité, verrouillée.',
        resultat:
          'Les deux mesures s\'affichent : environ un mètre par seconde par rapport au '
          + 'wagon, plusieurs dizaines de mètres par seconde par rapport au quai.',
        conflit:
          'Ici ce n\'est plus la trajectoire qui change, c\'est la valeur — et d\'un '
          + 'facteur énorme. Une vitesse sans repère déclaré n\'est pas une vitesse à '
          + 'peu près juste : c\'est une vitesse qu\'on ne peut pas vérifier.',
      },
    ],
  },
};
