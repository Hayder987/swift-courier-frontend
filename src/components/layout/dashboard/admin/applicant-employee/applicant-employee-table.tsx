"use client";

import { Plus, Users } from "lucide-react";
import Link from "next/link";
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
import { useSuspenseGetApplicantEmployee } from "@/hooks";
import type {
  IGetAllEmployeesParams,
  IQueryParamsCourierApplicant,
} from "@/types";
import ApplicantEmployeeTableComponent from "./applicantemployee-table-ccomponent";

const ApplicantEmployeeTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const urlPage = Number(searchParams.get("page"));

    return urlPage > 0 ? urlPage : 1;
  });

  const [filters, setFilters] = useState<IQueryParamsCourierApplicant>(() => ({
    limit: 10,
    sortBy:
      (searchParams.get("sortBy") as IQueryParamsCourierApplicant["sortBy"]) ??
      "createdAt",
    sortOrder:
      (searchParams.get(
        "sortOrder",
      ) as IQueryParamsCourierApplicant["sortOrder"]) ?? "desc",
  }));

  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) {
      params.set("page", String(page));
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
  }, [pathname, router, page, filters.sortBy, filters.sortOrder]);

  const queryParams: IQueryParamsCourierApplicant = useMemo(
    () => ({
      ...filters,
      page,
      limit: 10,
    }),
    [filters, page],
  );

  const { data } = useSuspenseGetApplicantEmployee(queryParams);

  const employees = data?.data ?? [];

  const totalPages = data?.meta?.totalPages ?? 0;

  const isEmpty = employees.length === 0;

  const handleFilterChange = (
    key: keyof IGetAllEmployeesParams,
    value: string,
  ) => {
    setPage(1);

    setFilters((previous) => ({
      ...previous,
      [key]: value || undefined,
    }));
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("Pagination:", {
    page,
    totalPages,
    employees: employees.length,
    meta: data?.meta,
  });

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
              <Users className="size-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                All Applicaton
              </h1>

              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                Manage SwiftCourier couriers Application.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
        {!isEmpty ? (
          <>
            <div className="min-h-[calc(100vh-450px)] overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="min-w-60">Employee</TableHead>

                    <TableHead>Employee ID</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead className="hidden lg:table-cell">Zone</TableHead>

                    <TableHead className="hidden lg:table-cell">
                      Applied At
                    </TableHead>

                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {employees?.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className="border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <ApplicantEmployeeTableComponent employee={employee} />
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
          <div className="px-4 py-8 sm:px-6 sm:py-12">
            <NoDataFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantEmployeeTable;
