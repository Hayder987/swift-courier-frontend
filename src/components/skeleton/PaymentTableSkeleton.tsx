import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const skeletonRowKeys = [
  "payment-skeleton-a",
  "payment-skeleton-b",
  "payment-skeleton-c",
  "payment-skeleton-d",
  "payment-skeleton-e",
  "payment-skeleton-f",
] as const;

const PaymentTableSkeleton = () => {
  return (
    <output
      className="block overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
      aria-label="Loading payment history"
    >
      {" "}
      <div className="flex items-center justify-between gap-4 border-b border-border/60 p-5 sm:px-6">
        {" "}
        <div className="space-y-2">
          {" "}
          <Skeleton className="h-5 w-36 rounded-md" />{" "}
          <Skeleton className="h-4 w-64 max-w-full rounded-md" />{" "}
        </div>
        <Skeleton className="h-7 w-20 rounded-lg" />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead />
              <TableHead />
              <TableHead />
              <TableHead />
              <TableHead />
              <TableHead />
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {skeletonRowKeys.map((rowKey) => (
              <TableRow key={rowKey}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 shrink-0 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-36 rounded-md" />
                      <Skeleton className="h-3 w-24 rounded-md" />
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-24 rounded-md" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-24 rounded-md" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-7 w-20 rounded-lg" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-28 rounded-md" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border/60 p-4 sm:px-6">
        <Skeleton className="h-4 w-32 rounded-md" />

        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      </div>
      <span className="sr-only">Loading payments...</span>
    </output>
  );
};

export default PaymentTableSkeleton;
