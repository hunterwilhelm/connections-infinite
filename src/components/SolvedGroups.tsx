import React from 'react';
import { Connection } from '../types';
import { getLevelColor } from '../utils/styles';

interface SolvedGroupsProps {
  groups: string[][];
  puzzle: { answers: Connection[] } | null;
}

export function SolvedGroups({ groups, puzzle }: SolvedGroupsProps) {
  if (groups.length === 0) return null;

  // Sort groups by level (0-3)
  const sortedGroups = [...groups].sort((a, b) => {
    const connectionA = puzzle?.answers.find(ans => 
      ans.members.every(m => a.includes(m))
    );
    const connectionB = puzzle?.answers.find(ans => 
      ans.members.every(m => b.includes(m))
    );
    return (connectionA?.level ?? 0) - (connectionB?.level ?? 0);
  });

  return (
    <div className="space-y-3 px-4">
      {sortedGroups.map((group, i) => {
        const connection = puzzle?.answers.find(a => 
          a.members.every(m => group.includes(m))
        );
        
        return (
          <div key={i} className="text-center">
            <div className={`
              p-2 rounded-lg ${getLevelColor(connection?.level ?? 0)}
              transition-all duration-300 ease-in-out
            `}>
              <div className="flex justify-center gap-2 flex-wrap">
                {group.map((word, j) => (
                  <span 
                    key={j} 
                    className="px-3 py-1.5 bg-white/90 rounded font-medium text-sm md:text-base"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-1 font-bold text-sm md:text-base text-gray-700">
              {connection?.group}
            </div>
          </div>
        );
      })}
    </div>
  );
}