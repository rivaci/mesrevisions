# Maths 5<sup>e</sup> — Maîtriser le programme, chapitre par chapitre

Reprendre chaque chapitre de mathématiques de 5<sup>e</sup> **au fur et à mesure
qu'il est vu en classe**, pendant qu'il est encore frais : un cours, une
méthode, des exercices où l'on produit sa réponse, et des problèmes.

## L'ordre est celui du cours, pas celui d'un manuel

C'est la différence avec les autres applications du dépôt, qui couvrent un
programme fini pour réviser l'été. Ici on écrit un chapitre quand il vient
d'être traité en classe. Le numéro dit « premier écrit », pas « premier du
programme ».

| # | Chapitre | Savoir-faire | Items |
|---|---|---|---|
| 1 | Les opérations et leurs enchaînements | 7 | 189 |
| 2 | Paires d'angles et parallélisme | 4 | 100 |
| 3 | Nombres relatifs | 4 | 108 |
| 4 | Symétries | 4 | 108 |

La feuille de route est la liste des leçons de l'année donnée par la
professeure (onze chapitres, dont trois propres au parcours EIB, que suit
Antonin). Chaque chapitre s'appuie sur trois sources, dans cet ordre : le
cahier d'Antonin, la liste des attendus de la professeure, et ses copies
corrigées quand il y en a.

## Le chapitre 1 suit le cahier, pas un manuel

Le découpage en quatre savoir-faire reprend l'ordre exact de la leçon
d'Antonin : l'ordre de lecture entre opérations de même niveau, puis les
priorités (× et ÷ avant + et −), puis les parenthèses qui « changent l'ordre
naturel », puis les puissances et la remarque sur les groupements. Le
vocabulaire de sa leçon — somme, différence, produit — est dans le cours du
premier savoir-faire ; le quotient a été ajouté, sa page s'arrêtant après
« produit ».

Le fil n'est pas « apprendre les priorités ». C'est apprendre **quand l'ordre de
lecture est la bonne méthode et quand il ne l'est pas** — parce que l'élève
arrive avec une règle vraie depuis le CP, qui reste vraie la moitié du temps.
D'où deux familles d'erreurs opposées : appliquer l'ordre de lecture là où une
priorité l'interdit, et refuser un regroupement là où il est parfaitement
permis. Traiter une famille sans l'autre produit un élève qui se trompe
autrement — c'est pourquoi les items neutres alternent constamment entre les
deux situations.

## Ce que l'Interrogation 1 a changé au chapitre 1

La copie (15/20) a montré quatre faiblesses précises, et chacune est
maintenant travaillée, avec l'erreur d'Antonin reprise telle quelle comme
réponse fausse prévue :

- une chaîne de × et ÷ calculée en faisant la multiplication d'abord
  (`3 × 8 ÷ 4 ÷ 3 × 2`) : remarque de cours et exercices ; le calcul exact
  de la copie est à refaire étape par étape ;
- « le produit de 4 par la différence entre 12 et 7 » traduit `4 × 12 ÷ 7` :
  « différence » lue comme une division, et les parenthèses oubliées ;
- `5 + 2 × 3` lu « le produit de 2 et 3 par la somme de 5 » : un calcul
  porte le nom de l'opération faite **en dernier** ;
- placer soi-même des parenthèses pour rendre une égalité juste — le bonus,
  non tenté, attend au test.

La liste des attendus a ajouté trois savoir-faire : **nommer et traduire un
calcul**, la **distributivité simple**, et les **carrés à connaître**
(jusqu'à 15 en parcours EIB) avec le cube de 10.

## Le chapitre 2 a des figures

« Alternes-internes » ne se définit que par une position : le chapitre porte
sur la figure. `js/figure.js` trace deux droites coupées par une sécante (ou
deux droites qui se croisent), avec une **numérotation fixe** des angles —
1 à 4 autour de A, 5 à 8 autour de B — et les couleurs des feutres du cahier.

La figure sait ce qu'elle dessine : la nature d'une paire d'angles et la
mesure de chaque angle. Le contrôle de contenu s'en sert pour refuser un
exercice dont la réponse contredit sa figure (champs `paire`, `angleVise`,
`droitesParalleles`, et les mesures écrites sur la figure). Chacun de ces
contrôles a été vu en échec sur une cassure volontaire.

Ce chapitre utilise aussi un **QCM** (`type: 'choix'`), nouveau dans ce
moteur : les options sont propres à l'exercice, et les fausses sont les
erreurs prévues, chacune reliée à son piège. Le premier chapitre s'en sert
pour les traductions, où un champ numérique accepterait `20` à la place de
`4 × (12 − 7)`.

Deux points du cahier à vérifier : la définition des angles adjacents n'y
mentionne pas le **même sommet** (le cours de l'appli donne la définition
complète), et la figure sous-titrée « 2 angles adjacents et
complémentaires » semble montrer des angles posés sur une droite, donc
**supplémentaires**.

## Le chapitre 3 est écrit d'après la liste, avant le cahier

Les chapitres 1 et 2 partaient du cahier d'Antonin. À partir du chapitre 3,
ils sont écrits d'après la **liste de la professeure**, sans attendre la
leçon : chaque point de la liste devient un savoir-faire ou une partie de
savoir-faire. Quand les pages du cahier arriveront, le chapitre sera revu
pour coller à ses mots et à ses exemples, comme le chapitre 1 l'a été après
l'Interrogation 1.

Deux choix à connaître :

- **0 est à la fois positif et négatif**, « strictement » l'exclut : c'est la
  convention du collège. Aucun exercice ne demande donc le « signe » de 0 ;
  les questions sur 0 passent par des phrases à choisir.
- Une **inversion abscisse/ordonnée** donne les deux bons nombres dans le
  mauvais ordre : les champs ne peuvent pas la reconnaître à leurs valeurs.
  Elle est donc le piège par défaut des lectures de coordonnées, et les QCM
  la ciblent directement.

`js/figures-plan.js` trace les figures du plan — **droite graduée**,
**repère** et **triangle** (ce dernier servira aux chapitres 6 et 8). Comme
les figures d'angles, elles savent ce qu'elles dessinent : le contrôle de
contenu recalcule l'abscisse d'un point (`abscisseDe`), le point placé à
une abscisse (`lettreDAbscisse`), les coordonnées d'un point, en champs ou
en QCM (`coordonneesDe`), le point placé en (x ; y) (`lettreAux`), et
le symétrique, le milieu, l'angle d'un triangle et la droite remarquable
tracée. Chaque contrôle est vu en échec sur une cassure volontaire quand un
chapitre commence à s'en servir — les quatre premiers au chapitre 3.

## Le chapitre 4 : plier ou tourner

Les deux premiers savoir-faire sont les rappels du parcours EIB (symétrie
axiale, milieu, médiatrice), les deux suivants la symétrie centrale. Le fil
est le contraste entre les deux : un **pliage** le long d'une droite, un
**demi-tour** autour d'un point. Les QCM placent donc toujours, à côté du bon
symétrique, les deux points qu'on obtiendrait en pliant au lieu de tourner.

Le repère sait maintenant tracer un **axe (d)**, vertical ou horizontal
(champ `axe`). Le contrôle de contenu recalcule le symétrique par rapport à
cet axe ou à un centre, en QCM comme en champs, le milieu sur une droite
graduée, et dit si la droite tracée est bien la **médiatrice** annoncée
(`mediatriceDe` : il faut à la fois passer par le milieu et être
perpendiculaire). Ces contrôles ont été vus en échec sur huit cassures
volontaires.

Le centre des symétries centrales s'appelle **K** dans les figures : sur le
repère, la lettre O est déjà celle de l'origine.

Chaque savoir-faire a son propre fichier — ils font 350 lignes chacun, et un
fichier de 2 000 lignes n'est relisible par personne.

## L'unité n'est pas le chapitre, c'est le savoir-faire

« Multiplier deux nombres relatifs », « Déterminer le signe d'un produit de
plusieurs facteurs » — un verbe et un objet. C'est le découpage commun à
Sésamath, iParcours et aux cahiers : 3 à 9 par chapitre, 120 pour tout le
cycle 4. C'est ce qu'on écrit, ce qu'on suit dans le profil de l'élève, et ce
que le récap parents nomme.

Chaque savoir-faire a six sections, dans l'ordre d'un vrai chapitre :
**Découvrir · Le cours · La méthode · S'entraîner · Des problèmes · Se tester.**

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
| La méthode | « Je n'ai pas compris une étape » → discussion |
| S'entraîner | après **toute** erreur — sur la confusion déclarée si elle est connue, sur demande sinon |
| Des problèmes | **coup de pouce gradué**, après une tentative |
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
satisfait par aucun couple.

```bash
node tools/tester-moteur.mjs
```

Teste le moteur de vérification numérique d'expressions littérales : il servira
au chapitre 7, où l'élève saisira des expressions et non plus des nombres.

## Technique

Site statique, sans étape de build, sans compte, sans serveur. Les données
restent sur l'appareil.

**MathLive** (MIT, dans `vendor/`) assure à la fois l'affichage des formules et
— à partir du chapitre 7 — la saisie d'expressions. C'est le choix qu'ont fait
les deux projets libres français qui ont résolu ce problème, MathALÉA et le
moteur de Mathenpoche. La documentation recommande d'y ajouter KaTeX pour
l'affichage, mais MathLive embarque déjà les polices KaTeX : prendre les deux
paierait deux fois 280 Ko de fontes pour un rendu identique.

Le fichier est renommé `.js` alors que le paquet le livre en `.mjs` : beaucoup
de serveurs statiques ne connaissent pas cette extension et la servent en
`text/plain`, que les navigateurs refusent d'exécuter comme module.

## Ce qui manque encore

Pas de dialogue avec Merlin — les explications sont préécrites. Pas de
sauvegarde partagée avec les autres applications, pas de récap parents, pas de
rituel d'automatismes en répétition espacée, et un seul chapitre sur seize.
