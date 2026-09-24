import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/layout/dashboard/sidebar/dashboard-shell";

const customer = "CUSTOMER";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["CUSTOMER"]}>
      <DashboardShell role={customer}>{children}</DashboardShell>
    </RoleGuard>
  );
}
