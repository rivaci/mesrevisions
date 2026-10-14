# Géographie 3<sup>e</sup> — chaque chapitre au fil des cours

Evan reprend chaque chapitre de géographie **au fil des cours**, en **une heure
au plus** : une **séance** par partie, à faire d'affilée ou une par jour, puis
un **contrôle blanc**.

C'est le moteur de sa SVT ([`3eme/svt/`](../svt/)), lui-même repris de son
histoire et de son espagnol. C'en est la sixième copie : l'extraction du
moteur dans [`commun/`](../../commun/) est due, mais elle touche toutes ces
applis. Elle se fera hors d'une période de contrôles.

## Le chapitre 1 : « Les aires urbaines », l'exemple de Lyon

D'après les pages du manuel photographiées par Denis : le chapitre 11 du
manuel (« Les aires urbaines en France »), étude de cas « Une aire urbaine :
Lyon », p. 236 à 239. Les pages de cours du chapitre n'étaient pas dans les
photos : l'appli couvre l'étude de cas.

| Séance | Étapes | Durée |
|---|---|---|
| 1 · *Comment se manifeste l'étalement urbain ?* | Le vocabulaire · L'étalement de l'aire urbaine (cartes de 1975, 1999, 2020 ; la ville-centre ; Anse ; le périurbain) · Rédiger : *l'étalement urbain* | ~15 min |
| 2 · *Quelles sont les mobilités quotidiennes ?* | Les mobilités (transports, déplacements, la voiture à 68 %, les modes doux, le pont Raymond Barre, le e-Vélo'v) · Tout s'enchaîne · Rédiger : *les mobilités* | ~14 min |
| Contrôle blanc | 18 questions de tout le chapitre, sans indice | ~10 min |

Le manuel ne définit que deux mots, *aire urbaine* et *étalement urbain* ; les
autres définitions (ville-centre, banlieue, couronne périurbaine,
périurbanisation, mobilités, modes doux) sont celles du programme, en mots
simples. La fiche résume les documents en notes, sans recopier le manuel (le
dépôt est public). Les chiffres sont ceux des documents : c'est sur eux que
s'appuie un texte construit.

## Ce qui sert à la géographie

- **Le vocabulaire** : retrouver le mot d'une définition, et au contrôle blanc
  la définition d'un mot, en QCM. La confusion attendue, banlieue contre
  couronne périurbaine, est expliquée dans les deux sens.
- **Les documents** : chaque question dit d'où vient sa réponse (doc. 1, la
  carte des mobilités, la légende). Les chiffres n'ont aucune tolérance :
  32 % n'est pas une faute de frappe pour 30 %.
- **L'enchaînement** à remettre dans l'ordre : la voiture, l'installation loin
  du centre, l'étalement, les trajets, les aménagements.
- **Deux textes construits** corrigés par Merlin, ceux du « Parcours 2 » du
  manuel, critère par critère. Merlin attend des exemples tirés des
  documents. Le **copier-coller est refusé**. Sans clé, Evan se corrige avec
  l'exemple ; la clé se règle sur la page commune
  [`commun/merlin.html`](../../commun/merlin.html), liée en bas de l'accueil.

La progression est rangée sous `geo3e.progres.v1` ; les identifiants d'items
ne se renumérotent jamais.

## Ajouter un chapitre

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 1, et
   l'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`.
2. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```
