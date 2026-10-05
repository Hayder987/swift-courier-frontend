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
  "zone-skeleton-1",
  "zone-skeleton-2",
  "zone-skeleton-3",
  "zone-skeleton-4",
  "zone-skeleton-5",
  "zone-skeleton-6",
] as const;

const AdminZoneTableSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-4 sm:px-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>

        <Skeleton className="h-3 w-16" />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60">
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead className="hidden md:table-cell">
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead className="hidden lg:table-cell">
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead className="text-right">
                <Skeleton className="ml-auto h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {SKELETON_ROWS.map((rowId) => (
              <TableRow key={rowId} className="border-border/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-xl" />

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-4 w-20" />
                </TableCell>

                <TableCell className="hidden lg:table-cell">
                  <Skeleton className="h-4 w-24" />
                </TableCell>

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

      <div className="border-t border-border/60 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />

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

export default AdminZoneTableSkeleton;
