"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Contact2, FileText, HandMetal, Home, Library, LogOut, Settings, Users, AlertCircle, Building2 } from 'lucide-react'

import { cn } from """"""
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "/ui/sidebar"

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

export function MainNav() {
  const pathname = usePathname()
  const [activePath, setActivePath] = React.useState('/letting');

  const handleNavClick = (href: string) => {
    setActivePath(href);
  };

  return (
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
      <SidebarContent>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                onClick={() => handleNavClick(item.href)}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {footerNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                onClick={() => handleNavClick(item.href)}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

