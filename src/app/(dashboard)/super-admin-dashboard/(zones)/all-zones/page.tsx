import { Suspense } from "react";
import AdminZoneTable from "@/components/layout/dashboard/admin/zones/admin-zone-table";
import AdminZoneTableSkeleton from "@/components/skeleton/AdminZoneTableSkeleton";

const AllZonePage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<AdminZoneTableSkeleton />}>
        <AdminZoneTable />
      </Suspense>
    </div>
  );
};

export default AllZonePage;
