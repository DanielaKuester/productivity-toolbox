const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
{   
    // Adds a timestamp to the todo item. Can also be left out but might be helpful later for the progress diary/log feature.
    timestamps: true,
})

module.exports = mongoose.model('Todo', todoSchema)