/* The timer is an adapted version of the timer found here: https://www.youtube.com/watch?v=7CQdoqP5qj0 */

import { useState, useEffect } from "react";

const Timer = ({duration}) => {
    const [time, setTime] = useState(duration);

    if (duration > 0) {
        // The setTimeout is called after each second.
        setTimeout(() => {
            // Decrease time by 1000 milliseconds (= 1 second).
            setTime(time - 1000);
        }, 1000)
    } else if (duration === 0) {
        console.log("The duration is 0.");
    }

    const getFormattedTime = (milliseconds) => {
        // Transforms the time from milliseconds to seconds, from seconds to minutes, from minutes to hours and from hours to days.
        let total_seconds = parseInt(Math.floor(milliseconds / 1000));
        let total_minutes = parseInt(Math.floor(total_seconds / 60));
        let total_hours = parseInt(Math.floor(total_minutes / 60));
        let days = parseInt(Math.floor(total_hours / 24));

        // To make the seconds loop between 59 and 0, divide the total seconds by 60 and only use the remaining part. (Similar pattern for minutes and hours.)
        let seconds = parseInt(total_seconds % 60);
        let minutes = parseInt(total_minutes % 60);
        let hours = parseInt(total_hours % 24);

        return `${days}:${hours}:${minutes}:${seconds}`;
    };

    return <div>{getFormattedTime(time)}</div>
}

export default Timer;