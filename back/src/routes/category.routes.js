const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/security/token.security')
const attachCurrentUser = require('../middlewares/security/attachCurrentUser.security')

const CategoryController = require('../controllers/category.controller')

router.post('/', checkAuth, attachCurrentUser, CategoryController.category_create)
router.get('/:slug', CategoryController.category_findOne)
router.get('/', CategoryController.category_find)

module.exports = router
