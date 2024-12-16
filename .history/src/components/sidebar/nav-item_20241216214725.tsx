import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface NavItemProps {
  icon: ElementType;
  title: string;
  onClick: () => void;
  className?: string;
}

export function NavItem({ icon: Icon, title, onClick, className }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100',
        'dark:text-white dark:hover:bg-gray-700',
        className
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="ml-3 flex-1 whitespace-nowrap">{title}</span>
    </button>
  );
} 