/* The timer is an adapted version of the timer found here: https://www.youtube.com/watch?v=7CQdoqP5qj0 */

import { useState, useEffect } from "react";

const Timer = ({duration}) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        // The setTimeout is called after each second.
        setTimeout(() => {
            // Decrease time by 1000 milliseconds (= 1 second).
            setTime(time - 1000);
        }, 1000)
    }, [time]);

    return <div>{time}</div>
}

export default Timer;