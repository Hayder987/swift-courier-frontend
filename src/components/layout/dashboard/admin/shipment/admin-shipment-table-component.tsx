"use client";

import { Eye, MoreHorizontal, RefreshCcw, UserRoundCheck } from "lucide-react";
import type { FetchError } from "ofetch";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { useAssignCourierShipment } from "@/hooks/shipment.hook";
import { cn } from "@/lib/utils";
import type { IShipment, ShipmentStatus } from "@/types/shipment.type";
import AdminShipmentUpdateDialog from "./admin-shipment-dialog";
import AdminShipmenDetailsSheet from "./admin-shipment-sheet";

interface AdminShipmentTableComponentProps {
  shipment: IShipment;
}

const statusClassName = (status: ShipmentStatus) => {
  switch (status) {
    case "CREATED":
      return "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-300";
    case "READY_FOR_PAYMENT":
      return "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400";
    case "PENDING":
      return "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "ASSIGNED":
      return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "PICKED_UP":
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";
    case "IN_TRANSIT":
      return "border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
    case "OUT_FOR_DELIVERY":
      return "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400";
    case "DELIVERED":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "DELIVERY_FAILED":
      return "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400";
    case "RETURNED":
      return "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400";
    case "CANCELLED":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const typeClassName = (type: IShipment["type"]) =>
  type === "NEW"
    ? "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]"
    : "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400";

const formatMoney = (value: string | null) => {
  if (!value) return "—";

  const amount = Number(value);

  if (Number.isNaN(amount)) return value;

  return `৳${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AdminShipmentTableComponent = ({
  shipment,
}: AdminShipmentTableComponentProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);

  const [selectedShipment, setSelectedShipment] = useState<IShipment | null>(
    null,
  );

  const [selectedStatus, setSelectedStatus] = useState<
    ShipmentStatus | undefined
  >();

  const { mutate: assignCourier, isPending: isAssigningCourier } =
    useAssignCourierShipment(shipment.id);

  const openUpdateDialog = (selected: IShipment, status?: ShipmentStatus) => {
    setSelectedShipment(selected);
    setSelectedStatus(status);
    setUpdateOpen(true);
  };

  const handleAssignCourier = () => {
    if (shipment.status !== "PENDING") return;

    assignCourier(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Courier Assigned",
          description: `${shipment.trackingNumber} has been assigned successfully.`,
          type: "success",
        });
      },

      onError: (error: FetchError) => {
        const errorMessage =
          error.data?.message ??
          error.data?.errors?.[0]?.message ??
          error.message ??
          "Unable to assign courier.";

        toast.add({
          title: "Assignment Failed",
          description: errorMessage,
          type: "error",
        });
      },
    });
  };

  return (
    <>
      {/* Shipment */}
      <TableCell className="min-w-65">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 shrink-0 rounded-xl border border-border/60">
            <AvatarImage
              src={shipment.imageUrl ?? undefined}
              alt={shipment.parcelName}
            />

            <AvatarFallback className="rounded-xl bg-[#e50914]/10 font-semibold text-[#e50914]">
              {getInitials(shipment.parcelName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {shipment.parcelName}
            </p>

            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {shipment.trackingNumber}
            </p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {shipment.pickupZone.code} → {shipment.deliveryZone.code}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Customer */}
      <TableCell className="min-w-45">
        <div className="flex flex-col">
          <span className="truncate text-sm font-medium">
            {shipment.customer.name}
          </span>

          <span className="truncate text-xs text-muted-foreground">
            {shipment.customer.phone}
          </span>

          <span className="truncate text-xs text-muted-foreground">
            {shipment.customer.email}
          </span>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold",
            statusClassName(shipment.status),
          )}
        >
          {shipment.status.replaceAll("_", " ")}
        </Badge>
      </TableCell>

      {/* Type */}
      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-semibold",
            typeClassName(shipment.type),
          )}
        >
          {shipment.type}
        </Badge>
      </TableCell>

      {/* Route */}
      <TableCell className="hidden lg:table-cell">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">
            {shipment.pickupZone.name}
          </span>

          <span className="text-[10px] text-muted-foreground">↓</span>

          <span className="text-xs font-medium">
            {shipment.deliveryZone.name}
          </span>
        </div>
      </TableCell>

      {/* Fee */}
      <TableCell className="hidden whitespace-nowrap xl:table-cell">
        <span className="text-sm font-semibold">
          {formatMoney(shipment.deliveryFee)}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 rounded-lg"
                aria-label={`Actions for ${shipment.trackingNumber}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          >
            <span />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuItem
              onClick={() => setDetailsOpen(true)}
              className="gap-2 rounded-lg"
            >
              <Eye className="size-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={
                shipment.status === "RETURNED" ||
                shipment.status === "CANCELLED"
              }
              onClick={() => openUpdateDialog(shipment)}
              className="gap-2 rounded-lg"
            >
              <RefreshCcw className="size-4" />
              Update Status
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={shipment.status !== "PENDING" || isAssigningCourier}
              onClick={handleAssignCourier}
              className="gap-2 rounded-lg"
            >
              <UserRoundCheck className="size-4" />

              {isAssigningCourier
                ? "Assigning..."
                : shipment.status === "PENDING"
                  ? "Assign Courier"
                  : "Assign Courier — Pending Only"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      {/* Details */}
      <AdminShipmenDetailsSheet
        shipment={shipment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onUpdateStatus={(selected, status) => {
          setDetailsOpen(false);

          window.setTimeout(() => {
            openUpdateDialog(selected, status);
          }, 150);
        }}
      />

      {/* Update */}
      <AdminShipmentUpdateDialog
        shipment={selectedShipment}
        initialStatus={selectedStatus}
        open={updateOpen}
        onOpenChange={(open) => {
          setUpdateOpen(open);

          if (!open) {
            setSelectedShipment(null);
            setSelectedStatus(undefined);
          }
        }}
      />
    </>
  );
};

export default AdminShipmentTableComponent;
