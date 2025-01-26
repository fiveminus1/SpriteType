"use client";

import useRandomWords from '../hooks/useRandomWords';
import Timer, { TimerHandle } from '@/components/timer';
import TypingText from '../components/typing-text';
import { FormEvent, useState, useRef, useEffect } from 'react';
import { LiaRedoAltSolid } from "react-icons/lia";


export default function Home() {
  //Puts random words in an array "words." Set parameter for # of random words
  const { words, loading, error, resetWords } = useRandomWords(25);
  const [typedText, setTypedText] = useState(""); // typed text by user
  const [wpm, setWpm] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [startedTyping, setStartedTyping] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const timerRef = useRef<TimerHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;
    setTypedText(newText);
    setCursorPosition(newText.length);

    if(!startedTyping && newText.length > 0){
      setStartedTyping(true);
      if(timerRef.current){
        timerRef.current.start();
      }
    }
  }

  const handleWpmChange = (e: FormEvent<HTMLInputElement>) => {
    const newWpm = parseInt(e.currentTarget.value);
    if (newWpm > 0 && newWpm <= 200) {
      setWpm(newWpm);
      setErrorMessage('');
    } else if (newWpm < 0) {
      setWpm(0);
      setErrorMessage('Target WPM must be a positive number.');
    } else if (newWpm > 200) {
      setWpm(0);
      setErrorMessage('Target WPM must be 200 or less.');
    } else {
      setWpm(0);
      setErrorMessage('');
    }
  }

  const handleReplay = () => {
    if (timerRef.current) {
      timerRef.current.reset();
    }
    resetWords();
    setTypedText("");
    setCursorPosition(0);
    setStartedTyping(false);
    if(inputRef.current){
      inputRef.current.focus();
      moveCursorToEnd();
    }
  };

  const moveCursorToEnd = () => {
    if(inputRef.current){
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  const handleTimerEnd = () => {
    setTimeout(() => {
      setTimerEnded(true);
    }, 0);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      moveCursorToEnd();
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        inputRef.current.focus();
        moveCursorToEnd();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="grid min-h-screen p-6 sm:p-8 font-[Roboto Mono] bg-[var(--background)]">
      <main className="flex flex-col items-center justify-start flex-grow mt-20">
        <div className="flex flex-row items-center justify-between mb-10 w-full max-w-[90vw]">
          <div className="p-4 bg-gray-300 text-black rounded-full w-16 h-16 flex items-center justify-center">
            <Timer ref={timerRef} onEnd={handleTimerEnd}/>
          </div>

          <div className="flex flex-col items-center p-4 pl-6 pr-6 bg-gray-300 text-black rounded-lg w-60 mx-auto">
            <p className="mb-2 text-med">Target WPM</p>
            <input
              type="number"
              onChange={handleWpmChange}
              placeholder="Enter!"
              className="p-1 pl-5 w-40 rounded-xl bg-white text-black text-center placeholder:text-sm"
            />
            {errorMessage && (
              <p className="text-red-500 mt-2 text-xs">{errorMessage}</p>
            )}
          </div>

          <button
            onClick={handleReplay}
            className="p-4 bg-gray-300 text-black rounded-full w-16 h-16 flex items-center justify-center"
          >
            <LiaRedoAltSolid />
          </button>
        </div>

        {/* Pass the words, typed text, and cursor position to TypingText component */}
        <TypingText
          words={words}
          typedText={typedText}
          cursorPosition={cursorPosition}
        />

        {!timerEnded && (
          <input
            ref={inputRef}
            type="text"
            value={typedText}
            onChange={handleChange}
            onFocus={moveCursorToEnd}
            onBlur={()=> {
              setTimeout(() => { 
                if(inputRef.current){
                  inputRef.current.focus()
                  moveCursorToEnd();
                }
              }, 0);
            }}
            placeholder="Start typing..."
            className="mt-6 p-4 bg-white text-black rounded-lg w-80 text-center"
            autoCorrect='off'
            autoComplete='off'
            spellCheck='false'
          />
        )}
      </main>
    </div>
  );
}
