const express = require('express')
const checkAuth = require('../middlewares/security/token.security')
const router = express.Router()

const ReplyController = require('../controllers/reply.controller')

router.post('/', checkAuth, ReplyController.reply_create)

module.exports = router
