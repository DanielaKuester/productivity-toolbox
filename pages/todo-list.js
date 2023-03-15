import { useState } from "react";
import Task from "@/components/Task";

export default function TodoList() {
    const [todo, setTodo] = useState("");

    const todoList = [
        "Experiment with Tailwind CSS",
        "Read the basics of the Tailwind CSS documentation",
        "Read the basics of the Next.js documentation",
        "Add an input field with a button: allow users to add to-do items to an array with objects",
        "Add checkboxes to check off tasks that are done (text: line-through)",
        "Add buttons next to each task: edit task, delete task",
    ]

    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    const handleSubmit = (e) => {
        console.log(todo);
        e.preventDefault();
    }

    return(
        <div className="h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
            <h1 className="text-3xl p-8 font-bold text-white text-center">
                My To-Do-List
            </h1>
            <form onSubmit={handleSubmit} className="container flex mx-auto w-1/2">
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
            <ul className="list-decimal container mx-auto box-border rounded-xl shadow-2xl h-auto w-1/2 p-4 px-10 bg-opacity-20 bg-gray-700 flex flex-col text-left text-2xl text-white">
                <Task text={todoList[0]} />
                <Task text={todoList[1]} />
                <Task text={todoList[2]} />
                <Task text={todoList[3]} />
                <Task text={todoList[4]} />
                <Task text={todoList[5]} />
            </ul>
        </div>        
    )
}