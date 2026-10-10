import {
  Banknote,
  Contact,
  History,
  HourglassCog,
  LayoutDashboard,
  MapPinned,
  Truck,
  UserCog,
  UserRound,
  Users,
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
        title: "Overview",
        url: `${prefix}/overview`,
        icon: LayoutDashboard,
      },
      {
        title: "Payment History",
        url: `${prefix}/payment`,
        icon: History,
      },
      {
        title: "My Profile",
        url: `${prefix}/my-profile`,
        icon: UserRound,
      },
      {
        title: "Contact Info",
        url: `${prefix}/contact-info`,
        icon: Contact,
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
      {
        title: "User Management",
        url: `${prefix}/all-users`,
        icon: Users,
      },
      {
        title: "Payroll Management",
        url: `${prefix}/payroll`,
        icon: Banknote,
      },
    ],
  },
];
