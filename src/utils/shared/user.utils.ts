import type { UserRole } from "@/types";

export function formatDate(value?: string | null) {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value?: string | null) {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "SC"
  );
}

export function getRoleLabel(role: UserRole) {
  switch (role) {
    case "SUPER_ADMIN":
      return "Super Administrator";

    case "ADMIN":
      return "Administrator";

    case "COURIER":
      return "Courier";

    case "CUSTOMER":
      return "Customer";

    default:
      return role;
  }
}

export function getRoleBadgeClass(role: UserRole) {
  if (role === "SUPER_ADMIN") {
    return "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]";
  }

  if (role === "ADMIN") {
    return "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]";
  }

  if (role === "COURIER") {
    return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";
  }

  return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
}
