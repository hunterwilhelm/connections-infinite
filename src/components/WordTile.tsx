import React from 'react';
import { calculateFontSize } from '../utils/typography';

interface WordTileProps {
  word: string;
  selected: boolean;
  onClick: () => void;
  fontSize?: string;
}

export function WordTile({ word, selected, onClick }: WordTileProps) {
  const handleClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // Haptic feedback for word click
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        aspect-square w-full
        flex items-center justify-center
        border-2 rounded font-semibold
        ${selected ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'}
        ${!isMobile() && 'hover:bg-blue-50'}
        cursor-pointer
        transition-all duration-300 ease-in-out
        touch-manipulation
        p-0.5
      `}
      style={{ fontSize: calculateFontSize(word) }}
    >
      <span className="break-words text-center w-full">
        {word}
      </span>
    </button>
  );
}

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
