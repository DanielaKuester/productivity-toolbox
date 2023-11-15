const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            /* Get the token from the header. The token has the format "Bearer token".
             * With the split method, the token is turned into an array with this format: [Bearer, token].
             * The first item in the array (position 0) is the string "Bearer" and the second item (position 1) is the actual token.
             */
            token = req.headers.authorization.split(' ')[1]

            // Verify the token. The inbuilt JWT verify method needs the token and the secret as arguments so that it can decode the token.
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            /* Get the user from the token. The token contains the user ID as a payload
             * req.user lets us access the user in any protected route.
             * The select('-password') excludes the password from the data that we get.
             */
            req.user = await User.findById(decoded.id).select('-password')

            // Call the next piece of middleware.
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorised, no token')
    }
})

module.exports = {protect}