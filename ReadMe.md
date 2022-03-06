# P7 - Groupomania #

## Le projet ##

C’est un réseau social interne où les utilisateurs peuvent poster des photos et les commenter

## Technologies utilisés  ##

### backend: 

NodeJS, Express, Sequelize ORM, MySQL, bcrypt et jsonwebtoken

### frontend: 

React, axios, Formik, Yup, bootstrap et sass

## Prérequis ##

Git, NODE, npm et Mysql 

## Installation  ##

Cloner ce repository avec git 

```bash
git clone https://github.com/FYTomi/PhamDanielTomi_7_27012022.git
```

## MySQL

- Ouvrez un deuxième terminal.

- Connectez-vous à mysql.

- Importez le fichier " groupomania.sql "


```bash
mysql -u username -p groupomania < groupomania.sql
```
- Remplacer si nécessaire dans le fichier config/config.json le nom d'utilisateur et mot de passe pour accéder à la base de données MySQL

- username (par défault "root") est le nom d'utilisateur avec lequel vous pouvez vous connecter à la base de données

- Le mot de passe nécessaire est le suivant "ApQOlala49s3@", à remplacer en cas d'utilsation officelle en tant que variable d'environnement stocké dans .env (qui devra être ignoré dans ".gitignore")

Ceci va créer une base de données nommée "groupomania" à partir du fichier importé


 ## Côté backend :
Dans un terminal
1) cd backend
2) npm install
3) nodemon start

Affichage dans le terminal "Connecté à la base de donnée MySQL, Listening on port 5000" 

## Côté frontend :
Dans un autre terminal
1) cd frontend
2) npm install
3) npm start

Le navigateur s'ouvre automatiquement à l'adresse suivante "http://localhost:3000/login"