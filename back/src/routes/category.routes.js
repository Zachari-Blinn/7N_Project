const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/token.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')

const CategoryController = require('../controllers/category.controller')

router.post('/', checkAuth, attachCurrentUser, CategoryController.category_create)
router.get('/:slug', CategoryController.category_findOne)
router.get('/', CategoryController.category_find)

module.exports = router
