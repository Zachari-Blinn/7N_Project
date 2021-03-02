const express = require('express')
const checkAuth = require('../middlewares/security/token.security')
const router = express.Router()

const TopicController = require('../controllers/topic.controller')

router.post('/', checkAuth, TopicController.topic_create)

module.exports = router
