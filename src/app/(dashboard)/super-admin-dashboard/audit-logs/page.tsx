import { Suspense } from "react";
import AuditLogsTable from "@/components/layout/dashboard/super-admin/Audit/audit-log-table";
import AuditTableSkeleton from "@/components/skeleton/AuditTableSkeleton";

const GetAllAuditLogsPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<AuditTableSkeleton />}>
        <AuditLogsTable />
      </Suspense>
    </div>
  );
};

export default GetAllAuditLogsPage;
