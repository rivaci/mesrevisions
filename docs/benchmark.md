# Benchmark — les solutions de révision en ligne pour le secondaire français

*Août 2026. Étude transversale des plateformes généralistes, préalable à la
généralisation du projet à tous les niveaux du collège et du lycée. Les
benchmarks par matière×niveau viendront ensuite, en phase 0 de chaque charte
pédagogique.*

Ce document répond à une question : **face à une offre déjà abondante, pourquoi
ce projet existe-t-il ?** Il croise trois recherches menées en parallèle — le
panorama de l'offre, la voix des utilisateurs (avis, forums, presse), et
l'analyse du positionnement pédagogique (IA et open source compris). Les
sources sont citées en place ; la méthode et ses limites sont en fin de
document.

---

## 1. Le paysage : quatre modèles dominants

**Modèle 1 — la bibliothèque : cours + fiches + QCM corrigés.** Le manuel
numérique augmenté, organisé par chapitre du programme, monétisé par abonnement
sur les corrigés. [Kartable](https://www.kartable.fr/) (freemium, 7-14 €/mois),
[myMaxicours](https://www.maxicours.com/) (dès 6,95 €/mois),
[Nomad Education](https://www.nomadeducation.fr/) (freemium mobile, 149 €/an),
[digiSchool](https://www.digischool.fr/) (freemium — en redressement judiciaire
en 2025-2026), [Afterclasse](https://www.afterclasse.fr/) (gratuit, contenus
sous Creative Commons financés par Lelivrescolaire.fr),
[Lumni](https://www.lumni.fr/) (service public, gratuit, sans suivi). C'est le
modèle historique et majoritaire.

**Modèle 2 — la vidéo de prof + accompagnement humain en option.** La vidéo
explicative est le produit d'appel ; l'abonnement supérieur vend du prof en
chat ou visio le soir (17 h-20 h). [SchoolMouv](https://www.schoolmouv.fr/)
(12-15 €/mois), [Les Bons Profs](https://www.lesbonsprofs.com/) (dès
6,99 €/mois). La différenciation passe par l'humain, pas par l'algorithme.

**Modèle 3 — la mémorisation active : flashcards et répétition espacée.**
Pas de contenu éditorial : l'outil fait travailler la mémoire sur des cartes
créées ou partagées. [Anki](https://apps.ankiweb.net/) (libre, local, sans
compte), [Quizlet](https://quizlet.com/) (freemium),
[Revyze](https://www.revyze.fr/) (variante « feed TikTok + quiz », gratuit sur
capital-risque).

**Modèle 4 — l'adaptatif et l'IA**, en deux branches distinctes :

- *Adaptativité algorithmique* (l'exercice suivant dépend des réponses) :
  [MIA Seconde](https://eduscol.education.gouv.fr/6693/mia-seconde-une-approche-personnalisee-de-la-remediation-en-francais-et-en-mathematiques)
  (Éducation nationale × EvidenceB, généralisée à la rentrée 2025 aux
  ~800 000 élèves de seconde, français et maths de remédiation uniquement),
  [Khan Academy](https://fr.khanacademy.org/) (le seul acteur grand public avec
  un vrai modèle de maîtrise par compétence — mais essentiellement les maths,
  hors découpage des programmes français).
- *IA générative* : depuis 2024-2025, « photographie ton cours → fiches + quiz
  + flashcards » et « tuteur qui guide sans donner la réponse » sont devenus le
  standard — natifs chez les nouveaux entrants
  ([Eliott](https://www.eliott.app/), Foxia, Revizly, Wilgo), greffés chez les
  acteurs établis (« Alfa » chez Kartable, Nomad'IA, le coach IA SchoolMouv).
  **Aucune évaluation d'efficacité indépendante de ces tuteurs n'a été
  trouvée** — uniquement du discours produit.

**Constantes transverses.** Compte obligatoire et données côté serveur presque
partout — les exceptions sont Anki (local), Lumni et Khan Academy (consultation
libre), Afterclasse (compte optionnel) et MIA Seconde (identifiants académiques
via le GAR). Le gratuit total n'existe que subventionné : service public, ONG,
éditeur de manuels, ou capital-risque en phase d'acquisition. Et le secteur est
économiquement fragile (digiSchool repris en 2026), pendant que la vague
IA-native déplace l'usage vers « réviser à partir de son propre cours » plutôt
que d'une bibliothèque éditoriale.

---

## 2. Ce que les élèves, parents et profs en disent

Les plaintes les plus bruyantes sont **pratiques** et viennent des parents :
reconduction tacite et prélèvements après résiliation (massif sur Trustpilot et
le [forum Que Choisir](https://forum.quechoisir.org/maxicours-avis-sur-un-soutien-scolaire-trompeur-t14195.html)
pour SchoolMouv, Maxicours et Kartable — le mot « arnaque » revient), et
freemium frustrant où tout ce qui sert vraiment — les corrections — est payant.

Les plaintes **pédagogiques** sont plus diffuses mais convergentes :

1. **Contenu superficiel ou erroné.** Des profs virulents (« fiches
   indigentes », « presque tout est empreint d'erreurs factuelles ou
   d'aberrations pédagogiques » —
   [La Vie Moderne](https://www.laviemoderne.net/mirabilia/97-kartable-comment-pourrir-vraiment-le-web),
   [L'Étudiant](https://www.letudiant.fr/lycee/kartable-l-appli-anti-prof.html)),
   des élèves qui signalent des corrections fausses, des parents qui trouvent
   « des calculs de maths faux ».
2. **Des QCM qui ne préparent pas à l'application.** « Manque d'activités
   pratiques », « aucun changement en classe », « exercices répétés et niveau
   bas ». Le témoignage « je réussis les QCM mais je rate mes contrôles »
   n'apparaît jamais mot pour mot — il se lit en creux, partout.
3. **Personne vers qui se tourner quand on bloque.** Mêmes ressources pour
   tous, pas d'aide au moment de l'incompréhension, abandon faute de cadre.
   Confirmé en creux par ce qui marche : le chat avec un prof le soir, et les
   vidéos d'un prof incarné.
4. **Trous de couverture et retard sur les programmes** (spécialités, langues,
   réformes).

Ce qui fait **rester** un élève, symétriquement : des explications claires
quand le cours de classe fait défaut (la raison n°1 d'adoption de Kartable
selon [L'Étudiant](https://www.letudiant.fr/lycee/kartable-l-appli-anti-prof.html) ;
le succès massif d'[Yvan Monka](https://www.maths-et-tiques.fr/) — vidéo +
fiche méthode + exercices de difficulté croissante), la gratuité sans friction
(Afterclasse), les flashcards, le hors-ligne, et côté parents un suivi visible.

**Lecture transversale : l'élève reste quand l'outil *explique* mieux que son
cours, et stagne quand l'outil se réduit à des QCM de restitution — le format
dominant de toutes ces plateformes. Le besoin le moins servi est le passage de
« je connais le cours » à « je sais faire en contrôle ».**

---

## 3. Analyse pédagogique : ce que ces plateformes entraînent réellement

| Critère | Kartable | SchoolMouv | Maxicours | Afterclasse | Khan Academy | Projet Voltaire |
|---|---|---|---|---|---|---|
| Forme dominante | QCM / exos fermés | vidéo + quiz | exos fermés | quiz gamifiés | exos par compétence | exos ciblés |
| Répétition espacée | non | non | non | non | implicite | **oui** |
| Mesure de maîtrise | score | score | score | points, badges | **niveaux par compétence** | profil de mémorisation |
| Diagnostic du *pourquoi* de l'erreur | non | non | non | non | non | partiel |
| Production, transfert | quasi absent | quasi absent | quasi absent | limité | limité | non |

Trois enseignements :

- **Le marché vend du catalogue, pas de la maîtrise.** Le suivi est un score
  par chapitre ; la correction est identique pour tous ; aucune plateforme
  grand public ne modélise *pourquoi* l'élève se trompe. Les deux seules
  exceptions partielles sont étrangères au cœur du marché : Khan Academy
  (mastery learning, maths) et
  [Projet Voltaire](https://www.projet-voltaire.fr/) (ancrage mémoriel avec
  profil d'erreur, orthographe uniquement).
- **La recherche confirme la limite du format.** Amadieu & Tricot
  ([*Apprendre avec le numérique*](https://www.ih2ef.gouv.fr/lu-pour-vous-apprendre-avec-le-numerique-mythes-et-realites)) :
  les exerciseurs à feedback immédiat ne fonctionnent que sur des réponses
  bien définies — « une niche » — et la personnalisation vient de l'humain qui
  scénarise, pas de la machine. Aucune étude d'efficacité indépendante
  n'existe sur Kartable, SchoolMouv ou Maxicours.
- **MIA Seconde ne change pas la donne.** C'est un exerciseur adaptatif de
  remédiation (pas d'IA générative), critiqué comme béhavioriste par le
  [SNES-FSU](https://www.snes.edu/article/mia-seconde-cheval-de-troie-de-lia-dans-nos-metiers/),
  jugé utile surtout aux élèves en grande difficulté et trop basique pour les
  autres ([retours d'enseignants](https://www.ia-edu.fr/mia-seconde-avis-enseignants-eleves/)).

**Côté open source**, le terrain est vivant — la
[Forge des communs numériques éducatifs](https://docs.forge.apps.education.fr/apropos.html),
[MathALÉA / CoopMaths](https://coopmaths.fr/alea/) (plus de 3 000 générateurs
d'exercices), [Sacado](https://sacado.xyz/) — mais structurellement
**prof-centré** (l'élève seul n'a pas de parcours auto-organisé),
**maths-centré**, et **sans persistance de profil élève** entre outils ni dans
le temps. Le créneau « outil libre, élève-autonome, multi-matières, avec
modèle de maîtrise et répétition espacée » est vide.

---

## 4. Les vides — et le positionnement du projet

Cinq choses que personne ne fait, et qui sont précisément la démarche de ce
dépôt :

| Le vide du marché | La réponse du projet |
|---|---|
| **L'application en situation** — le format dominant reste le QCM de restitution ; le passage « je connais le cours → je sais faire en contrôle » est le besoin le moins servi | Le diagnostic par matière : on n'entraîne pas la récitation mais l'application sous contrainte, avec une difficulté qui croît par interférence |
| **Le diagnostic causal de l'erreur** — au mieux une correction type identique pour tous | Le catalogue de pièges par confusion réelle, le dialogue qui demande *pourquoi* avant d'expliquer, et Merlin qui répond à la confusion précise de l'élève |
| **La répétition espacée intégrée** — absente partout sauf Anki (bricolage individuel) et Voltaire (orthographe seule) | Le SRS natif, compté en séances plutôt qu'en jours, avec maîtrise mesurée au palier difficile |
| **Le tuteur longitudinal** — les « tuteurs IA » de 2025 sont des chatbots d'aide aux devoirs sans mémoire pédagogique ; personne ne combine maîtrise par compétence + mémoire des erreurs + espacement + dialogue | Le profil transversal de l'élève, vocabulaire commun des confusions entre matières, qui suit l'élève d'année en année |
| **La confiance** — compte obligatoire et données d'enfants côté serveur presque partout ; abonnements à résiliation piégeuse comme plainte n°1 | Statique, sans compte, sans serveur, gratuit, clé d'API apportée par la famille ; les données restent sur l'appareil et s'exportent en un fichier qui appartient à l'élève |

Le benchmark valide aussi, en creux, **ce qu'il faut retenir de ce qui
marche** : les explications claires au moment du blocage (c'est la raison n°1
d'adoption — Merlin joue ce rôle), le hors-ligne (l'appli statique fonctionne
intégralement sans clé), la gratuité sans friction (pas de compte, pas de
paywall sur les corrections — exactement l'inverse du freemium subi).

Et il désigne **les risques à ne pas reproduire** :

1. **Les erreurs de contenu** — la plainte pédagogique la plus virulente. C'est
   l'argument décisif pour les validateurs automatiques par charte (le modèle
   `verifier-contenu.mjs`) et la relecture humaine avant publication : la
   crédibilité du projet se joue là.
2. **La couverture partielle vendue comme totale** — mieux vaut peu de
   matières×niveaux avec une charte solide qu'un catalogue troué. Afficher
   honnêtement le périmètre.
3. **L'exerciseur pour ceux qui se débrouillent déjà** — « tout exerciseur, si
   bien fait soit-il, ne servira qu'à ceux qui se débrouillent déjà bien »
   ([S. de Vanssay](https://nantessecteurouest.wordpress.com/2024/02/05/intelligence-artificielle-au-lycee-lexerciseur-mia-seconde-leurre-de-la-rentree/)).
   Le dialogue après erreur et l'élève-pilote par charte sont les garde-fous ;
   la question « à qui cette séance ne servira-t-elle pas ? » doit rester posée
   dans chaque charte.

---

## Méthode et limites

Trois recherches web menées en parallèle en août 2026 : panorama de l'offre
(sites éditeurs, comparatifs, presse), voix des utilisateurs (avis App
Store/Google Play, Trustpilot via agrégateurs — l'accès direct est bloqué —,
forum Que Choisir, Neoprofs, presse rapportant des témoignages), positionnement
pédagogique (analyses de didacticiens, blogs d'enseignants, documentation
institutionnelle, dépôts open source).

Limites à garder en tête : les avis en ligne sur-représentent les frustrations
pratiques (abonnements, prix) et sous-représentent l'efficacité pédagogique —
un élève ne sait pas toujours qu'une appli ne lui apprend rien ; les chiffres
d'efficacité disponibles (MIA, plateformes privées) viennent des éditeurs
eux-mêmes ; Reddit n'a rien donné d'exploitable sur ces plateformes. Les avis
servent donc à générer des hypothèses de besoin, pas à les valider — la
validation reste l'élève-pilote de chaque charte.
