const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.route("/register")
.post(registerUser)

// Login Route
router.route("/login")
.post(loginUser)

module.exports = router;