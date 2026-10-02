export const getRoleClassName = (role: string) => {
  switch (role) {
    case "SUPER_ADMIN":
      return "border-purple-500/20 bg-purple-500/10 text-purple-700 dark:text-purple-400";

    case "ADMIN":
      return "border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400";

    case "COURIER":
      return "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-400";

    case "CUSTOMER":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

export const getStatusClassName = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

    case "APPLIED":
      return "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400";

    case "SUSPENDED":
      return "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-400";

    case "TERMINATED":
      return "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};
