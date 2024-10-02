const express = require('express')
const UserController = require('../controllers/UserConstroller')
const AlbumController = require('../controllers/AlbumController')
const { errorHandler } = require('../middleware/errorHandler')
const authentication = require('../middleware/authentication')
const AlbumUserController = require('../controllers/AlbumUserController')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/', AlbumController.home)
// router.post('/cart', AlbumController.addToCart)
router.post('/cart/:id', AlbumUserController.cart)
router.post('/addAlbum', AlbumController.addAlbum)
router.put('/update/:id', AlbumController.updateAlbumById)
router.delete('/delete/:id', AlbumController.deleteAlbumById)

router.use(errorHandler)

module.exports = router