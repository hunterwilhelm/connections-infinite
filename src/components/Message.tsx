import React, { useEffect, useState, useContext } from 'react';
import { AlertCircle } from 'lucide-react';
import { MessageType } from '../types';
import { ButtonPressContext } from '../context/ButtonPressContext';

interface MessageProps {
  messages: { text: string; type: MessageType }[];
}

export function Message({ messages }: MessageProps) {
  const [shake, setShake] = useState(false);
  const { buttonPressCount } = useContext(ButtonPressContext);

  useEffect(() => {
    const hasShakeMessage = messages.some(
      (msg) => msg.type === MessageType.INCORRECT || msg.type === MessageType.DUPLICATE_GUESS
    );

    if (hasShakeMessage) {
      setShake(false); // Reset shake state
      setTimeout(() => setShake(true), 0); // Trigger shake animation
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [messages, buttonPressCount]);

  if (messages.length === 0) return null;

  return (
    <div className={`bg-white p-3 md:p-4 rounded-lg shadow-sm flex flex-col gap-2 mx-4 text-sm md:text-base ${shake ? 'shake' : ''}`}>
      {messages.map((msg, index) => (
        <div key={index} className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
}
