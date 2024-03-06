import { useState } from "react";

const Pomodoro = () => {
    const [myTime, setMyTime] = useState(3 * 60);

    const countDown = (timeInSeconds) => {
        setMyTime(timeInSeconds - 1);
    }

    /*
     * The setTimeout function takes 2 or more arguments.
     * Argument 1: The callback function that you want to call in the setTimeout function.
     * Argument 2: The timespan (in milliseconds) after which the setTimeout function should run.
     * Arguments 3, 4, 5 ... (up to n): A parameter that you can give as an argument to the callback function that you call.
     * In this case, myTime is given as an argument to the countDown function. The function is called as countdown(myTime).
     */
    setTimeout(countDown, 1000, myTime);

    return(
        <>
            <title>Productivity Toolbox - Pomodoro</title>
            <meta name="description" content="The pomodoro timer balances work on the current task with breaks in between." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <div className="min-h-screen">
                <h1 className="text-4xl p-8 font-bold text-black text-center">
                    Pomodoro Timer
                </h1>
                <p className="text-8xl text-center">{myTime}</p>
            </div>
        </>
    )
}

export default Pomodoro;