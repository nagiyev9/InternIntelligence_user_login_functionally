// Path 
const express = require('express');

// Imports 
const authController = require('../controllers/auth-controller');
const { validate_register, handle_validation_errors } = require('../middlewares/validation');
const limiter = require('../middlewares/limiter');

// Router 
const router = express.Router();

// Register 
router.post('/register', validate_register, handle_validation_errors, authController.register);

// Login 
router.post('/login', limiter, authController.login);

// Logout
router.post('/logout/:id', authController.logout); 

// Refresh Token 
router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router;