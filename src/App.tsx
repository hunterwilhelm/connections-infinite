import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { WordGrid } from './components/WordGrid';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { WinModal } from './components/WinModal';
import { ResetModal } from './components/ResetModal';
import { usePuzzle } from './hooks/usePuzzle';
import { useGameState } from './hooks/useGameState';
import { useConfetti } from './hooks/useConfetti';
import { getEmojiGrid } from './utils/emoji';

export default function App() {
  const { puzzle, words, isLoading, error } = usePuzzle();
  const {
    selectedWords,
    solvedGroups,
    attempts,
    message,
    handleWordClick,
    checkSelection,
    setMessage,
    resetGame
  } = useGameState(puzzle?.id ?? null);
  
  const { isActive: showConfetti, startConfetti } = useConfetti();
  const [showWinModal, setShowWinModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const isGameComplete = puzzle && solvedGroups.length === puzzle.answers.length;

  useEffect(() => {
    if (isGameComplete) {
      startConfetti();
      setTimeout(() => setShowWinModal(true), 1000);
    }
  }, [isGameComplete, startConfetti]);

  const copyResults = () => {
    if (!puzzle) return;
    
    const emojiGrid = getEmojiGrid(attempts);
    const shareText = `Connections Infinite\n#${puzzle.id}\n${emojiGrid}`;
    navigator.clipboard.writeText(shareText);
    setMessage('Results copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading puzzle...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {showConfetti && <ReactConfetti />}
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 py-4">
        <Header puzzle={puzzle} />
        <WordGrid
          words={words}
          selectedWords={selectedWords}
          onWordClick={handleWordClick}
          solvedGroups={solvedGroups}
          puzzle={puzzle}
          message={message}
          attempts={attempts}
        />
        <Controls
          onSubmit={() => checkSelection(puzzle)}
          onShare={copyResults}
          onReset={() => setShowResetModal(true)}
          canSubmit={selectedWords.length === 4}
          canShare={attempts.length > 0}
        />
      </div>
      <WinModal
        isOpen={showWinModal}
        onClose={() => setShowWinModal(false)}
        emojiGrid={getEmojiGrid(attempts)}
        attempts={attempts.length}
        puzzleId={puzzle?.id}
      />
      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={resetGame}
      />
    </div>
  );
}