const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/security/token.security')
const attachCurrentUser = require('../middlewares/security/attachCurrentUser.security')

const TopicController = require('../controllers/topic.controller')

router.post('/', checkAuth, attachCurrentUser, TopicController.topic_create)

module.exports = router
