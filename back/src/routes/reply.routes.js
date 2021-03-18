const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/token.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const ReplyController = require('../controllers/reply.controller')

router.post('/', checkAuth, ReplyController.reply_create)

module.exports = router
