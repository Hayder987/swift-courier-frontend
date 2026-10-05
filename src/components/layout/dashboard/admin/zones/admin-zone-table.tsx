"use client";

import { MapPinned, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
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
import { useGetSuspenseAllZones } from "@/hooks/zone.hook";
import type { GetAllZonesParams, ISingleZone } from "@/types/zone.type";
import AdminZoneTableComponent from "./admin-zone-table-component";

const DEFAULT_PARAMS: GetAllZonesParams = {
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

const AdminZoneTable = () => {
  const [page, setPage] = useState(1);
  const { data: userData } = useGetMe();
  const userRole = userData.data.user.role;
  const roleRoute =
    userRole === "ADMIN"
      ? "/admin-dashboard/create-zone"
      : "/super-admin-dashboard/create-zone";

  const queryParams = useMemo<GetAllZonesParams>(
    () => ({
      ...DEFAULT_PARAMS,
      page,
    }),
    [page],
  );

  const { data } = useGetSuspenseAllZones(queryParams);

  const zones: ISingleZone[] = data?.data ?? [];

  const totalPages = data?.meta?.totalPages ?? 0;

  const totalZones = data?.meta?.total ?? 0;

  const isEmpty = zones.length === 0;

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
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914] shadow-sm">
            <MapPinned className="size-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Delivery Zones
            </h1>

            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              Manage SwiftCourier delivery coverage areas and boundaries.
            </p>
          </div>
        </div>

        <Link href={roleRoute}>
          <Button
            type="button"
            className="h-10 w-full rounded-xl bg-[#e50914] px-4 text-white shadow-sm shadow-[#e50914]/20 hover:bg-[#c70811] sm:w-auto"
          >
            <Plus className="size-4" />
            Create Zone
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
        {!isEmpty ? (
          <>
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-4 sm:px-6">
              <div>
                <p className="text-sm font-semibold">All Zones</p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Page {page}
                  {totalPages > 0 ? ` of ${totalPages}` : ""}
                </p>
              </div>

              <div className="rounded-full border border-border/60 bg-muted/30 px-3 py-1.5">
                <span className="text-xs font-semibold">{totalZones}</span>{" "}
                <span className="text-xs text-muted-foreground">total</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 bg-muted/20 hover:bg-muted/20">
                    <TableHead className="min-w-60">Zone</TableHead>

                    <TableHead className="min-w-55">Location</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead className="hidden md:table-cell">
                      Radius
                    </TableHead>

                    <TableHead className="hidden lg:table-cell">
                      Boundary
                    </TableHead>

                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {zones.map((zone) => (
                    <TableRow
                      key={zone.id}
                      className="border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <AdminZoneTableComponent zone={zone} />
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

export default AdminZoneTable;
