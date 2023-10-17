# Test de recrutement Front-End SYSNAV

## Table des matières

- [Mise en place du projet](#mise-en-place-du-projet)
- [Énoncé du test](#énoncé-du-test)
  - [Contexte](#contexte)
  - [Objectifs](#objectifs)
  - [Contraintes](#contraintes)
  - [Moyens mis à disposition](#moyens-mis-à-disposition)
  - [Livrables attendus](#livrables-attendus)
  - [Points évalués](#points-évalués)
  - [Ne sont pas demandées](#ne-sont-pas-demandées)

## Mise en place du projet

- [Télécharger l'installateur](https://nodejs.org/) pour Node LTS.
- Installer yarn globalement : `npm install -g yarn`.
- Éxecuter `yarn` dans un terminal pour installer les modules node.
- Éxecuter `yarn dev` dans un terminal pour lancer le serveur de développement.
- C'est prêt. :tada:

## Énoncé du test

### Contexte

- Un serveur génère des trajectoires d’un véhicule sous la forme de fichiers JSON que l’on souhaite afficher dans une page web sur un fond de carte.
- Une maquette de la page web servira de base pour la réalisation du test.

### Objectifs

- Importer les fichiers JSON de trajectoires dans la page web.
- Afficher la trajectoire sélectionnée sur un fond de carte, à l’aide d’une des API suivantes :
  - Openlayers.
  - Leaflet.
  - API Google Maps.
- Reproduire fidèlement les maquettes (fournies dans le dossier `/mock`).

### Contraintes

- Contraintes techniques :
  - Usage de Git et des commits pour retracer l'avancement du projet.
  - Affichage de la carte sans clé d'API.
  - Compatibilité navigateurs : Firefox et Chrome.
- Contraintes du test :
  - Respect de la maquette fournie.
  - Les points sont reliés par un trait dont la couleur (du vert au rouge) doit correspondre au paramètre de confiance.
  - La carte doit être optimisée pour afficher lisiblement et automatiquement toute la trajectoire.

### Moyens mis à disposition

- Un squelette du projet, développé avec React et Typescript, contenant quelques composants pour débuter.\
  Le choix du langage et des outils est libre, il n'est pas obligatoire d'utiliser le squelette.
- Les fichiers JSON de trajectoire : `/data/*.json`.
- La maquette de la page web :
  - Page d'accueil : `/mock/home.png`.
  - Page de visualisation d'une trajectoire : `/mock/trajectory.png`.
- Liens utiles :
  - Icônes : [Heroicons](https://heroicons.com/).
  - Police : [Lexend](https://fonts.google.com/specimen/Lexend).

### Livrables attendus

- Le code de la page web dans une archive au format `zip`.
- Des captures d'écran de la solution pour chaque maquette (fournies dans le dossier `/mock`).
- Un document texte (français ou anglais) contenant :
  - Un guide de mise en place de la solution.
  - Une présentation de la solution (dont description de la mise en œuvre).
  - Une justification succincte des choix réalisés (langages/outils/IDE/navigateurs/librairies/architecture/etc.).
  - Le temps approximativement passé sur ce test.

### Points évalués

- Pertinence de la solution (respect des contraintes, généricité, économie, réutilisation de bibliothèques).
- Qualité macro du code (structure des fichiers, organisation en modules/classes/fonctions, etc.).
- Qualité micro du code (commentaires, indentation, idiomes, etc.).
- Qualité de la présentation de la solution.
- Grammaire, orthographe, présentation.

### Ne sont pas demandées

- L'implémentation d’une application serveur délivrant les pages et fichiers utilisés.
- La mise en ligne de la page web.
