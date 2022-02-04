const bcrypt = require("bcrypt");
//importation jsonwebtoken
const jsonWebToken = require("jsonwebtoken");

const { Users } = require("../models");

//Création d'un compte
exports.signup = (req, res) => {
    const {username, password, email } = req.body
    bcrypt
    .hash(password, 10)
    .then((hash) => {
      Users.create({
        username: username,
        password: hash,
        email: email
      });
      res.json("Inscription d'un nouveau compte réussite")
    })
    
};

/* //Middleware pour login à un compte existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}; */
