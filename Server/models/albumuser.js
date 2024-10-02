'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AlbumUser.belongsTo(models.Album)
      AlbumUser.belongsTo(models.Album)
    }
  }
  AlbumUser.init({
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'User Id is required'
        },
        notNull:{
          msg: 'User Id is required'
        }
      }
    },
    AlbumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'Album Id is required'
        },
        notNull:{
          msg: 'Album Id is required'
        }
      }
    }, 
    quantity: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'AlbumUser',
  });
  return AlbumUser;
};