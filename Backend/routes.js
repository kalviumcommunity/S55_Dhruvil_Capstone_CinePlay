const express = require('express');
const router = express.Router();
const { UserModel } = require('./UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

router.use(express.json());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later'
  });

// Defining the get request with JSON response
router.get('/info', (req, res) => {
    try {
        res.json({ message: 'this is a get request' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  
// Signup route with bcrypt password hashing
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
router.post('/login', limiter, async (req, res) => {
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
