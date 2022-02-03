module.exports = (sequelize, DataTypes)=>{
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwords:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Users;
};