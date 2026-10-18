# SVT 5<sup>e</sup> — chaque chapitre au fil des cours

Antonin reprend chaque chapitre de SVT **au fil des cours**, en **une heure au
plus** : une **séance** par partie, à faire d'affilée ou une par jour, puis un
**contrôle blanc**.

C'est le moteur de la SVT de son frère ([`3eme/svt/`](../../3eme/svt/)), lui-même
repris de leurs applis d'histoire et d'espagnol. C'en est la huitième copie :
l'extraction du moteur dans [`commun/`](../../commun/) est due, mais elle touche
toutes ces applis. Elle se fera hors d'une période de contrôles.

## Le chapitre 2 : « Volcans et séismes »

D'après le polycopié de SVT d'Antonin (« 5e - Volcanisme et séismes ») : le
chapitre 2, l'activité interne de la Terre. Le même polycopié commence par le
chapitre 1 (rappels de 6e : les conditions de la vie, l'échelle des temps
géologiques), qui n'est pas dans l'appli.

| Séance | Étapes | Durée |
|---|---|---|
| 1 · *La chaleur de la Terre, et deux sortes de volcans* | Le vocabulaire du volcan · Effusif ou explosif (le Piton de la Fournaise, la Soufrière de Montserrat, six volcans classés, la chaîne des Puys) · La naissance d'un volcan (deux exercices d'ordre) | ~11 min |
| 2 · *Comment se déclenche une éruption* | Du magma à l'éruption (le trémor, les étapes, la viscosité) · Rédiger : *effusif ou explosif* | ~9 min |
| 3 · *Les séismes* | Le vocabulaire (foyer, épicentre, magnitude, intensité…) · Intensité, magnitude, enregistrement (Arette, le sismographe, Kobé) | ~9 min |
| 4 · *L'origine des séismes* | Contraintes et failles · Rédiger : *un séisme, du foyer à l'épicentre* | ~8 min |
| Contrôle blanc | 19 questions de tout le chapitre, sans indice | ~10 min |

Les réponses des activités sont celles que donnent les « Bilans » du polycopié ;
l'ordre de la mise en place d'un volcan et celui des étapes d'une éruption se
déduisent de ses schémas et de son bilan 2. La fiche résume en notes, sans
recopier le polycopié (le dépôt est public).

Deux écarts du polycopié, vérifiés sur des sources et non repris : le séisme
d'Arette (1967) est dans les Pyrénées-Atlantiques, pas les « Pyrénées
orientales » (la réponse du polycopié vaut « presque », avec l'explication), et
il a fait quelques blessés, pas des centaines. Le mont Gerbier de Jonc est en
Ardèche, hors de la chaîne des Puys. Relu par un agent indépendant avant
publication.

Les confusions attendues ont leur message, dans les deux sens : magma et lave,
foyer et épicentre, magnitude et intensité, sismographe et sismogramme,
compression et distension.

## Ce qui change par rapport à la SVT d'Evan

- Merlin corrige comme pour un élève de **5e**, et connaît la démarche du cours
  d'Antonin : « On constate que… », puis « On en déduit que… ».
- La progression est rangée sous `svt5e.progres.v1` ; les identifiants d'items
  ne se renumérotent jamais.

Le reste est le moteur d'Evan : la fiche d'abord ; des définitions à retrouver
(et, au contrôle blanc, un mot à définir en QCM) ; juste, presque ou faux ; ce
qui est raté revient en fin d'étape, puis dans « À revoir » ; des étapes à
remettre dans l'ordre ; des réponses rédigées corrigées par Merlin, sans
copier-coller. Sans clé, Antonin se corrige avec l'exemple ; la clé se règle sur
la page commune [`commun/merlin.html`](../../commun/merlin.html), liée en bas de
l'accueil.

## Ajouter un chapitre

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 2, et
   l'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`.
2. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```
