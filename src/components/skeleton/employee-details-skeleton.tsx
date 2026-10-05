"use client";

import { Skeleton } from "@/components/ui/skeleton";

const EmployeeDetailsSkeleton = () => {
  return (
    <div className="space-y-6 px-4 pb-28 pt-5 sm:px-6">
      {/* Applicant hero */}
      <div className="overflow-hidden rounded-3xl border border-border/60 p-5">
        <div className="flex items-center gap-4">
          <Skeleton className="size-16 shrink-0 rounded-2xl sm:size-18" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-40 max-w-full rounded-md" />

            <Skeleton className="h-3.5 w-56 max-w-full rounded-md" />

            <Skeleton className="h-3 w-32 rounded-md" />
          </div>
        </div>
      </div>

      {/* Application overview */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-40 rounded-md" />

        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
        </div>
      </section>

      {/* Personal */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-36 rounded-md" />

        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
        </div>
      </section>

      {/* Courier */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-36 rounded-md" />

        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
          <Skeleton className="h-17 rounded-2xl" />
        </div>
      </section>

      {/* Zone */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-28 rounded-md" />

        <Skeleton className="h-32 rounded-2xl" />
      </section>

      {/* Resume */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-24 rounded-md" />

        <Skeleton className="h-80 rounded-2xl" />
      </section>

      {/* Documents */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-40 rounded-md" />

        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="aspect-16/10 rounded-2xl" />
          <Skeleton className="aspect-16/10 rounded-2xl" />
        </div>
      </section>
    </div>
  );
};

export default EmployeeDetailsSkeleton;
