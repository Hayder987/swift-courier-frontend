import {
  HourglassCog,
  LayoutDashboard,
  MapPinned,
  ScrollText,
  Truck,
  UserCog,
  UserRound,
} from "lucide-react";
import type { SidebarItems } from "@/types";

const prefix = "/super-admin-dashboard";

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
        title: "All Audit Logs",
        url: `${prefix}/audit-logs`,
        icon: HourglassCog,
      },
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
    ],
  },
];
