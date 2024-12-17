import React from 'react';
import { formatDate } from '../utils/date';

interface DateDisplayProps {
  date: string;
  puzzleId: number;
}

export function DateDisplay({ date, puzzleId }: DateDisplayProps) {
  return (
    <div className="text-center text-gray-600">
      <div className="text-sm">{formatDate(date)}</div>
      <div className="text-xs mt-1">#{puzzleId}</div>
    </div>
  );
}