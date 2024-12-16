"use client"

import * as React from "react"
import { Building2, Settings, AlertCircle, LogOut, ChevronsUpDown } from 'lucide-react'

import { cn } from "../../lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
} from "../ui/sidebar"

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

export const MainNav = () => {
  const [activePath, setActivePath] = React.useState('/letting');

  const handleNavClick = (href: string) => {
    setActivePath(href);
  };

  return (
    <div className="flex h-full flex-col">
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-2 px-2">
            <img
              src="/logo.png"
              alt="LightWork"
              className="h-8"
            />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={activePath === item.href}
                    tooltip={item.title}
                    onClick={() => handleNavClick(item.href)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="flex-1 font-medium">{item.title}</span>
                      <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mt-auto border-t">
          <SidebarMenu>
            {footerNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  onClick={() => handleNavClick(item.href)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 font-medium">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
};

MainNav.displayName = 'MainNav';

