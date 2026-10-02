export const getActionClassName = (action: string) => {
  switch (action) {
    case "CREATED":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

    case "UPDATE":
      return "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400";

    case "DELETE":
      return "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400";

    case "APPROVE":
    case "ACCEPT":
    case "DELIVERED":
      return "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400";

    case "REJECT":
    case "CANCEL":
    case "DELIVERY_FAILED":
      return "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400";

    case "PAYMENT":
      return "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400";

    case "ASSIGN":
    case "PICKUP":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400";

    case "IN_TRANSIT":
    case "OUT_FOR_DELIVERY":
      return "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

export const getResourceClassName = (resource: string) => {
  switch (resource) {
    case "SHIPMENT":
      return "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]";

    case "USER":
    case "CUSTOMER":
      return "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400";

    case "EMPLOYEE":
    case "COURIER":
      return "border-purple-500/20 bg-purple-500/10 text-purple-700 dark:text-purple-400";

    case "PAYMENT":
    case "PAYROLL":
    case "SALARY":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};
