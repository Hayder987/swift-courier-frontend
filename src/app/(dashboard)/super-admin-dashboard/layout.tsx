import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/layout/dashboard/sidebar/dashboard-shell";

const superAdmin = "SUPER_ADMIN";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["SUPER_ADMIN"]}>
      <DashboardShell role={superAdmin}>{children}</DashboardShell>
    </RoleGuard>
  );
}
