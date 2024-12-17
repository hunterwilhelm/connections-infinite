import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ButtonPressContextProps {
  buttonPressCount: number;
  incrementButtonPressCount: () => void;
}

const ButtonPressContext = createContext<ButtonPressContextProps | undefined>(undefined);

export const ButtonPressProvider = ({ children }: { children: ReactNode }) => {
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const incrementButtonPressCount = () => {
    setButtonPressCount(prevCount => prevCount + 1);
  };

  return (
    <ButtonPressContext.Provider value={{ buttonPressCount, incrementButtonPressCount }}>
      {children}
    </ButtonPressContext.Provider>
  );
};

export const useButtonPressContext = () => {
  const context = useContext(ButtonPressContext);
  if (!context) {
    throw new Error('useButtonPressContext must be used within a ButtonPressProvider');
  }
  return context;
};
