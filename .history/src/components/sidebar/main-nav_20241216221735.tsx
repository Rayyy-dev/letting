"use client"

import * as React from "react"
import { Settings, AlertCircle, LogOut, Building2 } from 'lucide-react'
import { useSidebar } from "./sidebar-context"
import { cn } from "../../lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

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
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full flex-col">
        <nav 
          className={cn(
            "flex flex-col h-full bg-white border-r transition-all duration-300 ease-in-out",
            isCollapsed ? "w-[64px]" : "w-[240px]"
          )}
        >
          {/* Logo */}
          <div className="p-4 border-b flex items-center">
            <div className={cn(
              "flex items-center gap-2 text-primary transition-all duration-300",
              isCollapsed && "scale-75 -ml-2"
            )}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              {!isCollapsed && (
                <span className="font-semibold text-lg">LightWork</span>
              )}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-auto py-2">
            {mainNavItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 gap-3 hover:bg-gray-100/80 transition-colors text-gray-700",
                      activePath === item.href && "bg-black text-white hover:bg-black/90",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 shrink-0",
                      activePath === item.href ? "text-white" : "text-gray-500"
                    )} />
                    {!isCollapsed && (
                      <span className="flex-1 text-sm font-medium text-left">
                        {item.title}
                      </span>
                    )}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="font-medium">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="border-t">
            {footerNavItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 gap-3 hover:bg-gray-100/80 transition-colors text-gray-700",
                      activePath === item.href && "bg-black text-white hover:bg-black/90",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 shrink-0",
                      activePath === item.href ? "text-white" : "text-gray-500"
                    )} />
                    {!isCollapsed && (
                      <span className="flex-1 text-sm font-medium text-left">{item.title}</span>
                    )}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="font-medium">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
};

MainNav.displayName = 'MainNav';

