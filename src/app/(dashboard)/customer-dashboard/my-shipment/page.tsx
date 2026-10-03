import { Suspense } from "react";
import MyShipmentTable from "@/components/layout/dashboard/customer/shipment/my-shipment/myShipment-table";
import ShipmentTableSkeleton from "@/components/skeleton/shipment-table-skeleton";

const MyShipmentPage = () => {
  return (
    <div className="">
      <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<ShipmentTableSkeleton />}>
          <MyShipmentTable />
        </Suspense>
      </div>
    </div>
  );
};

export default MyShipmentPage;
