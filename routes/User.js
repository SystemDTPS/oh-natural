const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getUserProfile } = require('../controllers/Auth');
const { isSignedIn, isAdmin } = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Registration Route
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('mobile').notEmpty().withMessage('Mobile is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    registerUser
);

// Login Route
router.post(
    '/login',
    [
        body('mobile').notEmpty().withMessage('Mobile is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    loginUser
);

// Protected User Profile Route (User Only)
router.get('/profile', isSignedIn, getUserProfile);

// Admin Only Route Example
router.get('/admin', isSignedIn, isAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin!' });
});

module.exports = router;