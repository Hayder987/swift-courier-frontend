"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  IAdminUserQueryParams,
  UserRole,
  UserStatus,
} from "@/types/admin.employee.types";

interface AdminUserFilterProps {
  search: string;
  filters: IAdminUserQueryParams;
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof IAdminUserQueryParams, value: string) => void;
  onReset: () => void;
}

const ROLE_OPTIONS: UserRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "COURIER",
  "CUSTOMER",
];

const STATUS_OPTIONS: UserStatus[] = ["ACTIVE", "SUSPENDED", "DELETED"];

const AUTH_METHOD_OPTIONS = ["CREDENTIALS", "GOOGLE"] as const;

const SORT_OPTIONS = [
  {
    value: "createdAt",
    label: "Created Date",
  },
  {
    value: "updatedAt",
    label: "Updated Date",
  },
];

const formatLabel = (value: string) => {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const AdminUserFilter = ({
  search,
  filters,
  onSearchChange,
  onFilterChange,
  onReset,
}: AdminUserFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (search.trim()) count += 1;
    if (filters.role) count += 1;
    if (filters.status) count += 1;
    if (filters.authMethod) count += 1;
    if (filters.sortBy !== "createdAt") count += 1;
    if (filters.sortOrder !== "desc") count += 1;

    return count;
  }, [
    search,
    filters.role,
    filters.status,
    filters.authMethod,
    filters.sortBy,
    filters.sortOrder,
  ]);

  const handleSelectChange = (
    key: keyof IAdminUserQueryParams,
    value: string | null,
  ) => {
    onFilterChange(key, value ?? "");
  };

  return (
    <div className="w-full">
      {/* Filter Button */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          className={[
            "group relative h-10 gap-2 overflow-hidden rounded-xl",
            "border-border/60 bg-card/80 px-3.5",
            "text-xs font-semibold shadow-sm backdrop-blur-xl",
            "transition-all duration-300",
            "hover:border-[#e50914]/40 hover:bg-[#e50914]/5",
            isOpen ? "border-[#e50914]/40 bg-[#e50914]/5 text-[#e50914]" : "",
          ].join(" ")}
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(229,9,20,0.18),transparent_65%)] opacity-0 transition-opacity group-hover:opacity-100" />

          <motion.span
            animate={{
              rotate: isOpen ? 90 : 0,
            }}
            className="relative z-10 flex"
          >
            <Filter className="size-3.5" />
          </motion.span>

          <span className="relative z-10">Filters</span>

          {activeFilterCount > 0 && (
            <span className="relative z-10 flex size-5 items-center justify-center rounded-full bg-[#e50914] text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-sm backdrop-blur-xl">
                <div className="pointer-events-none absolute -right-32 -top-32 size-64 rounded-full bg-[#e50914]/5 blur-3xl" />

                <div className="relative p-3 sm:p-4">
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
                        <SlidersHorizontal className="size-3.5" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold">User Filters</h2>

                        <p className="hidden text-[11px] text-muted-foreground sm:block">
                          Refine your user list instantly
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={onReset}
                        className="h-8 gap-1.5 rounded-lg px-2.5 text-xs text-muted-foreground hover:bg-[#e50914]/5 hover:text-[#e50914]"
                      >
                        <RotateCcw className="size-3.5" />
                        Reset
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        className="size-8 rounded-lg p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
                    {/* Search */}
                    <div className="space-y-1 lg:col-span-2">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Search
                      </Label>

                      <div className="relative">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          value={search}
                          onChange={(event) =>
                            onSearchChange(event.target.value)
                          }
                          placeholder="Name, email or phone..."
                          className="h-9 rounded-lg border-border/60 bg-background/60 pl-8 text-xs shadow-none focus-visible:border-[#e50914]/40 focus-visible:ring-[#e50914]/10"
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Role
                      </Label>

                      <Select
                        value={filters.role ?? "all"}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "role",
                            value === "all" ? "" : value,
                          )
                        }
                      >
                        <SelectTrigger className="h-9 rounded-lg border-border/60 bg-background/60 text-xs">
                          <SelectValue placeholder="All Roles" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>

                          {ROLE_OPTIONS.map((role) => (
                            <SelectItem key={role} value={role}>
                              {formatLabel(role)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Status
                      </Label>

                      <Select
                        value={filters.status ?? "all"}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "status",
                            value === "all" ? "" : value,
                          )
                        }
                      >
                        <SelectTrigger className="h-9 rounded-lg border-border/60 bg-background/60 text-xs">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>

                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {formatLabel(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Auth */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Auth Method
                      </Label>

                      <Select
                        value={filters.authMethod ?? "all"}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "authMethod",
                            value === "all" ? "" : value,
                          )
                        }
                      >
                        <SelectTrigger className="h-9 rounded-lg border-border/60 bg-background/60 text-xs">
                          <SelectValue placeholder="All Methods" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>

                          {AUTH_METHOD_OPTIONS.map((method) => (
                            <SelectItem key={method} value={method}>
                              {formatLabel(method)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Sort By
                      </Label>

                      <Select
                        value={filters.sortBy ?? "createdAt"}
                        onValueChange={(value) =>
                          handleSelectChange("sortBy", value)
                        }
                      >
                        <SelectTrigger className="h-9 rounded-lg border-border/60 bg-background/60 text-xs">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort Order */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Order
                      </Label>

                      <Select
                        value={filters.sortOrder ?? "desc"}
                        onValueChange={(value) =>
                          handleSelectChange("sortOrder", value)
                        }
                      >
                        <SelectTrigger className="h-9 rounded-lg border-border/60 bg-background/60 text-xs">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="desc">Newest First</SelectItem>

                          <SelectItem value="asc">Oldest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 border-t border-border/40 pt-2.5 text-[10px] text-muted-foreground">
                    <Filter className="size-3" />
                    Filters are applied automatically.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUserFilter;
