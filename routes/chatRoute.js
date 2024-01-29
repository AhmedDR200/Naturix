const express = require('express');

const router = express.Router();

const {
    createChat,
    userChats,
    findChat,
} = require('../controllers/chatController');


router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);


module.exports = router;