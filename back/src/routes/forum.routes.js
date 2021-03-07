const express = require('express')
const checkAuth = require('../middlewares/security/token.security')
const attachCurrentUser = require('../middlewares/security/attachCurrentUser.security')
const router = express.Router()

const ForumController = require('../controllers/forum.controller')


router.get('/test', ForumController.forum_test)

router.post('/', checkAuth, attachCurrentUser, ForumController.forum_create)
router.get('/', ForumController.forum_find)
router.get('/:id', ForumController.forum_findOne)
router.put('/:id', ForumController.forum_update)
router.delete('/:id', ForumController.forum_delete)

module.exports = router
