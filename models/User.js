const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model{
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) =>{
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            beforeUpdate: async (updateUserData) =>{
                updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
                return updateUserData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "users",
    },
)

module.exports = User;