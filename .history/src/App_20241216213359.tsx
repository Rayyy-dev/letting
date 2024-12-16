import React from 'react';
import { MainNav } from "./components/sidebar/main-nav";
import { SidebarProvider } from "./components/ui/sidebar";

export function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <MainNav />
        <main className="flex-1 p-4">
          {/* Main content */}
        </main>
      </div>
    </SidebarProvider>
  );
}

// Add default export
export default App;
