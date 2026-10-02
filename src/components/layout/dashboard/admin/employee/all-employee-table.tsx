"use client";

import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
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
import { useGetMe } from "@/hooks";
import { useSuspenseGetAllEmployee } from "@/hooks/admin.hook";
import type { IGetAllEmployeesParams } from "@/types";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeTableComponent from "./EmployeeTableComponent";

const AllEmployeeTable = () => {
  const { data: userData } = useGetMe();
  const loginUserRole = userData?.data?.user?.role;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<IGetAllEmployeesParams>({
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
    employeeStatus: undefined,
    role: undefined,
    zoneCode: undefined,
  });

  const queryParams: IGetAllEmployeesParams = useMemo(
    () => ({
      ...filters,
      page,
      limit: 10,
    }),
    [filters, page],
  );

  const { data } = useSuspenseGetAllEmployee(queryParams);

  const employees = data?.data ?? [];

  const totalPages = data?.meta?.totalPages ?? 0;

  const filteredEmployees = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return employees;
    }

    return employees.filter((employee) => {
      const name = employee.user.name?.toLowerCase() ?? "";

      const email = employee.user.email?.toLowerCase() ?? "";

      const code = employee.employeeCode?.toLowerCase() ?? "";

      const role = employee.user.role?.toLowerCase() ?? "";

      const zone = employee.courier?.zone?.name?.toLowerCase() ?? "";

      return (
        name.includes(value) ||
        email.includes(value) ||
        code.includes(value) ||
        role.includes(value) ||
        zone.includes(value)
      );
    });
  }, [employees, search]);

  const isEmpty = filteredEmployees.length === 0;

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

  const handleReset = () => {
    setSearch("");

    setPage(1);

    setFilters({
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
      employeeStatus: undefined,
      role: undefined,
      zoneCode: undefined,
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
                All Employees
              </h1>

              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                Manage SwiftCourier employees and couriers.
              </p>
            </div>
          </div>
        </div>

        {loginUserRole === "SUPER_ADMIN" && (
          <Link href={"/super-admin-dashboard/create-employee"}>
            <Button
              type="button"
              className="h-10 gap-2 rounded-xl bg-[#e50914] px-4 text-white shadow-sm shadow-[#e50914]/20 hover:bg-[#c70811]"
            >
              <Plus className="size-4" />
              Create Employee
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <EmployeeFilters
        employees={employees}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
        {!isEmpty ? (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="min-w-60">Employee</TableHead>

                    <TableHead>Employee ID</TableHead>

                    <TableHead>Role</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead className="hidden lg:table-cell">Zone</TableHead>

                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className="border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <EmployeeTableComponent employee={employee} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <CommonPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
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

export default AllEmployeeTable;
