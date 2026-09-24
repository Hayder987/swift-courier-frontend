import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/layout/dashboard/dashboard-shell";

const admin = "CUSTOMER";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["CUSTOMER"]}>
      <DashboardShell role={admin}>{children}</DashboardShell>
    </RoleGuard>
  );
}
