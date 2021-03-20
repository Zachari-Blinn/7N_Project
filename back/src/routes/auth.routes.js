const express = require('express')
const mustBeLoggedIn = require('../middlewares/mustBeLoggedIn.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')
const router = express.Router()

const AuthController = require('../controllers/auth.controller')

router.post('/register', AuthController.auth_register)
router.post('/login', AuthController.auth_login)
router.get('/me', mustBeLoggedIn, attachCurrentUser, AuthController.auth_me)
router.post('/resetPassword', AuthController.auth_reset_password)

module.exports = router
