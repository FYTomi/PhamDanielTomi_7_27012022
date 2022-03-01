//Création de la table Posts
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  //Relation entre un post et les différents commentaires qu'il peut avoir
  //Tous ces éléments seront supprimés si le post est supprimé (onDelete: "cascade")
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };
  return Posts;
};
