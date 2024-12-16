import { Bell, Search, User } from 'lucide-react';
import { ToggleButton } from '../sidebar/toggle-button';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 dark:bg-gray-800">
      {/* Left section with toggle and search */}
      <div className="flex items-center gap-4">
        <ToggleButton />
        
        <div className="hidden md:flex items-center gap-2 rounded-md border px-3 py-1.5">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right section with notifications and profile */}
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        </button>

        <button className="flex items-center gap-2 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <span className="hidden md:inline-block text-sm font-medium">John Doe</span>
        </button>
      </div>
    </header>
  );
} 