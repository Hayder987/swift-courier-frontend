"use client";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  MapPin,
  Package,
  Phone,
  RefreshCcw,
  Route,
  UserRound,
  Weight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IShipment, ShipmentStatus } from "@/types/shipment.type";
import ShipmentCourierCard from "../../commmon/shipment-courier-card";

interface AdminShipmenDetailsSheetProps {
  shipment: IShipment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (shipment: IShipment, status?: ShipmentStatus) => void;
}

const statusFlow: Record<ShipmentStatus, ShipmentStatus[]> = {
  CREATED: ["READY_FOR_PAYMENT", "CANCELLED"],
  READY_FOR_PAYMENT: ["PENDING", "CANCELLED"],
  PENDING: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["PICKED_UP", "CANCELLED"],
  PICKED_UP: ["IN_TRANSIT", "CANCELLED"],
  IN_TRANSIT: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "DELIVERY_FAILED", "CANCELLED"],
  DELIVERED: ["RETURNED"],
  DELIVERY_FAILED: ["RETURNED"],
  RETURNED: [],
  CANCELLED: [],
};

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

const typeClassName = (type: IShipment["type"]) => {
  return type === "NEW"
    ? "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]"
    : "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400";
};

const formatDate = (date: string | null) => {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const formatMoney = (value: string | null) => {
  if (!value) return "Not calculated";

  const amount = Number(value);

  if (Number.isNaN(amount)) return value;

  return `৳${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/20 p-3.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-medium">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
};

const AddressCard = ({
  title,
  zone,
  address,
  lat,
  lng,
}: {
  title: string;
  zone: IShipment["pickupZone"];
  address: IShipment["pickupAddress"];
  lat: string;
  lng: string;
}) => {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
          <MapPin className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold">{title}</p>

          <p className="text-xs text-muted-foreground">
            {zone.name} ({zone.code})
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {address.fullAddress}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="outline" className="rounded-full text-[10px]">
          Lat: {lat}
        </Badge>

        <Badge variant="outline" className="rounded-full text-[10px]">
          Lng: {lng}
        </Badge>
      </div>
    </div>
  );
};

const AdminShipmenDetailsSheet = ({
  shipment,
  open,
  onOpenChange,
  onUpdateStatus,
}: AdminShipmenDetailsSheetProps) => {
  if (!shipment) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" />
      </Sheet>
    );
  }

  const nextStatuses = statusFlow[shipment.status];

  const latestTracking =
    shipment.tracking.length > 0
      ? shipment.tracking[shipment.tracking.length - 1]
      : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border/60 p-0 sm:max-w-2xl"
      >
        <SheetHeader className="border-b border-border/60 px-4 py-5 sm:px-6">
          <SheetTitle>Shipment Details</SheetTitle>

          <SheetDescription>
            View complete shipment, customer, courier, route and tracking
            information.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 py-5 pb-8 sm:px-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-[#e50914]/10 via-background to-background p-5">
            <div className="absolute -right-16 -top-16 size-40 rounded-full bg-[#e50914]/10 blur-3xl" />

            <div className="relative flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="size-16 rounded-2xl border border-border/60 shadow-sm">
                  <AvatarImage
                    src={shipment.imageUrl ?? undefined}
                    alt={shipment.parcelName}
                  />

                  <AvatarFallback className="rounded-2xl bg-[#e50914]/10 font-semibold text-[#e50914]">
                    <Package className="size-6" />
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold">
                      {shipment.parcelName}
                    </h3>

                    <Badge
                      variant="outline"
                      className={`rounded-full ${typeClassName(shipment.type)}`}
                    >
                      {shipment.type}
                    </Badge>
                  </div>

                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {shipment.trackingNumber}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={`rounded-full ${statusClassName(
                        shipment.status,
                      )}`}
                    >
                      {shipment.status.replaceAll("_", " ")}
                    </Badge>
                  </div>
                </div>
              </div>

              {nextStatuses.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {nextStatuses.map((nextStatus) => (
                    <Button
                      key={nextStatus}
                      type="button"
                      size="sm"
                      variant={
                        nextStatus === "CANCELLED" ? "outline" : "default"
                      }
                      onClick={() => onUpdateStatus(shipment, nextStatus)}
                      className={
                        nextStatus === "CANCELLED"
                          ? "rounded-xl border-red-500/30 text-red-600 hover:bg-red-500/10 dark:text-red-400"
                          : "rounded-xl bg-[#e50914] text-white hover:bg-[#c70811]"
                      }
                    >
                      {nextStatus.replaceAll("_", " ")}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Shipment Information */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Package className="size-4 text-[#e50914]" />

              <h4 className="text-sm font-semibold">Shipment Information</h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={Package}
                label="Parcel"
                value={shipment.parcelName}
              />

              <DetailItem
                icon={Weight}
                label="Weight"
                value={`${shipment.parcelWeightGM} GM`}
              />

              <DetailItem
                icon={CreditCard}
                label="Delivery Fee"
                value={formatMoney(shipment.deliveryFee)}
              />

              <DetailItem
                icon={Route}
                label="Distance"
                value={
                  shipment.deliveryDistance
                    ? `${shipment.deliveryDistance} KM`
                    : "Not calculated"
                }
              />

              <DetailItem
                icon={CalendarDays}
                label="Created"
                value={formatDate(shipment.createdAt)}
              />

              <DetailItem
                icon={Clock3}
                label="Updated"
                value={formatDate(shipment.updatedAt)}
              />
            </div>

            <div className="mt-3 rounded-xl border border-border/50 bg-muted/20 p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Description
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground/80">
                {shipment.description || "No description provided."}
              </p>
            </div>
          </section>

          <Separator />

          {/* Customer */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="size-4 text-[#e50914]" />

              <h4 className="text-sm font-semibold">Customer Information</h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={UserRound}
                label="Name"
                value={shipment.customer.name}
              />

              <DetailItem
                icon={Phone}
                label="Phone"
                value={shipment.customer.phone}
              />

              <DetailItem
                icon={FileText}
                label="Email"
                value={shipment.customer.email}
              />

              <DetailItem
                icon={FileText}
                label="Customer ID"
                value={shipment.customer.id}
              />
            </div>
          </section>

          <Separator />

          {/* Couriers */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="size-4 text-[#e50914]" />

              <div>
                <h4 className="text-sm font-semibold">Courier Assignment</h4>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Pickup and delivery courier information
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-1">
              <ShipmentCourierCard
                title="Pickup Courier"
                courier={shipment.pickupCourier}
                type="pickup"
              />

              <ShipmentCourierCard
                title="Delivery Courier"
                courier={shipment.deliveryCourier}
                type="delivery"
              />
            </div>
          </section>

          <Separator />

          {/* Route */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Route className="size-4 text-[#e50914]" />

              <h4 className="text-sm font-semibold">Shipment Route</h4>
            </div>

            <div className="grid gap-3">
              <AddressCard
                title="Pickup"
                zone={shipment.pickupZone}
                address={shipment.pickupAddress}
                lat={shipment.pickupLat}
                lng={shipment.pickupLng}
              />

              <div className="flex justify-center">
                <div className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm">
                  <ArrowRight className="size-4 text-[#e50914]" />
                </div>
              </div>

              <AddressCard
                title="Delivery"
                zone={shipment.deliveryZone}
                address={shipment.deliveryAddress}
                lat={shipment.deliveryLat}
                lng={shipment.deliveryLng}
              />
            </div>
          </section>

          <Separator />

          {/* Tracking */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <RefreshCcw className="size-4 text-[#e50914]" />

                <h4 className="text-sm font-semibold">Tracking History</h4>
              </div>

              <Badge variant="outline" className="rounded-full text-[10px]">
                {shipment.tracking.length} events
              </Badge>
            </div>

            {shipment.tracking.length === 0 ? (
              <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-sm text-muted-foreground">
                No tracking history available.
              </div>
            ) : (
              <div className="space-y-3">
                {[...shipment.tracking].reverse().map((tracking, index) => (
                  <div key={tracking.id} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
                          index === 0
                            ? "border-[#e50914]/30 bg-[#e50914]/10 text-[#e50914]"
                            : "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {index === 0 ? (
                          <CheckCircle2 className="size-4" />
                        ) : (
                          <Clock3 className="size-4" />
                        )}
                      </div>

                      {index !== shipment.tracking.length - 1 && (
                        <div className="mt-1 h-full min-h-6 w-px bg-border" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 rounded-xl border border-border/50 bg-muted/20 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge
                          variant="outline"
                          className={`rounded-full text-[10px] ${statusClassName(
                            tracking.status,
                          )}`}
                        >
                          {tracking.status.replaceAll("_", " ")}
                        </Badge>

                        <span className="text-[10px] text-muted-foreground">
                          {formatDate(tracking.createdAt)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-5">
                        {tracking.note || "No note provided."}
                      </p>

                      {tracking.lat && tracking.lng && (
                        <p className="mt-2 text-[10px] text-muted-foreground">
                          Location: {tracking.lat}, {tracking.lng}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {latestTracking && (
              <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  Latest tracking event:{" "}
                  {latestTracking.status.replaceAll("_", " ")}
                </div>
              </div>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminShipmenDetailsSheet;
