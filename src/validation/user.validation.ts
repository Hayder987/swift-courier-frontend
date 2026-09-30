import { z } from "zod";
import {
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_BYTES,
} from "./courier-application-validation";

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
] as const;

export const profilePhotoSchema = z.object({
  profileImage: z
    .instanceof(File, { message: "Profile photo is required." })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE_BYTES,
      `Profile photo must be smaller than ${MAX_FILE_SIZE}MB.`,
    )
    .refine(
      (file) =>
        ACCEPTED_FILE_TYPES.includes(
          file.type as (typeof ACCEPTED_FILE_TYPES)[number],
        ),
      "Only PNG, JPG, JPEG, or WebP images are allowed.",
    ),
});

export type IProfilePhotoUpload = z.infer<typeof profilePhotoSchema>;
