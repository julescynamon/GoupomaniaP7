GROUPOMANIA

Ceci est le dernier projet de ma formation Openclassrooms, création d'un réseau social d'entreprise : Groupomania

J'ai réalise tout le BackEnd et tout le FrontEnd. C'est mon premier projet utilisant SQL, et j'ai choisis d'utiliser MySQL sans utiliser d'ORM et en se servant du serveur XAMPP et PHPMyAdmin pour visualiser ma BDD.

C'est également mon premier projet avec React. J'ai beaucoup appris, mais je sens qu'il va falloir encore quelques projets pour bien utiliser REACT, pour ce projet j'ai choisie de rester sur la version 17, en effet la version 18 est sortie au cour de mon apprentissage et je n'avais pas le temps de tout reprendre car il y a beaucoup de changement dans cette nouvelle version.

Pour la mise en place du front j'ai utilisé la base d'un projet que j'avais fais en exercice a coté de mes cours lors de l'apprentissage du P6 qui était un projet MERN, REACT plus MONGODB. Pour le CSS j'ai utilisé SASS car j'aime beaucoup ce framework.

Pour lancer le projet :

Se rendre dans dossier backend et installer node et toute les dépendances :

cd backend/ && npm install

Ensuite, lancer le server :

npm run start

Enfin, pour lancer le Front, ouvrir un nouveau terminal et se rendre dans le dossier frontend

cd frontend/

Lancer l'instalation de mon packageJson:

npm install 

puis lancer react

npm start

Penser a bien lancer votre base de donnee MYSQL en changeant les codes de connexions dans le dossier du backend/config/db.js avant de faire un npm run start.
La config de la BDD est dans le dossier backend/configSql.
Pour la config du dossier .env coté back aller voir dans le fichier .env.info
Pour la config du dossier .env coté front aller voir dans le dossier frontend/config/.env.info
Si il y a des erreurs, essayer de lancer ces commandes en étant admin.
