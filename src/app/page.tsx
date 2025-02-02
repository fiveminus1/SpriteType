"use client";

import useRandomWords from '../hooks/useRandomWords';
import Timer, { TimerHandle } from '@/components/timer';
import TypingText from '../components/typing-text';
import { FormEvent, useState, useRef, useEffect } from 'react';
import { LiaRedoAltSolid } from "react-icons/lia";
import { PiTShirtThin } from "react-icons/pi";
import SpriteSelection from '@/components/spriteselection';
import Image from 'next/image';



export default function Home() {
  //Puts random words in an array "words." Set parameter for # of random words
  const { words, loading, error, resetWords } = useRandomWords(25);
  const [typedText, setTypedText] = useState(""); // typed text by user
  const [wpm, setWpm] = useState(0);
  const [targetWpm, setTargetWpm] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [startedTyping, setStartedTyping] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState("/characters/totoro.png");
  const timerRef = useRef<TimerHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const targetWpmRef = useRef<HTMLInputElement>(null);
  

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;
    setTypedText(newText);
    setCursorPosition(newText.length);

    if(!startedTyping && newText.length > 0){
      setStartedTyping(true);
      setStartTime(Date.now());
      if(timerRef.current){
        timerRef.current.start();
      }
    }
    calculateWpm();
  }

  const handleWpmChange = (e: FormEvent<HTMLInputElement>) => {
    const newWpm = parseInt(e.currentTarget.value);
    if (newWpm > 0 && newWpm <= 200) {
      setTargetWpm(newWpm);
      setErrorMessage('');
    } else if (newWpm < 0) {
      setTargetWpm(0);
      setErrorMessage('Target WPM must be a positive number.');
    } else if (newWpm > 200) {
      setTargetWpm(0);
      setErrorMessage('Target WPM must be 200 or less.');
    } else {
      setTargetWpm(0);
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
    setTimerEnded(false);
    setStartTime(null);
    setWpm(0);
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

  const calculateWpm = () => {
    if (!startTime || timerEnded) return; // Don't calculate WPM if typing hasn't started

    const now = Date.now();
    const elapsedTime = now - startTime; // Elapsed time in milliseconds
    const elapsedMinutes = elapsedTime / 60000; // Convert to minutes

    // Count the number of correct characters
    let correctChars = 0;
    const typedWords = typedText.split(' ');
    words.forEach((word, wordIndex) => {
      const typedWord = typedWords[wordIndex] || '';
      for (let i = 0; i < word.word.length; i++) {
        if (typedWord[i] === word.word[i]) {
          correctChars++;
        }
      }
    });

    // Calculate WPM: (correct characters / 5) / elapsed minutes
    const wpmValue = (correctChars / 5) / elapsedMinutes;
    setWpm(Math.round(wpmValue)); // Round to the nearest integer
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && targetWpmRef.current &&
        !inputRef.current.contains(e.target as Node) &&
       !targetWpmRef.current.contains(e.target as Node)) {
        inputRef.current.focus();
        moveCursorToEnd();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(timerEnded) return;

    const interval = setInterval(() => {
      calculateWpm();
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, typedText, timerEnded]);

  return (
    <div className="grid min-h-screen p-6 sm:p-8 font-[Roboto Mono] bg-[var(--background)]">
      <main className="flex flex-col items-center justify-start flex-grow mt-20">
        <div className="flex flex-row items-center justify-between mb-10 w-full max-w-[90vw] gap-4">
          <div className="p-4 bg-gray-300 text-black rounded-full w-16 h-16 flex items-center justify-center">
            <Timer ref={timerRef} onEnd={handleTimerEnd}/>
          </div>

          <button
            onClick={handleReplay}
            className="p-4 bg-gray-300 text-black rounded-full w-16 h-16 flex items-center justify-center"
          >
            <LiaRedoAltSolid />
          </button>

          

          <div className="flex flex-col items-center p-4 pl-6 pr-6 bg-gray-300 text-black rounded-lg w-60 mx-auto">
            <p className="mb-2 text-med">Target WPM</p>
            <input
              ref={targetWpmRef}
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
            onClick={() => setShowPopup(true)}
            className="p-4 bg-gray-300 text-black rounded-full w-16 h-16 flex items-center justify-center"
          >
           <Image 
            src={selectedSprite}
            alt="Icon of the selected sprite"
            width={32}
            height={32} 
            className="object-contain"
            />

          </button>
          <button
            onClick={() => {

            }}
            className="p-4 bg-gray-300 text-black rounded-full w-16 h-16 flex items-center justify-center"
          >
            <PiTShirtThin />
          </button>

          
        </div>

        {/* Pass the words, typed text, and cursor position to TypingText component */}
        <TypingText
          words={words}
          typedText={typedText}
          cursorPosition={cursorPosition}
          selectedSprite={selectedSprite}
        />

        {!timerEnded && (
          <input
            ref={inputRef}
            type="text"
            value={typedText}
            onChange={handleChange}
            onFocus={moveCursorToEnd}
            onBlur={(e)=> {
              const relatedTarget = e.relatedTarget as Node;
              if(targetWpmRef.current && targetWpmRef.current.contains(relatedTarget)){
                return;
              }
              setTimeout(() => { 
                if(inputRef.current){
                  inputRef.current.focus()
                  moveCursorToEnd();
                }
              }, 0);
            }}
            placeholder="Start typing here..."
            className="mt-6 p-4 border-4 border-stone-100 bg-white text-black rounded-lg w-80 text-center"
            autoCorrect='off'
            autoComplete='off'
            spellCheck='false'
          />
        )}


        <div className="mt-8 flex flex-col items-center">
          <p className="mb-2 text-xl font-semibold text-gray-700">Current WPM</p>
          <h3 className="text-4xl font-bold text-[#597855]">{wpm}</h3>
        

        {timerEnded && (
          <div className="mt-6 p-4 bg-gray-300 text-black rounded-lg w-80 text-center">
            {wpm >= targetWpm && targetWpm >= 0 && (
              <p className="mt-2 text-[#597855] font-bold">Congratulations! <br></br><br></br>You met your target WPM! 🎉</p>
            )}
            {wpm < targetWpm && targetWpm >= 0 && (
              <p className="mt-2 text-red-600 font-bold">Unfortunately, you didn't meet your goal. <br></br><br></br>Keep practicing! 💪</p>
            )}
          </div>
        )}

        {showPopup && (
          <SpriteSelection
            onClose={() => setShowPopup(false)}
            onSelect={(sprite) => {
              setSelectedSprite(sprite);
              setShowPopup(false);
            }}
          />
        )}
        </div>
      </main>
    </div>
  );
}
