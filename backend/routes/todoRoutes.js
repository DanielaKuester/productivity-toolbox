const express = require('express')
const router = express.Router()
const { getTodos, setTodo, updateTodo, deleteTodo } = require('../controllers/todoController')

/*
The functions handling the http request methods (GET, POST, UPDATE, DELETE) are in the todoController.js file.
This file only handles the routes to which the http request methods are applied.

Long routes version:

router.get('/', getTodos);
router.post('/', setTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
*/

// Shorter version bundling the same routes:
router.route('/').get(getTodos).post(setTodo);
router.route('/:id').delete(deleteTodo).put(updateTodo);

module.exports = router