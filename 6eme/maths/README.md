# Maths 6<sup>e</sup> — Réviser vers la 5<sup>e</sup>

Révision du programme de mathématiques de 6<sup>e</sup>, organisée comme un
manuel : chapitre, savoir-faire, et pour chacun un cours, une méthode, des
exercices et des problèmes.

**En cours d'écriture.** Un chapitre est complet — **86 items** — et les suivants
sont planifiés ci-dessous.

| # | Chapitre | Savoir-faire | Items |
|---|---|---|---|
| 1 | Les nombres décimaux | 5 | 86 |

## D'où vient le programme

Le pack de rentrée de l'établissement ne contient **aucun programme de révision
en maths** — une seule matière en a un, l'histoire-géo. Le contenu suit donc le
programme officiel, et il faut savoir lequel : le programme de 6<sup>e</sup> a
été **refondu au BO du 17 avril 2025**, en vigueur depuis la rentrée 2025-2026.
C'est celui qu'Anto vient de suivre.

Deux conséquences qui changent le plan. L'**algèbre** entre en 6<sup>e</sup>,
mais pré-algébrique : motifs évolutifs, schémas en barre, inconnues exprimées
par des mots ou des dessins — le texte dit que « ce n'est qu'au cycle 4 que les
lettres seront introduites de manière formelle ». Le moteur d'équivalence
d'expressions littérales, hérité de l'appli de 4<sup>e</sup>, ne sert donc pas
ici. Et les **probabilités** entrent aussi, avec l'écriture `a/b` en situation
d'équiprobabilité.

## Pourquoi les décimaux en premier

Parce que c'est l'obstacle le mieux documenté du cycle 3, et parce qu'il
empoisonne tout le reste : un élève qui croit 2,54 > 2,7 se trompera aussi sur
les fractions, les aires et la proportionnalité, sans qu'on comprenne pourquoi.

La recherche en didactique nomme l'obstacle : l'élève transporte sur les
décimaux des règles vraies pour les entiers, et lit un décimal comme **deux
entiers séparés par une virgule**. Tout le chapitre est construit là-dessus, et
les six pièges du catalogue en découlent.

**La règle qui gouverne les comparaisons.** Un exercice où les parties entières
diffèrent ne teste rien : comparer 3,7 et 5,2 se réussit en comparant 3 et 5,
sans jamais toucher au concept. La recherche appelle ça des « réussites
fictives ». Toutes les comparaisons du chapitre ont donc la **même partie
entière**.

**Les items neutres** sont l'exception voulue : ceux où le piège ne joue pas —
une comparaison où le nombre le plus long *est* le plus grand, une
multiplication par un facteur supérieur à 1. Sans eux, l'élève apprend un motif
(« le plus court gagne ») au lieu de la règle.

## Ce que le moteur vérifie

`tools/verifier-contenu.mjs` ne juge pas la pédagogie. Il juge ce qui casse en
silence. Un contrôle a été ajouté pour cette application :

**L'antislash mangé par JavaScript.** Dans une chaîne à quotes simples,
`'\ldots'` vaut « ldots » : l'antislash tombe. Il en faut deux dans le source.
À l'écran, ça donne `2{,}7 ldots 2{,}54` — une formule crue, illisible, et
invisible à la relecture puisque le source a l'air juste.

Le piège est double, parce que JavaScript traite les commandes différemment
selon leur première lettre. `\ldots`, `\div`, `\sqrt` sont des échappements
**inconnus** : le mot survit entier. Mais `\times`, `\text`, `\frac` sont des
échappements **connus** — `\t` est une tabulation, `\f` un saut de page. « `\times` »
devient donc une tabulation suivie de « imes », et chercher « times » ne trouve
rien. Le contrôle traque donc les deux symptômes : le mot nu, et le caractère de
contrôle. Il est vérifié par un test négatif — on casse une commande, le
contrôle doit refuser.

## À écrire ensuite

Dans l'ordre des priorités pour entrer en 5<sup>e</sup> :

2. **Les fractions** — sens, comparaison, fraction d'une quantité, écritures
   (décimale, fractionnaire, pourcentage). Le prérequis direct de la 5<sup>e</sup>.
3. **Les quatre opérations et les priorités** — dont le calcul mental.
4. **La proportionnalité** — tableaux, coefficient, pourcentages, échelles.
5. **Grandeurs et mesures** — longueurs, aires, volumes, durées.
6. **Espace et géométrie** — configurations planes, vision dans l'espace.

## Développement

Site statique, sans étape de build.

```bash
python -m http.server 4173
```

```bash
node tools/verifier-contenu.mjs   # corrections, pièges, LaTeX, stratégies de surface
node tools/tester-moteur.mjs      # répétition espacée, vérification des réponses
```
