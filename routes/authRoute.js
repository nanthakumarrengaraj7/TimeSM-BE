const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /register - Register user
router.post('/register', authController.register);

// POST /login - Signup user
router.post('/login', authController.login);

module.exports = router;
