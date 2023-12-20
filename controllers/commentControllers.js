const express = require('express');
const { Comment } = require('../models');
const router = express.Router();

// New Comment
router.post('/', async (req, res) => {
    try {
        const { text, postId, userId } = req.body;
        const comment = await Comment.create({
            text,
            postId,
            userId,
        });

        res.status(201).json(comment);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error '});
    }
});

// Update existing comment
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.params;

        const comment = await Comment.findByPk(id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found'});
        }

        comment.text = text;
        await comment.save();
         res.json(comment);
    } catch (err) {
         console.error(err);
         res.status(500).json({ message: 'Internal Server Error'});
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        await comment.destroy();

        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
