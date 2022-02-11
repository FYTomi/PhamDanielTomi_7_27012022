//Importation
const express = require("express");
const router = express.Router();

//Importation middleware token authentificateur
const auth = require("../middlewares/authentification");

//Controleur pour associer les fonctions aux différentes routes
const postsCtrl = require("../controllers/posts_controllers");

//GET -  Affichage de tout les posts
//GET - Affichage d'un post
//GET - Affichage des posts d'un utilsateur
//POST - Création d'un post
//PUT - Mettre à jour le titre d'un post
//PUT - Mettre à jour le texte d'un post
//DELETE - Supprime un post