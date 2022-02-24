//Importation
const express = require("express");
const router = express.Router();

//Importation middleware token authentificateur
const {validateToken} = require('../middlewares/authentification')

//Controleur pour associer les fonctions aux différentes routes
const userCtrl = require("../controllers/users_controllers");


//POST - Création d'un compte
//POST - Connection d'un utilisateur
//GET -  Récup info d'un utilisateur
//GET - Vérification si l'utilisateur est authentifié
//PUT - Changement d'un mot de passe, image de profil, username
//DELETE - Supprimer un compte

router.post ("/signup", userCtrl.signup);
router.post ("/login", userCtrl.login);
router.get ("/accountInfo/:id",validateToken, userCtrl.accountInfo);
router.get("/verify", validateToken, userCtrl.authentify);
router.put ("/password",userCtrl.changePassword);
router.delete ("/deleteAccount/:id",validateToken, userCtrl.deleteAccount);

module.exports = router;