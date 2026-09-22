import {
  LayoutDashboard,
  MapPinned,
  MapPlus,
  PackageCheck,
  Truck,
  Users,
} from "lucide-react";
import { SidebarItems } from "@/types";

const prefix = "/admin-dashboard";

export const adminRoutes: SidebarItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: `${prefix}`,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Zone Management",
    items: [
      {
        title: "Create Zones",
        url: `${prefix}/create-zone`,
        icon: MapPlus,
      },
      {
        title: "All Zones",
        url: `${prefix}/all-zones`,
        icon: MapPinned,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Approved Courier",
        url: `${prefix}/approve-courier`,
        icon: Truck,
      },
      {
        title: "All Users",
        url: `${prefix}/all-users`,
        icon: Users,
      },
      {
        title: "All Shipments",
        url: `${prefix}/all-shipment`,
        icon: PackageCheck,
      },
    ],
  },
];
