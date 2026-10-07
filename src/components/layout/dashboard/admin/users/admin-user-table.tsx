"use client";

import { UsersRound } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("searchTerm") ?? "";

  const [page, setPage] = useState(() => {
    const urlPage = Number(searchParams.get("page"));

    return urlPage > 0 ? urlPage : 1;
  });

  const [search, setSearch] = useState(initialSearch);

  const [debouncedSearch, setDebouncedSearch] =
    useState(initialSearch);

  const [filters, setFilters] = useState<IAdminUserQueryParams>(
    () => ({
      ...DEFAULT_FILTERS,
      role:
        (searchParams.get(
          "role",
        ) as IAdminUserQueryParams["role"]) ?? undefined,
      status:
        (searchParams.get(
          "status",
        ) as IAdminUserQueryParams["status"]) ?? undefined,
      authMethod:
        (searchParams.get(
          "authMethod",
        ) as IAdminUserQueryParams["authMethod"]) ?? undefined,
      sortBy:
        (searchParams.get(
          "sortBy",
        ) as IAdminUserQueryParams["sortBy"]) ?? "createdAt",
      sortOrder:
        (searchParams.get(
          "sortOrder",
        ) as IAdminUserQueryParams["sortOrder"]) ?? "desc",
    }),
  );

  const { data: userData } = useGetMe();
  const loginUserRole = userData?.data?.user?.role;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const trimmedSearch = search.trim();

      if (trimmedSearch !== debouncedSearch) {
        setDebouncedSearch(trimmedSearch);
        setPage(1);
      }
    }, 600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search, debouncedSearch]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) {
      params.set("page", String(page));
    }

    if (debouncedSearch) {
      params.set("searchTerm", debouncedSearch);
    }

    if (filters.role) {
      params.set("role", filters.role);
    }

    if (filters.status) {
      params.set("status", filters.status);
    }

    if (filters.authMethod) {
      params.set("authMethod", filters.authMethod);
    }

    if (filters.sortBy && filters.sortBy !== "createdAt") {
      params.set("sortBy", filters.sortBy);
    }

    if (filters.sortOrder && filters.sortOrder !== "desc") {
      params.set("sortOrder", filters.sortOrder);
    }

    const queryString = params.toString();

    router.replace(
      queryString ? `${pathname}?${queryString}` : pathname,
      {
        scroll: false,
      },
    );
  }, [
    pathname,
    router,
    page,
    debouncedSearch,
    filters.role,
    filters.status,
    filters.authMethod,
    filters.sortBy,
    filters.sortOrder,
  ]);

  const queryParams = useMemo<IAdminUserQueryParams>(
    () => ({
      ...filters,
      page,
      limit: 10,
      searchTerm: debouncedSearch || undefined,
    }),
    [filters, page, debouncedSearch],
  );

  const { data } = useSuspenseGetAllUsers(queryParams);

  const users: IAdminUser[] = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const totalUsers = data?.meta?.total ?? 0;
  const isEmpty = users.length === 0;

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

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
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

  return (
    <div className="w-full space-y-5">
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

      <AdminUserFilter
        search={search}
        filters={filters}
        onSearchChange={setSearch}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

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
                    <TableHead className="text-right">
                      Action
                    </TableHead>
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

export default AdminUsersTable;