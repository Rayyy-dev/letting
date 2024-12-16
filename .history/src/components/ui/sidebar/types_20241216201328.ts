import { HTMLAttributes } from "react"

export interface ISidebarProps extends HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

export interface ISidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface ISidebarContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface ISidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}

export interface ISidebarMenuProps extends HTMLAttributes<HTMLDivElement> {}

export interface ISidebarMenuItemProps extends HTMLAttributes<HTMLLIElement> {}

export interface ISidebarMenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  tooltip?: string
  asChild?: boolean
} 