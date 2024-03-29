import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPencil, FaStar, FaThumbtack } from "react-icons/fa6"

export default function TodoList() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [task, setTask] = useState("");
    const [isCurrentTask, setCurrentTask] = useState(false);

    // Fetch the todos data with the useEffect hook, so that the GET request is only made when first loading/rendering the page
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/todos")
            .then((response) => setTodoList(response.data.todos))
            .catch((error) => console.log("There was an error:", error));
    })

    // Enter text into the input field and click the button to add a new task.
    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const addTask = (e) => {
        e.preventDefault();
        const newTodo = { "taskText": todo, "textHidden": false, "inputHidden": true, "isDone": false, "isCurrentTask": false};
        axios.post("http://127.0.0.1:5000/api/todos", newTodo)
            .then(response => setTodoList([...todoList, newTodo]))
            .catch(error => {
                console.error('There was an error', error)
            })
        setTodo("");
    }

    // Clicking the checkbox marks a task as done or undone
    const markAsDone = async (e) => {
        const todoItemId = e.target.getAttribute("data-checkboxid");
        const doneTodo = `http://127.0.0.1:5000/api/todos/${todoItemId}`;
        axios.get(`http://127.0.0.1:5000/api/todos/`)
            .then((response) => {
                response.data.todos.map((item) => {
                    if ((item._id === todoItemId) && item.isDone === true) {
                        axios.put(doneTodo,
                            {
                                isDone: false,
                            }
                        );
                    } else if ((item._id === todoItemId) && item.isDone === false) {
                        axios.put(doneTodo,
                            {
                                isDone: true,
                            }
                        );
                    }
                });
            })
            .catch(error => {
                console.error('There was an error', error)
            });
    }

    const markAsCurrentTask = async (e) => {
        const currentTaskId = e.target.parentNode.parentNode.getAttribute("data-currenttaskid");
        const myCurrentTask = `http://127.0.0.1:5000/api/todos/${currentTaskId}`;
        console.log(e.target.parentNode.parentNode);
        console.log(currentTaskId);

        axios.get(`http://127.0.0.1:5000/api/todos/`)
        .then((response) => {
            response.data.todos.map((item) => {
                if (item._id === currentTaskId) {
                    // Toggle the isCurrentTask property of the clicked task.
                    axios.put(myCurrentTask,
                        {
                            isCurrentTask: !item.isCurrentTask,
                        }
                    );
                } else if (item.isCurrentTask === true) {
                    /* The previously selected current task is the only item where the isCurrentTask property is true.
                     * Get that item and then use it's ID to set the isCurrentTask propert to false. Now it is not the current task any more.
                     */
                    axios.put(`http://127.0.0.1:5000/api/todos/${item._id}`,
                        {
                            isCurrentTask: false,
                        }
                    );
                }
            });
        })
        .catch(error => {
            console.error('There was an error', error)
        });
    }

    // Double click a task to edit it.
    const handleDoubleClick = (e) => {
        const taskID = e.target.getAttribute("data-taskid");
        const doubleClickedTodo = `http://127.0.0.1:5000/api/todos/${taskID}`;
        //const inputID = e.target.nextSibling.firstChild.getAttribute("data-inputid");
        /* 
         * Map through the list. If the taskID of the clicked item matches the index of the item in the mapped array,
         * the item's value of textHidden and inputHidden changes to show/hide the task text or the input field.
         */
        axios.get(`http://127.0.0.1:5000/api/todos/`)
            .then((response) => {
                let filteredTodos = response.data.todos.filter(item => item.inputHidden === false);
                response.data.todos.map((item) => {
                    if ((taskID === item._id) && (filteredTodos.length === 0)) {
                        axios.put(doubleClickedTodo,
                            {
                                textHidden: true,
                                inputHidden: false
                            }
                        );
                    } else {
                        // Do nothing.
                    }
                });
            })
    }

    const handleEditChange = (e) => {
        setTask(e.target.value);
    }

    const editTask = (e) => {
        const inputId = e.target.getAttribute("data-inputid");
        const editedTodo = `http://127.0.0.1:5000/api/todos/${inputId}`;
        e.preventDefault();
        setTask(task);
        axios.get(`http://127.0.0.1:5000/api/todos/`)
            .then((response) => {
                response.data.todos.map((item) => {
                    if (e.target.getAttribute("data-inputid") === item._id) {
                        if (task != "") {
                            axios.put(editedTodo,
                                {
                                    taskText: task,
                                    textHidden: false,
                                    inputHidden: true
                                }
                            );
                            setTask("");
                        } else if (task === "") {
                            axios.put(editedTodo,
                                {
                                    taskText: e.target.value,
                                    textHidden: false,
                                    inputHidden: true
                                }
                            );
                            setTask("");
                        }
                    } else {
                        // Do nothing
                    }
                });
            })
    }

    /*
     * Delete a task
     * 
     * Code for the delete function taken from https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
     * The function filters through the (soon old) task list and only gives back an item if it doesn't match the index of the clicked item.
     * _ represents an unused argument: Here, it is the current item in the array.

        const deleteTask = (index) => {
            setTodoList(oldList => {
                return oldList.filter((_, i) => i !== index)
            })
        }
    */

    const deleteTask = (todoTaskId) => {
        axios.delete(`http://127.0.0.1:5000/api/todos/${todoTaskId}`)
            .then(console.log(`Item ${todoTaskId} deleted successfully`))
            .catch(error => {
                console.log("An error occured:", error);
            })
    }

    return(
        <>
            <title>Productivity Toolbox - To Do List</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <div className="min-h-screen pb-10 bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
                <h1 className="text-3xl p-8 font-bold text-white text-center">
                    My To-Do-List
                </h1>
                <form onSubmit={addTask} className="container flex mx-auto sd:w-full xl:w-1/2">
                    <input
                        className="mb-10 ml-3 pl-2 h-10 w-full text-black text-2xl"
                        type="text"
                        name="newtodo"
                        placeholder="Add a new task here."
                        value={todo}
                        onChange={handleChange}
                    />
                    <button type="submit"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium rounded-lg text-2xl px-5 py-1 text-center ml-5 mr-2 mb-2 h-10">
                        Submit
                    </button>
                </form>
                <div className={`container mx-auto box-border rounded-xl h-auto sd:w-full xl:w-1/2 p-4 px-10 shadow-2xl
                    bg-gray-700 bg-opacity-20 text-left text-2xl text-white`}>
                        <p className={`${(todoList.length === 0 ? "" : "hidden")}`}>Enter a task and your to-do-list will appear here.</p>
                        <div>
                            {todoList.map((row, index) => (
                                <div className="grid grid-cols-12 pb-1 group w-full " key={index} data-rowid={index}>
                                    <div className="col-span-1 h-10">
                                        <input
                                            type="checkbox"
                                            name="taskStatus"
                                            onClick={markAsDone} 
                                            className="mr-3 w-5 h-5 border-solid border-4"
                                            data-checkboxid={row._id}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <button
                                            type="button"
                                            onClick={markAsCurrentTask}
                                            data-currenttaskid={row._id}
                                            className={`text-3xl ${row.isCurrentTask ? "text-indigo-900" : "text-white"}`}>
                                            <FaThumbtack />
                                        </button>
                                    </div>
                                    <div className="col-span-1">{`${index + 1}.`}</div>
                                    <div onDoubleClick={handleDoubleClick}
                                        className={`col-span-8 ${(row.textHidden ? "hidden" : "")} ${(row.isDone ? "line-through text-gray-300" : "")}`}
                                        data-taskid={row._id}>
                                        {row.taskText}
                                    </div>
                                    <form
                                        data-inputid={row._id}
                                        className={`col-span-8 grid grid-cols-10 ${(row.inputHidden ? "hidden" : "")}`}
                                        onSubmit={editTask}>
                                        <input
                                                className="col-span-8 pl-2 h-10 text-black text-2xl"
                                                type="text"
                                                name="newtodo"
                                                placeholder={row.taskText}
                                                value={task}
                                                onChange={handleEditChange}
                                        />
                                        <button
                                            type="submit"
                                            className="col-span-2 w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                                            focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                            font-medium rounded-lg text-2xl px-8 py-1 w-20 text-center ml-5">
                                            <FaPencil />
                                        </button>
                                    </form>
                                    <button
                                        onClick={() => deleteTask(row._id)}
                                        type="button"
                                        className="col-span-1 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                        font-medium rounded-lg text-2xl px-9 py-1 h-10 w-20 text-center hidden group-hover:block">
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </>
    )
}