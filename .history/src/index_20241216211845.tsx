import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MainNav } from './components/sidebar/main-nav';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className="flex h-screen bg-gray-100">
      <MainNav />
      <main className="flex-1 ml-60 p-8">
        <h1 className="text-2xl font-bold">Welcome to LightWork</h1>
      </main>
    </div>
  </React.StrictMode>
);

reportWebVitals();
