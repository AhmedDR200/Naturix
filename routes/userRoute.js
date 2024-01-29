const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
.get(getUsers);

router.route('/:id')
.get(getUser)
.patch(authMiddleware, updateUser)
.delete(authMiddleware, deleteUser);

router.route('/:id/follow')
.patch(authMiddleware, followUser);

router.route('/:id/unfollow')
.patch(authMiddleware, unFollowUser);


module.exports = router;