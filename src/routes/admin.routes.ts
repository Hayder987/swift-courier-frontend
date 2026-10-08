import {
  LayoutDashboard,
  MapPinned,
  PackageCheck,
  Truck,
  UserCog,
  UserRound,
  Users,
} from "lucide-react";
import type { SidebarItems } from "@/types";

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
      {
        title: "Overview",
        url: `${prefix}/overview`,
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
        title: "Courier Applications",
        url: `${prefix}/approve-courier`,
        icon: Truck,
      },
      {
        title: "Zone Management",
        url: `${prefix}/all-zones`,
        icon: MapPinned,
      },
      {
        title: "Employee Management",
        url: `${prefix}/employees`,
        icon: UserCog,
      },
      {
        title: "Shipment Management",
        url: `${prefix}/all-shipment`,
        icon: PackageCheck,
      },
      {
        title: "User Management",
        url: `${prefix}/all-users`,
        icon: Users,
      },
    ],
  },
];
