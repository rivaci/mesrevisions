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

**Les 42 leçons sont animées.** Antonin l'a dit lui-même à Merlin : il a du mal
à voir les liens entre les composants de la phrase. Une leçon écrite les
décrit ; l'animation les montre — la fausse piste barrée, la flèche qui repart
vers le vrai commandant, la terminaison qui change sans qu'on entende rien.

Ce ne sont pas des vidéos mais des **données** : quelques lignes décrivant la
phrase et les étapes, que `js/animation.js` dessine. Quarante fichiers vidéo
pèseraient des dizaines de mégaoctets, videraient la data d'un téléphone et
demanderaient un réexport à chaque correction de contenu.

**La voix ne dit pas ce que l'écran montre**, et c'est voulu. « Un seul → -ait »
s'écrit très bien et se dit très mal : la synthèse lisait « -ait » comme le mot
*ète* et la flèche comme le mot *flèche*. Or le point de la séance 12 est que
*-ait* et *-aient* se prononcent pareil — une voix qui les prononce enseigne le
contraire de l'écran. Une terminaison citée est donc épelée (« a, i, t »), la
flèche devient une pause, et les guillemets se taisent. 185 des 255 répliques
sont dites autrement qu'écrites.

Deux contrôles gardent ces scripts, parce qu'ils échouent en silence.
`verifier-contenu.mjs` refuse une scène rejetée : à l'écran, une scène
incohérente est retirée sans bruit — bonne conduite quand le script vient d'un
modèle, piège quand il est écrit à la main. Et `relire-animations.mjs` déplie la
phrase état par état : une animation peut être parfaitement valide et produire
une phrase impossible, comme « Mon cousins jouent » ou « Si je serais au
stade ». Douze défauts de ce genre ont été trouvés ainsi. Règle qui en découle :
**quand une démonstration ne peut pas se jouer sans casser la phrase, elle se
dit.** Une animation qui apprend une faute vaut moins qu'un texte.

**La dictée se corrige autrement.** Il n'y a pas un piège mais plusieurs points
de contrôle, et poser « pourquoi as-tu écrit ça ? » pour six mots d'affilée
serait un interrogatoire. La correction montre donc chaque mot raté — ce qu'il a
écrit, ce qu'il fallait, quel piège l'a eu — puis **une seule** explication pour
l'ensemble, qui cherche ce que ces erreurs ont en commun. C'est l'endroit où
l'explication compte le plus : l'élève connaît ses règles et n'arrive pas à les
appliquer en dictée, c'est tout le diagnostic de l'appli.

**Les options proposées sont celles qui peuvent être vraies.** Elles étaient
attachées au piège seul, donc affichées telles quelles sur n'importe quel
exercice : sur « Touche le verbe conjugué », l'appli demandait à l'élève s'il
s'était trompé sur la terminaison — alors qu'il n'avait rien écrit. Une option
impossible est cochée quand même, et part fausser le journal, le bilan parents
et ce que Merlin croit savoir de lui. `js/raisonnement.js` ne garde donc que les
options que la tâche autorise, et en ajoute deux : **« j'ai fait une faute de
frappe »**, seulement quand ce qui a été écrit n'est pas une forme plausible du
mot — « jetes » pour « jettes » est le piège de la séance, pas un dérapage de
doigt — et **la réponse libre**, quand Merlin est là pour la lire. Ce qu'il
écrit devient son raisonnement : c'est à cette phrase-là que Merlin répond, et
c'est elle que les parents lisent.

**Les items neutres.** Chaque palier contient des phrases où le piège ne joue
pas. Sans elles, l'élève apprend un motif — « pluriel juste avant, donc
singulier » — au lieu de la règle, et se trompe partout ailleurs. C'est vérifié
automatiquement par `tools/verifier-contenu.mjs`.

**La maîtrise se mesure au palier difficile.** Un piège n'est acquis qu'après
trois réussites consécutives, dans au moins deux séances distinctes, **et** au
niveau de difficulté le plus élevé déjà rencontré. Sans cette dernière
condition, on déclarerait acquis un accord réussi seulement quand le sujet
touche le verbe — exactement le problème qu'on cherche à corriger.

**Aucune séance n'est verrouillée.** Le parcours reste ordonné et l'appli
conseille la première séance non faite, mais elle ne bloque rien : un élève qui
veut réviser les dictées la veille d'un contrôle a raison, et un parent qui veut
voir à quoi elles ressemblent aussi. La progression retient donc *quelles*
séances ont été faites, pas *jusqu'où* on est allé — sans quoi un saut à la
séance 18 ferait passer les dix-sept précédentes pour acquises.

**La répétition espacée compte en séances, pas en jours.** L'élève peut
condenser les vingt séances en deux semaines à raison de deux par jour : avec
des intervalles en jours, tout serait repoussé au lendemain et la remédiation ne
se déclencherait jamais quand elle est utile.

## Le Défi de fin de bloc

On renforce ce qu'on récompense. Une récompense donnée pour avoir **terminé** un
bloc apprendrait à cliquer vite — exactement ce que le reste de l'appli combat,
elle qui n'accorde un piège qu'après trois réussites consécutives, dans deux
séances distinctes, au palier le plus dur.

Le Défi ne tire donc que sur les **pièges déjà domptés**, avec des phrases de la
réserve jamais vues. Ce n'est pas un examen, c'est un tour d'honneur : l'élève
gagne parce qu'il sait. Et rappeler du matériel acquis sous contrainte de temps
est précisément ce que la répétition espacée demande. Chronomètre, série qui
multiplie les points, trois vies ; questions à toucher ou à choisir seulement —
un exercice à trou demanderait le clavier, trop lent, et la faute de frappe y
compterait comme une faute de méthode.

**Il ne touche jamais à la progression.** Il lit l'état des pièges, il n'écrit
que son meilleur score. Si une erreur au chrono faisait reculer un piège, la
récompense deviendrait une punition et l'élève apprendrait à ne pas y jouer ;
surtout, une faute commise en huit secondes est une faute de vitesse, pas de
méthode, et les confondre salirait le diagnostic de l'écran parents.

**Il s'adapte, il ne filtre pas.** Deux pièges domptés font une manche courte,
huit en font une longue. Aucun seuil : l'élève en difficulté — celui pour qui
l'appli est faite — est justement celui qu'un seuil aurait privé de récompense.

Ce qui a été écarté : les **séries de jours**. Elles punissent le jour manqué, et
l'appli a délibérément refusé le calendrier — la répétition espacée compte en
séances, pas en jours, pour qu'on puisse condenser ou espacer sans être pénalisé.

L'écran des progrès affiche les **dix-sept pièges**, pas seulement ceux déjà
croisés : une collection ne se comprend que si l'on voit les cases vides. Elle
reste honnête — une carte se retourne quand le piège est réellement acquis,
jamais parce qu'on a cliqué.

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
