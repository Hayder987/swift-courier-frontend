import type { IShipment, ShipmentStatus } from "@/types/shipment.type";
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

export const statusClassName = (status: ShipmentStatus) => {
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

export const typeClassName = (type: IShipment["type"]) =>
  type === "NEW"
    ? "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]"
    : "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400";

export const formatMoney = (value: string | null) => {
  if (!value) return "—";

  const amount = Number(value);

  if (Number.isNaN(amount)) return value;

  return `৳${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
