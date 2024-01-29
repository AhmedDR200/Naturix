const express = require('express');
const {
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    getTimelinePosts,
} = require('../controllers/postController');

const router = express.Router();

router.post('/', createPost);

router.route('/:id')
.get(getPost)
.patch(updatePost)
.delete(deletePost);


router.put('/:id/like', likePost);
router.get('/:id/timeline', getTimelinePosts);

module.exports = router;