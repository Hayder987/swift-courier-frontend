import { Package, ShieldCheck, Truck } from "lucide-react";
import type { RoleContent, UserRole } from "@/types";

export const roleContent: Record<UserRole, RoleContent> = {
  CUSTOMER: {
    badge: "Customer Portal",
    title: "Welcome to",
    highlight: "SwiftCourier",
    description:
      "Your trusted delivery companion. Send parcels, stay connected with your deliveries, and experience a faster, simpler way to move what matters.",
    icon: Package,
    features: [
      "Simple parcel management",
      "Real-time delivery experience",
      "Secure and reliable service",
    ],
  },

  COURIER: {
    badge: "Courier Portal",
    title: "Welcome to",
    highlight: "SwiftCourier",
    description:
      "Your delivery workspace is ready. Stay organized, keep every shipment moving, and help us deliver a seamless experience to every customer.",
    icon: Truck,
    features: [
      "Organized delivery workflow",
      "Fast and efficient operations",
      "Built for reliable deliveries",
    ],
  },

  ADMIN: {
    badge: "Administration Portal",
    title: "Welcome to",
    highlight: "SwiftCourier",
    description:
      "Manage your courier operations from one place. SwiftCourier brings people, parcels, and logistics together through a streamlined platform.",
    icon: ShieldCheck,
    features: [
      "Centralized operations",
      "Efficient courier management",
      "Streamlined logistics workflow",
    ],
  },

  SUPER_ADMIN: {
    badge: "Super Administration",
    title: "Welcome to",
    highlight: "SwiftCourier",
    description:
      "Your central command for SwiftCourier. Manage the platform, oversee operations, and keep the entire delivery ecosystem running smoothly.",
    icon: ShieldCheck,
    features: [
      "Complete platform management",
      "Centralized administration",
      "Scalable logistics operations",
    ],
  },
};
