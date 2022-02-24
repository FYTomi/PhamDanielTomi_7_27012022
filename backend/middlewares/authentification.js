const { verify } = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const accessToken = req.header("accessToken"); 

  // Vérifie si l'utilisateur est connecté
  if (!accessToken) return res.json({ error: "L'utilisateur n'est pas connecté !" });

  
  try {
    const validToken = verify(accessToken, `RANDOM_TOKEN_SECRET`); 

    
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };