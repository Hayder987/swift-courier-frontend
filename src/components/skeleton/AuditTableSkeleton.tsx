"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const SKELETON_KEYS = [
  "audit-row-1",
  "audit-row-2",
  "audit-row-3",
  "audit-row-4",
  "audit-row-5",
  "audit-row-6",
  "audit-row-7",
  "audit-row-8",
  "audit-row-9",
  "audit-row-10",
];

const AuditTableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          {SKELETON_KEYS.map((key) => (
            <TableRow key={key}>
              {/* Activity */}
              <TableCell className="min-w-64">
                <div className="flex items-start gap-3">
                  <Skeleton className="size-9 shrink-0 rounded-xl" />

                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-36 rounded-md" />
                    <Skeleton className="h-3 w-48 rounded-md" />
                  </div>
                </div>
              </TableCell>

              {/* User */}
              <TableCell className="min-w-48">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="size-8 rounded-lg" />

                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24 rounded-md" />
                    <Skeleton className="h-2.5 w-32 rounded-md" />
                  </div>
                </div>
              </TableCell>

              {/* Action */}
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>

              {/* Resource */}
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>

              {/* Type */}
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>

              {/* Date */}
              <TableCell className="hidden xl:table-cell">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-32 rounded-md" />
                  <Skeleton className="h-2.5 w-24 rounded-md" />
                </div>
              </TableCell>

              {/* Action */}
              <TableCell>
                <div className="flex justify-end">
                  <Skeleton className="size-8 rounded-lg" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditTableSkeleton;
