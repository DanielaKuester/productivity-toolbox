const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, /*email,*/ password } = req.body

    if(!name || /*!email ||*/ !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if the user already exists
    const userExists = await User.findOne({name})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        /*email,*/
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    const {name, /*email,*/ password} = req.body

    /* Check for user e-mail
    const user = await User.findOne({email})

     * I don't do that yet because I don't want to register in my app with an e-mail-address.
     * I'll add this functionality as soon as the app is bigger and I want to be connected with my e-mail-address.
     */

    // Check for user name
    const user = await User.findOne({name})

    // The bcrypt's compare function allows me to compare the entered password with the hashed user password.
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  public
const getMe = asyncHandler(async (req, res) => {
    res.json({ message: 'User data display' })
})

// Generate JWT (Jason Web Token)
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        /* Using an expired Jason Web Token will cause operations to fail. The normal expiration value is between 1200 seconds (= 20 minutes).
         * The user has to log in again to get a valid token.
         * Detailed explanation here: https://docs.oracle.com/en/cloud/saas/live-experience/faled/handling-access-token-expiration.html#u30011459
         */
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}