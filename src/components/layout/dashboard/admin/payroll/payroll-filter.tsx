"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  CalendarDays,
  ChevronDown,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IPayrollQueryParams } from "@/types/payroll.type";

interface PayrollFilterProps {
  filters: IPayrollQueryParams;
  onFilterChange: (key: keyof IPayrollQueryParams, value: string) => void;
  onReset: () => void;
}

const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = Array.from(
  { length: 7 },
  (_, index) => new Date().getFullYear() - index,
);

const PayrollFilter = ({
  filters,
  onFilterChange,
  onReset,
}: PayrollFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    Boolean(filters.month) || Boolean(filters.year) || Boolean(filters.status);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl border border-[#e50914]/15 bg-[#e50914]/10 text-[#e50914]">
            <SlidersHorizontal className="size-4" />
          </div>

          <div>
            <p className="text-sm font-semibold">Payroll filters</p>

            <p className="hidden text-xs text-muted-foreground sm:block">
              Filter payroll records by period and status.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant={isOpen ? "secondary" : "outline"}
          onClick={() => setIsOpen((previous) => !previous)}
          className="gap-2 rounded-xl"
        >
          {isOpen ? <X className="size-4" /> : <Filter className="size-4" />}

          <span className="hidden sm:inline">
            {isOpen ? "Hide filters" : "Filters"}
          </span>

          {!isOpen && hasActiveFilters ? (
            <span className="flex size-5 items-center justify-center rounded-full bg-[#e50914] text-[10px] font-bold text-white">
              {
                [filters.month, filters.year, filters.status].filter(Boolean)
                  .length
              }
            </span>
          ) : null}

          {!isOpen && (
            <ChevronDown className="size-3.5 text-muted-foreground" />
          )}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
              y: -8,
            }}
            animate={{
              height: "auto",
              opacity: 1,
              y: 0,
            }}
            exit={{
              height: 0,
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur-xl sm:p-5">
              <div className="mb-5 flex items-center justify-end gap-3">
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="gap-2 rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="size-3.5" />
                    Reset
                  </Button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label
                    htmlFor="payroll-month"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Payroll month
                  </label>

                  <Select
                    value={filters.month ? String(filters.month) : "all"}
                    onValueChange={(value) => {
                      if (!value || value === "all") {
                        onFilterChange("month", "");
                        return;
                      }

                      onFilterChange("month", value);
                    }}
                  >
                    <SelectTrigger
                      id="payroll-month"
                      className="h-11 rounded-xl bg-background/70"
                    >
                      <CalendarDays className="size-4 text-muted-foreground" />

                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="all">All Months</SelectItem>

                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="payroll-year"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Payroll year
                  </label>

                  <Select
                    value={filters.year ? String(filters.year) : "all"}
                    onValueChange={(value) => {
                      if (!value || value === "all") {
                        onFilterChange("year", "");
                        return;
                      }

                      onFilterChange("year", value);
                    }}
                  >
                    <SelectTrigger
                      id="payroll-year"
                      className="h-11 rounded-xl bg-background/70"
                    >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>

                      {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="payroll-status"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Payment status
                  </label>

                  <Select
                    value={filters.status ?? "all"}
                    onValueChange={(value) => {
                      if (!value || value === "all") {
                        onFilterChange("status", "");
                        return;
                      }

                      onFilterChange("status", value);
                    }}
                  >
                    <SelectTrigger
                      id="payroll-status"
                      className="h-11 rounded-xl bg-background/70"
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>

                      <SelectItem value="PENDING">Pending</SelectItem>

                      <SelectItem value="PAID">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PayrollFilter;
