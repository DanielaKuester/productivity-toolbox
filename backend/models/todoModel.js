const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    /*
     * The user model was added with the help of this Traversy Media MERN stack tutorial: https://youtu.be/enopDSs3DRw.
     * This adds the mongoose User schema to the todoSchema. Then I can identify which user created which task. Every goal is associated with a specific user.
     * The ObjectId is the _id created by MongoDB. This is required so that the user can be clearly identified.
     * The ref field is a reference to the model this refers to (the User).
     */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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