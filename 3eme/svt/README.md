# SVT 3<sup>e</sup> — chaque chapitre au fil des cours

Evan reprend chaque chapitre de SVT **au fil des cours**, en **une heure au
plus**, comme son espagnol et son histoire : une **séance** par grande partie
du cours, à faire d'affilée ou une par jour, puis un **contrôle blanc**.

C'est le moteur de l'appli d'histoire SI ([`3eme/histoire-si/`](../histoire-si/)),
repris pour la SVT. C'en est la quatrième copie (espagnol 5e, espagnol 3e,
histoire, SVT) : la remontée du moteur dans [`commun/`](../../commun/) est due,
et reportée pour ne pas toucher aux autres applis en pleine période de
contrôles.

## Le chapitre 1 : « Diversité et stabilité génétique des êtres vivants »

D'après le polycopié d'Evan (thème 1, « Le vivant et son évolution »).

| Séance | Étapes | Durée |
|---|---|---|
| 1 · Partie 1, *le phénotype* | La diversité des individus · Héréditaire ou non ? (et le tableau à classer) · Écrire : le hêtre, en J.O.D. | ~11 min |
| 2 · Parties 2 et 3, *noyau, chromosomes, gènes* | Le noyau (transfert de noyau) · L'ADN et les chromosomes · Le clonage · Le caryotype · Gènes et allèles · Écrire : le diagnostic du biologiste | ~20 min |
| 3 · Parties 4 à 6, *mitose, méiose, fécondation* | Les trois phénomènes et leur tableau · Le brassage (M. et Mme Martin) · Écrire : la réponse aux Martin · Le cycle et le patrimoine génétique | ~14 min |
| 4 · Partie 7, *les mutations* | Chat polydactyle, levures, pomme dorée · Écrire : la pomme et le chat | ~7 min |
| Contrôle blanc | 16 questions de tout le chapitre, sans indice | ~8 min |

Ce que l'appli ne tient pas du polycopié lui-même :

- **Les pages entre l'activité 4 et la situation des Martin manquent** — sans
  doute la mitose et les bilans 3 et 4. Ce que la fiche dit de la mitose vient
  du vocabulaire à maîtriser, du bilan 6, du tableau comparatif de la synthèse
  et du programme de 3e (chaque chromosome copié, puis les copies séparées).
- **Le bronzage** n'est dans aucune question : selon les corrigés, il est
  rangé dans « environnement » ou dans « les deux ». La fiche le signale ;
  c'est le classement fait en classe qui compte.
- Les **définitions du vocabulaire à maîtriser** sont reprises comme le cours
  les donne, puisque c'est ce que le contrôle demande. Le reste de la fiche
  résume le cours en notes.

## Ce qui change par rapport à l'histoire

- **Retrouver le mot d'une définition** (type `terme`). Au contrôle blanc, le
  premier terme de chaque étape tirée est posé à l'envers : le mot, et trois
  définitions au choix, prises dans la même étape quand elle en a assez —
  mitose, méiose et gamète côte à côte.
- **Les accents comptent, à moitié** : « genotype » est « presque », avec le
  mot bien écrit sous les yeux. Les articles et la ligature (« cellule oeuf »)
  ne comptent pas. Un nombre de chromosomes n'a aucune tolérance : 47 n'est
  pas une faute de frappe pour 46.
- **Les confusions du chapitre sont prévues** et expliquées : gène et allèle,
  mitose et méiose, génotype, phénotype et caryotype, brassage et mutation,
  23 et 46.
- **Remettre des étapes dans l'ordre** (type `ordre`) : l'expérience des
  lapines, la réalisation d'un caryotype, le cycle de développement.
- **Des tableaux dans la fiche** (bloc `tableau`) : le classement des
  caractères, les groupes sanguins, la comparaison mitose, méiose et
  fécondation, les huit cellules-œufs des Martin. Le tableau de croisement est
  recalculé par les tests : la fiche et « 1 chance sur 4 » doivent sortir du
  calcul.
- **Quatre réponses rédigées corrigées par Merlin** : une démarche J.O.D.,
  deux tâches complexes, une explication. Merlin juge la science et le
  raisonnement ; l'orthographe est corrigée dans la réponse rendue, sans
  compter. Le **copier-coller est refusé**. Sans clé, Evan se corrige avec
  l'exemple ; la clé se règle dans l'appli de maths 3e du même appareil.

Pas de bouton 🔊 : il servait aux langues.

La progression est rangée sous `svt3e.progres.v1` ; les identifiants d'items
ne se renumérotent jamais.

## Ajouter un chapitre

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 1 : un
   profil pour Merlin (les définitions et notations du cours), des séances,
   des étapes (fiche + items), un contrôle blanc, une heure au plus. La fiche
   **résume** le cours en notes, sans le recopier : le dépôt est public.
2. L'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`.
3. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```

Le premier rejoue chaque réponse attendue contre le moteur de correction,
vérifie qu'aucune erreur prévue ne recouvre une réponse acceptée (accents mis
à part), que les tableaux ont autant de cases que de colonnes, qu'une séance
tient en vingt minutes et le chapitre en une heure. Le second teste le moteur
lui-même : ce qu'il accepte, et surtout ce qu'il refuse.
