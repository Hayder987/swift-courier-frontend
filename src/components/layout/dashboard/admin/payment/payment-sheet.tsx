"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Hash,
  MapPin,
  Package,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IPayment } from "@/types/payment.type";

interface PaymentDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: IPayment | null;
}

const currencyFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-BD", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const statusStyles: Record<IPayment["status"], string> = {
  PAID: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  PENDING:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  FAILED: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
  CANCELLED: "border-border bg-muted text-muted-foreground",
};

const DetailItem = ({
  label,
  value,
  breakAll = false,
}: {
  label: string;
  value: string | null | undefined;
  breakAll?: boolean;
}) => (
  <div className="min-w-0 space-y-1.5">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p
      className={`text-sm font-medium ${
        breakAll ? "break-all" : "break-words"
      }`}
    >
      {value || "Not available"}
    </p>
  </div>
);

const PaymentDetailsSheet = ({
  open,
  onOpenChange,
  payment,
}: PaymentDetailsSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-xl"
      >
        {payment && (
          <>
            <SheetHeader className="border-b border-border/70 bg-muted/20 px-5 py-6 text-left sm:px-7">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CreditCard className="size-6" />
              </div>

              <SheetTitle className="text-xl font-bold">
                Payment Details
              </SheetTitle>

              <SheetDescription>
                Review the transaction, payment status, and associated shipment.
              </SheetDescription>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Badge
                  variant="outline"
                  className={`rounded-lg px-3 py-1 ${statusStyles[payment.status]}`}
                >
                  {payment.status}
                </Badge>

                <Badge variant="secondary" className="rounded-lg">
                  {payment.provider}
                </Badge>
              </div>
            </SheetHeader>

            <div className="space-y-6 px-5 py-6 sm:px-7">
              <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-background p-5 sm:p-6">
                <p className="text-sm text-muted-foreground">
                  Transaction amount
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                  {currencyFormatter.format(Number(payment.amount) || 0)}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  {payment.status === "PAID" ? (
                    <CheckCircle2 className="size-4 text-emerald-600" />
                  ) : payment.status === "PENDING" ? (
                    <Clock3 className="size-4 text-amber-600" />
                  ) : (
                    <XCircle className="size-4 text-red-600" />
                  )}

                  <span>
                    {payment.status === "PAID"
                      ? "Payment completed"
                      : payment.status === "PENDING"
                        ? "Awaiting payment confirmation"
                        : payment.status === "FAILED"
                          ? "Payment failed"
                          : "Payment cancelled"}
                  </span>
                </div>
              </div>

              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                    <Hash className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">Transaction information</h3>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-5 rounded-xl border border-border/70 p-4 sm:grid-cols-2">
                  <DetailItem label="Payment ID" value={payment.id} breakAll />

                  <DetailItem
                    label="Shipment ID"
                    value={payment.shipmentId}
                    breakAll
                  />

                  <DetailItem
                    label="Transaction ID"
                    value={payment.transactionId}
                    breakAll
                  />

                  <DetailItem
                    label="Stripe / provider session"
                    value={payment.sessionId}
                    breakAll
                  />

                  <DetailItem label="Provider" value={payment.provider} />

                  <DetailItem label="Payment method" value={payment.method} />
                </div>
              </section>

              <Separator />

              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                    <Package className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">Shipment information</h3>
                </div>

                <div className="rounded-xl border border-border/70 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Parcel name
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    {payment.shipment.parcelName}
                  </p>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <MapPin className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Pickup zone
                        </p>
                        <p className="mt-1 font-medium">
                          {payment.shipment.pickupZone.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payment.shipment.pickupZone.code}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <MapPin className="size-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Delivery zone
                        </p>
                        <p className="mt-1 font-medium">
                          {payment.shipment.deliveryZone.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payment.shipment.deliveryZone.code}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem
                      label="Customer ID"
                      value={payment.shipment.customerId}
                      breakAll
                    />

                    <DetailItem
                      label="Shipment delivery fee"
                      value={currencyFormatter.format(
                        Number(payment.shipment.deliveryFee) || 0,
                      )}
                    />
                  </div>
                </div>
              </section>

              <Separator />

              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                    <CalendarDays className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">Payment timeline</h3>
                </div>

                <div className="space-y-4 rounded-xl border border-border/70 p-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <CalendarDays className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Transaction created</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {dateFormatter.format(new Date(payment.createdAt))}
                      </p>
                    </div>
                  </div>

                  {payment.paidAt && (
                    <div className="flex gap-3">
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Payment completed</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {dateFormatter.format(new Date(payment.paidAt))}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <CalendarDays className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Last updated</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {dateFormatter.format(new Date(payment.updatedAt))}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default PaymentDetailsSheet;
