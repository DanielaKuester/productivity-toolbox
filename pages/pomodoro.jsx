import Image from "next/image"
import { useState, useEffect } from "react"
import Timer from "@/components/Timer";
import axios from "axios";

export default function Pomodoro() {
    const [workTime, setWorkTime] = useState(0);
    const [shortBreak, setShortBreak] = useState(0);
    const [longBreak, setLongBreak] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTimer, setCurrentTimer] = useState("work");
    const [currentTask, setCurrentTask] = useState("Mark a task as the current task in your to-do-list and it will appear here.");

    /*
     * Fetch the todos data with the useEffect hook, so that the GET request is only made when first loading/rendering the page.
     * Get the data of the current to-do-task so that its text can be shown in the pomodoro timer under "Current Task:"
     */
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/todos")
            .then((response) => response.data.todos.map((item) => {
                if (item.isCurrentTask === true) {
                    setCurrentTask(item.taskText);
                } else if (item.isCurrentTask === false) {
                    // Do nothing.
                }
            }))
            .catch((error) => console.log("There was an error:", error));
    })

    const handleWorkChange = (e) => {
        setWorkTime(e.target.value);
    }

    const startTimer = () => {
        setIsRunning(true);
    }

    const pauseTimer = () => {
        setIsRunning(false);
    }

    const handleTimerComplete = () => {
        setIsRunning(false);

        // Switch between Work and Short Break timers
        if (currentTimer === "work") {
            console.log("Take a break!");
            setCurrentTimer("shortBreak");
            Timer.updateDuration(shortBreak * 60 * 1000);
            startTimer();
        } else if (currentTimer === "shortBreak") {
            console.log("Work again!");
            setCurrentTimer("work");
            Timer.updateDuration(workTime * 60 * 1000);
            startTimer();
        }
    }

    const resetTimer = () => {
        setIsRunning(false);
        setWorkTime(0);
    }

    // Use useEffect to watch for changes in workTime and update the timer
    useEffect(() => {
        // Update the timer when workTime changes
        Timer.updateDuration(workTime * 60 * 1000);
    }, [workTime]);

    const handleShortBreakChange = (e) => {
        setShortBreak(e.target.value);
    }

    const handleLongBreakChange = (e) => {
        setLongBreak(e.target.value);
    }

    const setTimes = (e) => {
        e.preventDefault();
        setWorkTime(e.target.firstChild.lastChild.value);
        console.log(`The chosen work time is ${workTime} minutes.\n
        The chosen short break is ${shortBreak} minutes.\n
        The chosen long break is ${longBreak} minutes.`);
    }

    return(
        <>
            <title>Productivity Toolbox - Pomodoro</title>
            <meta name="description" content="The pomodoro timer balances work on the current task with breaks in between." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
                <h1 className="text-4xl p-8 font-bold text-black text-center">
                    Pomodoro Timer
                </h1>
                <div className="grid grid-cols-6 grid-rows-10 mx-auto sd:w-full md:w-1/2 lg:w-1/3">
                    <div className="bg-transparent min-h-[60px] border border-0 col-span-6 text-center justify-center text-8xl pt-1 p-3 ml-28 -mb-9 z-10">
                        <Image src={"Peeking-Cat.svg"} alt={"image of a peeping cat"} width={400} height={400}/>
                    </div>
                    <div className="bg-white min-h-[60px] border border-black col-span-6 text-center justify-center text-8xl pt-1 p-3 -mt-32 rounded-t-3xl">
                        <p>{currentTimer === "work" ? "Work 📝" : "Break 🍵"}</p>
                        {/* Pass the workTime state variable as initialDuration */}
                        <Timer
                            initialDuration={currentTimer === "work" ? (workTime * 60 * 1000) : (shortBreak * 60 * 1000)}
                            currentTimer={currentTimer}
                            isRunning={isRunning}
                            onTimerComplete={handleTimerComplete}
                        />
                    </div>
                    <div className="bg-blue-100 min-h-[60px] border border-black border-t-0 col-span-6 justify-between">
                        <button
                            onClick={startTimer}
                            className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                            focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                            font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40 h-16"
                        >
                            Start
                        </button>
                        <button
                            onClick={pauseTimer}
                            className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                            focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                            font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40 h-16"
                        >
                            Pause
                        </button>
                        <button
                            onClick={resetTimer}
                            className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                                focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40 h-16"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="bg-blue-100 min-h-[60px] border border-black border-t-0 col-span-3 border-r-0 rounded-bl-3xl text-xl pb-4">
                        <form onSubmit={setTimes}>
                            <div className="m-3 ml-5 mt-4">
                                <label className="mr-1">Work (in min):</label>
                                <input
                                    type="number"
                                    min="1" max="180"
                                    onChange={handleWorkChange}
                                    className="float-right pl-2 mr-2 w-24 border border-black"
                                >
                                </input>
                            </div>
                            <div className="m-3 ml-5">
                                <label>Short Break (in min):</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="180"
                                    onChange={handleShortBreakChange}
                                    className="float-right pl-2 mr-2 w-24 border border-black"
                                >
                                </input>
                            </div>
                            <div className="m-3 ml-5">
                                <label>Long Break (in min):</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="180"
                                    onChange={handleLongBreakChange}
                                    className="float-right pl-2 mr-2 w-24 border border-black"
                                >
                                </input>
                            </div>
                            <button type="submit"
                                className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                                focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                font-medium text-2xl px-5 py-2 ml-5 text-center h-12 m-3 w-40 h-16">
                                Set times
                            </button>
                        </form>
                    </div>
                    <div className="bg-blue-100 min-h-[60px] border border-black border-t-0 col-span-3 rounded-br-3xl p-3 text-xl">
                        <h2 className="mt-1 ml-2 underline">Current Task:</h2>
                        <p className="mt-1 ml-2">
                            {currentTask}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}