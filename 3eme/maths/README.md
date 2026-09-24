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
réussie.

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

Pour « Par cœur » et « Rédiger », il exige une grille — deux éléments au moins
pour un énoncé, trois critères pour une rédaction, dont un obligatoire — et une
rédaction modèle d'au moins trois lignes. Il refait sur la figure le résultat
qu'une rédaction annonce : longueur, parallélisme, triangles semblables.

```bash
node tools/tester-moteur.mjs
```

Teste le moteur de vérification numérique d'expressions littérales : il servira
au chapitre 7, où l'élève saisira des expressions et non plus des nombres. Il
teste aussi les figures — les longueurs qu'elles dessinent, et qu'aucune
longueur écrite n'y soit barrée par un trait ou par le nom d'un point, à la
taille du texte sur téléphone — et la correction des écrits : le verdict, les
réponses de Merlin écartées, le collage.

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
