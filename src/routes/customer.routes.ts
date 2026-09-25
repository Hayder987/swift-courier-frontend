import {
  LayoutDashboard,
  MapPinned,
  MapPlus,
  PackagePlus,
  PackageSearch,
  UserRound,
} from "lucide-react";
import type { SidebarItems } from "@/types";

const prefix = "/customer-dashboard";

export const customerRoutes: SidebarItems = [
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
    title: "Shipment",
    items: [
      {
        title: "Create Shipment",
        url: `${prefix}/create-shipment`,
        icon: PackagePlus,
      },
      {
        title: "My Shipment",
        url: `${prefix}/my-shipment`,
        icon: PackageSearch,
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        title: "Be a Courier",
        url: `${prefix}/be-courier`,
        icon: PackagePlus,
      },
    ],
  },
];
