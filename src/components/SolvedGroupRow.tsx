import React from 'react';
import { Connection } from '../types';
import { getLevelColor } from '../utils/styles';
import { getWordSize } from '../utils/styles';

interface SolvedGroupRowProps {
  words: string[];
  connection: Connection | undefined;
}

export function SolvedGroupRow({ words, connection }: SolvedGroupRowProps) {
  return (
    <div className="relative">
      <div className={`
        grid grid-cols-4 gap-1 md:gap-2 p-2 rounded-lg
        ${getLevelColor(connection?.level ?? 0)}
        transition-all duration-300 ease-in-out
      `}>
        {words.map((word, i) => (
          <div
            key={i}
            className="bg-white/90 rounded font-medium flex items-center justify-center p-1 md:p-2"
            style={{ fontSize: getWordSize(word) }}
          >
            <span className="break-words text-center w-full">
              {word}
            </span>
          </div>
        ))}
      </div>
      {connection && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <span className="bg-white px-2 py-0.5 rounded-full text-sm font-bold text-gray-700 shadow-sm">
            {connection.group}
          </span>
        </div>
      )}
    </div>
  );
}