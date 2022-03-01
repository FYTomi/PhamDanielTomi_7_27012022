const { verify } = require("jsonwebtoken");
require('dotenv').config
const validateToken = async (req, res, next) => {
  const accessToken = req.header("accessToken"); 
console.log(accessToken)
  // Vérifie si l'utilisateur est connecté
  if (!accessToken) 
    return res.json({ error: "L'utilisateur n'est pas connecté !" });

  //Vérifie si le token est valide
  try {
    const validToken = verify(accessToken, `${process.env.USER_TOKEN}`); 
    req.user = validToken

    
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };