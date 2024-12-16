"use client"

import * as React from "react"
import { Building2, Settings, AlertCircle, LogOut } from 'lucide-react'
import { useSidebar } from "./sidebar-context"

interface INavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const mainNavItems: INavItem[] = [
  {
    title: "Letting",
    href: "/letting",
    icon: Building2,
  }
];

const footerNavItems: INavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Report",
    href: "/report",
    icon: AlertCircle,
  },
  {
    title: "Log Out",
    href: "/logout",
    icon: LogOut,
  },
];

export const MainNav: React.FC = () => {
  const { state, toggleSidebar } = useSidebar();
  const [activePath, setActivePath] = React.useState('/letting');
  const isCollapsed = state === 'collapsed';

  const handleNavClick = (href: string) => {
    setActivePath(href);
  };

  return (
    <div className="flex h-full flex-col">
      <nav className="flex flex-col h-full bg-white border-r">
        {/* Logo */}
        <div className="p-4 border-b">
          <img 
            src="/logo.png" 
            alt="LightWork" 
            className="h-8 transition-all duration-300" 
          />
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-auto py-2">
          {mainNavItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="flex items-center w-full p-2 gap-2 hover:bg-gray-100 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-4 w-4" />
              </div>
              {!isCollapsed && (
                <span className="flex-1 font-medium">{item.title}</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="border-t p-2">
          {footerNavItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="flex items-center w-full p-2 gap-2 hover:bg-gray-100 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground">
                <item.icon className="h-4 w-4" />
              </div>
              {!isCollapsed && (
                <span className="flex-1 font-medium">{item.title}</span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

MainNav.displayName = 'MainNav';

