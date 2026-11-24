# Littérature 3<sup>e</sup> — réviser les cours de français avant le contrôle

Evan révise les **cours de littérature** de français, un chapitre par cours :
trois **séances** de douze minutes, à faire d'affilée ou une par jour, puis un
**contrôle blanc**. Le premier chapitre, l'autobiographie, tient en
**45 minutes** : Evan l'a demandé pour bachoter seul avant un QCM.

C'est le moteur de sa technologie ([`3eme/technologie/`](../technologie/)),
lui-même repris de sa physique-chimie, de sa SVT, de son histoire et de son
espagnol. C'en est la neuvième copie : l'extraction du moteur dans
[`commun/`](../../commun/) est due, mais elle touche toutes ces applis. Elle
se fera hors d'une période de contrôles.

## Les chapitres

| Chapitre | Séance | Ce qu'on y révise | Durée |
|---|---|---|---|
| 1 · *L'autobiographie* | 1 | Le mot (autos, bios, graphein ; 1800, 1829) · Lejeune, le récit rétrospectif, le pacte autobiographique · Les récits de vie (Mémoires, journal, biographie, roman autobiographique…) · Égocentrisme, égoïsme, égotisme, individualisme, introspection | 12 min |
| | 2 | L'écriture de soi de Delphes au XXe siècle · Les titres, leurs auteurs, leurs dates · Les treize extraits du cours : qui a écrit quoi | 12 min |
| | 3 | Les destinataires et les raisons d'écrire · La mémoire, la sincérité, l'exactitude · Journal et autobiographie, les déclencheurs du souvenir, « je » narré et « je » narrant, qui dit « je » · Les grands thèmes | 12 min |
| | Contrôle blanc | 18 questions des trois séances, sans indice | 9 min |

D'après le polycopié « Mise au point sur l'autobiographie » transmis par
Denis. La fiche de l'appli résume en notes, sans recopier le polycopié (le
dépôt est public). Les citations viennent d'auteurs du domaine public
(Montaigne, Pascal, Rousseau, Chateaubriand, Gide, Stendhal, Baudelaire) ; les
œuvres récentes (Sartre, Leiris, Perec, Sarraute…) sont décrites, jamais
citées.

Le polycopié est suivi, même là où on discuterait : « égoïsme » au sens de
« parler trop de soi », *Mémoires d'une jeune fille rangée* parmi les romans
autobiographiques. Deux coquilles sont corrigées (*W ou le souvenir
d'enfance*, Anne Frank), et Duras parle d'elle « à la 3e personne » plutôt
qu'en disant « il ».

## Ce qui est propre à la littérature

Evan aura un **QCM** : les questions sont surtout des **QCM** — qui a écrit
quoi, quand, quel siècle, quel genre, quelle citation —, plus le
**vocabulaire** à retrouver, avec les confusions du cours reconnues et
expliquées (égoïsme et égotisme, « je » narré et « je » narrant, surimpression
et mise à distance, biographie et autobiographie, épigraphe et incipit), et une
**chronologie** à remettre dans l'ordre. Pas de réponse rédigée : l'accueil ne
parle de Merlin que si un chapitre en a.

Les tests vérifient que chaque question dit la même chose que sa fiche : le
siècle de chaque auteur dans le tableau de l'histoire, l'auteur et la date de
chaque titre, le genre de chaque exemple de récit de vie, l'auteur de chaque
extrait, le déclencheur de chaque souvenir.

Le reste est le moteur de la technologie : au contrôle blanc, la définition
d'un mot devient un QCM ; ce qui est raté revient en fin d'étape, puis dans
« À revoir ».

La progression est rangée sous `litt3e.progres.v1` ; les identifiants
d'items ne se renumérotent jamais.

## Ajouter un chapitre

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 1, et
   l'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`.
2. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```
