/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export const formatDate = (date: string | null) => {
  if (!date) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

export const getInitials = (name?: string) => {
  if (!name) {
    return "U";
  }

  return name
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export const formatStatus = (value: string) => {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getStatusClass = (status: string) => {
  switch (status) {
    case "APPROVED":
    case "ACTIVE":
    case "AVAILABLE":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "REJECTED":
    case "DELETED":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    case "APPLIED":
    case "PENDING":
      return "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};
