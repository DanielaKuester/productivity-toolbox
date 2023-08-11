import { useState, useEffect } from "react";
import axios from "axios";

export default function TodoList() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [task, setTask] = useState("");
    const [editingTest, setEditingTest] = useState([]);

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
        const newTodo = { "taskText": todo, "textHidden": false, "inputHidden": true, "isDone": false};
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
                const todosArray = response.data.todos;
                // Get the clicked item
                for (let i = 0; i < todosArray.length; i++) {
                    if ((todosArray[i]._id === todoItemId) && (todosArray[i].isDone === true)) {
                        //console.log(`The clicked item is: ${todosArray[i]._id} and the isDone status is ${todosArray[i].isDone}.\nYou have to set the isDone status to false.`);
                        axios.put(doneTodo,
                            {
                                isDone: false,
                            }
                        );
                    } else if ((todosArray[i]._id === todoItemId) && (todosArray[i].isDone === false)) {
                        //console.log(`The clicked item is: ${todosArray[i]._id} and the isDone status is ${todosArray[i].isDone}.\nYou have to set the isDone status to true.`);
                        axios.put(doneTodo,
                            {
                                isDone: true,
                            }
                        );
                    }
                }
            })
            .catch(error => {
                console.error('There was an error', error)
            });
    }

    // Double click a task to edit it.
    const handleDoubleClick = (e) => {
        const taskID = e.target.getAttribute("data-taskid");
        //const inputID = e.target.nextSibling.firstChild.getAttribute("data-inputid");

        /* 
         * Map through the list. If the taskID of the clicked item matches the index of the item in the mapped array,
         * the item's value of textHidden and inputHidden changes to show/hide the task text or the input field.
         */

        const filteredTodoList = todoList.map((item, i) => {
            // The editingTest array makes sure that the user can only edit exactly one task at a time.
            if ((parseInt(taskID) === i) && (editingTest.length === 0)) {
                setEditingTest(["This string only exists to test if the user already selected a task to edit it."]);
                item.textHidden = true;
                item.inputHidden = false;
                return item;
            } else {
                return item;
            }
        });
        setTodoList(filteredTodoList);
    }

    const handleEditChange = (e) => {
        setTask(e.target.value);
    }

    const editTask = (e) => {
        e.preventDefault();
        setTask(task);
        const editedTodoList = todoList.map((listItem, i) => {
            if (parseInt(e.target.getAttribute("data-inputid")) === i) {
                listItem.taskText = task;
                listItem.textHidden = false;
                listItem.inputHidden = true;
                return listItem;
            } else {
                return listItem;
            }
        });
        setTodoList(editedTodoList);
        setTask("");
        setEditingTest([]);
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
            <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
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
                        <p className="pb-3">Enter a task and your to-do-list will appear here.</p>
                    <table>
                        <tbody>
                            {todoList.map((row, index) => (
                                <tr className="group w-full" key={index} data-rowid={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="taskStatus"
                                            onClick={markAsDone} 
                                            className="mr-3 w-5 h-5 border-solid border-4"
                                            data-checkboxid={row._id}
                                        />
                                    </td>
                                    <td className="pr-3">{`${index + 1}.`}</td>
                                    <td onDoubleClick={handleDoubleClick}
                                        className={`p-3 w-full ${(row.textHidden ? "hidden" : "")} ${(row.isDone ? "line-through text-gray-300" : "")}`}
                                        data-taskid={index}>
                                        {row.taskText}
                                    </td>
                                    <td className="p-1">
                                        <form
                                            data-inputid={index}
                                            className={`container flex ${(row.inputHidden ? "hidden" : "")}`}
                                            onSubmit={editTask}>
                                            <input
                                                    className="pl-2 h-10 w-full text-black text-2xl"
                                                    type="text"
                                                    name="newtodo"
                                                    placeholder={row.taskText}
                                                    value={task}
                                                    onChange={handleEditChange}
                                            />
                                            <button
                                                type="submit"
                                                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                                                focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                                font-medium rounded-lg text-2xl px-5 py-1 text-center ml-5 mr-2 mb-2 h-10">
                                                Edit
                                            </button>
                                        </form>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => deleteTask(row._id)}
                                            type="button"
                                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                                            focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                            font-medium rounded-lg text-2xl px-5 py-1 text-center mb-2 h-10 hidden group-hover:block">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}