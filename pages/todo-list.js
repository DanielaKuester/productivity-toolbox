export default function TodoList() {
    return(
        <div className="h-screen bg-gradient-to-br from-green-500 via-blue-700 to-purple-700">
            <h1 className="text-3xl p-8 font-bold text-white text-center">
                My To-Do-List
            </h1>
            <ul className="list-decimal container mx-auto box-border rounded-xl shadow-2xl h-auto w-1/2 p-4 px-10 bg-opacity-60 bg-gray-700 flex flex-col text-left text-2xl">
                <li className="p-1 line-through">
                    Experiment with Tailwind CSS
                </li>
                <li className="p-1">
                    Read the basics of the Tailwind CSS documentation
                </li>
                <li className="p-1">
                    Read the basics of the Next.js documentation
                </li>
                <li className="p-1">
                    Add an input field with a button: allow users to add to-do items to an array with objects
                </li>
                <li className="p-1">
                    Add checkboxes to check off tasks that are done (text: line-through)
                </li>
                <li className="p-1">
                    Add buttons next to each task: edit task, delete task
                </li>
            </ul>
        </div>        
    )
}