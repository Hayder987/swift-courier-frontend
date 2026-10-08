import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const skeletonRows = [
  "payroll-skeleton-1",
  "payroll-skeleton-2",
  "payroll-skeleton-3",
  "payroll-skeleton-4",
  "payroll-skeleton-5",
  "payroll-skeleton-6",
  "payroll-skeleton-7",
  "payroll-skeleton-9",
  "payroll-skeleton-10",
  "payroll-skeleton-11",
];

const skeletonHeader = [
  "employee",
  "period",
  "gross",
  "deduction",
  "net",
  "status",
  "paid",
  "action",
];

function SkeletonLine({ className }: { className?: string }) {
  return (
    <Skeleton
      className={`relative overflow-hidden bg-muted/70 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-background/70 before:to-transparent ${className ?? ""}`}
    />
  );
}

export default function PayrollTableSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
      <div className="border-b border-border/50 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <SkeletonLine className="h-5 w-40 rounded-md" />
            <SkeletonLine className="h-3 w-64 max-w-full rounded-md" />
          </div>

          <SkeletonLine className="h-9 w-28 rounded-xl" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 bg-muted/25 hover:bg-muted/25">
              {skeletonHeader.map((header) => (
                <TableHead
                  key={header}
                  className={
                    header === "employee"
                      ? "min-w-64"
                      : header === "period"
                        ? "min-w-32"
                        : header === "gross"
                          ? "min-w-32"
                          : header === "deduction"
                            ? "min-w-32 lg:table-cell"
                            : header === "net"
                              ? "min-w-32"
                              : header === "status"
                                ? "min-w-28"
                                : header === "paid"
                                  ? "min-w-32"
                                  : "w-28 text-right"
                  }
                >
                  <SkeletonLine
                    className={
                      header === "employee"
                        ? "h-3 w-16"
                        : header === "period"
                          ? "h-3 w-14"
                          : header === "gross"
                            ? "h-3 w-12"
                            : header === "deduction"
                              ? "h-3 w-16"
                              : header === "net"
                                ? "h-3 w-20"
                                : header === "status"
                                  ? "h-3 w-14"
                                  : header === "paid"
                                    ? "h-3 w-12"
                                    : "ml-auto h-3 w-14"
                    }
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {skeletonRows.map((rowId, rowIndex) => (
              <TableRow
                key={rowId}
                className="border-border/50 hover:bg-transparent"
              >
                <TableCell className="py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <SkeletonLine className="size-10 shrink-0 rounded-full" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <SkeletonLine
                        className={`h-4 rounded-md ${
                          rowIndex % 2 === 0 ? "w-36" : "w-28"
                        }`}
                      />
                      <SkeletonLine className="h-3 w-24 rounded-md" />
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4">
                  <div className="space-y-2">
                    <SkeletonLine className="h-4 w-20 rounded-md" />
                    <SkeletonLine className="h-3 w-12 rounded-md" />
                  </div>
                </TableCell>

                <TableCell className="py-4">
                  <div className="space-y-2">
                    <SkeletonLine className="h-4 w-24 rounded-md" />
                    <SkeletonLine className="h-3 w-20 rounded-md" />
                  </div>
                </TableCell>

                <TableCell className="hidden py-4 lg:table-cell">
                  <SkeletonLine className="h-4 w-20 rounded-md" />
                </TableCell>

                <TableCell className="py-4">
                  <div className="space-y-2">
                    <SkeletonLine className="h-5 w-24 rounded-md" />
                    <SkeletonLine className="h-3 w-16 rounded-md" />
                  </div>
                </TableCell>

                <TableCell className="py-4">
                  <SkeletonLine className="h-7 w-20 rounded-full" />
                </TableCell>

                <TableCell className="py-4">
                  <SkeletonLine className="h-4 w-24 rounded-md" />
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex justify-end gap-2">
                    <SkeletonLine className="size-9 rounded-xl" />
                    <SkeletonLine className="size-9 rounded-xl" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 border-t border-border/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <SkeletonLine className="h-3 w-32 rounded-md" />

        <div className="flex items-center gap-2">
          <SkeletonLine className="size-8 rounded-lg" />
          <SkeletonLine className="size-8 rounded-lg" />
          <SkeletonLine className="size-8 rounded-lg" />
          <SkeletonLine className="size-8 rounded-lg" />
          <SkeletonLine className="size-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
