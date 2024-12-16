import React from 'react';
import { MainNav } from "./components/sidebar/main-nav";
import { Header } from "./components/header";
import { SidebarProvider } from "./components/sidebar";
import { useMediaQuery } from "./hooks/y";
import { TSidebarState } from './components/sidebar/sidebar-types';

export function App() {
  const [state, setState] = React.useState<TSidebarState>('expanded');
  const [open, setOpen] = React.useState(true)
  const [openMobile, setOpenMobile] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const sidebarValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar: () => {
      if (isMobile) {
        setOpenMobile(!openMobile);
      } else {
        setState(s => s === 'expanded' ? 'collapsed' : 'expanded');
      }
    }
  }), [state, open, openMobile, isMobile]);

  return (
    <SidebarProvider value={sidebarValue}>
      <div className="flex h-screen bg-background">
        <MainNav />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-4">
            {/* Main content */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
