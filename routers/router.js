const express = require('express')
const UserController = require('../controllers/UserConstroller')
const AlbumController = require('../controllers/AlbumController')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/', AlbumController.home)
router.post('/addAlbum', AlbumController.addAlbum)
router.put('/update/:id', AlbumController.updateAlbumById)
router.delete('/delete/:id', AlbumController.deleteAlbumById)
router.post('/cart/:id', AlbumController.addToCart)
router.post('/logout/:id', AlbumController.logOut)