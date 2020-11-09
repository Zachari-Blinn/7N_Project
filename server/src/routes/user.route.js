const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

// Handle incoming GET requests to /user
router.post('/', UserController.user_register);

module.exports = router;
