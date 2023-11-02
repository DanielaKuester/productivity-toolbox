const mongoose = require('mongoose')

const diarySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    diaryText: String,
    textHidden: Boolean,
    inputHidden: Boolean
},
{   
    // Adds a timestamp to the todo item. Can also be left out but might be helpful later for the progress diary/log feature.
    timestamps: true,
})

module.exports = mongoose.model('Diary', diarySchema)