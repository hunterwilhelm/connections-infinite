import { useState, useCallback, useEffect, useRef } from 'react';
import { SelectedWord, AttemptResult, Connection, GameState, MessageType } from '../types';
import { checkGuess } from '../utils/gameLogic';
import { loadGameState, saveGameState, clearGameState } from '../storage/gameStorage';

const createInitialState = (): GameState => ({
  selectedWords: [],
  solvedGroups: [],
  attempts: [],
  message: '',
  messageType: MessageType.INFO
});

export function useGameState(puzzleId: number | null) {
  const [gameState, setGameState] = useState<GameState>(createInitialState);
  const isDirty = useRef(false);
  const initializedRef = useRef(false);

  // Initialize game state when puzzle ID is available
  useEffect(() => {
    if (puzzleId && !initializedRef.current) {
      const savedState = loadGameState(puzzleId);
      if (savedState) {
        setGameState(savedState);
      }
      initializedRef.current = true;
    }
  }, [puzzleId]);

  // Save game state only when it's dirty
  useEffect(() => {
    if (puzzleId && isDirty.current) {
      saveGameState(puzzleId, gameState);
      isDirty.current = false;
    }
  }, [puzzleId, gameState]);

  const resetGame = useCallback(() => {
    if (puzzleId) {
      clearGameState(puzzleId);
      setGameState(createInitialState());
      initializedRef.current = false;
      isDirty.current = false;
      if (navigator.vibrate) {
        navigator.vibrate(200); // Haptic feedback for game reset
      }
    }
  }, [puzzleId]);

  const handleWordClick = useCallback((word: string, index: number) => {
    isDirty.current = true;
    setGameState(prevState => {
      if (prevState.selectedWords.some(w => w.word === word)) {
        return {
          ...prevState,
          selectedWords: prevState.selectedWords.filter(w => w.word !== word)
        };
      }
      
      if (prevState.selectedWords.length < 4) {
        return {
          ...prevState,
          selectedWords: [...prevState.selectedWords, { word, index }]
        };
      }
      
      return prevState;
    });
  }, []);

  const checkSelection = useCallback((puzzle: { answers: Connection[] } | null) => {
    if (!puzzle || gameState.selectedWords.length !== 4) return;

    const selectedWordsList = gameState.selectedWords.map(s => s.word);

    // Check if the guess has already been made
    const isDuplicateGuess = gameState.attempts.some(attempt =>
      attempt.selectedWords?.every(word => selectedWordsList.includes(word))
    );

    if (isDuplicateGuess) {
      setGameState(prevState => ({
        ...prevState,
        message: prevState.message ? `${prevState.message}\nYou have already made this guess.` : 'You have already made this guess.',
        messageType: MessageType.DUPLICATE_GUESS
      }));
      if (navigator.vibrate) {
        navigator.vibrate(100); // Haptic feedback for duplicate guess
      }
      return;
    }

    const result = checkGuess(selectedWordsList, puzzle.answers);

    isDirty.current = true;
    setGameState(prevState => {
      const newState = {
        ...prevState,
        attempts: [...prevState.attempts, result]
      };

      if (result.matchedGroup) {
        newState.solvedGroups = [...prevState.solvedGroups, selectedWordsList];
        newState.message = prevState.message ? `${prevState.message}\nCorrect! Category: ${result.matchedGroup.group}` : `Correct! Category: ${result.matchedGroup.group}`;
        newState.messageType = MessageType.CORRECT;
        newState.selectedWords = [];
        if (navigator.vibrate) {
          navigator.vibrate(200); // Haptic feedback for correct guess
        }
      } else if (result.almostCorrect) {
        newState.message = prevState.message ? `${prevState.message}\nSo close! You have 3 words from the same group!` : 'So close! You have 3 words from the same group!';
        newState.messageType = MessageType.ALMOST_CORRECT;
        if (navigator.vibrate) {
          navigator.vibrate(150); // Haptic feedback for almost correct guess
        }
      } else {
        newState.message = prevState.message ? `${prevState.message}\nThose words don't belong together` : 'Those words don\'t belong together';
        newState.messageType = MessageType.INCORRECT;
        if (navigator.vibrate) {
          navigator.vibrate(100); // Haptic feedback for incorrect guess
        }
      }

      return newState;
    });
  }, [gameState.selectedWords, gameState.attempts]);

  const setMessage = useCallback((message: string, messageType: MessageType = MessageType.INFO) => {
    isDirty.current = true;
    setGameState(prevState => ({ ...prevState, message: prevState.message ? `${prevState.message}\n${message}` : message, messageType }));
  }, []);

  return {
    ...gameState,
    handleWordClick,
    checkSelection,
    setMessage,
    resetGame
  };
}
