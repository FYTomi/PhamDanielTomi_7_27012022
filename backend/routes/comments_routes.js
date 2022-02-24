//Importation
const express = require("express");
const router = express.Router();

//Importation middleware token authentificateur
const {validateToken} = require('../middlewares/authentification')

//Controleur pour associer les fonctions aux différentes routes
const commentsCtrl = require("../controllers/comments_controllers");

//GET - Affiche les commentaires d'un post
//POST - Créer un commentaire
//DELETE - Supprimer son commentaire

router.get ("/:postId", commentsCtrl.displayPostComments);
router.post ("/",validateToken, commentsCtrl.addComment);
router.delete ("/:commentId",validateToken, commentsCtrl.deleteComment);

module.exports = router;