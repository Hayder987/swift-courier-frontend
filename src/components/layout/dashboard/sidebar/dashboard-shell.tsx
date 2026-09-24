"use client";

import { Bell, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { UserRole } from "@/types";
import ThemeToggle from "../../public/Navbar/ThemeToggle";
import { DashboardSidebar } from "../dashboard-sidebar";
import NotificationSheet from "../notification/NotificationSheet";

type DashboardShellProps = {
  children: ReactNode;
  role: UserRole;
};

export default function DashboardShell({
  children,
  role,
}: DashboardShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <DashboardSidebar role={role} />

      <SidebarInset className="min-w-0 bg-background">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl sm:px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 rounded-lg" />

            <Separator
              orientation="vertical"
              className="mr-1 hidden h-5 sm:block"
            />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Admin Dashboard</p>

              <p className="text-[11px] text-muted-foreground">
                SwiftCourier management platform
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle />
            <NotificationSheet />
          </div>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
