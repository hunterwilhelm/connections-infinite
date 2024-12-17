import React, { useEffect, useState, useContext } from 'react';
import { AlertCircle } from 'lucide-react';
import { MessageType } from '../types';
import { ButtonPressContext } from '../context/ButtonPressContext';

interface MessageProps {
  message: string;
  messageType: MessageType;
}

export function Message({ message, messageType }: MessageProps) {
  const [shake, setShake] = useState(false);
  const { buttonPressCount } = useContext(ButtonPressContext);

  useEffect(() => {
    if (messageType === MessageType.INCORRECT || messageType === MessageType.DUPLICATE_GUESS) {
      setShake(false); // Reset shake state
      setTimeout(() => setShake(true), 0); // Trigger shake animation
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [messageType, message, buttonPressCount]);

  if (!message) return null;

  return (
    <div className={`bg-white p-3 md:p-4 rounded-lg shadow-sm flex items-center gap-2 mx-4 text-sm md:text-base ${shake ? 'shake' : ''}`}>
      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
}
