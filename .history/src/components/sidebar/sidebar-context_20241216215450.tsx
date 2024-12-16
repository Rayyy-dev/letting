import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ISidebarContext, TSidebarState } from './sidebar-types';
import { useMediaQuery } from 'hooks/use-media-query';

const SidebarContext = createContext<ISidebarContext | null>(null);

interface ISidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({ 
  children, 
  defaultOpen = true 
}: ISidebarProviderProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [openMobile, setOpenMobile] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const state: TSidebarState = open ? 'expanded' : 'collapsed';

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile(prev => !prev);
    } else {
      setOpen(prev => !prev);
    }
  }, [isMobile]);

  const value = {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): ISidebarContext {
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}
