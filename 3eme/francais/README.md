# Français 3<sup>e</sup> — Au fil des cours

Reprendre chaque leçon de français de 3<sup>e</sup> **au fur et à mesure qu'elle
est vue en classe**, pendant qu'elle est encore fraîche : un rappel court, des
exercices en difficulté croissante, et une explication qui répond à l'erreur
précise de l'élève.

## L'ordre est celui du cours

Chaque leçon devient un **bloc**, ajouté quand elle vient d'être traitée en
classe. Les numéros de séance disent l'ordre d'écriture, pas une progression
imposée.

| Bloc | Leçon | Séances | Exercices |
|---|---|---|---|
| 1 | Les classes grammaticales | 4 | 81 (dont 25 en réserve) |

## Bloc 1 — Les classes grammaticales

La consigne de la professeure : réviser la nature des mots (nom, déterminant,
adjectif, pronom, verbe, adverbe, préposition, conjonction, interjection),
apprendre les définitions, et savoir **identifier la classe grammaticale des
mots dans une phrase** — un test est prévu en classe.

Quatre séances :

1. **Le nom, le déterminant et l'adjectif** — les mots du groupe nominal.
2. **Le verbe et le pronom** — celui qui se conjugue, celui qui remplace.
3. **Les mots invariables** — adverbe, préposition, conjonction, interjection.
4. **Le même mot, plusieurs classes** — le bilan avant le test, avec la méthode
   en quatre tests (conjuguer, mettre au pluriel, remplacer, sinon invariable).

Deux gestes, qui sont exactement ceux du contrôle : **toucher** le mot d'une
classe donnée dans la phrase, et **nommer** la classe du mot en gras.

### L'erreur visée

Pas une définition oubliée : classer un mot d'après son **sens** ou son allure
habituelle, au lieu de ce qu'il fait dans **cette** phrase. *Course* dit une
action mais c'est un nom ; *le* est d'ordinaire un déterminant, mais pas dans
*je le vois*. Chaque piège est une confusion entre deux classes, et les items
vont par paires (*un homme fort* / *le vent souffle fort*, *je leur ai prêté* /
*ils ont oublié leur ballon*) pour qu'aucun motif de surface ne remplace le test.

Les sept pièges : déterminant ou pronom · adjectif ou adverbe · nom ou verbe ·
le pronom qui ne ressemble pas à un pronom · *que* pronom relatif ou conjonction ·
préposition ou conjonction de subordination · conjonction de coordination ou
adverbe.

## Le moteur

C'est celui de l'application de français de 6<sup>e</sup>
([`6eme/francais`](../../6eme/francais/)), repris à l'identique : seules changent
les chaînes propres au niveau (titres, clés de stockage `francais3e.*`, consigne
de Merlin). Son fonctionnement — dialogue d'erreur par raisonnements, réserve
d'exercices pour les reprises, Défi de fin de bloc, clé d'API saisie par
appareil — est décrit dans le README de la 6<sup>e</sup>.

Les tests du moteur restent dans `6eme/francais/tools/tester-moteur.mjs` : ils
sont écrits contre le contenu de 6<sup>e</sup> et ne s'appliquent pas ici. Toute
modification du moteur doit donc être faite dans les deux copies et testée
côté 6<sup>e</sup>.

## Développement

Pas de build, pas de dépendance : modules ES servis tels quels.

```bash
node tools/verifier-contenu.mjs
```

Le vérificateur contrôle ce qui casse en silence : indices de mots hors du
tableau, bonne réponse absente des choix, piège inconnu, séance hors de son
bloc, réserve trop mince pour les reprises (au moins trois phrases par piège).
Il ne dit pas si la grammaire est juste — ça, c'est une relecture.
