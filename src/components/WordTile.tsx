import React from 'react';

interface WordTileProps {
  word: string;
  selected: boolean;
  onClick: () => void;
  fontSize: string;
}

export function WordTile({ word, selected, onClick, fontSize }: WordTileProps) {
  return (
    <button
      onClick={onClick}
      className={`
        p-1 md:p-2 text-center border-2 rounded font-semibold
        flex items-center justify-center
        hover:bg-gray-100 cursor-pointer
        transition-all duration-300 ease-in-out
        ${selected ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'}
        touch-manipulation
      `}
      style={{ fontSize }}
    >
      <span className="break-words text-center w-full">
        {word}
      </span>
    </button>
  );
}