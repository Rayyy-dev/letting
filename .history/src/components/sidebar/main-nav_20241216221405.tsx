"use client"

import * as React from "react"
import { Home, Settings, AlertCircle, LogOut } from 'lucide-react'
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
    icon: Home,
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
          <div className="p-4 border-b flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="LightWork" 
              className={cn(
                "transition-all duration-300",
                isCollapsed ? "h-6" : "h-8"
              )} 
            />
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-auto py-2">
            {mainNavItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "flex items-center w-full p-2 gap-2 hover:bg-gray-100 transition-colors",
                      activePath === item.href && "bg-gray-100",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center rounded-lg",
                      activePath === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      isCollapsed ? "h-10 w-10" : "h-8 w-8"
                    )}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    {!isCollapsed && (
                      <span className="flex-1 font-medium">{item.title}</span>
                    )}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="border-t p-2">
            {footerNavItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "flex items-center w-full p-2 gap-2 hover:bg-gray-100 transition-colors",
                      activePath === item.href && "bg-gray-100",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center rounded-lg",
                      activePath === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      isCollapsed ? "h-10 w-10" : "h-8 w-8"
                    )}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    {!isCollapsed && (
                      <span className="flex-1 font-medium">{item.title}</span>
                    )}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
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

