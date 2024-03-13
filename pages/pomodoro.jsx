import { useState } from "react";
import pomodoroStyles from "../styles/pomodoro.module.css"

const Pomodoro = () => {
    const [myTime, setMyTime] = useState(24 * 60 * 60);

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
    // const allDays = Math.floor(allHours / 24);
    // const allYears = Math.floor(allDays / 365)

    /* The modulo/remainder operator returns the rest of the division. When I compute 220 % 60, I get 40 as the remainder.
     * Why? Because 220 / 60 = 3 and the remainder is 40. So: 220 seconds are 3 minutes and 40 seconds.
     */
    const seconds = allSeconds % 60;
    const minutes = allMinutes % 60;
    const hours = allHours % 24;
    // const days = allDays % 365;
    // const years = allYears;

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
            <div className="min-h-screen bg-purple-600">
                <h1 className="text-4xl p-8 font-bold text-black text-center">
                    Pomodoro Timer
                </h1>
                {/* <p className="text-8xl text-center">{`${hours}:${minutes}:${seconds}`}</p> */}
                {/* <p className={`${pomodoroStyles.paragraph} ${pomodoroStyles.mytext} text-center mt-10`}>This is some text to test this paragraph.</p> */}
                <div className="">
                    <svg className="bg-blue-300 mx-auto mt-10" height="600" width="600" xmlns="http://www.w3.org/2000/svg">
                        {/* The circumference of a circle is 2π*r, so in this case it is 2π * 250 = ~1571 */}
                        <circle
                            id="gray-circle"
                            r="250"
                            cx="300"
                            cy="300"
                            fill="transparent"
                            stroke="gray"
                            stroke-width="10"
                            stroke-opacity="0.2"
                            strokeDasharray={1571}
                            strokeDashoffset={0}
                        />
                        <circle
                            id="green-circle"
                            className={pomodoroStyles.circle}
                            r="250"
                            cx="300"
                            cy="300"
                            fill="transparent"
                            stroke="green"
                            stroke-opacity="0.6"
                            stroke-width="10"
                            strokeDasharray={1571}
                            strokeDashoffset={0}
                            transform="translate(0 0), rotate(270 300 300)"
                        />
                        <text className="text-8xl" x="300" y="400" text-anchor="middle" fill="black">{`${hours}:${minutes}:${seconds}`}</text>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Pomodoro;