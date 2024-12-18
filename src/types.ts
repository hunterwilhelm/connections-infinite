import { z } from "zod";

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


export enum MessageType {
  CORRECT = 'correct',
  ALMOST_CORRECT = 'almost_correct',
  INCORRECT = 'incorrect',
  DUPLICATE_GUESS = 'duplicate_guess',
  RESET = 'reset',
  INFO = 'info'
}




export const gameStateValidator = z.object({
  selectedWords: z.array(z.object({
    word: z.string(),
    index: z.number()
  })),
  solvedGroups: z.array(z.array(z.string())),
  attempts: z.array(z.object({
    correctWords: z.array(z.string()),
    almostCorrect: z.boolean(),
    matchedGroup: z.optional(z.object({
      level: z.number(),
      group: z.string(),
      members: z.array(z.string())
    })),
    selectedWords: z.optional(z.array(z.string())),
    answers: z.optional(z.array(z.object({
      level: z.number(),
      group: z.string(),
      members: z.array(z.string())
    })))
  })),
  messages: z.array(z.object({
    text: z.string(),
    type: z.nativeEnum(MessageType)
  }))
});
export type GameState = z.infer<typeof gameStateValidator>;
