import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type TypingTextProps = {
  words: { word: string }[];  // Array of words
  typedText: string;  // The text typed by the user
  cursorPosition: number;  // The position of the cursor (the index of the last typed letter)
};

const TypingText: React.FC<TypingTextProps> = ({ words, typedText, cursorPosition }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const getLetterClass = (wordIndex: number, letterIndex: number) => {
    const typedLetter = typedText.split(' ')[wordIndex]?.[letterIndex];
    const correctLetter = words[wordIndex]?.word[letterIndex];
    if (typedLetter) {
      if (typedLetter === correctLetter) {
        return 'text-green-500';
      } else {
        return 'text-red-500 underline';
      }
    }
    const typedWords = typedText.split(' '); // Split typed text into words
    const typedWord = typedWords[wordIndex] || ''; // The typed word at wordIndex
    // const typedLetter = typedWord[letterIndex]; // The typed letter at letterIndex

    const totalTypedLength = typedWords.slice(0, wordIndex).reduce((acc, word) => acc + word.length + 1, 0); // Total length of all typed words
    if (cursorPosition > totalTypedLength + typedWord.length) {
      // If space was pressed prematurely, mark all the remaining letters of the word as incorrect
      if (letterIndex >= typedWord.length) {
        // setImagePosition({ top: imagePosition.top, left: imagePosition.left + 14});
        return 'text-red-500 underline'; // Untyped letters are marked as incorrect (red and underlined)
      }
    }
    return '';
  };

  const handleImageMovement = () => {
    const letterElement = letterRefs.current[cursorPosition];
    if (letterElement) {
      const letterRect = letterElement.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        const top = letterRect.top - containerRect.top - 35;
        const left = letterRect.left - containerRect.left;
        setImagePosition({ top, left });
      }
    }
  };

  const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    handleImageMovement();
  }, [cursorPosition]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[90vw] bg-[#ffd4e5] bg-opacity-50 p-8 rounded-lg">
      <Image
        src="/characters/totoro.png"
        alt="Totoro sprite"
        width={40}
        height={40}
        style={{ position: 'absolute', top: imagePosition.top, left: imagePosition.left }}
      />
      <p className="text-2xl leading-loose tracking-wide break-words">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-2">
            {word.word.split('').map((letter, letterIndex) => {
              const letterIndexInText = typedText.split(' ').slice(0, wordIndex).join(' ').length + wordIndex + letterIndex;
              return (
                <span
                  key={letterIndex}
                  ref={(el) => (letterRefs.current[letterIndexInText] = el)}
                  className={getLetterClass(wordIndex, letterIndex)}
                  data-word-index={wordIndex}
                  data-letter-index={letterIndex}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TypingText;