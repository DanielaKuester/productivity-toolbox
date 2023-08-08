const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

// All of the Mongoose methods are asynchronous and return a promise 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        // Log out the connection to the server; cyan comes from the colors npm package
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1) // exit the process with failure
    }
}

module.exports = connectDB