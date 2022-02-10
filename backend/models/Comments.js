// Création de la table Comments
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    // Commentaire
    commentBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
    return Comments;
};
