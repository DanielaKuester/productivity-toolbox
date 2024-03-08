import { useState } from "react";

const Pomodoro = () => {
    const [myTime, setMyTime] = useState(4 * 24 * 60 * 60);

    /*
     * 60 seconds form one minute, so the total number of minutes is all seconds divided by 60.
     * To round properly, I CANNOT use Math.round(), because this method rounds up OR down depending on the nearest number.
     * When I use Math.round() and take 3 minutes as the timespan, the timer still shows the full 3 minutes all the time until 2 minutes and 30 seconds. Then it starts to round down.
     * I have to round with Math.floor(), because this method always rounds DOWN to the next integer that is less or the same as a given number.
     * When I use Math.floor() and take 3 minutes as the timespan, the timer immediatly rounds down to the 2 minutes after 1 second has passed.
     */
    const allSeconds = myTime;
    const allMinutes = Math.floor(allSeconds / 60);
    const allHours = Math.floor(allMinutes / 60 );
    const allDays = Math.floor(allHours / 24);

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
                <p className="text-8xl text-center">{`All days: ${allDays}`}</p>
                <p className="text-8xl text-center">{`All hours: ${allHours}`}</p>
                <p className="text-8xl text-center">{`All minutes: ${allMinutes}`}</p>
                <p className="text-8xl text-center">{`All seconds: ${allSeconds}`}</p>
            </div>
        </>
    )
}

export default Pomodoro;