"use client";

import { BadgeCheck, BadgeX, Eye } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { IShipment } from "@/types/shipment.type";
import {
  formatMoney,
  getInitials,
  statusClassName,
  typeClassName,
} from "@/utils/DashBoard/shipment.utils";
import MyShipmenDetailsSheet from "./myShipment-sheet";
import PaymentButton from "./payment-button";

interface MyShipmentTableComponentProps {
  shipment: IShipment;
}

const MyShipmentTableComponent = ({
  shipment,
}: MyShipmentTableComponentProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

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

      {/* Payment */}
      <TableCell className="text-right">
        <span>
          {shipment?.status === "READY_FOR_PAYMENT" ? (
            <PaymentButton shipmentId={shipment.id} />
          ) : (
            <Button variant={"outline"} className={""}>
              {shipment?.status === "CREATED" ? (
                <span className="flex items-center gap-2 text-yellow-600">
                  <BadgeX className="size-4" />
                  Not Approved
                </span>
              ) : (
                <span className="flex items-center text-green-600 gap-2">
                  <BadgeCheck className="size-4" />
                  Paid
                </span>
              )}
            </Button>
          )}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <span>
          <Button
            variant="outline"
            onClick={() => setDetailsOpen(true)}
            className="gap-2 rounded-lg"
          >
            <Eye className="size-4" />
            View Details
          </Button>
        </span>
      </TableCell>

      {/* Details */}
      <MyShipmenDetailsSheet
        shipment={shipment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};

export default MyShipmentTableComponent;
