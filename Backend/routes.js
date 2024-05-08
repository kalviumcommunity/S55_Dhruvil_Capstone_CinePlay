const express = require('express');
const router = express.Router();
const { UserModel } = require('./UserSchema');
const rateLimit = require('express-rate-limit');

router.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later'
});

// Defining the get request with JSON response
router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({}, 'username');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Signup route without password hashing
router.post('/signup', limiter, async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const newUser = await UserModel.create({ username, password });
        // Send a response indicating successful signup
        res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});


// Login route without password verification and tokenization
router.post('/login', limiter, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
