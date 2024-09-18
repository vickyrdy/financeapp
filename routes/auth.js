const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { authenticateToken } = require('../middleware/authMiddleware');

let verificationCodes = {}; // Temporary storage for verification codes

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during user registration:', err);  // Log any error during registration
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// User Login (Step 1: Validate credentials and send verification code)
router.post('/login', async (req, res) => {
    console.log('Login request body:', req.body);  // Debugging log
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);  // Debugging log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match for user:', email);  // Debugging log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate and send 5-digit verification code
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
        verificationCodes[email] = verificationCode;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is ${verificationCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification code email:', error);  // Log the error
                return res.status(500).json({ message: 'Failed to send verification code' });
            } else {
                console.log('Verification code sent to:', email);  // Log successful email send
                return res.status(200).json({ message: 'Verification code sent to email' });
            }
        });

    } catch (err) {
        console.error('Error during login process:', err);  // Log the full error stack trace
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Verify 2FA code (Step 2: Verify code and issue JWT)
router.post('/verify-2fa', async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        if (verificationCodes[email] && verificationCodes[email] === verificationCode) {
            delete verificationCodes[email]; // Clear the code after successful verification

            const user = await User.findOne({ email });
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ token });
        } else {
            console.log('Invalid verification code for user:', email);  // Debugging log
            return res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (err) {
        console.error('Error during 2FA verification process:', err);  // Log the full error stack trace
        res.status(500).json({ message: 'Server error during 2FA verification' });
    }
});

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);  // Log any error during profile fetch
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
