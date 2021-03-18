const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/token.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const UserController = require('../controllers/user.controller')

router.post('/', UserController.user_create)
router.get('/', UserController.user_find)
router.get('/:id', UserController.user_findOne)
router.put('/:id', UserController.user_update)
router.delete('/:id', UserController.user_delete)

module.exports = router
