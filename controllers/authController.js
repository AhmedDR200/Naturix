const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 * @access  Public
 */
const registerUser = asyncHandler(
    async(req, res, next) => {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword
        const { username } = req.body;

        const newUser = new User(req.body)

        try{
            const oldUser = await User.findOne({username});
            if(oldUser){
                return res.status(400).json({message: "User already exists"})
            }
            const user = await newUser.save();
            const token = jwt.sign({
                username: user.username,
                id: user._id,
            }, process.env.JWT_SECRET, {expiresIn: '10d'
            })

            res.status(200).json({
                status: 'success',
                data: user,
                token: token
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
    
    
                if(!validity){
                    res.status(400).json({message:"Wrong password"})
                }
                else{
                    const token = jwt.sign({
                        username: user.username,
                        id: user._id,
                    }, process.env.JWT_SECRET, {expiresIn: '10d'
                    })
                    res.status(200).json({
                        status: 'success',
                        data: user,
                        token: token
                    })
                }
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