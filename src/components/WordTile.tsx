import React from 'react';
import { calculateFontSize } from '../utils/typography';

interface WordTileProps {
  word: string;
  selected: boolean;
  onClick: () => void;
  fontSize?: string;
}

export function WordTile({ word, selected, onClick }: WordTileProps) {
  return (
    <button
      onClick={onClick}
      className={`
        aspect-square w-full
        flex items-center justify-center
        border-2 rounded font-semibold
        hover:bg-gray-100 cursor-pointer
        transition-all duration-300 ease-in-out
        ${selected ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'}
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