export const SHIPMENT_STATUSES = [
  "CREATED",
  "READY_FOR_PAYMENT",
  "PENDING",
  "ASSIGNED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  title: string;
  description: string;
  location?: string;
  timestamp?: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingLookupResult {
  trackingId: string;
  status: ShipmentStatus;
  estimatedDelivery?: string;
  events: TrackingEvent[];
}

export interface ShipmentTrackingProps {
  className?: string;
  onTrack?: (trackingId: string) => void | Promise<void>;
}
