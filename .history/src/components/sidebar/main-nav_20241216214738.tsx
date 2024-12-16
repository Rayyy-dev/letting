"use client"

import * as React from "react"
import { Building2, Settings, AlertCircle, LogOut } from 'lucide-react'
import { NavItem } from './nav-item'

const mainNavItems = [
  {
    title: "Letting",
    icon: Building2,
    onClick: () => console.log("Letting clicked")
  }
];

const footerNavItems = [
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
];

export function MainNav() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="mb-5 px-3 py-4">
          <img src="/logo.png" alt="LightWork" className="h-8" />
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1 px-3">
          {mainNavItems.map((item) => (
            <NavItem key={item.title} {...item} />
          ))}
        </nav>
      </div>

      {/* Footer Navigation */}
      <nav className="space-y-1 border-t px-3 py-4">
        {footerNavItems.map((item) => (
          <NavItem key={item.title} {...item} />
        ))}
      </nav>
    </div>
  );
}

MainNav.displayName = 'MainNav';

