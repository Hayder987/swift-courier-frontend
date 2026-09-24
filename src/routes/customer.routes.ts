import {
  LayoutDashboard,
  MapPinned,
  MapPlus,
  UserRound,
} from "lucide-react";
import type { SidebarItems } from "@/types";

const prefix = "/admin-dashboard";

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
        url: `${prefix}/create-zone`,
        icon: MapPlus,
      },
      {
        title: "My Shipment",
        url: `${prefix}/all-zones`,
        icon: MapPinned,
      },
    ],
  },
];
