import {
  LayoutDashboard,
  MapPinned,
  PackageCheck,
  Truck,
  UserRound,
  Users,
} from "lucide-react";
import type { SidebarItems } from "@/types";

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
      {
        title: "My Profile",
        url: `${prefix}/my-profile`,
        icon: UserRound,
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
