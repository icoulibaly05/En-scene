README

Répartition des tâches

Frontend
	•	Responsable : Désir
Désir a été en charge de la création et de la gestion du frontend de l’application. Ses contributions incluent :
	•	La mise en place des pages en Next.js :
	•	Page d’accueil.
	•	Pages pour consulter les articles.
	•	Gestion des commentaires (lecture et ajout).
	•	L’intégration des éléments interactifs tels que les boutons de likes et dislikes, ainsi que le formulaire d’ajout de commentaires.
	•	La simulation d’une connexion utilisateur avec un compte fictif, “Marwen35”, afin de présenter une interface réaliste en l’absence d’authentification.

Backend
	•	Responsables : Merwan et Imran
Merwan et Imran ont géré le backend, avec les réalisations suivantes :
	•	Création des API REST pour :
	•	Récupérer les données (articles, commentaires, statistiques).
	•	Ajouter et gérer des utilisateurs.
	•	Ajouter des commentaires et gérer les interactions (likes/dislikes).
	•	Mise en place et gestion de la base de données pour stocker les utilisateurs, articles, commentaires et statistiques.
	•	Simulation de la connexion utilisateur en raison des problèmes rencontrés avec NextAuth.

Progrès et limitations

Fonctionnalités réussies
	•	Ajout de données :
L’ajout d’utilisateurs, de commentaires et d’autres données dans la base de données fonctionne parfaitement.
	•	Gestion des images :
Bien que nous n’ayons pas pu utiliser Vercel Blob pour stocker les images, elles sont stockées localement dans le dossier public du site, ce qui permet de les intégrer correctement dans l’application.
	•	Commentaires et likes :
Les fonctionnalités permettant d’ajouter des commentaires et d’interagir avec les articles (likes et dislikes) sont pleinement opérationnelles.

Limitation : absence de NextAuth

Nous n’avons pas pu intégrer NextAuth en raison de plusieurs problèmes rencontrés avec notre base de données. Ces difficultés techniques ont limité notre capacité à implémenter un système d’authentification fonctionnel dans le temps imparti.

Pour la présentation, nous avons contourné ce problème en simulant un utilisateur connecté (compte fictif “Marwen35”) afin de pouvoir illustrer les fonctionnalités principales.

Particularités du projet Git

Le projet n’affiche pas beaucoup de push sur le dépôt Git car nous avons dû le recommencer à zéro. En effet, des problèmes techniques survenus en cours de développement nous ont contraints à recréer le projet et à réintégrer le travail déjà réalisé. Nous avons alors uniquement poussé la version finale, accompagnée des dernières modifications apportées. Cela explique le faible nombre de commits visibles dans l’historique.

Présentation du projet

Malgré les contraintes rencontrées, nous avons mis en place :
	•	Une page dynamique pour afficher les articles et leurs commentaires, avec la possibilité d’ajouter de nouveaux commentaires.
	•	Une interface intuitive, permettant les interactions (likes/dislikes et ajout de commentaires).
	•	La gestion des images via un stockage local dans le dossier public.
	•	Une simulation réaliste d’utilisateur connecté (compte fictif “Marwen35”).

Ce projet représente une base solide pour évoluer vers une application pleinement fonctionnelle, avec la possibilité d’intégrer l’authentification et un stockage externe pour les images dans le futur.

Commandes pour démarrer le projet
	1.	Installer les dépendances :

npm install


	2.	Lancer le projet en mode développement :

npm run dev


	3.	Accéder à l’application :
Ouvrez http://localhost:3000 dans votre navigateur.

Remerciements

Nous remercions tous les membres de l’équipe pour leurs contributions :
	•	Désir pour son travail sur le frontend.
	•	Merwan et Imran pour leur implication dans le backend et la gestion des données.

Ce projet illustre notre capacité à collaborer efficacement et à surmonter les défis techniques pour fournir une solution fonctionnelle dans les délais impartis.
