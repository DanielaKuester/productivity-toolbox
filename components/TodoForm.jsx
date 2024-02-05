import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function TodoForm() {
    const [text, setText] = useState("");

    const onSubmit = e => {
        e.preventDefault();
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text" className="pr-4 text-2xl">To Do:</label>
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
            </form>
        </section>
    )
}

export default TodoForm;