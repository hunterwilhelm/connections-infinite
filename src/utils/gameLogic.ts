import { Connection, AttemptResult } from '../types';

export const checkGuess = (
  selectedWords: string[],
  answers: Connection[]
): AttemptResult => {
  // Check for exact match first
  const matchedGroup = answers.find(answer =>
    answer.members.every(member => selectedWords.includes(member))
  );

  if (matchedGroup) {
    return {
      correctWords: selectedWords,
      almostCorrect: false,
      matchedGroup,
      selectedWords,
      answers
    };
  }

  // Check for partial matches and near misses
  for (const answer of answers) {
    const correctWords = selectedWords.filter(word => 
      answer.members.includes(word)
    );

    // If we have 3 correct words from any group, it's "almost correct"
    if (correctWords.length === 3) {
      return {
        correctWords,
        almostCorrect: true,
        selectedWords,
        answers
      };
    }
  }

  // Find any words that belong to any group
  const correctWords = selectedWords.filter(word =>
    answers.some(answer => answer.members.includes(word))
  );

  return {
    correctWords,
    almostCorrect: false,
    selectedWords,
    answers
  };
};