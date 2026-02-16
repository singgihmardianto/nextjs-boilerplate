"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { UIReducer, UIState } from "./AdminReducer"; // Path to your reducer

// Define the shape of our context
interface UIContextType {
  state: UIState;
  dispatch: React.Dispatch<any>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(UIReducer, {
    showErrorAlert: false,
    showSuccessAlert: false,
  });

  return <UIContext.Provider value={{ state, dispatch }}>{children}</UIContext.Provider>;
}

// Custom hook for easy access
export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
}
