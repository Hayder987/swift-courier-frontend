import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/layout/dashboard/dashboard-shell";

const courier = "COURIER";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["COURIER"]}>
      <DashboardShell role={courier}>{children}</DashboardShell>
    </RoleGuard>
  );
}
