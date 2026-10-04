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
import {
  formatMoney,
  getInitials,
  statusClassName,
  typeClassName,
} from "@/utils/DashBoard/shipment.utils";
import AdminShipmentUpdateDialog from "./admin-shipment-dialog";
import AdminShipmenDetailsSheet from "./admin-shipment-sheet";
import ProcessSpinner from "@/components/loading/process-spinner";

interface AdminShipmentTableComponentProps {
  shipment: IShipment;
}

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
                disabled = {isAssigningCourier}
                size="icon"
                className="size-8 rounded-lg"
                aria-label={`Actions for ${shipment.trackingNumber}`}
              >
                {isAssigningCourier ? (
                  <ProcessSpinner />
                ) : (
                  <MoreHorizontal className="size-4" />
                )}
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
