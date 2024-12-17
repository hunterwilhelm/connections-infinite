export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getLevelColor = (level: number): string => {
  switch (level) {
    case 0:
      return 'bg-yellow-200 border-yellow-400';
    case 1:
      return 'bg-green-200 border-green-400';
    case 2:
      return 'bg-blue-200 border-blue-400';
    case 3:
      return 'bg-purple-200 border-purple-400';
    default:
      return 'bg-gray-200 border-gray-400';
  }
};

export const getEmojiGrid = (attempts: boolean[][]): string => {
  return attempts
    .map(row => 
      row.map(correct => correct ? '🟩' : '⬜').join('')
    )
    .join('\n');
};