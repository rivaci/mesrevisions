# Français 6<sup>e</sup> — Le verbe et les accords

Application de révision construite autour d'un diagnostic précis : l'élève
**connaît ses règles mais n'arrive pas à les appliquer en dictée**. Elle
n'entraîne donc pas la récitation, elle entraîne l'application sous contrainte.

21 séances, 595 exercices, 17 pièges suivis.

## Ce qui la distingue d'un questionnaire

**La difficulté croît par interférence, pas par accumulation de règles.** Le
même accord sujet-verbe est présenté avec le sujet collé au verbe, puis avec un
complément du nom qui s'intercale, puis un pronom, puis un sujet inversé. Ce
n'est pas la règle qui change, c'est ce qui empêche de l'appliquer.

**Le dialogue après une erreur.** L'élève ne reçoit pas une correction : on lui
demande *pourquoi* il a répondu ça, par options guidées correspondant à des
confusions réelles. **Merlin** — le professeur particulier, quand une clé d'API
est renseignée — répond alors à **sa** confusion précise. Le temps qu'il
réponde, l'écran affiche qu'il réfléchit plutôt que de faire clignoter une
réponse préécrite. Sans clé, ou s'il ne répond pas à temps, l'explication
préécrite du catalogue de pièges prend le relais et tout reste jouable.

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

## Identité de l'élève

Au premier lancement, l'élève saisit son prénom et choisit un avatar. Le prénom
n'est pas qu'un affichage : il sert de **clé à la mémoire transversale**, celle
qui décrit comment l'élève apprend et se partage entre ses matières. Toutes les
pages de `rivaci.github.io` partageant un même stockage, sans cette clé deux
enfants sur le même appareil se partageraient un profil d'apprentissage.

Un **code parental** facultatif (4 à 8 chiffres) met un rideau devant l'écran de
suivi et les réglages. C'est un rideau, pas une serrure : sur un site statique,
qui sait ouvrir les outils de développement passe outre. Son rôle est d'éviter
que l'enfant tombe par hasard sur la liste de ses difficultés et sur ce que l'IA
a noté de lui — pas de protéger la clé d'API.

Les **phrases d'exercice** gardent volontairement leurs prénoms d'origine. Y
substituer celui de l'élève casserait les accords : « Anto est parti » devenu
« Léa est parti » serait faux, et c'est précisément le sujet des séances 14 et 15.

## Vie privée et clé d'API

L'appli appelle **Anthropic ou OpenAI, au choix, directement depuis le
navigateur**, avec une clé saisie sur l'appareil et jamais présente dans ce
dépôt. C'est le patron « bring your own key » : un visiteur qui ouvre l'URL a un
stockage vide, donc aucun accès et aucun coût pour le propriétaire de la clé.

Deux précautions, côté console du fournisseur : une **clé dédiée**, révocable, et
une **limite de dépense**. Toutes les pages de `rivaci.github.io` partagent une
même origine, donc un autre projet publié là pourrait lire la clé.

Sans clé, l'appli fonctionne intégralement avec les explications préécrites du
catalogue de pièges.

### Deux fournisseurs, une seule différence visible : le prix

Le réglage propose une liste courte de modèles **et un champ libre**. Ce n'est
pas de la souplesse gratuite : les catalogues bougent plus vite que cette appli,
qui n'a ni build ni mise à jour automatique. Sans ce champ, un modèle retiré du
service condamnerait les explications personnalisées jusqu'à une republication.

Le bouton « Vérifier et enregistrer » envoie une requête de la **même forme que
les vraies** — sortie structurée et effort de raisonnement compris. Un modèle qui
n'accepte pas ces champs est refusé là, avec le message du service, plutôt que de
faire basculer l'appli en mode préécrit à la première erreur de l'élève.

Ce que les deux API ne partagent pas, et qui est vérifié par
`tools/tester-moteur.mjs` parce qu'une relecture n'y suffit pas :

| | Anthropic | OpenAI |
|---|---|---|
| Appel navigateur | en-tête `anthropic-dangerous-direct-browser-access` obligatoire | rien à déclarer |
| Plafond de sortie | `max_tokens` | `max_output_tokens` |
| Enveloppe du schéma | `output_config.format` | `text.format`, avec `name` et `strict` obligatoires |
| Mise en cache | marqueur `cache_control` explicite sur chaque bloc | automatique sur le préfixe commun |
| Effort | `output_config.effort` | `reasoning.effort` |
| Lecture | `content[].text` | `output[].content[].output_text` |

Un mauvais nom de champ donne un **400**, pas un champ ignoré silencieusement.

Côté OpenAI, `store: false` est envoyé explicitement : cet endpoint conserve
sinon les réponses trente jours. Il s'agit du travail d'un enfant.

Une réserve à connaître : chez OpenAI, une **clé refusée revient comme une panne
réseau**. La réponse 401 ne porte pas d'en-tête CORS, donc le navigateur ne peut
pas la lire. Le message de l'écran de réglages nomme donc les deux causes au lieu
d'en affirmer une.

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
js/eleve.js              prénom, avatar, code parental
js/ia.js                 les deux fournisseurs : enveloppes, cache, sortie structurée
js/seance.js             déroulé d'une séance et dialogue d'erreur
js/app.js                navigation et écrans
```

Pour ajouter ou corriger un exercice, éditer le fichier de sa séance puis
relancer `verifier-contenu.mjs`. Le catalogue de pièges est partagé : corriger
une explication dans `pieges.js` la corrige pour tous les exercices concernés.
