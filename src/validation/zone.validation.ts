import { z } from "zod";

export const createZoneZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Zone name must be at least 2 characters.")
    .max(100, "Zone name cannot exceed 100 characters."),

  code: z
    .string()
    .trim()
    .min(2, "Zone code must be at least 2 characters.")
    .max(20, "Zone code cannot exceed 20 characters.")
    .regex(
      /^[A-Z0-9-]+$/,
      "Code must contain only uppercase letters, numbers and hyphen.",
    ),

  address: z
    .string()
    .trim()
    .min(3, "Address is required.")
    .max(255, "Address cannot exceed 255 characters."),

  radiusKm: z
    .number()
    .int("Radius must be an integer.")
    .min(1, "Radius must be at least 1 KM.")
    .max(500, "Radius cannot exceed 500 KM."),

  isActive: z.boolean(),
});

export type ICreateZonePayload = z.infer<typeof createZoneZodSchema>;
