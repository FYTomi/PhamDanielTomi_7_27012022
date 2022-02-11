//Importation jwt
const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const accessToken = req.header("accessToken");

  // Vérifie si accessToken existe, si quelqu'un est connecté
  if (!accessToken)
    return res.json({ error: "L'utilisateur n'est pas connecté !" });

  // Utilise verify de jsonwebtoken pour voir si le token est valide
  try {
    const validToken = jsonWebToken.verify(accessToken, "RANDOM_TOKEN_SECRET"); 
    req.user = validToken; // Crée une variable user avec les informations de validToken (username + id)

    // Si validToken est true, autorise la poursuite de la requête
    if (validToken) {
      return next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};

