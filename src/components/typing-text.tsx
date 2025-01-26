import React from 'react';

type TypingTextProps = {
  words: { word: string }[];  // Array of words
  typedText: string;  // The text typed by the user
  cursorPosition: number;  // The position of the cursor (the index of the last typed letter)
};

const TypingText: React.FC<TypingTextProps> = ({ words, typedText, cursorPosition }) => {
  // Function to get the class for each letter (green for correct, red for wrong, etc.)
  const getLetterClass = (wordIndex: number, letterIndex: number) => {
    // Get the current letter of the typed text at the given position
    const typedLetter = typedText.split(' ')[wordIndex]?.[letterIndex];

    // Get the corresponding letter from the word at the same position
    const correctLetter = words[wordIndex]?.word[letterIndex];

    // If there's a typed letter, compare it
    if (typedLetter) {
      if (typedLetter === correctLetter) {
        return 'text-green-500'; // Correct letter will be green
      } else {
        return 'text-red-500 underline'; // Incorrect letter will be red and underlined
      }
    } 
    // else {
    //   // If the cursor has moved past the current word, mark remaining letters as incorrect
    //   const currentWordLength = words[wordIndex]?.word.length || 0;
    //   const totalTypedLength = typedText.split(' ').slice(0, wordIndex).reduce((acc, word) => acc + word.length + 1, 0);
    //   if (cursorPosition > totalTypedLength + letterIndex) {
    //     // if (cursorPosition > totalTypedLength) {
    //     return 'text-red-500 underline'; // Untyped letter will be red and underlined
    //   }
    // }
    const typedWords = typedText.split(' '); // Split typed text into words
    const typedWord = typedWords[wordIndex] || ''; // The typed word at wordIndex
    // const typedLetter = typedWord[letterIndex]; // The typed letter at letterIndex

    const totalTypedLength = typedWords.slice(0, wordIndex).reduce((acc, word) => acc + word.length + 1, 0); // Total length of all typed words
    if (cursorPosition > totalTypedLength + typedWord.length) {
      // If space was pressed prematurely, mark all the remaining letters of the word as incorrect
      if (letterIndex >= typedWord.length) {
        return 'text-red-500 underline'; // Untyped letters are marked as incorrect (red and underlined)
      }
    }

    // Default: no color (for letters that haven't been typed yet)
    return '';
  };

  return (
    <div className="relative w-full max-w-[90vw] bg-[#ffd4e5] bg-opacity-50 p-8 rounded-lg shadow-lg">
      <p className="text-2xl leading-loose tracking-wide break-words">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-2">
            {/* For each word, map through the letters */}
            {word.word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={getLetterClass(wordIndex, letterIndex)} // Assign color/underline based on correctness
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TypingText;
