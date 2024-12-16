'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ISidebarProps } from './sidebar-types';
import { SidebarContext } from './sidebar-context';
import { useIsMobile } from '@/hooks/use-mobile';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';

export const Sidebar = React.forwardRef<HTMLDivElement, ISidebarProps>(
  ({ defaultOpen = true, open, onOpenChange, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const [openMobile, setOpenMobile] = React.useState(false);
    
    const state = isOpen ? 'expanded' : 'collapsed';

    const toggleSidebar = React.useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    React.useEffect(() => {
      onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);

    return (
      <SidebarContext.Provider
        value={{
          state,
          open: isOpen,
          setOpen: setIsOpen,
          openMobile,
          setOpenMobile,
          isMobile,
          toggleSidebar,
        }}
      >
        <div
          ref={ref}
          className={cn(
            'fixed inset-y-0 left-0 z-40',
            'w-[var(--sidebar-width)]',
            'transition-all duration-300 ease-in-out',
            {
              'translate-x-0': isOpen,
              '-translate-x-full': !isOpen,
            }
          )}
          style={{
            '--sidebar-width': isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          } as React.CSSProperties}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = 'Sidebar';
