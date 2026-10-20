# Maths 3<sup>e</sup> — Maîtriser le programme, chapitre par chapitre

Reprendre chaque chapitre de mathématiques de 3<sup>e</sup> **au fur et à mesure
qu'il est vu en classe**, pendant qu'il est encore frais : un cours, une
méthode, des exercices où l'on produit sa réponse, et des problèmes.

## L'ordre est celui du cours, pas celui d'un manuel

C'est la différence avec les autres applications du dépôt, qui couvrent un
programme fini pour réviser l'été. Ici on écrit un chapitre quand il vient
d'être traité en classe. Le numéro dit « premier écrit », pas « premier du
programme » — Thalès porte le n° 1 alors qu'il tombe habituellement plus tard
dans l'année.

| # | Chapitre | Savoir-faire | Items |
|---|---|---|---|
| 1 | Théorème de Thalès | 5 | 136 |
| 2 | Calcul mental (révision intensive) | 6 | 120 |
| 3 | Calcul littéral | 7 | 140 |

## Ce que le chapitre Thalès reprend, et ce qu'il ajoute

Le socle vient du chapitre 12 de l'[application de 4<sup>e</sup>](../../4eme/maths/) :
reconnaître la configuration, calculer une longueur, démontrer un parallélisme
avec la réciproque, déterminer l'effet d'un agrandissement. Le théorème ne
change pas d'une classe à l'autre.

Ce que la 3<sup>e</sup> ajoute, et que le chapitre de 4<sup>e</sup> écartait
explicitement, c'est la configuration **« papillon »** — les deux points de part
et d'autre du sommet commun. Le calcul est identique ; ce qui change est que la
figure ne ressemble plus à celle du cours. D'où deux erreurs symétriques, et le
chapitre vise les deux : appliquer le théorème à un papillon sans vérifier les
parallèles, et **refuser** de l'appliquer à un papillon valide parce qu'il n'a
pas la bonne allure.

## Le cours d'Evan, arrivé ensuite, a fixé le plan et les mots

Le chapitre avait été écrit avant d'avoir le cours, à partir de l'appli de
4<sup>e</sup>. Les pages de son cours l'ont fait bouger sur cinq points.

- **Les triangles semblables ouvrent le chapitre.** La première version les
  renvoyait à un chapitre à part ; sa professeure en fait la partie I du
  chapitre Thalès : définition par les angles, sommets et côtés
  **homologues** (les côtés opposés à des angles égaux), « deux paires
  d'angles suffisent », côtés proportionnels, coefficient k — réduction si
  k < 1, agrandissement si k > 1, et k' = 1/k. Nouveau savoir-faire, placé
  en tête ; son identifiant (`sf-1-5`) est resté le dernier, parce que la
  progression de l'élève est rangée par identifiant.
- **Le théorème est énoncé avec ses mots et ses lettres** : « deux droites
  sécantes coupées par deux droites parallèles », « (MB) et (NC) sécantes en
  A ». La méthode reprend son exemple (K, I, J, L, M) et son modèle de
  rédaction : « On sait que… Donc, d'après le théorème de Thalès… On en
  déduit que… ».
- **La réciproque exige des points « alignés dans le même ordre »**, et un
  exercice montre des rapports égaux où la conclusion est pourtant interdite.
- **La contraposée est nommée** : quand les rapports diffèrent, c'est elle qui
  prouve que les droites ne sont pas parallèles — jamais la réciproque, comme
  le dit l'« ATTENTION » de son cours. Des QCM demandent quel énoncé citer.
- **Des figures**, parce que son cours part toujours de « la figure
  ci-contre ». `js/figure.js` trace la configuration de Thalès (triangles
  emboîtés ou papillon) et deux triangles semblables, **à partir des
  longueurs ou des angles de l'exercice** : la figure est juste, à l'échelle
  près. Les exercices gardent leurs énoncés en toutes lettres — il faut aussi
  savoir LIRE une configuration.

Comme dans l'appli de 5<sup>e</sup>, la figure sait ce qu'elle dessine, et le
contrôle de contenu refuse un exercice qui la contredit : longueur calculée
(`longueurDe`), parallélisme (`paralleles`), ordre des points
(`memeOrdre`), sommet ou côté homologue (`homologueDe`), longueur écrite
sur la figure qui ne serait pas celle dessinée. Les QCM qui concluent doivent
conclure comme la figure, et la similitude de deux triangles donnés par leurs
angles est recalculée (`semblablesAngles`). Ces contrôles ont été vus en
échec sur neuf cassures volontaires.

Le QCM (`type: 'choix'`) arrive aussi, repris de l'appli de 5<sup>e</sup> :
le nom d'un théorème, un sommet homologue ou une conclusion ne se tapent pas.
Chaque option fausse est une erreur prévue, reliée à un piège **étroit** —
« la réciproque citée pour conclure pas parallèles » plutôt que « le mauvais
théorème » — pour que toutes les raisons proposées ensuite à l'élève restent
possibles au vu de ce qu'il a répondu.

À signaler à Evan : dans ses notes manuscrites, la ligne du coefficient
d'agrandissement commence par « AB/AB » ; c'est **AB/AM**.

Chaque savoir-faire a son propre fichier — ils font 350 lignes chacun, et un
fichier de 2 000 lignes n'est relisible par personne.

## Le chapitre 2 : calcul mental, une révision intensive

Ce n'est pas un chapitre du cours, c'est une remise à niveau. À
l'interrogation « Calcul mental — 40 calculs » (13,5/20), Evan a donné 27
réponses justes, 4 fausses et laissé 9 cases vides. Le chapitre a un
savoir-faire par famille d'erreurs :

| Savoir-faire | Ce que la copie a montré |
|---|---|
| Les décimaux : la virgule à sa place | 0,6 × 3, 453 ÷ 100, 18,7 − 8 : trois des quatre fautes |
| Carrés, cubes, racines carrées | √169 = 36 |
| Le nombre manquant | ? − 75 = 14 et 0,4 + ? = 1, vides |
| Calculer vite avec les entiers | 67 − 45, 48 × 5, 46 ÷ 4, vides |
| Les fractions | 1/2 ÷ 7/9, simplifier 16/18, 1/4 + 3/12, vides |
| Les relatifs | (+6) − (−18), vide |

Chaque « Se tester » reprend les calculs exacts de la copie. Quinze pièges
(`cm-…`) donnent la règle et un geste de contrôle de dix secondes : l'ordre
de grandeur, la réponse remise à la place du ?, le produit qui redonne le
nombre.

**La série chronométrée** (carte ⏱ en tête des chapitres) remet Evan dans le
format de l'interrogation : 40 calculs mêlés, tirés dans « S'entraîner » et
« Se tester » dans les proportions de la copie, notés sur 20 avec des
demi-points. Le chronomètre tourne, il n'y a aucune correction pendant la
série, et « Je passe » compte faux. À la fin viennent la note, le temps, puis
chaque erreur corrigée avec sa règle, le rappel du cours et un lien vers le
savoir-faire. La carte garde la dernière note et la meilleure. Le tirage est
dans [`js/data/serie.js`](js/data/serie.js), la mécanique dans
[`js/serie.js`](js/serie.js), reprise du DST blanc de la 5e.

`tools/tester-moteur.mjs` recalcule les 120 énoncés du chapitre (traduits en
JavaScript, ou réponse remise à la place du ?). Une correction fausse ne peut
donc pas passer.

## Le chapitre 3 : calcul littéral, d'après sa fiche

Écrit d'après la fiche d'exercices de calcul littéral d'Evan (treize
exercices) et la consigne de révision de sa professeure : « Revoir le cours
de calcul littéral (bien connaître les formules) ». Son cours lui-même n'est
pas arrivé : les énoncés « Par cœur » sont les formules du programme dans
leur forme usuelle.

| Savoir-faire | Sa fiche |
|---|---|
| Réduire une expression | exercices 3, 4 et 5 |
| Développer avec la distributivité simple | exercice 1 |
| Développer avec la double distributivité | exercices 6 et 7 |
| Développer avec les identités remarquables | exercices 6 et 7 |
| Factoriser avec un facteur commun | exercices 2 et 8 |
| Factoriser avec les identités remarquables | exercices 8 et 9 |
| Résoudre une équation produit nul | exercices 10 à 13 |

Une partie des exercices sont ceux de sa fiche — l'appli les corrige —, les
autres sont neufs. Six énoncés à savoir par cœur (dont les trois identités
remarquables et la règle du produit nul), et deux rédactions corrigées par
Merlin : la résolution d'un produit nul, et l'exercice type de la fiche en
entier — développer, factoriser, résoudre.

**Juger une expression, c'est juger sa forme.** À « Factorise 6x + 6y »,
recopier 6x + 6y est équivalent, et faux. `js/litteral.js` lit une expression
— celle du contenu comme celle qu'Evan tape dans MathLive — en arbre, pour sa
forme, et la calcule en polynôme exact à plusieurs lettres, pour sa valeur.
Une réponse juste en valeur mais pas en forme a son propre piège : pas
développée, pas réduite, pas factorisée, ou factorisée sans le plus grand
facteur commun (5(6x + 9) pour 30x + 45). Une factorisation par une identité
peut garder un nombre dans ses facteurs : 81 − 36x² = (9 − 6x)(9 + 6x) est
juste. Une factorisation qui s'arrête en route, (3x − 1)((3x − 1) − (x + 4)),
vaut la moitié : les facteurs doivent être réduits. Recopier l'expression
derrière un 1 ou un signe moins n'est pas factoriser : c'est faux. Une
parenthèse restée autour d'un seul terme, 9x² + (−12x) + 4, est juste : c'est
développé et réduit, comme x² + (−3) ou x² + −3x — l'appli juge le calcul,
pas la typographie des signes. Les fractions de MathLive se lisent comme
elles s'écrivent : 25x²/16 est le monôme (25/16)x², mais (x + 4)/2 n'est pas
développé.

Une équation produit nul se répond par ses solutions, dans l'ordre qu'on
veut. L'appli reconnaît les erreurs prévisibles : le signe oublié, la fraction
retournée, le nombre devant la parenthèse pris pour une solution (6 dans
6(x − 7) = 0), une valeur approchée (−2,33 pour −7/3), une solution oubliée.
Une fraction juste mais pas simplifiée vaut la moitié, et une solution tapée
deux fois ne compte qu'une fois.

L'aide sous le champ ne montre que la syntaxe, avec la lettre t : t^2,
4(t + 1). Un exemple en x aurait pu être la réponse d'un exercice ; le
contrôle de contenu le vérifie pour chaque exercice.

Sur un téléphone, une expression plus large que l'écran rétrécit jusqu'à
tenir en entier, 15 px au plus petit : avec une fin coupée, Evan réduirait
une autre expression que celle de l'énoncé. Une sur sept dépassait.

Le contrôle de contenu recalcule chacune des 140 réponses, vérifie qu'elle a
la forme qu'exige la correction, et refuse un exercice qui se réussirait en
recopiant l'énoncé.

**Aucun texte ne souffle une réponse.** Un piège s'affiche après une erreur
sur n'importe quel exercice qui le vise : si son exemple est la réponse d'un
autre exercice, celui-ci ne sert plus à rien. La troisième relecture en a
signalé plusieurs, dont la factorisation du problème de l'épreuve dans un
piège ; le contrôle écrit ensuite en a trouvé quinze dans les pièges, et
d'autres dans un cours, une méthode, deux rédactions et les exemples donnés à
Merlin. Le contrôle de contenu lit maintenant chaque piège, cours, méthode et
rédaction, et refuse ceux qui contiennent la réponse d'un exercice — même
écrite avec une autre lettre —, une équation à résoudre avec sa solution, ou
une question de l'épreuve. Il refuse
aussi un exercice qui serait une question de l'épreuve sous une autre
écriture : un test avait les solutions de C5.

## L'épreuve blanche : une heure, notée sur 20, corrigée à la fin

Pour préparer l'évaluation commune, la carte 📝 en tête des chapitres met Evan
en conditions d'examen. Le sujet porte sur ce qu'il a eu en cours depuis la
rentrée, et sur rien d'autre : le chapitre Thalès, son interrogation de calcul
mental, la feuille « Calcul numérique / fractionnaire / avec exposants » et la
fiche de calcul littéral de son dossier de maths.

| Partie | Points | Ce qu'elle évalue | Corrigée par |
|---|---|---|---|
| A. Connaissances | 5 | Thalès, la réciproque, la contraposée, les identités remarquables, écrits de mémoire | Merlin, sur la grille de chaque énoncé |
| B. Application | 8 | quatre calculs mentaux, trois calculs de la feuille, cinq de calcul littéral (réduire, développer, factoriser), deux longueurs dans un papillon, parallèles ou pas, triangles semblables | l'appli |
| C. Démonstrations et problème | 7 | une longueur avec Thalès (DG à calculer d'abord), la réciproque, puis un problème de calcul littéral : développer, factoriser, résoudre | Merlin pour les rédactions, l'appli pour le problème |

Une première version du sujet, publiée avant que la fiche de calcul littéral
n'arrive, n'en avait pas. Elle n'est plus proposée, mais elle reste dans le
code sous son identifiant : une copie déjà passée se relit avec son sujet, et
une copie commencée avec elle se termine et se corrige avec elle. Les deux
versions comptent comme le même sujet pour les passages : la seconde version
reprend presque toutes les questions de la première.

Le problème de la partie C suit le format de sa fiche (exercices 10 à 13) :
la question 3 donne l'équation factorisée, donc la réponse de la question 2.
C'est voulu — c'est ce qu'il aura devant lui — et une erreur à la question 2
ne bloque pas la 3.

Les lettres, les figures et les nombres sont neufs : aucune question ne reprend
un exercice de l'appli — sauf les carrés à connaître, qui sont ceux de la
table du cours. Les figures portent « pas en vraie grandeur », comme sur un
sujet. Le sujet est dans [`js/data/epreuves.js`](js/data/epreuves.js) ; son
corrigé y est lisible par qui ouvre le code, c'est le prix d'une appli sans
serveur.

**Les conditions.** Le temps part au premier clic et ne s'arrête plus, même
appli fermée ; à la fin de l'heure, la copie est ramassée. Evan circule
librement entre les questions, comme sur une copie, et rend quand il veut.
Aucune correction, aucun Merlin avant la fin. Le copier-coller est refusé dans
les écrits. La copie est enregistrée à chaque frappe : une page rechargée ne
perd rien.

**La note.** Les calculs sont jugés en fractions exactes : une fraction juste
mais pas simplifiée, ou 30 × 10⁵ au lieu de 3 × 10⁶, rapporte la moitié des
points, comme « non, d'après la réciproque » à la place de la contraposée.
Chaque question est arrondie au quart de point le plus proche : la moitié de
0,75 fait 0,5. Une longueur tapée avec son unité (« 6 cm ») se lit ; une
saisie que l'appli ne sait pas lire est signalée pendant l'épreuve (« écris
seulement un nombre »), sans dire si elle est juste, et le rapport la dit
« illisible », pas « non traitée ».

Pour les écrits, Merlin classe chaque élément de la grille ; la part des
éléments obligatoires présents donne les points. Les grilles acceptent les
démarches équivalentes : les rapports retournés, l'autre troisième angle.
Trois écrits partent à la fois, et un écrit que Merlin n'a pas lu est
redemandé une fois. Sans clé, ou si Merlin ne lit toujours pas, Evan le
corrige lui-même sur sa grille, et le rapport le signale.

Refaire l'épreuve redonne le même sujet : le suivi et le rapport le disent
(« 2e passage, sujet déjà corrigé »), pour qu'une note de mémoire ne passe pas
pour un progrès.

**Le bilan.** Merlin écrit ce qui va, ce qui ne va pas, et quoi faire d'ici
l'épreuve, à partir des résultats question par question : il nomme des
compétences précises, distingue une question non traitée d'une erreur, et
n'invente aucun chiffre — note, points et temps viennent de l'appli. Sans
Merlin, un bilan plus sec est tiré des mêmes résultats.

**Pour les parents.** Chaque épreuve reste dans 👪 Suivi : la note, le
bilan, et la copie corrigée, avec ce qu'Evan a écrit. Le bouton « Envoyer le
rapport » ouvre le partage du téléphone (message, courriel) ; ailleurs, il
copie le rapport, ou l'affiche à copier. L'appli n'a pas de serveur : c'est
ce texte qui fait voyager le rapport.

**Les réponses sont recalculées.** `exact.js` lit un calcul écrit au clavier
(« 3/4 − 1/4 × 6/5 », « −3^2 », « 10^-3 ») et le calcule en fractions de
BigInt ; c'est le même arbre qui l'affiche, donc ce qui est montré est ce qui
est calculé. Le contrôle de contenu refait aussi les longueurs et le
parallélisme sur la figure, les triangles semblables par leurs angles, le
coefficient k par les côtés homologues, et vérifie que chaque longueur écrite
dans un énoncé est celle que la figure dessine. Il a été vu en échec sur huit
cassures volontaires du sujet.

## Entraîne-moi : Merlin invente, l'appli vérifie

La carte 🎯 : Evan choisit un point — « le papillon », « parallèles ou pas ? »,
« puissances de 10 », « rédiger un calcul de longueur »… — ou le dit avec ses
mots, et Merlin lui propose des exercices un par un. Un cran plus difficile
après deux réussites, un cran plus simple après une erreur, en visant l'erreur
qu'il vient de faire. Le niveau est décidé par l'appli.

Le garde-fou : **Merlin ne donne jamais la réponse.** Il choisit la nature de
l'exercice et ses nombres ; c'est l'appli qui écrit l'énoncé, trace la figure et
calcule la réponse ([`js/entrainement.js`](js/entrainement.js)). Un exercice
qu'elle ne sait pas vérifier — une longueur qui ne tombe pas juste, un triangle
impossible, un calcul qui ne se lit pas, un exercice qui sort du point choisi —
repart chez Merlin avec la raison du refus, deux fois au plus. Les rapports de
« parallèles ou pas ? » se comparent en fractions exactes : 20,01/20,02 et
20,02/20,03 ne sont pas égaux, même si un calcul approché les confond. La
phrase d'accueil de Merlin s'affiche avant la réponse d'Evan : si elle contient
un nombre du résultat ou la conclusion, elle est retirée.

En calcul littéral, Merlin donne l'expression ; l'appli l'affiche telle
qu'elle l'a lue — rien d'autre qu'une expression ne peut passer — et calcule
la forme développée réduite. Pour factoriser, où le corrigé ne se calcule pas,
elle vérifie celui que Merlin propose : égal à l'expression, et complet —
2x(6x − 4) pour 12x² − 8x est refusé. Il doit aussi relever du programme de
3e : un facteur commun (un nombre, une lettre, une parenthèse) ou une identité
remarquable, y compris sur une parenthèse — (2x + 1)² − 16, comme sa fiche.
Le facteur commun peut être caché, si un geste de 3e le fait apparaître :
(x + 3)(x − 1) + x² − 9, où x² − 9 = (x − 3)(x + 3). x² + 5x + 6 =
(x + 2)(x + 3) est juste, mais pas un exercice pour lui. L'expression reste
du second degré telle qu'elle est écrite — (x + 1)³ − x³ est refusée, même si
le cube s'en va —, à quatre termes au plus, et ne multiplie pas plus de deux
binômes. « Réduire » n'est jamais un produit de parenthèses, et une réponse
qui serait un exemple de l'aide est refusée.
Une équation produit nul doit avoir des facteurs du premier degré, aucun nul,
et l'appli en calcule les solutions.

Les questions de calcul littéral de l'épreuve blanche restent neuves :
Entraîne-moi refuse un exercice qui en serait une, même réécrite —
(x + 4)(2x − 3) pour (2x − 3)(x + 4) — ou prise à l'envers : développer
(5x − 7)(5x + 7) montrerait la réponse de B12. En calcul littéral, la phrase
d'accueil de Merlin est retirée dès qu'elle contient une écriture
mathématique ou parle de solution, de résultat, de ce que « vaut » quelque
chose : la réponse s'y écrit avec les nombres de l'énoncé, 6(x + y) pour
6x + 6y.

Une demande hors de ses cours reçoit une phrase, pas un exercice. Après une
erreur, Merlin explique ; les rédactions, il les corrige
critère par critère, comme dans « Rédiger ». Le suivi parents compte les
exercices faits et réussis, point par point.

Sans clé, la section le dit et renvoie à l'adulte : ici, c'est Merlin qui
invente.

## L'unité n'est pas le chapitre, c'est le savoir-faire

« Multiplier deux nombres relatifs », « Déterminer le signe d'un produit de
plusieurs facteurs » — un verbe et un objet. C'est le découpage commun à
Sésamath, iParcours et aux cahiers : 3 à 9 par chapitre, 120 pour tout le
cycle 4. C'est ce qu'on écrit, ce qu'on suit dans le profil de l'élève, et ce
que le récap parents nomme.

Chaque savoir-faire suit l'ordre d'un vrai chapitre :
**Découvrir · Le cours · Par cœur · La méthode · S'entraîner · Des problèmes ·
Rédiger · Se tester.** Une section n'apparaît que si le savoir-faire en a le
contenu : « Par cœur » et « Rédiger » n'existent que là où le cours a un énoncé
à retenir ou une démonstration à écrire.

## L'élève produit sa réponse

Le comptage tranche le débat : sur 1 049 verbes de consigne relevés dans le
manuel Sésamath du cycle 4, *calculer* pèse 21 %, *construire* 11 %,
*compléter* 6,5 %, *démontrer* 3,9 % — et le **QCM environ 5 %**, cantonné à la
fin de chapitre. Une application en QCM ne ressemble pas à un manuel.

Ici l'élève **tape** sa réponse : calculer, compléter un calcul à trous,
déterminer un signe, juger la plausibilité d'un résultat, trouver la ligne
fausse d'un calcul, réfuter une affirmation par un contre-exemple, décomposer
en facteurs premiers, simplifier une fraction, comparer, résoudre un problème
à étapes.

Et au chapitre 7, le plus exigeant : **écrire une expression**. « Développe
2(x + 5) » n'a pas de bonne réponse à reconnaître, il faut la produire.
L'application vérifie l'**équivalence** en remplaçant la lettre par plusieurs
nombres, pas la ressemblance des écritures : `10 + 2x` vaut `2x + 10`. C'est la
voie qu'a prise Sésamath pour son propre moteur — un calcul formel complet
pèserait 2 Mo pour un gain nul à ce niveau.

Une saisie que le moteur ne sait pas lire renvoie « je n'arrive pas à lire
cette écriture », **jamais « faux »** : compter une réponse fausse à cause
d'une limite du logiciel punirait l'élève de notre code.

## Les réponses fausses portent le diagnostic

Renoncer au QCM ne veut pas dire renoncer à savoir *pourquoi* l'élève s'est
trompé. Chaque exercice déclare les réponses fausses **prévisibles** et la
confusion qui les produit.

Taper 21 pour `(−7) × 3`, c'est appliquer la règle des signes à l'envers ;
taper −4, c'est avoir additionné. L'application ouvre alors le dialogue sur
**cette** confusion — sans jamais avoir affiché la mauvaise réponse, ce qu'un
QCM est obligé de faire. Quand l'erreur n'était pas prévue, l'appli ne devine
pas : elle donne la réponse et la règle.

Chaque confusion porte un **geste de contrôle** que l'élève peut refaire seul :
« compte les facteurs négatifs », « multiplie ta réponse par le diviseur ».
C'est ce qui reste quand l'appli n'est plus là.

## Réfuter, pas cocher

Aux affirmations fausses, répondre « faux » ne suffit pas : l'élève doit
**produire un contre-exemple**, et la validation vérifie une *propriété*, pas
une réponse mémorisée. Pour « le produit de deux nombres est toujours plus
grand que chacun d'eux », tout couple dont le produit est inférieur aux deux
facteurs est accepté.

## Ce qui est dit honnêtement

Le produit de deux nombres négatifs n'a pas d'explication concrète — les
dettes et les gains expliquent l'addition, pas le produit, et il a fallu plus
de mille ans aux mathématiciens pour l'admettre. L'activité de découverte le
fait donc apparaître comme la seule prolongation cohérente d'une suite, et le
cours dit à l'élève qu'il peut mémoriser la règle sans chercher à la « voir »
plutôt que de lui vendre une image fausse.

## Par cœur, et rédiger

Le manque le plus net de la première version : Evan appliquait Thalès sans
savoir l'énoncer, et une copie de 3<sup>e</sup> se juge autant sur la rédaction
que sur le résultat. Deux sections y répondent.

**Par cœur.** Les énoncés du chapitre — définitions, théorème, réciproque,
contraposée, k, k², k³ — à écrire **de mémoire**, pas à reconnaître dans une
liste : retrouver un énoncé est ce qui le fixe, le relire donne seulement
l'impression de le savoir. Ils sont réunis en tête du chapitre, sous
« 📜 À savoir par cœur », avec l'état de chacun : à écrire, en cours, à revoir,
su. Ouverts depuis cette liste, ils s'enchaînent d'un bout à l'autre du
chapitre, et la série complète compte pour une séance. « Su » veut dire trois
fois juste, sans indice, sur au moins deux séances — la règle du reste de
l'appli.

**Rédiger.** Des exercices où l'élève écrit toute la démonstration : le cadre
(« On sait que… »), le théorème cité, les égalités, le remplacement, le calcul,
la conclusion avec l'unité. La correction se fait critère par critère, puis la
rédaction modèle du cours s'affiche. Le théorème cité compte : Thalès pour
calculer, la réciproque pour prouver un parallélisme, la contraposée pour le
réfuter.

**Le copier-coller est refusé** : coller, glisser-déposer, et tout bloc de plus
de 25 caractères arrivé d'un coup — ce que produit la suggestion du
presse-papiers d'un clavier de téléphone. Annuler (Ctrl+Z) reste permis :
l'historique ne contient que ce qu'il a tapé. C'est un rideau, comme le code
parental : rien n'empêche de recopier son cours en le lisant. La copie coûte
seulement autant que l'écriture.

**Merlin classe, l'appli tranche.** Avec une clé, Merlin lit ce qui est écrit
et classe chaque élément de la grille : présent, absent ou faux, avec une
phrase pour ce qui manque. Le verdict — su, presque, à revoir — est calculé par
l'appli à partir de ce classement, jamais laissé au modèle. Une réponse qui
oublie un élément ou en invente un est écartée, comme celle qui arrive après
que l'élève a quitté l'écran. Sans clé, ou si Merlin ne répond pas, l'élève
compare avec son cours et coche lui-même ce qu'il avait écrit.

## Merlin

Le professeur particulier. Quand une clé d'API est renseignée, c'est lui qui
répond après une erreur, à la place de l'explication préécrite — et il répond à
la **confusion précise** que l'élève a déclarée, pas à l'erreur en général. Le
temps qu'il réfléchisse, l'écran le dit plutôt que de faire clignoter une
réponse qu'on va remplacer.

**Sans clé, l'application fonctionne intégralement** avec les explications du
catalogue. Si l'appel échoue ou traîne, elles reprennent la main : la séance ne
s'interrompt jamais.

**Merlin connaît déjà l'élève.** La mémoire est en deux couches. La couche
*transversale* — comment il apprend, la longueur d'explication qu'il supporte,
le moment où il décroche — est stockée sous une clé dérivée de son prénom, la
**même que l'appli de français**. Toutes les pages de `rivaci.github.io`
partageant une origine, un élève qui a travaillé son français arrive en maths
avec un Merlin qui sait déjà comment lui parler. La couche *disciplinaire* —
ce qui résiste en maths, ce qui a déjà été essayé sans effet — ne se transfère
pas.

Les **chiffres** viennent toujours de la progression réelle, jamais du modèle :
sinon il inventerait des statistiques plausibles et fausses. Les **observations
qualitatives**, elles, ne peuvent venir que de lui.

Deux consignes propres aux maths : Merlin ne donne **jamais** le résultat d'un
exercice — le benchmark a montré que la ligne de partage chez les élèves est
nette entre l'outil de vérification et le contournement — et quand une règle n'a
pas d'explication concrète, il le dit franchement au lieu d'inventer une image
avec des dettes qui ne tient pas.

**La discussion.** Une explication qu'on ne peut pas questionner reste un texte :
après avoir répondu, Merlin laisse un champ pour lui demander autre chose. Elle
n'apparaît qu'**après** qu'il a répondu — donc après que l'élève a cherché,
répondu, et dit pourquoi. C'est la règle qui empêche l'appli de devenir un
solveur avec des étapes en plus.

**La consolidation.** En fin de savoir-faire, un appel — et un seul — réécrit
la mémoire. Un par séance, pas un par erreur : le profil doit rester figé
pendant toute la séance, sinon la mise en cache du prompt est cassée à chaque
échange, ce qui coûterait dix fois plus cher pour un résultat moins bon.

Le moteur d'appel est dans [`commun/merlin.js`](../../commun/merlin.js) : c'est
la troisième application, donc le moment d'extraire plutôt que de recopier
600 lignes une deuxième fois. Ce qui reste ici est mince — les consignes
pédagogiques, la forme du contexte, les schémas de sortie.

### Où on le trouve

| Section | Merlin |
|---|---|
| Découvrir | « Je ne vois pas » → une relance vers ce qu'il faut observer |
| Le cours | « Je n'ai pas compris ce cours » → discussion |
| Par cœur | corrige l'énoncé écrit, élément par élément — sans le réécrire : le cours s'affiche après |
| La méthode | « Je n'ai pas compris une étape » → discussion |
| S'entraîner | après **toute** erreur — sur la confusion déclarée si elle est connue, sur demande sinon |
| Des problèmes | **coup de pouce gradué**, après une tentative |
| Rédiger | corrige la rédaction critère par critère, calculs refaits — sans rédiger à sa place |
| **Se tester** | **jamais** — c'est une auto-évaluation, l'aider la détruit |

L'erreur *non prévue* est le cas où Merlin sert le plus : c'est précisément
celui où aucune explication préécrite ne colle.

### L'aide graduée sur les problèmes

C'est l'endroit le plus utile et le plus risqué — celui où l'on est tenté de
faire faire. Trois garde-fous :

1. **Une erreur ne révèle pas la correction.** L'élève reste sur son énoncé
   avec ses réponses ; montrer la solution au premier échec rendrait toute
   aide inutile.
2. **Deux niveaux, pas trois.** Le premier pose une question qui fait relire
   l'énoncé, sans méthode ni nombre. Le second dit par quoi commencer —
   quelle opération, sur quelles données, et pourquoi — mais laisse le calcul
   à faire. Ensuite le bouton disparaît : il reste « Réessayer » et « Voir la
   correction ».
3. **Seule la première tentative compte**, dans les deux sens. Persévérer
   n'ajoute pas d'échec, et réussir après deux coups de pouce n'ajoute pas de
   réussite — sinon la maîtrise s'obtiendrait en demandant de l'aide, alors
   que la charte la définit comme la réussite sans filet.

Sur l'activité de découverte, le bouton dit « **Je ne vois pas** » plutôt que
« aide » : reconnaître qu'on bloque n'est pas le même geste que tendre la main
par réflexe.

## L'écran de suivi

Pour l'adulte, derrière le bouton **👪 Suivi**. Deux principes.

**On montre des types d'erreur, pas un score.** « Il confond la règle des
signes, tient au palier 1 et lâche au palier 3 » est actionnable ; « 62 % » ne
l'est pas. C'est aussi ce que permet le suivi par savoir-faire plutôt que par
exercice.

**Tout ce que Merlin a noté est lisible et supprimable.** Les trois listes —
ce qui marche, ce qui a été essayé sans effet, comment il apprend — s'affichent
en clair avec un bouton de suppression par note. Une IA qui tiendrait un
dossier illisible sur un enfant, non. La troisième liste est signalée comme
partagée avec les autres matières, parce que la supprimer ici la supprime aussi
pour le français.

La carte **Par cœur** dit, énoncé par énoncé, où il en est (« à revoir — juste
1 fois sur 3 ») et, rédaction par rédaction, combien d'essais et si elle a été
réussie. Elle couvre tous les chapitres, rangés sous leur titre, pas seulement
le dernier ouvert.

L'écran porte aussi les réglages de Merlin et son coût — jetons envoyés, dont
ceux relus en cache, et reçus.

**Le code parental** (4 à 8 chiffres, facultatif) met un rideau devant cet
écran. C'est un rideau et pas une serrure : sur un site statique, qui sait
ouvrir les outils du navigateur passe outre. Son rôle est d'éviter que l'enfant
tombe par hasard sur la liste de ses difficultés et sur ce que Merlin a noté de
lui — pas de protéger la clé d'API.

## Vérifier

```bash
node tools/verifier-contenu.mjs
```

Le contrôle refuse le contenu si une réponse attendue manque, si une réponse
déclarée fausse vaut en réalité la bonne, si un piège est inconnu, si un
savoir-faire n'a pas de geste de contrôle, si un lot d'items se réussit par
une stratégie de surface — tous les résultats du même signe, un « plausible »
dont la réponse est toujours « non » — ou si un contre-exemple ne peut être
satisfait par aucun couple. Il refuse aussi un piège, un cours, une méthode,
une rédaction ou un exemple donné à Merlin qui contiendrait la réponse d'un
exercice de calcul littéral ou d'une question de l'épreuve.

Pour « Par cœur » et « Rédiger », il exige une grille — deux éléments au moins
pour un énoncé, trois critères pour une rédaction, dont un obligatoire — et une
rédaction modèle d'au moins trois lignes. Il refait sur la figure le résultat
qu'une rédaction annonce : longueur, parallélisme, triangles semblables.

```bash
node tools/tester-moteur.mjs
```

Teste le moteur de vérification numérique d'expressions littérales. Il
teste aussi les figures — les longueurs qu'elles dessinent, et qu'aucune
longueur écrite n'y soit barrée par un trait ou par le nom d'un point, à la
taille du texte sur téléphone — et la correction des écrits : le verdict, les
réponses de Merlin écartées, le collage.

Il teste enfin le calcul exact (les priorités, −3², les fractions, l'écriture
scientifique, ce qui est refusé), le calcul littéral (les exercices de la
fiche, les trois formes — réduite, développée, non développée —, la
factorisation complète ou non, les solutions d'un produit nul et les erreurs
reconnues, et chacun des cas relevés par la deuxième et la troisième
relecture), la note de
l'épreuve — la copie parfaite fait
20, la copie blanche 0, la bonne conclusion avec le mauvais théorème la moitié —,
le bilan de Merlin écarté quand il est mal formé, et les exercices
d'« Entraîne-moi » : ceux qui doivent passer, ceux qui doivent être refusés, et
la bonne réponse dans chaque configuration de parallélisme, désordre compris.

## Technique

Site statique, sans étape de build, sans compte, sans serveur. Les données
restent sur l'appareil.

**MathLive** (MIT, dans `vendor/`) assure à la fois l'affichage des formules et
— à partir du calcul littéral — la saisie d'expressions. C'est le choix qu'ont fait
les deux projets libres français qui ont résolu ce problème, MathALÉA et le
moteur de Mathenpoche. La documentation recommande d'y ajouter KaTeX pour
l'affichage, mais MathLive embarque déjà les polices KaTeX : prendre les deux
paierait deux fois 280 Ko de fontes pour un rendu identique.

Le fichier est renommé `.js` alors que le paquet le livre en `.mjs` : beaucoup
de serveurs statiques ne connaissent pas cette extension et la servent en
`text/plain`, que les navigateurs refusent d'exécuter comme module.

## Ce qui manque encore

Pas de dialogue avec Merlin — les explications sont préécrites. Pas de
sauvegarde partagée avec les autres applications, pas de
rituel d'automatismes en répétition espacée, et trois chapitres sur seize.
