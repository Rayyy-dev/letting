import * as React from 'react';
import { ISidebarProps } from './sidebar-types';
import { SidebarContext } from './sidebar-context';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';

export const Sidebar = React.forwardRef<HTMLDivElement, ISidebarProps>(
  ({ defaultOpen = true, open, onOpenChange, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const [openMobile, setOpenMobile] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    const handleResize = React.useCallback(() => {
      setIsMobile(window.innerWidth < 768);
    }, []);

    React.useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const handleToggleSidebar = React.useCallback(() => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
    }, [isOpen, onOpenChange]);

    const state = isOpen ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo(
      () => ({
        state,
        open: isOpen,
        setOpen: setIsOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar: handleToggleSidebar
      }),
      [state, isOpen, openMobile, isMobile, handleToggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={`fixed left-0 top-0 z-40 h-screen transform transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
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
