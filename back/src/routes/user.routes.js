const express = require('express')
const checkAuth = require('../middlewares/security/token.security')
const router = express.Router()

const UserController = require('../controllers/user.controller')

router.post('/', UserController.user_create)
router.get('/', UserController.user_find)
router.get('/:id', UserController.user_findOne)
router.put('/:id', UserController.user_update)
router.delete('/:id', UserController.user_delete)
router.get('/me', checkAuth, UserController.user_me)

module.exports = router
