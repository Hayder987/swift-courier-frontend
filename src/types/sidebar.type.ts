import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  icon : LucideIcon;
  url: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export type SidebarItems = SidebarGroup[];
