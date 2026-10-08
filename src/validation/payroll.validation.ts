import { z } from "zod";

export const createPayrollSchema = z.object({
  month: z.number().int().min(1, "Month is required").max(12, "Invalid month"),

  year: z.number().int().min(2000, "Invalid year"),

  bonus: z.number().min(0, "Bonus cannot be negative"),

  totalDeduction: z.number().min(0, "Total deduction cannot be negative"),
});
