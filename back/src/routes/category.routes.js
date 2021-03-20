const express = require('express')
const router = express.Router()
const mustBeLoggedIn = require('../middlewares/mustBeLoggedIn.middlewares')
const attachCurrentUser = require('../middlewares/attachCurrentUser.middlewares')
const CategoryController = require('../controllers/category.controller')

router.post('/', mustBeLoggedIn, attachCurrentUser, CategoryController.category_create)
router.get('/:slug', CategoryController.category_findOne)
router.get('/', CategoryController.category_find)
router.put('/:slug', mustBeLoggedIn, attachCurrentUser, CategoryController.category_update)

module.exports = router
