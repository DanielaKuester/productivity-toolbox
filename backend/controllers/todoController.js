// @desc    Get todos
// @route   GET /api/todos
// @access  public ==> later private for all GET/POST/PUT/DELETE requests --> after authentification, login, signup is added)
const getTodos = (req, res) => {
    res.status(200).json({ message: 'Get goals' })
}

// @desc    Set todo
// @route   POST /api/todos
// @access  public
const setTodo = (req, res) => {
    res.status(200).json({ message: 'Set goal' })
}

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  public
const updateTodo = (req, res) => {
    res.status(200).json({message: `Update todo ${req.params.id}`});
}

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  public
const deleteTodo = (req, res) => {
    res.status(200).json({message: `Delete todo ${req.params.id}`});
}

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}