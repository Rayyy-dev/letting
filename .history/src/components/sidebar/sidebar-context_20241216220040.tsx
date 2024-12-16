import * as React from 'react';
import { ISidebarContext } from "./sidebar-types";

const SidebarContext = React.createContext<ISidebarContext | undefined>(undefined);

interface ISidebarProviderProps {
  children: React.ReactNode;
  value: ISidebarContext;
}

export function SidebarProvider({ children, value }: ISidebarProviderProps) {
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): ISidebarContext {
  const context = React.useContext(SidebarContext);
  
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}

export { SidebarContext };
