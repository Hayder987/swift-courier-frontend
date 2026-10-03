"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
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
  IShipment,
  ShipmentQueryParams,
  ShipmentStatus,
  ShipmentType,
} from "@/types/shipment.type";

interface AdminShipmentFilterProps {
  search: string;
  filters: ShipmentQueryParams;
  shipments: IShipment[];
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof ShipmentQueryParams, value: string) => void;
  onReset: () => void;
}

const STATUS_OPTIONS: ShipmentStatus[] = [
  "CREATED",
  "READY_FOR_PAYMENT",
  "PENDING",
  "ASSIGNED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "DELIVERY_FAILED",
  "RETURNED",
  "CANCELLED",
];

const TYPE_OPTIONS: ShipmentType[] = ["NEW", "OLD"];

const DATE_OPTIONS = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "yesterday",
    label: "Yesterday",
  },
  {
    value: "last_week",
    label: "Last Week",
  },
] as const;

const SORT_BY_OPTIONS = [
  {
    value: "createdAt",
    label: "Created Date",
  },
  {
    value: "updatedAt",
    label: "Updated Date",
  },
] as const;

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ShipmentFilter = ({
  search,
  filters,
  shipments,
  onSearchChange,
  onFilterChange,
  onReset,
}: AdminShipmentFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const zones = useMemo(() => {
    const zoneMap = new Map<
      string,
      {
        id: string;
        name: string;
        code: string;
      }
    >();

    for (const shipment of shipments) {
      if (shipment.pickupZone) {
        zoneMap.set(shipment.pickupZone.id, {
          id: shipment.pickupZone.id,
          name: shipment.pickupZone.name,
          code: shipment.pickupZone.code,
        });
      }

      if (shipment.deliveryZone) {
        zoneMap.set(shipment.deliveryZone.id, {
          id: shipment.deliveryZone.id,
          name: shipment.deliveryZone.name,
          code: shipment.deliveryZone.code,
        });
      }
    }

    return Array.from(zoneMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [shipments]);

  const pickupZoneItems = useMemo(() => {
    if (
      filters.pickupZoneId &&
      !zones.some((zone) => zone.id === filters.pickupZoneId)
    ) {
      return [
        {
          id: filters.pickupZoneId,
          name: "Selected Pickup Zone",
          code: "",
        },
        ...zones,
      ];
    }

    return zones;
  }, [filters.pickupZoneId, zones]);

  const deliveryZoneItems = useMemo(() => {
    if (
      filters.deliveryZoneId &&
      !zones.some((zone) => zone.id === filters.deliveryZoneId)
    ) {
      return [
        {
          id: filters.deliveryZoneId,
          name: "Selected Delivery Zone",
          code: "",
        },
        ...zones,
      ];
    }

    return zones;
  }, [filters.deliveryZoneId, zones]);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (search.trim()) count += 1;
    if (filters.status) count += 1;
    if (filters.type) count += 1;
    if (filters.dateFilter) count += 1;
    if (filters.pickupZoneId) count += 1;
    if (filters.deliveryZoneId) count += 1;

    return count;
  }, [
    search,
    filters.status,
    filters.type,
    filters.dateFilter,
    filters.pickupZoneId,
    filters.deliveryZoneId,
  ]);

  const handleSelectChange = (
    key: keyof ShipmentQueryParams,
    value: string | null,
  ) => {
    onFilterChange(key, value ?? "");
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="w-full">
      {/* Filter Toggle */}
      <div className="flex items-center justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          aria-controls="shipment-filter-panel"
          className={[
            "group relative h-10 gap-2 overflow-hidden rounded-xl",
            "border-border/60 bg-card/80 px-3.5",
            "text-xs font-semibold shadow-sm backdrop-blur-xl",
            "transition-all duration-300",
            "hover:border-[#e50914]/40",
            "hover:bg-[#e50914]/5",
            "hover:shadow-[0_0_20px_rgba(229,9,20,0.10)]",
            "focus-visible:border-[#e50914]/40",
            "focus-visible:ring-[#e50914]/20",
            isOpen
              ? "border-[#e50914]/40 bg-[#e50914]/5 text-[#e50914] shadow-[0_0_20px_rgba(229,9,20,0.10)]"
              : "text-foreground",
          ].join(" ")}
        >
          {/* Subtle Premium Glow */}
          <span
            className={[
              "pointer-events-none absolute inset-0",
              "bg-[radial-gradient(circle_at_50%_-20%,rgba(229,9,20,0.18),transparent_65%)]",
              "opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100",
              isOpen ? "opacity-100" : "",
            ].join(" ")}
          />

          <motion.span
            animate={{
              rotate: isOpen ? 90 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="relative z-10 flex"
          >
            <Filter className="size-3.5" />
          </motion.span>

          <span className="relative z-10">Filters</span>

          <AnimatePresence initial={false}>
            {activeFilterCount > 0 && (
              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="relative z-10 flex size-5 items-center justify-center rounded-full bg-[#e50914] text-[10px] font-bold text-white shadow-[0_0_10px_rgba(229,9,20,0.35)]"
              >
                {activeFilterCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Animated Filter Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="shipment-filter-panel"
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-sm backdrop-blur-xl">
                {/* Ambient Glow */}
                <div className="pointer-events-none absolute -right-32 -top-32 size-64 rounded-full bg-[#e50914]/5 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-32 -left-32 size-56 rounded-full bg-[#e50914]/3 blur-3xl" />

                <div className="relative p-3 sm:p-4">
                  {/* Panel Header */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
                        <SlidersHorizontal className="size-3.5" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold tracking-tight">
                          Shipment Filters
                        </h2>

                        <p className="hidden text-[11px] text-muted-foreground sm:block">
                          Refine shipments instantly
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        className="h-8 gap-1.5 rounded-lg px-2.5 text-xs text-muted-foreground hover:bg-[#e50914]/5 hover:text-[#e50914]"
                      >
                        <RotateCcw className="size-3.5" />
                        <span>Reset</span>
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close filters"
                        className="size-8 rounded-lg p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-8">
                    {/* Search */}
                    <div className="space-y-1 lg:col-span-2">
                      <Label
                        htmlFor="shipment-search"
                        className="text-[11px] font-medium text-muted-foreground"
                      >
                        Search
                      </Label>

                      <div className="relative">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          id="shipment-search"
                          value={search}
                          onChange={(event) =>
                            onSearchChange(event.target.value)
                          }
                          placeholder="Tracking, parcel or customer..."
                          className="h-9 rounded-lg border-border/60 bg-background/60 pl-8 text-xs shadow-none placeholder:text-muted-foreground/60 focus-visible:border-[#e50914]/40 focus-visible:ring-[#e50914]/10"
                        />
                      </div>
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
                        <SelectTrigger className="h-9 w-full rounded-lg border-border/60 bg-background/60 text-xs shadow-none">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>

                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {formatStatus(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Type */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Type
                      </Label>

                      <Select
                        value={filters.type ?? "all"}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "type",
                            value === "all" ? "" : value,
                          )
                        }
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg border-border/60 bg-background/60 text-xs shadow-none">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>

                          {TYPE_OPTIONS.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Date
                      </Label>

                      <Select
                        value={filters.dateFilter ?? "all"}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "dateFilter",
                            value === "all" ? "" : value,
                          )
                        }
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg border-border/60 bg-background/60 text-xs shadow-none">
                          <CalendarDays className="mr-1 size-3.5 shrink-0 text-muted-foreground" />

                          <SelectValue placeholder="All Dates" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">All Dates</SelectItem>

                          {DATE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pickup Zone */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Pickup Zone
                      </Label>

                      <Select
                        value={filters.pickupZoneId ?? "all"}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "pickupZoneId",
                            value === "all" ? "" : value,
                          )
                        }
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg border-border/60 bg-background/60 text-xs shadow-none">
                          <SelectValue placeholder="All Pickup Zones" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">All Pickup Zones</SelectItem>

                          {pickupZoneItems.map((zone) => (
                            <SelectItem
                              key={`pickup-${zone.id}`}
                              value={zone.id}
                            >
                              {zone.code
                                ? `${zone.name} (${zone.code})`
                                : zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Delivery Zone */}
                    <div className="space-y-1">
                      <Label className="text-[11px] font-medium text-muted-foreground">
                        Delivery Zone
                      </Label>

                      <Select
                        value={filters.deliveryZoneId ?? "all"}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "deliveryZoneId",
                            value === "all" ? "" : value,
                          )
                        }
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg border-border/60 bg-background/60 text-xs shadow-none">
                          <SelectValue placeholder="All Delivery Zones" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="all">
                            All Delivery Zones
                          </SelectItem>

                          {deliveryZoneItems.map((zone) => (
                            <SelectItem
                              key={`delivery-${zone.id}`}
                              value={zone.id}
                            >
                              {zone.code
                                ? `${zone.name} (${zone.code})`
                                : zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort By */}
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
                        <SelectTrigger className="h-9 w-full rounded-lg border-border/60 bg-background/60 text-xs shadow-none">
                          <SelectValue placeholder="Created Date" />
                        </SelectTrigger>

                        <SelectContent>
                          {SORT_BY_OPTIONS.map((option) => (
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
                        Sort Order
                      </Label>

                      <Select
                        value={filters.sortOrder ?? "desc"}
                        onValueChange={(value) =>
                          handleSelectChange("sortOrder", value)
                        }
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg border-border/60 bg-background/60 text-xs shadow-none">
                          <SelectValue placeholder="Newest First" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="desc">Newest First</SelectItem>

                          <SelectItem value="asc">Oldest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex items-center gap-1.5 border-t border-border/40 pt-2.5 text-[10px] text-muted-foreground">
                    <Filter className="size-3 shrink-0" />

                    <span>Filters are applied automatically.</span>
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

export default ShipmentFilter;
