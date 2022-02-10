//Création de la table Likes
module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes");
  
    return Likes;
  };