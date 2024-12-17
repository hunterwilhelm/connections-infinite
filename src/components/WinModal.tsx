import React from 'react';
import { X } from 'lucide-react';

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  emojiGrid: string;
  attempts: number;
  puzzleId?: number;
}

export function WinModal({ isOpen, onClose, emojiGrid, attempts, puzzleId }: WinModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-4">Congratulations! 🎉</h2>
        <p className="text-center mb-6">
          You solved it in {attempts} {attempts === 1 ? 'guess' : 'guesses'}!
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <pre className="text-center whitespace-pre-wrap font-mono">
            Connections Infinite
            {puzzleId ? `\n#${puzzleId}` : ''}
            {'\n'}
            {emojiGrid}
          </pre>
        </div>
        
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `Connections Infinite${puzzleId ? `\n#${puzzleId}` : ''}\n${emojiGrid}`
            );
            onClose();
          }}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Share Results
        </button>
      </div>
    </div>
  );
}