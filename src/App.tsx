import React from 'react';
import { MainNav } from "./components/sidebar/main-nav";
import { Header } from "./components/header";
import { SidebarProvider } from "./components/sidebar/sidebar-context";
import { useMediaQuery } from "./hooks/use-media-query";
import { TSidebarState } from './components/sidebar/sidebar-types';
import { LettingPage } from './pages/letting';

export function App() {
  const [state, setState] = React.useState<TSidebarState>('expanded');
  const [open, setOpen] = React.useState(true);
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
      <div className="flex h-screen bg-gray-50">
        <MainNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <LettingPage />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
