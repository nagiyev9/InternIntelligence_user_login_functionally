const rateLimit = require('express-rate-limit');

// Custom message
const message = {
    message: 'Too many requests, please try again later.'
};

// Limit Rules
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: (req, res) => {
        res.status(429).json(message);
    },
    keyGenerator: (req) => req.body.email || req.body.password || req.ip
});

module.exports = limiter;