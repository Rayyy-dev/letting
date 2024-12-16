import React from 'react';
import { Sidebar } from './components/sidebar';

export function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <h1 className="text-2xl font-bold">Welcome to LightWork</h1>
      </main>
    </div>
  );
}
