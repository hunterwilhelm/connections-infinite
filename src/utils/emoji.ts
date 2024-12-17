import { AttemptResult, Connection } from '../types';

// Helper to find which group a word belongs to
const findWordGroup = (word: string, answers: Connection[]): Connection | undefined => {
  return answers.find(answer => answer.members.includes(word));
};

// Get emoji for a single word based on its group level
const getEmojiForLevel = (level: number): string => {
  switch (level) {
    case 0: return '🟨'; // Yellow for easiest
    case 1: return '🟩'; // Green for medium
    case 2: return '🟦'; // Blue for hard
    case 3: return '🟪'; // Purple for hardest
    default: return '⬜';
  }
};

export const getEmojiGrid = (attempts: AttemptResult[]): string => {
  return attempts
    .map(attempt => {
      if (attempt.matchedGroup) {
        // Correct group - all emojis same color
        return Array(4).fill(getEmojiForLevel(attempt.matchedGroup.level)).join('');
      }

      // For incorrect guesses, show the actual group colors for each word
      if (attempt.selectedWords && attempt.answers) {
        return attempt.selectedWords
          .map(word => {
            const group = findWordGroup(word, attempt.answers);
            return group ? getEmojiForLevel(group.level) : '⬜';
          })
          .join('');
      }

      // Fallback for old data format
      return '⬜⬜⬜⬜';
    })
    .join('\n');
};