import { useState, useCallback } from 'react';

export function useConfetti() {
  const [isActive, setIsActive] = useState(false);

  const startConfetti = useCallback(() => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 5000); // Run for 5 seconds
  }, []);

  return { isActive, startConfetti };
}