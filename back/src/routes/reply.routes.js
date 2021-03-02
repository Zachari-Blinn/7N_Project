const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/security/token.security')
const attachCurrentUser = require('../middlewares/security/attachCurrentUser.security')

const ReplyController = require('../controllers/reply.controller')

router.post('/', checkAuth, ReplyController.reply_create)

module.exports = router
