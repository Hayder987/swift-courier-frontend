"use client";

import { UsersRound } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import CommonPagination from "@/components/common/CommonPaginaton";
import NoDataFound from "@/components/common/NoDataFound";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllUsers } from "@/hooks/admin.hook";
import { useGetMe } from "@/hooks/auth.hook";

import type {
  IAdminUser,
  IAdminUserQueryParams,
} from "@/types/admin.employee.types";

import AdminUserFilter from "./admin-user-filter";
import AdminUserTableComponents from "./admin-user-table-component";

const DEFAULT_FILTERS: IAdminUserQueryParams = {
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
  role: undefined,
  status: undefined,
  authMethod: undefined,
  isEmployee: undefined,
};

const AdminUsersTable = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filters, setFilters] =
    useState<IAdminUserQueryParams>(DEFAULT_FILTERS);

  /* Logged in user */
  const { data: userData } = useGetMe();

  const loginUserRole = userData?.data?.user?.role;

  /* Search debounce */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search]);

  /* Query params */
  const queryParams = useMemo<IAdminUserQueryParams>(
    () => ({
      ...filters,
      page,
      limit: 10,
      searchTerm: debouncedSearch || undefined,
    }),
    [filters, page, debouncedSearch],
  );

  /* Users */
  const { data } = useSuspenseGetAllUsers(queryParams);

  const users: IAdminUser[] = data?.data ?? [];

  const totalPages = data?.meta?.totalPages ?? 0;

  const totalUsers = data?.meta?.total ?? 0;

  const isEmpty = users.length === 0;

  /* Filter change */
  const handleFilterChange = (
    key: keyof IAdminUserQueryParams,
    value: string,
  ) => {
    setPage(1);

    setFilters((previous) => ({
      ...previous,
      [key]: value || undefined,
    }));
  };

  /* Reset */
  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);

    setFilters({
      ...DEFAULT_FILTERS,
    });
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
            <UsersRound className="size-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              User Management
            </h1>

            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              Monitor, manage and control SwiftCourier users.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 rounded-xl border border-border/60 bg-card/70 px-4 py-2 shadow-sm md:flex">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Total Users
            </p>

            <p className="text-lg font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AdminUserFilter
        search={search}
        filters={filters}
        onSearchChange={setSearch}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
        {!isEmpty ? (
          <>
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 sm:px-6">
              <div>
                <p className="text-sm font-semibold">All Users</p>

                <p className="text-xs text-muted-foreground">
                  Page {page}
                  {totalPages > 0 ? ` of ${totalPages}` : ""}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {totalUsers} total
              </span>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="min-w-65">User</TableHead>

                    <TableHead>Role</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead className="hidden md:table-cell">
                      Authentication
                    </TableHead>

                    <TableHead className="hidden lg:table-cell">
                      Created
                    </TableHead>

                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <AdminUserTableComponents
                        user={user}
                        loginUserRole={loginUserRole}
                      />
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
          <div className="px-4 py-10 sm:px-6 sm:py-14">
            <NoDataFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersTable;
