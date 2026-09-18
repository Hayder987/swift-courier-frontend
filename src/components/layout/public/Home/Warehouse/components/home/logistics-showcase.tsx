"use client";

import { Boxes, MapPin, PackageCheck, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import CourierWarehouseScene from "../../courier-warehouse-scene";

export default function LogisticsShowcase() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/5 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-380 px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <Badge
            variant="outline"
            className="mb-5 rounded-full border-[#e50914]/25 bg-[#e50914]/5 px-3 py-1.5 text-[#e50914]"
          >
            <Truck className="mr-1.5 size-3.5" />
            LOGISTICS IN MOTION
          </Badge>

          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            Your Delivery Is{" "}
            <span className="text-[#e50914]">Always Moving.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            From warehouse operations to the final doorstep, SwiftCourier keeps
            every parcel moving through a smarter and more visible logistics
            network.
          </p>
        </div>

        {/* Main showcase */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
          {/* Three.js scene */}
          <CourierWarehouseScene />

          {/* Content */}
          <div className="space-y-5">
            <div className="group rounded-3xl border border-border/50 bg-background/40 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#e50914]/30 hover:shadow-[0_20px_60px_-30px_rgba(229,9,20,0.3)] sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/5 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/10">
                <Boxes className="size-5" />
              </div>

              <h3 className="text-lg font-bold text-foreground">
                Smart Warehouse
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Organize, process and prepare parcels with a streamlined
                warehouse workflow.
              </p>
            </div>

            <div className="group rounded-3xl border border-border/50 bg-background/40 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#e50914]/30 hover:shadow-[0_20px_60px_-30px_rgba(229,9,20,0.3)] sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/5 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/10">
                <MapPin className="size-5" />
              </div>

              <h3 className="text-lg font-bold text-foreground">
                Live Tracking
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Follow shipment movement with transparent tracking from pickup
                to delivery.
              </p>
            </div>

            <div className="group rounded-3xl border border-border/50 bg-background/40 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#e50914]/30 hover:shadow-[0_20px_60px_-30px_rgba(229,9,20,0.3)] sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/5 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/10">
                <PackageCheck className="size-5" />
              </div>

              <h3 className="text-lg font-bold text-foreground">
                Doorstep Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A connected delivery flow designed around speed, visibility and
                reliability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
