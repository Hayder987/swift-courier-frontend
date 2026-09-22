import {
  LayoutDashboard,
  MapPinned,
  PackageCheck,
  Truck,
  Users,
} from "lucide-react";
import { SidebarItems } from "@/types";

const prefix = "/admin-dashboard";

export const superAdminRoutes: SidebarItems = [
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
      {
        title: "Zones",
        url: `${prefix}/zones`,
        icon: MapPinned,
      },
    ],
  },
];