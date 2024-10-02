const express = require('express')
const UserController = require('../controllers/UserConstroller')
const AlbumController = require('../controllers/AlbumController')
const { errorHandler } = require('../middleware/errorHandler')
const authentication = require('../middleware/authentication')
const AlbumUserController = require('../controllers/AlbumUserController')
const { isAdmin } = require('../middleware/authorization')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/', AlbumController.home)
router.post('/cart/:id', AlbumUserController.cart)
router.get('/cart', AlbumUserController.getCart)
router.delete('/deletecart/:id', AlbumUserController.deleteCart)
router.post('/addAlbum', isAdmin, AlbumController.addAlbum)
router.put('/update/:id', isAdmin, AlbumController.updateAlbumById)
router.delete('/delete/:id', isAdmin, AlbumController.deleteAlbumById)

router.use(errorHandler)

module.exports = router