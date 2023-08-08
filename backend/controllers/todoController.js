const asyncHandler = require('express-async-handler') // Add express async handler for async requests
const mongoose = require('mongoose')

const Todo = require('../models/todoModel')

// @desc    Get todos
// @route   GET /api/todos
// @access  public ==> later private for all GET/POST/PUT/DELETE requests --> after authentification, login, signup is added)
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({})
    res.status(200).json({ todos })
})

// @desc    Set todo
// @route   POST /api/todos
// @access  public
const setTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const todo = await Todo.create({
        text: req.body.text
    })

    res.status(200).json(todo)
})

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  public
const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if(!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTodo)
})

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  public
const deleteTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete todo ${req.params.id}`});
})

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}