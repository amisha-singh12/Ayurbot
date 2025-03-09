const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('/login');
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send('Server error');
            }
            res.redirect('/test');
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Server error');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('error', 'Email already exists');
            return res.redirect('/signup');
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();
        req.flash('success', 'Registration successful! Please login');
        res.redirect('/login');

    } catch (err) {
        console.error('Signup error:', err);
        req.flash('error', 'Registration failed');
        res.redirect('/signup');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
