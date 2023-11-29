const asyncHandler = require('express-async-handler') // Add express async handler for async requests

const Todo = require('../models/todoModel')
const User = require('../models/userModel')

// @desc    Get todos
// @route   GET /api/todos
// @access  Private ==> access only through login/authentication
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user.id })
    res.status(200).json({ todos })
})

// @desc    Set todo
// @route   POST /api/todos
// @access  Private
const setTodo = asyncHandler(async (req, res) => {
    if (!req.body.taskText) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const todo = await Todo.create({
        taskText: req.body.taskText,
        textHidden: false,
        inputHidden: true,
        isDone: false,
        isCurrentTask: false,
        user: req.user.id
    })

    res.status(200).json(todo)
})

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if(!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }

    const user = await User.findById(req.user.id)

    // Check if the user exists
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    /* Make sure that the user ID of the logged in user matches the user ID in the todo item.
     * There is a user object in the todo item that has to be transformed to a string. Afterwards, it can be compared to the user ID string.
     */
    if (todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTodo)
})

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
  
    if (!todo) {
      res.status(400)
      throw new Error('Todo not found')
    }

    const user = await User.findById(req.user.id)

    // Check if the user exists
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    /* Make sure that the user ID of the logged in user matches the user ID in the todo item.
     * There is a user object in the todo item that has to be transformed to a string. Afterwards, it can be compared to the user ID string.
     */
    if (todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

  
    todo.deleteOne()
  
    res.status(200).json({ id: req.params.id })
  })

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}