const express = require('express');
const { Post, User, Comment } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const post = await Post.findAll({
            include: ({ model: User, attrubutes: ['username'] }, Comment],
        });
        res.render('homepage' {[posts ]});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});