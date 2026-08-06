# Maths 4<sup>e</sup> — Vérifier son calcul littéral

**Prototype.** Une seule séance, faite pour être jouée par un élève réel avant
qu'on écrive la suite. Elle ne cherche pas à couvrir le programme : elle
cherche à savoir si la [charte pédagogique](https://github.com/rivaci/merlin)
tient devant un vrai élève de 13 ans.

## Le diagnostic

**L'élève calcule avec des lettres qui ne sont plus des nombres.** Ses règles
de calcul littéral sont des manipulations de symboles sans référent : il
accepte `a² = 2a`, et surtout il ne sait pas qu'on peut le *vérifier* en
essayant `a = 3`. Privé de moyen de contrôle, il ne peut ni choisir la bonne
règle ni détecter ses erreurs.

Ce n'est pas une intuition : c'est la typologie d'erreurs de la lignée Pépite
(Grugeon-Allys), et les données CEDRE montrent que la maîtrise technique
recule précisément là. TIMSS 2023 place le calcul algébrique parmi les
domaines les moins maîtrisés des élèves français de 4<sup>e</sup>.

## Ce qui la distingue d'un exerciseur

**Le contre-exemple est exécuté par l'élève, pas par l'écran.** Quand il
répond `a²` à « réduis `a + a` », l'appli ne corrige pas. Elle lui demande
d'abord *pourquoi*, par options correspondant à des confusions réelles. Puis
elle lui fait **calculer lui-même les deux valeurs** avec `a = 3` — il tape 9
et 6 — avant d'afficher le moindre verdict. Une substitution exécutée par la
machine serait une animation ; exécutée par lui, c'est un moyen de contrôle
qu'il emporte en contrôle, sans l'appli.

**Aucune correction fausse ne peut être publiée, et c'est prouvé.** Chaque
exercice porte deux transcriptions indépendantes : ce que vaut l'expression
affichée, et ce que vaut chaque réponse proposée.
`tools/verifier-contenu.mjs` les évalue sur six valeurs et refuse le contenu
si elles divergent. Un auteur qui affiche `2(x + 5)` et coche `2x + 5` est
attrapé par la machine — pas par une relecture attentive. C'est la réponse
directe à la plainte la plus virulente relevée contre les plateformes
existantes.

**Le témoin ne peut pas mentir.** `a = 2` ne réfute pas `a² = 2a` : les deux
valent 4. Le contre-exemple *confirmerait* l'erreur. Le contrôle interdit donc
−1, 0, 1 et 2, et exige que chaque distracteur ait sa propre valeur
discriminante — vérifiée par paire, parce qu'un témoin qui sépare le
distracteur A peut coïncider avec le B.

**La difficulté croît par interférence.** Le même piège est présenté au
registre numérique (`3²`, où le contrôle est encore disponible), puis en
littéral simple (`a × a`), puis avec un signe ou un facteur qui gêne
(`−2(x − 4)`), puis **sans que rien n'annonce quoi faire** — mélangé à de la
géométrie, avec des énoncés où l'outil ne s'applique pas.

**« Rien à faire » est une réponse de plein droit.** Et le contrôle vérifie
que les deux réponses coexistent à chaque palier : un lot où tout se réduit
apprendrait « transforme toujours », un lot où rien ne se réduit apprendrait
« réponds toujours rien à faire ». Le second motif est celui qu'on
fabriquerait sans y penser.

## Le rituel

Trois à cinq minutes d'automatismes du socle — relatifs, fractions — en
répétition espacée, avant le calcul littéral. Sans eux, chaque calcul de signe
consomme l'attention qui devrait aller à la règle.

Pas de chronomètre visible : la fluence vient de la reprise espacée, pas du
stress. Mais la latence est **mesurée en silence**, jamais affichée, parce que
réussir en recomptant sur ses doigts n'est pas un automatisme — et le récap
parents doit pouvoir le dire.

Une exception assumée, d'après Glaeser : le produit de deux négatifs n'a pas
de justification concrète (dettes et gains expliquent l'addition, pas le
produit). L'appli le dit tel quel — une convention justifiée par la cohérence
du calcul — plutôt que d'inventer un pseudo-sens.

## La mesure de maîtrise

Un piège n'est acquis qu'après **trois réussites consécutives, dans au moins
deux séances distinctes, au palier le plus élevé déjà rencontré** — et pour le
calcul littéral, ce palier est le palier *non étiqueté*. Sans cette dernière
condition, on déclarerait acquise une règle que l'élève n'exécute que quand la
consigne la lui souffle.

La répétition espacée se compte **en séances, pas en jours**. Et deux échecs
au même palier font redescendre d'un cran, dans un contexte neuf : sans
redescente, l'illusion de linéarité — qui « résiste même à un enseignement
ciblé » — enfermerait l'élève dans une boucle.

## Vérifier

```bash
node tools/verifier-contenu.mjs
```

```bash
node tools/tester-moteur.mjs
```

Le premier contrôle le contenu, le second contrôle le contrôleur : il vérifie
que `discrimine` **refuse** bien les valeurs qui mentent. Un validateur qui
passerait toujours ne prouverait rien.

## Ce que ce prototype ne fait pas encore

Pas de dialogue avec Merlin (les explications sont préécrites), pas de
sauvegarde partagée avec les autres applis, pas de récap parents, une seule
séance — donc **la répétition espacée ne se voit pas** : elle ne commence à
jouer qu'à la deuxième. Ce sont des manques assumés : on valide la mécanique
avant de construire autour.

## Ce qu'il faut observer chez l'élève-pilote

Les critères d'invalidation de la charte, dans l'ordre :

1. **Le contre-exemple devient-il un rituel de clics ?** S'il tape les deux
   nombres sans les regarder, le geste ne s'installe pas et il faut revoir la
   charte, pas le contenu.
2. **Le dialogue « pourquoi » tourne-t-il à vide ?** S'il choisit toujours
   « j'ai répondu au hasard » pour passer, les options ne décrivent pas ses
   confusions réelles.
3. **Le rituel est-il vécu comme une punition ?**
4. **La séance tient-elle en 10-15 minutes ?**
