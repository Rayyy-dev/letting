import * as React from "react"
import { cn } from "@/lib/utils"
import { ISidebarProps, ISidebarHeaderProps, ISidebarContentProps, ISidebarFooterProps, ISidebarMenuProps, ISidebarMenuItemProps, ISidebarMenuButtonProps } from "./types"

export function Sidebar({ className, children, ...props }: ISidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen w-[250px] flex-col border-r bg-background",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, ...props }: ISidebarHeaderProps) {
  return <div className={cn("", className)} {...props} />
}

export function SidebarContent({ className, ...props }: ISidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: ISidebarFooterProps) {
  return <div className={cn("mt-auto", className)} {...props} />
}

export function SidebarMenu({ className, ...props }: ISidebarMenuProps) {
  return <nav className={cn("px-4 py-2", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: ISidebarMenuItemProps) {
  return <div className={cn("mb-1", className)} {...props} />
}

export function SidebarMenuButton({ 
  className,
  isActive,
  tooltip,
  asChild = false,
  ...props 
}: ISidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    />
  )
} 