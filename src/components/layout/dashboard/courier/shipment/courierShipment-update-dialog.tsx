"use client";

// import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
import { AlertTriangle, CheckCircle2, Loader2, RefreshCcw } from "lucide-react";
import type { FetchError } from "ofetch";
import { useEffect, useMemo } from "react";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

import { useUpdateShipmentByCourier } from "@/hooks/shipment.hook";

import type {
  ICourierShipmentStatusUpdate,
  IShipment,
  ShipmentStatus,
} from "@/types/shipment.type";

interface CourierShipmentUpdateDialogProps {
  shipment: IShipment | null;
  courierType: "pickup" | "delivery";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const courierUpdateSchema = z.object({
  status: z.enum(["PICKED_UP", "DELIVERY_FAILED", "DELIVERED"]),
  note: z
    .string()
    .trim()
    .min(1, "Note is required")
    .max(500, "Note cannot exceed 500 characters"),
});

const getStatusClassName = (status: ShipmentStatus) => {
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

const formatStatus = (status: ShipmentStatus) => status.replaceAll("_", " ");

const CourierShipmentUpdateDialog = ({
  shipment,
  courierType,
  open,
  onOpenChange,
}: CourierShipmentUpdateDialogProps) => {
  const availableStatuses = useMemo(() => {
    if (!shipment) {
      return [];
    }

    if (courierType === "pickup") {
      if (shipment.status === "ASSIGNED") {
        return ["PICKED_UP"] as const;
      }

      return [];
    }

    if (shipment.status === "OUT_FOR_DELIVERY") {
      return ["DELIVERED", "DELIVERY_FAILED"] as const;
    }

    return [];
  }, [shipment, courierType]);

  const defaultStatus = availableStatuses[0] ?? "";

  const { mutate: updateShipmentStatus, isPending } =
    useUpdateShipmentByCourier();

  const form = useForm({
    defaultValues: {
      status: defaultStatus as
        | "PICKED_UP"
        | "DELIVERY_FAILED"
        | "DELIVERED"
        | "",
      note: "",
    },

    validators: {
      onSubmit: courierUpdateSchema,
    },

    onSubmit: async ({ value }) => {
      if (!shipment || !value.status) {
        return;
      }

      updateShipmentStatus(
        {
          shipmentId: shipment.id,
          payload: {
            status: value.status,
            note: value.note.trim(),
          },
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Shipment Updated",
              description: `${shipment.trackingNumber} status updated successfully.`,
              type: "success",
            });

            onOpenChange(false);
          },

          onError: (error: FetchError) => {
            const errorMessage =
              error.data?.message ??
              error.data?.errors?.[0]?.message ??
              error.message ??
              "Unable to update shipment status.";

            toast.add({
              title: "Update Failed",
              description: errorMessage,
              type: "error",
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    if (!open || !shipment) {
      form.reset();

      return;
    }

    form.reset();

    if (defaultStatus) {
      form.setFieldValue("status", defaultStatus);
    }
  }, [open, shipment, defaultStatus, form]);

  const hasNoNextStatus = availableStatuses.length === 0;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogContent className="w-[calc(100%-1rem)] max-w-lg overflow-hidden rounded-2xl border-border/60 p-0 sm:w-full">
        <div className="h-1 bg-[#e50914]" />

        <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-6">
          <AlertDialogHeader>
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
              {hasNoNextStatus ? (
                <CheckCircle2 className="size-6" />
              ) : (
                <RefreshCcw className="size-6" />
              )}
            </div>

            <AlertDialogTitle className="text-lg font-bold">
              Update Shipment
            </AlertDialogTitle>

            <AlertDialogDescription className="leading-6">
              {shipment
                ? `Update ${shipment.trackingNumber} based on your ${courierType} courier workflow.`
                : "Select a valid shipment status."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {shipment && (
            <div className="mt-5 space-y-5">
              {/* Shipment summary */}
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {shipment.parcelName}
                    </p>

                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                      {shipment.trackingNumber}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClassName(
                      shipment.status,
                    )}`}
                  >
                    {formatStatus(shipment.status)}
                  </Badge>
                </div>
              </div>

              {/* Courier flow */}
              <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Courier Flow
                  </p>

                  <span className="rounded-full bg-[#e50914]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#e50914]">
                    {courierType}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="min-w-0 flex-1 rounded-xl border border-border/60 bg-muted/30 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Current
                    </p>

                    <p className="mt-1 truncate text-xs font-semibold">
                      {formatStatus(shipment.status)}
                    </p>
                  </div>

                  <div className="text-muted-foreground">→</div>

                  <div className="min-w-0 flex-1 rounded-xl border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-[#e50914]">
                      Next
                    </p>

                    <p className="mt-1 truncate text-xs font-semibold text-[#e50914]">
                      {availableStatuses.length > 0
                        ? formatStatus(availableStatuses[0])
                        : "No transition"}
                    </p>
                  </div>
                </div>
              </div>

              {hasNoNextStatus ? (
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />

                    <p className="text-sm leading-6 text-muted-foreground">
                      This shipment is not currently eligible for a courier
                      status update from the {courierType} side.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    form.handleSubmit();
                  }}
                  className="space-y-5"
                >
                  {/* Status */}
                  <form.Field name="status">
                    {(field) => (
                      <div className="space-y-2">
                        <label
                          htmlFor="courier-shipment-status"
                          className="text-sm font-medium"
                        >
                          New Status
                        </label>

                        <Select
                          value={field.state.value}
                          onValueChange={(value) =>
                            field.handleChange(
                              value as
                                | "PICKED_UP"
                                | "DELIVERY_FAILED"
                                | "DELIVERED",
                            )
                          }
                        >
                          <SelectTrigger
                            id="courier-shipment-status"
                            className="h-11 rounded-xl"
                          >
                            <SelectValue placeholder="Select new status" />
                          </SelectTrigger>

                          <SelectContent className="rounded-xl">
                            {availableStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {formatStatus(status)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* Note */}
                  <form.Field name="note">
                    {(field) => (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <label
                            htmlFor="courier-shipment-note"
                            className="text-sm font-medium"
                          >
                            Update Note
                          </label>

                          <span className="text-[11px] text-muted-foreground">
                            {field.state.value.length}/500
                          </span>
                        </div>

                        <Textarea
                          id="courier-shipment-note"
                          value={field.state.value}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          maxLength={500}
                          placeholder={
                            courierType === "pickup"
                              ? "Example: Parcel successfully picked up from customer."
                              : "Example: Parcel delivered successfully to recipient."
                          }
                          className="min-h-28 resize-none rounded-xl border-border/60 bg-background/60"
                        />

                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel
                      type="button"
                      disabled={isPending}
                      className="rounded-xl"
                    >
                      Cancel
                    </AlertDialogCancel>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="gap-2 rounded-xl bg-[#e50914] text-white hover:bg-[#c70811]"
                    >
                      {isPending && <Loader2 className="size-4 animate-spin" />}

                      {isPending ? "Updating..." : "Update Status"}
                    </Button>
                  </AlertDialogFooter>
                </form>
              )}
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourierShipmentUpdateDialog;
