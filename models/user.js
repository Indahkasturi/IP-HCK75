"use strict";
const { hash } = require("../helper/hash");
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
      User.hasMany(models.AlbumUser);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Password is required",
          },
          isEmail: {
            args: true,
            msg: "Email format is worng",
          },
        },
        unique: {
          args: true,
          msg: "Email already in use",
        },
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          len: {
            args: [5],
            msg: "password length min 5 characters",
          },
        },
      },
      role:{
        type: DataTypes.STRING,
        defaultValue: "user"
      }
    },
    {
      hooks:{
        beforeValidate: async (instance, option)=>{
          instance.password = await hash(instance.password)
        }
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
