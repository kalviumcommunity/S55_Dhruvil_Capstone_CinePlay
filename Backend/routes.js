const express = require('express');
const router = express.Router();
const { UserModel } = require('./UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const limiter = require('./rateLimiter');

router.use(express.json());

// Error handling for undefined ACCESS_TOKEN_SECRET
if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error('ACCESS_TOKEN_SECRET environment variable is not defined.');
}

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


router.put('/update/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername, newPassword } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (newUsername) user.username = newUsername;
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Signup route with bcrypt password hashing and rate limiting
router.post('/signup', limiter, async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        const newUser = await UserModel.create({ username, password: hashedPassword });
        // Send a response indicating successful signup
        res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Login route with bcrypt password verification and JWT tokenization
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) {
            console.log(`Login attempt failed for username: ${username}`);
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // Comparing hashed password
        if (!isPasswordValid) {
            console.log(`Login attempt failed for username: ${username}`);
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        console.log(`Login attempt successful for username: ${username}`);
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
