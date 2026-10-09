
"use client";

import {
  Banknote,
  CheckCircle2,
  Clock3,
  CreditCard,
  Filter,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSuspenseAllPayments } from "@/hooks/payment.hook";
import type { IPayment, IPaymentQuery } from "@/types/payment.type";

import PaymentFilter from "./payment-filter";
import PaymentDetailsSheet from "./payment-sheet";
import PaymentTableComponent from "./payment-table-components";

const PAGE_SIZE = 10;

const initialFilters: IPaymentQuery = {
  page: 1,
  limit: PAGE_SIZE,
  sortBy: "createdAt",
  sortOrder: "desc",
};

interface PaymentStatistics {
  total: number;
  paid: number;
  pending: number;
  unsuccessful: number;
  revenue: number;
}

const initialStatistics: PaymentStatistics = {
  total: 0,
  paid: 0,
  pending: 0,
  unsuccessful: 0,
  revenue: 0,
};

function getPayments(response: unknown): IPayment[] {
  if (!response || typeof response !== "object") {
    console.error("Payment API returned an invalid response:", response);
    return [];
  }

  const result = response as {
    data?: unknown;
  };

  if (Array.isArray(result.data)) {
    return result.data as IPayment[];
  }

  if (
    result.data &&
    typeof result.data === "object" &&
    "payments" in result.data &&
    Array.isArray(result.data.payments)
  ) {
    return result.data.payments as IPayment[];
  }

  console.error(
    "Payment API response does not contain a payment array. Check the production API response:",
    response,
  );

  return [];
}

function calculateStatistics(payments: IPayment[]): PaymentStatistics {
  const statistics: PaymentStatistics = { ...initialStatistics };

  for (const payment of payments) {
    const amount = Number(payment.amount) || 0;

    statistics.total += 1;

    if (payment.status === "PAID") {
      statistics.paid += 1;
      statistics.revenue += amount;
    } else if (payment.status === "PENDING") {
      statistics.pending += 1;
    } else if (
      payment.status === "FAILED" ||
      payment.status === "CANCELLED"
    ) {
      statistics.unsuccessful += 1;
    }
  }

  return statistics;
}

const PaymentsTable = () => {
  const [filters, setFilters] = useState<IPaymentQuery>({
    ...initialFilters,
  });

  const [draftFilters, setDraftFilters] = useState<IPaymentQuery>({
    ...initialFilters,
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(
    null,
  );

  const { data: response } = useGetSuspenseAllPayments(filters);

  const payments = useMemo(() => getPayments(response), [response]);

  const statistics = useMemo(
    () => calculateStatistics(payments),
    [payments],
  );

  const activeFilterCount = [
    filters.createdAt,
    filters.sortBy !== "createdAt" ? filters.sortBy : undefined,
    filters.sortOrder !== "desc" ? filters.sortOrder : undefined,
  ].filter(Boolean).length;

  const openFilters = () => {
    setDraftFilters({ ...filters });
    setFilterOpen(true);
  };

  const applyFilters = () => {
    setFilters({
      ...draftFilters,
      page: 1,
      limit: PAGE_SIZE,
    });

    setFilterOpen(false);
  };

  const resetFilters = () => {
    const reset = { ...initialFilters };

    setDraftFilters(reset);
    setFilters(reset);
    setFilterOpen(false);
  };

  const changePage = (page: number) => {
    setFilters((previous) => ({
      ...previous,
      page,
    }));
  };

  const currentPage = filters.page ?? 1;

  return (
    <div className="min-h-screen space-y-6 bg-background px-3 py-5 text-foreground sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto w-full max-w-380 space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard className="size-5" />
              </div>

              <p className="text-sm font-medium text-muted-foreground">
                Finance / Payments
              </p>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Payment History
            </h1>

            <p className="max-w-xl text-sm text-muted-foreground">
              Monitor transactions, verify payment status, and review shipment
              payment details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 rounded-xl"
              onClick={resetFilters}
            >
              <RefreshCw className="size-4" />
              Reset
            </Button>

            <Button
              className="gap-2 rounded-xl shadow-sm"
              onClick={openFilters}
            >
              <Filter className="size-4" />
              Filters

              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary-foreground text-xs font-semibold text-primary">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Transactions on page
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {statistics.total}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Wallet className="size-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Paid transactions
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {statistics.paid}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Pending payments
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {statistics.pending}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Clock3 className="size-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Paid amount on page
                </p>
                <p className="text-xl font-bold tabular-nums">
                  {new Intl.NumberFormat("en-BD", {
                    style: "currency",
                    currency: "BDT",
                    maximumFractionDigits: 2,
                  }).format(statistics.revenue)}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Banknote className="size-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        <PaymentTableComponent
          payments={payments}
          onViewDetails={setSelectedPayment}
          currentPage={currentPage}
          pageSize={filters.limit ?? PAGE_SIZE}
          onPageChange={changePage}
        />

        <PaymentFilter
          open={filterOpen}
          onOpenChange={setFilterOpen}
          filters={draftFilters}
          onFiltersChange={setDraftFilters}
          onApply={applyFilters}
          onReset={resetFilters}
        />

        <PaymentDetailsSheet
          open={selectedPayment !== null}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedPayment(null);
            }
          }}
          payment={selectedPayment}
        />
      </div>
    </div>
  );
};

export default PaymentsTable;

