const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //on récupère le token en tant que deuxième élément dans le header authorization
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    
    //on récupère le userId de l'object decodedToken et on le vérifie dans le if
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      res.status(403).json({ error: 'Utilisateur non autorisé' });
    } else {
      next();
    }
  } catch {
    res.status(403).json({ error: 'Utilisateur non autorisé' });
  }
};