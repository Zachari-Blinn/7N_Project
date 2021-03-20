const express = require('express')
const router = express.Router()

const mustBeLoggedIn = require('../middlewares/mustBeLoggedIn.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const ReplyController = require('../controllers/reply.controller')

router.post('/', mustBeLoggedIn, ReplyController.reply_create)

module.exports = router
