"use client";

import {
  Activity,
  CalendarDays,
  Code2,
  Crosshair,
  MapPin,
  Navigation,
  Ruler,
} from "lucide-react";

import CommonBoundaryMap from "@/components/common/CommonBoundaryMap";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { ISingleZone } from "@/types/zone.type";

interface AdminZoneDetailsSheetProps {
  zone: ISingleZone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const AdminZoneDetailsSheet = ({
  zone,
  open,
  onOpenChange,
}: AdminZoneDetailsSheetProps) => {
  if (!zone) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border/60 p-0 sm:max-w-2xl"
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-32 bg-[#e50914]/10 blur-3xl" />

          <SheetHeader className="relative border-b border-border/60 px-5 py-6 sm:px-7">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914] shadow-sm">
                <MapPin className="size-6" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <SheetTitle className="text-xl font-bold tracking-tight">
                    {zone.name}
                  </SheetTitle>

                  <Badge
                    variant={zone.isActive ? "default" : "secondary"}
                    className={
                      zone.isActive
                        ? "border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-0"
                    }
                  >
                    {zone.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <SheetDescription className="mt-1">
                  Zone details, location and boundary information.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="space-y-6 px-5 py-6 sm:px-7">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Code2 className="size-4" />
                  <span className="text-xs font-medium">Zone Code</span>
                </div>

                <p className="font-mono text-sm font-bold tracking-wide">
                  {zone.code}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Ruler className="size-4" />
                  <span className="text-xs font-medium">Radius</span>
                </div>

                <p className="text-sm font-bold">{zone.radiusKm} KM</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Navigation className="size-4" />
                  <span className="text-xs font-medium">Latitude</span>
                </div>

                <p className="break-all font-mono text-xs font-semibold">
                  {zone.latitude}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Navigation className="size-4" />
                  <span className="text-xs font-medium">Longitude</span>
                </div>

                <p className="break-all font-mono text-xs font-semibold">
                  {zone.longitude}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                  <MapPin className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Zone Address
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-6">
                    {zone.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Boundary Coverage</h3>

                  <p className="text-xs text-muted-foreground">
                    Geographic polygon for this delivery zone.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Crosshair className="size-3.5" />
                  {zone.boundary.coordinates?.[0]?.length ?? 0} points
                </div>
              </div>

              <CommonBoundaryMap
                boundary={zone.boundary}
                latitude={zone.latitude}
                longitude={zone.longitude}
                className="min-h-90"
              />
            </div>

            <Separator />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4" />

                  <span className="text-xs font-medium">Created</span>
                </div>

                <p className="mt-2 text-xs font-semibold">
                  {formatDate(zone.createdAt)}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="size-4" />

                  <span className="text-xs font-medium">Last Updated</span>
                </div>

                <p className="mt-2 text-xs font-semibold">
                  {formatDate(zone.updatedAt)}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e50914]/20 bg-[#e50914]/5 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Zone ID
              </p>

              <p className="mt-1 break-all font-mono text-[11px] font-semibold text-[#e50914]">
                {zone.id}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminZoneDetailsSheet;
