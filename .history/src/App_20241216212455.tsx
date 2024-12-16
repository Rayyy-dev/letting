import React from 'react';
import { MainNav } from "./components/sidebar/main-nav";

export function App() {
  return (
    <div className="flex h-screen">
      <MainNav />
      <main className="flex-1 p-4">
        {/* Main content */}
      </main>
    </div>
  );
}

// Add default export
export default App;
