//Importation
const express = require("express");
const router = express.Router();

//Importation middleware token authentificateur
const auth = require("../middlewares/authentification");

//Controleur pour associer les fonctions aux différentes routes
const userCtrl = require("../controllers/users_controllers");


//POST - Création d'un compte
//POST - Connection d'un utilisateur
//GET -  Récup info d'un utilisateur

//PUT - Changement d'un mot de passe, image de profil, username
//DELETE - Supprimer un compte

router.post ("/signup", userCtrl.signup);
router.post ("/login", userCtrl.login);
router.get ("/accountInfo/:id",auth, userCtrl.accountInfo);

router.put ("/changePassword",auth, userCtrl.changePassword);
router.delete ("/deleteAccount/:id",auth, userCtrl.deleteAccount);

module.exports = router;