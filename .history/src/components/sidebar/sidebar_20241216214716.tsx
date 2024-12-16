import { ReactNode } from 'react';
import { useSidebar } from './sidebar-context';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={twMerge(
        'fixed left-0 top-0 z-40 h-screen w-64 transform transition-transform duration-300',
        !isOpen && '-translate-x-full',
        'bg-white border-r border-gray-200',
        'dark:bg-gray-800 dark:border-gray-700',
        className
      )}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        {children}
      </div>
    </aside>
  );
}
