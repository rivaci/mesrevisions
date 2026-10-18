# Physique-chimie 3<sup>e</sup> — chaque chapitre au fil des cours

Evan reprend chaque chapitre de physique-chimie **au fil des cours**, en **une
heure au plus** : une **séance** par partie, à faire d'affilée ou une par jour,
puis un **contrôle blanc**.

C'est le moteur de sa SVT ([`3eme/svt/`](../svt/)), lui-même repris de son
histoire et de son espagnol. C'en est la septième copie : l'extraction du
moteur dans [`commun/`](../../commun/) est due, mais elle touche toutes ces
applis. Elle se fera hors d'une période de contrôles.

## Le chapitre 1 : « La matière »

D'après les documents d'Evan : le diaporama du cours (les trois états, les
changements d'état, caractériser la matière, mélanges et corps purs), le TP
sur la masse volumique, la feuille d'exercices, et le TP sur la solubilité.
Les séances suivent l'ordre voulu par Denis.

| Séance | Étapes | Durée |
|---|---|---|
| 1 · *La masse volumique* | La formule et ses unités · Les conversions (dag, dg, dL, cL, m³…) · Le TP (balance, déplacement d'eau, proportionnalité) · La feuille d'exercices · Rédiger : *les deux ballons* | ~20 min |
| 2 · *La matière* | Les trois états · Les six changements d'état, le palier, la masse conservée · Corps purs et mélanges · Rédiger : *la courbe de chauffage* | ~17 min |
| 3 · *La solubilité* | Soluté, solvant, solution · Le TP et ses deux protocoles · Rédiger : *un protocole* | ~13 min |
| Contrôle blanc | 20 questions de tout le chapitre, sans indice | ~10 min |

Les exercices de la feuille sont repris avec leurs données, et chaque
résultat est **recalculé par les tests** (520 ÷ 28, 0,25 × 0,8, 4 ÷ 5…), comme
le tableau de proportionnalité du cours. La fiche résume en notes, sans
recopier les documents (le dépôt est public), et ne nomme pas le professeur
cité dans le TP.

Le cours appelle « condensation » le passage gaz → solide et « liquéfaction »
le passage gaz → liquide : on le suit, et la fiche prévient que la vie
courante dit « condensation » pour la buée.

## Ce qui est propre à la physique-chimie : les calculs

Un item qui porte un `nombre` attend un **résultat de calcul**. Le moteur lit
le nombre tapé quelle que soit son écriture — virgule ou point, espaces des
milliers, unité à la suite, et après le dernier « = » si Evan a posé son
calcul (« 520 ÷ 28 = 18,6 ») — et le juge à `ecart` près : 18,6 et 18,57 sont
justes pour 520 ÷ 28.

Mais **aucune tolérance de frappe** : les erreurs classiques sont des
**pièges** chiffrés, avec leur explication. Pour l'exercice 1, 1 857, c'est le
volume laissé en dL ; 1,857, la masse laissée en dag ; 0,054, la division à
l'envers. Pour 40 dg, 8 000 kg/m³, c'est 40 dg pris pour 40 g. Un calcul porte
son propre `indice` (« Convertis d'abord… ») : la première lettre d'un nombre
ne dit rien.

Le reste est le moteur de la SVT : le vocabulaire (et, au contrôle blanc, la
définition d'un mot en QCM), les protocoles à remettre dans l'ordre, et des
**réponses rédigées** corrigées par Merlin — justifier avec des valeurs,
décrire une courbe, écrire un protocole. Le **copier-coller est refusé**. Sans
clé, Evan se corrige avec l'exemple ; la clé se règle sur la page commune
[`commun/merlin.html`](../../commun/merlin.html), liée en bas de l'accueil.

La progression est rangée sous `pc3e.progres.v1` ; les identifiants d'items
ne se renumérotent jamais.

## Ajouter un chapitre

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 1, et
   l'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`. Un calcul :
   `nombre`, `ecart`, `indice`, et des `pieges` qui sont des nombres.
2. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```
