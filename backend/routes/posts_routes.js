//Importation
const express = require("express");
const router = express.Router();
const multer = require('../middlewares/multer')

//Importation middleware token authentificateur
const {validateToken} = require('../middlewares/authentification')

//Controleur pour associer les fonctions aux différentes routes
const postsCtrl = require("../controllers/posts_controllers");

//GET -  Affichage de tout les posts
//GET - Affichage d'un post
//GET - Affichage des posts d'un utilsateur
//POST - Création d'un post
//PUT - Mettre à jour le titre d'un post
//PUT - Mettre à jour le texte d'un post
//DELETE - Supprime un post

router.get ("/posts",validateToken, postsCtrl.displayPosts);
router.get ("/post/:id", postsCtrl.displayPost);
router.get ("/userPosts/:id", postsCtrl.displayUserPosts);
router.post ("/post",validateToken,multer, postsCtrl.createPost);
router.put ("/changeTitle",validateToken, postsCtrl.changePostTitle);
router.put ("/changeText",validateToken, postsCtrl.changePostText);
router.delete ("/:postId",validateToken, postsCtrl.deletePost);

module.exports = router;