export const getLevelColor = (level: number): string => {
  switch (level) {
    case 0:
      return 'bg-yellow-100 shadow-sm shadow-yellow-200/50';
    case 1:
      return 'bg-green-100 shadow-sm shadow-green-200/50';
    case 2:
      return 'bg-blue-100 shadow-sm shadow-blue-200/50';
    case 3:
      return 'bg-purple-100 shadow-sm shadow-purple-200/50';
    default:
      return 'bg-gray-100 shadow-sm shadow-gray-200/50';
  }
};

export const getWordSize = (word: string): string => {
  const length = word.length;
  if (length <= 4) return 'clamp(0.8rem, 3vw, 1rem)';
  if (length <= 6) return 'clamp(0.7rem, 2.7vw, 0.9rem)';
  if (length <= 8) return 'clamp(0.6rem, 2.4vw, 0.8rem)';
  if (length <= 10) return 'clamp(0.5rem, 2.1vw, 0.7rem)';
  return 'clamp(0.4rem, 1.8vw, 0.6rem)';
};