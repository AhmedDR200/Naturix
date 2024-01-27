const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 * @access  Public
 */
const registerUser = asyncHandler(
    async(req, res, next) => {
        const {
            username,
            password,
            firstname,
            lastname
        } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            password: hashedPassword,
            firstname,
            lastname
        })

        try{
            await newUser.save();

            res.status(200).json({
                status: 'success',
                data: {newUser}
            })
        }catch(error){
            res.status(500).json({message: error.message})
        }

        
    }
);

/**
 * @desc    Login user
 * @route   POST /auth/login
 * @access  Public
 */
const loginUser = asyncHandler(
    async (req, res) => {
        const {username, password} = req.body
    
        try {
            const user = await User.findOne({username: username})
    
    
            if(user)
            {
                const validity = await bcrypt.compare(password, user.password)
    
    
                validity? res.status(200).json({
                    status: 'success',
                    data: user
                }): res.status(400).json("Wrong Password")
            }
            else{
                res.status(404).json("User does not exists")
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
)

module.exports = {
    registerUser,
    loginUser
};