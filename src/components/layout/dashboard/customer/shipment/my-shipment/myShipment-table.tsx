"use client";

import { Package, Plus } from "lucide-react";
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
import { useGetSuspenseMyShipment } from "@/hooks/shipment.hook";
import type { IShipment, ShipmentQueryParams } from "@/types/shipment.type";
import ShipmentFilter from "../../../commmon/ShipmentFilter";
import MyShipmentTableComponent from "./myShipment-table-component";

const DEFAULT_FILTERS: ShipmentQueryParams = {
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
  status: undefined,
  pickupZoneId: undefined,
  deliveryZoneId: undefined,
  dateFilter: undefined,
  type: undefined,
};

const MyShipmentTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const urlPage = Number(searchParams.get("page"));

    return urlPage > 0 ? urlPage : 1;
  });

  const [search, setSearch] = useState(
    () => searchParams.get("searchTerm") ?? "",
  );

  const [debouncedSearch, setDebouncedSearch] = useState(
    () => searchParams.get("searchTerm") ?? "",
  );

  const [filters, setFilters] = useState<ShipmentQueryParams>(() => ({
    ...DEFAULT_FILTERS,
    status:
      (searchParams.get("status") as ShipmentQueryParams["status"]) ??
      undefined,
    pickupZoneId: searchParams.get("pickupZoneId") ?? undefined,
    deliveryZoneId: searchParams.get("deliveryZoneId") ?? undefined,
    dateFilter:
      (searchParams.get("dateFilter") as ShipmentQueryParams["dateFilter"]) ??
      undefined,
    type:
      (searchParams.get("type") as ShipmentQueryParams["type"]) ?? undefined,
    sortBy:
      (searchParams.get("sortBy") as ShipmentQueryParams["sortBy"]) ??
      "createdAt",
    sortOrder:
      (searchParams.get("sortOrder") as ShipmentQueryParams["sortOrder"]) ??
      "desc",
  }));

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());

      if (search.trim() !== debouncedSearch) {
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

    if (filters.status) {
      params.set("status", filters.status);
    }

    if (filters.pickupZoneId) {
      params.set("pickupZoneId", filters.pickupZoneId);
    }

    if (filters.deliveryZoneId) {
      params.set("deliveryZoneId", filters.deliveryZoneId);
    }

    if (filters.dateFilter) {
      params.set("dateFilter", filters.dateFilter);
    }

    if (filters.type) {
      params.set("type", filters.type);
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
    debouncedSearch,
    filters.status,
    filters.pickupZoneId,
    filters.deliveryZoneId,
    filters.dateFilter,
    filters.type,
    filters.sortBy,
    filters.sortOrder,
  ]);

  const queryParams = useMemo<ShipmentQueryParams>(
    () => ({
      ...filters,
      page,
      limit: 10,
      searchTerm: debouncedSearch || undefined,
    }),
    [filters, page, debouncedSearch],
  );

  const { data } = useGetSuspenseMyShipment(queryParams);

  const shipments: IShipment[] = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const totalShipments = data?.meta?.total ?? 0;

  const handleFilterChange = (
    key: keyof ShipmentQueryParams,
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
    setFilters({ ...DEFAULT_FILTERS });
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isEmpty = shipments.length === 0;

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
            <Package className="size-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              All Shipments
            </h1>

            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              Monitor, update and manage SwiftCourier shipments.
            </p>
          </div>
        </div>

        <Link href="/customer-dashboard/create-shipment">
          <Button
            type="button"
            className="h-10 w-full gap-2 rounded-xl bg-[#e50914] px-4 text-white shadow-sm shadow-[#e50914]/20 hover:bg-[#c70811] sm:w-auto"
          >
            <Plus className="size-4" />
            Create Shipment
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <ShipmentFilter
        search={search}
        filters={filters}
        shipments={shipments}
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
                <p className="text-sm font-semibold">Shipments</p>

                <p className="text-xs text-muted-foreground">
                  Page {page}
                  {totalPages > 0 ? ` of ${totalPages}` : ""}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {totalShipments} total
              </span>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="min-w-65">Shipment</TableHead>

                    <TableHead className="min-w-45">Customer</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead>Type</TableHead>

                    <TableHead className="hidden lg:table-cell">
                      Route
                    </TableHead>

                    <TableHead className="hidden xl:table-cell">Fee</TableHead>

                    <TableHead className="text-right">Payment</TableHead>

                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow
                      key={shipment.id}
                      className="border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <MyShipmentTableComponent shipment={shipment} />
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

export default MyShipmentTable;
