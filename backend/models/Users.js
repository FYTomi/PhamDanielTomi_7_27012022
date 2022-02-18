//Création de la table Users
module.exports = (sequelize, DataTypes)=>{
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: {msg:"L'email doit être valide"},
            }
        },
        adminStatus:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

//Relation entre un utilisateur et les différents posts, commentaires et likes qu'il peut avoir
//Tous ces éléments seront supprimés si le compte est supprimé (onDelete: "cascade")
Users.associate = (models) => {
    Users.hasMany(models.Posts, {
        onDelete: "cascade",
    });
    Users.hasMany(models.Comments, {
        onDelete: "cascade",
    });
    Users.hasMany(models.Likes, {
        onDelete: "cascade",
    });
};
    return Users;
};