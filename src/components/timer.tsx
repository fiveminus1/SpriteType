"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

export type TimerHandle = {
    start: () => void;
    reset: () => void;
    getTimeLeft: () => number;
}

type TimerProps = {
    onEnd: () => void;
};

const Timer = forwardRef<TimerHandle, TimerProps>(({onEnd}, ref) => {
    const [timeLeft, setTimeLeft] = useState(15);
    const [isRunning, setIsRunning] = useState(false);

    const start = () => {
        setIsRunning(true);
    }

    const reset = () => {
        setTimeLeft(15);
        setIsRunning(false);
    }


    useImperativeHandle(ref, () => ({
        start,
        reset,
        getTimeLeft: () => timeLeft
    }));

    useEffect(() => {
        if(!isRunning || timeLeft === 0) 
            return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if(prevTime === 1){
                    clearInterval(intervalId);
                    setIsRunning(false);
                    onEnd();
                }
                return prevTime - 1
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, isRunning]);

    useEffect(() => {
        if(timeLeft === 0){
            onEnd();
        }
    }, [timeLeft, onEnd]);

    return (
        <div>
            <h2>{timeLeft}s</h2>
        </div>
    );
});



export default Timer;