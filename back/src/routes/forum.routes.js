const express = require('express')
const mustBeLoggedIn = require('../middlewares/mustBeLoggedIn.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')
const router = express.Router()

const ForumController = require('../controllers/forum.controller')

router.post('/', mustBeLoggedIn, attachCurrentUser, ForumController.forum_create)
router.get('/', ForumController.forum_find)
router.get('/:slug', ForumController.forum_findOne)
router.put('/:slug', ForumController.forum_update)
router.delete('/:slug', ForumController.forum_delete)

module.exports = router
