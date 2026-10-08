import { z } from "zod";

export const createPayrollSchema = z.object({
  month: z.number().int().min(1, "Month is required").max(12, "Invalid month"),

  year: z.number().int().min(2000, "Invalid year"),

  bonus: z.number().min(0, "Bonus cannot be negative"),

  totalDeduction: z.number().min(0, "Total deduction cannot be negative"),
});

export const paySalarySchema = z.object({
  paymentReference: z
    .string()
    .trim()
    .min(3, "Payment reference must be at least 3 characters.")
    .max(100, "Payment reference cannot exceed 100 characters."),
});

export type PaySalaryFormValues = z.infer<typeof paySalarySchema>;
