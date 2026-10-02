"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ShipmentFormSkeleton = () => {
  return (
    <div className="mx-auto grid max-w-380 gap-6 lg:grid-cols-[1fr_1.05fr]">
      {/* Map skeleton */}
      <div className="rounded-3xl border border-border/60 bg-card p-3 shadow-xl">
        <Skeleton className="min-h-130 w-full rounded-2xl" />
      </div>

      {/* Form skeleton */}
      <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-xl sm:p-8">
        <div className="space-y-7">
          <div className="space-y-3">
            <Skeleton className="size-13 rounded-2xl" />
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-30 w-full rounded-xl" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

          <Skeleton className="h-44 w-full rounded-2xl" />

          <Skeleton className="h-13 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ShipmentFormSkeleton;
