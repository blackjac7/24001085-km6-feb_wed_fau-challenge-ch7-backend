"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Message, {
                foreignKey: "sender_id",
            });
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.TEXT,
            photo: DataTypes.TEXT,
            gender: DataTypes.ENUM("male", "female"),
        },
        {
            sequelize,
            modelName: "User",
            paranoid: true,
        }
    );
    return User;
};
