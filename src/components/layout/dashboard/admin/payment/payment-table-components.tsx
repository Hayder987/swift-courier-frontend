"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IPayment } from "@/types/payment.type";

interface PaymentTableComponentProps {
  payments: IPayment[];
  onViewDetails: (payment: IPayment) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const currencyFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-BD", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const statusStyles: Record<IPayment["status"], string> = {
  PAID: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  PENDING:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  FAILED: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
  CANCELLED: "border-muted bg-muted text-muted-foreground",
};

const methodLabels: Record<IPayment["method"], string> = {
  CARD: "Card",
  BKASH: "bKash",
  BANK: "Bank transfer",
};

const PaymentTableComponent = ({
  payments,
  onViewDetails,
  currentPage,
  pageSize,
  onPageChange,
}: PaymentTableComponentProps) => {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = payments.length === pageSize;

  return (
    <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60 px-4 py-5 sm:px-6">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            All Transactions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Review payment records and shipment information.
          </p>
        </div>

        <Badge variant="secondary" className="shrink-0 rounded-lg">
          {payments.length} records
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        {payments.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted">
              <Package className="size-7 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No payments found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              No transactions match your current filters. Try resetting the
              filters or selecting another date range.
            </p>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="min-w-64 pl-5">Transaction</TableHead>
                    <TableHead className="min-w-48">Shipment</TableHead>
                    <TableHead className="min-w-36">Payment method</TableHead>
                    <TableHead className="min-w-36">Amount</TableHead>
                    <TableHead className="min-w-32">Status</TableHead>
                    <TableHead className="min-w-44">Created at</TableHead>
                    <TableHead className="min-w-28 pr-5 text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {payments.map((payment) => (
                    <TableRow
                      key={payment.id}
                      className="group transition-colors"
                    >
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ArrowUpRight className="size-4" />
                          </div>
                          <div className="min-w-0 space-y-1">
                            <p className="max-w-52 truncate font-medium">
                              {payment.transactionId ??
                                payment.sessionId ??
                                payment.id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {payment.provider}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="max-w-48 space-y-1">
                          <p className="truncate font-medium">
                            {payment.shipment.parcelName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {payment.shipment.pickupZone.code}
                            {" → "}
                            {payment.shipment.deliveryZone.code}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <ArrowUpRight className="size-4 text-muted-foreground" />
                          </div>
                          <span className="text-sm">
                            {methodLabels[payment.method]}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="font-semibold tabular-nums">
                          {currencyFormatter.format(
                            Number(payment.amount) || 0,
                          )}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {payment.provider}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-lg px-2.5 py-1 font-medium ${statusStyles[payment.status]}`}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <p className="text-sm">
                          {dateFormatter.format(new Date(payment.createdAt))}
                        </p>
                        {payment.paidAt && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Paid{" "}
                            {dateFormatter.format(new Date(payment.paidAt))}
                          </p>
                        )}
                      </TableCell>

                      <TableCell className="pr-5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 rounded-lg"
                          onClick={() => onViewDetails(payment)}
                        >
                          <Eye className="size-4" />
                          <span className="hidden lg:inline">Details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-3 border-t border-border/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-muted-foreground">
                Page{" "}
                <span className="font-medium text-foreground">
                  {currentPage}
                </span>
                {" · "}
                Showing {payments.length} record
                {payments.length === 1 ? "" : "s"}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-lg"
                  disabled={!hasPreviousPage}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <ArrowLeft className="size-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-lg"
                  disabled={!hasNextPage}
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  Next
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentTableComponent;
