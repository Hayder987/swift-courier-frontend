"use client";

import {
  ArrowDownAZ,
  ArrowUpAZ,
  Filter,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  EmploymentStatus,
  IEmployee,
  IGetAllEmployeesParams,
  IZone,
} from "@/types";

interface EmployeeFiltersProps {
  employees: IEmployee[];
  filters: IGetAllEmployeesParams;
  onFilterChange: (key: keyof IGetAllEmployeesParams, value: string) => void;
  onReset: () => void;
}

const EmployeeFilters = ({
  employees,
  filters,
  onFilterChange,
  onReset,
}: EmployeeFiltersProps) => {
  const handleSelectChange = (
    key: keyof IGetAllEmployeesParams,
    value: string | null,
  ) => {
    onFilterChange(key, value === null || value === "ALL" ? "" : value);
  };

  const zones = employees
    .map((employee) => employee.courier?.zone)
    .filter((zone): zone is IZone => zone !== null && zone !== undefined);

  const uniqueZones = Array.from(
    new Map(zones.map((zone) => [zone.code, zone])).values(),
  );

  // Common Premium Select Trigger Styling Class
  const premiumSelectTriggerClass =
    "h-10.5 rounded-xl border-border/50 bg-background/50 px-3.5 text-xs font-medium shadow-sm backdrop-blur-md transition-all duration-200 ease-in-out hover:border-[#e50914]/40 hover:bg-background/80 hover:shadow-md focus:border-[#e50914]/60 focus:ring-2 focus:ring-[#e50914]/20 data-[state=open]:border-[#e50914] data-[state=open]:ring-2 data-[state=open]:ring-[#e50914]/25 [&>svg]:text-muted-foreground [&>svg]:transition-transform [&>svg]:duration-200 data-[state=open]:[&>svg]:rotate-180 data-[state=open]:[&>svg]:text-[#e50914]";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
      <div className="absolute -right-20 -top-24 size-48 rounded-full bg-[#e50914]/5 blur-3xl" />

      <div className="relative p-4 sm:p-5">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
              <SlidersHorizontal className="size-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-tight">
                Employee Filters
              </h3>

              <p className="text-xs text-muted-foreground">
                Refine employees by role, status or zone
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onReset}
            className="w-fit gap-2 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>

        {/* Filters */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Role */}
          <div className="space-y-1.5">
            <label
              htmlFor="employee-role-filter"
              className="text-xs font-medium text-muted-foreground"
            >
              Role
            </label>

            <Select
              value={filters.role ?? "ALL"}
              onValueChange={(value) => handleSelectChange("role", value)}
            >
              <SelectTrigger
                id="employee-role-filter"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="All roles" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60 backdrop-blur-xl">
                <SelectItem value="ALL">All roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="COURIER">Courier</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Employment Status */}
          <div className="space-y-1.5">
            <label
              htmlFor="employee-status-filter"
              className="text-xs font-medium text-muted-foreground"
            >
              Employment Status
            </label>

            <Select
              value={filters.employeeStatus ?? "ALL"}
              onValueChange={(value) =>
                handleSelectChange("employeeStatus", value)
              }
            >
              <SelectTrigger
                id="employee-status-filter"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60 backdrop-blur-xl">
                <SelectItem value="ALL">All statuses</SelectItem>

                {(
                  [
                    "ACTIVE",
                    "APPLIED",
                    "SUSPENDED",
                    "INACTIVE",
                    "ON_LEAVE",
                    "RESIGNED",
                    "TERMINATED",
                  ] as EmploymentStatus[]
                ).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Zone */}
          <div className="space-y-1.5">
            <label
              htmlFor="employee-zone-filter"
              className="text-xs font-medium text-muted-foreground"
            >
              Zone
            </label>

            <Select
              value={filters.zoneCode ?? "ALL"}
              onValueChange={(value) => handleSelectChange("zoneCode", value)}
            >
              <SelectTrigger
                id="employee-zone-filter"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="All zones" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60 backdrop-blur-xl">
                <SelectItem value="ALL">All zones</SelectItem>

                {uniqueZones.map((zone) => (
                  <SelectItem key={zone.code} value={zone.code}>
                    {zone.name} ({zone.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label
              htmlFor="employee-sort-by"
              className="text-xs font-medium text-muted-foreground"
            >
              Sort By
            </label>

            <Select
              value={filters.sortBy ?? "createdAt"}
              onValueChange={(value) => handleSelectChange("sortBy", value)}
            >
              <SelectTrigger
                id="employee-sort-by"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60 backdrop-blur-xl">
                <SelectItem value="createdAt">Created Date</SelectItem>

                <SelectItem value="updatedAt">Updated Date</SelectItem>

                <SelectItem value="joinAt">Join Date</SelectItem>

                <SelectItem value="employeeCode">Employee Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="space-y-1.5">
            <label
              htmlFor="employee-sort-order"
              className="text-xs font-medium text-muted-foreground"
            >
              Sort Order
            </label>

            <Select
              value={filters.sortOrder ?? "desc"}
              onValueChange={(value) => handleSelectChange("sortOrder", value)}
            >
              <SelectTrigger
                id="employee-sort-order"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60 backdrop-blur-xl">
                <SelectItem value="desc">
                  <span className="flex items-center gap-2">
                    <ArrowDownAZ className="size-3.5" />
                    Descending
                  </span>
                </SelectItem>

                <SelectItem value="asc">
                  <span className="flex items-center gap-2">
                    <ArrowUpAZ className="size-3.5" />
                    Ascending
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Hint */}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Filter className="size-3.5" />

          <span>Filters update the employee list automatically.</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;
