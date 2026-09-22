"use client";

import {
  ChevronRight,
  LogOut,
  Package,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/admin.routes";
import type { UserRole } from "@/types";
import type { SidebarItems } from "@/types/sidebar.type";

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  ADMIN: adminRoutes,
};

const roleLabel = {
  ADMIN: "Administrator",
  SUPER_ADMIN: "Administrator",
  COURIER: "Employee",
  CUSTOMER: "User",
} as const;

type DashboardSidebarProps = {
  role: UserRole;
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const routes: SidebarItems = sidebarRoutes[role] ?? [];

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r border-border/60 bg-background/95 backdrop-blur-xl"
    >
      {/* ================= HEADER ================= */}

      <SidebarHeader className="border-b border-border/50 p-3">
        <Link
          href="/"
          className="group flex items-center gap-3 overflow-hidden rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-muted/60"
        >
          {/* Logo */}
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914] text-white shadow-lg shadow-[#e50914]/20 transition-transform duration-300 group-hover:scale-105">
            <Package className="size-5" strokeWidth={2} />
          </div>

          {/* Brand */}
          <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-bold tracking-tight">
              Swift
              <span className="text-[#e50914]">Courier</span>
            </span>

            <span className="truncate text-[10px] text-muted-foreground">
              Logistics Platform
            </span>
          </div>

          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-data-[collapsible=icon]:hidden" />
        </Link>
      </SidebarHeader>

      {/* ================= CONTENT ================= */}

      <SidebarContent className="px-2 py-4">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="mb-2">
            <SidebarGroupLabel className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 group-data-[collapsible=icon]:hidden">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.url ||
                    (item.url !== "/admin-dashboard" &&
                      pathname.startsWith(`${item.url}/`));

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className={`
                          relative mb-1 h-10 rounded-xl
                          transition-all duration-200
                          ${
                            isActive
                              ? "bg-[#e50914]/10 text-[#e50914] hover:bg-[#e50914]/15 hover:text-[#e50914]"
                              : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                          }
                        `}
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <span className="absolute left-0 h-5 w-0.5 rounded-full bg-[#e50914]" />
                        )}

                        <Icon
                          className={`
                            size-4 shrink-0
                            ${
                              isActive
                                ? "text-[#e50914]"
                                : "text-muted-foreground"
                            }
                          `}
                          strokeWidth={1.9}
                        />

                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ================= FOOTER ================= */}

      <SidebarFooter className="border-t border-border/50 p-2">
        {/* Secure Connection */}
        <div className="mb-2 flex items-center gap-2 rounded-xl border border-[#e50914]/10 bg-[#e50914]/5 px-3 py-2.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#e50914]/10">
            <ShieldCheck className="size-4 text-[#e50914]" />
          </div>

          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-[11px] font-medium">
              Secure connection
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />

              <span className="text-[10px] text-muted-foreground">
                Protected
              </span>
            </div>
          </div>
        </div>

        {/* User */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profile" className="h-11 rounded-xl">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <UserRound className="size-4" />
              </div>

              <div className="grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">
                  {`${role} Account`}
                </span>

                <span className="truncate text-[10px] text-muted-foreground">
                  {roleLabel[role as keyof typeof roleLabel] ?? "Guest"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="h-10 rounded-xl text-muted-foreground transition-colors hover:bg-[#e50914]/10 hover:text-[#e50914]"
            >
              <LogOut className="size-4" />

              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
