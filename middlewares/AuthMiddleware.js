
const { expressjwt } = require('express-jwt');
const User = require('../models/User');

// Middleware to check if the user is signed in
exports.isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth', // attaches the user object to req.auth
});

// Middleware to check if the user is an admin
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access denied' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};