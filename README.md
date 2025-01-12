# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!

Olympic Data Visualization App
Description
Cette application permet de visualiser les données des Jeux Olympiques, notamment les médailles gagnées par pays, les participations, et d'autres statistiques pertinentes. Grâce à des graphiques interactifs et une interface intuitive, les utilisateurs peuvent explorer et analyser les performances des pays au fil des années.

Fonctionnalités
+ Visualisation des données : Utilisation de graphiques interactifs pour afficher les médailles par pays.
+ Statistiques globales :
Nombre total de Jeux Olympiques.
Nombre de pays participants.
- Exploration par pays : Accéder aux détails spécifiques d'un pays, y compris les médailles et les athlètes.
- Navigation interactive : Double-cliquez sur un pays pour voir ses détails.
Technologies utilisées
Frontend :
* Angular
* Ngx-Charts pour la visualisation des données
* SCSS pour le style
Backend :
- JSON statique simulant une API
Gestion des données :
- RxJS pour la gestion des flux de données asynchrones
Prérequis
Assurez-vous d'avoir les outils suivants installés :

Node.js
Angular CLI

Usage
Page d'accueil :
Affiche un graphique des médailles par pays.
Montre des statistiques globales des Jeux Olympiques.
Exploration par pays :
Double-cliquez sur un pays pour afficher ses détails (participations, médailles, etc.).
