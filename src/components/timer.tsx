"use client";

import { useState, useEffect } from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        if(timeLeft === 0) 
            return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <div>
            <h2>{timeLeft}s</h2>
        </div>
    );
};

export default Timer;