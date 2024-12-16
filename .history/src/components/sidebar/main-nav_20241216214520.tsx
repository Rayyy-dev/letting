"use client"

import * as React from "react"
import { Building2, Settings, AlertCircle, LogOut, Calendar, FileText, Library, Users, Contact2, ChevronDown } from 'lucide-react'

import { cn } from "../../lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

interface INavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  hasDropdown?: boolean;
}

const mainNavItems: INavItem[] = [
  {
    title: "Hand Off",
    href: "/hand-off",
    icon: FileText,
  },
  {
    title: "Felicity Activity",
    href: "/activity",
    icon: Calendar,
  },
  {
    title: "Letting",
    href: "/letting",
    icon: Building2,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Knowledge Base",
    href: "/knowledge",
    icon: Library,
  },
  {
    title: "Properties",
    href: "/properties",
    icon: FileText,
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: Contact2,
    hasDropdown: true,
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
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

export const MainNav = () => {
  const [activePath, setActivePath] = React.useState('/letting');

  const handleNavClick = (href: string) => {
    setActivePath(href);
  };

  return (
    <div className="flex h-full flex-col">
      <Sidebar>
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-2 px-2">
            <img
              src="/logo.png"
              alt="LightWork"
              className="h-8"
            />
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={activePath === item.href}
                  onClick={() => handleNavClick(item.href)}
                >
                  <div className="flex items-center w-full py-2 px-2 rounded-md hover:bg-gray-100">
                    <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="flex-1 text-sm text-gray-700">{item.title}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto border-t px-2 py-2">
          <SidebarMenu>
            {footerNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  onClick={() => handleNavClick(item.href)}
                >
                  <div className="flex items-center w-full py-2 px-2 rounded-md hover:bg-gray-100">
                    <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="flex-1 text-sm text-gray-700">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

MainNav.displayName = 'MainNav';

