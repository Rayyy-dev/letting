import React from 'react';
import { MainNav } from "./components/sidebar/main-nav";
import { Header } from "./components/header";
import { SidebarProvider } from "./components/sidebar/sidebar-context";

export function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
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