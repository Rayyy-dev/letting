import { createContext, useContext, useState, ReactNode } from 'react';
import { ISidebarContext, TSidebarState } from './sidebar-types';
import { useMediaQuery } from '../../lib/hooks/use-media-query';

const SidebarContext = createContext<ISidebarContext | null>(null);

interface ISidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({ 
  children, 
  defaultOpen = true 
}: ISidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const state: TSidebarState = open ? 'expanded' : 'collapsed';

  const toggle = () => {
    if (isMobile) {
      setOpenMobile(prev => !prev);
    } else {
      setOpen(prev => !prev);
    }
  };

  return (
    <SidebarContext.Provider 
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggle
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}
