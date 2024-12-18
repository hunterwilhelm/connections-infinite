import React from 'react';
import { SelectedWord, Connection, MessageType } from '../types';
import { getWordSize } from '../utils/styles';
import { WordTile } from './WordTile';
import { SolvedGroupRow } from './SolvedGroupRow';
import { Message } from './Message';

interface WordGridProps {
  words: string[];
  selectedWords: SelectedWord[];
  onWordClick: (word: string, index: number) => void;
  solvedGroups: string[][];
  puzzle: { answers: Connection[] } | null;
  attempts: any[];
  messages: { text: string; type: MessageType }[];
}

export function WordGrid({ 
  words, 
  selectedWords, 
  onWordClick, 
  solvedGroups, 
  puzzle,
  attempts,
  messages,
}: WordGridProps) {
  const remainingWords = words.filter(word => 
    !solvedGroups.some(group => group.includes(word))
  );

  return (
    <div className="w-full max-w-xl mx-auto px-4 space-y-4">
      {/* Solved Groups */}
      <div className="space-y-3">
        {solvedGroups.map((group, i) => {
          const connection = puzzle?.answers.find(a => 
            a.members.every(m => group.includes(m))
          );
          return (
            <SolvedGroupRow 
              key={i}
              words={group}
              connection={connection}
            />
          );
        })}
      </div>

      {/* Remaining Words Grid */}
      {remainingWords.length > 0 && (
        <div className="grid grid-cols-4 gap-1 md:gap-2">
          {remainingWords.map((word, index) => (
            <WordTile
              key={word}
              word={word}
              selected={selectedWords.some(sw => sw.word === word)}
              onClick={() => onWordClick(word, index)}
              fontSize={getWordSize(word)}
            />
          ))}
          {/* Add empty tiles to maintain 4-column grid */}
          {Array.from({ length: (4 - (remainingWords.length % 4)) % 4 }).map((_, i) => (
            <div key={`empty-${i}`} className="invisible">
              <WordTile
                word=""
                selected={false}
                onClick={() => {}}
                fontSize={getWordSize("")}
              />
            </div>
          ))}
        </div>
      )}

      {/* Game Status */}
      <div className="space-y-2">
        <div className="text-sm text-gray-600 text-center">
          Guesses made: {attempts.length}
        </div>
        <Message messages={messages} />
      </div>
    </div>
  );
}
