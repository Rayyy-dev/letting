import { Menu } from 'lucide-react';
import { useSidebar } from './sidebar-context';
import { twMerge } from 'tailwind-merge';

interface ToggleButtonProps {
  className?: string;
}

export function ToggleButton({ className }: ToggleButtonProps) {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      type="button"
      className={twMerge(
        'inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-gray-200',
        'dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600',
        className
      )}
    >
      <Menu className="w-6 h-6" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
} 