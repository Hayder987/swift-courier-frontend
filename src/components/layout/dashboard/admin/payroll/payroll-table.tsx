"use client";

import { ArrowUpRight, BadgeDollarSign, Banknote } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import CommonPagination from "@/components/common/CommonPaginaton";
import NoDataFound from "@/components/common/NoDataFound";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSuspenseAllPayroll } from "@/hooks/payroll.hook";
import type {
  IPayroll,
  IPayrollQueryParams,
  PayrollStatus,
} from "@/types/payroll.type";

import PayrollFilter from "./payroll-filter";
import PayrollTableComponent from "./payroll-table-component";

const DEFAULT_FILTERS: IPayrollQueryParams = {
  limit: 20,
  sortBy: "createdAt",
  sortOrder: "desc",
  month: undefined,
  year: undefined,
  status: undefined,
};

const PayrollTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const urlPage = Number(searchParams.get("page"));

    return urlPage > 0 ? urlPage : 1;
  });

  const [filters, setFilters] = useState<IPayrollQueryParams>(() => ({
    ...DEFAULT_FILTERS,
    month: Number(searchParams.get("month")) || undefined,
    year: Number(searchParams.get("year")) || undefined,
    status: (searchParams.get("status") as PayrollStatus) ?? undefined,
    sortBy:
      (searchParams.get("sortBy") as IPayrollQueryParams["sortBy"]) ??
      "createdAt",
    sortOrder:
      (searchParams.get("sortOrder") as IPayrollQueryParams["sortOrder"]) ??
      "desc",
  }));

  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) {
      params.set("page", String(page));
    }

    if (filters.month) {
      params.set("month", String(filters.month));
    }

    if (filters.year) {
      params.set("year", String(filters.year));
    }

    if (filters.status) {
      params.set("status", filters.status);
    }

    if (filters.sortBy && filters.sortBy !== "createdAt") {
      params.set("sortBy", filters.sortBy);
    }

    if (filters.sortOrder && filters.sortOrder !== "desc") {
      params.set("sortOrder", filters.sortOrder);
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [
    pathname,
    router,
    page,
    filters.month,
    filters.year,
    filters.status,
    filters.sortBy,
    filters.sortOrder,
  ]);

  const queryParams = useMemo<IPayrollQueryParams>(
    () => ({
      ...filters,
      page,
      limit: 10,
    }),
    [filters, page],
  );

  const { data } = useGetSuspenseAllPayroll(queryParams);

  const payrolls: IPayroll[] = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const totalPayrolls = data?.meta?.total ?? 0;

  const handleFilterChange = (
    key: keyof IPayrollQueryParams,
    value: string,
  ) => {
    setPage(1);

    setFilters((previous) => {
      const next = {
        ...previous,
      };

      if (key === "month" || key === "year") {
        next[key] = value ? Number(value) : undefined;

        return next;
      }

      if (key === "status") {
        next.status = value ? (value as PayrollStatus) : undefined;

        return next;
      }

      return next;
    });
  };

  const handleReset = () => {
    setPage(1);

    setFilters({
      ...DEFAULT_FILTERS,
    });
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleGeneratePayroll = () => {
    router.push("/admin-dashboard/generate-payroll");
  };

  const isEmpty = payrolls.length === 0;

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
            <Banknote className="size-5" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Payroll Management
              </h1>

              <span className="rounded-full border border-[#e50914]/15 bg-[#e50914]/5 px-2 py-1 text-[9px] font-bold tracking-wide text-[#e50914] uppercase">
                Finance
              </span>
            </div>

            <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground sm:text-sm">
              Manage employee payroll, salary payments, deductions, bonuses and
              payment records.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGeneratePayroll}
          className="group h-10 w-full rounded-xl bg-[#e50914] px-4 font-semibold text-white shadow-lg shadow-[#e50914]/15 hover:bg-[#c70812] sm:w-auto"
        >
          <BadgeDollarSign className="size-4" />
          Generate Payroll
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </div>

      <PayrollFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
        {!isEmpty ? (
          <>
            <div className="flex flex-col gap-1 border-b border-border/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="text-sm font-semibold">Employee Payrolls</p>

                <p className="text-xs text-muted-foreground">
                  Page {page}
                  {totalPages > 0 ? ` of ${totalPages}` : ""}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {totalPayrolls} total payrolls
              </span>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="min-w-60">Employee</TableHead>

                    <TableHead className="min-w-35">Period</TableHead>

                    <TableHead>Gross</TableHead>

                    <TableHead className="hidden lg:table-cell">
                      Deduction
                    </TableHead>

                    <TableHead>Net Salary</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {payrolls.map((payroll) => (
                    <TableRow
                      key={payroll.id}
                      className="border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <PayrollTableComponent payroll={payroll} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <CommonPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="px-4 py-10 sm:px-6 sm:py-14">
            <NoDataFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollTable;
