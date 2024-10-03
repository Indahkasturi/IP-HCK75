const{Album} = require('../models/index')
const fs = require('fs').promises; 
const path = require('path');


module.exports = class AlbumController{
 static async home(req, res, next){
    try {
        const album = await Album.findAll()
        res.status(200).json(album)
    } catch (error) {
      next(error)   
    }
 }   

 static async addAlbum(req, res, next){
    try {
       let album = await Album.create(req.body);
       res.status(201).json(album);
      throw { data: album, message: `Album ${req.body.albumTitle} created` };
    } catch (error) {
      next(error)
    }
 }   
 static async updateAlbumById(req, res, next){
    try {
        const {id} = req.params
        const album = await Album.findByPk(+id)
        if(!album){
         throw { name: "NotFound", message: `Data not found`}
        }
        await album.update(req.body)
        res.json(album)
    } catch (error) {
      next(error)
    }
 }   
 static async deleteAlbumById(req, res, next){
    try {
      const id = req.params.id
      const album = await Album.findByPk(+id)
      if(!album){
         throw {name: "NotFound", message: 'Data not found'}
      }
      await album.destroy()
      res.json({ message: ` ${album.albumTitle} by ${album.artistName} success to deleted` });
        
    } catch (error) {
      next(error)
    }
 }   

}