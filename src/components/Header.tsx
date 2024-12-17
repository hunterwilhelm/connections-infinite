import React from 'react';
import { DateDisplay } from './DateDisplay';
import { PuzzleData } from '../types';

interface HeaderProps {
  puzzle: PuzzleData | null;
}

export function Header({ puzzle }: HeaderProps) {
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Connections Infinite</h1>
      <p className="text-gray-600 text-sm md:text-base mb-1">Find groups of four related words</p>
      <p className="text-gray-500 text-xs md:text-sm mb-3">
        Unlimited attempts available - try to solve it in as few guesses as possible!
      </p>
      {puzzle && (
        <DateDisplay date={puzzle.date} puzzleId={puzzle.id} />
      )}
    </div>
  );
}