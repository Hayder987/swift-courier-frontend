import { Building2, Clock3, MapPinned, Package } from "lucide-react";
import businessDelivery from "../assets/images/services/business-delivery.svg";
import expressDelivery from "../assets/images/services/express-delivery.svg";
import nationWideDelivery from "../assets/images/services/nationwide-delivery.svg";
import percelDelivery from "../assets/images/services/parcel-delivery.svg";

export const services = [
  {
    title: "Parcel Delivery",
    description:
      "Safe, trackable delivery for everyday parcels with careful handling from pickup to doorstep.",
    image: percelDelivery,
    icon: Package,
    meta: "Secure handling",
  },
  {
    title: "Express Delivery",
    description:
      "Priority delivery for time-sensitive packages when speed matters most.",
    image: expressDelivery,
    icon: Clock3,
    meta: "Priority speed",
  },
  {
    title: "Business Delivery",
    description:
      "Reliable delivery support for offices, shops, e-commerce teams, and growing businesses.",
    image: businessDelivery,
    icon: Building2,
    meta: "Business ready",
  },
  {
    title: "Nationwide Delivery",
    description:
      "Move packages across Bangladesh with route visibility and dependable delivery updates.",
    image: nationWideDelivery,
    icon: MapPinned,
    meta: "Nationwide reach",
  },
];
