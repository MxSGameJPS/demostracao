"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
  isSignupOpen: boolean;
  openSignup: () => void;
  closeSignup: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  return (
    <ModalContext.Provider value={{ isSignupOpen, openSignup, closeSignup }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
