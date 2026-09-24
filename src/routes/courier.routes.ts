import { LayoutDashboard, UserRound } from "lucide-react";
import type { SidebarItems } from "@/types";

const prefix = "/courier-dashboard";

export const courierRoutes: SidebarItems = [
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
];
