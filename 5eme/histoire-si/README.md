# Histoire 5<sup>e</sup>, section internationale — chaque chapitre au fil des cours

Antonin est en 5e en section internationale : il suit l'histoire **en
anglais**. Chaque chapitre du cours est repris **au fil des cours**, en **une
heure au plus** : une **séance** par partie du cours, à faire d'affilée ou une
par jour, puis un **contrôle blanc**.

C'est le moteur de l'histoire SI d'Evan ([`3eme/histoire-si/`](../../3eme/histoire-si/)),
lui-même repris de l'espagnol. C'en est la cinquième copie (espagnol 5e et 3e,
histoire 3e, SVT 3e) : l'extraction du moteur dans [`commun/`](../../commun/)
est due, mais elle touche toutes ces applis à la fois. Elle se fera hors d'une
période de contrôles.

## Le chapitre 2 : « The Late Middle Ages »

D'après les deux diaporamas du cours (« Late Medieval England », « Hundred
Years' War ») et la liste du devoir sur table : *Edward I's reign*, *Peasants'
revolts*, *Beginning of the conflict*, *Charles VII's reign*. Le diaporama de la
guerre de Cent Ans, comme le cahier d'Antonin, s'arrête au premier point de la
partie sur Charles VII (*Charles, the Dauphin*) : la séance 4 s'arrête là aussi,
avec Reims, noté dans la marge du cahier. L'appli commence au chapitre 2, celui
du premier devoir.

| Séance | Étapes | Durée |
|---|---|---|
| 1 · *Edward I's reign* | Key words · Edward I, the barons and the Church · The Scottish war of independence · Écrire : *Edward I* | ~14 min |
| 2 · *The Peasants' Revolt* | Key words · The revolt of 1381 · What changed in the British Isles · Écrire : *the Peasants' Revolt* | ~13 min |
| 3 · *The beginning of the conflict* | Key words · A succession crisis in France · French expansion · English victories · Écrire : *why the war began* | ~15 min |
| 4 · *Charles VII's reign* | Charles, the Dauphin · Écrire : *the Dauphin* · Chronology (tout le chapitre) | ~10 min |
| Contrôle blanc | 19 questions de tout le chapitre, sans indice | ~8 min |

Hors séances, un **quiz des dates** (raccourci « 📅 » du chapitre, ~4 min, à
refaire autant de fois qu'il faut) : les 13 dates à retenir à chaque fois, dans
le désordre, une seule question par date, dans un sens ou dans l'autre. Pour
l'événement, il tape l'année ; pour l'année, il choisit l'événement ; les
siècles en QCM. Deux questions d'une même date ne tombent jamais dans le même
quiz : la première soufflerait la seconde. Les ratés reviennent en fin de quiz
et vont dans « À revoir ».

Là où le cours s'écarte des manuels, l'appli suit le cours, puisque c'est lui
qui est évalué. Quand l'écart porte sur un fait, la question dit *according to
your course* :

- c'est Richard II qui crée la *poll tax* en 1377 (la première est votée au
  début de 1377, encore sous Edward III) ;
- Edward III est battu à la bataille de Cassel en 1328 (à Cassel, Philippe VI
  battait les Flamands révoltés) ;
- Philippe VI lui réclame la Normandie et la Bretagne (l'Angleterre avait perdu
  la Normandie en 1204) ;
- les Anglais « reconquièrent » la Normandie en 1346 (l'année de Crécy) ;
- le cours écrit « John I » pour Jean sans Terre, et « Phillip » : les deux
  orthographes sont acceptées ;
- Henry V meurt « sans fils » en 1422 (son fils Henri VI, né en 1421, est
  proclamé roi de France par les Anglais) : la fiche le dit *your course says*,
  et aucune question ne le demande.

## Le chapitre 3 : « Population growth and its effects »

D'après le diaporama du cours : une activité sur deux documents (la population
mondiale de 1950 à 2050, la part des plus de 65 ans), « II – Different
demographic scenarios », « III – Management of resources » et la conclusion. Le
diaporama n'a pas de partie I : l'activité en tient lieu, séance 1.

| Séance | Étapes | Durée |
|---|---|---|
| 1 · *A growing world population* | Key words · The two documents · Write: *the world population* (questions 1 à 3 de l'activité) | ~13 min |
| 2 · *Different demographic scenarios* | Key words · Working force, dynamics, ageing · Write: *an ageing population* (questions 4 et 5) | ~13 min |
| 3 · *Management of resources* | Resources, consumption and waste, conclusion · Write: *people and resources* | ~10 min |
| Contrôle blanc | 16 questions, sans indice | ~8 min |

C'est le premier chapitre avec des nombres décimaux (2.5 billion) : la
normalisation ôtant le point, le moteur compare désormais les groupes de
chiffres, et « 25 billion » n'est plus une coquille de « 2.5 billion ».

## Ce qui change par rapport à l'histoire SI d'Evan

- **Les numéros de rois comptent comme des dates** : aucune tolérance.
  *Edward II* n'est pas une faute de frappe pour *Edward III*, c'est son père ;
  *John I* n'est pas *John II*. Les réponses qui confondent deux rois du
  chapitre (Edward I et Edward III, Wallace et Wat Tyler, Wallace et Robert the
  Bruce) ont leur message.
- **Les écrits sont courts** : trois ou quatre phrases, trois critères. Merlin
  corrige comme pour un élève de 5e ; c'est l'histoire qui est évaluée, et un
  fait juste absent du cours n'est jamais faux. Le **copier-coller est
  refusé**. Sans clé, il se corrige avec l'exemple ; la clé se règle sur
  la page commune [`commun/merlin.html`](../../commun/merlin.html), ouverte par le lien « 🎩 Merlin et clé d'API » en bas de l'accueil.
- **Les documents du cours** ont leurs questions : les pièces d'Edward I, l'arbre
  généalogique des prétendants, la carte de la France en 1330.

Le reste est celui d'Evan : la fiche d'abord ; des termes à retrouver en
anglais ; juste, presque ou faux ; ce qui est raté revient en fin d'étape, puis
dans « À revoir » ; les événements à remettre dans l'ordre ; un « presque » vaut
un demi-point au contrôle blanc.

La progression est rangée sous `histoiresi5e.progres.v1` ; les identifiants
d'items ne se renumérotent jamais.

## Ajouter un chapitre (ou la suite du chapitre 2)

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 2 (ou y
   ajouter une séance) : un profil pour Merlin, avec les écarts du cours, des
   séances, des étapes (fiche + items), un contrôle blanc, une heure au plus. La
   fiche **résume** le cours en notes, sans le recopier : le dépôt est public.
2. L'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`.
3. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```

Le premier rejoue chaque réponse attendue contre le moteur de correction,
vérifie qu'aucune erreur prévue ne recouvre une réponse acceptée, qu'une
chronologie a ses dates, qu'une séance tient en vingt minutes et le chapitre en
une heure. Le second teste le moteur lui-même : ce qu'il accepte, et surtout ce
qu'il refuse — les dates et les numéros de rois d'abord.
