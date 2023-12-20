const express = require('express');
const userController = require('./userController');
const postController = require('./postController');
const commentController = require('./commentController');

const router = express.Router();

router.use('/users', userController);
router.use('/posts', postController);
router.use('/comment', commentController);

module.exports = router;
