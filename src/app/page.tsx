"use client";

import useRandomWords from '../hooks/useRandomWords';

export default function Home() {
  //Puts random words in an array "words." Set parameter for # of random words
  const {words, loading, error} = useRandomWords(10);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>sprite type</h1>
      
        <ul>
          {words.map((word) => (
            <li key={word._id}>{word.word}</li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
