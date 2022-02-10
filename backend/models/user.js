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
        }
    });
    return Users;
};