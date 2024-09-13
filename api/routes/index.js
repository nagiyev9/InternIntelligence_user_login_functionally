// Path 
const express = require('express');

// Imports 
const authRouter = require('./auth');

// Router 
const router = express.Router();

router.use('/auth', authRouter);

module.exports = router;