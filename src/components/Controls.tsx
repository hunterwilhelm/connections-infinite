import React from 'react';
import { Share2, RotateCcw } from 'lucide-react';

interface ControlsProps {
  onSubmit: () => void;
  onShare: () => void;
  onReset: () => void;
  canSubmit: boolean;
  canShare: boolean;
}

export function Controls({ onSubmit, onShare, onReset, canSubmit, canShare }: ControlsProps) {
  return (
    <div className="flex justify-center gap-3 md:gap-4 px-4">
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="px-4 md:px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 text-sm md:text-base"
      >
        Submit
      </button>
      <button
        onClick={onShare}
        disabled={!canShare}
        className="px-4 md:px-6 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 flex items-center gap-2 text-sm md:text-base"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
      <button
        onClick={onReset}
        className="px-4 md:px-6 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 text-sm md:text-base"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
}