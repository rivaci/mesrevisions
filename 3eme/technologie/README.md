# Technologie 3<sup>e</sup> — réviser les fiches du cours avant le contrôle

Evan révise les **fiches de son cours de technologie** : une **séance** par
fiche, d'une vingtaine de minutes au plus, à faire d'affilée ou une par jour,
puis un **contrôle blanc** par chapitre. Chaque chapitre tient en **une heure**.

C'est le moteur de sa physique-chimie ([`3eme/physique-chimie/`](../physique-chimie/)),
lui-même repris de sa SVT, de son histoire et de son espagnol. C'en est la
huitième copie : l'extraction du moteur dans [`commun/`](../../commun/) est
due, mais elle touche toutes ces applis. Elle se fera hors d'une période de
contrôles.

## Les chapitres

D'après le document « Révisions 1 » transmis par Denis : six fiches du cahier
de technologie d'Evan, les fiches 1 à 5 et la fiche 8. Le document n'a pas de
fiches 6 et 7.

| Chapitre | Séance | Ce qu'on y révise | Durée |
|---|---|---|---|
| 1 · *Les objets techniques* | Fiche 1 | Objet et système technique (le marteau, le smartphone) · Invention, innovation, innovation de rupture · Famille et lignée d'objets · Les critères d'évolution · Rédiger : *invention et innovation* | ~15 min |
| | Fiche 2 | Besoin, fonction d'usage, principe technique, fonction technique, solutions techniques (la gourde) · Composants et structure · Contraintes, critères de choix, performances, coût, indice de réparabilité · L'utilisateur et la société · Rédiger : *analyser la gourde* | ~17 min |
| | Fiche 3 | SysML · La question de chaque diagramme · Lire les diagrammes de la trottinette et de la lampe automatique · Rédiger : *séquence ou activité ?* | ~14 min |
| | Contrôle blanc | 20 questions des trois fiches, sans indice | ~10 min |
| 2 · *L'énergie et le réseau local* | Fiche 4 | Sources renouvelables ou non · Les cinq formes d'énergie · Conversion, convertisseur, flux, énergie utile et non utile · Rédiger : *le moteur électrique* | ~14 min |
| | Fiche 5 | Les fonctions ADCT · Alimentation, préactionneur, actionneur, organes de transmission · Le portail automatique · Rédiger : *la chaîne du portail* | ~16 min |
| | Fiche 8 | Réseau, LAN, terminal · Switch, routeur, box, borne Wi-Fi, serveur… · Topologie en étoile, Ethernet, fibre, Wi-Fi, Bluetooth · Rédiger : *du collège à Internet* | ~16 min |
| | Contrôle blanc | 20 questions des trois fiches, sans indice | ~10 min |

La fiche de l'appli résume en notes, sans recopier le cours (le dépôt est
public) ; les définitions courtes restent proches des siennes, puisque ce sont
elles qu'Evan doit restituer. Les exemples de la fiche sont ceux du cours ; ceux
des questions de classement (quel critère d'évolution, quel impact) sont écrits
pour l'appli.

Le cours donne la découverte de l'électricité comme exemple d'invention : la
fiche le reprend, mais aucune question ne porte dessus — une découverte n'est
pas tout à fait une invention, et la définition suffit.

## Ce qui est propre à la technologie

Pas de calcul : du **vocabulaire**, avec les confusions classiques du cours
reconnues et expliquées — invention et innovation, fonction d'usage et
fonction technique, contrainte et critère de choix, préactionneur et
actionneur, switch et routeur, diagramme de séquence et d'activité, source et
forme d'énergie. Des **schémas à remettre dans l'ordre** : la chaîne d'énergie
ADCT, celle du portail, le diagramme de séquence de la trottinette, la lignée
des voitures. Et des **réponses rédigées** corrigées par Merlin, une par fiche.

Les tests vérifient que chaque question dit la même chose que sa fiche :
chaque composant rangé sous sa fonction comme dans le tableau, chaque source
dans la bonne colonne, chaque conversion, la question de chaque diagramme
SysML, l'ordre de la lignée.

Le reste est le moteur de la physique-chimie : au contrôle blanc, la
définition d'un mot en QCM ; le **copier-coller est refusé** dans les
réponses rédigées. Sans clé, Evan se corrige avec l'exemple ; la clé se règle
sur la page commune [`commun/merlin.html`](../../commun/merlin.html), liée en
bas de l'accueil.

La progression est rangée sous `techno3e.progres.v1` ; les identifiants
d'items ne se renumérotent jamais.

## Ajouter un chapitre

1. Écrire `js/data/chapitres/chNN-titre.js` sur le modèle du chapitre 1, et
   l'ajouter à `CHAPITRES` dans `js/data/chapitres/index.js`.
2. Vérifier :

```
node tools/verifier-contenu.mjs
node tools/tester-moteur.mjs
```
