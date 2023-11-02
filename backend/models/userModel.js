const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name.']
    },
    /*
     * I don't want to add an e-mail address yet. As the app grows, this will also come, but not now (2023-11-02).
    email: {
        type: String,
        required: [true, 'Please add a email.'],
        unique: true
    },
    */
    password: {
        type: String,
        required: [true, 'Please add a password.']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)