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
//GET - Vérification authentification
//PUT - Changement d'un mot de passe
//DELETE - Supprimer un compte

router.post ("/signup", userCtrl.signup);
router.post ("/login", userCtrl.login);
//router.get ("/accountInfo",auth, userCtrl.accountInfo);
//router.get ("/authentificate", userCtrl.authentification);
//router.put ("/changePassword",auth, userCtrl.changePassword);
//router.delete ("/deleteAccount/:id",auth, userCtrl.deelteAccount);

module.exports = router;