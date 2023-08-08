const asyncHandler = require('express-async-handler') // Add express async handler for async requests

// @desc    Get todos
// @route   GET /api/todos
// @access  public ==> later private for all GET/POST/PUT/DELETE requests --> after authentification, login, signup is added)
const getTodos = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals' })
})

// @desc    Set todo
// @route   POST /api/todos
// @access  public
const setTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({ message: 'Set goal' })
})

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  public
const updateTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update todo ${req.params.id}`});
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