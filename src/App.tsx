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
import { ButtonPressProvider } from './context/ButtonPressContext';

export default function App() {
  const { puzzle, words, isLoading, error, fetchPuzzleById } = usePuzzle();
  const {
    selectedWords,
    solvedGroups,
    attempts,
    messages,
    handleWordClick,
    checkSelection,
    setMessage,
    resetGame
  } = useGameState(puzzle?.id ?? null);
  
  const { isActive: showConfetti, startConfetti } = useConfetti();
  const [showWinModal, setShowWinModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [puzzleIdInput, setPuzzleIdInput] = useState('');
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

  const handleFetchPuzzle = () => {
    const puzzleId = parseInt(puzzleIdInput, 10);
    if (!isNaN(puzzleId)) {
      fetchPuzzleById(puzzleId);
    }
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
    <ButtonPressProvider>
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
            messages={messages}
            attempts={attempts}
          />
          <Controls
            onSubmit={() => checkSelection(puzzle)}
            onShare={copyResults}
            onReset={() => setShowResetModal(true)}
            canSubmit={selectedWords.length === 4}
            canShare={attempts.length > 0}
          />
          <div className="flex justify-center mt-4">
            <input
              type="number"
              value={puzzleIdInput}
              onChange={(e) => setPuzzleIdInput(e.target.value)}
              placeholder="Enter puzzle ID"
              className="px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleFetchPuzzle}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Fetch Puzzle
            </button>
          </div>
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
        <div className="banner rounded-lg p-4 mt-6 flex flex-col items-center space-y-4">
          <p className="text-gray-700 text-center">
            Built with <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">bolt.new</a> and <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">GitHub Copilot Workspace</a>
          </p>
          <div className="logos flex space-x-4">
            <a href="https://bolt.new" target="_blank" rel="noopener noreferrer">
              <img src="/bolt-new-logo.jpg" alt="bolt.new logo" className="h-12 w-auto" />
            </a>
            <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">
              <img src="/copilot-workspace-logo.svg" alt="GitHub Copilot Workspace logo" className="h-12 w-auto" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-gray-700 text-center text-sm mt-4">
            This application is not affiliated with The New York Times. All puzzles and data are generated independently. No ads No data is saved or shared. 
          </p>
        </div>
      </div>
    </ButtonPressProvider>
  );
}
