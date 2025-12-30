import { createContext, useContext, useState, useCallback } from 'react';
import UnlockModal from './components/UnlockModal';

const UnlockContext = createContext(null);

export function UnlockProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openUnlock = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeUnlock = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <UnlockContext.Provider value={{ openUnlock }}>
      {children}

      {/* Mounted ONCE globally */}
      <UnlockModal isOpen={isOpen} onClose={closeUnlock} />
    </UnlockContext.Provider>
  );
}

export function useUnlock() {
  const ctx = useContext(UnlockContext);
  if (!ctx) {
    throw new Error('useUnlock must be used inside UnlockProvider');
  }
  return ctx;
}
