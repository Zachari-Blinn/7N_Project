const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/token.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const TopicController = require('../controllers/topic.controller')

router.post('/', checkAuth, attachCurrentUser, TopicController.topic_create)

module.exports = router
