const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    taskText: String,
    textHidden: Boolean,
    inputHidden: Boolean,
    isDone: Boolean,
    isCurrentTask: Boolean
},
{   
    // Adds a timestamp to the todo item. Can also be left out but might be helpful later for the progress diary/log feature.
    timestamps: true,
})

module.exports = mongoose.model('Todo', todoSchema)