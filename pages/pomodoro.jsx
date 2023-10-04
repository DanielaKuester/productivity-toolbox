import Image from "next/image"
import { useState, useEffect } from "react"
import Timer from "@/components/Timer";

export default function Pomodoro() {
    const [workTime, setWorkTime] = useState(0);
    const [shortBreak, setShortBreak] = useState(0);
    const [longBreak, setLongBreak] = useState(0);

    const handleWorkChange = (e) => {
        setWorkTime(e.target.value);
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
                        {/* Pass the workTime state variable as initialDuration */}
                        <Timer initialDuration={workTime * 60 * 1000} />
                    </div>
                    <div className="bg-blue-100 min-h-[60px] border border-black border-t-0 col-span-6 justify-between">
                        <button className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40 h-16">Start/Pause</button>
                        <button className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40 h-16">Stop</button>
                        <button className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40 h-16">Reset</button>
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
                        <p className="mt-1 ml-2">Find out how CSS Grid works best and apply those experimental changes to my pomodoro timer.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}