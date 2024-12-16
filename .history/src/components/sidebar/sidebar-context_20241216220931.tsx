import * as React from 'react';
import { ISidebarContext } from "./sidebar-types";

const SidebarContext = React.createContext<ISidebarContext | undefined>(undefined);
SidebarContext.displayName = 'SidebarContext';

interface ISidebarProviderProps {
  children: React.ReactNode;
  value: ISidebarContext;
}

export function SidebarProvider({ children, value }: ISidebarProviderProps): JSX.Element {
  // Validate required context values
  React.useEffect(() => {
    if (!value || typeof value.toggleSidebar !== 'function') {
      throw new Error('SidebarProvider requires a valid context value with toggleSidebar function');
    }
  }, [value]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): ISidebarContext {
  const context = React.useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}

export { SidebarContext };
