"use client";

import Image from "next/image";
import {useEffect, useState} from 'react';

export default function Home() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('/api/words')
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error('Error fetching words: ', error));
  }, []);

  return (
    <div className="grid min-h-screen p-6 sm:p-8 font-[Roboto Mono] bg-[var(--background)]">
      <main className="flex flex-col items-center justify-start flex-grow mt-20">
        
      <div className="flex flex-row items-center space-x-6 mb-10 w-full max-w-[90vw] relative">
        <div className="p-4 bg-gray-300 text-black rounded-full">
          Timer?
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 p-4 bg-gray-300 text-black rounded-full">
          Possibly text box for user-inputted target wpm? :D
        </div>
        <div className="p-4 bg-gray-300 text-black rounded-full absolute right-0">
            Replay?
          </div>
      </div>
        
      <div className="relative w-full max-w-[90vw] bg-[#ffd4e5] bg-opacity-50 p-8 rounded-lg shadow-lg">
        {/* <h1 className="text-2xl font-semibold mb-4">spritely words below</h1> */}
        <p className="text-xl break-words">spritely words and words and words... box expands with more words!{words.join()}</p>
      </div>
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
