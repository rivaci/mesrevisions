# Histoire 3<sup>e</sup>, section internationale — chaque chapitre au fil des cours

Evan est en 3e en section internationale : il suit l'histoire **en anglais**.
Chaque chapitre du cours est repris **au fil des cours**, en **une heure au
plus**, comme son espagnol : une **séance** par partie du cours, à faire
d'affilée ou une par jour, puis un **contrôle blanc**.

C'est le moteur de l'appli d'espagnol 3e ([`3eme/espagnol/`](../espagnol/)),
repris pour l'histoire. C'en est la troisième copie, après l'espagnol 5e : le
moment, annoncé dans le README de l'espagnol, de remonter le moteur (comparer,
tour, voix, écrit) dans [`commun/`](../../commun/). Ce n'est pas fait ici, pour
ne pas toucher aux deux applis d'espagnol en pleine période de contrôles.

## Le chapitre 1 : « From an armed peace to the Great War »

D'après le cours d'Evan, transcrit, et le cahier de textes de la dernière
séance (« Nationalisms »). Le cours transcrit s'arrête au début de « Trench
warfare » : la guerre des tranchées n'est reprise que par sa date.

| Séance | Étapes | Durée |
|---|---|---|
| 1 · Part 1, *The causes of the war* | Key words · 19th-century imperialism · The armed peace · Nationalisms, et le déclencheur · War aims · Écrire : *the causes* | ~20 min |
| 2 · Part 2, *1914: the war begins* | The war of movement (le plan Schlieffen, la Marne) · Chronology · Écrire : *the Schlieffen Plan* | ~12 min |
| Contrôle blanc | 15 questions de tout le chapitre, sans indice | ~8 min |

Là où le cours s'écarte des manuels, l'appli suit le cours, puisque c'est lui
qui est évalué :

- il écrit « Austro-Hungary » ; *Austria-Hungary* est accepté aussi ;
- il situe l'arrêt allemand à la Marne « about 80 km from Paris » (les manuels
  disent plutôt une quarantaine de kilomètres) ;
- il appelle aussi la Triple Entente « Entente Cordiale » (au sens strict,
  l'accord franco-britannique de 1904) : la fiche le signale, rien ne le
  demande.

L'Alsace-Lorraine est nommée dans la fiche, mais pas demandée : le cours ne
dit que « the territories lost in 1870 ».

## Ce qui change par rapport à l'espagnol

- **Des termes à retrouver en anglais** (type `terme`) : le mot français, il
  écrit l'anglais. Au contrôle blanc, le premier terme de chaque étape tirée est
  posé à l'envers, en QCM. Les articles (*the*, *a*, *an*) ne comptent pas.
- **Des questions de cours** (type `reponse`), à réponse courte. Un nom propre
  mal orthographié (*Sarajevho*, *Schliefen Plan*) est « presque » ; une date,
  jamais : *27 June 1914* est faux.
- **Les erreurs prévues** sont expliquées : *massacre* pour 1915–1917 (le cours
  dit *genocide*), *revanche* au lieu de *revenge*, *plan Schlieffen* à la
  française.
- **Remettre les événements dans l'ordre** (type `chrono`) : il les touche du
  plus ancien au plus récent, et la correction redonne chaque date.
- **Deux paragraphes en anglais corrigés par Merlin**, critère par critère.
  C'est l'histoire qui est évaluée : les fautes d'anglais sont corrigées dans
  le paragraphe rendu, sans compter. Merlin suit le cours tel que le décrit le
  profil du chapitre, écarts compris. Le **copier-coller est refusé**. Sans
  clé, il se corrige avec l'exemple ; la clé se règle dans l'appli de maths 3e
  du même appareil.

Le reste est celui de l'espagnol : la fiche d'abord ; juste, presque ou faux ;
ce qui est raté revient en fin d'étape, puis dans « À revoir » ; un « presque »
vaut un demi-point au contrôle blanc.

La progression est rangée sous `histoiresi3e.progres.v1` ; les identifiants
d'items ne se renumérotent jamais.

## Ajouter un chapitre

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 1 : un
   profil pour Merlin (avec les écarts du cours), des séances, des étapes
   (fiche + items), un contrôle blanc, une heure au plus. La fiche **résume**
   le cours en notes, sans le recopier : le dépôt est public.
2. L'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`.
3. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```

Le premier rejoue chaque réponse attendue contre le moteur de correction,
vérifie qu'aucune erreur prévue ne recouvre une réponse acceptée, qu'une
chronologie a ses dates, qu'une séance tient en vingt minutes et le chapitre
en une heure. Le second teste le moteur lui-même : ce qu'il accepte, et
surtout ce qu'il refuse — les dates d'abord.
