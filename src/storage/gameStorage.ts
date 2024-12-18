import { GameState, gameStateValidator } from '../types';

const STORAGE_PREFIX = 'connections-game-';

export const getStorageKey = (puzzleId: number | null): string => 
  puzzleId ? `${STORAGE_PREFIX}${puzzleId}` : '';

export const loadGameState = (puzzleId: number | null): GameState | null => {
  if (!puzzleId) return null;
  
  try {
    const savedState = window.localStorage.getItem(getStorageKey(puzzleId));
    try {
      const state = savedState ? JSON.parse(savedState) : null;
    if (gameStateValidator.safeParse(state).success) {
      return state;
    } else {
      return null;
    }
    } catch {
      return null;
    }

  } catch (error) {
    console.error('Error loading game state:', error);
    return null;
  }
};

export const saveGameState = (puzzleId: number | null, state: GameState): void => {
  if (!puzzleId) return;
  
  try {
    window.localStorage.setItem(getStorageKey(puzzleId), JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

export const clearGameState = (puzzleId: number | null): void => {
  if (!puzzleId) return;
  
  try {
    window.localStorage.removeItem(getStorageKey(puzzleId));
  } catch (error) {
    console.error('Error clearing game state:', error);
  }
};