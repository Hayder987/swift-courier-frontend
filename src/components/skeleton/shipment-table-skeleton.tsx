"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SKELETON_ROWS = [
  "shipment-skeleton-1",
  "shipment-skeleton-2",
  "shipment-skeleton-3",
  "shipment-skeleton-4",
  "shipment-skeleton-5",
  "shipment-skeleton-6",
  "shipment-skeleton-7",
  "shipment-skeleton-8",
];

const ShipmentTableSkeleton = () => {
  return (
    <div className="w-full space-y-5">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-36 sm:w-44" />
            <Skeleton className="h-4 w-64 max-w-[70vw]" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-xl sm:w-40" />
      </div>

      {/* Filter Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-9 rounded-lg" />

            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>

          <Skeleton className="h-9 w-16 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Skeleton className="h-10 w-full rounded-xl lg:col-span-3 lg:col-start-4" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>

        <div className="mt-4">
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 sm:px-6">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-28" />
          </div>

          <Skeleton className="h-3 w-20" />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="min-w-65"></TableHead>

                <TableHead className="min-w-45"></TableHead>

                <TableHead></TableHead>

                <TableHead></TableHead>

                <TableHead className="hidden lg:table-cell"></TableHead>

                <TableHead className="hidden xl:table-cell"></TableHead>

                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {SKELETON_ROWS.map((rowKey) => (
                <TableRow key={rowKey} className="border-border/50">
                  {/* Shipment */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-10 shrink-0 rounded-xl" />

                      <div className="min-w-0 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Skeleton className="h-7 w-28 rounded-full" />
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    <Skeleton className="h-7 w-16 rounded-full" />
                  </TableCell>

                  {/* Route */}
                  <TableCell className="hidden lg:table-cell">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </TableCell>

                  {/* Fee */}
                  <TableCell className="hidden xl:table-cell">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      <Skeleton className="size-8 rounded-lg" />
                      <Skeleton className="size-8 rounded-lg" />
                      <Skeleton className="size-8 rounded-lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between border-t border-border/50 px-4 py-4 sm:px-6">
          <Skeleton className="h-4 w-24" />

          <div className="flex gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTableSkeleton;
