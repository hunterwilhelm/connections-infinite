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
  selectedWords?: string[];
  answers?: Connection[];
}

export interface GameState {
  selectedWords: SelectedWord[];
  solvedGroups: string[][];
  attempts: AttemptResult[];
  message: string;
  messageType?: MessageType; // P621a
}

export enum MessageType {
  CORRECT = 'correct',
  ALMOST_CORRECT = 'almost_correct',
  INCORRECT = 'incorrect',
  DUPLICATE_GUESS = 'duplicate_guess',
  RESET = 'reset',
  INFO = 'info'
}
