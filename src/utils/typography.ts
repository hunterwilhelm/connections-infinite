import { WordLength } from '../types';

export const calculateFontSize = (word: string): string => {
  const length = word.length;
  
  // Map word length to specific size ranges
  if (length <= 3) return 'clamp(1rem, 4vw, 1.2rem)';      // Very short words
  if (length <= 5) return 'clamp(0.9rem, 3.5vw, 1.1rem)';  // Short words
  if (length <= 7) return 'clamp(0.8rem, 3vw, 1rem)';      // Medium words
  if (length <= 9) return 'clamp(0.7rem, 2.5vw, 0.9rem)';  // Long words
  return 'clamp(0.6rem, 2vw, 0.8rem)';                     // Very long words
};