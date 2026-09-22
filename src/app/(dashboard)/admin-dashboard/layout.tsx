import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/layout/dashboard/dashboard-shell";
import { ReactNode } from "react";

const admin = "ADMIN"

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DashboardShell role={admin}>{children}</DashboardShell>
    </RoleGuard>
  );
}