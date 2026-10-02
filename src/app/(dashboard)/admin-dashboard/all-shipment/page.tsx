import { Suspense } from "react";
import AdminShipmentTable from "@/components/layout/dashboard/admin/shipment/admin-shipment-table";
import AdminShipmentTableSkeleton from "@/components/skeleton/admin-shipment-table-skeleton";

const AllShipmentPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<AdminShipmentTableSkeleton />}>
        <AdminShipmentTable />
      </Suspense>
    </div>
  );
};

export default AllShipmentPage;
