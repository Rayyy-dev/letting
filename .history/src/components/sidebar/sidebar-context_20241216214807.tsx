import * as React from 'react';
import { ISidebarContext } from "./sidebar-types";

const SidebarContext = React.createContext<ISidebarContext | null>(null);

export const useSidebar = (): ISidebarContext => {
  const context = React.useContext(SidebarContext);
  
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
};

export { SidebarContext };
