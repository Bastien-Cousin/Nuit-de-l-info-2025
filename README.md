# 🌙 Nuit de l'Informatique 2025 — NIRD

Projet web réalisé dans le cadre de la **Nuit de l'Informatique 2025**, un concours national étudiant consistant à concevoir et développer une solution informatique en équipe au cours d'une seule nuit.

Notre équipe de 3 étudiants a travaillé sur le défi principal proposé par la **NIRD** en développant une plateforme web interactive combinant contenus informatifs, mini-jeux, authentification et espace communautaire.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)

---

## 🌐 À propos du projet

Le projet prend la forme d'une plateforme web destinée à présenter la **NIRD** et les causes qu'elle défend.

Plutôt que de proposer uniquement du contenu informatif, nous avons choisi d'intégrer plusieurs fonctionnalités interactives afin de rendre la découverte du sujet plus ludique.

Le site propose ainsi des mini-jeux, un système de comptes utilisateurs et un forum permettant aux membres de communiquer entre eux.

---

## ✨ Fonctionnalités principales

### 🏠 Page d'accueil

La page d'accueil présente le site et permet d'accéder aux différentes parties de la plateforme.

Elle comprend notamment :

- un header de navigation ;
- un footer ;
- une présentation générale du projet et de son univers.

### 👥 Page « Qui sommes-nous ? »

Cette page permet d'en apprendre davantage sur la NIRD et ses objectifs.

Elle contient également un élément caché permettant d'accéder à l'un des défis secondaires réalisés pendant la compétition.

### 🎮 Découvrez notre univers

Cette section regroupe plusieurs **mini-jeux interactifs**.

L'objectif est de faire découvrir les différentes causes défendues par l'organisation d'une manière plus ludique qu'une simple présentation textuelle.

### 💬 Forum communautaire

Le site intègre un espace de discussion accessible aux utilisateurs possédant un compte.

Le forum permet notamment de :

- créer de nouvelles discussions ;
- consulter les discussions existantes ;
- échanger à l'intérieur d'une discussion ;
- organiser les contenus grâce à différents thèmes ;
- filtrer les discussions.

Les informations du forum sont enregistrées grâce à un **backend et une base de données**.

### 🔐 Authentification

Un système de comptes utilisateurs a été développé afin de gérer l'accès aux fonctionnalités communautaires.

Il permet :

- la création d'un compte ;
- la connexion à un compte existant ;
- la gestion des mots de passe ;
- la conservation des comptes en base de données ;
- l'accès au forum pour les utilisateurs authentifiés ;
- la possibilité pour le site de se souvenir de l'utilisateur.

### ⚖️ Informations légales

Le site contient également :

- une page de **mentions légales** ;
- une page dédiée à la **politique de confidentialité**.

---

## 🏆 Défis secondaires

En complément du défi principal, notre équipe a choisi d'intégrer plusieurs défis optionnels proposés pendant la Nuit de l'Informatique.

### 🐍 Hidden Snake

Un Snake est caché dans la page **« Qui sommes-nous ? »**.

L'accès au jeu se fait en cliquant sur un serpent placé en bas de la page.

### 👾 On veut du gros pixel !

Le Snake a également été utilisé pour répondre au défi consacré à une esthétique rétro.

Cette version adopte une direction artistique inspirée de **Tetris** et des interfaces en pixel art.

### 🧍 Devenez le CTO de votre santé posturale

Un formulaire dédié à ce défi est accessible directement depuis une icône présente dans le header du site.

---

## 🧱 Architecture du projet

Le projet repose sur une séparation entre le front-end et le back-end.

### Front-end

Le front-end a été développé avec **React.js** et JavaScript.

Il gère notamment :

- l'affichage des différentes pages ;
- la navigation ;
- les interactions avec l'utilisateur ;
- les mini-jeux ;
- les formulaires ;
- les échanges avec le backend.

### Back-end

Le backend repose sur **Node.js**.

Il permet notamment de gérer les fonctionnalités nécessitant des données persistantes, comme :

- les comptes utilisateurs ;
- l'authentification ;
- les discussions du forum ;
- les messages associés aux différentes discussions.

---

## ☁️ Hébergement

Les deux parties de l'application ont été déployées séparément :

- **Netlify** — hébergement du front-end ;
- **Render** — hébergement du back-end.

Cette architecture permet de séparer clairement l'interface utilisateur de la partie serveur de l'application.

---

## 🛠️ Technologies utilisées

- **JavaScript** — logique générale du projet
- **React.js** — développement du front-end
- **Node.js** — développement du back-end
- **CSS3** — mise en page et identité visuelle
- **Base de données** — stockage des comptes, discussions et messages
- **Netlify** — déploiement du front-end
- **Render** — déploiement du back-end

---

## 🌙 La Nuit de l'Informatique

La **Nuit de l'Informatique** est un concours national réunissant des étudiants en informatique de différents niveaux.

Les équipes découvrent les défis en début de soirée et disposent uniquement de la nuit pour concevoir et livrer leur projet.

Chaque équipe doit répondre à un **défi principal**, tout en ayant la possibilité de participer à plusieurs défis secondaires proposés par différentes entreprises et organisations.

La contrainte de temps oblige à rapidement :

- définir les fonctionnalités prioritaires ;
- répartir le travail entre les membres de l'équipe ;
- développer un prototype fonctionnel ;
- intégrer différentes technologies ;
- résoudre les problèmes rencontrés au cours de la nuit.

---

## 👥 Contexte du projet

Ce projet a été réalisé **en équipe de 3** durant ma deuxième année de BUT Informatique.

Le développement s'est déroulé pendant la **Nuit de l'Informatique, du 4 au 5 décembre 2025**.

Par rapport à notre participation à l'édition 2024, ce projet nous a permis de travailler sur une application web plus complète, intégrant cette fois une véritable architecture front-end / back-end ainsi que des fonctionnalités nécessitant une base de données.

Ce projet m'a notamment permis de travailler sur :

- le développement d'une application avec React ;
- la création d'un backend avec Node.js ;
- la communication entre un front-end et un serveur ;
- la gestion de données persistantes ;
- la conception d'un système d'authentification ;
- la création d'un forum et de fonctionnalités communautaires ;
- le développement de mini-jeux web ;
- le déploiement séparé d'un front-end et d'un back-end ;
- la priorisation des fonctionnalités sous une forte contrainte de temps ;
- le travail en équipe dans le cadre d'un concours national.

---

## 📅 Réalisation

**4 – 5 décembre 2025** — Deuxième année de BUT Informatique, semestre 3.
