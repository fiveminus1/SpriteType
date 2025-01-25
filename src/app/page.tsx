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
    <div className="grid min-h-screen p-6 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
        <h1>sprite type</h1>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
