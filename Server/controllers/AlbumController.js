const { Album, AlbumUser } = require("../models/index");
const fs = require("fs").promises;
const path = require("path");
const cloudinary = require ('../helper/cludinary')


module.exports = class AlbumController {
  static async home(req, res, next) {
    try {
      const album = await Album.findAll();
      res.status(200).json(album);
    } catch (error) {
      next(error);
    }
  }

  static async adminHome(req, res, next) {
    try {
      const album = await Album.findAll();
      res.status(200).json(album);
    } catch (error) {
      next(error);
    }
  }

  static async addAlbum(req, res, next) {
    try {
      let album = await Album.create(req.body);
      res.status(201).json(album);
      throw { data: album, message: `Album ${req.body.albumTitle} created` };
    } catch (error) {
      next(error);
    }
  }

  static async updateAlbumById(req, res, next) {
    try {
      const { id } = req.params;
      const album = await Album.findByPk(+id);
      if (!album) {
        throw { name: "NotFound", message: `Data not found` };
      }
      await album.update(req.body);
      res.json(album);
    } catch (error) {
      next(error);
    }
  }
  static async uploadImg(req, res, next) {
    try {
      const { id } = req.params;
      const imageUrl = await Album.findByPk(+id)
      if(!imageUrl){
        throw {name: "NotFound", message: "Data not found"}
      }
      const mimeType = req.file.mimetype;
      const base64Image = req.file.buffer.toString("base64");
  
      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64Image}`,
        {
          folder: "album",
          public_id: req.file.originalname,
        }
      );
      await imageUrl.update({ imageUrl: result.secure_url });
      res.json({ message: `image ${imageUrl.albumTitle} succes to update` });
    } catch (error) {
      next(error)
    }
  }
  static async deleteAlbumById(req, res, next) {
    try {
      const { id } = req.params;
      const album = await Album.findByPk(+id);
      if (!album) {
        throw { name: "NotFound", message: "Data not found" };
      }
      await album.destroy();
      res.json({ message: `Album ${album.albumTitle} deleted` });
    } catch (error) {
      next(error);
    }
    }
  //   try {
  //     console.log("<<<<<<<<<<");
      
  //     const id = req.params.id;
  //     const albumUser = await AlbumUser.findAll({where:{AlbumId: +id}})
  //     console.log(albumUser+"<<<<<<<<<<<<<<<<<<<<<<");
      
  //     const album = await Album.findByPk(+id);
  //     if (!album) {
  //       throw { name: "NotFound", message: "Data not found" };
  //     }
  //     await album.destroy();
  //   } catch (error) {
  //     next(error);
  //   }
  // }
};
