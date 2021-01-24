const express = require('express');

const router = express.Router();

const ForumController = require('../controllers/forum.controller');

router.post('/', ForumController.forum_create);
router.get('/', ForumController.forum_find);
router.get('/:id', ForumController.forum_findOne);
router.put('/:id', ForumController.forum_update);
router.delete('/:id', ForumController.forum_delete);

module.exports = router;