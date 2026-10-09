"use client";

import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  CalendarDays,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IPaymentQuery } from "@/types/payment.type";

interface PaymentFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: IPaymentQuery;
  onFiltersChange: (filters: IPaymentQuery) => void;
  onApply: () => void;
  onReset: () => void;
}

const fieldClassName =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30";

const PaymentFilter = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: PaymentFilterProps) => {
  const updateFilter = <K extends keyof IPaymentQuery>(
    key: K,
    value: IPaymentQuery[K],
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border/70 px-5 py-6 text-left sm:px-6">
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <SlidersHorizontal className="size-5" />
          </div>

          <SheetTitle className="text-xl font-bold">Filter Payments</SheetTitle>

          <SheetDescription>
            Refine transactions by date and sorting preferences.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 px-5 py-6 sm:px-6">
          <div className="space-y-2">
            <label
              htmlFor="payment-date-range"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <CalendarDays className="size-4 text-muted-foreground" />
              Created date
            </label>

            <select
              id="payment-date-range"
              className={fieldClassName}
              value={filters.createdAt ?? ""}
              onChange={(event) => {
                const value = event.target.value;

                updateFilter(
                  "createdAt",
                  value ? (value as IPaymentQuery["createdAt"]) : undefined,
                );
              }}
            >
              <option value="">All dates</option>
              <option value="today">Today</option>
              <option value="thisWeek">This week</option>
              <option value="thisMonth">This month</option>
            </select>

            <p className="text-xs leading-5 text-muted-foreground">
              Filter transactions by their creation date.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="payment-sort-by" className="text-sm font-medium">
              Sort by
            </label>

            <select
              id="payment-sort-by"
              className={fieldClassName}
              value={filters.sortBy ?? "createdAt"}
              onChange={(event) => updateFilter("sortBy", event.target.value)}
            >
              <option value="createdAt">Created date</option>
              <option value="amount">Payment amount</option>
              <option value="status">Payment status</option>
            </select>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Sort direction</p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                aria-pressed={filters.sortOrder === "desc"}
                onClick={() => updateFilter("sortOrder", "desc")}
                className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors ${
                  (filters.sortOrder ?? "desc") === "desc"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted/60"
                }`}
              >
                <ArrowDownWideNarrow className="size-4" />
                Newest first
              </button>

              <button
                type="button"
                aria-pressed={filters.sortOrder === "asc"}
                onClick={() => updateFilter("sortOrder", "asc")}
                className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors ${
                  filters.sortOrder === "asc"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted/60"
                }`}
              >
                <ArrowUpWideNarrow className="size-4" />
                Oldest first
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="payment-page-size" className="text-sm font-medium">
              Records per page
            </label>

            <select
              id="payment-page-size"
              className={fieldClassName}
              value={filters.limit ?? 10}
              onChange={(event) =>
                updateFilter("limit", Number(event.target.value))
              }
            >
              <option value={10}>10 records</option>
              <option value={20}>20 records</option>
              <option value={50}>50 records</option>
            </select>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
            <p className="text-sm font-medium">Filter preferences</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your changes will be applied when you select Apply filters. The
              table will reload using the selected query parameters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-border/70 bg-background px-5 py-4 sm:px-6">
          <Button
            variant="outline"
            className="flex-1 gap-2 rounded-xl"
            onClick={handleReset}
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>

          <Button className="flex-1 rounded-xl" onClick={onApply}>
            Apply filters
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-xl"
            aria-label="Close filters"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PaymentFilter;
