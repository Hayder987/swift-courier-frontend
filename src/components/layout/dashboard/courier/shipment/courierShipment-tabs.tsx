"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useState } from "react";
import CourierShipmentTable from "./courierShipment-table";
import ShipmentTableSkeleton from "@/components/skeleton/shipment-table-skeleton";

const CourierShipmentTabs = () => {
  const [tab, setTab] = useState<"pickup" | "delivery">("pickup");

  return (
    <div>
      <div className="py-4 flex justify-end">
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            <TabsTrigger key={"pickup"} value={"pickup"}>
              Pickup
            </TabsTrigger>
            <TabsTrigger key={"delivery"} value={"delivery"}>
              Delivery
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* table */}
      <Suspense fallback={<ShipmentTableSkeleton />}>
        <CourierShipmentTable type={tab} />
      </Suspense>
    </div>
  );
};

export default CourierShipmentTabs;
