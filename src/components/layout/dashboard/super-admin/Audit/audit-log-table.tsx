"use client";

import { FileClock, RefreshCcw } from "lucide-react";
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
import { useGetSuspenseAuditLogs } from "@/hooks";
import type { IAuditLogQueryParams } from "@/types/super.admin.type";
import AuditTableComponent from "./AuditTableComponent";
import AuditFilter from "./audit-filter";

const DEFAULT_FILTERS: IAuditLogQueryParams = {
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
  type: undefined,
  action: undefined,
  resource: undefined,
  createdAt: undefined,
};

const AuditLogsTable = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<IAuditLogQueryParams>(DEFAULT_FILTERS);

  const queryParams = useMemo(
    () => ({
      ...filters,
      page,
      limit: 10,
    }),
    [filters, page],
  );

  const { data: auditData } = useGetSuspenseAuditLogs(queryParams);

  const auditLogs = auditData?.data ?? [];
  const totalPages = auditData?.meta?.totalPages ?? 0;
  const totalLogs = auditData?.meta?.total ?? 0;

  const handleFilterChange = (
    key: keyof IAuditLogQueryParams,
    value: string,
  ) => {
    setPage(1);

    setFilters((previous) => ({
      ...previous,
      [key]: value || undefined,
    }));
  };

  const handleReset = () => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
            <FileClock className="size-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Audit Logs
            </h1>

            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              Track important activities and system events.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="text-foreground">{totalLogs}</span>{" "}
            {totalLogs === 1 ? "log" : "logs"}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => window.location.reload()}
            className="size-9 rounded-xl"
            aria-label="Refresh audit logs"
          >
            <RefreshCcw className="size-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <AuditFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
        {auditLogs.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="min-w-64">Activity</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden xl:table-cell">Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {auditLogs.map((auditLog) => (
                    <AuditTableComponent
                      key={auditLog.id}
                      auditLog={auditLog}
                    />
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

export default AuditLogsTable;
