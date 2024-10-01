'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.AlbumUser)
    }
  }
  Album.init({
    artistName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Artist name is required",
        },
        notNull: {
          msg: "Artist name is required",
        }
      }
    },
    albumTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Album title is required",
        },
        notNull: {
          msg: "Album title is required",
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Genre is required",
        },
        notNull: {
          msg: "Genre is required",
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};