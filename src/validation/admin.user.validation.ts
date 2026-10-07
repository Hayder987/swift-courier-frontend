import { z } from "zod";

export const UserAdminStatusValidationSchema = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED"]),
});

export type IAdminUserStatusUpdate = z.infer<
  typeof UserAdminStatusValidationSchema
>;
