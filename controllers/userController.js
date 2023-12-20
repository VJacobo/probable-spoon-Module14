const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.creat({ username, password: hashedPassword});
        req.session.user_id = user.id;
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username }});

        if (!user ||!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password'}));
        }

        req.session.user_id = user.id;
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});