import React, { createContext, useContext, useState } from 'react';

interface FunnelContextType {
  isFunnelOpen: boolean;
  openFunnel: () => void;
  closeFunnel: () => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export const FunnelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFunnelOpen, setIsFunnelOpen] = useState(false);

  const openFunnel = () => setIsFunnelOpen(true);
  const closeFunnel = () => setIsFunnelOpen(false);

  return (
    <FunnelContext.Provider value={{ isFunnelOpen, openFunnel, closeFunnel }}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
};