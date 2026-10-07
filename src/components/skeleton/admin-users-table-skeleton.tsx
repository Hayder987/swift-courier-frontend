"use client";

import { UsersRound } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminUsersTableSkeletonProps {
  rows?: number;
}

const AdminUsersTableSkeleton = ({
  rows = 10,
}: AdminUsersTableSkeletonProps) => {
  const skeletonRows = Array.from(
    { length: rows },
    (_, index) => `skeleton-${index + 1}`,
  );

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
            <UsersRound className="size-5" />
          </div>

          <div className="space-y-2">
            <div className="h-6 w-44 animate-pulse rounded-md bg-muted" />
            <div className="h-3 w-64 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="hidden h-14 w-32 animate-pulse rounded-xl bg-muted md:block" />
      </div>

      {/* Filter */}
      <div className="flex justify-end">
        <div className="h-10 w-24 animate-pulse rounded-xl bg-muted" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm">
        <div className="border-b border-border/50 px-4 py-4 sm:px-6">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-65"></TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="hidden md:table-cell"></TableHead>
                <TableHead className="hidden lg:table-cell"></TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {skeletonRows.map((skeletonId) => (
                <TableRow key={skeletonId} className="border-border/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-11 animate-pulse rounded-xl bg-muted" />

                      <div className="space-y-2">
                        <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-40 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                  </TableCell>

                  <TableCell>
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-2">
                      <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                      <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
                    </div>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>

                  <TableCell>
                    <div className="ml-auto size-8 animate-pulse rounded-lg bg-muted" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-border/60 px-5 py-4">
          <div className="flex justify-between">
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            <div className="h-8 w-44 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTableSkeleton;
