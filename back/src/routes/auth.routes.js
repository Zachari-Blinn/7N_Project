const express = require('express')
const checkAuth = require('../middlewares/security/token.security')
const attachCurrentUser = require('../middlewares/security/attachCurrentUser.security')
const router = express.Router()

const AuthController = require('../controllers/auth.controller')

router.post('/register', AuthController.auth_register)
router.post('/login', AuthController.auth_login)
router.get('/me', checkAuth, attachCurrentUser, AuthController.auth_me)
router.post('/resetPassword', AuthController.auth_reset_password)

module.exports = router
