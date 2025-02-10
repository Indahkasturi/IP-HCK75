const { Album, AlbumUser } = require("../models/index");
const fs = require("fs").promises;
const path = require("path");
const cloudinary = require("../helper/cludinary");

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
    } catch (error) {
      next(error);
    }
  }
  static async getAlbumById(req, res, next) {
    try {
        const { id } = req.params;
        const album = await Album.findByPk(+id);
        if (!album) {
            throw { name: "NotFound", message: `Album with ID ${id} not found` };
        }
        res.json(album);
    } catch (error) {
        console.log("Error in getAlbumById:", error);
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
      const album = await Album.findByPk(+id);
      if (!album) {
        throw { name: "NotFound", message: "Data not found" };
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
      await album.update({ imageUrl: result.secure_url });
      res.json({ message: `Image for album ${album.albumTitle} successfully updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAlbumById(req, res, next) {
    try {
      const { id } = req.params;
      const album = await Album.findByPk(+id);
      if (!album) {
        throw { name: "NotFound", message: "Data not found" };
      }

      // Delete associated AlbumUser records
      await AlbumUser.destroy({ where: { AlbumId: +id } });

      // Delete the album
      await album.destroy();
      res.json({ message: `Album ${album.albumTitle} deleted` });
    } catch (error) {
      next(error);
    }
  }
};