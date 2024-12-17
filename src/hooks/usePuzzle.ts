import { useState, useEffect } from 'react';
import { PuzzleData } from '../types';
import { shuffleArray } from '../utils/array';

export function usePuzzle() {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Eyefyre/NYT-Connections-Answers/main/connections.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch puzzle data');
        }
        return response.json();
      })
      .then((data: PuzzleData[]) => {
        const latestPuzzle = data[data.length - 1];
        setPuzzle(latestPuzzle);
        const allWords = latestPuzzle.answers.flatMap(answer => answer.members);
        setWords(shuffleArray(allWords));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { puzzle, words, isLoading, error };
}