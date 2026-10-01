"use client";

import { Skeleton } from "@/components/ui/skeleton";

const FILTER_SKELETON_IDS = [
  "filter-skeleton-1",
  "filter-skeleton-2",
  "filter-skeleton-3",
  "filter-skeleton-4",
];

const EMPLOYEE_ROW_SKELETON_IDS = [
  "employee-row-skeleton-1",
  "employee-row-skeleton-2",
  "employee-row-skeleton-3",
  "employee-row-skeleton-4",
  "employee-row-skeleton-5",
  "employee-row-skeleton-6",
];

const AllEmployeeTableSkeleton = () => {
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-xl" />

        <div className="space-y-2">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-3 w-52 rounded-md" />
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FILTER_SKELETON_IDS.map((skeletonId) => (
            <Skeleton key={skeletonId} className="h-10 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              <AllEmployeeRowsSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AllEmployeeRowsSkeleton = () => {
  return (
    <>
      {EMPLOYEE_ROW_SKELETON_IDS.map((skeletonId) => (
        <tr key={skeletonId} className="border-b border-border/50">
          <td className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-xl" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          </td>

          <td className="p-4">
            <Skeleton className="h-5 w-20" />
          </td>

          <td className="p-4">
            <Skeleton className="h-5 w-16 rounded-full" />
          </td>

          <td className="p-4">
            <Skeleton className="h-5 w-20 rounded-full" />
          </td>

          <td className="p-4">
            <Skeleton className="h-8 w-16" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default AllEmployeeTableSkeleton;
