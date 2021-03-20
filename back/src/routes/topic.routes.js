const express = require('express')
const router = express.Router()

const mustBeLoggedIn = require('../middlewares/mustBeLoggedIn.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const TopicController = require('../controllers/topic.controller')

router.post('/', mustBeLoggedIn, attachCurrentUser, TopicController.topic_create)

module.exports = router
