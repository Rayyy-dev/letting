import * as React from 'react';
import { Settings, AlertCircle, LogOut, Building2 } from 'lucide-react';
import { ISidebarProps } from './sidebar-types';
import { useSidebar } from './sidebar-context';
import { twMerge } from 'tailwind-merge';

const SIDEBAR_WIDTH = '240px';
const COLLAPSED_WIDTH = '64px';

interface INavItem {
  title: string;
  icon: React.ElementType;
  onClick: () => void;
}

export const Sidebar = React.forwardRef<HTMLDivElement, ISidebarProps>(
  ({ defaultOpen = true, children, className, ...props }, ref) => {
    const { state, open, isMobile, openMobile } = useSidebar();
    const isCollapsed = state === 'collapsed';
    const width = isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH;
    const isVisible = isMobile ? openMobile : open;

    const mainNavItems: INavItem[] = React.useMemo(() => [
      {
        title: "Letting",
        icon: Building2,
        onClick: () => console.log("Letting clicked")
      }
    ], []);

    const footerNavItems: INavItem[] = React.useMemo(() => [
      {
        title: "Settings",
        icon: Settings,
        onClick: () => console.log("Settings clicked")
      },
      {
        title: "Report",
        icon: AlertCircle,
        onClick: () => console.log("Report clicked")
      },
      {
        title: "Log Out",
        icon: LogOut,
        onClick: () => console.log("Logout clicked")
      }
    ], []);

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          "fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300",
          isMobile && "shadow-xl",
          className
        )}
        style={{ width }}
        {...props}
      >
        {/* Logo */}
        <div className="p-4 border-b">
          <img 
            src="/logo.png" 
            alt="LightWork" 
            className={twMerge(
              "h-8 transition-all duration-300",
              isCollapsed && "scale-75"
            )} 
          />
        </div>

        {/* Main Navigation */}
        <nav className="p-2">
          {mainNavItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="flex items-center w-full p-2 rounded-md hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>{item.title}</span>}
            </button>
          ))}
        </nav>

        {/* Footer Navigation */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t">
          {footerNavItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="flex items-center w-full p-2 rounded-md hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>{item.title}</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';
