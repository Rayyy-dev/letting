import { Menu } from 'lucide-react';
import { useSidebar } from './sidebar-context';
import { twMerge } from 'tailwind-merge';

interface IToggleButtonProps {
  className?: string;
}

export function ToggleButton({ className }: IToggleButtonProps) {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      type="button"
      className={twMerge(
        'inline-flex items-center justify-center rounded-md p-2',
        'text-gray-500 hover:bg-gray-100 hover:text-gray-600',
        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary',
        'dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300',
        className
      )}
      aria-controls="sidebar"
      aria-expanded="false"
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Open sidebar</span>
    </button>
  );
} 