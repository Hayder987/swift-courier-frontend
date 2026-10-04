"use client";

import { Suspense, useState } from "react";

import ShipmentTableSkeleton from "@/components/skeleton/shipment-table-skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CourierShipmentTable from "./courierShipment-table";

const CourierShipmentTabs = () => {
  const [tab, setTab] = useState<"pickup" | "delivery">("pickup");

  return (
    <div>
      <div className="flex justify-end py-4">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "pickup" | "delivery")}
        >
          <TabsList className="relative h-11 gap-1.5 rounded-2xl border border-black/5 bg-slate-100/80 p-1.5 shadow-inner backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/80">
            <TabsTrigger
              value="pickup"
              className="relative h-8 min-w-[110px] rounded-xl px-5 text-xs font-semibold tracking-wide text-zinc-500 transition-all duration-300 ease-out hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white data-[state=active]:!bg-[#e50914] data-[state=active]:!text-white data-[state=active]:shadow-[0_4px_20px_rgba(229,9,20,0.45)]"
            >
              Pickup
            </TabsTrigger>

            <TabsTrigger
              value="delivery"
              className="relative h-8 min-w-[110px] rounded-xl px-5 text-xs font-semibold tracking-wide text-zinc-500 transition-all duration-300 ease-out hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white data-[state=active]:!bg-[#e50914] data-[state=active]:!text-white data-[state=active]:shadow-[0_4px_20px_rgba(229,9,20,0.45)]"
            >
              Delivery
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<ShipmentTableSkeleton />}>
        <CourierShipmentTable type={tab} />
      </Suspense>
    </div>
  );
};

export default CourierShipmentTabs;
