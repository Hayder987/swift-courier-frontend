import type { ShipmentStatus } from "@/types/shipment.type";
import type { IAdminShipmentStatusUpdate } from "@/validation/shipment.validation";

export const statusFlow: Record<ShipmentStatus, ShipmentStatus[]> = {
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

const ADMIN_UPDATABLE_STATUSES: IAdminShipmentStatusUpdate["status"][] = [
  "READY_FOR_PAYMENT",
  "RETURNED",
  "OUT_FOR_DELIVERY",
  "IN_TRANSIT",
  "ASSIGNED",
  "CANCELLED",
  "DELIVERY_FAILED",
  "DELIVERED",
];

export const getAdminNextStatuses = (currentStatus: ShipmentStatus) => {
  return statusFlow[currentStatus].filter(
    (status): status is IAdminShipmentStatusUpdate["status"] =>
      ADMIN_UPDATABLE_STATUSES.includes(
        status as IAdminShipmentStatusUpdate["status"],
      ),
  );
};

export const formatShipmentStatus = (status: ShipmentStatus) => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getShipmentStatusClassName = (status: ShipmentStatus) => {
  const classes: Record<ShipmentStatus, string> = {
    CREATED: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",

    READY_FOR_PAYMENT:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",

    PENDING:
      "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",

    ASSIGNED:
      "border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",

    PICKED_UP:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",

    IN_TRANSIT:
      "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",

    OUT_FOR_DELIVERY:
      "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",

    DELIVERED:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

    DELIVERY_FAILED:
      "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",

    RETURNED:
      "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400",

    CANCELLED: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  };

  return classes[status];
};

export const getShipmentTypeClassName = (type: "NEW" | "OLD") => {
  if (type === "NEW") {
    return "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]";
  }

  return "border-muted-foreground/20 bg-muted text-muted-foreground";
};
