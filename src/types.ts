export interface Connection {
  level: number;
  group: string;
  members: string[];
}

export interface PuzzleData {
  id: number;
  date: string;
  answers: Connection[];
}

export interface SelectedWord {
  word: string;
  index: number;
}

export interface AttemptResult {
  correctWords: string[];
  almostCorrect: boolean;
  matchedGroup?: Connection;
  // Add these fields to track words and answers for incorrect attempts
  selectedWords?: string[];
  answers?: Connection[];
}

export interface GameState {
  selectedWords: SelectedWord[];
  solvedGroups: string[][];
  attempts: AttemptResult[];
  message: string;
}