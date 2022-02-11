//Importation
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken')
const { Users } = require('../models')

//Middleware pour l'enregistrement de nouveau utilisateur
exports.signup = (req, res) => {
  const { username, password, email } = req.body;
bcrypt
    .hash(password, 10)
    .then((hash) => {
    // Crée l'user grâce à "create" qui combine "build" et "save"
    Users.create({
      username: username,
      password: hash,
      email: email,
    });
    res.status(201).json({ message: "Utilisateur créé" });
  });
};

//Middleware pour login à un compte existant
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Cherche user dans la BDD, en lui passant le body de la requête
  const user = Users.findOne({ where: { username: username } });

  if (!user) {
    res.status(401).json({ error: "Utilisateur non trouvé" });
  } else {
    // Vérifie avec bcrypt le mot de passe du body
    bcrypt
      .compare(password, user.password)
      .then((valid) => {
        if (!valid){
            return res.stauts(401).json({ error: "Mot de passe incorrect" });
        }
        // Crée le token avec sign de jsonwebtoken
        const accessToken = sign(
          { username: user.username, 
            id: user.id }, 
          "RANDOM_TOKEN_SECRET",
        );
        // Si c'est OK, envoi le token avec l'accessToken, l'username et l'id
        res.json({  token: accessToken, 
                    username: username, 
                    id: user.id });
    });
  }
};
