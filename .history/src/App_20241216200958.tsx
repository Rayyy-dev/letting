import React from 'react';
import { Sidebar } from './components/sidebar';

export function App() {
  return (
    <div className="flex h-screen">
      <Sidebar>
        {/* Initial implementation with just Letting */}
        <nav>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Letting</h2>
          </div>
        </nav>
      </Sidebar>
      <main className="ml-[var(--sidebar-width)] flex-1 p-4">
        {/* Main content */}
      </main>
    </div>
  );
}
