import { ReactNode } from 'react';

export interface ISidebarProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export type TSidebarState = 'expanded' | 'collapsed';

export interface ISidebarContext {
  state: TSidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggle: () => void;
}