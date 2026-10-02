"use client";

import {
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarDays,
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
  AuditAction,
  AuditResource,
  AuditType,
  IAuditLogQueryParams,
} from "@/types/super.admin.type";

interface AuditFilterProps {
  filters: IAuditLogQueryParams;
  onFilterChange: (key: keyof IAuditLogQueryParams, value: string) => void;
  onReset: () => void;
}

const premiumSelectTriggerClass =
  "h-10.5 rounded-xl border-border/50 bg-background/50 px-3.5 text-xs font-medium shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#e50914]/40 hover:bg-background/80 hover:shadow-md focus:border-[#e50914]/60 focus:ring-2 focus:ring-[#e50914]/20 data-[state=open]:border-[#e50914] data-[state=open]:ring-2 data-[state=open]:ring-[#e50914]/25 [&>svg]:text-muted-foreground [&>svg]:transition-transform [&>svg]:duration-200 data-[state=open]:[&>svg]:rotate-180 data-[state=open]:[&>svg]:text-[#e50914]";

const ACTIONS: AuditAction[] = [
  "CREATED",
  "UPDATE",
  "DELETE",
  "APPROVE",
  "REJECT",
  "ASSIGN",
  "ACCEPT",
  "PICKUP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "DELIVERY_FAILED",
  "CANCEL",
  "PAYMENT",
  "PAYROLL",
];

const RESOURCES: AuditResource[] = [
  "USER",
  "EMPLOYEE",
  "COURIER",
  "CUSTOMER",
  "SHIPMENT",
  "ZONE",
  "PAYMENT",
  "PAYROLL",
  "SALARY",
];

const AuditFilter = ({
  filters,
  onFilterChange,
  onReset,
}: AuditFilterProps) => {
  const handleSelectChange = (
    key: keyof IAuditLogQueryParams,
    value: string | null,
  ) => {
    onFilterChange(key, value === null || value === "ALL" ? "" : value);
  };

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
                Audit Filters
              </h3>

              <p className="text-xs text-muted-foreground">
                Refine activity logs by action, resource and date.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-fit gap-2 rounded-lg"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>

        {/* Filters */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Type */}
          <div className="space-y-1.5">
            <label
              htmlFor="audit-type"
              className="text-xs font-medium text-muted-foreground"
            >
              Log Type
            </label>

            <Select
              value={filters.type ?? "ALL"}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger
                id="audit-type"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="All types" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60">
                <SelectItem value="ALL">All types</SelectItem>
                <SelectItem value="CURRENT">Current</SelectItem>
                <SelectItem value="OLD">Old</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action */}
          <div className="space-y-1.5">
            <label
              htmlFor="audit-action"
              className="text-xs font-medium text-muted-foreground"
            >
              Action
            </label>

            <Select
              value={filters.action ?? "ALL"}
              onValueChange={(value) => handleSelectChange("action", value)}
            >
              <SelectTrigger
                id="audit-action"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="All actions" />
              </SelectTrigger>

              <SelectContent className="max-h-72 rounded-xl border-border/60">
                <SelectItem value="ALL">All actions</SelectItem>

                {ACTIONS.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resource */}
          <div className="space-y-1.5">
            <label
              htmlFor="audit-resource"
              className="text-xs font-medium text-muted-foreground"
            >
              Resource
            </label>

            <Select
              value={filters.resource ?? "ALL"}
              onValueChange={(value) => handleSelectChange("resource", value)}
            >
              <SelectTrigger
                id="audit-resource"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="All resources" />
              </SelectTrigger>

              <SelectContent className="max-h-72 rounded-xl border-border/60">
                <SelectItem value="ALL">All resources</SelectItem>

                {RESOURCES.map((resource) => (
                  <SelectItem key={resource} value={resource}>
                    {resource.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label
              htmlFor="audit-date"
              className="text-xs font-medium text-muted-foreground"
            >
              Created Date
            </label>

            <Select
              value={filters.createdAt ?? "ALL"}
              onValueChange={(value) => handleSelectChange("createdAt", value)}
            >
              <SelectTrigger
                id="audit-date"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="Any date" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60">
                <SelectItem value="ALL">Any date</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="space-y-1.5">
            <label
              htmlFor="audit-sort"
              className="text-xs font-medium text-muted-foreground"
            >
              Sort Order
            </label>

            <Select
              value={filters.sortOrder ?? "desc"}
              onValueChange={(value) => handleSelectChange("sortOrder", value)}
            >
              <SelectTrigger
                id="audit-sort"
                className={premiumSelectTriggerClass}
              >
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-border/60">
                <SelectItem value="desc">
                  <span className="flex items-center gap-2">
                    <ArrowDownAZ className="size-3.5" />
                    Newest First
                  </span>
                </SelectItem>

                <SelectItem value="asc">
                  <span className="flex items-center gap-2">
                    <ArrowUpAZ className="size-3.5" />
                    Oldest First
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Filter className="size-3.5" />
          <CalendarDays className="size-3.5" />
          <span>Filters update the audit log automatically.</span>
        </div>
      </div>
    </div>
  );
};

export default AuditFilter;
