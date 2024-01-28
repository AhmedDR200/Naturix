const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser
} = require('../controllers/userController');

const router = express.Router();

router.route('/')
.get(getUsers);

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

router.route('/:id/follow')
.patch(followUser);

router.route('/:id/unfollow')
.patch(unFollowUser);



module.exports = router;