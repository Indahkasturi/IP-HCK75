const { AlbumUser } = require("../models");
const { Album } = require("../models");

module.exports = class AlbumUserController {
  static async cart(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const album = await Album.findByPk(id);

      if (!album) {
        return next({ statusCode: 404, message: "Album not found" });
      }
      const albumUser = await AlbumUser.create({
        UserId: userId,
        AlbumId: album.id,
      });
      return res.status(201).json(albumUser);
    } catch (error) {
      next(error);
    }
    // try {
    //     const {UserId, AlbumId} = req.body
    //     const album = await Album.findByPk(AlbumId);
    //     const user = await User.findByPk(UserId);
    //     if (!album) {
    //         return next({ statusCode: 404, message: 'Album tidak ditemukan' });
    //       }
    //       if (!user) {
    //         return next({ statusCode: 404, message: 'User tidak ditemukan' });
    //       }
    //       const albumUser = await AlbumUser.create({ UserId: userId, AlbumId: albumId });
    //       return res.status(201).json(albumUser);
    // } catch (error) {
    //     next (error)
    // }
  }

};
