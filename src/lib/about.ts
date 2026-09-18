import {
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  PackageCheck,
  Route,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const aboutStats = [
  {
    value: "50K+",
    label: "Deliveries Managed",
    icon: PackageCheck,
  },
  {
    value: "99.2%",
    label: "Successful Delivery",
    icon: CheckCircle2,
  },
  {
    value: "24/7",
    label: "Real-Time Tracking",
    icon: Clock3,
  },
  {
    value: "64+",
    label: "Service Zones",
    icon: Globe2,
  },
];

export const aboutFeatures = [
  {
    icon: Route,
    title: "Intelligent Routing",
    description:
      "Smart route planning helps shipments move efficiently from pickup to final destination.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Logistics",
    description:
      "Built around secure authentication, verified payments, shipment protection and reliable tracking.",
  },
  {
    icon: MapPin,
    title: "Live Visibility",
    description:
      "Keep every shipment visible with tracking information and clear delivery status updates.",
  },
  {
    icon: Zap,
    title: "Fast Operations",
    description:
      "Streamlined workflows help customers, couriers and administrators manage deliveries faster.",
  },
];
