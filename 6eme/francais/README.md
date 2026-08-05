# Français 6<sup>e</sup> — Le verbe et les accords

Application de révision construite autour d'un diagnostic précis : l'élève
**connaît ses règles mais n'arrive pas à les appliquer en dictée**. Elle
n'entraîne donc pas la récitation, elle entraîne l'application sous contrainte.

20 séances, 268 exercices, 16 pièges suivis.

## Ce qui la distingue d'un questionnaire

**La difficulté croît par interférence, pas par accumulation de règles.** Le
même accord sujet-verbe est présenté avec le sujet collé au verbe, puis avec un
complément du nom qui s'intercale, puis un pronom, puis un sujet inversé. Ce
n'est pas la règle qui change, c'est ce qui empêche de l'appliquer.

**Le dialogue après une erreur.** L'élève ne reçoit pas une correction : on lui
demande *pourquoi* il a répondu ça, par options guidées correspondant à des
confusions réelles. L'appli répond alors à **sa** confusion. Avec une clé d'API,
une explication personnalisée remplace la réponse préécrite ; sans clé, tout
reste jouable.

**Les items neutres.** Chaque palier contient des phrases où le piège ne joue
pas. Sans elles, l'élève apprend un motif — « pluriel juste avant, donc
singulier » — au lieu de la règle, et se trompe partout ailleurs. C'est vérifié
automatiquement par `tools/verifier-contenu.mjs`.

**La maîtrise se mesure au palier difficile.** Un piège n'est acquis qu'après
trois réussites consécutives, dans au moins deux séances distinctes, **et** au
niveau de difficulté le plus élevé déjà rencontré. Sans cette dernière
condition, on déclarerait acquis un accord réussi seulement quand le sujet
touche le verbe — exactement le problème qu'on cherche à corriger.

**La répétition espacée compte en séances, pas en jours.** L'élève peut
condenser les vingt séances en deux semaines à raison de deux par jour : avec
des intervalles en jours, tout serait repoussé au lendemain et la remédiation ne
se déclencherait jamais quand elle est utile.

## Vie privée et clé d'API

L'appli appelle l'API Anthropic **directement depuis le navigateur**, avec une
clé saisie sur l'appareil et jamais présente dans ce dépôt. C'est le patron
« bring your own key » : un visiteur qui ouvre l'URL a un stockage vide, donc
aucun accès et aucun coût pour le propriétaire de la clé.

Deux précautions, côté console Anthropic : une **clé dédiée**, révocable, et une
**limite de dépense**. Toutes les pages de `rivaci.github.io` partagent une même
origine, donc un autre projet publié là pourrait lire la clé.

Sans clé, l'appli fonctionne intégralement avec les explications préécrites du
catalogue de pièges.

Progression, mémoire et bilans sont dans le `localStorage` de l'appareil. Vider
les données de navigation les efface — d'où le bouton de copie du bilan sur
l'écran parents.

## Suivi pour les parents

L'écran parents ne donne pas un score mais un diagnostic : le **type d'erreur
dominant**, le nombre de fois où l'élève a coché « au hasard » (signal qu'il
devine au lieu d'appliquer la méthode), et ce qui sera repris à la séance
suivante.

Il affiche aussi ce que l'IA a retenu de l'élève, **en clair et supprimable
ligne par ligne**. Une IA qui tient un dossier illisible sur un enfant n'est pas
acceptable ; toute observation peut être corrigée ou effacée.

## Développement

Site statique, sans étape de build.

```bash
python -m http.server 4173
```

```bash
node tools/verifier-contenu.mjs   # cohérence des séances, règle des items neutres
node tools/tester-moteur.mjs      # progression, maîtrise, remédiation, mémoire
```

### Organisation

```
js/data/pieges.js        les 16 pièges : raisonnements, règle, geste
js/data/seances/         une séance par fichier, s01 à s20
js/srs.js                répétition espacée comptée en séances
js/store.js              progression, journal, mémoire (localStorage)
js/memoire.js            profil de l'élève, deux couches
js/ia.js                 appel navigateur direct, mise en cache, sortie structurée
js/seance.js             déroulé d'une séance et dialogue d'erreur
js/app.js                navigation et écrans
```

Pour ajouter ou corriger un exercice, éditer le fichier de sa séance puis
relancer `verifier-contenu.mjs`. Le catalogue de pièges est partagé : corriger
une explication dans `pieges.js` la corrige pour tous les exercices concernés.
