# Espagnol 5<sup>e</sup> — chaque unité en trente minutes

Antonin commence l'espagnol en LV2. Chaque unité du manuel est reprise **au
fil des cours**, en une révision express de **trente minutes au plus** : c'est
la contrainte posée par ses parents, et elle décide de tout le reste.

## Une unité, six étapes minutées

| # | Étape | Ce qu'on y fait | Durée |
|---|---|---|---|
| 1 | La ropa | Les vêtements des encadrés « Ayuda », avec l'article | ~6 min |
| 2 | El físico | Le visage, le corps, les adjectifs et leurs contraires | ~7 min |
| 3 | Ser, tener, llevar | Conjuguer, et choisir le bon verbe pour décrire | ~6 min |
| 4 | El plural | Mettre au pluriel, tout accorder | ~4 min |
| 5 | Describir | Écrire deux descriptions, comme en interro | ~4 min |
| 6 | Mini-interro | Dix questions tirées des étapes 1 à 4, sans indice | ~3 min |

Chaque étape commence par sa fiche (une minute de lecture), puis des questions
où Antonin **écrit** l'espagnol. C'est le rappel qui fixe un mot, pas la
relecture : on lui fait produire « la gorra », on ne lui fait pas reconnaître.
La mini-interro glisse deux QCM à l'envers (espagnol → français) pour varier,
comme un vrai contrôle.

**Ce qui est raté revient** en fin d'étape, deux fois au plus. Seul le premier
essai compte pour la progression : un mot raté puis réussi trente secondes plus
tard n'est pas su. Il reste donc dans **« À revoir »**, la liste à reprendre
cinq minutes le lendemain matin — il n'en sort que réussi du premier coup lors
d'un tour suivant.

**« Toute la fiche »** rassemble le vocabulaire et la grammaire de l'unité, à
relire juste avant l'interro.

## Juste, presque, faux

Une réponse est comparée sans tenir compte de la casse ni de la ponctuation.
« Presque », c'est le mot su mais mal écrit, qui coûterait un demi-point en
interro :

- un **accent ou un ñ** oublié (« pantalon », « panuelo ») ;
- l'**article** oublié ou de l'autre genre (« vestido », « la vestido ») — le
  genre change souvent entre les deux langues : *el* vestido, *la* camiseta,
  *los* zapatos ;
- une réponse juste obtenue avec l'**indice**.

Chaque item peut porter des **erreurs prévues** (`pieges`) avec leur
explication : *camisa* pour le tee-shirt, *grande* pour une personne, *los
pelos*, *tienen* au lieu de *tenemos*. Elles passent avant la tolérance aux
accents, parce qu'elles disent pourquoi.

Un adjectif est juste au masculin, au féminin, ou avec les deux (« alto,
alta », « alto(a) »).

## Merlin corrige les descriptions

À l'étape 5, Merlin classe chaque critère (ser, tener, llevar, les accords) en
présent, absent ou faux, et rend le texte d'Antonin **corrigé au plus près**.
C'est l'appli qui en tire le verdict, comme pour les rédactions de maths 3e.

Merlin n'a pas d'écran de réglage ici : sa clé se règle dans l'appli de maths
5e (Suivi → « Merlin et clé d'API »), et toutes les pages du site partagent le
même stockage.
Sans clé, ou si Merlin répond de travers, Antonin compare avec le modèle et
coche ce qu'il a fait juste.

## Le contenu

`js/data/unidades/` contient une unité par fichier, dans l'ordre du manuel.
L'unité 2 suit les pages 28 à 31 (« Trajes de mil colores », « Los muertos
salen a la calle ») : tout le vocabulaire des encadrés « Ayuda », plus les mots
des textes. Les exercices du livre ont servi de modèles, mais **les phrases
sont écrites pour l'appli** : le dépôt est public, on n'y recopie pas le
manuel.

### Le module « Memoriza » de l'unité 2

Un second module de trente minutes (`u02-memoriza.js`), pour le contrôle sur
les pages « Memoriza » 36 et 37 : la liste de la professeure dit conjugaisons
des verbes réguliers, de *ser* et *tener*, du pronominal *llamarse*, et
comparatifs.

| # | Étape | Durée |
|---|---|---|
| 1 | Los verbos regulares — *hablar, comer, vivir*, et qui parle d'après la terminaison | ~7 min |
| 2 | Ser y tener — les deux irréguliers, et quand les employer | ~5 min |
| 3 | Llamarse y la negación — *me llamo…*, *no* devant le verbe et le pronom | ~4 min |
| 4 | Comparar — *más … que*, *menos … que* | ~4 min |
| 5 | Escribir — des phrases entières, corrigées par Merlin : se présenter avec *nosotros*, comparer deux animaux | ~7 min |
| 6 | Mini-interro — dix questions des quatre premières étapes | ~3 min |

Conjuguer une forme isolée ne suffit pas : à l'étape 5, Antonin écrit des
phrases entières, et Merlin les corrige critère par critère, comme les
descriptions. Ses consignes couvrent donc aussi les terminaisons, le pronom de
*llamarse* et le *que* des comparatifs, et chaque module lui envoie son propre
profil (`profilMerlin`) ; sans profil, c'est celui de « Describir ».

Les erreurs prévues portent sur ce qui se confond : *-emos* et *-imos*
(« vivemos »), *eres* et *es*, le « ie » de *tener* (« tienemos »), le
pronom oublié (« llamo » seul, qui vaut « presque »), « como » ou « de » après
*más*, « que mí » au lieu de « que yo ». Le pluriel, en haut de la page 36,
n'est pas dans la liste du contrôle : il est déjà dans l'étape « El plural »
du premier module.

Un QCM ou un trou peut porter sa propre `consigne` (« Pour dire « plus grand
que » : ») au lieu de « Choisis le bon verbe » ou « Complète avec le verbe… ».

Les identifiants d'items ne se renumérotent jamais : la progression y est
rangée (`espagnol5e.progres.v1`).

Les 🔊 lisent le mot avec la synthèse vocale du navigateur, en espagnol
d'Espagne. Le bouton disparaît si l'appareil n'a aucune voix espagnole — une
voix française apprendrait une fausse prononciation.

## Ajouter une unité

1. Écrire `js/data/unidades/uNN-titre.js` sur le modèle de l'unité 2 : des
   étapes (fiche + items), une mini-interro, trente minutes au total.
2. L'ajouter à `UNIDADES` dans `js/data/unidades/index.js`.
3. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```

Le premier rejoue chaque réponse attendue contre le moteur de correction,
vérifie qu'aucune erreur prévue ne recouvre une réponse acceptée, et que le
total ne dépasse pas trente minutes. Le second teste le moteur lui-même : ce
qu'il accepte, et surtout ce qu'il refuse.
