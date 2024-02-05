import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTodo } from "../src/features/todos/todoSlice"

function TodoForm() {
    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        dispatch(createTodo({text}));
        // Clear the form by setting it to an empty string.
        setText("");
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text" className="-ml-20 pr-4 text-2xl">To Do:</label>
                    <input
                        type="text"
                        className="p-2 mt-4 w-96 border-solid border-4 border-gray-400"
                        name="text"
                        id="text"
                        value={text}
                        // When the user types something, it is displayed in the text field.
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="p-2 mt-4 w-96 bg-gray-800 text-white text-lg rounded" type="submit">
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TodoForm;