import type { LucideIcon } from "lucide-react";
import { Bell, CheckCircle2, Package } from "lucide-react";

export type NotificationType =
  | "GENERAL"
  | "SHIPMENT"
  | "PAYMENT"
  | "APPLICATION";

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  shipmentId: string | null;
  userId: string | null;
  notificationDeadline: string;
  createdAt: string;
}

type NotificationTypeConfig = {
  label: string;
  icon: LucideIcon;
};

export const typeConfig: Record<NotificationType, NotificationTypeConfig> = {
  GENERAL: {
    label: "General",
    icon: Bell,
  },

  SHIPMENT: {
    label: "Shipment",
    icon: Package,
  },

  PAYMENT: {
    label: "Payment",
    icon: CheckCircle2,
  },

  APPLICATION: {
    label: "Application",
    icon: Bell,
  },
};
