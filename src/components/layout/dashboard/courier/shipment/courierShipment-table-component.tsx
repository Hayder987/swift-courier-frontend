"use client";

import { Eye, MapPinOff, Package, PencilLine } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";

import type { IShipment } from "@/types/shipment.type";

import MyShipmenDetailsSheet from "../../customer/shipment/my-shipment/myShipment-sheet";
import CourierShipmentUpdateDialog from "./courierShipment-update-dialog";
import LocationButton from "./LocationButton";

interface CourierShipmentTableComponentProps {
  shipment: IShipment;
  courierType: "pickup" | "delivery";
}

const getStatusClassName = (status: IShipment["status"]) => {
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

const CourierShipmentTableComponent = ({
  shipment,
  courierType,
}: CourierShipmentTableComponentProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);

  const latitude =
    courierType === "delivery" ? shipment.deliveryLat : shipment.pickupLat;

  const longitude =
    courierType === "delivery" ? shipment.deliveryLng : shipment.pickupLng;

  const destinationLabel =
    courierType === "delivery" ? "Delivery Location" : "Pickup Location";

  const hasValidLocation =
    Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude));

  const canUpdate =
    courierType === "pickup"
      ? shipment.status === "ASSIGNED"
      : shipment.status === "OUT_FOR_DELIVERY";

  return (
    <>
      {/* Shipment */}
      <TableCell className="align-middle">
        <div className="flex min-w-57.5 items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
            {shipment.imageUrl ? (
              <Image
                src={shipment.imageUrl}
                alt={shipment.parcelName}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-[#e50914]/10 text-[#e50914]">
                <Package className="size-5" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {shipment.parcelName}
            </p>

            <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
              {shipment.trackingNumber}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Customer */}
      <TableCell className="align-middle">
        <div className="min-w-42.5">
          <p className="truncate text-sm font-medium">
            {shipment.customer.name}
          </p>

          <p className="mt-1 truncate text-xs text-muted-foreground">
            {shipment.customer.phone}
          </p>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell className="align-middle">
        <Badge
          variant="outline"
          className={`whitespace-nowrap rounded-full text-[10px] font-semibold ${getStatusClassName(
            shipment.status,
          )}`}
        >
          {shipment.status.replaceAll("_", " ")}
        </Badge>
      </TableCell>

      {/* Type */}
      <TableCell className="align-middle">
        <Badge
          variant="outline"
          className="whitespace-nowrap rounded-full text-[10px] uppercase"
        >
          {shipment.type}
        </Badge>
      </TableCell>

      {/* Route */}
      <TableCell className="hidden align-middle lg:table-cell">
        <div className="min-w-45">
          <p className="truncate text-xs font-medium">
            {shipment.pickupZone.name}
          </p>

          <div className="my-1 h-px w-10 bg-border" />

          <p className="truncate text-xs text-muted-foreground">
            {shipment.deliveryZone.name}
          </p>
        </div>
      </TableCell>

      {/* Fee */}
      <TableCell className="hidden align-middle xl:table-cell">
        <div className="min-w-22.5">
          <p className="text-sm font-semibold">
            {shipment.deliveryFee ? `৳${shipment.deliveryFee}` : "—"}
          </p>
        </div>
      </TableCell>

      {/* Location */}
      <TableCell className="align-middle text-right">
        <div className="flex min-w-32.5 justify-end">
          {hasValidLocation ? (
            <LocationButton
              latitude={latitude}
              longitude={longitude}
              destinationLabel={destinationLabel}
            />
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled
              className="h-8 rounded-lg text-xs"
            >
              <span className="flex items-center gap-1.5 text-yellow-600">
                <MapPinOff className="size-3.5" />
                Not Assigned
              </span>
            </Button>
          )}
        </div>
      </TableCell>

      {/* Action */}
      <TableCell className="align-middle text-right">
        <div className="flex min-w-30 items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setDetailsOpen(true)}
            className="h-8 gap-1.5 rounded-lg"
            title="View shipment details"
            aria-label="View shipment details"
          >
            <Eye className="size-3.5" />

            <span className="hidden xl:inline">Details</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={!canUpdate}
            onClick={() => setUpdateOpen(true)}
            className="size-8 rounded-lg border-[#e50914]/20 text-[#e50914] hover:bg-[#e50914]/10 hover:text-[#e50914]"
            title={canUpdate ? "Update shipment" : "No status update available"}
            aria-label="Update shipment"
          >
            <PencilLine className="size-3.5" />
          </Button>
        </div>
      </TableCell>

      <MyShipmenDetailsSheet
        shipment={shipment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <CourierShipmentUpdateDialog
        shipment={shipment}
        courierType={courierType}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />
    </>
  );
};

export default CourierShipmentTableComponent;
