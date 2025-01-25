"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

export type TimerHandle = {
    reset: () => void;
}

type TimerProps = {};

const Timer = forwardRef<TimerHandle, TimerProps>((props, ref) => {
    const [timeLeft, setTimeLeft] = useState(15);
    const [isRunning, setIsRunning] = useState(true);

    const reset = () => {
        setTimeLeft(15);
        setIsRunning(true);
    }

    useImperativeHandle(ref, () => ({
        reset,
    }));

    useEffect(() => {
        if(!isRunning || timeLeft === 0) 
            return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, isRunning]);

    return (
        <div>
            <h2>Time Left: {timeLeft}s</h2>
        </div>
    );
});

export default Timer;