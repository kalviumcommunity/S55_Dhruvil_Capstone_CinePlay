const express = require('express');
const router = express.Router();
const { UserModel } = require('./UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.use(express.json());

// Signup route with bcrypt password hashing
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        const newUser = await UserModel.create({ username, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route with bcrypt password verification and JWT tokenization
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // Comparing hashed password
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET); 
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Internal server error' }); 
    }
});


module.exports = router;
