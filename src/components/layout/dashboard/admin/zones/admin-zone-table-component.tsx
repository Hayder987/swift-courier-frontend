"use client";

import { Eye, MapPin, Pencil, Ruler, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ISingleZone } from "@/types/zone.type";
import AdminZoneDeleteDialog from "./admin-zone-delete-dialog";
import AdminZoneDetailsSheet from "./admin-zone-sheet";
import AdminZoneUpdateDialog from "./admin-zone-update-dialog";

interface AdminZoneTableComponentProps {
  zone: ISingleZone;
}

const AdminZoneTableComponent = ({ zone }: AdminZoneTableComponentProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <TableCell className="min-w-60">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
            <MapPin className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{zone.name}</p>

            <p className="mt-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {zone.code}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="min-w-55">
        <div className="max-w-65">
          <p className="truncate text-sm font-medium">{zone.address}</p>

          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <MapPin className="size-3" />
            {zone.latitude}, {zone.longitude}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold",
            zone.isActive
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-muted-foreground/20 bg-muted text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "mr-1.5 size-1.5 rounded-full",
              zone.isActive ? "bg-emerald-500" : "bg-muted-foreground",
            )}
          />

          {zone.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
            <Ruler className="size-3.5 text-muted-foreground" />
          </div>

          <div>
            <p className="text-sm font-semibold">{zone.radiusKm} KM</p>

            <p className="text-[10px] text-muted-foreground">Coverage</p>
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#e50914]" />

          <span className="text-sm font-medium">
            {zone.boundary?.coordinates?.[0]?.length ?? 0}
          </span>

          <span className="text-xs text-muted-foreground">points</span>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:bg-[#e50914]/10 hover:text-[#e50914]"
            onClick={() => setDetailsOpen(true)}
            aria-label={`View ${zone.name} details`}
          >
            <Eye className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:bg-amber-500/10 hover:text-amber-600"
            onClick={() => setUpdateOpen(true)}
            aria-label={`Update ${zone.name}`}
          >
            <Pencil className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-600"
            onClick={() => setDeleteOpen(true)}
            aria-label={`Delete ${zone.name}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>

      <AdminZoneDetailsSheet
        zone={zone}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <AdminZoneUpdateDialog
        zone={zone}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />

      <AdminZoneDeleteDialog
        zone={zone}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
};

export default AdminZoneTableComponent;
