import React from 'react';

type TypingTextProps = {
  words: { word: string }[];  // Array of words
  typedText: string;  // The text typed by the user
  cursorPosition: number;  // The position of the cursor (the index of the last typed letter)
};

const TypingText: React.FC<TypingTextProps> = ({ words, typedText, cursorPosition }) => {

  // Function to get the class for each letter (green for correct, red for wrong, etc.)
  const getLetterClass = (wordIndex: number, letterIndex: number) => {
    const correctLetter = words[wordIndex]?.word[letterIndex];
    const typedLetter = typedText.charAt(letterIndex + wordIndex); // Get the typed letter at the correct position

    // Check if the typed letter is incorrect
    if (typedLetter !== undefined) {
      // Compare each letter typed with the corresponding letter in the word
      if (typedLetter === correctLetter) {
        return 'text-green-500'; // Correct letters will be green
      } else if (typedLetter === ' ' && correctLetter !== ' ') {
        return 'text-red-500 underline'; // Incorrect: typed space when the word had a letter
      } else if (typedLetter !== ' ' && correctLetter === ' ') {
        return 'text-red-500 underline'; // Incorrect: typed letter when the word had a space
      } else {
        return 'text-red-500 underline'; // Incorrect: letter doesn't match
      }
    }
    return ''; // Default: no color (for letters that haven't been typed yet)
  };

  // Function to compare typed text and the word to see if the entire word is correct
  const getWordClass = (wordIndex: number) => {
    const word = words[wordIndex]?.word;
    const typedWord = typedText.split(' ').slice(0, wordIndex + 1).join(' ');

    // If the entire word is typed correctly, return a green class
    if (typedWord === word) {
      return 'text-green-500';
    }

    return ''; // Otherwise, no special class
  };

  // Function to handle incorrect spaces and ensure that no skipping occurs
  const handleSpaceCorrectness = (typedLetter: string, correctLetter: string) => {
    // If typed letter is a space, check if the word had a letter
    if (typedLetter === ' ' && correctLetter !== ' ') {
      return 'text-red-500 underline'; // Incorrect: space typed when the word had a letter
    }
    // If the typed letter is not a space but the word had a space
    if (typedLetter !== ' ' && correctLetter === ' ') {
      return 'text-red-500 underline'; // Incorrect: typed letter when the word had a space
    }
    return ''; // Correct case or not yet typed
  };

  return (
    <div className="relative w-full max-w-[90vw] bg-[#ffd4e5] bg-opacity-50 p-8 rounded-lg shadow-lg">
      <p className="text-2xl leading-loose tracking-wide break-words">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-2">
            {/* For each word, map through the letters */}
            <span className={getWordClass(wordIndex)}>
              {word.word.split('').map((letter, letterIndex) => {
                const typedLetter = typedText.charAt(letterIndex + wordIndex); // Get the typed letter at the correct position
                return (
                  <span
                    key={letterIndex}
                    className={handleSpaceCorrectness(typedLetter, letter) || getLetterClass(wordIndex, letterIndex)} // Handle space and other errors
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
};

export default TypingText;
