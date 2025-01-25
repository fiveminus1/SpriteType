"use client";

import useRandomWords from '../hooks/useRandomWords';
import Timer from '@/components/timer';
import { FormEvent, useState } from 'react';

export default function Home() {
  //Puts random words in an array "words." Set parameter for # of random words
  const {words, loading, error} = useRandomWords(75);
  const [wpm, setWpm] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const newWpm = parseInt(e.currentTarget.value)
    if (newWpm > 0 && newWpm <= 200) {
      setWpm(newWpm);
      setErrorMessage('');
    } else if (newWpm < 0) {
      setWpm(0);
      setErrorMessage('Target WPM must be a positive number.');
    } else if (newWpm > 200){
      setWpm(0);
      setErrorMessage('Target WPM must be 200 or less.');
    } else {
      setWpm(0);
      setErrorMessage('');
    }
  }

  return (
    <div className="grid min-h-screen p-6 sm:p-8 font-[Roboto Mono] bg-[var(--background)]">
      <main className="flex flex-col items-center justify-start flex-grow mt-20">
        
      <div className="flex flex-row items-center space-x-6 mb-10 w-full max-w-[90vw] relative">
        <div className="p-4 bg-gray-300 text-black rounded-full border-4 border-gray-400 w-16 h-16 flex items-center justify-center">
          <Timer />
        </div>
        <div className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 p-4 pl-6 pr-6 bg-gray-300 text-black rounded-full">
          <input
            type="number"
            onChange={handleChange} 
            placeholder="Enter target WPM..."
          />
          {errorMessage && (
            <p className="text-red-500 mt-2 text-xs">{errorMessage}</p>
          )}
          <p>Target WPM: {wpm}</p>
        </div>
        <div className="p-4 bg-gray-300 text-black rounded-full absolute right-0">
            Replay?
          </div>
      </div>
        
      <div className="relative w-full max-w-[90vw] bg-[#ffd4e5] bg-opacity-50 p-8 rounded-lg shadow-lg">
        {/* <h1 className="text-2xl font-semibold mb-4">spritely words below</h1> */}
        <p className="text-2xl leading-loose tracking-wide break-words">{words.map((word) => word.word).join(" ")}</p>
      </div>
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
