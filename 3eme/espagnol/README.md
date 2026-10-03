# Espagnol 3<sup>e</sup> — chaque unité en une heure

Evan est en 3e, troisième année d'espagnol (LV2). Chaque unité du manuel est
reprise **au fil des cours**, en **une heure au plus** : c'est la limite posée
par ses parents, l'unité étant dense. Elle est découpée en **trois séances**,
une par leçon, à faire d'affilée ou une par jour, puis un **contrôle blanc**.

C'est l'appli d'espagnol 5e d'Antonin ([`5eme/espagnol/`](../../5eme/espagnol/)),
reprise et étendue. Deux applis d'espagnol, c'est encore une copie assumée ;
à la troisième, le moteur (comparer, tour, voix, écrit) remontera dans
[`commun/`](../../commun/).

## L'unité 1 : « Gente creativa »

D'après les pages 10 à 23 du manuel et la liste des objectifs de
l'« Evaluación de secuencia » donnée par la professeure.

| Séance | Étapes | Durée |
|---|---|---|
| 1 · Lección 1, *Mis cosas* | Les objets · La Frida-Catrina (matériaux, Día de Muertos) · *Desde hace…* (la durée, lo / la / los / las) · Écrire : mi objeto favorito | ~18 min |
| 2 · Lección 2, *La ropa y las compras* | La ropa · *Se lo doy* (COI, COI + COD) · De compras (este / ese, qué / cuál / cuánto, llevar / llevarse, poner / ponerse) · Écrire : en la tienda | ~18 min |
| 3 · Lección 3, *Frida Kahlo* | Frida Kahlo · El camión · *No solo…, sino que* · Écrire : un personaje de El camión | ~16 min |
| Contrôle blanc | 15 questions tirées de toute l'unité, sans indice | ~8 min |

L'artisanat (« La Ventana », p. 22-23) n'est pas dans la liste de l'évaluation :
il n'est pas repris. Les démonstratifs s'arrêtent à *este* et *ese*, comme la
première leçon du manuel (« Les démonstratifs (I) »).

## Ce qui change par rapport à la 5e

- **Des séances.** Chaque étape porte sa séance ; l'écran de l'unité les
  regroupe, et la fin d'une séance propose une pause.
- **Remettre les mots dans l'ordre** (type `ordre`), comme l'exercice
  « Reorganiza las palabras » du livre : la place du pronom — *¿Me los puedo
  probar?* — s'apprend en la construisant. Les mots sont mélangés à l'ouverture
  de la question.
- **Transformer une phrase** (type `transformer`) : remplacer par des pronoms,
  passer de *desde hace* à *hace … que*, relier avec *no solo…, sino que*. Les
  erreurs prévues sont expliquées — *le lo doy*, *regalasela* sans accent,
  *pero* au lieu de *sino que*.
- **Des questions de culture** (QCM sans blanc) : le Día de Muertos, Frida
  Kahlo, El camión. Les options sont mélangées à chaque affichage.
- **« sólo »**, l'ancienne graphie, est accepté comme *solo*.
- **Trois écrits corrigés par Merlin**, critère par critère, avec le texte
  d'Evan corrigé au plus près et un exemple. Sans clé, il se corrige avec
  l'exemple. Le **copier-coller est refusé** dans la zone d'écriture, comme
  dans ses écrits de maths. Merlin n'a pas d'écran de réglage ici : sa clé se
  règle dans l'appli de maths 3e du même appareil.

Le reste est celui de la 5e : la fiche d'abord, puis des questions où il écrit
l'espagnol ; juste, presque (accent, ñ, article) ou faux ; ce qui est raté
revient en fin d'étape, puis dans « À revoir ».

La progression est rangée sous `espagnol3e.progres.v1` ; les identifiants
d'items ne se renumérotent jamais.

## Ajouter une unité

1. Écrire `js/data/unidades/uNN-titre.js` sur le modèle de l'unité 1 : des
   séances, des étapes (fiche + items), un contrôle blanc, une heure au total.
2. L'ajouter à `UNIDADES` dans `js/data/unidades/index.js`.
3. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```

Le premier rejoue chaque réponse attendue contre le moteur de correction,
vérifie qu'aucune erreur prévue ne recouvre une réponse acceptée, qu'une phrase
à remettre dans l'ordre se construit avec exactement les mots donnés, qu'une
séance tient en vingt minutes et l'unité en une heure. Le second teste le
moteur lui-même : ce qu'il accepte, et surtout ce qu'il refuse.
