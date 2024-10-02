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
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image URL is required",
        },
        notNull: {
          msg: "Image URL is required",
        }
      }
    },
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required",
        },
        notNull: {
          msg: "Price is required",
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};