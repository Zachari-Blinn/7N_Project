const express = require('express')
const checkAuth = require('../middlewares/security/token.security')
const router = express.Router()

const CategoryController = require('../controllers/category.controller')

router.post('/', checkAuth, CategoryController.category_create)

module.exports = router
