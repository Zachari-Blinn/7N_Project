const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

// Handle incoming GET requests to /user
router.post('/register', UserController.user_register);
router.post('/login', UserController.user_login);

module.exports = router;
