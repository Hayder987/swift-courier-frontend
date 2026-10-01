"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const SKELETON_ROWS = [
  "employee-skeleton-1",
  "employee-skeleton-2",
  "employee-skeleton-3",
  "employee-skeleton-4",
  "employee-skeleton-5",
  "employee-skeleton-6",
];

const EmployeeTableSkeleton = () => {
  return (
    <>
      {SKELETON_ROWS.map((skeletonId) => (
        <TableRow key={skeletonId}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-xl" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-36 rounded-md" />
              </div>
            </div>
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-20 rounded-md" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-20 rounded-md" />
          </TableCell>

          <TableCell>
            <div className="flex justify-end gap-2">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default EmployeeTableSkeleton;
