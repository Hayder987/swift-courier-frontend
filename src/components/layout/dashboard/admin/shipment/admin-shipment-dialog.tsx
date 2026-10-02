"use client";

import { AlertTriangle, CheckCircle2, Loader2, RefreshCcw } from "lucide-react";
import type { FetchError } from "ofetch";
import { useEffect, useMemo, useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
import { useUpdateShipmentStatusAdmin } from "@/hooks/shipment.hook";
import type { IShipment, ShipmentStatus } from "@/types/shipment.type";
import type { IAdminShipmentStatusUpdate } from "@/validation/shipment.validation";

interface AdminShipmentUpdateDialogProps {
  shipment: IShipment | null;
  open: boolean;
  initialStatus?: ShipmentStatus;
  onOpenChange: (open: boolean) => void;
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

const AdminShipmentUpdateDialog = ({
  shipment,
  open,
  initialStatus,
  onOpenChange,
}: AdminShipmentUpdateDialogProps) => {
  const [status, setStatus] = useState<ShipmentStatus | "">("");

  const [note, setNote] = useState("");

  const availableStatuses = useMemo(() => {
    if (!shipment) return [];

    return statusFlow[shipment.status];
  }, [shipment]);

  const { mutate: updateShipmentStatus, isPending } =
    useUpdateShipmentStatusAdmin(
      {
        status: status as IAdminShipmentStatusUpdate["status"],
        note: note.trim(),
      },
      shipment?.id ?? "",
    );

  useEffect(() => {
    if (!open || !shipment) {
      setStatus("");
      setNote("");
      return;
    }

    const defaultStatus =
      initialStatus && availableStatuses.includes(initialStatus)
        ? initialStatus
        : availableStatuses[0];

    setStatus(defaultStatus ?? "");
    setNote("");
  }, [open, shipment, initialStatus, availableStatuses]);

  const handleSubmit = () => {
    if (!shipment || !status) {
      toast.add({
        title: "Status Required",
        description: "Please select a shipment status.",
        type: "error",
      });

      return;
    }

    if (!note.trim()) {
      toast.add({
        title: "Note Required",
        description: "Please provide a note for this status update.",
        type: "error",
      });

      return;
    }

    updateShipmentStatus(undefined, {
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
    });
  };

  const hasNoNextStatus = availableStatuses.length === 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg overflow-hidden rounded-2xl border-border/60 p-0">
        <div className="h-1 bg-[#e50914]" />

        <div className="p-5 sm:p-6">
          <AlertDialogHeader>
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
              {hasNoNextStatus ? (
                <CheckCircle2 className="size-6" />
              ) : (
                <RefreshCcw className="size-6" />
              )}
            </div>

            <AlertDialogTitle className="text-lg">
              Update Shipment Status
            </AlertDialogTitle>

            <AlertDialogDescription className="leading-6">
              {shipment
                ? `Update ${shipment.trackingNumber} from ${shipment.status.replaceAll("_", " ")} to a valid next status.`
                : "Select a valid shipment status."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {shipment && (
            <div className="mt-5 space-y-5">
              {/* Summary */}
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

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusClassName(shipment.status)}`}
                  >
                    {shipment.status.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              {hasNoNextStatus ? (
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />

                    <p className="text-sm leading-6 text-muted-foreground">
                      This shipment has no further status transition available.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Status */}
                  <div className="space-y-2">
                    <label
                      htmlFor="shipment-update-status"
                      className="text-sm font-medium"
                    >
                      New Status
                    </label>

                    <Select
                      value={status}
                      onValueChange={(value) =>
                        setStatus(value as ShipmentStatus)
                      }
                    >
                      <SelectTrigger
                        id="shipment-update-status"
                        className="h-11 rounded-xl"
                      >
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl">
                        {availableStatuses.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item.replaceAll("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Note */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="shipment-update-note"
                        className="text-sm font-medium"
                      >
                        Update Note
                      </label>

                      <span className="text-[11px] text-muted-foreground">
                        {note.length}/500
                      </span>
                    </div>

                    <Textarea
                      id="shipment-update-note"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      maxLength={500}
                      placeholder="Write a note about this status update..."
                      className="min-h-28 resize-none rounded-xl border-border/60 bg-background/60"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel disabled={isPending} className="rounded-xl">
              Cancel
            </AlertDialogCancel>

            {!hasNoNextStatus && (
              <Button
                type="button"
                disabled={isPending || !status || !note.trim()}
                onClick={handleSubmit}
                className="gap-2 rounded-xl bg-[#e50914] text-white hover:bg-[#c70811]"
              >
                {isPending && <Loader2 className="size-4 animate-spin" />}

                {isPending ? "Updating..." : "Update Status"}
              </Button>
            )}
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminShipmentUpdateDialog;
