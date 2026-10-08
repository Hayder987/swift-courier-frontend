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
  "payroll-skeleton-8",
];

export default function PayrollTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-60"></TableHead>
              <TableHead className="min-w-32"></TableHead>
              <TableHead className="min-w-40"></TableHead>
              <TableHead className="min-w-32"></TableHead>
              <TableHead className="min-w-28"></TableHead>
              <TableHead className="min-w-28"></TableHead>
              <TableHead className="min-w-36"></TableHead>
              <TableHead className="w-28 text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {skeletonRows.map((rowId) => (
              <TableRow key={rowId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 shrink-0 rounded-full" />

                    <div className="min-w-0 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>

                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="h-7 w-20 rounded-full" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Skeleton className="size-9 rounded-lg" />
                    <Skeleton className="size-9 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
