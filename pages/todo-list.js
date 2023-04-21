import { useState } from "react";

let todoKey = 0;

export default function TodoList() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [task, setTask] = useState("");
    const [hidden, setHidden] = useState(true);

    // Enter text into the input field and click the button to add a new task
    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const addTask = (e) => {
        e.preventDefault();
        setTodoList([
            ...todoList,
            { "key": todoKey++, "taskText": todo}
        ]);
        setTodo("");
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
                return listItem;
            } else {
                return listItem;
            }
        });
        setTodoList(editedTodoList);
        setTask("");
    }

    /*
     * Delete a task
     * 
     * Code for the delete function taken from https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
     * The function filters through the (soon old) task list and only gives back an item if it doesn't match the index of the clicked item.
     * _ represents an unused argument: Here, it is the current item in the array.
     */
    const deleteTask = (index) => {
        setTodoList(oldList => {
            return oldList.filter((_, i) => i !== index)
        })
    }

    return(
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
                                <td className="pr-3">{`${index + 1}.`}</td>
                                <td className="p-1 group-hover:hidden w-full">{row.taskText}</td>
                                <td className="p-1">
                                    <form
                                        data-inputid={index}
                                        className="container flex"
                                        onSubmit={editTask}>
                                        <input
                                                className="pl-2 h-10 w-full text-black text-2xl hidden group-hover:block"
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
                                            font-medium rounded-lg text-2xl px-5 py-1 text-center ml-5 mr-2 mb-2 h-10 hidden group-hover:block">
                                            Edit
                                        </button>
                                    </form>
                                </td>
                                <td>
                                    <button
                                        onClick={() => deleteTask(index)}
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
    )
}