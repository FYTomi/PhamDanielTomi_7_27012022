//Importation
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken')
const { Users } = require('../models')

//Middleware pour l'enregistrement de nouveau utilisateur
exports.signup = async(req, res) => {
  const { username, password, email } = req.body;
  const user = await Users.findOne({where: {username: username}})

  if (user) {
    res.json({error: "L'utilisateur existe déjà"})
  } else {
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
}};

//Middleware pour login à un compte existant
exports.login = async(req, res) => {
  const { username, password } = req.body;

  // Cherche user dans la BDD, en lui passant le body de la requête
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.status(401).json({ error: "Utilisateur non trouvé" });
  } else {
    // Vérifie avec bcrypt le mot de passe du body
    bcrypt
      .compare(password, user.password)
      .then((valid) => {
        if (!valid){
            return res.status(401).json({ error: "Mot de passe incorrect" });
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


//Récupération des infos d'un compte

exports.accountInfo = async(req, res) => {
  const id = req.params.id

  const userInfo = await Users.findByPk(id, {
    attribute: { exclude: ['password']},
  })
  res.json(this.accountInfo)
};

//Modification d'un mot de passe

exports.changePassword = async(req, res) => {
  const { oldPassword, newPassword} = req.body

  const user = await Users.findOne({ where : { username: req.user.username}})

  bcrypt.compare(oldPassword, user.password).then((match) =>{
    if (!match) {
      res.status(406).json({ error: 'Mot de passe incorrect'})
    } else {
      bcrypt
        .hash(newPassword, 10)
        .then ((hash) =>{
          Users.update(
            {password: hash},
            {where: {username: req.user.username} })

          res.status(200).json('Le mot de passe a bien été changé')
        });
    };
  });
};

//Suppression d'un utilisateur

exports.deleteAccount = async (req, res) => {
  const userId = req.params.id
  await Users.destroy ({
    where: {
      id:userId,
    },
  }),
  res.status(200).json("Le compte a été supprimé")
};