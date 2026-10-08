import { Activity, CheckCircle2, Package, XCircle } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

import type {
  DashboardPeriod,
  ShipmentStatus,
} from "@/types/dashboard.stats.type";

export const periodOptions: {
  label: string;
  value: DashboardPeriod;
}[] = [
  {
    label: "Last 7 days",
    value: "7d",
  },
  {
    label: "Last 30 days",
    value: "30d",
  },
  {
    label: "Last 90 days",
    value: "90d",
  },
  {
    label: "Last year",
    value: "1y",
  },
];

export const shipmentStatusLabel: Record<ShipmentStatus, string> = {
  CREATED: "Created",
  READY_FOR_PAYMENT: "Ready for payment",
  PENDING: "Pending",
  ASSIGNED: "Assigned",
  PICKED_UP: "Picked up",
  IN_TRANSIT: "In transit",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  DELIVERY_FAILED: "Delivery failed",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(value);

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));

export const formatDateTime = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const getAuditIcon = (action: string) => {
  switch (action) {
    case "CREATED":
      return <Package className="size-4" />;

    case "APPROVE":
      return <CheckCircle2 className="size-4" />;

    case "DELETE":
      return <XCircle className="size-4" />;

    default:
      return <Activity className="size-4" />;
  }
};

export const getAuditTone = (action: string) => {
  switch (action) {
    case "CREATED":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

    case "APPROVE":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "DELETE":
      return "bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getStatusTone = (status: string) => {
  switch (status) {
    case "DELIVERED":
    case "PAID":
    case "AVAILABLE":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "PENDING":
    case "READY_FOR_PAYMENT":
    case "ASSIGNED":
    case "BUSY":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";

    case "CANCELLED":
    case "FAILED":
    case "DELIVERY_FAILED":
    case "TERMINATED":
      return "bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex min-h-55 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
    <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Package className="size-5" />
    </div>

    <p className="text-sm font-semibold">{title}</p>

    <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
      {description}
    </p>
  </div>
);

export const StatCard = ({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}) => (
  <Card className="group overflow-hidden border-border/60 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="mt-2 truncate text-2xl font-bold tracking-tight sm:text-3xl">
            {value}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);
