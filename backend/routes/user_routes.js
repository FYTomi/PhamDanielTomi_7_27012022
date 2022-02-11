//Importation
const express = require("express");
const router = express.Router();
//Controleur pour associer les fonction aux différentes routes
const userCtrl = require("../controllers/users_controllers");


//POST - Création d'un compte
//POST - Connection d'un utilisateur
//GET -  Récup info d'un utilisateur
//GET - Vérification authentification
//PUT - Changement d'un mot de passe
//DELETE - Supprimer un compte
router.post ("/signup", userCtrl.signup);
router.post ("/login", userCtrl.login);
router.get ("/accountInfo", userCtrl.accountInfo);
router.get ("/login", userCtrl.authentification);
router.put ("/signup", userCtrl.changePassword);
router.delete ("/login", userCtrl.deelteAccount);

module.exports = router;